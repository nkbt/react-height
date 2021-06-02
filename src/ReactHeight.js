import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


const getElementHeightDefault = el => el.clientHeight;


export class ReactHeight extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onHeightReady: PropTypes.func.isRequired,
    hidden: PropTypes.bool,
    dirty: PropTypes.bool,
    getElementHeight: PropTypes.func
  };


  static defaultProps = {
    hidden: false,
    dirty: true,
    getElementHeight: getElementHeightDefault
  };


  constructor(props) {
    super(props);
    this.state = {
      dirty: props.dirty,
      height: 0
    };
  }


  componentDidMount() {
    const {getElementHeight} = this.props;
    const height = getElementHeight(this.wrapper);
    const dirty = false;

    this.setState({height, dirty}, () => {
      const {onHeightReady} = this.props;
      const {height: currentHeight} = this.state;
      onHeightReady(currentHeight);
    });
  }


  // eslint-disable-next-line react/no-deprecated
  UNSAFE_componentWillReceiveProps({children, dirty}) {
    const {children: oldChildren} = this.props;
    if (children !== oldChildren || dirty) {
      this.setState({dirty: true});
    }
  }


  componentDidUpdate() {
    const {getElementHeight} = this.props;
    const height = getElementHeight(this.wrapper);
    const dirty = false;

    const {height: currentSavedHeight} = this.state;

    if (height === currentSavedHeight) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({dirty});
    } else {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({height, dirty}, () => {
        const {onHeightReady} = this.props;
        const {height: currentHeight} = this.state;
        onHeightReady(currentHeight);
      });
    }
  }


  setWrapperRef = el => {
    this.wrapper = el;
  };


  render() {
    const {
      onHeightReady: _onHeightReady,
      getElementHeight: _getElementHeight,
      dirty: _dirty,
      hidden,
      children,
      ...props
    } = this.props;
    const {dirty} = this.state;

    if (hidden && !dirty) {
      return null;
    }

    if (hidden) {
      return (
        <div style={{height: 0, overflow: 'hidden'}}>
          <div ref={this.setWrapperRef} {...props}>{children}</div>
        </div>
      );
    }

    return <div ref={this.setWrapperRef} {...props}>{children}</div>;
  }
}
