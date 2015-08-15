/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    describe('convertToBase64', () => {
        function runTest(input: string): void {
            var actual = ts.convertToBase64(input);
            var expected = new Buffer(input).toString("base64");
            assert.equal(actual, expected, "Encoded string using convertToBase64 does not match buffer.toString('base64')");
        }

        it("Converts ASCII charaters correctly", () => {
            runTest(" !\"#$ %&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~");
        });

        it("Converts escape sequences correctly", () => {
            runTest("\t\n\r\\\"\'\u0062");
        });

        it("Converts simple unicode characters correctly", () => {
            runTest("ΠΣ ٵپ औठ ⺐⺠");
        });

        it("Converts simple code snippet correctly", () => {
            runTest(`/// <reference path="file.ts" /> 
var x: string = "string";
console.log(x);`);
        });

        it("Converts simple code snippet with unicode characters correctly", () => {
            runTest(`var Π = 3.1415; console.log(Π);`);
        });
    });
}
