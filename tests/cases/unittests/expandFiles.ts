/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

describe("expandFiles", () => {
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
    
    let expect = _chai.expect;
    describe("with literal file list", () => {
        it("without exclusions", () => {
            let fileNames = ["a.ts", "b.ts"];
            let results = ts.expandFiles(basePath, fileNames, /*includeSpecs*/ undefined, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts"]);
        });
        it("missing files are still present", () => {
            let fileNames = ["z.ts", "x.ts"];
            let results = ts.expandFiles(basePath, fileNames, /*includeSpecs*/ undefined, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/z.ts", "c:/dev/x.ts"]);
        });
        it("are not removed due to excludes", () => {
            let fileNames = ["a.ts", "b.ts"];
            let excludeSpecs = ["b.ts"];
            let results = ts.expandFiles(basePath, fileNames, /*includeSpecs*/ undefined, excludeSpecs, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts"]);
        });
    });
    
    describe("with literal include list", () => {
        it("without exclusions", () => {
            let includeSpecs = ["a.ts", "b.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts"]);
        });
        it("with non .ts file extensions are excluded", () => {
            let includeSpecs = ["a.js", "b.js"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, []);
        });
        it("with missing files are excluded", () => {
            let includeSpecs = ["z.ts", "x.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, []);
        });
        it("with literal excludes", () => {
            let includeSpecs = ["a.ts", "b.ts"];
            let excludeSpecs = ["b.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, excludeSpecs, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts"]);
        });
        it("with wildcard excludes", () => {
            let includeSpecs = ["a.ts", "b.ts", "z/a.ts", "z/abz.ts", "z/aba.ts", "x/b.ts"];
            let excludeSpecs = ["*.ts", "z/??[b-z].ts", "*/b.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, excludeSpecs, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/z/a.ts", "c:/dev/z/aba.ts"]);
        });
        it("with recursive excludes", () => {
            let includeSpecs = ["a.ts", "b.ts", "x/a.ts", "x/b.ts", "x/y/a.ts", "x/y/b.ts"];
            let excludeSpecs = ["**/b.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, excludeSpecs, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/x/a.ts", "c:/dev/x/y/a.ts"]);
        });
        it("with case sensitive exclude", () => {
            let includeSpecs = ["B.ts"];
            let excludeSpecs = ["**/b.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, excludeSpecs, {}, caseSensitiveHost);
            assert.deepEqual(results, ["c:/dev/B.ts"]);
        });
    });

    describe("with wildcard include list", () => {
        it("same named declarations are excluded", () => {
            let includeSpecs = ["*.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts", "c:/dev/c.d.ts"]);
        });
        it("`*` matches only ts files", () => {
            let includeSpecs = ["*"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/b.ts", "c:/dev/c.d.ts"]);
        });
        it("`?` matches only a single character", () => {
            let includeSpecs = ["x/?.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/x/a.ts", "c:/dev/x/b.ts"]);
        });
        it("`[]` matches only a single character", () => {
            let includeSpecs = ["x/[b-z].ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/x/b.ts"]);
        });
        it("with recursive directory", () => {
            let includeSpecs = ["**/a.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts", "c:/dev/x/a.ts", "c:/dev/x/y/a.ts", "c:/dev/z/a.ts"]);
        });
        it("case sensitive", () => {
            let includeSpecs = ["**/A.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseSensitiveHost);
            assert.deepEqual(results, ["c:/dev/A.ts"]);
        });
        it("with missing files are excluded", () => {
            let includeSpecs = ["*/z.ts"];
            let results = ts.expandFiles(basePath, /*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, {}, caseInsensitiveHost);
            assert.deepEqual(results, []);
        });
        it("always include literal files", () => {
            let fileNames = ["a.ts"];
            let includeSpecs = ["*/z.ts"];
            let excludeSpecs = ["**/a.ts"];
            let results = ts.expandFiles(basePath, fileNames, includeSpecs, excludeSpecs, {}, caseInsensitiveHost);
            assert.deepEqual(results, ["c:/dev/a.ts"]);
        });
    });

    function createMockParseConfigHost(basePath: string, files: string[], ignoreCase: boolean): ts.ParseConfigHost {
        let fileSet: ts.Map<string> = {};
        let directorySet: ts.Map<ts.Map<string>> = {};
    
        files.sort((a, b) => ts.comparePaths(a, b, basePath, ignoreCase));
        for (let file of files) {
            addFile(ts.getNormalizedAbsolutePath(file, basePath));
        }
    
        return {
            useCaseSensitiveFileNames: !ignoreCase,
            fileExists,
            directoryExists,
            readDirectory,
            readDirectoryFlat
        };
    
        function fileExists(path: string): boolean {
            let fileKey = ignoreCase ? path.toLowerCase() : path;
            return ts.hasProperty(fileSet, fileKey);
        }
    
        function directoryExists(path: string): boolean {
            let directoryKey = ignoreCase ? path.toLowerCase() : path;
            return ts.hasProperty(directorySet, directoryKey);
        }
    
        function readDirectory(rootDir: string, extension: string): string[] {
            throw new Error("Not implemented");
        }
    
        function readDirectoryFlat(path: string): string[] {
            path = ts.getNormalizedAbsolutePath(path, basePath);
            path = ts.removeTrailingDirectorySeparator(path);
            let directoryKey = ignoreCase ? path.toLowerCase() : path;
            let entries = ts.getProperty(directorySet, directoryKey);
            let result: string[] = [];
            ts.forEachKey(entries, key => { result.push(key); });
            result.sort((a, b) => ts.compareStrings(a, b, ignoreCase));
            return result;
        }
    
        function addFile(file: string) {
            let fileKey = ignoreCase ? file.toLowerCase() : file;
            if (!ts.hasProperty(fileSet, fileKey)) {
                fileSet[fileKey] = file;
                let name = ts.getBaseFileName(file);
                let parent = ts.getDirectoryPath(file);
                addToDirectory(parent, name);
            }
        }
    
        function addDirectory(directory: string) {
            directory = ts.removeTrailingDirectorySeparator(directory);
            let directoryKey = ignoreCase ? directory.toLowerCase() : directory;
            if (!ts.hasProperty(directorySet, directoryKey)) {
                directorySet[directoryKey] = {};
                let name = ts.getBaseFileName(directory);
                let parent = ts.getDirectoryPath(directory);
                if (parent !== directory) {
                    addToDirectory(parent, name);
                }
            }
        }
    
        function addToDirectory(directory: string, entry: string) {
            addDirectory(directory);
            directory = ts.removeTrailingDirectorySeparator(directory);
            let directoryKey = ignoreCase ? directory.toLowerCase() : directory;
            let entryKey = ignoreCase ? entry.toLowerCase() : entry;
            let entries = directorySet[directoryKey];
            if (!ts.hasProperty(entries, entryKey)) {
                entries[entryKey] = entry;
            }
        }
    }
});
