# react-height

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nkbt/help)

[![Circle CI](https://circleci.com/gh/nkbt/react-height.svg?style=svg)](https://circleci.com/gh/nkbt/react-height)
[![Coverage Status](https://coveralls.io/repos/nkbt/react-height/badge.svg?branch=master)](https://coveralls.io/r/nkbt/react-height?branch=master)
[![Dependency Status](https://david-dm.org/nkbt/react-height.svg)](https://david-dm.org/nkbt/react-height)
[![devDependency Status](https://david-dm.org/nkbt/react-height/dev-status.svg)](https://david-dm.org/nkbt/react-height#info=devDependencies)

Component-wrapper to determine and report children elements height


![React Height](src/example/react-height.gif)


## Installation

### NPM

```sh
npm install --save react-height
```


### Bower:
```sh
bower install --save https://npmcdn.com/react-height/bower.zip
```

or in `bower.json`

```json
{
  "dependencies": {
    "react-height": "https://npmcdn.com/react-height/bower.zip"
  }
}
```

then include as
```html
<script src="bower_components/react-height/build/react-height.js"></script>
```


### 1998 Script Tag:
```html
<script src="https://npmcdn.com/react-height/build/react-height.js"></script>
(Module exposed as `ReactHeight`)
```


## Demo

[http://nkbt.github.io/react-height/example](http://nkbt.github.io/react-height/example)

## Codepen demo

[http://codepen.io/nkbt/pen/NGzgGb](http://codepen.io/nkbt/pen/NGzgGb?editors=101)

## Usage

```js
<ReactHeight onHeightReady={height => console.log(height)}>
  <div>Random content</div>
</ReactHeight>
```


## Options


#### `onHeightReady`: PropTypes.function.isRequired

Callback, invoked when height is measured (and when it is changed).


#### `children`: PropTypes.node.isRequired

One or multiple children with static, variable or dynamic height.

```js
<ReactHeight onHeightReady={height => console.log(height)}>
  <p>Paragraph of text</p>
  <p>Another paragraph is also OK</p>
  <p>Images and any other content are ok too</p>
  <img src="nyancat.gif">
</ReactHeight>
```


#### `hidden`: PropTypes.bool (default: false)

ReactHeight can render to null as soon as height is measured.

```js
<ReactHeight hidden={true} onHeightReady={height => console.log(height)}>
  <div>Will be removed from the DOM when height is measured</div>
</ReactHeight>
```

#### Pass-through props

All other props are applied to a container that is being measured. So it is possible to pass `style` or `className`, for example.

```js
<ReactHeight onHeightReady={height => console.log(height)}
  style={{width: 200, border: '1px solid red'}}
  className="myComponent">

  <div>
    Wrapper around this element will have red border, 200px width
    and `class="myComponent"`
  </div>
</ReactHeight>
```



## Development and testing

To run example covering `ReactHeight` features, use `npm start`, which will compile `src/example/Example.js`

```bash
git clone git@github.com:nkbt/react-height.git
cd react-height
npm install
npm start

# then
open http://localhost:8080
```

## Tests

```bash
npm test

# to run tests in watch mode for development
npm run test:dev

# to generate test coverage (./reports/coverage)
npm run test:cov
```

## License

MIT
