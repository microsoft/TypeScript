import {
    dedent,
} from "../../_namespaces/Utils";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    appendText,
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: typeReferenceDirectives::", () => {
    verifyTsc({
        scenario: "typeReferenceDirectives",
        subScenario: `effective type roots affect module resolution`,
        fs: () =>
            loadProjectFromFiles({
                "/users/username/projects/replay/axios-src/test/module/ts-require/tsconfig.json": JSON.stringify({
                    compilerOptions: { incremental: true },
                }),
                "/users/username/projects/replay/axios-src/test/module/ts-require/index.ts": dedent`
                export const a = 10;
            `,
                "/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts": dedent`
                declare const tsRequireGlobal = 10;
            `,
                "/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts": dedent`
                /// <reference types="node" />
                export const z = 10;
            `,
                "/users/username/projects/replay/axios-src/test/module/ts/tsconfig.json": JSON.stringify({
                    compilerOptions: { incremental: true },
                }),
                "/users/username/projects/replay/axios-src/test/module/ts/index.ts": dedent`
                export const y = 10;
            `,
                "/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts": dedent`
                declare const tsGlobal = 10;
            `,
            }, { cwd: "/users/username/projects/replay/axios-src" }),
        commandLineArgs: ["-b", "test/module/ts-require", "test/module/ts", "--verbose", "--traceResolution", "--explainFiles"],
        edits: [{
            caption: "build ts project with edit",
            edit: fs => appendText(fs, "/users/username/projects/replay/axios-src/test/module/ts/index.ts", `export const z = 10;`),
        }],
    });
});
