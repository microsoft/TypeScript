import { API } from "@typescript/typescript/sync";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import {
    analyzePublicApi,
    checkPublicApi,
    type PublicApiDiagnostic,
} from "../scripts/checkPublicApi.ts";

const tsconfig = JSON.stringify({ compilerOptions: { module: "nodenext", strict: true, noEmit: true } });

function lint(
    files: Record<string, string>,
    options: { entrypoints?: string[]; sameEntrypoint?: string[]; } = {},
    inspectApi?: (api: API) => void,
): PublicApiDiagnostic[] {
    const directory = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "public-api-types-")));
    try {
        for (const [file, text] of Object.entries({ "tsconfig.json": tsconfig, ...files })) {
            fs.mkdirSync(path.dirname(path.join(directory, file)), { recursive: true });
            fs.writeFileSync(path.join(directory, file), text);
        }
        const entrypoints = (options.entrypoints ?? ["index.ts"]).map(file => path.resolve(directory, file));
        const api = new API({ cwd: directory, collectTiming: !!inspectApi });
        try {
            const snapshot = api.createSnapshot({ openFiles: entrypoints });
            try {
                const project = snapshot.getDefaultProjectForFile(entrypoints[0]);
                assert.ok(project);
                const diagnostics = checkPublicApi(entrypoints[0], options.sameEntrypoint ?? [], analyzePublicApi(api, project, entrypoints));
                inspectApi?.(api);
                return diagnostics;
            }
            finally {
                snapshot.dispose();
            }
        }
        finally {
            api.close();
        }
    }
    finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
}

const messagesOf = (files: Record<string, string>): string[] => lint(files).map(message => message.message);
const missing = (name: string): string => `Public API references '${name}', but this type is not exported from any public entrypoint.`;

test("batches independent references and overload queries", () => {
    const fields = Array.from({ length: 64 }, (_, index) => `field${index}: Hidden;`).join("\n");
    const methods = Array.from({ length: 32 }, (_, index) => `
        method${index}(value: string): void;
        method${index}(value: Hidden): void {}
    `).join("\n");
    let requestCount: number | undefined;
    const diagnostics = lint(
        {
            "index.ts": `
            import { Hidden } from "./types.js";
            export { Hidden } from "./types.js";
            export interface Public { ${fields} }
            export class Methods { ${methods} }
        `,
            "types.ts": "export interface Hidden {}",
        },
        {},
        api => {
            requestCount = api.getTimingInfo().totals.requestCount;
        },
    );
    assert.deepEqual(diagnostics, []);
    assert.ok(requestCount !== undefined && requestCount < 24, `Expected batched queries, got ${requestCount} IPC requests`);
});

test("accepts types exported by another entrypoint but reports unexported transitive types", () => {
    const files = {
        "index.ts": 'import { Shared } from "./types.js"; export interface Public { value: Shared; }',
        "other.ts": 'export { Shared } from "./types.js";',
        "types.ts": "export interface Shared { hidden: Hidden; } export interface Hidden {}",
    };
    const options = { entrypoints: ["index.ts", "other.ts"] };
    assert.deepEqual(lint(files, options).map(message => message.messageId), ["missingExport"]);
    assert.match(lint(files, options)[0].message, /Hidden/);
    files["other.ts"] += ' export { Hidden } from "./types.js";';
    assert.deepEqual(lint(files, options), []);
});

test("requires a selected export's transitive types and enum values from the same entrypoint", () => {
    const files = {
        "index.ts": `
            import { Other } from "./types.js";
            export { Options } from "./types.js";
            export type { Kind } from "./types.js";
            export interface Unrelated { other: Other; }
        `,
        "other.ts": 'export { Chain, Leaf, Kind, Other } from "./types.js";',
        "types.ts": `
            export interface Options { chain: Chain; kind: Kind; }
            export interface Chain { leaf: Leaf; }
            export interface Leaf {}
            export enum Kind { One }
            export interface Other {}
        `,
    };
    const options = { entrypoints: ["index.ts", "other.ts"], sameEntrypoint: ["Options"] };
    assert.deepEqual(lint(files, options).map(message => [message.messageId, message.message.match(/'(.*?)'/)?.[1]]), [
        ["missingEntrypointExport", "Chain"],
        ["missingEntrypointExport", "Leaf"],
        ["missingEntrypointValueExport", "Kind"],
    ]);
    files["index.ts"] = files["index.ts"].replace("export type { Kind }", "export { Chain, Leaf, Kind }");
    assert.deepEqual(lint(files, options), []);
});

