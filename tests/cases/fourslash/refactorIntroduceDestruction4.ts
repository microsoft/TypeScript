/// <reference path='fourslash.ts' />

//// declare const u: { type: 'number'; payload: number } | { type: 'string', payload: string }
//// if(/*a*/u/*b*/.type === "number") {
////     /*c*/u/*d*/.payload.toExponential
//// } else {
////     /*e*/u/*f*/.payload.big
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Convert to destruction")
goTo.select("c", "d");
verify.not.refactorAvailable("Convert to destruction")
goTo.select("e", "f");
verify.not.refactorAvailable("Convert to destruction")