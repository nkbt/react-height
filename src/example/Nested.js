import React from 'react';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin';
import ReactHeight from '../ReactHeight';
import VariableText from './VariableText';
import * as style from './style';


const Nested = React.createClass({
  getInitialState() {
    return {blocks: 1, height: -1, dirty: true};
  },


  shouldComponentUpdate,


  onHeightReady(height) {
    this.setState({height, dirty: false});
  },


  render() {
    const {blocks, height, dirty} = this.state;

    return (
      <div>
        <div style={style.config}>
          <label style={style.label}>
            Blocks:
            <input style={style.input}
              type="range"
              value={blocks} step={1} min={0} max={4}
              onChange={({target: {value}}) => this.setState({blocks: parseInt(value, 10)})} />
            {blocks}
          </label>
          <label style={style.label}>
            Content height:
            <b style={style.input}>{height}px</b>
          </label>
          <label style={style.label}>
            <button onClick={() => this.setState({dirty: true})}>Recalculate</button>
          </label>
        </div>

        <ReactHeight dirty={dirty} onHeightReady={this.onHeightReady} style={style.content}>
          {new Array(blocks).join('.').split('.').map((_, key) => (
            <div key={key} style={{padding: 20}}>
              <VariableText />
            </div>
          ))}
        </ReactHeight>
      </div>
    );
  }
});


export default Nested;
