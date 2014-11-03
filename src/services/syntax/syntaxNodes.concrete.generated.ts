///<reference path='references.ts' />

module TypeScript {
    export class SourceUnitSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public syntaxTree: SyntaxTree = undefined;
        public moduleElements: IModuleElementSyntax[];
        public endOfFileToken: ISyntaxToken;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.parent = undefined,
            this.moduleElements = moduleElements,
            this.endOfFileToken = endOfFileToken,
            moduleElements.parent = this,
            endOfFileToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SourceUnit;
        }
    }
    export class QualifiedNameSyntax implements ISyntaxNode, INameSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public left: INameSyntax;
        public dotToken: ISyntaxToken;
        public right: ISyntaxToken;
        public _nameBrand: any; public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.left = left,
            this.dotToken = dotToken,
            this.right = right,
            left.parent = this,
            dotToken.parent = this,
            right.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.QualifiedName;
        }
    }
    export class ObjectTypeSyntax implements ISyntaxNode, ITypeSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public openBraceToken: ISyntaxToken;
        public typeMembers: ISeparatedSyntaxList<ITypeMemberSyntax>;
        public closeBraceToken: ISyntaxToken;
        public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, typeMembers: ISeparatedSyntaxList<ITypeMemberSyntax>, closeBraceToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.openBraceToken = openBraceToken,
            this.typeMembers = typeMembers,
            this.closeBraceToken = closeBraceToken,
            openBraceToken.parent = this,
            typeMembers.parent = this,
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ObjectType;
        }
    }
    export class FunctionTypeSyntax implements ISyntaxNode, ITypeSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
            if (data) { this.__data = data; }
            this.typeParameterList = typeParameterList,
            this.parameterList = parameterList,
            this.equalsGreaterThanToken = equalsGreaterThanToken,
            this.type = type,
            typeParameterList && (typeParameterList.parent = this),
            parameterList.parent = this,
            equalsGreaterThanToken.parent = this,
            type.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FunctionType;
        }
    }
    export class ArrayTypeSyntax implements ISyntaxNode, ITypeSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public type: ITypeSyntax;
        public openBracketToken: ISyntaxToken;
        public closeBracketToken: ISyntaxToken;
        public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.type = type,
            this.openBracketToken = openBracketToken,
            this.closeBracketToken = closeBracketToken,
            type.parent = this,
            openBracketToken.parent = this,
            closeBracketToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ArrayType;
        }
    }
    export class ConstructorTypeSyntax implements ISyntaxNode, ITypeSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public newKeyword: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
            if (data) { this.__data = data; }
            this.newKeyword = newKeyword,
            this.typeParameterList = typeParameterList,
            this.parameterList = parameterList,
            this.equalsGreaterThanToken = equalsGreaterThanToken,
            this.type = type,
            newKeyword.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            parameterList.parent = this,
            equalsGreaterThanToken.parent = this,
            type.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConstructorType;
        }
    }
    export class GenericTypeSyntax implements ISyntaxNode, ITypeSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public name: INameSyntax;
        public typeArgumentList: TypeArgumentListSyntax;
        public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax) {
            if (data) { this.__data = data; }
            this.name = name,
            this.typeArgumentList = typeArgumentList,
            name.parent = this,
            typeArgumentList.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.GenericType;
        }
    }
    export class TypeQuerySyntax implements ISyntaxNode, ITypeSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public typeOfKeyword: ISyntaxToken;
        public name: INameSyntax;
        public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax) {
            if (data) { this.__data = data; }
            this.typeOfKeyword = typeOfKeyword,
            this.name = name,
            typeOfKeyword.parent = this,
            name.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeQuery;
        }
    }
    export class TupleTypeSyntax implements ISyntaxNode, ITypeSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public openBracketToken: ISyntaxToken;
        public types: ISeparatedSyntaxList<ITypeSyntax>;
        public closeBracketToken: ISyntaxToken;
        public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, types: ISeparatedSyntaxList<ITypeSyntax>, closeBracketToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.openBracketToken = openBracketToken,
            this.types = types,
            this.closeBracketToken = closeBracketToken,
            openBracketToken.parent = this,
            types.parent = this,
            closeBracketToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TupleType;
        }
    }
    export class UnionTypeSyntax implements ISyntaxNode, ITypeSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public left: ITypeSyntax;
        public barToken: ISyntaxToken;
        public right: ITypeSyntax;
        public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, left: ITypeSyntax, barToken: ISyntaxToken, right: ITypeSyntax) {
            if (data) { this.__data = data; }
            this.left = left,
            this.barToken = barToken,
            this.right = right,
            left.parent = this,
            barToken.parent = this,
            right.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.UnionType;
        }
    }
    export class ParenthesizedTypeSyntax implements ISyntaxNode, ITypeSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public openParenToken: ISyntaxToken;
        public type: ITypeSyntax;
        public closeParenToken: ISyntaxToken;
        public _typeBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, openParenToken: ISyntaxToken, type: ITypeSyntax, closeParenToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.openParenToken = openParenToken,
            this.type = type,
            this.closeParenToken = closeParenToken,
            openParenToken.parent = this,
            type.parent = this,
            closeParenToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ParenthesizedType;
        }
    }
    export class InterfaceDeclarationSyntax implements ISyntaxNode, IModuleElementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public interfaceKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public body: ObjectTypeSyntax;
        public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.interfaceKeyword = interfaceKeyword,
            this.identifier = identifier,
            this.typeParameterList = typeParameterList,
            this.heritageClauses = heritageClauses,
            this.body = body,
            modifiers.parent = this,
            interfaceKeyword.parent = this,
            identifier.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            heritageClauses.parent = this,
            body.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.InterfaceDeclaration;
        }
    }
    export class FunctionDeclarationSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.functionKeyword = functionKeyword,
            this.identifier = identifier,
            this.callSignature = callSignature,
            this.block = block,
            this.semicolonToken = semicolonToken,
            modifiers.parent = this,
            functionKeyword.parent = this,
            identifier.parent = this,
            callSignature.parent = this,
            block && (block.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FunctionDeclaration;
        }
    }
    export class ModuleDeclarationSyntax implements ISyntaxNode, IModuleElementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public moduleKeyword: ISyntaxToken;
        public name: INameSyntax;
        public stringLiteral: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public moduleElements: IModuleElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.moduleKeyword = moduleKeyword,
            this.name = name,
            this.stringLiteral = stringLiteral,
            this.openBraceToken = openBraceToken,
            this.moduleElements = moduleElements,
            this.closeBraceToken = closeBraceToken,
            modifiers.parent = this,
            moduleKeyword.parent = this,
            name && (name.parent = this),
            stringLiteral && (stringLiteral.parent = this),
            openBraceToken.parent = this,
            moduleElements.parent = this,
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ModuleDeclaration;
        }
    }
    export class ClassDeclarationSyntax implements ISyntaxNode, IModuleElementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public classKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public openBraceToken: ISyntaxToken;
        public classElements: IClassElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.classKeyword = classKeyword,
            this.identifier = identifier,
            this.typeParameterList = typeParameterList,
            this.heritageClauses = heritageClauses,
            this.openBraceToken = openBraceToken,
            this.classElements = classElements,
            this.closeBraceToken = closeBraceToken,
            modifiers.parent = this,
            classKeyword.parent = this,
            identifier.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            heritageClauses.parent = this,
            openBraceToken.parent = this,
            classElements.parent = this,
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ClassDeclaration;
        }
    }
    export class EnumDeclarationSyntax implements ISyntaxNode, IModuleElementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public enumKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public enumElements: ISeparatedSyntaxList<EnumElementSyntax>;
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: ISeparatedSyntaxList<EnumElementSyntax>, closeBraceToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.enumKeyword = enumKeyword,
            this.identifier = identifier,
            this.openBraceToken = openBraceToken,
            this.enumElements = enumElements,
            this.closeBraceToken = closeBraceToken,
            modifiers.parent = this,
            enumKeyword.parent = this,
            identifier.parent = this,
            openBraceToken.parent = this,
            enumElements.parent = this,
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EnumDeclaration;
        }
    }
    export class ImportDeclarationSyntax implements ISyntaxNode, IModuleElementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public importKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public moduleReference: IModuleReferenceSyntax;
        public semicolonToken: ISyntaxToken;
        public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.importKeyword = importKeyword,
            this.identifier = identifier,
            this.equalsToken = equalsToken,
            this.moduleReference = moduleReference,
            this.semicolonToken = semicolonToken,
            modifiers.parent = this,
            importKeyword.parent = this,
            identifier.parent = this,
            equalsToken.parent = this,
            moduleReference.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ImportDeclaration;
        }
    }
    export class ExportAssignmentSyntax implements ISyntaxNode, IModuleElementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public exportKeyword: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.exportKeyword = exportKeyword,
            this.equalsToken = equalsToken,
            this.identifier = identifier,
            this.semicolonToken = semicolonToken,
            exportKeyword.parent = this,
            equalsToken.parent = this,
            identifier.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ExportAssignment;
        }
    }
    export class MemberFunctionDeclarationSyntax implements ISyntaxNode, IMemberDeclarationSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _memberDeclarationBrand: any; public _classElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            this.semicolonToken = semicolonToken,
            modifiers.parent = this,
            propertyName.parent = this,
            callSignature.parent = this,
            block && (block.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MemberFunctionDeclaration;
        }
    }
    export class MemberVariableDeclarationSyntax implements ISyntaxNode, IMemberDeclarationSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public variableDeclarator: VariableDeclaratorSyntax;
        public semicolonToken: ISyntaxToken;
        public _memberDeclarationBrand: any; public _classElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.variableDeclarator = variableDeclarator,
            this.semicolonToken = semicolonToken,
            modifiers.parent = this,
            variableDeclarator.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MemberVariableDeclaration;
        }
    }
    export class ConstructorDeclarationSyntax implements ISyntaxNode, IClassElementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public constructorKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _classElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.constructorKeyword = constructorKeyword,
            this.callSignature = callSignature,
            this.block = block,
            this.semicolonToken = semicolonToken,
            modifiers.parent = this,
            constructorKeyword.parent = this,
            callSignature.parent = this,
            block && (block.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConstructorDeclaration;
        }
    }
    export class IndexMemberDeclarationSyntax implements ISyntaxNode, IClassElementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public indexSignature: IndexSignatureSyntax;
        public semicolonToken: ISyntaxToken;
        public _classElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.indexSignature = indexSignature,
            this.semicolonToken = semicolonToken,
            modifiers.parent = this,
            indexSignature.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.IndexMemberDeclaration;
        }
    }
    export class GetAccessorSyntax implements ISyntaxNode, IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public getKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _memberDeclarationBrand: any; public _propertyAssignmentBrand: any; public _classElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.getKeyword = getKeyword,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            modifiers.parent = this,
            getKeyword.parent = this,
            propertyName.parent = this,
            callSignature.parent = this,
            block.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.GetAccessor;
        }
    }
    export class SetAccessorSyntax implements ISyntaxNode, IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public setKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _memberDeclarationBrand: any; public _propertyAssignmentBrand: any; public _classElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.setKeyword = setKeyword,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            modifiers.parent = this,
            setKeyword.parent = this,
            propertyName.parent = this,
            callSignature.parent = this,
            block.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SetAccessor;
        }
    }
    export class PropertySignatureSyntax implements ISyntaxNode, ITypeMemberSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
            if (data) { this.__data = data; }
            this.propertyName = propertyName,
            this.questionToken = questionToken,
            this.typeAnnotation = typeAnnotation,
            propertyName.parent = this,
            questionToken && (questionToken.parent = this),
            typeAnnotation && (typeAnnotation.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.PropertySignature;
        }
    }
    export class CallSignatureSyntax implements ISyntaxNode, ITypeMemberSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax) {
            if (data) { this.__data = data; }
            this.typeParameterList = typeParameterList,
            this.parameterList = parameterList,
            this.typeAnnotation = typeAnnotation,
            typeParameterList && (typeParameterList.parent = this),
            parameterList.parent = this,
            typeAnnotation && (typeAnnotation.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.CallSignature;
        }
    }
    export class ConstructSignatureSyntax implements ISyntaxNode, ITypeMemberSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public newKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _typeMemberBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax) {
            if (data) { this.__data = data; }
            this.newKeyword = newKeyword,
            this.callSignature = callSignature,
            newKeyword.parent = this,
            callSignature.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConstructSignature;
        }
    }
    export class IndexSignatureSyntax implements ISyntaxNode, ITypeMemberSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public openBracketToken: ISyntaxToken;
        public parameters: ISeparatedSyntaxList<ParameterSyntax>;
        public closeBracketToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
            if (data) { this.__data = data; }
            this.openBracketToken = openBracketToken,
            this.parameters = parameters,
            this.closeBracketToken = closeBracketToken,
            this.typeAnnotation = typeAnnotation,
            openBracketToken.parent = this,
            parameters.parent = this,
            closeBracketToken.parent = this,
            typeAnnotation && (typeAnnotation.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.IndexSignature;
        }
    }
    export class MethodSignatureSyntax implements ISyntaxNode, ITypeMemberSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _typeMemberBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax) {
            if (data) { this.__data = data; }
            this.propertyName = propertyName,
            this.questionToken = questionToken,
            this.callSignature = callSignature,
            propertyName.parent = this,
            questionToken && (questionToken.parent = this),
            callSignature.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MethodSignature;
        }
    }
    export class BlockSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public openBraceToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.openBraceToken = openBraceToken,
            this.statements = statements,
            this.closeBraceToken = closeBraceToken,
            openBraceToken.parent = this,
            statements.parent = this,
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.Block;
        }
    }
    export class IfStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public ifKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public elseClause: ElseClauseSyntax;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax) {
            if (data) { this.__data = data; }
            this.ifKeyword = ifKeyword,
            this.openParenToken = openParenToken,
            this.condition = condition,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            this.elseClause = elseClause,
            ifKeyword.parent = this,
            openParenToken.parent = this,
            condition.parent = this,
            closeParenToken.parent = this,
            statement.parent = this,
            elseClause && (elseClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.IfStatement;
        }
    }
    export class VariableStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public modifiers: ISyntaxToken[];
        public variableDeclaration: VariableDeclarationSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.modifiers = modifiers,
            this.variableDeclaration = variableDeclaration,
            this.semicolonToken = semicolonToken,
            modifiers.parent = this,
            variableDeclaration.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VariableStatement;
        }
    }
    export class ExpressionStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.expression = expression,
            this.semicolonToken = semicolonToken,
            expression.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ExpressionStatement;
        }
    }
    export class ReturnStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public returnKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.returnKeyword = returnKeyword,
            this.expression = expression,
            this.semicolonToken = semicolonToken,
            returnKeyword.parent = this,
            expression && (expression.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ReturnStatement;
        }
    }
    export class SwitchStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public switchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public switchClauses: ISwitchClauseSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.switchKeyword = switchKeyword,
            this.openParenToken = openParenToken,
            this.expression = expression,
            this.closeParenToken = closeParenToken,
            this.openBraceToken = openBraceToken,
            this.switchClauses = switchClauses,
            this.closeBraceToken = closeBraceToken,
            switchKeyword.parent = this,
            openParenToken.parent = this,
            expression.parent = this,
            closeParenToken.parent = this,
            openBraceToken.parent = this,
            switchClauses.parent = this,
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SwitchStatement;
        }
    }
    export class BreakStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public breakKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.breakKeyword = breakKeyword,
            this.identifier = identifier,
            this.semicolonToken = semicolonToken,
            breakKeyword.parent = this,
            identifier && (identifier.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.BreakStatement;
        }
    }
    export class ContinueStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public continueKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.continueKeyword = continueKeyword,
            this.identifier = identifier,
            this.semicolonToken = semicolonToken,
            continueKeyword.parent = this,
            identifier && (identifier.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ContinueStatement;
        }
    }
    export class ForStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public forKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public variableDeclaration: VariableDeclarationSyntax;
        public initializer: IExpressionSyntax;
        public firstSemicolonToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public secondSemicolonToken: ISyntaxToken;
        public incrementor: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            if (data) { this.__data = data; }
            this.forKeyword = forKeyword,
            this.openParenToken = openParenToken,
            this.variableDeclaration = variableDeclaration,
            this.initializer = initializer,
            this.firstSemicolonToken = firstSemicolonToken,
            this.condition = condition,
            this.secondSemicolonToken = secondSemicolonToken,
            this.incrementor = incrementor,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            forKeyword.parent = this,
            openParenToken.parent = this,
            variableDeclaration && (variableDeclaration.parent = this),
            initializer && (initializer.parent = this),
            firstSemicolonToken.parent = this,
            condition && (condition.parent = this),
            secondSemicolonToken.parent = this,
            incrementor && (incrementor.parent = this),
            closeParenToken.parent = this,
            statement.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ForStatement;
        }
    }
    export class ForInStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public forKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public variableDeclaration: VariableDeclarationSyntax;
        public left: IExpressionSyntax;
        public inKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            if (data) { this.__data = data; }
            this.forKeyword = forKeyword,
            this.openParenToken = openParenToken,
            this.variableDeclaration = variableDeclaration,
            this.left = left,
            this.inKeyword = inKeyword,
            this.expression = expression,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            forKeyword.parent = this,
            openParenToken.parent = this,
            variableDeclaration && (variableDeclaration.parent = this),
            left && (left.parent = this),
            inKeyword.parent = this,
            expression.parent = this,
            closeParenToken.parent = this,
            statement.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ForInStatement;
        }
    }
    export class EmptyStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.semicolonToken = semicolonToken,
            semicolonToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EmptyStatement;
        }
    }
    export class ThrowStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public throwKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.throwKeyword = throwKeyword,
            this.expression = expression,
            this.semicolonToken = semicolonToken,
            throwKeyword.parent = this,
            expression.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ThrowStatement;
        }
    }
    export class WhileStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            if (data) { this.__data = data; }
            this.whileKeyword = whileKeyword,
            this.openParenToken = openParenToken,
            this.condition = condition,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            whileKeyword.parent = this,
            openParenToken.parent = this,
            condition.parent = this,
            closeParenToken.parent = this,
            statement.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.WhileStatement;
        }
    }
    export class TryStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public tryKeyword: ISyntaxToken;
        public block: BlockSyntax;
        public catchClause: CatchClauseSyntax;
        public finallyClause: FinallyClauseSyntax;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax) {
            if (data) { this.__data = data; }
            this.tryKeyword = tryKeyword,
            this.block = block,
            this.catchClause = catchClause,
            this.finallyClause = finallyClause,
            tryKeyword.parent = this,
            block.parent = this,
            catchClause && (catchClause.parent = this),
            finallyClause && (finallyClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TryStatement;
        }
    }
    export class LabeledStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public identifier: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax) {
            if (data) { this.__data = data; }
            this.identifier = identifier,
            this.colonToken = colonToken,
            this.statement = statement,
            identifier.parent = this,
            colonToken.parent = this,
            statement.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.LabeledStatement;
        }
    }
    export class DoStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public doKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.doKeyword = doKeyword,
            this.statement = statement,
            this.whileKeyword = whileKeyword,
            this.openParenToken = openParenToken,
            this.condition = condition,
            this.closeParenToken = closeParenToken,
            this.semicolonToken = semicolonToken,
            doKeyword.parent = this,
            statement.parent = this,
            whileKeyword.parent = this,
            openParenToken.parent = this,
            condition.parent = this,
            closeParenToken.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DoStatement;
        }
    }
    export class DebuggerStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public debuggerKeyword: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.debuggerKeyword = debuggerKeyword,
            this.semicolonToken = semicolonToken,
            debuggerKeyword.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DebuggerStatement;
        }
    }
    export class WithStatementSyntax implements ISyntaxNode, IStatementSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public withKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            if (data) { this.__data = data; }
            this.withKeyword = withKeyword,
            this.openParenToken = openParenToken,
            this.condition = condition,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            withKeyword.parent = this,
            openParenToken.parent = this,
            condition.parent = this,
            closeParenToken.parent = this,
            statement.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.WithStatement;
        }
    }
    export class PrefixUnaryExpressionSyntax implements ISyntaxNode, IUnaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public operatorToken: ISyntaxToken;
        public operand: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax) {
            if (data) { this.__data = data; }
            this.operatorToken = operatorToken,
            this.operand = operand,
            operatorToken.parent = this,
            operand.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.PrefixUnaryExpression;
        }
    }
    export class DeleteExpressionSyntax implements ISyntaxNode, IUnaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public deleteKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            if (data) { this.__data = data; }
            this.deleteKeyword = deleteKeyword,
            this.expression = expression,
            deleteKeyword.parent = this,
            expression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DeleteExpression;
        }
    }
    export class TypeOfExpressionSyntax implements ISyntaxNode, IUnaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public typeOfKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            if (data) { this.__data = data; }
            this.typeOfKeyword = typeOfKeyword,
            this.expression = expression,
            typeOfKeyword.parent = this,
            expression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeOfExpression;
        }
    }
    export class VoidExpressionSyntax implements ISyntaxNode, IUnaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public voidKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            if (data) { this.__data = data; }
            this.voidKeyword = voidKeyword,
            this.expression = expression,
            voidKeyword.parent = this,
            expression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VoidExpression;
        }
    }
    export class ConditionalExpressionSyntax implements ISyntaxNode, IExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public condition: IExpressionSyntax;
        public questionToken: ISyntaxToken;
        public whenTrue: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public whenFalse: IExpressionSyntax;
        public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax) {
            if (data) { this.__data = data; }
            this.condition = condition,
            this.questionToken = questionToken,
            this.whenTrue = whenTrue,
            this.colonToken = colonToken,
            this.whenFalse = whenFalse,
            condition.parent = this,
            questionToken.parent = this,
            whenTrue.parent = this,
            colonToken.parent = this,
            whenFalse.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConditionalExpression;
        }
    }
    export class BinaryExpressionSyntax implements ISyntaxNode, IExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public left: IExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public right: IExpressionSyntax;
        public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax) {
            if (data) { this.__data = data; }
            this.left = left,
            this.operatorToken = operatorToken,
            this.right = right,
            left.parent = this,
            operatorToken.parent = this,
            right.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.BinaryExpression;
        }
    }
    export class PostfixUnaryExpressionSyntax implements ISyntaxNode, IPostfixExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public operand: ILeftHandSideExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.operand = operand,
            this.operatorToken = operatorToken,
            operand.parent = this,
            operatorToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.PostfixUnaryExpression;
        }
    }
    export class MemberAccessExpressionSyntax implements ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public expression: ILeftHandSideExpressionSyntax;
        public dotToken: ISyntaxToken;
        public name: ISyntaxToken;
        public _memberExpressionBrand: any; public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.expression = expression,
            this.dotToken = dotToken,
            this.name = name,
            expression.parent = this,
            dotToken.parent = this,
            name.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MemberAccessExpression;
        }
    }
    export class InvocationExpressionSyntax implements ISyntaxNode, ICallExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public expression: ILeftHandSideExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax) {
            if (data) { this.__data = data; }
            this.expression = expression,
            this.argumentList = argumentList,
            expression.parent = this,
            argumentList.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.InvocationExpression;
        }
    }
    export class ArrayLiteralExpressionSyntax implements ISyntaxNode, IPrimaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public openBracketToken: ISyntaxToken;
        public expressions: ISeparatedSyntaxList<IExpressionSyntax>;
        public closeBracketToken: ISyntaxToken;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, expressions: ISeparatedSyntaxList<IExpressionSyntax>, closeBracketToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.openBracketToken = openBracketToken,
            this.expressions = expressions,
            this.closeBracketToken = closeBracketToken,
            openBracketToken.parent = this,
            expressions.parent = this,
            closeBracketToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ArrayLiteralExpression;
        }
    }
    export class ObjectLiteralExpressionSyntax implements ISyntaxNode, IPrimaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public openBraceToken: ISyntaxToken;
        public propertyAssignments: ISeparatedSyntaxList<IPropertyAssignmentSyntax>;
        public closeBraceToken: ISyntaxToken;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, propertyAssignments: ISeparatedSyntaxList<IPropertyAssignmentSyntax>, closeBraceToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.openBraceToken = openBraceToken,
            this.propertyAssignments = propertyAssignments,
            this.closeBraceToken = closeBraceToken,
            openBraceToken.parent = this,
            propertyAssignments.parent = this,
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ObjectLiteralExpression;
        }
    }
    export class ObjectCreationExpressionSyntax implements ISyntaxNode, IPrimaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public newKeyword: ISyntaxToken;
        public expression: IMemberExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax) {
            if (data) { this.__data = data; }
            this.newKeyword = newKeyword,
            this.expression = expression,
            this.argumentList = argumentList,
            newKeyword.parent = this,
            expression.parent = this,
            argumentList && (argumentList.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ObjectCreationExpression;
        }
    }
    export class ParenthesizedExpressionSyntax implements ISyntaxNode, IPrimaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.openParenToken = openParenToken,
            this.expression = expression,
            this.closeParenToken = closeParenToken,
            openParenToken.parent = this,
            expression.parent = this,
            closeParenToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ParenthesizedExpression;
        }
    }
    export class ParenthesizedArrowFunctionExpressionSyntax implements ISyntaxNode, IUnaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public callSignature: CallSignatureSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
            if (data) { this.__data = data; }
            this.callSignature = callSignature,
            this.equalsGreaterThanToken = equalsGreaterThanToken,
            this.block = block,
            this.expression = expression,
            callSignature.parent = this,
            equalsGreaterThanToken.parent = this,
            block && (block.parent = this),
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ParenthesizedArrowFunctionExpression;
        }
    }
    export class SimpleArrowFunctionExpressionSyntax implements ISyntaxNode, IUnaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public parameter: ParameterSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
            if (data) { this.__data = data; }
            this.parameter = parameter,
            this.equalsGreaterThanToken = equalsGreaterThanToken,
            this.block = block,
            this.expression = expression,
            parameter.parent = this,
            equalsGreaterThanToken.parent = this,
            block && (block.parent = this),
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SimpleArrowFunctionExpression;
        }
    }
    export class CastExpressionSyntax implements ISyntaxNode, IUnaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public lessThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public greaterThanToken: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            if (data) { this.__data = data; }
            this.lessThanToken = lessThanToken,
            this.type = type,
            this.greaterThanToken = greaterThanToken,
            this.expression = expression,
            lessThanToken.parent = this,
            type.parent = this,
            greaterThanToken.parent = this,
            expression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.CastExpression;
        }
    }
    export class ElementAccessExpressionSyntax implements ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public expression: ILeftHandSideExpressionSyntax;
        public openBracketToken: ISyntaxToken;
        public argumentExpression: IExpressionSyntax;
        public closeBracketToken: ISyntaxToken;
        public _memberExpressionBrand: any; public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.expression = expression,
            this.openBracketToken = openBracketToken,
            this.argumentExpression = argumentExpression,
            this.closeBracketToken = closeBracketToken,
            expression.parent = this,
            openBracketToken.parent = this,
            argumentExpression.parent = this,
            closeBracketToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ElementAccessExpression;
        }
    }
    export class FunctionExpressionSyntax implements ISyntaxNode, IPrimaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            if (data) { this.__data = data; }
            this.functionKeyword = functionKeyword,
            this.identifier = identifier,
            this.callSignature = callSignature,
            this.block = block,
            functionKeyword.parent = this,
            identifier && (identifier.parent = this),
            callSignature.parent = this,
            block.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FunctionExpression;
        }
    }
    export class OmittedExpressionSyntax implements ISyntaxNode, IExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number) {
            if (data) { this.__data = data; }
        }

        public kind(): SyntaxKind {
            return SyntaxKind.OmittedExpression;
        }
    }
    export class TemplateExpressionSyntax implements ISyntaxNode, IPrimaryExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public templateStartToken: ISyntaxToken;
        public templateClauses: TemplateClauseSyntax[];
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, templateStartToken: ISyntaxToken, templateClauses: TemplateClauseSyntax[]) {
            if (data) { this.__data = data; }
            this.templateStartToken = templateStartToken,
            this.templateClauses = templateClauses,
            templateStartToken.parent = this,
            templateClauses.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TemplateExpression;
        }
    }
    export class TemplateAccessExpressionSyntax implements ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public expression: ILeftHandSideExpressionSyntax;
        public templateExpression: IPrimaryExpressionSyntax;
        public _memberExpressionBrand: any; public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, templateExpression: IPrimaryExpressionSyntax) {
            if (data) { this.__data = data; }
            this.expression = expression,
            this.templateExpression = templateExpression,
            expression.parent = this,
            templateExpression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TemplateAccessExpression;
        }
    }
    export class VariableDeclarationSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public varKeyword: ISyntaxToken;
        public variableDeclarators: ISeparatedSyntaxList<VariableDeclaratorSyntax>;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, varKeyword: ISyntaxToken, variableDeclarators: ISeparatedSyntaxList<VariableDeclaratorSyntax>) {
            if (data) { this.__data = data; }
            this.varKeyword = varKeyword,
            this.variableDeclarators = variableDeclarators,
            varKeyword.parent = this,
            variableDeclarators.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VariableDeclaration;
        }
    }
    export class VariableDeclaratorSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public propertyName: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
            if (data) { this.__data = data; }
            this.propertyName = propertyName,
            this.typeAnnotation = typeAnnotation,
            this.equalsValueClause = equalsValueClause,
            propertyName.parent = this,
            typeAnnotation && (typeAnnotation.parent = this),
            equalsValueClause && (equalsValueClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VariableDeclarator;
        }
    }
    export class ArgumentListSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public typeArgumentList: TypeArgumentListSyntax;
        public openParenToken: ISyntaxToken;
        public arguments: ISeparatedSyntaxList<IExpressionSyntax>;
        public closeParenToken: ISyntaxToken;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, _arguments: ISeparatedSyntaxList<IExpressionSyntax>, closeParenToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.typeArgumentList = typeArgumentList,
            this.openParenToken = openParenToken,
            this.arguments = _arguments,
            this.closeParenToken = closeParenToken,
            typeArgumentList && (typeArgumentList.parent = this),
            openParenToken.parent = this,
            _arguments.parent = this,
            closeParenToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ArgumentList;
        }
    }
    export class ParameterListSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public openParenToken: ISyntaxToken;
        public parameters: ISeparatedSyntaxList<ParameterSyntax>;
        public closeParenToken: ISyntaxToken;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, openParenToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeParenToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.openParenToken = openParenToken,
            this.parameters = parameters,
            this.closeParenToken = closeParenToken,
            openParenToken.parent = this,
            parameters.parent = this,
            closeParenToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ParameterList;
        }
    }
    export class TypeArgumentListSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public lessThanToken: ISyntaxToken;
        public typeArguments: ISeparatedSyntaxList<ITypeSyntax>;
        public greaterThanToken: ISyntaxToken;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, lessThanToken: ISyntaxToken, typeArguments: ISeparatedSyntaxList<ITypeSyntax>, greaterThanToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.lessThanToken = lessThanToken,
            this.typeArguments = typeArguments,
            this.greaterThanToken = greaterThanToken,
            lessThanToken.parent = this,
            typeArguments.parent = this,
            greaterThanToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeArgumentList;
        }
    }
    export class TypeParameterListSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public lessThanToken: ISyntaxToken;
        public typeParameters: ISeparatedSyntaxList<TypeParameterSyntax>;
        public greaterThanToken: ISyntaxToken;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, lessThanToken: ISyntaxToken, typeParameters: ISeparatedSyntaxList<TypeParameterSyntax>, greaterThanToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.lessThanToken = lessThanToken,
            this.typeParameters = typeParameters,
            this.greaterThanToken = greaterThanToken,
            lessThanToken.parent = this,
            typeParameters.parent = this,
            greaterThanToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeParameterList;
        }
    }
    export class HeritageClauseSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public extendsOrImplementsKeyword: ISyntaxToken;
        public typeNames: ISeparatedSyntaxList<INameSyntax>;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: ISeparatedSyntaxList<INameSyntax>) {
            if (data) { this.__data = data; }
            this.extendsOrImplementsKeyword = extendsOrImplementsKeyword,
            this.typeNames = typeNames,
            extendsOrImplementsKeyword.parent = this,
            typeNames.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.HeritageClause;
        }
    }
    export class EqualsValueClauseSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public equalsToken: ISyntaxToken;
        public value: IExpressionSyntax;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax) {
            if (data) { this.__data = data; }
            this.equalsToken = equalsToken,
            this.value = value,
            equalsToken.parent = this,
            value.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EqualsValueClause;
        }
    }
    export class CaseSwitchClauseSyntax implements ISyntaxNode, ISwitchClauseSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public caseKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _switchClauseBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
            if (data) { this.__data = data; }
            this.caseKeyword = caseKeyword,
            this.expression = expression,
            this.colonToken = colonToken,
            this.statements = statements,
            caseKeyword.parent = this,
            expression.parent = this,
            colonToken.parent = this,
            statements.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.CaseSwitchClause;
        }
    }
    export class DefaultSwitchClauseSyntax implements ISyntaxNode, ISwitchClauseSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public defaultKeyword: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _switchClauseBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
            if (data) { this.__data = data; }
            this.defaultKeyword = defaultKeyword,
            this.colonToken = colonToken,
            this.statements = statements,
            defaultKeyword.parent = this,
            colonToken.parent = this,
            statements.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DefaultSwitchClause;
        }
    }
    export class ElseClauseSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public elseKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax) {
            if (data) { this.__data = data; }
            this.elseKeyword = elseKeyword,
            this.statement = statement,
            elseKeyword.parent = this,
            statement.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ElseClause;
        }
    }
    export class CatchClauseSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public catchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public closeParenToken: ISyntaxToken;
        public block: BlockSyntax;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax) {
            if (data) { this.__data = data; }
            this.catchKeyword = catchKeyword,
            this.openParenToken = openParenToken,
            this.identifier = identifier,
            this.typeAnnotation = typeAnnotation,
            this.closeParenToken = closeParenToken,
            this.block = block,
            catchKeyword.parent = this,
            openParenToken.parent = this,
            identifier.parent = this,
            typeAnnotation && (typeAnnotation.parent = this),
            closeParenToken.parent = this,
            block.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.CatchClause;
        }
    }
    export class FinallyClauseSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public finallyKeyword: ISyntaxToken;
        public block: BlockSyntax;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax) {
            if (data) { this.__data = data; }
            this.finallyKeyword = finallyKeyword,
            this.block = block,
            finallyKeyword.parent = this,
            block.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FinallyClause;
        }
    }
    export class TemplateClauseSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public expression: IExpressionSyntax;
        public templateMiddleOrEndToken: ISyntaxToken;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, expression: IExpressionSyntax, templateMiddleOrEndToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.expression = expression,
            this.templateMiddleOrEndToken = templateMiddleOrEndToken,
            expression.parent = this,
            templateMiddleOrEndToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TemplateClause;
        }
    }
    export class TypeParameterSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public identifier: ISyntaxToken;
        public constraint: ConstraintSyntax;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax) {
            if (data) { this.__data = data; }
            this.identifier = identifier,
            this.constraint = constraint,
            identifier.parent = this,
            constraint && (constraint.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeParameter;
        }
    }
    export class ConstraintSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public extendsKeyword: ISyntaxToken;
        public typeOrExpression: ISyntaxNodeOrToken;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken) {
            if (data) { this.__data = data; }
            this.extendsKeyword = extendsKeyword,
            this.typeOrExpression = typeOrExpression,
            extendsKeyword.parent = this,
            typeOrExpression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.Constraint;
        }
    }
    export class SimplePropertyAssignmentSyntax implements ISyntaxNode, IPropertyAssignmentSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public propertyName: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public _propertyAssignmentBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, colonToken: ISyntaxToken, expression: IExpressionSyntax) {
            if (data) { this.__data = data; }
            this.propertyName = propertyName,
            this.colonToken = colonToken,
            this.expression = expression,
            propertyName.parent = this,
            colonToken.parent = this,
            expression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SimplePropertyAssignment;
        }
    }
    export class FunctionPropertyAssignmentSyntax implements ISyntaxNode, IPropertyAssignmentSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _propertyAssignmentBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            if (data) { this.__data = data; }
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            propertyName.parent = this,
            callSignature.parent = this,
            block.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FunctionPropertyAssignment;
        }
    }
    export class ParameterSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public dotDotDotToken: ISyntaxToken;
        public modifiers: ISyntaxToken[];
        public identifier: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
            if (data) { this.__data = data; }
            this.dotDotDotToken = dotDotDotToken,
            this.modifiers = modifiers,
            this.identifier = identifier,
            this.questionToken = questionToken,
            this.typeAnnotation = typeAnnotation,
            this.equalsValueClause = equalsValueClause,
            dotDotDotToken && (dotDotDotToken.parent = this),
            modifiers.parent = this,
            identifier.parent = this,
            questionToken && (questionToken.parent = this),
            typeAnnotation && (typeAnnotation.parent = this),
            equalsValueClause && (equalsValueClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.Parameter;
        }
    }
    export class EnumElementSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public propertyName: ISyntaxToken;
        public equalsValueClause: EqualsValueClauseSyntax;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, equalsValueClause: EqualsValueClauseSyntax) {
            if (data) { this.__data = data; }
            this.propertyName = propertyName,
            this.equalsValueClause = equalsValueClause,
            propertyName.parent = this,
            equalsValueClause && (equalsValueClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EnumElement;
        }
    }
    export class TypeAnnotationSyntax implements ISyntaxNode {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public colonToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, colonToken: ISyntaxToken, type: ITypeSyntax) {
            if (data) { this.__data = data; }
            this.colonToken = colonToken,
            this.type = type,
            colonToken.parent = this,
            type.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeAnnotation;
        }
    }
    export class ExternalModuleReferenceSyntax implements ISyntaxNode, IModuleReferenceSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public requireKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public stringLiteral: ISyntaxToken;
        public closeParenToken: ISyntaxToken;
        public _moduleReferenceBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken) {
            if (data) { this.__data = data; }
            this.requireKeyword = requireKeyword,
            this.openParenToken = openParenToken,
            this.stringLiteral = stringLiteral,
            this.closeParenToken = closeParenToken,
            requireKeyword.parent = this,
            openParenToken.parent = this,
            stringLiteral.parent = this,
            closeParenToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ExternalModuleReference;
        }
    }
    export class ModuleNameModuleReferenceSyntax implements ISyntaxNode, IModuleReferenceSyntax {
        public __data: number; public __cachedTokens: ISyntaxToken[]; public parent: ISyntaxElement;
        public moduleName: INameSyntax;
        public _moduleReferenceBrand: any; public _syntaxNodeOrTokenBrand: any;
        constructor(data: number, moduleName: INameSyntax) {
            if (data) { this.__data = data; }
            this.moduleName = moduleName,
            moduleName.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ModuleNameModuleReference;
        }
    }
}