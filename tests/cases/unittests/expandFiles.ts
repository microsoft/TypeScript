/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

namespace ts {
    const caseInsensitiveBasePath = "c:/dev/";
    const caseInsensitiveHost = createMockParseConfigHost(/*ignoreCase*/ true, caseInsensitiveBasePath, [
        "a.ts",
        "a.d.ts",
        "a.js",
        "b.ts",
        "b.js",
        "c.d.ts",
        "z/a.ts",
        "z/abz.ts",
        "z/aba.ts",
        "z/b.ts",
        "z/bbz.ts",
        "z/bba.ts",
        "x/a.ts",
        "x/aa.ts",
        "x/b.ts",
        "x/y/a.ts",
        "x/y/b.ts",
        "js/a.js",
        "js/b.js",
    ]);

    const caseSensitiveBasePath = "/dev/";
    const caseSensitiveHost = createMockParseConfigHost(/*ignoreCase*/ false, caseSensitiveBasePath, [
        "a.ts",
        "a.d.ts",
        "a.js",
        "b.ts",
        "b.js",
        "A.ts",
        "B.ts",
        "c.d.ts",
        "z/a.ts",
        "z/abz.ts",
        "z/aba.ts",
        "z/b.ts",
        "z/bbz.ts",
        "z/bba.ts",
        "x/a.ts",
        "x/b.ts",
        "x/y/a.ts",
        "x/y/b.ts",
        "js/a.js",
        "js/b.js",
    ]);

    const caseInsensitiveMixedExtensionHost = createMockParseConfigHost(/*ignoreCase*/ true, caseInsensitiveBasePath, [
        "a.ts",
        "a.d.ts",
        "a.js",
        "b.tsx",
        "b.d.ts",
        "b.jsx",
        "c.tsx",
        "c.js",
        "d.js",
        "e.jsx",
        "f.other"
    ]);

