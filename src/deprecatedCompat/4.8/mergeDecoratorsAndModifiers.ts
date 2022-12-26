import {
    addNodeFactoryPatcher,
    AssertClause,
    AsteriskToken,
    BindingName,
    Block,
    buildOverload,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    ClassStaticBlockDeclaration,
    concatenate,
    ConstructorDeclaration,
    Decorator,
    DeprecationOptions,
    DotDotDotToken,
    EnumDeclaration,
    EnumMember,
    every,
    ExclamationToken,
    ExportAssignment,
    ExportDeclaration,
    Expression,
    factory,
    FunctionDeclaration,
    GetAccessorDeclaration,
    HeritageClause,
    Identifier,
    ImportClause,
    ImportDeclaration,
    ImportEqualsDeclaration,
    IndexSignatureDeclaration,
    InterfaceDeclaration,
    isArray,
    isAssertClause,
    isAsteriskToken,
    isBindingName,
    isBlock,
    isClassElement,
    isDecorator,
    isDotDotDotToken,
    isExpression,
    isHeritageClause,
    isIdentifier,
    isImportClause,
    isModifier,
    isModuleBody,
    isModuleName,
    isModuleReference,
    isNamedExportBindings,
    isParameter,
    isPropertyName,
    isQuestionOrExclamationToken,
    isQuestionToken,
    isTypeElement,
    isTypeNode,
    isTypeParameterDeclaration,
    MethodDeclaration,
    Modifier,
    ModifierLike,
    ModuleBody,
    ModuleDeclaration,
    ModuleName,
    ModuleReference,
    NamedExportBindings,
    NodeFactory,
    NodeFlags,
    ParameterDeclaration,
    PropertyDeclaration,
    PropertyName,
    QuestionToken,
    SetAccessorDeclaration,
    some,
    TypeAliasDeclaration,
    TypeElement,
    TypeNode,
    TypeParameterDeclaration,
} from "../_namespaces/ts";

