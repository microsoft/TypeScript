import * as ts from "../_namespaces/ts.js";

describe("comment parsing", () => {
    const withShebang = `#! node
/** comment */
// another one
;`;
    const noShebang = `/** comment */
// another one
;`;
    const withTrailing = `;/* comment */
// another one
`;
    const endingInHyphen = "/**comment-*/";
    it("skips shebang", () => {
        const result = ts.getLeadingCommentRanges(withShebang, 0);
        assert.isDefined(result);
        assert.strictEqual(result.length, 2);
    });

    it("treats all comments at start of file as leading comments", () => {
        const result = ts.getLeadingCommentRanges(noShebang, 0);
        assert.isDefined(result);
        assert.strictEqual(result.length, 2);
    });

    it("returns leading comments if position is not 0", () => {
        const result = ts.getLeadingCommentRanges(withTrailing, 1);
        assert.isDefined(result);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].kind, ts.SyntaxKind.SingleLineCommentTrivia);
    });

    it("parses /** block comments ending in hyphen", () => {
        const sourceFile = ts.createSourceFile(
            "file.ts",
            `${endingInHyphen}\nconst x = 1;`,
            ts.ScriptTarget.ESNext,
            true,
        );

        assert.strictEqual(sourceFile.parseDiagnostics.length, 0);
        assert.strictEqual(sourceFile.statements.length, 1);
    });
});
