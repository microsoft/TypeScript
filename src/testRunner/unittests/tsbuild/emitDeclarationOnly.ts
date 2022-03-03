namespace ts {
    describe("unittests:: tsbuild:: on project with emitDeclarationOnly set to true", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/emitDeclarationOnly");
        });
        after(() => {
            projFs = undefined!;
        });

        function verifyEmitDeclarationOnly(disableMap?: true) {
            verifyTscSerializedIncrementalEdits({
                subScenario: `only dts output in circular import project with emitDeclarationOnly${disableMap ? "" : " and declarationMap"}`,
                fs: () => projFs,
                scenario: "emitDeclarationOnly",
                commandLineArgs: ["--b", "/src", "--verbose"],
                modifyFs: disableMap ?
                    (fs => replaceText(fs, "/src/tsconfig.json", `"declarationMap": true,`, "")) :
                    undefined,
                incrementalScenarios: [{
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => replaceText(fs, "/src/src/a.ts", "b: B;", "b: B; foo: any;"),
                }],
            });
        }
        verifyEmitDeclarationOnly();
        verifyEmitDeclarationOnly(/*disableMap*/ true);

        verifyTscSerializedIncrementalEdits({
            subScenario: `only dts output in non circular imports project with emitDeclarationOnly`,
            fs: () => projFs,
            scenario: "emitDeclarationOnly",
            commandLineArgs: ["--b", "/src", "--verbose"],
            modifyFs: fs => {
                fs.rimrafSync("/src/src/index.ts");
                replaceText(fs, "/src/src/a.ts", `import { B } from "./b";`, `export class B { prop = "hello"; }`);
            },
            incrementalScenarios: [
                {
                    buildKind: BuildKind.IncrementalDtsUnchanged,
                    modifyFs: fs => replaceText(fs, "/src/src/a.ts", "export interface A {", `class C { }
export interface A {`),

                },
                {
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => replaceText(fs, "/src/src/a.ts", "b: B;", "b: B; foo: any;"),

                },
            ],
        });
    });
}