test("reports when a required root export is missing", () => {
    const messages = lint(
        { "index.ts": "export interface Other {}" },
        { entrypoints: ["index.ts"], sameEntrypoint: ["Options"] },
    );
    assert.deepEqual(messages.map(message => message.messageId), ["missingRequiredExport"]);
    assert.match(messages[0].message, /Options/);
});

test("only counts enum value exports and non-internal exports from other entrypoints", () => {
    const files = {
        "index.ts": 'import { Kind, Hidden } from "./types.js"; export interface Public { kind: Kind; hidden: Hidden; }',
        "other.ts": `
            export type { Kind } from "./types.js";
            /** @internal */
            export { Hidden } from "./types.js";
        `,
        "types.ts": "export enum Kind { One } export interface Hidden {}",
    };
    const options = { entrypoints: ["index.ts", "other.ts"] };
    assert.deepEqual(lint(files, options).map(message => message.messageId), ["missingValueExport", "missingExport"]);
    files["other.ts"] = 'export { Kind, Hidden } from "./types.js";';
    assert.deepEqual(lint(files, options), []);
});

test("does not mistake an unrelated type with the same name for a public export", () => {
    const files = {
        "index.ts": 'import { Item } from "./hidden.js"; export interface Public { item: Item; }',
        "other.ts": 'export { Item } from "./types.js";',
        "hidden.ts": "export interface Item { hidden: true; }",
        "types.ts": "export interface Item { public: true; }",
    };
    const messages = lint(files, { entrypoints: ["index.ts", "other.ts"] });
    assert.deepEqual(messages.map(message => message.messageId), ["missingExport"]);
    assert.match(messages[0].message, /Item/);
});

test("reports public type references that cannot be resolved", () => {
    const messages = lint({ "index.ts": "export interface Public { value: Missing; }" });
    assert.deepEqual(messages.map(message => message.messageId), ["unresolvedReference"]);
});

test("analyzes the current source files", () => {
    const files = {
        "index.ts": "export interface Public {}",
        "types.ts": "export interface Hidden {}",
    };
    assert.deepEqual(lint(files), []);
    files["index.ts"] = 'import { Hidden } from "./types.js"; export interface Public { value: Hidden; }';
    const [diagnostic] = lint(files);
    assert.equal(diagnostic.message, missing("Hidden"));
    assert.equal(path.basename(diagnostic.file), "index.ts");
    assert.equal(path.basename(diagnostic.entrypoint), "index.ts");
    assert.equal(diagnostic.line, 1);
    assert.equal(diagnostic.character, files["index.ts"].lastIndexOf("Hidden") + 1);
});

