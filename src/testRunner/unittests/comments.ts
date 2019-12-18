namespace ts {
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
        it("skips shebang", () => {
            const result = getLeadingCommentRanges(withShebang, 0);
            assert.isDefined(result);
            assert.strictEqual(result!.length, 2);
        });

        it("treats all comments at start of file as leading comments", () => {
            const result = getLeadingCommentRanges(noShebang, 0);
            assert.isDefined(result);
            assert.strictEqual(result!.length, 2);
        });

        it("returns leading comments if position is not 0", () => {
            const result = getLeadingCommentRanges(withTrailing, 1);
            assert.isDefined(result);
            assert.strictEqual(result!.length, 1);
            assert.strictEqual(result![0].kind, SyntaxKind.SingleLineCommentTrivia);
        });
    });
}
