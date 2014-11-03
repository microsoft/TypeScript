///<reference path='..\..\compiler\sys.ts' />
///<reference path='..\..\services\core\arrayUtilities.ts' />
///<reference path='..\..\services\core\stringUtilities.ts' />
///<reference path='syntaxFacts.ts' />
///<reference path='syntaxKind.ts' />
// ///<reference path='..\..\..\tests\fidelity\es5compat.ts' />

// Adds argument checking to the generated nodes.  Argument checking appears to slow things down
// parsing about 7%.  If we want to get that perf back, we can always remove this.
var argumentChecks = false;
var forPrettyPrinter = false;

interface ITypeDefinition {
    name: string;
    baseType: string;
    interfaces?: string[];
    children: IMemberDefinition[];
    isTypeScriptSpecific: boolean;
}

interface IMemberDefinition {
    name: string;
    type?: string;
    isToken?: boolean;
    isList?: boolean;
    isSeparatedList?: boolean;
    requiresAtLeastOneItem?: boolean;
    isOptional?: boolean;
    tokenKinds?: string[];
    isTypeScriptSpecific: boolean;
    elementType?: string;
    excludeFromAST?: boolean;
}

var interfaces: any = {
    IMemberDeclarationSyntax: 'IClassElementSyntax',
    IStatementSyntax: 'IModuleElementSyntax',
    INameSyntax: 'ITypeSyntax',
    IUnaryExpressionSyntax: 'IExpressionSyntax',
    IPostfixExpressionSyntax: 'IUnaryExpressionSyntax',
    ILeftHandSideExpressionSyntax: 'IPostfixExpressionSyntax',
    // Note: for simplicity's sake, we merge CallExpression, NewExpression and MemberExpression 
    // into IMemberExpression.
    IMemberExpressionSyntax: 'ILeftHandSideExpressionSyntax',
    ICallExpressionSyntax: 'ILeftHandSideExpressionSyntax',
    IPrimaryExpressionSyntax: 'IMemberExpressionSyntax',
};

