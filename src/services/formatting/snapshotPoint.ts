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

    export class SnapshotPoint {
        constructor(public snapshot: ITextSnapshot, public position: number) {
        }
        public getContainingLine(): ITextSnapshotLine {
            return this.snapshot.getLineFromPosition(this.position);
        }
        public add(offset: number): SnapshotPoint {
            return new SnapshotPoint(this.snapshot, this.position + offset);
        }
    }
}