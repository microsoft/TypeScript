/// <reference path="fourslash.ts" />

// #34825

////export type GetMethodsForType<T, G extends string> = { [K in keyof T]:
////  T[K] extends () => any ? { name: K, group: G, } : T[K] extends (s: infer U) => any ? { name: K, group: G, payload: U } : never }[keyof T];
////
////
////class Sample {
////  count = 0;
////  books: { name: string, year: number }[] = []
////  increment() {
////      this.count++
////      this.count++
////  }
////
////  addBook(book: Sample["books"][0]) {
////      this.books.push(book)
////  }
////}
////export declare function testIt<T, G extends string>(): (input: any, method: GetMethodsForType<T, G>) => any
////
////
////const t = testIt<Sample, "Sample">()
////
////const i = t(null, { name: "addBook", group: "Sample", payload: { /**/ } })

verify.completions({
  marker: '',
  exact: [
    { name: 'name' },
    { name: 'year' },
  ]
});
