/// <reference path='fourslash.ts'/>

//// interface T {
////     a: string
////     b: number
////  }
////  interface U {
////     b: number
////  }
////  declare const a: T
////  const b: U = {
////     b: a./*1*/
////  }

verify.completions({
    marker: "1",
    exact: [
        { name: "a", sortText: completion.SortText.LocationPriority },
        { name: "b", sortText: completion.SortText.SameName },
    ]
});
