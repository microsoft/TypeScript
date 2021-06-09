namespace ts.projectSystem {
    describe("unittests:: tsserver:: projects with references: invoking when references are already built", () => {
        it("on sample project", () => {
            const coreConfig = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/tsconfig.json");
            const coreIndex = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/index.ts");
            const coreAnotherModule = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/anotherModule.ts");
            const coreSomeDecl = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/some_decl.d.ts");
            const logicConfig = TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/tsconfig.json");
            const logicIndex = TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/index.ts");
            const testsConfig = TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/tsconfig.json");
            const testsIndex = TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/index.ts");
            const host = createServerHost([libFile, coreConfig, coreIndex, coreAnotherModule, coreSomeDecl, logicConfig, logicIndex, testsConfig, testsIndex]);
            const service = createProjectService(host);
            service.openClientFile(testsIndex.path);

            checkWatchedFilesDetailed(host, [coreConfig, coreIndex, coreAnotherModule, logicConfig, logicIndex, testsConfig, libFile].map(f => f.path.toLowerCase()), 1);
            checkWatchedDirectoriesDetailed(host, emptyArray, 1, /*recursive*/ false);
            checkWatchedDirectoriesDetailed(host, [
                TestFSWithWatch.getTsBuildProjectFilePath("sample1", "core"),
                TestFSWithWatch.getTsBuildProjectFilePath("sample1", "logic"),
                ...getTypeRootsFromLocation(TestFSWithWatch.getTsBuildProjectFilePath("sample1", "tests"))
            ], 1, /*recursive*/ true);

            // local edit in ts file
            host.appendFile(logicIndex.path, `function foo() {}`);
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            checkProjectActualFiles(service.configuredProjects.get(testsConfig.path)!, [libFile.path, coreIndex.path, coreAnotherModule.path, logicIndex.path, testsIndex.path, testsConfig.path]);

            // non local edit in ts file
            host.appendFile(logicIndex.path, `export function gfoo() {}`);
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            checkProjectActualFiles(service.configuredProjects.get(testsConfig.path)!, [libFile.path, coreIndex.path, coreAnotherModule.path, logicIndex.path, testsIndex.path, testsConfig.path]);

            // change in project reference config file
            host.writeFile(logicConfig.path, JSON.stringify({
                compilerOptions: { composite: true, declaration: true, declarationDir: "decls" },
                references: [{ path: "../core" }]
            }));
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            checkProjectActualFiles(service.configuredProjects.get(testsConfig.path)!, [libFile.path, coreIndex.path, coreAnotherModule.path, logicIndex.path, testsIndex.path, testsConfig.path]);
        });

        describe("on transitive references in different folders", () => {
            function createService() {
                const aConfig: File = {
                    path: `${tscWatch.projectRoot}/a/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { composite: true },
                        files: ["index.ts"]
                    }),
                };
                const bConfig: File = {
                    path: `${tscWatch.projectRoot}/b/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                        files: ["index.ts"],
                        references: [{ path: `../a` }]
                    }),
                };
                const cConfig: File = {
                    path: `${tscWatch.projectRoot}/c/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                        files: ["index.ts"],
                        references: [{ path: `../b` }]
                    }),
                };
                const aTs: File = {
                    path: `${tscWatch.projectRoot}/a/index.ts`,
                    content: `export class A {}`,
                };
                const bTs: File = {
                    path: `${tscWatch.projectRoot}/b/index.ts`,
                    content: `import {A} from '@ref/a';
export const b = new A();`,
                };
                const cTs: File = {
                    path: `${tscWatch.projectRoot}/c/index.ts`,
                    content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                };
                const refsTs: File = {
                    path: `${tscWatch.projectRoot}/refs/a.d.ts`,
                    content: `export class X {}
export class A {}`
                };
                const host = createServerHost([libFile, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs]);
                const service = createProjectService(host);
                service.openClientFile(cTs.path);
                return { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs };
            }

            it("non local edit", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/a`, // Failed to package json
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);

                // non local edit
                host.appendFile(bTs.path, `export function gFoo() { }`);
                host.checkTimeoutQueueLengthAndRun(2);
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/a`, // Failed to package json
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);
            });

            it("edit on config file", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                const nRefsTs: File = {
                    path: `${tscWatch.projectRoot}/nrefs/a.d.ts`,
                    content: refsTs.content
                };
                const cTsConfigJson = JSON.parse(cConfig.content);
                host.ensureFileOrFolder(nRefsTs);
                cTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
                host.writeFile(cConfig.path, JSON.stringify(cTsConfigJson));
                host.checkTimeoutQueueLengthAndRun(2);
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, nRefsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path, nRefsTs.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/a`, // Failed to package json
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/nrefs`, // Failed lookup since nrefs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [refsTs.path]);

                // revert the edit on config file
                host.writeFile(cConfig.path, cConfig.content);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path, nRefsTs.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/a`, // Failed to package json
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [nRefsTs.path]);
            });

            it("edit in referenced config file", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                const nRefsTs: File = {
                    path: `${tscWatch.projectRoot}/nrefs/a.d.ts`,
                    content: refsTs.content
                };
                const bTsConfigJson = JSON.parse(bConfig.content);
                host.ensureFileOrFolder(nRefsTs);
                bTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
                host.writeFile(bConfig.path, JSON.stringify(bTsConfigJson));
                host.checkTimeoutQueueLengthAndRun(2);
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, refsTs.path, nRefsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path, nRefsTs.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    `${tscWatch.projectRoot}/nrefs`, // Failed lookup since nrefs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [aTs.path]);

                // revert the edit on config file
                host.writeFile(bConfig.path, bConfig.content);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path, nRefsTs.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/a`, // Failed to package json
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [nRefsTs.path]);
            });

            it("deleting referenced config file", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                host.deleteFile(bConfig.path);
                host.checkTimeoutQueueLengthAndRun(3); // Schedules failed lookup invalidation
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [aTs.path]);

                // revert
                host.writeFile(bConfig.path, bConfig.content);
                host.checkTimeoutQueueLengthAndRun(3); // Schedules failed lookup invalidation
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/a`, // Failed to package json
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);
            });

            it("deleting transitively referenced config file", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                host.deleteFile(aConfig.path);
                host.checkTimeoutQueueLengthAndRun(3); // Schedules failed lookup invalidation
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/a`, // Failed to package json
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);

                // revert
                host.writeFile(aConfig.path, aConfig.content);
                host.checkTimeoutQueueLengthAndRun(3); // Schedules failed lookup invalidation
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/a`, // Failed to package json
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);
            });
        });

        describe("on transitive references in different folders without files", () => {
            function createService() {
                const aConfig: File = {
                    path: `${tscWatch.projectRoot}/a/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { composite: true } }),
                };
                const bConfig: File = {
                    path: `${tscWatch.projectRoot}/b/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                        references: [{ path: `../a` }]
                    }),
                };
                const cConfig: File = {
                    path: `${tscWatch.projectRoot}/c/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                        references: [{ path: `../b` }]
                    }),
                };
                const aTs: File = {
                    path: `${tscWatch.projectRoot}/a/index.ts`,
                    content: `export class A {}`,
                };
                const bTs: File = {
                    path: `${tscWatch.projectRoot}/b/index.ts`,
                    content: `import {A} from '@ref/a';
export const b = new A();`,
                };
                const cTs: File = {
                    path: `${tscWatch.projectRoot}/c/index.ts`,
                    content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                };
                const refsTs: File = {
                    path: `${tscWatch.projectRoot}/refs/a.d.ts`,
                    content: `export class X {}
export class A {}`
                };
                const host = createServerHost([libFile, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs]);
                const service = createProjectService(host);
                service.openClientFile(cTs.path);
                return { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs };
            }

            it("non local edit", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                const expectedWatchedDirectoriesDetailed = arrayToMap([
                    `${tscWatch.projectRoot}/c`, // Wild card directory
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], identity, () => 1);
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/a`, 2); // Failed to package json and wild card directory
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/b`, 2); // Failed to package json and wild card directory
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesDetailed, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);

                // non local edit
                host.appendFile(bTs.path, `export function gFoo() { }`);
                host.checkTimeoutQueueLengthAndRun(2);
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesDetailed, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);
            });

            it("edit on config file", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                const nRefsTs: File = {
                    path: `${tscWatch.projectRoot}/nrefs/a.d.ts`,
                    content: refsTs.content
                };
                const cTsConfigJson = JSON.parse(cConfig.content);
                host.ensureFileOrFolder(nRefsTs);
                cTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
                host.writeFile(cConfig.path, JSON.stringify(cTsConfigJson));
                host.checkTimeoutQueueLengthAndRun(2);
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, nRefsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path, nRefsTs.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                const expectedWatchedDirectoriesDetailed = arrayToMap([
                    `${tscWatch.projectRoot}/c`, // Wild card directory
                    `${tscWatch.projectRoot}/nrefs`, // Failed lookup since nrefs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], identity, () => 1);
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/a`, 2); // Failed to package json and wild card directory
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/b`, 2); // Failed to package json and wild card directory
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesDetailed, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [refsTs.path]);

                // revert the edit on config file
                host.writeFile(cConfig.path, cConfig.content);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path, nRefsTs.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                expectedWatchedDirectoriesDetailed.delete(`${tscWatch.projectRoot}/nrefs`);
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/refs`, 1);  // Failed lookup since refs/a.ts does not exist
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesDetailed, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [nRefsTs.path]);
            });

            it("edit in referenced config file", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                const nRefsTs: File = {
                    path: `${tscWatch.projectRoot}/nrefs/a.d.ts`,
                    content: refsTs.content
                };
                const bTsConfigJson = JSON.parse(bConfig.content);
                host.ensureFileOrFolder(nRefsTs);
                bTsConfigJson.compilerOptions.paths = { "@ref/*": ["../nrefs/*"] };
                host.writeFile(bConfig.path, JSON.stringify(bTsConfigJson));
                host.checkTimeoutQueueLengthAndRun(2);
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, refsTs.path, nRefsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path, nRefsTs.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                const expectedWatchedDirectoriesDetailed = arrayToMap([
                    `${tscWatch.projectRoot}/a`, // Wild card directory
                    `${tscWatch.projectRoot}/c`, // Wild card directory
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    `${tscWatch.projectRoot}/nrefs`, // Failed lookup since nrefs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], identity, () => 1);
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/b`, 2); // Failed to package json and wild card directory
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesDetailed, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [aTs.path]);

                // revert the edit on config file
                host.writeFile(bConfig.path, bConfig.content);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path, nRefsTs.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                expectedWatchedDirectoriesDetailed.delete(`${tscWatch.projectRoot}/nrefs`);
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/a`, 2); // Failed to package json and wild card directory
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesDetailed, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [nRefsTs.path]);
            });

            it("deleting referenced config file", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                host.deleteFile(bConfig.path);
                host.checkTimeoutQueueLengthAndRun(3); // Schedules failed lookup invalidation
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, [
                    `${tscWatch.projectRoot}/c`, // Wild card directory
                    `${tscWatch.projectRoot}/b`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], 1, /*recursive*/ true);
                // Script infos arent deleted till next file open
                checkOrphanScriptInfos(service, [aTs.path]);

                // revert
                host.writeFile(bConfig.path, bConfig.content);
                host.checkTimeoutQueueLengthAndRun(3); // Schedules failed lookup invalidation
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                const expectedWatchedDirectoriesDetailed = arrayToMap([
                    `${tscWatch.projectRoot}/c`, // Wild card directory
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], identity, () => 1);
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/a`, 2); // Failed to package json and wild card directory
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/b`, 2); // Failed to package json and wild card directory
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesDetailed, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);
            });

            it("deleting transitively referenced config file", () => {
                const { host, service, aConfig, bConfig, cConfig, aTs, bTs, cTs, refsTs } = createService();
                host.deleteFile(aConfig.path);
                host.checkTimeoutQueueLengthAndRun(3); // Schedules failed lookup invalidation
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                const expectedWatchedDirectoriesDetailed = arrayToMap([
                    `${tscWatch.projectRoot}/c`, // Wild card directory
                    `${tscWatch.projectRoot}/a`, // Failed to package json
                    `${tscWatch.projectRoot}/refs`, // Failed lookup since refs/a.ts does not exist
                    ...getTypeRootsFromLocation(`${tscWatch.projectRoot}/c`)
                ], identity, () => 1);
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/b`, 2); // Failed to package json and wild card directory
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesDetailed, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);

                // revert
                host.writeFile(aConfig.path, aConfig.content);
                host.checkTimeoutQueueLengthAndRun(3); // Schedules failed lookup invalidation
                checkProjectActualFiles(service.configuredProjects.get(cConfig.path)!, [libFile.path, cTs.path, cConfig.path, bTs.path, aTs.path, refsTs.path]);
                checkWatchedFilesDetailed(host, [libFile.path, aTs.path, bTs.path, refsTs.path, aConfig.path, bConfig.path, cConfig.path], 1);
                checkWatchedDirectoriesDetailed(host, [
                    tscWatch.projectRoot // watches for directories created for resolution of b
                ], 1, /*recursive*/ false);
                expectedWatchedDirectoriesDetailed.set(`${tscWatch.projectRoot}/a`, 2); // Failed to package json and wild card directory
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesDetailed, /*recursive*/ true);
                checkOrphanScriptInfos(service, emptyArray);
            });
        });
    });
}