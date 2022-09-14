import * as ts from "../../_namespaces/ts";

function documentSpanFromSubstring({ file, text, contextText, options, contextOptions }: ts.projectSystem.DocumentSpanFromSubstring): ts.DocumentSpan {
    const contextSpan = contextText !== undefined ? documentSpanFromSubstring({ file, text: contextText, options: contextOptions }) : undefined;
    return {
        fileName: file.path,
        textSpan: ts.projectSystem.textSpanFromSubstring(file.content, text, options),
        ...contextSpan && { contextSpan: contextSpan.textSpan }
    };
}

function renameLocation(input: ts.projectSystem.DocumentSpanFromSubstring): ts.RenameLocation {
    return documentSpanFromSubstring(input);
}

interface MakeReferenceEntry extends ts.projectSystem.DocumentSpanFromSubstring {
    isDefinition?: boolean;
    isWriteAccess?: boolean;
}
function makeReferencedSymbolEntry({ isDefinition, isWriteAccess, ...rest }: MakeReferenceEntry): ts.ReferencedSymbolEntry {
    const result = {
        ...documentSpanFromSubstring(rest),
        isDefinition,
        isWriteAccess: !!isWriteAccess,
        isInString: undefined,
    };
    if (isDefinition === undefined) {
        delete result.isDefinition;
    }
    return result;
}

function checkDeclarationFiles(file: ts.projectSystem.File, session: ts.projectSystem.TestSession, expectedFiles: readonly ts.projectSystem.File[]): void {
    ts.projectSystem.openFilesForSession([file], session);
    const project = ts.Debug.checkDefined(session.getProjectService().getDefaultProjectForFile(file.path as ts.server.NormalizedPath, /*ensureProject*/ false));
    const program = project.getCurrentProgram()!;
    const output = ts.getFileEmitOutput(program, ts.Debug.checkDefined(program.getSourceFile(file.path)), /*emitOnlyDtsFiles*/ true);
    ts.projectSystem.closeFilesForSession([file], session);

    ts.Debug.assert(!output.emitSkipped);
    assert.deepEqual(output.outputFiles, expectedFiles.map((e): ts.OutputFile => ({ name: e.path, text: e.content, writeByteOrderMark: false })));
}

