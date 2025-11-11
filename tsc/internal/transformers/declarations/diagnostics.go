package declarations

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/printer"
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

// !!! TODO isolatedDeclarations createGetIsolatedDeclarationErrors
