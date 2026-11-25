import * as ast from "@typescript/typescript/ast";
import * as factory from "@typescript/typescript/ast/factory";
import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { API } from "./sync/api.testUtils.ts";
import { createVirtualFileSystem } from "./testUtils.ts";

function createAPI(): API {
    return new API({
        cwd: fileURLToPath(new URL("../../../", import.meta.url)),
        tsserverPath: fileURLToPath(new URL(`../../../built/local/tsc${process.platform === "win32" ? ".exe" : ""}`, import.meta.url)),
        fs: createVirtualFileSystem({}),
    });
}

test("node property predicates require a value", () => {
    const node = Object.create({
        expression: undefined,
        initializer: undefined,
        objectAssignmentInitializer: undefined,
    }) as ast.Node;
    assert.equal(ast.hasExpression(node), false);
    assert.equal(ast.hasInitializer(node), false);
    assert.equal(ast.hasObjectAssignmentInitializer(node), false);

    const expression = factory.createIdentifier("value");
    assert.ok(ast.hasExpression(factory.createExpressionStatement(expression)));
    assert.ok(ast.hasInitializer(factory.createVariableDeclaration(factory.createIdentifier("name"), /*exclamationToken*/ undefined, /*type*/ undefined, expression)));
    assert.ok(ast.hasObjectAssignmentInitializer(factory.createShorthandPropertyAssignment(
        /*modifiers*/ undefined,
        factory.createIdentifier("name"),
        /*postfixToken*/ undefined,
        /*type*/ undefined,
        /*equalsToken*/ undefined,
        expression,
    )));
});

test("type-only alias use recognizes syntactic abstract modifiers", () => {
    const name = factory.createIdentifier("key");
    const computed = factory.createComputedPropertyName(name);
    const member = {
        kind: ast.SyntaxKind.MethodDeclaration,
        modifiers: [factory.createToken(ast.SyntaxKind.AbstractKeyword)],
        parent: { kind: ast.SyntaxKind.ClassDeclaration },
    };
    Object.defineProperty(name, "parent", { value: computed });
    Object.defineProperty(computed, "parent", { value: member });
    assert.equal(ast.isValidTypeOnlyAliasUseSite(name), true);
    member.modifiers = [];
    assert.equal(ast.isValidTypeOnlyAliasUseSite(name), false);
});

test("AST predicates read properties independently of proxy membership", () => {
    const declaration = factory.createFunctionDeclaration(
        [factory.createToken(ast.SyntaxKind.ExportKeyword)],
        /*asteriskToken*/ undefined,
        /*name*/ undefined,
        /*typeParameters*/ undefined,
        [],
    );
    const proxiedDeclaration = new Proxy(declaration, { has: () => false });
    assert.equal(ast.getCombinedModifierFlags(proxiedDeclaration), ast.ModifierFlags.Export);

    const tag = factory.createIdentifier("Component");
    const parent = new Proxy({ kind: ast.SyntaxKind.JsxOpeningElement, tagName: tag }, { has: () => false });
    Object.defineProperty(tag, "parent", { value: parent });
    assert.equal(ast.isValidTypeOnlyAliasUseSite(tag), false);

    const exportsName = new Proxy(factory.createIdentifier("exports"), { has: () => false });
    const access = factory.createPropertyAccessExpression(factory.createIdentifier("module"), /*questionDotToken*/ undefined, exportsName, ast.NodeFlags.JavaScriptFile);
    const assignment = factory.createBinaryExpression(/*modifiers*/ undefined, access, /*type*/ undefined, factory.createToken(ast.SyntaxKind.EqualsToken), factory.createIdentifier("value"));
    assert.equal(ast.getNameOfDeclaration(assignment), undefined);
});

test("isAutoAccessorPropertyDeclaration distinguishes accessor modifiers from accessors", () => {
    const name = factory.createIdentifier("value");
    const property: ast.Node = factory.createPropertyDeclaration([factory.createToken(ast.SyntaxKind.AccessorKeyword)], name);
    assert.ok(ast.isAutoAccessorPropertyDeclaration(property));
    const narrowed: ast.AutoAccessorPropertyDeclaration = property;
    assert.equal(narrowed.name, name);
    assert.equal(ast.isAutoAccessorPropertyDeclaration(factory.createPropertyDeclaration(/*modifiers*/ undefined, name)), false);
    assert.equal(ast.isAutoAccessorPropertyDeclaration(factory.createGetAccessorDeclaration(/*modifiers*/ undefined, name, /*typeParameters*/ undefined, [])), false);
    const ordinary = factory.createPropertyDeclaration(/*modifiers*/ undefined, name);
    if (!ast.isAutoAccessorPropertyDeclaration(ordinary)) {
        assert.equal(ordinary.name, name);
    }
});

