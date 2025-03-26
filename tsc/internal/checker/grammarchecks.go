package checker

import (
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func (c *Checker) grammarErrorOnFirstToken(node *ast.Node, message *diagnostics.Message, args ...any) bool {
	sourceFile := ast.GetSourceFileOfNode(node)
	if !c.hasParseDiagnostics(sourceFile) {
		span := scanner.GetRangeOfTokenAtPosition(sourceFile, node.Pos())
		c.diagnostics.Add(ast.NewDiagnostic(sourceFile, span, message, args...))
		return true
	}
	return false
}

func (c *Checker) grammarErrorAtPos(nodeForSourceFile *ast.Node, start int, length int, message *diagnostics.Message, args ...any) bool {
	sourceFile := ast.GetSourceFileOfNode(nodeForSourceFile)
	if !c.hasParseDiagnostics(sourceFile) {
		c.diagnostics.Add(ast.NewDiagnostic(sourceFile, core.NewTextRange(start, start+length), message, args...))
		return true
	}
	return false
}

func (c *Checker) grammarErrorOnNode(node *ast.Node, message *diagnostics.Message, args ...any) bool {
	sourceFile := ast.GetSourceFileOfNode(node)
	if !c.hasParseDiagnostics(sourceFile) {
		c.diagnostics.Add(NewDiagnosticForNode(node, message, args...))
		return true
	}
	return false
}

func (c *Checker) checkGrammarRegularExpressionLiteral(_ *ast.RegularExpressionLiteral) bool {
	// !!!
	// Unclear if this is needed until regular expression parsing is more thoroughly implemented.
	return false
	// sourceFile := ast.GetSourceFileOfNode(node.AsNode())
	// if !c.hasParseDiagnostics(sourceFile) && !node.IsUnterminated {
	// 	var lastError *ast.Diagnostic
	// 	scanner := NewScanner()
	// 	scanner.skipTrivia = true
	// 	scanner.SetScriptTarget(sourceFile.LanguageVersion)
	// 	scanner.SetLanguageVariant(sourceFile.LanguageVariant)
	// 	scanner.SetOnError(func(message *diagnostics.Message, start int, length int, args ...any) {
	// 		// !!!
	// 		// Original uses `tokenEnd()` - unclear if this is the same as the `start` passed in here.
	// 		// const start = scanner.TokenEnd()

	// 		// The scanner is operating on a slice of the original source text, so we need to adjust the start
	// 		// for error reporting.
	// 		start = start + node.Pos()

	// 		// For providing spelling suggestions
	// 		if message.Category() == diagnostics.CategoryMessage && lastError != nil && start == lastError.Pos() && length == lastError.Len() {
	// 			err := ast.NewDiagnostic(sourceFile, core.NewTextRange(start, start+length), message, args)
	// 			lastError.AddRelatedInfo(err)
	// 		} else if !(lastError != nil) || start != lastError.Pos() {
	// 			lastError = ast.NewDiagnostic(sourceFile, core.NewTextRange(start, start+length), message, args)
	// 			c.diagnostics.Add(lastError)
	// 		}
	// 	})
	// 	scanner.SetText(sourceFile.Text[node.Pos():node.Loc.Len()])
	// 	scanner.Scan()
	// 	if scanner.ReScanSlashToken() != ast.KindRegularExpressionLiteral {
	// 		panic("Expected to rescan RegularExpressionLiteral")
	// 	}
	// 	return lastError != nil
	// }
	// return false
}

func (c *Checker) checkGrammarPrivateIdentifierExpression(privId *ast.PrivateIdentifier) bool {
	privIdAsNode := privId.AsNode()
	if ast.GetContainingClass(privId.AsNode()) == nil {
		return c.grammarErrorOnNode(privId.AsNode(), diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies)
	}

	if !ast.IsForInStatement(privId.Parent) {
		if !ast.IsExpressionNode(privIdAsNode) {
			return c.grammarErrorOnNode(privIdAsNode, diagnostics.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression)
		}

		isInOperation := ast.IsBinaryExpression(privId.Parent) && privId.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindInKeyword
		if c.getSymbolForPrivateIdentifierExpression(privIdAsNode) == nil && !isInOperation {
			return c.grammarErrorOnNode(privIdAsNode, diagnostics.Cannot_find_name_0, privId.Text)
		}
	}

	return false
}

func (c *Checker) checkGrammarMappedType(node *ast.MappedTypeNode) bool {
	if len(node.Members.Nodes) > 0 {
		return c.grammarErrorOnNode(node.Members.Nodes[0], diagnostics.A_mapped_type_may_not_declare_properties_or_methods)
	}
	return false
}

func (c *Checker) checkGrammarDecorator(decorator *ast.Decorator) bool {
	sourceFile := ast.GetSourceFileOfNode(decorator.AsNode())
	if !c.hasParseDiagnostics(sourceFile) {
		node := decorator.Expression

		// DecoratorParenthesizedExpression :
		//   `(` Expression `)`

		if ast.IsParenthesizedExpression(node) {
			return false
		}

		canHaveCallExpression := true
		var errorNode *ast.Node
		for {
			// Allow TS syntax such as non-null assertions and instantiation expressions
			if ast.IsExpressionWithTypeArguments(node) || ast.IsNonNullExpression(node) {
				node = node.Expression()
				continue
			}

			// DecoratorCallExpression :
			//   DecoratorMemberExpression Arguments

			if ast.IsCallExpression(node) {
				callExpr := node.AsCallExpression()
				if !canHaveCallExpression {
					errorNode = node
				}
				if callExpr.QuestionDotToken != nil {
					// Even if we already have an error node, error at the `?.` token since it appears earlier.
					errorNode = callExpr.QuestionDotToken
				}
				node = callExpr.Expression
				canHaveCallExpression = false
				continue
			}

			// DecoratorMemberExpression :
			//   IdentifierReference
			//   DecoratorMemberExpression `.` IdentifierName
			//   DecoratorMemberExpression `.` PrivateIdentifier

			if ast.IsPropertyAccessExpression(node) {
				propertyAccessExpr := node.AsPropertyAccessExpression()
				if propertyAccessExpr.QuestionDotToken != nil {
					// Even if we already have an error node, error at the `?.` token since it appears earlier.
					errorNode = propertyAccessExpr.QuestionDotToken
				}
				node = propertyAccessExpr.Expression
				canHaveCallExpression = false
				continue
			}

			if !ast.IsIdentifier(node) {
				// Even if we already have an error node, error at this node since it appears earlier.
				errorNode = node
			}

			break
		}

		if errorNode != nil {
			err := c.error(decorator.Expression, diagnostics.Expression_must_be_enclosed_in_parentheses_to_be_used_as_a_decorator)
			err.AddRelatedInfo(createDiagnosticForNode(errorNode, diagnostics.Invalid_syntax_in_decorator))
			return true
		}
	}

	return false
}

func (c *Checker) checkGrammarExportDeclaration(node *ast.ExportDeclaration) bool {
	if node.IsTypeOnly && node.ExportClause != nil && node.ExportClause.Kind == ast.KindNamedExports {
		return c.checkGrammarTypeOnlyNamedImportsOrExports(node.ExportClause)
	}
	return false
}

func (c *Checker) checkGrammarModuleElementContext(node *ast.Statement, errorMessage *diagnostics.Message) bool {
	isInAppropriateContext := node.Parent.Kind == ast.KindSourceFile || node.Parent.Kind == ast.KindModuleBlock || node.Parent.Kind == ast.KindModuleDeclaration
	if !isInAppropriateContext {
		c.grammarErrorOnFirstToken(node, errorMessage)
	}
	return !isInAppropriateContext
}

func (c *Checker) checkGrammarModifiers(node *ast.Node /*Union[HasModifiers, HasDecorators, HasIllegalModifiers, HasIllegalDecorators]*/) bool {
	if node.Modifiers() == nil {
		return false
	}
	if c.reportObviousDecoratorErrors(node) || c.reportObviousModifierErrors(node) {
		return true
	}
	if ast.IsParameter(node) && ast.IsThisParameter(node) {
		return c.grammarErrorOnFirstToken(node, diagnostics.Neither_decorators_nor_modifiers_may_be_applied_to_this_parameters)
	}
	blockScopeKind := ast.NodeFlagsNone
	if ast.IsVariableStatement(node) {
		blockScopeKind = node.AsVariableStatement().DeclarationList.Flags & ast.NodeFlagsBlockScoped
	}
	var lastStatic *ast.Node
	var lastDeclare *ast.Node
	var lastAsync *ast.Node
	var lastOverride *ast.Node
	var firstDecorator *ast.Node
	flags := ast.ModifierFlagsNone
	sawExportBeforeDecorators := false
	// We parse decorators and modifiers in four contiguous chunks:
	// [...leadingDecorators, ...leadingModifiers, ...trailingDecorators, ...trailingModifiers]. It is an error to
	// have both leading and trailing decorators.
	hasLeadingDecorators := false
	var modifiers []*ast.Node
	if node.Modifiers() != nil {
		modifiers = node.Modifiers().Nodes
	}
	for _, modifier := range modifiers {
		if ast.IsDecorator(modifier) {
			if !nodeCanBeDecorated(c.legacyDecorators, node, node.Parent, node.Parent.Parent) {
				if node.Kind == ast.KindMethodDeclaration && !ast.NodeIsPresent(node.Body()) {
					return c.grammarErrorOnFirstToken(node, diagnostics.A_decorator_can_only_decorate_a_method_implementation_not_an_overload)
				} else {
					return c.grammarErrorOnFirstToken(node, diagnostics.Decorators_are_not_valid_here)
				}
			} else if c.legacyDecorators && (node.Kind == ast.KindGetAccessor || node.Kind == ast.KindSetAccessor) {
				accessors := c.getAllAccessorDeclarationsForDeclaration(node)
				if hasDecorators(accessors.firstAccessor) && node == accessors.secondAccessor {
					return c.grammarErrorOnFirstToken(node, diagnostics.Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name)
				}
			}

			// if we've seen any modifiers aside from `export`, `default`, or another decorator, then this is an invalid position
			if flags&^(ast.ModifierFlagsExportDefault|ast.ModifierFlagsDecorator) != 0 {
				return c.grammarErrorOnNode(modifier, diagnostics.Decorators_are_not_valid_here)
			}

			// if we've already seen leading decorators and leading modifiers, then trailing decorators are an invalid position
			if hasLeadingDecorators && flags&ast.ModifierFlagsModifier != 0 {
				if firstDecorator == nil {
					panic("Expected firstDecorator to be set")
				}
				sourceFile := ast.GetSourceFileOfNode(modifier)
				if !c.hasParseDiagnostics(sourceFile) {
					err := c.error(modifier, diagnostics.Decorators_may_not_appear_after_export_or_export_default_if_they_also_appear_before_export)
					err.AddRelatedInfo(createDiagnosticForNode(firstDecorator, diagnostics.Decorator_used_before_export_here))
					return true
				}
				return false
			}

			flags |= ast.ModifierFlagsDecorator

			// if we have not yet seen a modifier, then these are leading decorators
			if flags&ast.ModifierFlagsModifier == 0 {
				hasLeadingDecorators = true
			} else if flags&ast.ModifierFlagsExport != 0 {
				sawExportBeforeDecorators = true
			}

			if firstDecorator == nil {
				firstDecorator = modifier
			}
		} else {
			if modifier.Kind != ast.KindReadonlyKeyword {
				if node.Kind == ast.KindPropertySignature || node.Kind == ast.KindMethodSignature {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_type_member, scanner.TokenToString(modifier.Kind))
				}
				if node.Kind == ast.KindIndexSignature && (modifier.Kind != ast.KindStaticKeyword || !ast.IsClassLike(node.Parent)) {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_an_index_signature, scanner.TokenToString(modifier.Kind))
				}
			}
			if modifier.Kind != ast.KindInKeyword && modifier.Kind != ast.KindOutKeyword && modifier.Kind != ast.KindConstKeyword {
				if node.Kind == ast.KindTypeParameter {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_type_parameter, scanner.TokenToString(modifier.Kind))
				}
			}
			switch modifier.Kind {
			case ast.KindConstKeyword:
				if node.Kind != ast.KindEnumDeclaration && node.Kind != ast.KindTypeParameter {
					return c.grammarErrorOnNode(node, diagnostics.A_class_member_cannot_have_the_0_keyword, scanner.TokenToString(ast.KindConstKeyword))
				}

				// !!!
				// parent := (isJSDocTemplateTag(node.Parent) && getEffectiveJSDocHost(node.Parent)) || node.Parent
				parent := node.Parent

				if node.Kind == ast.KindTypeParameter {
					if !(ast.IsFunctionLikeDeclaration(parent) || ast.IsClassLike(parent) ||
						ast.IsFunctionTypeNode(parent) || ast.IsConstructorTypeNode(parent) ||
						ast.IsCallSignatureDeclaration(parent) || ast.IsConstructSignatureDeclaration(parent) ||
						ast.IsMethodSignatureDeclaration(parent)) {
						return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_can_only_appear_on_a_type_parameter_of_a_function_method_or_class, scanner.TokenToString(modifier.Kind))
					}
				}
			case ast.KindOverrideKeyword:
				// If node.kind === SyntaxKind.Parameter, checkParameter reports an error if it's not a parameter property.
				if flags&ast.ModifierFlagsOverride != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_already_seen, "override")
				} else if flags&ast.ModifierFlagsAmbient != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "override", "declare")
				} else if flags&ast.ModifierFlagsReadonly != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "override", "readonly")
				} else if flags&ast.ModifierFlagsAccessor != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "override", "accessor")
				} else if flags&ast.ModifierFlagsAsync != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "override", "async")
				}
				flags |= ast.ModifierFlagsOverride
				lastOverride = modifier

			case ast.KindPublicKeyword,
				ast.KindProtectedKeyword,
				ast.KindPrivateKeyword:
				text := visibilityToString(ast.ModifierToFlag(modifier.Kind))

				if flags&ast.ModifierFlagsAccessibilityModifier != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.Accessibility_modifier_already_seen)
				} else if flags&ast.ModifierFlagsOverride != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, text, "override")
				} else if flags&ast.ModifierFlagsStatic != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, text, "static")
				} else if flags&ast.ModifierFlagsAccessor != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, text, "accessor")
				} else if flags&ast.ModifierFlagsReadonly != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, text, "readonly")
				} else if flags&ast.ModifierFlagsAsync != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, text, "async")
				} else if node.Parent.Kind == ast.KindModuleBlock || node.Parent.Kind == ast.KindSourceFile {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_module_or_namespace_element, text)
				} else if flags&ast.ModifierFlagsAbstract != 0 {
					if modifier.Kind == ast.KindPrivateKeyword {
						return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, text, "abstract")
					} else {
						return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, text, "abstract")
					}
				} else if ast.IsPrivateIdentifierClassElementDeclaration(node) {
					return c.grammarErrorOnNode(modifier, diagnostics.An_accessibility_modifier_cannot_be_used_with_a_private_identifier)
				}
				flags |= ast.ModifierToFlag(modifier.Kind)
			case ast.KindStaticKeyword:
				if flags&ast.ModifierFlagsStatic != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_already_seen, "static")
				} else if flags&ast.ModifierFlagsReadonly != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "static", "readonly")
				} else if flags&ast.ModifierFlagsAsync != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "static", "async")
				} else if flags&ast.ModifierFlagsAccessor != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "static", "accessor")
				} else if node.Parent.Kind == ast.KindModuleBlock || node.Parent.Kind == ast.KindSourceFile {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_module_or_namespace_element, "static")
				} else if node.Kind == ast.KindParameter {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_parameter, "static")
				} else if flags&ast.ModifierFlagsAbstract != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "static", "abstract")
				} else if flags&ast.ModifierFlagsOverride != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "static", "override")
				}
				flags |= ast.ModifierFlagsStatic
				lastStatic = modifier
			case ast.KindAccessorKeyword:
				if flags&ast.ModifierFlagsAccessor != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_already_seen, "accessor")
				} else if flags&ast.ModifierFlagsReadonly != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "accessor", "readonly")
				} else if flags&ast.ModifierFlagsAmbient != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "accessor", "declare")
				} else if node.Kind != ast.KindPropertyDeclaration {
					return c.grammarErrorOnNode(modifier, diagnostics.X_accessor_modifier_can_only_appear_on_a_property_declaration)
				}

				flags |= ast.ModifierFlagsAccessor
			case ast.KindReadonlyKeyword:
				if flags&ast.ModifierFlagsReadonly != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_already_seen, "readonly")
				} else if node.Kind != ast.KindPropertyDeclaration && node.Kind != ast.KindPropertySignature && node.Kind != ast.KindIndexSignature && node.Kind != ast.KindParameter {
					// If node.kind === SyntaxKind.Parameter, checkParameter reports an error if it's not a parameter property.
					return c.grammarErrorOnNode(modifier, diagnostics.X_readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature)
				} else if flags&ast.ModifierFlagsAccessor != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "readonly", "accessor")
				}
				flags |= ast.ModifierFlagsReadonly
			case ast.KindExportKeyword:
				if c.compilerOptions.VerbatimModuleSyntax == core.TSTrue && node.Flags&ast.NodeFlagsAmbient == 0 && node.Kind != ast.KindTypeAliasDeclaration && node.Kind != ast.KindInterfaceDeclaration && node.Kind != ast.KindModuleDeclaration && node.Parent.Kind == ast.KindSourceFile && c.program.GetEmitModuleFormatOfFile(ast.GetSourceFileOfNode(node)) == core.ModuleKindCommonJS {
					return c.grammarErrorOnNode(modifier, diagnostics.A_top_level_export_modifier_cannot_be_used_on_value_declarations_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled)
				}
				if flags&ast.ModifierFlagsExport != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_already_seen, "export")
				} else if flags&ast.ModifierFlagsAmbient != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "export", "declare")
				} else if flags&ast.ModifierFlagsAbstract != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "export", "abstract")
				} else if flags&ast.ModifierFlagsAsync != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "export", "async")
				} else if ast.IsClassLike(node.Parent) {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_class_elements_of_this_kind, "export")
				} else if node.Kind == ast.KindParameter {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_parameter, "export")
				} else if blockScopeKind == ast.NodeFlagsUsing {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_using_declaration, "export")
				} else if blockScopeKind == ast.NodeFlagsAwaitUsing {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_an_await_using_declaration, "export")
				}
				flags |= ast.ModifierFlagsExport
			case ast.KindDefaultKeyword:
				var container *ast.Node
				if node.Parent.Kind == ast.KindSourceFile {
					container = node.Parent
				} else {
					container = node.Parent.Parent
				}
				if container.Kind == ast.KindModuleDeclaration && !ast.IsAmbientModule(container) {
					return c.grammarErrorOnNode(modifier, diagnostics.A_default_export_can_only_be_used_in_an_ECMAScript_style_module)
				} else if blockScopeKind == ast.NodeFlagsUsing {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_using_declaration, "default")
				} else if blockScopeKind == ast.NodeFlagsAwaitUsing {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_an_await_using_declaration, "default")
				} else if flags&ast.ModifierFlagsExport == 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "export", "default")
				} else if sawExportBeforeDecorators {
					return c.grammarErrorOnNode(firstDecorator, diagnostics.Decorators_are_not_valid_here)
				}

				flags |= ast.ModifierFlagsDefault
			case ast.KindDeclareKeyword:
				if flags&ast.ModifierFlagsAmbient != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_already_seen, "declare")
				} else if flags&ast.ModifierFlagsAsync != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_in_an_ambient_context, "async")
				} else if flags&ast.ModifierFlagsOverride != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_in_an_ambient_context, "override")
				} else if ast.IsClassLike(node.Parent) && !ast.IsPropertyDeclaration(node) {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_class_elements_of_this_kind, "declare")
				} else if node.Kind == ast.KindParameter {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_parameter, "declare")
				} else if blockScopeKind == ast.NodeFlagsUsing {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_using_declaration, "declare")
				} else if blockScopeKind == ast.NodeFlagsAwaitUsing {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_an_await_using_declaration, "declare")
				} else if (node.Parent.Flags&ast.NodeFlagsAmbient != 0) && node.Parent.Kind == ast.KindModuleBlock {
					return c.grammarErrorOnNode(modifier, diagnostics.A_declare_modifier_cannot_be_used_in_an_already_ambient_context)
				} else if ast.IsPrivateIdentifierClassElementDeclaration(node) {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_a_private_identifier, "declare")
				} else if flags&ast.ModifierFlagsAccessor != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "declare", "accessor")
				}
				flags |= ast.ModifierFlagsAmbient
				lastDeclare = modifier
			case ast.KindAbstractKeyword:
				if flags&ast.ModifierFlagsAbstract != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_already_seen, "abstract")
				}
				if node.Kind != ast.KindClassDeclaration && node.Kind != ast.KindConstructorType {
					if node.Kind != ast.KindMethodDeclaration && node.Kind != ast.KindPropertyDeclaration && node.Kind != ast.KindGetAccessor && node.Kind != ast.KindSetAccessor {
						return c.grammarErrorOnNode(modifier, diagnostics.X_abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration)
					}
					if !(node.Parent.Kind == ast.KindClassDeclaration && ast.HasSyntacticModifier(node.Parent, ast.ModifierFlagsAbstract)) {
						var message *diagnostics.Message
						if node.Kind == ast.KindPropertyDeclaration {
							message = diagnostics.Abstract_properties_can_only_appear_within_an_abstract_class
						} else {
							message = diagnostics.Abstract_methods_can_only_appear_within_an_abstract_class
						}
						return c.grammarErrorOnNode(modifier, message)
					}
					if flags&ast.ModifierFlagsStatic != 0 {
						return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "static", "abstract")
					}
					if flags&ast.ModifierFlagsPrivate != 0 {
						return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "private", "abstract")
					}
					if flags&ast.ModifierFlagsAsync != 0 && lastAsync != nil {
						return c.grammarErrorOnNode(lastAsync, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "async", "abstract")
					}
					if flags&ast.ModifierFlagsOverride != 0 {
						return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "abstract", "override")
					}
					if flags&ast.ModifierFlagsAccessor != 0 {
						return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "abstract", "accessor")
					}
				}
				if name := node.Name(); name != nil && name.Kind == ast.KindPrivateIdentifier {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_a_private_identifier, "abstract")
				}

				flags |= ast.ModifierFlagsAbstract
			case ast.KindAsyncKeyword:
				if flags&ast.ModifierFlagsAsync != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_already_seen, "async")
				} else if flags&ast.ModifierFlagsAmbient != 0 || node.Parent.Flags&ast.NodeFlagsAmbient != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_in_an_ambient_context, "async")
				} else if node.Kind == ast.KindParameter {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_appear_on_a_parameter, "async")
				}
				if flags&ast.ModifierFlagsAbstract != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_cannot_be_used_with_1_modifier, "async", "abstract")
				}
				flags |= ast.ModifierFlagsAsync
				lastAsync = modifier
			case ast.KindInKeyword,
				ast.KindOutKeyword:
				var inOutFlag ast.ModifierFlags
				if modifier.Kind == ast.KindInKeyword {
					inOutFlag = ast.ModifierFlagsIn
				} else {
					inOutFlag = ast.ModifierFlagsOut
				}
				var inOutText string
				if modifier.Kind == ast.KindInKeyword {
					inOutText = "in"
				} else {
					inOutText = "out"
				}
				// !!!
				// parent := isJSDocTemplateTag(node.Parent) && (getEffectiveJSDocHost(node.Parent) || core.Find(getJSDocRoot(node.Parent). /* ? */ tags, isJSDocTypedefTag)) || node.Parent
				parent := node.Parent
				if node.Kind != ast.KindTypeParameter || parent != nil && !(ast.IsInterfaceDeclaration(parent) || ast.IsClassLike(parent) || ast.IsTypeAliasDeclaration(parent) || isJSDocTypedefTag(parent)) {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_can_only_appear_on_a_type_parameter_of_a_class_interface_or_type_alias, inOutText)
				}
				if flags&inOutFlag != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_already_seen, inOutText)
				}
				if inOutFlag&ast.ModifierFlagsIn != 0 && flags&ast.ModifierFlagsOut != 0 {
					return c.grammarErrorOnNode(modifier, diagnostics.X_0_modifier_must_precede_1_modifier, "in", "out")
				}
				flags |= inOutFlag
			}
		}
	}

	if node.Kind == ast.KindConstructor {
		if flags&ast.ModifierFlagsStatic != 0 {
			return c.grammarErrorOnNode(lastStatic, diagnostics.X_0_modifier_cannot_appear_on_a_constructor_declaration, "static")
		}
		if flags&ast.ModifierFlagsOverride != 0 {
			return c.grammarErrorOnNode(lastOverride, diagnostics.X_0_modifier_cannot_appear_on_a_constructor_declaration, "override")
		}
		if flags&ast.ModifierFlagsAsync != 0 {
			return c.grammarErrorOnNode(lastAsync, diagnostics.X_0_modifier_cannot_appear_on_a_constructor_declaration, "async")
		}
		return false
	} else if (node.Kind == ast.KindImportDeclaration || node.Kind == ast.KindImportEqualsDeclaration) && flags&ast.ModifierFlagsAmbient != 0 {
		return c.grammarErrorOnNode(lastDeclare, diagnostics.A_0_modifier_cannot_be_used_with_an_import_declaration, "declare")
	} else if node.Kind == ast.KindParameter && (flags&ast.ModifierFlagsParameterPropertyModifier != 0) && ast.IsBindingPattern(node.Name()) {
		return c.grammarErrorOnNode(node, diagnostics.A_parameter_property_may_not_be_declared_using_a_binding_pattern)
	} else if node.Kind == ast.KindParameter && (flags&ast.ModifierFlagsParameterPropertyModifier != 0) && node.AsParameterDeclaration().DotDotDotToken != nil {
		return c.grammarErrorOnNode(node, diagnostics.A_parameter_property_cannot_be_declared_using_a_rest_parameter)
	}
	if flags&ast.ModifierFlagsAsync != 0 {
		return c.checkGrammarAsyncModifier(node, lastAsync)
	}
	return false
}

