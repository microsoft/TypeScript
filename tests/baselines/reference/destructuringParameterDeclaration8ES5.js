//// [destructuringParameterDeclaration8ES5.ts]

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

//// [destructuringParameterDeclaration8ES5.js]
function one(_a, _b) {
    var foo = _b.foo, bar = _b.bar;
    // ...
}
function two(_a, _b) {
    var a = _b[0], b = _b[1];
}
// should be an error
one(undefined, { foo: 'foo', bar: 'bar' });
one(undefined, undefined);
one(null, { foo: 'foo', bar: 'bar' });
one(null, null);
two(undefined, undefined);
two(null, null);
