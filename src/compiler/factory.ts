/* @internal */
namespace ts {
    export const nullTransformationContext: TransformationContext = {
        enableEmitNotification: noop,
        enableSubstitution: noop,
        endLexicalEnvironment: returnUndefined,
        getCompilerOptions: () => ({}),
        getEmitHost: notImplemented,
        getEmitResolver: notImplemented,
        setLexicalEnvironmentFlags: noop,
        getLexicalEnvironmentFlags: () => 0,
        hoistFunctionDeclaration: noop,
        hoistVariableDeclaration: noop,
        addInitializationStatement: noop,
        isEmitNotificationEnabled: notImplemented,
        isSubstitutionEnabled: notImplemented,
        onEmitNode: noop,
        onSubstituteNode: notImplemented,
        readEmitHelpers: notImplemented,
        requestEmitHelper: noop,
        resumeLexicalEnvironment: noop,
        startLexicalEnvironment: noop,
        suspendLexicalEnvironment: noop,
        addDiagnostic: noop,
    };

    // Compound nodes

    export type TypeOfTag = "undefined" | "number" | "boolean" | "string" | "symbol" | "object" | "function";

    export function createTypeCheck(value: Expression, tag: TypeOfTag) {
        return tag === "undefined"
            ? createStrictEquality(value, createVoidZero())
            : createStrictEquality(createTypeOf(value), createLiteral(tag));
    }

    export function createMemberAccessForPropertyName(target: Expression, memberName: PropertyName, location?: TextRange): MemberExpression {
        if (isComputedPropertyName(memberName)) {
            return setTextRange(createElementAccess(target, memberName.expression), location);
        }
        else {
            const expression = setTextRange(
                (isIdentifier(memberName) || isPrivateIdentifier(memberName))
                    ? createPropertyAccess(target, memberName)
                    : createElementAccess(target, memberName),
                memberName
            );
            getOrCreateEmitNode(expression).flags |= EmitFlags.NoNestedSourceMaps;
            return expression;
        }
    }

    export function createFunctionCall(func: Expression, thisArg: Expression, argumentsList: readonly Expression[], location?: TextRange) {
        return setTextRange(
            createCall(
                createPropertyAccess(func, "call"),
                /*typeArguments*/ undefined,
                [
                    thisArg,
                    ...argumentsList
                ]),
            location
        );
    }

    export function createFunctionApply(func: Expression, thisArg: Expression, argumentsExpression: Expression, location?: TextRange) {
        return setTextRange(
            createCall(
                createPropertyAccess(func, "apply"),
                /*typeArguments*/ undefined,
                [
                    thisArg,
                    argumentsExpression
                ]
            ),
            location
        );
    }

    export function createArraySlice(array: Expression, start?: number | Expression) {
        const argumentsList: Expression[] = [];
        if (start !== undefined) {
            argumentsList.push(typeof start === "number" ? createLiteral(start) : start);
        }

        return createCall(createPropertyAccess(array, "slice"), /*typeArguments*/ undefined, argumentsList);
    }

    export function createArrayConcat(array: Expression, values: readonly Expression[]) {
        return createCall(
            createPropertyAccess(array, "concat"),
            /*typeArguments*/ undefined,
            values
        );
    }

    export function createMathPow(left: Expression, right: Expression, location?: TextRange) {
        return setTextRange(
            createCall(
                createPropertyAccess(createIdentifier("Math"), "pow"),
                /*typeArguments*/ undefined,
                [left, right]
            ),
            location
        );
    }

    function createReactNamespace(reactNamespace: string, parent: JsxOpeningLikeElement | JsxOpeningFragment) {
        // To ensure the emit resolver can properly resolve the namespace, we need to
        // treat this identifier as if it were a source tree node by clearing the `Synthesized`
        // flag and setting a parent node.
        const react = createIdentifier(reactNamespace || "React");
        react.flags &= ~NodeFlags.Synthesized;
        // Set the parent that is in parse tree
        // this makes sure that parent chain is intact for checker to traverse complete scope tree
        react.parent = getParseTreeNode(parent);
        return react;
    }

    function createJsxFactoryExpressionFromEntityName(jsxFactory: EntityName, parent: JsxOpeningLikeElement | JsxOpeningFragment): Expression {
        if (isQualifiedName(jsxFactory)) {
            const left = createJsxFactoryExpressionFromEntityName(jsxFactory.left, parent);
            const right = createIdentifier(idText(jsxFactory.right));
            right.escapedText = jsxFactory.right.escapedText;
            return createPropertyAccess(left, right);
        }
        else {
            return createReactNamespace(idText(jsxFactory), parent);
        }
    }

    function createJsxFactoryExpression(jsxFactoryEntity: EntityName | undefined, reactNamespace: string, parent: JsxOpeningLikeElement | JsxOpeningFragment): Expression {
        return jsxFactoryEntity ?
            createJsxFactoryExpressionFromEntityName(jsxFactoryEntity, parent) :
            createPropertyAccess(
                createReactNamespace(reactNamespace, parent),
                "createElement"
            );
    }

    export function createExpressionForJsxElement(jsxFactoryEntity: EntityName | undefined, reactNamespace: string, tagName: Expression, props: Expression, children: readonly Expression[], parentElement: JsxOpeningLikeElement, location: TextRange): LeftHandSideExpression {
        const argumentsList = [tagName];
        if (props) {
            argumentsList.push(props);
        }

        if (children && children.length > 0) {
            if (!props) {
                argumentsList.push(createNull());
            }

            if (children.length > 1) {
                for (const child of children) {
                    startOnNewLine(child);
                    argumentsList.push(child);
                }
            }
            else {
                argumentsList.push(children[0]);
            }
        }

        return setTextRange(
            createCall(
                createJsxFactoryExpression(jsxFactoryEntity, reactNamespace, parentElement),
                /*typeArguments*/ undefined,
                argumentsList
            ),
            location
        );
    }

    export function createExpressionForJsxFragment(jsxFactoryEntity: EntityName | undefined, reactNamespace: string, children: readonly Expression[], parentElement: JsxOpeningFragment, location: TextRange): LeftHandSideExpression {
        const tagName = createPropertyAccess(
            createReactNamespace(reactNamespace, parentElement),
            "Fragment"
        );

        const argumentsList = [<Expression>tagName];
        argumentsList.push(createNull());

        if (children && children.length > 0) {
            if (children.length > 1) {
                for (const child of children) {
                    startOnNewLine(child);
                    argumentsList.push(child);
                }
            }
            else {
                argumentsList.push(children[0]);
            }
        }

        return setTextRange(
            createCall(
                createJsxFactoryExpression(jsxFactoryEntity, reactNamespace, parentElement),
                /*typeArguments*/ undefined,
                argumentsList
            ),
            location
        );
    }

    // Helpers

    /**
     * Gets an identifier for the name of an *unscoped* emit helper.
     */
    export function getUnscopedHelperName(name: string) {
        return setEmitFlags(createIdentifier(name), EmitFlags.HelperName | EmitFlags.AdviseOnEmitNode);
    }

    export const valuesHelper: UnscopedEmitHelper = {
        name: "typescript:values",
        importName: "__values",
        scoped: false,
        text: `
            var __values = (this && this.__values) || function(o) {
                var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
                if (m) return m.call(o);
                if (o && typeof o.length === "number") return {
                    next: function () {
                        if (o && i >= o.length) o = void 0;
                        return { value: o && o[i++], done: !o };
                    }
                };
                throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };`
    };

    export function createValuesHelper(context: TransformationContext, expression: Expression, location?: TextRange) {
        context.requestEmitHelper(valuesHelper);
        return setTextRange(
            createCall(
                getUnscopedHelperName("__values"),
                /*typeArguments*/ undefined,
                [expression]
            ),
            location
        );
    }

    export const readHelper: UnscopedEmitHelper = {
        name: "typescript:read",
        importName: "__read",
        scoped: false,
        text: `
            var __read = (this && this.__read) || function (o, n) {
                var m = typeof Symbol === "function" && o[Symbol.iterator];
                if (!m) return o;
                var i = m.call(o), r, ar = [], e;
                try {
                    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
                }
                catch (error) { e = { error: error }; }
                finally {
                    try {
                        if (r && !r.done && (m = i["return"])) m.call(i);
                    }
                    finally { if (e) throw e.error; }
                }
                return ar;
            };`
    };

