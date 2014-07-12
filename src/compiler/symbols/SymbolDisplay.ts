///<reference path='..\Core\EnumUtilities.ts' />
///<reference path='ISemanticModel.ts' />
///<reference path='..\Syntax\Location.ts' />

module SymbolDisplay {
    export enum PartKind {
        ClassName,
        EnumName,
        ErrorTypeName,
        FieldName,
        InterfaceName,
        Keyword,
        LineBreak,
        NumericLiteral,
        StringLiteral,
        LocalName,
        MethodName,
        ModuleName,
        Operator,
        ParameterName,
        PropertyName,
        Punctuation,
        Space,
        Text,
        TypeParameterName,
    }

    export class Part {
        private _kind: PartKind;
        private _text: string;
        private _symbol: ISymbol;

        constructor(kind: PartKind, text: string, symbol: ISymbol = null) {
            this._kind = kind;
            this._text = text;
            this._symbol = symbol;
        }

        public kind(): PartKind {
            return this._kind;
        }

        public text(): string {
            return this._text;
        }

        public symbol(): ISymbol {
            return this._symbol;
        }
    }

    /**
     * Convert a symbol to an array of string parts, each of which has a kind. Useful for
     * colorizing the display string. Returns a read-only array of string parts.
     * @param symbol Symbol to be displayed.
     * @param format Formatting rules - null implies Format.ErrorMessageFormat.
     */
    export function toDisplayParts(symbol: ISymbol, format: Format = null): Part[] {
        // null indicates the default format (as in IFormattable.ToString)
        format = format || errorMessageFormat;
        return toDisplayPartsWorker(
                symbol, /*location:*/ null, /*semanticModel:*/ null, format, /*minimal:*/ false);
    }

    /**
     * Convert a symbol to an array of string parts, each of which has a kind. May be tailored
     * to a specific location in the source code. Useful for colorizing the display string. Returns a read-only array of string parts.
     * @param symbol Symbol to be displayed.
     * @param location A location in the source code (context).
     * @param semanticModel Binding information (for determining names appropriate to the context).
     * @param format Formatting rules - null implies Format.MinimallyQualifiedFormat.
     */
    export function toMinimalDisplayParts(symbol: ISymbol,
        location: ILocation,
        semanticModel: ISemanticModel,
        format: Format = null): Part[] {
        format = format || minimallyQualifiedFormat;
        return toDisplayPartsWorker(symbol, location, semanticModel, format, /*minimal:*/ true);
    }

    function toDisplayPartsWorker(symbol: ISymbol,
        location: ILocation,
        semanticModel: ISemanticModel,
        format: Format,
        minimal: boolean): Part[] {
        if (minimal) {
            if (location == null) {
                // TODO(cyrusn): Localize
                throw Errors.argument("location", "Location must be provided in order to provide minimal type qualification.");
            }

            if (semanticModel == null) {
                // TODO(cyrusn): Localize
                throw Errors.argument("semanticModel", "Semantic model must be provided in order to provide minimal type qualification.");
            }
        }

        var result: Part[] = [];
        symbol.accept(new Visitor(format, location, semanticModel, minimal, result));
        return result;
    }

    class Visitor implements ISymbolVisitor {
        private location: ILocation;
        private semanticModel: ISemanticModel;
        private format: Format;
        private builder: Part[];
        private isFirstSymbolVisited: boolean;
        private minimal: boolean;

        private notFirstVisitor: Visitor;

        constructor(format: Format,
                    location: ILocation,
                    semanticModel: ISemanticModel,
                    minimal: boolean,
                    builder: Part[],
                    isFirstSymbolVisited: boolean = true) {
            this.location = location;
            this.semanticModel = semanticModel;

            this.format = format;
            this.minimal = minimal;
            this.builder = builder;
            this.isFirstSymbolVisited = isFirstSymbolVisited;

            if (isFirstSymbolVisited) {
                this.notFirstVisitor = new Visitor(format, location, semanticModel, minimal, builder, !isFirstSymbolVisited);
            }
            else {
                this.notFirstVisitor = this;
            }
        }

        private addKeyword(kind: SyntaxKind): void {
            this.builder.push(new Part(PartKind.Keyword, SyntaxFacts.getText(kind), null));
        }

        private addPunctuation(kind: SyntaxKind): void {
            this.builder.push(new Part(PartKind.Punctuation, SyntaxFacts.getText(kind), null));
        }

