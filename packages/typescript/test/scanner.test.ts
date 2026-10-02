import {
    createScanner,
    SyntaxKind,
} from "@typescript/typescript/unstable/ast";
import assert from "node:assert";
import { test } from "node:test";

test("scanJsDocToken respects a range ending in a hyphen", () => {
    const text = "/** x-yy";
    const scanner = createScanner(/*skipTrivia*/ true);
    scanner.setText(text);

    scanner.scanRange(3, text.length - 5, () => {
        const tokens = [];
        while (scanner.scanJsDocToken() !== SyntaxKind.EndOfFile) {
            tokens.push([scanner.getToken(), scanner.getTokenText()]);
        }
        assert.deepStrictEqual(tokens, [
            [SyntaxKind.WhitespaceTrivia, " "],
            [SyntaxKind.Identifier, "x-"],
        ]);
    });
});
