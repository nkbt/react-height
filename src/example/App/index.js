import React from 'react';
import createReactClass from 'create-react-class';
import VariableText from './VariableText';
import Nested from './Nested';
import {name} from '../../../package.json';
import css from './App.css';


const App = createReactClass({
  render() {
    return (
      <div className={css.container}>
        <h1>{name}</h1>

        <section className={css.section}>
          <h2>Example 1. Variable text</h2>
          <VariableText />
        </section>

        <section className={css.section}>
          <h2>Example 2. Nested Blocks</h2>
          <Nested />
        </section>

      </div>
    );
  }
});


export default App;