var definitions:ITypeDefinition[] = [
    <any>{
        name: 'SourceUnitSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'moduleElements', isList: true, elementType: 'IModuleElementSyntax' },
            <any>{ name: 'endOfFileToken', isToken: true }
        ]
    },
    <any>{
        name: 'ExternalModuleReferenceSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleReferenceSyntax'],
        children: [
            <any>{ name: 'requireKeyword', isToken: true, tokenKinds: ['RequireKeyword'], excludeFromAST: true }, 
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'stringLiteral', isToken: true, tokenKinds: ['StringLiteral'] },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ModuleNameModuleReferenceSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleReferenceSyntax'],
        children: [
            <any>{ name: 'moduleName', type: 'INameSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ImportDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'importKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'equalsToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'moduleReference', type: 'IModuleReferenceSyntax' },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ExportAssignmentSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'exportKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'equalsToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ClassDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'classKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            <any>{ name: 'heritageClauses', isList: true, elementType: 'HeritageClauseSyntax' },
            <any>{ name: 'openBraceToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'classElements', isList: true, elementType: 'IClassElementSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'InterfaceDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'interfaceKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            <any>{ name: 'heritageClauses', isList: true, elementType: 'HeritageClauseSyntax' },
            <any>{ name: 'body', type: 'ObjectTypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any> {
        name: 'HeritageClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'extendsOrImplementsKeyword', isToken: true },
            <any>{ name: 'typeNames', isSeparatedList: true, requiresAtLeastOneItem: true, elementType: 'INameSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ModuleDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'moduleKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'name', type: 'INameSyntax', isOptional: true },
            <any>{ name: 'stringLiteral', isToken: true, isOptional: true, tokenKinds: ['StringLiteral'] },
            <any>{ name: 'openBraceToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'moduleElements', isList: true, elementType: 'IModuleElementSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'FunctionDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            <any>{ name: 'functionKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax', isOptional: true },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'VariableStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            <any>{ name: 'variableDeclaration', type: 'VariableDeclarationSyntax' },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'VariableDeclarationSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'varKeyword', isToken: true },
            <any>{ name: 'variableDeclarators', isSeparatedList: true, requiresAtLeastOneItem: true, elementType: 'VariableDeclaratorSyntax' }
        ]
    },
    <any>{
        name: 'VariableDeclaratorSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'propertyName', isToken: true },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'equalsValueClause', type: 'EqualsValueClauseSyntax', isOptional: true }
        ]
    },
    <any>{
        name: 'EqualsValueClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'equalsToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'value', type: 'IExpressionSyntax' }
        ]
    },
    <any>{
        name: 'PrefixUnaryExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'operatorToken', isToken: true },
            <any>{ name: 'operand', type: 'IUnaryExpressionSyntax' }
        ],
    },
    <any>{
        name: 'ArrayLiteralExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            <any>{ name: 'openBracketToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'expressions', isSeparatedList: true, elementType: 'IExpressionSyntax' },
            <any>{ name: 'closeBracketToken', isToken: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'OmittedExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IExpressionSyntax'],
        children: <any>[]
    },
    <any>{
        name: 'ParenthesizedExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'SimpleArrowFunctionExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'parameter', type: 'ParameterSyntax' },
            <any>{ name: 'equalsGreaterThanToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'block', type: 'BlockSyntax', isOptional: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ParenthesizedArrowFunctionExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'equalsGreaterThanToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'block', type: 'BlockSyntax', isOptional: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'QualifiedNameSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['INameSyntax'],
        children: [
            <any>{ name: 'left', type: 'INameSyntax' },
            <any>{ name: 'dotToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'right', isToken: true, tokenKinds:['IdentifierName'] }
        ],
        // Qualified names only show up in Types, which are TypeScript specific. Note that a dotted
        // expression (like A.B.Foo()) is a MemberAccessExpression, not a QualifiedName.
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'TypeArgumentListSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'lessThanToken', isToken: true },
            <any>{ name: 'typeArguments', isSeparatedList: true, elementType: 'ITypeSyntax' },
            <any>{ name: 'greaterThanToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ConstructorTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'newKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            <any>{ name: 'parameterList', type: 'ParameterListSyntax' },
            <any>{ name: 'equalsGreaterThanToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'FunctionTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true },
            <any>{ name: 'parameterList', type: 'ParameterListSyntax' },
            <any>{ name: 'equalsGreaterThanToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ObjectTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'openBraceToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'typeMembers', isSeparatedList: true, elementType: 'ITypeMemberSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ArrayTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'type', type: 'ITypeSyntax' },
            <any>{ name: 'openBracketToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'closeBracketToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'GenericTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'name', type: 'INameSyntax' },
            <any>{ name: 'typeArgumentList', type: 'TypeArgumentListSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any> {
        name: 'TypeQuerySyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'typeOfKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'name', type: 'INameSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any> {
        name: 'TupleTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'openBracketToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'types', isSeparatedList: true, elementType: 'ITypeSyntax' },
            <any>{ name: 'closeBracketToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any> {
        name: 'UnionTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'left', type: 'ITypeSyntax' },
            <any>{ name: 'barToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'right', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any> {
        name: 'ParenthesizedTypeSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeSyntax'],
        children: [
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'type', type: 'ITypeSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'TypeAnnotationSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'colonToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'type', type: 'ITypeSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'BlockSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'openBraceToken', isToken: true },
            <any>{ name: 'statements', isList: true, elementType: 'IStatementSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'ParameterSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'dotDotDotToken', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'questionToken', isToken: true, isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'equalsValueClause', type: 'EqualsValueClauseSyntax', isOptional: true, isTypeScriptSpecific: true }
        ]
    },
    <any>{
        name: 'MemberAccessExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberExpressionSyntax', 'ICallExpressionSyntax'],
        children: [
            <any>{ name: 'expression', type: 'ILeftHandSideExpressionSyntax' },
            <any>{ name: 'dotToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'name', isToken: true, tokenKinds: ['IdentifierName'] }
        ]
    },
    <any>{
        name: 'PostfixUnaryExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPostfixExpressionSyntax'],
        children: [
            <any>{ name: 'operand', type: 'ILeftHandSideExpressionSyntax' },
            <any>{ name: 'operatorToken', isToken: true }
        ],
    },
    <any>{
        name: 'ElementAccessExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberExpressionSyntax', 'ICallExpressionSyntax'],
        children: [
            <any>{ name: 'expression', type: 'ILeftHandSideExpressionSyntax' },
            <any>{ name: 'openBracketToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'argumentExpression', type: 'IExpressionSyntax' },
            <any>{ name: 'closeBracketToken', isToken: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'TemplateAccessExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberExpressionSyntax', 'ICallExpressionSyntax'],
        children: [
            <any>{ name: 'expression', type: 'ILeftHandSideExpressionSyntax' },
            <any>{ name: 'templateExpression', type: 'IPrimaryExpressionSyntax' },
        ]
    },
    <any>{
        name: 'TemplateExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            <any>{ name: 'templateStartToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'templateClauses', isList: true, elementType: 'TemplateClauseSyntax' },
        ]
    },
    <any>{
        name: 'TemplateClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'templateMiddleOrEndToken', isToken: true, elementType: 'TemplateSpanSyntax' },
        ]
    },
    <any>{
        name: 'InvocationExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ICallExpressionSyntax'],
        children: [
            <any>{ name: 'expression', type: 'ILeftHandSideExpressionSyntax' },
            <any>{ name: 'argumentList', type: 'ArgumentListSyntax' }
        ]
    },
    <any>{
        name: 'ArgumentListSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'typeArgumentList', type: 'TypeArgumentListSyntax', isOptional: true },
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'arguments', isSeparatedList: true, elementType: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'BinaryExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IExpressionSyntax'],
        children: [
            <any>{ name: 'left', type: 'IExpressionSyntax' },
            <any>{ name: 'operatorToken', isToken: true },
            <any>{ name: 'right', type: 'IExpressionSyntax' }
        ],
    },
    <any>{
        name: 'ConditionalExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IExpressionSyntax'],
        children: [
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'questionToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'whenTrue', type: 'IExpressionSyntax' },
            <any>{ name: 'colonToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'whenFalse', type: 'IExpressionSyntax' }
        ]
    },
    <any>{
        name: 'ConstructSignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            <any>{ name: 'newKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'MethodSignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            <any>{ name: 'questionToken', isToken: true, isOptional: true, itTypeScriptSpecific: true },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' }
        ]
    },
    <any>{
        name: 'IndexSignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            <any>{ name: 'openBracketToken', isToken: true },
            <any>{ name: 'parameters', isSeparatedList: true, elementType: 'ParameterSyntax' },
            <any>{ name: 'closeBracketToken', isToken: true },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'PropertySignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            <any>{ name: 'questionToken', isToken: true, isOptional: true },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'CallSignatureSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ITypeMemberSyntax'],
        children: [
            <any>{ name: 'typeParameterList', type: 'TypeParameterListSyntax', isOptional: true, isTypeScriptSpecific: true },
            <any>{ name: 'parameterList', type: 'ParameterListSyntax' },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecific: true }
        ]
    },
    <any>{
        name: 'ParameterListSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'parameters', isSeparatedList: true, elementType: 'ParameterSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'TypeParameterListSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'lessThanToken', isToken: true },
            <any>{ name: 'typeParameters', isSeparatedList: true, elementType: 'TypeParameterSyntax' },
            <any>{ name: 'greaterThanToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'TypeParameterSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'constraint', type: 'ConstraintSyntax', isOptional: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ConstraintSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'extendsKeyword', isToken: true, excludeFromAST: true },
            // Expression only in error cases.
            <any>{ name: 'typeOrExpression', type: 'ISyntaxNodeOrToken' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ElseClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'elseKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'IfStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'ifKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' },
            <any>{ name: 'elseClause', type: 'ElseClauseSyntax', isOptional: true }
        ]
    },
    <any>{
        name: 'ExpressionStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'ConstructorDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IClassElementSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'constructorKeyword', isToken: true },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax', isOptional: true },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'MemberFunctionDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberDeclarationSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax', isOptional: true },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'GetAccessorSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberDeclarationSyntax', 'IPropertyAssignmentSyntax' ],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            <any>{ name: 'getKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax' }
        ]
    },
    <any>{
        name: 'SetAccessorSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberDeclarationSyntax', 'IPropertyAssignmentSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken', isTypeScriptSpecific: true },
            <any>{ name: 'setKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'MemberVariableDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IMemberDeclarationSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'variableDeclarator', type: 'VariableDeclaratorSyntax' },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'IndexMemberDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IClassElementSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'indexSignature', type: 'IndexSignatureSyntax' },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ThrowStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'throwKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'ReturnStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'returnKeyword', isToken: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'ObjectCreationExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            <any>{ name: 'newKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IMemberExpressionSyntax' },
            <any>{ name: 'argumentList', type: 'ArgumentListSyntax', isOptional: true }
        ]
    },
    <any>{
        name: 'SwitchStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'switchKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'openBraceToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'switchClauses', isList: true, elementType: 'ISwitchClauseSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'CaseSwitchClauseSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ISwitchClauseSyntax'],
        children: [
            <any>{ name: 'caseKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'colonToken', isToken: true, excludeFromAST: true},
            <any>{ name: 'statements', isList: true, elementType: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'DefaultSwitchClauseSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['ISwitchClauseSyntax'],
        children: [
            <any>{ name: 'defaultKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'colonToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'statements', isList: true, elementType: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'BreakStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'breakKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, isOptional: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'ContinueStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'continueKeyword', isToken: true },
            <any>{ name: 'identifier', isToken: true, isOptional: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'ForStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'forKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'variableDeclaration', type: 'VariableDeclarationSyntax', isOptional: true },
            <any>{ name: 'initializer', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'firstSemicolonToken', isToken: true, tokenKinds: ['SemicolonToken'], excludeFromAST: true },
            <any>{ name: 'condition', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'secondSemicolonToken', isToken: true, tokenKinds: ['SemicolonToken'], excludeFromAST: true },
            <any>{ name: 'incrementor', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'ForInStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'forKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'variableDeclaration', type: 'VariableDeclarationSyntax', isOptional: true },
            <any>{ name: 'left', type: 'IExpressionSyntax', isOptional: true },
            <any>{ name: 'inKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'WhileStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'whileKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'WithStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'withKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }
        ]
    },
    <any>{
        name: 'EnumDeclarationSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IModuleElementSyntax'],
        children: [
            <any>{ name: 'modifiers', isList: true, elementType: 'ISyntaxToken' },
            <any>{ name: 'enumKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'openBraceToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'enumElements', isSeparatedList: true, elementType: 'EnumElementSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'EnumElementSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            <any>{ name: 'equalsValueClause', type: 'EqualsValueClauseSyntax', isOptional: true }
        ]
    },
    <any>{
        name: 'CastExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'lessThanToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'type', type: 'ITypeSyntax' },
            <any>{ name: 'greaterThanToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IUnaryExpressionSyntax' }
        ],
        isTypeScriptSpecific: true
    },
    <any>{
        name: 'ObjectLiteralExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            <any>{ name: 'openBraceToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'propertyAssignments', isSeparatedList: true, elementType: 'IPropertyAssignmentSyntax' },
            <any>{ name: 'closeBraceToken', isToken: true, excludeFromAST: true }
        ]
    },
    <any>{
        name: 'SimplePropertyAssignmentSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPropertyAssignmentSyntax'],
        children: [
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            <any>{ name: 'colonToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IExpressionSyntax' }
        ]
    },
    <any> {
        name: 'FunctionPropertyAssignmentSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPropertyAssignmentSyntax'],
        children: [
            <any>{ name: 'propertyName', isToken: true, tokenKinds: ['IdentifierName', 'StringLiteral', 'NumericLiteral'] },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax' }
        ]
    },
    <any>{
        name: 'FunctionExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IPrimaryExpressionSyntax'],
        children: [
            <any>{ name: 'functionKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'identifier', isToken: true, isOptional: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'callSignature', type: 'CallSignatureSyntax' },
            <any>{ name: 'block', type: 'BlockSyntax' }]
    },
    <any>{
        name: 'EmptyStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'semicolonToken', isToken: true }]
    },
    <any>{
        name: 'TryStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'tryKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'block', type: 'BlockSyntax' },
            <any>{ name: 'catchClause', type: 'CatchClauseSyntax', isOptional: true },
            <any>{ name: 'finallyClause', type: 'FinallyClauseSyntax', isOptional: true }]
    },
    <any>{
        name: 'CatchClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'catchKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'typeAnnotation', type: 'TypeAnnotationSyntax', isOptional: true, isTypeScriptSpecified: true },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'block', type: 'BlockSyntax' }]
    },
    <any>{
        name: 'FinallyClauseSyntax',
        baseType: 'ISyntaxNode',
        children: [
            <any>{ name: 'finallyKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'block', type: 'BlockSyntax' }]
    },
    <any>{
        name: 'LabeledStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'identifier', isToken: true, tokenKinds: ['IdentifierName'] },
            <any>{ name: 'colonToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' }]
    },
    <any>{
        name: 'DoStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'doKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'statement', type: 'IStatementSyntax' },
            <any>{ name: 'whileKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'openParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'condition', type: 'IExpressionSyntax' },
            <any>{ name: 'closeParenToken', isToken: true, excludeFromAST: true },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }]
    },
    <any>{
        name: 'TypeOfExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'typeOfKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IUnaryExpressionSyntax' }]
    },
    <any>{
        name: 'DeleteExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'deleteKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IUnaryExpressionSyntax' }]
    },
    <any>{
        name: 'VoidExpressionSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IUnaryExpressionSyntax'],
        children: [
            <any>{ name: 'voidKeyword', isToken: true, excludeFromAST: true },
            <any>{ name: 'expression', type: 'IUnaryExpressionSyntax' }]
    },
    <any>{
        name: 'DebuggerStatementSyntax',
        baseType: 'ISyntaxNode',
        interfaces: ['IStatementSyntax'],
        children: [
            <any>{ name: 'debuggerKeyword', isToken: true },
            <any>{ name: 'semicolonToken', isToken: true, isOptional: true, excludeFromAST: true }]
    }];

