/// <reference path="../binder.ts" />

/* @internal */
namespace ts {
    export function writerConstructor(
        { createSymbol, getSymbolCount }: { // symbol proper
            createSymbol: (flags: SymbolFlags, name: string) => Symbol,
            getSymbolCount: (host: TypeCheckerHost) => void
        },
        { getSymbolOfNode }: { // other symbols
            getSymbolOfNode: (node: Node) => Symbol
        },
        { compilerOptions, languageVersion }: { // global settings
            compilerOptions: CompilerOptions,
            languageVersion: ScriptTarget
        },
        {
            getTypeParametersOfClassOrInterface, // uncategorised
            getAccessibleSymbolChain,
            needsQualification,
            getQualifiedLeftMeaning,
            hasExternalModuleSymbol,
            isTypeAny,
            emptyUnionType,
            isReservedMemberName,
            emptyArray,
            globalArrayType,
            getParentSymbolOfTypeParameter,
            isReadonlySymbol,
            resolveStructuredTypeMembers,
            getTypeOfSymbol,
            getPropertiesOfObjectType,
            getSignaturesOfType,
            getTargetSymbol,
            getLocalTypeParametersOfClassOrInterfaceOrTypeAlias,
            getConstraintOfTypeParameter,
            isOptionalParameter,
            getReturnTypeOfSignature,
            getParentOfSymbol
        }: {
            getTypeParametersOfClassOrInterface: any,
            getAccessibleSymbolChain: any,
            needsQualification: any,
            getQualifiedLeftMeaning: any,
            hasExternalModuleSymbol: any,
            isTypeAny: any,
            emptyUnionType: ResolvedType,
            isReservedMemberName: any,
            emptyArray: any[],
            globalArrayType: GenericType,
            getParentSymbolOfTypeParameter: any,
            isReadonlySymbol: any,
            resolveStructuredTypeMembers: any,
            getTypeOfSymbol: any,
            getPropertiesOfObjectType: any,
            getSignaturesOfType: any,
            getTargetSymbol: any,
            getLocalTypeParametersOfClassOrInterfaceOrTypeAlias: any,
            getConstraintOfTypeParameter: any,
            isOptionalParameter: any,
            getReturnTypeOfSignature: any,
            getParentOfSymbol: any
        }) {

        // This is for caching the result of getSymbolDisplayBuilder. Do not access directly.
        let _displayBuilder: SymbolDisplayBuilder;

        function symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): string {
            const writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning);
            const result = writer.string();
            releaseStringWriter(writer);

