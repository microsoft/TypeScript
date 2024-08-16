import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { FsContents } from "./contents.js";
import {
    createServerHost,
    createWatchedSystem,
    libFile,
    TestServerHost,
} from "./virtualFileSystemWithWatch.js";

export function getSymlinkedExtendsSys(forTsserver?: true): TestServerHost {
    return (!forTsserver ? createWatchedSystem : createServerHost)({
        "/users/user/projects/myconfigs/node_modules/@something/tsconfig-node/tsconfig.json": jsonToReadableText({
            extends: "@something/tsconfig-base/tsconfig.json",
            compilerOptions: {
                removeComments: true,
            },
        }),
        "/users/user/projects/myconfigs/node_modules/@something/tsconfig-base/tsconfig.json": jsonToReadableText({
            compilerOptions: { composite: true },
        }),
        "/users/user/projects/myproject/src/index.ts": dedent`
            // some comment
            export const x = 10;
        `,
        "/users/user/projects/myproject/src/tsconfig.json": jsonToReadableText({
            extends: "@something/tsconfig-node/tsconfig.json",
        }),
        "/users/user/projects/myproject/node_modules/@something/tsconfig-node": {
            symLink: "/users/user/projects/myconfigs/node_modules/@something/tsconfig-node",
        },
        [libFile.path]: libFile.content,
    }, { currentDirectory: "/users/user/projects/myproject" });
}

export function getConfigDirExtendsSys(): FsContents {
    return {
        "/home/src/projects/configs/first/tsconfig.json": jsonToReadableText({
            extends: "../second/tsconfig.json",
            include: ["${configDir}/src"], // eslint-disable-line no-template-curly-in-string
            compilerOptions: {
                typeRoots: ["root1", "${configDir}/root2", "root3"], // eslint-disable-line no-template-curly-in-string
                types: [],
            },
        }),
        "/home/src/projects/configs/second/tsconfig.json": jsonToReadableText({
            files: ["${configDir}/main.ts"], // eslint-disable-line no-template-curly-in-string,
            compilerOptions: {
                declarationDir: "${configDir}/decls", // eslint-disable-line no-template-curly-in-string
                paths: {
                    "@myscope/*": ["${configDir}/types/*"], // eslint-disable-line no-template-curly-in-string
                    "other/*": ["other/*"],
                },
                baseUrl: "${configDir}", // eslint-disable-line no-template-curly-in-string
            },
            watchOptions: {
                excludeFiles: ["${configDir}/main.ts"], // eslint-disable-line no-template-curly-in-string
            },
        }),
        "/home/src/projects/myproject/tsconfig.json": jsonToReadableText({
            extends: "../configs/first/tsconfig.json",
            compilerOptions: {
                declaration: true,
                outDir: "outDir",
                traceResolution: true,
            },
        }),

        "/home/src/projects/myproject/main.ts": dedent`
            // some comment
            export const y = 10;
            import { x } from "@myscope/sometype";
        `,
        "/home/src/projects/myproject/src/secondary.ts": dedent`
            // some comment
            export const z = 10;
            import { k } from "other/sometype2";
        `,
        "/home/src/projects/myproject/types/sometype.ts": dedent`
            export const x = 10;
        `,
        "/home/src/projects/myproject/root2/other/sometype2/index.d.ts": dedent`
            export const k = 10;
        `,
        [libFile.path]: libFile.content,
    };
}

export function modifyFirstExtendedConfigOfConfigDirExtendsSys(sys: TestServerHost) {
    sys.modifyFile(
        "/home/src/projects/configs/first/tsconfig.json",
        jsonToReadableText({
            extends: "../second/tsconfig.json",
            include: ["${configDir}/src"], // eslint-disable-line no-template-curly-in-string
            compilerOptions: {
                typeRoots: ["${configDir}/root2"], // eslint-disable-line no-template-curly-in-string
                types: [],
            },
        }),
    );
}
