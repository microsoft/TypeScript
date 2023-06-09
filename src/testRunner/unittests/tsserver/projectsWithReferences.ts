import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import {
    baselineTsserverLogs,
    createProjectService,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    getTsBuildProjectFile,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: projects with references: invoking when references are already built", () => {
    it("on sample project", () => {
        const coreConfig = getTsBuildProjectFile("sample1", "core/tsconfig.json");
        const coreIndex = getTsBuildProjectFile("sample1", "core/index.ts");
        const coreAnotherModule = getTsBuildProjectFile("sample1", "core/anotherModule.ts");
        const coreSomeDecl = getTsBuildProjectFile("sample1", "core/some_decl.d.ts");
        const logicConfig = getTsBuildProjectFile("sample1", "logic/tsconfig.json");
        const logicIndex = getTsBuildProjectFile("sample1", "logic/index.ts");
        const testsConfig = getTsBuildProjectFile("sample1", "tests/tsconfig.json");
        const testsIndex = getTsBuildProjectFile("sample1", "tests/index.ts");
        const host = createServerHost([libFile, coreConfig, coreIndex, coreAnotherModule, coreSomeDecl, logicConfig, logicIndex, testsConfig, testsIndex]);
        const logger = createLoggerWithInMemoryLogs(host);
        const service = createProjectService(host, { logger });
        service.openClientFile(testsIndex.path);

        // local edit in ts file
        host.appendFile(logicIndex.path, `function foo() {}`);
        host.runQueuedTimeoutCallbacks();

        // non local edit in ts file
        host.appendFile(logicIndex.path, `export function gfoo() {}`);
        host.runQueuedTimeoutCallbacks();

        // change in project reference config file
        host.writeFile(logicConfig.path, JSON.stringify({
            compilerOptions: { composite: true, declaration: true, declarationDir: "decls" },
            references: [{ path: "../core" }]
        }));
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("projectsWithReferences", "sample project", service);
    });

    describe("on transitive references in different folders", () => {
        function createService() {
            const aConfig: File = {
                path: `/user/username/projects/myproject/a/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true },
                    files: ["index.ts"]
                }),
            };
            const bConfig: File = {
                path: `/user/username/projects/myproject/b/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                    files: ["index.ts"],
                    references: [{ path: `../a` }]
                }),
            };
            const cConfig: File = {
                path: `/user/username/projects/myproject/c/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                    files: ["index.ts"],
                    references: [{ path: `../b` }]
                }),
            };
            const aTs: File = {
                path: `/user/username/projects/myproject/a/index.ts`,
                content: `export class A {}`,
            };
            const bTs: File = {
                path: `/user/username/projects/myproject/b/index.ts`,
                content: `import {A} from '@ref/a';
export const b = new A();`,
            };
            const cTs: File = {
                path: `/user/username/projects/myproject/c/index.ts`,
                content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
            };
            const refsTs: File = {
                path: `/user/username/projects/myproject/refs/a.d.ts`,
                content: `export class X {}
export class A {}`
            };
            const host = createServerHost([libFile, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs]);
            const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            service.openClientFile(cTs.path);
            return { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs };
        }

        it("non local edit", () => {
            const { host, service, bTs } = createService();

            // non local edit
            host.appendFile(bTs.path, `export function gFoo() { }`);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "transitive references with non local edit", service);
        });

        it("edit on config file", () => {
            const { host, service, cConfig, refsTs } = createService();
            const nRefsTs: File = {
                path: `/user/username/projects/myproject/nrefs/a.d.ts`,
                content: refsTs.content
            };
            const cTsConfigJson = JSON.parse(cConfig.content);
            host.ensureFileOrFolder(nRefsTs);
            cTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
            host.writeFile(cConfig.path, JSON.stringify(cTsConfigJson));
            host.runQueuedTimeoutCallbacks();

            // revert the edit on config file
            host.writeFile(cConfig.path, cConfig.content);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "transitive references with edit on config file", service);
        });

        it("edit in referenced config file", () => {
            const { host, service, bConfig, refsTs } = createService();
            const nRefsTs: File = {
                path: `/user/username/projects/myproject/nrefs/a.d.ts`,
                content: refsTs.content
            };
            const bTsConfigJson = JSON.parse(bConfig.content);
            host.ensureFileOrFolder(nRefsTs);
            bTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
            host.writeFile(bConfig.path, JSON.stringify(bTsConfigJson));
            host.runQueuedTimeoutCallbacks();

            // revert the edit on config file
            host.writeFile(bConfig.path, bConfig.content);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "transitive references with edit in referenced config file", service);
        });

        it("deleting referenced config file", () => {
            const { host, service, bConfig } = createService();
            host.deleteFile(bConfig.path);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation

            // revert
            host.writeFile(bConfig.path, bConfig.content);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation
            baselineTsserverLogs("projectsWithReferences", "transitive references with deleting referenced config file", service);
        });

        it("deleting transitively referenced config file", () => {
            const { host, service, aConfig } = createService();
            host.deleteFile(aConfig.path);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation

            // revert
            host.writeFile(aConfig.path, aConfig.content);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation
            baselineTsserverLogs("projectsWithReferences", "transitive references with deleting transitively referenced config file", service);
        });
    });

    describe("on transitive references in different folders without files", () => {
        function createService() {
            const aConfig: File = {
                path: `/user/username/projects/myproject/a/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true } }),
            };
            const bConfig: File = {
                path: `/user/username/projects/myproject/b/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                    references: [{ path: `../a` }]
                }),
            };
            const cConfig: File = {
                path: `/user/username/projects/myproject/c/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                    references: [{ path: `../b` }]
                }),
            };
            const aTs: File = {
                path: `/user/username/projects/myproject/a/index.ts`,
                content: `export class A {}`,
            };
            const bTs: File = {
                path: `/user/username/projects/myproject/b/index.ts`,
                content: `import {A} from '@ref/a';
export const b = new A();`,
            };
            const cTs: File = {
                path: `/user/username/projects/myproject/c/index.ts`,
                content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
            };
            const refsTs: File = {
                path: `/user/username/projects/myproject/refs/a.d.ts`,
                content: `export class X {}
export class A {}`
            };
            const host = createServerHost([libFile, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs]);
            const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            service.openClientFile(cTs.path);
            return { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs };
        }

        it("non local edit", () => {
            const { host, service, bTs } = createService();

            // non local edit
            host.appendFile(bTs.path, `export function gFoo() { }`);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with non local edit", service);
        });

        it("edit on config file", () => {
            const { host, service, cConfig, refsTs } = createService();
            const nRefsTs: File = {
                path: `/user/username/projects/myproject/nrefs/a.d.ts`,
                content: refsTs.content
            };
            const cTsConfigJson = JSON.parse(cConfig.content);
            host.ensureFileOrFolder(nRefsTs);
            cTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
            host.writeFile(cConfig.path, JSON.stringify(cTsConfigJson));
            host.runQueuedTimeoutCallbacks();

            // revert the edit on config file
            host.writeFile(cConfig.path, cConfig.content);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with edit on config file", service);
        });

        it("edit in referenced config file", () => {
            const { host, service, bConfig, refsTs } = createService();
            const nRefsTs: File = {
                path: `/user/username/projects/myproject/nrefs/a.d.ts`,
                content: refsTs.content
            };
            const bTsConfigJson = JSON.parse(bConfig.content);
            host.ensureFileOrFolder(nRefsTs);
            bTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
            host.writeFile(bConfig.path, JSON.stringify(bTsConfigJson));
            host.runQueuedTimeoutCallbacks();

            // revert the edit on config file
            host.writeFile(bConfig.path, bConfig.content);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with edit in referenced config file", service);
        });

        it("deleting referenced config file", () => {
            const { host, service, bConfig } = createService();
            host.deleteFile(bConfig.path);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation

            // revert
            host.writeFile(bConfig.path, bConfig.content);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with deleting referenced config file", service);
        });

        it("deleting transitively referenced config file", () => {
            const { host, service, aConfig } = createService();
            host.deleteFile(aConfig.path);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation

            // revert
            host.writeFile(aConfig.path, aConfig.content);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with deleting transitively referenced config file", service);
        });
    });
});