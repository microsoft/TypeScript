import * as ts from "../_namespaces/ts";

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
        readonly modifiers?: ts.NodeArray<ts.ModifierLike> | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface PropertySignature {
        /** @deprecated A property signature cannot have an initializer */
        readonly initializer?: ts.Expression | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface PropertyAssignment {
        /** @deprecated A property assignment cannot have a question token */
        readonly questionToken?: ts.QuestionToken | undefined;

        /** @deprecated A property assignment cannot have an exclamation token */
        readonly exclamationToken?: ts.ExclamationToken | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface ShorthandPropertyAssignment {
        /** @deprecated A shorthand property assignment cannot have modifiers */
        readonly modifiers?: ts.NodeArray<ts.Modifier> | undefined;

        /** @deprecated A shorthand property assignment cannot have a question token */
        readonly questionToken?: ts.QuestionToken | undefined;

        /** @deprecated A shorthand property assignment cannot have an exclamation token */
        readonly exclamationToken?: ts.ExclamationToken | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface FunctionTypeNode {
        /** @deprecated A function type cannot have modifiers */
        readonly modifiers?: ts.NodeArray<ts.Modifier> | undefined;
    }
}

declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface NodeFactory {
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createParameterDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, dotDotDotToken: ts.DotDotDotToken | undefined, name: string | ts.BindingName, questionToken?: ts.QuestionToken, type?: ts.TypeNode, initializer?: ts.Expression): ts.ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateParameterDeclaration(node: ts.ParameterDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, dotDotDotToken: ts.DotDotDotToken | undefined, name: string | ts.BindingName, questionToken: ts.QuestionToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createPropertyDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.PropertyName, questionOrExclamationToken: ts.QuestionToken | ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updatePropertyDeclaration(node: ts.PropertyDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.PropertyName, questionOrExclamationToken: ts.QuestionToken | ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createMethodDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: string | ts.PropertyName, questionToken: ts.QuestionToken | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.MethodDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateMethodDeclaration(node: ts.MethodDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: ts.PropertyName, questionToken: ts.QuestionToken | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.MethodDeclaration;
        /**
         * @deprecated This node does not support Decorators. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createConstructorDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.ConstructorDeclaration;
        /**
         * @deprecated This node does not support Decorators. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateConstructorDeclaration(node: ts.ConstructorDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.ConstructorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createGetAccessorDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateGetAccessorDeclaration(node: ts.GetAccessorDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createSetAccessorDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.SetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateSetAccessorDeclaration(node: ts.SetAccessorDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.SetAccessorDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createIndexSignature(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode): ts.IndexSignatureDeclaration;
        /**
         * @deprecated Decorators and modifiers are no longer supported for this function. Callers should use an overload that does not accept the `decorators` and `modifiers` parameters.
         */
        updateIndexSignature(node: ts.IndexSignatureDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode): ts.IndexSignatureDeclaration;
        /**
         * @deprecated Decorators and modifiers are no longer supported for this function. Callers should use an overload that does not accept the `decorators` and `modifiers` parameters.
         */
        createClassStaticBlockDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, body: ts.Block): ts.ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassStaticBlockDeclaration(node: ts.ClassStaticBlockDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, body: ts.Block): ts.ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createClassExpression(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassExpression;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassExpression(node: ts.ClassExpression, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassExpression;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createFunctionDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: string | ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.FunctionDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateFunctionDeclaration(node: ts.FunctionDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.FunctionDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createClassDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassDeclaration(node: ts.ClassDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createInterfaceDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.TypeElement[]): ts.InterfaceDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateInterfaceDeclaration(node: ts.InterfaceDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.TypeElement[]): ts.InterfaceDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createTypeAliasDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, type: ts.TypeNode): ts.TypeAliasDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateTypeAliasDeclaration(node: ts.TypeAliasDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, type: ts.TypeNode): ts.TypeAliasDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createEnumDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, members: readonly ts.EnumMember[]): ts.EnumDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateEnumDeclaration(node: ts.EnumDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, members: readonly ts.EnumMember[]): ts.EnumDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createModuleDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.ModuleName, body: ts.ModuleBody | undefined, flags?: ts.NodeFlags): ts.ModuleDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateModuleDeclaration(node: ts.ModuleDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.ModuleName, body: ts.ModuleBody | undefined): ts.ModuleDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createImportEqualsDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, name: string | ts.Identifier, moduleReference: ts.ModuleReference): ts.ImportEqualsDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateImportEqualsDeclaration(node: ts.ImportEqualsDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, name: ts.Identifier, moduleReference: ts.ModuleReference): ts.ImportEqualsDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createImportDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, importClause: ts.ImportClause | undefined, moduleSpecifier: ts.Expression, assertClause?: ts.AssertClause): ts.ImportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateImportDeclaration(node: ts.ImportDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, importClause: ts.ImportClause | undefined, moduleSpecifier: ts.Expression, assertClause: ts.AssertClause | undefined): ts.ImportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createExportAssignment(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isExportEquals: boolean | undefined, expression: ts.Expression): ts.ExportAssignment;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateExportAssignment(node: ts.ExportAssignment, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, expression: ts.Expression): ts.ExportAssignment;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createExportDeclaration(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, exportClause: ts.NamedExportBindings | undefined, moduleSpecifier?: ts.Expression, assertClause?: ts.AssertClause): ts.ExportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateExportDeclaration(node: ts.ExportDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, exportClause: ts.NamedExportBindings | undefined, moduleSpecifier: ts.Expression | undefined, assertClause: ts.AssertClause | undefined): ts.ExportDeclaration;
    }
}

