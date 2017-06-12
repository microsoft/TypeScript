//// [parserRealSource5.ts]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {
    // TODO: refactor indent logic for use in emit
    export class PrintContext {
        public builder = "";
        public indent1 = "  ";
        public indentStrings: string[] = [];
        public indentAmt = 0;

        constructor (public outfile: ITextWriter, public parser: Parser) {
        }

        public increaseIndent() {
            this.indentAmt++;
        }

        public decreaseIndent() {
            this.indentAmt--;
        }

        public startLine() {
            if (this.builder.length > 0) {
                CompilerDiagnostics.Alert(this.builder);
            }
            var indentString = this.indentStrings[this.indentAmt];
            if (indentString === undefined) {
                indentString = "";
                for (var i = 0; i < this.indentAmt; i++) {
                    indentString += this.indent1;
                }
                this.indentStrings[this.indentAmt] = indentString;
            }
            this.builder += indentString;
        }

        public write(s) {
            this.builder += s;
        }

        public writeLine(s) {
            this.builder += s;
            this.outfile.WriteLine(this.builder);
            this.builder = "";
        }

    }

    export function prePrintAST(ast: AST, parent: AST, walker: IAstWalker) {
        var pc: PrintContext = <PrintContext>walker.state;

        ast.print(pc);
        pc.increaseIndent();
        return ast;
    }


    export function postPrintAST(ast: AST, parent: AST, walker: IAstWalker) {
        var pc: PrintContext = <PrintContext>walker.state;
        pc.decreaseIndent();
        return ast;
    }
}

//// [parserRealSource5.js]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.
///<reference path='typescript.ts' />
var TypeScript;
(function (TypeScript) {
    // TODO: refactor indent logic for use in emit
    var PrintContext = (function () {
        function PrintContext(outfile, parser) {
            this.outfile = outfile;
            this.parser = parser;
            this.builder = "";
            this.indent1 = "  ";
            this.indentStrings = [];
            this.indentAmt = 0;
        }
        var proto_1 = PrintContext.prototype;
        proto_1.increaseIndent = function () {
            this.indentAmt++;
        };
        proto_1.decreaseIndent = function () {
            this.indentAmt--;
        };
        proto_1.startLine = function () {
            if (this.builder.length > 0) {
                CompilerDiagnostics.Alert(this.builder);
            }
            var indentString = this.indentStrings[this.indentAmt];
            if (indentString === undefined) {
                indentString = "";
                for (var i = 0; i < this.indentAmt; i++) {
                    indentString += this.indent1;
                }
                this.indentStrings[this.indentAmt] = indentString;
            }
            this.builder += indentString;
        };
        proto_1.write = function (s) {
            this.builder += s;
        };
        proto_1.writeLine = function (s) {
            this.builder += s;
            this.outfile.WriteLine(this.builder);
            this.builder = "";
        };
        return PrintContext;
    }());
    TypeScript.PrintContext = PrintContext;
    function prePrintAST(ast, parent, walker) {
        var pc = walker.state;
        ast.print(pc);
        pc.increaseIndent();
        return ast;
    }
    TypeScript.prePrintAST = prePrintAST;
    function postPrintAST(ast, parent, walker) {
        var pc = walker.state;
        pc.decreaseIndent();
        return ast;
    }
    TypeScript.postPrintAST = postPrintAST;
})(TypeScript || (TypeScript = {}));
