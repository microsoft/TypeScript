import * as vfs from "../../_namespaces/vfs";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromDisk,
} from "../helpers/vfs";

describe("unittests:: tsbuild - empty files option in tsconfig", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromDisk("tests/projects/empty-files");
    });
    after(() => {
        projFs = undefined!;
    });

    verifyTsc({
        scenario: "emptyFiles",
        subScenario: "has empty files diagnostic when files is empty and no references are provided",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/no-references"],
    });

    verifyTsc({
        scenario: "emptyFiles",
        subScenario: "does not have empty files diagnostic when files is empty and references are provided",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/with-references"],
    });
});
