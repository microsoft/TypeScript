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

/// <reference path='services.ts' />

/// <reference path='core\references.ts' />
/// <reference path='resources\references.ts' />
/// <reference path='text\references.ts' />
/// <reference path='syntax\references.ts' />

/// <reference path='syntax\incrementalParser.ts' />

/// <reference path='coreServices.ts' />
/// <reference path='classifier.ts' />
/// <reference path='languageService.ts' />
/// <reference path='pullLanguageService.ts' />
/// <reference path='shims.ts' />

/// <reference path='outliningElementsCollector.ts' />
/// <reference path='GetScriptLexicalStructureWalker.ts' />
/// <reference path='BraceMatcher.ts' />
/// <reference path='Breakpoints.ts' />
/// <reference path='indentation.ts' />
/// <reference path='formatting\formatting.ts' />
/// <reference path='completionHelpers.ts' />
/// <reference path='keywordCompletions.ts' />


/// <reference path='compiler\document.ts' />
/// <reference path='compiler\diagnostics.ts' />
/// <reference path='compiler\hashTable.ts' />
/// <reference path='compiler\base64.ts' />
/// <reference path='compiler\pathUtils.ts' />
/// <reference path='compiler\referenceResolution.ts' />
/// <reference path='compiler\precompile.ts' />
/// <reference path='compiler\bloomFilter.ts' />
/// <reference path='compiler\flags.ts' />
/// <reference path='compiler\types.ts' />
/// <reference path='compiler\ast.ts' />
/// <reference path='compiler\astWalker.ts' />
/// <reference path='compiler\asthelpers.ts' />


///<reference path='compiler\referenceResolver.ts' />

module TypeScript {

    export var sentinelEmptyArray = [];

    export enum EmitOutputResult {
        Succeeded,
        FailedBecauseOfSyntaxErrors,
        FailedBecauseOfCompilerOptionsErrors,
        FailedToGenerateDeclarationsBecauseOfSemanticErrors
    }

    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitOutputResult: EmitOutputResult;
    }

    export enum OutputFileType {
        JavaScript,
        SourceMap,
        Declaration
    }

    export enum ByteOrderMark {
        None = 0,
        Utf8 = 1,
        Utf16BigEndian = 2,
        Utf16LittleEndian = 3,
    }

    export interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
        fileType: OutputFileType;
        sourceMapOutput: any;
    }

    export interface ICancellationToken {
        isCancellationRequested(): boolean;
    }

    export class OperationCanceledException { }

    export class CancellationToken {

        public static None: CancellationToken = new CancellationToken(null)

        constructor(private cancellationToken: ICancellationToken) {
        }

        public isCancellationRequested() {
            return this.cancellationToken && this.cancellationToken.isCancellationRequested();
        }

        public throwIfCancellationRequested(): void {
            if (this.isCancellationRequested()) {
                throw new OperationCanceledException();
            }
        }
    }

    export function compareDataObjects(dst: any, src: any): boolean {
        for (var e in dst) {
            if (typeof dst[e] === "object") {
                if (!compareDataObjects(dst[e], src[e]))
                    return false;
            }
            else if (typeof dst[e] !== "function") {
                if (dst[e] !== src[e])
                    return false;
            }
        }
        return true;
    }
}
