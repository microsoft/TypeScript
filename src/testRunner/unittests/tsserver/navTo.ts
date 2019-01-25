namespace ts.projectSystem {
    describe("unittests:: tsserver:: navigate-to for javascript project", () => {
        function containsNavToItem(items: protocol.NavtoItem[], itemName: string, itemKind: string) {
            return find(items, item => item.name === itemName && item.kind === itemKind) !== undefined;
        }

        it("should not include type symbols", () => {
            const file1: File = {
                path: "/a/b/file1.js",
                content: "function foo() {}"
            };
            const configFile: File = {
                path: "/a/b/jsconfig.json",
                content: "{}"
            };
            const host = createServerHost([file1, configFile, libFile]);
            const session = createSession(host);
            openFilesForSession([file1], session);

            // Try to find some interface type defined in lib.d.ts
            const libTypeNavToRequest = makeSessionRequest<protocol.NavtoRequestArgs>(CommandNames.Navto, { searchValue: "Document", file: file1.path, projectFileName: configFile.path });
            const items = session.executeCommand(libTypeNavToRequest).response as protocol.NavtoItem[];
            assert.isFalse(containsNavToItem(items, "Document", "interface"), `Found lib.d.ts symbol in JavaScript project nav to request result.`);

            const localFunctionNavToRequst = makeSessionRequest<protocol.NavtoRequestArgs>(CommandNames.Navto, { searchValue: "foo", file: file1.path, projectFileName: configFile.path });
            const items2 = session.executeCommand(localFunctionNavToRequst).response as protocol.NavtoItem[];
            assert.isTrue(containsNavToItem(items2, "foo", "function"), `Cannot find function symbol "foo".`);
        });
    });
}
