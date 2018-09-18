/* @internal */
namespace ts {
    export function generateTypesForModule(name: string, moduleValue: unknown, formatSettings: FormatCodeSettings): string {
        return valueInfoToDeclarationFileText(inspectValue(name, moduleValue), formatSettings);
    }

    export function valueInfoToDeclarationFileText(valueInfo: ValueInfo, formatSettings: FormatCodeSettings): string {
        return textChanges.getNewFileText(toStatements(valueInfo, OutputKind.ExportEquals), ScriptKind.TS, "\n", formatting.getFormatContext(formatSettings));
    }

    const enum OutputKind { ExportEquals, NamedExport, NamespaceMember }
    function toNamespaceMemberStatements(info: ValueInfo): ReadonlyArray<Statement> {
        return toStatements(info, OutputKind.NamespaceMember);
    }
    function toStatements(info: ValueInfo, kind: OutputKind): ReadonlyArray<Statement> {
        const isDefault = info.name === InternalSymbolName.Default;
        const name = isDefault ? "_default" : info.name;
        if (!isValidIdentifier(name) || isDefault && kind !== OutputKind.NamedExport) return emptyArray;

        const modifiers = isDefault && info.kind === ValueKind.FunctionOrClass ? [createModifier(SyntaxKind.ExportKeyword), createModifier(SyntaxKind.DefaultKeyword)]
            : kind === OutputKind.ExportEquals ? [createModifier(SyntaxKind.DeclareKeyword)]
            : kind === OutputKind.NamedExport ? [createModifier(SyntaxKind.ExportKeyword)]
            : undefined;
        const exportEquals = () => kind === OutputKind.ExportEquals ? [exportEqualsOrDefault(info.name, /*isExportEquals*/ true)] : emptyArray;
        const exportDefault = () => isDefault ? [exportEqualsOrDefault("_default", /*isExportEquals*/ false)] : emptyArray;

        switch (info.kind) {
            case ValueKind.FunctionOrClass:
                return [...exportEquals(), ...functionOrClassToStatements(modifiers, name, info)];
            case ValueKind.Object:
                const { members } = info;
                if (kind === OutputKind.ExportEquals) {
                    return flatMap(members, v => toStatements(v, OutputKind.NamedExport));
                }
                if (members.some(m => m.kind === ValueKind.FunctionOrClass)) {
                    // If some member is a function, use a namespace so it gets a FunctionDeclaration or ClassDeclaration.
                    return [...exportDefault(), createNamespace(modifiers, name, flatMap(members, toNamespaceMemberStatements))];
                }
                // falls through
            case ValueKind.Const:
            case ValueKind.Array: {
                const comment = info.kind === ValueKind.Const ? info.comment : undefined;
                const constVar = createVariableStatement(modifiers, createVariableDeclarationList([createVariableDeclaration(name, toType(info))], NodeFlags.Const));
                return [...exportEquals(), ...exportDefault(), addComment(constVar, comment)];
            }
            default:
                return Debug.assertNever(info);
        }
    }
    function exportEqualsOrDefault(name: string, isExportEquals: boolean): ExportAssignment {
        return createExportAssignment(/*decorators*/ undefined, /*modifiers*/ undefined, isExportEquals, createIdentifier(name));
    }