describe("unittests:: tsserver:: with declaration file maps:: project references", () => {
    const aTs: ts.projectSystem.File = {
        path: "/a/a.ts",
        content: "export function fnA() {}\nexport interface IfaceA {}\nexport const instanceA: IfaceA = {};",
    };
    const compilerOptions: ts.CompilerOptions = {
        outDir: "bin",
        declaration: true,
        declarationMap: true,
        composite: true,
    };
    const configContent = JSON.stringify({ compilerOptions });
    const aTsconfig: ts.projectSystem.File = { path: "/a/tsconfig.json", content: configContent };

    const aDtsMapContent: ts.RawSourceMap = {
        version: 3,
        file: "a.d.ts",
        sourceRoot: "",
        sources: ["../a.ts"],
        names: [],
        mappings: "AAAA,wBAAgB,GAAG,SAAK;AACxB,MAAM,WAAW,MAAM;CAAG;AAC1B,eAAO,MAAM,SAAS,EAAE,MAAW,CAAC"
    };
    const aDtsMap: ts.projectSystem.File = {
        path: "/a/bin/a.d.ts.map",
        content: JSON.stringify(aDtsMapContent),
    };
    const aDts: ts.projectSystem.File = {
        path: "/a/bin/a.d.ts",
        // ${""} is needed to mangle the sourceMappingURL part or it breaks the build
        content: `export declare function fnA(): void;\nexport interface IfaceA {\n}\nexport declare const instanceA: IfaceA;\n//# source${""}MappingURL=a.d.ts.map`,
    };

    const bTs: ts.projectSystem.File = {
        path: "/b/b.ts",
        content: "export function fnB() {}",
    };
    const bTsconfig: ts.projectSystem.File = { path: "/b/tsconfig.json", content: configContent };

    const bDtsMapContent: ts.RawSourceMap = {
        version: 3,
        file: "b.d.ts",
        sourceRoot: "",
        sources: ["../b.ts"],
        names: [],
        mappings: "AAAA,wBAAgB,GAAG,SAAK",
    };
    const bDtsMap: ts.projectSystem.File = {
        path: "/b/bin/b.d.ts.map",
        content: JSON.stringify(bDtsMapContent),
    };
    const bDts: ts.projectSystem.File = {
        // ${""} is need to mangle the sourceMappingURL part so it doesn't break the build
        path: "/b/bin/b.d.ts",
        content: `export declare function fnB(): void;\n//# source${""}MappingURL=b.d.ts.map`,
    };

    const dummyFile: ts.projectSystem.File = {
        path: "/dummy/dummy.ts",
        content: "let a = 10;"
    };

    const userTs: ts.projectSystem.File = {
        path: "/user/user.ts",
        content: 'import * as a from "../a/bin/a";\nimport * as b from "../b/bin/b";\nexport function fnUser() { a.fnA(); b.fnB(); a.instanceA; }',
    };

    const userTsForConfigProject: ts.projectSystem.File = {
        path: "/user/user.ts",
        content: 'import * as a from "../a/a";\nimport * as b from "../b/b";\nexport function fnUser() { a.fnA(); b.fnB(); a.instanceA; }',
    };

    const userTsconfig: ts.projectSystem.File = {
        path: "/user/tsconfig.json",
        content: JSON.stringify({
            file: ["user.ts"],
            references: [{ path: "../a" }, { path: "../b" }]
        })
    };

    function makeSampleProjects(addUserTsConfig?: boolean, keepAllFiles?: boolean) {
        const host = ts.projectSystem.createServerHost([aTs, aTsconfig, aDtsMap, aDts, bTsconfig, bTs, bDtsMap, bDts, ...(addUserTsConfig ? [userTsForConfigProject, userTsconfig] : [userTs]), dummyFile]);
        const session = ts.projectSystem.createSession(host);

        checkDeclarationFiles(aTs, session, [aDtsMap, aDts]);
        checkDeclarationFiles(bTs, session, [bDtsMap, bDts]);

        // Testing what happens if we delete the original sources.
        if (!keepAllFiles) {
            host.deleteFile(bTs.path);
        }

        ts.projectSystem.openFilesForSession([userTs], session);
        const service = session.getProjectService();
        // If config file then userConfig project and bConfig project since it is referenced
        ts.projectSystem.checkNumberOfProjects(service, addUserTsConfig ? { configuredProjects: 2 } : { inferredProjects: 1 });
        return session;
    }

    function verifyInferredProjectUnchanged(session: ts.projectSystem.TestSession) {
        ts.projectSystem.checkProjectActualFiles(session.getProjectService().inferredProjects[0], [userTs.path, aDts.path, bDts.path]);
    }

    function verifyDummyProject(session: ts.projectSystem.TestSession) {
        ts.projectSystem.checkProjectActualFiles(session.getProjectService().inferredProjects[0], [dummyFile.path]);
    }

    function verifyOnlyOrphanInferredProject(session: ts.projectSystem.TestSession) {
        ts.projectSystem.openFilesForSession([dummyFile], session);
        ts.projectSystem.checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1 });
        verifyDummyProject(session);
    }

    function verifySingleInferredProject(session: ts.projectSystem.TestSession) {
        ts.projectSystem.checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1 });
        verifyInferredProjectUnchanged(session);

        // Close user file should close all the projects after opening dummy file
        ts.projectSystem.closeFilesForSession([userTs], session);
        verifyOnlyOrphanInferredProject(session);
    }

    function verifyATsConfigProject(session: ts.projectSystem.TestSession) {
        ts.projectSystem.checkProjectActualFiles(session.getProjectService().configuredProjects.get(aTsconfig.path)!, [aTs.path, aTsconfig.path]);
    }

    function verifyATsConfigOriginalProject(session: ts.projectSystem.TestSession) {
        ts.projectSystem.checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1, configuredProjects: 1 });
        verifyInferredProjectUnchanged(session);
        verifyATsConfigProject(session);
        // Close user file should close all the projects
        ts.projectSystem.closeFilesForSession([userTs], session);
        verifyOnlyOrphanInferredProject(session);
    }

    function verifyATsConfigWhenOpened(session: ts.projectSystem.TestSession) {
        ts.projectSystem.checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1, configuredProjects: 1 });
        verifyInferredProjectUnchanged(session);
        verifyATsConfigProject(session);

        ts.projectSystem.closeFilesForSession([userTs], session);
        ts.projectSystem.openFilesForSession([dummyFile], session);
        ts.projectSystem.checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1, configuredProjects: 1 });
        verifyDummyProject(session);
        verifyATsConfigProject(session); // ATsConfig should still be alive
    }

    function verifyUserTsConfigProject(session: ts.projectSystem.TestSession) {
        ts.projectSystem.checkProjectActualFiles(session.getProjectService().configuredProjects.get(userTsconfig.path)!, [userTs.path, aTs.path, userTsconfig.path]);
    }

    it("goToDefinition", () => {
        const session = makeSampleProjects();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.DefinitionRequest, ts.projectSystem.protocol.DefinitionResponse>(session, ts.projectSystem.protocol.CommandTypes.Definition, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnA()"));
        assert.deepEqual(response, [
            ts.projectSystem.protocolFileSpanWithContextFromSubstring({
                file: aTs,
                text: "fnA",
                contextText: "export function fnA() {}"
            })
        ]);
        verifySingleInferredProject(session);
    });

    it("getDefinitionAndBoundSpan", () => {
        const session = makeSampleProjects();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.DefinitionAndBoundSpanRequest, ts.projectSystem.protocol.DefinitionAndBoundSpanResponse>(session, ts.projectSystem.protocol.CommandTypes.DefinitionAndBoundSpan, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnA()"));
        assert.deepEqual(response, {
            textSpan: ts.projectSystem.protocolTextSpanFromSubstring(userTs.content, "fnA"),
            definitions: [
                ts.projectSystem.protocolFileSpanWithContextFromSubstring({
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
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.DefinitionAndBoundSpanRequest, ts.projectSystem.protocol.DefinitionAndBoundSpanResponse>(session, ts.projectSystem.protocol.CommandTypes.DefinitionAndBoundSpan, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnA()"));
        assert.deepEqual(response, {
            textSpan: ts.projectSystem.protocolTextSpanFromSubstring(userTs.content, "fnA"),
            definitions: [
                ts.projectSystem.protocolFileSpanWithContextFromSubstring({
                    file: aTs,
                    text: "fnA",
                    contextText: "export function fnA() {}"
                })
            ],
        });
        ts.projectSystem.checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
        verifyUserTsConfigProject(session);

        // Navigate to the definition
        ts.projectSystem.closeFilesForSession([userTs], session);
        ts.projectSystem.openFilesForSession([aTs], session);

        // UserTs configured project should be alive
        ts.projectSystem.checkNumberOfProjects(session.getProjectService(), { configuredProjects: 3 });
        verifyUserTsConfigProject(session);
        verifyATsConfigProject(session);

        ts.projectSystem.closeFilesForSession([aTs], session);
        verifyOnlyOrphanInferredProject(session);
    });

    it("goToType", () => {
        const session = makeSampleProjects();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.TypeDefinitionRequest, ts.projectSystem.protocol.TypeDefinitionResponse>(session, ts.projectSystem.protocol.CommandTypes.TypeDefinition, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "instanceA"));
        assert.deepEqual(response, [
            ts.projectSystem.protocolFileSpanWithContextFromSubstring({
                file: aTs,
                text: "IfaceA",
                contextText: "export interface IfaceA {}"
            })
        ]);
        verifySingleInferredProject(session);
    });

    it("goToImplementation", () => {
        const session = makeSampleProjects();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.ImplementationRequest, ts.projectSystem.protocol.ImplementationResponse>(session, ts.projectSystem.protocol.CommandTypes.Implementation, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnA()"));
        assert.deepEqual(response, [
            ts.projectSystem.protocolFileSpanWithContextFromSubstring({
                file: aTs,
                text: "fnA",
                contextText: "export function fnA() {}"
            })]);
        verifySingleInferredProject(session);
    });

    it("goToDefinition -- target does not exist", () => {
        const session = makeSampleProjects();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.DefinitionRequest, ts.projectSystem.protocol.DefinitionResponse>(session, ts.projectSystem.CommandNames.Definition, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnB()"));
        // bTs does not exist, so stick with bDts
        assert.deepEqual(response, [
            ts.projectSystem.protocolFileSpanWithContextFromSubstring({
                file: bDts,
                text: "fnB",
                contextText: "export declare function fnB(): void;"
            })
        ]);
        verifySingleInferredProject(session);
    });

    it("navigateTo", () => {
        const session = makeSampleProjects();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.NavtoRequest, ts.projectSystem.protocol.NavtoResponse>(session, ts.projectSystem.CommandNames.Navto, { file: userTs.path, searchValue: "fn" });
        assert.deepEqual<readonly ts.projectSystem.protocol.NavtoItem[] | undefined>(response, [
            // Keep the .d.ts file since the .ts file no longer exists
            // (otherwise it would be treated as not in the project)
            {
                ...ts.projectSystem.protocolFileSpanFromSubstring({
                    file: bDts,
                    text: "export declare function fnB(): void;"
                }),
                name: "fnB",
                matchKind: "prefix",
                isCaseSensitive: true,
                kind: ts.ScriptElementKind.functionElement,
                kindModifiers: "export,declare",
            },
            {
                ...ts.projectSystem.protocolFileSpanFromSubstring({
                    file: userTs,
                    text: "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"
                }),
                name: "fnUser",
                matchKind: "prefix",
                isCaseSensitive: true,
                kind: ts.ScriptElementKind.functionElement,
                kindModifiers: "export",
            },
        ]);

        verifySingleInferredProject(session);
    });

    it("navigateToAll -- when neither file nor project is specified", () => {
        const session = makeSampleProjects(/*addUserTsConfig*/ true, /*keepAllFiles*/ true);
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.NavtoRequest, ts.projectSystem.protocol.NavtoResponse>(session, ts.projectSystem.CommandNames.Navto, { file: undefined, searchValue: "fn" });
        assert.deepEqual<readonly ts.projectSystem.protocol.NavtoItem[] | undefined>(response, [
            {
                ...ts.projectSystem.protocolFileSpanFromSubstring({
                    file: bTs,
                    text: "export function fnB() {}"
                }),
                name: "fnB",
                matchKind: "prefix",
                isCaseSensitive: true,
                kind: ts.ScriptElementKind.functionElement,
                kindModifiers: "export",
            },
            {
                ...ts.projectSystem.protocolFileSpanFromSubstring({
                    file: aTs,
                    text: "export function fnA() {}"
                }),
                name: "fnA",
                matchKind: "prefix",
                isCaseSensitive: true,
                kind: ts.ScriptElementKind.functionElement,
                kindModifiers: "export",
            },
            {
                ...ts.projectSystem.protocolFileSpanFromSubstring({
                    file: userTs,
                    text: "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"
                }),
                name: "fnUser",
                matchKind: "prefix",
                isCaseSensitive: true,
                kind: ts.ScriptElementKind.functionElement,
                kindModifiers: "export",
            }
        ]);
    });

    it("navigateToAll -- when file is not specified but project is", () => {
        const session = makeSampleProjects(/*addUserTsConfig*/ true, /*keepAllFiles*/ true);
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.NavtoRequest, ts.projectSystem.protocol.NavtoResponse>(session, ts.projectSystem.CommandNames.Navto, { projectFileName: bTsconfig.path, file: undefined, searchValue: "fn" });
        assert.deepEqual<readonly ts.projectSystem.protocol.NavtoItem[] | undefined>(response, [
            {
                ...ts.projectSystem.protocolFileSpanFromSubstring({
                    file: bTs,
                    text: "export function fnB() {}"
                }),
                name: "fnB",
                matchKind: "prefix",
                isCaseSensitive: true,
                kind: ts.ScriptElementKind.functionElement,
                kindModifiers: "export",
            }
        ]);
    });

    const referenceATs = (aTs: ts.projectSystem.File, isDefinition: true | undefined): ts.projectSystem.protocol.ReferencesResponseItem => ts.projectSystem.makeReferenceItem({
        file: aTs,
        isDefinition,
        isWriteAccess: true,
        text: "fnA",
        contextText: "export function fnA() {}",
        lineText: "export function fnA() {}"
    });
    const referencesUserTs = (userTs: ts.projectSystem.File, isDefinition: false | undefined): readonly ts.projectSystem.protocol.ReferencesResponseItem[] => [
        ts.projectSystem.makeReferenceItem({
            file: userTs,
            isDefinition,
            text: "fnA",
            lineText: "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"
        }),
    ];

    it("findAllReferences", () => {
        const session = makeSampleProjects();

        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.ReferencesRequest, ts.projectSystem.protocol.ReferencesResponse>(session, ts.projectSystem.protocol.CommandTypes.References, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnA()"));
        assert.deepEqual<ts.projectSystem.protocol.ReferencesResponseBody | undefined>(response, {
            refs: [...referencesUserTs(userTs, /*isDefinition*/ undefined), referenceATs(aTs, /*isDefinition*/ undefined)],
            symbolName: "fnA",
            symbolStartOffset: ts.projectSystem.protocolLocationFromSubstring(userTs.content, "fnA()").offset,
            symbolDisplayString: "function fnA(): void",
        });

        verifyATsConfigOriginalProject(session);
    });

    it("findAllReferences -- starting at definition", () => {
        const session = makeSampleProjects();
        ts.projectSystem.openFilesForSession([aTs], session); // If it's not opened, the reference isn't found.
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.ReferencesRequest, ts.projectSystem.protocol.ReferencesResponse>(session, ts.projectSystem.protocol.CommandTypes.References, ts.projectSystem.protocolFileLocationFromSubstring(aTs, "fnA"));
        assert.deepEqual<ts.projectSystem.protocol.ReferencesResponseBody | undefined>(response, {
            refs: [referenceATs(aTs, /*isDefinition*/ true), ...referencesUserTs(userTs, /*isDefinition*/ false)],
            symbolName: "fnA",
            symbolStartOffset: ts.projectSystem.protocolLocationFromSubstring(aTs.content, "fnA").offset,
            symbolDisplayString: "function fnA(): void",
        });
        verifyATsConfigWhenOpened(session);
    });

    interface ReferencesFullRequest extends ts.projectSystem.protocol.FileLocationRequest { readonly command: ts.projectSystem.protocol.CommandTypes.ReferencesFull; }
    interface ReferencesFullResponse extends ts.projectSystem.protocol.Response { readonly body: readonly ts.ReferencedSymbol[]; }

    it("findAllReferencesFull", () => {
        const session = makeSampleProjects();

        const responseFull = ts.projectSystem.executeSessionRequest<ReferencesFullRequest, ReferencesFullResponse>(session, ts.projectSystem.protocol.CommandTypes.ReferencesFull, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnA()"));

        assert.deepEqual<readonly ts.ReferencedSymbol[]>(responseFull, [
            {
                definition: {
                    ...documentSpanFromSubstring({
                        file: aTs,
                        text: "fnA",
                        contextText: "export function fnA() {}"
                    }),
                    kind: ts.ScriptElementKind.functionElement,
                    name: "function fnA(): void",
                    containerKind: ts.ScriptElementKind.unknown,
                    containerName: "",
                    displayParts: [
                        ts.keywordPart(ts.SyntaxKind.FunctionKeyword),
                        ts.spacePart(),
                        ts.displayPart("fnA", ts.SymbolDisplayPartKind.functionName),
                        ts.punctuationPart(ts.SyntaxKind.OpenParenToken),
                        ts.punctuationPart(ts.SyntaxKind.CloseParenToken),
                        ts.punctuationPart(ts.SyntaxKind.ColonToken),
                        ts.spacePart(),
                        ts.keywordPart(ts.SyntaxKind.VoidKeyword),
                    ],
                },
                references: [
                    makeReferencedSymbolEntry({ file: userTs, text: "fnA" }),
                    makeReferencedSymbolEntry({ file: aTs, text: "fnA", isWriteAccess: true, contextText: "export function fnA() {}" }),
                ],
            },
        ]);
        verifyATsConfigOriginalProject(session);
    });

    it("findAllReferencesFull definition is in mapped file", () => {
        const aTs: ts.projectSystem.File = { path: "/a/a.ts", content: `function f() {}` };
        const aTsconfig: ts.projectSystem.File = {
            path: "/a/tsconfig.json",
            content: JSON.stringify({ compilerOptions: { declaration: true, declarationMap: true, outFile: "../bin/a.js" } }),
        };
        const bTs: ts.projectSystem.File = { path: "/b/b.ts", content: `f();` };
        const bTsconfig: ts.projectSystem.File = { path: "/b/tsconfig.json", content: JSON.stringify({ references: [{ path: "../a" }] }) };
        const aDts: ts.projectSystem.File = { path: "/bin/a.d.ts", content: `declare function f(): void;\n//# sourceMappingURL=a.d.ts.map` };
        const aDtsMap: ts.projectSystem.File = {
            path: "/bin/a.d.ts.map",
            content: JSON.stringify({ version: 3, file: "a.d.ts", sourceRoot: "", sources: ["../a/a.ts"], names: [], mappings: "AAAA,iBAAS,CAAC,SAAK" }),
        };

        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([aTs, aTsconfig, bTs, bTsconfig, aDts, aDtsMap]));
        checkDeclarationFiles(aTs, session, [aDtsMap, aDts]);
        ts.projectSystem.openFilesForSession([bTs], session);
        ts.projectSystem.checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 }); // configured project of b is alive since a references b

        const responseFull = ts.projectSystem.executeSessionRequest<ReferencesFullRequest, ReferencesFullResponse>(session, ts.projectSystem.protocol.CommandTypes.ReferencesFull, ts.projectSystem.protocolFileLocationFromSubstring(bTs, "f()"));

        assert.deepEqual<readonly ts.ReferencedSymbol[]>(responseFull, [
            {
                definition: {
                    ...documentSpanFromSubstring({
                        file: aTs,
                        text: "f",
                        options: { index: 1 },
                        contextText: "function f() {}"
                    }),
                    containerKind: ts.ScriptElementKind.unknown,
                    containerName: "",
                    displayParts: [
                        ts.keywordPart(ts.SyntaxKind.FunctionKeyword),
                        ts.spacePart(),
                        ts.displayPart("f", ts.SymbolDisplayPartKind.functionName),
                        ts.punctuationPart(ts.SyntaxKind.OpenParenToken),
                        ts.punctuationPart(ts.SyntaxKind.CloseParenToken),
                        ts.punctuationPart(ts.SyntaxKind.ColonToken),
                        ts.spacePart(),
                        ts.keywordPart(ts.SyntaxKind.VoidKeyword),
                    ],
                    kind: ts.ScriptElementKind.functionElement,
                    name: "function f(): void",
                },
                references: [
                    makeReferencedSymbolEntry({
                        file: aTs,
                        text: "f",
                        options: { index: 1 },
                        contextText: "function f() {}",
                        isWriteAccess: true,
                    }),
                    {
                        fileName: bTs.path,
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

        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.ReferencesRequest, ts.projectSystem.protocol.ReferencesResponse>(session, ts.projectSystem.protocol.CommandTypes.References, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnB()"));
        assert.deepEqual<ts.projectSystem.protocol.ReferencesResponseBody | undefined>(response, {
            refs: [
                ts.projectSystem.makeReferenceItem({
                    file: bDts,
                    isWriteAccess: true,
                    text: "fnB",
                    contextText: "export declare function fnB(): void;",
                    lineText: "export declare function fnB(): void;"
                }),
                ts.projectSystem.makeReferenceItem({
                    file: userTs,
                    text: "fnB",
                    lineText: "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"
                }),
            ],
            symbolName: "fnB",
            symbolStartOffset: ts.projectSystem.protocolLocationFromSubstring(userTs.content, "fnB()").offset,
            symbolDisplayString: "function fnB(): void",
        });
        verifySingleInferredProject(session);
    });

    const renameATs = (aTs: ts.projectSystem.File): ts.projectSystem.protocol.SpanGroup => ({
        file: aTs.path,
        locs: [
            ts.projectSystem.protocolRenameSpanFromSubstring({
                fileText: aTs.content,
                text: "fnA",
                contextText: "export function fnA() {}"
            })
        ],
    });
    const renameUserTs = (userTs: ts.projectSystem.File): ts.projectSystem.protocol.SpanGroup => ({
        file: userTs.path,
        locs: [
            ts.projectSystem.protocolRenameSpanFromSubstring({
                fileText: userTs.content,
                text: "fnA"
            })
        ],
    });

    it("renameLocations", () => {
        const session = makeSampleProjects();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnA()"));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response, {
            info: {
                canRename: true,
                displayName: "fnA",
                fileToRename: undefined,
                fullDisplayName: '"/a/bin/a".fnA', // Ideally this would use the original source's path instead of the declaration file's path.
                kind: ts.ScriptElementKind.functionElement,
                kindModifiers: [ts.ScriptElementKindModifier.exportedModifier, ts.ScriptElementKindModifier.ambientModifier].join(","),
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(userTs.content, "fnA"),
            },
            locs: [renameUserTs(userTs), renameATs(aTs)],
        });
        verifyATsConfigOriginalProject(session);
    });

    it("renameLocations -- starting at definition", () => {
        const session = makeSampleProjects();
        ts.projectSystem.openFilesForSession([aTs], session); // If it's not opened, the reference isn't found.
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(aTs, "fnA"));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response, {
            info: {
                canRename: true,
                displayName: "fnA",
                fileToRename: undefined,
                fullDisplayName: '"/a/a".fnA',
                kind: ts.ScriptElementKind.functionElement,
                kindModifiers: ts.ScriptElementKindModifier.exportedModifier,
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(aTs.content, "fnA"),
            },
            locs: [renameATs(aTs), renameUserTs(userTs)],
        });
        verifyATsConfigWhenOpened(session);
    });

    it("renameLocationsFull", () => {
        const session = makeSampleProjects();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameFullRequest, ts.projectSystem.protocol.RenameFullResponse>(session, ts.projectSystem.protocol.CommandTypes.RenameLocationsFull, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnA()"));
        assert.deepEqual<readonly ts.RenameLocation[]>(response, [
            renameLocation({ file: userTs, text: "fnA" }),
            renameLocation({ file: aTs, text: "fnA", contextText: "export function fnA() {}" }),
        ]);
        verifyATsConfigOriginalProject(session);
    });

    it("renameLocations -- target does not exist", () => {
        const session = makeSampleProjects();
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnB()"));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response, {
            info: {
                canRename: true,
                displayName: "fnB",
                fileToRename: undefined,
                fullDisplayName: '"/b/bin/b".fnB',
                kind: ts.ScriptElementKind.functionElement,
                kindModifiers: [ts.ScriptElementKindModifier.exportedModifier, ts.ScriptElementKindModifier.ambientModifier].join(","),
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(userTs.content, "fnB"),
            },
            locs: [
                {
                    file: bDts.path,
                    locs: [
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: bDts.content,
                            text: "fnB",
                            contextText: "export declare function fnB(): void;"
                        })
                    ],
                },
                {
                    file: userTs.path,
                    locs: [
                        ts.projectSystem.protocolRenameSpanFromSubstring({
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
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.GetEditsForFileRenameRequest, ts.projectSystem.protocol.GetEditsForFileRenameResponse>(session, ts.projectSystem.protocol.CommandTypes.GetEditsForFileRename, {
            oldFilePath: aTs.path,
            newFilePath: "/a/aNew.ts",
        });
        assert.deepEqual<readonly ts.projectSystem.protocol.FileCodeEdits[]>(response, [
            {
                fileName: userTs.path,
                textChanges: [
                    { ...ts.projectSystem.protocolTextSpanFromSubstring(userTs.content, "../a/bin/a"), newText: "../a/bin/aNew" },
                ],
            },
        ]);
        verifySingleInferredProject(session);
    });

    it("getEditsForFileRename when referencing project doesnt include file and its renamed", () => {
        const aTs: ts.projectSystem.File = { path: "/a/src/a.ts", content: "" };
        const aTsconfig: ts.projectSystem.File = {
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
        const bTs: ts.projectSystem.File = { path: "/b/src/b.ts", content: "" };
        const bTsconfig: ts.projectSystem.File = {
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

        const host = ts.projectSystem.createServerHost([aTs, aTsconfig, bTs, bTsconfig]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([aTs, bTs], session);
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.GetEditsForFileRenameRequest, ts.projectSystem.protocol.GetEditsForFileRenameResponse>(session, ts.projectSystem.CommandNames.GetEditsForFileRename, {
            oldFilePath: aTs.path,
            newFilePath: "/a/src/a1.ts",
        });
        assert.deepEqual<readonly ts.projectSystem.protocol.FileCodeEdits[]>(response, []); // Should not change anything
    });

    it("does not jump to source if inlined sources", () => {
        const aDtsInlinedSources: ts.RawSourceMap = {
            ...aDtsMapContent,
            sourcesContent: [aTs.content]
        };
        const aDtsMapInlinedSources: ts.projectSystem.File = {
            path: aDtsMap.path,
            content: JSON.stringify(aDtsInlinedSources)
        };
        const host = ts.projectSystem.createServerHost([aTs, aDtsMapInlinedSources, aDts, bTs, bDtsMap, bDts, userTs, dummyFile]);
        const session = ts.projectSystem.createSession(host);

        ts.projectSystem.openFilesForSession([userTs], session);
        const service = session.getProjectService();
        // If config file then userConfig project and bConfig project since it is referenced
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });

        // Inlined so does not jump to aTs
        assert.deepEqual(
            ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.DefinitionAndBoundSpanRequest, ts.projectSystem.protocol.DefinitionAndBoundSpanResponse>(
                session,
                ts.projectSystem.protocol.CommandTypes.DefinitionAndBoundSpan,
                ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnA()")
            ),
            {
                textSpan: ts.projectSystem.protocolTextSpanFromSubstring(userTs.content, "fnA"),
                definitions: [
                    ts.projectSystem.protocolFileSpanWithContextFromSubstring({
                        file: aDts,
                        text: "fnA",
                        contextText: "export declare function fnA(): void;"
                    })
                ],
            }
        );

        // Not inlined, jumps to bTs
        assert.deepEqual(
            ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.DefinitionAndBoundSpanRequest, ts.projectSystem.protocol.DefinitionAndBoundSpanResponse>(
                session,
                ts.projectSystem.protocol.CommandTypes.DefinitionAndBoundSpan,
                ts.projectSystem.protocolFileLocationFromSubstring(userTs, "fnB()")
            ),
            {
                textSpan: ts.projectSystem.protocolTextSpanFromSubstring(userTs.content, "fnB"),
                definitions: [
                    ts.projectSystem.protocolFileSpanWithContextFromSubstring({
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
