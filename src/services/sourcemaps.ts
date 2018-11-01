/* @internal */
namespace ts {
    // Sometimes tools can sometimes see the following line as a source mapping url comment, so we mangle it a bit (the [M])
    const sourceMapCommentRegExp = /^\/\/[@#] source[M]appingURL=(.+)\s*$/;
    const whitespaceOrMapCommentRegExp = /^\s*(\/\/[@#] .*)?$/;
    const base64UrlRegExp = /^data:(?:application\/json(?:;charset=[uU][tT][fF]-8);base64,([A-Za-z0-9+\/=]+)$)?/;

    export interface SourceMapper {
        toLineColumnOffset(fileName: string, position: number): LineAndCharacter;
        tryGetOriginalLocation(info: sourcemaps.SourceMappableLocation): sourcemaps.SourceMappableLocation | undefined;
        tryGetGeneratedLocation(info: sourcemaps.SourceMappableLocation): sourcemaps.SourceMappableLocation | undefined;
        clearCache(): void;
    }

    export function getSourceMapper(
        useCaseSensitiveFileNames: boolean,
        currentDirectory: string,
        log: (message: string) => void,
        host: LanguageServiceHost,
        getProgram: () => Program,
    ): SourceMapper {
        const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
        let sourcemappedFileCache: SourceFileLikeCache;
        return { tryGetOriginalLocation, tryGetGeneratedLocation, toLineColumnOffset, clearCache };

        function scanForSourcemapURL(fileName: string) {
            const mappedFile = sourcemappedFileCache.get(toPath(fileName, currentDirectory, getCanonicalFileName));
            if (!mappedFile) {
                return;
            }
            const starts = getLineStarts(mappedFile);
            for (let index = starts.length - 1; index >= 0; index--) {
                const lineText = mappedFile.text.substring(starts[index], starts[index + 1]);
                const comment = sourceMapCommentRegExp.exec(lineText);
                if (comment) {
                    return comment[1];
                }
                // If we see a non-whitespace/map comment-like line, break, to avoid scanning up the entire file
                else if (!lineText.match(whitespaceOrMapCommentRegExp)) {
                    break;
                }
            }
        }

        function convertDocumentToSourceMapper(file: { sourceMapper?: sourcemaps.SourceMapper }, contents: string, mapFileName: string) {
            let maps: sourcemaps.SourceMapData | undefined;
            try {
                maps = JSON.parse(contents);
            }
            catch {
                // swallow error
            }
            if (!maps || !maps.sources || !maps.file || !maps.mappings) {
                // obviously invalid map
                return file.sourceMapper = sourcemaps.identitySourceMapper;
            }
            return file.sourceMapper = sourcemaps.decode({
                readFile: s => host.readFile!(s), // TODO: GH#18217
                fileExists: s => host.fileExists!(s), // TODO: GH#18217
                useCaseSensitiveFileNames,
                getCanonicalFileName,
                log,
            }, mapFileName, maps, getProgram(), sourcemappedFileCache);
        }

        function getSourceMapper(fileName: string, file: SourceFileLike): sourcemaps.SourceMapper {
            if (!host.readFile || !host.fileExists) {
                return file.sourceMapper = sourcemaps.identitySourceMapper;
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
            return file.sourceMapper = sourcemaps.identitySourceMapper;
        }

        function tryGetOriginalLocation(info: sourcemaps.SourceMappableLocation): sourcemaps.SourceMappableLocation | undefined {
            if (!isDeclarationFileName(info.fileName)) return undefined;

            const file = getFile(info.fileName);
            if (!file) return undefined;
            const newLoc = getSourceMapper(info.fileName, file).getOriginalPosition(info);
            return newLoc === info ? undefined : tryGetOriginalLocation(newLoc) || newLoc;
        }

        function tryGetGeneratedLocation(info: sourcemaps.SourceMappableLocation): sourcemaps.SourceMappableLocation | undefined {
            const program = getProgram();
            const options = program.getCompilerOptions();
            const outPath = options.outFile || options.out;
            const declarationPath = outPath ?
                removeFileExtension(outPath) + Extension.Dts :
                getDeclarationEmitOutputFilePathWorker(info.fileName, program.getCompilerOptions(), currentDirectory, program.getCommonSourceDirectory(), getCanonicalFileName);
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
}
