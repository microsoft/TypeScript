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
    export class SourceMapPosition {
        public sourceLine: number;
        public sourceColumn: number;
        public emittedLine: number;
        public emittedColumn: number;
    }

    export class SourceMapping {
        public start = new SourceMapPosition();
        public end = new SourceMapPosition();
        public nameIndex: number = -1;
        public childMappings: SourceMapping[] = [];
    }

    export class SourceMapEntry {
        constructor(
            public emittedFile: string,
            public emittedLine: number,
            public emittedColumn: number,
            public sourceFile: string,
            public sourceLine: number,
            public sourceColumn: number,
            public sourceName: string) {

            Debug.assert(isFinite(emittedLine));
            Debug.assert(isFinite(emittedColumn));
            Debug.assert(isFinite(sourceColumn));
            Debug.assert(isFinite(sourceLine));
        }
    }

    export class SourceMapper {
        static MapFileExtension = ".map";

        private jsFileName: string;
        private sourceMapPath: string;
        private sourceMapDirectory: string;
        private sourceRoot: string;

        public names: string[] = [];

        private mappingLevel: IASTSpan[] = [];

        // Below two arrays represent the information about sourceFile at that index.
        private tsFilePaths: string[] = [];
        private allSourceMappings: SourceMapping[][] = [];

        public currentMappings: SourceMapping[][];
        public currentNameIndex: number[];

        private sourceMapEntries: SourceMapEntry[] = [];

        constructor(private jsFile: TextWriter,
                    private sourceMapOut: TextWriter,
                    document: Document,
                    jsFilePath: string,
                    emitOptions: EmitOptions,
                    resolvePath: (path: string) => string) {
            this.setSourceMapOptions(document, jsFilePath, emitOptions, resolvePath);
            this.setNewSourceFile(document, emitOptions);
        }

        public getOutputFile(): OutputFile {
            var result = this.sourceMapOut.getOutputFile();
            result.sourceMapEntries = this.sourceMapEntries;

            return result;
        }

        public increaseMappingLevel(ast: IASTSpan) {
            this.mappingLevel.push(ast);
        }

        public decreaseMappingLevel(ast: IASTSpan) {
            Debug.assert(this.mappingLevel.length > 0, "Mapping level should never be less than 0. This suggests a missing start call.");
            var expectedAst = this.mappingLevel.pop();
            var expectedAstInfo: any = (<AST>expectedAst).kind ? SyntaxKind[(<AST>expectedAst).kind()] : [expectedAst.start(), expectedAst.end()];
            var astInfo: any = (<AST>ast).kind ? SyntaxKind[(<AST>ast).kind()] : [ast.start(), ast.end()]
            Debug.assert(
                ast === expectedAst,
                "Provided ast is not the expected AST, Expected: " + expectedAstInfo + " Given: " + astInfo)
        }

        public setNewSourceFile(document: Document, emitOptions: EmitOptions) {
            // Set new mappings
            var sourceMappings: SourceMapping[] = [];
            this.allSourceMappings.push(sourceMappings);
            this.currentMappings = [sourceMappings];
            this.currentNameIndex = [];

            // Set new source file path
            this.setNewSourceFilePath(document, emitOptions);
        }

        private setSourceMapOptions(document: Document, jsFilePath: string, emitOptions: EmitOptions, resolvePath: (path: string) => string) {
            // Decode mapRoot and sourceRoot

            // Js File Name = pretty name of js file
            var prettyJsFileName = TypeScript.getPrettyName(jsFilePath, false, true);
            var prettyMapFileName = prettyJsFileName + SourceMapper.MapFileExtension;
            this.jsFileName = prettyJsFileName;

            // Figure out sourceMapPath and sourceMapDirectory
            if (emitOptions.sourceMapRootDirectory()) {
                // Get the sourceMap Directory
                this.sourceMapDirectory = emitOptions.sourceMapRootDirectory();
                if (document.emitToOwnOutputFile()) {
                    // For modules or multiple emit files the mapRoot will have directory structure like the sources
                    // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                    this.sourceMapDirectory = this.sourceMapDirectory + switchToForwardSlashes(getRootFilePath((document.fileName)).replace(emitOptions.commonDirectoryPath(), ""));
                }

                if (isRelative(this.sourceMapDirectory)) {
                    // The relative paths are relative to the common directory
                    this.sourceMapDirectory = emitOptions.commonDirectoryPath() + this.sourceMapDirectory;
                    this.sourceMapDirectory = convertToDirectoryPath(switchToForwardSlashes(resolvePath(this.sourceMapDirectory)));
                    this.sourceMapPath = getRelativePathToFixedPath(getRootFilePath(jsFilePath), this.sourceMapDirectory + prettyMapFileName);
                }
                else {
                    this.sourceMapPath = this.sourceMapDirectory + prettyMapFileName;
                }
            }
            else {
                this.sourceMapPath = prettyMapFileName;
                this.sourceMapDirectory = getRootFilePath(jsFilePath);
            }
            this.sourceRoot = emitOptions.sourceRootDirectory();
        }

        private setNewSourceFilePath(document: Document, emitOptions: EmitOptions) {
            var tsFilePath = switchToForwardSlashes(document.fileName);
            if (emitOptions.sourceRootDirectory()) {
                // Use the relative path corresponding to the common directory path
                tsFilePath = getRelativePathToFixedPath(emitOptions.commonDirectoryPath(), tsFilePath);
            }
            else {
                // Source locations relative to map file location
                tsFilePath = getRelativePathToFixedPath(this.sourceMapDirectory, tsFilePath);
            }
            this.tsFilePaths.push(tsFilePath);
        }
        
        // Generate source mapping.
        // Creating files can cause exceptions, they will be caught higher up in TypeScriptCompiler.emit
        public emitSourceMapping(): void {
            Debug.assert(
                this.mappingLevel.length === 0,
                "Mapping level is not 0. This suggest a missing end call. Value: " +
                this.mappingLevel.map(item => ['Node of type', SyntaxKind[(<AST>item).kind()], 'at', item.start(), 'to', item.end()].join(' ')).join(', '));
            // Output map file name into the js file
            this.jsFile.WriteLine("//# sourceMappingURL=" + this.sourceMapPath);

            // Now output map file
            var mappingsString = "";

            var prevEmittedColumn = 0;
            var prevEmittedLine = 0;
            var prevSourceColumn = 0;
            var prevSourceLine = 0;
            var prevSourceIndex = 0;
            var prevNameIndex = 0;
            var emitComma = false;

            var recordedPosition: SourceMapPosition = null;
            for (var sourceIndex = 0; sourceIndex < this.tsFilePaths.length; sourceIndex++) {
                var recordSourceMapping = (mappedPosition: SourceMapPosition, nameIndex: number) => {

                    if (recordedPosition !== null &&
                        recordedPosition.emittedColumn === mappedPosition.emittedColumn &&
                        recordedPosition.emittedLine === mappedPosition.emittedLine) {
                        // This position is already recorded
                        return;
                    }

                    // Record this position
                    if (prevEmittedLine !== mappedPosition.emittedLine) {
                        while (prevEmittedLine < mappedPosition.emittedLine) {
                            prevEmittedColumn = 0;
                            mappingsString = mappingsString + ";";
                            prevEmittedLine++;
                        }
                        emitComma = false;
                    }
                    else if (emitComma) {
                        mappingsString = mappingsString + ",";
                    }

                    this.sourceMapEntries.push(new SourceMapEntry(
                        this.jsFileName,
                        mappedPosition.emittedLine + 1,
                        mappedPosition.emittedColumn + 1,
                        this.tsFilePaths[sourceIndex],
                        mappedPosition.sourceLine,
                        mappedPosition.sourceColumn + 1,
                        nameIndex >= 0 ? this.names[nameIndex] : undefined));

                    // 1. Relative Column
                    mappingsString = mappingsString + Base64VLQFormat.encode(mappedPosition.emittedColumn - prevEmittedColumn);
                    prevEmittedColumn = mappedPosition.emittedColumn;

                    // 2. Relative sourceIndex 
                    mappingsString = mappingsString + Base64VLQFormat.encode(sourceIndex - prevSourceIndex);
                    prevSourceIndex = sourceIndex;

                    // 3. Relative sourceLine 0 based
                    mappingsString = mappingsString + Base64VLQFormat.encode(mappedPosition.sourceLine - 1 - prevSourceLine);
                    prevSourceLine = mappedPosition.sourceLine - 1;

                    // 4. Relative sourceColumn 0 based 
                    mappingsString = mappingsString + Base64VLQFormat.encode(mappedPosition.sourceColumn - prevSourceColumn);
                    prevSourceColumn = mappedPosition.sourceColumn;

                    // 5. Relative namePosition 0 based
                    if (nameIndex >= 0) {
                        mappingsString = mappingsString + Base64VLQFormat.encode(nameIndex - prevNameIndex);
                        prevNameIndex = nameIndex;
                    }

                    emitComma = true;
                    recordedPosition = mappedPosition;
                };

                // Record starting spans
                var recordSourceMappingSiblings = (sourceMappings: SourceMapping[]) => {
                    for (var i = 0; i < sourceMappings.length; i++) {
                        var sourceMapping = sourceMappings[i];
                        recordSourceMapping(sourceMapping.start, sourceMapping.nameIndex);
                        recordSourceMappingSiblings(sourceMapping.childMappings);
                        recordSourceMapping(sourceMapping.end, sourceMapping.nameIndex);
                    }
                };

                recordSourceMappingSiblings(this.allSourceMappings[sourceIndex]);
            }

            // Write the actual map file
            this.sourceMapOut.Write(JSON.stringify({
                version: 3,
                file: this.jsFileName,
                sourceRoot: this.sourceRoot,
                sources: this.tsFilePaths,
                names: this.names,
                mappings: mappingsString
            }));

            // Closing files could result in exceptions, report them if they occur
            this.sourceMapOut.Close();
        }
    }
}