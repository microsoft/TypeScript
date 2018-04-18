/// <reference path="./harness.ts" />
/// <reference path="./vpath.ts" />
/// <reference path="./core/strings.ts" />
/// <reference path="./utils.ts" />
/// <reference path="./documents.ts" />
/// <reference path="./vfs.ts" />

namespace vfsutils {
    // file mode flags used for computing Stats
    const S_IFREG = 0x8000; // regular file
    const S_IFDIR = 0x4000; // regular directory

    let builtLocalCI: vfs.FileSystem | undefined;
    let builtLocalCS: vfs.FileSystem | undefined;

    /**
     * Posix-style path to the TypeScript compiler build outputs (including tsc.js, lib.d.ts, etc.)
     */
    export const builtFolder = "/.ts";
    export const tscPath = builtFolder + "/tsc.js";
    export const libPath = builtFolder + "/lib.d.ts";
    export const safelistPath = "/safelist.json";

    /**
     * Posix-style path to additional test libraries
     */
    export const testLibFolder = "/.lib";

    /**
     * Posix-style path to sources under test
     */
    export const srcFolder = "/.src";

    /**
     * DOS-style path to the TypeScript compiler build outputs (including tsc.js, lib.d.ts, etc.)
     */
    export const dosBuiltFolder = "c:" + builtFolder;
    export const dosTscPath = dosBuiltFolder + "/tsc.js";
    export const dosLibPath = dosBuiltFolder + "/lib.d.ts";
    export const dosSafelistPath = dosBuiltFolder + "/safelist.json";

    /**
     * DOS-style path to additional test libraries
     */
    export const dosTestLibFolder = "c:" + testLibFolder;

    /**
     * DOS-style path to sources under test
     */
    export const dosSrcFolder = "c:" + srcFolder;

    /** Default safelist.json content used by a number of tests. */
    export const safelistContent = utils.dedent`
        {
            "commander": "commander",
            "express": "express",
            "jquery": "jquery",
            "lodash": "lodash",
            "moment": "moment",
            "chroma": "chroma-js"
        }`;

    /** A minimal lib.d.ts used by a number of tests. */
    export const emptyLibContent = utils.dedent`
        /// <reference no-default-lib="true"/>
        interface Boolean {}
        interface Function {}
        interface IArguments {}
        interface Number { toExponential: any; }
        interface Object {}
        interface RegExp {}
        interface String { charAt: any; }
        interface Array<T> {}`;

    export function createResolver(io: Harness.IO): vfs.FileSystemResolver {
        return {
            readdirSync(path: string): string[] {
                const { files, directories } = io.getAccessibleFileSystemEntries(path);
                return directories.concat(files);
            },
            statSync(path: string): { mode: number; size: number; } {
                if (io.directoryExists(path)) {
                    return { mode: S_IFDIR | 0o777, size: 0 };
                }
                else if (io.fileExists(path)) {
                    return { mode: S_IFREG | 0o666, size: io.getFileSize(path) };
                }
                else {
                    throw new Error("ENOENT: path does not exist");
                }
            },
            readFileSync(path: string): Buffer {
                return Buffer.from(io.readFile(path), "utf8");
            }
        };
    }

    // TODO(rbuckton): This patches the baseline to replace lib.d.ts with lib.es5.d.ts.
    // This is only to make the PR for this change easier to read. A follow-up PR will
    // revert this change and accept the new baselines.
    // See https://github.com/Microsoft/TypeScript/pull/20763#issuecomment-352553264
    function patchResolver(io: Harness.IO, resolver: vfs.FileSystemResolver): vfs.FileSystemResolver {
        const libFile = vpath.combine(__dirname, "lib.d.ts");
        const es5File = vpath.combine(__dirname, "lib.es5.d.ts");
        const stringComparer = io.useCaseSensitiveFileNames() ? vpath.compareCaseSensitive : vpath.compareCaseInsensitive;
        return {
            readdirSync: path => resolver.readdirSync(path),
            statSync: path => resolver.statSync(fixPath(path)),
            readFileSync: (path) => resolver.readFileSync(fixPath(path))
        };

        function fixPath(path: string) {
            return stringComparer(path, libFile) === 0 ? es5File : path;
        }
    }

    function getBuiltLocal(useCaseSensitiveFileNames: boolean): vfs.FileSystem {
        if (!builtLocalCI) {
            const resolver = createResolver(Harness.IO);
            builtLocalCI = new vfs.FileSystem(/*ignoreCase*/ true, {
                files: {
                    [builtFolder]: new vfs.Mount(__dirname, patchResolver(Harness.IO, resolver)),
                    [testLibFolder]: new vfs.Mount(vpath.resolve(__dirname, "../../tests/lib"), resolver),
                    [srcFolder]: {}
                },
                cwd: srcFolder,
                meta: { defaultLibLocation: builtFolder }
            });
            builtLocalCI.makeReadonly();
        }
        if (!useCaseSensitiveFileNames) return builtLocalCI;
        if (!builtLocalCS) {
            builtLocalCS = builtLocalCI.shadow(/*ignoreCase*/ false);
            builtLocalCS.makeReadonly();
        }
        return builtLocalCS;
    }

    export function createFromFileSystem(useCaseSensitiveFileNames: boolean) {
        return getBuiltLocal(useCaseSensitiveFileNames).shadow();
    }

