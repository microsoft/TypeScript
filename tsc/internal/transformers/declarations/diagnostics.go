package declarations

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type GetSymbolAccessibilityDiagnostic = func(symbolAccessibilityResult printer.SymbolAccessibilityResult) *SymbolAccessibilityDiagnostic

type SymbolAccessibilityDiagnostic struct {
	errorNode         *ast.Node
	diagnosticMessage *diagnostics.Message
	typeName          *ast.Node
}

func wrapSimpleDiagnosticSelector(node *ast.Node, selector func(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message) GetSymbolAccessibilityDiagnostic {
	return func(symbolAccessibilityResult printer.SymbolAccessibilityResult) *SymbolAccessibilityDiagnostic {
		diagnosticMessage := selector(node, symbolAccessibilityResult)
		if diagnosticMessage == nil {
			return nil
		}
		return &SymbolAccessibilityDiagnostic{
			errorNode:         node,
			diagnosticMessage: diagnosticMessage,
			typeName:          ast.GetNameOfDeclaration(node),
		}
	}
}

func wrapNamedDiagnosticSelector(node *ast.Node, selector func(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message) GetSymbolAccessibilityDiagnostic {
	return func(symbolAccessibilityResult printer.SymbolAccessibilityResult) *SymbolAccessibilityDiagnostic {
		diagnosticMessage := selector(node, symbolAccessibilityResult)
		if diagnosticMessage == nil {
			return nil
		}
		name := ast.GetNameOfDeclaration(node)
		return &SymbolAccessibilityDiagnostic{
			errorNode:         name,
			diagnosticMessage: diagnosticMessage,
			typeName:          name,
		}
	}
}

func wrapFallbackErrorDiagnosticSelector(node *ast.Node, selector func(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message) GetSymbolAccessibilityDiagnostic {
	return func(symbolAccessibilityResult printer.SymbolAccessibilityResult) *SymbolAccessibilityDiagnostic {
		diagnosticMessage := selector(node, symbolAccessibilityResult)
		if diagnosticMessage == nil {
			return nil
		}
		errorNode := ast.GetNameOfDeclaration(node)
		if errorNode == nil {
			errorNode = node
		}
		return &SymbolAccessibilityDiagnostic{
			errorNode:         errorNode,
			diagnosticMessage: diagnosticMessage,
		}
	}
}

func selectDiagnosticBasedOnModuleName(symbolAccessibilityResult printer.SymbolAccessibilityResult, moduleNotNameable *diagnostics.Message, privateModule *diagnostics.Message, nonModule *diagnostics.Message) *diagnostics.Message {
	if len(symbolAccessibilityResult.ErrorModuleName) > 0 {
		if symbolAccessibilityResult.Accessibility == printer.SymbolAccessibilityCannotBeNamed {
			return moduleNotNameable
		}
		return privateModule
	}
	return nonModule
}

func selectDiagnosticBasedOnModuleNameNoNameCheck(symbolAccessibilityResult printer.SymbolAccessibilityResult, privateModule *diagnostics.Message, nonModule *diagnostics.Message) *diagnostics.Message {
	if len(symbolAccessibilityResult.ErrorModuleName) > 0 {
		return privateModule
	}
	return nonModule
}

func createGetSymbolAccessibilityDiagnosticForNodeName(node *ast.Node) GetSymbolAccessibilityDiagnostic {
	if ast.IsSetAccessorDeclaration(node) || ast.IsGetAccessorDeclaration(node) {
		return wrapSimpleDiagnosticSelector(node, getAccessorNameVisibilityDiagnosticMessage)
	} else if ast.IsMethodDeclaration(node) || ast.IsMethodSignatureDeclaration(node) {
		return wrapSimpleDiagnosticSelector(node, getMethodNameVisibilityDiagnosticMessage)
	} else {
		return createGetSymbolAccessibilityDiagnosticForNode(node)
	}
}

func getAccessorNameVisibilityDiagnosticMessage(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message {
	if ast.IsStatic(node) {
		return selectDiagnosticBasedOnModuleName(
			symbolAccessibilityResult,
			diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
			diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1,
		)
	} else if node.Parent.Kind == ast.KindClassDeclaration {
		return selectDiagnosticBasedOnModuleName(
			symbolAccessibilityResult,
			diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
			diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1,
		)
	} else {
		return selectDiagnosticBasedOnModuleNameNoNameCheck(
			symbolAccessibilityResult,
			diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1,
		)
	}
}

func getMethodNameVisibilityDiagnosticMessage(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message {
	if ast.IsStatic(node) {
		return selectDiagnosticBasedOnModuleName(
			symbolAccessibilityResult,
			diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
			diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_private_name_1,
		)
	} else if node.Parent.Kind == ast.KindClassDeclaration {
		return selectDiagnosticBasedOnModuleName(
			symbolAccessibilityResult,
			diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
			diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Public_method_0_of_exported_class_has_or_is_using_private_name_1,
		)
	} else {
		return selectDiagnosticBasedOnModuleNameNoNameCheck(
			symbolAccessibilityResult,
			diagnostics.Method_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Method_0_of_exported_interface_has_or_is_using_private_name_1,
		)
	}
}

func createGetSymbolAccessibilityDiagnosticForNode(node *ast.Node) GetSymbolAccessibilityDiagnostic {
	if ast.IsVariableDeclaration(node) || ast.IsPropertyDeclaration(node) || ast.IsPropertySignatureDeclaration(node) || ast.IsPropertyAccessExpression(node) || ast.IsElementAccessExpression(node) || ast.IsBinaryExpression(node) || ast.IsBindingElement(node) || ast.IsConstructorDeclaration(node) {
		return wrapSimpleDiagnosticSelector(node, getVariableDeclarationTypeVisibilityDiagnosticMessage)
	} else if ast.IsSetAccessorDeclaration(node) || ast.IsGetAccessorDeclaration(node) {
		return wrapNamedDiagnosticSelector(node, getAccessorDeclarationTypeVisibilityDiagnosticMessage)
	} else if ast.IsConstructSignatureDeclaration(node) || ast.IsCallSignatureDeclaration(node) || ast.IsMethodDeclaration(node) || ast.IsMethodSignatureDeclaration(node) || ast.IsFunctionDeclaration(node) || ast.IsIndexSignatureDeclaration(node) {
		return wrapFallbackErrorDiagnosticSelector(node, getReturnTypeVisibilityDiagnosticMessage)
	} else if ast.IsParameter(node) {
		if ast.IsParameterPropertyDeclaration(node, node.Parent) && ast.HasSyntacticModifier(node.Parent, ast.ModifierFlagsPrivate) {
			return wrapSimpleDiagnosticSelector(node, getVariableDeclarationTypeVisibilityDiagnosticMessage)
		}
		return wrapSimpleDiagnosticSelector(node, getParameterDeclarationTypeVisibilityDiagnosticMessage)
	} else if ast.IsTypeParameterDeclaration(node) {
		return wrapSimpleDiagnosticSelector(node, getTypeParameterConstraintVisibilityDiagnosticMessage)
	} else if ast.IsExpressionWithTypeArguments(node) {
		// unique node selection behavior, inline closure
		return func(symbolAccessibilityResult printer.SymbolAccessibilityResult) *SymbolAccessibilityDiagnostic {
			var diagnosticMessage *diagnostics.Message
			// Heritage clause is written by user so it can always be named
			if ast.IsClassDeclaration(node.Parent.Parent) {
				// Class or Interface implemented/extended is inaccessible
				if ast.IsHeritageClause(node.Parent) && node.Parent.AsHeritageClause().Token == ast.KindImplementsKeyword {
					diagnosticMessage = diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1
				} else {
					if node.Parent.Parent.Name() != nil {
						diagnosticMessage = diagnostics.X_extends_clause_of_exported_class_0_has_or_is_using_private_name_1
					} else {
						diagnosticMessage = diagnostics.X_extends_clause_of_exported_class_has_or_is_using_private_name_0
					}
				}
			} else {
				// interface is inaccessible
				diagnosticMessage = diagnostics.X_extends_clause_of_exported_interface_0_has_or_is_using_private_name_1
			}

			return &SymbolAccessibilityDiagnostic{
				diagnosticMessage: diagnosticMessage,
				errorNode:         node,
				typeName:          ast.GetNameOfDeclaration(node.Parent.Parent),
			}
		}
	} else if ast.IsImportEqualsDeclaration(node) {
		return wrapSimpleDiagnosticSelector(node, func(_ *ast.Node, _ printer.SymbolAccessibilityResult) *diagnostics.Message {
			return diagnostics.Import_declaration_0_is_using_private_name_1
		})
	} else if ast.IsTypeAliasDeclaration(node) || ast.IsJSTypeAliasDeclaration(node) {
		// unique node selection behavior, inline closure
		return func(symbolAccessibilityResult printer.SymbolAccessibilityResult) *SymbolAccessibilityDiagnostic {
			diagnosticMessage := selectDiagnosticBasedOnModuleNameNoNameCheck(
				symbolAccessibilityResult,
				diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1_from_module_2,
				diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1,
			)
			errorNode := node.Type()
			typeName := node.Name()
			return &SymbolAccessibilityDiagnostic{
				errorNode:         errorNode,
				diagnosticMessage: diagnosticMessage,
				typeName:          typeName,
			}
		}
	} else {
		panic("Attempted to set a declaration diagnostic context for unhandled node kind: " + node.Kind.String())
	}
}

func getVariableDeclarationTypeVisibilityDiagnosticMessage(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message {
	if node.Kind == ast.KindVariableDeclaration || node.Kind == ast.KindBindingElement {
		return selectDiagnosticBasedOnModuleName(
			symbolAccessibilityResult,
			diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
			diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Exported_variable_0_has_or_is_using_private_name_1,
		)

		// This check is to ensure we don't report error on constructor parameter property as that error would be reported during parameter emit
		// The only exception here is if the constructor was marked as private. we are not emitting the constructor parameters at all.
	} else if node.Kind == ast.KindPropertyDeclaration || node.Kind == ast.KindPropertyAccessExpression || node.Kind == ast.KindElementAccessExpression || node.Kind == ast.KindBinaryExpression || node.Kind == ast.KindPropertySignature ||
		(node.Kind == ast.KindParameter && ast.HasSyntacticModifier(node.Parent, ast.ModifierFlagsPrivate)) {
		// TODO(jfreeman): Deal with computed properties in error reporting.
		if ast.IsStatic(node) {
			return selectDiagnosticBasedOnModuleName(
				symbolAccessibilityResult,
				diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
				diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1,
			)
		} else if node.Parent.Kind == ast.KindClassDeclaration || node.Kind == ast.KindParameter {
			return selectDiagnosticBasedOnModuleName(
				symbolAccessibilityResult,
				diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
				diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1,
			)
		} else {
			// Interfaces cannot have types that cannot be named
			return selectDiagnosticBasedOnModuleNameNoNameCheck(
				symbolAccessibilityResult,
				diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1,
			)
		}
	}
	return nil // TODO: Audit behavior - should this panic? potentially silent error state in strada
}

func getAccessorDeclarationTypeVisibilityDiagnosticMessage(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message {
	if node.Kind == ast.KindSetAccessor {
		// Getters can infer the return type from the returned expression, but setters cannot, so the
		// "_from_external_module_1_but_cannot_be_named" case cannot occur.
		if ast.IsStatic(node) {
			return selectDiagnosticBasedOnModuleNameNoNameCheck(
				symbolAccessibilityResult,
				diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_private_name_1,
			)
		} else {
			return selectDiagnosticBasedOnModuleNameNoNameCheck(
				symbolAccessibilityResult,
				diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_private_name_1,
			)
		}
	} else {
		if ast.IsStatic(node) {
			return selectDiagnosticBasedOnModuleName(
				symbolAccessibilityResult,
				diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
				diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_private_name_1,
			)
		} else {
			return selectDiagnosticBasedOnModuleName(
				symbolAccessibilityResult,
				diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
				diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_private_name_1,
			)
		}
	}
}

func getReturnTypeVisibilityDiagnosticMessage(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message {
	switch node.Kind {
	case ast.KindConstructSignature:
		// Interfaces cannot have return types that cannot be named
		return selectDiagnosticBasedOnModuleNameNoNameCheck(
			symbolAccessibilityResult,
			diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1,
			diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0,
		)
	case ast.KindCallSignature:
		// Interfaces cannot have return types that cannot be named
		return selectDiagnosticBasedOnModuleNameNoNameCheck(
			symbolAccessibilityResult,
			diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1,
			diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0,
		)
	case ast.KindIndexSignature:
		// Interfaces cannot have return types that cannot be named
		return selectDiagnosticBasedOnModuleNameNoNameCheck(
			symbolAccessibilityResult,
			diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1,
			diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0,
		)

	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		if ast.IsStatic(node) {
			return selectDiagnosticBasedOnModuleName(
				symbolAccessibilityResult,
				diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named,
				diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1,
				diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0,
			)
		} else if node.Parent.Kind == ast.KindClassDeclaration {
			return selectDiagnosticBasedOnModuleName(
				symbolAccessibilityResult,
				diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named,
				diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1,
				diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0,
			)
		} else {
			// Interfaces cannot have return types that cannot be named
			return selectDiagnosticBasedOnModuleNameNoNameCheck(
				symbolAccessibilityResult,
				diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1,
				diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0,
			)
		}
	case ast.KindFunctionDeclaration:
		return selectDiagnosticBasedOnModuleName(
			symbolAccessibilityResult,
			diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named,
			diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1,
			diagnostics.Return_type_of_exported_function_has_or_is_using_private_name_0,
		)
	default:
		panic("This is unknown kind for signature: " + node.Kind.String())
	}
}

func getParameterDeclarationTypeVisibilityDiagnosticMessage(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message {
	switch node.Parent.Kind {
	case ast.KindConstructor:
		return selectDiagnosticBasedOnModuleName(
			symbolAccessibilityResult,
			diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
			diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1,
		)

	case ast.KindConstructSignature, ast.KindConstructorType:
		// Interfaces cannot have parameter types that cannot be named
		return selectDiagnosticBasedOnModuleNameNoNameCheck(
			symbolAccessibilityResult,
			diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1,
		)

	case ast.KindCallSignature:
		// Interfaces cannot have parameter types that cannot be named
		return selectDiagnosticBasedOnModuleNameNoNameCheck(
			symbolAccessibilityResult,
			diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1,
		)

	case ast.KindIndexSignature:
		// Interfaces cannot have parameter types that cannot be named
		return selectDiagnosticBasedOnModuleNameNoNameCheck(
			symbolAccessibilityResult,
			diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1,
		)

	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		if ast.IsStatic(node.Parent) {
			return selectDiagnosticBasedOnModuleName(
				symbolAccessibilityResult,
				diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
				diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1,
			)
		} else if node.Parent.Parent.Kind == ast.KindClassDeclaration {
			return selectDiagnosticBasedOnModuleName(
				symbolAccessibilityResult,
				diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
				diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1,
			)
		} else {
			// Interfaces cannot have parameter types that cannot be named
			return selectDiagnosticBasedOnModuleNameNoNameCheck(
				symbolAccessibilityResult,
				diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2,
				diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1,
			)
		}

	case ast.KindFunctionDeclaration, ast.KindFunctionType:
		return selectDiagnosticBasedOnModuleName(
			symbolAccessibilityResult,
			diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
			diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1,
		)
	case ast.KindSetAccessor, ast.KindGetAccessor:
		return selectDiagnosticBasedOnModuleName(
			symbolAccessibilityResult,
			diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
			diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_private_module_2,
			diagnostics.Parameter_0_of_accessor_has_or_is_using_private_name_1,
		)
	default:
		panic("Unknown parent for parameter: " + node.Parent.Kind.String())
	}
}

func getTypeParameterConstraintVisibilityDiagnosticMessage(node *ast.Node, symbolAccessibilityResult printer.SymbolAccessibilityResult) *diagnostics.Message {
	// Type parameter constraints are named by user so we should always be able to name it
	switch node.Parent.Kind {
	case ast.KindClassDeclaration:
		return diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1
	case ast.KindInterfaceDeclaration:
		return diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1
	case ast.KindMappedType:
		return diagnostics.Type_parameter_0_of_exported_mapped_object_type_is_using_private_name_1
	case ast.KindConstructorType, ast.KindConstructSignature:
		return diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1
	case ast.KindCallSignature:
		return diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1
	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		if ast.IsStatic(node.Parent) {
			return diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1
		} else if node.Parent.Parent.Kind == ast.KindClassDeclaration {
			return diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1
		} else {
			return diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1
		}
	case ast.KindFunctionType, ast.KindFunctionDeclaration:
		return diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1

	case ast.KindInferType:
		return diagnostics.Extends_clause_for_inferred_type_0_has_or_is_using_private_name_1

	case ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration:
		return diagnostics.Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1

	default:
		panic("This is unknown parent for type parameter: " + node.Parent.Kind.String())
	}
}

func getRelatedSuggestionByDeclarationKind(kind ast.Kind) *diagnostics.Message {
	switch kind {
	case ast.KindArrowFunction:
		return diagnostics.Add_a_return_type_to_the_function_expression
	case ast.KindFunctionExpression:
		return diagnostics.Add_a_return_type_to_the_function_expression
	case ast.KindMethodDeclaration:
		return diagnostics.Add_a_return_type_to_the_method
	case ast.KindGetAccessor:
		return diagnostics.Add_a_return_type_to_the_get_accessor_declaration
	case ast.KindSetAccessor:
		return diagnostics.Add_a_type_to_parameter_of_the_set_accessor_declaration
	case ast.KindFunctionDeclaration:
		return diagnostics.Add_a_return_type_to_the_function_declaration
	case ast.KindConstructSignature:
		return diagnostics.Add_a_return_type_to_the_function_declaration
	case ast.KindParameter:
		return diagnostics.Add_a_type_annotation_to_the_parameter_0
	case ast.KindVariableDeclaration:
		return diagnostics.Add_a_type_annotation_to_the_variable_0
	case ast.KindPropertyDeclaration:
		return diagnostics.Add_a_type_annotation_to_the_property_0
	case ast.KindPropertySignature:
		return diagnostics.Add_a_type_annotation_to_the_property_0
	case ast.KindExportAssignment:
		return diagnostics.Move_the_expression_in_default_export_to_a_variable_and_add_a_type_annotation_to_it
	default:
		return nil
	}
}

func getErrorByDeclarationKind(kind ast.Kind) *diagnostics.Message {
	switch kind {
	case ast.KindFunctionExpression:
		return diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations
	case ast.KindFunctionDeclaration:
		return diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations
	case ast.KindArrowFunction:
		return diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations
	case ast.KindMethodDeclaration:
		return diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations
	case ast.KindConstructSignature:
		return diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations
	case ast.KindGetAccessor:
		return diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations
	case ast.KindSetAccessor:
		return diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations
	case ast.KindParameter:
		return diagnostics.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations
	case ast.KindVariableDeclaration:
		return diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations
	case ast.KindPropertyDeclaration:
		return diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations
	case ast.KindPropertySignature:
		return diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations
	case ast.KindComputedPropertyName:
		return diagnostics.Computed_property_names_on_class_or_object_literals_cannot_be_inferred_with_isolatedDeclarations
	case ast.KindSpreadAssignment:
		return diagnostics.Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations
	case ast.KindShorthandPropertyAssignment:
		return diagnostics.Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations
	case ast.KindArrayLiteralExpression:
		return diagnostics.Only_const_arrays_can_be_inferred_with_isolatedDeclarations
	case ast.KindExportAssignment:
		return diagnostics.Default_exports_can_t_be_inferred_with_isolatedDeclarations
	case ast.KindSpreadElement:
		return diagnostics.Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations
	default:
		return nil
	}
}

func isDeclarationEnoughForErrors(node *ast.Node) bool {
	return ast.IsExportAssignment(node) || ast.IsStatement(node) || ast.IsVariableDeclaration(node) || ast.IsPropertyDeclaration(node) || ast.IsParameter(node)
}

func isFunctionLikeAndNotConstructor(node *ast.Node) bool {
	return ast.IsFunctionLikeDeclaration(node) && !ast.IsConstructorDeclaration(node)
}

func findNearestDeclaration(node *ast.Node) *ast.Node {
	result := ast.FindAncestor(node, isDeclarationEnoughForErrors)
	if result == nil {
		return nil
	}
	if ast.IsExportAssignment(result) {
		return result
	}
	if ast.IsReturnStatement(result) {
		return ast.FindAncestor(result, isFunctionLikeAndNotConstructor)
	}
	if ast.IsStatement(result) {
		return nil
	}
	return result
}

func createEntityInTypeNodeError(node *ast.Node) *ast.Diagnostic {
	diag := createDiagnosticForNode(node, diagnostics.Type_containing_private_name_0_can_t_be_used_with_isolatedDeclarations, scanner.GetTextOfNode(node))
	addParentDeclarationRelatedInfo(node, diag)
	return diag
}

func addParentDeclarationRelatedInfo(node *ast.Node, diag *ast.Diagnostic) {
	parentDeclaration := findNearestDeclaration(node)
	if parentDeclaration == nil {
		return
	}
	targetStr := ""
	if !ast.IsExportAssignment(parentDeclaration) && parentDeclaration.Name() != nil {
		targetStr = scanner.GetTextOfNode(parentDeclaration.Name())
	}
	diag.AddRelatedInfo(createDiagnosticForNode(parentDeclaration, getRelatedSuggestionByDeclarationKind(parentDeclaration.Kind), targetStr))
}

func createAccessorTypeError(node *ast.Node) *ast.Diagnostic {
	allDeclarations := ast.GetAllAccessorDeclarationsForDeclaration(node, node.Symbol().Declarations)
	getAccessor := allDeclarations.GetAccessor
	setAccessor := allDeclarations.SetAccessor
	targetNode := node
	if ast.IsSetAccessorDeclaration(node) && len(node.Parameters()) > 0 {
		targetNode = node.Parameters()[0]
	}
	diag := createDiagnosticForNode(targetNode, getErrorByDeclarationKind(node.Kind))
	if setAccessor != nil {
		diag.AddRelatedInfo(createDiagnosticForNode(setAccessor.AsNode(), getRelatedSuggestionByDeclarationKind(setAccessor.Kind)))
	}
	if getAccessor != nil {
		diag.AddRelatedInfo(createDiagnosticForNode(getAccessor.AsNode(), getRelatedSuggestionByDeclarationKind(getAccessor.Kind)))
	}
	return diag
}

func createObjectLiteralError(node *ast.Node) *ast.Diagnostic {
	diag := createDiagnosticForNode(node, getErrorByDeclarationKind(node.Kind))
	addParentDeclarationRelatedInfo(node, diag)
	return diag
}

func createArrayLiteralError(node *ast.Node) *ast.Diagnostic {
	diag := createDiagnosticForNode(node, getErrorByDeclarationKind(node.Kind))
	addParentDeclarationRelatedInfo(node, diag)
	return diag
}

func createReturnTypeError(node *ast.Node) *ast.Diagnostic {
	diag := createDiagnosticForNode(node, getErrorByDeclarationKind(node.Kind))
	addParentDeclarationRelatedInfo(node, diag)
	diag.AddRelatedInfo(createDiagnosticForNode(node, getRelatedSuggestionByDeclarationKind(node.Kind)))
	return diag
}

func createBindingElementError(node *ast.Node) *ast.Diagnostic {
	return createDiagnosticForNode(node, diagnostics.Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations)
}

func createVariableOrPropertyError(node *ast.Node) *ast.Diagnostic {
	diag := createDiagnosticForNode(node, getErrorByDeclarationKind(node.Kind))
	diag.AddRelatedInfo(createDiagnosticForNode(node, getRelatedSuggestionByDeclarationKind(node.Kind), scanner.GetTextOfNode(node.Name())))
	return diag
}

func createExpressionError(node *ast.Node) *ast.Diagnostic {
	return createExpressionErrorEx(node, nil)
}

func createClassExpressionError(node *ast.Node) *ast.Diagnostic {
	return createExpressionErrorEx(node, diagnostics.Inference_from_class_expressions_is_not_supported_with_isolatedDeclarations)
}

func isParentForIDDIagnostic(node *ast.Node) ast.FindAncestorResult {
	if ast.IsExportAssignment(node) {
		return ast.FindAncestorTrue
	}
	if ast.IsStatement(node) {
		return ast.FindAncestorQuit
	}
	return ast.ToFindAncestorResult(!ast.IsParenthesizedExpression(node) && !ast.IsAssertionExpression(node))
}

func createExpressionErrorEx(node *ast.Node, diagnosticMessage *diagnostics.Message) *ast.Diagnostic {
	parentDeclaration := findNearestDeclaration(node)
	if parentDeclaration == nil {
		if diagnosticMessage == nil {
			diagnosticMessage = diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations
		}
		return createDiagnosticForNode(node, diagnosticMessage)
	}

	targetStr := ""
	if !ast.IsExportAssignment(parentDeclaration) && parentDeclaration.Name() != nil {
		targetStr = scanner.GetTextOfNode(parentDeclaration.Name())
	}
	parent := ast.FindAncestorOrQuit(node.Parent, isParentForIDDIagnostic)

	if parentDeclaration == parent {
		if diagnosticMessage == nil {
			diagnosticMessage = getErrorByDeclarationKind(parentDeclaration.Kind)
		}
		diag := createDiagnosticForNode(node, diagnosticMessage)
		diag.AddRelatedInfo(createDiagnosticForNode(parentDeclaration, getRelatedSuggestionByDeclarationKind(parentDeclaration.Kind), targetStr))
		return diag
	}
	if diagnosticMessage == nil {
		diagnosticMessage = diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations
	}
	diag := createDiagnosticForNode(node, diagnosticMessage)
	diag.AddRelatedInfo(createDiagnosticForNode(parentDeclaration, getRelatedSuggestionByDeclarationKind(parentDeclaration.Kind), targetStr))
	diag.AddRelatedInfo(createDiagnosticForNode(node, diagnostics.Add_satisfies_and_a_type_assertion_to_this_expression_satisfies_T_as_T_to_make_the_type_explicit))
	return diag
}

func createGetIsolatedDeclarationErrors(resolver printer.EmitResolver) func(node *ast.Node) *ast.Diagnostic {
	createParameterError := func(node *ast.Node) *ast.Diagnostic {
		if ast.IsSetAccessorDeclaration(node.Parent) {
			return createAccessorTypeError(node.Parent)
		}
		addUndefined := resolver.RequiresAddingImplicitUndefinedUnsafe(node, nil, nil) // skip checker lock - node builder will already have one
		if !addUndefined && node.Initializer() != nil {
			return createExpressionError(node)
		}
		message := getErrorByDeclarationKind(node.Kind)
		if addUndefined {
			message = diagnostics.Declaration_emit_for_this_parameter_requires_implicitly_adding_undefined_to_its_type_This_is_not_supported_with_isolatedDeclarations
		}
		diag := createDiagnosticForNode(node, message)
		targetStr := scanner.GetTextOfNode(node.Name())
		diag.AddRelatedInfo(createDiagnosticForNode(node, getRelatedSuggestionByDeclarationKind(node.Kind), targetStr))
		return diag
	}

	return func(node *ast.Node) *ast.Diagnostic {
		heritageClause := ast.FindAncestor(node, ast.IsHeritageClause)
		if heritageClause != nil {
			return createDiagnosticForNode(node, diagnostics.Extends_clause_can_t_contain_an_expression_with_isolatedDeclarations)
		}
		if ast.IsPartOfTypeNode(node) || ast.IsTypeQueryNode(node) {
			return createEntityInTypeNodeError(node)
		}
		if ast.IsEntityName(node) || ast.IsEntityNameExpression(node) {
			return createEntityInTypeNodeError(node)
		}
		switch node.Kind {
		case ast.KindGetAccessor, ast.KindSetAccessor:
			return createAccessorTypeError(node)
		case ast.KindComputedPropertyName, ast.KindShorthandPropertyAssignment, ast.KindSpreadAssignment:
			return createObjectLiteralError(node)
		case ast.KindArrayLiteralExpression, ast.KindSpreadElement:
			return createArrayLiteralError(node)
		case ast.KindMethodDeclaration, ast.KindConstructSignature, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindFunctionDeclaration:
			return createReturnTypeError(node)
		case ast.KindBindingElement:
			return createBindingElementError(node)
		case ast.KindPropertyDeclaration, ast.KindVariableDeclaration:
			return createVariableOrPropertyError(node)
		case ast.KindParameter:
			return createParameterError(node)
		case ast.KindPropertyAssignment:
			return createExpressionError(node.Initializer())
		case ast.KindClassExpression:
			return createClassExpressionError(node)
		default:
			return createExpressionError(node)
		}
	}
}