function firstKind(definition: ITypeDefinition): TypeScript.SyntaxKind {
    var kindName = getNameWithoutSuffix(definition);
    //TypeScript.Environment.standardOut.WriteLine(kindName);
    var kind = (<any>TypeScript.SyntaxKind)[kindName];
    //TypeScript.Environment.standardOut.WriteLine(kind);

    return kind;
}

var sortedDefinitions = definitions.sort((d1, d2) => firstKind(d1) - firstKind(d2));

//function endsWith(string: string, value: string): boolean {
//    return string.substring(string.length - value.length, string.length) === value;
//}

function getStringWithoutSuffix(definition: string) {
    if (TypeScript.StringUtilities.endsWith(definition, "Syntax")) {
        return definition.substring(0, definition.length - "Syntax".length);
    }

    return definition;
}

function getStringWithoutPrefix(definition: string) {
    if (definition.charAt(0) == "I" && definition.charAt(1).toUpperCase() == definition.charAt(1)) {
        return definition.substring(1);
    }

    return definition;
}

function getNameWithoutSuffix(definition: ITypeDefinition) {
    return getStringWithoutSuffix(definition.name);
}

function getType(child: IMemberDefinition): string {
    if (child.isToken) {
        return "ISyntaxToken";
    }
    else if (child.isSeparatedList) {
        return "ISeparatedSyntaxList<" + child.elementType + ">";
    }
    else if (child.isList) {
        return child.elementType + "[]";
    }
    else {
        return child.type;
    }
}

function pascalCase(value: string): string {
    return value.substr(0, 1).toUpperCase() + value.substr(1);
}

function camelCase(value: string): string {
    return value.substr(0, 1).toLowerCase() + value.substr(1);
}

function getSafeName(child: IMemberDefinition) {
    if (child.name === "arguments") {
        return "_" + child.name;
    }

    return child.name;
}

function getPropertyAccess(child: IMemberDefinition, instance = "this"): string {
    if (child.type === "SyntaxKind") {
        return instance + "._kind";
    }

    return instance + "." + child.name;
}

function generateProperties(definition: ITypeDefinition): string {
    var result = "";

    if (definition.name === "SourceUnitSyntax") {
        result += "        public syntaxTree: SyntaxTree = undefined;\r\n";
    }

    var newLine = false;
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (getType(child) === "SyntaxKind") {
            result += "        private _" + child.name + ": " + getType(child) + ";\r\n";
            newLine = true;
        }
        else if (child.name === "arguments") {
            result += "    public " + child.name + ": " + getType(child) + ";\r\n";
        }
    }

    if (newLine) {
        result += "\r\n";
    }

    return result;
}

function generateNullChecks(definition: ITypeDefinition): string {
    var result = "";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (!child.isOptional && !child.isToken) {
            result += "        if (!" + child.name + ") { throw Errors.argumentNull('" + child.name + "'); }\r\n";
        }
    }

    return result;
}

function generateIfKindCheck(child: IMemberDefinition, tokenKinds: string[], indent: string): string {
    var result = "";
    
    result += indent + "        if (";

    for (var j = 0; j < tokenKinds.length; j++) {
        if (j > 0) {
            result += " && ";
        }

        var tokenKind = tokenKinds[j];
        if (tokenKind === "IdentifierName") {
            result += "!SyntaxFacts.isIdentifierName(" + child.name + ".tokenKind)";
        }
        else {
            result += child.name + ".tokenKind !== SyntaxKind." + tokenKind;
        }
    }

    result += ") { throw Errors.argument('" + child.name + "'); }\r\n";
    return result;
}

function generateSwitchCase(tokenKind: string, indent: string): string {
    return indent + "            case SyntaxKind." + tokenKind + ":\r\n";
}

function generateBreakStatement(indent: string): string {
    return indent + "                break;\r\n";
}

function generateSwitchCases(tokenKinds: string[], indent: string): string {
    var result = "";
    for (var j = 0; j < tokenKinds.length; j++) {
        var tokenKind = tokenKinds[j];

        result += generateSwitchCase(tokenKind, indent);
    }

    if (tokenKinds.length > 0) {
        result += generateBreakStatement(indent);
    }

    return result;
}

function generateDefaultCase(child: IMemberDefinition, indent: string): string {
    var result = "";
    
    result += indent + "            default:\r\n";
    result += indent + "                throw Errors.argument('" + child.name + "');\r\n"; 

    return result;
}

function generateSwitchKindCheck(child: IMemberDefinition, tokenKinds: string[], indent: string): string {
    if (tokenKinds.length === 0) {
        return "";
    }

    var result = "";

    var identifierName = TypeScript.ArrayUtilities.where(tokenKinds, v => v.indexOf("IdentifierName") >= 0);
    var notIdentifierName = TypeScript.ArrayUtilities.where(tokenKinds, v => v.indexOf("IdentifierName") < 0);

    if (identifierName.length > 0) {
        result += indent + "        if (!SyntaxFacts.isIdentifierName(" + child.name + ".tokenKind)) {\r\n";
        if (notIdentifierName.length === 0) {
            result += indent + "            throw Errors.argument('" + child.name + "');\r\n"; 
            result += indent + "        }\r\n";
            return result;
        }

        indent += "    ";
    }

    if (notIdentifierName.length <= 2) {
        result += generateIfKindCheck(child, notIdentifierName, indent);
    }
    else if (notIdentifierName.length > 2) {
        result += indent + "        switch (" + child.name + ".tokenKind) {\r\n";
        result += generateSwitchCases(notIdentifierName, indent);
        result += generateDefaultCase(child, indent);
        result += indent + "        }\r\n";
    }

    if (identifierName.length > 0) {
        result += indent + "    }\r\n";
    }

    // result += indent + "        }\r\n";
    return result;
}

function tokenKinds(child: IMemberDefinition): string[] {
    return child.tokenKinds
        ? child.tokenKinds
        : [pascalCase(child.name)];
}

function generateKindCheck(child: IMemberDefinition): string {
    var indent = "";
    var result = "";
    
    if (child.isOptional) {
        indent = "    ";

        result += "        if (" + child.name + ") {\r\n";
    }

    var kinds = tokenKinds(child);

    if (kinds.length <= 2) {
        result += generateIfKindCheck(child, kinds, indent);
    }
    else {
        result += generateSwitchKindCheck(child, kinds, indent);
    }

    if (child.isOptional) {
        result += "        }\r\n";
    }

    return result;
}

