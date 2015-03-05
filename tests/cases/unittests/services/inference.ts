/// <reference path="..\..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path='..\..\..\..\src\harness\harness.ts' />
/// <reference path="..\..\..\..\src\services\inference.ts" />

interface EngineAndProgram {
    inferenceEngine: ts.InferenceEngine;
    program: ts.Program;
}

describe('JavascriptInference', function () {
    function createProgramWithSourceFiles(files: ts.Map<ts.SourceFile>) {
        var fileNames: string[] = [];
        ts.forEachKey(files, k => { fileNames.push(k); });

        var options = ts.getDefaultCompilerOptions();
        options.noResolve = true;
        options.allowNonTsExtensions = true;

        var program = ts.createProgram(fileNames, options, {
            getCanonicalFileName: f => f,
            getCurrentDirectory: () => "",
            getDefaultLibFileName: () => "",
            getNewLine: () => "\r\n",
            useCaseSensitiveFileNames: () => true,
            writeFile: undefined,
            getSourceFile: (fileName, languageVersion) => ts.getProperty(files, fileName)
        });

        return program;

    }

    function createProgramWithContent(content: { [fileName: string]: string }) {
        var sourceFiles: ts.Map<ts.SourceFile> = {};
        for (var fileName in content) {
            sourceFiles[fileName] = ts.createSourceFile(fileName, content[fileName], ts.ScriptTarget.Latest)
        }

        return createProgramWithSourceFiles(sourceFiles);
    }

    function createInferenceEngineWithContent(content: { [fileName: string]: string }): EngineAndProgram {
        var program = createProgramWithContent(content);

        var inferenceEngine = ts.createInferenceEngine();
        var updater = inferenceEngine.createEngineUpdater();

        ts.forEach(program.getSourceFiles(), f => {
            updater.onSourceFileAdded(f);
        });

        updater.updateInferenceEngine(program);

        return { inferenceEngine, program };
    }

    function normalize(value: string) {
        return value.replace("\r\n", "\n");
    }

    function validateReferenceManager(engineAndProgram: EngineAndProgram, expected: string): void {
        var referenceManager = engineAndProgram.inferenceEngine.referencesManager_forTestingPurposesOnly;

        var actual = normalize(JSON.stringify(referenceManager.toJSON(engineAndProgram.program), undefined, "  ")).trim();
        expected = normalize(expected).trim();

        //if (actual !== expected) {
        //    ts.sys.writeFile("c:\\temp\\result.text", actual);
        //}

        assert.equal(actual, expected);
    }

    function withUpdate(engineAndProgram: EngineAndProgram, fileName: string, start: number, length: number, replacement: string): EngineAndProgram {
        var inferenceEngine = engineAndProgram.inferenceEngine;
        var oldProgram = engineAndProgram.program;
        var oldFile = oldProgram.getSourceFile(fileName);

        var newFiles: ts.Map<ts.SourceFile> = {};
        ts.map(oldProgram.getSourceFiles(), f => {
            if (f !== oldFile) {
                newFiles[f.fileName] = f;
            }
        });

        var oldText = oldFile.text;
        var newText = oldText.substr(0, start) + replacement + oldText.substr(start + length);
        var newFile = ts.updateSourceFile(oldFile, newText, ts.createTextChangeRange(ts.createTextSpan(start, length), replacement.length), /*aggressiveChecks:*/ true);

        var updater = inferenceEngine.createEngineUpdater();
        updater.onSourceFileUpdated(oldFile, newFile);

        newFiles[newFile.fileName] = newFile;
        var newProgram = createProgramWithSourceFiles(newFiles);

        updater.updateInferenceEngine(newProgram);
        return { inferenceEngine, program: newProgram };
    }

    describe("ReferencesManager", () => {
        describe("References in an initial set of files.", () => {
            it("CrossFileReference1", () => {
                var engineAndProgram = createInferenceEngineWithContent({
                    "file1.js":
                    `var v;
v = 1;
`,
                    "file2.js":
                    `v = 2`
                });

                validateReferenceManager(engineAndProgram,
                    `{
  "declarationToFilesWithReferences": [
    {
      "declarationInfo": {
        "symbolName": "v",
        "id": 1,
        "fileName": "file1.js",
        "start": 4
      },
      "fileNames": [
        "file1.js",
        "file2.js"
      ]
    }
  ],
  "fileNameToBidirectionalReferences": {
    "file1.js": {
      "referenceToDeclaration": [
        {
          "referenceInfo": {
            "text": "v",
            "id": 2,
            "fileName": "file1.js",
            "start": 7
          },
          "declarationInfo": {
            "symbolName": "v",
            "id": 1
          }
        }
      ],
      "declarationToReferences": [
        {
          "declarationInfo": {
            "symbolName": "v",
            "id": 1
          },
          "references": [
            {
              "text": "v",
              "id": 2,
              "fileName": "file1.js",
              "start": 7
            }
          ]
        }
      ]
    },
    "file2.js": {
      "referenceToDeclaration": [
        {
          "referenceInfo": {
            "text": "v",
            "id": 3,
            "fileName": "file2.js",
            "start": 0
          },
          "declarationInfo": {
            "symbolName": "v",
            "id": 1
          }
        }
      ],
      "declarationToReferences": [
        {
          "declarationInfo": {
            "symbolName": "v",
            "id": 1
          },
          "references": [
            {
              "text": "v",
              "id": 3,
              "fileName": "file2.js",
              "start": 0
            }
          ]
        }
      ]
    }
  }
}`);
            });
        });

        describe("References after an edit.", () => {
            it("File is untouched if it is not affected by an edit in another file.", () => {
                var file1Contents =
                    `var x;
var y;
// pointless code just so the edit doesn't affect 'y'.
return 1 + 1;
var z;
`

                var engineAndProgram = createInferenceEngineWithContent({
                    "file1.js": file1Contents,
                    "file2.js": `a = 1`
                });

                // First, ensure the initial data has been computed.
                engineAndProgram.inferenceEngine.referencesManager_forTestingPurposesOnly.toJSON(engineAndProgram.program);

                engineAndProgram = withUpdate(engineAndProgram, "file1.js", file1Contents.indexOf("z"), "z".length, "b");
                validateReferenceManager(engineAndProgram,
                    `{
  "declarationToFilesWithReferences": [],
  "fileNameToBidirectionalReferences": {
    "file2.js": {
      "referenceToDeclaration": [],
      "declarationToReferences": []
    },
    "file1.js": {
      "referenceToDeclaration": [],
      "declarationToReferences": []
    }
  }
}`);
            });

            it("File is re-resolved if it is affected by an edit in another file.", () => {
                var file1Contents =
                    `var x;
var y;
// pointless code just so the edit doesn't affect 'y'.
return 1 + 1;
var z;
`

                var engineAndProgram = createInferenceEngineWithContent({
                    "file1.js": file1Contents,
                    "file2.js": `a = 1`
                });

                // First, ensure the initial data has been computed.
                engineAndProgram.inferenceEngine.referencesManager_forTestingPurposesOnly.toJSON(engineAndProgram.program);

                engineAndProgram = withUpdate(engineAndProgram, "file1.js", file1Contents.indexOf("z"), "z".length, "a");
                validateReferenceManager(engineAndProgram,
                    `{
  "declarationToFilesWithReferences": [
    {
      "declarationInfo": {
        "symbolName": "a",
        "id": 1,
        "fileName": "file1.js",
        "start": 87
      },
      "fileNames": [
        "file2.js"
      ]
    }
  ],
  "fileNameToBidirectionalReferences": {
    "file2.js": {
      "referenceToDeclaration": [
        {
          "referenceInfo": {
            "text": "a",
            "id": 2,
            "fileName": "file2.js",
            "start": 0
          },
          "declarationInfo": {
            "symbolName": "a",
            "id": 1
          }
        }
      ],
      "declarationToReferences": [
        {
          "declarationInfo": {
            "symbolName": "a",
            "id": 1
          },
          "references": [
            {
              "text": "a",
              "id": 2,
              "fileName": "file2.js",
              "start": 0
            }
          ]
        }
      ]
    },
    "file1.js": {
      "referenceToDeclaration": [],
      "declarationToReferences": []
    }
  }
}`);
            });
        });
    });

    describe("SimpleExpressionInference", () => {
        it("NumberInference", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = 0"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "number");
        });

        it("StringInference", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = ''"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "string");
        });

        it("BooleanInference1", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = true"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "boolean");
        });

        it("BooleanInference2", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = false"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "boolean");
        });

        it("UnionOfTheSameTypeShouldNotProduceUnion", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = true || false"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "boolean");
        });

        it("UnionOfDifferentTypesShouldProduceUnion", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = true || ''"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "(boolean | string)");
        });

        it("UnionShouldBeFlat", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = true || '' || 0"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "(boolean | number | string)");
        });

        it("UnionShouldHaveReferenceIdentity", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": 
`var v1 = true || '' || 0;
var v2 = true || '' || 0;`
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation1: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation1.toString(), "(boolean | number | string)");

            var typeInformation2: ts.TypeInformation = engine.getTypeInformation(program, file.statements[1].declarationList.declarations[0].initializer);
            assert.equal(typeInformation2.toString(), "(boolean | number | string)");

            assert.isTrue(typeInformation1 === typeInformation2);
        });

        it("PlusOfNumberAndNullIsNumber", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = 0 + null"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "number");
        });

        it("PlusOfNullAndNullIsNumberOrString", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = null + null"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "(number | string)");
        });

        it("PlusOfNumberAndNumberIsNumber", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = 0 + 1"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "number");
        });

        it("PlusOfNumberAndStringIsString", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = 0 + ''"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "string");
        });

        it("PlusOfStringAndNullIsString", () => {
            var engineAndProgram = createInferenceEngineWithContent({
                "file1.js": "var v = null + ''"
            });

            var engine = engineAndProgram.inferenceEngine;
            var program = engineAndProgram.program;
            var file = <any>program.getSourceFiles()[0];

            var typeInformation: ts.TypeInformation = engine.getTypeInformation(program, file.statements[0].declarationList.declarations[0].initializer);
            assert.equal(typeInformation.toString(), "string");
        });
    });
});
