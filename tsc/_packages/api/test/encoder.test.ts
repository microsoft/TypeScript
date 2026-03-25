import type {
    Path,
    SourceFile,
    Statement,
} from "@typescript/ast";
import { SyntaxKind } from "@typescript/ast";
import {
    createBlock,
    createExpressionStatement,
    createFunctionDeclaration,
    createIdentifier,
    createIfStatement,
    createJsxAttributes,
    createJsxClosingElement,
    createJsxElement,
    createJsxOpeningElement,
    createPostfixUnaryExpression,
    createPrefixUnaryExpression,
    createSourceFile,
    createToken,
    createVariableDeclaration,
    createVariableDeclarationList,
    createVariableStatement,
} from "@typescript/ast/factory";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import {
    encodeNode,
    encodeSourceFile,
} from "../src/node/encoder.ts";
import {
    RemoteNodeList,
    RemoteSourceFile,
} from "../src/node/node.ts";
import {
    HEADER_OFFSET_NODES,
    NODE_LEN,
    NODE_OFFSET_DATA,
} from "../src/node/protocol.ts";

function makeSF(text: string, fileName: string, statements: readonly Statement[]): SourceFile {
    const endOfFileToken = createToken(SyntaxKind.EndOfFile);
    return createSourceFile(statements, endOfFileToken, text, fileName, fileName as Path);
}

function decode(data: Uint8Array): RemoteSourceFile {
    return new RemoteSourceFile(data, new TextDecoder());
}

