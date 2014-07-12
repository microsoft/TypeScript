///<reference path='references.ts' />

module TypeScript {
    export class SyntaxTree {
        private _sourceUnit: SourceUnitSyntax;
        private _isDeclaration: boolean;
        private _parserDiagnostics: Diagnostic[];
        private _allDiagnostics: Diagnostic[] = null;
        private _fileName: string;
        private _lineMap: LineMap;
        private _parseOptions: ParseOptions;

        constructor(sourceUnit: SourceUnitSyntax,
                    isDeclaration: boolean,
                    diagnostics: Diagnostic[],
                    fileName: string,
                    lineMap: LineMap,
                    parseOtions: ParseOptions) {
            this._sourceUnit = sourceUnit;
            this._isDeclaration = isDeclaration;
            this._parserDiagnostics = diagnostics;
            this._fileName = fileName;
            this._lineMap = lineMap;
            this._parseOptions = parseOtions;
        }

        public toJSON(key: any): any {
            var result: any = {};

            result.isDeclaration = this._isDeclaration;
            result.languageVersion = LanguageVersion[this._parseOptions.languageVersion()];
            result.parseOptions = this._parseOptions;

            if (this.diagnostics().length > 0) {
                result.diagnostics = this.diagnostics();
            }

            result.sourceUnit = this._sourceUnit;
            result.lineMap = this._lineMap;

            return result;
        }

        public sourceUnit(): SourceUnitSyntax {
            return this._sourceUnit;
        }

        public isDeclaration(): boolean {
            return this._isDeclaration;
        }

        private computeDiagnostics(): Diagnostic[] {
            if (this._parserDiagnostics.length > 0) {
                return this._parserDiagnostics;
            }

            // No parser reported diagnostics.  Check for any additional grammar diagnostics.
            var diagnostics: Diagnostic[] = [];
            this.sourceUnit().accept(new GrammarCheckerWalker(this, diagnostics));

            return diagnostics;
        }

        public diagnostics(): Diagnostic[] {
            if (this._allDiagnostics === null) {
                this._allDiagnostics = this.computeDiagnostics();
            }

            return this._allDiagnostics;
        }

        public fileName(): string {
            return this._fileName;
        }

        public lineMap(): LineMap {
            return this._lineMap;
        }

        public parseOptions(): ParseOptions {
            return this._parseOptions;
        }

        public structuralEquals(tree: SyntaxTree): boolean {
            return ArrayUtilities.sequenceEquals(this.diagnostics(), tree.diagnostics(), Diagnostic.equals) &&
                this.sourceUnit().structuralEquals(tree.sourceUnit());
        }
    }

    class GrammarCheckerWalker extends PositionTrackingWalker {
        private inAmbientDeclaration: boolean = false;
        private inBlock: boolean = false;
        private inObjectLiteralExpression: boolean = false;
        private currentConstructor: ConstructorDeclarationSyntax = null;

        constructor(private syntaxTree: SyntaxTree,
                    private diagnostics: Diagnostic[]) {
            super();
        }

        private childFullStart(parent: ISyntaxElement, child: ISyntaxElement): number {
            return this.position() + Syntax.childOffset(parent, child);
        }

        private childStart(parent: ISyntaxNode, child: ISyntaxElement): number {
            return this.childFullStart(parent, child) + child.leadingTriviaWidth();
        }

        private pushDiagnostic(start: number, length: number, diagnosticKey: string, args: any[] = null): void {
            this.diagnostics.push(new Diagnostic(
                this.syntaxTree.fileName(), this.syntaxTree.lineMap(), start, length, diagnosticKey, args));
        }

        private pushDiagnostic1(elementFullStart: number, element: ISyntaxElement, diagnosticKey: string, args: any[] = null): void {
            this.diagnostics.push(new Diagnostic(
                this.syntaxTree.fileName(), this.syntaxTree.lineMap(), elementFullStart + element.leadingTriviaWidth(), element.width(), diagnosticKey, args));
        }

        public visitCatchClause(node: CatchClauseSyntax): void {
            if (node.typeAnnotation) {
                this.pushDiagnostic(
                    this.childStart(node, node.typeAnnotation),
                    node.typeAnnotation.width(),
                    DiagnosticCode.Catch_clause_parameter_cannot_have_a_type_annotation);
            }

            super.visitCatchClause(node);
        }

        private checkParameterListOrder(node: ParameterListSyntax): boolean {
            var parameterFullStart = this.childFullStart(node, node.parameters);

            var seenOptionalParameter = false;
            var parameterCount = node.parameters.nonSeparatorCount();

            for (var i = 0, n = node.parameters.childCount(); i < n; i++) {
                var nodeOrToken = node.parameters.childAt(i);
                if (i % 2 === 0) {
                    var parameterIndex = i / 2;
                    var parameter = <ParameterSyntax>node.parameters.childAt(i);

                    if (parameter.dotDotDotToken) {
                        if (parameterIndex !== (parameterCount - 1)) {
                            this.pushDiagnostic1(
                                parameterFullStart, parameter,
                                DiagnosticCode.Rest_parameter_must_be_last_in_list);
                            return true;
                        }

                        if (parameter.questionToken) {
                            this.pushDiagnostic1(
                                parameterFullStart, parameter,
                                DiagnosticCode.Rest_parameter_cannot_be_optional);
                            return true;
                        }

                        if (parameter.equalsValueClause) {
                            this.pushDiagnostic1(
                                parameterFullStart, parameter,
                                DiagnosticCode.Rest_parameter_cannot_have_an_initializer);
                            return true;
                        }
                    }
                    else if (parameter.questionToken || parameter.equalsValueClause) {
                        seenOptionalParameter = true;

                        if (parameter.questionToken && parameter.equalsValueClause) {
                            this.pushDiagnostic1(
                                parameterFullStart, parameter,
                                DiagnosticCode.Parameter_cannot_have_question_mark_and_initializer);
                            return true;
                        }
                    }
                    else {
                        if (seenOptionalParameter) {
                            this.pushDiagnostic1(
                                parameterFullStart, parameter,
                                DiagnosticCode.Required_parameter_cannot_follow_optional_parameter);
                            return true;
                        }
                    }
                }

                parameterFullStart += nodeOrToken.fullWidth();
            }

            return false;
        }

        private checkParameterListAcessibilityModifiers(node: ParameterListSyntax): boolean {
            var parameterFullStart = this.childFullStart(node, node.parameters);

            for (var i = 0, n = node.parameters.childCount(); i < n; i++) {
                var nodeOrToken = node.parameters.childAt(i);
                if (i % 2 === 0) {
                    var parameter = <ParameterSyntax>node.parameters.childAt(i);

                    if (this.checkParameterAccessibilityModifiers(node, parameter, parameterFullStart)) {
                        return true;
                    }
                }

                parameterFullStart += nodeOrToken.fullWidth();
            }

            return false;
        }

