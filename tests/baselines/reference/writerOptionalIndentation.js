//// [tests/cases/compiler/writerOptionalIndentation.ts] ////

//// [package.json]
{
    "name": "typescript",
    "types": "/.ts/typescript.d.ts"
}

//// [writerOptionalIndentation.ts]
import ts = require("typescript");

declare var process: any;

type ExpectedResults = {
    [indentation: string | number]: {
        expected: string;
        writer?: ts.Printer;
    }
}

const nl = ts.sys.newLine;
const expectedResults: ExpectedResults = {
    0: {expected: `export function abc(): string {${nl}let abc: string = \"abc\";${nl}return abc;${nl}}${nl}`},
    1: {expected: `export function abc(): string {${nl} let abc: string = \"abc\";${nl} return abc;${nl}}${nl}`},
    2: {expected: `export function abc(): string {${nl}  let abc: string = \"abc\";${nl}  return abc;${nl}}${nl}`},
    3: {expected: `export function abc(): string {${nl}   let abc: string = \"abc\";${nl}   return abc;${nl}}${nl}`},
    4: {expected: `export function abc(): string {${nl}    let abc: string = \"abc\";${nl}    return abc;${nl}}${nl}`},
    5: {expected: `export function abc(): string {${nl}     let abc: string = \"abc\";${nl}     return abc;${nl}}${nl}`},
    6: {expected: `export function abc(): string {${nl}      let abc: string = \"abc\";${nl}      return abc;${nl}}${nl}`},
    7: {expected: `export function abc(): string {${nl}       let abc: string = \"abc\";${nl}       return abc;${nl}}${nl}`},
    8: {expected: `export function abc(): string {${nl}        let abc: string = \"abc\";${nl}        return abc;${nl}}${nl}`},
    9: {expected: `export function abc(): string {${nl}         let abc: string = \"abc\";${nl}         return abc;${nl}}${nl}`},
    "\t": {expected: `export function abc(): string {${nl}\tlet abc: string = \"abc\";${nl}\treturn abc;${nl}}${nl}`}
};

export function testWriterOptionalIndentation(): void {

    let exitCode = 0;

    function createPrinterInstance(indentation: number | "\t"): void {
        expectedResults[indentation].writer = ts.createPrinter({ indentation } as ts.PrinterOptions);
    }

    function testIndentation(indentation?: number | "\t"): void {
        let workIndentationSize: string = "" + indentation;
        if (indentation === undefined) {
            indentation = 4;
            workIndentationSize = "<default>";
        }
        let printer = expectedResults[indentation].writer;
        if (!printer) {
            console.error("Unable to find a writer for:" + typeof indentation + " " + indentation);
            exitCode = 9;
            return;
        }
        let result = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
        if (result !== expectedResults[indentation].expected) {
            workIndentationSize = indentation === undefined ? "<default>" : "" + indentation;
            console.error(`writerOptionalIndentation - Failed indentation for >>${workIndentationSize}<<${nl}Expected:-${nl}${expectedResults[indentation].expected}${nl}Have:-${nl}${result}`);
            exitCode = 9;
            return;
        }
    }

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

    for (let indentation in expectedResults) {
        let test = parseInt(indentation + 1);
        if (test > 0) {
            createPrinterInstance(test - 1);
        }
        else if (indentation === "\t") {
            createPrinterInstance(indentation);
        }
    }

    testIndentation(); //... testing with no indentation set - should use default of 4 spaces
    for (let indentation in expectedResults) {
        let test = parseInt(indentation + 1);
        if (test > 0) {
            testIndentation(test - 1);
        }
        else if (indentation === "\t") {
            testIndentation(indentation);
        }
    }
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
}

testWriterOptionalIndentation();


