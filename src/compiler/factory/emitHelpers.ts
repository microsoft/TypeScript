import {
    __String,
    ArrayLiteralExpression,
    BindingOrAssignmentElement,
    Block,
    compareValues,
    Comparison,
    createExpressionFromEntityName,
    Debug,
    EmitFlags,
    EmitHelper,
    EmitHelperUniqueNameCallback,
    EmitNode,
    EntityName,
    Expression,
    FunctionExpression,
    GeneratedIdentifierFlags,
    getEmitFlags,
    getEmitScriptTarget,
    getPropertyNameOfBindingOrAssignmentElement,
    Identifier,
    InternalEmitFlags,
    isCallExpression,
    isComputedPropertyName,
    isIdentifier,
    JsxEmit,
    memoize,
    ObjectLiteralElementLike,
    ParameterDeclaration,
    PrivateIdentifier,
    ScriptTarget,
    setEmitFlags,
    setInternalEmitFlags,
    setTextRange,
    SyntaxKind,
    TextRange,
    TransformationContext,
    UnscopedEmitHelper,
} from "../_namespaces/ts.js";

/** @internal */
export const enum PrivateIdentifierKind {
    Field = "f",
    Method = "m",
    Accessor = "a",
}

/**
 * Describes the decorator context object passed to a native ECMAScript decorator for a class.
 *
 * @internal
 */
export interface ESDecorateClassContext {
    /**
     * The kind of the decorated element.
     */
    kind: "class";

    /**
     * The name of the decorated element.
     */
    name: Expression;

    metadata: Expression;
}

/**
 * Describes the decorator context object passed to a native ECMAScript decorator for a class element.
 *
 * @internal
 */
export interface ESDecorateClassElementContext {
    /**
     * The kind of the decorated element.
     */
    kind: "method" | "getter" | "setter" | "accessor" | "field";
    name: ESDecorateName;
    static: boolean;
    private: boolean;
    access: ESDecorateClassElementAccess;
    metadata: Expression;
}

/** @internal */
export interface ESDecorateClassElementAccess {
    get?: boolean;
    set?: boolean;
}

/** @internal */
export type ESDecorateName =
    | { computed: true; name: Expression; }
    | { computed: false; name: Identifier | PrivateIdentifier; };

/** @internal */
export type ESDecorateContext =
    | ESDecorateClassContext
    | ESDecorateClassElementContext;

/** @internal */
export interface EmitHelperFactory {
    getUnscopedHelperName(name: string): Identifier;
    // TypeScript Helpers
    createDecorateHelper(decoratorExpressions: readonly Expression[], target: Expression, memberName?: Expression, descriptor?: Expression): Expression;
    createMetadataHelper(metadataKey: string, metadataValue: Expression): Expression;
    createParamHelper(expression: Expression, parameterOffset: number): Expression;
    // ES Decorators Helpers
    createESDecorateHelper(ctor: Expression, descriptorIn: Expression, decorators: Expression, contextIn: ESDecorateContext, initializers: Expression, extraInitializers: Expression): Expression;
    createRunInitializersHelper(thisArg: Expression, initializers: Expression, value?: Expression): Expression;
    // ES2018 Helpers
    createAssignHelper(attributesSegments: readonly Expression[]): Expression;
    createAwaitHelper(expression: Expression): Expression;
    createAsyncGeneratorHelper(generatorFunc: FunctionExpression, hasLexicalThis: boolean): Expression;
    createAsyncDelegatorHelper(expression: Expression): Expression;
    createAsyncValuesHelper(expression: Expression): Expression;
    // ES2018 Destructuring Helpers
    createRestHelper(value: Expression, elements: readonly BindingOrAssignmentElement[], computedTempVariables: readonly Expression[] | undefined, location: TextRange): Expression;
    // ES2017 Helpers
    createAwaiterHelper(hasLexicalThis: boolean, argumentsExpression: Expression | undefined, promiseConstructor: EntityName | Expression | undefined, parameters: readonly ParameterDeclaration[] | undefined, body: Block): Expression;
    // ES2015 Helpers
    createExtendsHelper(name: Identifier): Expression;
    createTemplateObjectHelper(cooked: ArrayLiteralExpression, raw: ArrayLiteralExpression): Expression;
    createSpreadArrayHelper(to: Expression, from: Expression, packFrom: boolean): Expression;
    createPropKeyHelper(expr: Expression): Expression;
    createSetFunctionNameHelper(f: Expression, name: Expression, prefix?: string): Expression;
    // ES2015 Destructuring Helpers
    createValuesHelper(expression: Expression): Expression;
    createReadHelper(iteratorRecord: Expression, count: number | undefined): Expression;
    // ES2015 Generator Helpers
    createGeneratorHelper(body: FunctionExpression): Expression;
    // ES Module Helpers
    createImportStarHelper(expression: Expression): Expression;
    createImportStarCallbackHelper(): Expression;
    createImportDefaultHelper(expression: Expression): Expression;
    createExportStarHelper(moduleExpression: Expression, exportsExpression?: Expression): Expression;
    // Class Fields Helpers
    createClassPrivateFieldGetHelper(receiver: Expression, state: Identifier, kind: PrivateIdentifierKind, f: Identifier | undefined): Expression;
    createClassPrivateFieldSetHelper(receiver: Expression, state: Identifier, value: Expression, kind: PrivateIdentifierKind, f: Identifier | undefined): Expression;
    createClassPrivateFieldInHelper(state: Identifier, receiver: Expression): Expression;
    // 'using' helpers
    createAddDisposableResourceHelper(envBinding: Expression, value: Expression, async: boolean): Expression;
    createDisposeResourcesHelper(envBinding: Expression): Expression;
    // --rewriteRelativeImportExtensions helpers
    createRewriteRelativeImportExtensionsHelper(expression: Expression): Expression;
}

