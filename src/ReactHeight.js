/* eslint "react/no-did-mount-set-state":0 */
/* eslint "react/no-did-update-set-state":0 */


import React from 'react';
import {shouldComponentUpdate} from 'react/lib/ReactComponentWithPureRenderMixin';


const ReactHeight = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    onHeightReady: React.PropTypes.func.isRequired,
    hidden: React.PropTypes.bool,
    dirty: React.PropTypes.bool,
    wrapperType: React.PropTypes.string
  },


  getDefaultProps() {
    return {hidden: false, dirty: true, wrapperType: 'div'};
  },


  getInitialState() {
    return {
      height: 0, dirty: this.props.dirty
    };
  },


  componentDidMount() {
    const height = this.wrapper.clientHeight;
    const dirty = false;

    this.setState({height, dirty}, () => this.props.onHeightReady(this.state.height));
  },


  componentWillReceiveProps({children, dirty}) {
    if (children !== this.props.children || dirty) {
      this.setState({dirty: true});
    }
  },


  shouldComponentUpdate,


  componentDidUpdate() {
    const height = this.wrapper.clientHeight;
    const dirty = false;

    if (height === this.state.height) {
      this.setState({dirty});
    } else {
      this.setState({height, dirty}, () => this.props.onHeightReady(this.state.height));
    }
  },


  setWrapperRef(el) {
    this.wrapper = el;
  },


  render() {
    const {
      onHeightReady: _onHeightReady,
      dirty: _dirty,
      hidden,
      children,
      wrapperType,
      ...props
    } = this.props;
    const {dirty} = this.state;
    const WrapperType = wrapperType // has to start with a capital letter

    if (hidden && !dirty) {
      return null;
    }

    if (hidden) {
      return (
        <WrapperType style={{height: 0, overflow: 'hidden'}}>
          <WrapperType ref={this.setWrapperRef} {...props}>{children}</WrapperType>
        </WrapperType>
      );
    }

    return <WrapperType ref={this.setWrapperRef} {...props}>{children}</WrapperType>;
  }
});


export default ReactHeight;
