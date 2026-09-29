import assert from "node:assert";
import test from "node:test";
import type {
    SymbolOwner as ProtocolSymbolOwner,
    SymbolResponse as ProtocolSymbolResponse,
} from "../src/api/proto.generated.ts";
import {
    validateSymbolOwner,
    validateSymbolResponse,
} from "../src/api/proto.ts";
import type { ProjectId } from "../src/api/proto.ts";
import { SourceFileCache } from "../src/api/sourceFileCache.ts";
import type { Path } from "../src/ast/index.ts";
import { SymbolOwnerKind } from "../src/enums/symbolOwnerKind.ts";

test("symbol ownership protocol validation rejects mixed variants", () => {
    const project = "/tsconfig.json" as ProjectId;
    const file = {
        fileName: "/file.ts",
        path: "/file.ts" as Path,
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
            { kind: SymbolOwnerKind.Snapshot, project: "/tsconfig.json" },
            { kind: SymbolOwnerKind.Snapshot, snapshot: 1 },
            { kind: SymbolOwnerKind.Snapshot, snapshot: 1, project: "/tsconfig.json", file },
            { kind: 99 },
        ] as ProtocolSymbolOwner[]
    ) {
        assert.throws(() => validateSymbolOwner(owner), /Invalid .*symbol owner|Invalid symbol owner kind/);
    }
    assert.throws(
        () => validateSymbolResponse({ ...response, reference: { kind: SymbolOwnerKind.Snapshot, id: 1, file } as ProtocolSymbolResponse["reference"] }),
        /Invalid snapshot symbol owner/,
    );
});

test("source file cache resolves references without creating records", () => {
    const cache = new SourceFileCache<object>();
    const file = {
        fileName: "/file.ts",
        path: "/file.ts" as Path,
        contentHash: "0".repeat(32),
        parseOptionsKey: "0",
        scriptKind: 3,
        nodeId: "7",
    };
    assert.strictEqual(cache.findRecord("7"), undefined);
    assert.equal(cache.size, 0);

    const record = cache.getOrCreateRecord(file, 1, "/tsconfig.json");
    assert.strictEqual(cache.findRecord("7"), record);
    cache.releaseSnapshot(1);
    assert.strictEqual(cache.findRecord("7"), undefined);
});
