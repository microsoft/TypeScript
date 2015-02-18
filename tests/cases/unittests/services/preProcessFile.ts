/// <reference path="..\..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\..\src\harness\harnessLanguageService.ts" />

describe('PreProcessFile:', function () {
    function test(sourceText: string, readImportFile: boolean, expectedPreProcess: ts.PreProcessedFileInfo): void {
        var resultPreProcess = ts.preProcessFile(sourceText, readImportFile);

        var resultIsLibFile = resultPreProcess.isLibFile;
        var resultImportedFiles = resultPreProcess.importedFiles;
        var resultReferencedFiles = resultPreProcess.referencedFiles;

        var expectedIsLibFile = expectedPreProcess.isLibFile;
        var expectedImportedFiles = expectedPreProcess.importedFiles;
        var expectedReferencedFiles = expectedPreProcess.referencedFiles;

        assert.equal(resultIsLibFile, expectedIsLibFile, "Pre-processed file has different value for isLibFile. Expected: " + expectedPreProcess + ". Actual: " + resultIsLibFile);

        assert.equal(resultImportedFiles.length, expectedImportedFiles.length,
            "Array's length of imported files does not match expected. Expected: " + expectedImportedFiles.length + ". Actual: " + resultImportedFiles.length);

        assert.equal(resultReferencedFiles.length, expectedReferencedFiles.length,
            "Array's length of referenced files does not match expected. Expected: " + expectedReferencedFiles.length + ". Actual: " + resultReferencedFiles.length);

        for (var i = 0; i < expectedImportedFiles.length; ++i) {
            var resultImportedFile = resultImportedFiles[i];
            var expectedImportedFile = expectedImportedFiles[i];

            assert.equal(resultImportedFile.fileName, expectedImportedFile.fileName, "Imported file path does not match expected. Expected: " + expectedImportedFile.fileName + ". Actual: " + resultImportedFile.fileName + ".");
            
            assert.equal(resultImportedFile.pos, expectedImportedFile.pos, "Imported file position does not match expected. Expected: " + expectedImportedFile.pos + ". Actual: " + resultImportedFile.pos + ".");

            assert.equal(resultImportedFile.end, expectedImportedFile.end, "Imported file length does not match expected. Expected: " + expectedImportedFile.end + ". Actual: " + resultImportedFile.end + ".");
        }

        for (var i = 0; i < expectedReferencedFiles.length; ++i) {
            var resultReferencedFile = resultReferencedFiles[i];
            var expectedReferencedFile = expectedReferencedFiles[i];

            assert.equal(resultReferencedFile.fileName, expectedReferencedFile.fileName, "Referenced file path does not match expected. Expected: " + expectedReferencedFile.fileName + ". Actual: " + resultReferencedFile.fileName + ".");
            
            assert.equal(resultReferencedFile.pos, expectedReferencedFile.pos, "Referenced file position does not match expected. Expected: " + expectedReferencedFile.pos + ". Actual: " + resultReferencedFile.pos + ".");

            assert.equal(resultReferencedFile.end, expectedReferencedFile.end, "Referenced file length does not match expected. Expected: " + expectedReferencedFile.end + ". Actual: " + resultReferencedFile.end + ".");
        }
    }
    describe("Test preProcessFiles,", function () {
        it("Correctly return referenced files from triple slash", function () {
            test("///<reference path = \"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\"/>" + "\n" + "///<reference path=\"refFile3.ts\" />" + "\n" + "///<reference path= \"..\\refFile4d.ts\" />", true,
                {
                    referencedFiles: [{ fileName: "refFile1.ts", pos: 0, end: 37 }, { fileName: "refFile2.ts", pos: 38, end: 73 },
                        { fileName: "refFile3.ts", pos: 74, end: 109 }, { fileName: "..\\refFile4d.ts", pos: 110, end: 150 }],
                    importedFiles: <ts.FileReference[]>[],
                    isLibFile: false
                });
        }),

        it("Do not return reference path because of invalid triple-slash syntax", function () {
            test("///<reference path\"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\">" + "\n" + "///<referencepath=\"refFile3.ts\" />" + "\n" + "///<reference pat= \"refFile4d.ts\" />", true,
                {
                    referencedFiles: <ts.FileReference[]>[],
                    importedFiles: <ts.FileReference[]>[],
                    isLibFile: false
                });
        }),

        it("Correctly return imported files", function () {
            test("import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\"); import i3= require(\"r3.ts\"); import i4=require(\"r4.ts\"); import i5 = require  (\"r5.ts\");", true,
                {
                    referencedFiles: <ts.FileReference[]>[],
                    importedFiles: [{ fileName: "r1.ts", pos: 20, end: 25 }, { fileName: "r2.ts", pos: 49, end: 54 }, { fileName: "r3.ts", pos: 78, end: 83 },
                        { fileName: "r4.ts", pos: 106, end: 111 }, { fileName: "r5.ts", pos: 138, end: 143 }],
                    isLibFile: false
                });
        }),

        it("Do not return imported files if readImportFiles argument is false", function () {
            test("import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\"); import i3= require(\"r3.ts\"); import i4=require(\"r4.ts\"); import i5 = require  (\"r5.ts\");", false,
                {
                    referencedFiles: <ts.FileReference[]>[],
                    importedFiles: <ts.FileReference[]>[],
                    isLibFile: false
                });
        }),

        it("Do not return import path because of invalid import syntax", function () {
            test("import i1 require(\"r1.ts\"); import = require(\"r2.ts\") import i3= require(\"r3.ts\"); import i5", true,
                {
                    referencedFiles: <ts.FileReference[]>[],
                    importedFiles: [{ fileName: "r3.ts", pos: 73, end: 78 }],
                    isLibFile: false
                });
        }),

        it("Correctly return referenced files and import files", function () {
            test("///<reference path=\"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\"/>" + "\n" + "import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\");", true,
                {
                    referencedFiles: [{ fileName: "refFile1.ts", pos: 0, end: 35 }, { fileName: "refFile2.ts", pos: 36, end: 71 }],
                    importedFiles: [{ fileName: "r1.ts", pos: 92, end: 97 }, { fileName: "r2.ts", pos: 121, end: 126 }],
                    isLibFile: false
                });
        }),

        it("Correctly return referenced files and import files even with some invalid syntax", function () {
            test("///<reference path=\"refFile1.ts\" />" + "\n" + "///<reference path \"refFile2.ts\"/>" + "\n" + "import i1 = require(\"r1.ts\"); import = require(\"r2.ts\"); import i2 = require(\"r3.ts\");", true,
                {
                    referencedFiles: [{ fileName: "refFile1.ts", pos: 0, end: 35 }],
                    importedFiles: [{ fileName: "r1.ts", pos: 91, end: 96 }, { fileName: "r3.ts", pos: 148, end: 153 }],
                    isLibFile: false
                })
        });
    });
});

