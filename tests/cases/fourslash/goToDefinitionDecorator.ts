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


goTo.marker('decoratorUse');
goTo.definition();
verify.caretAtMarker('decoratorDefinition');

goTo.marker('decoratorFactoryUse');
goTo.definition();
verify.caretAtMarker('decoratorFactoryDefinition');
