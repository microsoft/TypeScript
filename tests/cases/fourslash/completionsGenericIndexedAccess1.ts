/// <reference path="fourslash.ts" />

// #34825

////interface Sample {
////  addBook: { name: string, year: number }
////}
////
////export declare function testIt<T>(method: T[keyof T]): any
////testIt<Sample>({ /**/ });

verify.completions({
  marker: '',
  exact: [
    { name: 'name' },
    { name: 'year' },
  ]
});