func isJSDocTypedefTag(_ *ast.Node) bool {
	// !!!
	return false
}

func (c *Checker) reportObviousModifierErrors(node *ast.Node) bool {
	modifier := c.findFirstIllegalModifier(node)
	if modifier == nil {
		return false
	}
	return c.grammarErrorOnFirstToken(modifier, diagnostics.Modifiers_cannot_appear_here)
}

func (c *Checker) findFirstModifierExcept(node *ast.Node, allowedModifier ast.Kind) *ast.Node {
	modifiers := node.Modifiers()
	if modifiers == nil {
		return nil
	}
	modifier := core.Find(modifiers.Nodes, ast.IsModifier)
	if modifier != nil && modifier.Kind != allowedModifier {
		return modifier
	} else {
		return nil
	}
}

func (c *Checker) findFirstIllegalModifier(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindConstructor,
		ast.KindPropertyDeclaration,
		ast.KindPropertySignature,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature,
		ast.KindIndexSignature,
		ast.KindModuleDeclaration,
		ast.KindImportDeclaration,
		ast.KindImportEqualsDeclaration,
		ast.KindExportDeclaration,
		ast.KindExportAssignment,
		ast.KindFunctionExpression,
		ast.KindArrowFunction,
		ast.KindParameter,
		ast.KindTypeParameter:
		return nil
	case ast.KindClassStaticBlockDeclaration,
		ast.KindPropertyAssignment,
		ast.KindShorthandPropertyAssignment,
		ast.KindNamespaceExportDeclaration,
		ast.KindMissingDeclaration:
		if modifiers := node.Modifiers(); modifiers != nil {
			return core.Find(modifiers.Nodes, ast.IsModifier)
		}
		return nil
	default:
		if node.Parent.Kind == ast.KindModuleBlock || node.Parent.Kind == ast.KindSourceFile {
			return nil
		}
		switch node.Kind {
		case ast.KindFunctionDeclaration:
			return c.findFirstModifierExcept(node, ast.KindAsyncKeyword)
		case ast.KindClassDeclaration,
			ast.KindConstructorType:
			return c.findFirstModifierExcept(node, ast.KindAbstractKeyword)
		case ast.KindClassExpression,
			ast.KindInterfaceDeclaration,
			ast.KindTypeAliasDeclaration:
			if modifiers := node.Modifiers(); modifiers != nil {
				return core.Find(modifiers.Nodes, ast.IsModifier)
			}
			return nil
		case ast.KindVariableStatement:
			if node.AsVariableStatement().DeclarationList.Flags&ast.NodeFlagsUsing != 0 {
				return c.findFirstModifierExcept(node, ast.KindAwaitKeyword)
			} else if modifiers := node.Modifiers(); modifiers != nil {
				return core.Find(modifiers.Nodes, ast.IsModifier)
			}
			return nil
		case ast.KindEnumDeclaration:
			return c.findFirstModifierExcept(node, ast.KindConstKeyword)
		default:
			panic("Unhandled case in findFirstIllegalModifier.")
		}
	}
}

