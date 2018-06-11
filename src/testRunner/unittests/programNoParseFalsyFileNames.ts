namespace ts {
    describe("programNoParseFalsyFileNames", () => {
        let program: Program;

        beforeEach(() => {
            const testSource = `
            class Foo extends HTMLElement {
                bar: string = 'baz';
            }`;

            const host: CompilerHost = {
                getSourceFile: (fileName: string, languageVersion: ScriptTarget, _onError?: (message: string) => void) => {
                    return fileName === "test.ts" ? createSourceFile(fileName, testSource, languageVersion) : undefined;
                },
                getDefaultLibFileName: () => "",
                writeFile: (_fileName, _content) => { throw new Error("unsupported"); },
                getCurrentDirectory: () => sys.getCurrentDirectory(),
                getCanonicalFileName: fileName => sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
                getNewLine: () => sys.newLine,
                useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
                fileExists: fileName => fileName === "test.ts",
                readFile: fileName => fileName === "test.ts" ? testSource : undefined,
                resolveModuleNames: (_moduleNames: string[], _containingFile: string) => { throw new Error("unsupported"); },
                getDirectories: _path => { throw new Error("unsupported"); },
            };

            program = createProgram(["test.ts"], { module: ModuleKind.ES2015 }, host);
        });

        it("should not have missing file paths", () => {
            assert(program.getSourceFiles().length === 1, "expected 'getSourceFiles' length to be 1");
            assert(program.getMissingFilePaths().length === 0, "expected 'getMissingFilePaths' length to be 0");
            assert(program.getFileProcessingDiagnostics().getDiagnostics().length === 0, "expected 'getFileProcessingDiagnostics' length to be 0");
        });
    });
}