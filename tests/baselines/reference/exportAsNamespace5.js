//// [tests/cases/conformance/es2020/modules/exportAsNamespace5.ts] ////

//// [three.d.ts]
export type Named = 0;

//// [two.d.ts]
export * as default from "./three";

//// [one.ts]
import ns from "./two";
type Alias = ns.Named;


//// [one.js]
export {};