/** @internal */
export function createEmitHelperFactory(context: TransformationContext): EmitHelperFactory {
    const factory = context.factory;
    const immutableTrue = memoize(() => setInternalEmitFlags(factory.createTrue(), InternalEmitFlags.Immutable));
    const immutableFalse = memoize(() => setInternalEmitFlags(factory.createFalse(), InternalEmitFlags.Immutable));

    return {
        getUnscopedHelperName,
        // TypeScript Helpers
        createDecorateHelper,
        createMetadataHelper,
        createParamHelper,
        // ES Decorators Helpers
        createESDecorateHelper,
        createRunInitializersHelper,
        // ES2018 Helpers
        createAssignHelper,
        createAwaitHelper,
        createAsyncGeneratorHelper,
        createAsyncDelegatorHelper,
        createAsyncValuesHelper,
        // ES2018 Destructuring Helpers
        createRestHelper,
        // ES2017 Helpers
        createAwaiterHelper,
        // ES2015 Helpers
        createExtendsHelper,
        createTemplateObjectHelper,
        createSpreadArrayHelper,
        createPropKeyHelper,
        createSetFunctionNameHelper,
        // ES2015 Destructuring Helpers
        createValuesHelper,
        createReadHelper,
        // ES2015 Generator Helpers
        createGeneratorHelper,
        // ES Module Helpers
        createImportStarHelper,
        createImportStarCallbackHelper,
        createImportDefaultHelper,
        createExportStarHelper,
        // Class Fields Helpers
        createClassPrivateFieldGetHelper,
        createClassPrivateFieldSetHelper,
        createClassPrivateFieldInHelper,
        // 'using' helpers
        createAddDisposableResourceHelper,
        createDisposeResourcesHelper,
        // --rewriteRelativeImportExtensions helpers
        createRewriteRelativeImportExtensionsHelper,
    };

    /**
     * Gets an identifier for the name of an *unscoped* emit helper.
     */
    function getUnscopedHelperName(name: string) {
        return setEmitFlags(factory.createIdentifier(name), EmitFlags.HelperName | EmitFlags.AdviseOnEmitNode);
    }

    // TypeScript Helpers

    function createDecorateHelper(decoratorExpressions: Expression[], target: Expression, memberName?: Expression, descriptor?: Expression) {
        context.requestEmitHelper(decorateHelper);

        const argumentsArray: Expression[] = [];
        argumentsArray.push(factory.createArrayLiteralExpression(decoratorExpressions, /*multiLine*/ true));
        argumentsArray.push(target);
        if (memberName) {
            argumentsArray.push(memberName);
            if (descriptor) {
                argumentsArray.push(descriptor);
            }
        }

        return factory.createCallExpression(
            getUnscopedHelperName("__decorate"),
            /*typeArguments*/ undefined,
            argumentsArray,
        );
    }

    function createMetadataHelper(metadataKey: string, metadataValue: Expression) {
        context.requestEmitHelper(metadataHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__metadata"),
            /*typeArguments*/ undefined,
            [
                factory.createStringLiteral(metadataKey),
                metadataValue,
            ],
        );
    }

    function createParamHelper(expression: Expression, parameterOffset: number, location?: TextRange) {
        context.requestEmitHelper(paramHelper);
        return setTextRange(
            factory.createCallExpression(
                getUnscopedHelperName("__param"),
                /*typeArguments*/ undefined,
                [
                    factory.createNumericLiteral(parameterOffset + ""),
                    expression,
                ],
            ),
            location,
        );
    }

    // ES Decorators Helpers

    function createESDecorateClassContextObject(contextIn: ESDecorateClassContext) {
        const properties = [
            factory.createPropertyAssignment(factory.createIdentifier("kind"), factory.createStringLiteral("class")),
            factory.createPropertyAssignment(factory.createIdentifier("name"), contextIn.name),
            factory.createPropertyAssignment(factory.createIdentifier("metadata"), contextIn.metadata),
        ];

        return factory.createObjectLiteralExpression(properties);
    }

    function createESDecorateClassElementAccessGetMethod(elementName: ESDecorateName) {
        const accessor = elementName.computed ?
            factory.createElementAccessExpression(factory.createIdentifier("obj"), elementName.name) :
            factory.createPropertyAccessExpression(factory.createIdentifier("obj"), elementName.name);

        return factory.createPropertyAssignment(
            "get",
            factory.createArrowFunction(
                /*modifiers*/ undefined,
                /*typeParameters*/ undefined,
                [factory.createParameterDeclaration(
                    /*modifiers*/ undefined,
                    /*dotDotDotToken*/ undefined,
                    factory.createIdentifier("obj"),
                )],
                /*type*/ undefined,
                /*equalsGreaterThanToken*/ undefined,
                accessor,
            ),
        );
    }

    function createESDecorateClassElementAccessSetMethod(elementName: ESDecorateName) {
        const accessor = elementName.computed ?
            factory.createElementAccessExpression(factory.createIdentifier("obj"), elementName.name) :
            factory.createPropertyAccessExpression(factory.createIdentifier("obj"), elementName.name);

        return factory.createPropertyAssignment(
            "set",
            factory.createArrowFunction(
                /*modifiers*/ undefined,
                /*typeParameters*/ undefined,
                [
                    factory.createParameterDeclaration(
                        /*modifiers*/ undefined,
                        /*dotDotDotToken*/ undefined,
                        factory.createIdentifier("obj"),
                    ),
                    factory.createParameterDeclaration(
                        /*modifiers*/ undefined,
                        /*dotDotDotToken*/ undefined,
                        factory.createIdentifier("value"),
                    ),
                ],
                /*type*/ undefined,
                /*equalsGreaterThanToken*/ undefined,
                factory.createBlock([
                    factory.createExpressionStatement(
                        factory.createAssignment(
                            accessor,
                            factory.createIdentifier("value"),
                        ),
                    ),
                ]),
            ),
        );
    }

    function createESDecorateClassElementAccessHasMethod(elementName: ESDecorateName) {
        const propertyName = elementName.computed ? elementName.name :
            isIdentifier(elementName.name) ? factory.createStringLiteralFromNode(elementName.name) :
            elementName.name;

        return factory.createPropertyAssignment(
            "has",
            factory.createArrowFunction(
                /*modifiers*/ undefined,
                /*typeParameters*/ undefined,
                [factory.createParameterDeclaration(
                    /*modifiers*/ undefined,
                    /*dotDotDotToken*/ undefined,
                    factory.createIdentifier("obj"),
                )],
                /*type*/ undefined,
                /*equalsGreaterThanToken*/ undefined,
                factory.createBinaryExpression(
                    propertyName,
                    SyntaxKind.InKeyword,
                    factory.createIdentifier("obj"),
                ),
            ),
        );
    }

    function createESDecorateClassElementAccessObject(name: ESDecorateName, access: ESDecorateClassElementAccess) {
        const properties: ObjectLiteralElementLike[] = [];
        properties.push(createESDecorateClassElementAccessHasMethod(name));
        if (access.get) properties.push(createESDecorateClassElementAccessGetMethod(name));
        if (access.set) properties.push(createESDecorateClassElementAccessSetMethod(name));
        return factory.createObjectLiteralExpression(properties);
    }

    function createESDecorateClassElementContextObject(contextIn: ESDecorateClassElementContext) {
        const properties = [
            factory.createPropertyAssignment(factory.createIdentifier("kind"), factory.createStringLiteral(contextIn.kind)),
            factory.createPropertyAssignment(factory.createIdentifier("name"), contextIn.name.computed ? contextIn.name.name : factory.createStringLiteralFromNode(contextIn.name.name)),
            factory.createPropertyAssignment(factory.createIdentifier("static"), contextIn.static ? factory.createTrue() : factory.createFalse()),
            factory.createPropertyAssignment(factory.createIdentifier("private"), contextIn.private ? factory.createTrue() : factory.createFalse()),
            factory.createPropertyAssignment(factory.createIdentifier("access"), createESDecorateClassElementAccessObject(contextIn.name, contextIn.access)),
            factory.createPropertyAssignment(factory.createIdentifier("metadata"), contextIn.metadata),
        ];
        return factory.createObjectLiteralExpression(properties);
    }

    function createESDecorateContextObject(contextIn: ESDecorateContext) {
        return contextIn.kind === "class" ? createESDecorateClassContextObject(contextIn) :
            createESDecorateClassElementContextObject(contextIn);
    }

    function createESDecorateHelper(ctor: Expression, descriptorIn: Expression, decorators: Expression, contextIn: ESDecorateContext, initializers: Expression, extraInitializers: Expression) {
        context.requestEmitHelper(esDecorateHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__esDecorate"),
            /*typeArguments*/ undefined,
            [
                ctor ?? factory.createNull(),
                descriptorIn ?? factory.createNull(),
                decorators,
                createESDecorateContextObject(contextIn),
                initializers,
                extraInitializers,
            ],
        );
    }

    function createRunInitializersHelper(thisArg: Expression, initializers: Expression, value?: Expression) {
        context.requestEmitHelper(runInitializersHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__runInitializers"),
            /*typeArguments*/ undefined,
            value ? [thisArg, initializers, value] : [thisArg, initializers],
        );
    }
    // ES2018 Helpers

    function createAssignHelper(attributesSegments: Expression[]) {
        if (getEmitScriptTarget(context.getCompilerOptions()) >= ScriptTarget.ES2015) {
            return factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("Object"), "assign"), /*typeArguments*/ undefined, attributesSegments);
        }
        context.requestEmitHelper(assignHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__assign"),
            /*typeArguments*/ undefined,
            attributesSegments,
        );
    }

    function createAwaitHelper(expression: Expression) {
        context.requestEmitHelper(awaitHelper);
        return factory.createCallExpression(getUnscopedHelperName("__await"), /*typeArguments*/ undefined, [expression]);
    }

    function createAsyncGeneratorHelper(generatorFunc: FunctionExpression, hasLexicalThis: boolean) {
        context.requestEmitHelper(awaitHelper);
        context.requestEmitHelper(asyncGeneratorHelper);

        // Mark this node as originally an async function
        (generatorFunc.emitNode || (generatorFunc.emitNode = {} as EmitNode)).flags |= EmitFlags.AsyncFunctionBody | EmitFlags.ReuseTempVariableScope;

        return factory.createCallExpression(
            getUnscopedHelperName("__asyncGenerator"),
            /*typeArguments*/ undefined,
            [
                hasLexicalThis ? factory.createThis() : factory.createVoidZero(),
                factory.createIdentifier("arguments"),
                generatorFunc,
            ],
        );
    }

    function createAsyncDelegatorHelper(expression: Expression) {
        context.requestEmitHelper(awaitHelper);
        context.requestEmitHelper(asyncDelegator);
        return factory.createCallExpression(
            getUnscopedHelperName("__asyncDelegator"),
            /*typeArguments*/ undefined,
            [expression],
        );
    }

    function createAsyncValuesHelper(expression: Expression) {
        context.requestEmitHelper(asyncValues);
        return factory.createCallExpression(
            getUnscopedHelperName("__asyncValues"),
            /*typeArguments*/ undefined,
            [expression],
        );
    }

    // ES2018 Destructuring Helpers

    /** Given value: o, propName: p, pattern: { a, b, ...p } from the original statement
     * `{ a, b, ...p } = o`, create `p = __rest(o, ["a", "b"]);`
     */
    function createRestHelper(value: Expression, elements: readonly BindingOrAssignmentElement[], computedTempVariables: readonly Expression[] | undefined, location: TextRange): Expression {
        context.requestEmitHelper(restHelper);
        const propertyNames: Expression[] = [];
        let computedTempVariableOffset = 0;
        for (let i = 0; i < elements.length - 1; i++) {
            const propertyName = getPropertyNameOfBindingOrAssignmentElement(elements[i]);
            if (propertyName) {
                if (isComputedPropertyName(propertyName)) {
                    Debug.assertIsDefined(computedTempVariables, "Encountered computed property name but 'computedTempVariables' argument was not provided.");
                    const temp = computedTempVariables[computedTempVariableOffset];
                    computedTempVariableOffset++;
                    // typeof _tmp === "symbol" ? _tmp : _tmp + ""
                    propertyNames.push(
                        factory.createConditionalExpression(
                            factory.createTypeCheck(temp, "symbol"),
                            /*questionToken*/ undefined,
                            temp,
                            /*colonToken*/ undefined,
                            factory.createAdd(temp, factory.createStringLiteral("")),
                        ),
                    );
                }
                else {
                    propertyNames.push(factory.createStringLiteralFromNode(propertyName));
                }
            }
        }
        return factory.createCallExpression(
            getUnscopedHelperName("__rest"),
            /*typeArguments*/ undefined,
            [
                value,
                setTextRange(
                    factory.createArrayLiteralExpression(propertyNames),
                    location,
                ),
            ],
        );
    }

    // ES2017 Helpers

    function createAwaiterHelper(hasLexicalThis: boolean, argumentsExpression: Expression | undefined, promiseConstructor: EntityName | Expression | undefined, parameters: readonly ParameterDeclaration[], body: Block) {
        context.requestEmitHelper(awaiterHelper);

        const generatorFunc = factory.createFunctionExpression(
            /*modifiers*/ undefined,
            factory.createToken(SyntaxKind.AsteriskToken),
            /*name*/ undefined,
            /*typeParameters*/ undefined,
            parameters ?? [],
            /*type*/ undefined,
            body,
        );

        // Mark this node as originally an async function
        (generatorFunc.emitNode || (generatorFunc.emitNode = {} as EmitNode)).flags |= EmitFlags.AsyncFunctionBody | EmitFlags.ReuseTempVariableScope;

        return factory.createCallExpression(
            getUnscopedHelperName("__awaiter"),
            /*typeArguments*/ undefined,
            [
                hasLexicalThis ? factory.createThis() : factory.createVoidZero(),
                argumentsExpression ?? factory.createVoidZero(),
                promiseConstructor ? createExpressionFromEntityName(factory, promiseConstructor) : factory.createVoidZero(),
                generatorFunc,
            ],
        );
    }

    // ES2015 Helpers

    function createExtendsHelper(name: Identifier) {
        context.requestEmitHelper(extendsHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__extends"),
            /*typeArguments*/ undefined,
            [name, factory.createUniqueName("_super", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)],
        );
    }

    function createTemplateObjectHelper(cooked: ArrayLiteralExpression, raw: ArrayLiteralExpression) {
        context.requestEmitHelper(templateObjectHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__makeTemplateObject"),
            /*typeArguments*/ undefined,
            [cooked, raw],
        );
    }

    function createSpreadArrayHelper(to: Expression, from: Expression, packFrom: boolean) {
        context.requestEmitHelper(spreadArrayHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__spreadArray"),
            /*typeArguments*/ undefined,
            [to, from, packFrom ? immutableTrue() : immutableFalse()],
        );
    }

    function createPropKeyHelper(expr: Expression) {
        context.requestEmitHelper(propKeyHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__propKey"),
            /*typeArguments*/ undefined,
            [expr],
        );
    }

    function createSetFunctionNameHelper(f: Expression, name: Expression, prefix?: string): Expression {
        context.requestEmitHelper(setFunctionNameHelper);
        return context.factory.createCallExpression(
            getUnscopedHelperName("__setFunctionName"),
            /*typeArguments*/ undefined,
            prefix ? [f, name, context.factory.createStringLiteral(prefix)] : [f, name],
        );
    }

    // ES2015 Destructuring Helpers

    function createValuesHelper(expression: Expression) {
        context.requestEmitHelper(valuesHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__values"),
            /*typeArguments*/ undefined,
            [expression],
        );
    }

    function createReadHelper(iteratorRecord: Expression, count: number | undefined) {
        context.requestEmitHelper(readHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__read"),
            /*typeArguments*/ undefined,
            count !== undefined
                ? [iteratorRecord, factory.createNumericLiteral(count + "")]
                : [iteratorRecord],
        );
    }

    // ES2015 Generator Helpers

    function createGeneratorHelper(body: FunctionExpression) {
        context.requestEmitHelper(generatorHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__generator"),
            /*typeArguments*/ undefined,
            [factory.createThis(), body],
        );
    }

    // ES Module Helpers

    function createImportStarHelper(expression: Expression) {
        context.requestEmitHelper(importStarHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__importStar"),
            /*typeArguments*/ undefined,
            [expression],
        );
    }

    function createImportStarCallbackHelper() {
        context.requestEmitHelper(importStarHelper);
        return getUnscopedHelperName("__importStar");
    }

    function createImportDefaultHelper(expression: Expression) {
        context.requestEmitHelper(importDefaultHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__importDefault"),
            /*typeArguments*/ undefined,
            [expression],
        );
    }

    function createExportStarHelper(moduleExpression: Expression, exportsExpression: Expression = factory.createIdentifier("exports")) {
        context.requestEmitHelper(exportStarHelper);
        context.requestEmitHelper(createBindingHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__exportStar"),
            /*typeArguments*/ undefined,
            [moduleExpression, exportsExpression],
        );
    }

    // Class Fields Helpers

    function createClassPrivateFieldGetHelper(receiver: Expression, state: Identifier, kind: PrivateIdentifierKind, f: Identifier | undefined) {
        context.requestEmitHelper(classPrivateFieldGetHelper);
        let args;
        if (!f) {
            args = [receiver, state, factory.createStringLiteral(kind)];
        }
        else {
            args = [receiver, state, factory.createStringLiteral(kind), f];
        }
        return factory.createCallExpression(getUnscopedHelperName("__classPrivateFieldGet"), /*typeArguments*/ undefined, args);
    }

    function createClassPrivateFieldSetHelper(receiver: Expression, state: Identifier, value: Expression, kind: PrivateIdentifierKind, f: Identifier | undefined) {
        context.requestEmitHelper(classPrivateFieldSetHelper);
        let args;
        if (!f) {
            args = [receiver, state, value, factory.createStringLiteral(kind)];
        }
        else {
            args = [receiver, state, value, factory.createStringLiteral(kind), f];
        }
        return factory.createCallExpression(getUnscopedHelperName("__classPrivateFieldSet"), /*typeArguments*/ undefined, args);
    }

    function createClassPrivateFieldInHelper(state: Identifier, receiver: Expression) {
        context.requestEmitHelper(classPrivateFieldInHelper);
        return factory.createCallExpression(getUnscopedHelperName("__classPrivateFieldIn"), /*typeArguments*/ undefined, [state, receiver]);
    }

    function createAddDisposableResourceHelper(envBinding: Expression, value: Expression, async: boolean): Expression {
        context.requestEmitHelper(addDisposableResourceHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__addDisposableResource"),
            /*typeArguments*/ undefined,
            [envBinding, value, async ? factory.createTrue() : factory.createFalse()],
        );
    }

    function createDisposeResourcesHelper(envBinding: Expression) {
        context.requestEmitHelper(disposeResourcesHelper);
        return factory.createCallExpression(getUnscopedHelperName("__disposeResources"), /*typeArguments*/ undefined, [envBinding]);
    }

    function createRewriteRelativeImportExtensionsHelper(expression: Expression) {
        context.requestEmitHelper(rewriteRelativeImportExtensionsHelper);
        return factory.createCallExpression(
            getUnscopedHelperName("__rewriteRelativeImportExtension"),
            /*typeArguments*/ undefined,
            context.getCompilerOptions().jsx === JsxEmit.Preserve
                ? [expression, factory.createTrue()]
                : [expression],
        );
    }
}

