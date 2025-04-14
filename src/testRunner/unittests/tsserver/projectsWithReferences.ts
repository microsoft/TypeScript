import { jsonToReadableText } from "../helpers.js";
import { getSysForSampleProjectReferences } from "../helpers/sampleProjectReferences.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: projectsWithReferences:: invoking when references are already built", () => {
    it("on sample project", () => {
        const host = getSysForSampleProjectReferences(
            /*withNodeNext*/ undefined,
            /*skipReferenceCoreFromTest*/ undefined,
            /*forTsserver*/ true,
        );
        const session = new TestSession(host);
        openFilesForSession(["/user/username/projects/sample1/tests/index.ts"], session);

        // local edit in ts file
        host.appendFile("/user/username/projects/sample1/logic/index.ts", `function foo() {}`);
        host.runQueuedTimeoutCallbacks();

        // non local edit in ts file
        host.appendFile("/user/username/projects/sample1/logic/index.ts", `export function gfoo() {}`);
        host.runQueuedTimeoutCallbacks();

        // change in project reference config file
        host.writeFile(
            "/user/username/projects/sample1/logic/tsconfig.json",
            jsonToReadableText({
                compilerOptions: { composite: true, declaration: true, declarationDir: "decls" },
                references: [{ path: "../core" }],
            }),
        );
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("projectsWithReferences", "sample project", session);
    });

    describe("on transitive references in different folders", () => {
        function setup() {
            const aConfig: File = {
                path: `/user/username/projects/myproject/a/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: { composite: true },
                    files: ["index.ts"],
                }),
            };
            const bConfig: File = {
                path: `/user/username/projects/myproject/b/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                    files: ["index.ts"],
                    references: [{ path: `../a` }],
                }),
            };
            const cConfig: File = {
                path: `/user/username/projects/myproject/c/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                    files: ["index.ts"],
                    references: [{ path: `../b` }],
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
export class A {}`,
            };
            const host = TestServerHost.createServerHost([aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs]);
            const session = new TestSession(host);
            openFilesForSession([cTs], session);
            return { host, session, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs };
        }

        it("non local edit", () => {
            const { host, session, bTs } = setup();

            // non local edit
            host.appendFile(bTs.path, `export function gFoo() { }`);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "transitive references with non local edit", session);
        });

        it("edit on config file", () => {
            const { host, session, cConfig, refsTs } = setup();
            const nRefsTs: File = {
                path: `/user/username/projects/myproject/nrefs/a.d.ts`,
                content: refsTs.content,
            };
            const cTsConfigJson = JSON.parse(cConfig.content);
            host.ensureFileOrFolder(nRefsTs);
            cTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
            host.writeFile(cConfig.path, jsonToReadableText(cTsConfigJson));
            host.runQueuedTimeoutCallbacks();

            // revert the edit on config file
            host.writeFile(cConfig.path, cConfig.content);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "transitive references with edit on config file", session);
        });

        it("edit in referenced config file", () => {
            const { host, session, bConfig, refsTs } = setup();
            const nRefsTs: File = {
                path: `/user/username/projects/myproject/nrefs/a.d.ts`,
                content: refsTs.content,
            };
            const bTsConfigJson = JSON.parse(bConfig.content);
            host.ensureFileOrFolder(nRefsTs);
            bTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
            host.writeFile(bConfig.path, jsonToReadableText(bTsConfigJson));
            host.runQueuedTimeoutCallbacks();

            // revert the edit on config file
            host.writeFile(bConfig.path, bConfig.content);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "transitive references with edit in referenced config file", session);
        });

        it("deleting referenced config file", () => {
            const { host, session, bConfig } = setup();
            host.deleteFile(bConfig.path);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation

            // revert
            host.writeFile(bConfig.path, bConfig.content);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation
            baselineTsserverLogs("projectsWithReferences", "transitive references with deleting referenced config file", session);
        });

        it("deleting transitively referenced config file", () => {
            const { host, session, aConfig } = setup();
            host.deleteFile(aConfig.path);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation

            // revert
            host.writeFile(aConfig.path, aConfig.content);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation
            baselineTsserverLogs("projectsWithReferences", "transitive references with deleting transitively referenced config file", session);
        });
    });

    describe("on transitive references in different folders without files", () => {
        function setup() {
            const aConfig: File = {
                path: `/user/username/projects/myproject/a/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: { composite: true } }),
            };
            const bConfig: File = {
                path: `/user/username/projects/myproject/b/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                    references: [{ path: `../a` }],
                }),
            };
            const cConfig: File = {
                path: `/user/username/projects/myproject/c/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                    references: [{ path: `../b` }],
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
export class A {}`,
            };
            const host = TestServerHost.createServerHost([aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs]);
            const session = new TestSession(host);
            openFilesForSession([cTs], session);
            return { host, session, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs };
        }

        it("non local edit", () => {
            const { host, session, bTs } = setup();

            // non local edit
            host.appendFile(bTs.path, `export function gFoo() { }`);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with non local edit", session);
        });

        it("edit on config file", () => {
            const { host, session, cConfig, refsTs } = setup();
            const nRefsTs: File = {
                path: `/user/username/projects/myproject/nrefs/a.d.ts`,
                content: refsTs.content,
            };
            const cTsConfigJson = JSON.parse(cConfig.content);
            host.ensureFileOrFolder(nRefsTs);
            cTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
            host.writeFile(cConfig.path, jsonToReadableText(cTsConfigJson));
            host.runQueuedTimeoutCallbacks();

            // revert the edit on config file
            host.writeFile(cConfig.path, cConfig.content);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with edit on config file", session);
        });

        it("edit in referenced config file", () => {
            const { host, session, bConfig, refsTs } = setup();
            const nRefsTs: File = {
                path: `/user/username/projects/myproject/nrefs/a.d.ts`,
                content: refsTs.content,
            };
            const bTsConfigJson = JSON.parse(bConfig.content);
            host.ensureFileOrFolder(nRefsTs);
            bTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
            host.writeFile(bConfig.path, jsonToReadableText(bTsConfigJson));
            host.runQueuedTimeoutCallbacks();

            // revert the edit on config file
            host.writeFile(bConfig.path, bConfig.content);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with edit in referenced config file", session);
        });

        it("deleting referenced config file", () => {
            const { host, session, bConfig } = setup();
            host.deleteFile(bConfig.path);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation

            // revert
            host.writeFile(bConfig.path, bConfig.content);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with deleting referenced config file", session);
        });

        it("deleting transitively referenced config file", () => {
            const { host, session, aConfig } = setup();
            host.deleteFile(aConfig.path);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation

            // revert
            host.writeFile(aConfig.path, aConfig.content);
            host.runQueuedTimeoutCallbacks(); // Schedules failed lookup invalidation
            baselineTsserverLogs("projectsWithReferences", "trasitive references without files with deleting transitively referenced config file", session);
        });
    });
});
