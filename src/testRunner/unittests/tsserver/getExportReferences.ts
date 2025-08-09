import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: getExportReferences::", () => {
    function makeSampleSession() {
        const mainTs: File = {
            path: "/home/src/projects/project/main.ts",
            content: 'import { value, valueA, valueB, valueC, renamedD, valueE, valueF } from "./mod";',
        };
        const modTs: File = {
            path: "/home/src/projects/project/mod.ts",
            content: `export const value = 0;
export const [valueA, valueB] = [0, 1];
export const { valueC, valueD: renamedD } = { valueC: 0, valueD: 1 };
export const { nest: [valueE, { valueF }] } = { nest: [0, { valueF: 1 }] };
`,
        };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: "{}",
        };
        const host = TestServerHost.createServerHost([mainTs, modTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([mainTs, modTs], session);
        return { session, modTs };
    }

    it("should get const variable declaration references", () => {
        const { session, modTs } = makeSampleSession();
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(modTs, "value"),
        });
        baselineTsserverLogs("getExportReferences", "const variable declaration", session);
    });

    it("should get array destructuring declaration references", () => {
        const { session, modTs } = makeSampleSession();
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(modTs, "valueA"),
        });
        baselineTsserverLogs("getExportReferences", "array destructuring declaration", session);
    });

    it("should get object destructuring declaration references", () => {
        const { session, modTs } = makeSampleSession();
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(modTs, "valueC"),
        });
        baselineTsserverLogs("getExportReferences", "object destructuring declaration", session);
    });

    it("should get object declaration references that renames destructured property", () => {
        const { session, modTs } = makeSampleSession();
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(modTs, "renamedD"),
        });
        baselineTsserverLogs("getExportReferences", "object declaration references that renames destructured property", session);
    });

    it("should get nested object declaration references", () => {
        const { session, modTs } = makeSampleSession();
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(modTs, "valueF"),
        });
        baselineTsserverLogs("getExportReferences", "nested object declaration", session);
    });
});
