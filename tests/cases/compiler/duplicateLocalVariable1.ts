// @allowUnreachableCode: true
// @module: commonjs

//import FileManager = require('filemanager');
//import App = require('app');

declare var FileManager: any;
declare var App: any;

var TestFileDir = ".\\TempTestFiles";

export class TestCase {
    constructor (public name: string, public test: ()=>boolean, public errorMessageRegEx?: string) {
    }
}
export class TestRunner { 
    private tests: TestCase[] = [];

    static arrayCompare(arg1: any[], arg2: any[]): boolean {
        return (arg1.every(function (val, index) { return val === arg2[index] }));
    }

    public addTest(test: TestCase) {
        this.tests.push(test);
    }
    public run() {
        var success = true;
        for (var test in this.tests) {
            var exception = false;
            var testcase = <TestCase>this.tests[test]
            var testResult: boolean = false;
            try {
                testResult = testcase.test();
            }
            catch (e) {
                exception = true;
                testResult = false;
                if (typeof testcase.errorMessageRegEx === "string") {
                    if (testcase.errorMessageRegEx === "") { // Any error is fine
                        testResult = true;
                    } else if (e.message) {
                        var regex = new RegExp(testcase.errorMessageRegEx);
                        testResult = regex.test(e.message);
                    }
                } 
                if (testResult === false) {
                    //console.log(e.message);
                }
            }
            if ((testcase.errorMessageRegEx !== undefined) && !exception) {
                success = false;
            } else if (!testResult) {
                success = false;
            }
        }
        if (success) {
        } else {
        }
    }
}

