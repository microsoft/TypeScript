import * as ts from "../_namespaces/ts.js";
import {
    NamedSourceText,
    newProgram,
    ProgramWithSourceTexts,
    SourceText,
    updateProgram,
    updateProgramText,
} from "./helpers.js";

describe("unittests:: builder", () => {
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

    it("keeps the file in affected files if cancellation token throws during the operation", () => {
        const files: NamedSourceText[] = [
            { name: "/a.ts", text: SourceText.New("", 'import { b } from "./b";', "") },
            { name: "/b.ts", text: SourceText.New("", ' import { c } from "./c";', "export const b = c;") },
            { name: "/c.ts", text: SourceText.New("", "", "export const c = 0;") },
            { name: "/d.ts", text: SourceText.New("", "", "export const dd = 0;") },
            { name: "/e.ts", text: SourceText.New("", "", "export const ee = 0;") },
        ];

        let program = newProgram(files, ["/d.ts", "/e.ts", "/a.ts"], {});
        const assertChanges = makeAssertChangesWithCancellationToken(() => program);
        // No cancellation
        assertChanges(["/d.js", "/e.js", "/c.js", "/b.js", "/a.js"]);

        // cancel when emitting a.ts
        program = updateProgramFile(program, "/a.ts", "export function foo() { }");
        assertChanges(["/a.js"], 0);
        // Change d.ts and verify previously pending a.ts is emitted as well
        program = updateProgramFile(program, "/d.ts", "export function bar() { }");
        assertChanges(["/a.js", "/d.js"]);

        // Cancel when emitting b.js
        program = updateProgramFile(program, "/b.ts", "export class b { foo() { c + 1; } }");
        program = updateProgramFile(program, "/d.ts", "export function bar2() { }");
        assertChanges(["/d.js", "/b.js", "/a.js"], 1);
        // Change e.ts and verify previously b.js as well as a.js get emitted again since previous change was consumed completely but not d.ts
        program = updateProgramFile(program, "/e.ts", "export function bar3() { }");
        assertChanges(["/b.js", "/a.js", "/e.js"]);
    });
});

function makeAssertChanges(getProgram: () => ts.Program): (fileNames: readonly string[]) => void {
    const host: ts.BuilderProgramHost = {};
    let builderProgram: ts.EmitAndSemanticDiagnosticsBuilderProgram | undefined;
    return fileNames => {
        const program = getProgram();
        builderProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram(program, host, builderProgram);
        const outputFileNames: string[] = [];
        // eslint-disable-next-line no-empty
        while (builderProgram.emitNextAffectedFile(fileName => outputFileNames.push(fileName))) {
        }
        assert.deepEqual(outputFileNames, fileNames);
    };
}

function makeAssertChangesWithCancellationToken(getProgram: () => ts.Program): (fileNames: readonly string[], cancelAfterEmitLength?: number) => void {
    const host: ts.BuilderProgramHost = {};
    let builderProgram: ts.EmitAndSemanticDiagnosticsBuilderProgram | undefined;
    let cancel = false;
    const cancellationToken: ts.CancellationToken = {
        isCancellationRequested: () => cancel,
        throwIfCancellationRequested: () => {
            if (cancel) {
                throw new ts.OperationCanceledException();
            }
        },
    };
    return (fileNames, cancelAfterEmitLength?: number) => {
        cancel = false;
        let operationWasCancelled = false;
        const program = getProgram();
        builderProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram(program, host, builderProgram);
        const outputFileNames: string[] = [];
        try {
            do {
                assert.isFalse(cancel);
                if (outputFileNames.length === cancelAfterEmitLength) {
                    cancel = true;
                }
            }
            while (builderProgram.emitNextAffectedFile(fileName => outputFileNames.push(fileName), cancellationToken));
        }
        catch (e) {
            assert.isFalse(operationWasCancelled);
            assert(e instanceof ts.OperationCanceledException, e.toString());
            operationWasCancelled = true;
        }
        assert.equal(cancel, operationWasCancelled);
        assert.equal(operationWasCancelled, fileNames.length > cancelAfterEmitLength!);
        assert.deepEqual(outputFileNames, fileNames.slice(0, cancelAfterEmitLength));
    };
}

function updateProgramFile(program: ProgramWithSourceTexts, fileName: string, fileContent: string): ProgramWithSourceTexts {
    return updateProgram(program, program.getRootFileNames(), program.getCompilerOptions(), files => {
        updateProgramText(files, fileName, fileContent);
    });
}
