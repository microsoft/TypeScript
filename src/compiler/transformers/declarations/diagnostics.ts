/* @internal */
namespace ts {
    export type GetSymbolAccessibilityDiagnostic = (symbolAccessibilityResult: SymbolAccessibilityResult) => (SymbolAccessibilityDiagnostic | undefined);

    export interface SymbolAccessibilityDiagnostic {
        errorNode: Node;
        diagnosticMessage: DiagnosticMessage;
        typeName?: DeclarationName | QualifiedName;
    }

    export type DeclarationDiagnosticProducing =
        | VariableDeclaration
        | PropertyDeclaration
        | PropertySignature
        | BindingElement
        | SetAccessorDeclaration
        | GetAccessorDeclaration
        | ConstructSignatureDeclaration
        | CallSignatureDeclaration
        | MethodDeclaration
        | MethodSignature
        | FunctionDeclaration
        | ParameterDeclaration
        | TypeParameterDeclaration
        | ExpressionWithTypeArguments
        | ImportEqualsDeclaration
        | TypeAliasDeclaration
        | ConstructorDeclaration
        | IndexSignatureDeclaration
        | PropertyAccessExpression;

    export function canProduceDiagnostics(node: Node): node is DeclarationDiagnosticProducing {
        return isVariableDeclaration(node) ||
            isPropertyDeclaration(node) ||
            isPropertySignature(node) ||
            isBindingElement(node) ||
            isSetAccessor(node) ||
            isGetAccessor(node) ||
            isConstructSignatureDeclaration(node) ||
            isCallSignatureDeclaration(node) ||
            isMethodDeclaration(node) ||
            isMethodSignature(node) ||
            isFunctionDeclaration(node) ||
            isParameter(node) ||
            isTypeParameterDeclaration(node) ||
            isExpressionWithTypeArguments(node) ||
            isImportEqualsDeclaration(node) ||
            isTypeAliasDeclaration(node) ||
            isConstructorDeclaration(node) ||
            isIndexSignatureDeclaration(node) ||
            isPropertyAccessExpression(node);
    }

    export function createGetSymbolAccessibilityDiagnosticForNodeName(node: DeclarationDiagnosticProducing) {
        if (isSetAccessor(node) || isGetAccessor(node)) {
            return getAccessorNameVisibilityError;
        }
        else if (isMethodSignature(node) || isMethodDeclaration(node)) {
            return getMethodNameVisibilityError;
        }
        else {
            return createGetSymbolAccessibilityDiagnosticForNode(node);
        }
        function getAccessorNameVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult) {
            const diagnosticMessage = getAccessorNameVisibilityDiagnosticMessage(symbolAccessibilityResult);
            return diagnosticMessage !== undefined ? {
                diagnosticMessage,
                errorNode: node,
                typeName: (node as NamedDeclaration).name
            } : undefined;
        }

