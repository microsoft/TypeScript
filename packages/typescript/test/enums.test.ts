import assert from "node:assert/strict";
import { test } from "node:test";
import { ScriptKind as ProtocolScriptKind } from "../src/api/proto.ts";
import { ScriptKind as ASTScriptKind } from "../src/ast/index.ts";
import { InternalSymbolName } from "../src/enums/internalSymbolName.js";
import { ScriptKind } from "../src/enums/scriptKind.js";
import { ScriptTarget } from "../src/enums/scriptTarget.js";

test("enum modules preserve runtime values, reverse mappings, and shared identity", () => {
    const kind: ScriptKind.TS = ScriptKind.TS;
    assert.equal(kind, 3);
    assert.equal(ScriptKind[kind], "TS");
    assert.equal(ScriptTarget.Latest, ScriptTarget.ESNext);
    assert.equal(InternalSymbolName.Call, "__call");
    assert.strictEqual(ProtocolScriptKind, ScriptKind);
    assert.strictEqual(ASTScriptKind, ScriptKind);
});

test("enum declarations preserve enum and member types", () => {
    // @ts-expect-error Values outside the enum are not assignable.
    const invalid: ScriptKind = 123;
    // @ts-expect-error Distinct enum members are not assignable.
    const wrongMember: ScriptKind.TS = ScriptKind.JS;
    // @ts-expect-error String enums do not accept plain strings.
    const plainString: InternalSymbolName = "__call";
    assert.equal(invalid, 123);
    assert.equal(wrongMember, ScriptKind.JS);
    assert.equal(plainString, "__call");
});
