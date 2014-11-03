///<reference path='references.ts' />

module TypeScript {
    function finishNode(node: ISyntaxNode, data: number) {
        for (var name in node) {
            if (node.hasOwnProperty(name)) {
                var child: ISyntaxElement = (<any>node)[name];
                if (child) {
                    child.parent = node;
                }
            }
        }

        if (data) {
            node.__data = data;
        }
    }

    function sourceUnitSyntax(data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken) {
        this.moduleElements = moduleElements;
        this.endOfFileToken = endOfFileToken;
        finishNode(this, data);
    }
    sourceUnitSyntax.prototype.kind = function() { return SyntaxKind.SourceUnit; }
    export var SourceUnitSyntax: SourceUnitConstructor = <any>sourceUnitSyntax;

    function qualifiedNameSyntax(data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken) {
        this.left = left;
        this.dotToken = dotToken;
        this.right = right;
        finishNode(this, data);
    }
    qualifiedNameSyntax.prototype.kind = function() { return SyntaxKind.QualifiedName; }
    export var QualifiedNameSyntax: QualifiedNameConstructor = <any>qualifiedNameSyntax;

    function objectTypeSyntax(data: number, openBraceToken: ISyntaxToken, typeMembers: ISeparatedSyntaxList<ITypeMemberSyntax>, closeBraceToken: ISyntaxToken) {
        this.openBraceToken = openBraceToken;
        this.typeMembers = typeMembers;
        this.closeBraceToken = closeBraceToken;
        finishNode(this, data);
    }
    objectTypeSyntax.prototype.kind = function() { return SyntaxKind.ObjectType; }
    export var ObjectTypeSyntax: ObjectTypeConstructor = <any>objectTypeSyntax;

    function functionTypeSyntax(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
        this.typeParameterList = typeParameterList;
        this.parameterList = parameterList;
        this.equalsGreaterThanToken = equalsGreaterThanToken;
        this.type = type;
        finishNode(this, data);
    }
    functionTypeSyntax.prototype.kind = function() { return SyntaxKind.FunctionType; }
    export var FunctionTypeSyntax: FunctionTypeConstructor = <any>functionTypeSyntax;

    function arrayTypeSyntax(data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken) {
        this.type = type;
        this.openBracketToken = openBracketToken;
        this.closeBracketToken = closeBracketToken;
        finishNode(this, data);
    }
    arrayTypeSyntax.prototype.kind = function() { return SyntaxKind.ArrayType; }
    export var ArrayTypeSyntax: ArrayTypeConstructor = <any>arrayTypeSyntax;

    function constructorTypeSyntax(data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
        this.newKeyword = newKeyword;
        this.typeParameterList = typeParameterList;
        this.parameterList = parameterList;
        this.equalsGreaterThanToken = equalsGreaterThanToken;
        this.type = type;
        finishNode(this, data);
    }
    constructorTypeSyntax.prototype.kind = function() { return SyntaxKind.ConstructorType; }
    export var ConstructorTypeSyntax: ConstructorTypeConstructor = <any>constructorTypeSyntax;

    function genericTypeSyntax(data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax) {
        this.name = name;
        this.typeArgumentList = typeArgumentList;
        finishNode(this, data);
    }
    genericTypeSyntax.prototype.kind = function() { return SyntaxKind.GenericType; }
    export var GenericTypeSyntax: GenericTypeConstructor = <any>genericTypeSyntax;

    function typeQuerySyntax(data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax) {
        this.typeOfKeyword = typeOfKeyword;
        this.name = name;
        finishNode(this, data);
    }
    typeQuerySyntax.prototype.kind = function() { return SyntaxKind.TypeQuery; }
    export var TypeQuerySyntax: TypeQueryConstructor = <any>typeQuerySyntax;

    function tupleTypeSyntax(data: number, openBracketToken: ISyntaxToken, types: ISeparatedSyntaxList<ITypeSyntax>, closeBracketToken: ISyntaxToken) {
        this.openBracketToken = openBracketToken;
        this.types = types;
        this.closeBracketToken = closeBracketToken;
        finishNode(this, data);
    }
    tupleTypeSyntax.prototype.kind = function() { return SyntaxKind.TupleType; }
    export var TupleTypeSyntax: TupleTypeConstructor = <any>tupleTypeSyntax;

    function unionTypeSyntax(data: number, left: ITypeSyntax, barToken: ISyntaxToken, right: ITypeSyntax) {
        this.left = left;
        this.barToken = barToken;
        this.right = right;
        finishNode(this, data);
    }
    unionTypeSyntax.prototype.kind = function() { return SyntaxKind.UnionType; }
    export var UnionTypeSyntax: UnionTypeConstructor = <any>unionTypeSyntax;

    function parenthesizedTypeSyntax(data: number, openParenToken: ISyntaxToken, type: ITypeSyntax, closeParenToken: ISyntaxToken) {
        this.openParenToken = openParenToken;
        this.type = type;
        this.closeParenToken = closeParenToken;
        finishNode(this, data);
    }
    parenthesizedTypeSyntax.prototype.kind = function() { return SyntaxKind.ParenthesizedType; }
    export var ParenthesizedTypeSyntax: ParenthesizedTypeConstructor = <any>parenthesizedTypeSyntax;