        private addSpace(): void {
            this.builder.push(new Part(PartKind.Keyword, " ", null));
        }

        private visitAnyType(symbol: IAnyTypeSymbol): void {
            this.addKeyword(SyntaxKind.AnyKeyword);
        }

        private visitNumberType(symbol: INumberTypeSymbol): void {
            this.addKeyword(SyntaxKind.NumberKeyword);
        }

        private visitBooleanType(symbol: IBooleanTypeSymbol): void {
            this.addKeyword(SyntaxKind.BooleanKeyword);
        }

        private visitStringType(symbol: IStringTypeSymbol): void {
            this.addKeyword(SyntaxKind.StringKeyword);
        }

        private visitVoidType(symbol: IVoidTypeSymbol): void {
            this.addKeyword(SyntaxKind.VoidKeyword);
        }

        private visitNullType(symbol: INullTypeSymbol): void {
            this.addKeyword(SyntaxKind.NullKeyword);
        }

        private visitUndefinedType(symbol: IUndefinedTypeSymbol): void {
            this.builder.push(new Part(PartKind.Text, "undefined", symbol));
        }

        private visitTypeParameter(symbol: ITypeParameterSymbol): void {
            this.builder.push(new Part(PartKind.TypeParameterName, symbol.name(), symbol));
        }

        private addContainingModuleIfRequired(symbol: ISymbol): void {
            var containingModule = symbol.containingModule();
            if (this.shouldVisitModule(containingModule)) {
                containingModule.accept(this.notFirstVisitor);
                this.addPunctuation(SyntaxKind.DotToken);
            }
        }

        private visitArrayType(symbol: IClassTypeSymbol): void {
            var brackets = 1;

            var elementType = symbol.typeArguments()[0];
            while (elementType.isArrayType()) {
                elementType = (<IClassTypeSymbol>elementType).typeArguments()[0];
                brackets++;
            }

            elementType.accept(this.notFirstVisitor);

            for (var i = 0; i < brackets; i++) {
                this.addPunctuation(SyntaxKind.OpenBracketToken);
                this.addPunctuation(SyntaxKind.CloseBracketToken);
            }
        }

        private visitClassType(symbol: IClassTypeSymbol): void {
            if (symbol.isArrayType()) {
                this.visitArrayType(symbol);
                return;
            }

            if (this.minimal) {
                this.minimallyQualify(symbol, symbol.typeParameters().length);
                return;
            }

            this.addTypeKind(symbol);
            this.addContainingModuleIfRequired(symbol);
            this.addNameAndTypeArguments(symbol, symbol.typeArguments());
        }

        private visitInterfaceType(symbol: IInterfaceTypeSymbol): void {
            if (this.minimal) {
                this.minimallyQualify(symbol, symbol.typeParameters().length);
                return;
            }

            this.addTypeKind(symbol);
            this.addContainingModuleIfRequired(symbol);
            this.addNameAndTypeArguments(symbol, symbol.typeArguments());
        }

        private visitEnumType(symbol: IEnumTypeSymbol): void {
            if (this.minimal) {
                this.minimallyQualify(symbol, /*arity:*/ 0);
                return;
            }

            this.addTypeKind(symbol);
            this.addContainingModuleIfRequired(symbol);

            this.builder.push(new Part(this.getPartKind(symbol), symbol.name(), symbol));
        }

        private addTypeKind(symbol: ITypeSymbol): void {
            if (this.isFirstSymbolVisited) {
                var kindKeyword = this.getKindKeyword(symbol.typeKind());
                if (kindKeyword !== SyntaxKind.None) {
                    this.addKeyword(kindKeyword);
                    this.addSpace();
                }
            }
        }

        private getKindKeyword(typeKind: TypeKind): SyntaxKind {
            switch (typeKind) {
                case TypeKind.Class:
                    return SyntaxKind.ClassKeyword;
                case TypeKind.Enum:
                    return SyntaxKind.EnumKeyword;
                case TypeKind.Interface:
                    return SyntaxKind.InterfaceKeyword;
                default:
                    return SyntaxKind.None;
            }
        }

        private shouldVisitModule(moduleSymbol: IModuleSymbol): boolean {
            if (this.format.typeQualificationStyle() !== TypeQualificationStyle.NameAndContainingModules) {
                return false;
            }

            return !moduleSymbol.isGlobalModule();
        }

