
// Watch related options

import { WatchFileKind, WatchDirectoryKind, PollingWatchKind, ScriptTarget, ModuleKind, ImportsNotUsedAsValues, ModuleResolutionKind, NewLineKind, ModuleDetectionKind, JsxEmit, DiagnosticMessage, CompilerOptionsValue, Diagnostic } from "typescript";
import { isNullOrUndefined } from "../../compiler/lang-utils";
import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import { getEntries, mapDefined, startsWith, trimString } from "../../compiler/lang-utils";

const jsxOptionMap = new Map(getEntries({
    "preserve": JsxEmit.Preserve,
    "react-native": JsxEmit.ReactNative,
    "react": JsxEmit.React,
    "react-jsx": JsxEmit.ReactJSX,
    "react-jsxdev": JsxEmit.ReactJSXDev,
}));


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
    ["es2021", "lib.es2021.d.ts"],
    ["es2022", "lib.es2022.d.ts"],
    ["esnext", "lib.esnext.d.ts"],
    // Host only
    ["dom", "lib.dom.d.ts"],
    ["dom.iterable", "lib.dom.iterable.d.ts"],
    ["webworker", "lib.webworker.d.ts"],
    ["webworker.importscripts", "lib.webworker.importscripts.d.ts"],
    ["webworker.iterable", "lib.webworker.iterable.d.ts"],
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
    ["es2019.intl", "lib.es2019.intl.d.ts"],
    ["es2020.bigint", "lib.es2020.bigint.d.ts"],
    ["es2020.date", "lib.es2020.date.d.ts"],
    ["es2020.promise", "lib.es2020.promise.d.ts"],
    ["es2020.sharedmemory", "lib.es2020.sharedmemory.d.ts"],
    ["es2020.string", "lib.es2020.string.d.ts"],
    ["es2020.symbol.wellknown", "lib.es2020.symbol.wellknown.d.ts"],
    ["es2020.intl", "lib.es2020.intl.d.ts"],
    ["es2020.number", "lib.es2020.number.d.ts"],
    ["es2021.promise", "lib.es2021.promise.d.ts"],
    ["es2021.string", "lib.es2021.string.d.ts"],
    ["es2021.weakref", "lib.es2021.weakref.d.ts"],
    ["es2021.intl", "lib.es2021.intl.d.ts"],
    ["es2022.array", "lib.es2022.array.d.ts"],
    ["es2022.error", "lib.es2022.error.d.ts"],
    ["es2022.intl", "lib.es2022.intl.d.ts"],
    ["es2022.object", "lib.es2022.object.d.ts"],
    ["es2022.sharedmemory", "lib.es2022.sharedmemory.d.ts"],
    ["es2022.string", "lib.es2022.string.d.ts"],
    ["esnext.array", "lib.es2022.array.d.ts"],
    ["esnext.symbol", "lib.es2019.symbol.d.ts"],
    ["esnext.asynciterable", "lib.es2018.asynciterable.d.ts"],
    ["esnext.intl", "lib.esnext.intl.d.ts"],
    ["esnext.bigint", "lib.es2020.bigint.d.ts"],
    ["esnext.string", "lib.es2022.string.d.ts"],
    ["esnext.promise", "lib.es2021.promise.d.ts"],
    ["esnext.weakref", "lib.es2021.weakref.d.ts"]
];

/**
 * An array of supported "lib" reference file names used to determine the order for inclusion
 * when referenced, as well as for spelling suggestions. This ensures the correct ordering for
 * overload resolution when a type declared in one lib is extended by another.
 *
 * @internal
 */
export const libs = libEntries.map(entry => entry[0]);

/**
 * A map of lib names to lib files. This map is used both for parsing the "lib" command line
 * option as well as for resolving lib reference directives.
 *
 * @internal
 */
export const libMap = new Map(libEntries);