test("isCallChain recognizes continuations without a question-dot token", () => {
    const name = factory.createIdentifier("f");
    const call: ast.Node = factory.createCallExpression(name, /*questionDotToken*/ undefined, /*typeArguments*/ undefined, [], ast.NodeFlags.OptionalChain);
    assert.ok(ast.isCallChain(call));
    const narrowed: ast.CallChain = call;
    assert.equal(narrowed.questionDotToken, undefined);
    const ordinary = factory.createCallExpression(name, /*questionDotToken*/ undefined, /*typeArguments*/ undefined, [], ast.NodeFlags.None);
    if (!ast.isCallChain(ordinary)) {
        assert.equal(ordinary.arguments.length, 0);
    }
    assert.equal(ast.isCallChain(ordinary), false);
    assert.equal(ast.isCallChain(factory.createNonNullExpression(name, ast.NodeFlags.OptionalChain)), false);
});

test("isClassElement includes static blocks and index signatures but not interface properties", () => {
    const signature: ast.Node = factory.createIndexSignatureDeclaration(/*modifiers*/ undefined, []);
    assert.ok(ast.isClassElement(signature));
    const narrowed: ast.ClassElement = signature;
    assert.equal(narrowed, signature);
    assert.ok(ast.isClassElement(factory.createClassStaticBlockDeclaration(/*modifiers*/ undefined, factory.createBlock([]))));
    assert.equal(ast.isClassElement(factory.createPropertySignatureDeclaration(/*modifiers*/ undefined, factory.createIdentifier("x"))), false);
});

test("isConstTypeReference rejects qualified names and even empty type argument lists", () => {
    const name = factory.createIdentifier("const");
    const reference = factory.createTypeReferenceNode(name);
    assert.ok(ast.isConstTypeReference(reference));
    assert.equal(reference.typeName, name);
    assert.equal(ast.isConstTypeReference(factory.createTypeReferenceNode(name, [])), false);
    assert.equal(ast.isConstTypeReference(factory.createTypeReferenceNode(factory.createQualifiedName(factory.createIdentifier("ns"), name))), false);
    assert.equal(ast.isConstTypeReference(factory.createIdentifier("const")), false);
});

test("isDeclarationStatement does not classify variable statements as declaration statements", () => {
    const declaration: ast.Node = factory.createExportDeclaration();
    assert.ok(ast.isDeclarationStatement(declaration));
    const narrowed: ast.Statement & ast.Declaration = declaration;
    assert.equal(narrowed, declaration);
    assert.ok(ast.isDeclarationStatement(factory.createMissingDeclaration()));
    assert.equal(ast.isDeclarationStatement(factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([], ast.NodeFlags.Const))), false);
    assert.equal(ast.isDeclarationStatement(factory.createBlock([])), false);
});

test("isDeclarationStatement includes declarations produced by JavaScript JSDoc", () => {
    using api = createAPI();
    const source = api.createSourceFile(
        "/declarations.js",
        `/** @typedef {string} Name */
/** @callback Callback
 * @returns {void}
 */
/** @import { Value } from "./types" */
`,
    ).sourceFile;
    const declarations = source.statements.filter(node => node.kind === ast.SyntaxKind.JSTypeAliasDeclaration || node.kind === ast.SyntaxKind.JSImportDeclaration);
    assert.deepEqual(declarations.map(node => node.kind), [
        ast.SyntaxKind.JSTypeAliasDeclaration,
        ast.SyntaxKind.JSTypeAliasDeclaration,
        ast.SyntaxKind.JSImportDeclaration,
    ]);
    assert.ok(declarations.every(ast.isDeclarationStatement));
});

test("isElementAccessChain uses the chain flag rather than the question-dot token", () => {
    const name = factory.createIdentifier("obj");
    const index = factory.createStringLiteral("key", ast.TokenFlags.None);
    const access: ast.Node = factory.createElementAccessExpression(name, /*questionDotToken*/ undefined, index, ast.NodeFlags.OptionalChain);
    assert.ok(ast.isElementAccessChain(access));
    const narrowed: ast.ElementAccessChain = access;
    assert.equal(narrowed.argumentExpression, index);
    assert.equal(ast.isElementAccessChain(factory.createElementAccessExpression(name, /*questionDotToken*/ undefined, index, ast.NodeFlags.None)), false);
    assert.equal(ast.isElementAccessChain(factory.createPropertyAccessExpression(name, /*questionDotToken*/ undefined, name, ast.NodeFlags.OptionalChain)), false);
});

