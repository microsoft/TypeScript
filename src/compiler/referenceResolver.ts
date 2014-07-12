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
    export interface IResolvedFile {
        path: string;
        referencedFiles: string[];
        importedFiles: string[];
    }

    export interface IReferenceResolverHost {
        getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot;
        resolveRelativePath(path: string, directory: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        getParentDirectory(path: string): string;
    }

    export class ReferenceResolutionResult {
        resolvedFiles: IResolvedFile[] = [];
        diagnostics: TypeScript.Diagnostic[] = [];
        seenNoDefaultLibTag: boolean = false;
    }

    class ReferenceLocation {
        constructor(public filePath: string, public lineMap: LineMap, public position: number, public length: number, public isImported: boolean) {
        }
    }

    export class ReferenceResolver {
        private inputFileNames: string[];
        private host: IReferenceResolverHost;
        private visited: IIndexable<string>;

        constructor(inputFileNames: string[], host: IReferenceResolverHost, private useCaseSensitiveFileResolution: boolean) {
            this.inputFileNames = inputFileNames;
            this.host = host;
            this.visited = {};
        }

        public static resolve(inputFileNames: string[], host: IReferenceResolverHost, useCaseSensitiveFileResolution: boolean): ReferenceResolutionResult {
            var resolver = new ReferenceResolver(inputFileNames, host, useCaseSensitiveFileResolution);
            return resolver.resolveInputFiles();
        }

        public resolveInputFiles(): ReferenceResolutionResult {
            var result = new ReferenceResolutionResult();

            if (!this.inputFileNames || this.inputFileNames.length <= 0) {
                // Nothing to do.
                return result;
            }

            // Loop over the files and extract references
            var referenceLocation = new ReferenceLocation(null, null, 0, 0, false);
            this.inputFileNames.forEach(fileName =>
                this.resolveIncludedFile(fileName, referenceLocation, result));

            return result;
        }

        private resolveIncludedFile(path: string, referenceLocation: ReferenceLocation, resolutionResult: ReferenceResolutionResult): string {
            var normalizedPath = this.getNormalizedFilePath(path, referenceLocation.filePath);

            if (this.isSameFile(normalizedPath, referenceLocation.filePath)) {
                // Cannot reference self
                if (!referenceLocation.isImported) {
                    resolutionResult.diagnostics.push(
                        new TypeScript.Diagnostic(referenceLocation.filePath, referenceLocation.lineMap,
                            referenceLocation.position, referenceLocation.length, DiagnosticCode.A_file_cannot_have_a_reference_to_itself, null));
                }

                return normalizedPath;
            }

            if (!isTSFile(normalizedPath) && !isDTSFile(normalizedPath)) {
                var dtsFile = normalizedPath + ".d.ts";
                var tsFile = normalizedPath + ".ts";

                if (this.host.fileExists(tsFile)) {
                    normalizedPath = tsFile;
                }
                else {
                    normalizedPath = dtsFile;
                }
            }

            if (!this.host.fileExists(normalizedPath)) {
                if (!referenceLocation.isImported) {
                    resolutionResult.diagnostics.push(
                        new TypeScript.Diagnostic(referenceLocation.filePath, referenceLocation.lineMap,
                            referenceLocation.position, referenceLocation.length, DiagnosticCode.Cannot_resolve_referenced_file_0, [path]));
                }

                return normalizedPath;
            }

            // Preprocess the file and resolve its imports/references
            return this.resolveFile(normalizedPath, resolutionResult);
        }

        private resolveImportedFile(path: string, referenceLocation: ReferenceLocation, resolutionResult: ReferenceResolutionResult): string {
            var isRelativePath = TypeScript.isRelative(path);
            var isRootedPath = isRelativePath ? false : isRooted(path);

            if (isRelativePath || isRootedPath) {
                // Handle as a normal include file
                return this.resolveIncludedFile(path, referenceLocation, resolutionResult);
            }
            else {
                // Search for the file
                var parentDirectory = this.host.getParentDirectory(referenceLocation.filePath);
                var searchFilePath: string = null;
                var dtsFileName = path + ".d.ts";
                var tsFilePath = path + ".ts";

                var start = new Date().getTime();

                // SPEC: Nov 18
                // An external import declaration that specifies a relative external module name (section 11.2.1) resolves the name 
                // relative to the directory of the containing source file.
                // If a source file with the resulting path and file extension '.ts' exists, that file is added as a dependency.
                // Otherwise, if a source file with the resulting path and file extension '.d.ts' exists, that file is added as a dependency.
                do {
                    // Search for ".ts" file first
                    currentFilePath = this.host.resolveRelativePath(tsFilePath, parentDirectory);
                    if (this.host.fileExists(currentFilePath)) {
                        // Found the file
                        searchFilePath = currentFilePath;
                        break;
                    }

                    // Search for ".d.ts" file
                    var currentFilePath = this.host.resolveRelativePath(dtsFileName, parentDirectory);
                    if (this.host.fileExists(currentFilePath)) {
                        // Found the file
                        searchFilePath = currentFilePath;
                        break;
                    }

                    parentDirectory = this.host.getParentDirectory(parentDirectory);
                }
                while (parentDirectory);

                TypeScript.fileResolutionImportFileSearchTime += new Date().getTime() - start;

                if (!searchFilePath) {
                    // Cannot find file import, do not reprot an error, the typeChecker will report it later on
                    return path;
                }

                // Preprocess the file and resolve its imports/references
                return this.resolveFile(searchFilePath, resolutionResult);
            }
        }

        private resolveFile(normalizedPath: string, resolutionResult: ReferenceResolutionResult): string {
            // If we have processed this file before, skip it
            var visitedPath = this.isVisited(normalizedPath);
            if (!visitedPath) {
                // Record that we have seen it
                this.recordVisitedFile(normalizedPath);

                // Preprocess the file
                var start = new Date().getTime();
                var scriptSnapshot = this.host.getScriptSnapshot(normalizedPath);
                var totalTime = new Date().getTime() - start;
                TypeScript.fileResolutionIOTime += totalTime;

                var lineMap = LineMap1.fromScriptSnapshot(scriptSnapshot);
                var preprocessedFileInformation = TypeScript.preProcessFile(normalizedPath, scriptSnapshot);
                resolutionResult.diagnostics.push.apply(resolutionResult.diagnostics, preprocessedFileInformation.diagnostics);

                // If this file has a "no-default-lib = 'true'" tag
                if (preprocessedFileInformation.isLibFile) {
                    resolutionResult.seenNoDefaultLibTag = true;
                }

                // Resolve explicit references
                var normalizedReferencePaths: string[] = [];
                preprocessedFileInformation.referencedFiles.forEach(fileReference => {
                    var currentReferenceLocation = new ReferenceLocation(normalizedPath, lineMap, fileReference.position, fileReference.length, /* isImported */ false);
                    var normalizedReferencePath = this.resolveIncludedFile(fileReference.path, currentReferenceLocation, resolutionResult);
                    normalizedReferencePaths.push(normalizedReferencePath);
                });

                // Resolve imports
                var normalizedImportPaths: string[] = [];
                for (var i = 0; i < preprocessedFileInformation.importedFiles.length; i++) {
                    var fileImport = preprocessedFileInformation.importedFiles[i];
                    var currentReferenceLocation = new ReferenceLocation(normalizedPath, lineMap, fileImport.position, fileImport.length, /* isImported */ true);
                    var normalizedImportPath = this.resolveImportedFile(fileImport.path, currentReferenceLocation, resolutionResult);
                    normalizedImportPaths.push(normalizedImportPath);
                }

                // Add the file to the result list
                resolutionResult.resolvedFiles.push({
                    path: normalizedPath,
                    referencedFiles: normalizedReferencePaths,
                    importedFiles: normalizedImportPaths
                });
            }
            else {
                normalizedPath = visitedPath;
            }

            return normalizedPath;
        }

        private getNormalizedFilePath(path: string, parentFilePath: string): string {
            var parentFileDirectory = parentFilePath ? this.host.getParentDirectory(parentFilePath) : "";
            var normalizedPath = this.host.resolveRelativePath(path, parentFileDirectory);
            return normalizedPath;
        }

        private getUniqueFileId(filePath: string): string {
            return this.useCaseSensitiveFileResolution ? filePath : filePath.toLocaleUpperCase();
        }

        private recordVisitedFile(filePath: string): void {
            this.visited[this.getUniqueFileId(filePath)] = filePath;
        }

        private isVisited(filePath: string): string {
            return this.visited[this.getUniqueFileId(filePath)];
        }

        private isSameFile(filePath1: string, filePath2: string): boolean {
            if (!filePath1 || !filePath2) {
                return false;
            }

            if (this.useCaseSensitiveFileResolution) {
                return filePath1 === filePath2;
            }
            else {
                return filePath1.toLocaleUpperCase() === filePath2.toLocaleUpperCase();
            }
        }
    }
}