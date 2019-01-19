/// <reference path="fourslash.ts" />

////declare function schema<T> (value : T) : {field : T};
////
////declare const b: boolean;
////const obj/*1*/ = schema(b);
////const actualTypeOfNested/*2*/ = schema(obj);

verify.quickInfos({
    1: `const obj: {
    field: boolean;
}`,
    2: `const actualTypeOfNested: {
    field: {
        field: boolean;
    };
}`
});
