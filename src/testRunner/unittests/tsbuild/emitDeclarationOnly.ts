import {
    dedent,
} from "../../_namespaces/Utils";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: on project with emitDeclarationOnly set to true", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromFiles({
            "/src/src/a.ts": dedent`
                import { B } from "./b";

                export interface A {
                    b: B;
                }
            `,
            "/src/src/b.ts": dedent`
                import { C } from "./c";

                export interface B {
                    b: C;
                }
            `,
            "/src/src/c.ts": dedent`
                import { A } from "./a";

                export interface C {
                    a: A;
                }
            `,
            "/src/src/index.ts": dedent`
                export { A } from "./a";
                export { B } from "./b";
                export { C } from "./c";
            `,
            "/src/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    incremental: true,
                    target: "es5",
                    module: "commonjs",
                    declaration: true,
                    declarationMap: true,
                    sourceMap: true,
                    outDir: "./lib",
                    composite: true,
                    strict: true,
                    esModuleInterop: true,
                    alwaysStrict: true,
                    rootDir: "src",
                    emitDeclarationOnly: true,
                },
            }),
        });
    });
    after(() => {
        projFs = undefined!;
    });

    function verifyEmitDeclarationOnly(disableMap?: true) {
        verifyTsc({
            subScenario: `only dts output in circular import project with emitDeclarationOnly${disableMap ? "" : " and declarationMap"}`,
            fs: () => projFs,
            scenario: "emitDeclarationOnly",
            commandLineArgs: ["--b", "/src", "--verbose"],
            modifyFs: disableMap ?
                (fs => replaceText(fs, "/src/tsconfig.json", `"declarationMap": true,`, "")) :
                undefined,
            edits: [{
                caption: "incremental-declaration-changes",
                edit: fs => replaceText(fs, "/src/src/a.ts", "b: B;", "b: B; foo: any;"),
            }],
        });
    }
    verifyEmitDeclarationOnly();
    verifyEmitDeclarationOnly(/*disableMap*/ true);

    verifyTsc({
        subScenario: `only dts output in non circular imports project with emitDeclarationOnly`,
        fs: () => projFs,
        scenario: "emitDeclarationOnly",
        commandLineArgs: ["--b", "/src", "--verbose"],
        modifyFs: fs => {
            fs.rimrafSync("/src/src/index.ts");
            replaceText(fs, "/src/src/a.ts", `import { B } from "./b";`, `export class B { prop = "hello"; }`);
        },
        edits: [
            {
                caption: "incremental-declaration-doesnt-change",
                edit: fs =>
                    replaceText(
                        fs,
                        "/src/src/a.ts",
                        "export interface A {",
                        `class C { }
export interface A {`,
                    ),
            },
            {
                caption: "incremental-declaration-changes",
                edit: fs => replaceText(fs, "/src/src/a.ts", "b: B;", "b: B; foo: any;"),
            },
        ],
    });
});
