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

///<reference path='es5compat.ts' />
///<reference path='..\compiler\typescript.ts' />
///<reference path='coreServices.ts' />
///<reference path='classifier.ts' />
///<reference path='compilerState.ts' />
///<reference path='languageService.ts' />
///<reference path='completionHelpers.ts' />
///<reference path='keywordCompletions.ts' />
///<reference path='signatureInfoHelpers.ts' />
///<reference path='completionSession.ts' />
///<reference path='pullLanguageService.ts' />
///<reference path='findReferenceHelpers.ts' />
///<reference path='shims.ts' />
///<reference path='formatting\formatting.ts' />
///<reference path='outliningElementsCollector.ts' />
///<reference path='braceMatcher.ts' />
///<reference path='indenter.ts' />
///<reference path='breakpoints.ts' />
///<reference path='getScriptLexicalStructureWalker.ts' />

module TypeScript.Services {
    export function copyDataObject(dst: any, src: any): any {
        for (var e in dst) {
            if (typeof dst[e] == "object") {
                copyDataObject(dst[e], src[e]);
            }
            else if (typeof dst[e] != "function") {
                dst[e] = src[e];
            }
        }
        return dst;
    }

    export class TypeScriptServicesFactory implements IShimFactory {
        private _shims: IShim[] = [];

        public createPullLanguageService(host: TypeScript.Services.ILanguageServiceHost): TypeScript.Services.ILanguageService {
            try {
                return new TypeScript.Services.LanguageService(host);
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

