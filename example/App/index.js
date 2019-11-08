import React from 'react';
import {VariableText} from './VariableText';
import {Nested} from './Nested';


export default () => (
  <div className="app">
    <h1>react-height</h1>

    <section className="section">
      <h2>Example 1. Variable text</h2>
      <VariableText />
    </section>

    <section className="section">
      <h2>Example 2. Nested Blocks</h2>
      <Nested />
    </section>
  </div>
);