function generateKindChecks(definition: ITypeDefinition): string {
    var result = "";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (child.isToken) {
            result += generateKindCheck(child);
        }
    }

    return result;
}

function generateArgumentChecks(definition: ITypeDefinition): string {
    var result = "";

    if (argumentChecks) {
        result += generateNullChecks(definition);
        result += generateKindChecks(definition);

        if (definition.children.length > 0) {
            result += "\r\n";
        }
    }

    return result;
}

function generateConstructor(definition: ITypeDefinition): string {
    var i: number;
    var child: IMemberDefinition;
    var base = baseType(definition);

    var result = "";
    result += "        constructor("

    var children = definition.children;
    var kindChild: IMemberDefinition = undefined;
    for (i = 0; i < children.length; i++) {
        child = children[i];

        if (getType(child) === "SyntaxKind") {
            kindChild = child;
        }

        if (getType(child) !== "SyntaxKind" && child.name !== "arguments") {
            result += "public ";
        }

        result += getSafeName(child) + ": " + getType(child);
        result += ",\r\n                    ";
    }

    result += "data: number) {\r\n";

    if (kindChild) {
        result += "            super(kind, data); \r\n";
    }
    else {
        result += "            super(SyntaxKind." + getNameWithoutSuffix(definition) + ", data); \r\n";
    }

    if (definition.children.length > 0) {
        result += "\r\n";
    }

    result += generateArgumentChecks(definition);

    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];

        if (child.type === "SyntaxKind" || child.name === "arguments") {
            result += "            " + getPropertyAccess(child) + " = " + getSafeName(child) + ";\r\n";
        }
    }

    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];

        if (child.type !== "SyntaxKind") {
            if (child.isOptional) {
                result += "            " + getSafeName(child) + " && (" + getSafeName(child) + ".parent = this);\r\n";
            }
            //else if (child.isList || child.isSeparatedList) {
            //    result += "            !isShared(" + getSafeName(child) + ") && (" + getSafeName(child) + ".parent = this);\r\n";
            //}
            else {
                result += "            " + getSafeName(child) + ".parent = this;\r\n";
            }
        }
    }

    //result += "            Syntax.setParentForChildren(this);\r\n";
    result += "        }\r\n";

    return result;
}

function isOptional(child: IMemberDefinition) {
    if (child.isOptional) {
        return true;
    }

    if (child.isList && !child.requiresAtLeastOneItem) {
        return true;
    }

    if (child.isSeparatedList && !child.requiresAtLeastOneItem) {
        return true;
    }

    return false;
}

function generateFactory1Method(definition: ITypeDefinition): string {
    return "";

    var mandatoryChildren = TypeScript.ArrayUtilities.where(
        definition.children, c => !isOptional(c));
    if (mandatoryChildren.length === definition.children.length) {
        return "";
    }

    var result = "\r\n        public static create("
    var i: number;
    var child: IMemberDefinition;

    for (i = 0; i < mandatoryChildren.length; i++) {
        child = mandatoryChildren[i];

        result += child.name + ": " + getType(child);

        if (i < mandatoryChildren.length - 1) {
            result += ",\r\n                             ";
        }
    }

    result += "): " + definition.name + " {\r\n";

    result += "            return new " + definition.name + "(";
    
    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];

        if (!isOptional(child)) {
            result += child.name;
        }
        else if (child.isList) {
            result += "Syntax.emptyList<" + child.elementType + ">()";
        }
        else if (child.isSeparatedList) {
            result += "Syntax.emptySeparatedList<" + child.elementType + ">()";
        }
        else {
            result += "undefined";
        }

        result += ", ";
    }

    result += "/*data:*/ 0);\r\n";
    result += "        }\r\n";

    return result;
}

function isKeywordOrPunctuation(kind: string): boolean {
    if (TypeScript.StringUtilities.endsWith(kind, "Keyword")) {
        return true;
    }
    
    if (TypeScript.StringUtilities.endsWith(kind, "Token") &&
        kind !== "IdentifierName" &&
        kind !== "EndOfFileToken") {
        return true;
    }

    return false;
}

function isDefaultConstructable(definition: ITypeDefinition): boolean {
    if (!definition) {
        return false;
    }

    for (var i = 0; i < definition.children.length; i++) {
        if (isMandatory(definition.children[i])) {
            // If any child is mandatory, then the type is not default constructable.
            return false;
        }
    }

    // We can default construct this.
    return true;
}

function isMandatory(child: IMemberDefinition): boolean {
    // If it's optional then it's not mandatory.
    if (isOptional(child)) {
        return false;
    }

    // Kinds are always mandatory.  As are non-optional lists.
    if (child.type === "SyntaxKind" || child.isList || child.isSeparatedList) {
        return true;
    }

    // We have a non optional node or token.  Tokens are mandatory if they're not keywords or
    // punctuation.
    if (child.isToken) {
        var kinds = tokenKinds(child);
        var isFixed = kinds.length === 1 && isKeywordOrPunctuation(kinds[0]);

        return !isFixed;
    }

    // It's a node.  It's mandatory if we can't default construct it.
    return !isDefaultConstructable(memberDefinitionType(child));
}

function generateFactory2Method(definition: ITypeDefinition): string {
    return "";

    var mandatoryChildren: IMemberDefinition[] = TypeScript.ArrayUtilities.where(definition.children, isMandatory);
    if (mandatoryChildren.length === definition.children.length) {
        return "";
    }

    var i: number;
    var child: IMemberDefinition;
    var result = "\r\n        public static create1("

    for (i = 0; i < mandatoryChildren.length; i++) {
        child = mandatoryChildren[i];

        result += child.name + ": " + getType(child);

        if (i < mandatoryChildren.length - 1) {
            result += ",\r\n                              ";
        }
    }

    result += "): " + definition.name + " {\r\n";
    result += "            return new " + definition.name + "(";

    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];

        if (isMandatory(child)) {
            result += child.name;
        }
        else if (child.isList) {
            result += "Syntax.emptyList<" + child.elementType + ">()";
        }
        else if (child.isSeparatedList) {
            result += "Syntax.emptySeparatedList<" + child.elementType + ">()";
        }
        else if (isOptional(child)) {
            result += "undefined";
        }
        else if (child.isToken) {
            result += "Syntax.token(SyntaxKind." + tokenKinds(child)[0] + ")";
        }
        else {
            result += child.type + ".create1()";
        }

        result += ", ";
    }

    result += "/*data:*/ 0);\r\n";
    result += "        }\r\n";

    return result;
}

function generateFactoryMethod(definition: ITypeDefinition): string {
    return generateFactory1Method(definition) + generateFactory2Method(definition);
}

function generateBrands(definition: ITypeDefinition, accessibility: boolean): string {
    var properties = "";

    var types: string[] = [];
    if (definition.interfaces) {
        var ifaces = definition.interfaces.slice(0);
        var i: number;
        for (i = 0; i < ifaces.length; i++) {
            var current = ifaces[i];

            while (current !== undefined) {
                if (!TypeScript.ArrayUtilities.contains(ifaces, current)) {
                    ifaces.push(current);
                }

                current = interfaces[current];
            }
        }

        for (i = 0; i < ifaces.length; i++) {
            var type = ifaces[i];
            type = getStringWithoutSuffix(type);
            if (isInterface(type)) {
                type = "_" + type.substr(1, 1).toLowerCase() + type.substr(2) + "Brand";
            }

            types.push(type);
        }
    }

    types.push("_syntaxNodeOrTokenBrand");
    if (types.length > 0) {
        properties += "       ";

        for (var i = 0; i < types.length; i++) {
            if (accessibility) {
                properties += " public ";
            }

            properties += types[i] + ": any;";
        }

        properties += "\r\n";
    }

    return properties;
}

function generateAcceptMethod(definition: ITypeDefinition): string {
    var result = "";

    result += "\r\n";
    result += "        public accept(visitor: ISyntaxVisitor): SyntaxKind {\r\n";
    result += "            return visitor.visit" + getNameWithoutSuffix(definition) + "(this);\r\n";
    result += "        }\r\n";

    return result;
}

function generateKindMethod(definition: ITypeDefinition): string {
    var result = "";

    result += "\r\n";
    result += "        public kind(): SyntaxKind {\r\n";
    result += "            return SyntaxKind." + getNameWithoutSuffix(definition) + ";\r\n";
    result += "        }\r\n";

    return result;
}

