///<reference path='references.ts' />

module TypeScript {
    export var syntaxDiagnosticsTime: number = 0;

    export class SyntaxTree {
        private _sourceUnit: SourceUnitSyntax;
        private _isDeclaration: boolean;
        private _parserDiagnostics: Diagnostic[];
        private _allDiagnostics: Diagnostic[] = undefined;
        private _fileName: string;
        private _lineMap: LineMap;
        private _languageVersion: ts.ScriptTarget;

        // Computed on demand.
        private _amdDependencies: string[];
        private _isExternalModule: boolean;

        constructor(sourceUnit: SourceUnitSyntax,
                    isDeclaration: boolean,
                    diagnostics: Diagnostic[],
                    fileName: string,
                    public text: ISimpleText,
                    languageVersion: ts.ScriptTarget) {
            this._sourceUnit = sourceUnit;
            this._isDeclaration = isDeclaration;
            this._parserDiagnostics = diagnostics;
            this._fileName = fileName;
            this._lineMap = text.lineMap();
            this._languageVersion = languageVersion;

            sourceUnit.syntaxTree = this;
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
            visitNodeOrToken(new GrammarCheckerWalker(this, diagnostics), this.sourceUnit());

            return diagnostics;
        }

        public diagnostics(): Diagnostic[] {
            if (!this._allDiagnostics) {
                var start = new Date().getTime();
                this._allDiagnostics = this.computeDiagnostics();
                syntaxDiagnosticsTime += new Date().getTime() - start;
            }

            return this._allDiagnostics;
        }

        public fileName(): string {
            return this._fileName;
        }

        public lineMap(): LineMap {
            return this._lineMap;
        }

        public languageVersion(): ts.ScriptTarget {
            return this._languageVersion;
        }

        private cacheSyntaxTreeInfo(): void {
            // If we're not keeping around the syntax tree, store the diagnostics and line
            // map so they don't have to be recomputed.
            var firstToken = firstSyntaxTreeToken(this);
            var leadingTrivia = firstToken.leadingTrivia(this.text);

            this._isExternalModule = !!externalModuleIndicatorSpanWorker(this, firstToken);

            var amdDependencies: string[] = [];
            for (var i = 0, n = leadingTrivia.count(); i < n; i++) {
                var trivia = leadingTrivia.syntaxTriviaAt(i);
                if (trivia.isComment()) {
                    var amdDependency = this.getAmdDependency(trivia.fullText());
                    if (amdDependency) {
                        amdDependencies.push(amdDependency);
                    }
                }
            }

            this._amdDependencies = amdDependencies;
        }

        private getAmdDependency(comment: string): string {
            var amdDependencyRegEx = /^\/\/\/\s*<amd-dependency\s+path=('|")(.+?)\1/gim;
            var match = amdDependencyRegEx.exec(comment);
            return match ? match[2] : undefined;
        }

        public isExternalModule(): boolean {
            // October 11, 2013
            // External modules are written as separate source files that contain at least one 
            // external import declaration, export assignment, or top-level exported declaration.
            if (this._isExternalModule === undefined) {
                // force the info about isExternalModule to get created.
                this.cacheSyntaxTreeInfo();
                Debug.assert(this._isExternalModule !== undefined);
            }

            return this._isExternalModule;
        }

        public amdDependencies(): string[] {
            if (this._amdDependencies === undefined) {
                this.cacheSyntaxTreeInfo();
                Debug.assert(this._amdDependencies !== undefined);
            }

            return this._amdDependencies;
        }
    }

    class GrammarCheckerWalker extends SyntaxWalker {
        private inAmbientDeclaration: boolean = false;
        private inBlock: boolean = false;
        private inObjectLiteralExpression: boolean = false;
        private text: ISimpleText;

        constructor(private syntaxTree: SyntaxTree,
                    private diagnostics: Diagnostic[]) {
            super();
            this.text = syntaxTree.text;
        }

        private pushDiagnostic(element: ISyntaxElement, diagnosticKey: string, args?: any[]): void {
            this.diagnostics.push(new Diagnostic(
                this.syntaxTree.fileName(), this.syntaxTree.lineMap(), start(element, this.text), width(element), diagnosticKey, args));
        }

        public visitCatchClause(node: CatchClauseSyntax): void {
            if (this.checkForCatchClauseTypeAnnotation(node) ||
                this.checkForDisallowedEvalOrArguments(node, node.identifier)) {
                return;
            }

            super.visitCatchClause(node);
        }

        private checkForCatchClauseTypeAnnotation(node: CatchClauseSyntax): boolean {
            if (node.typeAnnotation) {
                this.pushDiagnostic(node.typeAnnotation.colonToken, DiagnosticCode.Catch_clause_parameter_cannot_have_a_type_annotation);
                return true;
            }

            return false;
        }

        private checkParameterListOrder(node: ParameterListSyntax): boolean {
            var seenOptionalParameter = false;
            var parameterCount = nonSeparatorCount(node.parameters);

            for (var i = 0; i < parameterCount; i++) {
                var parameter = nonSeparatorAt(node.parameters, i);

                if (parameter.dotDotDotToken) {
                    if (i !== (parameterCount - 1)) {
                        this.pushDiagnostic(parameter, DiagnosticCode.A_rest_parameter_must_be_last_in_a_parameter_list);
                        return true;
                    }

                    if (parameter.questionToken) {
                        this.pushDiagnostic(parameter, DiagnosticCode.A_rest_parameter_cannot_be_optional);
                        return true;
                    }

                    if (parameter.equalsValueClause) {
                        this.pushDiagnostic(parameter, DiagnosticCode.A_rest_parameter_cannot_have_an_initializer);
                        return true;
                    }
                }
                else if (parameter.questionToken || parameter.equalsValueClause) {
                    seenOptionalParameter = true;

                    if (parameter.questionToken && parameter.equalsValueClause) {
                        this.pushDiagnostic(parameter, DiagnosticCode.Parameter_cannot_have_question_mark_and_initializer);
                        return true;
                    }
                }
                else {
                    if (seenOptionalParameter) {
                        this.pushDiagnostic(parameter, DiagnosticCode.A_required_parameter_cannot_follow_an_optional_parameter);
                        return true;
                    }
                }
            }

            return false;
        }

        private checkParameterListAcessibilityModifiers(node: ParameterListSyntax): boolean {
            for (var i = 0, n = nonSeparatorCount(node.parameters); i < n; i++) {
                var parameter = nonSeparatorAt(node.parameters, i);

                if (this.checkParameterAccessibilityModifiers(node, parameter)) {
                    return true;
                }
            }

            return false;
        }

