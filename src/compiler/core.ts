/// <reference path="comparison.ts" />
/// <reference path="paths.ts" />
/// <reference path="types.ts"/>
/// <reference path="performance.ts" />

namespace ts {
    // WARNING: The script `configureNightly.ts` uses a regexp to parse out these values.
    // If changing the text in this section, be sure to test `configureNightly` too.
    export const versionMajorMinor = "2.7";
    /** The version of the TypeScript compiler release */
    export const version = `${versionMajorMinor}.0`;
}

/* @internal */
namespace ts {
    /**
     * Iterates through the parent chain of a node and performs the callback on each parent until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, it applies the callback until the parent pointer is undefined or the callback returns "quit"
     * At that point findAncestor returns undefined.
     */
    export function findAncestor<T extends Node>(node: Node, callback: (element: Node) => element is T): T | undefined;
    export function findAncestor(node: Node, callback: (element: Node) => boolean | "quit"): Node | undefined;
    export function findAncestor(node: Node, callback: (element: Node) => boolean | "quit"): Node {
        while (node) {
            const result = callback(node);
            if (result === "quit") {
                return undefined;
            }
            else if (result) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }

    export function createSymbolTable(symbols?: ReadonlyArray<Symbol>): SymbolTable {
        const result = createMap<Symbol>() as SymbolTable;
        if (symbols) {
            for (const symbol of symbols) {
                result.set(symbol.escapedName, symbol);
            }
        }
        return result;
    }

    export function changesAffectModuleResolution(oldOptions: CompilerOptions, newOptions: CompilerOptions): boolean {
        return !oldOptions ||
            (oldOptions.module !== newOptions.module) ||
            (oldOptions.moduleResolution !== newOptions.moduleResolution) ||
            (oldOptions.noResolve !== newOptions.noResolve) ||
            (oldOptions.target !== newOptions.target) ||
            (oldOptions.noLib !== newOptions.noLib) ||
            (oldOptions.jsx !== newOptions.jsx) ||
            (oldOptions.allowJs !== newOptions.allowJs) ||
            (oldOptions.rootDir !== newOptions.rootDir) ||
            (oldOptions.configFilePath !== newOptions.configFilePath) ||
            (oldOptions.baseUrl !== newOptions.baseUrl) ||
            (oldOptions.maxNodeModuleJsDepth !== newOptions.maxNodeModuleJsDepth) ||
            !arrayIsEqualTo(oldOptions.lib, newOptions.lib) ||
            !arrayIsEqualTo(oldOptions.typeRoots, newOptions.typeRoots) ||
            !arrayIsEqualTo(oldOptions.rootDirs, newOptions.rootDirs) ||
            !equalOwnProperties(oldOptions.paths, newOptions.paths);
    }

    /**
     * Tests whether a value is string
     */
    export function isString(text: any): text is string {
        return typeof text === "string";
    }

    export function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined {
        return value !== undefined && test(value) ? value : undefined;
    }

    export function cast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut {
        if (value !== undefined && test(value)) return value;
        Debug.fail(`Invalid cast. The supplied value did not pass the test '${Debug.getFunctionName(test)}'.`);
    }

    /** Does nothing. */
    export function noop(_?: {} | null | undefined): void { } // tslint:disable-line no-empty

    /** Do nothing and return false */
    export function returnFalse(): false { return false; }

    /** Do nothing and return true */
    export function returnTrue(): true { return true; }

    /** Returns its argument. */
    export function identity<T>(x: T) { return x; }

    /** Throws an error because a function is not implemented. */
    export function notImplemented(): never {
        throw new Error("Not implemented");
    }

    export function memoize<T>(callback: () => T): () => T {
        let value: T;
        return () => {
            if (callback) {
                value = callback();
                callback = undefined;
            }
            return value;
        };
    }

    /**
     * High-order function, creates a function that executes a function composition.
     * For example, `chain(a, b)` is the equivalent of `x => ((a', b') => y => b'(a'(y)))(a(x), b(x))`
     *
     * @param args The functions to chain.
     */
    export function chain<T, U>(...args: ((t: T) => (u: U) => U)[]): (t: T) => (u: U) => U;
    export function chain<T, U>(a: (t: T) => (u: U) => U, b: (t: T) => (u: U) => U, c: (t: T) => (u: U) => U, d: (t: T) => (u: U) => U, e: (t: T) => (u: U) => U): (t: T) => (u: U) => U {
        if (e) {
            const args: ((t: T) => (u: U) => U)[] = [];
            for (let i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            return t => compose(...map(args, f => f(t)));
        }
        else if (d) {
            return t => compose(a(t), b(t), c(t), d(t));
        }
        else if (c) {
            return t => compose(a(t), b(t), c(t));
        }
        else if (b) {
            return t => compose(a(t), b(t));
        }
        else if (a) {
            return t => compose(a(t));
        }
        else {
            return _ => u => u;
        }
    }

    /**
     * High-order function, composes functions. Note that functions are composed inside-out;
     * for example, `compose(a, b)` is the equivalent of `x => b(a(x))`.
     *
     * @param args The functions to compose.
     */
    export function compose<T>(...args: ((t: T) => T)[]): (t: T) => T;
    export function compose<T>(a: (t: T) => T, b: (t: T) => T, c: (t: T) => T, d: (t: T) => T, e: (t: T) => T): (t: T) => T {
        if (e) {
            const args: ((t: T) => T)[] = [];
            for (let i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            return t => reduceLeft(args, (u, f) => f(u), t);
        }
        else if (d) {
            return t => d(c(b(a(t))));
        }
        else if (c) {
            return t => c(b(a(t)));
        }
        else if (b) {
            return t => b(a(t));
        }
        else if (a) {
            return t => a(t);
        }
        else {
            return t => t;
        }
    }

    export function formatStringFromArgs(text: string, args: { [index: number]: string; }, baseIndex?: number): string {
        baseIndex = baseIndex || 0;

        return text.replace(/{(\d+)}/g, (_match, index?) => args[+index + baseIndex]);
    }

    export let localizedDiagnosticMessages: MapLike<string> = undefined;

    export function getLocaleSpecificMessage(message: DiagnosticMessage) {
        return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
    }

    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: (string | number)[]): Diagnostic;
    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage): Diagnostic {
        Debug.assertGreaterThanOrEqual(start, 0);
        Debug.assertGreaterThanOrEqual(length, 0);

        if (file) {
            Debug.assertLessThanOrEqual(start, file.text.length);
            Debug.assertLessThanOrEqual(start + length, file.text.length);
        }

        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 4) {
            text = formatStringFromArgs(text, arguments, 4);
        }

        return {
            file,
            start,
            length,

            messageText: text,
            category: message.category,
            code: message.code,
        };
    }