func (c *Checker) reportObviousDecoratorErrors(node *ast.Node) bool {
	decorator := c.findFirstIllegalDecorator(node)
	if decorator == nil {
		return false
	}
	return c.grammarErrorOnFirstToken(decorator, diagnostics.Decorators_are_not_valid_here)
}

func (c *Checker) findFirstIllegalDecorator(node *ast.Node) *ast.Node {
	if ast.CanHaveIllegalDecorators(node) {
		decorator := core.Find(node.Modifiers().Nodes, ast.IsDecorator)
		return decorator
	} else {
		return nil
	}
}

func (c *Checker) checkGrammarAsyncModifier(node *ast.Node, asyncModifier *ast.Node) bool {
	switch node.Kind {
	case ast.KindMethodDeclaration,
		ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindArrowFunction:
		return false
	}

	return c.grammarErrorOnNode(asyncModifier, diagnostics.X_0_modifier_cannot_be_used_here, "async")
}

func (c *Checker) checkGrammarForDisallowedTrailingComma(list *ast.NodeList, diag *diagnostics.Message) bool {
	if list != nil && list.HasTrailingComma() {
		return c.grammarErrorAtPos(list.Nodes[0], list.End()-len(","), len(","), diag)
	}
	return false
}

func (c *Checker) checkGrammarTypeParameterList(typeParameters *ast.NodeList, file *ast.SourceFile) bool {
	if typeParameters != nil && len(typeParameters.Nodes) == 0 {
		start := typeParameters.Pos() - len("<")
		end := scanner.SkipTrivia(file.Text, typeParameters.End()) + len(">")
		return c.grammarErrorAtPos(file.AsNode(), start, end-start, diagnostics.Type_parameter_list_cannot_be_empty)
	}
	return false
}

func (c *Checker) checkGrammarParameterList(parameters *ast.NodeList) bool {
	seenOptionalParameter := false
	parameterCount := len(parameters.Nodes)

	for i := range parameterCount {
		parameter := parameters.Nodes[i].AsParameterDeclaration()
		if parameter.DotDotDotToken != nil {
			if i != parameterCount-1 {
				return c.grammarErrorOnNode(parameter.DotDotDotToken, diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list)
			}
			if parameter.Flags&ast.NodeFlagsAmbient == 0 {
				c.checkGrammarForDisallowedTrailingComma(parameters, diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma)
			}

			if parameter.QuestionToken != nil {
				return c.grammarErrorOnNode(parameter.QuestionToken, diagnostics.A_rest_parameter_cannot_be_optional)
			}

			if parameter.Initializer != nil {
				return c.grammarErrorOnNode(parameter.Name(), diagnostics.A_rest_parameter_cannot_have_an_initializer)
			}
		} else if isOptionalDeclaration(parameter.AsNode()) {
			// !!!
			// used to be hasEffectiveQuestionToken for JSDoc
			seenOptionalParameter = true
			if parameter.QuestionToken != nil && parameter.Initializer != nil {
				return c.grammarErrorOnNode(parameter.Name(), diagnostics.Parameter_cannot_have_question_mark_and_initializer)
			}
		} else if seenOptionalParameter && parameter.Initializer == nil {
			return c.grammarErrorOnNode(parameter.Name(), diagnostics.A_required_parameter_cannot_follow_an_optional_parameter)
		}
	}

	return false
}

func (c *Checker) checkGrammarForUseStrictSimpleParameterList(node *ast.Node) bool {
	if c.languageVersion >= core.ScriptTargetES2016 {
		body := node.Body()
		var useStrictDirective *ast.Node
		if body != nil && ast.IsBlock(body) {
			useStrictDirective = binder.FindUseStrictPrologue(ast.GetSourceFileOfNode(node), body.AsBlock().Statements.Nodes)
		}
		if useStrictDirective != nil {
			nonSimpleParameters := core.Filter(node.Parameters(), func(n *ast.Node) bool {
				parameter := n.AsParameterDeclaration()
				return parameter.Initializer != nil || ast.IsBindingPattern(parameter.Name()) || isRestParameter(parameter.AsNode())
			})
			if len(nonSimpleParameters) != 0 {
				for _, parameter := range nonSimpleParameters {
					err := c.error(parameter, diagnostics.This_parameter_is_not_allowed_with_use_strict_directive)
					err.AddRelatedInfo(createDiagnosticForNode(useStrictDirective, diagnostics.X_use_strict_directive_used_here))
				}

				err := c.error(useStrictDirective, diagnostics.X_use_strict_directive_cannot_be_used_with_non_simple_parameter_list)
				for index, parameter := range nonSimpleParameters {
					var relatedMessage *diagnostics.Message
					if index == 0 {
						relatedMessage = diagnostics.Non_simple_parameter_declared_here
					} else {
						relatedMessage = diagnostics.X_and_here
					}
					err.AddRelatedInfo(createDiagnosticForNode(parameter, relatedMessage))
				}

				return true
			}
		}
	}
	return false
}

func (c *Checker) checkGrammarFunctionLikeDeclaration(node *ast.Node) bool {
	// Prevent cascading error by short-circuit
	file := ast.GetSourceFileOfNode(node)
	funcData := node.FunctionLikeData()
	return c.checkGrammarModifiers(node) || c.checkGrammarTypeParameterList(funcData.TypeParameters, file) ||
		c.checkGrammarParameterList(funcData.Parameters) || c.checkGrammarArrowFunction(node, file) ||
		(ast.IsFunctionLikeDeclaration(node) && c.checkGrammarForUseStrictSimpleParameterList(node))
}

func (c *Checker) checkGrammarClassLikeDeclaration(node *ast.Node) bool {
	file := ast.GetSourceFileOfNode(node)
	return c.checkGrammarClassDeclarationHeritageClauses(node) || c.checkGrammarTypeParameterList(node.ClassLikeData().TypeParameters, file)
}

func (c *Checker) checkGrammarArrowFunction(node *ast.Node, file *ast.SourceFile) bool {
	if !ast.IsArrowFunction(node) {
		return false
	}

	arrowFunc := node.AsArrowFunction()
	typeParameters := arrowFunc.TypeParameters
	if typeParameters != nil {
		typeParamNodes := typeParameters.Nodes
		if len(typeParamNodes) == 0 ||
			len(typeParamNodes) == 1 && typeParamNodes[0].AsTypeParameter().Constraint == nil ||
			typeParameters.HasTrailingComma() {
			if tspath.FileExtensionIsOneOf(file.FileName(), []string{tspath.ExtensionMts, tspath.ExtensionCts}) {
				// TODO(danielr): should we return early here?
				c.grammarErrorOnNode(typeParameters.Nodes[0], diagnostics.This_syntax_is_reserved_in_files_with_the_mts_or_cts_extension_Add_a_trailing_comma_or_explicit_constraint)
			}
		}
	}

	equalsGreaterThanToken := arrowFunc.EqualsGreaterThanToken
	startLine, _ := scanner.GetLineAndCharacterOfPosition(file, equalsGreaterThanToken.Pos())
	endLine, _ := scanner.GetLineAndCharacterOfPosition(file, equalsGreaterThanToken.End())
	return startLine != endLine && c.grammarErrorOnNode(equalsGreaterThanToken, diagnostics.Line_terminator_not_permitted_before_arrow)
}

func (c *Checker) checkGrammarIndexSignatureParameters(node *ast.IndexSignatureDeclaration) bool {
	paramNodes := node.Parameters.Nodes

	if len(paramNodes) == 0 {
		return c.grammarErrorOnNode(node.AsNode(), diagnostics.An_index_signature_must_have_exactly_one_parameter)
	}

	parameter := paramNodes[0].AsParameterDeclaration()
	if len(paramNodes) != 1 {
		return c.grammarErrorOnNode(parameter.Name(), diagnostics.An_index_signature_must_have_exactly_one_parameter)
	}

	c.checkGrammarForDisallowedTrailingComma(node.Parameters, diagnostics.An_index_signature_cannot_have_a_trailing_comma)
	if parameter.DotDotDotToken != nil {
		return c.grammarErrorOnNode(parameter.DotDotDotToken, diagnostics.An_index_signature_cannot_have_a_rest_parameter)
	}
	if parameter.Modifiers() != nil {
		return c.grammarErrorOnNode(parameter.Name(), diagnostics.An_index_signature_parameter_cannot_have_an_accessibility_modifier)
	}
	if parameter.QuestionToken != nil {
		return c.grammarErrorOnNode(parameter.QuestionToken, diagnostics.An_index_signature_parameter_cannot_have_a_question_mark)
	}
	if parameter.Initializer != nil {
		return c.grammarErrorOnNode(parameter.Name(), diagnostics.An_index_signature_parameter_cannot_have_an_initializer)
	}
	typeNode := parameter.Type
	if typeNode == nil {
		return c.grammarErrorOnNode(parameter.Name(), diagnostics.An_index_signature_parameter_must_have_a_type_annotation)
	}
	t := c.getTypeFromTypeNode(typeNode)
	if someType(t, func(t *Type) bool {
		return t.flags&TypeFlagsStringOrNumberLiteralOrUnique != 0
	}) || c.isGenericType(t) {
		return c.grammarErrorOnNode(parameter.Name(), diagnostics.An_index_signature_parameter_type_cannot_be_a_literal_type_or_generic_type_Consider_using_a_mapped_object_type_instead)
	}
	if !everyType(t, c.isValidIndexKeyType) {
		return c.grammarErrorOnNode(parameter.Name(), diagnostics.An_index_signature_parameter_type_must_be_string_number_symbol_or_a_template_literal_type)
	}
	if node.Type == nil {
		return c.grammarErrorOnNode(node.AsNode(), diagnostics.An_index_signature_must_have_a_type_annotation)
	}
	return false
}