        private checkParameterAccessibilityModifiers(parameterList: ParameterListSyntax, parameter: ParameterSyntax): boolean {
            if (parameter.modifiers.length > 0) {
                var modifiers = parameter.modifiers;

                for (var i = 0, n = modifiers.length; i < n; i++) {
                    var modifier = modifiers[i];

                    if (this.checkParameterAccessibilityModifier(parameterList, modifier, i)) {
                        return true;
                    }
                }
            }

            return false;
        }

        private checkParameterAccessibilityModifier(parameterList: ParameterListSyntax, modifier: ISyntaxToken, modifierIndex: number): boolean {
            if (!SyntaxFacts.isAccessibilityModifier(modifier.kind)) {
                this.pushDiagnostic(modifier, DiagnosticCode._0_modifier_cannot_appear_on_a_parameter, [modifier.text()]);
                return true;
            }
            else {
                if (modifierIndex > 0) {
                    this.pushDiagnostic(modifier, DiagnosticCode.Accessibility_modifier_already_seen);
                    return true;
                }
            }

            return false;
        }

        private checkForTrailingComma(list: ISyntaxNodeOrToken[]): boolean {
            // If we have at least one child, and we have an even number of children, then that 
            // means we have an illegal trailing separator.
            if (list.length === 0 || list.length % 2 === 1) {
                return false;
            }

            var child = list[list.length - 1];
            this.pushDiagnostic(child, DiagnosticCode.Trailing_comma_not_allowed);

            return true;
        }

        private checkForAtLeastOneElement(list: ISyntaxNodeOrToken[], reportToken: ISyntaxToken, listKind: string): boolean {
            if (childCount(list) > 0) {
                return false;
            }

            this.pushDiagnostic(reportToken, DiagnosticCode._0_list_cannot_be_empty, [listKind]);
            return true;
        }

        public visitParameterList(node: ParameterListSyntax): void {
            if (this.checkParameterListAcessibilityModifiers(node) ||
                this.checkParameterListOrder(node) ||
                this.checkForTrailingComma(node.parameters)) {

                return;
            }

            super.visitParameterList(node);
        }

        public visitHeritageClause(node: HeritageClauseSyntax): void {
            if (this.checkForTrailingComma(node.typeNames) ||
                this.checkForAtLeastOneElement(node.typeNames, node.extendsOrImplementsKeyword, SyntaxFacts.getText(node.extendsOrImplementsKeyword.kind))) {
                return;
            }

            super.visitHeritageClause(node);
        }

        public visitArgumentList(node: ArgumentListSyntax): void {
            if (this.checkForTrailingComma(node.arguments)) {
                return;
            }

            super.visitArgumentList(node);
        }

        public visitVariableDeclaration(node: VariableDeclarationSyntax): void {
            if (this.checkForAtLeastOneElement(node.variableDeclarators, node.varKeyword, getLocalizedText(DiagnosticCode.variable_declaration, undefined)) ||
                this.checkForTrailingComma(node.variableDeclarators)) {
                return;
            }

            super.visitVariableDeclaration(node);
        }

        public visitTypeArgumentList(node: TypeArgumentListSyntax): void {
            if (this.checkForTrailingComma(node.typeArguments) ||
                this.checkForAtLeastOneElement(node.typeArguments, node.lessThanToken, getLocalizedText(DiagnosticCode.type_argument, undefined))) {
                return;
            }

            super.visitTypeArgumentList(node);
        }

        public visitTupleType(node: TupleTypeSyntax): void {
            if (this.checkForTrailingComma(node.types) ||
                this.checkForAtLeastOneElement(node.types, node.openBracketToken, getLocalizedText(DiagnosticCode.type, undefined))) {
                return
            }

            super.visitTupleType(node);
        }

        public visitTypeParameterList(node: TypeParameterListSyntax): void {
            if (this.checkForTrailingComma(node.typeParameters) ||
                this.checkForAtLeastOneElement(node.typeParameters, node.lessThanToken, getLocalizedText(DiagnosticCode.type_parameter, undefined))) {
                return;
            }

            super.visitTypeParameterList(node);
        }

        private checkIndexSignatureParameter(node: IndexSignatureSyntax): boolean {
            if (node.parameters.length !== 1) {
                this.pushDiagnostic(node.openBracketToken, DiagnosticCode.Index_signature_must_have_exactly_one_parameter);
                return true;
            }

            var parameter = nonSeparatorAt(node.parameters, 0);

            if (parameter.dotDotDotToken) {
                this.pushDiagnostic(parameter, DiagnosticCode.Index_signatures_cannot_have_rest_parameters);
                return true;
            }
            else if (parameter.modifiers.length > 0) {
                this.pushDiagnostic(parameter, DiagnosticCode.Index_signature_parameter_cannot_have_accessibility_modifiers);
                return true;
            }
            else if (parameter.questionToken) {
                this.pushDiagnostic(parameter, DiagnosticCode.Index_signature_parameter_cannot_have_a_question_mark);
                return true;
            }
            else if (parameter.equalsValueClause) {
                this.pushDiagnostic(parameter, DiagnosticCode.Index_signature_parameter_cannot_have_an_initializer);
                return true;
            }
            else if (!parameter.typeAnnotation) {
                this.pushDiagnostic(parameter, DiagnosticCode.Index_signature_parameter_must_have_a_type_annotation);
                return true;
            }
            else if (parameter.typeAnnotation.type.kind !== SyntaxKind.StringKeyword &&
                     parameter.typeAnnotation.type.kind !== SyntaxKind.NumberKeyword) {
                this.pushDiagnostic(parameter, DiagnosticCode.Index_signature_parameter_type_must_be_string_or_number);
                return true;
            }

            return false;
        }

        public visitIndexSignature(node: IndexSignatureSyntax): void {
            if (this.checkIndexSignatureParameter(node)) {
                return;
            }

            if (!node.typeAnnotation) {
                this.pushDiagnostic(node, DiagnosticCode.Index_signature_must_have_a_type_annotation);
                return;
            }

            super.visitIndexSignature(node);
        }

        private checkClassDeclarationHeritageClauses(node: ClassDeclarationSyntax): boolean {
            var seenExtendsClause = false;
            var seenImplementsClause = false;

            for (var i = 0, n = node.heritageClauses.length; i < n; i++) {
                Debug.assert(i <= 2);
                var heritageClause = node.heritageClauses[i];

                if (heritageClause.extendsOrImplementsKeyword.kind === SyntaxKind.ExtendsKeyword) {
                    if (seenExtendsClause) {
                        this.pushDiagnostic(heritageClause, DiagnosticCode.extends_clause_already_seen);
                        return true;
                    }

                    if (seenImplementsClause) {
                        this.pushDiagnostic(heritageClause, DiagnosticCode.extends_clause_must_precede_implements_clause);
                        return true;
                    }

                    if (nonSeparatorCount(heritageClause.typeNames) > 1) {
                        this.pushDiagnostic(heritageClause, DiagnosticCode.Classes_can_only_extend_a_single_class);
                        return true;
                    }

                    seenExtendsClause = true;
                }
                else {
                    Debug.assert(heritageClause.extendsOrImplementsKeyword.kind === SyntaxKind.ImplementsKeyword);
                    if (seenImplementsClause) {
                        this.pushDiagnostic(heritageClause, DiagnosticCode.implements_clause_already_seen);
                        return true;
                    }

                    seenImplementsClause = true;
                }
            }

            return false;
        }