    export function createReadHelper(context: TransformationContext, iteratorRecord: Expression, count: number | undefined, location?: TextRange) {
        context.requestEmitHelper(readHelper);
        return setTextRange(
            createCall(
                getUnscopedHelperName("__read"),
                /*typeArguments*/ undefined,
                count !== undefined
                    ? [iteratorRecord, createLiteral(count)]
                    : [iteratorRecord]
            ),
            location
        );
    }

    export const spreadHelper: UnscopedEmitHelper = {
        name: "typescript:spread",
        importName: "__spread",
        scoped: false,
        dependencies: [readHelper],
        text: `
            var __spread = (this && this.__spread) || function () {
                for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
                return ar;
            };`
    };

    export function createSpreadHelper(context: TransformationContext, argumentList: readonly Expression[], location?: TextRange) {
        context.requestEmitHelper(spreadHelper);
        return setTextRange(
            createCall(
                getUnscopedHelperName("__spread"),
                /*typeArguments*/ undefined,
                argumentList
            ),
            location
        );
    }

    export const spreadArraysHelper: UnscopedEmitHelper = {
        name: "typescript:spreadArrays",
        importName: "__spreadArrays",
        scoped: false,
        text: `
            var __spreadArrays = (this && this.__spreadArrays) || function () {
                for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
                for (var r = Array(s), k = 0, i = 0; i < il; i++)
                    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                        r[k] = a[j];
                return r;
            };`
    };

    export function createSpreadArraysHelper(context: TransformationContext, argumentList: readonly Expression[], location?: TextRange) {
        context.requestEmitHelper(spreadArraysHelper);
        return setTextRange(
            createCall(
                getUnscopedHelperName("__spreadArrays"),
                /*typeArguments*/ undefined,
                argumentList
            ),
            location
        );
    }

    // Utilities

    export function createForOfBindingStatement(node: ForInitializer, boundValue: Expression): Statement {
        if (isVariableDeclarationList(node)) {
            const firstDeclaration = first(node.declarations);
            const updatedDeclaration = updateVariableDeclaration(
                firstDeclaration,
                firstDeclaration.name,
                /*typeNode*/ undefined,
                boundValue
            );
            return setTextRange(
                createVariableStatement(
                    /*modifiers*/ undefined,
                    updateVariableDeclarationList(node, [updatedDeclaration])
                ),
                /*location*/ node
            );
        }
        else {
            const updatedExpression = setTextRange(createAssignment(node, boundValue), /*location*/ node);
            return setTextRange(createStatement(updatedExpression), /*location*/ node);
        }
    }

    export function insertLeadingStatement(dest: Statement, source: Statement) {
        if (isBlock(dest)) {
            return updateBlock(dest, setTextRange(createNodeArray([source, ...dest.statements]), dest.statements));
        }
        else {
            return createBlock(createNodeArray([dest, source]), /*multiLine*/ true);
        }
    }

    export function restoreEnclosingLabel(node: Statement, outermostLabeledStatement: LabeledStatement | undefined, afterRestoreLabelCallback?: (node: LabeledStatement) => void): Statement {
        if (!outermostLabeledStatement) {
            return node;
        }
        const updated = updateLabel(
            outermostLabeledStatement,
            outermostLabeledStatement.label,
            outermostLabeledStatement.statement.kind === SyntaxKind.LabeledStatement
                ? restoreEnclosingLabel(node, <LabeledStatement>outermostLabeledStatement.statement)
                : node
        );
        if (afterRestoreLabelCallback) {
            afterRestoreLabelCallback(outermostLabeledStatement);
        }
        return updated;
    }

    export interface CallBinding {
        target: LeftHandSideExpression;
        thisArg: Expression;
    }

    function shouldBeCapturedInTempVariable(node: Expression, cacheIdentifiers: boolean): boolean {
        const target = skipParentheses(node);
        switch (target.kind) {
            case SyntaxKind.Identifier:
                return cacheIdentifiers;
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.StringLiteral:
                return false;
            case SyntaxKind.ArrayLiteralExpression:
                const elements = (<ArrayLiteralExpression>target).elements;
                if (elements.length === 0) {
                    return false;
                }
                return true;
            case SyntaxKind.ObjectLiteralExpression:
                return (<ObjectLiteralExpression>target).properties.length > 0;
            default:
                return true;
        }
    }

    export function createCallBinding(expression: Expression, recordTempVariable: (temp: Identifier) => void, languageVersion?: ScriptTarget, cacheIdentifiers = false): CallBinding {
        const callee = skipOuterExpressions(expression, OuterExpressionKinds.All);
        let thisArg: Expression;
        let target: LeftHandSideExpression;
        if (isSuperProperty(callee)) {
            thisArg = createThis();
            target = callee;
        }
        else if (callee.kind === SyntaxKind.SuperKeyword) {
            thisArg = createThis();
            target = languageVersion! < ScriptTarget.ES2015
                ? setTextRange(createIdentifier("_super"), callee)
                : <PrimaryExpression>callee;
        }
        else if (getEmitFlags(callee) & EmitFlags.HelperName) {
            thisArg = createVoidZero();
            target = parenthesizeForAccess(callee);
        }
        else {
            switch (callee.kind) {
                case SyntaxKind.PropertyAccessExpression: {
                    if (shouldBeCapturedInTempVariable((<PropertyAccessExpression>callee).expression, cacheIdentifiers)) {
                        // for `a.b()` target is `(_a = a).b` and thisArg is `_a`
                        thisArg = createTempVariable(recordTempVariable);
                        target = createPropertyAccess(
                            setTextRange(
                                createAssignment(
                                    thisArg,
                                    (<PropertyAccessExpression>callee).expression
                                ),
                                (<PropertyAccessExpression>callee).expression
                            ),
                            (<PropertyAccessExpression>callee).name
                        );
                        setTextRange(target, callee);
                    }
                    else {
                        thisArg = (<PropertyAccessExpression>callee).expression;
                        target = <PropertyAccessExpression>callee;
                    }
                    break;
                }

                case SyntaxKind.ElementAccessExpression: {
                    if (shouldBeCapturedInTempVariable((<ElementAccessExpression>callee).expression, cacheIdentifiers)) {
                        // for `a[b]()` target is `(_a = a)[b]` and thisArg is `_a`
                        thisArg = createTempVariable(recordTempVariable);
                        target = createElementAccess(
                            setTextRange(
                                createAssignment(
                                    thisArg,
                                    (<ElementAccessExpression>callee).expression
                                ),
                                (<ElementAccessExpression>callee).expression
                            ),
                            (<ElementAccessExpression>callee).argumentExpression
                        );
                        setTextRange(target, callee);
                    }
                    else {
                        thisArg = (<ElementAccessExpression>callee).expression;
                        target = <ElementAccessExpression>callee;
                    }

                    break;
                }

                default: {
                    // for `a()` target is `a` and thisArg is `void 0`
                    thisArg = createVoidZero();
                    target = parenthesizeForAccess(expression);
                    break;
                }
            }
        }

        return { target, thisArg };
    }

    export function inlineExpressions(expressions: readonly Expression[]) {
        // Avoid deeply nested comma expressions as traversing them during emit can result in "Maximum call
        // stack size exceeded" errors.
        return expressions.length > 10
            ? createCommaList(expressions)
            : reduceLeft(expressions, createComma)!;
    }

    export function createExpressionFromEntityName(node: EntityName | Expression): Expression {
        if (isQualifiedName(node)) {
            const left = createExpressionFromEntityName(node.left);
            const right = getMutableClone(node.right);
            return setTextRange(createPropertyAccess(left, right), node);
        }
        else {
            return getMutableClone(node);
        }
    }

    export function createExpressionForPropertyName(memberName: Exclude<PropertyName, PrivateIdentifier>): Expression {
        if (isIdentifier(memberName)) {
            return createLiteral(memberName);
        }
        else if (isComputedPropertyName(memberName)) {
            return getMutableClone(memberName.expression);
        }
        else {
            return getMutableClone(memberName);
        }
    }

    export function createExpressionForObjectLiteralElementLike(node: ObjectLiteralExpression, property: ObjectLiteralElementLike, receiver: Expression): Expression | undefined {
        if (property.name && isPrivateIdentifier(property.name)) {
            Debug.failBadSyntaxKind(property.name, "Private identifiers are not allowed in object literals.");
        }
        switch (property.kind) {
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return createExpressionForAccessorDeclaration(node.properties, property as typeof property & { name: Exclude<PropertyName, PrivateIdentifier>; }, receiver, !!node.multiLine);
            case SyntaxKind.PropertyAssignment:
                return createExpressionForPropertyAssignment(property, receiver);
            case SyntaxKind.ShorthandPropertyAssignment:
                return createExpressionForShorthandPropertyAssignment(property, receiver);
            case SyntaxKind.MethodDeclaration:
                return createExpressionForMethodDeclaration(property, receiver);
        }
    }

