//// [tests/cases/compiler/writerOptionalIndentation.ts] ////

//// [index.d.ts]
declare module "typescript" {
    export = ts;
}

//// [writerOptionalIndentation.ts]
import * as ts from "typescript";

const nl = ts.sys.newLine;

type ExpectedResults = {
    [indentation: string | number]: string;
}

const expectedResults: ExpectedResults = {
    0: `export function abc(): string {${nl}let abc: string = \"abc\";${nl}return abc;${nl}}${nl}`,
    1: `export function abc(): string {${nl} let abc: string = \"abc\";${nl} return abc;${nl}}${nl}`,
    2: `export function abc(): string {${nl}  let abc: string = \"abc\";${nl}  return abc;${nl}}${nl}`,
    3: `export function abc(): string {${nl}   let abc: string = \"abc\";${nl}   return abc;${nl}}${nl}`,
    4: `export function abc(): string {${nl}    let abc: string = \"abc\";${nl}    return abc;${nl}}${nl}`,
    6: `export function abc(): string {${nl}      let abc: string = \"abc\";${nl}      return abc;${nl}}${nl}`,
    10: `export function abc(): string {${nl}    let abc: string = \"abc\";${nl}    return abc;${nl}}${nl}`,
    "a": `export function abc(): string {${nl}alet abc: string = \"abc\";${nl}areturn abc;${nl}}${nl}`,
    ".": `export function abc(): string {${nl}.let abc: string = \"abc\";${nl}.return abc;${nl}}${nl}`,
    "\t": `export function abc(): string {${nl}\tlet abc: string = \"abc\";${nl}\treturn abc;${nl}}${nl}`,
    "\t\t": `export function abc(): string {${nl}\t\tlet abc: string = \"abc\";${nl}\t\treturn abc;${nl}}${nl}`
};


let sourceFile = ts.createSourceFile(
    "writerOptionalIndentationTest.ts",
    `
      export 
  function abc (   )    :
        string
        {
          let abc :   string   =    "abc";
      return     abc
        }
    `,
    ts.ScriptTarget.ESNext
);

function testIndentation(indentation?: string | number): void {
    let printer;
    if (indentation !== undefined) {
        printer = ts.createPrinter({indentation});
    } else {
        printer = ts.createPrinter();
        indentation = 4;
    }
    let result = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
    if (result !== expectedResults[indentation]) {
        let workIndentationSize = indentation === undefined ? "<default>" : indentation;
        throw new Error(`writerOptionalIndentation - Failed indentation for >>${workIndentationSize}<<${nl}Expected:-${nl}${expectedResults[indentation]}${nl}Have:-${nl}${result}`);
    }
}

testIndentation(); //... testing with no indentationSize - uses default of 4 spaces
for (let indentation in expectedResults) {
    let test = parseInt(indentation);
    if (indentation === "0" || test > 0) {
        testIndentation(test);
    }
    else {
      testIndentation(indentation);
    }
}


//// [writerOptionalIndentation.js]
"use strict";
exports.__esModule = true;
var ts = require("typescript");
var nl = ts.sys.newLine;
var expectedResults = {
    0: "export function abc(): string {".concat(nl, "let abc: string = \"abc\";").concat(nl, "return abc;").concat(nl, "}").concat(nl),
    1: "export function abc(): string {".concat(nl, " let abc: string = \"abc\";").concat(nl, " return abc;").concat(nl, "}").concat(nl),
    2: "export function abc(): string {".concat(nl, "  let abc: string = \"abc\";").concat(nl, "  return abc;").concat(nl, "}").concat(nl),
    3: "export function abc(): string {".concat(nl, "   let abc: string = \"abc\";").concat(nl, "   return abc;").concat(nl, "}").concat(nl),
    4: "export function abc(): string {".concat(nl, "    let abc: string = \"abc\";").concat(nl, "    return abc;").concat(nl, "}").concat(nl),
    6: "export function abc(): string {".concat(nl, "      let abc: string = \"abc\";").concat(nl, "      return abc;").concat(nl, "}").concat(nl),
    10: "export function abc(): string {".concat(nl, "    let abc: string = \"abc\";").concat(nl, "    return abc;").concat(nl, "}").concat(nl),
    "a": "export function abc(): string {".concat(nl, "alet abc: string = \"abc\";").concat(nl, "areturn abc;").concat(nl, "}").concat(nl),
    ".": "export function abc(): string {".concat(nl, ".let abc: string = \"abc\";").concat(nl, ".return abc;").concat(nl, "}").concat(nl),
    "\t": "export function abc(): string {".concat(nl, "\tlet abc: string = \"abc\";").concat(nl, "\treturn abc;").concat(nl, "}").concat(nl),
    "\t\t": "export function abc(): string {".concat(nl, "\t\tlet abc: string = \"abc\";").concat(nl, "\t\treturn abc;").concat(nl, "}").concat(nl)
};
var sourceFile = ts.createSourceFile("writerOptionalIndentationTest.ts", "\n      export \n  function abc (   )    :\n        string\n        {\n          let abc :   string   =    \"abc\";\n      return     abc\n        }\n    ", ts.ScriptTarget.ESNext);
function testIndentation(indentation) {
    var printer;
    if (indentation !== undefined) {
        printer = ts.createPrinter({ indentation: indentation });
    }
    else {
        printer = ts.createPrinter();
        indentation = 4;
    }
    var result = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
    if (result !== expectedResults[indentation]) {
        var workIndentationSize = indentation === undefined ? "<default>" : indentation;
        throw new Error("writerOptionalIndentation - Failed indentation for >>".concat(workIndentationSize, "<<").concat(nl, "Expected:-").concat(nl).concat(expectedResults[indentation]).concat(nl, "Have:-").concat(nl).concat(result));
    }
}
testIndentation(); //... testing with no indentationSize - uses default of 4 spaces
for (var indentation in expectedResults) {
    var test = parseInt(indentation);
    if (indentation === "0" || test > 0) {
        testIndentation(test);
    }
    else {
        testIndentation(indentation);
    }
}
