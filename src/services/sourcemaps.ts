import * as ts from "./_namespaces/ts";

const base64UrlRegExp = /^data:(?:application\/json(?:;charset=[uU][tT][fF]-8);base64,([A-Za-z0-9+\/=]+)$)?/;

/** @internal */
export interface SourceMapper {
    toLineColumnOffset(fileName: string, position: number): ts.LineAndCharacter;
    tryGetSourcePosition(info: ts.DocumentPosition): ts.DocumentPosition | undefined;
    tryGetGeneratedPosition(info: ts.DocumentPosition): ts.DocumentPosition | undefined;
    clearCache(): void;
}

/** @internal */
export interface SourceMapperHost {
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory(): string;
    getProgram(): ts.Program | undefined;
    fileExists?(path: string): boolean;
    readFile?(path: string, encoding?: string): string | undefined;
    getSourceFileLike?(fileName: string): ts.SourceFileLike | undefined;
    getDocumentPositionMapper?(generatedFileName: string, sourceFileName?: string): ts.DocumentPositionMapper | undefined;
    log(s: string): void;
}

/** @internal */
export function getSourceMapper(host: SourceMapperHost): SourceMapper {
    const getCanonicalFileName = ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames());
    const currentDirectory = host.getCurrentDirectory();
    const sourceFileLike = new ts.Map<string, ts.SourceFileLike | false>();
    const documentPositionMappers = new ts.Map<string, ts.DocumentPositionMapper>();
    return { tryGetSourcePosition, tryGetGeneratedPosition, toLineColumnOffset, clearCache };

    function toPath(fileName: string) {
        return ts.toPath(fileName, currentDirectory, getCanonicalFileName);
    }

    function getDocumentPositionMapper(generatedFileName: string, sourceFileName?: string) {
        const path = toPath(generatedFileName);
        const value = documentPositionMappers.get(path);
        if (value) return value;

        let mapper: ts.DocumentPositionMapper | undefined;
        if (host.getDocumentPositionMapper) {
            mapper = host.getDocumentPositionMapper(generatedFileName, sourceFileName);
        }
        else if (host.readFile) {
            const file = getSourceFileLike(generatedFileName);
            mapper = file && ts.getDocumentPositionMapper(
                { getSourceFileLike, getCanonicalFileName, log: s => host.log(s) },
                generatedFileName,
                ts.getLineInfo(file.text, ts.getLineStarts(file)),
                f => !host.fileExists || host.fileExists(f) ? host.readFile!(f) : undefined
            );
        }
        documentPositionMappers.set(path, mapper || ts.identitySourceMapConsumer);
        return mapper || ts.identitySourceMapConsumer;
    }

    function tryGetSourcePosition(info: ts.DocumentPosition): ts.DocumentPosition | undefined {
        if (!ts.isDeclarationFileName(info.fileName)) return undefined;

        const file = getSourceFile(info.fileName);
        if (!file) return undefined;

        const newLoc = getDocumentPositionMapper(info.fileName).getSourcePosition(info);
        return !newLoc || newLoc === info ? undefined : tryGetSourcePosition(newLoc) || newLoc;
    }

    function tryGetGeneratedPosition(info: ts.DocumentPosition): ts.DocumentPosition | undefined {
        if (ts.isDeclarationFileName(info.fileName)) return undefined;

        const sourceFile = getSourceFile(info.fileName);
        if (!sourceFile) return undefined;

        const program = host.getProgram()!;
        // If this is source file of project reference source (instead of redirect) there is no generated position
        if (program.isSourceOfProjectReferenceRedirect(sourceFile.fileName)) {
            return undefined;
        }

        const options = program.getCompilerOptions();
        const outPath = ts.outFile(options);

        const declarationPath = outPath ?
            ts.removeFileExtension(outPath) + ts.Extension.Dts :
            ts.getDeclarationEmitOutputFilePathWorker(info.fileName, program.getCompilerOptions(), currentDirectory, program.getCommonSourceDirectory(), getCanonicalFileName);
        if (declarationPath === undefined) return undefined;

        const newLoc = getDocumentPositionMapper(declarationPath, info.fileName).getGeneratedPosition(info);
        return newLoc === info ? undefined : newLoc;
    }

    function getSourceFile(fileName: string) {
        const program = host.getProgram();
        if (!program) return undefined;

        const path = toPath(fileName);
        // file returned here could be .d.ts when asked for .ts file if projectReferences and module resolution created this source file
        const file = program.getSourceFileByPath(path);
        return file && file.resolvedPath === path ? file : undefined;
    }

    function getOrCreateSourceFileLike(fileName: string): ts.SourceFileLike | undefined {
        const path = toPath(fileName);
        const fileFromCache = sourceFileLike.get(path);
        if (fileFromCache !== undefined) return fileFromCache ? fileFromCache : undefined;

        if (!host.readFile || host.fileExists && !host.fileExists(path)) {
            sourceFileLike.set(path, false);
            return undefined;
        }

        // And failing that, check the disk
        const text = host.readFile(path);
        const file = text ? createSourceFileLike(text) : false;
        sourceFileLike.set(path, file);
        return file ? file : undefined;
    }

    // This can be called from source mapper in either source program or program that includes generated file
    function getSourceFileLike(fileName: string) {
        return !host.getSourceFileLike ?
            getSourceFile(fileName) || getOrCreateSourceFileLike(fileName) :
            host.getSourceFileLike(fileName);
    }

    function toLineColumnOffset(fileName: string, position: number): ts.LineAndCharacter {
        const file = getSourceFileLike(fileName)!; // TODO: GH#18217
        return file.getLineAndCharacterOfPosition(position);
    }

    function clearCache(): void {
        sourceFileLike.clear();
        documentPositionMappers.clear();
    }
}