func (c *Checker) checkGrammarIndexSignature(node *ast.IndexSignatureDeclaration) bool {
	// Prevent cascading error by short-circuit
	return c.checkGrammarModifiers(node.AsNode()) || c.checkGrammarIndexSignatureParameters(node)
}

func (c *Checker) checkGrammarForAtLeastOneTypeArgument(node *ast.Node, typeArguments *ast.NodeList) bool {
	if typeArguments != nil && len(typeArguments.Nodes) == 0 {
		sourceFile := ast.GetSourceFileOfNode(node)
		start := typeArguments.Pos() - len("<")
		end := scanner.SkipTrivia(sourceFile.Text, typeArguments.End()) + len(">")
		return c.grammarErrorAtPos(sourceFile.AsNode(), start, end-start, diagnostics.Type_argument_list_cannot_be_empty)
	}
	return false
}

func (c *Checker) checkGrammarTypeArguments(node *ast.Node, typeArguments *ast.NodeList) bool {
	return c.checkGrammarForDisallowedTrailingComma(typeArguments, diagnostics.Trailing_comma_not_allowed) || c.checkGrammarForAtLeastOneTypeArgument(node, typeArguments)
}

func (c *Checker) checkGrammarTaggedTemplateChain(node *ast.TaggedTemplateExpression) bool {
	if node.QuestionDotToken != nil || node.Flags&ast.NodeFlagsOptionalChain != 0 {
		return c.grammarErrorOnNode(node.Template, diagnostics.Tagged_template_expressions_are_not_permitted_in_an_optional_chain)
	}
	return false
}

func (c *Checker) checkGrammarHeritageClause(node *ast.HeritageClause) bool {
	types := node.Types
	if c.checkGrammarForDisallowedTrailingComma(types, diagnostics.Trailing_comma_not_allowed) {
		return true
	}
	if types != nil && len(types.Nodes) == 0 {
		listType := scanner.TokenToString(node.Token)
		// TODO(danielr): why not error on the token?
		return c.grammarErrorAtPos(node.AsNode(), types.Pos(), 0, diagnostics.X_0_list_cannot_be_empty, listType)
	}

	for _, node := range types.Nodes {
		if c.checkGrammarExpressionWithTypeArguments(node) {
			return true
		}
	}
	return false
}

func (c *Checker) checkGrammarExpressionWithTypeArguments(node *ast.Node /*Union[ExpressionWithTypeArguments, TypeQueryNode]*/) bool {
	if !ast.IsExpressionWithTypeArguments(node) {
		return false
	}
	exprWithTypeArgs := node.AsExpressionWithTypeArguments()
	if node.Expression().Kind == ast.KindImportKeyword && exprWithTypeArgs.TypeArguments != nil {
		return c.grammarErrorOnNode(node, diagnostics.This_use_of_import_is_invalid_import_calls_can_be_written_but_they_must_have_parentheses_and_cannot_have_type_arguments)
	}
	return c.checkGrammarTypeArguments(node, exprWithTypeArgs.TypeArguments)
}

func (c *Checker) checkGrammarClassDeclarationHeritageClauses(node *ast.ClassLikeDeclaration) bool {
	seenExtendsClause := false
	seenImplementsClause := false

	classLikeData := node.ClassLikeData()

	if !c.checkGrammarModifiers(node) && classLikeData.HeritageClauses != nil {
		for _, heritageClauseNode := range classLikeData.HeritageClauses.Nodes {
			heritageClause := heritageClauseNode.AsHeritageClause()
			if heritageClause.Token == ast.KindExtendsKeyword {
				if seenExtendsClause {
					return c.grammarErrorOnFirstToken(heritageClauseNode, diagnostics.X_extends_clause_already_seen)
				}

				if seenImplementsClause {
					return c.grammarErrorOnFirstToken(heritageClauseNode, diagnostics.X_extends_clause_must_precede_implements_clause)
				}

				typeNodes := heritageClause.Types.Nodes
				if len(typeNodes) > 1 {
					return c.grammarErrorOnFirstToken(typeNodes[1], diagnostics.Classes_can_only_extend_a_single_class)
				}

				seenExtendsClause = true
			} else {
				if heritageClause.Token != ast.KindImplementsKeyword {
					panic(fmt.Sprintf("Unexpected token %q", heritageClause.Token))
				}
				if seenImplementsClause {
					return c.grammarErrorOnFirstToken(heritageClauseNode, diagnostics.X_implements_clause_already_seen)
				}

				seenImplementsClause = true
			}

			// Grammar checking heritageClause inside class declaration
			c.checkGrammarHeritageClause(heritageClause)
		}
	}

	return false
}

func (c *Checker) checkGrammarInterfaceDeclaration(node *ast.InterfaceDeclaration) bool {
	if node.HeritageClauses != nil {
		seenExtendsClause := false
		for _, heritageClauseNode := range node.HeritageClauses.Nodes {
			heritageClause := heritageClauseNode.AsHeritageClause()

			switch heritageClause.Token {
			case ast.KindExtendsKeyword:
				if seenExtendsClause {
					return c.grammarErrorOnFirstToken(heritageClauseNode, diagnostics.X_extends_clause_already_seen)
				}
				seenExtendsClause = true
			case ast.KindImplementsKeyword:
				return c.grammarErrorOnFirstToken(heritageClauseNode, diagnostics.Interface_declaration_cannot_have_implements_clause)
			default:
				panic(fmt.Sprintf("Unexpected token %q", heritageClause.Token.String()))
			}

			// Grammar checking heritageClause inside class declaration
			c.checkGrammarHeritageClause(heritageClause)
		}
	}

	return false
}

func (c *Checker) checkGrammarComputedPropertyName(node *ast.Node) bool {
	// If node is not a computedPropertyName, just skip the grammar checking
	if node.Kind != ast.KindComputedPropertyName {
		return false
	}

	computedPropertyName := node.AsComputedPropertyName()
	if computedPropertyName.Expression.Kind == ast.KindBinaryExpression && (computedPropertyName.Expression.AsBinaryExpression()).OperatorToken.Kind == ast.KindCommaToken {
		return c.grammarErrorOnNode(computedPropertyName.Expression, diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name)
	}
	return false
}

func (c *Checker) checkGrammarForGenerator(node *ast.Node) bool {
	if bodyData := node.BodyData(); bodyData != nil && bodyData.AsteriskToken != nil {
		if node.Kind != ast.KindFunctionDeclaration && node.Kind != ast.KindFunctionExpression && node.Kind != ast.KindMethodDeclaration {
			panic(fmt.Sprintf("Unexpected node kind %q", node.Kind))
		}
		if node.Flags&ast.NodeFlagsAmbient != 0 {
			return c.grammarErrorOnNode(bodyData.AsteriskToken, diagnostics.Generators_are_not_allowed_in_an_ambient_context)
		}
		if bodyData.Body == nil {
			return c.grammarErrorOnNode(bodyData.AsteriskToken, diagnostics.An_overload_signature_cannot_be_declared_as_a_generator)
		}
	}

	return false
}

func (c *Checker) checkGrammarForInvalidQuestionMark(postfixToken *ast.TokenNode, message *diagnostics.Message) bool {
	return postfixToken != nil && postfixToken.Kind == ast.KindQuestionToken && c.grammarErrorOnNode(postfixToken, message)
}

func (c *Checker) checkGrammarForInvalidExclamationToken(postfixToken *ast.TokenNode, message *diagnostics.Message) bool {
	return postfixToken != nil && postfixToken.Kind == ast.KindExclamationToken && c.grammarErrorOnNode(postfixToken, message)
}

func (c *Checker) checkGrammarObjectLiteralExpression(node *ast.ObjectLiteralExpression, inDestructuring bool) bool {
	seen := make(map[string]DeclarationMeaning)

	var properties []*ast.Node
	if node.Properties != nil {
		properties = node.Properties.Nodes
	}
	for _, prop := range properties {
		if prop.Kind == ast.KindSpreadAssignment {
			spreadAssignment := prop.AsSpreadAssignment()
			if inDestructuring {
				// a rest property cannot be destructured any further
				expression := ast.SkipParentheses(spreadAssignment.Expression)
				if ast.IsArrayLiteralExpression(expression) || ast.IsObjectLiteralExpression(expression) {
					return c.grammarErrorOnNode(spreadAssignment.Expression, diagnostics.A_rest_element_cannot_contain_a_binding_pattern)
				}
			}
			continue
		}
		name := prop.Name()
		if name.Kind == ast.KindComputedPropertyName {
			// If the name is not a ComputedPropertyName, the grammar checking will skip it
			c.checkGrammarComputedPropertyName(name)
		}

		if prop.Kind == ast.KindShorthandPropertyAssignment && !inDestructuring {
			shorthandProp := prop.AsShorthandPropertyAssignment()
			if shorthandProp.ObjectAssignmentInitializer != nil {
				// having objectAssignmentInitializer is only valid in an ObjectAssignmentPattern.
				// Outside of destructuring, it is a syntax error.

				// Try to grab the last node prior to the initializer,
				// then error on the first token following (which should be the `=` token).
				var lastNodeBeforeInitializer *ast.Node
				shorthandProp.ForEachChild(func(child *ast.Node) bool {
					if child != shorthandProp.ObjectAssignmentInitializer {
						lastNodeBeforeInitializer = child
						return false
					}
					return true
				})

				c.grammarErrorOnFirstToken(lastNodeBeforeInitializer, diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern)
			}
		}

		if name.Kind == ast.KindPrivateIdentifier {
			c.grammarErrorOnNode(name, diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies)
		}

		// Modifiers are never allowed on properties except for 'async' on a method declaration
		if modifiers := prop.Modifiers(); modifiers != nil {
			if ast.CanHaveModifiers(prop) {
				for _, mod := range modifiers.Nodes {
					if ast.IsModifier(mod) && (mod.Kind != ast.KindAsyncKeyword || prop.Kind != ast.KindMethodDeclaration) {
						c.grammarErrorOnNode(mod, diagnostics.X_0_modifier_cannot_be_used_here, scanner.GetTextOfNode(mod))
					}
				}
			} else if ast.CanHaveIllegalModifiers(prop) {
				for _, mod := range modifiers.Nodes {
					if ast.IsModifier(mod) {
						c.grammarErrorOnNode(mod, diagnostics.X_0_modifier_cannot_be_used_here, scanner.GetTextOfNode(mod))
					}
				}
			}
		}

		// ECMA-262 11.1.5 Object Initializer
		// If previous is not undefined then throw a SyntaxError exception if any of the following conditions are true
		// a.This production is contained in strict code and IsDataDescriptor(previous) is true and
		// IsDataDescriptor(propId.descriptor) is true.
		//    b.IsDataDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true.
		//    c.IsAccessorDescriptor(previous) is true and IsDataDescriptor(propId.descriptor) is true.
		//    d.IsAccessorDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true
		// and either both previous and propId.descriptor have[[Get]] fields or both previous and propId.descriptor have[[Set]] fields
		var currentKind DeclarationMeaning
		switch prop.Kind {
		case ast.KindShorthandPropertyAssignment,
			ast.KindPropertyAssignment:
			var commonProp *ast.NamedMemberBase
			if prop.Kind == ast.KindShorthandPropertyAssignment {
				prop.ClassLikeData()
				commonProp = &prop.AsShorthandPropertyAssignment().NamedMemberBase
			} else {
				commonProp = &prop.AsPropertyAssignment().NamedMemberBase
			}

			// Grammar checking for computedPropertyName and shorthandPropertyAssignment
			c.checkGrammarForInvalidExclamationToken(commonProp.PostfixToken, diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context)
			c.checkGrammarForInvalidQuestionMark(commonProp.PostfixToken, diagnostics.An_object_member_cannot_be_declared_optional)

			if name.Kind == ast.KindNumericLiteral {
				c.checkGrammarNumericLiteral(name.AsNumericLiteral())
			}

			if name.Kind == ast.KindBigIntLiteral {
				c.addErrorOrSuggestion(true, createDiagnosticForNode(name, diagnostics.A_bigint_literal_cannot_be_used_as_a_property_name))
			}

			currentKind = DeclarationMeaningPropertyAssignment
		case ast.KindMethodDeclaration:
			currentKind = DeclarationMeaningMethod
		case ast.KindGetAccessor:
			currentKind = DeclarationMeaningGetAccessor
		case ast.KindSetAccessor:
			currentKind = DeclarationMeaningSetAccessor
		default:
			panic(fmt.Sprintf("Unexpected node kind %q", prop.Kind))
		}

		if !inDestructuring {
			effectiveName, ok := c.getEffectivePropertyNameForPropertyNameNode(name)
			if !ok {
				continue
			}

			existingKind := seen[effectiveName]
			if existingKind == 0 {
				seen[effectiveName] = currentKind
			} else {
				if (currentKind&DeclarationMeaningMethod != 0) && (existingKind&DeclarationMeaningMethod != 0) {
					c.grammarErrorOnNode(name, diagnostics.Duplicate_identifier_0, scanner.GetTextOfNode(name))
				} else if (currentKind&DeclarationMeaningPropertyAssignment != 0) && (existingKind&DeclarationMeaningPropertyAssignment != 0) {
					c.grammarErrorOnNode(name, diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name, scanner.GetTextOfNode(name))
				} else if (currentKind&DeclarationMeaningGetOrSetAccessor != 0) && (existingKind&DeclarationMeaningGetOrSetAccessor != 0) {
					if existingKind != DeclarationMeaningGetOrSetAccessor && currentKind != existingKind {
						seen[effectiveName] = currentKind | existingKind
					} else {
						return c.grammarErrorOnNode(name, diagnostics.An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name)
					}
				} else {
					return c.grammarErrorOnNode(name, diagnostics.An_object_literal_cannot_have_property_and_accessor_with_the_same_name)
				}
			}
		}
	}

	return false
}

