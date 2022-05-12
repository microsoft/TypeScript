// DEPRECATION: Deprecate passing `decorators` separate from `modifiers`
// DEPRECATION PLAN:
//     - soft: 4.8
//     - warn: 4.9
//     - error: 5.0
namespace ts {
    export interface Node {
        /** @deprecated `decorators` has been merged with `modifiers` on the declarations that support decorators. */
        readonly decorators?: readonly Decorator[] | undefined;

        /** @deprecated `modifiers` has been removed from `Node` and moved to the specific `Node` subtypes that support them. */
        readonly modifiers?: NodeArray<ModifierLike> | undefined;
    }

    export interface PropertySignature {
        /** @deprecated A property signature cannot have an initializer */
        readonly initializer?: undefined;
    }

    export interface PropertyAssignment {
        /** @deprecated A property assignment cannot have a question token */
        readonly questionToken?: undefined;

        /** @deprecated A property assignment cannot have an exclamation token */
        readonly exclamationToken?: undefined;
    }

    export interface ShorthandPropertyAssignment {
        /** @deprecated A shorthand property assignment cannot have a question token */
        readonly questionToken?: undefined;

        /** @deprecated A shorthand property assignment cannot have an exclamation token */
        readonly exclamationToken?: undefined;

        /** @deprecated A shorthand property assignment cannot have modifiers */
        readonly modifiers?: undefined;
    }