        private checkForDisallowedDeclareModifier(modifiers: ISyntaxToken[]): boolean {
            if (this.inAmbientDeclaration) {
                // If we're already in an ambient declaration, then 'declare' is not allowed.
                var declareToken = SyntaxUtilities.getToken(modifiers, SyntaxKind.DeclareKeyword);

                if (declareToken) {
                    this.pushDiagnostic(declareToken, DiagnosticCode.A_declare_modifier_cannot_be_used_in_an_already_ambient_context);
                    return true;
                }
            }

            return false;
        }

        private checkForRequiredDeclareModifier(moduleElement: IModuleElementSyntax, reportToken: ISyntaxToken, modifiers: ISyntaxToken[]): boolean {
            if (!this.inAmbientDeclaration && this.syntaxTree.isDeclaration()) {
                // We're at the top level in a declaration file, a 'declare' modifiers is required
                // on most module elements.
                if (!SyntaxUtilities.containsToken(modifiers, SyntaxKind.DeclareKeyword)) {
                    this.pushDiagnostic(reportToken, DiagnosticCode.A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file);
                    return true;
                }
            }
        }

        public visitClassDeclaration(node: ClassDeclarationSyntax): void {
            if (this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, node.identifier, node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers) ||
                this.checkClassDeclarationHeritageClauses(node)) {

                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitClassDeclaration(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        private checkInterfaceDeclarationHeritageClauses(node: InterfaceDeclarationSyntax): boolean {
            var seenExtendsClause = false;

            for (var i = 0, n = node.heritageClauses.length; i < n; i++) {
                Debug.assert(i <= 1);
                var heritageClause = node.heritageClauses[i];

                if (heritageClause.extendsOrImplementsKeyword.kind === SyntaxKind.ExtendsKeyword) {
                    if (seenExtendsClause) {
                        this.pushDiagnostic(heritageClause, DiagnosticCode.extends_clause_already_seen);
                        return true;
                    }

                    seenExtendsClause = true;
                }
                else {
                    Debug.assert(heritageClause.extendsOrImplementsKeyword.kind === SyntaxKind.ImplementsKeyword);
                    this.pushDiagnostic(heritageClause, DiagnosticCode.Interface_declaration_cannot_have_implements_clause);
                    return true;
                }
            }

            return false;
        }

        private checkInterfaceModifiers(modifiers: ISyntaxToken[]): boolean {
            for (var i = 0, n = modifiers.length; i < n; i++) {
                var modifier = modifiers[i];
                if (modifier.kind === SyntaxKind.DeclareKeyword) {
                    this.pushDiagnostic(modifier,
                        DiagnosticCode.A_declare_modifier_cannot_be_used_with_an_interface_declaration);
                    return true;
                }
            }

            return false;
        }

        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void {
            if (this.checkInterfaceModifiers(node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers) ||
                this.checkInterfaceDeclarationHeritageClauses(node)) {

                return;
            }

            super.visitInterfaceDeclaration(node);
        }

        private checkClassElementModifiers(list: ISyntaxToken[]): boolean {
            var seenAccessibilityModifier = false;
            var seenStaticModifier = false;

            for (var i = 0, n = list.length; i < n; i++) {
                var modifier = list[i];
                if (SyntaxFacts.isAccessibilityModifier(modifier.kind)) {
                    if (seenAccessibilityModifier) {
                        this.pushDiagnostic(modifier, DiagnosticCode.Accessibility_modifier_already_seen);
                        return true;
                    }

                    if (seenStaticModifier) {
                        var previousToken = list[i - 1];
                        this.pushDiagnostic(modifier, DiagnosticCode._0_modifier_must_precede_1_modifier, [modifier.text(), previousToken.text()]);
                        return true;
                    }

                    seenAccessibilityModifier = true;
                }
                else if (modifier.kind === SyntaxKind.StaticKeyword) {
                    if (seenStaticModifier) {
                        this.pushDiagnostic(modifier, DiagnosticCode._0_modifier_already_seen, [modifier.text()]);
                        return true;
                    }

                    seenStaticModifier = true;
                }
                else {
                    this.pushDiagnostic(modifier, DiagnosticCode._0_modifier_cannot_appear_on_a_class_element, [modifier.text()]);
                    return true;
                }
            }

            return false;
        }

        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void {
            if (this.checkClassElementModifiers(node.modifiers)) {
                return;
            }

            super.visitMemberVariableDeclaration(node);
        }

        public visitMethodSignature(node: MethodSignatureSyntax): void {
            if (this.checkForDisallowedTemplatePropertyName(node.propertyName) ||
                this.checkForDisallowedComputedPropertyName(node.propertyName)) {
                return;
            }

            super.visitMethodSignature(node);
        }

        public visitPropertySignature(node: PropertySignatureSyntax): void {
            if (this.checkForDisallowedTemplatePropertyName(node.propertyName) ||
                this.checkForDisallowedComputedPropertyName(node.propertyName)) {
                return;
            }

            super.visitPropertySignature(node);
        }

        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void {
            if (this.checkClassElementModifiers(node.modifiers) ||
                this.checkForDisallowedTemplatePropertyName(node.propertyName)) {
                return;
            }

            super.visitMemberFunctionDeclaration(node);
        }

        private checkGetAccessorParameter(node: GetAccessorSyntax): boolean {
            if (node.callSignature.parameterList.parameters.length !== 0) {
                this.pushDiagnostic(node.propertyName, DiagnosticCode.get_accessor_cannot_have_parameters);
                return true;
            }

            return false;
        }

        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): void {
            if (this.checkIndexMemberModifiers(node)) {
                return;
            }

            super.visitIndexMemberDeclaration(node);
        }

        private checkIndexMemberModifiers(node: IndexMemberDeclarationSyntax): boolean {
            if (node.modifiers.length > 0) {
                this.pushDiagnostic(node.modifiers[0], DiagnosticCode.Modifiers_cannot_appear_here);
                return true;
            }

            return false;
        }

        private checkEcmaScriptVersionIsAtLeast(reportToken: ISyntaxToken, languageVersion: ts.ScriptTarget, diagnosticKey: string): boolean {
            if (this.syntaxTree.languageVersion() < languageVersion) {
                this.pushDiagnostic(reportToken, diagnosticKey);
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
                this.checkEcmaScriptVersionIsAtLeast(node.getKeyword, ts.ScriptTarget.ES5, DiagnosticCode.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher) ||
                this.checkForDisallowedModifiers(node.modifiers) ||
                this.checkClassElementModifiers(node.modifiers) ||
                this.checkForDisallowedAccessorTypeParameters(node.callSignature) ||
                this.checkGetAccessorParameter(node) ||
                this.checkForDisallowedTemplatePropertyName(node.propertyName)) {
                return;
            }

            super.visitGetAccessor(node);
        }

        private checkForDisallowedSetAccessorTypeAnnotation(accessor: SetAccessorSyntax): boolean {
            if (accessor.callSignature.typeAnnotation) {
                this.pushDiagnostic(accessor.callSignature.typeAnnotation, DiagnosticCode.Type_annotation_cannot_appear_on_a_set_accessor);
                return true;
            }

            return false;
        }

        private checkForDisallowedAccessorTypeParameters(callSignature: CallSignatureSyntax): boolean {
            if (callSignature.typeParameterList) {
                this.pushDiagnostic(callSignature.typeParameterList, DiagnosticCode.Type_parameters_cannot_appear_on_an_accessor);
                return true;
            }

            return false;
        }

        private checkForAccessorDeclarationInAmbientContext(accessor: ISyntaxNode): boolean {
            if (this.inAmbientDeclaration) {
                this.pushDiagnostic(accessor, DiagnosticCode.Accessors_are_not_allowed_in_ambient_contexts);
                return true;
            }

            return false;
        }

        private checkSetAccessorParameter(node: SetAccessorSyntax): boolean {
            var parameters = node.callSignature.parameterList.parameters;
            if (nonSeparatorCount(parameters) !== 1) {
                this.pushDiagnostic(node.propertyName, DiagnosticCode.set_accessor_must_have_exactly_one_parameter);
                return true;
            }

            var parameter = nonSeparatorAt(parameters, 0);

            if (parameter.questionToken) {
                this.pushDiagnostic(parameter, DiagnosticCode.set_accessor_parameter_cannot_be_optional);
                return true;
            }

            if (parameter.equalsValueClause) {
                this.pushDiagnostic(parameter, DiagnosticCode.set_accessor_parameter_cannot_have_an_initializer);
                return true;
            }

            if (parameter.dotDotDotToken) {
                this.pushDiagnostic(parameter, DiagnosticCode.set_accessor_cannot_have_rest_parameter);
                return true;
            }

            return false;
        }

        public visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): void {
            if (this.checkForDisallowedTemplatePropertyName(node.propertyName)) {
                return;
            }

            super.visitSimplePropertyAssignment(node);
        }

