/// <reference path='fourslash.ts' />

// @Filename: b.ts
////@[|/*decoratorUse*/decorator|]
////class C {
////    @[|decora/*decoratorFactoryUse*/torFactory|](a, "22", true)
////    method() {}
////}


// @Filename: a.ts
////function /*decoratorDefinition*/decorator(target) {
////    return target;
////}
////function /*decoratorFactoryDefinition*/decoratorFactory(...args) {
////    return target => target;
////}

verify.baselineGoToDefinition(
    "decoratorUse",
    "decoratorFactoryUse",
);