/** @internal */
export function compareEmitHelpers(x: EmitHelper, y: EmitHelper): Comparison {
    if (x === y) return Comparison.EqualTo;
    if (x.priority === y.priority) return Comparison.EqualTo;
    if (x.priority === undefined) return Comparison.GreaterThan;
    if (y.priority === undefined) return Comparison.LessThan;
    return compareValues(x.priority, y.priority);
}

/**
 * @param input Template string input strings
 * @param args Names which need to be made file-level unique
 */
function helperString(input: TemplateStringsArray, ...args: string[]) {
    return (uniqueName: EmitHelperUniqueNameCallback) => {
        let result = "";
        for (let i = 0; i < args.length; i++) {
            result += input[i];
            result += uniqueName(args[i]);
        }
        result += input[input.length - 1];
        return result;
    };
}

// TypeScript Helpers

const decorateHelper: UnscopedEmitHelper = {
    name: "typescript:decorate",
    importName: "__decorate",
    scoped: false,
    priority: 2,
    text: `
            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };`,
};

const metadataHelper: UnscopedEmitHelper = {
    name: "typescript:metadata",
    importName: "__metadata",
    scoped: false,
    priority: 3,
    text: `
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };`,
};

const paramHelper: UnscopedEmitHelper = {
    name: "typescript:param",
    importName: "__param",
    scoped: false,
    priority: 4,
    text: `
            var __param = (this && this.__param) || function (paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); }
            };`,
};

