import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    FsContents,
    libContent,
} from "./contents.js";
import { libFile } from "./virtualFileSystemWithWatch.js";

function getFsContentsForRootsFromReferencedProject(serverFirst: boolean): FsContents {
    return {
        "/home/src/workspaces/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                composite: true,
            },
            references: [
                { path: "projects/server" },
                { path: "projects/shared" },
            ],
        }),
        "/home/src/workspaces/projects/shared/src/myClass.ts": `export class MyClass { }`,
        "/home/src/workspaces/projects/shared/src/logging.ts": dedent`
            export function log(str: string) {
                console.log(str);
            }
        `,
        "/home/src/workspaces/projects/shared/src/random.ts": dedent`
            export function randomFn(str: string) {
                console.log(str);
            }
        `,
        "/home/src/workspaces/projects/shared/tsconfig.json": jsonToReadableText({
            extends: "../../tsconfig.json",
            compilerOptions: {
                outDir: "./dist",
            },
            include: ["src/**/*.ts"],
        }),
        "/home/src/workspaces/projects/server/src/server.ts": dedent`
            import { MyClass } from ':shared/myClass.js';
            console.log('Hello, world!');
        `,
        "/home/src/workspaces/projects/server/tsconfig.json": jsonToReadableText({
            extends: "../../tsconfig.json",
            compilerOptions: {
                baseUrl: "./src",
                rootDir: "..",
                outDir: "./dist",
                paths: {
                    ":shared/*": ["../../shared/src/*"],
                },
            },
            include: serverFirst ?
                ["src/**/*.ts", "../shared/src/**/*.ts"] :
                ["../shared/src/**/*.ts", "src/**/*.ts"],
            references: [
                { path: "../shared" },
            ],
        }),
        [libFile.path]: libContent,
    };
}

export function forEachScenarioForRootsFromReferencedProject(action: (subScenario: string, getFsContents: () => FsContents) => void) {
    action("when root file is from referenced project", () => getFsContentsForRootsFromReferencedProject(/*serverFirst*/ true));
    action("when root file is from referenced project and shared is first", () => getFsContentsForRootsFromReferencedProject(/*serverFirst*/ false));
}
