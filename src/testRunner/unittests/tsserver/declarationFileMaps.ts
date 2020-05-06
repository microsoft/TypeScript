namespace ts.projectSystem {
    function documentSpanFromSubstring({ file, text, contextText, options, contextOptions }: DocumentSpanFromSubstring): DocumentSpan {
        const contextSpan = contextText !== undefined ? documentSpanFromSubstring({ file, text: contextText, options: contextOptions }) : undefined;
        return {
            fileName: file.path,
            textSpan: textSpanFromSubstring(file.content, text, options),
            ...contextSpan && { contextSpan: contextSpan.textSpan }
        };
    }

    function renameLocation(input: DocumentSpanFromSubstring): RenameLocation {
        return documentSpanFromSubstring(input);
    }

    interface MakeReferenceEntry extends DocumentSpanFromSubstring {
        isDefinition: boolean;
    }
    function makeReferenceEntry({ isDefinition, ...rest }: MakeReferenceEntry): ReferenceEntry {
        return {
            ...documentSpanFromSubstring(rest),
            isDefinition,
            isWriteAccess: isDefinition,
            isInString: undefined,
        };
    }

    function checkDeclarationFiles(file: File, session: TestSession, expectedFiles: readonly File[]): void {
        openFilesForSession([file], session);
        const project = Debug.checkDefined(session.getProjectService().getDefaultProjectForFile(file.path as server.NormalizedPath, /*ensureProject*/ false));
        const program = project.getCurrentProgram()!;
        const output = getFileEmitOutput(program, Debug.checkDefined(program.getSourceFile(file.path)), /*emitOnlyDtsFiles*/ true);
        closeFilesForSession([file], session);

        Debug.assert(!output.emitSkipped);
        assert.deepEqual(output.outputFiles, expectedFiles.map((e): OutputFile => ({ name: e.path, text: e.content, writeByteOrderMark: false })));
    }

    describe("unittests:: tsserver:: with declaration file maps:: project references", () => {
        const aTs: File = {
            path: "/a/a.ts",
            content: "export function fnA() {}\nexport interface IfaceA {}\nexport const instanceA: IfaceA = {};",
        };
        const compilerOptions: CompilerOptions = {
            outDir: "bin",
            declaration: true,
            declarationMap: true,
            composite: true,
        };
        const configContent = JSON.stringify({ compilerOptions });
        const aTsconfig: File = { path: "/a/tsconfig.json", content: configContent };

        const aDtsMapContent: RawSourceMap = {
            version: 3,
            file: "a.d.ts",
            sourceRoot: "",
            sources: ["../a.ts"],
            names: [],
            mappings: "AAAA,wBAAgB,GAAG,SAAK;AACxB,MAAM,WAAW,MAAM;CAAG;AAC1B,eAAO,MAAM,SAAS,EAAE,MAAW,CAAC"
        };
        const aDtsMap: File = {
            path: "/a/bin/a.d.ts.map",
            content: JSON.stringify(aDtsMapContent),
        };
        const aDts: File = {
            path: "/a/bin/a.d.ts",
            // ${""} is needed to mangle the sourceMappingURL part or it breaks the build
            content: `export declare function fnA(): void;\nexport interface IfaceA {\n}\nexport declare const instanceA: IfaceA;\n//# source${""}MappingURL=a.d.ts.map`,
        };

        const bTs: File = {
            path: "/b/b.ts",
            content: "export function fnB() {}",
        };
        const bTsconfig: File = { path: "/b/tsconfig.json", content: configContent };

        const bDtsMapContent: RawSourceMap = {
            version: 3,
            file: "b.d.ts",
            sourceRoot: "",
            sources: ["../b.ts"],
            names: [],
            mappings: "AAAA,wBAAgB,GAAG,SAAK",
        };
        const bDtsMap: File = {
            path: "/b/bin/b.d.ts.map",
            content: JSON.stringify(bDtsMapContent),
        };
        const bDts: File = {
            // ${""} is need to mangle the sourceMappingURL part so it doesn't break the build
            path: "/b/bin/b.d.ts",
            content: `export declare function fnB(): void;\n//# source${""}MappingURL=b.d.ts.map`,
        };

        const dummyFile: File = {
            path: "/dummy/dummy.ts",
            content: "let a = 10;"
        };

        const userTs: File = {
            path: "/user/user.ts",
            content: 'import * as a from "../a/bin/a";\nimport * as b from "../b/bin/b";\nexport function fnUser() { a.fnA(); b.fnB(); a.instanceA; }',
        };

        const userTsForConfigProject: File = {
            path: "/user/user.ts",
            content: 'import * as a from "../a/a";\nimport * as b from "../b/b";\nexport function fnUser() { a.fnA(); b.fnB(); a.instanceA; }',
        };

        const userTsconfig: File = {
            path: "/user/tsconfig.json",
            content: JSON.stringify({
                file: ["user.ts"],
                references: [{ path: "../a" }, { path: "../b" }]
            })
        };

        function makeSampleProjects(addUserTsConfig?: boolean, keepAllFiles?: boolean) {
            const host = createServerHost([aTs, aTsconfig, aDtsMap, aDts, bTsconfig, bTs, bDtsMap, bDts, ...(addUserTsConfig ? [userTsForConfigProject, userTsconfig] : [userTs]), dummyFile]);
            const session = createSession(host);

            checkDeclarationFiles(aTs, session, [aDtsMap, aDts]);
            checkDeclarationFiles(bTs, session, [bDtsMap, bDts]);

            // Testing what happens if we delete the original sources.
            if (!keepAllFiles) {
                host.deleteFile(bTs.path);
            }

            openFilesForSession([userTs], session);
            const service = session.getProjectService();
            // If config file then userConfig project and bConfig project since it is referenced
            checkNumberOfProjects(service, addUserTsConfig ? { configuredProjects: 2 } : { inferredProjects: 1 });
            return session;
        }

        function verifyInferredProjectUnchanged(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().inferredProjects[0], [userTs.path, aDts.path, bDts.path]);
        }

        function verifyDummyProject(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().inferredProjects[0], [dummyFile.path]);
        }

        function verifyOnlyOrphanInferredProject(session: TestSession) {
            openFilesForSession([dummyFile], session);
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1 });
            verifyDummyProject(session);
        }

        function verifySingleInferredProject(session: TestSession) {
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1 });
            verifyInferredProjectUnchanged(session);

            // Close user file should close all the projects after opening dummy file
            closeFilesForSession([userTs], session);
            verifyOnlyOrphanInferredProject(session);
        }

        function verifyATsConfigProject(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(aTsconfig.path)!, [aTs.path, aTsconfig.path]);
        }

        function verifyATsConfigOriginalProject(session: TestSession) {
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1, configuredProjects: 1 });
            verifyInferredProjectUnchanged(session);
            verifyATsConfigProject(session);
            // Close user file should close all the projects
            closeFilesForSession([userTs], session);
            verifyOnlyOrphanInferredProject(session);
        }

        function verifyATsConfigWhenOpened(session: TestSession) {
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1, configuredProjects: 1 });
            verifyInferredProjectUnchanged(session);
            verifyATsConfigProject(session);

            closeFilesForSession([userTs], session);
            openFilesForSession([dummyFile], session);
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1, configuredProjects: 1 });
            verifyDummyProject(session);
            verifyATsConfigProject(session); // ATsConfig should still be alive
        }

        function verifyUserTsConfigProject(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(userTsconfig.path)!, [userTs.path, aTs.path, userTsconfig.path]);
        }

        it("goToDefinition", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.DefinitionRequest, protocol.DefinitionResponse>(session, protocol.CommandTypes.Definition, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual(response, [
                protocolFileSpanWithContextFromSubstring({
                    file: aTs,
                    text: "fnA",
                    contextText: "export function fnA() {}"
                })
            ]);
            verifySingleInferredProject(session);
        });

        it("getDefinitionAndBoundSpan", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionAndBoundSpanResponse>(session, protocol.CommandTypes.DefinitionAndBoundSpan, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual(response, {
                textSpan: protocolTextSpanFromSubstring(userTs.content, "fnA"),
                definitions: [
                    protocolFileSpanWithContextFromSubstring({
                        file: aTs,
                        text: "fnA",
                        contextText: "export function fnA() {}"
                    })
                ],
            });
            verifySingleInferredProject(session);
        });

        it("getDefinitionAndBoundSpan with file navigation", () => {
            const session = makeSampleProjects(/*addUserTsConfig*/ true);
            const response = executeSessionRequest<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionAndBoundSpanResponse>(session, protocol.CommandTypes.DefinitionAndBoundSpan, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual(response, {
                textSpan: protocolTextSpanFromSubstring(userTs.content, "fnA"),
                definitions: [
                    protocolFileSpanWithContextFromSubstring({
                        file: aTs,
                        text: "fnA",
                        contextText: "export function fnA() {}"
                    })
                ],
            });
            checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
            verifyUserTsConfigProject(session);

            // Navigate to the definition
            closeFilesForSession([userTs], session);
            openFilesForSession([aTs], session);

            // UserTs configured project should be alive
            checkNumberOfProjects(session.getProjectService(), { configuredProjects: 3 });
            verifyUserTsConfigProject(session);
            verifyATsConfigProject(session);

            closeFilesForSession([aTs], session);
            verifyOnlyOrphanInferredProject(session);
        });

        it("goToType", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.TypeDefinitionRequest, protocol.TypeDefinitionResponse>(session, protocol.CommandTypes.TypeDefinition, protocolFileLocationFromSubstring(userTs, "instanceA"));
            assert.deepEqual(response, [
                protocolFileSpanWithContextFromSubstring({
                    file: aTs,
                    text: "IfaceA",
                    contextText: "export interface IfaceA {}"
                })
            ]);
            verifySingleInferredProject(session);
        });

        it("goToImplementation", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.ImplementationRequest, protocol.ImplementationResponse>(session, protocol.CommandTypes.Implementation, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual(response, [
                protocolFileSpanWithContextFromSubstring({
                    file: aTs,
                    text: "fnA",
                    contextText: "export function fnA() {}"
                })]);
            verifySingleInferredProject(session);
        });

        it("goToDefinition -- target does not exist", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.DefinitionRequest, protocol.DefinitionResponse>(session, CommandNames.Definition, protocolFileLocationFromSubstring(userTs, "fnB()"));
            // bTs does not exist, so stick with bDts
            assert.deepEqual(response, [
                protocolFileSpanWithContextFromSubstring({
                    file: bDts,
                    text: "fnB",
                    contextText: "export declare function fnB(): void;"
                })
            ]);
            verifySingleInferredProject(session);
        });

        it("navigateTo", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.NavtoRequest, protocol.NavtoResponse>(session, CommandNames.Navto, { file: userTs.path, searchValue: "fn" });
            assert.deepEqual<readonly protocol.NavtoItem[] | undefined>(response, [
                {
                    ...protocolFileSpanFromSubstring({
                        file: bDts,
                        text: "export declare function fnB(): void;"
                    }),
                    name: "fnB",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export,declare",
                },
                {
                    ...protocolFileSpanFromSubstring({
                        file: userTs,
                        text: "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"
                    }),
                    name: "fnUser",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export",
                },
                {
                    ...protocolFileSpanFromSubstring({
                        file: aTs,
                        text: "export function fnA() {}"
                    }),
                    name: "fnA",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export",
                },
            ]);

            verifyATsConfigOriginalProject(session);
        });

        it("navigateToAll -- when neither file nor project is specified", () => {
            const session = makeSampleProjects(/*addUserTsConfig*/ true, /*keepAllFiles*/ true);
            const response = executeSessionRequest<protocol.NavtoRequest, protocol.NavtoResponse>(session, CommandNames.Navto, { file: undefined, searchValue: "fn" });
            assert.deepEqual<readonly protocol.NavtoItem[] | undefined>(response, [
                {
                    ...protocolFileSpanFromSubstring({
                        file: bTs,
                        text: "export function fnB() {}"
                    }),
                    name: "fnB",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export",
                },
                {
                    ...protocolFileSpanFromSubstring({
                        file: aTs,
                        text: "export function fnA() {}"
                    }),
                    name: "fnA",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export",
                },
                {
                    ...protocolFileSpanFromSubstring({
                        file: userTs,
                        text: "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"
                    }),
                    name: "fnUser",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export",
                }
            ]);
        });

        it("navigateToAll -- when file is not specified but project is", () => {
            const session = makeSampleProjects(/*addUserTsConfig*/ true, /*keepAllFiles*/ true);
            const response = executeSessionRequest<protocol.NavtoRequest, protocol.NavtoResponse>(session, CommandNames.Navto, { projectFileName: bTsconfig.path, file: undefined, searchValue: "fn" });
            assert.deepEqual<readonly protocol.NavtoItem[] | undefined>(response, [
                {
                    ...protocolFileSpanFromSubstring({
                        file: bTs,
                        text: "export function fnB() {}"
                    }),
                    name: "fnB",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export",
                }
            ]);
        });

        const referenceATs = (aTs: File): protocol.ReferencesResponseItem => makeReferenceItem({
            file: aTs,
            isDefinition: true,
            text: "fnA",
            contextText: "export function fnA() {}",
            lineText: "export function fnA() {}"
        });
        const referencesUserTs = (userTs: File): readonly protocol.ReferencesResponseItem[] => [
            makeReferenceItem({
                file: userTs,
                isDefinition: false,
                text: "fnA",
                lineText: "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"
            }),
        ];

        it("findAllReferences", () => {
            const session = makeSampleProjects();

            const response = executeSessionRequest<protocol.ReferencesRequest, protocol.ReferencesResponse>(session, protocol.CommandTypes.References, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual<protocol.ReferencesResponseBody | undefined>(response, {
                refs: [...referencesUserTs(userTs), referenceATs(aTs)],
                symbolName: "fnA",
                symbolStartOffset: protocolLocationFromSubstring(userTs.content, "fnA()").offset,
                symbolDisplayString: "function fnA(): void",
            });

            verifyATsConfigOriginalProject(session);
        });

        it("findAllReferences -- starting at definition", () => {
            const session = makeSampleProjects();
            openFilesForSession([aTs], session); // If it's not opened, the reference isn't found.
            const response = executeSessionRequest<protocol.ReferencesRequest, protocol.ReferencesResponse>(session, protocol.CommandTypes.References, protocolFileLocationFromSubstring(aTs, "fnA"));
            assert.deepEqual<protocol.ReferencesResponseBody | undefined>(response, {
                refs: [referenceATs(aTs), ...referencesUserTs(userTs)],
                symbolName: "fnA",
                symbolStartOffset: protocolLocationFromSubstring(aTs.content, "fnA").offset,
                symbolDisplayString: "function fnA(): void",
            });
            verifyATsConfigWhenOpened(session);
        });

        interface ReferencesFullRequest extends protocol.FileLocationRequest { readonly command: protocol.CommandTypes.ReferencesFull; }
        interface ReferencesFullResponse extends protocol.Response { readonly body: readonly ReferencedSymbol[]; }

        it("findAllReferencesFull", () => {
            const session = makeSampleProjects();

            const responseFull = executeSessionRequest<ReferencesFullRequest, ReferencesFullResponse>(session, protocol.CommandTypes.ReferencesFull, protocolFileLocationFromSubstring(userTs, "fnA()"));

            assert.deepEqual<readonly ReferencedSymbol[]>(responseFull, [
                {
                    definition: {
                        ...documentSpanFromSubstring({
                            file: aTs,
                            text: "fnA",
                            contextText: "export function fnA() {}"
                        }),
                        kind: ScriptElementKind.functionElement,
                        name: "function fnA(): void",
                        containerKind: ScriptElementKind.unknown,
                        containerName: "",
                        displayParts: [
                            keywordPart(SyntaxKind.FunctionKeyword),
                            spacePart(),
                            displayPart("fnA", SymbolDisplayPartKind.functionName),
                            punctuationPart(SyntaxKind.OpenParenToken),
                            punctuationPart(SyntaxKind.CloseParenToken),
                            punctuationPart(SyntaxKind.ColonToken),
                            spacePart(),
                            keywordPart(SyntaxKind.VoidKeyword),
                        ],
                    },
                    references: [
                        makeReferenceEntry({ file: userTs, /*isDefinition*/ isDefinition: false, text: "fnA" }),
                        makeReferenceEntry({ file: aTs, /*isDefinition*/ isDefinition: true, text: "fnA", contextText: "export function fnA() {}" }),
                    ],
                },
            ]);
            verifyATsConfigOriginalProject(session);
        });

        it("findAllReferencesFull definition is in mapped file", () => {
            const aTs: File = { path: "/a/a.ts", content: `function f() {}` };
            const aTsconfig: File = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { declaration: true, declarationMap: true, outFile: "../bin/a.js" } }),
            };
            const bTs: File = { path: "/b/b.ts", content: `f();` };
            const bTsconfig: File = { path: "/b/tsconfig.json", content: JSON.stringify({ references: [{ path: "../a" }] }) };
            const aDts: File = { path: "/bin/a.d.ts", content: `declare function f(): void;\n//# sourceMappingURL=a.d.ts.map` };
            const aDtsMap: File = {
                path: "/bin/a.d.ts.map",
                content: JSON.stringify({ version: 3, file: "a.d.ts", sourceRoot: "", sources: ["../a/a.ts"], names: [], mappings: "AAAA,iBAAS,CAAC,SAAK" }),
            };

            const session = createSession(createServerHost([aTs, aTsconfig, bTs, bTsconfig, aDts, aDtsMap]));
            checkDeclarationFiles(aTs, session, [aDtsMap, aDts]);
            openFilesForSession([bTs], session);
            checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 }); // configured project of b is alive since a references b

            const responseFull = executeSessionRequest<ReferencesFullRequest, ReferencesFullResponse>(session, protocol.CommandTypes.ReferencesFull, protocolFileLocationFromSubstring(bTs, "f()"));

            assert.deepEqual<readonly ReferencedSymbol[]>(responseFull, [
                {
                    definition: {
                        ...documentSpanFromSubstring({
                            file: aTs,
                            text: "f",
                            options: { index: 1 },
                            contextText: "function f() {}"
                        }),
                        containerKind: ScriptElementKind.unknown,
                        containerName: "",
                        displayParts: [
                            keywordPart(SyntaxKind.FunctionKeyword),
                            spacePart(),
                            displayPart("f", SymbolDisplayPartKind.functionName),
                            punctuationPart(SyntaxKind.OpenParenToken),
                            punctuationPart(SyntaxKind.CloseParenToken),
                            punctuationPart(SyntaxKind.ColonToken),
                            spacePart(),
                            keywordPart(SyntaxKind.VoidKeyword),
                        ],
                        kind: ScriptElementKind.functionElement,
                        name: "function f(): void",
                    },
                    references: [
                        makeReferenceEntry({
                            file: aTs,
                            text: "f",
                            options: { index: 1 },
                            contextText: "function f() {}",
                            isDefinition: true
                        }),
                        {
                            fileName: bTs.path,
                            isDefinition: false,
                            isInString: undefined,
                            isWriteAccess: false,
                            textSpan: { start: 0, length: 1 },
                        },
                    ],
                }
            ]);
        });

        it("findAllReferences -- target does not exist", () => {
            const session = makeSampleProjects();

            const response = executeSessionRequest<protocol.ReferencesRequest, protocol.ReferencesResponse>(session, protocol.CommandTypes.References, protocolFileLocationFromSubstring(userTs, "fnB()"));
            assert.deepEqual<protocol.ReferencesResponseBody | undefined>(response, {
                refs: [
                    makeReferenceItem({
                        file: bDts,
                        isDefinition: true,
                        text: "fnB",
                        contextText: "export declare function fnB(): void;",
                        lineText: "export declare function fnB(): void;"
                    }),
                    makeReferenceItem({
                        file: userTs,
                        isDefinition: false,
                        text: "fnB",
                        lineText: "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"
                    }),
                ],
                symbolName: "fnB",
                symbolStartOffset: protocolLocationFromSubstring(userTs.content, "fnB()").offset,
                symbolDisplayString: "function fnB(): void",
            });
            verifySingleInferredProject(session);
        });

        const renameATs = (aTs: File): protocol.SpanGroup => ({
            file: aTs.path,
            locs: [
                protocolRenameSpanFromSubstring({
                    fileText: aTs.content,
                    text: "fnA",
                    contextText: "export function fnA() {}"
                })
            ],
        });
        const renameUserTs = (userTs: File): protocol.SpanGroup => ({
            file: userTs.path,
            locs: [
                protocolRenameSpanFromSubstring({
                    fileText: userTs.content,
                    text: "fnA"
                })
            ],
        });

        it("renameLocations", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    displayName: "fnA",
                    fileToRename: undefined,
                    fullDisplayName: '"/a/bin/a".fnA', // Ideally this would use the original source's path instead of the declaration file's path.
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: [ScriptElementKindModifier.exportedModifier, ScriptElementKindModifier.ambientModifier].join(","),
                    triggerSpan: protocolTextSpanFromSubstring(userTs.content, "fnA"),
                },
                locs: [renameUserTs(userTs), renameATs(aTs)],
            });
            verifyATsConfigOriginalProject(session);
        });

        it("renameLocations -- starting at definition", () => {
            const session = makeSampleProjects();
            openFilesForSession([aTs], session); // If it's not opened, the reference isn't found.
            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(aTs, "fnA"));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    displayName: "fnA",
                    fileToRename: undefined,
                    fullDisplayName: '"/a/a".fnA',
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: ScriptElementKindModifier.exportedModifier,
                    triggerSpan: protocolTextSpanFromSubstring(aTs.content, "fnA"),
                },
                locs: [renameATs(aTs), renameUserTs(userTs)],
            });
            verifyATsConfigWhenOpened(session);
        });

        it("renameLocationsFull", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.RenameFullRequest, protocol.RenameFullResponse>(session, protocol.CommandTypes.RenameLocationsFull, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual<readonly RenameLocation[]>(response, [
                renameLocation({ file: userTs, text: "fnA" }),
                renameLocation({ file: aTs, text: "fnA", contextText: "export function fnA() {}" }),
            ]);
            verifyATsConfigOriginalProject(session);
        });

        it("renameLocations -- target does not exist", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(userTs, "fnB()"));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    displayName: "fnB",
                    fileToRename: undefined,
                    fullDisplayName: '"/b/bin/b".fnB',
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: [ScriptElementKindModifier.exportedModifier, ScriptElementKindModifier.ambientModifier].join(","),
                    triggerSpan: protocolTextSpanFromSubstring(userTs.content, "fnB"),
                },
                locs: [
                    {
                        file: bDts.path,
                        locs: [
                            protocolRenameSpanFromSubstring({
                                fileText: bDts.content,
                                text: "fnB",
                                contextText: "export declare function fnB(): void;"
                            })
                        ],
                    },
                    {
                        file: userTs.path,
                        locs: [
                            protocolRenameSpanFromSubstring({
                                fileText: userTs.content,
                                text: "fnB"
                            })
                        ],
                    },
                ],
            });
            verifySingleInferredProject(session);
        });

        it("getEditsForFileRename", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.GetEditsForFileRenameRequest, protocol.GetEditsForFileRenameResponse>(session, protocol.CommandTypes.GetEditsForFileRename, {
                oldFilePath: aTs.path,
                newFilePath: "/a/aNew.ts",
            });
            assert.deepEqual<readonly protocol.FileCodeEdits[]>(response, [
                {
                    fileName: userTs.path,
                    textChanges: [
                        { ...protocolTextSpanFromSubstring(userTs.content, "../a/bin/a"), newText: "../a/bin/aNew" },
                    ],
                },
            ]);
            verifySingleInferredProject(session);
        });

        it("getEditsForFileRename when referencing project doesnt include file and its renamed", () => {
            const aTs: File = { path: "/a/src/a.ts", content: "" };
            const aTsconfig: File = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        declarationMap: true,
                        outDir: "./build",
                    }
                }),
            };
            const bTs: File = { path: "/b/src/b.ts", content: "" };
            const bTsconfig: File = {
                path: "/b/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        outDir: "./build",
                    },
                    include: ["./src"],
                    references: [{ path: "../a" }],
                }),
            };

            const host = createServerHost([aTs, aTsconfig, bTs, bTsconfig]);
            const session = createSession(host);
            openFilesForSession([aTs, bTs], session);
            const response = executeSessionRequest<protocol.GetEditsForFileRenameRequest, protocol.GetEditsForFileRenameResponse>(session, CommandNames.GetEditsForFileRename, {
                oldFilePath: aTs.path,
                newFilePath: "/a/src/a1.ts",
            });
            assert.deepEqual<readonly protocol.FileCodeEdits[]>(response, []); // Should not change anything
        });

        it("does not jump to source if inlined sources", () => {
            const aDtsInlinedSources: RawSourceMap = {
                ...aDtsMapContent,
                sourcesContent: [aTs.content]
            };
            const aDtsMapInlinedSources: File = {
                path: aDtsMap.path,
                content: JSON.stringify(aDtsInlinedSources)
            };
            const host = createServerHost([aTs, aDtsMapInlinedSources, aDts, bTs, bDtsMap, bDts, userTs, dummyFile]);
            const session = createSession(host);

            openFilesForSession([userTs], session);
            const service = session.getProjectService();
            // If config file then userConfig project and bConfig project since it is referenced
            checkNumberOfProjects(service, { inferredProjects: 1 });

            // Inlined so does not jump to aTs
            assert.deepEqual(
                executeSessionRequest<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionAndBoundSpanResponse>(
                    session,
                    protocol.CommandTypes.DefinitionAndBoundSpan,
                    protocolFileLocationFromSubstring(userTs, "fnA()")
                ),
                {
                    textSpan: protocolTextSpanFromSubstring(userTs.content, "fnA"),
                    definitions: [
                        protocolFileSpanWithContextFromSubstring({
                            file: aDts,
                            text: "fnA",
                            contextText: "export declare function fnA(): void;"
                        })
                    ],
                }
            );

            // Not inlined, jumps to bTs
            assert.deepEqual(
                executeSessionRequest<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionAndBoundSpanResponse>(
                    session,
                    protocol.CommandTypes.DefinitionAndBoundSpan,
                    protocolFileLocationFromSubstring(userTs, "fnB()")
                ),
                {
                    textSpan: protocolTextSpanFromSubstring(userTs.content, "fnB"),
                    definitions: [
                        protocolFileSpanWithContextFromSubstring({
                            file: bTs,
                            text: "fnB",
                            contextText: "export function fnB() {}"
                        })
                    ],
                }
            );

            verifySingleInferredProject(session);
        });
    });
}
