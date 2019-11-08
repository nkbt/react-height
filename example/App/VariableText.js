import React, {PureComponent} from 'react';
import {ReactHeight} from '../../';
import text from '../text.json';


const getText = num => text.slice(0, num).map((p, i) => <p key={i}>{p}</p>);


export class VariableText extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {paragraphs: 0, height: -1};
  }


  render() {
    const {height, paragraphs} = this.state;

    return (
      <div>
        <div className="config">
          <label className="label">
            Paragraphs:
            <input className="input"
              type="range"
              value={paragraphs} step={1} min={0} max={4}
              onChange={({target: {value}}) => this.setState({paragraphs: parseInt(value, 10)})} />
            {paragraphs}
          </label>
          <label className="label">
            Content height:
            <b className="input">{height}px</b>
          </label>
        </div>

        <ReactHeight
          onHeightReady={value => this.setState({height: value})}
          className="content">
          {paragraphs ? getText(paragraphs) : <p>No text</p>}
        </ReactHeight>
      </div>
    );
  }
}
