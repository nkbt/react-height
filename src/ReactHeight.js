import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';


const getElementHeightDefault = el => (el ? el.clientHeight : 0);

export const ReactHeight = ({
  children,
  hidden,
  dirty,
  getElementHeight,
  onHeightReady,
  ...props
}) => {
  const [dirtyState, setDirtyState] = useState(true);
  const [shouldNotify, setShouldNotify] = useState(dirty);
  const [height, setHeight] = useState(0);
  const [wrapper, setWrapper] = useState(null);

  useEffect(() => {
    onHeightReady(height);
  }, [height]);

  useEffect(() => {
    if (dirtyState) {
      const elementHeight = getElementHeight(wrapper);
      if (elementHeight !== height) {
        setHeight(elementHeight);
        setShouldNotify(false);
      } else if (shouldNotify) {
        onHeightReady(height);
        setShouldNotify(false);
      }
      setDirtyState(false);
    }
  });

  useEffect(() => {
    setDirtyState(true);
  }, [children]);

  useEffect(() => {
    if (dirty) {
      setDirtyState(true);
      setShouldNotify(true);
    }
  }, [dirty]);

  if (hidden && !dirtyState) {
    setWrapper(null);
    return null;
  }

  if (hidden) {
    return (
      <div style={{height: 0, overflow: 'hidden'}}>
        <div ref={el => { setWrapper(el); }} {...props}>{children}</div>
      </div>
    );
  }

  return <div ref={el => { setWrapper(el); }} {...props}>{children}</div>;
};

ReactHeight.propTypes = {
  children: PropTypes.node.isRequired,
  onHeightReady: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
  dirty: PropTypes.bool,
  getElementHeight: PropTypes.func
};

ReactHeight.defaultProps = {
  hidden: false,
  dirty: true,
  getElementHeight: getElementHeightDefault
};
