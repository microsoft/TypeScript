import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";

describe("unittests:: tsbuild:: on project with emitDeclarationOnly set to true", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = ts.loadProjectFromDisk("tests/projects/emitDeclarationOnly");
    });
    after(() => {
        projFs = undefined!;
    });

    function verifyEmitDeclarationOnly(disableMap?: true) {
        ts.verifyTscWithEdits({
            subScenario: `only dts output in circular import project with emitDeclarationOnly${disableMap ? "" : " and declarationMap"}`,
            fs: () => projFs,
            scenario: "emitDeclarationOnly",
            commandLineArgs: ["--b", "/src", "--verbose"],
            modifyFs: disableMap ?
                (fs => ts.replaceText(fs, "/src/tsconfig.json", `"declarationMap": true,`, "")) :
                undefined,
            edits: [{
                subScenario: "incremental-declaration-changes",
                modifyFs: fs => ts.replaceText(fs, "/src/src/a.ts", "b: B;", "b: B; foo: any;"),
            }],
        });
    }
    verifyEmitDeclarationOnly();
    verifyEmitDeclarationOnly(/*disableMap*/ true);

    ts.verifyTscWithEdits({
        subScenario: `only dts output in non circular imports project with emitDeclarationOnly`,
        fs: () => projFs,
        scenario: "emitDeclarationOnly",
        commandLineArgs: ["--b", "/src", "--verbose"],
        modifyFs: fs => {
            fs.rimrafSync("/src/src/index.ts");
            ts.replaceText(fs, "/src/src/a.ts", `import { B } from "./b";`, `export class B { prop = "hello"; }`);
        },
        edits: [
            {
                subScenario: "incremental-declaration-doesnt-change",
                modifyFs: fs => ts.replaceText(fs, "/src/src/a.ts", "export interface A {", `class C { }
export interface A {`),

            },
            {
                subScenario: "incremental-declaration-changes",
                modifyFs: fs => ts.replaceText(fs, "/src/src/a.ts", "b: B;", "b: B; foo: any;"),
            },
        ],
    });
});
