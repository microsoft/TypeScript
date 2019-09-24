namespace ts {
    // https://github.com/microsoft/TypeScript/issues/31696
    describe("unittests:: tsbuild:: moduleSpecifiers:: synthesized module specifiers to referenced projects resolve correctly", () => {
        let projFs: vfs.FileSystem;
        const { time, tick } = getTime();
        before(() => {
            projFs = loadProjectFromFiles({
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
            }, time, symbolLibContent);
        });
        after(() => {
            projFs = undefined!;
        });
        verifyTsbuildOutput({
            scenario: `synthesized module specifiers resolve correctly`,
            projFs: () => projFs,
            time,
            tick,
            proj: "moduleSpecifiers",
            rootNames: ["/"],
            initialBuild: {
                modifyFs: noop,
            },
            baselineOnly: true
        });
    });
}
