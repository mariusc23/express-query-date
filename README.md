express-query-date
==================

> Convert query strings to dates for express/connect applications.

[![npm](https://img.shields.io/npm/v/express-query-date.svg)](https://www.npmjs.com/package/express-query-date)
[![build status](https://travis-ci.org/mariusc23/express-query-date.svg)](https://travis-ci.org/mariusc23/express-query-date)


## Installation

    npm install --save express-query-date


## Getting Started
The module will recursively attempt to parse every property in `req.query`.

Load it right after `bodyParser`:

```js
var dateParser = require('express-query-date');

// [...]

app.use(bodyParser.json());
app.use(dateParser());
```

#### Without
```js
// ?a=2015-01-01T05:00:00.000Z&b[c]=2015-01-01T05:00:00.000Z
console.log(req.query);
// => { a: '2015-01-01T05:00:00.000Z', b: { c: '2015-01-01T05:00:00.000Z' } }
```

#### With
```js
// ?a=2015-01-01T05:00:00.000Z&b[c]=2015-01-01T05:00:00.000Z
console.log(req.query);
// => { a: Date 2015-01-01T05:00:00.000Z, b: { c: Date 2015-01-01T05:00:00.000Z } }
```


### Formats
Default:
```js
['x', moment.ISO_8601]
```

To use your own, provide them when initializing the module:
```js
app.use(dateParser({
  formats: ['MM-DD-YYYY']
}));
```

See [moment.js documentation](http://momentjs.com/docs/#/parsing/string-format/) for more.


### Strict Mode
Strict format matching is on by default. To disable this, set `options.strict` to false when initializing the module.

```js
app.use(dateParser({
  strict: false
}));
```


## License
Copyright (c) 2015 Marius Craciunoiu. Licensed under the MIT license.