function generateSlotMethods(definition: ITypeDefinition): string {
    var result = "";

    result += "\r\n";
    var slotCount = definition.children.length;

    result += "        public childCount(): number {\r\n";
    result += "            return " + slotCount + ";\r\n";
    result += "        }\r\n\r\n";

    result += "        public childAt(slot: number): ISyntaxElement {\r\n";

    if (slotCount === 0) {
        result += "            throw Errors.invalidOperation();\r\n";
    }
    else {
        result += "            switch (slot) {\r\n";

        var index = 0;
        for (var i = 0; i < definition.children.length; i++) {
            var child = definition.children[i];
            if (child.type === "SyntaxKind") {
                continue;
            }

            result += "                case " + index + ": return this." + child.name + ";\r\n";
            index++;
        }

        result += "                default: throw Errors.invalidOperation();\r\n";
        result += "            }\r\n";
    }

    result += "        }\r\n";

    return result;
}

function generateFirstTokenMethod(definition: ITypeDefinition): string {
    var result = "";

    result += "\r\n";
    result += "    public firstToken(): ISyntaxToken {\r\n";
    result += "        var token: ISyntaxToken = undefined;\r\n";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (getType(child) === "SyntaxKind") {
            continue;
        }

        if (child.name === "endOfFileToken") {
            continue;
        }

        result += "        if (";

        if (child.isOptional) {
            result += getPropertyAccess(child) + " && ";
        }

        if (child.isToken) {
            result += getPropertyAccess(child) + ".width() > 0";
            result += ") { return " + getPropertyAccess(child) + "; }\r\n";
        }
        else {
            result += "(token = " + getPropertyAccess(child) + ".firstToken())";
            result += ") { return token; }\r\n";
        }
    }

    if (definition.name === "SourceUnitSyntax") {
        result += "        return this._endOfFileToken;\r\n";
    }
    else {
        result += "        return undefined;\r\n";
    }

    result += "    }\r\n";

    result += "    }\r\n";

    return result;
}

function generateLastTokenMethod(definition: ITypeDefinition): string {
    var result = "";

    result += "\r\n";
    result += "    public lastToken(): ISyntaxToken {\r\n";

    if (definition.name === "SourceUnitSyntax") {
        result += "        return this._endOfFileToken;\r\n";
    }
    else {
        result += "        var token: ISyntaxToken = undefined;\r\n";

        for (var i = definition.children.length - 1; i >= 0; i--) {
            var child = definition.children[i];

            if (getType(child) === "SyntaxKind") {
                continue;
            }

            if (child.name === "endOfFileToken") {
                continue;
            }

            result += "        if (";

            if (child.isOptional) {
                result += getPropertyAccess(child) + " && ";
            }

            if (child.isToken) {
                result += getPropertyAccess(child) + ".width() > 0";
                result += ") { return " + getPropertyAccess(child) + "; }\r\n";
            }
            else {
                result += "(token = " + getPropertyAccess(child) + ".lastToken())";
                result += ") { return token; }\r\n";
            }
        }

        result += "        return undefined;\r\n";
    }

    result += "    }\r\n";

    return result;
}

function baseType(definition: ITypeDefinition): ITypeDefinition {
    return TypeScript.ArrayUtilities.firstOrDefault(definitions, d => d.name === definition.baseType);
}

function memberDefinitionType(child: IMemberDefinition): ITypeDefinition {
    // Debug.assert(child.type !== undefined);
    return TypeScript.ArrayUtilities.firstOrDefault(definitions, d => d.name === child.type);
}

function derivesFrom(def1: ITypeDefinition, def2: ITypeDefinition): boolean {
    var current = def1;
    while (current) {
        var base = baseType(current);
        if (base === def2) {
            return true;
        }

        current = base;
    }

    return false;
}

function contains(definition: ITypeDefinition, child: IMemberDefinition) {
    return TypeScript.ArrayUtilities.any(definition.children,
        c => c.name === child.name &&
             c.isList === child.isList &&
             c.isSeparatedList === child.isSeparatedList &&
             c.isToken === child.isToken &&
             c.type === child.type);
}

function generateAccessors(definition: ITypeDefinition): string {
    var result = "";

    //if (definition.name === "SourceUnitSyntax") {
    //    result += "\r\n";
    //    result += "        public syntaxTree(): SyntaxTree {\r\n";
    //    result += "            return this._syntaxTree;\r\n";
    //    result += "        }\r\n";
    //}

    //for (var i = 0; i < definition.children.length; i++) {
    //    var child = definition.children[i];
        
    //    if (child.type === "SyntaxKind") {
    //        result += "\r\n";
    //        result += "        public get " + child.name + "(): " + getType(child) + " {\r\n";
    //        result += "            return " + getPropertyAccess(child) + ";\r\n";
    //        result += "        }\r\n";
    //    }
    //}

    return result;
}

function generateWithMethod(definition: ITypeDefinition, child: IMemberDefinition): string {
    return "";

    var result = "";
    result += "\r\n";
    result += "        public with" + pascalCase(child.name) + "(" + getSafeName(child) + ": " + getType(child) + "): " + definition.name + " {\r\n";
    result += "            return this.update("

    for (var i = 0; i < definition.children.length; i++) {
        if (i > 0) {
            result += ", ";
        }

        if (definition.children[i] === child) {
            result += getSafeName(child);
        }
        else {
            result += getPropertyAccess(definition.children[i]);
        }
    }

    result += ");\r\n";
    result += "        }\r\n";

    if (child.isList || child.isSeparatedList) {
        if (TypeScript.StringUtilities.endsWith(child.name, "s")) {
            var pascalName = pascalCase(child.name);
            pascalName = pascalName.substring(0, pascalName.length - 1);

            var argName = getSafeName(child);
            argName = argName.substring(0, argName.length - 1)

            result += "\r\n";
            result += "        public with" + pascalName + "(" + argName + ": " + child.elementType + "): " + definition.name + " {\r\n";
            result += "            return this.with" + pascalCase(child.name) + "("

            if (child.isList) {
                result += "Syntax.list<" + child.elementType + ">([" + argName + "])";
            }
            else {
                result += "Syntax.separatedList<" + child.elementType + ">([" + argName + "])";
            }

            result += ");\r\n";
            result += "        }\r\n";
        }
    }

    return result;
}

function generateWithMethods(definition: ITypeDefinition): string {
    var result = "";
    return "";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += generateWithMethod(definition, child);
    }

    return result;
}

function generateTriviaMethods(definition: ITypeDefinition): string {
    return "";

    var result = "\r\n";
    result += "        public withLeadingTrivia(trivia: ISyntaxTriviaList): " + definition.name + " {\r\n";
    result += "            return <" + definition.name + ">super.withLeadingTrivia(trivia);\r\n";
    result += "        }\r\n\r\n";
    result += "        public withTrailingTrivia(trivia: ISyntaxTriviaList): " + definition.name + " {\r\n";
    result += "            return <" + definition.name + ">super.withTrailingTrivia(trivia);\r\n";
    result += "        }\r\n";

    return result;
}

function generateUpdateMethod(definition: ITypeDefinition): string {
    // return "";

    var result = "";

    result += "\r\n";
    result += "        public update(";

    var i: number;
    var child: IMemberDefinition;

    for (i = 0; i < definition.children.length; i++) {
        child = definition.children[i];

        result += getSafeName(child) + ": " + getType(child);

        if (i < definition.children.length - 1) {
            result += ",\r\n                      ";
        }
    }

    result += "): " + definition.name + " {\r\n";

    if (definition.children.length === 0) {
        result += "            return this;\r\n";
    }
    else {
        result += "            if (";

        for (i = 0; i < definition.children.length; i++) {
            child = definition.children[i];

            if (i !== 0) {
                result += " && ";
            }

            result += getPropertyAccess(child) + " === " + getSafeName(child);
        }

        result += ") {\r\n";
        result += "                return this;\r\n";
        result += "            }\r\n\r\n";

        result += "            return new " + definition.name + "(";

        for (i = 0; i < definition.children.length; i++) {
            child = definition.children[i];

            result += getSafeName(child);
            result += ", ";
        }

        result += "this.parsedInStrictMode() ? SyntaxConstants.NodeParsedInStrictModeMask : 0);\r\n";
    }

    result += "        }\r\n";

    return result;
}

