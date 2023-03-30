
import { Baseline } from "../_namespaces/Harness";
import * as ts from "../_namespaces/ts";
describe("unittests:: canWatch::", () => {
    it("canWatchDirectoryOrFile", () => {
        const baseline: string[] = [];
        getRoots().forEach(root => {
            baseline.push(`## Testing for root: ${root}`);
            const { paths, longestPathLength } = getPathsAtRoot(root);
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