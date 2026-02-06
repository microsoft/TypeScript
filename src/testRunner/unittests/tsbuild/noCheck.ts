import { forEachTscScenarioWithNoCheck } from "../helpers/noCheck.js";

describe("unittests:: tsbuild:: noCheck::", () => {
    forEachTscScenarioWithNoCheck("-b");
});
