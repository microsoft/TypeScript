import assert from "node:assert/strict";
import test from "node:test";

import * as vscode from "vscode";
import {
    type ContentMapperVirtualFilesProvider,
    registerContentMapperVirtualDocumentProvider,
    showVirtualDocumentsCommand,
} from "../src/contentMapperVirtualDocuments";
import type { MappedOutput } from "../src/contentMapperVirtualFiles";
import { mockVscode } from "./vscodeMock";

test.beforeEach(() => mockVscode.reset());

test("restores a virtual URI through the backend", async t => {
    const backend = new FakeBackend();
    const sourceUri = vscode.Uri.file("/workspace/component.vue");
    const virtualUri = virtualUriFor(sourceUri);
    backend.requests.push(Promise.resolve([output("restored", "one")]));
    const disposable = registerProvider(backend);
    t.after(() => disposable.dispose());

    assert.equal(Buffer.from(await mockVscode.fileSystemProvider.readFile(virtualUri)).toString(), "restored");
    assert.deepEqual(backend.requestedUris, [sourceUri.toString()]);
});

test("ignores an older overlapping refresh response", async t => {
    const backend = new FakeBackend();
    const sourceUri = vscode.Uri.file("/workspace/component.vue");
    const virtualUri = virtualUriFor(sourceUri);
    backend.requests.push(Promise.resolve([output("initial", "one")]));
    const disposable = registerProvider(backend);
    t.after(() => disposable.dispose());
    await mockVscode.fileSystemProvider.readFile(virtualUri);

    const first = deferred<readonly MappedOutput[]>();
    const second = deferred<readonly MappedOutput[]>();
    backend.requests.push(first.promise, second.promise);
    const editor = sourceEditor(sourceUri);
    mockVscode.fireActiveEditor(editor);
    mockVscode.fireActiveEditor(editor);
    second.resolve([output("newest", "three")]);
    await second.promise;
    await tick();
    first.resolve([output("stale", "two")]);
    await first.promise;
    await tick();

    assert.equal(Buffer.from(await mockVscode.fileSystemProvider.readFile(virtualUri)).toString(), "newest");
});

test("purges virtual files when the source is deleted", async t => {
    const backend = new FakeBackend();
    const sourceUri = vscode.Uri.file("/workspace/component.vue");
    const virtualUri = virtualUriFor(sourceUri);
    backend.requests.push(Promise.resolve([output("initial", "one")]));
    const disposable = registerProvider(backend);
    t.after(() => disposable.dispose());
    await mockVscode.fileSystemProvider.readFile(virtualUri);

    mockVscode.fireDelete(sourceUri);

    assert.deepEqual(
        mockVscode.fileChanges.map(change => [change.type, change.uri.toString()]),
        [[vscode.FileChangeType.Deleted, virtualUri.toString()]],
    );
});

test("purges stale outputs when the command finds no mapped files", async t => {
    const backend = new FakeBackend();
    const sourceUri = vscode.Uri.file("/workspace/component.vue");
    const virtualUri = virtualUriFor(sourceUri);
    backend.requests.push(
        Promise.resolve([output("initial", "one")]),
        Promise.resolve([]),
    );
    const disposable = registerProvider(backend);
    t.after(() => disposable.dispose());
    await mockVscode.fileSystemProvider.readFile(virtualUri);
    mockVscode.setActiveEditor(sourceEditor(sourceUri));

    await mockVscode.runCommand(showVirtualDocumentsCommand);

    assert.deepEqual(
        mockVscode.fileChanges.map(change => [change.type, change.uri.toString()]),
        [[vscode.FileChangeType.Deleted, virtualUri.toString()]],
    );
});

test("evicts cached outputs after the last virtual document closes", async t => {
    const backend = new FakeBackend();
    const sourceUri = vscode.Uri.file("/workspace/component.vue");
    const virtualUri = virtualUriFor(sourceUri);
    backend.requests.push(
        Promise.resolve([output("initial", "one")]),
        Promise.resolve([output("reloaded", "two")]),
    );
    const disposable = registerProvider(backend);
    t.after(() => disposable.dispose());
    const document = { uri: virtualUri };
    mockVscode.setTextDocuments(document);
    await mockVscode.fileSystemProvider.readFile(virtualUri);

    mockVscode.setTextDocuments();
    mockVscode.fireClose(document);
    await tick();

    assert.equal(Buffer.from(await mockVscode.fileSystemProvider.readFile(virtualUri)).toString(), "reloaded");
    assert.equal(backend.requestedUris.length, 2);
});

class FakeBackend implements ContentMapperVirtualFilesProvider {
    readonly initialized = new vscode.EventEmitter<void>();
    readonly synchronized = new vscode.EventEmitter<void>();
    readonly onDidInitializeLanguageServer = this.initialized.event;
    readonly onDidSynchronizeContentMapperContributions = this.synchronized.event;
    readonly requests: Promise<readonly MappedOutput[]>[] = [];
    readonly requestedUris: string[] = [];

    getContentMapperVirtualFiles(uri: vscode.Uri): Promise<readonly MappedOutput[]> {
        this.requestedUris.push(uri.toString());
        const request = this.requests.shift();
        assert.ok(request, "Unexpected backend request");
        return request;
    }

    async isContentMapped(): Promise<boolean> {
        return true;
    }
}

function registerProvider(backend: FakeBackend): vscode.Disposable {
    return registerContentMapperVirtualDocumentProvider(backend, {
        error() {},
        warn() {},
        debug() {},
    } as unknown as vscode.LogOutputChannel);
}

function output(text: string, hash: string): MappedOutput {
    return {
        key: "0",
        fileName: "/workspace/component.vue.ts",
        hash,
        text,
        originalText: "",
        scriptKind: 3,
        mappings: [],
        diagnosticDirectives: [],
    };
}

function virtualUriFor(sourceUri: vscode.Uri): vscode.Uri {
    return vscode.Uri.from({
        scheme: "typescript-content-mapper",
        path: "/component.vue.ts",
        query: new URLSearchParams({
            source: sourceUri.toString(),
            output: "0",
        }).toString(),
    });
}

function sourceEditor(uri: vscode.Uri): vscode.TextEditor {
    return {
        document: {
            uri,
            offsetAt: () => 0,
        },
        selection: { active: new vscode.Position(0, 0) },
        setDecorations() {},
    } as vscode.TextEditor;
}

function deferred<T>(): { promise: Promise<T>; resolve(value: T): void; } {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>(r => resolve = r);
    return { promise, resolve };
}

function tick(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 0));
}