test("standalone command reports errors and exits nonzero", () => {
    const directory = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "public-api-command-")));
    try {
        fs.mkdirSync(path.join(directory, "scripts"));
        fs.mkdirSync(path.join(directory, "src"));
        fs.mkdirSync(path.join(directory, "node_modules", "@typescript"), { recursive: true });
        fs.symlinkSync(path.resolve(import.meta.dirname, ".."), path.join(directory, "node_modules", "@typescript", "typescript"), "junction");
        fs.copyFileSync(path.resolve(import.meta.dirname, "../scripts/checkPublicApi.ts"), path.join(directory, "scripts/checkPublicApi.ts"));
        fs.writeFileSync(
            path.join(directory, "package.json"),
            JSON.stringify({
                type: "module",
                exports: {
                    ".": { "@typescript/source": "./src/index.ts" },
                    "./async": { "@typescript/source": "./src/async.ts" },
                },
            }),
        );
        fs.writeFileSync(path.join(directory, "tsconfig.json"), tsconfig);
        const source = path.join(directory, "src/index.ts");
        const asyncSource = path.join(directory, "src/async.ts");
        fs.writeFileSync(asyncSource, "export interface CompilerOptions {}");
        fs.writeFileSync(source, "interface Hidden {} export interface Public { value: Hidden; }");
        const run = () => spawnSync(process.execPath, ["--conditions", "@typescript/source", path.join(directory, "scripts/checkPublicApi.ts")], { encoding: "utf8" });
        const failed = run();
        assert.equal(failed.status, 1, failed.stderr);
        assert.match(failed.stderr, /index\.ts:1:\d+: Public API references 'Hidden'/);
        fs.writeFileSync(source, "export interface Hidden {} export interface Public { value: Hidden; }");
        const passed = run();
        assert.equal(passed.status, 0, passed.stderr);
        assert.equal(passed.stderr, "");

        fs.writeFileSync(asyncSource, 'import type { Hidden } from "./index.js"; export interface CompilerOptions { hidden: Hidden; }');
        const missingDependency = run();
        assert.equal(missingDependency.status, 1, missingDependency.stderr);
        assert.match(missingDependency.stderr, /Type 'Hidden', referenced by 'CompilerOptions', is not exported from this entrypoint/);
        fs.appendFileSync(asyncSource, ' export { Hidden } from "./index.js";');
        const exportedDependency = run();
        assert.equal(exportedDependency.status, 0, exportedDependency.stderr);

        fs.writeFileSync(asyncSource, 'export { Hidden } from "./index.js";');
        const missingRoot = run();
        assert.equal(missingRoot.status, 1, missingRoot.stderr);
        assert.match(missingRoot.stderr, /This entrypoint must export 'CompilerOptions'/);

        fs.writeFileSync(
            path.join(directory, "package.json"),
            JSON.stringify({
                type: "module",
                exports: { ".": { "@typescript/source": "./src/index.ts" } },
            }),
        );
        const missingEntrypoint = run();
        assert.equal(missingEntrypoint.status, 1, missingEntrypoint.stderr);
        assert.match(missingEntrypoint.stderr, /Cannot find public entrypoint '\.\/async'/);
    }
    finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
});

test("does not count a type-only star export as an enum value export", () => {
    const messages = lint({
        "index.ts": 'import { Kind } from "./types.js"; export type * from "./types.js"; export interface Options { kind: Kind; }',
        "types.ts": "export enum Kind { One }",
    });
    assert.deepEqual(messages.map(message => message.messageId), ["missingValueExport"]);
});

test("follows type-only star exports through barrels", () => {
    const files = {
        "index.ts": 'import { Kind } from "./types.js"; export * from "./barrel.js"; export interface Options { kind: Kind; }',
        "barrel.ts": 'export type * from "./types.js";',
        "types.ts": "export enum Kind { One }",
    };
    assert.deepEqual(lint(files).map(message => message.messageId), ["missingValueExport"]);
    files["barrel.ts"] = 'export * from "./types.js";';
    assert.deepEqual(lint(files), []);
});

test("follows type-only named re-exports and imports", () => {
    const files = {
        "index.ts": 'import { Kind } from "./types.js"; export { Kind } from "./barrel.js"; export interface Options { kind: Kind; }',
        "barrel.ts": 'export type { Kind } from "./types.js";',
        "types.ts": "export enum Kind { One }",
    };
    assert.deepEqual(lint(files).map(message => message.messageId), ["missingValueExport"]);
    files["index.ts"] = 'import type { Kind } from "./types.js"; export { Kind }; export interface Options { kind: Kind; }';
    assert.deepEqual(lint(files).map(message => message.messageId), ["missingValueExport"]);
    files["index.ts"] = 'import { Kind } from "./types.js"; export { Kind }; export interface Options { kind: Kind; }';
    assert.deepEqual(lint(files), []);
});

test("respects the first visible star export through cycles", () => {
    const files = {
        "index.ts": `
            import { Kind } from "./types.js";
            export * from "./a.js";
            export interface Options { kind: Kind; }
        `,
        "a.ts": 'export * from "./b.js"; export * from "./c.js";',
        "b.ts": 'export * from "./a.js"; export type { Kind as PublicKind } from "./types.js";',
        "c.ts": 'export { Kind as PublicKind } from "./types.js";',
        "types.ts": "export enum Kind { One }",
    };
    assert.deepEqual(lint(files).map(message => message.messageId), ["missingValueExport"]);
    files["a.ts"] = 'export * from "./c.js"; export * from "./b.js";';
    assert.deepEqual(lint(files), []);
});

