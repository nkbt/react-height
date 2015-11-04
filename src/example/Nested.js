import React from 'react';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin';
import ReactHeight from '..';
import VariableText from './VariableText';


const styles = {
  content: {
    margin: 10,
    padding: 10,
    maxWidth: 800,
    border: '3px solid red',
    borderRadius: 10
  }
};

const Nested = React.createClass({
  getInitialState() {
    return {blocks: 1, height: -1, dirty: true};
  },


  shouldComponentUpdate,


  onChange({target: {value}}) {
    this.setState({blocks: parseInt(value, 10)});
  },


  onHeightReady(height) {
    this.setState({height, dirty: false});
  },


  render() {
    const {blocks, height, dirty} = this.state;

    return (
      <div>
        <div>
          Blocks:
          &nbsp;
          <input type="range" step={1} min={1} max={3}
            value={blocks} onChange={this.onChange} />
          &nbsp;
          <span style={{fontWeight: 'bold'}}>Content height: {height}px</span>
          &nbsp;
          <button onClick={() => this.setState({dirty: true})}>Recalculate</button>
        </div>

        <ReactHeight dirty={dirty} onHeightReady={this.onHeightReady} style={styles.content}>
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
