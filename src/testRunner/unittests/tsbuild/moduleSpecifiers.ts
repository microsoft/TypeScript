namespace ts {
    // https://github.com/microsoft/TypeScript/issues/31696
    it("unittests:: tsbuild:: moduleSpecifiers:: synthesized module specifiers to referenced projects resolve correctly", () => {
        const baseFs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, {
            files: {
                "/src/common/nominal.ts": utils.dedent`
                    export declare type Nominal<T, Name extends string> = T & {
                        [Symbol.species]: Name;
                    };
                    `,
                "/src/common/tsconfig.json": utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "include": ["nominal.ts"]
                    }`,
                "/src/sub-project/index.ts": utils.dedent`
                    import { Nominal } from '../common/nominal';

                    export type MyNominal = Nominal<string, 'MyNominal'>;
                    `,
                "/src/sub-project/tsconfig.json": utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../common" }
                        ],
                        "include": ["./index.ts"]
                    }`,
                "/src/sub-project-2/index.ts": utils.dedent`
                    import { MyNominal } from '../sub-project/index';

                    const variable = {
                        key: 'value' as MyNominal,
                    };

                    export function getVar(): keyof typeof variable {
                        return 'key';
                    }
                    `,
                "/src/sub-project-2/tsconfig.json": utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../sub-project" }
                        ],
                        "include": ["./index.ts"]
                    }`,
                "/src/tsconfig.json": utils.dedent`
                    {
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "./sub-project" },
                            { "path": "./sub-project-2" }
                        ],
                        "include": []
                    }`,
                "/tsconfig.base.json": utils.dedent`
                    {
                        "compilerOptions": {
                            "skipLibCheck": true,
                            "rootDir": "./",
                            "outDir": "lib",
                            "lib": ["dom", "es2015", "es2015.symbol.wellknown"]
                        }
                    }`,
                "/tsconfig.json": utils.dedent`{
                    "compilerOptions": {
                        "composite": true
                    },
                    "references": [
                        { "path": "./src" }
                    ],
                    "include": []
                }`
            },
            cwd: "/"
        });
        const fs = baseFs.makeReadonly().shadow();
        const sys = new fakes.System(fs, { executingFilePath: "/", newLine: "\n" });
        const host = new fakes.SolutionBuilderHost(sys);
        const builder = createSolutionBuilder(host, ["/tsconfig.json"], { dry: false, force: false, verbose: false });
        builder.build();

        // Prior to fixing GH31696 the import in `/lib/src/sub-project-2/index.d.ts` was `import("../../lib/src/common/nonterminal")`, which was invalid.
        Harness.Baseline.runBaseline("tsbuild/moduleSpecifiers/initial-build/resolves-correctly.js", vfs.formatPatch(fs.diff(baseFs)));
    });
}