describe("Encoder", () => {
    test("encodes empty source file", () => {
        const sf = makeSF("", "/test.ts", []);

        const encoded = encodeSourceFile(sf);
        assert.ok(encoded instanceof Uint8Array);
        assert.ok(encoded.length > 0);

        // Verify header
        const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
        const metadata = view.getUint32(0, true);
        assert.strictEqual(metadata >>> 24, 5, "protocol version should be 5");

        // Verify we can decode it
        const decoded = decode(encoded);
        assert.strictEqual(decoded.kind, SyntaxKind.SourceFile);
        assert.strictEqual(decoded.fileName, "/test.ts");
        assert.strictEqual(decoded.path, "/test.ts");
        assert.strictEqual(decoded.text, "");
    });

    test("encodes source file with identifier", () => {
        const id = createIdentifier("hello");
        const decl = createVariableDeclaration(id, undefined, undefined, undefined);
        const declList = createVariableDeclarationList([decl]);
        const stmt = createVariableStatement(undefined, declList);
        const sf = makeSF("var hello = 42;", "/test.ts", [stmt]);

        const encoded = encodeSourceFile(sf);
        const decoded = decode(encoded);

        assert.strictEqual(decoded.kind, SyntaxKind.SourceFile);
        assert.strictEqual(decoded.text, "var hello = 42;");
        assert.strictEqual(decoded.fileName, "/test.ts");

        const stmts = decoded.statements;
        assert.ok(stmts);
        assert.strictEqual(stmts.length, 1);
        const decodedStmt = stmts.at(0)!;
        assert.strictEqual(decodedStmt.kind, SyntaxKind.VariableStatement);
    });

    test("encodes if statement with optional else", () => {
        const condition = createIdentifier("ok");
        const thenBlock = createBlock([]);
        const ifStmt = createIfStatement(condition, thenBlock, undefined);
        const sf = makeSF("if (ok) {}", "/test.ts", [ifStmt]);

        const encoded = encodeSourceFile(sf);
        const decoded = decode(encoded);
        const stmts = decoded.statements;
        assert.ok(stmts);
        assert.strictEqual(stmts.length, 1);
        const decodedIf = stmts.at(0)!;
        assert.strictEqual(decodedIf.kind, SyntaxKind.IfStatement);
        assert.ok(decodedIf.expression);
        assert.strictEqual(decodedIf.expression.kind, SyntaxKind.Identifier);
        assert.strictEqual(decodedIf.expression.text, "ok");
        assert.ok(decodedIf.thenStatement);
        assert.strictEqual(decodedIf.thenStatement.kind, SyntaxKind.Block);
        // No else
        assert.strictEqual(decodedIf.elseStatement, undefined);
    });

    test("encodes if statement with else", () => {
        const condition = createIdentifier("x");
        const thenBlock = createBlock([]);
        const elseBlock = createBlock([]);
        const ifStmt = createIfStatement(condition, thenBlock, elseBlock);
        const sf = makeSF("if (x) {} else {}", "/test.ts", [ifStmt]);

        const encoded = encodeSourceFile(sf);
        const decoded = decode(encoded);
        const stmts = decoded.statements;
        assert.ok(stmts);
        const decodedIf = stmts.at(0)!;
        assert.strictEqual(decodedIf.kind, SyntaxKind.IfStatement);
        assert.ok(decodedIf.expression);
        assert.ok(decodedIf.thenStatement);
        assert.ok(decodedIf.elseStatement);
        assert.strictEqual(decodedIf.elseStatement.kind, SyntaxKind.Block);
    });

    test("encodes function declaration", () => {
        const name = createIdentifier("foo");
        const body = createBlock([]);
        const fn = createFunctionDeclaration(undefined, undefined, name, undefined, [], undefined, body);
        const sf = makeSF("function foo() {}", "/test.ts", [fn]);

        const encoded = encodeSourceFile(sf);
        const decoded = decode(encoded);
        const stmts = decoded.statements;
        assert.ok(stmts);
        assert.strictEqual(stmts.length, 1);
        const decodedFn = stmts.at(0)!;
        assert.strictEqual(decodedFn.kind, SyntaxKind.FunctionDeclaration);
        assert.ok(decodedFn.name);
        assert.strictEqual(decodedFn.name.kind, SyntaxKind.Identifier);
        assert.strictEqual(decodedFn.name.text, "foo");
        assert.ok(decodedFn.body);
        assert.strictEqual(decodedFn.body.kind, SyntaxKind.Block);
    });

    test("encodes arbitrary node (not source file)", () => {
        const condition = createIdentifier("x");
        const thenBlock = createBlock([]);
        const ifStmt = createIfStatement(condition, thenBlock, undefined);

        const encoded = encodeNode(ifStmt);
        assert.ok(encoded instanceof Uint8Array);

        // Root node at index 1 should be IfStatement
        const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
        const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);
        const rootKind = view.getUint32(offsetNodes + NODE_LEN, true);
        assert.strictEqual(rootKind, SyntaxKind.IfStatement);
    });

    test("protocol version is 5", () => {
        const sf = makeSF("", "/test.ts", []);
        const encoded = encodeSourceFile(sf);
        const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
        assert.strictEqual(view.getUint32(0, true) >>> 24, 5);
    });

    test("boolean properties are encoded", () => {
        // Block with multiLine=true
        const block = createBlock([], true);
        const encoded = encodeNode(block);
        const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
        const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);
        const data = view.getUint32(offsetNodes + NODE_LEN + NODE_OFFSET_DATA, true);
        // Bit 24 should be 1 (multiLine)
        assert.strictEqual((data >>> 24) & 1, 1);
    });

    test("postfix unary operator is preserved through encode/decode", () => {
        const operand = createIdentifier("i");
        const postfix = createPostfixUnaryExpression(operand, SyntaxKind.PlusPlusToken);
        const stmt = createExpressionStatement(postfix);
        const sf = makeSF("i++;", "/test.ts", [stmt]);

        const encoded = encodeSourceFile(sf);
        const decoded = decode(encoded);
        const stmts = decoded.statements;
        assert.ok(stmts);
        const decodedStmt = stmts.at(0)!;
        assert.strictEqual(decodedStmt.kind, SyntaxKind.ExpressionStatement);
        const expr = decodedStmt.expression!;
        assert.strictEqual(expr.kind, SyntaxKind.PostfixUnaryExpression);
        assert.strictEqual(expr.operator, SyntaxKind.PlusPlusToken);
        assert.ok(expr.operand);
        assert.strictEqual(expr.operand.kind, SyntaxKind.Identifier);
    });

    test("prefix unary operator is preserved through encode/decode", () => {
        const operand = createIdentifier("x");
        const prefix = createPrefixUnaryExpression(SyntaxKind.ExclamationToken, operand);
        const stmt = createExpressionStatement(prefix);
        const sf = makeSF("!x;", "/test.ts", [stmt]);

        const encoded = encodeSourceFile(sf);
        const decoded = decode(encoded);
        const stmts = decoded.statements;
        assert.ok(stmts);
        const expr = stmts.at(0)!.expression!;
        assert.strictEqual(expr.kind, SyntaxKind.PrefixUnaryExpression);
        assert.strictEqual(expr.operator, SyntaxKind.ExclamationToken);
    });

    test("postfix decrement operator is preserved", () => {
        const operand = createIdentifier("n");
        const postfix = createPostfixUnaryExpression(operand, SyntaxKind.MinusMinusToken);
        const stmt = createExpressionStatement(postfix);
        const sf = makeSF("n--;", "/test.ts", [stmt]);

        const encoded = encodeSourceFile(sf);
        const decoded = decode(encoded);
        const expr = decoded.statements!.at(0)!.expression!;
        assert.strictEqual(expr.kind, SyntaxKind.PostfixUnaryExpression);
        assert.strictEqual(expr.operator, SyntaxKind.MinusMinusToken);
    });

    test("single-child node with no children returns undefined", () => {
        // JsxAttributes is a single-child node (property: "properties").
        // When the properties NodeList is empty, the encoder skips it,
        // so JsxAttributes has zero encoded children. Accessing .properties
        // must return undefined, not throw "Expected only one child".
        const tagName = createIdentifier("div");
        const emptyAttrs = createJsxAttributes([]);
        const opening = createJsxOpeningElement(tagName, undefined, emptyAttrs);
        const closing = createJsxClosingElement(createIdentifier("div"));
        const jsx = createJsxElement(opening, [], closing);
        const stmt = createVariableStatement(
            undefined,
            createVariableDeclarationList([createVariableDeclaration(createIdentifier("x"), undefined, undefined, jsx)]),
        );
        const sf = makeSF("const x = <div></div>;", "/test.tsx", [stmt]);

        const encoded = encodeSourceFile(sf);
        const decoded = decode(encoded);

        // Walk to JsxOpeningElement → attributes (JsxAttributes)
        const varStmt = decoded.statements!.at(0)!;
        const declList = varStmt.declarationList!;
        const declarationsNode = declList.declarations!;
        assert.ok(declarationsNode instanceof RemoteNodeList);
        const varDecl = declarationsNode.at(0)!;
        const jsxElem = varDecl.initializer!;
        assert.strictEqual(jsxElem.kind, SyntaxKind.JsxElement);
        const openingElem = jsxElem.openingElement!;
        assert.strictEqual(openingElem.kind, SyntaxKind.JsxOpeningElement);
        const attrs = openingElem.attributes!;
        assert.strictEqual(attrs.kind, SyntaxKind.JsxAttributes);
        // Empty properties should return undefined, not throw
        assert.strictEqual(attrs.properties, undefined);
    });
});

