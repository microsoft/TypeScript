import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
} from "../helpers/tsserver";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: formatSettings", () => {
    it("can be set globally", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let x;"
        };
        const host = createServerHost([f1]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([f1], session);

        const defaultSettings = session.getProjectService().getFormatCodeOptions(f1.path as ts.server.NormalizedPath);

        // set global settings
        const newGlobalSettings1 = { ...defaultSettings, placeOpenBraceOnNewLineForControlBlocks: !defaultSettings.placeOpenBraceOnNewLineForControlBlocks };
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { formatOptions: newGlobalSettings1 }
        });

        // get format options for file - should be equal to new global settings
        session.logger.log(`FormatCodeOptions should be global:: ${f1.path}:: ${JSON.stringify(session.getProjectService().getFormatCodeOptions(ts.server.toNormalizedPath(f1.path)), undefined, " ")}`);

        // set per file format options
        const newPerFileSettings = { ...defaultSettings, insertSpaceAfterCommaDelimiter: !defaultSettings.insertSpaceAfterCommaDelimiter };
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { formatOptions: newPerFileSettings, file: f1.path }
        });

        // get format options for file - should be equal to new per-file settings
        session.logger.log(`FormatCodeOptions should be per file:: ${f1.path}:: ${JSON.stringify(session.getProjectService().getFormatCodeOptions(ts.server.toNormalizedPath(f1.path)), undefined, " ")}`);

        // set new global settings - they should not affect ones that were set per-file
        const newGlobalSettings2 = { ...defaultSettings, insertSpaceAfterSemicolonInForStatements: !defaultSettings.insertSpaceAfterSemicolonInForStatements };
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { formatOptions: newGlobalSettings2 }
        });

        // get format options for file - should be equal to new per-file settings
        session.logger.log(`FormatCodeOptions should be per file:: ${f1.path}:: ${JSON.stringify(session.getProjectService().getFormatCodeOptions(ts.server.toNormalizedPath(f1.path)), undefined, " ")}`);
        baselineTsserverLogs("formatSettings", "works when extends is specified with a case insensitive file system", session);
    });
});