    function functionOrClassToStatements(modifiers: Modifiers, name: string, { source, prototypeMembers, namespaceMembers }: ValueInfoFunctionOrClass): ReadonlyArray<Statement> {
        const fnAst = parseClassOrFunctionBody(source);
        const { parameters, returnType } = fnAst === undefined ? { parameters: emptyArray, returnType: anyType() } : getParametersAndReturnType(fnAst);
        const instanceProperties = typeof fnAst === "object" ? getConstructorFunctionInstanceProperties(fnAst) : emptyArray;

        const classStaticMembers: ClassElement[] | undefined =
            instanceProperties.length !== 0 || prototypeMembers.length !== 0 || fnAst === undefined || typeof fnAst !== "number" && fnAst.kind === SyntaxKind.Constructor ? [] : undefined;

        const namespaceStatements = flatMap(namespaceMembers, info => {
            if (!isValidIdentifier(info.name)) return undefined;
            if (classStaticMembers) {
                switch (info.kind) {
                    case ValueKind.Object:
                        if (info.members.some(m => m.kind === ValueKind.FunctionOrClass)) {
                            break;
                        }
                        // falls through
                    case ValueKind.Array:
                    case ValueKind.Const:
                        classStaticMembers.push(
                            addComment(
                                createProperty(/*decorators*/ undefined, [createModifier(SyntaxKind.StaticKeyword)], info.name, /*questionOrExclamationToken*/ undefined, toType(info), /*initializer*/ undefined),
                                info.kind === ValueKind.Const ? info.comment : undefined));
                        return undefined;
                    case ValueKind.FunctionOrClass:
                        if (!info.namespaceMembers.length) { // Else, can't merge a static method with a namespace. Must make it a function on the namespace.
                            const sig = tryGetMethod(info, [createModifier(SyntaxKind.StaticKeyword)]);
                            if (sig) {
                                classStaticMembers.push(sig);
                                return undefined;
                            }
                        }
                }
            }
            return toStatements(info, OutputKind.NamespaceMember);
        });

        const decl = classStaticMembers
            ? createClassDeclaration(
                /*decorators*/ undefined,
                modifiers,
                name,
                /*typeParameters*/ undefined,
                /*heritageClauses*/ undefined,
                [
                    ...classStaticMembers,
                    ...(parameters.length ? [createConstructor(/*decorators*/ undefined, /*modifiers*/ undefined, parameters, /*body*/ undefined)] : emptyArray),
                    ...instanceProperties,
                    // ignore non-functions on the prototype
                    ...mapDefined(prototypeMembers, info => info.kind === ValueKind.FunctionOrClass ? tryGetMethod(info) : undefined),
                ])
            : createFunctionDeclaration(/*decorators*/ undefined, modifiers, /*asteriskToken*/ undefined, name, /*typeParameters*/ undefined, parameters, returnType, /*body*/ undefined);
        return [decl, ...(namespaceStatements.length === 0 ? emptyArray : [createNamespace(modifiers && modifiers.map(m => getSynthesizedDeepClone(m)), name, namespaceStatements)])];
    }

    function tryGetMethod({ name, source }: ValueInfoFunctionOrClass, modifiers?: Modifiers): MethodDeclaration | undefined {
        if (!isValidIdentifier(name)) return undefined;
        const fnAst = parseClassOrFunctionBody(source);
        if (fnAst === undefined || (typeof fnAst !== "number" && fnAst.kind === SyntaxKind.Constructor)) return undefined;
        const sig = getParametersAndReturnType(fnAst);
        return sig && createMethod(
            /*decorators*/ undefined,
            modifiers,
            /*asteriskToken*/ undefined,
            name,
            /*questionToken*/ undefined,
            /*typeParameters*/ undefined,
            sig.parameters,
            sig.returnType,
            /*body*/ undefined);
    }

    function toType(info: ValueInfo): TypeNode {
        switch (info.kind) {
            case ValueKind.Const:
                return createTypeReferenceNode(info.typeName, /*typeArguments*/ undefined);
            case ValueKind.Array:
                return createArrayTypeNode(toType(info.inner));
            case ValueKind.FunctionOrClass:
                return createTypeReferenceNode("Function", /*typeArguments*/ undefined); // Normally we create a FunctionDeclaration, but this can happen for a function in an array.
            case ValueKind.Object:
                return createTypeLiteralNode(info.members.map(m => createPropertySignature(/*modifiers*/ undefined, m.name, /*questionToken*/ undefined, toType(m), /*initializer*/ undefined)));
            default:
                return Debug.assertNever(info);
        }
    }

