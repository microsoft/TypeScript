//﻿
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='typescript.ts' />

module TypeScript {
    export interface ILineCol {
        line: number;
        col: number;
    }

    export class ErrorReporter {
        public parser: Parser = null;
        public checker: TypeChecker = null;
        public lineCol = { line: 0, col: 0 };
        public emitAsComments = true;
        public hasErrors = false;
        public pushToErrorSink = false;
        public errorSink: string[] = [];

        constructor (public outfile: ITextWriter) { }

        public getCapturedErrors() { return this.errorSink; }
        public freeCapturedErrors() { this.errorSink = []; }
        public captureError(emsg: string) { this.errorSink[this.errorSink.length] = emsg; }

        public setErrOut(outerr) {
            this.outfile = outerr;
            this.emitAsComments = false;
        }

        public emitPrefix() {
            if (this.emitAsComments) {
                this.outfile.Write("// ");
            }
            this.outfile.Write(this.checker.locationInfo.filename + "(" + this.lineCol.line + "," + this.lineCol.col + "): ");
        }

        public writePrefix(ast: AST): void {
            if (ast) {
                this.setError(ast);
            }
            else {
                this.lineCol.line = 0;
                this.lineCol.col = 0;
            }
            this.emitPrefix();
        }

        public writePrefixFromSym(symbol: Symbol): void {
            if (symbol && this.checker.locationInfo.lineMap) {
                getSourceLineColFromMap(this.lineCol, symbol.location,
                                        this.checker.locationInfo.lineMap);
            }
            else {
                this.lineCol.line = -1;
                this.lineCol.col = -1;
            }
            this.emitPrefix();
        }

        public setError(ast: AST) {
            if (ast) {
                ast.flags |= ASTFlags.Error;
                if (this.checker.locationInfo.lineMap) {
                    getSourceLineColFromMap(this.lineCol, ast.minChar, this.checker.locationInfo.lineMap);
                }
            }
        }

        public reportError(ast: AST, message: string) {
            if (this.pushToErrorSink) {
                this.captureError(message);
                return;
            }

            this.hasErrors = true;
            if (ast && this.parser.errorRecovery && this.parser.errorCallback) {
                var len = (ast.limChar - ast.minChar);
                this.parser.errorCallback(ast.minChar, len, message, this.checker.locationInfo.unitIndex);
            }
            else {
                this.writePrefix(ast);
                this.outfile.WriteLine(message); // Right after the semi-colon
            }
        }

        public reportErrorFromSym(symbol: Symbol, message: string) {
            if (this.pushToErrorSink) {
                this.captureError(message);
                return;
            }

            this.hasErrors = true;
            if (this.parser.errorRecovery && this.parser.errorCallback) {
                this.parser.errorCallback(symbol.location, symbol.length, message, this.checker.locationInfo.unitIndex);
            }
            else {
                this.writePrefixFromSym(symbol);
                this.outfile.WriteLine(message);
            }
        }

        public emitterError(ast: AST, message: string) {
            this.reportError(ast, message);
            // Emitter errors are not recoverable, stop immediately
            throw Error("EmitError");
        }

        public duplicateIdentifier(ast: AST, name: string) {
            this.reportError(ast, "Duplicate identifier '" + name + "'");
        }

        public showRef(ast: AST, text: string, symbol: Symbol) {
            var defLineCol = { line: -1, col: -1 };
            // TODO: multiple def locations
            this.parser.getSourceLineCol(defLineCol, symbol.location);
            this.reportError(ast, "symbol " + text + " defined at (" + defLineCol.line + "," +
                              defLineCol.col + ")");
        }

        public unresolvedSymbol(ast: AST, name: string) {
            this.reportError(ast, "The name '" + name + "' does not exist in the current scope");
        }

        public symbolDoesNotReferToAValue(ast: AST, name: string): void {
            this.reportError(ast, "The name '" + name + "' does not refer to a value");
        }

        public styleError(ast: AST, msg: string): void {
            var bkThrow = this.pushToErrorSink;
            this.pushToErrorSink = false;
            this.reportError(ast, "STYLE: " + msg);
            this.pushToErrorSink = bkThrow;
        }

        public simpleError(ast: AST, msg: string): void {
            this.reportError(ast, msg);
        }

        public simpleErrorFromSym(sym: Symbol, msg: string): void {
            this.reportErrorFromSym(sym, msg);
        }

        public invalidSuperReference(ast: AST) {
            this.simpleError(ast, "Keyword 'super' can only be used inside a class instance method");
        }

        public valueCannotBeModified(ast: AST) {
            this.simpleError(ast, "The left-hand side of an assignment expression must be a variable, property or indexer");
        }

        public invalidCall(ast: CallExpression, nodeType: number, scope: SymbolScope): void {
            var targetType = ast.target.type;
            var typeName = targetType.getScopedTypeName(scope);
            if (targetType.construct && (nodeType == NodeType.Call)) {
                this.reportError(ast, "Value of type '" + typeName + "' is not callable.  Did you mean to include 'new'?");
            } else {
                var catString = (nodeType == NodeType.Call) ? "callable" : "newable";

                this.reportError(ast, "Value of type '" + typeName + "' is not " + catString);
            }
        }

        public indexLHS(ast: BinaryExpression, scope: SymbolScope): void {
            var targetType = ast.operand1.type.getScopedTypeName(scope);
            var indexType = ast.operand2.type.getScopedTypeName(scope);
            this.simpleError(ast, "Value of type '" + targetType + "' is not indexable by type '" + indexType + "'");
        }

        public incompatibleTypes(ast: AST, t1: Type, t2: Type, op: string, scope: SymbolScope, comparisonInfo?:TypeComparisonInfo) {
            if (!t1) {
                t1 = this.checker.anyType;
            }
            if (!t2) {
                t2 = this.checker.anyType;
            }

            var reason = comparisonInfo ? comparisonInfo.message : "";
            if (op) {
                this.reportError(ast, "Operator '" + op + "' cannot be applied to types '" + t1.getScopedTypeName(scope) +
                                  "' and '" + t2.getScopedTypeName(scope) + "'" + (reason ? ": " + reason : ""));
            }
            else {
                this.reportError(ast, "Cannot convert '" + t1.getScopedTypeName(scope) +
                                  "' to '" + t2.getScopedTypeName(scope) + "'" + (reason ? ": " + reason : ""));
            }
        }

        public expectedClassOrInterface(ast: AST): void {
            this.simpleError(ast, "Expected var, class, interface, or module");
        }

        public unaryOperatorTypeError(ast: AST, op: string, type: Type) {
            this.reportError(ast, "Operator '" + op + "' cannot be applied to type '" + type.getTypeName() + "'");
        }
    }
}