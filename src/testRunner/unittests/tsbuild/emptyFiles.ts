import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";

describe("unittests:: tsbuild - empty files option in tsconfig", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = ts.loadProjectFromDisk("tests/projects/empty-files");
    });
    after(() => {
        projFs = undefined!;
    });

    ts.verifyTsc({
        scenario: "emptyFiles",
        subScenario: "has empty files diagnostic when files is empty and no references are provided",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/no-references"],
    });

    ts.verifyTsc({
        scenario: "emptyFiles",
        subScenario: "does not have empty files diagnostic when files is empty and references are provided",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/with-references"],
    });
});
