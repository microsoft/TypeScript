/// <reference path="fourslash.ts" />
// https://github.com/microsoft/TypeScript/issues/32983

////type M = { [K in 'one']: any };
////const x: M = {
////  /**/one() {}
////}

verify.quickInfoAt("", "(property) one: any");
