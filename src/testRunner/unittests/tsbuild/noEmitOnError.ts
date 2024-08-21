import { forEachNoEmitOnErrorScenarioTsc } from "../helpers/noEmitOnError.js";

describe("unittests:: tsbuild - with noEmitOnError::", () => {
    forEachNoEmitOnErrorScenarioTsc(["--b", "--verbose"]);
});
