/* @internal */
namespace ts {
    const base64UrlRegExp = /^data:(?:application\/json(?:;charset=[uU][tT][fF]-8);base64,([A-Za-z0-9+\/=]+)$)?/;

    export interface SourceMapper {
        toLineColumnOffset(fileName: string, position: number): LineAndCharacter;
        tryGetSourcePosition(info: DocumentPosition): DocumentPosition | undefined;
        tryGetGeneratedPosition(info: DocumentPosition): DocumentPosition | undefined;
        clearCache(): void;
    }

    export function getSourceMapper(
        getCanonicalFileName: GetCanonicalFileName,
        currentDirectory: string,
        log: (message: string) => void,
        host: LanguageServiceHost,
        getProgram: () => Program,
    ): SourceMapper {
        let sourcemappedFileCache: SourceFileLikeCache;
        return { tryGetSourcePosition, tryGetGeneratedPosition, toLineColumnOffset, clearCache };

        function scanForSourcemapURL(fileName: string) {
            const mappedFile = sourcemappedFileCache.get(toPath(fileName, currentDirectory, getCanonicalFileName));
            if (!mappedFile) {
                return;
            }

            return tryGetSourceMappingURL(mappedFile.text, getLineStarts(mappedFile));
        }

        function convertDocumentToSourceMapper(file: { sourceMapper?: DocumentPositionMapper }, contents: string, mapFileName: string) {
            const map = tryParseRawSourceMap(contents);
            if (!map || !map.sources || !map.file || !map.mappings) {
                // obviously invalid map
                return file.sourceMapper = identitySourceMapConsumer;
            }
            const program = getProgram();
            return file.sourceMapper = createDocumentPositionMapper({
                getSourceFileLike: s => {
                    // Lookup file in program, if provided
                    const file = program && program.getSourceFile(s);
                    // file returned here could be .d.ts when asked for .ts file if projectReferences and module resolution created this source file
                    if (file === undefined || file.resolvedPath !== s) {
                        // Otherwise check the cache (which may hit disk)
                        return sourcemappedFileCache.get(s);
                    }
                    return file;
                },
                getCanonicalFileName,
                log,
            }, map, mapFileName);
        }

        function getSourceMapper(fileName: string, file: SourceFileLike): DocumentPositionMapper {
            if (!host.readFile || !host.fileExists) {
                return file.sourceMapper = identitySourceMapConsumer;
            }
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
                const mapPath = toPath(location, getDirectoryPath(fileName), getCanonicalFileName);
                if (host.fileExists(mapPath)) {
                    return convertDocumentToSourceMapper(file, host.readFile(mapPath)!, mapPath); // TODO: GH#18217
                }
            }
            return file.sourceMapper = identitySourceMapConsumer;
        }

        function tryGetSourcePosition(info: DocumentPosition): DocumentPosition | undefined {
            if (!isDeclarationFileName(info.fileName)) return undefined;

            const file = getFile(info.fileName);
            if (!file) return undefined;
            const newLoc = getSourceMapper(info.fileName, file).getSourcePosition(info);
            return newLoc === info ? undefined : tryGetSourcePosition(newLoc) || newLoc;
        }

        function tryGetGeneratedPosition(info: DocumentPosition): DocumentPosition | undefined {
            const program = getProgram();
            const declarationPath = getDeclarationEmitOutputFilePathWorker(info.fileName, program.getCompilerOptions(), currentDirectory, program.getCommonSourceDirectory(), getCanonicalFileName);
            if (declarationPath === undefined) return undefined;
            const declarationFile = getFile(declarationPath);
            if (!declarationFile) return undefined;
            const newLoc = getSourceMapper(declarationPath, declarationFile).getGeneratedPosition(info);
            return newLoc === info ? undefined : newLoc;
        }

        function getFile(fileName: string): SourceFileLike | undefined {
            return getProgram().getSourceFile(fileName) || sourcemappedFileCache.get(toPath(fileName, currentDirectory, getCanonicalFileName));
        }

        function toLineColumnOffset(fileName: string, position: number): LineAndCharacter {
            const path = toPath(fileName, currentDirectory, getCanonicalFileName);
            const file = getProgram().getSourceFile(path) || sourcemappedFileCache.get(path)!; // TODO: GH#18217
            return file.getLineAndCharacterOfPosition(position);
        }

        function clearCache(): void {
            sourcemappedFileCache = createSourceFileLikeCache(host);
        }
    }

    interface SourceFileLikeCache {
        get(path: Path): SourceFileLike | undefined;
    }

    function createSourceFileLikeCache(host: { readFile?: (path: string) => string | undefined, fileExists?: (path: string) => boolean }): SourceFileLikeCache {
        const cached = createMap<SourceFileLike>();
        return {
            get(path: Path) {
                if (cached.has(path)) {
                    return cached.get(path);
                }
                if (!host.fileExists || !host.readFile || !host.fileExists(path)) return;
                // And failing that, check the disk
                const text = host.readFile(path)!; // TODO: GH#18217
                const file = {
                    text,
                    lineMap: undefined,
                    getLineAndCharacterOfPosition(pos: number) {
                        return computeLineAndCharacterOfPosition(getLineStarts(this), pos);
                    }
                } as SourceFileLike;
                cached.set(path, file);
                return file;
            }
        };
    }
}
