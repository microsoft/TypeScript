import { forEachNoEmitOnErrorScenarioTscWatch } from "../helpers/noEmitOnError.js";

describe("unittests:: tsbuildWatch:: watchMode:: with noEmitOnError::", () => {
    forEachNoEmitOnErrorScenarioTscWatch(["-b", "-verbose"]);
});
