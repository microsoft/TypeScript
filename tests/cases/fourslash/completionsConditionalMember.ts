/// <reference path="fourslash.ts" />

////declare function f<T extends string>(
////  p: { a: T extends 'foo' ? { x: string } : { y: string } }
////): void;
////
////f<'foo'>({ a: { /*1*/ } });
////f<string>({ a: { /*2*/ } });

verify.completions({
  marker: '1',
  exact: [{
    name: 'x'
  }]
});

verify.completions({
  marker: '2',
  exact: [{
    name: 'y'
  }]
});
