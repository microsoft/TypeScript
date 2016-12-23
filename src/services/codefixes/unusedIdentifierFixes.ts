// /* @internal */
// namespace ts.codefix {
//     registerCodeFix({
//         errorCodes: [
//             Diagnostics._0_is_declared_but_never_used.code,
//             Diagnostics.Property_0_is_declared_but_never_used.code
//         ],
//         getCodeActions: (context: CodeFixContext) => {
//             const sourceFile = context.sourceFile;
//             const start = context.span.start;

//             let token = getTokenAtPosition(sourceFile, start);

//             // this handles var ["computed"] = 12;
//             if (token.kind === SyntaxKind.OpenBracketToken) {
//                 token = getTokenAtPosition(sourceFile, start + 1);
//             }

//             switch (token.kind) {
//                 case ts.SyntaxKind.Identifier:
//                     switch (token.parent.kind) {
//                         case ts.SyntaxKind.VariableDeclaration:
//                             switch (token.parent.parent.parent.kind) {
//                                 case SyntaxKind.ForStatement:
//                                     const forStatement = <ForStatement>token.parent.parent.parent;
//                                     const forInitializer = <VariableDeclarationList>forStatement.initializer;
//                                     if (forInitializer.declarations.length === 1) {
//                                         return createCodeFix("", forInitializer.pos, forInitializer.end - forInitializer.pos);
//                                     }
//                                     else {
//                                         return removeSingleItem(forInitializer.declarations, token);
//                                     }

//                                 case SyntaxKind.ForOfStatement:
//                                     const forOfStatement = <ForOfStatement>token.parent.parent.parent;
//                                     if (forOfStatement.initializer.kind === SyntaxKind.VariableDeclarationList) {
//                                         const forOfInitializer = <VariableDeclarationList>forOfStatement.initializer;
//                                         return createCodeFix("{}", forOfInitializer.declarations[0].pos, forOfInitializer.declarations[0].end - forOfInitializer.declarations[0].pos);
//                                     }
//                                     break;

//                                 case SyntaxKind.ForInStatement:
//                                     // There is no valid fix in the case of:
//                                     //  for .. in
//                                     return undefined;

//                                 case SyntaxKind.CatchClause:
//                                     const catchClause = <CatchClause>token.parent.parent;
//                                     const parameter = catchClause.variableDeclaration.getChildren()[0];
//                                     return createCodeFix("", parameter.pos, parameter.end - parameter.pos);

//                                 default:
//                                     const variableStatement = <VariableStatement>token.parent.parent.parent;
//                                     if (variableStatement.declarationList.declarations.length === 1) {
//                                         return createCodeFix("", variableStatement.pos, variableStatement.end - variableStatement.pos);
//                                     }
//                                     else {
//                                         const declarations = variableStatement.declarationList.declarations;
//                                         return removeSingleItem(declarations, token);
//                                     }
//                             }

//                         case SyntaxKind.TypeParameter:
//                             const typeParameters = (<DeclarationWithTypeParameters>token.parent.parent).typeParameters;
//                             if (typeParameters.length === 1) {
//                                 return createCodeFix("", token.parent.pos - 1, token.parent.end - token.parent.pos + 2);
//                             }
//                             else {
//                                 return removeSingleItem(typeParameters, token);
//                             }

//                         case ts.SyntaxKind.Parameter:
//                             const functionDeclaration = <FunctionDeclaration>token.parent.parent;
//                             if (functionDeclaration.parameters.length === 1) {
//                                 return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);
//                             }
//                             else {
//                                 return removeSingleItem(functionDeclaration.parameters, token);
//                             }

//                         // handle case where 'import a = A;'
//                         case SyntaxKind.ImportEqualsDeclaration:
//                             const importEquals = findImportDeclaration(token);
//                             return createCodeFix("", importEquals.pos, importEquals.end - importEquals.pos);

//                         case SyntaxKind.ImportSpecifier:
//                             const namedImports = <NamedImports>token.parent.parent;
//                             if (namedImports.elements.length === 1) {
//                                 // Only 1 import and it is unused. So the entire declaration should be removed.
//                                 const importSpec = findImportDeclaration(token);
//                                 return createCodeFix("", importSpec.pos, importSpec.end - importSpec.pos);
//                             }
//                             else {
//                                 return removeSingleItem(namedImports.elements, token);
//                             }

//                         // handle case where "import d, * as ns from './file'"
//                         // or "'import {a, b as ns} from './file'"
//                         case SyntaxKind.ImportClause: // this covers both 'import |d|' and 'import |d,| *'
//                             const importClause = <ImportClause>token.parent;
//                             if (!importClause.namedBindings) { // |import d from './file'| or |import * as ns from './file'|
//                                 const importDecl = findImportDeclaration(importClause);
//                                 return createCodeFix("", importDecl.pos, importDecl.end - importDecl.pos);
//                             }
//                             else { // import |d,| * as ns from './file'
//                                 return createCodeFix("", importClause.name.pos, importClause.namedBindings.pos - importClause.name.pos);
//                             }

//                         case SyntaxKind.NamespaceImport:
//                             const namespaceImport = <NamespaceImport>token.parent;
//                             if (namespaceImport.name == token && !(<ImportClause>namespaceImport.parent).name) {
//                                 const importDecl = findImportDeclaration(namespaceImport);
//                                 return createCodeFix("", importDecl.pos, importDecl.end - importDecl.pos);
//                             }
//                             else {
//                                 const start = (<ImportClause>namespaceImport.parent).name.end;
//                                 return createCodeFix("", start, (<ImportClause>namespaceImport.parent).namedBindings.end - start);
//                             }
//                     }
//                     break;

//                 case SyntaxKind.PropertyDeclaration:
//                     return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);

//                 case SyntaxKind.NamespaceImport:
//                     return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);
//             }
//             if (isDeclarationName(token)) {
//                 return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);
//             }
//             else if (isLiteralComputedPropertyDeclarationName(token)) {
//                 return createCodeFix("", token.parent.parent.pos, token.parent.parent.end - token.parent.parent.pos);
//             }
//             else {
//                 return undefined;
//             }

//             function findImportDeclaration(token: Node): Node {
//                 let importDecl = token;
//                 while (importDecl.kind != SyntaxKind.ImportDeclaration && importDecl.parent) {
//                     importDecl = importDecl.parent;
//                 }

//                 return importDecl;
//             }

//             function createCodeFix(newText: string, start: number, length: number): CodeAction[] {
//                 return [{
//                     description: getLocaleSpecificMessage(Diagnostics.Remove_unused_identifiers),
//                     changes: [{
//                         fileName: sourceFile.fileName,
//                         textChanges: [{ newText, span: { start, length } }]
//                     }]
//                 }];
//             }

//             function removeSingleItem<T extends Node>(elements: NodeArray<T>, token: T): CodeAction[] {
//                 if (elements[0] === token.parent) {
//                     return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos + 1);
//                 }
//                 else {
//                     return createCodeFix("", token.parent.pos - 1, token.parent.end - token.parent.pos + 1);
//                 }
//             }
//         }
//     });
// }