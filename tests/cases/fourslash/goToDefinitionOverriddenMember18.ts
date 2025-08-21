/// <reference path="./fourslash.ts"/>

// @strict: true
// @target: esnext
// @lib: esnext

//// const entityKind = Symbol.for("drizzle:entityKind");
////
//// abstract class MySqlColumn {
////   readonly /*2*/[entityKind]: string = "MySqlColumn";
//// }
////
//// export class MySqlVarBinary extends MySqlColumn {
////   [|/*1*/override|] readonly [entityKind]: string = "MySqlVarBinary";
//// }

verify.baselineGoToDefinition("1");
