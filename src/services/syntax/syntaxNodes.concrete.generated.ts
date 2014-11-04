///<reference path='references.ts' />

module TypeScript {
    export var SourceUnitSyntax: SourceUnitConstructor = <any>function(data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.moduleElements = moduleElements, this.endOfFileToken = endOfFileToken;
        moduleElements.parent = this, endOfFileToken.parent = this;
    };
    SourceUnitSyntax.prototype.kind = SyntaxKind.SourceUnit;

    export var QualifiedNameSyntax: QualifiedNameConstructor = <any>function(data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.left = left, this.dotToken = dotToken, this.right = right;
        left.parent = this, dotToken.parent = this, right.parent = this;
    };
    QualifiedNameSyntax.prototype.kind = SyntaxKind.QualifiedName;

    export var ObjectTypeSyntax: ObjectTypeConstructor = <any>function(data: number, openBraceToken: ISyntaxToken, typeMembers: ISeparatedSyntaxList<ITypeMemberSyntax>, closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.openBraceToken = openBraceToken, this.typeMembers = typeMembers, this.closeBraceToken = closeBraceToken;
        openBraceToken.parent = this, typeMembers.parent = this, closeBraceToken.parent = this;
    };
    ObjectTypeSyntax.prototype.kind = SyntaxKind.ObjectType;

    export var FunctionTypeSyntax: FunctionTypeConstructor = <any>function(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
        if (data) { this.__data = data; }
        this.typeParameterList = typeParameterList, this.parameterList = parameterList, this.equalsGreaterThanToken = equalsGreaterThanToken, this.type = type;
        typeParameterList && (typeParameterList.parent = this), parameterList.parent = this, equalsGreaterThanToken.parent = this, type.parent = this;
    };
    FunctionTypeSyntax.prototype.kind = SyntaxKind.FunctionType;

    export var ArrayTypeSyntax: ArrayTypeConstructor = <any>function(data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.type = type, this.openBracketToken = openBracketToken, this.closeBracketToken = closeBracketToken;
        type.parent = this, openBracketToken.parent = this, closeBracketToken.parent = this;
    };
    ArrayTypeSyntax.prototype.kind = SyntaxKind.ArrayType;

    export var ConstructorTypeSyntax: ConstructorTypeConstructor = <any>function(data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
        if (data) { this.__data = data; }
        this.newKeyword = newKeyword, this.typeParameterList = typeParameterList, this.parameterList = parameterList, this.equalsGreaterThanToken = equalsGreaterThanToken, this.type = type;
        newKeyword.parent = this, typeParameterList && (typeParameterList.parent = this), parameterList.parent = this, equalsGreaterThanToken.parent = this, type.parent = this;
    };
    ConstructorTypeSyntax.prototype.kind = SyntaxKind.ConstructorType;

    export var GenericTypeSyntax: GenericTypeConstructor = <any>function(data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax) {
        if (data) { this.__data = data; }
        this.name = name, this.typeArgumentList = typeArgumentList;
        name.parent = this, typeArgumentList.parent = this;
    };
    GenericTypeSyntax.prototype.kind = SyntaxKind.GenericType;

    export var TypeQuerySyntax: TypeQueryConstructor = <any>function(data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax) {
        if (data) { this.__data = data; }
        this.typeOfKeyword = typeOfKeyword, this.name = name;
        typeOfKeyword.parent = this, name.parent = this;
    };
    TypeQuerySyntax.prototype.kind = SyntaxKind.TypeQuery;

    export var TupleTypeSyntax: TupleTypeConstructor = <any>function(data: number, openBracketToken: ISyntaxToken, types: ISeparatedSyntaxList<ITypeSyntax>, closeBracketToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.openBracketToken = openBracketToken, this.types = types, this.closeBracketToken = closeBracketToken;
        openBracketToken.parent = this, types.parent = this, closeBracketToken.parent = this;
    };
    TupleTypeSyntax.prototype.kind = SyntaxKind.TupleType;

    export var UnionTypeSyntax: UnionTypeConstructor = <any>function(data: number, left: ITypeSyntax, barToken: ISyntaxToken, right: ITypeSyntax) {
        if (data) { this.__data = data; }
        this.left = left, this.barToken = barToken, this.right = right;
        left.parent = this, barToken.parent = this, right.parent = this;
    };
    UnionTypeSyntax.prototype.kind = SyntaxKind.UnionType;

    export var ParenthesizedTypeSyntax: ParenthesizedTypeConstructor = <any>function(data: number, openParenToken: ISyntaxToken, type: ITypeSyntax, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.openParenToken = openParenToken, this.type = type, this.closeParenToken = closeParenToken;
        openParenToken.parent = this, type.parent = this, closeParenToken.parent = this;
    };
    ParenthesizedTypeSyntax.prototype.kind = SyntaxKind.ParenthesizedType;

