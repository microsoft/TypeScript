/// <reference path="..\..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\..\src\harness\harnessLanguageService.ts" />

describe('preProcessFile', function () {
    function test(sourceText: string, readImportFile: boolean, expectedPreProcess: ts.PreProcessedFileInfo): void {
        debugger
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

            assert.equal(resultImportedFile.path, expectedImportedFile.path, "Imported file path does not match expected. Expected: " + expectedImportedFile.path + ". Actual: " + resultImportedFile.path + ".");
            
            assert.equal(resultImportedFile.position, expectedImportedFile.position, "Imported file position does not match expected. Expected: " + expectedImportedFile.position + ". Actual: " + resultImportedFile.position + ".");

            assert.equal(resultImportedFile.length, expectedImportedFile.length, "Imported file length does not match expected. Expected: " + expectedImportedFile.length + ". Actual: " + resultImportedFile.length + ".");
        }

        for (var i = 0; i < expectedReferencedFiles.length; ++i) {
            var resultReferencedFile = resultReferencedFiles[i];
            var expectedReferencedFile = expectedReferencedFiles[i];

            assert.equal(resultReferencedFile.path, expectedReferencedFile.path, "Referenced file path does not match expected. Expected: " + expectedReferencedFile.path + ". Actual: " + resultReferencedFile.path + ".");
            
            assert.equal(resultReferencedFile.position, expectedReferencedFile.position, "Referenced file position does not match expected. Expected: " + expectedReferencedFile.position + ". Actual: " + resultReferencedFile.position + ".");

            assert.equal(resultReferencedFile.length, expectedReferencedFile.length, "Referenced file length does not match expected. Expected: " + expectedReferencedFile.length + ". Actual: " + resultReferencedFile.length + ".");
        }
    }
    describe("test preProcessFiles", function () {
        it("Correctly return referenced files from triple slash", function () {
           test("///<reference path = \"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\"/>" + "\n" + "///<reference path=\"refFile3.ts\" />" + "\n" + "///<reference path= \"refFile4d.ts\" />", true,
                {
                    referencedFiles: [{ path: "refFile1.ts", position: 0, length: 37  }, { path: "refFile2.ts", position: 38, length: 35 },
                        { path: "refFile3.ts", position: 74, length: 35 }, { path: "refFile4d.ts", position: 110, length: 37 }],
                    importedFiles: <ts.IFileReference[]>[],
                    diagnostics: <TypeScript.Diagnostic[]>[],
                    isLibFile: false
                });
       }),

       it("Invalid referenced files from triple slash", function () {
           test("///<reference path\"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\">" + "\n" + "///<referencepath=\"refFile3.ts\" />" + "\n" + "///<reference pat= \"refFile4d.ts\" />", true,
                {
                    referencedFiles: <ts.IFileReference[]>[],
                    importedFiles: <ts.IFileReference[]>[],
                    diagnostics: <TypeScript.Diagnostic[]>[],
                    isLibFile: false
                });
        });

        it("Correctly return imported files", function () {
            test("import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\"); import i3= require(\"r3.ts\"); import i4=require(\"r4.ts\"); import i5 = require  (\"r5.ts\");", true,
                {
                    referencedFiles: <ts.IFileReference[]>[],
                    importedFiles: [{ path: "r1.ts", position: 0, length: 5 }, { path: "r2.ts", position: 30, length: 5 }, { path: "r3.ts", position: 59, length: 5 },
                        { path: "r4.ts", position: 88, length: 5 }, { path: "r5.ts", position: 116, length: 5 }],
                    diagnostics: <TypeScript.Diagnostic[]>[],
                    isLibFile: false
                });
        });

        it("Do not return imported files if readImportFiles argument is false", function () {
            test("import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\"); import i3= require(\"r3.ts\"); import i4=require(\"r4.ts\"); import i5 = require  (\"r5.ts\");", false,
                {
                    referencedFiles: <ts.IFileReference[]>[],
                    importedFiles: <ts.IFileReference[]>[],
                    diagnostics: <TypeScript.Diagnostic[]>[],
                    isLibFile: false
                });
        });

        it("Correctly return referenced files and import files", function () {
            test("///<reference path=\"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\"/>" + "\n" + "import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\");", true,
                {
                    referencedFiles: [{ path: "refFile1.ts", position: 0, length: 35 }, { path: "refFile2.ts", position: 36, length: 35 }],
                    importedFiles: [{ path: "r1.ts", position: 72, length: 5 }, { path: "r2.ts", position: 102, length: 5 }],
                    diagnostics: <TypeScript.Diagnostic[]>[],
                    isLibFile: false
                });
        });
    });
});

