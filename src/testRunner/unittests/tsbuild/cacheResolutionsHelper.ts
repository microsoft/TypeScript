import * as Utils from "../../_namespaces/Utils";
import {
    createServerHost,
    createWatchedSystem,
    libFile,
} from "../virtualFileSystemWithWatch";
import {
    loadProjectFromFiles,
} from "../tsc/helpers";
import {
    solutionBuildWithBaseline,
} from "../tscWatch/helpers";

function getRandomFileContent() {
    return `export const x = 10;`;
}
function getPkgPackageJsonContent(pkg: number) {
    return JSON.stringify({
        name: `pkg${pkg}`,
        version: "0.0.1",
        exports: {
            import: "./import.js",
            require: "./require.js"
        }
    });
}
export function getPkgImportContent(type: "Import" | "Require", pkg: number) {
    return `export interface ${type}Interface${pkg} {}`;
}
export function getPkgTypeRefContent(type: "Import" | "Require", pkg: number) {
    return Utils.dedent`
            export {};
            declare global {
                interface ${type}Interface${pkg} {}
            }
        `;
}
function getFsMapWithNode16(): { [path: string]: string; } {
    return {
        "/src/project/tsconfig.json": JSON.stringify({
            compilerOptions: {
                moduleResolution: "node16",
                composite: true,
                cacheResolutions: true,
                traceResolution: true,
            },
            include: ["*.ts"],
            exclude: ["*.d.ts"]
        }),
        "/src/project/fileWithImports.ts": Utils.dedent`
                import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
                import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };
            `,
        "/src/project/randomFileForImport.ts": getRandomFileContent(),
        "/src/project/node_modules/pkg0/package.json": getPkgPackageJsonContent(0),
        "/src/project/node_modules/pkg0/import.d.ts": getPkgImportContent("Import", 0),
        "/src/project/node_modules/pkg0/require.d.ts": getPkgImportContent("Require", 0),
        "/src/project/node_modules/pkg1/package.json": getPkgPackageJsonContent(1),
        "/src/project/node_modules/pkg1/import.d.ts": getPkgImportContent("Import", 1),
        "/src/project/fileWithTypeRefs.ts": Utils.dedent`
                /// <reference types="pkg2" resolution-mode="import"/>
                /// <reference types="pkg3" resolution-mode="require"/>
                interface LocalInterface extends ImportInterface2, RequireInterface3 {}
                export {}
            `,
        "/src/project/randomFileForTypeRef.ts": getRandomFileContent(),
        "/src/project/node_modules/pkg2/package.json": getPkgPackageJsonContent(2),
        "/src/project/node_modules/pkg2/import.d.ts": getPkgTypeRefContent("Import", 2),
        "/src/project/node_modules/pkg2/require.d.ts": getPkgTypeRefContent("Require", 2),
        "/src/project/node_modules/pkg3/package.json": getPkgPackageJsonContent(3),
        "/src/project/node_modules/pkg3/import.d.ts": getPkgTypeRefContent("Import", 3),
        "/src/project/node_modules/@types/pkg4/index.d.ts": getRandomFileContent(),
    };
}

export function getFsWithNode16() {
    return loadProjectFromFiles(getFsMapWithNode16());
}

export function getWatchSystemWithNode16() {
    const system = createWatchedSystem(getFsMapWithNode16(), { currentDirectory: "/src/project" });
    system.ensureFileOrFolder(libFile);
    return system;
}

export function getServerHostWithNode16() {
    const system = createServerHost(getFsMapWithNode16(), { currentDirectory: "/src/project" });
    system.writeFile(libFile.path, libFile.content);
    return system;
}

export function getWatchSystemWithNode16WithBuild() {
    const system = getWatchSystemWithNode16();
    solutionBuildWithBaseline(system, ["/src/project"]);
    return system;
}

export function getServerHostWithNode16WithBuild() {
    const system = getServerHostWithNode16();
    solutionBuildWithBaseline(system, ["/src/project"]);
    return system;
}

