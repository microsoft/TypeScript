import * as path from "node:path";

import * as perf from "external-declarations/build/compiler/perf-tracer.js";
import ts, {
    CompilerHost,
    Node,
    ResolutionMode,
    SourceFile,
} from "typescript";

import {
    withTrace,
} from "./utils.js";

export const installCache = (function globalCache() {
    type Path = string;
    const toPath = (path: string) => path;
    const readFileCache = new Map<Path, string | false>();
    const fileExistsCache = new Map<Path, boolean>();
    const directoryExistsCache = new Map<Path, boolean>();
    const sourceFileCache = new Map<ResolutionMode, Map<Path, SourceFile>>();

    return (host: CompilerHost, suppressDiskWrite: (file: string) => boolean = () => false) => {
        const originalGetSourceFile = host.getSourceFile.bind(host);
        const originalReadFile = host.readFile.bind(host);
        const originalFileExists = host.fileExists.bind(host);
        const originalDirectoryExists = host.directoryExists?.bind(host);
        const originalCreateDirectory = ((host as any).createDirectory as (directory: string) => void).bind(host);
        const originalWriteFile = host.writeFile.bind(host);

        const setReadFileCache = (key: Path, fileName: string) => {
            const newValue = withTrace("read-disk", () => originalReadFile(fileName));
            readFileCache.set(key, newValue !== undefined ? newValue : false);
            return newValue;
        };
        host.readFile = fileName => {
            const key = toPath(fileName);
            const value = readFileCache.get(key);
            if (value !== undefined) return value !== false ? value : undefined; // could be .d.ts from output

            return setReadFileCache(key, fileName);
        };

        // fileExists for any kind of extension
        host.fileExists = fileName => {
            const key = toPath(fileName);
            const value = fileExistsCache.get(key);
            if (value !== undefined) return value;
            const newValue = withTrace("fileExists-disk", () => originalFileExists(fileName));
            fileExistsCache.set(key, !!newValue);
            return newValue;
        };
        if (originalWriteFile) {
            host.writeFile = (fileName, data, ...rest) => {
                if (!suppressDiskWrite(fileName)) {
                    withTrace("write-disk", () => originalWriteFile(fileName, data, ...rest));
                }

                const key = toPath(fileName);
                fileExistsCache.set(key, true);

                const value = readFileCache.get(key);
                readFileCache.set(key, data);

                if (value !== undefined && value !== data) {
                    sourceFileCache.forEach(map => map.delete(key));
                }
                else {
                    sourceFileCache.forEach(map => {
                        const sourceFile = map.get(key);
                        if (sourceFile && sourceFile.text !== data) {
                            map.delete(key);
                        }
                    });
                }
            };
        }

        // directoryExists
        if (originalDirectoryExists) {
            host.directoryExists = directory => {
                const key = toPath(directory);
                const value = directoryExistsCache.get(key);
                if (value !== undefined) return value;
                const newValue = originalDirectoryExists(directory);
                directoryExistsCache.set(key, !!newValue);
                return newValue;
            };

            if (originalCreateDirectory) {
                (host as any).createDirectory = (directory: string) => {
                    originalCreateDirectory(directory);
                    const key = toPath(directory);
                    directoryExistsCache.set(key, true);
                };
            }
        }
        function cleanAST(node: Node) {
            (node as any).id = undefined;
            ts.forEachChild(node, cleanAST, nodes => nodes.forEach(cleanAST));
        }
        const getSourceFileWithCache = (...[fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile]: Parameters<CompilerHost["getSourceFile"]>) => {
            const key = toPath(fileName);
            const impliedNodeFormat: ResolutionMode = typeof languageVersionOrOptions === "object" ? languageVersionOrOptions.impliedNodeFormat : undefined;
            let forImpliedNodeFormat = sourceFileCache.get(impliedNodeFormat);
            let value = forImpliedNodeFormat?.get(key);
            const perfKey = fileName.endsWith(".d.ts") ? "-d.ts" : "-" + path.extname(fileName).substring(1);

            if (value) {
                perf.tracer.current?.increment("ast-hit" + perfKey);
                cleanAST(value);
                return value;
            }

            const baseFile = path.basename(fileName);
            const isLibFile = baseFile.startsWith("lib.");
            if (isLibFile) {
                value = forImpliedNodeFormat?.get(baseFile);
                if (value && value.text === host.readFile(fileName)) {
                    perf.tracer.current?.increment("ast-lib-hit");
                    // Patch up file as it might not be from the same source
                    value.fileName = fileName;
                    cleanAST(value);
                    return value;
                }
            }
            perf.tracer.current?.increment("ast-miss" + perfKey);
            const sourceFile = withTrace("parse", () => originalGetSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile));
            function isCashable(fileName: string) {
                return true;
                return fileName.endsWith(".d.ts")
                    || fileName.endsWith(".d.cts")
                    || fileName.endsWith(".d.mts")
                    || fileName.endsWith(".json");
            }
            if (sourceFile && isCashable(fileName)) {
                if (!forImpliedNodeFormat) {
                    forImpliedNodeFormat = new Map();
                    sourceFileCache.set(impliedNodeFormat, forImpliedNodeFormat);
                }
                forImpliedNodeFormat.set(key, sourceFile);
                if (isLibFile) {
                    forImpliedNodeFormat.set(baseFile, sourceFile);
                }
            }
            return sourceFile;
        };
        host.getSourceFile = getSourceFileWithCache;
        return host;
    };
})();