        private checkParameterAccessibilityModifiers(parameterList: ParameterListSyntax, parameter: ParameterSyntax, parameterFullStart: number): boolean {
            if (parameter.modifiers.childCount() > 0) {
                var modifiers = parameter.modifiers;
                var modifierFullStart = parameterFullStart + Syntax.childOffset(parameter, modifiers);

                for (var i = 0, n = modifiers.childCount(); i < n; i++) {
                    var modifier = <ISyntaxToken>modifiers.childAt(i);

                    if (this.checkParameterAccessibilityModifier(parameterList, modifier, modifierFullStart, i)) {
                        return true;
                    }

                    modifierFullStart += modifier.fullWidth();
                }
            }

            return false;
        }

        private checkParameterAccessibilityModifier(parameterList: ParameterListSyntax, modifier: ISyntaxToken, modifierFullStart: number, modifierIndex: number): boolean {
            if (modifier.tokenKind !== SyntaxKind.PublicKeyword && modifier.tokenKind !== SyntaxKind.PrivateKeyword) {
                this.pushDiagnostic1(modifierFullStart, modifier,
                    DiagnosticCode._0_modifier_cannot_appear_on_a_parameter, [modifier.text()]);
                return true;
            }
            else {
                if (modifierIndex > 0) {
                    this.pushDiagnostic1(modifierFullStart, modifier, DiagnosticCode.Accessibility_modifier_already_seen);
                    return true;
                }

                if (!this.inAmbientDeclaration && this.currentConstructor && !this.currentConstructor.block && this.currentConstructor.callSignature.parameterList === parameterList) {
                    this.pushDiagnostic1(modifierFullStart, modifier,
                        DiagnosticCode.Parameter_property_declarations_cannot_be_used_in_a_constructor_overload);
                    return true;
                }
                else if (this.inAmbientDeclaration || this.currentConstructor === null || this.currentConstructor.callSignature.parameterList !== parameterList) {
                    this.pushDiagnostic1(modifierFullStart, modifier,
                        DiagnosticCode.Parameter_property_declarations_can_only_be_used_in_a_non_ambient_constructor_declaration);
                    return true;
                }
            }

            return false;
        }

        private checkForTrailingSeparator(parent: ISyntaxElement, list: ISeparatedSyntaxList): boolean {
            // If we have at least one child, and we have an even number of children, then that 
            // means we have an illegal trailing separator.
            if (list.childCount() === 0 || list.childCount() % 2 === 1) {
                return false;
            }

            var currentElementFullStart = this.childFullStart(parent, list);

            for (var i = 0, n = list.childCount(); i < n; i++) {
                var child = list.childAt(i);
                if (i === n - 1) {
                    this.pushDiagnostic1(currentElementFullStart, child, DiagnosticCode.Trailing_separator_not_allowed);
                }

                currentElementFullStart += child.fullWidth();
            }

            return true;
        }

        private checkForAtLeastOneElement(parent: ISyntaxElement, list: ISeparatedSyntaxList, expected: string): boolean {
            if (list.childCount() > 0) {
                return false;
            }

            var listFullStart = this.childFullStart(parent, list);
            var tokenAtStart = this.syntaxTree.sourceUnit().findToken(listFullStart);

            this.pushDiagnostic1(listFullStart, tokenAtStart.token(), DiagnosticCode.Unexpected_token_0_expected, [expected]);

            return true;
        }

        public visitParameterList(node: ParameterListSyntax): void {
            if (this.checkParameterListAcessibilityModifiers(node) ||
                this.checkParameterListOrder(node) ||
                this.checkForTrailingSeparator(node, node.parameters)) {

                this.skip(node);
                return;
            }

            super.visitParameterList(node);
        }

        public visitHeritageClause(node: HeritageClauseSyntax): void {
            if (this.checkForTrailingSeparator(node, node.typeNames) ||
                this.checkForAtLeastOneElement(node, node.typeNames, getLocalizedText(DiagnosticCode.type_name, null))) {
                this.skip(node);
                return;
            }

            super.visitHeritageClause(node);
        }

        public visitArgumentList(node: ArgumentListSyntax): void {
            if (this.checkForTrailingSeparator(node, node.arguments)) {
                this.skip(node);
                return;
            }

            super.visitArgumentList(node);
        }

        public visitVariableDeclaration(node: VariableDeclarationSyntax): void {
            if (this.checkForTrailingSeparator(node, node.variableDeclarators) ||
                this.checkForAtLeastOneElement(node, node.variableDeclarators, getLocalizedText(DiagnosticCode.identifier, null))) {
                this.skip(node);
                return;
            }

            super.visitVariableDeclaration(node);
        }

        public visitTypeArgumentList(node: TypeArgumentListSyntax): void {
            if (this.checkForTrailingSeparator(node, node.typeArguments) ||
                this.checkForAtLeastOneElement(node, node.typeArguments, getLocalizedText(DiagnosticCode.identifier, null))) {
                this.skip(node);
                return;
            }

            super.visitTypeArgumentList(node);
        }

        public visitTypeParameterList(node: TypeParameterListSyntax): void {
            if (this.checkForTrailingSeparator(node, node.typeParameters) ||
                this.checkForAtLeastOneElement(node, node.typeParameters, getLocalizedText(DiagnosticCode.identifier, null))) {
                this.skip(node);
                return;
            }

            super.visitTypeParameterList(node);
        }

        private checkIndexSignatureParameter(node: IndexSignatureSyntax): boolean {
            var parameterFullStart = this.childFullStart(node, node.parameter);
            var parameter = node.parameter;

            if (parameter.dotDotDotToken) {
                this.pushDiagnostic1(
                    parameterFullStart, parameter,
                    DiagnosticCode.Index_signatures_cannot_have_rest_parameters);
                return true;
            }
            else if (parameter.modifiers.childCount() > 0) {
                this.pushDiagnostic1(
                    parameterFullStart, parameter,
                    DiagnosticCode.Index_signature_parameter_cannot_have_accessibility_modifiers);
                return true;
            }
            else if (parameter.questionToken) {
                this.pushDiagnostic1(
                    parameterFullStart, parameter,
                    DiagnosticCode.Index_signature_parameter_cannot_have_a_question_mark);
                return true;
            }
            else if (parameter.equalsValueClause) {
                this.pushDiagnostic1(
                    parameterFullStart, parameter,
                    DiagnosticCode.Index_signature_parameter_cannot_have_an_initializer);
                return true;
            }
            else if (!parameter.typeAnnotation) {
                this.pushDiagnostic1(
                    parameterFullStart, parameter,
                    DiagnosticCode.Index_signature_parameter_must_have_a_type_annotation);
                return true;
            }
            else if (parameter.typeAnnotation.type.kind() !== SyntaxKind.StringKeyword &&
                     parameter.typeAnnotation.type.kind() !== SyntaxKind.NumberKeyword) {
                this.pushDiagnostic1(
                    parameterFullStart, parameter,
                    DiagnosticCode.Index_signature_parameter_type_must_be_string_or_number);
                return true;
            }

            return false;
        }

