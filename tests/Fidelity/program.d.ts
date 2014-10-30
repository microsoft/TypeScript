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
        Trailing_comma_not_allowed: string;
        AsteriskSlash_expected: string;
        public_or_private_modifier_must_precede_static: string;
        Unexpected_token: string;
        Catch_clause_parameter_cannot_have_a_type_annotation: string;
        A_rest_parameter_must_be_last_in_a_parameter_list: string;
        Parameter_cannot_have_question_mark_and_initializer: string;
        A_required_parameter_cannot_follow_an_optional_parameter: string;
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
        A_function_implementation_cannot_be_declared_in_an_ambient_context: string;
        A_declare_modifier_cannot_be_used_in_an_already_ambient_context: string;
        Initializers_are_not_allowed_in_ambient_contexts: string;
        _0_modifier_cannot_appear_on_a_module_element: string;
        A_declare_modifier_cannot_be_used_with_an_interface_declaration: string;
        A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file: string;
        A_rest_parameter_cannot_be_optional: string;
        A_rest_parameter_cannot_have_an_initializer: string;
        set_accessor_must_have_exactly_one_parameter: string;
        set_accessor_parameter_cannot_be_optional: string;
        set_accessor_parameter_cannot_have_an_initializer: string;
        set_accessor_cannot_have_rest_parameter: string;
        get_accessor_cannot_have_parameters: string;
        Modifiers_cannot_appear_here: string;
        Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher: string;
        Enum_member_must_have_initializer: string;
        Export_assignment_cannot_be_used_in_internal_modules: string;
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
        A_declare_modifier_cannot_be_used_with_an_import_declaration: string;
        Invalid_reference_directive_syntax: string;
        Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher: string;
        Accessors_are_not_allowed_in_ambient_contexts: string;
        _0_modifier_cannot_appear_on_a_constructor_declaration: string;
        _0_modifier_cannot_appear_on_a_parameter: string;
        Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement: string;
        Type_parameters_cannot_appear_on_a_constructor_declaration: string;
        Type_annotation_cannot_appear_on_a_constructor_declaration: string;
        Type_parameters_cannot_appear_on_an_accessor: string;
        Type_annotation_cannot_appear_on_a_set_accessor: string;
        Index_signature_must_have_exactly_one_parameter: string;
        _0_list_cannot_be_empty: string;
        variable_declaration: string;
        type_argument: string;
        Invalid_use_of_0_in_strict_mode: string;
        with_statements_are_not_allowed_in_strict_mode: string;
        delete_cannot_be_called_on_an_identifier_in_strict_mode: string;
        Invalid_left_hand_side_in_for_in_statement: string;
        continue_statement_can_only_be_used_within_an_enclosing_iteration_statement: string;
        break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement: string;
        Jump_target_not_found: string;
        Jump_target_cannot_cross_function_boundary: string;
        return_statement_must_be_contained_within_a_function_body: string;
        Expression_expected: string;
        Type_expected: string;
        Duplicate_identifier_0: string;
        The_name_0_does_not_exist_in_the_current_scope: string;
        The_name_0_does_not_refer_to_a_value: string;
        super_can_only_be_used_inside_a_class_instance_method: string;
        The_left_hand_side_of_an_assignment_expression_must_be_a_variable_property_or_indexer: string;
        Value_of_type_0_is_not_callable_Did_you_mean_to_include_new: string;
        Value_of_type_0_is_not_callable: string;
        Value_of_type_0_is_not_newable: string;
        An_index_expression_argument_must_be_string_number_or_any: string;
        Operator_0_cannot_be_applied_to_types_1_and_2: string;
        Type_0_is_not_assignable_to_type_1: string;
        Type_0_is_not_assignable_to_type_1_NL_2: string;
        Expected_var_class_interface_or_module: string;
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
        Cannot_find_external_module_0: string;
        Module_cannot_be_aliased_to_a_non_module_type: string;
        A_class_may_only_extend_another_class: string;
        A_class_may_only_implement_another_class_or_interface: string;
        An_interface_may_only_extend_a_class_or_another_interface: string;
        Unable_to_resolve_type: string;
        Unable_to_resolve_type_of_0: string;
        Unable_to_resolve_type_parameter_constraint: string;
        Type_parameter_constraint_cannot_be_a_primitive_type: string;
        Supplied_parameters_do_not_match_any_signature_of_call_target: string;
        Supplied_parameters_do_not_match_any_signature_of_call_target_NL_0: string;
        Cannot_use_new_with_an_expression_whose_type_lacks_a_signature: string;
        Only_a_void_function_can_be_called_with_the_new_keyword: string;
        Could_not_select_overload_for_new_expression: string;
        Type_0_does_not_satisfy_the_constraint_1: string;
        Could_not_select_overload_for_call_expression: string;
        Cannot_invoke_an_expression_whose_type_lacks_a_call_signature: string;
        Calls_to_super_are_only_valid_inside_a_class: string;
        Generic_type_0_requires_1_type_argument_s: string;
        Type_of_array_literal_cannot_be_determined_Best_common_type_could_not_be_found_for_array_elements: string;
        Could_not_find_enclosing_symbol_for_dotted_name_0: string;
        Property_0_does_not_exist_on_value_of_type_1: string;
        Cannot_find_name_0: string;
        get_and_set_accessor_must_have_the_same_type: string;
        this_cannot_be_referenced_in_current_location: string;
        Static_members_cannot_reference_class_type_parameters: string;
        Type_0_recursively_references_itself_as_a_base_type: string;
        super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class: string;
        super_can_only_be_referenced_in_a_derived_class: string;
        A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties: string;
        Constructors_for_derived_classes_must_contain_a_super_call: string;
        Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors: string;
        _0_1_is_inaccessible: string;
        this_cannot_be_referenced_in_a_module_body: string;
        Invalid_expression_types_not_known_to_support_the_addition_operator: string;
        The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: string;
        The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: string;
        An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type: string;
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
        Type_0_is_not_generic: string;
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
        this_cannot_be_referenced_in_a_static_property_initializer: string;
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
        A_rest_parameter_must_be_of_an_array_type: string;
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
        A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation: string;
        Function_expression_declared_a_non_void_return_type_but_has_no_return_expression: string;
        Import_declaration_referencing_identifier_from_internal_module_can_only_be_made_with_variables_functions_classes_interfaces_enums_and_internal_modules: string;
        Module_0_has_no_exported_member_1: string;
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
        No_best_common_type_exists_among_return_expressions: string;
        Import_declaration_cannot_refer_to_external_module_reference_when_noResolve_option_is_set: string;
        Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference: string;
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
        No_best_common_type_exists_between_0_and_1: string;
        No_best_common_type_exists_between_0_1_and_2: string;
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_an_external_module: string;
        Constraint_of_a_type_parameter_cannot_reference_any_type_parameter_from_the_same_type_parameter_list: string;
        Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor: string;
        Parameter_0_cannot_be_referenced_in_its_initializer: string;
        Duplicate_string_index_signature: string;
        Duplicate_number_index_signature: string;
        All_declarations_of_an_interface_must_have_identical_type_parameters: string;
        Expression_resolves_to_variable_declaration_i_that_compiler_uses_to_initialize_rest_parameter: string;
        Neither_type_0_nor_type_1_is_assignable_to_the_other: string;
        Neither_type_0_nor_type_1_is_assignable_to_the_other_NL_2: string;
        Duplicate_function_implementation: string;
        Function_implementation_expected: string;
        Function_overload_name_must_be_0: string;
        Constructor_implementation_expected: string;
        Class_name_cannot_be_0: string;
        Interface_name_cannot_be_0: string;
        Enum_name_cannot_be_0: string;
        A_module_cannot_have_multiple_export_assignments: string;
        Export_assignment_not_allowed_in_module_with_exported_element: string;
        A_parameter_property_is_only_allowed_in_a_constructor_implementation: string;
        Function_overload_must_be_static: string;
        Function_overload_must_not_be_static: string;
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
        Argument_for_0_option_must_be_1_or_2: string;
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
        Unknown_compiler_option_0: string;
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
        static sequenceEquals<T>(array1: T[], array2: T[], equals: (v1: T, v2: T) => boolean): boolean;
        static contains<T>(array: T[], value: T): boolean;
        static distinct<T>(array: T[], equalsFn?: (a: T, b: T) => boolean): T[];
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
        static combine(value: number, currentHash: number): number;
    }
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
    interface IFileWatcher {
        close(): void;
    }
    interface IEnvironment {
        supportsCodePage(): boolean;
        readFile(path: string, codepage: number): FileInformation;
        writeFile(path: string, contents: string, writeByteOrderMark: boolean): void;
        deleteFile(path: string): void;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        directoryName(path: string): string;
        createDirectory(path: string): void;
        absolutePath(path: string): string;
        listFiles(path: string, re?: RegExp, options?: {
            recursive?: boolean;
        }): string[];
        arguments: string[];
        standardOut: ITextWriter;
        standardError: ITextWriter;
        executingFilePath(): string;
        currentDirectory(): string;
        newLine: string;
        watchFile(fileName: string, callback: (x: string) => void): IFileWatcher;
        quit(exitCode?: number): void;
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
    class StringUtilities {
        static isString(value: any): boolean;
        static endsWith(string: string, value: string): boolean;
        static startsWith(string: string, value: string): boolean;
        static repeat(value: string, count: number): string;
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
    enum CharacterCodes {
        nullCharacter = 0,
        maxAsciiCharacter = 127,
        lineFeed = 10,
        carriageReturn = 13,
        lineSeparator = 8232,
        paragraphSeparator = 8233,
        nextLine = 133,
        space = 32,
        nonBreakingSpace = 160,
        enQuad = 8192,
        emQuad = 8193,
        enSpace = 8194,
        emSpace = 8195,
        threePerEmSpace = 8196,
        fourPerEmSpace = 8197,
        sixPerEmSpace = 8198,
        figureSpace = 8199,
        punctuationSpace = 8200,
        thinSpace = 8201,
        hairSpace = 8202,
        zeroWidthSpace = 8203,
        narrowNoBreakSpace = 8239,
        ideographicSpace = 12288,
        _ = 95,
        $ = 36,
        _0 = 48,
        _1 = 49,
        _2 = 50,
        _3 = 51,
        _4 = 52,
        _5 = 53,
        _6 = 54,
        _7 = 55,
        _8 = 56,
        _9 = 57,
        a = 97,
        b = 98,
        c = 99,
        d = 100,
        e = 101,
        f = 102,
        g = 103,
        h = 104,
        i = 105,
        j = 106,
        k = 107,
        l = 108,
        m = 109,
        n = 110,
        o = 111,
        p = 112,
        q = 113,
        r = 114,
        s = 115,
        t = 116,
        u = 117,
        v = 118,
        w = 119,
        x = 120,
        y = 121,
        z = 122,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        ampersand = 38,
        asterisk = 42,
        at = 64,
        backslash = 92,
        bar = 124,
        caret = 94,
        closeBrace = 125,
        closeBracket = 93,
        closeParen = 41,
        colon = 58,
        comma = 44,
        dot = 46,
        doubleQuote = 34,
        equals = 61,
        exclamation = 33,
        greaterThan = 62,
        lessThan = 60,
        minus = 45,
        openBrace = 123,
        openBracket = 91,
        openParen = 40,
        percent = 37,
        plus = 43,
        question = 63,
        semicolon = 59,
        singleQuote = 39,
        slash = 47,
        tilde = 126,
        backspace = 8,
        formFeed = 12,
        byteOrderMark = 65279,
        tab = 9,
        verticalTab = 11,
    }
}
declare module TypeScript {
    interface IScriptSnapshot {
        getText(start: number, end: number): string;
        getLength(): number;
        getLineStartPositions(): number[];
        getTextChangeRangeSinceVersion(scriptVersion: number): TextChangeRange;
    }
    module ScriptSnapshot {
        function fromString(text: string): IScriptSnapshot;
    }
}
declare module TypeScript {
    interface ISimpleText {
        length(): number;
        substr(start: number, length: number): string;
        charCodeAt(index: number): number;
        lineMap(): LineMap;
    }
}
declare module TypeScript {
    module LineMap1 {
        function fromSimpleText(text: ISimpleText): LineMap;
        function fromScriptSnapshot(scriptSnapshot: IScriptSnapshot): LineMap;
        function fromString(text: string): LineMap;
    }
}
declare module TypeScript.SimpleText {
    function fromString(value: string): ISimpleText;
    function fromScriptSnapshot(scriptSnapshot: IScriptSnapshot): ISimpleText;
}
declare module TypeScript.TextUtilities {
    interface ICharacterSequence {
        charCodeAt(index: number): number;
        length: number;
    }
    function parseLineStarts(text: ICharacterSequence): number[];
    function getLengthOfLineBreakSlow(text: ICharacterSequence, index: number, c: number): number;
    function getLengthOfLineBreak(text: ICharacterSequence, index: number): number;
    function isAnyLineBreakCharacter(c: number): boolean;
}
declare module TypeScript {
    interface ISpan {
        start(): number;
        end(): number;
    }
    class TextSpan implements ISpan {
        private _start;
        private _length;
        constructor(start: number, length: number);
        public start(): number;
        public length(): number;
        public end(): number;
        public isEmpty(): boolean;
        public containsPosition(position: number): boolean;
        public containsTextSpan(span: TextSpan): boolean;
        public overlapsWith(span: TextSpan): boolean;
        public overlap(span: TextSpan): TextSpan;
        public intersectsWithTextSpan(span: TextSpan): boolean;
        public intersectsWith(start: number, length: number): boolean;
        public intersectsWithPosition(position: number): boolean;
        public intersection(span: TextSpan): TextSpan;
        static fromBounds(start: number, end: number): TextSpan;
    }
}
declare module TypeScript {
    class TextChangeRange {
        static unchanged: TextChangeRange;
        private _span;
        private _newLength;
        constructor(span: TextSpan, newLength: number);
        public span(): TextSpan;
        public newLength(): number;
        public newSpan(): TextSpan;
        public isUnchanged(): boolean;
        static collapseChangesAcrossMultipleVersions(changes: TextChangeRange[]): TextChangeRange;
    }
}
declare module TypeScript {
    module CharacterInfo {
        function isDecimalDigit(c: number): boolean;
        function isOctalDigit(c: number): boolean;
        function isHexDigit(c: number): boolean;
        function hexValue(c: number): number;
        function isWhitespace(ch: number): boolean;
        function isLineTerminator(ch: number): boolean;
    }
}
declare module TypeScript {
    enum SyntaxConstants {
        None = 0,
        NodeDataComputed = 1,
        NodeIncrementallyUnusableMask = 2,
        NodeParsedInStrictModeMask = 4,
        NodeFullWidthShift = 3,
    }
}
declare module TypeScript {
    class FormattingOptions {
        public useTabs: boolean;
        public spacesPerTab: number;
        public indentSpaces: number;
        public newLineCharacter: string;
        constructor(useTabs: boolean, spacesPerTab: number, indentSpaces: number, newLineCharacter: string);
        static defaultOptions: FormattingOptions;
    }
}
declare module TypeScript {
    enum LanguageVersion {
        EcmaScript3 = 0,
        EcmaScript5 = 1,
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
        BreakKeyword = 15,
        CaseKeyword = 16,
        CatchKeyword = 17,
        ContinueKeyword = 18,
        DebuggerKeyword = 19,
        DefaultKeyword = 20,
        DeleteKeyword = 21,
        DoKeyword = 22,
        ElseKeyword = 23,
        FalseKeyword = 24,
        FinallyKeyword = 25,
        ForKeyword = 26,
        FunctionKeyword = 27,
        IfKeyword = 28,
        InKeyword = 29,
        InstanceOfKeyword = 30,
        NewKeyword = 31,
        NullKeyword = 32,
        ReturnKeyword = 33,
        SwitchKeyword = 34,
        ThisKeyword = 35,
        ThrowKeyword = 36,
        TrueKeyword = 37,
        TryKeyword = 38,
        TypeOfKeyword = 39,
        VarKeyword = 40,
        VoidKeyword = 41,
        WhileKeyword = 42,
        WithKeyword = 43,
        ClassKeyword = 44,
        ConstKeyword = 45,
        EnumKeyword = 46,
        ExportKeyword = 47,
        ExtendsKeyword = 48,
        ImportKeyword = 49,
        SuperKeyword = 50,
        ImplementsKeyword = 51,
        InterfaceKeyword = 52,
        LetKeyword = 53,
        PackageKeyword = 54,
        PrivateKeyword = 55,
        ProtectedKeyword = 56,
        PublicKeyword = 57,
        StaticKeyword = 58,
        YieldKeyword = 59,
        AnyKeyword = 60,
        BooleanKeyword = 61,
        ConstructorKeyword = 62,
        DeclareKeyword = 63,
        GetKeyword = 64,
        ModuleKeyword = 65,
        RequireKeyword = 66,
        NumberKeyword = 67,
        SetKeyword = 68,
        StringKeyword = 69,
        OpenBraceToken = 70,
        CloseBraceToken = 71,
        OpenParenToken = 72,
        CloseParenToken = 73,
        OpenBracketToken = 74,
        CloseBracketToken = 75,
        DotToken = 76,
        DotDotDotToken = 77,
        SemicolonToken = 78,
        CommaToken = 79,
        LessThanToken = 80,
        GreaterThanToken = 81,
        LessThanEqualsToken = 82,
        GreaterThanEqualsToken = 83,
        EqualsEqualsToken = 84,
        EqualsGreaterThanToken = 85,
        ExclamationEqualsToken = 86,
        EqualsEqualsEqualsToken = 87,
        ExclamationEqualsEqualsToken = 88,
        PlusToken = 89,
        MinusToken = 90,
        AsteriskToken = 91,
        PercentToken = 92,
        PlusPlusToken = 93,
        MinusMinusToken = 94,
        LessThanLessThanToken = 95,
        GreaterThanGreaterThanToken = 96,
        GreaterThanGreaterThanGreaterThanToken = 97,
        AmpersandToken = 98,
        BarToken = 99,
        CaretToken = 100,
        ExclamationToken = 101,
        TildeToken = 102,
        AmpersandAmpersandToken = 103,
        BarBarToken = 104,
        QuestionToken = 105,
        ColonToken = 106,
        EqualsToken = 107,
        PlusEqualsToken = 108,
        MinusEqualsToken = 109,
        AsteriskEqualsToken = 110,
        PercentEqualsToken = 111,
        LessThanLessThanEqualsToken = 112,
        GreaterThanGreaterThanEqualsToken = 113,
        GreaterThanGreaterThanGreaterThanEqualsToken = 114,
        AmpersandEqualsToken = 115,
        BarEqualsToken = 116,
        CaretEqualsToken = 117,
        SlashToken = 118,
        SlashEqualsToken = 119,
        SourceUnit = 120,
        QualifiedName = 121,
        ObjectType = 122,
        FunctionType = 123,
        ArrayType = 124,
        ConstructorType = 125,
        GenericType = 126,
        TypeQuery = 127,
        TupleType = 128,
        InterfaceDeclaration = 129,
        FunctionDeclaration = 130,
        ModuleDeclaration = 131,
        ClassDeclaration = 132,
        EnumDeclaration = 133,
        ImportDeclaration = 134,
        ExportAssignment = 135,
        MemberFunctionDeclaration = 136,
        MemberVariableDeclaration = 137,
        ConstructorDeclaration = 138,
        IndexMemberDeclaration = 139,
        GetAccessor = 140,
        SetAccessor = 141,
        PropertySignature = 142,
        CallSignature = 143,
        ConstructSignature = 144,
        IndexSignature = 145,
        MethodSignature = 146,
        Block = 147,
        IfStatement = 148,
        VariableStatement = 149,
        ExpressionStatement = 150,
        ReturnStatement = 151,
        SwitchStatement = 152,
        BreakStatement = 153,
        ContinueStatement = 154,
        ForStatement = 155,
        ForInStatement = 156,
        EmptyStatement = 157,
        ThrowStatement = 158,
        WhileStatement = 159,
        TryStatement = 160,
        LabeledStatement = 161,
        DoStatement = 162,
        DebuggerStatement = 163,
        WithStatement = 164,
        PlusExpression = 165,
        NegateExpression = 166,
        BitwiseNotExpression = 167,
        LogicalNotExpression = 168,
        PreIncrementExpression = 169,
        PreDecrementExpression = 170,
        DeleteExpression = 171,
        TypeOfExpression = 172,
        VoidExpression = 173,
        CommaExpression = 174,
        AssignmentExpression = 175,
        AddAssignmentExpression = 176,
        SubtractAssignmentExpression = 177,
        MultiplyAssignmentExpression = 178,
        DivideAssignmentExpression = 179,
        ModuloAssignmentExpression = 180,
        AndAssignmentExpression = 181,
        ExclusiveOrAssignmentExpression = 182,
        OrAssignmentExpression = 183,
        LeftShiftAssignmentExpression = 184,
        SignedRightShiftAssignmentExpression = 185,
        UnsignedRightShiftAssignmentExpression = 186,
        ConditionalExpression = 187,
        LogicalOrExpression = 188,
        LogicalAndExpression = 189,
        BitwiseOrExpression = 190,
        BitwiseExclusiveOrExpression = 191,
        BitwiseAndExpression = 192,
        EqualsWithTypeConversionExpression = 193,
        NotEqualsWithTypeConversionExpression = 194,
        EqualsExpression = 195,
        NotEqualsExpression = 196,
        LessThanExpression = 197,
        GreaterThanExpression = 198,
        LessThanOrEqualExpression = 199,
        GreaterThanOrEqualExpression = 200,
        InstanceOfExpression = 201,
        InExpression = 202,
        LeftShiftExpression = 203,
        SignedRightShiftExpression = 204,
        UnsignedRightShiftExpression = 205,
        MultiplyExpression = 206,
        DivideExpression = 207,
        ModuloExpression = 208,
        AddExpression = 209,
        SubtractExpression = 210,
        PostIncrementExpression = 211,
        PostDecrementExpression = 212,
        MemberAccessExpression = 213,
        InvocationExpression = 214,
        ArrayLiteralExpression = 215,
        ObjectLiteralExpression = 216,
        ObjectCreationExpression = 217,
        ParenthesizedExpression = 218,
        ParenthesizedArrowFunctionExpression = 219,
        SimpleArrowFunctionExpression = 220,
        CastExpression = 221,
        ElementAccessExpression = 222,
        FunctionExpression = 223,
        OmittedExpression = 224,
        VariableDeclaration = 225,
        VariableDeclarator = 226,
        ArgumentList = 227,
        ParameterList = 228,
        TypeArgumentList = 229,
        TypeParameterList = 230,
        ExtendsHeritageClause = 231,
        ImplementsHeritageClause = 232,
        EqualsValueClause = 233,
        CaseSwitchClause = 234,
        DefaultSwitchClause = 235,
        ElseClause = 236,
        CatchClause = 237,
        FinallyClause = 238,
        TypeParameter = 239,
        Constraint = 240,
        SimplePropertyAssignment = 241,
        FunctionPropertyAssignment = 242,
        Parameter = 243,
        EnumElement = 244,
        TypeAnnotation = 245,
        ExternalModuleReference = 246,
        ModuleNameModuleReference = 247,
        FirstStandardKeyword = 15,
        LastStandardKeyword = 43,
        FirstFutureReservedKeyword = 44,
        LastFutureReservedKeyword = 50,
        FirstFutureReservedStrictKeyword = 51,
        LastFutureReservedStrictKeyword = 59,
        FirstTypeScriptKeyword = 60,
        LastTypeScriptKeyword = 69,
        FirstKeyword = 15,
        LastKeyword = 69,
        FirstToken = 9,
        LastToken = 119,
        FirstPunctuation = 70,
        LastPunctuation = 119,
        FirstFixedWidth = 15,
        LastFixedWidth = 119,
        FirstTrivia = 4,
        LastTrivia = 8,
        FirstNode = 120,
        LastNode = 247,
    }
}
declare module TypeScript.SyntaxFacts {
    function getTokenKind(text: string): SyntaxKind;
    function getText(kind: SyntaxKind): string;
    function isAnyKeyword(kind: SyntaxKind): boolean;
    function isAnyPunctuation(kind: SyntaxKind): boolean;
    function isPrefixUnaryExpressionOperatorToken(tokenKind: SyntaxKind): boolean;
    function isBinaryExpressionOperatorToken(tokenKind: SyntaxKind): boolean;
    function getPrefixUnaryExpressionFromOperatorToken(tokenKind: SyntaxKind): SyntaxKind;
    function getPostfixUnaryExpressionFromOperatorToken(tokenKind: SyntaxKind): SyntaxKind;
    function getBinaryExpressionFromOperatorToken(tokenKind: SyntaxKind): SyntaxKind;
    function getOperatorTokenFromBinaryExpression(tokenKind: SyntaxKind): SyntaxKind;
    function isAssignmentOperatorToken(tokenKind: SyntaxKind): boolean;
    function isType(kind: SyntaxKind): boolean;
}
declare module TypeScript.Scanner {
    function isContextualToken(token: ISyntaxToken): boolean;
    interface DiagnosticCallback {
        (position: number, width: number, key: string, arguments: any[]): void;
    }
    interface IScanner {
        setIndex(index: number): void;
        scan(allowContextualToken: boolean): ISyntaxToken;
    }
    function createScanner(languageVersion: LanguageVersion, text: ISimpleText, reportDiagnostic: DiagnosticCallback): IScanner;
    function isValidIdentifier(text: ISimpleText, languageVersion: LanguageVersion): boolean;
    interface IScannerParserSource extends Parser.IParserSource {
        absolutePosition(): number;
        resetToPosition(absolutePosition: number): void;
    }
    function createParserSource(fileName: string, text: ISimpleText, languageVersion: LanguageVersion): IScannerParserSource;
}
declare module TypeScript {
    class ScannerUtilities {
        static identifierKind(str: string, start: number, length: number): SyntaxKind;
    }
}
declare module TypeScript {
    interface ISlidingWindowSource {
        (argument: any): any;
    }
    class SlidingWindow {
        private fetchNextItem;
        public window: any[];
        private defaultValue;
        private sourceLength;
        public windowCount: number;
        public windowAbsoluteStartIndex: number;
        public currentRelativeItemIndex: number;
        private _pinCount;
        private firstPinnedAbsoluteIndex;
        constructor(fetchNextItem: ISlidingWindowSource, window: any[], defaultValue: any, sourceLength?: number);
        private addMoreItemsToWindow(argument);
        private tryShiftOrGrowWindow();
        public absoluteIndex(): number;
        public isAtEndOfSource(): boolean;
        public getAndPinAbsoluteIndex(): number;
        public releaseAndUnpinAbsoluteIndex(absoluteIndex: number): void;
        public rewindToPinnedIndex(absoluteIndex: number): void;
        public currentItem(argument: any): any;
        public peekItemN(n: number): any;
        public moveToNextItem(): void;
        public disgardAllItemsFromCurrentIndexOnwards(): void;
    }
}
declare module TypeScript.Syntax {
    var _nextSyntaxID: number;
    function childIndex(parent: ISyntaxElement, child: ISyntaxElement): number;
    function nodeHasSkippedOrMissingTokens(node: ISyntaxNode): boolean;
    function isUnterminatedStringLiteral(token: ISyntaxToken): boolean;
    function isUnterminatedMultilineCommentTrivia(trivia: ISyntaxTrivia): boolean;
    function isEntirelyInsideCommentTrivia(trivia: ISyntaxTrivia, fullStart: number, position: number): boolean;
    function isEntirelyInsideComment(sourceUnit: SourceUnitSyntax, position: number): boolean;
    function isEntirelyInStringOrRegularExpressionLiteral(sourceUnit: SourceUnitSyntax, position: number): boolean;
    function findSkippedTokenOnLeft(positionedToken: ISyntaxToken, position: number): ISyntaxToken;
    function getAncestorOfKind(positionedToken: ISyntaxElement, kind: SyntaxKind): ISyntaxElement;
    function hasAncestorOfKind(positionedToken: ISyntaxElement, kind: SyntaxKind): boolean;
    function isIntegerLiteral(expression: IExpressionSyntax): boolean;
    function containingNode(element: ISyntaxElement): ISyntaxNode;
    function findTokenOnLeft(element: ISyntaxElement, position: number, includeSkippedTokens?: boolean): ISyntaxToken;
    function findCompleteTokenOnLeft(element: ISyntaxElement, position: number, includeSkippedTokens?: boolean): ISyntaxToken;
    function firstTokenInLineContainingPosition(syntaxTree: SyntaxTree, position: number): ISyntaxToken;
}
declare module TypeScript {
    function isShared(element: ISyntaxElement): boolean;
    function childCount(element: ISyntaxElement): number;
    function childAt(element: ISyntaxElement, index: number): ISyntaxElement;
    function syntaxTree(element: ISyntaxElement): SyntaxTree;
    function parsedInStrictMode(node: ISyntaxNode): boolean;
    function previousToken(token: ISyntaxToken, includeSkippedTokens?: boolean): ISyntaxToken;
    function findToken(element: ISyntaxElement, position: number, includeSkippedTokens?: boolean): ISyntaxToken;
    function findSkippedTokenInPositionedToken(positionedToken: ISyntaxToken, position: number): ISyntaxToken;
    function findSkippedTokenInLeadingTriviaList(positionedToken: ISyntaxToken, position: number): ISyntaxToken;
    function findSkippedTokenInTrailingTriviaList(positionedToken: ISyntaxToken, position: number): ISyntaxToken;
    function nextToken(token: ISyntaxToken, text?: ISimpleText, includeSkippedTokens?: boolean): ISyntaxToken;
    function isNode(element: ISyntaxElement): boolean;
    function isToken(element: ISyntaxElement): boolean;
    function isList(element: ISyntaxElement): boolean;
    function isSeparatedList(element: ISyntaxElement): boolean;
    function syntaxID(element: ISyntaxElement): number;
    function fullText(element: ISyntaxElement, text?: ISimpleText): string;
    function leadingTriviaWidth(element: ISyntaxElement, text?: ISimpleText): number;
    function trailingTriviaWidth(element: ISyntaxElement, text?: ISimpleText): number;
    function firstToken(element: ISyntaxElement): ISyntaxToken;
    function lastToken(element: ISyntaxElement): ISyntaxToken;
    function fullStart(element: ISyntaxElement): number;
    function fullWidth(element: ISyntaxElement): number;
    function isIncrementallyUnusable(element: ISyntaxElement): boolean;
    function start(element: ISyntaxElement, text?: ISimpleText): number;
    function end(element: ISyntaxElement, text?: ISimpleText): number;
    function width(element: ISyntaxElement, text?: ISimpleText): number;
    function fullEnd(element: ISyntaxElement): number;
    function existsNewLineBetweenTokens(token1: ISyntaxToken, token2: ISyntaxToken, text: ISimpleText): boolean;
    interface ISyntaxElement {
        kind(): SyntaxKind;
        parent?: ISyntaxElement;
    }
    interface ISyntaxNode extends ISyntaxNodeOrToken {
        data: number;
    }
    interface IModuleReferenceSyntax extends ISyntaxNode {
        _moduleReferenceBrand: any;
    }
    interface IModuleElementSyntax extends ISyntaxNode {
    }
    interface IStatementSyntax extends IModuleElementSyntax {
        _statementBrand: any;
    }
    interface ITypeMemberSyntax extends ISyntaxNode {
    }
    interface IClassElementSyntax extends ISyntaxNode {
    }
    interface IMemberDeclarationSyntax extends IClassElementSyntax {
    }
    interface IPropertyAssignmentSyntax extends IClassElementSyntax {
    }
    interface ISwitchClauseSyntax extends ISyntaxNode {
        _switchClauseBrand: any;
        statements: IStatementSyntax[];
    }
    interface IExpressionSyntax extends ISyntaxNodeOrToken {
        _expressionBrand: any;
    }
    interface IUnaryExpressionSyntax extends IExpressionSyntax {
        _unaryExpressionBrand: any;
    }
    interface IPostfixExpressionSyntax extends IUnaryExpressionSyntax {
        _postfixExpressionBrand: any;
    }
    interface ILeftHandSideExpressionSyntax extends IPostfixExpressionSyntax {
        _leftHandSideExpressionBrand: any;
    }
    interface IMemberExpressionSyntax extends ILeftHandSideExpressionSyntax {
        _memberExpressionBrand: any;
    }
    interface ICallExpressionSyntax extends ILeftHandSideExpressionSyntax {
        _callExpressionBrand: any;
        expression: IExpressionSyntax;
    }
    interface IPrimaryExpressionSyntax extends IMemberExpressionSyntax {
        _primaryExpressionBrand: any;
    }
    interface ITypeSyntax extends ISyntaxNodeOrToken {
        _typeBrand: any;
    }
    interface INameSyntax extends ITypeSyntax {
    }
}
declare module TypeScript.SyntaxFacts {
    function isDirectivePrologueElement(node: ISyntaxNodeOrToken): boolean;
    function isUseStrictDirective(node: ISyntaxNodeOrToken): boolean;
    function isIdentifierNameOrAnyKeyword(token: ISyntaxToken): boolean;
    function isAccessibilityModifier(kind: SyntaxKind): boolean;
}
interface Array<T> {
    data: number;
    separators?: TypeScript.ISyntaxToken[];
    kind(): TypeScript.SyntaxKind;
    parent: TypeScript.ISyntaxElement;
    separatorCount(): number;
    separatorAt(index: number): TypeScript.ISyntaxToken;
}
declare module TypeScript.Syntax {
    function emptyList<T extends ISyntaxNodeOrToken>(): T[];
    function emptySeparatedList<T extends ISyntaxNodeOrToken>(): T[];
    function list<T extends ISyntaxNodeOrToken>(nodes: T[]): T[];
    function separatedList<T extends ISyntaxNodeOrToken>(nodes: T[], separators: ISyntaxToken[]): T[];
    function nonSeparatorIndexOf<T extends ISyntaxNodeOrToken>(list: T[], ast: ISyntaxNodeOrToken): number;
}
declare module TypeScript {
    class SyntaxNode implements ISyntaxNodeOrToken {
        private __kind;
        public data: number;
        public parent: ISyntaxElement;
        constructor(data: number);
        public kind(): SyntaxKind;
    }
}
declare module TypeScript {
    interface ISyntaxNodeOrToken extends ISyntaxElement {
    }
}
declare module TypeScript {
    interface SourceUnitSyntax extends ISyntaxNode {
        syntaxTree: SyntaxTree;
        moduleElements: IModuleElementSyntax[];
        endOfFileToken: ISyntaxToken;
    }
    interface QualifiedNameSyntax extends ISyntaxNode, INameSyntax {
        left: INameSyntax;
        dotToken: ISyntaxToken;
        right: ISyntaxToken;
    }
    interface ObjectTypeSyntax extends ISyntaxNode, ITypeSyntax {
        openBraceToken: ISyntaxToken;
        typeMembers: ITypeMemberSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface FunctionTypeSyntax extends ISyntaxNode, ITypeSyntax {
        typeParameterList: TypeParameterListSyntax;
        parameterList: ParameterListSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        type: ITypeSyntax;
    }
    interface ArrayTypeSyntax extends ISyntaxNode, ITypeSyntax {
        type: ITypeSyntax;
        openBracketToken: ISyntaxToken;
        closeBracketToken: ISyntaxToken;
    }
    interface ConstructorTypeSyntax extends ISyntaxNode, ITypeSyntax {
        newKeyword: ISyntaxToken;
        typeParameterList: TypeParameterListSyntax;
        parameterList: ParameterListSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        type: ITypeSyntax;
    }
    interface GenericTypeSyntax extends ISyntaxNode, ITypeSyntax {
        name: INameSyntax;
        typeArgumentList: TypeArgumentListSyntax;
    }
    interface TypeQuerySyntax extends ISyntaxNode, ITypeSyntax {
        typeOfKeyword: ISyntaxToken;
        name: INameSyntax;
    }
    interface TupleTypeSyntax extends ISyntaxNode, ITypeSyntax {
        openBracketToken: ISyntaxToken;
        types: ITypeSyntax[];
        closeBracketToken: ISyntaxToken;
    }
    interface InterfaceDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        interfaceKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        typeParameterList: TypeParameterListSyntax;
        heritageClauses: HeritageClauseSyntax[];
        body: ObjectTypeSyntax;
    }
    interface FunctionDeclarationSyntax extends ISyntaxNode, IStatementSyntax {
        modifiers: ISyntaxToken[];
        functionKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ModuleDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        moduleKeyword: ISyntaxToken;
        name: INameSyntax;
        stringLiteral: ISyntaxToken;
        openBraceToken: ISyntaxToken;
        moduleElements: IModuleElementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface ClassDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        classKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        typeParameterList: TypeParameterListSyntax;
        heritageClauses: HeritageClauseSyntax[];
        openBraceToken: ISyntaxToken;
        classElements: IClassElementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface EnumDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        enumKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        openBraceToken: ISyntaxToken;
        enumElements: EnumElementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface ImportDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        importKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        equalsToken: ISyntaxToken;
        moduleReference: IModuleReferenceSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ExportAssignmentSyntax extends ISyntaxNode, IModuleElementSyntax {
        exportKeyword: ISyntaxToken;
        equalsToken: ISyntaxToken;
        identifier: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface MemberFunctionDeclarationSyntax extends ISyntaxNode, IMemberDeclarationSyntax {
        modifiers: ISyntaxToken[];
        propertyName: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface MemberVariableDeclarationSyntax extends ISyntaxNode, IMemberDeclarationSyntax {
        modifiers: ISyntaxToken[];
        variableDeclarator: VariableDeclaratorSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ConstructorDeclarationSyntax extends ISyntaxNode, IClassElementSyntax {
        modifiers: ISyntaxToken[];
        constructorKeyword: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface IndexMemberDeclarationSyntax extends ISyntaxNode, IClassElementSyntax {
        modifiers: ISyntaxToken[];
        indexSignature: IndexSignatureSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface GetAccessorSyntax extends ISyntaxNode, IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        modifiers: ISyntaxToken[];
        getKeyword: ISyntaxToken;
        propertyName: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    interface SetAccessorSyntax extends ISyntaxNode, IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        modifiers: ISyntaxToken[];
        setKeyword: ISyntaxToken;
        propertyName: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    interface PropertySignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        propertyName: ISyntaxToken;
        questionToken: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
    }
    interface CallSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        typeParameterList: TypeParameterListSyntax;
        parameterList: ParameterListSyntax;
        typeAnnotation: TypeAnnotationSyntax;
    }
    interface ConstructSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        newKeyword: ISyntaxToken;
        callSignature: CallSignatureSyntax;
    }
    interface IndexSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        openBracketToken: ISyntaxToken;
        parameters: ParameterSyntax[];
        closeBracketToken: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
    }
    interface MethodSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        propertyName: ISyntaxToken;
        questionToken: ISyntaxToken;
        callSignature: CallSignatureSyntax;
    }
    interface BlockSyntax extends ISyntaxNode, IStatementSyntax {
        openBraceToken: ISyntaxToken;
        statements: IStatementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface IfStatementSyntax extends ISyntaxNode, IStatementSyntax {
        ifKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
        elseClause: ElseClauseSyntax;
    }
    interface VariableStatementSyntax extends ISyntaxNode, IStatementSyntax {
        modifiers: ISyntaxToken[];
        variableDeclaration: VariableDeclarationSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ExpressionStatementSyntax extends ISyntaxNode, IStatementSyntax {
        expression: IExpressionSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ReturnStatementSyntax extends ISyntaxNode, IStatementSyntax {
        returnKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface SwitchStatementSyntax extends ISyntaxNode, IStatementSyntax {
        switchKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        expression: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        openBraceToken: ISyntaxToken;
        switchClauses: ISwitchClauseSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface BreakStatementSyntax extends ISyntaxNode, IStatementSyntax {
        breakKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface ContinueStatementSyntax extends ISyntaxNode, IStatementSyntax {
        continueKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface ForStatementSyntax extends ISyntaxNode, IStatementSyntax {
        forKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        variableDeclaration: VariableDeclarationSyntax;
        initializer: IExpressionSyntax;
        firstSemicolonToken: ISyntaxToken;
        condition: IExpressionSyntax;
        secondSemicolonToken: ISyntaxToken;
        incrementor: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface ForInStatementSyntax extends ISyntaxNode, IStatementSyntax {
        forKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        variableDeclaration: VariableDeclarationSyntax;
        left: IExpressionSyntax;
        inKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface EmptyStatementSyntax extends ISyntaxNode, IStatementSyntax {
        semicolonToken: ISyntaxToken;
    }
    interface ThrowStatementSyntax extends ISyntaxNode, IStatementSyntax {
        throwKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface WhileStatementSyntax extends ISyntaxNode, IStatementSyntax {
        whileKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface TryStatementSyntax extends ISyntaxNode, IStatementSyntax {
        tryKeyword: ISyntaxToken;
        block: BlockSyntax;
        catchClause: CatchClauseSyntax;
        finallyClause: FinallyClauseSyntax;
    }
    interface LabeledStatementSyntax extends ISyntaxNode, IStatementSyntax {
        identifier: ISyntaxToken;
        colonToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface DoStatementSyntax extends ISyntaxNode, IStatementSyntax {
        doKeyword: ISyntaxToken;
        statement: IStatementSyntax;
        whileKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface DebuggerStatementSyntax extends ISyntaxNode, IStatementSyntax {
        debuggerKeyword: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface WithStatementSyntax extends ISyntaxNode, IStatementSyntax {
        withKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface PrefixUnaryExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        operatorToken: ISyntaxToken;
        operand: IUnaryExpressionSyntax;
    }
    interface DeleteExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        deleteKeyword: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    interface TypeOfExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        typeOfKeyword: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    interface VoidExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        voidKeyword: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    interface ConditionalExpressionSyntax extends ISyntaxNode, IExpressionSyntax {
        condition: IExpressionSyntax;
        questionToken: ISyntaxToken;
        whenTrue: IExpressionSyntax;
        colonToken: ISyntaxToken;
        whenFalse: IExpressionSyntax;
    }
    interface BinaryExpressionSyntax extends ISyntaxNode, IExpressionSyntax {
        left: IExpressionSyntax;
        operatorToken: ISyntaxToken;
        right: IExpressionSyntax;
    }
    interface PostfixUnaryExpressionSyntax extends ISyntaxNode, IPostfixExpressionSyntax {
        operand: ILeftHandSideExpressionSyntax;
        operatorToken: ISyntaxToken;
    }
    interface MemberAccessExpressionSyntax extends ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        dotToken: ISyntaxToken;
        name: ISyntaxToken;
    }
    interface InvocationExpressionSyntax extends ISyntaxNode, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        argumentList: ArgumentListSyntax;
    }
    interface ArrayLiteralExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        openBracketToken: ISyntaxToken;
        expressions: IExpressionSyntax[];
        closeBracketToken: ISyntaxToken;
    }
    interface ObjectLiteralExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        openBraceToken: ISyntaxToken;
        propertyAssignments: IPropertyAssignmentSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface ObjectCreationExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        newKeyword: ISyntaxToken;
        expression: IMemberExpressionSyntax;
        argumentList: ArgumentListSyntax;
    }
    interface ParenthesizedExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        openParenToken: ISyntaxToken;
        expression: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
    }
    interface ParenthesizedArrowFunctionExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        callSignature: CallSignatureSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        block: BlockSyntax;
        expression: IExpressionSyntax;
    }
    interface SimpleArrowFunctionExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        parameter: ParameterSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        block: BlockSyntax;
        expression: IExpressionSyntax;
    }
    interface CastExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        lessThanToken: ISyntaxToken;
        type: ITypeSyntax;
        greaterThanToken: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    interface ElementAccessExpressionSyntax extends ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        openBracketToken: ISyntaxToken;
        argumentExpression: IExpressionSyntax;
        closeBracketToken: ISyntaxToken;
    }
    interface FunctionExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        functionKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    interface OmittedExpressionSyntax extends ISyntaxNode, IExpressionSyntax {
    }
    interface VariableDeclarationSyntax extends ISyntaxNode {
        varKeyword: ISyntaxToken;
        variableDeclarators: VariableDeclaratorSyntax[];
    }
    interface VariableDeclaratorSyntax extends ISyntaxNode {
        propertyName: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
        equalsValueClause: EqualsValueClauseSyntax;
    }
    interface ArgumentListSyntax extends ISyntaxNode {
        typeArgumentList: TypeArgumentListSyntax;
        openParenToken: ISyntaxToken;
        arguments: IExpressionSyntax[];
        closeParenToken: ISyntaxToken;
    }
    interface ParameterListSyntax extends ISyntaxNode {
        openParenToken: ISyntaxToken;
        parameters: ParameterSyntax[];
        closeParenToken: ISyntaxToken;
    }
    interface TypeArgumentListSyntax extends ISyntaxNode {
        lessThanToken: ISyntaxToken;
        typeArguments: ITypeSyntax[];
        greaterThanToken: ISyntaxToken;
    }
    interface TypeParameterListSyntax extends ISyntaxNode {
        lessThanToken: ISyntaxToken;
        typeParameters: TypeParameterSyntax[];
        greaterThanToken: ISyntaxToken;
    }
    interface HeritageClauseSyntax extends ISyntaxNode {
        extendsOrImplementsKeyword: ISyntaxToken;
        typeNames: INameSyntax[];
    }
    interface EqualsValueClauseSyntax extends ISyntaxNode {
        equalsToken: ISyntaxToken;
        value: IExpressionSyntax;
    }
    interface CaseSwitchClauseSyntax extends ISyntaxNode, ISwitchClauseSyntax {
        caseKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        colonToken: ISyntaxToken;
        statements: IStatementSyntax[];
    }
    interface DefaultSwitchClauseSyntax extends ISyntaxNode, ISwitchClauseSyntax {
        defaultKeyword: ISyntaxToken;
        colonToken: ISyntaxToken;
        statements: IStatementSyntax[];
    }
    interface ElseClauseSyntax extends ISyntaxNode {
        elseKeyword: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface CatchClauseSyntax extends ISyntaxNode {
        catchKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        identifier: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
        closeParenToken: ISyntaxToken;
        block: BlockSyntax;
    }
    interface FinallyClauseSyntax extends ISyntaxNode {
        finallyKeyword: ISyntaxToken;
        block: BlockSyntax;
    }
    interface TypeParameterSyntax extends ISyntaxNode {
        identifier: ISyntaxToken;
        constraint: ConstraintSyntax;
    }
    interface ConstraintSyntax extends ISyntaxNode {
        extendsKeyword: ISyntaxToken;
        typeOrExpression: ISyntaxNodeOrToken;
    }
    interface SimplePropertyAssignmentSyntax extends ISyntaxNode, IPropertyAssignmentSyntax {
        propertyName: ISyntaxToken;
        colonToken: ISyntaxToken;
        expression: IExpressionSyntax;
    }
    interface FunctionPropertyAssignmentSyntax extends ISyntaxNode, IPropertyAssignmentSyntax {
        propertyName: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    interface ParameterSyntax extends ISyntaxNode {
        dotDotDotToken: ISyntaxToken;
        modifiers: ISyntaxToken[];
        identifier: ISyntaxToken;
        questionToken: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
        equalsValueClause: EqualsValueClauseSyntax;
    }
    interface EnumElementSyntax extends ISyntaxNode {
        propertyName: ISyntaxToken;
        equalsValueClause: EqualsValueClauseSyntax;
    }
    interface TypeAnnotationSyntax extends ISyntaxNode {
        colonToken: ISyntaxToken;
        type: ITypeSyntax;
    }
    interface ExternalModuleReferenceSyntax extends ISyntaxNode, IModuleReferenceSyntax {
        requireKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        stringLiteral: ISyntaxToken;
        closeParenToken: ISyntaxToken;
    }
    interface ModuleNameModuleReferenceSyntax extends ISyntaxNode, IModuleReferenceSyntax {
        moduleName: INameSyntax;
    }
    var nodeMetadata: string[][];
    module Syntax {
        interface ISyntaxFactory {
            isConcrete: boolean;
            SourceUnitSyntax: new(data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken) => SourceUnitSyntax;
            QualifiedNameSyntax: new(data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken) => QualifiedNameSyntax;
            ObjectTypeSyntax: new(data: number, openBraceToken: ISyntaxToken, typeMembers: ITypeMemberSyntax[], closeBraceToken: ISyntaxToken) => ObjectTypeSyntax;
            FunctionTypeSyntax: new(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) => FunctionTypeSyntax;
            ArrayTypeSyntax: new(data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken) => ArrayTypeSyntax;
            ConstructorTypeSyntax: new(data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) => ConstructorTypeSyntax;
            GenericTypeSyntax: new(data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax) => GenericTypeSyntax;
            TypeQuerySyntax: new(data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax) => TypeQuerySyntax;
            TupleTypeSyntax: new(data: number, openBracketToken: ISyntaxToken, types: ITypeSyntax[], closeBracketToken: ISyntaxToken) => TupleTypeSyntax;
            InterfaceDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax) => InterfaceDeclarationSyntax;
            FunctionDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) => FunctionDeclarationSyntax;
            ModuleDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken) => ModuleDeclarationSyntax;
            ClassDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken) => ClassDeclarationSyntax;
            EnumDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: EnumElementSyntax[], closeBraceToken: ISyntaxToken) => EnumDeclarationSyntax;
            ImportDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken) => ImportDeclarationSyntax;
            ExportAssignmentSyntax: new(data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) => ExportAssignmentSyntax;
            MemberFunctionDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) => MemberFunctionDeclarationSyntax;
            MemberVariableDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken) => MemberVariableDeclarationSyntax;
            ConstructorDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) => ConstructorDeclarationSyntax;
            IndexMemberDeclarationSyntax: new(data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken) => IndexMemberDeclarationSyntax;
            GetAccessorSyntax: new(data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) => GetAccessorSyntax;
            SetAccessorSyntax: new(data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) => SetAccessorSyntax;
            PropertySignatureSyntax: new(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) => PropertySignatureSyntax;
            CallSignatureSyntax: new(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax) => CallSignatureSyntax;
            ConstructSignatureSyntax: new(data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax) => ConstructSignatureSyntax;
            IndexSignatureSyntax: new(data: number, openBracketToken: ISyntaxToken, parameters: ParameterSyntax[], closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) => IndexSignatureSyntax;
            MethodSignatureSyntax: new(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax) => MethodSignatureSyntax;
            BlockSyntax: new(data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken) => BlockSyntax;
            IfStatementSyntax: new(data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax) => IfStatementSyntax;
            VariableStatementSyntax: new(data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken) => VariableStatementSyntax;
            ExpressionStatementSyntax: new(data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) => ExpressionStatementSyntax;
            ReturnStatementSyntax: new(data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) => ReturnStatementSyntax;
            SwitchStatementSyntax: new(data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken) => SwitchStatementSyntax;
            BreakStatementSyntax: new(data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) => BreakStatementSyntax;
            ContinueStatementSyntax: new(data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) => ContinueStatementSyntax;
            ForStatementSyntax: new(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) => ForStatementSyntax;
            ForInStatementSyntax: new(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) => ForInStatementSyntax;
            EmptyStatementSyntax: new(data: number, semicolonToken: ISyntaxToken) => EmptyStatementSyntax;
            ThrowStatementSyntax: new(data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) => ThrowStatementSyntax;
            WhileStatementSyntax: new(data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) => WhileStatementSyntax;
            TryStatementSyntax: new(data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax) => TryStatementSyntax;
            LabeledStatementSyntax: new(data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax) => LabeledStatementSyntax;
            DoStatementSyntax: new(data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken) => DoStatementSyntax;
            DebuggerStatementSyntax: new(data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken) => DebuggerStatementSyntax;
            WithStatementSyntax: new(data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) => WithStatementSyntax;
            PrefixUnaryExpressionSyntax: new(data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax) => PrefixUnaryExpressionSyntax;
            DeleteExpressionSyntax: new(data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) => DeleteExpressionSyntax;
            TypeOfExpressionSyntax: new(data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) => TypeOfExpressionSyntax;
            VoidExpressionSyntax: new(data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) => VoidExpressionSyntax;
            ConditionalExpressionSyntax: new(data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax) => ConditionalExpressionSyntax;
            BinaryExpressionSyntax: new(data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax) => BinaryExpressionSyntax;
            PostfixUnaryExpressionSyntax: new(data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken) => PostfixUnaryExpressionSyntax;
            MemberAccessExpressionSyntax: new(data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken) => MemberAccessExpressionSyntax;
            InvocationExpressionSyntax: new(data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax) => InvocationExpressionSyntax;
            ArrayLiteralExpressionSyntax: new(data: number, openBracketToken: ISyntaxToken, expressions: IExpressionSyntax[], closeBracketToken: ISyntaxToken) => ArrayLiteralExpressionSyntax;
            ObjectLiteralExpressionSyntax: new(data: number, openBraceToken: ISyntaxToken, propertyAssignments: IPropertyAssignmentSyntax[], closeBraceToken: ISyntaxToken) => ObjectLiteralExpressionSyntax;
            ObjectCreationExpressionSyntax: new(data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax) => ObjectCreationExpressionSyntax;
            ParenthesizedExpressionSyntax: new(data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken) => ParenthesizedExpressionSyntax;
            ParenthesizedArrowFunctionExpressionSyntax: new(data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) => ParenthesizedArrowFunctionExpressionSyntax;
            SimpleArrowFunctionExpressionSyntax: new(data: number, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) => SimpleArrowFunctionExpressionSyntax;
            CastExpressionSyntax: new(data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax) => CastExpressionSyntax;
            ElementAccessExpressionSyntax: new(data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken) => ElementAccessExpressionSyntax;
            FunctionExpressionSyntax: new(data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) => FunctionExpressionSyntax;
            OmittedExpressionSyntax: new(data: number) => OmittedExpressionSyntax;
            VariableDeclarationSyntax: new(data: number, varKeyword: ISyntaxToken, variableDeclarators: VariableDeclaratorSyntax[]) => VariableDeclarationSyntax;
            VariableDeclaratorSyntax: new(data: number, propertyName: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) => VariableDeclaratorSyntax;
            ArgumentListSyntax: new(data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, arguments: IExpressionSyntax[], closeParenToken: ISyntaxToken) => ArgumentListSyntax;
            ParameterListSyntax: new(data: number, openParenToken: ISyntaxToken, parameters: ParameterSyntax[], closeParenToken: ISyntaxToken) => ParameterListSyntax;
            TypeArgumentListSyntax: new(data: number, lessThanToken: ISyntaxToken, typeArguments: ITypeSyntax[], greaterThanToken: ISyntaxToken) => TypeArgumentListSyntax;
            TypeParameterListSyntax: new(data: number, lessThanToken: ISyntaxToken, typeParameters: TypeParameterSyntax[], greaterThanToken: ISyntaxToken) => TypeParameterListSyntax;
            HeritageClauseSyntax: new(data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: INameSyntax[]) => HeritageClauseSyntax;
            EqualsValueClauseSyntax: new(data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax) => EqualsValueClauseSyntax;
            CaseSwitchClauseSyntax: new(data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]) => CaseSwitchClauseSyntax;
            DefaultSwitchClauseSyntax: new(data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]) => DefaultSwitchClauseSyntax;
            ElseClauseSyntax: new(data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax) => ElseClauseSyntax;
            CatchClauseSyntax: new(data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax) => CatchClauseSyntax;
            FinallyClauseSyntax: new(data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax) => FinallyClauseSyntax;
            TypeParameterSyntax: new(data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax) => TypeParameterSyntax;
            ConstraintSyntax: new(data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken) => ConstraintSyntax;
            SimplePropertyAssignmentSyntax: new(data: number, propertyName: ISyntaxToken, colonToken: ISyntaxToken, expression: IExpressionSyntax) => SimplePropertyAssignmentSyntax;
            FunctionPropertyAssignmentSyntax: new(data: number, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) => FunctionPropertyAssignmentSyntax;
            ParameterSyntax: new(data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) => ParameterSyntax;
            EnumElementSyntax: new(data: number, propertyName: ISyntaxToken, equalsValueClause: EqualsValueClauseSyntax) => EnumElementSyntax;
            TypeAnnotationSyntax: new(data: number, colonToken: ISyntaxToken, type: ITypeSyntax) => TypeAnnotationSyntax;
            ExternalModuleReferenceSyntax: new(data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken) => ExternalModuleReferenceSyntax;
            ModuleNameModuleReferenceSyntax: new(data: number, moduleName: INameSyntax) => ModuleNameModuleReferenceSyntax;
        }
    }
}
declare module TypeScript {
    interface ISyntaxToken extends ISyntaxNodeOrToken, INameSyntax, IPrimaryExpressionSyntax {
        setFullStart(fullStart: number): void;
        fullStart(): number;
        fullWidth(): number;
        text(): string;
        fullText(text?: ISimpleText): string;
        hasLeadingTrivia(): boolean;
        hasTrailingTrivia(): boolean;
        hasLeadingComment(): boolean;
        hasTrailingComment(): boolean;
        hasSkippedToken(): boolean;
        leadingTrivia(text?: ISimpleText): ISyntaxTriviaList;
        trailingTrivia(text?: ISimpleText): ISyntaxTriviaList;
        leadingTriviaWidth(text?: ISimpleText): number;
        trailingTriviaWidth(text?: ISimpleText): number;
        isKeywordConvertedToIdentifier(): boolean;
        isIncrementallyUnusable(): boolean;
        clone(): ISyntaxToken;
    }
}
declare module TypeScript {
    function tokenValue(token: ISyntaxToken): any;
    function tokenValueText(token: ISyntaxToken): string;
    function massageEscapes(text: string): string;
}
declare module TypeScript.Syntax {
    function realizeToken(token: ISyntaxToken, text: ISimpleText): ISyntaxToken;
    function convertKeywordToIdentifier(token: ISyntaxToken): ISyntaxToken;
    function withLeadingTrivia(token: ISyntaxToken, leadingTrivia: ISyntaxTriviaList, text: ISimpleText): ISyntaxToken;
    function withTrailingTrivia(token: ISyntaxToken, trailingTrivia: ISyntaxTriviaList, text: ISimpleText): ISyntaxToken;
    function emptyToken(kind: SyntaxKind): ISyntaxToken;
}
declare module TypeScript {
    interface ISyntaxTrivia {
        parent?: ISyntaxTriviaList;
        kind(): SyntaxKind;
        isWhitespace(): boolean;
        isComment(): boolean;
        isNewLine(): boolean;
        isSkippedToken(): boolean;
        fullStart(): number;
        fullWidth(): number;
        fullText(): string;
        skippedToken(): ISyntaxToken;
        clone(): ISyntaxTrivia;
    }
}
declare module TypeScript.Syntax {
    function deferredTrivia(kind: SyntaxKind, text: ISimpleText, fullStart: number, fullWidth: number): ISyntaxTrivia;
    function skippedTokenTrivia(token: ISyntaxToken, text: ISimpleText): ISyntaxTrivia;
    function splitMultiLineCommentTriviaIntoMultipleLines(trivia: ISyntaxTrivia): string[];
}
declare module TypeScript {
    interface ISyntaxTriviaList {
        parent?: ISyntaxToken;
        isShared(): boolean;
        count(): number;
        syntaxTriviaAt(index: number): ISyntaxTrivia;
        fullWidth(): number;
        fullText(): string;
        hasComment(): boolean;
        hasNewLine(): boolean;
        hasSkippedToken(): boolean;
        last(): ISyntaxTrivia;
        toArray(): ISyntaxTrivia[];
        clone(): ISyntaxTriviaList;
    }
}
declare module TypeScript.Syntax {
    var emptyTriviaList: ISyntaxTriviaList;
    function triviaList(trivia: ISyntaxTrivia[]): ISyntaxTriviaList;
}
declare module TypeScript {
    class SyntaxUtilities {
        static isAnyFunctionExpressionOrDeclaration(ast: ISyntaxElement): boolean;
        static isLastTokenOnLine(token: ISyntaxToken, text: ISimpleText): boolean;
        static isLeftHandSizeExpression(element: ISyntaxElement): boolean;
        static isExpression(element: ISyntaxElement): boolean;
        static isSwitchClause(element: ISyntaxElement): boolean;
        static isTypeMember(element: ISyntaxElement): boolean;
        static isClassElement(element: ISyntaxElement): boolean;
        static isModuleElement(element: ISyntaxElement): boolean;
        static isStatement(element: ISyntaxElement): boolean;
        static isAngleBracket(positionedElement: ISyntaxElement): boolean;
        static getToken(list: ISyntaxToken[], kind: SyntaxKind): ISyntaxToken;
        static containsToken(list: ISyntaxToken[], kind: SyntaxKind): boolean;
        static hasExportKeyword(moduleElement: IModuleElementSyntax): boolean;
        static getExportKeyword(moduleElement: IModuleElementSyntax): ISyntaxToken;
        static isAmbientDeclarationSyntax(positionNode: ISyntaxNode): boolean;
    }
}
declare module TypeScript {
    function visitNodeOrToken(visitor: ISyntaxVisitor, element: ISyntaxNodeOrToken): any;
    interface ISyntaxVisitor {
        visitToken(token: ISyntaxToken): any;
        visitSourceUnit(node: SourceUnitSyntax): any;
        visitQualifiedName(node: QualifiedNameSyntax): any;
        visitObjectType(node: ObjectTypeSyntax): any;
        visitFunctionType(node: FunctionTypeSyntax): any;
        visitArrayType(node: ArrayTypeSyntax): any;
        visitConstructorType(node: ConstructorTypeSyntax): any;
        visitGenericType(node: GenericTypeSyntax): any;
        visitTypeQuery(node: TypeQuerySyntax): any;
        visitTupleType(node: TupleTypeSyntax): any;
        visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): any;
        visitFunctionDeclaration(node: FunctionDeclarationSyntax): any;
        visitModuleDeclaration(node: ModuleDeclarationSyntax): any;
        visitClassDeclaration(node: ClassDeclarationSyntax): any;
        visitEnumDeclaration(node: EnumDeclarationSyntax): any;
        visitImportDeclaration(node: ImportDeclarationSyntax): any;
        visitExportAssignment(node: ExportAssignmentSyntax): any;
        visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): any;
        visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): any;
        visitConstructorDeclaration(node: ConstructorDeclarationSyntax): any;
        visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): any;
        visitGetAccessor(node: GetAccessorSyntax): any;
        visitSetAccessor(node: SetAccessorSyntax): any;
        visitPropertySignature(node: PropertySignatureSyntax): any;
        visitCallSignature(node: CallSignatureSyntax): any;
        visitConstructSignature(node: ConstructSignatureSyntax): any;
        visitIndexSignature(node: IndexSignatureSyntax): any;
        visitMethodSignature(node: MethodSignatureSyntax): any;
        visitBlock(node: BlockSyntax): any;
        visitIfStatement(node: IfStatementSyntax): any;
        visitVariableStatement(node: VariableStatementSyntax): any;
        visitExpressionStatement(node: ExpressionStatementSyntax): any;
        visitReturnStatement(node: ReturnStatementSyntax): any;
        visitSwitchStatement(node: SwitchStatementSyntax): any;
        visitBreakStatement(node: BreakStatementSyntax): any;
        visitContinueStatement(node: ContinueStatementSyntax): any;
        visitForStatement(node: ForStatementSyntax): any;
        visitForInStatement(node: ForInStatementSyntax): any;
        visitEmptyStatement(node: EmptyStatementSyntax): any;
        visitThrowStatement(node: ThrowStatementSyntax): any;
        visitWhileStatement(node: WhileStatementSyntax): any;
        visitTryStatement(node: TryStatementSyntax): any;
        visitLabeledStatement(node: LabeledStatementSyntax): any;
        visitDoStatement(node: DoStatementSyntax): any;
        visitDebuggerStatement(node: DebuggerStatementSyntax): any;
        visitWithStatement(node: WithStatementSyntax): any;
        visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): any;
        visitDeleteExpression(node: DeleteExpressionSyntax): any;
        visitTypeOfExpression(node: TypeOfExpressionSyntax): any;
        visitVoidExpression(node: VoidExpressionSyntax): any;
        visitConditionalExpression(node: ConditionalExpressionSyntax): any;
        visitBinaryExpression(node: BinaryExpressionSyntax): any;
        visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): any;
        visitMemberAccessExpression(node: MemberAccessExpressionSyntax): any;
        visitInvocationExpression(node: InvocationExpressionSyntax): any;
        visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): any;
        visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): any;
        visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): any;
        visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): any;
        visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): any;
        visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): any;
        visitCastExpression(node: CastExpressionSyntax): any;
        visitElementAccessExpression(node: ElementAccessExpressionSyntax): any;
        visitFunctionExpression(node: FunctionExpressionSyntax): any;
        visitOmittedExpression(node: OmittedExpressionSyntax): any;
        visitVariableDeclaration(node: VariableDeclarationSyntax): any;
        visitVariableDeclarator(node: VariableDeclaratorSyntax): any;
        visitArgumentList(node: ArgumentListSyntax): any;
        visitParameterList(node: ParameterListSyntax): any;
        visitTypeArgumentList(node: TypeArgumentListSyntax): any;
        visitTypeParameterList(node: TypeParameterListSyntax): any;
        visitHeritageClause(node: HeritageClauseSyntax): any;
        visitEqualsValueClause(node: EqualsValueClauseSyntax): any;
        visitCaseSwitchClause(node: CaseSwitchClauseSyntax): any;
        visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): any;
        visitElseClause(node: ElseClauseSyntax): any;
        visitCatchClause(node: CatchClauseSyntax): any;
        visitFinallyClause(node: FinallyClauseSyntax): any;
        visitTypeParameter(node: TypeParameterSyntax): any;
        visitConstraint(node: ConstraintSyntax): any;
        visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): any;
        visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): any;
        visitParameter(node: ParameterSyntax): any;
        visitEnumElement(node: EnumElementSyntax): any;
        visitTypeAnnotation(node: TypeAnnotationSyntax): any;
        visitExternalModuleReference(node: ExternalModuleReferenceSyntax): any;
        visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): any;
    }
}
declare module TypeScript {
    class SyntaxWalker implements ISyntaxVisitor {
        public visitToken(token: ISyntaxToken): void;
        public visitNode(node: ISyntaxNode): void;
        public visitNodeOrToken(nodeOrToken: ISyntaxNodeOrToken): void;
        private visitOptionalToken(token);
        public visitOptionalNode(node: ISyntaxNode): void;
        public visitOptionalNodeOrToken(nodeOrToken: ISyntaxNodeOrToken): void;
        public visitList(list: ISyntaxNodeOrToken[]): void;
        public visitSeparatedList(list: ISyntaxNodeOrToken[]): void;
        public visitSourceUnit(node: SourceUnitSyntax): void;
        public visitQualifiedName(node: QualifiedNameSyntax): void;
        public visitObjectType(node: ObjectTypeSyntax): void;
        public visitFunctionType(node: FunctionTypeSyntax): void;
        public visitArrayType(node: ArrayTypeSyntax): void;
        public visitConstructorType(node: ConstructorTypeSyntax): void;
        public visitGenericType(node: GenericTypeSyntax): void;
        public visitTypeQuery(node: TypeQuerySyntax): void;
        public visitTupleType(node: TupleTypeSyntax): void;
        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void;
        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void;
        public visitModuleDeclaration(node: ModuleDeclarationSyntax): void;
        public visitClassDeclaration(node: ClassDeclarationSyntax): void;
        public visitEnumDeclaration(node: EnumDeclarationSyntax): void;
        public visitImportDeclaration(node: ImportDeclarationSyntax): void;
        public visitExportAssignment(node: ExportAssignmentSyntax): void;
        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void;
        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void;
        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void;
        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): void;
        public visitGetAccessor(node: GetAccessorSyntax): void;
        public visitSetAccessor(node: SetAccessorSyntax): void;
        public visitPropertySignature(node: PropertySignatureSyntax): void;
        public visitCallSignature(node: CallSignatureSyntax): void;
        public visitConstructSignature(node: ConstructSignatureSyntax): void;
        public visitIndexSignature(node: IndexSignatureSyntax): void;
        public visitMethodSignature(node: MethodSignatureSyntax): void;
        public visitBlock(node: BlockSyntax): void;
        public visitIfStatement(node: IfStatementSyntax): void;
        public visitVariableStatement(node: VariableStatementSyntax): void;
        public visitExpressionStatement(node: ExpressionStatementSyntax): void;
        public visitReturnStatement(node: ReturnStatementSyntax): void;
        public visitSwitchStatement(node: SwitchStatementSyntax): void;
        public visitBreakStatement(node: BreakStatementSyntax): void;
        public visitContinueStatement(node: ContinueStatementSyntax): void;
        public visitForStatement(node: ForStatementSyntax): void;
        public visitForInStatement(node: ForInStatementSyntax): void;
        public visitEmptyStatement(node: EmptyStatementSyntax): void;
        public visitThrowStatement(node: ThrowStatementSyntax): void;
        public visitWhileStatement(node: WhileStatementSyntax): void;
        public visitTryStatement(node: TryStatementSyntax): void;
        public visitLabeledStatement(node: LabeledStatementSyntax): void;
        public visitDoStatement(node: DoStatementSyntax): void;
        public visitDebuggerStatement(node: DebuggerStatementSyntax): void;
        public visitWithStatement(node: WithStatementSyntax): void;
        public visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void;
        public visitDeleteExpression(node: DeleteExpressionSyntax): void;
        public visitTypeOfExpression(node: TypeOfExpressionSyntax): void;
        public visitVoidExpression(node: VoidExpressionSyntax): void;
        public visitConditionalExpression(node: ConditionalExpressionSyntax): void;
        public visitBinaryExpression(node: BinaryExpressionSyntax): void;
        public visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void;
        public visitMemberAccessExpression(node: MemberAccessExpressionSyntax): void;
        public visitInvocationExpression(node: InvocationExpressionSyntax): void;
        public visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): void;
        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void;
        public visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): void;
        public visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): void;
        public visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): void;
        public visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): void;
        public visitCastExpression(node: CastExpressionSyntax): void;
        public visitElementAccessExpression(node: ElementAccessExpressionSyntax): void;
        public visitFunctionExpression(node: FunctionExpressionSyntax): void;
        public visitOmittedExpression(node: OmittedExpressionSyntax): void;
        public visitVariableDeclaration(node: VariableDeclarationSyntax): void;
        public visitVariableDeclarator(node: VariableDeclaratorSyntax): void;
        public visitArgumentList(node: ArgumentListSyntax): void;
        public visitParameterList(node: ParameterListSyntax): void;
        public visitTypeArgumentList(node: TypeArgumentListSyntax): void;
        public visitTypeParameterList(node: TypeParameterListSyntax): void;
        public visitHeritageClause(node: HeritageClauseSyntax): void;
        public visitEqualsValueClause(node: EqualsValueClauseSyntax): void;
        public visitCaseSwitchClause(node: CaseSwitchClauseSyntax): void;
        public visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): void;
        public visitElseClause(node: ElseClauseSyntax): void;
        public visitCatchClause(node: CatchClauseSyntax): void;
        public visitFinallyClause(node: FinallyClauseSyntax): void;
        public visitTypeParameter(node: TypeParameterSyntax): void;
        public visitConstraint(node: ConstraintSyntax): void;
        public visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): void;
        public visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): void;
        public visitParameter(node: ParameterSyntax): void;
        public visitEnumElement(node: EnumElementSyntax): void;
        public visitTypeAnnotation(node: TypeAnnotationSyntax): void;
        public visitExternalModuleReference(node: ExternalModuleReferenceSyntax): void;
        public visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): void;
    }
}
declare module TypeScript {
    class DepthLimitedWalker extends SyntaxWalker {
        private _depth;
        private _maximumDepth;
        constructor(maximumDepth: number);
        public visitNode(node: ISyntaxNode): void;
    }
}
declare module TypeScript.Parser {
    var syntaxFactory: Syntax.ISyntaxFactory;
    interface IParserSource {
        text: ISimpleText;
        fileName: string;
        languageVersion: LanguageVersion;
        currentNode(): ISyntaxNode;
        currentToken(): ISyntaxToken;
        currentContextualToken(): ISyntaxToken;
        peekToken(n: number): ISyntaxToken;
        consumeNode(node: ISyntaxNode): void;
        consumeToken(token: ISyntaxToken): void;
        getRewindPoint(): IRewindPoint;
        rewind(rewindPoint: IRewindPoint): void;
        releaseRewindPoint(rewindPoint: IRewindPoint): void;
        tokenDiagnostics(): Diagnostic[];
        release(): void;
    }
    interface IRewindPoint {
    }
    function parse(fileName: string, text: ISimpleText, languageVersion: LanguageVersion, isDeclaration: boolean): SyntaxTree;
    function parseSource(source: IParserSource, isDeclaration: boolean): SyntaxTree;
}
declare module TypeScript.Syntax.Concrete {
    var isConcrete: boolean;
    class SourceUnitSyntax extends SyntaxNode {
        public syntaxTree: SyntaxTree;
        public moduleElements: IModuleElementSyntax[];
        public endOfFileToken: ISyntaxToken;
        constructor(data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken);
    }
    class QualifiedNameSyntax extends SyntaxNode implements INameSyntax {
        public left: INameSyntax;
        public dotToken: ISyntaxToken;
        public right: ISyntaxToken;
        public _nameBrand: any;
        public _typeBrand: any;
        constructor(data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken);
    }
    class ObjectTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public openBraceToken: ISyntaxToken;
        public typeMembers: ITypeMemberSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _typeBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, typeMembers: ITypeMemberSyntax[], closeBraceToken: ISyntaxToken);
    }
    class FunctionTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _typeBrand: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax);
    }
    class ArrayTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public type: ITypeSyntax;
        public openBracketToken: ISyntaxToken;
        public closeBracketToken: ISyntaxToken;
        public _typeBrand: any;
        constructor(data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken);
    }
    class ConstructorTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public newKeyword: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _typeBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax);
    }
    class GenericTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public name: INameSyntax;
        public typeArgumentList: TypeArgumentListSyntax;
        public _typeBrand: any;
        constructor(data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax);
    }
    class TypeQuerySyntax extends SyntaxNode implements ITypeSyntax {
        public typeOfKeyword: ISyntaxToken;
        public name: INameSyntax;
        public _typeBrand: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax);
    }
    class TupleTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public openBracketToken: ISyntaxToken;
        public types: ITypeSyntax[];
        public closeBracketToken: ISyntaxToken;
        public _typeBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, types: ITypeSyntax[], closeBracketToken: ISyntaxToken);
    }
    class InterfaceDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public interfaceKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public body: ObjectTypeSyntax;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax);
    }
    class FunctionDeclarationSyntax extends SyntaxNode implements IStatementSyntax {
        public modifiers: ISyntaxToken[];
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken);
    }
    class ModuleDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public moduleKeyword: ISyntaxToken;
        public name: INameSyntax;
        public stringLiteral: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public moduleElements: IModuleElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken);
    }
    class ClassDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public classKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public openBraceToken: ISyntaxToken;
        public classElements: IClassElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken);
    }
    class EnumDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public enumKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public enumElements: EnumElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: EnumElementSyntax[], closeBraceToken: ISyntaxToken);
    }
    class ImportDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public importKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public moduleReference: IModuleReferenceSyntax;
        public semicolonToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken);
    }
    class ExportAssignmentSyntax extends SyntaxNode implements IModuleElementSyntax {
        public exportKeyword: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken);
    }
    class MemberFunctionDeclarationSyntax extends SyntaxNode implements IMemberDeclarationSyntax {
        public modifiers: ISyntaxToken[];
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _memberDeclarationBrand: any;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken);
    }
    class MemberVariableDeclarationSyntax extends SyntaxNode implements IMemberDeclarationSyntax {
        public modifiers: ISyntaxToken[];
        public variableDeclarator: VariableDeclaratorSyntax;
        public semicolonToken: ISyntaxToken;
        public _memberDeclarationBrand: any;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken);
    }
    class ConstructorDeclarationSyntax extends SyntaxNode implements IClassElementSyntax {
        public modifiers: ISyntaxToken[];
        public constructorKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken);
    }
    class IndexMemberDeclarationSyntax extends SyntaxNode implements IClassElementSyntax {
        public modifiers: ISyntaxToken[];
        public indexSignature: IndexSignatureSyntax;
        public semicolonToken: ISyntaxToken;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken);
    }
    class GetAccessorSyntax extends SyntaxNode implements IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public modifiers: ISyntaxToken[];
        public getKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _memberDeclarationBrand: any;
        public _propertyAssignmentBrand: any;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax);
    }
    class SetAccessorSyntax extends SyntaxNode implements IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public modifiers: ISyntaxToken[];
        public setKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _memberDeclarationBrand: any;
        public _propertyAssignmentBrand: any;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax);
    }
    class PropertySignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax);
    }
    class CallSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax);
    }
    class ConstructSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public newKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax);
    }
    class IndexSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public openBracketToken: ISyntaxToken;
        public parameters: ParameterSyntax[];
        public closeBracketToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, parameters: ParameterSyntax[], closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax);
    }
    class MethodSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax);
    }
    class BlockSyntax extends SyntaxNode implements IStatementSyntax {
        public openBraceToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken);
    }
    class IfStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public ifKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public elseClause: ElseClauseSyntax;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax);
    }
    class VariableStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public modifiers: ISyntaxToken[];
        public variableDeclaration: VariableDeclarationSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken);
    }
    class ExpressionStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken);
    }
    class ReturnStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public returnKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken);
    }
    class SwitchStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public switchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public switchClauses: ISwitchClauseSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken);
    }
    class BreakStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public breakKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken);
    }
    class ContinueStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public continueKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken);
    }
    class ForStatementSyntax extends SyntaxNode implements IStatementSyntax {
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
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax);
    }
    class ForInStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public forKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public variableDeclaration: VariableDeclarationSyntax;
        public left: IExpressionSyntax;
        public inKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax);
    }
    class EmptyStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, semicolonToken: ISyntaxToken);
    }
    class ThrowStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public throwKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken);
    }
    class WhileStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax);
    }
    class TryStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public tryKeyword: ISyntaxToken;
        public block: BlockSyntax;
        public catchClause: CatchClauseSyntax;
        public finallyClause: FinallyClauseSyntax;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax);
    }
    class LabeledStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public identifier: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax);
    }
    class DoStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public doKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken);
    }
    class DebuggerStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public debuggerKeyword: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken);
    }
    class WithStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public withKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any;
        public _moduleElementBrand: any;
        constructor(data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax);
    }
    class PrefixUnaryExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public operatorToken: ISyntaxToken;
        public operand: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax);
        public kind(): SyntaxKind;
    }
    class DeleteExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public deleteKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax);
    }
    class TypeOfExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public typeOfKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax);
    }
    class VoidExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public voidKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax);
    }
    class ConditionalExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public condition: IExpressionSyntax;
        public questionToken: ISyntaxToken;
        public whenTrue: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public whenFalse: IExpressionSyntax;
        public _expressionBrand: any;
        constructor(data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax);
    }
    class BinaryExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public left: IExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public right: IExpressionSyntax;
        public _expressionBrand: any;
        constructor(data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax);
        public kind(): SyntaxKind;
    }
    class PostfixUnaryExpressionSyntax extends SyntaxNode implements IPostfixExpressionSyntax {
        public operand: ILeftHandSideExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public _postfixExpressionBrand: any;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken);
        public kind(): SyntaxKind;
    }
    class MemberAccessExpressionSyntax extends SyntaxNode implements IMemberExpressionSyntax, ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public dotToken: ISyntaxToken;
        public name: ISyntaxToken;
        public _memberExpressionBrand: any;
        public _callExpressionBrand: any;
        public _leftHandSideExpressionBrand: any;
        public _postfixExpressionBrand: any;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken);
    }
    class InvocationExpressionSyntax extends SyntaxNode implements ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _callExpressionBrand: any;
        public _leftHandSideExpressionBrand: any;
        public _postfixExpressionBrand: any;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax);
    }
    class ArrayLiteralExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openBracketToken: ISyntaxToken;
        public expressions: IExpressionSyntax[];
        public closeBracketToken: ISyntaxToken;
        public _primaryExpressionBrand: any;
        public _memberExpressionBrand: any;
        public _leftHandSideExpressionBrand: any;
        public _postfixExpressionBrand: any;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, expressions: IExpressionSyntax[], closeBracketToken: ISyntaxToken);
    }
    class ObjectLiteralExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openBraceToken: ISyntaxToken;
        public propertyAssignments: IPropertyAssignmentSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _primaryExpressionBrand: any;
        public _memberExpressionBrand: any;
        public _leftHandSideExpressionBrand: any;
        public _postfixExpressionBrand: any;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, propertyAssignments: IPropertyAssignmentSyntax[], closeBraceToken: ISyntaxToken);
    }
    class ObjectCreationExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public newKeyword: ISyntaxToken;
        public expression: IMemberExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _primaryExpressionBrand: any;
        public _memberExpressionBrand: any;
        public _leftHandSideExpressionBrand: any;
        public _postfixExpressionBrand: any;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax);
    }
    class ParenthesizedExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public _primaryExpressionBrand: any;
        public _memberExpressionBrand: any;
        public _leftHandSideExpressionBrand: any;
        public _postfixExpressionBrand: any;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken);
    }
    class ParenthesizedArrowFunctionExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public callSignature: CallSignatureSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax);
    }
    class SimpleArrowFunctionExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public parameter: ParameterSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax);
    }
    class CastExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public lessThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public greaterThanToken: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax);
    }
    class ElementAccessExpressionSyntax extends SyntaxNode implements IMemberExpressionSyntax, ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public openBracketToken: ISyntaxToken;
        public argumentExpression: IExpressionSyntax;
        public closeBracketToken: ISyntaxToken;
        public _memberExpressionBrand: any;
        public _callExpressionBrand: any;
        public _leftHandSideExpressionBrand: any;
        public _postfixExpressionBrand: any;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken);
    }
    class FunctionExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _primaryExpressionBrand: any;
        public _memberExpressionBrand: any;
        public _leftHandSideExpressionBrand: any;
        public _postfixExpressionBrand: any;
        public _unaryExpressionBrand: any;
        public _expressionBrand: any;
        constructor(data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax);
    }
    class OmittedExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public _expressionBrand: any;
        constructor(data: number);
    }
    class VariableDeclarationSyntax extends SyntaxNode {
        public varKeyword: ISyntaxToken;
        public variableDeclarators: VariableDeclaratorSyntax[];
        constructor(data: number, varKeyword: ISyntaxToken, variableDeclarators: VariableDeclaratorSyntax[]);
    }
    class VariableDeclaratorSyntax extends SyntaxNode {
        public propertyName: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, propertyName: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax);
    }
    class ArgumentListSyntax extends SyntaxNode {
        public typeArgumentList: TypeArgumentListSyntax;
        public openParenToken: ISyntaxToken;
        public arguments: IExpressionSyntax[];
        public closeParenToken: ISyntaxToken;
        constructor(data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, _arguments: IExpressionSyntax[], closeParenToken: ISyntaxToken);
    }
    class ParameterListSyntax extends SyntaxNode {
        public openParenToken: ISyntaxToken;
        public parameters: ParameterSyntax[];
        public closeParenToken: ISyntaxToken;
        constructor(data: number, openParenToken: ISyntaxToken, parameters: ParameterSyntax[], closeParenToken: ISyntaxToken);
    }
    class TypeArgumentListSyntax extends SyntaxNode {
        public lessThanToken: ISyntaxToken;
        public typeArguments: ITypeSyntax[];
        public greaterThanToken: ISyntaxToken;
        constructor(data: number, lessThanToken: ISyntaxToken, typeArguments: ITypeSyntax[], greaterThanToken: ISyntaxToken);
    }
    class TypeParameterListSyntax extends SyntaxNode {
        public lessThanToken: ISyntaxToken;
        public typeParameters: TypeParameterSyntax[];
        public greaterThanToken: ISyntaxToken;
        constructor(data: number, lessThanToken: ISyntaxToken, typeParameters: TypeParameterSyntax[], greaterThanToken: ISyntaxToken);
    }
    class HeritageClauseSyntax extends SyntaxNode {
        public extendsOrImplementsKeyword: ISyntaxToken;
        public typeNames: INameSyntax[];
        constructor(data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: INameSyntax[]);
        public kind(): SyntaxKind;
    }
    class EqualsValueClauseSyntax extends SyntaxNode {
        public equalsToken: ISyntaxToken;
        public value: IExpressionSyntax;
        constructor(data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax);
    }
    class CaseSwitchClauseSyntax extends SyntaxNode implements ISwitchClauseSyntax {
        public caseKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _switchClauseBrand: any;
        constructor(data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]);
    }
    class DefaultSwitchClauseSyntax extends SyntaxNode implements ISwitchClauseSyntax {
        public defaultKeyword: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _switchClauseBrand: any;
        constructor(data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]);
    }
    class ElseClauseSyntax extends SyntaxNode {
        public elseKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        constructor(data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax);
    }
    class CatchClauseSyntax extends SyntaxNode {
        public catchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public closeParenToken: ISyntaxToken;
        public block: BlockSyntax;
        constructor(data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax);
    }
    class FinallyClauseSyntax extends SyntaxNode {
        public finallyKeyword: ISyntaxToken;
        public block: BlockSyntax;
        constructor(data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax);
    }
    class TypeParameterSyntax extends SyntaxNode {
        public identifier: ISyntaxToken;
        public constraint: ConstraintSyntax;
        constructor(data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax);
    }
    class ConstraintSyntax extends SyntaxNode {
        public extendsKeyword: ISyntaxToken;
        public typeOrExpression: ISyntaxNodeOrToken;
        constructor(data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken);
    }
    class SimplePropertyAssignmentSyntax extends SyntaxNode implements IPropertyAssignmentSyntax {
        public propertyName: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public _propertyAssignmentBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, colonToken: ISyntaxToken, expression: IExpressionSyntax);
    }
    class FunctionPropertyAssignmentSyntax extends SyntaxNode implements IPropertyAssignmentSyntax {
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _propertyAssignmentBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax);
    }
    class ParameterSyntax extends SyntaxNode {
        public dotDotDotToken: ISyntaxToken;
        public modifiers: ISyntaxToken[];
        public identifier: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax);
    }
    class EnumElementSyntax extends SyntaxNode {
        public propertyName: ISyntaxToken;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, propertyName: ISyntaxToken, equalsValueClause: EqualsValueClauseSyntax);
    }
    class TypeAnnotationSyntax extends SyntaxNode {
        public colonToken: ISyntaxToken;
        public type: ITypeSyntax;
        constructor(data: number, colonToken: ISyntaxToken, type: ITypeSyntax);
    }
    class ExternalModuleReferenceSyntax extends SyntaxNode implements IModuleReferenceSyntax {
        public requireKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public stringLiteral: ISyntaxToken;
        public closeParenToken: ISyntaxToken;
        public _moduleReferenceBrand: any;
        constructor(data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken);
    }
    class ModuleNameModuleReferenceSyntax extends SyntaxNode implements IModuleReferenceSyntax {
        public moduleName: INameSyntax;
        public _moduleReferenceBrand: any;
        constructor(data: number, moduleName: INameSyntax);
    }
}
declare module TypeScript {
    var syntaxDiagnosticsTime: number;
    class SyntaxTree {
        public text: ISimpleText;
        private _isConcrete;
        private _sourceUnit;
        private _isDeclaration;
        private _parserDiagnostics;
        private _allDiagnostics;
        private _fileName;
        private _lineMap;
        private _languageVersion;
        private _amdDependencies;
        private _isExternalModule;
        constructor(isConcrete: boolean, sourceUnit: SourceUnitSyntax, isDeclaration: boolean, diagnostics: Diagnostic[], fileName: string, text: ISimpleText, languageVersion: LanguageVersion);
        public isConcrete(): boolean;
        public sourceUnit(): SourceUnitSyntax;
        public isDeclaration(): boolean;
        private computeDiagnostics();
        public diagnostics(): Diagnostic[];
        public fileName(): string;
        public lineMap(): LineMap;
        public languageVersion(): LanguageVersion;
        private cacheSyntaxTreeInfo();
        private getAmdDependency(comment);
        public isExternalModule(): boolean;
        public amdDependencies(): string[];
    }
    function externalModuleIndicatorSpan(syntaxTree: SyntaxTree): TextSpan;
    function externalModuleIndicatorSpanWorker(syntaxTree: SyntaxTree, firstToken: ISyntaxToken): TextSpan;
}
declare module TypeScript {
    class Unicode {
        static unicodeES3IdentifierStart: number[];
        static unicodeES3IdentifierPart: number[];
        static unicodeES5IdentifierStart: number[];
        static unicodeES5IdentifierPart: number[];
        static lookupInUnicodeMap(code: number, map: number[]): boolean;
        static isIdentifierStart(code: number, languageVersion: LanguageVersion): boolean;
        static isIdentifierPart(code: number, languageVersion: LanguageVersion): boolean;
    }
}
declare module TypeScript.PrettyPrinter {
    function prettyPrint(node: ISyntaxNode, indentWhitespace?: string): string;
}
declare var negative262ExpectedResults: TypeScript.IIndexable<boolean>;
declare module TypeScript {
    interface ILogger {
        information(): boolean;
        debug(): boolean;
        warning(): boolean;
        error(): boolean;
        fatal(): boolean;
        log(s: string): void;
    }
    class NullLogger implements ILogger {
        public information(): boolean;
        public debug(): boolean;
        public warning(): boolean;
        public error(): boolean;
        public fatal(): boolean;
        public log(s: string): void;
    }
    function timeFunction(logger: ILogger, funcDescription: string, func: () => any): any;
}
declare module TypeScript {
    interface IncrementalParse {
        (oldSyntaxTree: SyntaxTree, textChangeRange: TextChangeRange, newText: ISimpleText): SyntaxTree;
    }
    class Document implements IASTForDeclMap {
        private compilationSettings;
        public fileName: string;
        public referencedFiles: string[];
        private _scriptSnapshot;
        public byteOrderMark: ByteOrderMark;
        public version: number;
        public isOpen: boolean;
        private _syntaxTree;
        private _topLevelDecl;
        private _bloomFilter;
        private _declASTMap;
        private _astDeclMap;
        static incrementalParse: IncrementalParse;
        constructor(compilationSettings: ImmutableCompilationSettings, fileName: string, referencedFiles: string[], _scriptSnapshot: IScriptSnapshot, byteOrderMark: ByteOrderMark, version: number, isOpen: boolean, _syntaxTree: SyntaxTree, _topLevelDecl: PullDecl);
        public isDeclareFile(): boolean;
        public sourceUnit(): SourceUnitSyntax;
        public diagnostics(): Diagnostic[];
        public lineMap(): LineMap;
        public syntaxTree(): SyntaxTree;
        public bloomFilter(): BloomFilter;
        public emitToOwnOutputFile(): boolean;
        public update(scriptSnapshot: IScriptSnapshot, version: number, isOpen: boolean, textChangeRange: TextChangeRange): Document;
        static create(compilationSettings: ImmutableCompilationSettings, fileName: string, scriptSnapshot: IScriptSnapshot, byteOrderMark: ByteOrderMark, version: number, isOpen: boolean, referencedFiles: string[]): Document;
        public topLevelDecl(): PullDecl;
        public _getDeclForAST(ast: ISyntaxElement): PullDecl;
        public getEnclosingDecl(ast: ISyntaxElement): PullDecl;
        public _setDeclForAST(ast: ISyntaxElement, decl: PullDecl): void;
        public _getASTForDecl(decl: PullDecl): ISyntaxElement;
        public _setASTForDecl(decl: PullDecl, ast: ISyntaxElement): void;
    }
}
declare module TypeScript {
    function hasFlag(val: number, flag: number): boolean;
    enum ModuleGenTarget {
        Unspecified = 0,
        Synchronous = 1,
        Asynchronous = 2,
    }
}
declare module TypeScript {
    function createIntrinsicsObject<T>(): IIndexable<T>;
    interface IHashTable<T> {
        getAllKeys(): string[];
        add(key: string, data: T): boolean;
        addOrUpdate(key: string, data: T): boolean;
        map(fn: (k: string, value: T, context: any) => void, context: any): void;
        every(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        some(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        count(): number;
        lookup(key: string): T;
    }
    class StringHashTable<T> implements IHashTable<T> {
        private itemCount;
        private table;
        public getAllKeys(): string[];
        public add(key: string, data: T): boolean;
        public addOrUpdate(key: string, data: T): boolean;
        public map(fn: (k: string, value: T, context: any) => void, context: any): void;
        public every(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        public some(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        public count(): number;
        public lookup(key: string): T;
        public remove(key: string): void;
    }
    class IdentiferNameHashTable<T> extends StringHashTable<T> {
        public getAllKeys(): string[];
        public add(key: string, data: T): boolean;
        public addOrUpdate(key: string, data: T): boolean;
        public map(fn: (k: string, value: T, context: any) => void, context: any): void;
        public every(fn: (k: string, value: T, context: any) => void, context: any): boolean;
        public some(fn: (k: string, value: any, context: any) => void, context: any): boolean;
        public lookup(key: string): T;
    }
}
declare module TypeScript {
    class Comment {
        private _trivia;
        public endsLine: boolean;
        public _start: number;
        public _end: number;
        constructor(_trivia: ISyntaxTrivia, endsLine: boolean, _start: number, _end: number);
        public start(): number;
        public end(): number;
        public fullText(): string;
        public kind(): SyntaxKind;
        public structuralEquals(ast: Comment, includingPosition: boolean): boolean;
    }
}
declare module TypeScript.ASTHelpers {
    function scriptIsElided(sourceUnit: SourceUnitSyntax): boolean;
    function moduleIsElided(declaration: ModuleDeclarationSyntax): boolean;
    function enumIsElided(declaration: EnumDeclarationSyntax): boolean;
    function isValidAstNode(ast: ISyntaxElement): boolean;
    function isValidSpan(ast: ISpan): boolean;
    function getAstAtPosition(script: ISyntaxElement, pos: number, useTrailingTriviaAsLimChar?: boolean, forceInclusive?: boolean): ISyntaxElement;
    function getExtendsHeritageClause(clauses: HeritageClauseSyntax[]): HeritageClauseSyntax;
    function getImplementsHeritageClause(clauses: HeritageClauseSyntax[]): HeritageClauseSyntax;
    function isCallExpression(ast: ISyntaxElement): boolean;
    function isCallExpressionTarget(ast: ISyntaxElement): boolean;
    function getCallExpressionTarget(ast: ISyntaxElement): ISyntaxElement;
    function isDeclarationASTOrDeclarationNameAST(ast: ISyntaxElement): boolean;
    function getEnclosingParameterForInitializer(ast: ISyntaxElement): ParameterSyntax;
    function getEnclosingMemberDeclaration(ast: ISyntaxElement): ISyntaxElement;
    function isNameOfFunction(ast: ISyntaxElement): boolean;
    function isNameOfMemberFunction(ast: ISyntaxElement): boolean;
    function isNameOfMemberAccessExpression(ast: ISyntaxElement): boolean;
    function isRightSideOfQualifiedName(ast: ISyntaxElement): boolean;
    function parentIsModuleDeclaration(ast: ISyntaxElement): boolean;
    function isDeclarationAST(ast: ISyntaxElement): boolean;
    function preComments(element: ISyntaxElement, text: ISimpleText): Comment[];
    function postComments(element: ISyntaxElement, text: ISimpleText): Comment[];
    function convertTokenLeadingComments(token: ISyntaxToken, text: ISimpleText): Comment[];
    function convertTokenTrailingComments(token: ISyntaxToken, text: ISimpleText): Comment[];
    function docComments(ast: ISyntaxElement, text: ISimpleText): Comment[];
    function isDocComment(comment: Comment): boolean;
    function getParameterList(ast: ISyntaxElement): ParameterListSyntax;
    function getType(ast: ISyntaxElement): ITypeSyntax;
    function getVariableDeclaratorModifiers(variableDeclarator: VariableDeclaratorSyntax): ISyntaxToken[];
    function isIntegerLiteralAST(expression: ISyntaxElement): boolean;
    function getEnclosingModuleDeclaration(ast: ISyntaxElement): ModuleDeclarationSyntax;
    function getModuleDeclarationFromNameAST(ast: ISyntaxElement): ModuleDeclarationSyntax;
    function isLastNameOfModule(ast: ModuleDeclarationSyntax, astName: ISyntaxElement): boolean;
    function getNameOfIdenfierOrQualifiedName(name: ISyntaxElement): string;
    function getModuleNames(name: ISyntaxElement, result?: ISyntaxToken[]): ISyntaxToken[];
}
declare module TypeScript {
    class AstWalkOptions {
        public goChildren: boolean;
        public stopWalking: boolean;
    }
    interface IAstWalker {
        options: AstWalkOptions;
        state: any;
    }
    class AstWalkerFactory {
        public walk(ast: ISyntaxElement, pre: (ast: ISyntaxElement, walker: IAstWalker) => void, post?: (ast: ISyntaxElement, walker: IAstWalker) => void, state?: any): void;
        public simpleWalk(ast: ISyntaxElement, pre: (ast: ISyntaxElement, state: any) => void, post?: (ast: ISyntaxElement, state: any) => void, state?: any): void;
    }
    function getAstWalkerFactory(): AstWalkerFactory;
}
declare module TypeScript {
    class Base64VLQFormat {
        static encode(inValue: number): string;
        static decode(inString: string): {
            value: number;
            rest: string;
        };
    }
}
declare module TypeScript {
    class SourceMapPosition {
        public sourceLine: number;
        public sourceColumn: number;
        public emittedLine: number;
        public emittedColumn: number;
    }
    class SourceMapping {
        public start: SourceMapPosition;
        public end: SourceMapPosition;
        public nameIndex: number;
        public childMappings: SourceMapping[];
    }
    class SourceMapEntry {
        public emittedFile: string;
        public emittedLine: number;
        public emittedColumn: number;
        public sourceFile: string;
        public sourceLine: number;
        public sourceColumn: number;
        public sourceName: string;
        constructor(emittedFile: string, emittedLine: number, emittedColumn: number, sourceFile: string, sourceLine: number, sourceColumn: number, sourceName: string);
    }
    class SourceMapper {
        private jsFile;
        private sourceMapOut;
        static MapFileExtension: string;
        private jsFileName;
        private sourceMapPath;
        private sourceMapDirectory;
        private sourceRoot;
        public names: string[];
        private mappingLevel;
        private tsFilePaths;
        private allSourceMappings;
        public currentMappings: SourceMapping[][];
        public currentNameIndex: number[];
        private sourceMapEntries;
        constructor(jsFile: TextWriter, sourceMapOut: TextWriter, document: Document, jsFilePath: string, emitOptions: EmitOptions, resolvePath: (path: string) => string);
        public getOutputFile(): OutputFile;
        public increaseMappingLevel(ast: ISpan): void;
        public decreaseMappingLevel(ast: any): void;
        public setNewSourceFile(document: Document, emitOptions: EmitOptions): void;
        private setSourceMapOptions(document, jsFilePath, emitOptions, resolvePath);
        private setNewSourceFilePath(document, emitOptions);
        public emitSourceMapping(): void;
    }
}
declare module TypeScript {
    enum EmitContainer {
        Prog = 0,
        Module = 1,
        DynamicModule = 2,
        Class = 3,
        Constructor = 4,
        Function = 5,
        Args = 6,
        Interface = 7,
    }
    class EmitState {
        public column: number;
        public line: number;
        public container: EmitContainer;
        constructor();
    }
    class EmitOptions {
        public resolvePath: (path: string) => string;
        private _diagnostic;
        private _settings;
        private _commonDirectoryPath;
        private _sharedOutputFile;
        private _sourceRootDirectory;
        private _sourceMapRootDirectory;
        private _outputDirectory;
        public diagnostic(): Diagnostic;
        public commonDirectoryPath(): string;
        public sharedOutputFile(): string;
        public sourceRootDirectory(): string;
        public sourceMapRootDirectory(): string;
        public outputDirectory(): string;
        public compilationSettings(): ImmutableCompilationSettings;
        constructor(compiler: TypeScriptCompiler, resolvePath: (path: string) => string);
        private determineCommonDirectoryPath(compiler);
    }
    class Indenter {
        static indentStep: number;
        static indentStepString: string;
        static indentStrings: string[];
        public indentAmt: number;
        public increaseIndent(): void;
        public decreaseIndent(): void;
        public getIndent(): string;
    }
    function lastParameterIsRest(parameters: ParameterSyntax[]): boolean;
    class Emitter {
        public emittingFileName: string;
        public outfile: TextWriter;
        public emitOptions: EmitOptions;
        private semanticInfoChain;
        public globalThisCapturePrologueEmitted: boolean;
        public extendsPrologueEmitted: boolean;
        public thisClassNode: ClassDeclarationSyntax;
        public inArrowFunction: boolean;
        public moduleName: string;
        public emitState: EmitState;
        public indenter: Indenter;
        public sourceMapper: SourceMapper;
        public captureThisStmtString: string;
        private currentVariableDeclaration;
        private declStack;
        private exportAssignment;
        private inWithBlock;
        public document: Document;
        private detachedCommentsElement;
        constructor(emittingFileName: string, outfile: TextWriter, emitOptions: EmitOptions, semanticInfoChain: SemanticInfoChain);
        private pushDecl(decl);
        private popDecl(decl);
        private getEnclosingDecl();
        public setExportAssignment(exportAssignment: ExportAssignmentSyntax): void;
        public getExportAssignment(): ExportAssignmentSyntax;
        public setDocument(document: Document): void;
        public shouldEmitImportDeclaration(importDeclAST: ImportDeclarationSyntax): boolean;
        public emitImportDeclaration(importDeclAST: ImportDeclarationSyntax): void;
        public createSourceMapper(document: Document, jsFileName: string, jsFile: TextWriter, sourceMapOut: TextWriter, resolvePath: (path: string) => string): void;
        public setSourceMapperNewSourceFile(document: Document): void;
        private updateLineAndColumn(s);
        public writeToOutputWithSourceMapRecord(s: string, astSpan: ISyntaxElement): void;
        public writeToOutput(s: string): void;
        public writeLineToOutput(s: string, force?: boolean): void;
        public writeCaptureThisStatement(ast: ISyntaxElement): void;
        public setContainer(c: number): number;
        private getIndentString();
        public emitIndent(): void;
        public emitComment(comment: Comment, trailing: boolean, first: boolean, noLeadingSpace?: boolean): void;
        private text();
        public emitComments(ast: ISyntaxElement, pre: boolean, onlyPinnedOrTripleSlashComments?: boolean): void;
        private isPinnedOrTripleSlash(comment);
        private emitCommentsArray(comments, trailing, noLeadingSpace?);
        public emitObjectLiteralExpression(objectLiteral: ObjectLiteralExpressionSyntax): void;
        public emitArrayLiteralExpression(arrayLiteral: ArrayLiteralExpressionSyntax): void;
        public emitObjectCreationExpression(objectCreationExpression: ObjectCreationExpressionSyntax): void;
        public getConstantDecl(dotExpr: MemberAccessExpressionSyntax): PullEnumElementDecl;
        public tryEmitConstant(dotExpr: MemberAccessExpressionSyntax): boolean;
        public emitInvocationExpression(callNode: InvocationExpressionSyntax): void;
        private emitParameterList(list);
        private emitFunctionParameters(ast, parameters);
        private emitFunctionBodyStatements(name, funcDecl, parameters, block, bodyExpression);
        private emitDefaultValueAssignments(parameters);
        private emitRestParameterInitializer(parameters);
        private getImportDecls(fileName);
        public getModuleImportAndDependencyList(sourceUnit: SourceUnitSyntax): {
            importList: string;
            dependencyList: string;
        };
        public shouldCaptureThis(ast: ISyntaxElement): boolean;
        public emitEnum(moduleDecl: EnumDeclarationSyntax): void;
        private getModuleDeclToVerifyChildNameCollision(moduleDecl, changeNameIfAnyDeclarationInContext);
        private hasChildNameCollision(moduleName, parentDecl);
        private getModuleName(moduleDecl, changeNameIfAnyDeclarationInContext?);
        private emitModuleDeclarationWorker(moduleDecl);
        private writeToken(token);
        public emitSingleModuleDeclaration(moduleDecl: ModuleDeclarationSyntax, moduleName: ISyntaxToken): void;
        public emitEnumElement(varDecl: EnumElementSyntax): void;
        public emitElementAccessExpression(expression: ElementAccessExpressionSyntax): void;
        public emitSimpleArrowFunctionExpression(arrowFunction: SimpleArrowFunctionExpressionSyntax): void;
        public emitParenthesizedArrowFunctionExpression(arrowFunction: ParenthesizedArrowFunctionExpressionSyntax): void;
        private emitAnyArrowFunctionExpression(arrowFunction, block, expression);
        public emitConstructor(funcDecl: ConstructorDeclarationSyntax): void;
        public emitGetAccessor(accessor: GetAccessorSyntax): void;
        public emitSetAccessor(accessor: SetAccessorSyntax): void;
        public emitFunctionExpression(funcDecl: FunctionExpressionSyntax): void;
        public emitFunction(funcDecl: FunctionDeclarationSyntax): void;
        public emitAmbientVarDecl(varDecl: VariableDeclaratorSyntax): void;
        public emitVarDeclVar(): void;
        public emitVariableDeclaration(declaration: VariableDeclarationSyntax): void;
        private emitMemberVariableDeclaration(varDecl);
        public emitVariableDeclarator(varDecl: VariableDeclaratorSyntax): void;
        private symbolIsUsedInItsEnclosingContainer(symbol, dynamic?);
        private shouldQualifySymbolNameWithParentName(symbol);
        private getSymbolForEmit(ast);
        public emitName(name: ISyntaxToken, addThis: boolean): void;
        public recordSourceMappingNameStart(name: string): void;
        public recordSourceMappingNameEnd(): void;
        private recordSourceMappingStart(ast);
        private recordSourceMappingCommentStart(comment);
        private recordSourceMappingSpanStart(ast, start, end);
        private recordSourceMappingEnd(ast);
        private recordSourceMappingCommentEnd(ast);
        private recordSourceMappingSpanEnd(ast, start, end);
        public getOutputFiles(): OutputFile[];
        private emitParameterPropertyAndMemberVariableAssignments();
        private isOnSameLine(pos1, pos2);
        private emitCommaSeparatedList<T extends ISyntaxNodeOrToken>(parent, list, buffer, preserveNewLines);
        public emitList<T extends ISyntaxNodeOrToken>(list: T[], useNewLineSeparator?: boolean, startInclusive?: number, endExclusive?: number): void;
        public emitSeparatedList<T extends ISyntaxNodeOrToken>(list: T[], useNewLineSeparator?: boolean, startInclusive?: number, endExclusive?: number): void;
        private isDirectivePrologueElement(node);
        public emitSpaceBetweenConstructs(node1: ISyntaxElement, node2: ISyntaxElement): void;
        private getDetachedComments(element);
        private emitPossibleCopyrightHeaders(script);
        private emitDetachedComments(list);
        public emitScriptElements(sourceUnit: SourceUnitSyntax): void;
        public emitConstructorStatements(funcDecl: ConstructorDeclarationSyntax): void;
        public emitJavascript(ast: ISyntaxElement, startLine: boolean): void;
        public emitAccessorMemberDeclaration(funcDecl: ISyntaxElement, name: ISyntaxToken, className: string, isProto: boolean): void;
        private emitAccessorBody(funcDecl, parameterList, block);
        public emitClass(classDecl: ClassDeclarationSyntax): void;
        private emitClassMembers(classDecl);
        private emitClassMemberFunctionDeclaration(classDecl, funcDecl);
        private requiresExtendsBlock(moduleElements);
        public emitPrologue(sourceUnit: SourceUnitSyntax): void;
        public emitThis(): void;
        public emitBlockOrStatement(node: ISyntaxElement): void;
        public emitLiteralExpression(expression: ISyntaxToken): void;
        public emitThisExpression(expression: ISyntaxToken): void;
        public emitSuperExpression(expression: ISyntaxToken): void;
        private hasTrailingComment(token);
        public emitParenthesizedExpression(parenthesizedExpression: ParenthesizedExpressionSyntax): void;
        public emitCastExpression(expression: CastExpressionSyntax): void;
        public emitPrefixUnaryExpression(expression: PrefixUnaryExpressionSyntax): void;
        public emitPostfixUnaryExpression(expression: PostfixUnaryExpressionSyntax): void;
        public emitTypeOfExpression(expression: TypeOfExpressionSyntax): void;
        public emitDeleteExpression(expression: DeleteExpressionSyntax): void;
        public emitVoidExpression(expression: VoidExpressionSyntax): void;
        private canEmitDottedNameMemberAccessExpression(expression);
        private emitDottedNameMemberAccessExpression(expression);
        private emitDottedNameMemberAccessExpressionRecurse(expression);
        public emitMemberAccessExpression(expression: MemberAccessExpressionSyntax): void;
        public emitQualifiedName(name: QualifiedNameSyntax): void;
        public emitBinaryExpression(expression: BinaryExpressionSyntax): void;
        public emitSimplePropertyAssignment(property: SimplePropertyAssignmentSyntax): void;
        public emitFunctionPropertyAssignment(funcProp: FunctionPropertyAssignmentSyntax): void;
        public emitConditionalExpression(expression: ConditionalExpressionSyntax): void;
        public emitThrowStatement(statement: ThrowStatementSyntax): void;
        public emitExpressionStatement(statement: ExpressionStatementSyntax): void;
        public emitLabeledStatement(statement: LabeledStatementSyntax): void;
        public emitBlock(block: BlockSyntax): void;
        public emitBreakStatement(jump: BreakStatementSyntax): void;
        public emitContinueStatement(jump: ContinueStatementSyntax): void;
        public emitWhileStatement(statement: WhileStatementSyntax): void;
        public emitDoStatement(statement: DoStatementSyntax): void;
        public emitIfStatement(statement: IfStatementSyntax): void;
        public emitElseClause(elseClause: ElseClauseSyntax): void;
        public emitReturnStatement(statement: ReturnStatementSyntax): void;
        public emitForInStatement(statement: ForInStatementSyntax): void;
        public emitForStatement(statement: ForStatementSyntax): void;
        public emitWithStatement(statement: WithStatementSyntax): void;
        public emitSwitchStatement(statement: SwitchStatementSyntax): void;
        public emitCaseSwitchClause(clause: CaseSwitchClauseSyntax): void;
        private emitSwitchClauseBody(colonToken, body);
        public emitDefaultSwitchClause(clause: DefaultSwitchClauseSyntax): void;
        public emitTryStatement(statement: TryStatementSyntax): void;
        public emitCatchClause(clause: CatchClauseSyntax): void;
        public emitFinallyClause(clause: FinallyClauseSyntax): void;
        public emitDebuggerStatement(statement: DebuggerStatementSyntax): void;
        public emitNumericLiteral(literal: ISyntaxToken): void;
        public emitRegularExpressionLiteral(literal: ISyntaxToken): void;
        public emitStringLiteral(literal: ISyntaxToken): void;
        public emitEqualsValueClause(clause: EqualsValueClauseSyntax): void;
        private emitParameter(parameter);
        public emitConstructorDeclaration(declaration: ConstructorDeclarationSyntax): void;
        public shouldEmitFunctionDeclaration(declaration: FunctionDeclarationSyntax): boolean;
        public emitFunctionDeclaration(declaration: FunctionDeclarationSyntax): void;
        private emitSourceUnit(sourceUnit);
        public shouldEmitEnumDeclaration(declaration: EnumDeclarationSyntax): boolean;
        public emitEnumDeclaration(declaration: EnumDeclarationSyntax): void;
        public shouldEmitModuleDeclaration(declaration: ModuleDeclarationSyntax): boolean;
        private emitModuleDeclaration(declaration);
        public shouldEmitClassDeclaration(declaration: ClassDeclarationSyntax): boolean;
        public emitClassDeclaration(declaration: ClassDeclarationSyntax): void;
        public shouldEmitInterfaceDeclaration(declaration: InterfaceDeclarationSyntax): boolean;
        public emitInterfaceDeclaration(declaration: InterfaceDeclarationSyntax): void;
        private firstVariableDeclarator(statement);
        private isNotAmbientOrHasInitializer(variableStatement);
        public shouldEmitVariableStatement(statement: VariableStatementSyntax): boolean;
        public emitVariableStatement(statement: VariableStatementSyntax): void;
        public emitGenericType(type: GenericTypeSyntax): void;
        private shouldEmit(ast);
        private emit(ast);
        private emitWorker(ast);
    }
    function getLastConstructor(classDecl: ClassDeclarationSyntax): ConstructorDeclarationSyntax;
    function getTrimmedTextLines(comment: Comment): string[];
}
declare module TypeScript {
    class MemberName {
        public prefix: string;
        public suffix: string;
        public isString(): boolean;
        public isArray(): boolean;
        public isMarker(): boolean;
        public toString(): string;
        static memberNameToString(memberName: MemberName, markerInfo?: number[], markerBaseLength?: number): string;
        static create(text: string): MemberName;
        static create(entry: MemberName, prefix: string, suffix: string): MemberName;
    }
    class MemberNameString extends MemberName {
        public text: string;
        constructor(text: string);
        public isString(): boolean;
    }
    class MemberNameArray extends MemberName {
        public delim: string;
        public entries: MemberName[];
        public isArray(): boolean;
        public add(entry: MemberName): void;
        public addAll(entries: MemberName[]): void;
        constructor();
    }
}
declare module TypeScript {
    function stripStartAndEndQuotes(str: string): string;
    function isSingleQuoted(str: string): boolean;
    function isDoubleQuoted(str: string): boolean;
    function isQuoted(str: string): boolean;
    function quoteStr(str: string): string;
    function switchToForwardSlashes(path: string): string;
    function trimModName(modName: string): string;
    function getDeclareFilePath(fname: string): string;
    function isTSFile(fname: string): boolean;
    function isDTSFile(fname: string): boolean;
    function getPrettyName(modPath: string, quote?: boolean, treatAsFileName?: boolean): any;
    function getPathComponents(path: string): string[];
    function getRelativePathToFixedPath(fixedModFilePath: string, absoluteModPath: string, isAbsoultePathURL?: boolean): string;
    function changePathToDTS(modPath: string): string;
    function isRelative(path: string): boolean;
    function isRooted(path: string): boolean;
    function getRootFilePath(outFname: string): string;
    function filePathComponents(fullPath: string): string[];
    function filePath(fullPath: string): string;
    function convertToDirectoryPath(dirPath: string): string;
    function normalizePath(path: string): string;
}
declare module TypeScript {
    interface IFileReference extends ILineAndCharacter {
        path: string;
        isResident: boolean;
        position: number;
        length: number;
    }
}
declare module TypeScript {
    interface IPreProcessedFileInfo {
        referencedFiles: IFileReference[];
        importedFiles: IFileReference[];
        diagnostics: Diagnostic[];
        isLibFile: boolean;
    }
    var tripleSlashReferenceRegExp: RegExp;
    function preProcessFile(fileName: string, sourceText: IScriptSnapshot, readImportFiles?: boolean): IPreProcessedFileInfo;
    function getReferencedFiles(fileName: string, sourceText: IScriptSnapshot): IFileReference[];
}
declare module TypeScript {
    interface IResolvedFile {
        path: string;
        referencedFiles: string[];
        importedFiles: string[];
    }
    interface IReferenceResolverHost {
        getScriptSnapshot(fileName: string): IScriptSnapshot;
        resolveRelativePath(path: string, directory: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        getParentDirectory(path: string): string;
    }
    class ReferenceResolutionResult {
        public resolvedFiles: IResolvedFile[];
        public diagnostics: Diagnostic[];
        public seenNoDefaultLibTag: boolean;
    }
    class ReferenceResolver {
        private useCaseSensitiveFileResolution;
        private inputFileNames;
        private host;
        private visited;
        constructor(inputFileNames: string[], host: IReferenceResolverHost, useCaseSensitiveFileResolution: boolean);
        static resolve(inputFileNames: string[], host: IReferenceResolverHost, useCaseSensitiveFileResolution: boolean): ReferenceResolutionResult;
        public resolveInputFiles(): ReferenceResolutionResult;
        private resolveIncludedFile(path, referenceLocation, resolutionResult);
        private resolveImportedFile(path, referenceLocation, resolutionResult);
        private resolveFile(normalizedPath, resolutionResult);
        private getNormalizedFilePath(path, parentFilePath);
        private getUniqueFileId(filePath);
        private recordVisitedFile(filePath);
        private isVisited(filePath);
        private isSameFile(filePath1, filePath2);
    }
}
declare module TypeScript {
    class TextWriter {
        private name;
        private writeByteOrderMark;
        private outputFileType;
        private contents;
        public onNewLine: boolean;
        constructor(name: string, writeByteOrderMark: boolean, outputFileType: OutputFileType);
        public Write(s: string): void;
        public WriteLine(s: string): void;
        public Close(): void;
        public getOutputFile(): OutputFile;
    }
    class DeclarationEmitter {
        private emittingFileName;
        public document: Document;
        private compiler;
        private emitOptions;
        private semanticInfoChain;
        private declFile;
        private indenter;
        private emittedReferencePaths;
        constructor(emittingFileName: string, document: Document, compiler: TypeScriptCompiler, emitOptions: EmitOptions, semanticInfoChain: SemanticInfoChain);
        public getOutputFile(): OutputFile;
        public emitDeclarations(sourceUnit: SourceUnitSyntax): void;
        private emitDeclarationsForList(list);
        private emitSeparatedList(list);
        private emitDeclarationsForAST(ast);
        private getIndentString(declIndent?);
        private emitIndent();
        private canEmitDeclarations(declAST);
        private getDeclFlagsString(pullDecl, typeString);
        private emitDeclFlags(declarationAST, typeString);
        private emitTypeNamesMember(memberName, emitIndent?);
        private emitTypeSignature(ast, type);
        private emitComment(comment);
        private text();
        private emitDeclarationComments(ast, endLine?);
        private writeDeclarationComments(declComments, endLine?);
        private emitTypeOfVariableDeclaratorOrParameter(boundDecl);
        private emitPropertySignature(varDecl);
        private emitVariableDeclarator(varDecl, isFirstVarInList, isLastVarInList);
        private emitClassElementModifiers(modifiers);
        private emitDeclarationsForMemberVariableDeclaration(varDecl);
        private emitDeclarationsForVariableStatement(variableStatement);
        private emitDeclarationsForVariableDeclaration(variableDeclaration);
        private parameterIsOptional(parameter);
        private emitParameter(argDecl, isPrivate);
        private isOverloadedCallSignature(funcDecl);
        private emitDeclarationsForConstructorDeclaration(funcDecl);
        private emitParameterList(isPrivate, parameterList);
        private emitParameters(isPrivate, parameterList);
        private emitMemberFunctionDeclaration(funcDecl);
        private emitCallSignature(funcDecl);
        private emitConstructSignature(funcDecl);
        private emitMethodSignature(funcDecl);
        private emitDeclarationsForFunctionDeclaration(funcDecl);
        private emitIndexMemberDeclaration(funcDecl);
        private emitIndexSignature(funcDecl);
        private emitBaseList(bases, useExtendsList);
        private emitAccessorDeclarationComments(funcDecl);
        private emitDeclarationsForGetAccessor(funcDecl);
        private emitDeclarationsForSetAccessor(funcDecl);
        private emitMemberAccessorDeclaration(funcDecl, modifiers, name);
        private emitClassMembersFromConstructorDefinition(funcDecl);
        private emitDeclarationsForClassDeclaration(classDecl);
        private emitHeritageClauses(clauses);
        private emitHeritageClause(clause);
        static getEnclosingContainer(ast: ISyntaxElement): ISyntaxElement;
        private emitTypeParameters(typeParams, funcSignature?);
        private emitDeclarationsForInterfaceDeclaration(interfaceDecl);
        private emitDeclarationsForImportDeclaration(importDeclAST);
        private emitDeclarationsForEnumDeclaration(moduleDecl);
        private emitDeclarationsForModuleDeclaration(moduleDecl);
        private emitDeclarationsForExportAssignment(ast);
        private resolveScriptReference(document, reference);
        private emitReferencePaths(sourceUnit);
        private emitDeclarationsForSourceUnit(sourceUnit);
    }
}
declare module TypeScript {
    class BloomFilter {
        private bitArray;
        private hashFunctionCount;
        static falsePositiveProbability: number;
        constructor(expectedCount: number);
        static computeM(expectedCount: number): number;
        static computeK(expectedCount: number): number;
        private computeHash(key, seed);
        public addKeys(keys: IIndexable<any>): void;
        public add(value: string): void;
        public probablyContains(value: string): boolean;
        public isEquivalent(filter: BloomFilter): boolean;
        static isEquivalent(array1: boolean[], array2: boolean[]): boolean;
    }
}
declare module TypeScript {
    class IdentifierWalker extends SyntaxWalker {
        public list: IIndexable<boolean>;
        constructor(list: IIndexable<boolean>);
        public visitToken(token: ISyntaxToken): void;
    }
}
declare module TypeScript {
    class CompilationSettings {
        public propagateEnumConstants: boolean;
        public removeComments: boolean;
        public watch: boolean;
        public noResolve: boolean;
        public allowAutomaticSemicolonInsertion: boolean;
        public noImplicitAny: boolean;
        public noLib: boolean;
        public codeGenTarget: LanguageVersion;
        public moduleGenTarget: ModuleGenTarget;
        public outFileOption: string;
        public outDirOption: string;
        public mapSourceFiles: boolean;
        public mapRoot: string;
        public sourceRoot: string;
        public generateDeclarationFiles: boolean;
        public useCaseSensitiveFileResolution: boolean;
        public gatherDiagnostics: boolean;
        public codepage: number;
    }
    class ImmutableCompilationSettings {
        private static _defaultSettings;
        private _propagateEnumConstants;
        private _removeComments;
        private _watch;
        private _noResolve;
        private _allowAutomaticSemicolonInsertion;
        private _noImplicitAny;
        private _noLib;
        private _codeGenTarget;
        private _moduleGenTarget;
        private _outFileOption;
        private _outDirOption;
        private _mapSourceFiles;
        private _mapRoot;
        private _sourceRoot;
        private _generateDeclarationFiles;
        private _useCaseSensitiveFileResolution;
        private _gatherDiagnostics;
        private _codepage;
        public propagateEnumConstants(): boolean;
        public removeComments(): boolean;
        public watch(): boolean;
        public noResolve(): boolean;
        public allowAutomaticSemicolonInsertion(): boolean;
        public noImplicitAny(): boolean;
        public noLib(): boolean;
        public codeGenTarget(): LanguageVersion;
        public moduleGenTarget(): ModuleGenTarget;
        public outFileOption(): string;
        public outDirOption(): string;
        public mapSourceFiles(): boolean;
        public mapRoot(): string;
        public sourceRoot(): string;
        public generateDeclarationFiles(): boolean;
        public useCaseSensitiveFileResolution(): boolean;
        public gatherDiagnostics(): boolean;
        public codepage(): number;
        constructor(propagateEnumConstants: boolean, removeComments: boolean, watch: boolean, noResolve: boolean, allowAutomaticSemicolonInsertion: boolean, noImplicitAny: boolean, noLib: boolean, codeGenTarget: LanguageVersion, moduleGenTarget: ModuleGenTarget, outFileOption: string, outDirOption: string, mapSourceFiles: boolean, mapRoot: string, sourceRoot: string, generateDeclarationFiles: boolean, useCaseSensitiveFileResolution: boolean, gatherDiagnostics: boolean, codepage: number);
        static defaultSettings(): ImmutableCompilationSettings;
        static fromCompilationSettings(settings: CompilationSettings): ImmutableCompilationSettings;
        public toCompilationSettings(): any;
    }
    function settingsChangeAffectsSyntax(before: ImmutableCompilationSettings, after: ImmutableCompilationSettings): boolean;
}
declare module TypeScript {
    enum PullElementFlags {
        None = 0,
        Exported = 1,
        Private = 2,
        Public = 4,
        Ambient = 8,
        Static = 16,
        Optional = 128,
        Signature = 2048,
        Enum = 4096,
        ArrowFunction = 8192,
        ClassConstructorVariable = 16384,
        InitializedModule = 32768,
        InitializedDynamicModule = 65536,
        MustCaptureThis = 262144,
        DeclaredInAWithBlock = 2097152,
        HasReturnStatement = 4194304,
        PropertyParameter = 8388608,
        IsAnnotatedWithAny = 16777216,
        HasDefaultArgs = 33554432,
        ConstructorParameter = 67108864,
        ImplicitVariable = 118784,
        SomeInitializedModule = 102400,
    }
    function hasModifier(modifiers: ISyntaxToken[], flag: PullElementFlags): boolean;
    enum PullElementKind {
        None = 0,
        Global = 0,
        Script = 1,
        Primitive = 2,
        Container = 4,
        Class = 8,
        Interface = 16,
        DynamicModule = 32,
        Enum = 64,
        TypeAlias = 128,
        ObjectLiteral = 256,
        Variable = 512,
        CatchVariable = 1024,
        Parameter = 2048,
        Property = 4096,
        TypeParameter = 8192,
        Function = 16384,
        ConstructorMethod = 32768,
        Method = 65536,
        FunctionExpression = 131072,
        GetAccessor = 262144,
        SetAccessor = 524288,
        CallSignature = 1048576,
        ConstructSignature = 2097152,
        IndexSignature = 4194304,
        ObjectType = 8388608,
        FunctionType = 16777216,
        ConstructorType = 33554432,
        EnumMember = 67108864,
        WithBlock = 134217728,
        CatchBlock = 268435456,
        All = 536869887,
        SomeFunction = 1032192,
        SomeValue = 68147712,
        SomeType = 58728795,
        AcceptableAlias = 59753052,
        SomeContainer = 164,
        SomeSignature = 7340032,
        SomeTypeReference = 58720272,
        SomeInstantiatableType = 8216,
    }
}
declare module TypeScript {
    interface IASTForDeclMap {
        _getASTForDecl(decl: PullDecl): ISyntaxElement;
    }
    class PullDecl {
        public kind: PullElementKind;
        public name: string;
        private declDisplayName;
        public declID: number;
        public flags: PullElementFlags;
        private declGroups;
        private childDecls;
        private typeParameters;
        private synthesizedValDecl;
        private containerDecl;
        public childDeclTypeCache: IIndexable<PullDecl[]>;
        public childDeclValueCache: IIndexable<PullDecl[]>;
        public childDeclNamespaceCache: IIndexable<PullDecl[]>;
        public childDeclTypeParameterCache: IIndexable<PullDecl[]>;
        constructor(declName: string, displayName: string, kind: PullElementKind, declFlags: PullElementFlags);
        public getASTForDeclMap(): IASTForDeclMap;
        public fileName(): string;
        public getParentPath(): PullDecl[];
        public getParentDecl(): PullDecl;
        public isExternalModule(): boolean;
        public getEnclosingDecl(): PullDecl;
        public _getEnclosingDeclFromParentDecl(): PullDecl;
        public getDisplayName(): string;
        public setSymbol(symbol: PullSymbol, semanticInfoChain: SemanticInfoChain): void;
        public ensureSymbolIsBound(semanticInfoChain: SemanticInfoChain): void;
        public getSymbol(semanticInfoChain: SemanticInfoChain): PullSymbol;
        public hasSymbol(semanticInfoChain: SemanticInfoChain): boolean;
        public setSignatureSymbol(signatureSymbol: PullSignatureSymbol, semanticInfoChain: SemanticInfoChain): void;
        public getSignatureSymbol(semanticInfoChain: SemanticInfoChain): PullSignatureSymbol;
        public hasSignatureSymbol(semanticInfoChain: SemanticInfoChain): boolean;
        public setFlags(flags: PullElementFlags): void;
        public setFlag(flags: PullElementFlags): void;
        public setValueDecl(valDecl: PullDecl): void;
        public getValueDecl(): PullDecl;
        public getContainerDecl(): PullDecl;
        private getChildDeclCache(declKind);
        public addChildDecl(childDecl: PullDecl): void;
        public searchChildDecls(declName: string, searchKind: PullElementKind): PullDecl[];
        public getChildDecls(): PullDecl[];
        public getTypeParameters(): PullDecl[];
        public addVariableDeclToGroup(decl: PullDecl): void;
        public getVariableDeclGroups(): PullDecl[][];
        public hasBeenBound(semanticInfoChain: SemanticInfoChain): boolean;
        public isSynthesized(): boolean;
        public ast(): ISyntaxElement;
        public isRootDecl(): void;
    }
    class RootPullDecl extends PullDecl {
        private astToDeclMap;
        private _isExternalModule;
        private _fileName;
        constructor(astToDeclMap: IASTForDeclMap, name: string, fileName: string, kind: PullElementKind, declFlags: PullElementFlags, isExternalModule: boolean);
        public fileName(): string;
        public getASTForDeclMap(): IASTForDeclMap;
        public getParentPath(): PullDecl[];
        public getParentDecl(): PullDecl;
        public isExternalModule(): boolean;
        public getEnclosingDecl(): RootPullDecl;
        public isRootDecl(): boolean;
    }
    class NormalPullDecl extends PullDecl {
        private parentDecl;
        public _rootDecl: RootPullDecl;
        private parentPath;
        constructor(declName: string, displayName: string, kind: PullElementKind, declFlags: PullElementFlags, parentDecl: PullDecl, addToParent?: boolean);
        public fileName(): string;
        public getASTForDeclMap(): IASTForDeclMap;
        public getParentDecl(): PullDecl;
        public getParentPath(): PullDecl[];
        public isExternalModule(): boolean;
        public getEnclosingDecl(): PullDecl;
        public isRootDecl(): boolean;
    }
    class PullEnumElementDecl extends NormalPullDecl {
        public constantValue: number;
        constructor(declName: string, displayName: string, parentDecl: PullDecl);
    }
    class PullFunctionExpressionDecl extends NormalPullDecl {
        private functionExpressionName;
        constructor(expressionName: string, declFlags: PullElementFlags, parentDecl: PullDecl, displayName?: string);
        public getFunctionExpressionName(): string;
    }
    class PullSynthesizedDecl extends NormalPullDecl {
        constructor(declName: string, displayName: string, kind: PullElementKind, declFlags: PullElementFlags, parentDecl: PullDecl);
        public isSynthesized(): boolean;
        public fileName(): string;
    }
    class PullDeclGroup {
        public name: string;
        private _decls;
        constructor(name: string);
        public addDecl(decl: PullDecl): void;
        public getDecls(): PullDecl[];
    }
}
declare module TypeScript {
    var pullSymbolID: number;
    var sentinelEmptyArray: any[];
    class PullSymbol {
        public semanticInfoChain: SemanticInfoChain;
        public pullSymbolID: number;
        public name: string;
        public kind: PullElementKind;
        private _container;
        public type: PullTypeSymbol;
        private _declarations;
        public isResolved: boolean;
        public isOptional: boolean;
        public inResolution: boolean;
        private isSynthesized;
        public isVarArg: boolean;
        private rootSymbol;
        private _enclosingSignature;
        private _docComments;
        public isPrinting: boolean;
        public isAny(): boolean;
        public isType(): boolean;
        public isTypeReference(): boolean;
        public isSignature(): boolean;
        public isArrayNamedTypeReference(): boolean;
        public isPrimitive(): boolean;
        public isAccessor(): boolean;
        public isError(): boolean;
        public isInterface(): boolean;
        public isMethod(): boolean;
        public isProperty(): boolean;
        public isAlias(): boolean;
        public isContainer(): boolean;
        constructor(name: string, declKind: PullElementKind, semanticInfoChain: SemanticInfoChain);
        private findAliasedTypeSymbols(scopeSymbol, skipScopeSymbolAliasesLookIn?, lookIntoOnlyExportedAlias?, aliasSymbols?, visitedScopeDeclarations?);
        public getExternalAliasedSymbols(scopeSymbol: PullSymbol): PullTypeAliasSymbol[];
        static _isExternalModuleReferenceAlias(aliasSymbol: PullTypeAliasSymbol): boolean;
        private getExportedInternalAliasSymbol(scopeSymbol);
        public getAliasSymbolName(scopeSymbol: PullSymbol, aliasNameGetter: (symbol: PullTypeAliasSymbol) => string, aliasPartsNameGetter: (symbol: PullTypeAliasSymbol) => string, skipInternalAlias?: boolean): string;
        public _getResolver(): PullTypeResolver;
        public _resolveDeclaredSymbol(): PullSymbol;
        public getName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string;
        public getDisplayName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean, skipInternalAliasName?: boolean): string;
        public getIsSpecialized(): boolean;
        public getRootSymbol(): PullSymbol;
        public setRootSymbol(symbol: PullSymbol): void;
        public isRootSymbol(): boolean;
        public setIsSynthesized(value?: boolean): void;
        public getIsSynthesized(): any;
        public setEnclosingSignature(signature: PullSignatureSymbol): void;
        public getEnclosingSignature(): PullSignatureSymbol;
        public addDeclaration(decl: PullDecl): void;
        public getDeclarations(): PullDecl[];
        public hasDeclaration(decl: PullDecl): boolean;
        public setContainer(containerSymbol: PullTypeSymbol): void;
        public getContainer(): PullTypeSymbol;
        public setResolved(): void;
        public startResolving(): void;
        public setUnresolved(): void;
        public anyDeclHasFlag(flag: PullElementFlags): boolean;
        public allDeclsHaveFlag(flag: PullElementFlags): boolean;
        public pathToRoot(): PullSymbol[];
        private static unqualifiedNameReferencesDifferentSymbolInScope(symbol, scopePath, endScopePathIndex);
        private findQualifyingSymbolPathInScopeSymbol(scopeSymbol);
        public toString(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string;
        public getNamePartForFullName(): string;
        public fullName(scopeSymbol?: PullSymbol): string;
        public getScopedName(scopeSymbol?: PullSymbol, skipTypeParametersInName?: boolean, useConstraintInName?: boolean, skipInternalAliasName?: boolean): string;
        public getScopedNameEx(scopeSymbol?: PullSymbol, skipTypeParametersInName?: boolean, useConstraintInName?: boolean, getPrettyTypeName?: boolean, getTypeParamMarkerInfo?: boolean, skipInternalAliasName?: boolean): MemberName;
        public getTypeName(scopeSymbol?: PullSymbol, getPrettyTypeName?: boolean): string;
        public getTypeNameEx(scopeSymbol?: PullSymbol, getPrettyTypeName?: boolean): MemberName;
        private getTypeNameForFunctionSignature(prefix, scopeSymbol?, getPrettyTypeName?);
        public getNameAndTypeName(scopeSymbol?: PullSymbol): string;
        public getNameAndTypeNameEx(scopeSymbol?: PullSymbol): MemberName;
        static getTypeParameterString(typars: PullTypeSymbol[], scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string;
        static getTypeParameterStringEx(typeParameters: PullTypeSymbol[], scopeSymbol?: PullSymbol, getTypeParamMarkerInfo?: boolean, useConstraintInName?: boolean): MemberNameArray;
        static getIsExternallyVisible(symbol: PullSymbol, fromIsExternallyVisibleSymbol: PullSymbol, inIsExternallyVisibleSymbols: PullSymbol[]): boolean;
        public isExternallyVisible(inIsExternallyVisibleSymbols?: PullSymbol[]): boolean;
        private getDocCommentsOfDecl(decl);
        private getDocCommentArray(symbol);
        private static getDefaultConstructorSymbolForDocComments(classSymbol);
        private getDocCommentText(comments);
        private getDocCommentTextValue(comment);
        public docComments(useConstructorAsClass?: boolean): string;
        private getParameterDocCommentText(param, fncDocComments);
        private cleanJSDocComment(content, spacesToRemove?);
        private consumeLeadingSpace(line, startIndex, maxSpacesToRemove?);
        private isSpaceChar(line, index);
        private cleanDocCommentLine(line, jsDocStyleComment, jsDocLineSpaceToRemove?);
    }
    interface InstantiableSymbol {
        getIsSpecialized(): boolean;
        getAllowedToReferenceTypeParameters(): PullTypeParameterSymbol[];
        getTypeParameterSubstitutionMap(): TypeSubstitutionMap;
    }
    class PullSignatureSymbol extends PullSymbol implements InstantiableSymbol {
        private _isDefinition;
        private _memberTypeParameterNameCache;
        private _stringConstantOverload;
        public parameters: PullSymbol[];
        public _typeParameters: PullTypeParameterSymbol[];
        public returnType: PullTypeSymbol;
        public functionType: PullTypeSymbol;
        public hasOptionalParam: boolean;
        public nonOptionalParamCount: number;
        public hasVarArgs: boolean;
        private _allowedToReferenceTypeParameters;
        private _instantiationCache;
        public hasBeenChecked: boolean;
        public inWrapCheck: boolean;
        public inWrapInfiniteExpandingReferenceCheck: boolean;
        private _wrapsTypeParameterCache;
        constructor(kind: PullElementKind, semanticInfoChain: SemanticInfoChain, _isDefinition?: boolean);
        public isDefinition(): boolean;
        public isGeneric(): boolean;
        public addParameter(parameter: PullSymbol, isOptional?: boolean): void;
        public addTypeParameter(typeParameter: PullTypeParameterSymbol): void;
        public addTypeParametersFromReturnType(): void;
        public getTypeParameters(): PullTypeParameterSymbol[];
        public findTypeParameter(name: string): PullTypeParameterSymbol;
        public getTypeParameterSubstitutionMap(): TypeSubstitutionMap;
        public getAllowedToReferenceTypeParameters(): PullTypeParameterSymbol[];
        public getIsInstantiated(): boolean;
        public addSpecialization(specializedVersionOfThisSignature: PullSignatureSymbol, typeArgumentMap: TypeSubstitutionMap): void;
        public getSpecialization(typeArgumentMap: TypeSubstitutionMap): PullSignatureSymbol;
        public isStringConstantOverloadSignature(): boolean;
        public getParameterTypeAtIndex(iParam: number): PullTypeSymbol;
        static getSignatureTypeMemberName(candidateSignature: PullSignatureSymbol, signatures: PullSignatureSymbol[], scopeSymbol: PullSymbol): MemberNameArray;
        static getSignaturesTypeNameEx(signatures: PullSignatureSymbol[], prefix: string, shortform: boolean, brackets: boolean, scopeSymbol?: PullSymbol, getPrettyTypeName?: boolean, candidateSignature?: PullSignatureSymbol): MemberName[];
        public toString(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string;
        public getSignatureTypeNameEx(prefix: string, shortform: boolean, brackets: boolean, scopeSymbol?: PullSymbol, getParamMarkerInfo?: boolean, getTypeParamMarkerInfo?: boolean): MemberNameArray;
        public forAllParameterTypes(length: number, predicate: (parameterType: PullTypeSymbol, iterationIndex: number) => boolean): boolean;
        public forAllCorrespondingParameterTypesInThisAndOtherSignature(otherSignature: PullSignatureSymbol, predicate: (thisSignatureParameterType: PullTypeSymbol, otherSignatureParameterType: PullTypeSymbol, iterationIndex: number) => boolean): boolean;
        public wrapsSomeTypeParameter(typeParameterArgumentMap: TypeSubstitutionMap): boolean;
        public getWrappingTypeParameterID(typeParameterArgumentMap: TypeSubstitutionMap): number;
        public getWrappingTypeParameterIDWorker(typeParameterArgumentMap: TypeSubstitutionMap): number;
        public _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReference(enclosingType: PullTypeSymbol, knownWrapMap: IBitMatrix): boolean;
        public _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceWorker(enclosingType: PullTypeSymbol, knownWrapMap: IBitMatrix): boolean;
    }
    class PullTypeSymbol extends PullSymbol implements InstantiableSymbol {
        private _members;
        private _enclosedMemberTypes;
        private _enclosedMemberContainers;
        private _typeParameters;
        private _allowedToReferenceTypeParameters;
        private _specializedVersionsOfThisType;
        private _arrayVersionOfThisType;
        private _implementedTypes;
        private _extendedTypes;
        private _typesThatExplicitlyImplementThisType;
        private _typesThatExtendThisType;
        private _callSignatures;
        private _allCallSignatures;
        private _constructSignatures;
        private _allConstructSignatures;
        private _indexSignatures;
        private _allIndexSignatures;
        private _allIndexSignaturesOfAugmentedType;
        private _memberNameCache;
        private _enclosedTypeNameCache;
        private _enclosedContainerCache;
        private _typeParameterNameCache;
        private _containedNonMemberNameCache;
        private _containedNonMemberTypeNameCache;
        private _containedNonMemberContainerCache;
        private _simpleInstantiationCache;
        private _complexInstantiationCache;
        private _hasGenericSignature;
        private _hasGenericMember;
        private _hasBaseTypeConflict;
        private _knownBaseTypeCount;
        private _associatedContainerTypeSymbol;
        private _constructorMethod;
        private _hasDefaultConstructor;
        private _functionSymbol;
        private _inMemberTypeNameEx;
        public inSymbolPrivacyCheck: boolean;
        public inWrapCheck: boolean;
        public inWrapInfiniteExpandingReferenceCheck: boolean;
        public typeReference: TypeReferenceSymbol;
        private _widenedType;
        private _wrapsTypeParameterCache;
        constructor(name: string, kind: PullElementKind, semanticInfoChain: SemanticInfoChain);
        private _isArrayNamedTypeReference;
        public isArrayNamedTypeReference(): boolean;
        private computeIsArrayNamedTypeReference();
        public isType(): boolean;
        public isClass(): boolean;
        public isFunction(): boolean;
        public isConstructor(): boolean;
        public isTypeParameter(): boolean;
        public isTypeVariable(): boolean;
        public isError(): boolean;
        public isEnum(): boolean;
        public getTypeParameterSubstitutionMap(): TypeSubstitutionMap;
        public isObject(): boolean;
        public isFunctionType(): boolean;
        public getKnownBaseTypeCount(): number;
        public resetKnownBaseTypeCount(): void;
        public incrementKnownBaseCount(): void;
        public setHasBaseTypeConflict(): void;
        public hasBaseTypeConflict(): boolean;
        public hasMembers(): boolean;
        public setHasGenericSignature(): void;
        public getHasGenericSignature(): boolean;
        public setHasGenericMember(): void;
        public getHasGenericMember(): boolean;
        public setAssociatedContainerType(type: PullTypeSymbol): void;
        public getAssociatedContainerType(): PullTypeSymbol;
        public getArrayType(): PullTypeSymbol;
        public getElementType(): PullTypeSymbol;
        public setArrayType(arrayType: PullTypeSymbol): void;
        public getFunctionSymbol(): PullSymbol;
        public setFunctionSymbol(symbol: PullSymbol): void;
        public findContainedNonMember(name: string): PullSymbol;
        public findContainedNonMemberType(typeName: string, kind?: PullElementKind): PullTypeSymbol;
        public findContainedNonMemberContainer(containerName: string, kind?: PullElementKind): PullTypeSymbol;
        public addMember(memberSymbol: PullSymbol): void;
        public addEnclosedMemberType(enclosedType: PullTypeSymbol): void;
        public addEnclosedMemberContainer(enclosedContainer: PullTypeSymbol): void;
        public addEnclosedNonMember(enclosedNonMember: PullSymbol): void;
        public addEnclosedNonMemberType(enclosedNonMemberType: PullTypeSymbol): void;
        public addEnclosedNonMemberContainer(enclosedNonMemberContainer: PullTypeSymbol): void;
        public addTypeParameter(typeParameter: PullTypeParameterSymbol): void;
        public getMembers(): PullSymbol[];
        public setHasDefaultConstructor(hasOne?: boolean): void;
        public getHasDefaultConstructor(): boolean;
        public getConstructorMethod(): PullSymbol;
        public setConstructorMethod(constructorMethod: PullSymbol): void;
        public getTypeParameters(): PullTypeParameterSymbol[];
        public getAllowedToReferenceTypeParameters(): PullTypeParameterSymbol[];
        public isGeneric(): boolean;
        private canUseSimpleInstantiationCache(typeArgumentMap);
        private getSimpleInstantiationCacheId(typeArgumentMap);
        public addSpecialization(specializedVersionOfThisType: PullTypeSymbol, typeArgumentMap: TypeSubstitutionMap): void;
        public getSpecialization(typeArgumentMap: TypeSubstitutionMap): PullTypeSymbol;
        public getKnownSpecializations(): PullTypeSymbol[];
        public getTypeArguments(): PullTypeSymbol[];
        public getTypeArgumentsOrTypeParameters(): PullTypeSymbol[];
        private addCallOrConstructSignaturePrerequisiteBase(signature);
        private addCallSignaturePrerequisite(callSignature);
        public appendCallSignature(callSignature: PullSignatureSymbol): void;
        public insertCallSignatureAtIndex(callSignature: PullSignatureSymbol, index: number): void;
        private addConstructSignaturePrerequisite(constructSignature);
        public appendConstructSignature(constructSignature: PullSignatureSymbol): void;
        public insertConstructSignatureAtIndex(constructSignature: PullSignatureSymbol, index: number): void;
        public addIndexSignature(indexSignature: PullSignatureSymbol): void;
        public hasOwnCallSignatures(): boolean;
        public getOwnCallSignatures(): PullSignatureSymbol[];
        public getCallSignatures(): PullSignatureSymbol[];
        public hasOwnConstructSignatures(): boolean;
        public getOwnDeclaredConstructSignatures(): PullSignatureSymbol[];
        public getConstructSignatures(): PullSignatureSymbol[];
        public hasOwnIndexSignatures(): boolean;
        public getOwnIndexSignatures(): PullSignatureSymbol[];
        public getIndexSignatures(): PullSignatureSymbol[];
        public getIndexSignaturesOfAugmentedType(resolver: PullTypeResolver, globalFunctionInterface: PullTypeSymbol, globalObjectInterface: PullTypeSymbol): PullSignatureSymbol[];
        private getBaseClassConstructSignatures(baseType);
        private getDefaultClassConstructSignature();
        public addImplementedType(implementedType: PullTypeSymbol): void;
        public getImplementedTypes(): PullTypeSymbol[];
        public addExtendedType(extendedType: PullTypeSymbol): void;
        public getExtendedTypes(): PullTypeSymbol[];
        public addTypeThatExtendsThisType(type: PullTypeSymbol): void;
        public getTypesThatExtendThisType(): PullTypeSymbol[];
        public addTypeThatExplicitlyImplementsThisType(type: PullTypeSymbol): void;
        public getTypesThatExplicitlyImplementThisType(): PullTypeSymbol[];
        public hasBase(potentialBase: PullTypeSymbol, visited?: PullSymbol[]): boolean;
        public isValidBaseKind(baseType: PullTypeSymbol, isExtendedType: boolean): boolean;
        public findMember(name: string, lookInParent: boolean): PullSymbol;
        public findNestedType(name: string, kind?: PullElementKind): PullTypeSymbol;
        public findNestedContainer(name: string, kind?: PullElementKind): PullTypeSymbol;
        public getAllMembers(searchDeclKind: PullElementKind, memberVisiblity: GetAllMembersVisiblity): PullSymbol[];
        public findTypeParameter(name: string): PullTypeParameterSymbol;
        public setResolved(): void;
        public getNamePartForFullName(): string;
        public getScopedName(scopeSymbol?: PullSymbol, skipTypeParametersInName?: boolean, useConstraintInName?: boolean, skipInternalAliasName?: boolean): string;
        public isNamedTypeSymbol(): boolean;
        public toString(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string;
        public getScopedNameEx(scopeSymbol?: PullSymbol, skipTypeParametersInName?: boolean, useConstraintInName?: boolean, getPrettyTypeName?: boolean, getTypeParamMarkerInfo?: boolean, skipInternalAliasName?: boolean, shouldAllowArrayType?: boolean): MemberName;
        public hasOnlyOverloadCallSignatures(): boolean;
        public getTypeOfSymbol(): PullSymbol;
        private getMemberTypeNameEx(topLevel, scopeSymbol?, getPrettyTypeName?);
        public getGenerativeTypeClassification(enclosingType: PullTypeSymbol): GenerativeTypeClassification;
        public wrapsSomeTypeParameter(typeParameterArgumentMap: CandidateInferenceInfo[]): boolean;
        public wrapsSomeTypeParameter(typeParameterArgumentMap: TypeSubstitutionMap, skipTypeArgumentCheck?: boolean): boolean;
        public getWrappingTypeParameterID(typeParameterArgumentMap: TypeSubstitutionMap, skipTypeArgumentCheck?: boolean): number;
        private getWrappingTypeParameterIDWorker(typeParameterArgumentMap, skipTypeArgumentCheck);
        private getWrappingTypeParameterIDFromSignatures(signatures, typeParameterArgumentMap);
        public wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReference(enclosingType: PullTypeSymbol): boolean;
        public _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceRecurse(enclosingType: PullTypeSymbol, knownWrapMap: IBitMatrix): boolean;
        private _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceWorker(enclosingType, knownWrapMap);
        private _wrapsSomeTypeParameterIntoInfinitelyExpandingTypeReferenceStructure(enclosingType, knownWrapMap);
        public widenedType(resolver: PullTypeResolver, ast: ISyntaxElement, context: PullTypeResolutionContext): PullTypeSymbol;
    }
    class PullPrimitiveTypeSymbol extends PullTypeSymbol {
        constructor(name: string, semanticInfoChain: SemanticInfoChain);
        public isAny(): boolean;
        public isNull(): boolean;
        public isUndefined(): boolean;
        public isStringConstant(): boolean;
        public setUnresolved(): void;
        public getDisplayName(): string;
    }
    class PullStringConstantTypeSymbol extends PullPrimitiveTypeSymbol {
        constructor(name: string, semanticInfoChain: SemanticInfoChain);
        public isStringConstant(): boolean;
    }
    class PullErrorTypeSymbol extends PullPrimitiveTypeSymbol {
        public _anyType: PullTypeSymbol;
        constructor(_anyType: PullTypeSymbol, name: string, semanticInfoChain: SemanticInfoChain);
        public isError(): boolean;
        public _getResolver(): PullTypeResolver;
        public getName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string;
        public getDisplayName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean, skipInternalAliasName?: boolean): string;
        public toString(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string;
    }
    class PullContainerSymbol extends PullTypeSymbol {
        public instanceSymbol: PullSymbol;
        private assignedValue;
        private assignedType;
        private assignedContainer;
        constructor(name: string, kind: PullElementKind, semanticInfoChain: SemanticInfoChain);
        public isContainer(): boolean;
        public setInstanceSymbol(symbol: PullSymbol): void;
        public getInstanceSymbol(): PullSymbol;
        public setExportAssignedValueSymbol(symbol: PullSymbol): void;
        public getExportAssignedValueSymbol(): PullSymbol;
        public setExportAssignedTypeSymbol(type: PullTypeSymbol): void;
        public getExportAssignedTypeSymbol(): PullTypeSymbol;
        public setExportAssignedContainerSymbol(container: PullContainerSymbol): void;
        public getExportAssignedContainerSymbol(): PullContainerSymbol;
        public hasExportAssignment(): boolean;
        static usedAsSymbol(containerSymbol: PullSymbol, symbol: PullSymbol): boolean;
        public getInstanceType(): PullTypeSymbol;
    }
    class PullTypeAliasSymbol extends PullTypeSymbol {
        private _assignedValue;
        private _assignedType;
        private _assignedContainer;
        private _isUsedAsValue;
        private _typeUsedExternally;
        private _isUsedInExportAlias;
        private retrievingExportAssignment;
        private linkedAliasSymbols;
        constructor(name: string, semanticInfoChain: SemanticInfoChain);
        public isUsedInExportedAlias(): boolean;
        public typeUsedExternally(): boolean;
        public isUsedAsValue(): boolean;
        public setTypeUsedExternally(): void;
        public setIsUsedInExportedAlias(): void;
        public addLinkedAliasSymbol(contingentValueSymbol: PullTypeAliasSymbol): void;
        public setIsUsedAsValue(): void;
        public assignedValue(): PullSymbol;
        public assignedType(): PullTypeSymbol;
        public assignedContainer(): PullContainerSymbol;
        public isAlias(): boolean;
        public isContainer(): boolean;
        public setAssignedValueSymbol(symbol: PullSymbol): void;
        public getExportAssignedValueSymbol(): PullSymbol;
        public setAssignedTypeSymbol(type: PullTypeSymbol): void;
        public getExportAssignedTypeSymbol(): PullTypeSymbol;
        public setAssignedContainerSymbol(container: PullContainerSymbol): void;
        public getExportAssignedContainerSymbol(): PullContainerSymbol;
        public getMembers(): PullSymbol[];
        public getCallSignatures(): PullSignatureSymbol[];
        public getConstructSignatures(): PullSignatureSymbol[];
        public getIndexSignatures(): PullSignatureSymbol[];
        public findMember(name: string): PullSymbol;
        public findNestedType(name: string): PullTypeSymbol;
        public findNestedContainer(name: string): PullTypeSymbol;
        public getAllMembers(searchDeclKind: PullElementKind, memberVisibility: GetAllMembersVisiblity): PullSymbol[];
    }
    class PullTypeParameterSymbol extends PullTypeSymbol {
        private _constraint;
        constructor(name: string, semanticInfoChain: SemanticInfoChain);
        public isTypeParameter(): boolean;
        public setConstraint(constraintType: PullTypeSymbol): void;
        public getConstraint(): PullTypeSymbol;
        public getBaseConstraint(semanticInfoChain: SemanticInfoChain): PullTypeSymbol;
        private getConstraintRecursively(visitedTypeParameters);
        public getDefaultConstraint(semanticInfoChain: SemanticInfoChain): PullTypeSymbol;
        public getCallSignatures(): PullSignatureSymbol[];
        public getConstructSignatures(): PullSignatureSymbol[];
        public getIndexSignatures(): PullSignatureSymbol[];
        public isGeneric(): boolean;
        public fullName(scopeSymbol?: PullSymbol): string;
        public getName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean): string;
        public getDisplayName(scopeSymbol?: PullSymbol, useConstraintInName?: boolean, skipInternalAliasName?: boolean): string;
        public isExternallyVisible(inIsExternallyVisibleSymbols?: PullSymbol[]): boolean;
    }
    class PullAccessorSymbol extends PullSymbol {
        private _getterSymbol;
        private _setterSymbol;
        constructor(name: string, semanticInfoChain: SemanticInfoChain);
        public isAccessor(): boolean;
        public setSetter(setter: PullSymbol): void;
        public getSetter(): PullSymbol;
        public setGetter(getter: PullSymbol): void;
        public getGetter(): PullSymbol;
    }
    function getIDForTypeSubstitutions(instantiatingType: PullTypeSymbol, typeArgumentMap: TypeSubstitutionMap): string;
    function getIDForTypeSubstitutions(instantiatingSignature: PullSignatureSymbol, typeArgumentMap: TypeSubstitutionMap): string;
    enum GetAllMembersVisiblity {
        all = 0,
        internallyVisible = 1,
        externallyVisible = 2,
    }
}
declare module TypeScript {
    class EnclosingTypeWalkerState {
        public _hasSetEnclosingType: boolean;
        public _currentSymbols: PullSymbol[];
        static getDefaultEnclosingTypeWalkerState(): EnclosingTypeWalkerState;
        static getNonGenericEnclosingTypeWalkerState(): EnclosingTypeWalkerState;
        static getGenericEnclosingTypeWalkerState(genericEnclosingType: PullTypeSymbol): EnclosingTypeWalkerState;
    }
    class PullTypeEnclosingTypeWalker {
        private semanticInfoChain;
        private static _defaultEnclosingTypeWalkerState;
        private static _nonGenericEnclosingTypeWalkerState;
        private enclosingTypeWalkerState;
        constructor(semanticInfoChain: SemanticInfoChain);
        private setDefaultTypeWalkerState();
        private setNonGenericEnclosingTypeWalkerState();
        private canSymbolOrDeclBeUsedAsEnclosingTypeHelper(name, kind);
        private canDeclBeUsedAsEnclosingType(decl);
        private canSymbolBeUsedAsEnclosingType(symbol);
        public getEnclosingType(): PullTypeSymbol;
        public _canWalkStructure(): boolean;
        public _getCurrentSymbol(): PullSymbol;
        public getGenerativeClassification(): GenerativeTypeClassification;
        private _pushSymbol(symbol);
        private _popSymbol();
        private setSymbolAsEnclosingType(type);
        private _setEnclosingTypeOfParentDecl(decl, setSignature);
        public setEnclosingTypeForSymbol(symbol: PullSymbol): EnclosingTypeWalkerState;
        public startWalkingType(symbol: PullTypeSymbol): EnclosingTypeWalkerState;
        public endWalkingType(stateWhenStartedWalkingTypes: EnclosingTypeWalkerState): void;
        public walkMemberType(memberName: string, resolver: PullTypeResolver): void;
        public postWalkMemberType(): void;
        public walkSignature(kind: PullElementKind, index: number): void;
        public postWalkSignature(): void;
        public walkTypeArgument(index: number): void;
        public postWalkTypeArgument(): void;
        public walkTypeParameterConstraint(index: number): void;
        public postWalkTypeParameterConstraint(): void;
        public walkReturnType(): void;
        public postWalkReturnType(): void;
        public walkParameterType(iParam: number): void;
        public postWalkParameterType(): void;
        public getBothKindOfIndexSignatures(resolver: PullTypeResolver, context: PullTypeResolutionContext, includeAugmentedType: boolean): IndexSignatureInfo;
        public walkIndexSignatureReturnType(indexSigInfo: IndexSignatureInfo, useStringIndexSignature: boolean, onlySignature?: boolean): void;
        public postWalkIndexSignatureReturnType(onlySignature?: boolean): void;
        public resetEnclosingTypeWalkerState(): EnclosingTypeWalkerState;
        public setEnclosingTypeWalkerState(enclosingTypeWalkerState: EnclosingTypeWalkerState): void;
    }
}
declare module TypeScript {
    class CandidateInferenceInfo {
        public typeParameter: PullTypeParameterSymbol;
        public _inferredTypeAfterFixing: PullTypeSymbol;
        public inferenceCandidates: PullTypeSymbol[];
        public addCandidate(candidate: PullTypeSymbol): void;
        public isFixed(): boolean;
        public fixTypeParameter(resolver: PullTypeResolver, context: PullTypeResolutionContext): void;
    }
    class TypeArgumentInferenceContext {
        public resolver: PullTypeResolver;
        public context: PullTypeResolutionContext;
        public signatureBeingInferred: PullSignatureSymbol;
        public inferenceCache: IBitMatrix;
        public candidateCache: CandidateInferenceInfo[];
        constructor(resolver: PullTypeResolver, context: PullTypeResolutionContext, signatureBeingInferred: PullSignatureSymbol);
        public alreadyRelatingTypes(objectType: PullTypeSymbol, parameterType: PullTypeSymbol): boolean;
        public resetRelationshipCache(): void;
        public addInferenceRoot(param: PullTypeParameterSymbol): void;
        public getInferenceInfo(param: PullTypeParameterSymbol): CandidateInferenceInfo;
        public addCandidateForInference(param: PullTypeParameterSymbol, candidate: PullTypeSymbol): void;
        public inferTypeArguments(): PullTypeSymbol[];
        public fixTypeParameter(typeParameter: PullTypeParameterSymbol): void;
        public _finalizeInferredTypeArguments(): PullTypeSymbol[];
        public isInvocationInferenceContext(): boolean;
    }
    class InvocationTypeArgumentInferenceContext extends TypeArgumentInferenceContext {
        public argumentList: ArgumentListSyntax;
        constructor(resolver: PullTypeResolver, context: PullTypeResolutionContext, signatureBeingInferred: PullSignatureSymbol, argumentList: ArgumentListSyntax);
        public isInvocationInferenceContext(): boolean;
        public inferTypeArguments(): PullTypeSymbol[];
    }
    class ContextualSignatureInstantiationTypeArgumentInferenceContext extends TypeArgumentInferenceContext {
        private contextualSignature;
        private shouldFixContextualSignatureParameterTypes;
        constructor(resolver: PullTypeResolver, context: PullTypeResolutionContext, signatureBeingInferred: PullSignatureSymbol, contextualSignature: PullSignatureSymbol, shouldFixContextualSignatureParameterTypes: boolean);
        public isInvocationInferenceContext(): boolean;
        public inferTypeArguments(): PullTypeSymbol[];
    }
    class PullContextualTypeContext {
        public contextualType: PullTypeSymbol;
        public provisional: boolean;
        public isInferentiallyTyping: boolean;
        public typeArgumentInferenceContext: TypeArgumentInferenceContext;
        public provisionallyTypedSymbols: PullSymbol[];
        public hasProvisionalErrors: boolean;
        private astSymbolMap;
        constructor(contextualType: PullTypeSymbol, provisional: boolean, isInferentiallyTyping: boolean, typeArgumentInferenceContext: TypeArgumentInferenceContext);
        public recordProvisionallyTypedSymbol(symbol: PullSymbol): void;
        public invalidateProvisionallyTypedSymbols(): void;
        public setSymbolForAST(ast: ISyntaxElement, symbol: PullSymbol): void;
        public getSymbolForAST(ast: ISyntaxElement): PullSymbol;
    }
    class PullTypeResolutionContext {
        private resolver;
        public inTypeCheck: boolean;
        public fileName: string;
        private contextStack;
        private typeCheckedNodes;
        private enclosingTypeWalker1;
        private enclosingTypeWalker2;
        constructor(resolver: PullTypeResolver, inTypeCheck?: boolean, fileName?: string);
        public setTypeChecked(ast: ISyntaxElement): void;
        public canTypeCheckAST(ast: ISyntaxElement): boolean;
        private _pushAnyContextualType(type, provisional, isInferentiallyTyping, argContext);
        public pushNewContextualType(type: PullTypeSymbol): void;
        public propagateContextualType(type: PullTypeSymbol): void;
        public pushInferentialType(type: PullTypeSymbol, typeArgumentInferenceContext: TypeArgumentInferenceContext): void;
        public pushProvisionalType(type: PullTypeSymbol): void;
        public popAnyContextualType(): PullContextualTypeContext;
        public hasProvisionalErrors(): boolean;
        public getContextualType(): PullTypeSymbol;
        public fixAllTypeParametersReferencedByType(type: PullTypeSymbol, resolver: PullTypeResolver, argContext?: TypeArgumentInferenceContext): PullTypeSymbol;
        private getCurrentTypeArgumentInferenceContext();
        public isInferentiallyTyping(): boolean;
        public inProvisionalResolution(): boolean;
        private inBaseTypeResolution;
        public isInBaseTypeResolution(): boolean;
        public startBaseTypeResolution(): boolean;
        public doneBaseTypeResolution(wasInBaseTypeResolution: boolean): void;
        public setTypeInContext(symbol: PullSymbol, type: PullTypeSymbol): void;
        public postDiagnostic(diagnostic: Diagnostic): void;
        public typeCheck(): boolean;
        public setSymbolForAST(ast: ISyntaxElement, symbol: PullSymbol): void;
        public getSymbolForAST(ast: ISyntaxElement): PullSymbol;
        public startWalkingTypes(symbol1: PullTypeSymbol, symbol2: PullTypeSymbol): {
            stateWhenStartedWalkingTypes1: EnclosingTypeWalkerState;
            stateWhenStartedWalkingTypes2: EnclosingTypeWalkerState;
        };
        public endWalkingTypes(statesWhenStartedWalkingTypes: {
            stateWhenStartedWalkingTypes1: EnclosingTypeWalkerState;
            stateWhenStartedWalkingTypes2: EnclosingTypeWalkerState;
        }): void;
        public setEnclosingTypeForSymbols(symbol1: PullSymbol, symbol2: PullSymbol): {
            enclosingTypeWalkerState1: EnclosingTypeWalkerState;
            enclosingTypeWalkerState2: EnclosingTypeWalkerState;
        };
        public walkMemberTypes(memberName: string): void;
        public postWalkMemberTypes(): void;
        public walkSignatures(kind: PullElementKind, index: number, index2?: number): void;
        public postWalkSignatures(): void;
        public walkTypeParameterConstraints(index: number): void;
        public postWalkTypeParameterConstraints(): void;
        public walkTypeArgument(index: number): void;
        public postWalkTypeArgument(): void;
        public walkReturnTypes(): void;
        public postWalkReturnTypes(): void;
        public walkParameterTypes(iParam: number): void;
        public postWalkParameterTypes(): void;
        public getBothKindOfIndexSignatures(includeAugmentedType1: boolean, includeAugmentedType2: boolean): {
            indexSigs1: IndexSignatureInfo;
            indexSigs2: IndexSignatureInfo;
        };
        public walkIndexSignatureReturnTypes(indexSigs: {
            indexSigs1: IndexSignatureInfo;
            indexSigs2: IndexSignatureInfo;
        }, useStringIndexSignature1: boolean, useStringIndexSignature2: boolean, onlySignature?: boolean): void;
        public postWalkIndexSignatureReturnTypes(onlySignature?: boolean): void;
        public swapEnclosingTypeWalkers(): void;
        public oneOfClassificationsIsInfinitelyExpanding(): boolean;
        public resetEnclosingTypeWalkerStates(): {
            enclosingTypeWalkerState1: EnclosingTypeWalkerState;
            enclosingTypeWalkerState2: EnclosingTypeWalkerState;
        };
        public setEnclosingTypeWalkerStates(enclosingTypeWalkerStates: {
            enclosingTypeWalkerState1: EnclosingTypeWalkerState;
            enclosingTypeWalkerState2: EnclosingTypeWalkerState;
        }): void;
    }
}
declare module TypeScript {
    interface IPullTypeCollection {
        getLength(): number;
        getTypeAtIndex(index: number): PullTypeSymbol;
    }
    class PullAdditionalCallResolutionData {
        public targetSymbol: PullSymbol;
        public resolvedSignatures: PullSignatureSymbol[];
        public candidateSignature: PullSignatureSymbol;
        public actualParametersContextTypeSymbols: PullTypeSymbol[];
        public diagnosticsFromOverloadResolution: Diagnostic[];
    }
    class PullAdditionalObjectLiteralResolutionData {
        public membersContextTypeSymbols: PullTypeSymbol[];
    }
    interface IndexSignatureInfo {
        numericSignature: PullSignatureSymbol;
        stringSignature: PullSignatureSymbol;
    }
    class PullTypeResolver {
        private compilationSettings;
        public semanticInfoChain: SemanticInfoChain;
        private _cachedArrayInterfaceType;
        private _cachedNumberInterfaceType;
        private _cachedStringInterfaceType;
        private _cachedBooleanInterfaceType;
        private _cachedObjectInterfaceType;
        private _cachedFunctionInterfaceType;
        private _cachedIArgumentsInterfaceType;
        private _cachedRegExpInterfaceType;
        private _cachedAnyTypeArgs;
        private typeCheckCallBacks;
        private postTypeCheckWorkitems;
        private _cachedFunctionArgumentsSymbol;
        private assignableCache;
        private subtypeCache;
        private identicalCache;
        private inResolvingOtherDeclsWalker;
        constructor(compilationSettings: ImmutableCompilationSettings, semanticInfoChain: SemanticInfoChain);
        private cachedArrayInterfaceType();
        public getArrayNamedType(): PullTypeSymbol;
        private cachedNumberInterfaceType();
        private cachedStringInterfaceType();
        private cachedBooleanInterfaceType();
        private cachedObjectInterfaceType();
        private cachedFunctionInterfaceType();
        private cachedIArgumentsInterfaceType();
        private cachedRegExpInterfaceType();
        private cachedFunctionArgumentsSymbol();
        private getApparentType(type);
        private setTypeChecked(ast, context);
        private canTypeCheckAST(ast, context);
        private setSymbolForAST(ast, symbol, context);
        private getSymbolForAST(ast, context);
        public getASTForDecl(decl: PullDecl): ISyntaxElement;
        public getNewErrorTypeSymbol(name?: string): PullErrorTypeSymbol;
        public getEnclosingDecl(decl: PullDecl): PullDecl;
        private getExportedMemberSymbol(symbol, parent);
        public _getNamedPropertySymbolOfAugmentedType(symbolName: string, parent: PullTypeSymbol): PullSymbol;
        private getNamedPropertySymbol(symbolName, declSearchKind, parent);
        private getSymbolFromDeclPath(symbolName, declPath, declSearchKind);
        private getVisibleDeclsFromDeclPath(declPath, declSearchKind);
        private addFilteredDecls(decls, declSearchKind, result);
        public getVisibleDecls(enclosingDecl: PullDecl): PullDecl[];
        public getVisibleContextSymbols(enclosingDecl: PullDecl, context: PullTypeResolutionContext): PullSymbol[];
        public getVisibleMembersFromExpression(expression: ISyntaxElement, enclosingDecl: PullDecl, context: PullTypeResolutionContext): PullSymbol[];
        private isAnyOrEquivalent(type);
        private resolveExternalModuleReference(idText, currentFileName);
        public resolveDeclaredSymbol<TSymbol extends PullSymbol>(symbol: TSymbol, context?: PullTypeResolutionContext): TSymbol;
        private resolveDeclaredSymbolWorker<TSymbol extends PullSymbol>(symbol, context);
        private resolveOtherDecl(otherDecl, context);
        private resolveOtherDeclarations(astName, context);
        private resolveSourceUnit(sourceUnit, context);
        private typeCheckSourceUnit(sourceUnit, context);
        private verifyUniquenessOfImportNamesInSourceUnit(sourceUnit);
        private resolveEnumDeclaration(ast, context);
        private typeCheckEnumDeclaration(ast, context);
        private postTypeCheckEnumDeclaration(ast, context);
        private checkInitializersInEnumDeclarations(decl, context);
        private resolveModuleDeclaration(ast, context);
        private ensureAllSymbolsAreBound(containerSymbol);
        private resolveModuleSymbol(containerSymbol, context, moduleDeclAST, moduleDeclNameAST, sourceUnitAST);
        private resolveFirstExportAssignmentStatement(moduleElements, context);
        private resolveSingleModuleDeclaration(ast, astName, context);
        private typeCheckModuleDeclaration(ast, context);
        private typeCheckSingleModuleDeclaration(ast, astName, context);
        private verifyUniquenessOfImportNamesInModule(decl);
        private checkUniquenessOfImportNames(decls, doesNameExistOutside?);
        private scanVariableDeclarationGroups(enclosingDecl, firstDeclHandler, subsequentDeclHandler?);
        private postTypeCheckModuleDeclaration(ast, context);
        private isTypeRefWithoutTypeArgs(term);
        public createInstantiatedType(type: PullTypeSymbol, typeArguments: PullTypeSymbol[]): PullTypeSymbol;
        private resolveReferenceTypeDeclaration(classOrInterface, name, heritageClauses, context);
        private resolveClassDeclaration(classDeclAST, context);
        private typeCheckTypeParametersOfTypeDeclaration(classOrInterface, context);
        private typeCheckClassDeclaration(classDeclAST, context);
        private postTypeCheckClassDeclaration(classDeclAST, context);
        private resolveTypeSymbolSignatures(typeSymbol, context);
        private resolveInterfaceDeclaration(interfaceDeclAST, context);
        private typeCheckInterfaceDeclaration(interfaceDeclAST, context);
        private checkInterfaceDeclForIdenticalTypeParameters(interfaceDeclAST, context);
        private checkTypeForDuplicateIndexSignatures(enclosingTypeSymbol);
        private filterSymbol(symbol, kind, enclosingDecl, context);
        private getMemberSymbolOfKind(symbolName, kind, pullTypeSymbol, enclosingDecl, context);
        private resolveIdentifierOfInternalModuleReference(importDecl, identifier, moduleSymbol, enclosingDecl, context);
        private resolveModuleReference(importDecl, moduleNameExpr, enclosingDecl, context, declPath);
        private resolveInternalModuleReference(importStatementAST, context);
        private resolveImportDeclaration(importStatementAST, context);
        private typeCheckImportDeclaration(importStatementAST, context);
        private postTypeCheckImportDeclaration(importStatementAST, context);
        private resolveExportAssignmentStatement(exportAssignmentAST, context);
        private resolveAnyFunctionTypeSignature(funcDeclAST, typeParameters, parameterList, returnTypeAnnotation, context);
        private resolveFunctionTypeSignatureParameter(argDeclAST, signature, enclosingDecl, context);
        private resolveFunctionExpressionParameter(argDeclAST, contextParam, enclosingDecl, context);
        private checkNameForCompilerGeneratedDeclarationCollision(astWithName, isDeclaration, name, context);
        private hasRestParameterCodeGen(someFunctionDecl);
        private checkArgumentsCollides(ast, context);
        private checkIndexOfRestArgumentInitializationCollides(ast, isDeclaration, context);
        private checkExternalModuleRequireExportsCollides(ast, name, context);
        private resolveObjectTypeTypeReference(objectType, context);
        private typeCheckObjectTypeTypeReference(objectType, context);
        private resolveTypeAnnotation(typeAnnotation, context);
        public resolveTypeReference(typeRef: ITypeSyntax, context: PullTypeResolutionContext): PullTypeSymbol;
        private getArrayType(elementType);
        private computeTypeReferenceSymbol(term, context);
        private genericTypeIsUsedWithoutRequiredTypeArguments(typeSymbol, term, context);
        private resolveMemberVariableDeclaration(varDecl, context);
        private resolvePropertySignature(varDecl, context);
        private resolveVariableDeclarator(varDecl, context);
        private resolveParameterList(list, context);
        private resolveParameter(parameter, context);
        private getEnumTypeSymbol(enumElement, context);
        private resolveEnumElement(enumElement, context);
        private typeCheckEnumElement(enumElement, context);
        private resolveEqualsValueClause(clause, isContextuallyTyped, context);
        private resolveVariableDeclaratorOrParameterOrEnumElement(varDeclOrParameter, modifiers, name, typeExpr, init, context);
        private resolveAndTypeCheckVariableDeclarationTypeExpr(varDeclOrParameter, name, typeExpr, context);
        private resolveAndTypeCheckVariableDeclaratorOrParameterInitExpr(varDeclOrParameter, name, typeExpr, init, context, typeExprSymbol);
        private typeCheckPropertySignature(varDecl, context);
        private typeCheckMemberVariableDeclaration(varDecl, context);
        private typeCheckVariableDeclarator(varDecl, context);
        private getContainingConstructorDeclaration(parameter);
        private typeCheckParameter(parameter, context);
        private typeCheckParameterModifiers(parameter, context);
        private typeCheckVariableDeclaratorOrParameterOrEnumElement(varDeclOrParameter, modifiers, name, typeExpr, init, context);
        private isForInVariableDeclarator(ast);
        private checkSuperCaptureVariableCollides(superAST, isDeclaration, context);
        private checkThisCaptureVariableCollides(_thisAST, isDeclaration, context);
        private postTypeCheckVariableDeclaratorOrParameter(varDeclOrParameter, context);
        private resolveTypeParameterDeclaration(typeParameterAST, context);
        private resolveFirstTypeParameterDeclaration(typeParameterSymbol, context);
        private typeCheckTypeParameterDeclaration(typeParameterAST, context);
        private resolveConstraint(constraint, context);
        private resolveFunctionBodyReturnTypes(funcDeclAST, block, bodyExpression, signature, useContextualType, enclosingDecl, context);
        private typeCheckConstructorDeclaration(funcDeclAST, context);
        private constructorHasSuperCall(constructorDecl);
        private typeCheckFunctionExpression(funcDecl, isContextuallyTyped, context);
        private typeCheckCallSignature(funcDecl, context);
        private typeCheckConstructSignature(funcDecl, context);
        private typeCheckMethodSignature(funcDecl, context);
        private typeCheckMemberFunctionDeclaration(funcDecl, context);
        private containsSingleThrowStatement(block);
        private typeCheckAnyFunctionDeclaration(funcDeclAST, isStatic, name, typeParameters, parameters, returnTypeAnnotation, block, context);
        private checkAndReportImplicitAnyOnFunctionSignature(funcDeclAST, funcDeclASTName, context);
        private isPrivateWithinAmbientDeclaration(funcDecl);
        private checkThatNonVoidFunctionHasReturnExpressionOrThrowStatement(functionDecl, returnTypeAnnotation, returnTypeSymbol, block, context);
        private typeCheckIndexSignature(funcDeclAST, context);
        private postTypeCheckFunctionDeclaration(funcDeclAST, context);
        private resolveReturnTypeAnnotationOfFunctionDeclaration(funcDeclAST, returnTypeAnnotation, context);
        private resolveMemberFunctionDeclaration(funcDecl, context);
        private resolveCallSignature(funcDecl, context);
        private resolveConstructSignature(funcDecl, context);
        private resolveMethodSignature(funcDecl, context);
        private resolveAnyFunctionDeclaration(funcDecl, context);
        private resolveFunctionExpression(funcDecl, isContextuallyTyped, context);
        private resolveSimpleArrowFunctionExpression(funcDecl, isContextuallyTyped, context);
        private resolveParenthesizedArrowFunctionExpression(funcDecl, isContextuallyTyped, context);
        private getEnclosingClassDeclaration(ast);
        private resolveConstructorDeclaration(funcDeclAST, context);
        private resolveIndexMemberDeclaration(ast, context);
        private resolveIndexSignature(funcDeclAST, context);
        private resolveFunctionDeclaration(funcDeclAST, isStatic, name, typeParameters, parameterList, returnTypeAnnotation, block, context);
        private resolveGetterReturnTypeAnnotation(getterFunctionDeclarationAst, enclosingDecl, context);
        private resolveSetterArgumentTypeAnnotation(setterFunctionDeclarationAst, enclosingDecl, context);
        private resolveAccessorDeclaration(funcDeclAst, context);
        private typeCheckAccessorDeclaration(funcDeclAst, context);
        private resolveGetAccessorDeclaration(funcDeclAST, parameters, returnTypeAnnotation, block, setterAnnotatedType, context);
        private checkIfGetterAndSetterTypeMatch(funcDeclAST, context);
        private typeCheckGetAccessorDeclaration(funcDeclAST, context);
        static hasSetAccessorParameterTypeAnnotation(setAccessor: SetAccessorSyntax): boolean;
        private resolveSetAccessorDeclaration(funcDeclAST, parameterList, context);
        private typeCheckSetAccessorDeclaration(funcDeclAST, context);
        private resolveList(list, context);
        private resolveSeparatedList(list, context);
        private resolveVoidExpression(ast, context);
        private resolveLogicalOperation(ast, context);
        private typeCheckLogicalOperation(binex, context);
        private resolveLogicalNotExpression(ast, context);
        private resolveUnaryArithmeticOperation(ast, context);
        private resolvePostfixUnaryExpression(ast, context);
        private isAnyOrNumberOrEnum(type);
        private typeCheckUnaryArithmeticOperation(unaryExpression, context);
        private typeCheckPostfixUnaryExpression(unaryExpression, context);
        private resolveBinaryArithmeticExpression(binaryExpression, context);
        private typeCheckBinaryArithmeticExpression(binaryExpression, context);
        private resolveTypeOfExpression(ast, context);
        private resolveThrowStatement(ast, context);
        private resolveDeleteExpression(ast, context);
        private resolveInstanceOfExpression(ast, context);
        private typeCheckInstanceOfExpression(binaryExpression, context);
        private resolveCommaExpression(commaExpression, context);
        private resolveInExpression(ast, context);
        private typeCheckInExpression(binaryExpression, context);
        private resolveForStatement(ast, context);
        private resolveForInStatement(forInStatement, context);
        private typeCheckForInStatement(forInStatement, context);
        private resolveWhileStatement(ast, context);
        private typeCheckWhileStatement(ast, context);
        private resolveDoStatement(ast, context);
        private typeCheckDoStatement(ast, context);
        private resolveIfStatement(ast, context);
        private typeCheckIfStatement(ast, context);
        private resolveElseClause(ast, context);
        private typeCheckElseClause(ast, context);
        private resolveBlock(ast, context);
        private resolveVariableStatement(ast, context);
        private resolveVariableDeclarationList(ast, context);
        private resolveWithStatement(ast, context);
        private typeCheckWithStatement(ast, context);
        private resolveTryStatement(ast, context);
        private typeCheckTryStatement(ast, context);
        private resolveCatchClause(ast, context);
        private typeCheckCatchClause(ast, context);
        private resolveFinallyClause(ast, context);
        private typeCheckFinallyClause(ast, context);
        private getEnclosingFunctionDeclaration(ast);
        private resolveReturnExpression(expression, enclosingFunction, context);
        private typeCheckReturnExpression(expression, expressionType, enclosingFunction, context);
        private resolveReturnStatement(returnAST, context);
        private resolveSwitchStatement(ast, context);
        private typeCheckSwitchStatement(ast, context);
        private resolveLabeledStatement(ast, context);
        private typeCheckLabeledStatement(ast, context);
        private resolveContinueStatement(ast, context);
        private typeCheckContinueStatement(ast, context);
        private resolveBreakStatement(ast, context);
        private typeCheckBreakStatement(ast, context);
        public resolveAST(ast: ISyntaxElement, isContextuallyTyped: boolean, context: PullTypeResolutionContext): PullSymbol;
        private resolveExpressionAST(ast, isContextuallyOrInferentiallyTyped, context);
        private resolveExpressionWorker(ast, isContextuallyTyped, context);
        private typeCheckAST(ast, isContextuallyTyped, context);
        private processPostTypeCheckWorkItems(context);
        private postTypeCheck(ast, context);
        private resolveRegularExpressionLiteral();
        private postTypeCheckNameExpression(nameAST, context);
        private typeCheckNameExpression(nameAST, context);
        private resolveNameExpression(nameAST, context);
        private isInEnumDecl(decl);
        private getSomeInnermostFunctionScopeDecl(declPath);
        private isFromFunctionScope(nameSymbol, functionScopeDecl);
        private findConstructorDeclOfEnclosingType(decl);
        private checkNameAsPartOfInitializerExpressionForInstanceMemberVariable(nameAST, nameSymbol, context);
        private computeNameExpression(nameAST, context);
        private getCurrentParameterIndexForFunction(parameter, funcDecl);
        private resolveMemberAccessExpression(dottedNameAST, context);
        private resolveDottedNameExpression(dottedNameAST, expression, name, context);
        private computeDottedNameExpression(expression, name, context, checkSuperPrivateAndStaticAccess);
        private computeDottedNameExpressionFromLHS(lhs, expression, name, context, checkSuperPrivateAndStaticAccess);
        private resolveTypeNameExpression(nameAST, context);
        private computeTypeNameExpression(nameAST, context);
        private isLeftSideOfQualifiedName(ast);
        private resolveGenericTypeReference(genericTypeAST, context);
        private resolveQualifiedName(dottedNameAST, context);
        private isLastNameOfQualifiedModuleNameModuleReference(ast);
        private computeQualifiedName(dottedNameAST, context);
        private shouldContextuallyTypeAnyFunctionExpression(functionExpressionAST, typeParameters, parameters, returnTypeAnnotation, context);
        private resolveAnyFunctionExpression(funcDeclAST, typeParameters, parameters, returnTypeAnnotation, block, bodyExpression, isContextuallyTyped, context);
        private resolveAnyFunctionExpressionParameters(funcDeclAST, typeParameters, parameters, returnTypeAnnotation, isContextuallyTyped, context);
        private typeCheckSimpleArrowFunctionExpression(arrowFunction, isContextuallyTyped, context);
        private typeCheckParenthesizedArrowFunctionExpression(arrowFunction, isContextuallyTyped, context);
        private typeCheckAnyFunctionExpression(funcDeclAST, typeParameters, parameters, returnTypeAnnotation, block, bodyExpression, isContextuallyTyped, context);
        private resolveThisExpression(thisExpression, context);
        private inTypeArgumentList(ast);
        private inClassExtendsHeritageClause(ast);
        private inTypeQuery(ast);
        private inArgumentListOfSuperInvocation(ast);
        private inConstructorParameterList(ast);
        private isFunctionAccessorOrNonArrowFunctionExpression(decl);
        private isFunctionOrNonArrowFunctionExpression(decl);
        private typeCheckThisExpression(thisExpression, context, enclosingDecl);
        private getContextualClassSymbolForEnclosingDecl(ast, enclosingDecl);
        private inStaticMemberVariableDeclaration(ast);
        private resolveSuperExpression(ast, context);
        private typeCheckSuperExpression(ast, context, enclosingDecl);
        private resolveSimplePropertyAssignment(propertyAssignment, isContextuallyTyped, context);
        private resolveFunctionPropertyAssignment(funcProp, isContextuallyTyped, context);
        private typeCheckFunctionPropertyAssignment(funcProp, isContextuallyTyped, context);
        public resolveObjectLiteralExpression(expressionAST: ObjectLiteralExpressionSyntax, isContextuallyTyped: boolean, context: PullTypeResolutionContext, additionalResults?: PullAdditionalObjectLiteralResolutionData): PullSymbol;
        private bindObjectLiteralMembers(objectLiteralDeclaration, objectLiteralTypeSymbol, objectLiteralMembers, isUsingExistingSymbol, pullTypeContext);
        private resolveObjectLiteralMembers(objectLiteralDeclaration, objectLiteralTypeSymbol, objectLiteralContextualType, objectLiteralMembers, stringIndexerSignature, numericIndexerSignature, allMemberTypes, allNumericMemberTypes, boundMemberSymbols, isUsingExistingSymbol, pullTypeContext, additionalResults?);
        private computeObjectLiteralExpression(objectLitAST, isContextuallyTyped, context, additionalResults?);
        private getPropertyAssignmentName(propertyAssignment);
        private stampObjectLiteralWithIndexSignature(objectLiteralSymbol, indexerTypeCandidates, contextualIndexSignature, context);
        private resolveArrayLiteralExpression(arrayLit, isContextuallyTyped, context);
        private computeArrayLiteralExpressionSymbol(arrayLit, isContextuallyTyped, context);
        private resolveElementAccessExpression(callEx, context);
        private typeCheckElementAccessExpression(callEx, context, symbolAndDiagnostic);
        private computeElementAccessExpressionSymbolAndDiagnostic(callEx, context);
        private getBothKindsOfIndexSignaturesIncludingAugmentedType(enclosingType, context);
        private getBothKindsOfIndexSignaturesExcludingAugmentedType(enclosingType, context);
        public _getBothKindsOfIndexSignatures(enclosingType: PullTypeSymbol, context: PullTypeResolutionContext, includeAugmentedType: boolean): IndexSignatureInfo;
        public _addUnhiddenSignaturesFromBaseType(derivedTypeSignatures: PullSignatureSymbol[], baseTypeSignatures: PullSignatureSymbol[], signaturesBeingAggregated: PullSignatureSymbol[]): void;
        private resolveBinaryAdditionOperation(binaryExpression, context);
        private bestCommonTypeOfTwoTypesWithOrWithoutContextualType(contextualType, type1, type2, context);
        private resolveLogicalOrExpression(binex, isContextuallyTyped, context);
        private resolveLogicalAndExpression(binex, context);
        private computeTypeOfConditionalExpression(leftType, rightType, isContextuallyTyped, context);
        private resolveConditionalExpression(trinex, isContextuallyTyped, context);
        private conditionExpressionTypesAreValid(leftType, rightType, expressionType, isContextuallyTyped, context);
        private resolveParenthesizedExpression(ast, context);
        private resolveExpressionStatement(ast, context);
        public resolveInvocationExpression(callEx: InvocationExpressionSyntax, context: PullTypeResolutionContext, additionalResults?: PullAdditionalCallResolutionData): PullSymbol;
        private typeCheckInvocationExpression(callEx, context);
        private computeInvocationExpressionSymbol(callEx, context, additionalResults);
        public resolveObjectCreationExpression(callEx: ObjectCreationExpressionSyntax, context: PullTypeResolutionContext, additionalResults?: PullAdditionalCallResolutionData): PullSymbol;
        private typeCheckObjectCreationExpression(callEx, context);
        private postOverloadResolutionDiagnostics(diagnostic, additionalResults, context);
        private computeObjectCreationExpressionSymbol(callEx, context, additionalResults);
        private instantiateSignatureInContext(signatureAToInstantiate, contextualSignatureB, context, shouldFixContextualSignatureParameterTypes);
        private resolveCastExpression(assertionExpression, context);
        private typeCheckCastExpression(assertionExpression, context, typeAssertionType);
        private resolveAssignmentExpression(binaryExpression, context);
        private getInstanceTypeForAssignment(lhs, type, context);
        public widenType(type: PullTypeSymbol, ast: ISyntaxElement, context: PullTypeResolutionContext): PullTypeSymbol;
        private widenArrayType(type, ast, context);
        private widenObjectLiteralType(type, ast, context);
        private needsToWidenObjectLiteralType(type, ast, context);
        public findBestCommonType(contextualType: PullTypeSymbol, nonContextualCandidates: IPullTypeCollection, context: PullTypeResolutionContext): PullTypeSymbol;
        private typeIsBestCommonTypeCandidate(candidateType, collection, context);
        private typesAreIdenticalInEnclosingTypes(t1, t2, context);
        private typesAreIdenticalWithNewEnclosingTypes(t1, t2, context);
        public typesAreIdentical(t1: PullTypeSymbol, t2: PullTypeSymbol, context: PullTypeResolutionContext): boolean;
        private typesAreIdenticalWorker(t1, t2, context);
        private propertiesAreIdentical(propertySymbol1, propertySymbol2, context);
        private propertiesAreIdenticalWithNewEnclosingTypes(type1, type2, property1, property2, context);
        private signatureGroupsAreIdentical(sg1, sg2, context);
        private constraintsAreIdentical(tp1, tp2, context);
        private setTypeParameterIdentity(tp1, tp2, val);
        public signaturesAreIdenticalWithNewEnclosingTypes(s1: PullSignatureSymbol, s2: PullSignatureSymbol, context: PullTypeResolutionContext, includingReturnType?: boolean): boolean;
        private signaturesAreIdentical(s1, s2, context, includingReturnType?);
        public signaturesAreIdenticalWorker(s1: PullSignatureSymbol, s2: PullSignatureSymbol, context: PullTypeResolutionContext, includingReturnType?: boolean): boolean;
        private signatureConstraints_Parameters_AndReturnTypesAreIdenticalAfterInstantiationToAny(s1, s2, context, includingReturnType?);
        public signatureReturnTypesAreIdentical(s1: PullSignatureSymbol, s2: PullSignatureSymbol, context: PullTypeResolutionContext): boolean;
        private symbolsShareDeclaration(symbol1, symbol2);
        private sourceIsSubtypeOfTarget(source, target, ast, context, comparisonInfo?, isComparingInstantiatedSignatures?);
        private sourceMembersAreAssignableToTargetMembers(source, target, ast, context, comparisonInfo, isComparingInstantiatedSignatures?);
        private sourcePropertyIsAssignableToTargetProperty(source, target, sourceProp, targetProp, ast, context, comparisonInfo, isComparingInstantiatedSignatures?);
        private sourceCallSignaturesAreAssignableToTargetCallSignatures(source, target, ast, context, comparisonInfo, isComparingInstantiatedSignatures?);
        private sourceConstructSignaturesAreAssignableToTargetConstructSignatures(source, target, ast, context, comparisonInfo, isComparingInstantiatedSignatures?);
        private sourceIndexSignaturesAreAssignableToTargetIndexSignatures(source, target, ast, context, comparisonInfo, isComparingInstantiatedSignatures?);
        private typeIsAssignableToFunction(source, ast, context);
        private signatureIsAssignableToTarget(s1, s2, ast, context, comparisonInfo?, isComparingInstantiatedSignatures?);
        private sourceIsAssignableToTarget(source, target, ast, context, comparisonInfo?, isComparingInstantiatedSignatures?);
        private sourceIsAssignableToTargetWithNewEnclosingTypes(source, target, ast, context, comparisonInfo?, isComparingInstantiatedSignatures?);
        private getSymbolForRelationshipCheck(symbol);
        private sourceIsRelatableToTargetInEnclosingTypes(source, target, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private sourceIsRelatableToTargetWithNewEnclosingTypes(source, target, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private sourceIsRelatableToTargetInCache(source, target, comparisonCache, comparisonInfo);
        private sourceIsRelatableToTarget(source, target, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private isSourceTypeParameterConstrainedToTargetTypeParameter(source, target);
        private sourceIsRelatableToTargetWorker(source, target, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private sourceMembersAreRelatableToTargetMembers(source, target, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private infinitelyExpandingSourceTypeIsRelatableToTargetType(sourceType, targetType, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private infinitelyExpandingTypesAreIdentical(sourceType, targetType, context);
        private sourcePropertyIsRelatableToTargetProperty(source, target, sourceProp, targetProp, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private sourceCallSignaturesAreRelatableToTargetCallSignatures(source, target, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private sourceConstructSignaturesAreRelatableToTargetConstructSignatures(source, target, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private sourceIndexSignaturesAreRelatableToTargetIndexSignatures(source, target, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private signatureGroupIsRelatableToTarget(source, target, sourceSG, targetSG, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private signatureIsRelatableToTarget(sourceSig, targetSig, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private signatureIsRelatableToTargetWorker(sourceSig, targetSig, assignableTo, comparisonCache, ast, context, comparisonInfo, isComparingInstantiatedSignatures);
        private resolveOverloads(application, group, haveTypeArgumentsAtCallSite, context, diagnostics);
        private getCallTargetErrorSpanAST(callEx);
        private overloadHasCorrectArity(signature, args);
        private overloadIsApplicable(signature, args, context, comparisonInfo);
        private overloadIsApplicableForArgument(paramType, arg, argIndex, context, comparisonInfo);
        private overloadIsApplicableForAnyFunctionExpressionArgument(paramType, arg, typeParameters, parameters, returnTypeAnnotation, block, bodyExpression, argIndex, context, comparisonInfo);
        private overloadIsApplicableForObjectLiteralArgument(paramType, arg, argIndex, context, comparisonInfo);
        private overloadIsApplicableForArrayLiteralArgument(paramType, arg, argIndex, context, comparisonInfo);
        private overloadIsApplicableForOtherArgument(paramType, arg, argIndex, context, comparisonInfo);
        private overloadIsApplicableForArgumentHelper(paramType, argSym, argumentIndex, comparisonInfo, arg, context);
        private inferArgumentTypesForSignature(argContext, comparisonInfo, context);
        private typeParametersAreInScopeAtArgumentList(typeParameters, args);
        private relateTypeToTypeParametersInEnclosingType(expressionType, parameterType, argContext, context);
        public relateTypeToTypeParametersWithNewEnclosingTypes(expressionType: PullTypeSymbol, parameterType: PullTypeSymbol, argContext: TypeArgumentInferenceContext, context: PullTypeResolutionContext): void;
        public relateTypeToTypeParameters(expressionType: PullTypeSymbol, parameterType: PullTypeSymbol, argContext: TypeArgumentInferenceContext, context: PullTypeResolutionContext): void;
        private relateTypeArgumentsOfTypeToTypeParameters(expressionType, parameterType, argContext, context);
        private relateInifinitelyExpandingTypeToTypeParameters(expressionType, parameterType, argContext, context);
        private relateFunctionSignatureToTypeParameters(expressionSignature, parameterSignature, argContext, context);
        private relateObjectTypeToTypeParameters(objectType, parameterType, argContext, context);
        private relateSignatureGroupToTypeParameters(argumentSignatures, parameterSignatures, signatureKind, argContext, context);
        private alterPotentialGenericFunctionTypeToInstantiatedFunctionTypeForTypeArgumentInference(expressionSymbol, context);
        private isFunctionTypeWithExactlyOneCallSignatureAndNoOtherMembers(type, callSignatureShouldBeGeneric);
        public instantiateTypeToAny(typeToSpecialize: PullTypeSymbol, context: PullTypeResolutionContext): PullTypeSymbol;
        public instantiateSignatureToAny(signature: PullSignatureSymbol): PullSignatureSymbol;
        static globalTypeCheckPhase: number;
        static typeCheck(compilationSettings: ImmutableCompilationSettings, semanticInfoChain: SemanticInfoChain, document: Document): void;
        private validateVariableDeclarationGroups(enclosingDecl, context);
        private typeCheckFunctionOverloads(funcDecl, context, signature?, allSignatures?);
        private checkSymbolPrivacy(declSymbol, symbol, privacyErrorReporter);
        private checkTypePrivacyOfSignatures(declSymbol, signatures, privacyErrorReporter);
        private typeParameterOfTypeDeclarationPrivacyErrorReporter(classOrInterface, typeParameterAST, typeParameter, symbol, context);
        private baseListPrivacyErrorReporter(classOrInterface, declSymbol, baseAst, isExtendedType, symbol, context);
        private variablePrivacyErrorReporter(declAST, declSymbol, symbol, context);
        private checkFunctionTypePrivacy(funcDeclAST, isStatic, typeParameters, parameters, returnTypeAnnotation, block, context);
        private functionTypeArgumentArgumentTypePrivacyErrorReporter(declAST, isStatic, typeParameterAST, typeParameter, symbol, context);
        private functionArgumentTypePrivacyErrorReporter(declAST, isStatic, parameters, argIndex, paramSymbol, symbol, context);
        private functionReturnTypePrivacyErrorReporter(declAST, isStatic, returnTypeAnnotation, block, funcReturnType, symbol, context);
        private enclosingClassIsDerived(classDecl);
        private isSuperInvocationExpression(ast);
        private isSuperInvocationExpressionStatement(node);
        private getFirstStatementOfBlockOrNull(block);
        private superCallMustBeFirstStatementInConstructor(constructorDecl);
        private checkForThisCaptureInArrowFunction(expression);
        private typeCheckMembersAgainstIndexer(containerType, containerTypeDecl, context);
        private determineRelevantIndexerForMember(member, numberIndexSignature, stringIndexSignature);
        private reportErrorThatMemberIsNotSubtypeOfIndexer(member, indexSignature, astForError, context, comparisonInfo);
        private typeCheckIfTypeMemberPropertyOkToOverride(typeSymbol, extendedType, typeMember, extendedTypeMember, enclosingDecl, comparisonInfo);
        private typeCheckIfTypeExtendsType(classOrInterface, name, typeSymbol, extendedType, enclosingDecl, context);
        private typeCheckIfClassImplementsType(classDecl, classSymbol, implementedType, enclosingDecl, context);
        private computeValueSymbolFromAST(valueDeclAST, context);
        private hasClassTypeSymbolConflictAsValue(baseDeclAST, typeSymbol, enclosingDecl, context);
        private typeCheckBase(classOrInterface, name, typeSymbol, baseDeclAST, isExtendedType, enclosingDecl, context);
        private typeCheckBases(classOrInterface, name, heritageClauses, typeSymbol, enclosingDecl, context);
        private checkTypeCompatibilityBetweenBases(name, typeSymbol, context);
        private checkNamedPropertyIdentityBetweenBases(interfaceName, interfaceSymbol, baseTypeSymbol, inheritedMembersMap, context);
        private checkIndexSignatureIdentityBetweenBases(interfaceName, interfaceSymbol, baseTypeSymbol, allInheritedSignatures, derivedTypeHasOwnNumberSignature, derivedTypeHasOwnStringSignature, context);
        private checkInheritedMembersAgainstInheritedIndexSignatures(interfaceName, interfaceSymbol, inheritedIndexSignatures, inheritedMembers, context);
        private checkThatInheritedNumberSignatureIsSubtypeOfInheritedStringSignature(interfaceName, interfaceSymbol, inheritedIndexSignatures, context);
        private checkAssignability(ast, source, target, context);
        private isReference(ast, astSymbol);
        private checkForSuperMemberAccess(expression, name, resolvedName, context);
        private getEnclosingDeclForAST(ast);
        private getEnclosingSymbolForAST(ast);
        private checkForPrivateMemberAccess(name, expressionType, resolvedName, context);
        public instantiateType(type: PullTypeSymbol, typeParameterArgumentMap: TypeSubstitutionMap): PullTypeSymbol;
        public instantiateSignature(signature: PullSignatureSymbol, typeParameterSubstitutionMap: TypeSubstitutionMap): PullSignatureSymbol;
        public getOrCreateSignatureWithSubstitution(signature: PullSignatureSymbol, typeParameterSubstitutionMap: TypeSubstitutionMap): PullSignatureSymbol;
        private getOrCreateSignatureWithSubstitutionOrInstantiation(signature, typeParameterSubstitutionMap, isInstantiation);
        private checkFunctionOverloadChains(parent, moduleElements);
        private checkClassOverloadChains(node);
        private checkForReservedName(parent, name, diagnosticKey);
        private checkForMultipleExportAssignments(moduleElements);
        private checkForDisallowedExports(moduleElements);
    }
    class TypeComparisonInfo {
        public onlyCaptureFirstError: boolean;
        public message: string;
        public stringConstantVal: ISyntaxElement;
        private indent;
        constructor(sourceComparisonInfo?: TypeComparisonInfo, useSameIndent?: boolean);
        private indentString();
        public addMessage(message: string): void;
    }
    function getPropertyAssignmentNameTextFromIdentifier(identifier: ISyntaxElement): {
        actualText: string;
        memberName: string;
    };
    function isTypesOnlyLocation(ast: ISyntaxElement): boolean;
}
declare module TypeScript {
    var declCacheHit: number;
    var declCacheMiss: number;
    var symbolCacheHit: number;
    var symbolCacheMiss: number;
    class SemanticInfoChain {
        private compiler;
        private logger;
        private static EmptyASTToDeclMap;
        private documents;
        private fileNameToDocument;
        public anyTypeDecl: PullDecl;
        public booleanTypeDecl: PullDecl;
        public numberTypeDecl: PullDecl;
        public stringTypeDecl: PullDecl;
        public nullTypeDecl: PullDecl;
        public undefinedTypeDecl: PullDecl;
        public voidTypeDecl: PullDecl;
        public undefinedValueDecl: PullDecl;
        public anyTypeSymbol: PullPrimitiveTypeSymbol;
        public booleanTypeSymbol: PullPrimitiveTypeSymbol;
        public numberTypeSymbol: PullPrimitiveTypeSymbol;
        public stringTypeSymbol: PullPrimitiveTypeSymbol;
        public nullTypeSymbol: PullPrimitiveTypeSymbol;
        public undefinedTypeSymbol: PullPrimitiveTypeSymbol;
        public voidTypeSymbol: PullPrimitiveTypeSymbol;
        public undefinedValueSymbol: PullSymbol;
        public emptyTypeSymbol: PullTypeSymbol;
        private astSymbolMap;
        private astAliasSymbolMap;
        private astCallResolutionDataMap;
        private declSymbolMap;
        private declSignatureSymbolMap;
        private declCache;
        private symbolCache;
        private fileNameToDiagnostics;
        private _binder;
        private _resolver;
        private _topLevelDecls;
        private _fileNames;
        constructor(compiler: TypeScriptCompiler, logger: ILogger);
        public getDocument(fileName: string): Document;
        public lineMap(fileName: string): LineMap;
        public fileNames(): string[];
        private bindPrimitiveSymbol<TSymbol extends PullSymbol>(decl, newSymbol);
        private addPrimitiveTypeSymbol(decl);
        private addPrimitiveValueSymbol(decl, type);
        private resetGlobalSymbols();
        public addDocument(document: Document): void;
        public removeDocument(fileName: string): void;
        private getDeclPathCacheID(declPath, declKind);
        public findTopLevelSymbol(name: string, kind: PullElementKind, doNotGoPastThisDecl: PullDecl): PullSymbol;
        private findTopLevelSymbolInDecl(topLevelDecl, name, kind, doNotGoPastThisDecl);
        public findExternalModule(id: string): PullContainerSymbol;
        public findAmbientExternalModuleInGlobalContext(id: string): PullContainerSymbol;
        public findDecls(declPath: string[], declKind: PullElementKind): PullDecl[];
        public findDeclsFromPath(declPath: PullDecl[], declKind: PullElementKind): PullDecl[];
        public findSymbol(declPath: string[], declType: PullElementKind): PullSymbol;
        public cacheGlobalSymbol(symbol: PullSymbol, kind: PullElementKind): void;
        public invalidate(oldSettings?: ImmutableCompilationSettings, newSettings?: ImmutableCompilationSettings): void;
        public setSymbolForAST(ast: ISyntaxElement, symbol: PullSymbol): void;
        public getSymbolForAST(ast: ISyntaxElement): PullSymbol;
        public setAliasSymbolForAST(ast: ISyntaxElement, symbol: PullTypeAliasSymbol): void;
        public getAliasSymbolForAST(ast: ISyntaxElement): PullTypeAliasSymbol;
        public getCallResolutionDataForAST(ast: ISyntaxElement): PullAdditionalCallResolutionData;
        public setCallResolutionDataForAST(ast: ISyntaxElement, callResolutionData: PullAdditionalCallResolutionData): void;
        public setSymbolForDecl(decl: PullDecl, symbol: PullSymbol): void;
        public getSymbolForDecl(decl: PullDecl): PullSymbol;
        public setSignatureSymbolForDecl(decl: PullDecl, signatureSymbol: PullSignatureSymbol): void;
        public getSignatureSymbolForDecl(decl: PullDecl): PullSignatureSymbol;
        public addDiagnostic(diagnostic: Diagnostic): void;
        public getDiagnostics(fileName: string): Diagnostic[];
        public getBinder(): PullSymbolBinder;
        public getResolver(): PullTypeResolver;
        public addSyntheticIndexSignature(containingDecl: PullDecl, containingSymbol: PullTypeSymbol, ast: ISyntaxElement, indexParamName: string, indexParamType: PullTypeSymbol, returnType: PullTypeSymbol): void;
        public getDeclForAST(ast: ISyntaxElement): PullDecl;
        public getEnclosingDecl(ast: ISyntaxElement): PullDecl;
        public setDeclForAST(ast: ISyntaxElement, decl: PullDecl): void;
        public getASTForDecl(decl: PullDecl): ISyntaxElement;
        public setASTForDecl(decl: PullDecl, ast: ISyntaxElement): void;
        public topLevelDecl(fileName: string): PullDecl;
        public topLevelDecls(): PullDecl[];
        public addDiagnosticFromAST(ast: ISyntaxElement, diagnosticKey: string, _arguments?: any[]): void;
        public diagnosticFromAST(ast: ISyntaxElement, diagnosticKey: string, _arguments?: any[]): Diagnostic;
        public diagnosticFromDecl(decl: PullDecl, diagnosticKey: string, _arguments?: any[]): Diagnostic;
        public locationFromAST(ast: ISyntaxElement): Location;
        public duplicateIdentifierDiagnosticFromAST(ast: ISyntaxElement, identifier: string): Diagnostic;
        public addDuplicateIdentifierDiagnosticFromAST(ast: ISyntaxElement, identifier: string): void;
    }
}
declare module TypeScript {
    module DeclarationCreator {
        function create(document: Document, compilationSettings: ImmutableCompilationSettings): PullDecl;
    }
}
declare module TypeScript {
    class PullSymbolBinder {
        private semanticInfoChain;
        private declsBeingBound;
        private inBindingOtherDeclsWalker;
        constructor(semanticInfoChain: SemanticInfoChain);
        private getParent(decl, returnInstanceType?);
        private findDeclsInContext(startingDecl, declKind, searchGlobally);
        private getExistingSymbol(decl, searchKind, parent);
        private checkThatExportsMatch(decl, prevSymbol, reportError?);
        private getIndexForInsertingSignatureAtEndOfEnclosingDeclInSignatureList(signature, currentSignatures);
        private bindEnumDeclarationToPullSymbol(enumContainerDecl);
        private bindEnumIndexerDeclsToPullSymbols(enumContainerSymbol);
        private findExistingVariableSymbolForModuleValueDecl(decl);
        private bindModuleDeclarationToPullSymbol(moduleContainerDecl);
        private bindImportDeclaration(importDeclaration);
        private ensurePriorDeclarationsAreBound(container, currentDecl);
        private bindClassDeclarationToPullSymbol(classDecl);
        private bindInterfaceDeclarationToPullSymbol(interfaceDecl);
        private bindObjectTypeDeclarationToPullSymbol(objectDecl);
        private bindConstructorTypeDeclarationToPullSymbol(constructorTypeDeclaration);
        private bindVariableDeclarationToPullSymbol(variableDeclaration);
        private bindCatchVariableToPullSymbol(variableDeclaration);
        private bindEnumMemberDeclarationToPullSymbol(propertyDeclaration);
        private bindPropertyDeclarationToPullSymbol(propertyDeclaration);
        private bindParameterSymbols(functionDeclaration, parameterList, funcType, signatureSymbol);
        private bindFunctionDeclarationToPullSymbol(functionDeclaration);
        private bindFunctionExpressionToPullSymbol(functionExpressionDeclaration);
        private bindFunctionTypeDeclarationToPullSymbol(functionTypeDeclaration);
        private bindMethodDeclarationToPullSymbol(methodDeclaration);
        private bindStaticPrototypePropertyOfClass(classAST, classTypeSymbol, constructorTypeSymbol);
        private bindConstructorDeclarationToPullSymbol(constructorDeclaration);
        private bindConstructSignatureDeclarationToPullSymbol(constructSignatureDeclaration);
        private bindCallSignatureDeclarationToPullSymbol(callSignatureDeclaration);
        private bindIndexSignatureDeclarationToPullSymbol(indexSignatureDeclaration);
        private bindGetAccessorDeclarationToPullSymbol(getAccessorDeclaration);
        private bindSetAccessorDeclarationToPullSymbol(setAccessorDeclaration);
        private getDeclsToBind(decl);
        private shouldBindDeclaration(decl);
        public bindDeclToPullSymbol(decl: PullDecl): void;
        private bindAllDeclsToPullSymbol(askedDecl);
        private bindSingleDeclToPullSymbol(decl);
    }
}
declare module TypeScript {
    module PullHelpers {
        function resolveDeclaredSymbolToUseType(symbol: PullSymbol): void;
        interface SignatureInfoForFuncDecl {
            signature: PullSignatureSymbol;
            allSignatures: PullSignatureSymbol[];
        }
        function getSignatureForFuncDecl(functionDecl: PullDecl, semanticInfoChain: SemanticInfoChain): {
            signature: PullSignatureSymbol;
            allSignatures: PullSignatureSymbol[];
        };
        function getAccessorSymbol(getterOrSetter: ISyntaxElement, semanticInfoChain: SemanticInfoChain): PullAccessorSymbol;
        function getGetterAndSetterFunction(funcDecl: ISyntaxElement, semanticInfoChain: SemanticInfoChain): {
            getter: GetAccessorSyntax;
            setter: SetAccessorSyntax;
        };
        function symbolIsEnum(source: PullSymbol): boolean;
        function symbolIsModule(symbol: PullSymbol): boolean;
        function isInStaticMemberContext(ast: ISyntaxToken, semanticInfoChain: SemanticInfoChain): boolean;
        function isNameNumeric(name: string): boolean;
        function typeSymbolsAreIdentical(a: PullTypeSymbol, b: PullTypeSymbol): boolean;
        function getRootType(type: PullTypeSymbol): PullTypeSymbol;
        function isSymbolLocal(symbol: PullSymbol): boolean;
        function isExportedSymbolInClodule(symbol: PullSymbol): boolean;
        function isSymbolDeclaredInScopeChain(symbol: PullSymbol, scopeSymbol: PullSymbol): boolean;
        interface PullTypeSymbolStructureWalker {
            memberSymbolWalk(memberSymbol: PullSymbol): boolean;
            callSignatureWalk(signatureSymbol: PullSignatureSymbol): boolean;
            constructSignatureWalk(signatureSymbol: PullSignatureSymbol): boolean;
            indexSignatureWalk(signatureSymbol: PullSignatureSymbol): boolean;
            signatureParameterWalk(parameterSymbol: PullSymbol): boolean;
            signatureReturnTypeWalk(returnType: PullTypeSymbol): boolean;
        }
        function walkPullTypeSymbolStructure(typeSymbol: PullTypeSymbol, walker: PullTypeSymbolStructureWalker): void;
        class OtherPullDeclsWalker {
            private currentlyWalkingOtherDecls;
            public walkOtherPullDecls(currentDecl: PullDecl, otherDecls: PullDecl[], callBack: (otherDecl: PullDecl) => void): void;
        }
    }
}
declare module TypeScript {
    class WrapsTypeParameterCache {
        private _wrapsTypeParameterCache;
        public getWrapsTypeParameter(typeParameterArgumentMap: TypeSubstitutionMap): number;
        public setWrapsTypeParameter(typeParameterArgumentMap: TypeSubstitutionMap, wrappingTypeParameterID: number): void;
    }
    module PullInstantiationHelpers {
        class MutableTypeParameterSubstitutionMap {
            public typeParameterSubstitutionMap: TypeSubstitutionMap;
            public createdDuplicateTypeSubstitutionMap: boolean;
            constructor(typeParameterSubstitutionMap: TypeSubstitutionMap);
            public ensureCopyOfUnderlyingMap(): void;
        }
        function instantiateTypeArgument(resolver: PullTypeResolver, symbol: InstantiableSymbol, mutableTypeParameterMap: MutableTypeParameterSubstitutionMap): void;
        function cleanUpTypeParameterSubstitutionMap(symbol: InstantiableSymbol, mutableTypeParameterSubstitutionMap: MutableTypeParameterSubstitutionMap): void;
        function getAllowedToReferenceTypeParametersFromDecl(decl: PullDecl, semanticInfoChain: SemanticInfoChain): PullTypeParameterSymbol[];
        function createTypeParameterSubstitutionMap(typeParameters: PullTypeParameterSymbol[], typeArguments: PullTypeSymbol[]): TypeSubstitutionMap;
        function updateTypeParameterSubstitutionMap(typeParameters: PullTypeParameterSymbol[], typeArguments: PullTypeSymbol[], typeParameterSubstitutionMap: TypeSubstitutionMap): TypeSubstitutionMap;
        function updateMutableTypeParameterSubstitutionMap(typeParameters: PullTypeParameterSymbol[], typeArguments: PullTypeSymbol[], mutableMap: MutableTypeParameterSubstitutionMap): void;
        function twoTypesAreInstantiationsOfSameNamedGenericType(type1: PullTypeSymbol, type2: PullTypeSymbol): boolean;
    }
}
declare module TypeScript {
    var fileResolutionTime: number;
    var fileResolutionIOTime: number;
    var fileResolutionScanImportsTime: number;
    var fileResolutionImportFileSearchTime: number;
    var fileResolutionGetDefaultLibraryTime: number;
    var sourceCharactersCompiled: number;
    var syntaxTreeParseTime: number;
    var typeCheckTime: number;
    var createDeclarationsTime: number;
    var compilerResolvePathTime: number;
    var compilerDirectoryNameTime: number;
    var compilerDirectoryExistsTime: number;
    var compilerFileExistsTime: number;
    var emitTime: number;
    var emitWriteFileTime: number;
    var declarationEmitTime: number;
    var declarationEmitIsExternallyVisibleTime: number;
    var declarationEmitTypeSignatureTime: number;
    var declarationEmitGetBoundDeclTypeTime: number;
    var declarationEmitIsOverloadedCallSignatureTime: number;
    var declarationEmitFunctionDeclarationGetSymbolTime: number;
    var declarationEmitGetBaseTypeTime: number;
    var declarationEmitGetAccessorFunctionTime: number;
    var declarationEmitGetTypeParameterSymbolTime: number;
    var declarationEmitGetImportDeclarationSymbolTime: number;
    var ioHostResolvePathTime: number;
    var ioHostDirectoryNameTime: number;
    var ioHostCreateDirectoryStructureTime: number;
    var ioHostWriteFileTime: number;
    interface PullSymbolInfo {
        symbol: PullSymbol;
        aliasSymbol: PullTypeAliasSymbol;
        ast: ISyntaxElement;
        enclosingScopeSymbol: PullSymbol;
    }
    interface PullCallSymbolInfo {
        targetSymbol: PullSymbol;
        resolvedSignatures: PullSignatureSymbol[];
        candidateSignature: PullSignatureSymbol;
        isConstructorCall: boolean;
        ast: ISyntaxElement;
        enclosingScopeSymbol: PullSymbol;
    }
    interface PullVisibleSymbolsInfo {
        symbols: PullSymbol[];
        enclosingScopeSymbol: PullSymbol;
    }
    enum EmitOutputResult {
        Succeeded = 0,
        FailedBecauseOfSyntaxErrors = 1,
        FailedBecauseOfCompilerOptionsErrors = 2,
        FailedToGenerateDeclarationsBecauseOfSemanticErrors = 3,
    }
    class EmitOutput {
        public outputFiles: OutputFile[];
        public emitOutputResult: EmitOutputResult;
        constructor(emitOutputResult?: EmitOutputResult);
    }
    enum OutputFileType {
        JavaScript = 0,
        SourceMap = 1,
        Declaration = 2,
    }
    class OutputFile {
        public name: string;
        public writeByteOrderMark: boolean;
        public text: string;
        public fileType: OutputFileType;
        public sourceMapEntries: SourceMapEntry[];
        constructor(name: string, writeByteOrderMark: boolean, text: string, fileType: OutputFileType, sourceMapEntries?: SourceMapEntry[]);
    }
    class CompileResult {
        public diagnostics: Diagnostic[];
        public outputFiles: OutputFile[];
        static fromDiagnostics(diagnostics: Diagnostic[]): CompileResult;
        static fromOutputFiles(outputFiles: OutputFile[]): CompileResult;
    }
    interface ICancellationToken {
        isCancellationRequested(): boolean;
    }
    class OperationCanceledException {
    }
    class CancellationToken {
        private cancellationToken;
        static None: CancellationToken;
        constructor(cancellationToken: ICancellationToken);
        public isCancellationRequested(): boolean;
        public throwIfCancellationRequested(): void;
    }
    interface IDocumentRegistry {
        acquireDocument(fileName: string, compilationSettings: ImmutableCompilationSettings, scriptSnapshot: IScriptSnapshot, byteOrderMark: ByteOrderMark, version: number, isOpen: boolean, referencedFiles: string[]): Document;
        updateDocument(document: Document, fileName: string, compilationSettings: ImmutableCompilationSettings, scriptSnapshot: IScriptSnapshot, version: number, isOpen: boolean, textChangeRange: TextChangeRange): Document;
        releaseDocument(fileName: string, compilationSettings: ImmutableCompilationSettings): void;
    }
    class NonCachingDocumentRegistry implements IDocumentRegistry {
        static Instance: IDocumentRegistry;
        public acquireDocument(fileName: string, compilationSettings: ImmutableCompilationSettings, scriptSnapshot: IScriptSnapshot, byteOrderMark: ByteOrderMark, version: number, isOpen: boolean, referencedFiles?: string[]): Document;
        public updateDocument(document: Document, fileName: string, compilationSettings: ImmutableCompilationSettings, scriptSnapshot: IScriptSnapshot, version: number, isOpen: boolean, textChangeRange: TextChangeRange): Document;
        public releaseDocument(fileName: string, compilationSettings: ImmutableCompilationSettings): void;
    }
    class DocumentRegistry implements IDocumentRegistry {
        private buckets;
        private getKeyFromCompilationSettings(settings);
        private getBucketForCompilationSettings(settings, createIfMissing);
        public reportStats(): string;
        public acquireDocument(fileName: string, compilationSettings: ImmutableCompilationSettings, scriptSnapshot: IScriptSnapshot, byteOrderMark: ByteOrderMark, version: number, isOpen: boolean, referencedFiles?: string[]): Document;
        public updateDocument(document: Document, fileName: string, compilationSettings: ImmutableCompilationSettings, scriptSnapshot: IScriptSnapshot, version: number, isOpen: boolean, textChangeRange: TextChangeRange): Document;
        public releaseDocument(fileName: string, compilationSettings: ImmutableCompilationSettings): void;
    }
    class TypeScriptCompiler {
        public logger: ILogger;
        private _settings;
        private semanticInfoChain;
        constructor(logger?: ILogger, _settings?: ImmutableCompilationSettings);
        public getSemanticInfoChain(): SemanticInfoChain;
        public compilationSettings(): ImmutableCompilationSettings;
        public setCompilationSettings(newSettings: ImmutableCompilationSettings): void;
        public getDocument(fileName: string): Document;
        public cleanupSemanticCache(): void;
        public addOrUpdateFile(document: Document): void;
        public addFile(fileName: string, scriptSnapshot: IScriptSnapshot, byteOrderMark: ByteOrderMark, version: number, isOpen: boolean, referencedFiles?: string[]): void;
        public updateFile(fileName: string, scriptSnapshot: IScriptSnapshot, version: number, isOpen: boolean, textChangeRange: TextChangeRange): void;
        public removeFile(fileName: string): void;
        public mapOutputFileName(document: Document, emitOptions: EmitOptions, extensionChanger: (fname: string, wholeFileNameReplaced: boolean) => string): string;
        private writeByteOrderMarkForDocument(document);
        static mapToDTSFileName(fileName: string, wholeFileNameReplaced: boolean): string;
        public _shouldEmit(document: Document): boolean;
        public _shouldEmitDeclarations(document: Document): boolean;
        private emitDocumentDeclarationsWorker(document, emitOptions, declarationEmitter?);
        public _emitDocumentDeclarations(document: Document, emitOptions: EmitOptions, onSingleFileEmitComplete: (files: OutputFile) => void, sharedEmitter: DeclarationEmitter): DeclarationEmitter;
        public emitAllDeclarations(resolvePath: (path: string) => string): EmitOutput;
        public emitDeclarations(fileName: string, resolvePath: (path: string) => string): EmitOutput;
        public canEmitDeclarations(fileName: string): boolean;
        static mapToFileNameExtension(extension: string, fileName: string, wholeFileNameReplaced: boolean): string;
        static mapToJSFileName(fileName: string, wholeFileNameReplaced: boolean): string;
        private emitDocumentWorker(document, emitOptions, emitter?);
        public _emitDocument(document: Document, emitOptions: EmitOptions, onSingleFileEmitComplete: (files: OutputFile[]) => void, sharedEmitter: Emitter): Emitter;
        public emitAll(resolvePath: (path: string) => string): EmitOutput;
        public emit(fileName: string, resolvePath: (path: string) => string): EmitOutput;
        public compile(resolvePath: (path: string) => string, continueOnDiagnostics?: boolean): Iterator<CompileResult>;
        public getSyntacticDiagnostics(fileName: string): Diagnostic[];
        private getSyntaxTree(fileName);
        private getSourceUnit(fileName);
        public getSemanticDiagnostics(fileName: string): Diagnostic[];
        public getCompilerOptionsDiagnostics(resolvePath: (path: string) => string): Diagnostic[];
        public resolveAllFiles(): void;
        public getSymbolOfDeclaration(decl: PullDecl): PullSymbol;
        private extractResolutionContextFromAST(resolver, ast, document, propagateContextualTypes);
        private extractResolutionContextForVariable(inContextuallyTypedAssignment, propagateContextualTypes, resolver, resolutionContext, enclosingDecl, assigningAST, init);
        private getASTPath(ast);
        public pullGetSymbolInformationFromAST(ast: ISyntaxElement, document: Document): PullSymbolInfo;
        public pullGetCallInformationFromAST(ast: ISyntaxElement, document: Document): PullCallSymbolInfo;
        public pullGetVisibleMemberSymbolsFromAST(ast: ISyntaxElement, document: Document): PullVisibleSymbolsInfo;
        public pullGetVisibleDeclsFromAST(ast: ISyntaxElement, document: Document): PullDecl[];
        public pullGetContextualMembersFromAST(ast: ISyntaxElement, document: Document): PullVisibleSymbolsInfo;
        public pullGetDeclInformation(decl: PullDecl, ast: ISyntaxElement, document: Document): PullSymbolInfo;
        public topLevelDeclaration(fileName: string): PullDecl;
        public getDeclForAST(ast: ISyntaxElement): PullDecl;
        public fileNames(): string[];
        public topLevelDecl(fileName: string): PullDecl;
        private static getLocationText(location, resolvePath);
        static getFullDiagnosticText(diagnostic: Diagnostic, resolvePath: (path: string) => string): string;
    }
    function compareDataObjects(dst: any, src: any): boolean;
}
declare module TypeScript {
    enum GenerativeTypeClassification {
        Unknown = 0,
        Open = 1,
        Closed = 2,
        InfinitelyExpanding = 3,
    }
    interface TypeSubstitutionMap {
        [n: number]: PullTypeSymbol;
    }
    class TypeReferenceSymbol extends PullTypeSymbol {
        public referencedTypeSymbol: PullTypeSymbol;
        static createTypeReference(type: PullTypeSymbol): TypeReferenceSymbol;
        constructor(referencedTypeSymbol: PullTypeSymbol);
        public isTypeReference(): boolean;
        public isResolved: boolean;
        public setResolved(): void;
        public setUnresolved(): void;
        public invalidate(): void;
        public ensureReferencedTypeIsResolved(): void;
        public getReferencedTypeSymbol(): PullTypeSymbol;
        public _getResolver(): PullTypeResolver;
        public hasMembers(): boolean;
        public setAssociatedContainerType(type: PullTypeSymbol): void;
        public getAssociatedContainerType(): PullTypeSymbol;
        public getFunctionSymbol(): PullSymbol;
        public setFunctionSymbol(symbol: PullSymbol): void;
        public addContainedNonMember(nonMember: PullSymbol): void;
        public findContainedNonMemberContainer(containerName: string, kind?: PullElementKind): PullTypeSymbol;
        public addMember(memberSymbol: PullSymbol): void;
        public addEnclosedMemberType(enclosedType: PullTypeSymbol): void;
        public addEnclosedMemberContainer(enclosedContainer: PullTypeSymbol): void;
        public addEnclosedNonMember(enclosedNonMember: PullSymbol): void;
        public addEnclosedNonMemberType(enclosedNonMemberType: PullTypeSymbol): void;
        public addEnclosedNonMemberContainer(enclosedNonMemberContainer: PullTypeSymbol): void;
        public addTypeParameter(typeParameter: PullTypeParameterSymbol): void;
        public addConstructorTypeParameter(typeParameter: PullTypeParameterSymbol): void;
        public findContainedNonMember(name: string): PullSymbol;
        public findContainedNonMemberType(typeName: string, kind?: PullElementKind): PullTypeSymbol;
        public getMembers(): PullSymbol[];
        public setHasDefaultConstructor(hasOne?: boolean): void;
        public getHasDefaultConstructor(): boolean;
        public getConstructorMethod(): PullSymbol;
        public setConstructorMethod(constructorMethod: PullSymbol): void;
        public getTypeParameters(): PullTypeParameterSymbol[];
        public isGeneric(): boolean;
        public addSpecialization(specializedVersionOfThisType: PullTypeSymbol, substitutingTypes: PullTypeSymbol[]): void;
        public getSpecialization(substitutingTypes: PullTypeSymbol[]): PullTypeSymbol;
        public getKnownSpecializations(): PullTypeSymbol[];
        public getTypeArguments(): PullTypeSymbol[];
        public getTypeArgumentsOrTypeParameters(): PullTypeSymbol[];
        public appendCallSignature(callSignature: PullSignatureSymbol): void;
        public insertCallSignatureAtIndex(callSignature: PullSignatureSymbol, index: number): void;
        public appendConstructSignature(callSignature: PullSignatureSymbol): void;
        public insertConstructSignatureAtIndex(callSignature: PullSignatureSymbol, index: number): void;
        public addIndexSignature(indexSignature: PullSignatureSymbol): void;
        public hasOwnCallSignatures(): boolean;
        public getCallSignatures(): PullSignatureSymbol[];
        public hasOwnConstructSignatures(): boolean;
        public getConstructSignatures(): PullSignatureSymbol[];
        public hasOwnIndexSignatures(): boolean;
        public getIndexSignatures(): PullSignatureSymbol[];
        public addImplementedType(implementedType: PullTypeSymbol): void;
        public getImplementedTypes(): PullTypeSymbol[];
        public addExtendedType(extendedType: PullTypeSymbol): void;
        public getExtendedTypes(): PullTypeSymbol[];
        public addTypeThatExtendsThisType(type: PullTypeSymbol): void;
        public getTypesThatExtendThisType(): PullTypeSymbol[];
        public addTypeThatExplicitlyImplementsThisType(type: PullTypeSymbol): void;
        public getTypesThatExplicitlyImplementThisType(): PullTypeSymbol[];
        public isValidBaseKind(baseType: PullTypeSymbol, isExtendedType: boolean): boolean;
        public findMember(name: string, lookInParent?: boolean): PullSymbol;
        public findNestedType(name: string, kind?: PullElementKind): PullTypeSymbol;
        public findNestedContainer(name: string, kind?: PullElementKind): PullTypeSymbol;
        public getAllMembers(searchDeclKind: PullElementKind, memberVisiblity: GetAllMembersVisiblity): PullSymbol[];
        public findTypeParameter(name: string): PullTypeParameterSymbol;
        public hasOnlyOverloadCallSignatures(): boolean;
    }
    var nSpecializationsCreated: number;
    var nSpecializedSignaturesCreated: number;
    var nSpecializedTypeParameterCreated: number;
    class InstantiatedTypeReferenceSymbol extends TypeReferenceSymbol {
        public referencedTypeSymbol: PullTypeSymbol;
        private _typeParameterSubstitutionMap;
        public isInstanceReferenceType: boolean;
        private _instantiatedMembers;
        private _allInstantiatedMemberNameCache;
        private _instantiatedMemberNameCache;
        private _instantiatedCallSignatures;
        private _instantiatedConstructSignatures;
        private _instantiatedIndexSignatures;
        private _typeArgumentReferences;
        private _instantiatedConstructorMethod;
        private _instantiatedAssociatedContainerType;
        private _isArray;
        public getIsSpecialized(): boolean;
        private _generativeTypeClassification;
        public getGenerativeTypeClassification(enclosingType: PullTypeSymbol): GenerativeTypeClassification;
        public isArrayNamedTypeReference(): boolean;
        public getElementType(): PullTypeSymbol;
        public getReferencedTypeSymbol(): PullTypeSymbol;
        static create(resolver: PullTypeResolver, type: PullTypeSymbol, typeParameterSubstitutionMap: TypeSubstitutionMap): InstantiatedTypeReferenceSymbol;
        constructor(referencedTypeSymbol: PullTypeSymbol, _typeParameterSubstitutionMap: TypeSubstitutionMap, isInstanceReferenceType: boolean);
        public isGeneric(): boolean;
        public getTypeParameterSubstitutionMap(): TypeSubstitutionMap;
        public getTypeArguments(): PullTypeSymbol[];
        public getTypeArgumentsOrTypeParameters(): PullTypeSymbol[];
        private populateInstantiatedMemberFromReferencedMember(referencedMember);
        public getMembers(): PullSymbol[];
        public findMember(name: string, lookInParent?: boolean): PullSymbol;
        public getAllMembers(searchDeclKind: PullElementKind, memberVisiblity: GetAllMembersVisiblity): PullSymbol[];
        public getConstructorMethod(): PullSymbol;
        public getAssociatedContainerType(): PullTypeSymbol;
        public getCallSignatures(): PullSignatureSymbol[];
        public getConstructSignatures(): PullSignatureSymbol[];
        private augmentSignatureSubstitutionMapWithSynthesizedTypeParameters(referencedSignature);
        public getIndexSignatures(): PullSignatureSymbol[];
    }
    class InstantiatedSignatureSymbol extends PullSignatureSymbol {
        private _typeParameterSubstitutionMap;
        public getTypeParameterSubstitutionMap(): TypeSubstitutionMap;
        constructor(rootSignature: PullSignatureSymbol, _typeParameterSubstitutionMap: TypeSubstitutionMap);
        public getIsSpecialized(): boolean;
        public getIsInstantiated(): boolean;
        public _getResolver(): PullTypeResolver;
        public getTypeParameters(): PullTypeParameterSymbol[];
        public getAllowedToReferenceTypeParameters(): PullTypeParameterSymbol[];
    }
    class SignatureSymbolWithSubstitution extends PullSignatureSymbol {
        private _typeParameterSubstitutionMap;
        public getTypeParameterSubstitutionMap(): TypeSubstitutionMap;
        constructor(rootSignature: PullSignatureSymbol, _typeParameterSubstitutionMap: TypeSubstitutionMap);
        public getIsSpecialized(): boolean;
        public _getResolver(): PullTypeResolver;
        public getTypeParameters(): PullTypeParameterSymbol[];
        public getAllowedToReferenceTypeParameters(): PullTypeParameterSymbol[];
    }
    class SynthesizedTypeParameterSymbol extends PullTypeParameterSymbol {
        private originalTypeParameter;
        private _typeParameterSubstitutionMapForConstraint;
        constructor(originalTypeParameter: PullTypeParameterSymbol, _typeParameterSubstitutionMapForConstraint: TypeSubstitutionMap);
        public _getResolver(): PullTypeResolver;
        public getConstraint(): PullTypeSymbol;
    }
}
declare module TypeScript.IncrementalParser {
    function parse(oldSyntaxTree: SyntaxTree, textChangeRange: TextChangeRange, newText: ISimpleText): SyntaxTree;
}
declare module TypeScript.Services {
}
declare module TypeScript {
    function isTypeScriptSpecific(element: ISyntaxElement): boolean;
}
declare module TypeScript.Services {
    enum EndOfLineState {
        Start = 0,
        InMultiLineCommentTrivia = 1,
        InSingleQuoteStringLiteral = 2,
        InDoubleQuoteStringLiteral = 3,
    }
    enum TokenClass {
        Punctuation = 0,
        Keyword = 1,
        Operator = 2,
        Comment = 3,
        Whitespace = 4,
        Identifier = 5,
        NumberLiteral = 6,
        StringLiteral = 7,
        RegExpLiteral = 8,
    }
    class Classifier {
        public host: IClassifierHost;
        private scanner;
        private lastDiagnosticKey;
        private reportDiagnostic;
        constructor(host: IClassifierHost);
        public getClassificationsForLine(text: string, lexState: EndOfLineState): ClassificationResult;
        private processToken(text, simpleText, offset, token, result);
        private processTriviaList(text, offset, triviaList, result);
        private addResult(text, offset, result, length, kind);
        private classFromKind(kind);
    }
    interface IClassifierHost extends ILogger {
    }
    class ClassificationResult {
        public finalLexState: EndOfLineState;
        public entries: ClassificationInfo[];
        constructor();
    }
    class ClassificationInfo {
        public length: number;
        public classification: TokenClass;
        constructor(length: number, classification: TokenClass);
    }
}
declare module TypeScript.Services {
    interface ILanguageServicesDiagnostics {
        log(content: string): void;
    }
}
declare module TypeScript.Services {
    interface ILanguageServiceHost extends ILogger, IReferenceResolverHost {
        getCompilationSettings(): CompilationSettings;
        getScriptFileNames(): string[];
        getScriptVersion(fileName: string): number;
        getScriptIsOpen(fileName: string): boolean;
        getScriptByteOrderMark(fileName: string): ByteOrderMark;
        getScriptSnapshot(fileName: string): IScriptSnapshot;
        getDiagnosticsObject(): ILanguageServicesDiagnostics;
        getLocalizedDiagnosticMessages(): any;
        getCancellationToken(): ICancellationToken;
    }
    interface ILanguageService {
        refresh(): void;
        cleanupSemanticCache(): void;
        getSyntacticDiagnostics(fileName: string): Diagnostic[];
        getSemanticDiagnostics(fileName: string): Diagnostic[];
        getCompilerOptionsDiagnostics(): Diagnostic[];
        getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails;
        getTypeAtPosition(fileName: string, position: number): TypeInfo;
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): SpanInfo;
        getBreakpointStatementAtPosition(fileName: string, position: number): SpanInfo;
        getSignatureAtPosition(fileName: string, position: number): SignatureInfo;
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getImplementorsAtPosition(fileName: string, position: number): ReferenceEntry[];
        getNavigateToItems(searchValue: string): NavigateToItem[];
        getScriptLexicalStructure(fileName: string): NavigateToItem[];
        getOutliningRegions(fileName: string): TextSpan[];
        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): number;
        getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[];
        getFormattingEditsForDocument(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[];
        getFormattingEditsOnPaste(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextEdit[];
        getEmitOutput(fileName: string): EmitOutput;
        getSyntaxTree(fileName: string): SyntaxTree;
        dispose(): void;
    }
    function logInternalError(logger: ILogger, err: Error): void;
    class ReferenceEntry {
        public fileName: string;
        public minChar: number;
        public limChar: number;
        public isWriteAccess: boolean;
        constructor(fileName: string, minChar: number, limChar: number, isWriteAccess: boolean);
    }
    class NavigateToItem {
        public name: string;
        public kind: string;
        public kindModifiers: string;
        public matchKind: string;
        public fileName: string;
        public minChar: number;
        public limChar: number;
        public additionalSpans: SpanInfo[];
        public containerName: string;
        public containerKind: string;
    }
    class TextEdit {
        public minChar: number;
        public limChar: number;
        public text: string;
        constructor(minChar: number, limChar: number, text: string);
        static createInsert(pos: number, text: string): TextEdit;
        static createDelete(minChar: number, limChar: number): TextEdit;
        static createReplace(minChar: number, limChar: number, text: string): TextEdit;
    }
    class EditorOptions {
        public IndentSize: number;
        public TabSize: number;
        public NewLineCharacter: string;
        public ConvertTabsToSpaces: boolean;
        static clone(objectToClone: EditorOptions): EditorOptions;
    }
    class FormatCodeOptions extends EditorOptions {
        public InsertSpaceAfterCommaDelimiter: boolean;
        public InsertSpaceAfterSemicolonInForStatements: boolean;
        public InsertSpaceBeforeAndAfterBinaryOperators: boolean;
        public InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
        public InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        public InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        public PlaceOpenBraceOnNewLineForFunctions: boolean;
        public PlaceOpenBraceOnNewLineForControlBlocks: boolean;
        static clone(objectToClone: FormatCodeOptions): FormatCodeOptions;
    }
    class DefinitionInfo {
        public fileName: string;
        public minChar: number;
        public limChar: number;
        public kind: string;
        public name: string;
        public containerKind: string;
        public containerName: string;
        constructor(fileName: string, minChar: number, limChar: number, kind: string, name: string, containerKind: string, containerName: string);
    }
    class TypeInfo {
        public memberName: MemberName;
        public docComment: string;
        public fullSymbolName: string;
        public kind: string;
        public minChar: number;
        public limChar: number;
        constructor(memberName: MemberName, docComment: string, fullSymbolName: string, kind: string, minChar: number, limChar: number);
    }
    class SpanInfo {
        public minChar: number;
        public limChar: number;
        public text: string;
        constructor(minChar: number, limChar: number, text?: string);
    }
    class SignatureInfo {
        public actual: ActualSignatureInfo;
        public formal: FormalSignatureItemInfo[];
        public activeFormal: number;
    }
    class FormalSignatureItemInfo {
        public signatureInfo: string;
        public typeParameters: FormalTypeParameterInfo[];
        public parameters: FormalParameterInfo[];
        public docComment: string;
    }
    class FormalTypeParameterInfo {
        public name: string;
        public docComment: string;
        public minChar: number;
        public limChar: number;
    }
    class FormalParameterInfo {
        public name: string;
        public isVariable: boolean;
        public docComment: string;
        public minChar: number;
        public limChar: number;
    }
    class ActualSignatureInfo {
        public parameterMinChar: number;
        public parameterLimChar: number;
        public currentParameterIsTypeParameter: boolean;
        public currentParameter: number;
    }
    class CompletionInfo {
        public maybeInaccurate: boolean;
        public isMemberCompletion: boolean;
        public entries: CompletionEntry[];
    }
    interface CompletionEntry {
        name: string;
        kind: string;
        kindModifiers: string;
    }
    interface CompletionEntryDetails {
        name: string;
        kind: string;
        kindModifiers: string;
        type: string;
        fullSymbolName: string;
        docComment: string;
    }
    class ScriptElementKind {
        static unknown: string;
        static keyword: string;
        static scriptElement: string;
        static moduleElement: string;
        static classElement: string;
        static interfaceElement: string;
        static enumElement: string;
        static variableElement: string;
        static localVariableElement: string;
        static functionElement: string;
        static localFunctionElement: string;
        static memberFunctionElement: string;
        static memberGetAccessorElement: string;
        static memberSetAccessorElement: string;
        static memberVariableElement: string;
        static constructorImplementationElement: string;
        static callSignatureElement: string;
        static indexSignatureElement: string;
        static constructSignatureElement: string;
        static parameterElement: string;
        static typeParameterElement: string;
        static primitiveType: string;
    }
    class ScriptElementKindModifier {
        static none: string;
        static publicMemberModifier: string;
        static privateMemberModifier: string;
        static exportedModifier: string;
        static ambientModifier: string;
        static staticModifier: string;
    }
    class MatchKind {
        static none: string;
        static exact: string;
        static subString: string;
        static prefix: string;
    }
    class DiagnosticCategory {
        static none: string;
        static error: string;
        static warning: string;
        static message: string;
    }
}
declare module TypeScript.Services {
    function copyDataObject(dst: any, src: any): any;
    class TypeScriptServicesFactory implements IShimFactory {
        private _shims;
        private documentRegistry;
        public createPullLanguageService(host: ILanguageServiceHost): ILanguageService;
        public createLanguageServiceShim(host: ILanguageServiceShimHost): ILanguageServiceShim;
        public createClassifier(host: IClassifierHost): Classifier;
        public createClassifierShim(host: IClassifierHost): ClassifierShim;
        public createCoreServices(host: ICoreServicesHost): CoreServices;
        public createCoreServicesShim(host: ICoreServicesHost): CoreServicesShim;
        public close(): void;
        public registerShim(shim: IShim): void;
        public unregisterShim(shim: IShim): void;
    }
}
declare module TypeScript.Services.Formatting {
    interface ITextSnapshot {
        getText(span: TextSpan): string;
        getLineNumberFromPosition(position: number): number;
        getLineFromPosition(position: number): ITextSnapshotLine;
        getLineFromLineNumber(lineNumber: number): ITextSnapshotLine;
    }
    class TextSnapshot implements ITextSnapshot {
        private snapshot;
        private lines;
        constructor(snapshot: ISimpleText);
        public getText(span: TextSpan): string;
        public getLineNumberFromPosition(position: number): number;
        public getLineFromPosition(position: number): ITextSnapshotLine;
        public getLineFromLineNumber(lineNumber: number): ITextSnapshotLine;
        private getLineFromLineNumberWorker(lineNumber);
    }
}
declare module TypeScript.Services.Formatting {
    interface ITextSnapshotLine {
        snapshot(): ITextSnapshot;
        start(): SnapshotPoint;
        startPosition(): number;
        end(): SnapshotPoint;
        endPosition(): number;
        endIncludingLineBreak(): SnapshotPoint;
        endIncludingLineBreakPosition(): number;
        length(): number;
        lineNumber(): number;
        getText(): string;
    }
    class TextSnapshotLine implements ITextSnapshotLine {
        private _snapshot;
        private _lineNumber;
        private _start;
        private _end;
        private _lineBreak;
        constructor(_snapshot: ITextSnapshot, _lineNumber: number, _start: number, _end: number, _lineBreak: string);
        public snapshot(): ITextSnapshot;
        public start(): SnapshotPoint;
        public startPosition(): number;
        public end(): SnapshotPoint;
        public endPosition(): number;
        public endIncludingLineBreak(): SnapshotPoint;
        public endIncludingLineBreakPosition(): number;
        public length(): number;
        public lineNumber(): number;
        public getText(): string;
    }
}
declare module TypeScript.Services.Formatting {
    class SnapshotPoint {
        public snapshot: ITextSnapshot;
        public position: number;
        constructor(snapshot: ITextSnapshot, position: number);
        public getContainingLine(): ITextSnapshotLine;
        public add(offset: number): SnapshotPoint;
    }
}
declare module TypeScript.Services.Formatting {
    class FormattingContext {
        private snapshot;
        public formattingRequestKind: FormattingRequestKind;
        public currentTokenSpan: TokenSpan;
        public nextTokenSpan: TokenSpan;
        public contextNode: IndentationNodeContext;
        public currentTokenParent: IndentationNodeContext;
        public nextTokenParent: IndentationNodeContext;
        private contextNodeAllOnSameLine;
        private nextNodeAllOnSameLine;
        private tokensAreOnSameLine;
        private contextNodeBlockIsOnOneLine;
        private nextNodeBlockIsOnOneLine;
        constructor(snapshot: ITextSnapshot, formattingRequestKind: FormattingRequestKind);
        public updateContext(currentTokenSpan: TokenSpan, currentTokenParent: IndentationNodeContext, nextTokenSpan: TokenSpan, nextTokenParent: IndentationNodeContext, commonParent: IndentationNodeContext): void;
        public ContextNodeAllOnSameLine(): boolean;
        public NextNodeAllOnSameLine(): boolean;
        public TokensAreOnSameLine(): boolean;
        public ContextNodeBlockIsOnOneLine(): boolean;
        public NextNodeBlockIsOnOneLine(): boolean;
        public NodeIsOnOneLine(node: IndentationNodeContext): boolean;
        public BlockIsOnOneLine(node: IndentationNodeContext): boolean;
    }
}
declare module TypeScript.Services.Formatting {
    class FormattingManager {
        private syntaxTree;
        private snapshot;
        private rulesProvider;
        private options;
        constructor(syntaxTree: SyntaxTree, snapshot: ITextSnapshot, rulesProvider: RulesProvider, editorOptions: EditorOptions);
        public formatSelection(minChar: number, limChar: number): TextEdit[];
        public formatDocument(minChar: number, limChar: number): TextEdit[];
        public formatOnPaste(minChar: number, limChar: number): TextEdit[];
        public formatOnSemicolon(caretPosition: number): TextEdit[];
        public formatOnClosingCurlyBrace(caretPosition: number): TextEdit[];
        public formatOnEnter(caretPosition: number): TextEdit[];
        private formatSpan(span, formattingRequestKind);
    }
}
declare module TypeScript.Services.Formatting {
    enum FormattingRequestKind {
        FormatDocument = 0,
        FormatSelection = 1,
        FormatOnEnter = 2,
        FormatOnSemicolon = 3,
        FormatOnClosingCurlyBrace = 4,
        FormatOnPaste = 5,
    }
}
declare module TypeScript.Services.Formatting {
    class Rule {
        public Descriptor: RuleDescriptor;
        public Operation: RuleOperation;
        public Flag: RuleFlags;
        constructor(Descriptor: RuleDescriptor, Operation: RuleOperation, Flag?: RuleFlags);
        public toString(): string;
    }
}
declare module TypeScript.Services.Formatting {
    enum RuleAction {
        Ignore = 0,
        Space = 1,
        NewLine = 2,
        Delete = 3,
    }
}
declare module TypeScript.Services.Formatting {
    class RuleDescriptor {
        public LeftTokenRange: Shared.TokenRange;
        public RightTokenRange: Shared.TokenRange;
        constructor(LeftTokenRange: Shared.TokenRange, RightTokenRange: Shared.TokenRange);
        public toString(): string;
        static create1(left: SyntaxKind, right: SyntaxKind): RuleDescriptor;
        static create2(left: Shared.TokenRange, right: SyntaxKind): RuleDescriptor;
        static create3(left: SyntaxKind, right: Shared.TokenRange): RuleDescriptor;
        static create4(left: Shared.TokenRange, right: Shared.TokenRange): RuleDescriptor;
    }
}
declare module TypeScript.Services.Formatting {
    enum RuleFlags {
        None = 0,
        CanDeleteNewLines = 1,
    }
}
declare module TypeScript.Services.Formatting {
    class RuleOperation {
        public Context: RuleOperationContext;
        public Action: RuleAction;
        constructor();
        public toString(): string;
        static create1(action: RuleAction): RuleOperation;
        static create2(context: RuleOperationContext, action: RuleAction): RuleOperation;
    }
}
declare module TypeScript.Services.Formatting {
    class RuleOperationContext {
        private customContextChecks;
        constructor(...funcs: {
            (context: FormattingContext): boolean;
        }[]);
        static Any: RuleOperationContext;
        public IsAny(): boolean;
        public InContext(context: FormattingContext): boolean;
    }
}
declare module TypeScript.Services.Formatting {
    class Rules {
        public getRuleName(rule: Rule): any;
        [name: string]: any;
        public IgnoreBeforeComment: Rule;
        public IgnoreAfterLineComment: Rule;
        public NoSpaceBeforeSemicolon: Rule;
        public NoSpaceBeforeColon: Rule;
        public NoSpaceBeforeQMark: Rule;
        public SpaceAfterColon: Rule;
        public SpaceAfterQMark: Rule;
        public SpaceAfterSemicolon: Rule;
        public SpaceAfterCloseBrace: Rule;
        public SpaceBetweenCloseBraceAndElse: Rule;
        public SpaceBetweenCloseBraceAndWhile: Rule;
        public NoSpaceAfterCloseBrace: Rule;
        public NoSpaceBeforeDot: Rule;
        public NoSpaceAfterDot: Rule;
        public NoSpaceBeforeOpenBracket: Rule;
        public NoSpaceAfterOpenBracket: Rule;
        public NoSpaceBeforeCloseBracket: Rule;
        public NoSpaceAfterCloseBracket: Rule;
        public SpaceAfterOpenBrace: Rule;
        public SpaceBeforeCloseBrace: Rule;
        public NoSpaceBetweenEmptyBraceBrackets: Rule;
        public NewLineAfterOpenBraceInBlockContext: Rule;
        public NewLineBeforeCloseBraceInBlockContext: Rule;
        public NoSpaceAfterUnaryPrefixOperator: Rule;
        public NoSpaceAfterUnaryPreincrementOperator: Rule;
        public NoSpaceAfterUnaryPredecrementOperator: Rule;
        public NoSpaceBeforeUnaryPostincrementOperator: Rule;
        public NoSpaceBeforeUnaryPostdecrementOperator: Rule;
        public SpaceAfterPostincrementWhenFollowedByAdd: Rule;
        public SpaceAfterAddWhenFollowedByUnaryPlus: Rule;
        public SpaceAfterAddWhenFollowedByPreincrement: Rule;
        public SpaceAfterPostdecrementWhenFollowedBySubtract: Rule;
        public SpaceAfterSubtractWhenFollowedByUnaryMinus: Rule;
        public SpaceAfterSubtractWhenFollowedByPredecrement: Rule;
        public NoSpaceBeforeComma: Rule;
        public SpaceAfterCertainKeywords: Rule;
        public NoSpaceBeforeOpenParenInFuncCall: Rule;
        public SpaceAfterFunctionInFuncDecl: Rule;
        public NoSpaceBeforeOpenParenInFuncDecl: Rule;
        public SpaceAfterVoidOperator: Rule;
        public NoSpaceBetweenReturnAndSemicolon: Rule;
        public SpaceBetweenStatements: Rule;
        public SpaceAfterTryFinally: Rule;
        public SpaceAfterGetSetInMember: Rule;
        public SpaceBeforeBinaryKeywordOperator: Rule;
        public SpaceAfterBinaryKeywordOperator: Rule;
        public NoSpaceAfterConstructor: Rule;
        public NoSpaceAfterModuleImport: Rule;
        public SpaceAfterCertainTypeScriptKeywords: Rule;
        public SpaceBeforeCertainTypeScriptKeywords: Rule;
        public SpaceAfterModuleName: Rule;
        public SpaceAfterArrow: Rule;
        public NoSpaceAfterEllipsis: Rule;
        public NoSpaceAfterOptionalParameters: Rule;
        public NoSpaceBeforeOpenAngularBracket: Rule;
        public NoSpaceBetweenCloseParenAndAngularBracket: Rule;
        public NoSpaceAfterOpenAngularBracket: Rule;
        public NoSpaceBeforeCloseAngularBracket: Rule;
        public NoSpaceAfterCloseAngularBracket: Rule;
        public NoSpaceBetweenEmptyInterfaceBraceBrackets: Rule;
        public HighPriorityCommonRules: Rule[];
        public LowPriorityCommonRules: Rule[];
        public SpaceAfterComma: Rule;
        public NoSpaceAfterComma: Rule;
        public SpaceBeforeBinaryOperator: Rule;
        public SpaceAfterBinaryOperator: Rule;
        public NoSpaceBeforeBinaryOperator: Rule;
        public NoSpaceAfterBinaryOperator: Rule;
        public SpaceAfterKeywordInControl: Rule;
        public NoSpaceAfterKeywordInControl: Rule;
        public FunctionOpenBraceLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenBraceInFunction: Rule;
        public NewLineBeforeOpenBraceInFunction: Rule;
        public TypeScriptOpenBraceLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenBraceInTypeScriptDeclWithBlock: Rule;
        public NewLineBeforeOpenBraceInTypeScriptDeclWithBlock: Rule;
        public ControlOpenBraceLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenBraceInControl: Rule;
        public NewLineBeforeOpenBraceInControl: Rule;
        public SpaceAfterSemicolonInFor: Rule;
        public NoSpaceAfterSemicolonInFor: Rule;
        public SpaceAfterOpenParen: Rule;
        public SpaceBeforeCloseParen: Rule;
        public NoSpaceBetweenParens: Rule;
        public NoSpaceAfterOpenParen: Rule;
        public NoSpaceBeforeCloseParen: Rule;
        public SpaceAfterAnonymousFunctionKeyword: Rule;
        public NoSpaceAfterAnonymousFunctionKeyword: Rule;
        constructor();
        static IsForContext(context: FormattingContext): boolean;
        static IsNotForContext(context: FormattingContext): boolean;
        static IsBinaryOpContext(context: FormattingContext): boolean;
        static IsNotBinaryOpContext(context: FormattingContext): boolean;
        static IsSameLineTokenOrBeforeMultilineBlockContext(context: FormattingContext): boolean;
        static IsBeforeMultilineBlockContext(context: FormattingContext): boolean;
        static IsMultilineBlockContext(context: FormattingContext): boolean;
        static IsSingleLineBlockContext(context: FormattingContext): boolean;
        static IsBlockContext(context: FormattingContext): boolean;
        static IsBeforeBlockContext(context: FormattingContext): boolean;
        static NodeIsBlockContext(node: IndentationNodeContext): boolean;
        static IsFunctionDeclContext(context: FormattingContext): boolean;
        static IsTypeScriptDeclWithBlockContext(context: FormattingContext): boolean;
        static NodeIsTypeScriptDeclWithBlockContext(node: IndentationNodeContext): boolean;
        static IsAfterCodeBlockContext(context: FormattingContext): boolean;
        static IsControlDeclContext(context: FormattingContext): boolean;
        static IsObjectContext(context: FormattingContext): boolean;
        static IsFunctionCallContext(context: FormattingContext): boolean;
        static IsNewContext(context: FormattingContext): boolean;
        static IsFunctionCallOrNewContext(context: FormattingContext): boolean;
        static IsSameLineTokenContext(context: FormattingContext): boolean;
        static IsNotFormatOnEnter(context: FormattingContext): boolean;
        static IsModuleDeclContext(context: FormattingContext): boolean;
        static IsObjectTypeContext(context: FormattingContext): boolean;
        static IsTypeArgumentOrParameter(tokenKind: SyntaxKind, parentKind: SyntaxKind): boolean;
        static IsTypeArgumentOrParameterContext(context: FormattingContext): boolean;
        static IsVoidOpContext(context: FormattingContext): boolean;
    }
}
declare module TypeScript.Services.Formatting {
    class RulesMap {
        public map: RulesBucket[];
        public mapRowLength: number;
        constructor();
        static create(rules: Rule[]): RulesMap;
        public Initialize(rules: Rule[]): RulesBucket[];
        public FillRules(rules: Rule[], rulesBucketConstructionStateList: RulesBucketConstructionState[]): void;
        private GetRuleBucketIndex(row, column);
        private FillRule(rule, rulesBucketConstructionStateList);
        public GetRule(context: FormattingContext): Rule;
    }
    enum RulesPosition {
        IgnoreRulesSpecific = 0,
        IgnoreRulesAny,
        ContextRulesSpecific,
        ContextRulesAny,
        NoContextRulesSpecific,
        NoContextRulesAny,
    }
    class RulesBucketConstructionState {
        private rulesInsertionIndexBitmap;
        constructor();
        public GetInsertionIndex(maskPosition: RulesPosition): number;
        public IncreaseInsertionIndex(maskPosition: RulesPosition): void;
    }
    class RulesBucket {
        private rules;
        constructor();
        public Rules(): Rule[];
        public AddRule(rule: Rule, specificTokens: boolean, constructionState: RulesBucketConstructionState[], rulesBucketIndex: number): void;
    }
}
declare module TypeScript.Services.Formatting {
    class RulesProvider {
        private logger;
        private globalRules;
        private options;
        private activeRules;
        private rulesMap;
        constructor(logger: ILogger);
        public getRuleName(rule: Rule): string;
        public getRuleByName(name: string): Rule;
        public getRulesMap(): RulesMap;
        public ensureUpToDate(options: FormatCodeOptions): void;
        private createActiveRules(options);
    }
}
declare module TypeScript.Services.Formatting {
    class TextEditInfo {
        public position: number;
        public length: number;
        public replaceWith: string;
        constructor(position: number, length: number, replaceWith: string);
        public toString(): string;
    }
}
declare module TypeScript.Services.Formatting {
    module Shared {
        interface ITokenAccess {
            GetTokens(): SyntaxKind[];
            Contains(token: SyntaxKind): boolean;
        }
        class TokenRangeAccess implements ITokenAccess {
            private tokens;
            constructor(from: SyntaxKind, to: SyntaxKind, except: SyntaxKind[]);
            public GetTokens(): SyntaxKind[];
            public Contains(token: SyntaxKind): boolean;
            public toString(): string;
        }
        class TokenValuesAccess implements ITokenAccess {
            private tokens;
            constructor(tks: SyntaxKind[]);
            public GetTokens(): SyntaxKind[];
            public Contains(token: SyntaxKind): boolean;
        }
        class TokenSingleValueAccess implements ITokenAccess {
            public token: SyntaxKind;
            constructor(token: SyntaxKind);
            public GetTokens(): SyntaxKind[];
            public Contains(tokenValue: SyntaxKind): boolean;
            public toString(): string;
        }
        class TokenAllAccess implements ITokenAccess {
            public GetTokens(): SyntaxKind[];
            public Contains(tokenValue: SyntaxKind): boolean;
            public toString(): string;
        }
        class TokenRange {
            public tokenAccess: ITokenAccess;
            constructor(tokenAccess: ITokenAccess);
            static FromToken(token: SyntaxKind): TokenRange;
            static FromTokens(tokens: SyntaxKind[]): TokenRange;
            static FromRange(f: SyntaxKind, to: SyntaxKind, except?: SyntaxKind[]): TokenRange;
            static AllTokens(): TokenRange;
            public GetTokens(): SyntaxKind[];
            public Contains(token: SyntaxKind): boolean;
            public toString(): string;
            static Any: TokenRange;
            static AnyIncludingMultilineComments: TokenRange;
            static Keywords: TokenRange;
            static Operators: TokenRange;
            static BinaryOperators: TokenRange;
            static BinaryKeywordOperators: TokenRange;
            static ReservedKeywords: TokenRange;
            static UnaryPrefixOperators: TokenRange;
            static UnaryPrefixExpressions: TokenRange;
            static UnaryPreincrementExpressions: TokenRange;
            static UnaryPostincrementExpressions: TokenRange;
            static UnaryPredecrementExpressions: TokenRange;
            static UnaryPostdecrementExpressions: TokenRange;
            static Comments: TokenRange;
            static TypeNames: TokenRange;
        }
    }
}
declare module TypeScript.Services.Formatting {
    class TokenSpan extends TextSpan {
        public kind: SyntaxKind;
        constructor(kind: SyntaxKind, start: number, length: number);
    }
}
declare module TypeScript.Services.Formatting {
    class IndentationNodeContext {
        private _node;
        private _parent;
        private _fullStart;
        private _indentationAmount;
        private _childIndentationAmountDelta;
        private _depth;
        private _hasSkippedOrMissingTokenChild;
        constructor(parent: IndentationNodeContext, node: ISyntaxNode, fullStart: number, indentationAmount: number, childIndentationAmountDelta: number);
        public parent(): IndentationNodeContext;
        public node(): ISyntaxNode;
        public fullStart(): number;
        public fullWidth(): number;
        public start(): number;
        public end(): number;
        public indentationAmount(): number;
        public childIndentationAmountDelta(): number;
        public depth(): number;
        public kind(): SyntaxKind;
        public hasSkippedOrMissingTokenChild(): boolean;
        public clone(pool: IndentationNodeContextPool): IndentationNodeContext;
        public update(parent: IndentationNodeContext, node: ISyntaxNode, fullStart: number, indentationAmount: number, childIndentationAmountDelta: number): void;
    }
}
declare module TypeScript.Services.Formatting {
    class IndentationNodeContextPool {
        private nodes;
        public getNode(parent: IndentationNodeContext, node: ISyntaxNode, fullStart: number, indentationLevel: number, childIndentationLevelDelta: number): IndentationNodeContext;
        public releaseNode(node: IndentationNodeContext, recursive?: boolean): void;
    }
}
declare module TypeScript.Services.Formatting {
    class IndentationTrackingWalker extends SyntaxWalker {
        public options: FormattingOptions;
        private _position;
        private _parent;
        private _textSpan;
        private _snapshot;
        private _lastTriviaWasNewLine;
        private _indentationNodeContextPool;
        private _text;
        constructor(textSpan: TextSpan, sourceUnit: SourceUnitSyntax, snapshot: ITextSnapshot, indentFirstToken: boolean, options: FormattingOptions);
        public position(): number;
        public parent(): IndentationNodeContext;
        public textSpan(): TextSpan;
        public snapshot(): ITextSnapshot;
        public indentationNodeContextPool(): IndentationNodeContextPool;
        public forceIndentNextToken(tokenStart: number): void;
        public forceSkipIndentingNextToken(tokenStart: number): void;
        public indentToken(token: ISyntaxToken, indentationAmount: number, commentIndentationAmount: number): void;
        public visitTokenInSpan(token: ISyntaxToken): void;
        public visitToken(token: ISyntaxToken): void;
        public visitNode(node: ISyntaxNode): void;
        private getTokenIndentationAmount(token);
        private getCommentIndentationAmount(token);
        private getNodeIndentation(node, newLineInsertedByFormatting?);
        private shouldIndentBlockInParent(parent);
        private forceRecomputeIndentationOfParent(tokenStart, newLineAdded);
    }
}
declare module TypeScript.Services.Formatting {
    class MultipleTokenIndenter extends IndentationTrackingWalker {
        private _edits;
        constructor(textSpan: TextSpan, sourceUnit: SourceUnitSyntax, snapshot: ITextSnapshot, indentFirstToken: boolean, options: FormattingOptions);
        public indentToken(token: ISyntaxToken, indentationAmount: number, commentIndentationAmount: number): void;
        public edits(): TextEditInfo[];
        public recordEdit(position: number, length: number, replaceWith: string): void;
        private recordIndentationEditsForToken(token, indentationString, commentIndentationString);
        private recordIndentationEditsForSingleLineOrSkippedText(trivia, fullStart, indentationString);
        private recordIndentationEditsForWhitespace(trivia, fullStart, indentationString);
        private recordIndentationEditsForMultiLineComment(trivia, fullStart, indentationString, leadingWhiteSpace, firstLineAlreadyIndented);
        private recordIndentationEditsForSegment(segment, fullStart, indentationColumns, whiteSpaceColumnsInFirstSegment);
    }
}
declare module TypeScript.Services.Formatting {
    class SingleTokenIndenter extends IndentationTrackingWalker {
        private indentationAmount;
        private indentationPosition;
        constructor(indentationPosition: number, sourceUnit: SourceUnitSyntax, snapshot: ITextSnapshot, indentFirstToken: boolean, options: FormattingOptions);
        static getIndentationAmount(position: number, sourceUnit: SourceUnitSyntax, snapshot: ITextSnapshot, options: FormattingOptions): number;
        public indentToken(token: ISyntaxToken, indentationAmount: number, commentIndentationAmount: number): void;
    }
}
declare module TypeScript.Services.Formatting {
    class Formatter extends MultipleTokenIndenter {
        private previousTokenSpan;
        private previousTokenParent;
        private scriptHasErrors;
        private rulesProvider;
        private formattingRequestKind;
        private formattingContext;
        constructor(textSpan: TextSpan, sourceUnit: SourceUnitSyntax, indentFirstToken: boolean, options: FormattingOptions, snapshot: ITextSnapshot, rulesProvider: RulesProvider, formattingRequestKind: FormattingRequestKind);
        static getEdits(textSpan: TextSpan, sourceUnit: SourceUnitSyntax, options: FormattingOptions, indentFirstToken: boolean, snapshot: ITextSnapshot, rulesProvider: RulesProvider, formattingRequestKind: FormattingRequestKind): TextEditInfo[];
        public visitTokenInSpan(token: ISyntaxToken): void;
        private processToken(token);
        private processTrivia(triviaList, fullStart);
        private findCommonParents(parent1, parent2);
        private formatPair(t1, t1Parent, t2, t2Parent);
        private getLineNumber(span);
        private trimWhitespaceInLineRange(startLine, endLine, token?);
        private trimWhitespace(line, token?);
        private RecordRuleEdits(rule, t1, t2);
    }
}
declare var debugObjectHost: any;
declare module TypeScript.Services {
    interface ICoreServicesHost {
        logger: ILogger;
    }
    class CoreServices {
        public host: ICoreServicesHost;
        constructor(host: ICoreServicesHost);
        public getPreProcessedFileInfo(fileName: string, sourceText: IScriptSnapshot): IPreProcessedFileInfo;
        public getDefaultCompilationSettings(): CompilationSettings;
        public dumpMemory(): string;
        public getMemoryInfo(): any[];
        public collectGarbage(): void;
    }
}
declare module TypeScript.Services {
    class SyntaxTreeCache {
        private _host;
        private _hostCache;
        private _currentFileName;
        private _currentFileVersion;
        private _currentFileSyntaxTree;
        private _currentFileScriptSnapshot;
        constructor(_host: ILanguageServiceHost);
        public getCurrentFileSyntaxTree(fileName: string): SyntaxTree;
        private createSyntaxTree(fileName, scriptSnapshot);
        private updateSyntaxTree(fileName, scriptSnapshot, previousSyntaxTree, previousFileVersion);
        private ensureInvariants(fileName, editRange, incrementalTree, oldScriptSnapshot, newScriptSnapshot);
    }
    class LanguageServiceCompiler {
        private host;
        private documentRegistry;
        private cancellationToken;
        private logger;
        private compiler;
        private hostCache;
        constructor(host: ILanguageServiceHost, documentRegistry: IDocumentRegistry, cancellationToken: CancellationToken);
        private synchronizeHostData();
        private synchronizeHostDataWorker();
        public getScriptSnapshot(fileName: string): IScriptSnapshot;
        public getCachedHostFileName(fileName: string): string;
        public getCachedTopLevelDeclaration(fileName: string): PullDecl;
        public compilationSettings(): ImmutableCompilationSettings;
        public fileNames(): string[];
        public cleanupSemanticCache(): void;
        public getDocument(fileName: string): Document;
        public getSemanticInfoChain(): SemanticInfoChain;
        public getSyntacticDiagnostics(fileName: string): Diagnostic[];
        public getSemanticDiagnostics(fileName: string): Diagnostic[];
        public getCompilerOptionsDiagnostics(resolvePath: (path: string) => string): Diagnostic[];
        public getSymbolInformationFromAST(ast: ISyntaxElement, document: Document): PullSymbolInfo;
        public getCallInformationFromAST(ast: ISyntaxElement, document: Document): PullCallSymbolInfo;
        public getVisibleMemberSymbolsFromAST(ast: ISyntaxElement, document: Document): PullVisibleSymbolsInfo;
        public getVisibleDeclsFromAST(ast: ISyntaxElement, document: Document): PullDecl[];
        public getContextualMembersFromAST(ast: ISyntaxElement, document: Document): PullVisibleSymbolsInfo;
        public pullGetDeclInformation(decl: PullDecl, ast: ISyntaxElement, document: Document): PullSymbolInfo;
        public topLevelDeclaration(fileName: string): PullDecl;
        public getDeclForAST(ast: ISyntaxElement): PullDecl;
        public emit(fileName: string, resolvePath: (path: string) => string): EmitOutput;
        public emitDeclarations(fileName: string, resolvePath: (path: string) => string): EmitOutput;
        public canEmitDeclarations(fileName: string): boolean;
        public dispose(): void;
    }
}
declare module TypeScript.Indentation {
    function columnForEndOfTokenAtPosition(syntaxTree: SyntaxTree, position: number, options: FormattingOptions): number;
    function columnForStartOfTokenAtPosition(syntaxTree: SyntaxTree, position: number, options: FormattingOptions): number;
    function columnForStartOfFirstTokenInLineContainingPosition(syntaxTree: SyntaxTree, position: number, options: FormattingOptions): number;
    function columnForPositionInString(input: string, position: number, options: FormattingOptions): number;
    function indentationString(column: number, options: FormattingOptions): string;
    function firstNonWhitespacePosition(value: string): number;
}
declare module TypeScript.Services {
    class CompletionHelpers {
        private static getSpan(ast);
        private static symbolDeclarationIntersectsPosition(symbol, fileName, position);
        static filterContextualMembersList(contextualMemberSymbols: PullSymbol[], existingMembers: PullVisibleSymbolsInfo, fileName: string, position: number): PullSymbol[];
        static isCompletionListBlocker(sourceUnit: SourceUnitSyntax, position: number): boolean;
        static getContainingObjectLiteralApplicableForCompletion(sourceUnit: SourceUnitSyntax, position: number): ISyntaxElement;
        static isIdentifierDefinitionLocation(sourceUnit: SourceUnitSyntax, position: number): boolean;
        static getNonIdentifierCompleteTokenOnLeft(sourceUnit: SourceUnitSyntax, position: number): ISyntaxToken;
        static isRightOfIllegalDot(sourceUnit: SourceUnitSyntax, position: number): boolean;
        static getValidCompletionEntryDisplayName(displayName: string): string;
    }
}
declare module TypeScript.Services {
    class KeywordCompletions {
        private static keywords;
        private static keywordCompletions;
        static getKeywordCompltions(): ResolvedCompletionEntry[];
    }
}
declare module TypeScript.Services {
    interface IPartiallyWrittenTypeArgumentListInformation {
        genericIdentifer: ISyntaxToken;
        lessThanToken: ISyntaxToken;
        argumentIndex: number;
    }
    interface IExpressionWithArgumentListSyntax extends IExpressionSyntax {
        expression: IExpressionSyntax;
        argumentList: ArgumentListSyntax;
    }
    class SignatureInfoHelpers {
        static isInPartiallyWrittenTypeArgumentList(syntaxTree: SyntaxTree, position: number): IPartiallyWrittenTypeArgumentListInformation;
        static getSignatureInfoFromSignatureSymbol(symbol: PullSymbol, signatures: PullSignatureSymbol[], enclosingScopeSymbol: PullSymbol, compilerState: LanguageServiceCompiler): FormalSignatureItemInfo[];
        static getSignatureInfoFromGenericSymbol(symbol: PullSymbol, enclosingScopeSymbol: PullSymbol, compilerState: LanguageServiceCompiler): FormalSignatureItemInfo[];
        static getActualSignatureInfoFromCallExpression(ast: IExpressionWithArgumentListSyntax, caretPosition: number, typeParameterInformation: IPartiallyWrittenTypeArgumentListInformation): ActualSignatureInfo;
        static getActualSignatureInfoFromPartiallyWritenGenericExpression(caretPosition: number, typeParameterInformation: IPartiallyWrittenTypeArgumentListInformation): ActualSignatureInfo;
        static isSignatureHelpBlocker(sourceUnit: SourceUnitSyntax, position: number): boolean;
        static isTargetOfObjectCreationExpression(positionedToken: ISyntaxToken): boolean;
        private static moveBackUpTillMatchingTokenKind(token, tokenKind, matchingTokenKind);
    }
}
declare module TypeScript.Services {
    interface CachedCompletionEntryDetails extends CompletionEntryDetails {
        isResolved(): boolean;
    }
    class ResolvedCompletionEntry implements CachedCompletionEntryDetails {
        public name: string;
        public kind: string;
        public kindModifiers: string;
        public type: string;
        public fullSymbolName: string;
        public docComment: string;
        constructor(name: string, kind: string, kindModifiers: string, type: string, fullSymbolName: string, docComment: string);
        public isResolved(): boolean;
    }
    class DeclReferenceCompletionEntry implements CachedCompletionEntryDetails {
        public name: string;
        public kind: string;
        public kindModifiers: string;
        public decl: PullDecl;
        public type: string;
        public fullSymbolName: string;
        public docComment: string;
        private hasBeenResolved;
        constructor(name: string, kind: string, kindModifiers: string, decl: PullDecl);
        public isResolved(): boolean;
        public resolve(type: string, fullSymbolName: string, docComments: string): void;
    }
    class CompletionSession {
        public fileName: string;
        public position: number;
        public entries: IdentiferNameHashTable<CachedCompletionEntryDetails>;
        constructor(fileName: string, position: number, entries: IdentiferNameHashTable<CachedCompletionEntryDetails>);
    }
}
declare module TypeScript.Services {
    class LanguageService implements ILanguageService {
        public host: ILanguageServiceHost;
        private logger;
        private compiler;
        private _syntaxTreeCache;
        private formattingRulesProvider;
        private activeCompletionSession;
        private cancellationToken;
        constructor(host: ILanguageServiceHost, documentRegistry: IDocumentRegistry);
        public dispose(): void;
        public cleanupSemanticCache(): void;
        public refresh(): void;
        private getSemanticInfoChain();
        private getSymbolInfoAtPosition(fileName, pos, requireName);
        private getSymbolInfoAtAST(document, topNode, pos, requireName);
        public getReferencesAtPosition(fileName: string, pos: number): ReferenceEntry[];
        private getSymbolScopeAST(symbol, ast);
        public getOccurrencesAtPosition(fileName: string, pos: number): ReferenceEntry[];
        private getSingleNodeReferenceAtPosition(fileName, position);
        public getImplementorsAtPosition(fileName: string, pos: number): ReferenceEntry[];
        public getOverrides(container: PullTypeSymbol, memberSym: PullSymbol): PullTypeSymbol[];
        private getImplementorsInFile(fileName, symbol);
        private getReferencesInFile(fileName, symbol, containingASTOpt);
        private isWriteAccess(current);
        private isLetterOrDigit(char);
        private getPossibleSymbolReferencePositions(fileName, symbolName);
        public getSignatureAtPosition(fileName: string, position: number): SignatureInfo;
        private getTypeParameterSignatureFromPartiallyWrittenExpression(document, position, genericTypeArgumentListInfo);
        public getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        private addDeclarations(symbolKind, symbolName, containerKind, containerName, declarations, result);
        private addDeclaration(symbolKind, symbolName, containerKind, containerName, declaration, result);
        private tryAddDefinition(symbolKind, symbolName, containerKind, containerName, declarations, result);
        private tryAddSignatures(symbolKind, symbolName, containerKind, containerName, declarations, result);
        private tryAddConstructor(symbolKind, symbolName, containerKind, containerName, declarations, result);
        public getNavigateToItems(searchValue: string): NavigateToItem[];
        private hasAnyUpperCaseCharacter(s);
        private findSearchValueInPullDecl(fileName, declarations, results, searchTerms, parentName?, parentkindName?);
        private getScriptElementKindModifiersFromDecl(decl);
        private isContainerDeclaration(declaration);
        private shouldIncludeDeclarationInNavigationItems(declaration);
        public getSyntacticDiagnostics(fileName: string): Diagnostic[];
        public getSemanticDiagnostics(fileName: string): Diagnostic[];
        private _getHostSpecificDiagnosticWithFileName(diagnostic);
        public getCompilerOptionsDiagnostics(): Diagnostic[];
        private _getHostFileName(fileName);
        public getEmitOutput(fileName: string): EmitOutput;
        private getAllSyntacticDiagnostics();
        private getAllSemanticDiagnostics();
        private containErrors(diagnostics);
        private getFullNameOfSymbol(symbol, enclosingScopeSymbol);
        private getTypeInfoEligiblePath(fileName, position, isConstructorValidPosition);
        public getTypeAtPosition(fileName: string, position: number): TypeInfo;
        public getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): CompletionInfo;
        private getCompletionEntriesFromSymbols(symbolInfo, result);
        private getCompletionEntriesFromDecls(decls, result);
        private getResolvedCompletionEntryDetailsFromSymbol(symbol, enclosingScopeSymbol);
        private getCompletionEntriesForKeywords(keywords, result);
        public getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails;
        private tryFindDeclFromPreviousCompilerVersion(invalidatedDecl);
        private getModuleOrEnumKind(symbol);
        private mapPullElementKind(kind, symbol?, useConstructorAsClass?, varIsFunction?, functionIsConstructor?);
        private getScriptElementKindModifiers(symbol);
        private getScriptElementKindModifiersFromFlags(flags);
        public getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): SpanInfo;
        public getBreakpointStatementAtPosition(fileName: string, pos: number): SpanInfo;
        public getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[];
        public getFormattingEditsForDocument(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[];
        public getFormattingEditsOnPaste(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[];
        public getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextEdit[];
        private getFormattingManager(fileName, options);
        public getOutliningRegions(fileName: string): TextSpan[];
        public getIndentationAtPosition(fileName: string, position: number, editorOptions: EditorOptions): number;
        public getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
        public getScriptLexicalStructure(fileName: string): NavigateToItem[];
        public getSyntaxTree(fileName: string): SyntaxTree;
    }
}
declare module TypeScript.Services {
    class FindReferenceHelpers {
        static compareSymbolsForLexicalIdentity(firstSymbol: PullSymbol, secondSymbol: PullSymbol): boolean;
        private static checkSymbolsForDeclarationEquality(firstSymbol, secondSymbol);
        private static declarationsAreSameOrParents(firstDecl, secondDecl);
    }
}
declare module TypeScript.Services {
    interface IScriptSnapshotShim {
        getText(start: number, end: number): string;
        getLength(): number;
        getLineStartPositions(): string;
        getTextChangeRangeSinceVersion(scriptVersion: number): string;
    }
    interface ILanguageServiceShimHost extends ILogger {
        getCompilationSettings(): string;
        getScriptFileNames(): string;
        getScriptVersion(fileName: string): number;
        getScriptIsOpen(fileName: string): boolean;
        getScriptByteOrderMark(fileName: string): number;
        getScriptSnapshot(fileName: string): IScriptSnapshotShim;
        resolveRelativePath(path: string, directory: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        getParentDirectory(path: string): string;
        getDiagnosticsObject(): ILanguageServicesDiagnostics;
        getLocalizedDiagnosticMessages(): string;
        getCancellationToken(): ICancellationToken;
    }
    interface IShimFactory {
        registerShim(shim: IShim): void;
        unregisterShim(shim: IShim): void;
    }
    interface IShim {
        dispose(dummy: any): void;
    }
    class ShimBase implements IShim {
        private factory;
        constructor(factory: IShimFactory);
        public dispose(dummy: any): void;
    }
    interface ILanguageServiceShim extends IShim {
        languageService: ILanguageService;
        dispose(dummy: any): void;
        refresh(throwOnError: boolean): void;
        cleanupSemanticCache(): void;
        getSyntacticDiagnostics(fileName: string): string;
        getSemanticDiagnostics(fileName: string): string;
        getCompilerOptionsDiagnostics(): string;
        getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): string;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): string;
        getTypeAtPosition(fileName: string, position: number): string;
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string;
        getBreakpointStatementAtPosition(fileName: string, position: number): string;
        getSignatureAtPosition(fileName: string, position: number): string;
        getDefinitionAtPosition(fileName: string, position: number): string;
        getReferencesAtPosition(fileName: string, position: number): string;
        getOccurrencesAtPosition(fileName: string, position: number): string;
        getImplementorsAtPosition(fileName: string, position: number): string;
        getNavigateToItems(searchValue: string): string;
        getScriptLexicalStructure(fileName: string): string;
        getOutliningRegions(fileName: string): string;
        getBraceMatchingAtPosition(fileName: string, position: number): string;
        getIndentationAtPosition(fileName: string, position: number, options: string): string;
        getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: string): string;
        getFormattingEditsForDocument(fileName: string, minChar: number, limChar: number, options: string): string;
        getFormattingEditsOnPaste(fileName: string, minChar: number, limChar: number, options: string): string;
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string): string;
        getEmitOutput(fileName: string): string;
    }
    class LanguageServiceShimHostAdapter implements ILanguageServiceHost {
        private shimHost;
        constructor(shimHost: ILanguageServiceShimHost);
        public information(): boolean;
        public debug(): boolean;
        public warning(): boolean;
        public error(): boolean;
        public fatal(): boolean;
        public log(s: string): void;
        public getCompilationSettings(): CompilationSettings;
        public getScriptFileNames(): string[];
        public getScriptSnapshot(fileName: string): IScriptSnapshot;
        public getScriptVersion(fileName: string): number;
        public getScriptIsOpen(fileName: string): boolean;
        public getScriptByteOrderMark(fileName: string): ByteOrderMark;
        public getDiagnosticsObject(): ILanguageServicesDiagnostics;
        public getLocalizedDiagnosticMessages(): any;
        public getCancellationToken(): ICancellationToken;
        public resolveRelativePath(path: string, directory: string): string;
        public fileExists(path: string): boolean;
        public directoryExists(path: string): boolean;
        public getParentDirectory(path: string): string;
    }
    function simpleForwardCall(logger: ILogger, actionDescription: string, action: () => any): any;
    function forwardJSONCall(logger: ILogger, actionDescription: string, action: () => any): string;
    class LanguageServiceShim extends ShimBase implements ILanguageServiceShim {
        private host;
        public languageService: ILanguageService;
        private logger;
        constructor(factory: IShimFactory, host: ILanguageServiceShimHost, languageService: ILanguageService);
        public forwardJSONCall(actionDescription: string, action: () => any): string;
        public dispose(dummy: any): void;
        public refresh(throwOnError: boolean): void;
        public cleanupSemanticCache(): void;
        private static realizeDiagnosticCategory(category);
        private static realizeDiagnostic(diagnostic);
        private realizeDiagnosticWithFileName(diagnostic);
        public getSyntacticDiagnostics(fileName: string): string;
        public getSemanticDiagnostics(fileName: string): string;
        public getCompilerOptionsDiagnostics(): string;
        public getTypeAtPosition(fileName: string, position: number): string;
        public getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string;
        public getBreakpointStatementAtPosition(fileName: string, position: number): string;
        public getSignatureAtPosition(fileName: string, position: number): string;
        public getDefinitionAtPosition(fileName: string, position: number): string;
        public getBraceMatchingAtPosition(fileName: string, position: number): string;
        public getIndentationAtPosition(fileName: string, position: number, options: string): string;
        public getReferencesAtPosition(fileName: string, position: number): string;
        public getOccurrencesAtPosition(fileName: string, position: number): string;
        public getImplementorsAtPosition(fileName: string, position: number): string;
        public getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): string;
        public getCompletionEntryDetails(fileName: string, position: number, entryName: string): string;
        public getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: string): string;
        public getFormattingEditsForDocument(fileName: string, minChar: number, limChar: number, options: string): string;
        public getFormattingEditsOnPaste(fileName: string, minChar: number, limChar: number, options: string): string;
        public getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string): string;
        public getNavigateToItems(searchValue: string): string;
        public getScriptLexicalStructure(fileName: string): string;
        public getOutliningRegions(fileName: string): string;
        public getEmitOutput(fileName: string): string;
        private _navigateToItemsToString(items);
    }
    class ClassifierShim extends ShimBase {
        public host: IClassifierHost;
        public classifier: Classifier;
        constructor(factory: IShimFactory, host: IClassifierHost);
        public getClassificationsForLine(text: string, lexState: EndOfLineState): string;
    }
    class CoreServicesShim extends ShimBase {
        public host: ICoreServicesHost;
        public logger: ILogger;
        public services: CoreServices;
        constructor(factory: IShimFactory, host: ICoreServicesHost);
        private forwardJSONCall(actionDescription, action);
        public getPreProcessedFileInfo(fileName: string, sourceText: IScriptSnapshot): string;
        public getDefaultCompilationSettings(): string;
        public dumpMemory(dummy: any): string;
        public getMemoryInfo(dummy: any): string;
    }
}
declare module TypeScript.Services {
    class OutliningElementsCollector extends DepthLimitedWalker {
        private static MaximumDepth;
        private inObjectLiteralExpression;
        private elements;
        constructor();
        public visitClassDeclaration(node: ClassDeclarationSyntax): void;
        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void;
        public visitModuleDeclaration(node: ModuleDeclarationSyntax): void;
        public visitEnumDeclaration(node: EnumDeclarationSyntax): void;
        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void;
        public visitFunctionExpression(node: FunctionExpressionSyntax): void;
        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void;
        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void;
        public visitGetAccessor(node: GetAccessorSyntax): void;
        public visitSetAccessor(node: SetAccessorSyntax): void;
        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void;
        private addOutlineRange(node, startElement, endElement);
        static collectElements(node: SourceUnitSyntax): TextSpan[];
    }
}
declare module TypeScript.Services {
    class BraceMatcher {
        static getMatchSpans(syntaxTree: SyntaxTree, position: number): TextSpan[];
        private static getMatchingCloseBrace(currentToken, position, result);
        private static getMatchingOpenBrace(currentToken, position, result);
        private static getMatchingCloseBraceTokenKind(positionedElement);
        private static getMatchingOpenBraceTokenKind(positionedElement);
    }
}
declare module TypeScript.Services {
    class Indenter {
        static getIndentation(node: SourceUnitSyntax, soruceText: IScriptSnapshot, position: number, editorOptions: EditorOptions): number;
        private static belongsToBracket(sourceText, token, position);
        private static isInContainerNode(parent, element);
        private static getCustomListIndentation(list, element);
        private static getListItemIndentation(list, elementIndex);
    }
}
declare module TypeScript.Services.Breakpoints {
    function getBreakpointLocation(syntaxTree: SyntaxTree, askedPos: number): SpanInfo;
}
declare module TypeScript.Services {
    class GetScriptLexicalStructureWalker extends SyntaxWalker {
        private fileName;
        private nameStack;
        private kindStack;
        private parentScopes;
        private currentScope;
        private createScope();
        private pushNewContainerScope(containerName, kind);
        private popScope();
        constructor(fileName: string);
        private collectItems(items, scope?);
        static getListsOfAllScriptLexicalStructure(items: NavigateToItem[], fileName: string, unit: SourceUnitSyntax): void;
        private createItem(node, modifiers, kind, name);
        private addAdditionalSpan(node, key);
        private getKindModifiers(modifiers);
        public visitModuleDeclaration(node: ModuleDeclarationSyntax): void;
        private visitModuleDeclarationWorker(node, names, nameIndex);
        private getModuleNames(node);
        private getModuleNamesHelper(name, result);
        public visitClassDeclaration(node: ClassDeclarationSyntax): void;
        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void;
        public visitObjectType(node: ObjectTypeSyntax): void;
        public visitEnumDeclaration(node: EnumDeclarationSyntax): void;
        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void;
        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void;
        public visitGetAccessor(node: GetAccessorSyntax): void;
        public visitSetAccessor(node: SetAccessorSyntax): void;
        public visitVariableDeclarator(node: VariableDeclaratorSyntax): void;
        public visitIndexSignature(node: IndexSignatureSyntax): void;
        public visitEnumElement(node: EnumElementSyntax): void;
        public visitCallSignature(node: CallSignatureSyntax): void;
        public visitConstructSignature(node: ConstructSignatureSyntax): void;
        public visitMethodSignature(node: MethodSignatureSyntax): void;
        public visitPropertySignature(node: PropertySignatureSyntax): void;
        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void;
        public visitBlock(node: BlockSyntax): void;
        public visitIfStatement(node: IfStatementSyntax): void;
        public visitExpressionStatement(node: ExpressionStatementSyntax): void;
        public visitThrowStatement(node: ThrowStatementSyntax): void;
        public visitReturnStatement(node: ReturnStatementSyntax): void;
        public visitSwitchStatement(node: SwitchStatementSyntax): void;
        public visitWithStatement(node: WithStatementSyntax): void;
        public visitTryStatement(node: TryStatementSyntax): void;
        public visitLabeledStatement(node: LabeledStatementSyntax): void;
    }
}
declare module TypeScript {
    class SyntaxElementsCollector extends SyntaxWalker {
        private elements;
        public visitNode(node: ISyntaxNode): void;
        public visitToken(token: ISyntaxToken): void;
        public visitSyntaxList(list: ISyntaxNodeOrToken[]): void;
        public visitSeparatedSyntaxList(list: ISyntaxNodeOrToken[]): void;
        static collectElements(node: SourceUnitSyntax): ISyntaxElement[];
    }
    class IncrementalParserTests {
        static runAllTests(): void;
        static reusedElements(oldNode: SourceUnitSyntax, newNode: SourceUnitSyntax): number;
        static testIncremental1(): void;
        static testIncremental2(): void;
        static testIncrementalRegex1(): void;
        static testIncrementalRegex2(): void;
        static testIncrementalComment1(): void;
        static testIncrementalComment2(): void;
        static testIncrementalComment3(): void;
        static testIncrementalComment4(): void;
        static testParameter1(): void;
        static testTypeMember1(): void;
        static testEnumElement1(): void;
        static testStrictMode1(): void;
        static testStrictMode2(): void;
        static testStrictMode3(): void;
        static testStrictMode4(): void;
        static testIncremental5(): void;
        static testIncremental6(): void;
        static testDelete1(): void;
        static testIncremental3(): void;
        static testIncremental4(): void;
        static testIncremental7(): void;
        static testIncremental8(): void;
        static testIncremental9(): void;
        static testIncremental10(): void;
        static testIncremental11(): void;
        static testGenerics1(): void;
        static testGenerics2(): void;
        static testGenerics3(): void;
        static testGenerics4(): void;
        static testGenerics5(): void;
        static testGenerics6(): void;
        static testGenerics7(): void;
        static testGenerics8(): void;
        static testParenthesizedExpressionToLambda(): void;
        static testLambdaToParenthesizedExpression(): void;
        static testGenericToArithmetic(): void;
        static testArithmeticToGeneric(): void;
        static textComplexEdits1(): void;
        static testSemicolonDelete1(): void;
        static testGenericError1(): void;
        static testParameterDeleteAfterComment1(): void;
        static testInsertModifierBeforeSetter1(): void;
        static testParameter2(): void;
        static testInsertAboveComment(): void;
        static testInsertDeclareAboveModule(): void;
        static testInsertFunctionAboveLambdaWithComment(): void;
        static testSlashToRegex1(): void;
        static testRegex1(): void;
        static testRegex2(): void;
        static testKeywordAsIdentifier1(): void;
        static testSkippedToken1(): void;
    }
}
declare module TypeScript {
    function nodeStructuralEquals(node1: ISyntaxNode, node2: ISyntaxNode, checkParents: boolean, text1: ISimpleText, text2: ISimpleText): boolean;
    function nodeOrTokenStructuralEquals(node1: ISyntaxNodeOrToken, node2: ISyntaxNodeOrToken, checkParents: boolean, text1: ISimpleText, text2: ISimpleText): boolean;
    function tokenStructuralEquals(token1: ISyntaxToken, token2: ISyntaxToken, text1: ISimpleText, text2: ISimpleText): boolean;
    function triviaListStructuralEquals(triviaList1: ISyntaxTriviaList, triviaList2: ISyntaxTriviaList): boolean;
    function triviaStructuralEquals(trivia1: ISyntaxTrivia, trivia2: ISyntaxTrivia): boolean;
    function elementStructuralEquals(element1: ISyntaxElement, element2: ISyntaxElement, checkParents: boolean, text1: ISimpleText, text2: ISimpleText): boolean;
    function treeStructuralEquals(tree1: SyntaxTree, tree2: SyntaxTree, checkParents: boolean): boolean;
}
declare var timer: TypeScript.Timer;
declare var specificFile: string;
declare var generate: boolean;
declare class PositionValidatingWalker extends TypeScript.SyntaxWalker {
    private position;
    public visitToken(token: TypeScript.ISyntaxToken): void;
}
declare function tokenToJSON(token: TypeScript.ISyntaxToken, text: TypeScript.ISimpleText): any;
declare function triviaListToJSON(trivia: TypeScript.ISyntaxTriviaList, text: TypeScript.ISimpleText): any;
declare function triviaToJSON(trivia: TypeScript.ISyntaxTrivia, text: TypeScript.ISimpleText): any;
declare function nodeToJSON(node: TypeScript.ISyntaxNode, text: TypeScript.ISimpleText): any;
declare function elementToJSON(element: TypeScript.ISyntaxElement, text: TypeScript.ISimpleText): any;
declare function syntaxTreeToJSON(tree: TypeScript.SyntaxTree): any;
declare function emptySourceUnit(): TypeScript.SourceUnitSyntax;
declare class Program {
    public runAllTests(verify: boolean): void;
    private static reusedElements(oldNode, newNode, key);
    private testIncrementalSpeed(fileName);
    private testIncrementalSpeedNoChange(fileName, repeat);
    private testIncrementalSpeedChange(fileName, repeat);
    private handleException(fileName, e);
    private runTests(path, action);
    private checkResult(fileName, result, convert, verify, generateBaseline, justText);
    public runEmitter(fileName: string, languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean, justText: boolean): void;
    public runPrettyPrinter(fileName: string, languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean): void;
    public runParser(fileName: string, languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean, allowErrors?: boolean): void;
    public runIncremental(fileName: string, languageVersion: TypeScript.LanguageVersion): void;
    public runFindToken(fileName: string, languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean): void;
    public runTrivia(fileName: string, languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean): void;
    public runScanner(fileName: string, languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean): void;
    public parseArguments(): void;
    public run262(): void;
}
declare var diagnostics: TypeScript.IIndexable<any>;
declare var whatever: string;
declare var andersTime: number;
declare var cyrusTime: number;
declare var totalTime: number;
declare var totalSize: number;
declare var program: Program;
declare var count: number;