    function interfaceDeclarationSyntax(data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax) {
        this.modifiers = modifiers;
        this.interfaceKeyword = interfaceKeyword;
        this.identifier = identifier;
        this.typeParameterList = typeParameterList;
        this.heritageClauses = heritageClauses;
        this.body = body;
        finishNode(this, data);
    }
    interfaceDeclarationSyntax.prototype.kind = function() { return SyntaxKind.InterfaceDeclaration; }
    export var InterfaceDeclarationSyntax: InterfaceDeclarationConstructor = <any>interfaceDeclarationSyntax;

    function functionDeclarationSyntax(data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.functionKeyword = functionKeyword;
        this.identifier = identifier;
        this.callSignature = callSignature;
        this.block = block;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    functionDeclarationSyntax.prototype.kind = function() { return SyntaxKind.FunctionDeclaration; }
    export var FunctionDeclarationSyntax: FunctionDeclarationConstructor = <any>functionDeclarationSyntax;

    function moduleDeclarationSyntax(data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.moduleKeyword = moduleKeyword;
        this.name = name;
        this.stringLiteral = stringLiteral;
        this.openBraceToken = openBraceToken;
        this.moduleElements = moduleElements;
        this.closeBraceToken = closeBraceToken;
        finishNode(this, data);
    }
    moduleDeclarationSyntax.prototype.kind = function() { return SyntaxKind.ModuleDeclaration; }
    export var ModuleDeclarationSyntax: ModuleDeclarationConstructor = <any>moduleDeclarationSyntax;

    function classDeclarationSyntax(data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.classKeyword = classKeyword;
        this.identifier = identifier;
        this.typeParameterList = typeParameterList;
        this.heritageClauses = heritageClauses;
        this.openBraceToken = openBraceToken;
        this.classElements = classElements;
        this.closeBraceToken = closeBraceToken;
        finishNode(this, data);
    }
    classDeclarationSyntax.prototype.kind = function() { return SyntaxKind.ClassDeclaration; }
    export var ClassDeclarationSyntax: ClassDeclarationConstructor = <any>classDeclarationSyntax;

    function enumDeclarationSyntax(data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: ISeparatedSyntaxList<EnumElementSyntax>, closeBraceToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.enumKeyword = enumKeyword;
        this.identifier = identifier;
        this.openBraceToken = openBraceToken;
        this.enumElements = enumElements;
        this.closeBraceToken = closeBraceToken;
        finishNode(this, data);
    }
    enumDeclarationSyntax.prototype.kind = function() { return SyntaxKind.EnumDeclaration; }
    export var EnumDeclarationSyntax: EnumDeclarationConstructor = <any>enumDeclarationSyntax;

    function importDeclarationSyntax(data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.importKeyword = importKeyword;
        this.identifier = identifier;
        this.equalsToken = equalsToken;
        this.moduleReference = moduleReference;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    importDeclarationSyntax.prototype.kind = function() { return SyntaxKind.ImportDeclaration; }
    export var ImportDeclarationSyntax: ImportDeclarationConstructor = <any>importDeclarationSyntax;

    function exportAssignmentSyntax(data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
        this.exportKeyword = exportKeyword;
        this.equalsToken = equalsToken;
        this.identifier = identifier;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    exportAssignmentSyntax.prototype.kind = function() { return SyntaxKind.ExportAssignment; }
    export var ExportAssignmentSyntax: ExportAssignmentConstructor = <any>exportAssignmentSyntax;

    function memberFunctionDeclarationSyntax(data: number, modifiers: ISyntaxToken[], propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.propertyName = propertyName;
        this.callSignature = callSignature;
        this.block = block;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    memberFunctionDeclarationSyntax.prototype.kind = function() { return SyntaxKind.MemberFunctionDeclaration; }
    export var MemberFunctionDeclarationSyntax: MemberFunctionDeclarationConstructor = <any>memberFunctionDeclarationSyntax;

    function memberVariableDeclarationSyntax(data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.variableDeclarator = variableDeclarator;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    memberVariableDeclarationSyntax.prototype.kind = function() { return SyntaxKind.MemberVariableDeclaration; }
    export var MemberVariableDeclarationSyntax: MemberVariableDeclarationConstructor = <any>memberVariableDeclarationSyntax;

    function constructorDeclarationSyntax(data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.constructorKeyword = constructorKeyword;
        this.callSignature = callSignature;
        this.block = block;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    constructorDeclarationSyntax.prototype.kind = function() { return SyntaxKind.ConstructorDeclaration; }
    export var ConstructorDeclarationSyntax: ConstructorDeclarationConstructor = <any>constructorDeclarationSyntax;

    function indexMemberDeclarationSyntax(data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.indexSignature = indexSignature;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    indexMemberDeclarationSyntax.prototype.kind = function() { return SyntaxKind.IndexMemberDeclaration; }
    export var IndexMemberDeclarationSyntax: IndexMemberDeclarationConstructor = <any>indexMemberDeclarationSyntax;

    function getAccessorSyntax(data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
        this.modifiers = modifiers;
        this.getKeyword = getKeyword;
        this.propertyName = propertyName;
        this.callSignature = callSignature;
        this.block = block;
        finishNode(this, data);
    }
    getAccessorSyntax.prototype.kind = function() { return SyntaxKind.GetAccessor; }
    export var GetAccessorSyntax: GetAccessorConstructor = <any>getAccessorSyntax;

    function setAccessorSyntax(data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
        this.modifiers = modifiers;
        this.setKeyword = setKeyword;
        this.propertyName = propertyName;
        this.callSignature = callSignature;
        this.block = block;
        finishNode(this, data);
    }
    setAccessorSyntax.prototype.kind = function() { return SyntaxKind.SetAccessor; }
    export var SetAccessorSyntax: SetAccessorConstructor = <any>setAccessorSyntax;

    function propertySignatureSyntax(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
        this.propertyName = propertyName;
        this.questionToken = questionToken;
        this.typeAnnotation = typeAnnotation;
        finishNode(this, data);
    }
    propertySignatureSyntax.prototype.kind = function() { return SyntaxKind.PropertySignature; }
    export var PropertySignatureSyntax: PropertySignatureConstructor = <any>propertySignatureSyntax;

    function callSignatureSyntax(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax) {
        this.typeParameterList = typeParameterList;
        this.parameterList = parameterList;
        this.typeAnnotation = typeAnnotation;
        finishNode(this, data);
    }
    callSignatureSyntax.prototype.kind = function() { return SyntaxKind.CallSignature; }
    export var CallSignatureSyntax: CallSignatureConstructor = <any>callSignatureSyntax;

    function constructSignatureSyntax(data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax) {
        this.newKeyword = newKeyword;
        this.callSignature = callSignature;
        finishNode(this, data);
    }
    constructSignatureSyntax.prototype.kind = function() { return SyntaxKind.ConstructSignature; }
    export var ConstructSignatureSyntax: ConstructSignatureConstructor = <any>constructSignatureSyntax;

    function indexSignatureSyntax(data: number, openBracketToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
        this.openBracketToken = openBracketToken;
        this.parameters = parameters;
        this.closeBracketToken = closeBracketToken;
        this.typeAnnotation = typeAnnotation;
        finishNode(this, data);
    }
    indexSignatureSyntax.prototype.kind = function() { return SyntaxKind.IndexSignature; }
    export var IndexSignatureSyntax: IndexSignatureConstructor = <any>indexSignatureSyntax;

    function methodSignatureSyntax(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax) {
        this.propertyName = propertyName;
        this.questionToken = questionToken;
        this.callSignature = callSignature;
        finishNode(this, data);
    }
    methodSignatureSyntax.prototype.kind = function() { return SyntaxKind.MethodSignature; }
    export var MethodSignatureSyntax: MethodSignatureConstructor = <any>methodSignatureSyntax;

    function blockSyntax(data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken) {
        this.openBraceToken = openBraceToken;
        this.statements = statements;
        this.closeBraceToken = closeBraceToken;
        finishNode(this, data);
    }
    blockSyntax.prototype.kind = function() { return SyntaxKind.Block; }
    export var BlockSyntax: BlockConstructor = <any>blockSyntax;

    function ifStatementSyntax(data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax) {
        this.ifKeyword = ifKeyword;
        this.openParenToken = openParenToken;
        this.condition = condition;
        this.closeParenToken = closeParenToken;
        this.statement = statement;
        this.elseClause = elseClause;
        finishNode(this, data);
    }
    ifStatementSyntax.prototype.kind = function() { return SyntaxKind.IfStatement; }
    export var IfStatementSyntax: IfStatementConstructor = <any>ifStatementSyntax;

    function variableStatementSyntax(data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken) {
        this.modifiers = modifiers;
        this.variableDeclaration = variableDeclaration;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    variableStatementSyntax.prototype.kind = function() { return SyntaxKind.VariableStatement; }
    export var VariableStatementSyntax: VariableStatementConstructor = <any>variableStatementSyntax;

    function expressionStatementSyntax(data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
        this.expression = expression;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    expressionStatementSyntax.prototype.kind = function() { return SyntaxKind.ExpressionStatement; }
    export var ExpressionStatementSyntax: ExpressionStatementConstructor = <any>expressionStatementSyntax;

    function returnStatementSyntax(data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
        this.returnKeyword = returnKeyword;
        this.expression = expression;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    returnStatementSyntax.prototype.kind = function() { return SyntaxKind.ReturnStatement; }
    export var ReturnStatementSyntax: ReturnStatementConstructor = <any>returnStatementSyntax;

    function switchStatementSyntax(data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken) {
        this.switchKeyword = switchKeyword;
        this.openParenToken = openParenToken;
        this.expression = expression;
        this.closeParenToken = closeParenToken;
        this.openBraceToken = openBraceToken;
        this.switchClauses = switchClauses;
        this.closeBraceToken = closeBraceToken;
        finishNode(this, data);
    }
    switchStatementSyntax.prototype.kind = function() { return SyntaxKind.SwitchStatement; }
    export var SwitchStatementSyntax: SwitchStatementConstructor = <any>switchStatementSyntax;

    function breakStatementSyntax(data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
        this.breakKeyword = breakKeyword;
        this.identifier = identifier;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    breakStatementSyntax.prototype.kind = function() { return SyntaxKind.BreakStatement; }
    export var BreakStatementSyntax: BreakStatementConstructor = <any>breakStatementSyntax;

    function continueStatementSyntax(data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
        this.continueKeyword = continueKeyword;
        this.identifier = identifier;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    continueStatementSyntax.prototype.kind = function() { return SyntaxKind.ContinueStatement; }
    export var ContinueStatementSyntax: ContinueStatementConstructor = <any>continueStatementSyntax;

    function forStatementSyntax(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        this.forKeyword = forKeyword;
        this.openParenToken = openParenToken;
        this.variableDeclaration = variableDeclaration;
        this.initializer = initializer;
        this.firstSemicolonToken = firstSemicolonToken;
        this.condition = condition;
        this.secondSemicolonToken = secondSemicolonToken;
        this.incrementor = incrementor;
        this.closeParenToken = closeParenToken;
        this.statement = statement;
        finishNode(this, data);
    }
    forStatementSyntax.prototype.kind = function() { return SyntaxKind.ForStatement; }
    export var ForStatementSyntax: ForStatementConstructor = <any>forStatementSyntax;

    function forInStatementSyntax(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        this.forKeyword = forKeyword;
        this.openParenToken = openParenToken;
        this.variableDeclaration = variableDeclaration;
        this.left = left;
        this.inKeyword = inKeyword;
        this.expression = expression;
        this.closeParenToken = closeParenToken;
        this.statement = statement;
        finishNode(this, data);
    }
    forInStatementSyntax.prototype.kind = function() { return SyntaxKind.ForInStatement; }
    export var ForInStatementSyntax: ForInStatementConstructor = <any>forInStatementSyntax;

    function emptyStatementSyntax(data: number, semicolonToken: ISyntaxToken) {
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    emptyStatementSyntax.prototype.kind = function() { return SyntaxKind.EmptyStatement; }
    export var EmptyStatementSyntax: EmptyStatementConstructor = <any>emptyStatementSyntax;

    function throwStatementSyntax(data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
        this.throwKeyword = throwKeyword;
        this.expression = expression;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    throwStatementSyntax.prototype.kind = function() { return SyntaxKind.ThrowStatement; }
    export var ThrowStatementSyntax: ThrowStatementConstructor = <any>throwStatementSyntax;

    function whileStatementSyntax(data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        this.whileKeyword = whileKeyword;
        this.openParenToken = openParenToken;
        this.condition = condition;
        this.closeParenToken = closeParenToken;
        this.statement = statement;
        finishNode(this, data);
    }
    whileStatementSyntax.prototype.kind = function() { return SyntaxKind.WhileStatement; }
    export var WhileStatementSyntax: WhileStatementConstructor = <any>whileStatementSyntax;

    function tryStatementSyntax(data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax) {
        this.tryKeyword = tryKeyword;
        this.block = block;
        this.catchClause = catchClause;
        this.finallyClause = finallyClause;
        finishNode(this, data);
    }
    tryStatementSyntax.prototype.kind = function() { return SyntaxKind.TryStatement; }
    export var TryStatementSyntax: TryStatementConstructor = <any>tryStatementSyntax;

    function labeledStatementSyntax(data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax) {
        this.identifier = identifier;
        this.colonToken = colonToken;
        this.statement = statement;
        finishNode(this, data);
    }
    labeledStatementSyntax.prototype.kind = function() { return SyntaxKind.LabeledStatement; }
    export var LabeledStatementSyntax: LabeledStatementConstructor = <any>labeledStatementSyntax;

    function doStatementSyntax(data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken) {
        this.doKeyword = doKeyword;
        this.statement = statement;
        this.whileKeyword = whileKeyword;
        this.openParenToken = openParenToken;
        this.condition = condition;
        this.closeParenToken = closeParenToken;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    doStatementSyntax.prototype.kind = function() { return SyntaxKind.DoStatement; }
    export var DoStatementSyntax: DoStatementConstructor = <any>doStatementSyntax;

    function debuggerStatementSyntax(data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken) {
        this.debuggerKeyword = debuggerKeyword;
        this.semicolonToken = semicolonToken;
        finishNode(this, data);
    }
    debuggerStatementSyntax.prototype.kind = function() { return SyntaxKind.DebuggerStatement; }
    export var DebuggerStatementSyntax: DebuggerStatementConstructor = <any>debuggerStatementSyntax;

    function withStatementSyntax(data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        this.withKeyword = withKeyword;
        this.openParenToken = openParenToken;
        this.condition = condition;
        this.closeParenToken = closeParenToken;
        this.statement = statement;
        finishNode(this, data);
    }
    withStatementSyntax.prototype.kind = function() { return SyntaxKind.WithStatement; }
    export var WithStatementSyntax: WithStatementConstructor = <any>withStatementSyntax;

    function prefixUnaryExpressionSyntax(data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax) {
        this.operatorToken = operatorToken;
        this.operand = operand;
        finishNode(this, data);
    }
    prefixUnaryExpressionSyntax.prototype.kind = function() { return SyntaxKind.PrefixUnaryExpression; }
    export var PrefixUnaryExpressionSyntax: PrefixUnaryExpressionConstructor = <any>prefixUnaryExpressionSyntax;

    function deleteExpressionSyntax(data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        this.deleteKeyword = deleteKeyword;
        this.expression = expression;
        finishNode(this, data);
    }
    deleteExpressionSyntax.prototype.kind = function() { return SyntaxKind.DeleteExpression; }
    export var DeleteExpressionSyntax: DeleteExpressionConstructor = <any>deleteExpressionSyntax;

    function typeOfExpressionSyntax(data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        this.typeOfKeyword = typeOfKeyword;
        this.expression = expression;
        finishNode(this, data);
    }
    typeOfExpressionSyntax.prototype.kind = function() { return SyntaxKind.TypeOfExpression; }
    export var TypeOfExpressionSyntax: TypeOfExpressionConstructor = <any>typeOfExpressionSyntax;

    function voidExpressionSyntax(data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        this.voidKeyword = voidKeyword;
        this.expression = expression;
        finishNode(this, data);
    }
    voidExpressionSyntax.prototype.kind = function() { return SyntaxKind.VoidExpression; }
    export var VoidExpressionSyntax: VoidExpressionConstructor = <any>voidExpressionSyntax;

    function conditionalExpressionSyntax(data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax) {
        this.condition = condition;
        this.questionToken = questionToken;
        this.whenTrue = whenTrue;
        this.colonToken = colonToken;
        this.whenFalse = whenFalse;
        finishNode(this, data);
    }
    conditionalExpressionSyntax.prototype.kind = function() { return SyntaxKind.ConditionalExpression; }
    export var ConditionalExpressionSyntax: ConditionalExpressionConstructor = <any>conditionalExpressionSyntax;

    function binaryExpressionSyntax(data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax) {
        this.left = left;
        this.operatorToken = operatorToken;
        this.right = right;
        finishNode(this, data);
    }
    binaryExpressionSyntax.prototype.kind = function() { return SyntaxKind.BinaryExpression; }
    export var BinaryExpressionSyntax: BinaryExpressionConstructor = <any>binaryExpressionSyntax;

    function postfixUnaryExpressionSyntax(data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken) {
        this.operand = operand;
        this.operatorToken = operatorToken;
        finishNode(this, data);
    }
    postfixUnaryExpressionSyntax.prototype.kind = function() { return SyntaxKind.PostfixUnaryExpression; }
    export var PostfixUnaryExpressionSyntax: PostfixUnaryExpressionConstructor = <any>postfixUnaryExpressionSyntax;

    function memberAccessExpressionSyntax(data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken) {
        this.expression = expression;
        this.dotToken = dotToken;
        this.name = name;
        finishNode(this, data);
    }
    memberAccessExpressionSyntax.prototype.kind = function() { return SyntaxKind.MemberAccessExpression; }
    export var MemberAccessExpressionSyntax: MemberAccessExpressionConstructor = <any>memberAccessExpressionSyntax;

    function invocationExpressionSyntax(data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax) {
        this.expression = expression;
        this.argumentList = argumentList;
        finishNode(this, data);
    }
    invocationExpressionSyntax.prototype.kind = function() { return SyntaxKind.InvocationExpression; }
    export var InvocationExpressionSyntax: InvocationExpressionConstructor = <any>invocationExpressionSyntax;

    function arrayLiteralExpressionSyntax(data: number, openBracketToken: ISyntaxToken, expressions: ISeparatedSyntaxList<IExpressionSyntax>, closeBracketToken: ISyntaxToken) {
        this.openBracketToken = openBracketToken;
        this.expressions = expressions;
        this.closeBracketToken = closeBracketToken;
        finishNode(this, data);
    }
    arrayLiteralExpressionSyntax.prototype.kind = function() { return SyntaxKind.ArrayLiteralExpression; }
    export var ArrayLiteralExpressionSyntax: ArrayLiteralExpressionConstructor = <any>arrayLiteralExpressionSyntax;

    function objectLiteralExpressionSyntax(data: number, openBraceToken: ISyntaxToken, propertyAssignments: ISeparatedSyntaxList<IPropertyAssignmentSyntax>, closeBraceToken: ISyntaxToken) {
        this.openBraceToken = openBraceToken;
        this.propertyAssignments = propertyAssignments;
        this.closeBraceToken = closeBraceToken;
        finishNode(this, data);
    }
    objectLiteralExpressionSyntax.prototype.kind = function() { return SyntaxKind.ObjectLiteralExpression; }
    export var ObjectLiteralExpressionSyntax: ObjectLiteralExpressionConstructor = <any>objectLiteralExpressionSyntax;

    function objectCreationExpressionSyntax(data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax) {
        this.newKeyword = newKeyword;
        this.expression = expression;
        this.argumentList = argumentList;
        finishNode(this, data);
    }
    objectCreationExpressionSyntax.prototype.kind = function() { return SyntaxKind.ObjectCreationExpression; }
    export var ObjectCreationExpressionSyntax: ObjectCreationExpressionConstructor = <any>objectCreationExpressionSyntax;

    function parenthesizedExpressionSyntax(data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken) {
        this.openParenToken = openParenToken;
        this.expression = expression;
        this.closeParenToken = closeParenToken;
        finishNode(this, data);
    }
    parenthesizedExpressionSyntax.prototype.kind = function() { return SyntaxKind.ParenthesizedExpression; }
    export var ParenthesizedExpressionSyntax: ParenthesizedExpressionConstructor = <any>parenthesizedExpressionSyntax;

    function parenthesizedArrowFunctionExpressionSyntax(data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
        this.callSignature = callSignature;
        this.equalsGreaterThanToken = equalsGreaterThanToken;
        this.block = block;
        this.expression = expression;
        finishNode(this, data);
    }
    parenthesizedArrowFunctionExpressionSyntax.prototype.kind = function() { return SyntaxKind.ParenthesizedArrowFunctionExpression; }
    export var ParenthesizedArrowFunctionExpressionSyntax: ParenthesizedArrowFunctionExpressionConstructor = <any>parenthesizedArrowFunctionExpressionSyntax;

    function simpleArrowFunctionExpressionSyntax(data: number, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
        this.parameter = parameter;
        this.equalsGreaterThanToken = equalsGreaterThanToken;
        this.block = block;
        this.expression = expression;
        finishNode(this, data);
    }
    simpleArrowFunctionExpressionSyntax.prototype.kind = function() { return SyntaxKind.SimpleArrowFunctionExpression; }
    export var SimpleArrowFunctionExpressionSyntax: SimpleArrowFunctionExpressionConstructor = <any>simpleArrowFunctionExpressionSyntax;

    function castExpressionSyntax(data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        this.lessThanToken = lessThanToken;
        this.type = type;
        this.greaterThanToken = greaterThanToken;
        this.expression = expression;
        finishNode(this, data);
    }
    castExpressionSyntax.prototype.kind = function() { return SyntaxKind.CastExpression; }
    export var CastExpressionSyntax: CastExpressionConstructor = <any>castExpressionSyntax;

    function elementAccessExpressionSyntax(data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken) {
        this.expression = expression;
        this.openBracketToken = openBracketToken;
        this.argumentExpression = argumentExpression;
        this.closeBracketToken = closeBracketToken;
        finishNode(this, data);
    }
    elementAccessExpressionSyntax.prototype.kind = function() { return SyntaxKind.ElementAccessExpression; }
    export var ElementAccessExpressionSyntax: ElementAccessExpressionConstructor = <any>elementAccessExpressionSyntax;

    function functionExpressionSyntax(data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
        this.functionKeyword = functionKeyword;
        this.identifier = identifier;
        this.callSignature = callSignature;
        this.block = block;
        finishNode(this, data);
    }
    functionExpressionSyntax.prototype.kind = function() { return SyntaxKind.FunctionExpression; }
    export var FunctionExpressionSyntax: FunctionExpressionConstructor = <any>functionExpressionSyntax;

    function omittedExpressionSyntax(data: number) {
        finishNode(this, data);
    }
    omittedExpressionSyntax.prototype.kind = function() { return SyntaxKind.OmittedExpression; }
    export var OmittedExpressionSyntax: OmittedExpressionConstructor = <any>omittedExpressionSyntax;

    function templateExpressionSyntax(data: number, templateStartToken: ISyntaxToken, templateClauses: TemplateClauseSyntax[]) {
        this.templateStartToken = templateStartToken;
        this.templateClauses = templateClauses;
        finishNode(this, data);
    }
    templateExpressionSyntax.prototype.kind = function() { return SyntaxKind.TemplateExpression; }
    export var TemplateExpressionSyntax: TemplateExpressionConstructor = <any>templateExpressionSyntax;

    function templateAccessExpressionSyntax(data: number, expression: ILeftHandSideExpressionSyntax, templateExpression: IPrimaryExpressionSyntax) {
        this.expression = expression;
        this.templateExpression = templateExpression;
        finishNode(this, data);
    }
    templateAccessExpressionSyntax.prototype.kind = function() { return SyntaxKind.TemplateAccessExpression; }
    export var TemplateAccessExpressionSyntax: TemplateAccessExpressionConstructor = <any>templateAccessExpressionSyntax;

    function variableDeclarationSyntax(data: number, varKeyword: ISyntaxToken, variableDeclarators: ISeparatedSyntaxList<VariableDeclaratorSyntax>) {
        this.varKeyword = varKeyword;
        this.variableDeclarators = variableDeclarators;
        finishNode(this, data);
    }
    variableDeclarationSyntax.prototype.kind = function() { return SyntaxKind.VariableDeclaration; }
    export var VariableDeclarationSyntax: VariableDeclarationConstructor = <any>variableDeclarationSyntax;

    function variableDeclaratorSyntax(data: number, propertyName: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
        this.propertyName = propertyName;
        this.typeAnnotation = typeAnnotation;
        this.equalsValueClause = equalsValueClause;
        finishNode(this, data);
    }
    variableDeclaratorSyntax.prototype.kind = function() { return SyntaxKind.VariableDeclarator; }
    export var VariableDeclaratorSyntax: VariableDeclaratorConstructor = <any>variableDeclaratorSyntax;

    function argumentListSyntax(data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, _arguments: ISeparatedSyntaxList<IExpressionSyntax>, closeParenToken: ISyntaxToken) {
        this.typeArgumentList = typeArgumentList;
        this.openParenToken = openParenToken;
        this.arguments = _arguments;
        this.closeParenToken = closeParenToken;
        finishNode(this, data);
    }
    argumentListSyntax.prototype.kind = function() { return SyntaxKind.ArgumentList; }
    export var ArgumentListSyntax: ArgumentListConstructor = <any>argumentListSyntax;

    function parameterListSyntax(data: number, openParenToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeParenToken: ISyntaxToken) {
        this.openParenToken = openParenToken;
        this.parameters = parameters;
        this.closeParenToken = closeParenToken;
        finishNode(this, data);
    }
    parameterListSyntax.prototype.kind = function() { return SyntaxKind.ParameterList; }
    export var ParameterListSyntax: ParameterListConstructor = <any>parameterListSyntax;

    function typeArgumentListSyntax(data: number, lessThanToken: ISyntaxToken, typeArguments: ISeparatedSyntaxList<ITypeSyntax>, greaterThanToken: ISyntaxToken) {
        this.lessThanToken = lessThanToken;
        this.typeArguments = typeArguments;
        this.greaterThanToken = greaterThanToken;
        finishNode(this, data);
    }
    typeArgumentListSyntax.prototype.kind = function() { return SyntaxKind.TypeArgumentList; }
    export var TypeArgumentListSyntax: TypeArgumentListConstructor = <any>typeArgumentListSyntax;

    function typeParameterListSyntax(data: number, lessThanToken: ISyntaxToken, typeParameters: ISeparatedSyntaxList<TypeParameterSyntax>, greaterThanToken: ISyntaxToken) {
        this.lessThanToken = lessThanToken;
        this.typeParameters = typeParameters;
        this.greaterThanToken = greaterThanToken;
        finishNode(this, data);
    }
    typeParameterListSyntax.prototype.kind = function() { return SyntaxKind.TypeParameterList; }
    export var TypeParameterListSyntax: TypeParameterListConstructor = <any>typeParameterListSyntax;

    function heritageClauseSyntax(data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: ISeparatedSyntaxList<INameSyntax>) {
        this.extendsOrImplementsKeyword = extendsOrImplementsKeyword;
        this.typeNames = typeNames;
        finishNode(this, data);
    }
    heritageClauseSyntax.prototype.kind = function() { return SyntaxKind.HeritageClause; }
    export var HeritageClauseSyntax: HeritageClauseConstructor = <any>heritageClauseSyntax;

    function equalsValueClauseSyntax(data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax) {
        this.equalsToken = equalsToken;
        this.value = value;
        finishNode(this, data);
    }
    equalsValueClauseSyntax.prototype.kind = function() { return SyntaxKind.EqualsValueClause; }
    export var EqualsValueClauseSyntax: EqualsValueClauseConstructor = <any>equalsValueClauseSyntax;

    function caseSwitchClauseSyntax(data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
        this.caseKeyword = caseKeyword;
        this.expression = expression;
        this.colonToken = colonToken;
        this.statements = statements;
        finishNode(this, data);
    }
    caseSwitchClauseSyntax.prototype.kind = function() { return SyntaxKind.CaseSwitchClause; }
    export var CaseSwitchClauseSyntax: CaseSwitchClauseConstructor = <any>caseSwitchClauseSyntax;

    function defaultSwitchClauseSyntax(data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
        this.defaultKeyword = defaultKeyword;
        this.colonToken = colonToken;
        this.statements = statements;
        finishNode(this, data);
    }
    defaultSwitchClauseSyntax.prototype.kind = function() { return SyntaxKind.DefaultSwitchClause; }
    export var DefaultSwitchClauseSyntax: DefaultSwitchClauseConstructor = <any>defaultSwitchClauseSyntax;

    function elseClauseSyntax(data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax) {
        this.elseKeyword = elseKeyword;
        this.statement = statement;
        finishNode(this, data);
    }
    elseClauseSyntax.prototype.kind = function() { return SyntaxKind.ElseClause; }
    export var ElseClauseSyntax: ElseClauseConstructor = <any>elseClauseSyntax;

    function catchClauseSyntax(data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax) {
        this.catchKeyword = catchKeyword;
        this.openParenToken = openParenToken;
        this.identifier = identifier;
        this.typeAnnotation = typeAnnotation;
        this.closeParenToken = closeParenToken;
        this.block = block;
        finishNode(this, data);
    }
    catchClauseSyntax.prototype.kind = function() { return SyntaxKind.CatchClause; }
    export var CatchClauseSyntax: CatchClauseConstructor = <any>catchClauseSyntax;

    function finallyClauseSyntax(data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax) {
        this.finallyKeyword = finallyKeyword;
        this.block = block;
        finishNode(this, data);
    }
    finallyClauseSyntax.prototype.kind = function() { return SyntaxKind.FinallyClause; }
    export var FinallyClauseSyntax: FinallyClauseConstructor = <any>finallyClauseSyntax;

    function templateClauseSyntax(data: number, expression: IExpressionSyntax, templateMiddleOrEndToken: ISyntaxToken) {
        this.expression = expression;
        this.templateMiddleOrEndToken = templateMiddleOrEndToken;
        finishNode(this, data);
    }
    templateClauseSyntax.prototype.kind = function() { return SyntaxKind.TemplateClause; }
    export var TemplateClauseSyntax: TemplateClauseConstructor = <any>templateClauseSyntax;

    function typeParameterSyntax(data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax) {
        this.identifier = identifier;
        this.constraint = constraint;
        finishNode(this, data);
    }
    typeParameterSyntax.prototype.kind = function() { return SyntaxKind.TypeParameter; }
    export var TypeParameterSyntax: TypeParameterConstructor = <any>typeParameterSyntax;

    function constraintSyntax(data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken) {
        this.extendsKeyword = extendsKeyword;
        this.typeOrExpression = typeOrExpression;
        finishNode(this, data);
    }
    constraintSyntax.prototype.kind = function() { return SyntaxKind.Constraint; }
    export var ConstraintSyntax: ConstraintConstructor = <any>constraintSyntax;

    function simplePropertyAssignmentSyntax(data: number, propertyName: ISyntaxToken, colonToken: ISyntaxToken, expression: IExpressionSyntax) {
        this.propertyName = propertyName;
        this.colonToken = colonToken;
        this.expression = expression;
        finishNode(this, data);
    }
    simplePropertyAssignmentSyntax.prototype.kind = function() { return SyntaxKind.SimplePropertyAssignment; }
    export var SimplePropertyAssignmentSyntax: SimplePropertyAssignmentConstructor = <any>simplePropertyAssignmentSyntax;

    function functionPropertyAssignmentSyntax(data: number, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
        this.propertyName = propertyName;
        this.callSignature = callSignature;
        this.block = block;
        finishNode(this, data);
    }
    functionPropertyAssignmentSyntax.prototype.kind = function() { return SyntaxKind.FunctionPropertyAssignment; }
    export var FunctionPropertyAssignmentSyntax: FunctionPropertyAssignmentConstructor = <any>functionPropertyAssignmentSyntax;

    function parameterSyntax(data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
        this.dotDotDotToken = dotDotDotToken;
        this.modifiers = modifiers;
        this.identifier = identifier;
        this.questionToken = questionToken;
        this.typeAnnotation = typeAnnotation;
        this.equalsValueClause = equalsValueClause;
        finishNode(this, data);
    }
    parameterSyntax.prototype.kind = function() { return SyntaxKind.Parameter; }
    export var ParameterSyntax: ParameterConstructor = <any>parameterSyntax;

    function enumElementSyntax(data: number, propertyName: ISyntaxToken, equalsValueClause: EqualsValueClauseSyntax) {
        this.propertyName = propertyName;
        this.equalsValueClause = equalsValueClause;
        finishNode(this, data);
    }
    enumElementSyntax.prototype.kind = function() { return SyntaxKind.EnumElement; }
    export var EnumElementSyntax: EnumElementConstructor = <any>enumElementSyntax;

    function typeAnnotationSyntax(data: number, colonToken: ISyntaxToken, type: ITypeSyntax) {
        this.colonToken = colonToken;
        this.type = type;
        finishNode(this, data);
    }
    typeAnnotationSyntax.prototype.kind = function() { return SyntaxKind.TypeAnnotation; }
    export var TypeAnnotationSyntax: TypeAnnotationConstructor = <any>typeAnnotationSyntax;

    function externalModuleReferenceSyntax(data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken) {
        this.requireKeyword = requireKeyword;
        this.openParenToken = openParenToken;
        this.stringLiteral = stringLiteral;
        this.closeParenToken = closeParenToken;
        finishNode(this, data);
    }
    externalModuleReferenceSyntax.prototype.kind = function() { return SyntaxKind.ExternalModuleReference; }
    export var ExternalModuleReferenceSyntax: ExternalModuleReferenceConstructor = <any>externalModuleReferenceSyntax;

    function moduleNameModuleReferenceSyntax(data: number, moduleName: INameSyntax) {
        this.moduleName = moduleName;
        finishNode(this, data);
    }
    moduleNameModuleReferenceSyntax.prototype.kind = function() { return SyntaxKind.ModuleNameModuleReference; }
    export var ModuleNameModuleReferenceSyntax: ModuleNameModuleReferenceConstructor = <any>moduleNameModuleReferenceSyntax;
}