        function getAccessorNameVisibilityDiagnosticMessage(symbolAccessibilityResult: SymbolAccessibilityResult) {
            if (hasSyntacticModifier(node, ModifierFlags.Static)) {
                return symbolAccessibilityResult.errorModuleName ?
                    symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                        Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                        Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                    Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
            }
            else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                return symbolAccessibilityResult.errorModuleName ?
                    symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                        Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                        Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                    Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
            }
            else {
                return symbolAccessibilityResult.errorModuleName ?
                    Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                    Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
            }
        }

        function getMethodNameVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic | undefined {
            const diagnosticMessage = getMethodNameVisibilityDiagnosticMessage(symbolAccessibilityResult);
            return diagnosticMessage !== undefined ? {
                diagnosticMessage,
                errorNode: node,
                typeName: (node as NamedDeclaration).name
            } : undefined;
        }

        function getMethodNameVisibilityDiagnosticMessage(symbolAccessibilityResult: SymbolAccessibilityResult) {
            if (hasSyntacticModifier(node, ModifierFlags.Static)) {
                return symbolAccessibilityResult.errorModuleName ?
                    symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                        Diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                        Diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                    Diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_private_name_1;
            }
            else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                return symbolAccessibilityResult.errorModuleName ?
                    symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                        Diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                        Diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                    Diagnostics.Public_method_0_of_exported_class_has_or_is_using_private_name_1;
            }
            else {
                return symbolAccessibilityResult.errorModuleName ?
                    Diagnostics.Method_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                    Diagnostics.Method_0_of_exported_interface_has_or_is_using_private_name_1;
            }
        }
    }

    export function createGetSymbolAccessibilityDiagnosticForNode(node: DeclarationDiagnosticProducing): (symbolAccessibilityResult: SymbolAccessibilityResult) => SymbolAccessibilityDiagnostic | undefined {
        if (isVariableDeclaration(node) || isPropertyDeclaration(node) || isPropertySignature(node) || isPropertyAccessExpression(node) || isBindingElement(node) || isConstructorDeclaration(node)) {
            return getVariableDeclarationTypeVisibilityError;
        }
        else if (isSetAccessor(node) || isGetAccessor(node)) {
            return getAccessorDeclarationTypeVisibilityError;
        }
        else if (isConstructSignatureDeclaration(node) || isCallSignatureDeclaration(node) || isMethodDeclaration(node) || isMethodSignature(node) || isFunctionDeclaration(node) || isIndexSignatureDeclaration(node)) {
            return getReturnTypeVisibilityError;
        }
        else if (isParameter(node)) {
            if (isParameterPropertyDeclaration(node, node.parent) && hasSyntacticModifier(node.parent, ModifierFlags.Private)) {
                return getVariableDeclarationTypeVisibilityError;
            }
            return getParameterDeclarationTypeVisibilityError;
        }
        else if (isTypeParameterDeclaration(node)) {
            return getTypeParameterConstraintVisibilityError;
        }
        else if (isExpressionWithTypeArguments(node)) {
            return getHeritageClauseVisibilityError;
        }
        else if (isImportEqualsDeclaration(node)) {
            return getImportEntityNameVisibilityError;
        }
        else if (isTypeAliasDeclaration(node)) {
            return getTypeAliasDeclarationVisibilityError;
        }
        else {
            return Debug.assertNever(node, `Attempted to set a declaration diagnostic context for unhandled node kind: ${(ts as any).SyntaxKind[(node as any).kind]}`);
        }

        function getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult: SymbolAccessibilityResult) {
            if (node.kind === SyntaxKind.VariableDeclaration || node.kind === SyntaxKind.BindingElement) {
                return symbolAccessibilityResult.errorModuleName ?
                    symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                        Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                        Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2 :
                    Diagnostics.Exported_variable_0_has_or_is_using_private_name_1;
            }
            // This check is to ensure we don't report error on constructor parameter property as that error would be reported during parameter emit
            // The only exception here is if the constructor was marked as private. we are not emitting the constructor parameters at all.
            else if (node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertyAccessExpression || node.kind === SyntaxKind.PropertySignature ||
                (node.kind === SyntaxKind.Parameter && hasSyntacticModifier(node.parent, ModifierFlags.Private))) {
                // TODO(jfreeman): Deal with computed properties in error reporting.
                if (hasSyntacticModifier(node, ModifierFlags.Static)) {
                    return symbolAccessibilityResult.errorModuleName ?
                        symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
                }
                else if (node.parent.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.Parameter) {
                    return symbolAccessibilityResult.errorModuleName ?
                        symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
                }
                else {
                    // Interfaces cannot have types that cannot be named
                    return symbolAccessibilityResult.errorModuleName ?
                        Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
                }
            }
        }

        function getVariableDeclarationTypeVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic | undefined {
            const diagnosticMessage = getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult);
            return diagnosticMessage !== undefined ? {
                diagnosticMessage,
                errorNode: node,
                typeName: (node as NamedDeclaration).name
            } : undefined;
        }

        function getAccessorDeclarationTypeVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic {
            let diagnosticMessage: DiagnosticMessage;
            if (node.kind === SyntaxKind.SetAccessor) {
                // Getters can infer the return type from the returned expression, but setters cannot, so the
                // "_from_external_module_1_but_cannot_be_named" case cannot occur.
                if (hasSyntacticModifier(node, ModifierFlags.Static)) {
                    diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                        Diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_private_name_1;
                }
                else {
                    diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                        Diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_private_name_1;
                }
            }
            else {
                if (hasSyntacticModifier(node, ModifierFlags.Static)) {
                    diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                        symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_private_name_1;
                }
                else {
                    diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                        symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_private_name_1;
                }
            }
            return {
                diagnosticMessage,
                errorNode: (node as NamedDeclaration).name!,
                typeName: (node as NamedDeclaration).name
            };
        }

        function getReturnTypeVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic {
            let diagnosticMessage: DiagnosticMessage;
            switch (node.kind) {
                case SyntaxKind.ConstructSignature:
                    // Interfaces cannot have return types that cannot be named
                    diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                        Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0;
                    break;

                case SyntaxKind.CallSignature:
                    // Interfaces cannot have return types that cannot be named
                    diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                        Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0;
                    break;

                case SyntaxKind.IndexSignature:
                    // Interfaces cannot have return types that cannot be named
                    diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                        Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0;
                    break;

                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    if (hasSyntacticModifier(node, ModifierFlags.Static)) {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                                Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0;
                    }
                    else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                                Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0;
                    }
                    else {
                        // Interfaces cannot have return types that cannot be named
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0;
                    }
                    break;

                case SyntaxKind.FunctionDeclaration:
                    diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                        symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                            Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1 :
                        Diagnostics.Return_type_of_exported_function_has_or_is_using_private_name_0;
                    break;

                default:
                    return Debug.fail("This is unknown kind for signature: " + node.kind);
            }

            return {
                diagnosticMessage,
                errorNode: (node as NamedDeclaration).name || node
            };
        }

        function getParameterDeclarationTypeVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic | undefined {
            const diagnosticMessage: DiagnosticMessage = getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult);
            return diagnosticMessage !== undefined ? {
                diagnosticMessage,
                errorNode: node,
                typeName: (node as NamedDeclaration).name
            } : undefined;
        }

        function getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult: SymbolAccessibilityResult): DiagnosticMessage {
            switch (node.parent.kind) {
                case SyntaxKind.Constructor:
                    return symbolAccessibilityResult.errorModuleName ?
                        symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1;

                case SyntaxKind.ConstructSignature:
                case SyntaxKind.ConstructorType:
                    // Interfaces cannot have parameter types that cannot be named
                    return symbolAccessibilityResult.errorModuleName ?
                        Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;

                case SyntaxKind.CallSignature:
                    // Interfaces cannot have parameter types that cannot be named
                    return symbolAccessibilityResult.errorModuleName ?
                        Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;

                case SyntaxKind.IndexSignature:
                    // Interfaces cannot have parameter types that cannot be named
                    return symbolAccessibilityResult.errorModuleName ?
                        Diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1;

                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    if (hasSyntacticModifier(node.parent, ModifierFlags.Static)) {
                        return symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                    }
                    else if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                        return symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                    }
                    else {
                        // Interfaces cannot have parameter types that cannot be named
                        return symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                    }

                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionType:
                    return symbolAccessibilityResult.errorModuleName ?
                        symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1;
                case SyntaxKind.SetAccessor:
                case SyntaxKind.GetAccessor:
                    return symbolAccessibilityResult.errorModuleName ?
                        symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Parameter_0_of_accessor_has_or_is_using_private_name_1;

                default:
                    return Debug.fail(`Unknown parent for parameter: ${(ts as any).SyntaxKind[node.parent.kind]}`);
            }
        }

        function getTypeParameterConstraintVisibilityError(): SymbolAccessibilityDiagnostic {
            // Type parameter constraints are named by user so we should always be able to name it
            let diagnosticMessage: DiagnosticMessage;
            switch (node.parent.kind) {
                case SyntaxKind.ClassDeclaration:
                    diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1;
                    break;

                case SyntaxKind.InterfaceDeclaration:
                    diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1;
                    break;

                case SyntaxKind.MappedType:
                    diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_mapped_object_type_is_using_private_name_1;
                    break;

                case SyntaxKind.ConstructorType:
                case SyntaxKind.ConstructSignature:
                    diagnosticMessage = Diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                    break;

                case SyntaxKind.CallSignature:
                    diagnosticMessage = Diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                    break;

                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    if (hasSyntacticModifier(node.parent, ModifierFlags.Static)) {
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                    }
                    else if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                    }
                    else {
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                    }
                    break;

                case SyntaxKind.FunctionType:
                case SyntaxKind.FunctionDeclaration:
                    diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1;
                    break;

                case SyntaxKind.TypeAliasDeclaration:
                    diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1;
                    break;

                default:
                    return Debug.fail("This is unknown parent for type parameter: " + node.parent.kind);
            }

            return {
                diagnosticMessage,
                errorNode: node,
                typeName: (node as NamedDeclaration).name
            };
        }

        function getHeritageClauseVisibilityError(): SymbolAccessibilityDiagnostic {
            let diagnosticMessage: DiagnosticMessage;
            // Heritage clause is written by user so it can always be named
            if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                // Class or Interface implemented/extended is inaccessible
                diagnosticMessage = isHeritageClause(node.parent) && node.parent.token === SyntaxKind.ImplementsKeyword ?
                    Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1 :
                    Diagnostics.extends_clause_of_exported_class_0_has_or_is_using_private_name_1;
            }
            else {
                // interface is inaccessible
                diagnosticMessage = Diagnostics.extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
            }

            return {
                diagnosticMessage,
                errorNode: node,
                typeName: getNameOfDeclaration(node.parent.parent as Declaration)
            };
        }

        function getImportEntityNameVisibilityError(): SymbolAccessibilityDiagnostic {
            return {
                diagnosticMessage: Diagnostics.Import_declaration_0_is_using_private_name_1,
                errorNode: node,
                typeName: (node as NamedDeclaration).name
            };
        }

        function getTypeAliasDeclarationVisibilityError(): SymbolAccessibilityDiagnostic {
            return {
                diagnosticMessage: Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1,
                errorNode: (node as TypeAliasDeclaration).type,
                typeName: (node as TypeAliasDeclaration).name
            };
        }
    }
}
