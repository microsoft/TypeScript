/// <reference path="..\harness.ts" />
/// <reference path="..\virtualFileSystem.ts" />

namespace ts {
    const caseInsensitiveBasePath = "c:/dev/";
    const caseInsensitiveTsconfigPath = "c:/dev/tsconfig.json";
    const caseInsensitiveHost = new Utils.MockParseConfigHost(caseInsensitiveBasePath, /*useCaseSensitiveFileNames*/ false, [
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
        "c:/dev/js/d.min.js",
        "c:/dev/js/ab.min.js",
        "c:/ext/ext.ts",
        "c:/ext/b/a..b.ts"
    ]);

    const caseSensitiveBasePath = "/dev/";
    const caseSensitiveHost = new Utils.MockParseConfigHost(caseSensitiveBasePath, /*useCaseSensitiveFileNames*/ true, [
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

    const caseInsensitiveMixedExtensionHost = new Utils.MockParseConfigHost(caseInsensitiveBasePath, /*useCaseSensitiveFileNames*/ false, [
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

    const caseInsensitiveCommonFoldersHost = new Utils.MockParseConfigHost(caseInsensitiveBasePath, /*useCaseSensitiveFileNames*/ false, [
        "c:/dev/a.ts",
        "c:/dev/a.d.ts",
        "c:/dev/a.js",
        "c:/dev/b.ts",
        "c:/dev/node_modules/a.ts",
        "c:/dev/bower_components/a.ts",
        "c:/dev/jspm_packages/a.ts"
    ]);

    const caseInsensitiveDottedFoldersHost = new Utils.MockParseConfigHost(caseInsensitiveBasePath, /*useCaseSensitiveFileNames*/ false, [
        "c:/dev/x/d.ts",
        "c:/dev/x/y/d.ts",
        "c:/dev/x/y/.e.ts",
        "c:/dev/x/.y/a.ts",
        "c:/dev/.z/.b.ts",
        "c:/dev/.z/c.ts",
        "c:/dev/w/.u/e.ts",
        "c:/dev/g.min.js/.g/g.ts"
    ]);

    function assertParsed(actual: ts.ParsedCommandLine, expected: ts.ParsedCommandLine): void {
        assert.deepEqual(actual.fileNames, expected.fileNames);
        assert.deepEqual(actual.wildcardDirectories, expected.wildcardDirectories);
        assert.deepEqual(actual.errors, expected.errors);
    }

    describe("matchFiles", () => {
        it("with defaults", () => {
            const json = {};
            const expected: ts.ParsedCommandLine = {
                options: {},
                errors: [],
                fileNames: [
                    "c:/dev/a.ts",
                    "c:/dev/b.ts"
                ],
                wildcardDirectories: {
                    "c:/dev": ts.WatchDirectoryFlags.Recursive
                },
            };
            const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveCommonFoldersHost, caseInsensitiveBasePath);
            assertParsed(actual, expected);
        });

        describe("with literal file list", () => {
            it("without exclusions", () => {
                const json = {
                    files: [
                        "a.ts",
                        "b.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("missing files are still present", () => {
                const json = {
                    files: [
                        "z.ts",
                        "x.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/z.ts",
                        "c:/dev/x.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("are not removed due to excludes", () => {
                const json = {
                    files: [
                        "a.ts",
                        "b.ts"
                    ],
                    exclude: [
                        "b.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
        });

        describe("with literal include list", () => {
            it("without exclusions", () => {
                const json = {
                    include: [
                        "a.ts",
                        "b.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with non .ts file extensions are excluded", () => {
                const json = {
                    include: [
                        "a.js",
                        "b.js"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [
                        ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                            caseInsensitiveTsconfigPath, JSON.stringify(json.include), "[]")
                    ],
                    fileNames: [],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                assertParsed(actual, expected);
            });
            it("with missing files are excluded", () => {
                const json = {
                    include: [
                        "z.ts",
                        "x.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [
                        ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                            caseInsensitiveTsconfigPath, JSON.stringify(json.include), "[]")
                    ],
                    fileNames: [],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                assertParsed(actual, expected);
            });
            it("with literal excludes", () => {
                const json = {
                    include: [
                        "a.ts",
                        "b.ts"
                    ],
                    exclude: [
                        "b.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with wildcard excludes", () => {
                const json = {
                    include: [
                        "a.ts",
                        "b.ts",
                        "z/a.ts",
                        "z/abz.ts",
                        "z/aba.ts",
                        "x/b.ts"
                    ],
                    exclude: [
                        "*.ts",
                        "z/??z.ts",
                        "*/b.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/z/a.ts",
                        "c:/dev/z/aba.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with recursive excludes", () => {
                const json = {
                    include: [
                        "a.ts",
                        "b.ts",
                        "x/a.ts",
                        "x/b.ts",
                        "x/y/a.ts",
                        "x/y/b.ts"
                    ],
                    exclude: [
                        "**/b.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/x/a.ts",
                        "c:/dev/x/y/a.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with case sensitive exclude", () => {
                const json = {
                    include: [
                        "B.ts"
                    ],
                    exclude: [
                        "**/b.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "/dev/B.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseSensitiveHost, caseSensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with common package folders and no exclusions", () => {
                const json = {
                    include: [
                        "a.ts",
                        "b.ts",
                        "node_modules/a.ts",
                        "bower_components/a.ts",
                        "jspm_packages/a.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts",
                        "c:/dev/node_modules/a.ts",
                        "c:/dev/bower_components/a.ts",
                        "c:/dev/jspm_packages/a.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveCommonFoldersHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with common package folders and exclusions", () => {
                const json = {
                    include: [
                        "a.ts",
                        "b.ts",
                        "node_modules/a.ts",
                        "bower_components/a.ts",
                        "jspm_packages/a.ts"
                    ],
                    exclude: [
                        "a.ts",
                        "b.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/node_modules/a.ts",
                        "c:/dev/bower_components/a.ts",
                        "c:/dev/jspm_packages/a.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveCommonFoldersHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with common package folders and empty exclude", () => {
                const json = {
                    include: [
                        "a.ts",
                        "b.ts",
                        "node_modules/a.ts",
                        "bower_components/a.ts",
                        "jspm_packages/a.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts",
                        "c:/dev/node_modules/a.ts",
                        "c:/dev/bower_components/a.ts",
                        "c:/dev/jspm_packages/a.ts"
                    ],
                    wildcardDirectories: {},
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveCommonFoldersHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
        });

        describe("with wildcard include list", () => {
            it("is sorted in include order, then in alphabetical order", () => {
                const json = {
                    include: [
                        "z/*.ts",
                        "x/*.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/z/a.ts",
                        "c:/dev/z/aba.ts",
                        "c:/dev/z/abz.ts",
                        "c:/dev/z/b.ts",
                        "c:/dev/z/bba.ts",
                        "c:/dev/z/bbz.ts",
                        "c:/dev/x/a.ts",
                        "c:/dev/x/aa.ts",
                        "c:/dev/x/b.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev/z": ts.WatchDirectoryFlags.None,
                        "c:/dev/x": ts.WatchDirectoryFlags.None
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });

            it("same named declarations are excluded", () => {
                const json = {
                    include: [
                        "*.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts",
                        "c:/dev/c.d.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.None
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("`*` matches only ts files", () => {
                const json = {
                    include: [
                        "*"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts",
                        "c:/dev/c.d.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.None
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("`?` matches only a single character", () => {
                const json = {
                    include: [
                        "x/?.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/x/a.ts",
                        "c:/dev/x/b.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev/x": ts.WatchDirectoryFlags.None
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with recursive directory", () => {
                const json = {
                    include: [
                        "**/a.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/x/a.ts",
                        "c:/dev/x/y/a.ts",
                        "c:/dev/z/a.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with multiple recursive directories", () => {
                const json = {
                    include: [
                        "x/y/**/a.ts",
                        "x/**/a.ts",
                        "z/**/a.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/x/y/a.ts",
                        "c:/dev/x/a.ts",
                        "c:/dev/z/a.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev/x": ts.WatchDirectoryFlags.Recursive,
                        "c:/dev/z": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("case sensitive", () => {
                const json = {
                    include: [
                        "**/A.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "/dev/A.ts"
                    ],
                    wildcardDirectories: {
                        "/dev": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseSensitiveHost, caseSensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with missing files are excluded", () => {
                const json = {
                    include: [
                        "*/z.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [
                        ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                            caseInsensitiveTsconfigPath, JSON.stringify(json.include), "[]")
                    ],
                    fileNames: [],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                assertParsed(actual, expected);
            });
            it("always include literal files", () => {
                const json = {
                    files: [
                        "a.ts"
                    ],
                    include: [
                        "*/z.ts"
                    ],
                    exclude: [
                        "**/a.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("exclude folders", () => {
                const json = {
                    include: [
                        "**/*"
                    ],
                    exclude: [
                        "z",
                        "x"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts",
                        "c:/dev/c.d.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with common package folders and no exclusions", () => {
                const json = {
                    include: [
                        "**/a.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/bower_components/a.ts",
                        "c:/dev/jspm_packages/a.ts",
                        "c:/dev/node_modules/a.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveCommonFoldersHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with common package folders and exclusions", () => {
                const json = {
                    include: [
                        "**/a.ts"
                    ],
                    exclude: [
                        "a.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/bower_components/a.ts",
                        "c:/dev/jspm_packages/a.ts",
                        "c:/dev/node_modules/a.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveCommonFoldersHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with common package folders and empty exclude", () => {
                const json = {
                    include: [
                        "**/a.ts"
                    ],
                    exclude: <string[]>[]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/bower_components/a.ts",
                        "c:/dev/jspm_packages/a.ts",
                        "c:/dev/node_modules/a.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.Recursive
                    },
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveCommonFoldersHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("exclude .js files when allowJs=false", () => {
                const json = {
                    compilerOptions: {
                        allowJs: false
                    },
                    include: [
                        "js/*"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        allowJs: false
                    },
                    errors: [
                        ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                            caseInsensitiveTsconfigPath, JSON.stringify(json.include), "[]")
                    ],
                    fileNames: [],
                    wildcardDirectories: {
                        "c:/dev/js": ts.WatchDirectoryFlags.None
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                assertParsed(actual, expected);
            });
            it("include .js files when allowJs=true", () => {
                const json = {
                    compilerOptions: {
                        allowJs: true
                    },
                    include: [
                        "js/*"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        allowJs: true
                    },
                    errors: [],
                    fileNames: [
                        "c:/dev/js/a.js",
                        "c:/dev/js/b.js"
                    ],
                    wildcardDirectories: {
                        "c:/dev/js": ts.WatchDirectoryFlags.None
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("include explicitly listed .min.js files when allowJs=true", () => {
                const json = {
                    compilerOptions: {
                        allowJs: true
                    },
                    include: [
                        "js/*.min.js"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        allowJs: true
                    },
                    errors: [],
                    fileNames: [
                        "c:/dev/js/ab.min.js",
                        "c:/dev/js/d.min.js"
                    ],
                    wildcardDirectories: {
                        "c:/dev/js": ts.WatchDirectoryFlags.None
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("include paths outside of the project", () => {
                const json = {
                    include: [
                        "*",
                        "c:/ext/*"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/a.ts",
                        "c:/dev/b.ts",
                        "c:/dev/c.d.ts",
                        "c:/ext/ext.ts"
                    ],
                    wildcardDirectories: {
                        "c:/dev": ts.WatchDirectoryFlags.None,
                        "c:/ext": ts.WatchDirectoryFlags.None
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("include paths outside of the project using relative paths", () => {
                const json = {
                    include: [
                        "*",
                        "../ext/*"
                    ],
                    exclude: [
                        "**"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/ext/ext.ts"
                    ],
                    wildcardDirectories: {
                        "c:/ext": ts.WatchDirectoryFlags.None
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("exclude paths outside of the project using relative paths", () => {
                const json = {
                    include: [
                        "c:/**/*"
                    ],
                    exclude: [
                        "../**"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [
                        ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                            caseInsensitiveTsconfigPath, JSON.stringify(json.include), JSON.stringify(json.exclude))]
                    ,
                    fileNames: [],
                    wildcardDirectories: {}
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                assertParsed(actual, expected);
            });
            it("include files with .. in their name", () => {
                const json = {
                    include: [
                        "c:/ext/b/a..b.ts"
                    ],
                    exclude: [
                        "**"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/ext/b/a..b.ts"
                    ],
                    wildcardDirectories: {}
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("exclude files with .. in their name", () => {
                const json = {
                    include: [
                        "c:/ext/**/*"
                    ],
                    exclude: [
                        "c:/ext/b/a..b.ts"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/ext/ext.ts",
                    ],
                    wildcardDirectories: {
                        "c:/ext": ts.WatchDirectoryFlags.Recursive
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            it("with jsx=none, allowJs=false", () => {
                const json = {
                    compilerOptions: {
                        allowJs: false
                    }
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        allowJs: false
                    },
                    errors: [],
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
                assertParsed(actual, expected);
            });
            it("with jsx=preserve, allowJs=false", () => {
                const json = {
                    compilerOptions: {
                        jsx: "preserve",
                        allowJs: false
                    }
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        jsx: ts.JsxEmit.Preserve,
                        allowJs: false
                    },
                    errors: [],
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
                assertParsed(actual, expected);
            });
            it("with jsx=react-native, allowJs=false", () => {
                const json = {
                    compilerOptions: {
                        jsx: "react-native",
                        allowJs: false
                    }
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        jsx: ts.JsxEmit.ReactNative,
                        allowJs: false
                    },
                    errors: [],
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
                assertParsed(actual, expected);
            });
            it("with jsx=none, allowJs=true", () => {
                const json = {
                    compilerOptions: {
                        allowJs: true
                    }
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        allowJs: true
                    },
                    errors: [],
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
                assertParsed(actual, expected);
            });
            it("with jsx=preserve, allowJs=true", () => {
                const json = {
                    compilerOptions: {
                        jsx: "preserve",
                        allowJs: true
                    }
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        jsx: ts.JsxEmit.Preserve,
                        allowJs: true
                    },
                    errors: [],
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
                assertParsed(actual, expected);
            });
            it("with jsx=react-native, allowJs=true", () => {
                const json = {
                    compilerOptions: {
                        jsx: "react-native",
                        allowJs: true
                    }
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        jsx: ts.JsxEmit.ReactNative,
                        allowJs: true
                    },
                    errors: [],
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
                assertParsed(actual, expected);
            });
            it("exclude .min.js files using wildcards", () => {
                const json = {
                    compilerOptions: {
                        allowJs: true
                    },
                    include: [
                        "js/*.min.js"
                    ],
                    exclude: [
                        "js/a*"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {
                        allowJs: true
                    },
                    errors: [],
                    fileNames: [
                        "c:/dev/js/d.min.js"
                    ],
                    wildcardDirectories: {
                        "c:/dev/js": ts.WatchDirectoryFlags.None
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            describe("with trailing recursive directory", () => {
                it("in includes", () => {
                    const json = {
                        include: [
                            "**"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [
                            ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, "**"),
                            ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                                caseInsensitiveTsconfigPath, JSON.stringify(json.include), "[]")
                        ],
                        fileNames: [],
                        wildcardDirectories: {}
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                    assertParsed(actual, expected);
                });
                it("in excludes", () => {
                    const json = {
                        include: [
                            "**/*"
                        ],
                        exclude: [
                            "**"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [
                            ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                                caseInsensitiveTsconfigPath, JSON.stringify(json.include), JSON.stringify(json.exclude))
                        ],
                        fileNames: [],
                        wildcardDirectories: {}
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                    assertParsed(actual, expected);
                });
            });
            describe("with multiple recursive directory patterns", () => {
                it("in includes", () => {
                    const json = {
                        include: [
                            "**/x/**/*"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [
                            ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, "**/x/**/*"),
                            ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                                caseInsensitiveTsconfigPath, JSON.stringify(json.include), "[]")
                        ],
                        fileNames: [],
                        wildcardDirectories: {}
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                    assertParsed(actual, expected);
                });
                it("in excludes", () => {
                    const json = {
                        include: [
                            "**/a.ts"
                        ],
                        exclude: [
                            "**/x/**"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [
                            ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, "**/x/**")
                        ],
                        fileNames: [
                            "c:/dev/a.ts",
                            "c:/dev/x/a.ts",
                            "c:/dev/x/y/a.ts",
                            "c:/dev/z/a.ts"
                        ],
                        wildcardDirectories: {
                            "c:/dev": ts.WatchDirectoryFlags.Recursive
                        }
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                    assertParsed(actual, expected);
                });
            });

            describe("with parent directory symbols after a recursive directory pattern", () => {
                it("in includes immediately after", () => {
                    const json = {
                        include: [
                            "**/../*"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [
                            ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, "**/../*"),
                            ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                                caseInsensitiveTsconfigPath, JSON.stringify(json.include), "[]")
                        ],
                        fileNames: [],
                        wildcardDirectories: {}
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                    assertParsed(actual, expected);
                });

                it("in includes after a subdirectory", () => {
                    const json = {
                        include: [
                            "**/y/../*"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [
                            ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, "**/y/../*"),
                            ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                                caseInsensitiveTsconfigPath, JSON.stringify(json.include), "[]")
                        ],
                        fileNames: [],
                        wildcardDirectories: {}
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                    assertParsed(actual, expected);
                });

                it("in excludes immediately after", () => {
                    const json = {
                        include: [
                            "**/a.ts"
                        ],
                        exclude: [
                            "**/.."
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [
                            ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, "**/..")
                        ],
                        fileNames: [
                            "c:/dev/a.ts",
                            "c:/dev/x/a.ts",
                            "c:/dev/x/y/a.ts",
                            "c:/dev/z/a.ts"
                        ],
                        wildcardDirectories: {
                            "c:/dev": ts.WatchDirectoryFlags.Recursive
                        }
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                    assertParsed(actual, expected);
                });

                it("in excludes after a subdirectory", () => {
                    const json = {
                        include: [
                            "**/a.ts"
                        ],
                        exclude: [
                            "**/y/.."
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [
                            ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, "**/y/..")
                        ],
                        fileNames: [
                            "c:/dev/a.ts",
                            "c:/dev/x/a.ts",
                            "c:/dev/x/y/a.ts",
                            "c:/dev/z/a.ts"
                        ],
                        wildcardDirectories: {
                            "c:/dev": ts.WatchDirectoryFlags.Recursive
                        }
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                    assertParsed(actual, expected);
                });
            });

            describe("with implicit globbification", () => {
                it("Expands 'z' to 'z/**/*'", () => {
                    const json = {
                        include: ["z"]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [],
                        fileNames: [ "a.ts", "aba.ts", "abz.ts", "b.ts", "bba.ts", "bbz.ts" ].map(x => `c:/dev/z/${x}`),
                        wildcardDirectories: {
                            "c:/dev/z": ts.WatchDirectoryFlags.Recursive
                        }
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveHost, caseInsensitiveBasePath);
                    assertParsed(actual, expected);
                });
            });
        });
        describe("with files or folders that begin with a .", () => {
            it("that are not explicitly included", () => {
                const json = {
                    include: [
                        "x/**/*",
                        "w/*/*"
                    ]
                };
                const expected: ts.ParsedCommandLine = {
                    options: {},
                    errors: [],
                    fileNames: [
                        "c:/dev/x/d.ts",
                        "c:/dev/x/y/d.ts",
                    ],
                    wildcardDirectories: {
                        "c:/dev/x": ts.WatchDirectoryFlags.Recursive,
                        "c:/dev/w": ts.WatchDirectoryFlags.Recursive
                    }
                };
                const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveDottedFoldersHost, caseInsensitiveBasePath);
                assertParsed(actual, expected);
            });
            describe("that are explicitly included", () => {
                it("without wildcards", () => {
                    const json = {
                        include: [
                            "x/.y/a.ts",
                            "c:/dev/.z/.b.ts"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [],
                        fileNames: [
                            "c:/dev/x/.y/a.ts",
                            "c:/dev/.z/.b.ts"
                        ],
                        wildcardDirectories: {}
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveDottedFoldersHost, caseInsensitiveBasePath);
                    assertParsed(actual, expected);
                });
                it("with recursive wildcards that match directories", () => {
                    const json = {
                        include: [
                            "**/.*/*"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [],
                        fileNames: [
                            "c:/dev/.z/c.ts",
                            "c:/dev/g.min.js/.g/g.ts",
                            "c:/dev/w/.u/e.ts",
                            "c:/dev/x/.y/a.ts"
                        ],
                        wildcardDirectories: {
                            "c:/dev": ts.WatchDirectoryFlags.Recursive
                        }
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveDottedFoldersHost, caseInsensitiveBasePath);
                    assertParsed(actual, expected);
                });
                it("with recursive wildcards that match nothing", () => {
                    const json = {
                        include: [
                            "x/**/.y/*",
                            ".z/**/.*"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [],
                        fileNames: [
                            "c:/dev/x/.y/a.ts",
                            "c:/dev/.z/.b.ts"
                        ],
                        wildcardDirectories: {
                            "c:/dev/.z": ts.WatchDirectoryFlags.Recursive,
                            "c:/dev/x": ts.WatchDirectoryFlags.Recursive
                        }
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveDottedFoldersHost, caseInsensitiveBasePath);
                    assertParsed(actual, expected);
                });
                it("with wildcard excludes that implicitly exclude dotted files", () => {
                    const json = {
                        include: [
                            "**/.*/*"
                        ],
                        exclude: [
                            "**/*"
                        ]
                    };
                    const expected: ts.ParsedCommandLine = {
                        options: {},
                        errors: [
                            ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
                                caseInsensitiveTsconfigPath, JSON.stringify(json.include), JSON.stringify(json.exclude))
                        ],
                        fileNames: [],
                        wildcardDirectories: {}
                    };
                    const actual = ts.parseJsonConfigFileContent(json, caseInsensitiveDottedFoldersHost, caseInsensitiveBasePath, /*existingOptions*/ undefined, caseInsensitiveTsconfigPath);
                    assertParsed(actual, expected);
                });
            });
        });
    });
}
