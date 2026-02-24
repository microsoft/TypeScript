import type {
    Path,
    SourceFile,
    Statement,
} from "@typescript/ast";
import { SyntaxKind } from "@typescript/ast";
import {
    createBlock,
    createFunctionDeclaration,
    createIdentifier,
    createIfStatement,
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
import { RemoteSourceFile } from "../src/node/node.ts";

const NODE_LEN = 24;

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
        assert.strictEqual(metadata >>> 24, 3, "protocol version should be 3");

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
        const offsetNodes = view.getUint32(36, true);
        const rootKind = view.getUint32(offsetNodes + NODE_LEN, true);
        assert.strictEqual(rootKind, SyntaxKind.IfStatement);
    });

    test("protocol version is 3", () => {
        const sf = makeSF("", "/test.ts", []);
        const encoded = encodeSourceFile(sf);
        const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
        assert.strictEqual(view.getUint32(0, true) >>> 24, 3);
    });

    test("boolean properties are encoded", () => {
        const sf = makeSF("", "/test.ts", []);

        // Block with multiLine=true
        const block = createBlock([], true);
        const encoded = encodeNode(block);
        const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
        const offsetNodes = view.getUint32(36, true);
        const data = view.getUint32(offsetNodes + NODE_LEN + 20, true);
        // Bit 24 should be 1 (multiLine)
        assert.strictEqual((data >>> 24) & 1, 1);
    });
});
