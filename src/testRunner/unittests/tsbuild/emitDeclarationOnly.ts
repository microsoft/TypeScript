import * as vfs from "../../_namespaces/vfs";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromDisk,
    replaceText
} from "../helpers/vfs";

describe("unittests:: tsbuild:: on project with emitDeclarationOnly set to true", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromDisk("tests/projects/emitDeclarationOnly");
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
                edit: fs => replaceText(fs, "/src/src/a.ts", "export interface A {", `class C { }
export interface A {`),

            },
            {
                caption: "incremental-declaration-changes",
                edit: fs => replaceText(fs, "/src/src/a.ts", "b: B;", "b: B; foo: any;"),
            },
        ],
    });
});
