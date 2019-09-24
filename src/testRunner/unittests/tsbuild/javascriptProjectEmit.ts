namespace ts {
    describe("unittests:: tsbuild:: javascriptProjectEmit:: loads js-based projects and emits them correctly", () => {
        let projFs: vfs.FileSystem;
        const { time, tick } = getTime();
        before(() => {
            projFs = loadProjectFromFiles({
                "/src/common/nominal.js": utils.dedent`
                    /**
                     * @template T, Name
                     * @typedef {T & {[Symbol.species]: Name}} Nominal
                     */
                    module.exports = {};
                    `,
                "/src/common/tsconfig.json": utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "include": ["nominal.js"]
                    }`,
                "/src/sub-project/index.js": utils.dedent`
                    import { Nominal } from '../common/nominal';

                    /**
                     * @typedef {Nominal<string, 'MyNominal'>} MyNominal
                     */
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
                        "include": ["./index.js"]
                    }`,
                "/src/sub-project-2/index.js": utils.dedent`
                    import { MyNominal } from '../sub-project/index';

                    const variable = {
                        key: /** @type {MyNominal} */('value'),
                    };

                    /**
                     * @return {keyof typeof variable}
                     */
                    export function getVar() {
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
                        "include": ["./index.js"]
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
                            "allowJs": true,
                            "checkJs": true,
                            "declaration": true
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
            scenario: `loads js-based projects and emits them correctly`,
            projFs: () => projFs,
            time,
            tick,
            proj: "javascriptProjectEmit",
            rootNames: ["/"],
            initialBuild: {
                modifyFs: noop,
            },
            baselineOnly: true
        });
    });

    describe("unittests:: tsbuild:: javascriptProjectEmit:: loads outfile js projects and concatenates them correctly", () => {
        let projFs: vfs.FileSystem;
        const { time, tick } = getTime();
        before(() => {
            projFs = loadProjectFromFiles({
                "/src/common/nominal.js": utils.dedent`
                    /**
                     * @template T, Name
                     * @typedef {T & {[Symbol.species]: Name}} Nominal
                     */
                    `,
                "/src/common/tsconfig.json": utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true,
                            "outFile": "common.js"
                        },
                        "include": ["nominal.js"]
                    }`,
                "/src/sub-project/index.js": utils.dedent`
                    /**
                     * @typedef {Nominal<string, 'MyNominal'>} MyNominal
                     */
                    `,
                "/src/sub-project/tsconfig.json": utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true,
                            "outFile": "sub-project.js"
                        },
                        "references": [
                            { "path": "../common", "prepend": true }
                        ],
                        "include": ["./index.js"]
                    }`,
                "/src/sub-project-2/index.js": utils.dedent`
                    const variable = {
                        key: /** @type {MyNominal} */('value'),
                    };

                    /**
                     * @return {keyof typeof variable}
                     */
                    function getVar() {
                        return 'key';
                    }
                    `,
                "/src/sub-project-2/tsconfig.json": utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true,
                            "outFile": "sub-project-2.js"
                        },
                        "references": [
                            { "path": "../sub-project", "prepend": true }
                        ],
                        "include": ["./index.js"]
                    }`,
                "/src/tsconfig.json": utils.dedent`
                    {
                        "compilerOptions": {
                            "composite": true,
                            "outFile": "src.js"
                        },
                        "references": [
                            { "path": "./sub-project", "prepend": true },
                            { "path": "./sub-project-2", "prepend": true }
                        ],
                        "include": []
                    }`,
                "/tsconfig.base.json": utils.dedent`
                    {
                        "compilerOptions": {
                            "skipLibCheck": true,
                            "rootDir": "./",
                            "allowJs": true,
                            "checkJs": true,
                            "declaration": true
                        }
                    }`,
                "/tsconfig.json": utils.dedent`{
                    "compilerOptions": {
                        "composite": true,
                        "outFile": "concatenated-nominal-lib.js"
                    },
                    "references": [
                        { "path": "./src", "prepend": true }
                    ],
                    "include": []
                }`
            }, time, symbolLibContent);
        });
        after(() => {
            projFs = undefined!;
        });
        verifyTsbuildOutput({
            scenario: `loads outfile js projects and concatenates them correctly`,
            projFs: () => projFs,
            time,
            tick,
            proj: "javascriptProjectEmit",
            rootNames: ["/"],
            initialBuild: {
                modifyFs: noop,
            },
            baselineOnly: true
        });
        verifyTsbuildOutput({
            scenario: `modifies outfile js projects and concatenates them correctly`,
            projFs: () => projFs,
            time,
            tick,
            proj: "javascriptProjectEmit",
            rootNames: ["/"],
            initialBuild: {
                modifyFs: fs => replaceText(fs, "/src/sub-project-2/index.js", "'value'", "'val'"),
            },
            baselineOnly: true
        });
    });
}
