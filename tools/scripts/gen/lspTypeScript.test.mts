import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import ts from "typescript";
import { getTypeScriptModel } from "../lsp/generate.mts";
import { getMiddlewareMethods } from "../lsp/generateTypeScript.mts";
import type {
    MetaModel,
    Type,
} from "../lsp/metaModelSchema.mts";
import { generateTypeScript } from "../lsp/typeScript.mts";

function fixture(): MetaModel {
    return {
        metaData: { version: "3.18.0" },
        requests: [{
            method: "test/feature",
            messageDirection: "clientToServer",
            params: { kind: "reference", name: "Child" },
            result: { kind: "reference", name: "Result" },
        }],
        notifications: [],
        enumerations: [
            { name: "Kind", type: { kind: "base", name: "string" }, values: [{ name: "First", value: "first" }, { name: "Second", value: "second" }] },
            { name: "OpenKind", type: { kind: "base", name: "integer" }, values: [{ name: "First", value: 1 }], supportsCustomValues: true },
        ],
        structures: [
            { name: "Parent", properties: [{ name: "inherited", type: { kind: "base", name: "string" } }, { name: "override", type: { kind: "base", name: "integer" } }] },
            { name: "Mixin", properties: [{ name: "mixed", type: { kind: "reference", name: "Kind" } }] },
            {
                name: "Child",
                extends: [{ kind: "reference", name: "Parent" }],
                mixins: [{ kind: "reference", name: "Mixin" }],
                properties: [
                    { name: "override", type: { kind: "base", name: "boolean" } },
                    { name: "optional", type: { kind: "reference", name: "OpenKind" }, optional: true },
                    { name: "zero", type: { kind: "base", name: "boolean" }, omitzeroValue: true },
                    { name: "recursive", type: { kind: "reference", name: "Child" }, optional: true },
                    { name: "uri", type: { kind: "base", name: "DocumentUri" } },
                    { name: "map", type: { kind: "map", key: { kind: "base", name: "string" }, value: { kind: "reference", name: "Kind" } } },
                    { name: "tuple", type: { kind: "tuple", items: [{ kind: "base", name: "integer" }, { kind: "stringLiteral", value: "tuple" }] } },
                    { name: "intersection", type: { kind: "and", items: [{ kind: "literal", value: { properties: [{ name: "flag", type: { kind: "booleanLiteral", value: true } }] } }, { kind: "literal", value: { properties: [{ name: "number", type: { kind: "integerLiteral", value: 2 } }] } }] } },
                ],
            },
            { name: "UnusedLifecycle", properties: [] },
        ],
        typeAliases: [{
            name: "Result",
            type: { kind: "or", items: [{ kind: "array", element: { kind: "reference", name: "Child" } }, { kind: "base", name: "null" }] },
        }],
    };
}

test("LSP TypeScript generation traverses reachable types and preserves wire shapes", () => {
    const model = fixture();
    const before = structuredClone(model);
    const output = generateTypeScript(model, ["test/feature"]);
    assert.deepEqual(model, before);
    assert.equal(output, generateTypeScript(model, ["test/feature"]));
    assert.match(output, /"inherited": string/);
    assert.match(output, /"mixed": Kind/);
    assert.match(output, /"override": boolean/);
    assert.doesNotMatch(output, /"override": number/);
    assert.match(output, /"optional"\?: OpenKind \| undefined/);
    assert.match(output, /"zero"\?: boolean \| undefined/);
    assert.match(output, /"recursive"\?: Child \| undefined/);
    assert.match(output, /export type DocumentUri = string/);
    assert.match(output, /export type Kind = "first" \| "second"/);
    assert.match(output, /export type OpenKind = 1 \| number/);
    assert.match(output, /export type Result = Child\[\] \| null;/);
    assert.doesNotMatch(output, /UnusedLifecycle|export interface Parent|export interface Mixin/);
    const file = ts.createSourceFile("generated.ts", output, ts.ScriptTarget.Latest, true);
    assert.ok(file.statements.every(statement => ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)));
});

