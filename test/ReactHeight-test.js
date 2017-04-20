import test from 'tape';
import {ReactHeight} from '../src/ReactHeight';

test('ReactHeight', t => {
  t.ok(ReactHeight instanceof Function, 'should be function');
  t.end();
});
