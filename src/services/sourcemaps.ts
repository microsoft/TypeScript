/* @internal */
namespace ts {
    const base64UrlRegExp = /^data:(?:application\/json(?:;charset=[uU][tT][fF]-8);base64,([A-Za-z0-9+\/=]+)$)?/;

    export interface SourceMapper {
        toLineColumnOffset(fileName: string, position: number): LineAndCharacter;
        tryGetSourcePosition(info: DocumentPosition): DocumentPosition | undefined;
        tryGetGeneratedPosition(info: DocumentPosition): DocumentPosition | undefined;
        clearCache(): void;
    }

    export interface SourceMapperHost {
        useCaseSensitiveFileNames(): boolean;
        getCurrentDirectory(): string;
        getProgram(): Program | undefined;
        fileExists(path: string): boolean;
        readFile(path: string, encoding?: string): string | undefined;
        log(s: string): void;
    }

    export function getSourceMapper(
        host: SourceMapperHost
    ): SourceMapper {
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
        const currentDirectory = host.getCurrentDirectory();
        const sourceFileLike = createMap<SourceFileLike | false>();
        return { tryGetSourcePosition, tryGetGeneratedPosition, toLineColumnOffset, clearCache };

        function toPath(fileName: string) {
            return ts.toPath(fileName, currentDirectory, getCanonicalFileName);
        }

        function scanForSourcemapURL(fileName: string) {
            const mappedFile = sourceFileLike.get(toPath(fileName));
            if (!mappedFile) {
                return;
            }

            return tryGetSourceMappingURL(mappedFile.text, getLineStarts(mappedFile));
        }

        function convertDocumentToSourceMapper(file: SourceFileLike, contents: string, mapFileName: string) {
            const map = tryParseRawSourceMap(contents);
            if (!map || !map.sources || !map.file || !map.mappings) {
                // obviously invalid map
                return file.sourceMapper = identitySourceMapConsumer;
            }

            return file.sourceMapper = createDocumentPositionMapper({
                getSourceFileLike,
                getCanonicalFileName,
                log: s => host.log(s),
            }, map, mapFileName);
        }

        function getSourceMapper(fileName: string, file: SourceFileLike): DocumentPositionMapper {
            if (file.sourceMapper) {
                return file.sourceMapper;
            }
            let mapFileName = scanForSourcemapURL(fileName);
            if (mapFileName) {
                const match = base64UrlRegExp.exec(mapFileName);
                if (match) {
                    if (match[1]) {
                        const base64Object = match[1];
                        return convertDocumentToSourceMapper(file, base64decode(sys, base64Object), fileName);
                    }
                    // Not a data URL we can parse, skip it
                    mapFileName = undefined;
                }
            }
            const possibleMapLocations: string[] = [];
            if (mapFileName) {
                possibleMapLocations.push(mapFileName);
            }
            possibleMapLocations.push(fileName + ".map");
            for (const location of possibleMapLocations) {
                const mapFileName = getNormalizedAbsolutePath(location, getDirectoryPath(fileName));
                if (host.fileExists(mapFileName)) {
                    return convertDocumentToSourceMapper(file, host.readFile(mapFileName)!, mapFileName); // TODO: GH#18217
                }
            }
            return file.sourceMapper = identitySourceMapConsumer;
        }

        function tryGetSourcePosition(info: DocumentPosition): DocumentPosition | undefined {
            if (!isDeclarationFileName(info.fileName)) return undefined;

            const file = getSourceFile(info.fileName);
            if (!file) return undefined;

            const newLoc = getSourceMapper(info.fileName, file).getSourcePosition(info);
            return newLoc === info ? undefined : tryGetSourcePosition(newLoc) || newLoc;
        }

        function tryGetGeneratedPosition(info: DocumentPosition): DocumentPosition | undefined {
            const program = host.getProgram();
            if (!program) return undefined;

            const options = program.getCompilerOptions();
            const outPath = options.outFile || options.out;

            const declarationPath = outPath ?
                removeFileExtension(outPath) + Extension.Dts :
                getDeclarationEmitOutputFilePathWorker(info.fileName, program.getCompilerOptions(), currentDirectory, program.getCommonSourceDirectory(), getCanonicalFileName);
            if (declarationPath === undefined) return undefined;

            const declarationFile = getSourceFileLikeFromCache(declarationPath);
            if (!declarationFile) return undefined;

            const newLoc = getSourceMapper(declarationPath, declarationFile).getGeneratedPosition(info);
            return newLoc === info ? undefined : newLoc;
        }

        function getSourceFile(fileName: string) {
            const program = host.getProgram();
            return program && program.getSourceFileByPath(toPath(fileName));
        }

        function getSourceFileLikeFromCache(fileName: string): SourceFileLike | undefined {
            const path = toPath(fileName);
            const fileFromCache = sourceFileLike.get(path);
            if (fileFromCache !== undefined) return fileFromCache ? fileFromCache : undefined;

            // TODO: should ask host instead?
            if (!host.fileExists(path)) {
                sourceFileLike.set(path, false);
                return undefined;
            }

            // And failing that, check the disk
            const text = host.readFile(path);
            const file: SourceFileLike | false = text ? {
                text,
                lineMap: undefined,
                getLineAndCharacterOfPosition(pos: number) {
                    return computeLineAndCharacterOfPosition(getLineStarts(this as SourceFileLike), pos);
                }
            } : false;
            sourceFileLike.set(path, file);
            return file ? file : undefined;
        }

        // This can be called from source mapper in either source program or program that includes generated file
        function getSourceFileLike(fileName: string) {
            const sourceFile = getSourceFile(fileName);
            // file returned here could be .d.ts when asked for .ts file if projectReferences and module resolution created this source file
            return sourceFile && sourceFile.resolvedPath === toPath(fileName) ? sourceFile : getSourceFileLikeFromCache(fileName);
        }

        function toLineColumnOffset(fileName: string, position: number): LineAndCharacter {
            const file = getSourceFileLike(fileName)!; // TODO: GH#18217
            return file.getLineAndCharacterOfPosition(position);
        }

        function clearCache(): void {
            sourceFileLike.clear();
        }
    }
}
