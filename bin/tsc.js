/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var ts;
(function (ts) {
    ts.Diagnostics = {
        Unterminated_string_literal: { code: 1002, category: 1 /* Error */, key: "Unterminated string literal." },
        Identifier_expected: { code: 1003, category: 1 /* Error */, key: "Identifier expected." },
        _0_expected: { code: 1005, category: 1 /* Error */, key: "'{0}' expected." },
        A_file_cannot_have_a_reference_to_itself: { code: 1006, category: 1 /* Error */, key: "A file cannot have a reference to itself." },
        Trailing_comma_not_allowed: { code: 1009, category: 1 /* Error */, key: "Trailing comma not allowed." },
        Asterisk_Slash_expected: { code: 1010, category: 1 /* Error */, key: "'*/' expected." },
        Unexpected_token: { code: 1012, category: 1 /* Error */, key: "Unexpected token." },
        Catch_clause_parameter_cannot_have_a_type_annotation: { code: 1013, category: 1 /* Error */, key: "Catch clause parameter cannot have a type annotation." },
        A_rest_parameter_must_be_last_in_a_parameter_list: { code: 1014, category: 1 /* Error */, key: "A rest parameter must be last in a parameter list." },
        Parameter_cannot_have_question_mark_and_initializer: { code: 1015, category: 1 /* Error */, key: "Parameter cannot have question mark and initializer." },
        A_required_parameter_cannot_follow_an_optional_parameter: { code: 1016, category: 1 /* Error */, key: "A required parameter cannot follow an optional parameter." },
        An_index_signature_cannot_have_a_rest_parameter: { code: 1017, category: 1 /* Error */, key: "An index signature cannot have a rest parameter." },
        An_index_signature_parameter_cannot_have_an_accessibility_modifier: { code: 1018, category: 1 /* Error */, key: "An index signature parameter cannot have an accessibility modifier." },
        An_index_signature_parameter_cannot_have_a_question_mark: { code: 1019, category: 1 /* Error */, key: "An index signature parameter cannot have a question mark." },
        An_index_signature_parameter_cannot_have_an_initializer: { code: 1020, category: 1 /* Error */, key: "An index signature parameter cannot have an initializer." },
        An_index_signature_must_have_a_type_annotation: { code: 1021, category: 1 /* Error */, key: "An index signature must have a type annotation." },
        An_index_signature_parameter_must_have_a_type_annotation: { code: 1022, category: 1 /* Error */, key: "An index signature parameter must have a type annotation." },
        An_index_signature_parameter_type_must_be_string_or_number: { code: 1023, category: 1 /* Error */, key: "An index signature parameter type must be 'string' or 'number'." },
        A_class_or_interface_declaration_can_only_have_one_extends_clause: { code: 1024, category: 1 /* Error */, key: "A class or interface declaration can only have one 'extends' clause." },
        An_extends_clause_must_precede_an_implements_clause: { code: 1025, category: 1 /* Error */, key: "An 'extends' clause must precede an 'implements' clause." },
        A_class_can_only_extend_a_single_class: { code: 1026, category: 1 /* Error */, key: "A class can only extend a single class." },
        A_class_declaration_can_only_have_one_implements_clause: { code: 1027, category: 1 /* Error */, key: "A class declaration can only have one 'implements' clause." },
        Accessibility_modifier_already_seen: { code: 1028, category: 1 /* Error */, key: "Accessibility modifier already seen." },
        _0_modifier_must_precede_1_modifier: { code: 1029, category: 1 /* Error */, key: "'{0}' modifier must precede '{1}' modifier." },
        _0_modifier_already_seen: { code: 1030, category: 1 /* Error */, key: "'{0}' modifier already seen." },
        _0_modifier_cannot_appear_on_a_class_element: { code: 1031, category: 1 /* Error */, key: "'{0}' modifier cannot appear on a class element." },
        An_interface_declaration_cannot_have_an_implements_clause: { code: 1032, category: 1 /* Error */, key: "An interface declaration cannot have an 'implements' clause." },
        super_must_be_followed_by_an_argument_list_or_member_access: { code: 1034, category: 1 /* Error */, key: "'super' must be followed by an argument list or member access." },
        Only_ambient_modules_can_use_quoted_names: { code: 1035, category: 1 /* Error */, key: "Only ambient modules can use quoted names." },
        Statements_are_not_allowed_in_ambient_contexts: { code: 1036, category: 1 /* Error */, key: "Statements are not allowed in ambient contexts." },
        A_function_implementation_cannot_be_declared_in_an_ambient_context: { code: 1037, category: 1 /* Error */, key: "A function implementation cannot be declared in an ambient context." },
        A_declare_modifier_cannot_be_used_in_an_already_ambient_context: { code: 1038, category: 1 /* Error */, key: "A 'declare' modifier cannot be used in an already ambient context." },
        Initializers_are_not_allowed_in_ambient_contexts: { code: 1039, category: 1 /* Error */, key: "Initializers are not allowed in ambient contexts." },
        _0_modifier_cannot_appear_on_a_module_element: { code: 1044, category: 1 /* Error */, key: "'{0}' modifier cannot appear on a module element." },
        A_declare_modifier_cannot_be_used_with_an_interface_declaration: { code: 1045, category: 1 /* Error */, key: "A 'declare' modifier cannot be used with an interface declaration." },
        A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file: { code: 1046, category: 1 /* Error */, key: "A 'declare' modifier is required for a top level declaration in a .d.ts file." },
        A_rest_parameter_cannot_be_optional: { code: 1047, category: 1 /* Error */, key: "A rest parameter cannot be optional." },
        A_rest_parameter_cannot_have_an_initializer: { code: 1048, category: 1 /* Error */, key: "A rest parameter cannot have an initializer." },
        A_set_accessor_must_have_exactly_one_parameter: { code: 1049, category: 1 /* Error */, key: "A 'set' accessor must have exactly one parameter." },
        A_set_accessor_cannot_have_an_optional_parameter: { code: 1051, category: 1 /* Error */, key: "A 'set' accessor cannot have an optional parameter." },
        A_set_accessor_parameter_cannot_have_an_initializer: { code: 1052, category: 1 /* Error */, key: "A 'set' accessor parameter cannot have an initializer." },
        A_set_accessor_cannot_have_rest_parameter: { code: 1053, category: 1 /* Error */, key: "A 'set' accessor cannot have rest parameter." },
        A_get_accessor_cannot_have_parameters: { code: 1054, category: 1 /* Error */, key: "A 'get' accessor cannot have parameters." },
        Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher: { code: 1056, category: 1 /* Error */, key: "Accessors are only available when targeting ECMAScript 5 and higher." },
        Enum_member_must_have_initializer: { code: 1061, category: 1 /* Error */, key: "Enum member must have initializer." },
        An_export_assignment_cannot_be_used_in_an_internal_module: { code: 1063, category: 1 /* Error */, key: "An export assignment cannot be used in an internal module." },
        Ambient_enum_elements_can_only_have_integer_literal_initializers: { code: 1066, category: 1 /* Error */, key: "Ambient enum elements can only have integer literal initializers." },
        Unexpected_token_A_constructor_method_accessor_or_property_was_expected: { code: 1068, category: 1 /* Error */, key: "Unexpected token. A constructor, method, accessor, or property was expected." },
        A_declare_modifier_cannot_be_used_with_an_import_declaration: { code: 1079, category: 1 /* Error */, key: "A 'declare' modifier cannot be used with an import declaration." },
        Invalid_reference_directive_syntax: { code: 1084, category: 1 /* Error */, key: "Invalid 'reference' directive syntax." },
        Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher: { code: 1085, category: 1 /* Error */, key: "Octal literals are not available when targeting ECMAScript 5 and higher." },
        An_accessor_cannot_be_declared_in_an_ambient_context: { code: 1086, category: 1 /* Error */, key: "An accessor cannot be declared in an ambient context." },
        _0_modifier_cannot_appear_on_a_constructor_declaration: { code: 1089, category: 1 /* Error */, key: "'{0}' modifier cannot appear on a constructor declaration." },
        _0_modifier_cannot_appear_on_a_parameter: { code: 1090, category: 1 /* Error */, key: "'{0}' modifier cannot appear on a parameter." },
        Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement: { code: 1091, category: 1 /* Error */, key: "Only a single variable declaration is allowed in a 'for...in' statement." },
        Type_parameters_cannot_appear_on_a_constructor_declaration: { code: 1092, category: 1 /* Error */, key: "Type parameters cannot appear on a constructor declaration." },
        Type_annotation_cannot_appear_on_a_constructor_declaration: { code: 1093, category: 1 /* Error */, key: "Type annotation cannot appear on a constructor declaration." },
        An_accessor_cannot_have_type_parameters: { code: 1094, category: 1 /* Error */, key: "An accessor cannot have type parameters." },
        A_set_accessor_cannot_have_a_return_type_annotation: { code: 1095, category: 1 /* Error */, key: "A 'set' accessor cannot have a return type annotation." },
        An_index_signature_must_have_exactly_one_parameter: { code: 1096, category: 1 /* Error */, key: "An index signature must have exactly one parameter." },
        _0_list_cannot_be_empty: { code: 1097, category: 1 /* Error */, key: "'{0}' list cannot be empty." },
        Type_parameter_list_cannot_be_empty: { code: 1098, category: 1 /* Error */, key: "Type parameter list cannot be empty." },
        Type_argument_list_cannot_be_empty: { code: 1099, category: 1 /* Error */, key: "Type argument list cannot be empty." },
        Invalid_use_of_0_in_strict_mode: { code: 1100, category: 1 /* Error */, key: "Invalid use of '{0}' in strict mode." },
        with_statements_are_not_allowed_in_strict_mode: { code: 1101, category: 1 /* Error */, key: "'with' statements are not allowed in strict mode." },
        delete_cannot_be_called_on_an_identifier_in_strict_mode: { code: 1102, category: 1 /* Error */, key: "'delete' cannot be called on an identifier in strict mode." },
        A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement: { code: 1104, category: 1 /* Error */, key: "A 'continue' statement can only be used within an enclosing iteration statement." },
        A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement: { code: 1105, category: 1 /* Error */, key: "A 'break' statement can only be used within an enclosing iteration or switch statement." },
        Jump_target_cannot_cross_function_boundary: { code: 1107, category: 1 /* Error */, key: "Jump target cannot cross function boundary." },
        A_return_statement_can_only_be_used_within_a_function_body: { code: 1108, category: 1 /* Error */, key: "A 'return' statement can only be used within a function body." },
        Expression_expected: { code: 1109, category: 1 /* Error */, key: "Expression expected." },
        Type_expected: { code: 1110, category: 1 /* Error */, key: "Type expected." },
        A_constructor_implementation_cannot_be_declared_in_an_ambient_context: { code: 1111, category: 1 /* Error */, key: "A constructor implementation cannot be declared in an ambient context." },
        A_class_member_cannot_be_declared_optional: { code: 1112, category: 1 /* Error */, key: "A class member cannot be declared optional." },
        A_default_clause_cannot_appear_more_than_once_in_a_switch_statement: { code: 1113, category: 1 /* Error */, key: "A 'default' clause cannot appear more than once in a 'switch' statement." },
        Duplicate_label_0: { code: 1114, category: 1 /* Error */, key: "Duplicate label '{0}'" },
        A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement: { code: 1115, category: 1 /* Error */, key: "A 'continue' statement can only jump to a label of an enclosing iteration statement." },
        A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement: { code: 1116, category: 1 /* Error */, key: "A 'break' statement can only jump to a label of an enclosing statement." },
        An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode: { code: 1117, category: 1 /* Error */, key: "An object literal cannot have multiple properties with the same name in strict mode." },
        An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name: { code: 1118, category: 1 /* Error */, key: "An object literal cannot have multiple get/set accessors with the same name." },
        An_object_literal_cannot_have_property_and_accessor_with_the_same_name: { code: 1119, category: 1 /* Error */, key: "An object literal cannot have property and accessor with the same name." },
        An_export_assignment_cannot_have_modifiers: { code: 1120, category: 1 /* Error */, key: "An export assignment cannot have modifiers." },
        Octal_literals_are_not_allowed_in_strict_mode: { code: 1121, category: 1 /* Error */, key: "Octal literals are not allowed in strict mode." },
        A_tuple_type_element_list_cannot_be_empty: { code: 1122, category: 1 /* Error */, key: "A tuple type element list cannot be empty." },
        Variable_declaration_list_cannot_be_empty: { code: 1123, category: 1 /* Error */, key: "Variable declaration list cannot be empty." },
        Digit_expected: { code: 1124, category: 1 /* Error */, key: "Digit expected." },
        Hexadecimal_digit_expected: { code: 1125, category: 1 /* Error */, key: "Hexadecimal digit expected." },
        Unexpected_end_of_text: { code: 1126, category: 1 /* Error */, key: "Unexpected end of text." },
        Invalid_character: { code: 1127, category: 1 /* Error */, key: "Invalid character." },
        Declaration_or_statement_expected: { code: 1128, category: 1 /* Error */, key: "Declaration or statement expected." },
        Statement_expected: { code: 1129, category: 1 /* Error */, key: "Statement expected." },
        case_or_default_expected: { code: 1130, category: 1 /* Error */, key: "'case' or 'default' expected." },
        Property_or_signature_expected: { code: 1131, category: 1 /* Error */, key: "Property or signature expected." },
        Enum_member_expected: { code: 1132, category: 1 /* Error */, key: "Enum member expected." },
        Type_reference_expected: { code: 1133, category: 1 /* Error */, key: "Type reference expected." },
        Variable_declaration_expected: { code: 1134, category: 1 /* Error */, key: "Variable declaration expected." },
        Argument_expression_expected: { code: 1135, category: 1 /* Error */, key: "Argument expression expected." },
        Property_assignment_expected: { code: 1136, category: 1 /* Error */, key: "Property assignment expected." },
        Expression_or_comma_expected: { code: 1137, category: 1 /* Error */, key: "Expression or comma expected." },
        Parameter_declaration_expected: { code: 1138, category: 1 /* Error */, key: "Parameter declaration expected." },
        Type_parameter_declaration_expected: { code: 1139, category: 1 /* Error */, key: "Type parameter declaration expected." },
        Type_argument_expected: { code: 1140, category: 1 /* Error */, key: "Type argument expected." },
        String_literal_expected: { code: 1141, category: 1 /* Error */, key: "String literal expected." },
        Line_break_not_permitted_here: { code: 1142, category: 1 /* Error */, key: "Line break not permitted here." },
        catch_or_finally_expected: { code: 1143, category: 1 /* Error */, key: "'catch' or 'finally' expected." },
        Block_or_expected: { code: 1144, category: 1 /* Error */, key: "Block or ';' expected." },
        Modifiers_not_permitted_on_index_signature_members: { code: 1145, category: 1 /* Error */, key: "Modifiers not permitted on index signature members." },
        Declaration_expected: { code: 1146, category: 1 /* Error */, key: "Declaration expected." },
        Import_declarations_in_an_internal_module_cannot_reference_an_external_module: { code: 1147, category: 1 /* Error */, key: "Import declarations in an internal module cannot reference an external module." },
        Cannot_compile_external_modules_unless_the_module_flag_is_provided: { code: 1148, category: 1 /* Error */, key: "Cannot compile external modules unless the '--module' flag is provided." },
        Filename_0_differs_from_already_included_filename_1_only_in_casing: { code: 1149, category: 1 /* Error */, key: "Filename '{0}' differs from already included filename '{1}' only in casing" },
        new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead: { code: 1150, category: 1 /* Error */, key: "'new T[]' cannot be used to create an array. Use 'new Array<T>()' instead." },
        var_let_or_const_expected: { code: 1152, category: 1 /* Error */, key: "'var', 'let' or 'const' expected." },
        let_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher: { code: 1153, category: 1 /* Error */, key: "'let' declarations are only available when targeting ECMAScript 6 and higher." },
        const_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher: { code: 1154, category: 1 /* Error */, key: "'const' declarations are only available when targeting ECMAScript 6 and higher." },
        const_declarations_must_be_initialized: { code: 1155, category: 1 /* Error */, key: "'const' declarations must be initialized" },
        const_declarations_can_only_be_declared_inside_a_block: { code: 1156, category: 1 /* Error */, key: "'const' declarations can only be declared inside a block." },
        let_declarations_can_only_be_declared_inside_a_block: { code: 1157, category: 1 /* Error */, key: "'let' declarations can only be declared inside a block." },
        Invalid_template_literal_expected: { code: 1158, category: 1 /* Error */, key: "Invalid template literal; expected '}'" },
        Tagged_templates_are_only_available_when_targeting_ECMAScript_6_and_higher: { code: 1159, category: 1 /* Error */, key: "Tagged templates are only available when targeting ECMAScript 6 and higher." },
        Duplicate_identifier_0: { code: 2300, category: 1 /* Error */, key: "Duplicate identifier '{0}'." },
        Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor: { code: 2301, category: 1 /* Error */, key: "Initializer of instance member variable '{0}' cannot reference identifier '{1}' declared in the constructor." },
        Static_members_cannot_reference_class_type_parameters: { code: 2302, category: 1 /* Error */, key: "Static members cannot reference class type parameters." },
        Circular_definition_of_import_alias_0: { code: 2303, category: 1 /* Error */, key: "Circular definition of import alias '{0}'." },
        Cannot_find_name_0: { code: 2304, category: 1 /* Error */, key: "Cannot find name '{0}'." },
        Module_0_has_no_exported_member_1: { code: 2305, category: 1 /* Error */, key: "Module '{0}' has no exported member '{1}'." },
        File_0_is_not_an_external_module: { code: 2306, category: 1 /* Error */, key: "File '{0}' is not an external module." },
        Cannot_find_external_module_0: { code: 2307, category: 1 /* Error */, key: "Cannot find external module '{0}'." },
        A_module_cannot_have_more_than_one_export_assignment: { code: 2308, category: 1 /* Error */, key: "A module cannot have more than one export assignment." },
        An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements: { code: 2309, category: 1 /* Error */, key: "An export assignment cannot be used in a module with other exported elements." },
        Type_0_recursively_references_itself_as_a_base_type: { code: 2310, category: 1 /* Error */, key: "Type '{0}' recursively references itself as a base type." },
        A_class_may_only_extend_another_class: { code: 2311, category: 1 /* Error */, key: "A class may only extend another class." },
        An_interface_may_only_extend_a_class_or_another_interface: { code: 2312, category: 1 /* Error */, key: "An interface may only extend a class or another interface." },
        Constraint_of_a_type_parameter_cannot_reference_any_type_parameter_from_the_same_type_parameter_list: { code: 2313, category: 1 /* Error */, key: "Constraint of a type parameter cannot reference any type parameter from the same type parameter list." },
        Generic_type_0_requires_1_type_argument_s: { code: 2314, category: 1 /* Error */, key: "Generic type '{0}' requires {1} type argument(s)." },
        Type_0_is_not_generic: { code: 2315, category: 1 /* Error */, key: "Type '{0}' is not generic." },
        Global_type_0_must_be_a_class_or_interface_type: { code: 2316, category: 1 /* Error */, key: "Global type '{0}' must be a class or interface type." },
        Global_type_0_must_have_1_type_parameter_s: { code: 2317, category: 1 /* Error */, key: "Global type '{0}' must have {1} type parameter(s)." },
        Cannot_find_global_type_0: { code: 2318, category: 1 /* Error */, key: "Cannot find global type '{0}'." },
        Named_properties_0_of_types_1_and_2_are_not_identical: { code: 2319, category: 1 /* Error */, key: "Named properties '{0}' of types '{1}' and '{2}' are not identical." },
        Interface_0_cannot_simultaneously_extend_types_1_and_2: { code: 2320, category: 1 /* Error */, key: "Interface '{0}' cannot simultaneously extend types '{1}' and '{2}'." },
        Excessive_stack_depth_comparing_types_0_and_1: { code: 2321, category: 1 /* Error */, key: "Excessive stack depth comparing types '{0}' and '{1}'." },
        Type_0_is_not_assignable_to_type_1: { code: 2323, category: 1 /* Error */, key: "Type '{0}' is not assignable to type '{1}'." },
        Property_0_is_missing_in_type_1: { code: 2324, category: 1 /* Error */, key: "Property '{0}' is missing in type '{1}'." },
        Property_0_is_private_in_type_1_but_not_in_type_2: { code: 2325, category: 1 /* Error */, key: "Property '{0}' is private in type '{1}' but not in type '{2}'." },
        Types_of_property_0_are_incompatible: { code: 2326, category: 1 /* Error */, key: "Types of property '{0}' are incompatible." },
        Property_0_is_optional_in_type_1_but_required_in_type_2: { code: 2327, category: 1 /* Error */, key: "Property '{0}' is optional in type '{1}' but required in type '{2}'." },
        Types_of_parameters_0_and_1_are_incompatible: { code: 2328, category: 1 /* Error */, key: "Types of parameters '{0}' and '{1}' are incompatible." },
        Index_signature_is_missing_in_type_0: { code: 2329, category: 1 /* Error */, key: "Index signature is missing in type '{0}'." },
        Index_signatures_are_incompatible: { code: 2330, category: 1 /* Error */, key: "Index signatures are incompatible." },
        this_cannot_be_referenced_in_a_module_body: { code: 2331, category: 1 /* Error */, key: "'this' cannot be referenced in a module body." },
        this_cannot_be_referenced_in_current_location: { code: 2332, category: 1 /* Error */, key: "'this' cannot be referenced in current location." },
        this_cannot_be_referenced_in_constructor_arguments: { code: 2333, category: 1 /* Error */, key: "'this' cannot be referenced in constructor arguments." },
        this_cannot_be_referenced_in_a_static_property_initializer: { code: 2334, category: 1 /* Error */, key: "'this' cannot be referenced in a static property initializer." },
        super_can_only_be_referenced_in_a_derived_class: { code: 2335, category: 1 /* Error */, key: "'super' can only be referenced in a derived class." },
        super_cannot_be_referenced_in_constructor_arguments: { code: 2336, category: 1 /* Error */, key: "'super' cannot be referenced in constructor arguments." },
        Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors: { code: 2337, category: 1 /* Error */, key: "Super calls are not permitted outside constructors or in nested functions inside constructors" },
        super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class: { code: 2338, category: 1 /* Error */, key: "'super' property access is permitted only in a constructor, member function, or member accessor of a derived class" },
        Property_0_does_not_exist_on_type_1: { code: 2339, category: 1 /* Error */, key: "Property '{0}' does not exist on type '{1}'." },
        Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword: { code: 2340, category: 1 /* Error */, key: "Only public and protected methods of the base class are accessible via the 'super' keyword" },
        Property_0_is_private_and_only_accessible_within_class_1: { code: 2341, category: 1 /* Error */, key: "Property '{0}' is private and only accessible within class '{1}'." },
        An_index_expression_argument_must_be_of_type_string_number_or_any: { code: 2342, category: 1 /* Error */, key: "An index expression argument must be of type 'string', 'number', or 'any'." },
        Type_0_does_not_satisfy_the_constraint_1: { code: 2344, category: 1 /* Error */, key: "Type '{0}' does not satisfy the constraint '{1}'." },
        Argument_of_type_0_is_not_assignable_to_parameter_of_type_1: { code: 2345, category: 1 /* Error */, key: "Argument of type '{0}' is not assignable to parameter of type '{1}'." },
        Supplied_parameters_do_not_match_any_signature_of_call_target: { code: 2346, category: 1 /* Error */, key: "Supplied parameters do not match any signature of call target." },
        Untyped_function_calls_may_not_accept_type_arguments: { code: 2347, category: 1 /* Error */, key: "Untyped function calls may not accept type arguments." },
        Value_of_type_0_is_not_callable_Did_you_mean_to_include_new: { code: 2348, category: 1 /* Error */, key: "Value of type '{0}' is not callable. Did you mean to include 'new'?" },
        Cannot_invoke_an_expression_whose_type_lacks_a_call_signature: { code: 2349, category: 1 /* Error */, key: "Cannot invoke an expression whose type lacks a call signature." },
        Only_a_void_function_can_be_called_with_the_new_keyword: { code: 2350, category: 1 /* Error */, key: "Only a void function can be called with the 'new' keyword." },
        Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature: { code: 2351, category: 1 /* Error */, key: "Cannot use 'new' with an expression whose type lacks a call or construct signature." },
        Neither_type_0_nor_type_1_is_assignable_to_the_other: { code: 2352, category: 1 /* Error */, key: "Neither type '{0}' nor type '{1}' is assignable to the other." },
        No_best_common_type_exists_among_return_expressions: { code: 2354, category: 1 /* Error */, key: "No best common type exists among return expressions." },
        A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value_or_consist_of_a_single_throw_statement: { code: 2355, category: 1 /* Error */, key: "A function whose declared type is neither 'void' nor 'any' must return a value or consist of a single 'throw' statement." },
        An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type: { code: 2356, category: 1 /* Error */, key: "An arithmetic operand must be of type 'any', 'number' or an enum type." },
        The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer: { code: 2357, category: 1 /* Error */, key: "The operand of an increment or decrement operator must be a variable, property or indexer." },
        The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: { code: 2358, category: 1 /* Error */, key: "The left-hand side of an 'instanceof' expression must be of type 'any', an object type or a type parameter." },
        The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type: { code: 2359, category: 1 /* Error */, key: "The right-hand side of an 'instanceof' expression must be of type 'any' or of a type assignable to the 'Function' interface type." },
        The_left_hand_side_of_an_in_expression_must_be_of_types_any_string_or_number: { code: 2360, category: 1 /* Error */, key: "The left-hand side of an 'in' expression must be of types 'any', 'string' or 'number'." },
        The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: { code: 2361, category: 1 /* Error */, key: "The right-hand side of an 'in' expression must be of type 'any', an object type or a type parameter" },
        The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: { code: 2362, category: 1 /* Error */, key: "The left-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type." },
        The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: { code: 2363, category: 1 /* Error */, key: "The right-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type." },
        Invalid_left_hand_side_of_assignment_expression: { code: 2364, category: 1 /* Error */, key: "Invalid left-hand side of assignment expression." },
        Operator_0_cannot_be_applied_to_types_1_and_2: { code: 2365, category: 1 /* Error */, key: "Operator '{0}' cannot be applied to types '{1}' and '{2}'." },
        Type_parameter_name_cannot_be_0: { code: 2368, category: 1 /* Error */, key: "Type parameter name cannot be '{0}'" },
        A_parameter_property_is_only_allowed_in_a_constructor_implementation: { code: 2369, category: 1 /* Error */, key: "A parameter property is only allowed in a constructor implementation." },
        A_rest_parameter_must_be_of_an_array_type: { code: 2370, category: 1 /* Error */, key: "A rest parameter must be of an array type." },
        A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation: { code: 2371, category: 1 /* Error */, key: "A parameter initializer is only allowed in a function or constructor implementation." },
        Parameter_0_cannot_be_referenced_in_its_initializer: { code: 2372, category: 1 /* Error */, key: "Parameter '{0}' cannot be referenced in its initializer." },
        Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it: { code: 2373, category: 1 /* Error */, key: "Initializer of parameter '{0}' cannot reference identifier '{1}' declared after it." },
        Duplicate_string_index_signature: { code: 2374, category: 1 /* Error */, key: "Duplicate string index signature." },
        Duplicate_number_index_signature: { code: 2375, category: 1 /* Error */, key: "Duplicate number index signature." },
        A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties: { code: 2376, category: 1 /* Error */, key: "A 'super' call must be the first statement in the constructor when a class contains initialized properties or has parameter properties." },
        Constructors_for_derived_classes_must_contain_a_super_call: { code: 2377, category: 1 /* Error */, key: "Constructors for derived classes must contain a 'super' call." },
        A_get_accessor_must_return_a_value_or_consist_of_a_single_throw_statement: { code: 2378, category: 1 /* Error */, key: "A 'get' accessor must return a value or consist of a single 'throw' statement." },
        Getter_and_setter_accessors_do_not_agree_in_visibility: { code: 2379, category: 1 /* Error */, key: "Getter and setter accessors do not agree in visibility." },
        get_and_set_accessor_must_have_the_same_type: { code: 2380, category: 1 /* Error */, key: "'get' and 'set' accessor must have the same type." },
        A_signature_with_an_implementation_cannot_use_a_string_literal_type: { code: 2381, category: 1 /* Error */, key: "A signature with an implementation cannot use a string literal type." },
        Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature: { code: 2382, category: 1 /* Error */, key: "Specialized overload signature is not assignable to any non-specialized signature." },
        Overload_signatures_must_all_be_exported_or_not_exported: { code: 2383, category: 1 /* Error */, key: "Overload signatures must all be exported or not exported." },
        Overload_signatures_must_all_be_ambient_or_non_ambient: { code: 2384, category: 1 /* Error */, key: "Overload signatures must all be ambient or non-ambient." },
        Overload_signatures_must_all_be_public_private_or_protected: { code: 2385, category: 1 /* Error */, key: "Overload signatures must all be public, private or protected." },
        Overload_signatures_must_all_be_optional_or_required: { code: 2386, category: 1 /* Error */, key: "Overload signatures must all be optional or required." },
        Function_overload_must_be_static: { code: 2387, category: 1 /* Error */, key: "Function overload must be static." },
        Function_overload_must_not_be_static: { code: 2388, category: 1 /* Error */, key: "Function overload must not be static." },
        Function_implementation_name_must_be_0: { code: 2389, category: 1 /* Error */, key: "Function implementation name must be '{0}'." },
        Constructor_implementation_is_missing: { code: 2390, category: 1 /* Error */, key: "Constructor implementation is missing." },
        Function_implementation_is_missing_or_not_immediately_following_the_declaration: { code: 2391, category: 1 /* Error */, key: "Function implementation is missing or not immediately following the declaration." },
        Multiple_constructor_implementations_are_not_allowed: { code: 2392, category: 1 /* Error */, key: "Multiple constructor implementations are not allowed." },
        Duplicate_function_implementation: { code: 2393, category: 1 /* Error */, key: "Duplicate function implementation." },
        Overload_signature_is_not_compatible_with_function_implementation: { code: 2394, category: 1 /* Error */, key: "Overload signature is not compatible with function implementation." },
        Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local: { code: 2395, category: 1 /* Error */, key: "Individual declarations in merged declaration {0} must be all exported or all local." },
        Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters: { code: 2396, category: 1 /* Error */, key: "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters." },
        Duplicate_identifier_i_Compiler_uses_i_to_initialize_rest_parameter: { code: 2397, category: 1 /* Error */, key: "Duplicate identifier '_i'. Compiler uses '_i' to initialize rest parameter." },
        Expression_resolves_to_variable_declaration_i_that_compiler_uses_to_initialize_rest_parameter: { code: 2398, category: 1 /* Error */, key: "Expression resolves to variable declaration '_i' that compiler uses to initialize rest parameter." },
        Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference: { code: 2399, category: 1 /* Error */, key: "Duplicate identifier '_this'. Compiler uses variable declaration '_this' to capture 'this' reference." },
        Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference: { code: 2400, category: 1 /* Error */, key: "Expression resolves to variable declaration '_this' that compiler uses to capture 'this' reference." },
        Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference: { code: 2401, category: 1 /* Error */, key: "Duplicate identifier '_super'. Compiler uses '_super' to capture base class reference." },
        Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference: { code: 2402, category: 1 /* Error */, key: "Expression resolves to '_super' that compiler uses to capture base class reference." },
        Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2: { code: 2403, category: 1 /* Error */, key: "Subsequent variable declarations must have the same type.  Variable '{0}' must be of type '{1}', but here has type '{2}'." },
        The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation: { code: 2404, category: 1 /* Error */, key: "The left-hand side of a 'for...in' statement cannot use a type annotation." },
        The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any: { code: 2405, category: 1 /* Error */, key: "The left-hand side of a 'for...in' statement must be of type 'string' or 'any'." },
        Invalid_left_hand_side_in_for_in_statement: { code: 2406, category: 1 /* Error */, key: "Invalid left-hand side in 'for...in' statement." },
        The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter: { code: 2407, category: 1 /* Error */, key: "The right-hand side of a 'for...in' statement must be of type 'any', an object type or a type parameter." },
        Setters_cannot_return_a_value: { code: 2408, category: 1 /* Error */, key: "Setters cannot return a value." },
        Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class: { code: 2409, category: 1 /* Error */, key: "Return type of constructor signature must be assignable to the instance type of the class" },
        All_symbols_within_a_with_block_will_be_resolved_to_any: { code: 2410, category: 1 /* Error */, key: "All symbols within a 'with' block will be resolved to 'any'." },
        Property_0_of_type_1_is_not_assignable_to_string_index_type_2: { code: 2411, category: 1 /* Error */, key: "Property '{0}' of type '{1}' is not assignable to string index type '{2}'." },
        Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2: { code: 2412, category: 1 /* Error */, key: "Property '{0}' of type '{1}' is not assignable to numeric index type '{2}'." },
        Numeric_index_type_0_is_not_assignable_to_string_index_type_1: { code: 2413, category: 1 /* Error */, key: "Numeric index type '{0}' is not assignable to string index type '{1}'." },
        Class_name_cannot_be_0: { code: 2414, category: 1 /* Error */, key: "Class name cannot be '{0}'" },
        Class_0_incorrectly_extends_base_class_1: { code: 2415, category: 1 /* Error */, key: "Class '{0}' incorrectly extends base class '{1}'." },
        Class_static_side_0_incorrectly_extends_base_class_static_side_1: { code: 2417, category: 1 /* Error */, key: "Class static side '{0}' incorrectly extends base class static side '{1}'." },
        Type_name_0_in_extends_clause_does_not_reference_constructor_function_for_0: { code: 2419, category: 1 /* Error */, key: "Type name '{0}' in extends clause does not reference constructor function for '{0}'." },
        Class_0_incorrectly_implements_interface_1: { code: 2420, category: 1 /* Error */, key: "Class '{0}' incorrectly implements interface '{1}'." },
        A_class_may_only_implement_another_class_or_interface: { code: 2422, category: 1 /* Error */, key: "A class may only implement another class or interface." },
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor: { code: 2423, category: 1 /* Error */, key: "Class '{0}' defines instance member function '{1}', but extended class '{2}' defines it as instance member accessor." },
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property: { code: 2424, category: 1 /* Error */, key: "Class '{0}' defines instance member function '{1}', but extended class '{2}' defines it as instance member property." },
        Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function: { code: 2425, category: 1 /* Error */, key: "Class '{0}' defines instance member property '{1}', but extended class '{2}' defines it as instance member function." },
        Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function: { code: 2426, category: 1 /* Error */, key: "Class '{0}' defines instance member accessor '{1}', but extended class '{2}' defines it as instance member function." },
        Interface_name_cannot_be_0: { code: 2427, category: 1 /* Error */, key: "Interface name cannot be '{0}'" },
        All_declarations_of_an_interface_must_have_identical_type_parameters: { code: 2428, category: 1 /* Error */, key: "All declarations of an interface must have identical type parameters." },
        Interface_0_incorrectly_extends_interface_1: { code: 2430, category: 1 /* Error */, key: "Interface '{0}' incorrectly extends interface '{1}'." },
        Enum_name_cannot_be_0: { code: 2431, category: 1 /* Error */, key: "Enum name cannot be '{0}'" },
        In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element: { code: 2432, category: 1 /* Error */, key: "In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element." },
        A_module_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged: { code: 2433, category: 1 /* Error */, key: "A module declaration cannot be in a different file from a class or function with which it is merged" },
        A_module_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged: { code: 2434, category: 1 /* Error */, key: "A module declaration cannot be located prior to a class or function with which it is merged" },
        Ambient_external_modules_cannot_be_nested_in_other_modules: { code: 2435, category: 1 /* Error */, key: "Ambient external modules cannot be nested in other modules." },
        Ambient_external_module_declaration_cannot_specify_relative_module_name: { code: 2436, category: 1 /* Error */, key: "Ambient external module declaration cannot specify relative module name." },
        Module_0_is_hidden_by_a_local_declaration_with_the_same_name: { code: 2437, category: 1 /* Error */, key: "Module '{0}' is hidden by a local declaration with the same name" },
        Import_name_cannot_be_0: { code: 2438, category: 1 /* Error */, key: "Import name cannot be '{0}'" },
        Import_declaration_in_an_ambient_external_module_declaration_cannot_reference_external_module_through_relative_external_module_name: { code: 2439, category: 1 /* Error */, key: "Import declaration in an ambient external module declaration cannot reference external module through relative external module name." },
        Import_declaration_conflicts_with_local_declaration_of_0: { code: 2440, category: 1 /* Error */, key: "Import declaration conflicts with local declaration of '{0}'" },
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_an_external_module: { code: 2441, category: 1 /* Error */, key: "Duplicate identifier '{0}'. Compiler reserves name '{1}' in top level scope of an external module." },
        Types_have_separate_declarations_of_a_private_property_0: { code: 2442, category: 1 /* Error */, key: "Types have separate declarations of a private property '{0}'." },
        Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2: { code: 2443, category: 1 /* Error */, key: "Property '{0}' is protected but type '{1}' is not a class derived from '{2}'." },
        Property_0_is_protected_in_type_1_but_public_in_type_2: { code: 2444, category: 1 /* Error */, key: "Property '{0}' is protected in type '{1}' but public in type '{2}'." },
        Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses: { code: 2445, category: 1 /* Error */, key: "Property '{0}' is protected and only accessible within class '{1}' and its subclasses." },
        Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1: { code: 2446, category: 1 /* Error */, key: "Property '{0}' is protected and only accessible through an instance of class '{1}'." },
        The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead: { code: 2447, category: 1 /* Error */, key: "The '{0}' operator is not allowed for boolean types. Consider using '{1}' instead." },
        Block_scoped_variable_0_used_before_its_declaration: { code: 2448, category: 1 /* Error */, key: "Block-scoped variable '{0}' used before its declaration.", isEarly: true },
        The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant: { code: 2449, category: 1 /* Error */, key: "The operand of an increment or decrement operator cannot be a constant.", isEarly: true },
        Left_hand_side_of_assignment_expression_cannot_be_a_constant: { code: 2450, category: 1 /* Error */, key: "Left-hand side of assignment expression cannot be a constant.", isEarly: true },
        Cannot_redeclare_block_scoped_variable_0: { code: 2451, category: 1 /* Error */, key: "Cannot redeclare block-scoped variable '{0}'.", isEarly: true },
        An_enum_member_cannot_have_a_numeric_name: { code: 2452, category: 1 /* Error */, key: "An enum member cannot have a numeric name." },
        The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly: { code: 2453, category: 1 /* Error */, key: "The type argument for type parameter '{0}' cannot be inferred from the usage. Consider specifying the type arguments explicitly." },
        Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0: { code: 2455, category: 1 /* Error */, key: "Type argument candidate '{1}' is not a valid type argument because it is not a supertype of candidate '{0}'." },
        Type_alias_0_circularly_references_itself: { code: 2456, category: 1 /* Error */, key: "Type alias '{0}' circularly references itself." },
        Type_alias_name_cannot_be_0: { code: 2457, category: 1 /* Error */, key: "Type alias name cannot be '{0}'" },
        Import_declaration_0_is_using_private_name_1: { code: 4000, category: 1 /* Error */, key: "Import declaration '{0}' is using private name '{1}'." },
        Type_parameter_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4001, category: 1 /* Error */, key: "Type parameter '{0}' of exported class has or is using name '{1}' from private module '{2}'." },
        Type_parameter_0_of_exported_class_has_or_is_using_private_name_1: { code: 4002, category: 1 /* Error */, key: "Type parameter '{0}' of exported class has or is using private name '{1}'." },
        Type_parameter_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4003, category: 1 /* Error */, key: "Type parameter '{0}' of exported interface has or is using name '{1}' from private module '{2}'." },
        Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1: { code: 4004, category: 1 /* Error */, key: "Type parameter '{0}' of exported interface has or is using private name '{1}'." },
        Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4005, category: 1 /* Error */, key: "Type parameter '{0}' of constructor signature from exported interface has or is using name '{1}' from private module '{2}'." },
        Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: { code: 4006, category: 1 /* Error */, key: "Type parameter '{0}' of constructor signature from exported interface has or is using private name '{1}'." },
        Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4007, category: 1 /* Error */, key: "Type parameter '{0}' of call signature from exported interface has or is using name '{1}' from private module '{2}'." },
        Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: { code: 4008, category: 1 /* Error */, key: "Type parameter '{0}' of call signature from exported interface has or is using private name '{1}'." },
        Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4009, category: 1 /* Error */, key: "Type parameter '{0}' of public static method from exported class has or is using name '{1}' from private module '{2}'." },
        Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: { code: 4010, category: 1 /* Error */, key: "Type parameter '{0}' of public static method from exported class has or is using private name '{1}'." },
        Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4011, category: 1 /* Error */, key: "Type parameter '{0}' of public method from exported class has or is using name '{1}' from private module '{2}'." },
        Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: { code: 4012, category: 1 /* Error */, key: "Type parameter '{0}' of public method from exported class has or is using private name '{1}'." },
        Type_parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4013, category: 1 /* Error */, key: "Type parameter '{0}' of method from exported interface has or is using name '{1}' from private module '{2}'." },
        Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: { code: 4014, category: 1 /* Error */, key: "Type parameter '{0}' of method from exported interface has or is using private name '{1}'." },
        Type_parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2: { code: 4015, category: 1 /* Error */, key: "Type parameter '{0}' of exported function has or is using name '{1}' from private module '{2}'." },
        Type_parameter_0_of_exported_function_has_or_is_using_private_name_1: { code: 4016, category: 1 /* Error */, key: "Type parameter '{0}' of exported function has or is using private name '{1}'." },
        Implements_clause_of_exported_class_0_has_or_is_using_name_1_from_private_module_2: { code: 4017, category: 1 /* Error */, key: "Implements clause of exported class '{0}' has or is using name '{1}' from private module '{2}'." },
        Extends_clause_of_exported_class_0_has_or_is_using_name_1_from_private_module_2: { code: 4018, category: 1 /* Error */, key: "Extends clause of exported class '{0}' has or is using name '{1}' from private module '{2}'." },
        Implements_clause_of_exported_class_0_has_or_is_using_private_name_1: { code: 4019, category: 1 /* Error */, key: "Implements clause of exported class '{0}' has or is using private name '{1}'." },
        Extends_clause_of_exported_class_0_has_or_is_using_private_name_1: { code: 4020, category: 1 /* Error */, key: "Extends clause of exported class '{0}' has or is using private name '{1}'." },
        Extends_clause_of_exported_interface_0_has_or_is_using_name_1_from_private_module_2: { code: 4021, category: 1 /* Error */, key: "Extends clause of exported interface '{0}' has or is using name '{1}' from private module '{2}'." },
        Extends_clause_of_exported_interface_0_has_or_is_using_private_name_1: { code: 4022, category: 1 /* Error */, key: "Extends clause of exported interface '{0}' has or is using private name '{1}'." },
        Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4023, category: 1 /* Error */, key: "Exported variable '{0}' has or is using name '{1}' from external module {2} but cannot be named." },
        Exported_variable_0_has_or_is_using_name_1_from_private_module_2: { code: 4024, category: 1 /* Error */, key: "Exported variable '{0}' has or is using name '{1}' from private module '{2}'." },
        Exported_variable_0_has_or_is_using_private_name_1: { code: 4025, category: 1 /* Error */, key: "Exported variable '{0}' has or is using private name '{1}'." },
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4026, category: 1 /* Error */, key: "Public static property '{0}' of exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4027, category: 1 /* Error */, key: "Public static property '{0}' of exported class has or is using name '{1}' from private module '{2}'." },
        Public_static_property_0_of_exported_class_has_or_is_using_private_name_1: { code: 4028, category: 1 /* Error */, key: "Public static property '{0}' of exported class has or is using private name '{1}'." },
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4029, category: 1 /* Error */, key: "Public property '{0}' of exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4030, category: 1 /* Error */, key: "Public property '{0}' of exported class has or is using name '{1}' from private module '{2}'." },
        Public_property_0_of_exported_class_has_or_is_using_private_name_1: { code: 4031, category: 1 /* Error */, key: "Public property '{0}' of exported class has or is using private name '{1}'." },
        Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4032, category: 1 /* Error */, key: "Property '{0}' of exported interface has or is using name '{1}' from private module '{2}'." },
        Property_0_of_exported_interface_has_or_is_using_private_name_1: { code: 4033, category: 1 /* Error */, key: "Property '{0}' of exported interface has or is using private name '{1}'." },
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4034, category: 1 /* Error */, key: "Parameter '{0}' of public static property setter from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1: { code: 4035, category: 1 /* Error */, key: "Parameter '{0}' of public static property setter from exported class has or is using private name '{1}'." },
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4036, category: 1 /* Error */, key: "Parameter '{0}' of public property setter from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1: { code: 4037, category: 1 /* Error */, key: "Parameter '{0}' of public property setter from exported class has or is using private name '{1}'." },
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4038, category: 1 /* Error */, key: "Return type of public static property getter from exported class has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: { code: 4039, category: 1 /* Error */, key: "Return type of public static property getter from exported class has or is using name '{0}' from private module '{1}'." },
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0: { code: 4040, category: 1 /* Error */, key: "Return type of public static property getter from exported class has or is using private name '{0}'." },
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4041, category: 1 /* Error */, key: "Return type of public property getter from exported class has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: { code: 4042, category: 1 /* Error */, key: "Return type of public property getter from exported class has or is using name '{0}' from private module '{1}'." },
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0: { code: 4043, category: 1 /* Error */, key: "Return type of public property getter from exported class has or is using private name '{0}'." },
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: { code: 4044, category: 1 /* Error */, key: "Return type of constructor signature from exported interface has or is using name '{0}' from private module '{1}'." },
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0: { code: 4045, category: 1 /* Error */, key: "Return type of constructor signature from exported interface has or is using private name '{0}'." },
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: { code: 4046, category: 1 /* Error */, key: "Return type of call signature from exported interface has or is using name '{0}' from private module '{1}'." },
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0: { code: 4047, category: 1 /* Error */, key: "Return type of call signature from exported interface has or is using private name '{0}'." },
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: { code: 4048, category: 1 /* Error */, key: "Return type of index signature from exported interface has or is using name '{0}' from private module '{1}'." },
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0: { code: 4049, category: 1 /* Error */, key: "Return type of index signature from exported interface has or is using private name '{0}'." },
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4050, category: 1 /* Error */, key: "Return type of public static method from exported class has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: { code: 4051, category: 1 /* Error */, key: "Return type of public static method from exported class has or is using name '{0}' from private module '{1}'." },
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0: { code: 4052, category: 1 /* Error */, key: "Return type of public static method from exported class has or is using private name '{0}'." },
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4053, category: 1 /* Error */, key: "Return type of public method from exported class has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: { code: 4054, category: 1 /* Error */, key: "Return type of public method from exported class has or is using name '{0}' from private module '{1}'." },
        Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0: { code: 4055, category: 1 /* Error */, key: "Return type of public method from exported class has or is using private name '{0}'." },
        Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1: { code: 4056, category: 1 /* Error */, key: "Return type of method from exported interface has or is using name '{0}' from private module '{1}'." },
        Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0: { code: 4057, category: 1 /* Error */, key: "Return type of method from exported interface has or is using private name '{0}'." },
        Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4058, category: 1 /* Error */, key: "Return type of exported function has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1: { code: 4059, category: 1 /* Error */, key: "Return type of exported function has or is using name '{0}' from private module '{1}'." },
        Return_type_of_exported_function_has_or_is_using_private_name_0: { code: 4060, category: 1 /* Error */, key: "Return type of exported function has or is using private name '{0}'." },
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4061, category: 1 /* Error */, key: "Parameter '{0}' of constructor from exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4062, category: 1 /* Error */, key: "Parameter '{0}' of constructor from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1: { code: 4063, category: 1 /* Error */, key: "Parameter '{0}' of constructor from exported class has or is using private name '{1}'." },
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4064, category: 1 /* Error */, key: "Parameter '{0}' of constructor signature from exported interface has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: { code: 4065, category: 1 /* Error */, key: "Parameter '{0}' of constructor signature from exported interface has or is using private name '{1}'." },
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4066, category: 1 /* Error */, key: "Parameter '{0}' of call signature from exported interface has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: { code: 4067, category: 1 /* Error */, key: "Parameter '{0}' of call signature from exported interface has or is using private name '{1}'." },
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4068, category: 1 /* Error */, key: "Parameter '{0}' of public static method from exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4069, category: 1 /* Error */, key: "Parameter '{0}' of public static method from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: { code: 4070, category: 1 /* Error */, key: "Parameter '{0}' of public static method from exported class has or is using private name '{1}'." },
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4071, category: 1 /* Error */, key: "Parameter '{0}' of public method from exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4072, category: 1 /* Error */, key: "Parameter '{0}' of public method from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: { code: 4073, category: 1 /* Error */, key: "Parameter '{0}' of public method from exported class has or is using private name '{1}'." },
        Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4074, category: 1 /* Error */, key: "Parameter '{0}' of method from exported interface has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: { code: 4075, category: 1 /* Error */, key: "Parameter '{0}' of method from exported interface has or is using private name '{1}'." },
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4076, category: 1 /* Error */, key: "Parameter '{0}' of exported function has or is using name '{1}' from external module {2} but cannot be named." },
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2: { code: 4077, category: 1 /* Error */, key: "Parameter '{0}' of exported function has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_exported_function_has_or_is_using_private_name_1: { code: 4078, category: 1 /* Error */, key: "Parameter '{0}' of exported function has or is using private name '{1}'." },
        Exported_type_alias_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4079, category: 1 /* Error */, key: "Exported type alias '{0}' has or is using name '{1}' from external module {2} but cannot be named." },
        Exported_type_alias_0_has_or_is_using_name_1_from_private_module_2: { code: 4080, category: 1 /* Error */, key: "Exported type alias '{0}' has or is using name '{1}' from private module '{2}'." },
        Exported_type_alias_0_has_or_is_using_private_name_1: { code: 4081, category: 1 /* Error */, key: "Exported type alias '{0}' has or is using private name '{1}'." },
        Enum_declarations_must_all_be_const_or_non_const: { code: 4082, category: 1 /* Error */, key: "Enum declarations must all be const or non-const." },
        In_const_enum_declarations_member_initializer_must_be_constant_expression: { code: 4083, category: 1 /* Error */, key: "In 'const' enum declarations member initializer must be constant expression.", isEarly: true },
        const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment: { code: 4084, category: 1 /* Error */, key: "'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment." },
        Index_expression_arguments_in_const_enums_must_be_of_type_string: { code: 4085, category: 1 /* Error */, key: "Index expression arguments in 'const' enums must be of type 'string'." },
        const_enum_member_initializer_was_evaluated_to_a_non_finite_value: { code: 4086, category: 1 /* Error */, key: "'const' enum member initializer was evaluated to a non-finite value." },
        const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN: { code: 4087, category: 1 /* Error */, key: "'const' enum member initializer was evaluated to disallowed value 'NaN'." },
        The_current_host_does_not_support_the_0_option: { code: 5001, category: 1 /* Error */, key: "The current host does not support the '{0}' option." },
        Cannot_find_the_common_subdirectory_path_for_the_input_files: { code: 5009, category: 1 /* Error */, key: "Cannot find the common subdirectory path for the input files." },
        Cannot_read_file_0_Colon_1: { code: 5012, category: 1 /* Error */, key: "Cannot read file '{0}': {1}" },
        Unsupported_file_encoding: { code: 5013, category: 1 /* Error */, key: "Unsupported file encoding." },
        Unknown_compiler_option_0: { code: 5023, category: 1 /* Error */, key: "Unknown compiler option '{0}'." },
        Could_not_write_file_0_Colon_1: { code: 5033, category: 1 /* Error */, key: "Could not write file '{0}': {1}" },
        Option_mapRoot_cannot_be_specified_without_specifying_sourcemap_option: { code: 5038, category: 1 /* Error */, key: "Option mapRoot cannot be specified without specifying sourcemap option." },
        Option_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option: { code: 5039, category: 1 /* Error */, key: "Option sourceRoot cannot be specified without specifying sourcemap option." },
        Concatenate_and_emit_output_to_single_file: { code: 6001, category: 2 /* Message */, key: "Concatenate and emit output to single file." },
        Generates_corresponding_d_ts_file: { code: 6002, category: 2 /* Message */, key: "Generates corresponding '.d.ts' file." },
        Specifies_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations: { code: 6003, category: 2 /* Message */, key: "Specifies the location where debugger should locate map files instead of generated locations." },
        Specifies_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations: { code: 6004, category: 2 /* Message */, key: "Specifies the location where debugger should locate TypeScript files instead of source locations." },
        Watch_input_files: { code: 6005, category: 2 /* Message */, key: "Watch input files." },
        Redirect_output_structure_to_the_directory: { code: 6006, category: 2 /* Message */, key: "Redirect output structure to the directory." },
        Do_not_erase_const_enum_declarations_in_generated_code: { code: 6007, category: 2 /* Message */, key: "Do not erase const enum declarations in generated code." },
        Do_not_emit_comments_to_output: { code: 6009, category: 2 /* Message */, key: "Do not emit comments to output." },
        Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES6_experimental: { code: 6015, category: 2 /* Message */, key: "Specify ECMAScript target version: 'ES3' (default), 'ES5', or 'ES6' (experimental)" },
        Specify_module_code_generation_Colon_commonjs_or_amd: { code: 6016, category: 2 /* Message */, key: "Specify module code generation: 'commonjs' or 'amd'" },
        Print_this_message: { code: 6017, category: 2 /* Message */, key: "Print this message." },
        Print_the_compiler_s_version: { code: 6019, category: 2 /* Message */, key: "Print the compiler's version." },
        Syntax_Colon_0: { code: 6023, category: 2 /* Message */, key: "Syntax: {0}" },
        options: { code: 6024, category: 2 /* Message */, key: "options" },
        file: { code: 6025, category: 2 /* Message */, key: "file" },
        Examples_Colon_0: { code: 6026, category: 2 /* Message */, key: "Examples: {0}" },
        Options_Colon: { code: 6027, category: 2 /* Message */, key: "Options:" },
        Version_0: { code: 6029, category: 2 /* Message */, key: "Version {0}" },
        Insert_command_line_options_and_files_from_a_file: { code: 6030, category: 2 /* Message */, key: "Insert command line options and files from a file." },
        File_change_detected_Compiling: { code: 6032, category: 2 /* Message */, key: "File change detected. Compiling..." },
        KIND: { code: 6034, category: 2 /* Message */, key: "KIND" },
        FILE: { code: 6035, category: 2 /* Message */, key: "FILE" },
        VERSION: { code: 6036, category: 2 /* Message */, key: "VERSION" },
        LOCATION: { code: 6037, category: 2 /* Message */, key: "LOCATION" },
        DIRECTORY: { code: 6038, category: 2 /* Message */, key: "DIRECTORY" },
        Compilation_complete_Watching_for_file_changes: { code: 6042, category: 2 /* Message */, key: "Compilation complete. Watching for file changes." },
        Generates_corresponding_map_file: { code: 6043, category: 2 /* Message */, key: "Generates corresponding '.map' file." },
        Compiler_option_0_expects_an_argument: { code: 6044, category: 1 /* Error */, key: "Compiler option '{0}' expects an argument." },
        Unterminated_quoted_string_in_response_file_0: { code: 6045, category: 1 /* Error */, key: "Unterminated quoted string in response file '{0}'." },
        Argument_for_module_option_must_be_commonjs_or_amd: { code: 6046, category: 1 /* Error */, key: "Argument for '--module' option must be 'commonjs' or 'amd'." },
        Argument_for_target_option_must_be_es3_es5_or_es6: { code: 6047, category: 1 /* Error */, key: "Argument for '--target' option must be 'es3', 'es5', or 'es6'." },
        Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1: { code: 6048, category: 1 /* Error */, key: "Locale must be of the form <language> or <language>-<territory>. For example '{0}' or '{1}'." },
        Unsupported_locale_0: { code: 6049, category: 1 /* Error */, key: "Unsupported locale '{0}'." },
        Unable_to_open_file_0: { code: 6050, category: 1 /* Error */, key: "Unable to open file '{0}'." },
        Corrupted_locale_file_0: { code: 6051, category: 1 /* Error */, key: "Corrupted locale file {0}." },
        Warn_on_expressions_and_declarations_with_an_implied_any_type: { code: 6052, category: 2 /* Message */, key: "Warn on expressions and declarations with an implied 'any' type." },
        File_0_not_found: { code: 6053, category: 1 /* Error */, key: "File '{0}' not found." },
        File_0_must_have_extension_ts_or_d_ts: { code: 6054, category: 1 /* Error */, key: "File '{0}' must have extension '.ts' or '.d.ts'." },
        Variable_0_implicitly_has_an_1_type: { code: 7005, category: 1 /* Error */, key: "Variable '{0}' implicitly has an '{1}' type." },
        Parameter_0_implicitly_has_an_1_type: { code: 7006, category: 1 /* Error */, key: "Parameter '{0}' implicitly has an '{1}' type." },
        Member_0_implicitly_has_an_1_type: { code: 7008, category: 1 /* Error */, key: "Member '{0}' implicitly has an '{1}' type." },
        new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type: { code: 7009, category: 1 /* Error */, key: "'new' expression, whose target lacks a construct signature, implicitly has an 'any' type." },
        _0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type: { code: 7010, category: 1 /* Error */, key: "'{0}', which lacks return-type annotation, implicitly has an '{1}' return type." },
        Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type: { code: 7011, category: 1 /* Error */, key: "Function expression, which lacks return-type annotation, implicitly has an '{0}' return type." },
        Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: { code: 7013, category: 1 /* Error */, key: "Construct signature, which lacks return-type annotation, implicitly has an 'any' return type." },
        Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_type_annotation: { code: 7016, category: 1 /* Error */, key: "Property '{0}' implicitly has type 'any', because its 'set' accessor lacks a type annotation." },
        Index_signature_of_object_type_implicitly_has_an_any_type: { code: 7017, category: 1 /* Error */, key: "Index signature of object type implicitly has an 'any' type." },
        Object_literal_s_property_0_implicitly_has_an_1_type: { code: 7018, category: 1 /* Error */, key: "Object literal's property '{0}' implicitly has an '{1}' type." },
        Rest_parameter_0_implicitly_has_an_any_type: { code: 7019, category: 1 /* Error */, key: "Rest parameter '{0}' implicitly has an 'any[]' type." },
        Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: { code: 7020, category: 1 /* Error */, key: "Call signature, which lacks return-type annotation, implicitly has an 'any' return type." },
        _0_implicitly_has_type_any_because_it_is_referenced_directly_or_indirectly_in_its_own_type_annotation: { code: 7021, category: 1 /* Error */, key: "'{0}' implicitly has type 'any' because it is referenced directly or indirectly in its own type annotation." },
        _0_implicitly_has_type_any_because_it_is_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer: { code: 7022, category: 1 /* Error */, key: "'{0}' implicitly has type 'any' because it is does not have a type annotation and is referenced directly or indirectly in its own initializer." },
        _0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: { code: 7023, category: 1 /* Error */, key: "'{0}' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions." },
        Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: { code: 7024, category: 1 /* Error */, key: "Function implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions." },
        You_cannot_rename_this_element: { code: 8000, category: 1 /* Error */, key: "You cannot rename this element." }
    };
})(ts || (ts = {}));
var ts;
(function (ts) {
    var textToToken = {
        "any": 109 /* AnyKeyword */,
        "boolean": 110 /* BooleanKeyword */,
        "break": 64 /* BreakKeyword */,
        "case": 65 /* CaseKeyword */,
        "catch": 66 /* CatchKeyword */,
        "class": 67 /* ClassKeyword */,
        "continue": 69 /* ContinueKeyword */,
        "const": 68 /* ConstKeyword */,
        "constructor": 111 /* ConstructorKeyword */,
        "debugger": 70 /* DebuggerKeyword */,
        "declare": 112 /* DeclareKeyword */,
        "default": 71 /* DefaultKeyword */,
        "delete": 72 /* DeleteKeyword */,
        "do": 73 /* DoKeyword */,
        "else": 74 /* ElseKeyword */,
        "enum": 75 /* EnumKeyword */,
        "export": 76 /* ExportKeyword */,
        "extends": 77 /* ExtendsKeyword */,
        "false": 78 /* FalseKeyword */,
        "finally": 79 /* FinallyKeyword */,
        "for": 80 /* ForKeyword */,
        "function": 81 /* FunctionKeyword */,
        "get": 113 /* GetKeyword */,
        "if": 82 /* IfKeyword */,
        "implements": 100 /* ImplementsKeyword */,
        "import": 83 /* ImportKeyword */,
        "in": 84 /* InKeyword */,
        "instanceof": 85 /* InstanceOfKeyword */,
        "interface": 101 /* InterfaceKeyword */,
        "let": 102 /* LetKeyword */,
        "module": 114 /* ModuleKeyword */,
        "new": 86 /* NewKeyword */,
        "null": 87 /* NullKeyword */,
        "number": 116 /* NumberKeyword */,
        "package": 103 /* PackageKeyword */,
        "private": 104 /* PrivateKeyword */,
        "protected": 105 /* ProtectedKeyword */,
        "public": 106 /* PublicKeyword */,
        "require": 115 /* RequireKeyword */,
        "return": 88 /* ReturnKeyword */,
        "set": 117 /* SetKeyword */,
        "static": 107 /* StaticKeyword */,
        "string": 118 /* StringKeyword */,
        "super": 89 /* SuperKeyword */,
        "switch": 90 /* SwitchKeyword */,
        "this": 91 /* ThisKeyword */,
        "throw": 92 /* ThrowKeyword */,
        "true": 93 /* TrueKeyword */,
        "try": 94 /* TryKeyword */,
        "type": 119 /* TypeKeyword */,
        "typeof": 95 /* TypeOfKeyword */,
        "var": 96 /* VarKeyword */,
        "void": 97 /* VoidKeyword */,
        "while": 98 /* WhileKeyword */,
        "with": 99 /* WithKeyword */,
        "yield": 108 /* YieldKeyword */,
        "{": 13 /* OpenBraceToken */,
        "}": 14 /* CloseBraceToken */,
        "(": 15 /* OpenParenToken */,
        ")": 16 /* CloseParenToken */,
        "[": 17 /* OpenBracketToken */,
        "]": 18 /* CloseBracketToken */,
        ".": 19 /* DotToken */,
        "...": 20 /* DotDotDotToken */,
        ";": 21 /* SemicolonToken */,
        ",": 22 /* CommaToken */,
        "<": 23 /* LessThanToken */,
        ">": 24 /* GreaterThanToken */,
        "<=": 25 /* LessThanEqualsToken */,
        ">=": 26 /* GreaterThanEqualsToken */,
        "==": 27 /* EqualsEqualsToken */,
        "!=": 28 /* ExclamationEqualsToken */,
        "===": 29 /* EqualsEqualsEqualsToken */,
        "!==": 30 /* ExclamationEqualsEqualsToken */,
        "=>": 31 /* EqualsGreaterThanToken */,
        "+": 32 /* PlusToken */,
        "-": 33 /* MinusToken */,
        "*": 34 /* AsteriskToken */,
        "/": 35 /* SlashToken */,
        "%": 36 /* PercentToken */,
        "++": 37 /* PlusPlusToken */,
        "--": 38 /* MinusMinusToken */,
        "<<": 39 /* LessThanLessThanToken */,
        ">>": 40 /* GreaterThanGreaterThanToken */,
        ">>>": 41 /* GreaterThanGreaterThanGreaterThanToken */,
        "&": 42 /* AmpersandToken */,
        "|": 43 /* BarToken */,
        "^": 44 /* CaretToken */,
        "!": 45 /* ExclamationToken */,
        "~": 46 /* TildeToken */,
        "&&": 47 /* AmpersandAmpersandToken */,
        "||": 48 /* BarBarToken */,
        "?": 49 /* QuestionToken */,
        ":": 50 /* ColonToken */,
        "=": 51 /* EqualsToken */,
        "+=": 52 /* PlusEqualsToken */,
        "-=": 53 /* MinusEqualsToken */,
        "*=": 54 /* AsteriskEqualsToken */,
        "/=": 55 /* SlashEqualsToken */,
        "%=": 56 /* PercentEqualsToken */,
        "<<=": 57 /* LessThanLessThanEqualsToken */,
        ">>=": 58 /* GreaterThanGreaterThanEqualsToken */,
        ">>>=": 59 /* GreaterThanGreaterThanGreaterThanEqualsToken */,
        "&=": 60 /* AmpersandEqualsToken */,
        "|=": 61 /* BarEqualsToken */,
        "^=": 62 /* CaretEqualsToken */
    };
    var unicodeES3IdentifierStart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 543, 546, 563, 592, 685, 688, 696, 699, 705, 720, 721, 736, 740, 750, 750, 890, 890, 902, 902, 904, 906, 908, 908, 910, 929, 931, 974, 976, 983, 986, 1011, 1024, 1153, 1164, 1220, 1223, 1224, 1227, 1228, 1232, 1269, 1272, 1273, 1329, 1366, 1369, 1369, 1377, 1415, 1488, 1514, 1520, 1522, 1569, 1594, 1600, 1610, 1649, 1747, 1749, 1749, 1765, 1766, 1786, 1788, 1808, 1808, 1810, 1836, 1920, 1957, 2309, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2524, 2525, 2527, 2529, 2544, 2545, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2699, 2701, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2784, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2870, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 2997, 2999, 3001, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3168, 3169, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3294, 3294, 3296, 3297, 3333, 3340, 3342, 3344, 3346, 3368, 3370, 3385, 3424, 3425, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3805, 3840, 3840, 3904, 3911, 3913, 3946, 3976, 3979, 4096, 4129, 4131, 4135, 4137, 4138, 4176, 4181, 4256, 4293, 4304, 4342, 4352, 4441, 4447, 4514, 4520, 4601, 4608, 4614, 4616, 4678, 4680, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4742, 4744, 4744, 4746, 4749, 4752, 4782, 4784, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4814, 4816, 4822, 4824, 4846, 4848, 4878, 4880, 4880, 4882, 4885, 4888, 4894, 4896, 4934, 4936, 4954, 5024, 5108, 5121, 5740, 5743, 5750, 5761, 5786, 5792, 5866, 6016, 6067, 6176, 6263, 6272, 6312, 7680, 7835, 7840, 7929, 7936, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8319, 8319, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8497, 8499, 8505, 8544, 8579, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12346, 12353, 12436, 12445, 12446, 12449, 12538, 12540, 12542, 12549, 12588, 12593, 12686, 12704, 12727, 13312, 19893, 19968, 40869, 40960, 42124, 44032, 55203, 63744, 64045, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65138, 65140, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    var unicodeES3IdentifierPart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 543, 546, 563, 592, 685, 688, 696, 699, 705, 720, 721, 736, 740, 750, 750, 768, 846, 864, 866, 890, 890, 902, 902, 904, 906, 908, 908, 910, 929, 931, 974, 976, 983, 986, 1011, 1024, 1153, 1155, 1158, 1164, 1220, 1223, 1224, 1227, 1228, 1232, 1269, 1272, 1273, 1329, 1366, 1369, 1369, 1377, 1415, 1425, 1441, 1443, 1465, 1467, 1469, 1471, 1471, 1473, 1474, 1476, 1476, 1488, 1514, 1520, 1522, 1569, 1594, 1600, 1621, 1632, 1641, 1648, 1747, 1749, 1756, 1759, 1768, 1770, 1773, 1776, 1788, 1808, 1836, 1840, 1866, 1920, 1968, 2305, 2307, 2309, 2361, 2364, 2381, 2384, 2388, 2392, 2403, 2406, 2415, 2433, 2435, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2492, 2492, 2494, 2500, 2503, 2504, 2507, 2509, 2519, 2519, 2524, 2525, 2527, 2531, 2534, 2545, 2562, 2562, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2620, 2620, 2622, 2626, 2631, 2632, 2635, 2637, 2649, 2652, 2654, 2654, 2662, 2676, 2689, 2691, 2693, 2699, 2701, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2748, 2757, 2759, 2761, 2763, 2765, 2768, 2768, 2784, 2784, 2790, 2799, 2817, 2819, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2870, 2873, 2876, 2883, 2887, 2888, 2891, 2893, 2902, 2903, 2908, 2909, 2911, 2913, 2918, 2927, 2946, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 2997, 2999, 3001, 3006, 3010, 3014, 3016, 3018, 3021, 3031, 3031, 3047, 3055, 3073, 3075, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3134, 3140, 3142, 3144, 3146, 3149, 3157, 3158, 3168, 3169, 3174, 3183, 3202, 3203, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3262, 3268, 3270, 3272, 3274, 3277, 3285, 3286, 3294, 3294, 3296, 3297, 3302, 3311, 3330, 3331, 3333, 3340, 3342, 3344, 3346, 3368, 3370, 3385, 3390, 3395, 3398, 3400, 3402, 3405, 3415, 3415, 3424, 3425, 3430, 3439, 3458, 3459, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3530, 3530, 3535, 3540, 3542, 3542, 3544, 3551, 3570, 3571, 3585, 3642, 3648, 3662, 3664, 3673, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3769, 3771, 3773, 3776, 3780, 3782, 3782, 3784, 3789, 3792, 3801, 3804, 3805, 3840, 3840, 3864, 3865, 3872, 3881, 3893, 3893, 3895, 3895, 3897, 3897, 3902, 3911, 3913, 3946, 3953, 3972, 3974, 3979, 3984, 3991, 3993, 4028, 4038, 4038, 4096, 4129, 4131, 4135, 4137, 4138, 4140, 4146, 4150, 4153, 4160, 4169, 4176, 4185, 4256, 4293, 4304, 4342, 4352, 4441, 4447, 4514, 4520, 4601, 4608, 4614, 4616, 4678, 4680, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4742, 4744, 4744, 4746, 4749, 4752, 4782, 4784, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4814, 4816, 4822, 4824, 4846, 4848, 4878, 4880, 4880, 4882, 4885, 4888, 4894, 4896, 4934, 4936, 4954, 4969, 4977, 5024, 5108, 5121, 5740, 5743, 5750, 5761, 5786, 5792, 5866, 6016, 6099, 6112, 6121, 6160, 6169, 6176, 6263, 6272, 6313, 7680, 7835, 7840, 7929, 7936, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8255, 8256, 8319, 8319, 8400, 8412, 8417, 8417, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8497, 8499, 8505, 8544, 8579, 12293, 12295, 12321, 12335, 12337, 12341, 12344, 12346, 12353, 12436, 12441, 12442, 12445, 12446, 12449, 12542, 12549, 12588, 12593, 12686, 12704, 12727, 13312, 19893, 19968, 40869, 40960, 42124, 44032, 55203, 63744, 64045, 64256, 64262, 64275, 64279, 64285, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65056, 65059, 65075, 65076, 65101, 65103, 65136, 65138, 65140, 65140, 65142, 65276, 65296, 65305, 65313, 65338, 65343, 65343, 65345, 65370, 65381, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    var unicodeES5IdentifierStart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 880, 884, 886, 887, 890, 893, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1162, 1319, 1329, 1366, 1369, 1369, 1377, 1415, 1488, 1514, 1520, 1522, 1568, 1610, 1646, 1647, 1649, 1747, 1749, 1749, 1765, 1766, 1774, 1775, 1786, 1788, 1791, 1791, 1808, 1808, 1810, 1839, 1869, 1957, 1969, 1969, 1994, 2026, 2036, 2037, 2042, 2042, 2048, 2069, 2074, 2074, 2084, 2084, 2088, 2088, 2112, 2136, 2208, 2208, 2210, 2220, 2308, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2417, 2423, 2425, 2431, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2493, 2493, 2510, 2510, 2524, 2525, 2527, 2529, 2544, 2545, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2785, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2929, 2929, 2947, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3024, 3024, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3133, 3133, 3160, 3161, 3168, 3169, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3261, 3261, 3294, 3294, 3296, 3297, 3313, 3314, 3333, 3340, 3342, 3344, 3346, 3386, 3389, 3389, 3406, 3406, 3424, 3425, 3450, 3455, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3807, 3840, 3840, 3904, 3911, 3913, 3948, 3976, 3980, 4096, 4138, 4159, 4159, 4176, 4181, 4186, 4189, 4193, 4193, 4197, 4198, 4206, 4208, 4213, 4225, 4238, 4238, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4992, 5007, 5024, 5108, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5872, 5888, 5900, 5902, 5905, 5920, 5937, 5952, 5969, 5984, 5996, 5998, 6000, 6016, 6067, 6103, 6103, 6108, 6108, 6176, 6263, 6272, 6312, 6314, 6314, 6320, 6389, 6400, 6428, 6480, 6509, 6512, 6516, 6528, 6571, 6593, 6599, 6656, 6678, 6688, 6740, 6823, 6823, 6917, 6963, 6981, 6987, 7043, 7072, 7086, 7087, 7098, 7141, 7168, 7203, 7245, 7247, 7258, 7293, 7401, 7404, 7406, 7409, 7413, 7414, 7424, 7615, 7680, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8305, 8305, 8319, 8319, 8336, 8348, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11310, 11312, 11358, 11360, 11492, 11499, 11502, 11506, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11648, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11823, 11823, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12348, 12353, 12438, 12445, 12447, 12449, 12538, 12540, 12543, 12549, 12589, 12593, 12686, 12704, 12730, 12784, 12799, 13312, 19893, 19968, 40908, 40960, 42124, 42192, 42237, 42240, 42508, 42512, 42527, 42538, 42539, 42560, 42606, 42623, 42647, 42656, 42735, 42775, 42783, 42786, 42888, 42891, 42894, 42896, 42899, 42912, 42922, 43000, 43009, 43011, 43013, 43015, 43018, 43020, 43042, 43072, 43123, 43138, 43187, 43250, 43255, 43259, 43259, 43274, 43301, 43312, 43334, 43360, 43388, 43396, 43442, 43471, 43471, 43520, 43560, 43584, 43586, 43588, 43595, 43616, 43638, 43642, 43642, 43648, 43695, 43697, 43697, 43701, 43702, 43705, 43709, 43712, 43712, 43714, 43714, 43739, 43741, 43744, 43754, 43762, 43764, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43968, 44002, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    var unicodeES5IdentifierPart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 768, 884, 886, 887, 890, 893, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1155, 1159, 1162, 1319, 1329, 1366, 1369, 1369, 1377, 1415, 1425, 1469, 1471, 1471, 1473, 1474, 1476, 1477, 1479, 1479, 1488, 1514, 1520, 1522, 1552, 1562, 1568, 1641, 1646, 1747, 1749, 1756, 1759, 1768, 1770, 1788, 1791, 1791, 1808, 1866, 1869, 1969, 1984, 2037, 2042, 2042, 2048, 2093, 2112, 2139, 2208, 2208, 2210, 2220, 2276, 2302, 2304, 2403, 2406, 2415, 2417, 2423, 2425, 2431, 2433, 2435, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2492, 2500, 2503, 2504, 2507, 2510, 2519, 2519, 2524, 2525, 2527, 2531, 2534, 2545, 2561, 2563, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2620, 2620, 2622, 2626, 2631, 2632, 2635, 2637, 2641, 2641, 2649, 2652, 2654, 2654, 2662, 2677, 2689, 2691, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2748, 2757, 2759, 2761, 2763, 2765, 2768, 2768, 2784, 2787, 2790, 2799, 2817, 2819, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2876, 2884, 2887, 2888, 2891, 2893, 2902, 2903, 2908, 2909, 2911, 2915, 2918, 2927, 2929, 2929, 2946, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3006, 3010, 3014, 3016, 3018, 3021, 3024, 3024, 3031, 3031, 3046, 3055, 3073, 3075, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3133, 3140, 3142, 3144, 3146, 3149, 3157, 3158, 3160, 3161, 3168, 3171, 3174, 3183, 3202, 3203, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3260, 3268, 3270, 3272, 3274, 3277, 3285, 3286, 3294, 3294, 3296, 3299, 3302, 3311, 3313, 3314, 3330, 3331, 3333, 3340, 3342, 3344, 3346, 3386, 3389, 3396, 3398, 3400, 3402, 3406, 3415, 3415, 3424, 3427, 3430, 3439, 3450, 3455, 3458, 3459, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3530, 3530, 3535, 3540, 3542, 3542, 3544, 3551, 3570, 3571, 3585, 3642, 3648, 3662, 3664, 3673, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3769, 3771, 3773, 3776, 3780, 3782, 3782, 3784, 3789, 3792, 3801, 3804, 3807, 3840, 3840, 3864, 3865, 3872, 3881, 3893, 3893, 3895, 3895, 3897, 3897, 3902, 3911, 3913, 3948, 3953, 3972, 3974, 3991, 3993, 4028, 4038, 4038, 4096, 4169, 4176, 4253, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4957, 4959, 4992, 5007, 5024, 5108, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5872, 5888, 5900, 5902, 5908, 5920, 5940, 5952, 5971, 5984, 5996, 5998, 6000, 6002, 6003, 6016, 6099, 6103, 6103, 6108, 6109, 6112, 6121, 6155, 6157, 6160, 6169, 6176, 6263, 6272, 6314, 6320, 6389, 6400, 6428, 6432, 6443, 6448, 6459, 6470, 6509, 6512, 6516, 6528, 6571, 6576, 6601, 6608, 6617, 6656, 6683, 6688, 6750, 6752, 6780, 6783, 6793, 6800, 6809, 6823, 6823, 6912, 6987, 6992, 7001, 7019, 7027, 7040, 7155, 7168, 7223, 7232, 7241, 7245, 7293, 7376, 7378, 7380, 7414, 7424, 7654, 7676, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8204, 8205, 8255, 8256, 8276, 8276, 8305, 8305, 8319, 8319, 8336, 8348, 8400, 8412, 8417, 8417, 8421, 8432, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11310, 11312, 11358, 11360, 11492, 11499, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11647, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11744, 11775, 11823, 11823, 12293, 12295, 12321, 12335, 12337, 12341, 12344, 12348, 12353, 12438, 12441, 12442, 12445, 12447, 12449, 12538, 12540, 12543, 12549, 12589, 12593, 12686, 12704, 12730, 12784, 12799, 13312, 19893, 19968, 40908, 40960, 42124, 42192, 42237, 42240, 42508, 42512, 42539, 42560, 42607, 42612, 42621, 42623, 42647, 42655, 42737, 42775, 42783, 42786, 42888, 42891, 42894, 42896, 42899, 42912, 42922, 43000, 43047, 43072, 43123, 43136, 43204, 43216, 43225, 43232, 43255, 43259, 43259, 43264, 43309, 43312, 43347, 43360, 43388, 43392, 43456, 43471, 43481, 43520, 43574, 43584, 43597, 43600, 43609, 43616, 43638, 43642, 43643, 43648, 43714, 43739, 43741, 43744, 43759, 43762, 43766, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43968, 44010, 44012, 44013, 44016, 44025, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65024, 65039, 65056, 65062, 65075, 65076, 65101, 65103, 65136, 65140, 65142, 65276, 65296, 65305, 65313, 65338, 65343, 65343, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    function lookupInUnicodeMap(code, map) {
        if (code < map[0]) {
            return false;
        }
        var lo = 0;
        var hi = map.length;
        var mid;
        while (lo + 1 < hi) {
            mid = lo + (hi - lo) / 2;
            mid -= mid % 2;
            if (map[mid] <= code && code <= map[mid + 1]) {
                return true;
            }
            if (code < map[mid]) {
                hi = mid;
            }
            else {
                lo = mid + 2;
            }
        }
        return false;
    }
    function isUnicodeIdentifierStart(code, languageVersion) {
        return languageVersion === 0 /* ES3 */ ? lookupInUnicodeMap(code, unicodeES3IdentifierStart) : lookupInUnicodeMap(code, unicodeES5IdentifierStart);
    }
    function isUnicodeIdentifierPart(code, languageVersion) {
        return languageVersion === 0 /* ES3 */ ? lookupInUnicodeMap(code, unicodeES3IdentifierPart) : lookupInUnicodeMap(code, unicodeES5IdentifierPart);
    }
    function makeReverseMap(source) {
        var result = [];
        for (var name in source) {
            if (source.hasOwnProperty(name)) {
                result[source[name]] = name;
            }
        }
        return result;
    }
    var tokenStrings = makeReverseMap(textToToken);
    function tokenToString(t) {
        return tokenStrings[t];
    }
    ts.tokenToString = tokenToString;
    function getLineStarts(text) {
        var result = new Array();
        var pos = 0;
        var lineStart = 0;
        while (pos < text.length) {
            var ch = text.charCodeAt(pos++);
            switch (ch) {
                case 13 /* carriageReturn */:
                    if (text.charCodeAt(pos) === 10 /* lineFeed */) {
                        pos++;
                    }
                case 10 /* lineFeed */:
                    result.push(lineStart);
                    lineStart = pos;
                    break;
                default:
                    if (ch > 127 /* maxAsciiCharacter */ && isLineBreak(ch)) {
                        result.push(lineStart);
                        lineStart = pos;
                    }
                    break;
            }
        }
        result.push(lineStart);
        return result;
    }
    ts.getLineStarts = getLineStarts;
    function getPositionFromLineAndCharacter(lineStarts, line, character) {
        ts.Debug.assert(line > 0);
        return lineStarts[line - 1] + character - 1;
    }
    ts.getPositionFromLineAndCharacter = getPositionFromLineAndCharacter;
    function getLineAndCharacterOfPosition(lineStarts, position) {
        var lineNumber = ts.binarySearch(lineStarts, position);
        if (lineNumber < 0) {
            lineNumber = (~lineNumber) - 1;
        }
        return {
            line: lineNumber + 1,
            character: position - lineStarts[lineNumber] + 1
        };
    }
    ts.getLineAndCharacterOfPosition = getLineAndCharacterOfPosition;
    function positionToLineAndCharacter(text, pos) {
        var lineStarts = getLineStarts(text);
        return getLineAndCharacterOfPosition(lineStarts, pos);
    }
    ts.positionToLineAndCharacter = positionToLineAndCharacter;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function isWhiteSpace(ch) {
        return ch === 32 /* space */ || ch === 9 /* tab */ || ch === 11 /* verticalTab */ || ch === 12 /* formFeed */ || ch === 160 /* nonBreakingSpace */ || ch === 5760 /* ogham */ || ch >= 8192 /* enQuad */ && ch <= 8203 /* zeroWidthSpace */ || ch === 8239 /* narrowNoBreakSpace */ || ch === 8287 /* mathematicalSpace */ || ch === 12288 /* ideographicSpace */ || ch === 65279 /* byteOrderMark */;
    }
    ts.isWhiteSpace = isWhiteSpace;
    function isLineBreak(ch) {
        return ch === 10 /* lineFeed */ || ch === 13 /* carriageReturn */ || ch === 8232 /* lineSeparator */ || ch === 8233 /* paragraphSeparator */ || ch === 133 /* nextLine */;
    }
    ts.isLineBreak = isLineBreak;
    function isDigit(ch) {
        return ch >= 48 /* _0 */ && ch <= 57 /* _9 */;
    }
    function isOctalDigit(ch) {
        return ch >= 48 /* _0 */ && ch <= 55 /* _7 */;
    }
    ts.isOctalDigit = isOctalDigit;
    function skipTrivia(text, pos, stopAfterLineBreak) {
        while (true) {
            var ch = text.charCodeAt(pos);
            switch (ch) {
                case 13 /* carriageReturn */:
                    if (text.charCodeAt(pos + 1) === 10 /* lineFeed */)
                        pos++;
                case 10 /* lineFeed */:
                    pos++;
                    if (stopAfterLineBreak)
                        return pos;
                    continue;
                case 9 /* tab */:
                case 11 /* verticalTab */:
                case 12 /* formFeed */:
                case 32 /* space */:
                    pos++;
                    continue;
                case 47 /* slash */:
                    if (text.charCodeAt(pos + 1) === 47 /* slash */) {
                        pos += 2;
                        while (pos < text.length) {
                            if (isLineBreak(text.charCodeAt(pos))) {
                                break;
                            }
                            pos++;
                        }
                        continue;
                    }
                    if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
                        pos += 2;
                        while (pos < text.length) {
                            if (text.charCodeAt(pos) === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
                                pos += 2;
                                break;
                            }
                            pos++;
                        }
                        continue;
                    }
                    break;
                default:
                    if (ch > 127 /* maxAsciiCharacter */ && (isWhiteSpace(ch) || isLineBreak(ch))) {
                        pos++;
                        continue;
                    }
                    break;
            }
            return pos;
        }
    }
    ts.skipTrivia = skipTrivia;
    function getCommentRanges(text, pos, trailing) {
        var result;
        var collecting = trailing || pos === 0;
        while (true) {
            var ch = text.charCodeAt(pos);
            switch (ch) {
                case 13 /* carriageReturn */:
                    if (text.charCodeAt(pos + 1) === 10 /* lineFeed */)
                        pos++;
                case 10 /* lineFeed */:
                    pos++;
                    if (trailing) {
                        return result;
                    }
                    collecting = true;
                    if (result && result.length) {
                        result[result.length - 1].hasTrailingNewLine = true;
                    }
                    continue;
                case 9 /* tab */:
                case 11 /* verticalTab */:
                case 12 /* formFeed */:
                case 32 /* space */:
                    pos++;
                    continue;
                case 47 /* slash */:
                    var nextChar = text.charCodeAt(pos + 1);
                    var hasTrailingNewLine = false;
                    if (nextChar === 47 /* slash */ || nextChar === 42 /* asterisk */) {
                        var startPos = pos;
                        pos += 2;
                        if (nextChar === 47 /* slash */) {
                            while (pos < text.length) {
                                if (isLineBreak(text.charCodeAt(pos))) {
                                    hasTrailingNewLine = true;
                                    break;
                                }
                                pos++;
                            }
                        }
                        else {
                            while (pos < text.length) {
                                if (text.charCodeAt(pos) === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
                                    pos += 2;
                                    break;
                                }
                                pos++;
                            }
                        }
                        if (collecting) {
                            if (!result)
                                result = [];
                            result.push({ pos: startPos, end: pos, hasTrailingNewLine: hasTrailingNewLine });
                        }
                        continue;
                    }
                    break;
                default:
                    if (ch > 127 /* maxAsciiCharacter */ && (isWhiteSpace(ch) || isLineBreak(ch))) {
                        if (result && result.length && isLineBreak(ch)) {
                            result[result.length - 1].hasTrailingNewLine = true;
                        }
                        pos++;
                        continue;
                    }
                    break;
            }
            return result;
        }
    }
    function getLeadingCommentRanges(text, pos) {
        return getCommentRanges(text, pos, false);
    }
    ts.getLeadingCommentRanges = getLeadingCommentRanges;
    function getTrailingCommentRanges(text, pos) {
        return getCommentRanges(text, pos, true);
    }
    ts.getTrailingCommentRanges = getTrailingCommentRanges;
    function isIdentifierStart(ch, languageVersion) {
        return ch >= 65 /* A */ && ch <= 90 /* Z */ || ch >= 97 /* a */ && ch <= 122 /* z */ || ch === 36 /* $ */ || ch === 95 /* _ */ || ch > 127 /* maxAsciiCharacter */ && isUnicodeIdentifierStart(ch, languageVersion);
    }
    ts.isIdentifierStart = isIdentifierStart;
    function isIdentifierPart(ch, languageVersion) {
        return ch >= 65 /* A */ && ch <= 90 /* Z */ || ch >= 97 /* a */ && ch <= 122 /* z */ || ch >= 48 /* _0 */ && ch <= 57 /* _9 */ || ch === 36 /* $ */ || ch === 95 /* _ */ || ch > 127 /* maxAsciiCharacter */ && isUnicodeIdentifierPart(ch, languageVersion);
    }
    ts.isIdentifierPart = isIdentifierPart;
    function createScanner(languageVersion, skipTrivia, text, onError, onComment) {
        var pos;
        var len;
        var startPos;
        var tokenPos;
        var token;
        var tokenValue;
        var precedingLineBreak;
        function error(message) {
            if (onError) {
                onError(message);
            }
        }
        function isIdentifierStart(ch) {
            return ch >= 65 /* A */ && ch <= 90 /* Z */ || ch >= 97 /* a */ && ch <= 122 /* z */ || ch === 36 /* $ */ || ch === 95 /* _ */ || ch > 127 /* maxAsciiCharacter */ && isUnicodeIdentifierStart(ch, languageVersion);
        }
        function isIdentifierPart(ch) {
            return ch >= 65 /* A */ && ch <= 90 /* Z */ || ch >= 97 /* a */ && ch <= 122 /* z */ || ch >= 48 /* _0 */ && ch <= 57 /* _9 */ || ch === 36 /* $ */ || ch === 95 /* _ */ || ch > 127 /* maxAsciiCharacter */ && isUnicodeIdentifierPart(ch, languageVersion);
        }
        function scanNumber() {
            var start = pos;
            while (isDigit(text.charCodeAt(pos)))
                pos++;
            if (text.charCodeAt(pos) === 46 /* dot */) {
                pos++;
                while (isDigit(text.charCodeAt(pos)))
                    pos++;
            }
            var end = pos;
            if (text.charCodeAt(pos) === 69 /* E */ || text.charCodeAt(pos) === 101 /* e */) {
                pos++;
                if (text.charCodeAt(pos) === 43 /* plus */ || text.charCodeAt(pos) === 45 /* minus */)
                    pos++;
                if (isDigit(text.charCodeAt(pos))) {
                    pos++;
                    while (isDigit(text.charCodeAt(pos)))
                        pos++;
                    end = pos;
                }
                else {
                    error(ts.Diagnostics.Digit_expected);
                }
            }
            return +(text.substring(start, end));
        }
        function scanOctalDigits() {
            var start = pos;
            while (isOctalDigit(text.charCodeAt(pos))) {
                pos++;
            }
            return +(text.substring(start, pos));
        }
        function scanHexDigits(count, mustMatchCount) {
            var digits = 0;
            var value = 0;
            while (digits < count || !mustMatchCount) {
                var ch = text.charCodeAt(pos);
                if (ch >= 48 /* _0 */ && ch <= 57 /* _9 */) {
                    value = value * 16 + ch - 48 /* _0 */;
                }
                else if (ch >= 65 /* A */ && ch <= 70 /* F */) {
                    value = value * 16 + ch - 65 /* A */ + 10;
                }
                else if (ch >= 97 /* a */ && ch <= 102 /* f */) {
                    value = value * 16 + ch - 97 /* a */ + 10;
                }
                else {
                    break;
                }
                pos++;
                digits++;
            }
            if (digits < count) {
                value = -1;
            }
            return value;
        }
        function scanString() {
            var quote = text.charCodeAt(pos++);
            var result = "";
            var start = pos;
            while (true) {
                if (pos >= len) {
                    result += text.substring(start, pos);
                    error(ts.Diagnostics.Unexpected_end_of_text);
                    break;
                }
                var ch = text.charCodeAt(pos);
                if (ch === quote) {
                    result += text.substring(start, pos);
                    pos++;
                    break;
                }
                if (ch === 92 /* backslash */) {
                    result += text.substring(start, pos);
                    result += scanEscapeSequence();
                    start = pos;
                    continue;
                }
                if (isLineBreak(ch)) {
                    result += text.substring(start, pos);
                    error(ts.Diagnostics.Unterminated_string_literal);
                    break;
                }
                pos++;
            }
            return result;
        }
        function scanTemplateAndSetTokenValue() {
            var startedWithBacktick = text.charCodeAt(pos) === 96 /* backtick */;
            pos++;
            var start = pos;
            var contents = "";
            var resultingToken;
            while (true) {
                if (pos >= len) {
                    contents += text.substring(start, pos);
                    error(ts.Diagnostics.Unexpected_end_of_text);
                    resultingToken = startedWithBacktick ? 9 /* NoSubstitutionTemplateLiteral */ : 12 /* TemplateTail */;
                    break;
                }
                var currChar = text.charCodeAt(pos);
                if (currChar === 96 /* backtick */) {
                    contents += text.substring(start, pos);
                    pos++;
                    resultingToken = startedWithBacktick ? 9 /* NoSubstitutionTemplateLiteral */ : 12 /* TemplateTail */;
                    break;
                }
                if (currChar === 36 /* $ */ && pos + 1 < len && text.charCodeAt(pos + 1) === 123 /* openBrace */) {
                    contents += text.substring(start, pos);
                    pos += 2;
                    resultingToken = startedWithBacktick ? 10 /* TemplateHead */ : 11 /* TemplateMiddle */;
                    break;
                }
                if (currChar === 92 /* backslash */) {
                    contents += text.substring(start, pos);
                    contents += scanEscapeSequence();
                    start = pos;
                    continue;
                }
                if (currChar === 13 /* carriageReturn */) {
                    contents += text.substring(start, pos);
                    if (pos + 1 < len && text.charCodeAt(pos + 1) === 10 /* lineFeed */) {
                        pos++;
                    }
                    pos++;
                    contents += "\n";
                    start = pos;
                    continue;
                }
                pos++;
            }
            ts.Debug.assert(resultingToken !== undefined);
            tokenValue = contents;
            return resultingToken;
        }
        function scanEscapeSequence() {
            pos++;
            if (pos >= len) {
                error(ts.Diagnostics.Unexpected_end_of_text);
                return "";
            }
            var ch = text.charCodeAt(pos++);
            switch (ch) {
                case 48 /* _0 */:
                    return "\0";
                case 98 /* b */:
                    return "\b";
                case 116 /* t */:
                    return "\t";
                case 110 /* n */:
                    return "\n";
                case 118 /* v */:
                    return "\v";
                case 102 /* f */:
                    return "\f";
                case 114 /* r */:
                    return "\r";
                case 39 /* singleQuote */:
                    return "\'";
                case 34 /* doubleQuote */:
                    return "\"";
                case 120 /* x */:
                case 117 /* u */:
                    var ch = scanHexDigits(ch === 120 /* x */ ? 2 : 4, true);
                    if (ch >= 0) {
                        return String.fromCharCode(ch);
                    }
                    else {
                        error(ts.Diagnostics.Hexadecimal_digit_expected);
                        return "";
                    }
                case 13 /* carriageReturn */:
                    if (pos < len && text.charCodeAt(pos) === 10 /* lineFeed */) {
                        pos++;
                    }
                case 10 /* lineFeed */:
                case 8232 /* lineSeparator */:
                case 8233 /* paragraphSeparator */:
                    return "";
                default:
                    return String.fromCharCode(ch);
            }
        }
        function peekUnicodeEscape() {
            if (pos + 5 < len && text.charCodeAt(pos + 1) === 117 /* u */) {
                var start = pos;
                pos += 2;
                var value = scanHexDigits(4, true);
                pos = start;
                return value;
            }
            return -1;
        }
        function scanIdentifierParts() {
            var result = "";
            var start = pos;
            while (pos < len) {
                var ch = text.charCodeAt(pos);
                if (isIdentifierPart(ch)) {
                    pos++;
                }
                else if (ch === 92 /* backslash */) {
                    ch = peekUnicodeEscape();
                    if (!(ch >= 0 && isIdentifierPart(ch))) {
                        break;
                    }
                    result += text.substring(start, pos);
                    result += String.fromCharCode(ch);
                    pos += 6;
                    start = pos;
                }
                else {
                    break;
                }
            }
            result += text.substring(start, pos);
            return result;
        }
        function getIdentifierToken() {
            var len = tokenValue.length;
            if (len >= 2 && len <= 11) {
                var ch = tokenValue.charCodeAt(0);
                if (ch >= 97 /* a */ && ch <= 122 /* z */ && hasOwnProperty.call(textToToken, tokenValue)) {
                    return token = textToToken[tokenValue];
                }
            }
            return token = 63 /* Identifier */;
        }
        function scan() {
            startPos = pos;
            precedingLineBreak = false;
            while (true) {
                tokenPos = pos;
                if (pos >= len) {
                    return token = 1 /* EndOfFileToken */;
                }
                var ch = text.charCodeAt(pos);
                switch (ch) {
                    case 10 /* lineFeed */:
                    case 13 /* carriageReturn */:
                        precedingLineBreak = true;
                        if (skipTrivia) {
                            pos++;
                            continue;
                        }
                        else {
                            if (ch === 13 /* carriageReturn */ && pos + 1 < len && text.charCodeAt(pos + 1) === 10 /* lineFeed */) {
                                pos += 2;
                            }
                            else {
                                pos++;
                            }
                            return token = 4 /* NewLineTrivia */;
                        }
                    case 9 /* tab */:
                    case 11 /* verticalTab */:
                    case 12 /* formFeed */:
                    case 32 /* space */:
                        if (skipTrivia) {
                            pos++;
                            continue;
                        }
                        else {
                            while (pos < len && isWhiteSpace(text.charCodeAt(pos))) {
                                pos++;
                            }
                            return token = 5 /* WhitespaceTrivia */;
                        }
                    case 33 /* exclamation */:
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                return pos += 3, token = 30 /* ExclamationEqualsEqualsToken */;
                            }
                            return pos += 2, token = 28 /* ExclamationEqualsToken */;
                        }
                        return pos++, token = 45 /* ExclamationToken */;
                    case 34 /* doubleQuote */:
                    case 39 /* singleQuote */:
                        tokenValue = scanString();
                        return token = 7 /* StringLiteral */;
                    case 96 /* backtick */:
                        return token = scanTemplateAndSetTokenValue();
                    case 37 /* percent */:
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 56 /* PercentEqualsToken */;
                        }
                        return pos++, token = 36 /* PercentToken */;
                    case 38 /* ampersand */:
                        if (text.charCodeAt(pos + 1) === 38 /* ampersand */) {
                            return pos += 2, token = 47 /* AmpersandAmpersandToken */;
                        }
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 60 /* AmpersandEqualsToken */;
                        }
                        return pos++, token = 42 /* AmpersandToken */;
                    case 40 /* openParen */:
                        return pos++, token = 15 /* OpenParenToken */;
                    case 41 /* closeParen */:
                        return pos++, token = 16 /* CloseParenToken */;
                    case 42 /* asterisk */:
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 54 /* AsteriskEqualsToken */;
                        }
                        return pos++, token = 34 /* AsteriskToken */;
                    case 43 /* plus */:
                        if (text.charCodeAt(pos + 1) === 43 /* plus */) {
                            return pos += 2, token = 37 /* PlusPlusToken */;
                        }
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 52 /* PlusEqualsToken */;
                        }
                        return pos++, token = 32 /* PlusToken */;
                    case 44 /* comma */:
                        return pos++, token = 22 /* CommaToken */;
                    case 45 /* minus */:
                        if (text.charCodeAt(pos + 1) === 45 /* minus */) {
                            return pos += 2, token = 38 /* MinusMinusToken */;
                        }
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 53 /* MinusEqualsToken */;
                        }
                        return pos++, token = 33 /* MinusToken */;
                    case 46 /* dot */:
                        if (isDigit(text.charCodeAt(pos + 1))) {
                            tokenValue = "" + scanNumber();
                            return token = 6 /* NumericLiteral */;
                        }
                        if (text.charCodeAt(pos + 1) === 46 /* dot */ && text.charCodeAt(pos + 2) === 46 /* dot */) {
                            return pos += 3, token = 20 /* DotDotDotToken */;
                        }
                        return pos++, token = 19 /* DotToken */;
                    case 47 /* slash */:
                        if (text.charCodeAt(pos + 1) === 47 /* slash */) {
                            pos += 2;
                            while (pos < len) {
                                if (isLineBreak(text.charCodeAt(pos))) {
                                    break;
                                }
                                pos++;
                            }
                            if (onComment) {
                                onComment(tokenPos, pos);
                            }
                            if (skipTrivia) {
                                continue;
                            }
                            else {
                                return token = 2 /* SingleLineCommentTrivia */;
                            }
                        }
                        if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
                            pos += 2;
                            var commentClosed = false;
                            while (pos < len) {
                                var ch = text.charCodeAt(pos);
                                if (ch === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
                                    pos += 2;
                                    commentClosed = true;
                                    break;
                                }
                                if (isLineBreak(ch)) {
                                    precedingLineBreak = true;
                                }
                                pos++;
                            }
                            if (!commentClosed) {
                                error(ts.Diagnostics.Asterisk_Slash_expected);
                            }
                            if (onComment) {
                                onComment(tokenPos, pos);
                            }
                            if (skipTrivia) {
                                continue;
                            }
                            else {
                                return token = 3 /* MultiLineCommentTrivia */;
                            }
                        }
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 55 /* SlashEqualsToken */;
                        }
                        return pos++, token = 35 /* SlashToken */;
                    case 48 /* _0 */:
                        if (pos + 2 < len && (text.charCodeAt(pos + 1) === 88 /* X */ || text.charCodeAt(pos + 1) === 120 /* x */)) {
                            pos += 2;
                            var value = scanHexDigits(1, false);
                            if (value < 0) {
                                error(ts.Diagnostics.Hexadecimal_digit_expected);
                                value = 0;
                            }
                            tokenValue = "" + value;
                            return 6 /* NumericLiteral */;
                        }
                        if (pos + 1 < len && isOctalDigit(text.charCodeAt(pos + 1))) {
                            tokenValue = "" + scanOctalDigits();
                            return 6 /* NumericLiteral */;
                        }
                    case 49 /* _1 */:
                    case 50 /* _2 */:
                    case 51 /* _3 */:
                    case 52 /* _4 */:
                    case 53 /* _5 */:
                    case 54 /* _6 */:
                    case 55 /* _7 */:
                    case 56 /* _8 */:
                    case 57 /* _9 */:
                        tokenValue = "" + scanNumber();
                        return token = 6 /* NumericLiteral */;
                    case 58 /* colon */:
                        return pos++, token = 50 /* ColonToken */;
                    case 59 /* semicolon */:
                        return pos++, token = 21 /* SemicolonToken */;
                    case 60 /* lessThan */:
                        if (text.charCodeAt(pos + 1) === 60 /* lessThan */) {
                            if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                return pos += 3, token = 57 /* LessThanLessThanEqualsToken */;
                            }
                            return pos += 2, token = 39 /* LessThanLessThanToken */;
                        }
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 25 /* LessThanEqualsToken */;
                        }
                        return pos++, token = 23 /* LessThanToken */;
                    case 61 /* equals */:
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                return pos += 3, token = 29 /* EqualsEqualsEqualsToken */;
                            }
                            return pos += 2, token = 27 /* EqualsEqualsToken */;
                        }
                        if (text.charCodeAt(pos + 1) === 62 /* greaterThan */) {
                            return pos += 2, token = 31 /* EqualsGreaterThanToken */;
                        }
                        return pos++, token = 51 /* EqualsToken */;
                    case 62 /* greaterThan */:
                        return pos++, token = 24 /* GreaterThanToken */;
                    case 63 /* question */:
                        return pos++, token = 49 /* QuestionToken */;
                    case 91 /* openBracket */:
                        return pos++, token = 17 /* OpenBracketToken */;
                    case 93 /* closeBracket */:
                        return pos++, token = 18 /* CloseBracketToken */;
                    case 94 /* caret */:
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 62 /* CaretEqualsToken */;
                        }
                        return pos++, token = 44 /* CaretToken */;
                    case 123 /* openBrace */:
                        return pos++, token = 13 /* OpenBraceToken */;
                    case 124 /* bar */:
                        if (text.charCodeAt(pos + 1) === 124 /* bar */) {
                            return pos += 2, token = 48 /* BarBarToken */;
                        }
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 61 /* BarEqualsToken */;
                        }
                        return pos++, token = 43 /* BarToken */;
                    case 125 /* closeBrace */:
                        return pos++, token = 14 /* CloseBraceToken */;
                    case 126 /* tilde */:
                        return pos++, token = 46 /* TildeToken */;
                    case 92 /* backslash */:
                        var ch = peekUnicodeEscape();
                        if (ch >= 0 && isIdentifierStart(ch)) {
                            pos += 6;
                            tokenValue = String.fromCharCode(ch) + scanIdentifierParts();
                            return token = getIdentifierToken();
                        }
                        error(ts.Diagnostics.Invalid_character);
                        return pos++, token = 0 /* Unknown */;
                    default:
                        if (isIdentifierStart(ch)) {
                            pos++;
                            while (pos < len && isIdentifierPart(ch = text.charCodeAt(pos)))
                                pos++;
                            tokenValue = text.substring(tokenPos, pos);
                            if (ch === 92 /* backslash */) {
                                tokenValue += scanIdentifierParts();
                            }
                            return token = getIdentifierToken();
                        }
                        else if (isWhiteSpace(ch)) {
                            pos++;
                            continue;
                        }
                        else if (isLineBreak(ch)) {
                            precedingLineBreak = true;
                            pos++;
                            continue;
                        }
                        error(ts.Diagnostics.Invalid_character);
                        return pos++, token = 0 /* Unknown */;
                }
            }
        }
        function reScanGreaterToken() {
            if (token === 24 /* GreaterThanToken */) {
                if (text.charCodeAt(pos) === 62 /* greaterThan */) {
                    if (text.charCodeAt(pos + 1) === 62 /* greaterThan */) {
                        if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                            return pos += 3, token = 59 /* GreaterThanGreaterThanGreaterThanEqualsToken */;
                        }
                        return pos += 2, token = 41 /* GreaterThanGreaterThanGreaterThanToken */;
                    }
                    if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                        return pos += 2, token = 58 /* GreaterThanGreaterThanEqualsToken */;
                    }
                    return pos++, token = 40 /* GreaterThanGreaterThanToken */;
                }
                if (text.charCodeAt(pos) === 61 /* equals */) {
                    return pos++, token = 26 /* GreaterThanEqualsToken */;
                }
            }
            return token;
        }
        function reScanSlashToken() {
            if (token === 35 /* SlashToken */ || token === 55 /* SlashEqualsToken */) {
                var p = tokenPos + 1;
                var inEscape = false;
                var inCharacterClass = false;
                while (true) {
                    if (p >= len) {
                        return token;
                    }
                    var ch = text.charCodeAt(p);
                    if (isLineBreak(ch)) {
                        return token;
                    }
                    if (inEscape) {
                        inEscape = false;
                    }
                    else if (ch === 47 /* slash */ && !inCharacterClass) {
                        break;
                    }
                    else if (ch === 91 /* openBracket */) {
                        inCharacterClass = true;
                    }
                    else if (ch === 92 /* backslash */) {
                        inEscape = true;
                    }
                    else if (ch === 93 /* closeBracket */) {
                        inCharacterClass = false;
                    }
                    p++;
                }
                p++;
                while (isIdentifierPart(text.charCodeAt(p))) {
                    p++;
                }
                pos = p;
                tokenValue = text.substring(tokenPos, pos);
                token = 8 /* RegularExpressionLiteral */;
            }
            return token;
        }
        function reScanTemplateToken() {
            ts.Debug.assert(token === 14 /* CloseBraceToken */, "'reScanTemplateToken' should only be called on a '}'");
            pos = tokenPos;
            return token = scanTemplateAndSetTokenValue();
        }
        function tryScan(callback) {
            var savePos = pos;
            var saveStartPos = startPos;
            var saveTokenPos = tokenPos;
            var saveToken = token;
            var saveTokenValue = tokenValue;
            var savePrecedingLineBreak = precedingLineBreak;
            var result = callback();
            if (!result) {
                pos = savePos;
                startPos = saveStartPos;
                tokenPos = saveTokenPos;
                token = saveToken;
                tokenValue = saveTokenValue;
                precedingLineBreak = savePrecedingLineBreak;
            }
            return result;
        }
        function setText(newText) {
            text = newText || "";
            len = text.length;
            setTextPos(0);
        }
        function setTextPos(textPos) {
            pos = textPos;
            startPos = textPos;
            tokenPos = textPos;
            token = 0 /* Unknown */;
            precedingLineBreak = false;
        }
        setText(text);
        return {
            getStartPos: function () { return startPos; },
            getTextPos: function () { return pos; },
            getToken: function () { return token; },
            getTokenPos: function () { return tokenPos; },
            getTokenText: function () { return text.substring(tokenPos, pos); },
            getTokenValue: function () { return tokenValue; },
            hasPrecedingLineBreak: function () { return precedingLineBreak; },
            isIdentifier: function () { return token === 63 /* Identifier */ || token > 99 /* LastReservedWord */; },
            isReservedWord: function () { return token >= 64 /* FirstReservedWord */ && token <= 99 /* LastReservedWord */; },
            reScanGreaterToken: reScanGreaterToken,
            reScanSlashToken: reScanSlashToken,
            reScanTemplateToken: reScanTemplateToken,
            scan: scan,
            setText: setText,
            setTextPos: setTextPos,
            tryScan: tryScan
        };
    }
    ts.createScanner = createScanner;
})(ts || (ts = {}));
var ts;
(function (ts) {
    (function (EmitReturnStatus) {
        EmitReturnStatus[EmitReturnStatus["Succeeded"] = 0] = "Succeeded";
        EmitReturnStatus[EmitReturnStatus["AllOutputGenerationSkipped"] = 1] = "AllOutputGenerationSkipped";
        EmitReturnStatus[EmitReturnStatus["JSGeneratedWithSemanticErrors"] = 2] = "JSGeneratedWithSemanticErrors";
        EmitReturnStatus[EmitReturnStatus["DeclarationGenerationSkipped"] = 3] = "DeclarationGenerationSkipped";
        EmitReturnStatus[EmitReturnStatus["EmitErrorsEncountered"] = 4] = "EmitErrorsEncountered";
        EmitReturnStatus[EmitReturnStatus["CompilerOptionsErrors"] = 5] = "CompilerOptionsErrors";
    })(ts.EmitReturnStatus || (ts.EmitReturnStatus = {}));
    var EmitReturnStatus = ts.EmitReturnStatus;
    (function (DiagnosticCategory) {
        DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
        DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
        DiagnosticCategory[DiagnosticCategory["Message"] = 2] = "Message";
    })(ts.DiagnosticCategory || (ts.DiagnosticCategory = {}));
    var DiagnosticCategory = ts.DiagnosticCategory;
})(ts || (ts = {}));
var ts;
(function (ts) {
    function forEach(array, callback) {
        var result;
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (result = callback(array[i])) {
                    break;
                }
            }
        }
        return result;
    }
    ts.forEach = forEach;
    function contains(array, value) {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return true;
                }
            }
        }
        return false;
    }
    ts.contains = contains;
    function indexOf(array, value) {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }
    ts.indexOf = indexOf;
    function countWhere(array, predicate) {
        var count = 0;
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (predicate(array[i])) {
                    count++;
                }
            }
        }
        return count;
    }
    ts.countWhere = countWhere;
    function filter(array, f) {
        if (array) {
            var result = [];
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                if (f(item)) {
                    result.push(item);
                }
            }
        }
        return result;
    }
    ts.filter = filter;
    function map(array, f) {
        if (array) {
            var result = [];
            for (var i = 0, len = array.length; i < len; i++) {
                result.push(f(array[i]));
            }
        }
        return result;
    }
    ts.map = map;
    function concatenate(array1, array2) {
        if (!array2 || !array2.length)
            return array1;
        if (!array1 || !array1.length)
            return array2;
        return array1.concat(array2);
    }
    ts.concatenate = concatenate;
    function deduplicate(array) {
        if (array) {
            var result = [];
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                if (!contains(result, item))
                    result.push(item);
            }
        }
        return result;
    }
    ts.deduplicate = deduplicate;
    function sum(array, prop) {
        var result = 0;
        for (var i = 0; i < array.length; i++) {
            result += array[i][prop];
        }
        return result;
    }
    ts.sum = sum;
    function binarySearch(array, value) {
        var low = 0;
        var high = array.length - 1;
        while (low <= high) {
            var middle = low + ((high - low) >> 1);
            var midValue = array[middle];
            if (midValue === value) {
                return middle;
            }
            else if (midValue > value) {
                high = middle - 1;
            }
            else {
                low = middle + 1;
            }
        }
        return ~low;
    }
    ts.binarySearch = binarySearch;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasProperty(map, key) {
        return hasOwnProperty.call(map, key);
    }
    ts.hasProperty = hasProperty;
    function getProperty(map, key) {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }
    ts.getProperty = getProperty;
    function isEmpty(map) {
        for (var id in map) {
            if (hasProperty(map, id)) {
                return false;
            }
        }
        return true;
    }
    ts.isEmpty = isEmpty;
    function clone(object) {
        var result = {};
        for (var id in object) {
            result[id] = object[id];
        }
        return result;
    }
    ts.clone = clone;
    function forEachValue(map, callback) {
        var result;
        for (var id in map) {
            if (result = callback(map[id]))
                break;
        }
        return result;
    }
    ts.forEachValue = forEachValue;
    function forEachKey(map, callback) {
        var result;
        for (var id in map) {
            if (result = callback(id))
                break;
        }
        return result;
    }
    ts.forEachKey = forEachKey;
    function lookUp(map, key) {
        return hasProperty(map, key) ? map[key] : undefined;
    }
    ts.lookUp = lookUp;
    function mapToArray(map) {
        var result = [];
        for (var id in map) {
            result.push(map[id]);
        }
        return result;
    }
    ts.mapToArray = mapToArray;
    function arrayToMap(array, makeKey) {
        var result = {};
        forEach(array, function (value) {
            result[makeKey(value)] = value;
        });
        return result;
    }
    ts.arrayToMap = arrayToMap;
    function formatStringFromArgs(text, args, baseIndex) {
        baseIndex = baseIndex || 0;
        return text.replace(/{(\d+)}/g, function (match, index) { return args[+index + baseIndex]; });
    }
    ts.localizedDiagnosticMessages = undefined;
    function getLocaleSpecificMessage(message) {
        return ts.localizedDiagnosticMessages && ts.localizedDiagnosticMessages[message] ? ts.localizedDiagnosticMessages[message] : message;
    }
    ts.getLocaleSpecificMessage = getLocaleSpecificMessage;
    function createFileDiagnostic(file, start, length, message) {
        Debug.assert(start >= 0, "start must be non-negative, is " + start);
        Debug.assert(length >= 0, "length must be non-negative, is " + length);
        var text = getLocaleSpecificMessage(message.key);
        if (arguments.length > 4) {
            text = formatStringFromArgs(text, arguments, 4);
        }
        return {
            file: file,
            start: start,
            length: length,
            messageText: text,
            category: message.category,
            code: message.code,
            isEarly: message.isEarly
        };
    }
    ts.createFileDiagnostic = createFileDiagnostic;
    function createCompilerDiagnostic(message) {
        var text = getLocaleSpecificMessage(message.key);
        if (arguments.length > 1) {
            text = formatStringFromArgs(text, arguments, 1);
        }
        return {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: text,
            category: message.category,
            code: message.code,
            isEarly: message.isEarly
        };
    }
    ts.createCompilerDiagnostic = createCompilerDiagnostic;
    function chainDiagnosticMessages(details, message) {
        var text = getLocaleSpecificMessage(message.key);
        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }
        return {
            messageText: text,
            category: message.category,
            code: message.code,
            next: details
        };
    }
    ts.chainDiagnosticMessages = chainDiagnosticMessages;
    function concatenateDiagnosticMessageChains(headChain, tailChain) {
        Debug.assert(!headChain.next);
        headChain.next = tailChain;
        return headChain;
    }
    ts.concatenateDiagnosticMessageChains = concatenateDiagnosticMessageChains;
    function flattenDiagnosticChain(file, start, length, diagnosticChain, newLine) {
        Debug.assert(start >= 0, "start must be non-negative, is " + start);
        Debug.assert(length >= 0, "length must be non-negative, is " + length);
        var code = diagnosticChain.code;
        var category = diagnosticChain.category;
        var messageText = "";
        var indent = 0;
        while (diagnosticChain) {
            if (indent) {
                messageText += newLine;
                for (var i = 0; i < indent; i++) {
                    messageText += "  ";
                }
            }
            messageText += diagnosticChain.messageText;
            indent++;
            diagnosticChain = diagnosticChain.next;
        }
        return {
            file: file,
            start: start,
            length: length,
            code: code,
            category: category,
            messageText: messageText
        };
    }
    ts.flattenDiagnosticChain = flattenDiagnosticChain;
    function compareValues(a, b) {
        if (a === b)
            return 0 /* EqualTo */;
        if (a === undefined)
            return -1 /* LessThan */;
        if (b === undefined)
            return 1 /* GreaterThan */;
        return a < b ? -1 /* LessThan */ : 1 /* GreaterThan */;
    }
    ts.compareValues = compareValues;
    function getDiagnosticFilename(diagnostic) {
        return diagnostic.file ? diagnostic.file.filename : undefined;
    }
    function compareDiagnostics(d1, d2) {
        return compareValues(getDiagnosticFilename(d1), getDiagnosticFilename(d2)) || compareValues(d1.start, d2.start) || compareValues(d1.length, d2.length) || compareValues(d1.code, d2.code) || compareValues(d1.messageText, d2.messageText) || 0;
    }
    ts.compareDiagnostics = compareDiagnostics;
    function deduplicateSortedDiagnostics(diagnostics) {
        if (diagnostics.length < 2) {
            return diagnostics;
        }
        var newDiagnostics = [diagnostics[0]];
        var previousDiagnostic = diagnostics[0];
        for (var i = 1; i < diagnostics.length; i++) {
            var currentDiagnostic = diagnostics[i];
            var isDupe = compareDiagnostics(currentDiagnostic, previousDiagnostic) === 0 /* EqualTo */;
            if (!isDupe) {
                newDiagnostics.push(currentDiagnostic);
                previousDiagnostic = currentDiagnostic;
            }
        }
        return newDiagnostics;
    }
    ts.deduplicateSortedDiagnostics = deduplicateSortedDiagnostics;
    function normalizeSlashes(path) {
        return path.replace(/\\/g, "/");
    }
    ts.normalizeSlashes = normalizeSlashes;
    function getRootLength(path) {
        if (path.charCodeAt(0) === 47 /* slash */) {
            if (path.charCodeAt(1) !== 47 /* slash */)
                return 1;
            var p1 = path.indexOf("/", 2);
            if (p1 < 0)
                return 2;
            var p2 = path.indexOf("/", p1 + 1);
            if (p2 < 0)
                return p1 + 1;
            return p2 + 1;
        }
        if (path.charCodeAt(1) === 58 /* colon */) {
            if (path.charCodeAt(2) === 47 /* slash */)
                return 3;
            return 2;
        }
        return 0;
    }
    ts.getRootLength = getRootLength;
    ts.directorySeparator = "/";
    function getNormalizedParts(normalizedSlashedPath, rootLength) {
        var parts = normalizedSlashedPath.substr(rootLength).split(ts.directorySeparator);
        var normalized = [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part !== ".") {
                if (part === ".." && normalized.length > 0 && normalized[normalized.length - 1] !== "..") {
                    normalized.pop();
                }
                else {
                    normalized.push(part);
                }
            }
        }
        return normalized;
    }
    function normalizePath(path) {
        var path = normalizeSlashes(path);
        var rootLength = getRootLength(path);
        var normalized = getNormalizedParts(path, rootLength);
        return path.substr(0, rootLength) + normalized.join(ts.directorySeparator);
    }
    ts.normalizePath = normalizePath;
    function getDirectoryPath(path) {
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(ts.directorySeparator)));
    }
    ts.getDirectoryPath = getDirectoryPath;
    function isUrl(path) {
        return path && !isRootedDiskPath(path) && path.indexOf("://") !== -1;
    }
    ts.isUrl = isUrl;
    function isRootedDiskPath(path) {
        return getRootLength(path) !== 0;
    }
    ts.isRootedDiskPath = isRootedDiskPath;
    function normalizedPathComponents(path, rootLength) {
        var normalizedParts = getNormalizedParts(path, rootLength);
        return [path.substr(0, rootLength)].concat(normalizedParts);
    }
    function getNormalizedPathComponents(path, currentDirectory) {
        var path = normalizeSlashes(path);
        var rootLength = getRootLength(path);
        if (rootLength == 0) {
            path = combinePaths(normalizeSlashes(currentDirectory), path);
            rootLength = getRootLength(path);
        }
        return normalizedPathComponents(path, rootLength);
    }
    ts.getNormalizedPathComponents = getNormalizedPathComponents;
    function getNormalizedPathFromPathComponents(pathComponents) {
        if (pathComponents && pathComponents.length) {
            return pathComponents[0] + pathComponents.slice(1).join(ts.directorySeparator);
        }
    }
    ts.getNormalizedPathFromPathComponents = getNormalizedPathFromPathComponents;
    function getNormalizedPathComponentsOfUrl(url) {
        var urlLength = url.length;
        var rootLength = url.indexOf("://") + "://".length;
        while (rootLength < urlLength) {
            if (url.charCodeAt(rootLength) === 47 /* slash */) {
                rootLength++;
            }
            else {
                break;
            }
        }
        if (rootLength === urlLength) {
            return [url];
        }
        var indexOfNextSlash = url.indexOf(ts.directorySeparator, rootLength);
        if (indexOfNextSlash !== -1) {
            rootLength = indexOfNextSlash + 1;
            return normalizedPathComponents(url, rootLength);
        }
        else {
            return [url + ts.directorySeparator];
        }
    }
    function getNormalizedPathOrUrlComponents(pathOrUrl, currentDirectory) {
        if (isUrl(pathOrUrl)) {
            return getNormalizedPathComponentsOfUrl(pathOrUrl);
        }
        else {
            return getNormalizedPathComponents(pathOrUrl, currentDirectory);
        }
    }
    function getRelativePathToDirectoryOrUrl(directoryPathOrUrl, relativeOrAbsolutePath, currentDirectory, getCanonicalFileName, isAbsolutePathAnUrl) {
        var pathComponents = getNormalizedPathOrUrlComponents(relativeOrAbsolutePath, currentDirectory);
        var directoryComponents = getNormalizedPathOrUrlComponents(directoryPathOrUrl, currentDirectory);
        if (directoryComponents.length > 1 && directoryComponents[directoryComponents.length - 1] === "") {
            directoryComponents.length--;
        }
        for (var joinStartIndex = 0; joinStartIndex < pathComponents.length && joinStartIndex < directoryComponents.length; joinStartIndex++) {
            if (getCanonicalFileName(directoryComponents[joinStartIndex]) !== getCanonicalFileName(pathComponents[joinStartIndex])) {
                break;
            }
        }
        if (joinStartIndex) {
            var relativePath = "";
            var relativePathComponents = pathComponents.slice(joinStartIndex, pathComponents.length);
            for (; joinStartIndex < directoryComponents.length; joinStartIndex++) {
                if (directoryComponents[joinStartIndex] !== "") {
                    relativePath = relativePath + ".." + ts.directorySeparator;
                }
            }
            return relativePath + relativePathComponents.join(ts.directorySeparator);
        }
        var absolutePath = getNormalizedPathFromPathComponents(pathComponents);
        if (isAbsolutePathAnUrl && isRootedDiskPath(absolutePath)) {
            absolutePath = "file:///" + absolutePath;
        }
        return absolutePath;
    }
    ts.getRelativePathToDirectoryOrUrl = getRelativePathToDirectoryOrUrl;
    function getBaseFilename(path) {
        var i = path.lastIndexOf(ts.directorySeparator);
        return i < 0 ? path : path.substring(i + 1);
    }
    ts.getBaseFilename = getBaseFilename;
    function combinePaths(path1, path2) {
        if (!(path1 && path1.length))
            return path2;
        if (!(path2 && path2.length))
            return path1;
        if (path2.charAt(0) === ts.directorySeparator)
            return path2;
        if (path1.charAt(path1.length - 1) === ts.directorySeparator)
            return path1 + path2;
        return path1 + ts.directorySeparator + path2;
    }
    ts.combinePaths = combinePaths;
    function fileExtensionIs(path, extension) {
        var pathLen = path.length;
        var extLen = extension.length;
        return pathLen > extLen && path.substr(pathLen - extLen, extLen) === extension;
    }
    ts.fileExtensionIs = fileExtensionIs;
    var supportedExtensions = [".d.ts", ".ts", ".js"];
    function removeFileExtension(path) {
        for (var i = 0; i < supportedExtensions.length; i++) {
            var ext = supportedExtensions[i];
            if (fileExtensionIs(path, ext)) {
                return path.substr(0, path.length - ext.length);
            }
        }
        return path;
    }
    ts.removeFileExtension = removeFileExtension;
    var escapedCharsRegExp = /[\t\v\f\b\0\r\n\"\\\u2028\u2029\u0085]/g;
    var escapedCharsMap = {
        "\t": "\\t",
        "\v": "\\v",
        "\f": "\\f",
        "\b": "\\b",
        "\0": "\\0",
        "\r": "\\r",
        "\n": "\\n",
        "\"": "\\\"",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029",
        "\u0085": "\\u0085"
    };
    function escapeString(s) {
        return escapedCharsRegExp.test(s) ? s.replace(escapedCharsRegExp, function (c) {
            return escapedCharsMap[c] || c;
        }) : s;
    }
    ts.escapeString = escapeString;
    function Symbol(flags, name) {
        this.flags = flags;
        this.name = name;
        this.declarations = undefined;
    }
    function Type(checker, flags) {
        this.flags = flags;
    }
    function Signature(checker) {
    }
    ts.objectAllocator = {
        getNodeConstructor: function (kind) {
            function Node() {
            }
            Node.prototype = {
                kind: kind,
                pos: 0,
                end: 0,
                flags: 0,
                parent: undefined
            };
            return Node;
        },
        getSymbolConstructor: function () { return Symbol; },
        getTypeConstructor: function () { return Type; },
        getSignatureConstructor: function () { return Signature; }
    };
    var Debug;
    (function (Debug) {
        var currentAssertionLevel = 0 /* None */;
        function shouldAssert(level) {
            return currentAssertionLevel >= level;
        }
        Debug.shouldAssert = shouldAssert;
        function assert(expression, message, verboseDebugInfo) {
            if (!expression) {
                var verboseDebugString = "";
                if (verboseDebugInfo) {
                    verboseDebugString = "\r\nVerbose Debug Information: " + verboseDebugInfo();
                }
                throw new Error("Debug Failure. False expression: " + (message || "") + verboseDebugString);
            }
        }
        Debug.assert = assert;
        function fail(message) {
            Debug.assert(false, message);
        }
        Debug.fail = fail;
    })(Debug = ts.Debug || (ts.Debug = {}));
})(ts || (ts = {}));
var sys = (function () {
    function getWScriptSystem() {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var fileStream = new ActiveXObject("ADODB.Stream");
        fileStream.Type = 2;
        var binaryStream = new ActiveXObject("ADODB.Stream");
        binaryStream.Type = 1;
        var args = [];
        for (var i = 0; i < WScript.Arguments.length; i++) {
            args[i] = WScript.Arguments.Item(i);
        }
        function readFile(fileName, encoding) {
            if (!fso.FileExists(fileName)) {
                return undefined;
            }
            fileStream.Open();
            try {
                if (encoding) {
                    fileStream.Charset = encoding;
                    fileStream.LoadFromFile(fileName);
                }
                else {
                    fileStream.Charset = "x-ansi";
                    fileStream.LoadFromFile(fileName);
                    var bom = fileStream.ReadText(2) || "";
                    fileStream.Position = 0;
                    fileStream.Charset = bom.length >= 2 && (bom.charCodeAt(0) === 0xFF && bom.charCodeAt(1) === 0xFE || bom.charCodeAt(0) === 0xFE && bom.charCodeAt(1) === 0xFF) ? "unicode" : "utf-8";
                }
                return fileStream.ReadText();
            }
            catch (e) {
                throw e;
            }
            finally {
                fileStream.Close();
            }
        }
        function writeFile(fileName, data, writeByteOrderMark) {
            fileStream.Open();
            binaryStream.Open();
            try {
                fileStream.Charset = "utf-8";
                fileStream.WriteText(data);
                if (writeByteOrderMark) {
                    fileStream.Position = 0;
                }
                else {
                    fileStream.Position = 3;
                }
                fileStream.CopyTo(binaryStream);
                binaryStream.SaveToFile(fileName, 2);
            }
            finally {
                binaryStream.Close();
                fileStream.Close();
            }
        }
        return {
            args: args,
            newLine: "\r\n",
            useCaseSensitiveFileNames: false,
            write: function (s) {
                WScript.StdOut.Write(s);
            },
            readFile: readFile,
            writeFile: writeFile,
            resolvePath: function (path) {
                return fso.GetAbsolutePathName(path);
            },
            fileExists: function (path) {
                return fso.FileExists(path);
            },
            directoryExists: function (path) {
                return fso.FolderExists(path);
            },
            createDirectory: function (directoryName) {
                if (!this.directoryExists(directoryName)) {
                    fso.CreateFolder(directoryName);
                }
            },
            getExecutingFilePath: function () {
                return WScript.ScriptFullName;
            },
            getCurrentDirectory: function () {
                return new ActiveXObject("WScript.Shell").CurrentDirectory;
            },
            exit: function (exitCode) {
                try {
                    WScript.Quit(exitCode);
                }
                catch (e) {
                }
            }
        };
    }
    function getNodeSystem() {
        var _fs = require("fs");
        var _path = require("path");
        var _os = require('os');
        var platform = _os.platform();
        var useCaseSensitiveFileNames = platform !== "win32" && platform !== "win64" && platform !== "darwin";
        function readFile(fileName, encoding) {
            if (!_fs.existsSync(fileName)) {
                return undefined;
            }
            var buffer = _fs.readFileSync(fileName);
            var len = buffer.length;
            if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                len &= ~1;
                for (var i = 0; i < len; i += 2) {
                    var temp = buffer[i];
                    buffer[i] = buffer[i + 1];
                    buffer[i + 1] = temp;
                }
                return buffer.toString("utf16le", 2);
            }
            if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                return buffer.toString("utf16le", 2);
            }
            if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                return buffer.toString("utf8", 3);
            }
            return buffer.toString("utf8");
        }
        function writeFile(fileName, data, writeByteOrderMark) {
            if (writeByteOrderMark) {
                data = '\uFEFF' + data;
            }
            _fs.writeFileSync(fileName, data, "utf8");
        }
        return {
            args: process.argv.slice(2),
            newLine: _os.EOL,
            useCaseSensitiveFileNames: useCaseSensitiveFileNames,
            write: function (s) {
                _fs.writeSync(1, s);
            },
            readFile: readFile,
            writeFile: writeFile,
            watchFile: function (fileName, callback) {
                _fs.watchFile(fileName, { persistent: true, interval: 250 }, fileChanged);
                return {
                    close: function () {
                        _fs.unwatchFile(fileName, fileChanged);
                    }
                };
                function fileChanged(curr, prev) {
                    if (+curr.mtime <= +prev.mtime) {
                        return;
                    }
                    callback(fileName);
                }
                ;
            },
            resolvePath: function (path) {
                return _path.resolve(path);
            },
            fileExists: function (path) {
                return _fs.existsSync(path);
            },
            directoryExists: function (path) {
                return _fs.existsSync(path) && _fs.statSync(path).isDirectory();
            },
            createDirectory: function (directoryName) {
                if (!this.directoryExists(directoryName)) {
                    _fs.mkdirSync(directoryName);
                }
            },
            getExecutingFilePath: function () {
                return process.mainModule.filename;
            },
            getCurrentDirectory: function () {
                return process.cwd();
            },
            getMemoryUsage: function () {
                if (global.gc) {
                    global.gc();
                }
                return process.memoryUsage().heapUsed;
            },
            exit: function (exitCode) {
                process.exit(exitCode);
            }
        };
    }
    if (typeof WScript !== "undefined" && typeof ActiveXObject === "function") {
        return getWScriptSystem();
    }
    else if (typeof module !== "undefined" && module.exports) {
        return getNodeSystem();
    }
    else {
        return undefined;
    }
})();
var ts;
(function (ts) {
    var nodeConstructors = new Array(196 /* Count */);
    function getNodeConstructor(kind) {
        return nodeConstructors[kind] || (nodeConstructors[kind] = ts.objectAllocator.getNodeConstructor(kind));
    }
    ts.getNodeConstructor = getNodeConstructor;
    function createRootNode(kind, pos, end, flags) {
        var node = new (getNodeConstructor(kind))();
        node.pos = pos;
        node.end = end;
        node.flags = flags;
        return node;
    }
    function getSourceFileOfNode(node) {
        while (node && node.kind !== 193 /* SourceFile */)
            node = node.parent;
        return node;
    }
    ts.getSourceFileOfNode = getSourceFileOfNode;
    function nodePosToString(node) {
        var file = getSourceFileOfNode(node);
        var loc = file.getLineAndCharacterFromPosition(node.pos);
        return file.filename + "(" + loc.line + "," + loc.character + ")";
    }
    ts.nodePosToString = nodePosToString;
    function getStartPosOfNode(node) {
        return node.pos;
    }
    ts.getStartPosOfNode = getStartPosOfNode;
    function getTokenPosOfNode(node, sourceFile) {
        return ts.skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos);
    }
    ts.getTokenPosOfNode = getTokenPosOfNode;
    function getTextOfNodeFromSourceText(sourceText, node) {
        return sourceText.substring(ts.skipTrivia(sourceText, node.pos), node.end);
    }
    ts.getTextOfNodeFromSourceText = getTextOfNodeFromSourceText;
    function getTextOfNode(node) {
        var text = getSourceFileOfNode(node).text;
        return text.substring(ts.skipTrivia(text, node.pos), node.end);
    }
    ts.getTextOfNode = getTextOfNode;
    function escapeIdentifier(identifier) {
        return identifier.length >= 2 && identifier.charCodeAt(0) === 95 /* _ */ && identifier.charCodeAt(1) === 95 /* _ */ ? "_" + identifier : identifier;
    }
    ts.escapeIdentifier = escapeIdentifier;
    function unescapeIdentifier(identifier) {
        return identifier.length >= 3 && identifier.charCodeAt(0) === 95 /* _ */ && identifier.charCodeAt(1) === 95 /* _ */ && identifier.charCodeAt(2) === 95 /* _ */ ? identifier.substr(1) : identifier;
    }
    ts.unescapeIdentifier = unescapeIdentifier;
    function identifierToString(identifier) {
        return identifier.kind === 120 /* Missing */ ? "(Missing)" : getTextOfNode(identifier);
    }
    ts.identifierToString = identifierToString;
    function createDiagnosticForNode(node, message, arg0, arg1, arg2) {
        node = getErrorSpanForNode(node);
        var file = getSourceFileOfNode(node);
        var start = node.kind === 120 /* Missing */ ? node.pos : ts.skipTrivia(file.text, node.pos);
        var length = node.end - start;
        return ts.createFileDiagnostic(file, start, length, message, arg0, arg1, arg2);
    }
    ts.createDiagnosticForNode = createDiagnosticForNode;
    function createDiagnosticForNodeFromMessageChain(node, messageChain, newLine) {
        node = getErrorSpanForNode(node);
        var file = getSourceFileOfNode(node);
        var start = ts.skipTrivia(file.text, node.pos);
        var length = node.end - start;
        return ts.flattenDiagnosticChain(file, start, length, messageChain, newLine);
    }
    ts.createDiagnosticForNodeFromMessageChain = createDiagnosticForNodeFromMessageChain;
    function getErrorSpanForNode(node) {
        var errorSpan;
        switch (node.kind) {
            case 181 /* VariableDeclaration */:
            case 184 /* ClassDeclaration */:
            case 185 /* InterfaceDeclaration */:
            case 188 /* ModuleDeclaration */:
            case 187 /* EnumDeclaration */:
            case 192 /* EnumMember */:
                errorSpan = node.name;
                break;
        }
        return errorSpan && errorSpan.pos < errorSpan.end ? errorSpan : node;
    }
    ts.getErrorSpanForNode = getErrorSpanForNode;
    function isExternalModule(file) {
        return file.externalModuleIndicator !== undefined;
    }
    ts.isExternalModule = isExternalModule;
    function isDeclarationFile(file) {
        return (file.flags & 1024 /* DeclarationFile */) !== 0;
    }
    ts.isDeclarationFile = isDeclarationFile;
    function isConstEnumDeclaration(node) {
        return (node.flags & 4096 /* Const */) !== 0;
    }
    ts.isConstEnumDeclaration = isConstEnumDeclaration;
    function isPrologueDirective(node) {
        return node.kind === 161 /* ExpressionStatement */ && node.expression.kind === 7 /* StringLiteral */;
    }
    ts.isPrologueDirective = isPrologueDirective;
    function isEvalOrArgumentsIdentifier(node) {
        return node.kind === 63 /* Identifier */ && node.text && (node.text === "eval" || node.text === "arguments");
    }
    function isUseStrictPrologueDirective(node) {
        ts.Debug.assert(isPrologueDirective(node));
        return node.expression.text === "use strict";
    }
    function getLeadingCommentRangesOfNode(node, sourceFileOfNode) {
        sourceFileOfNode = sourceFileOfNode || getSourceFileOfNode(node);
        if (node.kind === 123 /* Parameter */ || node.kind === 122 /* TypeParameter */) {
            return ts.concatenate(ts.getTrailingCommentRanges(sourceFileOfNode.text, node.pos), ts.getLeadingCommentRanges(sourceFileOfNode.text, node.pos));
        }
        else {
            return ts.getLeadingCommentRanges(sourceFileOfNode.text, node.pos);
        }
    }
    ts.getLeadingCommentRangesOfNode = getLeadingCommentRangesOfNode;
    function getJsDocComments(node, sourceFileOfNode) {
        return ts.filter(getLeadingCommentRangesOfNode(node, sourceFileOfNode), function (comment) { return isJsDocComment(comment); });
        function isJsDocComment(comment) {
            return sourceFileOfNode.text.charCodeAt(comment.pos + 1) === 42 /* asterisk */ && sourceFileOfNode.text.charCodeAt(comment.pos + 2) === 42 /* asterisk */ && sourceFileOfNode.text.charCodeAt(comment.pos + 3) !== 47 /* slash */;
        }
    }
    ts.getJsDocComments = getJsDocComments;
    ts.fullTripleSlashReferencePathRegEx = /^(\/\/\/\s*<reference\s+path\s*=\s*)('|")(.+?)\2.*?\/>/;
    function forEachChild(node, cbNode, cbNodes) {
        function child(node) {
            if (node)
                return cbNode(node);
        }
        function children(nodes) {
            if (nodes) {
                if (cbNodes)
                    return cbNodes(nodes);
                var result;
                for (var i = 0, len = nodes.length; i < len; i++) {
                    if (result = cbNode(nodes[i]))
                        break;
                }
                return result;
            }
        }
        if (!node)
            return;
        switch (node.kind) {
            case 121 /* QualifiedName */:
                return child(node.left) || child(node.right);
            case 122 /* TypeParameter */:
                return child(node.name) || child(node.constraint);
            case 123 /* Parameter */:
                return child(node.name) || child(node.type) || child(node.initializer);
            case 124 /* Property */:
            case 141 /* PropertyAssignment */:
                return child(node.name) || child(node.type) || child(node.initializer);
            case 129 /* CallSignature */:
            case 130 /* ConstructSignature */:
            case 131 /* IndexSignature */:
                return children(node.typeParameters) || children(node.parameters) || child(node.type);
            case 125 /* Method */:
            case 126 /* Constructor */:
            case 127 /* GetAccessor */:
            case 128 /* SetAccessor */:
            case 149 /* FunctionExpression */:
            case 182 /* FunctionDeclaration */:
            case 150 /* ArrowFunction */:
                return child(node.name) || children(node.typeParameters) || children(node.parameters) || child(node.type) || child(node.body);
            case 132 /* TypeReference */:
                return child(node.typeName) || children(node.typeArguments);
            case 133 /* TypeQuery */:
                return child(node.exprName);
            case 134 /* TypeLiteral */:
                return children(node.members);
            case 135 /* ArrayType */:
                return child(node.elementType);
            case 136 /* TupleType */:
                return children(node.elementTypes);
            case 137 /* UnionType */:
                return children(node.types);
            case 138 /* ParenType */:
                return child(node.type);
            case 139 /* ArrayLiteral */:
                return children(node.elements);
            case 140 /* ObjectLiteral */:
                return children(node.properties);
            case 142 /* PropertyAccess */:
                return child(node.left) || child(node.right);
            case 143 /* IndexedAccess */:
                return child(node.object) || child(node.index);
            case 144 /* CallExpression */:
            case 145 /* NewExpression */:
                return child(node.func) || children(node.typeArguments) || children(node.arguments);
            case 146 /* TaggedTemplateExpression */:
                return child(node.tag) || child(node.template);
            case 147 /* TypeAssertion */:
                return child(node.type) || child(node.operand);
            case 148 /* ParenExpression */:
                return child(node.expression);
            case 151 /* PrefixOperator */:
            case 152 /* PostfixOperator */:
                return child(node.operand);
            case 153 /* BinaryExpression */:
                return child(node.left) || child(node.right);
            case 154 /* ConditionalExpression */:
                return child(node.condition) || child(node.whenTrue) || child(node.whenFalse);
            case 158 /* Block */:
            case 177 /* TryBlock */:
            case 179 /* FinallyBlock */:
            case 183 /* FunctionBlock */:
            case 189 /* ModuleBlock */:
            case 193 /* SourceFile */:
                return children(node.statements);
            case 159 /* VariableStatement */:
                return children(node.declarations);
            case 161 /* ExpressionStatement */:
                return child(node.expression);
            case 162 /* IfStatement */:
                return child(node.expression) || child(node.thenStatement) || child(node.elseStatement);
            case 163 /* DoStatement */:
                return child(node.statement) || child(node.expression);
            case 164 /* WhileStatement */:
                return child(node.expression) || child(node.statement);
            case 165 /* ForStatement */:
                return children(node.declarations) || child(node.initializer) || child(node.condition) || child(node.iterator) || child(node.statement);
            case 166 /* ForInStatement */:
                return child(node.declaration) || child(node.variable) || child(node.expression) || child(node.statement);
            case 167 /* ContinueStatement */:
            case 168 /* BreakStatement */:
                return child(node.label);
            case 169 /* ReturnStatement */:
                return child(node.expression);
            case 170 /* WithStatement */:
                return child(node.expression) || child(node.statement);
            case 171 /* SwitchStatement */:
                return child(node.expression) || children(node.clauses);
            case 172 /* CaseClause */:
            case 173 /* DefaultClause */:
                return child(node.expression) || children(node.statements);
            case 174 /* LabeledStatement */:
                return child(node.label) || child(node.statement);
            case 175 /* ThrowStatement */:
                return child(node.expression);
            case 176 /* TryStatement */:
                return child(node.tryBlock) || child(node.catchBlock) || child(node.finallyBlock);
            case 178 /* CatchBlock */:
                return child(node.variable) || children(node.statements);
            case 181 /* VariableDeclaration */:
                return child(node.name) || child(node.type) || child(node.initializer);
            case 184 /* ClassDeclaration */:
                return child(node.name) || children(node.typeParameters) || child(node.baseType) || children(node.implementedTypes) || children(node.members);
            case 185 /* InterfaceDeclaration */:
                return child(node.name) || children(node.typeParameters) || children(node.baseTypes) || children(node.members);
            case 186 /* TypeAliasDeclaration */:
                return child(node.name) || child(node.type);
            case 187 /* EnumDeclaration */:
                return child(node.name) || children(node.members);
            case 192 /* EnumMember */:
                return child(node.name) || child(node.initializer);
            case 188 /* ModuleDeclaration */:
                return child(node.name) || child(node.body);
            case 190 /* ImportDeclaration */:
                return child(node.name) || child(node.entityName) || child(node.externalModuleName);
            case 191 /* ExportAssignment */:
                return child(node.exportName);
            case 155 /* TemplateExpression */:
                return child(node.head) || children(node.templateSpans);
            case 156 /* TemplateSpan */:
                return child(node.expression) || child(node.literal);
        }
    }
    ts.forEachChild = forEachChild;
    function forEachReturnStatement(body, visitor) {
        return traverse(body);
        function traverse(node) {
            switch (node.kind) {
                case 169 /* ReturnStatement */:
                    return visitor(node);
                case 158 /* Block */:
                case 183 /* FunctionBlock */:
                case 162 /* IfStatement */:
                case 163 /* DoStatement */:
                case 164 /* WhileStatement */:
                case 165 /* ForStatement */:
                case 166 /* ForInStatement */:
                case 170 /* WithStatement */:
                case 171 /* SwitchStatement */:
                case 172 /* CaseClause */:
                case 173 /* DefaultClause */:
                case 174 /* LabeledStatement */:
                case 176 /* TryStatement */:
                case 177 /* TryBlock */:
                case 178 /* CatchBlock */:
                case 179 /* FinallyBlock */:
                    return forEachChild(node, traverse);
            }
        }
    }
    ts.forEachReturnStatement = forEachReturnStatement;
    function isAnyFunction(node) {
        if (node) {
            switch (node.kind) {
                case 149 /* FunctionExpression */:
                case 182 /* FunctionDeclaration */:
                case 150 /* ArrowFunction */:
                case 125 /* Method */:
                case 127 /* GetAccessor */:
                case 128 /* SetAccessor */:
                case 126 /* Constructor */:
                    return true;
            }
        }
        return false;
    }
    ts.isAnyFunction = isAnyFunction;
    function getContainingFunction(node) {
        while (true) {
            node = node.parent;
            if (!node || isAnyFunction(node)) {
                return node;
            }
        }
    }
    ts.getContainingFunction = getContainingFunction;
    function getThisContainer(node, includeArrowFunctions) {
        while (true) {
            node = node.parent;
            if (!node) {
                return undefined;
            }
            switch (node.kind) {
                case 150 /* ArrowFunction */:
                    if (!includeArrowFunctions) {
                        continue;
                    }
                case 182 /* FunctionDeclaration */:
                case 149 /* FunctionExpression */:
                case 188 /* ModuleDeclaration */:
                case 124 /* Property */:
                case 125 /* Method */:
                case 126 /* Constructor */:
                case 127 /* GetAccessor */:
                case 128 /* SetAccessor */:
                case 187 /* EnumDeclaration */:
                case 193 /* SourceFile */:
                    return node;
            }
        }
    }
    ts.getThisContainer = getThisContainer;
    function getSuperContainer(node) {
        while (true) {
            node = node.parent;
            if (!node) {
                return undefined;
            }
            switch (node.kind) {
                case 124 /* Property */:
                case 125 /* Method */:
                case 126 /* Constructor */:
                case 127 /* GetAccessor */:
                case 128 /* SetAccessor */:
                    return node;
            }
        }
    }
    ts.getSuperContainer = getSuperContainer;
    function isExpression(node) {
        switch (node.kind) {
            case 91 /* ThisKeyword */:
            case 89 /* SuperKeyword */:
            case 87 /* NullKeyword */:
            case 93 /* TrueKeyword */:
            case 78 /* FalseKeyword */:
            case 8 /* RegularExpressionLiteral */:
            case 139 /* ArrayLiteral */:
            case 140 /* ObjectLiteral */:
            case 142 /* PropertyAccess */:
            case 143 /* IndexedAccess */:
            case 144 /* CallExpression */:
            case 145 /* NewExpression */:
            case 146 /* TaggedTemplateExpression */:
            case 147 /* TypeAssertion */:
            case 148 /* ParenExpression */:
            case 149 /* FunctionExpression */:
            case 150 /* ArrowFunction */:
            case 151 /* PrefixOperator */:
            case 152 /* PostfixOperator */:
            case 153 /* BinaryExpression */:
            case 154 /* ConditionalExpression */:
            case 155 /* TemplateExpression */:
            case 157 /* OmittedExpression */:
                return true;
            case 121 /* QualifiedName */:
                while (node.parent.kind === 121 /* QualifiedName */)
                    node = node.parent;
                return node.parent.kind === 133 /* TypeQuery */;
            case 63 /* Identifier */:
                if (node.parent.kind === 133 /* TypeQuery */) {
                    return true;
                }
            case 6 /* NumericLiteral */:
            case 7 /* StringLiteral */:
            case 9 /* NoSubstitutionTemplateLiteral */:
                var parent = node.parent;
                switch (parent.kind) {
                    case 181 /* VariableDeclaration */:
                    case 123 /* Parameter */:
                    case 124 /* Property */:
                    case 192 /* EnumMember */:
                    case 141 /* PropertyAssignment */:
                        return parent.initializer === node;
                    case 161 /* ExpressionStatement */:
                    case 162 /* IfStatement */:
                    case 163 /* DoStatement */:
                    case 164 /* WhileStatement */:
                    case 169 /* ReturnStatement */:
                    case 170 /* WithStatement */:
                    case 171 /* SwitchStatement */:
                    case 172 /* CaseClause */:
                    case 175 /* ThrowStatement */:
                    case 171 /* SwitchStatement */:
                        return parent.expression === node;
                    case 165 /* ForStatement */:
                        return parent.initializer === node || parent.condition === node || parent.iterator === node;
                    case 166 /* ForInStatement */:
                        return parent.variable === node || parent.expression === node;
                    case 147 /* TypeAssertion */:
                        return node === parent.operand;
                    default:
                        if (isExpression(parent)) {
                            return true;
                        }
                }
        }
        return false;
    }
    ts.isExpression = isExpression;
    function hasRestParameters(s) {
        return s.parameters.length > 0 && (s.parameters[s.parameters.length - 1].flags & 8 /* Rest */) !== 0;
    }
    ts.hasRestParameters = hasRestParameters;
    function isLiteralKind(kind) {
        return 6 /* FirstLiteralToken */ <= kind && kind <= 9 /* LastLiteralToken */;
    }
    ts.isLiteralKind = isLiteralKind;
    function isTextualLiteralKind(kind) {
        return kind === 7 /* StringLiteral */ || kind === 9 /* NoSubstitutionTemplateLiteral */;
    }
    ts.isTextualLiteralKind = isTextualLiteralKind;
    function isTemplateLiteralKind(kind) {
        return 9 /* FirstTemplateToken */ <= kind && kind <= 12 /* LastTemplateToken */;
    }
    ts.isTemplateLiteralKind = isTemplateLiteralKind;
    function isInAmbientContext(node) {
        while (node) {
            if (node.flags & (2 /* Ambient */ | 1024 /* DeclarationFile */))
                return true;
            node = node.parent;
        }
        return false;
    }
    ts.isInAmbientContext = isInAmbientContext;
    function isDeclaration(node) {
        switch (node.kind) {
            case 122 /* TypeParameter */:
            case 123 /* Parameter */:
            case 181 /* VariableDeclaration */:
            case 124 /* Property */:
            case 141 /* PropertyAssignment */:
            case 192 /* EnumMember */:
            case 125 /* Method */:
            case 182 /* FunctionDeclaration */:
            case 127 /* GetAccessor */:
            case 128 /* SetAccessor */:
            case 184 /* ClassDeclaration */:
            case 185 /* InterfaceDeclaration */:
            case 186 /* TypeAliasDeclaration */:
            case 187 /* EnumDeclaration */:
            case 188 /* ModuleDeclaration */:
            case 190 /* ImportDeclaration */:
                return true;
        }
        return false;
    }
    ts.isDeclaration = isDeclaration;
    function isStatement(n) {
        switch (n.kind) {
            case 168 /* BreakStatement */:
            case 167 /* ContinueStatement */:
            case 180 /* DebuggerStatement */:
            case 163 /* DoStatement */:
            case 161 /* ExpressionStatement */:
            case 160 /* EmptyStatement */:
            case 166 /* ForInStatement */:
            case 165 /* ForStatement */:
            case 162 /* IfStatement */:
            case 174 /* LabeledStatement */:
            case 169 /* ReturnStatement */:
            case 171 /* SwitchStatement */:
            case 92 /* ThrowKeyword */:
            case 176 /* TryStatement */:
            case 159 /* VariableStatement */:
            case 164 /* WhileStatement */:
            case 170 /* WithStatement */:
            case 191 /* ExportAssignment */:
                return true;
            default:
                return false;
        }
    }
    ts.isStatement = isStatement;
    function isDeclarationOrFunctionExpressionOrCatchVariableName(name) {
        if (name.kind !== 63 /* Identifier */ && name.kind !== 7 /* StringLiteral */ && name.kind !== 6 /* NumericLiteral */) {
            return false;
        }
        var parent = name.parent;
        if (isDeclaration(parent) || parent.kind === 149 /* FunctionExpression */) {
            return parent.name === name;
        }
        if (parent.kind === 178 /* CatchBlock */) {
            return parent.variable === name;
        }
        return false;
    }
    ts.isDeclarationOrFunctionExpressionOrCatchVariableName = isDeclarationOrFunctionExpressionOrCatchVariableName;
    function getAncestor(node, kind) {
        switch (kind) {
            case 184 /* ClassDeclaration */:
                while (node) {
                    switch (node.kind) {
                        case 184 /* ClassDeclaration */:
                            return node;
                        case 187 /* EnumDeclaration */:
                        case 185 /* InterfaceDeclaration */:
                        case 186 /* TypeAliasDeclaration */:
                        case 188 /* ModuleDeclaration */:
                        case 190 /* ImportDeclaration */:
                            return undefined;
                        default:
                            node = node.parent;
                            continue;
                    }
                }
                break;
            default:
                while (node) {
                    if (node.kind === kind) {
                        return node;
                    }
                    node = node.parent;
                }
                break;
        }
        return undefined;
    }
    ts.getAncestor = getAncestor;
    function parsingContextErrors(context) {
        switch (context) {
            case 0 /* SourceElements */: return ts.Diagnostics.Declaration_or_statement_expected;
            case 1 /* ModuleElements */: return ts.Diagnostics.Declaration_or_statement_expected;
            case 2 /* BlockStatements */: return ts.Diagnostics.Statement_expected;
            case 3 /* SwitchClauses */: return ts.Diagnostics.case_or_default_expected;
            case 4 /* SwitchClauseStatements */: return ts.Diagnostics.Statement_expected;
            case 5 /* TypeMembers */: return ts.Diagnostics.Property_or_signature_expected;
            case 6 /* ClassMembers */: return ts.Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected;
            case 7 /* EnumMembers */: return ts.Diagnostics.Enum_member_expected;
            case 8 /* BaseTypeReferences */: return ts.Diagnostics.Type_reference_expected;
            case 9 /* VariableDeclarations */: return ts.Diagnostics.Variable_declaration_expected;
            case 10 /* ArgumentExpressions */: return ts.Diagnostics.Argument_expression_expected;
            case 11 /* ObjectLiteralMembers */: return ts.Diagnostics.Property_assignment_expected;
            case 12 /* ArrayLiteralMembers */: return ts.Diagnostics.Expression_or_comma_expected;
            case 13 /* Parameters */: return ts.Diagnostics.Parameter_declaration_expected;
            case 14 /* TypeParameters */: return ts.Diagnostics.Type_parameter_declaration_expected;
            case 15 /* TypeArguments */: return ts.Diagnostics.Type_argument_expected;
            case 16 /* TupleElementTypes */: return ts.Diagnostics.Type_expected;
        }
    }
    ;
    function isKeyword(token) {
        return 64 /* FirstKeyword */ <= token && token <= 119 /* LastKeyword */;
    }
    ts.isKeyword = isKeyword;
    function isTrivia(token) {
        return 2 /* FirstTriviaToken */ <= token && token <= 5 /* LastTriviaToken */;
    }
    ts.isTrivia = isTrivia;
    function isModifier(token) {
        switch (token) {
            case 106 /* PublicKeyword */:
            case 104 /* PrivateKeyword */:
            case 105 /* ProtectedKeyword */:
            case 107 /* StaticKeyword */:
            case 76 /* ExportKeyword */:
            case 112 /* DeclareKeyword */:
                return true;
        }
        return false;
    }
    ts.isModifier = isModifier;
    function createSourceFile(filename, sourceText, languageVersion, version, isOpen) {
        if (isOpen === void 0) { isOpen = false; }
        var file;
        var scanner;
        var token;
        var parsingContext;
        var commentRanges;
        var identifiers = {};
        var identifierCount = 0;
        var nodeCount = 0;
        var lineStarts;
        var isInStrictMode = false;
        var lookAheadMode = 0 /* NotLookingAhead */;
        var inAmbientContext = false;
        var inFunctionBody = false;
        var inSwitchStatement = 0 /* NotNested */;
        var inIterationStatement = 0 /* NotNested */;
        var labelledStatementInfo = (function () {
            var functionBoundarySentinel;
            var currentLabelSet;
            var labelSetStack;
            var isIterationStack;
            function addLabel(label) {
                if (!currentLabelSet) {
                    currentLabelSet = {};
                }
                currentLabelSet[label.text] = true;
            }
            function pushCurrentLabelSet(isIterationStatement) {
                if (!labelSetStack && !isIterationStack) {
                    labelSetStack = [];
                    isIterationStack = [];
                }
                ts.Debug.assert(currentLabelSet !== undefined);
                labelSetStack.push(currentLabelSet);
                isIterationStack.push(isIterationStatement);
                currentLabelSet = undefined;
            }
            function pushFunctionBoundary() {
                if (!functionBoundarySentinel) {
                    functionBoundarySentinel = {};
                    if (!labelSetStack && !isIterationStack) {
                        labelSetStack = [];
                        isIterationStack = [];
                    }
                }
                ts.Debug.assert(currentLabelSet === undefined);
                labelSetStack.push(functionBoundarySentinel);
                isIterationStack.push(false);
            }
            function pop() {
                ts.Debug.assert(labelSetStack.length && isIterationStack.length && currentLabelSet === undefined);
                labelSetStack.pop();
                isIterationStack.pop();
            }
            function nodeIsNestedInLabel(label, requireIterationStatement, stopAtFunctionBoundary) {
                if (!requireIterationStatement && currentLabelSet && ts.hasProperty(currentLabelSet, label.text)) {
                    return 1 /* Nested */;
                }
                if (!labelSetStack) {
                    return 0 /* NotNested */;
                }
                var crossedFunctionBoundary = false;
                for (var i = labelSetStack.length - 1; i >= 0; i--) {
                    var labelSet = labelSetStack[i];
                    if (labelSet === functionBoundarySentinel) {
                        if (stopAtFunctionBoundary) {
                            break;
                        }
                        else {
                            crossedFunctionBoundary = true;
                            continue;
                        }
                    }
                    if (requireIterationStatement && isIterationStack[i] === false) {
                        continue;
                    }
                    if (ts.hasProperty(labelSet, label.text)) {
                        return crossedFunctionBoundary ? 2 /* CrossingFunctionBoundary */ : 1 /* Nested */;
                    }
                }
                return 0 /* NotNested */;
            }
            return {
                addLabel: addLabel,
                pushCurrentLabelSet: pushCurrentLabelSet,
                pushFunctionBoundary: pushFunctionBoundary,
                pop: pop,
                nodeIsNestedInLabel: nodeIsNestedInLabel
            };
        })();
        function getLineAndCharacterlFromSourcePosition(position) {
            if (!lineStarts) {
                lineStarts = ts.getLineStarts(sourceText);
            }
            return ts.getLineAndCharacterOfPosition(lineStarts, position);
        }
        function getPositionFromSourceLineAndCharacter(line, character) {
            if (!lineStarts) {
                lineStarts = ts.getLineStarts(sourceText);
            }
            return ts.getPositionFromLineAndCharacter(lineStarts, line, character);
        }
        function error(message, arg0, arg1, arg2) {
            var start = scanner.getTokenPos();
            var length = scanner.getTextPos() - start;
            errorAtPos(start, length, message, arg0, arg1, arg2);
        }
        function grammarErrorOnNode(node, message, arg0, arg1, arg2) {
            var span = getErrorSpanForNode(node);
            var start = span.end > span.pos ? ts.skipTrivia(file.text, span.pos) : span.pos;
            var length = span.end - start;
            file.syntacticErrors.push(ts.createFileDiagnostic(file, start, length, message, arg0, arg1, arg2));
        }
        function reportInvalidUseInStrictMode(node) {
            var name = sourceText.substring(ts.skipTrivia(sourceText, node.pos), node.end);
            grammarErrorOnNode(node, ts.Diagnostics.Invalid_use_of_0_in_strict_mode, name);
        }
        function grammarErrorAtPos(start, length, message, arg0, arg1, arg2) {
            file.syntacticErrors.push(ts.createFileDiagnostic(file, start, length, message, arg0, arg1, arg2));
        }
        function errorAtPos(start, length, message, arg0, arg1, arg2) {
            var lastErrorPos = file.syntacticErrors.length ? file.syntacticErrors[file.syntacticErrors.length - 1].start : -1;
            if (start !== lastErrorPos) {
                file.syntacticErrors.push(ts.createFileDiagnostic(file, start, length, message, arg0, arg1, arg2));
            }
            if (lookAheadMode === 1 /* NoErrorYet */) {
                lookAheadMode = 2 /* Error */;
            }
        }
        function scanError(message) {
            var pos = scanner.getTextPos();
            errorAtPos(pos, 0, message);
        }
        function onComment(pos, end) {
            if (commentRanges)
                commentRanges.push({ pos: pos, end: end });
        }
        function getNodePos() {
            return scanner.getStartPos();
        }
        function getNodeEnd() {
            return scanner.getStartPos();
        }
        function nextToken() {
            return token = scanner.scan();
        }
        function getTokenPos(pos) {
            return ts.skipTrivia(sourceText, pos);
        }
        function reScanGreaterToken() {
            return token = scanner.reScanGreaterToken();
        }
        function reScanSlashToken() {
            return token = scanner.reScanSlashToken();
        }
        function reScanTemplateToken() {
            return token = scanner.reScanTemplateToken();
        }
        function lookAheadHelper(callback, alwaysResetState) {
            var saveToken = token;
            var saveSyntacticErrorsLength = file.syntacticErrors.length;
            var saveLookAheadMode = lookAheadMode;
            lookAheadMode = 1 /* NoErrorYet */;
            var result = callback();
            ts.Debug.assert(lookAheadMode === 2 /* Error */ || lookAheadMode === 1 /* NoErrorYet */);
            if (lookAheadMode === 2 /* Error */) {
                result = undefined;
            }
            lookAheadMode = saveLookAheadMode;
            if (!result || alwaysResetState) {
                token = saveToken;
                file.syntacticErrors.length = saveSyntacticErrorsLength;
            }
            return result;
        }
        function lookAhead(callback) {
            var result;
            scanner.tryScan(function () {
                result = lookAheadHelper(callback, true);
                return false;
            });
            return result;
        }
        function tryParse(callback) {
            return scanner.tryScan(function () { return lookAheadHelper(callback, false); });
        }
        function isIdentifier() {
            return token === 63 /* Identifier */ || (isInStrictMode ? token > 108 /* LastFutureReservedWord */ : token > 99 /* LastReservedWord */);
        }
        function parseExpected(t) {
            if (token === t) {
                nextToken();
                return true;
            }
            error(ts.Diagnostics._0_expected, ts.tokenToString(t));
            return false;
        }
        function parseOptional(t) {
            if (token === t) {
                nextToken();
                return true;
            }
            return false;
        }
        function canParseSemicolon() {
            if (token === 21 /* SemicolonToken */) {
                return true;
            }
            return token === 14 /* CloseBraceToken */ || token === 1 /* EndOfFileToken */ || scanner.hasPrecedingLineBreak();
        }
        function parseSemicolon() {
            if (canParseSemicolon()) {
                if (token === 21 /* SemicolonToken */) {
                    nextToken();
                }
            }
            else {
                error(ts.Diagnostics._0_expected, ";");
            }
        }
        function createNode(kind, pos) {
            nodeCount++;
            var node = new (nodeConstructors[kind] || (nodeConstructors[kind] = ts.objectAllocator.getNodeConstructor(kind)))();
            if (!(pos >= 0))
                pos = scanner.getStartPos();
            node.pos = pos;
            node.end = pos;
            return node;
        }
        function finishNode(node) {
            node.end = scanner.getStartPos();
            return node;
        }
        function createMissingNode() {
            return createNode(120 /* Missing */);
        }
        function internIdentifier(text) {
            return ts.hasProperty(identifiers, text) ? identifiers[text] : (identifiers[text] = text);
        }
        function createIdentifier(isIdentifier) {
            identifierCount++;
            if (isIdentifier) {
                var node = createNode(63 /* Identifier */);
                var text = escapeIdentifier(scanner.getTokenValue());
                node.text = internIdentifier(text);
                nextToken();
                return finishNode(node);
            }
            error(ts.Diagnostics.Identifier_expected);
            var node = createMissingNode();
            node.text = "";
            return node;
        }
        function parseIdentifier() {
            return createIdentifier(isIdentifier());
        }
        function parseIdentifierName() {
            return createIdentifier(token >= 63 /* Identifier */);
        }
        function isPropertyName() {
            return token >= 63 /* Identifier */ || token === 7 /* StringLiteral */ || token === 6 /* NumericLiteral */;
        }
        function parsePropertyName() {
            if (token === 7 /* StringLiteral */ || token === 6 /* NumericLiteral */) {
                return parseLiteralNode(true);
            }
            return parseIdentifierName();
        }
        function parseContextualModifier(t) {
            return token === t && tryParse(function () {
                nextToken();
                return token === 17 /* OpenBracketToken */ || isPropertyName();
            });
        }
        function parseAnyContextualModifier() {
            return isModifier(token) && tryParse(function () {
                nextToken();
                return token === 17 /* OpenBracketToken */ || isPropertyName();
            });
        }
        function isListElement(kind, inErrorRecovery) {
            switch (kind) {
                case 0 /* SourceElements */:
                case 1 /* ModuleElements */:
                    return isSourceElement(inErrorRecovery);
                case 2 /* BlockStatements */:
                case 4 /* SwitchClauseStatements */:
                    return isStatement(inErrorRecovery);
                case 3 /* SwitchClauses */:
                    return token === 65 /* CaseKeyword */ || token === 71 /* DefaultKeyword */;
                case 5 /* TypeMembers */:
                    return isStartOfTypeMember();
                case 6 /* ClassMembers */:
                    return lookAhead(isClassMemberStart);
                case 7 /* EnumMembers */:
                case 11 /* ObjectLiteralMembers */:
                    return isPropertyName();
                case 8 /* BaseTypeReferences */:
                    return isIdentifier() && ((token !== 77 /* ExtendsKeyword */ && token !== 100 /* ImplementsKeyword */) || !lookAhead(function () { return (nextToken(), isIdentifier()); }));
                case 9 /* VariableDeclarations */:
                case 14 /* TypeParameters */:
                    return isIdentifier();
                case 10 /* ArgumentExpressions */:
                    return token === 22 /* CommaToken */ || isStartOfExpression();
                case 12 /* ArrayLiteralMembers */:
                    return token === 22 /* CommaToken */ || isStartOfExpression();
                case 13 /* Parameters */:
                    return isStartOfParameter();
                case 15 /* TypeArguments */:
                case 16 /* TupleElementTypes */:
                    return token === 22 /* CommaToken */ || isStartOfType();
            }
            ts.Debug.fail("Non-exhaustive case in 'isListElement'.");
        }
        function isListTerminator(kind) {
            if (token === 1 /* EndOfFileToken */) {
                return true;
            }
            switch (kind) {
                case 1 /* ModuleElements */:
                case 2 /* BlockStatements */:
                case 3 /* SwitchClauses */:
                case 5 /* TypeMembers */:
                case 6 /* ClassMembers */:
                case 7 /* EnumMembers */:
                case 11 /* ObjectLiteralMembers */:
                    return token === 14 /* CloseBraceToken */;
                case 4 /* SwitchClauseStatements */:
                    return token === 14 /* CloseBraceToken */ || token === 65 /* CaseKeyword */ || token === 71 /* DefaultKeyword */;
                case 8 /* BaseTypeReferences */:
                    return token === 13 /* OpenBraceToken */ || token === 77 /* ExtendsKeyword */ || token === 100 /* ImplementsKeyword */;
                case 9 /* VariableDeclarations */:
                    return isVariableDeclaratorListTerminator();
                case 14 /* TypeParameters */:
                    return token === 24 /* GreaterThanToken */ || token === 15 /* OpenParenToken */ || token === 13 /* OpenBraceToken */ || token === 77 /* ExtendsKeyword */ || token === 100 /* ImplementsKeyword */;
                case 10 /* ArgumentExpressions */:
                    return token === 16 /* CloseParenToken */ || token === 21 /* SemicolonToken */;
                case 12 /* ArrayLiteralMembers */:
                case 16 /* TupleElementTypes */:
                    return token === 18 /* CloseBracketToken */;
                case 13 /* Parameters */:
                    return token === 16 /* CloseParenToken */ || token === 18 /* CloseBracketToken */ || token === 13 /* OpenBraceToken */;
                case 15 /* TypeArguments */:
                    return token === 24 /* GreaterThanToken */ || token === 15 /* OpenParenToken */;
            }
        }
        function isVariableDeclaratorListTerminator() {
            if (canParseSemicolon()) {
                return true;
            }
            if (token === 84 /* InKeyword */) {
                return true;
            }
            if (token === 31 /* EqualsGreaterThanToken */) {
                return true;
            }
            return false;
        }
        function isInSomeParsingContext() {
            for (var kind = 0; kind < 17 /* Count */; kind++) {
                if (parsingContext & (1 << kind)) {
                    if (isListElement(kind, true) || isListTerminator(kind)) {
                        return true;
                    }
                }
            }
            return false;
        }
        function parseList(kind, checkForStrictMode, parseElement) {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var result = [];
            result.pos = getNodePos();
            var saveIsInStrictMode = isInStrictMode;
            while (!isListTerminator(kind)) {
                if (isListElement(kind, false)) {
                    var element = parseElement();
                    result.push(element);
                    if (!isInStrictMode && checkForStrictMode) {
                        if (isPrologueDirective(element)) {
                            if (isUseStrictPrologueDirective(element)) {
                                isInStrictMode = true;
                                checkForStrictMode = false;
                            }
                        }
                        else {
                            checkForStrictMode = false;
                        }
                    }
                }
                else {
                    error(parsingContextErrors(kind));
                    if (isInSomeParsingContext()) {
                        break;
                    }
                    nextToken();
                }
            }
            isInStrictMode = saveIsInStrictMode;
            result.end = getNodeEnd();
            parsingContext = saveParsingContext;
            return result;
        }
        function parseDelimitedList(kind, parseElement, allowTrailingComma) {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var result = [];
            result.pos = getNodePos();
            var errorCountBeforeParsingList = file.syntacticErrors.length;
            var commaStart = -1;
            while (true) {
                if (isListElement(kind, false)) {
                    result.push(parseElement());
                    commaStart = scanner.getTokenPos();
                    if (parseOptional(22 /* CommaToken */)) {
                        continue;
                    }
                    commaStart = -1;
                    if (isListTerminator(kind)) {
                        break;
                    }
                    error(ts.Diagnostics._0_expected, ",");
                }
                else if (isListTerminator(kind)) {
                    break;
                }
                else {
                    error(parsingContextErrors(kind));
                    if (isInSomeParsingContext()) {
                        break;
                    }
                    nextToken();
                }
            }
            if (commaStart >= 0) {
                if (!allowTrailingComma) {
                    if (file.syntacticErrors.length === errorCountBeforeParsingList) {
                        grammarErrorAtPos(commaStart, scanner.getStartPos() - commaStart, ts.Diagnostics.Trailing_comma_not_allowed);
                    }
                }
                result.hasTrailingComma = true;
            }
            result.end = getNodeEnd();
            parsingContext = saveParsingContext;
            return result;
        }
        function createMissingList() {
            var pos = getNodePos();
            var result = [];
            result.pos = pos;
            result.end = pos;
            return result;
        }
        function createNodeArray(node) {
            var result = [node];
            result.pos = node.pos;
            result.end = node.end;
            return result;
        }
        function parseBracketedList(kind, parseElement, startToken, endToken) {
            if (parseExpected(startToken)) {
                var result = parseDelimitedList(kind, parseElement, false);
                parseExpected(endToken);
                return result;
            }
            return createMissingList();
        }
        function parseEntityName(allowReservedWords) {
            var entity = parseIdentifier();
            while (parseOptional(19 /* DotToken */)) {
                var node = createNode(121 /* QualifiedName */, entity.pos);
                node.left = entity;
                node.right = allowReservedWords ? parseIdentifierName() : parseIdentifier();
                entity = finishNode(node);
            }
            return entity;
        }
        function parseTokenNode() {
            var node = createNode(token);
            nextToken();
            return finishNode(node);
        }
        function parseTemplateExpression() {
            var template = createNode(155 /* TemplateExpression */);
            template.head = parseLiteralNode();
            ts.Debug.assert(template.head.kind === 10 /* TemplateHead */, "Template head has wrong token kind");
            var templateSpans = [];
            templateSpans.pos = getNodePos();
            do {
                templateSpans.push(parseTemplateSpan());
            } while (templateSpans[templateSpans.length - 1].literal.kind === 11 /* TemplateMiddle */);
            templateSpans.end = getNodeEnd();
            template.templateSpans = templateSpans;
            return finishNode(template);
        }
        function parseTemplateSpan() {
            var span = createNode(156 /* TemplateSpan */);
            span.expression = parseExpression(false);
            var literal;
            if (token === 14 /* CloseBraceToken */) {
                reScanTemplateToken();
                literal = parseLiteralNode();
            }
            else {
                error(ts.Diagnostics.Invalid_template_literal_expected);
                literal = createMissingNode();
                literal.text = "";
            }
            span.literal = literal;
            return finishNode(span);
        }
        function parseLiteralNode(internName) {
            var node = createNode(token);
            var text = scanner.getTokenValue();
            node.text = internName ? internIdentifier(text) : text;
            var tokenPos = scanner.getTokenPos();
            nextToken();
            finishNode(node);
            if (node.kind === 6 /* NumericLiteral */ && sourceText.charCodeAt(tokenPos) === 48 /* _0 */ && ts.isOctalDigit(sourceText.charCodeAt(tokenPos + 1))) {
                if (isInStrictMode) {
                    grammarErrorOnNode(node, ts.Diagnostics.Octal_literals_are_not_allowed_in_strict_mode);
                }
                else if (languageVersion >= 1 /* ES5 */) {
                    grammarErrorOnNode(node, ts.Diagnostics.Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher);
                }
            }
            return node;
        }
        function parseStringLiteral() {
            if (token === 7 /* StringLiteral */) {
                return parseLiteralNode(true);
            }
            error(ts.Diagnostics.String_literal_expected);
            return createMissingNode();
        }
        function parseTypeReference() {
            var node = createNode(132 /* TypeReference */);
            node.typeName = parseEntityName(false);
            if (!scanner.hasPrecedingLineBreak() && token === 23 /* LessThanToken */) {
                node.typeArguments = parseTypeArguments();
            }
            return finishNode(node);
        }
        function parseTypeQuery() {
            var node = createNode(133 /* TypeQuery */);
            parseExpected(95 /* TypeOfKeyword */);
            node.exprName = parseEntityName(true);
            return finishNode(node);
        }
        function parseTypeParameter() {
            var node = createNode(122 /* TypeParameter */);
            node.name = parseIdentifier();
            if (parseOptional(77 /* ExtendsKeyword */)) {
                if (isStartOfType() || !isStartOfExpression()) {
                    node.constraint = parseType();
                }
                else {
                    var expr = parseUnaryExpression();
                    grammarErrorOnNode(expr, ts.Diagnostics.Type_expected);
                }
            }
            return finishNode(node);
        }
        function parseTypeParameters() {
            if (token === 23 /* LessThanToken */) {
                var pos = getNodePos();
                var result = parseBracketedList(14 /* TypeParameters */, parseTypeParameter, 23 /* LessThanToken */, 24 /* GreaterThanToken */);
                if (!result.length) {
                    var start = getTokenPos(pos);
                    var length = getNodePos() - start;
                    errorAtPos(start, length, ts.Diagnostics.Type_parameter_list_cannot_be_empty);
                }
                return result;
            }
        }
        function parseParameterType() {
            return parseOptional(50 /* ColonToken */) ? token === 7 /* StringLiteral */ ? parseStringLiteral() : parseType() : undefined;
        }
        function isStartOfParameter() {
            return token === 20 /* DotDotDotToken */ || isIdentifier() || isModifier(token);
        }
        function parseParameter(flags) {
            if (flags === void 0) { flags = 0; }
            var node = createNode(123 /* Parameter */);
            node.flags |= parseAndCheckModifiers(3 /* Parameters */);
            if (parseOptional(20 /* DotDotDotToken */)) {
                node.flags |= 8 /* Rest */;
            }
            node.name = parseIdentifier();
            if (node.name.kind === 120 /* Missing */ && node.flags === 0 && isModifier(token)) {
                nextToken();
            }
            if (parseOptional(49 /* QuestionToken */)) {
                node.flags |= 4 /* QuestionMark */;
            }
            node.type = parseParameterType();
            node.initializer = parseInitializer(true);
            return finishNode(node);
        }
        function parseSignature(kind, returnToken, returnTokenRequired) {
            if (kind === 130 /* ConstructSignature */) {
                parseExpected(86 /* NewKeyword */);
            }
            var typeParameters = parseTypeParameters();
            var parameters = parseParameterList(15 /* OpenParenToken */, 16 /* CloseParenToken */);
            checkParameterList(parameters);
            var type;
            if (returnTokenRequired) {
                parseExpected(returnToken);
                type = parseType();
            }
            else if (parseOptional(returnToken)) {
                type = parseType();
            }
            return {
                typeParameters: typeParameters,
                parameters: parameters,
                type: type
            };
        }
        function parseParameterList(startDelimiter, endDelimiter) {
            return parseBracketedList(13 /* Parameters */, parseParameter, startDelimiter, endDelimiter);
        }
        function checkParameterList(parameters) {
            var seenOptionalParameter = false;
            var parameterCount = parameters.length;
            for (var i = 0; i < parameterCount; i++) {
                var parameter = parameters[i];
                if (isInStrictMode && isEvalOrArgumentsIdentifier(parameter.name)) {
                    reportInvalidUseInStrictMode(parameter.name);
                    return;
                }
                else if (parameter.flags & 8 /* Rest */) {
                    if (i !== (parameterCount - 1)) {
                        grammarErrorOnNode(parameter.name, ts.Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                        return;
                    }
                    if (parameter.flags & 4 /* QuestionMark */) {
                        grammarErrorOnNode(parameter.name, ts.Diagnostics.A_rest_parameter_cannot_be_optional);
                        return;
                    }
                    if (parameter.initializer) {
                        grammarErrorOnNode(parameter.name, ts.Diagnostics.A_rest_parameter_cannot_have_an_initializer);
                        return;
                    }
                }
                else if (parameter.flags & 4 /* QuestionMark */ || parameter.initializer) {
                    seenOptionalParameter = true;
                    if (parameter.flags & 4 /* QuestionMark */ && parameter.initializer) {
                        grammarErrorOnNode(parameter.name, ts.Diagnostics.Parameter_cannot_have_question_mark_and_initializer);
                        return;
                    }
                }
                else {
                    if (seenOptionalParameter) {
                        grammarErrorOnNode(parameter.name, ts.Diagnostics.A_required_parameter_cannot_follow_an_optional_parameter);
                        return;
                    }
                }
            }
        }
        function parseSignatureMember(kind, returnToken) {
            var node = createNode(kind);
            var sig = parseSignature(kind, returnToken, false);
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            parseSemicolon();
            return finishNode(node);
        }
        function parseIndexSignatureMember() {
            var node = createNode(131 /* IndexSignature */);
            var errorCountBeforeIndexSignature = file.syntacticErrors.length;
            var indexerStart = scanner.getTokenPos();
            node.parameters = parseParameterList(17 /* OpenBracketToken */, 18 /* CloseBracketToken */);
            var indexerLength = scanner.getStartPos() - indexerStart;
            node.type = parseTypeAnnotation();
            parseSemicolon();
            if (file.syntacticErrors.length === errorCountBeforeIndexSignature) {
                checkIndexSignature(node, indexerStart, indexerLength);
            }
            return finishNode(node);
        }
        function checkIndexSignature(node, indexerStart, indexerLength) {
            var parameter = node.parameters[0];
            if (node.parameters.length !== 1) {
                var arityDiagnostic = ts.Diagnostics.An_index_signature_must_have_exactly_one_parameter;
                if (parameter) {
                    grammarErrorOnNode(parameter.name, arityDiagnostic);
                }
                else {
                    grammarErrorAtPos(indexerStart, indexerLength, arityDiagnostic);
                }
                return;
            }
            else if (parameter.flags & 8 /* Rest */) {
                grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_cannot_have_a_rest_parameter);
                return;
            }
            else if (parameter.flags & 243 /* Modifier */) {
                grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_cannot_have_an_accessibility_modifier);
                return;
            }
            else if (parameter.flags & 4 /* QuestionMark */) {
                grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_cannot_have_a_question_mark);
                return;
            }
            else if (parameter.initializer) {
                grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_cannot_have_an_initializer);
                return;
            }
            else if (!parameter.type) {
                grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_must_have_a_type_annotation);
                return;
            }
            else if (parameter.type.kind !== 118 /* StringKeyword */ && parameter.type.kind !== 116 /* NumberKeyword */) {
                grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_type_must_be_string_or_number);
                return;
            }
            else if (!node.type) {
                grammarErrorAtPos(indexerStart, indexerLength, ts.Diagnostics.An_index_signature_must_have_a_type_annotation);
                return;
            }
        }
        function parsePropertyOrMethod() {
            var node = createNode(0 /* Unknown */);
            node.name = parsePropertyName();
            if (parseOptional(49 /* QuestionToken */)) {
                node.flags |= 4 /* QuestionMark */;
            }
            if (token === 15 /* OpenParenToken */ || token === 23 /* LessThanToken */) {
                node.kind = 125 /* Method */;
                var sig = parseSignature(129 /* CallSignature */, 50 /* ColonToken */, false);
                node.typeParameters = sig.typeParameters;
                node.parameters = sig.parameters;
                node.type = sig.type;
            }
            else {
                node.kind = 124 /* Property */;
                node.type = parseTypeAnnotation();
            }
            parseSemicolon();
            return finishNode(node);
        }
        function isStartOfTypeMember() {
            switch (token) {
                case 15 /* OpenParenToken */:
                case 23 /* LessThanToken */:
                case 17 /* OpenBracketToken */:
                    return true;
                default:
                    return isPropertyName() && lookAhead(function () { return nextToken() === 15 /* OpenParenToken */ || token === 23 /* LessThanToken */ || token === 49 /* QuestionToken */ || token === 50 /* ColonToken */ || canParseSemicolon(); });
            }
        }
        function parseTypeMember() {
            switch (token) {
                case 15 /* OpenParenToken */:
                case 23 /* LessThanToken */:
                    return parseSignatureMember(129 /* CallSignature */, 50 /* ColonToken */);
                case 17 /* OpenBracketToken */:
                    return parseIndexSignatureMember();
                case 86 /* NewKeyword */:
                    if (lookAhead(function () { return nextToken() === 15 /* OpenParenToken */ || token === 23 /* LessThanToken */; })) {
                        return parseSignatureMember(130 /* ConstructSignature */, 50 /* ColonToken */);
                    }
                case 7 /* StringLiteral */:
                case 6 /* NumericLiteral */:
                    return parsePropertyOrMethod();
                default:
                    if (token >= 63 /* Identifier */) {
                        return parsePropertyOrMethod();
                    }
            }
        }
        function parseTypeLiteral() {
            var node = createNode(134 /* TypeLiteral */);
            if (parseExpected(13 /* OpenBraceToken */)) {
                node.members = parseList(5 /* TypeMembers */, false, parseTypeMember);
                parseExpected(14 /* CloseBraceToken */);
            }
            else {
                node.members = createMissingList();
            }
            return finishNode(node);
        }
        function parseTupleType() {
            var node = createNode(136 /* TupleType */);
            var startTokenPos = scanner.getTokenPos();
            var startErrorCount = file.syntacticErrors.length;
            node.elementTypes = parseBracketedList(16 /* TupleElementTypes */, parseType, 17 /* OpenBracketToken */, 18 /* CloseBracketToken */);
            if (!node.elementTypes.length && file.syntacticErrors.length === startErrorCount) {
                grammarErrorAtPos(startTokenPos, scanner.getStartPos() - startTokenPos, ts.Diagnostics.A_tuple_type_element_list_cannot_be_empty);
            }
            return finishNode(node);
        }
        function parseParenType() {
            var node = createNode(138 /* ParenType */);
            parseExpected(15 /* OpenParenToken */);
            node.type = parseType();
            parseExpected(16 /* CloseParenToken */);
            return finishNode(node);
        }
        function parseFunctionType(signatureKind) {
            var node = createNode(134 /* TypeLiteral */);
            var member = createNode(signatureKind);
            var sig = parseSignature(signatureKind, 31 /* EqualsGreaterThanToken */, true);
            member.typeParameters = sig.typeParameters;
            member.parameters = sig.parameters;
            member.type = sig.type;
            finishNode(member);
            node.members = createNodeArray(member);
            return finishNode(node);
        }
        function parseKeywordAndNoDot() {
            var node = parseTokenNode();
            return token === 19 /* DotToken */ ? undefined : node;
        }
        function parseNonArrayType() {
            switch (token) {
                case 109 /* AnyKeyword */:
                case 118 /* StringKeyword */:
                case 116 /* NumberKeyword */:
                case 110 /* BooleanKeyword */:
                case 97 /* VoidKeyword */:
                    var node = tryParse(parseKeywordAndNoDot);
                    return node || parseTypeReference();
                case 95 /* TypeOfKeyword */:
                    return parseTypeQuery();
                case 13 /* OpenBraceToken */:
                    return parseTypeLiteral();
                case 17 /* OpenBracketToken */:
                    return parseTupleType();
                case 15 /* OpenParenToken */:
                    return parseParenType();
                default:
                    if (isIdentifier()) {
                        return parseTypeReference();
                    }
            }
            error(ts.Diagnostics.Type_expected);
            return createMissingNode();
        }
        function isStartOfType() {
            switch (token) {
                case 109 /* AnyKeyword */:
                case 118 /* StringKeyword */:
                case 116 /* NumberKeyword */:
                case 110 /* BooleanKeyword */:
                case 97 /* VoidKeyword */:
                case 95 /* TypeOfKeyword */:
                case 13 /* OpenBraceToken */:
                case 17 /* OpenBracketToken */:
                case 23 /* LessThanToken */:
                case 86 /* NewKeyword */:
                    return true;
                case 15 /* OpenParenToken */:
                    return lookAhead(function () {
                        nextToken();
                        return token === 16 /* CloseParenToken */ || isStartOfParameter() || isStartOfType();
                    });
                default:
                    return isIdentifier();
            }
        }
        function parsePrimaryType() {
            var type = parseNonArrayType();
            while (!scanner.hasPrecedingLineBreak() && parseOptional(17 /* OpenBracketToken */)) {
                parseExpected(18 /* CloseBracketToken */);
                var node = createNode(135 /* ArrayType */, type.pos);
                node.elementType = type;
                type = finishNode(node);
            }
            return type;
        }
        function parseUnionType() {
            var type = parsePrimaryType();
            if (token === 43 /* BarToken */) {
                var types = [type];
                types.pos = type.pos;
                while (parseOptional(43 /* BarToken */)) {
                    types.push(parsePrimaryType());
                }
                types.end = getNodeEnd();
                var node = createNode(137 /* UnionType */, type.pos);
                node.types = types;
                type = finishNode(node);
            }
            return type;
        }
        function isStartOfFunctionType() {
            return token === 23 /* LessThanToken */ || token === 15 /* OpenParenToken */ && lookAhead(function () {
                nextToken();
                if (token === 16 /* CloseParenToken */ || token === 20 /* DotDotDotToken */) {
                    return true;
                }
                if (isIdentifier() || isModifier(token)) {
                    nextToken();
                    if (token === 50 /* ColonToken */ || token === 22 /* CommaToken */ || token === 49 /* QuestionToken */ || token === 51 /* EqualsToken */ || isIdentifier() || isModifier(token)) {
                        return true;
                    }
                    if (token === 16 /* CloseParenToken */) {
                        nextToken();
                        if (token === 31 /* EqualsGreaterThanToken */) {
                            return true;
                        }
                    }
                }
                return false;
            });
        }
        function parseType() {
            if (isStartOfFunctionType()) {
                return parseFunctionType(129 /* CallSignature */);
            }
            if (token === 86 /* NewKeyword */) {
                return parseFunctionType(130 /* ConstructSignature */);
            }
            return parseUnionType();
        }
        function parseTypeAnnotation() {
            return parseOptional(50 /* ColonToken */) ? parseType() : undefined;
        }
        function isStartOfExpression() {
            switch (token) {
                case 91 /* ThisKeyword */:
                case 89 /* SuperKeyword */:
                case 87 /* NullKeyword */:
                case 93 /* TrueKeyword */:
                case 78 /* FalseKeyword */:
                case 6 /* NumericLiteral */:
                case 7 /* StringLiteral */:
                case 9 /* NoSubstitutionTemplateLiteral */:
                case 10 /* TemplateHead */:
                case 15 /* OpenParenToken */:
                case 17 /* OpenBracketToken */:
                case 13 /* OpenBraceToken */:
                case 81 /* FunctionKeyword */:
                case 86 /* NewKeyword */:
                case 35 /* SlashToken */:
                case 55 /* SlashEqualsToken */:
                case 32 /* PlusToken */:
                case 33 /* MinusToken */:
                case 46 /* TildeToken */:
                case 45 /* ExclamationToken */:
                case 72 /* DeleteKeyword */:
                case 95 /* TypeOfKeyword */:
                case 97 /* VoidKeyword */:
                case 37 /* PlusPlusToken */:
                case 38 /* MinusMinusToken */:
                case 23 /* LessThanToken */:
                case 63 /* Identifier */:
                    return true;
                default:
                    return isIdentifier();
            }
        }
        function isStartOfExpressionStatement() {
            return token !== 13 /* OpenBraceToken */ && token !== 81 /* FunctionKeyword */ && isStartOfExpression();
        }
        function parseExpression(noIn) {
            var expr = parseAssignmentExpression(noIn);
            while (parseOptional(22 /* CommaToken */)) {
                expr = makeBinaryExpression(expr, 22 /* CommaToken */, parseAssignmentExpression(noIn));
            }
            return expr;
        }
        function parseInitializer(inParameter, noIn) {
            if (token !== 51 /* EqualsToken */) {
                if (scanner.hasPrecedingLineBreak() || (inParameter && token === 13 /* OpenBraceToken */) || !isStartOfExpression()) {
                    return undefined;
                }
            }
            parseExpected(51 /* EqualsToken */);
            return parseAssignmentExpression(noIn);
        }
        function parseAssignmentExpression(noIn) {
            var arrowExpression = tryParseParenthesizedArrowFunctionExpression();
            if (arrowExpression) {
                return arrowExpression;
            }
            var expr = parseConditionalExpression(noIn);
            if (expr.kind === 63 /* Identifier */ && token === 31 /* EqualsGreaterThanToken */) {
                return parseSimpleArrowFunctionExpression(expr);
            }
            if (isLeftHandSideExpression(expr) && isAssignmentOperator()) {
                if (isInStrictMode && isEvalOrArgumentsIdentifier(expr)) {
                    reportInvalidUseInStrictMode(expr);
                }
                var operator = token;
                nextToken();
                return makeBinaryExpression(expr, operator, parseAssignmentExpression(noIn));
            }
            return expr;
        }
        function isLeftHandSideExpression(expr) {
            if (expr) {
                switch (expr.kind) {
                    case 142 /* PropertyAccess */:
                    case 143 /* IndexedAccess */:
                    case 145 /* NewExpression */:
                    case 144 /* CallExpression */:
                    case 146 /* TaggedTemplateExpression */:
                    case 139 /* ArrayLiteral */:
                    case 148 /* ParenExpression */:
                    case 140 /* ObjectLiteral */:
                    case 149 /* FunctionExpression */:
                    case 63 /* Identifier */:
                    case 120 /* Missing */:
                    case 8 /* RegularExpressionLiteral */:
                    case 6 /* NumericLiteral */:
                    case 7 /* StringLiteral */:
                    case 9 /* NoSubstitutionTemplateLiteral */:
                    case 155 /* TemplateExpression */:
                    case 78 /* FalseKeyword */:
                    case 87 /* NullKeyword */:
                    case 91 /* ThisKeyword */:
                    case 93 /* TrueKeyword */:
                    case 89 /* SuperKeyword */:
                        return true;
                }
            }
            return false;
        }
        function parseSimpleArrowFunctionExpression(identifier) {
            ts.Debug.assert(token === 31 /* EqualsGreaterThanToken */, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");
            parseExpected(31 /* EqualsGreaterThanToken */);
            var parameter = createNode(123 /* Parameter */, identifier.pos);
            parameter.name = identifier;
            finishNode(parameter);
            var parameters = [];
            parameters.push(parameter);
            parameters.pos = parameter.pos;
            parameters.end = parameter.end;
            var signature = { parameters: parameters };
            return parseArrowExpressionTail(identifier.pos, signature, false);
        }
        function tryParseParenthesizedArrowFunctionExpression() {
            var triState = isParenthesizedArrowFunctionExpression();
            if (triState === 0 /* False */) {
                return undefined;
            }
            var pos = getNodePos();
            if (triState === 1 /* True */) {
                var sig = parseSignature(129 /* CallSignature */, 50 /* ColonToken */, false);
                if (parseExpected(31 /* EqualsGreaterThanToken */) || token === 13 /* OpenBraceToken */) {
                    return parseArrowExpressionTail(pos, sig, false);
                }
                else {
                    return makeFunctionExpression(150 /* ArrowFunction */, pos, undefined, sig, createMissingNode());
                }
            }
            var sig = tryParseSignatureIfArrowOrBraceFollows();
            if (sig) {
                parseExpected(31 /* EqualsGreaterThanToken */);
                return parseArrowExpressionTail(pos, sig, false);
            }
            else {
                return undefined;
            }
        }
        function isParenthesizedArrowFunctionExpression() {
            if (token === 15 /* OpenParenToken */ || token === 23 /* LessThanToken */) {
                return lookAhead(function () {
                    var first = token;
                    var second = nextToken();
                    if (first === 15 /* OpenParenToken */) {
                        if (second === 16 /* CloseParenToken */) {
                            var third = nextToken();
                            switch (third) {
                                case 31 /* EqualsGreaterThanToken */:
                                case 50 /* ColonToken */:
                                case 13 /* OpenBraceToken */:
                                    return 1 /* True */;
                                default:
                                    return 0 /* False */;
                            }
                        }
                        if (second === 20 /* DotDotDotToken */) {
                            return 1 /* True */;
                        }
                        if (!isIdentifier()) {
                            return 0 /* False */;
                        }
                        if (nextToken() === 50 /* ColonToken */) {
                            return 1 /* True */;
                        }
                        return 2 /* Unknown */;
                    }
                    else {
                        ts.Debug.assert(first === 23 /* LessThanToken */);
                        if (!isIdentifier()) {
                            return 0 /* False */;
                        }
                        return 2 /* Unknown */;
                    }
                });
            }
            if (token === 31 /* EqualsGreaterThanToken */) {
                return 1 /* True */;
            }
            return 0 /* False */;
        }
        function tryParseSignatureIfArrowOrBraceFollows() {
            return tryParse(function () {
                var sig = parseSignature(129 /* CallSignature */, 50 /* ColonToken */, false);
                if (token === 31 /* EqualsGreaterThanToken */ || token === 13 /* OpenBraceToken */) {
                    return sig;
                }
                return undefined;
            });
        }
        function parseArrowExpressionTail(pos, sig, noIn) {
            var body;
            if (token === 13 /* OpenBraceToken */) {
                body = parseBody(false);
            }
            else if (isStatement(true) && !isStartOfExpressionStatement() && token !== 81 /* FunctionKeyword */) {
                body = parseBody(true);
            }
            else {
                body = parseAssignmentExpression(noIn);
            }
            return makeFunctionExpression(150 /* ArrowFunction */, pos, undefined, sig, body);
        }
        function isAssignmentOperator() {
            return token >= 51 /* FirstAssignment */ && token <= 62 /* LastAssignment */;
        }
        function parseConditionalExpression(noIn) {
            var expr = parseBinaryExpression(noIn);
            while (parseOptional(49 /* QuestionToken */)) {
                var node = createNode(154 /* ConditionalExpression */, expr.pos);
                node.condition = expr;
                node.whenTrue = parseAssignmentExpression(false);
                parseExpected(50 /* ColonToken */);
                node.whenFalse = parseAssignmentExpression(noIn);
                expr = finishNode(node);
            }
            return expr;
        }
        function parseBinaryExpression(noIn) {
            return parseBinaryOperators(parseUnaryExpression(), 0, noIn);
        }
        function parseBinaryOperators(expr, minPrecedence, noIn) {
            while (true) {
                reScanGreaterToken();
                var precedence = getOperatorPrecedence();
                if (precedence && precedence > minPrecedence && (!noIn || token !== 84 /* InKeyword */)) {
                    var operator = token;
                    nextToken();
                    expr = makeBinaryExpression(expr, operator, parseBinaryOperators(parseUnaryExpression(), precedence, noIn));
                    continue;
                }
                return expr;
            }
        }
        function getOperatorPrecedence() {
            switch (token) {
                case 48 /* BarBarToken */:
                    return 1;
                case 47 /* AmpersandAmpersandToken */:
                    return 2;
                case 43 /* BarToken */:
                    return 3;
                case 44 /* CaretToken */:
                    return 4;
                case 42 /* AmpersandToken */:
                    return 5;
                case 27 /* EqualsEqualsToken */:
                case 28 /* ExclamationEqualsToken */:
                case 29 /* EqualsEqualsEqualsToken */:
                case 30 /* ExclamationEqualsEqualsToken */:
                    return 6;
                case 23 /* LessThanToken */:
                case 24 /* GreaterThanToken */:
                case 25 /* LessThanEqualsToken */:
                case 26 /* GreaterThanEqualsToken */:
                case 85 /* InstanceOfKeyword */:
                case 84 /* InKeyword */:
                    return 7;
                case 39 /* LessThanLessThanToken */:
                case 40 /* GreaterThanGreaterThanToken */:
                case 41 /* GreaterThanGreaterThanGreaterThanToken */:
                    return 8;
                case 32 /* PlusToken */:
                case 33 /* MinusToken */:
                    return 9;
                case 34 /* AsteriskToken */:
                case 35 /* SlashToken */:
                case 36 /* PercentToken */:
                    return 10;
            }
            return undefined;
        }
        function makeBinaryExpression(left, operator, right) {
            var node = createNode(153 /* BinaryExpression */, left.pos);
            node.left = left;
            node.operator = operator;
            node.right = right;
            return finishNode(node);
        }
        function parseUnaryExpression() {
            var pos = getNodePos();
            switch (token) {
                case 32 /* PlusToken */:
                case 33 /* MinusToken */:
                case 46 /* TildeToken */:
                case 45 /* ExclamationToken */:
                case 72 /* DeleteKeyword */:
                case 95 /* TypeOfKeyword */:
                case 97 /* VoidKeyword */:
                case 37 /* PlusPlusToken */:
                case 38 /* MinusMinusToken */:
                    var operator = token;
                    nextToken();
                    var operand = parseUnaryExpression();
                    if (isInStrictMode) {
                        if ((operator === 37 /* PlusPlusToken */ || operator === 38 /* MinusMinusToken */) && isEvalOrArgumentsIdentifier(operand)) {
                            reportInvalidUseInStrictMode(operand);
                        }
                        else if (operator === 72 /* DeleteKeyword */ && operand.kind === 63 /* Identifier */) {
                            grammarErrorOnNode(operand, ts.Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode);
                        }
                    }
                    return makeUnaryExpression(151 /* PrefixOperator */, pos, operator, operand);
                case 23 /* LessThanToken */:
                    return parseTypeAssertion();
            }
            var primaryExpression = parsePrimaryExpression();
            var illegalUsageOfSuperKeyword = primaryExpression.kind === 89 /* SuperKeyword */ && token !== 15 /* OpenParenToken */ && token !== 19 /* DotToken */;
            if (illegalUsageOfSuperKeyword) {
                error(ts.Diagnostics.super_must_be_followed_by_an_argument_list_or_member_access);
            }
            var expr = parseCallAndAccess(primaryExpression, false);
            ts.Debug.assert(isLeftHandSideExpression(expr));
            if ((token === 37 /* PlusPlusToken */ || token === 38 /* MinusMinusToken */) && !scanner.hasPrecedingLineBreak()) {
                if (isInStrictMode && isEvalOrArgumentsIdentifier(expr)) {
                    reportInvalidUseInStrictMode(expr);
                }
                var operator = token;
                nextToken();
                expr = makeUnaryExpression(152 /* PostfixOperator */, expr.pos, operator, expr);
            }
            return expr;
        }
        function parseTypeAssertion() {
            var node = createNode(147 /* TypeAssertion */);
            parseExpected(23 /* LessThanToken */);
            node.type = parseType();
            parseExpected(24 /* GreaterThanToken */);
            node.operand = parseUnaryExpression();
            return finishNode(node);
        }
        function makeUnaryExpression(kind, pos, operator, operand) {
            var node = createNode(kind, pos);
            node.operator = operator;
            node.operand = operand;
            return finishNode(node);
        }
        function parseCallAndAccess(expr, inNewExpression) {
            while (true) {
                var dotOrBracketStart = scanner.getTokenPos();
                if (parseOptional(19 /* DotToken */)) {
                    var propertyAccess = createNode(142 /* PropertyAccess */, expr.pos);
                    if (scanner.hasPrecedingLineBreak() && scanner.isReservedWord() && lookAhead(function () { return scanner.isReservedWord(); })) {
                        grammarErrorAtPos(dotOrBracketStart, scanner.getStartPos() - dotOrBracketStart, ts.Diagnostics.Identifier_expected);
                        var id = createMissingNode();
                    }
                    else {
                        var id = parseIdentifierName();
                    }
                    propertyAccess.left = expr;
                    propertyAccess.right = id;
                    expr = finishNode(propertyAccess);
                    continue;
                }
                if (parseOptional(17 /* OpenBracketToken */)) {
                    var indexedAccess = createNode(143 /* IndexedAccess */, expr.pos);
                    indexedAccess.object = expr;
                    if (inNewExpression && parseOptional(18 /* CloseBracketToken */)) {
                        indexedAccess.index = createMissingNode();
                        grammarErrorAtPos(dotOrBracketStart, scanner.getStartPos() - dotOrBracketStart, ts.Diagnostics.new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead);
                    }
                    else {
                        indexedAccess.index = parseExpression();
                        if (indexedAccess.index.kind === 7 /* StringLiteral */ || indexedAccess.index.kind === 6 /* NumericLiteral */) {
                            var literal = indexedAccess.index;
                            literal.text = internIdentifier(literal.text);
                        }
                        parseExpected(18 /* CloseBracketToken */);
                    }
                    expr = finishNode(indexedAccess);
                    continue;
                }
                if ((token === 15 /* OpenParenToken */ || token === 23 /* LessThanToken */) && !inNewExpression) {
                    var callExpr = createNode(144 /* CallExpression */, expr.pos);
                    callExpr.func = expr;
                    if (token === 23 /* LessThanToken */) {
                        if (!(callExpr.typeArguments = tryParse(parseTypeArgumentsAndOpenParen)))
                            return expr;
                    }
                    else {
                        parseExpected(15 /* OpenParenToken */);
                    }
                    callExpr.arguments = parseDelimitedList(10 /* ArgumentExpressions */, parseArgumentExpression, false);
                    parseExpected(16 /* CloseParenToken */);
                    expr = finishNode(callExpr);
                    continue;
                }
                if (token === 9 /* NoSubstitutionTemplateLiteral */ || token === 10 /* TemplateHead */) {
                    var tagExpression = createNode(146 /* TaggedTemplateExpression */, expr.pos);
                    tagExpression.tag = expr;
                    tagExpression.template = token === 9 /* NoSubstitutionTemplateLiteral */ ? parseLiteralNode() : parseTemplateExpression();
                    expr = finishNode(tagExpression);
                    if (languageVersion < 2 /* ES6 */) {
                        grammarErrorOnNode(expr, ts.Diagnostics.Tagged_templates_are_only_available_when_targeting_ECMAScript_6_and_higher);
                    }
                    continue;
                }
                return expr;
            }
        }
        function parseTypeArgumentsAndOpenParen() {
            var result = parseTypeArguments();
            parseExpected(15 /* OpenParenToken */);
            return result;
        }
        function parseTypeArguments() {
            var typeArgumentListStart = scanner.getTokenPos();
            var errorCountBeforeTypeParameterList = file.syntacticErrors.length;
            var result = parseBracketedList(15 /* TypeArguments */, parseSingleTypeArgument, 23 /* LessThanToken */, 24 /* GreaterThanToken */);
            if (!result.length && file.syntacticErrors.length === errorCountBeforeTypeParameterList) {
                grammarErrorAtPos(typeArgumentListStart, scanner.getStartPos() - typeArgumentListStart, ts.Diagnostics.Type_argument_list_cannot_be_empty);
            }
            return result;
        }
        function parseSingleTypeArgument() {
            if (token === 22 /* CommaToken */) {
                var errorStart = scanner.getTokenPos();
                var errorLength = scanner.getTextPos() - errorStart;
                grammarErrorAtPos(errorStart, errorLength, ts.Diagnostics.Type_expected);
                return createNode(120 /* Missing */);
            }
            return parseType();
        }
        function parsePrimaryExpression() {
            switch (token) {
                case 91 /* ThisKeyword */:
                case 89 /* SuperKeyword */:
                case 87 /* NullKeyword */:
                case 93 /* TrueKeyword */:
                case 78 /* FalseKeyword */:
                    return parseTokenNode();
                case 6 /* NumericLiteral */:
                case 7 /* StringLiteral */:
                case 9 /* NoSubstitutionTemplateLiteral */:
                    return parseLiteralNode();
                case 15 /* OpenParenToken */:
                    return parseParenExpression();
                case 17 /* OpenBracketToken */:
                    return parseArrayLiteral();
                case 13 /* OpenBraceToken */:
                    return parseObjectLiteral();
                case 81 /* FunctionKeyword */:
                    return parseFunctionExpression();
                case 86 /* NewKeyword */:
                    return parseNewExpression();
                case 35 /* SlashToken */:
                case 55 /* SlashEqualsToken */:
                    if (reScanSlashToken() === 8 /* RegularExpressionLiteral */) {
                        return parseLiteralNode();
                    }
                    break;
                case 10 /* TemplateHead */:
                    return parseTemplateExpression();
                default:
                    if (isIdentifier()) {
                        return parseIdentifier();
                    }
            }
            error(ts.Diagnostics.Expression_expected);
            return createMissingNode();
        }
        function parseParenExpression() {
            var node = createNode(148 /* ParenExpression */);
            parseExpected(15 /* OpenParenToken */);
            node.expression = parseExpression();
            parseExpected(16 /* CloseParenToken */);
            return finishNode(node);
        }
        function parseAssignmentExpressionOrOmittedExpression(omittedExpressionDiagnostic) {
            if (token === 22 /* CommaToken */) {
                if (omittedExpressionDiagnostic) {
                    var errorStart = scanner.getTokenPos();
                    var errorLength = scanner.getTextPos() - errorStart;
                    grammarErrorAtPos(errorStart, errorLength, omittedExpressionDiagnostic);
                }
                return createNode(157 /* OmittedExpression */);
            }
            return parseAssignmentExpression();
        }
        function parseArrayLiteralElement() {
            return parseAssignmentExpressionOrOmittedExpression(undefined);
        }
        function parseArgumentExpression() {
            return parseAssignmentExpressionOrOmittedExpression(ts.Diagnostics.Argument_expression_expected);
        }
        function parseArrayLiteral() {
            var node = createNode(139 /* ArrayLiteral */);
            parseExpected(17 /* OpenBracketToken */);
            if (scanner.hasPrecedingLineBreak())
                node.flags |= 256 /* MultiLine */;
            node.elements = parseDelimitedList(12 /* ArrayLiteralMembers */, parseArrayLiteralElement, true);
            parseExpected(18 /* CloseBracketToken */);
            return finishNode(node);
        }
        function parsePropertyAssignment() {
            var node = createNode(141 /* PropertyAssignment */);
            node.name = parsePropertyName();
            if (token === 15 /* OpenParenToken */ || token === 23 /* LessThanToken */) {
                var sig = parseSignature(129 /* CallSignature */, 50 /* ColonToken */, false);
                var body = parseBody(false);
                node.initializer = makeFunctionExpression(149 /* FunctionExpression */, node.pos, undefined, sig, body);
            }
            else {
                parseExpected(50 /* ColonToken */);
                node.initializer = parseAssignmentExpression(false);
            }
            return finishNode(node);
        }
        function parseObjectLiteralMember() {
            var initialPos = getNodePos();
            var initialToken = token;
            if (parseContextualModifier(113 /* GetKeyword */) || parseContextualModifier(117 /* SetKeyword */)) {
                var kind = initialToken === 113 /* GetKeyword */ ? 127 /* GetAccessor */ : 128 /* SetAccessor */;
                return parseAndCheckMemberAccessorDeclaration(kind, initialPos, 0);
            }
            return parsePropertyAssignment();
        }
        function parseObjectLiteral() {
            var node = createNode(140 /* ObjectLiteral */);
            parseExpected(13 /* OpenBraceToken */);
            if (scanner.hasPrecedingLineBreak()) {
                node.flags |= 256 /* MultiLine */;
            }
            node.properties = parseDelimitedList(11 /* ObjectLiteralMembers */, parseObjectLiteralMember, true);
            parseExpected(14 /* CloseBraceToken */);
            var seen = {};
            var Property = 1;
            var GetAccessor = 2;
            var SetAccesor = 4;
            var GetOrSetAccessor = GetAccessor | SetAccesor;
            ts.forEach(node.properties, function (p) {
                if (p.kind === 157 /* OmittedExpression */) {
                    return;
                }
                var currentKind;
                if (p.kind === 141 /* PropertyAssignment */) {
                    currentKind = Property;
                }
                else if (p.kind === 127 /* GetAccessor */) {
                    currentKind = GetAccessor;
                }
                else if (p.kind === 128 /* SetAccessor */) {
                    currentKind = SetAccesor;
                }
                else {
                    ts.Debug.fail("Unexpected syntax kind:" + p.kind);
                }
                if (!ts.hasProperty(seen, p.name.text)) {
                    seen[p.name.text] = currentKind;
                }
                else {
                    var existingKind = seen[p.name.text];
                    if (currentKind === Property && existingKind === Property) {
                        if (isInStrictMode) {
                            grammarErrorOnNode(p.name, ts.Diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode);
                        }
                    }
                    else if ((currentKind & GetOrSetAccessor) && (existingKind & GetOrSetAccessor)) {
                        if (existingKind !== GetOrSetAccessor && currentKind !== existingKind) {
                            seen[p.name.text] = currentKind | existingKind;
                        }
                        else {
                            grammarErrorOnNode(p.name, ts.Diagnostics.An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name);
                        }
                    }
                    else {
                        grammarErrorOnNode(p.name, ts.Diagnostics.An_object_literal_cannot_have_property_and_accessor_with_the_same_name);
                    }
                }
            });
            return finishNode(node);
        }
        function parseFunctionExpression() {
            var pos = getNodePos();
            parseExpected(81 /* FunctionKeyword */);
            var name = isIdentifier() ? parseIdentifier() : undefined;
            var sig = parseSignature(129 /* CallSignature */, 50 /* ColonToken */, false);
            var body = parseBody(false);
            if (name && isInStrictMode && isEvalOrArgumentsIdentifier(name)) {
                reportInvalidUseInStrictMode(name);
            }
            return makeFunctionExpression(149 /* FunctionExpression */, pos, name, sig, body);
        }
        function makeFunctionExpression(kind, pos, name, sig, body) {
            var node = createNode(kind, pos);
            node.name = name;
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            node.body = body;
            return finishNode(node);
        }
        function parseNewExpression() {
            var node = createNode(145 /* NewExpression */);
            parseExpected(86 /* NewKeyword */);
            node.func = parseCallAndAccess(parsePrimaryExpression(), true);
            if (parseOptional(15 /* OpenParenToken */) || token === 23 /* LessThanToken */ && (node.typeArguments = tryParse(parseTypeArgumentsAndOpenParen))) {
                node.arguments = parseDelimitedList(10 /* ArgumentExpressions */, parseArgumentExpression, false);
                parseExpected(16 /* CloseParenToken */);
            }
            return finishNode(node);
        }
        function parseStatementAllowingLetDeclaration() {
            return parseStatement(true);
        }
        function parseBlock(ignoreMissingOpenBrace, checkForStrictMode) {
            var node = createNode(158 /* Block */);
            if (parseExpected(13 /* OpenBraceToken */) || ignoreMissingOpenBrace) {
                node.statements = parseList(2 /* BlockStatements */, checkForStrictMode, parseStatementAllowingLetDeclaration);
                parseExpected(14 /* CloseBraceToken */);
            }
            else {
                node.statements = createMissingList();
            }
            return finishNode(node);
        }
        function parseBody(ignoreMissingOpenBrace) {
            var saveInFunctionBody = inFunctionBody;
            var saveInSwitchStatement = inSwitchStatement;
            var saveInIterationStatement = inIterationStatement;
            inFunctionBody = true;
            if (inSwitchStatement === 1 /* Nested */) {
                inSwitchStatement = 2 /* CrossingFunctionBoundary */;
            }
            if (inIterationStatement === 1 /* Nested */) {
                inIterationStatement = 2 /* CrossingFunctionBoundary */;
            }
            labelledStatementInfo.pushFunctionBoundary();
            var block = parseBlock(ignoreMissingOpenBrace, true);
            block.kind = 183 /* FunctionBlock */;
            labelledStatementInfo.pop();
            inFunctionBody = saveInFunctionBody;
            inSwitchStatement = saveInSwitchStatement;
            inIterationStatement = saveInIterationStatement;
            return block;
        }
        function parseEmptyStatement() {
            var node = createNode(160 /* EmptyStatement */);
            parseExpected(21 /* SemicolonToken */);
            return finishNode(node);
        }
        function parseIfStatement() {
            var node = createNode(162 /* IfStatement */);
            parseExpected(82 /* IfKeyword */);
            parseExpected(15 /* OpenParenToken */);
            node.expression = parseExpression();
            parseExpected(16 /* CloseParenToken */);
            node.thenStatement = parseStatement(false);
            node.elseStatement = parseOptional(74 /* ElseKeyword */) ? parseStatement(false) : undefined;
            return finishNode(node);
        }
        function parseDoStatement() {
            var node = createNode(163 /* DoStatement */);
            parseExpected(73 /* DoKeyword */);
            var saveInIterationStatement = inIterationStatement;
            inIterationStatement = 1 /* Nested */;
            node.statement = parseStatement(false);
            inIterationStatement = saveInIterationStatement;
            parseExpected(98 /* WhileKeyword */);
            parseExpected(15 /* OpenParenToken */);
            node.expression = parseExpression();
            parseExpected(16 /* CloseParenToken */);
            parseOptional(21 /* SemicolonToken */);
            return finishNode(node);
        }
        function parseWhileStatement() {
            var node = createNode(164 /* WhileStatement */);
            parseExpected(98 /* WhileKeyword */);
            parseExpected(15 /* OpenParenToken */);
            node.expression = parseExpression();
            parseExpected(16 /* CloseParenToken */);
            var saveInIterationStatement = inIterationStatement;
            inIterationStatement = 1 /* Nested */;
            node.statement = parseStatement(false);
            inIterationStatement = saveInIterationStatement;
            return finishNode(node);
        }
        function parseForOrForInStatement() {
            var pos = getNodePos();
            parseExpected(80 /* ForKeyword */);
            parseExpected(15 /* OpenParenToken */);
            if (token !== 21 /* SemicolonToken */) {
                if (parseOptional(96 /* VarKeyword */)) {
                    var declarations = parseVariableDeclarationList(0, true);
                    if (!declarations.length) {
                        error(ts.Diagnostics.Variable_declaration_list_cannot_be_empty);
                    }
                }
                else if (parseOptional(102 /* LetKeyword */)) {
                    var declarations = parseVariableDeclarationList(2048 /* Let */, true);
                    if (!declarations.length) {
                        error(ts.Diagnostics.Variable_declaration_list_cannot_be_empty);
                    }
                    if (languageVersion < 2 /* ES6 */) {
                        grammarErrorAtPos(declarations.pos, declarations.end - declarations.pos, ts.Diagnostics.let_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                    }
                }
                else if (parseOptional(68 /* ConstKeyword */)) {
                    var declarations = parseVariableDeclarationList(4096 /* Const */, true);
                    if (!declarations.length) {
                        error(ts.Diagnostics.Variable_declaration_list_cannot_be_empty);
                    }
                    if (languageVersion < 2 /* ES6 */) {
                        grammarErrorAtPos(declarations.pos, declarations.end - declarations.pos, ts.Diagnostics.const_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                    }
                }
                else {
                    var varOrInit = parseExpression(true);
                }
            }
            var forOrForInStatement;
            if (parseOptional(84 /* InKeyword */)) {
                var forInStatement = createNode(166 /* ForInStatement */, pos);
                if (declarations) {
                    if (declarations.length > 1) {
                        error(ts.Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement);
                    }
                    forInStatement.declaration = declarations[0];
                }
                else {
                    forInStatement.variable = varOrInit;
                }
                forInStatement.expression = parseExpression();
                parseExpected(16 /* CloseParenToken */);
                forOrForInStatement = forInStatement;
            }
            else {
                var forStatement = createNode(165 /* ForStatement */, pos);
                if (declarations)
                    forStatement.declarations = declarations;
                if (varOrInit)
                    forStatement.initializer = varOrInit;
                parseExpected(21 /* SemicolonToken */);
                if (token !== 21 /* SemicolonToken */ && token !== 16 /* CloseParenToken */) {
                    forStatement.condition = parseExpression();
                }
                parseExpected(21 /* SemicolonToken */);
                if (token !== 16 /* CloseParenToken */) {
                    forStatement.iterator = parseExpression();
                }
                parseExpected(16 /* CloseParenToken */);
                forOrForInStatement = forStatement;
            }
            var saveInIterationStatement = inIterationStatement;
            inIterationStatement = 1 /* Nested */;
            forOrForInStatement.statement = parseStatement(false);
            inIterationStatement = saveInIterationStatement;
            return finishNode(forOrForInStatement);
        }
        function parseBreakOrContinueStatement(kind) {
            var node = createNode(kind);
            var errorCountBeforeStatement = file.syntacticErrors.length;
            parseExpected(kind === 168 /* BreakStatement */ ? 64 /* BreakKeyword */ : 69 /* ContinueKeyword */);
            if (!canParseSemicolon())
                node.label = parseIdentifier();
            parseSemicolon();
            finishNode(node);
            if (!inAmbientContext && errorCountBeforeStatement === file.syntacticErrors.length) {
                if (node.label) {
                    checkBreakOrContinueStatementWithLabel(node);
                }
                else {
                    checkBareBreakOrContinueStatement(node);
                }
            }
            return node;
        }
        function checkBareBreakOrContinueStatement(node) {
            if (node.kind === 168 /* BreakStatement */) {
                if (inIterationStatement === 1 /* Nested */ || inSwitchStatement === 1 /* Nested */) {
                    return;
                }
                else if (inIterationStatement === 0 /* NotNested */ && inSwitchStatement === 0 /* NotNested */) {
                    grammarErrorOnNode(node, ts.Diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement);
                    return;
                }
            }
            else if (node.kind === 167 /* ContinueStatement */) {
                if (inIterationStatement === 1 /* Nested */) {
                    return;
                }
                else if (inIterationStatement === 0 /* NotNested */) {
                    grammarErrorOnNode(node, ts.Diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement);
                    return;
                }
            }
            else {
                ts.Debug.fail("checkAnonymousBreakOrContinueStatement");
            }
            ts.Debug.assert(inIterationStatement === 2 /* CrossingFunctionBoundary */ || inSwitchStatement === 2 /* CrossingFunctionBoundary */);
            grammarErrorOnNode(node, ts.Diagnostics.Jump_target_cannot_cross_function_boundary);
        }
        function checkBreakOrContinueStatementWithLabel(node) {
            var nodeIsNestedInLabel = labelledStatementInfo.nodeIsNestedInLabel(node.label, node.kind === 167 /* ContinueStatement */, false);
            if (nodeIsNestedInLabel === 1 /* Nested */) {
                return;
            }
            if (nodeIsNestedInLabel === 2 /* CrossingFunctionBoundary */) {
                grammarErrorOnNode(node, ts.Diagnostics.Jump_target_cannot_cross_function_boundary);
                return;
            }
            if (node.kind === 167 /* ContinueStatement */) {
                grammarErrorOnNode(node, ts.Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement);
            }
            else if (node.kind === 168 /* BreakStatement */) {
                grammarErrorOnNode(node, ts.Diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement);
            }
            else {
                ts.Debug.fail("checkBreakOrContinueStatementWithLabel");
            }
        }
        function parseReturnStatement() {
            var node = createNode(169 /* ReturnStatement */);
            var errorCountBeforeReturnStatement = file.syntacticErrors.length;
            var returnTokenStart = scanner.getTokenPos();
            var returnTokenLength = scanner.getTextPos() - returnTokenStart;
            parseExpected(88 /* ReturnKeyword */);
            if (!canParseSemicolon())
                node.expression = parseExpression();
            parseSemicolon();
            if (!inFunctionBody && !inAmbientContext && errorCountBeforeReturnStatement === file.syntacticErrors.length) {
                grammarErrorAtPos(returnTokenStart, returnTokenLength, ts.Diagnostics.A_return_statement_can_only_be_used_within_a_function_body);
            }
            return finishNode(node);
        }
        function parseWithStatement() {
            var node = createNode(170 /* WithStatement */);
            var startPos = scanner.getTokenPos();
            parseExpected(99 /* WithKeyword */);
            var endPos = scanner.getStartPos();
            parseExpected(15 /* OpenParenToken */);
            node.expression = parseExpression();
            parseExpected(16 /* CloseParenToken */);
            node.statement = parseStatement(false);
            node = finishNode(node);
            if (isInStrictMode) {
                grammarErrorAtPos(startPos, endPos - startPos, ts.Diagnostics.with_statements_are_not_allowed_in_strict_mode);
            }
            return node;
        }
        function parseCaseClause() {
            var node = createNode(172 /* CaseClause */);
            parseExpected(65 /* CaseKeyword */);
            node.expression = parseExpression();
            parseExpected(50 /* ColonToken */);
            node.statements = parseList(4 /* SwitchClauseStatements */, false, parseStatementAllowingLetDeclaration);
            return finishNode(node);
        }
        function parseDefaultClause() {
            var node = createNode(173 /* DefaultClause */);
            parseExpected(71 /* DefaultKeyword */);
            parseExpected(50 /* ColonToken */);
            node.statements = parseList(4 /* SwitchClauseStatements */, false, parseStatementAllowingLetDeclaration);
            return finishNode(node);
        }
        function parseCaseOrDefaultClause() {
            return token === 65 /* CaseKeyword */ ? parseCaseClause() : parseDefaultClause();
        }
        function parseSwitchStatement() {
            var node = createNode(171 /* SwitchStatement */);
            parseExpected(90 /* SwitchKeyword */);
            parseExpected(15 /* OpenParenToken */);
            node.expression = parseExpression();
            parseExpected(16 /* CloseParenToken */);
            parseExpected(13 /* OpenBraceToken */);
            var saveInSwitchStatement = inSwitchStatement;
            inSwitchStatement = 1 /* Nested */;
            node.clauses = parseList(3 /* SwitchClauses */, false, parseCaseOrDefaultClause);
            inSwitchStatement = saveInSwitchStatement;
            parseExpected(14 /* CloseBraceToken */);
            var defaultClauses = ts.filter(node.clauses, function (clause) { return clause.kind === 173 /* DefaultClause */; });
            for (var i = 1, n = defaultClauses.length; i < n; i++) {
                var clause = defaultClauses[i];
                var start = ts.skipTrivia(file.text, clause.pos);
                var end = clause.statements.length > 0 ? clause.statements[0].pos : clause.end;
                grammarErrorAtPos(start, end - start, ts.Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement);
            }
            return finishNode(node);
        }
        function parseThrowStatement() {
            var node = createNode(175 /* ThrowStatement */);
            parseExpected(92 /* ThrowKeyword */);
            if (scanner.hasPrecedingLineBreak()) {
                error(ts.Diagnostics.Line_break_not_permitted_here);
            }
            node.expression = parseExpression();
            parseSemicolon();
            return finishNode(node);
        }
        function parseTryStatement() {
            var node = createNode(176 /* TryStatement */);
            node.tryBlock = parseTokenAndBlock(94 /* TryKeyword */, 177 /* TryBlock */);
            if (token === 66 /* CatchKeyword */) {
                node.catchBlock = parseCatchBlock();
            }
            if (token === 79 /* FinallyKeyword */) {
                node.finallyBlock = parseTokenAndBlock(79 /* FinallyKeyword */, 179 /* FinallyBlock */);
            }
            if (!(node.catchBlock || node.finallyBlock)) {
                error(ts.Diagnostics.catch_or_finally_expected);
            }
            return finishNode(node);
        }
        function parseTokenAndBlock(token, kind) {
            var pos = getNodePos();
            parseExpected(token);
            var result = parseBlock(false, false);
            result.kind = kind;
            result.pos = pos;
            return result;
        }
        function parseCatchBlock() {
            var pos = getNodePos();
            parseExpected(66 /* CatchKeyword */);
            parseExpected(15 /* OpenParenToken */);
            var variable = parseIdentifier();
            var typeAnnotationColonStart = scanner.getTokenPos();
            var typeAnnotationColonLength = scanner.getTextPos() - typeAnnotationColonStart;
            var typeAnnotation = parseTypeAnnotation();
            parseExpected(16 /* CloseParenToken */);
            var result = parseBlock(false, false);
            result.kind = 178 /* CatchBlock */;
            result.pos = pos;
            result.variable = variable;
            if (typeAnnotation) {
                errorAtPos(typeAnnotationColonStart, typeAnnotationColonLength, ts.Diagnostics.Catch_clause_parameter_cannot_have_a_type_annotation);
            }
            if (isInStrictMode && isEvalOrArgumentsIdentifier(variable)) {
                reportInvalidUseInStrictMode(variable);
            }
            return result;
        }
        function parseDebuggerStatement() {
            var node = createNode(180 /* DebuggerStatement */);
            parseExpected(70 /* DebuggerKeyword */);
            parseSemicolon();
            return finishNode(node);
        }
        function isIterationStatementStart() {
            return token === 98 /* WhileKeyword */ || token === 73 /* DoKeyword */ || token === 80 /* ForKeyword */;
        }
        function parseStatementWithLabelSet(allowLetAndConstDeclarations) {
            labelledStatementInfo.pushCurrentLabelSet(isIterationStatementStart());
            var statement = parseStatement(allowLetAndConstDeclarations);
            labelledStatementInfo.pop();
            return statement;
        }
        function isLabel() {
            return isIdentifier() && lookAhead(function () { return nextToken() === 50 /* ColonToken */; });
        }
        function parseLabeledStatement(allowLetAndConstDeclarations) {
            var node = createNode(174 /* LabeledStatement */);
            node.label = parseIdentifier();
            parseExpected(50 /* ColonToken */);
            if (labelledStatementInfo.nodeIsNestedInLabel(node.label, false, true)) {
                grammarErrorOnNode(node.label, ts.Diagnostics.Duplicate_label_0, getTextOfNodeFromSourceText(sourceText, node.label));
            }
            labelledStatementInfo.addLabel(node.label);
            node.statement = isLabel() ? parseLabeledStatement(allowLetAndConstDeclarations) : parseStatementWithLabelSet(allowLetAndConstDeclarations);
            return finishNode(node);
        }
        function parseExpressionStatement() {
            var node = createNode(161 /* ExpressionStatement */);
            node.expression = parseExpression();
            parseSemicolon();
            return finishNode(node);
        }
        function isStatement(inErrorRecovery) {
            switch (token) {
                case 21 /* SemicolonToken */:
                    return !inErrorRecovery;
                case 13 /* OpenBraceToken */:
                case 96 /* VarKeyword */:
                case 102 /* LetKeyword */:
                case 81 /* FunctionKeyword */:
                case 82 /* IfKeyword */:
                case 73 /* DoKeyword */:
                case 98 /* WhileKeyword */:
                case 80 /* ForKeyword */:
                case 69 /* ContinueKeyword */:
                case 64 /* BreakKeyword */:
                case 88 /* ReturnKeyword */:
                case 99 /* WithKeyword */:
                case 90 /* SwitchKeyword */:
                case 92 /* ThrowKeyword */:
                case 94 /* TryKeyword */:
                case 70 /* DebuggerKeyword */:
                case 66 /* CatchKeyword */:
                case 79 /* FinallyKeyword */:
                    return true;
                case 68 /* ConstKeyword */:
                    var isConstEnum = lookAhead(function () { return nextToken() === 75 /* EnumKeyword */; });
                    return !isConstEnum;
                case 101 /* InterfaceKeyword */:
                case 67 /* ClassKeyword */:
                case 114 /* ModuleKeyword */:
                case 75 /* EnumKeyword */:
                case 119 /* TypeKeyword */:
                    if (isDeclarationStart()) {
                        return false;
                    }
                case 106 /* PublicKeyword */:
                case 104 /* PrivateKeyword */:
                case 105 /* ProtectedKeyword */:
                case 107 /* StaticKeyword */:
                    if (lookAhead(function () { return nextToken() >= 63 /* Identifier */; })) {
                        return false;
                    }
                default:
                    return isStartOfExpression();
            }
        }
        function parseStatement(allowLetAndConstDeclarations) {
            switch (token) {
                case 13 /* OpenBraceToken */:
                    return parseBlock(false, false);
                case 96 /* VarKeyword */:
                case 102 /* LetKeyword */:
                case 68 /* ConstKeyword */:
                    return parseVariableStatement(allowLetAndConstDeclarations);
                case 81 /* FunctionKeyword */:
                    return parseFunctionDeclaration();
                case 21 /* SemicolonToken */:
                    return parseEmptyStatement();
                case 82 /* IfKeyword */:
                    return parseIfStatement();
                case 73 /* DoKeyword */:
                    return parseDoStatement();
                case 98 /* WhileKeyword */:
                    return parseWhileStatement();
                case 80 /* ForKeyword */:
                    return parseForOrForInStatement();
                case 69 /* ContinueKeyword */:
                    return parseBreakOrContinueStatement(167 /* ContinueStatement */);
                case 64 /* BreakKeyword */:
                    return parseBreakOrContinueStatement(168 /* BreakStatement */);
                case 88 /* ReturnKeyword */:
                    return parseReturnStatement();
                case 99 /* WithKeyword */:
                    return parseWithStatement();
                case 90 /* SwitchKeyword */:
                    return parseSwitchStatement();
                case 92 /* ThrowKeyword */:
                    return parseThrowStatement();
                case 94 /* TryKeyword */:
                case 66 /* CatchKeyword */:
                case 79 /* FinallyKeyword */:
                    return parseTryStatement();
                case 70 /* DebuggerKeyword */:
                    return parseDebuggerStatement();
                default:
                    if (isLabel()) {
                        return parseLabeledStatement(allowLetAndConstDeclarations);
                    }
                    return parseExpressionStatement();
            }
        }
        function parseAndCheckFunctionBody(isConstructor) {
            var initialPosition = scanner.getTokenPos();
            var errorCountBeforeBody = file.syntacticErrors.length;
            if (token === 13 /* OpenBraceToken */) {
                var body = parseBody(false);
                if (body && inAmbientContext && file.syntacticErrors.length === errorCountBeforeBody) {
                    var diagnostic = isConstructor ? ts.Diagnostics.A_constructor_implementation_cannot_be_declared_in_an_ambient_context : ts.Diagnostics.A_function_implementation_cannot_be_declared_in_an_ambient_context;
                    grammarErrorAtPos(initialPosition, 1, diagnostic);
                }
                return body;
            }
            if (canParseSemicolon()) {
                parseSemicolon();
                return undefined;
            }
            error(ts.Diagnostics.Block_or_expected);
        }
        function parseVariableDeclaration(flags, noIn) {
            var node = createNode(181 /* VariableDeclaration */);
            node.flags = flags;
            var errorCountBeforeVariableDeclaration = file.syntacticErrors.length;
            node.name = parseIdentifier();
            node.type = parseTypeAnnotation();
            var initializerStart = scanner.getTokenPos();
            var initializerFirstTokenLength = scanner.getTextPos() - initializerStart;
            node.initializer = parseInitializer(false, noIn);
            if (inAmbientContext && node.initializer && errorCountBeforeVariableDeclaration === file.syntacticErrors.length) {
                grammarErrorAtPos(initializerStart, initializerFirstTokenLength, ts.Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
            }
            if (!inAmbientContext && !node.initializer && flags & 4096 /* Const */) {
                grammarErrorOnNode(node, ts.Diagnostics.const_declarations_must_be_initialized);
            }
            if (isInStrictMode && isEvalOrArgumentsIdentifier(node.name)) {
                reportInvalidUseInStrictMode(node.name);
            }
            return finishNode(node);
        }
        function parseVariableDeclarationList(flags, noIn) {
            return parseDelimitedList(9 /* VariableDeclarations */, function () { return parseVariableDeclaration(flags, noIn); }, false);
        }
        function parseVariableStatement(allowLetAndConstDeclarations, pos, flags) {
            var node = createNode(159 /* VariableStatement */, pos);
            if (flags)
                node.flags = flags;
            var errorCountBeforeVarStatement = file.syntacticErrors.length;
            if (token === 102 /* LetKeyword */) {
                node.flags |= 2048 /* Let */;
            }
            else if (token === 68 /* ConstKeyword */) {
                node.flags |= 4096 /* Const */;
            }
            else if (token !== 96 /* VarKeyword */) {
                error(ts.Diagnostics.var_let_or_const_expected);
            }
            nextToken();
            node.declarations = parseVariableDeclarationList(node.flags, false);
            parseSemicolon();
            finishNode(node);
            if (!node.declarations.length && file.syntacticErrors.length === errorCountBeforeVarStatement) {
                grammarErrorOnNode(node, ts.Diagnostics.Variable_declaration_list_cannot_be_empty);
            }
            if (languageVersion < 2 /* ES6 */) {
                if (node.flags & 2048 /* Let */) {
                    grammarErrorOnNode(node, ts.Diagnostics.let_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                }
                else if (node.flags & 4096 /* Const */) {
                    grammarErrorOnNode(node, ts.Diagnostics.const_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                }
            }
            else if (!allowLetAndConstDeclarations) {
                if (node.flags & 2048 /* Let */) {
                    grammarErrorOnNode(node, ts.Diagnostics.let_declarations_can_only_be_declared_inside_a_block);
                }
                else if (node.flags & 4096 /* Const */) {
                    grammarErrorOnNode(node, ts.Diagnostics.const_declarations_can_only_be_declared_inside_a_block);
                }
            }
            return node;
        }
        function parseFunctionDeclaration(pos, flags) {
            var node = createNode(182 /* FunctionDeclaration */, pos);
            if (flags)
                node.flags = flags;
            parseExpected(81 /* FunctionKeyword */);
            node.name = parseIdentifier();
            var sig = parseSignature(129 /* CallSignature */, 50 /* ColonToken */, false);
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            node.body = parseAndCheckFunctionBody(false);
            if (isInStrictMode && isEvalOrArgumentsIdentifier(node.name)) {
                reportInvalidUseInStrictMode(node.name);
            }
            return finishNode(node);
        }
        function parseConstructorDeclaration(pos, flags) {
            var node = createNode(126 /* Constructor */, pos);
            node.flags = flags;
            parseExpected(111 /* ConstructorKeyword */);
            var sig = parseSignature(129 /* CallSignature */, 50 /* ColonToken */, false);
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            node.body = parseAndCheckFunctionBody(true);
            if (node.typeParameters) {
                grammarErrorAtPos(node.typeParameters.pos, node.typeParameters.end - node.typeParameters.pos, ts.Diagnostics.Type_parameters_cannot_appear_on_a_constructor_declaration);
            }
            if (node.type) {
                grammarErrorOnNode(node.type, ts.Diagnostics.Type_annotation_cannot_appear_on_a_constructor_declaration);
            }
            return finishNode(node);
        }
        function parsePropertyMemberDeclaration(pos, flags) {
            var errorCountBeforePropertyDeclaration = file.syntacticErrors.length;
            var name = parsePropertyName();
            var questionStart = scanner.getTokenPos();
            if (parseOptional(49 /* QuestionToken */)) {
                errorAtPos(questionStart, scanner.getStartPos() - questionStart, ts.Diagnostics.A_class_member_cannot_be_declared_optional);
            }
            if (token === 15 /* OpenParenToken */ || token === 23 /* LessThanToken */) {
                var method = createNode(125 /* Method */, pos);
                method.flags = flags;
                method.name = name;
                var sig = parseSignature(129 /* CallSignature */, 50 /* ColonToken */, false);
                method.typeParameters = sig.typeParameters;
                method.parameters = sig.parameters;
                method.type = sig.type;
                method.body = parseAndCheckFunctionBody(false);
                return finishNode(method);
            }
            else {
                var property = createNode(124 /* Property */, pos);
                property.flags = flags;
                property.name = name;
                property.type = parseTypeAnnotation();
                var initializerStart = scanner.getTokenPos();
                var initializerFirstTokenLength = scanner.getTextPos() - initializerStart;
                property.initializer = parseInitializer(false);
                parseSemicolon();
                if (inAmbientContext && property.initializer && errorCountBeforePropertyDeclaration === file.syntacticErrors.length) {
                    grammarErrorAtPos(initializerStart, initializerFirstTokenLength, ts.Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
                }
                return finishNode(property);
            }
        }
        function parseAndCheckMemberAccessorDeclaration(kind, pos, flags) {
            var errorCountBeforeAccessor = file.syntacticErrors.length;
            var accessor = parseMemberAccessorDeclaration(kind, pos, flags);
            if (errorCountBeforeAccessor === file.syntacticErrors.length) {
                if (languageVersion < 1 /* ES5 */) {
                    grammarErrorOnNode(accessor.name, ts.Diagnostics.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher);
                }
                else if (inAmbientContext) {
                    grammarErrorOnNode(accessor.name, ts.Diagnostics.An_accessor_cannot_be_declared_in_an_ambient_context);
                }
                else if (accessor.typeParameters) {
                    grammarErrorOnNode(accessor.name, ts.Diagnostics.An_accessor_cannot_have_type_parameters);
                }
                else if (kind === 127 /* GetAccessor */ && accessor.parameters.length) {
                    grammarErrorOnNode(accessor.name, ts.Diagnostics.A_get_accessor_cannot_have_parameters);
                }
                else if (kind === 128 /* SetAccessor */) {
                    if (accessor.type) {
                        grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_cannot_have_a_return_type_annotation);
                    }
                    else if (accessor.parameters.length !== 1) {
                        grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_must_have_exactly_one_parameter);
                    }
                    else {
                        var parameter = accessor.parameters[0];
                        if (parameter.flags & 8 /* Rest */) {
                            grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_cannot_have_rest_parameter);
                        }
                        else if (parameter.flags & 243 /* Modifier */) {
                            grammarErrorOnNode(accessor.name, ts.Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                        }
                        else if (parameter.flags & 4 /* QuestionMark */) {
                            grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_cannot_have_an_optional_parameter);
                        }
                        else if (parameter.initializer) {
                            grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_parameter_cannot_have_an_initializer);
                        }
                    }
                }
            }
            return accessor;
        }
        function parseMemberAccessorDeclaration(kind, pos, flags) {
            var node = createNode(kind, pos);
            node.flags = flags;
            node.name = parsePropertyName();
            var sig = parseSignature(129 /* CallSignature */, 50 /* ColonToken */, false);
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            if (inAmbientContext && canParseSemicolon()) {
                parseSemicolon();
                node.body = createMissingNode();
            }
            else {
                node.body = parseBody(false);
            }
            return finishNode(node);
        }
        function isClassMemberStart() {
            var idToken;
            while (isModifier(token)) {
                idToken = token;
                nextToken();
            }
            if (isPropertyName()) {
                idToken = token;
                nextToken();
            }
            if (token === 17 /* OpenBracketToken */) {
                return true;
            }
            if (idToken !== undefined) {
                if (!isKeyword(idToken) || idToken === 117 /* SetKeyword */ || idToken === 113 /* GetKeyword */) {
                    return true;
                }
                switch (token) {
                    case 15 /* OpenParenToken */:
                    case 23 /* LessThanToken */:
                    case 50 /* ColonToken */:
                    case 51 /* EqualsToken */:
                    case 49 /* QuestionToken */:
                        return true;
                    default:
                        return canParseSemicolon();
                }
            }
            return false;
        }
        function parseAndCheckModifiers(context) {
            var flags = 0;
            var lastStaticModifierStart;
            var lastStaticModifierLength;
            var lastDeclareModifierStart;
            var lastDeclareModifierLength;
            var lastPrivateModifierStart;
            var lastPrivateModifierLength;
            var lastProtectedModifierStart;
            var lastProtectedModifierLength;
            while (true) {
                var modifierStart = scanner.getTokenPos();
                var modifierToken = token;
                if (!parseAnyContextualModifier())
                    break;
                var modifierLength = scanner.getStartPos() - modifierStart;
                switch (modifierToken) {
                    case 106 /* PublicKeyword */:
                        if (flags & 112 /* AccessibilityModifier */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics.Accessibility_modifier_already_seen);
                        }
                        else if (flags & 128 /* Static */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_must_precede_1_modifier, "public", "static");
                        }
                        else if (context === 1 /* ModuleElements */ || context === 0 /* SourceElements */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_module_element, "public");
                        }
                        flags |= 16 /* Public */;
                        break;
                    case 104 /* PrivateKeyword */:
                        if (flags & 112 /* AccessibilityModifier */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics.Accessibility_modifier_already_seen);
                        }
                        else if (flags & 128 /* Static */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_must_precede_1_modifier, "private", "static");
                        }
                        else if (context === 1 /* ModuleElements */ || context === 0 /* SourceElements */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_module_element, "private");
                        }
                        lastPrivateModifierStart = modifierStart;
                        lastPrivateModifierLength = modifierLength;
                        flags |= 32 /* Private */;
                        break;
                    case 105 /* ProtectedKeyword */:
                        if (flags & 16 /* Public */ || flags & 32 /* Private */ || flags & 64 /* Protected */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics.Accessibility_modifier_already_seen);
                        }
                        else if (flags & 128 /* Static */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_must_precede_1_modifier, "protected", "static");
                        }
                        else if (context === 1 /* ModuleElements */ || context === 0 /* SourceElements */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_module_element, "protected");
                        }
                        lastProtectedModifierStart = modifierStart;
                        lastProtectedModifierLength = modifierLength;
                        flags |= 64 /* Protected */;
                        break;
                    case 107 /* StaticKeyword */:
                        if (flags & 128 /* Static */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_already_seen, "static");
                        }
                        else if (context === 1 /* ModuleElements */ || context === 0 /* SourceElements */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_module_element, "static");
                        }
                        else if (context === 3 /* Parameters */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter, "static");
                        }
                        lastStaticModifierStart = modifierStart;
                        lastStaticModifierLength = modifierLength;
                        flags |= 128 /* Static */;
                        break;
                    case 76 /* ExportKeyword */:
                        if (flags & 1 /* Export */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_already_seen, "export");
                        }
                        else if (flags & 2 /* Ambient */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_must_precede_1_modifier, "export", "declare");
                        }
                        else if (context === 2 /* ClassMembers */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_class_element, "export");
                        }
                        else if (context === 3 /* Parameters */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter, "export");
                        }
                        flags |= 1 /* Export */;
                        break;
                    case 112 /* DeclareKeyword */:
                        if (flags & 2 /* Ambient */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_already_seen, "declare");
                        }
                        else if (context === 2 /* ClassMembers */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_class_element, "declare");
                        }
                        else if (context === 3 /* Parameters */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter, "declare");
                        }
                        else if (inAmbientContext && context === 1 /* ModuleElements */) {
                            grammarErrorAtPos(modifierStart, modifierLength, ts.Diagnostics.A_declare_modifier_cannot_be_used_in_an_already_ambient_context);
                        }
                        lastDeclareModifierStart = modifierStart;
                        lastDeclareModifierLength = modifierLength;
                        flags |= 2 /* Ambient */;
                        break;
                }
            }
            if (token === 111 /* ConstructorKeyword */ && flags & 128 /* Static */) {
                grammarErrorAtPos(lastStaticModifierStart, lastStaticModifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "static");
            }
            else if (token === 111 /* ConstructorKeyword */ && flags & 32 /* Private */) {
                grammarErrorAtPos(lastPrivateModifierStart, lastPrivateModifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "private");
            }
            else if (token === 111 /* ConstructorKeyword */ && flags & 64 /* Protected */) {
                grammarErrorAtPos(lastProtectedModifierStart, lastProtectedModifierLength, ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "protected");
            }
            else if (token === 83 /* ImportKeyword */) {
                if (flags & 2 /* Ambient */) {
                    grammarErrorAtPos(lastDeclareModifierStart, lastDeclareModifierLength, ts.Diagnostics.A_declare_modifier_cannot_be_used_with_an_import_declaration, "declare");
                }
            }
            else if (token === 101 /* InterfaceKeyword */) {
                if (flags & 2 /* Ambient */) {
                    grammarErrorAtPos(lastDeclareModifierStart, lastDeclareModifierLength, ts.Diagnostics.A_declare_modifier_cannot_be_used_with_an_interface_declaration, "declare");
                }
            }
            else if (token !== 76 /* ExportKeyword */ && !(flags & 2 /* Ambient */) && inAmbientContext && context === 0 /* SourceElements */) {
                var declarationStart = scanner.getTokenPos();
                var declarationFirstTokenLength = scanner.getTextPos() - declarationStart;
                grammarErrorAtPos(declarationStart, declarationFirstTokenLength, ts.Diagnostics.A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file);
            }
            return flags;
        }
        function parseClassMemberDeclaration() {
            var pos = getNodePos();
            var flags = parseAndCheckModifiers(2 /* ClassMembers */);
            if (parseContextualModifier(113 /* GetKeyword */)) {
                return parseAndCheckMemberAccessorDeclaration(127 /* GetAccessor */, pos, flags);
            }
            if (parseContextualModifier(117 /* SetKeyword */)) {
                return parseAndCheckMemberAccessorDeclaration(128 /* SetAccessor */, pos, flags);
            }
            if (token === 111 /* ConstructorKeyword */) {
                return parseConstructorDeclaration(pos, flags);
            }
            if (token >= 63 /* Identifier */ || token === 7 /* StringLiteral */ || token === 6 /* NumericLiteral */) {
                return parsePropertyMemberDeclaration(pos, flags);
            }
            if (token === 17 /* OpenBracketToken */) {
                if (flags) {
                    var start = getTokenPos(pos);
                    var length = getNodePos() - start;
                    errorAtPos(start, length, ts.Diagnostics.Modifiers_not_permitted_on_index_signature_members);
                }
                return parseIndexSignatureMember();
            }
            ts.Debug.fail("Should not have attempted to parse class member declaration.");
        }
        function parseClassDeclaration(pos, flags) {
            var node = createNode(184 /* ClassDeclaration */, pos);
            node.flags = flags;
            var errorCountBeforeClassDeclaration = file.syntacticErrors.length;
            parseExpected(67 /* ClassKeyword */);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            node.baseType = parseOptional(77 /* ExtendsKeyword */) ? parseTypeReference() : undefined;
            var implementsKeywordStart = scanner.getTokenPos();
            var implementsKeywordLength;
            if (parseOptional(100 /* ImplementsKeyword */)) {
                implementsKeywordLength = scanner.getStartPos() - implementsKeywordStart;
                node.implementedTypes = parseDelimitedList(8 /* BaseTypeReferences */, parseTypeReference, false);
            }
            var errorCountBeforeClassBody = file.syntacticErrors.length;
            if (parseExpected(13 /* OpenBraceToken */)) {
                node.members = parseList(6 /* ClassMembers */, false, parseClassMemberDeclaration);
                parseExpected(14 /* CloseBraceToken */);
            }
            else {
                node.members = createMissingList();
            }
            if (node.implementedTypes && !node.implementedTypes.length && errorCountBeforeClassBody === errorCountBeforeClassDeclaration) {
                grammarErrorAtPos(implementsKeywordStart, implementsKeywordLength, ts.Diagnostics._0_list_cannot_be_empty, "implements");
            }
            return finishNode(node);
        }
        function parseInterfaceDeclaration(pos, flags) {
            var node = createNode(185 /* InterfaceDeclaration */, pos);
            node.flags = flags;
            var errorCountBeforeInterfaceDeclaration = file.syntacticErrors.length;
            parseExpected(101 /* InterfaceKeyword */);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            var extendsKeywordStart = scanner.getTokenPos();
            var extendsKeywordLength;
            if (parseOptional(77 /* ExtendsKeyword */)) {
                extendsKeywordLength = scanner.getStartPos() - extendsKeywordStart;
                node.baseTypes = parseDelimitedList(8 /* BaseTypeReferences */, parseTypeReference, false);
            }
            var errorCountBeforeInterfaceBody = file.syntacticErrors.length;
            node.members = parseTypeLiteral().members;
            if (node.baseTypes && !node.baseTypes.length && errorCountBeforeInterfaceBody === errorCountBeforeInterfaceDeclaration) {
                grammarErrorAtPos(extendsKeywordStart, extendsKeywordLength, ts.Diagnostics._0_list_cannot_be_empty, "extends");
            }
            return finishNode(node);
        }
        function parseTypeAliasDeclaration(pos, flags) {
            var node = createNode(186 /* TypeAliasDeclaration */, pos);
            node.flags = flags;
            parseExpected(119 /* TypeKeyword */);
            node.name = parseIdentifier();
            parseExpected(51 /* EqualsToken */);
            node.type = parseType();
            parseSemicolon();
            return finishNode(node);
        }
        function parseAndCheckEnumDeclaration(pos, flags) {
            var enumIsConst = flags & 4096 /* Const */;
            function isIntegerLiteral(expression) {
                function isInteger(literalExpression) {
                    return /^[0-9]+([eE]\+?[0-9]+)?$/.test(literalExpression.text);
                }
                if (expression.kind === 151 /* PrefixOperator */) {
                    var unaryExpression = expression;
                    if (unaryExpression.operator === 32 /* PlusToken */ || unaryExpression.operator === 33 /* MinusToken */) {
                        expression = unaryExpression.operand;
                    }
                }
                if (expression.kind === 6 /* NumericLiteral */) {
                    return isInteger(expression);
                }
                return false;
            }
            var inConstantEnumMemberSection = true;
            function parseAndCheckEnumMember() {
                var node = createNode(192 /* EnumMember */);
                var errorCountBeforeEnumMember = file.syntacticErrors.length;
                node.name = parsePropertyName();
                node.initializer = parseInitializer(false);
                if (!enumIsConst) {
                    if (inAmbientContext) {
                        if (node.initializer && !isIntegerLiteral(node.initializer) && errorCountBeforeEnumMember === file.syntacticErrors.length) {
                            grammarErrorOnNode(node.name, ts.Diagnostics.Ambient_enum_elements_can_only_have_integer_literal_initializers);
                        }
                    }
                    else if (node.initializer) {
                        inConstantEnumMemberSection = isIntegerLiteral(node.initializer);
                    }
                    else if (!inConstantEnumMemberSection && errorCountBeforeEnumMember === file.syntacticErrors.length) {
                        grammarErrorOnNode(node.name, ts.Diagnostics.Enum_member_must_have_initializer);
                    }
                }
                return finishNode(node);
            }
            var node = createNode(187 /* EnumDeclaration */, pos);
            node.flags = flags;
            if (enumIsConst) {
                parseExpected(68 /* ConstKeyword */);
            }
            parseExpected(75 /* EnumKeyword */);
            node.name = parseIdentifier();
            if (parseExpected(13 /* OpenBraceToken */)) {
                node.members = parseDelimitedList(7 /* EnumMembers */, parseAndCheckEnumMember, true);
                parseExpected(14 /* CloseBraceToken */);
            }
            else {
                node.members = createMissingList();
            }
            return finishNode(node);
        }
        function parseModuleBody() {
            var node = createNode(189 /* ModuleBlock */);
            if (parseExpected(13 /* OpenBraceToken */)) {
                node.statements = parseList(1 /* ModuleElements */, false, parseModuleElement);
                parseExpected(14 /* CloseBraceToken */);
            }
            else {
                node.statements = createMissingList();
            }
            return finishNode(node);
        }
        function parseInternalModuleTail(pos, flags) {
            var node = createNode(188 /* ModuleDeclaration */, pos);
            node.flags = flags;
            node.name = parseIdentifier();
            if (parseOptional(19 /* DotToken */)) {
                node.body = parseInternalModuleTail(getNodePos(), 1 /* Export */);
            }
            else {
                node.body = parseModuleBody();
                ts.forEach(node.body.statements, function (s) {
                    if (s.kind === 191 /* ExportAssignment */) {
                        grammarErrorOnNode(s, ts.Diagnostics.An_export_assignment_cannot_be_used_in_an_internal_module);
                    }
                    else if (s.kind === 190 /* ImportDeclaration */ && s.externalModuleName) {
                        grammarErrorOnNode(s, ts.Diagnostics.Import_declarations_in_an_internal_module_cannot_reference_an_external_module);
                    }
                });
            }
            return finishNode(node);
        }
        function parseAmbientExternalModuleDeclaration(pos, flags) {
            var node = createNode(188 /* ModuleDeclaration */, pos);
            node.flags = flags;
            node.name = parseStringLiteral();
            if (!inAmbientContext) {
                var errorCount = file.syntacticErrors.length;
                if (!errorCount || file.syntacticErrors[errorCount - 1].start < getTokenPos(pos)) {
                    grammarErrorOnNode(node.name, ts.Diagnostics.Only_ambient_modules_can_use_quoted_names);
                }
            }
            var saveInAmbientContext = inAmbientContext;
            inAmbientContext = true;
            node.body = parseModuleBody();
            inAmbientContext = saveInAmbientContext;
            return finishNode(node);
        }
        function parseModuleDeclaration(pos, flags) {
            parseExpected(114 /* ModuleKeyword */);
            return token === 7 /* StringLiteral */ ? parseAmbientExternalModuleDeclaration(pos, flags) : parseInternalModuleTail(pos, flags);
        }
        function parseImportDeclaration(pos, flags) {
            var node = createNode(190 /* ImportDeclaration */, pos);
            node.flags = flags;
            parseExpected(83 /* ImportKeyword */);
            node.name = parseIdentifier();
            parseExpected(51 /* EqualsToken */);
            var entityName = parseEntityName(false);
            if (entityName.kind === 63 /* Identifier */ && entityName.text === "require" && parseOptional(15 /* OpenParenToken */)) {
                node.externalModuleName = parseStringLiteral();
                parseExpected(16 /* CloseParenToken */);
            }
            else {
                node.entityName = entityName;
            }
            parseSemicolon();
            return finishNode(node);
        }
        function parseExportAssignmentTail(pos) {
            var node = createNode(191 /* ExportAssignment */, pos);
            node.exportName = parseIdentifier();
            parseSemicolon();
            return finishNode(node);
        }
        function isDeclarationStart() {
            switch (token) {
                case 96 /* VarKeyword */:
                case 102 /* LetKeyword */:
                case 68 /* ConstKeyword */:
                case 81 /* FunctionKeyword */:
                    return true;
                case 67 /* ClassKeyword */:
                case 101 /* InterfaceKeyword */:
                case 75 /* EnumKeyword */:
                case 83 /* ImportKeyword */:
                case 119 /* TypeKeyword */:
                    return lookAhead(function () { return nextToken() >= 63 /* Identifier */; });
                case 114 /* ModuleKeyword */:
                    return lookAhead(function () { return nextToken() >= 63 /* Identifier */ || token === 7 /* StringLiteral */; });
                case 76 /* ExportKeyword */:
                    return lookAhead(function () { return nextToken() === 51 /* EqualsToken */ || isDeclarationStart(); });
                case 112 /* DeclareKeyword */:
                case 106 /* PublicKeyword */:
                case 104 /* PrivateKeyword */:
                case 105 /* ProtectedKeyword */:
                case 107 /* StaticKeyword */:
                    return lookAhead(function () {
                        nextToken();
                        return isDeclarationStart();
                    });
            }
        }
        function parseDeclaration(modifierContext) {
            var pos = getNodePos();
            var errorCountBeforeModifiers = file.syntacticErrors.length;
            var flags = parseAndCheckModifiers(modifierContext);
            if (token === 76 /* ExportKeyword */) {
                var modifiersEnd = scanner.getStartPos();
                nextToken();
                if (parseOptional(51 /* EqualsToken */)) {
                    var exportAssignmentTail = parseExportAssignmentTail(pos);
                    if (flags !== 0 && errorCountBeforeModifiers === file.syntacticErrors.length) {
                        var modifiersStart = ts.skipTrivia(sourceText, pos);
                        grammarErrorAtPos(modifiersStart, modifiersEnd - modifiersStart, ts.Diagnostics.An_export_assignment_cannot_have_modifiers);
                    }
                    return exportAssignmentTail;
                }
            }
            var saveInAmbientContext = inAmbientContext;
            if (flags & 2 /* Ambient */) {
                inAmbientContext = true;
            }
            var result;
            switch (token) {
                case 96 /* VarKeyword */:
                case 102 /* LetKeyword */:
                    result = parseVariableStatement(true, pos, flags);
                    break;
                case 68 /* ConstKeyword */:
                    var isConstEnum = lookAhead(function () { return nextToken() === 75 /* EnumKeyword */; });
                    if (isConstEnum) {
                        result = parseAndCheckEnumDeclaration(pos, flags | 4096 /* Const */);
                    }
                    else {
                        result = parseVariableStatement(true, pos, flags);
                    }
                    break;
                case 81 /* FunctionKeyword */:
                    result = parseFunctionDeclaration(pos, flags);
                    break;
                case 67 /* ClassKeyword */:
                    result = parseClassDeclaration(pos, flags);
                    break;
                case 101 /* InterfaceKeyword */:
                    result = parseInterfaceDeclaration(pos, flags);
                    break;
                case 119 /* TypeKeyword */:
                    result = parseTypeAliasDeclaration(pos, flags);
                    break;
                case 75 /* EnumKeyword */:
                    result = parseAndCheckEnumDeclaration(pos, flags);
                    break;
                case 114 /* ModuleKeyword */:
                    result = parseModuleDeclaration(pos, flags);
                    break;
                case 83 /* ImportKeyword */:
                    result = parseImportDeclaration(pos, flags);
                    break;
                default:
                    error(ts.Diagnostics.Declaration_expected);
            }
            inAmbientContext = saveInAmbientContext;
            return result;
        }
        function isSourceElement(inErrorRecovery) {
            return isDeclarationStart() || isStatement(inErrorRecovery);
        }
        function parseSourceElement() {
            return parseSourceElementOrModuleElement(0 /* SourceElements */);
        }
        function parseModuleElement() {
            return parseSourceElementOrModuleElement(1 /* ModuleElements */);
        }
        function parseSourceElementOrModuleElement(modifierContext) {
            if (isDeclarationStart()) {
                return parseDeclaration(modifierContext);
            }
            var statementStart = scanner.getTokenPos();
            var statementFirstTokenLength = scanner.getTextPos() - statementStart;
            var errorCountBeforeStatement = file.syntacticErrors.length;
            var statement = parseStatement(true);
            if (inAmbientContext && file.syntacticErrors.length === errorCountBeforeStatement) {
                grammarErrorAtPos(statementStart, statementFirstTokenLength, ts.Diagnostics.Statements_are_not_allowed_in_ambient_contexts);
            }
            return statement;
        }
        function processReferenceComments() {
            var referencedFiles = [];
            var amdDependencies = [];
            commentRanges = [];
            token = scanner.scan();
            for (var i = 0; i < commentRanges.length; i++) {
                var range = commentRanges[i];
                var comment = sourceText.substring(range.pos, range.end);
                var simpleReferenceRegEx = /^\/\/\/\s*<reference\s+/gim;
                if (simpleReferenceRegEx.exec(comment)) {
                    var isNoDefaultLibRegEx = /^(\/\/\/\s*<reference\s+no-default-lib=)('|")(.+?)\2\s*\/>/gim;
                    if (isNoDefaultLibRegEx.exec(comment)) {
                        file.hasNoDefaultLib = true;
                    }
                    else {
                        var matchResult = ts.fullTripleSlashReferencePathRegEx.exec(comment);
                        var start = range.pos;
                        var end = range.end;
                        var length = end - start;
                        if (!matchResult) {
                            errorAtPos(start, length, ts.Diagnostics.Invalid_reference_directive_syntax);
                        }
                        else {
                            referencedFiles.push({
                                pos: start,
                                end: end,
                                filename: matchResult[3]
                            });
                        }
                    }
                }
                else {
                    var amdDependencyRegEx = /^\/\/\/\s*<amd-dependency\s+path\s*=\s*('|")(.+?)\1/gim;
                    var amdDependencyMatchResult = amdDependencyRegEx.exec(comment);
                    if (amdDependencyMatchResult) {
                        amdDependencies.push(amdDependencyMatchResult[2]);
                    }
                }
            }
            commentRanges = undefined;
            return {
                referencedFiles: referencedFiles,
                amdDependencies: amdDependencies
            };
        }
        function getExternalModuleIndicator() {
            return ts.forEach(file.statements, function (node) { return node.flags & 1 /* Export */ || node.kind === 190 /* ImportDeclaration */ && node.externalModuleName || node.kind === 191 /* ExportAssignment */ ? node : undefined; });
        }
        scanner = ts.createScanner(languageVersion, true, sourceText, scanError, onComment);
        var rootNodeFlags = 0;
        if (ts.fileExtensionIs(filename, ".d.ts")) {
            rootNodeFlags = 1024 /* DeclarationFile */;
            inAmbientContext = true;
        }
        file = createRootNode(193 /* SourceFile */, 0, sourceText.length, rootNodeFlags);
        file.filename = ts.normalizePath(filename);
        file.text = sourceText;
        file.getLineAndCharacterFromPosition = getLineAndCharacterlFromSourcePosition;
        file.getPositionFromLineAndCharacter = getPositionFromSourceLineAndCharacter;
        file.syntacticErrors = [];
        file.semanticErrors = [];
        var referenceComments = processReferenceComments();
        file.referencedFiles = referenceComments.referencedFiles;
        file.amdDependencies = referenceComments.amdDependencies;
        file.statements = parseList(0 /* SourceElements */, true, parseSourceElement);
        file.externalModuleIndicator = getExternalModuleIndicator();
        file.nodeCount = nodeCount;
        file.identifierCount = identifierCount;
        file.version = version;
        file.isOpen = isOpen;
        file.languageVersion = languageVersion;
        file.identifiers = identifiers;
        return file;
    }
    ts.createSourceFile = createSourceFile;
    function createProgram(rootNames, options, host) {
        var program;
        var files = [];
        var filesByName = {};
        var errors = [];
        var seenNoDefaultLib = options.noLib;
        var commonSourceDirectory;
        ts.forEach(rootNames, function (name) { return processRootFile(name, false); });
        if (!seenNoDefaultLib) {
            processRootFile(host.getDefaultLibFilename(), true);
        }
        verifyCompilerOptions();
        errors.sort(ts.compareDiagnostics);
        program = {
            getSourceFile: getSourceFile,
            getSourceFiles: function () { return files; },
            getCompilerOptions: function () { return options; },
            getCompilerHost: function () { return host; },
            getDiagnostics: getDiagnostics,
            getGlobalDiagnostics: getGlobalDiagnostics,
            getTypeChecker: function (fullTypeCheckMode) { return ts.createTypeChecker(program, fullTypeCheckMode); },
            getCommonSourceDirectory: function () { return commonSourceDirectory; }
        };
        return program;
        function getSourceFile(filename) {
            filename = host.getCanonicalFileName(filename);
            return ts.hasProperty(filesByName, filename) ? filesByName[filename] : undefined;
        }
        function getDiagnostics(sourceFile) {
            return sourceFile ? ts.filter(errors, function (e) { return e.file === sourceFile; }) : errors;
        }
        function getGlobalDiagnostics() {
            return ts.filter(errors, function (e) { return !e.file; });
        }
        function hasExtension(filename) {
            return ts.getBaseFilename(filename).indexOf(".") >= 0;
        }
        function processRootFile(filename, isDefaultLib) {
            processSourceFile(ts.normalizePath(filename), isDefaultLib);
        }
        function processSourceFile(filename, isDefaultLib, refFile, refPos, refEnd) {
            if (refEnd !== undefined && refPos !== undefined) {
                var start = refPos;
                var length = refEnd - refPos;
            }
            var diagnostic;
            if (hasExtension(filename)) {
                if (!ts.fileExtensionIs(filename, ".ts")) {
                    diagnostic = ts.Diagnostics.File_0_must_have_extension_ts_or_d_ts;
                }
                else if (!findSourceFile(filename, isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = ts.Diagnostics.File_0_not_found;
                }
                else if (refFile && host.getCanonicalFileName(filename) === host.getCanonicalFileName(refFile.filename)) {
                    diagnostic = ts.Diagnostics.A_file_cannot_have_a_reference_to_itself;
                }
            }
            else {
                if (!(findSourceFile(filename + ".ts", isDefaultLib, refFile, refPos, refEnd) || findSourceFile(filename + ".d.ts", isDefaultLib, refFile, refPos, refEnd))) {
                    diagnostic = ts.Diagnostics.File_0_not_found;
                    filename += ".ts";
                }
            }
            if (diagnostic) {
                if (refFile) {
                    errors.push(ts.createFileDiagnostic(refFile, start, length, diagnostic, filename));
                }
                else {
                    errors.push(ts.createCompilerDiagnostic(diagnostic, filename));
                }
            }
        }
        function findSourceFile(filename, isDefaultLib, refFile, refStart, refLength) {
            var canonicalName = host.getCanonicalFileName(filename);
            if (ts.hasProperty(filesByName, canonicalName)) {
                var file = filesByName[canonicalName];
                if (file && host.useCaseSensitiveFileNames() && canonicalName !== file.filename) {
                    errors.push(ts.createFileDiagnostic(refFile, refStart, refLength, ts.Diagnostics.Filename_0_differs_from_already_included_filename_1_only_in_casing, filename, file.filename));
                }
            }
            else {
                var file = filesByName[canonicalName] = host.getSourceFile(filename, options.target, function (hostErrorMessage) {
                    errors.push(ts.createFileDiagnostic(refFile, refStart, refLength, ts.Diagnostics.Cannot_read_file_0_Colon_1, filename, hostErrorMessage));
                });
                if (file) {
                    seenNoDefaultLib = seenNoDefaultLib || file.hasNoDefaultLib;
                    if (!options.noResolve) {
                        var basePath = ts.getDirectoryPath(filename);
                        processReferencedFiles(file, basePath);
                        processImportedModules(file, basePath);
                    }
                    if (isDefaultLib) {
                        files.unshift(file);
                    }
                    else {
                        files.push(file);
                    }
                    ts.forEach(file.syntacticErrors, function (e) {
                        errors.push(e);
                    });
                }
            }
            return file;
        }
        function processReferencedFiles(file, basePath) {
            ts.forEach(file.referencedFiles, function (ref) {
                var referencedFilename = ts.isRootedDiskPath(ref.filename) ? ref.filename : ts.combinePaths(basePath, ref.filename);
                processSourceFile(ts.normalizePath(referencedFilename), false, file, ref.pos, ref.end);
            });
        }
        function processImportedModules(file, basePath) {
            ts.forEach(file.statements, function (node) {
                if (node.kind === 190 /* ImportDeclaration */ && node.externalModuleName) {
                    var nameLiteral = node.externalModuleName;
                    var moduleName = nameLiteral.text;
                    if (moduleName) {
                        var searchPath = basePath;
                        while (true) {
                            var searchName = ts.normalizePath(ts.combinePaths(searchPath, moduleName));
                            if (findModuleSourceFile(searchName + ".ts", nameLiteral) || findModuleSourceFile(searchName + ".d.ts", nameLiteral)) {
                                break;
                            }
                            var parentPath = ts.getDirectoryPath(searchPath);
                            if (parentPath === searchPath) {
                                break;
                            }
                            searchPath = parentPath;
                        }
                    }
                }
                else if (node.kind === 188 /* ModuleDeclaration */ && node.name.kind === 7 /* StringLiteral */ && (node.flags & 2 /* Ambient */ || isDeclarationFile(file))) {
                    forEachChild(node.body, function (node) {
                        if (node.kind === 190 /* ImportDeclaration */ && node.externalModuleName) {
                            var nameLiteral = node.externalModuleName;
                            var moduleName = nameLiteral.text;
                            if (moduleName) {
                                var searchName = ts.normalizePath(ts.combinePaths(basePath, moduleName));
                                var tsFile = findModuleSourceFile(searchName + ".ts", nameLiteral);
                                if (!tsFile) {
                                    findModuleSourceFile(searchName + ".d.ts", nameLiteral);
                                }
                            }
                        }
                    });
                }
            });
            function findModuleSourceFile(filename, nameLiteral) {
                return findSourceFile(filename, false, file, nameLiteral.pos, nameLiteral.end - nameLiteral.pos);
            }
        }
        function verifyCompilerOptions() {
            if (!options.sourceMap && (options.mapRoot || options.sourceRoot)) {
                if (options.mapRoot) {
                    errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Option_mapRoot_cannot_be_specified_without_specifying_sourcemap_option));
                }
                if (options.sourceRoot) {
                    errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Option_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option));
                }
                return;
            }
            var firstExternalModule = ts.forEach(files, function (f) { return isExternalModule(f) ? f : undefined; });
            if (firstExternalModule && options.module === 0 /* None */) {
                var externalModuleErrorSpan = getErrorSpanForNode(firstExternalModule.externalModuleIndicator);
                var errorStart = ts.skipTrivia(firstExternalModule.text, externalModuleErrorSpan.pos);
                var errorLength = externalModuleErrorSpan.end - errorStart;
                errors.push(ts.createFileDiagnostic(firstExternalModule, errorStart, errorLength, ts.Diagnostics.Cannot_compile_external_modules_unless_the_module_flag_is_provided));
            }
            if (options.outDir || options.sourceRoot || (options.mapRoot && (!options.out || firstExternalModule !== undefined))) {
                var commonPathComponents;
                ts.forEach(files, function (sourceFile) {
                    if (!(sourceFile.flags & 1024 /* DeclarationFile */) && !ts.fileExtensionIs(sourceFile.filename, ".js")) {
                        var sourcePathComponents = ts.getNormalizedPathComponents(sourceFile.filename, host.getCurrentDirectory());
                        sourcePathComponents.pop();
                        if (commonPathComponents) {
                            for (var i = 0; i < Math.min(commonPathComponents.length, sourcePathComponents.length); i++) {
                                if (commonPathComponents[i] !== sourcePathComponents[i]) {
                                    if (i === 0) {
                                        errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files));
                                        return;
                                    }
                                    commonPathComponents.length = i;
                                    break;
                                }
                            }
                            if (sourcePathComponents.length < commonPathComponents.length) {
                                commonPathComponents.length = sourcePathComponents.length;
                            }
                        }
                        else {
                            commonPathComponents = sourcePathComponents;
                        }
                    }
                });
                commonSourceDirectory = ts.getNormalizedPathFromPathComponents(commonPathComponents);
                if (commonSourceDirectory) {
                    commonSourceDirectory += ts.directorySeparator;
                }
            }
        }
    }
    ts.createProgram = createProgram;
})(ts || (ts = {}));
var ts;
(function (ts) {
    function getModuleInstanceState(node) {
        if (node.kind === 185 /* InterfaceDeclaration */) {
            return 0 /* NonInstantiated */;
        }
        else if (node.kind === 187 /* EnumDeclaration */ && ts.isConstEnumDeclaration(node)) {
            return 2 /* ConstEnumOnly */;
        }
        else if (node.kind === 190 /* ImportDeclaration */ && !(node.flags & 1 /* Export */)) {
            return 0 /* NonInstantiated */;
        }
        else if (node.kind === 189 /* ModuleBlock */) {
            var state = 0 /* NonInstantiated */;
            ts.forEachChild(node, function (n) {
                switch (getModuleInstanceState(n)) {
                    case 0 /* NonInstantiated */:
                        return false;
                    case 2 /* ConstEnumOnly */:
                        state = 2 /* ConstEnumOnly */;
                        return false;
                    case 1 /* Instantiated */:
                        state = 1 /* Instantiated */;
                        return true;
                }
            });
            return state;
        }
        else if (node.kind === 188 /* ModuleDeclaration */) {
            return getModuleInstanceState(node.body);
        }
        else {
            return 1 /* Instantiated */;
        }
    }
    ts.getModuleInstanceState = getModuleInstanceState;
    function bindSourceFile(file) {
        var parent;
        var container;
        var blockScopeContainer;
        var lastContainer;
        var symbolCount = 0;
        var Symbol = ts.objectAllocator.getSymbolConstructor();
        if (!file.locals) {
            file.locals = {};
            container = blockScopeContainer = file;
            bind(file);
            file.symbolCount = symbolCount;
        }
        function createSymbol(flags, name) {
            symbolCount++;
            return new Symbol(flags, name);
        }
        function addDeclarationToSymbol(symbol, node, symbolKind) {
            symbol.flags |= symbolKind;
            if (!symbol.declarations)
                symbol.declarations = [];
            symbol.declarations.push(node);
            if (symbolKind & 1952 /* HasExports */ && !symbol.exports)
                symbol.exports = {};
            if (symbolKind & 6240 /* HasMembers */ && !symbol.members)
                symbol.members = {};
            node.symbol = symbol;
            if (symbolKind & 107455 /* Value */ && !symbol.valueDeclaration)
                symbol.valueDeclaration = node;
        }
        function getDeclarationName(node) {
            if (node.name) {
                if (node.kind === 188 /* ModuleDeclaration */ && node.name.kind === 7 /* StringLiteral */) {
                    return '"' + node.name.text + '"';
                }
                return node.name.text;
            }
            switch (node.kind) {
                case 126 /* Constructor */: return "__constructor";
                case 129 /* CallSignature */: return "__call";
                case 130 /* ConstructSignature */: return "__new";
                case 131 /* IndexSignature */: return "__index";
            }
        }
        function getDisplayName(node) {
            return node.name ? ts.identifierToString(node.name) : getDeclarationName(node);
        }
        function declareSymbol(symbols, parent, node, includes, excludes) {
            var name = getDeclarationName(node);
            if (name !== undefined) {
                var symbol = ts.hasProperty(symbols, name) ? symbols[name] : (symbols[name] = createSymbol(0, name));
                if (symbol.flags & excludes) {
                    if (node.name) {
                        node.name.parent = node;
                    }
                    var message = symbol.flags & 2 /* BlockScopedVariable */ ? ts.Diagnostics.Cannot_redeclare_block_scoped_variable_0 : ts.Diagnostics.Duplicate_identifier_0;
                    ts.forEach(symbol.declarations, function (declaration) {
                        file.semanticErrors.push(ts.createDiagnosticForNode(declaration.name, message, getDisplayName(declaration)));
                    });
                    file.semanticErrors.push(ts.createDiagnosticForNode(node.name, message, getDisplayName(node)));
                    symbol = createSymbol(0, name);
                }
            }
            else {
                symbol = createSymbol(0, "__missing");
            }
            addDeclarationToSymbol(symbol, node, includes);
            symbol.parent = parent;
            if (node.kind === 184 /* ClassDeclaration */ && symbol.exports) {
                var prototypeSymbol = createSymbol(4 /* Property */ | 536870912 /* Prototype */, "prototype");
                if (ts.hasProperty(symbol.exports, prototypeSymbol.name)) {
                    if (node.name) {
                        node.name.parent = node;
                    }
                    file.semanticErrors.push(ts.createDiagnosticForNode(symbol.exports[prototypeSymbol.name].declarations[0], ts.Diagnostics.Duplicate_identifier_0, prototypeSymbol.name));
                }
                symbol.exports[prototypeSymbol.name] = prototypeSymbol;
                prototypeSymbol.parent = symbol;
            }
            return symbol;
        }
        function isAmbientContext(node) {
            while (node) {
                if (node.flags & 2 /* Ambient */)
                    return true;
                node = node.parent;
            }
            return false;
        }
        function declareModuleMember(node, symbolKind, symbolExcludes) {
            var exportKind = 0;
            if (symbolKind & 107455 /* Value */) {
                exportKind |= 4194304 /* ExportValue */;
            }
            if (symbolKind & 3152352 /* Type */) {
                exportKind |= 8388608 /* ExportType */;
            }
            if (symbolKind & 1536 /* Namespace */) {
                exportKind |= 16777216 /* ExportNamespace */;
            }
            if (node.flags & 1 /* Export */ || (node.kind !== 190 /* ImportDeclaration */ && isAmbientContext(container))) {
                if (exportKind) {
                    var local = declareSymbol(container.locals, undefined, node, exportKind, symbolExcludes);
                    local.exportSymbol = declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                    node.localSymbol = local;
                }
                else {
                    declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                }
            }
            else {
                declareSymbol(container.locals, undefined, node, symbolKind, symbolExcludes);
            }
        }
        function bindChildren(node, symbolKind, isBlockScopeContainer) {
            if (symbolKind & 1041936 /* HasLocals */) {
                node.locals = {};
            }
            var saveParent = parent;
            var saveContainer = container;
            var savedBlockScopeContainer = blockScopeContainer;
            parent = node;
            if (symbolKind & 1048560 /* IsContainer */) {
                container = node;
                if (lastContainer !== container && !container.nextContainer) {
                    if (lastContainer) {
                        lastContainer.nextContainer = container;
                    }
                    lastContainer = container;
                }
            }
            if (isBlockScopeContainer) {
                blockScopeContainer = node;
            }
            ts.forEachChild(node, bind);
            container = saveContainer;
            parent = saveParent;
            blockScopeContainer = savedBlockScopeContainer;
        }
        function bindDeclaration(node, symbolKind, symbolExcludes, isBlockScopeContainer) {
            switch (container.kind) {
                case 188 /* ModuleDeclaration */:
                    declareModuleMember(node, symbolKind, symbolExcludes);
                    break;
                case 193 /* SourceFile */:
                    if (ts.isExternalModule(container)) {
                        declareModuleMember(node, symbolKind, symbolExcludes);
                        break;
                    }
                case 129 /* CallSignature */:
                case 130 /* ConstructSignature */:
                case 131 /* IndexSignature */:
                case 125 /* Method */:
                case 126 /* Constructor */:
                case 127 /* GetAccessor */:
                case 128 /* SetAccessor */:
                case 182 /* FunctionDeclaration */:
                case 149 /* FunctionExpression */:
                case 150 /* ArrowFunction */:
                    declareSymbol(container.locals, undefined, node, symbolKind, symbolExcludes);
                    break;
                case 184 /* ClassDeclaration */:
                    if (node.flags & 128 /* Static */) {
                        declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                        break;
                    }
                case 134 /* TypeLiteral */:
                case 140 /* ObjectLiteral */:
                case 185 /* InterfaceDeclaration */:
                    declareSymbol(container.symbol.members, container.symbol, node, symbolKind, symbolExcludes);
                    break;
                case 187 /* EnumDeclaration */:
                    declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                    break;
            }
            bindChildren(node, symbolKind, isBlockScopeContainer);
        }
        function bindConstructorDeclaration(node) {
            bindDeclaration(node, 16384 /* Constructor */, 0, true);
            ts.forEach(node.parameters, function (p) {
                if (p.flags & (16 /* Public */ | 32 /* Private */ | 64 /* Protected */)) {
                    bindDeclaration(p, 4 /* Property */, 107455 /* PropertyExcludes */, false);
                }
            });
        }
        function bindModuleDeclaration(node) {
            if (node.name.kind === 7 /* StringLiteral */) {
                bindDeclaration(node, 512 /* ValueModule */, 106639 /* ValueModuleExcludes */, true);
            }
            else {
                var state = getModuleInstanceState(node);
                if (state === 0 /* NonInstantiated */) {
                    bindDeclaration(node, 1024 /* NamespaceModule */, 0 /* NamespaceModuleExcludes */, true);
                }
                else {
                    bindDeclaration(node, 512 /* ValueModule */, 106639 /* ValueModuleExcludes */, true);
                    if (state === 2 /* ConstEnumOnly */) {
                        node.symbol.constEnumOnlyModule = true;
                    }
                    else if (node.symbol.constEnumOnlyModule) {
                        node.symbol.constEnumOnlyModule = false;
                    }
                }
            }
        }
        function bindAnonymousDeclaration(node, symbolKind, name, isBlockScopeContainer) {
            var symbol = createSymbol(symbolKind, name);
            addDeclarationToSymbol(symbol, node, symbolKind);
            bindChildren(node, symbolKind, isBlockScopeContainer);
        }
        function bindCatchVariableDeclaration(node) {
            var symbol = createSymbol(1 /* FunctionScopedVariable */, node.variable.text || "__missing");
            addDeclarationToSymbol(symbol, node, 1 /* FunctionScopedVariable */);
            var saveParent = parent;
            var savedBlockScopeContainer = blockScopeContainer;
            parent = blockScopeContainer = node;
            ts.forEachChild(node, bind);
            parent = saveParent;
            blockScopeContainer = savedBlockScopeContainer;
        }
        function bindBlockScopedVariableDeclaration(node) {
            switch (blockScopeContainer.kind) {
                case 188 /* ModuleDeclaration */:
                    declareModuleMember(node, 2 /* BlockScopedVariable */, 107455 /* BlockScopedVariableExcludes */);
                    break;
                case 193 /* SourceFile */:
                    if (ts.isExternalModule(container)) {
                        declareModuleMember(node, 2 /* BlockScopedVariable */, 107455 /* BlockScopedVariableExcludes */);
                        break;
                    }
                default:
                    if (!blockScopeContainer.locals) {
                        blockScopeContainer.locals = {};
                    }
                    declareSymbol(blockScopeContainer.locals, undefined, node, 2 /* BlockScopedVariable */, 107455 /* BlockScopedVariableExcludes */);
            }
            bindChildren(node, 2 /* BlockScopedVariable */, false);
        }
        function bind(node) {
            node.parent = parent;
            switch (node.kind) {
                case 122 /* TypeParameter */:
                    bindDeclaration(node, 1048576 /* TypeParameter */, 2103776 /* TypeParameterExcludes */, false);
                    break;
                case 123 /* Parameter */:
                    bindDeclaration(node, 1 /* FunctionScopedVariable */, 107455 /* ParameterExcludes */, false);
                    break;
                case 181 /* VariableDeclaration */:
                    if (node.flags & 6144 /* BlockScoped */) {
                        bindBlockScopedVariableDeclaration(node);
                    }
                    else {
                        bindDeclaration(node, 1 /* FunctionScopedVariable */, 107454 /* FunctionScopedVariableExcludes */, false);
                    }
                    break;
                case 124 /* Property */:
                case 141 /* PropertyAssignment */:
                    bindDeclaration(node, 4 /* Property */, 107455 /* PropertyExcludes */, false);
                    break;
                case 192 /* EnumMember */:
                    bindDeclaration(node, 8 /* EnumMember */, 107455 /* EnumMemberExcludes */, false);
                    break;
                case 129 /* CallSignature */:
                    bindDeclaration(node, 131072 /* CallSignature */, 0, false);
                    break;
                case 125 /* Method */:
                    bindDeclaration(node, 8192 /* Method */, 99263 /* MethodExcludes */, true);
                    break;
                case 130 /* ConstructSignature */:
                    bindDeclaration(node, 262144 /* ConstructSignature */, 0, true);
                    break;
                case 131 /* IndexSignature */:
                    bindDeclaration(node, 524288 /* IndexSignature */, 0, false);
                    break;
                case 182 /* FunctionDeclaration */:
                    bindDeclaration(node, 16 /* Function */, 106927 /* FunctionExcludes */, true);
                    break;
                case 126 /* Constructor */:
                    bindConstructorDeclaration(node);
                    break;
                case 127 /* GetAccessor */:
                    bindDeclaration(node, 32768 /* GetAccessor */, 41919 /* GetAccessorExcludes */, true);
                    break;
                case 128 /* SetAccessor */:
                    bindDeclaration(node, 65536 /* SetAccessor */, 74687 /* SetAccessorExcludes */, true);
                    break;
                case 134 /* TypeLiteral */:
                    bindAnonymousDeclaration(node, 2048 /* TypeLiteral */, "__type", false);
                    break;
                case 140 /* ObjectLiteral */:
                    bindAnonymousDeclaration(node, 4096 /* ObjectLiteral */, "__object", false);
                    break;
                case 149 /* FunctionExpression */:
                case 150 /* ArrowFunction */:
                    bindAnonymousDeclaration(node, 16 /* Function */, "__function", true);
                    break;
                case 178 /* CatchBlock */:
                    bindCatchVariableDeclaration(node);
                    break;
                case 184 /* ClassDeclaration */:
                    bindDeclaration(node, 32 /* Class */, 3258879 /* ClassExcludes */, false);
                    break;
                case 185 /* InterfaceDeclaration */:
                    bindDeclaration(node, 64 /* Interface */, 3152288 /* InterfaceExcludes */, false);
                    break;
                case 186 /* TypeAliasDeclaration */:
                    bindDeclaration(node, 2097152 /* TypeAlias */, 3152352 /* TypeAliasExcludes */, false);
                    break;
                case 187 /* EnumDeclaration */:
                    if (ts.isConstEnumDeclaration(node)) {
                        bindDeclaration(node, 128 /* ConstEnum */, 3259263 /* ConstEnumExcludes */, false);
                    }
                    else {
                        bindDeclaration(node, 256 /* RegularEnum */, 3258623 /* RegularEnumExcludes */, false);
                    }
                    break;
                case 188 /* ModuleDeclaration */:
                    bindModuleDeclaration(node);
                    break;
                case 190 /* ImportDeclaration */:
                    bindDeclaration(node, 33554432 /* Import */, 33554432 /* ImportExcludes */, false);
                    break;
                case 193 /* SourceFile */:
                    if (ts.isExternalModule(node)) {
                        bindAnonymousDeclaration(node, 512 /* ValueModule */, '"' + ts.removeFileExtension(node.filename) + '"', true);
                        break;
                    }
                case 158 /* Block */:
                case 177 /* TryBlock */:
                case 178 /* CatchBlock */:
                case 179 /* FinallyBlock */:
                case 165 /* ForStatement */:
                case 166 /* ForInStatement */:
                case 171 /* SwitchStatement */:
                    bindChildren(node, 0, true);
                    break;
                default:
                    var saveParent = parent;
                    parent = node;
                    ts.forEachChild(node, bind);
                    parent = saveParent;
            }
        }
    }
    ts.bindSourceFile = bindSourceFile;
})(ts || (ts = {}));
var ts;
(function (ts) {
    var indentStrings = ["", "    "];
    function getIndentString(level) {
        if (indentStrings[level] === undefined) {
            indentStrings[level] = getIndentString(level - 1) + indentStrings[1];
        }
        return indentStrings[level];
    }
    ts.getIndentString = getIndentString;
    function getIndentSize() {
        return indentStrings[1].length;
    }
    function shouldEmitToOwnFile(sourceFile, compilerOptions) {
        if (!ts.isDeclarationFile(sourceFile)) {
            if ((ts.isExternalModule(sourceFile) || !compilerOptions.out) && !ts.fileExtensionIs(sourceFile.filename, ".js")) {
                return true;
            }
            return false;
        }
        return false;
    }
    ts.shouldEmitToOwnFile = shouldEmitToOwnFile;
    function isExternalModuleOrDeclarationFile(sourceFile) {
        return ts.isExternalModule(sourceFile) || ts.isDeclarationFile(sourceFile);
    }
    ts.isExternalModuleOrDeclarationFile = isExternalModuleOrDeclarationFile;
    function emitFiles(resolver, targetSourceFile) {
        var program = resolver.getProgram();
        var compilerHost = program.getCompilerHost();
        var compilerOptions = program.getCompilerOptions();
        var sourceMapDataList = compilerOptions.sourceMap ? [] : undefined;
        var diagnostics = [];
        var newLine = program.getCompilerHost().getNewLine();
        function getSourceFilePathInNewDir(newDirPath, sourceFile) {
            var sourceFilePath = ts.getNormalizedPathFromPathComponents(ts.getNormalizedPathComponents(sourceFile.filename, compilerHost.getCurrentDirectory()));
            sourceFilePath = sourceFilePath.replace(program.getCommonSourceDirectory(), "");
            return ts.combinePaths(newDirPath, sourceFilePath);
        }
        function getOwnEmitOutputFilePath(sourceFile, extension) {
            if (compilerOptions.outDir) {
                var emitOutputFilePathWithoutExtension = ts.removeFileExtension(getSourceFilePathInNewDir(compilerOptions.outDir, sourceFile));
            }
            else {
                var emitOutputFilePathWithoutExtension = ts.removeFileExtension(sourceFile.filename);
            }
            return emitOutputFilePathWithoutExtension + extension;
        }
        function getFirstConstructorWithBody(node) {
            return ts.forEach(node.members, function (member) {
                if (member.kind === 126 /* Constructor */ && member.body) {
                    return member;
                }
            });
        }
        function getAllAccessorDeclarations(node, accessor) {
            var firstAccessor;
            var getAccessor;
            var setAccessor;
            ts.forEach(node.members, function (member) {
                if ((member.kind === 127 /* GetAccessor */ || member.kind === 128 /* SetAccessor */) && member.name.text === accessor.name.text && (member.flags & 128 /* Static */) === (accessor.flags & 128 /* Static */)) {
                    if (!firstAccessor) {
                        firstAccessor = member;
                    }
                    if (member.kind === 127 /* GetAccessor */ && !getAccessor) {
                        getAccessor = member;
                    }
                    if (member.kind === 128 /* SetAccessor */ && !setAccessor) {
                        setAccessor = member;
                    }
                }
            });
            return {
                firstAccessor: firstAccessor,
                getAccessor: getAccessor,
                setAccessor: setAccessor
            };
        }
        function createTextWriter() {
            var output = "";
            var indent = 0;
            var lineStart = true;
            var lineCount = 0;
            var linePos = 0;
            function write(s) {
                if (s && s.length) {
                    if (lineStart) {
                        output += getIndentString(indent);
                        lineStart = false;
                    }
                    output += s;
                }
            }
            function rawWrite(s) {
                if (s !== undefined) {
                    if (lineStart) {
                        lineStart = false;
                    }
                    output += s;
                }
            }
            function writeLiteral(s) {
                if (s && s.length) {
                    write(s);
                    var lineStartsOfS = ts.getLineStarts(s);
                    if (lineStartsOfS.length > 1) {
                        lineCount = lineCount + lineStartsOfS.length - 1;
                        linePos = output.length - s.length + lineStartsOfS[lineStartsOfS.length - 1];
                    }
                }
            }
            function writeLine() {
                if (!lineStart) {
                    output += newLine;
                    lineCount++;
                    linePos = output.length;
                    lineStart = true;
                }
            }
            return {
                write: write,
                rawWrite: rawWrite,
                writeLiteral: writeLiteral,
                writeLine: writeLine,
                increaseIndent: function () { return indent++; },
                decreaseIndent: function () { return indent--; },
                getIndent: function () { return indent; },
                getTextPos: function () { return output.length; },
                getLine: function () { return lineCount + 1; },
                getColumn: function () { return lineStart ? indent * getIndentSize() + 1 : output.length - linePos + 1; },
                getText: function () { return output; }
            };
        }
        var currentSourceFile;
        function getSourceTextOfLocalNode(node) {
            var text = currentSourceFile.text;
            return text.substring(ts.skipTrivia(text, node.pos), node.end);
        }
        function getLineOfLocalPosition(pos) {
            return currentSourceFile.getLineAndCharacterFromPosition(pos).line;
        }
        function writeFile(filename, data, writeByteOrderMark) {
            compilerHost.writeFile(filename, data, writeByteOrderMark, function (hostErrorMessage) {
                diagnostics.push(ts.createCompilerDiagnostic(ts.Diagnostics.Could_not_write_file_0_Colon_1, filename, hostErrorMessage));
            });
        }
        function emitComments(comments, trailingSeparator, writer, writeComment) {
            var emitLeadingSpace = !trailingSeparator;
            ts.forEach(comments, function (comment) {
                if (emitLeadingSpace) {
                    writer.write(" ");
                    emitLeadingSpace = false;
                }
                writeComment(comment, writer);
                if (comment.hasTrailingNewLine) {
                    writer.writeLine();
                }
                else if (trailingSeparator) {
                    writer.write(" ");
                }
                else {
                    emitLeadingSpace = true;
                }
            });
        }
        function emitNewLineBeforeLeadingComments(node, leadingComments, writer) {
            if (leadingComments && leadingComments.length && node.pos !== leadingComments[0].pos && getLineOfLocalPosition(node.pos) !== getLineOfLocalPosition(leadingComments[0].pos)) {
                writer.writeLine();
            }
        }
        function writeCommentRange(comment, writer) {
            if (currentSourceFile.text.charCodeAt(comment.pos + 1) === 42 /* asterisk */) {
                var firstCommentLineAndCharacter = currentSourceFile.getLineAndCharacterFromPosition(comment.pos);
                var firstCommentLineIndent;
                for (var pos = comment.pos, currentLine = firstCommentLineAndCharacter.line; pos < comment.end; currentLine++) {
                    var nextLineStart = currentSourceFile.getPositionFromLineAndCharacter(currentLine + 1, 1);
                    if (pos !== comment.pos) {
                        if (firstCommentLineIndent === undefined) {
                            firstCommentLineIndent = calculateIndent(currentSourceFile.getPositionFromLineAndCharacter(firstCommentLineAndCharacter.line, 1), comment.pos);
                        }
                        var currentWriterIndentSpacing = writer.getIndent() * getIndentSize();
                        var spacesToEmit = currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(pos, nextLineStart);
                        if (spacesToEmit > 0) {
                            var numberOfSingleSpacesToEmit = spacesToEmit % getIndentSize();
                            var indentSizeSpaceString = getIndentString((spacesToEmit - numberOfSingleSpacesToEmit) / getIndentSize());
                            writer.rawWrite(indentSizeSpaceString);
                            while (numberOfSingleSpacesToEmit) {
                                writer.rawWrite(" ");
                                numberOfSingleSpacesToEmit--;
                            }
                        }
                        else {
                            writer.rawWrite("");
                        }
                    }
                    writeTrimmedCurrentLine(pos, nextLineStart);
                    pos = nextLineStart;
                }
            }
            else {
                writer.write(currentSourceFile.text.substring(comment.pos, comment.end));
            }
            function writeTrimmedCurrentLine(pos, nextLineStart) {
                var end = Math.min(comment.end, nextLineStart - 1);
                var currentLineText = currentSourceFile.text.substring(pos, end).replace(/^\s+|\s+$/g, '');
                if (currentLineText) {
                    writer.write(currentLineText);
                    if (end !== comment.end) {
                        writer.writeLine();
                    }
                }
                else {
                    writer.writeLiteral(newLine);
                }
            }
            function calculateIndent(pos, end) {
                var currentLineIndent = 0;
                for (; pos < end && ts.isWhiteSpace(currentSourceFile.text.charCodeAt(pos)); pos++) {
                    if (currentSourceFile.text.charCodeAt(pos) === 9 /* tab */) {
                        currentLineIndent += getIndentSize() - (currentLineIndent % getIndentSize());
                    }
                    else {
                        currentLineIndent++;
                    }
                }
                return currentLineIndent;
            }
        }
        function emitJavaScript(jsFilePath, root) {
            var writer = createTextWriter();
            var write = writer.write;
            var writeLine = writer.writeLine;
            var increaseIndent = writer.increaseIndent;
            var decreaseIndent = writer.decreaseIndent;
            var extendsEmitted = false;
            var writeEmittedFiles = writeJavaScriptFile;
            var emitLeadingComments = compilerOptions.removeComments ? function (node) {
            } : emitLeadingDeclarationComments;
            var emitTrailingComments = compilerOptions.removeComments ? function (node) {
            } : emitTrailingDeclarationComments;
            var emitLeadingCommentsOfPosition = compilerOptions.removeComments ? function (pos) {
            } : emitLeadingCommentsOfLocalPosition;
            var detachedCommentsInfo;
            var emitDetachedComments = compilerOptions.removeComments ? function (node) {
            } : emitDetachedCommentsAtPosition;
            var emitPinnedOrTripleSlashComments = compilerOptions.removeComments ? function (node) {
            } : emitPinnedOrTripleSlashCommentsOfNode;
            var writeComment = writeCommentRange;
            var emit = emitNode;
            var emitStart = function (node) {
            };
            var emitEnd = function (node) {
            };
            var emitToken = emitTokenText;
            var scopeEmitStart = function (scopeDeclaration, scopeName) {
            };
            var scopeEmitEnd = function () {
            };
            var sourceMapData;
            function initializeEmitterWithSourceMaps() {
                var sourceMapDir;
                var sourceMapSourceIndex = -1;
                var sourceMapNameIndexMap = {};
                var sourceMapNameIndices = [];
                function getSourceMapNameIndex() {
                    return sourceMapNameIndices.length ? sourceMapNameIndices[sourceMapNameIndices.length - 1] : -1;
                }
                var lastRecordedSourceMapSpan;
                var lastEncodedSourceMapSpan = {
                    emittedLine: 1,
                    emittedColumn: 1,
                    sourceLine: 1,
                    sourceColumn: 1,
                    sourceIndex: 0
                };
                var lastEncodedNameIndex = 0;
                function encodeLastRecordedSourceMapSpan() {
                    if (!lastRecordedSourceMapSpan || lastRecordedSourceMapSpan === lastEncodedSourceMapSpan) {
                        return;
                    }
                    var prevEncodedEmittedColumn = lastEncodedSourceMapSpan.emittedColumn;
                    if (lastEncodedSourceMapSpan.emittedLine == lastRecordedSourceMapSpan.emittedLine) {
                        if (sourceMapData.sourceMapMappings) {
                            sourceMapData.sourceMapMappings += ",";
                        }
                    }
                    else {
                        for (var encodedLine = lastEncodedSourceMapSpan.emittedLine; encodedLine < lastRecordedSourceMapSpan.emittedLine; encodedLine++) {
                            sourceMapData.sourceMapMappings += ";";
                        }
                        prevEncodedEmittedColumn = 1;
                    }
                    sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.emittedColumn - prevEncodedEmittedColumn);
                    sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceIndex - lastEncodedSourceMapSpan.sourceIndex);
                    sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceLine - lastEncodedSourceMapSpan.sourceLine);
                    sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceColumn - lastEncodedSourceMapSpan.sourceColumn);
                    if (lastRecordedSourceMapSpan.nameIndex >= 0) {
                        sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.nameIndex - lastEncodedNameIndex);
                        lastEncodedNameIndex = lastRecordedSourceMapSpan.nameIndex;
                    }
                    lastEncodedSourceMapSpan = lastRecordedSourceMapSpan;
                    sourceMapData.sourceMapDecodedMappings.push(lastEncodedSourceMapSpan);
                    function base64VLQFormatEncode(inValue) {
                        function base64FormatEncode(inValue) {
                            if (inValue < 64) {
                                return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(inValue);
                            }
                            throw TypeError(inValue + ": not a 64 based value");
                        }
                        if (inValue < 0) {
                            inValue = ((-inValue) << 1) + 1;
                        }
                        else {
                            inValue = inValue << 1;
                        }
                        var encodedStr = "";
                        do {
                            var currentDigit = inValue & 31;
                            inValue = inValue >> 5;
                            if (inValue > 0) {
                                currentDigit = currentDigit | 32;
                            }
                            encodedStr = encodedStr + base64FormatEncode(currentDigit);
                        } while (inValue > 0);
                        return encodedStr;
                    }
                }
                function recordSourceMapSpan(pos) {
                    var sourceLinePos = currentSourceFile.getLineAndCharacterFromPosition(pos);
                    var emittedLine = writer.getLine();
                    var emittedColumn = writer.getColumn();
                    if (!lastRecordedSourceMapSpan || lastRecordedSourceMapSpan.emittedLine != emittedLine || lastRecordedSourceMapSpan.emittedColumn != emittedColumn || (lastRecordedSourceMapSpan.sourceIndex === sourceMapSourceIndex && (lastRecordedSourceMapSpan.sourceLine > sourceLinePos.line || (lastRecordedSourceMapSpan.sourceLine === sourceLinePos.line && lastRecordedSourceMapSpan.sourceColumn > sourceLinePos.character)))) {
                        encodeLastRecordedSourceMapSpan();
                        lastRecordedSourceMapSpan = {
                            emittedLine: emittedLine,
                            emittedColumn: emittedColumn,
                            sourceLine: sourceLinePos.line,
                            sourceColumn: sourceLinePos.character,
                            nameIndex: getSourceMapNameIndex(),
                            sourceIndex: sourceMapSourceIndex
                        };
                    }
                    else {
                        lastRecordedSourceMapSpan.sourceLine = sourceLinePos.line;
                        lastRecordedSourceMapSpan.sourceColumn = sourceLinePos.character;
                        lastRecordedSourceMapSpan.sourceIndex = sourceMapSourceIndex;
                    }
                }
                function recordEmitNodeStartSpan(node) {
                    recordSourceMapSpan(ts.skipTrivia(currentSourceFile.text, node.pos));
                }
                function recordEmitNodeEndSpan(node) {
                    recordSourceMapSpan(node.end);
                }
                function writeTextWithSpanRecord(tokenKind, startPos, emitFn) {
                    var tokenStartPos = ts.skipTrivia(currentSourceFile.text, startPos);
                    recordSourceMapSpan(tokenStartPos);
                    var tokenEndPos = emitTokenText(tokenKind, tokenStartPos, emitFn);
                    recordSourceMapSpan(tokenEndPos);
                    return tokenEndPos;
                }
                function recordNewSourceFileStart(node) {
                    var sourcesDirectoryPath = compilerOptions.sourceRoot ? program.getCommonSourceDirectory() : sourceMapDir;
                    sourceMapData.sourceMapSources.push(ts.getRelativePathToDirectoryOrUrl(sourcesDirectoryPath, node.filename, compilerHost.getCurrentDirectory(), compilerHost.getCanonicalFileName, true));
                    sourceMapSourceIndex = sourceMapData.sourceMapSources.length - 1;
                    sourceMapData.inputSourceFileNames.push(node.filename);
                }
                function recordScopeNameOfNode(node, scopeName) {
                    function recordScopeNameIndex(scopeNameIndex) {
                        sourceMapNameIndices.push(scopeNameIndex);
                    }
                    function recordScopeNameStart(scopeName) {
                        var scopeNameIndex = -1;
                        if (scopeName) {
                            var parentIndex = getSourceMapNameIndex();
                            if (parentIndex !== -1) {
                                scopeName = sourceMapData.sourceMapNames[parentIndex] + "." + scopeName;
                            }
                            scopeNameIndex = ts.getProperty(sourceMapNameIndexMap, scopeName);
                            if (scopeNameIndex === undefined) {
                                scopeNameIndex = sourceMapData.sourceMapNames.length;
                                sourceMapData.sourceMapNames.push(scopeName);
                                sourceMapNameIndexMap[scopeName] = scopeNameIndex;
                            }
                        }
                        recordScopeNameIndex(scopeNameIndex);
                    }
                    if (scopeName) {
                        recordScopeNameStart(scopeName);
                    }
                    else if (node.kind === 182 /* FunctionDeclaration */ || node.kind === 149 /* FunctionExpression */ || node.kind === 125 /* Method */ || node.kind === 127 /* GetAccessor */ || node.kind === 128 /* SetAccessor */ || node.kind === 188 /* ModuleDeclaration */ || node.kind === 184 /* ClassDeclaration */ || node.kind === 187 /* EnumDeclaration */) {
                        if (node.name) {
                            scopeName = node.name.text;
                        }
                        recordScopeNameStart(scopeName);
                    }
                    else {
                        recordScopeNameIndex(getSourceMapNameIndex());
                    }
                }
                function recordScopeNameEnd() {
                    sourceMapNameIndices.pop();
                }
                ;
                function writeCommentRangeWithMap(comment, writer) {
                    recordSourceMapSpan(comment.pos);
                    writeCommentRange(comment, writer);
                    recordSourceMapSpan(comment.end);
                }
                function serializeSourceMapContents(version, file, sourceRoot, sources, names, mappings) {
                    if (typeof JSON !== "undefined") {
                        return JSON.stringify({
                            version: version,
                            file: file,
                            sourceRoot: sourceRoot,
                            sources: sources,
                            names: names,
                            mappings: mappings
                        });
                    }
                    return "{\"version\":" + version + ",\"file\":\"" + ts.escapeString(file) + "\",\"sourceRoot\":\"" + ts.escapeString(sourceRoot) + "\",\"sources\":[" + serializeStringArray(sources) + "],\"names\":[" + serializeStringArray(names) + "],\"mappings\":\"" + ts.escapeString(mappings) + "\"}";
                    function serializeStringArray(list) {
                        var output = "";
                        for (var i = 0, n = list.length; i < n; i++) {
                            if (i) {
                                output += ",";
                            }
                            output += "\"" + ts.escapeString(list[i]) + "\"";
                        }
                        return output;
                    }
                }
                function writeJavaScriptAndSourceMapFile(emitOutput, writeByteOrderMark) {
                    encodeLastRecordedSourceMapSpan();
                    writeFile(sourceMapData.sourceMapFilePath, serializeSourceMapContents(3, sourceMapData.sourceMapFile, sourceMapData.sourceMapSourceRoot, sourceMapData.sourceMapSources, sourceMapData.sourceMapNames, sourceMapData.sourceMapMappings), false);
                    sourceMapDataList.push(sourceMapData);
                    writeJavaScriptFile(emitOutput + "//# sourceMappingURL=" + sourceMapData.jsSourceMappingURL, writeByteOrderMark);
                }
                var sourceMapJsFile = ts.getBaseFilename(ts.normalizeSlashes(jsFilePath));
                sourceMapData = {
                    sourceMapFilePath: jsFilePath + ".map",
                    jsSourceMappingURL: sourceMapJsFile + ".map",
                    sourceMapFile: sourceMapJsFile,
                    sourceMapSourceRoot: compilerOptions.sourceRoot || "",
                    sourceMapSources: [],
                    inputSourceFileNames: [],
                    sourceMapNames: [],
                    sourceMapMappings: "",
                    sourceMapDecodedMappings: []
                };
                sourceMapData.sourceMapSourceRoot = ts.normalizeSlashes(sourceMapData.sourceMapSourceRoot);
                if (sourceMapData.sourceMapSourceRoot.length && sourceMapData.sourceMapSourceRoot.charCodeAt(sourceMapData.sourceMapSourceRoot.length - 1) !== 47 /* slash */) {
                    sourceMapData.sourceMapSourceRoot += ts.directorySeparator;
                }
                if (compilerOptions.mapRoot) {
                    sourceMapDir = ts.normalizeSlashes(compilerOptions.mapRoot);
                    if (root) {
                        sourceMapDir = ts.getDirectoryPath(getSourceFilePathInNewDir(sourceMapDir, root));
                    }
                    if (!ts.isRootedDiskPath(sourceMapDir) && !ts.isUrl(sourceMapDir)) {
                        sourceMapDir = ts.combinePaths(program.getCommonSourceDirectory(), sourceMapDir);
                        sourceMapData.jsSourceMappingURL = ts.getRelativePathToDirectoryOrUrl(ts.getDirectoryPath(ts.normalizePath(jsFilePath)), ts.combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL), compilerHost.getCurrentDirectory(), compilerHost.getCanonicalFileName, true);
                    }
                    else {
                        sourceMapData.jsSourceMappingURL = ts.combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL);
                    }
                }
                else {
                    sourceMapDir = ts.getDirectoryPath(ts.normalizePath(jsFilePath));
                }
                function emitNodeWithMap(node) {
                    if (node) {
                        if (node.kind != 193 /* SourceFile */) {
                            recordEmitNodeStartSpan(node);
                            emitNode(node);
                            recordEmitNodeEndSpan(node);
                        }
                        else {
                            recordNewSourceFileStart(node);
                            emitNode(node);
                        }
                    }
                }
                writeEmittedFiles = writeJavaScriptAndSourceMapFile;
                emit = emitNodeWithMap;
                emitStart = recordEmitNodeStartSpan;
                emitEnd = recordEmitNodeEndSpan;
                emitToken = writeTextWithSpanRecord;
                scopeEmitStart = recordScopeNameOfNode;
                scopeEmitEnd = recordScopeNameEnd;
                writeComment = writeCommentRangeWithMap;
            }
            function writeJavaScriptFile(emitOutput, writeByteOrderMark) {
                writeFile(jsFilePath, emitOutput, writeByteOrderMark);
            }
            function emitTokenText(tokenKind, startPos, emitFn) {
                var tokenString = ts.tokenToString(tokenKind);
                if (emitFn) {
                    emitFn();
                }
                else {
                    write(tokenString);
                }
                return startPos + tokenString.length;
            }
            function emitOptional(prefix, node) {
                if (node) {
                    write(prefix);
                    emit(node);
                }
            }
            function emitTrailingCommaIfPresent(nodeList, isMultiline) {
                if (nodeList.hasTrailingComma) {
                    write(",");
                    if (isMultiline) {
                        writeLine();
                    }
                }
            }
            function emitCommaList(nodes, includeTrailingComma, count) {
                if (!(count >= 0)) {
                    count = nodes.length;
                }
                if (nodes) {
                    for (var i = 0; i < count; i++) {
                        if (i) {
                            write(", ");
                        }
                        emit(nodes[i]);
                    }
                    if (includeTrailingComma) {
                        emitTrailingCommaIfPresent(nodes, false);
                    }
                }
            }
            function emitMultiLineList(nodes, includeTrailingComma) {
                if (nodes) {
                    for (var i = 0; i < nodes.length; i++) {
                        if (i) {
                            write(",");
                        }
                        writeLine();
                        emit(nodes[i]);
                    }
                    if (includeTrailingComma) {
                        emitTrailingCommaIfPresent(nodes, true);
                    }
                }
            }
            function emitLines(nodes) {
                emitLinesStartingAt(nodes, 0);
            }
            function emitLinesStartingAt(nodes, startIndex) {
                for (var i = startIndex; i < nodes.length; i++) {
                    writeLine();
                    emit(nodes[i]);
                }
            }
            function emitLiteral(node) {
                var text = getLiteralText();
                if (compilerOptions.sourceMap && (node.kind === 7 /* StringLiteral */ || ts.isTemplateLiteralKind(node.kind))) {
                    writer.writeLiteral(text);
                }
                else {
                    write(text);
                }
                function getLiteralText() {
                    if (compilerOptions.target < 2 /* ES6 */ && ts.isTemplateLiteralKind(node.kind)) {
                        return getTemplateLiteralAsStringLiteral(node);
                    }
                    return getSourceTextOfLocalNode(node);
                }
            }
            function getTemplateLiteralAsStringLiteral(node) {
                return '"' + ts.escapeString(node.text) + '"';
            }
            function emitTemplateExpression(node) {
                if (compilerOptions.target >= 2 /* ES6 */) {
                    ts.forEachChild(node, emit);
                    return;
                }
                ts.Debug.assert(node.parent.kind !== 146 /* TaggedTemplateExpression */);
                var templateNeedsParens = ts.isExpression(node.parent) && node.parent.kind !== 148 /* ParenExpression */ && comparePrecedenceToBinaryPlus(node.parent) !== -1 /* LessThan */;
                if (templateNeedsParens) {
                    write("(");
                }
                emitLiteral(node.head);
                ts.forEach(node.templateSpans, function (templateSpan) {
                    var needsParens = templateSpan.expression.kind !== 148 /* ParenExpression */ && comparePrecedenceToBinaryPlus(templateSpan.expression) !== 1 /* GreaterThan */;
                    write(" + ");
                    if (needsParens) {
                        write("(");
                    }
                    emit(templateSpan.expression);
                    if (needsParens) {
                        write(")");
                    }
                    if (templateSpan.literal.text.length !== 0) {
                        write(" + ");
                        emitLiteral(templateSpan.literal);
                    }
                });
                if (templateNeedsParens) {
                    write(")");
                }
                function comparePrecedenceToBinaryPlus(expression) {
                    ts.Debug.assert(compilerOptions.target <= 1 /* ES5 */);
                    switch (expression.kind) {
                        case 153 /* BinaryExpression */:
                            switch (expression.operator) {
                                case 34 /* AsteriskToken */:
                                case 35 /* SlashToken */:
                                case 36 /* PercentToken */:
                                    return 1 /* GreaterThan */;
                                case 32 /* PlusToken */:
                                    return 0 /* EqualTo */;
                                default:
                                    return -1 /* LessThan */;
                            }
                        case 154 /* ConditionalExpression */:
                            return -1 /* LessThan */;
                        default:
                            return 1 /* GreaterThan */;
                    }
                }
            }
            function emitTemplateSpan(span) {
                emit(span.expression);
                emit(span.literal);
            }
            function emitQuotedIdentifier(node) {
                if (node.kind === 7 /* StringLiteral */) {
                    emitLiteral(node);
                }
                else {
                    write("\"");
                    if (node.kind === 6 /* NumericLiteral */) {
                        write(node.text);
                    }
                    else {
                        write(getSourceTextOfLocalNode(node));
                    }
                    write("\"");
                }
            }
            function isNonExpressionIdentifier(node) {
                var parent = node.parent;
                switch (parent.kind) {
                    case 123 /* Parameter */:
                    case 181 /* VariableDeclaration */:
                    case 124 /* Property */:
                    case 141 /* PropertyAssignment */:
                    case 192 /* EnumMember */:
                    case 125 /* Method */:
                    case 182 /* FunctionDeclaration */:
                    case 127 /* GetAccessor */:
                    case 128 /* SetAccessor */:
                    case 149 /* FunctionExpression */:
                    case 184 /* ClassDeclaration */:
                    case 185 /* InterfaceDeclaration */:
                    case 187 /* EnumDeclaration */:
                    case 188 /* ModuleDeclaration */:
                    case 190 /* ImportDeclaration */:
                        return parent.name === node;
                    case 168 /* BreakStatement */:
                    case 167 /* ContinueStatement */:
                    case 191 /* ExportAssignment */:
                        return false;
                    case 174 /* LabeledStatement */:
                        return node.parent.label === node;
                    case 178 /* CatchBlock */:
                        return node.parent.variable === node;
                }
            }
            function emitIdentifier(node) {
                if (!isNonExpressionIdentifier(node)) {
                    var prefix = resolver.getExpressionNamePrefix(node);
                    if (prefix) {
                        write(prefix);
                        write(".");
                    }
                }
                write(getSourceTextOfLocalNode(node));
            }
            function emitThis(node) {
                if (resolver.getNodeCheckFlags(node) & 2 /* LexicalThis */) {
                    write("_this");
                }
                else {
                    write("this");
                }
            }
            function emitSuper(node) {
                var flags = resolver.getNodeCheckFlags(node);
                if (flags & 16 /* SuperInstance */) {
                    write("_super.prototype");
                }
                else if (flags & 32 /* SuperStatic */) {
                    write("_super");
                }
                else {
                    write("super");
                }
            }
            function emitArrayLiteral(node) {
                if (node.flags & 256 /* MultiLine */) {
                    write("[");
                    increaseIndent();
                    emitMultiLineList(node.elements, true);
                    decreaseIndent();
                    writeLine();
                    write("]");
                }
                else {
                    write("[");
                    emitCommaList(node.elements, true);
                    write("]");
                }
            }
            function emitObjectLiteral(node) {
                if (!node.properties.length) {
                    write("{}");
                }
                else if (node.flags & 256 /* MultiLine */) {
                    write("{");
                    increaseIndent();
                    emitMultiLineList(node.properties, compilerOptions.target >= 1 /* ES5 */);
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
                else {
                    write("{ ");
                    emitCommaList(node.properties, compilerOptions.target >= 1 /* ES5 */);
                    write(" }");
                }
            }
            function emitPropertyAssignment(node) {
                emitLeadingComments(node);
                emit(node.name);
                write(": ");
                emit(node.initializer);
                emitTrailingComments(node);
            }
            function tryEmitConstantValue(node) {
                var constantValue = resolver.getConstantValue(node);
                if (constantValue !== undefined) {
                    var propertyName = node.kind === 142 /* PropertyAccess */ ? ts.identifierToString(node.right) : ts.getTextOfNode(node.index);
                    write(constantValue.toString() + " /* " + propertyName + " */");
                    return true;
                }
                return false;
            }
            function emitPropertyAccess(node) {
                if (tryEmitConstantValue(node)) {
                    return;
                }
                emit(node.left);
                write(".");
                emit(node.right);
            }
            function emitIndexedAccess(node) {
                if (tryEmitConstantValue(node)) {
                    return;
                }
                emit(node.object);
                write("[");
                emit(node.index);
                write("]");
            }
            function emitCallExpression(node) {
                var superCall = false;
                if (node.func.kind === 89 /* SuperKeyword */) {
                    write("_super");
                    superCall = true;
                }
                else {
                    emit(node.func);
                    superCall = node.func.kind === 142 /* PropertyAccess */ && node.func.left.kind === 89 /* SuperKeyword */;
                }
                if (superCall) {
                    write(".call(");
                    emitThis(node.func);
                    if (node.arguments.length) {
                        write(", ");
                        emitCommaList(node.arguments, false);
                    }
                    write(")");
                }
                else {
                    write("(");
                    emitCommaList(node.arguments, false);
                    write(")");
                }
            }
            function emitNewExpression(node) {
                write("new ");
                emit(node.func);
                if (node.arguments) {
                    write("(");
                    emitCommaList(node.arguments, false);
                    write(")");
                }
            }
            function emitTaggedTemplateExpression(node) {
                ts.Debug.assert(compilerOptions.target >= 2 /* ES6 */, "Trying to emit a tagged template in pre-ES6 mode.");
                emit(node.tag);
                write(" ");
                emit(node.template);
            }
            function emitParenExpression(node) {
                if (node.expression.kind === 147 /* TypeAssertion */) {
                    var operand = node.expression.operand;
                    while (operand.kind == 147 /* TypeAssertion */) {
                        operand = operand.operand;
                    }
                    if (operand.kind !== 151 /* PrefixOperator */ && operand.kind !== 152 /* PostfixOperator */ && operand.kind !== 145 /* NewExpression */ && !(operand.kind === 144 /* CallExpression */ && node.parent.kind === 145 /* NewExpression */) && !(operand.kind === 149 /* FunctionExpression */ && node.parent.kind === 144 /* CallExpression */)) {
                        emit(operand);
                        return;
                    }
                }
                write("(");
                emit(node.expression);
                write(")");
            }
            function emitUnaryExpression(node) {
                if (node.kind === 151 /* PrefixOperator */) {
                    write(ts.tokenToString(node.operator));
                }
                if (node.operator >= 63 /* Identifier */) {
                    write(" ");
                }
                else if (node.kind === 151 /* PrefixOperator */ && node.operand.kind === 151 /* PrefixOperator */) {
                    var operand = node.operand;
                    if (node.operator === 32 /* PlusToken */ && (operand.operator === 32 /* PlusToken */ || operand.operator === 37 /* PlusPlusToken */)) {
                        write(" ");
                    }
                    else if (node.operator === 33 /* MinusToken */ && (operand.operator === 33 /* MinusToken */ || operand.operator === 38 /* MinusMinusToken */)) {
                        write(" ");
                    }
                }
                emit(node.operand);
                if (node.kind === 152 /* PostfixOperator */) {
                    write(ts.tokenToString(node.operator));
                }
            }
            function emitBinaryExpression(node) {
                emit(node.left);
                if (node.operator !== 22 /* CommaToken */)
                    write(" ");
                write(ts.tokenToString(node.operator));
                write(" ");
                emit(node.right);
            }
            function emitConditionalExpression(node) {
                emit(node.condition);
                write(" ? ");
                emit(node.whenTrue);
                write(" : ");
                emit(node.whenFalse);
            }
            function emitBlock(node) {
                emitToken(13 /* OpenBraceToken */, node.pos);
                increaseIndent();
                scopeEmitStart(node.parent);
                if (node.kind === 189 /* ModuleBlock */) {
                    ts.Debug.assert(node.parent.kind === 188 /* ModuleDeclaration */);
                    emitCaptureThisForNodeIfNecessary(node.parent);
                }
                emitLines(node.statements);
                decreaseIndent();
                writeLine();
                emitToken(14 /* CloseBraceToken */, node.statements.end);
                scopeEmitEnd();
            }
            function emitEmbeddedStatement(node) {
                if (node.kind === 158 /* Block */) {
                    write(" ");
                    emit(node);
                }
                else {
                    increaseIndent();
                    writeLine();
                    emit(node);
                    decreaseIndent();
                }
            }
            function emitExpressionStatement(node) {
                var isArrowExpression = node.expression.kind === 150 /* ArrowFunction */;
                emitLeadingComments(node);
                if (isArrowExpression)
                    write("(");
                emit(node.expression);
                if (isArrowExpression)
                    write(")");
                write(";");
                emitTrailingComments(node);
            }
            function emitIfStatement(node) {
                emitLeadingComments(node);
                var endPos = emitToken(82 /* IfKeyword */, node.pos);
                write(" ");
                endPos = emitToken(15 /* OpenParenToken */, endPos);
                emit(node.expression);
                emitToken(16 /* CloseParenToken */, node.expression.end);
                emitEmbeddedStatement(node.thenStatement);
                if (node.elseStatement) {
                    writeLine();
                    emitToken(74 /* ElseKeyword */, node.thenStatement.end);
                    if (node.elseStatement.kind === 162 /* IfStatement */) {
                        write(" ");
                        emit(node.elseStatement);
                    }
                    else {
                        emitEmbeddedStatement(node.elseStatement);
                    }
                }
                emitTrailingComments(node);
            }
            function emitDoStatement(node) {
                write("do");
                emitEmbeddedStatement(node.statement);
                if (node.statement.kind === 158 /* Block */) {
                    write(" ");
                }
                else {
                    writeLine();
                }
                write("while (");
                emit(node.expression);
                write(");");
            }
            function emitWhileStatement(node) {
                write("while (");
                emit(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }
            function emitForStatement(node) {
                var endPos = emitToken(80 /* ForKeyword */, node.pos);
                write(" ");
                endPos = emitToken(15 /* OpenParenToken */, endPos);
                if (node.declarations) {
                    if (node.declarations[0] && node.declarations[0].flags & 2048 /* Let */) {
                        emitToken(102 /* LetKeyword */, endPos);
                    }
                    else if (node.declarations[0] && node.declarations[0].flags & 4096 /* Const */) {
                        emitToken(68 /* ConstKeyword */, endPos);
                    }
                    else {
                        emitToken(96 /* VarKeyword */, endPos);
                    }
                    write(" ");
                    emitCommaList(node.declarations, false);
                }
                if (node.initializer) {
                    emit(node.initializer);
                }
                write(";");
                emitOptional(" ", node.condition);
                write(";");
                emitOptional(" ", node.iterator);
                write(")");
                emitEmbeddedStatement(node.statement);
            }
            function emitForInStatement(node) {
                var endPos = emitToken(80 /* ForKeyword */, node.pos);
                write(" ");
                endPos = emitToken(15 /* OpenParenToken */, endPos);
                if (node.declaration) {
                    if (node.declaration.flags & 2048 /* Let */) {
                        emitToken(102 /* LetKeyword */, endPos);
                    }
                    else {
                        emitToken(96 /* VarKeyword */, endPos);
                    }
                    write(" ");
                    emit(node.declaration);
                }
                else {
                    emit(node.variable);
                }
                write(" in ");
                emit(node.expression);
                emitToken(16 /* CloseParenToken */, node.expression.end);
                emitEmbeddedStatement(node.statement);
            }
            function emitBreakOrContinueStatement(node) {
                emitToken(node.kind === 168 /* BreakStatement */ ? 64 /* BreakKeyword */ : 69 /* ContinueKeyword */, node.pos);
                emitOptional(" ", node.label);
                write(";");
            }
            function emitReturnStatement(node) {
                emitLeadingComments(node);
                emitToken(88 /* ReturnKeyword */, node.pos);
                emitOptional(" ", node.expression);
                write(";");
                emitTrailingComments(node);
            }
            function emitWithStatement(node) {
                write("with (");
                emit(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }
            function emitSwitchStatement(node) {
                var endPos = emitToken(90 /* SwitchKeyword */, node.pos);
                write(" ");
                emitToken(15 /* OpenParenToken */, endPos);
                emit(node.expression);
                endPos = emitToken(16 /* CloseParenToken */, node.expression.end);
                write(" ");
                emitToken(13 /* OpenBraceToken */, endPos);
                increaseIndent();
                emitLines(node.clauses);
                decreaseIndent();
                writeLine();
                emitToken(14 /* CloseBraceToken */, node.clauses.end);
            }
            function isOnSameLine(node1, node2) {
                return getLineOfLocalPosition(ts.skipTrivia(currentSourceFile.text, node1.pos)) === getLineOfLocalPosition(ts.skipTrivia(currentSourceFile.text, node2.pos));
            }
            function emitCaseOrDefaultClause(node) {
                if (node.kind === 172 /* CaseClause */) {
                    write("case ");
                    emit(node.expression);
                    write(":");
                }
                else {
                    write("default:");
                }
                if (node.statements.length === 1 && isOnSameLine(node, node.statements[0])) {
                    write(" ");
                    emit(node.statements[0]);
                }
                else {
                    increaseIndent();
                    emitLines(node.statements);
                    decreaseIndent();
                }
            }
            function emitThrowStatement(node) {
                write("throw ");
                emit(node.expression);
                write(";");
            }
            function emitTryStatement(node) {
                write("try ");
                emit(node.tryBlock);
                emit(node.catchBlock);
                if (node.finallyBlock) {
                    writeLine();
                    write("finally ");
                    emit(node.finallyBlock);
                }
            }
            function emitCatchBlock(node) {
                writeLine();
                var endPos = emitToken(66 /* CatchKeyword */, node.pos);
                write(" ");
                emitToken(15 /* OpenParenToken */, endPos);
                emit(node.variable);
                emitToken(16 /* CloseParenToken */, node.variable.end);
                write(" ");
                emitBlock(node);
            }
            function emitDebuggerStatement(node) {
                emitToken(70 /* DebuggerKeyword */, node.pos);
                write(";");
            }
            function emitLabelledStatement(node) {
                emit(node.label);
                write(": ");
                emit(node.statement);
            }
            function getContainingModule(node) {
                do {
                    node = node.parent;
                } while (node && node.kind !== 188 /* ModuleDeclaration */);
                return node;
            }
            function emitModuleMemberName(node) {
                emitStart(node.name);
                if (node.flags & 1 /* Export */) {
                    var container = getContainingModule(node);
                    write(container ? resolver.getLocalNameOfContainer(container) : "exports");
                    write(".");
                }
                emitNode(node.name);
                emitEnd(node.name);
            }
            function emitVariableDeclaration(node) {
                emitLeadingComments(node);
                emitModuleMemberName(node);
                emitOptional(" = ", node.initializer);
                emitTrailingComments(node);
            }
            function emitVariableStatement(node) {
                emitLeadingComments(node);
                if (!(node.flags & 1 /* Export */)) {
                    if (node.flags & 2048 /* Let */) {
                        write("let ");
                    }
                    else if (node.flags & 4096 /* Const */) {
                        write("const ");
                    }
                    else {
                        write("var ");
                    }
                }
                emitCommaList(node.declarations, false);
                write(";");
                emitTrailingComments(node);
            }
            function emitParameter(node) {
                emitLeadingComments(node);
                emit(node.name);
                emitTrailingComments(node);
            }
            function emitDefaultValueAssignments(node) {
                ts.forEach(node.parameters, function (param) {
                    if (param.initializer) {
                        writeLine();
                        emitStart(param);
                        write("if (");
                        emitNode(param.name);
                        write(" === void 0)");
                        emitEnd(param);
                        write(" { ");
                        emitStart(param);
                        emitNode(param.name);
                        write(" = ");
                        emitNode(param.initializer);
                        emitEnd(param);
                        write("; }");
                    }
                });
            }
            function emitRestParameter(node) {
                if (ts.hasRestParameters(node)) {
                    var restIndex = node.parameters.length - 1;
                    var restParam = node.parameters[restIndex];
                    writeLine();
                    emitLeadingComments(restParam);
                    emitStart(restParam);
                    write("var ");
                    emitNode(restParam.name);
                    write(" = [];");
                    emitEnd(restParam);
                    emitTrailingComments(restParam);
                    writeLine();
                    write("for (");
                    emitStart(restParam);
                    write("var _i = " + restIndex + ";");
                    emitEnd(restParam);
                    write(" ");
                    emitStart(restParam);
                    write("_i < arguments.length;");
                    emitEnd(restParam);
                    write(" ");
                    emitStart(restParam);
                    write("_i++");
                    emitEnd(restParam);
                    write(") {");
                    increaseIndent();
                    writeLine();
                    emitStart(restParam);
                    emitNode(restParam.name);
                    write("[_i - " + restIndex + "] = arguments[_i];");
                    emitEnd(restParam);
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
            }
            function emitAccessor(node) {
                emitLeadingComments(node);
                write(node.kind === 127 /* GetAccessor */ ? "get " : "set ");
                emit(node.name);
                emitSignatureAndBody(node);
                emitTrailingComments(node);
            }
            function emitFunctionDeclaration(node) {
                if (!node.body) {
                    return emitPinnedOrTripleSlashComments(node);
                }
                if (node.kind !== 125 /* Method */) {
                    emitLeadingComments(node);
                }
                write("function ");
                if (node.kind === 182 /* FunctionDeclaration */ || (node.kind === 149 /* FunctionExpression */ && node.name)) {
                    emit(node.name);
                }
                emitSignatureAndBody(node);
                if (node.kind !== 125 /* Method */) {
                    emitTrailingComments(node);
                }
            }
            function emitCaptureThisForNodeIfNecessary(node) {
                if (resolver.getNodeCheckFlags(node) & 4 /* CaptureThis */) {
                    writeLine();
                    emitStart(node);
                    write("var _this = this;");
                    emitEnd(node);
                }
            }
            function emitSignatureParameters(node) {
                increaseIndent();
                write("(");
                if (node) {
                    emitCommaList(node.parameters, false, node.parameters.length - (ts.hasRestParameters(node) ? 1 : 0));
                }
                write(")");
                decreaseIndent();
            }
            function emitSignatureAndBody(node) {
                emitSignatureParameters(node);
                write(" {");
                scopeEmitStart(node);
                increaseIndent();
                emitDetachedComments(node.body.kind === 183 /* FunctionBlock */ ? node.body.statements : node.body);
                var startIndex = 0;
                if (node.body.kind === 183 /* FunctionBlock */) {
                    startIndex = emitDirectivePrologues(node.body.statements, true);
                }
                var outPos = writer.getTextPos();
                emitCaptureThisForNodeIfNecessary(node);
                emitDefaultValueAssignments(node);
                emitRestParameter(node);
                if (node.body.kind !== 183 /* FunctionBlock */ && outPos === writer.getTextPos()) {
                    decreaseIndent();
                    write(" ");
                    emitStart(node.body);
                    write("return ");
                    emitNode(node.body);
                    emitEnd(node.body);
                    write("; ");
                    emitStart(node.body);
                    write("}");
                    emitEnd(node.body);
                }
                else {
                    if (node.body.kind === 183 /* FunctionBlock */) {
                        emitLinesStartingAt(node.body.statements, startIndex);
                    }
                    else {
                        writeLine();
                        emitLeadingComments(node.body);
                        write("return ");
                        emit(node.body);
                        write(";");
                        emitTrailingComments(node.body);
                    }
                    writeLine();
                    if (node.body.kind === 183 /* FunctionBlock */) {
                        emitLeadingCommentsOfPosition(node.body.statements.end);
                        decreaseIndent();
                        emitToken(14 /* CloseBraceToken */, node.body.statements.end);
                    }
                    else {
                        decreaseIndent();
                        emitStart(node.body);
                        write("}");
                        emitEnd(node.body);
                    }
                }
                scopeEmitEnd();
                if (node.flags & 1 /* Export */) {
                    writeLine();
                    emitStart(node);
                    emitModuleMemberName(node);
                    write(" = ");
                    emit(node.name);
                    emitEnd(node);
                    write(";");
                }
            }
            function findInitialSuperCall(ctor) {
                if (ctor.body) {
                    var statement = ctor.body.statements[0];
                    if (statement && statement.kind === 161 /* ExpressionStatement */) {
                        var expr = statement.expression;
                        if (expr && expr.kind === 144 /* CallExpression */) {
                            var func = expr.func;
                            if (func && func.kind === 89 /* SuperKeyword */) {
                                return statement;
                            }
                        }
                    }
                }
            }
            function emitParameterPropertyAssignments(node) {
                ts.forEach(node.parameters, function (param) {
                    if (param.flags & 112 /* AccessibilityModifier */) {
                        writeLine();
                        emitStart(param);
                        emitStart(param.name);
                        write("this.");
                        emitNode(param.name);
                        emitEnd(param.name);
                        write(" = ");
                        emit(param.name);
                        write(";");
                        emitEnd(param);
                    }
                });
            }
            function emitMemberAccess(memberName) {
                if (memberName.kind === 7 /* StringLiteral */ || memberName.kind === 6 /* NumericLiteral */) {
                    write("[");
                    emitNode(memberName);
                    write("]");
                }
                else {
                    write(".");
                    emitNode(memberName);
                }
            }
            function emitMemberAssignments(node, staticFlag) {
                ts.forEach(node.members, function (member) {
                    if (member.kind === 124 /* Property */ && (member.flags & 128 /* Static */) === staticFlag && member.initializer) {
                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        emitStart(member.name);
                        if (staticFlag) {
                            emitNode(node.name);
                        }
                        else {
                            write("this");
                        }
                        emitMemberAccess(member.name);
                        emitEnd(member.name);
                        write(" = ");
                        emit(member.initializer);
                        write(";");
                        emitEnd(member);
                        emitTrailingComments(member);
                    }
                });
            }
            function emitMemberFunctions(node) {
                ts.forEach(node.members, function (member) {
                    if (member.kind === 125 /* Method */) {
                        if (!member.body) {
                            return emitPinnedOrTripleSlashComments(member);
                        }
                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        emitStart(member.name);
                        emitNode(node.name);
                        if (!(member.flags & 128 /* Static */)) {
                            write(".prototype");
                        }
                        emitMemberAccess(member.name);
                        emitEnd(member.name);
                        write(" = ");
                        emitStart(member);
                        emitFunctionDeclaration(member);
                        emitEnd(member);
                        emitEnd(member);
                        write(";");
                        emitTrailingComments(member);
                    }
                    else if (member.kind === 127 /* GetAccessor */ || member.kind === 128 /* SetAccessor */) {
                        var accessors = getAllAccessorDeclarations(node, member);
                        if (member === accessors.firstAccessor) {
                            writeLine();
                            emitStart(member);
                            write("Object.defineProperty(");
                            emitStart(member.name);
                            emitNode(node.name);
                            if (!(member.flags & 128 /* Static */)) {
                                write(".prototype");
                            }
                            write(", ");
                            emitQuotedIdentifier(member.name);
                            emitEnd(member.name);
                            write(", {");
                            increaseIndent();
                            if (accessors.getAccessor) {
                                writeLine();
                                emitLeadingComments(accessors.getAccessor);
                                write("get: ");
                                emitStart(accessors.getAccessor);
                                write("function ");
                                emitSignatureAndBody(accessors.getAccessor);
                                emitEnd(accessors.getAccessor);
                                emitTrailingComments(accessors.getAccessor);
                                write(",");
                            }
                            if (accessors.setAccessor) {
                                writeLine();
                                emitLeadingComments(accessors.setAccessor);
                                write("set: ");
                                emitStart(accessors.setAccessor);
                                write("function ");
                                emitSignatureAndBody(accessors.setAccessor);
                                emitEnd(accessors.setAccessor);
                                emitTrailingComments(accessors.setAccessor);
                                write(",");
                            }
                            writeLine();
                            write("enumerable: true,");
                            writeLine();
                            write("configurable: true");
                            decreaseIndent();
                            writeLine();
                            write("});");
                            emitEnd(member);
                        }
                    }
                });
            }
            function emitClassDeclaration(node) {
                emitLeadingComments(node);
                write("var ");
                emit(node.name);
                write(" = (function (");
                if (node.baseType) {
                    write("_super");
                }
                write(") {");
                increaseIndent();
                scopeEmitStart(node);
                if (node.baseType) {
                    writeLine();
                    emitStart(node.baseType);
                    write("__extends(");
                    emit(node.name);
                    write(", _super);");
                    emitEnd(node.baseType);
                }
                writeLine();
                emitConstructorOfClass();
                emitMemberFunctions(node);
                emitMemberAssignments(node, 128 /* Static */);
                writeLine();
                function emitClassReturnStatement() {
                    write("return ");
                    emitNode(node.name);
                }
                emitToken(14 /* CloseBraceToken */, node.members.end, emitClassReturnStatement);
                write(";");
                decreaseIndent();
                writeLine();
                emitToken(14 /* CloseBraceToken */, node.members.end);
                scopeEmitEnd();
                emitStart(node);
                write(")(");
                if (node.baseType) {
                    emit(node.baseType.typeName);
                }
                write(");");
                emitEnd(node);
                if (node.flags & 1 /* Export */) {
                    writeLine();
                    emitStart(node);
                    emitModuleMemberName(node);
                    write(" = ");
                    emit(node.name);
                    emitEnd(node);
                    write(";");
                }
                emitTrailingComments(node);
                function emitConstructorOfClass() {
                    ts.forEach(node.members, function (member) {
                        if (member.kind === 126 /* Constructor */ && !member.body) {
                            emitPinnedOrTripleSlashComments(member);
                        }
                    });
                    var ctor = getFirstConstructorWithBody(node);
                    if (ctor) {
                        emitLeadingComments(ctor);
                    }
                    emitStart(ctor || node);
                    write("function ");
                    emit(node.name);
                    emitSignatureParameters(ctor);
                    write(" {");
                    scopeEmitStart(node, "constructor");
                    increaseIndent();
                    if (ctor) {
                        emitDetachedComments(ctor.body.statements);
                    }
                    emitCaptureThisForNodeIfNecessary(node);
                    if (ctor) {
                        emitDefaultValueAssignments(ctor);
                        emitRestParameter(ctor);
                        if (node.baseType) {
                            var superCall = findInitialSuperCall(ctor);
                            if (superCall) {
                                writeLine();
                                emit(superCall);
                            }
                        }
                        emitParameterPropertyAssignments(ctor);
                    }
                    else {
                        if (node.baseType) {
                            writeLine();
                            emitStart(node.baseType);
                            write("_super.apply(this, arguments);");
                            emitEnd(node.baseType);
                        }
                    }
                    emitMemberAssignments(node, 0);
                    if (ctor) {
                        var statements = ctor.body.statements;
                        if (superCall)
                            statements = statements.slice(1);
                        emitLines(statements);
                    }
                    writeLine();
                    if (ctor) {
                        emitLeadingCommentsOfPosition(ctor.body.statements.end);
                    }
                    decreaseIndent();
                    emitToken(14 /* CloseBraceToken */, ctor ? ctor.body.statements.end : node.members.end);
                    scopeEmitEnd();
                    emitEnd(ctor || node);
                    if (ctor) {
                        emitTrailingComments(ctor);
                    }
                }
            }
            function emitInterfaceDeclaration(node) {
                emitPinnedOrTripleSlashComments(node);
            }
            function emitEnumDeclaration(node) {
                var isConstEnum = ts.isConstEnumDeclaration(node);
                if (isConstEnum && !compilerOptions.preserveConstEnums) {
                    return;
                }
                emitLeadingComments(node);
                if (!(node.flags & 1 /* Export */)) {
                    emitStart(node);
                    write("var ");
                    emit(node.name);
                    emitEnd(node);
                    write(";");
                }
                writeLine();
                emitStart(node);
                write("(function (");
                emitStart(node.name);
                write(resolver.getLocalNameOfContainer(node));
                emitEnd(node.name);
                write(") {");
                increaseIndent();
                scopeEmitStart(node);
                emitEnumMemberDeclarations(isConstEnum);
                decreaseIndent();
                writeLine();
                emitToken(14 /* CloseBraceToken */, node.members.end);
                scopeEmitEnd();
                write(")(");
                emitModuleMemberName(node);
                write(" || (");
                emitModuleMemberName(node);
                write(" = {}));");
                emitEnd(node);
                if (node.flags & 1 /* Export */) {
                    writeLine();
                    emitStart(node);
                    write("var ");
                    emit(node.name);
                    write(" = ");
                    emitModuleMemberName(node);
                    emitEnd(node);
                    write(";");
                }
                emitTrailingComments(node);
                function emitEnumMemberDeclarations(isConstEnum) {
                    ts.forEach(node.members, function (member) {
                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        write(resolver.getLocalNameOfContainer(node));
                        write("[");
                        write(resolver.getLocalNameOfContainer(node));
                        write("[");
                        emitQuotedIdentifier(member.name);
                        write("] = ");
                        if (member.initializer && !isConstEnum) {
                            emit(member.initializer);
                        }
                        else {
                            write(resolver.getEnumMemberValue(member).toString());
                        }
                        write("] = ");
                        emitQuotedIdentifier(member.name);
                        emitEnd(member);
                        write(";");
                        emitTrailingComments(member);
                    });
                }
            }
            function getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration) {
                if (moduleDeclaration.body.kind === 188 /* ModuleDeclaration */) {
                    var recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration.body);
                    return recursiveInnerModule || moduleDeclaration.body;
                }
            }
            function emitModuleDeclaration(node) {
                if (ts.getModuleInstanceState(node) !== 1 /* Instantiated */) {
                    return emitPinnedOrTripleSlashComments(node);
                }
                emitLeadingComments(node);
                emitStart(node);
                write("var ");
                emit(node.name);
                write(";");
                emitEnd(node);
                writeLine();
                emitStart(node);
                write("(function (");
                emitStart(node.name);
                write(resolver.getLocalNameOfContainer(node));
                emitEnd(node.name);
                write(") ");
                if (node.body.kind === 189 /* ModuleBlock */) {
                    emit(node.body);
                }
                else {
                    write("{");
                    increaseIndent();
                    scopeEmitStart(node);
                    emitCaptureThisForNodeIfNecessary(node);
                    writeLine();
                    emit(node.body);
                    decreaseIndent();
                    writeLine();
                    var moduleBlock = getInnerMostModuleDeclarationFromDottedModule(node).body;
                    emitToken(14 /* CloseBraceToken */, moduleBlock.statements.end);
                    scopeEmitEnd();
                }
                write(")(");
                if (node.flags & 1 /* Export */) {
                    emit(node.name);
                    write(" = ");
                }
                emitModuleMemberName(node);
                write(" || (");
                emitModuleMemberName(node);
                write(" = {}));");
                emitEnd(node);
                emitTrailingComments(node);
            }
            function emitImportDeclaration(node) {
                var emitImportDeclaration = resolver.isReferencedImportDeclaration(node);
                if (!emitImportDeclaration) {
                    emitImportDeclaration = !ts.isExternalModule(currentSourceFile) && resolver.isTopLevelValueImportWithEntityName(node);
                }
                if (emitImportDeclaration) {
                    if (node.externalModuleName && node.parent.kind === 193 /* SourceFile */ && compilerOptions.module === 2 /* AMD */) {
                        if (node.flags & 1 /* Export */) {
                            writeLine();
                            emitLeadingComments(node);
                            emitStart(node);
                            emitModuleMemberName(node);
                            write(" = ");
                            emit(node.name);
                            write(";");
                            emitEnd(node);
                            emitTrailingComments(node);
                        }
                    }
                    else {
                        writeLine();
                        emitLeadingComments(node);
                        emitStart(node);
                        if (!(node.flags & 1 /* Export */))
                            write("var ");
                        emitModuleMemberName(node);
                        write(" = ");
                        if (node.entityName) {
                            emit(node.entityName);
                        }
                        else {
                            write("require(");
                            emitStart(node.externalModuleName);
                            emitLiteral(node.externalModuleName);
                            emitEnd(node.externalModuleName);
                            emitToken(16 /* CloseParenToken */, node.externalModuleName.end);
                        }
                        write(";");
                        emitEnd(node);
                        emitTrailingComments(node);
                    }
                }
            }
            function getExternalImportDeclarations(node) {
                var result = [];
                ts.forEach(node.statements, function (stat) {
                    if (stat.kind === 190 /* ImportDeclaration */ && stat.externalModuleName && resolver.isReferencedImportDeclaration(stat)) {
                        result.push(stat);
                    }
                });
                return result;
            }
            function getFirstExportAssignment(sourceFile) {
                return ts.forEach(sourceFile.statements, function (node) {
                    if (node.kind === 191 /* ExportAssignment */) {
                        return node;
                    }
                });
            }
            function emitAMDModule(node, startIndex) {
                var imports = getExternalImportDeclarations(node);
                writeLine();
                write("define([\"require\", \"exports\"");
                ts.forEach(imports, function (imp) {
                    write(", ");
                    emitLiteral(imp.externalModuleName);
                });
                ts.forEach(node.amdDependencies, function (amdDependency) {
                    var text = "\"" + amdDependency + "\"";
                    write(", ");
                    write(text);
                });
                write("], function (require, exports");
                ts.forEach(imports, function (imp) {
                    write(", ");
                    emit(imp.name);
                });
                write(") {");
                increaseIndent();
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                var exportName = resolver.getExportAssignmentName(node);
                if (exportName) {
                    writeLine();
                    var exportAssignement = getFirstExportAssignment(node);
                    emitStart(exportAssignement);
                    write("return ");
                    emitStart(exportAssignement.exportName);
                    write(exportName);
                    emitEnd(exportAssignement.exportName);
                    write(";");
                    emitEnd(exportAssignement);
                }
                decreaseIndent();
                writeLine();
                write("});");
            }
            function emitCommonJSModule(node, startIndex) {
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                var exportName = resolver.getExportAssignmentName(node);
                if (exportName) {
                    writeLine();
                    var exportAssignement = getFirstExportAssignment(node);
                    emitStart(exportAssignement);
                    write("module.exports = ");
                    emitStart(exportAssignement.exportName);
                    write(exportName);
                    emitEnd(exportAssignement.exportName);
                    write(";");
                    emitEnd(exportAssignement);
                }
            }
            function emitDirectivePrologues(statements, startWithNewLine) {
                for (var i = 0; i < statements.length; ++i) {
                    if (ts.isPrologueDirective(statements[i])) {
                        if (startWithNewLine || i > 0) {
                            writeLine();
                        }
                        emit(statements[i]);
                    }
                    else {
                        return i;
                    }
                }
                return statements.length;
            }
            function emitSourceFile(node) {
                currentSourceFile = node;
                writeLine();
                emitDetachedComments(node);
                var startIndex = emitDirectivePrologues(node.statements, false);
                if (!extendsEmitted && resolver.getNodeCheckFlags(node) & 8 /* EmitExtends */) {
                    writeLine();
                    write("var __extends = this.__extends || function (d, b) {");
                    increaseIndent();
                    writeLine();
                    write("for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];");
                    writeLine();
                    write("function __() { this.constructor = d; }");
                    writeLine();
                    write("__.prototype = b.prototype;");
                    writeLine();
                    write("d.prototype = new __();");
                    decreaseIndent();
                    writeLine();
                    write("};");
                    extendsEmitted = true;
                }
                if (ts.isExternalModule(node)) {
                    if (compilerOptions.module === 2 /* AMD */) {
                        emitAMDModule(node, startIndex);
                    }
                    else {
                        emitCommonJSModule(node, startIndex);
                    }
                }
                else {
                    emitCaptureThisForNodeIfNecessary(node);
                    emitLinesStartingAt(node.statements, startIndex);
                }
            }
            function emitNode(node) {
                if (!node) {
                    return;
                }
                if (node.flags & 2 /* Ambient */) {
                    return emitPinnedOrTripleSlashComments(node);
                }
                switch (node.kind) {
                    case 63 /* Identifier */:
                        return emitIdentifier(node);
                    case 123 /* Parameter */:
                        return emitParameter(node);
                    case 127 /* GetAccessor */:
                    case 128 /* SetAccessor */:
                        return emitAccessor(node);
                    case 91 /* ThisKeyword */:
                        return emitThis(node);
                    case 89 /* SuperKeyword */:
                        return emitSuper(node);
                    case 87 /* NullKeyword */:
                        return write("null");
                    case 93 /* TrueKeyword */:
                        return write("true");
                    case 78 /* FalseKeyword */:
                        return write("false");
                    case 6 /* NumericLiteral */:
                    case 7 /* StringLiteral */:
                    case 8 /* RegularExpressionLiteral */:
                    case 9 /* NoSubstitutionTemplateLiteral */:
                    case 10 /* TemplateHead */:
                    case 11 /* TemplateMiddle */:
                    case 12 /* TemplateTail */:
                        return emitLiteral(node);
                    case 155 /* TemplateExpression */:
                        return emitTemplateExpression(node);
                    case 156 /* TemplateSpan */:
                        return emitTemplateSpan(node);
                    case 121 /* QualifiedName */:
                        return emitPropertyAccess(node);
                    case 139 /* ArrayLiteral */:
                        return emitArrayLiteral(node);
                    case 140 /* ObjectLiteral */:
                        return emitObjectLiteral(node);
                    case 141 /* PropertyAssignment */:
                        return emitPropertyAssignment(node);
                    case 142 /* PropertyAccess */:
                        return emitPropertyAccess(node);
                    case 143 /* IndexedAccess */:
                        return emitIndexedAccess(node);
                    case 144 /* CallExpression */:
                        return emitCallExpression(node);
                    case 145 /* NewExpression */:
                        return emitNewExpression(node);
                    case 146 /* TaggedTemplateExpression */:
                        return emitTaggedTemplateExpression(node);
                    case 147 /* TypeAssertion */:
                        return emit(node.operand);
                    case 148 /* ParenExpression */:
                        return emitParenExpression(node);
                    case 182 /* FunctionDeclaration */:
                    case 149 /* FunctionExpression */:
                    case 150 /* ArrowFunction */:
                        return emitFunctionDeclaration(node);
                    case 151 /* PrefixOperator */:
                    case 152 /* PostfixOperator */:
                        return emitUnaryExpression(node);
                    case 153 /* BinaryExpression */:
                        return emitBinaryExpression(node);
                    case 154 /* ConditionalExpression */:
                        return emitConditionalExpression(node);
                    case 157 /* OmittedExpression */:
                        return;
                    case 158 /* Block */:
                    case 177 /* TryBlock */:
                    case 179 /* FinallyBlock */:
                    case 183 /* FunctionBlock */:
                    case 189 /* ModuleBlock */:
                        return emitBlock(node);
                    case 159 /* VariableStatement */:
                        return emitVariableStatement(node);
                    case 160 /* EmptyStatement */:
                        return write(";");
                    case 161 /* ExpressionStatement */:
                        return emitExpressionStatement(node);
                    case 162 /* IfStatement */:
                        return emitIfStatement(node);
                    case 163 /* DoStatement */:
                        return emitDoStatement(node);
                    case 164 /* WhileStatement */:
                        return emitWhileStatement(node);
                    case 165 /* ForStatement */:
                        return emitForStatement(node);
                    case 166 /* ForInStatement */:
                        return emitForInStatement(node);
                    case 167 /* ContinueStatement */:
                    case 168 /* BreakStatement */:
                        return emitBreakOrContinueStatement(node);
                    case 169 /* ReturnStatement */:
                        return emitReturnStatement(node);
                    case 170 /* WithStatement */:
                        return emitWithStatement(node);
                    case 171 /* SwitchStatement */:
                        return emitSwitchStatement(node);
                    case 172 /* CaseClause */:
                    case 173 /* DefaultClause */:
                        return emitCaseOrDefaultClause(node);
                    case 174 /* LabeledStatement */:
                        return emitLabelledStatement(node);
                    case 175 /* ThrowStatement */:
                        return emitThrowStatement(node);
                    case 176 /* TryStatement */:
                        return emitTryStatement(node);
                    case 178 /* CatchBlock */:
                        return emitCatchBlock(node);
                    case 180 /* DebuggerStatement */:
                        return emitDebuggerStatement(node);
                    case 181 /* VariableDeclaration */:
                        return emitVariableDeclaration(node);
                    case 184 /* ClassDeclaration */:
                        return emitClassDeclaration(node);
                    case 185 /* InterfaceDeclaration */:
                        return emitInterfaceDeclaration(node);
                    case 187 /* EnumDeclaration */:
                        return emitEnumDeclaration(node);
                    case 188 /* ModuleDeclaration */:
                        return emitModuleDeclaration(node);
                    case 190 /* ImportDeclaration */:
                        return emitImportDeclaration(node);
                    case 193 /* SourceFile */:
                        return emitSourceFile(node);
                }
            }
            function hasDetachedComments(pos) {
                return detachedCommentsInfo !== undefined && detachedCommentsInfo[detachedCommentsInfo.length - 1].nodePos === pos;
            }
            function getLeadingCommentsWithoutDetachedComments() {
                var leadingComments = ts.getLeadingCommentRanges(currentSourceFile.text, detachedCommentsInfo[detachedCommentsInfo.length - 1].detachedCommentEndPos);
                if (detachedCommentsInfo.length - 1) {
                    detachedCommentsInfo.pop();
                }
                else {
                    detachedCommentsInfo = undefined;
                }
                return leadingComments;
            }
            function getLeadingCommentsToEmit(node) {
                if (node.parent.kind === 193 /* SourceFile */ || node.pos !== node.parent.pos) {
                    var leadingComments;
                    if (hasDetachedComments(node.pos)) {
                        leadingComments = getLeadingCommentsWithoutDetachedComments();
                    }
                    else {
                        leadingComments = ts.getLeadingCommentRangesOfNode(node, currentSourceFile);
                    }
                    return leadingComments;
                }
            }
            function emitLeadingDeclarationComments(node) {
                var leadingComments = getLeadingCommentsToEmit(node);
                emitNewLineBeforeLeadingComments(node, leadingComments, writer);
                emitComments(leadingComments, true, writer, writeComment);
            }
            function emitTrailingDeclarationComments(node) {
                if (node.parent.kind === 193 /* SourceFile */ || node.end !== node.parent.end) {
                    var trailingComments = ts.getTrailingCommentRanges(currentSourceFile.text, node.end);
                    emitComments(trailingComments, false, writer, writeComment);
                }
            }
            function emitLeadingCommentsOfLocalPosition(pos) {
                var leadingComments;
                if (hasDetachedComments(pos)) {
                    leadingComments = getLeadingCommentsWithoutDetachedComments();
                }
                else {
                    leadingComments = ts.getLeadingCommentRanges(currentSourceFile.text, pos);
                }
                emitNewLineBeforeLeadingComments({ pos: pos, end: pos }, leadingComments, writer);
                emitComments(leadingComments, true, writer, writeComment);
            }
            function emitDetachedCommentsAtPosition(node) {
                var leadingComments = ts.getLeadingCommentRanges(currentSourceFile.text, node.pos);
                if (leadingComments) {
                    var detachedComments = [];
                    var lastComment;
                    ts.forEach(leadingComments, function (comment) {
                        if (lastComment) {
                            var lastCommentLine = getLineOfLocalPosition(lastComment.end);
                            var commentLine = getLineOfLocalPosition(comment.pos);
                            if (commentLine >= lastCommentLine + 2) {
                                return detachedComments;
                            }
                        }
                        detachedComments.push(comment);
                        lastComment = comment;
                    });
                    if (detachedComments.length) {
                        var lastCommentLine = getLineOfLocalPosition(detachedComments[detachedComments.length - 1].end);
                        var astLine = getLineOfLocalPosition(ts.skipTrivia(currentSourceFile.text, node.pos));
                        if (astLine >= lastCommentLine + 2) {
                            emitNewLineBeforeLeadingComments(node, leadingComments, writer);
                            emitComments(detachedComments, true, writer, writeComment);
                            var currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: detachedComments[detachedComments.length - 1].end };
                            if (detachedCommentsInfo) {
                                detachedCommentsInfo.push(currentDetachedCommentInfo);
                            }
                            else {
                                detachedCommentsInfo = [currentDetachedCommentInfo];
                            }
                        }
                    }
                }
            }
            function emitPinnedOrTripleSlashCommentsOfNode(node) {
                var pinnedComments = ts.filter(getLeadingCommentsToEmit(node), isPinnedOrTripleSlashComment);
                function isPinnedOrTripleSlashComment(comment) {
                    if (currentSourceFile.text.charCodeAt(comment.pos + 1) === 42 /* asterisk */) {
                        return currentSourceFile.text.charCodeAt(comment.pos + 2) === 33 /* exclamation */;
                    }
                    else if (currentSourceFile.text.charCodeAt(comment.pos + 1) === 47 /* slash */ && comment.pos + 2 < comment.end && currentSourceFile.text.charCodeAt(comment.pos + 2) === 47 /* slash */ && currentSourceFile.text.substring(comment.pos, comment.end).match(ts.fullTripleSlashReferencePathRegEx)) {
                        return true;
                    }
                }
                emitNewLineBeforeLeadingComments(node, pinnedComments, writer);
                emitComments(pinnedComments, true, writer, writeComment);
            }
            if (compilerOptions.sourceMap) {
                initializeEmitterWithSourceMaps();
            }
            if (root) {
                emit(root);
            }
            else {
                ts.forEach(program.getSourceFiles(), function (sourceFile) {
                    if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                        emit(sourceFile);
                    }
                });
            }
            writeLine();
            writeEmittedFiles(writer.getText(), compilerOptions.emitBOM);
        }
        function emitDeclarations(jsFilePath, root) {
            var writer = createTextWriterWithSymbolWriter();
            var write = writer.write;
            var writeLine = writer.writeLine;
            var increaseIndent = writer.increaseIndent;
            var decreaseIndent = writer.decreaseIndent;
            var enclosingDeclaration;
            var reportedDeclarationError = false;
            var emitJsDocComments = compilerOptions.removeComments ? function (declaration) {
            } : writeJsDocComments;
            var aliasDeclarationEmitInfo = [];
            var getSymbolVisibilityDiagnosticMessage;
            function createTextWriterWithSymbolWriter() {
                var writer = createTextWriter();
                writer.trackSymbol = trackSymbol;
                writer.writeKeyword = writer.write;
                writer.writeOperator = writer.write;
                writer.writePunctuation = writer.write;
                writer.writeSpace = writer.write;
                writer.writeStringLiteral = writer.writeLiteral;
                writer.writeParameter = writer.write;
                writer.writeSymbol = writer.write;
                return writer;
            }
            function writeAsychronousImportDeclarations(importDeclarations) {
                var oldWriter = writer;
                ts.forEach(importDeclarations, function (aliasToWrite) {
                    var aliasEmitInfo = ts.forEach(aliasDeclarationEmitInfo, function (declEmitInfo) { return declEmitInfo.declaration === aliasToWrite ? declEmitInfo : undefined; });
                    writer = createTextWriterWithSymbolWriter();
                    for (var declarationIndent = aliasEmitInfo.indent; declarationIndent; declarationIndent--) {
                        writer.increaseIndent();
                    }
                    writeImportDeclaration(aliasToWrite);
                    aliasEmitInfo.asynchronousOutput = writer.getText();
                });
                writer = oldWriter;
            }
            function trackSymbol(symbol, enclosingDeclaration, meaning) {
                var symbolAccesibilityResult = resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning);
                if (symbolAccesibilityResult.accessibility === 0 /* Accessible */) {
                    if (symbolAccesibilityResult && symbolAccesibilityResult.aliasesToMakeVisible) {
                        writeAsychronousImportDeclarations(symbolAccesibilityResult.aliasesToMakeVisible);
                    }
                }
                else {
                    reportedDeclarationError = true;
                    var errorInfo = getSymbolVisibilityDiagnosticMessage(symbolAccesibilityResult);
                    if (errorInfo) {
                        if (errorInfo.typeName) {
                            diagnostics.push(ts.createDiagnosticForNode(errorInfo.errorNode, errorInfo.diagnosticMessage, getSourceTextOfLocalNode(errorInfo.typeName), symbolAccesibilityResult.errorSymbolName, symbolAccesibilityResult.errorModuleName));
                        }
                        else {
                            diagnostics.push(ts.createDiagnosticForNode(errorInfo.errorNode, errorInfo.diagnosticMessage, symbolAccesibilityResult.errorSymbolName, symbolAccesibilityResult.errorModuleName));
                        }
                    }
                }
            }
            function emitLines(nodes) {
                for (var i = 0, n = nodes.length; i < n; i++) {
                    emitNode(nodes[i]);
                }
            }
            function emitCommaList(nodes, eachNodeEmitFn) {
                var currentWriterPos = writer.getTextPos();
                for (var i = 0, n = nodes.length; i < n; i++) {
                    if (currentWriterPos !== writer.getTextPos()) {
                        write(", ");
                    }
                    currentWriterPos = writer.getTextPos();
                    eachNodeEmitFn(nodes[i]);
                }
            }
            function writeJsDocComments(declaration) {
                if (declaration) {
                    var jsDocComments = ts.getJsDocComments(declaration, currentSourceFile);
                    emitNewLineBeforeLeadingComments(declaration, jsDocComments, writer);
                    emitComments(jsDocComments, true, writer, writeCommentRange);
                }
            }
            function emitSourceTextOfNode(node) {
                write(getSourceTextOfLocalNode(node));
            }
            function emitSourceFile(node) {
                currentSourceFile = node;
                enclosingDeclaration = node;
                emitLines(node.statements);
            }
            function emitExportAssignment(node) {
                write("export = ");
                emitSourceTextOfNode(node.exportName);
                write(";");
                writeLine();
            }
            function emitDeclarationFlags(node) {
                if (node.flags & 128 /* Static */) {
                    if (node.flags & 32 /* Private */) {
                        write("private ");
                    }
                    else if (node.flags & 64 /* Protected */) {
                        write("protected ");
                    }
                    write("static ");
                }
                else {
                    if (node.flags & 32 /* Private */) {
                        write("private ");
                    }
                    else if (node.flags & 64 /* Protected */) {
                        write("protected ");
                    }
                    else if (node.parent === currentSourceFile) {
                        if (node.flags & 1 /* Export */) {
                            write("export ");
                        }
                        if (node.kind !== 185 /* InterfaceDeclaration */) {
                            write("declare ");
                        }
                    }
                }
            }
            function emitImportDeclaration(node) {
                var nodeEmitInfo = {
                    declaration: node,
                    outputPos: writer.getTextPos(),
                    indent: writer.getIndent(),
                    hasWritten: resolver.isDeclarationVisible(node)
                };
                aliasDeclarationEmitInfo.push(nodeEmitInfo);
                if (nodeEmitInfo.hasWritten) {
                    writeImportDeclaration(node);
                }
            }
            function writeImportDeclaration(node) {
                emitJsDocComments(node);
                if (node.flags & 1 /* Export */) {
                    writer.write("export ");
                }
                writer.write("import ");
                writer.write(getSourceTextOfLocalNode(node.name));
                writer.write(" = ");
                if (node.entityName) {
                    checkEntityNameAccessible();
                    writer.write(getSourceTextOfLocalNode(node.entityName));
                    writer.write(";");
                }
                else {
                    writer.write("require(");
                    writer.write(getSourceTextOfLocalNode(node.externalModuleName));
                    writer.write(");");
                }
                writer.writeLine();
                function checkEntityNameAccessible() {
                    var symbolAccesibilityResult = resolver.isImportDeclarationEntityNameReferenceDeclarationVisibile(node.entityName);
                    if (symbolAccesibilityResult.accessibility === 0 /* Accessible */) {
                        if (symbolAccesibilityResult.aliasesToMakeVisible) {
                            writeAsychronousImportDeclarations(symbolAccesibilityResult.aliasesToMakeVisible);
                        }
                    }
                    else {
                        reportedDeclarationError = true;
                        diagnostics.push(ts.createDiagnosticForNode(node, ts.Diagnostics.Import_declaration_0_is_using_private_name_1, getSourceTextOfLocalNode(node.name), symbolAccesibilityResult.errorSymbolName));
                    }
                }
            }
            function emitModuleDeclaration(node) {
                if (resolver.isDeclarationVisible(node)) {
                    emitJsDocComments(node);
                    emitDeclarationFlags(node);
                    write("module ");
                    emitSourceTextOfNode(node.name);
                    while (node.body.kind !== 189 /* ModuleBlock */) {
                        node = node.body;
                        write(".");
                        emitSourceTextOfNode(node.name);
                    }
                    var prevEnclosingDeclaration = enclosingDeclaration;
                    enclosingDeclaration = node;
                    write(" {");
                    writeLine();
                    increaseIndent();
                    emitLines(node.body.statements);
                    decreaseIndent();
                    write("}");
                    writeLine();
                    enclosingDeclaration = prevEnclosingDeclaration;
                }
            }
            function emitTypeAliasDeclaration(node) {
                if (resolver.isDeclarationVisible(node)) {
                    emitJsDocComments(node);
                    emitDeclarationFlags(node);
                    write("type ");
                    emitSourceTextOfNode(node.name);
                    write(" = ");
                    getSymbolVisibilityDiagnosticMessage = getTypeAliasDeclarationVisibilityError;
                    resolver.writeTypeAtLocation(node.type, enclosingDeclaration, 2 /* UseTypeOfFunction */, writer);
                    write(";");
                    writeLine();
                }
                function getTypeAliasDeclarationVisibilityError(symbolAccesibilityResult) {
                    var diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Exported_type_alias_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : ts.Diagnostics.Exported_type_alias_0_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1;
                    return {
                        diagnosticMessage: diagnosticMessage,
                        errorNode: node,
                        typeName: node.name
                    };
                }
            }
            function emitEnumDeclaration(node) {
                if (resolver.isDeclarationVisible(node)) {
                    emitJsDocComments(node);
                    emitDeclarationFlags(node);
                    if (ts.isConstEnumDeclaration(node)) {
                        write("const ");
                    }
                    write("enum ");
                    emitSourceTextOfNode(node.name);
                    write(" {");
                    writeLine();
                    increaseIndent();
                    emitLines(node.members);
                    decreaseIndent();
                    write("}");
                    writeLine();
                }
            }
            function emitEnumMemberDeclaration(node) {
                emitJsDocComments(node);
                emitSourceTextOfNode(node.name);
                var enumMemberValue = resolver.getEnumMemberValue(node);
                if (enumMemberValue !== undefined) {
                    write(" = ");
                    write(enumMemberValue.toString());
                }
                write(",");
                writeLine();
            }
            function emitTypeParameters(typeParameters) {
                function emitTypeParameter(node) {
                    function getTypeParameterConstraintVisibilityError(symbolAccesibilityResult) {
                        var diagnosticMessage;
                        switch (node.parent.kind) {
                            case 184 /* ClassDeclaration */:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1;
                                break;
                            case 185 /* InterfaceDeclaration */:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1;
                                break;
                            case 130 /* ConstructSignature */:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                                break;
                            case 129 /* CallSignature */:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                                break;
                            case 125 /* Method */:
                                if (node.parent.flags & 128 /* Static */) {
                                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                                }
                                else if (node.parent.parent.kind === 184 /* ClassDeclaration */) {
                                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                                }
                                else {
                                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                                }
                                break;
                            case 182 /* FunctionDeclaration */:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1;
                                break;
                            default:
                                ts.Debug.fail("This is unknown parent for type parameter: " + node.parent.kind);
                        }
                        return {
                            diagnosticMessage: diagnosticMessage,
                            errorNode: node,
                            typeName: node.name
                        };
                    }
                    increaseIndent();
                    emitJsDocComments(node);
                    decreaseIndent();
                    emitSourceTextOfNode(node.name);
                    if (node.constraint && (node.parent.kind !== 125 /* Method */ || !(node.parent.flags & 32 /* Private */))) {
                        write(" extends ");
                        getSymbolVisibilityDiagnosticMessage = getTypeParameterConstraintVisibilityError;
                        resolver.writeTypeAtLocation(node.constraint, enclosingDeclaration, 2 /* UseTypeOfFunction */, writer);
                    }
                }
                if (typeParameters) {
                    write("<");
                    emitCommaList(typeParameters, emitTypeParameter);
                    write(">");
                }
            }
            function emitHeritageClause(typeReferences, isImplementsList) {
                if (typeReferences) {
                    write(isImplementsList ? " implements " : " extends ");
                    emitCommaList(typeReferences, emitTypeOfTypeReference);
                }
                function emitTypeOfTypeReference(node) {
                    getSymbolVisibilityDiagnosticMessage = getHeritageClauseVisibilityError;
                    resolver.writeTypeAtLocation(node, enclosingDeclaration, 1 /* WriteArrayAsGenericType */ | 2 /* UseTypeOfFunction */, writer);
                    function getHeritageClauseVisibilityError(symbolAccesibilityResult) {
                        var diagnosticMessage;
                        if (node.parent.kind === 184 /* ClassDeclaration */) {
                            if (symbolAccesibilityResult.errorModuleName) {
                                diagnosticMessage = isImplementsList ? ts.Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Extends_clause_of_exported_class_0_has_or_is_using_name_1_from_private_module_2;
                            }
                            else {
                                diagnosticMessage = isImplementsList ? ts.Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1 : ts.Diagnostics.Extends_clause_of_exported_class_0_has_or_is_using_private_name_1;
                            }
                        }
                        else {
                            if (symbolAccesibilityResult.errorModuleName) {
                                diagnosticMessage = ts.Diagnostics.Extends_clause_of_exported_interface_0_has_or_is_using_name_1_from_private_module_2;
                            }
                            else {
                                diagnosticMessage = ts.Diagnostics.Extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
                            }
                        }
                        return {
                            diagnosticMessage: diagnosticMessage,
                            errorNode: node,
                            typeName: node.parent.name
                        };
                    }
                }
            }
            function emitClassDeclaration(node) {
                function emitParameterProperties(constructorDeclaration) {
                    if (constructorDeclaration) {
                        ts.forEach(constructorDeclaration.parameters, function (param) {
                            if (param.flags & 112 /* AccessibilityModifier */) {
                                emitPropertyDeclaration(param);
                            }
                        });
                    }
                }
                if (resolver.isDeclarationVisible(node)) {
                    emitJsDocComments(node);
                    emitDeclarationFlags(node);
                    write("class ");
                    emitSourceTextOfNode(node.name);
                    var prevEnclosingDeclaration = enclosingDeclaration;
                    enclosingDeclaration = node;
                    emitTypeParameters(node.typeParameters);
                    if (node.baseType) {
                        emitHeritageClause([node.baseType], false);
                    }
                    emitHeritageClause(node.implementedTypes, true);
                    write(" {");
                    writeLine();
                    increaseIndent();
                    emitParameterProperties(getFirstConstructorWithBody(node));
                    emitLines(node.members);
                    decreaseIndent();
                    write("}");
                    writeLine();
                    enclosingDeclaration = prevEnclosingDeclaration;
                }
            }
            function emitInterfaceDeclaration(node) {
                if (resolver.isDeclarationVisible(node)) {
                    emitJsDocComments(node);
                    emitDeclarationFlags(node);
                    write("interface ");
                    emitSourceTextOfNode(node.name);
                    var prevEnclosingDeclaration = enclosingDeclaration;
                    enclosingDeclaration = node;
                    emitTypeParameters(node.typeParameters);
                    emitHeritageClause(node.baseTypes, false);
                    write(" {");
                    writeLine();
                    increaseIndent();
                    emitLines(node.members);
                    decreaseIndent();
                    write("}");
                    writeLine();
                    enclosingDeclaration = prevEnclosingDeclaration;
                }
            }
            function emitPropertyDeclaration(node) {
                emitJsDocComments(node);
                emitDeclarationFlags(node);
                emitVariableDeclaration(node);
                write(";");
                writeLine();
            }
            function emitVariableDeclaration(node) {
                if (node.kind !== 181 /* VariableDeclaration */ || resolver.isDeclarationVisible(node)) {
                    emitSourceTextOfNode(node.name);
                    if (node.kind === 124 /* Property */ && (node.flags & 4 /* QuestionMark */)) {
                        write("?");
                    }
                    if (!(node.flags & 32 /* Private */)) {
                        write(": ");
                        getSymbolVisibilityDiagnosticMessage = getVariableDeclarationTypeVisibilityError;
                        resolver.writeTypeAtLocation(node, enclosingDeclaration, 2 /* UseTypeOfFunction */, writer);
                    }
                }
                function getVariableDeclarationTypeVisibilityError(symbolAccesibilityResult) {
                    var diagnosticMessage;
                    if (node.kind === 181 /* VariableDeclaration */) {
                        diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : ts.Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Exported_variable_0_has_or_is_using_private_name_1;
                    }
                    else if (node.kind === 124 /* Property */) {
                        if (node.flags & 128 /* Static */) {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : ts.Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
                        }
                        else if (node.parent.kind === 184 /* ClassDeclaration */) {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : ts.Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
                        }
                        else {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
                        }
                    }
                    return diagnosticMessage !== undefined ? {
                        diagnosticMessage: diagnosticMessage,
                        errorNode: node,
                        typeName: node.name
                    } : undefined;
                }
            }
            function emitVariableStatement(node) {
                var hasDeclarationWithEmit = ts.forEach(node.declarations, function (varDeclaration) { return resolver.isDeclarationVisible(varDeclaration); });
                if (hasDeclarationWithEmit) {
                    emitJsDocComments(node);
                    emitDeclarationFlags(node);
                    if (node.flags & 2048 /* Let */) {
                        write("let ");
                    }
                    else if (node.flags & 4096 /* Const */) {
                        write("const ");
                    }
                    else {
                        write("var ");
                    }
                    emitCommaList(node.declarations, emitVariableDeclaration);
                    write(";");
                    writeLine();
                }
            }
            function emitAccessorDeclaration(node) {
                var accessors = getAllAccessorDeclarations(node.parent, node);
                if (node === accessors.firstAccessor) {
                    emitJsDocComments(accessors.getAccessor);
                    emitJsDocComments(accessors.setAccessor);
                    emitDeclarationFlags(node);
                    emitSourceTextOfNode(node.name);
                    if (!(node.flags & 32 /* Private */)) {
                        write(": ");
                        getSymbolVisibilityDiagnosticMessage = getAccessorDeclarationTypeVisibilityError;
                        resolver.writeTypeAtLocation(node, enclosingDeclaration, 2 /* UseTypeOfFunction */, writer);
                    }
                    write(";");
                    writeLine();
                }
                function getAccessorDeclarationTypeVisibilityError(symbolAccesibilityResult) {
                    var diagnosticMessage;
                    if (node.kind === 128 /* SetAccessor */) {
                        if (node.parent.flags & 128 /* Static */) {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1;
                        }
                        return {
                            diagnosticMessage: diagnosticMessage,
                            errorNode: node.parameters[0],
                            typeName: node.name
                        };
                    }
                    else {
                        if (node.flags & 128 /* Static */) {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named : ts.Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1 : ts.Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0;
                        }
                        else {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named : ts.Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1 : ts.Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0;
                        }
                        return {
                            diagnosticMessage: diagnosticMessage,
                            errorNode: node.name,
                            typeName: undefined
                        };
                    }
                }
            }
            function emitFunctionDeclaration(node) {
                if ((node.kind !== 182 /* FunctionDeclaration */ || resolver.isDeclarationVisible(node)) && !resolver.isImplementationOfOverload(node)) {
                    emitJsDocComments(node);
                    emitDeclarationFlags(node);
                    if (node.kind === 182 /* FunctionDeclaration */) {
                        write("function ");
                        emitSourceTextOfNode(node.name);
                    }
                    else if (node.kind === 126 /* Constructor */) {
                        write("constructor");
                    }
                    else {
                        emitSourceTextOfNode(node.name);
                        if (node.flags & 4 /* QuestionMark */) {
                            write("?");
                        }
                    }
                    emitSignatureDeclaration(node);
                }
            }
            function emitConstructSignatureDeclaration(node) {
                emitJsDocComments(node);
                write("new ");
                emitSignatureDeclaration(node);
            }
            function emitSignatureDeclaration(node) {
                if (node.kind === 129 /* CallSignature */ || node.kind === 131 /* IndexSignature */) {
                    emitJsDocComments(node);
                }
                emitTypeParameters(node.typeParameters);
                if (node.kind === 131 /* IndexSignature */) {
                    write("[");
                }
                else {
                    write("(");
                }
                emitCommaList(node.parameters, emitParameterDeclaration);
                if (node.kind === 131 /* IndexSignature */) {
                    write("]");
                }
                else {
                    write(")");
                }
                if (node.kind !== 126 /* Constructor */ && !(node.flags & 32 /* Private */)) {
                    write(": ");
                    getSymbolVisibilityDiagnosticMessage = getReturnTypeVisibilityError;
                    resolver.writeReturnTypeOfSignatureDeclaration(node, enclosingDeclaration, 2 /* UseTypeOfFunction */, writer);
                }
                write(";");
                writeLine();
                function getReturnTypeVisibilityError(symbolAccesibilityResult) {
                    var diagnosticMessage;
                    switch (node.kind) {
                        case 130 /* ConstructSignature */:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 : ts.Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0;
                            break;
                        case 129 /* CallSignature */:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 : ts.Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0;
                            break;
                        case 131 /* IndexSignature */:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 : ts.Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0;
                            break;
                        case 125 /* Method */:
                            if (node.flags & 128 /* Static */) {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named : ts.Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 : ts.Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0;
                            }
                            else if (node.parent.kind === 184 /* ClassDeclaration */) {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named : ts.Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 : ts.Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0;
                            }
                            else {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1 : ts.Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0;
                            }
                            break;
                        case 182 /* FunctionDeclaration */:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named : ts.Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1 : ts.Diagnostics.Return_type_of_exported_function_has_or_is_using_private_name_0;
                            break;
                        default:
                            ts.Debug.fail("This is unknown kind for signature: " + node.kind);
                    }
                    return {
                        diagnosticMessage: diagnosticMessage,
                        errorNode: node.name || node
                    };
                }
            }
            function emitParameterDeclaration(node) {
                increaseIndent();
                emitJsDocComments(node);
                if (node.flags & 8 /* Rest */) {
                    write("...");
                }
                emitSourceTextOfNode(node.name);
                if (node.initializer || (node.flags & 4 /* QuestionMark */)) {
                    write("?");
                }
                decreaseIndent();
                if (!(node.parent.flags & 32 /* Private */)) {
                    write(": ");
                    getSymbolVisibilityDiagnosticMessage = getParameterDeclarationTypeVisibilityError;
                    resolver.writeTypeAtLocation(node, enclosingDeclaration, 2 /* UseTypeOfFunction */, writer);
                }
                function getParameterDeclarationTypeVisibilityError(symbolAccesibilityResult) {
                    var diagnosticMessage;
                    switch (node.parent.kind) {
                        case 126 /* Constructor */:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : ts.Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1;
                            break;
                        case 130 /* ConstructSignature */:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                            break;
                        case 129 /* CallSignature */:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                            break;
                        case 125 /* Method */:
                            if (node.parent.flags & 128 /* Static */) {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : ts.Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                            }
                            else if (node.parent.parent.kind === 184 /* ClassDeclaration */) {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : ts.Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                            }
                            else {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ? ts.Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                            }
                            break;
                        case 182 /* FunctionDeclaration */:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? symbolAccesibilityResult.accessibility === 2 /* CannotBeNamed */ ? ts.Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : ts.Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2 : ts.Diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1;
                            break;
                        default:
                            ts.Debug.fail("This is unknown parent for parameter: " + node.parent.kind);
                    }
                    return {
                        diagnosticMessage: diagnosticMessage,
                        errorNode: node,
                        typeName: node.name
                    };
                }
            }
            function emitNode(node) {
                switch (node.kind) {
                    case 126 /* Constructor */:
                    case 182 /* FunctionDeclaration */:
                    case 125 /* Method */:
                        return emitFunctionDeclaration(node);
                    case 130 /* ConstructSignature */:
                        return emitConstructSignatureDeclaration(node);
                    case 129 /* CallSignature */:
                    case 131 /* IndexSignature */:
                        return emitSignatureDeclaration(node);
                    case 127 /* GetAccessor */:
                    case 128 /* SetAccessor */:
                        return emitAccessorDeclaration(node);
                    case 159 /* VariableStatement */:
                        return emitVariableStatement(node);
                    case 124 /* Property */:
                        return emitPropertyDeclaration(node);
                    case 185 /* InterfaceDeclaration */:
                        return emitInterfaceDeclaration(node);
                    case 184 /* ClassDeclaration */:
                        return emitClassDeclaration(node);
                    case 186 /* TypeAliasDeclaration */:
                        return emitTypeAliasDeclaration(node);
                    case 192 /* EnumMember */:
                        return emitEnumMemberDeclaration(node);
                    case 187 /* EnumDeclaration */:
                        return emitEnumDeclaration(node);
                    case 188 /* ModuleDeclaration */:
                        return emitModuleDeclaration(node);
                    case 190 /* ImportDeclaration */:
                        return emitImportDeclaration(node);
                    case 191 /* ExportAssignment */:
                        return emitExportAssignment(node);
                    case 193 /* SourceFile */:
                        return emitSourceFile(node);
                }
            }
            function tryResolveScriptReference(sourceFile, reference) {
                var referenceFileName = ts.normalizePath(ts.combinePaths(ts.getDirectoryPath(sourceFile.filename), reference.filename));
                return program.getSourceFile(referenceFileName);
            }
            var referencePathsOutput = "";
            function writeReferencePath(referencedFile) {
                var declFileName = referencedFile.flags & 1024 /* DeclarationFile */ ? referencedFile.filename : shouldEmitToOwnFile(referencedFile, compilerOptions) ? getOwnEmitOutputFilePath(referencedFile, ".d.ts") : ts.removeFileExtension(compilerOptions.out) + ".d.ts";
                declFileName = ts.getRelativePathToDirectoryOrUrl(ts.getDirectoryPath(ts.normalizeSlashes(jsFilePath)), declFileName, compilerHost.getCurrentDirectory(), compilerHost.getCanonicalFileName, false);
                referencePathsOutput += "/// <reference path=\"" + declFileName + "\" />" + newLine;
            }
            if (root) {
                if (!compilerOptions.noResolve) {
                    var addedGlobalFileReference = false;
                    ts.forEach(root.referencedFiles, function (fileReference) {
                        var referencedFile = tryResolveScriptReference(root, fileReference);
                        if (referencedFile && ((referencedFile.flags & 1024 /* DeclarationFile */) || shouldEmitToOwnFile(referencedFile, compilerOptions) || !addedGlobalFileReference)) {
                            writeReferencePath(referencedFile);
                            if (!isExternalModuleOrDeclarationFile(referencedFile)) {
                                addedGlobalFileReference = true;
                            }
                        }
                    });
                }
                emitNode(root);
            }
            else {
                var emittedReferencedFiles = [];
                ts.forEach(program.getSourceFiles(), function (sourceFile) {
                    if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                        if (!compilerOptions.noResolve) {
                            ts.forEach(sourceFile.referencedFiles, function (fileReference) {
                                var referencedFile = tryResolveScriptReference(sourceFile, fileReference);
                                if (referencedFile && (isExternalModuleOrDeclarationFile(referencedFile) && !ts.contains(emittedReferencedFiles, referencedFile))) {
                                    writeReferencePath(referencedFile);
                                    emittedReferencedFiles.push(referencedFile);
                                }
                            });
                        }
                        emitNode(sourceFile);
                    }
                });
            }
            if (!reportedDeclarationError) {
                var declarationOutput = referencePathsOutput;
                var synchronousDeclarationOutput = writer.getText();
                var appliedSyncOutputPos = 0;
                ts.forEach(aliasDeclarationEmitInfo, function (aliasEmitInfo) {
                    if (aliasEmitInfo.asynchronousOutput) {
                        declarationOutput += synchronousDeclarationOutput.substring(appliedSyncOutputPos, aliasEmitInfo.outputPos);
                        declarationOutput += aliasEmitInfo.asynchronousOutput;
                        appliedSyncOutputPos = aliasEmitInfo.outputPos;
                    }
                });
                declarationOutput += synchronousDeclarationOutput.substring(appliedSyncOutputPos);
                writeFile(ts.removeFileExtension(jsFilePath) + ".d.ts", declarationOutput, compilerOptions.emitBOM);
            }
        }
        var hasSemanticErrors = resolver.hasSemanticErrors();
        var hasEarlyErrors = resolver.hasEarlyErrors(targetSourceFile);
        function emitFile(jsFilePath, sourceFile) {
            if (!hasEarlyErrors) {
                emitJavaScript(jsFilePath, sourceFile);
                if (!hasSemanticErrors && compilerOptions.declaration) {
                    emitDeclarations(jsFilePath, sourceFile);
                }
            }
        }
        if (targetSourceFile === undefined) {
            ts.forEach(program.getSourceFiles(), function (sourceFile) {
                if (shouldEmitToOwnFile(sourceFile, compilerOptions)) {
                    var jsFilePath = getOwnEmitOutputFilePath(sourceFile, ".js");
                    emitFile(jsFilePath, sourceFile);
                }
            });
            if (compilerOptions.out) {
                emitFile(compilerOptions.out);
            }
        }
        else {
            if (shouldEmitToOwnFile(targetSourceFile, compilerOptions)) {
                var jsFilePath = getOwnEmitOutputFilePath(targetSourceFile, ".js");
                emitFile(jsFilePath, targetSourceFile);
            }
            else if (!ts.isDeclarationFile(targetSourceFile) && compilerOptions.out) {
                emitFile(compilerOptions.out);
            }
        }
        diagnostics.sort(ts.compareDiagnostics);
        diagnostics = ts.deduplicateSortedDiagnostics(diagnostics);
        var hasEmitterError = ts.forEach(diagnostics, function (diagnostic) { return diagnostic.category === 1 /* Error */; });
        var returnCode;
        if (hasEarlyErrors) {
            returnCode = 1 /* AllOutputGenerationSkipped */;
        }
        else if (hasEmitterError) {
            returnCode = 4 /* EmitErrorsEncountered */;
        }
        else if (hasSemanticErrors && compilerOptions.declaration) {
            returnCode = 3 /* DeclarationGenerationSkipped */;
        }
        else if (hasSemanticErrors && !compilerOptions.declaration) {
            returnCode = 2 /* JSGeneratedWithSemanticErrors */;
        }
        else {
            returnCode = 0 /* Succeeded */;
        }
        return {
            emitResultStatus: returnCode,
            errors: diagnostics,
            sourceMaps: sourceMapDataList
        };
    }
    ts.emitFiles = emitFiles;
})(ts || (ts = {}));
var ts;
(function (ts) {
    var nextSymbolId = 1;
    var nextNodeId = 1;
    var nextMergeId = 1;
    function getDeclarationOfKind(symbol, kind) {
        var declarations = symbol.declarations;
        for (var i = 0; i < declarations.length; i++) {
            var declaration = declarations[i];
            if (declaration.kind === kind) {
                return declaration;
            }
        }
        return undefined;
    }
    ts.getDeclarationOfKind = getDeclarationOfKind;
    var stringWriters = [];
    function getSingleLineStringWriter() {
        if (stringWriters.length == 0) {
            var str = "";
            var writeText = function (text) { return str += text; };
            return {
                string: function () { return str; },
                writeKeyword: writeText,
                writeOperator: writeText,
                writePunctuation: writeText,
                writeSpace: writeText,
                writeStringLiteral: writeText,
                writeParameter: writeText,
                writeSymbol: writeText,
                writeLine: function () { return str += " "; },
                increaseIndent: function () {
                },
                decreaseIndent: function () {
                },
                clear: function () { return str = ""; },
                trackSymbol: function () {
                }
            };
        }
        return stringWriters.pop();
    }
    ts.getSingleLineStringWriter = getSingleLineStringWriter;
    function createTypeChecker(program, fullTypeCheck) {
        var Symbol = ts.objectAllocator.getSymbolConstructor();
        var Type = ts.objectAllocator.getTypeConstructor();
        var Signature = ts.objectAllocator.getSignatureConstructor();
        var typeCount = 0;
        var emptyArray = [];
        var emptySymbols = {};
        var compilerOptions = program.getCompilerOptions();
        var checker = {
            getProgram: function () { return program; },
            getDiagnostics: getDiagnostics,
            getGlobalDiagnostics: getGlobalDiagnostics,
            getNodeCount: function () { return ts.sum(program.getSourceFiles(), "nodeCount"); },
            getIdentifierCount: function () { return ts.sum(program.getSourceFiles(), "identifierCount"); },
            getSymbolCount: function () { return ts.sum(program.getSourceFiles(), "symbolCount"); },
            getTypeCount: function () { return typeCount; },
            checkProgram: checkProgram,
            emitFiles: invokeEmitter,
            getParentOfSymbol: getParentOfSymbol,
            getTypeOfSymbol: getTypeOfSymbol,
            getDeclaredTypeOfSymbol: getDeclaredTypeOfSymbol,
            getPropertiesOfType: getPropertiesOfType,
            getPropertyOfType: getPropertyOfType,
            getSignaturesOfType: getSignaturesOfType,
            getIndexTypeOfType: getIndexTypeOfType,
            getReturnTypeOfSignature: getReturnTypeOfSignature,
            getSymbolsInScope: getSymbolsInScope,
            getSymbolInfo: getSymbolInfo,
            getTypeOfNode: getTypeOfNode,
            typeToString: typeToString,
            getSymbolDisplayBuilder: getSymbolDisplayBuilder,
            symbolToString: symbolToString,
            getAugmentedPropertiesOfType: getAugmentedPropertiesOfType,
            getRootSymbols: getRootSymbols,
            getContextualType: getContextualType,
            getFullyQualifiedName: getFullyQualifiedName,
            getResolvedSignature: getResolvedSignature,
            getEnumMemberValue: getEnumMemberValue,
            isValidPropertyAccess: isValidPropertyAccess,
            getSignatureFromDeclaration: getSignatureFromDeclaration,
            isImplementationOfOverload: isImplementationOfOverload,
            getAliasedSymbol: resolveImport,
            isUndefinedSymbol: function (symbol) { return symbol === undefinedSymbol; },
            isArgumentsSymbol: function (symbol) { return symbol === argumentsSymbol; },
            hasEarlyErrors: hasEarlyErrors
        };
        var undefinedSymbol = createSymbol(4 /* Property */ | 268435456 /* Transient */, "undefined");
        var argumentsSymbol = createSymbol(4 /* Property */ | 268435456 /* Transient */, "arguments");
        var unknownSymbol = createSymbol(4 /* Property */ | 268435456 /* Transient */, "unknown");
        var resolvingSymbol = createSymbol(268435456 /* Transient */, "__resolving__");
        var anyType = createIntrinsicType(1 /* Any */, "any");
        var stringType = createIntrinsicType(2 /* String */, "string");
        var numberType = createIntrinsicType(4 /* Number */, "number");
        var booleanType = createIntrinsicType(8 /* Boolean */, "boolean");
        var voidType = createIntrinsicType(16 /* Void */, "void");
        var undefinedType = createIntrinsicType(32 /* Undefined */, "undefined");
        var nullType = createIntrinsicType(64 /* Null */, "null");
        var unknownType = createIntrinsicType(1 /* Any */, "unknown");
        var resolvingType = createIntrinsicType(1 /* Any */, "__resolving__");
        var emptyObjectType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var anyFunctionType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var noConstraintType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var inferenceFailureType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var anySignature = createSignature(undefined, undefined, emptyArray, anyType, 0, false, false);
        var unknownSignature = createSignature(undefined, undefined, emptyArray, unknownType, 0, false, false);
        var globals = {};
        var globalArraySymbol;
        var globalObjectType;
        var globalFunctionType;
        var globalArrayType;
        var globalStringType;
        var globalNumberType;
        var globalBooleanType;
        var globalRegExpType;
        var tupleTypes = {};
        var unionTypes = {};
        var stringLiteralTypes = {};
        var emitExtends = false;
        var mergedSymbols = [];
        var symbolLinks = [];
        var nodeLinks = [];
        var potentialThisCollisions = [];
        var diagnostics = [];
        var diagnosticsModified = false;
        function addDiagnostic(diagnostic) {
            diagnostics.push(diagnostic);
            diagnosticsModified = true;
        }
        function error(location, message, arg0, arg1, arg2) {
            var diagnostic = location ? ts.createDiagnosticForNode(location, message, arg0, arg1, arg2) : ts.createCompilerDiagnostic(message, arg0, arg1, arg2);
            addDiagnostic(diagnostic);
        }
        function createSymbol(flags, name) {
            return new Symbol(flags, name);
        }
        function getExcludedSymbolFlags(flags) {
            var result = 0;
            if (flags & 2 /* BlockScopedVariable */)
                result |= 107455 /* BlockScopedVariableExcludes */;
            if (flags & 1 /* FunctionScopedVariable */)
                result |= 107454 /* FunctionScopedVariableExcludes */;
            if (flags & 4 /* Property */)
                result |= 107455 /* PropertyExcludes */;
            if (flags & 8 /* EnumMember */)
                result |= 107455 /* EnumMemberExcludes */;
            if (flags & 16 /* Function */)
                result |= 106927 /* FunctionExcludes */;
            if (flags & 32 /* Class */)
                result |= 3258879 /* ClassExcludes */;
            if (flags & 64 /* Interface */)
                result |= 3152288 /* InterfaceExcludes */;
            if (flags & 256 /* RegularEnum */)
                result |= 3258623 /* RegularEnumExcludes */;
            if (flags & 128 /* ConstEnum */)
                result |= 3259263 /* ConstEnumExcludes */;
            if (flags & 512 /* ValueModule */)
                result |= 106639 /* ValueModuleExcludes */;
            if (flags & 8192 /* Method */)
                result |= 99263 /* MethodExcludes */;
            if (flags & 32768 /* GetAccessor */)
                result |= 41919 /* GetAccessorExcludes */;
            if (flags & 65536 /* SetAccessor */)
                result |= 74687 /* SetAccessorExcludes */;
            if (flags & 1048576 /* TypeParameter */)
                result |= 2103776 /* TypeParameterExcludes */;
            if (flags & 2097152 /* TypeAlias */)
                result |= 3152352 /* TypeAliasExcludes */;
            if (flags & 33554432 /* Import */)
                result |= 33554432 /* ImportExcludes */;
            return result;
        }
        function recordMergedSymbol(target, source) {
            if (!source.mergeId)
                source.mergeId = nextMergeId++;
            mergedSymbols[source.mergeId] = target;
        }
        function cloneSymbol(symbol) {
            var result = createSymbol(symbol.flags | 134217728 /* Merged */, symbol.name);
            result.declarations = symbol.declarations.slice(0);
            result.parent = symbol.parent;
            if (symbol.valueDeclaration)
                result.valueDeclaration = symbol.valueDeclaration;
            if (symbol.constEnumOnlyModule)
                result.constEnumOnlyModule = true;
            if (symbol.members)
                result.members = cloneSymbolTable(symbol.members);
            if (symbol.exports)
                result.exports = cloneSymbolTable(symbol.exports);
            recordMergedSymbol(result, symbol);
            return result;
        }
        function extendSymbol(target, source) {
            if (!(target.flags & getExcludedSymbolFlags(source.flags))) {
                if (source.flags & 512 /* ValueModule */ && target.flags & 512 /* ValueModule */ && target.constEnumOnlyModule && !source.constEnumOnlyModule) {
                    target.constEnumOnlyModule = false;
                }
                target.flags |= source.flags;
                if (!target.valueDeclaration && source.valueDeclaration)
                    target.valueDeclaration = source.valueDeclaration;
                ts.forEach(source.declarations, function (node) {
                    target.declarations.push(node);
                });
                if (source.members) {
                    if (!target.members)
                        target.members = {};
                    extendSymbolTable(target.members, source.members);
                }
                if (source.exports) {
                    if (!target.exports)
                        target.exports = {};
                    extendSymbolTable(target.exports, source.exports);
                }
                recordMergedSymbol(target, source);
            }
            else {
                var message = target.flags & 2 /* BlockScopedVariable */ || source.flags & 2 /* BlockScopedVariable */ ? ts.Diagnostics.Cannot_redeclare_block_scoped_variable_0 : ts.Diagnostics.Duplicate_identifier_0;
                ts.forEach(source.declarations, function (node) {
                    error(node.name ? node.name : node, message, symbolToString(source));
                });
                ts.forEach(target.declarations, function (node) {
                    error(node.name ? node.name : node, message, symbolToString(source));
                });
            }
        }
        function cloneSymbolTable(symbolTable) {
            var result = {};
            for (var id in symbolTable) {
                if (ts.hasProperty(symbolTable, id)) {
                    result[id] = symbolTable[id];
                }
            }
            return result;
        }
        function extendSymbolTable(target, source) {
            for (var id in source) {
                if (ts.hasProperty(source, id)) {
                    if (!ts.hasProperty(target, id)) {
                        target[id] = source[id];
                    }
                    else {
                        var symbol = target[id];
                        if (!(symbol.flags & 134217728 /* Merged */)) {
                            target[id] = symbol = cloneSymbol(symbol);
                        }
                        extendSymbol(symbol, source[id]);
                    }
                }
            }
        }
        function getSymbolLinks(symbol) {
            if (symbol.flags & 268435456 /* Transient */)
                return symbol;
            if (!symbol.id)
                symbol.id = nextSymbolId++;
            return symbolLinks[symbol.id] || (symbolLinks[symbol.id] = {});
        }
        function getNodeLinks(node) {
            if (!node.id)
                node.id = nextNodeId++;
            return nodeLinks[node.id] || (nodeLinks[node.id] = {});
        }
        function getSourceFile(node) {
            return ts.getAncestor(node, 193 /* SourceFile */);
        }
        function isGlobalSourceFile(node) {
            return node.kind === 193 /* SourceFile */ && !ts.isExternalModule(node);
        }
        function getSymbol(symbols, name, meaning) {
            if (meaning && ts.hasProperty(symbols, name)) {
                var symbol = symbols[name];
                ts.Debug.assert((symbol.flags & 67108864 /* Instantiated */) === 0, "Should never get an instantiated symbol here.");
                if (symbol.flags & meaning) {
                    return symbol;
                }
                if (symbol.flags & 33554432 /* Import */) {
                    var target = resolveImport(symbol);
                    if (target === unknownSymbol || target.flags & meaning) {
                        return symbol;
                    }
                }
            }
        }
        function isDefinedBefore(node1, node2) {
            var file1 = ts.getSourceFileOfNode(node1);
            var file2 = ts.getSourceFileOfNode(node2);
            if (file1 === file2) {
                return node1.pos <= node2.pos;
            }
            if (!compilerOptions.out) {
                return true;
            }
            var sourceFiles = program.getSourceFiles();
            return sourceFiles.indexOf(file1) <= sourceFiles.indexOf(file2);
        }
        function resolveName(location, name, meaning, nameNotFoundMessage, nameArg) {
            var result;
            var lastLocation;
            var propertyWithInvalidInitializer;
            var errorLocation = location;
            loop: while (location) {
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = getSymbol(location.locals, name, meaning)) {
                        break loop;
                    }
                }
                switch (location.kind) {
                    case 193 /* SourceFile */:
                        if (!ts.isExternalModule(location))
                            break;
                    case 188 /* ModuleDeclaration */:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & 35653619 /* ModuleMember */)) {
                            break loop;
                        }
                        break;
                    case 187 /* EnumDeclaration */:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & 8 /* EnumMember */)) {
                            break loop;
                        }
                        break;
                    case 124 /* Property */:
                        if (location.parent.kind === 184 /* ClassDeclaration */ && !(location.flags & 128 /* Static */)) {
                            var ctor = findConstructorDeclaration(location.parent);
                            if (ctor && ctor.locals) {
                                if (getSymbol(ctor.locals, name, meaning & 107455 /* Value */)) {
                                    propertyWithInvalidInitializer = location;
                                }
                            }
                        }
                        break;
                    case 184 /* ClassDeclaration */:
                    case 185 /* InterfaceDeclaration */:
                        if (result = getSymbol(getSymbolOfNode(location).members, name, meaning & 3152352 /* Type */)) {
                            if (lastLocation && lastLocation.flags & 128 /* Static */) {
                                error(errorLocation, ts.Diagnostics.Static_members_cannot_reference_class_type_parameters);
                                return undefined;
                            }
                            break loop;
                        }
                        break;
                    case 125 /* Method */:
                    case 126 /* Constructor */:
                    case 127 /* GetAccessor */:
                    case 128 /* SetAccessor */:
                    case 182 /* FunctionDeclaration */:
                    case 150 /* ArrowFunction */:
                        if (name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }
                        break;
                    case 149 /* FunctionExpression */:
                        if (name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }
                        var id = location.name;
                        if (id && name === id.text) {
                            result = location.symbol;
                            break loop;
                        }
                        break;
                    case 178 /* CatchBlock */:
                        var id = location.variable;
                        if (name === id.text) {
                            result = location.symbol;
                            break loop;
                        }
                        break;
                }
                lastLocation = location;
                location = location.parent;
            }
            if (!result) {
                result = getSymbol(globals, name, meaning);
            }
            if (!result) {
                if (nameNotFoundMessage) {
                    error(errorLocation, nameNotFoundMessage, typeof nameArg === "string" ? nameArg : ts.identifierToString(nameArg));
                }
                return undefined;
            }
            if (nameNotFoundMessage) {
                if (propertyWithInvalidInitializer) {
                    var propertyName = propertyWithInvalidInitializer.name;
                    error(errorLocation, ts.Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor, ts.identifierToString(propertyName), typeof nameArg === "string" ? nameArg : ts.identifierToString(nameArg));
                    return undefined;
                }
                if (result.flags & 2 /* BlockScopedVariable */) {
                    var declaration = ts.forEach(result.declarations, function (d) { return d.flags & 6144 /* BlockScoped */ ? d : undefined; });
                    ts.Debug.assert(declaration !== undefined, "Block-scoped variable declaration is undefined");
                    if (!isDefinedBefore(declaration, errorLocation)) {
                        error(errorLocation, ts.Diagnostics.Block_scoped_variable_0_used_before_its_declaration, ts.identifierToString(declaration.name));
                    }
                }
            }
            return result;
        }
        function resolveImport(symbol) {
            ts.Debug.assert((symbol.flags & 33554432 /* Import */) !== 0, "Should only get Imports here.");
            var links = getSymbolLinks(symbol);
            if (!links.target) {
                links.target = resolvingSymbol;
                var node = getDeclarationOfKind(symbol, 190 /* ImportDeclaration */);
                var target = node.externalModuleName ? resolveExternalModuleName(node, node.externalModuleName) : getSymbolOfPartOfRightHandSideOfImport(node.entityName, node);
                if (links.target === resolvingSymbol) {
                    links.target = target || unknownSymbol;
                }
                else {
                    error(node, ts.Diagnostics.Circular_definition_of_import_alias_0, symbolToString(symbol));
                }
            }
            else if (links.target === resolvingSymbol) {
                links.target = unknownSymbol;
            }
            return links.target;
        }
        function getSymbolOfPartOfRightHandSideOfImport(entityName, importDeclaration) {
            if (!importDeclaration) {
                importDeclaration = ts.getAncestor(entityName, 190 /* ImportDeclaration */);
                ts.Debug.assert(importDeclaration !== undefined);
            }
            if (entityName.kind === 63 /* Identifier */ && isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                entityName = entityName.parent;
            }
            if (entityName.kind === 63 /* Identifier */ || entityName.parent.kind === 121 /* QualifiedName */) {
                return resolveEntityName(importDeclaration, entityName, 1536 /* Namespace */);
            }
            else {
                ts.Debug.assert(entityName.parent.kind === 190 /* ImportDeclaration */);
                return resolveEntityName(importDeclaration, entityName, 107455 /* Value */ | 3152352 /* Type */ | 1536 /* Namespace */);
            }
        }
        function getFullyQualifiedName(symbol) {
            return symbol.parent ? getFullyQualifiedName(symbol.parent) + "." + symbolToString(symbol) : symbolToString(symbol);
        }
        function resolveEntityName(location, name, meaning) {
            if (name.kind === 63 /* Identifier */) {
                var symbol = resolveName(location, name.text, meaning, ts.Diagnostics.Cannot_find_name_0, name);
                if (!symbol) {
                    return;
                }
            }
            else if (name.kind === 121 /* QualifiedName */) {
                var namespace = resolveEntityName(location, name.left, 1536 /* Namespace */);
                if (!namespace || namespace === unknownSymbol || name.right.kind === 120 /* Missing */)
                    return;
                var symbol = getSymbol(namespace.exports, name.right.text, meaning);
                if (!symbol) {
                    error(location, ts.Diagnostics.Module_0_has_no_exported_member_1, getFullyQualifiedName(namespace), ts.identifierToString(name.right));
                    return;
                }
            }
            else {
                return;
            }
            ts.Debug.assert((symbol.flags & 67108864 /* Instantiated */) === 0, "Should never get an instantiated symbol here.");
            return symbol.flags & meaning ? symbol : resolveImport(symbol);
        }
        function isExternalModuleNameRelative(moduleName) {
            return moduleName.substr(0, 2) === "./" || moduleName.substr(0, 3) === "../" || moduleName.substr(0, 2) === ".\\" || moduleName.substr(0, 3) === "..\\";
        }
        function resolveExternalModuleName(location, moduleLiteral) {
            var searchPath = ts.getDirectoryPath(getSourceFile(location).filename);
            var moduleName = moduleLiteral.text;
            if (!moduleName)
                return;
            var isRelative = isExternalModuleNameRelative(moduleName);
            if (!isRelative) {
                var symbol = getSymbol(globals, '"' + moduleName + '"', 512 /* ValueModule */);
                if (symbol) {
                    return getResolvedExportSymbol(symbol);
                }
            }
            while (true) {
                var filename = ts.normalizePath(ts.combinePaths(searchPath, moduleName));
                var sourceFile = program.getSourceFile(filename + ".ts") || program.getSourceFile(filename + ".d.ts");
                if (sourceFile || isRelative)
                    break;
                var parentPath = ts.getDirectoryPath(searchPath);
                if (parentPath === searchPath)
                    break;
                searchPath = parentPath;
            }
            if (sourceFile) {
                if (sourceFile.symbol) {
                    return getResolvedExportSymbol(sourceFile.symbol);
                }
                error(moduleLiteral, ts.Diagnostics.File_0_is_not_an_external_module, sourceFile.filename);
                return;
            }
            error(moduleLiteral, ts.Diagnostics.Cannot_find_external_module_0, moduleName);
        }
        function getResolvedExportSymbol(moduleSymbol) {
            var symbol = getExportAssignmentSymbol(moduleSymbol);
            if (symbol) {
                if (symbol.flags & (107455 /* Value */ | 3152352 /* Type */ | 1536 /* Namespace */)) {
                    return symbol;
                }
                if (symbol.flags & 33554432 /* Import */) {
                    return resolveImport(symbol);
                }
            }
            return moduleSymbol;
        }
        function getExportAssignmentSymbol(symbol) {
            checkTypeOfExportAssignmentSymbol(symbol);
            var symbolLinks = getSymbolLinks(symbol);
            return symbolLinks.exportAssignSymbol === unknownSymbol ? undefined : symbolLinks.exportAssignSymbol;
        }
        function checkTypeOfExportAssignmentSymbol(containerSymbol) {
            var symbolLinks = getSymbolLinks(containerSymbol);
            if (!symbolLinks.exportAssignSymbol) {
                var exportInformation = collectExportInformationForSourceFileOrModule(containerSymbol);
                if (exportInformation.exportAssignments.length) {
                    if (exportInformation.exportAssignments.length > 1) {
                        ts.forEach(exportInformation.exportAssignments, function (node) { return error(node, ts.Diagnostics.A_module_cannot_have_more_than_one_export_assignment); });
                    }
                    var node = exportInformation.exportAssignments[0];
                    if (exportInformation.hasExportedMember) {
                        error(node, ts.Diagnostics.An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements);
                    }
                    if (node.exportName.text) {
                        var meaning = 107455 /* Value */ | 3152352 /* Type */ | 1536 /* Namespace */;
                        var exportSymbol = resolveName(node, node.exportName.text, meaning, ts.Diagnostics.Cannot_find_name_0, node.exportName);
                    }
                }
                symbolLinks.exportAssignSymbol = exportSymbol || unknownSymbol;
            }
        }
        function collectExportInformationForSourceFileOrModule(symbol) {
            var seenExportedMember = false;
            var result = [];
            ts.forEach(symbol.declarations, function (declaration) {
                var block = (declaration.kind === 193 /* SourceFile */ ? declaration : declaration.body);
                ts.forEach(block.statements, function (node) {
                    if (node.kind === 191 /* ExportAssignment */) {
                        result.push(node);
                    }
                    else {
                        seenExportedMember = seenExportedMember || (node.flags & 1 /* Export */) !== 0;
                    }
                });
            });
            return {
                hasExportedMember: seenExportedMember,
                exportAssignments: result
            };
        }
        function getMergedSymbol(symbol) {
            var merged;
            return symbol && symbol.mergeId && (merged = mergedSymbols[symbol.mergeId]) ? merged : symbol;
        }
        function getSymbolOfNode(node) {
            return getMergedSymbol(node.symbol);
        }
        function getParentOfSymbol(symbol) {
            return getMergedSymbol(symbol.parent);
        }
        function getExportSymbolOfValueSymbolIfExported(symbol) {
            return symbol && (symbol.flags & 4194304 /* ExportValue */) !== 0 ? getMergedSymbol(symbol.exportSymbol) : symbol;
        }
        function symbolIsValue(symbol) {
            if (symbol.flags & 67108864 /* Instantiated */) {
                return symbolIsValue(getSymbolLinks(symbol).target);
            }
            if (symbol.flags & 107455 /* Value */) {
                return true;
            }
            if (symbol.flags & 33554432 /* Import */) {
                return (resolveImport(symbol).flags & 107455 /* Value */) !== 0;
            }
            return false;
        }
        function findConstructorDeclaration(node) {
            var members = node.members;
            for (var i = 0; i < members.length; i++) {
                var member = members[i];
                if (member.kind === 126 /* Constructor */ && member.body) {
                    return member;
                }
            }
        }
        function createType(flags) {
            var result = new Type(checker, flags);
            result.id = typeCount++;
            return result;
        }
        function createIntrinsicType(kind, intrinsicName) {
            var type = createType(kind);
            type.intrinsicName = intrinsicName;
            return type;
        }
        function createObjectType(kind, symbol) {
            var type = createType(kind);
            type.symbol = symbol;
            return type;
        }
        function isReservedMemberName(name) {
            return name.charCodeAt(0) === 95 /* _ */ && name.charCodeAt(1) === 95 /* _ */ && name.charCodeAt(2) !== 95 /* _ */;
        }
        function getNamedMembers(members) {
            var result;
            for (var id in members) {
                if (ts.hasProperty(members, id)) {
                    if (!isReservedMemberName(id)) {
                        if (!result)
                            result = [];
                        var symbol = members[id];
                        if (symbolIsValue(symbol)) {
                            result.push(symbol);
                        }
                    }
                }
            }
            return result || emptyArray;
        }
        function setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType) {
            type.members = members;
            type.properties = getNamedMembers(members);
            type.callSignatures = callSignatures;
            type.constructSignatures = constructSignatures;
            if (stringIndexType)
                type.stringIndexType = stringIndexType;
            if (numberIndexType)
                type.numberIndexType = numberIndexType;
            return type;
        }
        function createAnonymousType(symbol, members, callSignatures, constructSignatures, stringIndexType, numberIndexType) {
            return setObjectTypeMembers(createObjectType(32768 /* Anonymous */, symbol), members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function isOptionalProperty(propertySymbol) {
            return propertySymbol.valueDeclaration && propertySymbol.valueDeclaration.flags & 4 /* QuestionMark */ && propertySymbol.valueDeclaration.kind !== 123 /* Parameter */;
        }
        function forEachSymbolTableInScope(enclosingDeclaration, callback) {
            var result;
            for (var location = enclosingDeclaration; location; location = location.parent) {
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = callback(location.locals)) {
                        return result;
                    }
                }
                switch (location.kind) {
                    case 193 /* SourceFile */:
                        if (!ts.isExternalModule(location)) {
                            break;
                        }
                    case 188 /* ModuleDeclaration */:
                        if (result = callback(getSymbolOfNode(location).exports)) {
                            return result;
                        }
                        break;
                    case 184 /* ClassDeclaration */:
                    case 185 /* InterfaceDeclaration */:
                        if (result = callback(getSymbolOfNode(location).members)) {
                            return result;
                        }
                        break;
                }
            }
            return callback(globals);
        }
        function getQualifiedLeftMeaning(rightMeaning) {
            return rightMeaning === 107455 /* Value */ ? 107455 /* Value */ : 1536 /* Namespace */;
        }
        function getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, useOnlyExternalAliasing) {
            function getAccessibleSymbolChainFromSymbolTable(symbols) {
                function canQualifySymbol(symbolFromSymbolTable, meaning) {
                    if (!needsQualification(symbolFromSymbolTable, enclosingDeclaration, meaning)) {
                        return true;
                    }
                    var accessibleParent = getAccessibleSymbolChain(symbolFromSymbolTable.parent, enclosingDeclaration, getQualifiedLeftMeaning(meaning), useOnlyExternalAliasing);
                    return !!accessibleParent;
                }
                function isAccessible(symbolFromSymbolTable, resolvedAliasSymbol) {
                    if (symbol === (resolvedAliasSymbol || symbolFromSymbolTable)) {
                        return !ts.forEach(symbolFromSymbolTable.declarations, function (declaration) { return hasExternalModuleSymbol(declaration); }) && canQualifySymbol(symbolFromSymbolTable, meaning);
                    }
                }
                if (isAccessible(ts.lookUp(symbols, symbol.name))) {
                    return [symbol];
                }
                return ts.forEachValue(symbols, function (symbolFromSymbolTable) {
                    if (symbolFromSymbolTable.flags & 33554432 /* Import */) {
                        if (!useOnlyExternalAliasing || ts.forEach(symbolFromSymbolTable.declarations, function (declaration) { return declaration.kind === 190 /* ImportDeclaration */ && declaration.externalModuleName; })) {
                            var resolvedImportedSymbol = resolveImport(symbolFromSymbolTable);
                            if (isAccessible(symbolFromSymbolTable, resolveImport(symbolFromSymbolTable))) {
                                return [symbolFromSymbolTable];
                            }
                            var accessibleSymbolsFromExports = resolvedImportedSymbol.exports ? getAccessibleSymbolChainFromSymbolTable(resolvedImportedSymbol.exports) : undefined;
                            if (accessibleSymbolsFromExports && canQualifySymbol(symbolFromSymbolTable, getQualifiedLeftMeaning(meaning))) {
                                return [symbolFromSymbolTable].concat(accessibleSymbolsFromExports);
                            }
                        }
                    }
                });
            }
            if (symbol) {
                return forEachSymbolTableInScope(enclosingDeclaration, getAccessibleSymbolChainFromSymbolTable);
            }
        }
        function needsQualification(symbol, enclosingDeclaration, meaning) {
            var qualify = false;
            forEachSymbolTableInScope(enclosingDeclaration, function (symbolTable) {
                if (!ts.hasProperty(symbolTable, symbol.name)) {
                    return false;
                }
                var symbolFromSymbolTable = symbolTable[symbol.name];
                if (symbolFromSymbolTable === symbol) {
                    return true;
                }
                symbolFromSymbolTable = (symbolFromSymbolTable.flags & 33554432 /* Import */) ? resolveImport(symbolFromSymbolTable) : symbolFromSymbolTable;
                if (symbolFromSymbolTable.flags & meaning) {
                    qualify = true;
                    return true;
                }
                return false;
            });
            return qualify;
        }
        function isSymbolAccessible(symbol, enclosingDeclaration, meaning) {
            if (symbol && enclosingDeclaration && !(symbol.flags & 1048576 /* TypeParameter */)) {
                var initialSymbol = symbol;
                var meaningToLook = meaning;
                while (symbol) {
                    var accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaningToLook, false);
                    if (accessibleSymbolChain) {
                        var hasAccessibleDeclarations = hasVisibleDeclarations(accessibleSymbolChain[0]);
                        if (!hasAccessibleDeclarations) {
                            return {
                                accessibility: 1 /* NotAccessible */,
                                errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                                errorModuleName: symbol !== initialSymbol ? symbolToString(symbol, enclosingDeclaration, 1536 /* Namespace */) : undefined
                            };
                        }
                        return { accessibility: 0 /* Accessible */, aliasesToMakeVisible: hasAccessibleDeclarations.aliasesToMakeVisible };
                    }
                    meaningToLook = getQualifiedLeftMeaning(meaning);
                    symbol = getParentOfSymbol(symbol);
                }
                var symbolExternalModule = ts.forEach(initialSymbol.declarations, function (declaration) { return getExternalModuleContainer(declaration); });
                if (symbolExternalModule) {
                    var enclosingExternalModule = getExternalModuleContainer(enclosingDeclaration);
                    if (symbolExternalModule !== enclosingExternalModule) {
                        return {
                            accessibility: 2 /* CannotBeNamed */,
                            errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                            errorModuleName: symbolToString(symbolExternalModule)
                        };
                    }
                }
                return {
                    accessibility: 1 /* NotAccessible */,
                    errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning)
                };
            }
            return { accessibility: 0 /* Accessible */ };
            function getExternalModuleContainer(declaration) {
                for (; declaration; declaration = declaration.parent) {
                    if (hasExternalModuleSymbol(declaration)) {
                        return getSymbolOfNode(declaration);
                    }
                }
            }
        }
        function hasExternalModuleSymbol(declaration) {
            return (declaration.kind === 188 /* ModuleDeclaration */ && declaration.name.kind === 7 /* StringLiteral */) || (declaration.kind === 193 /* SourceFile */ && ts.isExternalModule(declaration));
        }
        function hasVisibleDeclarations(symbol) {
            var aliasesToMakeVisible;
            if (ts.forEach(symbol.declarations, function (declaration) { return !getIsDeclarationVisible(declaration); })) {
                return undefined;
            }
            return { aliasesToMakeVisible: aliasesToMakeVisible };
            function getIsDeclarationVisible(declaration) {
                if (!isDeclarationVisible(declaration)) {
                    if (declaration.kind === 190 /* ImportDeclaration */ && !(declaration.flags & 1 /* Export */) && isDeclarationVisible(declaration.parent)) {
                        getNodeLinks(declaration).isVisible = true;
                        if (aliasesToMakeVisible) {
                            if (!ts.contains(aliasesToMakeVisible, declaration)) {
                                aliasesToMakeVisible.push(declaration);
                            }
                        }
                        else {
                            aliasesToMakeVisible = [declaration];
                        }
                        return true;
                    }
                    return false;
                }
                return true;
            }
        }
        function isImportDeclarationEntityNameReferenceDeclarationVisibile(entityName) {
            var firstIdentifier = getFirstIdentifier(entityName);
            var symbolOfNameSpace = resolveName(entityName.parent, firstIdentifier.text, 1536 /* Namespace */, ts.Diagnostics.Cannot_find_name_0, firstIdentifier);
            var hasNamespaceDeclarationsVisibile = hasVisibleDeclarations(symbolOfNameSpace);
            return hasNamespaceDeclarationsVisibile ? { accessibility: 0 /* Accessible */, aliasesToMakeVisible: hasNamespaceDeclarationsVisibile.aliasesToMakeVisible } : { accessibility: 1 /* NotAccessible */, errorSymbolName: ts.identifierToString(firstIdentifier) };
        }
        function releaseStringWriter(writer) {
            writer.clear();
            stringWriters.push(writer);
        }
        function writeKeyword(writer, kind) {
            writer.writeKeyword(ts.tokenToString(kind));
        }
        function writePunctuation(writer, kind) {
            writer.writePunctuation(ts.tokenToString(kind));
        }
        function writeOperator(writer, kind) {
            writer.writeOperator(ts.tokenToString(kind));
        }
        function writeSpace(writer) {
            writer.writeSpace(" ");
        }
        function symbolToString(symbol, enclosingDeclaration, meaning) {
            var writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning);
            var result = writer.string();
            releaseStringWriter(writer);
            return result;
        }
        function typeToString(type, enclosingDeclaration, flags) {
            var writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
            var result = writer.string();
            releaseStringWriter(writer);
            var maxLength = compilerOptions.noErrorTruncation || flags & 4 /* NoTruncation */ ? undefined : 100;
            if (maxLength && result.length >= maxLength) {
                result = result.substr(0, maxLength - "...".length) + "...";
            }
            return result;
        }
        function getTypeAliasForTypeLiteral(type) {
            if (type.symbol && type.symbol.flags & 2048 /* TypeLiteral */) {
                var node = type.symbol.declarations[0].parent;
                while (node.kind === 138 /* ParenType */) {
                    node = node.parent;
                }
                if (node.kind === 186 /* TypeAliasDeclaration */) {
                    return getSymbolOfNode(node);
                }
            }
            return undefined;
        }
        var _displayBuilder;
        function getSymbolDisplayBuilder() {
            function appendSymbolNameOnly(symbol, writer) {
                if (symbol.declarations && symbol.declarations.length > 0) {
                    var declaration = symbol.declarations[0];
                    if (declaration.name) {
                        writer.writeSymbol(ts.identifierToString(declaration.name), symbol);
                        return;
                    }
                }
                writer.writeSymbol(symbol.name, symbol);
            }
            function buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning, flags) {
                var parentSymbol;
                function appendParentTypeArgumentsAndSymbolName(symbol) {
                    if (parentSymbol) {
                        if (flags & 1 /* WriteTypeParametersOrArguments */) {
                            if (symbol.flags & 67108864 /* Instantiated */) {
                                buildDisplayForTypeArgumentsAndDelimiters(getTypeParametersOfClassOrInterface(parentSymbol), symbol.mapper, writer, enclosingDeclaration);
                            }
                            else {
                                buildTypeParameterDisplayFromSymbol(parentSymbol, writer, enclosingDeclaration);
                            }
                        }
                        writePunctuation(writer, 19 /* DotToken */);
                    }
                    parentSymbol = symbol;
                    appendSymbolNameOnly(symbol, writer);
                }
                writer.trackSymbol(symbol, enclosingDeclaration, meaning);
                function walkSymbol(symbol, meaning) {
                    if (symbol) {
                        var accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, !!(flags & 2 /* UseOnlyExternalAliasing */));
                        if (!accessibleSymbolChain || needsQualification(accessibleSymbolChain[0], enclosingDeclaration, accessibleSymbolChain.length === 1 ? meaning : getQualifiedLeftMeaning(meaning))) {
                            walkSymbol(getParentOfSymbol(accessibleSymbolChain ? accessibleSymbolChain[0] : symbol), getQualifiedLeftMeaning(meaning));
                        }
                        if (accessibleSymbolChain) {
                            for (var i = 0, n = accessibleSymbolChain.length; i < n; i++) {
                                appendParentTypeArgumentsAndSymbolName(accessibleSymbolChain[i]);
                            }
                        }
                        else {
                            if (!parentSymbol && ts.forEach(symbol.declarations, function (declaration) { return hasExternalModuleSymbol(declaration); })) {
                                return;
                            }
                            if (symbol.flags & 2048 /* TypeLiteral */ || symbol.flags & 4096 /* ObjectLiteral */) {
                                return;
                            }
                            appendParentTypeArgumentsAndSymbolName(symbol);
                        }
                    }
                }
                if (enclosingDeclaration && !(symbol.flags & 1048576 /* TypeParameter */)) {
                    walkSymbol(symbol, meaning);
                    return;
                }
                return appendParentTypeArgumentsAndSymbolName(symbol);
            }
            function buildTypeDisplay(type, writer, enclosingDeclaration, globalFlags, typeStack) {
                var globalFlagsToPass = globalFlags & 16 /* WriteOwnNameForAnyLike */;
                return writeType(type, globalFlags);
                function writeType(type, flags) {
                    if (type.flags & 127 /* Intrinsic */) {
                        writer.writeKeyword(!(globalFlags & 16 /* WriteOwnNameForAnyLike */) && (type.flags & 1 /* Any */) ? "any" : type.intrinsicName);
                    }
                    else if (type.flags & 4096 /* Reference */) {
                        writeTypeReference(type, flags);
                    }
                    else if (type.flags & (1024 /* Class */ | 2048 /* Interface */ | 128 /* Enum */ | 512 /* TypeParameter */)) {
                        buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, 3152352 /* Type */);
                    }
                    else if (type.flags & 8192 /* Tuple */) {
                        writeTupleType(type);
                    }
                    else if (type.flags & 16384 /* Union */) {
                        writeUnionType(type, flags);
                    }
                    else if (type.flags & 32768 /* Anonymous */) {
                        writeAnonymousType(type, flags);
                    }
                    else if (type.flags & 256 /* StringLiteral */) {
                        writer.writeStringLiteral(type.text);
                    }
                    else {
                        writePunctuation(writer, 13 /* OpenBraceToken */);
                        writeSpace(writer);
                        writePunctuation(writer, 20 /* DotDotDotToken */);
                        writeSpace(writer);
                        writePunctuation(writer, 14 /* CloseBraceToken */);
                    }
                }
                function writeTypeList(types, union) {
                    for (var i = 0; i < types.length; i++) {
                        if (i > 0) {
                            if (union) {
                                writeSpace(writer);
                            }
                            writePunctuation(writer, union ? 43 /* BarToken */ : 22 /* CommaToken */);
                            writeSpace(writer);
                        }
                        writeType(types[i], union ? 64 /* InElementType */ : 0 /* None */);
                    }
                }
                function writeTypeReference(type, flags) {
                    if (type.target === globalArrayType && !(flags & 1 /* WriteArrayAsGenericType */)) {
                        writeType(type.typeArguments[0], 64 /* InElementType */);
                        writePunctuation(writer, 17 /* OpenBracketToken */);
                        writePunctuation(writer, 18 /* CloseBracketToken */);
                    }
                    else {
                        buildSymbolDisplay(type.target.symbol, writer, enclosingDeclaration, 3152352 /* Type */);
                        writePunctuation(writer, 23 /* LessThanToken */);
                        writeTypeList(type.typeArguments, false);
                        writePunctuation(writer, 24 /* GreaterThanToken */);
                    }
                }
                function writeTupleType(type) {
                    writePunctuation(writer, 17 /* OpenBracketToken */);
                    writeTypeList(type.elementTypes, false);
                    writePunctuation(writer, 18 /* CloseBracketToken */);
                }
                function writeUnionType(type, flags) {
                    if (flags & 64 /* InElementType */) {
                        writePunctuation(writer, 15 /* OpenParenToken */);
                    }
                    writeTypeList(type.types, true);
                    if (flags & 64 /* InElementType */) {
                        writePunctuation(writer, 16 /* CloseParenToken */);
                    }
                }
                function writeAnonymousType(type, flags) {
                    if (type.symbol && type.symbol.flags & (32 /* Class */ | 384 /* Enum */ | 512 /* ValueModule */)) {
                        writeTypeofSymbol(type);
                    }
                    else if (shouldWriteTypeOfFunctionSymbol()) {
                        writeTypeofSymbol(type);
                    }
                    else if (typeStack && ts.contains(typeStack, type)) {
                        var typeAlias = getTypeAliasForTypeLiteral(type);
                        if (typeAlias) {
                            buildSymbolDisplay(typeAlias, writer, enclosingDeclaration, 3152352 /* Type */);
                        }
                        else {
                            writeKeyword(writer, 109 /* AnyKeyword */);
                        }
                    }
                    else {
                        if (!typeStack) {
                            typeStack = [];
                        }
                        typeStack.push(type);
                        writeLiteralType(type, flags);
                        typeStack.pop();
                    }
                    function shouldWriteTypeOfFunctionSymbol() {
                        if (type.symbol) {
                            var isStaticMethodSymbol = !!(type.symbol.flags & 8192 /* Method */ && ts.forEach(type.symbol.declarations, function (declaration) { return declaration.flags & 128 /* Static */; }));
                            var isNonLocalFunctionSymbol = !!(type.symbol.flags & 16 /* Function */) && (type.symbol.parent || ts.forEach(type.symbol.declarations, function (declaration) { return declaration.parent.kind === 193 /* SourceFile */ || declaration.parent.kind === 189 /* ModuleBlock */; }));
                            if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                                return !!(flags & 2 /* UseTypeOfFunction */) || (typeStack && ts.contains(typeStack, type));
                            }
                        }
                    }
                }
                function writeTypeofSymbol(type) {
                    writeKeyword(writer, 95 /* TypeOfKeyword */);
                    writeSpace(writer);
                    buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, 107455 /* Value */);
                }
                function writeLiteralType(type, flags) {
                    var resolved = resolveObjectOrUnionTypeMembers(type);
                    if (!resolved.properties.length && !resolved.stringIndexType && !resolved.numberIndexType) {
                        if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                            writePunctuation(writer, 13 /* OpenBraceToken */);
                            writePunctuation(writer, 14 /* CloseBraceToken */);
                            return;
                        }
                        if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                            if (flags & 64 /* InElementType */) {
                                writePunctuation(writer, 15 /* OpenParenToken */);
                            }
                            buildSignatureDisplay(resolved.callSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | 8 /* WriteArrowStyleSignature */, typeStack);
                            if (flags & 64 /* InElementType */) {
                                writePunctuation(writer, 16 /* CloseParenToken */);
                            }
                            return;
                        }
                        if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                            if (flags & 64 /* InElementType */) {
                                writePunctuation(writer, 15 /* OpenParenToken */);
                            }
                            writeKeyword(writer, 86 /* NewKeyword */);
                            writeSpace(writer);
                            buildSignatureDisplay(resolved.constructSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | 8 /* WriteArrowStyleSignature */, typeStack);
                            if (flags & 64 /* InElementType */) {
                                writePunctuation(writer, 16 /* CloseParenToken */);
                            }
                            return;
                        }
                    }
                    writePunctuation(writer, 13 /* OpenBraceToken */);
                    writer.writeLine();
                    writer.increaseIndent();
                    for (var i = 0; i < resolved.callSignatures.length; i++) {
                        buildSignatureDisplay(resolved.callSignatures[i], writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                        writePunctuation(writer, 21 /* SemicolonToken */);
                        writer.writeLine();
                    }
                    for (var i = 0; i < resolved.constructSignatures.length; i++) {
                        writeKeyword(writer, 86 /* NewKeyword */);
                        writeSpace(writer);
                        buildSignatureDisplay(resolved.constructSignatures[i], writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                        writePunctuation(writer, 21 /* SemicolonToken */);
                        writer.writeLine();
                    }
                    if (resolved.stringIndexType) {
                        writePunctuation(writer, 17 /* OpenBracketToken */);
                        writer.writeParameter("x");
                        writePunctuation(writer, 50 /* ColonToken */);
                        writeSpace(writer);
                        writeKeyword(writer, 118 /* StringKeyword */);
                        writePunctuation(writer, 18 /* CloseBracketToken */);
                        writePunctuation(writer, 50 /* ColonToken */);
                        writeSpace(writer);
                        writeType(resolved.stringIndexType, 0 /* None */);
                        writePunctuation(writer, 21 /* SemicolonToken */);
                        writer.writeLine();
                    }
                    if (resolved.numberIndexType) {
                        writePunctuation(writer, 17 /* OpenBracketToken */);
                        writer.writeParameter("x");
                        writePunctuation(writer, 50 /* ColonToken */);
                        writeSpace(writer);
                        writeKeyword(writer, 116 /* NumberKeyword */);
                        writePunctuation(writer, 18 /* CloseBracketToken */);
                        writePunctuation(writer, 50 /* ColonToken */);
                        writeSpace(writer);
                        writeType(resolved.numberIndexType, 0 /* None */);
                        writePunctuation(writer, 21 /* SemicolonToken */);
                        writer.writeLine();
                    }
                    for (var i = 0; i < resolved.properties.length; i++) {
                        var p = resolved.properties[i];
                        var t = getTypeOfSymbol(p);
                        if (p.flags & (16 /* Function */ | 8192 /* Method */) && !getPropertiesOfObjectType(t).length) {
                            var signatures = getSignaturesOfType(t, 0 /* Call */);
                            for (var j = 0; j < signatures.length; j++) {
                                buildSymbolDisplay(p, writer);
                                if (isOptionalProperty(p)) {
                                    writePunctuation(writer, 49 /* QuestionToken */);
                                }
                                buildSignatureDisplay(signatures[j], writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                                writePunctuation(writer, 21 /* SemicolonToken */);
                                writer.writeLine();
                            }
                        }
                        else {
                            buildSymbolDisplay(p, writer);
                            if (isOptionalProperty(p)) {
                                writePunctuation(writer, 49 /* QuestionToken */);
                            }
                            writePunctuation(writer, 50 /* ColonToken */);
                            writeSpace(writer);
                            writeType(t, 0 /* None */);
                            writePunctuation(writer, 21 /* SemicolonToken */);
                            writer.writeLine();
                        }
                    }
                    writer.decreaseIndent();
                    writePunctuation(writer, 14 /* CloseBraceToken */);
                }
            }
            function buildTypeParameterDisplayFromSymbol(symbol, writer, enclosingDeclaraiton, flags) {
                var targetSymbol = getTargetSymbol(symbol);
                if (targetSymbol.flags & 32 /* Class */ || targetSymbol.flags & 64 /* Interface */) {
                    buildDisplayForTypeParametersAndDelimiters(getTypeParametersOfClassOrInterface(symbol), writer, enclosingDeclaraiton, flags);
                }
            }
            function buildTypeParameterDisplay(tp, writer, enclosingDeclaration, flags, typeStack) {
                appendSymbolNameOnly(tp.symbol, writer);
                var constraint = getConstraintOfTypeParameter(tp);
                if (constraint) {
                    writeSpace(writer);
                    writeKeyword(writer, 77 /* ExtendsKeyword */);
                    writeSpace(writer);
                    buildTypeDisplay(constraint, writer, enclosingDeclaration, flags, typeStack);
                }
            }
            function buildParameterDisplay(p, writer, enclosingDeclaration, flags, typeStack) {
                if (getDeclarationFlagsFromSymbol(p) & 8 /* Rest */) {
                    writePunctuation(writer, 20 /* DotDotDotToken */);
                }
                appendSymbolNameOnly(p, writer);
                if (p.valueDeclaration.flags & 4 /* QuestionMark */ || p.valueDeclaration.initializer) {
                    writePunctuation(writer, 49 /* QuestionToken */);
                }
                writePunctuation(writer, 50 /* ColonToken */);
                writeSpace(writer);
                buildTypeDisplay(getTypeOfSymbol(p), writer, enclosingDeclaration, flags, typeStack);
            }
            function buildDisplayForTypeParametersAndDelimiters(typeParameters, writer, enclosingDeclaration, flags, typeStack) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, 23 /* LessThanToken */);
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, 22 /* CommaToken */);
                            writeSpace(writer);
                        }
                        buildTypeParameterDisplay(typeParameters[i], writer, enclosingDeclaration, flags, typeStack);
                    }
                    writePunctuation(writer, 24 /* GreaterThanToken */);
                }
            }
            function buildDisplayForTypeArgumentsAndDelimiters(typeParameters, mapper, writer, enclosingDeclaration, flags, typeStack) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, 23 /* LessThanToken */);
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, 22 /* CommaToken */);
                            writeSpace(writer);
                        }
                        buildTypeDisplay(mapper(typeParameters[i]), writer, enclosingDeclaration, 0 /* None */);
                    }
                    writePunctuation(writer, 24 /* GreaterThanToken */);
                }
            }
            function buildDisplayForParametersAndDelimiters(parameters, writer, enclosingDeclaration, flags, typeStack) {
                writePunctuation(writer, 15 /* OpenParenToken */);
                for (var i = 0; i < parameters.length; i++) {
                    if (i > 0) {
                        writePunctuation(writer, 22 /* CommaToken */);
                        writeSpace(writer);
                    }
                    buildParameterDisplay(parameters[i], writer, enclosingDeclaration, flags, typeStack);
                }
                writePunctuation(writer, 16 /* CloseParenToken */);
            }
            function buildReturnTypeDisplay(signature, writer, enclosingDeclaration, flags, typeStack) {
                if (flags & 8 /* WriteArrowStyleSignature */) {
                    writeSpace(writer);
                    writePunctuation(writer, 31 /* EqualsGreaterThanToken */);
                }
                else {
                    writePunctuation(writer, 50 /* ColonToken */);
                }
                writeSpace(writer);
                buildTypeDisplay(getReturnTypeOfSignature(signature), writer, enclosingDeclaration, flags, typeStack);
            }
            function buildSignatureDisplay(signature, writer, enclosingDeclaration, flags, typeStack) {
                if (signature.target && (flags & 32 /* WriteTypeArgumentsOfSignature */)) {
                    buildDisplayForTypeArgumentsAndDelimiters(signature.target.typeParameters, signature.mapper, writer, enclosingDeclaration);
                }
                else {
                    buildDisplayForTypeParametersAndDelimiters(signature.typeParameters, writer, enclosingDeclaration, flags, typeStack);
                }
                buildDisplayForParametersAndDelimiters(signature.parameters, writer, enclosingDeclaration, flags, typeStack);
                buildReturnTypeDisplay(signature, writer, enclosingDeclaration, flags, typeStack);
            }
            return _displayBuilder || (_displayBuilder = {
                symbolToString: symbolToString,
                typeToString: typeToString,
                buildSymbolDisplay: buildSymbolDisplay,
                buildTypeDisplay: buildTypeDisplay,
                buildTypeParameterDisplay: buildTypeParameterDisplay,
                buildParameterDisplay: buildParameterDisplay,
                buildDisplayForParametersAndDelimiters: buildDisplayForParametersAndDelimiters,
                buildDisplayForTypeParametersAndDelimiters: buildDisplayForTypeParametersAndDelimiters,
                buildDisplayForTypeArgumentsAndDelimiters: buildDisplayForTypeArgumentsAndDelimiters,
                buildTypeParameterDisplayFromSymbol: buildTypeParameterDisplayFromSymbol,
                buildSignatureDisplay: buildSignatureDisplay,
                buildReturnTypeDisplay: buildReturnTypeDisplay
            });
        }
        function isDeclarationVisible(node) {
            function getContainingExternalModule(node) {
                for (; node; node = node.parent) {
                    if (node.kind === 188 /* ModuleDeclaration */) {
                        if (node.name.kind === 7 /* StringLiteral */) {
                            return node;
                        }
                    }
                    else if (node.kind === 193 /* SourceFile */) {
                        return ts.isExternalModule(node) ? node : undefined;
                    }
                }
                ts.Debug.fail("getContainingModule cant reach here");
            }
            function isUsedInExportAssignment(node) {
                var externalModule = getContainingExternalModule(node);
                if (externalModule) {
                    var externalModuleSymbol = getSymbolOfNode(externalModule);
                    var exportAssignmentSymbol = getExportAssignmentSymbol(externalModuleSymbol);
                    var resolvedExportSymbol;
                    var symbolOfNode = getSymbolOfNode(node);
                    if (isSymbolUsedInExportAssignment(symbolOfNode)) {
                        return true;
                    }
                    if (symbolOfNode.flags & 33554432 /* Import */) {
                        return isSymbolUsedInExportAssignment(resolveImport(symbolOfNode));
                    }
                }
                function isSymbolUsedInExportAssignment(symbol) {
                    if (exportAssignmentSymbol === symbol) {
                        return true;
                    }
                    if (exportAssignmentSymbol && !!(exportAssignmentSymbol.flags & 33554432 /* Import */)) {
                        resolvedExportSymbol = resolvedExportSymbol || resolveImport(exportAssignmentSymbol);
                        if (resolvedExportSymbol === symbol) {
                            return true;
                        }
                        return ts.forEach(resolvedExportSymbol.declarations, function (declaration) {
                            while (declaration) {
                                if (declaration === node) {
                                    return true;
                                }
                                declaration = declaration.parent;
                            }
                        });
                    }
                }
            }
            function determineIfDeclarationIsVisible() {
                switch (node.kind) {
                    case 181 /* VariableDeclaration */:
                    case 188 /* ModuleDeclaration */:
                    case 184 /* ClassDeclaration */:
                    case 185 /* InterfaceDeclaration */:
                    case 186 /* TypeAliasDeclaration */:
                    case 182 /* FunctionDeclaration */:
                    case 187 /* EnumDeclaration */:
                    case 190 /* ImportDeclaration */:
                        var parent = node.kind === 181 /* VariableDeclaration */ ? node.parent.parent : node.parent;
                        if (!(node.flags & 1 /* Export */) && !(node.kind !== 190 /* ImportDeclaration */ && parent.kind !== 193 /* SourceFile */ && ts.isInAmbientContext(parent))) {
                            return isGlobalSourceFile(parent) || isUsedInExportAssignment(node);
                        }
                        return isDeclarationVisible(parent);
                    case 124 /* Property */:
                    case 125 /* Method */:
                        if (node.flags & (32 /* Private */ | 64 /* Protected */)) {
                            return false;
                        }
                    case 126 /* Constructor */:
                    case 130 /* ConstructSignature */:
                    case 129 /* CallSignature */:
                    case 131 /* IndexSignature */:
                    case 123 /* Parameter */:
                    case 189 /* ModuleBlock */:
                        return isDeclarationVisible(node.parent);
                    case 193 /* SourceFile */:
                        return true;
                    default:
                        ts.Debug.fail("isDeclarationVisible unknown: SyntaxKind: " + node.kind);
                }
            }
            if (node) {
                var links = getNodeLinks(node);
                if (links.isVisible === undefined) {
                    links.isVisible = !!determineIfDeclarationIsVisible();
                }
                return links.isVisible;
            }
        }
        function getTypeOfPrototypeProperty(prototype) {
            var classType = getDeclaredTypeOfSymbol(prototype.parent);
            return classType.typeParameters ? createTypeReference(classType, ts.map(classType.typeParameters, function (_) { return anyType; })) : classType;
        }
        function getTypeOfVariableDeclaration(declaration) {
            if (declaration.parent.kind === 166 /* ForInStatement */) {
                return anyType;
            }
            if (declaration.type) {
                return getTypeFromTypeNode(declaration.type);
            }
            if (declaration.kind === 123 /* Parameter */) {
                var func = declaration.parent;
                if (func.kind === 128 /* SetAccessor */) {
                    var getter = getDeclarationOfKind(declaration.parent.symbol, 127 /* GetAccessor */);
                    if (getter) {
                        return getReturnTypeOfSignature(getSignatureFromDeclaration(getter));
                    }
                }
                var type = getContextuallyTypedParameterType(declaration);
                if (type) {
                    return type;
                }
            }
            if (declaration.initializer) {
                var type = checkAndMarkExpression(declaration.initializer);
                if (declaration.kind !== 141 /* PropertyAssignment */) {
                    var unwidenedType = type;
                    type = getWidenedType(type);
                    if (type !== unwidenedType) {
                        checkImplicitAny(type);
                    }
                }
                return type;
            }
            var type = declaration.flags & 8 /* Rest */ ? createArrayType(anyType) : anyType;
            checkImplicitAny(type);
            return type;
            function checkImplicitAny(type) {
                if (!fullTypeCheck || !compilerOptions.noImplicitAny) {
                    return;
                }
                if (getInnermostTypeOfNestedArrayTypes(type) !== anyType) {
                    return;
                }
                if (isPrivateWithinAmbient(declaration) || (declaration.kind === 123 /* Parameter */ && isPrivateWithinAmbient(declaration.parent))) {
                    return;
                }
                switch (declaration.kind) {
                    case 124 /* Property */:
                        var diagnostic = ts.Diagnostics.Member_0_implicitly_has_an_1_type;
                        break;
                    case 123 /* Parameter */:
                        var diagnostic = declaration.flags & 8 /* Rest */ ? ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type : ts.Diagnostics.Parameter_0_implicitly_has_an_1_type;
                        break;
                    default:
                        var diagnostic = ts.Diagnostics.Variable_0_implicitly_has_an_1_type;
                }
                error(declaration, diagnostic, ts.identifierToString(declaration.name), typeToString(type));
            }
        }
        function getTypeOfVariableOrParameterOrProperty(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                if (symbol.flags & 536870912 /* Prototype */) {
                    return links.type = getTypeOfPrototypeProperty(symbol);
                }
                var declaration = symbol.valueDeclaration;
                if (declaration.kind === 178 /* CatchBlock */) {
                    return links.type = anyType;
                }
                links.type = resolvingType;
                var type = getTypeOfVariableDeclaration(declaration);
                if (links.type === resolvingType) {
                    links.type = type;
                }
            }
            else if (links.type === resolvingType) {
                links.type = anyType;
                if (compilerOptions.noImplicitAny) {
                    var diagnostic = symbol.valueDeclaration.type ? ts.Diagnostics._0_implicitly_has_type_any_because_it_is_referenced_directly_or_indirectly_in_its_own_type_annotation : ts.Diagnostics._0_implicitly_has_type_any_because_it_is_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer;
                    error(symbol.valueDeclaration, diagnostic, symbolToString(symbol));
                }
            }
            return links.type;
        }
        function getSetAccessorTypeAnnotationNode(accessor) {
            return accessor && accessor.parameters.length > 0 && accessor.parameters[0].type;
        }
        function getAnnotatedAccessorType(accessor) {
            if (accessor) {
                if (accessor.kind === 127 /* GetAccessor */) {
                    return accessor.type && getTypeFromTypeNode(accessor.type);
                }
                else {
                    var setterTypeAnnotation = getSetAccessorTypeAnnotationNode(accessor);
                    return setterTypeAnnotation && getTypeFromTypeNode(setterTypeAnnotation);
                }
            }
            return undefined;
        }
        function getTypeOfAccessors(symbol) {
            var links = getSymbolLinks(symbol);
            checkAndStoreTypeOfAccessors(symbol, links);
            return links.type;
        }
        function checkAndStoreTypeOfAccessors(symbol, links) {
            links = links || getSymbolLinks(symbol);
            if (!links.type) {
                links.type = resolvingType;
                var getter = getDeclarationOfKind(symbol, 127 /* GetAccessor */);
                var setter = getDeclarationOfKind(symbol, 128 /* SetAccessor */);
                var type;
                var getterReturnType = getAnnotatedAccessorType(getter);
                if (getterReturnType) {
                    type = getterReturnType;
                }
                else {
                    var setterParameterType = getAnnotatedAccessorType(setter);
                    if (setterParameterType) {
                        type = setterParameterType;
                    }
                    else {
                        if (getter) {
                            type = getReturnTypeFromBody(getter);
                        }
                        else {
                            if (compilerOptions.noImplicitAny) {
                                error(setter, ts.Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_type_annotation, symbolToString(symbol));
                            }
                            type = anyType;
                        }
                    }
                }
                if (links.type === resolvingType) {
                    links.type = type;
                }
            }
            else if (links.type === resolvingType) {
                links.type = anyType;
                if (compilerOptions.noImplicitAny) {
                    var getter = getDeclarationOfKind(symbol, 127 /* GetAccessor */);
                    error(getter, ts.Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, symbolToString(symbol));
                }
            }
        }
        function getTypeOfFuncClassEnumModule(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = createObjectType(32768 /* Anonymous */, symbol);
            }
            return links.type;
        }
        function getTypeOfEnumMember(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = getDeclaredTypeOfEnum(getParentOfSymbol(symbol));
            }
            return links.type;
        }
        function getTypeOfImport(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = getTypeOfSymbol(resolveImport(symbol));
            }
            return links.type;
        }
        function getTypeOfInstantiatedSymbol(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = instantiateType(getTypeOfSymbol(links.target), links.mapper);
            }
            return links.type;
        }
        function getTypeOfSymbol(symbol) {
            if (symbol.flags & 67108864 /* Instantiated */) {
                return getTypeOfInstantiatedSymbol(symbol);
            }
            if (symbol.flags & (3 /* Variable */ | 4 /* Property */)) {
                return getTypeOfVariableOrParameterOrProperty(symbol);
            }
            if (symbol.flags & (16 /* Function */ | 8192 /* Method */ | 32 /* Class */ | 384 /* Enum */ | 512 /* ValueModule */)) {
                return getTypeOfFuncClassEnumModule(symbol);
            }
            if (symbol.flags & 8 /* EnumMember */) {
                return getTypeOfEnumMember(symbol);
            }
            if (symbol.flags & 98304 /* Accessor */) {
                return getTypeOfAccessors(symbol);
            }
            if (symbol.flags & 33554432 /* Import */) {
                return getTypeOfImport(symbol);
            }
            return unknownType;
        }
        function getTargetType(type) {
            return type.flags & 4096 /* Reference */ ? type.target : type;
        }
        function hasBaseType(type, checkBase) {
            return check(type);
            function check(type) {
                var target = getTargetType(type);
                return target === checkBase || ts.forEach(target.baseTypes, check);
            }
        }
        function getTypeParametersOfClassOrInterface(symbol) {
            var result;
            ts.forEach(symbol.declarations, function (node) {
                if (node.kind === 185 /* InterfaceDeclaration */ || node.kind === 184 /* ClassDeclaration */) {
                    var declaration = node;
                    if (declaration.typeParameters && declaration.typeParameters.length) {
                        ts.forEach(declaration.typeParameters, function (node) {
                            var tp = getDeclaredTypeOfTypeParameter(getSymbolOfNode(node));
                            if (!result) {
                                result = [tp];
                            }
                            else if (!ts.contains(result, tp)) {
                                result.push(tp);
                            }
                        });
                    }
                }
            });
            return result;
        }
        function getDeclaredTypeOfClass(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = links.declaredType = createObjectType(1024 /* Class */, symbol);
                var typeParameters = getTypeParametersOfClassOrInterface(symbol);
                if (typeParameters) {
                    type.flags |= 4096 /* Reference */;
                    type.typeParameters = typeParameters;
                    type.instantiations = {};
                    type.instantiations[getTypeListId(type.typeParameters)] = type;
                    type.target = type;
                    type.typeArguments = type.typeParameters;
                }
                type.baseTypes = [];
                var declaration = getDeclarationOfKind(symbol, 184 /* ClassDeclaration */);
                if (declaration.baseType) {
                    var baseType = getTypeFromTypeReferenceNode(declaration.baseType);
                    if (baseType !== unknownType) {
                        if (getTargetType(baseType).flags & 1024 /* Class */) {
                            if (type !== baseType && !hasBaseType(baseType, type)) {
                                type.baseTypes.push(baseType);
                            }
                            else {
                                error(declaration, ts.Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, undefined, 1 /* WriteArrayAsGenericType */));
                            }
                        }
                        else {
                            error(declaration.baseType, ts.Diagnostics.A_class_may_only_extend_another_class);
                        }
                    }
                }
                type.declaredProperties = getNamedMembers(symbol.members);
                type.declaredCallSignatures = emptyArray;
                type.declaredConstructSignatures = emptyArray;
                type.declaredStringIndexType = getIndexTypeOfSymbol(symbol, 0 /* String */);
                type.declaredNumberIndexType = getIndexTypeOfSymbol(symbol, 1 /* Number */);
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfInterface(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = links.declaredType = createObjectType(2048 /* Interface */, symbol);
                var typeParameters = getTypeParametersOfClassOrInterface(symbol);
                if (typeParameters) {
                    type.flags |= 4096 /* Reference */;
                    type.typeParameters = typeParameters;
                    type.instantiations = {};
                    type.instantiations[getTypeListId(type.typeParameters)] = type;
                    type.target = type;
                    type.typeArguments = type.typeParameters;
                }
                type.baseTypes = [];
                ts.forEach(symbol.declarations, function (declaration) {
                    if (declaration.kind === 185 /* InterfaceDeclaration */ && declaration.baseTypes) {
                        ts.forEach(declaration.baseTypes, function (node) {
                            var baseType = getTypeFromTypeReferenceNode(node);
                            if (baseType !== unknownType) {
                                if (getTargetType(baseType).flags & (1024 /* Class */ | 2048 /* Interface */)) {
                                    if (type !== baseType && !hasBaseType(baseType, type)) {
                                        type.baseTypes.push(baseType);
                                    }
                                    else {
                                        error(declaration, ts.Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, undefined, 1 /* WriteArrayAsGenericType */));
                                    }
                                }
                                else {
                                    error(node, ts.Diagnostics.An_interface_may_only_extend_a_class_or_another_interface);
                                }
                            }
                        });
                    }
                });
                type.declaredProperties = getNamedMembers(symbol.members);
                type.declaredCallSignatures = getSignaturesOfSymbol(symbol.members["__call"]);
                type.declaredConstructSignatures = getSignaturesOfSymbol(symbol.members["__new"]);
                type.declaredStringIndexType = getIndexTypeOfSymbol(symbol, 0 /* String */);
                type.declaredNumberIndexType = getIndexTypeOfSymbol(symbol, 1 /* Number */);
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfTypeAlias(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                links.declaredType = resolvingType;
                var declaration = getDeclarationOfKind(symbol, 186 /* TypeAliasDeclaration */);
                var type = getTypeFromTypeNode(declaration.type);
                if (links.declaredType === resolvingType) {
                    links.declaredType = type;
                }
            }
            else if (links.declaredType === resolvingType) {
                links.declaredType = unknownType;
                var declaration = getDeclarationOfKind(symbol, 186 /* TypeAliasDeclaration */);
                error(declaration.name, ts.Diagnostics.Type_alias_0_circularly_references_itself, symbolToString(symbol));
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfEnum(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = createType(128 /* Enum */);
                type.symbol = symbol;
                links.declaredType = type;
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfTypeParameter(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = createType(512 /* TypeParameter */);
                type.symbol = symbol;
                if (!getDeclarationOfKind(symbol, 122 /* TypeParameter */).constraint) {
                    type.constraint = noConstraintType;
                }
                links.declaredType = type;
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfImport(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                links.declaredType = getDeclaredTypeOfSymbol(resolveImport(symbol));
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfSymbol(symbol) {
            ts.Debug.assert((symbol.flags & 67108864 /* Instantiated */) === 0);
            if (symbol.flags & 32 /* Class */) {
                return getDeclaredTypeOfClass(symbol);
            }
            if (symbol.flags & 64 /* Interface */) {
                return getDeclaredTypeOfInterface(symbol);
            }
            if (symbol.flags & 2097152 /* TypeAlias */) {
                return getDeclaredTypeOfTypeAlias(symbol);
            }
            if (symbol.flags & 384 /* Enum */) {
                return getDeclaredTypeOfEnum(symbol);
            }
            if (symbol.flags & 1048576 /* TypeParameter */) {
                return getDeclaredTypeOfTypeParameter(symbol);
            }
            if (symbol.flags & 33554432 /* Import */) {
                return getDeclaredTypeOfImport(symbol);
            }
            return unknownType;
        }
        function createSymbolTable(symbols) {
            var result = {};
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                result[symbol.name] = symbol;
            }
            return result;
        }
        function createInstantiatedSymbolTable(symbols, mapper) {
            var result = {};
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                result[symbol.name] = instantiateSymbol(symbol, mapper);
            }
            return result;
        }
        function addInheritedMembers(symbols, baseSymbols) {
            for (var i = 0; i < baseSymbols.length; i++) {
                var s = baseSymbols[i];
                if (!ts.hasProperty(symbols, s.name)) {
                    symbols[s.name] = s;
                }
            }
        }
        function addInheritedSignatures(signatures, baseSignatures) {
            if (baseSignatures) {
                for (var i = 0; i < baseSignatures.length; i++) {
                    signatures.push(baseSignatures[i]);
                }
            }
        }
        function resolveClassOrInterfaceMembers(type) {
            var members = type.symbol.members;
            var callSignatures = type.declaredCallSignatures;
            var constructSignatures = type.declaredConstructSignatures;
            var stringIndexType = type.declaredStringIndexType;
            var numberIndexType = type.declaredNumberIndexType;
            if (type.baseTypes.length) {
                members = createSymbolTable(type.declaredProperties);
                ts.forEach(type.baseTypes, function (baseType) {
                    addInheritedMembers(members, getPropertiesOfObjectType(baseType));
                    callSignatures = ts.concatenate(callSignatures, getSignaturesOfType(baseType, 0 /* Call */));
                    constructSignatures = ts.concatenate(constructSignatures, getSignaturesOfType(baseType, 1 /* Construct */));
                    stringIndexType = stringIndexType || getIndexTypeOfType(baseType, 0 /* String */);
                    numberIndexType = numberIndexType || getIndexTypeOfType(baseType, 1 /* Number */);
                });
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function resolveTypeReferenceMembers(type) {
            var target = type.target;
            var mapper = createTypeMapper(target.typeParameters, type.typeArguments);
            var members = createInstantiatedSymbolTable(target.declaredProperties, mapper);
            var callSignatures = instantiateList(target.declaredCallSignatures, mapper, instantiateSignature);
            var constructSignatures = instantiateList(target.declaredConstructSignatures, mapper, instantiateSignature);
            var stringIndexType = target.declaredStringIndexType ? instantiateType(target.declaredStringIndexType, mapper) : undefined;
            var numberIndexType = target.declaredNumberIndexType ? instantiateType(target.declaredNumberIndexType, mapper) : undefined;
            ts.forEach(target.baseTypes, function (baseType) {
                var instantiatedBaseType = instantiateType(baseType, mapper);
                addInheritedMembers(members, getPropertiesOfObjectType(instantiatedBaseType));
                callSignatures = ts.concatenate(callSignatures, getSignaturesOfType(instantiatedBaseType, 0 /* Call */));
                constructSignatures = ts.concatenate(constructSignatures, getSignaturesOfType(instantiatedBaseType, 1 /* Construct */));
                stringIndexType = stringIndexType || getIndexTypeOfType(instantiatedBaseType, 0 /* String */);
                numberIndexType = numberIndexType || getIndexTypeOfType(instantiatedBaseType, 1 /* Number */);
            });
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function createSignature(declaration, typeParameters, parameters, resolvedReturnType, minArgumentCount, hasRestParameter, hasStringLiterals) {
            var sig = new Signature(checker);
            sig.declaration = declaration;
            sig.typeParameters = typeParameters;
            sig.parameters = parameters;
            sig.resolvedReturnType = resolvedReturnType;
            sig.minArgumentCount = minArgumentCount;
            sig.hasRestParameter = hasRestParameter;
            sig.hasStringLiterals = hasStringLiterals;
            return sig;
        }
        function cloneSignature(sig) {
            return createSignature(sig.declaration, sig.typeParameters, sig.parameters, sig.resolvedReturnType, sig.minArgumentCount, sig.hasRestParameter, sig.hasStringLiterals);
        }
        function getDefaultConstructSignatures(classType) {
            if (classType.baseTypes.length) {
                var baseType = classType.baseTypes[0];
                var baseSignatures = getSignaturesOfType(getTypeOfSymbol(baseType.symbol), 1 /* Construct */);
                return ts.map(baseSignatures, function (baseSignature) {
                    var signature = baseType.flags & 4096 /* Reference */ ? getSignatureInstantiation(baseSignature, baseType.typeArguments) : cloneSignature(baseSignature);
                    signature.typeParameters = classType.typeParameters;
                    signature.resolvedReturnType = classType;
                    return signature;
                });
            }
            return [createSignature(undefined, classType.typeParameters, emptyArray, classType, 0, false, false)];
        }
        function createTupleTypeMemberSymbols(memberTypes) {
            var members = {};
            for (var i = 0; i < memberTypes.length; i++) {
                var symbol = createSymbol(4 /* Property */ | 268435456 /* Transient */, "" + i);
                symbol.type = memberTypes[i];
                members[i] = symbol;
            }
            return members;
        }
        function resolveTupleTypeMembers(type) {
            var arrayType = resolveObjectOrUnionTypeMembers(createArrayType(getUnionType(type.elementTypes)));
            var members = createTupleTypeMemberSymbols(type.elementTypes);
            addInheritedMembers(members, arrayType.properties);
            setObjectTypeMembers(type, members, arrayType.callSignatures, arrayType.constructSignatures, arrayType.stringIndexType, arrayType.numberIndexType);
        }
        function signatureListsIdentical(s, t) {
            if (s.length !== t.length) {
                return false;
            }
            for (var i = 0; i < s.length; i++) {
                if (!compareSignatures(s[i], t[i], false, compareTypes)) {
                    return false;
                }
            }
            return true;
        }
        function getUnionSignatures(types, kind) {
            var signatureLists = ts.map(types, function (t) { return getSignaturesOfType(t, kind); });
            var signatures = signatureLists[0];
            for (var i = 0; i < signatures.length; i++) {
                if (signatures[i].typeParameters) {
                    return emptyArray;
                }
            }
            for (var i = 1; i < signatureLists.length; i++) {
                if (!signatureListsIdentical(signatures, signatureLists[i])) {
                    return emptyArray;
                }
            }
            var result = ts.map(signatures, cloneSignature);
            for (var i = 0; i < result.length; i++) {
                var s = result[i];
                s.resolvedReturnType = undefined;
                s.unionSignatures = ts.map(signatureLists, function (signatures) { return signatures[i]; });
            }
            return result;
        }
        function getUnionIndexType(types, kind) {
            var indexTypes = [];
            for (var i = 0; i < types.length; i++) {
                var indexType = getIndexTypeOfType(types[i], kind);
                if (!indexType) {
                    return undefined;
                }
                indexTypes.push(indexType);
            }
            return getUnionType(indexTypes);
        }
        function resolveUnionTypeMembers(type) {
            var callSignatures = getUnionSignatures(type.types, 0 /* Call */);
            var constructSignatures = getUnionSignatures(type.types, 1 /* Construct */);
            var stringIndexType = getUnionIndexType(type.types, 0 /* String */);
            var numberIndexType = getUnionIndexType(type.types, 1 /* Number */);
            setObjectTypeMembers(type, emptySymbols, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function resolveAnonymousTypeMembers(type) {
            var symbol = type.symbol;
            if (symbol.flags & 2048 /* TypeLiteral */) {
                var members = symbol.members;
                var callSignatures = getSignaturesOfSymbol(members["__call"]);
                var constructSignatures = getSignaturesOfSymbol(members["__new"]);
                var stringIndexType = getIndexTypeOfSymbol(symbol, 0 /* String */);
                var numberIndexType = getIndexTypeOfSymbol(symbol, 1 /* Number */);
            }
            else {
                var members = emptySymbols;
                var callSignatures = emptyArray;
                var constructSignatures = emptyArray;
                if (symbol.flags & 1952 /* HasExports */) {
                    members = symbol.exports;
                }
                if (symbol.flags & (16 /* Function */ | 8192 /* Method */)) {
                    callSignatures = getSignaturesOfSymbol(symbol);
                }
                if (symbol.flags & 32 /* Class */) {
                    var classType = getDeclaredTypeOfClass(symbol);
                    constructSignatures = getSignaturesOfSymbol(symbol.members["__constructor"]);
                    if (!constructSignatures.length) {
                        constructSignatures = getDefaultConstructSignatures(classType);
                    }
                    if (classType.baseTypes.length) {
                        members = createSymbolTable(getNamedMembers(members));
                        addInheritedMembers(members, getPropertiesOfObjectType(getTypeOfSymbol(classType.baseTypes[0].symbol)));
                    }
                }
                var stringIndexType = undefined;
                var numberIndexType = (symbol.flags & 384 /* Enum */) ? stringType : undefined;
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function resolveObjectOrUnionTypeMembers(type) {
            if (!type.members) {
                if (type.flags & (1024 /* Class */ | 2048 /* Interface */)) {
                    resolveClassOrInterfaceMembers(type);
                }
                else if (type.flags & 32768 /* Anonymous */) {
                    resolveAnonymousTypeMembers(type);
                }
                else if (type.flags & 8192 /* Tuple */) {
                    resolveTupleTypeMembers(type);
                }
                else if (type.flags & 16384 /* Union */) {
                    resolveUnionTypeMembers(type);
                }
                else {
                    resolveTypeReferenceMembers(type);
                }
            }
            return type;
        }
        function getPropertiesOfObjectType(type) {
            if (type.flags & 48128 /* ObjectType */) {
                return resolveObjectOrUnionTypeMembers(type).properties;
            }
            return emptyArray;
        }
        function getPropertyOfObjectType(type, name) {
            if (type.flags & 48128 /* ObjectType */) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                if (ts.hasProperty(resolved.members, name)) {
                    var symbol = resolved.members[name];
                    if (symbolIsValue(symbol)) {
                        return symbol;
                    }
                }
            }
        }
        function getPropertiesOfUnionType(type) {
            var result = [];
            ts.forEach(getPropertiesOfType(type.types[0]), function (prop) {
                var unionProp = getPropertyOfUnionType(type, prop.name);
                if (unionProp) {
                    result.push(unionProp);
                }
            });
            return result;
        }
        function getPropertiesOfType(type) {
            if (type.flags & 16384 /* Union */) {
                return getPropertiesOfUnionType(type);
            }
            return getPropertiesOfObjectType(getApparentType(type));
        }
        function getApparentType(type) {
            if (type.flags & 512 /* TypeParameter */) {
                do {
                    type = getConstraintOfTypeParameter(type);
                } while (type && type.flags & 512 /* TypeParameter */);
                if (!type) {
                    type = emptyObjectType;
                }
            }
            if (type.flags & 258 /* StringLike */) {
                type = globalStringType;
            }
            else if (type.flags & 132 /* NumberLike */) {
                type = globalNumberType;
            }
            else if (type.flags & 8 /* Boolean */) {
                type = globalBooleanType;
            }
            return type;
        }
        function createUnionProperty(unionType, name) {
            var types = unionType.types;
            var props;
            for (var i = 0; i < types.length; i++) {
                var type = getApparentType(types[i]);
                if (type !== unknownType) {
                    var prop = getPropertyOfType(type, name);
                    if (!prop) {
                        return undefined;
                    }
                    if (!props) {
                        props = [prop];
                    }
                    else {
                        props.push(prop);
                    }
                }
            }
            var propTypes = [];
            var declarations = [];
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (prop.declarations) {
                    declarations.push.apply(declarations, prop.declarations);
                }
                propTypes.push(getTypeOfSymbol(prop));
            }
            var result = createSymbol(4 /* Property */ | 268435456 /* Transient */ | 1073741824 /* UnionProperty */, name);
            result.unionType = unionType;
            result.declarations = declarations;
            result.type = getUnionType(propTypes);
            return result;
        }
        function getPropertyOfUnionType(type, name) {
            var properties = type.resolvedProperties || (type.resolvedProperties = {});
            if (ts.hasProperty(properties, name)) {
                return properties[name];
            }
            var property = createUnionProperty(type, name);
            if (property) {
                properties[name] = property;
            }
            return property;
        }
        function getPropertyOfType(type, name) {
            if (type.flags & 16384 /* Union */) {
                return getPropertyOfUnionType(type, name);
            }
            if (!(type.flags & 48128 /* ObjectType */)) {
                type = getApparentType(type);
                if (!(type.flags & 48128 /* ObjectType */)) {
                    return undefined;
                }
            }
            var resolved = resolveObjectOrUnionTypeMembers(type);
            if (ts.hasProperty(resolved.members, name)) {
                var symbol = resolved.members[name];
                if (symbolIsValue(symbol)) {
                    return symbol;
                }
            }
            if (resolved === anyFunctionType || resolved.callSignatures.length || resolved.constructSignatures.length) {
                var symbol = getPropertyOfObjectType(globalFunctionType, name);
                if (symbol)
                    return symbol;
            }
            return getPropertyOfObjectType(globalObjectType, name);
        }
        function getSignaturesOfObjectOrUnionType(type, kind) {
            if (type.flags & (48128 /* ObjectType */ | 16384 /* Union */)) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                return kind === 0 /* Call */ ? resolved.callSignatures : resolved.constructSignatures;
            }
            return emptyArray;
        }
        function getSignaturesOfType(type, kind) {
            return getSignaturesOfObjectOrUnionType(getApparentType(type), kind);
        }
        function getIndexTypeOfObjectOrUnionType(type, kind) {
            if (type.flags & (48128 /* ObjectType */ | 16384 /* Union */)) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                return kind === 0 /* String */ ? resolved.stringIndexType : resolved.numberIndexType;
            }
        }
        function getIndexTypeOfType(type, kind) {
            return getIndexTypeOfObjectOrUnionType(getApparentType(type), kind);
        }
        function getTypeParametersFromDeclaration(typeParameterDeclarations) {
            var result = [];
            ts.forEach(typeParameterDeclarations, function (node) {
                var tp = getDeclaredTypeOfTypeParameter(node.symbol);
                if (!ts.contains(result, tp)) {
                    result.push(tp);
                }
            });
            return result;
        }
        function getSignatureFromDeclaration(declaration) {
            var links = getNodeLinks(declaration);
            if (!links.resolvedSignature) {
                var classType = declaration.kind === 126 /* Constructor */ ? getDeclaredTypeOfClass(declaration.parent.symbol) : undefined;
                var typeParameters = classType ? classType.typeParameters : declaration.typeParameters ? getTypeParametersFromDeclaration(declaration.typeParameters) : undefined;
                var parameters = [];
                var hasStringLiterals = false;
                var minArgumentCount = -1;
                for (var i = 0, n = declaration.parameters.length; i < n; i++) {
                    var param = declaration.parameters[i];
                    parameters.push(param.symbol);
                    if (param.type && param.type.kind === 7 /* StringLiteral */) {
                        hasStringLiterals = true;
                    }
                    if (minArgumentCount < 0) {
                        if (param.initializer || param.flags & (4 /* QuestionMark */ | 8 /* Rest */)) {
                            minArgumentCount = i;
                        }
                    }
                }
                if (minArgumentCount < 0) {
                    minArgumentCount = declaration.parameters.length;
                }
                var returnType;
                if (classType) {
                    returnType = classType;
                }
                else if (declaration.type) {
                    returnType = getTypeFromTypeNode(declaration.type);
                }
                else {
                    if (declaration.kind === 127 /* GetAccessor */) {
                        var setter = getDeclarationOfKind(declaration.symbol, 128 /* SetAccessor */);
                        returnType = getAnnotatedAccessorType(setter);
                    }
                    if (!returnType && !declaration.body) {
                        returnType = anyType;
                    }
                }
                links.resolvedSignature = createSignature(declaration, typeParameters, parameters, returnType, minArgumentCount, ts.hasRestParameters(declaration), hasStringLiterals);
            }
            return links.resolvedSignature;
        }
        function getSignaturesOfSymbol(symbol) {
            if (!symbol)
                return emptyArray;
            var result = [];
            for (var i = 0, len = symbol.declarations.length; i < len; i++) {
                var node = symbol.declarations[i];
                switch (node.kind) {
                    case 182 /* FunctionDeclaration */:
                    case 125 /* Method */:
                    case 126 /* Constructor */:
                    case 129 /* CallSignature */:
                    case 130 /* ConstructSignature */:
                    case 131 /* IndexSignature */:
                    case 127 /* GetAccessor */:
                    case 128 /* SetAccessor */:
                    case 149 /* FunctionExpression */:
                    case 150 /* ArrowFunction */:
                        if (i > 0 && node.body) {
                            var previous = symbol.declarations[i - 1];
                            if (node.parent === previous.parent && node.kind === previous.kind && node.pos === previous.end) {
                                break;
                            }
                        }
                        result.push(getSignatureFromDeclaration(node));
                }
            }
            return result;
        }
        function getReturnTypeOfSignature(signature) {
            if (!signature.resolvedReturnType) {
                signature.resolvedReturnType = resolvingType;
                if (signature.target) {
                    var type = instantiateType(getReturnTypeOfSignature(signature.target), signature.mapper);
                }
                else if (signature.unionSignatures) {
                    var type = getUnionType(ts.map(signature.unionSignatures, getReturnTypeOfSignature));
                }
                else {
                    var type = getReturnTypeFromBody(signature.declaration);
                }
                if (signature.resolvedReturnType === resolvingType) {
                    signature.resolvedReturnType = type;
                }
            }
            else if (signature.resolvedReturnType === resolvingType) {
                signature.resolvedReturnType = anyType;
                if (compilerOptions.noImplicitAny) {
                    var declaration = signature.declaration;
                    if (declaration.name) {
                        error(declaration.name, ts.Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, ts.identifierToString(declaration.name));
                    }
                    else {
                        error(declaration, ts.Diagnostics.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions);
                    }
                }
            }
            return signature.resolvedReturnType;
        }
        function getRestTypeOfSignature(signature) {
            if (signature.hasRestParameter) {
                var type = getTypeOfSymbol(signature.parameters[signature.parameters.length - 1]);
                if (type.flags & 4096 /* Reference */ && type.target === globalArrayType) {
                    return type.typeArguments[0];
                }
            }
            return anyType;
        }
        function getSignatureInstantiation(signature, typeArguments) {
            return instantiateSignature(signature, createTypeMapper(signature.typeParameters, typeArguments), true);
        }
        function getErasedSignature(signature) {
            if (!signature.typeParameters)
                return signature;
            if (!signature.erasedSignatureCache) {
                if (signature.target) {
                    signature.erasedSignatureCache = instantiateSignature(getErasedSignature(signature.target), signature.mapper);
                }
                else {
                    signature.erasedSignatureCache = instantiateSignature(signature, createTypeEraser(signature.typeParameters), true);
                }
            }
            return signature.erasedSignatureCache;
        }
        function getOrCreateTypeFromSignature(signature) {
            if (!signature.isolatedSignatureType) {
                var isConstructor = signature.declaration.kind === 126 /* Constructor */ || signature.declaration.kind === 130 /* ConstructSignature */;
                var type = createObjectType(32768 /* Anonymous */ | 65536 /* FromSignature */);
                type.members = emptySymbols;
                type.properties = emptyArray;
                type.callSignatures = !isConstructor ? [signature] : emptyArray;
                type.constructSignatures = isConstructor ? [signature] : emptyArray;
                signature.isolatedSignatureType = type;
            }
            return signature.isolatedSignatureType;
        }
        function getIndexSymbol(symbol) {
            return symbol.members["__index"];
        }
        function getIndexDeclarationOfSymbol(symbol, kind) {
            var syntaxKind = kind === 1 /* Number */ ? 116 /* NumberKeyword */ : 118 /* StringKeyword */;
            var indexSymbol = getIndexSymbol(symbol);
            if (indexSymbol) {
                var len = indexSymbol.declarations.length;
                for (var i = 0; i < len; i++) {
                    var node = indexSymbol.declarations[i];
                    if (node.parameters.length === 1) {
                        var parameter = node.parameters[0];
                        if (parameter && parameter.type && parameter.type.kind === syntaxKind) {
                            return node;
                        }
                    }
                }
            }
            return undefined;
        }
        function getIndexTypeOfSymbol(symbol, kind) {
            var declaration = getIndexDeclarationOfSymbol(symbol, kind);
            return declaration ? declaration.type ? getTypeFromTypeNode(declaration.type) : anyType : undefined;
        }
        function getConstraintOfTypeParameter(type) {
            if (!type.constraint) {
                if (type.target) {
                    var targetConstraint = getConstraintOfTypeParameter(type.target);
                    type.constraint = targetConstraint ? instantiateType(targetConstraint, type.mapper) : noConstraintType;
                }
                else {
                    type.constraint = getTypeFromTypeNode(getDeclarationOfKind(type.symbol, 122 /* TypeParameter */).constraint);
                }
            }
            return type.constraint === noConstraintType ? undefined : type.constraint;
        }
        function getTypeListId(types) {
            switch (types.length) {
                case 1:
                    return "" + types[0].id;
                case 2:
                    return types[0].id + "," + types[1].id;
                default:
                    var result = "";
                    for (var i = 0; i < types.length; i++) {
                        if (i > 0)
                            result += ",";
                        result += types[i].id;
                    }
                    return result;
            }
        }
        function createTypeReference(target, typeArguments) {
            var id = getTypeListId(typeArguments);
            var type = target.instantiations[id];
            if (!type) {
                type = target.instantiations[id] = createObjectType(4096 /* Reference */, target.symbol);
                type.target = target;
                type.typeArguments = typeArguments;
            }
            return type;
        }
        function isTypeParameterReferenceIllegalInConstraint(typeReferenceNode, typeParameterSymbol) {
            var links = getNodeLinks(typeReferenceNode);
            if (links.isIllegalTypeReferenceInConstraint !== undefined) {
                return links.isIllegalTypeReferenceInConstraint;
            }
            var currentNode = typeReferenceNode;
            while (!ts.forEach(typeParameterSymbol.declarations, function (d) { return d.parent === currentNode.parent; })) {
                currentNode = currentNode.parent;
            }
            links.isIllegalTypeReferenceInConstraint = currentNode.kind === 122 /* TypeParameter */;
            return links.isIllegalTypeReferenceInConstraint;
        }
        function checkTypeParameterHasIllegalReferencesInConstraint(typeParameter) {
            var typeParameterSymbol;
            function check(n) {
                if (n.kind === 132 /* TypeReference */ && n.typeName.kind === 63 /* Identifier */) {
                    var links = getNodeLinks(n);
                    if (links.isIllegalTypeReferenceInConstraint === undefined) {
                        var symbol = resolveName(typeParameter, n.typeName.text, 3152352 /* Type */, undefined, undefined);
                        if (symbol && (symbol.flags & 1048576 /* TypeParameter */)) {
                            links.isIllegalTypeReferenceInConstraint = ts.forEach(symbol.declarations, function (d) { return d.parent == typeParameter.parent; });
                        }
                    }
                    if (links.isIllegalTypeReferenceInConstraint) {
                        error(typeParameter, ts.Diagnostics.Constraint_of_a_type_parameter_cannot_reference_any_type_parameter_from_the_same_type_parameter_list);
                    }
                }
                ts.forEachChild(n, check);
            }
            if (typeParameter.constraint) {
                typeParameterSymbol = getSymbolOfNode(typeParameter);
                check(typeParameter.constraint);
            }
        }
        function getTypeFromTypeReferenceNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                var symbol = resolveEntityName(node, node.typeName, 3152352 /* Type */);
                if (symbol) {
                    var type;
                    if ((symbol.flags & 1048576 /* TypeParameter */) && isTypeParameterReferenceIllegalInConstraint(node, symbol)) {
                        type = unknownType;
                    }
                    else {
                        type = getDeclaredTypeOfSymbol(symbol);
                        if (type.flags & (1024 /* Class */ | 2048 /* Interface */) && type.flags & 4096 /* Reference */) {
                            var typeParameters = type.typeParameters;
                            if (node.typeArguments && node.typeArguments.length === typeParameters.length) {
                                type = createTypeReference(type, ts.map(node.typeArguments, getTypeFromTypeNode));
                            }
                            else {
                                error(node, ts.Diagnostics.Generic_type_0_requires_1_type_argument_s, typeToString(type, undefined, 1 /* WriteArrayAsGenericType */), typeParameters.length);
                                type = undefined;
                            }
                        }
                        else {
                            if (node.typeArguments) {
                                error(node, ts.Diagnostics.Type_0_is_not_generic, typeToString(type));
                                type = undefined;
                            }
                        }
                    }
                }
                links.resolvedType = type || unknownType;
            }
            return links.resolvedType;
        }
        function getTypeFromTypeQueryNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getWidenedType(checkExpression(node.exprName));
            }
            return links.resolvedType;
        }
        function getTypeOfGlobalSymbol(symbol, arity) {
            function getTypeDeclaration(symbol) {
                var declarations = symbol.declarations;
                for (var i = 0; i < declarations.length; i++) {
                    var declaration = declarations[i];
                    switch (declaration.kind) {
                        case 184 /* ClassDeclaration */:
                        case 185 /* InterfaceDeclaration */:
                        case 187 /* EnumDeclaration */:
                            return declaration;
                    }
                }
            }
            if (!symbol) {
                return emptyObjectType;
            }
            var type = getDeclaredTypeOfSymbol(symbol);
            if (!(type.flags & 48128 /* ObjectType */)) {
                error(getTypeDeclaration(symbol), ts.Diagnostics.Global_type_0_must_be_a_class_or_interface_type, symbol.name);
                return emptyObjectType;
            }
            if ((type.typeParameters ? type.typeParameters.length : 0) !== arity) {
                error(getTypeDeclaration(symbol), ts.Diagnostics.Global_type_0_must_have_1_type_parameter_s, symbol.name, arity);
                return emptyObjectType;
            }
            return type;
        }
        function getGlobalSymbol(name) {
            return resolveName(undefined, name, 3152352 /* Type */, ts.Diagnostics.Cannot_find_global_type_0, name);
        }
        function getGlobalType(name) {
            return getTypeOfGlobalSymbol(getGlobalSymbol(name), 0);
        }
        function createArrayType(elementType) {
            var arrayType = globalArrayType || getDeclaredTypeOfSymbol(globalArraySymbol);
            return arrayType !== emptyObjectType ? createTypeReference(arrayType, [elementType]) : emptyObjectType;
        }
        function getTypeFromArrayTypeNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createArrayType(getTypeFromTypeNode(node.elementType));
            }
            return links.resolvedType;
        }
        function createTupleType(elementTypes) {
            var id = getTypeListId(elementTypes);
            var type = tupleTypes[id];
            if (!type) {
                type = tupleTypes[id] = createObjectType(8192 /* Tuple */);
                type.elementTypes = elementTypes;
            }
            return type;
        }
        function getTypeFromTupleTypeNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createTupleType(ts.map(node.elementTypes, getTypeFromTypeNode));
            }
            return links.resolvedType;
        }
        function addTypeToSortedSet(sortedSet, type) {
            if (type.flags & 16384 /* Union */) {
                addTypesToSortedSet(sortedSet, type.types);
            }
            else {
                var i = 0;
                var id = type.id;
                while (i < sortedSet.length && sortedSet[i].id < id) {
                    i++;
                }
                if (i === sortedSet.length || sortedSet[i].id !== id) {
                    sortedSet.splice(i, 0, type);
                }
            }
        }
        function addTypesToSortedSet(sortedTypes, types) {
            for (var i = 0, len = types.length; i < len; i++) {
                addTypeToSortedSet(sortedTypes, types[i]);
            }
        }
        function isSubtypeOfAny(candidate, types) {
            for (var i = 0, len = types.length; i < len; i++) {
                if (candidate !== types[i] && isTypeSubtypeOf(candidate, types[i])) {
                    return true;
                }
            }
            return false;
        }
        function removeSubtypes(types) {
            var i = types.length;
            while (i > 0) {
                i--;
                if (isSubtypeOfAny(types[i], types)) {
                    types.splice(i, 1);
                }
            }
        }
        function containsAnyType(types) {
            for (var i = 0; i < types.length; i++) {
                if (types[i].flags & 1 /* Any */) {
                    return true;
                }
            }
            return false;
        }
        function removeAllButLast(types, typeToRemove) {
            var i = types.length;
            while (i > 0 && types.length > 1) {
                i--;
                if (types[i] === typeToRemove) {
                    types.splice(i, 1);
                }
            }
        }
        function getUnionType(types, noSubtypeReduction) {
            if (types.length === 0) {
                return emptyObjectType;
            }
            var sortedTypes = [];
            addTypesToSortedSet(sortedTypes, types);
            if (noSubtypeReduction) {
                if (containsAnyType(sortedTypes)) {
                    return anyType;
                }
                removeAllButLast(sortedTypes, undefinedType);
                removeAllButLast(sortedTypes, nullType);
            }
            else {
                removeSubtypes(sortedTypes);
            }
            if (sortedTypes.length === 1) {
                return sortedTypes[0];
            }
            var id = getTypeListId(sortedTypes);
            var type = unionTypes[id];
            if (!type) {
                type = unionTypes[id] = createObjectType(16384 /* Union */);
                type.types = sortedTypes;
            }
            return type;
        }
        function getTypeFromUnionTypeNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getUnionType(ts.map(node.types, getTypeFromTypeNode), true);
            }
            return links.resolvedType;
        }
        function getTypeFromTypeLiteralNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createObjectType(32768 /* Anonymous */, node.symbol);
            }
            return links.resolvedType;
        }
        function getStringLiteralType(node) {
            if (ts.hasProperty(stringLiteralTypes, node.text))
                return stringLiteralTypes[node.text];
            var type = stringLiteralTypes[node.text] = createType(256 /* StringLiteral */);
            type.text = ts.getTextOfNode(node);
            return type;
        }
        function getTypeFromStringLiteral(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getStringLiteralType(node);
            }
            return links.resolvedType;
        }
        function getTypeFromTypeNode(node) {
            switch (node.kind) {
                case 109 /* AnyKeyword */:
                    return anyType;
                case 118 /* StringKeyword */:
                    return stringType;
                case 116 /* NumberKeyword */:
                    return numberType;
                case 110 /* BooleanKeyword */:
                    return booleanType;
                case 97 /* VoidKeyword */:
                    return voidType;
                case 7 /* StringLiteral */:
                    return getTypeFromStringLiteral(node);
                case 132 /* TypeReference */:
                    return getTypeFromTypeReferenceNode(node);
                case 133 /* TypeQuery */:
                    return getTypeFromTypeQueryNode(node);
                case 135 /* ArrayType */:
                    return getTypeFromArrayTypeNode(node);
                case 136 /* TupleType */:
                    return getTypeFromTupleTypeNode(node);
                case 137 /* UnionType */:
                    return getTypeFromUnionTypeNode(node);
                case 138 /* ParenType */:
                    return getTypeFromTypeNode(node.type);
                case 134 /* TypeLiteral */:
                    return getTypeFromTypeLiteralNode(node);
                case 63 /* Identifier */:
                case 121 /* QualifiedName */:
                    var symbol = getSymbolInfo(node);
                    return symbol && getDeclaredTypeOfSymbol(symbol);
                default:
                    return unknownType;
            }
        }
        function instantiateList(items, mapper, instantiator) {
            if (items && items.length) {
                var result = [];
                for (var i = 0; i < items.length; i++) {
                    result.push(instantiator(items[i], mapper));
                }
                return result;
            }
            return items;
        }
        function createUnaryTypeMapper(source, target) {
            return function (t) { return t === source ? target : t; };
        }
        function createBinaryTypeMapper(source1, target1, source2, target2) {
            return function (t) { return t === source1 ? target1 : t === source2 ? target2 : t; };
        }
        function createTypeMapper(sources, targets) {
            switch (sources.length) {
                case 1: return createUnaryTypeMapper(sources[0], targets[0]);
                case 2: return createBinaryTypeMapper(sources[0], targets[0], sources[1], targets[1]);
            }
            return function (t) {
                for (var i = 0; i < sources.length; i++) {
                    if (t === sources[i])
                        return targets[i];
                }
                return t;
            };
        }
        function createUnaryTypeEraser(source) {
            return function (t) { return t === source ? anyType : t; };
        }
        function createBinaryTypeEraser(source1, source2) {
            return function (t) { return t === source1 || t === source2 ? anyType : t; };
        }
        function createTypeEraser(sources) {
            switch (sources.length) {
                case 1: return createUnaryTypeEraser(sources[0]);
                case 2: return createBinaryTypeEraser(sources[0], sources[1]);
            }
            return function (t) {
                for (var i = 0; i < sources.length; i++) {
                    if (t === sources[i])
                        return anyType;
                }
                return t;
            };
        }
        function createInferenceMapper(context) {
            return function (t) {
                for (var i = 0; i < context.typeParameters.length; i++) {
                    if (t === context.typeParameters[i]) {
                        return getInferredType(context, i);
                    }
                }
                return t;
            };
        }
        function identityMapper(type) {
            return type;
        }
        function combineTypeMappers(mapper1, mapper2) {
            return function (t) { return mapper2(mapper1(t)); };
        }
        function instantiateTypeParameter(typeParameter, mapper) {
            var result = createType(512 /* TypeParameter */);
            result.symbol = typeParameter.symbol;
            if (typeParameter.constraint) {
                result.constraint = instantiateType(typeParameter.constraint, mapper);
            }
            else {
                result.target = typeParameter;
                result.mapper = mapper;
            }
            return result;
        }
        function instantiateSignature(signature, mapper, eraseTypeParameters) {
            if (signature.typeParameters && !eraseTypeParameters) {
                var freshTypeParameters = instantiateList(signature.typeParameters, mapper, instantiateTypeParameter);
                mapper = combineTypeMappers(createTypeMapper(signature.typeParameters, freshTypeParameters), mapper);
            }
            var result = createSignature(signature.declaration, freshTypeParameters, instantiateList(signature.parameters, mapper, instantiateSymbol), signature.resolvedReturnType ? instantiateType(signature.resolvedReturnType, mapper) : undefined, signature.minArgumentCount, signature.hasRestParameter, signature.hasStringLiterals);
            result.target = signature;
            result.mapper = mapper;
            return result;
        }
        function instantiateSymbol(symbol, mapper) {
            if (symbol.flags & 67108864 /* Instantiated */) {
                var links = getSymbolLinks(symbol);
                symbol = links.target;
                mapper = combineTypeMappers(links.mapper, mapper);
            }
            var result = createSymbol(67108864 /* Instantiated */ | 268435456 /* Transient */ | symbol.flags, symbol.name);
            result.declarations = symbol.declarations;
            result.parent = symbol.parent;
            result.target = symbol;
            result.mapper = mapper;
            if (symbol.valueDeclaration) {
                result.valueDeclaration = symbol.valueDeclaration;
            }
            return result;
        }
        function instantiateAnonymousType(type, mapper) {
            var result = createObjectType(32768 /* Anonymous */, type.symbol);
            result.properties = instantiateList(getPropertiesOfObjectType(type), mapper, instantiateSymbol);
            result.members = createSymbolTable(result.properties);
            result.callSignatures = instantiateList(getSignaturesOfType(type, 0 /* Call */), mapper, instantiateSignature);
            result.constructSignatures = instantiateList(getSignaturesOfType(type, 1 /* Construct */), mapper, instantiateSignature);
            var stringIndexType = getIndexTypeOfType(type, 0 /* String */);
            var numberIndexType = getIndexTypeOfType(type, 1 /* Number */);
            if (stringIndexType)
                result.stringIndexType = instantiateType(stringIndexType, mapper);
            if (numberIndexType)
                result.numberIndexType = instantiateType(numberIndexType, mapper);
            return result;
        }
        function instantiateType(type, mapper) {
            if (mapper !== identityMapper) {
                if (type.flags & 512 /* TypeParameter */) {
                    return mapper(type);
                }
                if (type.flags & 32768 /* Anonymous */) {
                    return type.symbol && type.symbol.flags & (16 /* Function */ | 8192 /* Method */ | 2048 /* TypeLiteral */ | 4096 /* ObjectLiteral */) ? instantiateAnonymousType(type, mapper) : type;
                }
                if (type.flags & 4096 /* Reference */) {
                    return createTypeReference(type.target, instantiateList(type.typeArguments, mapper, instantiateType));
                }
                if (type.flags & 8192 /* Tuple */) {
                    return createTupleType(instantiateList(type.elementTypes, mapper, instantiateType));
                }
                if (type.flags & 16384 /* Union */) {
                    return getUnionType(instantiateList(type.types, mapper, instantiateType), true);
                }
            }
            return type;
        }
        function isContextSensitiveExpression(node) {
            switch (node.kind) {
                case 149 /* FunctionExpression */:
                case 150 /* ArrowFunction */:
                    return !node.typeParameters && !ts.forEach(node.parameters, function (p) { return p.type; });
                case 140 /* ObjectLiteral */:
                    return ts.forEach(node.properties, function (p) { return p.kind === 141 /* PropertyAssignment */ && isContextSensitiveExpression(p.initializer); });
                case 139 /* ArrayLiteral */:
                    return ts.forEach(node.elements, function (e) { return isContextSensitiveExpression(e); });
                case 154 /* ConditionalExpression */:
                    return isContextSensitiveExpression(node.whenTrue) || isContextSensitiveExpression(node.whenFalse);
                case 153 /* BinaryExpression */:
                    return node.operator === 48 /* BarBarToken */ && (isContextSensitiveExpression(node.left) || isContextSensitiveExpression(node.right));
            }
            return false;
        }
        function getTypeWithoutConstructors(type) {
            if (type.flags & 48128 /* ObjectType */) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                if (resolved.constructSignatures.length) {
                    var result = createObjectType(32768 /* Anonymous */, type.symbol);
                    result.members = resolved.members;
                    result.properties = resolved.properties;
                    result.callSignatures = resolved.callSignatures;
                    result.constructSignatures = emptyArray;
                    type = result;
                }
            }
            return type;
        }
        var subtypeRelation = {};
        var assignableRelation = {};
        var identityRelation = {};
        function isTypeIdenticalTo(source, target) {
            return checkTypeRelatedTo(source, target, identityRelation, undefined);
        }
        function compareTypes(source, target) {
            return checkTypeRelatedTo(source, target, identityRelation, undefined) ? -1 /* True */ : 0 /* False */;
        }
        function isTypeSubtypeOf(source, target) {
            return checkTypeSubtypeOf(source, target, undefined);
        }
        function isTypeAssignableTo(source, target) {
            return checkTypeAssignableTo(source, target, undefined);
        }
        function checkTypeSubtypeOf(source, target, errorNode, headMessage, containingMessageChain) {
            return checkTypeRelatedTo(source, target, subtypeRelation, errorNode, headMessage, containingMessageChain);
        }
        function checkTypeAssignableTo(source, target, errorNode, headMessage) {
            return checkTypeRelatedTo(source, target, assignableRelation, errorNode, headMessage);
        }
        function isSignatureAssignableTo(source, target) {
            var sourceType = getOrCreateTypeFromSignature(source);
            var targetType = getOrCreateTypeFromSignature(target);
            return checkTypeRelatedTo(sourceType, targetType, assignableRelation, undefined);
        }
        function checkTypeRelatedTo(source, target, relation, errorNode, headMessage, containingMessageChain) {
            var errorInfo;
            var sourceStack;
            var targetStack;
            var expandingFlags;
            var depth = 0;
            var overflow = false;
            ts.Debug.assert(relation !== identityRelation || !errorNode, "no error reporting in identity checking");
            var result = isRelatedTo(source, target, errorNode !== undefined, headMessage);
            if (overflow) {
                error(errorNode, ts.Diagnostics.Excessive_stack_depth_comparing_types_0_and_1, typeToString(source), typeToString(target));
            }
            else if (errorInfo) {
                if (containingMessageChain) {
                    errorInfo = ts.concatenateDiagnosticMessageChains(containingMessageChain, errorInfo);
                }
                addDiagnostic(ts.createDiagnosticForNodeFromMessageChain(errorNode, errorInfo, program.getCompilerHost().getNewLine()));
            }
            return result !== 0 /* False */;
            function reportError(message, arg0, arg1, arg2) {
                errorInfo = ts.chainDiagnosticMessages(errorInfo, message, arg0, arg1, arg2);
            }
            function isRelatedTo(source, target, reportErrors, headMessage) {
                var result;
                if (relation === identityRelation) {
                    if (source === target)
                        return -1 /* True */;
                }
                else {
                    if (source === target)
                        return -1 /* True */;
                    if (target.flags & 1 /* Any */)
                        return -1 /* True */;
                    if (source === undefinedType)
                        return -1 /* True */;
                    if (source === nullType && target !== undefinedType)
                        return -1 /* True */;
                    if (source.flags & 128 /* Enum */ && target === numberType)
                        return -1 /* True */;
                    if (source.flags & 256 /* StringLiteral */ && target === stringType)
                        return -1 /* True */;
                    if (relation === assignableRelation) {
                        if (source.flags & 1 /* Any */)
                            return -1 /* True */;
                        if (source === numberType && target.flags & 128 /* Enum */)
                            return -1 /* True */;
                    }
                }
                if (source.flags & 16384 /* Union */) {
                    if (result = unionTypeRelatedToType(source, target, reportErrors)) {
                        return result;
                    }
                }
                else if (target.flags & 16384 /* Union */) {
                    if (result = typeRelatedToUnionType(source, target, reportErrors)) {
                        return result;
                    }
                }
                else if (source.flags & 512 /* TypeParameter */ && target.flags & 512 /* TypeParameter */) {
                    if (result = typeParameterRelatedTo(source, target, reportErrors)) {
                        return result;
                    }
                }
                else {
                    var saveErrorInfo = errorInfo;
                    if (source.flags & 4096 /* Reference */ && target.flags & 4096 /* Reference */ && source.target === target.target) {
                        if (result = typesRelatedTo(source.typeArguments, target.typeArguments, reportErrors)) {
                            return result;
                        }
                    }
                    var reportStructuralErrors = reportErrors && errorInfo === saveErrorInfo;
                    var sourceOrApparentType = relation === identityRelation ? source : getApparentType(source);
                    if (sourceOrApparentType.flags & 48128 /* ObjectType */ && target.flags & 48128 /* ObjectType */ && (result = objectTypeRelatedTo(sourceOrApparentType, target, reportStructuralErrors))) {
                        errorInfo = saveErrorInfo;
                        return result;
                    }
                }
                if (reportErrors) {
                    headMessage = headMessage || ts.Diagnostics.Type_0_is_not_assignable_to_type_1;
                    reportError(headMessage, typeToString(source), typeToString(target));
                }
                return 0 /* False */;
            }
            function typeRelatedToUnionType(source, target, reportErrors) {
                var targetTypes = target.types;
                for (var i = 0, len = targetTypes.length; i < len; i++) {
                    var related = isRelatedTo(source, targetTypes[i], reportErrors && i === len - 1);
                    if (related) {
                        return related;
                    }
                }
                return 0 /* False */;
            }
            function unionTypeRelatedToType(source, target, reportErrors) {
                var result = -1 /* True */;
                var sourceTypes = source.types;
                for (var i = 0, len = sourceTypes.length; i < len; i++) {
                    var related = isRelatedTo(sourceTypes[i], target, reportErrors);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                return result;
            }
            function typesRelatedTo(sources, targets, reportErrors) {
                var result = -1 /* True */;
                for (var i = 0, len = sources.length; i < len; i++) {
                    var related = isRelatedTo(sources[i], targets[i], reportErrors);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                return result;
            }
            function typeParameterRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    if (source.symbol.name !== target.symbol.name) {
                        return 0 /* False */;
                    }
                    if (source.constraint === target.constraint) {
                        return -1 /* True */;
                    }
                    if (source.constraint === noConstraintType || target.constraint === noConstraintType) {
                        return 0 /* False */;
                    }
                    return isRelatedTo(source.constraint, target.constraint, reportErrors);
                }
                else {
                    while (true) {
                        var constraint = getConstraintOfTypeParameter(source);
                        if (constraint === target)
                            return -1 /* True */;
                        if (!(constraint && constraint.flags & 512 /* TypeParameter */))
                            break;
                        source = constraint;
                    }
                    return 0 /* False */;
                }
            }
            function objectTypeRelatedTo(source, target, reportErrors) {
                if (overflow) {
                    return 0 /* False */;
                }
                var id = source.id + "," + target.id;
                var related = relation[id];
                if (related !== undefined) {
                    return related;
                }
                if (depth > 0) {
                    for (var i = 0; i < depth; i++) {
                        if (source === sourceStack[i] && target === targetStack[i]) {
                            return 1 /* Maybe */;
                        }
                    }
                    if (depth === 100) {
                        overflow = true;
                        return 0 /* False */;
                    }
                }
                else {
                    sourceStack = [];
                    targetStack = [];
                    expandingFlags = 0;
                }
                sourceStack[depth] = source;
                targetStack[depth] = target;
                depth++;
                var saveExpandingFlags = expandingFlags;
                if (!(expandingFlags & 1) && isDeeplyNestedGeneric(source, sourceStack))
                    expandingFlags |= 1;
                if (!(expandingFlags & 2) && isDeeplyNestedGeneric(target, targetStack))
                    expandingFlags |= 2;
                if (expandingFlags === 3) {
                    var result = -1 /* True */;
                }
                else {
                    var result = propertiesRelatedTo(source, target, reportErrors);
                    if (result) {
                        result &= signaturesRelatedTo(source, target, 0 /* Call */, reportErrors);
                        if (result) {
                            result &= signaturesRelatedTo(source, target, 1 /* Construct */, reportErrors);
                            if (result) {
                                result &= stringIndexTypesRelatedTo(source, target, reportErrors);
                                if (result) {
                                    result &= numberIndexTypesRelatedTo(source, target, reportErrors);
                                }
                            }
                        }
                    }
                }
                expandingFlags = saveExpandingFlags;
                depth--;
                if (result !== 1 /* Maybe */) {
                    relation[id] = result;
                }
                return result;
            }
            function isDeeplyNestedGeneric(type, stack) {
                if (type.flags & 4096 /* Reference */ && depth >= 10) {
                    var target = type.target;
                    var count = 0;
                    for (var i = 0; i < depth; i++) {
                        var t = stack[i];
                        if (t.flags & 4096 /* Reference */ && t.target === target) {
                            count++;
                            if (count >= 10)
                                return true;
                        }
                    }
                }
                return false;
            }
            function propertiesRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    return propertiesIdenticalTo(source, target);
                }
                var result = -1 /* True */;
                var properties = getPropertiesOfObjectType(target);
                for (var i = 0; i < properties.length; i++) {
                    var targetProp = properties[i];
                    var sourceProp = getPropertyOfType(source, targetProp.name);
                    if (sourceProp !== targetProp) {
                        if (!sourceProp) {
                            if (relation === subtypeRelation || !isOptionalProperty(targetProp)) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Property_0_is_missing_in_type_1, symbolToString(targetProp), typeToString(source));
                                }
                                return 0 /* False */;
                            }
                        }
                        else if (!(targetProp.flags & 536870912 /* Prototype */)) {
                            var sourceFlags = getDeclarationFlagsFromSymbol(sourceProp);
                            var targetFlags = getDeclarationFlagsFromSymbol(targetProp);
                            if (sourceFlags & 32 /* Private */ || targetFlags & 32 /* Private */) {
                                if (sourceProp.valueDeclaration !== targetProp.valueDeclaration) {
                                    if (reportErrors) {
                                        if (sourceFlags & 32 /* Private */ && targetFlags & 32 /* Private */) {
                                            reportError(ts.Diagnostics.Types_have_separate_declarations_of_a_private_property_0, symbolToString(targetProp));
                                        }
                                        else {
                                            reportError(ts.Diagnostics.Property_0_is_private_in_type_1_but_not_in_type_2, symbolToString(targetProp), typeToString(sourceFlags & 32 /* Private */ ? source : target), typeToString(sourceFlags & 32 /* Private */ ? target : source));
                                        }
                                    }
                                    return 0 /* False */;
                                }
                            }
                            else if (targetFlags & 64 /* Protected */) {
                                var sourceDeclaredInClass = sourceProp.parent && sourceProp.parent.flags & 32 /* Class */;
                                var sourceClass = sourceDeclaredInClass ? getDeclaredTypeOfSymbol(sourceProp.parent) : undefined;
                                var targetClass = getDeclaredTypeOfSymbol(targetProp.parent);
                                if (!sourceClass || !hasBaseType(sourceClass, targetClass)) {
                                    if (reportErrors) {
                                        reportError(ts.Diagnostics.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2, symbolToString(targetProp), typeToString(sourceClass || source), typeToString(targetClass));
                                    }
                                    return 0 /* False */;
                                }
                            }
                            else if (sourceFlags & 64 /* Protected */) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Property_0_is_protected_in_type_1_but_public_in_type_2, symbolToString(targetProp), typeToString(source), typeToString(target));
                                }
                                return 0 /* False */;
                            }
                            var related = isRelatedTo(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp), reportErrors);
                            if (!related) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Types_of_property_0_are_incompatible, symbolToString(targetProp));
                                }
                                return 0 /* False */;
                            }
                            result &= related;
                            if (isOptionalProperty(sourceProp) && !isOptionalProperty(targetProp)) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Property_0_is_optional_in_type_1_but_required_in_type_2, symbolToString(targetProp), typeToString(source), typeToString(target));
                                }
                                return 0 /* False */;
                            }
                        }
                    }
                }
                return result;
            }
            function propertiesIdenticalTo(source, target) {
                var sourceProperties = getPropertiesOfObjectType(source);
                var targetProperties = getPropertiesOfObjectType(target);
                if (sourceProperties.length !== targetProperties.length) {
                    return 0 /* False */;
                }
                var result = -1 /* True */;
                for (var i = 0, len = sourceProperties.length; i < len; ++i) {
                    var sourceProp = sourceProperties[i];
                    var targetProp = getPropertyOfObjectType(target, sourceProp.name);
                    if (!targetProp) {
                        return 0 /* False */;
                    }
                    var related = compareProperties(sourceProp, targetProp, isRelatedTo);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                return result;
            }
            function signaturesRelatedTo(source, target, kind, reportErrors) {
                if (relation === identityRelation) {
                    return signaturesIdenticalTo(source, target, kind);
                }
                if (target === anyFunctionType || source === anyFunctionType) {
                    return -1 /* True */;
                }
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                var result = -1 /* True */;
                var saveErrorInfo = errorInfo;
                outer: for (var i = 0; i < targetSignatures.length; i++) {
                    var t = targetSignatures[i];
                    if (!t.hasStringLiterals || target.flags & 65536 /* FromSignature */) {
                        var localErrors = reportErrors;
                        for (var j = 0; j < sourceSignatures.length; j++) {
                            var s = sourceSignatures[j];
                            if (!s.hasStringLiterals || source.flags & 65536 /* FromSignature */) {
                                var related = signatureRelatedTo(s, t, localErrors);
                                if (related) {
                                    result &= related;
                                    errorInfo = saveErrorInfo;
                                    continue outer;
                                }
                                localErrors = false;
                            }
                        }
                        return 0 /* False */;
                    }
                }
                return result;
            }
            function signatureRelatedTo(source, target, reportErrors) {
                if (source === target) {
                    return -1 /* True */;
                }
                if (!target.hasRestParameter && source.minArgumentCount > target.parameters.length) {
                    return 0 /* False */;
                }
                var sourceMax = source.parameters.length;
                var targetMax = target.parameters.length;
                var checkCount;
                if (source.hasRestParameter && target.hasRestParameter) {
                    checkCount = sourceMax > targetMax ? sourceMax : targetMax;
                    sourceMax--;
                    targetMax--;
                }
                else if (source.hasRestParameter) {
                    sourceMax--;
                    checkCount = targetMax;
                }
                else if (target.hasRestParameter) {
                    targetMax--;
                    checkCount = sourceMax;
                }
                else {
                    checkCount = sourceMax < targetMax ? sourceMax : targetMax;
                }
                source = getErasedSignature(source);
                target = getErasedSignature(target);
                var result = -1 /* True */;
                for (var i = 0; i < checkCount; i++) {
                    var s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                    var t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                    var saveErrorInfo = errorInfo;
                    var related = isRelatedTo(s, t, reportErrors);
                    if (!related) {
                        related = isRelatedTo(t, s, false);
                        if (!related) {
                            if (reportErrors) {
                                reportError(ts.Diagnostics.Types_of_parameters_0_and_1_are_incompatible, source.parameters[i < sourceMax ? i : sourceMax].name, target.parameters[i < targetMax ? i : targetMax].name);
                            }
                            return 0 /* False */;
                        }
                        errorInfo = saveErrorInfo;
                    }
                    result &= related;
                }
                var t = getReturnTypeOfSignature(target);
                if (t === voidType)
                    return result;
                var s = getReturnTypeOfSignature(source);
                return result & isRelatedTo(s, t, reportErrors);
            }
            function signaturesIdenticalTo(source, target, kind) {
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                if (sourceSignatures.length !== targetSignatures.length) {
                    return 0 /* False */;
                }
                var result = -1 /* True */;
                for (var i = 0, len = sourceSignatures.length; i < len; ++i) {
                    var related = compareSignatures(sourceSignatures[i], targetSignatures[i], true, isRelatedTo);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                return result;
            }
            function stringIndexTypesRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(0 /* String */, source, target);
                }
                var targetType = getIndexTypeOfType(target, 0 /* String */);
                if (targetType) {
                    var sourceType = getIndexTypeOfType(source, 0 /* String */);
                    if (!sourceType) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return 0 /* False */;
                    }
                    var related = isRelatedTo(sourceType, targetType, reportErrors);
                    if (!related) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signatures_are_incompatible);
                        }
                        return 0 /* False */;
                    }
                    return related;
                }
                return -1 /* True */;
            }
            function numberIndexTypesRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(1 /* Number */, source, target);
                }
                var targetType = getIndexTypeOfType(target, 1 /* Number */);
                if (targetType) {
                    var sourceStringType = getIndexTypeOfType(source, 0 /* String */);
                    var sourceNumberType = getIndexTypeOfType(source, 1 /* Number */);
                    if (!(sourceStringType || sourceNumberType)) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return 0 /* False */;
                    }
                    if (sourceStringType && sourceNumberType) {
                        var related = isRelatedTo(sourceStringType, targetType, false) || isRelatedTo(sourceNumberType, targetType, reportErrors);
                    }
                    else {
                        var related = isRelatedTo(sourceStringType || sourceNumberType, targetType, reportErrors);
                    }
                    if (!related) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signatures_are_incompatible);
                        }
                        return 0 /* False */;
                    }
                    return related;
                }
                return -1 /* True */;
            }
            function indexTypesIdenticalTo(indexKind, source, target) {
                var targetType = getIndexTypeOfType(target, indexKind);
                var sourceType = getIndexTypeOfType(source, indexKind);
                if (!sourceType && !targetType) {
                    return -1 /* True */;
                }
                if (sourceType && targetType) {
                    return isRelatedTo(sourceType, targetType);
                }
                return 0 /* False */;
            }
        }
        function isPropertyIdenticalTo(sourceProp, targetProp) {
            return compareProperties(sourceProp, targetProp, compareTypes) !== 0 /* False */;
        }
        function compareProperties(sourceProp, targetProp, compareTypes) {
            if (sourceProp === targetProp) {
                return -1 /* True */;
            }
            var sourcePropAccessibility = getDeclarationFlagsFromSymbol(sourceProp) & (32 /* Private */ | 64 /* Protected */);
            var targetPropAccessibility = getDeclarationFlagsFromSymbol(targetProp) & (32 /* Private */ | 64 /* Protected */);
            if (sourcePropAccessibility !== targetPropAccessibility) {
                return 0 /* False */;
            }
            if (sourcePropAccessibility) {
                if (getTargetSymbol(sourceProp) !== getTargetSymbol(targetProp)) {
                    return 0 /* False */;
                }
            }
            else {
                if (isOptionalProperty(sourceProp) !== isOptionalProperty(targetProp)) {
                    return 0 /* False */;
                }
            }
            return compareTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
        }
        function compareSignatures(source, target, compareReturnTypes, compareTypes) {
            if (source === target) {
                return -1 /* True */;
            }
            if (source.parameters.length !== target.parameters.length || source.minArgumentCount !== target.minArgumentCount || source.hasRestParameter !== target.hasRestParameter) {
                return 0 /* False */;
            }
            var result = -1 /* True */;
            if (source.typeParameters && target.typeParameters) {
                if (source.typeParameters.length !== target.typeParameters.length) {
                    return 0 /* False */;
                }
                for (var i = 0, len = source.typeParameters.length; i < len; ++i) {
                    var related = compareTypes(source.typeParameters[i], target.typeParameters[i]);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
            }
            else if (source.typeParameters || source.typeParameters) {
                return 0 /* False */;
            }
            source = getErasedSignature(source);
            target = getErasedSignature(target);
            for (var i = 0, len = source.parameters.length; i < len; i++) {
                var s = source.hasRestParameter && i === len - 1 ? getRestTypeOfSignature(source) : getTypeOfSymbol(source.parameters[i]);
                var t = target.hasRestParameter && i === len - 1 ? getRestTypeOfSignature(target) : getTypeOfSymbol(target.parameters[i]);
                var related = compareTypes(s, t);
                if (!related) {
                    return 0 /* False */;
                }
                result &= related;
            }
            if (compareReturnTypes) {
                result &= compareTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
            }
            return result;
        }
        function isSupertypeOfEach(candidate, types) {
            for (var i = 0, len = types.length; i < len; i++) {
                if (candidate !== types[i] && !isTypeSubtypeOf(types[i], candidate))
                    return false;
            }
            return true;
        }
        function getCommonSupertype(types) {
            return ts.forEach(types, function (t) { return isSupertypeOfEach(t, types) ? t : undefined; });
        }
        function reportNoCommonSupertypeError(types, errorLocation, errorMessageChainHead) {
            var bestSupertype;
            var bestSupertypeDownfallType;
            var bestSupertypeScore = 0;
            for (var i = 0; i < types.length; i++) {
                var score = 0;
                var downfallType = undefined;
                for (var j = 0; j < types.length; j++) {
                    if (isTypeSubtypeOf(types[j], types[i])) {
                        score++;
                    }
                    else if (!downfallType) {
                        downfallType = types[j];
                    }
                }
                if (score > bestSupertypeScore) {
                    bestSupertype = types[i];
                    bestSupertypeDownfallType = downfallType;
                    bestSupertypeScore = score;
                }
                if (bestSupertypeScore === types.length - 1) {
                    break;
                }
            }
            checkTypeSubtypeOf(bestSupertypeDownfallType, bestSupertype, errorLocation, ts.Diagnostics.Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0, errorMessageChainHead);
        }
        function isTypeOfObjectLiteral(type) {
            return (type.flags & 32768 /* Anonymous */) && type.symbol && (type.symbol.flags & 4096 /* ObjectLiteral */) ? true : false;
        }
        function isArrayType(type) {
            return type.flags & 4096 /* Reference */ && type.target === globalArrayType;
        }
        function getInnermostTypeOfNestedArrayTypes(type) {
            while (isArrayType(type)) {
                type = type.typeArguments[0];
            }
            return type;
        }
        function getWidenedType(type, suppressNoImplicitAnyErrors) {
            if (type.flags & (32 /* Undefined */ | 64 /* Null */)) {
                return anyType;
            }
            if (type.flags & 16384 /* Union */) {
                return getWidenedTypeOfUnion(type);
            }
            if (isTypeOfObjectLiteral(type)) {
                return getWidenedTypeOfObjectLiteral(type);
            }
            if (isArrayType(type)) {
                return getWidenedTypeOfArrayLiteral(type);
            }
            return type;
            function getWidenedTypeOfUnion(type) {
                return getUnionType(ts.map(type.types, function (t) { return getWidenedType(t, suppressNoImplicitAnyErrors); }));
            }
            function getWidenedTypeOfObjectLiteral(type) {
                var properties = getPropertiesOfObjectType(type);
                if (properties.length) {
                    var widenedTypes = [];
                    var propTypeWasWidened = false;
                    ts.forEach(properties, function (p) {
                        var propType = getTypeOfSymbol(p);
                        var widenedType = getWidenedType(propType);
                        if (propType !== widenedType) {
                            propTypeWasWidened = true;
                            if (!suppressNoImplicitAnyErrors && compilerOptions.noImplicitAny && getInnermostTypeOfNestedArrayTypes(widenedType) === anyType) {
                                error(p.valueDeclaration, ts.Diagnostics.Object_literal_s_property_0_implicitly_has_an_1_type, p.name, typeToString(widenedType));
                            }
                        }
                        widenedTypes.push(widenedType);
                    });
                    if (propTypeWasWidened) {
                        var members = {};
                        var index = 0;
                        ts.forEach(properties, function (p) {
                            var symbol = createSymbol(4 /* Property */ | 268435456 /* Transient */ | p.flags, p.name);
                            symbol.declarations = p.declarations;
                            symbol.parent = p.parent;
                            symbol.type = widenedTypes[index++];
                            symbol.target = p;
                            if (p.valueDeclaration)
                                symbol.valueDeclaration = p.valueDeclaration;
                            members[symbol.name] = symbol;
                        });
                        var stringIndexType = getIndexTypeOfType(type, 0 /* String */);
                        var numberIndexType = getIndexTypeOfType(type, 1 /* Number */);
                        if (stringIndexType)
                            stringIndexType = getWidenedType(stringIndexType);
                        if (numberIndexType)
                            numberIndexType = getWidenedType(numberIndexType);
                        type = createAnonymousType(type.symbol, members, emptyArray, emptyArray, stringIndexType, numberIndexType);
                    }
                }
                return type;
            }
            function getWidenedTypeOfArrayLiteral(type) {
                var elementType = type.typeArguments[0];
                var widenedType = getWidenedType(elementType, suppressNoImplicitAnyErrors);
                type = elementType !== widenedType ? createArrayType(widenedType) : type;
                return type;
            }
        }
        function forEachMatchingParameterType(source, target, callback) {
            var sourceMax = source.parameters.length;
            var targetMax = target.parameters.length;
            var count;
            if (source.hasRestParameter && target.hasRestParameter) {
                count = sourceMax > targetMax ? sourceMax : targetMax;
                sourceMax--;
                targetMax--;
            }
            else if (source.hasRestParameter) {
                sourceMax--;
                count = targetMax;
            }
            else if (target.hasRestParameter) {
                targetMax--;
                count = sourceMax;
            }
            else {
                count = sourceMax < targetMax ? sourceMax : targetMax;
            }
            for (var i = 0; i < count; i++) {
                var s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                var t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                callback(s, t);
            }
        }
        function createInferenceContext(typeParameters, inferUnionTypes) {
            var inferences = [];
            for (var i = 0; i < typeParameters.length; i++)
                inferences.push([]);
            return {
                typeParameters: typeParameters,
                inferUnionTypes: inferUnionTypes,
                inferenceCount: 0,
                inferences: inferences,
                inferredTypes: new Array(typeParameters.length)
            };
        }
        function inferTypes(context, source, target) {
            var sourceStack;
            var targetStack;
            var depth = 0;
            inferFromTypes(source, target);
            function isInProcess(source, target) {
                for (var i = 0; i < depth; i++) {
                    if (source === sourceStack[i] && target === targetStack[i])
                        return true;
                }
                return false;
            }
            function isWithinDepthLimit(type, stack) {
                if (depth >= 5) {
                    var target = type.target;
                    var count = 0;
                    for (var i = 0; i < depth; i++) {
                        var t = stack[i];
                        if (t.flags & 4096 /* Reference */ && t.target === target)
                            count++;
                    }
                    return count < 5;
                }
                return true;
            }
            function inferFromTypes(source, target) {
                if (target.flags & 512 /* TypeParameter */) {
                    var typeParameters = context.typeParameters;
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (target === typeParameters[i]) {
                            context.inferenceCount++;
                            var inferences = context.inferences[i];
                            if (!ts.contains(inferences, source))
                                inferences.push(source);
                            break;
                        }
                    }
                }
                else if (source.flags & 4096 /* Reference */ && target.flags & 4096 /* Reference */ && source.target === target.target) {
                    var sourceTypes = source.typeArguments;
                    var targetTypes = target.typeArguments;
                    for (var i = 0; i < sourceTypes.length; i++) {
                        inferFromTypes(sourceTypes[i], targetTypes[i]);
                    }
                }
                else if (target.flags & 16384 /* Union */) {
                    var targetTypes = target.types;
                    var startCount = context.inferenceCount;
                    var typeParameterCount = 0;
                    var typeParameter;
                    for (var i = 0; i < targetTypes.length; i++) {
                        var t = targetTypes[i];
                        if (t.flags & 512 /* TypeParameter */ && ts.contains(context.typeParameters, t)) {
                            typeParameter = t;
                            typeParameterCount++;
                        }
                        else {
                            inferFromTypes(source, t);
                        }
                    }
                    if (context.inferenceCount === startCount && typeParameterCount === 1) {
                        inferFromTypes(source, typeParameter);
                    }
                }
                else if (source.flags & 16384 /* Union */) {
                    var sourceTypes = source.types;
                    for (var i = 0; i < sourceTypes.length; i++) {
                        inferFromTypes(sourceTypes[i], target);
                    }
                }
                else if (source.flags & 48128 /* ObjectType */ && (target.flags & (4096 /* Reference */ | 8192 /* Tuple */) || (target.flags & 32768 /* Anonymous */) && target.symbol && target.symbol.flags & (8192 /* Method */ | 2048 /* TypeLiteral */))) {
                    if (!isInProcess(source, target) && isWithinDepthLimit(source, sourceStack) && isWithinDepthLimit(target, targetStack)) {
                        if (depth === 0) {
                            sourceStack = [];
                            targetStack = [];
                        }
                        sourceStack[depth] = source;
                        targetStack[depth] = target;
                        depth++;
                        inferFromProperties(source, target);
                        inferFromSignatures(source, target, 0 /* Call */);
                        inferFromSignatures(source, target, 1 /* Construct */);
                        inferFromIndexTypes(source, target, 0 /* String */, 0 /* String */);
                        inferFromIndexTypes(source, target, 1 /* Number */, 1 /* Number */);
                        inferFromIndexTypes(source, target, 0 /* String */, 1 /* Number */);
                        depth--;
                    }
                }
            }
            function inferFromProperties(source, target) {
                var properties = getPropertiesOfObjectType(target);
                for (var i = 0; i < properties.length; i++) {
                    var targetProp = properties[i];
                    var sourceProp = getPropertyOfObjectType(source, targetProp.name);
                    if (sourceProp) {
                        inferFromTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
                    }
                }
            }
            function inferFromSignatures(source, target, kind) {
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                var sourceLen = sourceSignatures.length;
                var targetLen = targetSignatures.length;
                var len = sourceLen < targetLen ? sourceLen : targetLen;
                for (var i = 0; i < len; i++) {
                    inferFromSignature(getErasedSignature(sourceSignatures[sourceLen - len + i]), getErasedSignature(targetSignatures[targetLen - len + i]));
                }
            }
            function inferFromSignature(source, target) {
                forEachMatchingParameterType(source, target, inferFromTypes);
                inferFromTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
            }
            function inferFromIndexTypes(source, target, sourceKind, targetKind) {
                var targetIndexType = getIndexTypeOfType(target, targetKind);
                if (targetIndexType) {
                    var sourceIndexType = getIndexTypeOfType(source, sourceKind);
                    if (sourceIndexType) {
                        inferFromTypes(sourceIndexType, targetIndexType);
                    }
                }
            }
        }
        function getInferredType(context, index) {
            var inferredType = context.inferredTypes[index];
            if (!inferredType) {
                var inferences = context.inferences[index];
                if (inferences.length) {
                    var unionOrSuperType = context.inferUnionTypes ? getUnionType(inferences) : getCommonSupertype(inferences);
                    inferredType = unionOrSuperType ? getWidenedType(unionOrSuperType) : inferenceFailureType;
                }
                else {
                    inferredType = emptyObjectType;
                }
                if (inferredType !== inferenceFailureType) {
                    var constraint = getConstraintOfTypeParameter(context.typeParameters[index]);
                    inferredType = constraint && !isTypeAssignableTo(inferredType, constraint) ? constraint : inferredType;
                }
                context.inferredTypes[index] = inferredType;
            }
            return inferredType;
        }
        function getInferredTypes(context) {
            for (var i = 0; i < context.inferredTypes.length; i++) {
                getInferredType(context, i);
            }
            return context.inferredTypes;
        }
        function hasAncestor(node, kind) {
            return ts.getAncestor(node, kind) !== undefined;
        }
        function getResolvedSymbol(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedSymbol) {
                links.resolvedSymbol = resolveName(node, node.text, 107455 /* Value */ | 4194304 /* ExportValue */, ts.Diagnostics.Cannot_find_name_0, node) || unknownSymbol;
            }
            return links.resolvedSymbol;
        }
        function isInTypeQuery(node) {
            while (node) {
                switch (node.kind) {
                    case 133 /* TypeQuery */:
                        return true;
                    case 63 /* Identifier */:
                    case 121 /* QualifiedName */:
                        node = node.parent;
                        continue;
                    default:
                        return false;
                }
            }
            ts.Debug.fail("should not get here");
        }
        function subtractPrimitiveTypes(type, subtractMask) {
            if (type.flags & 16384 /* Union */) {
                var types = type.types;
                if (ts.forEach(types, function (t) { return t.flags & subtractMask; })) {
                    return getUnionType(ts.filter(types, function (t) { return !(t.flags & subtractMask); }));
                }
            }
            return type;
        }
        function isVariableAssignedWithin(symbol, node) {
            var links = getNodeLinks(node);
            if (links.assignmentChecks) {
                var cachedResult = links.assignmentChecks[symbol.id];
                if (cachedResult !== undefined) {
                    return cachedResult;
                }
            }
            else {
                links.assignmentChecks = {};
            }
            return links.assignmentChecks[symbol.id] = isAssignedIn(node);
            function isAssignedInBinaryExpression(node) {
                if (node.operator >= 51 /* FirstAssignment */ && node.operator <= 62 /* LastAssignment */) {
                    var n = node.left;
                    while (n.kind === 148 /* ParenExpression */) {
                        n = n.expression;
                    }
                    if (n.kind === 63 /* Identifier */ && getResolvedSymbol(n) === symbol) {
                        return true;
                    }
                }
                return ts.forEachChild(node, isAssignedIn);
            }
            function isAssignedInVariableDeclaration(node) {
                if (getSymbolOfNode(node) === symbol && node.initializer) {
                    return true;
                }
                return ts.forEachChild(node, isAssignedIn);
            }
            function isAssignedIn(node) {
                switch (node.kind) {
                    case 153 /* BinaryExpression */:
                        return isAssignedInBinaryExpression(node);
                    case 181 /* VariableDeclaration */:
                        return isAssignedInVariableDeclaration(node);
                    case 139 /* ArrayLiteral */:
                    case 140 /* ObjectLiteral */:
                    case 142 /* PropertyAccess */:
                    case 143 /* IndexedAccess */:
                    case 144 /* CallExpression */:
                    case 145 /* NewExpression */:
                    case 147 /* TypeAssertion */:
                    case 148 /* ParenExpression */:
                    case 151 /* PrefixOperator */:
                    case 152 /* PostfixOperator */:
                    case 154 /* ConditionalExpression */:
                    case 158 /* Block */:
                    case 159 /* VariableStatement */:
                    case 161 /* ExpressionStatement */:
                    case 162 /* IfStatement */:
                    case 163 /* DoStatement */:
                    case 164 /* WhileStatement */:
                    case 165 /* ForStatement */:
                    case 166 /* ForInStatement */:
                    case 169 /* ReturnStatement */:
                    case 170 /* WithStatement */:
                    case 171 /* SwitchStatement */:
                    case 172 /* CaseClause */:
                    case 173 /* DefaultClause */:
                    case 174 /* LabeledStatement */:
                    case 175 /* ThrowStatement */:
                    case 176 /* TryStatement */:
                    case 177 /* TryBlock */:
                    case 178 /* CatchBlock */:
                    case 179 /* FinallyBlock */:
                        return ts.forEachChild(node, isAssignedIn);
                }
                return false;
            }
        }
        function getNarrowedTypeOfSymbol(symbol, node) {
            var type = getTypeOfSymbol(symbol);
            if (symbol.flags & 3 /* Variable */ && type.flags & 65025 /* Structured */) {
                while (true) {
                    var child = node;
                    node = node.parent;
                    if (!node || node.kind === 183 /* FunctionBlock */ || node.kind === 189 /* ModuleBlock */) {
                        break;
                    }
                    var narrowedType = type;
                    switch (node.kind) {
                        case 162 /* IfStatement */:
                            if (child !== node.expression) {
                                narrowedType = narrowType(type, node.expression, child === node.thenStatement);
                            }
                            break;
                        case 154 /* ConditionalExpression */:
                            if (child !== node.condition) {
                                narrowedType = narrowType(type, node.condition, child === node.whenTrue);
                            }
                            break;
                        case 153 /* BinaryExpression */:
                            if (child === node.right) {
                                if (node.operator === 47 /* AmpersandAmpersandToken */) {
                                    narrowedType = narrowType(type, node.left, true);
                                }
                                else if (node.operator === 48 /* BarBarToken */) {
                                    narrowedType = narrowType(type, node.left, false);
                                }
                            }
                            break;
                    }
                    if (narrowedType !== type) {
                        if (isVariableAssignedWithin(symbol, node)) {
                            break;
                        }
                        type = narrowedType;
                    }
                }
            }
            return type;
            function narrowTypeByEquality(type, expr, assumeTrue) {
                var left = expr.left;
                var right = expr.right;
                if (left.kind !== 151 /* PrefixOperator */ || left.operator !== 95 /* TypeOfKeyword */ || left.operand.kind !== 63 /* Identifier */ || right.kind !== 7 /* StringLiteral */ || getResolvedSymbol(left.operand) !== symbol) {
                    return type;
                }
                var t = right.text;
                var checkType = t === "string" ? stringType : t === "number" ? numberType : t === "boolean" ? booleanType : emptyObjectType;
                if (expr.operator === 30 /* ExclamationEqualsEqualsToken */) {
                    assumeTrue = !assumeTrue;
                }
                if (assumeTrue) {
                    return checkType === emptyObjectType ? subtractPrimitiveTypes(type, 2 /* String */ | 4 /* Number */ | 8 /* Boolean */) : checkType;
                }
                else {
                    return checkType === emptyObjectType ? type : subtractPrimitiveTypes(type, checkType.flags);
                }
            }
            function narrowTypeByAnd(type, expr, assumeTrue) {
                if (assumeTrue) {
                    return narrowType(narrowType(type, expr.left, true), expr.right, true);
                }
                else {
                    return getUnionType([
                        narrowType(type, expr.left, false),
                        narrowType(narrowType(type, expr.left, true), expr.right, false)
                    ]);
                }
            }
            function narrowTypeByOr(type, expr, assumeTrue) {
                if (assumeTrue) {
                    return getUnionType([
                        narrowType(type, expr.left, true),
                        narrowType(narrowType(type, expr.left, false), expr.right, true)
                    ]);
                }
                else {
                    return narrowType(narrowType(type, expr.left, false), expr.right, false);
                }
            }
            function narrowTypeByInstanceof(type, expr, assumeTrue) {
                if (!assumeTrue || expr.left.kind !== 63 /* Identifier */ || getResolvedSymbol(expr.left) !== symbol) {
                    return type;
                }
                var rightType = checkExpression(expr.right);
                if (!isTypeSubtypeOf(rightType, globalFunctionType)) {
                    return type;
                }
                var prototypeProperty = getPropertyOfType(rightType, "prototype");
                if (!prototypeProperty) {
                    return type;
                }
                var prototypeType = getTypeOfSymbol(prototypeProperty);
                return isTypeSubtypeOf(prototypeType, type) ? prototypeType : type;
            }
            function narrowType(type, expr, assumeTrue) {
                switch (expr.kind) {
                    case 148 /* ParenExpression */:
                        return narrowType(type, expr.expression, assumeTrue);
                    case 153 /* BinaryExpression */:
                        var operator = expr.operator;
                        if (operator === 29 /* EqualsEqualsEqualsToken */ || operator === 30 /* ExclamationEqualsEqualsToken */) {
                            return narrowTypeByEquality(type, expr, assumeTrue);
                        }
                        else if (operator === 47 /* AmpersandAmpersandToken */) {
                            return narrowTypeByAnd(type, expr, assumeTrue);
                        }
                        else if (operator === 48 /* BarBarToken */) {
                            return narrowTypeByOr(type, expr, assumeTrue);
                        }
                        else if (operator === 85 /* InstanceOfKeyword */) {
                            return narrowTypeByInstanceof(type, expr, assumeTrue);
                        }
                        break;
                    case 151 /* PrefixOperator */:
                        if (expr.operator === 45 /* ExclamationToken */) {
                            return narrowType(type, expr.operand, !assumeTrue);
                        }
                        break;
                }
                return type;
            }
        }
        function checkIdentifier(node) {
            var symbol = getResolvedSymbol(node);
            if (symbol.flags & 33554432 /* Import */) {
                getSymbolLinks(symbol).referenced = !isInTypeQuery(node) && !isConstEnumOrConstEnumOnlyModule(resolveImport(symbol));
            }
            checkCollisionWithCapturedSuperVariable(node, node);
            checkCollisionWithCapturedThisVariable(node, node);
            checkCollisionWithIndexVariableInGeneratedCode(node, node);
            return getNarrowedTypeOfSymbol(getExportSymbolOfValueSymbolIfExported(symbol), node);
        }
        function captureLexicalThis(node, container) {
            var classNode = container.parent && container.parent.kind === 184 /* ClassDeclaration */ ? container.parent : undefined;
            getNodeLinks(node).flags |= 2 /* LexicalThis */;
            if (container.kind === 124 /* Property */ || container.kind === 126 /* Constructor */) {
                getNodeLinks(classNode).flags |= 4 /* CaptureThis */;
            }
            else {
                getNodeLinks(container).flags |= 4 /* CaptureThis */;
            }
        }
        function checkThisExpression(node) {
            var container = ts.getThisContainer(node, true);
            var needToCaptureLexicalThis = false;
            if (container.kind === 150 /* ArrowFunction */) {
                container = ts.getThisContainer(container, false);
                needToCaptureLexicalThis = true;
            }
            switch (container.kind) {
                case 188 /* ModuleDeclaration */:
                    error(node, ts.Diagnostics.this_cannot_be_referenced_in_a_module_body);
                    break;
                case 187 /* EnumDeclaration */:
                    error(node, ts.Diagnostics.this_cannot_be_referenced_in_current_location);
                    break;
                case 126 /* Constructor */:
                    if (isInConstructorArgumentInitializer(node, container)) {
                        error(node, ts.Diagnostics.this_cannot_be_referenced_in_constructor_arguments);
                    }
                    break;
                case 124 /* Property */:
                    if (container.flags & 128 /* Static */) {
                        error(node, ts.Diagnostics.this_cannot_be_referenced_in_a_static_property_initializer);
                    }
                    break;
            }
            if (needToCaptureLexicalThis) {
                captureLexicalThis(node, container);
            }
            var classNode = container.parent && container.parent.kind === 184 /* ClassDeclaration */ ? container.parent : undefined;
            if (classNode) {
                var symbol = getSymbolOfNode(classNode);
                return container.flags & 128 /* Static */ ? getTypeOfSymbol(symbol) : getDeclaredTypeOfSymbol(symbol);
            }
            return anyType;
        }
        function getSuperContainer(node) {
            while (true) {
                node = node.parent;
                if (!node)
                    return node;
                switch (node.kind) {
                    case 182 /* FunctionDeclaration */:
                    case 149 /* FunctionExpression */:
                    case 150 /* ArrowFunction */:
                    case 124 /* Property */:
                    case 125 /* Method */:
                    case 126 /* Constructor */:
                    case 127 /* GetAccessor */:
                    case 128 /* SetAccessor */:
                        return node;
                }
            }
        }
        function isInConstructorArgumentInitializer(node, constructorDecl) {
            for (var n = node; n && n !== constructorDecl; n = n.parent) {
                if (n.kind === 123 /* Parameter */) {
                    return true;
                }
            }
            return false;
        }
        function checkSuperExpression(node) {
            var isCallExpression = node.parent.kind === 144 /* CallExpression */ && node.parent.func === node;
            var enclosingClass = ts.getAncestor(node, 184 /* ClassDeclaration */);
            var baseClass;
            if (enclosingClass && enclosingClass.baseType) {
                var classType = getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClass));
                baseClass = classType.baseTypes.length && classType.baseTypes[0];
            }
            if (!baseClass) {
                error(node, ts.Diagnostics.super_can_only_be_referenced_in_a_derived_class);
                return unknownType;
            }
            var container = getSuperContainer(node);
            if (container) {
                var canUseSuperExpression = false;
                if (isCallExpression) {
                    canUseSuperExpression = container.kind === 126 /* Constructor */;
                }
                else {
                    var needToCaptureLexicalThis = false;
                    while (container && container.kind === 150 /* ArrowFunction */) {
                        container = getSuperContainer(container);
                        needToCaptureLexicalThis = true;
                    }
                    if (container && container.parent && container.parent.kind === 184 /* ClassDeclaration */) {
                        if (container.flags & 128 /* Static */) {
                            canUseSuperExpression = container.kind === 125 /* Method */ || container.kind === 127 /* GetAccessor */ || container.kind === 128 /* SetAccessor */;
                        }
                        else {
                            canUseSuperExpression = container.kind === 125 /* Method */ || container.kind === 127 /* GetAccessor */ || container.kind === 128 /* SetAccessor */ || container.kind === 124 /* Property */ || container.kind === 126 /* Constructor */;
                        }
                    }
                }
                if (canUseSuperExpression) {
                    var returnType;
                    if ((container.flags & 128 /* Static */) || isCallExpression) {
                        getNodeLinks(node).flags |= 32 /* SuperStatic */;
                        returnType = getTypeOfSymbol(baseClass.symbol);
                    }
                    else {
                        getNodeLinks(node).flags |= 16 /* SuperInstance */;
                        returnType = baseClass;
                    }
                    if (container.kind === 126 /* Constructor */ && isInConstructorArgumentInitializer(node, container)) {
                        error(node, ts.Diagnostics.super_cannot_be_referenced_in_constructor_arguments);
                        returnType = unknownType;
                    }
                    if (!isCallExpression && needToCaptureLexicalThis) {
                        captureLexicalThis(node.parent, container);
                    }
                    return returnType;
                }
            }
            if (isCallExpression) {
                error(node, ts.Diagnostics.Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors);
            }
            else {
                error(node, ts.Diagnostics.super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class);
            }
            return unknownType;
        }
        function getContextuallyTypedParameterType(parameter) {
            var func = parameter.parent;
            if (func.kind === 149 /* FunctionExpression */ || func.kind === 150 /* ArrowFunction */) {
                if (isContextSensitiveExpression(func)) {
                    var contextualSignature = getContextualSignature(func);
                    if (contextualSignature) {
                        var funcHasRestParameters = ts.hasRestParameters(func);
                        var len = func.parameters.length - (funcHasRestParameters ? 1 : 0);
                        var indexOfParameter = ts.indexOf(func.parameters, parameter);
                        if (indexOfParameter < len) {
                            return getTypeAtPosition(contextualSignature, indexOfParameter);
                        }
                        if (indexOfParameter === (func.parameters.length - 1) && funcHasRestParameters && contextualSignature.hasRestParameter && func.parameters.length >= contextualSignature.parameters.length) {
                            return getTypeOfSymbol(contextualSignature.parameters[contextualSignature.parameters.length - 1]);
                        }
                    }
                }
            }
            return undefined;
        }
        function getContextualTypeForInitializerExpression(node) {
            var declaration = node.parent;
            if (node === declaration.initializer) {
                if (declaration.type) {
                    return getTypeFromTypeNode(declaration.type);
                }
                if (declaration.kind === 123 /* Parameter */) {
                    return getContextuallyTypedParameterType(declaration);
                }
            }
            return undefined;
        }
        function getContextualTypeForReturnExpression(node) {
            var func = ts.getContainingFunction(node);
            if (func) {
                if (func.type || func.kind === 126 /* Constructor */ || func.kind === 127 /* GetAccessor */ && getSetAccessorTypeAnnotationNode(getDeclarationOfKind(func.symbol, 128 /* SetAccessor */))) {
                    return getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                }
                var signature = getContextualSignature(func);
                if (signature) {
                    return getReturnTypeOfSignature(signature);
                }
            }
            return undefined;
        }
        function getContextualTypeForArgument(node) {
            var callExpression = node.parent;
            var argIndex = ts.indexOf(callExpression.arguments, node);
            if (argIndex >= 0) {
                var signature = getResolvedSignature(callExpression);
                return getTypeAtPosition(signature, argIndex);
            }
            return undefined;
        }
        function getContextualTypeForBinaryOperand(node) {
            var binaryExpression = node.parent;
            var operator = binaryExpression.operator;
            if (operator >= 51 /* FirstAssignment */ && operator <= 62 /* LastAssignment */) {
                if (node === binaryExpression.right) {
                    return checkExpression(binaryExpression.left);
                }
            }
            else if (operator === 48 /* BarBarToken */) {
                var type = getContextualType(binaryExpression);
                if (!type && node === binaryExpression.right) {
                    type = checkExpression(binaryExpression.left);
                }
                return type;
            }
            return undefined;
        }
        function applyToContextualType(type, mapper) {
            if (!(type.flags & 16384 /* Union */)) {
                return mapper(type);
            }
            var types = type.types;
            var mappedType;
            var mappedTypes;
            for (var i = 0; i < types.length; i++) {
                var t = mapper(types[i]);
                if (t) {
                    if (!mappedType) {
                        mappedType = t;
                    }
                    else if (!mappedTypes) {
                        mappedTypes = [mappedType, t];
                    }
                    else {
                        mappedTypes.push(t);
                    }
                }
            }
            return mappedTypes ? getUnionType(mappedTypes) : mappedType;
        }
        function getTypeOfPropertyOfContextualType(type, name) {
            return applyToContextualType(type, function (t) {
                var prop = getPropertyOfObjectType(t, name);
                return prop ? getTypeOfSymbol(prop) : undefined;
            });
        }
        function getIndexTypeOfContextualType(type, kind) {
            return applyToContextualType(type, function (t) { return getIndexTypeOfObjectOrUnionType(t, kind); });
        }
        function contextualTypeIsTupleType(type) {
            return !!(type.flags & 16384 /* Union */ ? ts.forEach(type.types, function (t) { return getPropertyOfObjectType(t, "0"); }) : getPropertyOfObjectType(type, "0"));
        }
        function contextualTypeHasIndexSignature(type, kind) {
            return !!(type.flags & 16384 /* Union */ ? ts.forEach(type.types, function (t) { return getIndexTypeOfObjectOrUnionType(t, kind); }) : getIndexTypeOfObjectOrUnionType(type, kind));
        }
        function getContextualTypeForPropertyExpression(node) {
            var declaration = node.parent;
            var objectLiteral = declaration.parent;
            var type = getContextualType(objectLiteral);
            var name = declaration.name.text;
            if (type && name) {
                return getTypeOfPropertyOfContextualType(type, name) || isNumericName(name) && getIndexTypeOfContextualType(type, 1 /* Number */) || getIndexTypeOfContextualType(type, 0 /* String */);
            }
            return undefined;
        }
        function getContextualTypeForElementExpression(node) {
            var arrayLiteral = node.parent;
            var type = getContextualType(arrayLiteral);
            if (type) {
                var index = ts.indexOf(arrayLiteral.elements, node);
                return getTypeOfPropertyOfContextualType(type, "" + index) || getIndexTypeOfContextualType(type, 1 /* Number */);
            }
            return undefined;
        }
        function getContextualTypeForConditionalOperand(node) {
            var conditional = node.parent;
            return node === conditional.whenTrue || node === conditional.whenFalse ? getContextualType(conditional) : undefined;
        }
        function getContextualType(node) {
            if (isInsideWithStatementBody(node)) {
                return undefined;
            }
            if (node.contextualType) {
                return node.contextualType;
            }
            var parent = node.parent;
            switch (parent.kind) {
                case 181 /* VariableDeclaration */:
                case 123 /* Parameter */:
                case 124 /* Property */:
                    return getContextualTypeForInitializerExpression(node);
                case 150 /* ArrowFunction */:
                case 169 /* ReturnStatement */:
                    return getContextualTypeForReturnExpression(node);
                case 144 /* CallExpression */:
                case 145 /* NewExpression */:
                    return getContextualTypeForArgument(node);
                case 147 /* TypeAssertion */:
                    return getTypeFromTypeNode(parent.type);
                case 153 /* BinaryExpression */:
                    return getContextualTypeForBinaryOperand(node);
                case 141 /* PropertyAssignment */:
                    return getContextualTypeForPropertyExpression(node);
                case 139 /* ArrayLiteral */:
                    return getContextualTypeForElementExpression(node);
                case 154 /* ConditionalExpression */:
                    return getContextualTypeForConditionalOperand(node);
            }
            return undefined;
        }
        function getNonGenericSignature(type) {
            var signatures = getSignaturesOfObjectOrUnionType(type, 0 /* Call */);
            if (signatures.length === 1) {
                var signature = signatures[0];
                if (!signature.typeParameters) {
                    return signature;
                }
            }
        }
        function getContextualSignature(node) {
            var type = getContextualType(node);
            if (!type) {
                return undefined;
            }
            if (!(type.flags & 16384 /* Union */)) {
                return getNonGenericSignature(type);
            }
            var result;
            var types = type.types;
            for (var i = 0; i < types.length; i++) {
                var signature = getNonGenericSignature(types[i]);
                if (signature) {
                    if (!result) {
                        result = signature;
                    }
                    else if (!compareSignatures(result, signature, true, compareTypes)) {
                        return undefined;
                    }
                }
            }
            return result;
        }
        function isInferentialContext(mapper) {
            return mapper && mapper !== identityMapper;
        }
        function checkArrayLiteral(node, contextualMapper) {
            var elements = node.elements;
            if (!elements.length) {
                return createArrayType(undefinedType);
            }
            var elementTypes = ts.map(elements, function (e) { return checkExpression(e, contextualMapper); });
            var contextualType = getContextualType(node);
            if (contextualType && contextualTypeIsTupleType(contextualType)) {
                return createTupleType(elementTypes);
            }
            return createArrayType(getUnionType(elementTypes));
        }
        function isNumericName(name) {
            return (+name).toString() === name;
        }
        function checkObjectLiteral(node, contextualMapper) {
            var members = node.symbol.members;
            var properties = {};
            var contextualType = getContextualType(node);
            for (var id in members) {
                if (ts.hasProperty(members, id)) {
                    var member = members[id];
                    if (member.flags & 4 /* Property */) {
                        var type = checkExpression(member.declarations[0].initializer, contextualMapper);
                        var prop = createSymbol(4 /* Property */ | 268435456 /* Transient */ | member.flags, member.name);
                        prop.declarations = member.declarations;
                        prop.parent = member.parent;
                        if (member.valueDeclaration)
                            prop.valueDeclaration = member.valueDeclaration;
                        prop.type = type;
                        prop.target = member;
                        member = prop;
                    }
                    else {
                        var getAccessor = getDeclarationOfKind(member, 127 /* GetAccessor */);
                        if (getAccessor) {
                            checkAccessorDeclaration(getAccessor);
                        }
                        var setAccessor = getDeclarationOfKind(member, 128 /* SetAccessor */);
                        if (setAccessor) {
                            checkAccessorDeclaration(setAccessor);
                        }
                    }
                    properties[member.name] = member;
                }
            }
            var stringIndexType = getIndexType(0 /* String */);
            var numberIndexType = getIndexType(1 /* Number */);
            return createAnonymousType(node.symbol, properties, emptyArray, emptyArray, stringIndexType, numberIndexType);
            function getIndexType(kind) {
                if (contextualType && contextualTypeHasIndexSignature(contextualType, kind)) {
                    var propTypes = [];
                    for (var id in properties) {
                        if (ts.hasProperty(properties, id)) {
                            if (kind === 0 /* String */ || isNumericName(id)) {
                                var type = getTypeOfSymbol(properties[id]);
                                if (!ts.contains(propTypes, type)) {
                                    propTypes.push(type);
                                }
                            }
                        }
                    }
                    return propTypes.length ? getUnionType(propTypes) : undefinedType;
                }
                return undefined;
            }
        }
        function getDeclarationKindFromSymbol(s) {
            return s.valueDeclaration ? s.valueDeclaration.kind : 124 /* Property */;
        }
        function getDeclarationFlagsFromSymbol(s) {
            return s.valueDeclaration ? s.valueDeclaration.flags : s.flags & 536870912 /* Prototype */ ? 16 /* Public */ | 128 /* Static */ : 0;
        }
        function checkClassPropertyAccess(node, type, prop) {
            var flags = getDeclarationFlagsFromSymbol(prop);
            if (!(flags & (32 /* Private */ | 64 /* Protected */))) {
                return;
            }
            var enclosingClassDeclaration = ts.getAncestor(node, 184 /* ClassDeclaration */);
            var enclosingClass = enclosingClassDeclaration ? getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClassDeclaration)) : undefined;
            var declaringClass = getDeclaredTypeOfSymbol(prop.parent);
            if (flags & 32 /* Private */) {
                if (declaringClass !== enclosingClass) {
                    error(node, ts.Diagnostics.Property_0_is_private_and_only_accessible_within_class_1, symbolToString(prop), typeToString(declaringClass));
                }
                return;
            }
            if (node.left.kind === 89 /* SuperKeyword */) {
                return;
            }
            if (!enclosingClass || !hasBaseType(enclosingClass, declaringClass)) {
                error(node, ts.Diagnostics.Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses, symbolToString(prop), typeToString(declaringClass));
                return;
            }
            if (flags & 128 /* Static */) {
                return;
            }
            if (!(getTargetType(type).flags & (1024 /* Class */ | 2048 /* Interface */) && hasBaseType(type, enclosingClass))) {
                error(node, ts.Diagnostics.Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1, symbolToString(prop), typeToString(enclosingClass));
            }
        }
        function checkPropertyAccess(node) {
            var type = checkExpression(node.left);
            if (type === unknownType)
                return type;
            if (type !== anyType) {
                var apparentType = getApparentType(getWidenedType(type));
                if (apparentType === unknownType) {
                    return unknownType;
                }
                var prop = getPropertyOfType(apparentType, node.right.text);
                if (!prop) {
                    if (node.right.text) {
                        error(node.right, ts.Diagnostics.Property_0_does_not_exist_on_type_1, ts.identifierToString(node.right), typeToString(type));
                    }
                    return unknownType;
                }
                getNodeLinks(node).resolvedSymbol = prop;
                if (prop.parent && prop.parent.flags & 32 /* Class */) {
                    if (node.left.kind === 89 /* SuperKeyword */ && getDeclarationKindFromSymbol(prop) !== 125 /* Method */) {
                        error(node.right, ts.Diagnostics.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword);
                    }
                    else {
                        checkClassPropertyAccess(node, type, prop);
                    }
                }
                return getTypeOfSymbol(prop);
            }
            return anyType;
        }
        function isValidPropertyAccess(node, propertyName) {
            var type = checkExpression(node.left);
            if (type !== unknownType && type !== anyType) {
                var prop = getPropertyOfType(getWidenedType(type), propertyName);
                if (prop && prop.parent && prop.parent.flags & 32 /* Class */) {
                    if (node.left.kind === 89 /* SuperKeyword */ && getDeclarationKindFromSymbol(prop) !== 125 /* Method */) {
                        return false;
                    }
                    else {
                        var diagnosticsCount = diagnostics.length;
                        checkClassPropertyAccess(node, type, prop);
                        return diagnostics.length === diagnosticsCount;
                    }
                }
            }
            return true;
        }
        function checkIndexedAccess(node) {
            var objectType = getApparentType(checkExpression(node.object));
            var indexType = checkExpression(node.index);
            if (objectType === unknownType)
                return unknownType;
            if (isConstEnumObjectType(objectType) && node.index.kind !== 7 /* StringLiteral */) {
                error(node.index, ts.Diagnostics.Index_expression_arguments_in_const_enums_must_be_of_type_string);
            }
            if (node.index.kind === 7 /* StringLiteral */ || node.index.kind === 6 /* NumericLiteral */) {
                var name = node.index.text;
                var prop = getPropertyOfType(objectType, name);
                if (prop) {
                    getNodeLinks(node).resolvedSymbol = prop;
                    return getTypeOfSymbol(prop);
                }
            }
            if (indexType.flags & (1 /* Any */ | 258 /* StringLike */ | 132 /* NumberLike */)) {
                if (indexType.flags & (1 /* Any */ | 132 /* NumberLike */)) {
                    var numberIndexType = getIndexTypeOfType(objectType, 1 /* Number */);
                    if (numberIndexType) {
                        return numberIndexType;
                    }
                }
                var stringIndexType = getIndexTypeOfType(objectType, 0 /* String */);
                if (stringIndexType) {
                    return stringIndexType;
                }
                if (compilerOptions.noImplicitAny && objectType !== anyType) {
                    error(node, ts.Diagnostics.Index_signature_of_object_type_implicitly_has_an_any_type);
                }
                return anyType;
            }
            error(node, ts.Diagnostics.An_index_expression_argument_must_be_of_type_string_number_or_any);
            return unknownType;
        }
        function resolveUntypedCall(node) {
            ts.forEach(node.arguments, function (argument) {
                checkExpression(argument);
            });
            return anySignature;
        }
        function resolveErrorCall(node) {
            resolveUntypedCall(node);
            return unknownSignature;
        }
        function signatureHasCorrectArity(node, signature) {
            if (!node.arguments) {
                return signature.minArgumentCount === 0;
            }
            var args = node.arguments;
            var numberOfArgs = args.hasTrailingComma ? args.length + 1 : args.length;
            var hasTooManyArguments = !signature.hasRestParameter && numberOfArgs > signature.parameters.length;
            var hasRightNumberOfTypeArguments = !node.typeArguments || (signature.typeParameters && node.typeArguments.length === signature.typeParameters.length);
            if (hasTooManyArguments || !hasRightNumberOfTypeArguments) {
                return false;
            }
            var callIsIncomplete = args.end === node.end;
            var hasEnoughArguments = numberOfArgs >= signature.minArgumentCount;
            return callIsIncomplete || hasEnoughArguments;
        }
        function getSingleCallSignature(type) {
            if (type.flags & 48128 /* ObjectType */) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                if (resolved.callSignatures.length === 1 && resolved.constructSignatures.length === 0 && resolved.properties.length === 0 && !resolved.stringIndexType && !resolved.numberIndexType) {
                    return resolved.callSignatures[0];
                }
            }
            return undefined;
        }
        function instantiateSignatureInContextOf(signature, contextualSignature, contextualMapper) {
            var context = createInferenceContext(signature.typeParameters, true);
            forEachMatchingParameterType(contextualSignature, signature, function (source, target) {
                inferTypes(context, instantiateType(source, contextualMapper), target);
            });
            return getSignatureInstantiation(signature, getInferredTypes(context));
        }
        function inferTypeArguments(signature, args, excludeArgument) {
            var typeParameters = signature.typeParameters;
            var context = createInferenceContext(typeParameters, false);
            var mapper = createInferenceMapper(context);
            for (var i = 0; i < args.length; i++) {
                if (args[i].kind === 157 /* OmittedExpression */) {
                    continue;
                }
                if (!excludeArgument || excludeArgument[i] === undefined) {
                    var parameterType = getTypeAtPosition(signature, i);
                    inferTypes(context, checkExpressionWithContextualType(args[i], parameterType, mapper), parameterType);
                }
            }
            if (excludeArgument) {
                for (var i = 0; i < args.length; i++) {
                    if (args[i].kind === 157 /* OmittedExpression */) {
                        continue;
                    }
                    if (excludeArgument[i] === false) {
                        var parameterType = getTypeAtPosition(signature, i);
                        inferTypes(context, checkExpressionWithContextualType(args[i], parameterType, mapper), parameterType);
                    }
                }
            }
            var inferredTypes = getInferredTypes(context);
            context.failedTypeParameterIndex = ts.indexOf(inferredTypes, inferenceFailureType);
            for (var i = 0; i < inferredTypes.length; i++) {
                if (inferredTypes[i] === inferenceFailureType) {
                    inferredTypes[i] = unknownType;
                }
            }
            return context;
        }
        function checkTypeArguments(signature, typeArguments, typeArgumentResultTypes, reportErrors) {
            var typeParameters = signature.typeParameters;
            var typeArgumentsAreAssignable = true;
            for (var i = 0; i < typeParameters.length; i++) {
                var typeArgNode = typeArguments[i];
                var typeArgument = getTypeFromTypeNode(typeArgNode);
                typeArgumentResultTypes[i] = typeArgument;
                if (typeArgumentsAreAssignable) {
                    var constraint = getConstraintOfTypeParameter(typeParameters[i]);
                    if (constraint) {
                        typeArgumentsAreAssignable = checkTypeAssignableTo(typeArgument, constraint, reportErrors ? typeArgNode : undefined, ts.Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
            }
            return typeArgumentsAreAssignable;
        }
        function checkApplicableSignature(node, signature, relation, excludeArgument, reportErrors) {
            if (node.arguments) {
                for (var i = 0; i < node.arguments.length; i++) {
                    var arg = node.arguments[i];
                    if (arg.kind === 157 /* OmittedExpression */) {
                        continue;
                    }
                    var paramType = getTypeAtPosition(signature, i);
                    var argType = arg.kind === 7 /* StringLiteral */ && !reportErrors ? getStringLiteralType(arg) : checkExpressionWithContextualType(arg, paramType, excludeArgument && excludeArgument[i] ? identityMapper : undefined);
                    var isValidArgument = checkTypeRelatedTo(argType, paramType, relation, reportErrors ? arg : undefined, ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1);
                    if (!isValidArgument) {
                        return false;
                    }
                }
            }
            return true;
        }
        function resolveCall(node, signatures, candidatesOutArray) {
            ts.forEach(node.typeArguments, checkSourceElement);
            var candidates = candidatesOutArray || [];
            collectCandidates();
            if (!candidates.length) {
                error(node, ts.Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
                return resolveErrorCall(node);
            }
            var args = node.arguments || emptyArray;
            var excludeArgument;
            for (var i = 0; i < args.length; i++) {
                if (isContextSensitiveExpression(args[i])) {
                    if (!excludeArgument)
                        excludeArgument = new Array(args.length);
                    excludeArgument[i] = true;
                }
            }
            var candidateForArgumentError;
            var candidateForTypeArgumentError;
            var resultOfFailedInference;
            var result;
            if (candidates.length > 1) {
                result = chooseOverload(candidates, subtypeRelation, excludeArgument);
            }
            if (!result) {
                candidateForArgumentError = undefined;
                candidateForTypeArgumentError = undefined;
                resultOfFailedInference = undefined;
                result = chooseOverload(candidates, assignableRelation, excludeArgument);
            }
            if (result) {
                return result;
            }
            if (candidateForArgumentError) {
                checkApplicableSignature(node, candidateForArgumentError, assignableRelation, undefined, true);
            }
            else if (candidateForTypeArgumentError) {
                if (node.typeArguments) {
                    checkTypeArguments(candidateForTypeArgumentError, node.typeArguments, [], true);
                }
                else {
                    ts.Debug.assert(resultOfFailedInference.failedTypeParameterIndex >= 0);
                    var failedTypeParameter = candidateForTypeArgumentError.typeParameters[resultOfFailedInference.failedTypeParameterIndex];
                    var inferenceCandidates = resultOfFailedInference.inferences[resultOfFailedInference.failedTypeParameterIndex];
                    var diagnosticChainHead = ts.chainDiagnosticMessages(undefined, ts.Diagnostics.The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly, typeToString(failedTypeParameter));
                    reportNoCommonSupertypeError(inferenceCandidates, node.func, diagnosticChainHead);
                }
            }
            else {
                error(node, ts.Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
            }
            if (!fullTypeCheck) {
                for (var i = 0, n = candidates.length; i < n; i++) {
                    if (signatureHasCorrectArity(node, candidates[i])) {
                        return candidates[i];
                    }
                }
            }
            return resolveErrorCall(node);
            function chooseOverload(candidates, relation, excludeArgument) {
                for (var i = 0; i < candidates.length; i++) {
                    if (!signatureHasCorrectArity(node, candidates[i])) {
                        continue;
                    }
                    var originalCandidate = candidates[i];
                    var inferenceResult;
                    while (true) {
                        var candidate = originalCandidate;
                        if (candidate.typeParameters) {
                            var typeArgumentTypes;
                            var typeArgumentsAreValid;
                            if (node.typeArguments) {
                                typeArgumentTypes = new Array(candidate.typeParameters.length);
                                typeArgumentsAreValid = checkTypeArguments(candidate, node.typeArguments, typeArgumentTypes, false);
                            }
                            else {
                                inferenceResult = inferTypeArguments(candidate, args, excludeArgument);
                                typeArgumentsAreValid = inferenceResult.failedTypeParameterIndex < 0;
                                typeArgumentTypes = inferenceResult.inferredTypes;
                            }
                            if (!typeArgumentsAreValid) {
                                break;
                            }
                            candidate = getSignatureInstantiation(candidate, typeArgumentTypes);
                        }
                        if (!checkApplicableSignature(node, candidate, relation, excludeArgument, false)) {
                            break;
                        }
                        var index = excludeArgument ? ts.indexOf(excludeArgument, true) : -1;
                        if (index < 0) {
                            return candidate;
                        }
                        excludeArgument[index] = false;
                    }
                    if (originalCandidate.typeParameters) {
                        var instantiatedCandidate = candidate;
                        if (typeArgumentsAreValid) {
                            candidateForArgumentError = instantiatedCandidate;
                        }
                        else {
                            candidateForTypeArgumentError = originalCandidate;
                            if (!node.typeArguments) {
                                resultOfFailedInference = inferenceResult;
                            }
                        }
                    }
                    else {
                        ts.Debug.assert(originalCandidate === candidate);
                        candidateForArgumentError = originalCandidate;
                    }
                }
                return undefined;
            }
            function collectCandidates() {
                var result = candidates;
                var lastParent;
                var lastSymbol;
                var cutoffPos = 0;
                var pos;
                ts.Debug.assert(!result.length);
                for (var i = 0; i < signatures.length; i++) {
                    var signature = signatures[i];
                    var symbol = signature.declaration && getSymbolOfNode(signature.declaration);
                    var parent = signature.declaration && signature.declaration.parent;
                    if (!lastSymbol || symbol === lastSymbol) {
                        if (lastParent && parent === lastParent) {
                            pos++;
                        }
                        else {
                            lastParent = parent;
                            pos = cutoffPos;
                        }
                    }
                    else {
                        pos = cutoffPos = result.length;
                        lastParent = parent;
                    }
                    lastSymbol = symbol;
                    for (var j = result.length; j > pos; j--) {
                        result[j] = result[j - 1];
                    }
                    result[pos] = signature;
                }
            }
        }
        function resolveCallExpression(node, candidatesOutArray) {
            if (node.func.kind === 89 /* SuperKeyword */) {
                var superType = checkSuperExpression(node.func);
                if (superType !== unknownType) {
                    return resolveCall(node, getSignaturesOfType(superType, 1 /* Construct */), candidatesOutArray);
                }
                return resolveUntypedCall(node);
            }
            var funcType = checkExpression(node.func);
            var apparentType = getApparentType(funcType);
            if (apparentType === unknownType) {
                return resolveErrorCall(node);
            }
            var callSignatures = getSignaturesOfType(apparentType, 0 /* Call */);
            var constructSignatures = getSignaturesOfType(apparentType, 1 /* Construct */);
            if (funcType === anyType || (!callSignatures.length && !constructSignatures.length && !(funcType.flags & 16384 /* Union */) && isTypeAssignableTo(funcType, globalFunctionType))) {
                if (node.typeArguments) {
                    error(node, ts.Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }
                return resolveUntypedCall(node);
            }
            if (!callSignatures.length) {
                if (constructSignatures.length) {
                    error(node, ts.Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new, typeToString(funcType));
                }
                else {
                    error(node, ts.Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature);
                }
                return resolveErrorCall(node);
            }
            return resolveCall(node, callSignatures, candidatesOutArray);
        }
        function resolveNewExpression(node, candidatesOutArray) {
            var expressionType = checkExpression(node.func);
            if (expressionType === anyType) {
                if (node.typeArguments) {
                    error(node, ts.Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }
                return resolveUntypedCall(node);
            }
            expressionType = getApparentType(expressionType);
            if (expressionType === unknownType) {
                return resolveErrorCall(node);
            }
            var constructSignatures = getSignaturesOfType(expressionType, 1 /* Construct */);
            if (constructSignatures.length) {
                return resolveCall(node, constructSignatures, candidatesOutArray);
            }
            var callSignatures = getSignaturesOfType(expressionType, 0 /* Call */);
            if (callSignatures.length) {
                var signature = resolveCall(node, callSignatures, candidatesOutArray);
                if (getReturnTypeOfSignature(signature) !== voidType) {
                    error(node, ts.Diagnostics.Only_a_void_function_can_be_called_with_the_new_keyword);
                }
                return signature;
            }
            error(node, ts.Diagnostics.Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature);
            return resolveErrorCall(node);
        }
        function getResolvedSignature(node, candidatesOutArray) {
            var links = getNodeLinks(node);
            if (!links.resolvedSignature || candidatesOutArray) {
                links.resolvedSignature = anySignature;
                links.resolvedSignature = node.kind === 144 /* CallExpression */ ? resolveCallExpression(node, candidatesOutArray) : resolveNewExpression(node, candidatesOutArray);
            }
            return links.resolvedSignature;
        }
        function checkCallExpression(node) {
            var signature = getResolvedSignature(node);
            if (node.func.kind === 89 /* SuperKeyword */) {
                return voidType;
            }
            if (node.kind === 145 /* NewExpression */) {
                var declaration = signature.declaration;
                if (declaration && (declaration.kind !== 126 /* Constructor */ && declaration.kind !== 130 /* ConstructSignature */)) {
                    if (compilerOptions.noImplicitAny) {
                        error(node, ts.Diagnostics.new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type);
                    }
                    return anyType;
                }
            }
            return getReturnTypeOfSignature(signature);
        }
        function checkTaggedTemplateExpression(node) {
            checkExpression(node.tag);
            checkExpression(node.template);
            return anyType;
        }
        function checkTypeAssertion(node) {
            var exprType = checkExpression(node.operand);
            var targetType = getTypeFromTypeNode(node.type);
            if (fullTypeCheck && targetType !== unknownType) {
                var widenedType = getWidenedType(exprType, true);
                if (!(isTypeAssignableTo(targetType, widenedType))) {
                    checkTypeAssignableTo(exprType, targetType, node, ts.Diagnostics.Neither_type_0_nor_type_1_is_assignable_to_the_other);
                }
            }
            return targetType;
        }
        function getTypeAtPosition(signature, pos) {
            return signature.hasRestParameter ? pos < signature.parameters.length - 1 ? getTypeOfSymbol(signature.parameters[pos]) : getRestTypeOfSignature(signature) : pos < signature.parameters.length ? getTypeOfSymbol(signature.parameters[pos]) : anyType;
        }
        function assignContextualParameterTypes(signature, context, mapper) {
            var len = signature.parameters.length - (signature.hasRestParameter ? 1 : 0);
            for (var i = 0; i < len; i++) {
                var parameter = signature.parameters[i];
                var links = getSymbolLinks(parameter);
                links.type = instantiateType(getTypeAtPosition(context, i), mapper);
            }
            if (signature.hasRestParameter && context.hasRestParameter && signature.parameters.length >= context.parameters.length) {
                var parameter = signature.parameters[signature.parameters.length - 1];
                var links = getSymbolLinks(parameter);
                links.type = instantiateType(getTypeOfSymbol(context.parameters[context.parameters.length - 1]), mapper);
            }
        }
        function getReturnTypeFromBody(func, contextualMapper) {
            var contextualSignature = getContextualSignature(func);
            if (func.body.kind !== 183 /* FunctionBlock */) {
                var unwidenedType = checkAndMarkExpression(func.body, contextualMapper);
                var widenedType = getWidenedType(unwidenedType);
                if (fullTypeCheck && compilerOptions.noImplicitAny && !contextualSignature && widenedType !== unwidenedType && getInnermostTypeOfNestedArrayTypes(widenedType) === anyType) {
                    error(func, ts.Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeToString(widenedType));
                }
                return widenedType;
            }
            var types = checkAndAggregateReturnExpressionTypes(func.body, contextualMapper);
            if (types.length > 0) {
                var commonType = contextualSignature ? getUnionType(types) : getCommonSupertype(types);
                if (!commonType) {
                    error(func, ts.Diagnostics.No_best_common_type_exists_among_return_expressions);
                    return unknownType;
                }
                var widenedType = getWidenedType(commonType);
                if (fullTypeCheck && compilerOptions.noImplicitAny && !contextualSignature && widenedType !== commonType && getInnermostTypeOfNestedArrayTypes(widenedType) === anyType) {
                    var typeName = typeToString(widenedType);
                    if (func.name) {
                        error(func, ts.Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type, ts.identifierToString(func.name), typeName);
                    }
                    else {
                        error(func, ts.Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeName);
                    }
                }
                return widenedType;
            }
            return voidType;
        }
        function checkAndAggregateReturnExpressionTypes(body, contextualMapper) {
            var aggregatedTypes = [];
            ts.forEachReturnStatement(body, function (returnStatement) {
                var expr = returnStatement.expression;
                if (expr) {
                    var type = checkAndMarkExpression(expr, contextualMapper);
                    if (!ts.contains(aggregatedTypes, type)) {
                        aggregatedTypes.push(type);
                    }
                }
            });
            return aggregatedTypes;
        }
        function bodyContainsAReturnStatement(funcBody) {
            return ts.forEachReturnStatement(funcBody, function (returnStatement) {
                return true;
            });
        }
        function bodyContainsSingleThrowStatement(body) {
            return (body.statements.length === 1) && (body.statements[0].kind === 175 /* ThrowStatement */);
        }
        function checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(func, returnType) {
            if (!fullTypeCheck) {
                return;
            }
            if (returnType === voidType || returnType === anyType) {
                return;
            }
            if (!func.body || func.body.kind !== 183 /* FunctionBlock */) {
                return;
            }
            var bodyBlock = func.body;
            if (bodyContainsAReturnStatement(bodyBlock)) {
                return;
            }
            if (bodyContainsSingleThrowStatement(bodyBlock)) {
                return;
            }
            error(func.type, ts.Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value_or_consist_of_a_single_throw_statement);
        }
        function checkFunctionExpression(node, contextualMapper) {
            if (contextualMapper === identityMapper) {
                return anyFunctionType;
            }
            var links = getNodeLinks(node);
            var type = getTypeOfSymbol(node.symbol);
            if (!(links.flags & 64 /* ContextChecked */)) {
                var contextualSignature = getContextualSignature(node);
                if (!(links.flags & 64 /* ContextChecked */)) {
                    links.flags |= 64 /* ContextChecked */;
                    if (contextualSignature) {
                        var signature = getSignaturesOfType(type, 0 /* Call */)[0];
                        if (isContextSensitiveExpression(node)) {
                            assignContextualParameterTypes(signature, contextualSignature, contextualMapper || identityMapper);
                        }
                        if (!node.type) {
                            signature.resolvedReturnType = resolvingType;
                            var returnType = getReturnTypeFromBody(node, contextualMapper);
                            if (signature.resolvedReturnType === resolvingType) {
                                signature.resolvedReturnType = returnType;
                            }
                        }
                    }
                    checkSignatureDeclaration(node);
                }
            }
            return type;
        }
        function checkFunctionExpressionBody(node) {
            if (node.type) {
                checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(node, getTypeFromTypeNode(node.type));
            }
            if (node.body.kind === 183 /* FunctionBlock */) {
                checkSourceElement(node.body);
            }
            else {
                var exprType = checkExpression(node.body);
                if (node.type) {
                    checkTypeAssignableTo(exprType, getTypeFromTypeNode(node.type), node.body, undefined);
                }
                checkFunctionExpressionBodies(node.body);
            }
        }
        function checkArithmeticOperandType(operand, type, diagnostic) {
            if (!(type.flags & (1 /* Any */ | 132 /* NumberLike */))) {
                error(operand, diagnostic);
                return false;
            }
            return true;
        }
        function checkReferenceExpression(n, invalidReferenceMessage, constantVarianleMessage) {
            function findSymbol(n) {
                var symbol = getNodeLinks(n).resolvedSymbol;
                return symbol && getExportSymbolOfValueSymbolIfExported(symbol);
            }
            function isReferenceOrErrorExpression(n) {
                switch (n.kind) {
                    case 63 /* Identifier */:
                        var symbol = findSymbol(n);
                        return !symbol || symbol === unknownSymbol || symbol === argumentsSymbol || (symbol.flags & 3 /* Variable */) !== 0;
                    case 142 /* PropertyAccess */:
                        var symbol = findSymbol(n);
                        return !symbol || symbol === unknownSymbol || (symbol.flags & ~8 /* EnumMember */) !== 0;
                    case 143 /* IndexedAccess */:
                        return true;
                    case 148 /* ParenExpression */:
                        return isReferenceOrErrorExpression(n.expression);
                    default:
                        return false;
                }
            }
            function isConstVariableReference(n) {
                switch (n.kind) {
                    case 63 /* Identifier */:
                    case 142 /* PropertyAccess */:
                        var symbol = findSymbol(n);
                        return symbol && (symbol.flags & 3 /* Variable */) !== 0 && (getDeclarationFlagsFromSymbol(symbol) & 4096 /* Const */) !== 0;
                    case 143 /* IndexedAccess */:
                        var index = n.index;
                        var symbol = findSymbol(n.object);
                        if (symbol && index.kind === 7 /* StringLiteral */) {
                            var name = index.text;
                            var prop = getPropertyOfType(getTypeOfSymbol(symbol), name);
                            return prop && (prop.flags & 3 /* Variable */) !== 0 && (getDeclarationFlagsFromSymbol(prop) & 4096 /* Const */) !== 0;
                        }
                        return false;
                    case 148 /* ParenExpression */:
                        return isConstVariableReference(n.expression);
                    default:
                        return false;
                }
            }
            if (!isReferenceOrErrorExpression(n)) {
                error(n, invalidReferenceMessage);
                return false;
            }
            if (isConstVariableReference(n)) {
                error(n, constantVarianleMessage);
                return false;
            }
            return true;
        }
        function checkPrefixExpression(node) {
            var operandType = checkExpression(node.operand);
            switch (node.operator) {
                case 32 /* PlusToken */:
                case 33 /* MinusToken */:
                case 46 /* TildeToken */:
                    return numberType;
                case 45 /* ExclamationToken */:
                case 72 /* DeleteKeyword */:
                    return booleanType;
                case 95 /* TypeOfKeyword */:
                    return stringType;
                case 97 /* VoidKeyword */:
                    return undefinedType;
                case 37 /* PlusPlusToken */:
                case 38 /* MinusMinusToken */:
                    var ok = checkArithmeticOperandType(node.operand, operandType, ts.Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
                    if (ok) {
                        checkReferenceExpression(node.operand, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant);
                    }
                    return numberType;
            }
            return unknownType;
        }
        function checkPostfixExpression(node) {
            var operandType = checkExpression(node.operand);
            var ok = checkArithmeticOperandType(node.operand, operandType, ts.Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
            if (ok) {
                checkReferenceExpression(node.operand, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant);
            }
            return numberType;
        }
        function isStructuredType(type) {
            if (type.flags & 16384 /* Union */) {
                return !ts.forEach(type.types, function (t) { return !isStructuredType(t); });
            }
            return (type.flags & 65025 /* Structured */) !== 0;
        }
        function isConstEnumObjectType(type) {
            return type.flags & (48128 /* ObjectType */ | 32768 /* Anonymous */) && type.symbol && isConstEnumSymbol(type.symbol);
        }
        function isConstEnumSymbol(symbol) {
            return (symbol.flags & 128 /* ConstEnum */) !== 0;
        }
        function checkInstanceOfExpression(node, leftType, rightType) {
            if (leftType !== unknownType && !isStructuredType(leftType)) {
                error(node.left, ts.Diagnostics.The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            if (rightType !== unknownType && rightType !== anyType && !isTypeSubtypeOf(rightType, globalFunctionType)) {
                error(node.right, ts.Diagnostics.The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type);
            }
            return booleanType;
        }
        function checkInExpression(node, leftType, rightType) {
            if (leftType !== anyType && leftType !== stringType && leftType !== numberType) {
                error(node.left, ts.Diagnostics.The_left_hand_side_of_an_in_expression_must_be_of_types_any_string_or_number);
            }
            if (!isStructuredType(rightType)) {
                error(node.right, ts.Diagnostics.The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            return booleanType;
        }
        function checkBinaryExpression(node, contextualMapper) {
            var operator = node.operator;
            var leftType = checkExpression(node.left, contextualMapper);
            var rightType = checkExpression(node.right, contextualMapper);
            switch (operator) {
                case 34 /* AsteriskToken */:
                case 54 /* AsteriskEqualsToken */:
                case 35 /* SlashToken */:
                case 55 /* SlashEqualsToken */:
                case 36 /* PercentToken */:
                case 56 /* PercentEqualsToken */:
                case 33 /* MinusToken */:
                case 53 /* MinusEqualsToken */:
                case 39 /* LessThanLessThanToken */:
                case 57 /* LessThanLessThanEqualsToken */:
                case 40 /* GreaterThanGreaterThanToken */:
                case 58 /* GreaterThanGreaterThanEqualsToken */:
                case 41 /* GreaterThanGreaterThanGreaterThanToken */:
                case 59 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                case 43 /* BarToken */:
                case 61 /* BarEqualsToken */:
                case 44 /* CaretToken */:
                case 62 /* CaretEqualsToken */:
                case 42 /* AmpersandToken */:
                case 60 /* AmpersandEqualsToken */:
                    if (leftType.flags & (32 /* Undefined */ | 64 /* Null */))
                        leftType = rightType;
                    if (rightType.flags & (32 /* Undefined */ | 64 /* Null */))
                        rightType = leftType;
                    var suggestedOperator;
                    if ((leftType.flags & 8 /* Boolean */) && (rightType.flags & 8 /* Boolean */) && (suggestedOperator = getSuggestedBooleanOperator(node.operator)) !== undefined) {
                        error(node, ts.Diagnostics.The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead, ts.tokenToString(node.operator), ts.tokenToString(suggestedOperator));
                    }
                    else {
                        var leftOk = checkArithmeticOperandType(node.left, leftType, ts.Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        var rightOk = checkArithmeticOperandType(node.right, rightType, ts.Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        if (leftOk && rightOk) {
                            checkAssignmentOperator(numberType);
                        }
                    }
                    return numberType;
                case 32 /* PlusToken */:
                case 52 /* PlusEqualsToken */:
                    if (leftType.flags & (32 /* Undefined */ | 64 /* Null */))
                        leftType = rightType;
                    if (rightType.flags & (32 /* Undefined */ | 64 /* Null */))
                        rightType = leftType;
                    var resultType;
                    if (leftType.flags & 132 /* NumberLike */ && rightType.flags & 132 /* NumberLike */) {
                        resultType = numberType;
                    }
                    else if (leftType.flags & 258 /* StringLike */ || rightType.flags & 258 /* StringLike */) {
                        resultType = stringType;
                    }
                    else if (leftType.flags & 1 /* Any */ || leftType === unknownType || rightType.flags & 1 /* Any */ || rightType === unknownType) {
                        resultType = anyType;
                    }
                    if (!resultType) {
                        reportOperatorError();
                        return anyType;
                    }
                    if (operator === 52 /* PlusEqualsToken */) {
                        checkAssignmentOperator(resultType);
                    }
                    return resultType;
                case 27 /* EqualsEqualsToken */:
                case 28 /* ExclamationEqualsToken */:
                case 29 /* EqualsEqualsEqualsToken */:
                case 30 /* ExclamationEqualsEqualsToken */:
                case 23 /* LessThanToken */:
                case 24 /* GreaterThanToken */:
                case 25 /* LessThanEqualsToken */:
                case 26 /* GreaterThanEqualsToken */:
                    if (!isTypeAssignableTo(leftType, rightType) && !isTypeAssignableTo(rightType, leftType)) {
                        reportOperatorError();
                    }
                    return booleanType;
                case 85 /* InstanceOfKeyword */:
                    return checkInstanceOfExpression(node, leftType, rightType);
                case 84 /* InKeyword */:
                    return checkInExpression(node, leftType, rightType);
                case 47 /* AmpersandAmpersandToken */:
                    return rightType;
                case 48 /* BarBarToken */:
                    return getUnionType([leftType, rightType]);
                case 51 /* EqualsToken */:
                    checkAssignmentOperator(rightType);
                    return rightType;
                case 22 /* CommaToken */:
                    return rightType;
            }
            function getSuggestedBooleanOperator(operator) {
                switch (operator) {
                    case 43 /* BarToken */:
                    case 61 /* BarEqualsToken */:
                        return 48 /* BarBarToken */;
                    case 44 /* CaretToken */:
                    case 62 /* CaretEqualsToken */:
                        return 30 /* ExclamationEqualsEqualsToken */;
                    case 42 /* AmpersandToken */:
                    case 60 /* AmpersandEqualsToken */:
                        return 47 /* AmpersandAmpersandToken */;
                    default:
                        return undefined;
                }
            }
            function checkAssignmentOperator(valueType) {
                if (fullTypeCheck && operator >= 51 /* FirstAssignment */ && operator <= 62 /* LastAssignment */) {
                    var ok = checkReferenceExpression(node.left, ts.Diagnostics.Invalid_left_hand_side_of_assignment_expression, ts.Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant);
                    if (ok) {
                        checkTypeAssignableTo(valueType, leftType, node.left, undefined);
                    }
                }
            }
            function reportOperatorError() {
                error(node, ts.Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, ts.tokenToString(node.operator), typeToString(leftType), typeToString(rightType));
            }
        }
        function checkConditionalExpression(node, contextualMapper) {
            checkExpression(node.condition);
            var type1 = checkExpression(node.whenTrue, contextualMapper);
            var type2 = checkExpression(node.whenFalse, contextualMapper);
            return getUnionType([type1, type2]);
        }
        function checkTemplateExpression(node) {
            ts.forEach(node.templateSpans, function (templateSpan) {
                checkExpression(templateSpan.expression);
            });
            return stringType;
        }
        function checkExpressionWithContextualType(node, contextualType, contextualMapper) {
            var saveContextualType = node.contextualType;
            node.contextualType = contextualType;
            var result = checkExpression(node, contextualMapper);
            node.contextualType = saveContextualType;
            return result;
        }
        function checkAndMarkExpression(node, contextualMapper) {
            var result = checkExpression(node, contextualMapper);
            getNodeLinks(node).flags |= 1 /* TypeChecked */;
            return result;
        }
        function checkExpression(node, contextualMapper) {
            var type = checkExpressionNode(node, contextualMapper);
            if (contextualMapper && contextualMapper !== identityMapper) {
                var signature = getSingleCallSignature(type);
                if (signature && signature.typeParameters) {
                    var contextualType = getContextualType(node);
                    if (contextualType) {
                        var contextualSignature = getSingleCallSignature(contextualType);
                        if (contextualSignature && !contextualSignature.typeParameters) {
                            type = getOrCreateTypeFromSignature(instantiateSignatureInContextOf(signature, contextualSignature, contextualMapper));
                        }
                    }
                }
            }
            if (isConstEnumObjectType(type)) {
                var ok = (node.parent.kind === 142 /* PropertyAccess */ && node.parent.left === node) || (node.parent.kind === 143 /* IndexedAccess */ && node.parent.object === node) || ((node.kind === 63 /* Identifier */ || node.kind === 121 /* QualifiedName */) && isInRightSideOfImportOrExportAssignment(node));
                if (!ok) {
                    error(node, ts.Diagnostics.const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment);
                }
            }
            return type;
        }
        function checkExpressionNode(node, contextualMapper) {
            switch (node.kind) {
                case 63 /* Identifier */:
                    return checkIdentifier(node);
                case 91 /* ThisKeyword */:
                    return checkThisExpression(node);
                case 89 /* SuperKeyword */:
                    return checkSuperExpression(node);
                case 87 /* NullKeyword */:
                    return nullType;
                case 93 /* TrueKeyword */:
                case 78 /* FalseKeyword */:
                    return booleanType;
                case 6 /* NumericLiteral */:
                    return numberType;
                case 155 /* TemplateExpression */:
                    return checkTemplateExpression(node);
                case 7 /* StringLiteral */:
                case 9 /* NoSubstitutionTemplateLiteral */:
                    return stringType;
                case 8 /* RegularExpressionLiteral */:
                    return globalRegExpType;
                case 121 /* QualifiedName */:
                    return checkPropertyAccess(node);
                case 139 /* ArrayLiteral */:
                    return checkArrayLiteral(node, contextualMapper);
                case 140 /* ObjectLiteral */:
                    return checkObjectLiteral(node, contextualMapper);
                case 142 /* PropertyAccess */:
                    return checkPropertyAccess(node);
                case 143 /* IndexedAccess */:
                    return checkIndexedAccess(node);
                case 144 /* CallExpression */:
                case 145 /* NewExpression */:
                    return checkCallExpression(node);
                case 146 /* TaggedTemplateExpression */:
                    return checkTaggedTemplateExpression(node);
                case 147 /* TypeAssertion */:
                    return checkTypeAssertion(node);
                case 148 /* ParenExpression */:
                    return checkExpression(node.expression);
                case 149 /* FunctionExpression */:
                case 150 /* ArrowFunction */:
                    return checkFunctionExpression(node, contextualMapper);
                case 151 /* PrefixOperator */:
                    return checkPrefixExpression(node);
                case 152 /* PostfixOperator */:
                    return checkPostfixExpression(node);
                case 153 /* BinaryExpression */:
                    return checkBinaryExpression(node, contextualMapper);
                case 154 /* ConditionalExpression */:
                    return checkConditionalExpression(node, contextualMapper);
                case 157 /* OmittedExpression */:
                    return undefinedType;
            }
            return unknownType;
        }
        function checkTypeParameter(node) {
            checkSourceElement(node.constraint);
            if (fullTypeCheck) {
                checkTypeParameterHasIllegalReferencesInConstraint(node);
                checkTypeNameIsReserved(node.name, ts.Diagnostics.Type_parameter_name_cannot_be_0);
            }
        }
        function checkParameter(parameterDeclaration) {
            checkVariableDeclaration(parameterDeclaration);
            if (fullTypeCheck) {
                checkCollisionWithIndexVariableInGeneratedCode(parameterDeclaration, parameterDeclaration.name);
                if (parameterDeclaration.flags & (16 /* Public */ | 32 /* Private */ | 64 /* Protected */) && !(parameterDeclaration.parent.kind === 126 /* Constructor */ && parameterDeclaration.parent.body)) {
                    error(parameterDeclaration, ts.Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                }
                if (parameterDeclaration.flags & 8 /* Rest */) {
                    if (!isArrayType(getTypeOfSymbol(parameterDeclaration.symbol))) {
                        error(parameterDeclaration, ts.Diagnostics.A_rest_parameter_must_be_of_an_array_type);
                    }
                }
                else {
                    if (parameterDeclaration.initializer && !parameterDeclaration.parent.body) {
                        error(parameterDeclaration, ts.Diagnostics.A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation);
                    }
                }
            }
            function checkReferencesInInitializer(n) {
                if (n.kind === 63 /* Identifier */) {
                    var referencedSymbol = getNodeLinks(n).resolvedSymbol;
                    if (referencedSymbol && referencedSymbol !== unknownSymbol && getSymbol(parameterDeclaration.parent.locals, referencedSymbol.name, 107455 /* Value */) === referencedSymbol) {
                        if (referencedSymbol.valueDeclaration.kind === 123 /* Parameter */) {
                            if (referencedSymbol.valueDeclaration === parameterDeclaration) {
                                error(n, ts.Diagnostics.Parameter_0_cannot_be_referenced_in_its_initializer, ts.identifierToString(parameterDeclaration.name));
                                return;
                            }
                            var enclosingOrReferencedParameter = ts.forEach(parameterDeclaration.parent.parameters, function (p) { return p === parameterDeclaration || p === referencedSymbol.valueDeclaration ? p : undefined; });
                            if (enclosingOrReferencedParameter === referencedSymbol.valueDeclaration) {
                                return;
                            }
                        }
                        error(n, ts.Diagnostics.Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it, ts.identifierToString(parameterDeclaration.name), ts.identifierToString(n));
                    }
                }
                else {
                    ts.forEachChild(n, checkReferencesInInitializer);
                }
            }
            if (parameterDeclaration.initializer) {
                checkReferencesInInitializer(parameterDeclaration.initializer);
            }
        }
        function checkSignatureDeclaration(node) {
            checkTypeParameters(node.typeParameters);
            ts.forEach(node.parameters, checkParameter);
            if (node.type) {
                checkSourceElement(node.type);
            }
            if (fullTypeCheck) {
                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
                checkCollisionWithArgumentsInGeneratedCode(node);
                if (compilerOptions.noImplicitAny && !node.type) {
                    switch (node.kind) {
                        case 130 /* ConstructSignature */:
                            error(node, ts.Diagnostics.Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                            break;
                        case 129 /* CallSignature */:
                            error(node, ts.Diagnostics.Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                            break;
                    }
                }
            }
            checkSpecializedSignatureDeclaration(node);
        }
        function checkTypeForDuplicateIndexSignatures(node) {
            if (node.kind === 185 /* InterfaceDeclaration */) {
                var nodeSymbol = getSymbolOfNode(node);
                if (nodeSymbol.declarations.length > 0 && nodeSymbol.declarations[0] !== node) {
                    return;
                }
            }
            var indexSymbol = getIndexSymbol(getSymbolOfNode(node));
            if (indexSymbol) {
                var seenNumericIndexer = false;
                var seenStringIndexer = false;
                for (var i = 0, len = indexSymbol.declarations.length; i < len; ++i) {
                    var declaration = indexSymbol.declarations[i];
                    if (declaration.parameters.length == 1 && declaration.parameters[0].type) {
                        switch (declaration.parameters[0].type.kind) {
                            case 118 /* StringKeyword */:
                                if (!seenStringIndexer) {
                                    seenStringIndexer = true;
                                }
                                else {
                                    error(declaration, ts.Diagnostics.Duplicate_string_index_signature);
                                }
                                break;
                            case 116 /* NumberKeyword */:
                                if (!seenNumericIndexer) {
                                    seenNumericIndexer = true;
                                }
                                else {
                                    error(declaration, ts.Diagnostics.Duplicate_number_index_signature);
                                }
                                break;
                        }
                    }
                }
            }
        }
        function checkPropertyDeclaration(node) {
            checkVariableDeclaration(node);
        }
        function checkMethodDeclaration(node) {
            checkFunctionDeclaration(node);
        }
        function checkConstructorDeclaration(node) {
            checkSignatureDeclaration(node);
            checkSourceElement(node.body);
            var symbol = getSymbolOfNode(node);
            var firstDeclaration = getDeclarationOfKind(symbol, node.kind);
            if (node === firstDeclaration) {
                checkFunctionOrConstructorSymbol(symbol);
            }
            if (!node.body) {
                return;
            }
            if (!fullTypeCheck) {
                return;
            }
            function isSuperCallExpression(n) {
                return n.kind === 144 /* CallExpression */ && n.func.kind === 89 /* SuperKeyword */;
            }
            function containsSuperCall(n) {
                if (isSuperCallExpression(n)) {
                    return true;
                }
                switch (n.kind) {
                    case 149 /* FunctionExpression */:
                    case 182 /* FunctionDeclaration */:
                    case 150 /* ArrowFunction */:
                    case 140 /* ObjectLiteral */: return false;
                    default: return ts.forEachChild(n, containsSuperCall);
                }
            }
            function markThisReferencesAsErrors(n) {
                if (n.kind === 91 /* ThisKeyword */) {
                    error(n, ts.Diagnostics.this_cannot_be_referenced_in_current_location);
                }
                else if (n.kind !== 149 /* FunctionExpression */ && n.kind !== 182 /* FunctionDeclaration */) {
                    ts.forEachChild(n, markThisReferencesAsErrors);
                }
            }
            function isInstancePropertyWithInitializer(n) {
                return n.kind === 124 /* Property */ && !(n.flags & 128 /* Static */) && !!n.initializer;
            }
            if (node.parent.baseType) {
                if (containsSuperCall(node.body)) {
                    var superCallShouldBeFirst = ts.forEach(node.parent.members, isInstancePropertyWithInitializer) || ts.forEach(node.parameters, function (p) { return p.flags & (16 /* Public */ | 32 /* Private */ | 64 /* Protected */); });
                    if (superCallShouldBeFirst) {
                        var statements = node.body.statements;
                        if (!statements.length || statements[0].kind !== 161 /* ExpressionStatement */ || !isSuperCallExpression(statements[0].expression)) {
                            error(node, ts.Diagnostics.A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties);
                        }
                        else {
                            markThisReferencesAsErrors(statements[0].expression);
                        }
                    }
                }
                else {
                    error(node, ts.Diagnostics.Constructors_for_derived_classes_must_contain_a_super_call);
                }
            }
        }
        function checkAccessorDeclaration(node) {
            if (fullTypeCheck) {
                if (node.kind === 127 /* GetAccessor */) {
                    if (!ts.isInAmbientContext(node) && node.body && !(bodyContainsAReturnStatement(node.body) || bodyContainsSingleThrowStatement(node.body))) {
                        error(node.name, ts.Diagnostics.A_get_accessor_must_return_a_value_or_consist_of_a_single_throw_statement);
                    }
                }
                var otherKind = node.kind === 127 /* GetAccessor */ ? 128 /* SetAccessor */ : 127 /* GetAccessor */;
                var otherAccessor = getDeclarationOfKind(node.symbol, otherKind);
                if (otherAccessor) {
                    if (((node.flags & 112 /* AccessibilityModifier */) !== (otherAccessor.flags & 112 /* AccessibilityModifier */))) {
                        error(node.name, ts.Diagnostics.Getter_and_setter_accessors_do_not_agree_in_visibility);
                    }
                    var thisType = getAnnotatedAccessorType(node);
                    var otherType = getAnnotatedAccessorType(otherAccessor);
                    if (thisType && otherType) {
                        if (!isTypeIdenticalTo(thisType, otherType)) {
                            error(node, ts.Diagnostics.get_and_set_accessor_must_have_the_same_type);
                        }
                    }
                }
            }
            checkFunctionDeclaration(node);
            checkAndStoreTypeOfAccessors(getSymbolOfNode(node));
        }
        function checkTypeReference(node) {
            var type = getTypeFromTypeReferenceNode(node);
            if (type !== unknownType && node.typeArguments) {
                var len = node.typeArguments.length;
                for (var i = 0; i < len; i++) {
                    checkSourceElement(node.typeArguments[i]);
                    var constraint = getConstraintOfTypeParameter(type.target.typeParameters[i]);
                    if (fullTypeCheck && constraint) {
                        var typeArgument = type.typeArguments[i];
                        checkTypeAssignableTo(typeArgument, constraint, node, ts.Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
            }
        }
        function checkTypeQuery(node) {
            getTypeFromTypeQueryNode(node);
        }
        function checkTypeLiteral(node) {
            ts.forEach(node.members, checkSourceElement);
            if (fullTypeCheck) {
                var type = getTypeFromTypeLiteralNode(node);
                checkIndexConstraints(type);
                checkTypeForDuplicateIndexSignatures(node);
            }
        }
        function checkArrayType(node) {
            checkSourceElement(node.elementType);
        }
        function checkTupleType(node) {
            ts.forEach(node.elementTypes, checkSourceElement);
        }
        function checkUnionType(node) {
            ts.forEach(node.types, checkSourceElement);
        }
        function isPrivateWithinAmbient(node) {
            return (node.flags & 32 /* Private */) && ts.isInAmbientContext(node);
        }
        function checkSpecializedSignatureDeclaration(signatureDeclarationNode) {
            if (!fullTypeCheck) {
                return;
            }
            var signature = getSignatureFromDeclaration(signatureDeclarationNode);
            if (!signature.hasStringLiterals) {
                return;
            }
            if (signatureDeclarationNode.body) {
                error(signatureDeclarationNode, ts.Diagnostics.A_signature_with_an_implementation_cannot_use_a_string_literal_type);
                return;
            }
            var symbol = getSymbolOfNode(signatureDeclarationNode);
            var signaturesToCheck;
            if (!signatureDeclarationNode.name && signatureDeclarationNode.parent && signatureDeclarationNode.parent.kind === 185 /* InterfaceDeclaration */) {
                ts.Debug.assert(signatureDeclarationNode.kind === 129 /* CallSignature */ || signatureDeclarationNode.kind === 130 /* ConstructSignature */);
                var signatureKind = signatureDeclarationNode.kind === 129 /* CallSignature */ ? 0 /* Call */ : 1 /* Construct */;
                var containingSymbol = getSymbolOfNode(signatureDeclarationNode.parent);
                var containingType = getDeclaredTypeOfSymbol(containingSymbol);
                signaturesToCheck = getSignaturesOfType(containingType, signatureKind);
            }
            else {
                signaturesToCheck = getSignaturesOfSymbol(getSymbolOfNode(signatureDeclarationNode));
            }
            for (var i = 0; i < signaturesToCheck.length; i++) {
                var otherSignature = signaturesToCheck[i];
                if (!otherSignature.hasStringLiterals && isSignatureAssignableTo(signature, otherSignature)) {
                    return;
                }
            }
            error(signatureDeclarationNode, ts.Diagnostics.Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature);
        }
        function getEffectiveDeclarationFlags(n, flagsToCheck) {
            var flags = n.flags;
            if (n.parent.kind !== 185 /* InterfaceDeclaration */ && ts.isInAmbientContext(n)) {
                if (!(flags & 2 /* Ambient */)) {
                    flags |= 1 /* Export */;
                }
                flags |= 2 /* Ambient */;
            }
            return flags & flagsToCheck;
        }
        function checkFunctionOrConstructorSymbol(symbol) {
            if (!fullTypeCheck) {
                return;
            }
            function checkFlagAgreementBetweenOverloads(overloads, implementation, flagsToCheck, someOverloadFlags, allOverloadFlags) {
                var someButNotAllOverloadFlags = someOverloadFlags ^ allOverloadFlags;
                if (someButNotAllOverloadFlags !== 0) {
                    var implementationSharesContainerWithFirstOverload = implementation !== undefined && implementation.parent === overloads[0].parent;
                    var canonicalFlags = implementationSharesContainerWithFirstOverload ? getEffectiveDeclarationFlags(implementation, flagsToCheck) : getEffectiveDeclarationFlags(overloads[0], flagsToCheck);
                    ts.forEach(overloads, function (o) {
                        var deviation = getEffectiveDeclarationFlags(o, flagsToCheck) ^ canonicalFlags;
                        if (deviation & 1 /* Export */) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_exported_or_not_exported);
                        }
                        else if (deviation & 2 /* Ambient */) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_ambient_or_non_ambient);
                        }
                        else if (deviation & (32 /* Private */ | 64 /* Protected */)) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_public_private_or_protected);
                        }
                        else if (deviation & 4 /* QuestionMark */) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_optional_or_required);
                        }
                    });
                }
            }
            var flagsToCheck = 1 /* Export */ | 2 /* Ambient */ | 32 /* Private */ | 64 /* Protected */ | 4 /* QuestionMark */;
            var someNodeFlags = 0;
            var allNodeFlags = flagsToCheck;
            var hasOverloads = false;
            var bodyDeclaration;
            var lastSeenNonAmbientDeclaration;
            var previousDeclaration;
            var declarations = symbol.declarations;
            var isConstructor = (symbol.flags & 16384 /* Constructor */) !== 0;
            function reportImplementationExpectedError(node) {
                if (node.name && node.name.kind === 120 /* Missing */) {
                    return;
                }
                var seen = false;
                var subsequentNode = ts.forEachChild(node.parent, function (c) {
                    if (seen) {
                        return c;
                    }
                    else {
                        seen = c === node;
                    }
                });
                if (subsequentNode) {
                    if (subsequentNode.kind === node.kind) {
                        var errorNode = subsequentNode.name || subsequentNode;
                        if (node.name && subsequentNode.name && node.name.text === subsequentNode.name.text) {
                            ts.Debug.assert(node.kind === 125 /* Method */);
                            ts.Debug.assert((node.flags & 128 /* Static */) !== (subsequentNode.flags & 128 /* Static */));
                            var diagnostic = node.flags & 128 /* Static */ ? ts.Diagnostics.Function_overload_must_be_static : ts.Diagnostics.Function_overload_must_not_be_static;
                            error(errorNode, diagnostic);
                            return;
                        }
                        else if (subsequentNode.body) {
                            error(errorNode, ts.Diagnostics.Function_implementation_name_must_be_0, ts.identifierToString(node.name));
                            return;
                        }
                    }
                }
                var errorNode = node.name || node;
                if (isConstructor) {
                    error(errorNode, ts.Diagnostics.Constructor_implementation_is_missing);
                }
                else {
                    error(errorNode, ts.Diagnostics.Function_implementation_is_missing_or_not_immediately_following_the_declaration);
                }
            }
            var isExportSymbolInsideModule = symbol.parent && symbol.parent.flags & 1536 /* Module */;
            var duplicateFunctionDeclaration = false;
            var multipleConstructorImplementation = false;
            for (var i = 0; i < declarations.length; i++) {
                var node = declarations[i];
                var inAmbientContext = ts.isInAmbientContext(node);
                var inAmbientContextOrInterface = node.parent.kind === 185 /* InterfaceDeclaration */ || node.parent.kind === 134 /* TypeLiteral */ || inAmbientContext;
                if (inAmbientContextOrInterface) {
                    previousDeclaration = undefined;
                }
                if (node.kind === 182 /* FunctionDeclaration */ || node.kind === 125 /* Method */ || node.kind === 126 /* Constructor */) {
                    var currentNodeFlags = getEffectiveDeclarationFlags(node, flagsToCheck);
                    someNodeFlags |= currentNodeFlags;
                    allNodeFlags &= currentNodeFlags;
                    if (node.body && bodyDeclaration) {
                        if (isConstructor) {
                            multipleConstructorImplementation = true;
                        }
                        else {
                            duplicateFunctionDeclaration = true;
                        }
                    }
                    else if (!isExportSymbolInsideModule && previousDeclaration && previousDeclaration.parent === node.parent && previousDeclaration.end !== node.pos) {
                        reportImplementationExpectedError(previousDeclaration);
                    }
                    if (node.body) {
                        if (!bodyDeclaration) {
                            bodyDeclaration = node;
                        }
                    }
                    else {
                        hasOverloads = true;
                    }
                    previousDeclaration = node;
                    if (!inAmbientContextOrInterface) {
                        lastSeenNonAmbientDeclaration = node;
                    }
                }
            }
            if (multipleConstructorImplementation) {
                ts.forEach(declarations, function (declaration) {
                    error(declaration, ts.Diagnostics.Multiple_constructor_implementations_are_not_allowed);
                });
            }
            if (duplicateFunctionDeclaration) {
                ts.forEach(declarations, function (declaration) {
                    error(declaration.name, ts.Diagnostics.Duplicate_function_implementation);
                });
            }
            if (!isExportSymbolInsideModule && lastSeenNonAmbientDeclaration && !lastSeenNonAmbientDeclaration.body) {
                reportImplementationExpectedError(lastSeenNonAmbientDeclaration);
            }
            if (hasOverloads) {
                checkFlagAgreementBetweenOverloads(declarations, bodyDeclaration, flagsToCheck, someNodeFlags, allNodeFlags);
                if (bodyDeclaration) {
                    var signatures = getSignaturesOfSymbol(symbol);
                    var bodySignature = getSignatureFromDeclaration(bodyDeclaration);
                    if (!bodySignature.hasStringLiterals) {
                        for (var i = 0, len = signatures.length; i < len; ++i) {
                            if (!signatures[i].hasStringLiterals && !isSignatureAssignableTo(bodySignature, signatures[i])) {
                                error(signatures[i].declaration, ts.Diagnostics.Overload_signature_is_not_compatible_with_function_implementation);
                                break;
                            }
                        }
                    }
                }
            }
        }
        function checkExportsOnMergedDeclarations(node) {
            if (!fullTypeCheck) {
                return;
            }
            var symbol;
            var symbol = node.localSymbol;
            if (!symbol) {
                symbol = getSymbolOfNode(node);
                if (!(symbol.flags & 29360128 /* Export */)) {
                    return;
                }
            }
            if (getDeclarationOfKind(symbol, node.kind) !== node) {
                return;
            }
            var exportedDeclarationSpaces = 0;
            var nonExportedDeclarationSpaces = 0;
            ts.forEach(symbol.declarations, function (d) {
                var declarationSpaces = getDeclarationSpaces(d);
                if (getEffectiveDeclarationFlags(d, 1 /* Export */)) {
                    exportedDeclarationSpaces |= declarationSpaces;
                }
                else {
                    nonExportedDeclarationSpaces |= declarationSpaces;
                }
            });
            var commonDeclarationSpace = exportedDeclarationSpaces & nonExportedDeclarationSpaces;
            if (commonDeclarationSpace) {
                ts.forEach(symbol.declarations, function (d) {
                    if (getDeclarationSpaces(d) & commonDeclarationSpace) {
                        error(d.name, ts.Diagnostics.Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local, ts.identifierToString(d.name));
                    }
                });
            }
            function getDeclarationSpaces(d) {
                switch (d.kind) {
                    case 185 /* InterfaceDeclaration */:
                        return 8388608 /* ExportType */;
                    case 188 /* ModuleDeclaration */:
                        return d.name.kind === 7 /* StringLiteral */ || ts.getModuleInstanceState(d) !== 0 /* NonInstantiated */ ? 16777216 /* ExportNamespace */ | 4194304 /* ExportValue */ : 16777216 /* ExportNamespace */;
                    case 184 /* ClassDeclaration */:
                    case 187 /* EnumDeclaration */:
                        return 8388608 /* ExportType */ | 4194304 /* ExportValue */;
                    case 190 /* ImportDeclaration */:
                        var result = 0;
                        var target = resolveImport(getSymbolOfNode(d));
                        ts.forEach(target.declarations, function (d) {
                            result |= getDeclarationSpaces(d);
                        });
                        return result;
                    default:
                        return 4194304 /* ExportValue */;
                }
            }
        }
        function checkFunctionDeclaration(node) {
            checkSignatureDeclaration(node);
            var symbol = getSymbolOfNode(node);
            var localSymbol = node.localSymbol || symbol;
            var firstDeclaration = getDeclarationOfKind(localSymbol, node.kind);
            if (node === firstDeclaration) {
                checkFunctionOrConstructorSymbol(localSymbol);
            }
            if (symbol.parent) {
                if (getDeclarationOfKind(symbol, node.kind) === node) {
                    checkFunctionOrConstructorSymbol(symbol);
                }
            }
            checkSourceElement(node.body);
            if (node.type && !isAccessor(node.kind)) {
                checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(node, getTypeFromTypeNode(node.type));
            }
            if (fullTypeCheck && compilerOptions.noImplicitAny && !node.body && !node.type) {
                if (!isPrivateWithinAmbient(node)) {
                    var typeName = typeToString(anyType);
                    if (node.name) {
                        error(node, ts.Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type, ts.identifierToString(node.name), typeName);
                    }
                    else {
                        error(node, ts.Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeName);
                    }
                }
            }
        }
        function checkBlock(node) {
            ts.forEach(node.statements, checkSourceElement);
        }
        function checkCollisionWithArgumentsInGeneratedCode(node) {
            if (!ts.hasRestParameters(node) || ts.isInAmbientContext(node) || !node.body) {
                return;
            }
            ts.forEach(node.parameters, function (p) {
                if (p.name && p.name.text === argumentsSymbol.name) {
                    error(p, ts.Diagnostics.Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters);
                }
            });
        }
        function checkCollisionWithIndexVariableInGeneratedCode(node, name) {
            if (!(name && name.text === "_i")) {
                return;
            }
            if (node.kind === 123 /* Parameter */) {
                if (node.parent.body && ts.hasRestParameters(node.parent) && !ts.isInAmbientContext(node)) {
                    error(node, ts.Diagnostics.Duplicate_identifier_i_Compiler_uses_i_to_initialize_rest_parameter);
                }
                return;
            }
            var symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol === unknownSymbol) {
                return;
            }
            var current = node;
            while (current) {
                var definedOnCurrentLevel = ts.forEach(symbol.declarations, function (d) { return d.parent === current ? d : undefined; });
                if (definedOnCurrentLevel) {
                    return;
                }
                switch (current.kind) {
                    case 182 /* FunctionDeclaration */:
                    case 149 /* FunctionExpression */:
                    case 125 /* Method */:
                    case 150 /* ArrowFunction */:
                    case 126 /* Constructor */:
                        if (ts.hasRestParameters(current)) {
                            error(node, ts.Diagnostics.Expression_resolves_to_variable_declaration_i_that_compiler_uses_to_initialize_rest_parameter);
                            return;
                        }
                        break;
                }
                current = current.parent;
            }
        }
        function needCollisionCheckForIdentifier(node, identifier, name) {
            if (!(identifier && identifier.text === name)) {
                return false;
            }
            if (node.kind === 124 /* Property */ || node.kind === 125 /* Method */ || node.kind === 127 /* GetAccessor */ || node.kind === 128 /* SetAccessor */) {
                return false;
            }
            if (ts.isInAmbientContext(node)) {
                return false;
            }
            if (node.kind === 123 /* Parameter */ && !node.parent.body) {
                return false;
            }
            return true;
        }
        function checkCollisionWithCapturedThisVariable(node, name) {
            if (!needCollisionCheckForIdentifier(node, name, "_this")) {
                return;
            }
            potentialThisCollisions.push(node);
        }
        function checkIfThisIsCapturedInEnclosingScope(node) {
            var current = node;
            while (current) {
                if (getNodeCheckFlags(current) & 4 /* CaptureThis */) {
                    var isDeclaration = node.kind !== 63 /* Identifier */;
                    if (isDeclaration) {
                        error(node.name, ts.Diagnostics.Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference);
                    }
                    else {
                        error(node, ts.Diagnostics.Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference);
                    }
                    return;
                }
                current = current.parent;
            }
        }
        function checkCollisionWithCapturedSuperVariable(node, name) {
            if (!needCollisionCheckForIdentifier(node, name, "_super")) {
                return;
            }
            var enclosingClass = ts.getAncestor(node, 184 /* ClassDeclaration */);
            if (!enclosingClass || ts.isInAmbientContext(enclosingClass)) {
                return;
            }
            if (enclosingClass.baseType) {
                var isDeclaration = node.kind !== 63 /* Identifier */;
                if (isDeclaration) {
                    error(node, ts.Diagnostics.Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference);
                }
                else {
                    error(node, ts.Diagnostics.Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference);
                }
            }
        }
        function checkCollisionWithRequireExportsInGeneratedCode(node, name) {
            if (!needCollisionCheckForIdentifier(node, name, "require") && !needCollisionCheckForIdentifier(node, name, "exports")) {
                return;
            }
            if (node.kind === 188 /* ModuleDeclaration */ && ts.getModuleInstanceState(node) !== 1 /* Instantiated */) {
                return;
            }
            var parent = node.kind === 181 /* VariableDeclaration */ ? node.parent.parent : node.parent;
            if (parent.kind === 193 /* SourceFile */ && ts.isExternalModule(parent)) {
                error(name, ts.Diagnostics.Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_an_external_module, name.text, name.text);
            }
        }
        function checkCollisionWithConstDeclarations(node) {
            if (node.initializer && (node.flags & 6144 /* BlockScoped */) === 0) {
                var symbol = getSymbolOfNode(node);
                if (symbol.flags & 1 /* FunctionScopedVariable */) {
                    var localDeclarationSymbol = resolveName(node, node.name.text, 3 /* Variable */, undefined, undefined);
                    if (localDeclarationSymbol && localDeclarationSymbol !== symbol && localDeclarationSymbol.flags & 2 /* BlockScopedVariable */) {
                        if (getDeclarationFlagsFromSymbol(localDeclarationSymbol) & 4096 /* Const */) {
                            error(node, ts.Diagnostics.Cannot_redeclare_block_scoped_variable_0, symbolToString(localDeclarationSymbol));
                        }
                    }
                }
            }
        }
        function checkVariableDeclaration(node) {
            checkSourceElement(node.type);
            checkExportsOnMergedDeclarations(node);
            if (fullTypeCheck) {
                var symbol = getSymbolOfNode(node);
                var typeOfValueDeclaration = getTypeOfVariableOrParameterOrProperty(symbol);
                var type;
                var useTypeFromValueDeclaration = node === symbol.valueDeclaration;
                if (useTypeFromValueDeclaration) {
                    type = typeOfValueDeclaration;
                }
                else {
                    type = getTypeOfVariableDeclaration(node);
                }
                if (node.initializer) {
                    if (!(getNodeLinks(node.initializer).flags & 1 /* TypeChecked */)) {
                        checkTypeAssignableTo(checkAndMarkExpression(node.initializer), type, node, undefined);
                    }
                    checkCollisionWithConstDeclarations(node);
                }
                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
                if (!useTypeFromValueDeclaration) {
                    if (typeOfValueDeclaration !== unknownType && type !== unknownType && !isTypeIdenticalTo(typeOfValueDeclaration, type)) {
                        error(node.name, ts.Diagnostics.Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2, ts.identifierToString(node.name), typeToString(typeOfValueDeclaration), typeToString(type));
                    }
                }
            }
        }
        function checkVariableStatement(node) {
            ts.forEach(node.declarations, checkVariableDeclaration);
        }
        function checkExpressionStatement(node) {
            checkExpression(node.expression);
        }
        function checkIfStatement(node) {
            checkExpression(node.expression);
            checkSourceElement(node.thenStatement);
            checkSourceElement(node.elseStatement);
        }
        function checkDoStatement(node) {
            checkSourceElement(node.statement);
            checkExpression(node.expression);
        }
        function checkWhileStatement(node) {
            checkExpression(node.expression);
            checkSourceElement(node.statement);
        }
        function checkForStatement(node) {
            if (node.declarations)
                ts.forEach(node.declarations, checkVariableDeclaration);
            if (node.initializer)
                checkExpression(node.initializer);
            if (node.condition)
                checkExpression(node.condition);
            if (node.iterator)
                checkExpression(node.iterator);
            checkSourceElement(node.statement);
        }
        function checkForInStatement(node) {
            if (node.declaration) {
                checkVariableDeclaration(node.declaration);
                if (node.declaration.type) {
                    error(node.declaration, ts.Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation);
                }
            }
            if (node.variable) {
                var exprType = checkExpression(node.variable);
                if (exprType !== anyType && exprType !== stringType) {
                    error(node.variable, ts.Diagnostics.The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any);
                }
                else {
                    checkReferenceExpression(node.variable, ts.Diagnostics.Invalid_left_hand_side_in_for_in_statement, ts.Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant);
                }
            }
            var exprType = checkExpression(node.expression);
            if (!isStructuredType(exprType) && exprType !== unknownType) {
                error(node.expression, ts.Diagnostics.The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            checkSourceElement(node.statement);
        }
        function checkBreakOrContinueStatement(node) {
        }
        function checkReturnStatement(node) {
            if (node.expression && !(getNodeLinks(node.expression).flags & 1 /* TypeChecked */)) {
                var func = ts.getContainingFunction(node);
                if (func) {
                    if (func.kind === 128 /* SetAccessor */) {
                        if (node.expression) {
                            error(node.expression, ts.Diagnostics.Setters_cannot_return_a_value);
                        }
                    }
                    else {
                        var returnType = getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                        var checkAssignability = func.type || (func.kind === 127 /* GetAccessor */ && getSetAccessorTypeAnnotationNode(getDeclarationOfKind(func.symbol, 128 /* SetAccessor */)));
                        if (checkAssignability) {
                            checkTypeAssignableTo(checkExpression(node.expression), returnType, node.expression, undefined);
                        }
                        else if (func.kind == 126 /* Constructor */) {
                            if (!isTypeAssignableTo(checkExpression(node.expression), returnType)) {
                                error(node.expression, ts.Diagnostics.Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class);
                            }
                        }
                    }
                }
            }
        }
        function checkWithStatement(node) {
            checkExpression(node.expression);
            error(node.expression, ts.Diagnostics.All_symbols_within_a_with_block_will_be_resolved_to_any);
        }
        function checkSwitchStatement(node) {
            var expressionType = checkExpression(node.expression);
            ts.forEach(node.clauses, function (clause) {
                if (fullTypeCheck && clause.expression) {
                    var caseType = checkExpression(clause.expression);
                    if (!isTypeAssignableTo(expressionType, caseType)) {
                        checkTypeAssignableTo(caseType, expressionType, clause.expression, undefined);
                    }
                }
                checkBlock(clause);
            });
        }
        function checkLabeledStatement(node) {
            checkSourceElement(node.statement);
        }
        function checkThrowStatement(node) {
            checkExpression(node.expression);
        }
        function checkTryStatement(node) {
            checkBlock(node.tryBlock);
            if (node.catchBlock)
                checkBlock(node.catchBlock);
            if (node.finallyBlock)
                checkBlock(node.finallyBlock);
        }
        function checkIndexConstraints(type) {
            function checkIndexConstraintForProperty(prop, propertyType, indexDeclaration, indexType, indexKind) {
                if (!indexType) {
                    return;
                }
                if (indexKind === 1 /* Number */ && !isNumericName(prop.name)) {
                    return;
                }
                var errorNode;
                if (prop.parent === type.symbol) {
                    errorNode = prop.valueDeclaration;
                }
                else if (indexDeclaration) {
                    errorNode = indexDeclaration;
                }
                else if (type.flags & 2048 /* Interface */) {
                    var someBaseClassHasBothPropertyAndIndexer = ts.forEach(type.baseTypes, function (base) { return getPropertyOfObjectType(base, prop.name) && getIndexTypeOfType(base, indexKind); });
                    errorNode = someBaseClassHasBothPropertyAndIndexer ? undefined : type.symbol.declarations[0];
                }
                if (errorNode && !isTypeAssignableTo(propertyType, indexType)) {
                    var errorMessage = indexKind === 0 /* String */ ? ts.Diagnostics.Property_0_of_type_1_is_not_assignable_to_string_index_type_2 : ts.Diagnostics.Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2;
                    error(errorNode, errorMessage, symbolToString(prop), typeToString(propertyType), typeToString(indexType));
                }
            }
            var declaredNumberIndexer = getIndexDeclarationOfSymbol(type.symbol, 1 /* Number */);
            var declaredStringIndexer = getIndexDeclarationOfSymbol(type.symbol, 0 /* String */);
            var stringIndexType = getIndexTypeOfType(type, 0 /* String */);
            var numberIndexType = getIndexTypeOfType(type, 1 /* Number */);
            if (stringIndexType || numberIndexType) {
                ts.forEach(getPropertiesOfObjectType(type), function (prop) {
                    var propType = getTypeOfSymbol(prop);
                    checkIndexConstraintForProperty(prop, propType, declaredStringIndexer, stringIndexType, 0 /* String */);
                    checkIndexConstraintForProperty(prop, propType, declaredNumberIndexer, numberIndexType, 1 /* Number */);
                });
            }
            var errorNode;
            if (stringIndexType && numberIndexType) {
                errorNode = declaredNumberIndexer || declaredStringIndexer;
                if (!errorNode && (type.flags & 2048 /* Interface */)) {
                    var someBaseTypeHasBothIndexers = ts.forEach(type.baseTypes, function (base) { return getIndexTypeOfType(base, 0 /* String */) && getIndexTypeOfType(base, 1 /* Number */); });
                    errorNode = someBaseTypeHasBothIndexers ? undefined : type.symbol.declarations[0];
                }
            }
            if (errorNode && !isTypeAssignableTo(numberIndexType, stringIndexType)) {
                error(errorNode, ts.Diagnostics.Numeric_index_type_0_is_not_assignable_to_string_index_type_1, typeToString(numberIndexType), typeToString(stringIndexType));
            }
        }
        function checkTypeNameIsReserved(name, message) {
            switch (name.text) {
                case "any":
                case "number":
                case "boolean":
                case "string":
                case "void":
                    error(name, message, name.text);
            }
        }
        function checkTypeParameters(typeParameterDeclarations) {
            if (typeParameterDeclarations) {
                for (var i = 0; i < typeParameterDeclarations.length; i++) {
                    var node = typeParameterDeclarations[i];
                    checkTypeParameter(node);
                    if (fullTypeCheck) {
                        for (var j = 0; j < i; j++) {
                            if (typeParameterDeclarations[j].symbol === node.symbol) {
                                error(node.name, ts.Diagnostics.Duplicate_identifier_0, ts.identifierToString(node.name));
                            }
                        }
                    }
                }
            }
        }
        function checkClassDeclaration(node) {
            checkTypeNameIsReserved(node.name, ts.Diagnostics.Class_name_cannot_be_0);
            checkTypeParameters(node.typeParameters);
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            checkExportsOnMergedDeclarations(node);
            var symbol = getSymbolOfNode(node);
            var type = getDeclaredTypeOfSymbol(symbol);
            var staticType = getTypeOfSymbol(symbol);
            if (node.baseType) {
                emitExtends = emitExtends || !ts.isInAmbientContext(node);
                checkTypeReference(node.baseType);
            }
            if (type.baseTypes.length) {
                if (fullTypeCheck) {
                    var baseType = type.baseTypes[0];
                    checkTypeAssignableTo(type, baseType, node.name, ts.Diagnostics.Class_0_incorrectly_extends_base_class_1);
                    var staticBaseType = getTypeOfSymbol(baseType.symbol);
                    checkTypeAssignableTo(staticType, getTypeWithoutConstructors(staticBaseType), node.name, ts.Diagnostics.Class_static_side_0_incorrectly_extends_base_class_static_side_1);
                    if (baseType.symbol !== resolveEntityName(node, node.baseType.typeName, 107455 /* Value */)) {
                        error(node.baseType, ts.Diagnostics.Type_name_0_in_extends_clause_does_not_reference_constructor_function_for_0, typeToString(baseType));
                    }
                    checkKindsOfPropertyMemberOverrides(type, baseType);
                }
                checkExpression(node.baseType.typeName);
            }
            if (node.implementedTypes) {
                ts.forEach(node.implementedTypes, function (typeRefNode) {
                    checkTypeReference(typeRefNode);
                    if (fullTypeCheck) {
                        var t = getTypeFromTypeReferenceNode(typeRefNode);
                        if (t !== unknownType) {
                            var declaredType = (t.flags & 4096 /* Reference */) ? t.target : t;
                            if (declaredType.flags & (1024 /* Class */ | 2048 /* Interface */)) {
                                checkTypeAssignableTo(type, t, node.name, ts.Diagnostics.Class_0_incorrectly_implements_interface_1);
                            }
                            else {
                                error(typeRefNode, ts.Diagnostics.A_class_may_only_implement_another_class_or_interface);
                            }
                        }
                    }
                });
            }
            ts.forEach(node.members, checkSourceElement);
            if (fullTypeCheck) {
                checkIndexConstraints(type);
                checkTypeForDuplicateIndexSignatures(node);
            }
        }
        function getTargetSymbol(s) {
            return s.flags & 67108864 /* Instantiated */ ? getSymbolLinks(s).target : s;
        }
        function checkKindsOfPropertyMemberOverrides(type, baseType) {
            var baseProperties = getPropertiesOfObjectType(baseType);
            for (var i = 0, len = baseProperties.length; i < len; ++i) {
                var base = getTargetSymbol(baseProperties[i]);
                if (base.flags & 536870912 /* Prototype */) {
                    continue;
                }
                var derived = getTargetSymbol(getPropertyOfObjectType(type, base.name));
                if (derived) {
                    var baseDeclarationFlags = getDeclarationFlagsFromSymbol(base);
                    var derivedDeclarationFlags = getDeclarationFlagsFromSymbol(derived);
                    if ((baseDeclarationFlags & 32 /* Private */) || (derivedDeclarationFlags & 32 /* Private */)) {
                        continue;
                    }
                    if ((baseDeclarationFlags & 128 /* Static */) !== (derivedDeclarationFlags & 128 /* Static */)) {
                        continue;
                    }
                    if ((base.flags & derived.flags & 8192 /* Method */) || ((base.flags & 98308 /* PropertyOrAccessor */) && (derived.flags & 98308 /* PropertyOrAccessor */))) {
                        continue;
                    }
                    var errorMessage;
                    if (base.flags & 8192 /* Method */) {
                        if (derived.flags & 98304 /* Accessor */) {
                            errorMessage = ts.Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor;
                        }
                        else {
                            ts.Debug.assert((derived.flags & 4 /* Property */) !== 0);
                            errorMessage = ts.Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property;
                        }
                    }
                    else if (base.flags & 4 /* Property */) {
                        ts.Debug.assert((derived.flags & 8192 /* Method */) !== 0);
                        errorMessage = ts.Diagnostics.Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function;
                    }
                    else {
                        ts.Debug.assert((base.flags & 98304 /* Accessor */) !== 0);
                        ts.Debug.assert((derived.flags & 8192 /* Method */) !== 0);
                        errorMessage = ts.Diagnostics.Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function;
                    }
                    error(derived.valueDeclaration.name, errorMessage, typeToString(baseType), symbolToString(base), typeToString(type));
                }
            }
        }
        function isAccessor(kind) {
            return kind === 127 /* GetAccessor */ || kind === 128 /* SetAccessor */;
        }
        function areTypeParametersIdentical(list1, list2) {
            if (!list1 && !list2) {
                return true;
            }
            if (!list1 || !list2 || list1.length !== list2.length) {
                return false;
            }
            for (var i = 0, len = list1.length; i < len; i++) {
                var tp1 = list1[i];
                var tp2 = list2[i];
                if (tp1.name.text !== tp2.name.text) {
                    return false;
                }
                if (!tp1.constraint && !tp2.constraint) {
                    continue;
                }
                if (!tp1.constraint || !tp2.constraint) {
                    return false;
                }
                if (!isTypeIdenticalTo(getTypeFromTypeNode(tp1.constraint), getTypeFromTypeNode(tp2.constraint))) {
                    return false;
                }
            }
            return true;
        }
        function checkInheritedPropertiesAreIdentical(type, typeNode) {
            if (!type.baseTypes.length || type.baseTypes.length === 1) {
                return true;
            }
            var seen = {};
            ts.forEach(type.declaredProperties, function (p) {
                seen[p.name] = { prop: p, containingType: type };
            });
            var ok = true;
            for (var i = 0, len = type.baseTypes.length; i < len; ++i) {
                var base = type.baseTypes[i];
                var properties = getPropertiesOfObjectType(base);
                for (var j = 0, proplen = properties.length; j < proplen; ++j) {
                    var prop = properties[j];
                    if (!ts.hasProperty(seen, prop.name)) {
                        seen[prop.name] = { prop: prop, containingType: base };
                    }
                    else {
                        var existing = seen[prop.name];
                        var isInheritedProperty = existing.containingType !== type;
                        if (isInheritedProperty && !isPropertyIdenticalTo(existing.prop, prop)) {
                            ok = false;
                            var typeName1 = typeToString(existing.containingType);
                            var typeName2 = typeToString(base);
                            var errorInfo = ts.chainDiagnosticMessages(undefined, ts.Diagnostics.Named_properties_0_of_types_1_and_2_are_not_identical, prop.name, typeName1, typeName2);
                            errorInfo = ts.chainDiagnosticMessages(errorInfo, ts.Diagnostics.Interface_0_cannot_simultaneously_extend_types_1_and_2, typeToString(type), typeName1, typeName2);
                            addDiagnostic(ts.createDiagnosticForNodeFromMessageChain(typeNode, errorInfo, program.getCompilerHost().getNewLine()));
                        }
                    }
                }
            }
            return ok;
        }
        function checkInterfaceDeclaration(node) {
            checkTypeParameters(node.typeParameters);
            if (fullTypeCheck) {
                checkTypeNameIsReserved(node.name, ts.Diagnostics.Interface_name_cannot_be_0);
                checkExportsOnMergedDeclarations(node);
                var symbol = getSymbolOfNode(node);
                var firstInterfaceDecl = getDeclarationOfKind(symbol, 185 /* InterfaceDeclaration */);
                if (symbol.declarations.length > 1) {
                    if (node !== firstInterfaceDecl && !areTypeParametersIdentical(firstInterfaceDecl.typeParameters, node.typeParameters)) {
                        error(node.name, ts.Diagnostics.All_declarations_of_an_interface_must_have_identical_type_parameters);
                    }
                }
                if (node === firstInterfaceDecl) {
                    var type = getDeclaredTypeOfSymbol(symbol);
                    if (checkInheritedPropertiesAreIdentical(type, node.name)) {
                        ts.forEach(type.baseTypes, function (baseType) {
                            checkTypeAssignableTo(type, baseType, node.name, ts.Diagnostics.Interface_0_incorrectly_extends_interface_1);
                        });
                        checkIndexConstraints(type);
                    }
                }
            }
            ts.forEach(node.baseTypes, checkTypeReference);
            ts.forEach(node.members, checkSourceElement);
            if (fullTypeCheck) {
                checkTypeForDuplicateIndexSignatures(node);
            }
        }
        function checkTypeAliasDeclaration(node) {
            checkTypeNameIsReserved(node.name, ts.Diagnostics.Type_alias_name_cannot_be_0);
            checkSourceElement(node.type);
        }
        function computeEnumMemberValues(node) {
            var nodeLinks = getNodeLinks(node);
            if (!(nodeLinks.flags & 128 /* EnumValuesComputed */)) {
                var enumSymbol = getSymbolOfNode(node);
                var enumType = getDeclaredTypeOfSymbol(enumSymbol);
                var autoValue = 0;
                var ambient = ts.isInAmbientContext(node);
                var enumIsConst = ts.isConstEnumDeclaration(node);
                ts.forEach(node.members, function (member) {
                    if (isNumericName(member.name.text)) {
                        error(member.name, ts.Diagnostics.An_enum_member_cannot_have_a_numeric_name);
                    }
                    var initializer = member.initializer;
                    if (initializer) {
                        autoValue = getConstantValueForEnumMemberInitializer(initializer, enumIsConst);
                        if (autoValue === undefined) {
                            if (enumIsConst) {
                                error(initializer, ts.Diagnostics.In_const_enum_declarations_member_initializer_must_be_constant_expression);
                            }
                            else if (!ambient) {
                                checkTypeAssignableTo(checkExpression(initializer), enumType, initializer, undefined);
                            }
                        }
                        else if (enumIsConst) {
                            if (isNaN(autoValue)) {
                                error(initializer, ts.Diagnostics.const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN);
                            }
                            else if (!isFinite(autoValue)) {
                                error(initializer, ts.Diagnostics.const_enum_member_initializer_was_evaluated_to_a_non_finite_value);
                            }
                        }
                    }
                    else if (ambient && !enumIsConst) {
                        autoValue = undefined;
                    }
                    if (autoValue !== undefined) {
                        getNodeLinks(member).enumMemberValue = autoValue++;
                    }
                });
                nodeLinks.flags |= 128 /* EnumValuesComputed */;
            }
            function getConstantValueForEnumMemberInitializer(initializer, enumIsConst) {
                return evalConstant(initializer);
                function evalConstant(e) {
                    switch (e.kind) {
                        case 151 /* PrefixOperator */:
                            var value = evalConstant(e.operand);
                            if (value === undefined) {
                                return undefined;
                            }
                            switch (e.operator) {
                                case 32 /* PlusToken */: return value;
                                case 33 /* MinusToken */: return -value;
                                case 46 /* TildeToken */: return enumIsConst ? ~value : undefined;
                            }
                            return undefined;
                        case 153 /* BinaryExpression */:
                            if (!enumIsConst) {
                                return undefined;
                            }
                            var left = evalConstant(e.left);
                            if (left === undefined) {
                                return undefined;
                            }
                            var right = evalConstant(e.right);
                            if (right === undefined) {
                                return undefined;
                            }
                            switch (e.operator) {
                                case 43 /* BarToken */: return left | right;
                                case 42 /* AmpersandToken */: return left & right;
                                case 40 /* GreaterThanGreaterThanToken */: return left >> right;
                                case 41 /* GreaterThanGreaterThanGreaterThanToken */: return left >>> right;
                                case 39 /* LessThanLessThanToken */: return left << right;
                                case 44 /* CaretToken */: return left ^ right;
                                case 34 /* AsteriskToken */: return left * right;
                                case 35 /* SlashToken */: return left / right;
                                case 32 /* PlusToken */: return left + right;
                                case 33 /* MinusToken */: return left - right;
                                case 36 /* PercentToken */: return left % right;
                            }
                            return undefined;
                        case 6 /* NumericLiteral */:
                            return +e.text;
                        case 148 /* ParenExpression */:
                            return enumIsConst ? evalConstant(e.expression) : undefined;
                        case 63 /* Identifier */:
                        case 143 /* IndexedAccess */:
                        case 142 /* PropertyAccess */:
                            if (!enumIsConst) {
                                return undefined;
                            }
                            var member = initializer.parent;
                            var currentType = getTypeOfSymbol(getSymbolOfNode(member.parent));
                            var enumType;
                            var propertyName;
                            if (e.kind === 63 /* Identifier */) {
                                enumType = currentType;
                                propertyName = e.text;
                            }
                            else {
                                if (e.kind === 143 /* IndexedAccess */) {
                                    if (e.index.kind !== 7 /* StringLiteral */) {
                                        return undefined;
                                    }
                                    var enumType = getTypeOfNode(e.object);
                                    propertyName = e.index.text;
                                }
                                else {
                                    var enumType = getTypeOfNode(e.left);
                                    propertyName = e.right.text;
                                }
                                if (enumType !== currentType) {
                                    return undefined;
                                }
                            }
                            if (propertyName === undefined) {
                                return undefined;
                            }
                            var property = getPropertyOfObjectType(enumType, propertyName);
                            if (!property || !(property.flags & 8 /* EnumMember */)) {
                                return undefined;
                            }
                            var propertyDecl = property.valueDeclaration;
                            if (member === propertyDecl) {
                                return undefined;
                            }
                            if (!isDefinedBefore(propertyDecl, member)) {
                                return undefined;
                            }
                            return getNodeLinks(propertyDecl).enumMemberValue;
                    }
                }
            }
        }
        function checkEnumDeclaration(node) {
            if (!fullTypeCheck) {
                return;
            }
            checkTypeNameIsReserved(node.name, ts.Diagnostics.Enum_name_cannot_be_0);
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            checkExportsOnMergedDeclarations(node);
            computeEnumMemberValues(node);
            var enumSymbol = getSymbolOfNode(node);
            var firstDeclaration = getDeclarationOfKind(enumSymbol, node.kind);
            if (node === firstDeclaration) {
                if (enumSymbol.declarations.length > 1) {
                    var enumIsConst = ts.isConstEnumDeclaration(node);
                    ts.forEach(enumSymbol.declarations, function (decl) {
                        if (ts.isConstEnumDeclaration(decl) !== enumIsConst) {
                            error(decl.name, ts.Diagnostics.Enum_declarations_must_all_be_const_or_non_const);
                        }
                    });
                }
                var seenEnumMissingInitialInitializer = false;
                ts.forEach(enumSymbol.declarations, function (declaration) {
                    if (declaration.kind !== 187 /* EnumDeclaration */) {
                        return false;
                    }
                    var enumDeclaration = declaration;
                    if (!enumDeclaration.members.length) {
                        return false;
                    }
                    var firstEnumMember = enumDeclaration.members[0];
                    if (!firstEnumMember.initializer) {
                        if (seenEnumMissingInitialInitializer) {
                            error(firstEnumMember.name, ts.Diagnostics.In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element);
                        }
                        else {
                            seenEnumMissingInitialInitializer = true;
                        }
                    }
                });
            }
        }
        function getFirstNonAmbientClassOrFunctionDeclaration(symbol) {
            var declarations = symbol.declarations;
            for (var i = 0; i < declarations.length; i++) {
                var declaration = declarations[i];
                if ((declaration.kind === 184 /* ClassDeclaration */ || (declaration.kind === 182 /* FunctionDeclaration */ && declaration.body)) && !ts.isInAmbientContext(declaration)) {
                    return declaration;
                }
            }
            return undefined;
        }
        function checkModuleDeclaration(node) {
            if (fullTypeCheck) {
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
                checkExportsOnMergedDeclarations(node);
                var symbol = getSymbolOfNode(node);
                if (symbol.flags & 512 /* ValueModule */ && symbol.declarations.length > 1 && !ts.isInAmbientContext(node)) {
                    var classOrFunc = getFirstNonAmbientClassOrFunctionDeclaration(symbol);
                    if (classOrFunc) {
                        if (ts.getSourceFileOfNode(node) !== ts.getSourceFileOfNode(classOrFunc)) {
                            error(node.name, ts.Diagnostics.A_module_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged);
                        }
                        else if (node.pos < classOrFunc.pos) {
                            error(node.name, ts.Diagnostics.A_module_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged);
                        }
                    }
                }
                if (node.name.kind === 7 /* StringLiteral */) {
                    if (!isGlobalSourceFile(node.parent)) {
                        error(node.name, ts.Diagnostics.Ambient_external_modules_cannot_be_nested_in_other_modules);
                    }
                    if (isExternalModuleNameRelative(node.name.text)) {
                        error(node.name, ts.Diagnostics.Ambient_external_module_declaration_cannot_specify_relative_module_name);
                    }
                }
            }
            checkSourceElement(node.body);
        }
        function getFirstIdentifier(node) {
            while (node.kind === 121 /* QualifiedName */) {
                node = node.left;
            }
            return node;
        }
        function checkImportDeclaration(node) {
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            var symbol = getSymbolOfNode(node);
            var target;
            if (node.entityName) {
                target = resolveImport(symbol);
                if (target !== unknownSymbol) {
                    if (target.flags & 107455 /* Value */) {
                        var moduleName = getFirstIdentifier(node.entityName);
                        if (resolveEntityName(node, moduleName, 107455 /* Value */ | 1536 /* Namespace */).flags & 1536 /* Namespace */) {
                            checkExpression(node.entityName);
                        }
                        else {
                            error(moduleName, ts.Diagnostics.Module_0_is_hidden_by_a_local_declaration_with_the_same_name, ts.identifierToString(moduleName));
                        }
                    }
                    if (target.flags & 3152352 /* Type */) {
                        checkTypeNameIsReserved(node.name, ts.Diagnostics.Import_name_cannot_be_0);
                    }
                }
            }
            else {
                if (node.parent.kind === 193 /* SourceFile */) {
                    target = resolveImport(symbol);
                }
                else if (node.parent.kind === 189 /* ModuleBlock */ && node.parent.parent.name.kind === 7 /* StringLiteral */) {
                    if (isExternalModuleNameRelative(node.externalModuleName.text)) {
                        error(node, ts.Diagnostics.Import_declaration_in_an_ambient_external_module_declaration_cannot_reference_external_module_through_relative_external_module_name);
                        target = unknownSymbol;
                    }
                    else {
                        target = resolveImport(symbol);
                    }
                }
                else {
                    target = unknownSymbol;
                }
            }
            if (target !== unknownSymbol) {
                var excludedMeanings = (symbol.flags & 107455 /* Value */ ? 107455 /* Value */ : 0) | (symbol.flags & 3152352 /* Type */ ? 3152352 /* Type */ : 0) | (symbol.flags & 1536 /* Namespace */ ? 1536 /* Namespace */ : 0);
                if (target.flags & excludedMeanings) {
                    error(node, ts.Diagnostics.Import_declaration_conflicts_with_local_declaration_of_0, symbolToString(symbol));
                }
            }
        }
        function checkExportAssignment(node) {
            var container = node.parent;
            if (container.kind !== 193 /* SourceFile */) {
                container = container.parent;
            }
            checkTypeOfExportAssignmentSymbol(getSymbolOfNode(container));
        }
        function checkSourceElement(node) {
            if (!node)
                return;
            switch (node.kind) {
                case 122 /* TypeParameter */:
                    return checkTypeParameter(node);
                case 123 /* Parameter */:
                    return checkParameter(node);
                case 124 /* Property */:
                    return checkPropertyDeclaration(node);
                case 129 /* CallSignature */:
                case 130 /* ConstructSignature */:
                case 131 /* IndexSignature */:
                    return checkSignatureDeclaration(node);
                case 125 /* Method */:
                    return checkMethodDeclaration(node);
                case 126 /* Constructor */:
                    return checkConstructorDeclaration(node);
                case 127 /* GetAccessor */:
                case 128 /* SetAccessor */:
                    return checkAccessorDeclaration(node);
                case 132 /* TypeReference */:
                    return checkTypeReference(node);
                case 133 /* TypeQuery */:
                    return checkTypeQuery(node);
                case 134 /* TypeLiteral */:
                    return checkTypeLiteral(node);
                case 135 /* ArrayType */:
                    return checkArrayType(node);
                case 136 /* TupleType */:
                    return checkTupleType(node);
                case 137 /* UnionType */:
                    return checkUnionType(node);
                case 138 /* ParenType */:
                    return checkSourceElement(node.type);
                case 182 /* FunctionDeclaration */:
                    return checkFunctionDeclaration(node);
                case 158 /* Block */:
                    return checkBlock(node);
                case 183 /* FunctionBlock */:
                case 189 /* ModuleBlock */:
                    return checkBody(node);
                case 159 /* VariableStatement */:
                    return checkVariableStatement(node);
                case 161 /* ExpressionStatement */:
                    return checkExpressionStatement(node);
                case 162 /* IfStatement */:
                    return checkIfStatement(node);
                case 163 /* DoStatement */:
                    return checkDoStatement(node);
                case 164 /* WhileStatement */:
                    return checkWhileStatement(node);
                case 165 /* ForStatement */:
                    return checkForStatement(node);
                case 166 /* ForInStatement */:
                    return checkForInStatement(node);
                case 167 /* ContinueStatement */:
                case 168 /* BreakStatement */:
                    return checkBreakOrContinueStatement(node);
                case 169 /* ReturnStatement */:
                    return checkReturnStatement(node);
                case 170 /* WithStatement */:
                    return checkWithStatement(node);
                case 171 /* SwitchStatement */:
                    return checkSwitchStatement(node);
                case 174 /* LabeledStatement */:
                    return checkLabeledStatement(node);
                case 175 /* ThrowStatement */:
                    return checkThrowStatement(node);
                case 176 /* TryStatement */:
                    return checkTryStatement(node);
                case 181 /* VariableDeclaration */:
                    return ts.Debug.fail("Checker encountered variable declaration");
                case 184 /* ClassDeclaration */:
                    return checkClassDeclaration(node);
                case 185 /* InterfaceDeclaration */:
                    return checkInterfaceDeclaration(node);
                case 186 /* TypeAliasDeclaration */:
                    return checkTypeAliasDeclaration(node);
                case 187 /* EnumDeclaration */:
                    return checkEnumDeclaration(node);
                case 188 /* ModuleDeclaration */:
                    return checkModuleDeclaration(node);
                case 190 /* ImportDeclaration */:
                    return checkImportDeclaration(node);
                case 191 /* ExportAssignment */:
                    return checkExportAssignment(node);
            }
        }
        function checkFunctionExpressionBodies(node) {
            switch (node.kind) {
                case 149 /* FunctionExpression */:
                case 150 /* ArrowFunction */:
                    ts.forEach(node.parameters, checkFunctionExpressionBodies);
                    checkFunctionExpressionBody(node);
                    break;
                case 125 /* Method */:
                case 126 /* Constructor */:
                case 127 /* GetAccessor */:
                case 128 /* SetAccessor */:
                case 182 /* FunctionDeclaration */:
                    ts.forEach(node.parameters, checkFunctionExpressionBodies);
                    break;
                case 170 /* WithStatement */:
                    checkFunctionExpressionBodies(node.expression);
                    break;
                case 123 /* Parameter */:
                case 124 /* Property */:
                case 139 /* ArrayLiteral */:
                case 140 /* ObjectLiteral */:
                case 141 /* PropertyAssignment */:
                case 142 /* PropertyAccess */:
                case 143 /* IndexedAccess */:
                case 144 /* CallExpression */:
                case 145 /* NewExpression */:
                case 146 /* TaggedTemplateExpression */:
                case 147 /* TypeAssertion */:
                case 148 /* ParenExpression */:
                case 151 /* PrefixOperator */:
                case 152 /* PostfixOperator */:
                case 153 /* BinaryExpression */:
                case 154 /* ConditionalExpression */:
                case 158 /* Block */:
                case 183 /* FunctionBlock */:
                case 189 /* ModuleBlock */:
                case 159 /* VariableStatement */:
                case 161 /* ExpressionStatement */:
                case 162 /* IfStatement */:
                case 163 /* DoStatement */:
                case 164 /* WhileStatement */:
                case 165 /* ForStatement */:
                case 166 /* ForInStatement */:
                case 167 /* ContinueStatement */:
                case 168 /* BreakStatement */:
                case 169 /* ReturnStatement */:
                case 171 /* SwitchStatement */:
                case 172 /* CaseClause */:
                case 173 /* DefaultClause */:
                case 174 /* LabeledStatement */:
                case 175 /* ThrowStatement */:
                case 176 /* TryStatement */:
                case 177 /* TryBlock */:
                case 178 /* CatchBlock */:
                case 179 /* FinallyBlock */:
                case 181 /* VariableDeclaration */:
                case 184 /* ClassDeclaration */:
                case 187 /* EnumDeclaration */:
                case 192 /* EnumMember */:
                case 193 /* SourceFile */:
                    ts.forEachChild(node, checkFunctionExpressionBodies);
                    break;
            }
        }
        function checkBody(node) {
            checkBlock(node);
            checkFunctionExpressionBodies(node);
        }
        function checkSourceFile(node) {
            var links = getNodeLinks(node);
            if (!(links.flags & 1 /* TypeChecked */)) {
                emitExtends = false;
                potentialThisCollisions.length = 0;
                checkBody(node);
                if (ts.isExternalModule(node)) {
                    var symbol = getExportAssignmentSymbol(node.symbol);
                    if (symbol && symbol.flags & 33554432 /* Import */) {
                        getSymbolLinks(symbol).referenced = true;
                    }
                }
                if (potentialThisCollisions.length) {
                    ts.forEach(potentialThisCollisions, checkIfThisIsCapturedInEnclosingScope);
                    potentialThisCollisions.length = 0;
                }
                if (emitExtends)
                    links.flags |= 8 /* EmitExtends */;
                links.flags |= 1 /* TypeChecked */;
            }
        }
        function checkProgram() {
            ts.forEach(program.getSourceFiles(), checkSourceFile);
        }
        function getSortedDiagnostics() {
            ts.Debug.assert(fullTypeCheck, "diagnostics are available only in the full typecheck mode");
            if (diagnosticsModified) {
                diagnostics.sort(ts.compareDiagnostics);
                diagnostics = ts.deduplicateSortedDiagnostics(diagnostics);
                diagnosticsModified = false;
            }
            return diagnostics;
        }
        function getDiagnostics(sourceFile) {
            if (sourceFile) {
                checkSourceFile(sourceFile);
                return ts.filter(getSortedDiagnostics(), function (d) { return d.file === sourceFile; });
            }
            checkProgram();
            return getSortedDiagnostics();
        }
        function getGlobalDiagnostics() {
            return ts.filter(getSortedDiagnostics(), function (d) { return !d.file; });
        }
        function getNodeAtPosition(sourceFile, position) {
            function findChildAtPosition(parent) {
                var child = ts.forEachChild(parent, function (node) {
                    if (position >= node.pos && position <= node.end && position >= ts.getTokenPosOfNode(node)) {
                        return findChildAtPosition(node);
                    }
                });
                return child || parent;
            }
            if (position < sourceFile.pos)
                position = sourceFile.pos;
            if (position > sourceFile.end)
                position = sourceFile.end;
            return findChildAtPosition(sourceFile);
        }
        function isInsideWithStatementBody(node) {
            if (node) {
                while (node.parent) {
                    if (node.parent.kind === 170 /* WithStatement */ && node.parent.statement === node) {
                        return true;
                    }
                    node = node.parent;
                }
            }
            return false;
        }
        function getSymbolsInScope(location, meaning) {
            var symbols = {};
            var memberFlags = 0;
            function copySymbol(symbol, meaning) {
                if (symbol.flags & meaning) {
                    var id = symbol.name;
                    if (!isReservedMemberName(id) && !ts.hasProperty(symbols, id)) {
                        symbols[id] = symbol;
                    }
                }
            }
            function copySymbols(source, meaning) {
                if (meaning) {
                    for (var id in source) {
                        if (ts.hasProperty(source, id)) {
                            copySymbol(source[id], meaning);
                        }
                    }
                }
            }
            if (isInsideWithStatementBody(location)) {
                return [];
            }
            while (location) {
                if (location.locals && !isGlobalSourceFile(location)) {
                    copySymbols(location.locals, meaning);
                }
                switch (location.kind) {
                    case 193 /* SourceFile */:
                        if (!ts.isExternalModule(location))
                            break;
                    case 188 /* ModuleDeclaration */:
                        copySymbols(getSymbolOfNode(location).exports, meaning & 35653619 /* ModuleMember */);
                        break;
                    case 187 /* EnumDeclaration */:
                        copySymbols(getSymbolOfNode(location).exports, meaning & 8 /* EnumMember */);
                        break;
                    case 184 /* ClassDeclaration */:
                    case 185 /* InterfaceDeclaration */:
                        if (!(memberFlags & 128 /* Static */)) {
                            copySymbols(getSymbolOfNode(location).members, meaning & 3152352 /* Type */);
                        }
                        break;
                    case 149 /* FunctionExpression */:
                        if (location.name) {
                            copySymbol(location.symbol, meaning);
                        }
                        break;
                    case 178 /* CatchBlock */:
                        if (location.variable.text) {
                            copySymbol(location.symbol, meaning);
                        }
                        break;
                }
                memberFlags = location.flags;
                location = location.parent;
            }
            copySymbols(globals, meaning);
            return ts.mapToArray(symbols);
        }
        function isTypeDeclarationName(name) {
            return name.kind == 63 /* Identifier */ && isTypeDeclaration(name.parent) && name.parent.name === name;
        }
        function isTypeDeclaration(node) {
            switch (node.kind) {
                case 122 /* TypeParameter */:
                case 184 /* ClassDeclaration */:
                case 185 /* InterfaceDeclaration */:
                case 186 /* TypeAliasDeclaration */:
                case 187 /* EnumDeclaration */:
                    return true;
            }
        }
        function isTypeReferenceIdentifier(entityName) {
            var node = entityName;
            while (node.parent && node.parent.kind === 121 /* QualifiedName */)
                node = node.parent;
            return node.parent && node.parent.kind === 132 /* TypeReference */;
        }
        function isTypeNode(node) {
            if (132 /* FirstTypeNode */ <= node.kind && node.kind <= 138 /* LastTypeNode */) {
                return true;
            }
            switch (node.kind) {
                case 109 /* AnyKeyword */:
                case 116 /* NumberKeyword */:
                case 118 /* StringKeyword */:
                case 110 /* BooleanKeyword */:
                    return true;
                case 97 /* VoidKeyword */:
                    return node.parent.kind !== 151 /* PrefixOperator */;
                case 7 /* StringLiteral */:
                    return node.parent.kind === 123 /* Parameter */;
                case 63 /* Identifier */:
                    if (node.parent.kind === 121 /* QualifiedName */) {
                        node = node.parent;
                    }
                case 121 /* QualifiedName */:
                    ts.Debug.assert(node.kind === 63 /* Identifier */ || node.kind === 121 /* QualifiedName */, "'node' was expected to be a qualified name or identifier in 'isTypeNode'.");
                    var parent = node.parent;
                    if (parent.kind === 133 /* TypeQuery */) {
                        return false;
                    }
                    if (132 /* FirstTypeNode */ <= parent.kind && parent.kind <= 138 /* LastTypeNode */) {
                        return true;
                    }
                    switch (parent.kind) {
                        case 122 /* TypeParameter */:
                            return node === parent.constraint;
                        case 124 /* Property */:
                        case 123 /* Parameter */:
                        case 181 /* VariableDeclaration */:
                            return node === parent.type;
                        case 182 /* FunctionDeclaration */:
                        case 149 /* FunctionExpression */:
                        case 150 /* ArrowFunction */:
                        case 126 /* Constructor */:
                        case 125 /* Method */:
                        case 127 /* GetAccessor */:
                        case 128 /* SetAccessor */:
                            return node === parent.type;
                        case 129 /* CallSignature */:
                        case 130 /* ConstructSignature */:
                        case 131 /* IndexSignature */:
                            return node === parent.type;
                        case 147 /* TypeAssertion */:
                            return node === parent.type;
                        case 144 /* CallExpression */:
                        case 145 /* NewExpression */:
                            return parent.typeArguments && parent.typeArguments.indexOf(node) >= 0;
                        case 146 /* TaggedTemplateExpression */:
                            return false;
                    }
            }
            return false;
        }
        function isInRightSideOfImportOrExportAssignment(node) {
            while (node.parent.kind === 121 /* QualifiedName */) {
                node = node.parent;
            }
            if (node.parent.kind === 190 /* ImportDeclaration */) {
                return node.parent.entityName === node;
            }
            if (node.parent.kind === 191 /* ExportAssignment */) {
                return node.parent.exportName === node;
            }
            return false;
        }
        function isRightSideOfQualifiedNameOrPropertyAccess(node) {
            return (node.parent.kind === 121 /* QualifiedName */ || node.parent.kind === 142 /* PropertyAccess */) && node.parent.right === node;
        }
        function getSymbolOfEntityName(entityName) {
            if (ts.isDeclarationOrFunctionExpressionOrCatchVariableName(entityName)) {
                return getSymbolOfNode(entityName.parent);
            }
            if (entityName.parent.kind === 191 /* ExportAssignment */) {
                return resolveEntityName(entityName.parent.parent, entityName, 107455 /* Value */ | 3152352 /* Type */ | 1536 /* Namespace */ | 33554432 /* Import */);
            }
            if (isInRightSideOfImportOrExportAssignment(entityName)) {
                return getSymbolOfPartOfRightHandSideOfImport(entityName);
            }
            if (isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                entityName = entityName.parent;
            }
            if (ts.isExpression(entityName)) {
                if (entityName.kind === 63 /* Identifier */) {
                    var meaning = 107455 /* Value */ | 33554432 /* Import */;
                    return resolveEntityName(entityName, entityName, meaning);
                }
                else if (entityName.kind === 121 /* QualifiedName */ || entityName.kind === 142 /* PropertyAccess */) {
                    var symbol = getNodeLinks(entityName).resolvedSymbol;
                    if (!symbol) {
                        checkPropertyAccess(entityName);
                    }
                    return getNodeLinks(entityName).resolvedSymbol;
                }
                else {
                    return;
                }
            }
            else if (isTypeReferenceIdentifier(entityName)) {
                var meaning = entityName.parent.kind === 132 /* TypeReference */ ? 3152352 /* Type */ : 1536 /* Namespace */;
                meaning |= 33554432 /* Import */;
                return resolveEntityName(entityName, entityName, meaning);
            }
            return undefined;
        }
        function getSymbolInfo(node) {
            if (isInsideWithStatementBody(node)) {
                return undefined;
            }
            if (ts.isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                return getSymbolOfNode(node.parent);
            }
            if (node.kind === 63 /* Identifier */ && isInRightSideOfImportOrExportAssignment(node)) {
                return node.parent.kind === 191 /* ExportAssignment */ ? getSymbolOfEntityName(node) : getSymbolOfPartOfRightHandSideOfImport(node);
            }
            switch (node.kind) {
                case 63 /* Identifier */:
                case 142 /* PropertyAccess */:
                case 121 /* QualifiedName */:
                    return getSymbolOfEntityName(node);
                case 91 /* ThisKeyword */:
                case 89 /* SuperKeyword */:
                    var type = checkExpression(node);
                    return type.symbol;
                case 111 /* ConstructorKeyword */:
                    var constructorDeclaration = node.parent;
                    if (constructorDeclaration && constructorDeclaration.kind === 126 /* Constructor */) {
                        return constructorDeclaration.parent.symbol;
                    }
                    return undefined;
                case 7 /* StringLiteral */:
                    if (node.parent.kind === 190 /* ImportDeclaration */ && node.parent.externalModuleName === node) {
                        var importSymbol = getSymbolOfNode(node.parent);
                        var moduleType = getTypeOfSymbol(importSymbol);
                        return moduleType ? moduleType.symbol : undefined;
                    }
                case 6 /* NumericLiteral */:
                    if (node.parent.kind == 143 /* IndexedAccess */ && node.parent.index === node) {
                        var objectType = checkExpression(node.parent.object);
                        if (objectType === unknownType)
                            return undefined;
                        var apparentType = getApparentType(objectType);
                        if (apparentType === unknownType)
                            return undefined;
                        return getPropertyOfType(apparentType, node.text);
                    }
                    break;
            }
            return undefined;
        }
        function getTypeOfNode(node) {
            if (isInsideWithStatementBody(node)) {
                return unknownType;
            }
            if (ts.isExpression(node)) {
                return getTypeOfExpression(node);
            }
            if (isTypeNode(node)) {
                return getTypeFromTypeNode(node);
            }
            if (isTypeDeclaration(node)) {
                var symbol = getSymbolOfNode(node);
                return getDeclaredTypeOfSymbol(symbol);
            }
            if (isTypeDeclarationName(node)) {
                var symbol = getSymbolInfo(node);
                return symbol && getDeclaredTypeOfSymbol(symbol);
            }
            if (ts.isDeclaration(node)) {
                var symbol = getSymbolOfNode(node);
                return getTypeOfSymbol(symbol);
            }
            if (ts.isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                var symbol = getSymbolInfo(node);
                return symbol && getTypeOfSymbol(symbol);
            }
            if (isInRightSideOfImportOrExportAssignment(node)) {
                var symbol = getSymbolInfo(node);
                var declaredType = symbol && getDeclaredTypeOfSymbol(symbol);
                return declaredType !== unknownType ? declaredType : getTypeOfSymbol(symbol);
            }
            return unknownType;
        }
        function getTypeOfExpression(expr) {
            if (isRightSideOfQualifiedNameOrPropertyAccess(expr)) {
                expr = expr.parent;
            }
            return checkExpression(expr);
        }
        function getAugmentedPropertiesOfType(type) {
            var type = getApparentType(type);
            var propsByName = createSymbolTable(getPropertiesOfType(type));
            if (getSignaturesOfType(type, 0 /* Call */).length || getSignaturesOfType(type, 1 /* Construct */).length) {
                ts.forEach(getPropertiesOfType(globalFunctionType), function (p) {
                    if (!ts.hasProperty(propsByName, p.name)) {
                        propsByName[p.name] = p;
                    }
                });
            }
            return getNamedMembers(propsByName);
        }
        function getRootSymbols(symbol) {
            if (symbol.flags & 1073741824 /* UnionProperty */) {
                var symbols = [];
                var name = symbol.name;
                ts.forEach(getSymbolLinks(symbol).unionType.types, function (t) {
                    symbols.push(getPropertyOfType(t, name));
                });
                return symbols;
            }
            else if (symbol.flags & 268435456 /* Transient */) {
                var target = getSymbolLinks(symbol).target;
                if (target) {
                    return [target];
                }
            }
            return [symbol];
        }
        function isExternalModuleSymbol(symbol) {
            return symbol.flags & 512 /* ValueModule */ && symbol.declarations.length === 1 && symbol.declarations[0].kind === 193 /* SourceFile */;
        }
        function isNodeDescendentOf(node, ancestor) {
            while (node) {
                if (node === ancestor)
                    return true;
                node = node.parent;
            }
            return false;
        }
        function isUniqueLocalName(name, container) {
            for (var node = container; isNodeDescendentOf(node, container); node = node.nextContainer) {
                if (node.locals && ts.hasProperty(node.locals, name) && node.locals[name].flags & (107455 /* Value */ | 4194304 /* ExportValue */)) {
                    return false;
                }
            }
            return true;
        }
        function getLocalNameOfContainer(container) {
            var links = getNodeLinks(container);
            if (!links.localModuleName) {
                var prefix = "";
                var name = ts.unescapeIdentifier(container.name.text);
                while (!isUniqueLocalName(ts.escapeIdentifier(prefix + name), container)) {
                    prefix += "_";
                }
                links.localModuleName = prefix + ts.getTextOfNode(container.name);
            }
            return links.localModuleName;
        }
        function getLocalNameForSymbol(symbol, location) {
            var node = location;
            while (node) {
                if ((node.kind === 188 /* ModuleDeclaration */ || node.kind === 187 /* EnumDeclaration */) && getSymbolOfNode(node) === symbol) {
                    return getLocalNameOfContainer(node);
                }
                node = node.parent;
            }
            ts.Debug.fail("getLocalNameForSymbol failed");
        }
        function getExpressionNamePrefix(node) {
            var symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol) {
                var exportSymbol = getExportSymbolOfValueSymbolIfExported(symbol);
                if (symbol !== exportSymbol && !(exportSymbol.flags & 944 /* ExportHasLocal */)) {
                    symbol = exportSymbol;
                }
                if (symbol.parent) {
                    return isExternalModuleSymbol(symbol.parent) ? "exports" : getLocalNameForSymbol(getParentOfSymbol(symbol), node.parent);
                }
            }
        }
        function getExportAssignmentName(node) {
            var symbol = getExportAssignmentSymbol(getSymbolOfNode(node));
            return symbol && symbolIsValue(symbol) && !isConstEnumSymbol(symbol) ? symbolToString(symbol) : undefined;
        }
        function isTopLevelValueImportWithEntityName(node) {
            if (node.parent.kind !== 193 /* SourceFile */ || !node.entityName) {
                return false;
            }
            var symbol = getSymbolOfNode(node);
            return isImportResolvedToValue(getSymbolOfNode(node));
        }
        function hasSemanticErrors() {
            return getDiagnostics().length > 0 || getGlobalDiagnostics().length > 0;
        }
        function hasEarlyErrors(sourceFile) {
            return ts.forEach(getDiagnostics(sourceFile), function (d) { return d.isEarly; });
        }
        function isImportResolvedToValue(symbol) {
            var target = resolveImport(symbol);
            return target !== unknownSymbol && target.flags & 107455 /* Value */ && !isConstEnumOrConstEnumOnlyModule(target);
        }
        function isConstEnumOrConstEnumOnlyModule(s) {
            return isConstEnumSymbol(s) || s.constEnumOnlyModule;
        }
        function isReferencedImportDeclaration(node) {
            var symbol = getSymbolOfNode(node);
            if (getSymbolLinks(symbol).referenced) {
                return true;
            }
            if (node.flags & 1 /* Export */) {
                return isImportResolvedToValue(symbol);
            }
            return false;
        }
        function isImplementationOfOverload(node) {
            if (node.body) {
                var symbol = getSymbolOfNode(node);
                var signaturesOfSymbol = getSignaturesOfSymbol(symbol);
                return signaturesOfSymbol.length > 1 || (signaturesOfSymbol.length === 1 && signaturesOfSymbol[0].declaration !== node);
            }
            return false;
        }
        function getNodeCheckFlags(node) {
            return getNodeLinks(node).flags;
        }
        function getEnumMemberValue(node) {
            computeEnumMemberValues(node.parent);
            return getNodeLinks(node).enumMemberValue;
        }
        function getConstantValue(node) {
            var symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol && (symbol.flags & 8 /* EnumMember */)) {
                var declaration = symbol.valueDeclaration;
                var constantValue;
                if (declaration.kind === 192 /* EnumMember */ && (constantValue = getNodeLinks(declaration).enumMemberValue) !== undefined) {
                    return constantValue;
                }
            }
            return undefined;
        }
        function writeTypeAtLocation(location, enclosingDeclaration, flags, writer) {
            var symbol = getSymbolOfNode(location);
            var type = symbol && !(symbol.flags & 2048 /* TypeLiteral */) ? getTypeOfSymbol(symbol) : getTypeFromTypeNode(location);
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
        }
        function writeReturnTypeOfSignatureDeclaration(signatureDeclaration, enclosingDeclaration, flags, writer) {
            var signature = getSignatureFromDeclaration(signatureDeclaration);
            getSymbolDisplayBuilder().buildTypeDisplay(getReturnTypeOfSignature(signature), writer, enclosingDeclaration, flags);
        }
        function invokeEmitter(targetSourceFile) {
            var resolver = {
                getProgram: function () { return program; },
                getLocalNameOfContainer: getLocalNameOfContainer,
                getExpressionNamePrefix: getExpressionNamePrefix,
                getExportAssignmentName: getExportAssignmentName,
                isReferencedImportDeclaration: isReferencedImportDeclaration,
                getNodeCheckFlags: getNodeCheckFlags,
                getEnumMemberValue: getEnumMemberValue,
                isTopLevelValueImportWithEntityName: isTopLevelValueImportWithEntityName,
                hasSemanticErrors: hasSemanticErrors,
                hasEarlyErrors: hasEarlyErrors,
                isDeclarationVisible: isDeclarationVisible,
                isImplementationOfOverload: isImplementationOfOverload,
                writeTypeAtLocation: writeTypeAtLocation,
                writeReturnTypeOfSignatureDeclaration: writeReturnTypeOfSignatureDeclaration,
                isSymbolAccessible: isSymbolAccessible,
                isImportDeclarationEntityNameReferenceDeclarationVisibile: isImportDeclarationEntityNameReferenceDeclarationVisibile,
                getConstantValue: getConstantValue
            };
            checkProgram();
            return ts.emitFiles(resolver, targetSourceFile);
        }
        function initializeTypeChecker() {
            ts.forEach(program.getSourceFiles(), function (file) {
                ts.bindSourceFile(file);
                ts.forEach(file.semanticErrors, addDiagnostic);
            });
            ts.forEach(program.getSourceFiles(), function (file) {
                if (!ts.isExternalModule(file)) {
                    extendSymbolTable(globals, file.locals);
                }
            });
            getSymbolLinks(undefinedSymbol).type = undefinedType;
            getSymbolLinks(argumentsSymbol).type = getGlobalType("IArguments");
            getSymbolLinks(unknownSymbol).type = unknownType;
            globals[undefinedSymbol.name] = undefinedSymbol;
            globalArraySymbol = getGlobalSymbol("Array");
            globalArrayType = getTypeOfGlobalSymbol(globalArraySymbol, 1);
            globalObjectType = getGlobalType("Object");
            globalFunctionType = getGlobalType("Function");
            globalStringType = getGlobalType("String");
            globalNumberType = getGlobalType("Number");
            globalBooleanType = getGlobalType("Boolean");
            globalRegExpType = getGlobalType("RegExp");
        }
        initializeTypeChecker();
        return checker;
    }
    ts.createTypeChecker = createTypeChecker;
})(ts || (ts = {}));
var ts;
(function (ts) {
    ts.optionDeclarations = [
        {
            name: "charset",
            type: "string"
        },
        {
            name: "codepage",
            type: "number"
        },
        {
            name: "declaration",
            shortName: "d",
            type: "boolean",
            description: ts.Diagnostics.Generates_corresponding_d_ts_file
        },
        {
            name: "diagnostics",
            type: "boolean"
        },
        {
            name: "emitBOM",
            type: "boolean"
        },
        {
            name: "help",
            shortName: "h",
            type: "boolean",
            description: ts.Diagnostics.Print_this_message
        },
        {
            name: "locale",
            type: "string"
        },
        {
            name: "mapRoot",
            type: "string",
            description: ts.Diagnostics.Specifies_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations,
            paramType: ts.Diagnostics.LOCATION
        },
        {
            name: "module",
            shortName: "m",
            type: {
                "commonjs": 1 /* CommonJS */,
                "amd": 2 /* AMD */
            },
            description: ts.Diagnostics.Specify_module_code_generation_Colon_commonjs_or_amd,
            paramType: ts.Diagnostics.KIND,
            error: ts.Diagnostics.Argument_for_module_option_must_be_commonjs_or_amd
        },
        {
            name: "noImplicitAny",
            type: "boolean",
            description: ts.Diagnostics.Warn_on_expressions_and_declarations_with_an_implied_any_type
        },
        {
            name: "noLib",
            type: "boolean"
        },
        {
            name: "noLibCheck",
            type: "boolean"
        },
        {
            name: "noResolve",
            type: "boolean"
        },
        {
            name: "out",
            type: "string",
            description: ts.Diagnostics.Concatenate_and_emit_output_to_single_file,
            paramType: ts.Diagnostics.FILE
        },
        {
            name: "outDir",
            type: "string",
            description: ts.Diagnostics.Redirect_output_structure_to_the_directory,
            paramType: ts.Diagnostics.DIRECTORY
        },
        {
            name: "removeComments",
            type: "boolean",
            description: ts.Diagnostics.Do_not_emit_comments_to_output
        },
        {
            name: "sourceMap",
            type: "boolean",
            description: ts.Diagnostics.Generates_corresponding_map_file
        },
        {
            name: "sourceRoot",
            type: "string",
            description: ts.Diagnostics.Specifies_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations,
            paramType: ts.Diagnostics.LOCATION
        },
        {
            name: "target",
            shortName: "t",
            type: { "es3": 0 /* ES3 */, "es5": 1 /* ES5 */, "es6": 2 /* ES6 */ },
            description: ts.Diagnostics.Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES6_experimental,
            paramType: ts.Diagnostics.VERSION,
            error: ts.Diagnostics.Argument_for_target_option_must_be_es3_es5_or_es6
        },
        {
            name: "version",
            shortName: "v",
            type: "boolean",
            description: ts.Diagnostics.Print_the_compiler_s_version
        },
        {
            name: "watch",
            shortName: "w",
            type: "boolean",
            description: ts.Diagnostics.Watch_input_files
        },
        {
            name: "preserveConstEnums",
            type: "boolean",
            description: ts.Diagnostics.Do_not_erase_const_enum_declarations_in_generated_code
        }
    ];
    var shortOptionNames = {};
    var optionNameMap = {};
    ts.forEach(ts.optionDeclarations, function (option) {
        optionNameMap[option.name.toLowerCase()] = option;
        if (option.shortName) {
            shortOptionNames[option.shortName] = option.name;
        }
    });
    function parseCommandLine(commandLine) {
        var options = {
            target: 0 /* ES3 */,
            module: 0 /* None */
        };
        var filenames = [];
        var errors = [];
        parseStrings(commandLine);
        return {
            options: options,
            filenames: filenames,
            errors: errors
        };
        function parseStrings(args) {
            var i = 0;
            while (i < args.length) {
                var s = args[i++];
                if (s.charCodeAt(0) === 64 /* at */) {
                    parseResponseFile(s.slice(1));
                }
                else if (s.charCodeAt(0) === 45 /* minus */) {
                    s = s.slice(s.charCodeAt(1) === 45 /* minus */ ? 2 : 1).toLowerCase();
                    if (ts.hasProperty(shortOptionNames, s)) {
                        s = shortOptionNames[s];
                    }
                    if (ts.hasProperty(optionNameMap, s)) {
                        var opt = optionNameMap[s];
                        if (!args[i] && opt.type !== "boolean") {
                            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Compiler_option_0_expects_an_argument, opt.name));
                        }
                        switch (opt.type) {
                            case "number":
                                options[opt.name] = parseInt(args[i++]);
                                break;
                            case "boolean":
                                options[opt.name] = true;
                                break;
                            case "string":
                                options[opt.name] = args[i++] || "";
                                break;
                            default:
                                var map = opt.type;
                                var key = (args[i++] || "").toLowerCase();
                                if (ts.hasProperty(map, key)) {
                                    options[opt.name] = map[key];
                                }
                                else {
                                    errors.push(ts.createCompilerDiagnostic(opt.error));
                                }
                        }
                    }
                    else {
                        errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unknown_compiler_option_0, s));
                    }
                }
                else {
                    filenames.push(s);
                }
            }
        }
        function parseResponseFile(filename) {
            var text = sys.readFile(filename);
            if (!text) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.File_0_not_found, filename));
                return;
            }
            var args = [];
            var pos = 0;
            while (true) {
                while (pos < text.length && text.charCodeAt(pos) <= 32 /* space */)
                    pos++;
                if (pos >= text.length)
                    break;
                var start = pos;
                if (text.charCodeAt(start) === 34 /* doubleQuote */) {
                    pos++;
                    while (pos < text.length && text.charCodeAt(pos) !== 34 /* doubleQuote */)
                        pos++;
                    if (pos < text.length) {
                        args.push(text.substring(start + 1, pos));
                        pos++;
                    }
                    else {
                        errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unterminated_quoted_string_in_response_file_0, filename));
                    }
                }
                else {
                    while (text.charCodeAt(pos) > 32 /* space */)
                        pos++;
                    args.push(text.substring(start, pos));
                }
            }
            parseStrings(args);
        }
    }
    ts.parseCommandLine = parseCommandLine;
})(ts || (ts = {}));
var ts;
(function (ts) {
    var version = "1.3.0.0";
    function validateLocaleAndSetLanguage(locale, errors) {
        var matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(locale.toLowerCase());
        if (!matchResult) {
            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, 'en', 'ja-jp'));
            return false;
        }
        var language = matchResult[1];
        var territory = matchResult[3];
        if (!trySetLanguageAndTerritory(language, territory, errors) && !trySetLanguageAndTerritory(language, undefined, errors)) {
            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unsupported_locale_0, locale));
            return false;
        }
        return true;
    }
    function trySetLanguageAndTerritory(language, territory, errors) {
        var compilerFilePath = ts.normalizePath(sys.getExecutingFilePath());
        var containingDirectoryPath = ts.getDirectoryPath(compilerFilePath);
        var filePath = ts.combinePaths(containingDirectoryPath, language);
        if (territory) {
            filePath = filePath + "-" + territory;
        }
        filePath = sys.resolvePath(ts.combinePaths(filePath, "diagnosticMessages.generated.json"));
        if (!sys.fileExists(filePath)) {
            return false;
        }
        try {
            var fileContents = sys.readFile(filePath);
        }
        catch (e) {
            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unable_to_open_file_0, filePath));
            return false;
        }
        try {
            ts.localizedDiagnosticMessages = JSON.parse(fileContents);
        }
        catch (e) {
            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Corrupted_locale_file_0, filePath));
            return false;
        }
        return true;
    }
    function countLines(program) {
        var count = 0;
        ts.forEach(program.getSourceFiles(), function (file) {
            count += file.getLineAndCharacterFromPosition(file.end).line;
        });
        return count;
    }
    function getDiagnosticText(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var diagnostic = ts.createCompilerDiagnostic.apply(undefined, arguments);
        return diagnostic.messageText;
    }
    function reportDiagnostic(diagnostic) {
        var output = "";
        if (diagnostic.file) {
            var loc = diagnostic.file.getLineAndCharacterFromPosition(diagnostic.start);
            output += diagnostic.file.filename + "(" + loc.line + "," + loc.character + "): ";
        }
        var category = ts.DiagnosticCategory[diagnostic.category].toLowerCase();
        output += category + " TS" + diagnostic.code + ": " + diagnostic.messageText + sys.newLine;
        sys.write(output);
    }
    function reportDiagnostics(diagnostics) {
        for (var i = 0; i < diagnostics.length; i++) {
            reportDiagnostic(diagnostics[i]);
        }
    }
    function padLeft(s, length) {
        while (s.length < length) {
            s = " " + s;
        }
        return s;
    }
    function padRight(s, length) {
        while (s.length < length) {
            s = s + " ";
        }
        return s;
    }
    function reportStatisticalValue(name, value) {
        sys.write(padRight(name + ":", 12) + padLeft(value.toString(), 10) + sys.newLine);
    }
    function reportCountStatistic(name, count) {
        reportStatisticalValue(name, "" + count);
    }
    function reportTimeStatistic(name, time) {
        reportStatisticalValue(name, (time / 1000).toFixed(2) + "s");
    }
    function createCompilerHost(options) {
        var currentDirectory;
        var existingDirectories = {};
        function getCanonicalFileName(fileName) {
            return sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
        }
        var unsupportedFileEncodingErrorCode = -2147024809;
        function getSourceFile(filename, languageVersion, onError) {
            try {
                var text = sys.readFile(filename, options.charset);
            }
            catch (e) {
                if (onError) {
                    onError(e.number === unsupportedFileEncodingErrorCode ? getDiagnosticText(ts.Diagnostics.Unsupported_file_encoding) : e.message);
                }
                text = "";
            }
            return text !== undefined ? ts.createSourceFile(filename, text, languageVersion, "0") : undefined;
        }
        function writeFile(fileName, data, writeByteOrderMark, onError) {
            function directoryExists(directoryPath) {
                if (ts.hasProperty(existingDirectories, directoryPath)) {
                    return true;
                }
                if (sys.directoryExists(directoryPath)) {
                    existingDirectories[directoryPath] = true;
                    return true;
                }
                return false;
            }
            function ensureDirectoriesExist(directoryPath) {
                if (directoryPath.length > ts.getRootLength(directoryPath) && !directoryExists(directoryPath)) {
                    var parentDirectory = ts.getDirectoryPath(directoryPath);
                    ensureDirectoriesExist(parentDirectory);
                    sys.createDirectory(directoryPath);
                }
            }
            try {
                ensureDirectoriesExist(ts.getDirectoryPath(ts.normalizePath(fileName)));
                sys.writeFile(fileName, data, writeByteOrderMark);
            }
            catch (e) {
                if (onError)
                    onError(e.message);
            }
        }
        return {
            getSourceFile: getSourceFile,
            getDefaultLibFilename: function () { return ts.combinePaths(ts.getDirectoryPath(ts.normalizePath(sys.getExecutingFilePath())), "lib.d.ts"); },
            writeFile: writeFile,
            getCurrentDirectory: function () { return currentDirectory || (currentDirectory = sys.getCurrentDirectory()); },
            useCaseSensitiveFileNames: function () { return sys.useCaseSensitiveFileNames; },
            getCanonicalFileName: getCanonicalFileName,
            getNewLine: function () { return sys.newLine; }
        };
    }
    function executeCommandLine(args) {
        var commandLine = ts.parseCommandLine(args);
        var compilerOptions = commandLine.options;
        if (compilerOptions.locale) {
            if (typeof JSON === "undefined") {
                reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.The_current_host_does_not_support_the_0_option, "--locale"));
                return sys.exit(1);
            }
            validateLocaleAndSetLanguage(commandLine.options.locale, commandLine.errors);
        }
        if (commandLine.errors.length > 0) {
            reportDiagnostics(commandLine.errors);
            return sys.exit(5 /* CompilerOptionsErrors */);
        }
        if (compilerOptions.version) {
            reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.Version_0, version));
            return sys.exit(0 /* Succeeded */);
        }
        if (compilerOptions.help) {
            printVersion();
            printHelp();
            return sys.exit(0 /* Succeeded */);
        }
        if (commandLine.filenames.length === 0) {
            printVersion();
            printHelp();
            return sys.exit(5 /* CompilerOptionsErrors */);
        }
        var defaultCompilerHost = createCompilerHost(compilerOptions);
        if (compilerOptions.watch) {
            if (!sys.watchFile) {
                reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"));
                return sys.exit(5 /* CompilerOptionsErrors */);
            }
            watchProgram(commandLine, defaultCompilerHost);
        }
        else {
            var result = compile(commandLine, defaultCompilerHost).exitStatus;
            return sys.exit(result);
        }
    }
    ts.executeCommandLine = executeCommandLine;
    function watchProgram(commandLine, compilerHost) {
        var watchers = {};
        var updatedFiles = {};
        var program = compile(commandLine, compilerHost).program;
        reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.Compilation_complete_Watching_for_file_changes));
        addWatchers(program);
        return;
        function addWatchers(program) {
            ts.forEach(program.getSourceFiles(), function (f) {
                var filename = getCanonicalName(f.filename);
                watchers[filename] = sys.watchFile(filename, fileUpdated);
            });
        }
        function removeWatchers(program) {
            ts.forEach(program.getSourceFiles(), function (f) {
                var filename = getCanonicalName(f.filename);
                if (ts.hasProperty(watchers, filename)) {
                    watchers[filename].close();
                }
            });
            watchers = {};
        }
        function fileUpdated(filename) {
            var firstNotification = ts.isEmpty(updatedFiles);
            updatedFiles[getCanonicalName(filename)] = true;
            if (firstNotification) {
                setTimeout(function () {
                    var changedFiles = updatedFiles;
                    updatedFiles = {};
                    recompile(changedFiles);
                }, 250);
            }
        }
        function recompile(changedFiles) {
            reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.File_change_detected_Compiling));
            removeWatchers(program);
            var oldSourceFiles = ts.arrayToMap(ts.filter(program.getSourceFiles(), function (file) { return !ts.hasProperty(changedFiles, getCanonicalName(file.filename)); }), function (file) { return getCanonicalName(file.filename); });
            var newCompilerHost = ts.clone(compilerHost);
            newCompilerHost.getSourceFile = function (fileName, languageVersion, onError) {
                fileName = getCanonicalName(fileName);
                var sourceFile = ts.lookUp(oldSourceFiles, fileName);
                if (sourceFile) {
                    return sourceFile;
                }
                return compilerHost.getSourceFile(fileName, languageVersion, onError);
            };
            program = compile(commandLine, newCompilerHost).program;
            reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.Compilation_complete_Watching_for_file_changes));
            addWatchers(program);
        }
        function getCanonicalName(fileName) {
            return compilerHost.getCanonicalFileName(fileName);
        }
    }
    function compile(commandLine, compilerHost) {
        var parseStart = new Date().getTime();
        var compilerOptions = commandLine.options;
        var program = ts.createProgram(commandLine.filenames, compilerOptions, compilerHost);
        var bindStart = new Date().getTime();
        var errors = program.getDiagnostics();
        var exitStatus;
        if (errors.length) {
            var checkStart = bindStart;
            var emitStart = bindStart;
            var reportStart = bindStart;
            exitStatus = 1 /* AllOutputGenerationSkipped */;
        }
        else {
            var checker = program.getTypeChecker(true);
            var checkStart = new Date().getTime();
            errors = checker.getDiagnostics();
            if (!checker.hasEarlyErrors()) {
                var emitStart = new Date().getTime();
                var emitOutput = checker.emitFiles();
                var emitErrors = emitOutput.errors;
                exitStatus = emitOutput.emitResultStatus;
                var reportStart = new Date().getTime();
                errors = ts.concatenate(errors, emitErrors);
            }
            else {
                exitStatus = 1 /* AllOutputGenerationSkipped */;
            }
        }
        reportDiagnostics(errors);
        if (commandLine.options.diagnostics) {
            var memoryUsed = sys.getMemoryUsage ? sys.getMemoryUsage() : -1;
            reportCountStatistic("Files", program.getSourceFiles().length);
            reportCountStatistic("Lines", countLines(program));
            reportCountStatistic("Nodes", checker ? checker.getNodeCount() : 0);
            reportCountStatistic("Identifiers", checker ? checker.getIdentifierCount() : 0);
            reportCountStatistic("Symbols", checker ? checker.getSymbolCount() : 0);
            reportCountStatistic("Types", checker ? checker.getTypeCount() : 0);
            if (memoryUsed >= 0) {
                reportStatisticalValue("Memory used", Math.round(memoryUsed / 1000) + "K");
            }
            reportTimeStatistic("Parse time", bindStart - parseStart);
            reportTimeStatistic("Bind time", checkStart - bindStart);
            reportTimeStatistic("Check time", emitStart - checkStart);
            reportTimeStatistic("Emit time", reportStart - emitStart);
            reportTimeStatistic("Total time", reportStart - parseStart);
        }
        return { program: program, exitStatus: exitStatus };
    }
    function printVersion() {
        sys.write(getDiagnosticText(ts.Diagnostics.Version_0, version) + sys.newLine);
    }
    function printHelp() {
        var output = "";
        var syntaxLength = getDiagnosticText(ts.Diagnostics.Syntax_Colon_0, "").length;
        var examplesLength = getDiagnosticText(ts.Diagnostics.Examples_Colon_0, "").length;
        var marginLength = Math.max(syntaxLength, examplesLength);
        var syntax = makePadding(marginLength - syntaxLength);
        syntax += "tsc [" + getDiagnosticText(ts.Diagnostics.options) + "] [" + getDiagnosticText(ts.Diagnostics.file) + " ...]";
        output += getDiagnosticText(ts.Diagnostics.Syntax_Colon_0, syntax);
        output += sys.newLine + sys.newLine;
        var padding = makePadding(marginLength);
        output += getDiagnosticText(ts.Diagnostics.Examples_Colon_0, makePadding(marginLength - examplesLength) + "tsc hello.ts") + sys.newLine;
        output += padding + "tsc --out file.js file.ts" + sys.newLine;
        output += padding + "tsc @args.txt" + sys.newLine;
        output += sys.newLine;
        output += getDiagnosticText(ts.Diagnostics.Options_Colon) + sys.newLine;
        var optsList = ts.optionDeclarations.slice();
        optsList.sort(function (a, b) { return ts.compareValues(a.name.toLowerCase(), b.name.toLowerCase()); });
        var marginLength = 0;
        var usageColumn = [];
        var descriptionColumn = [];
        for (var i = 0; i < optsList.length; i++) {
            var option = optsList[i];
            if (!option.description) {
                continue;
            }
            var usageText = " ";
            if (option.shortName) {
                usageText += "-" + option.shortName;
                usageText += getParamName(option);
                usageText += ", ";
            }
            usageText += "--" + option.name;
            usageText += getParamName(option);
            usageColumn.push(usageText);
            descriptionColumn.push(getDiagnosticText(option.description));
            marginLength = Math.max(usageText.length, marginLength);
        }
        var usageText = " @<" + getDiagnosticText(ts.Diagnostics.file) + ">";
        usageColumn.push(usageText);
        descriptionColumn.push(getDiagnosticText(ts.Diagnostics.Insert_command_line_options_and_files_from_a_file));
        marginLength = Math.max(usageText.length, marginLength);
        for (var i = 0; i < usageColumn.length; i++) {
            var usage = usageColumn[i];
            var description = descriptionColumn[i];
            output += usage + makePadding(marginLength - usage.length + 2) + description + sys.newLine;
        }
        sys.write(output);
        return;
        function getParamName(option) {
            if (option.paramName !== undefined) {
                return " " + getDiagnosticText(option.paramName);
            }
            return "";
        }
        function makePadding(paddingLength) {
            return Array(paddingLength + 1).join(" ");
        }
    }
})(ts || (ts = {}));
ts.executeCommandLine(sys.args);
