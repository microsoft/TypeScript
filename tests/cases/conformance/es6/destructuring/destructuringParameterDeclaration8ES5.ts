// @target: es5

function one({}, {foo, bar}) {
  // ...
}

function two([], [a,b]) {}

// should be an error
one(undefined, { foo: 'foo', bar: 'bar' });  

one(undefined, undefined);

one(null,  { foo: 'foo', bar: 'bar' });

one(null, null);

two(undefined, undefined);

two(null, null);