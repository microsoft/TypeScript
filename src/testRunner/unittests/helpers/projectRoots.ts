import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    noopChange,
    TscWatchCompileChange,
} from "./tscWatch.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";

function getSysForRootsFromReferencedProject(forTsserver: boolean, serverFirst: boolean) {
    return TestServerHost.getCreateWatchedSystem(forTsserver)({
        "/home/src/workspaces/solution/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                composite: true,
            },
            references: [
                { path: "projects/server" },
                { path: "projects/shared" },
            ],
        }),
        "/home/src/workspaces/solution/projects/shared/src/myClass.ts": `export class MyClass { }`,
        "/home/src/workspaces/solution/projects/shared/src/logging.ts": dedent`
            export function log(str: string) {
                console.log(str);
            }
        `,
        "/home/src/workspaces/solution/projects/shared/src/random.ts": dedent`
            export function randomFn(str: string) {
                console.log(str);
            }
        `,
        "/home/src/workspaces/solution/projects/shared/tsconfig.json": jsonToReadableText({
            extends: "../../tsconfig.json",
            compilerOptions: {
                outDir: "./dist",
            },
            include: ["src/**/*.ts"],
        }),
        "/home/src/workspaces/solution/projects/server/src/server.ts": dedent`
            import { MyClass } from ':shared/myClass.js';
            console.log('Hello, world!');
        `,
        "/home/src/workspaces/solution/projects/server/tsconfig.json": jsonToReadableText({
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
    }, { currentDirectory: "/home/src/workspaces/solution" });
}

export function forEachScenarioForRootsFromReferencedProject(
    forTsserver: boolean,
    action: (
        subScenario: string,
        sys: () => TestServerHost,
        edits: () => readonly TscWatchCompileChange[],
    ) => void,
): void {
    [true, false].forEach(serverFirst =>
        action(
            `when root file is from referenced project${!serverFirst ? " and shared is first" : ""}`,
            () => getSysForRootsFromReferencedProject(forTsserver, serverFirst),
            () => [
                noopChange,
                {
                    caption: "edit logging file",
                    edit: sys => sys.appendFile("/home/src/workspaces/solution/projects/shared/src/logging.ts", "export const x = 10;"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // build shared
                        sys.runQueuedTimeoutCallbacks(); // build server
                    },
                },
                noopChange,
                {
                    caption: "delete random file",
                    edit: sys => sys.deleteFile("/home/src/workspaces/solution/projects/shared/src/random.ts"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // build shared
                        sys.runQueuedTimeoutCallbacks(); // build server
                    },
                },
                noopChange,
            ],
        )
    );
}