test("isEmptyBindingElement recursively distinguishes bindings from empty nested patterns", () => {
    const empty = factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, factory.createObjectBindingPattern([]));
    assert.ok(ast.isEmptyBindingElement(empty));
    assert.ok(ast.isEmptyBindingElement(factory.createOmittedExpression()));
    assert.ok(ast.isEmptyBindingElement(factory.createBindingElement()));
    const binding = factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, factory.createIdentifier("value"));
    assert.equal(ast.isEmptyBindingElement(binding), false);
    assert.equal(ast.isEmptyBindingElement(factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, factory.createArrayBindingPattern([binding]))), false);
});

test("isEmptyBindingElement recognizes parsed array-binding holes", () => {
    using api = createAPI();
    const source = api.createSourceFile("/holes.ts", "const [, , value] = values;").sourceFile;
    const statement = source.statements[0];
    assert.ok(ast.isVariableStatement(statement));
    const pattern = statement.declarationList.declarations[0].name;
    assert.ok(ast.isArrayBindingPattern(pattern));
    assert.deepEqual(pattern.elements.map(element => element.kind), [
        ast.SyntaxKind.BindingElement,
        ast.SyntaxKind.BindingElement,
        ast.SyntaxKind.BindingElement,
    ]);
    assert.deepEqual(pattern.elements.map(ast.isEmptyBindingElement), [true, true, false]);
});

test("isEmptyBindingPattern accepts nested empty patterns but not identifiers", () => {
    const nested: ast.BindingName = factory.createArrayBindingPattern([
        factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, factory.createObjectBindingPattern([])),
    ]);
    assert.ok(ast.isEmptyBindingPattern(nested));
    const narrowed: ast.EmptyBindingPattern = nested;
    assert.equal(narrowed.elements.length, 1);
    assert.equal(ast.isEmptyBindingPattern(factory.createIdentifier("value")), false);
    assert.equal(
        ast.isEmptyBindingPattern(factory.createObjectBindingPattern([
            factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, factory.createIdentifier("value")),
        ])),
        false,
    );
    const nonempty = factory.createObjectBindingPattern([
        factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, factory.createIdentifier("value")),
    ]);
    if (!ast.isEmptyBindingPattern(nonempty)) {
        assert.equal(nonempty.elements.length, 1);
    }
});

test("isEmptyBindingPattern accepts parsed hole-only and nested empty patterns", () => {
    using api = createAPI();
    const source = api.createSourceFile(
        "/patterns.ts",
        "const [,] = values; const [, [,], {}] = values; const [, value] = values;",
    ).sourceFile;
    const patterns = source.statements.filter(ast.isVariableStatement).map(statement => statement.declarationList.declarations[0].name);
    assert.deepEqual(patterns.map(ast.isEmptyBindingPattern), [true, true, false]);
});

test("isFunctionLike includes signatures and JSDoc callbacks, not only functions with bodies", () => {
    const signature: ast.Node | undefined = factory.createCallSignatureDeclaration(/*typeParameters*/ undefined, []);
    assert.ok(ast.isFunctionLike(signature));
    const narrowed: ast.SignatureDeclaration | ast.JSDocSignature = signature;
    assert.equal(narrowed.parameters.length, 0);
    assert.ok(ast.isFunctionLike(factory.createJSDocSignature(/*typeParameters*/ undefined, [])));
    assert.ok(ast.isFunctionLike(factory.createFunctionTypeNode(/*typeParameters*/ undefined, [], factory.createKeywordTypeNode(ast.SyntaxKind.VoidKeyword))));
    assert.equal(ast.isFunctionLike(/*node*/ undefined), false);
    assert.equal(ast.isFunctionLike(factory.createClassStaticBlockDeclaration(/*modifiers*/ undefined, factory.createBlock([]))), false);
});

