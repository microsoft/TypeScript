import * as ts from "../../_namespaces/ts";

describe("unittests:: services:: utilities", () => {
    describe("Test findPrecedingMatchingToken,", () => {
        it("should not infinite loop finding opening brace", () => {
            const sourceFile = ts.createSourceFile(
                "file.ts",
                `/// <reference path="./compiler.d.ts" />

(/** @window => {
  /** @type {Abcd123} */
  const core = window.Abcd.core;
})();`,
                ts.ScriptTarget.ESNext,
                /*setParentNodes*/ true,
            );
            // can't use ts.getTokenAtPosition because it returns back the wrong token
            const param = ts.forEachChildRecursively(sourceFile, node => node.kind === ts.SyntaxKind.Parameter ? node : undefined)!;
            const jsDoc = param.getChildren()[0];
            const token = jsDoc.getLastToken()!;
            const result = ts.findPrecedingMatchingToken(token, ts.SyntaxKind.OpenBraceToken, sourceFile);
            assert.isDefined(result);
        });
    });

    describe("getDiffNum", () => {
        it("getDiffNum", () => {
            const originalImports = ["abc", "Abc", "abC"];
            const test2 = ["abc", "Abc", "abC", "b"];
            const test3 = ["abc", "Abc", "abC", "c"];
            const test4 = ["abc", "Abc", "abC", "b", "d", "e"];
            const test5 = ["abc", "b", "Abc", "abC", "d", "e"];

            assert.equal(ts.getDiffNum(originalImports, originalImports), 0);
            assert.equal(ts.getDiffNum(originalImports, test2), 1);
            assert.equal(ts.getDiffNum(test2, test3), 1);
            assert.equal(ts.getDiffNum(originalImports, test4), 3);
            assert.equal(ts.getDiffNum(originalImports, test5), 3);
            assert.equal(ts.getDiffNum(test4, test5), 2);
        });
    });

    describe("mergeAndDeDuplicate", () => {
        it("mergeAndDeDuplicate", () => {
            const test = [1, 2, 3, 4];
            const test2 = [1, 2, 3, 4, 5];
            const test3 = [6, 7, 8, 9, 10];
            const test4 = [1, 3, 4, 5, 8, 9];
            const test5 = [1, 2, 4, 6, 7, 8, 9];
            function comparer(x: number, y: number) {
                if (x > y) return ts.Comparison.GreaterThan;
                if (x < y) return ts.Comparison.LessThan;
                return ts.Comparison.EqualTo;
            }
            assert.sameOrderedMembers(ts.mergeAndDeduplicateSorted(test, test2, comparer) as any as number[], test2);
            assert.sameOrderedMembers(ts.mergeAndDeduplicateSorted(test2, test2, comparer) as any as number[], test2);
            assert.sameOrderedMembers(ts.mergeAndDeduplicateSorted(test2, test3, comparer) as any as number[], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            assert.sameOrderedMembers(ts.mergeAndDeduplicateSorted(test4, test5, comparer) as any as number[], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
    });
});
