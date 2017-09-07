/// <reference path="..\harness.ts" />

namespace ts {
    describe("Symbol Walker", () => {
        function test(description: string, source: string, verifier: (file: SourceFile, checker: TypeChecker) => void) {
            it(description, () => {
                let {result} = Harness.Compiler.compileFiles([{
                    unitName: "main.ts",
                    content: source
                }], [], {}, {}, "/");
                let file = result.program.getSourceFile("main.ts");
                let checker = result.program.getTypeChecker();
                verifier(file, checker);

                result = undefined;
                file = undefined;
                checker = undefined;
            });
        }

        test("can be created", `
interface Bar {
    x: number;
    y: number;
    history: Bar[];
}
export default function foo(a: number, b: Bar): void {}`, (file, checker) => {
            let foundCount = 0;
            let stdLibRefSymbols = 0;
            const expectedSymbols = ["default", "a", "b", "Bar", "x", "y", "history"];
            const walker = checker.getSymbolWalker(symbol => {
                const isStdLibSymbol = forEach(symbol.declarations, d => {
                    return getSourceFileOfNode(d).hasNoDefaultLib;
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
        });
    });
}