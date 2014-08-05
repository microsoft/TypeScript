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
    export class Comment {
        constructor(private _trivia: ISyntaxTrivia,
                    public endsLine: boolean,
                    public _start: number,
                    public _end: number) {
        }

        public start(): number {
            return this._start;
        }

        public end(): number {
            return this._end;
        }

        public fullText(): string {
            return this._trivia.fullText();
        }

        public kind(): SyntaxKind {
            return this._trivia.kind();
        }

        public structuralEquals(ast: Comment, includingPosition: boolean): boolean {
            if (includingPosition) {
                if (this.start() !== ast.start() || this.end() !== ast.end()) {
                    return false;
                }
            }

            return this._trivia.fullText() === ast._trivia.fullText() &&
                   this.endsLine === ast.endsLine;
        }
    }
}