        public visitSetAccessor(node: SetAccessorSyntax): void {
            if (this.checkForAccessorDeclarationInAmbientContext(node) ||
                this.checkEcmaScriptVersionIsAtLeast(node.setKeyword, ts.ScriptTarget.ES5, DiagnosticCode.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher) ||
                this.checkForDisallowedModifiers(node.modifiers) ||
                this.checkClassElementModifiers(node.modifiers) ||
                this.checkForDisallowedAccessorTypeParameters(node.callSignature) ||
                this.checkForDisallowedSetAccessorTypeAnnotation(node) ||
                this.checkSetAccessorParameter(node) ||
                this.checkForDisallowedTemplatePropertyName(node.propertyName)) {
                return;
            }

            super.visitSetAccessor(node);
        }

        public visitEnumDeclaration(node: EnumDeclarationSyntax): void {
            if (this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, node.identifier, node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers),
                this.checkEnumElements(node)) {

                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitEnumDeclaration(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        private checkEnumElements(node: EnumDeclarationSyntax): boolean {
            var previousValueWasComputed = false;
            for (var i = 0, n = nonSeparatorCount(node.enumElements); i < n; i++) {
                var enumElement = nonSeparatorAt(node.enumElements, i);

                if (!enumElement.equalsValueClause && previousValueWasComputed) {
                    this.pushDiagnostic(enumElement, DiagnosticCode.Enum_member_must_have_initializer);
                    return true;
                }

                if (enumElement.equalsValueClause) {
                    var value = enumElement.equalsValueClause.value;
                    previousValueWasComputed = !Syntax.isIntegerLiteral(value);
                }
            }
            return false;
        }

        public visitEnumElement(node: EnumElementSyntax): void {
            if (this.checkForDisallowedTemplatePropertyName(node.propertyName) ||
                this.checkForDisallowedComputedPropertyName(node.propertyName)) {
                return;
            }

            if (this.inAmbientDeclaration && node.equalsValueClause) {
                var expression = node.equalsValueClause.value;
                if (!Syntax.isIntegerLiteral(expression)) {
                    this.pushDiagnostic(node.equalsValueClause.value, DiagnosticCode.Ambient_enum_elements_can_only_have_integer_literal_initializers);
                    return;
                }
            }

            super.visitEnumElement(node);
        }

        public visitInvocationExpression(node: InvocationExpressionSyntax): void {
            if (node.expression.kind === SyntaxKind.SuperKeyword &&
                node.argumentList.typeArgumentList) {
                this.pushDiagnostic(node, DiagnosticCode.super_invocation_cannot_have_type_arguments);
            }

            super.visitInvocationExpression(node);
        }

        private checkModuleElementModifiers(modifiers: ISyntaxToken[]): boolean {
            var seenExportModifier = false;
            var seenDeclareModifier = false;

            for (var i = 0, n = modifiers.length; i < n; i++) {
                var modifier = modifiers[i];
                if (SyntaxFacts.isAccessibilityModifier(modifier.kind) ||
                    modifier.kind === SyntaxKind.StaticKeyword) {
                    this.pushDiagnostic(modifier, DiagnosticCode._0_modifier_cannot_appear_on_a_module_element, [modifier.text()]);
                    return true;
                }

                if (modifier.kind === SyntaxKind.DeclareKeyword) {
                    if (seenDeclareModifier) {
                        this.pushDiagnostic(modifier, DiagnosticCode.Accessibility_modifier_already_seen);
                        return;
                    }

                    seenDeclareModifier = true;
                }
                else if (modifier.kind === SyntaxKind.ExportKeyword) {
                    if (seenExportModifier) {
                        this.pushDiagnostic(modifier, DiagnosticCode._0_modifier_already_seen, [modifier.text()]);
                        return;
                    }

                    if (seenDeclareModifier) {
                        this.pushDiagnostic(modifier, DiagnosticCode._0_modifier_must_precede_1_modifier,
                            [SyntaxFacts.getText(SyntaxKind.ExportKeyword), SyntaxFacts.getText(SyntaxKind.DeclareKeyword)]);
                        return;
                    }

                    seenExportModifier = true;
                }
            }

            return false;
        }

        private checkForDisallowedImportDeclaration(node: ModuleDeclarationSyntax): boolean {
            if (node.name.kind !== SyntaxKind.StringLiteral) {
                for (var i = 0, n = node.moduleElements.length; i < n; i++) {
                    var child = node.moduleElements[i];
                    if (child.kind === SyntaxKind.ImportDeclaration) {
                        var importDeclaration = <ImportDeclarationSyntax>child;
                        if (importDeclaration.moduleReference.kind === SyntaxKind.ExternalModuleReference) {
                            this.pushDiagnostic(importDeclaration, DiagnosticCode.Import_declarations_in_an_internal_module_cannot_reference_an_external_module);
                        }
                    }
                }
            }

            return false;
        }

        private checkForDisallowedDeclareModifierOnImportDeclaration(modifiers: ISyntaxToken[]): boolean {
            var declareToken = SyntaxUtilities.getToken(modifiers, SyntaxKind.DeclareKeyword);

            if (declareToken) {
                this.pushDiagnostic(declareToken, DiagnosticCode.A_declare_modifier_cannot_be_used_with_an_import_declaration);
                return true;
            }
        }

        public visitImportDeclaration(node: ImportDeclarationSyntax): any {
            if (this.checkForDisallowedDeclareModifierOnImportDeclaration(node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers)) {
                return;
            }

            super.visitImportDeclaration(node);
        }

        public visitModuleDeclaration(node: ModuleDeclarationSyntax): void {
            if (this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, firstToken(node.name), node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers) ||
                this.checkForDisallowedImportDeclaration(node)) {

                return;
            }

            if (node.name.kind === SyntaxKind.StringLiteral) {
                if (!this.inAmbientDeclaration && !SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword)) {
                    this.pushDiagnostic(node.name, DiagnosticCode.Only_ambient_modules_can_use_quoted_names);
                    return;
                }
            }

            if (node.name.kind !== SyntaxKind.StringLiteral && this.checkForDisallowedExportAssignment(node)) {
                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitModuleDeclaration(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        private checkForDisallowedExportAssignment(node: ModuleDeclarationSyntax): boolean {
            for (var i = 0, n = node.moduleElements.length; i < n; i++) {
                var child = node.moduleElements[i];

                if (child.kind === SyntaxKind.ExportAssignment) {
                    this.pushDiagnostic(child, DiagnosticCode.Export_assignment_cannot_be_used_in_internal_modules);
                    return true;
                }
            }

            return false;
        }

        public visitBlock(node: BlockSyntax): void {
            if (this.checkForBlockInAmbientContext(node)) {
                return;
            }

            var savedInBlock = this.inBlock;
            this.inBlock = true;
            super.visitBlock(node);
            this.inBlock = savedInBlock;
        }

        private checkForBlockInAmbientContext(node: BlockSyntax): boolean {
            if (this.inAmbientDeclaration || this.syntaxTree.isDeclaration()) {
                // Provide a specialized message for a block as a statement versus the block as a 
                // function body.
                if (node.parent.kind === SyntaxKind.List) {
                    this.pushDiagnostic(firstToken(node), DiagnosticCode.Statements_are_not_allowed_in_ambient_contexts);
                }
                else {
                    this.pushDiagnostic(firstToken(node), DiagnosticCode.A_function_implementation_cannot_be_declared_in_an_ambient_context);
                }

                return true;
            }

            return false;
        }

        private checkForStatementInAmbientContxt(node: IStatementSyntax): boolean {
            if (this.inAmbientDeclaration || this.syntaxTree.isDeclaration()) {
                this.pushDiagnostic(firstToken(node), DiagnosticCode.Statements_are_not_allowed_in_ambient_contexts);
                return true;
            }

            return false;
        }

        public visitBreakStatement(node: BreakStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node) ||
                this.checkBreakStatementTarget(node)) {
                return;
            }

            super.visitBreakStatement(node);
        }

        public visitContinueStatement(node: ContinueStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node) ||
                this.checkContinueStatementTarget(node)) {
                return;
            }