func (c *Checker) checkGrammarJsxElement(node *ast.Node, jsxCommon struct {
	tagName       *ast.JsxTagNameExpression
	typeArguments *ast.NodeList
	attributes    *ast.JsxAttributesNode
},
) bool {
	c.checkGrammarJsxName(jsxCommon.tagName)
	c.checkGrammarTypeArguments(node, jsxCommon.typeArguments)
	var seen core.Set[string]

	for _, attrNode := range jsxCommon.attributes.AsJsxAttributes().Properties.Nodes {
		if attrNode.Kind == ast.KindJsxSpreadAttribute {
			continue
		}

		attr := attrNode.AsJsxAttribute()
		name := attr.Name()
		initializer := attr.Initializer
		textOfName := name.Text()
		if !seen.Has(textOfName) {
			seen.Add(textOfName)
		} else {
			return c.grammarErrorOnNode(name, diagnostics.JSX_elements_cannot_have_multiple_attributes_with_the_same_name)
		}

		if initializer != nil && initializer.Kind == ast.KindJsxExpression && initializer.Expression() == nil {
			return c.grammarErrorOnNode(initializer, diagnostics.JSX_attributes_must_only_be_assigned_a_non_empty_expression)
		}
	}
	return false
}

func (c *Checker) checkGrammarJsxName(node *ast.JsxTagNameExpression) bool {
	if ast.IsPropertyAccessExpression(node) && ast.IsJsxNamespacedName(node.Expression()) {
		return c.grammarErrorOnNode(node.Expression(), diagnostics.JSX_property_access_expressions_cannot_include_JSX_namespace_names)
	}

	if ast.IsJsxNamespacedName(node) && c.compilerOptions.GetJSXTransformEnabled() && !IsIntrinsicJsxName(node.AsJsxNamespacedName().Namespace.Text()) {
		return c.grammarErrorOnNode(node, diagnostics.React_components_cannot_include_JSX_namespace_names)
	}

	return false
}

func (c *Checker) checkGrammarJsxExpression(node *ast.JsxExpression) bool {
	if node.Expression != nil && ast.IsCommaSequence(node.Expression) {
		return c.grammarErrorOnNode(node.Expression, diagnostics.JSX_expressions_may_not_use_the_comma_operator_Did_you_mean_to_write_an_array)
	}

	return false
}

func (c *Checker) checkGrammarForInOrForOfStatement(forInOrOfStatement *ast.ForInOrOfStatement) bool {
	asNode := forInOrOfStatement.AsNode()
	if c.checkGrammarStatementInAmbientContext(asNode) {
		return true
	}

	if forInOrOfStatement.Kind == ast.KindForOfStatement && forInOrOfStatement.AwaitModifier != nil {
		if forInOrOfStatement.Flags&ast.NodeFlagsAwaitContext == 0 {
			sourceFile := ast.GetSourceFileOfNode(asNode)
			if ast.IsInTopLevelContext(asNode) {
				if !c.hasParseDiagnostics(sourceFile) {
					if !ast.IsEffectiveExternalModule(sourceFile, c.compilerOptions) {
						c.diagnostics.Add(createDiagnosticForNode(forInOrOfStatement.AwaitModifier, diagnostics.X_for_await_loops_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module))
					}
					switch c.moduleKind {
					case core.ModuleKindNode16, core.ModuleKindNodeNext:
						sourceFileMetaData := c.program.GetSourceFileMetaData(sourceFile.Path())
						if sourceFileMetaData != nil && sourceFileMetaData.ImpliedNodeFormat == core.ModuleKindCommonJS {
							c.diagnostics.Add(createDiagnosticForNode(forInOrOfStatement.AwaitModifier, diagnostics.The_current_file_is_a_CommonJS_module_and_cannot_use_await_at_the_top_level))
							break
						}
						fallthrough
					case core.ModuleKindES2022,
						core.ModuleKindESNext,
						core.ModuleKindPreserve,
						core.ModuleKindSystem:
						if c.languageVersion >= core.ScriptTargetES2017 {
							break
						}
						fallthrough
					default:
						c.diagnostics.Add(createDiagnosticForNode(forInOrOfStatement.AwaitModifier, diagnostics.Top_level_for_await_loops_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_nodenext_or_preserve_and_the_target_option_is_set_to_es2017_or_higher))
					}
				}
			} else {
				// use of 'for-await-of' in non-async function
				if !c.hasParseDiagnostics(sourceFile) {
					diagnostic := createDiagnosticForNode(forInOrOfStatement.AwaitModifier, diagnostics.X_for_await_loops_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules)
					containingFunc := getContainingFunction(forInOrOfStatement.AsNode())
					if containingFunc != nil && containingFunc.Kind != ast.KindConstructor {
						// Debug.assert((getFunctionFlags(containingFunc)&FunctionFlagsAsync) == 0, "Enclosing function should never be an async function.")
						if hasAsyncModifier(containingFunc) {
							panic("Enclosing function should never be an async function.")
						}
						relatedInfo := createDiagnosticForNode(containingFunc, diagnostics.Did_you_mean_to_mark_this_function_as_async)
						diagnostic.AddRelatedInfo(relatedInfo)
					}
					c.diagnostics.Add(diagnostic)
					return true
				}
			}
		}
	}

	if ast.IsForOfStatement(asNode) && forInOrOfStatement.Flags&ast.NodeFlagsAwaitContext == 0 && ast.IsIdentifier(forInOrOfStatement.Initializer) && forInOrOfStatement.Initializer.Text() == "async" {
		c.grammarErrorOnNode(forInOrOfStatement.Initializer, diagnostics.The_left_hand_side_of_a_for_of_statement_may_not_be_async)
		return false
	}

	if forInOrOfStatement.Initializer.Kind == ast.KindVariableDeclarationList {
		variableList := forInOrOfStatement.Initializer.AsVariableDeclarationList()
		if !c.checkGrammarVariableDeclarationList(variableList) {
			declarations := variableList.Declarations

			// declarations.length can be zero if there is an error in variable declaration in for-of or for-in
			// See http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements for details
			// For example:
			//      var let = 10;
			//      for (let of [1,2,3]) {} // this is invalid ES6 syntax
			//      for (let in [1,2,3]) {} // this is invalid ES6 syntax
			// We will then want to skip on grammar checking on variableList declaration
			if len(declarations.Nodes) == 0 {
				return false
			}

			if len(declarations.Nodes) > 1 {
				var diagnostic *diagnostics.Message
				if forInOrOfStatement.Kind == ast.KindForInStatement {
					diagnostic = diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement
				} else {
					diagnostic = diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement
				}
				return c.grammarErrorOnFirstToken(declarations.Nodes[1], diagnostic)
			}

			firstVariableDeclaration := declarations.Nodes[0].AsVariableDeclaration()
			if firstVariableDeclaration.Initializer != nil {
				var diagnostic *diagnostics.Message
				if forInOrOfStatement.Kind == ast.KindForInStatement {
					diagnostic = diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer
				} else {
					diagnostic = diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer
				}
				return c.grammarErrorOnNode(firstVariableDeclaration.Name(), diagnostic)
			}
			if firstVariableDeclaration.Type != nil {
				var diagnostic *diagnostics.Message
				if forInOrOfStatement.Kind == ast.KindForInStatement {
					diagnostic = diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation
				} else {
					diagnostic = diagnostics.The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation
				}
				return c.grammarErrorOnNode(firstVariableDeclaration.AsNode(), diagnostic)
			}
		}
	}

	return false
}

func (c *Checker) checkGrammarAccessor(accessor *ast.AccessorDeclaration) bool {
	body := accessor.Body()
	if accessor.Flags&ast.NodeFlagsAmbient == 0 && (accessor.Parent.Kind != ast.KindTypeLiteral) && (accessor.Parent.Kind != ast.KindInterfaceDeclaration) {
		if c.languageVersion < core.ScriptTargetES2015 && ast.IsPrivateIdentifier(accessor.Name()) {
			return c.grammarErrorOnNode(accessor.Name(), diagnostics.Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher)
		}
		if body == nil && !ast.HasSyntacticModifier(accessor, ast.ModifierFlagsAbstract) {
			return c.grammarErrorAtPos(accessor, accessor.End()-1, len(";"), diagnostics.X_0_expected, "{")
		}
	}
	if body != nil {
		if ast.HasSyntacticModifier(accessor, ast.ModifierFlagsAbstract) {
			return c.grammarErrorOnNode(accessor, diagnostics.An_abstract_accessor_cannot_have_an_implementation)
		}
		if accessor.Parent.Kind == ast.KindTypeLiteral || accessor.Parent.Kind == ast.KindInterfaceDeclaration {
			return c.grammarErrorOnNode(body, diagnostics.An_implementation_cannot_be_declared_in_ambient_contexts)
		}
	}

	funcData := accessor.FunctionLikeData()
	var typeParameters *ast.NodeList
	if funcData != nil {
		typeParameters = funcData.TypeParameters
	}

	if typeParameters != nil {
		return c.grammarErrorOnNode(accessor.Name(), diagnostics.An_accessor_cannot_have_type_parameters)
	}
	if !c.doesAccessorHaveCorrectParameterCount(accessor) {
		return c.grammarErrorOnNode(accessor.Name(), core.IfElse(accessor.Kind == ast.KindGetAccessor, diagnostics.A_get_accessor_cannot_have_parameters, diagnostics.A_set_accessor_must_have_exactly_one_parameter))
	}
	if accessor.Kind == ast.KindSetAccessor {
		if funcData.Type != nil {
			return c.grammarErrorOnNode(accessor.Name(), diagnostics.A_set_accessor_cannot_have_a_return_type_annotation)
		}

		parameterNode := getSetAccessorValueParameter(accessor)
		if parameterNode == nil {
			panic("Return value does not match parameter count assertion.")
		}
		parameter := parameterNode.AsParameterDeclaration()
		if parameter.DotDotDotToken != nil {
			return c.grammarErrorOnNode(parameter.DotDotDotToken, diagnostics.A_set_accessor_cannot_have_rest_parameter)
		}
		if parameter.QuestionToken != nil {
			return c.grammarErrorOnNode(parameter.QuestionToken, diagnostics.A_set_accessor_cannot_have_an_optional_parameter)
		}
		if parameter.Initializer != nil {
			return c.grammarErrorOnNode(accessor.Name(), diagnostics.A_set_accessor_parameter_cannot_have_an_initializer)
		}
	}

	return false
}

// Does the accessor have the right number of parameters?
//
//	A `get` accessor has no parameters or a single `this` parameter.
//	A `set` accessor has one parameter or a `this` parameter and one more parameter.
func (c *Checker) doesAccessorHaveCorrectParameterCount(accessor *ast.AccessorDeclaration) bool {
	// `getAccessorThisParameter` returns `nil` if the accessor's arity is incorrect,
	// even if there is a `this` parameter declared.
	return c.getAccessorThisParameter(accessor) != nil || len(accessor.Parameters()) == (core.IfElse(accessor.Kind == ast.KindGetAccessor, 0, 1))
}

