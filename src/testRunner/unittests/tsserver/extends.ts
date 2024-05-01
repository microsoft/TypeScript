import * as ts from "../../_namespaces/ts";
import {
    getConfigDirExtendsSys,
    getSymlinkedExtendsSys,
    modifyFirstExtendedConfigOfConfigDirExtendsSys,
} from "../helpers/extends";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: extends::", () => {
    it("resolves the symlink path", () => {
        const host = getSymlinkedExtendsSys(/*forTsserver*/ true);
        const session = new TestSession(host);
        openFilesForSession(["/users/user/projects/myproject/src/index.ts"], session);
        baselineTsserverLogs("tsserver", "resolves the symlink path", session);
    });

    it("configDir template", () => {
        const host = createServerHost(getConfigDirExtendsSys(), { currentDirectory: "/home/src/projects/myproject" });
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    excludeDirectories: ["${configDir}/node_modules"], // eslint-disable-line no-template-curly-in-string
                },
            },
        });
        openFilesForSession(["/home/src/projects/myproject/src/secondary.ts"], session);
        modifyFirstExtendedConfigOfConfigDirExtendsSys(host);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("tsserver", "configDir template", session);
    });
});
