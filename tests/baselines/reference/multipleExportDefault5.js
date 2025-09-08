//// [tests/cases/conformance/externalModules/multipleExportDefault5.ts] ////

//// [multipleExportDefault5.ts]
export default function bar() { }
export default class C {}

//// [multipleExportDefault5.js]
export default function bar() { }
export default class C {
}