func (c *Checker) checkGrammarTypeOperatorNode(node *ast.TypeOperatorNode) bool {
	if node.Operator == ast.KindUniqueKeyword {
		innerType := node.AsTypeOperatorNode().Type
		if innerType.Kind != ast.KindSymbolKeyword {
			return c.grammarErrorOnNode(innerType, diagnostics.X_0_expected, scanner.TokenToString(ast.KindSymbolKeyword))
		}
		parent := ast.WalkUpParenthesizedTypes(node.Parent)
		// !!!
		// if ast.IsInJSFile(parent) && isJSDocTypeExpression(parent) {
		// 	host := getJSDocHost(parent)
		// 	if host != nil {
		// 		parent = getSingleVariableOfVariableStatement(host) || host
		// 	}
		// }
		switch parent.Kind {
		case ast.KindVariableDeclaration:
			decl := parent.AsVariableDeclaration()
			if decl.Name().Kind != ast.KindIdentifier {
				return c.grammarErrorOnNode(node.AsNode(), diagnostics.X_unique_symbol_types_may_not_be_used_on_a_variable_declaration_with_a_binding_name)
			}
			if !isVariableDeclarationInVariableStatement(decl.AsNode()) {
				return c.grammarErrorOnNode(node.AsNode(), diagnostics.X_unique_symbol_types_are_only_allowed_on_variables_in_a_variable_statement)
			}
			if decl.Parent.Flags&ast.NodeFlagsConst == 0 {
				return c.grammarErrorOnNode((parent.AsVariableDeclaration()).Name(), diagnostics.A_variable_whose_type_is_a_unique_symbol_type_must_be_const)
			}
		case ast.KindPropertyDeclaration:
			if !ast.IsStatic(parent) || !hasEffectiveReadonlyModifier(parent) {
				return c.grammarErrorOnNode((parent.AsPropertyDeclaration()).Name(), diagnostics.A_property_of_a_class_whose_type_is_a_unique_symbol_type_must_be_both_static_and_readonly)
			}
		case ast.KindPropertySignature:
			if !ast.HasSyntacticModifier(parent, ast.ModifierFlagsReadonly) {
				return c.grammarErrorOnNode((parent.AsPropertySignatureDeclaration()).Name(), diagnostics.A_property_of_an_interface_or_type_literal_whose_type_is_a_unique_symbol_type_must_be_readonly)
			}
		default:
			return c.grammarErrorOnNode(node.AsNode(), diagnostics.X_unique_symbol_types_are_not_allowed_here)
		}
	} else if node.Operator == ast.KindReadonlyKeyword {
		innerType := node.AsTypeOperatorNode().Type
		if innerType.Kind != ast.KindArrayType && innerType.Kind != ast.KindTupleType {
			return c.grammarErrorOnFirstToken(node.AsNode(), diagnostics.X_readonly_type_modifier_is_only_permitted_on_array_and_tuple_literal_types, scanner.TokenToString(ast.KindSymbolKeyword))
		}
	}

	return false
}

func (c *Checker) checkGrammarForInvalidDynamicName(node *ast.DeclarationName, message *diagnostics.Message) bool {
	if c.isNonBindableDynamicName(node) {
		return c.grammarErrorOnNode(node, message)
	}

	return false
}

// Indicates whether a declaration name is a dynamic name that cannot be late-bound.
func (c *Checker) isNonBindableDynamicName(node *ast.DeclarationName) bool {
	return ast.IsDynamicName(node) && !c.isLateBindableName(node)
}

func (c *Checker) checkGrammarMethod(node *ast.Node /*Union[MethodDeclaration, MethodSignature]*/) bool {
	if c.checkGrammarFunctionLikeDeclaration(node) {
		return true
	}

	if node.Kind == ast.KindMethodDeclaration {
		if node.Parent.Kind == ast.KindObjectLiteralExpression {
			// We only disallow modifier on a method declaration if it is a property of object-literal-expression
			if modifiers := node.Modifiers(); modifiers != nil && !(len(modifiers.Nodes) == 1 && modifiers.Nodes[0].Kind == ast.KindAsyncKeyword) {
				return c.grammarErrorOnFirstToken(node, diagnostics.Modifiers_cannot_appear_here)
			}

			methodDecl := node.AsMethodDeclaration()
			if c.checkGrammarForInvalidQuestionMark(methodDecl.PostfixToken, diagnostics.An_object_member_cannot_be_declared_optional) {
				return true
			}
			if c.checkGrammarForInvalidExclamationToken(methodDecl.PostfixToken, diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context) {
				return true
			}
			if node.Body() == nil {
				return c.grammarErrorAtPos(node, node.End()-1, len(";"), diagnostics.X_0_expected, "{")
			}
		}
		if c.checkGrammarForGenerator(node) {
			return true
		}
	}

	if ast.IsClassLike(node.Parent) {
		if c.languageVersion < core.ScriptTargetES2015 && ast.IsPrivateIdentifier(node.Name()) {
			return c.grammarErrorOnNode(node.Name(), diagnostics.Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher)
		}
		// Technically, computed properties in ambient contexts is disallowed
		// for property declarations and accessors too, not just methods.
		// However, property declarations disallow computed names in general,
		// and accessors are not allowed in ambient contexts in general,
		// so this error only really matters for methods.
		if node.Flags&ast.NodeFlagsAmbient != 0 {
			return c.checkGrammarForInvalidDynamicName(node.Name(), diagnostics.A_computed_property_name_in_an_ambient_context_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type)
		} else if node.Kind == ast.KindMethodDeclaration && node.Body() == nil {
			return c.checkGrammarForInvalidDynamicName(node.Name(), diagnostics.A_computed_property_name_in_a_method_overload_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type)
		}
	} else if node.Parent.Kind == ast.KindInterfaceDeclaration {
		return c.checkGrammarForInvalidDynamicName(node.Name(), diagnostics.A_computed_property_name_in_an_interface_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type)
	} else if node.Parent.Kind == ast.KindTypeLiteral {
		return c.checkGrammarForInvalidDynamicName(node.Name(), diagnostics.A_computed_property_name_in_a_type_literal_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type)
	}

	return false
}

func (c *Checker) checkGrammarBreakOrContinueStatement(node *ast.Node) bool {
	var targetLabel *ast.IdentifierNode
	switch node.Kind {
	case ast.KindBreakStatement:
		targetLabel = node.AsBreakStatement().Label
	case ast.KindContinueStatement:
		targetLabel = node.AsContinueStatement().Label
	default:
		panic(fmt.Sprintf("Unexpected node kind %q", node.Kind))
	}

	var current *ast.Node = node
	for current != nil {
		if ast.IsFunctionLikeOrClassStaticBlockDeclaration(current) {
			return c.grammarErrorOnNode(node, diagnostics.Jump_target_cannot_cross_function_boundary)
		}

		switch current.Kind {
		case ast.KindLabeledStatement:
			if targetLabel != nil && (current.AsLabeledStatement()).Label.Text() == targetLabel.Text() {
				// found matching label - verify that label usage is correct
				// continue can only target labels that are on iteration statements
				isMisplacedContinueLabel := node.Kind == ast.KindContinueStatement && !ast.IsIterationStatement((current.AsLabeledStatement()).Statement, true /*lookInLabeledStatements*/)

				if isMisplacedContinueLabel {
					return c.grammarErrorOnNode(node, diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement)
				}

				return false
			}
		case ast.KindSwitchStatement:
			if node.Kind == ast.KindBreakStatement && targetLabel == nil {
				// unlabeled break within switch statement - ok
				return false
			}
		default:
			if ast.IsIterationStatement(current, false /*lookInLabeledStatements*/) && targetLabel == nil {
				// unlabeled break or continue within iteration statement - ok
				return false
			}
		}

		current = current.Parent
	}

	if targetLabel != nil {
		var message *diagnostics.Message
		if node.Kind == ast.KindBreakStatement {
			message = diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement
		} else {
			message = diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement
		}

		return c.grammarErrorOnNode(node, message)
	} else {
		var message *diagnostics.Message
		if node.Kind == ast.KindBreakStatement {
			message = diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement
		} else {
			message = diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement
		}
		return c.grammarErrorOnNode(node, message)
	}
}

func (c *Checker) checkGrammarBindingElement(node *ast.BindingElement) bool {
	if node.DotDotDotToken != nil {
		elements := node.Parent.AsBindingPattern().Elements
		if node.AsNode() != core.LastOrNil(elements.Nodes) {
			return c.grammarErrorOnNode(&node.Node, diagnostics.A_rest_element_must_be_last_in_a_destructuring_pattern)
		}
		c.checkGrammarForDisallowedTrailingComma(elements, diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma)

		if node.PropertyName != nil {
			return c.grammarErrorOnNode(node.Name(), diagnostics.A_rest_element_cannot_have_a_property_name)
		}
	}

	if node.DotDotDotToken != nil && node.Initializer != nil {
		// Error on equals token which immediately precedes the initializer
		return c.grammarErrorAtPos(node.AsNode(), node.Initializer.Pos()-1, 1, diagnostics.A_rest_element_cannot_have_an_initializer)
	}

	return false
}

func (c *Checker) checkGrammarVariableDeclaration(node *ast.VariableDeclaration) bool {
	nodeFlags := c.getCombinedNodeFlagsCached(node.AsNode())
	blockScopeKind := nodeFlags & ast.NodeFlagsBlockScoped
	if ast.IsBindingPattern(node.Name()) {
		switch blockScopeKind {
		case ast.NodeFlagsAwaitUsing:
			return c.grammarErrorOnNode(node.AsNode(), diagnostics.X_0_declarations_may_not_have_binding_patterns, "await using")
		case ast.NodeFlagsUsing:
			return c.grammarErrorOnNode(node.AsNode(), diagnostics.X_0_declarations_may_not_have_binding_patterns, "using")
		}
	}

	if node.Parent.Parent.Kind != ast.KindForInStatement && node.Parent.Parent.Kind != ast.KindForOfStatement {
		if nodeFlags&ast.NodeFlagsAmbient != 0 {
			c.checkAmbientInitializer(node.AsNode())
		} else if node.Initializer == nil {
			if ast.IsBindingPattern(node.Name()) && !ast.IsBindingPattern(node.Parent) {
				return c.grammarErrorOnNode(node.AsNode(), diagnostics.A_destructuring_declaration_must_have_an_initializer)
			}
			switch blockScopeKind {
			case ast.NodeFlagsAwaitUsing:
				return c.grammarErrorOnNode(node.AsNode(), diagnostics.X_0_declarations_must_be_initialized, "await using")
			case ast.NodeFlagsUsing:
				return c.grammarErrorOnNode(node.AsNode(), diagnostics.X_0_declarations_must_be_initialized, "using")
			case ast.NodeFlagsConst:
				return c.grammarErrorOnNode(node.AsNode(), diagnostics.X_0_declarations_must_be_initialized, "const")
			}
		}
	}

	if node.ExclamationToken != nil && (node.Parent.Parent.Kind != ast.KindVariableStatement || node.Type == nil || node.Initializer != nil || nodeFlags&ast.NodeFlagsAmbient != 0) {
		var message *diagnostics.Message
		switch {
		case node.Initializer != nil:
			message = diagnostics.Declarations_with_initializers_cannot_also_have_definite_assignment_assertions
		case node.Type == nil:
			message = diagnostics.Declarations_with_definite_assignment_assertions_must_also_have_type_annotations
		default:
			message = diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context
		}
		return c.grammarErrorOnNode(node.ExclamationToken, message)
	}

	if c.program.GetEmitModuleFormatOfFile(ast.GetSourceFileOfNode(node.AsNode())) < core.ModuleKindSystem && (node.Parent.Parent.Flags&ast.NodeFlagsAmbient == 0) && ast.HasSyntacticModifier(node.Parent.Parent, ast.ModifierFlagsExport) {
		c.checkGrammarForEsModuleMarkerInBindingName(node.Name())
	}

	// 1. LexicalDeclaration : LetOrConst BindingList ;
	// It is a Syntax Error if the BoundNames of BindingList contains "let".
	// 2. ForDeclaration: ForDeclaration : LetOrConst ForBinding
	// It is a Syntax Error if the BoundNames of ForDeclaration contains "let".

	// It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code
	// and its Identifier is eval or arguments
	return blockScopeKind != 0 && c.checkGrammarNameInLetOrConstDeclarations(node.Name())
}

func (c *Checker) checkGrammarForEsModuleMarkerInBindingName(name *ast.Node) bool {
	if ast.IsIdentifier(name) {
		if name.Text() == "__esModule" {
			return c.grammarErrorOnNode(name, diagnostics.Identifier_expected_esModule_is_reserved_as_an_exported_marker_when_transforming_ECMAScript_modules)
		}
	} else {
		for _, element := range name.AsBindingPattern().Elements.Nodes {
			if element.Name() != nil {
				return c.checkGrammarForEsModuleMarkerInBindingName(element.Name())
			}
		}
	}
	return false
}

func (c *Checker) checkGrammarNameInLetOrConstDeclarations(name *ast.Node /*Union[Identifier, BindingPattern]*/) bool {
	if name.Kind == ast.KindIdentifier {
		if name.AsIdentifier().Text == "let" {
			return c.grammarErrorOnNode(name, diagnostics.X_let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations)
		}
	} else {
		elements := name.AsBindingPattern().Elements.Nodes
		for _, element := range elements {
			bindingElement := element.AsBindingElement()
			if bindingElement.Name() != nil {
				c.checkGrammarNameInLetOrConstDeclarations(bindingElement.Name())
			}
		}
	}
	return false
}

