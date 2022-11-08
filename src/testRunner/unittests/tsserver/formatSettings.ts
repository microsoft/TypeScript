import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: format settings", () => {
    it("can be set globally", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let x;"
        };
        const host = ts.projectSystem.createServerHost([f1]);
        const projectService = ts.projectSystem.createProjectService(host);
        projectService.openClientFile(f1.path);

        const defaultSettings = projectService.getFormatCodeOptions(f1.path as ts.server.NormalizedPath);

        // set global settings
        const newGlobalSettings1 = { ...defaultSettings, placeOpenBraceOnNewLineForControlBlocks: !defaultSettings.placeOpenBraceOnNewLineForControlBlocks };
        projectService.setHostConfiguration({ formatOptions: newGlobalSettings1 });

        // get format options for file - should be equal to new global settings
        const s1 = projectService.getFormatCodeOptions(ts.server.toNormalizedPath(f1.path));
        assert.deepEqual(s1, newGlobalSettings1, "file settings should be the same with global settings");

        // set per file format options
        const newPerFileSettings = { ...defaultSettings, insertSpaceAfterCommaDelimiter: !defaultSettings.insertSpaceAfterCommaDelimiter };
        projectService.setHostConfiguration({ formatOptions: newPerFileSettings, file: f1.path });

        // get format options for file - should be equal to new per-file settings
        const s2 = projectService.getFormatCodeOptions(ts.server.toNormalizedPath(f1.path));
        assert.deepEqual(s2, newPerFileSettings, "file settings should be the same with per-file settings");

        // set new global settings - they should not affect ones that were set per-file
        const newGlobalSettings2 = { ...defaultSettings, insertSpaceAfterSemicolonInForStatements: !defaultSettings.insertSpaceAfterSemicolonInForStatements };
        projectService.setHostConfiguration({ formatOptions: newGlobalSettings2 });

        // get format options for file - should be equal to new per-file settings
        const s3 = projectService.getFormatCodeOptions(ts.server.toNormalizedPath(f1.path));
        assert.deepEqual(s3, newPerFileSettings, "file settings should still be the same with per-file settings");
    });
});