            super.visitContinueStatement(node);
        }

        private checkBreakStatementTarget(node: BreakStatementSyntax): boolean {
            // Invalid break statements are considered syntax errors in ES5.

            // Note: the order here is important.  If the 'break' has a target, then it can jump to
            // any enclosing laballed statment.  If it has no target, it must be in an iteration or
            // swtich statement.
            if (node.identifier) {
                var breakableLabels = this.getEnclosingLabels(node, /*breakable:*/ true, /*crossFunctions:*/ false);

                if (!ArrayUtilities.any(breakableLabels, s => tokenValueText(s.identifier) === tokenValueText(node.identifier))) {
                    // The target of the continue statement wasn't to a reachable label.
                    //
                    // Let hte user know, with a specialized message if the target was to an
                    // unreachable label (as opposed to a non-existed label)
                    var breakableLabels = this.getEnclosingLabels(node, /*breakable:*/ true, /*crossFunctions:*/ true);
                    if (ArrayUtilities.any(breakableLabels, s => tokenValueText(s.identifier) === tokenValueText(node.identifier))) {
                        this.pushDiagnostic(node, DiagnosticCode.Jump_target_cannot_cross_function_boundary);
                    }
                    else {
                        this.pushDiagnostic(node, DiagnosticCode.Jump_target_not_found);
                    }

                    return true;
                }
            }
            else if (!this.inIterationStatement(node, /*crossFunctions:*/ false) && !this.inSwitchStatement(node)) {
                if (this.inIterationStatement(node, /*crossFunctions:*/ true)) {
                    this.pushDiagnostic(node, DiagnosticCode.Jump_target_cannot_cross_function_boundary);
                }
                else {
                    this.pushDiagnostic(node, DiagnosticCode.break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement);
                }

                return true;
            }

            return false;
        }

        private inSwitchStatement(ast: ISyntaxElement): boolean {
            while (ast) {
                if (ast.kind === SyntaxKind.SwitchStatement) {
                    return true;
                }

                if (SyntaxUtilities.isAnyFunctionExpressionOrDeclaration(ast)) {
                    return false;
                }

                ast = ast.parent;
            }

            return false;
        }

        private isIterationStatement(ast: ISyntaxElement): boolean {
            switch (ast.kind) {
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.DoStatement:
                    return true;
            }

            return false;
        }

        private inIterationStatement(element: ISyntaxElement, crossFunctions: boolean): boolean {
            while (element) {
                if (this.isIterationStatement(element)) {
                    return true;
                }

                if (!crossFunctions && SyntaxUtilities.isAnyFunctionExpressionOrDeclaration(element)) {
                    return false;
                }

                element = element.parent;
            }

            return false;
        }

