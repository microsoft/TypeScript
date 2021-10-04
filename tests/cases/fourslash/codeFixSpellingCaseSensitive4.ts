/// <reference path='fourslash.ts' />

//// declare let a: numbers;
//// declare let b: Numbers;
//// declare let c: objects;
//// declare let d: Objects;
//// declare let e: RegEx;
//// namespace yadda {
////   export type Thing = string;
//// }
//// let f: yaddas.Thing;

verify.codeFixAll({
    fixId: "fixSpelling",
    fixAllDescription: "Fix all detected spelling errors",
    newFileContent:
`declare let a: number;
declare let b: Number;
declare let c: object;
declare let d: Object;
declare let e: RegExp;
namespace yadda {
  export type Thing = string;
}
let f: yadda.Thing;`,
});
