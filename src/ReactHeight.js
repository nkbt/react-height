/* eslint "react/no-did-mount-set-state":0 */
/* eslint "react/no-did-update-set-state":0 */


import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


const ReactHeight = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    onHeightReady: React.PropTypes.func.isRequired,
    hidden: React.PropTypes.bool,
    dirty: React.PropTypes.bool
  },


  getDefaultProps() {
    return {hidden: false, dirty: true};
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


  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },


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
});


export default ReactHeight;
