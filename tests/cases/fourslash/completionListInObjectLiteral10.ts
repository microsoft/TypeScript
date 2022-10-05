/// <reference path="fourslash.ts" />

////declare function f1<TData extends Partial<{ name: string; age: number }> = {} >(obj: { data?: TData }): void
////
////f1({
////  data: {
////    name: 'MyName',
////    /*1*/
////  },
////});

verify.completions({ marker: "1", exact: { name: "age", sortText: completion.SortText.OptionalMember } });
