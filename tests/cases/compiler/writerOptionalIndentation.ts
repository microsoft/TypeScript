// @module: commonjs
// @skipLibCheck: true
// @includebuiltfile: typescriptServices.d.ts
// @noImplicitAny:true
// @strictNullChecks:true

// @filename: node_modules/typescript/index.d.ts
declare module "typescript" {
    export = ts;
}

// @filename: writerOptionalIndentation.ts
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
