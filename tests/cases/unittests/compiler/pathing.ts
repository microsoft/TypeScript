///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

describe('Verifying pathing functions', function () {
    it("Normalizes Mac paths", function () {
        var result = TypeScript.normalizePath("/Users/Me/somefile.ts");
        var expected = "/Users/Me/somefile.ts";
        assert.equal(result, expected);
    });
    it("Normalizes relative Mac paths", function () {
        var result = TypeScript.normalizePath("/Users/./Me/../somefile.ts");
        var expected = "/Users/somefile.ts";
        assert.equal(result, expected);
    });
    it("Normalizes Windows paths", function () {
        var result = TypeScript.normalizePath("C:\\Users\\Me\\somefile.ts");
        var expected = "C:/Users/Me/somefile.ts";
        assert.equal(result, expected);
    });
    it("Normalizes relative Windows paths", function () {
        var result = TypeScript.normalizePath("C:\\Users\\.\\Me\\..\\somefile.ts");
        var expected = "C:/Users/somefile.ts";
        assert.equal(result, expected);
    });
    it("Normalizes . and ..", function () {
        var result = TypeScript.normalizePath("..\\Users\\.\\Me\\..\\somefile.ts");
        var expected = "../Users/somefile.ts";
        assert.equal(result, expected);
    });
    it("Normalizes UNC paths", function () {
        var result = TypeScript.normalizePath("\\\\server\\share\\someFile.ts");
        var expected = "file://server/share/someFile.ts";
        assert.equal(result, expected);
    });
    it("Normalizes relative UNC paths with IP addresses", function () {
        var result = TypeScript.normalizePath("\\\\127.0.0.1\\share\\..\\elsewhere\\someFile.ts");
        var expected = "file://127.0.0.1/elsewhere/someFile.ts";
        assert.equal(result, expected);
    });
    it("Normalizes HTTP paths", function () {
        var result = TypeScript.normalizePath("http://www.server.com/share/someFile.ts");
        var expected = "http://www.server.com/share/someFile.ts";
        assert.equal(result, expected);
    });
    it("Normalizes relative HTTP paths", function () {
        var result = TypeScript.normalizePath("http://www.server.com/share/../someFile.ts");
        var expected = "http://www.server.com/someFile.ts";
        assert.equal(result, expected);
    });
});