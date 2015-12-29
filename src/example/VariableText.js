import React from 'react';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin';
import ReactHeight from '../ReactHeight';
import text from './text.json';
import * as style from './style';


const getText = num => text.slice(0, num).map((p, i) => <p key={i}>{p}</p>);


const VariableText = React.createClass({
  getInitialState() {
    return {paragraphs: 0, height: -1};
  },


  shouldComponentUpdate,


  render() {
    const {height, paragraphs} = this.state;

    return (
      <div>
        <div style={style.config}>
          <label style={style.label}>
            Paragraphs:
            <input style={style.input}
              type="range"
              value={paragraphs} step={1} min={0} max={4}
              onChange={({target: {value}}) => this.setState({paragraphs: parseInt(value, 10)})} />
            {paragraphs}
          </label>
          <label style={style.label}>
            Content height:
            <b style={style.input}>{height}px</b>
          </label>
        </div>

        <ReactHeight
          onHeightReady={value => this.setState({height: value})}
          style={style.content}>
          {paragraphs ? getText(paragraphs) : <p>No text</p>}
        </ReactHeight>
      </div>
    );
  }
});


export default VariableText;