/** @internal */
/**
 * string | undefined to contents of map file to create DocumentPositionMapper from it
 * DocumentPositionMapper | false to give back cached DocumentPositionMapper
 */
export type ReadMapFile = (mapFileName: string, mapFileNameFromDts: string | undefined) => string | undefined | ts.DocumentPositionMapper | false;

/** @internal */
export function getDocumentPositionMapper(
    host: ts.DocumentPositionMapperHost,
    generatedFileName: string,
    generatedFileLineInfo: ts.LineInfo,
    readMapFile: ReadMapFile) {
    let mapFileName = ts.tryGetSourceMappingURL(generatedFileLineInfo);
    if (mapFileName) {
        const match = base64UrlRegExp.exec(mapFileName);
        if (match) {
            if (match[1]) {
                const base64Object = match[1];
                return convertDocumentToSourceMapper(host, ts.base64decode(ts.sys, base64Object), generatedFileName);
            }
            // Not a data URL we can parse, skip it
            mapFileName = undefined;
        }
    }
    const possibleMapLocations: string[] = [];
    if (mapFileName) {
        possibleMapLocations.push(mapFileName);
    }
    possibleMapLocations.push(generatedFileName + ".map");
    const originalMapFileName = mapFileName && ts.getNormalizedAbsolutePath(mapFileName, ts.getDirectoryPath(generatedFileName));
    for (const location of possibleMapLocations) {
        const mapFileName = ts.getNormalizedAbsolutePath(location, ts.getDirectoryPath(generatedFileName));
        const mapFileContents = readMapFile(mapFileName, originalMapFileName);
        if (ts.isString(mapFileContents)) {
            return convertDocumentToSourceMapper(host, mapFileContents, mapFileName);
        }
        if (mapFileContents !== undefined) {
            return mapFileContents || undefined;
        }
    }
    return undefined;
}

function convertDocumentToSourceMapper(host: ts.DocumentPositionMapperHost, contents: string, mapFileName: string) {
    const map = ts.tryParseRawSourceMap(contents);
    if (!map || !map.sources || !map.file || !map.mappings) {
        // obviously invalid map
        return undefined;
    }

    // Dont support sourcemaps that contain inlined sources
    if (map.sourcesContent && map.sourcesContent.some(ts.isString)) return undefined;

    return ts.createDocumentPositionMapper(host, map, mapFileName);
}

function createSourceFileLike(text: string, lineMap?: ts.SourceFileLike["lineMap"]): ts.SourceFileLike {
    return {
        text,
        lineMap,
        getLineAndCharacterOfPosition(pos: number) {
            return ts.computeLineAndCharacterOfPosition(ts.getLineStarts(this), pos);
        }
    };
}