function generateNode(definition: ITypeDefinition, abstract: boolean): string {
    var result = "    export class " + definition.name + " implements ISyntaxNode" // + " extends SyntaxNode"

    if (definition.interfaces) {
        // result += " implements ";
        result += ", ";
        result += definition.interfaces.join(", ");
    }

    result += " {\r\n";
    result += "        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;\r\n";

    if (definition.name === "SourceUnitSyntax") {
        result += "        public syntaxTree: SyntaxTree = undefined;\r\n";
    }

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += "        public " + child.name + ": " + getType(child) + ";\r\n";
    }

    result += generateBrands(definition, /*accessibility:*/ true);

    result += "        constructor(data: number";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += ", " + getSafeName(child) + ": " + getType(child);
    }

    result += ") {\r\n";
    result += "            if (data) { this.__data = data; }\r\n";

    if (definition.name === "SourceUnitSyntax") {
        result += "            this.parent = undefined,\r\n";
    }

    if (definition.children) {
        for (var i = 0; i < definition.children.length; i++) {
            var child = definition.children[i];
            if (child.excludeFromAST && abstract) {
                continue;
            }

            result += "            this." + child.name + " = " + getSafeName(child) + ",\r\n";
        }
    }

    if (definition.children.length > 0) {
        for (var i = 0; i < definition.children.length; i++) {
            var child = definition.children[i];

            if (i) {
                result += ",\r\n";
            }

            //if (child.isList || child.isSeparatedList) {
            //    result += "            !isShared(" + getSafeName(child) + ") && (" + getSafeName(child) + ".parent = this)";
            //}
            if (child.isOptional) {
                result += "            " + getSafeName(child) + " && (" + getSafeName(child) + ".parent = this)";
            }
            else {
                result += "            " + getSafeName(child) + ".parent = this";
            }
        }
        result += ";\r\n";
    }

    result += "        }\r\n";

    result += generateKindMethod(definition);
    // result += generateSlotMethods(definition);
    // result += generateAcceptMethod(definition);

    result += "    }";
    return result;
}

function generateConstructorFunction(definition: ITypeDefinition) {
    var result = "    export var " + definition.name + ": " + getNameWithoutSuffix(definition) + "Constructor = <any>function(data: number";

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += ", ";
        result += getSafeName(child);
        result += ": " + getType(child);
    }

    result += ") {\r\n";

    result += "        if (data) { this.__data = data; }\r\n";

    if (definition.children.length) {
        result += "        ";

        for (var i = 0; i < definition.children.length; i++) {
            if (i) {
                result += ", ";
            }

            var child = definition.children[i];
            result += "this." + child.name + " = " + getSafeName(child);
        }

        result += ";\r\n";
    }

    if (definition.children.length > 0) {
        result += "        ";

        for (var i = 0; i < definition.children.length; i++) {
            if (i) {
                result += ", ";
            }

            var child = definition.children[i];

            if (child.isOptional) {
                result += getSafeName(child) + " && (" + getSafeName(child) + ".parent = this)";
            }
            else {
                result += getSafeName(child) + ".parent = this";
            }
        }
        result += ";\r\n";
    }

    result += "    };\r\n";

    result += "    " + definition.name + ".prototype.kind = function() { return SyntaxKind." + getNameWithoutSuffix(definition) + "; }\r\n";

    return result;
}

function syntaxKindName(kind: TypeScript.SyntaxKind): string {
    for (var name in TypeScript.SyntaxKind) {
        if (<any>TypeScript.SyntaxKind[name] === kind) {
            return name;
        }
    }

    throw new Error();
}

function getDefinitionForKind(kind: TypeScript.SyntaxKind): ITypeDefinition {
    var kindName = syntaxKindName(kind);

    return TypeScript.ArrayUtilities.firstOrDefault(definitions, d => {
        if (getNameWithoutSuffix(d) === kindName) {
            return true;
        }

        return false;
    });
}

function generateSyntaxInterfaces(): string {
    var result = "///<reference path='references.ts' />\r\n\r\n";

    result += "module TypeScript {\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];

        if (i > 0) {
            result += "\r\n";
        }

        result += generateSyntaxInterface(definition);
    }

    result += "}";
    return result;
}

function generateSyntaxInterface(definition: ITypeDefinition): string {
    var result = "    export interface " + definition.name + " extends ISyntaxNode"

    if (definition.interfaces) {
        result += ", ";
        result += definition.interfaces.join(", ");
    }

    result += " {\r\n";

    if (definition.name === "SourceUnitSyntax") {
        result += "        syntaxTree: SyntaxTree;\r\n";
    }

    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += "        " + child.name + ": " + getType(child) + ";\r\n";
    }

    result += "    }\r\n";
    result += "    export interface " + getNameWithoutSuffix(definition) + "Constructor {";
    result += " new (data: number";
    
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];
        result += ", ";
        result += getSafeName(child);
        result += ": " + getType(child);
    }

    result += "): " + definition.name;
    result += " }\r\n";

    return result;
}


function generateNodes(abstract: boolean): string {
    var result = "///<reference path='references.ts' />\r\n\r\n";

    result += "module TypeScript";

    result += " {\r\n";
    //result += "    function finishNode(node: ISyntaxNode, data: number) {\r\n";
    //result += "        for (var i = 0, n = childCount(node); i < n; i++) {\r\n";
    //result += "            childAt(node, i).parent = node;\r\n";
    //result += "        }\r\n";
    ////result += "        for (var name in node) {\r\n";
    ////result += "            if (node.hasOwnProperty(name)) {\r\n";
    ////result += "                (<any>node)[name] = node;\r\n";
    ////result += "            }\r\n";
    ////result += "        }\r\n";
    //result += "\r\n";
    //result += "        if (data) {\r\n";
    //result += "            node.__data = data;\r\n";
    //result += "        }\r\n";
    //result += "    }\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];

        if (i) {
            result += "\r\n";
        }

        result += generateConstructorFunction(definition);
        // result += generateNode(definition, abstract);
    }

    result += "}";
    return result;
}

function isInterface(name: string) {
    return name.substr(0, 1) === "I" && name.substr(1, 1).toUpperCase() === name.substr(1, 1)
}

function isNodeOrToken(child: IMemberDefinition) {
    // IWhatever.
    return child.type && isInterface(child.type);
}

function generateRewriter(): string {
    var result = "///<reference path='references.ts' />\r\n\r\n";

    result += "module TypeScript {\r\n" +
"    export class SyntaxRewriter implements ISyntaxVisitor {\r\n" +
"        public visitToken(token: ISyntaxToken): ISyntaxToken {\r\n" +
"            return token;\r\n" +
"        }\r\n" +
"\r\n" +
"        public visitNode(node: ISyntaxNode): ISyntaxNode {\r\n" +
"            return visitNodeOrToken(this, node);\r\n" +
"        }\r\n" +
"\r\n" +
"        public visitNodeOrToken(node: ISyntaxNodeOrToken): ISyntaxNodeOrToken {\r\n" +
"            return isToken(node) ? <ISyntaxNodeOrToken>this.visitToken(<ISyntaxToken>node) : this.visitNode(<ISyntaxNode>node);\r\n" +
"        }\r\n" +
"\r\n" +
"        public visitList<T extends ISyntaxNodeOrToken[]>(list: T): T {\r\n" +
"            var newItems: T = undefined;\r\n" +
"\r\n" +
"            for (var i = 0, n = list.length; i < n; i++) {\r\n" +
"                var item = list[i];\r\n" +
"                var newItem = this.visitNodeOrToken(item);\r\n" +
"\r\n" +
"                if (item !== newItem && !newItems) {\r\n" +
"                    newItems = [];\r\n" +
"                    for (var j = 0; j < i; j++) {\r\n" +
"                        newItems.push(list[j]);\r\n" +
"                    }\r\n" +
"                }\r\n" +
"\r\n" +
"                if (newItems) {\r\n" +
"                    newItems.push(newItem);\r\n" +
"                }\r\n" +
"            }\r\n" +
"\r\n" +
"            // Debug.assert(!newItems || newItems.length === childCount(list));\r\n" +
"            return !newItems ? list : <T>Syntax.list(newItems);\r\n" +
"        }\r\n" +
"\r\n" 

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];

        result += "\r\n";
        result += "        public visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): any {\r\n";

        if (definition.children.length === 0) {
            result += "            return node;\r\n"
            result += "        }\r\n";
            continue;
        }

        //if (definition.children.length === 1) {
        //    result += "        return node.with" + pascalCase(definition.children[0].name) + "(\r\n";
        //}
        //else {
        result += "            return node.update(\r\n";
        //}

        for (var j = 0; j < definition.children.length; j++) {
            var child = definition.children[j];

            result += "                ";
            if (child.isOptional) {
                result += "!node." + child.name + " ? undefined : ";
            }

            if (child.isToken) {
                result += "this.visitToken(node." + child.name + ")";
            }
            else if (child.isList || child.isSeparatedList) {
                result += "this.visitList(node." + child.name + ")";
            }
            else if (child.type === "SyntaxKind") {
                result += "node.kind";
            }
            else if (isNodeOrToken(child)) {
                result += "<" + child.type + ">this.visitNodeOrToken(node." + child.name + ")";
            }
            else {
                result += "<" + child.type + ">this.visitNode(node." + child.name + ")";
            }

            if (j < definition.children.length - 1) {
                result += ",\r\n";
            }
        }

        result += ");\r\n";
        result += "        }\r\n";
    }

    result += "    }";
    result += "\r\n}";
    return result;
}