/** @internal */
export const optionsForWatch = [
    {
        name: "watchFile",
        type: new Map(getEntries({
            fixedpollinginterval: WatchFileKind.FixedPollingInterval,
            prioritypollinginterval: WatchFileKind.PriorityPollingInterval,
            dynamicprioritypolling: WatchFileKind.DynamicPriorityPolling,
            fixedchunksizepolling: WatchFileKind.FixedChunkSizePolling,
            usefsevents: WatchFileKind.UseFsEvents,
            usefseventsonparentdirectory: WatchFileKind.UseFsEventsOnParentDirectory,
        })),
        category: Diagnostics.Watch_and_Build_Modes,
        description: Diagnostics.Specify_how_the_TypeScript_watch_mode_works,
        defaultValueDescription: WatchFileKind.UseFsEvents,
    },
    {
        name: "watchDirectory",
        type: new Map(getEntries({
            usefsevents: WatchDirectoryKind.UseFsEvents,
            fixedpollinginterval: WatchDirectoryKind.FixedPollingInterval,
            dynamicprioritypolling: WatchDirectoryKind.DynamicPriorityPolling,
            fixedchunksizepolling: WatchDirectoryKind.FixedChunkSizePolling,
        })),
        category: Diagnostics.Watch_and_Build_Modes,
        description: Diagnostics.Specify_how_directories_are_watched_on_systems_that_lack_recursive_file_watching_functionality,
        defaultValueDescription: WatchDirectoryKind.UseFsEvents,
    },
    {
        name: "fallbackPolling",
        type: new Map(getEntries({
            fixedinterval: PollingWatchKind.FixedInterval,
            priorityinterval: PollingWatchKind.PriorityInterval,
            dynamicpriority: PollingWatchKind.DynamicPriority,
            fixedchunksize: PollingWatchKind.FixedChunkSize,
        })),
        category: Diagnostics.Watch_and_Build_Modes,
        description: Diagnostics.Specify_what_approach_the_watcher_should_use_if_the_system_runs_out_of_native_file_watchers,
        defaultValueDescription: PollingWatchKind.PriorityInterval,
    },
    {
        name: "synchronousWatchDirectory",
        type: "boolean",
        category: Diagnostics.Watch_and_Build_Modes,
        description: Diagnostics.Synchronously_call_callbacks_and_update_the_state_of_directory_watchers_on_platforms_that_don_t_support_recursive_watching_natively,
        defaultValueDescription: false,
    },
    {
        name: "excludeDirectories",
        type: "list",
        element: {
            name: "excludeDirectory",
            type: "string",
            isFilePath: true,
        },
        category: Diagnostics.Watch_and_Build_Modes,
        description: Diagnostics.Remove_a_list_of_directories_from_the_watch_process,
    },
    {
        name: "excludeFiles",
        type: "list",
        element: {
            name: "excludeFile",
            type: "string",
            isFilePath: true,
        },
        category: Diagnostics.Watch_and_Build_Modes,
        description: Diagnostics.Remove_a_list_of_files_from_the_watch_mode_s_processing,
    },
];

/** @internal */
export const commonOptionsWithBuild = [
    {
        name: "help",
        shortName: "h",
        type: "boolean",
        showInSimplifiedHelpView: true,
        isCommandLineOnly: true,
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Print_this_message,
        defaultValueDescription: false,
    },
    {
        name: "help",
        shortName: "?",
        type: "boolean",
        isCommandLineOnly: true,
        category: Diagnostics.Command_line_Options,
        defaultValueDescription: false,
    },
    {
        name: "watch",
        shortName: "w",
        type: "boolean",
        showInSimplifiedHelpView: true,
        isCommandLineOnly: true,
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Watch_input_files,
        defaultValueDescription: false,
    },
    {
        name: "preserveWatchOutput",
        type: "boolean",
        showInSimplifiedHelpView: false,
        category: Diagnostics.Output_Formatting,
        description: Diagnostics.Disable_wiping_the_console_in_watch_mode,
        defaultValueDescription: false,
    },
    {
        name: "listFiles",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Print_all_of_the_files_read_during_the_compilation,
        defaultValueDescription: false,
    },
    {
        name: "explainFiles",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Print_files_read_during_the_compilation_including_why_it_was_included,
        defaultValueDescription: false,
    },
    {
        name: "listEmittedFiles",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Print_the_names_of_emitted_files_after_a_compilation,
        defaultValueDescription: false,
    },
    {
        name: "pretty",
        type: "boolean",
        showInSimplifiedHelpView: true,
        category: Diagnostics.Output_Formatting,
        description: Diagnostics.Enable_color_and_formatting_in_TypeScript_s_output_to_make_compiler_errors_easier_to_read,
        defaultValueDescription: true,
    },
    {
        name: "traceResolution",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Log_paths_used_during_the_moduleResolution_process,
        defaultValueDescription: false,
    },
    {
        name: "diagnostics",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Output_compiler_performance_information_after_building,
        defaultValueDescription: false,
    },
    {
        name: "extendedDiagnostics",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Output_more_detailed_compiler_performance_information_after_building,
        defaultValueDescription: false,
    },
    {
        name: "generateCpuProfile",
        type: "string",
        isFilePath: true,
        paramType: Diagnostics.FILE_OR_DIRECTORY,
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Emit_a_v8_CPU_profile_of_the_compiler_run_for_debugging,
        defaultValueDescription: "profile.cpuprofile"
    },
    {
        name: "generateTrace",
        type: "string",
        isFilePath: true,
        isCommandLineOnly: true,
        paramType: Diagnostics.DIRECTORY,
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Generates_an_event_trace_and_a_list_of_types
    },
    {
        name: "incremental",
        shortName: "i",
        type: "boolean",
        category: Diagnostics.Projects,
        description: Diagnostics.Save_tsbuildinfo_files_to_allow_for_incremental_compilation_of_projects,
        transpileOptionValue: undefined,
        defaultValueDescription: Diagnostics.false_unless_composite_is_set
    },
    {
        name: "declaration",
        shortName: "d",
        type: "boolean",
        // Not setting affectsEmit because we calculate this flag might not affect full emit
        affectsBuildInfo: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Emit,
        transpileOptionValue: undefined,
        description: Diagnostics.Generate_d_ts_files_from_TypeScript_and_JavaScript_files_in_your_project,
        defaultValueDescription: Diagnostics.false_unless_composite_is_set,
    },
    {
        name: "declarationMap",
        type: "boolean",
        // Not setting affectsEmit because we calculate this flag might not affect full emit
        affectsBuildInfo: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Emit,
        transpileOptionValue: undefined,
        defaultValueDescription: false,
        description: Diagnostics.Create_sourcemaps_for_d_ts_files
    },
    {
        name: "emitDeclarationOnly",
        type: "boolean",
        // Not setting affectsEmit because we calculate this flag might not affect full emit
        affectsBuildInfo: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Only_output_d_ts_files_and_not_JavaScript_files,
        transpileOptionValue: undefined,
        defaultValueDescription: false,
    },
    {
        name: "sourceMap",
        type: "boolean",
        // Not setting affectsEmit because we calculate this flag might not affect full emit
        affectsBuildInfo: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Emit,
        defaultValueDescription: false,
        description: Diagnostics.Create_source_map_files_for_emitted_JavaScript_files,
    },
    {
        name: "inlineSourceMap",
        type: "boolean",
        // Not setting affectsEmit because we calculate this flag might not affect full emit
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Include_sourcemap_files_inside_the_emitted_JavaScript,
        defaultValueDescription: false,
    },
    {
        name: "assumeChangesOnlyAffectDirectDependencies",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Watch_and_Build_Modes,
        description: Diagnostics.Have_recompiles_in_projects_that_use_incremental_and_watch_mode_assume_that_changes_within_a_file_will_only_affect_files_directly_depending_on_it,
        defaultValueDescription: false,
    },
    {
        name: "locale",
        type: "string",
        category: Diagnostics.Command_line_Options,
        isCommandLineOnly: true,
        description: Diagnostics.Set_the_language_of_the_messaging_from_TypeScript_This_does_not_affect_emit,
        defaultValueDescription: Diagnostics.Platform_specific
    },
] as const;

