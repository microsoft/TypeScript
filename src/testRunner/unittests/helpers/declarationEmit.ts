import { CompilerOptions } from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";

function getSysForDeclarationEmitWithErrors(options: CompilerOptions, incremental: true | undefined) {
    return TestServerHost.createWatchedSystem({
        "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                module: "NodeNext",
                moduleResolution: "NodeNext",
                ...options,
                incremental,
                skipLibCheck: true,
                skipDefaultLibCheck: true,
            },
        }),
        "/home/src/workspaces/project/index.ts": dedent`
            import ky from 'ky';
            export const api = ky.extend({});
        `,
        "/home/src/workspaces/project/package.json": jsonToReadableText({
            type: "module",
        }),
        "/home/src/workspaces/project/node_modules/ky/distribution/index.d.ts": dedent`
            type KyInstance = {
                extend(options: Record<string,unknown>): KyInstance;
            }
            declare const ky: KyInstance;
            export default ky;
        `,
        "/home/src/workspaces/project/node_modules/ky/package.json": jsonToReadableText({
            name: "ky",
            type: "module",
            main: "./distribution/index.js",
        }),
    });
}

function getSysForDeclarationEmitWithErrorsWithOutFile(options: CompilerOptions, incremental: true | undefined) {
    return TestServerHost.createWatchedSystem({
        "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                module: "amd",
                ...options,
                incremental,
                skipLibCheck: true,
                skipDefaultLibCheck: true,
                outFile: "./outFile.js",
            },
            include: ["src"],
        }),
        "/home/src/workspaces/project/src/index.ts": dedent`
            import ky from 'ky';
            export const api = ky.extend({});
        `,
        "/home/src/workspaces/project/ky.d.ts": dedent`
            type KyInstance = {
                extend(options: Record<string,unknown>): KyInstance;
            }
            declare const ky: KyInstance;
            export default ky;
        `,
    });
}

export function forEachDeclarationEmitWithErrorsScenario(
    action: (
        scenarioName: (scenario: string) => string,
        sys: () => TestServerHost,
    ) => void,
    withComposite: boolean,
): void {
    for (const outFile of [false, true]) {
        for (const incremental of [undefined, true] as const) {
            action(
                scenario => `${outFile ? "outFile" : "multiFile"}/${scenario}${incremental ? " with incremental" : ""}`,
                () =>
                    (outFile ? getSysForDeclarationEmitWithErrorsWithOutFile :
                        getSysForDeclarationEmitWithErrors)(
                            withComposite && incremental ?
                                { composite: true } :
                                { declaration: true },
                            incremental,
                        ),
            );
        }
    }
}