function generateWalker(): string {
    var result = "";

    result +=
    "///<reference path='references.ts' />\r\n" +
    "\r\n" +
    "module TypeScript {\r\n" +
    "    export class SyntaxWalker implements ISyntaxVisitor {\r\n" +
    "        public visitToken(token: ISyntaxToken): void {\r\n" +
    "        }\r\n" +
    "\r\n" +
    "        private visitOptionalToken(token: ISyntaxToken): void {\r\n" +
    "            if (token === undefined) {\r\n" +
    "                return;\r\n" +
    "            }\r\n" +
    "\r\n" +
    "            this.visitToken(token);\r\n" +
    "        }\r\n" +
    "\r\n" +
    "        public visitList(list: ISyntaxNodeOrToken[]): void {\r\n" +
    "            for (var i = 0, n = list.length; i < n; i++) {\r\n" +
    "                visitNodeOrToken(this, list[i]);\r\n" +
    "            }\r\n" +
    "        }\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];

        result += "\r\n";
        result += "        public visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): void {\r\n";

        for (var j = 0; j < definition.children.length; j++) {
            var child = definition.children[j];

            if (child.isToken) {
                if (child.isOptional) {
                    result += "            this.visitOptionalToken(node." + child.name + ");\r\n";
                }
                else {
                    result += "            this.visitToken(node." + child.name + ");\r\n";
                }
            }
            else if (child.isList || child.isSeparatedList) {
                result += "            this.visitList(node." + child.name + ");\r\n";
            }
            else if (isNodeOrToken(child)) {
                //if (child.isOptional) {
                    result += "            visitNodeOrToken(this, node." + child.name + ");\r\n";
                //}
                //else {
                //    result += "            node." + child.name + ".accept(this);\r\n";
                //}
            }
            else if (child.type === "ISyntaxToken") {
                if (child.isOptional) {
                    result += "            this.visitOptionalToken(node." + child.name + ");\r\n";
                }
                else {
                    result += "            this.visitToken(node." + child.name + ");\r\n";
                }
            }
            else if (child.type !== "SyntaxKind") {
                //if (child.isOptional) {
                    result += "            visitNodeOrToken(this, node." + child.name + ");\r\n";
                //}
                //else {
                //    result += "            node." + child.name + ".accept(this);\r\n";
                //}
            }
        }

        result += "        }\r\n";
    }

    result += "    }";
    result += "\r\n}";
    return result;
}

function firstEnumName(e: any, value: number) {
    for (var name in e) {
        if (e[name] === value) {
            return name;
        }
    }
}

function groupBy<T>(array: T[], func: (v: T) => string): any {
    var result: any = {};

    for (var i = 0, n = array.length; i < n; i++) {
        var v: any = array[i];
        var k = func(v);

        var list: T[] = result[k] || [];
        list.push(v);
        result[k] = list;
    }

    return result;
}

function generateKeywordCondition(keywords: { text: string; kind: TypeScript.SyntaxKind; }[], currentCharacter: number, indent: string): string {
    var length = keywords[0].text.length;

    var result = "";
    var index: string;

    if (keywords.length === 1) {
        var keyword = keywords[0];
        
        if (currentCharacter === length) {
            return " return SyntaxKind." + firstEnumName(TypeScript.SyntaxKind, keyword.kind) + ";\r\n";
        }

        var keywordText = keywords[0].text;
        result = " return ("

        for (var i = currentCharacter; i < length; i++) {
            if (i > currentCharacter) {
                result += " && ";
            }

            index = i === 0 ? "start" : ("start + " + i);
            result += "str.charCodeAt(" + index + ") === CharacterCodes." + keywordText.substr(i, 1);
        }

        result += ") ? SyntaxKind." + firstEnumName(TypeScript.SyntaxKind, keyword.kind) + " : SyntaxKind.IdentifierName;\r\n";
    }
    else {
        result += " // " + TypeScript.ArrayUtilities.select(keywords, k => k.text).join(", ") + "\r\n"
        // result += "\r\n";
        index = currentCharacter === 0 ? "start" : ("start + " + currentCharacter);
        result += indent + "switch(str.charCodeAt(" + index + ")) {\r\n"

        var groupedKeywords = groupBy(keywords, k => k.text.substr(currentCharacter, 1));

        for (var c in groupedKeywords) {
            if (groupedKeywords.hasOwnProperty(c)) {
                result += indent + "  case CharacterCodes." + c + ":";
                result += generateKeywordCondition(groupedKeywords[c], currentCharacter + 1, indent + "    ");
            }
        }

        result += indent + "  default: return SyntaxKind.IdentifierName;\r\n";
        result += indent + "}\r\n";
    }

    return result;
}

function min<T>(array: T[], func: (v: T) => number): number {
    // Debug.assert(array.length > 0);
    var min = func(array[0]);

    for (var i = 1; i < array.length; i++) {
        var next = func(array[i]);
        if (next < min) {
            min = next;
        }
    }

    return min;
}

function max<T>(array: T[], func: (v: T) => number): number {
    // Debug.assert(array.length > 0);
    var max = func(array[0]);

    for (var i = 1; i < array.length; i++) {
        var next = func(array[i]);
        if (next > max) {
            max = next;
        }
    }

    return max;
}

function generateScannerUtilities(): string {
    var result = "///<reference path='references.ts' />\r\n" +
        "\r\n" +
        "module TypeScript {\r\n" +
        "    export module ScannerUtilities {\r\n";

    result += "        export function fixedWidthTokenLength(kind: SyntaxKind) {\r\n";
    result += "            switch (kind) {\r\n";

    for (var k = TypeScript.SyntaxKind.FirstFixedWidth; k <= TypeScript.SyntaxKind.LastFixedWidth; k++) {
        result += "                case SyntaxKind." + syntaxKindName(k) + ": return " + TypeScript.SyntaxFacts.getText(k).length + ";\r\n";
    }
    result += "                default: throw new Error();\r\n";
    result += "            }\r\n";
    result += "        }\r\n\r\n";

    var i: number;
    var keywords: { text: string; kind: TypeScript.SyntaxKind; }[] = [];

    for (i = TypeScript.SyntaxKind.FirstKeyword; i <= TypeScript.SyntaxKind.LastKeyword; i++) {
        keywords.push({ kind: i, text: TypeScript.SyntaxFacts.getText(i) });
    }

    keywords.sort((a, b) => a.text.localeCompare(b.text));

    result += "        export function identifierKind(str: string, start: number, length: number): SyntaxKind {\r\n";

    var minTokenLength = min(keywords, k => k.text.length);
    var maxTokenLength = max(keywords, k => k.text.length);
    result += "            switch (length) {\r\n";


    for (i = minTokenLength; i <= maxTokenLength; i++) {
        var keywordsOfLengthI = TypeScript.ArrayUtilities.where(keywords, k => k.text.length === i);
        if (keywordsOfLengthI.length > 0) {
            result += "              case " + i + ":";
            result += generateKeywordCondition(keywordsOfLengthI, 0, "                ");
        }
    }

    result += "              default: return SyntaxKind.IdentifierName;\r\n";
    result += "            }\r\n";
    result += "        }\r\n";

    result += "    }\r\n";
    result += "}";

    return result;
}

