import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    FsContents,
    getProjectConfigWithNodeNext,
} from "./contents.js";
import { loadProjectFromFiles } from "./vfs.js";
import {
    createServerHost,
    createWatchedSystem,
    libFile,
} from "./virtualFileSystemWithWatch.js";

export function getFsContentsForSampleProjectReferencesLogicConfig(withNodeNext?: boolean) {
    return jsonToReadableText({
        compilerOptions: {
            ...getProjectConfigWithNodeNext(withNodeNext),
            composite: true,
            declaration: true,
            sourceMap: true,
            forceConsistentCasingInFileNames: true,
            skipDefaultLibCheck: true,
        },
        references: [
            { path: "../core" },
        ],
    });
}
export function getFsContentsForSampleProjectReferences(withNodeNext?: boolean, skipReferenceCoreFromTest?: boolean): FsContents {
    return {
        [libFile.path]: libFile.content,
        "/user/username/projects/sample1/core/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                ...getProjectConfigWithNodeNext(withNodeNext),
                composite: true,
                declaration: true,
                declarationMap: true,
                skipDefaultLibCheck: true,
            },
        }),
        "/user/username/projects/sample1/core/index.ts": dedent`
            export const someString: string = "HELLO WORLD";
            export function leftPad(s: string, n: number) { return s + n; }
            export function multiply(a: number, b: number) { return a * b; }
        `,
        "/user/username/projects/sample1/core/some_decl.d.ts": `declare const dts: any;`,
        "/user/username/projects/sample1/core/anotherModule.ts": `export const World = "hello";`,
        "/user/username/projects/sample1/logic/tsconfig.json": getFsContentsForSampleProjectReferencesLogicConfig(withNodeNext),
        "/user/username/projects/sample1/logic/index.ts": dedent`
            import * as c from '../core/index';
            export function getSecondsInDay() {
                return c.multiply(10, 15);
            }
            import * as mod from '../core/anotherModule';
            export const m = mod;
        `,
        "/user/username/projects/sample1/tests/tsconfig.json": jsonToReadableText({
            references: !skipReferenceCoreFromTest ?
                [
                    { path: "../core" },
                    { path: "../logic" },
                ] :
                [
                    { path: "../logic" },
                ],
            files: ["index.ts"],
            compilerOptions: {
                ...getProjectConfigWithNodeNext(withNodeNext),
                composite: true,
                declaration: true,
                forceConsistentCasingInFileNames: true,
                skipDefaultLibCheck: true,
            },
        }),
        "/user/username/projects/sample1/tests/index.ts": dedent`
            import * as c from '../core/index';
            import * as logic from '../logic/index';

            c.leftPad("", 10);
            logic.getSecondsInDay();

            import * as mod from '../core/anotherModule';
            export const m = mod;
        `,
    };
}

export function getFsForSampleProjectReferences(withNodeNext?: boolean, skipReferenceCoreFromTest?: boolean) {
    return loadProjectFromFiles(
        getFsContentsForSampleProjectReferences(withNodeNext, skipReferenceCoreFromTest),
        {
            cwd: "/user/username/projects/sample1",
            executingFilePath: libFile.path,
        },
    );
}

export function getSysForSampleProjectReferences(withNodeNext?: boolean, skipReferenceCoreFromTest?: boolean) {
    return createWatchedSystem(
        getFsContentsForSampleProjectReferences(withNodeNext, skipReferenceCoreFromTest),
        {
            currentDirectory: "/user/username/projects/sample1",
        },
    );
}

export function getServerHostForSampleProjectReferences() {
    return createServerHost(
        getFsContentsForSampleProjectReferences(),
        {
            currentDirectory: "/user/username/projects/sample1",
        },
    );
}
