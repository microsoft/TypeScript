import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: getExportReferences", () => {
    const exportVariable = "export const value = 0;";
    const exportArrayDestructured = "export const [valueA, valueB] = [0, 1];";
    const exportObjectDestructured = "export const { valueC, valueD: renamedD } = { valueC: 0, valueD: 1 };";
    const exportNestedObject = "export const { nest: [valueE, { valueF }] } = { nest: [0, { valueF: 1 }] };";

    const mainTs: ts.projectSystem.File = {
        path: "/main.ts",
        content: 'import { value, valueA, valueB, valueC, renamedD, valueE, valueF } from "./mod";',
    };
    const modTs: ts.projectSystem.File = {
        path: "/mod.ts",
        content: `${exportVariable}
${exportArrayDestructured}
${exportObjectDestructured}
${exportNestedObject}
`,
    };
    const tsconfig: ts.projectSystem.File = {
        path: "/tsconfig.json",
        content: "{}",
    };

    function makeSampleSession() {
        const host = ts.projectSystem.createServerHost([mainTs, modTs, tsconfig]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([mainTs, modTs], session);
        return session;
    }

    const referenceMainTs = (mainTs: ts.projectSystem.File, text: string): ts.projectSystem.protocol.ReferencesResponseItem =>
        ts.projectSystem.makeReferenceItem({
            file: mainTs,
            isDefinition: false,
            isWriteAccess: true,
            lineText: mainTs.content,
            contextText: mainTs.content,
            text,
        });

    const referenceModTs = (
        texts: { text: string; lineText: string; contextText?: string },
        override: Partial<ts.projectSystem.MakeReferenceItem> = {},
    ): ts.projectSystem.protocol.ReferencesResponseItem =>
        ts.projectSystem.makeReferenceItem({
            file: modTs,
            isDefinition: true,
            ...texts,
            ...override,
        });

    it("should get const variable declaration references", () => {
        const session = makeSampleSession();

        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.ReferencesRequest, ts.projectSystem.protocol.ReferencesResponse>(
            session,
            ts.projectSystem.protocol.CommandTypes.References,
            ts.projectSystem.protocolFileLocationFromSubstring(modTs, "value"),
        );

        const expectResponse = {
            refs: [
                referenceModTs({ text: "value", lineText: exportVariable, contextText: exportVariable }),
                referenceMainTs(mainTs, "value"),
            ],
            symbolDisplayString: "const value: 0",
            symbolName: "value",
            symbolStartOffset: ts.projectSystem.protocolLocationFromSubstring(modTs.content, "value").offset,
        };

        assert.deepEqual(response, expectResponse);
    });

    it("should get array destructuring declaration references", () => {
        const session = makeSampleSession();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.ReferencesRequest, ts.projectSystem.protocol.ReferencesResponse>(
            session,
            ts.projectSystem.protocol.CommandTypes.References,
            ts.projectSystem.protocolFileLocationFromSubstring(modTs, "valueA"),
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
            symbolStartOffset: ts.projectSystem.protocolLocationFromSubstring(modTs.content, "valueA").offset,
        };

        assert.deepEqual(response, expectResponse);
    });

    it("should get object destructuring declaration references", () => {
        const session = makeSampleSession();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.ReferencesRequest, ts.projectSystem.protocol.ReferencesResponse>(
            session,
            ts.projectSystem.protocol.CommandTypes.References,
            ts.projectSystem.protocolFileLocationFromSubstring(modTs, "valueC"),
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
            symbolStartOffset: ts.projectSystem.protocolLocationFromSubstring(modTs.content, "valueC").offset,
        };

        assert.deepEqual(response, expectResponse);
    });

    it("should get object declaration references that renames destructured property", () => {
        const session = makeSampleSession();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.ReferencesRequest, ts.projectSystem.protocol.ReferencesResponse>(
            session,
            ts.projectSystem.protocol.CommandTypes.References,
            ts.projectSystem.protocolFileLocationFromSubstring(modTs, "renamedD"),
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
            symbolStartOffset: ts.projectSystem.protocolLocationFromSubstring(modTs.content, "renamedD").offset,
        };

        assert.deepEqual(response, expectResponse);
    });

    it("should get nested object declaration references", () => {
        const session = makeSampleSession();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.ReferencesRequest, ts.projectSystem.protocol.ReferencesResponse>(
            session,
            ts.projectSystem.protocol.CommandTypes.References,
            ts.projectSystem.protocolFileLocationFromSubstring(modTs, "valueF"),
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
            symbolStartOffset: ts.projectSystem.protocolLocationFromSubstring(modTs.content, "valueF").offset,
        };

        assert.deepEqual(response, expectResponse);
    });
});