test("isFunctionOrConstructorTypeNode excludes callable declaration signatures", () => {
    const result = factory.createKeywordTypeNode(ast.SyntaxKind.VoidKeyword);
    const type: ast.Node = factory.createFunctionTypeNode(/*typeParameters*/ undefined, [], result);
    assert.ok(ast.isFunctionOrConstructorTypeNode(type));
    const narrowed: ast.FunctionTypeNode | ast.ConstructorTypeNode = type;
    assert.equal(narrowed.type, result);
    assert.ok(ast.isFunctionOrConstructorTypeNode(factory.createConstructorTypeNode(/*modifiers*/ undefined, /*typeParameters*/ undefined, [], result)));
    assert.equal(ast.isFunctionOrConstructorTypeNode(factory.createCallSignatureDeclaration(/*typeParameters*/ undefined, [])), false);
});

test("isImportOrExportSpecifier distinguishes named specifiers from namespace imports", () => {
    const name = factory.createIdentifier("value");
    const specifier: ast.Node = factory.createImportSpecifier(/*isTypeOnly*/ true, /*propertyName*/ undefined, name);
    assert.ok(ast.isImportOrExportSpecifier(specifier));
    const narrowed: ast.ImportSpecifier | ast.ExportSpecifier = specifier;
    assert.equal(narrowed.isTypeOnly, true);
    assert.ok(ast.isImportOrExportSpecifier(factory.createExportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, name)));
    assert.equal(ast.isImportOrExportSpecifier(factory.createNamespaceImport(name)), false);
});

test("isIterationStatement follows labels only when requested", () => {
    const empty = factory.createEmptyStatement();
    const loop: ast.Node = factory.createWhileStatement(factory.createIdentifier("condition"), empty);
    assert.ok(ast.isIterationStatement(loop, /*lookInLabeledStatements*/ false));
    const narrowed: ast.DoStatement | ast.WhileStatement | ast.ForStatement | ast.ForInStatement | ast.ForOfStatement = loop;
    assert.equal(narrowed.statement, empty);
    const labeled = factory.createLabeledStatement(factory.createIdentifier("outer"), factory.createLabeledStatement(factory.createIdentifier("inner"), loop));
    assert.equal(ast.isIterationStatement(labeled, /*lookInLabeledStatements*/ false), false);
    assert.equal(ast.isIterationStatement(labeled, /*lookInLabeledStatements*/ true), true);
    assert.equal(ast.isIterationStatement(factory.createLabeledStatement(factory.createIdentifier("label"), empty), /*lookInLabeledStatements*/ true), false);
});

test("isJsxCallLike includes opening fragments but excludes complete fragments", () => {
    const opening: ast.Node = factory.createJsxOpeningFragment();
    assert.ok(ast.isJsxCallLike(opening));
    const narrowed: ast.JsxOpeningElement | ast.JsxSelfClosingElement | ast.JsxOpeningFragment = opening;
    assert.equal(narrowed, opening);
    assert.ok(ast.isJsxCallLike(factory.createJsxSelfClosingElement(factory.createIdentifier("Component"), /*typeArguments*/ undefined, factory.createJsxAttributes([]))));
    assert.equal(ast.isJsxCallLike(factory.createJsxFragment(factory.createJsxOpeningFragment(), [], factory.createJsxClosingFragment())), false);
});

test("isNonNullChain distinguishes optional-chain assertions from ordinary assertions", () => {
    const name = factory.createIdentifier("value");
    const assertion: ast.Node = factory.createNonNullExpression(name, ast.NodeFlags.OptionalChain);
    assert.ok(ast.isNonNullChain(assertion));
    const narrowed: ast.NonNullChain = assertion;
    assert.equal(narrowed.expression, name);
    assert.equal(ast.isNonNullChain(factory.createNonNullExpression(name, ast.NodeFlags.None)), false);
    assert.equal(ast.isNonNullChain(factory.createCallExpression(name, /*questionDotToken*/ undefined, /*typeArguments*/ undefined, [], ast.NodeFlags.OptionalChain)), false);
});

test("isNullishCoalesce distinguishes nullish coalescing from logical OR", () => {
    const name = factory.createIdentifier("value");
    const expression = factory.createBinaryExpression(/*modifiers*/ undefined, name, /*type*/ undefined, factory.createToken(ast.SyntaxKind.QuestionQuestionToken), name);
    assert.ok(ast.isNullishCoalesce(expression));
    assert.equal(expression.left, name);
    assert.equal(ast.isNullishCoalesce(factory.createBinaryExpression(/*modifiers*/ undefined, name, /*type*/ undefined, factory.createToken(ast.SyntaxKind.BarBarToken), name)), false);
    assert.equal(ast.isNullishCoalesce(name), false);
});

