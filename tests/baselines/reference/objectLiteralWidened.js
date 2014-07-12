//// [objectLiteralWidened.ts]
// object literal properties are widened to any

var x = {
    foo: null,
    bar: undefined
}

var y = {
    foo: null,
    bar: {
        baz: null,
        boo: undefined
    }
}

//// [objectLiteralWidened.js]
// object literal properties are widened to any
var x = {
    foo: null,
    bar: undefined
};

var y = {
    foo: null,
    bar: {
        baz: null,
        boo: undefined
    }
};
