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

///<reference path='references.ts' />

module TypeScript {
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

    export var tripleSlashReferenceRegExp = /^(\/\/\/\s*<reference\s+path=)('|")(.+?)\2\s*(static=('|")(.+?)\2\s*)*\/>/;

    function getFileReferenceFromReferencePath(fileName: string, lineMap: LineMap, position: number, comment: string, diagnostics: Diagnostic[]): IFileReference {
        // First, just see if they've written: /// <reference\s+
        // If so, then we'll consider this a reference directive and we'll report errors if it's
        // malformed.  Otherwise, we'll completely ignore this.

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
                    if (isResident) {
                        CompilerDiagnostics.debugPrint(path + " is resident");
                    }
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

    var scannerWindow = ArrayUtilities.createArray<number>(2048, 0);
    var scannerDiagnostics: any[] = [];

    function processImports(lineMap: LineMap, scanner: Scanner, token: ISyntaxToken, importedFiles: IFileReference[]): void {
        var position = 0;
        var lineChar = { line: -1, character: -1 };

        var start = new Date().getTime();
        // Look for: 
        // import foo = module("foo")
        while (token.tokenKind !== SyntaxKind.EndOfFileToken) {
            if (token.tokenKind === SyntaxKind.ImportKeyword) {
                var importStart = position + token.leadingTriviaWidth();
                token = scanner.scan(scannerDiagnostics, /*allowRegularExpression:*/ false);

                if (SyntaxFacts.isIdentifierNameOrAnyKeyword(token)) {
                    token = scanner.scan(scannerDiagnostics, /*allowRegularExpression:*/ false);

                    if (token.tokenKind === SyntaxKind.EqualsToken) {
                        token = scanner.scan(scannerDiagnostics, /*allowRegularExpression:*/ false);

                        if (token.tokenKind === SyntaxKind.ModuleKeyword || token.tokenKind === SyntaxKind.RequireKeyword) {
                            token = scanner.scan(scannerDiagnostics, /*allowRegularExpression:*/ false);

                            if (token.tokenKind === SyntaxKind.OpenParenToken) {
                                var afterOpenParenPosition = scanner.absoluteIndex();
                                token = scanner.scan(scannerDiagnostics, /*allowRegularExpression:*/ false);

                                lineMap.fillLineAndCharacterFromPosition(importStart, lineChar);

                                if (token.tokenKind === SyntaxKind.StringLiteral) {
                                    var ref = {
                                        line: lineChar.line,
                                        character: lineChar.character,
                                        position: afterOpenParenPosition + token.leadingTriviaWidth(),
                                        length: token.width(),
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

            position = scanner.absoluteIndex();
            token = scanner.scan(scannerDiagnostics, /*allowRegularExpression:*/ false);
        }

        var totalTime = new Date().getTime() - start;
        TypeScript.fileResolutionScanImportsTime += totalTime;
    }

    function processTripleSlashDirectives(fileName: string, lineMap: LineMap, firstToken: ISyntaxToken): ITripleSlashDirectiveProperties {
        var leadingTrivia = firstToken.leadingTrivia();

        var position = 0;
        var lineChar = { line: -1, character: -1 };
        var noDefaultLib = false;
        var diagnostics: Diagnostic[] = [];
        var referencedFiles: IFileReference[] = [];

        for (var i = 0, n = leadingTrivia.count(); i < n; i++) {
            var trivia = leadingTrivia.syntaxTriviaAt(i);

            if (trivia.kind() === SyntaxKind.SingleLineCommentTrivia) {
                var triviaText = trivia.fullText();
                var referencedCode = getFileReferenceFromReferencePath(fileName, lineMap, position, triviaText, diagnostics);

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
        var scanner = new Scanner(fileName, text, LanguageVersion.EcmaScript5, scannerWindow);

        var firstToken = scanner.scan(scannerDiagnostics, /*allowRegularExpression:*/ false);

        // only search out dynamic mods
        // if you find a dynamic mod, ignore every other mod inside, until you balance rcurlies
        // var position

        var importedFiles: IFileReference[] = [];
        if (readImportFiles) {
            processImports(text.lineMap(), scanner, firstToken, importedFiles);
        }

        var properties = processTripleSlashDirectives(fileName, text.lineMap(), firstToken);

        scannerDiagnostics.length = 0;
        return { referencedFiles: properties.referencedFiles, importedFiles: importedFiles, isLibFile: properties.noDefaultLib, diagnostics: properties.diagnostics };
    }

    export function getParseOptions(settings: ImmutableCompilationSettings): ParseOptions {
        return new ParseOptions(settings.codeGenTarget(), settings.allowAutomaticSemicolonInsertion());
    }

    export function getReferencedFiles(fileName: string, sourceText: IScriptSnapshot): IFileReference[] {
        return preProcessFile(fileName, sourceText, false).referencedFiles;
    }
} // Tools