// ES Decorators Helpers
const esDecorateHelper: UnscopedEmitHelper = {
    name: "typescript:esDecorate",
    importName: "__esDecorate",
    scoped: false,
    priority: 2,
    text: `
        var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
            function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
            var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
            var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
            var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
            var _, done = false;
            for (var i = decorators.length - 1; i >= 0; i--) {
                var context = {};
                for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
                for (var p in contextIn.access) context.access[p] = contextIn.access[p];
                context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
                var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
                if (kind === "accessor") {
                    if (result === void 0) continue;
                    if (result === null || typeof result !== "object") throw new TypeError("Object expected");
                    if (_ = accept(result.get)) descriptor.get = _;
                    if (_ = accept(result.set)) descriptor.set = _;
                    if (_ = accept(result.init)) initializers.unshift(_);
                }
                else if (_ = accept(result)) {
                    if (kind === "field") initializers.unshift(_);
                    else descriptor[key] = _;
                }
            }
            if (target) Object.defineProperty(target, contextIn.name, descriptor);
            done = true;
        };`,
};

const runInitializersHelper: UnscopedEmitHelper = {
    name: "typescript:runInitializers",
    importName: "__runInitializers",
    scoped: false,
    priority: 2,
    text: `
        var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
            var useValue = arguments.length > 2;
            for (var i = 0; i < initializers.length; i++) {
                value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
            }
            return useValue ? value : void 0;
        };`,
};

