//
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

module TypeScript {
    export interface ILineAndCharacter {
        line: number;
        character: number;
    }

    // Note: This is being using by the host (VS) and is marshaled back and forth. When changing this make sure the changes 
    // are reflected in the managed side as well.
    export interface IFileReference extends ILineAndCharacter {
        path: string;
        isResident: boolean;
        position: number;
        length: number;
    }

    ///
    /// Preprocessing
    ///
    export interface IPreProcessedFileInfo {
        referencedFiles: IFileReference[];
        importedFiles: IFileReference[];
        diagnostics: Diagnostic[];
        isLibFile: boolean;
    }

    interface ITripleSlashDirectiveProperties {
        noDefaultLib: boolean;
        diagnostics: Diagnostic[];
        referencedFiles: IFileReference[];
    }

    function isNoDefaultLibMatch(comment: string): RegExpExecArray {
        var isNoDefaultLibRegex = /^(\/\/\/\s*<reference\s+no-default-lib=)('|")(.+?)\2\s*\/>/gim;
        return isNoDefaultLibRegex.exec(comment);
    }

    export var tripleSlashReferenceRegExp = /^(\/\/\/\s*<reference\s+path=)('|")(.+?)\2\s*(static=('|")(.+?)\5\s*)*\/>/;

    function getFileReferenceFromReferencePath(fileName: string, text: ISimpleText, position: number, comment: string, diagnostics: Diagnostic[]): IFileReference {
        // First, just see if they've written: /// <reference\s+
        // If so, then we'll consider this a reference directive and we'll report errors if it's
        // malformed.  Otherwise, we'll completely ignore this.
        var lineMap = text.lineMap();

        var simpleReferenceRegEx = /^\/\/\/\s*<reference\s+/gim;
        if (simpleReferenceRegEx.exec(comment)) {
            var isNoDefaultLib = isNoDefaultLibMatch(comment);

            if (!isNoDefaultLib) {
                var fullReferenceRegEx = tripleSlashReferenceRegExp;
                var fullReference = fullReferenceRegEx.exec(comment);

                if (!fullReference) {
                    // It matched the start of a reference directive, but wasn't well formed.  Report
                    // an appropriate error to the user.
                    diagnostics.push(new Diagnostic(fileName, lineMap, position, comment.length, DiagnosticCode.Invalid_reference_directive_syntax));
                }
                else {
                    var path: string = normalizePath(fullReference[3]);
                    var adjustedPath = normalizePath(path);

                    var isResident = fullReference.length >= 7 && fullReference[6] === "true";
                    return {
                        line: 0,
                        character: 0,
                        position: 0,
                        length: 0,
                        path: switchToForwardSlashes(adjustedPath),
                        isResident: isResident
                    };
                }
            }
        }

        return null;
    }

    var reportDiagnostic = () => { };

    function processImports(text: ISimpleText, scanner: Scanner.IScanner, token: ISyntaxToken, importedFiles: IFileReference[]): void {
        var lineChar = { line: -1, character: -1 };

        var lineMap = text.lineMap();
        var start = new Date().getTime();
        // Look for: 
        // import foo = module("foo")
        while (token.kind !== SyntaxKind.EndOfFileToken) {
            if (token.kind === SyntaxKind.ImportKeyword) {
                var importToken = token;
                token = scanner.scan(/*allowRegularExpression:*/ false);

                if (SyntaxFacts.isIdentifierNameOrAnyKeyword(token)) {
                    token = scanner.scan(/*allowRegularExpression:*/ false);

                    if (token.kind === SyntaxKind.EqualsToken) {
                        token = scanner.scan(/*allowRegularExpression:*/ false);

                        if (token.kind === SyntaxKind.ModuleKeyword || token.kind === SyntaxKind.RequireKeyword) {
                            token = scanner.scan(/*allowRegularExpression:*/ false);

                            if (token.kind === SyntaxKind.OpenParenToken) {
                                token = scanner.scan(/*allowRegularExpression:*/ false);

                                lineMap.fillLineAndCharacterFromPosition(TypeScript.start(importToken, text), lineChar);

                                if (token.kind === SyntaxKind.StringLiteral) {
                                    var ref = {
                                        line: lineChar.line,
                                        character: lineChar.character,
                                        position: TypeScript.start(token, text),
                                        length: width(token),
                                        path: stripStartAndEndQuotes(switchToForwardSlashes(token.text())),
                                        isResident: false
                                    };
                                    importedFiles.push(ref);
                                }
                            }
                        }
                    }
                }
            }

            token = scanner.scan(/*allowRegularExpression:*/ false);
        }

        var totalTime = new Date().getTime() - start;
        //TypeScript.fileResolutionScanImportsTime += totalTime;
    }

    function processTripleSlashDirectives(fileName: string, text: ISimpleText, firstToken: ISyntaxToken): ITripleSlashDirectiveProperties {
        var leadingTrivia = firstToken.leadingTrivia(text);

        var position = 0;
        var lineChar = { line: -1, character: -1 };
        var noDefaultLib = false;
        var diagnostics: Diagnostic[] = [];
        var referencedFiles: IFileReference[] = [];
        var lineMap = text.lineMap();

        for (var i = 0, n = leadingTrivia.count(); i < n; i++) {
            var trivia = leadingTrivia.syntaxTriviaAt(i);

            if (trivia.kind() === SyntaxKind.SingleLineCommentTrivia) {
                var triviaText = trivia.fullText();
                var referencedCode = getFileReferenceFromReferencePath(fileName, text, position, triviaText, diagnostics);

                if (referencedCode) {
                    lineMap.fillLineAndCharacterFromPosition(position, lineChar);
                    referencedCode.position = position;
                    referencedCode.length = trivia.fullWidth();
                    referencedCode.line = lineChar.line;
                    referencedCode.character = lineChar.character;

                    referencedFiles.push(referencedCode);
                }

                // is it a lib file?
                var isNoDefaultLib = isNoDefaultLibMatch(triviaText);
                if (isNoDefaultLib) {
                    noDefaultLib = isNoDefaultLib[3] === "true";
                }
            }

            position += trivia.fullWidth();
        }

        return { noDefaultLib: noDefaultLib, diagnostics: diagnostics, referencedFiles: referencedFiles };
    }

    export function preProcessFile(fileName: string, sourceText: IScriptSnapshot, readImportFiles = true): IPreProcessedFileInfo {
        var text = SimpleText.fromScriptSnapshot(sourceText);
        var scanner = Scanner.createScanner(ts.ScriptTarget.Latest, text, reportDiagnostic);

        var firstToken = scanner.scan(/*allowRegularExpression:*/ false);

        // only search out dynamic mods
        // if you find a dynamic mod, ignore every other mod inside, until you balance rcurlies
        // var position

        var importedFiles: IFileReference[] = [];
        if (readImportFiles) {
            processImports(text, scanner, firstToken, importedFiles);
        }

        var properties = processTripleSlashDirectives(fileName, text, firstToken);

        return { referencedFiles: properties.referencedFiles, importedFiles: importedFiles, isLibFile: properties.noDefaultLib, diagnostics: properties.diagnostics };
    }

    export function getReferencedFiles(fileName: string, sourceText: IScriptSnapshot): IFileReference[] {
        return preProcessFile(fileName, sourceText, false).referencedFiles;
    }
} // Tools