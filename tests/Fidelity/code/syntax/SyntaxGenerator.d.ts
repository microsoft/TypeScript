declare var require: any;
declare var module: any;
declare module TypeScript {
    var DiagnosticCode: {
        error_TS_0_1: string;
        warning_TS_0_1: string;
        Unrecognized_escape_sequence: string;
        Unexpected_character_0: string;
        Missing_close_quote_character: string;
        Identifier_expected: string;
        _0_keyword_expected: string;
        _0_expected: string;
        Identifier_expected_0_is_a_keyword: string;
        Automatic_semicolon_insertion_not_allowed: string;
        Unexpected_token_0_expected: string;
        Trailing_separator_not_allowed: string;
        AsteriskSlash_expected: string;
        public_or_private_modifier_must_precede_static: string;
        Unexpected_token: string;
        Catch_clause_parameter_cannot_have_a_type_annotation: string;
        Rest_parameter_must_be_last_in_list: string;
        Parameter_cannot_have_question_mark_and_initializer: string;
        Required_parameter_cannot_follow_optional_parameter: string;
        Index_signatures_cannot_have_rest_parameters: string;
        Index_signature_parameter_cannot_have_accessibility_modifiers: string;
        Index_signature_parameter_cannot_have_a_question_mark: string;
        Index_signature_parameter_cannot_have_an_initializer: string;
        Index_signature_must_have_a_type_annotation: string;
        Index_signature_parameter_must_have_a_type_annotation: string;
        Index_signature_parameter_type_must_be_string_or_number: string;
        extends_clause_already_seen: string;
        extends_clause_must_precede_implements_clause: string;
        Classes_can_only_extend_a_single_class: string;
        implements_clause_already_seen: string;
        Accessibility_modifier_already_seen: string;
        _0_modifier_must_precede_1_modifier: string;
        _0_modifier_already_seen: string;
        _0_modifier_cannot_appear_on_a_class_element: string;
        Interface_declaration_cannot_have_implements_clause: string;
        super_invocation_cannot_have_type_arguments: string;
        Only_ambient_modules_can_use_quoted_names: string;
        Statements_are_not_allowed_in_ambient_contexts: string;
        Implementations_are_not_allowed_in_ambient_contexts: string;
        declare_modifier_not_allowed_for_code_already_in_an_ambient_context: string;
        Initializers_are_not_allowed_in_ambient_contexts: string;
        Parameter_property_declarations_can_only_be_used_in_a_non_ambient_constructor_declaration: string;
        Function_implementation_expected: string;
        Constructor_implementation_expected: string;
        Function_overload_name_must_be_0: string;
        _0_modifier_cannot_appear_on_a_module_element: string;
        declare_modifier_cannot_appear_on_an_interface_declaration: string;
        declare_modifier_required_for_top_level_element: string;
        Rest_parameter_cannot_be_optional: string;
        Rest_parameter_cannot_have_an_initializer: string;
        set_accessor_must_have_one_and_only_one_parameter: string;
        set_accessor_parameter_cannot_be_optional: string;
        set_accessor_parameter_cannot_have_an_initializer: string;
        set_accessor_cannot_have_rest_parameter: string;
        get_accessor_cannot_have_parameters: string;
        Modifiers_cannot_appear_here: string;
        Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher: string;
        Class_name_cannot_be_0: string;
        Interface_name_cannot_be_0: string;
        Enum_name_cannot_be_0: string;
        Module_name_cannot_be_0: string;
        Enum_member_must_have_initializer: string;
        Export_assignment_cannot_be_used_in_internal_modules: string;
        Export_assignment_not_allowed_in_module_with_exported_element: string;
        Module_cannot_have_multiple_export_assignments: string;
        Ambient_enum_elements_can_only_have_integer_literal_initializers: string;
        module_class_interface_enum_import_or_statement: string;
        constructor_function_accessor_or_variable: string;
        statement: string;
        case_or_default_clause: string;
        identifier: string;
        call_construct_index_property_or_function_signature: string;
        expression: string;
        type_name: string;
        property_or_accessor: string;
        parameter: string;
        type: string;
        type_parameter: string;
        declare_modifier_not_allowed_on_import_declaration: string;
        Function_overload_must_be_static: string;
        Function_overload_must_not_be_static: string;
        Parameter_property_declarations_cannot_be_used_in_a_constructor_overload: string;
        Invalid_reference_directive_syntax: string;
        Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher: string;
        Accessors_are_not_allowed_in_ambient_contexts: string;
        _0_modifier_cannot_appear_on_a_constructor_declaration: string;
        _0_modifier_cannot_appear_on_a_parameter: string;
        Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement: string;
        Type_parameters_cannot_appear_on_a_constructor_declaration: string;
        Type_annotation_cannot_appear_on_a_constructor_declaration: string;
        Duplicate_identifier_0: string;
        The_name_0_does_not_exist_in_the_current_scope: string;
        The_name_0_does_not_refer_to_a_value: string;
        super_can_only_be_used_inside_a_class_instance_method: string;
        The_left_hand_side_of_an_assignment_expression_must_be_a_variable_property_or_indexer: string;
        Value_of_type_0_is_not_callable_Did_you_mean_to_include_new: string;
        Value_of_type_0_is_not_callable: string;
        Value_of_type_0_is_not_newable: string;
        Value_of_type_0_is_not_indexable_by_type_1: string;
        Operator_0_cannot_be_applied_to_types_1_and_2: string;
        Operator_0_cannot_be_applied_to_types_1_and_2_3: string;
        Cannot_convert_0_to_1: string;
        Cannot_convert_0_to_1_NL_2: string;
        Expected_var_class_interface_or_module: string;
        Operator_0_cannot_be_applied_to_type_1: string;
        Getter_0_already_declared: string;
        Setter_0_already_declared: string;
        Exported_class_0_extends_private_class_1: string;
        Exported_class_0_implements_private_interface_1: string;
        Exported_interface_0_extends_private_interface_1: string;
        Exported_class_0_extends_class_from_inaccessible_module_1: string;
        Exported_class_0_implements_interface_from_inaccessible_module_1: string;
        Exported_interface_0_extends_interface_from_inaccessible_module_1: string;
        Public_static_property_0_of_exported_class_has_or_is_using_private_type_1: string;
        Public_property_0_of_exported_class_has_or_is_using_private_type_1: string;
        Property_0_of_exported_interface_has_or_is_using_private_type_1: string;
        Exported_variable_0_has_or_is_using_private_type_1: string;
        Public_static_property_0_of_exported_class_is_using_inaccessible_module_1: string;
        Public_property_0_of_exported_class_is_using_inaccessible_module_1: string;
        Property_0_of_exported_interface_is_using_inaccessible_module_1: string;
        Exported_variable_0_is_using_inaccessible_module_1: string;
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_type_1: string;
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_type_1: string;
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_method_from_exported_interface_has_or_is_using_private_type_1: string;
        Parameter_0_of_exported_function_has_or_is_using_private_type_1: string;
        Parameter_0_of_constructor_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_public_static_property_setter_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_public_property_setter_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_constructor_signature_from_exported_interface_is_using_inaccessible_module_1: string;
        Parameter_0_of_call_signature_from_exported_interface_is_using_inaccessible_module_1: string;
        Parameter_0_of_public_static_method_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_public_method_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_method_from_exported_interface_is_using_inaccessible_module_1: string;
        Parameter_0_of_exported_function_is_using_inaccessible_module_1: string;
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_type_0: string;
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_type_0: string;
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_type_0: string;
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_type_0: string;
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_type_0: string;
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_type_0: string;
        Return_type_of_public_method_from_exported_class_has_or_is_using_private_type_0: string;
        Return_type_of_method_from_exported_interface_has_or_is_using_private_type_0: string;
        Return_type_of_exported_function_has_or_is_using_private_type_0: string;
        Return_type_of_public_static_property_getter_from_exported_class_is_using_inaccessible_module_0: string;
        Return_type_of_public_property_getter_from_exported_class_is_using_inaccessible_module_0: string;
        Return_type_of_constructor_signature_from_exported_interface_is_using_inaccessible_module_0: string;
        Return_type_of_call_signature_from_exported_interface_is_using_inaccessible_module_0: string;
        Return_type_of_index_signature_from_exported_interface_is_using_inaccessible_module_0: string;
        Return_type_of_public_static_method_from_exported_class_is_using_inaccessible_module_0: string;
        Return_type_of_public_method_from_exported_class_is_using_inaccessible_module_0: string;
        Return_type_of_method_from_exported_interface_is_using_inaccessible_module_0: string;
        Return_type_of_exported_function_is_using_inaccessible_module_0: string;
        new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead: string;
        A_parameter_list_must_follow_a_generic_type_argument_list_expected: string;
        Multiple_constructor_implementations_are_not_allowed: string;
        Unable_to_resolve_external_module_0: string;
        Module_cannot_be_aliased_to_a_non_module_type: string;
        A_class_may_only_extend_another_class: string;
        A_class_may_only_implement_another_class_or_interface: string;
        An_interface_may_only_extend_another_class_or_interface: string;
        Unable_to_resolve_type: string;
        Unable_to_resolve_type_of_0: string;
        Unable_to_resolve_type_parameter_constraint: string;
        Type_parameter_constraint_cannot_be_a_primitive_type: string;
        Supplied_parameters_do_not_match_any_signature_of_call_target: string;
        Supplied_parameters_do_not_match_any_signature_of_call_target_NL_0: string;
        Invalid_new_expression: string;
        Call_signatures_used_in_a_new_expression_must_have_a_void_return_type: string;
        Could_not_select_overload_for_new_expression: string;
        Type_0_does_not_satisfy_the_constraint_1_for_type_parameter_2: string;
        Could_not_select_overload_for_call_expression: string;
        Cannot_invoke_an_expression_whose_type_lacks_a_call_signature: string;
        Calls_to_super_are_only_valid_inside_a_class: string;
        Generic_type_0_requires_1_type_argument_s: string;
        Type_of_array_literal_cannot_be_determined_Best_common_type_could_not_be_found_for_array_elements: string;
        Could_not_find_enclosing_symbol_for_dotted_name_0: string;
        The_property_0_does_not_exist_on_value_of_type_1: string;
        Could_not_find_symbol_0: string;
        get_and_set_accessor_must_have_the_same_type: string;
        this_cannot_be_referenced_in_current_location: string;
        Static_members_cannot_reference_class_type_parameters: string;
        Class_0_is_recursively_referenced_as_a_base_type_of_itself: string;
        Interface_0_is_recursively_referenced_as_a_base_type_of_itself: string;
        super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class: string;
        super_cannot_be_referenced_in_non_derived_classes: string;
        A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties: string;
        Constructors_for_derived_classes_must_contain_a_super_call: string;
        Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors: string;
        _0_1_is_inaccessible: string;
        this_cannot_be_referenced_within_module_bodies: string;
        Invalid_expression_types_not_known_to_support_the_addition_operator: string;
        The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: string;
        The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: string;
        The_type_of_a_unary_arithmetic_operation_operand_must_be_of_type_any_number_or_an_enum_type: string;
        Variable_declarations_of_a_for_statement_cannot_use_a_type_annotation: string;
        Variable_declarations_of_a_for_statement_must_be_of_types_string_or_any: string;
        The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter: string;
        The_left_hand_side_of_an_in_expression_must_be_of_types_any_string_or_number: string;
        The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: string;
        The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: string;
        The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type: string;
        Setters_cannot_return_a_value: string;
        Tried_to_query_type_of_uninitialized_module_0: string;
        Tried_to_set_variable_type_to_uninitialized_module_type_0: string;
        Type_0_does_not_have_type_parameters: string;
        Getters_must_return_a_value: string;
        Getter_and_setter_accessors_do_not_agree_in_visibility: string;
        Invalid_left_hand_side_of_assignment_expression: string;
        Function_declared_a_non_void_return_type_but_has_no_return_expression: string;
        Cannot_resolve_return_type_reference: string;
        Constructors_cannot_have_a_return_type_of_void: string;
        Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2: string;
        All_symbols_within_a_with_block_will_be_resolved_to_any: string;
        Import_declarations_in_an_internal_module_cannot_reference_an_external_module: string;
        Class_0_declares_interface_1_but_does_not_implement_it_NL_2: string;
        Class_0_declares_class_1_as_an_interface_but_does_not_implement_it_NL_2: string;
        The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer: string;
        this_cannot_be_referenced_in_static_initializers_in_a_class_body: string;
        Class_0_cannot_extend_class_1_NL_2: string;
        Interface_0_cannot_extend_class_1_NL_2: string;
        Interface_0_cannot_extend_interface_1_NL_2: string;
        Overload_signature_is_not_compatible_with_function_definition: string;
        Overload_signature_is_not_compatible_with_function_definition_NL_0: string;
        Overload_signatures_must_all_be_public_or_private: string;
        Overload_signatures_must_all_be_exported_or_not_exported: string;
        Overload_signatures_must_all_be_ambient_or_non_ambient: string;
        Overload_signatures_must_all_be_optional_or_required: string;
        Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature: string;
        this_cannot_be_referenced_in_constructor_arguments: string;
        Instance_member_cannot_be_accessed_off_a_class: string;
        Untyped_function_calls_may_not_accept_type_arguments: string;
        Non_generic_functions_may_not_accept_type_arguments: string;
        A_generic_type_may_not_reference_itself_with_a_wrapped_form_of_its_own_type_parameters: string;
        Rest_parameters_must_be_array_types: string;
        Overload_signature_implementation_cannot_use_specialized_type: string;
        Export_assignments_may_only_be_used_at_the_top_level_of_external_modules: string;
        Export_assignments_may_only_be_made_with_variables_functions_classes_interfaces_enums_and_internal_modules: string;
        Only_public_methods_of_the_base_class_are_accessible_via_the_super_keyword: string;
        Numeric_indexer_type_0_must_be_assignable_to_string_indexer_type_1: string;
        Numeric_indexer_type_0_must_be_assignable_to_string_indexer_type_1_NL_2: string;
        All_numerically_named_properties_must_be_assignable_to_numeric_indexer_type_0: string;
        All_numerically_named_properties_must_be_assignable_to_numeric_indexer_type_0_NL_1: string;
        All_named_properties_must_be_assignable_to_string_indexer_type_0: string;
        All_named_properties_must_be_assignable_to_string_indexer_type_0_NL_1: string;
        Generic_type_references_must_include_all_type_arguments: string;
        Default_arguments_are_only_allowed_in_implementation: string;
        Function_expression_declared_a_non_void_return_type_but_has_no_return_expression: string;
        Import_declaration_referencing_identifier_from_internal_module_can_only_be_made_with_variables_functions_classes_interfaces_enums_and_internal_modules: string;
        Could_not_find_symbol_0_in_module_1: string;
        Unable_to_resolve_module_reference_0: string;
        Could_not_find_module_0_in_module_1: string;
        Exported_import_declaration_0_is_assigned_value_with_type_that_has_or_is_using_private_type_1: string;
        Exported_import_declaration_0_is_assigned_value_with_type_that_is_using_inaccessible_module_1: string;
        Exported_import_declaration_0_is_assigned_type_that_has_or_is_using_private_type_1: string;
        Exported_import_declaration_0_is_assigned_type_that_is_using_inaccessible_module_1: string;
        Exported_import_declaration_0_is_assigned_container_that_is_or_is_using_inaccessible_module_1: string;
        Type_name_0_in_extends_clause_does_not_reference_constructor_function_for_1: string;
        Internal_module_reference_0_in_import_declaration_does_not_reference_module_instance_for_1: string;
        Module_0_cannot_merge_with_previous_declaration_of_1_in_a_different_file_2: string;
        Interface_0_cannot_simultaneously_extend_types_1_and_2_NL_3: string;
        Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it: string;
        Ambient_external_module_declaration_cannot_be_reopened: string;
        All_declarations_of_merged_declaration_0_must_be_exported_or_not_exported: string;
        super_cannot_be_referenced_in_constructor_arguments: string;
        Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class: string;
        Ambient_external_module_declaration_must_be_defined_in_global_context: string;
        Ambient_external_module_declaration_cannot_specify_relative_module_name: string;
        Import_declaration_in_an_ambient_external_module_declaration_cannot_reference_external_module_through_relative_external_module_name: string;
        Could_not_find_the_best_common_type_of_types_of_all_return_statement_expressions: string;
        Import_declaration_cannot_refer_to_external_module_reference_when_noResolve_option_is_set: string;
        Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference: string;
        continue_statement_can_only_be_used_within_an_enclosing_iteration_statement: string;
        break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement: string;
        Jump_target_not_found: string;
        Jump_target_cannot_cross_function_boundary: string;
        Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference: string;
        Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference: string;
        Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference: string;
        TypeParameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_public_method_from_exported_class_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_method_from_exported_interface_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_exported_function_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_constructor_signature_from_exported_interface_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_call_signature_from_exported_interface_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_public_static_method_from_exported_class_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_public_method_from_exported_class_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_method_from_exported_interface_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_exported_function_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_exported_class_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_exported_interface_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_exported_class_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_exported_interface_is_using_inaccessible_module_1: string;
        Duplicate_identifier_i_Compiler_uses_i_to_initialize_rest_parameter: string;
        Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters: string;
        Type_of_conditional_0_must_be_identical_to_1_or_2: string;
        Type_of_conditional_0_must_be_identical_to_1_2_or_3: string;
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_an_external_module: string;
        Constraint_of_a_type_parameter_cannot_reference_any_type_parameter_from_the_same_type_parameter_list: string;
        Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor: string;
        Parameter_0_cannot_be_referenced_in_its_initializer: string;
        Duplicate_string_index_signature: string;
        Duplicate_number_index_signature: string;
        All_declarations_of_an_interface_must_have_identical_type_parameters: string;
        Expression_resolves_to_variable_declaration_i_that_compiler_uses_to_initialize_rest_parameter: string;
        Type_0_is_missing_property_1_from_type_2: string;
        Types_of_property_0_of_types_1_and_2_are_incompatible: string;
        Types_of_property_0_of_types_1_and_2_are_incompatible_NL_3: string;
        Property_0_defined_as_private_in_type_1_is_defined_as_public_in_type_2: string;
        Property_0_defined_as_public_in_type_1_is_defined_as_private_in_type_2: string;
        Types_0_and_1_define_property_2_as_private: string;
        Call_signatures_of_types_0_and_1_are_incompatible: string;
        Call_signatures_of_types_0_and_1_are_incompatible_NL_2: string;
        Type_0_requires_a_call_signature_but_type_1_lacks_one: string;
        Construct_signatures_of_types_0_and_1_are_incompatible: string;
        Construct_signatures_of_types_0_and_1_are_incompatible_NL_2: string;
        Type_0_requires_a_construct_signature_but_type_1_lacks_one: string;
        Index_signatures_of_types_0_and_1_are_incompatible: string;
        Index_signatures_of_types_0_and_1_are_incompatible_NL_2: string;
        Call_signature_expects_0_or_fewer_parameters: string;
        Could_not_apply_type_0_to_argument_1_which_is_of_type_2: string;
        Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function: string;
        Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function: string;
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor: string;
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property: string;
        Types_of_static_property_0_of_class_1_and_class_2_are_incompatible: string;
        Types_of_static_property_0_of_class_1_and_class_2_are_incompatible_NL_3: string;
        Type_reference_cannot_refer_to_container_0: string;
        Type_reference_must_refer_to_type: string;
        In_enums_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_the_first_enum_element: string;
        _0_overload_s: string;
        Variable_declaration_cannot_have_the_same_name_as_an_import_declaration: string;
        Signature_expected_0_type_arguments_got_1_instead: string;
        Property_0_defined_as_optional_in_type_1_but_is_required_in_type_2: string;
        Types_0_and_1_originating_in_infinitely_expanding_type_reference_do_not_refer_to_same_named_type: string;
        Types_0_and_1_originating_in_infinitely_expanding_type_reference_have_incompatible_type_arguments: string;
        Types_0_and_1_originating_in_infinitely_expanding_type_reference_have_incompatible_type_arguments_NL_2: string;
        Named_properties_0_of_types_1_and_2_are_not_identical: string;
        Types_of_string_indexer_of_types_0_and_1_are_not_identical: string;
        Types_of_number_indexer_of_types_0_and_1_are_not_identical: string;
        Type_of_number_indexer_in_type_0_is_not_assignable_to_string_indexer_type_in_type_1_NL_2: string;
        Type_of_property_0_in_type_1_is_not_assignable_to_string_indexer_type_in_type_2_NL_3: string;
        Type_of_property_0_in_type_1_is_not_assignable_to_number_indexer_type_in_type_2_NL_3: string;
        Static_property_0_defined_as_private_in_type_1_is_defined_as_public_in_type_2: string;
        Static_property_0_defined_as_public_in_type_1_is_defined_as_private_in_type_2: string;
        Types_0_and_1_define_static_property_2_as_private: string;
        Current_host_does_not_support_0_option: string;
        ECMAScript_target_version_0_not_supported_Specify_a_valid_target_version_1_default_or_2: string;
        Module_code_generation_0_not_supported: string;
        Could_not_find_file_0: string;
        A_file_cannot_have_a_reference_to_itself: string;
        Cannot_resolve_referenced_file_0: string;
        Cannot_find_the_common_subdirectory_path_for_the_input_files: string;
        Emit_Error_0: string;
        Cannot_read_file_0_1: string;
        Unsupported_file_encoding: string;
        Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1: string;
        Unsupported_locale_0: string;
        Execution_Failed_NL: string;
        Invalid_call_to_up: string;
        Invalid_call_to_down: string;
        Base64_value_0_finished_with_a_continuation_bit: string;
        Unknown_option_0: string;
        Expected_0_arguments_to_message_got_1_instead: string;
        Expected_the_message_0_to_have_1_arguments_but_it_had_2: string;
        Could_not_delete_file_0: string;
        Could_not_create_directory_0: string;
        Error_while_executing_file_0: string;
        Cannot_compile_external_modules_unless_the_module_flag_is_provided: string;
        Option_mapRoot_cannot_be_specified_without_specifying_sourcemap_option: string;
        Option_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option: string;
        Options_mapRoot_and_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option: string;
        Option_0_specified_without_1: string;
        codepage_option_not_supported_on_current_platform: string;
        Concatenate_and_emit_output_to_single_file: string;
        Generates_corresponding_0_file: string;
        Specifies_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations: string;
        Specifies_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations: string;
        Watch_input_files: string;
        Redirect_output_structure_to_the_directory: string;
        Do_not_emit_comments_to_output: string;
        Skip_resolution_and_preprocessing: string;
        Specify_ECMAScript_target_version_0_default_or_1: string;
        Specify_module_code_generation_0_or_1: string;
        Print_this_message: string;
        Print_the_compiler_s_version_0: string;
        Allow_use_of_deprecated_0_keyword_when_referencing_an_external_module: string;
        Specify_locale_for_errors_and_messages_For_example_0_or_1: string;
        Syntax_0: string;
        options: string;
        file1: string;
        Examples: string;
        Options: string;
        Insert_command_line_options_and_files_from_a_file: string;
        Version_0: string;
        Use_the_0_flag_to_see_options: string;
        NL_Recompiling_0: string;
        STRING: string;
        KIND: string;
        file2: string;
        VERSION: string;
        LOCATION: string;
        DIRECTORY: string;
        NUMBER: string;
        Specify_the_codepage_to_use_when_opening_source_files: string;
        Additional_locations: string;
        This_version_of_the_Javascript_runtime_does_not_support_the_0_function: string;
        Unknown_rule: string;
        Invalid_line_number_0: string;
        Warn_on_expressions_and_declarations_with_an_implied_any_type: string;
        Variable_0_implicitly_has_an_any_type: string;
        Parameter_0_of_1_implicitly_has_an_any_type: string;
        Parameter_0_of_function_type_implicitly_has_an_any_type: string;
        Member_0_of_object_type_implicitly_has_an_any_type: string;
        new_expression_which_lacks_a_constructor_signature_implicitly_has_an_any_type: string;
        _0_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: string;
        Function_expression_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: string;
        Parameter_0_of_lambda_function_implicitly_has_an_any_type: string;
        Constructor_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: string;
        Lambda_Function_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: string;
        Array_Literal_implicitly_has_an_any_type_from_widening: string;
        _0_which_lacks_get_accessor_and_parameter_type_annotation_on_set_accessor_implicitly_has_an_any_type: string;
        Index_signature_of_object_type_implicitly_has_an_any_type: string;
        Object_literal_s_property_0_implicitly_has_an_any_type_from_widening: string;
    };
}
declare module TypeScript {
    enum DiagnosticCategory {
        Warning = 0,
        Error = 1,
        Message = 2,
        NoPrefix = 3,
    }
}
declare module TypeScript {
    var diagnosticInformationMap: IIndexable<any>;
}
declare module TypeScript {
    class ArrayUtilities {
        static isArray(value: any): boolean;
        static sequenceEquals<T>(array1: T[], array2: T[], equals: (v1: T, v2: T) => boolean): boolean;
        static contains<T>(array: T[], value: T): boolean;
        static groupBy<T>(array: T[], func: (v: T) => string): any;
        static distinct<T>(array: T[], equalsFn?: (a: T, b: T) => boolean): T[];
        static min<T>(array: T[], func: (v: T) => number): number;
        static max<T>(array: T[], func: (v: T) => number): number;
        static last<T>(array: T[]): T;
        static lastOrDefault<T>(array: T[], predicate: (v: T, index: number) => boolean): T;
        static firstOrDefault<T>(array: T[], func: (v: T, index: number) => boolean): T;
        static first<T>(array: T[], func?: (v: T, index: number) => boolean): T;
        static sum<T>(array: T[], func: (v: T) => number): number;
        static select<T, S>(values: T[], func: (v: T) => S): S[];
        static where<T>(values: T[], func: (v: T) => boolean): T[];
        static any<T>(array: T[], func: (v: T) => boolean): boolean;
        static all<T>(array: T[], func: (v: T) => boolean): boolean;
        static binarySearch(array: number[], value: number): number;
        static createArray<T>(length: number, defaultValue: any): T[];
        static grow<T>(array: T[], length: number, defaultValue: T): void;
        static copy<T>(sourceArray: T[], sourceIndex: number, destinationArray: T[], destinationIndex: number, length: number): void;
        static indexOf<T>(array: T[], predicate: (v: T) => boolean): number;
    }
}
declare module TypeScript {
    interface IBitVector {
        valueAt(index: number): boolean;
        setValueAt(index: number, value: boolean): void;
        release(): void;
    }
    module BitVector {
        function getBitVector(allowUndefinedValues: boolean): IBitVector;
    }
}
declare module TypeScript {
    interface IBitMatrix {
        valueAt(x: number, y: number): boolean;
        setValueAt(x: number, y: number, value: boolean): void;
        release(): void;
    }
    module BitMatrix {
        function getBitMatrix(allowUndefinedValues: boolean): IBitMatrix;
    }
}
declare module TypeScript {
    enum Constants {
        Max31BitInteger = 1073741823,
        Min31BitInteger = -1073741824,
    }
}
declare module TypeScript {
    enum AssertionLevel {
        None = 0,
        Normal = 1,
        Aggressive = 2,
        VeryAggressive = 3,
    }
    class Debug {
        private static currentAssertionLevel;
        static shouldAssert(level: AssertionLevel): boolean;
        static assert(expression: any, message?: string, verboseDebugInfo?: () => string): void;
        static fail(message?: string): void;
    }
}
declare module TypeScript {
    var LocalizedDiagnosticMessages: IIndexable<any>;
    class Location {
        private _fileName;
        private _lineMap;
        private _start;
        private _length;
        constructor(fileName: string, lineMap: LineMap, start: number, length: number);
        public fileName(): string;
        public lineMap(): LineMap;
        public line(): number;
        public character(): number;
        public start(): number;
        public length(): number;
        static equals(location1: Location, location2: Location): boolean;
    }
    class Diagnostic extends Location {
        private _diagnosticKey;
        private _arguments;
        private _additionalLocations;
        constructor(fileName: string, lineMap: LineMap, start: number, length: number, diagnosticKey: string, _arguments?: any[], additionalLocations?: Location[]);
        public toJSON(key: any): any;
        public diagnosticKey(): string;
        public arguments(): any[];
        public text(): string;
        public message(): string;
        public additionalLocations(): Location[];
        static equals(diagnostic1: Diagnostic, diagnostic2: Diagnostic): boolean;
        public info(): DiagnosticInfo;
    }
    function newLine(): string;
    function getLocalizedText(diagnosticKey: string, args: any[]): string;
    function getDiagnosticMessage(diagnosticKey: string, args: any[]): string;
}
declare module TypeScript {
    interface DiagnosticInfo {
        category: DiagnosticCategory;
        message: string;
        code: number;
    }
}
declare module TypeScript {
    class Errors {
        static argument(argument: string, message?: string): Error;
        static argumentOutOfRange(argument: string): Error;
        static argumentNull(argument: string): Error;
        static abstract(): Error;
        static notYetImplemented(): Error;
        static invalidOperation(message?: string): Error;
    }
}
declare module TypeScript {
    class Hash {
        private static FNV_BASE;
        private static FNV_PRIME;
        private static computeFnv1aCharArrayHashCode(text, start, len);
        static computeSimple31BitCharArrayHashCode(key: number[], start: number, len: number): number;
        static computeSimple31BitStringHashCode(key: string): number;
        static computeMurmur2StringHashCode(key: string, seed: number): number;
        private static primes;
        static getPrime(min: number): number;
        static expandPrime(oldSize: number): number;
        static combine(value: number, currentHash: number): number;
    }
}
declare module TypeScript.Collections {
    var DefaultHashTableCapacity: number;
    class HashTable<TKey, TValue> {
        private hash;
        private entries;
        private count;
        constructor(capacity: number, hash: (k: TKey) => number);
        public set(key: TKey, value: TValue): void;
        public add(key: TKey, value: TValue): void;
        public containsKey(key: TKey): boolean;
        public get(key: TKey): TValue;
        private computeHashCode(key);
        private addOrSet(key, value, throwOnExistingEntry);
        private findEntry(key, hashCode);
        private addEntry(key, value, hashCode);
        private grow();
    }
    function createHashTable<TKey, TValue>(capacity?: number, hash?: (k: TKey) => number): HashTable<TKey, TValue>;
    function identityHashCode(value: any): number;
}
declare class Enumerator {
    public atEnd(): boolean;
    public moveNext(): boolean;
    public item(): any;
    constructor(o: any);
}
declare module process {
    var argv: string[];
    var platform: string;
    function on(event: string, handler: (arg: any) => void): void;
    module stdout {
        function write(str: string): any;
        function on(event: string, action: () => void): void;
    }
    module stderr {
        function write(str: string): any;
        function on(event: string, action: () => void): void;
    }
    module mainModule {
        var filename: string;
    }
    function exit(exitCode?: number): any;
}
declare var Buffer: new(str: string, encoding?: string) => any;
declare module TypeScript {
    var nodeMakeDirectoryTime: number;
    var nodeCreateBufferTime: number;
    var nodeWriteFileSyncTime: number;
    enum ByteOrderMark {
        None = 0,
        Utf8 = 1,
        Utf16BigEndian = 2,
        Utf16LittleEndian = 3,
    }
    class FileInformation {
        public contents: string;
        public byteOrderMark: ByteOrderMark;
        constructor(contents: string, byteOrderMark: ByteOrderMark);
    }
    interface IEnvironment {
        supportsCodePage(): boolean;
        readFile(path: string, codepage: number): FileInformation;
        writeFile(path: string, contents: string, writeByteOrderMark: boolean): void;
        deleteFile(path: string): void;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        listFiles(path: string, re?: RegExp, options?: {
            recursive?: boolean;
        }): string[];
        arguments: string[];
        standardOut: ITextWriter;
        currentDirectory(): string;
        newLine: string;
    }
    var Environment: IEnvironment;
}
declare module TypeScript {
    interface IIndexable<T> {
        [s: string]: T;
    }
}
declare module TypeScript {
    module IntegerUtilities {
        function integerDivide(numerator: number, denominator: number): number;
        function integerMultiplyLow32Bits(n1: number, n2: number): number;
        function integerMultiplyHigh32Bits(n1: number, n2: number): number;
        function isInteger(text: string): boolean;
        function isHexInteger(text: string): boolean;
    }
}
declare module TypeScript {
    interface Iterator<T> {
        moveNext(): boolean;
        current(): T;
    }
}
declare module TypeScript {
    interface ILineAndCharacter {
        line: number;
        character: number;
    }
}
declare module TypeScript {
    class LineMap {
        private _computeLineStarts;
        private length;
        static empty: LineMap;
        private _lineStarts;
        constructor(_computeLineStarts: () => number[], length: number);
        public toJSON(key: any): {
            lineStarts: number[];
            length: number;
        };
        public equals(other: LineMap): boolean;
        public lineStarts(): number[];
        public lineCount(): number;
        public getPosition(line: number, character: number): number;
        public getLineNumberFromPosition(position: number): number;
        public getLineStartPosition(lineNumber: number): number;
        public fillLineAndCharacterFromPosition(position: number, lineAndCharacter: ILineAndCharacter): void;
        public getLineAndCharacterFromPosition(position: number): LineAndCharacter;
    }
}
declare module TypeScript {
    class LineAndCharacter {
        private _line;
        private _character;
        constructor(line: number, character: number);
        public line(): number;
        public character(): number;
    }
}
declare module TypeScript {
    class MathPrototype {
        static max(a: number, b: number): number;
        static min(a: number, b: number): number;
    }
}
declare module TypeScript.Collections {
    var DefaultStringTableCapacity: number;
    class StringTable {
        private entries;
        private count;
        constructor(capacity: number);
        public addCharArray(key: number[], start: number, len: number): string;
        private findCharArrayEntry(key, start, len, hashCode);
        private addEntry(text, hashCode);
        private grow();
        private static textCharArrayEquals(text, array, start, length);
    }
    var DefaultStringTable: StringTable;
}
declare module TypeScript {
    class StringUtilities {
        static isString(value: any): boolean;
        static fromCharCodeArray(array: number[]): string;
        static endsWith(string: string, value: string): boolean;
        static startsWith(string: string, value: string): boolean;
        static copyTo(source: string, sourceIndex: number, destination: number[], destinationIndex: number, count: number): void;
        static repeat(value: string, count: number): string;
        static stringEquals(val1: string, val2: string): boolean;
    }
}
declare var global: any;
declare module TypeScript {
    class Timer {
        public startTime: number;
        public time: number;
        public start(): void;
        public end(): void;
    }
}
declare module TypeScript {
    enum SyntaxKind {
        None = 0,
        List = 1,
        SeparatedList = 2,
        TriviaList = 3,
        WhitespaceTrivia = 4,
        NewLineTrivia = 5,
        MultiLineCommentTrivia = 6,
        SingleLineCommentTrivia = 7,
        SkippedTokenTrivia = 8,
        ErrorToken = 9,
        EndOfFileToken = 10,
        IdentifierName = 11,
        RegularExpressionLiteral = 12,
        NumericLiteral = 13,
        StringLiteral = 14,
        NoSubstitutionStringTemplateLiteral = 15,
        StringTemplateHead = 16,
        StringTemplateMiddle = 17,
        StringTemplateTail = 18,
        DollarSignOpenBraceToken = 19,
        BreakKeyword = 20,
        CaseKeyword = 21,
        CatchKeyword = 22,
        ContinueKeyword = 23,
        DebuggerKeyword = 24,
        DefaultKeyword = 25,
        DeleteKeyword = 26,
        DoKeyword = 27,
        ElseKeyword = 28,
        FalseKeyword = 29,
        FinallyKeyword = 30,
        ForKeyword = 31,
        FunctionKeyword = 32,
        IfKeyword = 33,
        InKeyword = 34,
        InstanceOfKeyword = 35,
        NewKeyword = 36,
        NullKeyword = 37,
        ReturnKeyword = 38,
        SwitchKeyword = 39,
        ThisKeyword = 40,
        ThrowKeyword = 41,
        TrueKeyword = 42,
        TryKeyword = 43,
        TypeOfKeyword = 44,
        VarKeyword = 45,
        VoidKeyword = 46,
        WhileKeyword = 47,
        WithKeyword = 48,
        ClassKeyword = 49,
        ConstKeyword = 50,
        EnumKeyword = 51,
        ExportKeyword = 52,
        ExtendsKeyword = 53,
        ImportKeyword = 54,
        SuperKeyword = 55,
        ImplementsKeyword = 56,
        InterfaceKeyword = 57,
        LetKeyword = 58,
        PackageKeyword = 59,
        PrivateKeyword = 60,
        ProtectedKeyword = 61,
        PublicKeyword = 62,
        StaticKeyword = 63,
        YieldKeyword = 64,
        AnyKeyword = 65,
        BooleanKeyword = 66,
        ConstructorKeyword = 67,
        DeclareKeyword = 68,
        GetKeyword = 69,
        ModuleKeyword = 70,
        RequireKeyword = 71,
        NumberKeyword = 72,
        SetKeyword = 73,
        StringKeyword = 74,
        OpenBraceToken = 75,
        CloseBraceToken = 76,
        OpenParenToken = 77,
        CloseParenToken = 78,
        OpenBracketToken = 79,
        CloseBracketToken = 80,
        DotToken = 81,
        DotDotDotToken = 82,
        SemicolonToken = 83,
        CommaToken = 84,
        LessThanToken = 85,
        GreaterThanToken = 86,
        LessThanEqualsToken = 87,
        GreaterThanEqualsToken = 88,
        EqualsEqualsToken = 89,
        EqualsGreaterThanToken = 90,
        ExclamationEqualsToken = 91,
        EqualsEqualsEqualsToken = 92,
        ExclamationEqualsEqualsToken = 93,
        PlusToken = 94,
        MinusToken = 95,
        AsteriskToken = 96,
        PercentToken = 97,
        PlusPlusToken = 98,
        MinusMinusToken = 99,
        LessThanLessThanToken = 100,
        GreaterThanGreaterThanToken = 101,
        GreaterThanGreaterThanGreaterThanToken = 102,
        AmpersandToken = 103,
        BarToken = 104,
        CaretToken = 105,
        ExclamationToken = 106,
        TildeToken = 107,
        AmpersandAmpersandToken = 108,
        BarBarToken = 109,
        QuestionToken = 110,
        ColonToken = 111,
        EqualsToken = 112,
        PlusEqualsToken = 113,
        MinusEqualsToken = 114,
        AsteriskEqualsToken = 115,
        PercentEqualsToken = 116,
        LessThanLessThanEqualsToken = 117,
        GreaterThanGreaterThanEqualsToken = 118,
        GreaterThanGreaterThanGreaterThanEqualsToken = 119,
        AmpersandEqualsToken = 120,
        BarEqualsToken = 121,
        CaretEqualsToken = 122,
        SlashToken = 123,
        SlashEqualsToken = 124,
        SourceUnit = 125,
        QualifiedName = 126,
        ObjectType = 127,
        FunctionType = 128,
        ArrayType = 129,
        ConstructorType = 130,
        GenericType = 131,
        TypeQuery = 132,
        InterfaceDeclaration = 133,
        FunctionDeclaration = 134,
        ModuleDeclaration = 135,
        ClassDeclaration = 136,
        EnumDeclaration = 137,
        ImportDeclaration = 138,
        ExportAssignment = 139,
        MemberFunctionDeclaration = 140,
        MemberVariableDeclaration = 141,
        ConstructorDeclaration = 142,
        IndexMemberDeclaration = 143,
        GetAccessor = 144,
        SetAccessor = 145,
        PropertySignature = 146,
        CallSignature = 147,
        ConstructSignature = 148,
        IndexSignature = 149,
        MethodSignature = 150,
        Block = 151,
        IfStatement = 152,
        VariableStatement = 153,
        ExpressionStatement = 154,
        ReturnStatement = 155,
        SwitchStatement = 156,
        BreakStatement = 157,
        ContinueStatement = 158,
        ForStatement = 159,
        ForInStatement = 160,
        EmptyStatement = 161,
        ThrowStatement = 162,
        WhileStatement = 163,
        TryStatement = 164,
        LabeledStatement = 165,
        DoStatement = 166,
        DebuggerStatement = 167,
        WithStatement = 168,
        PlusExpression = 169,
        NegateExpression = 170,
        BitwiseNotExpression = 171,
        LogicalNotExpression = 172,
        PreIncrementExpression = 173,
        PreDecrementExpression = 174,
        DeleteExpression = 175,
        TypeOfExpression = 176,
        VoidExpression = 177,
        CommaExpression = 178,
        AssignmentExpression = 179,
        AddAssignmentExpression = 180,
        SubtractAssignmentExpression = 181,
        MultiplyAssignmentExpression = 182,
        DivideAssignmentExpression = 183,
        ModuloAssignmentExpression = 184,
        AndAssignmentExpression = 185,
        ExclusiveOrAssignmentExpression = 186,
        OrAssignmentExpression = 187,
        LeftShiftAssignmentExpression = 188,
        SignedRightShiftAssignmentExpression = 189,
        UnsignedRightShiftAssignmentExpression = 190,
        ConditionalExpression = 191,
        LogicalOrExpression = 192,
        LogicalAndExpression = 193,
        BitwiseOrExpression = 194,
        BitwiseExclusiveOrExpression = 195,
        BitwiseAndExpression = 196,
        EqualsWithTypeConversionExpression = 197,
        NotEqualsWithTypeConversionExpression = 198,
        EqualsExpression = 199,
        NotEqualsExpression = 200,
        LessThanExpression = 201,
        GreaterThanExpression = 202,
        LessThanOrEqualExpression = 203,
        GreaterThanOrEqualExpression = 204,
        InstanceOfExpression = 205,
        InExpression = 206,
        LeftShiftExpression = 207,
        SignedRightShiftExpression = 208,
        UnsignedRightShiftExpression = 209,
        MultiplyExpression = 210,
        DivideExpression = 211,
        ModuloExpression = 212,
        AddExpression = 213,
        SubtractExpression = 214,
        PostIncrementExpression = 215,
        PostDecrementExpression = 216,
        MemberAccessExpression = 217,
        InvocationExpression = 218,
        ArrayLiteralExpression = 219,
        ObjectLiteralExpression = 220,
        ObjectCreationExpression = 221,
        ParenthesizedExpression = 222,
        ParenthesizedArrowFunctionExpression = 223,
        SimpleArrowFunctionExpression = 224,
        CastExpression = 225,
        ElementAccessExpression = 226,
        FunctionExpression = 227,
        StringTemplateSubstitutionExpression = 228,
        SubstitutionStringTemplate = 229,
        NoSubstitutionStringTemplateInvocationExpression = 230,
        SubstitutionStringTemplateInvocationExpression = 231,
        OmittedExpression = 232,
        VariableDeclaration = 233,
        VariableDeclarator = 234,
        ArgumentList = 235,
        ParameterList = 236,
        TypeArgumentList = 237,
        TypeParameterList = 238,
        ExtendsHeritageClause = 239,
        ImplementsHeritageClause = 240,
        EqualsValueClause = 241,
        CaseSwitchClause = 242,
        DefaultSwitchClause = 243,
        ElseClause = 244,
        CatchClause = 245,
        FinallyClause = 246,
        TypeParameter = 247,
        Constraint = 248,
        SimplePropertyAssignment = 249,
        FunctionPropertyAssignment = 250,
        Parameter = 251,
        EnumElement = 252,
        TypeAnnotation = 253,
        ExternalModuleReference = 254,
        ModuleNameModuleReference = 255,
        Last = 255,
        FirstStandardKeyword = 20,
        LastStandardKeyword = 48,
        FirstFutureReservedKeyword = 49,
        LastFutureReservedKeyword = 55,
        FirstFutureReservedStrictKeyword = 56,
        LastFutureReservedStrictKeyword = 64,
        FirstTypeScriptKeyword = 65,
        LastTypeScriptKeyword = 74,
        FirstKeyword = 20,
        LastKeyword = 74,
        FirstToken = 9,
        LastToken = 124,
        FirstPunctuation = 75,
        LastPunctuation = 124,
        FirstFixedWidth = 20,
        LastFixedWidth = 124,
        FirstTrivia = 4,
        LastTrivia = 8,
    }
}
declare module TypeScript.SyntaxFacts {
    function getTokenKind(text: string): SyntaxKind;
    function getText(kind: SyntaxKind): string;
    function isTokenKind(kind: SyntaxKind): boolean;
    function isAnyKeyword(kind: SyntaxKind): boolean;
    function isStandardKeyword(kind: SyntaxKind): boolean;
    function isFutureReservedKeyword(kind: SyntaxKind): boolean;
    function isFutureReservedStrictKeyword(kind: SyntaxKind): boolean;
    function isAnyPunctuation(kind: SyntaxKind): boolean;
    function isPrefixUnaryExpressionOperatorToken(tokenKind: SyntaxKind): boolean;
    function isBinaryExpressionOperatorToken(tokenKind: SyntaxKind): boolean;
    function getPrefixUnaryExpressionFromOperatorToken(tokenKind: SyntaxKind): SyntaxKind;
    function getPostfixUnaryExpressionFromOperatorToken(tokenKind: SyntaxKind): SyntaxKind;
    function getBinaryExpressionFromOperatorToken(tokenKind: SyntaxKind): SyntaxKind;
    function getOperatorTokenFromBinaryExpression(tokenKind: SyntaxKind): SyntaxKind;
    function isAnyDivideToken(kind: SyntaxKind): boolean;
    function isAnyDivideOrRegularExpressionToken(kind: SyntaxKind): boolean;
}
declare var argumentChecks: boolean;
declare var forPrettyPrinter: boolean;
interface ITypeDefinition {
    name: string;
    baseType: string;
    interfaces?: string[];
    children: IMemberDefinition[];
    isTypeScriptSpecific: boolean;
}
interface IMemberDefinition {
    name: string;
    type?: string;
    isToken?: boolean;
    isList?: boolean;
    isSeparatedList?: boolean;
    requiresAtLeastOneItem?: boolean;
    isOptional?: boolean;
    tokenKinds?: string[];
    isTypeScriptSpecific: boolean;
    elementType?: string;
}
declare var interfaces: TypeScript.IIndexable<any>;
declare var definitions: ITypeDefinition[];
declare function getStringWithoutSuffix(definition: string): string;
declare function getNameWithoutSuffix(definition: ITypeDefinition): string;
declare function getType(child: IMemberDefinition): string;
declare var hasKind: boolean;
declare function pascalCase(value: string): string;
declare function camelCase(value: string): string;
declare function getSafeName(child: IMemberDefinition): string;
declare function getPropertyAccess(child: IMemberDefinition): string;
declare function generateProperties(definition: ITypeDefinition): string;
declare function generateNullChecks(definition: ITypeDefinition): string;
declare function generateIfKindCheck(child: IMemberDefinition, tokenKinds: string[], indent: string): string;
declare function generateSwitchCase(tokenKind: string, indent: string): string;
declare function generateBreakStatement(indent: string): string;
declare function generateSwitchCases(tokenKinds: string[], indent: string): string;
declare function generateDefaultCase(child: IMemberDefinition, indent: string): string;
declare function generateSwitchKindCheck(child: IMemberDefinition, tokenKinds: string[], indent: string): string;
declare function tokenKinds(child: IMemberDefinition): string[];
declare function generateKindCheck(child: IMemberDefinition): string;
declare function generateKindChecks(definition: ITypeDefinition): string;
declare function generateArgumentChecks(definition: ITypeDefinition): string;
declare function generateConstructor(definition: ITypeDefinition): string;
declare function isOptional(child: IMemberDefinition): boolean;
declare function generateFactory1Method(definition: ITypeDefinition): string;
declare function isKeywordOrPunctuation(kind: string): boolean;
declare function isDefaultConstructable(definition: ITypeDefinition): boolean;
declare function isMandatory(child: IMemberDefinition): boolean;
declare function generateFactory2Method(definition: ITypeDefinition): string;
declare function generateFactoryMethod(definition: ITypeDefinition): string;
declare function generateAcceptMethods(definition: ITypeDefinition): string;
declare function generateIsMethod(definition: ITypeDefinition): string;
declare function generateKindMethod(definition: ITypeDefinition): string;
declare function generateSlotMethods(definition: ITypeDefinition): string;
declare function generateFirstTokenMethod(definition: ITypeDefinition): string;
declare function generateLastTokenMethod(definition: ITypeDefinition): string;
declare function generateInsertChildrenIntoMethod(definition: ITypeDefinition): string;
declare function baseType(definition: ITypeDefinition): ITypeDefinition;
declare function memberDefinitionType(child: IMemberDefinition): ITypeDefinition;
declare function derivesFrom(def1: ITypeDefinition, def2: ITypeDefinition): boolean;
declare function contains(definition: ITypeDefinition, child: IMemberDefinition): boolean;
declare function generateAccessors(definition: ITypeDefinition): string;
declare function generateWithMethod(definition: ITypeDefinition, child: IMemberDefinition): string;
declare function generateWithMethods(definition: ITypeDefinition): string;
declare function generateTriviaMethods(definition: ITypeDefinition): string;
declare function generateUpdateMethod(definition: ITypeDefinition): string;
declare function generateIsTypeScriptSpecificMethod(definition: ITypeDefinition): string;
declare function couldBeRegularExpressionToken(child: IMemberDefinition): boolean;
declare function generateStructuralEqualsMethod(definition: ITypeDefinition): string;
declare function generateNode(definition: ITypeDefinition): string;
declare function generateNodes(): string;
declare function isInterface(name: string): boolean;
declare function isNodeOrToken(child: IMemberDefinition): boolean;
declare function generateRewriter(): string;
declare function generateToken(isFixedWidth: boolean, leading: boolean, trailing: boolean): string;
declare function generateTokens(): string;
declare function generateWalker(): string;
declare function firstEnumName(e: any, value: number): any;
declare function generateKeywordCondition(keywords: {
    text: string;
    kind: TypeScript.SyntaxKind;
}[], currentCharacter: number, indent: string): string;
declare function generateScannerUtilities(): string;
declare function generateVisitor(): string;
declare function generateFactory(): string;
declare var syntaxNodes: string;
declare var rewriter: string;
declare var tokens: string;
declare var walker: string;
declare var scannerUtilities: string;
declare var visitor: string;
declare var factory: string;
