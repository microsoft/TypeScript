namespace ts {
    describe("unittests:: tsc:: persistResolutions::", () => {
        verifyTscPersistsResolutions("--p");
        verifyTscPersistsResolutions("--p", "outFile.js");
    });
}