// DEPRECATION: Deprecate passing `decorators` separate from `modifiers`
// DEPRECATION PLAN:
//     - soft: 4.8
//     - warn: 4.9
//     - error: 5.0
declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface Node {
        /**
         * @deprecated `decorators` has been removed from `Node` and merged with `modifiers` on the `Node` subtypes that support them.
         * Use `ts.canHaveDecorators()` to test whether a `Node` can have decorators.
         * Use `ts.getDecorators()` to get the decorators of a `Node`.
         *
         * For example:
         * ```ts
         * const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
         * ```
         */
        readonly decorators?: undefined;

        /**
         * @deprecated `modifiers` has been removed from `Node` and moved to the `Node` subtypes that support them.
         * Use `ts.canHaveModifiers()` to test whether a `Node` can have modifiers.
         * Use `ts.getModifiers()` to get the modifiers of a `Node`.
         *
         * For example:
         * ```ts
         * const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
         * ```
         */
        readonly modifiers?: NodeArray<ModifierLike> | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface PropertySignature {
        /** @deprecated A property signature cannot have an initializer */
        readonly initializer?: Expression | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface PropertyAssignment {
        /** @deprecated A property assignment cannot have a question token */
        readonly questionToken?: QuestionToken | undefined;

        /** @deprecated A property assignment cannot have an exclamation token */
        readonly exclamationToken?: ExclamationToken | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface ShorthandPropertyAssignment {
        /** @deprecated A shorthand property assignment cannot have modifiers */
        readonly modifiers?: NodeArray<Modifier> | undefined;

        /** @deprecated A shorthand property assignment cannot have a question token */
        readonly questionToken?: QuestionToken | undefined;

        /** @deprecated A shorthand property assignment cannot have an exclamation token */
        readonly exclamationToken?: ExclamationToken | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface FunctionTypeNode {
        /** @deprecated A function type cannot have modifiers */
        readonly modifiers?: NodeArray<Modifier> | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface NodeFactory {
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createParameterDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateParameterDeclaration(node: ParameterDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createPropertyDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updatePropertyDeclaration(node: PropertyDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createMethodDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateMethodDeclaration(node: MethodDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        /**
         * @deprecated This node does not support Decorators. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createConstructorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        /**
         * @deprecated This node does not support Decorators. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateConstructorDeclaration(node: ConstructorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createGetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateGetAccessorDeclaration(node: GetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createSetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateSetAccessorDeclaration(node: SetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        /**
         * @deprecated Decorators and modifiers are no longer supported for this function. Callers should use an overload that does not accept the `decorators` and `modifiers` parameters.
         */
        updateIndexSignature(node: IndexSignatureDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        /**
         * @deprecated Decorators and modifiers are no longer supported for this function. Callers should use an overload that does not accept the `decorators` and `modifiers` parameters.
         */
        createClassStaticBlockDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createClassExpression(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassExpression(node: ClassExpression, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createFunctionDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateFunctionDeclaration(node: FunctionDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createClassDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassDeclaration(node: ClassDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createInterfaceDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateInterfaceDeclaration(node: InterfaceDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createTypeAliasDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateTypeAliasDeclaration(node: TypeAliasDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createEnumDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateEnumDeclaration(node: EnumDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createModuleDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateModuleDeclaration(node: ModuleDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createImportEqualsDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateImportEqualsDeclaration(node: ImportEqualsDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createImportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause): ImportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateImportDeclaration(node: ImportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createExportAssignment(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateExportAssignment(node: ExportAssignment, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, assertClause?: AssertClause): ExportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateExportDeclaration(node: ExportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, assertClause: AssertClause | undefined): ExportDeclaration;
    }
}

const MUST_MERGE: DeprecationOptions = { since: "4.8", warnAfter: "4.9.0-0", message: "Decorators have been combined with modifiers. Callers should switch to an overload that does not accept a 'decorators' parameter." };
const DISALLOW_DECORATORS: DeprecationOptions = { since: "4.8", warnAfter: "4.9.0-0", message: `Decorators are no longer supported for this function. Callers should switch to an overload that does not accept a 'decorators' parameter.` };
const DISALLOW_DECORATORS_AND_MODIFIERS: DeprecationOptions = { since: "4.8", warnAfter: "4.9.0-0", message: `Decorators and modifiers are no longer supported for this function. Callers should switch to an overload that does not accept the 'decorators' and 'modifiers' parameters.` };

function patchNodeFactory(factory: NodeFactory) {
    const {
        createParameterDeclaration,
        updateParameterDeclaration,
        createPropertyDeclaration,
        updatePropertyDeclaration,
        createMethodDeclaration,
        updateMethodDeclaration,
        createConstructorDeclaration,
        updateConstructorDeclaration,
        createGetAccessorDeclaration,
        updateGetAccessorDeclaration,
        createSetAccessorDeclaration,
        updateSetAccessorDeclaration,
        createIndexSignature,
        updateIndexSignature,
        createClassStaticBlockDeclaration,
        updateClassStaticBlockDeclaration,
        createClassExpression,
        updateClassExpression,
        createFunctionDeclaration,
        updateFunctionDeclaration,
        createClassDeclaration,
        updateClassDeclaration,
        createInterfaceDeclaration,
        updateInterfaceDeclaration,
        createTypeAliasDeclaration,
        updateTypeAliasDeclaration,
        createEnumDeclaration,
        updateEnumDeclaration,
        createModuleDeclaration,
        updateModuleDeclaration,
        createImportEqualsDeclaration,
        updateImportEqualsDeclaration,
        createImportDeclaration,
        updateImportDeclaration,
        createExportAssignment,
        updateExportAssignment,
        createExportDeclaration,
        updateExportDeclaration
    } = factory;

    factory.createParameterDeclaration = buildOverload("createParameterDeclaration")
        .overload({
            0(modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration {
                return createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer);
            },

            1(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration {
                return createParameterDeclaration(concatenate<ModifierLike>(decorators, modifiers), dotDotDotToken, name, questionToken, type, initializer);
            },
        })
        .bind({
            0: ([, dotDotDotToken, name, questionToken, type, initializer, other]) =>
                (other === undefined) &&
                (dotDotDotToken === undefined || !isArray(dotDotDotToken)) &&
                (name === undefined || typeof name === "string" || isBindingName(name)) &&
                (questionToken === undefined || typeof questionToken === "object" && isQuestionToken(questionToken)) &&
                (type === undefined || isTypeNode(type)) &&
                (initializer === undefined || isExpression(initializer)),

            1: ([, modifiers, dotDotDotToken, name, questionToken, type, initializer]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (dotDotDotToken === undefined || typeof dotDotDotToken === "object" && isDotDotDotToken(dotDotDotToken)) &&
                (name === undefined || typeof name === "string" || isBindingName(name)) &&
                (questionToken === undefined || isQuestionToken(questionToken)) &&
                (type === undefined || isTypeNode(type)) &&
                (initializer === undefined || isExpression(initializer)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateParameterDeclaration = buildOverload("updateParameterDeclaration")
        .overload({
            0(node: ParameterDeclaration, modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration {
                return updateParameterDeclaration(node, modifiers, dotDotDotToken, name, questionToken, type, initializer);
            },
            1(node: ParameterDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration {
                return updateParameterDeclaration(node, concatenate<ModifierLike>(decorators, modifiers), dotDotDotToken, name, questionToken, type, initializer);
            },
        })
        .bind({
            0: ([, , dotDotDotToken, name, questionToken, type, initializer, other]) =>
                (other === undefined) &&
                (dotDotDotToken === undefined || !isArray(dotDotDotToken)) &&
                (name === undefined || typeof name === "string" || isBindingName(name)) &&
                (questionToken === undefined || typeof questionToken === "object" && isQuestionToken(questionToken)) &&
                (type === undefined || isTypeNode(type)) &&
                (initializer === undefined || isExpression(initializer)),

            1: ([, , modifiers, dotDotDotToken, name, questionToken, type, initializer]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (dotDotDotToken === undefined || typeof dotDotDotToken === "object" && isDotDotDotToken(dotDotDotToken)) &&
                (name === undefined || typeof name === "string" || isBindingName(name)) &&
                (questionToken === undefined || isQuestionToken(questionToken)) &&
                (type === undefined || isTypeNode(type)) &&
                (initializer === undefined || isExpression(initializer)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createPropertyDeclaration = buildOverload("createPropertyDeclaration")
        .overload({
            0(modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration {
                return createPropertyDeclaration(modifiers, name, questionOrExclamationToken, type, initializer);
            },

            1(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration {
                return createPropertyDeclaration(concatenate<ModifierLike>(decorators, modifiers), name, questionOrExclamationToken, type, initializer);
            },
        })
        .bind({
            0: ([, name, questionOrExclamationToken, type, initializer, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (questionOrExclamationToken === undefined || typeof questionOrExclamationToken === "object" && isQuestionOrExclamationToken(questionOrExclamationToken)) &&
                (type === undefined || isTypeNode(type)) &&
                (initializer === undefined || isExpression(initializer)),

            1: ([, modifiers, name, questionOrExclamationToken, type, initializer]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || typeof name === "string" || isPropertyName(name)) &&
                (questionOrExclamationToken === undefined || isQuestionOrExclamationToken(questionOrExclamationToken)) &&
                (type === undefined || isTypeNode(type)) &&
                (initializer === undefined || isExpression(initializer)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updatePropertyDeclaration = buildOverload("updatePropertyDeclaration")
        .overload({
            0(node: PropertyDeclaration, modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration {
                return updatePropertyDeclaration(node, modifiers, name, questionOrExclamationToken, type, initializer);
            },

            1(node: PropertyDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration {
                return updatePropertyDeclaration(node, concatenate<ModifierLike>(decorators, modifiers), name, questionOrExclamationToken, type, initializer);
            },
        })
        .bind({
            0: ([, , name, questionOrExclamationToken, type, initializer, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (questionOrExclamationToken === undefined || typeof questionOrExclamationToken === "object" && isQuestionOrExclamationToken(questionOrExclamationToken)) &&
                (type === undefined || isTypeNode(type)) &&
                (initializer === undefined || isExpression(initializer)),

            1: ([, , modifiers, name, questionOrExclamationToken, type, initializer]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || typeof name === "string" || isPropertyName(name)) &&
                (questionOrExclamationToken === undefined || isQuestionOrExclamationToken(questionOrExclamationToken)) &&
                (type === undefined || isTypeNode(type)) &&
                (initializer === undefined || isExpression(initializer)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createMethodDeclaration = buildOverload("createMethodDeclaration")
        .overload({
            0(modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration {
                return createMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body);
            },

            1(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration {
                return createMethodDeclaration(concatenate<ModifierLike>(decorators, modifiers), asteriskToken, name, questionToken, typeParameters, parameters, type, body);
            },
        })
        .bind({
            0: ([, asteriskToken, name, questionToken, typeParameters, parameters, type, body, other]) =>
                (other === undefined) &&
                (asteriskToken === undefined || !isArray(asteriskToken)) &&
                (name === undefined || typeof name === "string" || isPropertyName(name)) &&
                (questionToken === undefined || typeof questionToken === "object" && isQuestionToken(questionToken)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (parameters === undefined || !some(parameters, isTypeParameterDeclaration)) &&
                (type === undefined || !isArray(type)) &&
                (body === undefined || isBlock(body)),

            1: ([, modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (asteriskToken === undefined || typeof asteriskToken === "object" && isAsteriskToken(asteriskToken)) &&
                (name === undefined || typeof name === "string" || isPropertyName(name)) &&
                (questionToken === undefined || !isArray(questionToken)) &&
                (typeParameters === undefined || !some(typeParameters, isParameter)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || isTypeNode(type)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateMethodDeclaration = buildOverload("updateMethodDeclaration")
        .overload({
            0(node: MethodDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration {
                return updateMethodDeclaration(node, modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body);
            },

            1(node: MethodDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration {
                return updateMethodDeclaration(node, concatenate<ModifierLike>(decorators, modifiers), asteriskToken, name, questionToken, typeParameters, parameters, type, body);
            },
        })
        .bind({
            0: ([, , asteriskToken, name, questionToken, typeParameters, parameters, type, body, other]) =>
                (other === undefined) &&
                (asteriskToken === undefined || !isArray(asteriskToken)) &&
                (name === undefined || typeof name === "string" || isPropertyName(name)) &&
                (questionToken === undefined || typeof questionToken === "object" && isQuestionToken(questionToken)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (parameters === undefined || !some(parameters, isTypeParameterDeclaration)) &&
                (type === undefined || !isArray(type)) &&
                (body === undefined || isBlock(body)),

            1: ([, , modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (asteriskToken === undefined || typeof asteriskToken === "object" && isAsteriskToken(asteriskToken)) &&
                (name === undefined || typeof name === "string" || isPropertyName(name)) &&
                (questionToken === undefined || !isArray(questionToken)) &&
                (typeParameters === undefined || !some(typeParameters, isParameter)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || isTypeNode(type)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createConstructorDeclaration = buildOverload("createConstructorDeclaration")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration {
                return createConstructorDeclaration(modifiers, parameters, body);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration {
                return createConstructorDeclaration(modifiers, parameters, body);
            },
        })
        .bind({
            0: ([modifiers, parameters, body, other]) =>
                (other === undefined) &&
                (modifiers === undefined || !some(modifiers, isDecorator)) &&
                (parameters === undefined || !some(parameters, isModifier)) &&
                (body === undefined || !isArray(body)),

            1: ([decorators, modifiers, parameters, body]) =>
                (decorators === undefined || !some(decorators, isModifier)) &&
                (modifiers === undefined || !some(modifiers, isParameter)) &&
                (parameters === undefined || isArray(parameters)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateConstructorDeclaration = buildOverload("updateConstructorDeclaration")
        .overload({
            0(node: ConstructorDeclaration, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration {
                return updateConstructorDeclaration(node, modifiers, parameters, body);
            },

            1(node: ConstructorDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration {
                return updateConstructorDeclaration(node, modifiers, parameters, body);
            },
        })
        .bind({
            0: ([, modifiers, parameters, body, other]) =>
                (other === undefined) &&
                (modifiers === undefined || !some(modifiers, isDecorator)) &&
                (parameters === undefined || !some(parameters, isModifier)) &&
                (body === undefined || !isArray(body)),

            1: ([, decorators, modifiers, parameters, body]) =>
                (decorators === undefined || !some(decorators, isModifier)) &&
                (modifiers === undefined || !some(modifiers, isParameter)) &&
                (parameters === undefined || isArray(parameters)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createGetAccessorDeclaration = buildOverload("createGetAccessorDeclaration")
        .overload({
            0(modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration {
                return createGetAccessorDeclaration(modifiers, name, parameters, type, body);
            },

            1(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration {
                return createGetAccessorDeclaration(concatenate<ModifierLike>(decorators, modifiers), name, parameters, type, body);
            },
        })
        .bind({
            0: ([, name, parameters, type, body, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || !isArray(type)) &&
                (body === undefined || isBlock(body)),

            1: ([, modifiers, name, parameters, type, body]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || isTypeNode(type)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateGetAccessorDeclaration = buildOverload("updateGetAccessorDeclaration")
        .overload({
            0(node: GetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration {
                return updateGetAccessorDeclaration(node, modifiers, name, parameters, type, body);
            },

            1(node: GetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration {
                return updateGetAccessorDeclaration(node, concatenate<ModifierLike>(decorators, modifiers), name, parameters, type, body);
            },
        })
        .bind({
            0: ([, , name, parameters, type, body, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || !isArray(type)) &&
                (body === undefined || isBlock(body)),

            1: ([, , modifiers, name, parameters, type, body]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || isTypeNode(type)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createSetAccessorDeclaration = buildOverload("createSetAccessorDeclaration")
        .overload({
            0(modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration {
                return createSetAccessorDeclaration(modifiers, name, parameters, body);
            },

            1(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration {
                return createSetAccessorDeclaration(concatenate<ModifierLike>(decorators, modifiers), name, parameters, body);
            },
        })
        .bind({
            0: ([, name, parameters, body, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (parameters === undefined || isArray(parameters)) &&
                (body === undefined || !isArray(body)),

            1: ([, modifiers, name, parameters, body]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (parameters === undefined || isArray(parameters)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateSetAccessorDeclaration = buildOverload("updateSetAccessorDeclaration")
        .overload({
            0(node: SetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration {
                return updateSetAccessorDeclaration(node, modifiers, name, parameters, body);
            },

            1(node: SetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration {
                return updateSetAccessorDeclaration(node, concatenate<ModifierLike>(decorators, modifiers), name, parameters, body);
            },
        })
        .bind({
            0: ([, , name, parameters, body, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (parameters === undefined || isArray(parameters)) &&
                (body === undefined || !isArray(body)),

            1: ([, , modifiers, name, parameters, body]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (parameters === undefined || isArray(parameters)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createIndexSignature = buildOverload("createIndexSignature")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): IndexSignatureDeclaration {
                return createIndexSignature(modifiers, parameters, type);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): IndexSignatureDeclaration {
                return createIndexSignature(modifiers, parameters, type);
            },
        })
        .bind({
            0: ([modifiers, parameters, type, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (parameters === undefined || every(parameters, isParameter)) &&
                (type === undefined || !isArray(type)),

            1: ([decorators, modifiers, parameters, type]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || isTypeNode(type)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateIndexSignature = buildOverload("updateIndexSignature")
        .overload({
            0(node: IndexSignatureDeclaration, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration {
                return updateIndexSignature(node, modifiers, parameters, type);
            },

            1(node: IndexSignatureDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration {
                return updateIndexSignature(node, modifiers, parameters, type);
            },
        })
        .bind({
            0: ([, modifiers, parameters, type, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (parameters === undefined || every(parameters, isParameter)) &&
                (type === undefined || !isArray(type)),

            1: ([, decorators, modifiers, parameters, type]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || isTypeNode(type)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createClassStaticBlockDeclaration = buildOverload("createClassStaticBlockDeclaration")
        .overload({
            0(body: Block): ClassStaticBlockDeclaration {
                return createClassStaticBlockDeclaration(body);
            },

            1(_decorators: readonly Decorator[] | undefined, _modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration {
                return createClassStaticBlockDeclaration(body);
            },
        })
        .bind({
            0: ([body, other1, other2]) =>
                (other1 === undefined) &&
                (other2 === undefined) &&
                (body === undefined || !isArray(body)),

            1: ([decorators, modifiers, body]) =>
                (decorators === undefined || isArray(decorators)) &&
                (modifiers === undefined || isArray(decorators)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS_AND_MODIFIERS
        })
        .finish();

    factory.updateClassStaticBlockDeclaration = buildOverload("updateClassStaticBlockDeclaration")
        .overload({
            0(node: ClassStaticBlockDeclaration, body: Block): ClassStaticBlockDeclaration {
                return updateClassStaticBlockDeclaration(node, body);
            },

            1(node: ClassStaticBlockDeclaration, _decorators: readonly Decorator[] | undefined, _modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration {
                return updateClassStaticBlockDeclaration(node, body);
            },
        })
        .bind({
            0: ([, body, other1, other2]) =>
                (other1 === undefined) &&
                (other2 === undefined) &&
                (body === undefined || !isArray(body)),

            1: ([, decorators, modifiers, body]) =>
                (decorators === undefined || isArray(decorators)) &&
                (modifiers === undefined || isArray(decorators)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS_AND_MODIFIERS
        })
        .finish();

    factory.createClassExpression = buildOverload("createClassExpression")
        .overload({
            0(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression {
                return createClassExpression(modifiers, name, typeParameters, heritageClauses, members);
            },

            1(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression {
                return createClassExpression(concatenate<ModifierLike>(decorators, modifiers), name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || every(members, isClassElement)),

            1: ([, modifiers, name, typeParameters, heritageClauses, members]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || every(typeParameters, isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || isArray(members)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateClassExpression = buildOverload("updateClassExpression")
        .overload({
            0(node: ClassExpression, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression {
                return updateClassExpression(node, modifiers, name, typeParameters, heritageClauses, members);
            },

            1(node: ClassExpression, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression {
                return updateClassExpression(node, concatenate<ModifierLike>(decorators, modifiers), name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, , name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || every(members, isClassElement)),

            1: ([, , modifiers, name, typeParameters, heritageClauses, members]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || every(typeParameters, isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || isArray(members)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createFunctionDeclaration = buildOverload("createFunctionDeclaration")
        .overload({
            0(modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration {
                return createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration {
                return createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
            },
        })
        .bind({
            0: ([, asteriskToken, name, typeParameters, parameters, type, body, other]) =>
                (other === undefined) &&
                (asteriskToken === undefined || !isArray(asteriskToken)) &&
                (name === undefined || typeof name === "string" || isIdentifier(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (parameters === undefined || every(parameters, isParameter)) &&
                (type === undefined || !isArray(type)) &&
                (body === undefined || isBlock(body)),

            1: ([, modifiers, asteriskToken, name, typeParameters, parameters, type, body]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (asteriskToken === undefined || typeof asteriskToken !== "string" && isAsteriskToken(asteriskToken)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || every(typeParameters, isTypeParameterDeclaration)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || isTypeNode(type)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateFunctionDeclaration = buildOverload("updateFunctionDeclaration")
        .overload({
            0(node: FunctionDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration {
                return updateFunctionDeclaration(node, modifiers, asteriskToken, name, typeParameters, parameters, type, body);
            },

            1(node: FunctionDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration {
                return updateFunctionDeclaration(node, modifiers, asteriskToken, name, typeParameters, parameters, type, body);
            },
        })
        .bind({
            0: ([, , asteriskToken, name, typeParameters, parameters, type, body, other]) =>
                (other === undefined) &&
                (asteriskToken === undefined || !isArray(asteriskToken)) &&
                (name === undefined || isIdentifier(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (parameters === undefined || every(parameters, isParameter)) &&
                (type === undefined || !isArray(type)) &&
                (body === undefined || isBlock(body)),

            1: ([, , modifiers, asteriskToken, name, typeParameters, parameters, type, body]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (asteriskToken === undefined || typeof asteriskToken !== "string" && isAsteriskToken(asteriskToken)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || every(typeParameters, isTypeParameterDeclaration)) &&
                (parameters === undefined || isArray(parameters)) &&
                (type === undefined || isTypeNode(type)) &&
                (body === undefined || isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createClassDeclaration = buildOverload("createClassDeclaration")
        .overload({
            0(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration {
                return createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members);
            },

            1(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration {
                return createClassDeclaration(concatenate<ModifierLike>(decorators, modifiers), name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || every(members, isClassElement)),

            1: () => true,
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateClassDeclaration = buildOverload("updateClassDeclaration")
        .overload({
            0(node: ClassDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration {
                return updateClassDeclaration(node, modifiers, name, typeParameters, heritageClauses, members);
            },

            1(node: ClassDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration {
                return updateClassDeclaration(node, concatenate<ModifierLike>(decorators, modifiers), name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, , name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || every(members, isClassElement)),

            1: ([, , modifiers, name, typeParameters, heritageClauses, members]) =>
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || every(typeParameters, isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || isArray(members)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createInterfaceDeclaration = buildOverload("createInterfaceDeclaration")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration {
                return createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration {
                return createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([modifiers, name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || every(members, isTypeElement)),

            1: ([decorators, modifiers, name, typeParameters, heritageClauses, members]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || every(typeParameters, isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || every(members, isTypeElement)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateInterfaceDeclaration = buildOverload("updateInterfaceDeclaration")
        .overload({
            0(node: InterfaceDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration {
                return updateInterfaceDeclaration(node, modifiers, name, typeParameters, heritageClauses, members);
            },

            1(node: InterfaceDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration {
                return updateInterfaceDeclaration(node, modifiers, name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, modifiers, name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || every(members, isTypeElement)),

            1: ([, decorators, modifiers, name, typeParameters, heritageClauses, members]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || every(typeParameters, isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || every(heritageClauses, isHeritageClause)) &&
                (members === undefined || every(members, isTypeElement)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createTypeAliasDeclaration = buildOverload("createTypeAliasDeclaration")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration {
                return createTypeAliasDeclaration(modifiers, name, typeParameters, type);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration {
                return createTypeAliasDeclaration(modifiers, name, typeParameters, type);
            },
        })
        .bind({
            0: ([modifiers, name, typeParameters, type, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (type === undefined || !isArray(type)),

            1: ([decorators, modifiers, name, typeParameters, type]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (type === undefined || isTypeNode(type)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateTypeAliasDeclaration = buildOverload("updateTypeAliasDeclaration")
        .overload({
            0(node: TypeAliasDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration {
                return updateTypeAliasDeclaration(node, modifiers, name, typeParameters, type);
            },

            1(node: TypeAliasDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration {
                return updateTypeAliasDeclaration(node, modifiers, name, typeParameters, type);
            },
        })
        .bind({
            0: ([, modifiers, name, typeParameters, type, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (type === undefined || !isArray(type)),

            1: ([, decorators, modifiers, name, typeParameters, type]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (typeParameters === undefined || isArray(typeParameters)) &&
                (type === undefined || isTypeNode(type)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createEnumDeclaration = buildOverload("createEnumDeclaration")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration {
                return createEnumDeclaration(modifiers, name, members);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration {
                return createEnumDeclaration(modifiers, name, members);
            },
        })
        .bind({
            0: ([modifiers, name, members, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (name === undefined || !isArray(name)) &&
                (members === undefined || isArray(members)),

            1: ([decorators, modifiers, name, members]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (members === undefined || isArray(members)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateEnumDeclaration = buildOverload("updateEnumDeclaration")
        .overload({
            0(node: EnumDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration {
                return updateEnumDeclaration(node, modifiers, name, members);
            },

            1(node: EnumDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration {
                return updateEnumDeclaration(node, modifiers, name, members);
            },
        })
        .bind({
            0: ([, modifiers, name, members, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (name === undefined || !isArray(name)) &&
                (members === undefined || isArray(members)),

            1: ([, decorators, modifiers, name, members]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (name === undefined || !isArray(name)) &&
                (members === undefined || isArray(members)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createModuleDeclaration = buildOverload("createModuleDeclaration")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration {
                return createModuleDeclaration(modifiers, name, body, flags);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration {
                return createModuleDeclaration(modifiers, name, body, flags);
            },
        })
        .bind({
            0: ([modifiers, name, body, flags, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (name !== undefined && !isArray(name)) &&
                (body === undefined || isModuleBody(body)) &&
                (flags === undefined || typeof flags === "number"),

            1: ([decorators, modifiers, name, body, flags]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (name !== undefined && isModuleName(name)) &&
                (body === undefined || typeof body === "object") &&
                (flags === undefined || typeof flags === "number"),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateModuleDeclaration = buildOverload("updateModuleDeclaration")
        .overload({
            0(node: ModuleDeclaration, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration {
                return updateModuleDeclaration(node, modifiers, name, body);
            },

            1(node: ModuleDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration {
                return updateModuleDeclaration(node, modifiers, name, body);
            },
        })
        .bind({
            0: ([, modifiers, name, body, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (name === undefined || !isArray(name)) &&
                (body === undefined || isModuleBody(body)),

            1: ([, decorators, modifiers, name, body]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (name !== undefined && isModuleName(name)) &&
                (body === undefined || isModuleBody(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createImportEqualsDeclaration = buildOverload("createImportEqualsDeclaration")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration {
                return createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration {
                return createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference);
            },
        })
        .bind({
            0: ([modifiers, isTypeOnly, name, moduleReference, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (isTypeOnly === undefined || typeof isTypeOnly === "boolean") &&
                (typeof name !== "boolean") &&
                (typeof moduleReference !== "string"),

            1: ([decorators, modifiers, isTypeOnly, name, moduleReference]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (isTypeOnly === undefined || typeof isTypeOnly === "boolean") &&
                (typeof name === "string" || isIdentifier(name)) &&
                (moduleReference !== undefined && isModuleReference(moduleReference)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateImportEqualsDeclaration = buildOverload("updateImportEqualsDeclaration")
        .overload({
            0(node: ImportEqualsDeclaration, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration {
                return updateImportEqualsDeclaration(node, modifiers, isTypeOnly, name, moduleReference);
            },

            1(node: ImportEqualsDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration {
                return updateImportEqualsDeclaration(node, modifiers, isTypeOnly, name, moduleReference);
            },
        })
        .bind({
            0: ([, modifiers, isTypeOnly, name, moduleReference, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (isTypeOnly === undefined || typeof isTypeOnly === "boolean") &&
                (typeof name !== "boolean") &&
                (typeof moduleReference !== "string"),

            1: ([, decorators, modifiers, isTypeOnly, name, moduleReference]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (isTypeOnly === undefined || typeof isTypeOnly === "boolean") &&
                (typeof name === "string" || isIdentifier(name)) &&
                (moduleReference !== undefined && isModuleReference(moduleReference)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createImportDeclaration = buildOverload("createImportDeclaration")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause): ImportDeclaration {
                return createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause): ImportDeclaration {
                return createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause);
            },
        })
        .bind({
            0: ([modifiers, importClause, moduleSpecifier, assertClause, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (importClause === undefined || !isArray(importClause)) &&
                (moduleSpecifier !== undefined && isExpression(moduleSpecifier)) &&
                (assertClause === undefined || isAssertClause(assertClause)),

            1: ([decorators, modifiers, importClause, moduleSpecifier, assertClause]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (importClause === undefined || isImportClause(importClause)) &&
                (moduleSpecifier !== undefined && isExpression(moduleSpecifier)) &&
                (assertClause === undefined || isAssertClause(assertClause)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateImportDeclaration = buildOverload("updateImportDeclaration")
        .overload({
            0(node: ImportDeclaration, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration {
                return updateImportDeclaration(node, modifiers, importClause, moduleSpecifier, assertClause);
            },

            1(node: ImportDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration {
                return updateImportDeclaration(node, modifiers, importClause, moduleSpecifier, assertClause);
            },
        })
        .bind({
            0: ([, modifiers, importClause, moduleSpecifier, assertClause, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (importClause === undefined || !isArray(importClause)) &&
                (moduleSpecifier === undefined || isExpression(moduleSpecifier)) &&
                (assertClause === undefined || isAssertClause(assertClause)),

            1: ([, decorators, modifiers, importClause, moduleSpecifier, assertClause]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (importClause === undefined || isImportClause(importClause)) &&
                (moduleSpecifier !== undefined && isExpression(moduleSpecifier)) &&
                (assertClause === undefined || isAssertClause(assertClause)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createExportAssignment = buildOverload("createExportAssignment")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment {
                return createExportAssignment(modifiers, isExportEquals, expression);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment {
                return createExportAssignment(modifiers, isExportEquals, expression);
            },
        })
        .bind({
            0: ([modifiers, isExportEquals, expression, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (isExportEquals === undefined || typeof isExportEquals === "boolean") &&
                (typeof expression === "object"),

            1: ([decorators, modifiers, isExportEquals, expression]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (isExportEquals === undefined || typeof isExportEquals === "boolean") &&
                (expression !== undefined && isExpression(expression)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateExportAssignment = buildOverload("updateExportAssignment")
        .overload({
            0(node: ExportAssignment, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment {
                return updateExportAssignment(node, modifiers, expression);
            },

            1(node: ExportAssignment, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment {
                return updateExportAssignment(node, modifiers, expression);
            },
        })
        .bind({
            0: ([, modifiers, expression, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (expression !== undefined && !isArray(expression)),

            1: ([, decorators, modifiers, expression]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (expression !== undefined && isExpression(expression)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createExportDeclaration = buildOverload("createExportDeclaration")
        .overload({
            0(modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, assertClause?: AssertClause): ExportDeclaration {
                return createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
            },

            1(_decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, assertClause?: AssertClause): ExportDeclaration {
                return createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
            },
        })
        .bind({
            0: ([modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (typeof isTypeOnly === "boolean") &&
                (typeof exportClause !== "boolean") &&
                (moduleSpecifier === undefined || isExpression(moduleSpecifier)) &&
                (assertClause === undefined || isAssertClause(assertClause)),

            1: ([decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (typeof isTypeOnly === "boolean") &&
                (exportClause === undefined || isNamedExportBindings(exportClause)) &&
                (moduleSpecifier === undefined || isExpression(moduleSpecifier)) &&
                (assertClause === undefined || isAssertClause(assertClause)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateExportDeclaration = buildOverload("updateExportDeclaration")
        .overload({
            0(node: ExportDeclaration, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, assertClause: AssertClause | undefined): ExportDeclaration {
                return updateExportDeclaration(node, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
            },

            1(node: ExportDeclaration, _decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, assertClause: AssertClause | undefined): ExportDeclaration {
                return updateExportDeclaration(node, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
            },
        })
        .bind({
            0: ([, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause, other]) =>
                (other === undefined) &&
                (modifiers === undefined || every(modifiers, isModifier)) &&
                (typeof isTypeOnly === "boolean") &&
                (typeof exportClause !== "boolean") &&
                (moduleSpecifier === undefined || isExpression(moduleSpecifier)) &&
                (assertClause === undefined || isAssertClause(assertClause)),

            1: ([, decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause]) =>
                (decorators === undefined || every(decorators, isDecorator)) &&
                (modifiers === undefined || isArray(modifiers)) &&
                (typeof isTypeOnly === "boolean") &&
                (exportClause === undefined || isNamedExportBindings(exportClause)) &&
                (moduleSpecifier === undefined || isExpression(moduleSpecifier)) &&
                (assertClause === undefined || isAssertClause(assertClause)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();
}

// Patch `createNodeFactory` because it creates the factories that are provided to transformers
// in the public API.
addNodeFactoryPatcher(patchNodeFactory);

// Patch `ts.factory` because its public
patchNodeFactory(factory);