function getFsMapWithOut(): { [path: string]: string; } {
    return {
        "/src/project/tsconfig.json": JSON.stringify({
            compilerOptions: {
                module: "amd",
                composite: true,
                cacheResolutions: true,
                traceResolution: true,
                out: "./out.js"
            },
            include: ["*.ts"],
            exclude: ["*.d.ts"]
        }),
        "/src/project/fileWithImports.ts": Utils.dedent`
                import type { ImportInterface0 } from "pkg0";
                import type { RequireInterface1 } from "pkg1";
            `,
        "/src/project/randomFileForImport.ts": getRandomFileContent(),
        "/src/project/pkg0.d.ts": getPkgImportContent("Import", 0),
        "/src/project/fileWithTypeRefs.ts": Utils.dedent`
                /// <reference types="pkg2"/>
                /// <reference types="pkg3"/>
                interface LocalInterface extends ImportInterface2, RequireInterface3 {}
                export {}
            `,
        "/src/project/randomFileForTypeRef.ts": getRandomFileContent(),
        "/src/project/node_modules/pkg2/index.d.ts": getPkgTypeRefContent("Import", 2),
        "/src/project/node_modules/@types/pkg4/index.d.ts": getRandomFileContent(),
    };
}

export function getFsWithOut() {
    return loadProjectFromFiles(getFsMapWithOut());
}

export function getWatchSystemWithOut() {
    const system = createWatchedSystem(getFsMapWithOut(), { currentDirectory: "/src/project" });
    system.ensureFileOrFolder(libFile);
    return system;
}

export function getServerHostWithOut() {
    const system = createServerHost(getFsMapWithOut(), { currentDirectory: "/src/project" });
    system.ensureFileOrFolder(libFile);
    return system;
}

export function getWatchSystemWithOutWithBuild() {
    const system = getWatchSystemWithOut();
    solutionBuildWithBaseline(system, ["/src/project"]);
    return system;
}

export function getServerHostWithOutWithBuild() {
    const system = getServerHostWithOut();
    solutionBuildWithBaseline(system, ["/src/project"]);
    return system;
}

