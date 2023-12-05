import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    appendText,
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: lateBoundSymbol:: interface is merged and contains late bound member", () => {
    verifyTsc({
        subScenario: "interface is merged and contains late bound member",
        fs: () =>
            loadProjectFromFiles({
                "/src/src/globals.d.ts": dedent`
                interface SymbolConstructor {
                    (description?: string | number): symbol;
                }
                declare var Symbol: SymbolConstructor;
            `,
                "/src/src/hkt.ts": `export interface HKT<T> { }`,
                "/src/src/main.ts": dedent`
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
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        rootDir: "src",
                        incremental: true,
                    },
                }),
            }),
        scenario: "lateBoundSymbol",
        commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
        edits: [
            {
                caption: "incremental-declaration-doesnt-change",
                edit: fs => replaceText(fs, "/src/src/main.ts", "const x = 10;", ""),
            },
            {
                caption: "incremental-declaration-doesnt-change",
                edit: fs => appendText(fs, "/src/src/main.ts", "const x = 10;"),
            },
        ],
    });
});
