
import { Baseline } from "../_namespaces/Harness";
import * as ts from "../_namespaces/ts";
describe("unittests:: canWatch::", () => {
    baselineCanWatch(
        "canWatchDirectoryOrFile",
        () => `Determines if given directory or file can be watched`,
        ({ paths, longestPathLength }, baseline) => {
            const testType = "canWatchDirectoryOrFile";
            const maxLengths = [longestPathLength + "/package.json".length, testType.length] as const;
            pushHeader(baseline, ["Directory", testType], maxLengths);
            paths.forEach(path => baselineCanWatchDirectoryOrFile(path, maxLengths));
            pushHeader(baseline, ["File", testType], maxLengths);
            paths.forEach(path => baselineCanWatchDirectoryOrFile(`${ts.ensureTrailingDirectorySeparator(path)}package.json`, maxLengths));
            baseline.push("", "");
            function baselineCanWatchDirectoryOrFile(path: string, maxLengths: readonly number[]) {
                pushRow(baseline, [path, `${ts.canWatchDirectoryOrFile(path as ts.Path)}`], maxLengths);
            }
        },
    );

    baselineCanWatch(
        "canWatchAtTypes",
        () => `Determines if given node_modules/@types can be watched.\r\nThese are the typeRoots calculated because user didnt specify typeRoots in compierOptions`,
        ({ paths, longestPathLength }, baseline) => {
            const testType = "canWatchAtTypes";
            const maxLengths = [longestPathLength + "/node_modules/@types".length, testType.length] as const;
            baselineCanWatchForRoot(paths, baseline, baselineForRoot);
            function baselineForRoot(root: string | undefined) {
                pushHeader(baseline, ["Directory", testType], maxLengths);
                paths.forEach(path => baselineCanWatchAtTypes(ts.combinePaths(path, "node_modules/@types"), root, maxLengths));
            }
            function baselineCanWatchAtTypes(path: string, root: string | undefined, maxLengths: readonly number[]) {
                pushRow(baseline, [path, `${ts.canWatchAtTypes(path as ts.Path, root as ts.Path | undefined)}`], maxLengths);
            }
        },
    );

    baselineCanWatch(
        "canWatchAffectingLocation",
        () => `Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.`,
        ({ paths, longestPathLength }, baseline) => {
            const testType = "canWatchAffectingLocation";
            const maxLengths = [longestPathLength + "/package.json".length, testType.length] as const;
            pushHeader(baseline, ["File", testType], maxLengths);
            paths.forEach(path => baselineCanWatchAffectingLocation(`${ts.combinePaths(path, "package.json")}`, maxLengths));
            baseline.push("", "");
            function baselineCanWatchAffectingLocation(path: string, maxLengths: readonly number[]) {
                pushRow(baseline, [path, `${ts.canWatchAffectingLocation(path as ts.Path,)}`], maxLengths);
            }
        },
    );

    baselineCanWatch(
        "getDirectoryToWatchFailedLookupLocation",
        () => `Determines whether to watch given failed lookup location (file that didnt exist) when resolving module.\r\nIt also determines the directory to watch and whether to watch it recursively or not.`,
        ({ paths, longestPathLength }, baseline) => {
            const recursive = "Recursive";
            const maxLength = longestPathLength + "/node_modules/@types/dir/subdir/somefile.d.ts".length;
            const maxLengths = [maxLength, maxLength, recursive.length] as const;
            baselineCanWatchForRoot(paths, baseline, baselineForRoot);
            function baselineForRoot(root: string | undefined) {
                pushHeader(baseline, ["Location", "getDirectoryToWatchFailedLookupLocation", recursive], maxLengths);
                paths.forEach(path => {
                    baselineGetDirectoryToWatchFailedLookupLocation(ts.combinePaths(path, "node_modules/dir/somefile.d.ts"), root, maxLengths);
                    baselineGetDirectoryToWatchFailedLookupLocation(ts.combinePaths(path, "node_modules/@types/dir/somefile.d.ts"), root, maxLengths);
                    baselineGetDirectoryToWatchFailedLookupLocation(ts.combinePaths(path, "node_modules/dir/subdir/somefile.d.ts"), root, maxLengths);
                    baselineGetDirectoryToWatchFailedLookupLocation(ts.combinePaths(path, "node_modules/@types/dir/subdir/somefile.d.ts"), root, maxLengths);
                    baselineGetDirectoryToWatchFailedLookupLocation(ts.combinePaths(path, "node_modules/somefile.d.ts"), root, maxLengths);
                    baselineGetDirectoryToWatchFailedLookupLocation(ts.combinePaths(path, "node_modules/@types/somefile.d.ts"), root, maxLengths);
                    baselineGetDirectoryToWatchFailedLookupLocation(ts.combinePaths(path, "somefile.d.ts"), root, maxLengths);
                    baselineGetDirectoryToWatchFailedLookupLocation(ts.combinePaths(path, "dir/somefile.d.ts"), root, maxLengths);
                    baselineGetDirectoryToWatchFailedLookupLocation(ts.combinePaths(path, "dir/subdir/somefile.d.ts"), root, maxLengths);
                });
            }
            function baselineGetDirectoryToWatchFailedLookupLocation(path: string, root: string | undefined, maxLengths: readonly number[]) {
                const result = ts.getDirectoryToWatchFailedLookupLocation(
                    path,
                    path as ts.Path,
                    root,
                    root as ts.Path | undefined,
                    root !== undefined ? root.split(ts.directorySeparator).length : 0,
                    ts.returnUndefined,
                );
                pushRow(baseline, [path, result ? result.dir : "", result ? `${!result.nonRecursive}` : ""], maxLengths);
            }
        },
    );

    baselineCanWatch(
        "getDirectoryToWatchFailedLookupLocationFromTypeRoot",
        () => `When watched typeRoot handler is invoked, this method determines the directory for which the failedLookupLocation would need to be invalidated.\r\nSince this is invoked only when watching default typeRoot and is used to handle flaky directory watchers, this is used as a fail safe where if failed lookup starts with returned directory we will invalidate that resolution.`,
        ({ paths, longestPathLength }, baseline) => {
            const maxLength = longestPathLength + "/node_modules/@types".length;
            const maxLengths = [maxLength, maxLength] as const;
            baselineCanWatchForRoot(paths, baseline, baselineForRoot);
            function baselineForRoot(root: string | undefined) {
                pushHeader(baseline, ["Directory", "getDirectoryToWatchFailedLookupLocationFromTypeRoot"], maxLengths);
                paths.forEach(path => baselineGetDirectoryToWatchFailedLookupLocationFromTypeRoot(ts.combinePaths(path, "node_modules/@types"), root, maxLengths));
            }
            function baselineGetDirectoryToWatchFailedLookupLocationFromTypeRoot(path: string, root: string | undefined, maxLengths: readonly number[]) {
                // This is invoked only on paths that are watched
                if (!ts.canWatchAtTypes(path as ts.Path, root as ts.Path | undefined)) return;
                const result = ts.getDirectoryToWatchFailedLookupLocationFromTypeRoot(
                    path,
                    path as ts.Path,
                    root as ts.Path | undefined,
                    ts.returnTrue,
                );
                pushRow(baseline, [path, result !== undefined ? result : ""], maxLengths);
            }
        },
    );

    function baselineCanWatchForRoot(paths: string[], baseline: string[], baselineForRoot: (root: string | undefined) => void) {
        paths.forEach(baselineRoot);
        baselineRoot(/*rootDirForResolution*/ undefined);
        baseline.push("", "");

        function baselineRoot(rootDirForResolution: string | undefined) {
            const root = ts.getRootDirectoryOfResolutionCache(rootDirForResolution, ts.returnUndefined);
            baseline.push("", `## RootDirForResolution: ${rootDirForResolution}`, "", `Root: ${root}`);
            baselineForRoot(root);
        }
    }

    function baselineCanWatch(scenario: string, info: () => string, baselineOsRoot: (pathsAtRoot: PathAndLongPathLength, baseline: string[]) => void) {
        it(`${scenario}Unix`, () => {
            baselineCanWatchForOsRoot(scenario, "Unix", "/", info, baselineOsRoot);
        });
        it(`${scenario}Windows`, () => {
            baselineCanWatchForOsRoot(scenario, "Windows", "c:/", info, baselineOsRoot);
        });
        it(`${scenario}Network`, () => {
            baselineCanWatchForOsRoot(scenario, "Network", "//vda1cs4850/", info, baselineOsRoot);
        });
        it(`${scenario}NetworkWindows`, () => {
            baselineCanWatchForOsRoot(scenario, "NetworkWindows", "//vda1cs4850/c$", info, baselineOsRoot);
        });
    }

    function baselineCanWatchForOsRoot(
        scenario: string,
        suffix: string,
        osRoot: string,
        info: () => string,
        baselineOsRoot: (pathsAtRoot: PathAndLongPathLength, baseline: string[]) => void,
    ) {
        const baseline: string[] = [`# ${scenario}`, "", info(), ""];
        baseline.push(`## Testing for root: ${osRoot}`);
        baselineOsRoot(getPathsAtRoot(osRoot), baseline);
        Baseline.runBaseline(`canWatch/${scenario}${suffix}.baseline.md`, baseline.join("\r\n"));
    }

    function pushHeader(baseline: string[], headers: string[], maxLengths: readonly number[]) {
        baseline.push("");
        pushRow(baseline, headers, maxLengths, /*addDivider*/ true);
    }

    function pushRow(baseline: string[], columns: string[], maxLengths: readonly number[], addDivider?: boolean) {
        let result = "|";
        let divider = addDivider ? "|" : undefined;
        columns.forEach((header, index) => {
            result += " " + ts.padRight(header, maxLengths[index]) + " |";
            if (addDivider) divider += " " + "-".repeat(maxLengths[index]) + " |";
        });
        baseline.push(result);
        if (divider) baseline.push(divider);
    }


    interface PathAndLongPathLength {
        paths: string[];
        longestPathLength: number;
    }
    function getPathsAtRoot(root: string) {
        const result: PathAndLongPathLength = { paths: [], longestPathLength: 0 };
        getPathsOfDifferentFoldersAt(root);
        root = ts.ensureTrailingDirectorySeparator(root);
        result.paths.push(`${root}users`);
        getPathsOfDifferentFoldersAt(`${root}users/username`);
        result.paths.push(`${root}user`);
        getPathsOfDifferentFoldersAt(`${root}user/username`);
        return result;
        function getPathsOfDifferentFoldersAt(root: string) {
            result.paths.push(root);
            root = ts.ensureTrailingDirectorySeparator(root);
            result.paths.push(`${root}folderAtRoot`);
            result.paths.push(`${root}folderAtRoot/folder1`);
            result.paths.push(`${root}folderAtRoot/folder1/folder2`);
            result.paths.push(`${root}folderAtRoot/folder1/folder2/folder3`);
            result.paths.push(`${root}folderAtRoot/folder1/folder2/folder3/folder4`);
            result.paths.push(`${root}folderAtRoot/folder1/folder2/folder3/folder4/folder5`);
            result.longestPathLength = Math.max(ts.last(result.paths).length, result.longestPathLength);
        }
    }
});