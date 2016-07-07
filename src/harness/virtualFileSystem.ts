/// <reference path="harness.ts" />
/// <reference path="..\compiler\commandLineParser.ts"/>
namespace Utils {
    export class VirtualFileSystemEntry<T> {
        fileSystem: VirtualFileSystem<T>;
        name: string;

        constructor(fileSystem: VirtualFileSystem<T>, name: string) {
            this.fileSystem = fileSystem;
            this.name = name;
        }

        isDirectory() { return false; }
        isFile() { return false; }
        isFileSystem() { return false; }
    }

    export class VirtualFile<T> extends VirtualFileSystemEntry<T> {
        content: T;
        isFile() { return true; }
    }

    export abstract class VirtualFileSystemContainer<T> extends VirtualFileSystemEntry<T> {
        abstract getFileSystemEntries(): VirtualFileSystemEntry<T>[];

        getFileSystemEntry(name: string): VirtualFileSystemEntry<T> {
            for (const entry of this.getFileSystemEntries()) {
                if (this.fileSystem.sameName(entry.name, name)) {
                    return entry;
                }
            }
            return undefined;
        }

        getDirectories(): VirtualDirectory<T>[] {
            return <VirtualDirectory<T>[]>ts.filter(this.getFileSystemEntries(), entry => entry.isDirectory());
        }

        getFiles(): VirtualFile<T>[] {
            return <VirtualFile<T>[]>ts.filter(this.getFileSystemEntries(), entry => entry.isFile());
        }

        getDirectory(name: string): VirtualDirectory<T> {
            const entry = this.getFileSystemEntry(name);
            return entry.isDirectory() ? <VirtualDirectory<T>>entry : undefined;
        }

        getFile(name: string): VirtualFile<T> {
            const entry = this.getFileSystemEntry(name);
            return entry.isFile() ? <VirtualFile<T>>entry : undefined;
        }
    }

    export class VirtualDirectory<T> extends VirtualFileSystemContainer<T> {
        private entries: VirtualFileSystemEntry<T>[] = [];

        isDirectory() { return true; }

        getFileSystemEntries() { return this.entries.slice(); }

        addDirectory(name: string): VirtualDirectory<T> {
            const entry = this.getFileSystemEntry(name);
            if (entry === undefined) {
                const directory = new VirtualDirectory<T>(this.fileSystem, name);
                this.entries.push(directory);
                return directory;
            }
            else if (entry.isDirectory()) {
                return <VirtualDirectory<T>>entry;
            }
            else {
                return undefined;
            }
        }

        addFile(name: string, content?: T): VirtualFile<T> {
            const entry = this.getFileSystemEntry(name);
            if (entry === undefined) {
                const file = new VirtualFile<T>(this.fileSystem, name);
                file.content = content;
                this.entries.push(file);
                return file;
            }
            else if (entry.isFile()) {
                const file = <VirtualFile<T>>entry;
                file.content = content;
                return file;
            }
            else {
                return undefined;
            }
        }
    }

    export class VirtualFileSystem<T> extends VirtualFileSystemContainer<T> {
        private root: VirtualDirectory<T>;

        currentDirectory: string;
        useCaseSensitiveFileNames: boolean;

        constructor(currentDirectory: string, useCaseSensitiveFileNames: boolean) {
            super(undefined, "");
            this.fileSystem = this;
            this.root = new VirtualDirectory<T>(this, "");
            this.currentDirectory = currentDirectory;
            this.useCaseSensitiveFileNames = useCaseSensitiveFileNames;
        }

        isFileSystem() { return true; }

        getFileSystemEntries() { return this.root.getFileSystemEntries(); }

        addDirectory(path: string) {
            const components = ts.getNormalizedPathComponents(path, this.currentDirectory);
            let directory: VirtualDirectory<T> = this.root;
            for (const component of components) {
                directory = directory.addDirectory(component);
                if (directory === undefined) {
                    break;
                }
            }

            return directory;
        }

        addFile(path: string, content?: T) {
            const absolutePath = ts.getNormalizedAbsolutePath(path, this.currentDirectory);
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
            let directory: VirtualDirectory<T> = this.root;
            for (const component of ts.getNormalizedPathComponents(path, this.currentDirectory)) {
                const entry = directory.getFileSystemEntry(component);
                if (entry === undefined) {
                    return undefined;
                }
                else if (entry.isDirectory()) {
                    directory = <VirtualDirectory<T>>entry;
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
                const directory = <VirtualDirectory<T>>entry;
                return {
                    files: ts.map(directory.getFiles(), f => f.name),
                    directories: ts.map(directory.getDirectories(), d => d.name)
                };
            }
            return { files: [], directories: [] };
        }

        getAllFileEntries() {
            const fileEntries: VirtualFile<T>[] = [];
            getFilesRecursive(this.root, fileEntries);
            return fileEntries;

            function getFilesRecursive(dir: VirtualDirectory<T>, result: VirtualFile<T>[]) {
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

    export class MockParseConfigHost extends VirtualFileSystem<string> implements ts.ParseConfigHost {
        constructor(currentDirectory: string, ignoreCase: boolean, files: string[]) {
            super(currentDirectory, ignoreCase);
            for (const file of files) {
                this.addFile(file);
            }
        }

        readDirectory(path: string, extensions: string[], excludes: string[], includes: string[]) {
            return ts.matchFiles(path, extensions, excludes, includes, this.useCaseSensitiveFileNames, this.currentDirectory, (path: string) => this.getAccessibleFileSystemEntries(path));
        }
    }
}