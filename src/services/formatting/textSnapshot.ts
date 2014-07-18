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
    export interface ITextSnapshot {
        getText(span: TextSpan): string;
        getLineNumberFromPosition(position: number): number;
        getLineFromPosition(position: number): ITextSnapshotLine;
        getLineFromLineNumber(lineNumber: number): ITextSnapshotLine;
    }

    export class TextSnapshot implements ITextSnapshot  {
        private lines: TextSnapshotLine[];

        constructor(private snapshot: ISimpleText) {
            this.lines = [];
        }

        public getText(span: TextSpan): string {
            return this.snapshot.substr(span.start(), span.length());
        }

        public getLineNumberFromPosition(position: number): number {
            return this.snapshot.lineMap().getLineNumberFromPosition(position);
        }

        public getLineFromPosition(position: number): ITextSnapshotLine {
            var lineNumber = this.getLineNumberFromPosition(position);
            return this.getLineFromLineNumber(lineNumber);
        }

        public getLineFromLineNumber(lineNumber: number): ITextSnapshotLine {
            var line = this.lines[lineNumber];
            if (line === undefined) {
                line = <TextSnapshotLine>this.getLineFromLineNumberWorker(lineNumber);
                this.lines[lineNumber] = line;
            }
            return line;
        }

        private getLineFromLineNumberWorker(lineNumber: number): ITextSnapshotLine {
            var lineMap = this.snapshot.lineMap().lineStarts();
            var lineMapIndex = lineNumber; //Note: lineMap is 0-based
            if (lineMapIndex < 0 || lineMapIndex >= lineMap.length)
                throw new Error(TypeScript.getDiagnosticMessage(TypeScript.DiagnosticCode.Invalid_line_number_0, [lineMapIndex]));
            var start = lineMap[lineMapIndex];

            var end: number;
            var endIncludingLineBreak: number;
            var lineBreak = "";
            if (lineMapIndex == lineMap.length) {
                end = endIncludingLineBreak = this.snapshot.length();
            }
            else {
                endIncludingLineBreak = (lineMapIndex >= lineMap.length - 1 ? this.snapshot.length() : lineMap[lineMapIndex + 1]);
                for (var p = endIncludingLineBreak - 1; p >= start; p--) {
                    var c = this.snapshot.substr(p, 1);
                    //TODO: Other ones?
                    if (c != "\r" && c != "\n") {
                        break;
                    }
                }
                end = p + 1;
                lineBreak = this.snapshot.substr(end, endIncludingLineBreak - end);
            }
            var result = new TextSnapshotLine(this, lineNumber, start, end, lineBreak);
            return result;
        }
    }
}