namespace ts {
    /* @internal */
    export const compileOnSaveCommandLineOption: CommandLineOption = { name: "compileOnSave", type: "boolean" };

    // NOTE: The order here is important to default lib ordering as entries will have the same
    //       order in the generated program (see `getDefaultLibPriority` in program.ts). This
    //       order also affects overload resolution when a type declared in one lib is
    //       augmented in another lib.
    const libEntries: [string, string][] = [
        // JavaScript only
        ["es5", "lib.es5.d.ts"],
        ["es6", "lib.es2015.d.ts"],
        ["es2015", "lib.es2015.d.ts"],
        ["es7", "lib.es2016.d.ts"],
        ["es2016", "lib.es2016.d.ts"],
        ["es2017", "lib.es2017.d.ts"],
        ["es2018", "lib.es2018.d.ts"],
        ["es2019", "lib.es2019.d.ts"],
        ["es2020", "lib.es2020.d.ts"],
        ["esnext", "lib.esnext.d.ts"],
        // Host only
        ["dom", "lib.dom.d.ts"],
        ["dom.iterable", "lib.dom.iterable.d.ts"],
        ["webworker", "lib.webworker.d.ts"],
        ["webworker.importscripts", "lib.webworker.importscripts.d.ts"],
        ["scripthost", "lib.scripthost.d.ts"],
        // ES2015 Or ESNext By-feature options
        ["es2015.core", "lib.es2015.core.d.ts"],
        ["es2015.collection", "lib.es2015.collection.d.ts"],
        ["es2015.generator", "lib.es2015.generator.d.ts"],
        ["es2015.iterable", "lib.es2015.iterable.d.ts"],
        ["es2015.promise", "lib.es2015.promise.d.ts"],
        ["es2015.proxy", "lib.es2015.proxy.d.ts"],
        ["es2015.reflect", "lib.es2015.reflect.d.ts"],
        ["es2015.symbol", "lib.es2015.symbol.d.ts"],
        ["es2015.symbol.wellknown", "lib.es2015.symbol.wellknown.d.ts"],
        ["es2016.array.include", "lib.es2016.array.include.d.ts"],
        ["es2017.object", "lib.es2017.object.d.ts"],
        ["es2017.sharedmemory", "lib.es2017.sharedmemory.d.ts"],
        ["es2017.string", "lib.es2017.string.d.ts"],
        ["es2017.intl", "lib.es2017.intl.d.ts"],
        ["es2017.typedarrays", "lib.es2017.typedarrays.d.ts"],
        ["es2018.asyncgenerator", "lib.es2018.asyncgenerator.d.ts"],
        ["es2018.asynciterable", "lib.es2018.asynciterable.d.ts"],
        ["es2018.intl", "lib.es2018.intl.d.ts"],
        ["es2018.promise", "lib.es2018.promise.d.ts"],
        ["es2018.regexp", "lib.es2018.regexp.d.ts"],
        ["es2019.array", "lib.es2019.array.d.ts"],
        ["es2019.object", "lib.es2019.object.d.ts"],
        ["es2019.string", "lib.es2019.string.d.ts"],
        ["es2019.symbol", "lib.es2019.symbol.d.ts"],
        ["es2020.bigint", "lib.es2020.bigint.d.ts"],
        ["es2020.promise", "lib.es2020.promise.d.ts"],
        ["es2020.string", "lib.es2020.string.d.ts"],
        ["es2020.symbol.wellknown", "lib.es2020.symbol.wellknown.d.ts"],
        ["esnext.array", "lib.es2019.array.d.ts"],
        ["esnext.symbol", "lib.es2019.symbol.d.ts"],
        ["esnext.asynciterable", "lib.es2018.asynciterable.d.ts"],
        ["esnext.intl", "lib.esnext.intl.d.ts"],
        ["esnext.bigint", "lib.es2020.bigint.d.ts"]
    ];

    /**
     * An array of supported "lib" reference file names used to determine the order for inclusion
     * when referenced, as well as for spelling suggestions. This ensures the correct ordering for
     * overload resolution when a type declared in one lib is extended by another.
     */
    /* @internal */
    export const libs = libEntries.map(entry => entry[0]);

    /**
     * A map of lib names to lib files. This map is used both for parsing the "lib" command line
     * option as well as for resolving lib reference directives.
     */
    /* @internal */
    export const libMap = createMapFromEntries(libEntries);

    // Watch related options
    /* @internal */
    export const optionsForWatch: CommandLineOption[] = [
        {
            name: "watchFile",
            type: createMapFromTemplate({
                fixedpollinginterval: WatchFileKind.FixedPollingInterval,
                prioritypollinginterval: WatchFileKind.PriorityPollingInterval,
                dynamicprioritypolling: WatchFileKind.DynamicPriorityPolling,
                usefsevents: WatchFileKind.UseFsEvents,
                usefseventsonparentdirectory: WatchFileKind.UseFsEventsOnParentDirectory,
            }),
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Specify_strategy_for_watching_file_Colon_FixedPollingInterval_default_PriorityPollingInterval_DynamicPriorityPolling_UseFsEvents_UseFsEventsOnParentDirectory,
        },
        {
            name: "watchDirectory",
            type: createMapFromTemplate({
                usefsevents: WatchDirectoryKind.UseFsEvents,
                fixedpollinginterval: WatchDirectoryKind.FixedPollingInterval,
                dynamicprioritypolling: WatchDirectoryKind.DynamicPriorityPolling,
            }),
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Specify_strategy_for_watching_directory_on_platforms_that_don_t_support_recursive_watching_natively_Colon_UseFsEvents_default_FixedPollingInterval_DynamicPriorityPolling,
        },
        {
            name: "fallbackPolling",
            type: createMapFromTemplate({
                fixedinterval: PollingWatchKind.FixedInterval,
                priorityinterval: PollingWatchKind.PriorityInterval,
                dynamicpriority: PollingWatchKind.DynamicPriority,
            }),
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Specify_strategy_for_creating_a_polling_watch_when_it_fails_to_create_using_file_system_events_Colon_FixedInterval_default_PriorityInterval_DynamicPriority,
        },
        {
            name: "synchronousWatchDirectory",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Synchronously_call_callbacks_and_update_the_state_of_directory_watchers_on_platforms_that_don_t_support_recursive_watching_natively,
        },
    ];

    /* @internal */
    export const commonOptionsWithBuild: CommandLineOption[] = [
        {
            name: "help",
            shortName: "h",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Print_this_message,
        },
        {
            name: "help",
            shortName: "?",
            type: "boolean"
        },
        {
            name: "watch",
            shortName: "w",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Watch_input_files,
        },
        {
            name: "preserveWatchOutput",
            type: "boolean",
            showInSimplifiedHelpView: false,
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Whether_to_keep_outdated_console_output_in_watch_mode_instead_of_clearing_the_screen,
        },
        {
            name: "listFiles",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Print_names_of_files_part_of_the_compilation
        },
        {
            name: "listEmittedFiles",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Print_names_of_generated_files_part_of_the_compilation
        },
        {
            name: "pretty",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Stylize_errors_and_messages_using_color_and_context_experimental
        },

        {
            name: "traceResolution",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Enable_tracing_of_the_name_resolution_process
        },
        {
            name: "diagnostics",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Show_diagnostic_information
        },
        {
            name: "extendedDiagnostics",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Show_verbose_diagnostic_information
        },
        {
            name: "generateCpuProfile",
            type: "string",
            isFilePath: true,
            paramType: Diagnostics.FILE_OR_DIRECTORY,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Generates_a_CPU_profile
        },
        {
            name: "incremental",
            shortName: "i",
            type: "boolean",
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Enable_incremental_compilation,
            transpileOptionValue: undefined
        },
        {
            name: "assumeChangesOnlyAffectDirectDependencies",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            affectsEmit: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Have_recompiles_in_incremental_and_watch_assume_that_changes_within_a_file_will_only_affect_files_directly_depending_on_it
        },
        {
            name: "locale",
            type: "string",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.The_locale_used_when_displaying_messages_to_the_user_e_g_en_us
        },
    ];