/** @internal */
export const targetOptionDeclaration = {
    name: "target",
    shortName: "t",
    type: new Map(getEntries({
        es3: ScriptTarget.ES3,
        es5: ScriptTarget.ES5,
        es6: ScriptTarget.ES2015,
        es2015: ScriptTarget.ES2015,
        es2016: ScriptTarget.ES2016,
        es2017: ScriptTarget.ES2017,
        es2018: ScriptTarget.ES2018,
        es2019: ScriptTarget.ES2019,
        es2020: ScriptTarget.ES2020,
        es2021: ScriptTarget.ES2021,
        es2022: ScriptTarget.ES2022,
        esnext: ScriptTarget.ESNext,
    })),
    affectsSourceFile: true,
    affectsModuleResolution: true,
    affectsEmit: true,
    affectsBuildInfo: true,
    paramType: Diagnostics.VERSION,
    showInSimplifiedHelpView: true,
    category: Diagnostics.Language_and_Environment,
    description: Diagnostics.Set_the_JavaScript_language_version_for_emitted_JavaScript_and_include_compatible_library_declarations,
    defaultValueDescription: ScriptTarget.ES3,
} as const;

/** @internal */
export const moduleOptionDeclaration = {
    name: "module",
    shortName: "m",
    type: new Map(getEntries({
        none: ModuleKind.None,
        commonjs: ModuleKind.CommonJS,
        amd: ModuleKind.AMD,
        system: ModuleKind.System,
        umd: ModuleKind.UMD,
        es6: ModuleKind.ES2015,
        es2015: ModuleKind.ES2015,
        es2020: ModuleKind.ES2020,
        es2022: ModuleKind.ES2022,
        esnext: ModuleKind.ESNext,
        node16: ModuleKind.Node16,
        nodenext: ModuleKind.NodeNext,
    })),
    affectsModuleResolution: true,
    affectsEmit: true,
    affectsBuildInfo: true,
    paramType: Diagnostics.KIND,
    showInSimplifiedHelpView: true,
    category: Diagnostics.Modules,
    description: Diagnostics.Specify_what_module_code_is_generated,
    defaultValueDescription: undefined,
} as const;