// ES2018 Helpers

const assignHelper: UnscopedEmitHelper = {
    name: "typescript:assign",
    importName: "__assign",
    scoped: false,
    priority: 1,
    text: `
            var __assign = (this && this.__assign) || function () {
                __assign = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };`,
};

const awaitHelper: UnscopedEmitHelper = {
    name: "typescript:await",
    importName: "__await",
    scoped: false,
    text: `
            var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }`,
};

const asyncGeneratorHelper: UnscopedEmitHelper = {
    name: "typescript:asyncGenerator",
    importName: "__asyncGenerator",
    scoped: false,
    dependencies: [awaitHelper],
    text: `
        var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var g = generator.apply(thisArg, _arguments || []), i, q = [];
            return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
            function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
            function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
            function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
            function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
            function fulfill(value) { resume("next", value); }
            function reject(value) { resume("throw", value); }
            function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
        };`,
};

const asyncDelegator: UnscopedEmitHelper = {
    name: "typescript:asyncDelegator",
    importName: "__asyncDelegator",
    scoped: false,
    dependencies: [awaitHelper],
    text: `
            var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
                var i, p;
                return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
                function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
            };`,
};

const asyncValues: UnscopedEmitHelper = {
    name: "typescript:asyncValues",
    importName: "__asyncValues",
    scoped: false,
    text: `
            var __asyncValues = (this && this.__asyncValues) || function (o) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var m = o[Symbol.asyncIterator], i;
                return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
                function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
                function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
            };`,
};

// ES2018 Destructuring Helpers

const restHelper: UnscopedEmitHelper = {
    name: "typescript:rest",
    importName: "__rest",
    scoped: false,
    text: `
            var __rest = (this && this.__rest) || function (s, e) {
                var t = {};
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                    t[p] = s[p];
                if (s != null && typeof Object.getOwnPropertySymbols === "function")
                    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                            t[p[i]] = s[p[i]];
                    }
                return t;
            };`,
};