    /* @internal */
    export const optionDeclarations: CommandLineOption[] = [
        // CommandLine only options
        ...commonOptionsWithBuild,
        {
            name: "all",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Show_all_compiler_options,
        },
        {
            name: "version",
            shortName: "v",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Print_the_compiler_s_version,
        },
        {
            name: "init",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file,
        },
        {
            name: "project",
            shortName: "p",
            type: "string",
            isFilePath: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Command_line_Options,
            paramType: Diagnostics.FILE_OR_DIRECTORY,
            description: Diagnostics.Compile_the_project_given_the_path_to_its_configuration_file_or_to_a_folder_with_a_tsconfig_json,
        },
        {
            name: "build",
            type: "boolean",
            shortName: "b",
            showInSimplifiedHelpView: true,
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Build_one_or_more_projects_and_their_dependencies_if_out_of_date
        },
        {
            name: "showConfig",
            type: "boolean",
            category: Diagnostics.Command_line_Options,
            isCommandLineOnly: true,
            description: Diagnostics.Print_the_final_configuration_instead_of_building
        },
        {
            name: "listFilesOnly",
            type: "boolean",
            category: Diagnostics.Command_line_Options,
            affectsSemanticDiagnostics: true,
            affectsEmit: true,
            isCommandLineOnly: true,
            description: Diagnostics.Print_names_of_files_that_are_part_of_the_compilation_and_then_stop_processing
        },

        // Basic
        {
            name: "target",
            shortName: "t",
            type: createMapFromTemplate({
                es3: ScriptTarget.ES3,
                es5: ScriptTarget.ES5,
                es6: ScriptTarget.ES2015,
                es2015: ScriptTarget.ES2015,
                es2016: ScriptTarget.ES2016,
                es2017: ScriptTarget.ES2017,
                es2018: ScriptTarget.ES2018,
                es2019: ScriptTarget.ES2019,
                es2020: ScriptTarget.ES2020,
                esnext: ScriptTarget.ESNext,
            }),
            affectsSourceFile: true,
            affectsModuleResolution: true,
            affectsEmit: true,
            paramType: Diagnostics.VERSION,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Specify_ECMAScript_target_version_Colon_ES3_default_ES5_ES2015_ES2016_ES2017_ES2018_ES2019_ES2020_or_ESNEXT,
        },
        {
            name: "module",
            shortName: "m",
            type: createMapFromTemplate({
                none: ModuleKind.None,
                commonjs: ModuleKind.CommonJS,
                amd: ModuleKind.AMD,
                system: ModuleKind.System,
                umd: ModuleKind.UMD,
                es6: ModuleKind.ES2015,
                es2015: ModuleKind.ES2015,
                es2020: ModuleKind.ES2020,
                esnext: ModuleKind.ESNext
            }),
            affectsModuleResolution: true,
            affectsEmit: true,
            paramType: Diagnostics.KIND,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Specify_module_code_generation_Colon_none_commonjs_amd_system_umd_es2015_es2020_or_ESNext,
        },
        {
            name: "lib",
            type: "list",
            element: {
                name: "lib",
                type: libMap
            },
            affectsModuleResolution: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Specify_library_files_to_be_included_in_the_compilation,
            transpileOptionValue: undefined
        },
        {
            name: "allowJs",
            type: "boolean",
            affectsModuleResolution: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Allow_javascript_files_to_be_compiled
        },
        {
            name: "checkJs",
            type: "boolean",
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Report_errors_in_js_files
        },
        {
            name: "jsx",
            type: createMapFromTemplate({
                "preserve": JsxEmit.Preserve,
                "react-native": JsxEmit.ReactNative,
                "react": JsxEmit.React
            }),
            affectsSourceFile: true,
            paramType: Diagnostics.KIND,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Specify_JSX_code_generation_Colon_preserve_react_native_or_react,
        },
        {
            name: "declaration",
            shortName: "d",
            type: "boolean",
            affectsEmit: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Generates_corresponding_d_ts_file,
            transpileOptionValue: undefined
        },
        {
            name: "declarationMap",
            type: "boolean",
            affectsEmit: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Generates_a_sourcemap_for_each_corresponding_d_ts_file,
            transpileOptionValue: undefined
        },
        {
            name: "emitDeclarationOnly",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Only_emit_d_ts_declaration_files,
            transpileOptionValue: undefined
        },
        {
            name: "sourceMap",
            type: "boolean",
            affectsEmit: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Generates_corresponding_map_file,
        },
        {
            name: "outFile",
            type: "string",
            affectsEmit: true,
            isFilePath: true,
            paramType: Diagnostics.FILE,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Concatenate_and_emit_output_to_single_file,
            transpileOptionValue: undefined
        },
        {
            name: "outDir",
            type: "string",
            affectsEmit: true,
            isFilePath: true,
            paramType: Diagnostics.DIRECTORY,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Redirect_output_structure_to_the_directory,
        },
        {
            name: "rootDir",
            type: "string",
            affectsEmit: true,
            isFilePath: true,
            paramType: Diagnostics.LOCATION,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir,
        },
        {
            name: "composite",
            type: "boolean",
            affectsEmit: true,
            isTSConfigOnly: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Enable_project_compilation,
            transpileOptionValue: undefined
        },
        {
            name: "tsBuildInfoFile",
            type: "string",
            affectsEmit: true,
            isFilePath: true,
            paramType: Diagnostics.FILE,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Specify_file_to_store_incremental_compilation_information,
            transpileOptionValue: undefined
        },
        {
            name: "removeComments",
            type: "boolean",
            affectsEmit: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Do_not_emit_comments_to_output,
        },
        {
            name: "noEmit",
            type: "boolean",
            affectsEmit: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Do_not_emit_outputs,
            transpileOptionValue: undefined
        },
        {
            name: "importHelpers",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Import_emit_helpers_from_tslib
        },
        {
            name: "importsNotUsedAsValues",
            type: createMapFromTemplate({
                remove: importsNotUsedAsValues.Remove,
                preserve: importsNotUsedAsValues.Preserve,
                error: importsNotUsedAsValues.Error
            }),
            affectsEmit: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Specify_emit_Slashchecking_behavior_for_imports_that_are_only_used_for_types
        },
        {
            name: "downlevelIteration",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Provide_full_support_for_iterables_in_for_of_spread_and_destructuring_when_targeting_ES5_or_ES3
        },
        {
            name: "isolatedModules",
            type: "boolean",
            category: Diagnostics.Basic_Options,
            description: Diagnostics.Transpile_each_file_as_a_separate_module_similar_to_ts_transpileModule,
            transpileOptionValue: true
        },

        // Strict Type Checks
        {
            name: "strict",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: Diagnostics.Strict_Type_Checking_Options,
            description: Diagnostics.Enable_all_strict_type_checking_options
        },
        {
            name: "noImplicitAny",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            strictFlag: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Strict_Type_Checking_Options,
            description: Diagnostics.Raise_error_on_expressions_and_declarations_with_an_implied_any_type
        },
        {
            name: "strictNullChecks",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            strictFlag: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Strict_Type_Checking_Options,
            description: Diagnostics.Enable_strict_null_checks
        },
        {
            name: "strictFunctionTypes",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            strictFlag: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Strict_Type_Checking_Options,
            description: Diagnostics.Enable_strict_checking_of_function_types
        },
        {
            name: "strictBindCallApply",
            type: "boolean",
            strictFlag: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Strict_Type_Checking_Options,
            description: Diagnostics.Enable_strict_bind_call_and_apply_methods_on_functions
        },
        {
            name: "strictPropertyInitialization",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            strictFlag: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Strict_Type_Checking_Options,
            description: Diagnostics.Enable_strict_checking_of_property_initialization_in_classes
        },
        {
            name: "noImplicitThis",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            strictFlag: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Strict_Type_Checking_Options,
            description: Diagnostics.Raise_error_on_this_expressions_with_an_implied_any_type,
        },
        {
            name: "alwaysStrict",
            type: "boolean",
            affectsSourceFile: true,
            strictFlag: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Strict_Type_Checking_Options,
            description: Diagnostics.Parse_in_strict_mode_and_emit_use_strict_for_each_source_file
        },

        // Additional Checks
        {
            name: "noUnusedLocals",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Additional_Checks,
            description: Diagnostics.Report_errors_on_unused_locals,
        },
        {
            name: "noUnusedParameters",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Additional_Checks,
            description: Diagnostics.Report_errors_on_unused_parameters,
        },
        {
            name: "noImplicitReturns",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Additional_Checks,
            description: Diagnostics.Report_error_when_not_all_code_paths_in_function_return_a_value
        },
        {
            name: "noFallthroughCasesInSwitch",
            type: "boolean",
            affectsBindDiagnostics: true,
            affectsSemanticDiagnostics: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Additional_Checks,
            description: Diagnostics.Report_errors_for_fallthrough_cases_in_switch_statement
        },

        // Module Resolution
        {
            name: "moduleResolution",
            type: createMapFromTemplate({
                node: ModuleResolutionKind.NodeJs,
                classic: ModuleResolutionKind.Classic,
            }),
            affectsModuleResolution: true,
            paramType: Diagnostics.STRATEGY,
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.Specify_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6,
        },
        {
            name: "baseUrl",
            type: "string",
            affectsModuleResolution: true,
            isFilePath: true,
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.Base_directory_to_resolve_non_absolute_module_names
        },
        {
            // this option can only be specified in tsconfig.json
            // use type = object to copy the value as-is
            name: "paths",
            type: "object",
            affectsModuleResolution: true,
            isTSConfigOnly: true,
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.A_series_of_entries_which_re_map_imports_to_lookup_locations_relative_to_the_baseUrl,
            transpileOptionValue: undefined
        },
        {
            // this option can only be specified in tsconfig.json
            // use type = object to copy the value as-is
            name: "rootDirs",
            type: "list",
            isTSConfigOnly: true,
            element: {
                name: "rootDirs",
                type: "string",
                isFilePath: true
            },
            affectsModuleResolution: true,
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.List_of_root_folders_whose_combined_content_represents_the_structure_of_the_project_at_runtime,
            transpileOptionValue: undefined
        },
        {
            name: "typeRoots",
            type: "list",
            element: {
                name: "typeRoots",
                type: "string",
                isFilePath: true
            },
            affectsModuleResolution: true,
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.List_of_folders_to_include_type_definitions_from
        },
        {
            name: "types",
            type: "list",
            element: {
                name: "types",
                type: "string"
            },
            affectsModuleResolution: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.Type_declaration_files_to_be_included_in_compilation,
            transpileOptionValue: undefined
        },
        {
            name: "allowSyntheticDefaultImports",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typechecking
        },
        {
            name: "esModuleInterop",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            affectsEmit: true,
            showInSimplifiedHelpView: true,
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.Enables_emit_interoperability_between_CommonJS_and_ES_Modules_via_creation_of_namespace_objects_for_all_imports_Implies_allowSyntheticDefaultImports
        },
        {
            name: "preserveSymlinks",
            type: "boolean",
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.Do_not_resolve_the_real_path_of_symlinks,
        },
        {
            name: "allowUmdGlobalAccess",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            category: Diagnostics.Module_Resolution_Options,
            description: Diagnostics.Allow_accessing_UMD_globals_from_modules,
        },

        // Source Maps
        {
            name: "sourceRoot",
            type: "string",
            affectsEmit: true,
            paramType: Diagnostics.LOCATION,
            category: Diagnostics.Source_Map_Options,
            description: Diagnostics.Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations,
        },
        {
            name: "mapRoot",
            type: "string",
            affectsEmit: true,
            paramType: Diagnostics.LOCATION,
            category: Diagnostics.Source_Map_Options,
            description: Diagnostics.Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations,
        },
        {
            name: "inlineSourceMap",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Source_Map_Options,
            description: Diagnostics.Emit_a_single_file_with_source_maps_instead_of_having_a_separate_file
        },
        {
            name: "inlineSources",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Source_Map_Options,
            description: Diagnostics.Emit_the_source_alongside_the_sourcemaps_within_a_single_file_requires_inlineSourceMap_or_sourceMap_to_be_set
        },

        // Experimental
        {
            name: "experimentalDecorators",
            type: "boolean",
            category: Diagnostics.Experimental_Options,
            description: Diagnostics.Enables_experimental_support_for_ES7_decorators
        },
        {
            name: "emitDecoratorMetadata",
            type: "boolean",
            category: Diagnostics.Experimental_Options,
            description: Diagnostics.Enables_experimental_support_for_emitting_type_metadata_for_decorators
        },

        // Advanced
        {
            name: "jsxFactory",
            type: "string",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Specify_the_JSX_factory_function_to_use_when_targeting_react_JSX_emit_e_g_React_createElement_or_h
        },
        {
            name: "resolveJsonModule",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Include_modules_imported_with_json_extension
        },

        {
            name: "out",
            type: "string",
            affectsEmit: true,
            isFilePath: false, // This is intentionally broken to support compatability with existing tsconfig files
            // for correct behaviour, please use outFile
            category: Diagnostics.Advanced_Options,
            paramType: Diagnostics.FILE,
            description: Diagnostics.Deprecated_Use_outFile_instead_Concatenate_and_emit_output_to_single_file,
            transpileOptionValue: undefined
        },
        {
            name: "reactNamespace",
            type: "string",
            affectsEmit: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Deprecated_Use_jsxFactory_instead_Specify_the_object_invoked_for_createElement_when_targeting_react_JSX_emit
        },
        {
            name: "skipDefaultLibCheck",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Deprecated_Use_skipLibCheck_instead_Skip_type_checking_of_default_library_declaration_files
        },
        {
            name: "charset",
            type: "string",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.The_character_set_of_the_input_files
        },
        {
            name: "emitBOM",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Emit_a_UTF_8_Byte_Order_Mark_BOM_in_the_beginning_of_output_files
        },
        {
            name: "newLine",
            type: createMapFromTemplate({
                crlf: NewLineKind.CarriageReturnLineFeed,
                lf: NewLineKind.LineFeed
            }),
            affectsEmit: true,
            paramType: Diagnostics.NEWLINE,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix,
        },
        {
            name: "noErrorTruncation",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_truncate_error_messages
        },
        {
            name: "noLib",
            type: "boolean",
            affectsModuleResolution: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_include_the_default_library_file_lib_d_ts,
            // We are not returning a sourceFile for lib file when asked by the program,
            // so pass --noLib to avoid reporting a file not found error.
            transpileOptionValue: true
        },
        {
            name: "noResolve",
            type: "boolean",
            affectsModuleResolution: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_add_triple_slash_references_or_imported_modules_to_the_list_of_compiled_files,
            // We are not doing a full typecheck, we are not resolving the whole context,
            // so pass --noResolve to avoid reporting missing file errors.
            transpileOptionValue: true
        },
        {
            name: "stripInternal",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_emit_declarations_for_code_that_has_an_internal_annotation,
        },
        {
            name: "disableSizeLimit",
            type: "boolean",
            affectsSourceFile: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Disable_size_limitations_on_JavaScript_projects
        },
        {
            name: "disableSourceOfProjectReferenceRedirect",
            type: "boolean",
            isTSConfigOnly: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Disable_use_of_source_files_instead_of_declaration_files_from_referenced_projects
        },
        {
            name: "disableSolutionSearching",
            type: "boolean",
            isTSConfigOnly: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Disable_solution_searching_for_this_project
        },
        {
            name: "noImplicitUseStrict",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_emit_use_strict_directives_in_module_output
        },
        {
            name: "noEmitHelpers",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_generate_custom_helper_functions_like_extends_in_compiled_output
        },
        {
            name: "noEmitOnError",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_emit_outputs_if_any_errors_were_reported,
            transpileOptionValue: undefined
        },
        {
            name: "preserveConstEnums",
            type: "boolean",
            affectsEmit: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_erase_const_enum_declarations_in_generated_code
        },
        {
            name: "declarationDir",
            type: "string",
            affectsEmit: true,
            isFilePath: true,
            paramType: Diagnostics.DIRECTORY,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Output_directory_for_generated_declaration_files,
            transpileOptionValue: undefined
        },
        {
            name: "skipLibCheck",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Skip_type_checking_of_declaration_files,
        },
        {
            name: "allowUnusedLabels",
            type: "boolean",
            affectsBindDiagnostics: true,
            affectsSemanticDiagnostics: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_report_errors_on_unused_labels
        },
        {
            name: "allowUnreachableCode",
            type: "boolean",
            affectsBindDiagnostics: true,
            affectsSemanticDiagnostics: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Do_not_report_errors_on_unreachable_code
        },
        {
            name: "suppressExcessPropertyErrors",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Suppress_excess_property_checks_for_object_literals,
        },
        {
            name: "suppressImplicitAnyIndexErrors",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures,
        },
        {
            name: "forceConsistentCasingInFileNames",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Disallow_inconsistently_cased_references_to_the_same_file
        },
        {
            name: "maxNodeModuleJsDepth",
            type: "number",
            affectsModuleResolution: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files
        },
        {
            name: "noStrictGenericChecks",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Disable_strict_checking_of_generic_signatures_in_function_types,
        },
        {
            name: "useDefineForClassFields",
            type: "boolean",
            affectsSemanticDiagnostics: true,
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Emit_class_fields_with_Define_instead_of_Set,
        },
        {
            name: "keyofStringsOnly",
            type: "boolean",
            category: Diagnostics.Advanced_Options,
            description: Diagnostics.Resolve_keyof_to_string_valued_property_names_only_no_numbers_or_symbols,
        },
        {
            // A list of plugins to load in the language service
            name: "plugins",
            type: "list",
            isTSConfigOnly: true,
            element: {
                name: "plugin",
                type: "object"
            },
            description: Diagnostics.List_of_language_service_plugins
        },
    ];

    /* @internal */
    export const semanticDiagnosticsOptionDeclarations: readonly CommandLineOption[] =
        optionDeclarations.filter(option => !!option.affectsSemanticDiagnostics);

    /* @internal */
    export const affectsEmitOptionDeclarations: readonly CommandLineOption[] =
        optionDeclarations.filter(option => !!option.affectsEmit);

    /* @internal */
    export const moduleResolutionOptionDeclarations: readonly CommandLineOption[] =
        optionDeclarations.filter(option => !!option.affectsModuleResolution);

    /* @internal */
    export const sourceFileAffectingCompilerOptions: readonly CommandLineOption[] = optionDeclarations.filter(option =>
        !!option.affectsSourceFile || !!option.affectsModuleResolution || !!option.affectsBindDiagnostics);

    /* @internal */
    export const transpileOptionValueCompilerOptions: readonly CommandLineOption[] = optionDeclarations.filter(option =>
        hasProperty(option, "transpileOptionValue"));

    /* @internal */
    export const buildOpts: CommandLineOption[] = [
        ...commonOptionsWithBuild,
        {
            name: "verbose",
            shortName: "v",
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Enable_verbose_logging,
            type: "boolean"
        },
        {
            name: "dry",
            shortName: "d",
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Show_what_would_be_built_or_deleted_if_specified_with_clean,
            type: "boolean"
        },
        {
            name: "force",
            shortName: "f",
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Build_all_projects_including_those_that_appear_to_be_up_to_date,
            type: "boolean"
        },
        {
            name: "clean",
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Delete_the_outputs_of_all_projects,
            type: "boolean"
        }
    ];

    /* @internal */
    export const typeAcquisitionDeclarations: CommandLineOption[] = [
        {
            /* @deprecated typingOptions.enableAutoDiscovery
             * Use typeAcquisition.enable instead.
             */
            name: "enableAutoDiscovery",
            type: "boolean",
        },
        {
            name: "enable",
            type: "boolean",
        },
        {
            name: "include",
            type: "list",
            element: {
                name: "include",
                type: "string"
            }
        },
        {
            name: "exclude",
            type: "list",
            element: {
                name: "exclude",
                type: "string"
            }
        }
    ];

    /* @internal */
    export interface OptionsNameMap {
        optionsNameMap: Map<CommandLineOption>;
        shortOptionNames: Map<string>;
    }

    /*@internal*/
    export function createOptionNameMap(optionDeclarations: readonly CommandLineOption[]): OptionsNameMap {
        const optionsNameMap = createMap<CommandLineOption>();
        const shortOptionNames = createMap<string>();
        forEach(optionDeclarations, option => {
            optionsNameMap.set(option.name.toLowerCase(), option);
            if (option.shortName) {
                shortOptionNames.set(option.shortName, option.name);
            }
        });

        return { optionsNameMap, shortOptionNames };
    }

