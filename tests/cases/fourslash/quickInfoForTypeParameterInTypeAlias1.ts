///<reference path="fourslash.ts" />

//// type Ctor<AA> = new () => A/*1*/A;
//// type MixinCtor<AA> = new () => AA & { constructor: MixinCtor<A/*2*/A> };
//// type NestedCtor<AA> = new() => AA & (new () => AA & { constructor: NestedCtor<A/*3*/A> });
//// type Method<AA> = { method(): A/*4*/A };
//// type Construct<AA> = { new(): A/*5*/A };

verify.quickInfos({
    1: "(type parameter) AA in type Ctor<AA>",
    2: "(type parameter) AA in type MixinCtor<AA>",
    3: "(type parameter) AA in type NestedCtor<AA>",
    4: "(type parameter) AA in type Method<AA>",
    5: "(type parameter) AA in type Construct<AA>"
});