test("isObjectLiteralElement includes JSX attributes as well as object spreads", () => {
    const name = factory.createIdentifier("value");
    const attribute: ast.Node = factory.createJsxAttribute(name);
    assert.ok(ast.isObjectLiteralElement(attribute));
    const narrowed: ast.ObjectLiteralElementLike | ast.JsxAttributeLike = attribute;
    assert.equal(narrowed, attribute);
    assert.ok(ast.isObjectLiteralElement(factory.createJsxSpreadAttribute(name)));
    assert.ok(ast.isObjectLiteralElement(factory.createSpreadAssignment(name)));
    assert.equal(ast.isObjectLiteralElement(factory.createPropertyDeclaration(/*modifiers*/ undefined, name)), false);
});

test("isOptionalChain includes non-null continuations but rejects flagged unrelated nodes", () => {
    const name = factory.createIdentifier("value");
    const chain: ast.Node = factory.createNonNullExpression(name, ast.NodeFlags.OptionalChain);
    assert.ok(ast.isOptionalChain(chain));
    const narrowed: ast.OptionalChain = chain;
    assert.equal(narrowed.expression, name);
    assert.ok(ast.isOptionalChain(factory.createCallExpression(name, /*questionDotToken*/ undefined, /*typeArguments*/ undefined, [], ast.NodeFlags.OptionalChain)));
    assert.equal(ast.isOptionalChain(factory.createNonNullExpression(name, ast.NodeFlags.None)), false);
    const unrelated = factory.createParenthesizedExpression(name);
    Object.defineProperty(unrelated, "flags", { value: ast.NodeFlags.OptionalChain });
    assert.equal(ast.isOptionalChain(unrelated), false);
});

test("isParameterPropertyDeclaration requires both a property modifier and a constructor", () => {
    const name = factory.createIdentifier("value");
    const constructor = factory.createConstructorDeclaration(/*modifiers*/ undefined, /*typeParameters*/ undefined, []);
    const parameter: ast.Node = factory.createParameterDeclaration([factory.createToken(ast.SyntaxKind.ReadonlyKeyword)], /*dotDotDotToken*/ undefined, name);
    assert.ok(ast.isParameterPropertyDeclaration(parameter, constructor));
    const narrowed: ast.ParameterPropertyDeclaration = parameter;
    assert.equal(narrowed.name, name);
    assert.equal(ast.isParameterPropertyDeclaration(parameter, factory.createFunctionDeclaration(/*modifiers*/ undefined, /*asteriskToken*/ undefined, /*name*/ undefined, /*typeParameters*/ undefined, [])), false);
    assert.equal(ast.isParameterPropertyDeclaration(factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, name), constructor), false);
    assert.equal(ast.isParameterPropertyDeclaration(factory.createPropertyDeclaration(/*modifiers*/ undefined, name), constructor), false);
});

test("isPropertyAccessChain includes chain continuations without their own question-dot token", () => {
    const name = factory.createIdentifier("value");
    const access: ast.Node = factory.createPropertyAccessExpression(name, /*questionDotToken*/ undefined, name, ast.NodeFlags.OptionalChain);
    assert.ok(ast.isPropertyAccessChain(access));
    const narrowed: ast.PropertyAccessChain = access;
    assert.equal(narrowed.name, name);
    assert.equal(ast.isPropertyAccessChain(factory.createPropertyAccessExpression(name, /*questionDotToken*/ undefined, name, ast.NodeFlags.None)), false);
    assert.equal(ast.isPropertyAccessChain(factory.createElementAccessExpression(name, /*questionDotToken*/ undefined, name, ast.NodeFlags.OptionalChain)), false);
});

test("isPropertyAccessOrQualifiedName accepts entity names and expressions, not element access", () => {
    const name = factory.createIdentifier("value");
    const qualified: ast.Node = factory.createQualifiedName(name, name);
    assert.ok(ast.isPropertyAccessOrQualifiedName(qualified));
    const narrowed: ast.PropertyAccessExpression | ast.QualifiedName = qualified;
    assert.equal(narrowed, qualified);
    assert.ok(ast.isPropertyAccessOrQualifiedName(factory.createPropertyAccessExpression(name, /*questionDotToken*/ undefined, name, ast.NodeFlags.None)));
    assert.equal(ast.isPropertyAccessOrQualifiedName(factory.createElementAccessExpression(name, /*questionDotToken*/ undefined, name, ast.NodeFlags.None)), false);
});