const commandOptionsWithoutBuild = [
    // CommandLine only options
    {
        name: "all",
        type: "boolean",
        showInSimplifiedHelpView: true,
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Show_all_compiler_options,
        defaultValueDescription: false,
    },
    {
        name: "version",
        shortName: "v",
        type: "boolean",
        showInSimplifiedHelpView: true,
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Print_the_compiler_s_version,
        defaultValueDescription: false,
    },
    {
        name: "init",
        type: "boolean",
        showInSimplifiedHelpView: true,
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file,
        defaultValueDescription: false,
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
        description: Diagnostics.Build_one_or_more_projects_and_their_dependencies_if_out_of_date,
        defaultValueDescription: false,
    },
    {
        name: "showConfig",
        type: "boolean",
        showInSimplifiedHelpView: true,
        category: Diagnostics.Command_line_Options,
        isCommandLineOnly: true,
        description: Diagnostics.Print_the_final_configuration_instead_of_building,
        defaultValueDescription: false,
    },
    {
        name: "listFilesOnly",
        type: "boolean",
        category: Diagnostics.Command_line_Options,
        isCommandLineOnly: true,
        description: Diagnostics.Print_names_of_files_that_are_part_of_the_compilation_and_then_stop_processing,
        defaultValueDescription: false,
    },

    // Basic
    targetOptionDeclaration,
    moduleOptionDeclaration,
    {
        name: "lib",
        type: "list",
        element: {
            name: "lib",
            type: libMap,
            defaultValueDescription: undefined,
        },
        affectsProgramStructure: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Specify_a_set_of_bundled_library_declaration_files_that_describe_the_target_runtime_environment,
        transpileOptionValue: undefined
    },
    {
        name: "allowJs",
        type: "boolean",
        affectsModuleResolution: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.JavaScript_Support,
        description: Diagnostics.Allow_JavaScript_files_to_be_a_part_of_your_program_Use_the_checkJS_option_to_get_errors_from_these_files,
        defaultValueDescription: false,
    },
    {
        name: "checkJs",
        type: "boolean",
        showInSimplifiedHelpView: true,
        category: Diagnostics.JavaScript_Support,
        description: Diagnostics.Enable_error_reporting_in_type_checked_JavaScript_files,
        defaultValueDescription: false,
    },
    {
        name: "jsx",
        type: jsxOptionMap,
        affectsSourceFile: true,
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsModuleResolution: true,
        paramType: Diagnostics.KIND,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Specify_what_JSX_code_is_generated,
        defaultValueDescription: undefined,
    },
    {
        name: "outFile",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsDeclarationPath: true,
        isFilePath: true,
        paramType: Diagnostics.FILE,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Specify_a_file_that_bundles_all_outputs_into_one_JavaScript_file_If_declaration_is_true_also_designates_a_file_that_bundles_all_d_ts_output,
        transpileOptionValue: undefined,
    },
    {
        name: "outDir",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsDeclarationPath: true,
        isFilePath: true,
        paramType: Diagnostics.DIRECTORY,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Specify_an_output_folder_for_all_emitted_files,
    },
    {
        name: "rootDir",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsDeclarationPath: true,
        isFilePath: true,
        paramType: Diagnostics.LOCATION,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_the_root_folder_within_your_source_files,
        defaultValueDescription: Diagnostics.Computed_from_the_list_of_input_files
    },
    {
        name: "composite",
        type: "boolean",
        // Not setting affectsEmit because we calculate this flag might not affect full emit
        affectsBuildInfo: true,
        isTSConfigOnly: true,
        category: Diagnostics.Projects,
        transpileOptionValue: undefined,
        defaultValueDescription: false,
        description: Diagnostics.Enable_constraints_that_allow_a_TypeScript_project_to_be_used_with_project_references,
    },
    {
        name: "tsBuildInfoFile",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        isFilePath: true,
        paramType: Diagnostics.FILE,
        category: Diagnostics.Projects,
        transpileOptionValue: undefined,
        defaultValueDescription: ".tsbuildinfo",
        description: Diagnostics.Specify_the_path_to_tsbuildinfo_incremental_compilation_file,
    },
    {
        name: "removeComments",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Emit,
        defaultValueDescription: false,
        description: Diagnostics.Disable_emitting_comments,
    },
    {
        name: "noEmit",
        type: "boolean",
        showInSimplifiedHelpView: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Disable_emitting_files_from_a_compilation,
        transpileOptionValue: undefined,
        defaultValueDescription: false,
    },
    {
        name: "importHelpers",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Allow_importing_helper_functions_from_tslib_once_per_project_instead_of_including_them_per_file,
        defaultValueDescription: false,
    },
    {
        name: "importsNotUsedAsValues",
        type: new Map(getEntries({
            remove: ImportsNotUsedAsValues.Remove,
            preserve: ImportsNotUsedAsValues.Preserve,
            error: ImportsNotUsedAsValues.Error,
        })),
        affectsEmit: true,
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Specify_emit_Slashchecking_behavior_for_imports_that_are_only_used_for_types,
        defaultValueDescription: ImportsNotUsedAsValues.Remove,
    },
    {
        name: "downlevelIteration",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Emit_more_compliant_but_verbose_and_less_performant_JavaScript_for_iteration,
        defaultValueDescription: false,
    },
    {
        name: "isolatedModules",
        type: "boolean",
        category: Diagnostics.Interop_Constraints,
        description: Diagnostics.Ensure_that_each_file_can_be_safely_transpiled_without_relying_on_other_imports,
        transpileOptionValue: true,
        defaultValueDescription: false,
    },
    {
        name: "isolatedDeclarations",
        type: "boolean",
        category: Diagnostics.Interop_Constraints,
        description: Diagnostics.Ensure_that_each_file_can_have_declaration_emit_generated_without_type_information,
        transpileOptionValue: true,
        defaultValueDescription: false,
    },

    // Strict Type Checks
    {
        name: "strict",
        type: "boolean",
        // Though this affects semantic diagnostics, affectsSemanticDiagnostics is not set here
        // The value of each strictFlag depends on own strictFlag value or this and never accessed directly.
        // But we need to store `strict` in builf info, even though it won't be examined directly, so that the
        // flags it controls (e.g. `strictNullChecks`) will be retrieved correctly
        affectsBuildInfo: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Enable_all_strict_type_checking_options,
        defaultValueDescription: false,
    },
    {
        name: "noImplicitAny",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Enable_error_reporting_for_expressions_and_declarations_with_an_implied_any_type,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set
    },
    {
        name: "strictNullChecks",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.When_type_checking_take_into_account_null_and_undefined,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set
    },
    {
        name: "strictFunctionTypes",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.When_assigning_functions_check_to_ensure_parameters_and_the_return_values_are_subtype_compatible,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set
    },
    {
        name: "strictBindCallApply",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Check_that_the_arguments_for_bind_call_and_apply_methods_match_the_original_function,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set
    },
    {
        name: "strictPropertyInitialization",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Check_for_class_properties_that_are_declared_but_not_set_in_the_constructor,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set
    },
    {
        name: "noImplicitThis",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Enable_error_reporting_when_this_is_given_the_type_any,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set
    },
    {
        name: "useUnknownInCatchVariables",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Default_catch_clause_variables_as_unknown_instead_of_any,
        defaultValueDescription: false,
    },
    {
        name: "alwaysStrict",
        type: "boolean",
        affectsSourceFile: true,
        affectsEmit: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Ensure_use_strict_is_always_emitted,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set
    },

    // Additional Checks
    {
        name: "noUnusedLocals",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Enable_error_reporting_when_local_variables_aren_t_read,
        defaultValueDescription: false,
    },
    {
        name: "noUnusedParameters",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Raise_an_error_when_a_function_parameter_isn_t_read,
        defaultValueDescription: false,
    },
    {
        name: "exactOptionalPropertyTypes",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Interpret_optional_property_types_as_written_rather_than_adding_undefined,
        defaultValueDescription: false,
    },
    {
        name: "noImplicitReturns",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Enable_error_reporting_for_codepaths_that_do_not_explicitly_return_in_a_function,
        defaultValueDescription: false,
    },
    {
        name: "noFallthroughCasesInSwitch",
        type: "boolean",
        affectsBindDiagnostics: true,
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Enable_error_reporting_for_fallthrough_cases_in_switch_statements,
        defaultValueDescription: false,
    },
    {
        name: "noUncheckedIndexedAccess",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Add_undefined_to_a_type_when_accessed_using_an_index,
        defaultValueDescription: false,
    },
    {
        name: "noImplicitOverride",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Ensure_overriding_members_in_derived_classes_are_marked_with_an_override_modifier,
        defaultValueDescription: false,
    },
    {
        name: "noPropertyAccessFromIndexSignature",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        showInSimplifiedHelpView: false,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Enforces_using_indexed_accessors_for_keys_declared_using_an_indexed_type,
        defaultValueDescription: false,
    },

    // Module Resolution
    {
        name: "moduleResolution",
        type: new Map(getEntries({
            node: ModuleResolutionKind.NodeJs,
            classic: ModuleResolutionKind.Classic,
            node16: ModuleResolutionKind.Node16,
            nodenext: ModuleResolutionKind.NodeNext,
        })),
        affectsModuleResolution: true,
        paramType: Diagnostics.STRATEGY,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_how_TypeScript_looks_up_a_file_from_a_given_module_specifier,
        defaultValueDescription: Diagnostics.module_AMD_or_UMD_or_System_or_ES6_then_Classic_Otherwise_Node
    },
    {
        name: "baseUrl",
        type: "string",
        affectsModuleResolution: true,
        isFilePath: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_the_base_directory_to_resolve_non_relative_module_names
    },
    {
        // this option can only be specified in tsconfig.json
        // use type = object to copy the value as-is
        name: "paths",
        type: "object",
        affectsModuleResolution: true,
        isTSConfigOnly: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_a_set_of_entries_that_re_map_imports_to_additional_lookup_locations,
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
        category: Diagnostics.Modules,
        description: Diagnostics.Allow_multiple_folders_to_be_treated_as_one_when_resolving_modules,
        transpileOptionValue: undefined,
        defaultValueDescription: Diagnostics.Computed_from_the_list_of_input_files
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
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_multiple_folders_that_act_like_Slashnode_modules_Slash_types
    },
    {
        name: "types",
        type: "list",
        element: {
            name: "types",
            type: "string"
        },
        affectsProgramStructure: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_type_package_names_to_be_included_without_being_referenced_in_a_source_file,
        transpileOptionValue: undefined
    },
    {
        name: "allowSyntheticDefaultImports",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Interop_Constraints,
        description: Diagnostics.Allow_import_x_from_y_when_a_module_doesn_t_have_a_default_export,
        defaultValueDescription: Diagnostics.module_system_or_esModuleInterop
    },
    {
        name: "esModuleInterop",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsEmit: true,
        affectsBuildInfo: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Interop_Constraints,
        description: Diagnostics.Emit_additional_JavaScript_to_ease_support_for_importing_CommonJS_modules_This_enables_allowSyntheticDefaultImports_for_type_compatibility,
        defaultValueDescription: false,
    },
    {
        name: "preserveSymlinks",
        type: "boolean",
        category: Diagnostics.Interop_Constraints,
        description: Diagnostics.Disable_resolving_symlinks_to_their_realpath_This_correlates_to_the_same_flag_in_node,
        defaultValueDescription: false,
    },
    {
        name: "allowUmdGlobalAccess",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Allow_accessing_UMD_globals_from_modules,
        defaultValueDescription: false,
    },
    {
        name: "moduleSuffixes",
        type: "list",
        element: {
            name: "suffix",
            type: "string",
        },
        listPreserveFalsyValues: true,
        affectsModuleResolution: true,
        category: Diagnostics.Modules,
        description: Diagnostics.List_of_file_name_suffixes_to_search_when_resolving_a_module,
    },

    // Source Maps
    {
        name: "sourceRoot",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        paramType: Diagnostics.LOCATION,
        category: Diagnostics.Emit,
        description: Diagnostics.Specify_the_root_path_for_debuggers_to_find_the_reference_source_code,
    },
    {
        name: "mapRoot",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        paramType: Diagnostics.LOCATION,
        category: Diagnostics.Emit,
        description: Diagnostics.Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations,
    },
    {
        name: "inlineSources",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Include_source_code_in_the_sourcemaps_inside_the_emitted_JavaScript,
        defaultValueDescription: false,
    },

    // Experimental
    {
        name: "experimentalDecorators",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Enable_experimental_support_for_TC39_stage_2_draft_decorators,
        defaultValueDescription: false,
    },
    {
        name: "emitDecoratorMetadata",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Emit_design_type_metadata_for_decorated_declarations_in_source_files,
        defaultValueDescription: false,
    },

    // Advanced
    {
        name: "jsxFactory",
        type: "string",
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Specify_the_JSX_factory_function_used_when_targeting_React_JSX_emit_e_g_React_createElement_or_h,
        defaultValueDescription: "`React.createElement`"
    },
    {
        name: "jsxFragmentFactory",
        type: "string",
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Specify_the_JSX_Fragment_reference_used_for_fragments_when_targeting_React_JSX_emit_e_g_React_Fragment_or_Fragment,
        defaultValueDescription: "React.Fragment",
    },
    {
        name: "jsxImportSource",
        type: "string",
        affectsSemanticDiagnostics: true,
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsModuleResolution: true,
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Specify_module_specifier_used_to_import_the_JSX_factory_functions_when_using_jsx_Colon_react_jsx_Asterisk,
        defaultValueDescription: "react"
    },
    {
        name: "resolveJsonModule",
        type: "boolean",
        affectsModuleResolution: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Enable_importing_json_files,
        defaultValueDescription: false,
    },

    {
        name: "out",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsDeclarationPath: true,
        isFilePath: false, // This is intentionally broken to support compatability with existing tsconfig files
        // for correct behaviour, please use outFile
        category: Diagnostics.Backwards_Compatibility,
        paramType: Diagnostics.FILE,
        transpileOptionValue: undefined,
        description: Diagnostics.Deprecated_setting_Use_outFile_instead,
    },
    {
        name: "reactNamespace",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Specify_the_object_invoked_for_createElement_This_only_applies_when_targeting_react_JSX_emit,
        defaultValueDescription: "`React`",
    },
    {
        name: "skipDefaultLibCheck",
        type: "boolean",
        // We need to store these to determine whether `lib` files need to be rechecked
        affectsBuildInfo: true,
        category: Diagnostics.Completeness,
        description: Diagnostics.Skip_type_checking_d_ts_files_that_are_included_with_TypeScript,
        defaultValueDescription: false,
    },
    {
        name: "charset",
        type: "string",
        category: Diagnostics.Backwards_Compatibility,
        description: Diagnostics.No_longer_supported_In_early_versions_manually_set_the_text_encoding_for_reading_files,
        defaultValueDescription: "utf8"
    },
    {
        name: "emitBOM",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Emit_a_UTF_8_Byte_Order_Mark_BOM_in_the_beginning_of_output_files,
        defaultValueDescription: false,
    },
    {
        name: "newLine",
        type: new Map(getEntries({
            crlf: NewLineKind.CarriageReturnLineFeed,
            lf: NewLineKind.LineFeed
        })),
        affectsEmit: true,
        affectsBuildInfo: true,
        paramType: Diagnostics.NEWLINE,
        category: Diagnostics.Emit,
        description: Diagnostics.Set_the_newline_character_for_emitting_files,
        defaultValueDescription: Diagnostics.Platform_specific
    },
    {
        name: "noErrorTruncation",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Output_Formatting,
        description: Diagnostics.Disable_truncating_types_in_error_messages,
        defaultValueDescription: false,
    },
    {
        name: "noLib",
        type: "boolean",
        category: Diagnostics.Language_and_Environment,
        affectsProgramStructure: true,
        description: Diagnostics.Disable_including_any_library_files_including_the_default_lib_d_ts,
        // We are not returning a sourceFile for lib file when asked by the program,
        // so pass --noLib to avoid reporting a file not found error.
        transpileOptionValue: true,
        defaultValueDescription: false,
    },
    {
        name: "noResolve",
        type: "boolean",
        affectsModuleResolution: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Disallow_import_s_require_s_or_reference_s_from_expanding_the_number_of_files_TypeScript_should_add_to_a_project,
        // We are not doing a full typecheck, we are not resolving the whole context,
        // so pass --noResolve to avoid reporting missing file errors.
        transpileOptionValue: true,
        defaultValueDescription: false,
    },
    {
        name: "stripInternal",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Disable_emitting_declarations_that_have_internal_in_their_JSDoc_comments,
        defaultValueDescription: false,
    },
    {
        name: "disableSizeLimit",
        type: "boolean",
        affectsProgramStructure: true,
        category: Diagnostics.Editor_Support,
        description: Diagnostics.Remove_the_20mb_cap_on_total_source_code_size_for_JavaScript_files_in_the_TypeScript_language_server,
        defaultValueDescription: false,
    },
    {
        name: "disableSourceOfProjectReferenceRedirect",
        type: "boolean",
        isTSConfigOnly: true,
        category: Diagnostics.Projects,
        description: Diagnostics.Disable_preferring_source_files_instead_of_declaration_files_when_referencing_composite_projects,
        defaultValueDescription: false,
    },
    {
        name: "disableSolutionSearching",
        type: "boolean",
        isTSConfigOnly: true,
        category: Diagnostics.Projects,
        description: Diagnostics.Opt_a_project_out_of_multi_project_reference_checking_when_editing,
        defaultValueDescription: false,
    },
    {
        name: "disableReferencedProjectLoad",
        type: "boolean",
        isTSConfigOnly: true,
        category: Diagnostics.Projects,
        description: Diagnostics.Reduce_the_number_of_projects_loaded_automatically_by_TypeScript,
        defaultValueDescription: false,
    },
    {
        name: "noImplicitUseStrict",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Backwards_Compatibility,
        description: Diagnostics.Disable_adding_use_strict_directives_in_emitted_JavaScript_files,
        defaultValueDescription: false,
    },
    {
        name: "noEmitHelpers",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Disable_generating_custom_helper_functions_like_extends_in_compiled_output,
        defaultValueDescription: false,
    },
    {
        name: "noEmitOnError",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        transpileOptionValue: undefined,
        description: Diagnostics.Disable_emitting_files_if_any_type_checking_errors_are_reported,
        defaultValueDescription: false,
    },
    {
        name: "preserveConstEnums",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Disable_erasing_const_enum_declarations_in_generated_code,
        defaultValueDescription: false,
    },
    {
        name: "declarationDir",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsDeclarationPath: true,
        isFilePath: true,
        paramType: Diagnostics.DIRECTORY,
        category: Diagnostics.Emit,
        transpileOptionValue: undefined,
        description: Diagnostics.Specify_the_output_directory_for_generated_declaration_files,
    },
    {
        name: "skipLibCheck",
        type: "boolean",
        // We need to store these to determine whether `lib` files need to be rechecked
        affectsBuildInfo: true,
        category: Diagnostics.Completeness,
        description: Diagnostics.Skip_type_checking_all_d_ts_files,
        defaultValueDescription: false,
    },
    {
        name: "allowUnusedLabels",
        type: "boolean",
        affectsBindDiagnostics: true,
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Disable_error_reporting_for_unused_labels,
        defaultValueDescription: undefined,
    },
    {
        name: "allowUnreachableCode",
        type: "boolean",
        affectsBindDiagnostics: true,
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Disable_error_reporting_for_unreachable_code,
        defaultValueDescription: undefined,
    },
    {
        name: "suppressExcessPropertyErrors",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Backwards_Compatibility,
        description: Diagnostics.Disable_reporting_of_excess_property_errors_during_the_creation_of_object_literals,
        defaultValueDescription: false,
    },
    {
        name: "suppressImplicitAnyIndexErrors",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Backwards_Compatibility,
        description: Diagnostics.Suppress_noImplicitAny_errors_when_indexing_objects_that_lack_index_signatures,
        defaultValueDescription: false,
    },
    {
        name: "forceConsistentCasingInFileNames",
        type: "boolean",
        affectsModuleResolution: true,
        category: Diagnostics.Interop_Constraints,
        description: Diagnostics.Ensure_that_casing_is_correct_in_imports,
        defaultValueDescription: false,
    },
    {
        name: "maxNodeModuleJsDepth",
        type: "number",
        affectsModuleResolution: true,
        category: Diagnostics.JavaScript_Support,
        description: Diagnostics.Specify_the_maximum_folder_depth_used_for_checking_JavaScript_files_from_node_modules_Only_applicable_with_allowJs,
        defaultValueDescription: 0,
    },
    {
        name: "noStrictGenericChecks",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Backwards_Compatibility,
        description: Diagnostics.Disable_strict_checking_of_generic_signatures_in_function_types,
        defaultValueDescription: false,
    },
    {
        name: "useDefineForClassFields",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Emit_ECMAScript_standard_compliant_class_fields,
        defaultValueDescription: Diagnostics.true_for_ES2022_and_above_including_ESNext
    },
    {
        name: "preserveValueImports",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Preserve_unused_imported_values_in_the_JavaScript_output_that_would_otherwise_be_removed,
        defaultValueDescription: false,
    },

    {
        name: "keyofStringsOnly",
        type: "boolean",
        category: Diagnostics.Backwards_Compatibility,
        description: Diagnostics.Make_keyof_only_return_strings_instead_of_string_numbers_or_symbols_Legacy_option,
        defaultValueDescription: false,
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
        description: Diagnostics.Specify_a_list_of_language_service_plugins_to_include,
        category: Diagnostics.Editor_Support,

    },
    {
        name: "moduleDetection",
        type: new Map(getEntries({
            auto: ModuleDetectionKind.Auto,
            legacy: ModuleDetectionKind.Legacy,
            force: ModuleDetectionKind.Force,
        })),
        affectsModuleResolution: true,
        description: Diagnostics.Control_what_method_is_used_to_detect_module_format_JS_files,
        category: Diagnostics.Language_and_Environment,
        defaultValueDescription: Diagnostics.auto_Colon_Treat_files_with_imports_exports_import_meta_jsx_with_jsx_Colon_react_jsx_or_esm_format_with_module_Colon_node16_as_modules,
    }
] as const;