test("uses a later star export when an earlier one is internal", () => {
    const files = {
        "index.ts": 'import { Kind } from "./types.js"; export * from "./a.js"; export interface Options { kind: Kind; }',
        "a.ts": 'export * from "./b.js"; export * from "./c.js";',
        "b.ts": '/** @internal */ export { Kind } from "./types.js";',
        "c.ts": 'export { Kind } from "./types.js";',
        "types.ts": "export enum Kind { One }",
    };
    assert.deepEqual(lint(files), []);
    files["a.ts"] = 'export * from "./b.js";';
    files["b.ts"] = '/** @internal */ export { Kind } from "./types.js"; export * from "./c.js";';
    assert.deepEqual(lint(files), []);
});

test("does not count an @internal star re-export as a public export", () => {
    const files = {
        "index.ts": 'import { Hidden } from "./types.js"; export interface Public { hidden: Hidden; }',
        "other.ts": '/** @internal */ export * from "./types.js";',
        "types.ts": "export interface Hidden {}",
    };
    assert.deepEqual(lint(files, { entrypoints: ["index.ts", "other.ts"] }).map(message => message.messageId), ["missingExport"]);
});

test("does not count @internal named or namespace re-exports through a barrel", () => {
    const files = {
        "index.ts": 'import { Hidden } from "./types.js"; export { Hidden } from "./barrel.js"; export interface Public { hidden: Hidden; }',
        "barrel.ts": '/** @internal */ export { Hidden } from "./types.js";',
        "types.ts": "export interface Hidden {}",
    };
    assert.deepEqual(lint(files).map(message => message.messageId), ["missingExport"]);
    files["index.ts"] = 'import { Hidden } from "./types.js"; export interface Public { hidden: Hidden; }';
    files["barrel.ts"] = '/** @internal */ export * as types from "./types.js";';
    assert.deepEqual(lint(files, { entrypoints: ["index.ts", "barrel.ts"] }).map(message => message.messageId), ["missingExport"]);
});

test("ignores private constructor parameters", () => {
    assert.deepEqual(
        lint({
            "index.ts": 'import { Hidden } from "./types.js"; export class Public { private constructor(hidden: Hidden) {} }',
            "types.ts": "export interface Hidden {}",
        }),
        [],
    );
});

