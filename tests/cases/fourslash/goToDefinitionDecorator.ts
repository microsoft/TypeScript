/// <reference path='fourslash.ts' />

// @Filename: b.ts
////@/*decoratorUse*/decorator
////class C {
////    @decora/*decoratorFactoryUse*/torFactory(a, "22", true)
////    method() {}
////}


// @Filename: a.ts
/////*decoratorDefinition*/function decorator(target) {
////    return target;
////}
/////*decoratorFactoryDefinition*/function decoratorFactory(...args) {
////    return target => target;
////}

verify.goToDefinition({
    decoratorUse: "decoratorDefinition",
    decoratorFactoryUse: "decoratorFactoryDefinition"
});
