import { Baseline } from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";
describe("unittests:: canWatch::", () => {
    baselineCanWatch(
        "canWatchDirectoryOrFile",
        () => `Determines if given directory or file can be watched`,
        (paths, longestPathLength, baseline) => {
            const testType = "canWatchDirectoryOrFile";
            const maxLengths = [longestPathLength + "/package.json".length, testType.length] as const;
            pushHeader(baseline, ["Directory", testType], maxLengths);
            paths.forEach(path => baselineCanWatchDirectoryOrFile(path, maxLengths));
            pushHeader(baseline, ["File", testType], maxLengths);
            paths.forEach(path => baselineCanWatchDirectoryOrFile(combinePaths(path, "package.json"), maxLengths));
            baseline.push("", "");
            function baselineCanWatchDirectoryOrFile(path: ts.Path, maxLengths: readonly number[]) {
                pushRow(baseline, [path, `${ts.canWatchDirectoryOrFilePath(path)}`], maxLengths);
            }
        },
    );

    baselineCanWatch(
        "canWatchAtTypes",
        () => `Determines if given node_modules/@types can be watched.\r\nThese are the typeRoots calculated because user didnt specify typeRoots in compierOptions`,
        (paths, longestPathLength, baseline) => {
            const testType = "canWatchAtTypes";
            const maxLengths = [longestPathLength + "/node_modules/@types".length, testType.length] as const;
            pushHeader(baseline, ["Directory", testType], maxLengths);
            paths.forEach(path => {
                path = combinePaths(path, "node_modules/@types");
                pushRow(baseline, [path, `${ts.canWatchAtTypes(path)}`], maxLengths);
            });
            baseline.push("", "");
        },
    );

    baselineCanWatch(
        "canWatchAffectingLocation",
        () => `Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.`,
        (paths, longestPathLength, baseline) => {
            const testType = "canWatchAffectingLocation";
            const maxLengths = [longestPathLength + "/package.json".length, testType.length] as const;
            pushHeader(baseline, ["File", testType], maxLengths);
            paths.forEach(path => {
                path = combinePaths(path, "package.json");
                pushRow(baseline, [path, `${ts.canWatchAffectingLocation(path)}`], maxLengths);
            });
            baseline.push("", "");
        },
    );

    baselineGetDirectoryToWatchOfFailedLookup("getDirectoryToWatchFailedLookupLocationNodeModules", "node_modules");
    baselineGetDirectoryToWatchOfFailedLookup("getDirectoryToWatchFailedLookupLocationAtTypes", "node_modules/@types");
    baselineGetDirectoryToWatchOfFailedLookup("getDirectoryToWatchFailedLookupLocation", "");
    function baselineGetDirectoryToWatchOfFailedLookup(
        scenario: string,
        forPath: "node_modules" | "node_modules/@types" | "",
    ) {
        [undefined, true].forEach(preferNonRecursiveWatch => {
            ["file", "dir", "subDir"].forEach(type => {
                baselineCanWatch(
                    `${scenario}In${type}${preferNonRecursiveWatch ? "NonRecursive" : ""}`,
                    () => `Determines whether to watch given failed lookup location (file that didnt exist) when resolving module.\r\nIt also determines the directory to watch and whether to watch it recursively or not.`,
                    (paths, longestPathLength, baseline) => {
                        const recursive = "Recursive";
                        const maxLength = longestPathLength + ts.combinePaths(forPath, "dir/subdir/somefile.d.ts").length;
                        const maxLengths = [maxLength, maxLength, recursive.length, maxLength] as const;
                        baselineCanWatchForRoot(paths, baseline, (rootPathCompoments, root, isRootWatchable) => {
                            pushHeader(baseline, ["Location", "getDirectoryToWatchFailedLookupLocation", recursive, "Location if not symlink"], maxLengths);
                            paths.forEach(path => {
                                let subPath;
                                switch (type) {
                                    case "file":
                                        subPath = "somefile.d.ts";
                                        break;
                                    case "dir":
                                        subPath = "dir/somefile.d.ts";
                                        break;
                                    case "subDir":
                                        subPath = "dir/subdir/somefile.d.ts";
                                        break;
                                }
                                const testPath = combinePaths(path, forPath, subPath);
                                const result = ts.getDirectoryToWatchFailedLookupLocation(
                                    testPath,
                                    testPath,
                                    root,
                                    root,
                                    rootPathCompoments,
                                    isRootWatchable,
                                    ts.returnUndefined,
                                    preferNonRecursiveWatch,
                                );
                                pushRow(baseline, [testPath, result ? result.packageDir ?? result.dir : "", result ? `${!result.nonRecursive}` : "", result?.packageDir ? result.dir : ""], maxLengths);
                            });
                        });
                    },
                );
            });
        });
    }

    [undefined, true].forEach(preferNonRecursiveWatch => {
        baselineCanWatch(
            `getDirectoryToWatchFailedLookupLocationFromTypeRoot${preferNonRecursiveWatch ? "NonRecursive" : ""}`,
            () => `When watched typeRoot handler is invoked, this method determines the directory for which the failedLookupLocation would need to be invalidated.\r\nSince this is invoked only when watching default typeRoot and is used to handle flaky directory watchers, this is used as a fail safe where if failed lookup starts with returned directory we will invalidate that resolution.`,
            (paths, longestPathLength, baseline) => {
                const maxLength = longestPathLength + "/node_modules/@types".length;
                const maxLengths = [maxLength, maxLength] as const;
                baselineCanWatchForRoot(paths, baseline, (rootPathCompoments, root, isRootWatchable) => {
                    pushHeader(baseline, ["Directory", "getDirectoryToWatchFailedLookupLocationFromTypeRoot"], maxLengths);
                    paths.forEach(path => {
                        path = combinePaths(path, "node_modules/@types");
                        // This is invoked only on paths that are watched
                        if (!ts.canWatchAtTypes(path)) return;
                        const result = ts.getDirectoryToWatchFailedLookupLocationFromTypeRoot(
                            path,
                            path,
                            root,
                            rootPathCompoments,
                            isRootWatchable,
                            ts.returnUndefined,
                            preferNonRecursiveWatch,
                            ts.returnTrue,
                        );
                        pushRow(baseline, [path, result !== undefined ? result : ""], maxLengths);
                    });
                });
            },
        );
    });

    function baselineCanWatchForRoot(
        paths: readonly ts.Path[],
        baseline: string[],
        baselineForRoot: (
            rootPathCompoments: Readonly<ts.PathPathComponents>,
            root: ts.Path,
            isRootWatchable: boolean,
        ) => void,
    ) {
        paths.forEach(rootDirForResolution => {
            const root = ts.getRootDirectoryOfResolutionCache(rootDirForResolution, ts.returnUndefined) as ts.Path;
            assert(root === rootDirForResolution);
            baseline.push("", `## RootDirForResolution: ${rootDirForResolution}`);
            const rootPathCompoments = ts.getPathComponents(root);
            baselineForRoot(rootPathCompoments, root, ts.canWatchDirectoryOrFile(rootPathCompoments));
        });
        baseline.push("", "");
    }

    function baselineCanWatch(
        scenario: string,
        info: () => string,
        baselineOsRoot: (paths: readonly ts.Path[], longestPathLength: number, baseline: string[]) => void,
    ) {
        it(`${scenario}Posix`, () => {
            baselineCanWatchForOsRoot(scenario, "Posix", "/", info, baselineOsRoot);
        });
        it(`${scenario}Dos`, () => {
            baselineCanWatchForOsRoot(scenario, "Dos", "c:/", info, baselineOsRoot);
        });
        it(`${scenario}Unc`, () => {
            baselineCanWatchForOsRoot(scenario, "Unc", "//vda1cs4850/", info, baselineOsRoot);
        });
        it(`${scenario}UncDos`, () => {
            baselineCanWatchForOsRoot(scenario, "UncDos", "//vda1cs4850/c$", info, baselineOsRoot);
        });
    }

    function baselineCanWatchForOsRoot(
        scenario: string,
        suffix: string,
        osRoot: string,
        info: () => string,
        baselineOsRoot: (paths: readonly ts.Path[], longestPathLength: number, baseline: string[]) => void,
    ) {
        const baseline: string[] = [`# ${scenario}`, "", info(), ""];
        baseline.push(`## Testing for ${suffix} root: ${osRoot}`);
        const paths: ts.Path[] = [];
        let longestPathLength = 0;
        getPathsOfDifferentFoldersAt(osRoot as ts.Path);
        getPathsOfDifferentFoldersWithUsers("users");
        getPathsOfDifferentFoldersWithUsers("user");
        getPathsOfDifferentFoldersWithUsers("usr");
        getPathsOfDifferentFoldersWithUsers("home");
        getPathsOfDifferentFoldersWithWorkspaces();
        baselineOsRoot(paths, longestPathLength, baseline);
        Baseline.runBaseline(`canWatch/${scenario}${suffix}.baseline.md`, baseline.join("\r\n"));
        function getPathsOfDifferentFoldersAt(root: ts.Path) {
            paths.push(root);
            root = combinePaths(root, "folderAtRoot");
            paths.push(root);
            for (let i = 0; i < 5; i++) {
                root = combinePaths(root, `folder${i + 1}`);
                paths.push(root);
            }
            longestPathLength = Math.max(ts.last(paths).length, longestPathLength);
        }
        function getPathsOfDifferentFoldersWithUsers(usersType: string) {
            const users = combinePaths(osRoot, usersType);
            paths.push(users);
            getPathsOfDifferentFoldersAt(combinePaths(users, "username"));
        }
        function getPathsOfDifferentFoldersWithWorkspaces() {
            getPathsOfDifferentFoldersAt(combinePaths(osRoot, "workspaces"));
        }
    }

    function combinePaths(path: string, addition: string, anotherAddition?: string): ts.Path {
        return ts.combinePaths(path, addition, anotherAddition) as ts.Path;
    }

    function pushHeader(baseline: string[], headers: string[], maxLengths: readonly number[]) {
        baseline.push("");
        pushRow(baseline, headers, maxLengths, /*addDivider*/ true);
    }

    function pushRow(baseline: string[], columns: string[], maxLengths: readonly number[], addDivider?: boolean) {
        let result = "|";
        let divider = addDivider ? "|" : undefined;
        columns.forEach((header, index) => {
            result += " " + header.padEnd(maxLengths[index]) + " |";
            if (addDivider) divider += " " + "-".repeat(maxLengths[index]) + " |";
        });
        baseline.push(result);
        if (divider) baseline.push(divider);
    }
});