        private getEnclosingLabels(element: ISyntaxElement, breakable: boolean, crossFunctions: boolean): LabeledStatementSyntax[] {
            var result: LabeledStatementSyntax[] = [];

            element = element.parent;
            while (element) {
                if (element.kind === SyntaxKind.LabeledStatement) {
                    var labeledStatement = <LabeledStatementSyntax>element;
                    if (breakable) {
                        // Breakable labels can be placed on any construct
                        result.push(labeledStatement);
                    }
                    else {
                        // They're asking for continuable labels.  Continuable labels must be on
                        // a loop construct.
                        if (this.labelIsOnContinuableConstruct(labeledStatement.statement)) {
                            result.push(labeledStatement);
                        }
                    }
                }

                if (!crossFunctions && SyntaxUtilities.isAnyFunctionExpressionOrDeclaration(element)) {
                    break;
                }

                element = element.parent;
            }

            return result;
        }

        private labelIsOnContinuableConstruct(statement: ISyntaxElement): boolean {
            switch (statement.kind) {
                case SyntaxKind.LabeledStatement:
                    // Labels work transitively.  i.e. if you have:
                    //      foo:
                    //      bar:
                    //      while(...)
                    //
                    // Then both 'foo' and 'bar' are in the label set for 'while' and are thus
                    // continuable.
                    return this.labelIsOnContinuableConstruct((<LabeledStatementSyntax>statement).statement);

                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.DoStatement:
                    return true;

                default:
                    return false;
            }
        }

        private checkContinueStatementTarget(node: ContinueStatementSyntax): boolean {
            // Invalid continue statements are considered syntax errors in ES5.

            if (!this.inIterationStatement(node, /*crossFunctions:*/ false)) {
                if (this.inIterationStatement(node, /*crossFunctions:*/ true)) {
                    this.pushDiagnostic(node, DiagnosticCode.Jump_target_cannot_cross_function_boundary);
                }
                else {
                    this.pushDiagnostic(node, DiagnosticCode.continue_statement_can_only_be_used_within_an_enclosing_iteration_statement);
                }

                return true;
            }
            else if (node.identifier) {
                var continuableLabels = this.getEnclosingLabels(node, /*breakable:*/ false, /*crossFunctions:*/ false);

                if (!ArrayUtilities.any(continuableLabels, s => tokenValueText(s.identifier) === tokenValueText(node.identifier))) {
                    // The target of the continue statement wasn't to a reachable label.
                    //
                    // Let hte user know, with a specialized message if the target was to an
                    // unreachable label (as opposed to a non-existed label)
                    var continuableLabels = this.getEnclosingLabels(node, /*breakable:*/ false, /*crossFunctions:*/ true);

                    if (ArrayUtilities.any(continuableLabels, s => tokenValueText(s.identifier) === tokenValueText(node.identifier))) {
                        this.pushDiagnostic(node, DiagnosticCode.Jump_target_cannot_cross_function_boundary);
                    }
                    else {
                        this.pushDiagnostic(node, DiagnosticCode.Jump_target_not_found);
                    }

                    return true;
                }
            }

            return false;
        }

        public visitDebuggerStatement(node: DebuggerStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                return;
            }

            super.visitDebuggerStatement(node);
        }

        public visitDoStatement(node: DoStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                return;
            }