    let optionsNameMapCache: OptionsNameMap;

    /* @internal */
    export function getOptionsNameMap(): OptionsNameMap {
        return optionsNameMapCache || (optionsNameMapCache = createOptionNameMap(optionDeclarations));
    }

    /* @internal */
    export const defaultInitCompilerOptions: CompilerOptions = {
        module: ModuleKind.CommonJS,
        target: ScriptTarget.ES5,
        strict: true,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true
    };

    /* @internal */
    export function convertEnableAutoDiscoveryToEnable(typeAcquisition: TypeAcquisition): TypeAcquisition {
        // Convert deprecated typingOptions.enableAutoDiscovery to typeAcquisition.enable
        if (typeAcquisition && typeAcquisition.enableAutoDiscovery !== undefined && typeAcquisition.enable === undefined) {
            return {
                enable: typeAcquisition.enableAutoDiscovery,
                include: typeAcquisition.include || [],
                exclude: typeAcquisition.exclude || []
            };
        }
        return typeAcquisition;
    }

    /* @internal */
    export function createCompilerDiagnosticForInvalidCustomType(opt: CommandLineOptionOfCustomType): Diagnostic {
        return createDiagnosticForInvalidCustomType(opt, createCompilerDiagnostic);
    }

    function createDiagnosticForInvalidCustomType(opt: CommandLineOptionOfCustomType, createDiagnostic: (message: DiagnosticMessage, arg0: string, arg1: string) => Diagnostic): Diagnostic {
        const namesOfType = arrayFrom(opt.type.keys()).map(key => `'${key}'`).join(", ");
        return createDiagnostic(Diagnostics.Argument_for_0_option_must_be_Colon_1, `--${opt.name}`, namesOfType);
    }

    /* @internal */
    export function parseCustomTypeOption(opt: CommandLineOptionOfCustomType, value: string, errors: Push<Diagnostic>) {
        return convertJsonOptionOfCustomType(opt, trimString(value || ""), errors);
    }

    /* @internal */
    export function parseListTypeOption(opt: CommandLineOptionOfListType, value = "", errors: Push<Diagnostic>): (string | number)[] | undefined {
        value = trimString(value);
        if (startsWith(value, "-")) {
            return undefined;
        }
        if (value === "") {
            return [];
        }
        const values = value.split(",");
        switch (opt.element.type) {
            case "number":
                return map(values, parseInt);
            case "string":
                return map(values, v => v || "");
            default:
                return mapDefined(values, v => parseCustomTypeOption(<CommandLineOptionOfCustomType>opt.element, v, errors));
        }
    }

    interface OptionsBase {
        [option: string]: CompilerOptionsValue | TsConfigSourceFile | undefined;
    }

    interface ParseCommandLineWorkerDiagnostics extends DidYouMeanOptionsDiagnostics {
        getOptionsNameMap: () => OptionsNameMap;
        optionTypeMismatchDiagnostic: DiagnosticMessage;
    }

    function getOptionName(option: CommandLineOption) {
        return option.name;
    }

    function createUnknownOptionError(
        unknownOption: string,
        diagnostics: DidYouMeanOptionsDiagnostics,
        createDiagnostics: (message: DiagnosticMessage, arg0: string, arg1?: string) => Diagnostic,
        unknownOptionErrorText?: string
    ) {
        const possibleOption = getSpellingSuggestion(unknownOption, diagnostics.optionDeclarations, getOptionName);
        return possibleOption ?
            createDiagnostics(diagnostics.unknownDidYouMeanDiagnostic, unknownOptionErrorText || unknownOption, possibleOption.name) :
            createDiagnostics(diagnostics.unknownOptionDiagnostic, unknownOptionErrorText || unknownOption);
    }

    function parseCommandLineWorker(
        diagnostics: ParseCommandLineWorkerDiagnostics,
        commandLine: readonly string[],
        readFile?: (path: string) => string | undefined) {
        const options = {} as OptionsBase;
        let watchOptions: WatchOptions | undefined;
        const fileNames: string[] = [];
        const errors: Diagnostic[] = [];

        parseStrings(commandLine);
        return {
            options,
            watchOptions,
            fileNames,
            errors
        };

        function parseStrings(args: readonly string[]) {
            let i = 0;
            while (i < args.length) {
                const s = args[i];
                i++;
                if (s.charCodeAt(0) === CharacterCodes.at) {
                    parseResponseFile(s.slice(1));
                }
                else if (s.charCodeAt(0) === CharacterCodes.minus) {
                    const inputOptionName = s.slice(s.charCodeAt(1) === CharacterCodes.minus ? 2 : 1);
                    const opt = getOptionDeclarationFromName(diagnostics.getOptionsNameMap, inputOptionName, /*allowShort*/ true);
                    if (opt) {
                        i = parseOptionValue(args, i, diagnostics, opt, options, errors);
                    }
                    else {
                        const watchOpt = getOptionDeclarationFromName(watchOptionsDidYouMeanDiagnostics.getOptionsNameMap, inputOptionName, /*allowShort*/ true);
                        if (watchOpt) {
                            i = parseOptionValue(args, i, watchOptionsDidYouMeanDiagnostics, watchOpt, watchOptions || (watchOptions = {}), errors);
                        }
                        else {
                            errors.push(createUnknownOptionError(inputOptionName, diagnostics, createCompilerDiagnostic, s));
                        }
                    }
                }
                else {
                    fileNames.push(s);
                }
            }
        }

        function parseResponseFile(fileName: string) {
            const text = readFile ? readFile(fileName) : sys.readFile(fileName);

            if (!text) {
                errors.push(createCompilerDiagnostic(Diagnostics.File_0_not_found, fileName));
                return;
            }

            const args: string[] = [];
            let pos = 0;
            while (true) {
                while (pos < text.length && text.charCodeAt(pos) <= CharacterCodes.space) pos++;
                if (pos >= text.length) break;
                const start = pos;
                if (text.charCodeAt(start) === CharacterCodes.doubleQuote) {
                    pos++;
                    while (pos < text.length && text.charCodeAt(pos) !== CharacterCodes.doubleQuote) pos++;
                    if (pos < text.length) {
                        args.push(text.substring(start + 1, pos));
                        pos++;
                    }
                    else {
                        errors.push(createCompilerDiagnostic(Diagnostics.Unterminated_quoted_string_in_response_file_0, fileName));
                    }
                }
                else {
                    while (text.charCodeAt(pos) > CharacterCodes.space) pos++;
                    args.push(text.substring(start, pos));
                }
            }
            parseStrings(args);
        }
    }

    function parseOptionValue(
        args: readonly string[],
        i: number,
        diagnostics: ParseCommandLineWorkerDiagnostics,
        opt: CommandLineOption,
        options: OptionsBase,
        errors: Diagnostic[]
    ) {
        if (opt.isTSConfigOnly) {
            errors.push(createCompilerDiagnostic(Diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file, opt.name));
        }
        else {
            // Check to see if no argument was provided (e.g. "--locale" is the last command-line argument).
            if (!args[i] && opt.type !== "boolean") {
                errors.push(createCompilerDiagnostic(diagnostics.optionTypeMismatchDiagnostic, opt.name, getCompilerOptionValueTypeString(opt)));
            }

            switch (opt.type) {
                case "number":
                    options[opt.name] = parseInt(args[i]);
                    i++;
                    break;
                case "boolean":
                    // boolean flag has optional value true, false, others
                    const optValue = args[i];
                    options[opt.name] = optValue !== "false";
                    // consume next argument as boolean flag value
                    if (optValue === "false" || optValue === "true") {
                        i++;
                    }
                    break;
                case "string":
                    options[opt.name] = args[i] || "";
                    i++;
                    break;
                case "list":
                    const result = parseListTypeOption(opt, args[i], errors);
                    options[opt.name] = result || [];
                    if (result) {
                        i++;
                    }
                    break;
                // If not a primitive, the possible types are specified in what is effectively a map of options.
                default:
                    options[opt.name] = parseCustomTypeOption(<CommandLineOptionOfCustomType>opt, args[i], errors);
                    i++;
                    break;
            }
        }
        return i;
    }