    /* internal */
    export function formatMessage(_dummy: any, message: DiagnosticMessage): string {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }

        return text;
    }

    export function createCompilerDiagnostic(message: DiagnosticMessage, ...args: (string | number)[]): Diagnostic;
    export function createCompilerDiagnostic(message: DiagnosticMessage): Diagnostic {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 1) {
            text = formatStringFromArgs(text, arguments, 1);
        }

        return {
            file: undefined,
            start: undefined,
            length: undefined,

            messageText: text,
            category: message.category,
            code: message.code
        };
    }

    export function createCompilerDiagnosticFromMessageChain(chain: DiagnosticMessageChain): Diagnostic {
        return {
            file: undefined,
            start: undefined,
            length: undefined,

            code: chain.code,
            category: chain.category,
            messageText: chain.next ? chain : chain.messageText
        };
    }

    export function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage, ...args: string[]): DiagnosticMessageChain;
    export function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage): DiagnosticMessageChain {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }

        return {
            messageText: text,
            category: message.category,
            code: message.code,

            next: details
        };
    }

    export function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): DiagnosticMessageChain {
        let lastChain = headChain;
        while (lastChain.next) {
            lastChain = lastChain.next;
        }

        lastChain.next = tailChain;
        return headChain;
    }

    function getDiagnosticFileName(diagnostic: Diagnostic): string {
        return diagnostic.file ? diagnostic.file.fileName : undefined;
    }

    export function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): Comparison {
        return compareStringsCaseSensitive(getDiagnosticFileName(d1), getDiagnosticFileName(d2)) ||
            compareValues(d1.start, d2.start) ||
            compareValues(d1.length, d2.length) ||
            compareValues(d1.code, d2.code) ||
            compareMessageText(d1.messageText, d2.messageText) ||
            Comparison.EqualTo;
    }

    function compareMessageText(text1: string | DiagnosticMessageChain, text2: string | DiagnosticMessageChain): Comparison {
        while (text1 && text2) {
            // We still have both chains.
            const string1 = isString(text1) ? text1 : text1.messageText;
            const string2 = isString(text2) ? text2 : text2.messageText;

            const res = compareStringsCaseSensitive(string1, string2);
            if (res) {
                return res;
            }

            text1 = isString(text1) ? undefined : text1.next;
            text2 = isString(text2) ? undefined : text2.next;
        }

        if (!text1 && !text2) {
            // if the chains are done, then these messages are the same.
            return Comparison.EqualTo;
        }

        // We still have one chain remaining.  The shorter chain should come first.
        return text1 ? Comparison.GreaterThan : Comparison.LessThan;
    }

    export function sortAndDeduplicateDiagnostics(diagnostics: ReadonlyArray<Diagnostic>): Diagnostic[] {
        return sortAndDeduplicate(diagnostics, compareDiagnostics);
    }

    export function getEmitScriptTarget(compilerOptions: CompilerOptions) {
        return compilerOptions.target || ScriptTarget.ES3;
    }

    export function getEmitModuleKind(compilerOptions: CompilerOptions) {
        return typeof compilerOptions.module === "number" ?
            compilerOptions.module :
            getEmitScriptTarget(compilerOptions) >= ScriptTarget.ES2015 ? ModuleKind.ES2015 : ModuleKind.CommonJS;
    }

    export function getEmitModuleResolutionKind(compilerOptions: CompilerOptions) {
        let moduleResolution = compilerOptions.moduleResolution;
        if (moduleResolution === undefined) {
            moduleResolution = getEmitModuleKind(compilerOptions) === ModuleKind.CommonJS ? ModuleResolutionKind.NodeJs : ModuleResolutionKind.Classic;
        }
        return moduleResolution;
    }

    export function getAllowSyntheticDefaultImports(compilerOptions: CompilerOptions) {
        const moduleKind = getEmitModuleKind(compilerOptions);
        return compilerOptions.allowSyntheticDefaultImports !== undefined
            ? compilerOptions.allowSyntheticDefaultImports
            : moduleKind === ModuleKind.System;
    }

    export type StrictOptionName = "noImplicitAny" | "noImplicitThis" | "strictNullChecks" | "strictFunctionTypes" | "strictPropertyInitialization" | "alwaysStrict";

    export function getStrictOptionValue(compilerOptions: CompilerOptions, flag: StrictOptionName): boolean {
        return compilerOptions[flag] === undefined ? compilerOptions.strict : compilerOptions[flag];
    }

    export interface ObjectAllocator {
        getNodeConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos?: number, end?: number) => Token<TKind>;
        getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos?: number, end?: number) => Identifier;
        getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos?: number, end?: number) => SourceFile;
        getSymbolConstructor(): new (flags: SymbolFlags, name: __String) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker) => Signature;
        getSourceMapSourceConstructor(): new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => SourceMapSource;
    }

    function Symbol(this: Symbol, flags: SymbolFlags, name: __String) {
        this.flags = flags;
        this.escapedName = name;
        this.declarations = undefined;
    }

    function Type(this: Type, checker: TypeChecker, flags: TypeFlags) {
        this.flags = flags;
        if (Debug.isDebugging) {
            this.checker = checker;
        }
    }

    function Signature() {} // tslint:disable-line no-empty

    function Node(this: Node, kind: SyntaxKind, pos: number, end: number) {
        this.id = 0;
        this.kind = kind;
        this.pos = pos;
        this.end = end;
        this.flags = NodeFlags.None;
        this.modifierFlagsCache = ModifierFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined;
        this.original = undefined;
    }

    function SourceMapSource(this: SourceMapSource, fileName: string, text: string, skipTrivia?: (pos: number) => number) {
        this.fileName = fileName;
        this.text = text;
        this.skipTrivia = skipTrivia || (pos => pos);
    }

    export let objectAllocator: ObjectAllocator = {
        getNodeConstructor: () => <any>Node,
        getTokenConstructor: () => <any>Node,
        getIdentifierConstructor: () => <any>Node,
        getSourceFileConstructor: () => <any>Node,
        getSymbolConstructor: () => <any>Symbol,
        getTypeConstructor: () => <any>Type,
        getSignatureConstructor: () => <any>Signature,
        getSourceMapSourceConstructor: () => <any>SourceMapSource,
    };

    export function positionIsSynthesized(pos: number): boolean {
        // This is a fast way of testing the following conditions:
        //  pos === undefined || pos === null || isNaN(pos) || pos < 0;
        return !(pos >= 0);
    }

    export function isCheckJsEnabledForFile(sourceFile: SourceFile, compilerOptions: CompilerOptions) {
        return sourceFile.checkJsDirective ? sourceFile.checkJsDirective.enabled : compilerOptions.checkJs;
    }

    export function and<T>(f: (arg: T) => boolean, g: (arg: T) => boolean) {
        return (arg: T) => f(arg) && g(arg);
    }

    export function assertTypeIsNever(_: never): void { } // tslint:disable-line no-empty

    export interface FileAndDirectoryExistence {
        fileExists: boolean;
        directoryExists: boolean;
    }

    export interface CachedDirectoryStructureHost extends DirectoryStructureHost {
        /** Returns the queried result for the file exists and directory exists if at all it was done */
        addOrDeleteFileOrDirectory(fileOrDirectory: string, fileOrDirectoryPath: Path): FileAndDirectoryExistence | undefined;
        addOrDeleteFile(fileName: string, filePath: Path, eventKind: FileWatcherEventKind): void;
        clearCache(): void;
    }

    interface MutableFileSystemEntries {
        readonly files: string[];
        readonly directories: string[];
    }

    export function createCachedDirectoryStructureHost(host: DirectoryStructureHost): CachedDirectoryStructureHost {
        const cachedReadDirectoryResult = createMap<MutableFileSystemEntries>();
        const getCurrentDirectory = memoize(() => host.getCurrentDirectory());
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames);
        return {
            useCaseSensitiveFileNames: host.useCaseSensitiveFileNames,
            newLine: host.newLine,
            readFile: (path, encoding) => host.readFile(path, encoding),
            write: s => host.write(s),
            writeFile,
            fileExists,
            directoryExists,
            createDirectory,
            getCurrentDirectory,
            getDirectories,
            readDirectory,
            addOrDeleteFileOrDirectory,
            addOrDeleteFile,
            clearCache,
            exit: code => host.exit(code)
        };

        function toPath(fileName: string) {
            return ts.toPath(fileName, getCurrentDirectory(), getCanonicalFileName);
        }

        function getCachedFileSystemEntries(rootDirPath: Path): MutableFileSystemEntries | undefined {
            return cachedReadDirectoryResult.get(rootDirPath);
        }

        function getCachedFileSystemEntriesForBaseDir(path: Path): MutableFileSystemEntries | undefined {
            return getCachedFileSystemEntries(getDirectoryPath(path));
        }

        function getBaseNameOfFileName(fileName: string) {
            return getBaseFileName(normalizePath(fileName));
        }

        function createCachedFileSystemEntries(rootDir: string, rootDirPath: Path) {
            const resultFromHost: MutableFileSystemEntries = {
                files: map(host.readDirectory(rootDir, /*extensions*/ undefined, /*exclude*/ undefined, /*include*/["*.*"]), getBaseNameOfFileName) || [],
                directories: host.getDirectories(rootDir) || []
            };

            cachedReadDirectoryResult.set(rootDirPath, resultFromHost);
            return resultFromHost;
        }

        /**
         * If the readDirectory result was already cached, it returns that
         * Otherwise gets result from host and caches it.
         * The host request is done under try catch block to avoid caching incorrect result
         */
        function tryReadDirectory(rootDir: string, rootDirPath: Path): MutableFileSystemEntries | undefined {
            const cachedResult = getCachedFileSystemEntries(rootDirPath);
            if (cachedResult) {
                return cachedResult;
            }

            try {
                return createCachedFileSystemEntries(rootDir, rootDirPath);
            }
            catch (_e) {
                // If there is exception to read directories, dont cache the result and direct the calls to host
                Debug.assert(!cachedReadDirectoryResult.has(rootDirPath));
                return undefined;
            }
        }

        function fileNameEqual(name1: string, name2: string) {
            return getCanonicalFileName(name1) === getCanonicalFileName(name2);
        }

        function hasEntry(entries: ReadonlyArray<string>, name: string) {
            return some(entries, file => fileNameEqual(file, name));
        }

        function updateFileSystemEntry(entries: string[], baseName: string, isValid: boolean) {
            if (hasEntry(entries, baseName)) {
                if (!isValid) {
                    return filterMutate(entries, entry => !fileNameEqual(entry, baseName));
                }
            }
            else if (isValid) {
                return entries.push(baseName);
            }
        }

        function writeFile(fileName: string, data: string, writeByteOrderMark?: boolean): void {
            const path = toPath(fileName);
            const result = getCachedFileSystemEntriesForBaseDir(path);
            if (result) {
                updateFilesOfFileSystemEntry(result, getBaseNameOfFileName(fileName), /*fileExists*/ true);
            }
            return host.writeFile(fileName, data, writeByteOrderMark);
        }

        function fileExists(fileName: string): boolean {
            const path = toPath(fileName);
            const result = getCachedFileSystemEntriesForBaseDir(path);
            return result && hasEntry(result.files, getBaseNameOfFileName(fileName)) ||
                host.fileExists(fileName);
        }

        function directoryExists(dirPath: string): boolean {
            const path = toPath(dirPath);
            return cachedReadDirectoryResult.has(path) || host.directoryExists(dirPath);
        }

        function createDirectory(dirPath: string) {
            const path = toPath(dirPath);
            const result = getCachedFileSystemEntriesForBaseDir(path);
            const baseFileName = getBaseNameOfFileName(dirPath);
            if (result) {
                updateFileSystemEntry(result.directories, baseFileName, /*isValid*/ true);
            }
            host.createDirectory(dirPath);
        }

        function getDirectories(rootDir: string): string[] {
            const rootDirPath = toPath(rootDir);
            const result = tryReadDirectory(rootDir, rootDirPath);
            if (result) {
                return result.directories.slice();
            }
            return host.getDirectories(rootDir);
        }

        function readDirectory(rootDir: string, extensions?: ReadonlyArray<string>, excludes?: ReadonlyArray<string>, includes?: ReadonlyArray<string>, depth?: number): string[] {
            const rootDirPath = toPath(rootDir);
            const result = tryReadDirectory(rootDir, rootDirPath);
            if (result) {
                return matchFiles(rootDir, extensions, excludes, includes, host.useCaseSensitiveFileNames, getCurrentDirectory(), depth, getFileSystemEntries);
            }
            return host.readDirectory(rootDir, extensions, excludes, includes, depth);

            function getFileSystemEntries(dir: string) {
                const path = toPath(dir);
                if (path === rootDirPath) {
                    return result;
                }
                return getCachedFileSystemEntries(path) || createCachedFileSystemEntries(dir, path);
            }
        }

        function addOrDeleteFileOrDirectory(fileOrDirectory: string, fileOrDirectoryPath: Path) {
            const existingResult = getCachedFileSystemEntries(fileOrDirectoryPath);
            if (existingResult) {
                // Just clear the cache for now
                // For now just clear the cache, since this could mean that multiple level entries might need to be re-evaluated
                clearCache();
            }
            else {
                // This was earlier a file (hence not in cached directory contents)
                // or we never cached the directory containing it
                const parentResult = getCachedFileSystemEntriesForBaseDir(fileOrDirectoryPath);
                if (parentResult) {
                    const baseName = getBaseNameOfFileName(fileOrDirectory);
                    if (parentResult) {
                        const fsQueryResult: FileAndDirectoryExistence = {
                            fileExists: host.fileExists(fileOrDirectoryPath),
                            directoryExists: host.directoryExists(fileOrDirectoryPath)
                        };
                        if (fsQueryResult.directoryExists || hasEntry(parentResult.directories, baseName)) {
                            // Folder added or removed, clear the cache instead of updating the folder and its structure
                            clearCache();
                        }
                        else {
                            // No need to update the directory structure, just files
                            updateFilesOfFileSystemEntry(parentResult, baseName, fsQueryResult.fileExists);
                        }
                        return fsQueryResult;
                    }
                }
            }
        }

        function addOrDeleteFile(fileName: string, filePath: Path, eventKind: FileWatcherEventKind) {
            if (eventKind === FileWatcherEventKind.Changed) {
                return;
            }

            const parentResult = getCachedFileSystemEntriesForBaseDir(filePath);
            if (parentResult) {
                updateFilesOfFileSystemEntry(parentResult, getBaseNameOfFileName(fileName), eventKind === FileWatcherEventKind.Created);
            }
        }

        function updateFilesOfFileSystemEntry(parentResult: MutableFileSystemEntries, baseName: string, fileExists: boolean) {
            updateFileSystemEntry(parentResult.files, baseName, fileExists);
        }

        function clearCache() {
            cachedReadDirectoryResult.clear();
        }
    }
}