        private addNameAndTypeArguments(symbol: ISymbol, typeArguments: ITypeSymbol[]): void {
            this.builder.push(new Part(this.getPartKind(symbol), symbol.name(), symbol));
            this.addTypeArguments(typeArguments);
        }

        private visitAnonymousType(symbol: IAnonymousTypeSymbol): void {
            // If there's only one signature in the anonymous type, and it's a construct or function
            // signature, then just display that single member.
            if (symbol.signatureCount() === 1) {
                var signature = symbol.signatureAt(0);

                if (signature.kind() === SymbolKind.ConstructSignature ||
                    signature.kind() === SymbolKind.CallSignature) {

                    signature.accept(this);
                    return;
                }
            }

            if (EnumUtilities.hasFlag(this.format.typeOptions(), TypeOptions.InlineAnonymousTypes)) {
                this.addPunctuation(SyntaxKind.OpenBraceToken);
                this.addSpace();

                for (var i = 0, n = symbol.signatureCount(); i < n; i++) {
                    if (i > 0) {
                        this.addPunctuation(SyntaxKind.SemicolonToken);
                        this.addSpace();
                    }

                    symbol.signatureAt(i).accept(this.notFirstVisitor);
                }

                this.addPunctuation(SyntaxKind.CloseBraceToken);
            }
            else {
                // Note: higher up level services will determine how to display this.

                var name = "<anonymous type>";
                this.builder.push(new Part(PartKind.ClassName, name, symbol));
            }
        }

        private getPartKind(symbol: ISymbol): PartKind {
            switch (symbol.kind()) {
                case SymbolKind.ClassType:
                    return PartKind.ClassName;
                case SymbolKind.EnumType:
                    return PartKind.EnumName;
                case SymbolKind.InterfaceType:
                    return PartKind.InterfaceName;
                default:
                    throw Errors.invalidOperation();
            }
        }

        private addTypeArguments(typeArguments: ITypeSymbol[]): void {
            if (typeArguments !== null &&
                typeArguments.length > 0 &&
                EnumUtilities.hasFlag(this.format.genericsOptions(), GenericsOptions.IncludeTypeArguments)) {

                this.addPunctuation(SyntaxKind.LessThanToken);

                for (var i = 0, n = typeArguments.length; i < n; i++) {
                    var typeArg = typeArguments[i];

                    if (i > 0) {
                        this.addPunctuation(SyntaxKind.CommaToken);
                        this.addSpace();
                    }

                    typeArg.accept(this.notFirstVisitor);

                    if (typeArg.kind() === SymbolKind.TypeParameter) {
                        var typeParam = <ITypeParameterSymbol>typeArg;
                        this.addTypeParameterConstraint(typeParam);
                    }
                }

                this.addPunctuation(SyntaxKind.GreaterThanToken);
            }
        }

        private addTypeParameterConstraint(typeParameter: ITypeParameterSymbol): void {
            if (this.isFirstSymbolVisited && typeParameter.constraintType() !== null &&
                EnumUtilities.hasFlag(this.format.genericsOptions(), GenericsOptions.IncludeTypeConstraints)) {
                this.addSpace();
                this.addKeyword(SyntaxKind.ExtendsKeyword);
                this.addSpace();
                typeParameter.constraintType().accept(this.notFirstVisitor);
            }
        }

        private minimallyQualify(symbol: ISymbol, arity: number): void {
            // We first start by trying to bind just our name and type arguments.  If they bind to
            // the symbol that we were constructed from, then we have our minimal name. Otherwise,
            // we get the minimal name of our parent, add a dot, and then add ourselves.
            if (!this.nameBoundSuccessfullyToSameSymbol(symbol, arity)) {
                // Just the name alone didn't bind properly.  Add our minimally qualified parent (if
                // we have one), a dot, and then our name.
                if (this.shouldVisitModule(symbol.containingModule())) {
                    symbol.containingModule().accept(this.notFirstVisitor);
                    this.addPunctuation(SyntaxKind.DotToken);
                }
            }

            var typeArguments = arity === 0 ? null : (<any>symbol).typeArguments();
            this.addNameAndTypeArguments(symbol, typeArguments);
        }

