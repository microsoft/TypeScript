//// [tests/cases/compiler/trackedSymbolsNoCrash.ts] ////

//// [package.json]
{
  "name": "typescript",
  "types": "/.ts/typescript.internal.d.ts"
}

//// [index.ts]
import ts = require("typescript");

// TODO(jakebailey): this test should not depend on typescript itself
export const isNodeOfType =
  <NodeType extends ts.SyntaxKind>(nodeType: NodeType) =>
  (
    node: ts.ForEachChildNodes | null | undefined,
  ): node is Extract<ts.ForEachChildNodes, { kind: NodeType }> =>
    node?.kind === nodeType;


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeOfType = void 0;
// TODO(jakebailey): this test should not depend on typescript itself
var isNodeOfType = function (nodeType) {
    return function (node) {
        return (node === null || node === void 0 ? void 0 : node.kind) === nodeType;
    };
};
exports.isNodeOfType = isNodeOfType;


//// [index.d.ts]
import ts = require("typescript");
export declare const isNodeOfType: <NodeType extends ts.SyntaxKind>(nodeType: NodeType) => (node: ts.ForEachChildNodes | null | undefined) => node is Extract<ts.JSDoc, {
    kind: NodeType;
}> | Extract<ts.JSDocCallbackTag, {
    kind: NodeType;
}> | Extract<ts.JSDocEnumTag, {
    kind: NodeType;
}> | Extract<ts.JSDocFunctionType, {
    kind: NodeType;
}> | Extract<ts.JSDocSignature, {
    kind: NodeType;
}> | Extract<ts.JSDocTypedefTag, {
    kind: NodeType;
}> | Extract<ts.SourceFile, {
    kind: NodeType;
}> | Extract<ts.ArrowFunction, {
    kind: NodeType;
}> | Extract<ts.Block, {
    kind: NodeType;
}> | Extract<ts.CallSignatureDeclaration, {
    kind: NodeType;
}> | Extract<ts.CaseBlock, {
    kind: NodeType;
}> | Extract<ts.CatchClause, {
    kind: NodeType;
}> | Extract<ts.ClassStaticBlockDeclaration, {
    kind: NodeType;
}> | Extract<ts.ConditionalTypeNode, {
    kind: NodeType;
}> | Extract<ts.ConstructorDeclaration, {
    kind: NodeType;
}> | Extract<ts.ConstructorTypeNode, {
    kind: NodeType;
}> | Extract<ts.ConstructSignatureDeclaration, {
    kind: NodeType;
}> | Extract<ts.ForStatement, {
    kind: NodeType;
}> | Extract<ts.ForInStatement, {
    kind: NodeType;
}> | Extract<ts.ForOfStatement, {
    kind: NodeType;
}> | Extract<ts.FunctionDeclaration, {
    kind: NodeType;
}> | Extract<ts.FunctionExpression, {
    kind: NodeType;
}> | Extract<ts.FunctionTypeNode, {
    kind: NodeType;
}> | Extract<ts.GetAccessorDeclaration, {
    kind: NodeType;
}> | Extract<ts.IndexSignatureDeclaration, {
    kind: NodeType;
}> | Extract<ts.MappedTypeNode, {
    kind: NodeType;
}> | Extract<ts.MethodDeclaration, {
    kind: NodeType;
}> | Extract<ts.MethodSignature, {
    kind: NodeType;
}> | Extract<ts.ModuleDeclaration, {
    kind: NodeType;
}> | Extract<ts.SetAccessorDeclaration, {
    kind: NodeType;
}> | Extract<ts.TypeAliasDeclaration, {
    kind: NodeType;
}> | Extract<ts.QualifiedName, {
    kind: NodeType;
}> | Extract<ts.MetaProperty, {
    kind: NodeType;
}> | Extract<ts.ElementAccessExpression, {
    kind: NodeType;
}> | Extract<ts.PropertyAccessExpression, {
    kind: NodeType;
}> | Extract<ts.BindingElement, {
    kind: NodeType;
}> | Extract<ts.VariableStatement, {
    kind: NodeType;
}> | Extract<ts.ExpressionStatement, {
    kind: NodeType;
}> | Extract<ts.IfStatement, {
    kind: NodeType;
}> | Extract<ts.DoStatement, {
    kind: NodeType;
}> | Extract<ts.WhileStatement, {
    kind: NodeType;
}> | Extract<ts.ContinueStatement, {
    kind: NodeType;
}> | Extract<ts.BreakStatement, {
    kind: NodeType;
}> | Extract<ts.ReturnStatement, {
    kind: NodeType;
}> | Extract<ts.WithStatement, {
    kind: NodeType;
}> | Extract<ts.SwitchStatement, {
    kind: NodeType;
}> | Extract<ts.LabeledStatement, {
    kind: NodeType;
}> | Extract<ts.ThrowStatement, {
    kind: NodeType;
}> | Extract<ts.TryStatement, {
    kind: NodeType;
}> | Extract<ts.ComputedPropertyName, {
    kind: NodeType;
}> | Extract<ts.TypeParameterDeclaration, {
    kind: NodeType;
}> | Extract<ts.ParameterDeclaration, {
    kind: NodeType;
}> | Extract<ts.Decorator, {
    kind: NodeType;
}> | Extract<ts.PropertySignature, {
    kind: NodeType;
}> | Extract<ts.PropertyDeclaration, {
    kind: NodeType;
}> | Extract<ts.TypePredicateNode, {
    kind: NodeType;
}> | Extract<ts.TypeReferenceNode, {
    kind: NodeType;
}> | Extract<ts.TypeQueryNode, {
    kind: NodeType;
}> | Extract<ts.TypeLiteralNode, {
    kind: NodeType;
}> | Extract<ts.ArrayTypeNode, {
    kind: NodeType;
}> | Extract<ts.TupleTypeNode, {
    kind: NodeType;
}> | Extract<ts.OptionalTypeNode, {
    kind: NodeType;
}> | Extract<ts.RestTypeNode, {
    kind: NodeType;
}> | Extract<ts.UnionTypeNode, {
    kind: NodeType;
}> | Extract<ts.IntersectionTypeNode, {
    kind: NodeType;
}> | Extract<ts.InferTypeNode, {
    kind: NodeType;
}> | Extract<ts.ImportTypeNode, {
    kind: NodeType;
}> | Extract<ts.ImportTypeAssertionContainer, {
    kind: NodeType;
}> | Extract<ts.NamedTupleMember, {
    kind: NodeType;
}> | Extract<ts.ParenthesizedTypeNode, {
    kind: NodeType;
}> | Extract<ts.TypeOperatorNode, {
    kind: NodeType;
}> | Extract<ts.IndexedAccessTypeNode, {
    kind: NodeType;
}> | Extract<ts.LiteralTypeNode, {
    kind: NodeType;
}> | Extract<ts.TemplateLiteralTypeNode, {
    kind: NodeType;
}> | Extract<ts.TemplateLiteralTypeSpan, {
    kind: NodeType;
}> | Extract<ts.ObjectBindingPattern, {
    kind: NodeType;
}> | Extract<ts.ArrayBindingPattern, {
    kind: NodeType;
}> | Extract<ts.ArrayLiteralExpression, {
    kind: NodeType;
}> | Extract<ts.ObjectLiteralExpression, {
    kind: NodeType;
}> | Extract<ts.CallExpression, {
    kind: NodeType;
}> | Extract<ts.NewExpression, {
    kind: NodeType;
}> | Extract<ts.TaggedTemplateExpression, {
    kind: NodeType;
}> | Extract<ts.TypeAssertion, {
    kind: NodeType;
}> | Extract<ts.ParenthesizedExpression, {
    kind: NodeType;
}> | Extract<ts.DeleteExpression, {
    kind: NodeType;
}> | Extract<ts.TypeOfExpression, {
    kind: NodeType;
}> | Extract<ts.VoidExpression, {
    kind: NodeType;
}> | Extract<ts.AwaitExpression, {
    kind: NodeType;
}> | Extract<ts.PrefixUnaryExpression, {
    kind: NodeType;
}> | Extract<ts.PostfixUnaryExpression, {
    kind: NodeType;
}> | Extract<ts.BinaryExpression, {
    kind: NodeType;
}> | Extract<ts.ConditionalExpression, {
    kind: NodeType;
}> | Extract<ts.TemplateExpression, {
    kind: NodeType;
}> | Extract<ts.YieldExpression, {
    kind: NodeType;
}> | Extract<ts.SpreadElement, {
    kind: NodeType;
}> | Extract<ts.ClassExpression, {
    kind: NodeType;
}> | Extract<ts.ExpressionWithTypeArguments, {
    kind: NodeType;
}> | Extract<ts.AsExpression, {
    kind: NodeType;
}> | Extract<ts.NonNullExpression, {
    kind: NodeType;
}> | Extract<ts.SatisfiesExpression, {
    kind: NodeType;
}> | Extract<ts.TemplateSpan, {
    kind: NodeType;
}> | Extract<ts.VariableDeclaration, {
    kind: NodeType;
}> | Extract<ts.VariableDeclarationList, {
    kind: NodeType;
}> | Extract<ts.ClassDeclaration, {
    kind: NodeType;
}> | Extract<ts.InterfaceDeclaration, {
    kind: NodeType;
}> | Extract<ts.EnumDeclaration, {
    kind: NodeType;
}> | Extract<ts.ModuleBlock, {
    kind: NodeType;
}> | Extract<ts.NamespaceExportDeclaration, {
    kind: NodeType;
}> | Extract<ts.ImportEqualsDeclaration, {
    kind: NodeType;
}> | Extract<ts.ImportDeclaration, {
    kind: NodeType;
}> | Extract<ts.ImportAttributes, {
    kind: NodeType;
}> | Extract<ts.ImportAttribute, {
    kind: NodeType;
}> | Extract<ts.ImportClause, {
    kind: NodeType;
}> | Extract<ts.NamespaceImport, {
    kind: NodeType;
}> | Extract<ts.NamespaceExport, {
    kind: NodeType;
}> | Extract<ts.NamedImports, {
    kind: NodeType;
}> | Extract<ts.ImportSpecifier, {
    kind: NodeType;
}> | Extract<ts.ExportAssignment, {
    kind: NodeType;
}> | Extract<ts.ExportDeclaration, {
    kind: NodeType;
}> | Extract<ts.NamedExports, {
    kind: NodeType;
}> | Extract<ts.ExportSpecifier, {
    kind: NodeType;
}> | Extract<ts.ExternalModuleReference, {
    kind: NodeType;
}> | Extract<ts.JsxElement, {
    kind: NodeType;
}> | Extract<ts.JsxSelfClosingElement, {
    kind: NodeType;
}> | Extract<ts.JsxOpeningElement, {
    kind: NodeType;
}> | Extract<ts.JsxClosingElement, {
    kind: NodeType;
}> | Extract<ts.JsxFragment, {
    kind: NodeType;
}> | Extract<ts.JsxAttribute, {
    kind: NodeType;
}> | Extract<ts.JsxAttributes, {
    kind: NodeType;
}> | Extract<ts.JsxSpreadAttribute, {
    kind: NodeType;
}> | Extract<ts.JsxExpression, {
    kind: NodeType;
}> | Extract<ts.JsxNamespacedName, {
    kind: NodeType;
}> | Extract<ts.CaseClause, {
    kind: NodeType;
}> | Extract<ts.DefaultClause, {
    kind: NodeType;
}> | Extract<ts.HeritageClause, {
    kind: NodeType;
}> | Extract<ts.PropertyAssignment, {
    kind: NodeType;
}> | Extract<ts.ShorthandPropertyAssignment, {
    kind: NodeType;
}> | Extract<ts.SpreadAssignment, {
    kind: NodeType;
}> | Extract<ts.EnumMember, {
    kind: NodeType;
}> | Extract<ts.PartiallyEmittedExpression, {
    kind: NodeType;
}> | Extract<ts.CommaListExpression, {
    kind: NodeType;
}> | Extract<ts.MissingDeclaration, {
    kind: NodeType;
}> | Extract<ts.JSDocTypeExpression, {
    kind: NodeType;
}> | Extract<ts.JSDocNonNullableType, {
    kind: NodeType;
}> | Extract<ts.JSDocNullableType, {
    kind: NodeType;
}> | Extract<ts.JSDocOptionalType, {
    kind: NodeType;
}> | Extract<ts.JSDocVariadicType, {
    kind: NodeType;
}> | Extract<ts.JSDocSeeTag, {
    kind: NodeType;
}> | Extract<ts.JSDocNameReference, {
    kind: NodeType;
}> | Extract<ts.JSDocMemberName, {
    kind: NodeType;
}> | Extract<ts.JSDocParameterTag, {
    kind: NodeType;
}> | Extract<ts.JSDocPropertyTag, {
    kind: NodeType;
}> | Extract<ts.JSDocAuthorTag, {
    kind: NodeType;
}> | Extract<ts.JSDocImplementsTag, {
    kind: NodeType;
}> | Extract<ts.JSDocAugmentsTag, {
    kind: NodeType;
}> | Extract<ts.JSDocTemplateTag, {
    kind: NodeType;
}> | Extract<ts.JSDocReturnTag, {
    kind: NodeType;
}> | Extract<ts.JSDocTypeTag, {
    kind: NodeType;
}> | Extract<ts.JSDocThisTag, {
    kind: NodeType;
}> | Extract<ts.JSDocLink, {
    kind: NodeType;
}> | Extract<ts.JSDocLinkCode, {
    kind: NodeType;
}> | Extract<ts.JSDocLinkPlain, {
    kind: NodeType;
}> | Extract<ts.JSDocTypeLiteral, {
    kind: NodeType;
}> | Extract<ts.JSDocUnknownTag, {
    kind: NodeType;
}> | Extract<ts.JSDocClassTag, {
    kind: NodeType;
}> | Extract<ts.JSDocPublicTag, {
    kind: NodeType;
}> | Extract<ts.JSDocPrivateTag, {
    kind: NodeType;
}> | Extract<ts.JSDocProtectedTag, {
    kind: NodeType;
}> | Extract<ts.JSDocReadonlyTag, {
    kind: NodeType;
}> | Extract<ts.JSDocDeprecatedTag, {
    kind: NodeType;
}> | Extract<ts.JSDocThrowsTag, {
    kind: NodeType;
}> | Extract<ts.JSDocOverrideTag, {
    kind: NodeType;
}> | Extract<ts.JSDocSatisfiesTag, {
    kind: NodeType;
}> | Extract<ts.JSDocOverloadTag, {
    kind: NodeType;
}>;
