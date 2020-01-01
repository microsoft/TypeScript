'use strict';
let { foo, foo: bar } = { foo: 1 };
({ foo, foo: bar } = { foo: 2 });