/** @internal */
export const optionDeclarations = [
    ...commonOptionsWithBuild,
    ...commandOptionsWithoutBuild,
];


export type CommandLineOption = CommandLineOptionOfCustomType | CommandLineOptionOfStringType | CommandLineOptionOfNumberType | CommandLineOptionOfBooleanType | TsConfigOnlyOption | CommandLineOptionOfListType;


/** @internal */
export interface CommandLineOptionOfStringType extends CommandLineOptionBase {
    type: "string";
    defaultValueDescription?: string | undefined | DiagnosticMessage;
}

/** @internal */
export interface CommandLineOptionOfNumberType extends CommandLineOptionBase {
    type: "number";
    defaultValueDescription: number | undefined | DiagnosticMessage;
}

/** @internal */
export interface CommandLineOptionOfBooleanType extends CommandLineOptionBase {
    type: "boolean";
    defaultValueDescription: boolean | undefined | DiagnosticMessage;
}

/** @internal */
export interface CommandLineOptionOfCustomType extends CommandLineOptionBase {
    type: Map<string, number | string>;  // an object literal mapping named values to actual values
    defaultValueDescription: number | string | undefined | DiagnosticMessage;
}


/** @internal */
export interface TsConfigOnlyOption extends CommandLineOptionBase {
    type: "object";
    elementOptions?: Map<string, CommandLineOption>;
}