test("distinguishes static and instance method overloads with the same name", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": `
            interface Hidden {}
            export class C {
                static method(value: string): void;
                static method(value: Hidden): void {}
                method(value: Hidden): void {}
            }
        `,
        }),
        [missing("Hidden")],
    );
});

test("ignores implementation signatures of overloaded constructors and computed methods", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": `
            interface Hidden {}
            export class C {
                constructor(value: string);
                constructor(value: Hidden) {}
                ["method"](value: string): void;
                ["method"](value: Hidden): void {}
            }
        `,
        }),
        [],
    );
});

test("ignores an implementation signature on an anonymous default-exported class", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": `
            interface Hidden {}
            export default class {
                constructor(value: string);
                constructor(value: Hidden) {}
            }
        `,
        }),
        [],
    );
});

test("checks transitive dependencies of AST node types", () => {
    const files = {
        "index.ts": 'import { Child } from "./ast/ast.js"; export function parse(): Child { throw 0; }',
        "other.ts": 'export { Node, Child } from "./ast/ast.js";',
        "ast/ast.ts": "export interface Node {} export interface Child extends Node { flags: Flags; } export enum Flags { A }",
    };
    const messages = lint(files, { entrypoints: ["index.ts", "other.ts"] });
    assert.deepEqual(messages.map(message => message.messageId), ["missingExport"]);
    assert.match(messages[0].message, /Flags/);
});

test("reports an enum transitively referenced by a re-exported type", () => {
    const files = {
        "index.ts": 'export { CompilerOptions } from "./options.js";',
        "options.ts": 'import { ScriptTarget } from "./ast.js"; export interface CompilerOptions { target?: ScriptTarget; }',
        "ast.ts": "export enum ScriptTarget { ESNext = 99 }",
    };
    assert.deepEqual(messagesOf(files), [missing("ScriptTarget")]);
    files["index.ts"] += ' export { ScriptTarget } from "./ast.js";';
    assert.deepEqual(lint(files), []);
});

test("accepts aliased exports, generic parameters and library types", () => {
    assert.deepEqual(
        lint({
            "index.ts": 'export { Options as PublicOptions, Item as PublicItem } from "./types.js";',
            "types.ts": "export interface Item { next?: Item; } export interface Options<T extends Item = Item> { items: Promise<ReadonlyArray<T>>; }",
        }),
        [],
    );
});

test("reports signature, heritage, import type and typeof references", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": `
                import { Hidden } from "./types.js";
                export class Derived extends Hidden {}
                export function make(): Promise<import("./types.js").Other> { return null!; }
                export const ctor: typeof Hidden = Hidden;
            `,
            "types.ts": "export class Hidden {} export interface Other {}",
        }),
        [missing("Hidden"), missing("Other")],
    );
});

test("checks types inferred from exported initializers", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": 'import { Hidden } from "./types.js"; export const defaults = {} as Hidden;',
            "types.ts": "export interface Hidden {}",
        }),
        [missing("Hidden")],
    );
});

test("ignores implementation details", () => {
    assert.deepEqual(
        lint({
            "index.ts": `
                import { A, B, C, D, E, F } from "./types.js";
                declare const brand: unique symbol;
                export type Id = string & { readonly [brand]: never };
                export class Public {
                    private a: A = null!;
                    #b: B = null!;
                    method(): void { const c: C = null!; }
                    static { const d: D = null!; }
                }
                export function overloaded(): void;
                export function overloaded(e?: E): void {}
                export const value: number = (null! as F).length;
            `,
            "types.ts": "export interface A {} export interface B {} export interface C {} export interface D {} export interface E {} export interface F { length: number; }",
        }),
        [],
    );
});

test("reports private parameter property types, which appear in the constructor signature", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": 'import { Hidden } from "./types.js"; export class Public { constructor(private hidden: Hidden) {} }',
            "types.ts": "export interface Hidden {}",
        }),
        [missing("Hidden")],
    );
});

test("ignores @internal members and exports", () => {
    assert.deepEqual(
        lint({
            "index.ts": `
                import { A, B, C } from "./types.js";
                export class Public {
                    /** @internal */
                    constructor(a: A) {}
                    /** @internal */
                    b?: B;
                }
                /** @internal */
                export function internal(c: C): void {}
            `,
            "types.ts": "export interface A {} export interface B {} export interface C {}",
        }),
        [],
    );
});

test("ignores @internal re-exports, so they do not count as exported", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": `
                import { Hidden } from "./types.js";
                /** @internal */
                export { Hidden };
                export interface Public { hidden: Hidden; }
            `,
            "types.ts": "export interface Hidden {}",
        }),
        [missing("Hidden")],
    );
});

test("reports @internal types that are reachable from the public API", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": 'import { Hidden } from "./types.js"; export interface Public { hidden: Hidden; }',
            "types.ts": "/** @internal */ export interface Hidden {}",
        }),
        [missing("Hidden")],
    );
});

test("requires enum value exports, not just type-only exports", () => {
    const messages = lint({
        "index.ts": 'import { Kind } from "./types.js"; export type { Kind } from "./types.js"; export interface Options { kind: Kind; }',
        "types.ts": "export enum Kind { A }",
    });
    assert.deepEqual(messages.map(message => message.messageId), ["missingValueExport"]);
});

test("enum member references require the enum, not separate member exports", () => {
    assert.deepEqual(lint({ "index.ts": "export enum Kind { A } export interface Options { kind: Kind.A; }" }), []);
});

test("accepts types exposed through an exported namespace without checking its private declarations", () => {
    assert.deepEqual(
        lint({
            "index.ts": 'export * as types from "./types.js"; import { Hidden } from "./types.js"; export declare function make(): Hidden;',
            "types.ts": "export interface Hidden {} type Implementation = {}; const table: Implementation = {};",
        }),
        [],
    );
});

test("reports unexported types even when they are structurally compatible with exported types", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": 'import { Node } from "./ast/ast.js"; export { Node }; interface Lookalike { kind: number; } export declare function parse(): Node | Lookalike;',
            "ast/ast.ts": "export interface Node { kind: number; }",
        }),
        [missing("Lookalike")],
    );
});

test("follows typeof function signatures without requiring the function itself to be exported", () => {
    assert.deepEqual(
        messagesOf({
            "index.ts": 'import { make } from "./types.js"; export const factory: typeof make = make;',
            "types.ts": "export interface Hidden {} export function make(): Hidden { return {}; }",
        }),
        [missing("Hidden")],
    );
});
