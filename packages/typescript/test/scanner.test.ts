import {
    createScanner,
    identifierToKeywordKind,
    SyntaxKind,
} from "@typescript/typescript/ast";
import { createIdentifier } from "@typescript/typescript/ast/factory";
import assert from "node:assert";
import { test } from "node:test";

test("identifierToKeywordKind recognizes reserved, contextual, and type keywords", () => {
    assert.strictEqual(identifierToKeywordKind(createIdentifier("class")), SyntaxKind.ClassKeyword);
    assert.strictEqual(identifierToKeywordKind(createIdentifier("async")), SyntaxKind.AsyncKeyword);
    assert.strictEqual(identifierToKeywordKind(createIdentifier("constructor")), SyntaxKind.ConstructorKeyword);
    assert.strictEqual(identifierToKeywordKind(createIdentifier("string")), SyntaxKind.StringKeyword);
    for (const text of ["ordinary", "immediate", "Class", "__type", "toString", "__proto__", "{"]) {
        assert.strictEqual(identifierToKeywordKind(createIdentifier(text)), undefined);
    }
    const scanner = createScanner(true);
    scanner.setText("\\u0074ype");
    scanner.scan();
    assert.strictEqual(identifierToKeywordKind(createIdentifier(scanner.getTokenValue())), SyntaxKind.TypeKeyword);
});

test("the scanner recognizes immediate as an identifier", () => {
    const scanner = createScanner(true);
    scanner.setText("immediate value");
    assert.strictEqual(scanner.scan(), SyntaxKind.Identifier);
    assert.strictEqual(scanner.getTokenValue(), "immediate");
    assert.strictEqual(scanner.scan(), SyntaxKind.Identifier);
});

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