test("isRestParameter supports syntactic rest parameters and JSDoc variadic types", () => {
    const name = factory.createIdentifier("values");
    const type = factory.createJSDocVariadicType(factory.createKeywordTypeNode(ast.SyntaxKind.StringKeyword));
    assert.ok(ast.isRestParameter(factory.createParameterDeclaration(/*modifiers*/ undefined, factory.createToken(ast.SyntaxKind.DotDotDotToken), name)));
    assert.ok(ast.isRestParameter(factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, name, /*questionToken*/ undefined, type)));
    assert.ok(ast.isRestParameter(factory.createJSDocParameterTag(factory.createIdentifier("param"), name, /*isBracketed*/ false, type, /*isNameFirst*/ false, /*comment*/ undefined)));
    assert.ok(ast.isRestParameter(factory.createJSDocParameterTag(factory.createIdentifier("param"), name, /*isBracketed*/ false, factory.createJSDocTypeExpression(type), /*isNameFirst*/ false, /*comment*/ undefined)));
    assert.equal(ast.isRestParameter(factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, name)), false);
    assert.equal(ast.isRestParameter(factory.createJSDocParameterTag(factory.createIdentifier("param"), name, /*isBracketed*/ false, /*typeExpression*/ undefined, /*isNameFirst*/ false, /*comment*/ undefined)), false);
});

test("isStringLiteralOrJsxExpression excludes template literals and full JSX elements", () => {
    const expression: ast.Node = factory.createJsxExpression();
    assert.ok(ast.isStringLiteralOrJsxExpression(expression));
    const narrowed: ast.StringLiteral | ast.JsxExpression = expression;
    assert.equal(narrowed, expression);
    assert.ok(ast.isStringLiteralOrJsxExpression(factory.createStringLiteral("text", ast.TokenFlags.None)));
    assert.equal(ast.isStringLiteralOrJsxExpression(factory.createNoSubstitutionTemplateLiteral("text", ast.TokenFlags.None)), false);
    assert.equal(ast.isStringLiteralOrJsxExpression(factory.createJsxOpeningFragment()), false);
});

test("isStringTextContainingNode includes template fragments but not template expressions", () => {
    const head: ast.Node = factory.createTemplateHead("text", "text", ast.TokenFlags.None);
    assert.ok(ast.isStringTextContainingNode(head));
    const narrowed: ast.StringLiteral | ast.TemplateLiteralToken = head;
    assert.equal(narrowed.text, "text");
    assert.ok(ast.isStringTextContainingNode(factory.createTemplateMiddle("middle", "middle", ast.TokenFlags.None)));
    assert.ok(ast.isStringTextContainingNode(factory.createTemplateTail("tail", "tail", ast.TokenFlags.None)));
    assert.ok(ast.isStringTextContainingNode(factory.createNoSubstitutionTemplateLiteral("text", ast.TokenFlags.None)));
    assert.ok(ast.isStringTextContainingNode(factory.createStringLiteral("text", ast.TokenFlags.None)));
    assert.equal(ast.isStringTextContainingNode(factory.createTemplateExpression(factory.createTemplateHead("", "", ast.TokenFlags.None), [])), false);
});

test("isTypeElement includes accessors and synthetic elisions but excludes method declarations", () => {
    const name = factory.createIdentifier("value");
    const accessor: ast.Node = factory.createGetAccessorDeclaration(/*modifiers*/ undefined, name, /*typeParameters*/ undefined, []);
    assert.ok(ast.isTypeElement(accessor));
    const narrowed: ast.TypeElement = accessor;
    assert.equal(narrowed, accessor);
    assert.ok(ast.isTypeElement(factory.createNotEmittedTypeElement()));
    assert.ok(ast.isTypeElement(factory.createCallSignatureDeclaration(/*typeParameters*/ undefined, [])));
    assert.equal(ast.isTypeElement(factory.createMethodDeclaration(/*modifiers*/ undefined, /*asteriskToken*/ undefined, name, /*postfixToken*/ undefined, /*typeParameters*/ undefined, [])), false);
});