        public visitIndexSignature(node: IndexSignatureSyntax): void {
            if (this.checkIndexSignatureParameter(node)) {
                this.skip(node);
                return;
            }

            if (!node.typeAnnotation) {
                this.pushDiagnostic1(this.position(), node,
                    DiagnosticCode.Index_signature_must_have_a_type_annotation);
                this.skip(node);
                return;
            }

            super.visitIndexSignature(node);
        }

        private checkClassDeclarationHeritageClauses(node: ClassDeclarationSyntax): boolean {
            var heritageClauseFullStart = this.childFullStart(node, node.heritageClauses);

            var seenExtendsClause = false;
            var seenImplementsClause = false;

            for (var i = 0, n = node.heritageClauses.childCount(); i < n; i++) {
                Debug.assert(i <= 2);
                var heritageClause = <HeritageClauseSyntax>node.heritageClauses.childAt(i);

                if (heritageClause.extendsOrImplementsKeyword.tokenKind === SyntaxKind.ExtendsKeyword) {
                    if (seenExtendsClause) {
                        this.pushDiagnostic1(heritageClauseFullStart, heritageClause,
                            DiagnosticCode.extends_clause_already_seen);
                        return true;
                    }

                    if (seenImplementsClause) {
                        this.pushDiagnostic1(heritageClauseFullStart, heritageClause,
                            DiagnosticCode.extends_clause_must_precede_implements_clause);
                        return true;
                    }

                    if (heritageClause.typeNames.nonSeparatorCount() > 1) {
                        this.pushDiagnostic1(heritageClauseFullStart, heritageClause,
                            DiagnosticCode.Classes_can_only_extend_a_single_class);
                        return true;
                    }

                    seenExtendsClause = true;
                }
                else {
                    Debug.assert(heritageClause.extendsOrImplementsKeyword.tokenKind === SyntaxKind.ImplementsKeyword);
                    if (seenImplementsClause) {
                        this.pushDiagnostic1(heritageClauseFullStart, heritageClause,
                            DiagnosticCode.implements_clause_already_seen);
                        return true;
                    }

                    seenImplementsClause = true;
                }

                heritageClauseFullStart += heritageClause.fullWidth();
            }

            return false;
        }

        private checkForDisallowedDeclareModifier(modifiers: ISyntaxList): boolean {
            if (this.inAmbientDeclaration) {
                // If we're already in an ambient declaration, then 'declare' is not allowed.
                var declareToken = SyntaxUtilities.getToken(modifiers, SyntaxKind.DeclareKeyword);

                if (declareToken) {
                    this.pushDiagnostic1(this.childFullStart(modifiers, declareToken), declareToken,
                        DiagnosticCode.declare_modifier_not_allowed_for_code_already_in_an_ambient_context);
                    return true;
                }
            }

            return false;
        }

        private checkForRequiredDeclareModifier(moduleElement: IModuleElementSyntax,
                                                typeKeyword: ISyntaxElement,
                                                modifiers: ISyntaxList): boolean {
            if (!this.inAmbientDeclaration && this.syntaxTree.isDeclaration()) {
                // We're at the top level in a declaration file, a 'declare' modifiers is required
                // on most module elements.
                if (!SyntaxUtilities.containsToken(modifiers, SyntaxKind.DeclareKeyword)) {
                    this.pushDiagnostic1(this.childFullStart(moduleElement, typeKeyword), typeKeyword.firstToken(),
                        DiagnosticCode.declare_modifier_required_for_top_level_element);
                    return true;
                }
            }
        }

