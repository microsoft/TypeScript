import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    FsContents,
    libContent,
} from "./contents.js";
import { libFile } from "./virtualFileSystemWithWatch.js";

function getFsContentsForNoEmitOnError(outFile: boolean, declaration: true | undefined, incremental: true | undefined): FsContents {
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
        "/user/username/projects/noEmitOnError/src/main.ts": dedent`
            import { A } from "../shared/types/db";
            const a = {
                lastName: 'sdsd'
            ;
        `,
        "/user/username/projects/noEmitOnError/src/other.ts": dedent`
            console.log("hi");
            export { }
        `,
        [libFile.path]: libContent,
    };
}

export function forEachNoEmitOnErrorScenario<T>(
    loadFs: (contents: FsContents, currentDirectory: string, executingFilePath: string) => T,
    action: (
        scenarioName: (scenario: string) => string,
        fs: () => T,
    ) => void,
) {
    for (const outFile of [false, true]) {
        for (const declaration of [undefined, true] as const) {
            for (const incremental of [undefined, true] as const) {
                action(
                    scenario => `${scenario}${outFile ? " outFile" : ""}${declaration ? " with declaration" : ""}${incremental ? " with incremental" : ""}`,
                    () =>
                        loadFs(
                            getFsContentsForNoEmitOnError(outFile, declaration, incremental),
                            "/user/username/projects/noEmitOnError",
                            libFile.path,
                        ),
                );
            }
        }
    }
}