// ES2017 Helpers

const awaiterHelper: UnscopedEmitHelper = {
    name: "typescript:awaiter",
    importName: "__awaiter",
    scoped: false,
    priority: 5,
    text: `
            var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };`,
};

// ES2015 Helpers

const extendsHelper: UnscopedEmitHelper = {
    name: "typescript:extends",
    importName: "__extends",
    scoped: false,
    priority: 0,
    text: `
            var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d, b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
                    return extendStatics(d, b);
                };

                return function (d, b) {
                    if (typeof b !== "function" && b !== null)
                        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    extendStatics(d, b);
                    function __() { this.constructor = d; }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            })();`,
};

const templateObjectHelper: UnscopedEmitHelper = {
    name: "typescript:makeTemplateObject",
    importName: "__makeTemplateObject",
    scoped: false,
    priority: 0,
    text: `
            var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
                if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
                return cooked;
            };`,
};

const readHelper: UnscopedEmitHelper = {
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
            };`,
};

const spreadArrayHelper: UnscopedEmitHelper = {
    name: "typescript:spreadArray",
    importName: "__spreadArray",
    scoped: false,
    text: `
            var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
                if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
                    if (ar || !(i in from)) {
                        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                        ar[i] = from[i];
                    }
                }
                return to.concat(ar || Array.prototype.slice.call(from));
            };`,
};

const propKeyHelper: UnscopedEmitHelper = {
    name: "typescript:propKey",
    importName: "__propKey",
    scoped: false,
    text: `
        var __propKey = (this && this.__propKey) || function (x) {
            return typeof x === "symbol" ? x : "".concat(x);
        };`,
};

// https://tc39.es/ecma262/#sec-setfunctionname
const setFunctionNameHelper: UnscopedEmitHelper = {
    name: "typescript:setFunctionName",
    importName: "__setFunctionName",
    scoped: false,
    text: `
        var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
            if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
            return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
        };`,
};

// ES2015 Destructuring Helpers

const valuesHelper: UnscopedEmitHelper = {
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
            };`,
};

// ES2015 Generator Helpers

// The __generator helper is used by down-level transformations to emulate the runtime
// semantics of an ES2015 generator function. When called, this helper returns an
// object that implements the Iterator protocol, in that it has `next`, `return`, and
// `throw` methods that step through the generator when invoked.
//
// parameters:
//  @param thisArg  The value to use as the `this` binding for the transformed generator body.
//  @param body     A function that acts as the transformed generator body.
//
// variables:
//  _       Persistent state for the generator that is shared between the helper and the
//          generator body. The state object has the following members:
//            sent() - A method that returns or throws the current completion value.
//            label  - The next point at which to resume evaluation of the generator body.
//            trys   - A stack of protected regions (try/catch/finally blocks).
//            ops    - A stack of pending instructions when inside of a finally block.
//  f       A value indicating whether the generator is executing.
//  y       An iterator to delegate for a yield*.
//  t       A temporary variable that holds one of the following values (note that these
//          cases do not overlap):
//          - The completion value when resuming from a `yield` or `yield*`.
//          - The error value for a catch block.
//          - The current protected region (array of try/catch/finally/end labels).
//          - The verb (`next`, `throw`, or `return` method) to delegate to the expression
//            of a `yield*`.
//          - The result of evaluating the verb delegated to the expression of a `yield*`.
//  g       A temporary variable that holds onto the generator object until the generator
//          is started, allowing it to also act as the `suspendedStart` state.
//
// functions:
//  verb(n)     Creates a bound callback to the `step` function for opcode `n`.
//  step(op)    Evaluates opcodes in a generator body until execution is suspended or
//              completed.
//
// The __generator helper understands a limited set of instructions:
//  0: next(value?)     - Start or resume the generator with the specified value.
//  1: throw(error)     - Resume the generator with an exception. If the generator is
//                        suspended inside of one or more protected regions, evaluates
//                        any intervening finally blocks between the current label and
//                        the nearest catch block or function boundary. If uncaught, the
//                        exception is thrown to the caller.
//  2: return(value?)   - Resume the generator as if with a return. If the generator is
//                        suspended inside of one or more protected regions, evaluates any
//                        intervening finally blocks.
//  3: break(label)     - Jump to the specified label. If the label is outside of the
//                        current protected region, evaluates any intervening finally
//                        blocks.
//  4: yield(value?)    - Yield execution to the caller with an optional value. When
//                        resumed, the generator will continue at the next label.
//  5: yield*(value)    - Delegates evaluation to the supplied iterator. When
//                        delegation completes, the generator will continue at the next
//                        label.
//  6: catch(error)     - Handles an exception thrown from within the generator body. If
//                        the current label is inside of one or more protected regions,
//                        evaluates any intervening finally blocks between the current
//                        label and the nearest catch block or function boundary. If
//                        uncaught, the exception is thrown to the caller.
//  7: endfinally       - Ends a finally block, resuming the last instruction prior to
//                        entering a finally block.
//
// For examples of how these are used, see the comments in ./transformers/generators.ts
const generatorHelper: UnscopedEmitHelper = {
    name: "typescript:generator",
    importName: "__generator",
    scoped: false,
    priority: 6,
    text: `
            var __generator = (this && this.__generator) || function (thisArg, body) {
                var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
                return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
                function verb(n) { return function (v) { return step([n, v]); }; }
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (g && (g = 0, op[0] && (_ = 0)), _) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0: case 1: t = op; break;
                            case 4: _.label++; return { value: op[1], done: false };
                            case 5: _.label++; y = op[1]; op = [0]; continue;
                            case 7: op = _.ops.pop(); _.trys.pop(); continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                                if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                                if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                                if (t[2]) _.ops.pop();
                                _.trys.pop(); continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
                }
            };`,
};

// ES Module Helpers