            super.visitDoStatement(node);
        }

        public visitEmptyStatement(node: EmptyStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                return;
            }

            super.visitEmptyStatement(node);
        }

        public visitExpressionStatement(node: ExpressionStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                return;
            }

            super.visitExpressionStatement(node);
        }

        public visitForInStatement(node: ForInStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node) ||
                this.checkForInStatementVariableDeclaration(node) ||
                this.checkForInLeftHandSideExpression(node)) {

                return;
            }

            super.visitForInStatement(node);
        }

        private checkForInLeftHandSideExpression(node: ForInStatementSyntax): boolean {
            if (node.left.kind !== SyntaxKind.VariableDeclaration && !SyntaxUtilities.isLeftHandSizeExpression(node.left)) {
                this.pushDiagnostic(node.left, DiagnosticCode.Invalid_left_hand_side_in_for_in_statement);
                return true;
            }

            return false;
        }

        private checkForInStatementVariableDeclaration(node: ForInStatementSyntax): boolean {
            // The parser accepts a Variable Declaration in a ForInStatement, but the grammar only
            // allows a very restricted form.  Specifically, there must be only a single Variable
            // Declarator in the Declaration.
            if (node.left.kind === SyntaxKind.VariableDeclaration && (<VariableDeclarationSyntax>node.left).variableDeclarators.length > 1) {
                this.pushDiagnostic(node.left, DiagnosticCode.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement);
                return true;
            }

            return false;
        }

        public visitForStatement(node: ForStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                return;
            }

            super.visitForStatement(node);
        }

        public visitIfStatement(node: IfStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                return;
            }

            super.visitIfStatement(node);
        }

        public visitLabeledStatement(node: LabeledStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node) ||
                this.checkForInvalidLabelIdentifier(node)) {
                return;
            }

            super.visitLabeledStatement(node);
        }

        private checkForInvalidLabelIdentifier(node: LabeledStatementSyntax): boolean {
            // Invalid break statements are considered syntax errors in ES5.

            // Note that break/continue are treated differently.  ES5 says this about a break statement:
            // A program is considered syntactically incorrect if ...:
            //
            // The program contains a break statement with the optional Identifier, where Identifier 
            // does not appear in the label set of an enclosing (but not crossing function boundaries) 
            // **Statement.**
            // 
            // However, it says this about continue statements:
            //
            // The program contains a continue statement with the optional Identifier, where Identifier
            // does not appear in the label set of an enclosing (but not crossing function boundaries) 
            // **IterationStatement.**

            // In other words, you can 'break' to any enclosing statement.  But you can only 'continue'
            // to an enclosing *iteration* statement.
            var labelIdentifier = tokenValueText(node.identifier);

            var breakableLabels = this.getEnclosingLabels(node, /*breakable:*/ true, /*crossFunctions:*/ false);

            // It is invalid to have a label enclosed in a label of the same name.
            var matchingLabel = ArrayUtilities.firstOrDefault(breakableLabels, s => tokenValueText(s.identifier) === labelIdentifier);
            if (matchingLabel) {
                this.pushDiagnostic(node.identifier, DiagnosticCode.Duplicate_identifier_0, [labelIdentifier]);
                return true;
            }

            return false;
        }

        public visitReturnStatement(node: ReturnStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node) ||
                this.checkForReturnStatementNotInFunctionBody(node)) {
                return;
            }

            super.visitReturnStatement(node);
        }

        public checkForReturnStatementNotInFunctionBody(node: ReturnStatementSyntax): boolean {
            for (var element: ISyntaxElement = node; element; element = element.parent) {
                if (SyntaxUtilities.isAnyFunctionExpressionOrDeclaration(element)) {
                    return false;
                }
            }

            this.pushDiagnostic(firstToken(node), DiagnosticCode.return_statement_must_be_contained_within_a_function_body);
            return true;
        }

        public visitSwitchStatement(node: SwitchStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                return;
            }

            super.visitSwitchStatement(node);
        }

        public visitThrowStatement(node: ThrowStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node) ||
                this.checkForMissingThrowStatementExpression(node)) {
                return;
            }

            super.visitThrowStatement(node);
        }

        public checkForMissingThrowStatementExpression(node: ThrowStatementSyntax): boolean {
            if (node.expression === undefined) {
                this.diagnostics.push(new Diagnostic(
                    this.syntaxTree.fileName(), this.syntaxTree.lineMap(), fullEnd(node.throwKeyword), 0, DiagnosticCode.Expression_expected));
                return true;
            }

            return false;
        }

        public visitTryStatement(node: TryStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                return;
            }

            super.visitTryStatement(node);
        }

        public visitWhileStatement(node: WhileStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node)) {
                return;
            }

            super.visitWhileStatement(node);
        }

        public visitWithStatement(node: WithStatementSyntax): void {
            if (this.checkForStatementInAmbientContxt(node) ||
                this.checkForWithInStrictMode(node)) {
                return;
            }

            super.visitWithStatement(node);
        }

        private checkForWithInStrictMode(node: WithStatementSyntax): boolean {
            if (parsedInStrictModeContext(node)) {
                this.pushDiagnostic(firstToken(node), DiagnosticCode.with_statements_are_not_allowed_in_strict_mode);
                return true;
            }

            return false;
        }

        private checkForDisallowedModifiers(modifiers: ISyntaxToken[]): boolean {
            if (this.inBlock || this.inObjectLiteralExpression) {
                if (modifiers.length > 0) {
                    this.pushDiagnostic(modifiers[0], DiagnosticCode.Modifiers_cannot_appear_here);
                    return true;
                }
            }

            return false;
        }

        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void {
            if (this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForDisallowedModifiers(node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, node.identifier, node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers) ||
                this.checkForDisallowedEvalOrArguments(node, node.identifier)) {

                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitFunctionDeclaration(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        public visitFunctionExpression(node: FunctionExpressionSyntax): void {
            if (this.checkForDisallowedEvalOrArguments(node, node.identifier)) {
                return;
            }

            super.visitFunctionExpression(node);
        }

        public visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): void {
            if (this.checkForDisallowedTemplatePropertyName(node.propertyName)) {
                return;
            }

            super.visitFunctionPropertyAssignment(node);
        }

        public visitVariableStatement(node: VariableStatementSyntax): void {
            if (this.checkForDisallowedDeclareModifier(node.modifiers) ||
                this.checkForDisallowedModifiers(node.modifiers) ||
                this.checkForRequiredDeclareModifier(node, node.variableDeclaration.varKeyword, node.modifiers) ||
                this.checkModuleElementModifiers(node.modifiers)) {

                return;
            }

            var savedInAmbientDeclaration = this.inAmbientDeclaration;
            this.inAmbientDeclaration = this.inAmbientDeclaration || this.syntaxTree.isDeclaration() || SyntaxUtilities.containsToken(node.modifiers, SyntaxKind.DeclareKeyword);
            super.visitVariableStatement(node);
            this.inAmbientDeclaration = savedInAmbientDeclaration;
        }

        private checkListSeparators<T extends ISyntaxNodeOrToken>(list: ISeparatedSyntaxList<T>, kind: SyntaxKind): boolean {
            for (var i = 0, n = separatorCount(list); i < n; i++) {
                var child = separatorAt(list, i);
                if (child.kind !== kind) {
                    this.pushDiagnostic(child, DiagnosticCode._0_expected, [SyntaxFacts.getText(kind)]);
                }
            }

            return false;
        }

        public visitObjectType(node: ObjectTypeSyntax): void {
            if (this.checkListSeparators(node.typeMembers, SyntaxKind.SemicolonToken)) {
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
            if (this.checkVariableDeclaratorInitializer(node) ||
                this.checkVariableDeclaratorIdentifier(node) ||
                this.checkForDisallowedTemplatePropertyName(node.propertyName)) {
                return;
            }

            super.visitVariableDeclarator(node);
        }

        private checkForDisallowedTemplatePropertyName(propertyName: IPropertyNameSyntax): boolean {
            if (propertyName.kind === SyntaxKind.NoSubstitutionTemplateToken) {
                this.pushDiagnostic(propertyName, DiagnosticCode.Template_literal_cannot_be_used_as_an_element_name);
                return true;
            }

            return false;
        }

        private checkForDisallowedComputedPropertyName(propertyName: IPropertyNameSyntax): boolean {
            if (propertyName.kind === SyntaxKind.ComputedPropertyName) {
                this.pushDiagnostic(propertyName, DiagnosticCode.Computed_property_names_cannot_be_used_here);
                return true;
            }

            return false;
        }

        private checkVariableDeclaratorIdentifier(node: VariableDeclaratorSyntax): boolean {
            if (node.parent.kind !== SyntaxKind.MemberVariableDeclaration) {
                Debug.assert(isToken(node.propertyName), "A normal variable declarator must always have a token for a name.");
                if (this.checkForDisallowedEvalOrArguments(node, <ISyntaxToken>node.propertyName)) {
                    return true;
                }
            }

            return false;
        }

        private checkVariableDeclaratorInitializer(node: VariableDeclaratorSyntax): boolean {
            if (this.inAmbientDeclaration && node.equalsValueClause) {
                this.pushDiagnostic(firstToken(node.equalsValueClause.value), DiagnosticCode.Initializers_are_not_allowed_in_ambient_contexts);
                return true;
            }

            return false;
        }

        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void {
            if (this.checkClassElementModifiers(node.modifiers) ||
                this.checkConstructorModifiers(node.modifiers) ||
                this.checkConstructorTypeParameterList(node) ||
                this.checkConstructorTypeAnnotation(node)) {

                return;
            }

            super.visitConstructorDeclaration(node);
        }

        private checkConstructorModifiers(modifiers: ISyntaxToken[]): boolean {
            for (var i = 0, n = modifiers.length; i < n; i++) {
                var child = modifiers[i];
                if (child.kind !== SyntaxKind.PublicKeyword) {
                    this.pushDiagnostic(child, DiagnosticCode._0_modifier_cannot_appear_on_a_constructor_declaration, [SyntaxFacts.getText(child.kind)]);
                    return true;
                }
            }

            return false;
        }

        private checkConstructorTypeParameterList(node: ConstructorDeclarationSyntax): boolean {
            if (node.callSignature.typeParameterList) {
                this.pushDiagnostic(node.callSignature.typeParameterList, DiagnosticCode.Type_parameters_cannot_appear_on_a_constructor_declaration);
                return true;
            }

            return false;
        }

        private checkConstructorTypeAnnotation(node: ConstructorDeclarationSyntax): boolean {
            if (node.callSignature.typeAnnotation) {
                this.pushDiagnostic(node.callSignature.typeAnnotation, DiagnosticCode.Type_annotation_cannot_appear_on_a_constructor_declaration);
                return true;
            }

            return false;
        }

        public visitBinaryExpression(node: BinaryExpressionSyntax): void {
            if (this.checkIllegalAssignment(node)) {
                return;
            }

            super.visitBinaryExpression(node);
        }

        public visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void {
            if (parsedInStrictModeContext(node) && this.isPreIncrementOrDecrementExpression(node) && this.isEvalOrArguments(node.operand)) {
                this.pushDiagnostic(node.operatorToken, DiagnosticCode.Invalid_use_of_0_in_strict_mode, [this.getEvalOrArguments(node.operand)]);
            }

            super.visitPrefixUnaryExpression(node);
        }

        public visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void {
            if (parsedInStrictModeContext(node) && this.isEvalOrArguments(node.operand)) {
                this.pushDiagnostic(node.operatorToken, DiagnosticCode.Invalid_use_of_0_in_strict_mode, [this.getEvalOrArguments(node.operand)]);
            }

            super.visitPostfixUnaryExpression(node);
        }

        public visitParameter(node: ParameterSyntax): void {
            if (this.checkForDisallowedEvalOrArguments(node, node.identifier)) {
                return;
            }

            super.visitParameter(node);
        }

        private checkForDisallowedEvalOrArguments(node: ISyntaxNode, token: ISyntaxToken): boolean {
            if (token) {
                if (parsedInStrictModeContext(node) && this.isEvalOrArguments(token)) {
                    this.pushDiagnostic(token, DiagnosticCode.Invalid_use_of_0_in_strict_mode, [this.getEvalOrArguments(token)]);
                    return true;
                }
            }

            return false;
        }

        private isPreIncrementOrDecrementExpression(node: PrefixUnaryExpressionSyntax) {
            switch (node.operatorToken.kind) {
                case SyntaxKind.MinusMinusToken:
                case SyntaxKind.PlusPlusToken:
                    return true;
            }

            return false;
        }

        public visitDeleteExpression(node: DeleteExpressionSyntax): void {
            if (parsedInStrictModeContext(node) && node.expression.kind === SyntaxKind.IdentifierName) {
                this.pushDiagnostic(node.deleteKeyword, DiagnosticCode.delete_cannot_be_called_on_an_identifier_in_strict_mode);
                return;
            }

            super.visitDeleteExpression(node);
        }

        public visitYieldExpression(node: YieldExpressionSyntax): void {
            if (!parsedInYieldContext(node)) {
                this.pushDiagnostic(node.yieldKeyword, DiagnosticCode.yield_expression_must_be_contained_within_a_generator_declaration);
                return;
            }

            super.visitYieldExpression(node);
        }

        private checkIllegalAssignment(node: BinaryExpressionSyntax): boolean {
            if (parsedInStrictModeContext(node) && SyntaxFacts.isAssignmentOperatorToken(node.operatorToken.kind) && this.isEvalOrArguments(node.left)) {
                this.pushDiagnostic(node.operatorToken, DiagnosticCode.Invalid_use_of_0_in_strict_mode, [this.getEvalOrArguments(node.left)]);
                return true;
            }

            return false;
        }

        private getEvalOrArguments(expr: IExpressionSyntax): string {
            if (expr.kind === SyntaxKind.IdentifierName) {
                var text = tokenValueText(<ISyntaxToken>expr);
                if (text === "eval" || text === "arguments") {
                    return text;
                }
            }

            return undefined;
        }

        private isEvalOrArguments(expr: IExpressionSyntax): boolean {
            return !!this.getEvalOrArguments(expr);
        }

        public visitConstraint(node: ConstraintSyntax): void {
            if (this.checkConstraintType(node)) {
                return;
            }

            super.visitConstraint(node);
        }

        private checkConstraintType(node: ConstraintSyntax): boolean {
            if (!SyntaxFacts.isType(node.typeOrExpression.kind)) {
                this.pushDiagnostic(node.typeOrExpression, DiagnosticCode.Type_expected);
                return true;
            }

            return false;
        }
    }

    function firstSyntaxTreeToken(syntaxTree: SyntaxTree) {
        // We don't just access the firstToken of the tree here as the tree may be abstract and may
        // not have a firstToken in it.
        var scanner = Scanner.createScanner(syntaxTree.languageVersion(), syntaxTree.text, () => { });
        return scanner.scan(/*allowContextualToken:*/ false);
    }

    export function externalModuleIndicatorSpan(syntaxTree: SyntaxTree): TextSpan {
        var firstToken = firstSyntaxTreeToken(syntaxTree);
        return externalModuleIndicatorSpanWorker(syntaxTree, firstToken);
    }

    export function externalModuleIndicatorSpanWorker(syntaxTree: SyntaxTree, firstToken: ISyntaxToken) {
        var leadingTrivia = firstToken.leadingTrivia(syntaxTree.text);
        return implicitImportSpan(leadingTrivia) || topLevelImportOrExportSpan(syntaxTree.sourceUnit());
    }

    function implicitImportSpan(sourceUnitLeadingTrivia: ISyntaxTriviaList): TextSpan {
        for (var i = 0, n = sourceUnitLeadingTrivia.count(); i < n; i++) {
            var trivia = sourceUnitLeadingTrivia.syntaxTriviaAt(i);

            if (trivia.isComment()) {
                var span = implicitImportSpanWorker(trivia);
                if (span) {
                    return span;
                }
            }
        }

        return undefined;
    }

    function implicitImportSpanWorker(trivia: ISyntaxTrivia): TextSpan {
        var implicitImportRegEx = /^(\/\/\/\s*<implicit-import\s*)*\/>/gim;
        var match = implicitImportRegEx.exec(trivia.fullText());

        if (match) {
            return new TextSpan(trivia.fullStart(), trivia.fullWidth());
        }

        return undefined;
    }

    function topLevelImportOrExportSpan(node: SourceUnitSyntax): TextSpan {
        for (var i = 0, n = node.moduleElements.length; i < n; i++) {
            var moduleElement = node.moduleElements[i];

            var _firstToken = firstToken(moduleElement);
            if (_firstToken && _firstToken.kind === SyntaxKind.ExportKeyword) {
                return new TextSpan(start(_firstToken), width(_firstToken));
            }

            if (moduleElement.kind === SyntaxKind.ImportDeclaration) {
                var importDecl = <ImportDeclarationSyntax>moduleElement;
                if (importDecl.moduleReference.kind === SyntaxKind.ExternalModuleReference) {
                    var literal = (<TypeScript.ExternalModuleReferenceSyntax>importDecl.moduleReference).stringLiteral;
                    return new TextSpan(start(literal), width(literal));
                }
            }
        }

        return undefined;
    }
}