        private checkFunctionOverloads(node: ISyntaxElement, moduleElements: ISyntaxList): boolean {
            if (!this.inAmbientDeclaration && !this.syntaxTree.isDeclaration()) {
                var moduleElementFullStart = this.childFullStart(node, moduleElements);

                var inFunctionOverloadChain = false;
                var functionOverloadChainName: string = null;

                for (var i = 0, n = moduleElements.childCount(); i < n; i++) {
                    var moduleElement = <IModuleElementSyntax>moduleElements.childAt(i);
                    var lastElement = i === (n - 1);

                    if (inFunctionOverloadChain) {
                        if (moduleElement.kind() !== SyntaxKind.FunctionDeclaration) {
                            this.pushDiagnostic1(moduleElementFullStart, moduleElement.firstToken(),
                                DiagnosticCode.Function_implementation_expected);
                            return true;
                        }

                        var functionDeclaration = <FunctionDeclarationSyntax>moduleElement;
                        if (functionDeclaration.identifier.valueText() !== functionOverloadChainName) {
                            var identifierFullStart = moduleElementFullStart + Syntax.childOffset(moduleElement, functionDeclaration.identifier);
                            this.pushDiagnostic1(identifierFullStart, functionDeclaration.identifier,
                                DiagnosticCode.Function_overload_name_must_be_0, [functionOverloadChainName]);
                            return true;
                        }
                    }

                    if (moduleElement.kind() === SyntaxKind.FunctionDeclaration) {
                        functionDeclaration = <FunctionDeclarationSyntax>moduleElement;
                        if (!SyntaxUtilities.containsToken(functionDeclaration.modifiers, SyntaxKind.DeclareKeyword)) {
                            inFunctionOverloadChain = functionDeclaration.block === null;
                            functionOverloadChainName = functionDeclaration.identifier.valueText();

                            if (inFunctionOverloadChain) {
                                if (lastElement) {
                                    this.pushDiagnostic1(moduleElementFullStart, moduleElement.firstToken(),
                                        DiagnosticCode.Function_implementation_expected);
                                    return true;
                                }
                                else {
                                    // We're a function without a body, and there's another element 
                                    // after us.  If it's another overload that doesn't have a body,
                                    // then report an error that we're missing an implementation here.

                                    var nextElement = moduleElements.childAt(i + 1);
                                    if (nextElement.kind() === SyntaxKind.FunctionDeclaration) {
                                        var nextFunction = <FunctionDeclarationSyntax>nextElement;

                                        if (nextFunction.identifier.valueText() !== functionOverloadChainName &&
                                            nextFunction.block === null) {

                                            var identifierFullStart = moduleElementFullStart + Syntax.childOffset(moduleElement, functionDeclaration.identifier);
                                            this.pushDiagnostic1(identifierFullStart, functionDeclaration.identifier, DiagnosticCode.Function_implementation_expected);
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            inFunctionOverloadChain = false;
                            functionOverloadChainName = "";
                        }
                    }

                    moduleElementFullStart += moduleElement.fullWidth();
                }
            }

            return false;
        }

        private checkClassOverloads(node: ClassDeclarationSyntax): boolean {
            if (!this.inAmbientDeclaration && !SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword)) {
                var classElementFullStart = this.childFullStart(node, node.classElements);

                var inFunctionOverloadChain = false;
                var inConstructorOverloadChain = false;

                var functionOverloadChainName: string = null;
                var isInStaticOverloadChain: boolean = null;
                var memberFunctionDeclaration: MemberFunctionDeclarationSyntax = null;

                for (var i = 0, n = node.classElements.childCount(); i < n; i++) {
                    var classElement = <IClassElementSyntax>node.classElements.childAt(i);
                    var lastElement = i === (n - 1);
                    var isStaticOverload: boolean = null;

                    if (inFunctionOverloadChain) {
                        if (classElement.kind() !== SyntaxKind.MemberFunctionDeclaration) {
                            this.pushDiagnostic1(classElementFullStart, classElement.firstToken(),
                                DiagnosticCode.Function_implementation_expected);
                            return true;
                        }

                        memberFunctionDeclaration = <MemberFunctionDeclarationSyntax>classElement;
                        if (memberFunctionDeclaration.propertyName.valueText() !== functionOverloadChainName) {
                            var propertyNameFullStart = classElementFullStart + Syntax.childOffset(classElement, memberFunctionDeclaration.propertyName);
                            this.pushDiagnostic1(propertyNameFullStart, memberFunctionDeclaration.propertyName,
                                DiagnosticCode.Function_overload_name_must_be_0, [functionOverloadChainName]);
                            return true;
                        }

                        isStaticOverload = SyntaxUtilities.containsToken(memberFunctionDeclaration.modifiers, SyntaxKind.StaticKeyword);
                        if (isStaticOverload !== isInStaticOverloadChain) {
                            var propertyNameFullStart = classElementFullStart + Syntax.childOffset(classElement, memberFunctionDeclaration.propertyName);
                            var diagnostic = isInStaticOverloadChain ? DiagnosticCode.Function_overload_must_be_static : DiagnosticCode.Function_overload_must_not_be_static;
                            this.pushDiagnostic1(propertyNameFullStart, memberFunctionDeclaration.propertyName,
                                diagnostic, null);
                            return true;
                        }
                    }
                    else if (inConstructorOverloadChain) {
                        if (classElement.kind() !== SyntaxKind.ConstructorDeclaration) {
                            this.pushDiagnostic1(classElementFullStart, classElement.firstToken(),
                                DiagnosticCode.Constructor_implementation_expected);
                            return true;
                        }
                    }

                    if (classElement.kind() === SyntaxKind.MemberFunctionDeclaration) {
                        memberFunctionDeclaration = <MemberFunctionDeclarationSyntax>classElement;

                        inFunctionOverloadChain = memberFunctionDeclaration.block === null;
                        functionOverloadChainName = memberFunctionDeclaration.propertyName.valueText();
                        isInStaticOverloadChain = SyntaxUtilities.containsToken(memberFunctionDeclaration.modifiers, SyntaxKind.StaticKeyword);

                        if (inFunctionOverloadChain) {
                            if (lastElement) {
                                this.pushDiagnostic1(classElementFullStart, classElement.firstToken(),
                                    DiagnosticCode.Function_implementation_expected);
                                return true;
                            }
                            else {
                                // We're a function without a body, and there's another element 
                                // after us.  If it's another overload that doesn't have a body,
                                // then report an error that we're missing an implementation here.

                                var nextElement = node.classElements.childAt(i + 1);
                                if (nextElement.kind() === SyntaxKind.MemberFunctionDeclaration) {
                                    var nextMemberFunction = <MemberFunctionDeclarationSyntax>nextElement;

                                    if (nextMemberFunction.propertyName.valueText() !== functionOverloadChainName &&
                                        nextMemberFunction.block === null) {

                                        var propertyNameFullStart = classElementFullStart + Syntax.childOffset(classElement, memberFunctionDeclaration.propertyName);
                                        this.pushDiagnostic1(propertyNameFullStart, memberFunctionDeclaration.propertyName, DiagnosticCode.Function_implementation_expected);
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                    else if (classElement.kind() === SyntaxKind.ConstructorDeclaration) {
                        var constructorDeclaration = <ConstructorDeclarationSyntax>classElement;

                        inConstructorOverloadChain = constructorDeclaration.block === null;
                        if (lastElement && inConstructorOverloadChain) {
                            this.pushDiagnostic1(classElementFullStart, classElement.firstToken(),
                                DiagnosticCode.Constructor_implementation_expected);
                            return true;
                        }
                    }

                    classElementFullStart += classElement.fullWidth();
                }
            }

            return false;
        }

        private checkForReservedName(parent: ISyntaxElement, name: INameSyntax, diagnosticKey: string): boolean {
            var nameFullStart = this.childFullStart(parent, name);
            var token: ISyntaxToken;
            var tokenFullStart: number;

            var current = name;
            while (current !== null) {
                if (current.kind() === SyntaxKind.QualifiedName) {
                    var qualifiedName = <QualifiedNameSyntax>current;
                    token = qualifiedName.right;
                    tokenFullStart = nameFullStart + this.childFullStart(qualifiedName, token);
                    current = qualifiedName.left;
                }
                else {
                    Debug.assert(current.kind() === SyntaxKind.IdentifierName);
                    token = <ISyntaxToken>current;
                    tokenFullStart = nameFullStart;
                    current = null;
                }

                switch (token.valueText()) {
                    case "any":
                    case "number":
                    case "boolean":
                    case "string":
                    case "void":
                        this.pushDiagnostic(tokenFullStart + token.leadingTriviaWidth(), token.width(), diagnosticKey, [token.valueText()]);
                        return true;
                }
            }

            return false;
        }

        public visitClassDeclaration(node: ClassDeclarationSyntax): void {
            if (this.checkForReservedName(node, node.identifier, DiagnosticCode.Class_name_cannot_be_0) ||
                this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, node.classKeyword, node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers) ||
                this.checkClassDeclarationHeritageClauses(node) ||
                this.checkClassOverloads(node)) {

                this.skip(node);
                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitClassDeclaration(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        private checkInterfaceDeclarationHeritageClauses(node: InterfaceDeclarationSyntax): boolean {
            var heritageClauseFullStart = this.childFullStart(node, node.heritageClauses);

            var seenExtendsClause = false;

            for (var i = 0, n = node.heritageClauses.childCount(); i < n; i++) {
                Debug.assert(i <= 1);
                var heritageClause = <HeritageClauseSyntax>node.heritageClauses.childAt(i);

                if (heritageClause.extendsOrImplementsKeyword.tokenKind === SyntaxKind.ExtendsKeyword) {
                    if (seenExtendsClause) {
                        this.pushDiagnostic1(heritageClauseFullStart, heritageClause,
                            DiagnosticCode.extends_clause_already_seen);
                        return true;
                    }

                    seenExtendsClause = true;
                }
                else {
                    Debug.assert(heritageClause.extendsOrImplementsKeyword.tokenKind === SyntaxKind.ImplementsKeyword);
                    this.pushDiagnostic1(heritageClauseFullStart, heritageClause,
                        DiagnosticCode.Interface_declaration_cannot_have_implements_clause);
                    return true;
                }

                heritageClauseFullStart += heritageClause.fullWidth();
            }

            return false;
        }

        private checkInterfaceModifiers(modifiers: ISyntaxList): boolean {
            var modifierFullStart = this.position();

            for (var i = 0, n = modifiers.childCount(); i < n; i++) {
                var modifier = <ISyntaxToken>modifiers.childAt(i);
                if (modifier.tokenKind === SyntaxKind.DeclareKeyword) {
                    this.pushDiagnostic1(modifierFullStart, modifier,
                        DiagnosticCode.declare_modifier_cannot_appear_on_an_interface_declaration);
                    return true;
                }

                modifierFullStart += modifier.fullWidth();
            }

            return false;
        }

        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void {
            if (this.checkForReservedName(node, node.identifier, DiagnosticCode.Interface_name_cannot_be_0) ||
                this.checkInterfaceModifiers(node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers) ||
                this.checkInterfaceDeclarationHeritageClauses(node)) {

                this.skip(node);
                return;
            }

            super.visitInterfaceDeclaration(node);
        }

        private checkClassElementModifiers(list: ISyntaxList): boolean {
            var modifierFullStart = this.position();

            var seenAccessibilityModifier = false;
            var seenStaticModifier = false;

            for (var i = 0, n = list.childCount(); i < n; i++) {
                var modifier = <ISyntaxToken>list.childAt(i);
                if (modifier.tokenKind === SyntaxKind.PublicKeyword ||
                    modifier.tokenKind === SyntaxKind.PrivateKeyword) {

                    if (seenAccessibilityModifier) {
                        this.pushDiagnostic1(modifierFullStart, modifier,
                            DiagnosticCode.Accessibility_modifier_already_seen);
                        return true;
                    }

                    if (seenStaticModifier) {
                        var previousToken = <ISyntaxToken>list.childAt(i - 1);
                        this.pushDiagnostic1(modifierFullStart, modifier,
                            DiagnosticCode._0_modifier_must_precede_1_modifier, [modifier.text(), previousToken.text()]);
                        return true;
                    }

                    seenAccessibilityModifier = true;
                }
                else if (modifier.tokenKind === SyntaxKind.StaticKeyword) {
                    if (seenStaticModifier) {
                        this.pushDiagnostic1(modifierFullStart, modifier,
                            DiagnosticCode._0_modifier_already_seen, [modifier.text()]);
                        return true;
                    }

                    seenStaticModifier = true;
                }
                else {
                    this.pushDiagnostic1(modifierFullStart, modifier,
                        DiagnosticCode._0_modifier_cannot_appear_on_a_class_element, [modifier.text()]);
                    return true;
                }

                modifierFullStart += modifier.fullWidth();
            }

            return false;
        }

        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void {
            if (this.checkClassElementModifiers(node.modifiers)) {
                this.skip(node);
                return;
            }

            super.visitMemberVariableDeclaration(node);
        }

        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void {
            if (this.checkClassElementModifiers(node.modifiers)) {
                this.skip(node);
                return;
            }

            super.visitMemberFunctionDeclaration(node);
        }

        private checkGetAccessorParameter(node: SyntaxNode, getKeyword: ISyntaxToken, parameterList: ParameterListSyntax): boolean {
            var getKeywordFullStart = this.childFullStart(node, getKeyword);
            if (parameterList.parameters.childCount() !== 0) {
                this.pushDiagnostic1(getKeywordFullStart, getKeyword,
                    DiagnosticCode.get_accessor_cannot_have_parameters);
                return true;
            }

            return false;
        }

        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): void {
            if (this.checkIndexMemberModifiers(node)) {
                this.skip(node);
                return;
            }

            super.visitIndexMemberDeclaration(node);
        }

        private checkIndexMemberModifiers(node: IndexMemberDeclarationSyntax): boolean {
            if (node.modifiers.childCount() > 0) {
                var modifierFullStart = this.childFullStart(node, node.modifiers);
                this.pushDiagnostic1(modifierFullStart, node.modifiers.childAt(0), DiagnosticCode.Modifiers_cannot_appear_here);
                return true;
            }

            return false;
        }

        private checkEcmaScriptVersionIsAtLeast(parent: ISyntaxElement, node: ISyntaxElement, languageVersion: LanguageVersion, diagnosticKey: string): boolean {
            if (this.syntaxTree.parseOptions().languageVersion() < languageVersion) {
                var nodeFullStart = this.childFullStart(parent, node);
                this.pushDiagnostic1(nodeFullStart, node, diagnosticKey);
                return true;
            }

            return false;
        }

        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void {
            var savedInObjectLiteralExpression = this.inObjectLiteralExpression;
            this.inObjectLiteralExpression = true;
            super.visitObjectLiteralExpression(node);
            this.inObjectLiteralExpression = savedInObjectLiteralExpression;
        }

        public visitGetAccessor(node: GetAccessorSyntax): void {
            if (this.checkForAccessorDeclarationInAmbientContext(node) ||
                this.checkEcmaScriptVersionIsAtLeast(node, node.getKeyword, LanguageVersion.EcmaScript5, DiagnosticCode.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher) ||
                this.checkForDisallowedModifiers(node, node.modifiers) ||
                this.checkClassElementModifiers(node.modifiers) ||
                this.checkGetAccessorParameter(node, node.getKeyword, node.parameterList)) {
                this.skip(node);
                return;
            }

            super.visitGetAccessor(node);
        }

        private checkForAccessorDeclarationInAmbientContext(accessor: SyntaxNode): boolean {
            if (this.inAmbientDeclaration) {
                this.pushDiagnostic1(this.position(), accessor, DiagnosticCode.Accessors_are_not_allowed_in_ambient_contexts, null);
                return true;
            }

            return false;
        }

        private checkSetAccessorParameter(node: SyntaxNode, setKeyword: ISyntaxToken, parameterList: ParameterListSyntax): boolean {
            var setKeywordFullStart = this.childFullStart(node, setKeyword);
            if (parameterList.parameters.childCount() !== 1) {
                this.pushDiagnostic1(setKeywordFullStart, setKeyword,
                    DiagnosticCode.set_accessor_must_have_one_and_only_one_parameter);
                return true;
            }

            var parameterListFullStart = this.childFullStart(node, parameterList);
            var parameterFullStart = parameterListFullStart + Syntax.childOffset(parameterList, parameterList.openParenToken);
            var parameter = <ParameterSyntax>parameterList.parameters.childAt(0);

            if (parameter.questionToken) {
                this.pushDiagnostic1(parameterFullStart, parameter,
                    DiagnosticCode.set_accessor_parameter_cannot_be_optional);
                return true;
            }

            if (parameter.equalsValueClause) {
                this.pushDiagnostic1(parameterFullStart, parameter,
                    DiagnosticCode.set_accessor_parameter_cannot_have_an_initializer);
                return true;
            }

            if (parameter.dotDotDotToken) {
                this.pushDiagnostic1(parameterFullStart, parameter,
                    DiagnosticCode.set_accessor_cannot_have_rest_parameter);
                return true;
            }

            return false;
        }

        public visitSetAccessor(node: SetAccessorSyntax): void {
            if (this.checkForAccessorDeclarationInAmbientContext(node) ||
                this.checkEcmaScriptVersionIsAtLeast(node, node.setKeyword, LanguageVersion.EcmaScript5, DiagnosticCode.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher) ||
                this.checkForDisallowedModifiers(node, node.modifiers) ||
                this.checkClassElementModifiers(node.modifiers) ||
                this.checkSetAccessorParameter(node, node.setKeyword, node.parameterList)) {
                this.skip(node);
                return;
            }

            super.visitSetAccessor(node);
        }

        public visitEnumDeclaration(node: EnumDeclarationSyntax): void {
            if (this.checkForReservedName(node, node.identifier, DiagnosticCode.Enum_name_cannot_be_0) ||
                this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, node.enumKeyword, node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers),
                this.checkEnumElements(node)) {

                this.skip(node);
                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitEnumDeclaration(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        private checkEnumElements(node: EnumDeclarationSyntax): boolean {
            var enumElementFullStart = this.childFullStart(node, node.enumElements);

            var previousValueWasComputed = false;
            for (var i = 0, n = node.enumElements.childCount(); i < n; i++) {
                var child = node.enumElements.childAt(i);

                if (i % 2 === 0) {
                    var enumElement = <EnumElementSyntax>child;

                    if (!enumElement.equalsValueClause && previousValueWasComputed) {
                        this.pushDiagnostic1(enumElementFullStart, enumElement, DiagnosticCode.Enum_member_must_have_initializer, null);
                        return true;
                    }

                    if (enumElement.equalsValueClause) {
                        var value = enumElement.equalsValueClause.value;
                        previousValueWasComputed = !Syntax.isIntegerLiteral(value);
                    }
                }

                enumElementFullStart += child.fullWidth();
            }

            return false;
        }

        public visitEnumElement(node: EnumElementSyntax): void {
            if (this.inAmbientDeclaration && node.equalsValueClause) {
                var expression = node.equalsValueClause.value;
                if (!Syntax.isIntegerLiteral(expression)) {
                    this.pushDiagnostic1(this.childFullStart(node, node.equalsValueClause), node.equalsValueClause.firstToken(),
                        DiagnosticCode.Ambient_enum_elements_can_only_have_integer_literal_initializers);
                    this.skip(node);
                    return;
                }
            }

            super.visitEnumElement(node);
        }

        public visitInvocationExpression(node: InvocationExpressionSyntax): void {
            if (node.expression.kind() === SyntaxKind.SuperKeyword &&
                node.argumentList.typeArgumentList !== null) {
                this.pushDiagnostic1(this.position(), node,
                    DiagnosticCode.super_invocation_cannot_have_type_arguments);
            }

            super.visitInvocationExpression(node);
        }

        private checkModuleElementModifiers(modifiers: ISyntaxList): boolean {
            var modifierFullStart = this.position();
            var seenExportModifier = false;
            var seenDeclareModifier = false;

            for (var i = 0, n = modifiers.childCount(); i < n; i++) {
                var modifier = <ISyntaxToken>modifiers.childAt(i);
                if (modifier.tokenKind === SyntaxKind.PublicKeyword ||
                    modifier.tokenKind === SyntaxKind.PrivateKeyword ||
                    modifier.tokenKind === SyntaxKind.StaticKeyword) {
                    this.pushDiagnostic1(modifierFullStart, modifier,
                        DiagnosticCode._0_modifier_cannot_appear_on_a_module_element, [modifier.text()]);
                    return true;
                }

                if (modifier.tokenKind === SyntaxKind.DeclareKeyword) {
                    if (seenDeclareModifier) {
                        this.pushDiagnostic1(modifierFullStart, modifier,
                            DiagnosticCode.Accessibility_modifier_already_seen);
                        return;
                    }

                    seenDeclareModifier = true;
                }
                else if (modifier.tokenKind === SyntaxKind.ExportKeyword) {
                    if (seenExportModifier) {
                        this.pushDiagnostic1(modifierFullStart, modifier,
                            DiagnosticCode._0_modifier_already_seen, [modifier.text()]);
                        return;
                    }

                    if (seenDeclareModifier) {
                        this.pushDiagnostic1(modifierFullStart, modifier,
                            DiagnosticCode._0_modifier_must_precede_1_modifier,
                            [SyntaxFacts.getText(SyntaxKind.ExportKeyword), SyntaxFacts.getText(SyntaxKind.DeclareKeyword)]);
                        return;
                    }

                    seenExportModifier = true;
                }

                modifierFullStart += modifier.fullWidth();
            }

            return false;
        }

        private checkForDisallowedImportDeclaration(node: ModuleDeclarationSyntax): boolean {
            var currentElementFullStart = this.childFullStart(node, node.moduleElements);

            for (var i = 0, n = node.moduleElements.childCount(); i < n; i++) {
                var child = node.moduleElements.childAt(i);
                if (child.kind() === SyntaxKind.ImportDeclaration) {
                    var importDeclaration = <ImportDeclarationSyntax>child;
                    if (importDeclaration.moduleReference.kind() === SyntaxKind.ExternalModuleReference) {
                        if (node.stringLiteral === null) {
                            this.pushDiagnostic1(currentElementFullStart, importDeclaration,
                                DiagnosticCode.Import_declarations_in_an_internal_module_cannot_reference_an_external_module, null);
                        }
                    }
                }

                currentElementFullStart += child.fullWidth();
            }

            return false;
        }

        private checkForDisallowedDeclareModifierOnImportDeclaration(modifiers: ISyntaxList): boolean {
            var declareToken = SyntaxUtilities.getToken(modifiers, SyntaxKind.DeclareKeyword);

            if (declareToken) {
                this.pushDiagnostic1(this.childFullStart(modifiers, declareToken), declareToken,
                    DiagnosticCode.declare_modifier_not_allowed_on_import_declaration);
                return true;
            }
        }

        public visitImportDeclaration(node: ImportDeclarationSyntax): any {
            if (this.checkForDisallowedDeclareModifierOnImportDeclaration(node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers)) {
                this.skip(node);
                return;
            }

            super.visitImportDeclaration(node);
        }

        public visitModuleDeclaration(node: ModuleDeclarationSyntax): void {
            if (this.checkForReservedName(node, node.name, DiagnosticCode.Module_name_cannot_be_0) ||
                this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, node.moduleKeyword, node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers) ||
                this.checkForDisallowedImportDeclaration(node) ||
                this.checkForDisallowedExports(node, node.moduleElements) ||
                this.checkForMultipleExportAssignments(node, node.moduleElements)) {

                this.skip(node);
                return;
            }

            if (!SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword) && this.checkFunctionOverloads(node, node.moduleElements)) {
                this.skip(node);
                return;
            }

            if (node.stringLiteral) {
                if (!this.inAmbientDeclaration && !SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword)) {
                    var stringLiteralFullStart = this.childFullStart(node, node.stringLiteral);
                    this.pushDiagnostic1(stringLiteralFullStart, node.stringLiteral,
                        DiagnosticCode.Only_ambient_modules_can_use_quoted_names);
                    this.skip(node);
                    return;
                }
            }

            if (!node.stringLiteral &&
                this.checkForDisallowedExportAssignment(node)) {

                this.skip(node);
                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitModuleDeclaration(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        private checkForDisallowedExports(node: ISyntaxElement, moduleElements: ISyntaxList): boolean {
            var seenExportedElement = false;
            for (var i = 0, n = moduleElements.childCount(); i < n; i++) {
                var child = <IModuleElementSyntax>moduleElements.childAt(i);

                if (SyntaxUtilities.hasExportKeyword(child)) {
                    seenExportedElement = true;
                    break;
                }
            }

            var moduleElementFullStart = this.childFullStart(node, moduleElements);
            if (seenExportedElement) {
                for (var i = 0, n = moduleElements.childCount(); i < n; i++) {
                    var child = <IModuleElementSyntax>moduleElements.childAt(i);

                    if (child.kind() === SyntaxKind.ExportAssignment) {
                        this.pushDiagnostic1(moduleElementFullStart, child, DiagnosticCode.Export_assignment_not_allowed_in_module_with_exported_element);
                        return true;
                    }

                    moduleElementFullStart += child.fullWidth();
                }
            }

            return false;
        }

        private checkForMultipleExportAssignments(node: ISyntaxElement, moduleElements: ISyntaxList): boolean {
            var moduleElementFullStart = this.childFullStart(node, moduleElements);
            var seenExportAssignment = false;
            var errorFound = false;
            for (var i = 0, n = moduleElements.childCount(); i < n; i++) {
                var child = <IModuleElementSyntax>moduleElements.childAt(i);
                if (child.kind() === SyntaxKind.ExportAssignment) {
                    if (seenExportAssignment) {
                        this.pushDiagnostic1(moduleElementFullStart, child, DiagnosticCode.Module_cannot_have_multiple_export_assignments);
                        errorFound = true;
                    }
                    seenExportAssignment = true;
                }

                moduleElementFullStart += child.fullWidth();
            }

            return errorFound;
        }

        private checkForDisallowedExportAssignment(node: ModuleDeclarationSyntax): boolean {
            var moduleElementFullStart = this.childFullStart(node, node.moduleElements);

            for (var i = 0, n = node.moduleElements.childCount(); i < n; i++) {
                var child = node.moduleElements.childAt(i);

                if (child.kind() === SyntaxKind.ExportAssignment) {
                    this.pushDiagnostic1(moduleElementFullStart, child, DiagnosticCode.Export_assignment_cannot_be_used_in_internal_modules);

                    return true;
                }

                moduleElementFullStart += child.fullWidth();
            }

            return false;
        }

        public visitBlock(node: BlockSyntax): void {
            if (this.inAmbientDeclaration || this.syntaxTree.isDeclaration()) {
                this.pushDiagnostic1(this.position(), node.firstToken(), DiagnosticCode.Implementations_are_not_allowed_in_ambient_contexts);
                this.skip(node);
                return;
            }

            if (this.checkFunctionOverloads(node, node.statements)) {
                this.skip(node);
                return;
            }

            var savedInBlock = this.inBlock;
            this.inBlock = true;
            super.visitBlock(node);
            this.inBlock = savedInBlock;
        }

        private checkForStatementInAmbientContxt(node: IStatementSyntax): boolean {
            if (this.inAmbientDeclaration || this.syntaxTree.isDeclaration()) {
                this.pushDiagnostic1(this.position(), node.firstToken(),
                    DiagnosticCode.Statements_are_not_allowed_in_ambient_contexts);
                return true;
            }

            return false;
        }

        public visitBreakStatement(node: BreakStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitBreakStatement(node);
        }

        public visitContinueStatement(node: ContinueStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitContinueStatement(node);
        }

        public visitDebuggerStatement(node: DebuggerStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitDebuggerStatement(node);
        }

        public visitDoStatement(node: DoStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitDoStatement(node);
        }

        public visitEmptyStatement(node: EmptyStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitEmptyStatement(node);
        }

        public visitExpressionStatement(node: ExpressionStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitExpressionStatement(node);
        }

        public visitForInStatement(node: ForInStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node) ||
                this.checkForInStatementVariableDeclaration(node)) {
                this.skip(node);
                return;
            }

            super.visitForInStatement(node);
        }

        private checkForInStatementVariableDeclaration(node: ForInStatementSyntax): boolean {
            // The parser accepts a Variable Declaration in a ForInStatement, but the grammar only
            // allows a very restricted form.  Specifically, there must be only a single Variable
            // Declarator in the Declaration.
            if (node.variableDeclaration && node.variableDeclaration.variableDeclarators.nonSeparatorCount() > 1) {
                var variableDeclarationFullStart = this.childFullStart(node, node.variableDeclaration);

                this.pushDiagnostic1(variableDeclarationFullStart, node.variableDeclaration,
                    DiagnosticCode.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement);
                return true;
            }

            return false;
        }

        public visitForStatement(node: ForStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitForStatement(node);
        }

        public visitIfStatement(node: IfStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitIfStatement(node);
        }

        public visitLabeledStatement(node: LabeledStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitLabeledStatement(node);
        }

        public visitReturnStatement(node: ReturnStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitReturnStatement(node);
        }

        public visitSwitchStatement(node: SwitchStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitSwitchStatement(node);
        }

        public visitThrowStatement(node: ThrowStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitThrowStatement(node);
        }

        public visitTryStatement(node: TryStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitTryStatement(node);
        }

        public visitWhileStatement(node: WhileStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitWhileStatement(node);
        }

        public visitWithStatement(node: WithStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                this.skip(node);
                return;
            }

            super.visitWithStatement(node);
        }

        private checkForDisallowedModifiers(parent: ISyntaxElement, modifiers: ISyntaxList): boolean {
            if (this.inBlock || this.inObjectLiteralExpression) {
                if (modifiers.childCount() > 0) {
                    var modifierFullStart = this.childFullStart(parent, modifiers);
                    this.pushDiagnostic1(modifierFullStart, modifiers.childAt(0), DiagnosticCode.Modifiers_cannot_appear_here);
                    return true;
                }
            }

            return false;
        }

        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void {
            if (this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForDisallowedModifiers(node, node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, node.functionKeyword, node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers)) {

                this.skip(node);
                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitFunctionDeclaration(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        public visitVariableStatement(node: VariableStatementSyntax): void {
            if (this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForDisallowedModifiers(node, node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, node.variableDeclaration, node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers)) {

                this.skip(node);
                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitVariableStatement(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        private checkListSeparators(parent: ISyntaxElement, list: ISeparatedSyntaxList, kind: SyntaxKind): boolean {
            var currentElementFullStart = this.childFullStart(parent, list);

            for (var i = 0, n = list.childCount(); i < n; i++) {
                var child = list.childAt(i);
                if (i % 2 === 1 && child.kind() !== kind) {
                    this.pushDiagnostic1(currentElementFullStart, child, DiagnosticCode._0_expected, [SyntaxFacts.getText(kind)]);
                }

                currentElementFullStart += child.fullWidth();
            }

            return false;
        }

        public visitObjectType(node: ObjectTypeSyntax): void {
            if (this.checkListSeparators(node, node.typeMembers, SyntaxKind.SemicolonToken)) {
                this.skip(node);
                return;
            }

            // All code in an object type is implicitly ambient. (i.e. parameters can't have initializer, etc.)
            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = true;
            super.visitObjectType(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        public visitArrayType(node: ArrayTypeSyntax): void {
            // All code in an object type is implicitly ambient. (i.e. parameters can't have initializer, etc.)
            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = true;
            super.visitArrayType(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        public visitFunctionType(node: FunctionTypeSyntax): void {
            // All code in an object type is implicitly ambient. (i.e. parameters can't have initializer, etc.)
            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = true;
            super.visitFunctionType(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        public visitConstructorType(node: ConstructorTypeSyntax): void {
            // All code in an object type is implicitly ambient. (i.e. parameters can't have initializer, etc.)
            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = true;
            super.visitConstructorType(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        public visitVariableDeclarator(node: VariableDeclaratorSyntax): void {
            if (this.inAmbientDeclaration && node.equalsValueClause) {
                this.pushDiagnostic1(this.childFullStart(node, node.equalsValueClause), node.equalsValueClause.firstToken(),
                    DiagnosticCode.Initializers_are_not_allowed_in_ambient_contexts);
                this.skip(node);
                return;
            }

            super.visitVariableDeclarator(node);
        }

        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void {
            if (this.checkClassElementModifiers(node.modifiers) ||
                this.checkConstructorModifiers(node.modifiers) ||
                this.checkConstructorTypeParameterList(node) ||
                this.checkConstructorTypeAnnotation(node)) {

                this.skip(node);
                return;
            }

            var savedCurrentConstructor = this.currentConstructor;
            this.currentConstructor = node;
            super.visitConstructorDeclaration(node);
            this.currentConstructor = savedCurrentConstructor;
        }

        private checkConstructorModifiers(modifiers: ISyntaxList): boolean {
            var currentElementFullStart = this.position();

            for (var i = 0, n = modifiers.childCount(); i < n; i++) {
                var child = modifiers.childAt(i);
                if (child.kind() !== SyntaxKind.PublicKeyword) {
                    this.pushDiagnostic1(currentElementFullStart, child, DiagnosticCode._0_modifier_cannot_appear_on_a_constructor_declaration, [SyntaxFacts.getText(child.kind())]);
                    return true;
                }

                currentElementFullStart += child.fullWidth();
            }

            return false;
        }

        private checkConstructorTypeParameterList(node: ConstructorDeclarationSyntax): boolean {
            var currentElementFullStart = this.position();

            if (node.callSignature.typeParameterList) {
                var callSignatureFullStart = this.childFullStart(node, node.callSignature);
                var typeParameterListFullStart = callSignatureFullStart + Syntax.childOffset(node.callSignature, node.callSignature.typeAnnotation);
                this.pushDiagnostic1(callSignatureFullStart, node.callSignature.typeParameterList, DiagnosticCode.Type_parameters_cannot_appear_on_a_constructor_declaration);
                return true;
            }

            return false;
        }

        private checkConstructorTypeAnnotation(node: ConstructorDeclarationSyntax): boolean {
            var currentElementFullStart = this.position();

            if (node.callSignature.typeAnnotation) {
                var callSignatureFullStart = this.childFullStart(node, node.callSignature);
                var typeAnnotationFullStart = callSignatureFullStart + Syntax.childOffset(node.callSignature, node.callSignature.typeAnnotation);
                this.pushDiagnostic1(typeAnnotationFullStart, node.callSignature.typeAnnotation, DiagnosticCode.Type_annotation_cannot_appear_on_a_constructor_declaration);
                return true;
            }

            return false;
        }

        public visitSourceUnit(node: SourceUnitSyntax): void {
            if (this.checkFunctionOverloads(node, node.moduleElements) ||
                this.checkForDisallowedExports(node, node.moduleElements) ||
                this.checkForMultipleExportAssignments(node, node.moduleElements)) {
                
                this.skip(node);
                return;
            }

            super.visitSourceUnit(node);
        }
    }
}