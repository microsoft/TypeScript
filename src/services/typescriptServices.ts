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


module TypeScript.Services {
    export class TypeScriptServicesFactory implements IShimFactory {
        private _shims: IShim[] = [];
        private documentRegistry: DocumentRegistry = new DocumentRegistry();

        public createPullLanguageService(host: TypeScript.Services.LanguageServiceHost): TypeScript.Services.LanguageService {
            try {
                return TypeScript.Services.createLanguageService(host, this.documentRegistry);
            }
            catch (err) {
                TypeScript.Services.logInternalError(host, err);
                throw err;
            }
        }

        public createLanguageServiceShim(host: ILanguageServiceShimHost): ILanguageServiceShim {
            try {
                var hostAdapter = new LanguageServiceShimHostAdapter(host);
                var pullLanguageService = this.createPullLanguageService(hostAdapter);
                return new LanguageServiceShim(this, host, pullLanguageService);
            }
            catch (err) {
                TypeScript.Services.logInternalError(host, err);
                throw err;
            }
        }

        public createClassifier(host: TypeScript.Services.IClassifierHost): TypeScript.Services.Classifier {
            try {
                return new TypeScript.Services.Classifier(host);
            }
            catch (err) {
                TypeScript.Services.logInternalError(host, err);
                throw err;
            }
        }

        public createClassifierShim(host: TypeScript.Services.IClassifierHost): ClassifierShim {
            try {
                return new ClassifierShim(this, host);
            }
            catch (err) {
                TypeScript.Services.logInternalError(host, err);
                throw err;
            }
        }

        public createCoreServices(host: TypeScript.Services.ICoreServicesHost): TypeScript.Services.CoreServices {
            try {
                return new TypeScript.Services.CoreServices(host);
            }
            catch (err) {
                TypeScript.Services.logInternalError(host.logger, err);
                throw err;
            }
        }

        public createCoreServicesShim(host: TypeScript.Services.ICoreServicesHost): CoreServicesShim {
            try {
                return new CoreServicesShim(this, host);
            }
            catch (err) {
                TypeScript.Services.logInternalError(host.logger, err);
                throw err;
            }
        }

        public close(): void {
            // Forget all the registered shims
            this._shims = [];
            this.documentRegistry = new DocumentRegistry();
        }

        public registerShim(shim: IShim): void {
            this._shims.push(shim);
        }

        public unregisterShim(shim: IShim): void {
            for(var i =0, n = this._shims.length; i<n; i++) {
                if (this._shims[i] === shim) {
                    delete this._shims[i];
                    return;
                }
            }

            throw TypeScript.Errors.invalidOperation();
        }
    }
}


module Services {
    export var TypeScriptServicesFactory = TypeScript.Services.TypeScriptServicesFactory;
}

