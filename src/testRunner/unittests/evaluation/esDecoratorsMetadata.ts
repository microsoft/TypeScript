import * as evaluator from "../../_namespaces/evaluator.js";
import * as ts from "../../_namespaces/ts.js";
import { ScriptTarget } from "../../_namespaces/ts.js";

describe("unittests:: evaluation:: esDecoratorsMetadata", () => {
    const nodeVersion = new ts.Version(process.versions.node);
    const supportsClassStaticBlock = nodeVersion.major >= 16;

    const targets = [
        // NOTE: Class static blocks weren't supported in Node v14
        ...(supportsClassStaticBlock ? [ScriptTarget.ES2022] : []),
        ScriptTarget.ES2021,
        ScriptTarget.ES2015,
    ];

    for (const target of targets) {
        const targetName = ts.Debug.formatEnum(target, (ts as any).ScriptTarget);
        const options: ts.CompilerOptions = { target };
        const exec = (array: TemplateStringsArray) => evaluator.evaluateTypeScript(array[0], options);

        describe("examples", () => {
            // see https://github.com/tc39/proposal-decorator-metadata
            it(`@meta (${targetName})`, () => {
                const { output } = exec`
                    export const output: unknown[] = [];

                    function meta(key: string, value: string) {
                        return (_, context) => {
                            context.metadata[key] = value;
                        };
                    }

                    @meta('a', 'x')
                    class C {
                        @meta('b', 'y')
                        m() { }
                    }

                    output.push(C[Symbol.metadata].a);
                    output.push(C[Symbol.metadata].b);
                `;
                assert.deepEqual(output, ["x", "y"]);
            });

            // see https://github.com/tc39/proposal-decorator-metadata#inheritance
            it(`inheritance (${targetName})`, () => {
                const { output } = exec`
                    export const output: unknown[] = [];

                    function meta(key: string, value: string) {
                        return (_, context) => {
                            context.metadata[key] = value;
                        };
                    }

                    @meta('a', 'x')
                    class C {
                        @meta('b', 'y')
                        m() {}
                    }

                    output.push(C[Symbol.metadata].a);
                    output.push(C[Symbol.metadata].b);

                    class D extends C {
                        @meta('b', 'z')
                        m() {}
                    }

                    output.push(D[Symbol.metadata].a);
                    output.push(D[Symbol.metadata].b);
                `;
                assert.deepEqual(output, [
                    "x",
                    "y",
                    "x",
                    "z",
                ]);
            });

            // see https://github.com/tc39/proposal-decorator-metadata#inheritance
            it(`inheritance append(${targetName})`, () => {
                const { output } = exec`
                    export const output: unknown[] = [];

                    function appendMeta(key: string, value: string) {
                        return (_, context) => {
                            const existing = context.metadata[key] ?? [];
                            context.metadata[key] = [...existing, value];
                        };
                    }

                    @appendMeta('a', 'x')
                    class C { }

                    @appendMeta('a', 'z')
                    class D extends C { }

                    output.push(C[Symbol.metadata].a);
                    output.push(D[Symbol.metadata].a);
                `;
                assert.deepEqual(output, [
                    ["x"],
                    ["x", "z"],
                ]);
            });

            // see https://github.com/tc39/proposal-decorator-metadata#private-metadata
            it(`private metadata (${targetName})`, () => {
                const { output } = exec`
                    export const output: unknown[] = [];

                    const PRIVATE_METADATA = new WeakMap();
                    function meta(key: string, value: string) {
                        return (_, context) => {
                            let metadata = PRIVATE_METADATA.get(context.metadata);
                            if (!metadata) {
                                metadata = {};
                                PRIVATE_METADATA.set(context.metadata, metadata);
                            }
                            metadata[key] = value;
                        };
                    }

                    @meta('a', 'x')
                    class C {
                        @meta('b', 'y')
                        m() { }
                    }

                    output.push(PRIVATE_METADATA.get(C[Symbol.metadata]).a);
                    output.push(PRIVATE_METADATA.get(C[Symbol.metadata]).b);
                `;
                assert.deepEqual(output, [
                    "x",
                    "y",
                ]);
            });
        });
    }
});
