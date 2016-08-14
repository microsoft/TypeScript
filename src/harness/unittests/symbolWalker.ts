/// <reference path="..\harness.ts" />

namespace ts {
    describe("Symbol Walker", () => {
        function test(description: string, source: string, verifier: (file: SourceFile, checker: TypeChecker, walker: SymbolWalker) => void) {
            it(description, () => {
                let {result} = Harness.Compiler.compileFiles([{
                    unitName: "main.ts",
                    content: source
                }], [], {}, {}, "/");
                let file = result.program.getSourceFile("main.ts");
                let checker = result.program.getTypeChecker();
                let walker = checker.getSymbolWalker();
                verifier(file, checker, walker);

                result = undefined;
                file = undefined;
                checker = undefined;
                walker = undefined;
            });
        }

        test("can be created", `
interface Bar {
    x: number;
    y: number;
    history: Bar[];
}
export default function foo(a: number, b: Bar): void {}`, (file, checker, walker) => {
            let foundCount = 0;
            let stdLibRefSymbols = 0;
            const expectedSymbols = ["default", "a", "b", "Bar", "x", "y", "history"];
            walker.reset(symbol => {
                const isStdLibSymbol = forEach(symbol.declarations, d => {
                    return getSourceFileOfNode(d).hasNoDefaultLib == true;
                });
                if (isStdLibSymbol) {
                    stdLibRefSymbols++;
                    return false; // Don't traverse into the stdlib. That's unnessesary for this test.
                }
                assert.equal(symbol.name, expectedSymbols[foundCount]);
                foundCount++;
                return true;
            });
            const symbols = checker.getExportsOfModule(file.symbol);
            for (const symbol of symbols) {
                walker.visitSymbol(symbol);
            }
            assert.equal(foundCount, expectedSymbols.length);
            assert.equal(stdLibRefSymbols, 1); // Expect 1 stdlib entry symbol - the implicit Array referenced by Bar.history
        });
    });
}