# bluebird3.js

# bluebird v3.x

## Current status

[![NPM version](https://img.shields.io/npm/v/bluebird3.svg)](https://www.npmjs.com/package/bluebird3)
[![Build Status](https://img.shields.io/travis/overlookmotel/bluebird3/master.svg)](http://travis-ci.org/overlookmotel/bluebird3)
[![Dependency Status](https://img.shields.io/david/overlookmotel/bluebird3.svg)](https://david-dm.org/overlookmotel/bluebird3)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/bluebird3.svg)](https://david-dm.org/overlookmotel/bluebird3)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/bluebird3/master.svg)](https://coveralls.io/r/overlookmotel/bluebird3)

## Usage

Exports [bluebird](https://www.npmjs.com/package/bluebird) Promise library v3.x.

Why on earth would you use this rather than bluebird itself? Well you probably wouldn't, and shouldn't.

Only reason is along with [bluebird2](https://www.npmjs.com/package/bluebird2) if you need to load both versions v2.x and v3.x of bluebird simultaneously, for example for running tests on a module which should work with either version.

```js
var Bluebird2 = require('bluebird2');
var Bluebird3 = require('bluebird3');
// Now you have both. Whoopee!
```

### `Bluebird.getNewLibraryCopy()`

This module adds one method to the Bluebird constructor if not present already: `.getNewLibraryCopy()`

`.getNewLibraryCopy()` returns a new independent instance of the Bluebird constructor.

```js
var Bluebird = require('bluebird3');
var BluebirdX = Bluebird.getNewLibraryCopy();

console.log(BluebirdX != Bluebird); // true
```

### `Bluebird.version`

The module adds `.version` property to the Bluebird constructor, containing the semver version of Bluebird.

```js
var Bluebird = require('bluebird3');
console.log(Bluebird.version); // e.g. '3.3.5'
```

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookmotel/bluebird3/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/bluebird3/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README