const MUST_MERGE: ts.DeprecationOptions = { since: "4.8", warnAfter: "4.9.0-0", message: "Decorators have been combined with modifiers. Callers should switch to an overload that does not accept a 'decorators' parameter." };
const DISALLOW_DECORATORS: ts.DeprecationOptions = { since: "4.8", warnAfter: "4.9.0-0", message: `Decorators are no longer supported for this function. Callers should switch to an overload that does not accept a 'decorators' parameter.` };
const DISALLOW_DECORATORS_AND_MODIFIERS: ts.DeprecationOptions = { since: "4.8", warnAfter: "4.9.0-0", message: `Decorators and modifiers are no longer supported for this function. Callers should switch to an overload that does not accept the 'decorators' and 'modifiers' parameters.` };

function patchNodeFactory(factory: ts.NodeFactory) {
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

    factory.createParameterDeclaration = ts.buildOverload("createParameterDeclaration")
        .overload({
            0(modifiers: readonly ts.ModifierLike[] | undefined, dotDotDotToken: ts.DotDotDotToken | undefined, name: string | ts.BindingName, questionToken?: ts.QuestionToken, type?: ts.TypeNode, initializer?: ts.Expression): ts.ParameterDeclaration {
                return createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer);
            },

            1(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, dotDotDotToken: ts.DotDotDotToken | undefined, name: string | ts.BindingName, questionToken?: ts.QuestionToken, type?: ts.TypeNode, initializer?: ts.Expression): ts.ParameterDeclaration {
                return createParameterDeclaration(ts.concatenate<ts.ModifierLike>(decorators, modifiers), dotDotDotToken, name, questionToken, type, initializer);
            },
        })
        .bind({
            0: ([, dotDotDotToken, name, questionToken, type, initializer, other]) =>
                (other === undefined) &&
                (dotDotDotToken === undefined || !ts.isArray(dotDotDotToken)) &&
                (name === undefined || typeof name === "string" || ts.isBindingName(name)) &&
                (questionToken === undefined || typeof questionToken === "object" && ts.isQuestionToken(questionToken)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (initializer === undefined || ts.isExpression(initializer)),

            1: ([, modifiers, dotDotDotToken, name, questionToken, type, initializer]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (dotDotDotToken === undefined || typeof dotDotDotToken === "object" && ts.isDotDotDotToken(dotDotDotToken)) &&
                (name === undefined || typeof name === "string" || ts.isBindingName(name)) &&
                (questionToken === undefined || ts.isQuestionToken(questionToken)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (initializer === undefined || ts.isExpression(initializer)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateParameterDeclaration = ts.buildOverload("updateParameterDeclaration")
        .overload({
            0(node: ts.ParameterDeclaration, modifiers: readonly ts.ModifierLike[] | undefined, dotDotDotToken: ts.DotDotDotToken | undefined, name: string | ts.BindingName, questionToken: ts.QuestionToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.ParameterDeclaration {
                return updateParameterDeclaration(node, modifiers, dotDotDotToken, name, questionToken, type, initializer);
            },
            1(node: ts.ParameterDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, dotDotDotToken: ts.DotDotDotToken | undefined, name: string | ts.BindingName, questionToken: ts.QuestionToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.ParameterDeclaration {
                return updateParameterDeclaration(node, ts.concatenate<ts.ModifierLike>(decorators, modifiers), dotDotDotToken, name, questionToken, type, initializer);
            },
        })
        .bind({
            0: ([, , dotDotDotToken, name, questionToken, type, initializer, other]) =>
                (other === undefined) &&
                (dotDotDotToken === undefined || !ts.isArray(dotDotDotToken)) &&
                (name === undefined || typeof name === "string" || ts.isBindingName(name)) &&
                (questionToken === undefined || typeof questionToken === "object" && ts.isQuestionToken(questionToken)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (initializer === undefined || ts.isExpression(initializer)),

            1: ([, , modifiers, dotDotDotToken, name, questionToken, type, initializer]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (dotDotDotToken === undefined || typeof dotDotDotToken === "object" && ts.isDotDotDotToken(dotDotDotToken)) &&
                (name === undefined || typeof name === "string" || ts.isBindingName(name)) &&
                (questionToken === undefined || ts.isQuestionToken(questionToken)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (initializer === undefined || ts.isExpression(initializer)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createPropertyDeclaration = ts.buildOverload("createPropertyDeclaration")
        .overload({
            0(modifiers: readonly ts.ModifierLike[] | undefined, name: string | ts.PropertyName, questionOrExclamationToken: ts.QuestionToken | ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.PropertyDeclaration {
                return createPropertyDeclaration(modifiers, name, questionOrExclamationToken, type, initializer);
            },

            1(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.PropertyName, questionOrExclamationToken: ts.QuestionToken | ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.PropertyDeclaration {
                return createPropertyDeclaration(ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, questionOrExclamationToken, type, initializer);
            },
        })
        .bind({
            0: ([, name, questionOrExclamationToken, type, initializer, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (questionOrExclamationToken === undefined || typeof questionOrExclamationToken === "object" && ts.isQuestionOrExclamationToken(questionOrExclamationToken)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (initializer === undefined || ts.isExpression(initializer)),

            1: ([, modifiers, name, questionOrExclamationToken, type, initializer]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || typeof name === "string" || ts.isPropertyName(name)) &&
                (questionOrExclamationToken === undefined || ts.isQuestionOrExclamationToken(questionOrExclamationToken)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (initializer === undefined || ts.isExpression(initializer)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updatePropertyDeclaration = ts.buildOverload("updatePropertyDeclaration")
        .overload({
            0(node: ts.PropertyDeclaration, modifiers: readonly ts.ModifierLike[] | undefined, name: string | ts.PropertyName, questionOrExclamationToken: ts.QuestionToken | ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.PropertyDeclaration {
                return updatePropertyDeclaration(node, modifiers, name, questionOrExclamationToken, type, initializer);
            },

            1(node: ts.PropertyDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.PropertyName, questionOrExclamationToken: ts.QuestionToken | ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined): ts.PropertyDeclaration {
                return updatePropertyDeclaration(node, ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, questionOrExclamationToken, type, initializer);
            },
        })
        .bind({
            0: ([, , name, questionOrExclamationToken, type, initializer, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (questionOrExclamationToken === undefined || typeof questionOrExclamationToken === "object" && ts.isQuestionOrExclamationToken(questionOrExclamationToken)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (initializer === undefined || ts.isExpression(initializer)),

            1: ([, , modifiers, name, questionOrExclamationToken, type, initializer]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || typeof name === "string" || ts.isPropertyName(name)) &&
                (questionOrExclamationToken === undefined || ts.isQuestionOrExclamationToken(questionOrExclamationToken)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (initializer === undefined || ts.isExpression(initializer)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createMethodDeclaration = ts.buildOverload("createMethodDeclaration")
        .overload({
            0(modifiers: readonly ts.ModifierLike[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: string | ts.PropertyName, questionToken: ts.QuestionToken | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.MethodDeclaration {
                return createMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body);
            },

            1(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: string | ts.PropertyName, questionToken: ts.QuestionToken | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.MethodDeclaration {
                return createMethodDeclaration(ts.concatenate<ts.ModifierLike>(decorators, modifiers), asteriskToken, name, questionToken, typeParameters, parameters, type, body);
            },
        })
        .bind({
            0: ([, asteriskToken, name, questionToken, typeParameters, parameters, type, body, other]) =>
                (other === undefined) &&
                (asteriskToken === undefined || !ts.isArray(asteriskToken)) &&
                (name === undefined || typeof name === "string" || ts.isPropertyName(name)) &&
                (questionToken === undefined || typeof questionToken === "object" && ts.isQuestionToken(questionToken)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (parameters === undefined || !ts.some(parameters, ts.isTypeParameterDeclaration)) &&
                (type === undefined || !ts.isArray(type)) &&
                (body === undefined || ts.isBlock(body)),

            1: ([, modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (asteriskToken === undefined || typeof asteriskToken === "object" && ts.isAsteriskToken(asteriskToken)) &&
                (name === undefined || typeof name === "string" || ts.isPropertyName(name)) &&
                (questionToken === undefined || !ts.isArray(questionToken)) &&
                (typeParameters === undefined || !ts.some(typeParameters, ts.isParameter)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateMethodDeclaration = ts.buildOverload("updateMethodDeclaration")
        .overload({
            0(node: ts.MethodDeclaration, modifiers: readonly ts.ModifierLike[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: ts.PropertyName, questionToken: ts.QuestionToken | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.MethodDeclaration {
                return updateMethodDeclaration(node, modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body);
            },

            1(node: ts.MethodDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: ts.PropertyName, questionToken: ts.QuestionToken | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.MethodDeclaration {
                return updateMethodDeclaration(node, ts.concatenate<ts.ModifierLike>(decorators, modifiers), asteriskToken, name, questionToken, typeParameters, parameters, type, body);
            },
        })
        .bind({
            0: ([, , asteriskToken, name, questionToken, typeParameters, parameters, type, body, other]) =>
                (other === undefined) &&
                (asteriskToken === undefined || !ts.isArray(asteriskToken)) &&
                (name === undefined || typeof name === "string" || ts.isPropertyName(name)) &&
                (questionToken === undefined || typeof questionToken === "object" && ts.isQuestionToken(questionToken)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (parameters === undefined || !ts.some(parameters, ts.isTypeParameterDeclaration)) &&
                (type === undefined || !ts.isArray(type)) &&
                (body === undefined || ts.isBlock(body)),

            1: ([, , modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (asteriskToken === undefined || typeof asteriskToken === "object" && ts.isAsteriskToken(asteriskToken)) &&
                (name === undefined || typeof name === "string" || ts.isPropertyName(name)) &&
                (questionToken === undefined || !ts.isArray(questionToken)) &&
                (typeParameters === undefined || !ts.some(typeParameters, ts.isParameter)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createConstructorDeclaration = ts.buildOverload("createConstructorDeclaration")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.ConstructorDeclaration {
                return createConstructorDeclaration(modifiers, parameters, body);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.ConstructorDeclaration {
                return createConstructorDeclaration(modifiers, parameters, body);
            },
        })
        .bind({
            0: ([modifiers, parameters, body, other]) =>
                (other === undefined) &&
                (modifiers === undefined || !ts.some(modifiers, ts.isDecorator)) &&
                (parameters === undefined || !ts.some(parameters, ts.isModifier)) &&
                (body === undefined || !ts.isArray(body)),

            1: ([decorators, modifiers, parameters, body]) =>
                (decorators === undefined || !ts.some(decorators, ts.isModifier)) &&
                (modifiers === undefined || !ts.some(modifiers, ts.isParameter)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateConstructorDeclaration = ts.buildOverload("updateConstructorDeclaration")
        .overload({
            0(node: ts.ConstructorDeclaration, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.ConstructorDeclaration {
                return updateConstructorDeclaration(node, modifiers, parameters, body);
            },

            1(node: ts.ConstructorDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.ConstructorDeclaration {
                return updateConstructorDeclaration(node, modifiers, parameters, body);
            },
        })
        .bind({
            0: ([, modifiers, parameters, body, other]) =>
                (other === undefined) &&
                (modifiers === undefined || !ts.some(modifiers, ts.isDecorator)) &&
                (parameters === undefined || !ts.some(parameters, ts.isModifier)) &&
                (body === undefined || !ts.isArray(body)),

            1: ([, decorators, modifiers, parameters, body]) =>
                (decorators === undefined || !ts.some(decorators, ts.isModifier)) &&
                (modifiers === undefined || !ts.some(modifiers, ts.isParameter)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createGetAccessorDeclaration = ts.buildOverload("createGetAccessorDeclaration")
        .overload({
            0(modifiers: readonly ts.ModifierLike[] | undefined, name: string | ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.GetAccessorDeclaration {
                return createGetAccessorDeclaration(modifiers, name, parameters, type, body);
            },

            1(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.GetAccessorDeclaration {
                return createGetAccessorDeclaration(ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, parameters, type, body);
            },
        })
        .bind({
            0: ([, name, parameters, type, body, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || !ts.isArray(type)) &&
                (body === undefined || ts.isBlock(body)),

            1: ([, modifiers, name, parameters, type, body]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateGetAccessorDeclaration = ts.buildOverload("updateGetAccessorDeclaration")
        .overload({
            0(node: ts.GetAccessorDeclaration, modifiers: readonly ts.ModifierLike[] | undefined, name: ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.GetAccessorDeclaration {
                return updateGetAccessorDeclaration(node, modifiers, name, parameters, type, body);
            },

            1(node: ts.GetAccessorDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.GetAccessorDeclaration {
                return updateGetAccessorDeclaration(node, ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, parameters, type, body);
            },
        })
        .bind({
            0: ([, , name, parameters, type, body, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || !ts.isArray(type)) &&
                (body === undefined || ts.isBlock(body)),

            1: ([, , modifiers, name, parameters, type, body]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createSetAccessorDeclaration = ts.buildOverload("createSetAccessorDeclaration")
        .overload({
            0(modifiers: readonly ts.ModifierLike[] | undefined, name: string | ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.SetAccessorDeclaration {
                return createSetAccessorDeclaration(modifiers, name, parameters, body);
            },

            1(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.SetAccessorDeclaration {
                return createSetAccessorDeclaration(ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, parameters, body);
            },
        })
        .bind({
            0: ([, name, parameters, body, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (body === undefined || !ts.isArray(body)),

            1: ([, modifiers, name, parameters, body]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateSetAccessorDeclaration = ts.buildOverload("updateSetAccessorDeclaration")
        .overload({
            0(node: ts.SetAccessorDeclaration, modifiers: readonly ts.ModifierLike[] | undefined, name: ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.SetAccessorDeclaration {
                return updateSetAccessorDeclaration(node, modifiers, name, parameters, body);
            },

            1(node: ts.SetAccessorDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.PropertyName, parameters: readonly ts.ParameterDeclaration[], body: ts.Block | undefined): ts.SetAccessorDeclaration {
                return updateSetAccessorDeclaration(node, ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, parameters, body);
            },
        })
        .bind({
            0: ([, , name, parameters, body, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (body === undefined || !ts.isArray(body)),

            1: ([, , modifiers, name, parameters, body]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createIndexSignature = ts.buildOverload("createIndexSignature")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined): ts.IndexSignatureDeclaration {
                return createIndexSignature(modifiers, parameters, type);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined): ts.IndexSignatureDeclaration {
                return createIndexSignature(modifiers, parameters, type);
            },
        })
        .bind({
            0: ([modifiers, parameters, type, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (parameters === undefined || ts.every(parameters, ts.isParameter)) &&
                (type === undefined || !ts.isArray(type)),

            1: ([decorators, modifiers, parameters, type]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || ts.isTypeNode(type)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateIndexSignature = ts.buildOverload("updateIndexSignature")
        .overload({
            0(node: ts.IndexSignatureDeclaration, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode): ts.IndexSignatureDeclaration {
                return updateIndexSignature(node, modifiers, parameters, type);
            },

            1(node: ts.IndexSignatureDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode): ts.IndexSignatureDeclaration {
                return updateIndexSignature(node, modifiers, parameters, type);
            },
        })
        .bind({
            0: ([, modifiers, parameters, type, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (parameters === undefined || ts.every(parameters, ts.isParameter)) &&
                (type === undefined || !ts.isArray(type)),

            1: ([, decorators, modifiers, parameters, type]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || ts.isTypeNode(type)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createClassStaticBlockDeclaration = ts.buildOverload("createClassStaticBlockDeclaration")
        .overload({
            0(body: ts.Block): ts.ClassStaticBlockDeclaration {
                return createClassStaticBlockDeclaration(body);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, _modifiers: readonly ts.Modifier[] | undefined, body: ts.Block): ts.ClassStaticBlockDeclaration {
                return createClassStaticBlockDeclaration(body);
            },
        })
        .bind({
            0: ([body, other1, other2]) =>
                (other1 === undefined) &&
                (other2 === undefined) &&
                (body === undefined || !ts.isArray(body)),

            1: ([decorators, modifiers, body]) =>
                (decorators === undefined || ts.isArray(decorators)) &&
                (modifiers === undefined || ts.isArray(decorators)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS_AND_MODIFIERS
        })
        .finish();

    factory.updateClassStaticBlockDeclaration = ts.buildOverload("updateClassStaticBlockDeclaration")
        .overload({
            0(node: ts.ClassStaticBlockDeclaration, body: ts.Block): ts.ClassStaticBlockDeclaration {
                return updateClassStaticBlockDeclaration(node, body);
            },

            1(node: ts.ClassStaticBlockDeclaration, _decorators: readonly ts.Decorator[] | undefined, _modifiers: readonly ts.Modifier[] | undefined, body: ts.Block): ts.ClassStaticBlockDeclaration {
                return updateClassStaticBlockDeclaration(node, body);
            },
        })
        .bind({
            0: ([, body, other1, other2]) =>
                (other1 === undefined) &&
                (other2 === undefined) &&
                (body === undefined || !ts.isArray(body)),

            1: ([, decorators, modifiers, body]) =>
                (decorators === undefined || ts.isArray(decorators)) &&
                (modifiers === undefined || ts.isArray(decorators)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS_AND_MODIFIERS
        })
        .finish();

    factory.createClassExpression = ts.buildOverload("createClassExpression")
        .overload({
            0(modifiers: readonly ts.ModifierLike[] | undefined, name: string | ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassExpression {
                return createClassExpression(modifiers, name, typeParameters, heritageClauses, members);
            },

            1(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassExpression {
                return createClassExpression(ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.every(members, ts.isClassElement)),

            1: ([, modifiers, name, typeParameters, heritageClauses, members]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.every(typeParameters, ts.isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.isArray(members)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateClassExpression = ts.buildOverload("updateClassExpression")
        .overload({
            0(node: ts.ClassExpression, modifiers: readonly ts.ModifierLike[] | undefined, name: ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassExpression {
                return updateClassExpression(node, modifiers, name, typeParameters, heritageClauses, members);
            },

            1(node: ts.ClassExpression, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassExpression {
                return updateClassExpression(node, ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, , name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.every(members, ts.isClassElement)),

            1: ([, , modifiers, name, typeParameters, heritageClauses, members]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.every(typeParameters, ts.isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.isArray(members)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createFunctionDeclaration = ts.buildOverload("createFunctionDeclaration")
        .overload({
            0(modifiers: readonly ts.ModifierLike[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: string | ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.FunctionDeclaration {
                return createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: string | ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.FunctionDeclaration {
                return createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
            },
        })
        .bind({
            0: ([, asteriskToken, name, typeParameters, parameters, type, body, other]) =>
                (other === undefined) &&
                (asteriskToken === undefined || !ts.isArray(asteriskToken)) &&
                (name === undefined || typeof name === "string" || ts.isIdentifier(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (parameters === undefined || ts.every(parameters, ts.isParameter)) &&
                (type === undefined || !ts.isArray(type)) &&
                (body === undefined || ts.isBlock(body)),

            1: ([, modifiers, asteriskToken, name, typeParameters, parameters, type, body]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (asteriskToken === undefined || typeof asteriskToken !== "string" && ts.isAsteriskToken(asteriskToken)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.every(typeParameters, ts.isTypeParameterDeclaration)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateFunctionDeclaration = ts.buildOverload("updateFunctionDeclaration")
        .overload({
            0(node: ts.FunctionDeclaration, modifiers: readonly ts.ModifierLike[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.FunctionDeclaration {
                return updateFunctionDeclaration(node, modifiers, asteriskToken, name, typeParameters, parameters, type, body);
            },

            1(node: ts.FunctionDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, asteriskToken: ts.AsteriskToken | undefined, name: ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined, body: ts.Block | undefined): ts.FunctionDeclaration {
                return updateFunctionDeclaration(node, modifiers, asteriskToken, name, typeParameters, parameters, type, body);
            },
        })
        .bind({
            0: ([, , asteriskToken, name, typeParameters, parameters, type, body, other]) =>
                (other === undefined) &&
                (asteriskToken === undefined || !ts.isArray(asteriskToken)) &&
                (name === undefined || ts.isIdentifier(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (parameters === undefined || ts.every(parameters, ts.isParameter)) &&
                (type === undefined || !ts.isArray(type)) &&
                (body === undefined || ts.isBlock(body)),

            1: ([, , modifiers, asteriskToken, name, typeParameters, parameters, type, body]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (asteriskToken === undefined || typeof asteriskToken !== "string" && ts.isAsteriskToken(asteriskToken)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.every(typeParameters, ts.isTypeParameterDeclaration)) &&
                (parameters === undefined || ts.isArray(parameters)) &&
                (type === undefined || ts.isTypeNode(type)) &&
                (body === undefined || ts.isBlock(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createClassDeclaration = ts.buildOverload("createClassDeclaration")
        .overload({
            0(modifiers: readonly ts.ModifierLike[] | undefined, name: string | ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassDeclaration {
                return createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members);
            },

            1(decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassDeclaration {
                return createClassDeclaration(ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.every(members, ts.isClassElement)),

            1: () => true,
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.updateClassDeclaration = ts.buildOverload("updateClassDeclaration")
        .overload({
            0(node: ts.ClassDeclaration, modifiers: readonly ts.ModifierLike[] | undefined, name: ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassDeclaration {
                return updateClassDeclaration(node, modifiers, name, typeParameters, heritageClauses, members);
            },

            1(node: ts.ClassDeclaration, decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.ClassElement[]): ts.ClassDeclaration {
                return updateClassDeclaration(node, ts.concatenate<ts.ModifierLike>(decorators, modifiers), name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, , name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.every(members, ts.isClassElement)),

            1: ([, , modifiers, name, typeParameters, heritageClauses, members]) =>
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.every(typeParameters, ts.isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.isArray(members)),
        })
        .deprecate({
            1: MUST_MERGE
        })
        .finish();

    factory.createInterfaceDeclaration = ts.buildOverload("createInterfaceDeclaration")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.TypeElement[]): ts.InterfaceDeclaration {
                return createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.TypeElement[]): ts.InterfaceDeclaration {
                return createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([modifiers, name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.every(members, ts.isTypeElement)),

            1: ([decorators, modifiers, name, typeParameters, heritageClauses, members]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.every(typeParameters, ts.isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.every(members, ts.isTypeElement)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateInterfaceDeclaration = ts.buildOverload("updateInterfaceDeclaration")
        .overload({
            0(node: ts.InterfaceDeclaration, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.TypeElement[]): ts.InterfaceDeclaration {
                return updateInterfaceDeclaration(node, modifiers, name, typeParameters, heritageClauses, members);
            },

            1(node: ts.InterfaceDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, heritageClauses: readonly ts.HeritageClause[] | undefined, members: readonly ts.TypeElement[]): ts.InterfaceDeclaration {
                return updateInterfaceDeclaration(node, modifiers, name, typeParameters, heritageClauses, members);
            },
        })
        .bind({
            0: ([, modifiers, name, typeParameters, heritageClauses, members, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.every(members, ts.isTypeElement)),

            1: ([, decorators, modifiers, name, typeParameters, heritageClauses, members]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.every(typeParameters, ts.isTypeParameterDeclaration)) &&
                (heritageClauses === undefined || ts.every(heritageClauses, ts.isHeritageClause)) &&
                (members === undefined || ts.every(members, ts.isTypeElement)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createTypeAliasDeclaration = ts.buildOverload("createTypeAliasDeclaration")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, type: ts.TypeNode): ts.TypeAliasDeclaration {
                return createTypeAliasDeclaration(modifiers, name, typeParameters, type);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, type: ts.TypeNode): ts.TypeAliasDeclaration {
                return createTypeAliasDeclaration(modifiers, name, typeParameters, type);
            },
        })
        .bind({
            0: ([modifiers, name, typeParameters, type, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (type === undefined || !ts.isArray(type)),

            1: ([decorators, modifiers, name, typeParameters, type]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (type === undefined || ts.isTypeNode(type)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateTypeAliasDeclaration = ts.buildOverload("updateTypeAliasDeclaration")
        .overload({
            0(node: ts.TypeAliasDeclaration, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, type: ts.TypeNode): ts.TypeAliasDeclaration {
                return updateTypeAliasDeclaration(node, modifiers, name, typeParameters, type);
            },

            1(node: ts.TypeAliasDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, type: ts.TypeNode): ts.TypeAliasDeclaration {
                return updateTypeAliasDeclaration(node, modifiers, name, typeParameters, type);
            },
        })
        .bind({
            0: ([, modifiers, name, typeParameters, type, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (type === undefined || !ts.isArray(type)),

            1: ([, decorators, modifiers, name, typeParameters, type]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (typeParameters === undefined || ts.isArray(typeParameters)) &&
                (type === undefined || ts.isTypeNode(type)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createEnumDeclaration = ts.buildOverload("createEnumDeclaration")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, members: readonly ts.EnumMember[]): ts.EnumDeclaration {
                return createEnumDeclaration(modifiers, name, members);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, members: readonly ts.EnumMember[]): ts.EnumDeclaration {
                return createEnumDeclaration(modifiers, name, members);
            },
        })
        .bind({
            0: ([modifiers, name, members, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (name === undefined || !ts.isArray(name)) &&
                (members === undefined || ts.isArray(members)),

            1: ([decorators, modifiers, name, members]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (members === undefined || ts.isArray(members)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateEnumDeclaration = ts.buildOverload("updateEnumDeclaration")
        .overload({
            0(node: ts.EnumDeclaration, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, members: readonly ts.EnumMember[]): ts.EnumDeclaration {
                return updateEnumDeclaration(node, modifiers, name, members);
            },

            1(node: ts.EnumDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, members: readonly ts.EnumMember[]): ts.EnumDeclaration {
                return updateEnumDeclaration(node, modifiers, name, members);
            },
        })
        .bind({
            0: ([, modifiers, name, members, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (name === undefined || !ts.isArray(name)) &&
                (members === undefined || ts.isArray(members)),

            1: ([, decorators, modifiers, name, members]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name === undefined || !ts.isArray(name)) &&
                (members === undefined || ts.isArray(members)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createModuleDeclaration = ts.buildOverload("createModuleDeclaration")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, name: ts.ModuleName, body: ts.ModuleBody | undefined, flags?: ts.NodeFlags): ts.ModuleDeclaration {
                return createModuleDeclaration(modifiers, name, body, flags);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.ModuleName, body: ts.ModuleBody | undefined, flags?: ts.NodeFlags): ts.ModuleDeclaration {
                return createModuleDeclaration(modifiers, name, body, flags);
            },
        })
        .bind({
            0: ([modifiers, name, body, flags, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (name !== undefined && !ts.isArray(name)) &&
                (body === undefined || ts.isModuleBody(body)) &&
                (flags === undefined || typeof flags === "number"),

            1: ([decorators, modifiers, name, body, flags]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name !== undefined && ts.isModuleName(name)) &&
                (body === undefined || typeof body === "object") &&
                (flags === undefined || typeof flags === "number"),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateModuleDeclaration = ts.buildOverload("updateModuleDeclaration")
        .overload({
            0(node: ts.ModuleDeclaration, modifiers: readonly ts.Modifier[] | undefined, name: ts.ModuleName, body: ts.ModuleBody | undefined): ts.ModuleDeclaration {
                return updateModuleDeclaration(node, modifiers, name, body);
            },

            1(node: ts.ModuleDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, name: ts.ModuleName, body: ts.ModuleBody | undefined): ts.ModuleDeclaration {
                return updateModuleDeclaration(node, modifiers, name, body);
            },
        })
        .bind({
            0: ([, modifiers, name, body, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (name === undefined || !ts.isArray(name)) &&
                (body === undefined || ts.isModuleBody(body)),

            1: ([, decorators, modifiers, name, body]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (name !== undefined && ts.isModuleName(name)) &&
                (body === undefined || ts.isModuleBody(body)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createImportEqualsDeclaration = ts.buildOverload("createImportEqualsDeclaration")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, name: string | ts.Identifier, moduleReference: ts.ModuleReference): ts.ImportEqualsDeclaration {
                return createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, name: string | ts.Identifier, moduleReference: ts.ModuleReference): ts.ImportEqualsDeclaration {
                return createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference);
            },
        })
        .bind({
            0: ([modifiers, isTypeOnly, name, moduleReference, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (isTypeOnly === undefined || typeof isTypeOnly === "boolean") &&
                (typeof name !== "boolean") &&
                (typeof moduleReference !== "string"),

            1: ([decorators, modifiers, isTypeOnly, name, moduleReference]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (isTypeOnly === undefined || typeof isTypeOnly === "boolean") &&
                (typeof name === "string" || ts.isIdentifier(name)) &&
                (moduleReference !== undefined && ts.isModuleReference(moduleReference)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateImportEqualsDeclaration = ts.buildOverload("updateImportEqualsDeclaration")
        .overload({
            0(node: ts.ImportEqualsDeclaration, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, name: ts.Identifier, moduleReference: ts.ModuleReference): ts.ImportEqualsDeclaration {
                return updateImportEqualsDeclaration(node, modifiers, isTypeOnly, name, moduleReference);
            },

            1(node: ts.ImportEqualsDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, name: ts.Identifier, moduleReference: ts.ModuleReference): ts.ImportEqualsDeclaration {
                return updateImportEqualsDeclaration(node, modifiers, isTypeOnly, name, moduleReference);
            },
        })
        .bind({
            0: ([, modifiers, isTypeOnly, name, moduleReference, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (isTypeOnly === undefined || typeof isTypeOnly === "boolean") &&
                (typeof name !== "boolean") &&
                (typeof moduleReference !== "string"),

            1: ([, decorators, modifiers, isTypeOnly, name, moduleReference]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (isTypeOnly === undefined || typeof isTypeOnly === "boolean") &&
                (typeof name === "string" || ts.isIdentifier(name)) &&
                (moduleReference !== undefined && ts.isModuleReference(moduleReference)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createImportDeclaration = ts.buildOverload("createImportDeclaration")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, importClause: ts.ImportClause | undefined, moduleSpecifier: ts.Expression, assertClause?: ts.AssertClause): ts.ImportDeclaration {
                return createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, importClause: ts.ImportClause | undefined, moduleSpecifier: ts.Expression, assertClause?: ts.AssertClause): ts.ImportDeclaration {
                return createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause);
            },
        })
        .bind({
            0: ([modifiers, importClause, moduleSpecifier, assertClause, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (importClause === undefined || !ts.isArray(importClause)) &&
                (moduleSpecifier !== undefined && ts.isExpression(moduleSpecifier)) &&
                (assertClause === undefined || ts.isAssertClause(assertClause)),

            1: ([decorators, modifiers, importClause, moduleSpecifier, assertClause]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (importClause === undefined || ts.isImportClause(importClause)) &&
                (moduleSpecifier !== undefined && ts.isExpression(moduleSpecifier)) &&
                (assertClause === undefined || ts.isAssertClause(assertClause)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateImportDeclaration = ts.buildOverload("updateImportDeclaration")
        .overload({
            0(node: ts.ImportDeclaration, modifiers: readonly ts.Modifier[] | undefined, importClause: ts.ImportClause | undefined, moduleSpecifier: ts.Expression, assertClause: ts.AssertClause | undefined): ts.ImportDeclaration {
                return updateImportDeclaration(node, modifiers, importClause, moduleSpecifier, assertClause);
            },

            1(node: ts.ImportDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, importClause: ts.ImportClause | undefined, moduleSpecifier: ts.Expression, assertClause: ts.AssertClause | undefined): ts.ImportDeclaration {
                return updateImportDeclaration(node, modifiers, importClause, moduleSpecifier, assertClause);
            },
        })
        .bind({
            0: ([, modifiers, importClause, moduleSpecifier, assertClause, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (importClause === undefined || !ts.isArray(importClause)) &&
                (moduleSpecifier === undefined || ts.isExpression(moduleSpecifier)) &&
                (assertClause === undefined || ts.isAssertClause(assertClause)),

            1: ([, decorators, modifiers, importClause, moduleSpecifier, assertClause]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (importClause === undefined || ts.isImportClause(importClause)) &&
                (moduleSpecifier !== undefined && ts.isExpression(moduleSpecifier)) &&
                (assertClause === undefined || ts.isAssertClause(assertClause)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createExportAssignment = ts.buildOverload("createExportAssignment")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, isExportEquals: boolean | undefined, expression: ts.Expression): ts.ExportAssignment {
                return createExportAssignment(modifiers, isExportEquals, expression);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isExportEquals: boolean | undefined, expression: ts.Expression): ts.ExportAssignment {
                return createExportAssignment(modifiers, isExportEquals, expression);
            },
        })
        .bind({
            0: ([modifiers, isExportEquals, expression, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (isExportEquals === undefined || typeof isExportEquals === "boolean") &&
                (typeof expression === "object"),

            1: ([decorators, modifiers, isExportEquals, expression]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (isExportEquals === undefined || typeof isExportEquals === "boolean") &&
                (expression !== undefined && ts.isExpression(expression)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateExportAssignment = ts.buildOverload("updateExportAssignment")
        .overload({
            0(node: ts.ExportAssignment, modifiers: readonly ts.Modifier[] | undefined, expression: ts.Expression): ts.ExportAssignment {
                return updateExportAssignment(node, modifiers, expression);
            },

            1(node: ts.ExportAssignment, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, expression: ts.Expression): ts.ExportAssignment {
                return updateExportAssignment(node, modifiers, expression);
            },
        })
        .bind({
            0: ([, modifiers, expression, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (expression !== undefined && !ts.isArray(expression)),

            1: ([, decorators, modifiers, expression]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (expression !== undefined && ts.isExpression(expression)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.createExportDeclaration = ts.buildOverload("createExportDeclaration")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, exportClause: ts.NamedExportBindings | undefined, moduleSpecifier?: ts.Expression, assertClause?: ts.AssertClause): ts.ExportDeclaration {
                return createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
            },

            1(_decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, exportClause: ts.NamedExportBindings | undefined, moduleSpecifier?: ts.Expression, assertClause?: ts.AssertClause): ts.ExportDeclaration {
                return createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
            },
        })
        .bind({
            0: ([modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (typeof isTypeOnly === "boolean") &&
                (typeof exportClause !== "boolean") &&
                (moduleSpecifier === undefined || ts.isExpression(moduleSpecifier)) &&
                (assertClause === undefined || ts.isAssertClause(assertClause)),

            1: ([decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (typeof isTypeOnly === "boolean") &&
                (exportClause === undefined || ts.isNamedExportBindings(exportClause)) &&
                (moduleSpecifier === undefined || ts.isExpression(moduleSpecifier)) &&
                (assertClause === undefined || ts.isAssertClause(assertClause)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();

    factory.updateExportDeclaration = ts.buildOverload("updateExportDeclaration")
        .overload({
            0(node: ts.ExportDeclaration, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, exportClause: ts.NamedExportBindings | undefined, moduleSpecifier: ts.Expression | undefined, assertClause: ts.AssertClause | undefined): ts.ExportDeclaration {
                return updateExportDeclaration(node, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
            },

            1(node: ts.ExportDeclaration, _decorators: readonly ts.Decorator[] | undefined, modifiers: readonly ts.Modifier[] | undefined, isTypeOnly: boolean, exportClause: ts.NamedExportBindings | undefined, moduleSpecifier: ts.Expression | undefined, assertClause: ts.AssertClause | undefined): ts.ExportDeclaration {
                return updateExportDeclaration(node, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
            },
        })
        .bind({
            0: ([, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause, other]) =>
                (other === undefined) &&
                (modifiers === undefined || ts.every(modifiers, ts.isModifier)) &&
                (typeof isTypeOnly === "boolean") &&
                (typeof exportClause !== "boolean") &&
                (moduleSpecifier === undefined || ts.isExpression(moduleSpecifier)) &&
                (assertClause === undefined || ts.isAssertClause(assertClause)),

            1: ([, decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause]) =>
                (decorators === undefined || ts.every(decorators, ts.isDecorator)) &&
                (modifiers === undefined || ts.isArray(modifiers)) &&
                (typeof isTypeOnly === "boolean") &&
                (exportClause === undefined || ts.isNamedExportBindings(exportClause)) &&
                (moduleSpecifier === undefined || ts.isExpression(moduleSpecifier)) &&
                (assertClause === undefined || ts.isAssertClause(assertClause)),
        })
        .deprecate({
            1: DISALLOW_DECORATORS
        })
        .finish();
}

// Patch `createNodeFactory` because it creates the factories that are provided to transformers
// in the public API.
ts.addNodeFactoryPatcher(patchNodeFactory);

// Patch `ts.factory` because its public
patchNodeFactory(ts.factory);