        private nameBoundSuccessfullyToSameSymbol(symbol: ISymbol, arity: number): boolean {
            var normalSymbols = this.semanticModel.lookupSymbols(
                this.location.textSpan().start(),
                /*container:*/ null,
                /*name:*/ symbol.name(),
                /*arity: */arity,
                /*options: */ this.getMinimallyQualifyLookupOptions());

            if (normalSymbols.length === 1) {
                // Binding normally ended up with the right symbol.  We can definitely use hte
                // simplified name.
                if (normalSymbols[0] === symbol.originalDefinition()) {
                    return true;
                }
            }

            return false;
        }

        private getMinimallyQualifyLookupOptions(): LookupOptions {
            var token = this.location.syntaxTree().sourceUnit().findToken(this.location.textSpan().start());

            return Syntax.isInModuleOrTypeContext(token)
                ? LookupOptions.ModulesOrTypesOnly
                : LookupOptions.Default;
        }

        private visitVariable(symbol: IVariableSymbol): void {
            this.addAccessibilityIfRequired(symbol);
            this.addMemberModifiersIfRequired(symbol);

            if (EnumUtilities.hasFlag(this.format.memberOptions(), MemberOptions.IncludeContainingType)) {
                symbol.containingType().accept(this.notFirstVisitor);
                this.addPunctuation(SyntaxKind.DotToken);
            }

            this.builder.push(new Part(PartKind.FieldName, symbol.name(), symbol));

            if (EnumUtilities.hasFlag(this.format.memberOptions(), MemberOptions.IncludeType) && this.isFirstSymbolVisited) {
                this.addPunctuation(SyntaxKind.ColonToken);
                this.addSpace();
                symbol.type().accept(this.notFirstVisitor);
            }


            if (this.isFirstSymbolVisited &&
                EnumUtilities.hasFlag(this.format.memberOptions(), MemberOptions.IncludeConstantValue) &&
                symbol.hasValue() &&
                this.canAddConstant(symbol.type(), symbol.value())) {
                this.addSpace();
                this.addPunctuation(SyntaxKind.EqualsToken);
                this.addSpace();
                this.addValue(symbol.type(), symbol.value());
            }
        }

        private canAddConstant(type: ITypeSymbol, value: any): boolean {
            if (type.typeKind() === TypeKind.Enum) {
                return true;
            }

            if (value === null) {
                return true;
            }

            return typeof value === 'number' ||
                   typeof value === 'string';
        }

        private addAccessibilityIfRequired(symbol: ISymbol): void {
            var containingType = symbol.containingType();

            if (EnumUtilities.hasFlag(this.format.memberOptions(), MemberOptions.IncludeAccessibility) &&
                (containingType === null || containingType.typeKind() !== TypeKind.Interface)) {
                switch (symbol.accessibility()) {
                    case Accessibility.Private:
                        this.addKeyword(SyntaxKind.PrivateKeyword);
                        this.addSpace();
                        break;
                    case Accessibility.Public:
                        this.addKeyword(SyntaxKind.PublicKeyword);
                        this.addSpace();
                        break;
                }
            }
        }

        private addMemberModifiersIfRequired(symbol: ISymbol): void {
            var containingType = symbol.containingType();
            if (EnumUtilities.hasFlag(this.format.memberOptions(), MemberOptions.IncludeModifiers) &&
                (containingType == null || containingType.typeKind() !== TypeKind.Interface)) {

                if (symbol.isStatic()) {
                    this.addKeyword(SyntaxKind.StaticKeyword);
                    this.addSpace();
                }
            }
        }

        private addValue(type: ITypeSymbol, value: any): void {
            if (value != null) {
                this.addNonNullValue(type, value);
            }
            else {
                this.addKeyword(SyntaxKind.NullKeyword);
            }
        }

        private addNonNullValue(type: ITypeSymbol, value: any): void {
            if (type.typeKind() === TypeKind.Enum) {
                this.addEnumConstantValue(<IObjectTypeSymbol> type, value);
            }
            else {
                this.addLiteralValue(value);
            }
        }

        private addEnumConstantValue(enumType: IObjectTypeSymbol, value: any): void {
            // TODO: better enum presentation.
            this.addLiteralValue(value);
        }

        private addLiteralValue(value: any): void {
            var stringified = JSON.stringify(value);
            this.builder.push(new Part(typeof value === 'number' ? PartKind.NumericLiteral : PartKind.StringLiteral,
                stringified, null));
        }
    }
}