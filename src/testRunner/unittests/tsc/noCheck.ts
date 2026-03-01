import { forEachTscScenarioWithNoCheck } from "../helpers/noCheck.js";

describe("unittests:: tsc:: noCheck::", () => {
    forEachTscScenarioWithNoCheck("-p");
});
