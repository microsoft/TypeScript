/// <reference path='fourslash.ts'/>

//// type Str = string | {};
//// type FooType = Str | number;
//// function fn<T extends FooType>(x: T) {
////     x/*x*/;
//// }
//// const y/*y*/: <T extends FooType>(x: T) => void = fn;
//// type MixinCtor<A> = new () => A/*a*/ & { constructor: MixinCtor<A> };


verify.baselineQuickInfo({
    "x": [0, 1, 2],
    "y": [0, 1, 2],
    "a": [0],
});