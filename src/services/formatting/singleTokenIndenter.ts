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

///<reference path='formatting.ts' />

module TypeScript.Services.Formatting {
    export class SingleTokenIndenter extends IndentationTrackingWalker {
        private indentationAmount: number = null;
        private indentationPosition: number;

        constructor(indentationPosition: number, sourceUnit: SourceUnitSyntax, snapshot: ITextSnapshot, indentFirstToken: boolean, options: FormattingOptions) {
            super(new TextSpan(indentationPosition, 1), sourceUnit, snapshot, indentFirstToken, options);

            this.indentationPosition = indentationPosition;
        }

        public static getIndentationAmount(position: number, sourceUnit: SourceUnitSyntax, snapshot: ITextSnapshot, options: FormattingOptions): number {
            var walker = new SingleTokenIndenter(position, sourceUnit, snapshot, true, options);
            visitNodeOrToken(walker, sourceUnit);
            return walker.indentationAmount;
        }

        public indentToken(token: ISyntaxToken, indentationAmount: number, commentIndentationAmount: number): void {
            // Compute an indentation string for this token
            if (token.fullWidth() === 0 || (this.indentationPosition - this.position() < token.leadingTriviaWidth())) {
                // The position is in the leading trivia, use comment indentation
                this.indentationAmount = commentIndentationAmount;
            }
            else {
                this.indentationAmount = indentationAmount;
            }
        }
    }
}