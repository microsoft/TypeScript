/// <reference path='fourslash.ts' />

////var o = {
////    /*valueDefinition*/value: 0,
////    get /*getterDefinition*/getter() {return 0 },
////    set /*setterDefinition*/setter(v: number) { },
////    /*methodDefinition*/method: () => { },
////    /*es6StyleMethodDefinition*/es6StyleMethod() { }
////};
////
////o./*valueReference*/value;
////o./*getterReference*/getter;
////o./*setterReference*/setter;
////o./*methodReference*/method;
////o./*es6StyleMethodReference*/es6StyleMethod;

verify.baselineGetDefinitionAtPosition("valueReference", "getterReference", "setterReference", "methodReference", "es6StyleMethodReference");
