///<reference path='references.ts' />

module TypeScript.Syntax.Concrete {
    // Inject this module as the factory for producing syntax nodes in the parser.
    Parser.syntaxFactory = Concrete;
    export var isConcrete: boolean = true;

    export class SourceUnitSyntax extends SyntaxNode {
        public syntaxTree: SyntaxTree = undefined;
        public moduleElements: IModuleElementSyntax[];
        public endOfFileToken: ISyntaxToken;
        constructor(data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken) {
            super(data);
            this.parent = undefined,
            this.moduleElements = moduleElements,
            this.endOfFileToken = endOfFileToken,
            !isShared(moduleElements) && (moduleElements.parent = this),
            endOfFileToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SourceUnit;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.moduleElements;
                case 1: return this.endOfFileToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitSourceUnit(this);
        }
    }
    export class QualifiedNameSyntax extends SyntaxNode implements INameSyntax {
        public left: INameSyntax;
        public dotToken: ISyntaxToken;
        public right: ISyntaxToken;
        public _nameBrand: any; public _typeBrand: any;
        constructor(data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.left;
                case 1: return this.dotToken;
                case 2: return this.right;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitQualifiedName(this);
        }
    }
    export class ObjectTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public openBraceToken: ISyntaxToken;
        public typeMembers: ISeparatedSyntaxList<ITypeMemberSyntax>;
        public closeBraceToken: ISyntaxToken;
        public _typeBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, typeMembers: ISeparatedSyntaxList<ITypeMemberSyntax>, closeBraceToken: ISyntaxToken) {
            super(data);
            this.openBraceToken = openBraceToken,
            this.typeMembers = typeMembers,
            this.closeBraceToken = closeBraceToken,
            openBraceToken.parent = this,
            !isShared(typeMembers) && (typeMembers.parent = this),
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ObjectType;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.openBraceToken;
                case 1: return this.typeMembers;
                case 2: return this.closeBraceToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitObjectType(this);
        }
    }
    export class FunctionTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _typeBrand: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
            super(data);
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

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.typeParameterList;
                case 1: return this.parameterList;
                case 2: return this.equalsGreaterThanToken;
                case 3: return this.type;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitFunctionType(this);
        }
    }
    export class ArrayTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public type: ITypeSyntax;
        public openBracketToken: ISyntaxToken;
        public closeBracketToken: ISyntaxToken;
        public _typeBrand: any;
        constructor(data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.type;
                case 1: return this.openBracketToken;
                case 2: return this.closeBracketToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitArrayType(this);
        }
    }
    export class ConstructorTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public newKeyword: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _typeBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
            super(data);
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

        public childCount(): number {
            return 5;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.newKeyword;
                case 1: return this.typeParameterList;
                case 2: return this.parameterList;
                case 3: return this.equalsGreaterThanToken;
                case 4: return this.type;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitConstructorType(this);
        }
    }
    export class GenericTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public name: INameSyntax;
        public typeArgumentList: TypeArgumentListSyntax;
        public _typeBrand: any;
        constructor(data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax) {
            super(data);
            this.name = name,
            this.typeArgumentList = typeArgumentList,
            name.parent = this,
            typeArgumentList.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.GenericType;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.name;
                case 1: return this.typeArgumentList;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitGenericType(this);
        }
    }
    export class TypeQuerySyntax extends SyntaxNode implements ITypeSyntax {
        public typeOfKeyword: ISyntaxToken;
        public name: INameSyntax;
        public _typeBrand: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax) {
            super(data);
            this.typeOfKeyword = typeOfKeyword,
            this.name = name,
            typeOfKeyword.parent = this,
            name.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeQuery;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.typeOfKeyword;
                case 1: return this.name;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitTypeQuery(this);
        }
    }
    export class TupleTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public openBracketToken: ISyntaxToken;
        public types: ISeparatedSyntaxList<ITypeSyntax>;
        public closeBracketToken: ISyntaxToken;
        public _typeBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, types: ISeparatedSyntaxList<ITypeSyntax>, closeBracketToken: ISyntaxToken) {
            super(data);
            this.openBracketToken = openBracketToken,
            this.types = types,
            this.closeBracketToken = closeBracketToken,
            openBracketToken.parent = this,
            !isShared(types) && (types.parent = this),
            closeBracketToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TupleType;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.openBracketToken;
                case 1: return this.types;
                case 2: return this.closeBracketToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitTupleType(this);
        }
    }
    export class UnionTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public left: ITypeSyntax;
        public barToken: ISyntaxToken;
        public right: ITypeSyntax;
        public _typeBrand: any;
        constructor(data: number, left: ITypeSyntax, barToken: ISyntaxToken, right: ITypeSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.left;
                case 1: return this.barToken;
                case 2: return this.right;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitUnionType(this);
        }
    }
    export class ParenthesizedTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public openParenToken: ISyntaxToken;
        public type: ITypeSyntax;
        public closeParenToken: ISyntaxToken;
        public _typeBrand: any;
        constructor(data: number, openParenToken: ISyntaxToken, type: ITypeSyntax, closeParenToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.openParenToken;
                case 1: return this.type;
                case 2: return this.closeParenToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitParenthesizedType(this);
        }
    }
    export class InterfaceDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public interfaceKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public body: ObjectTypeSyntax;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax) {
            super(data);
            this.modifiers = modifiers,
            this.interfaceKeyword = interfaceKeyword,
            this.identifier = identifier,
            this.typeParameterList = typeParameterList,
            this.heritageClauses = heritageClauses,
            this.body = body,
            !isShared(modifiers) && (modifiers.parent = this),
            interfaceKeyword.parent = this,
            identifier.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            !isShared(heritageClauses) && (heritageClauses.parent = this),
            body.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.InterfaceDeclaration;
        }

        public childCount(): number {
            return 6;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.interfaceKeyword;
                case 2: return this.identifier;
                case 3: return this.typeParameterList;
                case 4: return this.heritageClauses;
                case 5: return this.body;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitInterfaceDeclaration(this);
        }
    }
    export class FunctionDeclarationSyntax extends SyntaxNode implements IStatementSyntax {
        public modifiers: ISyntaxToken[];
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.functionKeyword = functionKeyword,
            this.identifier = identifier,
            this.callSignature = callSignature,
            this.block = block,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            functionKeyword.parent = this,
            identifier.parent = this,
            callSignature.parent = this,
            block && (block.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FunctionDeclaration;
        }

        public childCount(): number {
            return 6;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.functionKeyword;
                case 2: return this.identifier;
                case 3: return this.callSignature;
                case 4: return this.block;
                case 5: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitFunctionDeclaration(this);
        }
    }
    export class ModuleDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public moduleKeyword: ISyntaxToken;
        public name: INameSyntax;
        public stringLiteral: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public moduleElements: IModuleElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.moduleKeyword = moduleKeyword,
            this.name = name,
            this.stringLiteral = stringLiteral,
            this.openBraceToken = openBraceToken,
            this.moduleElements = moduleElements,
            this.closeBraceToken = closeBraceToken,
            !isShared(modifiers) && (modifiers.parent = this),
            moduleKeyword.parent = this,
            name && (name.parent = this),
            stringLiteral && (stringLiteral.parent = this),
            openBraceToken.parent = this,
            !isShared(moduleElements) && (moduleElements.parent = this),
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ModuleDeclaration;
        }

        public childCount(): number {
            return 7;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.moduleKeyword;
                case 2: return this.name;
                case 3: return this.stringLiteral;
                case 4: return this.openBraceToken;
                case 5: return this.moduleElements;
                case 6: return this.closeBraceToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitModuleDeclaration(this);
        }
    }
    export class ClassDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public classKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public openBraceToken: ISyntaxToken;
        public classElements: IClassElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.classKeyword = classKeyword,
            this.identifier = identifier,
            this.typeParameterList = typeParameterList,
            this.heritageClauses = heritageClauses,
            this.openBraceToken = openBraceToken,
            this.classElements = classElements,
            this.closeBraceToken = closeBraceToken,
            !isShared(modifiers) && (modifiers.parent = this),
            classKeyword.parent = this,
            identifier.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            !isShared(heritageClauses) && (heritageClauses.parent = this),
            openBraceToken.parent = this,
            !isShared(classElements) && (classElements.parent = this),
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ClassDeclaration;
        }

        public childCount(): number {
            return 8;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.classKeyword;
                case 2: return this.identifier;
                case 3: return this.typeParameterList;
                case 4: return this.heritageClauses;
                case 5: return this.openBraceToken;
                case 6: return this.classElements;
                case 7: return this.closeBraceToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitClassDeclaration(this);
        }
    }
    export class EnumDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public enumKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public enumElements: ISeparatedSyntaxList<EnumElementSyntax>;
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: ISeparatedSyntaxList<EnumElementSyntax>, closeBraceToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.enumKeyword = enumKeyword,
            this.identifier = identifier,
            this.openBraceToken = openBraceToken,
            this.enumElements = enumElements,
            this.closeBraceToken = closeBraceToken,
            !isShared(modifiers) && (modifiers.parent = this),
            enumKeyword.parent = this,
            identifier.parent = this,
            openBraceToken.parent = this,
            !isShared(enumElements) && (enumElements.parent = this),
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EnumDeclaration;
        }

        public childCount(): number {
            return 6;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.enumKeyword;
                case 2: return this.identifier;
                case 3: return this.openBraceToken;
                case 4: return this.enumElements;
                case 5: return this.closeBraceToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitEnumDeclaration(this);
        }
    }
    export class ImportDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public importKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public moduleReference: IModuleReferenceSyntax;
        public semicolonToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.importKeyword = importKeyword,
            this.identifier = identifier,
            this.equalsToken = equalsToken,
            this.moduleReference = moduleReference,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            importKeyword.parent = this,
            identifier.parent = this,
            equalsToken.parent = this,
            moduleReference.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ImportDeclaration;
        }

        public childCount(): number {
            return 6;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.importKeyword;
                case 2: return this.identifier;
                case 3: return this.equalsToken;
                case 4: return this.moduleReference;
                case 5: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitImportDeclaration(this);
        }
    }
    export class ExportAssignmentSyntax extends SyntaxNode implements IModuleElementSyntax {
        public exportKeyword: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.exportKeyword;
                case 1: return this.equalsToken;
                case 2: return this.identifier;
                case 3: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitExportAssignment(this);
        }
    }
    export class MemberFunctionDeclarationSyntax extends SyntaxNode implements IMemberDeclarationSyntax {
        public modifiers: ISyntaxToken[];
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _memberDeclarationBrand: any; public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            propertyName.parent = this,
            callSignature.parent = this,
            block && (block.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MemberFunctionDeclaration;
        }

        public childCount(): number {
            return 5;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.propertyName;
                case 2: return this.callSignature;
                case 3: return this.block;
                case 4: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitMemberFunctionDeclaration(this);
        }
    }
    export class MemberVariableDeclarationSyntax extends SyntaxNode implements IMemberDeclarationSyntax {
        public modifiers: ISyntaxToken[];
        public variableDeclarator: VariableDeclaratorSyntax;
        public semicolonToken: ISyntaxToken;
        public _memberDeclarationBrand: any; public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.variableDeclarator = variableDeclarator,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            variableDeclarator.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MemberVariableDeclaration;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.variableDeclarator;
                case 2: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitMemberVariableDeclaration(this);
        }
    }
    export class ConstructorDeclarationSyntax extends SyntaxNode implements IClassElementSyntax {
        public modifiers: ISyntaxToken[];
        public constructorKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.constructorKeyword = constructorKeyword,
            this.callSignature = callSignature,
            this.block = block,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            constructorKeyword.parent = this,
            callSignature.parent = this,
            block && (block.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConstructorDeclaration;
        }

        public childCount(): number {
            return 5;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.constructorKeyword;
                case 2: return this.callSignature;
                case 3: return this.block;
                case 4: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitConstructorDeclaration(this);
        }
    }
    export class IndexMemberDeclarationSyntax extends SyntaxNode implements IClassElementSyntax {
        public modifiers: ISyntaxToken[];
        public indexSignature: IndexSignatureSyntax;
        public semicolonToken: ISyntaxToken;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.indexSignature = indexSignature,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            indexSignature.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.IndexMemberDeclaration;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.indexSignature;
                case 2: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitIndexMemberDeclaration(this);
        }
    }
    export class GetAccessorSyntax extends SyntaxNode implements IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public modifiers: ISyntaxToken[];
        public getKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _memberDeclarationBrand: any; public _propertyAssignmentBrand: any; public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
            this.modifiers = modifiers,
            this.getKeyword = getKeyword,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            !isShared(modifiers) && (modifiers.parent = this),
            getKeyword.parent = this,
            propertyName.parent = this,
            callSignature.parent = this,
            block.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.GetAccessor;
        }

        public childCount(): number {
            return 5;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.getKeyword;
                case 2: return this.propertyName;
                case 3: return this.callSignature;
                case 4: return this.block;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitGetAccessor(this);
        }
    }
    export class SetAccessorSyntax extends SyntaxNode implements IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public modifiers: ISyntaxToken[];
        public setKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _memberDeclarationBrand: any; public _propertyAssignmentBrand: any; public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
            this.modifiers = modifiers,
            this.setKeyword = setKeyword,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            !isShared(modifiers) && (modifiers.parent = this),
            setKeyword.parent = this,
            propertyName.parent = this,
            callSignature.parent = this,
            block.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SetAccessor;
        }

        public childCount(): number {
            return 5;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.setKeyword;
                case 2: return this.propertyName;
                case 3: return this.callSignature;
                case 4: return this.block;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitSetAccessor(this);
        }
    }
    export class PropertySignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.propertyName;
                case 1: return this.questionToken;
                case 2: return this.typeAnnotation;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitPropertySignature(this);
        }
    }
    export class CallSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.typeParameterList;
                case 1: return this.parameterList;
                case 2: return this.typeAnnotation;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitCallSignature(this);
        }
    }
    export class ConstructSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public newKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax) {
            super(data);
            this.newKeyword = newKeyword,
            this.callSignature = callSignature,
            newKeyword.parent = this,
            callSignature.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConstructSignature;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.newKeyword;
                case 1: return this.callSignature;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitConstructSignature(this);
        }
    }
    export class IndexSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public openBracketToken: ISyntaxToken;
        public parameters: ISeparatedSyntaxList<ParameterSyntax>;
        public closeBracketToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
            super(data);
            this.openBracketToken = openBracketToken,
            this.parameters = parameters,
            this.closeBracketToken = closeBracketToken,
            this.typeAnnotation = typeAnnotation,
            openBracketToken.parent = this,
            !isShared(parameters) && (parameters.parent = this),
            closeBracketToken.parent = this,
            typeAnnotation && (typeAnnotation.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.IndexSignature;
        }

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.openBracketToken;
                case 1: return this.parameters;
                case 2: return this.closeBracketToken;
                case 3: return this.typeAnnotation;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitIndexSignature(this);
        }
    }
    export class MethodSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.propertyName;
                case 1: return this.questionToken;
                case 2: return this.callSignature;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitMethodSignature(this);
        }
    }
    export class BlockSyntax extends SyntaxNode implements IStatementSyntax {
        public openBraceToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.openBraceToken = openBraceToken,
            this.statements = statements,
            this.closeBraceToken = closeBraceToken,
            openBraceToken.parent = this,
            !isShared(statements) && (statements.parent = this),
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.Block;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.openBraceToken;
                case 1: return this.statements;
                case 2: return this.closeBraceToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitBlock(this);
        }
    }
    export class IfStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public ifKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public elseClause: ElseClauseSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax) {
            super(data);
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

        public childCount(): number {
            return 6;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.ifKeyword;
                case 1: return this.openParenToken;
                case 2: return this.condition;
                case 3: return this.closeParenToken;
                case 4: return this.statement;
                case 5: return this.elseClause;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitIfStatement(this);
        }
    }
    export class VariableStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public modifiers: ISyntaxToken[];
        public variableDeclaration: VariableDeclarationSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.variableDeclaration = variableDeclaration,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            variableDeclaration.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VariableStatement;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.modifiers;
                case 1: return this.variableDeclaration;
                case 2: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitVariableStatement(this);
        }
    }
    export class ExpressionStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.expression = expression,
            this.semicolonToken = semicolonToken,
            expression.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ExpressionStatement;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.expression;
                case 1: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitExpressionStatement(this);
        }
    }
    export class ReturnStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public returnKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.returnKeyword;
                case 1: return this.expression;
                case 2: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitReturnStatement(this);
        }
    }
    export class SwitchStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public switchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public switchClauses: ISwitchClauseSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
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
            !isShared(switchClauses) && (switchClauses.parent = this),
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SwitchStatement;
        }

        public childCount(): number {
            return 7;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.switchKeyword;
                case 1: return this.openParenToken;
                case 2: return this.expression;
                case 3: return this.closeParenToken;
                case 4: return this.openBraceToken;
                case 5: return this.switchClauses;
                case 6: return this.closeBraceToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitSwitchStatement(this);
        }
    }
    export class BreakStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public breakKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.breakKeyword;
                case 1: return this.identifier;
                case 2: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitBreakStatement(this);
        }
    }
    export class ContinueStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public continueKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.continueKeyword;
                case 1: return this.identifier;
                case 2: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitContinueStatement(this);
        }
    }
    export class ForStatementSyntax extends SyntaxNode implements IStatementSyntax {
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
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
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

        public childCount(): number {
            return 10;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.forKeyword;
                case 1: return this.openParenToken;
                case 2: return this.variableDeclaration;
                case 3: return this.initializer;
                case 4: return this.firstSemicolonToken;
                case 5: return this.condition;
                case 6: return this.secondSemicolonToken;
                case 7: return this.incrementor;
                case 8: return this.closeParenToken;
                case 9: return this.statement;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitForStatement(this);
        }
    }
    export class ForInStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public forKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public variableDeclaration: VariableDeclarationSyntax;
        public left: IExpressionSyntax;
        public inKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
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

        public childCount(): number {
            return 8;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.forKeyword;
                case 1: return this.openParenToken;
                case 2: return this.variableDeclaration;
                case 3: return this.left;
                case 4: return this.inKeyword;
                case 5: return this.expression;
                case 6: return this.closeParenToken;
                case 7: return this.statement;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitForInStatement(this);
        }
    }
    export class EmptyStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, semicolonToken: ISyntaxToken) {
            super(data);
            this.semicolonToken = semicolonToken,
            semicolonToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EmptyStatement;
        }

        public childCount(): number {
            return 1;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitEmptyStatement(this);
        }
    }
    export class ThrowStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public throwKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.throwKeyword;
                case 1: return this.expression;
                case 2: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitThrowStatement(this);
        }
    }
    export class WhileStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
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

        public childCount(): number {
            return 5;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.whileKeyword;
                case 1: return this.openParenToken;
                case 2: return this.condition;
                case 3: return this.closeParenToken;
                case 4: return this.statement;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitWhileStatement(this);
        }
    }
    export class TryStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public tryKeyword: ISyntaxToken;
        public block: BlockSyntax;
        public catchClause: CatchClauseSyntax;
        public finallyClause: FinallyClauseSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax) {
            super(data);
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

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.tryKeyword;
                case 1: return this.block;
                case 2: return this.catchClause;
                case 3: return this.finallyClause;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitTryStatement(this);
        }
    }
    export class LabeledStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public identifier: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.identifier;
                case 1: return this.colonToken;
                case 2: return this.statement;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitLabeledStatement(this);
        }
    }
    export class DoStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public doKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 7;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.doKeyword;
                case 1: return this.statement;
                case 2: return this.whileKeyword;
                case 3: return this.openParenToken;
                case 4: return this.condition;
                case 5: return this.closeParenToken;
                case 6: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitDoStatement(this);
        }
    }
    export class DebuggerStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public debuggerKeyword: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.debuggerKeyword = debuggerKeyword,
            this.semicolonToken = semicolonToken,
            debuggerKeyword.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DebuggerStatement;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.debuggerKeyword;
                case 1: return this.semicolonToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitDebuggerStatement(this);
        }
    }
    export class WithStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public withKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
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

        public childCount(): number {
            return 5;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.withKeyword;
                case 1: return this.openParenToken;
                case 2: return this.condition;
                case 3: return this.closeParenToken;
                case 4: return this.statement;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitWithStatement(this);
        }
    }
    export class PrefixUnaryExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public operatorToken: ISyntaxToken;
        public operand: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax) {
            super(data);
            this.operatorToken = operatorToken,
            this.operand = operand,
            operatorToken.parent = this,
            operand.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.PrefixUnaryExpression;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.operatorToken;
                case 1: return this.operand;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitPrefixUnaryExpression(this);
        }
    }
    export class DeleteExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public deleteKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.deleteKeyword = deleteKeyword,
            this.expression = expression,
            deleteKeyword.parent = this,
            expression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DeleteExpression;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.deleteKeyword;
                case 1: return this.expression;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitDeleteExpression(this);
        }
    }
    export class TypeOfExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public typeOfKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.typeOfKeyword = typeOfKeyword,
            this.expression = expression,
            typeOfKeyword.parent = this,
            expression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeOfExpression;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.typeOfKeyword;
                case 1: return this.expression;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitTypeOfExpression(this);
        }
    }
    export class VoidExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public voidKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.voidKeyword = voidKeyword,
            this.expression = expression,
            voidKeyword.parent = this,
            expression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VoidExpression;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.voidKeyword;
                case 1: return this.expression;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitVoidExpression(this);
        }
    }
    export class ConditionalExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public condition: IExpressionSyntax;
        public questionToken: ISyntaxToken;
        public whenTrue: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public whenFalse: IExpressionSyntax;
        public _expressionBrand: any;
        constructor(data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax) {
            super(data);
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

        public childCount(): number {
            return 5;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.condition;
                case 1: return this.questionToken;
                case 2: return this.whenTrue;
                case 3: return this.colonToken;
                case 4: return this.whenFalse;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitConditionalExpression(this);
        }
    }
    export class BinaryExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public left: IExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public right: IExpressionSyntax;
        public _expressionBrand: any;
        constructor(data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.left;
                case 1: return this.operatorToken;
                case 2: return this.right;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitBinaryExpression(this);
        }
    }
    export class PostfixUnaryExpressionSyntax extends SyntaxNode implements IPostfixExpressionSyntax {
        public operand: ILeftHandSideExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken) {
            super(data);
            this.operand = operand,
            this.operatorToken = operatorToken,
            operand.parent = this,
            operatorToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.PostfixUnaryExpression;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.operand;
                case 1: return this.operatorToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitPostfixUnaryExpression(this);
        }
    }
    export class MemberAccessExpressionSyntax extends SyntaxNode implements IMemberExpressionSyntax, ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public dotToken: ISyntaxToken;
        public name: ISyntaxToken;
        public _memberExpressionBrand: any; public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.expression;
                case 1: return this.dotToken;
                case 2: return this.name;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitMemberAccessExpression(this);
        }
    }
    export class InvocationExpressionSyntax extends SyntaxNode implements ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax) {
            super(data);
            this.expression = expression,
            this.argumentList = argumentList,
            expression.parent = this,
            argumentList.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.InvocationExpression;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.expression;
                case 1: return this.argumentList;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitInvocationExpression(this);
        }
    }
    export class ArrayLiteralExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openBracketToken: ISyntaxToken;
        public expressions: ISeparatedSyntaxList<IExpressionSyntax>;
        public closeBracketToken: ISyntaxToken;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, expressions: ISeparatedSyntaxList<IExpressionSyntax>, closeBracketToken: ISyntaxToken) {
            super(data);
            this.openBracketToken = openBracketToken,
            this.expressions = expressions,
            this.closeBracketToken = closeBracketToken,
            openBracketToken.parent = this,
            !isShared(expressions) && (expressions.parent = this),
            closeBracketToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ArrayLiteralExpression;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.openBracketToken;
                case 1: return this.expressions;
                case 2: return this.closeBracketToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitArrayLiteralExpression(this);
        }
    }
    export class ObjectLiteralExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openBraceToken: ISyntaxToken;
        public propertyAssignments: ISeparatedSyntaxList<IPropertyAssignmentSyntax>;
        public closeBraceToken: ISyntaxToken;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, propertyAssignments: ISeparatedSyntaxList<IPropertyAssignmentSyntax>, closeBraceToken: ISyntaxToken) {
            super(data);
            this.openBraceToken = openBraceToken,
            this.propertyAssignments = propertyAssignments,
            this.closeBraceToken = closeBraceToken,
            openBraceToken.parent = this,
            !isShared(propertyAssignments) && (propertyAssignments.parent = this),
            closeBraceToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ObjectLiteralExpression;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.openBraceToken;
                case 1: return this.propertyAssignments;
                case 2: return this.closeBraceToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitObjectLiteralExpression(this);
        }
    }
    export class ObjectCreationExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public newKeyword: ISyntaxToken;
        public expression: IMemberExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.newKeyword;
                case 1: return this.expression;
                case 2: return this.argumentList;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitObjectCreationExpression(this);
        }
    }
    export class ParenthesizedExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.openParenToken;
                case 1: return this.expression;
                case 2: return this.closeParenToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitParenthesizedExpression(this);
        }
    }
    export class ParenthesizedArrowFunctionExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public callSignature: CallSignatureSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
            super(data);
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

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.callSignature;
                case 1: return this.equalsGreaterThanToken;
                case 2: return this.block;
                case 3: return this.expression;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitParenthesizedArrowFunctionExpression(this);
        }
    }
    export class SimpleArrowFunctionExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public parameter: ParameterSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
            super(data);
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

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.parameter;
                case 1: return this.equalsGreaterThanToken;
                case 2: return this.block;
                case 3: return this.expression;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitSimpleArrowFunctionExpression(this);
        }
    }
    export class CastExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public lessThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public greaterThanToken: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
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

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.lessThanToken;
                case 1: return this.type;
                case 2: return this.greaterThanToken;
                case 3: return this.expression;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitCastExpression(this);
        }
    }
    export class ElementAccessExpressionSyntax extends SyntaxNode implements IMemberExpressionSyntax, ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public openBracketToken: ISyntaxToken;
        public argumentExpression: IExpressionSyntax;
        public closeBracketToken: ISyntaxToken;
        public _memberExpressionBrand: any; public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.expression;
                case 1: return this.openBracketToken;
                case 2: return this.argumentExpression;
                case 3: return this.closeBracketToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitElementAccessExpression(this);
        }
    }
    export class FunctionExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
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

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.functionKeyword;
                case 1: return this.identifier;
                case 2: return this.callSignature;
                case 3: return this.block;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitFunctionExpression(this);
        }
    }
    export class OmittedExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public _expressionBrand: any;
        constructor(data: number) {
            super(data);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.OmittedExpression;
        }

        public childCount(): number {
            return 0;
        }

        public childAt(slot: number): ISyntaxElement {
            throw Errors.invalidOperation();
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitOmittedExpression(this);
        }
    }
    export class VariableDeclarationSyntax extends SyntaxNode {
        public varKeyword: ISyntaxToken;
        public variableDeclarators: ISeparatedSyntaxList<VariableDeclaratorSyntax>;
        constructor(data: number, varKeyword: ISyntaxToken, variableDeclarators: ISeparatedSyntaxList<VariableDeclaratorSyntax>) {
            super(data);
            this.varKeyword = varKeyword,
            this.variableDeclarators = variableDeclarators,
            varKeyword.parent = this,
            !isShared(variableDeclarators) && (variableDeclarators.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VariableDeclaration;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.varKeyword;
                case 1: return this.variableDeclarators;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitVariableDeclaration(this);
        }
    }
    export class VariableDeclaratorSyntax extends SyntaxNode {
        public propertyName: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, propertyName: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.propertyName;
                case 1: return this.typeAnnotation;
                case 2: return this.equalsValueClause;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitVariableDeclarator(this);
        }
    }
    export class ArgumentListSyntax extends SyntaxNode {
        public typeArgumentList: TypeArgumentListSyntax;
        public openParenToken: ISyntaxToken;
        public arguments: ISeparatedSyntaxList<IExpressionSyntax>;
        public closeParenToken: ISyntaxToken;
        constructor(data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, _arguments: ISeparatedSyntaxList<IExpressionSyntax>, closeParenToken: ISyntaxToken) {
            super(data);
            this.typeArgumentList = typeArgumentList,
            this.openParenToken = openParenToken,
            this.arguments = _arguments,
            this.closeParenToken = closeParenToken,
            typeArgumentList && (typeArgumentList.parent = this),
            openParenToken.parent = this,
            !isShared(_arguments) && (_arguments.parent = this),
            closeParenToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ArgumentList;
        }

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.typeArgumentList;
                case 1: return this.openParenToken;
                case 2: return this.arguments;
                case 3: return this.closeParenToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitArgumentList(this);
        }
    }
    export class ParameterListSyntax extends SyntaxNode {
        public openParenToken: ISyntaxToken;
        public parameters: ISeparatedSyntaxList<ParameterSyntax>;
        public closeParenToken: ISyntaxToken;
        constructor(data: number, openParenToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeParenToken: ISyntaxToken) {
            super(data);
            this.openParenToken = openParenToken,
            this.parameters = parameters,
            this.closeParenToken = closeParenToken,
            openParenToken.parent = this,
            !isShared(parameters) && (parameters.parent = this),
            closeParenToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ParameterList;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.openParenToken;
                case 1: return this.parameters;
                case 2: return this.closeParenToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitParameterList(this);
        }
    }
    export class TypeArgumentListSyntax extends SyntaxNode {
        public lessThanToken: ISyntaxToken;
        public typeArguments: ISeparatedSyntaxList<ITypeSyntax>;
        public greaterThanToken: ISyntaxToken;
        constructor(data: number, lessThanToken: ISyntaxToken, typeArguments: ISeparatedSyntaxList<ITypeSyntax>, greaterThanToken: ISyntaxToken) {
            super(data);
            this.lessThanToken = lessThanToken,
            this.typeArguments = typeArguments,
            this.greaterThanToken = greaterThanToken,
            lessThanToken.parent = this,
            !isShared(typeArguments) && (typeArguments.parent = this),
            greaterThanToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeArgumentList;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.lessThanToken;
                case 1: return this.typeArguments;
                case 2: return this.greaterThanToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitTypeArgumentList(this);
        }
    }
    export class TypeParameterListSyntax extends SyntaxNode {
        public lessThanToken: ISyntaxToken;
        public typeParameters: ISeparatedSyntaxList<TypeParameterSyntax>;
        public greaterThanToken: ISyntaxToken;
        constructor(data: number, lessThanToken: ISyntaxToken, typeParameters: ISeparatedSyntaxList<TypeParameterSyntax>, greaterThanToken: ISyntaxToken) {
            super(data);
            this.lessThanToken = lessThanToken,
            this.typeParameters = typeParameters,
            this.greaterThanToken = greaterThanToken,
            lessThanToken.parent = this,
            !isShared(typeParameters) && (typeParameters.parent = this),
            greaterThanToken.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeParameterList;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.lessThanToken;
                case 1: return this.typeParameters;
                case 2: return this.greaterThanToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitTypeParameterList(this);
        }
    }
    export class HeritageClauseSyntax extends SyntaxNode {
        public extendsOrImplementsKeyword: ISyntaxToken;
        public typeNames: ISeparatedSyntaxList<INameSyntax>;
        constructor(data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: ISeparatedSyntaxList<INameSyntax>) {
            super(data);
            this.extendsOrImplementsKeyword = extendsOrImplementsKeyword,
            this.typeNames = typeNames,
            extendsOrImplementsKeyword.parent = this,
            !isShared(typeNames) && (typeNames.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.HeritageClause;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.extendsOrImplementsKeyword;
                case 1: return this.typeNames;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitHeritageClause(this);
        }
    }
    export class EqualsValueClauseSyntax extends SyntaxNode {
        public equalsToken: ISyntaxToken;
        public value: IExpressionSyntax;
        constructor(data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax) {
            super(data);
            this.equalsToken = equalsToken,
            this.value = value,
            equalsToken.parent = this,
            value.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EqualsValueClause;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.equalsToken;
                case 1: return this.value;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitEqualsValueClause(this);
        }
    }
    export class CaseSwitchClauseSyntax extends SyntaxNode implements ISwitchClauseSyntax {
        public caseKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _switchClauseBrand: any;
        constructor(data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
            super(data);
            this.caseKeyword = caseKeyword,
            this.expression = expression,
            this.colonToken = colonToken,
            this.statements = statements,
            caseKeyword.parent = this,
            expression.parent = this,
            colonToken.parent = this,
            !isShared(statements) && (statements.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.CaseSwitchClause;
        }

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.caseKeyword;
                case 1: return this.expression;
                case 2: return this.colonToken;
                case 3: return this.statements;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitCaseSwitchClause(this);
        }
    }
    export class DefaultSwitchClauseSyntax extends SyntaxNode implements ISwitchClauseSyntax {
        public defaultKeyword: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _switchClauseBrand: any;
        constructor(data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
            super(data);
            this.defaultKeyword = defaultKeyword,
            this.colonToken = colonToken,
            this.statements = statements,
            defaultKeyword.parent = this,
            colonToken.parent = this,
            !isShared(statements) && (statements.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DefaultSwitchClause;
        }

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.defaultKeyword;
                case 1: return this.colonToken;
                case 2: return this.statements;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitDefaultSwitchClause(this);
        }
    }
    export class ElseClauseSyntax extends SyntaxNode {
        public elseKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        constructor(data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.elseKeyword = elseKeyword,
            this.statement = statement,
            elseKeyword.parent = this,
            statement.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ElseClause;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.elseKeyword;
                case 1: return this.statement;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitElseClause(this);
        }
    }
    export class CatchClauseSyntax extends SyntaxNode {
        public catchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public closeParenToken: ISyntaxToken;
        public block: BlockSyntax;
        constructor(data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax) {
            super(data);
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

        public childCount(): number {
            return 6;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.catchKeyword;
                case 1: return this.openParenToken;
                case 2: return this.identifier;
                case 3: return this.typeAnnotation;
                case 4: return this.closeParenToken;
                case 5: return this.block;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitCatchClause(this);
        }
    }
    export class FinallyClauseSyntax extends SyntaxNode {
        public finallyKeyword: ISyntaxToken;
        public block: BlockSyntax;
        constructor(data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax) {
            super(data);
            this.finallyKeyword = finallyKeyword,
            this.block = block,
            finallyKeyword.parent = this,
            block.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FinallyClause;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.finallyKeyword;
                case 1: return this.block;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitFinallyClause(this);
        }
    }
    export class TypeParameterSyntax extends SyntaxNode {
        public identifier: ISyntaxToken;
        public constraint: ConstraintSyntax;
        constructor(data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax) {
            super(data);
            this.identifier = identifier,
            this.constraint = constraint,
            identifier.parent = this,
            constraint && (constraint.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeParameter;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.identifier;
                case 1: return this.constraint;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitTypeParameter(this);
        }
    }
    export class ConstraintSyntax extends SyntaxNode {
        public extendsKeyword: ISyntaxToken;
        public typeOrExpression: ISyntaxNodeOrToken;
        constructor(data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken) {
            super(data);
            this.extendsKeyword = extendsKeyword,
            this.typeOrExpression = typeOrExpression,
            extendsKeyword.parent = this,
            typeOrExpression.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.Constraint;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.extendsKeyword;
                case 1: return this.typeOrExpression;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitConstraint(this);
        }
    }
    export class SimplePropertyAssignmentSyntax extends SyntaxNode implements IPropertyAssignmentSyntax {
        public propertyName: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public _propertyAssignmentBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, colonToken: ISyntaxToken, expression: IExpressionSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.propertyName;
                case 1: return this.colonToken;
                case 2: return this.expression;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitSimplePropertyAssignment(this);
        }
    }
    export class FunctionPropertyAssignmentSyntax extends SyntaxNode implements IPropertyAssignmentSyntax {
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _propertyAssignmentBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
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

        public childCount(): number {
            return 3;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.propertyName;
                case 1: return this.callSignature;
                case 2: return this.block;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitFunctionPropertyAssignment(this);
        }
    }
    export class ParameterSyntax extends SyntaxNode {
        public dotDotDotToken: ISyntaxToken;
        public modifiers: ISyntaxToken[];
        public identifier: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
            super(data);
            this.dotDotDotToken = dotDotDotToken,
            this.modifiers = modifiers,
            this.identifier = identifier,
            this.questionToken = questionToken,
            this.typeAnnotation = typeAnnotation,
            this.equalsValueClause = equalsValueClause,
            dotDotDotToken && (dotDotDotToken.parent = this),
            !isShared(modifiers) && (modifiers.parent = this),
            identifier.parent = this,
            questionToken && (questionToken.parent = this),
            typeAnnotation && (typeAnnotation.parent = this),
            equalsValueClause && (equalsValueClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.Parameter;
        }

        public childCount(): number {
            return 6;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.dotDotDotToken;
                case 1: return this.modifiers;
                case 2: return this.identifier;
                case 3: return this.questionToken;
                case 4: return this.typeAnnotation;
                case 5: return this.equalsValueClause;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitParameter(this);
        }
    }
    export class EnumElementSyntax extends SyntaxNode {
        public propertyName: ISyntaxToken;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, propertyName: ISyntaxToken, equalsValueClause: EqualsValueClauseSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.equalsValueClause = equalsValueClause,
            propertyName.parent = this,
            equalsValueClause && (equalsValueClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EnumElement;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.propertyName;
                case 1: return this.equalsValueClause;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitEnumElement(this);
        }
    }
    export class TypeAnnotationSyntax extends SyntaxNode {
        public colonToken: ISyntaxToken;
        public type: ITypeSyntax;
        constructor(data: number, colonToken: ISyntaxToken, type: ITypeSyntax) {
            super(data);
            this.colonToken = colonToken,
            this.type = type,
            colonToken.parent = this,
            type.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeAnnotation;
        }

        public childCount(): number {
            return 2;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.colonToken;
                case 1: return this.type;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitTypeAnnotation(this);
        }
    }
    export class ExternalModuleReferenceSyntax extends SyntaxNode implements IModuleReferenceSyntax {
        public requireKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public stringLiteral: ISyntaxToken;
        public closeParenToken: ISyntaxToken;
        public _moduleReferenceBrand: any;
        constructor(data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken) {
            super(data);
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

        public childCount(): number {
            return 4;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.requireKeyword;
                case 1: return this.openParenToken;
                case 2: return this.stringLiteral;
                case 3: return this.closeParenToken;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitExternalModuleReference(this);
        }
    }
    export class ModuleNameModuleReferenceSyntax extends SyntaxNode implements IModuleReferenceSyntax {
        public moduleName: INameSyntax;
        public _moduleReferenceBrand: any;
        constructor(data: number, moduleName: INameSyntax) {
            super(data);
            this.moduleName = moduleName,
            moduleName.parent = this;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ModuleNameModuleReference;
        }

        public childCount(): number {
            return 1;
        }

        public childAt(slot: number): ISyntaxElement {
            switch (slot) {
                case 0: return this.moduleName;
                default: throw Errors.invalidOperation();
            }
        }

        public accept(visitor: ISyntaxVisitor): SyntaxKind {
            return visitor.visitModuleNameModuleReference(this);
        }
    }
}