/** @internal */
export interface CommandLineOptionOfListType extends CommandLineOptionBase {
    type: "list";
    element: CommandLineOptionOfCustomType | CommandLineOptionOfStringType | CommandLineOptionOfNumberType | CommandLineOptionOfBooleanType | TsConfigOnlyOption;
    listPreserveFalsyValues?: boolean;
}


/** @internal */
export interface CommandLineOptionBase {
    name: string;
    type: "string" | "number" | "boolean" | "object" | "list" | Map<string, number | string>;    // a value of a primitive type, or an object literal mapping named values to actual values
    isFilePath?: boolean;                                   // True if option value is a path or fileName
    shortName?: string;                                     // A short mnemonic for convenience - for instance, 'h' can be used in place of 'help'
    description?: DiagnosticMessage;                        // The message describing what the command line switch does.
    defaultValueDescription?: string | number | boolean | DiagnosticMessage;   // The message describing what the dafault value is. string type is prepared for fixed chosen like "false" which do not need I18n.
    paramType?: DiagnosticMessage;                          // The name to be used for a non-boolean option's parameter
    isTSConfigOnly?: boolean;                               // True if option can only be specified via tsconfig.json file
    isCommandLineOnly?: boolean;
    showInSimplifiedHelpView?: boolean;
    category?: DiagnosticMessage;
    strictFlag?: true;                                      // true if the option is one of the flag under strict
    affectsSourceFile?: true;                               // true if we should recreate SourceFiles after this option changes
    affectsModuleResolution?: true;                         // currently same effect as `affectsSourceFile`
    affectsBindDiagnostics?: true;                          // true if this affects binding (currently same effect as `affectsSourceFile`)
    affectsSemanticDiagnostics?: true;                      // true if option affects semantic diagnostics
    affectsEmit?: true;                                     // true if the options affects emit
    affectsProgramStructure?: true;                         // true if program should be reconstructed from root files if option changes and does not affect module resolution as affectsModuleResolution indirectly means program needs to reconstructed
    affectsDeclarationPath?: true;                          // true if the options affects declaration file path computed
    affectsBuildInfo?: true;                                // true if this options should be emitted in buildInfo
    transpileOptionValue?: boolean | undefined;             // If set this means that the option should be set to this value when transpiling
}



