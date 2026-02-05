/// <reference path='fourslash.ts' />

// @lib: es5,es2015.promise

//// type User = { name: string };
//// async function /*reference*/getUser() { return { name: "Bob" } satisfies User as User }
////
//// const /*reference2*/promisedBob = getUser() 
//// 
//// export {}

verify.baselineGoToType("reference", "reference2");
