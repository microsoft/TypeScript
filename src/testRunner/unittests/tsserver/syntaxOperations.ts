import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: syntax operations", () => {
    function navBarFull(session: ts.projectSystem.TestSession, file: ts.projectSystem.File) {
        return JSON.stringify(session.executeCommandSeq<ts.projectSystem.protocol.FileRequest>({
            command: ts.projectSystem.protocol.CommandTypes.NavBarFull,
            arguments: { file: file.path }
        }).response);
    }

    function openFile(session: ts.projectSystem.TestSession, file: ts.projectSystem.File) {
        session.executeCommandSeq<ts.projectSystem.protocol.OpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Open,
            arguments: { file: file.path, fileContent: file.content }
        });
    }

    it("works when file is removed and added with different content", () => {
        const app: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/app.ts`,
            content: "console.log('Hello world');"
        };
        const unitTest1: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/unitTest1.ts`,
            content: `import assert = require('assert');

describe("Test Suite 1", () => {
    it("Test A", () => {
        assert.ok(true, "This shouldn't fail");
    });

    it("Test B", () => {
        assert.ok(1 === 1, "This shouldn't fail");
        assert.ok(false, "This should fail");
    });
});`
        };
        const tsconfig: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const files = [app, ts.projectSystem.libFile, tsconfig];
        const host = ts.projectSystem.createServerHost(files);
        const session = ts.projectSystem.createSession(host);
        const service = session.getProjectService();
        openFile(session, app);

        ts.projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
        const project = service.configuredProjects.get(tsconfig.path)!;
        const expectedFilesWithoutUnitTest1 = files.map(f => f.path);
        ts.projectSystem.checkProjectActualFiles(project, expectedFilesWithoutUnitTest1);

        host.writeFile(unitTest1.path, unitTest1.content);
        host.runQueuedTimeoutCallbacks();
        const expectedFilesWithUnitTest1 = expectedFilesWithoutUnitTest1.concat(unitTest1.path);
        ts.projectSystem.checkProjectActualFiles(project, expectedFilesWithUnitTest1);

        openFile(session, unitTest1);
        ts.projectSystem.checkProjectActualFiles(project, expectedFilesWithUnitTest1);

        const navBarResultUnitTest1 = navBarFull(session, unitTest1);
        host.deleteFile(unitTest1.path);
        host.checkTimeoutQueueLengthAndRun(0);
        ts.projectSystem.checkProjectActualFiles(project, expectedFilesWithUnitTest1);

        session.executeCommandSeq<ts.projectSystem.protocol.CloseRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Close,
            arguments: { file: unitTest1.path }
        });
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkProjectActualFiles(project, expectedFilesWithoutUnitTest1);

        const unitTest1WithChangedContent: ts.projectSystem.File = {
            path: unitTest1.path,
            content: `import assert = require('assert');

export function Test1() {
    assert.ok(true, "This shouldn't fail");
};

export function Test2() {
    assert.ok(1 === 1, "This shouldn't fail");
    assert.ok(false, "This should fail");
};`
        };
        host.writeFile(unitTest1.path, unitTest1WithChangedContent.content);
        host.runQueuedTimeoutCallbacks();
        ts.projectSystem.checkProjectActualFiles(project, expectedFilesWithUnitTest1);

        openFile(session, unitTest1WithChangedContent);
        ts.projectSystem.checkProjectActualFiles(project, expectedFilesWithUnitTest1);
        const sourceFile = project.getLanguageService().getNonBoundSourceFile(unitTest1WithChangedContent.path);
        assert.strictEqual(sourceFile.text, unitTest1WithChangedContent.content);

        const navBarResultUnitTest1WithChangedContent = navBarFull(session, unitTest1WithChangedContent);
        assert.notStrictEqual(navBarResultUnitTest1WithChangedContent, navBarResultUnitTest1, "With changes in contents of unitTest file, we should see changed naviagation bar item result");
    });
});
