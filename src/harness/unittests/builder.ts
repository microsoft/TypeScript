/// <reference path="reuseProgramStructure.ts" />

namespace ts {
    describe("builder", () => {
        it("emits dependent files", () => {
            const files: NamedSourceText[] = [
                { name: "/a.ts", text: SourceText.New("", 'import { b } from "./b";', "") },
                { name: "/b.ts", text: SourceText.New("", ' import { c } from "./c";', "export const b = c;") },
                { name: "/c.ts", text: SourceText.New("", "", "export const c = 0;") },
            ];

            let program = newProgram(files, ["/a.ts"], {});
            const assertChanges = makeAssertChanges(() => program);

            assertChanges(["/c.js", "/b.js", "/a.js"]);

            program = updateProgramFile(program, "/a.ts", "//comment");
            assertChanges(["/a.js"]);

            program = updateProgramFile(program, "/b.ts", "export const b = c + 1;");
            assertChanges(["/b.js", "/a.js"]);

            program = updateProgramFile(program, "/c.ts", "export const c = 1;");
            assertChanges(["/c.js", "/b.js"]);
        });

        it("if emitting all files, emits the changed file first", () => {
            const files: NamedSourceText[] = [
                { name: "/a.ts", text: SourceText.New("", "", "namespace A { export const x = 0; }") },
                { name: "/b.ts", text: SourceText.New("", "", "namespace B { export const x = 0; }") },
            ];

            let program = newProgram(files, ["/a.ts", "/b.ts"], {});
            const assertChanges = makeAssertChanges(() => program);

            assertChanges(["/a.js", "/b.js"]);

            program = updateProgramFile(program, "/a.ts", "namespace A { export const x = 1; }");
            assertChanges(["/a.js", "/b.js"]);

            program = updateProgramFile(program, "/b.ts", "namespace B { export const x = 1; }");
            assertChanges(["/b.js", "/a.js"]);
        });
    });

    function makeAssertChanges(getProgram: () => Program): (fileNames: ReadonlyArray<string>) => void  {
        const builder = createBuilder({
            getCanonicalFileName: identity,
            computeHash: identity
        });
        return fileNames => {
            const program = getProgram();
            builder.updateProgram(program);
            const outputFileNames: string[] = [];
            builder.emitChangedFiles(program, fileName => outputFileNames.push(fileName));
            assert.deepEqual(outputFileNames, fileNames);
        };
    }

    function updateProgramFile(program: ProgramWithSourceTexts, fileName: string, fileContent: string): ProgramWithSourceTexts {
        return updateProgram(program, program.getRootFileNames(), program.getCompilerOptions(), files => {
            updateProgramText(files, fileName, fileContent);
        });
    }
}
