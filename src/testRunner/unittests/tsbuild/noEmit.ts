import {
    forEachNoEmitChanges,
    forEachNoEmitDtsChanges,
    forEachNoEmitTsc,
} from "../helpers/noEmit.js";

describe("unittests:: tsbuild:: noEmit::", () => {
    forEachNoEmitChanges(["-b", "-v"]);

    forEachNoEmitTsc(["--b", "--v"]);

    forEachNoEmitDtsChanges(["-b", "--v"]);
});