    function createExpressionForAccessorDeclaration(properties: NodeArray<Declaration>, property: AccessorDeclaration & { name: Exclude<PropertyName, PrivateIdentifier>; }, receiver: Expression, multiLine: boolean) {
        const { firstAccessor, getAccessor, setAccessor } = getAllAccessorDeclarations(properties, property);
        if (property === firstAccessor) {
            const properties: ObjectLiteralElementLike[] = [];
            if (getAccessor) {
                const getterFunction = createFunctionExpression(
                    getAccessor.modifiers,
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    /*typeParameters*/ undefined,
                    getAccessor.parameters,
                    /*type*/ undefined,
                    getAccessor.body! // TODO: GH#18217
                );
                setTextRange(getterFunction, getAccessor);
                setOriginalNode(getterFunction, getAccessor);
                const getter = createPropertyAssignment("get", getterFunction);
                properties.push(getter);
            }

            if (setAccessor) {
                const setterFunction = createFunctionExpression(
                    setAccessor.modifiers,
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    /*typeParameters*/ undefined,
                    setAccessor.parameters,
                    /*type*/ undefined,
                    setAccessor.body! // TODO: GH#18217
                );
                setTextRange(setterFunction, setAccessor);
                setOriginalNode(setterFunction, setAccessor);
                const setter = createPropertyAssignment("set", setterFunction);
                properties.push(setter);
            }

            properties.push(createPropertyAssignment("enumerable", getAccessor || setAccessor ? createFalse() : createTrue()));
            properties.push(createPropertyAssignment("configurable", createTrue()));

            const expression = setTextRange(
                createCall(
                    createPropertyAccess(createIdentifier("Object"), "defineProperty"),
                    /*typeArguments*/ undefined,
                    [
                        receiver,
                        createExpressionForPropertyName(property.name),
                        createObjectLiteral(properties, multiLine)
                    ]
                ),
                /*location*/ firstAccessor
            );

            return aggregateTransformFlags(expression);
        }

        return undefined;
    }

    function createExpressionForPropertyAssignment(property: PropertyAssignment, receiver: Expression) {
        return aggregateTransformFlags(
            setOriginalNode(
                setTextRange(
                    createAssignment(
                        createMemberAccessForPropertyName(receiver, property.name, /*location*/ property.name),
                        property.initializer
                    ),
                    property
                ),
                property
            )
        );
    }

    function createExpressionForShorthandPropertyAssignment(property: ShorthandPropertyAssignment, receiver: Expression) {
        return aggregateTransformFlags(
            setOriginalNode(
                setTextRange(
                    createAssignment(
                        createMemberAccessForPropertyName(receiver, property.name, /*location*/ property.name),
                        getSynthesizedClone(property.name)
                    ),
                    /*location*/ property
                ),
                /*original*/ property
            )
        );
    }

    function createExpressionForMethodDeclaration(method: MethodDeclaration, receiver: Expression) {
        return aggregateTransformFlags(
            setOriginalNode(
                setTextRange(
                    createAssignment(
                        createMemberAccessForPropertyName(receiver, method.name, /*location*/ method.name),
                        setOriginalNode(
                            setTextRange(
                                createFunctionExpression(
                                    method.modifiers,
                                    method.asteriskToken,
                                    /*name*/ undefined,
                                    /*typeParameters*/ undefined,
                                    method.parameters,
                                    /*type*/ undefined,
                                    method.body! // TODO: GH#18217
                                ),
                                /*location*/ method
                            ),
                            /*original*/ method
                        )
                    ),
                    /*location*/ method
                ),
                /*original*/ method
            )
        );
    }

    /**
     * Gets the internal name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the body of an ES5 class function body. An internal name will *never*
     * be prefixed with an module or namespace export modifier like "exports." when emitted as an
     * expression. An internal name will also *never* be renamed due to a collision with a block
     * scoped variable.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getInternalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
        return getName(node, allowComments, allowSourceMaps, EmitFlags.LocalName | EmitFlags.InternalName);
    }

    /**
     * Gets whether an identifier should only be referred to by its internal name.
     */
    export function isInternalName(node: Identifier) {
        return (getEmitFlags(node) & EmitFlags.InternalName) !== 0;
    }

    /**
     * Gets the local name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the declaration's immediate scope (classes, enums, namespaces). A
     * local name will *never* be prefixed with an module or namespace export modifier like
     * "exports." when emitted as an expression.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getLocalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
        return getName(node, allowComments, allowSourceMaps, EmitFlags.LocalName);
    }

    /**
     * Gets whether an identifier should only be referred to by its local name.
     */
    export function isLocalName(node: Identifier) {
        return (getEmitFlags(node) & EmitFlags.LocalName) !== 0;
    }

    /**
     * Gets the export name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the declaration's immediate scope (classes, enums, namespaces). An
     * export name will *always* be prefixed with an module or namespace export modifier like
     * `"exports."` when emitted as an expression if the name points to an exported symbol.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getExportName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier {
        return getName(node, allowComments, allowSourceMaps, EmitFlags.ExportName);
    }

    /**
     * Gets whether an identifier should only be referred to by its export representation if the
     * name points to an exported symbol.
     */
    export function isExportName(node: Identifier) {
        return (getEmitFlags(node) & EmitFlags.ExportName) !== 0;
    }

