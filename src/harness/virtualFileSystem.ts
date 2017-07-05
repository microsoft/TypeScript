/// <reference path="harness.ts" />
/// <reference path="..\compiler\commandLineParser.ts"/>
namespace Utils {
    export class VirtualFileSystemEntry {
        fileSystem: VirtualFileSystem;
        name: string;

        constructor(fileSystem: VirtualFileSystem, name: string) {
            this.fileSystem = fileSystem;
            this.name = name;
        }

        isDirectory(): this is VirtualDirectory { return false; }
        isFile(): this is VirtualFile { return false; }
        isFileSystem(): this is VirtualFileSystem { return false; }
    }

    export class VirtualFile extends VirtualFileSystemEntry {
        content?: Harness.LanguageService.ScriptInfo;
        isFile() { return true; }
    }

    export abstract class VirtualFileSystemContainer extends VirtualFileSystemEntry {
        abstract getFileSystemEntries(): VirtualFileSystemEntry[];

        getFileSystemEntry(name: string): VirtualFileSystemEntry {
            for (const entry of this.getFileSystemEntries()) {
                if (this.fileSystem.sameName(entry.name, name)) {
                    return entry;
                }
            }
            return undefined;
        }

        getDirectories(): VirtualDirectory[] {
            return <VirtualDirectory[]>ts.filter(this.getFileSystemEntries(), entry => entry.isDirectory());
        }

        getFiles(): VirtualFile[] {
            return <VirtualFile[]>ts.filter(this.getFileSystemEntries(), entry => entry.isFile());
        }

        getDirectory(name: string): VirtualDirectory {
            const entry = this.getFileSystemEntry(name);
            return entry.isDirectory() ? <VirtualDirectory>entry : undefined;
        }

        getFile(name: string): VirtualFile {
            const entry = this.getFileSystemEntry(name);
            return entry.isFile() ? <VirtualFile>entry : undefined;
        }
    }

    export class VirtualDirectory extends VirtualFileSystemContainer {
        private entries: VirtualFileSystemEntry[] = [];

        isDirectory() { return true; }

        getFileSystemEntries() { return this.entries.slice(); }

        addDirectory(name: string): VirtualDirectory {
            const entry = this.getFileSystemEntry(name);
            if (entry === undefined) {
                const directory = new VirtualDirectory(this.fileSystem, name);
                this.entries.push(directory);
                return directory;
            }
            else if (entry.isDirectory()) {
                return <VirtualDirectory>entry;
            }
            else {
                return undefined;
            }
        }

        addFile(name: string, content?: Harness.LanguageService.ScriptInfo): VirtualFile {
            const entry = this.getFileSystemEntry(name);
            if (entry === undefined) {
                const file = new VirtualFile(this.fileSystem, name);
                file.content = content;
                this.entries.push(file);
                return file;
            }
            else if (entry.isFile()) {
                entry.content = content;
                return entry;
            }
            else {
                return undefined;
            }
        }
    }

    export class VirtualFileSystem extends VirtualFileSystemContainer {
        private root: VirtualDirectory;

        currentDirectory: string;
        useCaseSensitiveFileNames: boolean;

        constructor(currentDirectory: string, useCaseSensitiveFileNames: boolean) {
            super(/*fileSystem*/ undefined, "");
            this.fileSystem = this;
            this.root = new VirtualDirectory(this, "");
            this.currentDirectory = currentDirectory;
            this.useCaseSensitiveFileNames = useCaseSensitiveFileNames;
        }

        isFileSystem() { return true; }

        getFileSystemEntries() { return this.root.getFileSystemEntries(); }

        addDirectory(path: string) {
            path = ts.normalizePath(path);
            const components = ts.getNormalizedPathComponents(path, this.currentDirectory);
            let directory: VirtualDirectory = this.root;
            for (const component of components) {
                directory = directory.addDirectory(component);
                if (directory === undefined) {
                    break;
                }
            }

            return directory;
        }

        addFile(path: string, content?: Harness.LanguageService.ScriptInfo) {
            const absolutePath = ts.normalizePath(ts.getNormalizedAbsolutePath(path, this.currentDirectory));
            const fileName = ts.getBaseFileName(path);
            const directoryPath = ts.getDirectoryPath(absolutePath);
            const directory = this.addDirectory(directoryPath);
            return directory ? directory.addFile(fileName, content) : undefined;
        }

        fileExists(path: string) {
            const entry = this.traversePath(path);
            return entry !== undefined && entry.isFile();
        }

        sameName(a: string, b: string) {
            return this.useCaseSensitiveFileNames ? a === b : a.toLowerCase() === b.toLowerCase();
        }

        traversePath(path: string) {
            path = ts.normalizePath(path);
            let directory: VirtualDirectory = this.root;
            for (const component of ts.getNormalizedPathComponents(path, this.currentDirectory)) {
                const entry = directory.getFileSystemEntry(component);
                if (entry === undefined) {
                    return undefined;
                }
                else if (entry.isDirectory()) {
                    directory = <VirtualDirectory>entry;
                }
                else {
                    return entry;
                }
            }

            return directory;
        }

        /**
         * Reads the directory at the given path and retrieves a list of file names and a list
         * of directory names within it. Suitable for use with ts.matchFiles()
         * @param path  The path to the directory to be read
         */
        getAccessibleFileSystemEntries(path: string) {
            const entry = this.traversePath(path);
            if (entry && entry.isDirectory()) {
                const directory = <VirtualDirectory>entry;
                return {
                    files: ts.map(directory.getFiles(), f => f.name),
                    directories: ts.map(directory.getDirectories(), d => d.name)
                };
            }
            return { files: [], directories: [] };
        }

        getAllFileEntries() {
            const fileEntries: VirtualFile[] = [];
            getFilesRecursive(this.root, fileEntries);
            return fileEntries;

            function getFilesRecursive(dir: VirtualDirectory, result: VirtualFile[]) {
                const files = dir.getFiles();
                const dirs = dir.getDirectories();
                for (const file of files) {
                    result.push(file);
                }
                for (const subDir of dirs) {
                    getFilesRecursive(subDir, result);
                }
            }
        }
    }

    export class MockParseConfigHost extends VirtualFileSystem implements ts.ParseConfigHost {
        constructor(currentDirectory: string, ignoreCase: boolean, files: ts.Map<string> | string[]) {
            super(currentDirectory, ignoreCase);
            if (files instanceof Array) {
                for (const file of files) {
                    this.addFile(file, new Harness.LanguageService.ScriptInfo(file, undefined, /*isRootFile*/false));
                }
            }
            else {
                files.forEach((fileContent, fileName) => {
                    this.addFile(fileName, new Harness.LanguageService.ScriptInfo(fileName, fileContent, /*isRootFile*/false));
                });
            }
        }

        readFile(path: string): string {
            const value = this.traversePath(path);
            if (value && value.isFile()) {
                return value.content.content;
            }
        }

        readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number) {
            return ts.matchFiles(path, extensions, excludes, includes, this.useCaseSensitiveFileNames, this.currentDirectory, depth, (path: string) => this.getAccessibleFileSystemEntries(path));
        }
    }
}