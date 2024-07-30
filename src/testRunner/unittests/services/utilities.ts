import * as ts from "../../_namespaces/ts.js";

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
});
