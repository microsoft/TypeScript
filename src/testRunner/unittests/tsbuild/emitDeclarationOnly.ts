import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: on project with emitDeclarationOnly:: set to true", () => {
    function getEmitDeclarationOnlySys() {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/project/src/a.ts": dedent`
                import { B } from "./b";

                export interface A {
                    b: B;
                }
            `,
            "/home/src/workspaces/project/src/b.ts": dedent`
                import { C } from "./c";

                export interface B {
                    b: C;
                }
            `,
            "/home/src/workspaces/project/src/c.ts": dedent`
                import { A } from "./a";

                export interface C {
                    a: A;
                }
            `,
            "/home/src/workspaces/project/src/index.ts": dedent`
                export { A } from "./a";
                export { B } from "./b";
                export { C } from "./c";
            `,
            "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
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
    }

    function verifyEmitDeclarationOnly(disableMap?: true) {
        verifyTsc({
            subScenario: `only dts output in circular import project with emitDeclarationOnly${disableMap ? "" : " and declarationMap"}`,
            sys: getEmitDeclarationOnlySys,
            scenario: "emitDeclarationOnly",
            commandLineArgs: ["--b", "--verbose"],
            modifySystem: disableMap ?
                (sys => sys.replaceFileText("/home/src/workspaces/project/tsconfig.json", `"declarationMap": true,`, "")) :
                undefined,
            edits: [{
                caption: "incremental-declaration-changes",
                edit: sys => sys.replaceFileText("/home/src/workspaces/project/src/a.ts", "b: B;", "b: B; foo: any;"),
            }],
        });
    }
    verifyEmitDeclarationOnly();
    verifyEmitDeclarationOnly(/*disableMap*/ true);

    verifyTsc({
        subScenario: `only dts output in non circular imports project with emitDeclarationOnly`,
        sys: getEmitDeclarationOnlySys,
        scenario: "emitDeclarationOnly",
        commandLineArgs: ["--b", "--verbose"],
        modifySystem: sys => {
            sys.rimrafSync("/home/src/workspaces/project/src/index.ts");
            sys.replaceFileText("/home/src/workspaces/project/src/a.ts", `import { B } from "./b";`, `export class B { prop = "hello"; }`);
        },
        edits: [
            {
                caption: "incremental-declaration-doesnt-change",
                edit: sys =>
                    sys.replaceFileText(
                        "/home/src/workspaces/project/src/a.ts",
                        "export interface A {",
                        `class C { }
export interface A {`,
                    ),
            },
            {
                caption: "incremental-declaration-changes",
                edit: sys => sys.replaceFileText("/home/src/workspaces/project/src/a.ts", "b: B;", "b: B; foo: any;"),
            },
        ],
    });
});
