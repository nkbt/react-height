import React from 'react';
import VariableText from './VariableText';
import Nested from './Nested';


const style = {
  container: {
    margin: 20
  },
  section: {
    marginTop: 50
  }
};


const App = React.createClass({
  render() {
    return (
      <div style={style.container}>
        <h1>ReactHeight</h1>

        <section style={style.section}>
          <h2>Example 1. Variable text</h2>
          <VariableText />
        </section>

        <section style={style.section}>
          <h2>Example 2. Nested Blocks</h2>
          <Nested />
        </section>

      </div>
    );
  }
});


export default App;
