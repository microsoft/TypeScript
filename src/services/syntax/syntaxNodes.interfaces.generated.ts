///<reference path='references.ts' />

module TypeScript {
    export interface SourceUnitSyntax extends ISyntaxNode {
        syntaxTree: SyntaxTree;
        moduleElements: IModuleElementSyntax[];
        endOfFileToken: ISyntaxToken;
    }
    export interface QualifiedNameSyntax extends ISyntaxNode, INameSyntax {
        left: INameSyntax;
        dotToken: ISyntaxToken;
        right: ISyntaxToken;
    }
    export interface ObjectTypeSyntax extends ISyntaxNode, ITypeSyntax {
        openBraceToken: ISyntaxToken;
        typeMembers: ITypeMemberSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    export interface FunctionTypeSyntax extends ISyntaxNode, ITypeSyntax {
        typeParameterList: TypeParameterListSyntax;
        parameterList: ParameterListSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        type: ITypeSyntax;
    }
    export interface ArrayTypeSyntax extends ISyntaxNode, ITypeSyntax {
        type: ITypeSyntax;
        openBracketToken: ISyntaxToken;
        closeBracketToken: ISyntaxToken;
    }
    export interface ConstructorTypeSyntax extends ISyntaxNode, ITypeSyntax {
        newKeyword: ISyntaxToken;
        typeParameterList: TypeParameterListSyntax;
        parameterList: ParameterListSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        type: ITypeSyntax;
    }
    export interface GenericTypeSyntax extends ISyntaxNode, ITypeSyntax {
        name: INameSyntax;
        typeArgumentList: TypeArgumentListSyntax;
    }
    export interface TypeQuerySyntax extends ISyntaxNode, ITypeSyntax {
        typeOfKeyword: ISyntaxToken;
        name: INameSyntax;
    }
    export interface InterfaceDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        interfaceKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        typeParameterList: TypeParameterListSyntax;
        heritageClauses: HeritageClauseSyntax[];
        body: ObjectTypeSyntax;
    }
    export interface FunctionDeclarationSyntax extends ISyntaxNode, IStatementSyntax {
        modifiers: ISyntaxToken[];
        functionKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface ModuleDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        moduleKeyword: ISyntaxToken;
        name: INameSyntax;
        stringLiteral: ISyntaxToken;
        openBraceToken: ISyntaxToken;
        moduleElements: IModuleElementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    export interface ClassDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        classKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        typeParameterList: TypeParameterListSyntax;
        heritageClauses: HeritageClauseSyntax[];
        openBraceToken: ISyntaxToken;
        classElements: IClassElementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    export interface EnumDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        enumKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        openBraceToken: ISyntaxToken;
        enumElements: EnumElementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    export interface ImportDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        importKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        equalsToken: ISyntaxToken;
        moduleReference: IModuleReferenceSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface ExportAssignmentSyntax extends ISyntaxNode, IModuleElementSyntax {
        exportKeyword: ISyntaxToken;
        equalsToken: ISyntaxToken;
        identifier: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    export interface MemberFunctionDeclarationSyntax extends ISyntaxNode, IMemberDeclarationSyntax {
        modifiers: ISyntaxToken[];
        propertyName: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface MemberVariableDeclarationSyntax extends ISyntaxNode, IMemberDeclarationSyntax {
        modifiers: ISyntaxToken[];
        variableDeclarator: VariableDeclaratorSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface ConstructorDeclarationSyntax extends ISyntaxNode, IClassElementSyntax {
        modifiers: ISyntaxToken[];
        constructorKeyword: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface IndexMemberDeclarationSyntax extends ISyntaxNode, IClassElementSyntax {
        modifiers: ISyntaxToken[];
        indexSignature: IndexSignatureSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface GetAccessorSyntax extends ISyntaxNode, IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        modifiers: ISyntaxToken[];
        getKeyword: ISyntaxToken;
        propertyName: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    export interface SetAccessorSyntax extends ISyntaxNode, IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        modifiers: ISyntaxToken[];
        setKeyword: ISyntaxToken;
        propertyName: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    export interface PropertySignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        propertyName: ISyntaxToken;
        questionToken: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
    }
    export interface CallSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        typeParameterList: TypeParameterListSyntax;
        parameterList: ParameterListSyntax;
        typeAnnotation: TypeAnnotationSyntax;
    }
    export interface ConstructSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        newKeyword: ISyntaxToken;
        callSignature: CallSignatureSyntax;
    }
    export interface IndexSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        openBracketToken: ISyntaxToken;
        parameters: ParameterSyntax[];
        closeBracketToken: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
    }
    export interface MethodSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        propertyName: ISyntaxToken;
        questionToken: ISyntaxToken;
        callSignature: CallSignatureSyntax;
    }
    export interface BlockSyntax extends ISyntaxNode, IStatementSyntax {
        openBraceToken: ISyntaxToken;
        statements: IStatementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    export interface IfStatementSyntax extends ISyntaxNode, IStatementSyntax {
        ifKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
        elseClause: ElseClauseSyntax;
    }
    export interface VariableStatementSyntax extends ISyntaxNode, IStatementSyntax {
        modifiers: ISyntaxToken[];
        variableDeclaration: VariableDeclarationSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface ExpressionStatementSyntax extends ISyntaxNode, IStatementSyntax {
        expression: IExpressionSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface ReturnStatementSyntax extends ISyntaxNode, IStatementSyntax {
        returnKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface SwitchStatementSyntax extends ISyntaxNode, IStatementSyntax {
        switchKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        expression: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        openBraceToken: ISyntaxToken;
        switchClauses: ISwitchClauseSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    export interface BreakStatementSyntax extends ISyntaxNode, IStatementSyntax {
        breakKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    export interface ContinueStatementSyntax extends ISyntaxNode, IStatementSyntax {
        continueKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    export interface ForStatementSyntax extends ISyntaxNode, IStatementSyntax {
        forKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        variableDeclaration: VariableDeclarationSyntax;
        initializer: IExpressionSyntax;
        firstSemicolonToken: ISyntaxToken;
        condition: IExpressionSyntax;
        secondSemicolonToken: ISyntaxToken;
        incrementor: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    export interface ForInStatementSyntax extends ISyntaxNode, IStatementSyntax {
        forKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        variableDeclaration: VariableDeclarationSyntax;
        left: IExpressionSyntax;
        inKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    export interface EmptyStatementSyntax extends ISyntaxNode, IStatementSyntax {
        semicolonToken: ISyntaxToken;
    }
    export interface ThrowStatementSyntax extends ISyntaxNode, IStatementSyntax {
        throwKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        semicolonToken: ISyntaxToken;
    }
    export interface WhileStatementSyntax extends ISyntaxNode, IStatementSyntax {
        whileKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    export interface TryStatementSyntax extends ISyntaxNode, IStatementSyntax {
        tryKeyword: ISyntaxToken;
        block: BlockSyntax;
        catchClause: CatchClauseSyntax;
        finallyClause: FinallyClauseSyntax;
    }
    export interface LabeledStatementSyntax extends ISyntaxNode, IStatementSyntax {
        identifier: ISyntaxToken;
        colonToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    export interface DoStatementSyntax extends ISyntaxNode, IStatementSyntax {
        doKeyword: ISyntaxToken;
        statement: IStatementSyntax;
        whileKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    export interface DebuggerStatementSyntax extends ISyntaxNode, IStatementSyntax {
        debuggerKeyword: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    export interface WithStatementSyntax extends ISyntaxNode, IStatementSyntax {
        withKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    export interface PrefixUnaryExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        operatorToken: ISyntaxToken;
        operand: IUnaryExpressionSyntax;
    }
    export interface DeleteExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        deleteKeyword: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    export interface TypeOfExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        typeOfKeyword: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    export interface VoidExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        voidKeyword: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    export interface ConditionalExpressionSyntax extends ISyntaxNode, IExpressionSyntax {
        condition: IExpressionSyntax;
        questionToken: ISyntaxToken;
        whenTrue: IExpressionSyntax;
        colonToken: ISyntaxToken;
        whenFalse: IExpressionSyntax;
    }
    export interface BinaryExpressionSyntax extends ISyntaxNode, IExpressionSyntax {
        left: IExpressionSyntax;
        operatorToken: ISyntaxToken;
        right: IExpressionSyntax;
    }
    export interface PostfixUnaryExpressionSyntax extends ISyntaxNode, IPostfixExpressionSyntax {
        operand: ILeftHandSideExpressionSyntax;
        operatorToken: ISyntaxToken;
    }
    export interface MemberAccessExpressionSyntax extends ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        dotToken: ISyntaxToken;
        name: ISyntaxToken;
    }
    export interface InvocationExpressionSyntax extends ISyntaxNode, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        argumentList: ArgumentListSyntax;
    }
    export interface ArrayLiteralExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        openBracketToken: ISyntaxToken;
        expressions: IExpressionSyntax[];
        closeBracketToken: ISyntaxToken;
    }
    export interface ObjectLiteralExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        openBraceToken: ISyntaxToken;
        propertyAssignments: IPropertyAssignmentSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    export interface ObjectCreationExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        newKeyword: ISyntaxToken;
        expression: IMemberExpressionSyntax;
        argumentList: ArgumentListSyntax;
    }
    export interface ParenthesizedExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        openParenToken: ISyntaxToken;
        expression: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
    }
    export interface ParenthesizedArrowFunctionExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        callSignature: CallSignatureSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        block: BlockSyntax;
        expression: IExpressionSyntax;
    }
    export interface SimpleArrowFunctionExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        parameter: ParameterSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        block: BlockSyntax;
        expression: IExpressionSyntax;
    }
    export interface CastExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        lessThanToken: ISyntaxToken;
        type: ITypeSyntax;
        greaterThanToken: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    export interface ElementAccessExpressionSyntax extends ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        openBracketToken: ISyntaxToken;
        argumentExpression: IExpressionSyntax;
        closeBracketToken: ISyntaxToken;
    }
    export interface FunctionExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        functionKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    export interface OmittedExpressionSyntax extends ISyntaxNode, IExpressionSyntax {
    }
    export interface VariableDeclarationSyntax extends ISyntaxNode {
        varKeyword: ISyntaxToken;
        variableDeclarators: VariableDeclaratorSyntax[];
    }
    export interface VariableDeclaratorSyntax extends ISyntaxNode {
        propertyName: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
        equalsValueClause: EqualsValueClauseSyntax;
    }
    export interface ArgumentListSyntax extends ISyntaxNode {
        typeArgumentList: TypeArgumentListSyntax;
        openParenToken: ISyntaxToken;
        arguments: IExpressionSyntax[];
        closeParenToken: ISyntaxToken;
    }
    export interface ParameterListSyntax extends ISyntaxNode {
        openParenToken: ISyntaxToken;
        parameters: ParameterSyntax[];
        closeParenToken: ISyntaxToken;
    }
    export interface TypeArgumentListSyntax extends ISyntaxNode {
        lessThanToken: ISyntaxToken;
        typeArguments: ITypeSyntax[];
        greaterThanToken: ISyntaxToken;
    }
    export interface TypeParameterListSyntax extends ISyntaxNode {
        lessThanToken: ISyntaxToken;
        typeParameters: TypeParameterSyntax[];
        greaterThanToken: ISyntaxToken;
    }
    export interface HeritageClauseSyntax extends ISyntaxNode {
        extendsOrImplementsKeyword: ISyntaxToken;
        typeNames: INameSyntax[];
    }
    export interface EqualsValueClauseSyntax extends ISyntaxNode {
        equalsToken: ISyntaxToken;
        value: IExpressionSyntax;
    }
    export interface CaseSwitchClauseSyntax extends ISyntaxNode, ISwitchClauseSyntax {
        caseKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        colonToken: ISyntaxToken;
        statements: IStatementSyntax[];
    }
    export interface DefaultSwitchClauseSyntax extends ISyntaxNode, ISwitchClauseSyntax {
        defaultKeyword: ISyntaxToken;
        colonToken: ISyntaxToken;
        statements: IStatementSyntax[];
    }
    export interface ElseClauseSyntax extends ISyntaxNode {
        elseKeyword: ISyntaxToken;
        statement: IStatementSyntax;
    }
    export interface CatchClauseSyntax extends ISyntaxNode {
        catchKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        identifier: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
        closeParenToken: ISyntaxToken;
        block: BlockSyntax;
    }
    export interface FinallyClauseSyntax extends ISyntaxNode {
        finallyKeyword: ISyntaxToken;
        block: BlockSyntax;
    }
    export interface TypeParameterSyntax extends ISyntaxNode {
        identifier: ISyntaxToken;
        constraint: ConstraintSyntax;
    }
    export interface ConstraintSyntax extends ISyntaxNode {
        extendsKeyword: ISyntaxToken;
        typeOrExpression: ISyntaxNodeOrToken;
    }
    export interface SimplePropertyAssignmentSyntax extends ISyntaxNode, IPropertyAssignmentSyntax {
        propertyName: ISyntaxToken;
        colonToken: ISyntaxToken;
        expression: IExpressionSyntax;
    }
    export interface FunctionPropertyAssignmentSyntax extends ISyntaxNode, IPropertyAssignmentSyntax {
        propertyName: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    export interface ParameterSyntax extends ISyntaxNode {
        dotDotDotToken: ISyntaxToken;
        modifiers: ISyntaxToken[];
        identifier: ISyntaxToken;
        questionToken: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
        equalsValueClause: EqualsValueClauseSyntax;
    }
    export interface EnumElementSyntax extends ISyntaxNode {
        propertyName: ISyntaxToken;
        equalsValueClause: EqualsValueClauseSyntax;
    }
    export interface TypeAnnotationSyntax extends ISyntaxNode {
        colonToken: ISyntaxToken;
        type: ITypeSyntax;
    }
    export interface ExternalModuleReferenceSyntax extends ISyntaxNode, IModuleReferenceSyntax {
        requireKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        stringLiteral: ISyntaxToken;
        closeParenToken: ISyntaxToken;
    }
    export interface ModuleNameModuleReferenceSyntax extends ISyntaxNode, IModuleReferenceSyntax {
        moduleName: INameSyntax;
    }

    export var nodeMetadata: string[][] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],["moduleElements","endOfFileToken"],["left","dotToken","right"],["openBraceToken","typeMembers","closeBraceToken"],["typeParameterList","parameterList","equalsGreaterThanToken","type"],["type","openBracketToken","closeBracketToken"],["newKeyword","typeParameterList","parameterList","equalsGreaterThanToken","type"],["name","typeArgumentList"],["typeOfKeyword","name"],["modifiers","interfaceKeyword","identifier","typeParameterList","heritageClauses","body"],["modifiers","functionKeyword","identifier","callSignature","block","semicolonToken"],["modifiers","moduleKeyword","name","stringLiteral","openBraceToken","moduleElements","closeBraceToken"],["modifiers","classKeyword","identifier","typeParameterList","heritageClauses","openBraceToken","classElements","closeBraceToken"],["modifiers","enumKeyword","identifier","openBraceToken","enumElements","closeBraceToken"],["modifiers","importKeyword","identifier","equalsToken","moduleReference","semicolonToken"],["exportKeyword","equalsToken","identifier","semicolonToken"],["modifiers","propertyName","callSignature","block","semicolonToken"],["modifiers","variableDeclarator","semicolonToken"],["modifiers","constructorKeyword","callSignature","block","semicolonToken"],["modifiers","indexSignature","semicolonToken"],["modifiers","getKeyword","propertyName","callSignature","block"],["modifiers","setKeyword","propertyName","callSignature","block"],["propertyName","questionToken","typeAnnotation"],["typeParameterList","parameterList","typeAnnotation"],["newKeyword","callSignature"],["openBracketToken","parameters","closeBracketToken","typeAnnotation"],["propertyName","questionToken","callSignature"],["openBraceToken","statements","closeBraceToken"],["ifKeyword","openParenToken","condition","closeParenToken","statement","elseClause"],["modifiers","variableDeclaration","semicolonToken"],["expression","semicolonToken"],["returnKeyword","expression","semicolonToken"],["switchKeyword","openParenToken","expression","closeParenToken","openBraceToken","switchClauses","closeBraceToken"],["breakKeyword","identifier","semicolonToken"],["continueKeyword","identifier","semicolonToken"],["forKeyword","openParenToken","variableDeclaration","initializer","firstSemicolonToken","condition","secondSemicolonToken","incrementor","closeParenToken","statement"],["forKeyword","openParenToken","variableDeclaration","left","inKeyword","expression","closeParenToken","statement"],["semicolonToken"],["throwKeyword","expression","semicolonToken"],["whileKeyword","openParenToken","condition","closeParenToken","statement"],["tryKeyword","block","catchClause","finallyClause"],["identifier","colonToken","statement"],["doKeyword","statement","whileKeyword","openParenToken","condition","closeParenToken","semicolonToken"],["debuggerKeyword","semicolonToken"],["withKeyword","openParenToken","condition","closeParenToken","statement"],["operatorToken","operand"],["operatorToken","operand"],["operatorToken","operand"],["operatorToken","operand"],["operatorToken","operand"],["operatorToken","operand"],["deleteKeyword","expression"],["typeOfKeyword","expression"],["voidKeyword","expression"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["condition","questionToken","whenTrue","colonToken","whenFalse"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["left","operatorToken","right"],["operand","operatorToken"],["operand","operatorToken"],["expression","dotToken","name"],["expression","argumentList"],["openBracketToken","expressions","closeBracketToken"],["openBraceToken","propertyAssignments","closeBraceToken"],["newKeyword","expression","argumentList"],["openParenToken","expression","closeParenToken"],["callSignature","equalsGreaterThanToken","block","expression"],["parameter","equalsGreaterThanToken","block","expression"],["lessThanToken","type","greaterThanToken","expression"],["expression","openBracketToken","argumentExpression","closeBracketToken"],["functionKeyword","identifier","callSignature","block"],[],["varKeyword","variableDeclarators"],["propertyName","typeAnnotation","equalsValueClause"],["typeArgumentList","openParenToken","arguments","closeParenToken"],["openParenToken","parameters","closeParenToken"],["lessThanToken","typeArguments","greaterThanToken"],["lessThanToken","typeParameters","greaterThanToken"],["extendsOrImplementsKeyword","typeNames"],["extendsOrImplementsKeyword","typeNames"],["equalsToken","value"],["caseKeyword","expression","colonToken","statements"],["defaultKeyword","colonToken","statements"],["elseKeyword","statement"],["catchKeyword","openParenToken","identifier","typeAnnotation","closeParenToken","block"],["finallyKeyword","block"],["identifier","constraint"],["extendsKeyword","typeOrExpression"],["propertyName","colonToken","expression"],["propertyName","callSignature","block"],["dotDotDotToken","modifiers","identifier","questionToken","typeAnnotation","equalsValueClause"],["propertyName","equalsValueClause"],["colonToken","type"],["requireKeyword","openParenToken","stringLiteral","closeParenToken"],["moduleName"],];

    export module Syntax {
        export interface ISyntaxFactory {
            isConcrete: boolean;
            SourceUnitSyntax: { new(data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken): SourceUnitSyntax };
            QualifiedNameSyntax: { new(data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken): QualifiedNameSyntax };
            ObjectTypeSyntax: { new(data: number, openBraceToken: ISyntaxToken, typeMembers: ITypeMemberSyntax[], closeBraceToken: ISyntaxToken): ObjectTypeSyntax };
            FunctionTypeSyntax: { new(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax): FunctionTypeSyntax };
            ArrayTypeSyntax: { new(data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken): ArrayTypeSyntax };
            ConstructorTypeSyntax: { new(data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax): ConstructorTypeSyntax };
            GenericTypeSyntax: { new(data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax): GenericTypeSyntax };
            TypeQuerySyntax: { new(data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax): TypeQuerySyntax };
            InterfaceDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax): InterfaceDeclarationSyntax };
            FunctionDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken): FunctionDeclarationSyntax };
            ModuleDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken): ModuleDeclarationSyntax };
            ClassDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken): ClassDeclarationSyntax };
            EnumDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: EnumElementSyntax[], closeBraceToken: ISyntaxToken): EnumDeclarationSyntax };
            ImportDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken): ImportDeclarationSyntax };
            ExportAssignmentSyntax: { new(data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken): ExportAssignmentSyntax };
            MemberFunctionDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken): MemberFunctionDeclarationSyntax };
            MemberVariableDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken): MemberVariableDeclarationSyntax };
            ConstructorDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken): ConstructorDeclarationSyntax };
            IndexMemberDeclarationSyntax: { new(data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken): IndexMemberDeclarationSyntax };
            GetAccessorSyntax: { new(data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax): GetAccessorSyntax };
            SetAccessorSyntax: { new(data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax): SetAccessorSyntax };
            PropertySignatureSyntax: { new(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax): PropertySignatureSyntax };
            CallSignatureSyntax: { new(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax): CallSignatureSyntax };
            ConstructSignatureSyntax: { new(data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax): ConstructSignatureSyntax };
            IndexSignatureSyntax: { new(data: number, openBracketToken: ISyntaxToken, parameters: ParameterSyntax[], closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax): IndexSignatureSyntax };
            MethodSignatureSyntax: { new(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax): MethodSignatureSyntax };
            BlockSyntax: { new(data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken): BlockSyntax };
            IfStatementSyntax: { new(data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax): IfStatementSyntax };
            VariableStatementSyntax: { new(data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken): VariableStatementSyntax };
            ExpressionStatementSyntax: { new(data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken): ExpressionStatementSyntax };
            ReturnStatementSyntax: { new(data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken): ReturnStatementSyntax };
            SwitchStatementSyntax: { new(data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken): SwitchStatementSyntax };
            BreakStatementSyntax: { new(data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken): BreakStatementSyntax };
            ContinueStatementSyntax: { new(data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken): ContinueStatementSyntax };
            ForStatementSyntax: { new(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax): ForStatementSyntax };
            ForInStatementSyntax: { new(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax): ForInStatementSyntax };
            EmptyStatementSyntax: { new(data: number, semicolonToken: ISyntaxToken): EmptyStatementSyntax };
            ThrowStatementSyntax: { new(data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken): ThrowStatementSyntax };
            WhileStatementSyntax: { new(data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax): WhileStatementSyntax };
            TryStatementSyntax: { new(data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax): TryStatementSyntax };
            LabeledStatementSyntax: { new(data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax): LabeledStatementSyntax };
            DoStatementSyntax: { new(data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken): DoStatementSyntax };
            DebuggerStatementSyntax: { new(data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken): DebuggerStatementSyntax };
            WithStatementSyntax: { new(data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax): WithStatementSyntax };
            PrefixUnaryExpressionSyntax: { new(data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax): PrefixUnaryExpressionSyntax };
            DeleteExpressionSyntax: { new(data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax): DeleteExpressionSyntax };
            TypeOfExpressionSyntax: { new(data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax): TypeOfExpressionSyntax };
            VoidExpressionSyntax: { new(data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax): VoidExpressionSyntax };
            ConditionalExpressionSyntax: { new(data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax): ConditionalExpressionSyntax };
            BinaryExpressionSyntax: { new(data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax): BinaryExpressionSyntax };
            PostfixUnaryExpressionSyntax: { new(data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken): PostfixUnaryExpressionSyntax };
            MemberAccessExpressionSyntax: { new(data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken): MemberAccessExpressionSyntax };
            InvocationExpressionSyntax: { new(data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax): InvocationExpressionSyntax };
            ArrayLiteralExpressionSyntax: { new(data: number, openBracketToken: ISyntaxToken, expressions: IExpressionSyntax[], closeBracketToken: ISyntaxToken): ArrayLiteralExpressionSyntax };
            ObjectLiteralExpressionSyntax: { new(data: number, openBraceToken: ISyntaxToken, propertyAssignments: IPropertyAssignmentSyntax[], closeBraceToken: ISyntaxToken): ObjectLiteralExpressionSyntax };
            ObjectCreationExpressionSyntax: { new(data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax): ObjectCreationExpressionSyntax };
            ParenthesizedExpressionSyntax: { new(data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken): ParenthesizedExpressionSyntax };
            ParenthesizedArrowFunctionExpressionSyntax: { new(data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax): ParenthesizedArrowFunctionExpressionSyntax };
            SimpleArrowFunctionExpressionSyntax: { new(data: number, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax): SimpleArrowFunctionExpressionSyntax };
            CastExpressionSyntax: { new(data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax): CastExpressionSyntax };
            ElementAccessExpressionSyntax: { new(data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken): ElementAccessExpressionSyntax };
            FunctionExpressionSyntax: { new(data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax): FunctionExpressionSyntax };
            OmittedExpressionSyntax: { new(data: number): OmittedExpressionSyntax };
            VariableDeclarationSyntax: { new(data: number, varKeyword: ISyntaxToken, variableDeclarators: VariableDeclaratorSyntax[]): VariableDeclarationSyntax };
            VariableDeclaratorSyntax: { new(data: number, propertyName: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax): VariableDeclaratorSyntax };
            ArgumentListSyntax: { new(data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, arguments: IExpressionSyntax[], closeParenToken: ISyntaxToken): ArgumentListSyntax };
            ParameterListSyntax: { new(data: number, openParenToken: ISyntaxToken, parameters: ParameterSyntax[], closeParenToken: ISyntaxToken): ParameterListSyntax };
            TypeArgumentListSyntax: { new(data: number, lessThanToken: ISyntaxToken, typeArguments: ITypeSyntax[], greaterThanToken: ISyntaxToken): TypeArgumentListSyntax };
            TypeParameterListSyntax: { new(data: number, lessThanToken: ISyntaxToken, typeParameters: TypeParameterSyntax[], greaterThanToken: ISyntaxToken): TypeParameterListSyntax };
            HeritageClauseSyntax: { new(data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: INameSyntax[]): HeritageClauseSyntax };
            EqualsValueClauseSyntax: { new(data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax): EqualsValueClauseSyntax };
            CaseSwitchClauseSyntax: { new(data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]): CaseSwitchClauseSyntax };
            DefaultSwitchClauseSyntax: { new(data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]): DefaultSwitchClauseSyntax };
            ElseClauseSyntax: { new(data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax): ElseClauseSyntax };
            CatchClauseSyntax: { new(data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax): CatchClauseSyntax };
            FinallyClauseSyntax: { new(data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax): FinallyClauseSyntax };
            TypeParameterSyntax: { new(data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax): TypeParameterSyntax };
            ConstraintSyntax: { new(data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken): ConstraintSyntax };
            SimplePropertyAssignmentSyntax: { new(data: number, propertyName: ISyntaxToken, colonToken: ISyntaxToken, expression: IExpressionSyntax): SimplePropertyAssignmentSyntax };
            FunctionPropertyAssignmentSyntax: { new(data: number, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax): FunctionPropertyAssignmentSyntax };
            ParameterSyntax: { new(data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax): ParameterSyntax };
            EnumElementSyntax: { new(data: number, propertyName: ISyntaxToken, equalsValueClause: EqualsValueClauseSyntax): EnumElementSyntax };
            TypeAnnotationSyntax: { new(data: number, colonToken: ISyntaxToken, type: ITypeSyntax): TypeAnnotationSyntax };
            ExternalModuleReferenceSyntax: { new(data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken): ExternalModuleReferenceSyntax };
            ModuleNameModuleReferenceSyntax: { new(data: number, moduleName: INameSyntax): ModuleNameModuleReferenceSyntax };
        }
    }
}