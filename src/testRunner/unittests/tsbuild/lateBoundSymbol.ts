import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: lateBoundSymbol:: interface is merged and contains late bound member", () => {
    verifyTsc({
        subScenario: "interface is merged and contains late bound member",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/globals.d.ts": dedent`
                    interface SymbolConstructor {
                        (description?: string | number): symbol;
                    }
                    declare var Symbol: SymbolConstructor;
                `,
                "/home/src/workspaces/project/src/hkt.ts": `export interface HKT<T> { }`,
                "/home/src/workspaces/project/src/main.ts": dedent`
                    import { HKT } from "./hkt";

                    const sym = Symbol();

                    declare module "./hkt" {
                        interface HKT<T> {
                            [sym]: { a: T }
                        }
                    }
                    const x = 10;
                    type A = HKT<number>[typeof sym];
                `,
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        rootDir: "src",
                        incremental: true,
                    },
                }),
            }),
        scenario: "lateBoundSymbol",
        commandLineArgs: ["--b", "--verbose"],
        edits: [
            {
                caption: "incremental-declaration-doesnt-change",
                edit: sys => sys.replaceFileText("/home/src/workspaces/project/src/main.ts", "const x = 10;", ""),
            },
            {
                caption: "incremental-declaration-doesnt-change",
                edit: sys => sys.appendFile("/home/src/workspaces/project/src/main.ts", "const x = 10;"),
            },
        ],
    });
});