const createBindingHelper: UnscopedEmitHelper = {
    name: "typescript:commonjscreatebinding",
    importName: "__createBinding",
    scoped: false,
    priority: 1,
    text: `
            var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
                if (k2 === undefined) k2 = k;
                var desc = Object.getOwnPropertyDescriptor(m, k);
                if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = { enumerable: true, get: function() { return m[k]; } };
                }
                Object.defineProperty(o, k2, desc);
            }) : (function(o, m, k, k2) {
                if (k2 === undefined) k2 = k;
                o[k2] = m[k];
            }));`,
};

const setModuleDefaultHelper: UnscopedEmitHelper = {
    name: "typescript:commonjscreatevalue",
    importName: "__setModuleDefault",
    scoped: false,
    priority: 1,
    text: `
            var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
                Object.defineProperty(o, "default", { enumerable: true, value: v });
            }) : function(o, v) {
                o["default"] = v;
            });`,
};

// emit helper for `import * as Name from "foo"`
const importStarHelper: UnscopedEmitHelper = {
    name: "typescript:commonjsimportstar",
    importName: "__importStar",
    scoped: false,
    dependencies: [createBindingHelper, setModuleDefaultHelper],
    priority: 2,
    text: `
            var __importStar = (this && this.__importStar) || (function () {
                var ownKeys = function(o) {
                    ownKeys = Object.getOwnPropertyNames || function (o) {
                        var ar = [];
                        for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
                        return ar;
                    };
                    return ownKeys(o);
                };
                return function (mod) {
                    if (mod && mod.__esModule) return mod;
                    var result = {};
                    if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
                    __setModuleDefault(result, mod);
                    return result;
                };
            })();`,
};

// emit helper for `import Name from "foo"`
const importDefaultHelper: UnscopedEmitHelper = {
    name: "typescript:commonjsimportdefault",
    importName: "__importDefault",
    scoped: false,
    text: `
            var __importDefault = (this && this.__importDefault) || function (mod) {
                return (mod && mod.__esModule) ? mod : { "default": mod };
            };`,
};

const exportStarHelper: UnscopedEmitHelper = {
    name: "typescript:export-star",
    importName: "__exportStar",
    scoped: false,
    dependencies: [createBindingHelper],
    priority: 2,
    text: `
            var __exportStar = (this && this.__exportStar) || function(m, exports) {
                for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
            };`,
};

/**
 * Parameters:
 *  @param receiver — The object from which the private member will be read.
 *  @param state — One of the following:
 *      - A WeakMap used to read a private instance field.
 *      - A WeakSet used as an instance brand for private instance methods and accessors.
 *      - A function value that should be the undecorated class constructor used to brand check private static fields, methods, and accessors.
 *  @param kind — (optional pre TS 4.3, required for TS 4.3+) One of the following values:
 *      - undefined — Indicates a private instance field (pre TS 4.3).
 *      - "f" — Indicates a private field (instance or static).
 *      - "m" — Indicates a private method (instance or static).
 *      - "a" — Indicates a private accessor (instance or static).
 *  @param f — (optional pre TS 4.3) Depends on the arguments for state and kind:
 *      - If kind is "m", this should be the function corresponding to the static or instance method.
 *      - If kind is "a", this should be the function corresponding to the getter method, or undefined if the getter was not defined.
 *      - If kind is "f" and state is a function, this should be an object holding the value of a static field, or undefined if the static field declaration has not yet been evaluated.
 * Usage:
 * This helper will only ever be used by the compiler in the following ways:
 *
 * Reading from a private instance field (pre TS 4.3):
 *      __classPrivateFieldGet(<any>, <WeakMap>)
 *
 * Reading from a private instance field (TS 4.3+):
 *      __classPrivateFieldGet(<any>, <WeakMap>, "f")
 *
 * Reading from a private instance get accessor (when defined, TS 4.3+):
 *      __classPrivateFieldGet(<any>, <WeakSet>, "a", <function>)
 *
 * Reading from a private instance get accessor (when not defined, TS 4.3+):
 *      __classPrivateFieldGet(<any>, <WeakSet>, "a", void 0)
 *      NOTE: This always results in a runtime error.
 *
 * Reading from a private instance method (TS 4.3+):
 *      __classPrivateFieldGet(<any>, <WeakSet>, "m", <function>)
 *
 * Reading from a private static field (TS 4.3+):
 *      __classPrivateFieldGet(<any>, <constructor>, "f", <{ value: any }>)
 *
 * Reading from a private static get accessor (when defined, TS 4.3+):
 *      __classPrivateFieldGet(<any>, <constructor>, "a", <function>)
 *
 * Reading from a private static get accessor (when not defined, TS 4.3+):
 *      __classPrivateFieldGet(<any>, <constructor>, "a", void 0)
 *      NOTE: This always results in a runtime error.
 *
 * Reading from a private static method (TS 4.3+):
 *      __classPrivateFieldGet(<any>, <constructor>, "m", <function>)
 */
const classPrivateFieldGetHelper: UnscopedEmitHelper = {
    name: "typescript:classPrivateFieldGet",
    importName: "__classPrivateFieldGet",
    scoped: false,
    text: `
            var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
                if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
                if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
            };`,
};

