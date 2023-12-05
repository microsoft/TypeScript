//// [tests/cases/compiler/deleteReadonly.ts] ////

//// [deleteReadonly.ts]
interface A {
  readonly b
}
var a: A = {
  b: 123
};

delete a.b;

interface B {
  readonly [k: string]: string
}

var b: B = {
  'test': 'test'
};

delete b['test'];

delete ((((b['test']))));


//// [deleteReadonly.js]
var a = {
    b: 123
};
delete a.b;
var b = {
    'test': 'test'
};
delete b['test'];
delete ((((b['test']))));