            return result;
        }

        function signatureToString(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind): string {
            const writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildSignatureDisplay(signature, writer, enclosingDeclaration, flags, kind);
            const result = writer.string();
            releaseStringWriter(writer);

            return result;
        }

        function typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string {
            const writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
            let result = writer.string();
            releaseStringWriter(writer);

            const maxLength = compilerOptions.noErrorTruncation || flags & TypeFormatFlags.NoTruncation ? undefined : 100;
            if (maxLength && result.length >= maxLength) {
                result = result.substr(0, maxLength - "...".length) + "...";
            }
            return result;
        }

        function typePredicateToString(typePredicate: TypePredicate, enclosingDeclaration?: Declaration, flags?: TypeFormatFlags): string {
            const writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildTypePredicateDisplay(typePredicate, writer, enclosingDeclaration, flags);
            const result = writer.string();
            releaseStringWriter(writer);

            return result;
        }

        function visibilityToString(flags: NodeFlags) {
            if (flags === NodeFlags.Private) {
                return "private";
            }
            if (flags === NodeFlags.Protected) {
                return "protected";
            }
            return "public";
        }

        function getTypeAliasForTypeLiteral(type: Type): Symbol {
            if (type.symbol && type.symbol.flags & SymbolFlags.TypeLiteral) {
                let node = type.symbol.declarations[0].parent;
                while (node.kind === SyntaxKind.ParenthesizedType) {
                    node = node.parent;
                }
                if (node.kind === SyntaxKind.TypeAliasDeclaration) {
                    return getSymbolOfNode(node);
                }
            }
            return undefined;
        }

        function getSymbolDisplayBuilder(): SymbolDisplayBuilder {

            function getNameOfSymbol(symbol: Symbol): string {
                if (symbol.declarations && symbol.declarations.length) {
                    const declaration = symbol.declarations[0];
                    if (declaration.name) {
                        return declarationNameToString(declaration.name);
                    }
                    switch (declaration.kind) {
                    case SyntaxKind.ClassExpression:
                        return "(Anonymous class)";
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                        return "(Anonymous function)";
                    }
                }
                return symbol.name;
            }

            /**
             * Writes only the name of the symbol out to the writer. Uses the original source text
             * for the name of the symbol if it is available to match how the user wrote the name.
             */
            function appendSymbolNameOnly(symbol: Symbol, writer: SymbolWriter): void {
                writer.writeSymbol(getNameOfSymbol(symbol), symbol);
            }

            /**
             * Writes a property access or element access with the name of the symbol out to the writer.
             * Uses the original source text for the name of the symbol if it is available to match how the user wrote the name,
             * ensuring that any names written with literals use element accesses.
             */
            function appendPropertyOrElementAccessForSymbol(symbol: Symbol, writer: SymbolWriter): void {
                const symbolName = getNameOfSymbol(symbol);
                const firstChar = symbolName.charCodeAt(0);
                const needsElementAccess = !isIdentifierStart(firstChar, languageVersion);

                if (needsElementAccess) {
                    writePunctuation(writer, SyntaxKind.OpenBracketToken);
                    if (isSingleOrDoubleQuote(firstChar)) {
                        writer.writeStringLiteral(symbolName);
                    }
                    else {
                        writer.writeSymbol(symbolName, symbol);
                    }
                    writePunctuation(writer, SyntaxKind.CloseBracketToken);
                }
                else {
                    writePunctuation(writer, SyntaxKind.DotToken);
                    writer.writeSymbol(symbolName, symbol);
                }
            }

            /**
             * Enclosing declaration is optional when we don't want to get qualified name in the enclosing declaration scope
             * Meaning needs to be specified if the enclosing declaration is given
             */
            function buildSymbolDisplay(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags, typeFlags?: TypeFormatFlags): void {
                let parentSymbol: Symbol;
                function appendParentTypeArgumentsAndSymbolName(symbol: Symbol): void {
                    if (parentSymbol) {
                        // Write type arguments of instantiated class/interface here
                        if (flags & SymbolFormatFlags.WriteTypeParametersOrArguments) {
                            if (symbol.flags & SymbolFlags.Instantiated) {
                                buildDisplayForTypeArgumentsAndDelimiters(getTypeParametersOfClassOrInterface(parentSymbol),
                                                                          (<TransientSymbol>symbol).mapper, writer, enclosingDeclaration);
                            }
                            else {
                                buildTypeParameterDisplayFromSymbol(parentSymbol, writer, enclosingDeclaration);
                            }
                        }
                        appendPropertyOrElementAccessForSymbol(symbol, writer);
                    }
                    else {
                        appendSymbolNameOnly(symbol, writer);
                    }
                    parentSymbol = symbol;
                }

                // let the writer know we just wrote out a symbol.  The declaration emitter writer uses
                // this to determine if an import it has previously seen (and not written out) needs
                // to be written to the file once the walk of the tree is complete.
                //
                // NOTE(cyrusn): This approach feels somewhat unfortunate.  A simple pass over the tree
                // up front (for example, during checking) could determine if we need to emit the imports
                // and we could then access that data during declaration emit.
                writer.trackSymbol(symbol, enclosingDeclaration, meaning);
                function walkSymbol(symbol: Symbol, meaning: SymbolFlags): void {
                    if (symbol) {
                        const accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, !!(flags & SymbolFormatFlags.UseOnlyExternalAliasing));

                        if (!accessibleSymbolChain ||
                            needsQualification(accessibleSymbolChain[0], enclosingDeclaration, accessibleSymbolChain.length === 1 ? meaning : getQualifiedLeftMeaning(meaning))) {

                            // Go up and add our parent.
                            walkSymbol(
                                getParentOfSymbol(accessibleSymbolChain ? accessibleSymbolChain[0] : symbol),
                                getQualifiedLeftMeaning(meaning));
                        }

                        if (accessibleSymbolChain) {
                            for (const accessibleSymbol of accessibleSymbolChain) {
                                appendParentTypeArgumentsAndSymbolName(accessibleSymbol);
                            }
                        }
                        else {
                            // If we didn't find accessible symbol chain for this symbol, break if this is external module
                            if (!parentSymbol && ts.forEach(symbol.declarations, hasExternalModuleSymbol)) {
                                return;
                            }

                            // if this is anonymous type break
                            if (symbol.flags & SymbolFlags.TypeLiteral || symbol.flags & SymbolFlags.ObjectLiteral) {
                                return;
                            }

                            appendParentTypeArgumentsAndSymbolName(symbol);
                        }
                    }
                }

                // Get qualified name if the symbol is not a type parameter
                // and there is an enclosing declaration or we specifically
                // asked for it
                const isTypeParameter = symbol.flags & SymbolFlags.TypeParameter;
                const typeFormatFlag = TypeFormatFlags.UseFullyQualifiedType & typeFlags;
                if (!isTypeParameter && (enclosingDeclaration || typeFormatFlag)) {
                    walkSymbol(symbol, meaning);
                    return;
                }

                return appendParentTypeArgumentsAndSymbolName(symbol);
            }

            function buildTypeDisplay(type: Type, writer: SymbolWriter, enclosingDeclaration?: Node, globalFlags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                const globalFlagsToPass = globalFlags & TypeFormatFlags.WriteOwnNameForAnyLike;
                let inObjectTypeLiteral = false;
                return writeType(type, globalFlags);

                function writeType(type: Type, flags: TypeFormatFlags) {
                    // Write undefined/null type as any
                    if (type.flags & TypeFlags.Intrinsic) {
                        // Special handling for unknown / resolving types, they should show up as any and not unknown or __resolving
                        writer.writeKeyword(!(globalFlags & TypeFormatFlags.WriteOwnNameForAnyLike) && isTypeAny(type)
                                            ? "any"
                                            : (<IntrinsicType>type).intrinsicName);
                    }
                    else if (type.flags & TypeFlags.ThisType) {
                        if (inObjectTypeLiteral) {
                            writer.reportInaccessibleThisError();
                        }
                        writer.writeKeyword("this");
                    }
                    else if (type.flags & TypeFlags.Reference) {
                        writeTypeReference(<TypeReference>type, flags);
                    }
                    else if (type.flags & (TypeFlags.Class | TypeFlags.Interface | TypeFlags.Enum | TypeFlags.TypeParameter)) {
                        // The specified symbol flags need to be reinterpreted as type flags
                        buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, SymbolFlags.Type, SymbolFormatFlags.None, flags);
                    }
                    else if (type.flags & TypeFlags.Tuple) {
                        writeTupleType(<TupleType>type);
                    }
                    else if (type.flags & TypeFlags.UnionOrIntersection) {
                        writeUnionOrIntersectionType(<UnionOrIntersectionType>type, flags);
                    }
                    else if (type.flags & TypeFlags.Anonymous) {
                        if (type === emptyUnionType) {
                            writer.writeKeyword("nothing");
                        }
                        else {
                            writeAnonymousType(<ObjectType>type, flags);
                        }
                    }
                    else if (type.flags & TypeFlags.StringLiteral) {
                        writer.writeStringLiteral(`"${escapeString((<StringLiteralType>type).text)}"`);
                    }
                    else {
                        // Should never get here
                        // { ... }
                        writePunctuation(writer, SyntaxKind.OpenBraceToken);
                        writeSpace(writer);
                        writePunctuation(writer, SyntaxKind.DotDotDotToken);
                        writeSpace(writer);
                        writePunctuation(writer, SyntaxKind.CloseBraceToken);
                    }
                }

                function writeTypeList(types: Type[], delimiter: SyntaxKind) {
                    for (let i = 0; i < types.length; i++) {
                        if (i > 0) {
                            if (delimiter !== SyntaxKind.CommaToken) {
                                writeSpace(writer);
                            }
                            writePunctuation(writer, delimiter);
                            writeSpace(writer);
                        }
                        writeType(types[i], delimiter === SyntaxKind.CommaToken ? TypeFormatFlags.None : TypeFormatFlags.InElementType);
                    }
                }

                function writeSymbolTypeReference(symbol: Symbol, typeArguments: Type[], pos: number, end: number, flags: TypeFormatFlags) {
                    // Unnamed function expressions and arrow functions have reserved names that we don't want to display
                    if (symbol.flags & SymbolFlags.Class || !isReservedMemberName(symbol.name)) {
                        buildSymbolDisplay(symbol, writer, enclosingDeclaration, SymbolFlags.Type, SymbolFormatFlags.None, flags);
                    }
                    if (pos < end) {
                        writePunctuation(writer, SyntaxKind.LessThanToken);
                        writeType(typeArguments[pos], TypeFormatFlags.InFirstTypeArgument);
                        pos++;
                        while (pos < end) {
                            writePunctuation(writer, SyntaxKind.CommaToken);
                            writeSpace(writer);
                            writeType(typeArguments[pos], TypeFormatFlags.None);
                            pos++;
                        }
                        writePunctuation(writer, SyntaxKind.GreaterThanToken);
                    }
                }

                function writeTypeReference(type: TypeReference, flags: TypeFormatFlags) {
                    const typeArguments = type.typeArguments || emptyArray;
                    if (type.target === globalArrayType && !(flags & TypeFormatFlags.WriteArrayAsGenericType)) {
                        writeType(typeArguments[0], TypeFormatFlags.InElementType);
                        writePunctuation(writer, SyntaxKind.OpenBracketToken);
                        writePunctuation(writer, SyntaxKind.CloseBracketToken);
                    }
                    else {
                        // Write the type reference in the format f<A>.g<B>.C<X, Y> where A and B are type arguments
                        // for outer type parameters, and f and g are the respective declaring containers of those
                        // type parameters.
                        const outerTypeParameters = type.target.outerTypeParameters;
                        let i = 0;
                        if (outerTypeParameters) {
                            const length = outerTypeParameters.length;
                            while (i < length) {
                                // Find group of type arguments for type parameters with the same declaring container.
                                const start = i;
                                const parent = getParentSymbolOfTypeParameter(outerTypeParameters[i]);
                                do {
                                    i++;
                                } while (i < length && getParentSymbolOfTypeParameter(outerTypeParameters[i]) === parent);
                                // When type parameters are their own type arguments for the whole group (i.e. we have
                                // the default outer type arguments), we don't show the group.
                                if (!rangeEquals(outerTypeParameters, typeArguments, start, i)) {
                                    writeSymbolTypeReference(parent, typeArguments, start, i, flags);
                                    writePunctuation(writer, SyntaxKind.DotToken);
                                }
                            }
                        }
                        const typeParameterCount = (type.target.typeParameters || emptyArray).length;
                        writeSymbolTypeReference(type.symbol, typeArguments, i, typeParameterCount, flags);
                    }
                }

                function writeTupleType(type: TupleType) {
                    writePunctuation(writer, SyntaxKind.OpenBracketToken);
                    writeTypeList(type.elementTypes, SyntaxKind.CommaToken);
                    writePunctuation(writer, SyntaxKind.CloseBracketToken);
                }

                function writeUnionOrIntersectionType(type: UnionOrIntersectionType, flags: TypeFormatFlags) {
                    if (flags & TypeFormatFlags.InElementType) {
                        writePunctuation(writer, SyntaxKind.OpenParenToken);
                    }
                    writeTypeList(type.types, type.flags & TypeFlags.Union ? SyntaxKind.BarToken : SyntaxKind.AmpersandToken);
                    if (flags & TypeFormatFlags.InElementType) {
                        writePunctuation(writer, SyntaxKind.CloseParenToken);
                    }
                }

                function writeAnonymousType(type: ObjectType, flags: TypeFormatFlags) {
                    const symbol = type.symbol;
                    if (symbol) {
                        // Always use 'typeof T' for type of class, enum, and module objects
                        if (symbol.flags & (SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule)) {
                            writeTypeOfSymbol(type, flags);
                        }
                        else if (shouldWriteTypeOfFunctionSymbol()) {
                            writeTypeOfSymbol(type, flags);
                        }
                        else if (contains(symbolStack, symbol)) {
                            // If type is an anonymous type literal in a type alias declaration, use type alias name
                            const typeAlias = getTypeAliasForTypeLiteral(type);
                            if (typeAlias) {
                                // The specified symbol flags need to be reinterpreted as type flags
                                buildSymbolDisplay(typeAlias, writer, enclosingDeclaration, SymbolFlags.Type, SymbolFormatFlags.None, flags);
                            }
                            else {
                                // Recursive usage, use any
                                writeKeyword(writer, SyntaxKind.AnyKeyword);
                            }
                        }
                        else {
                            // Since instantiations of the same anonymous type have the same symbol, tracking symbols instead
                            // of types allows us to catch circular references to instantiations of the same anonymous type
                            if (!symbolStack) {
                                symbolStack = [];
                            }
                            symbolStack.push(symbol);
                            writeLiteralType(type, flags);
                            symbolStack.pop();
                        }
                    }
                    else {
                        // Anonymous types with no symbol are never circular
                        writeLiteralType(type, flags);
                    }

                    function shouldWriteTypeOfFunctionSymbol() {
                        const isStaticMethodSymbol = !!(symbol.flags & SymbolFlags.Method &&  // typeof static method
                                                        forEach(symbol.declarations, declaration => declaration.flags & NodeFlags.Static));
                        const isNonLocalFunctionSymbol = !!(symbol.flags & SymbolFlags.Function) &&
                            (symbol.parent || // is exported function symbol
                             forEach(symbol.declarations, declaration =>
                                     declaration.parent.kind === SyntaxKind.SourceFile || declaration.parent.kind === SyntaxKind.ModuleBlock));
                        if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                            // typeof is allowed only for static/non local functions
                            return !!(flags & TypeFormatFlags.UseTypeOfFunction) || // use typeof if format flags specify it
                            (contains(symbolStack, symbol)); // it is type of the symbol uses itself recursively
                        }
                    }
                }

                function writeTypeOfSymbol(type: ObjectType, typeFormatFlags?: TypeFormatFlags) {
                    writeKeyword(writer, SyntaxKind.TypeOfKeyword);
                    writeSpace(writer);
                    buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, SymbolFlags.Value, SymbolFormatFlags.None, typeFormatFlags);
                }

                function writeIndexSignature(info: IndexInfo, keyword: SyntaxKind) {
                    if (info) {
                        if (info.isReadonly) {
                            writeKeyword(writer, SyntaxKind.ReadonlyKeyword);
                            writeSpace(writer);
                        }
                        writePunctuation(writer, SyntaxKind.OpenBracketToken);
                        writer.writeParameter(info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : "x");
                        writePunctuation(writer, SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeKeyword(writer, keyword);
                        writePunctuation(writer, SyntaxKind.CloseBracketToken);
                        writePunctuation(writer, SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeType(info.type, TypeFormatFlags.None);
                        writePunctuation(writer, SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                }

                function writePropertyWithModifiers(prop: Symbol) {
                    if (isReadonlySymbol(prop)) {
                        writeKeyword(writer, SyntaxKind.ReadonlyKeyword);
                        writeSpace(writer);
                    }
                    buildSymbolDisplay(prop, writer);
                    if (prop.flags & SymbolFlags.Optional) {
                        writePunctuation(writer, SyntaxKind.QuestionToken);
                    }
                }

                function shouldAddParenthesisAroundFunctionType(callSignature: Signature, flags: TypeFormatFlags) {
                    if (flags & TypeFormatFlags.InElementType) {
                        return true;
                    }
                    else if (flags & TypeFormatFlags.InFirstTypeArgument) {
                        // Add parenthesis around function type for the first type argument to avoid ambiguity
                        const typeParameters = callSignature.target && (flags & TypeFormatFlags.WriteTypeArgumentsOfSignature) ?
                            callSignature.target.typeParameters : callSignature.typeParameters;
                        return typeParameters && typeParameters.length !== 0;
                    }
                    return false;
                }

                function writeLiteralType(type: ObjectType, flags: TypeFormatFlags) {
                    const resolved = resolveStructuredTypeMembers(type);
                    if (!resolved.properties.length && !resolved.stringIndexInfo && !resolved.numberIndexInfo) {
                        if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                            writePunctuation(writer, SyntaxKind.OpenBraceToken);
                            writePunctuation(writer, SyntaxKind.CloseBraceToken);
                            return;
                        }

                        if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                            const parenthesizeSignature = shouldAddParenthesisAroundFunctionType(resolved.callSignatures[0], flags);
                            if (parenthesizeSignature) {
                                writePunctuation(writer, SyntaxKind.OpenParenToken);
                            }
                            buildSignatureDisplay(resolved.callSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | TypeFormatFlags.WriteArrowStyleSignature, /*kind*/ undefined, symbolStack);
                            if (parenthesizeSignature) {
                                writePunctuation(writer, SyntaxKind.CloseParenToken);
                            }
                            return;
                        }
                        if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                            if (flags & TypeFormatFlags.InElementType) {
                                writePunctuation(writer, SyntaxKind.OpenParenToken);
                            }
                            writeKeyword(writer, SyntaxKind.NewKeyword);
                            writeSpace(writer);
                            buildSignatureDisplay(resolved.constructSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | TypeFormatFlags.WriteArrowStyleSignature, /*kind*/ undefined, symbolStack);
                            if (flags & TypeFormatFlags.InElementType) {
                                writePunctuation(writer, SyntaxKind.CloseParenToken);
                            }
                            return;
                        }
                    }

                    const saveInObjectTypeLiteral = inObjectTypeLiteral;
                    inObjectTypeLiteral = true;
                    writePunctuation(writer, SyntaxKind.OpenBraceToken);
                    writer.writeLine();
                    writer.increaseIndent();
                    for (const signature of resolved.callSignatures) {
                        buildSignatureDisplay(signature, writer, enclosingDeclaration, globalFlagsToPass, /*kind*/ undefined, symbolStack);
                        writePunctuation(writer, SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    for (const signature of resolved.constructSignatures) {
                        buildSignatureDisplay(signature, writer, enclosingDeclaration, globalFlagsToPass, SignatureKind.Construct, symbolStack);
                        writePunctuation(writer, SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    writeIndexSignature(resolved.stringIndexInfo, SyntaxKind.StringKeyword);
                    writeIndexSignature(resolved.numberIndexInfo, SyntaxKind.NumberKeyword);
                    for (const p of resolved.properties) {
                        const t = getTypeOfSymbol(p);
                        if (p.flags & (SymbolFlags.Function | SymbolFlags.Method) && !getPropertiesOfObjectType(t).length) {
                            const signatures = getSignaturesOfType(t, SignatureKind.Call);
                            for (const signature of signatures) {
                                writePropertyWithModifiers(p);
                                buildSignatureDisplay(signature, writer, enclosingDeclaration, globalFlagsToPass, /*kind*/ undefined, symbolStack);
                                writePunctuation(writer, SyntaxKind.SemicolonToken);
                                writer.writeLine();
                            }
                        }
                        else {
                            writePropertyWithModifiers(p);
                            writePunctuation(writer, SyntaxKind.ColonToken);
                            writeSpace(writer);
                            writeType(t, TypeFormatFlags.None);
                            writePunctuation(writer, SyntaxKind.SemicolonToken);
                            writer.writeLine();
                        }
                    }
                    writer.decreaseIndent();
                    writePunctuation(writer, SyntaxKind.CloseBraceToken);
                    inObjectTypeLiteral = saveInObjectTypeLiteral;
                }
            }

            function buildTypeParameterDisplayFromSymbol(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags) {
                const targetSymbol = getTargetSymbol(symbol);
                if (targetSymbol.flags & SymbolFlags.Class || targetSymbol.flags & SymbolFlags.Interface || targetSymbol.flags & SymbolFlags.TypeAlias) {
                    buildDisplayForTypeParametersAndDelimiters(getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol), writer, enclosingDeclaration, flags);
                }
            }

            function buildTypeParameterDisplay(tp: TypeParameter, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                appendSymbolNameOnly(tp.symbol, writer);
                const constraint = getConstraintOfTypeParameter(tp);
                if (constraint) {
                    writeSpace(writer);
                    writeKeyword(writer, SyntaxKind.ExtendsKeyword);
                    writeSpace(writer);
                    buildTypeDisplay(constraint, writer, enclosingDeclaration, flags, symbolStack);
                }
            }

            function buildParameterDisplay(p: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                const parameterNode = <ParameterDeclaration>p.valueDeclaration;
                if (isRestParameter(parameterNode)) {
                    writePunctuation(writer, SyntaxKind.DotDotDotToken);
                }
                if (isBindingPattern(parameterNode.name)) {
                    buildBindingPatternDisplay(<BindingPattern>parameterNode.name, writer, enclosingDeclaration, flags, symbolStack);
                }
                else {
                    appendSymbolNameOnly(p, writer);
                }
                if (isOptionalParameter(parameterNode)) {
                    writePunctuation(writer, SyntaxKind.QuestionToken);
                }
                writePunctuation(writer, SyntaxKind.ColonToken);
                writeSpace(writer);

                buildTypeDisplay(getTypeOfSymbol(p), writer, enclosingDeclaration, flags, symbolStack);
            }

            function buildBindingPatternDisplay(bindingPattern: BindingPattern, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                // We have to explicitly emit square bracket and bracket because these tokens are not stored inside the node.
                if (bindingPattern.kind === SyntaxKind.ObjectBindingPattern) {
                    writePunctuation(writer, SyntaxKind.OpenBraceToken);
                    buildDisplayForCommaSeparatedList(bindingPattern.elements, writer, e => buildBindingElementDisplay(e, writer, enclosingDeclaration, flags, symbolStack));
                    writePunctuation(writer, SyntaxKind.CloseBraceToken);
                }
                else if (bindingPattern.kind === SyntaxKind.ArrayBindingPattern) {
                    writePunctuation(writer, SyntaxKind.OpenBracketToken);
                    const elements = bindingPattern.elements;
                    buildDisplayForCommaSeparatedList(elements, writer, e => buildBindingElementDisplay(e, writer, enclosingDeclaration, flags, symbolStack));
                    if (elements && elements.hasTrailingComma) {
                        writePunctuation(writer, SyntaxKind.CommaToken);
                    }
                    writePunctuation(writer, SyntaxKind.CloseBracketToken);
                }
            }

            function buildBindingElementDisplay(bindingElement: BindingElement, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                if (bindingElement.kind === SyntaxKind.OmittedExpression) {
                    return;
                }
                Debug.assert(bindingElement.kind === SyntaxKind.BindingElement);
                if (bindingElement.propertyName) {
                    writer.writeSymbol(getTextOfNode(bindingElement.propertyName), bindingElement.symbol);
                    writePunctuation(writer, SyntaxKind.ColonToken);
                    writeSpace(writer);
                }
                if (isBindingPattern(bindingElement.name)) {
                    buildBindingPatternDisplay(<BindingPattern>bindingElement.name, writer, enclosingDeclaration, flags, symbolStack);
                }
                else {
                    if (bindingElement.dotDotDotToken) {
                        writePunctuation(writer, SyntaxKind.DotDotDotToken);
                    }
                    appendSymbolNameOnly(bindingElement.symbol, writer);
                }
            }

            function buildDisplayForTypeParametersAndDelimiters(typeParameters: TypeParameter[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, SyntaxKind.LessThanToken);
                    buildDisplayForCommaSeparatedList(typeParameters, writer, p => buildTypeParameterDisplay(p, writer, enclosingDeclaration, flags, symbolStack));
                    writePunctuation(writer, SyntaxKind.GreaterThanToken);
                }
            }

            function buildDisplayForCommaSeparatedList<T>(list: T[], writer: SymbolWriter, action: (item: T) => void) {
                for (let i = 0; i < list.length; i++) {
                    if (i > 0) {
                        writePunctuation(writer, SyntaxKind.CommaToken);
                        writeSpace(writer);
                    }
                    action(list[i]);
                }
            }

            function buildDisplayForTypeArgumentsAndDelimiters(typeParameters: TypeParameter[], mapper: TypeMapper, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, SyntaxKind.LessThanToken);
                    let flags = TypeFormatFlags.InFirstTypeArgument;
                    for (let i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, SyntaxKind.CommaToken);
                            writeSpace(writer);
                            flags = TypeFormatFlags.None;
                        }
                        buildTypeDisplay(mapper(typeParameters[i]), writer, enclosingDeclaration, flags);
                    }
                    writePunctuation(writer, SyntaxKind.GreaterThanToken);
                }
            }

            function buildDisplayForParametersAndDelimiters(thisType: Type, parameters: Symbol[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                writePunctuation(writer, SyntaxKind.OpenParenToken);
                if (thisType) {
                    writeKeyword(writer, SyntaxKind.ThisKeyword);
                    writePunctuation(writer, SyntaxKind.ColonToken);
                    writeSpace(writer);
                    buildTypeDisplay(thisType, writer, enclosingDeclaration, flags, symbolStack);
                }
                for (let i = 0; i < parameters.length; i++) {
                    if (i > 0 || thisType) {
                        writePunctuation(writer, SyntaxKind.CommaToken);
                        writeSpace(writer);
                    }
                    buildParameterDisplay(parameters[i], writer, enclosingDeclaration, flags, symbolStack);
                }
                writePunctuation(writer, SyntaxKind.CloseParenToken);
            }

            function buildTypePredicateDisplay(predicate: TypePredicate, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]): void {
                if (isIdentifierTypePredicate(predicate)) {
                    writer.writeParameter(predicate.parameterName);
                }
                else {
                    writeKeyword(writer, SyntaxKind.ThisKeyword);
                }
                writeSpace(writer);
                writeKeyword(writer, SyntaxKind.IsKeyword);
                writeSpace(writer);
                buildTypeDisplay(predicate.type, writer, enclosingDeclaration, flags, symbolStack);
            }

            function buildReturnTypeDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                if (flags & TypeFormatFlags.WriteArrowStyleSignature) {
                    writeSpace(writer);
                    writePunctuation(writer, SyntaxKind.EqualsGreaterThanToken);
                }
                else {
                    writePunctuation(writer, SyntaxKind.ColonToken);
                }
                writeSpace(writer);

                if (signature.typePredicate) {
                    buildTypePredicateDisplay(signature.typePredicate, writer, enclosingDeclaration, flags, symbolStack);
                }
                else {
                    const returnType = getReturnTypeOfSignature(signature);
                    buildTypeDisplay(returnType, writer, enclosingDeclaration, flags, symbolStack);
                }
            }

            function buildSignatureDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind, symbolStack?: Symbol[]) {
                if (kind === SignatureKind.Construct) {
                    writeKeyword(writer, SyntaxKind.NewKeyword);
                    writeSpace(writer);
                }

                if (signature.target && (flags & TypeFormatFlags.WriteTypeArgumentsOfSignature)) {
                    // Instantiated signature, write type arguments instead
                    // This is achieved by passing in the mapper separately
                    buildDisplayForTypeArgumentsAndDelimiters(signature.target.typeParameters, signature.mapper, writer, enclosingDeclaration);
                }
                else {
                    buildDisplayForTypeParametersAndDelimiters(signature.typeParameters, writer, enclosingDeclaration, flags, symbolStack);
                }

                buildDisplayForParametersAndDelimiters(signature.thisType, signature.parameters, writer, enclosingDeclaration, flags, symbolStack);

                buildReturnTypeDisplay(signature, writer, enclosingDeclaration, flags, symbolStack);
            }

            return _displayBuilder || (_displayBuilder = {
                buildSymbolDisplay,
                buildTypeDisplay,
                buildTypeParameterDisplay,
                buildTypePredicateDisplay,
                buildParameterDisplay,
                buildDisplayForParametersAndDelimiters,
                buildDisplayForTypeParametersAndDelimiters,
                buildTypeParameterDisplayFromSymbol,
                buildSignatureDisplay,
                buildReturnTypeDisplay
            });
        }


        return { typeToString, getSymbolDisplayBuilder, symbolToString, signatureToString, typePredicateToString, visibilityToString };
    }

    export function writeKeyword(writer: SymbolWriter, kind: SyntaxKind) {
        writer.writeKeyword(tokenToString(kind));
    }

    export function writePunctuation(writer: SymbolWriter, kind: SyntaxKind) {
        writer.writePunctuation(tokenToString(kind));
    }

    export function writeSpace(writer: SymbolWriter) {
        writer.writeSpace(" ");
    }
}
