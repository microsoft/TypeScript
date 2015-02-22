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
            
            assert.equal(resultImportedFile.start, expectedImportedFile.start, "Imported file position does not match expected. Expected: " + expectedImportedFile.start + ". Actual: " + resultImportedFile.start + ".");

            assert.equal(resultImportedFile.length, expectedImportedFile.length, "Imported file length does not match expected. Expected: " + expectedImportedFile.length + ". Actual: " + resultImportedFile.length + ".");
        }

        for (var i = 0; i < expectedReferencedFiles.length; ++i) {
            var resultReferencedFile = resultReferencedFiles[i];
            var expectedReferencedFile = expectedReferencedFiles[i];

            assert.equal(resultReferencedFile.fileName, expectedReferencedFile.fileName, "Referenced file path does not match expected. Expected: " + expectedReferencedFile.fileName + ". Actual: " + resultReferencedFile.fileName + ".");
            
            assert.equal(resultReferencedFile.start, expectedReferencedFile.start, "Referenced file position does not match expected. Expected: " + expectedReferencedFile.start + ". Actual: " + resultReferencedFile.start + ".");

            assert.equal(resultReferencedFile.length, expectedReferencedFile.length, "Referenced file length does not match expected. Expected: " + expectedReferencedFile.length + ". Actual: " + resultReferencedFile.length + ".");
        }
    }
    describe("Test preProcessFiles,", function () {
        it("Correctly return referenced files from triple slash", function () {
            test("///<reference path = \"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\"/>" + "\n" + "///<reference path=\"refFile3.ts\" />" + "\n" + "///<reference path= \"..\\refFile4d.ts\" />", true,
                {
                    referencedFiles: [{ fileName: "refFile1.ts", start: 0, length: 37 }, { fileName: "refFile2.ts", start: 38, length: 35 },
                        { fileName: "refFile3.ts", start: 74, length: 35 }, { fileName: "..\\refFile4d.ts", start: 110, length: 40 }],
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
                    importedFiles: [{ fileName: "r1.ts", start: 20, length: 5 }, { fileName: "r2.ts", start: 49, length: 5 }, { fileName: "r3.ts", start: 78, length: 5 },
                        { fileName: "r4.ts", start: 106, length: 5 }, { fileName: "r5.ts", start: 138, length: 5 }],
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
                    importedFiles: [{ fileName: "r3.ts", start: 73, length: 5 }],
                    isLibFile: false
                });
        }),

        it("Correctly return referenced files and import files", function () {
            test("///<reference path=\"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\"/>" + "\n" + "import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\");", true,
                {
                    referencedFiles: [{ fileName: "refFile1.ts", start: 0, length: 35 }, { fileName: "refFile2.ts", start: 36, length: 35 }],
                    importedFiles: [{ fileName: "r1.ts", start: 92, length: 5 }, { fileName: "r2.ts", start: 121, length: 5 }],
                    isLibFile: false
                });
        }),

        it("Correctly return referenced files and import files even with some invalid syntax", function () {
            test("///<reference path=\"refFile1.ts\" />" + "\n" + "///<reference path \"refFile2.ts\"/>" + "\n" + "import i1 = require(\"r1.ts\"); import = require(\"r2.ts\"); import i2 = require(\"r3.ts\");", true,
                {
                    referencedFiles: [{ fileName: "refFile1.ts", start: 0, length: 35 }],
                    importedFiles: [{ fileName: "r1.ts", start: 91, length: 5 }, { fileName: "r3.ts", start: 148, length: 5 }],
                    isLibFile: false
                })
        });
    });
});