export var tests: TestRunner = (function () {
    var testRunner = new TestRunner();
    // First 3 are for simple harness validation
    testRunner.addTest(new TestCase("Basic test", function () { return true; }));
    testRunner.addTest(new TestCase("Test for any error", function () { throw new Error(); return false; }, ""));
    testRunner.addTest(new TestCase("Test RegEx error message match", function () { throw new Error("Should also pass"); return false; }, "Should [also]+ pass"));
    testRunner.addTest(new TestCase("Test array compare true", function () { return TestRunner.arrayCompare([1, 2, 3], [1, 2, 3]); }));
    testRunner.addTest(new TestCase("Test array compare false", function () { return !TestRunner.arrayCompare([3, 2, 3], [1, 2, 3]); }));

    // File detection tests
    testRunner.addTest(new TestCase("Check file exists",
        function () {
            return FileManager.DirectoryManager.fileExists(TestFileDir + "\\Test.txt");
        }));
    testRunner.addTest(new TestCase("Check file doesn't exist",
        function () {
            return !FileManager.DirectoryManager.fileExists(TestFileDir + "\\Test2.txt");
        }));

    // File pattern matching tests
    testRunner.addTest(new TestCase("Check text file match",
        function () {
            return (FileManager.FileBuffer.isTextFile("C:\\somedir\\readme.txt") &&
                FileManager.FileBuffer.isTextFile("C:\\spaces path\\myapp.str") &&
                FileManager.FileBuffer.isTextFile("C:\\somedir\\code.js"))
        }));
    testRunner.addTest(new TestCase("Check makefile match",
        function () {
            return FileManager.FileBuffer.isTextFile("C:\\some dir\\makefile");
        }));
    testRunner.addTest(new TestCase("Check binary file doesn't match",
        function () {
            return (!FileManager.FileBuffer.isTextFile("C:\\somedir\\app.exe") &&
            !FileManager.FileBuffer.isTextFile("C:\\somedir\\my lib.dll"));
        }));

    // Command-line parameter tests
    testRunner.addTest(new TestCase("Check App defaults",
        function () {
            var app = new App.App([]);
            return (app.fixLines === false &&
                   app.recurse === true &&
                   app.lineEndings === "CRLF" &&
                   app.matchPattern === undefined &&
                   app.rootDirectory === ".\\" &&
                   app.encodings[0] === "ascii" &&
                   app.encodings[1] === "utf8nobom");
        }));
    testRunner.addTest(new TestCase("Check App params",
        function () {
            var app = new App.App(["-dir=C:\\test dir", "-lineEndings=LF", "-encodings=utf16be,ascii", "-recurse=false", "-fixlines"]);
            return (app.fixLines === true &&
                   app.lineEndings === "LF" &&
                   app.recurse === false &&
                   app.matchPattern === undefined &&
                   app.rootDirectory === "C:\\test dir" &&
                   app.encodings[0] === "utf16be" &&
                   app.encodings[1] === "ascii" &&
                   app.encodings.length === 2);
        }));

    // File BOM detection tests
    testRunner.addTest(new TestCase("Check encoding detection no BOM",
        function () {
            var fb = new FileManager.FileBuffer(TestFileDir + "\\noBOM.txt");
            return fb.bom === 'none' && fb.encoding === 'utf8';
        }));
    testRunner.addTest(new TestCase("Check encoding detection UTF8 BOM",
        function () {
            var fb = new FileManager.FileBuffer(TestFileDir + "\\UTF8BOM.txt");
            return fb.bom === 'utf8' && fb.encoding === 'utf8';
        }));
    testRunner.addTest(new TestCase("Check encoding detection UTF16be BOM",
        function () {
            var fb = new FileManager.FileBuffer(TestFileDir + "\\UTF16BE.txt");
            return fb.bom === 'utf16be' && fb.encoding === 'utf16be';
        }));
    testRunner.addTest(new TestCase("Check encoding detection UTF16le BOM",
        function () {
            var fb = new FileManager.FileBuffer(TestFileDir + "\\UTF16LE.txt");
            return fb.bom === 'utf16le' && fb.encoding === 'utf16le';
        }));
    testRunner.addTest(new TestCase("Check encoding on 1 bytes file",
        function () {
            var fb = new FileManager.FileBuffer(TestFileDir + "\\1bytefile.txt");
            return fb.bom === 'none' && fb.encoding === 'utf8';
        }));
    testRunner.addTest(new TestCase("Check encoding on 0 bytes file",
        function () {
            var fb = new FileManager.FileBuffer(TestFileDir + "\\0bytefile.txt");
            return fb.bom === 'none' && fb.encoding === 'utf8';
        }));

    // UTF8 encoding tests
    testRunner.addTest(new TestCase("Check byte reader",
        function () {
            var fb = new FileManager.FileBuffer(TestFileDir + "\\UTF8BOM.txt");
            var chars = [];
            for (var i = 0; i < 11; i++) {
                chars.push(fb.readByte());
            }
            return TestRunner.arrayCompare(chars, [0x54, 0xC3, 0xA8, 0xE1, 0xB4, 0xA3, 0xE2, 0x80, 0xA0, 0x0D, 0x0A]);
        }));


    testRunner.addTest(new TestCase("Check UTF8 decoding",
        function () {
            var fb = new FileManager.FileBuffer(TestFileDir + "\\UTF8BOM.txt");
            var chars = [];
            for (var i = 0; i < 6; i++) {
                chars.push(fb.readUtf8CodePoint());
            }
            return TestRunner.arrayCompare(chars, [0x0054, 0x00E8, 0x1D23, 0x2020, 0x000D, 0x000A]);
        }));

    testRunner.addTest(new TestCase("Check UTF8 encoding",
        function () {
            var fb = new FileManager.FileBuffer(20);
            fb.writeUtf8Bom();
            var chars = [0x0054, 0x00E8, 0x1D23, 0x2020, 0x000D, 0x000A];
            for (var i in chars) {
                fb.writeUtf8CodePoint(chars[i]);
            }
            fb.index = 0;
            var bytes = [];
            for (var i = 0; i < 14; i++) {
                bytes.push(fb.readByte());
            }
            var expected = [0xEF, 0xBB, 0xBF, 0x54, 0xC3, 0xA8, 0xE1, 0xB4, 0xA3, 0xE2, 0x80, 0xA0, 0x0D, 0x0A];
            return TestRunner.arrayCompare(bytes, expected);
        }));

    // Test reading and writing files
    testRunner.addTest(new TestCase("Check saving a file",
        function () {
            var filename = TestFileDir + "\\tmpUTF16LE.txt";
            var fb = new FileManager.FileBuffer(14);
            fb.writeUtf16leBom();
            var chars = [0x0054, 0x00E8, 0x1D23, 0x2020, 0x000D, 0x000A];
            chars.forEach(function (val) { fb.writeUtf16CodePoint(val, false); });
            fb.save(filename);

            var savedFile = new FileManager.FileBuffer(filename);
            if (savedFile.encoding !== 'utf16le') {
                throw Error("Incorrect encoding");
            }
            var expectedBytes = [0xFF, 0xFE, 0x54, 0x00, 0xE8, 0x00, 0x23, 0x1D, 0x20, 0x20, 0x0D, 0x00, 0x0A, 0x00]
            savedFile.index = 0;
            expectedBytes.forEach(function (val) {
                var byteVal = savedFile.readByte();
                if (byteVal !== val) {
                    throw Error("Incorrect byte value");
                }
            });
            return true;
        }));

    testRunner.addTest(new TestCase("Check reading past buffer asserts",
    function () {
        var fb = new FileManager.FileBuffer(TestFileDir + "\\UTF8BOM.txt");
        var result = fb.readByte(200);
        return true;
    }, "read beyond buffer length"));
    testRunner.addTest(new TestCase("Check writing past buffer asserts",
    function () {
        var fb = new FileManager.FileBuffer(TestFileDir + "\\UTF8BOM.txt");
        fb.writeByte(5, 200);
        return true;
    }, "write beyond buffer length"));

    // Non-BMP unicode char tests
    testRunner.addTest(new TestCase("Read non-BMP utf16 chars",
        function () {
            var savedFile = new FileManager.FileBuffer(TestFileDir + "\\utf16leNonBmp.txt");
            if (savedFile.encoding !== 'utf16le') {
                throw Error("Incorrect encoding");
            }

            var codePoints = [];
            for (var i = 0; i < 6; i++) {
                codePoints.push(savedFile.readUtf16CodePoint(false));
            }
            var expectedCodePoints = [0x10480, 0x10481, 0x10482, 0x54, 0x68, 0x69];
            return TestRunner.arrayCompare(codePoints, expectedCodePoints);
        }));

    testRunner.addTest(new TestCase("Read non-BMP utf8 chars",
        function () {
            var savedFile = new FileManager.FileBuffer(TestFileDir + "\\utf8NonBmp.txt");
            if (savedFile.encoding !== 'utf8') {
                throw Error("Incorrect encoding");
            }

            var codePoints = [];
            for (var i = 0; i < 6; i++) {
                codePoints.push(savedFile.readUtf8CodePoint());
            }
            var expectedCodePoints = [0x10480, 0x10481, 0x10482, 0x54, 0x68, 0x69];
            return TestRunner.arrayCompare(codePoints, expectedCodePoints);
        }));

    testRunner.addTest(new TestCase("Write non-BMP utf8 chars",
        function () {
            var filename = TestFileDir + "\\tmpUTF8nonBmp.txt";
            var fb = new FileManager.FileBuffer(15);
            var chars = [0x10480, 0x10481, 0x10482, 0x54, 0x68, 0x69];
            chars.forEach(function (val) { fb.writeUtf8CodePoint(val); });
            fb.save(filename);

            var savedFile = new FileManager.FileBuffer(filename);
            if (savedFile.encoding !== 'utf8') {
                throw Error("Incorrect encoding");
            }
            var expectedBytes = [0xF0, 0x90, 0x92, 0x80, 0xF0, 0x90, 0x92, 0x81, 0xF0, 0x90, 0x92, 0x82, 0x54, 0x68, 0x69];
            expectedBytes.forEach(function (val) {
                var byteVal = savedFile.readByte();
                if (byteVal !== val) {
                    throw Error("Incorrect byte value");
                }
            });
            return true;
        }));

    testRunner.addTest(new TestCase("Test invalid lead UTF8 byte",
        function () {
            var filename = TestFileDir + "\\utf8BadLeadByte.txt";
            var fb = new FileManager.FileBuffer(filename);
            return true;
        }, "Invalid UTF8 byte sequence at index: 4"));

    testRunner.addTest(new TestCase("Test invalid tail UTF8 byte",
        function () {
            var filename = TestFileDir + "\\utf8InvalidTail.txt";
            var fb = new FileManager.FileBuffer(filename);
            return true;
        }, "Trailing byte invalid at index: 8"));

    testRunner.addTest(new TestCase("Test ANSI fails validation",
        function () {
            var filename = TestFileDir + "\\ansi.txt";
            var fb = new FileManager.FileBuffer(filename);
            return true;
        }, "Trailing byte invalid at index: 6"));

    testRunner.addTest(new TestCase("Test UTF-16LE with invalid surrogate trail fails",
        function () {
            var filename = TestFileDir + "\\utf16leInvalidSurrogate.txt";
            var fb = new FileManager.FileBuffer(filename);
            return true;
        }, "Trail surrogate has an invalid value"));

    testRunner.addTest(new TestCase("Test UTF-16BE with invalid surrogate head fails",
        function () {
            var filename = TestFileDir + "\\UTF16BEInvalidSurrogate.txt";
            var fb = new FileManager.FileBuffer(filename);
            return true;
        }, "Byte sequence starts with a trail surrogate"));

    testRunner.addTest(new TestCase("Test UTF-16LE with missing trail surrogate fails",
        function () {
            var filename = TestFileDir + "\\utf16leMissingTrailSurrogate.txt";
            var fb = new FileManager.FileBuffer(filename);
            return true;
        }, "Trail surrogate has an invalid value"));

    // Count of CRs & LFs
    testRunner.addTest(new TestCase("Count character occurrences",
        function () {
            var filename = TestFileDir + "\\charCountASCII.txt";
            var fb = new FileManager.FileBuffer(filename);
            var result = (fb.countCR === 5 && fb.countLF === 4 && fb.countCRLF === 5 && fb.countHT === 3);
            return result;
        }));

    // Control characters in text
    testRunner.addTest(new TestCase("Test file with control character",
        function () {
            var filename = TestFileDir + "\\controlChar.txt";
            var fb = new FileManager.FileBuffer(filename);
            return true;
        }, "Codepoint at index: 3 has control value: 8"));

    return testRunner;
})();