    export var InterfaceDeclarationSyntax: InterfaceDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.interfaceKeyword = interfaceKeyword, this.identifier = identifier, this.typeParameterList = typeParameterList, this.heritageClauses = heritageClauses, this.body = body;
        modifiers.parent = this, interfaceKeyword.parent = this, identifier.parent = this, typeParameterList && (typeParameterList.parent = this), heritageClauses.parent = this, body.parent = this;
    };
    InterfaceDeclarationSyntax.prototype.kind = SyntaxKind.InterfaceDeclaration;

    export var FunctionDeclarationSyntax: FunctionDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.functionKeyword = functionKeyword, this.identifier = identifier, this.callSignature = callSignature, this.block = block, this.semicolonToken = semicolonToken;
        modifiers.parent = this, functionKeyword.parent = this, identifier.parent = this, callSignature.parent = this, block && (block.parent = this), semicolonToken && (semicolonToken.parent = this);
    };
    FunctionDeclarationSyntax.prototype.kind = SyntaxKind.FunctionDeclaration;

    export var ModuleDeclarationSyntax: ModuleDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.moduleKeyword = moduleKeyword, this.name = name, this.stringLiteral = stringLiteral, this.openBraceToken = openBraceToken, this.moduleElements = moduleElements, this.closeBraceToken = closeBraceToken;
        modifiers.parent = this, moduleKeyword.parent = this, name && (name.parent = this), stringLiteral && (stringLiteral.parent = this), openBraceToken.parent = this, moduleElements.parent = this, closeBraceToken.parent = this;
    };
    ModuleDeclarationSyntax.prototype.kind = SyntaxKind.ModuleDeclaration;

    export var ClassDeclarationSyntax: ClassDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.classKeyword = classKeyword, this.identifier = identifier, this.typeParameterList = typeParameterList, this.heritageClauses = heritageClauses, this.openBraceToken = openBraceToken, this.classElements = classElements, this.closeBraceToken = closeBraceToken;
        modifiers.parent = this, classKeyword.parent = this, identifier.parent = this, typeParameterList && (typeParameterList.parent = this), heritageClauses.parent = this, openBraceToken.parent = this, classElements.parent = this, closeBraceToken.parent = this;
    };
    ClassDeclarationSyntax.prototype.kind = SyntaxKind.ClassDeclaration;

    export var EnumDeclarationSyntax: EnumDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: ISeparatedSyntaxList<EnumElementSyntax>, closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.enumKeyword = enumKeyword, this.identifier = identifier, this.openBraceToken = openBraceToken, this.enumElements = enumElements, this.closeBraceToken = closeBraceToken;
        modifiers.parent = this, enumKeyword.parent = this, identifier.parent = this, openBraceToken.parent = this, enumElements.parent = this, closeBraceToken.parent = this;
    };
    EnumDeclarationSyntax.prototype.kind = SyntaxKind.EnumDeclaration;

    export var ImportDeclarationSyntax: ImportDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.importKeyword = importKeyword, this.identifier = identifier, this.equalsToken = equalsToken, this.moduleReference = moduleReference, this.semicolonToken = semicolonToken;
        modifiers.parent = this, importKeyword.parent = this, identifier.parent = this, equalsToken.parent = this, moduleReference.parent = this, semicolonToken && (semicolonToken.parent = this);
    };
    ImportDeclarationSyntax.prototype.kind = SyntaxKind.ImportDeclaration;

    export var ExportAssignmentSyntax: ExportAssignmentConstructor = <any>function(data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.exportKeyword = exportKeyword, this.equalsToken = equalsToken, this.identifier = identifier, this.semicolonToken = semicolonToken;
        exportKeyword.parent = this, equalsToken.parent = this, identifier.parent = this, semicolonToken && (semicolonToken.parent = this);
    };
    ExportAssignmentSyntax.prototype.kind = SyntaxKind.ExportAssignment;

    export var MemberFunctionDeclarationSyntax: MemberFunctionDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.propertyName = propertyName, this.callSignature = callSignature, this.block = block, this.semicolonToken = semicolonToken;
        modifiers.parent = this, propertyName.parent = this, callSignature.parent = this, block && (block.parent = this), semicolonToken && (semicolonToken.parent = this);
    };
    MemberFunctionDeclarationSyntax.prototype.kind = SyntaxKind.MemberFunctionDeclaration;

    export var MemberVariableDeclarationSyntax: MemberVariableDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.variableDeclarator = variableDeclarator, this.semicolonToken = semicolonToken;
        modifiers.parent = this, variableDeclarator.parent = this, semicolonToken && (semicolonToken.parent = this);
    };
    MemberVariableDeclarationSyntax.prototype.kind = SyntaxKind.MemberVariableDeclaration;

    export var ConstructorDeclarationSyntax: ConstructorDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.constructorKeyword = constructorKeyword, this.callSignature = callSignature, this.block = block, this.semicolonToken = semicolonToken;
        modifiers.parent = this, constructorKeyword.parent = this, callSignature.parent = this, block && (block.parent = this), semicolonToken && (semicolonToken.parent = this);
    };
    ConstructorDeclarationSyntax.prototype.kind = SyntaxKind.ConstructorDeclaration;

    export var IndexMemberDeclarationSyntax: IndexMemberDeclarationConstructor = <any>function(data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.indexSignature = indexSignature, this.semicolonToken = semicolonToken;
        modifiers.parent = this, indexSignature.parent = this, semicolonToken && (semicolonToken.parent = this);
    };
    IndexMemberDeclarationSyntax.prototype.kind = SyntaxKind.IndexMemberDeclaration;

    export var GetAccessorSyntax: GetAccessorConstructor = <any>function(data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.getKeyword = getKeyword, this.propertyName = propertyName, this.callSignature = callSignature, this.block = block;
        modifiers.parent = this, getKeyword.parent = this, propertyName.parent = this, callSignature.parent = this, block.parent = this;
    };
    GetAccessorSyntax.prototype.kind = SyntaxKind.GetAccessor;

    export var SetAccessorSyntax: SetAccessorConstructor = <any>function(data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.setKeyword = setKeyword, this.propertyName = propertyName, this.callSignature = callSignature, this.block = block;
        modifiers.parent = this, setKeyword.parent = this, propertyName.parent = this, callSignature.parent = this, block.parent = this;
    };
    SetAccessorSyntax.prototype.kind = SyntaxKind.SetAccessor;

    export var PropertySignatureSyntax: PropertySignatureConstructor = <any>function(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
        if (data) { this.__data = data; }
        this.propertyName = propertyName, this.questionToken = questionToken, this.typeAnnotation = typeAnnotation;
        propertyName.parent = this, questionToken && (questionToken.parent = this), typeAnnotation && (typeAnnotation.parent = this);
    };
    PropertySignatureSyntax.prototype.kind = SyntaxKind.PropertySignature;

    export var CallSignatureSyntax: CallSignatureConstructor = <any>function(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax) {
        if (data) { this.__data = data; }
        this.typeParameterList = typeParameterList, this.parameterList = parameterList, this.typeAnnotation = typeAnnotation;
        typeParameterList && (typeParameterList.parent = this), parameterList.parent = this, typeAnnotation && (typeAnnotation.parent = this);
    };
    CallSignatureSyntax.prototype.kind = SyntaxKind.CallSignature;

    export var ConstructSignatureSyntax: ConstructSignatureConstructor = <any>function(data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax) {
        if (data) { this.__data = data; }
        this.newKeyword = newKeyword, this.callSignature = callSignature;
        newKeyword.parent = this, callSignature.parent = this;
    };
    ConstructSignatureSyntax.prototype.kind = SyntaxKind.ConstructSignature;

    export var IndexSignatureSyntax: IndexSignatureConstructor = <any>function(data: number, openBracketToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
        if (data) { this.__data = data; }
        this.openBracketToken = openBracketToken, this.parameters = parameters, this.closeBracketToken = closeBracketToken, this.typeAnnotation = typeAnnotation;
        openBracketToken.parent = this, parameters.parent = this, closeBracketToken.parent = this, typeAnnotation && (typeAnnotation.parent = this);
    };
    IndexSignatureSyntax.prototype.kind = SyntaxKind.IndexSignature;

    export var MethodSignatureSyntax: MethodSignatureConstructor = <any>function(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax) {
        if (data) { this.__data = data; }
        this.propertyName = propertyName, this.questionToken = questionToken, this.callSignature = callSignature;
        propertyName.parent = this, questionToken && (questionToken.parent = this), callSignature.parent = this;
    };
    MethodSignatureSyntax.prototype.kind = SyntaxKind.MethodSignature;

    export var BlockSyntax: BlockConstructor = <any>function(data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.openBraceToken = openBraceToken, this.statements = statements, this.closeBraceToken = closeBraceToken;
        openBraceToken.parent = this, statements.parent = this, closeBraceToken.parent = this;
    };
    BlockSyntax.prototype.kind = SyntaxKind.Block;

    export var IfStatementSyntax: IfStatementConstructor = <any>function(data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax) {
        if (data) { this.__data = data; }
        this.ifKeyword = ifKeyword, this.openParenToken = openParenToken, this.condition = condition, this.closeParenToken = closeParenToken, this.statement = statement, this.elseClause = elseClause;
        ifKeyword.parent = this, openParenToken.parent = this, condition.parent = this, closeParenToken.parent = this, statement.parent = this, elseClause && (elseClause.parent = this);
    };
    IfStatementSyntax.prototype.kind = SyntaxKind.IfStatement;

    export var VariableStatementSyntax: VariableStatementConstructor = <any>function(data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.modifiers = modifiers, this.variableDeclaration = variableDeclaration, this.semicolonToken = semicolonToken;
        modifiers.parent = this, variableDeclaration.parent = this, semicolonToken && (semicolonToken.parent = this);
    };
    VariableStatementSyntax.prototype.kind = SyntaxKind.VariableStatement;

    export var ExpressionStatementSyntax: ExpressionStatementConstructor = <any>function(data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.expression = expression, this.semicolonToken = semicolonToken;
        expression.parent = this, semicolonToken && (semicolonToken.parent = this);
    };
    ExpressionStatementSyntax.prototype.kind = SyntaxKind.ExpressionStatement;

    export var ReturnStatementSyntax: ReturnStatementConstructor = <any>function(data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.returnKeyword = returnKeyword, this.expression = expression, this.semicolonToken = semicolonToken;
        returnKeyword.parent = this, expression && (expression.parent = this), semicolonToken && (semicolonToken.parent = this);
    };
    ReturnStatementSyntax.prototype.kind = SyntaxKind.ReturnStatement;

    export var SwitchStatementSyntax: SwitchStatementConstructor = <any>function(data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.switchKeyword = switchKeyword, this.openParenToken = openParenToken, this.expression = expression, this.closeParenToken = closeParenToken, this.openBraceToken = openBraceToken, this.switchClauses = switchClauses, this.closeBraceToken = closeBraceToken;
        switchKeyword.parent = this, openParenToken.parent = this, expression.parent = this, closeParenToken.parent = this, openBraceToken.parent = this, switchClauses.parent = this, closeBraceToken.parent = this;
    };
    SwitchStatementSyntax.prototype.kind = SyntaxKind.SwitchStatement;

    export var BreakStatementSyntax: BreakStatementConstructor = <any>function(data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.breakKeyword = breakKeyword, this.identifier = identifier, this.semicolonToken = semicolonToken;
        breakKeyword.parent = this, identifier && (identifier.parent = this), semicolonToken && (semicolonToken.parent = this);
    };
    BreakStatementSyntax.prototype.kind = SyntaxKind.BreakStatement;

    export var ContinueStatementSyntax: ContinueStatementConstructor = <any>function(data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.continueKeyword = continueKeyword, this.identifier = identifier, this.semicolonToken = semicolonToken;
        continueKeyword.parent = this, identifier && (identifier.parent = this), semicolonToken && (semicolonToken.parent = this);
    };
    ContinueStatementSyntax.prototype.kind = SyntaxKind.ContinueStatement;

    export var ForStatementSyntax: ForStatementConstructor = <any>function(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.forKeyword = forKeyword, this.openParenToken = openParenToken, this.variableDeclaration = variableDeclaration, this.initializer = initializer, this.firstSemicolonToken = firstSemicolonToken, this.condition = condition, this.secondSemicolonToken = secondSemicolonToken, this.incrementor = incrementor, this.closeParenToken = closeParenToken, this.statement = statement;
        forKeyword.parent = this, openParenToken.parent = this, variableDeclaration && (variableDeclaration.parent = this), initializer && (initializer.parent = this), firstSemicolonToken.parent = this, condition && (condition.parent = this), secondSemicolonToken.parent = this, incrementor && (incrementor.parent = this), closeParenToken.parent = this, statement.parent = this;
    };
    ForStatementSyntax.prototype.kind = SyntaxKind.ForStatement;

    export var ForInStatementSyntax: ForInStatementConstructor = <any>function(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.forKeyword = forKeyword, this.openParenToken = openParenToken, this.variableDeclaration = variableDeclaration, this.left = left, this.inKeyword = inKeyword, this.expression = expression, this.closeParenToken = closeParenToken, this.statement = statement;
        forKeyword.parent = this, openParenToken.parent = this, variableDeclaration && (variableDeclaration.parent = this), left && (left.parent = this), inKeyword.parent = this, expression.parent = this, closeParenToken.parent = this, statement.parent = this;
    };
    ForInStatementSyntax.prototype.kind = SyntaxKind.ForInStatement;

    export var EmptyStatementSyntax: EmptyStatementConstructor = <any>function(data: number, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.semicolonToken = semicolonToken;
        semicolonToken.parent = this;
    };
    EmptyStatementSyntax.prototype.kind = SyntaxKind.EmptyStatement;

    export var ThrowStatementSyntax: ThrowStatementConstructor = <any>function(data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.throwKeyword = throwKeyword, this.expression = expression, this.semicolonToken = semicolonToken;
        throwKeyword.parent = this, expression.parent = this, semicolonToken && (semicolonToken.parent = this);
    };
    ThrowStatementSyntax.prototype.kind = SyntaxKind.ThrowStatement;

    export var WhileStatementSyntax: WhileStatementConstructor = <any>function(data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.whileKeyword = whileKeyword, this.openParenToken = openParenToken, this.condition = condition, this.closeParenToken = closeParenToken, this.statement = statement;
        whileKeyword.parent = this, openParenToken.parent = this, condition.parent = this, closeParenToken.parent = this, statement.parent = this;
    };
    WhileStatementSyntax.prototype.kind = SyntaxKind.WhileStatement;

    export var TryStatementSyntax: TryStatementConstructor = <any>function(data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax) {
        if (data) { this.__data = data; }
        this.tryKeyword = tryKeyword, this.block = block, this.catchClause = catchClause, this.finallyClause = finallyClause;
        tryKeyword.parent = this, block.parent = this, catchClause && (catchClause.parent = this), finallyClause && (finallyClause.parent = this);
    };
    TryStatementSyntax.prototype.kind = SyntaxKind.TryStatement;

    export var LabeledStatementSyntax: LabeledStatementConstructor = <any>function(data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.identifier = identifier, this.colonToken = colonToken, this.statement = statement;
        identifier.parent = this, colonToken.parent = this, statement.parent = this;
    };
    LabeledStatementSyntax.prototype.kind = SyntaxKind.LabeledStatement;

    export var DoStatementSyntax: DoStatementConstructor = <any>function(data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.doKeyword = doKeyword, this.statement = statement, this.whileKeyword = whileKeyword, this.openParenToken = openParenToken, this.condition = condition, this.closeParenToken = closeParenToken, this.semicolonToken = semicolonToken;
        doKeyword.parent = this, statement.parent = this, whileKeyword.parent = this, openParenToken.parent = this, condition.parent = this, closeParenToken.parent = this, semicolonToken && (semicolonToken.parent = this);
    };
    DoStatementSyntax.prototype.kind = SyntaxKind.DoStatement;

    export var DebuggerStatementSyntax: DebuggerStatementConstructor = <any>function(data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.debuggerKeyword = debuggerKeyword, this.semicolonToken = semicolonToken;
        debuggerKeyword.parent = this, semicolonToken && (semicolonToken.parent = this);
    };
    DebuggerStatementSyntax.prototype.kind = SyntaxKind.DebuggerStatement;

    export var WithStatementSyntax: WithStatementConstructor = <any>function(data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.withKeyword = withKeyword, this.openParenToken = openParenToken, this.condition = condition, this.closeParenToken = closeParenToken, this.statement = statement;
        withKeyword.parent = this, openParenToken.parent = this, condition.parent = this, closeParenToken.parent = this, statement.parent = this;
    };
    WithStatementSyntax.prototype.kind = SyntaxKind.WithStatement;

    export var PrefixUnaryExpressionSyntax: PrefixUnaryExpressionConstructor = <any>function(data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.operatorToken = operatorToken, this.operand = operand;
        operatorToken.parent = this, operand.parent = this;
    };
    PrefixUnaryExpressionSyntax.prototype.kind = SyntaxKind.PrefixUnaryExpression;

    export var DeleteExpressionSyntax: DeleteExpressionConstructor = <any>function(data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.deleteKeyword = deleteKeyword, this.expression = expression;
        deleteKeyword.parent = this, expression.parent = this;
    };
    DeleteExpressionSyntax.prototype.kind = SyntaxKind.DeleteExpression;

    export var TypeOfExpressionSyntax: TypeOfExpressionConstructor = <any>function(data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.typeOfKeyword = typeOfKeyword, this.expression = expression;
        typeOfKeyword.parent = this, expression.parent = this;
    };
    TypeOfExpressionSyntax.prototype.kind = SyntaxKind.TypeOfExpression;

    export var VoidExpressionSyntax: VoidExpressionConstructor = <any>function(data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.voidKeyword = voidKeyword, this.expression = expression;
        voidKeyword.parent = this, expression.parent = this;
    };
    VoidExpressionSyntax.prototype.kind = SyntaxKind.VoidExpression;

    export var ConditionalExpressionSyntax: ConditionalExpressionConstructor = <any>function(data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.condition = condition, this.questionToken = questionToken, this.whenTrue = whenTrue, this.colonToken = colonToken, this.whenFalse = whenFalse;
        condition.parent = this, questionToken.parent = this, whenTrue.parent = this, colonToken.parent = this, whenFalse.parent = this;
    };
    ConditionalExpressionSyntax.prototype.kind = SyntaxKind.ConditionalExpression;

    export var BinaryExpressionSyntax: BinaryExpressionConstructor = <any>function(data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.left = left, this.operatorToken = operatorToken, this.right = right;
        left.parent = this, operatorToken.parent = this, right.parent = this;
    };
    BinaryExpressionSyntax.prototype.kind = SyntaxKind.BinaryExpression;

    export var PostfixUnaryExpressionSyntax: PostfixUnaryExpressionConstructor = <any>function(data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.operand = operand, this.operatorToken = operatorToken;
        operand.parent = this, operatorToken.parent = this;
    };
    PostfixUnaryExpressionSyntax.prototype.kind = SyntaxKind.PostfixUnaryExpression;

    export var MemberAccessExpressionSyntax: MemberAccessExpressionConstructor = <any>function(data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.expression = expression, this.dotToken = dotToken, this.name = name;
        expression.parent = this, dotToken.parent = this, name.parent = this;
    };
    MemberAccessExpressionSyntax.prototype.kind = SyntaxKind.MemberAccessExpression;

    export var InvocationExpressionSyntax: InvocationExpressionConstructor = <any>function(data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax) {
        if (data) { this.__data = data; }
        this.expression = expression, this.argumentList = argumentList;
        expression.parent = this, argumentList.parent = this;
    };
    InvocationExpressionSyntax.prototype.kind = SyntaxKind.InvocationExpression;

    export var ArrayLiteralExpressionSyntax: ArrayLiteralExpressionConstructor = <any>function(data: number, openBracketToken: ISyntaxToken, expressions: ISeparatedSyntaxList<IExpressionSyntax>, closeBracketToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.openBracketToken = openBracketToken, this.expressions = expressions, this.closeBracketToken = closeBracketToken;
        openBracketToken.parent = this, expressions.parent = this, closeBracketToken.parent = this;
    };
    ArrayLiteralExpressionSyntax.prototype.kind = SyntaxKind.ArrayLiteralExpression;

    export var ObjectLiteralExpressionSyntax: ObjectLiteralExpressionConstructor = <any>function(data: number, openBraceToken: ISyntaxToken, propertyAssignments: ISeparatedSyntaxList<IPropertyAssignmentSyntax>, closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.openBraceToken = openBraceToken, this.propertyAssignments = propertyAssignments, this.closeBraceToken = closeBraceToken;
        openBraceToken.parent = this, propertyAssignments.parent = this, closeBraceToken.parent = this;
    };
    ObjectLiteralExpressionSyntax.prototype.kind = SyntaxKind.ObjectLiteralExpression;

    export var ObjectCreationExpressionSyntax: ObjectCreationExpressionConstructor = <any>function(data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax) {
        if (data) { this.__data = data; }
        this.newKeyword = newKeyword, this.expression = expression, this.argumentList = argumentList;
        newKeyword.parent = this, expression.parent = this, argumentList && (argumentList.parent = this);
    };
    ObjectCreationExpressionSyntax.prototype.kind = SyntaxKind.ObjectCreationExpression;

    export var ParenthesizedExpressionSyntax: ParenthesizedExpressionConstructor = <any>function(data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.openParenToken = openParenToken, this.expression = expression, this.closeParenToken = closeParenToken;
        openParenToken.parent = this, expression.parent = this, closeParenToken.parent = this;
    };
    ParenthesizedExpressionSyntax.prototype.kind = SyntaxKind.ParenthesizedExpression;

    export var ParenthesizedArrowFunctionExpressionSyntax: ParenthesizedArrowFunctionExpressionConstructor = <any>function(data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.callSignature = callSignature, this.equalsGreaterThanToken = equalsGreaterThanToken, this.block = block, this.expression = expression;
        callSignature.parent = this, equalsGreaterThanToken.parent = this, block && (block.parent = this), expression && (expression.parent = this);
    };
    ParenthesizedArrowFunctionExpressionSyntax.prototype.kind = SyntaxKind.ParenthesizedArrowFunctionExpression;

    export var SimpleArrowFunctionExpressionSyntax: SimpleArrowFunctionExpressionConstructor = <any>function(data: number, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parameter = parameter, this.equalsGreaterThanToken = equalsGreaterThanToken, this.block = block, this.expression = expression;
        parameter.parent = this, equalsGreaterThanToken.parent = this, block && (block.parent = this), expression && (expression.parent = this);
    };
    SimpleArrowFunctionExpressionSyntax.prototype.kind = SyntaxKind.SimpleArrowFunctionExpression;

    export var CastExpressionSyntax: CastExpressionConstructor = <any>function(data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.lessThanToken = lessThanToken, this.type = type, this.greaterThanToken = greaterThanToken, this.expression = expression;
        lessThanToken.parent = this, type.parent = this, greaterThanToken.parent = this, expression.parent = this;
    };
    CastExpressionSyntax.prototype.kind = SyntaxKind.CastExpression;

    export var ElementAccessExpressionSyntax: ElementAccessExpressionConstructor = <any>function(data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.expression = expression, this.openBracketToken = openBracketToken, this.argumentExpression = argumentExpression, this.closeBracketToken = closeBracketToken;
        expression.parent = this, openBracketToken.parent = this, argumentExpression.parent = this, closeBracketToken.parent = this;
    };
    ElementAccessExpressionSyntax.prototype.kind = SyntaxKind.ElementAccessExpression;

    export var FunctionExpressionSyntax: FunctionExpressionConstructor = <any>function(data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
        if (data) { this.__data = data; }
        this.functionKeyword = functionKeyword, this.identifier = identifier, this.callSignature = callSignature, this.block = block;
        functionKeyword.parent = this, identifier && (identifier.parent = this), callSignature.parent = this, block.parent = this;
    };
    FunctionExpressionSyntax.prototype.kind = SyntaxKind.FunctionExpression;

    export var OmittedExpressionSyntax: OmittedExpressionConstructor = <any>function(data: number) {
        if (data) { this.__data = data; }
    };
    OmittedExpressionSyntax.prototype.kind = SyntaxKind.OmittedExpression;

    export var TemplateExpressionSyntax: TemplateExpressionConstructor = <any>function(data: number, templateStartToken: ISyntaxToken, templateClauses: TemplateClauseSyntax[]) {
        if (data) { this.__data = data; }
        this.templateStartToken = templateStartToken, this.templateClauses = templateClauses;
        templateStartToken.parent = this, templateClauses.parent = this;
    };
    TemplateExpressionSyntax.prototype.kind = SyntaxKind.TemplateExpression;

    export var TemplateAccessExpressionSyntax: TemplateAccessExpressionConstructor = <any>function(data: number, expression: ILeftHandSideExpressionSyntax, templateExpression: IPrimaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.expression = expression, this.templateExpression = templateExpression;
        expression.parent = this, templateExpression.parent = this;
    };
    TemplateAccessExpressionSyntax.prototype.kind = SyntaxKind.TemplateAccessExpression;

    export var VariableDeclarationSyntax: VariableDeclarationConstructor = <any>function(data: number, varKeyword: ISyntaxToken, variableDeclarators: ISeparatedSyntaxList<VariableDeclaratorSyntax>) {
        if (data) { this.__data = data; }
        this.varKeyword = varKeyword, this.variableDeclarators = variableDeclarators;
        varKeyword.parent = this, variableDeclarators.parent = this;
    };
    VariableDeclarationSyntax.prototype.kind = SyntaxKind.VariableDeclaration;

    export var VariableDeclaratorSyntax: VariableDeclaratorConstructor = <any>function(data: number, propertyName: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
        if (data) { this.__data = data; }
        this.propertyName = propertyName, this.typeAnnotation = typeAnnotation, this.equalsValueClause = equalsValueClause;
        propertyName.parent = this, typeAnnotation && (typeAnnotation.parent = this), equalsValueClause && (equalsValueClause.parent = this);
    };
    VariableDeclaratorSyntax.prototype.kind = SyntaxKind.VariableDeclarator;

    export var ArgumentListSyntax: ArgumentListConstructor = <any>function(data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, _arguments: ISeparatedSyntaxList<IExpressionSyntax>, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.typeArgumentList = typeArgumentList, this.openParenToken = openParenToken, this.arguments = _arguments, this.closeParenToken = closeParenToken;
        typeArgumentList && (typeArgumentList.parent = this), openParenToken.parent = this, _arguments.parent = this, closeParenToken.parent = this;
    };
    ArgumentListSyntax.prototype.kind = SyntaxKind.ArgumentList;

    export var ParameterListSyntax: ParameterListConstructor = <any>function(data: number, openParenToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.openParenToken = openParenToken, this.parameters = parameters, this.closeParenToken = closeParenToken;
        openParenToken.parent = this, parameters.parent = this, closeParenToken.parent = this;
    };
    ParameterListSyntax.prototype.kind = SyntaxKind.ParameterList;

    export var TypeArgumentListSyntax: TypeArgumentListConstructor = <any>function(data: number, lessThanToken: ISyntaxToken, typeArguments: ISeparatedSyntaxList<ITypeSyntax>, greaterThanToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.lessThanToken = lessThanToken, this.typeArguments = typeArguments, this.greaterThanToken = greaterThanToken;
        lessThanToken.parent = this, typeArguments.parent = this, greaterThanToken.parent = this;
    };
    TypeArgumentListSyntax.prototype.kind = SyntaxKind.TypeArgumentList;

    export var TypeParameterListSyntax: TypeParameterListConstructor = <any>function(data: number, lessThanToken: ISyntaxToken, typeParameters: ISeparatedSyntaxList<TypeParameterSyntax>, greaterThanToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.lessThanToken = lessThanToken, this.typeParameters = typeParameters, this.greaterThanToken = greaterThanToken;
        lessThanToken.parent = this, typeParameters.parent = this, greaterThanToken.parent = this;
    };
    TypeParameterListSyntax.prototype.kind = SyntaxKind.TypeParameterList;

    export var HeritageClauseSyntax: HeritageClauseConstructor = <any>function(data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: ISeparatedSyntaxList<INameSyntax>) {
        if (data) { this.__data = data; }
        this.extendsOrImplementsKeyword = extendsOrImplementsKeyword, this.typeNames = typeNames;
        extendsOrImplementsKeyword.parent = this, typeNames.parent = this;
    };
    HeritageClauseSyntax.prototype.kind = SyntaxKind.HeritageClause;

    export var EqualsValueClauseSyntax: EqualsValueClauseConstructor = <any>function(data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.equalsToken = equalsToken, this.value = value;
        equalsToken.parent = this, value.parent = this;
    };
    EqualsValueClauseSyntax.prototype.kind = SyntaxKind.EqualsValueClause;

    export var CaseSwitchClauseSyntax: CaseSwitchClauseConstructor = <any>function(data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
        if (data) { this.__data = data; }
        this.caseKeyword = caseKeyword, this.expression = expression, this.colonToken = colonToken, this.statements = statements;
        caseKeyword.parent = this, expression.parent = this, colonToken.parent = this, statements.parent = this;
    };
    CaseSwitchClauseSyntax.prototype.kind = SyntaxKind.CaseSwitchClause;

    export var DefaultSwitchClauseSyntax: DefaultSwitchClauseConstructor = <any>function(data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
        if (data) { this.__data = data; }
        this.defaultKeyword = defaultKeyword, this.colonToken = colonToken, this.statements = statements;
        defaultKeyword.parent = this, colonToken.parent = this, statements.parent = this;
    };
    DefaultSwitchClauseSyntax.prototype.kind = SyntaxKind.DefaultSwitchClause;

    export var ElseClauseSyntax: ElseClauseConstructor = <any>function(data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.elseKeyword = elseKeyword, this.statement = statement;
        elseKeyword.parent = this, statement.parent = this;
    };
    ElseClauseSyntax.prototype.kind = SyntaxKind.ElseClause;

    export var CatchClauseSyntax: CatchClauseConstructor = <any>function(data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax) {
        if (data) { this.__data = data; }
        this.catchKeyword = catchKeyword, this.openParenToken = openParenToken, this.identifier = identifier, this.typeAnnotation = typeAnnotation, this.closeParenToken = closeParenToken, this.block = block;
        catchKeyword.parent = this, openParenToken.parent = this, identifier.parent = this, typeAnnotation && (typeAnnotation.parent = this), closeParenToken.parent = this, block.parent = this;
    };
    CatchClauseSyntax.prototype.kind = SyntaxKind.CatchClause;

    export var FinallyClauseSyntax: FinallyClauseConstructor = <any>function(data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax) {
        if (data) { this.__data = data; }
        this.finallyKeyword = finallyKeyword, this.block = block;
        finallyKeyword.parent = this, block.parent = this;
    };
    FinallyClauseSyntax.prototype.kind = SyntaxKind.FinallyClause;

    export var TemplateClauseSyntax: TemplateClauseConstructor = <any>function(data: number, expression: IExpressionSyntax, templateMiddleOrEndToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.expression = expression, this.templateMiddleOrEndToken = templateMiddleOrEndToken;
        expression.parent = this, templateMiddleOrEndToken.parent = this;
    };
    TemplateClauseSyntax.prototype.kind = SyntaxKind.TemplateClause;

    export var TypeParameterSyntax: TypeParameterConstructor = <any>function(data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax) {
        if (data) { this.__data = data; }
        this.identifier = identifier, this.constraint = constraint;
        identifier.parent = this, constraint && (constraint.parent = this);
    };
    TypeParameterSyntax.prototype.kind = SyntaxKind.TypeParameter;

    export var ConstraintSyntax: ConstraintConstructor = <any>function(data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken) {
        if (data) { this.__data = data; }
        this.extendsKeyword = extendsKeyword, this.typeOrExpression = typeOrExpression;
        extendsKeyword.parent = this, typeOrExpression.parent = this;
    };
    ConstraintSyntax.prototype.kind = SyntaxKind.Constraint;

    export var SimplePropertyAssignmentSyntax: SimplePropertyAssignmentConstructor = <any>function(data: number, propertyName: ISyntaxToken, colonToken: ISyntaxToken, expression: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.propertyName = propertyName, this.colonToken = colonToken, this.expression = expression;
        propertyName.parent = this, colonToken.parent = this, expression.parent = this;
    };
    SimplePropertyAssignmentSyntax.prototype.kind = SyntaxKind.SimplePropertyAssignment;

    export var FunctionPropertyAssignmentSyntax: FunctionPropertyAssignmentConstructor = <any>function(data: number, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
        if (data) { this.__data = data; }
        this.propertyName = propertyName, this.callSignature = callSignature, this.block = block;
        propertyName.parent = this, callSignature.parent = this, block.parent = this;
    };
    FunctionPropertyAssignmentSyntax.prototype.kind = SyntaxKind.FunctionPropertyAssignment;

    export var ParameterSyntax: ParameterConstructor = <any>function(data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
        if (data) { this.__data = data; }
        this.dotDotDotToken = dotDotDotToken, this.modifiers = modifiers, this.identifier = identifier, this.questionToken = questionToken, this.typeAnnotation = typeAnnotation, this.equalsValueClause = equalsValueClause;
        dotDotDotToken && (dotDotDotToken.parent = this), modifiers.parent = this, identifier.parent = this, questionToken && (questionToken.parent = this), typeAnnotation && (typeAnnotation.parent = this), equalsValueClause && (equalsValueClause.parent = this);
    };
    ParameterSyntax.prototype.kind = SyntaxKind.Parameter;

    export var EnumElementSyntax: EnumElementConstructor = <any>function(data: number, propertyName: ISyntaxToken, equalsValueClause: EqualsValueClauseSyntax) {
        if (data) { this.__data = data; }
        this.propertyName = propertyName, this.equalsValueClause = equalsValueClause;
        propertyName.parent = this, equalsValueClause && (equalsValueClause.parent = this);
    };
    EnumElementSyntax.prototype.kind = SyntaxKind.EnumElement;

    export var TypeAnnotationSyntax: TypeAnnotationConstructor = <any>function(data: number, colonToken: ISyntaxToken, type: ITypeSyntax) {
        if (data) { this.__data = data; }
        this.colonToken = colonToken, this.type = type;
        colonToken.parent = this, type.parent = this;
    };
    TypeAnnotationSyntax.prototype.kind = SyntaxKind.TypeAnnotation;

    export var ExternalModuleReferenceSyntax: ExternalModuleReferenceConstructor = <any>function(data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.requireKeyword = requireKeyword, this.openParenToken = openParenToken, this.stringLiteral = stringLiteral, this.closeParenToken = closeParenToken;
        requireKeyword.parent = this, openParenToken.parent = this, stringLiteral.parent = this, closeParenToken.parent = this;
    };
    ExternalModuleReferenceSyntax.prototype.kind = SyntaxKind.ExternalModuleReference;

    export var ModuleNameModuleReferenceSyntax: ModuleNameModuleReferenceConstructor = <any>function(data: number, moduleName: INameSyntax) {
        if (data) { this.__data = data; }
        this.moduleName = moduleName;
        moduleName.parent = this;
    };
    ModuleNameModuleReferenceSyntax.prototype.kind = SyntaxKind.ModuleNameModuleReference;
}