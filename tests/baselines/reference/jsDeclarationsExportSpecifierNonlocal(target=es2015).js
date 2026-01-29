//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportSpecifierNonlocal.ts] ////

//// [source.js]
export class Thing {}
export class OtherThing {}
//// [index.js]
export { Thing, OtherThing as default } from "./source";


//// [source.js]
export class Thing {
}
export class OtherThing {
}
//// [index.js]
export { Thing, OtherThing as default } from "./source";


//// [source.d.ts]
export class Thing {
}
export class OtherThing {
}
//// [index.d.ts]
export { Thing, OtherThing as default } from "./source";
