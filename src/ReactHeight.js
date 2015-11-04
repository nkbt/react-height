/* eslint "react/no-did-mount-set-state":0, "react/no-did-update-set-state":0 */


import React from 'react';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin';


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
    if (!this.refs.wrapper) {
      return;
    }
    const height = this.refs.wrapper.clientHeight;
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
    if (!this.refs.wrapper) {
      return;
    }
    const height = this.refs.wrapper.clientHeight;
    const dirty = false;

    if (height !== this.state.height) {
      this.setState({height, dirty}, () => this.props.onHeightReady(this.state.height));
    } else {
      this.setState({dirty});
    }
  },


  render() {
    const {onHeightReady, hidden, children, ...props} = this.props;
    const {dirty} = this.state;

    if (hidden && !dirty) {
      return null;
    }

    if (hidden) {
      return (
        <div style={{height: 0, overflow: 'hidden'}}>
          <div ref="wrapper" {...props}>{children}</div>
        </div>
      );
    }

    return <div ref="wrapper" {...props}>{children}</div>;
  }
});


export default ReactHeight;
