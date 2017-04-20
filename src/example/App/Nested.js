import React, {PureComponent} from 'react';
import {ReactHeight} from '../../ReactHeight';
import {VariableText} from './VariableText';
import css from './App.css';


export class Nested extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {blocks: 1, height: -1, dirty: true};
  }


  onHeightReady = height => {
    this.setState({height, dirty: false});
  };


  render() {
    const {blocks, height, dirty} = this.state;

    return (
      <div>
        <div className={css.config}>
          <label className={css.label}>
            Blocks:
            <input className={css.input}
              type="range"
              value={blocks} step={1} min={0} max={4}
              onChange={({target: {value}}) => this.setState({blocks: parseInt(value, 10)})} />
            {blocks}
          </label>
          <label className={css.label}>
            Content height:
            <b className={css.input}>{height}px</b>
          </label>
          <label className={css.label}>
            <button onClick={() => this.setState({dirty: true})}>Recalculate</button>
          </label>
        </div>

        <ReactHeight dirty={dirty} onHeightReady={this.onHeightReady} className={css.content}>
          {new Array(blocks).join('.').split('.').map((_, key) =>
            <div key={key} className={{padding: 20}}>
              <VariableText />
            </div>
          )}
        </ReactHeight>
      </div>
    );
  }
}