func (c *Checker) checkGrammarVariableDeclarationList(declarationList *ast.VariableDeclarationList) bool {
	declarations := declarationList.Declarations
	if c.checkGrammarForDisallowedTrailingComma(declarations, diagnostics.Trailing_comma_not_allowed) {
		return true
	}

	if len(declarations.Nodes) == 0 {
		return c.grammarErrorAtPos(declarationList.AsNode(), declarations.Pos(), declarations.End()-declarations.Pos(), diagnostics.Variable_declaration_list_cannot_be_empty)
	}

	blockScopeFlags := declarationList.Flags & ast.NodeFlagsBlockScoped
	if (blockScopeFlags == ast.NodeFlagsUsing || blockScopeFlags == ast.NodeFlagsAwaitUsing) && ast.IsForInStatement(declarationList.Parent) {
		return c.grammarErrorOnNode(declarationList.AsNode(), core.IfElse(blockScopeFlags == ast.NodeFlagsUsing, diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_using_declaration, diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_an_await_using_declaration))
	}

	if blockScopeFlags == ast.NodeFlagsAwaitUsing {
		return c.checkGrammarAwaitOrAwaitUsing(declarationList.AsNode())
	}

	return false
}

func (c *Checker) checkGrammarAwaitOrAwaitUsing(node *ast.Node) bool {
	// Grammar checking
	hasError := false
	container := getContainingFunctionOrClassStaticBlock(node)
	if container != nil && ast.IsClassStaticBlockDeclaration(container) {
		// NOTE: We report this regardless as to whether there are parse diagnostics.
		var message *diagnostics.Message
		if ast.IsAwaitExpression(node) {
			message = diagnostics.X_await_expression_cannot_be_used_inside_a_class_static_block
		} else {
			message = diagnostics.X_await_using_statements_cannot_be_used_inside_a_class_static_block
		}
		c.error(node, message)
		hasError = true
	} else if node.Flags&ast.NodeFlagsAwaitContext == 0 {
		if ast.IsInTopLevelContext(node) {
			sourceFile := ast.GetSourceFileOfNode(node)
			if !c.hasParseDiagnostics(sourceFile) {
				var span core.TextRange
				var spanCalculated bool
				if !ast.IsEffectiveExternalModule(sourceFile, c.compilerOptions) {
					span = scanner.GetRangeOfTokenAtPosition(sourceFile, node.Pos())
					spanCalculated = true
					var message *diagnostics.Message
					if ast.IsAwaitExpression(node) {
						message = diagnostics.X_await_expressions_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module
					} else {
						message = diagnostics.X_await_using_statements_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module
					}
					diagnostic := ast.NewDiagnostic(sourceFile, span, message)
					c.diagnostics.Add(diagnostic)
					hasError = true
				}
				switch c.moduleKind {
				case core.ModuleKindNode16,
					core.ModuleKindNodeNext:
					sourceFileMetaData := c.program.GetSourceFileMetaData(sourceFile.Path())
					if sourceFileMetaData != nil && sourceFileMetaData.ImpliedNodeFormat == core.ModuleKindCommonJS {
						if !spanCalculated {
							span = scanner.GetRangeOfTokenAtPosition(sourceFile, node.Pos())
						}
						c.diagnostics.Add(ast.NewDiagnostic(sourceFile, span, diagnostics.The_current_file_is_a_CommonJS_module_and_cannot_use_await_at_the_top_level))
						hasError = true
						break
					}
					fallthrough
				case core.ModuleKindES2022,
					core.ModuleKindESNext,
					core.ModuleKindPreserve,
					core.ModuleKindSystem:
					if c.languageVersion >= core.ScriptTargetES2017 {
						break
					}
					fallthrough
				default:
					if !spanCalculated {
						span = scanner.GetRangeOfTokenAtPosition(sourceFile, node.Pos())
					}
					var message *diagnostics.Message
					if ast.IsAwaitExpression(node) {
						message = diagnostics.Top_level_await_expressions_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_nodenext_or_preserve_and_the_target_option_is_set_to_es2017_or_higher
					} else {
						message = diagnostics.Top_level_await_using_statements_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_nodenext_or_preserve_and_the_target_option_is_set_to_es2017_or_higher
					}
					c.diagnostics.Add(ast.NewDiagnostic(sourceFile, span, message))
					hasError = true
				}
			}
		} else {
			// use of 'await' in non-async function
			sourceFile := ast.GetSourceFileOfNode(node)
			if !c.hasParseDiagnostics(sourceFile) {
				span := scanner.GetRangeOfTokenAtPosition(sourceFile, node.Pos())
				var message *diagnostics.Message
				if ast.IsAwaitExpression(node) {
					message = diagnostics.X_await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules
				} else {
					message = diagnostics.X_await_using_statements_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules
				}
				diagnostic := ast.NewDiagnostic(sourceFile, span, message)
				if container != nil && container.Kind != ast.KindConstructor && !hasAsyncModifier(container) {
					relatedInfo := NewDiagnosticForNode(container, diagnostics.Did_you_mean_to_mark_this_function_as_async)
					diagnostic.AddRelatedInfo(relatedInfo)
				}
				c.diagnostics.Add(diagnostic)
				hasError = true
			}
		}
	}

	if ast.IsAwaitExpression(node) && c.isInParameterInitializerBeforeContainingFunction(node) {
		// NOTE: We report this regardless as to whether there are parse diagnostics.
		c.error(node, diagnostics.X_await_expressions_cannot_be_used_in_a_parameter_initializer)
		hasError = true
	}

	return hasError
}

func (c *Checker) checkGrammarYieldExpression(node *ast.Node) bool {
	hasError := false
	if node.Flags&ast.NodeFlagsYieldContext == 0 {
		c.grammarErrorOnFirstToken(node, diagnostics.A_yield_expression_is_only_allowed_in_a_generator_body)
		hasError = true
	}
	if c.isInParameterInitializerBeforeContainingFunction(node) {
		c.error(node, diagnostics.X_yield_expressions_cannot_be_used_in_a_parameter_initializer)
		hasError = true
	}
	return hasError
}

func (c *Checker) checkGrammarForDisallowedBlockScopedVariableStatement(node *ast.VariableStatement) bool {
	if !c.containerAllowsBlockScopedVariable(node.Parent) {
		blockScopeKind := c.getCombinedNodeFlagsCached(node.DeclarationList) & ast.NodeFlagsBlockScoped
		if blockScopeKind != 0 {
			var keyword string
			switch {
			case blockScopeKind == ast.NodeFlagsLet:
				keyword = "let"
			case blockScopeKind == ast.NodeFlagsConst:
				keyword = "const"
			case blockScopeKind == ast.NodeFlagsUsing:
				keyword = "using"
			case blockScopeKind == ast.NodeFlagsAwaitUsing:
				keyword = "await using"
			default:
				panic("Unknown BlockScope flag")
			}
			return c.grammarErrorOnNode(node.AsNode(), diagnostics.X_0_declarations_can_only_be_declared_inside_a_block, keyword)
		}
	}

	return false
}

func (c *Checker) containerAllowsBlockScopedVariable(parent *ast.Node) bool {
	switch parent.Kind {
	case ast.KindIfStatement,
		ast.KindDoStatement,
		ast.KindWhileStatement,
		ast.KindWithStatement,
		ast.KindForStatement,
		ast.KindForInStatement,
		ast.KindForOfStatement:
		return false
	case ast.KindLabeledStatement:
		return c.containerAllowsBlockScopedVariable(parent.Parent)
	}

	return true
}

func (c *Checker) checkGrammarMetaProperty(node *ast.MetaProperty) bool {
	nodeName := node.Name()
	nameText := nodeName.Text()

	switch node.KeywordToken {
	case ast.KindNewKeyword:
		if nameText != "target" {
			return c.grammarErrorOnNode(nodeName, diagnostics.X_0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2, nameText, scanner.TokenToString(node.KeywordToken), "target")
		}
	case ast.KindImportKeyword:
		if nameText != "meta" {
			return c.grammarErrorOnNode(nodeName, diagnostics.X_0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2, nameText, scanner.TokenToString(node.KeywordToken), "meta")
		}
	}

	return false
}

func (c *Checker) checkGrammarConstructorTypeParameters(node *ast.ConstructorDeclaration) bool {
	// !!!
	// var jsdocTypeParameters []*ast.TypeParameterDeclaration
	// if ast.IsInJSFile(node.AsNode()) {
	// 	jsdocTypeParameters = getJSDocTypeParameterDeclarations(node)
	// } else {
	// 	jsdocTypeParameters = nil
	// }
	// if range_ == nil {
	// 	range_ = core.FirstOrNil(jsdocTypeParameters)
	// }
	range_ := node.TypeParameters
	if range_ != nil {
		var pos int
		if range_.Pos() == range_.End() {
			pos = range_.Pos()
		} else {
			pos = scanner.SkipTrivia(ast.GetSourceFileOfNode(node.AsNode()).Text, range_.Pos())
		}
		return c.grammarErrorAtPos(node.AsNode(), pos, range_.End()-pos, diagnostics.Type_parameters_cannot_appear_on_a_constructor_declaration)
	}

	return false
}

func (c *Checker) checkGrammarConstructorTypeAnnotation(node *ast.ConstructorDeclaration) bool {
	t := node.Type
	if t != nil {
		return c.grammarErrorOnNode(t, diagnostics.Type_annotation_cannot_appear_on_a_constructor_declaration)
	}
	return false
}

func (c *Checker) checkGrammarProperty(node *ast.Node /*Union[PropertyDeclaration, PropertySignature]*/) bool {
	propertyName := node.Name()
	if ast.IsComputedPropertyName(propertyName) && ast.IsBinaryExpression(propertyName.Expression()) && propertyName.Expression().AsBinaryExpression().OperatorToken.Kind == ast.KindInKeyword {
		return c.grammarErrorOnNode(node.Parent.Members()[0], diagnostics.A_mapped_type_may_not_declare_properties_or_methods)
	}
	if ast.IsClassLike(node.Parent) {
		if ast.IsStringLiteral(propertyName) && propertyName.Text() == "constructor" {
			return c.grammarErrorOnNode(propertyName, diagnostics.Classes_may_not_have_a_field_named_constructor)
		}
		if c.checkGrammarForInvalidDynamicName(propertyName, diagnostics.A_computed_property_name_in_a_class_property_declaration_must_have_a_simple_literal_type_or_a_unique_symbol_type) {
			return true
		}
		if c.languageVersion < core.ScriptTargetES2015 && ast.IsPrivateIdentifier(propertyName) {
			return c.grammarErrorOnNode(propertyName, diagnostics.Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher)
		}
		if c.languageVersion < core.ScriptTargetES2015 && ast.IsAutoAccessorPropertyDeclaration(node) {
			return c.grammarErrorOnNode(propertyName, diagnostics.Properties_with_the_accessor_modifier_are_only_available_when_targeting_ECMAScript_2015_and_higher)
		}
		if ast.IsAutoAccessorPropertyDeclaration(node) && c.checkGrammarForInvalidQuestionMark(node.AsPropertyDeclaration().PostfixToken, diagnostics.An_accessor_property_cannot_be_declared_optional) {
			return true
		}
	} else if ast.IsInterfaceDeclaration(node.Parent) {
		if c.checkGrammarForInvalidDynamicName(propertyName, diagnostics.A_computed_property_name_in_an_interface_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type) {
			return true
		}
		if !ast.IsPropertySignatureDeclaration(node) {
			// Interfaces cannot contain property declarations
			panic(fmt.Sprintf("Unexpected node kind %q", node.Kind))
		}
		if initializer := node.AsPropertySignatureDeclaration().Initializer; initializer != nil {
			return c.grammarErrorOnNode(initializer, diagnostics.An_interface_property_cannot_have_an_initializer)
		}
	} else if ast.IsTypeLiteralNode(node.Parent) {
		if c.checkGrammarForInvalidDynamicName(node.Name(), diagnostics.A_computed_property_name_in_a_type_literal_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type) {
			return true
		}
		if !ast.IsPropertySignatureDeclaration(node) {
			// Type literals cannot contain property declarations
			panic(fmt.Sprintf("Unexpected node kind %q", node.Kind))
		}
		if initializer := node.AsPropertySignatureDeclaration().Initializer; initializer != nil {
			return c.grammarErrorOnNode(initializer, diagnostics.A_type_literal_property_cannot_have_an_initializer)
		}
	}

	if node.Flags&ast.NodeFlagsAmbient != 0 {
		c.checkAmbientInitializer(node)
	}

	if ast.IsPropertyDeclaration(node) {
		propDecl := node.AsPropertyDeclaration()
		postfixToken := propDecl.PostfixToken
		if postfixToken != nil && postfixToken.Kind == ast.KindExclamationToken {
			switch {
			case propDecl.Initializer != nil:
				return c.grammarErrorOnNode(postfixToken, diagnostics.Declarations_with_initializers_cannot_also_have_definite_assignment_assertions)
			case propDecl.Type == nil:
				return c.grammarErrorOnNode(postfixToken, diagnostics.Declarations_with_definite_assignment_assertions_must_also_have_type_annotations)
			case !ast.IsClassLike(node.Parent) || node.Flags&ast.NodeFlagsAmbient != 0 || ast.IsStatic(node) || hasAbstractModifier(node):
				return c.grammarErrorOnNode(postfixToken, diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context)
			}
		}
	}

	return false
}