    const compilerOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
        getOptionsNameMap,
        optionDeclarations,
        unknownOptionDiagnostic: Diagnostics.Unknown_compiler_option_0,
        unknownDidYouMeanDiagnostic: Diagnostics.Unknown_compiler_option_0_Did_you_mean_1,
        optionTypeMismatchDiagnostic: Diagnostics.Compiler_option_0_expects_an_argument
    };
    export function parseCommandLine(commandLine: readonly string[], readFile?: (path: string) => string | undefined): ParsedCommandLine {
        return parseCommandLineWorker(compilerOptionsDidYouMeanDiagnostics, commandLine, readFile);
    }

    /** @internal */
    export function getOptionFromName(optionName: string, allowShort?: boolean): CommandLineOption | undefined {
        return getOptionDeclarationFromName(getOptionsNameMap, optionName, allowShort);
    }

    function getOptionDeclarationFromName(getOptionNameMap: () => OptionsNameMap, optionName: string, allowShort = false): CommandLineOption | undefined {
        optionName = optionName.toLowerCase();
        const { optionsNameMap, shortOptionNames } = getOptionNameMap();
        // Try to translate short option names to their full equivalents.
        if (allowShort) {
            const short = shortOptionNames.get(optionName);
            if (short !== undefined) {
                optionName = short;
            }
        }
        return optionsNameMap.get(optionName);
    }

    /*@internal*/
    export interface ParsedBuildCommand {
        buildOptions: BuildOptions;
        watchOptions: WatchOptions | undefined;
        projects: string[];
        errors: Diagnostic[];
    }

    let buildOptionsNameMapCache: OptionsNameMap;
    function getBuildOptionsNameMap(): OptionsNameMap {
        return buildOptionsNameMapCache || (buildOptionsNameMapCache = createOptionNameMap(buildOpts));
    }

    const buildOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
        getOptionsNameMap: getBuildOptionsNameMap,
        optionDeclarations: buildOpts,
        unknownOptionDiagnostic: Diagnostics.Unknown_build_option_0,
        unknownDidYouMeanDiagnostic: Diagnostics.Unknown_build_option_0_Did_you_mean_1,
        optionTypeMismatchDiagnostic: Diagnostics.Build_option_0_requires_a_value_of_type_1
    };

    /*@internal*/
    export function parseBuildCommand(args: readonly string[]): ParsedBuildCommand {
        const { options, watchOptions, fileNames: projects, errors } = parseCommandLineWorker(
            buildOptionsDidYouMeanDiagnostics,
            args
        );
        const buildOptions = options as BuildOptions;

        if (projects.length === 0) {
            // tsc -b invoked with no extra arguments; act as if invoked with "tsc -b ."
            projects.push(".");
        }

        // Nonsensical combinations
        if (buildOptions.clean && buildOptions.force) {
            errors.push(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "clean", "force"));
        }
        if (buildOptions.clean && buildOptions.verbose) {
            errors.push(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "clean", "verbose"));
        }
        if (buildOptions.clean && buildOptions.watch) {
            errors.push(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "clean", "watch"));
        }
        if (buildOptions.watch && buildOptions.dry) {
            errors.push(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "watch", "dry"));
        }

        return { buildOptions, watchOptions, projects, errors };
    }

    /* @internal */
    export function getDiagnosticText(_message: DiagnosticMessage, ..._args: any[]): string {
        const diagnostic = createCompilerDiagnostic.apply(undefined, arguments);
        return <string>diagnostic.messageText;
    }

    export type DiagnosticReporter = (diagnostic: Diagnostic) => void;
    /**
     * Reports config file diagnostics
     */
    export interface ConfigFileDiagnosticsReporter {
        /**
         * Reports unrecoverable error when parsing config file
         */
        onUnRecoverableConfigFileDiagnostic: DiagnosticReporter;
    }

    /**
     * Interface extending ParseConfigHost to support ParseConfigFile that reads config file and reports errors
     */
    export interface ParseConfigFileHost extends ParseConfigHost, ConfigFileDiagnosticsReporter {
        getCurrentDirectory(): string;
    }

    /**
     * Reads the config file, reports errors if any and exits if the config file cannot be found
     */
    export function getParsedCommandLineOfConfigFile(
        configFileName: string,
        optionsToExtend: CompilerOptions,
        host: ParseConfigFileHost,
        extendedConfigCache?: Map<ExtendedConfigCacheEntry>,
        watchOptionsToExtend?: WatchOptions
    ): ParsedCommandLine | undefined {
        let configFileText: string | undefined;
        try {
            configFileText = host.readFile(configFileName);
        }
        catch (e) {
            const error = createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, configFileName, e.message);
            host.onUnRecoverableConfigFileDiagnostic(error);
            return undefined;
        }
        if (!configFileText) {
            const error = createCompilerDiagnostic(Diagnostics.File_0_not_found, configFileName);
            host.onUnRecoverableConfigFileDiagnostic(error);
            return undefined;
        }

        const result = parseJsonText(configFileName, configFileText);
        const cwd = host.getCurrentDirectory();
        result.path = toPath(configFileName, cwd, createGetCanonicalFileName(host.useCaseSensitiveFileNames));
        result.resolvedPath = result.path;
        result.originalFileName = result.fileName;
        return parseJsonSourceFileConfigFileContent(
            result,
            host,
            getNormalizedAbsolutePath(getDirectoryPath(configFileName), cwd),
            optionsToExtend,
            getNormalizedAbsolutePath(configFileName, cwd),
            /*resolutionStack*/ undefined,
            /*extraFileExtension*/ undefined,
            extendedConfigCache,
            watchOptionsToExtend
        );
    }

    /**
     * Read tsconfig.json file
     * @param fileName The path to the config file
     */
    export function readConfigFile(fileName: string, readFile: (path: string) => string | undefined): { config?: any; error?: Diagnostic } {
        const textOrDiagnostic = tryReadFile(fileName, readFile);
        return isString(textOrDiagnostic) ? parseConfigFileTextToJson(fileName, textOrDiagnostic) : { config: {}, error: textOrDiagnostic };
    }

    /**
     * Parse the text of the tsconfig.json file
     * @param fileName The path to the config file
     * @param jsonText The text of the config file
     */
    export function parseConfigFileTextToJson(fileName: string, jsonText: string): { config?: any; error?: Diagnostic } {
        const jsonSourceFile = parseJsonText(fileName, jsonText);
        return {
            config: convertToObject(jsonSourceFile, jsonSourceFile.parseDiagnostics),
            error: jsonSourceFile.parseDiagnostics.length ? jsonSourceFile.parseDiagnostics[0] : undefined
        };
    }

    /**
     * Read tsconfig.json file
     * @param fileName The path to the config file
     */
    export function readJsonConfigFile(fileName: string, readFile: (path: string) => string | undefined): TsConfigSourceFile {
        const textOrDiagnostic = tryReadFile(fileName, readFile);
        return isString(textOrDiagnostic) ? parseJsonText(fileName, textOrDiagnostic) : <TsConfigSourceFile>{ parseDiagnostics: [textOrDiagnostic] };
    }

    function tryReadFile(fileName: string, readFile: (path: string) => string | undefined): string | Diagnostic {
        let text: string | undefined;
        try {
            text = readFile(fileName);
        }
        catch (e) {
            return createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, e.message);
        }
        return text === undefined ? createCompilerDiagnostic(Diagnostics.The_specified_path_does_not_exist_Colon_0, fileName) : text;
    }

    function commandLineOptionsToMap(options: readonly CommandLineOption[]) {
        return arrayToMap(options, getOptionName);
    }

    const typeAcquisitionDidYouMeanDiagnostics: DidYouMeanOptionsDiagnostics = {
        optionDeclarations: typeAcquisitionDeclarations,
        unknownOptionDiagnostic: Diagnostics.Unknown_type_acquisition_option_0,
        unknownDidYouMeanDiagnostic: Diagnostics.Unknown_type_acquisition_option_0_Did_you_mean_1,
    };

    let watchOptionsNameMapCache: OptionsNameMap;
    function getWatchOptionsNameMap(): OptionsNameMap {
        return watchOptionsNameMapCache || (watchOptionsNameMapCache = createOptionNameMap(optionsForWatch));
    }
    const watchOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
        getOptionsNameMap: getWatchOptionsNameMap,
        optionDeclarations: optionsForWatch,
        unknownOptionDiagnostic: Diagnostics.Unknown_watch_option_0,
        unknownDidYouMeanDiagnostic: Diagnostics.Unknown_watch_option_0_Did_you_mean_1,
        optionTypeMismatchDiagnostic: Diagnostics.Watch_option_0_requires_a_value_of_type_1
    };

    let commandLineCompilerOptionsMapCache: Map<CommandLineOption>;
    function getCommandLineCompilerOptionsMap() {
        return commandLineCompilerOptionsMapCache || (commandLineCompilerOptionsMapCache = commandLineOptionsToMap(optionDeclarations));
    }
    let commandLineWatchOptionsMapCache: Map<CommandLineOption>;
    function getCommandLineWatchOptionsMap() {
        return commandLineWatchOptionsMapCache || (commandLineWatchOptionsMapCache = commandLineOptionsToMap(optionsForWatch));
    }
    let commandLineTypeAcquisitionMapCache: Map<CommandLineOption>;
    function getCommandLineTypeAcquisitionMap() {
        return commandLineTypeAcquisitionMapCache || (commandLineTypeAcquisitionMapCache = commandLineOptionsToMap(typeAcquisitionDeclarations));
    }

    let _tsconfigRootOptions: TsConfigOnlyOption;
    function getTsconfigRootOptionsMap() {
        if (_tsconfigRootOptions === undefined) {
            _tsconfigRootOptions = {
                name: undefined!, // should never be needed since this is root
                type: "object",
                elementOptions: commandLineOptionsToMap([
                    {
                        name: "compilerOptions",
                        type: "object",
                        elementOptions: getCommandLineCompilerOptionsMap(),
                        extraKeyDiagnostics: compilerOptionsDidYouMeanDiagnostics,
                    },
                    {
                        name: "watchOptions",
                        type: "object",
                        elementOptions: getCommandLineWatchOptionsMap(),
                        extraKeyDiagnostics: watchOptionsDidYouMeanDiagnostics,
                    },
                    {
                        name: "typingOptions",
                        type: "object",
                        elementOptions: getCommandLineTypeAcquisitionMap(),
                        extraKeyDiagnostics: typeAcquisitionDidYouMeanDiagnostics,
                    },
                    {
                        name: "typeAcquisition",
                        type: "object",
                        elementOptions: getCommandLineTypeAcquisitionMap(),
                        extraKeyDiagnostics: typeAcquisitionDidYouMeanDiagnostics
                    },
                    {
                        name: "extends",
                        type: "string"
                    },
                    {
                        name: "references",
                        type: "list",
                        element: {
                            name: "references",
                            type: "object"
                        }
                    },
                    {
                        name: "files",
                        type: "list",
                        element: {
                            name: "files",
                            type: "string"
                        }
                    },
                    {
                        name: "include",
                        type: "list",
                        element: {
                            name: "include",
                            type: "string"
                        }
                    },
                    {
                        name: "exclude",
                        type: "list",
                        element: {
                            name: "exclude",
                            type: "string"
                        }
                    },
                    compileOnSaveCommandLineOption
                ])
            };
        }
        return _tsconfigRootOptions;
    }

    /*@internal*/
    interface JsonConversionNotifier {
        /**
         * Notifies parent option object is being set with the optionKey and a valid optionValue
         * Currently it notifies only if there is element with type object (parentOption) and
         * has element's option declarations map associated with it
         * @param parentOption parent option name in which the option and value are being set
         * @param option option declaration which is being set with the value
         * @param value value of the option
         */
        onSetValidOptionKeyValueInParent(parentOption: string, option: CommandLineOption, value: CompilerOptionsValue): void;
        /**
         * Notify when valid root key value option is being set
         * @param key option key
         * @param keyNode node corresponding to node in the source file
         * @param value computed value of the key
         * @param ValueNode node corresponding to value in the source file
         */
        onSetValidOptionKeyValueInRoot(key: string, keyNode: PropertyName, value: CompilerOptionsValue, valueNode: Expression): void;
        /**
         * Notify when unknown root key value option is being set
         * @param key option key
         * @param keyNode node corresponding to node in the source file
         * @param value computed value of the key
         * @param ValueNode node corresponding to value in the source file
         */
        onSetUnknownOptionKeyValueInRoot(key: string, keyNode: PropertyName, value: CompilerOptionsValue, valueNode: Expression): void;
    }

    /**
     * Convert the json syntax tree into the json value
     */
    export function convertToObject(sourceFile: JsonSourceFile, errors: Push<Diagnostic>): any {
        return convertToObjectWorker(sourceFile, errors, /*returnValue*/ true, /*knownRootOptions*/ undefined, /*jsonConversionNotifier*/ undefined);
    }

    /**
     * Convert the json syntax tree into the json value and report errors
     * This returns the json value (apart from checking errors) only if returnValue provided is true.
     * Otherwise it just checks the errors and returns undefined
     */
    /*@internal*/
    export function convertToObjectWorker(
        sourceFile: JsonSourceFile,
        errors: Push<Diagnostic>,
        returnValue: boolean,
        knownRootOptions: CommandLineOption | undefined,
        jsonConversionNotifier: JsonConversionNotifier | undefined): any {
        if (!sourceFile.statements.length) {
            return returnValue ? {} : undefined;
        }

        return convertPropertyValueToJson(sourceFile.statements[0].expression, knownRootOptions);

        function isRootOptionMap(knownOptions: Map<CommandLineOption> | undefined) {
            return knownRootOptions && (knownRootOptions as TsConfigOnlyOption).elementOptions === knownOptions;
        }

        function convertObjectLiteralExpressionToJson(
            node: ObjectLiteralExpression,
            knownOptions: Map<CommandLineOption> | undefined,
            extraKeyDiagnostics: DidYouMeanOptionsDiagnostics | undefined,
            parentOption: string | undefined
        ): any {
            const result: any = returnValue ? {} : undefined;
            for (const element of node.properties) {
                if (element.kind !== SyntaxKind.PropertyAssignment) {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element, Diagnostics.Property_assignment_expected));
                    continue;
                }

                if (element.questionToken) {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element.questionToken, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, "?"));
                }
                if (!isDoubleQuotedString(element.name)) {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element.name, Diagnostics.String_literal_with_double_quotes_expected));
                }

                const textOfKey = getTextOfPropertyName(element.name);
                const keyText = textOfKey && unescapeLeadingUnderscores(textOfKey);
                const option = keyText && knownOptions ? knownOptions.get(keyText) : undefined;
                if (keyText && extraKeyDiagnostics && !option) {
                    if (knownOptions) {
                        errors.push(createUnknownOptionError(
                            keyText,
                            extraKeyDiagnostics,
                            (message, arg0, arg1) => createDiagnosticForNodeInSourceFile(sourceFile, element.name, message, arg0, arg1)
                        ));
                    }
                    else {
                        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element.name, extraKeyDiagnostics.unknownOptionDiagnostic, keyText));
                    }
                }
                const value = convertPropertyValueToJson(element.initializer, option);
                if (typeof keyText !== "undefined") {
                    if (returnValue) {
                        result[keyText] = value;
                    }
                    // Notify key value set, if user asked for it
                    if (jsonConversionNotifier &&
                        // Current callbacks are only on known parent option or if we are setting values in the root
                        (parentOption || isRootOptionMap(knownOptions))) {
                        const isValidOptionValue = isCompilerOptionsValue(option, value);
                        if (parentOption) {
                            if (isValidOptionValue) {
                                // Notify option set in the parent if its a valid option value
                                jsonConversionNotifier.onSetValidOptionKeyValueInParent(parentOption, option!, value);
                            }
                        }
                        else if (isRootOptionMap(knownOptions)) {
                            if (isValidOptionValue) {
                                // Notify about the valid root key value being set
                                jsonConversionNotifier.onSetValidOptionKeyValueInRoot(keyText, element.name, value, element.initializer);
                            }
                            else if (!option) {
                                // Notify about the unknown root key value being set
                                jsonConversionNotifier.onSetUnknownOptionKeyValueInRoot(keyText, element.name, value, element.initializer);
                            }
                        }
                    }
                }
            }
            return result;
        }

        function convertArrayLiteralExpressionToJson(
            elements: NodeArray<Expression>,
            elementOption: CommandLineOption | undefined
        ): any[] | void {
            if (!returnValue) {
                return elements.forEach(element => convertPropertyValueToJson(element, elementOption));
            }

            // Filter out invalid values
            return filter(elements.map(element => convertPropertyValueToJson(element, elementOption)), v => v !== undefined);
        }

        function convertPropertyValueToJson(valueExpression: Expression, option: CommandLineOption | undefined): any {
            switch (valueExpression.kind) {
                case SyntaxKind.TrueKeyword:
                    reportInvalidOptionValue(option && option.type !== "boolean");
                    return true;

                case SyntaxKind.FalseKeyword:
                    reportInvalidOptionValue(option && option.type !== "boolean");
                    return false;

                case SyntaxKind.NullKeyword:
                    reportInvalidOptionValue(option && option.name === "extends"); // "extends" is the only option we don't allow null/undefined for
                    return null; // eslint-disable-line no-null/no-null

                case SyntaxKind.StringLiteral:
                    if (!isDoubleQuotedString(valueExpression)) {
                        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.String_literal_with_double_quotes_expected));
                    }
                    reportInvalidOptionValue(option && (isString(option.type) && option.type !== "string"));
                    const text = (<StringLiteral>valueExpression).text;
                    if (option && !isString(option.type)) {
                        const customOption = <CommandLineOptionOfCustomType>option;
                        // Validate custom option type
                        if (!customOption.type.has(text.toLowerCase())) {
                            errors.push(
                                createDiagnosticForInvalidCustomType(
                                    customOption,
                                    (message, arg0, arg1) => createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, message, arg0, arg1)
                                )
                            );
                        }
                    }
                    return text;

                case SyntaxKind.NumericLiteral:
                    reportInvalidOptionValue(option && option.type !== "number");
                    return Number((<NumericLiteral>valueExpression).text);

                case SyntaxKind.PrefixUnaryExpression:
                    if ((<PrefixUnaryExpression>valueExpression).operator !== SyntaxKind.MinusToken || (<PrefixUnaryExpression>valueExpression).operand.kind !== SyntaxKind.NumericLiteral) {
                        break; // not valid JSON syntax
                    }
                    reportInvalidOptionValue(option && option.type !== "number");
                    return -Number((<NumericLiteral>(<PrefixUnaryExpression>valueExpression).operand).text);

                case SyntaxKind.ObjectLiteralExpression:
                    reportInvalidOptionValue(option && option.type !== "object");
                    const objectLiteralExpression = <ObjectLiteralExpression>valueExpression;

                    // Currently having element option declaration in the tsconfig with type "object"
                    // determines if it needs onSetValidOptionKeyValueInParent callback or not
                    // At moment there are only "compilerOptions", "typeAcquisition" and "typingOptions"
                    // that satifies it and need it to modify options set in them (for normalizing file paths)
                    // vs what we set in the json
                    // If need arises, we can modify this interface and callbacks as needed
                    if (option) {
                        const { elementOptions, extraKeyDiagnostics, name: optionName } = <TsConfigOnlyOption>option;
                        return convertObjectLiteralExpressionToJson(objectLiteralExpression,
                            elementOptions, extraKeyDiagnostics, optionName);
                    }
                    else {
                        return convertObjectLiteralExpressionToJson(
                            objectLiteralExpression, /* knownOptions*/ undefined,
                            /*extraKeyDiagnosticMessage */ undefined, /*parentOption*/ undefined);
                    }

                case SyntaxKind.ArrayLiteralExpression:
                    reportInvalidOptionValue(option && option.type !== "list");
                    return convertArrayLiteralExpressionToJson(
                        (<ArrayLiteralExpression>valueExpression).elements,
                        option && (<CommandLineOptionOfListType>option).element);
            }

            // Not in expected format
            if (option) {
                reportInvalidOptionValue(/*isError*/ true);
            }
            else {
                errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_literal));
            }

            return undefined;

            function reportInvalidOptionValue(isError: boolean | undefined) {
                if (isError) {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.Compiler_option_0_requires_a_value_of_type_1, option!.name, getCompilerOptionValueTypeString(option!)));
                }
            }
        }

        function isDoubleQuotedString(node: Node): boolean {
            return isStringLiteral(node) && isStringDoubleQuoted(node, sourceFile);
        }
    }

    function getCompilerOptionValueTypeString(option: CommandLineOption) {
        return option.type === "list" ?
            "Array" :
            isString(option.type) ? option.type : "string";
    }

    function isCompilerOptionsValue(option: CommandLineOption | undefined, value: any): value is CompilerOptionsValue {
        if (option) {
            if (isNullOrUndefined(value)) return true; // All options are undefinable/nullable
            if (option.type === "list") {
                return isArray(value);
            }
            const expectedType = isString(option.type) ? option.type : "string";
            return typeof value === expectedType;
        }
        return false;
    }

    /** @internal */
    export interface TSConfig {
        compilerOptions: CompilerOptions;
        compileOnSave: boolean | undefined;
        exclude?: readonly string[];
        files: readonly string[] | undefined;
        include?: readonly string[];
        references: readonly ProjectReference[] | undefined;
    }

    /** @internal */
    export interface ConvertToTSConfigHost {
        getCurrentDirectory(): string;
        useCaseSensitiveFileNames: boolean;
    }

    /**
     * Generate an uncommented, complete tsconfig for use with "--showConfig"
     * @param configParseResult options to be generated into tsconfig.json
     * @param configFileName name of the parsed config file - output paths will be generated relative to this
     * @param host provides current directory and case sensitivity services
     */
    /** @internal */
    export function convertToTSConfig(configParseResult: ParsedCommandLine, configFileName: string, host: ConvertToTSConfigHost): TSConfig {
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames);
        const files = map(
            filter(
                configParseResult.fileNames,
                (!configParseResult.configFileSpecs || !configParseResult.configFileSpecs.validatedIncludeSpecs) ? _ => true : matchesSpecs(
                    configFileName,
                    configParseResult.configFileSpecs.validatedIncludeSpecs,
                    configParseResult.configFileSpecs.validatedExcludeSpecs,
                    host,
                )
            ),
            f => getRelativePathFromFile(getNormalizedAbsolutePath(configFileName, host.getCurrentDirectory()), getNormalizedAbsolutePath(f, host.getCurrentDirectory()), getCanonicalFileName)
        );
        const optionMap = serializeCompilerOptions(configParseResult.options, { configFilePath: getNormalizedAbsolutePath(configFileName, host.getCurrentDirectory()), useCaseSensitiveFileNames: host.useCaseSensitiveFileNames });
        const watchOptionMap = configParseResult.watchOptions && serializeWatchOptions(configParseResult.watchOptions);
        const config = {
            compilerOptions: {
                ...optionMapToObject(optionMap),
                showConfig: undefined,
                configFile: undefined,
                configFilePath: undefined,
                help: undefined,
                init: undefined,
                listFiles: undefined,
                listEmittedFiles: undefined,
                project: undefined,
                build: undefined,
                version: undefined,
            },
            watchOptions: watchOptionMap && optionMapToObject(watchOptionMap),
            references: map(configParseResult.projectReferences, r => ({ ...r, path: r.originalPath ? r.originalPath : "", originalPath: undefined })),
            files: length(files) ? files : undefined,
            ...(configParseResult.configFileSpecs ? {
                include: filterSameAsDefaultInclude(configParseResult.configFileSpecs.validatedIncludeSpecs),
                exclude: configParseResult.configFileSpecs.validatedExcludeSpecs
            } : {}),
            compileOnSave: !!configParseResult.compileOnSave ? true : undefined
        };
        return config;
    }

    function optionMapToObject(optionMap: Map<CompilerOptionsValue>): object {
        return {
            ...arrayFrom(optionMap.entries()).reduce((prev, cur) => ({ ...prev, [cur[0]]: cur[1] }), {}),
        };
    }

    function filterSameAsDefaultInclude(specs: readonly string[] | undefined) {
        if (!length(specs)) return undefined;
        if (length(specs) !== 1) return specs;
        if (specs![0] === "**/*") return undefined;
        return specs;
    }

    function matchesSpecs(path: string, includeSpecs: readonly string[] | undefined, excludeSpecs: readonly string[] | undefined, host: ConvertToTSConfigHost): (path: string) => boolean {
        if (!includeSpecs) return _ => true;
        const patterns = getFileMatcherPatterns(path, excludeSpecs, includeSpecs, host.useCaseSensitiveFileNames, host.getCurrentDirectory());
        const excludeRe = patterns.excludePattern && getRegexFromPattern(patterns.excludePattern, host.useCaseSensitiveFileNames);
        const includeRe = patterns.includeFilePattern && getRegexFromPattern(patterns.includeFilePattern, host.useCaseSensitiveFileNames);
        if (includeRe) {
            if (excludeRe) {
                return path => !(includeRe.test(path) && !excludeRe.test(path));
            }
            return path => !includeRe.test(path);
        }
        if (excludeRe) {
            return path => excludeRe.test(path);
        }
        return _ => true;
    }

    function getCustomTypeMapOfCommandLineOption(optionDefinition: CommandLineOption): Map<string | number> | undefined {
        if (optionDefinition.type === "string" || optionDefinition.type === "number" || optionDefinition.type === "boolean" || optionDefinition.type === "object") {
            // this is of a type CommandLineOptionOfPrimitiveType
            return undefined;
        }
        else if (optionDefinition.type === "list") {
            return getCustomTypeMapOfCommandLineOption(optionDefinition.element);
        }
        else {
            return (<CommandLineOptionOfCustomType>optionDefinition).type;
        }
    }

    function getNameOfCompilerOptionValue(value: CompilerOptionsValue, customTypeMap: Map<string | number>): string | undefined {
        // There is a typeMap associated with this command-line option so use it to map value back to its name
        return forEachEntry(customTypeMap, (mapValue, key) => {
            if (mapValue === value) {
                return key;
            }
        });
    }

    function serializeCompilerOptions(
        options: CompilerOptions,
        pathOptions?: { configFilePath: string, useCaseSensitiveFileNames: boolean }
    ): Map<CompilerOptionsValue> {
        return serializeOptionBaseObject(options, getOptionsNameMap(), pathOptions);
    }

    function serializeWatchOptions(options: WatchOptions) {
        return serializeOptionBaseObject(options, getWatchOptionsNameMap());
    }

    function serializeOptionBaseObject(
        options: OptionsBase,
        { optionsNameMap }: OptionsNameMap,
        pathOptions?: { configFilePath: string, useCaseSensitiveFileNames: boolean }
    ): Map<CompilerOptionsValue> {
        const result = createMap<CompilerOptionsValue>();
        const getCanonicalFileName = pathOptions && createGetCanonicalFileName(pathOptions.useCaseSensitiveFileNames);

        for (const name in options) {
            if (hasProperty(options, name)) {
                // tsconfig only options cannot be specified via command line,
                // so we can assume that only types that can appear here string | number | boolean
                if (optionsNameMap.has(name) && optionsNameMap.get(name)!.category === Diagnostics.Command_line_Options) {
                    continue;
                }
                const value = <CompilerOptionsValue>options[name];
                const optionDefinition = optionsNameMap.get(name.toLowerCase());
                if (optionDefinition) {
                    const customTypeMap = getCustomTypeMapOfCommandLineOption(optionDefinition);
                    if (!customTypeMap) {
                        // There is no map associated with this compiler option then use the value as-is
                        // This is the case if the value is expect to be string, number, boolean or list of string
                        if (pathOptions && optionDefinition.isFilePath) {
                            result.set(name, getRelativePathFromFile(pathOptions.configFilePath, getNormalizedAbsolutePath(value as string, getDirectoryPath(pathOptions.configFilePath)), getCanonicalFileName!));
                        }
                        else {
                            result.set(name, value);
                        }
                    }
                    else {
                        if (optionDefinition.type === "list") {
                            result.set(name, (value as readonly (string | number)[]).map(element => getNameOfCompilerOptionValue(element, customTypeMap)!)); // TODO: GH#18217
                        }
                        else {
                            // There is a typeMap associated with this command-line option so use it to map value back to its name
                            result.set(name, getNameOfCompilerOptionValue(value, customTypeMap));
                        }
                    }
                }
            }
        }
        return result;
    }

    /**
     * Generate tsconfig configuration when running command line "--init"
     * @param options commandlineOptions to be generated into tsconfig.json
     * @param fileNames array of filenames to be generated into tsconfig.json
     */
    /* @internal */
    export function generateTSConfig(options: CompilerOptions, fileNames: readonly string[], newLine: string): string {
        const compilerOptions = extend(options, defaultInitCompilerOptions);
        const compilerOptionsMap = serializeCompilerOptions(compilerOptions);
        return writeConfigurations();

        function getDefaultValueForOption(option: CommandLineOption) {
            switch (option.type) {
                case "number":
                    return 1;
                case "boolean":
                    return true;
                case "string":
                    return option.isFilePath ? "./" : "";
                case "list":
                    return [];
                case "object":
                    return {};
                default:
                    const iterResult = option.type.keys().next();
                    if (!iterResult.done) return iterResult.value;
                    return Debug.fail("Expected 'option.type' to have entries.");
            }
        }

        function makePadding(paddingLength: number): string {
            return Array(paddingLength + 1).join(" ");
        }

        function isAllowedOption({ category, name }: CommandLineOption): boolean {
            // Skip options which do not have a category or have category `Command_line_Options`
            // Exclude all possible `Advanced_Options` in tsconfig.json which were NOT defined in command line
            return category !== undefined
                && category !== Diagnostics.Command_line_Options
                && (category !== Diagnostics.Advanced_Options || compilerOptionsMap.has(name));
        }

        function writeConfigurations() {
            // Filter applicable options to place in the file
            const categorizedOptions = createMultiMap<CommandLineOption>();
            for (const option of optionDeclarations) {
                const { category } = option;

                if (isAllowedOption(option)) {
                    categorizedOptions.add(getLocaleSpecificMessage(category!), option);
                }
            }

            // Serialize all options and their descriptions
            let marginLength = 0;
            let seenKnownKeys = 0;
            const nameColumn: string[] = [];
            const descriptionColumn: string[] = [];
            categorizedOptions.forEach((options, category) => {
                if (nameColumn.length !== 0) {
                    nameColumn.push("");
                    descriptionColumn.push("");
                }
                nameColumn.push(`/* ${category} */`);
                descriptionColumn.push("");
                for (const option of options) {
                    let optionName;
                    if (compilerOptionsMap.has(option.name)) {
                        optionName = `"${option.name}": ${JSON.stringify(compilerOptionsMap.get(option.name))}${(seenKnownKeys += 1) === compilerOptionsMap.size ? "" : ","}`;
                    }
                    else {
                        optionName = `// "${option.name}": ${JSON.stringify(getDefaultValueForOption(option))},`;
                    }
                    nameColumn.push(optionName);
                    descriptionColumn.push(`/* ${option.description && getLocaleSpecificMessage(option.description) || option.name} */`);
                    marginLength = Math.max(optionName.length, marginLength);
                }
            });

            // Write the output
            const tab = makePadding(2);
            const result: string[] = [];
            result.push(`{`);
            result.push(`${tab}"compilerOptions": {`);
            // Print out each row, aligning all the descriptions on the same column.
            for (let i = 0; i < nameColumn.length; i++) {
                const optionName = nameColumn[i];
                const description = descriptionColumn[i];
                result.push(optionName && `${tab}${tab}${optionName}${description && (makePadding(marginLength - optionName.length + 2) + description)}`);
            }
            if (fileNames.length) {
                result.push(`${tab}},`);
                result.push(`${tab}"files": [`);
                for (let i = 0; i < fileNames.length; i++) {
                    result.push(`${tab}${tab}${JSON.stringify(fileNames[i])}${i === fileNames.length - 1 ? "" : ","}`);
                }
                result.push(`${tab}]`);
            }
            else {
                result.push(`${tab}}`);
            }
            result.push(`}`);

            return result.join(newLine) + newLine;
        }
    }

    /* @internal */
    export function convertToOptionsWithAbsolutePaths(options: CompilerOptions, toAbsolutePath: (path: string) => string) {
        const result: CompilerOptions = {};
        const optionsNameMap = getOptionsNameMap().optionsNameMap;

        for (const name in options) {
            if (hasProperty(options, name)) {
                result[name] = convertToOptionValueWithAbsolutePaths(
                    optionsNameMap.get(name.toLowerCase()),
                    options[name] as CompilerOptionsValue,
                    toAbsolutePath
                );
            }
        }
        if (result.configFilePath) {
            result.configFilePath = toAbsolutePath(result.configFilePath);
        }
        return result;
    }

    function convertToOptionValueWithAbsolutePaths(option: CommandLineOption | undefined, value: CompilerOptionsValue, toAbsolutePath: (path: string) => string) {
        if (option) {
            if (option.type === "list") {
                const values = value as readonly (string | number)[];
                if (option.element.isFilePath && values.length) {
                    return values.map(toAbsolutePath);
                }
            }
            else if (option.isFilePath) {
                return toAbsolutePath(value as string);
            }
        }
        return value;
    }

    /**
     * Parse the contents of a config file (tsconfig.json).
     * @param json The contents of the config file to parse
     * @param host Instance of ParseConfigHost used to enumerate files in folder.
     * @param basePath A root directory to resolve relative path entries in the config
     *    file to. e.g. outDir
     */
    export function parseJsonConfigFileContent(json: any, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], extendedConfigCache?: Map<ExtendedConfigCacheEntry>, existingWatchOptions?: WatchOptions): ParsedCommandLine {
        return parseJsonConfigFileContentWorker(json, /*sourceFile*/ undefined, host, basePath, existingOptions, existingWatchOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache);
    }

    /**
     * Parse the contents of a config file (tsconfig.json).
     * @param jsonNode The contents of the config file to parse
     * @param host Instance of ParseConfigHost used to enumerate files in folder.
     * @param basePath A root directory to resolve relative path entries in the config
     *    file to. e.g. outDir
     */
    export function parseJsonSourceFileConfigFileContent(sourceFile: TsConfigSourceFile, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], extendedConfigCache?: Map<ExtendedConfigCacheEntry>, existingWatchOptions?: WatchOptions): ParsedCommandLine {
        return parseJsonConfigFileContentWorker(/*json*/ undefined, sourceFile, host, basePath, existingOptions, existingWatchOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache);
    }

    /*@internal*/
    export function setConfigFileInOptions(options: CompilerOptions, configFile: TsConfigSourceFile | undefined) {
        if (configFile) {
            Object.defineProperty(options, "configFile", { enumerable: false, writable: false, value: configFile });
        }
    }

    function isNullOrUndefined(x: any): x is null | undefined {
        return x === undefined || x === null; // eslint-disable-line no-null/no-null
    }

    function directoryOfCombinedPath(fileName: string, basePath: string) {
        // Use the `getNormalizedAbsolutePath` function to avoid canonicalizing the path, as it must remain noncanonical
        // until consistent casing errors are reported
        return getDirectoryPath(getNormalizedAbsolutePath(fileName, basePath));
    }

    /**
     * Parse the contents of a config file from json or json source file (tsconfig.json).
     * @param json The contents of the config file to parse
     * @param sourceFile sourceFile corresponding to the Json
     * @param host Instance of ParseConfigHost used to enumerate files in folder.
     * @param basePath A root directory to resolve relative path entries in the config
     *    file to. e.g. outDir
     * @param resolutionStack Only present for backwards-compatibility. Should be empty.
     */
    function parseJsonConfigFileContentWorker(
        json: any,
        sourceFile: TsConfigSourceFile | undefined,
        host: ParseConfigHost,
        basePath: string,
        existingOptions: CompilerOptions = {},
        existingWatchOptions: WatchOptions | undefined,
        configFileName?: string,
        resolutionStack: Path[] = [],
        extraFileExtensions: readonly FileExtensionInfo[] = [],
        extendedConfigCache?: Map<ExtendedConfigCacheEntry>
    ): ParsedCommandLine {
        Debug.assert((json === undefined && sourceFile !== undefined) || (json !== undefined && sourceFile === undefined));
        const errors: Diagnostic[] = [];

        const parsedConfig = parseConfig(json, sourceFile, host, basePath, configFileName, resolutionStack, errors, extendedConfigCache);
        const { raw } = parsedConfig;
        const options = extend(existingOptions, parsedConfig.options || {});
        const watchOptions = existingWatchOptions && parsedConfig.watchOptions ?
            extend(existingWatchOptions, parsedConfig.watchOptions) :
            parsedConfig.watchOptions || existingWatchOptions;

        options.configFilePath = configFileName && normalizeSlashes(configFileName);
        setConfigFileInOptions(options, sourceFile);
        let projectReferences: ProjectReference[] | undefined;
        const { fileNames, wildcardDirectories, spec } = getFileNames();
        return {
            options,
            watchOptions,
            fileNames,
            projectReferences,
            typeAcquisition: parsedConfig.typeAcquisition || getDefaultTypeAcquisition(),
            raw,
            errors,
            wildcardDirectories,
            compileOnSave: !!raw.compileOnSave,
            configFileSpecs: spec
        };

        function getFileNames(): ExpandResult {
            let filesSpecs: readonly string[] | undefined;
            if (hasProperty(raw, "files") && !isNullOrUndefined(raw.files)) {
                if (isArray(raw.files)) {
                    filesSpecs = <readonly string[]>raw.files;
                    const hasReferences = hasProperty(raw, "references") && !isNullOrUndefined(raw.references);
                    const hasZeroOrNoReferences = !hasReferences || raw.references.length === 0;
                    const hasExtends = hasProperty(raw, "extends");
                    if (filesSpecs.length === 0 && hasZeroOrNoReferences && !hasExtends) {
                        if (sourceFile) {
                            const fileName = configFileName || "tsconfig.json";
                            const diagnosticMessage = Diagnostics.The_files_list_in_config_file_0_is_empty;
                            const nodeValue = firstDefined(getTsConfigPropArray(sourceFile, "files"), property => property.initializer);
                            const error = nodeValue
                                ? createDiagnosticForNodeInSourceFile(sourceFile, nodeValue, diagnosticMessage, fileName)
                                : createCompilerDiagnostic(diagnosticMessage, fileName);
                            errors.push(error);
                        }
                        else {
                            createCompilerDiagnosticOnlyIfJson(Diagnostics.The_files_list_in_config_file_0_is_empty, configFileName || "tsconfig.json");
                        }
                    }
                }
                else {
                    createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "files", "Array");
                }
            }

            let includeSpecs: readonly string[] | undefined;
            if (hasProperty(raw, "include") && !isNullOrUndefined(raw.include)) {
                if (isArray(raw.include)) {
                    includeSpecs = <readonly string[]>raw.include;
                }
                else {
                    createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "include", "Array");
                }
            }

            let excludeSpecs: readonly string[] | undefined;
            if (hasProperty(raw, "exclude") && !isNullOrUndefined(raw.exclude)) {
                if (isArray(raw.exclude)) {
                    excludeSpecs = <readonly string[]>raw.exclude;
                }
                else {
                    createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "exclude", "Array");
                }
            }
            else if (raw.compilerOptions) {
                const outDir = raw.compilerOptions.outDir;
                const declarationDir = raw.compilerOptions.declarationDir;

                if (outDir || declarationDir) {
                    excludeSpecs = [outDir, declarationDir].filter(d => !!d);
                }
            }

            if (filesSpecs === undefined && includeSpecs === undefined) {
                includeSpecs = ["**/*"];
            }

            const result = matchFileNames(filesSpecs, includeSpecs, excludeSpecs, configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath, options, host, errors, extraFileExtensions, sourceFile);
            if (shouldReportNoInputFiles(result, canJsonReportNoInutFiles(raw), resolutionStack)) {
                errors.push(getErrorForNoInputFiles(result.spec, configFileName));
            }

            if (hasProperty(raw, "references") && !isNullOrUndefined(raw.references)) {
                if (isArray(raw.references)) {
                    for (const ref of raw.references) {
                        if (typeof ref.path !== "string") {
                            createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "reference.path", "string");
                        }
                        else {
                            (projectReferences || (projectReferences = [])).push({
                                path: getNormalizedAbsolutePath(ref.path, basePath),
                                originalPath: ref.path,
                                prepend: ref.prepend,
                                circular: ref.circular
                            });
                        }
                    }
                }
                else {
                    createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "references", "Array");
                }
            }

            return result;
        }

        function createCompilerDiagnosticOnlyIfJson(message: DiagnosticMessage, arg0?: string, arg1?: string) {
            if (!sourceFile) {
                errors.push(createCompilerDiagnostic(message, arg0, arg1));
            }
        }
    }

    function isErrorNoInputFiles(error: Diagnostic) {
        return error.code === Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code;
    }

    function getErrorForNoInputFiles({ includeSpecs, excludeSpecs }: ConfigFileSpecs, configFileName: string | undefined) {
        return createCompilerDiagnostic(
            Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
            configFileName || "tsconfig.json",
            JSON.stringify(includeSpecs || []),
            JSON.stringify(excludeSpecs || []));
    }

    function shouldReportNoInputFiles(result: ExpandResult, canJsonReportNoInutFiles: boolean, resolutionStack?: Path[]) {
        return result.fileNames.length === 0 && canJsonReportNoInutFiles && (!resolutionStack || resolutionStack.length === 0);
    }

    /*@internal*/
    export function canJsonReportNoInutFiles(raw: any) {
        return !hasProperty(raw, "files") && !hasProperty(raw, "references");
    }

    /*@internal*/
    export function updateErrorForNoInputFiles(result: ExpandResult, configFileName: string, configFileSpecs: ConfigFileSpecs, configParseDiagnostics: Diagnostic[], canJsonReportNoInutFiles: boolean) {
        const existingErrors = configParseDiagnostics.length;
        if (shouldReportNoInputFiles(result, canJsonReportNoInutFiles)) {
            configParseDiagnostics.push(getErrorForNoInputFiles(configFileSpecs, configFileName));
        }
        else {
            filterMutate(configParseDiagnostics, error => !isErrorNoInputFiles(error));
        }
        return existingErrors !== configParseDiagnostics.length;
    }

    export interface ParsedTsconfig {
        raw: any;
        options?: CompilerOptions;
        watchOptions?: WatchOptions;
        typeAcquisition?: TypeAcquisition;
        /**
         * Note that the case of the config path has not yet been normalized, as no files have been imported into the project yet
         */
        extendedConfigPath?: string;
    }

    function isSuccessfulParsedTsconfig(value: ParsedTsconfig) {
        return !!value.options;
    }

    /**
     * This *just* extracts options/include/exclude/files out of a config file.
     * It does *not* resolve the included files.
     */
    function parseConfig(
        json: any,
        sourceFile: TsConfigSourceFile | undefined,
        host: ParseConfigHost,
        basePath: string,
        configFileName: string | undefined,
        resolutionStack: string[],
        errors: Push<Diagnostic>,
        extendedConfigCache?: Map<ExtendedConfigCacheEntry>
    ): ParsedTsconfig {
        basePath = normalizeSlashes(basePath);
        const resolvedPath = getNormalizedAbsolutePath(configFileName || "", basePath);

        if (resolutionStack.indexOf(resolvedPath) >= 0) {
            errors.push(createCompilerDiagnostic(Diagnostics.Circularity_detected_while_resolving_configuration_Colon_0, [...resolutionStack, resolvedPath].join(" -> ")));
            return { raw: json || convertToObject(sourceFile!, errors) };
        }

        const ownConfig = json ?
            parseOwnConfigOfJson(json, host, basePath, configFileName, errors) :
            parseOwnConfigOfJsonSourceFile(sourceFile!, host, basePath, configFileName, errors);

        if (ownConfig.extendedConfigPath) {
            // copy the resolution stack so it is never reused between branches in potential diamond-problem scenarios.
            resolutionStack = resolutionStack.concat([resolvedPath]);
            const extendedConfig = getExtendedConfig(sourceFile, ownConfig.extendedConfigPath, host, basePath, resolutionStack, errors, extendedConfigCache);
            if (extendedConfig && isSuccessfulParsedTsconfig(extendedConfig)) {
                const baseRaw = extendedConfig.raw;
                const raw = ownConfig.raw;
                const setPropertyInRawIfNotUndefined = (propertyName: string) => {
                    const value = raw[propertyName] || baseRaw[propertyName];
                    if (value) {
                        raw[propertyName] = value;
                    }
                };
                setPropertyInRawIfNotUndefined("include");
                setPropertyInRawIfNotUndefined("exclude");
                setPropertyInRawIfNotUndefined("files");
                if (raw.compileOnSave === undefined) {
                    raw.compileOnSave = baseRaw.compileOnSave;
                }
                ownConfig.options = assign({}, extendedConfig.options, ownConfig.options);
                ownConfig.watchOptions = ownConfig.watchOptions && extendedConfig.watchOptions ?
                    assign({}, extendedConfig.watchOptions, ownConfig.watchOptions) :
                    ownConfig.watchOptions || extendedConfig.watchOptions;
                // TODO extend type typeAcquisition
            }
        }

        return ownConfig;
    }

    function parseOwnConfigOfJson(
        json: any,
        host: ParseConfigHost,
        basePath: string,
        configFileName: string | undefined,
        errors: Push<Diagnostic>
    ): ParsedTsconfig {
        if (hasProperty(json, "excludes")) {
            errors.push(createCompilerDiagnostic(Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
        }

        const options = convertCompilerOptionsFromJsonWorker(json.compilerOptions, basePath, errors, configFileName);
        // typingOptions has been deprecated and is only supported for backward compatibility purposes.
        // It should be removed in future releases - use typeAcquisition instead.
        const typeAcquisition = convertTypeAcquisitionFromJsonWorker(json.typeAcquisition || json.typingOptions, basePath, errors, configFileName);
        const watchOptions = convertWatchOptionsFromJsonWorker(json.watchOptions, basePath, errors);
        json.compileOnSave = convertCompileOnSaveOptionFromJson(json, basePath, errors);
        let extendedConfigPath: string | undefined;

        if (json.extends) {
            if (!isString(json.extends)) {
                errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "extends", "string"));
            }
            else {
                const newBase = configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath;
                extendedConfigPath = getExtendsConfigPath(json.extends, host, newBase, errors, createCompilerDiagnostic);
            }
        }
        return { raw: json, options, watchOptions, typeAcquisition, extendedConfigPath };
    }

    function parseOwnConfigOfJsonSourceFile(
        sourceFile: TsConfigSourceFile,
        host: ParseConfigHost,
        basePath: string,
        configFileName: string | undefined,
        errors: Push<Diagnostic>
    ): ParsedTsconfig {
        const options = getDefaultCompilerOptions(configFileName);
        let typeAcquisition: TypeAcquisition | undefined, typingOptionstypeAcquisition: TypeAcquisition | undefined;
        let watchOptions: WatchOptions | undefined;
        let extendedConfigPath: string | undefined;

        const optionsIterator: JsonConversionNotifier = {
            onSetValidOptionKeyValueInParent(parentOption: string, option: CommandLineOption, value: CompilerOptionsValue) {
                let currentOption;
                switch (parentOption) {
                    case "compilerOptions":
                        currentOption = options;
                        break;
                    case "watchOptions":
                        currentOption = (watchOptions || (watchOptions = {}));
                        break;
                    case "typeAcquisition":
                        currentOption = (typeAcquisition || (typeAcquisition = getDefaultTypeAcquisition(configFileName)));
                        break;
                    case "typingOptions":
                        currentOption = (typingOptionstypeAcquisition || (typingOptionstypeAcquisition = getDefaultTypeAcquisition(configFileName)));
                        break;
                    default:
                        Debug.fail("Unknown option");
                }

                currentOption[option.name] = normalizeOptionValue(option, basePath, value);
            },
            onSetValidOptionKeyValueInRoot(key: string, _keyNode: PropertyName, value: CompilerOptionsValue, valueNode: Expression) {
                switch (key) {
                    case "extends":
                        const newBase = configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath;
                        extendedConfigPath = getExtendsConfigPath(
                            <string>value,
                            host,
                            newBase,
                            errors,
                            (message, arg0) =>
                                createDiagnosticForNodeInSourceFile(sourceFile, valueNode, message, arg0)
                        );
                        return;
                }
            },
            onSetUnknownOptionKeyValueInRoot(key: string, keyNode: PropertyName, _value: CompilerOptionsValue, _valueNode: Expression) {
                if (key === "excludes") {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, keyNode, Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
                }
            }
        };
        const json = convertToObjectWorker(sourceFile, errors, /*returnValue*/ true, getTsconfigRootOptionsMap(), optionsIterator);

        if (!typeAcquisition) {
            if (typingOptionstypeAcquisition) {
                typeAcquisition = (typingOptionstypeAcquisition.enableAutoDiscovery !== undefined) ?
                    {
                        enable: typingOptionstypeAcquisition.enableAutoDiscovery,
                        include: typingOptionstypeAcquisition.include,
                        exclude: typingOptionstypeAcquisition.exclude
                    } :
                    typingOptionstypeAcquisition;
            }
            else {
                typeAcquisition = getDefaultTypeAcquisition(configFileName);
            }
        }

        return { raw: json, options, watchOptions, typeAcquisition, extendedConfigPath };
    }

    function getExtendsConfigPath(
        extendedConfig: string,
        host: ParseConfigHost,
        basePath: string,
        errors: Push<Diagnostic>,
        createDiagnostic: (message: DiagnosticMessage, arg1?: string) => Diagnostic) {
        extendedConfig = normalizeSlashes(extendedConfig);
        if (isRootedDiskPath(extendedConfig) || startsWith(extendedConfig, "./") || startsWith(extendedConfig, "../")) {
            let extendedConfigPath = getNormalizedAbsolutePath(extendedConfig, basePath);
            if (!host.fileExists(extendedConfigPath) && !endsWith(extendedConfigPath, Extension.Json)) {
                extendedConfigPath = `${extendedConfigPath}.json`;
                if (!host.fileExists(extendedConfigPath)) {
                    errors.push(createDiagnostic(Diagnostics.File_0_not_found, extendedConfig));
                    return undefined;
                }
            }
            return extendedConfigPath;
        }
        // If the path isn't a rooted or relative path, resolve like a module
        const resolved = nodeModuleNameResolver(extendedConfig, combinePaths(basePath, "tsconfig.json"), { moduleResolution: ModuleResolutionKind.NodeJs }, host, /*cache*/ undefined, /*projectRefs*/ undefined, /*lookupConfig*/ true);
        if (resolved.resolvedModule) {
            return resolved.resolvedModule.resolvedFileName;
        }
        errors.push(createDiagnostic(Diagnostics.File_0_not_found, extendedConfig));
        return undefined;
    }

    export interface ExtendedConfigCacheEntry {
        extendedResult: TsConfigSourceFile;
        extendedConfig: ParsedTsconfig | undefined;
    }

    function getExtendedConfig(
        sourceFile: TsConfigSourceFile | undefined,
        extendedConfigPath: string,
        host: ParseConfigHost,
        basePath: string,
        resolutionStack: string[],
        errors: Push<Diagnostic>,
        extendedConfigCache?: Map<ExtendedConfigCacheEntry>
    ): ParsedTsconfig | undefined {
        const path = host.useCaseSensitiveFileNames ? extendedConfigPath : toLowerCase(extendedConfigPath);
        let value: ExtendedConfigCacheEntry | undefined;
        let extendedResult: TsConfigSourceFile;
        let extendedConfig: ParsedTsconfig | undefined;
        if (extendedConfigCache && (value = extendedConfigCache.get(path))) {
            ({ extendedResult, extendedConfig } = value);
        }
        else {
            extendedResult = readJsonConfigFile(extendedConfigPath, path => host.readFile(path));
            if (!extendedResult.parseDiagnostics.length) {
                const extendedDirname = getDirectoryPath(extendedConfigPath);
                extendedConfig = parseConfig(/*json*/ undefined, extendedResult, host, extendedDirname,
                    getBaseFileName(extendedConfigPath), resolutionStack, errors, extendedConfigCache);

                if (isSuccessfulParsedTsconfig(extendedConfig)) {
                    // Update the paths to reflect base path
                    const relativeDifference = convertToRelativePath(extendedDirname, basePath, identity);
                    const updatePath = (path: string) => isRootedDiskPath(path) ? path : combinePaths(relativeDifference, path);
                    const mapPropertiesInRawIfNotUndefined = (propertyName: string) => {
                        if (raw[propertyName]) {
                            raw[propertyName] = map(raw[propertyName], updatePath);
                        }
                    };

                    const { raw } = extendedConfig;
                    mapPropertiesInRawIfNotUndefined("include");
                    mapPropertiesInRawIfNotUndefined("exclude");
                    mapPropertiesInRawIfNotUndefined("files");
                }
            }
            if (extendedConfigCache) {
                extendedConfigCache.set(path, { extendedResult, extendedConfig });
            }
        }
        if (sourceFile) {
            sourceFile.extendedSourceFiles = [extendedResult.fileName];
            if (extendedResult.extendedSourceFiles) {
                sourceFile.extendedSourceFiles.push(...extendedResult.extendedSourceFiles);
            }
        }
        if (extendedResult.parseDiagnostics.length) {
            errors.push(...extendedResult.parseDiagnostics);
            return undefined;
        }
        return extendedConfig!;
    }

    function convertCompileOnSaveOptionFromJson(jsonOption: any, basePath: string, errors: Push<Diagnostic>): boolean {
        if (!hasProperty(jsonOption, compileOnSaveCommandLineOption.name)) {
            return false;
        }
        const result = convertJsonOption(compileOnSaveCommandLineOption, jsonOption.compileOnSave, basePath, errors);
        return typeof result === "boolean" && result;
    }

    export function convertCompilerOptionsFromJson(jsonOptions: any, basePath: string, configFileName?: string): { options: CompilerOptions, errors: Diagnostic[] } {
        const errors: Diagnostic[] = [];
        const options = convertCompilerOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName);
        return { options, errors };
    }

    export function convertTypeAcquisitionFromJson(jsonOptions: any, basePath: string, configFileName?: string): { options: TypeAcquisition, errors: Diagnostic[] } {
        const errors: Diagnostic[] = [];
        const options = convertTypeAcquisitionFromJsonWorker(jsonOptions, basePath, errors, configFileName);
        return { options, errors };
    }

    function getDefaultCompilerOptions(configFileName?: string) {
        const options: CompilerOptions = configFileName && getBaseFileName(configFileName) === "jsconfig.json"
            ? { allowJs: true, maxNodeModuleJsDepth: 2, allowSyntheticDefaultImports: true, skipLibCheck: true, noEmit: true }
            : {};
        return options;
    }

    function convertCompilerOptionsFromJsonWorker(jsonOptions: any,
        basePath: string, errors: Push<Diagnostic>, configFileName?: string): CompilerOptions {

        const options = getDefaultCompilerOptions(configFileName);
        convertOptionsFromJson(getCommandLineCompilerOptionsMap(), jsonOptions, basePath, options, compilerOptionsDidYouMeanDiagnostics, errors);
        if (configFileName) {
            options.configFilePath = normalizeSlashes(configFileName);
        }
        return options;
    }

    function getDefaultTypeAcquisition(configFileName?: string): TypeAcquisition {
        return { enable: !!configFileName && getBaseFileName(configFileName) === "jsconfig.json", include: [], exclude: [] };
    }

    function convertTypeAcquisitionFromJsonWorker(jsonOptions: any,
        basePath: string, errors: Push<Diagnostic>, configFileName?: string): TypeAcquisition {

        const options = getDefaultTypeAcquisition(configFileName);
        const typeAcquisition = convertEnableAutoDiscoveryToEnable(jsonOptions);

        convertOptionsFromJson(getCommandLineTypeAcquisitionMap(), typeAcquisition, basePath, options, typeAcquisitionDidYouMeanDiagnostics, errors);
        return options;
    }

    function convertWatchOptionsFromJsonWorker(jsonOptions: any, basePath: string, errors: Push<Diagnostic>): WatchOptions | undefined {
        return convertOptionsFromJson(getCommandLineWatchOptionsMap(), jsonOptions, basePath, /*defaultOptions*/ undefined, watchOptionsDidYouMeanDiagnostics, errors);
    }

    function convertOptionsFromJson(optionsNameMap: Map<CommandLineOption>, jsonOptions: any, basePath: string,
        defaultOptions: undefined, diagnostics: DidYouMeanOptionsDiagnostics, errors: Push<Diagnostic>): WatchOptions | undefined;
    function convertOptionsFromJson(optionsNameMap: Map<CommandLineOption>, jsonOptions: any, basePath: string,
        defaultOptions: CompilerOptions | TypeAcquisition, diagnostics: DidYouMeanOptionsDiagnostics, errors: Push<Diagnostic>): CompilerOptions | TypeAcquisition;
    function convertOptionsFromJson(optionsNameMap: Map<CommandLineOption>, jsonOptions: any, basePath: string,
        defaultOptions: CompilerOptions | TypeAcquisition | WatchOptions | undefined, diagnostics: DidYouMeanOptionsDiagnostics, errors: Push<Diagnostic>) {

        if (!jsonOptions) {
            return;
        }

        for (const id in jsonOptions) {
            const opt = optionsNameMap.get(id);
            if (opt) {
                (defaultOptions || (defaultOptions = {}))[opt.name] = convertJsonOption(opt, jsonOptions[id], basePath, errors);
            }
            else {
                errors.push(createUnknownOptionError(id, diagnostics, createCompilerDiagnostic));
            }
        }
        return defaultOptions;
    }

    function convertJsonOption(opt: CommandLineOption, value: any, basePath: string, errors: Push<Diagnostic>): CompilerOptionsValue {
        if (isCompilerOptionsValue(opt, value)) {
            const optType = opt.type;
            if (optType === "list" && isArray(value)) {
                return convertJsonOptionOfListType(<CommandLineOptionOfListType>opt, value, basePath, errors);
            }
            else if (!isString(optType)) {
                return convertJsonOptionOfCustomType(<CommandLineOptionOfCustomType>opt, <string>value, errors);
            }
            return normalizeNonListOptionValue(opt, basePath, value);
        }
        else {
            errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, opt.name, getCompilerOptionValueTypeString(opt)));
        }
    }

    function normalizeOptionValue(option: CommandLineOption, basePath: string, value: any): CompilerOptionsValue {
        if (isNullOrUndefined(value)) return undefined;
        if (option.type === "list") {
            const listOption = option;
            if (listOption.element.isFilePath || !isString(listOption.element.type)) {
                return <CompilerOptionsValue>filter(map(value, v => normalizeOptionValue(listOption.element, basePath, v)), v => !!v);
            }
            return value;
        }
        else if (!isString(option.type)) {
            return option.type.get(isString(value) ? value.toLowerCase() : value);
        }
        return normalizeNonListOptionValue(option, basePath, value);
    }

    function normalizeNonListOptionValue(option: CommandLineOption, basePath: string, value: any): CompilerOptionsValue {
        if (option.isFilePath) {
            value = getNormalizedAbsolutePath(value, basePath);
            if (value === "") {
                value = ".";
            }
        }
        return value;
    }

    function convertJsonOptionOfCustomType(opt: CommandLineOptionOfCustomType, value: string, errors: Push<Diagnostic>) {
        if (isNullOrUndefined(value)) return undefined;
        const key = value.toLowerCase();
        const val = opt.type.get(key);
        if (val !== undefined) {
            return val;
        }
        else {
            errors.push(createCompilerDiagnosticForInvalidCustomType(opt));
        }
    }

    function convertJsonOptionOfListType(option: CommandLineOptionOfListType, values: readonly any[], basePath: string, errors: Push<Diagnostic>): any[] {
        return filter(map(values, v => convertJsonOption(option.element, v, basePath, errors)), v => !!v);
    }

    function trimString(s: string) {
        return typeof s.trim === "function" ? s.trim() : s.replace(/^[\s]+|[\s]+$/g, "");
    }

    /**
     * Tests for a path that ends in a recursive directory wildcard.
     * Matches **, \**, **\, and \**\, but not a**b.
     *
     * NOTE: used \ in place of / above to avoid issues with multiline comments.
     *
     * Breakdown:
     *  (^|\/)      # matches either the beginning of the string or a directory separator.
     *  \*\*        # matches the recursive directory wildcard "**".
     *  \/?$        # matches an optional trailing directory separator at the end of the string.
     */
    const invalidTrailingRecursionPattern = /(^|\/)\*\*\/?$/;

    /**
     * Tests for a path where .. appears after a recursive directory wildcard.
     * Matches **\..\*, **\a\..\*, and **\.., but not ..\**\*
     *
     * NOTE: used \ in place of / above to avoid issues with multiline comments.
     *
     * Breakdown:
     *  (^|\/)      # matches either the beginning of the string or a directory separator.
     *  \*\*\/      # matches a recursive directory wildcard "**" followed by a directory separator.
     *  (.*\/)?     # optionally matches any number of characters followed by a directory separator.
     *  \.\.        # matches a parent directory path component ".."
     *  ($|\/)      # matches either the end of the string or a directory separator.
     */
    const invalidDotDotAfterRecursiveWildcardPattern = /(^|\/)\*\*\/(.*\/)?\.\.($|\/)/;

    /**
     * Tests for a path containing a wildcard character in a directory component of the path.
     * Matches \*\, \?\, and \a*b\, but not \a\ or \a\*.
     *
     * NOTE: used \ in place of / above to avoid issues with multiline comments.
     *
     * Breakdown:
     *  \/          # matches a directory separator.
     *  [^/]*?      # matches any number of characters excluding directory separators (non-greedy).
     *  [*?]        # matches either a wildcard character (* or ?)
     *  [^/]*       # matches any number of characters excluding directory separators (greedy).
     *  \/          # matches a directory separator.
     */
    const watchRecursivePattern = /\/[^/]*?[*?][^/]*\//;

    /**
     * Matches the portion of a wildcard path that does not contain wildcards.
     * Matches \a of \a\*, or \a\b\c of \a\b\c\?\d.
     *
     * NOTE: used \ in place of / above to avoid issues with multiline comments.
     *
     * Breakdown:
     *  ^                   # matches the beginning of the string
     *  [^*?]*              # matches any number of non-wildcard characters
     *  (?=\/[^/]*[*?])     # lookahead that matches a directory separator followed by
     *                      # a path component that contains at least one wildcard character (* or ?).
     */
    const wildcardDirectoryPattern = /^[^*?]*(?=\/[^/]*[*?])/;

    /**
     * Expands an array of file specifications.
     *
     * @param filesSpecs The literal file names to include.
     * @param includeSpecs The wildcard file specifications to include.
     * @param excludeSpecs The wildcard file specifications to exclude.
     * @param basePath The base path for any relative file specifications.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     * @param errors An array for diagnostic reporting.
     */
    function matchFileNames(
        filesSpecs: readonly string[] | undefined,
        includeSpecs: readonly string[] | undefined,
        excludeSpecs: readonly string[] | undefined,
        basePath: string,
        options: CompilerOptions,
        host: ParseConfigHost,
        errors: Push<Diagnostic>,
        extraFileExtensions: readonly FileExtensionInfo[],
        jsonSourceFile: TsConfigSourceFile | undefined
    ): ExpandResult {
        basePath = normalizePath(basePath);
        let validatedIncludeSpecs: readonly string[] | undefined, validatedExcludeSpecs: readonly string[] | undefined;

        // The exclude spec list is converted into a regular expression, which allows us to quickly
        // test whether a file or directory should be excluded before recursively traversing the
        // file system.

        if (includeSpecs) {
            validatedIncludeSpecs = validateSpecs(includeSpecs, errors, /*allowTrailingRecursion*/ false, jsonSourceFile, "include");
        }

        if (excludeSpecs) {
            validatedExcludeSpecs = validateSpecs(excludeSpecs, errors, /*allowTrailingRecursion*/ true, jsonSourceFile, "exclude");
        }

        // Wildcard directories (provided as part of a wildcard path) are stored in a
        // file map that marks whether it was a regular wildcard match (with a `*` or `?` token),
        // or a recursive directory. This information is used by filesystem watchers to monitor for
        // new entries in these paths.
        const wildcardDirectories = getWildcardDirectories(validatedIncludeSpecs, validatedExcludeSpecs, basePath, host.useCaseSensitiveFileNames);

        const spec: ConfigFileSpecs = { filesSpecs, includeSpecs, excludeSpecs, validatedIncludeSpecs, validatedExcludeSpecs, wildcardDirectories };
        return getFileNamesFromConfigSpecs(spec, basePath, options, host, extraFileExtensions);
    }

    /**
     * Gets the file names from the provided config file specs that contain, files, include, exclude and
     * other properties needed to resolve the file names
     * @param spec The config file specs extracted with file names to include, wildcards to include/exclude and other details
     * @param basePath The base path for any relative file specifications.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     * @param extraFileExtensions optionaly file extra file extension information from host
     */
    /* @internal */
    export function getFileNamesFromConfigSpecs(spec: ConfigFileSpecs, basePath: string, options: CompilerOptions, host: ParseConfigHost, extraFileExtensions: readonly FileExtensionInfo[] = []): ExpandResult {
        basePath = normalizePath(basePath);

        const keyMapper = host.useCaseSensitiveFileNames ? identity : toLowerCase;

        // Literal file names (provided via the "files" array in tsconfig.json) are stored in a
        // file map with a possibly case insensitive key. We use this map later when when including
        // wildcard paths.
        const literalFileMap = createMap<string>();

        // Wildcard paths (provided via the "includes" array in tsconfig.json) are stored in a
        // file map with a possibly case insensitive key. We use this map to store paths matched
        // via wildcard, and to handle extension priority.
        const wildcardFileMap = createMap<string>();

        // Wildcard paths of json files (provided via the "includes" array in tsconfig.json) are stored in a
        // file map with a possibly case insensitive key. We use this map to store paths matched
        // via wildcard of *.json kind
        const wildCardJsonFileMap = createMap<string>();
        const { filesSpecs, validatedIncludeSpecs, validatedExcludeSpecs, wildcardDirectories } = spec;

        // Rather than requery this for each file and filespec, we query the supported extensions
        // once and store it on the expansion context.
        const supportedExtensions = getSupportedExtensions(options, extraFileExtensions);
        const supportedExtensionsWithJsonIfResolveJsonModule = getSuppoertedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions);

        // Literal files are always included verbatim. An "include" or "exclude" specification cannot
        // remove a literal file.
        if (filesSpecs) {
            for (const fileName of filesSpecs) {
                const file = getNormalizedAbsolutePath(fileName, basePath);
                literalFileMap.set(keyMapper(file), file);
            }
        }

        let jsonOnlyIncludeRegexes: readonly RegExp[] | undefined;
        if (validatedIncludeSpecs && validatedIncludeSpecs.length > 0) {
            for (const file of host.readDirectory(basePath, supportedExtensionsWithJsonIfResolveJsonModule, validatedExcludeSpecs, validatedIncludeSpecs, /*depth*/ undefined)) {
                if (fileExtensionIs(file, Extension.Json)) {
                    // Valid only if *.json specified
                    if (!jsonOnlyIncludeRegexes) {
                        const includes = validatedIncludeSpecs.filter(s => endsWith(s, Extension.Json));
                        const includeFilePatterns = map(getRegularExpressionsForWildcards(includes, basePath, "files"), pattern => `^${pattern}$`);
                        jsonOnlyIncludeRegexes = includeFilePatterns ? includeFilePatterns.map(pattern => getRegexFromPattern(pattern, host.useCaseSensitiveFileNames)) : emptyArray;
                    }
                    const includeIndex = findIndex(jsonOnlyIncludeRegexes, re => re.test(file));
                    if (includeIndex !== -1) {
                        const key = keyMapper(file);
                        if (!literalFileMap.has(key) && !wildCardJsonFileMap.has(key)) {
                            wildCardJsonFileMap.set(key, file);
                        }
                    }
                    continue;
                }
                // If we have already included a literal or wildcard path with a
                // higher priority extension, we should skip this file.
                //
                // This handles cases where we may encounter both <file>.ts and
                // <file>.d.ts (or <file>.js if "allowJs" is enabled) in the same
                // directory when they are compilation outputs.
                if (hasFileWithHigherPriorityExtension(file, literalFileMap, wildcardFileMap, supportedExtensions, keyMapper)) {
                    continue;
                }

                // We may have included a wildcard path with a lower priority
                // extension due to the user-defined order of entries in the
                // "include" array. If there is a lower priority extension in the
                // same directory, we should remove it.
                removeWildcardFilesWithLowerPriorityExtension(file, wildcardFileMap, supportedExtensions, keyMapper);

                const key = keyMapper(file);
                if (!literalFileMap.has(key) && !wildcardFileMap.has(key)) {
                    wildcardFileMap.set(key, file);
                }
            }
        }

        const literalFiles = arrayFrom(literalFileMap.values());
        const wildcardFiles = arrayFrom(wildcardFileMap.values());

        return {
            fileNames: literalFiles.concat(wildcardFiles, arrayFrom(wildCardJsonFileMap.values())),
            wildcardDirectories,
            spec
        };
    }

    function validateSpecs(specs: readonly string[], errors: Push<Diagnostic>, allowTrailingRecursion: boolean, jsonSourceFile: TsConfigSourceFile | undefined, specKey: string): readonly string[] {
        return specs.filter(spec => {
            const diag = specToDiagnostic(spec, allowTrailingRecursion);
            if (diag !== undefined) {
                errors.push(createDiagnostic(diag, spec));
            }
            return diag === undefined;
        });

        function createDiagnostic(message: DiagnosticMessage, spec: string): Diagnostic {
            const element = getTsConfigPropArrayElementValue(jsonSourceFile, specKey, spec);
            return element ?
                createDiagnosticForNodeInSourceFile(jsonSourceFile!, element, message, spec) :
                createCompilerDiagnostic(message, spec);
        }
    }

    function specToDiagnostic(spec: string, allowTrailingRecursion: boolean): DiagnosticMessage | undefined {
        if (!allowTrailingRecursion && invalidTrailingRecursionPattern.test(spec)) {
            return Diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0;
        }
        else if (invalidDotDotAfterRecursiveWildcardPattern.test(spec)) {
            return Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0;
        }
    }

    /**
     * Gets directories in a set of include patterns that should be watched for changes.
     */
    function getWildcardDirectories(include: readonly string[] | undefined, exclude: readonly string[] | undefined, path: string, useCaseSensitiveFileNames: boolean): MapLike<WatchDirectoryFlags> {
        // We watch a directory recursively if it contains a wildcard anywhere in a directory segment
        // of the pattern:
        //
        //  /a/b/**/d   - Watch /a/b recursively to catch changes to any d in any subfolder recursively
        //  /a/b/*/d    - Watch /a/b recursively to catch any d in any immediate subfolder, even if a new subfolder is added
        //  /a/b        - Watch /a/b recursively to catch changes to anything in any recursive subfoler
        //
        // We watch a directory without recursion if it contains a wildcard in the file segment of
        // the pattern:
        //
        //  /a/b/*      - Watch /a/b directly to catch any new file
        //  /a/b/a?z    - Watch /a/b directly to catch any new file matching a?z
        const rawExcludeRegex = getRegularExpressionForWildcard(exclude, path, "exclude");
        const excludeRegex = rawExcludeRegex && new RegExp(rawExcludeRegex, useCaseSensitiveFileNames ? "" : "i");
        const wildcardDirectories: MapLike<WatchDirectoryFlags> = {};
        if (include !== undefined) {
            const recursiveKeys: string[] = [];
            for (const file of include) {
                const spec = normalizePath(combinePaths(path, file));
                if (excludeRegex && excludeRegex.test(spec)) {
                    continue;
                }

                const match = getWildcardDirectoryFromSpec(spec, useCaseSensitiveFileNames);
                if (match) {
                    const { key, flags } = match;
                    const existingFlags = wildcardDirectories[key];
                    if (existingFlags === undefined || existingFlags < flags) {
                        wildcardDirectories[key] = flags;
                        if (flags === WatchDirectoryFlags.Recursive) {
                            recursiveKeys.push(key);
                        }
                    }
                }
            }

            // Remove any subpaths under an existing recursively watched directory.
            for (const key in wildcardDirectories) {
                if (hasProperty(wildcardDirectories, key)) {
                    for (const recursiveKey of recursiveKeys) {
                        if (key !== recursiveKey && containsPath(recursiveKey, key, path, !useCaseSensitiveFileNames)) {
                            delete wildcardDirectories[key];
                        }
                    }
                }
            }
        }

        return wildcardDirectories;
    }

    function getWildcardDirectoryFromSpec(spec: string, useCaseSensitiveFileNames: boolean): { key: string, flags: WatchDirectoryFlags } | undefined {
        const match = wildcardDirectoryPattern.exec(spec);
        if (match) {
            return {
                key: useCaseSensitiveFileNames ? match[0] : match[0].toLowerCase(),
                flags: watchRecursivePattern.test(spec) ? WatchDirectoryFlags.Recursive : WatchDirectoryFlags.None
            };
        }
        if (isImplicitGlob(spec)) {
            return { key: spec, flags: WatchDirectoryFlags.Recursive };
        }
        return undefined;
    }

    /**
     * Determines whether a literal or wildcard file has already been included that has a higher
     * extension priority.
     *
     * @param file The path to the file.
     * @param extensionPriority The priority of the extension.
     * @param context The expansion context.
     */
    function hasFileWithHigherPriorityExtension(file: string, literalFiles: Map<string>, wildcardFiles: Map<string>, extensions: readonly string[], keyMapper: (value: string) => string) {
        const extensionPriority = getExtensionPriority(file, extensions);
        const adjustedExtensionPriority = adjustExtensionPriority(extensionPriority, extensions);
        for (let i = ExtensionPriority.Highest; i < adjustedExtensionPriority; i++) {
            const higherPriorityExtension = extensions[i];
            const higherPriorityPath = keyMapper(changeExtension(file, higherPriorityExtension));
            if (literalFiles.has(higherPriorityPath) || wildcardFiles.has(higherPriorityPath)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Removes files included via wildcard expansion with a lower extension priority that have
     * already been included.
     *
     * @param file The path to the file.
     * @param extensionPriority The priority of the extension.
     * @param context The expansion context.
     */
    function removeWildcardFilesWithLowerPriorityExtension(file: string, wildcardFiles: Map<string>, extensions: readonly string[], keyMapper: (value: string) => string) {
        const extensionPriority = getExtensionPriority(file, extensions);
        const nextExtensionPriority = getNextLowestExtensionPriority(extensionPriority, extensions);
        for (let i = nextExtensionPriority; i < extensions.length; i++) {
            const lowerPriorityExtension = extensions[i];
            const lowerPriorityPath = keyMapper(changeExtension(file, lowerPriorityExtension));
            wildcardFiles.delete(lowerPriorityPath);
        }
    }

    /**
     * Produces a cleaned version of compiler options with personally identifying info (aka, paths) removed.
     * Also converts enum values back to strings.
     */
    /* @internal */
    export function convertCompilerOptionsForTelemetry(opts: CompilerOptions): CompilerOptions {
        const out: CompilerOptions = {};
        for (const key in opts) {
            if (opts.hasOwnProperty(key)) {
                const type = getOptionFromName(key);
                if (type !== undefined) { // Ignore unknown options
                    out[key] = getOptionValueWithEmptyStrings(opts[key], type);
                }
            }
        }
        return out;
    }

    function getOptionValueWithEmptyStrings(value: any, option: CommandLineOption): {} {
        switch (option.type) {
            case "object": // "paths". Can't get any useful information from the value since we blank out strings, so just return "".
                return "";
            case "string": // Could be any arbitrary string -- use empty string instead.
                return "";
            case "number": // Allow numbers, but be sure to check it's actually a number.
                return typeof value === "number" ? value : "";
            case "boolean":
                return typeof value === "boolean" ? value : "";
            case "list":
                const elementType = option.element;
                return isArray(value) ? value.map(v => getOptionValueWithEmptyStrings(v, elementType)) : "";
            default:
                return forEachEntry(option.type, (optionEnumValue, optionStringValue) => {
                    if (optionEnumValue === value) {
                        return optionStringValue;
                    }
                })!; // TODO: GH#18217
        }
    }
}