//// [writerOptionalIndentation.js]
"use strict";
exports.__esModule = true;
exports.testWriterOptionalIndentation = void 0;
var ts = require("typescript");
var nl = ts.sys.newLine;
var expectedResults = {
    0: { expected: "export function abc(): string {".concat(nl, "let abc: string = \"abc\";").concat(nl, "return abc;").concat(nl, "}").concat(nl) },
    1: { expected: "export function abc(): string {".concat(nl, " let abc: string = \"abc\";").concat(nl, " return abc;").concat(nl, "}").concat(nl) },
    2: { expected: "export function abc(): string {".concat(nl, "  let abc: string = \"abc\";").concat(nl, "  return abc;").concat(nl, "}").concat(nl) },
    3: { expected: "export function abc(): string {".concat(nl, "   let abc: string = \"abc\";").concat(nl, "   return abc;").concat(nl, "}").concat(nl) },
    4: { expected: "export function abc(): string {".concat(nl, "    let abc: string = \"abc\";").concat(nl, "    return abc;").concat(nl, "}").concat(nl) },
    5: { expected: "export function abc(): string {".concat(nl, "     let abc: string = \"abc\";").concat(nl, "     return abc;").concat(nl, "}").concat(nl) },
    6: { expected: "export function abc(): string {".concat(nl, "      let abc: string = \"abc\";").concat(nl, "      return abc;").concat(nl, "}").concat(nl) },
    7: { expected: "export function abc(): string {".concat(nl, "       let abc: string = \"abc\";").concat(nl, "       return abc;").concat(nl, "}").concat(nl) },
    8: { expected: "export function abc(): string {".concat(nl, "        let abc: string = \"abc\";").concat(nl, "        return abc;").concat(nl, "}").concat(nl) },
    9: { expected: "export function abc(): string {".concat(nl, "         let abc: string = \"abc\";").concat(nl, "         return abc;").concat(nl, "}").concat(nl) },
    "\t": { expected: "export function abc(): string {".concat(nl, "\tlet abc: string = \"abc\";").concat(nl, "\treturn abc;").concat(nl, "}").concat(nl) }
};
function testWriterOptionalIndentation() {
    var exitCode = 0;
    function createPrinterInstance(indentation) {
        expectedResults[indentation].writer = ts.createPrinter({ indentation: indentation });
    }
    function testIndentation(indentation) {
        var workIndentationSize = "" + indentation;
        if (indentation === undefined) {
            indentation = 4;
            workIndentationSize = "<default>";
        }
        var printer = expectedResults[indentation].writer;
        if (!printer) {
            console.error("Unable to find a writer for:" + typeof indentation + " " + indentation);
            exitCode = 9;
            return;
        }
        var result = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
        if (result !== expectedResults[indentation].expected) {
            workIndentationSize = indentation === undefined ? "<default>" : "" + indentation;
            console.error("writerOptionalIndentation - Failed indentation for >>".concat(workIndentationSize, "<<").concat(nl, "Expected:-").concat(nl).concat(expectedResults[indentation].expected).concat(nl, "Have:-").concat(nl).concat(result));
            exitCode = 9;
            return;
        }
    }
    var sourceFile = ts.createSourceFile("writerOptionalIndentationTest.ts", "\n        export \n    function abc (   )    :\n            string\n            {\n            let abc :   string   =    \"abc\";\n        return     abc\n            }\n        ", ts.ScriptTarget.ESNext);
    for (var indentation in expectedResults) {
        var test = parseInt(indentation + 1);
        if (test > 0) {
            createPrinterInstance(test - 1);
        }
        else if (indentation === "\t") {
            createPrinterInstance(indentation);
        }
    }
    testIndentation(); //... testing with no indentation set - should use default of 4 spaces
    for (var indentation in expectedResults) {
        var test = parseInt(indentation + 1);
        if (test > 0) {
            testIndentation(test - 1);
        }
        else if (indentation === "\t") {
            testIndentation(indentation);
        }
    }
    console.log("Process exiting with code '".concat(exitCode, "'."));
    process.exit(exitCode);
}
exports.testWriterOptionalIndentation = testWriterOptionalIndentation;
testWriterOptionalIndentation();
