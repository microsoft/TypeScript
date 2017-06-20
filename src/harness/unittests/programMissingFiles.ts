/// <reference path="..\harness.ts" />

namespace ts {
    describe("Program.getMissingFilePaths", () => {

        const options: CompilerOptions = {
            noLib: true,
        };

        const emptyFileName = "empty.ts";
        const emptyFileRelativePath = "./" + emptyFileName;

        const emptyFile: Harness.Compiler.TestFile = {
            unitName: emptyFileName,
            content: ""
        };

        const referenceFileName = "reference.ts";
        const referenceFileRelativePath = "./" + referenceFileName;

        const referenceFile: Harness.Compiler.TestFile = {
            unitName: referenceFileName,
            content:
                "/// <reference path=\"d:/imaginary/nonexistent1.ts\"/>\n" + // Absolute
                "/// <reference path=\"./nonexistent2.ts\"/>\n" + // Relative
                "/// <reference path=\"nonexistent3.ts\"/>\n" + // Unqualified
                "/// <reference path=\"nonexistent4\"/>\n"   // No extension
        };

        const testCompilerHost = Harness.Compiler.createCompilerHost(
            /*inputFiles*/ [emptyFile, referenceFile],
            /*writeFile*/ undefined,
            /*scriptTarget*/ undefined,
            /*useCaseSensitiveFileNames*/ false,
            /*currentDirectory*/ "d:\\pretend\\",
            /*newLineKind*/ NewLineKind.LineFeed,
            /*libFiles*/ undefined
        );

        it("handles no missing root files", () => {
            const program = createProgram([emptyFileRelativePath], options, testCompilerHost);
            const missing = program.getMissingFilePaths();
            assert.isDefined(missing);
            assert.equal(missing.length, 0);
        });

        it("handles missing root file", () => {
            const program = createProgram(["./nonexistent.ts"], options, testCompilerHost);
            const missing = program.getMissingFilePaths();
            assert.isDefined(missing);
            assert.equal(missing.length, 1);
            assert.equal(missing[0].toString(), "d:/pretend/nonexistent.ts"); // Absolute path
        });

        it("handles multiple missing root files", () => {
            const program = createProgram(["./nonexistent0.ts", "./nonexistent1.ts"], options, testCompilerHost);
            const missing = program.getMissingFilePaths().sort();
            assert.equal(missing.length, 2);
            assert.equal(missing[0].toString(), "d:/pretend/nonexistent0.ts");
            assert.equal(missing[1].toString(), "d:/pretend/nonexistent1.ts");
        });

        it("handles a mix of present and missing root files", () => {
            const program = createProgram(["./nonexistent0.ts", emptyFileRelativePath, "./nonexistent1.ts"], options, testCompilerHost);
            const missing = program.getMissingFilePaths().sort();
            assert.equal(missing.length, 2);
            assert.equal(missing[0].toString(), "d:/pretend/nonexistent0.ts");
            assert.equal(missing[1].toString(), "d:/pretend/nonexistent1.ts");
        });

        it("handles repeatedly specified root files", () => {
            const program = createProgram(["./nonexistent.ts", "./nonexistent.ts"], options, testCompilerHost);
            const missing = program.getMissingFilePaths();
            assert.isDefined(missing);
            assert.equal(missing.length, 1);
            assert.equal(missing[0].toString(), "d:/pretend/nonexistent.ts");
        });

        it("normalizes file paths", () => {
            const program0 = createProgram(["./nonexistent.ts", "./NONEXISTENT.ts"], options, testCompilerHost);
            const program1 = createProgram(["./NONEXISTENT.ts", "./nonexistent.ts"], options, testCompilerHost);
            const missing0 = program0.getMissingFilePaths();
            const missing1 = program1.getMissingFilePaths();
            assert.equal(missing0.length, 1);
            assert.deepEqual(missing0, missing1);
        });

        it("handles missing triple slash references", () => {
            const program = createProgram([referenceFileRelativePath], options, testCompilerHost);
            const missing = program.getMissingFilePaths().sort();
            assert.isDefined(missing);
            assert.equal(missing.length, 6);

            // From absolute reference
            assert.equal(missing[0].toString(), "d:/imaginary/nonexistent1.ts");

            // From relative reference
            assert.equal(missing[1].toString(), "d:/pretend/nonexistent2.ts");

            // From unqualified reference
            assert.equal(missing[2].toString(), "d:/pretend/nonexistent3.ts");

            // From no-extension reference
            assert.equal(missing[3].toString(), "d:/pretend/nonexistent4.d.ts");
            assert.equal(missing[4].toString(), "d:/pretend/nonexistent4.ts");
            assert.equal(missing[5].toString(), "d:/pretend/nonexistent4.tsx");
        });
    });
}