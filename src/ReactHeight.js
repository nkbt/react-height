/* eslint "react/no-did-mount-set-state":0 */
/* eslint "react/no-did-update-set-state":0 */


import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


const getElementHeight = el => el.clientHeight;


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
    getElementHeight
  };


  constructor(props) {
    super(props);
    this.state = {
      dirty: props.dirty,
      height: 0
    };
  }


  componentDidMount() {
    const height = this.props.getElementHeight(this.wrapper);
    const dirty = false;

    this.setState({height, dirty}, () => this.props.onHeightReady(this.state.height));
  }


  componentWillReceiveProps({children, dirty}) {
    if (children !== this.props.children || dirty) {
      this.setState({dirty: true});
    }
  }


  componentDidUpdate() {
    const height = this.props.getElementHeight(this.wrapper);
    const dirty = false;

    if (height === this.state.height) {
      this.setState({dirty});
    } else {
      this.setState({height, dirty}, () => this.props.onHeightReady(this.state.height));
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
