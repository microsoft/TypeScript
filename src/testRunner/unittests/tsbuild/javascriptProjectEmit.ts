import * as Utils from "../../_namespaces/Utils.js";
import { symbolLibContent } from "../helpers/contents.js";
import { verifyTsc } from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsbuild:: javascriptProjectEmit::", () => {
    verifyTsc({
        scenario: "javascriptProjectEmit",
        subScenario: `loads js-based projects and emits them correctly`,
        fs: () =>
            loadProjectFromFiles({
                "/src/common/nominal.js": Utils.dedent`
                    /**
                     * @template T, Name
                     * @typedef {T & {[Symbol.species]: Name}} Nominal
                     */
                    module.exports = {};
                    `,
                "/src/common/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "include": ["nominal.js"]
                    }`,
                "/src/sub-project/index.js": Utils.dedent`
                    import { Nominal } from '../common/nominal';

                    /**
                     * @typedef {Nominal<string, 'MyNominal'>} MyNominal
                     */
                    `,
                "/src/sub-project/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../common" }
                        ],
                        "include": ["./index.js"]
                    }`,
                "/src/sub-project-2/index.js": Utils.dedent`
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
                "/src/sub-project-2/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../sub-project" }
                        ],
                        "include": ["./index.js"]
                    }`,
                "/src/tsconfig.json": Utils.dedent`
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
                "/src/tsconfig.base.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "skipLibCheck": true,
                            "rootDir": "./",
                            "outDir": "../lib",
                            "allowJs": true,
                            "checkJs": true,
                            "declaration": true
                        }
                    }`,
            }, symbolLibContent),
        commandLineArgs: ["-b", "/src"],
    });

    verifyTsc({
        scenario: "javascriptProjectEmit",
        subScenario: `loads js-based projects with non-moved json files and emits them correctly`,
        fs: () =>
            loadProjectFromFiles({
                "/src/common/obj.json": Utils.dedent`
                    {
                        "val": 42
                    }`,
                "/src/common/index.ts": Utils.dedent`
                    import x = require("./obj.json");
                    export = x;
                    `,
                "/src/common/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../tsconfig.base.json",
                        "compilerOptions": {
                            "outDir": null,
                            "composite": true
                        },
                        "include": ["index.ts", "obj.json"]
                    }`,
                "/src/sub-project/index.js": Utils.dedent`
                    import mod from '../common';

                    export const m = mod;
                    `,
                "/src/sub-project/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../common" }
                        ],
                        "include": ["./index.js"]
                    }`,
                "/src/sub-project-2/index.js": Utils.dedent`
                    import { m } from '../sub-project/index';

                    const variable = {
                        key: m,
                    };

                    export function getVar() {
                        return variable;
                    }
                    `,
                "/src/sub-project-2/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../sub-project" }
                        ],
                        "include": ["./index.js"]
                    }`,
                "/src/tsconfig.json": Utils.dedent`
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
                "/src/tsconfig.base.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "skipLibCheck": true,
                            "rootDir": "./",
                            "outDir": "../out",
                            "allowJs": true,
                            "checkJs": true,
                            "resolveJsonModule": true,
                            "esModuleInterop": true,
                            "declaration": true
                        }
                    }`,
            }, symbolLibContent),
        commandLineArgs: ["-b", "/src"],
    });
});
