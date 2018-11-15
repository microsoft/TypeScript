namespace ts {
    describe("base64", () => {
        describe("base64decode", () => {
            it("can decode input strings correctly without needing a host implementation", () => {
                const tests = [
                    // "a",
                    // "this is a test",
                    // " !\"#$ %&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
                    "日本語",
                    "🐱",
                    "\x00\x01",
                    "\t\n\r\\\"\'\u0062",
                    "====",
                    "",
                ];
                for (const test of tests) {
                    assert.equal(base64decode({}, convertToBase64(test)), test);
                }
            });
        });
    });
}
