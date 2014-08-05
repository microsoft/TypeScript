/// <reference path='fourslash.ts' />

////var o = {
////    /*valueDefinition*/value: 0,
////    /*getterDefinition*/get getter() {return 0 },
////    /*setterDefinition*/set setter(v: number) { },
////    /*methodDefinition*/method: () => { },
////    /*es6StyleMethodDefinition*/es6StyleMethod() { }
////};
////
////o./*valueReference*/value;
////o./*getterReference*/getter;
////o./*setterReference*/setter;
////o./*methodReference*/method;
////o./*es6StyleMethodReference*/es6StyleMethod;

var markerList = [
    "value",
    "getter",
    "setter",
    "method",
    "es6StyleMethod",
];

markerList.forEach((marker) => {
    goTo.marker(marker + 'Reference');
    goTo.definition();
    verify.caretAtMarker(marker + 'Definition');
});