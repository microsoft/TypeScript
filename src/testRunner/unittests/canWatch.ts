
import { Baseline } from "../_namespaces/Harness";
import * as ts from "../_namespaces/ts";
describe("unittests:: canWatch::", () => {
    it("canWatchDirectoryOrFile", () => {
        const baseline: string[] = [];
        getRoots().forEach(osRoot => {
            baseline.push(`## Testing for root: ${osRoot}`);
            const { paths, longestPathLength } = getPathsAtRoot(osRoot);
            const testType = "canWatchDirectoryOrFile";
            const maxLengths = [longestPathLength + "/package.json".length, testType.length] as const;
            pushHeader(baseline, ["Directory", testType], maxLengths);
            paths.forEach(path => baselineCanWatchDirectoryOrFile(path, maxLengths));
            pushHeader(baseline, ["File", testType], maxLengths);
            paths.forEach(path => baselineCanWatchDirectoryOrFile(`${ts.ensureTrailingDirectorySeparator(path)}package.json`, maxLengths));
            baseline.push("", "");
        });

        Baseline.runBaseline(`canWatch/canWatchDirectoryOrFile.baseline.md`, baseline.join("\r\n"));

        function baselineCanWatchDirectoryOrFile(path: string, maxLengths: readonly number[]) {
            pushRow(baseline, [path, `${ts.canWatchDirectoryOrFile(path as ts.Path)}`], maxLengths);
        }
    });

    it("canWatchAtTypes", () => {
        const baseline: string[] = [];
        getRoots().forEach(osRoot => {
            baseline.push(`## Testing for root: ${osRoot}`);
            const { paths, longestPathLength } = getPathsAtRoot(osRoot);
            const testType = "canWatchAtTypes";
            const maxLengths = [longestPathLength + "/node_modules/@types".length, testType.length] as const;
            paths.forEach(baselineForRoot);
            baselineForRoot(/*root*/ undefined);
            baseline.push("", "");
            function baselineForRoot(root: string | undefined) {
                baseline.push("", `## Root path: ${root}`);
                pushHeader(baseline, ["Directory", testType], maxLengths);
                paths.forEach(path => baselineCanWatchAtTypes(ts.combinePaths(path, "node_modules/@types"), root, maxLengths));
            }
        });

        Baseline.runBaseline(`canWatch/canWatchAtTypes.baseline.md`, baseline.join("\r\n"));

        function baselineCanWatchAtTypes(path: string, root: string | undefined, maxLengths: readonly number[]) {
            pushRow(baseline, [path, `${ts.canWatchAtTypes(path as ts.Path, root as ts.Path | undefined)}`], maxLengths);
        }
    });

    it("canWatchAffectingLocation", () => {
        const baseline: string[] = [];
        getRoots().forEach(osRoot => {
            baseline.push(`## Testing for root: ${osRoot}`);
            const { paths, longestPathLength } = getPathsAtRoot(osRoot);
            const testType = "canWatchAffectingLocation";
            const maxLengths = [longestPathLength + "/package.json".length, testType.length] as const;
            pushHeader(baseline, ["File", testType], maxLengths);
            paths.forEach(path => baselineCanWatchAffectingLocation(`${ts.combinePaths(path, "package.json")}`, maxLengths));
            baseline.push("", "");
        });

        Baseline.runBaseline(`canWatch/canWatchAffectingLocation.baseline.md`, baseline.join("\r\n"));

        function baselineCanWatchAffectingLocation(path: string, maxLengths: readonly number[]) {
            pushRow(baseline, [path, `${ts.canWatchAffectingLocation(path as ts.Path,)}`], maxLengths);
        }
    });

    it("getDirectoryToWatchFailedLookupLocation", () => {
        const baseline: string[] = [];
        getRoots().forEach(osRoot => {
            baseline.push(`## Testing for root: ${osRoot}`);
            const { paths, longestPathLength } = getPathsAtRoot(osRoot);
            const recursive = "Recursive";
            const maxLength = longestPathLength + "/node_modules/@types/dir/subdir/somefile.d.ts".length;
            const maxLengths = [maxLength, maxLength, recursive.length] as const;
            paths.forEach(baselineForRoot);
            baselineForRoot(/*root*/ undefined);
            baseline.push("", "");
            function baselineForRoot(root: string | undefined) {
                baseline.push("", `## Root path: ${root}`);
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
        });

        Baseline.runBaseline(`canWatch/getDirectoryToWatchFailedLookupLocation.baseline.md`, baseline.join("\r\n"));

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
    });

    it("getDirectoryToWatchFailedLookupLocationFromTypeRoot", () => {
        const baseline: string[] = [];
        getRoots().forEach(osRoot => {
            baseline.push(`## Testing for root: ${osRoot}`);
            const { paths, longestPathLength } = getPathsAtRoot(osRoot);
            const maxLength = longestPathLength + "/node_modules/@types".length;
            const maxLengths = [maxLength, maxLength] as const;
            paths.forEach(baselineForRoot);
            baselineForRoot(/*root*/ undefined);
            baseline.push("", "");
            function baselineForRoot(root: string | undefined) {
                baseline.push("", `## Root path: ${root}`);
                pushHeader(baseline, ["Directory", "getDirectoryToWatchFailedLookupLocationFromTypeRoot"], maxLengths);
                paths.forEach(path => baselineGetDirectoryToWatchFailedLookupLocationFromTypeRoot(ts.combinePaths(path, "node_modules/@types"), root, maxLengths));
            }
        });

        Baseline.runBaseline(`canWatch/getDirectoryToWatchFailedLookupLocationFromTypeRoot.baseline.md`, baseline.join("\r\n"));

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
    });

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

    function getRoots() {
        return ["/", "c:/", "//vda1cs4850/", "//vda1cs4850/c$"];
    }

    function getPathsAtRoot(root: string) {
        const result: { paths: string[], longestPathLength: number } = { paths: [], longestPathLength: 0 };
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