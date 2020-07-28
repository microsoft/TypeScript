namespace ts.wasm {

    function getSection(file: WasmSourceFile, kind: SectionKind.Custom): CustomSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Code): CodeSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Data): DataSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Element): ElementSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Export): ExportSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Function): FunctionSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Global): GlobalSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Import): ImportSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Memory): MemorySection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Start): StartSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Table): TableSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind.Type): TypeSection | undefined;
    function getSection(file: WasmSourceFile, kind: SectionKind): WasmSection | undefined {
        return find(file.sections, s => s.id === kind);
    }

    export function declarationsFor(file: WasmSourceFile): SourceFile {
        const factory = createNodeFactory(NodeFactoryFlags.NoOriginalNode | NodeFactoryFlags.NoNodeConverters, parseBaseNodeFactory);
        const exports = find(file.sections, s => s.id === SectionKind.Export) as ExportSection | undefined; // There should only be one
        const statements = !exports ? [finishNode(factory.createExportDeclaration(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
            /*isTypeOnly*/ false,
            finishNode(factory.createNamedExports([]))))] : mapDefined(exports.exports, createExportedStatement);
        const eofToken = factory.createToken(SyntaxKind.EndOfFileToken);
        const result = factory.createSourceFile(statements, eofToken, NodeFlags.Ambient);
        result.referencedFiles = emptyArray;
        result.typeReferenceDirectives = emptyArray;
        result.libReferenceDirectives = emptyArray;
        result.amdDependencies = emptyArray;
        result.hasNoDefaultLib = false;
        result.pragmas = emptyMap as ReadonlyPragmaMap;
        result.parseDiagnostics = [];
        result.isDeclarationFile = true;
        result.fileName = `${file.fileName}.d.ts`;
        result.bindDiagnostics = [];
        result.bindSuggestionDiagnostics = undefined;
        result.languageVersion = ScriptTarget.Latest;
        result.languageVariant = getLanguageVariant(ScriptKind.TS);
        result.scriptKind = ScriptKind.TS;
        result.externalModuleIndicator = result.statements[0];
        result.text = "";
        // Immediately printing the synthetic file declaration text allows us to generate concrete positions
        // for all the nodes we've synthesized, and essentially un-synthesize them (making them appear, by all
        // rights, to be veritable parse tree nodes)
        result.text = createPrinter({}, {
            onEmitNode(hint, node, cb, getTextPos) {
                const start = getTextPos();
                cb(hint, node);
                if (node) {
                    (node as Mutable<typeof node>).pos = start;
                    (node as Mutable<typeof node>).end = getTextPos();
                }
            },

        }).printFile(result);
        (eofToken as Mutable<typeof eofToken>).pos = result.text.length;
        (eofToken as Mutable<typeof eofToken>).end = result.text.length;
        // The above sets all node positions, but node _arrays_ still have `-1` for their pos and end.
        // We fix those up to use their constituent start and end positions here.
        fixupNodeArrays(result);
        return result;

        function fixupNodeArrays(node: Node) {
            forEachChildRecursively(node, noop, (arr) => {
                if (arr.length) {
                    (arr as Mutable<typeof arr>).pos = arr[0].pos;
                    (arr as Mutable<typeof arr>).end = arr[arr.length - 1].end;
                }
            });
        }

        function finishNode<T extends Node>(node: T) {
            (node as Mutable<T>).flags |= NodeFlags.Ambient;
            return node;
        }

        function createExportedStatement(e: WasmExport): Statement | undefined {
            switch(e.exportdesc.kind) {
                case ExportKind.Func: {
                    const funcTypeSection = getSection(file, SectionKind.Type);
                    Debug.assert(funcTypeSection);
                    const functionSection = getSection(file, SectionKind.Function);
                    Debug.assert(functionSection);
                    const typeIndex = functionSection.indices[e.exportdesc.index];
                    const sig = funcTypeSection.funcs[typeIndex];
                    return finishNode(factory.createFunctionDeclaration(
                        /*decorators*/ undefined,
                        [finishNode(factory.createModifier(SyntaxKind.ExportKeyword))],
                        /*asteriskToken*/ undefined,
                        e.name,
                        /*typeParameters*/ undefined,
                        map(sig[0], (_, i) => finishNode(factory.createParameterDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            `arg${i}`,
                            /*questionToken*/ undefined,
                            finishNode(factory.createKeywordTypeNode(SyntaxKind.NumberKeyword))
                        ))),
                        finishNode(factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)),
                        /*body*/ undefined
                    ));
                }
                case ExportKind.Global:
                case ExportKind.Mem:
                case ExportKind.Table:
                    return undefined;
                default:
                    return Debug.fail(`Unhandled wasm export kind: ${e.exportdesc.kind}`);
            }
        }
    }
}