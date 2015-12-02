///<reference path="fourslash.ts" />

//// type Ctor<AA> = new () => A/*1*/A;
//// type MixinCtor<AA> = new () => AA & { constructor: MixinCtor<A/*2*/A> };
//// type NestedCtor<AA> = new() => AA & (new () => AA & { constructor: NestedCtor<A/*3*/A> });
//// type Method<AA> = { method(): A/*4*/A };
//// type Construct<AA> = { new(): A/*5*/A };


goTo.marker('1');
verify.quickInfoIs('(type parameter) AA in type Ctor<AA>');
goTo.marker('2');
verify.quickInfoIs('(type parameter) AA in type MixinCtor<AA>');
goTo.marker('3');
verify.quickInfoIs('(type parameter) AA in type NestedCtor<AA>');
goTo.marker('4');
verify.quickInfoIs('(type parameter) AA in type Method<AA>');
goTo.marker('5');
verify.quickInfoIs('(type parameter) AA in type Construct<AA>');