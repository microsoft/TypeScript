import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    FsContents,
    libContent,
} from "./contents";
import {
    loadProjectFromFiles,
} from "./vfs";
import {
    createWatchedSystem,
    libFile,
} from "./virtualFileSystemWithWatch";

export function getFsContentsForDemoProjectReferencesCoreConfig(additional?: object) {
    return jsonToReadableText({
        extends: "../tsconfig-base.json",
        compilerOptions: {
            outDir: "../lib/core",
            rootDir: ".",
        },
        ...additional,
    });
}
export function getFsContentsForDemoProjectReferences(): FsContents {
    return {
        "/user/username/projects/demo/animals/animal.ts": dedent`
            export type Size = "small" | "medium" | "large";
            export default interface Animal {
                size: Size;
            }
        `,
        "/user/username/projects/demo/animals/dog.ts": dedent`
            import Animal from '.';
            import { makeRandomName } from '../core/utilities';

            export interface Dog extends Animal {
                woof(): void;
                name: string;
            }

            export function createDog(): Dog {
                return ({
                    size: "medium",
                    woof: function(this: Dog) {
                        console.log(\`\${ this.name } says "Woof"!\`);
                    },
                    name: makeRandomName()
                });
            }
        `,
        "/user/username/projects/demo/animals/index.ts": dedent`
            import Animal from './animal';

            export default Animal;
            import { createDog, Dog } from './dog';
            export { createDog, Dog };
        `,
        "/user/username/projects/demo/animals/tsconfig.json": jsonToReadableText({
            extends: "../tsconfig-base.json",
            compilerOptions: {
                outDir: "../lib/animals",
                rootDir: ".",
            },
            references: [
                { path: "../core" },
            ],
        }),
        "/user/username/projects/demo/core/utilities.ts": dedent`

            export function makeRandomName() {
                return "Bob!?! ";
            }

            export function lastElementOf<T>(arr: T[]): T | undefined {
                if (arr.length === 0) return undefined;
                return arr[arr.length - 1];
            }
        `,
        "/user/username/projects/demo/core/tsconfig.json": getFsContentsForDemoProjectReferencesCoreConfig(),
        "/user/username/projects/demo/zoo/zoo.ts": dedent`
            import { Dog, createDog } from '../animals/index';

            export function createZoo(): Array<Dog> {
                return [
                    createDog()
                ];
            }
        `,
        "/user/username/projects/demo/zoo/tsconfig.json": jsonToReadableText({
            extends: "../tsconfig-base.json",
            compilerOptions: {
                outDir: "../lib/zoo",
                rootDir: ".",
            },
            references: [
                {
                    path: "../animals",
                },
            ],
        }),
        "/user/username/projects/demo/tsconfig-base.json": jsonToReadableText({
            compilerOptions: {
                declaration: true,
                target: "es5",
                module: "commonjs",
                strict: true,
                noUnusedLocals: true,
                noUnusedParameters: true,
                noImplicitReturns: true,
                noFallthroughCasesInSwitch: true,
                composite: true,
            },
        }),
        "/user/username/projects/demo/tsconfig.json": jsonToReadableText({
            files: [],
            references: [
                {
                    path: "./core",
                },
                {
                    path: "./animals",
                },
                {
                    path: "./zoo",
                },
            ],
        }),
        [libFile.path]: libContent,
    };
}

export function getFsForDemoProjectReferences() {
    return loadProjectFromFiles(
        getFsContentsForDemoProjectReferences(),
        {
            cwd: "/user/username/projects/demo",
            executingFilePath: libFile.path,
        },
    );
}

export function getSysForDemoProjectReferences() {
    return createWatchedSystem(
        getFsContentsForDemoProjectReferences(),
        {
            currentDirectory: "/user/username/projects/demo",
        },
    );
}