/**
 * Parameters:
 *  @param receiver — The object on which the private member will be set.
 *  @param state — One of the following:
 *      - A WeakMap used to store a private instance field.
 *      - A WeakSet used as an instance brand for private instance methods and accessors.
 *      - A function value that should be the undecorated class constructor used to brand check private static fields, methods, and accessors.
 *  @param value — The value to set.
 *  @param kind — (optional pre TS 4.3, required for TS 4.3+) One of the following values:
 *       - undefined — Indicates a private instance field (pre TS 4.3).
 *       - "f" — Indicates a private field (instance or static).
 *       - "m" — Indicates a private method (instance or static).
 *       - "a" — Indicates a private accessor (instance or static).
 *   @param f — (optional pre TS 4.3) Depends on the arguments for state and kind:
 *       - If kind is "m", this should be the function corresponding to the static or instance method.
 *       - If kind is "a", this should be the function corresponding to the setter method, or undefined if the setter was not defined.
 *       - If kind is "f" and state is a function, this should be an object holding the value of a static field, or undefined if the static field declaration has not yet been evaluated.
 * Usage:
 * This helper will only ever be used by the compiler in the following ways:
 *
 * Writing to a private instance field (pre TS 4.3):
 *      __classPrivateFieldSet(<any>, <WeakMap>, <any>)
 *
 * Writing to a private instance field (TS 4.3+):
 *      __classPrivateFieldSet(<any>, <WeakMap>, <any>, "f")
 *
 * Writing to a private instance set accessor (when defined, TS 4.3+):
 *      __classPrivateFieldSet(<any>, <WeakSet>, <any>, "a", <function>)
 *
 * Writing to a private instance set accessor (when not defined, TS 4.3+):
 *      __classPrivateFieldSet(<any>, <WeakSet>, <any>, "a", void 0)
 *      NOTE: This always results in a runtime error.
 *
 * Writing to a private instance method (TS 4.3+):
 *      __classPrivateFieldSet(<any>, <WeakSet>, <any>, "m", <function>)
 *      NOTE: This always results in a runtime error.
 *
 * Writing to a private static field (TS 4.3+):
 *      __classPrivateFieldSet(<any>, <constructor>, <any>, "f", <{ value: any }>)
 *
 * Writing to a private static set accessor (when defined, TS 4.3+):
 *      __classPrivateFieldSet(<any>, <constructor>, <any>, "a", <function>)
 *
 * Writing to a private static set accessor (when not defined, TS 4.3+):
 *      __classPrivateFieldSet(<any>, <constructor>, <any>, "a", void 0)
 *      NOTE: This always results in a runtime error.
 *
 * Writing to a private static method (TS 4.3+):
 *      __classPrivateFieldSet(<any>, <constructor>, <any>, "m", <function>)
 *      NOTE: This always results in a runtime error.
 */
const classPrivateFieldSetHelper: UnscopedEmitHelper = {
    name: "typescript:classPrivateFieldSet",
    importName: "__classPrivateFieldSet",
    scoped: false,
    text: `
            var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
                if (kind === "m") throw new TypeError("Private method is not writable");
                if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
                if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
            };`,
};

/**
 * Parameters:
 *  @param state — One of the following:
 *      - A WeakMap when the member is a private instance field.
 *      - A WeakSet when the member is a private instance method or accessor.
 *      - A function value that should be the undecorated class constructor when the member is a private static field, method, or accessor.
 *  @param receiver — The object being checked if it has the private member.
 *
 * Usage:
 * This helper is used to transform `#field in expression` to
 *      `__classPrivateFieldIn(<weakMap/weakSet/constructor>, expression)`
 */
const classPrivateFieldInHelper: UnscopedEmitHelper = {
    name: "typescript:classPrivateFieldIn",
    importName: "__classPrivateFieldIn",
    scoped: false,
    text: `
            var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
                if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
                return typeof state === "function" ? receiver === state : state.has(receiver);
            };`,
};

const addDisposableResourceHelper: UnscopedEmitHelper = {
    name: "typescript:addDisposableResource",
    importName: "__addDisposableResource",
    scoped: false,
    text: `
        var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
            if (value !== null && value !== void 0) {
                if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
                var dispose, inner;
                if (async) {
                    if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
                    dispose = value[Symbol.asyncDispose];
                }
                if (dispose === void 0) {
                    if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
                    dispose = value[Symbol.dispose];
                    if (async) inner = dispose;
                }
                if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
                if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
                env.stack.push({ value: value, dispose: dispose, async: async });
            }
            else if (async) {
                env.stack.push({ async: true });
            }
            return value;
        };`,
};

/**
 * The `s` variable represents two boolean flags from the `DisposeResources` algorithm:
 * - `needsAwait` (`1`) — Indicates that an `await using` for a `null` or `undefined` resource was encountered.
 * - `hasAwaited` (`2`) — Indicates that the algorithm has performed an Await.
 */
const disposeResourcesHelper: UnscopedEmitHelper = {
    name: "typescript:disposeResources",
    importName: "__disposeResources",
    scoped: false,
    text: `
        var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
            return function (env) {
                function fail(e) {
                    env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
                    env.hasError = true;
                }
                var r, s = 0;
                function next() {
                    while (r = env.stack.pop()) {
                        try {
                            if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                            if (r.dispose) {
                                var result = r.dispose.call(r.value);
                                if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                            }
                            else s |= 1;
                        }
                        catch (e) {
                            fail(e);
                        }
                    }
                    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
                    if (env.hasError) throw env.error;
                }
                return next();
            };
        })(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
            var e = new Error(message);
            return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
        });`,
};

const rewriteRelativeImportExtensionsHelper: UnscopedEmitHelper = {
    name: "typescript:rewriteRelativeImportExtensions",
    importName: "__rewriteRelativeImportExtension",
    scoped: false,
    text: `
        var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
            if (typeof path === "string" && /^\\.\\.?\\//.test(path)) {
                return path.replace(/\\.(tsx)$|((?:\\.d)?)((?:\\.[^./]+?)?)\\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
                    return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
                });
            }
            return path;
        };`,
};

/** @internal */
export const asyncSuperHelper: EmitHelper = {
    name: "typescript:async-super",
    scoped: true,
    text: helperString`
            const ${"_superIndex"} = name => super[name];`,
};

/** @internal */
export const advancedAsyncSuperHelper: EmitHelper = {
    name: "typescript:advanced-async-super",
    scoped: true,
    text: helperString`
            const ${"_superIndex"} = (function (geti, seti) {
                const cache = Object.create(null);
                return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
            })(name => super[name], (name, value) => super[name] = value);`,
};

/** @internal */
export function isCallToHelper(firstSegment: Expression, helperName: __String): boolean {
    return isCallExpression(firstSegment)
        && isIdentifier(firstSegment.expression)
        && (getEmitFlags(firstSegment.expression) & EmitFlags.HelperName) !== 0
        && firstSegment.expression.escapedText === helperName;
}
