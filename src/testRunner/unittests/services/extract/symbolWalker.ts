import * as Harness from "../../../_namespaces/Harness.js";
import * as ts from "../../../_namespaces/ts.js";

describe("unittests:: services:: extract:: Symbol Walker", () => {
    function test(description: string, source: string, verifier: (file: ts.SourceFile, checker: ts.TypeChecker) => void) {
        it(description, () => {
            const result = Harness.Compiler.compileFiles(
                [{
                    unitName: "main.ts",
                    content: source,
                }],
                [],
                {},
                {},
                "/",
            );
            const file = result.program!.getSourceFile("main.ts")!;
            const checker = result.program!.getTypeChecker();
            verifier(file, checker);
        });
    }

    test(
        "can be created",
        `
interface Bar {
    x: number;
    y: number;
    history: Bar[];
}
export default function foo(a: number, b: Bar): void {}`,
        (file, checker) => {
            let foundCount = 0;
            let stdLibRefSymbols = 0;
            const expectedSymbols = ["default", "a", "b", "Bar", "x", "y", "history"];
            const walker = checker.getSymbolWalker(symbol => {
                const isStdLibSymbol = ts.forEach(symbol.declarations, d => {
                    return ts.getSourceFileOfNode(d).hasNoDefaultLib;
                });
                if (isStdLibSymbol) {
                    stdLibRefSymbols++;
                    return false; // Don't traverse into the stdlib. That's unnecessary for this test.
                }
                assert.equal(symbol.name, expectedSymbols[foundCount]);
                foundCount++;
                return true;
            });
            const symbols = checker.getExportsOfModule(file.symbol);
            for (const symbol of symbols) {
                walker.walkSymbol(symbol);
            }
            assert.equal(foundCount, expectedSymbols.length);
            assert.equal(stdLibRefSymbols, 1); // Expect 1 stdlib entry symbol - the implicit Array referenced by Bar.history
        },
    );
});