function convertJsonOptionOfCustomType(opt: CommandLineOptionOfCustomType, value: string, errors: Diagnostic[]) {
    if (isNullOrUndefined(value)) return undefined;
    const key = value.toLowerCase();
    const val = opt.type.get(key);
    if (val !== undefined) {
        return validateJsonOptionValue(opt, val, errors);
    }
    else {
        return undefined;
    }
}


function validateJsonOptionValue<T extends CompilerOptionsValue>(opt: CommandLineOption, value: T, errors: Diagnostic[]): T | undefined {
    if (isNullOrUndefined(value)) return undefined;
    return value;
}


/** @internal */
export function parseCustomTypeOption(opt: CommandLineOptionOfCustomType, value: string, errors: Diagnostic[]) {
    return convertJsonOptionOfCustomType(opt, trimString(value || ""), errors);
}

/** @internal */
export function parseListTypeOption(opt: CommandLineOptionOfListType, value = "", errors: Diagnostic[]): (string | number)[] | undefined {
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
            return mapDefined(values, v => validateJsonOptionValue(opt.element, parseInt(v), errors));
        case "string":
            return mapDefined(values, v => validateJsonOptionValue(opt.element, v || "", errors));
        default:
            return mapDefined(values, v => parseCustomTypeOption(opt.element as CommandLineOptionOfCustomType, v, errors));
    }
}
