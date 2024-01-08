import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    FsContents,
} from "./contents";
import {
    loadProjectFromFiles,
} from "./vfs";
import {
    createServerHost,
    createWatchedSystem,
    libFile,
} from "./virtualFileSystemWithWatch";

export function getFsContentsForSampleProjectReferencesLogicConfig() {
    return jsonToReadableText({
        compilerOptions: {
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
export function getFsContentsForSampleProjectReferences(): FsContents {
    return {
        [libFile.path]: libFile.content,
        "/user/username/projects/sample1/core/tsconfig.json": jsonToReadableText({
            compilerOptions: {
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
        "/user/username/projects/sample1/logic/tsconfig.json": getFsContentsForSampleProjectReferencesLogicConfig(),
        "/user/username/projects/sample1/logic/index.ts": dedent`
            import * as c from '../core/index';
            export function getSecondsInDay() {
                return c.multiply(10, 15);
            }
            import * as mod from '../core/anotherModule';
            export const m = mod;
        `,
        "/user/username/projects/sample1/tests/tsconfig.json": jsonToReadableText({
            references: [
                { path: "../core" },
                { path: "../logic" },
            ],
            files: ["index.ts"],
            compilerOptions: {
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

export function getFsForSampleProjectReferences() {
    return loadProjectFromFiles(
        getFsContentsForSampleProjectReferences(),
        {
            cwd: "/user/username/projects/sample1",
            executingFilePath: libFile.path,
        },
    );
}

export function getSysForSampleProjectReferences() {
    return createWatchedSystem(
        getFsContentsForSampleProjectReferences(),
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
