// @module: commonjs
// @skipLibCheck: true
// @includebuiltfile: typescriptServices.d.ts
// @noImplicitAny:true
// @strictNullChecks:true

// @filename: node_modules/typescript/index.d.ts
declare module "typescript" {
    export = ts;
}

import { writer } from "repl";
// @filename: writerOptionalIndentation.ts
import * as ts from "typescript";

const nl = ts.sys.newLine;

type ExpectedResults = {
    [indentation: string | number]: {
        expected: string;
        writer?: ts.Printer;
    }
}

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

function createPrinterInstance(indentation: number | "\t"): void {
    expectedResults[indentation].writer = ts.createPrinter({ indentation } as ts.PrinterOptions);
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

function testIndentation(indentation?: number | "\t"): void {
    let workIndentationSize: string = "" + indentation;
    if (indentation === undefined) {
        indentation = 4;
        workIndentationSize = "<default>";
    }
    let printer = expectedResults[indentation].writer;
    if (!printer) {
        throw new Error("Unable to find a writer for:" + typeof indentation + " " + indentation);
    }
    let result = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
    if (result !== expectedResults[indentation].expected) {
        let workIndentationSize = indentation === undefined ? "<default>" : indentation;
        throw new Error(`writerOptionalIndentation - Failed indentation for >>${workIndentationSize}<<${nl}Expected:-${nl}${expectedResults[indentation].expected}${nl}Have:-${nl}${result}`);
    }
}