test("isClassOrTypeElement unifies class-only and type-only members", () => {
    const member: ast.Node = factory.createClassStaticBlockDeclaration(/*modifiers*/ undefined, factory.createBlock([]));
    assert.ok(ast.isClassOrTypeElement(member));
    const narrowed: ast.ClassElement | ast.TypeElement = member;
    assert.equal(narrowed, member);
    assert.ok(ast.isClassOrTypeElement(factory.createCallSignatureDeclaration(/*typeParameters*/ undefined, [])));
    assert.equal(ast.isClassOrTypeElement(factory.createPropertyAssignment(/*modifiers*/ undefined, factory.createIdentifier("value"), /*postfixToken*/ undefined, /*type*/ undefined, factory.createNumericLiteral("1", ast.TokenFlags.None))), false);
});

test("isTypeOnlyImportDeclaration inherits type-only status but not defer status", () => {
    const name = factory.createIdentifier("value");
    const specifier = factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, name);
    const bindings = factory.createNamedImports([specifier]);
    const clause = factory.createImportClause(ast.SyntaxKind.TypeKeyword, /*name*/ undefined, bindings);
    Object.defineProperty(specifier, "parent", { value: bindings });
    Object.defineProperty(bindings, "parent", { value: clause });
    const node: ast.Node = specifier;
    assert.ok(ast.isTypeOnlyImportDeclaration(node));
    const narrowed: ast.TypeOnlyImportDeclaration = node;
    assert.equal(narrowed, specifier);
    assert.ok(ast.isTypeOnlyImportDeclaration(clause));
    assert.ok(ast.isTypeOnlyImportDeclaration(factory.createImportSpecifier(/*isTypeOnly*/ true, /*propertyName*/ undefined, name)));
    assert.equal(ast.isTypeOnlyImportDeclaration(factory.createImportClause(ast.SyntaxKind.DeferKeyword, name)), false);
    assert.equal(ast.isTypeOnlyImportDeclaration(factory.createIdentifier("value")), false);
    const valueSpecifier = factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, name);
    assert.equal(ast.isTypeOnlyImportDeclaration(valueSpecifier), false);
    if (!ast.isTypeOnlyImportDeclaration(valueSpecifier)) {
        assert.equal(valueSpecifier.name, name);
    }
    const namespace = factory.createNamespaceImport(name);
    Object.defineProperty(namespace, "parent", { value: factory.createImportClause(ast.SyntaxKind.TypeKeyword, /*name*/ undefined, namespace) });
    assert.ok(ast.isTypeOnlyImportDeclaration(namespace));
    assert.ok(ast.isTypeOnlyImportDeclaration(factory.createImportEqualsDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ true, name, name)));
    assert.equal(ast.isTypeOnlyImportDeclaration(factory.createImportEqualsDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, name, name)), false);
});

test("isTypeOnlyExportDeclaration distinguishes export-star from named export containers", () => {
    const name = factory.createIdentifier("value");
    const specifier = factory.createExportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, name);
    const bindings = factory.createNamedExports([specifier]);
    const declaration = factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ true, bindings);
    Object.defineProperty(specifier, "parent", { value: bindings });
    Object.defineProperty(bindings, "parent", { value: declaration });
    const node: ast.Node = specifier;
    assert.ok(ast.isTypeOnlyExportDeclaration(node));
    const narrowed: ast.TypeOnlyExportDeclaration = node;
    assert.equal(narrowed, specifier);
    assert.equal(ast.isTypeOnlyExportDeclaration(declaration), false);
    assert.ok(ast.isTypeOnlyExportDeclaration(factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ true, /*exportClause*/ undefined, factory.createStringLiteral("module", ast.TokenFlags.None))));
    assert.equal(ast.isTypeOnlyExportDeclaration(factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, /*exportClause*/ undefined, factory.createStringLiteral("module", ast.TokenFlags.None))), false);
    assert.ok(ast.isTypeOnlyExportDeclaration(factory.createExportSpecifier(/*isTypeOnly*/ true, /*propertyName*/ undefined, name)));
    const valueSpecifier = factory.createExportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, name);
    assert.equal(ast.isTypeOnlyExportDeclaration(valueSpecifier), false);
    if (!ast.isTypeOnlyExportDeclaration(valueSpecifier)) {
        assert.equal(valueSpecifier.name, name);
    }
    const namespace = factory.createNamespaceExport(name);
    Object.defineProperty(namespace, "parent", { value: factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ true, namespace) });
    assert.ok(ast.isTypeOnlyExportDeclaration(namespace));
});