    describe("expandFiles", () => {
        describe("with literal file list", () => {
            it("without exclusions", () => {
                const fileNames = ["a.ts", "b.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/a.ts", "c:/dev/b.ts"],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(fileNames, /*includeSpecs*/ undefined, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("missing files are still present", () => {
                const fileNames = ["z.ts", "x.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/z.ts", "c:/dev/x.ts"],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(fileNames, /*includeSpecs*/ undefined, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("are not removed due to excludes", () => {
                const fileNames = ["a.ts", "b.ts"];
                const excludeSpecs = ["b.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/a.ts", "c:/dev/b.ts"],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(fileNames, /*includeSpecs*/ undefined, excludeSpecs, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
        });

        describe("with literal include list", () => {
            it("without exclusions", () => {
                const includeSpecs = ["a.ts", "b.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/a.ts", "c:/dev/b.ts"],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("with non .ts file extensions are excluded", () => {
                const includeSpecs = ["a.js", "b.js"];
                const expected: ts.ExpandResult = {
                    fileNames: [],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("with missing files are excluded", () => {
                const includeSpecs = ["z.ts", "x.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: [],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("with literal excludes", () => {
                const includeSpecs = ["a.ts", "b.ts"];
                const excludeSpecs = ["b.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/a.ts"],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, excludeSpecs, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("with wildcard excludes", () => {
                const includeSpecs = ["a.ts", "b.ts", "z/a.ts", "z/abz.ts", "z/aba.ts", "x/b.ts"];
                const excludeSpecs = ["*.ts", "z/??z.ts", "*/b.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/z/a.ts", "c:/dev/z/aba.ts"],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, excludeSpecs, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("with recursive excludes", () => {
                const includeSpecs = ["a.ts", "b.ts", "x/a.ts", "x/b.ts", "x/y/a.ts", "x/y/b.ts"];
                const excludeSpecs = ["**/b.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/a.ts", "c:/dev/x/a.ts", "c:/dev/x/y/a.ts"],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, excludeSpecs, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("with case sensitive exclude", () => {
                const includeSpecs = ["B.ts"];
                const excludeSpecs = ["**/b.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["/dev/B.ts"],
                    wildcardDirectories: {},
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, excludeSpecs, caseSensitiveBasePath, {}, caseSensitiveHost);
                assert.deepEqual(actual, expected);
            });
        });

        describe("with wildcard include list", () => {
            it("same named declarations are excluded", () => {
                const includeSpecs = ["*.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/a.ts", "c:/dev/b.ts", "c:/dev/c.d.ts"],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.None
                    },
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("`*` matches only ts files", () => {
                const includeSpecs = ["*"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/a.ts", "c:/dev/b.ts", "c:/dev/c.d.ts"],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.None
                    },
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("`?` matches only a single character", () => {
                const includeSpecs = ["x/?.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/x/a.ts", "c:/dev/x/b.ts"],
                    wildcardDirectories: {
                        "c:/dev/x": ts.WatchDirectoryFlags.None
                    },
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("with recursive directory", () => {
                const includeSpecs = ["**/a.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/a.ts", "c:/dev/x/a.ts", "c:/dev/x/y/a.ts", "c:/dev/z/a.ts"],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("case sensitive", () => {
                const includeSpecs = ["**/A.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["/dev/A.ts"],
                    wildcardDirectories: {
                        "/dev": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseSensitiveBasePath, {}, caseSensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("with missing files are excluded", () => {
                const includeSpecs = ["*/z.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: [],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.None
                    },
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("always include literal files", () => {
                const fileNames = ["a.ts"];
                const includeSpecs = ["*/z.ts"];
                const excludeSpecs = ["**/a.ts"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/a.ts"],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.None
                    },
                };
                const actual = ts.expandFiles(fileNames, includeSpecs, excludeSpecs, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("exclude folders", () => {
                const includeSpecs = ["**/*"];
                const excludeSpecs = ["z", "x"];
                const expected: ts.ExpandResult = {
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts",
                        "c:/dev/c.d.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    }
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, excludeSpecs, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("exclude .js files when allowJs=false", () => {
                const includeSpecs = ["js/*"];
                const expected: ts.ExpandResult = {
                    fileNames: [],
                    wildcardDirectories: {
                        "c:/dev/js": ts.WatchDirectoryFlags.None
                    }
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
            it("include .js files when allowJs=true", () => {
                const includeSpecs = ["js/*"];
                const expected: ts.ExpandResult = {
                    fileNames: ["c:/dev/js/a.js", "c:/dev/js/b.js"],
                    wildcardDirectories: {
                        "c:/dev/js": ts.WatchDirectoryFlags.None
                    }
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, { allowJs: true }, caseInsensitiveHost);
                assert.deepEqual(actual, expected);
            });
        });

        describe("when called from parseJsonConfigFileContent", () => {
            it("with jsx=none, allowJs=false", () => {
                const json: any = {
                    "compilerOptions": {
                        "jsx": "none",
                        "allowJs": false
                    }
                };
                const expected: ts.ExpandResult = {
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.tsx",
                        "c:/dev/c.tsx",
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveMixedExtensionHost, caseInsensitiveBasePath);
                assert.deepEqual(actual.fileNames, expected.fileNames);
                assert.deepEqual(actual.wildcardDirectories, expected.wildcardDirectories);
            });
            it("with jsx=preserve, allowJs=false", () => {
                const json: any = {
                    "compilerOptions": {
                        "jsx": "preserve",
                        "allowJs": false
                    }
                };
                const expected: ts.ExpandResult = {
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.tsx",
                        "c:/dev/c.tsx",
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveMixedExtensionHost, caseInsensitiveBasePath);
                assert.deepEqual(actual.fileNames, expected.fileNames);
                assert.deepEqual(actual.wildcardDirectories, expected.wildcardDirectories);
            });
            it("with jsx=none, allowJs=true", () => {
                const json: any = {
                    "compilerOptions": {
                        "jsx": "none",
                        "allowJs": true
                    }
                };
                const expected: ts.ExpandResult = {
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.tsx",
                        "c:/dev/c.tsx",
                        "c:/dev/d.js",
                        "c:/dev/e.jsx",
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveMixedExtensionHost, caseInsensitiveBasePath);
                assert.deepEqual(actual.fileNames, expected.fileNames);
                assert.deepEqual(actual.wildcardDirectories, expected.wildcardDirectories);
            });
            it("with jsx=preserve, allowJs=true", () => {
                const json: any = {
                    "compilerOptions": {
                        "jsx": "preserve",
                        "allowJs": true
                    }
                };
                const expected: ts.ExpandResult = {
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.tsx",
                        "c:/dev/c.tsx",
                        "c:/dev/d.js",
                        "c:/dev/e.jsx",
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveMixedExtensionHost, caseInsensitiveBasePath);
                assert.deepEqual(actual.fileNames, expected.fileNames);
                assert.deepEqual(actual.wildcardDirectories, expected.wildcardDirectories);
            });
        });
    });

    interface DirectoryEntry {
        files: ts.Map<string>;
        directories: ts.Map<string>;
    }

    interface TestParseConfigHost extends ts.ParseConfigHost {
        basePath: string;
    }

    function createMockParseConfigHost(ignoreCase: boolean, basePath: string, files: string[]): TestParseConfigHost {
        const fileSet: ts.Map<string> = {};
        const directorySet: ts.Map<DirectoryEntry> = {};
        const emptyDirectory: DirectoryEntry = { files: {}, directories: {} };

        files.sort((a, b) => ts.comparePaths(a, b, basePath, ignoreCase));
        for (const file of files) {
            addFile(ts.getNormalizedAbsolutePath(file, basePath));
        }

        return {
            useCaseSensitiveFileNames: !ignoreCase,
            basePath,
            fileExists,
            directoryExists,
            readDirectory,
            readFileNames,
            readDirectoryNames
        };

        function fileExists(path: string): boolean {
            path = ts.getNormalizedAbsolutePath(path, basePath);
            path = ts.removeTrailingDirectorySeparator(path);
            const fileKey = ignoreCase ? path.toLowerCase() : path;
            return ts.hasProperty(fileSet, fileKey);
        }

        function directoryExists(path: string): boolean {
            path = ts.getNormalizedAbsolutePath(path, basePath);
            path = ts.removeTrailingDirectorySeparator(path);
            const directoryKey = ignoreCase ? path.toLowerCase() : path;
            return ts.hasProperty(directorySet, directoryKey);
        }

        function readDirectory(rootDir: string, extension?: string, exclude?: string[]): string[] {
            throw new Error("Not implemented");
        }

        function readFileNames(path: string) {
            const { files } = getDirectoryEntry(path) || emptyDirectory;
            const result: string[] = [];
            ts.forEachKey(files, key => { result.push(key); });
            result.sort((a, b) => ts.compareStrings(a, b, ignoreCase));
            return result;
        }

        function readDirectoryNames(path: string) {
            const { directories } = getDirectoryEntry(path); // || emptyDirectory;
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
}