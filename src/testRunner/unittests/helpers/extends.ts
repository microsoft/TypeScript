import {
    dedent,
} from "../../_namespaces/Utils";
import {
    createServerHost,
    createWatchedSystem,
    libFile,
    TestServerHost,
} from "./virtualFileSystemWithWatch";

export function getSymlinkedExtendsSys(forTsserver?: true): TestServerHost {
    return (!forTsserver ? createWatchedSystem : createServerHost)({
        "/users/user/projects/myconfigs/node_modules/@something/tsconfig-node/tsconfig.json": JSON.stringify({
            extends: "@something/tsconfig-base/tsconfig.json",
            compilerOptions: {
                removeComments: true,
            },
        }),
        "/users/user/projects/myconfigs/node_modules/@something/tsconfig-base/tsconfig.json": JSON.stringify({
            compilerOptions: { composite: true },
        }),
        "/users/user/projects/myproject/src/index.ts": dedent`
            // some comment
            export const x = 10;
        `,
        "/users/user/projects/myproject/src/tsconfig.json": JSON.stringify({
            extends: "@something/tsconfig-node/tsconfig.json",
        }),
        "/users/user/projects/myproject/node_modules/@something/tsconfig-node": {
            symLink: "/users/user/projects/myconfigs/node_modules/@something/tsconfig-node",
        },
        [libFile.path]: libFile.content,
    }, { currentDirectory: "/users/user/projects/myproject" });
}
