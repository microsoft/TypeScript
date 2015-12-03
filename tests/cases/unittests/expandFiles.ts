/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

describe("expandFiles", () => {
    it("fail", () => {
        assert.isTrue(false, "just checking");
    });

    const basePath = "c:/dev/";
    const caseInsensitiveHost = createMockParseConfigHost(
        basePath,
        /*files*/ [
            "c:/dev/a.ts",
            "c:/dev/a.d.ts",
            "c:/dev/a.js",
            "c:/dev/b.ts",
            "c:/dev/b.js",
            "c:/dev/c.d.ts",
            "c:/dev/z/a.ts",
            "c:/dev/z/abz.ts",
            "c:/dev/z/aba.ts",
            "c:/dev/z/b.ts",
            "c:/dev/z/bbz.ts",
            "c:/dev/z/bba.ts",
            "c:/dev/x/a.ts",
            "c:/dev/x/aa.ts",
            "c:/dev/x/b.ts",
            "c:/dev/x/y/a.ts",
            "c:/dev/x/y/b.ts"
        ],
        /*ignoreCase*/ true);

    const caseSensitiveHost = createMockParseConfigHost(
        basePath,
        /*files*/ [
            "c:/dev/a.ts",
            "c:/dev/a.d.ts",
            "c:/dev/a.js",
            "c:/dev/b.ts",
            "c:/dev/b.js",
            "c:/dev/A.ts",
            "c:/dev/B.ts",
            "c:/dev/c.d.ts",
            "c:/dev/z/a.ts",
            "c:/dev/z/abz.ts",
            "c:/dev/z/aba.ts",
            "c:/dev/z/b.ts",
            "c:/dev/z/bbz.ts",
            "c:/dev/z/bba.ts",
            "c:/dev/x/a.ts",
            "c:/dev/x/b.ts",
            "c:/dev/x/y/a.ts",
            "c:/dev/x/y/b.ts",
        ],
        /*ignoreCase*/ false);

    const expect = _chai.expect;
    describe("with literal file list", () => {
        it("without exclusions", () => {
            const fileNames = ["a.ts", "b.ts"];
            const results = ts.expandFiles(fileNames, /*includeSpecs*/ undefined, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts"]);
        });
        it("missing files are still present", () => {
            const fileNames = ["z.ts", "x.ts"];
            const results = ts.expandFiles(fileNames, /*includeSpecs*/ undefined, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/z.ts", "c:/dev/x.ts"]);
        });
        it("are not removed due to excludes", () => {
            const fileNames = ["a.ts", "b.ts"];
            const excludeSpecs = ["b.ts"];
            const results = ts.expandFiles(fileNames, /*includeSpecs*/ undefined, excludeSpecs, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts"]);
        });
    });

    describe("with literal include list", () => {
        it("without exclusions", () => {
            const includeSpecs = ["a.ts", "b.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts"]);
        });
        it("with non .ts file extensions are excluded", () => {
            const includeSpecs = ["a.js", "b.js"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, []);
        });
        it("with missing files are excluded", () => {
            const includeSpecs = ["z.ts", "x.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, []);
        });
        it("with literal excludes", () => {
            const includeSpecs = ["a.ts", "b.ts"];
            const excludeSpecs = ["b.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, excludeSpecs, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts"]);
        });
        it("with wildcard excludes", () => {
            const includeSpecs = ["a.ts", "b.ts", "z/a.ts", "z/abz.ts", "z/aba.ts", "x/b.ts"];
            const excludeSpecs = ["*.ts", "z/??z.ts", "*/b.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, excludeSpecs, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/z/a.ts", "c:/dev/z/aba.ts"]);
        });
        it("with recursive excludes", () => {
            const includeSpecs = ["a.ts", "b.ts", "x/a.ts", "x/b.ts", "x/y/a.ts", "x/y/b.ts"];
            const excludeSpecs = ["**/b.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, excludeSpecs, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/x/a.ts", "c:/dev/x/y/a.ts"]);
        });
        it("with case sensitive exclude", () => {
            const includeSpecs = ["B.ts"];
            const excludeSpecs = ["**/b.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, excludeSpecs, basePath, {}, caseSensitiveHost);
            assert.deepEqual(results, ["c:/dev/B.ts"]);
        });
    });

    describe("with wildcard include list", () => {
        it("same named declarations are excluded", () => {
            const includeSpecs = ["*.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts", "c:/dev/c.d.ts"]);
        });
        it("`*` matches only ts files", () => {
            const includeSpecs = ["*"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts", "c:/dev/c.d.ts"]);
        });
        it("`?` matches only a single character", () => {
            const includeSpecs = ["x/?.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/x/a.ts", "c:/dev/x/b.ts"]);
        });
        it("with recursive directory", () => {
            const includeSpecs = ["**/a.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/x/a.ts", "c:/dev/x/y/a.ts", "c:/dev/z/a.ts"]);
        });
        it("case sensitive", () => {
            const includeSpecs = ["**/A.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, basePath, {}, caseSensitiveHost);
            assert.deepEqual(results, ["c:/dev/A.ts"]);
        });
        it("with missing files are excluded", () => {
            const includeSpecs = ["*/z.ts"];
            const results = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, []);
        });
        it("always include literal files", () => {
            const fileNames = ["a.ts"];
            const includeSpecs = ["*/z.ts"];
            const excludeSpecs = ["**/a.ts"];
            const results = ts.expandFiles(fileNames, includeSpecs, excludeSpecs, basePath, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts"]);
        });
    });

    function createMockParseConfigHost(basePath: string, files: string[], ignoreCase: boolean): ts.ParseConfigHost {
        const fileSet: ts.Map<string> = {};
        const directorySet: ts.Map<{ files: ts.Map<string>; directories: ts.Map<string>; }> = {};

        files.sort((a, b) => ts.comparePaths(a, b, basePath, ignoreCase));
        for (const file of files) {
            addFile(ts.getNormalizedAbsolutePath(file, basePath));
        }

        return {
            useCaseSensitiveFileNames: !ignoreCase,
            fileExists,
            readDirectory,
            readFileNames,
            readDirectoryNames
        };

        function fileExists(path: string): boolean {
            const fileKey = ignoreCase ? path.toLowerCase() : path;
            return ts.hasProperty(fileSet, fileKey);
        }

        function directoryExists(path: string): boolean {
            const directoryKey = ignoreCase ? path.toLowerCase() : path;
            return ts.hasProperty(directorySet, directoryKey);
        }

        function readDirectory(rootDir: string, extension?: string, exclude?: string[]): string[] {
            throw new Error("Not implemented");
        }

        function readFileNames(path: string) {
            const files = getDirectoryEntry(path).files;
            const result: string[] = [];
            ts.forEachKey(files, key => { result.push(key); });
            result.sort((a, b) => ts.compareStrings(a, b, ignoreCase));
            return result;
        }

        function readDirectoryNames(path: string) {
            const directories = getDirectoryEntry(path).directories;
            const result: string[] = [];
            ts.forEachKey(directories, key => { result.push(key); });
            result.sort((a, b) => ts.compareStrings(a, b, ignoreCase));
            return result;
        }

        function getDirectoryEntry(path: string) {
            path = ts.getNormalizedAbsolutePath(path, basePath);
            path = ts.removeTrailingDirectorySeparator(path);
            const directoryKey = ignoreCase ? path.toLowerCase() : path;
            return ts.getProperty(directorySet, directoryKey);
        }

        function addFile(file: string) {
            const fileKey = ignoreCase ? file.toLowerCase() : file;
            if (!ts.hasProperty(fileSet, fileKey)) {
                fileSet[fileKey] = file;
                const name = ts.getBaseFileName(file);
                const parent = ts.getDirectoryPath(file);
                addToDirectory(parent, name, "file");
            }
        }

        function addDirectory(directory: string) {
            directory = ts.removeTrailingDirectorySeparator(directory);
            const directoryKey = ignoreCase ? directory.toLowerCase() : directory;
            if (!ts.hasProperty(directorySet, directoryKey)) {
                directorySet[directoryKey] = { files: {}, directories: {} };
                const name = ts.getBaseFileName(directory);
                const parent = ts.getDirectoryPath(directory);
                if (parent !== directory) {
                    addToDirectory(parent, name, "directory");
                }
            }
        }

        function addToDirectory(directory: string, entry: string, type: "file" | "directory") {
            addDirectory(directory);
            directory = ts.removeTrailingDirectorySeparator(directory);
            const directoryKey = ignoreCase ? directory.toLowerCase() : directory;
            const entryKey = ignoreCase ? entry.toLowerCase() : entry;
            const directoryEntry = directorySet[directoryKey];
            const entries = type === "file" ? directoryEntry.files : directoryEntry.directories;
            if (!ts.hasProperty(entries, entryKey)) {
                entries[entryKey] = entry;
            }
        }
    }
});

