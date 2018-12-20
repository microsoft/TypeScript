namespace ts.projectSystem {
    describe("unittests:: tsserver:: syntax operations", () => {
        function navBarFull(session: TestSession, file: File) {
            return JSON.stringify(session.executeCommandSeq<protocol.FileRequest>({
                command: protocol.CommandTypes.NavBarFull,
                arguments: { file: file.path }
            }).response);
        }

        function openFile(session: TestSession, file: File) {
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: { file: file.path, fileContent: file.content }
            });
        }

        it("works when file is removed and added with different content", () => {
            const projectRoot = "/user/username/projects/myproject";
            const app: File = {
                path: `${projectRoot}/app.ts`,
                content: "console.log('Hello world');"
            };
            const unitTest1: File = {
                path: `${projectRoot}/unitTest1.ts`,
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
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const files = [app, libFile, tsconfig];
            const host = createServerHost(files);
            const session = createSession(host);
            const service = session.getProjectService();
            openFile(session, app);

            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(tsconfig.path)!;
            const expectedFilesWithoutUnitTest1 = files.map(f => f.path);
            checkProjectActualFiles(project, expectedFilesWithoutUnitTest1);

            host.writeFile(unitTest1.path, unitTest1.content);
            host.runQueuedTimeoutCallbacks();
            const expectedFilesWithUnitTest1 = expectedFilesWithoutUnitTest1.concat(unitTest1.path);
            checkProjectActualFiles(project, expectedFilesWithUnitTest1);

            openFile(session, unitTest1);
            checkProjectActualFiles(project, expectedFilesWithUnitTest1);

            const navBarResultUnitTest1 = navBarFull(session, unitTest1);
            host.deleteFile(unitTest1.path);
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(project, expectedFilesWithoutUnitTest1);

            session.executeCommandSeq<protocol.CloseRequest>({
                command: protocol.CommandTypes.Close,
                arguments: { file: unitTest1.path }
            });
            checkProjectActualFiles(project, expectedFilesWithoutUnitTest1);

            const unitTest1WithChangedContent: File = {
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
            checkProjectActualFiles(project, expectedFilesWithUnitTest1);

            openFile(session, unitTest1WithChangedContent);
            checkProjectActualFiles(project, expectedFilesWithUnitTest1);
            const sourceFile = project.getLanguageService().getNonBoundSourceFile(unitTest1WithChangedContent.path);
            assert.strictEqual(sourceFile.text, unitTest1WithChangedContent.content);

            const navBarResultUnitTest1WithChangedContent = navBarFull(session, unitTest1WithChangedContent);
            assert.notStrictEqual(navBarResultUnitTest1WithChangedContent, navBarResultUnitTest1, "With changes in contents of unitTest file, we should see changed naviagation bar item result");
        });
    });
}