    // Parses assignments to "this.x" in the constructor into class property declarations
    function getConstructorFunctionInstanceProperties(fnAst: FunctionOrConstructorNode): ReadonlyArray<PropertyDeclaration> {
        const members: PropertyDeclaration[] = [];
        forEachOwnNodeOfFunction(fnAst, node => {
            if (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true) &&
                isPropertyAccessExpression(node.left) && node.left.expression.kind === SyntaxKind.ThisKeyword) {
                const name = node.left.name.text;
                if (!isJsPrivate(name)) members.push(createProperty(/*decorators*/ undefined, /*modifiers*/ undefined, name, /*questionOrExclamationToken*/ undefined, anyType(), /*initializer*/ undefined));
            }
        });
        return members;
    }

    interface ParametersAndReturnType { readonly parameters: ReadonlyArray<ParameterDeclaration>; readonly returnType: TypeNode; }
    function getParametersAndReturnType(fnAst: FunctionOrConstructor): ParametersAndReturnType {
        if (typeof fnAst === "number") {
            return { parameters: fill(fnAst, i => makeParameter(`p${i}`, anyType())), returnType: anyType() };
        }
        let usedArguments = false, hasReturn = false;
        forEachOwnNodeOfFunction(fnAst, node => {
            usedArguments = usedArguments || isIdentifier(node) && node.text === "arguments";
            hasReturn = hasReturn || isReturnStatement(node) && !!node.expression && node.expression.kind !== SyntaxKind.VoidExpression;
        });
        const parameters = [
            ...fnAst.parameters.map(p => makeParameter(`${p.name.getText()}`, inferParameterType(fnAst, p))),
            ...(usedArguments ? [makeRestParameter()] : emptyArray),
        ];
        return { parameters, returnType: hasReturn ? anyType() : createKeywordTypeNode(SyntaxKind.VoidKeyword) };
    }
    function makeParameter(name: string, type: TypeNode): ParameterDeclaration {
        return createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, name, /*questionToken*/ undefined, type);
    }
    function makeRestParameter(): ParameterDeclaration {
        return createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, createToken(SyntaxKind.DotDotDotToken), "args", /*questionToken*/ undefined, createArrayTypeNode(anyType()));
    }

    type FunctionOrConstructorNode = FunctionExpression | ArrowFunction | ConstructorDeclaration | MethodDeclaration;
    type FunctionOrConstructor = FunctionOrConstructorNode | number; // number is for native function
    /** Returns 'undefined' for class with no declared constructor */
    function parseClassOrFunctionBody(source: string | number): FunctionOrConstructor | undefined {
        if (typeof source === "number") return source;
        const classOrFunction = tryCast(parseExpression(source), (node): node is FunctionExpression | ArrowFunction | ClassExpression => isFunctionExpression(node) || isArrowFunction(node) || isClassExpression(node));
        return classOrFunction
            ? isClassExpression(classOrFunction) ? find(classOrFunction.members, isConstructorDeclaration) : classOrFunction
            // If that didn't parse, it's a method `m() {}`. Parse again inside of an object literal.
            : cast(first(cast(parseExpression(`{ ${source} }`), isObjectLiteralExpression).properties), isMethodDeclaration);
    }

    function parseExpression(expr: string): Expression {
        const text = `const _ = ${expr}`;
        const srcFile = createSourceFile("test.ts", text, ScriptTarget.Latest, /*setParentNodes*/ true);
        return first(cast(first(srcFile.statements), isVariableStatement).declarationList.declarations).initializer!;
    }

    function inferParameterType(_fn: FunctionOrConstructor, _param: ParameterDeclaration): TypeNode {
        // TODO: Inspect function body for clues (see inferFromUsage.ts)
        return anyType();
    }

    // Descends through all nodes in a function, but not in nested functions.
    function forEachOwnNodeOfFunction(fnAst: FunctionOrConstructorNode, cb: (node: Node) => void) {
        fnAst.body!.forEachChild(function recur(node) {
            cb(node);
            if (!isFunctionLike(node)) node.forEachChild(recur);
        });
    }

    function isValidIdentifier(name: string): boolean {
        const keyword = stringToToken(name);
        return !(keyword && isNonContextualKeyword(keyword)) && isIdentifierText(name, ScriptTarget.ESNext);
    }

    type Modifiers = ReadonlyArray<Modifier> | undefined;

    function addComment<T extends Node>(node: T, comment: string | undefined): T {
        if (comment !== undefined) addSyntheticLeadingComment(node, SyntaxKind.SingleLineCommentTrivia, comment);
        return node;
    }

    function anyType(): KeywordTypeNode {
        return createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function createNamespace(modifiers: Modifiers, name: string, statements: ReadonlyArray<Statement>): NamespaceDeclaration {
        return createModuleDeclaration(/*decorators*/ undefined, modifiers, createIdentifier(name), createModuleBlock(statements), NodeFlags.Namespace) as NamespaceDeclaration;
    }
}