    /**
     * Gets the name of a declaration for use in declarations.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getDeclarationName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
        return getName(node, allowComments, allowSourceMaps);
    }

    function getName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean, emitFlags: EmitFlags = 0) {
        const nodeName = getNameOfDeclaration(node);
        if (nodeName && isIdentifier(nodeName) && !isGeneratedIdentifier(nodeName)) {
            const name = getMutableClone(nodeName);
            emitFlags |= getEmitFlags(nodeName);
            if (!allowSourceMaps) emitFlags |= EmitFlags.NoSourceMap;
            if (!allowComments) emitFlags |= EmitFlags.NoComments;
            if (emitFlags) setEmitFlags(name, emitFlags);
            return name;
        }
        return getGeneratedNameForNode(node);
    }

    /**
     * Gets the exported name of a declaration for use in expressions.
     *
     * An exported name will *always* be prefixed with an module or namespace export modifier like
     * "exports." if the name points to an exported symbol.
     *
     * @param ns The namespace identifier.
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getExternalModuleOrNamespaceExportName(ns: Identifier | undefined, node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier | PropertyAccessExpression {
        if (ns && hasSyntacticModifier(node, ModifierFlags.Export)) {
            return getNamespaceMemberName(ns, getName(node), allowComments, allowSourceMaps);
        }
        return getExportName(node, allowComments, allowSourceMaps);
    }

    /**
     * Gets a namespace-qualified name for use in expressions.
     *
     * @param ns The namespace identifier.
     * @param name The name.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    export function getNamespaceMemberName(ns: Identifier, name: Identifier, allowComments?: boolean, allowSourceMaps?: boolean): PropertyAccessExpression {
        const qualifiedName = createPropertyAccess(ns, nodeIsSynthesized(name) ? name : getSynthesizedClone(name));
        setTextRange(qualifiedName, name);
        let emitFlags: EmitFlags = 0;
        if (!allowSourceMaps) emitFlags |= EmitFlags.NoSourceMap;
        if (!allowComments) emitFlags |= EmitFlags.NoComments;
        if (emitFlags) setEmitFlags(qualifiedName, emitFlags);
        return qualifiedName;
    }

    export function convertToFunctionBody(node: ConciseBody, multiLine?: boolean): Block {
        return isBlock(node) ? node : setTextRange(createBlock([setTextRange(createReturn(node), node)], multiLine), node);
    }

    export function convertFunctionDeclarationToExpression(node: FunctionDeclaration) {
        if (!node.body) return Debug.fail();
        const updated = createFunctionExpression(
            node.modifiers,
            node.asteriskToken,
            node.name,
            node.typeParameters,
            node.parameters,
            node.type,
            node.body
        );
        setOriginalNode(updated, node);
        setTextRange(updated, node);
        if (getStartsOnNewLine(node)) {
            setStartsOnNewLine(updated, /*newLine*/ true);
        }
        aggregateTransformFlags(updated);
        return updated;
    }

    function isUseStrictPrologue(node: ExpressionStatement): boolean {
        return isStringLiteral(node.expression) && node.expression.text === "use strict";
    }

    /**
     * Add any necessary prologue-directives into target statement-array.
     * The function needs to be called during each transformation step.
     * This function needs to be called whenever we transform the statement
     * list of a source file, namespace, or function-like body.
     *
     * @param target: result statements array
     * @param source: origin statements array
     * @param ensureUseStrict: boolean determining whether the function need to add prologue-directives
     * @param visitor: Optional callback used to visit any custom prologue directives.
     */
    export function addPrologue(target: Statement[], source: readonly Statement[], ensureUseStrict?: boolean, visitor?: (node: Node) => VisitResult<Node>): number {
        const offset = addStandardPrologue(target, source, ensureUseStrict);
        return addCustomPrologue(target, source, offset, visitor);
    }

    /**
     * Add just the standard (string-expression) prologue-directives into target statement-array.
     * The function needs to be called during each transformation step.
     * This function needs to be called whenever we transform the statement
     * list of a source file, namespace, or function-like body.
     */
    export function addStandardPrologue(target: Statement[], source: readonly Statement[], ensureUseStrict?: boolean): number {
        Debug.assert(target.length === 0, "Prologue directives should be at the first statement in the target statements array");
        let foundUseStrict = false;
        let statementOffset = 0;
        const numStatements = source.length;
        while (statementOffset < numStatements) {
            const statement = source[statementOffset];
            if (isPrologueDirective(statement)) {
                if (isUseStrictPrologue(statement)) {
                    foundUseStrict = true;
                }
                target.push(statement);
            }
            else {
                break;
            }
            statementOffset++;
        }
        if (ensureUseStrict && !foundUseStrict) {
            target.push(startOnNewLine(createStatement(createLiteral("use strict"))));
        }
        return statementOffset;
    }

    /**
     * Add just the custom prologue-directives into target statement-array.
     * The function needs to be called during each transformation step.
     * This function needs to be called whenever we transform the statement
     * list of a source file, namespace, or function-like body.
     */
    export function addCustomPrologue(target: Statement[], source: readonly Statement[], statementOffset: number, visitor?: (node: Node) => VisitResult<Node>, filter?: (node: Node) => boolean): number;
    export function addCustomPrologue(target: Statement[], source: readonly Statement[], statementOffset: number | undefined, visitor?: (node: Node) => VisitResult<Node>, filter?: (node: Node) => boolean): number | undefined;
    export function addCustomPrologue(target: Statement[], source: readonly Statement[], statementOffset: number | undefined, visitor?: (node: Node) => VisitResult<Node>, filter: (node: Node) => boolean = returnTrue): number | undefined {
        const numStatements = source.length;
        while (statementOffset !== undefined && statementOffset < numStatements) {
            const statement = source[statementOffset];
            if (getEmitFlags(statement) & EmitFlags.CustomPrologue && filter(statement)) {
                append(target, visitor ? visitNode(statement, visitor, isStatement) : statement);
            }
            else {
                break;
            }
            statementOffset++;
        }
        return statementOffset;
    }

    export function findUseStrictPrologue(statements: readonly Statement[]): Statement | undefined {
        for (const statement of statements) {
            if (isPrologueDirective(statement)) {
                if (isUseStrictPrologue(statement)) {
                    return statement;
                }
            }
            else {
                break;
            }
        }
        return undefined;
    }

    export function startsWithUseStrict(statements: readonly Statement[]) {
        const firstStatement = firstOrUndefined(statements);
        return firstStatement !== undefined
            && isPrologueDirective(firstStatement)
            && isUseStrictPrologue(firstStatement);
    }

    /**
     * Ensures "use strict" directive is added
     *
     * @param statements An array of statements
     */
    export function ensureUseStrict(statements: NodeArray<Statement>): NodeArray<Statement> {
        const foundUseStrict = findUseStrictPrologue(statements);

        if (!foundUseStrict) {
            return setTextRange(
                createNodeArray<Statement>([
                    startOnNewLine(createStatement(createLiteral("use strict"))),
                    ...statements
                ]),
                statements
            );
        }

        return statements;
    }

    /**
     * Wraps the operand to a BinaryExpression in parentheses if they are needed to preserve the intended
     * order of operations.
     *
     * @param binaryOperator The operator for the BinaryExpression.
     * @param operand The operand for the BinaryExpression.
     * @param isLeftSideOfBinary A value indicating whether the operand is the left side of the
     *                           BinaryExpression.
     */
    export function parenthesizeBinaryOperand(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean, leftOperand?: Expression) {
        const skipped = skipPartiallyEmittedExpressions(operand);

        // If the resulting expression is already parenthesized, we do not need to do any further processing.
        if (skipped.kind === SyntaxKind.ParenthesizedExpression) {
            return operand;
        }

        return binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary, leftOperand)
            ? createParen(operand)
            : operand;
    }

    /**
     * Determines whether the operand to a BinaryExpression needs to be parenthesized.
     *
     * @param binaryOperator The operator for the BinaryExpression.
     * @param operand The operand for the BinaryExpression.
     * @param isLeftSideOfBinary A value indicating whether the operand is the left side of the
     *                           BinaryExpression.
     */
    function binaryOperandNeedsParentheses(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean, leftOperand: Expression | undefined) {
        // If the operand has lower precedence, then it needs to be parenthesized to preserve the
        // intent of the expression. For example, if the operand is `a + b` and the operator is
        // `*`, then we need to parenthesize the operand to preserve the intended order of
        // operations: `(a + b) * x`.
        //
        // If the operand has higher precedence, then it does not need to be parenthesized. For
        // example, if the operand is `a * b` and the operator is `+`, then we do not need to
        // parenthesize to preserve the intended order of operations: `a * b + x`.
        //
        // If the operand has the same precedence, then we need to check the associativity of
        // the operator based on whether this is the left or right operand of the expression.
        //
        // For example, if `a / d` is on the right of operator `*`, we need to parenthesize
        // to preserve the intended order of operations: `x * (a / d)`
        //
        // If `a ** d` is on the left of operator `**`, we need to parenthesize to preserve
        // the intended order of operations: `(a ** b) ** c`
        const binaryOperatorPrecedence = getOperatorPrecedence(SyntaxKind.BinaryExpression, binaryOperator);
        const binaryOperatorAssociativity = getOperatorAssociativity(SyntaxKind.BinaryExpression, binaryOperator);
        const emittedOperand = skipPartiallyEmittedExpressions(operand);
        if (!isLeftSideOfBinary && operand.kind === SyntaxKind.ArrowFunction && binaryOperatorPrecedence > 3) {
            // We need to parenthesize arrow functions on the right side to avoid it being
            // parsed as parenthesized expression: `a && (() => {})`
            return true;
        }
        const operandPrecedence = getExpressionPrecedence(emittedOperand);
        switch (compareValues(operandPrecedence, binaryOperatorPrecedence)) {
            case Comparison.LessThan:
                // If the operand is the right side of a right-associative binary operation
                // and is a yield expression, then we do not need parentheses.
                if (!isLeftSideOfBinary
                    && binaryOperatorAssociativity === Associativity.Right
                    && operand.kind === SyntaxKind.YieldExpression) {
                    return false;
                }

                return true;

            case Comparison.GreaterThan:
                return false;

            case Comparison.EqualTo:
                if (isLeftSideOfBinary) {
                    // No need to parenthesize the left operand when the binary operator is
                    // left associative:
                    //  (a*b)/x    -> a*b/x
                    //  (a**b)/x   -> a**b/x
                    //
                    // Parentheses are needed for the left operand when the binary operator is
                    // right associative:
                    //  (a/b)**x   -> (a/b)**x
                    //  (a**b)**x  -> (a**b)**x
                    return binaryOperatorAssociativity === Associativity.Right;
                }
                else {
                    if (isBinaryExpression(emittedOperand)
                        && emittedOperand.operatorToken.kind === binaryOperator) {
                        // No need to parenthesize the right operand when the binary operator and
                        // operand are the same and one of the following:
                        //  x*(a*b)     => x*a*b
                        //  x|(a|b)     => x|a|b
                        //  x&(a&b)     => x&a&b
                        //  x^(a^b)     => x^a^b
                        if (operatorHasAssociativeProperty(binaryOperator)) {
                            return false;
                        }

                        // No need to parenthesize the right operand when the binary operator
                        // is plus (+) if both the left and right operands consist solely of either
                        // literals of the same kind or binary plus (+) expressions for literals of
                        // the same kind (recursively).
                        //  "a"+(1+2)       => "a"+(1+2)
                        //  "a"+("b"+"c")   => "a"+"b"+"c"
                        if (binaryOperator === SyntaxKind.PlusToken) {
                            const leftKind = leftOperand ? getLiteralKindOfBinaryPlusOperand(leftOperand) : SyntaxKind.Unknown;
                            if (isLiteralKind(leftKind) && leftKind === getLiteralKindOfBinaryPlusOperand(emittedOperand)) {
                                return false;
                            }
                        }
                    }

                    // No need to parenthesize the right operand when the operand is right
                    // associative:
                    //  x/(a**b)    -> x/a**b
                    //  x**(a**b)   -> x**a**b
                    //
                    // Parentheses are needed for the right operand when the operand is left
                    // associative:
                    //  x/(a*b)     -> x/(a*b)
                    //  x**(a/b)    -> x**(a/b)
                    const operandAssociativity = getExpressionAssociativity(emittedOperand);
                    return operandAssociativity === Associativity.Left;
                }
        }
    }

    /**
     * Determines whether a binary operator is mathematically associative.
     *
     * @param binaryOperator The binary operator.
     */
    function operatorHasAssociativeProperty(binaryOperator: SyntaxKind) {
        // The following operators are associative in JavaScript:
        //  (a*b)*c     -> a*(b*c)  -> a*b*c
        //  (a|b)|c     -> a|(b|c)  -> a|b|c
        //  (a&b)&c     -> a&(b&c)  -> a&b&c
        //  (a^b)^c     -> a^(b^c)  -> a^b^c
        //
        // While addition is associative in mathematics, JavaScript's `+` is not
        // guaranteed to be associative as it is overloaded with string concatenation.
        return binaryOperator === SyntaxKind.AsteriskToken
            || binaryOperator === SyntaxKind.BarToken
            || binaryOperator === SyntaxKind.AmpersandToken
            || binaryOperator === SyntaxKind.CaretToken;
    }

    interface BinaryPlusExpression extends BinaryExpression {
        cachedLiteralKind: SyntaxKind;
    }

    /**
     * This function determines whether an expression consists of a homogeneous set of
     * literal expressions or binary plus expressions that all share the same literal kind.
     * It is used to determine whether the right-hand operand of a binary plus expression can be
     * emitted without parentheses.
     */
    function getLiteralKindOfBinaryPlusOperand(node: Expression): SyntaxKind {
        node = skipPartiallyEmittedExpressions(node);

        if (isLiteralKind(node.kind)) {
            return node.kind;
        }

        if (node.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node).operatorToken.kind === SyntaxKind.PlusToken) {
            if ((<BinaryPlusExpression>node).cachedLiteralKind !== undefined) {
                return (<BinaryPlusExpression>node).cachedLiteralKind;
            }

            const leftKind = getLiteralKindOfBinaryPlusOperand((<BinaryExpression>node).left);
            const literalKind = isLiteralKind(leftKind) && leftKind === getLiteralKindOfBinaryPlusOperand((<BinaryExpression>node).right) ? leftKind :
                SyntaxKind.Unknown;

            (<BinaryPlusExpression>node).cachedLiteralKind = literalKind;
            return literalKind;
        }

        return SyntaxKind.Unknown;
    }

    export function parenthesizeForConditionalHead(condition: Expression) {
        const conditionalPrecedence = getOperatorPrecedence(SyntaxKind.ConditionalExpression, SyntaxKind.QuestionToken);
        const emittedCondition = skipPartiallyEmittedExpressions(condition);
        const conditionPrecedence = getExpressionPrecedence(emittedCondition);
        if (compareValues(conditionPrecedence, conditionalPrecedence) !== Comparison.GreaterThan) {
            return createParen(condition);
        }
        return condition;
    }

    export function parenthesizeSubexpressionOfConditionalExpression(e: Expression): Expression {
        // per ES grammar both 'whenTrue' and 'whenFalse' parts of conditional expression are assignment expressions
        // so in case when comma expression is introduced as a part of previous transformations
        // if should be wrapped in parens since comma operator has the lowest precedence
        const emittedExpression = skipPartiallyEmittedExpressions(e);
        return isCommaSequence(emittedExpression)
            ? createParen(e)
            : e;
    }

    /**
     *  [Per the spec](https://tc39.github.io/ecma262/#prod-ExportDeclaration), `export default` accepts _AssigmentExpression_ but
     *  has a lookahead restriction for `function`, `async function`, and `class`.
     *
     * Basically, that means we need to parenthesize in the following cases:
     *
     * - BinaryExpression of CommaToken
     * - CommaList (synthetic list of multiple comma expressions)
     * - FunctionExpression
     * - ClassExpression
     */
    export function parenthesizeDefaultExpression(e: Expression) {
        const check = skipPartiallyEmittedExpressions(e);
        let needsParens = isCommaSequence(check);
        if (!needsParens) {
            switch (getLeftmostExpression(check, /*stopAtCallExpression*/ false).kind) {
                case SyntaxKind.ClassExpression:
                case SyntaxKind.FunctionExpression:
                    needsParens = true;
            }
        }
        return needsParens ? createParen(e) : e;
    }

    /**
     * Wraps an expression in parentheses if it is needed in order to use the expression
     * as the expression of a NewExpression node.
     *
     * @param expression The Expression node.
     */
    export function parenthesizeForNew(expression: Expression): LeftHandSideExpression {
        const leftmostExpr = getLeftmostExpression(expression, /*stopAtCallExpressions*/ true);
        switch (leftmostExpr.kind) {
            case SyntaxKind.CallExpression:
                return createParen(expression);

            case SyntaxKind.NewExpression:
                return !(leftmostExpr as NewExpression).arguments
                    ? createParen(expression)
                    : <LeftHandSideExpression>expression;
        }

        return parenthesizeForAccess(expression);
    }

    /**
     * Wraps an expression in parentheses if it is needed in order to use the expression for
     * property or element access.
     *
     * @param expr The expression node.
     */
    export function parenthesizeForAccess(expression: Expression): LeftHandSideExpression {
        // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
        // to parenthesize the expression before a dot. The known exception is:
        //
        //    NewExpression:
        //       new C.x        -> not the same as (new C).x
        //
        const emittedExpression = skipPartiallyEmittedExpressions(expression);
        if (isLeftHandSideExpression(emittedExpression)
            && (emittedExpression.kind !== SyntaxKind.NewExpression || (<NewExpression>emittedExpression).arguments)) {
            return <LeftHandSideExpression>expression;
        }

        return setTextRange(createParen(expression), expression);
    }

    export function parenthesizePostfixOperand(operand: Expression) {
        return isLeftHandSideExpression(operand)
            ? operand
            : setTextRange(createParen(operand), operand);
    }

    export function parenthesizePrefixOperand(operand: Expression) {
        return isUnaryExpression(operand)
            ? operand
            : setTextRange(createParen(operand), operand);
    }

    export function parenthesizeListElements(elements: NodeArray<Expression>) {
        let result: Expression[] | undefined;
        for (let i = 0; i < elements.length; i++) {
            const element = parenthesizeExpressionForList(elements[i]);
            if (result !== undefined || element !== elements[i]) {
                if (result === undefined) {
                    result = elements.slice(0, i);
                }

                result.push(element);
            }
        }

        if (result !== undefined) {
            return setTextRange(createNodeArray(result, elements.hasTrailingComma), elements);
        }

        return elements;
    }

    export function parenthesizeExpressionForList(expression: Expression) {
        const emittedExpression = skipPartiallyEmittedExpressions(expression);
        const expressionPrecedence = getExpressionPrecedence(emittedExpression);
        const commaPrecedence = getOperatorPrecedence(SyntaxKind.BinaryExpression, SyntaxKind.CommaToken);
        return expressionPrecedence > commaPrecedence
            ? expression
            : setTextRange(createParen(expression), expression);
    }

    export function parenthesizeExpressionForExpressionStatement(expression: Expression) {
        const emittedExpression = skipPartiallyEmittedExpressions(expression);
        if (isCallExpression(emittedExpression)) {
            const callee = emittedExpression.expression;
            const kind = skipPartiallyEmittedExpressions(callee).kind;
            if (kind === SyntaxKind.FunctionExpression || kind === SyntaxKind.ArrowFunction) {
                const mutableCall = getMutableClone(emittedExpression);
                mutableCall.expression = setTextRange(createParen(callee), callee);
                return recreateOuterExpressions(expression, mutableCall, OuterExpressionKinds.PartiallyEmittedExpressions);
            }
        }

        const leftmostExpressionKind = getLeftmostExpression(emittedExpression, /*stopAtCallExpressions*/ false).kind;
        if (leftmostExpressionKind === SyntaxKind.ObjectLiteralExpression || leftmostExpressionKind === SyntaxKind.FunctionExpression) {
            return setTextRange(createParen(expression), expression);
        }

        return expression;
    }

    export function parenthesizeConditionalTypeMember(member: TypeNode) {
        return member.kind === SyntaxKind.ConditionalType ? createParenthesizedType(member) : member;
    }

    export function parenthesizeElementTypeMember(member: TypeNode) {
        switch (member.kind) {
            case SyntaxKind.UnionType:
            case SyntaxKind.IntersectionType:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return createParenthesizedType(member);
        }
        return parenthesizeConditionalTypeMember(member);
    }

    export function parenthesizeArrayTypeMember(member: TypeNode) {
        switch (member.kind) {
            case SyntaxKind.TypeQuery:
            case SyntaxKind.TypeOperator:
            case SyntaxKind.InferType:
                return createParenthesizedType(member);
        }
        return parenthesizeElementTypeMember(member);
    }

    export function parenthesizeElementTypeMembers(members: readonly TypeNode[]) {
        return createNodeArray(sameMap(members, parenthesizeElementTypeMember));
    }

    export function parenthesizeTypeParameters(typeParameters: readonly TypeNode[] | undefined) {
        if (some(typeParameters)) {
            const params: TypeNode[] = [];
            for (let i = 0; i < typeParameters.length; ++i) {
                const entry = typeParameters[i];
                params.push(i === 0 && isFunctionOrConstructorTypeNode(entry) && entry.typeParameters ?
                    createParenthesizedType(entry) :
                    entry);
            }

            return createNodeArray(params);
        }
    }

    export function getLeftmostExpression(node: Expression, stopAtCallExpressions: boolean) {
        while (true) {
            switch (node.kind) {
                case SyntaxKind.PostfixUnaryExpression:
                    node = (<PostfixUnaryExpression>node).operand;
                    continue;

                case SyntaxKind.BinaryExpression:
                    node = (<BinaryExpression>node).left;
                    continue;

                case SyntaxKind.ConditionalExpression:
                    node = (<ConditionalExpression>node).condition;
                    continue;

                case SyntaxKind.TaggedTemplateExpression:
                    node = (<TaggedTemplateExpression>node).tag;
                    continue;

                case SyntaxKind.CallExpression:
                    if (stopAtCallExpressions) {
                        return node;
                    }
                    // falls through
                case SyntaxKind.AsExpression:
                case SyntaxKind.ElementAccessExpression:
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.NonNullExpression:
                case SyntaxKind.PartiallyEmittedExpression:
                    node = (<CallExpression | PropertyAccessExpression | ElementAccessExpression | AsExpression | NonNullExpression | PartiallyEmittedExpression>node).expression;
                    continue;
            }

            return node;
        }

    }

    export function parenthesizeConciseBody(body: ConciseBody): ConciseBody {
        if (!isBlock(body) && (isCommaSequence(body) || getLeftmostExpression(body, /*stopAtCallExpressions*/ false).kind === SyntaxKind.ObjectLiteralExpression)) {
            return setTextRange(createParen(body), body);
        }

        return body;
    }

    export function isCommaSequence(node: Expression): node is BinaryExpression & {operatorToken: Token<SyntaxKind.CommaToken>} | CommaListExpression {
        return node.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node).operatorToken.kind === SyntaxKind.CommaToken ||
            node.kind === SyntaxKind.CommaListExpression;
    }

    export const enum OuterExpressionKinds {
        Parentheses = 1 << 0,
        TypeAssertions = 1 << 1,
        NonNullAssertions = 1 << 2,
        PartiallyEmittedExpressions = 1 << 3,

        Assertions = TypeAssertions | NonNullAssertions,
        All = Parentheses | Assertions | PartiallyEmittedExpressions
    }

    export type OuterExpression = ParenthesizedExpression | TypeAssertion | AsExpression | NonNullExpression | PartiallyEmittedExpression;

    export function isOuterExpression(node: Node, kinds = OuterExpressionKinds.All): node is OuterExpression {
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return (kinds & OuterExpressionKinds.Parentheses) !== 0;
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
                return (kinds & OuterExpressionKinds.TypeAssertions) !== 0;
            case SyntaxKind.NonNullExpression:
                return (kinds & OuterExpressionKinds.NonNullAssertions) !== 0;
            case SyntaxKind.PartiallyEmittedExpression:
                return (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
        }
        return false;
    }

    export function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression;
    export function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node;
    export function skipOuterExpressions(node: Node, kinds = OuterExpressionKinds.All) {
        while (isOuterExpression(node, kinds)) {
            node = node.expression;
        }
        return node;
    }

    export function skipAssertions(node: Expression): Expression;
    export function skipAssertions(node: Node): Node;
    export function skipAssertions(node: Node): Node {
        return skipOuterExpressions(node, OuterExpressionKinds.Assertions);
    }

    function updateOuterExpression(outerExpression: OuterExpression, expression: Expression) {
        switch (outerExpression.kind) {
            case SyntaxKind.ParenthesizedExpression: return updateParen(outerExpression, expression);
            case SyntaxKind.TypeAssertionExpression: return updateTypeAssertion(outerExpression, outerExpression.type, expression);
            case SyntaxKind.AsExpression: return updateAsExpression(outerExpression, expression, outerExpression.type);
            case SyntaxKind.NonNullExpression: return updateNonNullExpression(outerExpression, expression);
            case SyntaxKind.PartiallyEmittedExpression: return updatePartiallyEmittedExpression(outerExpression, expression);
        }
    }

    /**
     * Determines whether a node is a parenthesized expression that can be ignored when recreating outer expressions.
     *
     * A parenthesized expression can be ignored when all of the following are true:
     *
     * - It's `pos` and `end` are not -1
     * - It does not have a custom source map range
     * - It does not have a custom comment range
     * - It does not have synthetic leading or trailing comments
     *
     * If an outermost parenthesized expression is ignored, but the containing expression requires a parentheses around
     * the expression to maintain precedence, a new parenthesized expression should be created automatically when
     * the containing expression is created/updated.
     */
    function isIgnorableParen(node: Expression) {
        return node.kind === SyntaxKind.ParenthesizedExpression
            && nodeIsSynthesized(node)
            && nodeIsSynthesized(getSourceMapRange(node))
            && nodeIsSynthesized(getCommentRange(node))
            && !some(getSyntheticLeadingComments(node))
            && !some(getSyntheticTrailingComments(node));
    }

    export function recreateOuterExpressions(outerExpression: Expression | undefined, innerExpression: Expression, kinds = OuterExpressionKinds.All): Expression {
        if (outerExpression && isOuterExpression(outerExpression, kinds) && !isIgnorableParen(outerExpression)) {
            return updateOuterExpression(
                outerExpression,
                recreateOuterExpressions(outerExpression.expression, innerExpression)
            );
        }
        return innerExpression;
    }

    export function startOnNewLine<T extends Node>(node: T): T {
        return setStartsOnNewLine(node, /*newLine*/ true);
    }

    export function getExternalHelpersModuleName(node: SourceFile) {
        const parseNode = getOriginalNode(node, isSourceFile);
        const emitNode = parseNode && parseNode.emitNode;
        return emitNode && emitNode.externalHelpersModuleName;
    }

    export function hasRecordedExternalHelpers(sourceFile: SourceFile) {
        const parseNode = getOriginalNode(sourceFile, isSourceFile);
        const emitNode = parseNode && parseNode.emitNode;
        return !!emitNode && (!!emitNode.externalHelpersModuleName || !!emitNode.externalHelpers);
    }

    export function createExternalHelpersImportDeclarationIfNeeded(sourceFile: SourceFile, compilerOptions: CompilerOptions, hasExportStarsToExportValues?: boolean, hasImportStar?: boolean, hasImportDefault?: boolean) {
        if (compilerOptions.importHelpers && isEffectiveExternalModule(sourceFile, compilerOptions)) {
            let namedBindings: NamedImportBindings | undefined;
            const moduleKind = getEmitModuleKind(compilerOptions);
            if (moduleKind >= ModuleKind.ES2015 && moduleKind <= ModuleKind.ESNext) {
                // use named imports
                const helpers = getEmitHelpers(sourceFile);
                if (helpers) {
                    const helperNames: string[] = [];
                    for (const helper of helpers) {
                        if (!helper.scoped) {
                            const importName = (helper as UnscopedEmitHelper).importName;
                            if (importName) {
                                pushIfUnique(helperNames, importName);
                            }
                        }
                    }
                    if (some(helperNames)) {
                        helperNames.sort(compareStringsCaseSensitive);
                        // Alias the imports if the names are used somewhere in the file.
                        // NOTE: We don't need to care about global import collisions as this is a module.
                        namedBindings = createNamedImports(
                            map(helperNames, name => isFileLevelUniqueName(sourceFile, name)
                                ? createImportSpecifier(/*propertyName*/ undefined, createIdentifier(name))
                                : createImportSpecifier(createIdentifier(name), getUnscopedHelperName(name))
                            )
                        );
                        const parseNode = getOriginalNode(sourceFile, isSourceFile);
                        const emitNode = getOrCreateEmitNode(parseNode);
                        emitNode.externalHelpers = true;
                    }
                }
            }
            else {
                // use a namespace import
                const externalHelpersModuleName = getOrCreateExternalHelpersModuleNameIfNeeded(sourceFile, compilerOptions, hasExportStarsToExportValues, hasImportStar || hasImportDefault);
                if (externalHelpersModuleName) {
                    namedBindings = createNamespaceImport(externalHelpersModuleName);
                }
            }
            if (namedBindings) {
                const externalHelpersImportDeclaration = createImportDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    createImportClause(/*name*/ undefined, namedBindings),
                    createLiteral(externalHelpersModuleNameText)
                );
                addEmitFlags(externalHelpersImportDeclaration, EmitFlags.NeverApplyImportHelper);
                return externalHelpersImportDeclaration;
            }
        }
    }

    export function getOrCreateExternalHelpersModuleNameIfNeeded(node: SourceFile, compilerOptions: CompilerOptions, hasExportStarsToExportValues?: boolean, hasImportStarOrImportDefault?: boolean) {
        if (compilerOptions.importHelpers && isEffectiveExternalModule(node, compilerOptions)) {
            const externalHelpersModuleName = getExternalHelpersModuleName(node);
            if (externalHelpersModuleName) {
                return externalHelpersModuleName;
            }

            const moduleKind = getEmitModuleKind(compilerOptions);
            let create = (hasExportStarsToExportValues || (compilerOptions.esModuleInterop && hasImportStarOrImportDefault))
                && moduleKind !== ModuleKind.System
                && moduleKind < ModuleKind.ES2015;
            if (!create) {
                const helpers = getEmitHelpers(node);
                if (helpers) {
                    for (const helper of helpers) {
                        if (!helper.scoped) {
                            create = true;
                            break;
                        }
                    }
                }
            }

            if (create) {
                const parseNode = getOriginalNode(node, isSourceFile);
                const emitNode = getOrCreateEmitNode(parseNode);
                return emitNode.externalHelpersModuleName || (emitNode.externalHelpersModuleName = createUniqueName(externalHelpersModuleNameText));
            }
        }
    }

    /**
     * Get the name of that target module from an import or export declaration
     */
    export function getLocalNameForExternalImport(node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, sourceFile: SourceFile): Identifier | undefined {
        const namespaceDeclaration = getNamespaceDeclarationNode(node);
        if (namespaceDeclaration && !isDefaultImport(node)) {
            const name = namespaceDeclaration.name;
            return isGeneratedIdentifier(name) ? name : createIdentifier(getSourceTextOfNodeFromSourceFile(sourceFile, name) || idText(name));
        }
        if (node.kind === SyntaxKind.ImportDeclaration && node.importClause) {
            return getGeneratedNameForNode(node);
        }
        if (node.kind === SyntaxKind.ExportDeclaration && node.moduleSpecifier) {
            return getGeneratedNameForNode(node);
        }
        return undefined;
    }

    /**
     * Get the name of a target module from an import/export declaration as should be written in the emitted output.
     * The emitted output name can be different from the input if:
     *  1. The module has a /// <amd-module name="<new name>" />
     *  2. --out or --outFile is used, making the name relative to the rootDir
     *  3- The containing SourceFile has an entry in renamedDependencies for the import as requested by some module loaders (e.g. System).
     * Otherwise, a new StringLiteral node representing the module name will be returned.
     */
    export function getExternalModuleNameLiteral(importNode: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, sourceFile: SourceFile, host: EmitHost, resolver: EmitResolver, compilerOptions: CompilerOptions) {
        const moduleName = getExternalModuleName(importNode)!; // TODO: GH#18217
        if (moduleName.kind === SyntaxKind.StringLiteral) {
            return tryGetModuleNameFromDeclaration(importNode, host, resolver, compilerOptions)
                || tryRenameExternalModule(<StringLiteral>moduleName, sourceFile)
                || getSynthesizedClone(<StringLiteral>moduleName);
        }

        return undefined;
    }

    /**
     * Some bundlers (SystemJS builder) sometimes want to rename dependencies.
     * Here we check if alternative name was provided for a given moduleName and return it if possible.
     */
    function tryRenameExternalModule(moduleName: LiteralExpression, sourceFile: SourceFile) {
        const rename = sourceFile.renamedDependencies && sourceFile.renamedDependencies.get(moduleName.text);
        return rename && createLiteral(rename);
    }

    /**
     * Get the name of a module as should be written in the emitted output.
     * The emitted output name can be different from the input if:
     *  1. The module has a /// <amd-module name="<new name>" />
     *  2. --out or --outFile is used, making the name relative to the rootDir
     * Otherwise, a new StringLiteral node representing the module name will be returned.
     */
    export function tryGetModuleNameFromFile(file: SourceFile | undefined, host: EmitHost, options: CompilerOptions): StringLiteral | undefined {
        if (!file) {
            return undefined;
        }
        if (file.moduleName) {
            return createLiteral(file.moduleName);
        }
        if (!file.isDeclarationFile && outFile(options)) {
            return createLiteral(getExternalModuleNameFromPath(host, file.fileName));
        }
        return undefined;
    }

    function tryGetModuleNameFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration, host: EmitHost, resolver: EmitResolver, compilerOptions: CompilerOptions) {
        return tryGetModuleNameFromFile(resolver.getExternalModuleFileFromDeclaration(declaration), host, compilerOptions);
    }

    /**
     * Gets the initializer of an BindingOrAssignmentElement.
     */
    export function getInitializerOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): Expression | undefined {
        if (isDeclarationBindingElement(bindingElement)) {
            // `1` in `let { a = 1 } = ...`
            // `1` in `let { a: b = 1 } = ...`
            // `1` in `let { a: {b} = 1 } = ...`
            // `1` in `let { a: [b] = 1 } = ...`
            // `1` in `let [a = 1] = ...`
            // `1` in `let [{a} = 1] = ...`
            // `1` in `let [[a] = 1] = ...`
            return bindingElement.initializer;
        }

        if (isPropertyAssignment(bindingElement)) {
            // `1` in `({ a: b = 1 } = ...)`
            // `1` in `({ a: {b} = 1 } = ...)`
            // `1` in `({ a: [b] = 1 } = ...)`
            const initializer = bindingElement.initializer;
            return isAssignmentExpression(initializer, /*excludeCompoundAssignment*/ true)
                ? initializer.right
                : undefined;
        }

        if (isShorthandPropertyAssignment(bindingElement)) {
            // `1` in `({ a = 1 } = ...)`
            return bindingElement.objectAssignmentInitializer;
        }

        if (isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
            // `1` in `[a = 1] = ...`
            // `1` in `[{a} = 1] = ...`
            // `1` in `[[a] = 1] = ...`
            return bindingElement.right;
        }

        if (isSpreadElement(bindingElement)) {
            // Recovery consistent with existing emit.
            return getInitializerOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.expression);
        }
    }

    /**
     * Gets the name of an BindingOrAssignmentElement.
     */
    export function getTargetOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): BindingOrAssignmentElementTarget | undefined {
        if (isDeclarationBindingElement(bindingElement)) {
            // `a` in `let { a } = ...`
            // `a` in `let { a = 1 } = ...`
            // `b` in `let { a: b } = ...`
            // `b` in `let { a: b = 1 } = ...`
            // `a` in `let { ...a } = ...`
            // `{b}` in `let { a: {b} } = ...`
            // `{b}` in `let { a: {b} = 1 } = ...`
            // `[b]` in `let { a: [b] } = ...`
            // `[b]` in `let { a: [b] = 1 } = ...`
            // `a` in `let [a] = ...`
            // `a` in `let [a = 1] = ...`
            // `a` in `let [...a] = ...`
            // `{a}` in `let [{a}] = ...`
            // `{a}` in `let [{a} = 1] = ...`
            // `[a]` in `let [[a]] = ...`
            // `[a]` in `let [[a] = 1] = ...`
            return bindingElement.name;
        }

        if (isObjectLiteralElementLike(bindingElement)) {
            switch (bindingElement.kind) {
                case SyntaxKind.PropertyAssignment:
                    // `b` in `({ a: b } = ...)`
                    // `b` in `({ a: b = 1 } = ...)`
                    // `{b}` in `({ a: {b} } = ...)`
                    // `{b}` in `({ a: {b} = 1 } = ...)`
                    // `[b]` in `({ a: [b] } = ...)`
                    // `[b]` in `({ a: [b] = 1 } = ...)`
                    // `b.c` in `({ a: b.c } = ...)`
                    // `b.c` in `({ a: b.c = 1 } = ...)`
                    // `b[0]` in `({ a: b[0] } = ...)`
                    // `b[0]` in `({ a: b[0] = 1 } = ...)`
                    return getTargetOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.initializer);

                case SyntaxKind.ShorthandPropertyAssignment:
                    // `a` in `({ a } = ...)`
                    // `a` in `({ a = 1 } = ...)`
                    return bindingElement.name;

                case SyntaxKind.SpreadAssignment:
                    // `a` in `({ ...a } = ...)`
                    return getTargetOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.expression);
            }

            // no target
            return undefined;
        }

        if (isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
            // `a` in `[a = 1] = ...`
            // `{a}` in `[{a} = 1] = ...`
            // `[a]` in `[[a] = 1] = ...`
            // `a.b` in `[a.b = 1] = ...`
            // `a[0]` in `[a[0] = 1] = ...`
            return getTargetOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.left);
        }

        if (isSpreadElement(bindingElement)) {
            // `a` in `[...a] = ...`
            return getTargetOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.expression);
        }

        // `a` in `[a] = ...`
        // `{a}` in `[{a}] = ...`
        // `[a]` in `[[a]] = ...`
        // `a.b` in `[a.b] = ...`
        // `a[0]` in `[a[0]] = ...`
        return bindingElement;
    }

    /**
     * Determines whether an BindingOrAssignmentElement is a rest element.
     */
    export function getRestIndicatorOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): BindingOrAssignmentElementRestIndicator | undefined {
        switch (bindingElement.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
                // `...` in `let [...a] = ...`
                return bindingElement.dotDotDotToken;

            case SyntaxKind.SpreadElement:
            case SyntaxKind.SpreadAssignment:
                // `...` in `[...a] = ...`
                return bindingElement;
        }

        return undefined;
    }

    /**
     * Gets the property name of a BindingOrAssignmentElement
     */
    export function getPropertyNameOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): Exclude<PropertyName, PrivateIdentifier> | undefined {
        const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(bindingElement);
        Debug.assert(!!propertyName || isSpreadAssignment(bindingElement), "Invalid property name for binding element.");
        return propertyName;
    }

    export function tryGetPropertyNameOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): Exclude<PropertyName, PrivateIdentifier> | undefined {
        switch (bindingElement.kind) {
            case SyntaxKind.BindingElement:
                // `a` in `let { a: b } = ...`
                // `[a]` in `let { [a]: b } = ...`
                // `"a"` in `let { "a": b } = ...`
                // `1` in `let { 1: b } = ...`
                if (bindingElement.propertyName) {
                    const propertyName = bindingElement.propertyName;
                    if (isPrivateIdentifier(propertyName)) {
                        return Debug.failBadSyntaxKind(propertyName);
                    }
                    return isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression)
                        ? propertyName.expression
                        : propertyName;
                }

                break;

            case SyntaxKind.PropertyAssignment:
                // `a` in `({ a: b } = ...)`
                // `[a]` in `({ [a]: b } = ...)`
                // `"a"` in `({ "a": b } = ...)`
                // `1` in `({ 1: b } = ...)`
                if (bindingElement.name) {
                    const propertyName = bindingElement.name;
                    if (isPrivateIdentifier(propertyName)) {
                        return Debug.failBadSyntaxKind(propertyName);
                    }
                    return isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression)
                        ? propertyName.expression
                        : propertyName;
                }

                break;

            case SyntaxKind.SpreadAssignment:
                // `a` in `({ ...a } = ...)`
                if (bindingElement.name && isPrivateIdentifier(bindingElement.name)) {
                    return Debug.failBadSyntaxKind(bindingElement.name);
                }
                return bindingElement.name;
        }

        const target = getTargetOfBindingOrAssignmentElement(bindingElement);
        if (target && isPropertyName(target)) {
            return target;
        }
    }

    function isStringOrNumericLiteral(node: Node): node is StringLiteral | NumericLiteral {
        const kind = node.kind;
        return kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.NumericLiteral;
    }

    /**
     * Gets the elements of a BindingOrAssignmentPattern
     */
    export function getElementsOfBindingOrAssignmentPattern(name: BindingOrAssignmentPattern): readonly BindingOrAssignmentElement[] {
        switch (name.kind) {
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ArrayLiteralExpression:
                // `a` in `{a}`
                // `a` in `[a]`
                return <readonly BindingOrAssignmentElement[]>name.elements;

            case SyntaxKind.ObjectLiteralExpression:
                // `a` in `{a}`
                return <readonly BindingOrAssignmentElement[]>name.properties;
        }
    }

    export function convertToArrayAssignmentElement(element: BindingOrAssignmentElement) {
        if (isBindingElement(element)) {
            if (element.dotDotDotToken) {
                Debug.assertNode(element.name, isIdentifier);
                return setOriginalNode(setTextRange(createSpread(element.name), element), element);
            }
            const expression = convertToAssignmentElementTarget(element.name);
            return element.initializer
                ? setOriginalNode(
                    setTextRange(
                        createAssignment(expression, element.initializer),
                        element
                    ),
                    element
                )
                : expression;
        }
        Debug.assertNode(element, isExpression);
        return <Expression>element;
    }

    export function convertToObjectAssignmentElement(element: BindingOrAssignmentElement) {
        if (isBindingElement(element)) {
            if (element.dotDotDotToken) {
                Debug.assertNode(element.name, isIdentifier);
                return setOriginalNode(setTextRange(createSpreadAssignment(element.name), element), element);
            }
            if (element.propertyName) {
                const expression = convertToAssignmentElementTarget(element.name);
                return setOriginalNode(setTextRange(createPropertyAssignment(element.propertyName, element.initializer ? createAssignment(expression, element.initializer) : expression), element), element);
            }
            Debug.assertNode(element.name, isIdentifier);
            return setOriginalNode(setTextRange(createShorthandPropertyAssignment(element.name, element.initializer), element), element);
        }
        Debug.assertNode(element, isObjectLiteralElementLike);
        return <ObjectLiteralElementLike>element;
    }

    export function convertToAssignmentPattern(node: BindingOrAssignmentPattern): AssignmentPattern {
        switch (node.kind) {
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ArrayLiteralExpression:
                return convertToArrayAssignmentPattern(node);

            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ObjectLiteralExpression:
                return convertToObjectAssignmentPattern(node);
        }
    }

    export function convertToObjectAssignmentPattern(node: ObjectBindingOrAssignmentPattern) {
        if (isObjectBindingPattern(node)) {
            return setOriginalNode(
                setTextRange(
                    createObjectLiteral(map(node.elements, convertToObjectAssignmentElement)),
                    node
                ),
                node
            );
        }
        Debug.assertNode(node, isObjectLiteralExpression);
        return node;
    }

    export function convertToArrayAssignmentPattern(node: ArrayBindingOrAssignmentPattern) {
        if (isArrayBindingPattern(node)) {
            return setOriginalNode(
                setTextRange(
                    createArrayLiteral(map(node.elements, convertToArrayAssignmentElement)),
                    node
                ),
                node
            );
        }
        Debug.assertNode(node, isArrayLiteralExpression);
        return node;
    }

    export function convertToAssignmentElementTarget(node: BindingOrAssignmentElementTarget): Expression {
        if (isBindingPattern(node)) {
            return convertToAssignmentPattern(node);
        }

        Debug.assertNode(node, isExpression);
        return node;
    }
}
