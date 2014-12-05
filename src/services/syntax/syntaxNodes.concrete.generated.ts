///<reference path='references.ts' />

module TypeScript {
    export var SourceUnitSyntax: SourceUnitConstructor = <any>function (data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.moduleElements = moduleElements,
        this.endOfFileToken = endOfFileToken;
    };
    SourceUnitSyntax.prototype.kind = SyntaxKind.SourceUnit;
    SourceUnitSyntax.prototype.childCount = 2;
    SourceUnitSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.moduleElements;
            case 1: return this.endOfFileToken;
        }
    }

    export var QualifiedNameSyntax: QualifiedNameConstructor = <any>function (data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.left = left,
        this.dotToken = dotToken,
        this.right = right;
    };
    QualifiedNameSyntax.prototype.kind = SyntaxKind.QualifiedName;
    QualifiedNameSyntax.prototype.childCount = 3;
    QualifiedNameSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.left;
            case 1: return this.dotToken;
            case 2: return this.right;
        }
    }

    export var ObjectTypeSyntax: ObjectTypeConstructor = <any>function (data: number, openBraceToken: ISyntaxToken, typeMembers: ITypeMemberSyntax[], closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.openBraceToken = openBraceToken,
        this.typeMembers = typeMembers,
        this.closeBraceToken = closeBraceToken;
    };
    ObjectTypeSyntax.prototype.kind = SyntaxKind.ObjectType;
    ObjectTypeSyntax.prototype.childCount = 3;
    ObjectTypeSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.openBraceToken;
            case 1: return this.typeMembers;
            case 2: return this.closeBraceToken;
        }
    }

    export var FunctionTypeSyntax: FunctionTypeConstructor = <any>function (data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.typeParameterList = typeParameterList,
        this.parameterList = parameterList,
        this.equalsGreaterThanToken = equalsGreaterThanToken,
        this.type = type;
    };
    FunctionTypeSyntax.prototype.kind = SyntaxKind.FunctionType;
    FunctionTypeSyntax.prototype.childCount = 4;
    FunctionTypeSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.typeParameterList;
            case 1: return this.parameterList;
            case 2: return this.equalsGreaterThanToken;
            case 3: return this.type;
        }
    }

    export var ArrayTypeSyntax: ArrayTypeConstructor = <any>function (data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.type = type,
        this.openBracketToken = openBracketToken,
        this.closeBracketToken = closeBracketToken;
    };
    ArrayTypeSyntax.prototype.kind = SyntaxKind.ArrayType;
    ArrayTypeSyntax.prototype.childCount = 3;
    ArrayTypeSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.type;
            case 1: return this.openBracketToken;
            case 2: return this.closeBracketToken;
        }
    }

    export var ConstructorTypeSyntax: ConstructorTypeConstructor = <any>function (data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.newKeyword = newKeyword,
        this.typeParameterList = typeParameterList,
        this.parameterList = parameterList,
        this.equalsGreaterThanToken = equalsGreaterThanToken,
        this.type = type;
    };
    ConstructorTypeSyntax.prototype.kind = SyntaxKind.ConstructorType;
    ConstructorTypeSyntax.prototype.childCount = 5;
    ConstructorTypeSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.newKeyword;
            case 1: return this.typeParameterList;
            case 2: return this.parameterList;
            case 3: return this.equalsGreaterThanToken;
            case 4: return this.type;
        }
    }

    export var GenericTypeSyntax: GenericTypeConstructor = <any>function (data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.name = name,
        this.typeArgumentList = typeArgumentList;
    };
    GenericTypeSyntax.prototype.kind = SyntaxKind.GenericType;
    GenericTypeSyntax.prototype.childCount = 2;
    GenericTypeSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.name;
            case 1: return this.typeArgumentList;
        }
    }

    export var TypeQuerySyntax: TypeQueryConstructor = <any>function (data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.typeOfKeyword = typeOfKeyword,
        this.name = name;
    };
    TypeQuerySyntax.prototype.kind = SyntaxKind.TypeQuery;
    TypeQuerySyntax.prototype.childCount = 2;
    TypeQuerySyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.typeOfKeyword;
            case 1: return this.name;
        }
    }

    export var TupleTypeSyntax: TupleTypeConstructor = <any>function (data: number, openBracketToken: ISyntaxToken, types: ISeparatedSyntaxList<ITypeSyntax>, closeBracketToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.openBracketToken = openBracketToken,
        this.types = types,
        this.closeBracketToken = closeBracketToken;
    };
    TupleTypeSyntax.prototype.kind = SyntaxKind.TupleType;
    TupleTypeSyntax.prototype.childCount = 3;
    TupleTypeSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.openBracketToken;
            case 1: return this.types;
            case 2: return this.closeBracketToken;
        }
    }

    export var UnionTypeSyntax: UnionTypeConstructor = <any>function (data: number, left: ITypeSyntax, barToken: ISyntaxToken, right: ITypeSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.left = left,
        this.barToken = barToken,
        this.right = right;
    };
    UnionTypeSyntax.prototype.kind = SyntaxKind.UnionType;
    UnionTypeSyntax.prototype.childCount = 3;
    UnionTypeSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.left;
            case 1: return this.barToken;
            case 2: return this.right;
        }
    }

    export var ParenthesizedTypeSyntax: ParenthesizedTypeConstructor = <any>function (data: number, openParenToken: ISyntaxToken, type: ITypeSyntax, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.openParenToken = openParenToken,
        this.type = type,
        this.closeParenToken = closeParenToken;
    };
    ParenthesizedTypeSyntax.prototype.kind = SyntaxKind.ParenthesizedType;
    ParenthesizedTypeSyntax.prototype.childCount = 3;
    ParenthesizedTypeSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.openParenToken;
            case 1: return this.type;
            case 2: return this.closeParenToken;
        }
    }

    export var InterfaceDeclarationSyntax: InterfaceDeclarationConstructor = <any>function (data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.interfaceKeyword = interfaceKeyword,
        this.identifier = identifier,
        this.typeParameterList = typeParameterList,
        this.heritageClauses = heritageClauses,
        this.body = body;
    };
    InterfaceDeclarationSyntax.prototype.kind = SyntaxKind.InterfaceDeclaration;
    InterfaceDeclarationSyntax.prototype.childCount = 6;
    InterfaceDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.interfaceKeyword;
            case 2: return this.identifier;
            case 3: return this.typeParameterList;
            case 4: return this.heritageClauses;
            case 5: return this.body;
        }
    }

    export var FunctionDeclarationSyntax: FunctionDeclarationConstructor = <any>function (data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, asterixToken: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, body: BlockSyntax | ExpressionBody | ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.functionKeyword = functionKeyword,
        this.asterixToken = asterixToken,
        this.identifier = identifier,
        this.callSignature = callSignature,
        this.body = body;
    };
    FunctionDeclarationSyntax.prototype.kind = SyntaxKind.FunctionDeclaration;
    FunctionDeclarationSyntax.prototype.childCount = 6;
    FunctionDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.functionKeyword;
            case 2: return this.asterixToken;
            case 3: return this.identifier;
            case 4: return this.callSignature;
            case 5: return this.body;
        }
    }

    export var ModuleDeclarationSyntax: ModuleDeclarationConstructor = <any>function (data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.moduleKeyword = moduleKeyword,
        this.name = name,
        this.openBraceToken = openBraceToken,
        this.moduleElements = moduleElements,
        this.closeBraceToken = closeBraceToken;
    };
    ModuleDeclarationSyntax.prototype.kind = SyntaxKind.ModuleDeclaration;
    ModuleDeclarationSyntax.prototype.childCount = 6;
    ModuleDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.moduleKeyword;
            case 2: return this.name;
            case 3: return this.openBraceToken;
            case 4: return this.moduleElements;
            case 5: return this.closeBraceToken;
        }
    }

    export var ClassDeclarationSyntax: ClassDeclarationConstructor = <any>function (data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.classKeyword = classKeyword,
        this.identifier = identifier,
        this.typeParameterList = typeParameterList,
        this.heritageClauses = heritageClauses,
        this.openBraceToken = openBraceToken,
        this.classElements = classElements,
        this.closeBraceToken = closeBraceToken;
    };
    ClassDeclarationSyntax.prototype.kind = SyntaxKind.ClassDeclaration;
    ClassDeclarationSyntax.prototype.childCount = 8;
    ClassDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.classKeyword;
            case 2: return this.identifier;
            case 3: return this.typeParameterList;
            case 4: return this.heritageClauses;
            case 5: return this.openBraceToken;
            case 6: return this.classElements;
            case 7: return this.closeBraceToken;
        }
    }

    export var EnumDeclarationSyntax: EnumDeclarationConstructor = <any>function (data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: ISeparatedSyntaxList<EnumElementSyntax>, closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.enumKeyword = enumKeyword,
        this.identifier = identifier,
        this.openBraceToken = openBraceToken,
        this.enumElements = enumElements,
        this.closeBraceToken = closeBraceToken;
    };
    EnumDeclarationSyntax.prototype.kind = SyntaxKind.EnumDeclaration;
    EnumDeclarationSyntax.prototype.childCount = 6;
    EnumDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.enumKeyword;
            case 2: return this.identifier;
            case 3: return this.openBraceToken;
            case 4: return this.enumElements;
            case 5: return this.closeBraceToken;
        }
    }

    export var ImportDeclarationSyntax: ImportDeclarationConstructor = <any>function (data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.importKeyword = importKeyword,
        this.identifier = identifier,
        this.equalsToken = equalsToken,
        this.moduleReference = moduleReference,
        this.semicolonToken = semicolonToken;
    };
    ImportDeclarationSyntax.prototype.kind = SyntaxKind.ImportDeclaration;
    ImportDeclarationSyntax.prototype.childCount = 6;
    ImportDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.importKeyword;
            case 2: return this.identifier;
            case 3: return this.equalsToken;
            case 4: return this.moduleReference;
            case 5: return this.semicolonToken;
        }
    }

    export var ExportAssignmentSyntax: ExportAssignmentConstructor = <any>function (data: number, modifiers: ISyntaxToken[], exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.exportKeyword = exportKeyword,
        this.equalsToken = equalsToken,
        this.identifier = identifier,
        this.semicolonToken = semicolonToken;
    };
    ExportAssignmentSyntax.prototype.kind = SyntaxKind.ExportAssignment;
    ExportAssignmentSyntax.prototype.childCount = 5;
    ExportAssignmentSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.exportKeyword;
            case 2: return this.equalsToken;
            case 3: return this.identifier;
            case 4: return this.semicolonToken;
        }
    }

    export var MethodDeclarationSyntax: MethodDeclarationConstructor = <any>function (data: number, modifiers: ISyntaxToken[], asterixToken: ISyntaxToken, propertyName: IPropertyNameSyntax, callSignature: CallSignatureSyntax, body: BlockSyntax | ExpressionBody | ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.asterixToken = asterixToken,
        this.propertyName = propertyName,
        this.callSignature = callSignature,
        this.body = body;
    };
    MethodDeclarationSyntax.prototype.kind = SyntaxKind.MethodDeclaration;
    MethodDeclarationSyntax.prototype.childCount = 5;
    MethodDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.asterixToken;
            case 2: return this.propertyName;
            case 3: return this.callSignature;
            case 4: return this.body;
        }
    }

    export var PropertyDeclarationSyntax: PropertyDeclarationConstructor = <any>function (data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.variableDeclarator = variableDeclarator,
        this.semicolonToken = semicolonToken;
    };
    PropertyDeclarationSyntax.prototype.kind = SyntaxKind.PropertyDeclaration;
    PropertyDeclarationSyntax.prototype.childCount = 3;
    PropertyDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.variableDeclarator;
            case 2: return this.semicolonToken;
        }
    }

    export var ConstructorDeclarationSyntax: ConstructorDeclarationConstructor = <any>function (data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, body: BlockSyntax | ExpressionBody | ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.constructorKeyword = constructorKeyword,
        this.callSignature = callSignature,
        this.body = body;
    };
    ConstructorDeclarationSyntax.prototype.kind = SyntaxKind.ConstructorDeclaration;
    ConstructorDeclarationSyntax.prototype.childCount = 4;
    ConstructorDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.constructorKeyword;
            case 2: return this.callSignature;
            case 3: return this.body;
        }
    }

    export var GetAccessorSyntax: GetAccessorConstructor = <any>function (data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: IPropertyNameSyntax, callSignature: CallSignatureSyntax, body: BlockSyntax | ExpressionBody | ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.getKeyword = getKeyword,
        this.propertyName = propertyName,
        this.callSignature = callSignature,
        this.body = body;
    };
    GetAccessorSyntax.prototype.kind = SyntaxKind.GetAccessor;
    GetAccessorSyntax.prototype.childCount = 5;
    GetAccessorSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.getKeyword;
            case 2: return this.propertyName;
            case 3: return this.callSignature;
            case 4: return this.body;
        }
    }

    export var SetAccessorSyntax: SetAccessorConstructor = <any>function (data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: IPropertyNameSyntax, callSignature: CallSignatureSyntax, body: BlockSyntax | ExpressionBody | ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.setKeyword = setKeyword,
        this.propertyName = propertyName,
        this.callSignature = callSignature,
        this.body = body;
    };
    SetAccessorSyntax.prototype.kind = SyntaxKind.SetAccessor;
    SetAccessorSyntax.prototype.childCount = 5;
    SetAccessorSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.setKeyword;
            case 2: return this.propertyName;
            case 3: return this.callSignature;
            case 4: return this.body;
        }
    }

    export var PropertySignatureSyntax: PropertySignatureConstructor = <any>function (data: number, propertyName: IPropertyNameSyntax, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, semicolonOrCommaToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.propertyName = propertyName,
        this.questionToken = questionToken,
        this.typeAnnotation = typeAnnotation,
        this.semicolonOrCommaToken = semicolonOrCommaToken;
    };
    PropertySignatureSyntax.prototype.kind = SyntaxKind.PropertySignature;
    PropertySignatureSyntax.prototype.childCount = 4;
    PropertySignatureSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.propertyName;
            case 1: return this.questionToken;
            case 2: return this.typeAnnotation;
            case 3: return this.semicolonOrCommaToken;
        }
    }

    export var CallSignatureSyntax: CallSignatureConstructor = <any>function (data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax, semicolonOrCommaToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.typeParameterList = typeParameterList,
        this.parameterList = parameterList,
        this.typeAnnotation = typeAnnotation,
        this.semicolonOrCommaToken = semicolonOrCommaToken;
    };
    CallSignatureSyntax.prototype.kind = SyntaxKind.CallSignature;
    CallSignatureSyntax.prototype.childCount = 4;
    CallSignatureSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.typeParameterList;
            case 1: return this.parameterList;
            case 2: return this.typeAnnotation;
            case 3: return this.semicolonOrCommaToken;
        }
    }

    export var ConstructSignatureSyntax: ConstructSignatureConstructor = <any>function (data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.newKeyword = newKeyword,
        this.callSignature = callSignature;
    };
    ConstructSignatureSyntax.prototype.kind = SyntaxKind.ConstructSignature;
    ConstructSignatureSyntax.prototype.childCount = 2;
    ConstructSignatureSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.newKeyword;
            case 1: return this.callSignature;
        }
    }

    export var IndexSignatureSyntax: IndexSignatureConstructor = <any>function (data: number, modifiers: ISyntaxToken[], openBracketToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, semicolonOrCommaToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.openBracketToken = openBracketToken,
        this.parameters = parameters,
        this.closeBracketToken = closeBracketToken,
        this.typeAnnotation = typeAnnotation,
        this.semicolonOrCommaToken = semicolonOrCommaToken;
    };
    IndexSignatureSyntax.prototype.kind = SyntaxKind.IndexSignature;
    IndexSignatureSyntax.prototype.childCount = 6;
    IndexSignatureSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.openBracketToken;
            case 2: return this.parameters;
            case 3: return this.closeBracketToken;
            case 4: return this.typeAnnotation;
            case 5: return this.semicolonOrCommaToken;
        }
    }

    export var MethodSignatureSyntax: MethodSignatureConstructor = <any>function (data: number, propertyName: IPropertyNameSyntax, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.propertyName = propertyName,
        this.questionToken = questionToken,
        this.callSignature = callSignature;
    };
    MethodSignatureSyntax.prototype.kind = SyntaxKind.MethodSignature;
    MethodSignatureSyntax.prototype.childCount = 3;
    MethodSignatureSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.propertyName;
            case 1: return this.questionToken;
            case 2: return this.callSignature;
        }
    }

    export var BlockSyntax: BlockConstructor = <any>function (data: number, equalsGreaterThanToken: ISyntaxToken, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.equalsGreaterThanToken = equalsGreaterThanToken,
        this.openBraceToken = openBraceToken,
        this.statements = statements,
        this.closeBraceToken = closeBraceToken;
    };
    BlockSyntax.prototype.kind = SyntaxKind.Block;
    BlockSyntax.prototype.childCount = 4;
    BlockSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.equalsGreaterThanToken;
            case 1: return this.openBraceToken;
            case 2: return this.statements;
            case 3: return this.closeBraceToken;
        }
    }

    export var IfStatementSyntax: IfStatementConstructor = <any>function (data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.ifKeyword = ifKeyword,
        this.openParenToken = openParenToken,
        this.condition = condition,
        this.closeParenToken = closeParenToken,
        this.statement = statement,
        this.elseClause = elseClause;
    };
    IfStatementSyntax.prototype.kind = SyntaxKind.IfStatement;
    IfStatementSyntax.prototype.childCount = 6;
    IfStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.ifKeyword;
            case 1: return this.openParenToken;
            case 2: return this.condition;
            case 3: return this.closeParenToken;
            case 4: return this.statement;
            case 5: return this.elseClause;
        }
    }

    export var VariableStatementSyntax: VariableStatementConstructor = <any>function (data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.variableDeclaration = variableDeclaration,
        this.semicolonToken = semicolonToken;
    };
    VariableStatementSyntax.prototype.kind = SyntaxKind.VariableStatement;
    VariableStatementSyntax.prototype.childCount = 3;
    VariableStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.variableDeclaration;
            case 2: return this.semicolonToken;
        }
    }

    export var ExpressionStatementSyntax: ExpressionStatementConstructor = <any>function (data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.expression = expression,
        this.semicolonToken = semicolonToken;
    };
    ExpressionStatementSyntax.prototype.kind = SyntaxKind.ExpressionStatement;
    ExpressionStatementSyntax.prototype.childCount = 2;
    ExpressionStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.expression;
            case 1: return this.semicolonToken;
        }
    }

    export var ReturnStatementSyntax: ReturnStatementConstructor = <any>function (data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.returnKeyword = returnKeyword,
        this.expression = expression,
        this.semicolonToken = semicolonToken;
    };
    ReturnStatementSyntax.prototype.kind = SyntaxKind.ReturnStatement;
    ReturnStatementSyntax.prototype.childCount = 3;
    ReturnStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.returnKeyword;
            case 1: return this.expression;
            case 2: return this.semicolonToken;
        }
    }

    export var SwitchStatementSyntax: SwitchStatementConstructor = <any>function (data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.switchKeyword = switchKeyword,
        this.openParenToken = openParenToken,
        this.expression = expression,
        this.closeParenToken = closeParenToken,
        this.openBraceToken = openBraceToken,
        this.switchClauses = switchClauses,
        this.closeBraceToken = closeBraceToken;
    };
    SwitchStatementSyntax.prototype.kind = SyntaxKind.SwitchStatement;
    SwitchStatementSyntax.prototype.childCount = 7;
    SwitchStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.switchKeyword;
            case 1: return this.openParenToken;
            case 2: return this.expression;
            case 3: return this.closeParenToken;
            case 4: return this.openBraceToken;
            case 5: return this.switchClauses;
            case 6: return this.closeBraceToken;
        }
    }

    export var BreakStatementSyntax: BreakStatementConstructor = <any>function (data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.breakKeyword = breakKeyword,
        this.identifier = identifier,
        this.semicolonToken = semicolonToken;
    };
    BreakStatementSyntax.prototype.kind = SyntaxKind.BreakStatement;
    BreakStatementSyntax.prototype.childCount = 3;
    BreakStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.breakKeyword;
            case 1: return this.identifier;
            case 2: return this.semicolonToken;
        }
    }

    export var ContinueStatementSyntax: ContinueStatementConstructor = <any>function (data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.continueKeyword = continueKeyword,
        this.identifier = identifier,
        this.semicolonToken = semicolonToken;
    };
    ContinueStatementSyntax.prototype.kind = SyntaxKind.ContinueStatement;
    ContinueStatementSyntax.prototype.childCount = 3;
    ContinueStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.continueKeyword;
            case 1: return this.identifier;
            case 2: return this.semicolonToken;
        }
    }

    export var ForStatementSyntax: ForStatementConstructor = <any>function (data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, initializer: VariableDeclarationSyntax | IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.forKeyword = forKeyword,
        this.openParenToken = openParenToken,
        this.initializer = initializer,
        this.firstSemicolonToken = firstSemicolonToken,
        this.condition = condition,
        this.secondSemicolonToken = secondSemicolonToken,
        this.incrementor = incrementor,
        this.closeParenToken = closeParenToken,
        this.statement = statement;
    };
    ForStatementSyntax.prototype.kind = SyntaxKind.ForStatement;
    ForStatementSyntax.prototype.childCount = 9;
    ForStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.forKeyword;
            case 1: return this.openParenToken;
            case 2: return this.initializer;
            case 3: return this.firstSemicolonToken;
            case 4: return this.condition;
            case 5: return this.secondSemicolonToken;
            case 6: return this.incrementor;
            case 7: return this.closeParenToken;
            case 8: return this.statement;
        }
    }

    export var ForInStatementSyntax: ForInStatementConstructor = <any>function (data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, left: VariableDeclarationSyntax | IExpressionSyntax, inKeyword: ISyntaxToken, right: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.forKeyword = forKeyword,
        this.openParenToken = openParenToken,
        this.left = left,
        this.inKeyword = inKeyword,
        this.right = right,
        this.closeParenToken = closeParenToken,
        this.statement = statement;
    };
    ForInStatementSyntax.prototype.kind = SyntaxKind.ForInStatement;
    ForInStatementSyntax.prototype.childCount = 7;
    ForInStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.forKeyword;
            case 1: return this.openParenToken;
            case 2: return this.left;
            case 3: return this.inKeyword;
            case 4: return this.right;
            case 5: return this.closeParenToken;
            case 6: return this.statement;
        }
    }

    export var EmptyStatementSyntax: EmptyStatementConstructor = <any>function (data: number, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.semicolonToken = semicolonToken;
    };
    EmptyStatementSyntax.prototype.kind = SyntaxKind.EmptyStatement;
    EmptyStatementSyntax.prototype.childCount = 1;
    EmptyStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.semicolonToken;
        }
    }

    export var ThrowStatementSyntax: ThrowStatementConstructor = <any>function (data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.throwKeyword = throwKeyword,
        this.expression = expression,
        this.semicolonToken = semicolonToken;
    };
    ThrowStatementSyntax.prototype.kind = SyntaxKind.ThrowStatement;
    ThrowStatementSyntax.prototype.childCount = 3;
    ThrowStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.throwKeyword;
            case 1: return this.expression;
            case 2: return this.semicolonToken;
        }
    }

    export var WhileStatementSyntax: WhileStatementConstructor = <any>function (data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.whileKeyword = whileKeyword,
        this.openParenToken = openParenToken,
        this.condition = condition,
        this.closeParenToken = closeParenToken,
        this.statement = statement;
    };
    WhileStatementSyntax.prototype.kind = SyntaxKind.WhileStatement;
    WhileStatementSyntax.prototype.childCount = 5;
    WhileStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.whileKeyword;
            case 1: return this.openParenToken;
            case 2: return this.condition;
            case 3: return this.closeParenToken;
            case 4: return this.statement;
        }
    }

    export var TryStatementSyntax: TryStatementConstructor = <any>function (data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.tryKeyword = tryKeyword,
        this.block = block,
        this.catchClause = catchClause,
        this.finallyClause = finallyClause;
    };
    TryStatementSyntax.prototype.kind = SyntaxKind.TryStatement;
    TryStatementSyntax.prototype.childCount = 4;
    TryStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.tryKeyword;
            case 1: return this.block;
            case 2: return this.catchClause;
            case 3: return this.finallyClause;
        }
    }

    export var LabeledStatementSyntax: LabeledStatementConstructor = <any>function (data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.identifier = identifier,
        this.colonToken = colonToken,
        this.statement = statement;
    };
    LabeledStatementSyntax.prototype.kind = SyntaxKind.LabeledStatement;
    LabeledStatementSyntax.prototype.childCount = 3;
    LabeledStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.identifier;
            case 1: return this.colonToken;
            case 2: return this.statement;
        }
    }

    export var DoStatementSyntax: DoStatementConstructor = <any>function (data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.doKeyword = doKeyword,
        this.statement = statement,
        this.whileKeyword = whileKeyword,
        this.openParenToken = openParenToken,
        this.condition = condition,
        this.closeParenToken = closeParenToken,
        this.semicolonToken = semicolonToken;
    };
    DoStatementSyntax.prototype.kind = SyntaxKind.DoStatement;
    DoStatementSyntax.prototype.childCount = 7;
    DoStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.doKeyword;
            case 1: return this.statement;
            case 2: return this.whileKeyword;
            case 3: return this.openParenToken;
            case 4: return this.condition;
            case 5: return this.closeParenToken;
            case 6: return this.semicolonToken;
        }
    }

    export var DebuggerStatementSyntax: DebuggerStatementConstructor = <any>function (data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.debuggerKeyword = debuggerKeyword,
        this.semicolonToken = semicolonToken;
    };
    DebuggerStatementSyntax.prototype.kind = SyntaxKind.DebuggerStatement;
    DebuggerStatementSyntax.prototype.childCount = 2;
    DebuggerStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.debuggerKeyword;
            case 1: return this.semicolonToken;
        }
    }

    export var WithStatementSyntax: WithStatementConstructor = <any>function (data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.withKeyword = withKeyword,
        this.openParenToken = openParenToken,
        this.condition = condition,
        this.closeParenToken = closeParenToken,
        this.statement = statement;
    };
    WithStatementSyntax.prototype.kind = SyntaxKind.WithStatement;
    WithStatementSyntax.prototype.childCount = 5;
    WithStatementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.withKeyword;
            case 1: return this.openParenToken;
            case 2: return this.condition;
            case 3: return this.closeParenToken;
            case 4: return this.statement;
        }
    }

    export var PrefixUnaryExpressionSyntax: PrefixUnaryExpressionConstructor = <any>function (data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.operatorToken = operatorToken,
        this.operand = operand;
    };
    PrefixUnaryExpressionSyntax.prototype.kind = SyntaxKind.PrefixUnaryExpression;
    PrefixUnaryExpressionSyntax.prototype.childCount = 2;
    PrefixUnaryExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.operatorToken;
            case 1: return this.operand;
        }
    }

    export var DeleteExpressionSyntax: DeleteExpressionConstructor = <any>function (data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.deleteKeyword = deleteKeyword,
        this.expression = expression;
    };
    DeleteExpressionSyntax.prototype.kind = SyntaxKind.DeleteExpression;
    DeleteExpressionSyntax.prototype.childCount = 2;
    DeleteExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.deleteKeyword;
            case 1: return this.expression;
        }
    }

    export var TypeOfExpressionSyntax: TypeOfExpressionConstructor = <any>function (data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.typeOfKeyword = typeOfKeyword,
        this.expression = expression;
    };
    TypeOfExpressionSyntax.prototype.kind = SyntaxKind.TypeOfExpression;
    TypeOfExpressionSyntax.prototype.childCount = 2;
    TypeOfExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.typeOfKeyword;
            case 1: return this.expression;
        }
    }

    export var VoidExpressionSyntax: VoidExpressionConstructor = <any>function (data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.voidKeyword = voidKeyword,
        this.expression = expression;
    };
    VoidExpressionSyntax.prototype.kind = SyntaxKind.VoidExpression;
    VoidExpressionSyntax.prototype.childCount = 2;
    VoidExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.voidKeyword;
            case 1: return this.expression;
        }
    }

    export var ConditionalExpressionSyntax: ConditionalExpressionConstructor = <any>function (data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.condition = condition,
        this.questionToken = questionToken,
        this.whenTrue = whenTrue,
        this.colonToken = colonToken,
        this.whenFalse = whenFalse;
    };
    ConditionalExpressionSyntax.prototype.kind = SyntaxKind.ConditionalExpression;
    ConditionalExpressionSyntax.prototype.childCount = 5;
    ConditionalExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.condition;
            case 1: return this.questionToken;
            case 2: return this.whenTrue;
            case 3: return this.colonToken;
            case 4: return this.whenFalse;
        }
    }

    export var BinaryExpressionSyntax: BinaryExpressionConstructor = <any>function (data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.left = left,
        this.operatorToken = operatorToken,
        this.right = right;
    };
    BinaryExpressionSyntax.prototype.kind = SyntaxKind.BinaryExpression;
    BinaryExpressionSyntax.prototype.childCount = 3;
    BinaryExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.left;
            case 1: return this.operatorToken;
            case 2: return this.right;
        }
    }

    export var PostfixUnaryExpressionSyntax: PostfixUnaryExpressionConstructor = <any>function (data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.operand = operand,
        this.operatorToken = operatorToken;
    };
    PostfixUnaryExpressionSyntax.prototype.kind = SyntaxKind.PostfixUnaryExpression;
    PostfixUnaryExpressionSyntax.prototype.childCount = 2;
    PostfixUnaryExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.operand;
            case 1: return this.operatorToken;
        }
    }

    export var PropertyAccessExpressionSyntax: PropertyAccessExpressionConstructor = <any>function (data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.expression = expression,
        this.dotToken = dotToken,
        this.name = name;
    };
    PropertyAccessExpressionSyntax.prototype.kind = SyntaxKind.PropertyAccessExpression;
    PropertyAccessExpressionSyntax.prototype.childCount = 3;
    PropertyAccessExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.expression;
            case 1: return this.dotToken;
            case 2: return this.name;
        }
    }

    export var InvocationExpressionSyntax: InvocationExpressionConstructor = <any>function (data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.expression = expression,
        this.argumentList = argumentList;
    };
    InvocationExpressionSyntax.prototype.kind = SyntaxKind.InvocationExpression;
    InvocationExpressionSyntax.prototype.childCount = 2;
    InvocationExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.expression;
            case 1: return this.argumentList;
        }
    }

    export var ArrayLiteralExpressionSyntax: ArrayLiteralExpressionConstructor = <any>function (data: number, openBracketToken: ISyntaxToken, expressions: ISeparatedSyntaxList<IExpressionSyntax>, closeBracketToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.openBracketToken = openBracketToken,
        this.expressions = expressions,
        this.closeBracketToken = closeBracketToken;
    };
    ArrayLiteralExpressionSyntax.prototype.kind = SyntaxKind.ArrayLiteralExpression;
    ArrayLiteralExpressionSyntax.prototype.childCount = 3;
    ArrayLiteralExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.openBracketToken;
            case 1: return this.expressions;
            case 2: return this.closeBracketToken;
        }
    }

    export var ObjectLiteralExpressionSyntax: ObjectLiteralExpressionConstructor = <any>function (data: number, openBraceToken: ISyntaxToken, propertyAssignments: ISeparatedSyntaxList<IPropertyAssignmentSyntax>, closeBraceToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.openBraceToken = openBraceToken,
        this.propertyAssignments = propertyAssignments,
        this.closeBraceToken = closeBraceToken;
    };
    ObjectLiteralExpressionSyntax.prototype.kind = SyntaxKind.ObjectLiteralExpression;
    ObjectLiteralExpressionSyntax.prototype.childCount = 3;
    ObjectLiteralExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.openBraceToken;
            case 1: return this.propertyAssignments;
            case 2: return this.closeBraceToken;
        }
    }

    export var ObjectCreationExpressionSyntax: ObjectCreationExpressionConstructor = <any>function (data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.newKeyword = newKeyword,
        this.expression = expression,
        this.argumentList = argumentList;
    };
    ObjectCreationExpressionSyntax.prototype.kind = SyntaxKind.ObjectCreationExpression;
    ObjectCreationExpressionSyntax.prototype.childCount = 3;
    ObjectCreationExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.newKeyword;
            case 1: return this.expression;
            case 2: return this.argumentList;
        }
    }

    export var ParenthesizedExpressionSyntax: ParenthesizedExpressionConstructor = <any>function (data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.openParenToken = openParenToken,
        this.expression = expression,
        this.closeParenToken = closeParenToken;
    };
    ParenthesizedExpressionSyntax.prototype.kind = SyntaxKind.ParenthesizedExpression;
    ParenthesizedExpressionSyntax.prototype.childCount = 3;
    ParenthesizedExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.openParenToken;
            case 1: return this.expression;
            case 2: return this.closeParenToken;
        }
    }

    export var ParenthesizedArrowFunctionExpressionSyntax: ParenthesizedArrowFunctionExpressionConstructor = <any>function (data: number, asyncKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, body: BlockSyntax | IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.asyncKeyword = asyncKeyword,
        this.callSignature = callSignature,
        this.equalsGreaterThanToken = equalsGreaterThanToken,
        this.body = body;
    };
    ParenthesizedArrowFunctionExpressionSyntax.prototype.kind = SyntaxKind.ParenthesizedArrowFunctionExpression;
    ParenthesizedArrowFunctionExpressionSyntax.prototype.childCount = 4;
    ParenthesizedArrowFunctionExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.asyncKeyword;
            case 1: return this.callSignature;
            case 2: return this.equalsGreaterThanToken;
            case 3: return this.body;
        }
    }

    export var SimpleArrowFunctionExpressionSyntax: SimpleArrowFunctionExpressionConstructor = <any>function (data: number, asyncKeyword: ISyntaxToken, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, body: BlockSyntax | IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.asyncKeyword = asyncKeyword,
        this.parameter = parameter,
        this.equalsGreaterThanToken = equalsGreaterThanToken,
        this.body = body;
    };
    SimpleArrowFunctionExpressionSyntax.prototype.kind = SyntaxKind.SimpleArrowFunctionExpression;
    SimpleArrowFunctionExpressionSyntax.prototype.childCount = 4;
    SimpleArrowFunctionExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.asyncKeyword;
            case 1: return this.parameter;
            case 2: return this.equalsGreaterThanToken;
            case 3: return this.body;
        }
    }

    export var TypeAssertionExpressionSyntax: TypeAssertionExpressionConstructor = <any>function (data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.lessThanToken = lessThanToken,
        this.type = type,
        this.greaterThanToken = greaterThanToken,
        this.expression = expression;
    };
    TypeAssertionExpressionSyntax.prototype.kind = SyntaxKind.TypeAssertionExpression;
    TypeAssertionExpressionSyntax.prototype.childCount = 4;
    TypeAssertionExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.lessThanToken;
            case 1: return this.type;
            case 2: return this.greaterThanToken;
            case 3: return this.expression;
        }
    }

    export var ElementAccessExpressionSyntax: ElementAccessExpressionConstructor = <any>function (data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.expression = expression,
        this.openBracketToken = openBracketToken,
        this.argumentExpression = argumentExpression,
        this.closeBracketToken = closeBracketToken;
    };
    ElementAccessExpressionSyntax.prototype.kind = SyntaxKind.ElementAccessExpression;
    ElementAccessExpressionSyntax.prototype.childCount = 4;
    ElementAccessExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.expression;
            case 1: return this.openBracketToken;
            case 2: return this.argumentExpression;
            case 3: return this.closeBracketToken;
        }
    }

    export var FunctionExpressionSyntax: FunctionExpressionConstructor = <any>function (data: number, asyncKeyword: ISyntaxToken, functionKeyword: ISyntaxToken, asterixToken: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, body: BlockSyntax | ExpressionBody | ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.asyncKeyword = asyncKeyword,
        this.functionKeyword = functionKeyword,
        this.asterixToken = asterixToken,
        this.identifier = identifier,
        this.callSignature = callSignature,
        this.body = body;
    };
    FunctionExpressionSyntax.prototype.kind = SyntaxKind.FunctionExpression;
    FunctionExpressionSyntax.prototype.childCount = 6;
    FunctionExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.asyncKeyword;
            case 1: return this.functionKeyword;
            case 2: return this.asterixToken;
            case 3: return this.identifier;
            case 4: return this.callSignature;
            case 5: return this.body;
        }
    }

    export var OmittedExpressionSyntax: OmittedExpressionConstructor = <any>function (data: number) {
        if (data) { this.__data = data; }
        this.parent = undefined;
    };
    OmittedExpressionSyntax.prototype.kind = SyntaxKind.OmittedExpression;
    OmittedExpressionSyntax.prototype.childCount = 0;
    OmittedExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        throw Errors.invalidOperation();
    }

    export var TemplateExpressionSyntax: TemplateExpressionConstructor = <any>function (data: number, templateStartToken: ISyntaxToken, templateClauses: TemplateClauseSyntax[]) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.templateStartToken = templateStartToken,
        this.templateClauses = templateClauses;
    };
    TemplateExpressionSyntax.prototype.kind = SyntaxKind.TemplateExpression;
    TemplateExpressionSyntax.prototype.childCount = 2;
    TemplateExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.templateStartToken;
            case 1: return this.templateClauses;
        }
    }

    export var TemplateAccessExpressionSyntax: TemplateAccessExpressionConstructor = <any>function (data: number, expression: ILeftHandSideExpressionSyntax, templateExpression: IPrimaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.expression = expression,
        this.templateExpression = templateExpression;
    };
    TemplateAccessExpressionSyntax.prototype.kind = SyntaxKind.TemplateAccessExpression;
    TemplateAccessExpressionSyntax.prototype.childCount = 2;
    TemplateAccessExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.expression;
            case 1: return this.templateExpression;
        }
    }

    export var YieldExpressionSyntax: YieldExpressionConstructor = <any>function (data: number, yieldKeyword: ISyntaxToken, asterixToken: ISyntaxToken, expression: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.yieldKeyword = yieldKeyword,
        this.asterixToken = asterixToken,
        this.expression = expression;
    };
    YieldExpressionSyntax.prototype.kind = SyntaxKind.YieldExpression;
    YieldExpressionSyntax.prototype.childCount = 3;
    YieldExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.yieldKeyword;
            case 1: return this.asterixToken;
            case 2: return this.expression;
        }
    }

    export var AwaitExpressionSyntax: AwaitExpressionConstructor = <any>function (data: number, awaitKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.awaitKeyword = awaitKeyword,
        this.expression = expression;
    };
    AwaitExpressionSyntax.prototype.kind = SyntaxKind.AwaitExpression;
    AwaitExpressionSyntax.prototype.childCount = 2;
    AwaitExpressionSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.awaitKeyword;
            case 1: return this.expression;
        }
    }

    export var VariableDeclarationSyntax: VariableDeclarationConstructor = <any>function (data: number, varConstOrLetKeyword: ISyntaxToken, variableDeclarators: ISeparatedSyntaxList<VariableDeclaratorSyntax>) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.varConstOrLetKeyword = varConstOrLetKeyword,
        this.variableDeclarators = variableDeclarators;
    };
    VariableDeclarationSyntax.prototype.kind = SyntaxKind.VariableDeclaration;
    VariableDeclarationSyntax.prototype.childCount = 2;
    VariableDeclarationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.varConstOrLetKeyword;
            case 1: return this.variableDeclarators;
        }
    }

    export var VariableDeclaratorSyntax: VariableDeclaratorConstructor = <any>function (data: number, propertyName: IPropertyNameSyntax, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.propertyName = propertyName,
        this.typeAnnotation = typeAnnotation,
        this.equalsValueClause = equalsValueClause;
    };
    VariableDeclaratorSyntax.prototype.kind = SyntaxKind.VariableDeclarator;
    VariableDeclaratorSyntax.prototype.childCount = 3;
    VariableDeclaratorSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.propertyName;
            case 1: return this.typeAnnotation;
            case 2: return this.equalsValueClause;
        }
    }

    export var ArgumentListSyntax: ArgumentListConstructor = <any>function (data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, _arguments: ISeparatedSyntaxList<IExpressionSyntax>, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.typeArgumentList = typeArgumentList,
        this.openParenToken = openParenToken,
        this.arguments = _arguments,
        this.closeParenToken = closeParenToken;
    };
    ArgumentListSyntax.prototype.kind = SyntaxKind.ArgumentList;
    ArgumentListSyntax.prototype.childCount = 4;
    ArgumentListSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.typeArgumentList;
            case 1: return this.openParenToken;
            case 2: return this.arguments;
            case 3: return this.closeParenToken;
        }
    }

    export var ParameterListSyntax: ParameterListConstructor = <any>function (data: number, openParenToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.openParenToken = openParenToken,
        this.parameters = parameters,
        this.closeParenToken = closeParenToken;
    };
    ParameterListSyntax.prototype.kind = SyntaxKind.ParameterList;
    ParameterListSyntax.prototype.childCount = 3;
    ParameterListSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.openParenToken;
            case 1: return this.parameters;
            case 2: return this.closeParenToken;
        }
    }

    export var TypeArgumentListSyntax: TypeArgumentListConstructor = <any>function (data: number, lessThanToken: ISyntaxToken, typeArguments: ISeparatedSyntaxList<ITypeSyntax>, greaterThanToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.lessThanToken = lessThanToken,
        this.typeArguments = typeArguments,
        this.greaterThanToken = greaterThanToken;
    };
    TypeArgumentListSyntax.prototype.kind = SyntaxKind.TypeArgumentList;
    TypeArgumentListSyntax.prototype.childCount = 3;
    TypeArgumentListSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.lessThanToken;
            case 1: return this.typeArguments;
            case 2: return this.greaterThanToken;
        }
    }

    export var TypeParameterListSyntax: TypeParameterListConstructor = <any>function (data: number, lessThanToken: ISyntaxToken, typeParameters: ISeparatedSyntaxList<TypeParameterSyntax>, greaterThanToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.lessThanToken = lessThanToken,
        this.typeParameters = typeParameters,
        this.greaterThanToken = greaterThanToken;
    };
    TypeParameterListSyntax.prototype.kind = SyntaxKind.TypeParameterList;
    TypeParameterListSyntax.prototype.childCount = 3;
    TypeParameterListSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.lessThanToken;
            case 1: return this.typeParameters;
            case 2: return this.greaterThanToken;
        }
    }

    export var HeritageClauseSyntax: HeritageClauseConstructor = <any>function (data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: ISeparatedSyntaxList<INameSyntax>) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.extendsOrImplementsKeyword = extendsOrImplementsKeyword,
        this.typeNames = typeNames;
    };
    HeritageClauseSyntax.prototype.kind = SyntaxKind.HeritageClause;
    HeritageClauseSyntax.prototype.childCount = 2;
    HeritageClauseSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.extendsOrImplementsKeyword;
            case 1: return this.typeNames;
        }
    }

    export var EqualsValueClauseSyntax: EqualsValueClauseConstructor = <any>function (data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.equalsToken = equalsToken,
        this.value = value;
    };
    EqualsValueClauseSyntax.prototype.kind = SyntaxKind.EqualsValueClause;
    EqualsValueClauseSyntax.prototype.childCount = 2;
    EqualsValueClauseSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.equalsToken;
            case 1: return this.value;
        }
    }

    export var CaseSwitchClauseSyntax: CaseSwitchClauseConstructor = <any>function (data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.caseKeyword = caseKeyword,
        this.expression = expression,
        this.colonToken = colonToken,
        this.statements = statements;
    };
    CaseSwitchClauseSyntax.prototype.kind = SyntaxKind.CaseSwitchClause;
    CaseSwitchClauseSyntax.prototype.childCount = 4;
    CaseSwitchClauseSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.caseKeyword;
            case 1: return this.expression;
            case 2: return this.colonToken;
            case 3: return this.statements;
        }
    }

    export var DefaultSwitchClauseSyntax: DefaultSwitchClauseConstructor = <any>function (data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.defaultKeyword = defaultKeyword,
        this.colonToken = colonToken,
        this.statements = statements;
    };
    DefaultSwitchClauseSyntax.prototype.kind = SyntaxKind.DefaultSwitchClause;
    DefaultSwitchClauseSyntax.prototype.childCount = 3;
    DefaultSwitchClauseSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.defaultKeyword;
            case 1: return this.colonToken;
            case 2: return this.statements;
        }
    }

    export var ElseClauseSyntax: ElseClauseConstructor = <any>function (data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.elseKeyword = elseKeyword,
        this.statement = statement;
    };
    ElseClauseSyntax.prototype.kind = SyntaxKind.ElseClause;
    ElseClauseSyntax.prototype.childCount = 2;
    ElseClauseSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.elseKeyword;
            case 1: return this.statement;
        }
    }

    export var CatchClauseSyntax: CatchClauseConstructor = <any>function (data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.catchKeyword = catchKeyword,
        this.openParenToken = openParenToken,
        this.identifier = identifier,
        this.typeAnnotation = typeAnnotation,
        this.closeParenToken = closeParenToken,
        this.block = block;
    };
    CatchClauseSyntax.prototype.kind = SyntaxKind.CatchClause;
    CatchClauseSyntax.prototype.childCount = 6;
    CatchClauseSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.catchKeyword;
            case 1: return this.openParenToken;
            case 2: return this.identifier;
            case 3: return this.typeAnnotation;
            case 4: return this.closeParenToken;
            case 5: return this.block;
        }
    }

    export var FinallyClauseSyntax: FinallyClauseConstructor = <any>function (data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.finallyKeyword = finallyKeyword,
        this.block = block;
    };
    FinallyClauseSyntax.prototype.kind = SyntaxKind.FinallyClause;
    FinallyClauseSyntax.prototype.childCount = 2;
    FinallyClauseSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.finallyKeyword;
            case 1: return this.block;
        }
    }

    export var TemplateClauseSyntax: TemplateClauseConstructor = <any>function (data: number, expression: IExpressionSyntax, templateMiddleOrEndToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.expression = expression,
        this.templateMiddleOrEndToken = templateMiddleOrEndToken;
    };
    TemplateClauseSyntax.prototype.kind = SyntaxKind.TemplateClause;
    TemplateClauseSyntax.prototype.childCount = 2;
    TemplateClauseSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.expression;
            case 1: return this.templateMiddleOrEndToken;
        }
    }

    export var TypeParameterSyntax: TypeParameterConstructor = <any>function (data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.identifier = identifier,
        this.constraint = constraint;
    };
    TypeParameterSyntax.prototype.kind = SyntaxKind.TypeParameter;
    TypeParameterSyntax.prototype.childCount = 2;
    TypeParameterSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.identifier;
            case 1: return this.constraint;
        }
    }

    export var ConstraintSyntax: ConstraintConstructor = <any>function (data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.extendsKeyword = extendsKeyword,
        this.typeOrExpression = typeOrExpression;
    };
    ConstraintSyntax.prototype.kind = SyntaxKind.Constraint;
    ConstraintSyntax.prototype.childCount = 2;
    ConstraintSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.extendsKeyword;
            case 1: return this.typeOrExpression;
        }
    }

    export var ParameterSyntax: ParameterConstructor = <any>function (data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.dotDotDotToken = dotDotDotToken,
        this.modifiers = modifiers,
        this.identifier = identifier,
        this.questionToken = questionToken,
        this.typeAnnotation = typeAnnotation,
        this.equalsValueClause = equalsValueClause;
    };
    ParameterSyntax.prototype.kind = SyntaxKind.Parameter;
    ParameterSyntax.prototype.childCount = 6;
    ParameterSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.dotDotDotToken;
            case 1: return this.modifiers;
            case 2: return this.identifier;
            case 3: return this.questionToken;
            case 4: return this.typeAnnotation;
            case 5: return this.equalsValueClause;
        }
    }

    export var EnumElementSyntax: EnumElementConstructor = <any>function (data: number, propertyName: IPropertyNameSyntax, equalsValueClause: EqualsValueClauseSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.propertyName = propertyName,
        this.equalsValueClause = equalsValueClause;
    };
    EnumElementSyntax.prototype.kind = SyntaxKind.EnumElement;
    EnumElementSyntax.prototype.childCount = 2;
    EnumElementSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.propertyName;
            case 1: return this.equalsValueClause;
        }
    }

    export var TypeAnnotationSyntax: TypeAnnotationConstructor = <any>function (data: number, colonToken: ISyntaxToken, type: ITypeSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.colonToken = colonToken,
        this.type = type;
    };
    TypeAnnotationSyntax.prototype.kind = SyntaxKind.TypeAnnotation;
    TypeAnnotationSyntax.prototype.childCount = 2;
    TypeAnnotationSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.colonToken;
            case 1: return this.type;
        }
    }

    export var ExpressionBody: ExpressionBodyConstructor = <any>function (data: number, equalsGreaterThanToken: ISyntaxToken, expression: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.equalsGreaterThanToken = equalsGreaterThanToken,
        this.expression = expression;
    };
    ExpressionBody.prototype.kind = SyntaxKind.ExpressionBody;
    ExpressionBody.prototype.childCount = 2;
    ExpressionBody.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.equalsGreaterThanToken;
            case 1: return this.expression;
        }
    }

    export var ComputedPropertyNameSyntax: ComputedPropertyNameConstructor = <any>function (data: number, openBracketToken: ISyntaxToken, expression: IExpressionSyntax, closeBracketToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.openBracketToken = openBracketToken,
        this.expression = expression,
        this.closeBracketToken = closeBracketToken;
    };
    ComputedPropertyNameSyntax.prototype.kind = SyntaxKind.ComputedPropertyName;
    ComputedPropertyNameSyntax.prototype.childCount = 3;
    ComputedPropertyNameSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.openBracketToken;
            case 1: return this.expression;
            case 2: return this.closeBracketToken;
        }
    }

    export var PropertyAssignmentSyntax: PropertyAssignmentConstructor = <any>function (data: number, propertyName: IPropertyNameSyntax, colonToken: ISyntaxToken, expression: IExpressionSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.propertyName = propertyName,
        this.colonToken = colonToken,
        this.expression = expression;
    };
    PropertyAssignmentSyntax.prototype.kind = SyntaxKind.PropertyAssignment;
    PropertyAssignmentSyntax.prototype.childCount = 3;
    PropertyAssignmentSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.propertyName;
            case 1: return this.colonToken;
            case 2: return this.expression;
        }
    }

    export var TypeAliasSyntax: TypeAliasConstructor = <any>function (data: number, modifiers: ISyntaxToken[], typeKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, type: ITypeSyntax, semicolonToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.modifiers = modifiers,
        this.typeKeyword = typeKeyword,
        this.identifier = identifier,
        this.equalsToken = equalsToken,
        this.type = type,
        this.semicolonToken = semicolonToken;
    };
    TypeAliasSyntax.prototype.kind = SyntaxKind.TypeAlias;
    TypeAliasSyntax.prototype.childCount = 6;
    TypeAliasSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.modifiers;
            case 1: return this.typeKeyword;
            case 2: return this.identifier;
            case 3: return this.equalsToken;
            case 4: return this.type;
            case 5: return this.semicolonToken;
        }
    }

    export var ExternalModuleReferenceSyntax: ExternalModuleReferenceConstructor = <any>function (data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.requireKeyword = requireKeyword,
        this.openParenToken = openParenToken,
        this.expression = expression,
        this.closeParenToken = closeParenToken;
    };
    ExternalModuleReferenceSyntax.prototype.kind = SyntaxKind.ExternalModuleReference;
    ExternalModuleReferenceSyntax.prototype.childCount = 4;
    ExternalModuleReferenceSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.requireKeyword;
            case 1: return this.openParenToken;
            case 2: return this.expression;
            case 3: return this.closeParenToken;
        }
    }

    export var ModuleNameModuleReferenceSyntax: ModuleNameModuleReferenceConstructor = <any>function (data: number, moduleName: INameSyntax) {
        if (data) { this.__data = data; }
        this.parent = undefined,
        this.moduleName = moduleName;
    };
    ModuleNameModuleReferenceSyntax.prototype.kind = SyntaxKind.ModuleNameModuleReference;
    ModuleNameModuleReferenceSyntax.prototype.childCount = 1;
    ModuleNameModuleReferenceSyntax.prototype.childAt = function (index: number): ISyntaxElement {
        switch (index) {
            case 0: return this.moduleName;
        }
    }
}