import assert from "node:assert/strict";
import {
    before,
    describe,
    it,
} from "node:test";
import {
    buildTsc,
    compile,
    diagnostics,
} from "./helpers.ts";

before(() => {
    buildTsc();
});

describe("module expressions", () => {
    it("lowers a module expression to an awaited Blob import", () => {
        const result = compile({
            "main.ts": `
export const mod = module {
    export let y = 1;
};

console.log(mod.y);
`,
        });

        assert.equal(diagnostics(result), "");
        assert.equal(result.status, 0);

        const js = result.read("main.js");
        assert.match(js, /export const mod = await import\(URL\.createObjectURL\(new Blob\(/);
        assert.match(js, /new Blob\(\[/);
        assert.match(js, /"application\/javascript"/);
        assert.ok(js.includes("export let y = 1;"), `expected module body in emitted JS:\n${js}`);

        const dts = result.read("main.d.ts");
        assert.match(dts, /export declare const mod: \{/);
        assert.match(dts, /y: number;/);
    });

    it("erases TypeScript syntax and downlevel nested constructs inside the module body", () => {
        const result = compile({
            "main.ts": `
export const mod = module {
    export let counter: number = 0;
    export function bump(): number {
        return ++counter;
    }
    enum Direction { Up, Down }
    export const first: number = Direction.Up;
};
`,
        });

        assert.equal(diagnostics(result), "");
        assert.equal(result.status, 0);

        const js = result.read("main.js");
        assert.ok(!js.includes(": number"), `type annotations should be erased:\n${js}`);
        assert.ok(!js.includes("enum Direction"), `enum should be downleveled:\n${js}`);
        assert.ok(js.includes("export let counter = 0;"), `expected erased counter:\n${js}`);
        assert.ok(js.includes("export function bump()"), `expected erased bump:\n${js}`);
        assert.ok(js.includes("Direction"), `expected downleveled enum reference:\n${js}`);

        const dts = result.read("main.d.ts");
        assert.match(dts, /counter: number;/);
        assert.match(dts, /bump\(\): number;/);
        assert.match(dts, /readonly first: number;/);
    });

    it("lowers nested module expressions by escaping the generated template literal", () => {
        const result = compile({
            "main.ts": `
export const outer = module {
    export const inner = module {
        export const value = 42;
    };
};
`,
        });

        assert.equal(diagnostics(result), "");
        assert.equal(result.status, 0);

        const js = result.read("main.js");
        const blobImports = js.match(/URL\.createObjectURL\(new Blob\(/g) ?? [];
        assert.equal(blobImports.length, 2, `expected two nested Blob imports:\n${js}`);
        assert.ok(js.includes("\\`export const value = 42;\\`"), `expected escaped inner template literal:\n${js}`);

        const dts = result.read("main.d.ts");
        assert.match(dts, /export declare const outer: \{/);
        assert.match(dts, /readonly inner: \{/);
        assert.match(dts, /readonly value: 42;/);
    });

    it("works inside async functions", () => {
        const result = compile({
            "main.ts": `
export async function run(): Promise<number> {
    const local = module {
        export let n = 41;
    };
    return local.n + 1;
}
`,
        });

        assert.equal(diagnostics(result), "");
        assert.equal(result.status, 0);

        const js = result.read("main.js");
        assert.match(js, /export async function run\(\)/);
        assert.match(js, /const local = await import\(URL\.createObjectURL\(new Blob\(/);

        const dts = result.read("main.d.ts");
        assert.match(dts, /export declare function run\(\): Promise<number>;/);
    });

    it("resolves imports declared inside the module body", () => {
        const result = compile({
            "dep.ts": `export const a = 1;`,
            "main.ts": `
export const mod = module {
    import { a } from "./dep.js";
    export const b = a + 1;
};
`,
        });

        assert.equal(diagnostics(result), "");
        assert.equal(result.status, 0);

        const js = result.read("main.js");
        assert.ok(js.includes('import { a } from "./dep.js";'), `expected import preserved inside the Blob:\n${js}`);

        const dts = result.read("main.d.ts");
        assert.match(dts, /readonly b: number;/);
    });

    it("supports expression positions and default exports", () => {
        const result = compile({
            "main.ts": `
export default module {
    export const x = 1;
};

export const list = [module { export const a = 1; }, module { export const b = 2; }];
export const picked = (module { export const v = 7; }).v;
`,
        });

        assert.equal(diagnostics(result), "");
        assert.equal(result.status, 0);

        const js = result.read("main.js");
        assert.match(js, /export default await import\(URL\.createObjectURL\(new Blob\(/);
        assert.ok(js.includes("await import(URL.createObjectURL(new Blob("), `expected inline module expression imports:\n${js}`);
        assert.ok(js.includes(".v"), `expected property access on a module expression:\n${js}`);

        const dts = result.read("main.d.ts");
        assert.match(dts, /export default _default;/);
        assert.match(dts, /export declare const picked = 7;/);
    });

    it("does not treat `module` followed by a line break as a module expression", () => {
        const result = compile({
            "main.ts": `export const a = 1;
module
{
}
`,
        });

        // `module` is parsed as an ordinary identifier, so the type checking diagnostic about the missing
        // `module` global is expected; what matters is that no Blob shim is emitted.
        const js = result.read("main.js");
        assert.ok(!js.includes("URL.createObjectURL"), `line break must not start a module expression:\n${js}`);
        assert.ok(js.includes("module;"), `expected the module identifier to remain:\n${js}`);
    });
});
