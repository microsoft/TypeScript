/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

namespace ts {
    class MockParseConfigHost extends Utils.VirtualFileSystem implements ParseConfigHost {
        constructor(currentDirectory: string, ignoreCase: boolean, files: string[]) {
            super(currentDirectory, ignoreCase);
            for (const file of files) {
                this.addFile(file);
            }
        }

        readDirectory(path: string, extensions: string[], excludes: string[], includes: string[]) {
            return matchFiles(path, extensions, excludes, includes, this.useCaseSensitiveFileNames, this.currentDirectory, (path: string) => this.getAccessibleFileSystemEntries(path));
        }

        getAccessibleFileSystemEntries(path: string) {
            const entry = this.traversePath(path);
            if (entry && entry.isDirectory()) {
                const directory = <Utils.VirtualDirectory>entry;
                return {
                    files: map(directory.getFiles(), f => f.name),
                    directories: map(directory.getDirectories(), d => d.name)
                };
            }
            return { files: [], directories: [] };
        }
    }

    const caseInsensitiveBasePath = "c:/dev/";
    const caseInsensitiveHost = new MockParseConfigHost(caseInsensitiveBasePath, /*useCaseSensitiveFileNames*/ false, [
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
        "c:/dev/x/y/b.ts",
        "c:/dev/js/a.js",
        "c:/dev/js/b.js",
        "c:/ext/ext.ts"
    ]);

    const caseSensitiveBasePath = "/dev/";
    const caseSensitiveHost = new MockParseConfigHost(caseSensitiveBasePath, /*useCaseSensitiveFileNames*/ true, [
        "/dev/a.ts",
        "/dev/a.d.ts",
        "/dev/a.js",
        "/dev/b.ts",
        "/dev/b.js",
        "/dev/A.ts",
        "/dev/B.ts",
        "/dev/c.d.ts",
        "/dev/z/a.ts",
        "/dev/z/abz.ts",
        "/dev/z/aba.ts",
        "/dev/z/b.ts",
        "/dev/z/bbz.ts",
        "/dev/z/bba.ts",
        "/dev/x/a.ts",
        "/dev/x/b.ts",
        "/dev/x/y/a.ts",
        "/dev/x/y/b.ts",
        "/dev/js/a.js",
        "/dev/js/b.js",
    ]);

    const caseInsensitiveMixedExtensionHost = new MockParseConfigHost(caseInsensitiveBasePath, /*useCaseSensitiveFileNames*/ false, [
        "c:/dev/a.ts",
        "c:/dev/a.d.ts",
        "c:/dev/a.js",
        "c:/dev/b.tsx",
        "c:/dev/b.d.ts",
        "c:/dev/b.jsx",
        "c:/dev/c.tsx",
        "c:/dev/c.js",
        "c:/dev/d.js",
        "c:/dev/e.jsx",
        "c:/dev/f.other"
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
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
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
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
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
            it("include paths outside of the project", () => {
                const includeSpecs = ["*", "c:/ext/*"];
                const expected: ts.ExpandResult = {
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts",
                        "c:/dev/c.d.ts",
                        "c:/ext/ext.ts",
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.None,
                        "c:/ext": ts.WatchDirectoryFlags.None
                    }
                };
                const actual = ts.expandFiles(/*fileNames*/ undefined, includeSpecs, /*excludeSpecs*/ undefined, caseInsensitiveBasePath, {}, caseInsensitiveHost);
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
}