function generateVisitor(): string {
    var result = "";

    result += "///<reference path='references.ts' />\r\n\r\n";

    result += "module TypeScript {\r\n";
    result += "    export function visitNodeOrToken(visitor: ISyntaxVisitor, element: ISyntaxNodeOrToken): any {\r\n";
    result += "        if (element === undefined) { return undefined; }\r\n";
    // result += "        return element.accept(visitor);\r\n";

    result += "        switch (element.kind()) {\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];

        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ": ";
        result += "return visitor.visit" + getNameWithoutSuffix(definition) + "(<" + definition.name + ">element);\r\n";
    }

    result += "            default: return visitor.visitToken(<ISyntaxToken>element);\r\n";
    result += "        }\r\n";
    result += "    }\r\n\r\n";

    result += "    export interface ISyntaxVisitor {\r\n";
    result += "        visitToken(token: ISyntaxToken): any;\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        result += "        visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): any;\r\n";
    }

    result += "    }";

    result += "\r\n}";

    return result;
}

function generateDefaultVisitor(): string {
    var result = "";

    result += "///<reference path='references.ts' />\r\n\r\n";

    result += "module TypeScript {\r\n";
    if (!forPrettyPrinter) {
        result += "    export class SyntaxVisitor implements ISyntaxVisitor {\r\n";
        result += "        public defaultVisit(node: ISyntaxNodeOrToken): any {\r\n";
        result += "            return undefined;\r\n";
        result += "        }\r\n";
        result += "\r\n";
        result += "        public visitToken(token: ISyntaxToken): any {\r\n";
        result += "            return this.defaultVisit(token);\r\n";
        result += "        }\r\n";

        for (var i = 0; i < definitions.length; i++) {
            var definition = definitions[i];

            result += "\r\n        public visit" + getNameWithoutSuffix(definition) + "(node: " + definition.name + "): any {\r\n";
            result += "            return this.defaultVisit(node);\r\n";
            result += "        }\r\n";
        }

        result += "    }";
    }

    result += "\r\n}";

    return result;
}

function generateServicesUtilities(): string {
    var result = ""; // "/// <reference path='references.ts' />\r\n\r\n";

    result += "module TypeScript {\r\n";

    // result += generateIsTypeScriptSpecific();
    result += "    export function childCount(element: ISyntaxElement): number {\r\n";
    result += "        if (isList(element)) { return (<ISyntaxNodeOrToken[]>element).length; }\r\n";
    result += "        switch (element.kind()) {\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ": return " + definition.children.length + ";\r\n";
    }

    result += "            default: return 0;\r\n"

    result += "        }\r\n";
    result += "    }\r\n\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        result += "    function " + camelCase(getNameWithoutSuffix(definition)) + "ChildAt(node: " + definition.name + ", index: number): ISyntaxElement {\r\n";
        if (definition.children.length) {
            result += "        switch (index) {\r\n";

            for (var j = 0; j < definition.children.length; j++) {
                result += "            case " + j + ": return node." + definition.children[j].name + ";\r\n";
            }

            result += "        }\r\n";
        }
        else {
            result += "        throw Errors.invalidOperation();\r\n";
        }
        result += "    }\r\n";
    }


    result += "    export function childAt(element: ISyntaxElement, index: number): ISyntaxElement {\r\n";
    result += "        if (isList(element)) { return (<ISyntaxNodeOrToken[]>element)[index]; }\r\n";
    result += "        switch (element.kind()) {\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ": return " + camelCase(getNameWithoutSuffix(definition)) + "ChildAt(<" + definition.name + ">element, index);\r\n";
    }

    result += "        }\r\n";
    result += "    }\r\n";

    result += "}";


    return result;
}

function generateIsTypeScriptSpecific(): string {
    var result = "";

    result += "module TypeScript {\r\n";

    result += "    function isListTypeScriptSpecific(list: ISyntaxNodeOrToken[]): boolean {\r\n"
    result += "        for (var i = 0, n = list.length; i < n; i++) {\r\n";
    result += "            if (isTypeScriptSpecific(list[i])) {\r\n";
    result += "                return true;\r\n";
    result += "            }\r\n";
    result += "        }\r\n\r\n";
    result += "        return false;\r\n";
    result += "    }\r\n\r\n";

    result += "    export function isTypeScriptSpecific(element: ISyntaxElement): boolean {\r\n"
    result += "        if (!element) { return false; }\r\n";
    result += "        if (isToken(element)) { return false; }\r\n";
    result += "        if (isList(element)) { return isListTypeScriptSpecific(<ISyntaxNodeOrToken[]>element); }\r\n";
    result += "        switch (element.kind()) {\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (!definition.isTypeScriptSpecific) {
            continue;
        }

        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ":\r\n";
    }

    result += "                return true;\r\n";

    var triviallyFalseDefinitions = definitions.filter(d => d.children.filter(c => c.type !== "SyntaxKind" && !c.isToken).length === 0);
    for (var i = 0; i < triviallyFalseDefinitions.length; i++) {
        var definition = triviallyFalseDefinitions[i];
        if (definition.isTypeScriptSpecific) {
            continue;
        }

        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ":\r\n";
    }

    result += "                return false;\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.isTypeScriptSpecific) {
            continue;
        }

        if (definition.children.filter(c => c.type !== "SyntaxKind" && !c.isToken).length === 0) {
            continue;
        }

        result += "            case SyntaxKind." + getNameWithoutSuffix(definition) + ":";
        result += "\r\n";
        result += "                return is" + getNameWithoutSuffix(definition) + "TypeScriptSpecific(<" + definition.name + ">element);\r\n";
    }

    result += "        }\r\n";
    result += "    }\r\n";

    for (var i = 0; i < definitions.length; i++) {
        var definition = definitions[i];
        if (definition.isTypeScriptSpecific) {
            continue;
        }

        var importantChildren = definition.children.filter(d => d.type !== "SyntaxKind" && !d.isToken);
        if (importantChildren.length > 0) {
            result += generateIsTypeScriptSpecificMethod(definition);
        }
    }

    result += "}";

    return result;
}

function generateIsTypeScriptSpecificMethod(definition: ITypeDefinition): string {
    var result = "\r\n    function is" + getNameWithoutSuffix(definition) + "TypeScriptSpecific(node: " + definition.name + "): boolean {\r\n";

    result += "        return ";

    var addedCheck = false;
    for (var i = 0; i < definition.children.length; i++) {
        var child = definition.children[i];

        if (child.type === "SyntaxKind") {
            continue;
        }

        if (child.isToken) {
            continue;
        }

        if (addedCheck) {
            result += " ||\r\n               ";
        }

        addedCheck = true;

        if (child.isTypeScriptSpecific) {
            if (child.isList || child.isSeparatedList) {
                result += getPropertyAccess(child, "node") + ".length > 0";
            }
            else {
                result += "!!" + getPropertyAccess(child, "node");
            }
        }
        else {
            result += "isTypeScriptSpecific(" + getPropertyAccess(child, "node") + ")";
        }
    }

    if (!addedCheck) {
        result += "false";
    }

    result += ";\r\n";
    result += "    }\r\n";

    return result;
}

var syntaxNodesConcrete = generateNodes(/*abstract:*/ false);
var syntaxInterfaces = generateSyntaxInterfaces();
var rewriter = generateRewriter();
var walker = generateWalker();
var scannerUtilities = generateScannerUtilities();
var visitor = generateVisitor();
var defaultVisitor = generateDefaultVisitor();
var servicesUtilities = generateServicesUtilities();

sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxNodes.concrete.generated.ts", syntaxNodesConcrete, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxInterfaces.generated.ts", syntaxInterfaces, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxRewriter.generated.ts", rewriter, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxWalker.generated.ts", walker, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\scannerUtilities.generated.ts", scannerUtilities, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxVisitor.generated.ts", visitor, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\defaultSyntaxVisitor.generated.ts", defaultVisitor, false);
sys.writeFile(sys.getCurrentDirectory() + "\\src\\services\\syntax\\syntaxUtilities.generated.ts", servicesUtilities, false);
