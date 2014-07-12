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
    export interface ITextSnapshotLine {
        snapshot(): ITextSnapshot;

        start(): SnapshotPoint;
        startPosition(): number;

        end(): SnapshotPoint;
        endPosition(): number;

        endIncludingLineBreak(): SnapshotPoint;
        endIncludingLineBreakPosition(): number;

        length(): number;
        lineNumber(): number;
        getText(): string;
    }

    export class TextSnapshotLine implements ITextSnapshotLine {
        constructor(private _snapshot: ITextSnapshot, private _lineNumber: number, private _start: number, private _end: number, private _lineBreak: string) {
        }

        public snapshot() {
            return this._snapshot;
        }

        public start() {
            return new SnapshotPoint(this._snapshot, this._start);
        }

        public startPosition() {
            return this._start;
        }

        public end() {
            return new SnapshotPoint(this._snapshot, this._end);
        }

        public endPosition() {
            return this._end;
        }

        public endIncludingLineBreak() {
            return new SnapshotPoint(this._snapshot, this._end + this._lineBreak.length);
        }

        public endIncludingLineBreakPosition() {
            return this._end + this._lineBreak.length;
        }

        public length() {
            return this._end - this._start;
        }

        public lineNumber() {
            return this._lineNumber;
        }

        public getText(): string {
            return this._snapshot.getText(TextSpan.fromBounds(this._start, this._end));
        }
    }
}