/// <reference path="fourslash.ts" />

////type UnionType = {
////  key1: string;
////} | {
////  key2: number;
////} | `string literal ${string}`;
////
////const obj1: UnionType = {
////  /*1*/
////};
////
////const obj2: UnionType = {
////  key1: "abc",
////  /*2*/
////};

verify.completions({
    marker: '1',
    exact: [{ name: 'key1' }, { name: 'key2' }]
})

verify.completions({
    marker: '2',
    exact: [{ name: 'key2' }]
})
