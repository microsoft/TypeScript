import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    FsContents,
    libContent,
} from "./contents.js";
import {
    noChangeRun,
    verifyTsc,
} from "./tsc.js";
import {
    TscWatchCompileChange,
    verifyTscWatch,
} from "./tscWatch.js";
import { loadProjectFromFiles } from "./vfs.js";
import {
    createWatchedSystem,
    libFile,
} from "./virtualFileSystemWithWatch.js";

function getFsContentsForNoEmitOnError(
    mainErrorContent: string,
    outFile: boolean,
    declaration: true | undefined,
    incremental: true | undefined,
): FsContents {
    return {
        "/user/username/projects/noEmitOnError/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                ...outFile ? { outFile: "../dev-build.js", module: "amd" } : { outDir: "./dev-build" },
                declaration,
                incremental,
                noEmitOnError: true,
            },
        }),
        "/user/username/projects/noEmitOnError/shared/types/db.ts": dedent`
            export interface A {
                name: string;
            }
        `,
        "/user/username/projects/noEmitOnError/src/main.ts": mainErrorContent,
        "/user/username/projects/noEmitOnError/src/other.ts": dedent`
            console.log("hi");
            export { }
        `,
        [libFile.path]: libContent,
    };
}

function forEachNoEmitOnErrorScenario(
    subScenario: string,
    action: (
        subScenario: string,
        fsContents: (mainErrorContent: string) => FsContents,
    ) => void,
) {
    for (const outFile of [false, true]) {
        for (const declaration of [undefined, true] as const) {
            for (const incremental of [undefined, true] as const) {
                action(
                    `${outFile ? "outFile" : "multiFile"}/${subScenario}${declaration ? " with declaration" : ""}${incremental ? " with incremental" : ""}`,
                    mainErrorContent =>
                        getFsContentsForNoEmitOnError(
                            mainErrorContent,
                            outFile,
                            declaration,
                            incremental,
                        ),
                );
            }
        }
    }
}

function getNoEmitOnErrorErrorsType(): [subScenario: string, mainErrorContent: string, fixedErrorContent: string][] {
    return [
        [
            "syntax errors",
            dedent`
                import { A } from "../shared/types/db";
                const a = {
                    lastName: 'sdsd'
                ;
            `,
            dedent`
                import { A } from "../shared/types/db";
                const a = {
                    lastName: 'sdsd'
                };`,
        ],
        [
            "semantic errors",
            dedent`
                import { A } from "../shared/types/db";
                const a: string = 10;`,
            dedent`
                import { A } from "../shared/types/db";
                const a: string = "hello";`,
        ],
        [
            "dts errors",
            dedent`
                import { A } from "../shared/types/db";
                export const a = class { private p = 10; };
            `,
            dedent`
                import { A } from "../shared/types/db";
                export const a = class { p = 10; };
            `,
        ],
    ];
}

export function forEachNoEmitOnErrorScenarioTsc(commandLineArgs: string[]) {
    getNoEmitOnErrorErrorsType().forEach(([subScenario, mainErrorContent, fixedErrorContent]) =>
        forEachNoEmitOnErrorScenario(
            subScenario,
            (subScenario, fsContents) => {
                describe(subScenario, () => {
                    verifyTsc({
                        scenario: "noEmitOnError",
                        subScenario,
                        fs: () =>
                            loadProjectFromFiles(
                                fsContents(mainErrorContent),
                                {
                                    cwd: "/user/username/projects/noEmitOnError",
                                    executingFilePath: libFile.path,
                                },
                            ),
                        commandLineArgs,
                        edits: [
                            noChangeRun,
                            {
                                caption: "Fix error",
                                edit: fs => fs.writeFileSync("src/main.ts", fixedErrorContent, "utf-8"),
                            },
                            noChangeRun,
                        ],
                        baselinePrograms: true,
                    });
                });
            },
        )
    );
}

export function forEachNoEmitOnErrorScenarioTscWatch(commandLineArgs: string[]) {
    const errorTypes = getNoEmitOnErrorErrorsType();
    forEachNoEmitOnErrorScenario(
        "noEmitOnError",
        (subScenario, fsContents) =>
            verifyTscWatch({
                scenario: "noEmitOnError",
                subScenario,
                commandLineArgs: [...commandLineArgs, "--w"],
                sys: () =>
                    createWatchedSystem(
                        fsContents(errorTypes[0][1]),
                        { currentDirectory: "/user/username/projects/noEmitOnError" },
                    ),
                edits: getEdits(errorTypes),
            }),
    );

    function getEdits(errorTypes: ReturnType<typeof getNoEmitOnErrorErrorsType>): TscWatchCompileChange[] {
        const edits: TscWatchCompileChange[] = [];
        for (const [subScenario, mainErrorContent, fixedErrorContent] of errorTypes) {
            if (edits.length) {
                edits.push(
                    {
                        caption: subScenario,
                        edit: sys => sys.writeFile(`/user/username/projects/noEmitOnError/src/main.ts`, mainErrorContent),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                );
            }
            edits.push(
                {
                    caption: "No change",
                    edit: sys => sys.writeFile(`/user/username/projects/noEmitOnError/src/main.ts`, sys.readFile(`/user/username/projects/noEmitOnError/src/main.ts`)!),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: `Fix ${subScenario}`,
                    edit: sys => sys.writeFile(`/user/username/projects/noEmitOnError/src/main.ts`, fixedErrorContent),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "No change",
                    edit: sys => sys.writeFile(`/user/username/projects/noEmitOnError/src/main.ts`, sys.readFile(`/user/username/projects/noEmitOnError/src/main.ts`)!),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            );
        }
        return edits;
    }
}
