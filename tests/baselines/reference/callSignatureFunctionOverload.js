//// [tests/cases/compiler/callSignatureFunctionOverload.ts] ////

//// [callSignatureFunctionOverload.ts]
var foo: {
    (name: string): string;
    (name: 'order'): string;
    (name: 'content'): string;
    (name: 'done'): string;
}

var foo2: {
    (name: string): string;
    (name: 'order'): string;
    (name: 'order'): string;
    (name: 'done'): string;
}


//// [callSignatureFunctionOverload.js]
var foo;
var foo2;
