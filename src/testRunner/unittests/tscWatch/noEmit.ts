import { forEachNoEmitTscWatch } from "../helpers/noEmit.js";

describe("unittests:: tsc-watch:: noEmit::", () => {
    forEachNoEmitTscWatch(["-p"]);
});
