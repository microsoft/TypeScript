import assert from "node:assert";
import test from "node:test";
import { SymbolOwnerKind } from "../enums/symbolOwnerKind.js";
import { encodeFileSystemCallbackResult } from "../src/api/fsCallbacks.ts";
import type {
    SymbolOwner as ProtocolSymbolOwner,
    SymbolResponse as ProtocolSymbolResponse,
} from "../src/api/proto.generated.ts";
import {
    resolveFileName,
    validateSymbolOwner,
    validateSymbolResponse,
} from "../src/api/proto.ts";
import type {
    DocumentIdentifier,
    ProjectId,
} from "../src/api/proto.ts";
import { SourceFileCache } from "../src/api/sourceFileCache.ts";
import type {
    PathKey,
    RootedFilePath,
} from "../src/ast/index.ts";

test("document identifier validation rejects nullish and malformed values", () => {
    const invalidIdentifiers: [unknown, string][] = [
        [JSON.parse("null"), "null"],
        [undefined, "undefined"],
        [0, "0"],
        [{ uri: undefined }, "an object with keys: uri"],
    ];
    for (const [identifier, received] of invalidIdentifiers) {
        assert.throws(() => resolveFileName(identifier as DocumentIdentifier), {
            name: "TypeError",
            message: `Expected a string or { uri } for the document, received ${received}`,
        });
    }
});

test("filesystem callback results reject nullish and other invalid entries", () => {
    const invalidResults: unknown[] = [JSON.parse("null"), undefined, false, 0];
    for (const result of invalidResults) {
        assert.throws(() => encodeFileSystemCallbackResult("getAccessibleEntries", result), {
            name: "TypeError",
            message: "Invalid result from filesystem callback 'getAccessibleEntries'",
        });
    }
});

test("symbol ownership protocol validation rejects mixed variants", () => {
    const project = 1;
    const file = {
        fileName: "/file.ts" as RootedFilePath,
        path: "/file.ts" as PathKey,
        contentHash: "0".repeat(32),
        parseOptionsKey: "0",
        scriptKind: 3,
        nodeId: "1",
    };
    const fileReference = { kind: SymbolOwnerKind.File, id: 1, file };
    const snapshotOwner = { kind: SymbolOwnerKind.Snapshot, snapshot: 1, project };
    validateSymbolOwner(snapshotOwner);
    const response: ProtocolSymbolResponse = {
        reference: fileReference,
        name: "symbol",
        flags: 0,
        checkFlags: 0,
    };
    validateSymbolResponse(response);

    for (
        const owner of [
            { kind: SymbolOwnerKind.File },
            { kind: SymbolOwnerKind.File, file, snapshot: 1 },
            { kind: SymbolOwnerKind.Snapshot, project },
            { kind: SymbolOwnerKind.Snapshot, snapshot: 1 },
            { kind: SymbolOwnerKind.Snapshot, snapshot: 1, project, file },
            { kind: 99 },
        ] as ProtocolSymbolOwner[]
    ) {
        assert.throws(() => validateSymbolOwner(owner), /Invalid .*symbol owner/);
    }
    assert.throws(
        () => validateSymbolResponse({ ...response, reference: { kind: SymbolOwnerKind.Snapshot, id: 1, file } }),
        /Invalid snapshot symbol owner/,
    );
});

test("source file cache resolves references without creating records", () => {
    const cache = new SourceFileCache<object>();
    const project = "/tsconfig.json" as ProjectId;
    const file = {
        fileName: "/file.ts" as RootedFilePath,
        path: "/file.ts" as PathKey,
        contentHash: "0".repeat(32),
        parseOptionsKey: "0",
        scriptKind: 3,
        nodeId: "7",
    };
    assert.strictEqual(cache.findRecord("7"), /*expected*/ undefined);
    assert.equal(cache.size, 0);

    const record = cache.getOrCreateRecord(file, 1, project);
    assert.strictEqual(cache.findRecord("7"), record);
    cache.releaseSnapshot(1);
    assert.strictEqual(cache.findRecord("7"), /*expected*/ undefined);
});

test("source file cache transfers record ownership between snapshots", () => {
    const cache = new SourceFileCache<object>();
    const project = "/tsconfig.json" as ProjectId;
    const file = {
        fileName: "/file.ts" as RootedFilePath,
        path: "/file.ts" as PathKey,
        contentHash: "0".repeat(32),
        parseOptionsKey: "0",
        scriptKind: 3,
        nodeId: "7",
    };
    const record = cache.getOrCreateRecord(file, 1, project);

    // Reusing an object from this record in another snapshot gives that
    // snapshot an independent owner. Releasing the original owner must not
    // evict the shared record.
    cache.retainRecord(record, 2, project);
    cache.releaseSnapshot(1);
    assert.strictEqual(cache.findRecord("7"), record);

    // The record is evicted once its final snapshot owner is released, and a
    // stale wrapper cannot resurrect the evicted record.
    cache.releaseSnapshot(2);
    assert.strictEqual(cache.findRecord("7"), /*expected*/ undefined);
    assert.throws(() => cache.retainRecord(record, 3, project), /is no longer cached/);
});