func (c *Checker) checkAmbientInitializer(node *ast.Node) bool {
	var initializer *ast.Expression
	var typeNode *ast.TypeNode
	switch node.Kind {
	case ast.KindVariableDeclaration:
		varDecl := node.AsVariableDeclaration()
		initializer = varDecl.Initializer
		typeNode = varDecl.Type
	case ast.KindPropertyDeclaration:
		propDecl := node.AsPropertyDeclaration()
		initializer = propDecl.Initializer
		typeNode = propDecl.Type
	case ast.KindPropertySignature:
		propSig := node.AsPropertySignatureDeclaration()
		initializer = propSig.Initializer
		typeNode = propSig.Type
	default:
		panic(fmt.Sprintf("Unexpected node kind %q", node.Kind))
	}

	if initializer != nil {
		isInvalidInitializer := !(isInitializerStringOrNumberLiteralExpression(initializer) || c.isInitializerSimpleLiteralEnumReference(initializer) || initializer.Kind == ast.KindTrueKeyword || initializer.Kind == ast.KindFalseKeyword || isInitializerBigIntLiteralExpression(initializer))
		isConstOrReadonly := isDeclarationReadonly(node) || ast.IsVariableDeclaration(node) && (c.isVarConstLike(node))
		if isConstOrReadonly && (typeNode == nil) {
			if isInvalidInitializer {
				return c.grammarErrorOnNode(initializer, diagnostics.A_const_initializer_in_an_ambient_context_must_be_a_string_or_numeric_literal_or_literal_enum_reference)
			}
		} else {
			return c.grammarErrorOnNode(initializer, diagnostics.Initializers_are_not_allowed_in_ambient_contexts)
		}
	}

	return false
}

func isInitializerStringOrNumberLiteralExpression(expr *ast.Expression) bool {
	return ast.IsStringOrNumericLiteralLike(expr) ||
		expr.Kind == ast.KindPrefixUnaryExpression && (expr.AsPrefixUnaryExpression()).Operator == ast.KindMinusToken && (expr.AsPrefixUnaryExpression()).Operand.Kind == ast.KindNumericLiteral
}

func isInitializerBigIntLiteralExpression(expr *ast.Expression) bool {
	if expr.Kind == ast.KindBigIntLiteral {
		return true
	}

	if expr.Kind == ast.KindPrefixUnaryExpression {
		unaryExpr := expr.AsPrefixUnaryExpression()
		return unaryExpr.Operator == ast.KindMinusToken && unaryExpr.Operand.Kind == ast.KindBigIntLiteral
	}

	return false
}

func (c *Checker) isInitializerSimpleLiteralEnumReference(expr *ast.Expression) bool {
	if ast.IsPropertyAccessExpression(expr) {
		return c.checkExpressionCached(expr).flags&TypeFlagsEnumLike != 0
	}

	if ast.IsElementAccessExpression(expr) {
		elementAccess := expr.AsElementAccessExpression()

		return isInitializerStringOrNumberLiteralExpression(elementAccess.ArgumentExpression) &&
			ast.IsEntityNameExpression(elementAccess.Expression) &&
			c.checkExpressionCached(expr).flags&TypeFlagsEnumLike != 0
	}

	return false
}

func (c *Checker) checkGrammarTopLevelElementForRequiredDeclareModifier(node *ast.Node) bool {
	// A declare modifier is required for any top level .d.ts declaration except export=, export default, export as namespace
	// interfaces and imports categories:
	//
	//  DeclarationElement:
	//     ExportAssignment
	//     export_opt   InterfaceDeclaration
	//     export_opt   TypeAliasDeclaration
	//     export_opt   ImportDeclaration
	//     export_opt   ExternalImportDeclaration
	//     export_opt   AmbientDeclaration
	//
	// TODO: The spec needs to be amended to reflect this grammar.
	if node.Kind == ast.KindInterfaceDeclaration || node.Kind == ast.KindTypeAliasDeclaration || node.Kind == ast.KindImportDeclaration || node.Kind == ast.KindImportEqualsDeclaration || node.Kind == ast.KindExportDeclaration || node.Kind == ast.KindExportAssignment || node.Kind == ast.KindNamespaceExportDeclaration || ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient|ast.ModifierFlagsExport|ast.ModifierFlagsDefault) {
		return false
	}

	return c.grammarErrorOnFirstToken(node, diagnostics.Top_level_declarations_in_d_ts_files_must_start_with_either_a_declare_or_export_modifier)
}

func (c *Checker) checkGrammarTopLevelElementsForRequiredDeclareModifier(file *ast.SourceFile) bool {
	for _, decl := range file.Statements.Nodes {
		if ast.IsDeclarationNode(decl) || decl.Kind == ast.KindVariableStatement {
			if c.checkGrammarTopLevelElementForRequiredDeclareModifier(decl) {
				return true
			}
		}
	}
	return false
}

func (c *Checker) checkGrammarSourceFile(node *ast.SourceFile) bool {
	return node.Flags&ast.NodeFlagsAmbient != 0 && c.checkGrammarTopLevelElementsForRequiredDeclareModifier(node)
}

func (c *Checker) checkGrammarStatementInAmbientContext(node *ast.Node) bool {
	if node.Flags&ast.NodeFlagsAmbient != 0 {
		// Find containing block which is either Block, ModuleBlock, SourceFile
		links := c.nodeLinks.Get(node)
		if !links.hasReportedStatementInAmbientContext && (ast.IsFunctionLike(node.Parent) || ast.IsAccessor(node.Parent)) {
			links.hasReportedStatementInAmbientContext = c.grammarErrorOnFirstToken(node, diagnostics.An_implementation_cannot_be_declared_in_ambient_contexts)
			return links.hasReportedStatementInAmbientContext
		}

		// We are either parented by another statement, or some sort of block.
		// If we're in a block, we only want to really report an error once
		// to prevent noisiness.  So use a bit on the block to indicate if
		// this has already been reported, and don't report if it has.
		//
		if node.Parent.Kind == ast.KindBlock || node.Parent.Kind == ast.KindModuleBlock || node.Parent.Kind == ast.KindSourceFile {
			links := c.nodeLinks.Get(node.Parent)
			// Check if the containing block ever report this error
			if !links.hasReportedStatementInAmbientContext {
				links.hasReportedStatementInAmbientContext = c.grammarErrorOnFirstToken(node, diagnostics.Statements_are_not_allowed_in_ambient_contexts)
				return links.hasReportedStatementInAmbientContext
			}
		} else {
			// We must be parented by a statement.  If so, there's no need
			// to report the error as our parent will have already done it.
			// Debug.assert(isStatement(node.parent));
		}
	}
	return false
}

func (c *Checker) checkGrammarNumericLiteral(node *ast.NumericLiteral) {
	nodeText := scanner.GetTextOfNode(node.AsNode())

	// Realism (size) checking
	// We should test against `getTextOfNode(node)` rather than `node.text`, because `node.text` for large numeric literals can contain "."
	// e.g. `node.text` for numeric literal `1100000000000000000000` is `1.1e21`.
	isFractional := strings.ContainsRune(nodeText, '.')
	// !!!
	// isScientific := node.NumericLiteralFlags & ast.TokenFlagsScientific
	isScientific := strings.ContainsRune(nodeText, 'e')

	// Scientific notation (e.g. 2e54 and 1e00000000010) can't be converted to bigint
	// Fractional numbers (e.g. 9000000000000000.001) are inherently imprecise anyway
	if isFractional || isScientific {
		return
	}

	// Here `node` is guaranteed to be a numeric literal representing an integer.
	// We need to judge whether the integer `node` represents is <= 2 ** 53 - 1, which can be accomplished by comparing to `value` defined below because:
	// 1) when `node` represents an integer <= 2 ** 53 - 1, `node.text` is its exact string representation and thus `value` precisely represents the integer.
	// 2) otherwise, although `node.text` may be imprecise string representation, its mathematical value and consequently `value` cannot be less than 2 ** 53,
	//    thus the result of the predicate won't be affected.
	value := jsnum.FromString(node.Text)
	if value <= jsnum.MaxSafeInteger {
		return
	}

	c.addErrorOrSuggestion(false, createDiagnosticForNode(node.AsNode(), diagnostics.Numeric_literals_with_absolute_values_equal_to_2_53_or_greater_are_too_large_to_be_represented_accurately_as_integers))
}

func (c *Checker) checkGrammarBigIntLiteral(node *ast.BigIntLiteral) bool {
	literalType := ast.IsLiteralTypeNode(node.Parent) || ast.IsPrefixUnaryExpression(node.Parent) && ast.IsLiteralTypeNode(node.Parent.Parent)
	if !literalType {
		if c.languageVersion < core.ScriptTargetES2020 {
			if c.grammarErrorOnNode(node.AsNode(), diagnostics.BigInt_literals_are_not_available_when_targeting_lower_than_ES2020) {
				return true
			}
		}
	}
	return false
}

func (c *Checker) checkGrammarImportClause(node *ast.ImportClause) bool {
	if node.IsTypeOnly && node.Name() != nil && node.NamedBindings != nil {
		return c.grammarErrorOnNode(&node.Node, diagnostics.A_type_only_import_can_specify_a_default_import_or_named_bindings_but_not_both)
	}
	if node.IsTypeOnly && node.NamedBindings != nil && node.NamedBindings.Kind == ast.KindNamedImports {
		return c.checkGrammarTypeOnlyNamedImportsOrExports(node.NamedBindings)
	}
	return false
}

func (c *Checker) checkGrammarTypeOnlyNamedImportsOrExports(namedBindings *ast.Node) bool {
	var nodeList *ast.NodeList
	if namedBindings.Kind == ast.KindNamedImports {
		nodeList = namedBindings.AsNamedImports().Elements
	} else {
		nodeList = namedBindings.AsNamedExports().Elements
	}

	for _, specifier := range nodeList.Nodes {
		var specifierIsTypeOnly bool
		var message *diagnostics.Message
		if specifier.Kind == ast.KindImportSpecifier {
			specifierIsTypeOnly = specifier.AsImportSpecifier().IsTypeOnly
			message = diagnostics.The_type_modifier_cannot_be_used_on_a_named_import_when_import_type_is_used_on_its_import_statement
		} else {
			specifierIsTypeOnly = specifier.AsExportSpecifier().IsTypeOnly
			message = diagnostics.The_type_modifier_cannot_be_used_on_a_named_export_when_export_type_is_used_on_its_export_statement
		}

		if specifierIsTypeOnly {
			return c.grammarErrorOnFirstToken(specifier, message)
		}
	}

	return false
}

func (c *Checker) checkGrammarImportCallExpression(node *ast.Node) bool {
	if c.compilerOptions.VerbatimModuleSyntax == core.TSTrue && c.moduleKind == core.ModuleKindCommonJS {
		return c.grammarErrorOnNode(node, diagnostics.ESM_syntax_is_not_allowed_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled)
	}

	if c.moduleKind == core.ModuleKindES2015 {
		return c.grammarErrorOnNode(node, diagnostics.Dynamic_imports_are_only_supported_when_the_module_flag_is_set_to_es2020_es2022_esnext_commonjs_amd_system_umd_node16_or_nodenext)
	}

	nodeAsCall := node.AsCallExpression()
	if nodeAsCall.TypeArguments != nil {
		return c.grammarErrorOnNode(node, diagnostics.This_use_of_import_is_invalid_import_calls_can_be_written_but_they_must_have_parentheses_and_cannot_have_type_arguments)
	}

	nodeArguments := nodeAsCall.Arguments
	argumentNodes := nodeArguments.Nodes
	if c.moduleKind != core.ModuleKindESNext && c.moduleKind != core.ModuleKindNodeNext && c.moduleKind != core.ModuleKindNode16 && c.moduleKind != core.ModuleKindPreserve {
		// We are allowed trailing comma after proposal-import-assertions.
		c.checkGrammarForDisallowedTrailingComma(nodeArguments, diagnostics.Trailing_comma_not_allowed)

		if len(argumentNodes) > 1 {
			importAttributesArgument := argumentNodes[1]
			return c.grammarErrorOnNode(importAttributesArgument, diagnostics.Dynamic_imports_only_support_a_second_argument_when_the_module_option_is_set_to_esnext_node16_nodenext_or_preserve)
		}
	}

	if len(argumentNodes) == 0 || len(argumentNodes) > 2 {
		return c.grammarErrorOnNode(node, diagnostics.Dynamic_imports_can_only_accept_a_module_specifier_and_an_optional_set_of_attributes_as_arguments)
	}

	// see: parseArgumentOrArrayLiteralElement...we use this function which parse arguments of callExpression to parse specifier for dynamic import.
	// parseArgumentOrArrayLiteralElement allows spread element to be in an argument list which is not allowed as specifier in dynamic import.
	spreadElement := core.Find(argumentNodes, ast.IsSpreadElement)
	if spreadElement != nil {
		return c.grammarErrorOnNode(spreadElement, diagnostics.Argument_of_dynamic_import_cannot_be_spread_element)
	}
	return false
}
