import React from 'react';
import {VariableText} from './VariableText';
import {Nested} from './Nested';
import {name} from '../../../package.json';
import css from './App.css';


export const App = () => (
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
