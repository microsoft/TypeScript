/// <reference path="..\..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\..\src\services\inference.ts" />

describe('ReferencesManager', function () {
    function createProgramWithContent(content: { [fileName: string]: string }) {
        var fileNames: string[] = [];
        ts.forEachKey(content, k => { fileNames.push(k); });

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
            getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget) => {
                return ts.hasProperty(content, fileName)
                    ? ts.createSourceFile(fileName, content[fileName], languageVersion)
                    : undefined;
            }
        });

        return program;
    }

    function createInferenceEngineWithContent(content: { [fileName: string]: string }): { inferenceEngine: ts.InferenceEngine, program: ts.Program } {
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

    function validateReferenceManager(engineAndProgram: { inferenceEngine: ts.InferenceEngine, program: ts.Program }, expected: string): void {
        var referenceManager = engineAndProgram.inferenceEngine.referencesManager_forTestingPurposesOnly;

        var actual = normalize(JSON.stringify(referenceManager.toJSON(engineAndProgram.program), undefined, "  ")).trim();
        expected = normalize(expected).trim();

        //if (actual !== expected) {
        //    ts.sys.writeFile("c:\\temp\\result.text", actual);
        //}

        assert.equal(actual, expected);
    }

    describe("References in an initial set of files.", () => {
        it("CrossFileReference1", () => {
            debugger;
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
});
