import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
    File,
} from "../virtualFileSystemWithWatch";
import {
    createSession,
    executeSessionRequest,
    makeReferenceItem,
    MakeReferenceItem,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    protocolLocationFromSubstring,
} from "./helpers";

describe("unittests:: tsserver:: getExportReferences", () => {
    const exportVariable = "export const value = 0;";
    const exportArrayDestructured = "export const [valueA, valueB] = [0, 1];";
    const exportObjectDestructured = "export const { valueC, valueD: renamedD } = { valueC: 0, valueD: 1 };";
    const exportNestedObject = "export const { nest: [valueE, { valueF }] } = { nest: [0, { valueF: 1 }] };";

    const mainTs: File = {
        path: "/main.ts",
        content: 'import { value, valueA, valueB, valueC, renamedD, valueE, valueF } from "./mod";',
    };
    const modTs: File = {
        path: "/mod.ts",
        content: `${exportVariable}
${exportArrayDestructured}
${exportObjectDestructured}
${exportNestedObject}
`,
    };
    const tsconfig: File = {
        path: "/tsconfig.json",
        content: "{}",
    };

    function makeSampleSession() {
        const host = createServerHost([mainTs, modTs, tsconfig]);
        const session = createSession(host);
        openFilesForSession([mainTs, modTs], session);
        return session;
    }

    const referenceMainTs = (mainTs: File, text: string): ts.server.protocol.ReferencesResponseItem =>
        makeReferenceItem({
            file: mainTs,
            isDefinition: false,
            isWriteAccess: true,
            lineText: mainTs.content,
            contextText: mainTs.content,
            text,
        });

    const referenceModTs = (
        texts: { text: string; lineText: string; contextText?: string },
        override: Partial<MakeReferenceItem> = {},
    ): ts.server.protocol.ReferencesResponseItem =>
        makeReferenceItem({
            file: modTs,
            isDefinition: true,
            ...texts,
            ...override,
        });

    it("should get const variable declaration references", () => {
        const session = makeSampleSession();

        const response = executeSessionRequest<ts.server.protocol.ReferencesRequest, ts.server.protocol.ReferencesResponse>(
            session,
            ts.server.protocol.CommandTypes.References,
            protocolFileLocationFromSubstring(modTs, "value"),
        );

        const expectResponse = {
            refs: [
                referenceModTs({ text: "value", lineText: exportVariable, contextText: exportVariable }),
                referenceMainTs(mainTs, "value"),
            ],
            symbolDisplayString: "const value: 0",
            symbolName: "value",
            symbolStartOffset: protocolLocationFromSubstring(modTs.content, "value").offset,
        };

        assert.deepEqual(response, expectResponse);
    });

    it("should get array destructuring declaration references", () => {
        const session = makeSampleSession();
        const response = executeSessionRequest<ts.server.protocol.ReferencesRequest, ts.server.protocol.ReferencesResponse>(
            session,
            ts.server.protocol.CommandTypes.References,
            protocolFileLocationFromSubstring(modTs, "valueA"),
        );

        const expectResponse = {
            refs: [
                referenceModTs({
                    text: "valueA",
                    lineText: exportArrayDestructured,
                    contextText: exportArrayDestructured,
                }),
                referenceMainTs(mainTs, "valueA"),
            ],
            symbolDisplayString: "const valueA: number",
            symbolName: "valueA",
            symbolStartOffset: protocolLocationFromSubstring(modTs.content, "valueA").offset,
        };

        assert.deepEqual(response, expectResponse);
    });

    it("should get object destructuring declaration references", () => {
        const session = makeSampleSession();
        const response = executeSessionRequest<ts.server.protocol.ReferencesRequest, ts.server.protocol.ReferencesResponse>(
            session,
            ts.server.protocol.CommandTypes.References,
            protocolFileLocationFromSubstring(modTs, "valueC"),
        );
        const expectResponse = {
            refs: [
                referenceModTs({
                    text: "valueC",
                    lineText: exportObjectDestructured,
                    contextText: exportObjectDestructured,
                }),
                referenceMainTs(mainTs, "valueC"),
                referenceModTs(
                    { text: "valueC", lineText: exportObjectDestructured, contextText: "valueC: 0" },
                    {
                        options: { index: 1 },
                        isDefinition: false,
                        isWriteAccess: true,
                    }),
            ],
            symbolDisplayString: "const valueC: number",
            symbolName: "valueC",
            symbolStartOffset: protocolLocationFromSubstring(modTs.content, "valueC").offset,
        };

        assert.deepEqual(response, expectResponse);
    });

    it("should get object declaration references that renames destructured property", () => {
        const session = makeSampleSession();
        const response = executeSessionRequest<ts.server.protocol.ReferencesRequest, ts.server.protocol.ReferencesResponse>(
            session,
            ts.server.protocol.CommandTypes.References,
            protocolFileLocationFromSubstring(modTs, "renamedD"),
        );

        const expectResponse = {
            refs: [
                referenceModTs({
                    text: "renamedD",
                    lineText: exportObjectDestructured,
                    contextText: exportObjectDestructured,
                }),
                referenceMainTs(mainTs, "renamedD"),
            ],
            symbolDisplayString: "const renamedD: number",
            symbolName: "renamedD",
            symbolStartOffset: protocolLocationFromSubstring(modTs.content, "renamedD").offset,
        };

        assert.deepEqual(response, expectResponse);
    });

    it("should get nested object declaration references", () => {
        const session = makeSampleSession();
        const response = executeSessionRequest<ts.server.protocol.ReferencesRequest, ts.server.protocol.ReferencesResponse>(
            session,
            ts.server.protocol.CommandTypes.References,
            protocolFileLocationFromSubstring(modTs, "valueF"),
        );

        const expectResponse = {
            refs: [
                referenceModTs({
                    text: "valueF",
                    lineText: exportNestedObject,
                    contextText: exportNestedObject,
                }),
                referenceMainTs(mainTs, "valueF"),
                referenceModTs(
                    {
                        text: "valueF",
                        lineText: exportNestedObject,
                        contextText: "valueF: 1",
                    },
                    {
                        options: { index: 1 },
                        isDefinition: false,
                        isWriteAccess: true,
                    },
                ),
            ],
            symbolDisplayString: "const valueF: number",
            symbolName: "valueF",
            symbolStartOffset: protocolLocationFromSubstring(modTs.content, "valueF").offset,
        };

        assert.deepEqual(response, expectResponse);
    });
});
