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
///<reference path='typescriptServices.ts' />

module TypeScript.Services {

    export interface CachedCompletionEntryDetails extends CompletionEntryDetails{
        isResolved(): boolean;
    }

    export class ResolvedCompletionEntry implements CachedCompletionEntryDetails {
        constructor(public name: string,
            public kind: string,
            public kindModifiers: string,
            public type: string,
            public fullSymbolName: string,
            public docComment: string) {
        }

        public isResolved(): boolean {
            return true;
        }
    }

    export class DeclReferenceCompletionEntry implements CachedCompletionEntryDetails {
        public type: string = null;
        public fullSymbolName: string = null;
        public docComment: string = null;

        private hasBeenResolved = false;

        constructor(public name: string,
            public kind: string,
            public kindModifiers: string,
            public decl: TypeScript.PullDecl) {
        }

        public isResolved(): boolean {
            return this.hasBeenResolved;
        }

        public resolve(type: string, fullSymbolName: string, docComments: string) {
            this.type = type;
            this.fullSymbolName = fullSymbolName;
            this.docComment = docComments;
            this.hasBeenResolved = true;
        }
    }

    export class CompletionSession {
        constructor(public fileName: string,
            public position: number,
            public entries: TypeScript.IdentiferNameHashTable<CachedCompletionEntryDetails>) {
        }
    }
}