import assert from "node:assert";
import { test } from "node:test";
import {
    documentURIToFileName,
    fileNameToDocumentURI,
    getRootLength,
} from "../src/api/path.ts";

test("non-file document URIs preserve structured identity", () => {
    const uris = [
        "untitled:folder/../file.ts",
        "vscode-vfs://github/path//file.ts",
        "custom:/path/./file.ts/",
        "custom:",
        "custom:///path",
        "custom://authority",
        "custom://authority/",
        "custom:path/file.ts?rev=a/b#frag/c",
        "custom://authority/path/file.ts#frag/a",
        String.raw`custom:path\file.ts`,
        "custom:.git/file.ts",
        "custom:..hidden/file.ts",
        "custom://~ts-uri~/path",
        "custom://ts-nul-authority/path",
        "custom:~ts-uri~v2~file.ts",
        "custom://authority/~ts-uri-no-path~v2~~",
    ];

    for (const uri of uris) {
        assert.strictEqual(fileNameToDocumentURI(documentURIToFileName(uri)), uri);
    }

    assert.ok(getRootLength(documentURIToFileName("custom://authority/path")) > 2);
    assert.notStrictEqual(
        documentURIToFileName("custom:name.ts\\"),
        documentURIToFileName("custom:name..ts"),
    );
});