test("isTypeOnlyImportOrExportDeclaration includes both kinds of explicit type-only aliases", () => {
    const name = factory.createIdentifier("value");
    const node: ast.Node = factory.createImportSpecifier(/*isTypeOnly*/ true, /*propertyName*/ undefined, name);
    assert.ok(ast.isTypeOnlyImportOrExportDeclaration(node));
    const narrowed: ast.TypeOnlyAliasDeclaration = node;
    assert.equal(narrowed, node);
    assert.ok(ast.isTypeOnlyImportOrExportDeclaration(factory.createExportSpecifier(/*isTypeOnly*/ true, /*propertyName*/ undefined, name)));
    assert.equal(ast.isTypeOnlyImportOrExportDeclaration(factory.createImportClause(/*phaseModifier*/ undefined, name)), false);
});

test("isPartOfTypeOnlyImportOrExportDeclaration includes the alias itself and its descendants", () => {
    const name = factory.createIdentifier("value");
    const specifier = factory.createImportSpecifier(/*isTypeOnly*/ true, /*propertyName*/ undefined, name);
    Object.defineProperty(name, "parent", { value: specifier });
    assert.ok(ast.isPartOfTypeOnlyImportOrExportDeclaration(name));
    assert.ok(ast.isPartOfTypeOnlyImportOrExportDeclaration(specifier));
    assert.equal(ast.isPartOfTypeOnlyImportOrExportDeclaration(factory.createIdentifier("value")), false);
});

test("isPartOfTypeNode classifies contextual names without recursively classifying every qualifier", async () => {
    const { API } = await import("./sync/api.testUtils.ts");
    const { createVirtualFileSystem } = await import("./testUtils.ts");
    const { fileURLToPath } = await import("node:url");
    using api = new API({
        cwd: fileURLToPath(new URL("../../../", import.meta.url)),
        tsserverPath: fileURLToPath(new URL(`../../../built/local/tsc${process.platform === "win32" ? ".exe" : ""}`, import.meta.url)),
        fs: createVirtualFileSystem({}),
    });
    const source = api.createSourceFile(
        "/test.ts",
        `
let value: A.B.C;
let query: typeof A.B.C;
class Derived extends Base implements Interface {}
interface I extends Base {}
void value;
type Result = void;
type Imported = import("module").ImportedName;
type ImportQuery = typeof import("module").QueriedName;
type Mapped<T> = { [K in keyof T]: T[K] };
type Conditional<T> = T extends infer U ? U : never;
f<TypeArgument>();
`,
    ).sourceFile;
    const nodes: ast.Node[] = [];
    function collect(node: ast.Node): void {
        nodes.push(node);
        node.forEachChild(child => {
            collect(child);
        });
    }
    collect(source);
    const names = nodes.filter(ast.isIdentifier).filter(node => ["A", "B", "C"].includes(node.text));
    assert.deepEqual(names.map(ast.isPartOfTypeNode), [false, false, true, false, false, false]);
    const heritage = nodes.filter(ast.isHeritageClause).flatMap(clause => [...clause.types]);
    assert.deepEqual(heritage.map(ast.isPartOfTypeNode), [false, true, true]);
    const voids = nodes.filter(node => node.kind === ast.SyntaxKind.VoidKeyword);
    assert.deepEqual(voids.map(ast.isPartOfTypeNode), [true]);
    const valueUses = nodes.filter(ast.isIdentifier).filter(node => node.text === "value");
    assert.deepEqual(valueUses.map(ast.isPartOfTypeNode), [false, false]);
    const importNames = nodes.filter(ast.isIdentifier).filter(node => node.text === "ImportedName" || node.text === "QueriedName");
    assert.deepEqual(importNames.map(ast.isPartOfTypeNode), [true, false]);
    const parameters = nodes.filter(ast.isTypeParameterDeclaration);
    assert.deepEqual(parameters.map(ast.isPartOfTypeNode), [false, true, false, true]);
    const argument = nodes.find(node => ast.isIdentifier(node) && node.text === "TypeArgument");
    assert.ok(argument && ast.isPartOfTypeNode(argument));
});

test("isExternalModuleNameRelative includes rooted disk paths but excludes URLs and bare names", () => {
    for (const name of [".", "..", "./module", "../module", ".\\module", "..\\module", "/module", "C:/module", "C:\\module", "\\\\server\\share\\module"]) {
        assert.ok(ast.isExternalModuleNameRelative(name), name);
    }
    for (const name of ["", "module", "@scope/module", ".module", ".../module", "https://example.com/module", "file:///module", "C:module"]) {
        assert.equal(ast.isExternalModuleNameRelative(name), false, name);
    }
});