function getFsMapWithMultipleProjects(): { [path: string]: string; } {
    return {
        "/src/project/tsconfig.a.json": JSON.stringify({
            compilerOptions: {
                composite: true,
                cacheResolutions: true,
                traceResolution: true,
            },
            files: ["aFileWithImports.ts", "aRandomFileForImport.ts", "aRandomFileForImport2.ts"],
        }),
        "/src/project/aFileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            export { x } from "./aRandomFileForImport";
            export { x as x2 } from "./aRandomFileForImport2";
            export const y = 10;
        `,
        "/src/project/aRandomFileForImport.ts": getRandomFileContent(),
        "/src/project/aRandomFileForImport2.ts": getRandomFileContent(),
        "/src/project/node_modules/pkg0/index.d.ts": getPkgImportContent("Import", 0),
        "/src/project/tsconfig.b.json": JSON.stringify({
            compilerOptions: {
                composite: true,
                cacheResolutions: true,
                traceResolution: true,
            },
            files: ["bFileWithImports.ts", "bRandomFileForImport.ts", "bRandomFileForImport2.ts"],
            references: [{ path: "./tsconfig.a.json" }]
        }),
        "/src/project/bFileWithImports.ts": Utils.dedent`
            export { y } from "./aFileWithImports";
            export { x } from "./bRandomFileForImport";
            import type { ImportInterface0 } from "pkg0";
        `,
        "/src/project/bRandomFileForImport.ts": getRandomFileContent(),
        "/src/project/bRandomFileForImport2.ts": getRandomFileContent(),
        "/src/project/tsconfig.json": JSON.stringify({
            compilerOptions: {
                composite: true,
                cacheResolutions: true,
                traceResolution: true,
                module: "amd"
            },
            files: ["cFileWithImports.ts", "cRandomFileForImport.ts", "cRandomFileForImport2.ts"],
            references: [{ path: "./tsconfig.a.json" }, { path: "./tsconfig.b.json" }]
        }),
        "/src/project/cFileWithImports.ts": Utils.dedent`
            import { y } from "./bFileWithImports";
            import type { ImportInterface0 } from "pkg0";
        `,
        "/src/project/cRandomFileForImport.ts": getRandomFileContent(),
        "/src/project/cRandomFileForImport2.ts": getRandomFileContent(),
        "/src/project/pkg0.d.ts": getPkgImportContent("Import", 0),
    };
}

export function getFsWithMultipleProjects() {
    return loadProjectFromFiles(getFsMapWithMultipleProjects());
}

export function getWatchSystemWithMultipleProjects() {
    const system = createWatchedSystem(getFsMapWithMultipleProjects(), { currentDirectory: "/src/project" });
    system.ensureFileOrFolder(libFile);
    return system;
}

export function getServerHostWithMultipleProjects() {
    const system = createServerHost(getFsMapWithMultipleProjects(), { currentDirectory: "/src/project" });
    system.writeFile(libFile.path, libFile.content);
    return system;
}

export function getWatchSystemWithMultipleProjectsWithBuild() {
    const system = getWatchSystemWithMultipleProjects();
    solutionBuildWithBaseline(system, ["/src/project"]);
    return system;
}

export function getServerHostWithMultipleProjectsWithBuild() {
    const system = getServerHostWithMultipleProjects();
    solutionBuildWithBaseline(system, ["/src/project"]);
    return system;
}

function getFsMapWithSameResolutionFromMultiplePlaces(): { [path: string]: string; } {
    return {
        "/src/project/tsconfig.json": JSON.stringify({
            compilerOptions: {
                composite: true,
                cacheResolutions: true,
                traceResolution: true,
            },
            files: [
                "fileWithImports.ts",
                "randomFileForImport.ts",
                "a/fileWithImports.ts",
                "b/ba/fileWithImports.ts",
                "b/randomFileForImport.ts",
                "c/ca/fileWithImports.ts",
                "c/ca/caa/randomFileForImport.ts",
                "c/ca/caa/caaa/fileWithImports.ts",
                "c/cb/fileWithImports.ts",
                "d/da/daa/daaa/x/y/z/randomFileForImport.ts",
                "d/da/daa/daaa/fileWithImports.ts",
                "d/da/daa/fileWithImports.ts",
                "d/da/fileWithImports.ts",
                "e/ea/fileWithImports.ts",
                "e/ea/eaa/fileWithImports.ts",
                "e/ea/eaa/eaaa/fileWithImports.ts",
                "e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
                "f/fa/faa/x/y/z/randomFileForImport.ts",
                "f/fa/faa/faaa/fileWithImports.ts",
            ],
        }),
        "/src/project/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/randomFileForImport.ts": getRandomFileContent(),
        "/src/project/a/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/b/ba/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/b/randomFileForImport.ts": getRandomFileContent(),
        "/src/project/c/ca/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/c/ca/caa/randomFileForImport.ts": getRandomFileContent(),
        "/src/project/c/ca/caa/caaa/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/c/cb/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts": getRandomFileContent(),
        "/src/project/d/da/daa/daaa/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/d/da/daa/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/d/da/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/e/ea/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/e/ea/eaa/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/e/ea/eaa/eaaa/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts": getRandomFileContent(),
        "/src/project/f/fa/faa/faaa/fileWithImports.ts": Utils.dedent`
            import type { ImportInterface0 } from "pkg0";
            import type { ImportInterface1 } from "pkg1";
        `,
        "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts": getRandomFileContent(),
        "/src/project/node_modules/pkg0/index.d.ts": getPkgImportContent("Import", 0),
    };
}

export function getFsWithSameResolutionFromMultiplePlaces() {
    return loadProjectFromFiles(getFsMapWithSameResolutionFromMultiplePlaces());
}

export function getWatchSystemWithSameResolutionFromMultiplePlaces() {
    const system = createWatchedSystem(getFsMapWithSameResolutionFromMultiplePlaces(), { currentDirectory: "/src/project" });
    system.ensureFileOrFolder(libFile);
    return system;
}

export function getServerHostWithSameResolutionFromMultiplePlaces() {
    const system = createServerHost(getFsMapWithSameResolutionFromMultiplePlaces(), { currentDirectory: "/src/project" });
    system.writeFile(libFile.path, libFile.content);
    return system;
}

export function getWatchSystemWithSameResolutionFromMultiplePlacesWithBuild() {
    const system = getWatchSystemWithSameResolutionFromMultiplePlaces();
    solutionBuildWithBaseline(system, ["/src/project"]);
    return system;
}

export function getServerHostWithSameResolutionFromMultiplePlacesWithBuild() {
    const system = getServerHostWithSameResolutionFromMultiplePlaces();
    solutionBuildWithBaseline(system, ["/src/project"]);
    return system;
}

function getFsMapWithPackageJsonEdits(): { [path: string]: string; } {
    return {
        "/src/projects/project/src/tsconfig.json": JSON.stringify({
            compilerOptions: {
                target: "es2016",
                composite: true,
                module: "node16",
                outDir: "../out",
                cacheResolutions: true,
                traceResolution: true,
            },
            files: [
                "fileA.ts",
                "fileB.mts",
                "randomFile.ts",
                "a/randomFile.ts",
                "b/ba/randomFile.ts",
                "b/randomFile.ts",
                "c/ca/randomFile.ts",
                "c/ca/caa/randomFile.ts",
                "c/ca/caa/caaa/randomFile.ts",
                "c/cb/randomFile.ts",
                "d/da/daa/daaa/x/y/z/randomFile.ts",
                "d/da/daa/daaa/randomFile.ts",
                "d/da/daa/randomFile.ts",
                "d/da/randomFile.ts",
                "e/ea/randomFile.ts",
                "e/ea/eaa/randomFile.ts",
                "e/ea/eaa/eaaa/randomFile.ts",
                "e/ea/eaa/eaaa/x/y/z/randomFile.ts",
                "f/fa/faa/x/y/z/randomFile.ts",
                "f/fa/faa/faaa/randomFile.ts",
            ],
        }),
        "/src/projects/project/src/fileA.ts": Utils.dedent`
            import { foo } from "./fileB.mjs";
            foo();
        `,
        "/src/projects/project/src/fileB.mts": `export function foo() {}`,
        "/src/projects/project/src/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/a/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/b/ba/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/b/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/c/ca/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/c/ca/caa/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/c/ca/caa/caaa/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/c/cb/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/d/da/daa/daaa/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/d/da/daa/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/d/da/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/e/ea/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/e/ea/eaa/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/f/fa/faa/faaa/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts": getRandomFileContent(),
        "/src/projects/project/package.json": JSON.stringify({ name: "app", version: "1.0.0" }),
    };
}

export function getFsWithPackageJsonEdits() {
    return loadProjectFromFiles(getFsMapWithPackageJsonEdits(), /*libContentsToAppend*/ undefined, "/lib/lib.es2016.full.d.ts");
}

export function getWatchSystemWithPackageJsonEdits() {
    const system = createWatchedSystem(getFsMapWithPackageJsonEdits(), { currentDirectory: "/src/projects/project" });
    system.ensureFileOrFolder({ ...libFile, path: "/a/lib/lib.es2016.full.d.ts" });
    return system;
}

export function getServerHostWithPackageJsonEdits() {
    const system = createServerHost(getFsMapWithPackageJsonEdits(), { currentDirectory: "/src/projects/project" });
    system.ensureFileOrFolder({ ...libFile, path: "/a/lib/lib.es2016.full.d.ts" });
    return system;
}

export function getWatchSystemWithPackageJsonEditsWithBuild() {
    const system = getWatchSystemWithPackageJsonEdits();
    solutionBuildWithBaseline(system, ["/src/project/src"]);
    return system;
}

export function getServerHostWithPackageJsonEditsWithBuild() {
    const system = getServerHostWithPackageJsonEdits();
    solutionBuildWithBaseline(system, ["/src/project/src"]);
    return system;
}