describe("UTF-8 vs UTF-16 position encoding", () => {
    // Positions in the encoded AST must be UTF-16 code unit offsets so that
    // file.text.slice(node.pos, node.end) works correctly on JS strings.
    // This is the same convention TypeScript uses.

    function utf8ByteLength(s: string): number {
        return new TextEncoder().encode(s).length;
    }

    // Returns the UTF-16 code unit position of a substring in a source string
    function utf16Pos(source: string, substring: string): { pos: number; end: number; } {
        const pos = source.indexOf(substring);
        return { pos, end: pos + substring.length };
    }

    test("ASCII: text.slice(pos, end) works", () => {
        const source = "const x = 1;";
        assert.strictEqual(source.length, utf8ByteLength(source));

        const { pos, end } = utf16Pos(source, "x");
        assert.strictEqual(source.slice(pos, end), "x");
    });

    test("2-byte char: text.slice(pos, end) works", () => {
        // é (U+00E9) is 1 UTF-16 code unit but 2 UTF-8 bytes
        const source = "const café = 1;\nconst x = 2;";
        assert.strictEqual(source.length, 28); // UTF-16 code units
        assert.strictEqual(utf8ByteLength(source), 29); // UTF-8 bytes (1 extra from é)

        const { pos, end } = utf16Pos(source, "x");
        assert.strictEqual(source.slice(pos, end), "x");

        // Positions after multi-byte characters must be UTF-16 code unit offsets, not UTF-8 byte offsets
        assert.strictEqual(pos, 22); // UTF-16 position
        assert.notStrictEqual(pos, 23); // NOT the UTF-8 byte offset
    });

    test("4-byte char (supplementary plane): text.slice(pos, end) works", () => {
        // 🎉 (U+1F389) is 2 UTF-16 code units (surrogate pair) but 4 UTF-8 bytes
        const source = 'const a = "🎉";\nconst b = 2;';
        assert.strictEqual(source.length, 28); // UTF-16 code units
        assert.strictEqual(utf8ByteLength(source), 30); // 2 extra bytes from 🎉

        const { pos, end } = utf16Pos(source, "b");
        assert.strictEqual(source.slice(pos, end), "b");

        // Must use UTF-16 offset, not UTF-8 byte offset
        assert.strictEqual(pos, 22); // UTF-16 position
        assert.notStrictEqual(pos, 24); // NOT the UTF-8 byte offset (shifted by 2)
    });

    test("multi-byte identifier: text.slice(pos, end) works", () => {
        // Identifier "café" has 4 UTF-16 code units but 5 UTF-8 bytes
        const source = "let café = 1;";

        const { pos, end } = utf16Pos(source, "café");
        assert.strictEqual(source.slice(pos, end), "café");
        assert.strictEqual(end - pos, 4); // UTF-16 length, not UTF-8 byte length (5)
    });
});