    export function createFromDocuments(useCaseSensitiveFileNames: boolean, documents: documents.TextDocument[], options?: { currentDirectory?: string, overwrite?: boolean }) {
        const fs = createFromFileSystem(useCaseSensitiveFileNames);
        if (options && options.currentDirectory) {
            fs.mkdirpSync(options.currentDirectory);
            fs.chdir(options.currentDirectory);
        }
        for (const document of documents) {
            fs.mkdirpSync(vpath.dirname(document.file));
            fs.writeFileSync(document.file, document.text, { encoding: "utf8", flag: options && options.overwrite ? "w" : "wx" });
            fs.filemeta(document.file).set("document", document);
            // Add symlinks
            const symlink = document.meta.get("symlink");
            if (symlink) {
                for (const link of symlink.split(",").map(link => link.trim())) {
                    fs.mkdirpSync(vpath.dirname(link));
                    fs.symlinkSync(document.file, link);
                    fs.filemeta(link).set("document", document);
                }
            }
        }
        return fs;
    }

    export function createFromMap(currentDirectory: string, ignoreCase: boolean, files: ts.Map<string>) {
        const fs = new vfs.FileSystem(ignoreCase, { cwd: currentDirectory, files: { [currentDirectory]: {} } });
        files.forEach((fileContent, fileName) => {
            fs.mkdirpSync(vpath.dirname(fileName));
            fs.writeFileSync(fileName, fileContent);
            fs.filemeta(fileName).set("scriptInfo", new Harness.LanguageService.ScriptInfo(fileName, undefined, /*isRootFile*/ false));
        });
        return fs;
    }

    export function getAccessibleFileSystemEntries(fs: vfs.FileSystem, path: string) {
        const files: string[] = [];
        const directories: string[] = [];
        try {
            for (const file of fs.readdirSync(path)) {
                try {
                    const stats = fs.statSync(vpath.combine(path, file));
                    if (stats.isFile()) {
                        files.push(file);
                    }
                    else if (stats.isDirectory()) {
                        directories.push(file);
                    }
                }
                catch { /*ignored*/ }
            }
        }
        catch { /*ignored*/ }
        return { files, directories };
    }

    function getStats(fs: vfs.FileSystem, path: string) {
        try {
            return fs.statSync(path);
        }
        catch {
            return undefined;
        }
    }

    export function getFileSize(fs: vfs.FileSystem, path: string) {
        const stats = getStats(fs, path);
        return stats && stats.isFile() ? stats.size : 0;
    }

    export function getModifiedTime(fs: vfs.FileSystem, path: string) {
        const stats = getStats(fs, path);
        return stats ? stats.mtime : undefined;
    }

    export function fileExists(fs: vfs.FileSystem, path: string) {
        const stats = getStats(fs, path);
        return stats ? stats.isFile() : false;
    }

    export function directoryExists(fs: vfs.FileSystem, path: string): boolean {
        const stats = getStats(fs, path);
        return stats ? stats.isDirectory() : false;
    }

    export function getDirectories(fs: vfs.FileSystem, path: string) {
        const result: string[] = [];
        try {
            for (const file of fs.readdirSync(path)) {
                if (fs.statSync(vpath.combine(path, file)).isDirectory()) {
                    result.push(file);
                }
            }
        }
        catch { /*ignore*/ }
        return result;
    }

    export function readFile(fs: vfs.FileSystem, path: string): string | undefined {
        try {
            const content = fs.readFileSync(path, "utf8");
            return content === undefined ? undefined :
                vpath.extname(path) === ".json" ? utils.removeComments(core.removeByteOrderMark(content), utils.CommentRemoval.leadingAndTrailing) :
                core.removeByteOrderMark(content);
        }
        catch {
            return undefined;
        }
    }

    export function writeFile(fs: vfs.FileSystem, path: string, content: string, writeByteOrderMark?: boolean) {
        fs.mkdirpSync(vpath.dirname(path));
        fs.writeFileSync(path, writeByteOrderMark ? core.addUTF8ByteOrderMark(content) : content);
    }

    const typeScriptExtensions: ReadonlyArray<string> = [".ts", ".tsx"];

    export function isTypeScript(path: string) {
        return vpath.extname(path, typeScriptExtensions, /*ignoreCase*/ false).length > 0;
    }

    const javaScriptExtensions: ReadonlyArray<string> = [".js", ".jsx"];

    export function isJavaScript(path: string) {
        return vpath.extname(path, javaScriptExtensions, /*ignoreCase*/ false).length > 0;
    }

    export function isDeclaration(path: string) {
        return vpath.extname(path, ".d.ts", /*ignoreCase*/ false).length > 0;
    }

    export function isSourceMap(path: string) {
        return vpath.extname(path, ".map", /*ignoreCase*/ false).length > 0;
    }

    const javaScriptSourceMapExtensions: ReadonlyArray<string> = [".js.map", ".jsx.map"];

    export function isJavaScriptSourceMap(path: string) {
        return vpath.extname(path, javaScriptSourceMapExtensions, /*ignoreCase*/ false).length > 0;
    }

    export function isJson(path: string) {
        return vpath.extname(path, ".json", /*ignoreCase*/ false).length > 0;
    }

    export function isDefaultLibrary(path: string) {
        return isDeclaration(path)
            && vpath.basename(path).startsWith("lib.");
    }
}
