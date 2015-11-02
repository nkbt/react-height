import React from 'react';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin';


const ReactHeight = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    onHeightReady: React.PropTypes.func.isRequired,
    hidden: React.PropTypes.bool
  },


  getDefaultProps() {
    return {hidden: false};
  },


  componentWillMount() {
    this.height = 0;
    this.dirty = true;
  },


  componentDidMount() {
    this.height = this.refs.wrapper.clientHeight;
    this.dirty = false;
    this.forceUpdate();
    this.props.onHeightReady(this.height);
  },


  componentWillReceiveProps({children}) {
    if (children !== this.props.children) {
      this.dirty = true;
    }
  },


  shouldComponentUpdate,


  componentDidUpdate() {
    if (this.refs.wrapper) {
      this.dirty = false;

      if (this.refs.wrapper.clientHeight !== this.height) {
        this.height = this.refs.wrapper.clientHeight;
        this.forceUpdate();
        this.props.onHeightReady(this.height);
      } else {
        this.forceUpdate();
      }
    }
  },


  render() {
    const {onHeightReady, hidden, children, ...props} = this.props;

    if (!this.dirty) {
      return hidden ? null : <div {...props}>{children}</div>;
    }

    return (
      <div style={{height: 0, overflow: 'hidden'}}>
        <div ref="wrapper" {...props}>{children}</div>
      </div>
    );
  }
});


export default ReactHeight;
