/// <reference path="fourslash.ts" />

//// const x = "str";
//// function assert1(condition: any, msg?: string): /*1*/ ;
//// function assert1(condition: any, msg?: string): /*2*/ { }

verify.completions({marker: "1", exact: completion.globalTypes});
verify.completions({marker: "2", exact: completion.globalTypes});
