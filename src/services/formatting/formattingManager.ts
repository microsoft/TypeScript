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

/// <reference path="formatting.ts"/>

module TypeScript.Services.Formatting {
    export class FormattingManager {
        private options: FormattingOptions;

        constructor(private syntaxTree: SyntaxTree, private snapshot: ITextSnapshot, private rulesProvider: RulesProvider, editorOptions: TypeScript.Services.EditorOptions) {
            //
            // TODO: convert to use FormattingOptions instead of EditorOptions
            this.options = new FormattingOptions(!editorOptions.ConvertTabsToSpaces, editorOptions.TabSize, editorOptions.IndentSize, editorOptions.NewLineCharacter)
        }

        public formatSelection(minChar: number, limChar: number): TypeScript.Services.TextEdit[] {
            var span = TextSpan.fromBounds(minChar, limChar);
            return this.formatSpan(span, FormattingRequestKind.FormatSelection);
        }

        public formatDocument(minChar: number, limChar: number): TypeScript.Services.TextEdit[] {
            var span = TextSpan.fromBounds(minChar, limChar);
            return this.formatSpan(span, FormattingRequestKind.FormatDocument);
        }

        public formatOnPaste(minChar: number, limChar: number): TypeScript.Services.TextEdit[] {
            var span = TextSpan.fromBounds(minChar, limChar);
            return this.formatSpan(span, FormattingRequestKind.FormatOnPaste);
        }

        public formatOnSemicolon(caretPosition: number): TypeScript.Services.TextEdit[] {
            var sourceUnit = this.syntaxTree.sourceUnit();
            var semicolonPositionedToken = sourceUnit.findToken(caretPosition - 1);

            if (semicolonPositionedToken.kind() === SyntaxKind.SemicolonToken) {
                // Find the outer most parent that this semicolon terminates
                var current: PositionedElement = semicolonPositionedToken;
                while (current.parent() !== null &&
                       current.parent().end() === semicolonPositionedToken.end() &&
                       current.parent().kind() !== SyntaxKind.List) {
                    current = current.parent();
                }

                // Compute the span
                var span = new TextSpan(current.fullStart(), current.fullWidth());

                // Format the span
                return this.formatSpan(span, FormattingRequestKind.FormatOnSemicolon);
            }

            return [];
        }

        public formatOnClosingCurlyBrace(caretPosition: number): TypeScript.Services.TextEdit[] {
            var sourceUnit = this.syntaxTree.sourceUnit();
            var closeBracePositionedToken = sourceUnit.findToken(caretPosition - 1);

            if (closeBracePositionedToken.kind() === SyntaxKind.CloseBraceToken) {
                // Find the outer most parent that this closing brace terminates
                var current: PositionedElement = closeBracePositionedToken;
                while (current.parent() !== null &&
                       current.parent().end() === closeBracePositionedToken.end() &&
                       current.parent().kind() !== SyntaxKind.List) {
                    current = current.parent();
                }

                // Compute the span
                var span = new TextSpan(current.fullStart(), current.fullWidth());

                // Format the span
                return this.formatSpan(span, FormattingRequestKind.FormatOnClosingCurlyBrace);
            }

            return [];
        }

        public formatOnEnter(caretPosition: number): TypeScript.Services.TextEdit[] {
            var lineNumber = this.snapshot.getLineNumberFromPosition(caretPosition);

            if (lineNumber > 0) {
                // Format both lines
                var prevLine = this.snapshot.getLineFromLineNumber(lineNumber - 1);
                var currentLine = this.snapshot.getLineFromLineNumber(lineNumber);
                var span = TextSpan.fromBounds(prevLine.startPosition(), currentLine.endPosition());

                // Format the span
                return this.formatSpan(span, FormattingRequestKind.FormatOnEnter);

            }

            return [];
        }

        private formatSpan(span: TextSpan, formattingRequestKind: FormattingRequestKind): TypeScript.Services.TextEdit[] {
            // Always format from the beginning of the line
            var startLine = this.snapshot.getLineFromPosition(span.start());
            span = TextSpan.fromBounds(startLine.startPosition(), span.end());

            var result: TypeScript.Services.TextEdit[] = [];

            var formattingEdits = Formatter.getEdits(span, this.syntaxTree.sourceUnit(), this.options, true, this.snapshot, this.rulesProvider, formattingRequestKind);

            //
            // TODO: Change the ILanguageService interface to return TextEditInfo (with start, and length) instead of TextEdit (with minChar and limChar)
            formattingEdits.forEach((item) => {
                var edit = new TypeScript.Services.TextEdit(item.position, item.position + item.length, item.replaceWith);
                result.push(edit);
            });

            return result;
        }
    }
}