    export interface NodeFactory {
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createParameterDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateParameterDeclaration(node: ParameterDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createPropertyDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updatePropertyDeclaration(node: PropertyDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createMethodDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateMethodDeclaration(node: MethodDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createConstructorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateConstructorDeclaration(node: ConstructorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createGetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateGetAccessorDeclaration(node: GetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createSetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateSetAccessorDeclaration(node: SetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateIndexSignature(node: IndexSignatureDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createClassStaticBlockDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createClassExpression(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateClassExpression(node: ClassExpression, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createFunctionDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateFunctionDeclaration(node: FunctionDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createClassDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateClassDeclaration(node: ClassDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createInterfaceDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateInterfaceDeclaration(node: InterfaceDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createTypeAliasDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateTypeAliasDeclaration(node: TypeAliasDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createEnumDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateEnumDeclaration(node: EnumDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createModuleDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateModuleDeclaration(node: ModuleDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createImportEqualsDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateImportEqualsDeclaration(node: ImportEqualsDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createImportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause): ImportDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateImportDeclaration(node: ImportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createExportAssignment(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateExportAssignment(node: ExportAssignment, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, assertClause?: AssertClause): ExportDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should pass
         * `null` to the `decorators` parameter so that a future update can introduce
         * an overload that removes the parameter entirely.
         */
        updateExportDeclaration(node: ExportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, assertClause: AssertClause | undefined): ExportDeclaration;

    }

    const functions = [
        { create: "createParameterDeclaration", update: "updateParameterDeclaration", mode: "must-merge" },
        { create: "createPropertyDeclaration", update: "updatePropertyDeclaration", mode: "must-merge" },
        { create: "createMethodDeclaration", update: "updateMethodDeclaration", mode: "must-merge" },
        { create: "createConstructorDeclaration", update: "updateConstructorDeclaration", mode: "disallow-decorators" },
        { create: "createGetAccessorDeclaration", update: "updateGetAccessorDeclaration", mode: "must-merge" },
        { create: "createSetAccessorDeclaration", update: "updateSetAccessorDeclaration", mode: "must-merge" },
        { create: "createIndexSignature", update: "updateIndexSignature", mode: "disallow-decorators" },
        { create: "createClassStaticBlockDeclaration", update: "updateClassStaticBlockDeclaration", mode: "disallow-decorators-and-modifiers" },
        { create: "createClassExpression", update: "updateClassExpression", mode: "must-merge" },
        { create: "createFunctionDeclaration", update: "updateFunctionDeclaration", mode: "disallow-decorators" },
        { create: "createClassDeclaration", update: "updateClassDeclaration", mode: "must-merge" },
        { create: "createInterfaceDeclaration", update: "updateInterfaceDeclaration", mode: "disallow-decorators" },
        { create: "createTypeAliasDeclaration", update: "updateTypeAliasDeclaration", mode: "disallow-decorators" },
        { create: "createEnumDeclaration", update: "updateEnumDeclaration", mode: "disallow-decorators" },
        { create: "createModuleDeclaration", update: "updateModuleDeclaration", mode: "disallow-decorators" },
        { create: "createImportEqualsDeclaration", update: "updateImportEqualsDeclaration", mode: "disallow-decorators" },
        { create: "createImportDeclaration", update: "updateImportDeclaration", mode: "disallow-decorators" },
        { create: "createExportAssignment", update: "updateExportAssignment", mode: "disallow-decorators" },
        { create: "createExportDeclaration", update: "updateExportDeclaration", mode: "disallow-decorators" },
    ] as const;

    interface CreateFunction {
        (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, ...args: any[]): any;
        (decorators: null, modifiers: readonly ModifierLike[] | undefined | null, ...args: any[]): any;
    };

    interface UpdateFunction {
        (node: Node, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, ...args: any[]): any;
        (node: Node, decorators: null, modifiers: readonly ModifierLike[] | undefined | null, ...args: any[]): any;
    };

    const issuedDeprecations = new Set<string>();

    function handleDeprecation<D extends typeof functions[number]>(deprecation: D, name: D["create"] | D["update"], decorators: readonly Decorator[] | null | undefined, modifiers: readonly ModifierLike[] | null | undefined) {
        switch (deprecation.mode) {
            case "disallow-decorators":
                if (decorators) {
                    if (!issuedDeprecations.has(name)) {
                        issuedDeprecations.add(name);
                        Debug.createDeprecation(name, { since: "4.8", warnAfter: "4.9", message: `Decorators are no longer supported for this function. Callers should pass 'null' to the 'decorators' parameter so that a future update can introduce an overload that removes the parameter entirely.` })();
                    }
                }
                return modifiers ?? undefined;
            case "disallow-decorators-and-modifiers":
                if (decorators || modifiers) {
                    if (!issuedDeprecations.has(name)) {
                        issuedDeprecations.add(name);
                        Debug.createDeprecation(name, { since: "4.8", warnAfter: "4.9", message: `Decorators and modifiers are no longer supported for this function. Callers should pass 'null' to both the 'decorators' and 'modifiers' parameters so that a future update can introduce an overload that removes these parameters entirely.` })();
                    }
                }
                return RESERVED;
            case "must-merge":
                if (decorators !== RESERVED) {
                    if (!issuedDeprecations.has(name)) {
                        issuedDeprecations.add(name);
                        Debug.createDeprecation(name, { since: "4.8", warnAfter: "4.9", message: "Decorators have been combined with modifiers. Callers should pass 'null' to the 'decorators' parameter so that a future update can introduce an overload that removes the parameter entirely." })();
                    }
                }
                return concatenate(decorators ?? undefined, modifiers ?? undefined);
        }
    }

    const decoratorsPropertyDeprecation = Debug.deprecate(function decorators(this: Node) {
        if (canHaveDecorators(this)) {
            return getDecorators(this);
        }
        if (canHaveIllegalDecorators(this)) {
            return this.illegalDecorators;
        }
    }, { since: "4.8", warnAfter: "4.9", message: "The `decorators` property has been merged with `modifiers` and will be removed in a future update." });

    function finishCreate<T extends Node>(node: T) {
        if (canHaveDecorators(node) || canHaveIllegalDecorators(node)) {
            Object.defineProperty(node, "decorators", {
                enumerable: true,
                configurable: true,
                get: decoratorsPropertyDeprecation
            });
        }
        return node;
    }

    function finishUpdate<T extends Node>(updated: T, original: T) {
        if (updated !== original) {
            return finishCreate(updated);
        }
        return updated;
    }

    function patchCreateFunction<D extends typeof functions[number], F extends CreateFunction>(deprecation: D, create: F) {
        return ((decorators, modifiers, ...args) => finishCreate(create(RESERVED, handleDeprecation(deprecation, deprecation.create, decorators, modifiers), ...args))) as F;
    }

    function patchUpdateFunction<D extends typeof functions[number], F extends UpdateFunction>(deprecation: D, update: F) {
        return ((node, decorators, modifiers, ...args) => finishUpdate(update(node, RESERVED, handleDeprecation(deprecation, deprecation.create, decorators, modifiers), ...args), node)) as F;
    }

    function patchFunctions<D extends typeof functions[number]>(factory: NodeFactory, deprecation: D) {
        factory[deprecation.create as D["create"]] = patchCreateFunction(deprecation, factory[deprecation.create as D["create"]]);
        factory[deprecation.update as D["update"]] = patchUpdateFunction(deprecation, factory[deprecation.update as D["update"]]);
    }

    function patchNodeFactory(factory: NodeFactory) {
        for (const deprecation of functions) {
            patchFunctions(factory, deprecation);
        }
    }

    // Patch `createNodeFactory` because it creates the factories that are provided to transformers
    // in the public API.

    const prevCreateNodeFactory = createNodeFactory;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-qualifier
    ts.createNodeFactory = (flags, baseFactory) => {
        const factory = prevCreateNodeFactory(flags, baseFactory);
        patchNodeFactory(factory);
        return factory;
    };

    // Patch `ts.factory` because its public
    patchNodeFactory(factory);
}