test("LSP TypeScript generation parenthesizes only lower-precedence types", () => {
    const model = fixture();
    const a: Type = { kind: "reference", name: "Child" };
    const b: Type = { kind: "reference", name: "Parent" };
    const c: Type = { kind: "reference", name: "Mixin" };
    const union: Type = { kind: "or", items: [a, b] };
    const intersection: Type = { kind: "and", items: [a, b] };
    const cases: [Type, string][] = [
        [{ kind: "array", element: a }, "Child[]"],
        [{ kind: "array", element: { kind: "array", element: a } }, "Child[][]"],
        [union, "Child | Parent"],
        [intersection, "Child & Parent"],
        [{ kind: "array", element: union }, "(Child | Parent)[]"],
        [{ kind: "array", element: intersection }, "(Child & Parent)[]"],
        [{ kind: "and", items: [union, c] }, "(Child | Parent) & Mixin"],
        [{ kind: "or", items: [intersection, c] }, "Child & Parent | Mixin"],
        [{ kind: "tuple", items: [union, intersection] }, "[Child | Parent, Child & Parent]"],
    ];
    for (const [result, expected] of cases) {
        model.requests[0].result = result;
        const output = generateTypeScript(model, ["test/feature"]);
        assert.ok(output.includes(`result: ${expected};`), expected);
    }
});

test("LSP TypeScript generation reports invalid schema and method inputs", () => {
    assert.throws(() => generateTypeScript(fixture(), ["missing/feature"]), /Not a client-to-server request/);
    assert.throws(() => generateTypeScript(fixture(), ["test/feature", "test/feature"]), /Duplicate/);
    const serverRequest = fixture();
    serverRequest.requests[0].messageDirection = "serverToClient";
    assert.throws(() => generateTypeScript(serverRequest, ["test/feature"]), /Not a client-to-server request/);
    const unknown = fixture();
    unknown.requests[0].result = { kind: "reference", name: "Missing" };
    assert.throws(() => generateTypeScript(unknown, ["test/feature"]), /Unknown LSP type Missing/);
    const cycle = fixture();
    cycle.structures[0].extends = [{ kind: "reference", name: "Child" }];
    assert.throws(() => generateTypeScript(cycle, ["test/feature"]), /Cyclic inheritance/);
});

test("middleware allowlist parsing rejects nonliteral or disabled entries", () => {
    assert.deepEqual(getMiddlewareMethods('const supportedMethods = { "textDocument/hover": true };'), ["textDocument/hover"]);
    for (const source of ["const supportedMethods = {}; const other = {};", "const supportedMethods = methods;", 'const supportedMethods = { "textDocument/hover": false };', "const supportedMethods = { ...methods };"]) {
        if (source.includes("supportedMethods = {}")) {
            assert.deepEqual(getMiddlewareMethods(source), []);
        }
        else {
            assert.throws(() => getMiddlewareMethods(source), /Middleware/);
        }
    }
});

test("committed TypeScript protocol types are reproducible from the shared model", () => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const outputPath = path.join(root, "packages/typescript/src/vscode/protocol.generated.ts");
    const methods = getMiddlewareMethods(fs.readFileSync(path.join(root, "packages/vscode-typescript/src/lspMiddleware.ts"), "utf8"));
    const output = generateTypeScript(getTypeScriptModel(), methods);
    const formatted = execFileSync(path.join(root, "node_modules/.bin/dprint"), ["fmt", "--stdin", outputPath], { input: output, encoding: "utf8" });
    assert.equal(formatted, fs.readFileSync(outputPath, "utf8"));
    const file = ts.createSourceFile("generated.ts", output, ts.ScriptTarget.Latest, true);
    assert.ok(file.statements.every(statement => ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)));
    assert.doesNotMatch(output, /CompletionItemData|InitializeParams|Shutdown/);
    assert.match(output, /"verbosityLevel"\?: number \| undefined/);
    assert.match(output, /"canIncreaseVerbosity"\?: boolean \| undefined/);
    assert.match(output, /"data"\?: LSPAny \| undefined/);
    assert.match(output, /"custom\/textDocument\/sourceDefinition"/);
    assert.match(output, /"textDocument\/_vs_onAutoInsert"/);
    assert.match(output, /"textDocument\/_vs_references"/);
});

test("wire model snapshots do not expose Go-specific opaque data structures", () => {
    const model = getTypeScriptModel();
    const completion = model.structures.find(structure => structure.name === "CompletionItem");
    assert.deepEqual(completion?.properties.find(property => property.name === "data")?.type, { kind: "reference", name: "LSPAny" });
    model.requests[0].method = "modified/by/test";
    assert.notEqual(getTypeScriptModel().requests[0].method, "modified/by/test");
});
