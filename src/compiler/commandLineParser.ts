import {
    AlternateModeDiagnostics,
    append,
    arrayFrom,
    ArrayLiteralExpression,
    arrayToMap,
    assign,
    BuildOptions,
    cast,
    changeExtension,
    CharacterCodes,
    combinePaths,
    CommandLineOption,
    CommandLineOptionOfCustomType,
    CommandLineOptionOfListType,
    CompilerOptions,
    CompilerOptionsValue,
    computedOptions,
    ConfigFileSpecs,
    containsPath,
    convertToRelativePath,
    createCompilerDiagnostic,
    createDiagnosticForNodeInSourceFile,
    createGetCanonicalFileName,
    Debug,
    Diagnostic,
    DiagnosticArguments,
    DiagnosticMessage,
    Diagnostics,
    DidYouMeanOptionsDiagnostics,
    directorySeparator,
    emptyArray,
    endsWith,
    ensureTrailingDirectorySeparator,
    every,
    Expression,
    extend,
    Extension,
    FileExtensionInfo,
    fileExtensionIs,
    fileExtensionIsOneOf,
    filter,
    filterMutate,
    find,
    findIndex,
    firstOrUndefinedIterator,
    flatten,
    forEach,
    forEachEntry,
    forEachTsConfigPropArray,
    getBaseFileName,
    getDirectoryPath,
    getFileMatcherPatterns,
    getLocaleSpecificMessage,
    getNormalizedAbsolutePath,
    getOwnKeys,
    getRegexFromPattern,
    getRegularExpressionForWildcard,
    getRegularExpressionsForWildcards,
    getRelativePathFromFile,
    getSpellingSuggestion,
    getSupportedExtensions,
    getSupportedExtensionsWithJsonIfResolveJsonModule,
    getTextOfPropertyName,
    getTsConfigPropArrayElementValue,
    hasExtension,
    hasProperty,
    ImportsNotUsedAsValues,
    isArray,
    isArrayLiteralExpression,
    isComputedNonLiteralName,
    isImplicitGlob,
    isObjectLiteralExpression,
    isRootedDiskPath,
    isString,
    isStringDoubleQuoted,
    isStringLiteral,
    JsonSourceFile,
    JsxEmit,
    length,
    map,
    mapDefined,
    mapIterator,
    MapLike,
    ModuleDetectionKind,
    ModuleKind,
    ModuleResolutionKind,
    NewLineKind,
    Node,
    NodeArray,
    nodeNextJsonConfigResolver,
    normalizePath,
    normalizeSlashes,
    NumericLiteral,
    ObjectLiteralExpression,
    ParseConfigHost,
    ParsedCommandLine,
    parseJsonText,
    Path,
    PollingWatchKind,
    PrefixUnaryExpression,
    ProjectReference,
    PropertyAssignment,
    PropertyName,
    removeTrailingDirectorySeparator,
    returnTrue,
    ScriptTarget,
    some,
    startsWith,
    StringLiteral,
    SyntaxKind,
    sys,
    toFileNameLowerCase,
    toPath,
    tracing,
    TsConfigOnlyOption,
    TsConfigSourceFile,
    TypeAcquisition,
    unescapeLeadingUnderscores,
    WatchDirectoryFlags,
    WatchDirectoryKind,
    WatchFileKind,
    WatchOptions,
} from "./_namespaces/ts.js";

const compileOnSaveCommandLineOption: CommandLineOption = {
    name: "compileOnSave",
    type: "boolean",
    defaultValueDescription: false,
};

const jsxOptionMap = new Map(Object.entries({
    "preserve": JsxEmit.Preserve,
    "react-native": JsxEmit.ReactNative,
    "react": JsxEmit.React,
    "react-jsx": JsxEmit.ReactJSX,
    "react-jsxdev": JsxEmit.ReactJSXDev,
}));

/** @internal */
export const inverseJsxOptionMap = new Map(mapIterator(jsxOptionMap.entries(), ([key, value]: [string, JsxEmit]) => ["" + value, key] as const));

// NOTE: The order here is important to default lib ordering as entries will have the same
//       order in the generated program (see `getDefaultLibPriority` in program.ts). This
//       order also affects overload resolution when a type declared in one lib is
//       augmented in another lib.
// NOTE: We must reevaluate the target for upcoming features when each successive TC39 edition is ratified in
//       June of each year. This includes changes to `LanguageFeatureMinimumTarget`, `ScriptTarget`,
//       transformers/esnext.ts, commandLineParser.ts, and the contents of each lib/esnext.*.d.ts file.
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
    ["es2023", "lib.es2023.d.ts"],
    ["esnext", "lib.esnext.d.ts"],
    // Host only
    ["dom", "lib.dom.d.ts"],
    ["dom.iterable", "lib.dom.iterable.d.ts"],
    ["dom.asynciterable", "lib.dom.asynciterable.d.ts"],
    ["webworker", "lib.webworker.d.ts"],
    ["webworker.importscripts", "lib.webworker.importscripts.d.ts"],
    ["webworker.iterable", "lib.webworker.iterable.d.ts"],
    ["webworker.asynciterable", "lib.webworker.asynciterable.d.ts"],
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
    ["es2016.intl", "lib.es2016.intl.d.ts"],
    ["es2017.date", "lib.es2017.date.d.ts"],
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
    ["es2022.regexp", "lib.es2022.regexp.d.ts"],
    ["es2023.array", "lib.es2023.array.d.ts"],
    ["es2023.collection", "lib.es2023.collection.d.ts"],
    ["es2023.intl", "lib.es2023.intl.d.ts"],
    ["esnext.array", "lib.es2023.array.d.ts"],
    ["esnext.collection", "lib.esnext.collection.d.ts"],
    ["esnext.symbol", "lib.es2019.symbol.d.ts"],
    ["esnext.asynciterable", "lib.es2018.asynciterable.d.ts"],
    ["esnext.intl", "lib.esnext.intl.d.ts"],
    ["esnext.disposable", "lib.esnext.disposable.d.ts"],
    ["esnext.bigint", "lib.es2020.bigint.d.ts"],
    ["esnext.string", "lib.es2022.string.d.ts"],
    ["esnext.promise", "lib.esnext.promise.d.ts"],
    ["esnext.weakref", "lib.es2021.weakref.d.ts"],
    ["esnext.decorators", "lib.esnext.decorators.d.ts"],
    ["esnext.object", "lib.esnext.object.d.ts"],
    ["esnext.array", "lib.esnext.array.d.ts"],
    ["esnext.regexp", "lib.esnext.regexp.d.ts"],
    ["esnext.string", "lib.esnext.string.d.ts"],
    ["esnext.iterator", "lib.esnext.iterator.d.ts"],
    ["decorators", "lib.decorators.d.ts"],
    ["decorators.legacy", "lib.decorators.legacy.d.ts"],
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

// Watch related options

// Do not delete this without updating the website's tsconfig generation.
/** @internal */
export const optionsForWatch: CommandLineOption[] = [
    {
        name: "watchFile",
        type: new Map(Object.entries({
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
        type: new Map(Object.entries({
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
        type: new Map(Object.entries({
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
            extraValidation: specToDiagnostic,
        },
        allowConfigDirTemplateSubstitution: true,
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
            extraValidation: specToDiagnostic,
        },
        allowConfigDirTemplateSubstitution: true,
        category: Diagnostics.Watch_and_Build_Modes,
        description: Diagnostics.Remove_a_list_of_files_from_the_watch_mode_s_processing,
    },
];

/** @internal */
export const commonOptionsWithBuild: CommandLineOption[] = [
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
        defaultValueDescription: "profile.cpuprofile",
    },
    {
        name: "generateTrace",
        type: "string",
        isFilePath: true,
        isCommandLineOnly: true,
        paramType: Diagnostics.DIRECTORY,
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Generates_an_event_trace_and_a_list_of_types,
    },
    {
        name: "incremental",
        shortName: "i",
        type: "boolean",
        category: Diagnostics.Projects,
        description: Diagnostics.Save_tsbuildinfo_files_to_allow_for_incremental_compilation_of_projects,
        transpileOptionValue: undefined,
        defaultValueDescription: Diagnostics.false_unless_composite_is_set,
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
        defaultValueDescription: false,
        description: Diagnostics.Create_sourcemaps_for_d_ts_files,
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
        name: "noCheck",
        type: "boolean",
        showInSimplifiedHelpView: false,
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Disable_full_type_checking_only_critical_parse_and_emit_errors_will_be_reported,
        transpileOptionValue: true,
        defaultValueDescription: false,
        // Not setting affectsSemanticDiagnostics or affectsBuildInfo because we dont want all diagnostics to go away, its handled in builder
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
        defaultValueDescription: Diagnostics.Platform_specific,
    },
];

/** @internal */
export const targetOptionDeclaration: CommandLineOptionOfCustomType = {
    name: "target",
    shortName: "t",
    type: new Map(Object.entries({
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
        es2023: ScriptTarget.ES2023,
        esnext: ScriptTarget.ESNext,
    })),
    affectsSourceFile: true,
    affectsModuleResolution: true,
    affectsEmit: true,
    affectsBuildInfo: true,
    deprecatedKeys: new Set(["es3"]),
    paramType: Diagnostics.VERSION,
    showInSimplifiedHelpView: true,
    category: Diagnostics.Language_and_Environment,
    description: Diagnostics.Set_the_JavaScript_language_version_for_emitted_JavaScript_and_include_compatible_library_declarations,
    defaultValueDescription: ScriptTarget.ES5,
};

/** @internal */
export const moduleOptionDeclaration: CommandLineOptionOfCustomType = {
    name: "module",
    shortName: "m",
    type: new Map(Object.entries({
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
        preserve: ModuleKind.Preserve,
    })),
    affectsSourceFile: true,
    affectsModuleResolution: true,
    affectsEmit: true,
    affectsBuildInfo: true,
    paramType: Diagnostics.KIND,
    showInSimplifiedHelpView: true,
    category: Diagnostics.Modules,
    description: Diagnostics.Specify_what_module_code_is_generated,
    defaultValueDescription: undefined,
};

const commandOptionsWithoutBuild: CommandLineOption[] = [
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
        transpileOptionValue: undefined,
    },
    {
        name: "allowJs",
        type: "boolean",
        allowJsFlag: true,
        affectsBuildInfo: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.JavaScript_Support,
        description: Diagnostics.Allow_JavaScript_files_to_be_a_part_of_your_program_Use_the_checkJS_option_to_get_errors_from_these_files,
        defaultValueDescription: false,
    },
    {
        name: "checkJs",
        type: "boolean",
        affectsModuleResolution: true,
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
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
        // The checker emits an error when it sees JSX but this option is not set in compilerOptions.
        // This is effectively a semantic error, so mark this option as affecting semantic diagnostics
        // so we know to refresh errors when this option is changed.
        affectsSemanticDiagnostics: true,
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
        defaultValueDescription: Diagnostics.Computed_from_the_list_of_input_files,
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
        name: "importHelpers",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsSourceFile: true,
        category: Diagnostics.Emit,
        description: Diagnostics.Allow_importing_helper_functions_from_tslib_once_per_project_instead_of_including_them_per_file,
        defaultValueDescription: false,
    },
    {
        name: "importsNotUsedAsValues",
        type: new Map(Object.entries({
            remove: ImportsNotUsedAsValues.Remove,
            preserve: ImportsNotUsedAsValues.Preserve,
            error: ImportsNotUsedAsValues.Error,
        })),
        affectsEmit: true,
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Backwards_Compatibility,
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
        name: "verbatimModuleSyntax",
        type: "boolean",
        affectsEmit: true,
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Interop_Constraints,
        description: Diagnostics.Do_not_transform_or_elide_any_imports_or_exports_not_marked_as_type_only_ensuring_they_are_written_in_the_output_file_s_format_based_on_the_module_setting,
        defaultValueDescription: false,
    },
    {
        name: "isolatedDeclarations",
        type: "boolean",
        category: Diagnostics.Interop_Constraints,
        description: Diagnostics.Require_sufficient_annotation_on_exports_so_other_tools_can_trivially_generate_declaration_files,
        defaultValueDescription: false,
        affectsBuildInfo: true,
        affectsSemanticDiagnostics: true,
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
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
    },
    {
        name: "strictNullChecks",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.When_type_checking_take_into_account_null_and_undefined,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
    },
    {
        name: "strictFunctionTypes",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.When_assigning_functions_check_to_ensure_parameters_and_the_return_values_are_subtype_compatible,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
    },
    {
        name: "strictBindCallApply",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Check_that_the_arguments_for_bind_call_and_apply_methods_match_the_original_function,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
    },
    {
        name: "strictPropertyInitialization",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Check_for_class_properties_that_are_declared_but_not_set_in_the_constructor,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
    },
    {
        name: "strictBuiltinIteratorReturn",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Built_in_iterators_are_instantiated_with_a_TReturn_type_of_undefined_instead_of_any,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
    },
    {
        name: "noImplicitThis",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Enable_error_reporting_when_this_is_given_the_type_any,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
    },
    {
        name: "useUnknownInCatchVariables",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.Default_catch_clause_variables_as_unknown_instead_of_any,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
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
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
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
        type: new Map(Object.entries({
            // N.B. The first entry specifies the value shown in `tsc --init`
            node10: ModuleResolutionKind.Node10,
            node: ModuleResolutionKind.Node10,
            classic: ModuleResolutionKind.Classic,
            node16: ModuleResolutionKind.Node16,
            nodenext: ModuleResolutionKind.NodeNext,
            bundler: ModuleResolutionKind.Bundler,
        })),
        deprecatedKeys: new Set(["node"]),
        affectsSourceFile: true,
        affectsModuleResolution: true,
        paramType: Diagnostics.STRATEGY,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_how_TypeScript_looks_up_a_file_from_a_given_module_specifier,
        defaultValueDescription: Diagnostics.module_AMD_or_UMD_or_System_or_ES6_then_Classic_Otherwise_Node,
    },
    {
        name: "baseUrl",
        type: "string",
        affectsModuleResolution: true,
        isFilePath: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_the_base_directory_to_resolve_non_relative_module_names,
    },
    {
        // this option can only be specified in tsconfig.json
        // use type = object to copy the value as-is
        name: "paths",
        type: "object",
        affectsModuleResolution: true,
        allowConfigDirTemplateSubstitution: true,
        isTSConfigOnly: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_a_set_of_entries_that_re_map_imports_to_additional_lookup_locations,
        transpileOptionValue: undefined,
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
            isFilePath: true,
        },
        affectsModuleResolution: true,
        allowConfigDirTemplateSubstitution: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Allow_multiple_folders_to_be_treated_as_one_when_resolving_modules,
        transpileOptionValue: undefined,
        defaultValueDescription: Diagnostics.Computed_from_the_list_of_input_files,
    },
    {
        name: "typeRoots",
        type: "list",
        element: {
            name: "typeRoots",
            type: "string",
            isFilePath: true,
        },
        affectsModuleResolution: true,
        allowConfigDirTemplateSubstitution: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_multiple_folders_that_act_like_Slashnode_modules_Slash_types,
    },
    {
        name: "types",
        type: "list",
        element: {
            name: "types",
            type: "string",
        },
        affectsProgramStructure: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Specify_type_package_names_to_be_included_without_being_referenced_in_a_source_file,
        transpileOptionValue: undefined,
    },
    {
        name: "allowSyntheticDefaultImports",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Interop_Constraints,
        description: Diagnostics.Allow_import_x_from_y_when_a_module_doesn_t_have_a_default_export,
        defaultValueDescription: Diagnostics.module_system_or_esModuleInterop,
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
    {
        name: "allowImportingTsExtensions",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Allow_imports_to_include_TypeScript_file_extensions_Requires_moduleResolution_bundler_and_either_noEmit_or_emitDeclarationOnly_to_be_set,
        defaultValueDescription: false,
        transpileOptionValue: undefined,
    },
    {
        name: "resolvePackageJsonExports",
        type: "boolean",
        affectsModuleResolution: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Use_the_package_json_exports_field_when_resolving_package_imports,
        defaultValueDescription: Diagnostics.true_when_moduleResolution_is_node16_nodenext_or_bundler_otherwise_false,
    },
    {
        name: "resolvePackageJsonImports",
        type: "boolean",
        affectsModuleResolution: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Use_the_package_json_imports_field_when_resolving_imports,
        defaultValueDescription: Diagnostics.true_when_moduleResolution_is_node16_nodenext_or_bundler_otherwise_false,
    },
    {
        name: "customConditions",
        type: "list",
        element: {
            name: "condition",
            type: "string",
        },
        affectsModuleResolution: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Conditions_to_set_in_addition_to_the_resolver_specific_defaults_when_resolving_imports,
    },
    {
        name: "noUncheckedSideEffectImports",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Check_side_effect_imports,
        defaultValueDescription: false,
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
        affectsEmit: true,
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Enable_experimental_support_for_legacy_experimental_decorators,
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
        defaultValueDescription: "`React.createElement`",
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
        affectsSourceFile: true,
        category: Diagnostics.Language_and_Environment,
        description: Diagnostics.Specify_module_specifier_used_to_import_the_JSX_factory_functions_when_using_jsx_Colon_react_jsx_Asterisk,
        defaultValueDescription: "react",
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
        name: "allowArbitraryExtensions",
        type: "boolean",
        affectsProgramStructure: true,
        category: Diagnostics.Modules,
        description: Diagnostics.Enable_importing_files_with_any_extension_provided_a_declaration_file_is_present,
        defaultValueDescription: false,
    },

    {
        name: "out",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsDeclarationPath: true,
        isFilePath: false, // This is intentionally broken to support compatibility with existing tsconfig files
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
        defaultValueDescription: "utf8",
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
        type: new Map(Object.entries({
            crlf: NewLineKind.CarriageReturnLineFeed,
            lf: NewLineKind.LineFeed,
        })),
        affectsEmit: true,
        affectsBuildInfo: true,
        paramType: Diagnostics.NEWLINE,
        category: Diagnostics.Emit,
        description: Diagnostics.Set_the_newline_character_for_emitting_files,
        defaultValueDescription: "lf",
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
        defaultValueDescription: true,
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
        defaultValueDescription: Diagnostics.true_for_ES2022_and_above_including_ESNext,
    },
    {
        name: "preserveValueImports",
        type: "boolean",
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Backwards_Compatibility,
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
            type: "object",
        },
        description: Diagnostics.Specify_a_list_of_language_service_plugins_to_include,
        category: Diagnostics.Editor_Support,
    },
    {
        name: "moduleDetection",
        type: new Map(Object.entries({
            auto: ModuleDetectionKind.Auto,
            legacy: ModuleDetectionKind.Legacy,
            force: ModuleDetectionKind.Force,
        })),
        affectsSourceFile: true,
        affectsModuleResolution: true,
        description: Diagnostics.Control_what_method_is_used_to_detect_module_format_JS_files,
        category: Diagnostics.Language_and_Environment,
        defaultValueDescription: Diagnostics.auto_Colon_Treat_files_with_imports_exports_import_meta_jsx_with_jsx_Colon_react_jsx_or_esm_format_with_module_Colon_node16_as_modules,
    },
    {
        name: "ignoreDeprecations",
        type: "string",
        defaultValueDescription: undefined,
    },
];

// Do not delete this without updating the website's tsconfig generation.
/** @internal */
export const optionDeclarations: CommandLineOption[] = [
    ...commonOptionsWithBuild,
    ...commandOptionsWithoutBuild,
];

/** @internal */
export const semanticDiagnosticsOptionDeclarations: readonly CommandLineOption[] = optionDeclarations.filter(option => !!option.affectsSemanticDiagnostics);

/** @internal */
export const affectsEmitOptionDeclarations: readonly CommandLineOption[] = optionDeclarations.filter(option => !!option.affectsEmit);

/** @internal */
export const affectsDeclarationPathOptionDeclarations: readonly CommandLineOption[] = optionDeclarations.filter(option => !!option.affectsDeclarationPath);

/** @internal */
export const moduleResolutionOptionDeclarations: readonly CommandLineOption[] = optionDeclarations.filter(option => !!option.affectsModuleResolution);

/** @internal */
export const sourceFileAffectingCompilerOptions: readonly CommandLineOption[] = optionDeclarations.filter(option => !!option.affectsSourceFile || !!option.affectsBindDiagnostics);

/** @internal */
export const optionsAffectingProgramStructure: readonly CommandLineOption[] = optionDeclarations.filter(option => !!option.affectsProgramStructure);

/** @internal */
export const transpileOptionValueCompilerOptions: readonly CommandLineOption[] = optionDeclarations.filter(option => hasProperty(option, "transpileOptionValue"));

const configDirTemplateSubstitutionOptions: readonly CommandLineOption[] = optionDeclarations.filter(
    option => option.allowConfigDirTemplateSubstitution || (!option.isCommandLineOnly && option.isFilePath),
);

const configDirTemplateSubstitutionWatchOptions: readonly CommandLineOption[] = optionsForWatch.filter(
    option => option.allowConfigDirTemplateSubstitution || (!option.isCommandLineOnly && option.isFilePath),
);

/** @internal */
export const commandLineOptionOfCustomType: readonly CommandLineOptionOfCustomType[] = optionDeclarations.filter(isCommandLineOptionOfCustomType);
function isCommandLineOptionOfCustomType(option: CommandLineOption): option is CommandLineOptionOfCustomType {
    return !isString(option.type);
}

// Build related options
/** @internal */
export const optionsForBuild: CommandLineOption[] = [
    {
        name: "verbose",
        shortName: "v",
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Enable_verbose_logging,
        type: "boolean",
        defaultValueDescription: false,
    },
    {
        name: "dry",
        shortName: "d",
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Show_what_would_be_built_or_deleted_if_specified_with_clean,
        type: "boolean",
        defaultValueDescription: false,
    },
    {
        name: "force",
        shortName: "f",
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Build_all_projects_including_those_that_appear_to_be_up_to_date,
        type: "boolean",
        defaultValueDescription: false,
    },
    {
        name: "clean",
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Delete_the_outputs_of_all_projects,
        type: "boolean",
        defaultValueDescription: false,
    },
];

/** @internal */
export const buildOpts: CommandLineOption[] = [
    ...commonOptionsWithBuild,
    ...optionsForBuild,
];

// Do not delete this without updating the website's tsconfig generation.
/** @internal */
export const typeAcquisitionDeclarations: CommandLineOption[] = [
    {
        name: "enable",
        type: "boolean",
        defaultValueDescription: false,
    },
    {
        name: "include",
        type: "list",
        element: {
            name: "include",
            type: "string",
        },
    },
    {
        name: "exclude",
        type: "list",
        element: {
            name: "exclude",
            type: "string",
        },
    },
    {
        name: "disableFilenameBasedTypeAcquisition",
        type: "boolean",
        defaultValueDescription: false,
    },
];

/** @internal */
export interface OptionsNameMap {
    optionsNameMap: Map<string, CommandLineOption>;
    shortOptionNames: Map<string, string>;
}

/** @internal */
export function createOptionNameMap(optionDeclarations: readonly CommandLineOption[]): OptionsNameMap {
    const optionsNameMap = new Map<string, CommandLineOption>();
    const shortOptionNames = new Map<string, string>();
    forEach(optionDeclarations, option => {
        optionsNameMap.set(option.name.toLowerCase(), option);
        if (option.shortName) {
            shortOptionNames.set(option.shortName, option.name);
        }
    });

    return { optionsNameMap, shortOptionNames };
}

let optionsNameMapCache: OptionsNameMap;

/** @internal */
export function getOptionsNameMap(): OptionsNameMap {
    return optionsNameMapCache ||= createOptionNameMap(optionDeclarations);
}

const compilerOptionsAlternateMode: AlternateModeDiagnostics = {
    diagnostic: Diagnostics.Compiler_option_0_may_only_be_used_with_build,
    getOptionsNameMap: getBuildOptionsNameMap,
};

// Do not delete this without updating the website's tsconfig generation.
/** @internal @knipignore */
export const defaultInitCompilerOptions: CompilerOptions = {
    module: ModuleKind.CommonJS,
    target: ScriptTarget.ES2016,
    strict: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    skipLibCheck: true,
};

/** @internal */
export function createCompilerDiagnosticForInvalidCustomType(opt: CommandLineOptionOfCustomType): Diagnostic {
    return createDiagnosticForInvalidCustomType(opt, createCompilerDiagnostic);
}

function createDiagnosticForInvalidCustomType(opt: CommandLineOptionOfCustomType, createDiagnostic: (message: DiagnosticMessage, ...args: DiagnosticArguments) => Diagnostic): Diagnostic {
    const namesOfType = arrayFrom(opt.type.keys());
    const stringNames = (opt.deprecatedKeys ? namesOfType.filter(k => !opt.deprecatedKeys!.has(k)) : namesOfType).map(key => `'${key}'`).join(", ");
    return createDiagnostic(Diagnostics.Argument_for_0_option_must_be_Colon_1, `--${opt.name}`, stringNames);
}

/** @internal */
export function parseCustomTypeOption(opt: CommandLineOptionOfCustomType, value: string | undefined, errors: Diagnostic[]) {
    return convertJsonOptionOfCustomType(opt, (value ?? "").trim(), errors);
}

/** @internal */
export function parseListTypeOption(opt: CommandLineOptionOfListType, value = "", errors: Diagnostic[]): string | (string | number)[] | undefined {
    value = value.trim();
    if (startsWith(value, "-")) {
        return undefined;
    }
    if (opt.type === "listOrElement" && !value.includes(",")) {
        return validateJsonOptionValue(opt, value, errors);
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
        case "boolean":
        case "object":
            return Debug.fail(`List of ${opt.element.type} is not yet supported.`);
        default:
            return mapDefined(values, v => parseCustomTypeOption(opt.element as CommandLineOptionOfCustomType, v, errors));
    }
}

/** @internal */
export interface OptionsBase {
    [option: string]: CompilerOptionsValue | TsConfigSourceFile | undefined;
}

/** @internal */
export interface ParseCommandLineWorkerDiagnostics extends DidYouMeanOptionsDiagnostics {
    getOptionsNameMap: () => OptionsNameMap;
    optionTypeMismatchDiagnostic: DiagnosticMessage;
}

function getOptionName(option: CommandLineOption) {
    return option.name;
}

function createUnknownOptionError(
    unknownOption: string,
    diagnostics: DidYouMeanOptionsDiagnostics,
    unknownOptionErrorText?: string,
    node?: PropertyName,
    sourceFile?: TsConfigSourceFile,
) {
    if (diagnostics.alternateMode?.getOptionsNameMap().optionsNameMap.has(unknownOption.toLowerCase())) {
        return createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, diagnostics.alternateMode.diagnostic, unknownOption);
    }

    const possibleOption = getSpellingSuggestion(unknownOption, diagnostics.optionDeclarations, getOptionName);
    return possibleOption ?
        createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, diagnostics.unknownDidYouMeanDiagnostic, unknownOptionErrorText || unknownOption, possibleOption.name) :
        createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, diagnostics.unknownOptionDiagnostic, unknownOptionErrorText || unknownOption);
}

/** @internal */
export function parseCommandLineWorker(
    diagnostics: ParseCommandLineWorkerDiagnostics,
    commandLine: readonly string[],
    readFile?: (path: string) => string | undefined,
) {
    const options = {} as OptionsBase;
    let watchOptions: WatchOptions | undefined;
    const fileNames: string[] = [];
    const errors: Diagnostic[] = [];

    parseStrings(commandLine);
    return {
        options,
        watchOptions,
        fileNames,
        errors,
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
                        errors.push(createUnknownOptionError(inputOptionName, diagnostics, s));
                    }
                }
            }
            else {
                fileNames.push(s);
            }
        }
    }

    function parseResponseFile(fileName: string) {
        const text = tryReadFile(fileName, readFile || (fileName => sys.readFile(fileName)));
        if (!isString(text)) {
            errors.push(text);
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
    errors: Diagnostic[],
) {
    if (opt.isTSConfigOnly) {
        const optValue = args[i];
        if (optValue === "null") {
            options[opt.name] = undefined;
            i++;
        }
        else if (opt.type === "boolean") {
            if (optValue === "false") {
                options[opt.name] = validateJsonOptionValue(opt, /*value*/ false, errors);
                i++;
            }
            else {
                if (optValue === "true") i++;
                errors.push(createCompilerDiagnostic(Diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_false_or_null_on_command_line, opt.name));
            }
        }
        else {
            errors.push(createCompilerDiagnostic(Diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_null_on_command_line, opt.name));
            if (optValue && !startsWith(optValue, "-")) i++;
        }
    }
    else {
        // Check to see if no argument was provided (e.g. "--locale" is the last command-line argument).
        if (!args[i] && opt.type !== "boolean") {
            errors.push(createCompilerDiagnostic(diagnostics.optionTypeMismatchDiagnostic, opt.name, getCompilerOptionValueTypeString(opt)));
        }

        if (args[i] !== "null") {
            switch (opt.type) {
                case "number":
                    options[opt.name] = validateJsonOptionValue(opt, parseInt(args[i]), errors);
                    i++;
                    break;
                case "boolean":
                    // boolean flag has optional value true, false, others
                    const optValue = args[i];
                    options[opt.name] = validateJsonOptionValue(opt, optValue !== "false", errors);
                    // consume next argument as boolean flag value
                    if (optValue === "false" || optValue === "true") {
                        i++;
                    }
                    break;
                case "string":
                    options[opt.name] = validateJsonOptionValue(opt, args[i] || "", errors);
                    i++;
                    break;
                case "list":
                    const result = parseListTypeOption(opt, args[i], errors);
                    options[opt.name] = result || [];
                    if (result) {
                        i++;
                    }
                    break;
                case "listOrElement":
                    Debug.fail("listOrElement not supported here");
                    break;
                // If not a primitive, the possible types are specified in what is effectively a map of options.
                default:
                    options[opt.name] = parseCustomTypeOption(opt as CommandLineOptionOfCustomType, args[i], errors);
                    i++;
                    break;
            }
        }
        else {
            options[opt.name] = undefined;
            i++;
        }
    }
    return i;
}

/** @internal */
export const compilerOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
    alternateMode: compilerOptionsAlternateMode,
    getOptionsNameMap,
    optionDeclarations,
    unknownOptionDiagnostic: Diagnostics.Unknown_compiler_option_0,
    unknownDidYouMeanDiagnostic: Diagnostics.Unknown_compiler_option_0_Did_you_mean_1,
    optionTypeMismatchDiagnostic: Diagnostics.Compiler_option_0_expects_an_argument,
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

/** @internal */
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

const buildOptionsAlternateMode: AlternateModeDiagnostics = {
    diagnostic: Diagnostics.Compiler_option_0_may_not_be_used_with_build,
    getOptionsNameMap,
};

const buildOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
    alternateMode: buildOptionsAlternateMode,
    getOptionsNameMap: getBuildOptionsNameMap,
    optionDeclarations: buildOpts,
    unknownOptionDiagnostic: Diagnostics.Unknown_build_option_0,
    unknownDidYouMeanDiagnostic: Diagnostics.Unknown_build_option_0_Did_you_mean_1,
    optionTypeMismatchDiagnostic: Diagnostics.Build_option_0_requires_a_value_of_type_1,
};

/** @internal */
export function parseBuildCommand(args: readonly string[]): ParsedBuildCommand {
    const { options, watchOptions, fileNames: projects, errors } = parseCommandLineWorker(
        buildOptionsDidYouMeanDiagnostics,
        args,
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

/** @internal */
export function getDiagnosticText(message: DiagnosticMessage, ...args: any[]): string {
    return cast(createCompilerDiagnostic(message, ...args).messageText, isString);
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
    optionsToExtend: CompilerOptions | undefined,
    host: ParseConfigFileHost,
    extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>,
    watchOptionsToExtend?: WatchOptions,
    extraFileExtensions?: readonly FileExtensionInfo[],
): ParsedCommandLine | undefined {
    const configFileText = tryReadFile(configFileName, fileName => host.readFile(fileName));
    if (!isString(configFileText)) {
        host.onUnRecoverableConfigFileDiagnostic(configFileText);
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
        extraFileExtensions,
        extendedConfigCache,
        watchOptionsToExtend,
    );
}

/**
 * Read tsconfig.json file
 * @param fileName The path to the config file
 */
export function readConfigFile(fileName: string, readFile: (path: string) => string | undefined): { config?: any; error?: Diagnostic; } {
    const textOrDiagnostic = tryReadFile(fileName, readFile);
    return isString(textOrDiagnostic) ? parseConfigFileTextToJson(fileName, textOrDiagnostic) : { config: {}, error: textOrDiagnostic };
}

/**
 * Parse the text of the tsconfig.json file
 * @param fileName The path to the config file
 * @param jsonText The text of the config file
 */
export function parseConfigFileTextToJson(fileName: string, jsonText: string): { config?: any; error?: Diagnostic; } {
    const jsonSourceFile = parseJsonText(fileName, jsonText);
    return {
        config: convertConfigFileToObject(jsonSourceFile, jsonSourceFile.parseDiagnostics, /*jsonConversionNotifier*/ undefined),
        error: jsonSourceFile.parseDiagnostics.length ? jsonSourceFile.parseDiagnostics[0] : undefined,
    };
}

/**
 * Read tsconfig.json file
 * @param fileName The path to the config file
 */
export function readJsonConfigFile(fileName: string, readFile: (path: string) => string | undefined): TsConfigSourceFile {
    const textOrDiagnostic = tryReadFile(fileName, readFile);
    return isString(textOrDiagnostic) ? parseJsonText(fileName, textOrDiagnostic) : { fileName, parseDiagnostics: [textOrDiagnostic] } as TsConfigSourceFile;
}

/** @internal */
export function tryReadFile(fileName: string, readFile: (path: string) => string | undefined): string | Diagnostic {
    let text: string | undefined;
    try {
        text = readFile(fileName);
    }
    catch (e) {
        return createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, e.message);
    }
    return text === undefined ? createCompilerDiagnostic(Diagnostics.Cannot_read_file_0, fileName) : text;
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
    optionTypeMismatchDiagnostic: Diagnostics.Watch_option_0_requires_a_value_of_type_1,
};

let commandLineCompilerOptionsMapCache: Map<string, CommandLineOption>;
function getCommandLineCompilerOptionsMap() {
    return commandLineCompilerOptionsMapCache || (commandLineCompilerOptionsMapCache = commandLineOptionsToMap(optionDeclarations));
}
let commandLineWatchOptionsMapCache: Map<string, CommandLineOption>;
function getCommandLineWatchOptionsMap() {
    return commandLineWatchOptionsMapCache || (commandLineWatchOptionsMapCache = commandLineOptionsToMap(optionsForWatch));
}
let commandLineTypeAcquisitionMapCache: Map<string, CommandLineOption>;
function getCommandLineTypeAcquisitionMap() {
    return commandLineTypeAcquisitionMapCache || (commandLineTypeAcquisitionMapCache = commandLineOptionsToMap(typeAcquisitionDeclarations));
}

const extendsOptionDeclaration: CommandLineOptionOfListType = {
    name: "extends",
    type: "listOrElement",
    element: {
        name: "extends",
        type: "string",
    },
    category: Diagnostics.File_Management,
    disallowNullOrUndefined: true,
};
const compilerOptionsDeclaration: TsConfigOnlyOption = {
    name: "compilerOptions",
    type: "object",
    elementOptions: getCommandLineCompilerOptionsMap(),
    extraKeyDiagnostics: compilerOptionsDidYouMeanDiagnostics,
};
const watchOptionsDeclaration: TsConfigOnlyOption = {
    name: "watchOptions",
    type: "object",
    elementOptions: getCommandLineWatchOptionsMap(),
    extraKeyDiagnostics: watchOptionsDidYouMeanDiagnostics,
};
const typeAcquisitionDeclaration: TsConfigOnlyOption = {
    name: "typeAcquisition",
    type: "object",
    elementOptions: getCommandLineTypeAcquisitionMap(),
    extraKeyDiagnostics: typeAcquisitionDidYouMeanDiagnostics,
};
let _tsconfigRootOptions: TsConfigOnlyOption;
function getTsconfigRootOptionsMap() {
    if (_tsconfigRootOptions === undefined) {
        _tsconfigRootOptions = {
            name: undefined!, // should never be needed since this is root
            type: "object",
            elementOptions: commandLineOptionsToMap([
                compilerOptionsDeclaration,
                watchOptionsDeclaration,
                typeAcquisitionDeclaration,
                extendsOptionDeclaration,
                {
                    name: "references",
                    type: "list",
                    element: {
                        name: "references",
                        type: "object",
                    },
                    category: Diagnostics.Projects,
                },
                {
                    name: "files",
                    type: "list",
                    element: {
                        name: "files",
                        type: "string",
                    },
                    category: Diagnostics.File_Management,
                },
                {
                    name: "include",
                    type: "list",
                    element: {
                        name: "include",
                        type: "string",
                    },
                    category: Diagnostics.File_Management,
                    defaultValueDescription: Diagnostics.if_files_is_specified_otherwise_Asterisk_Asterisk_Slash_Asterisk,
                },
                {
                    name: "exclude",
                    type: "list",
                    element: {
                        name: "exclude",
                        type: "string",
                    },
                    category: Diagnostics.File_Management,
                    defaultValueDescription: Diagnostics.node_modules_bower_components_jspm_packages_plus_the_value_of_outDir_if_one_is_specified,
                },
                compileOnSaveCommandLineOption,
            ]),
        };
    }
    return _tsconfigRootOptions;
}

/** @internal */
export interface JsonConversionNotifier {
    rootOptions: TsConfigOnlyOption;
    onPropertySet(
        keyText: string,
        value: any,
        propertyAssignment: PropertyAssignment,
        parentOption: TsConfigOnlyOption | undefined,
        option: CommandLineOption | undefined,
    ): void;
}

function convertConfigFileToObject(
    sourceFile: JsonSourceFile,
    errors: Diagnostic[],
    jsonConversionNotifier: JsonConversionNotifier | undefined,
): any {
    const rootExpression: Expression | undefined = sourceFile.statements[0]?.expression;
    if (rootExpression && rootExpression.kind !== SyntaxKind.ObjectLiteralExpression) {
        errors.push(createDiagnosticForNodeInSourceFile(
            sourceFile,
            rootExpression,
            Diagnostics.The_root_value_of_a_0_file_must_be_an_object,
            getBaseFileName(sourceFile.fileName) === "jsconfig.json" ? "jsconfig.json" : "tsconfig.json",
        ));
        // Last-ditch error recovery. Somewhat useful because the JSON parser will recover from some parse errors by
        // synthesizing a top-level array literal expression. There's a reasonable chance the first element of that
        // array is a well-formed configuration object, made into an array element by stray characters.
        if (isArrayLiteralExpression(rootExpression)) {
            const firstObject = find(rootExpression.elements, isObjectLiteralExpression);
            if (firstObject) {
                return convertToJson(sourceFile, firstObject, errors, /*returnValue*/ true, jsonConversionNotifier);
            }
        }
        return {};
    }
    return convertToJson(sourceFile, rootExpression, errors, /*returnValue*/ true, jsonConversionNotifier);
}

/**
 * Convert the json syntax tree into the json value
 */
export function convertToObject(sourceFile: JsonSourceFile, errors: Diagnostic[]): any {
    return convertToJson(sourceFile, sourceFile.statements[0]?.expression, errors, /*returnValue*/ true, /*jsonConversionNotifier*/ undefined);
}

/**
 * Convert the json syntax tree into the json value and report errors
 * This returns the json value (apart from checking errors) only if returnValue provided is true.
 * Otherwise it just checks the errors and returns undefined
 *
 * @internal
 */
export function convertToJson(
    sourceFile: JsonSourceFile,
    rootExpression: Expression | undefined,
    errors: Diagnostic[],
    returnValue: boolean,
    jsonConversionNotifier: JsonConversionNotifier | undefined,
): any {
    if (!rootExpression) {
        return returnValue ? {} : undefined;
    }

    return convertPropertyValueToJson(rootExpression, jsonConversionNotifier?.rootOptions);

    function convertObjectLiteralExpressionToJson(
        node: ObjectLiteralExpression,
        objectOption: TsConfigOnlyOption | undefined,
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

            const textOfKey = isComputedNonLiteralName(element.name) ? undefined : getTextOfPropertyName(element.name);
            const keyText = textOfKey && unescapeLeadingUnderscores(textOfKey);
            const option = keyText ? objectOption?.elementOptions?.get(keyText) : undefined;
            const value = convertPropertyValueToJson(element.initializer, option);
            if (typeof keyText !== "undefined") {
                if (returnValue) {
                    result[keyText] = value;
                }

                // Notify key value set, if user asked for it
                jsonConversionNotifier?.onPropertySet(keyText, value, element, objectOption, option);
            }
        }
        return result;
    }

    function convertArrayLiteralExpressionToJson(
        elements: NodeArray<Expression>,
        elementOption: CommandLineOption | undefined,
    ) {
        if (!returnValue) {
            elements.forEach(element => convertPropertyValueToJson(element, elementOption));
            return undefined;
        }

        // Filter out invalid values
        return filter(elements.map(element => convertPropertyValueToJson(element, elementOption)), v => v !== undefined);
    }

    function convertPropertyValueToJson(valueExpression: Expression, option: CommandLineOption | undefined): any {
        switch (valueExpression.kind) {
            case SyntaxKind.TrueKeyword:
                return true;

            case SyntaxKind.FalseKeyword:
                return false;

            case SyntaxKind.NullKeyword:
                return null; // eslint-disable-line no-restricted-syntax

            case SyntaxKind.StringLiteral:
                if (!isDoubleQuotedString(valueExpression)) {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.String_literal_with_double_quotes_expected));
                }
                return (valueExpression as StringLiteral).text;

            case SyntaxKind.NumericLiteral:
                return Number((valueExpression as NumericLiteral).text);

            case SyntaxKind.PrefixUnaryExpression:
                if ((valueExpression as PrefixUnaryExpression).operator !== SyntaxKind.MinusToken || (valueExpression as PrefixUnaryExpression).operand.kind !== SyntaxKind.NumericLiteral) {
                    break; // not valid JSON syntax
                }
                return -Number(((valueExpression as PrefixUnaryExpression).operand as NumericLiteral).text);

            case SyntaxKind.ObjectLiteralExpression:
                const objectLiteralExpression = valueExpression as ObjectLiteralExpression;

                // Currently having element option declaration in the tsconfig with type "object"
                // determines if it needs onSetValidOptionKeyValueInParent callback or not
                // At moment there are only "compilerOptions", "typeAcquisition" and "typingOptions"
                // that satisfies it and need it to modify options set in them (for normalizing file paths)
                // vs what we set in the json
                // If need arises, we can modify this interface and callbacks as needed
                return convertObjectLiteralExpressionToJson(objectLiteralExpression, option as TsConfigOnlyOption);

            case SyntaxKind.ArrayLiteralExpression:
                return convertArrayLiteralExpressionToJson(
                    (valueExpression as ArrayLiteralExpression).elements,
                    option && (option as CommandLineOptionOfListType).element,
                );
        }

        // Not in expected format
        if (option) {
            errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.Compiler_option_0_requires_a_value_of_type_1, option.name, getCompilerOptionValueTypeString(option)));
        }
        else {
            errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_literal));
        }

        return undefined;
    }

    function isDoubleQuotedString(node: Node): boolean {
        return isStringLiteral(node) && isStringDoubleQuoted(node, sourceFile);
    }
}

function getCompilerOptionValueTypeString(option: CommandLineOption): string {
    return (option.type === "listOrElement") ?
        `${getCompilerOptionValueTypeString(option.element)} or Array` :
        option.type === "list" ?
        "Array" :
        isString(option.type) ? option.type : "string";
}

function isCompilerOptionsValue(option: CommandLineOption | undefined, value: any): value is CompilerOptionsValue {
    if (option) {
        if (isNullOrUndefined(value)) return !option.disallowNullOrUndefined; // All options are undefinable/nullable
        if (option.type === "list") {
            return isArray(value);
        }
        if (option.type === "listOrElement") {
            return isArray(value) || isCompilerOptionsValue(option.element, value);
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
 *
 * @internal
 */
export function convertToTSConfig(configParseResult: ParsedCommandLine, configFileName: string, host: ConvertToTSConfigHost): TSConfig {
    const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames);
    const files = map(
        filter(
            configParseResult.fileNames,
            !configParseResult.options.configFile?.configFileSpecs?.validatedIncludeSpecs ? returnTrue : matchesSpecs(
                configFileName,
                configParseResult.options.configFile.configFileSpecs.validatedIncludeSpecs,
                configParseResult.options.configFile.configFileSpecs.validatedExcludeSpecs,
                host,
            ),
        ),
        f => getRelativePathFromFile(getNormalizedAbsolutePath(configFileName, host.getCurrentDirectory()), getNormalizedAbsolutePath(f, host.getCurrentDirectory()), getCanonicalFileName),
    );
    const pathOptions = { configFilePath: getNormalizedAbsolutePath(configFileName, host.getCurrentDirectory()), useCaseSensitiveFileNames: host.useCaseSensitiveFileNames };
    const optionMap = serializeCompilerOptions(configParseResult.options, pathOptions);
    const watchOptionMap = configParseResult.watchOptions && serializeWatchOptions(configParseResult.watchOptions);
    const config: TSConfig & { watchOptions?: object; } = {
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
        ...(configParseResult.options.configFile?.configFileSpecs ? {
            include: filterSameAsDefaultInclude(configParseResult.options.configFile.configFileSpecs.validatedIncludeSpecs),
            exclude: configParseResult.options.configFile.configFileSpecs.validatedExcludeSpecs,
        } : {}),
        compileOnSave: !!configParseResult.compileOnSave ? true : undefined,
    };

    const providedKeys = new Set(optionMap.keys());
    const impliedCompilerOptions: Record<string, CompilerOptionsValue> = {};
    for (const option in computedOptions) {
        if (!providedKeys.has(option) && some(computedOptions[option as keyof typeof computedOptions].dependencies, dep => providedKeys.has(dep))) {
            const implied = computedOptions[option as keyof typeof computedOptions].computeValue(configParseResult.options);
            const defaultValue = computedOptions[option as keyof typeof computedOptions].computeValue({});
            if (implied !== defaultValue) {
                impliedCompilerOptions[option] = computedOptions[option as keyof typeof computedOptions].computeValue(configParseResult.options);
            }
        }
    }
    assign(config.compilerOptions, optionMapToObject(serializeCompilerOptions(impliedCompilerOptions, pathOptions)));
    return config;
}

/** @internal */
export function optionMapToObject(optionMap: Map<string, CompilerOptionsValue>): object {
    return Object.fromEntries(optionMap);
}

function filterSameAsDefaultInclude(specs: readonly string[] | undefined) {
    if (!length(specs)) return undefined;
    if (length(specs) !== 1) return specs;
    if (specs![0] === defaultIncludeSpec) return undefined;
    return specs;
}

function matchesSpecs(path: string, includeSpecs: readonly string[] | undefined, excludeSpecs: readonly string[] | undefined, host: ConvertToTSConfigHost): (path: string) => boolean {
    if (!includeSpecs) return returnTrue;
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
    return returnTrue;
}

function getCustomTypeMapOfCommandLineOption(optionDefinition: CommandLineOption): Map<string, string | number> | undefined {
    switch (optionDefinition.type) {
        case "string":
        case "number":
        case "boolean":
        case "object":
            // this is of a type CommandLineOptionOfPrimitiveType
            return undefined;
        case "list":
        case "listOrElement":
            return getCustomTypeMapOfCommandLineOption(optionDefinition.element);
        default:
            return optionDefinition.type;
    }
}

/** @internal */
export function getNameOfCompilerOptionValue(value: CompilerOptionsValue, customTypeMap: Map<string, string | number>): string | undefined {
    // There is a typeMap associated with this command-line option so use it to map value back to its name
    return forEachEntry(customTypeMap, (mapValue, key) => {
        if (mapValue === value) {
            return key;
        }
    });
}

/** @internal */
export function serializeCompilerOptions(
    options: CompilerOptions,
    pathOptions?: { configFilePath: string; useCaseSensitiveFileNames: boolean; },
): Map<string, CompilerOptionsValue> {
    return serializeOptionBaseObject(options, getOptionsNameMap(), pathOptions);
}

function serializeWatchOptions(options: WatchOptions) {
    return serializeOptionBaseObject(options, getWatchOptionsNameMap());
}

function serializeOptionBaseObject(
    options: OptionsBase,
    { optionsNameMap }: OptionsNameMap,
    pathOptions?: { configFilePath: string; useCaseSensitiveFileNames: boolean; },
): Map<string, CompilerOptionsValue> {
    const result = new Map<string, CompilerOptionsValue>();
    const getCanonicalFileName = pathOptions && createGetCanonicalFileName(pathOptions.useCaseSensitiveFileNames);

    for (const name in options) {
        if (hasProperty(options, name)) {
            // tsconfig only options cannot be specified via command line,
            // so we can assume that only types that can appear here string | number | boolean
            if (optionsNameMap.has(name) && (optionsNameMap.get(name)!.category === Diagnostics.Command_line_Options || optionsNameMap.get(name)!.category === Diagnostics.Output_Formatting)) {
                continue;
            }
            const value = options[name] as CompilerOptionsValue;
            const optionDefinition = optionsNameMap.get(name.toLowerCase());
            if (optionDefinition) {
                Debug.assert(optionDefinition.type !== "listOrElement");
                const customTypeMap = getCustomTypeMapOfCommandLineOption(optionDefinition);
                if (!customTypeMap) {
                    // There is no map associated with this compiler option then use the value as-is
                    // This is the case if the value is expect to be string, number, boolean or list of string
                    if (pathOptions && optionDefinition.isFilePath) {
                        result.set(name, getRelativePathFromFile(pathOptions.configFilePath, getNormalizedAbsolutePath(value as string, getDirectoryPath(pathOptions.configFilePath)), getCanonicalFileName!));
                    }
                    else if (pathOptions && optionDefinition.type === "list" && optionDefinition.element.isFilePath) {
                        result.set(name, (value as string[]).map(v => getRelativePathFromFile(pathOptions.configFilePath, getNormalizedAbsolutePath(v, getDirectoryPath(pathOptions.configFilePath)), getCanonicalFileName!)));
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
 * Generate a list of the compiler options whose value is not the default.
 * @param options compilerOptions to be evaluated.
/** @internal */
export function getCompilerOptionsDiffValue(options: CompilerOptions, newLine: string): string {
    const compilerOptionsMap = getSerializedCompilerOption(options);
    return getOverwrittenDefaultOptions();

    function makePadding(paddingLength: number): string {
        return Array(paddingLength + 1).join(" ");
    }

    function getOverwrittenDefaultOptions() {
        const result: string[] = [];
        const tab = makePadding(2);
        commandOptionsWithoutBuild.forEach(cmd => {
            if (!compilerOptionsMap.has(cmd.name)) {
                return;
            }

            const newValue = compilerOptionsMap.get(cmd.name);
            const defaultValue = getDefaultValueForOption(cmd);
            if (newValue !== defaultValue) {
                result.push(`${tab}${cmd.name}: ${newValue}`);
            }
            else if (hasProperty(defaultInitCompilerOptions, cmd.name)) {
                result.push(`${tab}${cmd.name}: ${defaultValue}`);
            }
        });
        return result.join(newLine) + newLine;
    }
}

/**
 * Get the compiler options to be written into the tsconfig.json.
 * @param options commandlineOptions to be included in the compileOptions.
 */
function getSerializedCompilerOption(options: CompilerOptions): Map<string, CompilerOptionsValue> {
    const compilerOptions = extend(options, defaultInitCompilerOptions);
    return serializeCompilerOptions(compilerOptions);
}
/**
 * Generate tsconfig configuration when running command line "--init"
 * @param options commandlineOptions to be generated into tsconfig.json
 * @param fileNames array of filenames to be generated into tsconfig.json
 *
 * @internal
 */
export function generateTSConfig(options: CompilerOptions, fileNames: readonly string[], newLine: string): string {
    const compilerOptionsMap = getSerializedCompilerOption(options);
    return writeConfigurations();

    function makePadding(paddingLength: number): string {
        return Array(paddingLength + 1).join(" ");
    }

    function isAllowedOptionForOutput({ category, name, isCommandLineOnly }: CommandLineOption): boolean {
        // Skip options which do not have a category or have categories which are more niche
        const categoriesToSkip = [Diagnostics.Command_line_Options, Diagnostics.Editor_Support, Diagnostics.Compiler_Diagnostics, Diagnostics.Backwards_Compatibility, Diagnostics.Watch_and_Build_Modes, Diagnostics.Output_Formatting];
        return !isCommandLineOnly && category !== undefined && (!categoriesToSkip.includes(category) || compilerOptionsMap.has(name));
    }

    function writeConfigurations() {
        // Filter applicable options to place in the file
        const categorizedOptions = new Map<DiagnosticMessage, CommandLineOption[]>();
        // Set allowed categories in order
        categorizedOptions.set(Diagnostics.Projects, []);
        categorizedOptions.set(Diagnostics.Language_and_Environment, []);
        categorizedOptions.set(Diagnostics.Modules, []);
        categorizedOptions.set(Diagnostics.JavaScript_Support, []);
        categorizedOptions.set(Diagnostics.Emit, []);
        categorizedOptions.set(Diagnostics.Interop_Constraints, []);
        categorizedOptions.set(Diagnostics.Type_Checking, []);
        categorizedOptions.set(Diagnostics.Completeness, []);
        for (const option of optionDeclarations) {
            if (isAllowedOptionForOutput(option)) {
                let listForCategory = categorizedOptions.get(option.category!);
                if (!listForCategory) categorizedOptions.set(option.category!, listForCategory = []);
                listForCategory.push(option);
            }
        }

        // Serialize all options and their descriptions
        let marginLength = 0;
        let seenKnownKeys = 0;
        const entries: { value: string; description?: string; }[] = [];
        categorizedOptions.forEach((options, category) => {
            if (entries.length !== 0) {
                entries.push({ value: "" });
            }
            entries.push({ value: `/* ${getLocaleSpecificMessage(category)} */` });
            for (const option of options) {
                let optionName;
                if (compilerOptionsMap.has(option.name)) {
                    optionName = `"${option.name}": ${JSON.stringify(compilerOptionsMap.get(option.name))}${(seenKnownKeys += 1) === compilerOptionsMap.size ? "" : ","}`;
                }
                else {
                    optionName = `// "${option.name}": ${JSON.stringify(getDefaultValueForOption(option))},`;
                }
                entries.push({
                    value: optionName,
                    description: `/* ${option.description && getLocaleSpecificMessage(option.description) || option.name} */`,
                });
                marginLength = Math.max(optionName.length, marginLength);
            }
        });

        // Write the output
        const tab = makePadding(2);
        const result: string[] = [];
        result.push(`{`);
        result.push(`${tab}"compilerOptions": {`);
        result.push(`${tab}${tab}/* ${getLocaleSpecificMessage(Diagnostics.Visit_https_Colon_Slash_Slashaka_ms_Slashtsconfig_to_read_more_about_this_file)} */`);
        result.push("");
        // Print out each row, aligning all the descriptions on the same column.
        for (const entry of entries) {
            const { value, description = "" } = entry;
            result.push(value && `${tab}${tab}${value}${description && (makePadding(marginLength - value.length + 2) + description)}`);
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

/** @internal */
export function convertToOptionsWithAbsolutePaths(options: CompilerOptions, toAbsolutePath: (path: string) => string) {
    const result: CompilerOptions = {};
    const optionsNameMap = getOptionsNameMap().optionsNameMap;

    for (const name in options) {
        if (hasProperty(options, name)) {
            result[name] = convertToOptionValueWithAbsolutePaths(
                optionsNameMap.get(name.toLowerCase()),
                options[name] as CompilerOptionsValue,
                toAbsolutePath,
            );
        }
    }
    if (result.configFilePath) {
        result.configFilePath = toAbsolutePath(result.configFilePath);
    }
    return result;
}

function convertToOptionValueWithAbsolutePaths(option: CommandLineOption | undefined, value: CompilerOptionsValue, toAbsolutePath: (path: string) => string) {
    if (option && !isNullOrUndefined(value)) {
        if (option.type === "list") {
            const values = value as readonly string[];
            if (option.element.isFilePath && values.length) {
                return values.map(toAbsolutePath);
            }
        }
        else if (option.isFilePath) {
            return toAbsolutePath(value as string);
        }
        Debug.assert(option.type !== "listOrElement");
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
export function parseJsonConfigFileContent(json: any, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>, existingWatchOptions?: WatchOptions): ParsedCommandLine {
    return parseJsonConfigFileContentWorker(json, /*sourceFile*/ undefined, host, basePath, existingOptions, existingWatchOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache);
}

/**
 * Parse the contents of a config file (tsconfig.json).
 * @param jsonNode The contents of the config file to parse
 * @param host Instance of ParseConfigHost used to enumerate files in folder.
 * @param basePath A root directory to resolve relative path entries in the config
 *    file to. e.g. outDir
 */
export function parseJsonSourceFileConfigFileContent(sourceFile: TsConfigSourceFile, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>, existingWatchOptions?: WatchOptions): ParsedCommandLine {
    tracing?.push(tracing.Phase.Parse, "parseJsonSourceFileConfigFileContent", { path: sourceFile.fileName });
    const result = parseJsonConfigFileContentWorker(/*json*/ undefined, sourceFile, host, basePath, existingOptions, existingWatchOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache);
    tracing?.pop();
    return result;
}

/** @internal */
export function setConfigFileInOptions(options: CompilerOptions, configFile: TsConfigSourceFile | undefined) {
    if (configFile) {
        Object.defineProperty(options, "configFile", { enumerable: false, writable: false, value: configFile });
    }
}

function isNullOrUndefined(x: any): x is null | undefined { // eslint-disable-line no-restricted-syntax
    return x === undefined || x === null; // eslint-disable-line no-restricted-syntax
}

function directoryOfCombinedPath(fileName: string, basePath: string) {
    // Use the `getNormalizedAbsolutePath` function to avoid canonicalizing the path, as it must remain noncanonical
    // until consistent casing errors are reported
    return getDirectoryPath(getNormalizedAbsolutePath(fileName, basePath));
}

const defaultIncludeSpec = "**/*";

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
    extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>,
): ParsedCommandLine {
    Debug.assert((json === undefined && sourceFile !== undefined) || (json !== undefined && sourceFile === undefined));
    const errors: Diagnostic[] = [];

    const parsedConfig = parseConfig(json, sourceFile, host, basePath, configFileName, resolutionStack, errors, extendedConfigCache);
    const { raw } = parsedConfig;
    const options = handleOptionConfigDirTemplateSubstitution(
        extend(existingOptions, parsedConfig.options || {}),
        configDirTemplateSubstitutionOptions,
        basePath,
    ) as CompilerOptions;
    const watchOptions = handleWatchOptionsConfigDirTemplateSubstitution(
        existingWatchOptions && parsedConfig.watchOptions ?
            extend(existingWatchOptions, parsedConfig.watchOptions) :
            parsedConfig.watchOptions || existingWatchOptions,
        basePath,
    );
    options.configFilePath = configFileName && normalizeSlashes(configFileName);
    const basePathForFileNames = normalizePath(configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath);
    const configFileSpecs = getConfigFileSpecs();
    if (sourceFile) sourceFile.configFileSpecs = configFileSpecs;
    setConfigFileInOptions(options, sourceFile);

    return {
        options,
        watchOptions,
        fileNames: getFileNames(basePathForFileNames),
        projectReferences: getProjectReferences(basePathForFileNames),
        typeAcquisition: parsedConfig.typeAcquisition || getDefaultTypeAcquisition(),
        raw,
        errors,
        // Wildcard directories (provided as part of a wildcard path) are stored in a
        // file map that marks whether it was a regular wildcard match (with a `*` or `?` token),
        // or a recursive directory. This information is used by filesystem watchers to monitor for
        // new entries in these paths.
        wildcardDirectories: getWildcardDirectories(configFileSpecs, basePathForFileNames, host.useCaseSensitiveFileNames),
        compileOnSave: !!raw.compileOnSave,
    };

    function getConfigFileSpecs(): ConfigFileSpecs {
        const referencesOfRaw = getPropFromRaw<ProjectReference>("references", element => typeof element === "object", "object");
        const filesSpecs = toPropValue(getSpecsFromRaw("files"));
        if (filesSpecs) {
            const hasZeroOrNoReferences = referencesOfRaw === "no-prop" || isArray(referencesOfRaw) && referencesOfRaw.length === 0;
            const hasExtends = hasProperty(raw, "extends");
            if (filesSpecs.length === 0 && hasZeroOrNoReferences && !hasExtends) {
                if (sourceFile) {
                    const fileName = configFileName || "tsconfig.json";
                    const diagnosticMessage = Diagnostics.The_files_list_in_config_file_0_is_empty;
                    const nodeValue = forEachTsConfigPropArray(sourceFile, "files", property => property.initializer);
                    const error = createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, nodeValue, diagnosticMessage, fileName);
                    errors.push(error);
                }
                else {
                    createCompilerDiagnosticOnlyIfJson(Diagnostics.The_files_list_in_config_file_0_is_empty, configFileName || "tsconfig.json");
                }
            }
        }

        let includeSpecs = toPropValue(getSpecsFromRaw("include"));

        const excludeOfRaw = getSpecsFromRaw("exclude");
        let isDefaultIncludeSpec = false;
        let excludeSpecs = toPropValue(excludeOfRaw);
        if (excludeOfRaw === "no-prop") {
            const outDir = options.outDir;
            const declarationDir = options.declarationDir;

            if (outDir || declarationDir) {
                excludeSpecs = filter([outDir, declarationDir], d => !!d) as string[];
            }
        }

        if (filesSpecs === undefined && includeSpecs === undefined) {
            includeSpecs = [defaultIncludeSpec];
            isDefaultIncludeSpec = true;
        }
        let validatedIncludeSpecsBeforeSubstitution: readonly string[] | undefined, validatedExcludeSpecsBeforeSubstitution: readonly string[] | undefined;
        let validatedIncludeSpecs: readonly string[] | undefined, validatedExcludeSpecs: readonly string[] | undefined;

        // The exclude spec list is converted into a regular expression, which allows us to quickly
        // test whether a file or directory should be excluded before recursively traversing the
        // file system.

        if (includeSpecs) {
            validatedIncludeSpecsBeforeSubstitution = validateSpecs(includeSpecs, errors, /*disallowTrailingRecursion*/ true, sourceFile, "include");
            validatedIncludeSpecs = getSubstitutedStringArrayWithConfigDirTemplate(
                validatedIncludeSpecsBeforeSubstitution,
                basePathForFileNames,
            ) || validatedIncludeSpecsBeforeSubstitution;
        }

        if (excludeSpecs) {
            validatedExcludeSpecsBeforeSubstitution = validateSpecs(excludeSpecs, errors, /*disallowTrailingRecursion*/ false, sourceFile, "exclude");
            validatedExcludeSpecs = getSubstitutedStringArrayWithConfigDirTemplate(
                validatedExcludeSpecsBeforeSubstitution,
                basePathForFileNames,
            ) || validatedExcludeSpecsBeforeSubstitution;
        }

        const validatedFilesSpecBeforeSubstitution = filter(filesSpecs, isString);
        const validatedFilesSpec = getSubstitutedStringArrayWithConfigDirTemplate(
            validatedFilesSpecBeforeSubstitution,
            basePathForFileNames,
        ) || validatedFilesSpecBeforeSubstitution;

        return {
            filesSpecs,
            includeSpecs,
            excludeSpecs,
            validatedFilesSpec,
            validatedIncludeSpecs,
            validatedExcludeSpecs,
            validatedFilesSpecBeforeSubstitution,
            validatedIncludeSpecsBeforeSubstitution,
            validatedExcludeSpecsBeforeSubstitution,
            pathPatterns: undefined, // Initialized on first use
            isDefaultIncludeSpec,
        };
    }

    function getFileNames(basePath: string): string[] {
        const fileNames = getFileNamesFromConfigSpecs(configFileSpecs, basePath, options, host, extraFileExtensions);
        if (shouldReportNoInputFiles(fileNames, canJsonReportNoInputFiles(raw), resolutionStack)) {
            errors.push(getErrorForNoInputFiles(configFileSpecs, configFileName));
        }
        return fileNames;
    }

    function getProjectReferences(basePath: string): readonly ProjectReference[] | undefined {
        let projectReferences: ProjectReference[] | undefined;
        const referencesOfRaw = getPropFromRaw<ProjectReference>("references", element => typeof element === "object", "object");
        if (isArray(referencesOfRaw)) {
            for (const ref of referencesOfRaw) {
                if (typeof ref.path !== "string") {
                    createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "reference.path", "string");
                }
                else {
                    (projectReferences || (projectReferences = [])).push({
                        path: getNormalizedAbsolutePath(ref.path, basePath),
                        originalPath: ref.path,
                        prepend: ref.prepend,
                        circular: ref.circular,
                    });
                }
            }
        }
        return projectReferences;
    }

    type PropOfRaw<T> = readonly T[] | "not-array" | "no-prop";
    function toPropValue<T>(specResult: PropOfRaw<T>) {
        return isArray(specResult) ? specResult : undefined;
    }

    function getSpecsFromRaw(prop: "files" | "include" | "exclude"): PropOfRaw<string> {
        return getPropFromRaw(prop, isString, "string");
    }

    function getPropFromRaw<T>(prop: "files" | "include" | "exclude" | "references", validateElement: (value: unknown) => boolean, elementTypeName: string): PropOfRaw<T> {
        if (hasProperty(raw, prop) && !isNullOrUndefined(raw[prop])) {
            if (isArray(raw[prop])) {
                const result = raw[prop] as T[];
                if (!sourceFile && !every(result, validateElement)) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, elementTypeName));
                }
                return result;
            }
            else {
                createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, "Array");
                return "not-array";
            }
        }
        return "no-prop";
    }

    function createCompilerDiagnosticOnlyIfJson(message: DiagnosticMessage, ...args: DiagnosticArguments) {
        if (!sourceFile) {
            errors.push(createCompilerDiagnostic(message, ...args));
        }
    }
}

/** @internal */
export function handleWatchOptionsConfigDirTemplateSubstitution(
    watchOptions: WatchOptions | undefined,
    basePath: string,
) {
    return handleOptionConfigDirTemplateSubstitution(watchOptions, configDirTemplateSubstitutionWatchOptions, basePath) as WatchOptions | undefined;
}

function handleOptionConfigDirTemplateSubstitution(
    options: OptionsBase | undefined,
    optionDeclarations: readonly CommandLineOption[],
    basePath: string,
) {
    if (!options) return options;
    let result: OptionsBase | undefined;
    for (const option of optionDeclarations) {
        if (options[option.name] !== undefined) {
            const value = options[option.name];
            switch (option.type) {
                case "string":
                    Debug.assert(option.isFilePath);
                    if (startsWithConfigDirTemplate(value)) {
                        setOptionValue(option, getSubstitutedPathWithConfigDirTemplate(value, basePath));
                    }
                    break;
                case "list":
                    Debug.assert(option.element.isFilePath);
                    const listResult = getSubstitutedStringArrayWithConfigDirTemplate(value as string[], basePath);
                    if (listResult) setOptionValue(option, listResult);
                    break;
                case "object":
                    Debug.assert(option.name === "paths");
                    const objectResult = getSubstitutedMapLikeOfStringArrayWithConfigDirTemplate(value as MapLike<string[]>, basePath);
                    if (objectResult) setOptionValue(option, objectResult);
                    break;
                default:
                    Debug.fail("option type not supported");
            }
        }
    }
    return result || options;

    function setOptionValue(option: CommandLineOption, value: CompilerOptionsValue) {
        (result ??= assign({}, options))[option.name] = value;
    }
}

const configDirTemplate = `\${configDir}`;
function startsWithConfigDirTemplate(value: any): value is string {
    return isString(value) && startsWith(value, configDirTemplate, /*ignoreCase*/ true);
}

function getSubstitutedPathWithConfigDirTemplate(value: string, basePath: string) {
    return getNormalizedAbsolutePath(value.replace(configDirTemplate, "./"), basePath);
}

function getSubstitutedStringArrayWithConfigDirTemplate(list: readonly string[] | undefined, basePath: string) {
    if (!list) return list;
    let result: string[] | undefined;
    list.forEach((element, index) => {
        if (!startsWithConfigDirTemplate(element)) return;
        (result ??= list.slice())[index] = getSubstitutedPathWithConfigDirTemplate(element, basePath);
    });
    return result;
}

function getSubstitutedMapLikeOfStringArrayWithConfigDirTemplate(mapLike: MapLike<string[]>, basePath: string) {
    let result: MapLike<string[]> | undefined;
    const ownKeys = getOwnKeys(mapLike);
    ownKeys.forEach(key => {
        if (!isArray(mapLike[key])) return;
        const subStitution = getSubstitutedStringArrayWithConfigDirTemplate(mapLike[key], basePath);
        if (!subStitution) return;
        (result ??= assign({}, mapLike))[key] = subStitution;
    });
    return result;
}

function isErrorNoInputFiles(error: Diagnostic) {
    return error.code === Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code;
}

function getErrorForNoInputFiles({ includeSpecs, excludeSpecs }: ConfigFileSpecs, configFileName: string | undefined) {
    return createCompilerDiagnostic(
        Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
        configFileName || "tsconfig.json",
        JSON.stringify(includeSpecs || []),
        JSON.stringify(excludeSpecs || []),
    );
}

function shouldReportNoInputFiles(fileNames: string[], canJsonReportNoInutFiles: boolean, resolutionStack?: Path[]) {
    return fileNames.length === 0 && canJsonReportNoInutFiles && (!resolutionStack || resolutionStack.length === 0);
}

/** @internal */
export function canJsonReportNoInputFiles(raw: any) {
    return !hasProperty(raw, "files") && !hasProperty(raw, "references");
}

/** @internal */
export function updateErrorForNoInputFiles(fileNames: string[], configFileName: string, configFileSpecs: ConfigFileSpecs, configParseDiagnostics: Diagnostic[], canJsonReportNoInutFiles: boolean) {
    const existingErrors = configParseDiagnostics.length;
    if (shouldReportNoInputFiles(fileNames, canJsonReportNoInutFiles)) {
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
    extendedConfigPath?: string | string[];
}

function isSuccessfulParsedTsconfig(value: ParsedTsconfig) {
    return !!value.options;
}

interface ExtendsResult {
    options: CompilerOptions;
    watchOptions?: WatchOptions;
    include?: string[];
    exclude?: string[];
    files?: string[];
    compileOnSave?: boolean;
    extendedSourceFiles?: Set<string>;
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
    errors: Diagnostic[],
    extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>,
): ParsedTsconfig {
    basePath = normalizeSlashes(basePath);
    const resolvedPath = getNormalizedAbsolutePath(configFileName || "", basePath);

    if (resolutionStack.includes(resolvedPath)) {
        errors.push(createCompilerDiagnostic(Diagnostics.Circularity_detected_while_resolving_configuration_Colon_0, [...resolutionStack, resolvedPath].join(" -> ")));
        return { raw: json || convertToObject(sourceFile!, errors) };
    }

    const ownConfig = json ?
        parseOwnConfigOfJson(json, host, basePath, configFileName, errors) :
        parseOwnConfigOfJsonSourceFile(sourceFile!, host, basePath, configFileName, errors);

    if (ownConfig.options?.paths) {
        // If we end up needing to resolve relative paths from 'paths' relative to
        // the config file location, we'll need to know where that config file was.
        // Since 'paths' can be inherited from an extended config in another directory,
        // we wouldn't know which directory to use unless we store it here.
        ownConfig.options.pathsBasePath = basePath;
    }
    if (ownConfig.extendedConfigPath) {
        // copy the resolution stack so it is never reused between branches in potential diamond-problem scenarios.
        resolutionStack = resolutionStack.concat([resolvedPath]);
        const result: ExtendsResult = { options: {} };
        if (isString(ownConfig.extendedConfigPath)) {
            applyExtendedConfig(result, ownConfig.extendedConfigPath);
        }
        else {
            ownConfig.extendedConfigPath.forEach(extendedConfigPath => applyExtendedConfig(result, extendedConfigPath));
        }
        if (result.include) ownConfig.raw.include = result.include;
        if (result.exclude) ownConfig.raw.exclude = result.exclude;
        if (result.files) ownConfig.raw.files = result.files;

        if (ownConfig.raw.compileOnSave === undefined && result.compileOnSave) ownConfig.raw.compileOnSave = result.compileOnSave;
        if (sourceFile && result.extendedSourceFiles) sourceFile.extendedSourceFiles = arrayFrom(result.extendedSourceFiles.keys());

        ownConfig.options = assign(result.options, ownConfig.options);
        ownConfig.watchOptions = ownConfig.watchOptions && result.watchOptions ?
            assign(result.watchOptions, ownConfig.watchOptions) :
            ownConfig.watchOptions || result.watchOptions;
    }
    return ownConfig;

    function applyExtendedConfig(result: ExtendsResult, extendedConfigPath: string) {
        const extendedConfig = getExtendedConfig(sourceFile, extendedConfigPath, host, resolutionStack, errors, extendedConfigCache, result);
        if (extendedConfig && isSuccessfulParsedTsconfig(extendedConfig)) {
            const extendsRaw = extendedConfig.raw;
            let relativeDifference: string | undefined;
            const setPropertyInResultIfNotUndefined = (propertyName: "include" | "exclude" | "files") => {
                if (ownConfig.raw[propertyName]) return; // No need to calculate if already set in own config
                if (extendsRaw[propertyName]) {
                    result[propertyName] = map(extendsRaw[propertyName], (path: string) =>
                        startsWithConfigDirTemplate(path) || isRootedDiskPath(path) ?
                            path :
                            combinePaths(
                                relativeDifference ||= convertToRelativePath(getDirectoryPath(extendedConfigPath), basePath, createGetCanonicalFileName(host.useCaseSensitiveFileNames)),
                                path,
                            ));
                }
            };
            setPropertyInResultIfNotUndefined("include");
            setPropertyInResultIfNotUndefined("exclude");
            setPropertyInResultIfNotUndefined("files");
            if (extendsRaw.compileOnSave !== undefined) {
                result.compileOnSave = extendsRaw.compileOnSave;
            }
            assign(result.options, extendedConfig.options);
            result.watchOptions = result.watchOptions && extendedConfig.watchOptions ?
                assign({}, result.watchOptions, extendedConfig.watchOptions) :
                result.watchOptions || extendedConfig.watchOptions;
            // TODO extend type typeAcquisition
        }
    }
}

function parseOwnConfigOfJson(
    json: any,
    host: ParseConfigHost,
    basePath: string,
    configFileName: string | undefined,
    errors: Diagnostic[],
): ParsedTsconfig {
    if (hasProperty(json, "excludes")) {
        errors.push(createCompilerDiagnostic(Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
    }

    const options = convertCompilerOptionsFromJsonWorker(json.compilerOptions, basePath, errors, configFileName);
    const typeAcquisition = convertTypeAcquisitionFromJsonWorker(json.typeAcquisition, basePath, errors, configFileName);
    const watchOptions = convertWatchOptionsFromJsonWorker(json.watchOptions, basePath, errors);
    json.compileOnSave = convertCompileOnSaveOptionFromJson(json, basePath, errors);
    const extendedConfigPath = json.extends || json.extends === "" ?
        getExtendsConfigPathOrArray(json.extends, host, basePath, configFileName, errors) :
        undefined;
    return { raw: json, options, watchOptions, typeAcquisition, extendedConfigPath };
}

function getExtendsConfigPathOrArray(
    value: CompilerOptionsValue,
    host: ParseConfigHost,
    basePath: string,
    configFileName: string | undefined,
    errors: Diagnostic[],
    propertyAssignment?: PropertyAssignment,
    valueExpression?: Expression,
    sourceFile?: JsonSourceFile,
) {
    let extendedConfigPath: string | string[] | undefined;
    const newBase = configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath;
    if (isString(value)) {
        extendedConfigPath = getExtendsConfigPath(
            value,
            host,
            newBase,
            errors,
            valueExpression,
            sourceFile,
        );
    }
    else if (isArray(value)) {
        extendedConfigPath = [];
        for (let index = 0; index < (value as unknown[]).length; index++) {
            const fileName = (value as unknown[])[index];
            if (isString(fileName)) {
                extendedConfigPath = append(
                    extendedConfigPath,
                    getExtendsConfigPath(
                        fileName,
                        host,
                        newBase,
                        errors,
                        (valueExpression as ArrayLiteralExpression | undefined)?.elements[index],
                        sourceFile,
                    ),
                );
            }
            else {
                convertJsonOption(extendsOptionDeclaration.element, value, basePath, errors, propertyAssignment, (valueExpression as ArrayLiteralExpression | undefined)?.elements[index], sourceFile);
            }
        }
    }
    else {
        convertJsonOption(extendsOptionDeclaration, value, basePath, errors, propertyAssignment, valueExpression, sourceFile);
    }
    return extendedConfigPath;
}

function parseOwnConfigOfJsonSourceFile(
    sourceFile: TsConfigSourceFile,
    host: ParseConfigHost,
    basePath: string,
    configFileName: string | undefined,
    errors: Diagnostic[],
): ParsedTsconfig {
    const options = getDefaultCompilerOptions(configFileName);
    let typeAcquisition: TypeAcquisition | undefined;
    let watchOptions: WatchOptions | undefined;
    let extendedConfigPath: string | string[] | undefined;
    let rootCompilerOptions: PropertyName[] | undefined;

    const rootOptions = getTsconfigRootOptionsMap();
    const json = convertConfigFileToObject(
        sourceFile,
        errors,
        { rootOptions, onPropertySet },
    );

    if (!typeAcquisition) {
        typeAcquisition = getDefaultTypeAcquisition(configFileName);
    }

    if (rootCompilerOptions && json && json.compilerOptions === undefined) {
        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, rootCompilerOptions[0], Diagnostics._0_should_be_set_inside_the_compilerOptions_object_of_the_config_json_file, getTextOfPropertyName(rootCompilerOptions[0]) as string));
    }

    return { raw: json, options, watchOptions, typeAcquisition, extendedConfigPath };

    function onPropertySet(
        keyText: string,
        value: any,
        propertyAssignment: PropertyAssignment,
        parentOption: TsConfigOnlyOption | undefined,
        option: CommandLineOption | undefined,
    ) {
        // Ensure value is verified except for extends which is handled in its own way for error reporting
        if (option && option !== extendsOptionDeclaration) value = convertJsonOption(option, value, basePath, errors, propertyAssignment, propertyAssignment.initializer, sourceFile);
        if (parentOption?.name) {
            if (option) {
                let currentOption;
                if (parentOption === compilerOptionsDeclaration) currentOption = options;
                else if (parentOption === watchOptionsDeclaration) currentOption = watchOptions ??= {};
                else if (parentOption === typeAcquisitionDeclaration) currentOption = typeAcquisition ??= getDefaultTypeAcquisition(configFileName);
                else Debug.fail("Unknown option");
                currentOption[option.name] = value;
            }
            else if (keyText && parentOption?.extraKeyDiagnostics) {
                if (parentOption.elementOptions) {
                    errors.push(createUnknownOptionError(
                        keyText,
                        parentOption.extraKeyDiagnostics,
                        /*unknownOptionErrorText*/ undefined,
                        propertyAssignment.name,
                        sourceFile,
                    ));
                }
                else {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, propertyAssignment.name, parentOption.extraKeyDiagnostics.unknownOptionDiagnostic, keyText));
                }
            }
        }
        else if (parentOption === rootOptions) {
            if (option === extendsOptionDeclaration) {
                extendedConfigPath = getExtendsConfigPathOrArray(value, host, basePath, configFileName, errors, propertyAssignment, propertyAssignment.initializer, sourceFile);
            }
            else if (!option) {
                if (keyText === "excludes") {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, propertyAssignment.name, Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
                }
                if (find(commandOptionsWithoutBuild, opt => opt.name === keyText)) {
                    rootCompilerOptions = append(rootCompilerOptions, propertyAssignment.name);
                }
            }
        }
    }
}

function getExtendsConfigPath(
    extendedConfig: string,
    host: ParseConfigHost,
    basePath: string,
    errors: Diagnostic[],
    valueExpression: Expression | undefined,
    sourceFile: TsConfigSourceFile | undefined,
) {
    extendedConfig = normalizeSlashes(extendedConfig);
    if (isRootedDiskPath(extendedConfig) || startsWith(extendedConfig, "./") || startsWith(extendedConfig, "../")) {
        let extendedConfigPath = getNormalizedAbsolutePath(extendedConfig, basePath);
        if (!host.fileExists(extendedConfigPath) && !endsWith(extendedConfigPath, Extension.Json)) {
            extendedConfigPath = `${extendedConfigPath}.json`;
            if (!host.fileExists(extendedConfigPath)) {
                errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, Diagnostics.File_0_not_found, extendedConfig));
                return undefined;
            }
        }
        return extendedConfigPath;
    }
    // If the path isn't a rooted or relative path, resolve like a module
    const resolved = nodeNextJsonConfigResolver(extendedConfig, combinePaths(basePath, "tsconfig.json"), host);
    if (resolved.resolvedModule) {
        return resolved.resolvedModule.resolvedFileName;
    }
    if (extendedConfig === "") {
        errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, Diagnostics.Compiler_option_0_cannot_be_given_an_empty_string, "extends"));
    }
    else {
        errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, Diagnostics.File_0_not_found, extendedConfig));
    }
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
    resolutionStack: string[],
    errors: Diagnostic[],
    extendedConfigCache: Map<string, ExtendedConfigCacheEntry> | undefined,
    result: ExtendsResult,
): ParsedTsconfig | undefined {
    const path = host.useCaseSensitiveFileNames ? extendedConfigPath : toFileNameLowerCase(extendedConfigPath);
    let value: ExtendedConfigCacheEntry | undefined;
    let extendedResult: TsConfigSourceFile;
    let extendedConfig: ParsedTsconfig | undefined;
    if (extendedConfigCache && (value = extendedConfigCache.get(path))) {
        ({ extendedResult, extendedConfig } = value);
    }
    else {
        extendedResult = readJsonConfigFile(extendedConfigPath, path => host.readFile(path));
        if (!extendedResult.parseDiagnostics.length) {
            extendedConfig = parseConfig(/*json*/ undefined, extendedResult, host, getDirectoryPath(extendedConfigPath), getBaseFileName(extendedConfigPath), resolutionStack, errors, extendedConfigCache);
        }
        if (extendedConfigCache) {
            extendedConfigCache.set(path, { extendedResult, extendedConfig });
        }
    }
    if (sourceFile) {
        (result.extendedSourceFiles ??= new Set()).add(extendedResult.fileName);
        if (extendedResult.extendedSourceFiles) {
            for (const extenedSourceFile of extendedResult.extendedSourceFiles) {
                result.extendedSourceFiles.add(extenedSourceFile);
            }
        }
    }
    if (extendedResult.parseDiagnostics.length) {
        errors.push(...extendedResult.parseDiagnostics);
        return undefined;
    }
    return extendedConfig!;
}

function convertCompileOnSaveOptionFromJson(jsonOption: any, basePath: string, errors: Diagnostic[]): boolean {
    if (!hasProperty(jsonOption, compileOnSaveCommandLineOption.name)) {
        return false;
    }
    const result = convertJsonOption(compileOnSaveCommandLineOption, jsonOption.compileOnSave, basePath, errors);
    return typeof result === "boolean" && result;
}

export function convertCompilerOptionsFromJson(jsonOptions: any, basePath: string, configFileName?: string): { options: CompilerOptions; errors: Diagnostic[]; } {
    const errors: Diagnostic[] = [];
    const options = convertCompilerOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName);
    return { options, errors };
}

export function convertTypeAcquisitionFromJson(jsonOptions: any, basePath: string, configFileName?: string): { options: TypeAcquisition; errors: Diagnostic[]; } {
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

function convertCompilerOptionsFromJsonWorker(jsonOptions: any, basePath: string, errors: Diagnostic[], configFileName?: string): CompilerOptions {
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

function convertTypeAcquisitionFromJsonWorker(jsonOptions: any, basePath: string, errors: Diagnostic[], configFileName?: string): TypeAcquisition {
    const options = getDefaultTypeAcquisition(configFileName);
    convertOptionsFromJson(getCommandLineTypeAcquisitionMap(), jsonOptions, basePath, options, typeAcquisitionDidYouMeanDiagnostics, errors);
    return options;
}

function convertWatchOptionsFromJsonWorker(jsonOptions: any, basePath: string, errors: Diagnostic[]): WatchOptions | undefined {
    return convertOptionsFromJson(getCommandLineWatchOptionsMap(), jsonOptions, basePath, /*defaultOptions*/ undefined, watchOptionsDidYouMeanDiagnostics, errors);
}

function convertOptionsFromJson(optionsNameMap: Map<string, CommandLineOption>, jsonOptions: any, basePath: string, defaultOptions: undefined, diagnostics: DidYouMeanOptionsDiagnostics, errors: Diagnostic[]): WatchOptions | undefined;
function convertOptionsFromJson(optionsNameMap: Map<string, CommandLineOption>, jsonOptions: any, basePath: string, defaultOptions: CompilerOptions | TypeAcquisition, diagnostics: DidYouMeanOptionsDiagnostics, errors: Diagnostic[]): CompilerOptions | TypeAcquisition;
function convertOptionsFromJson(optionsNameMap: Map<string, CommandLineOption>, jsonOptions: any, basePath: string, defaultOptions: CompilerOptions | TypeAcquisition | WatchOptions | undefined, diagnostics: DidYouMeanOptionsDiagnostics, errors: Diagnostic[]) {
    if (!jsonOptions) {
        return;
    }

    for (const id in jsonOptions) {
        const opt = optionsNameMap.get(id);
        if (opt) {
            (defaultOptions || (defaultOptions = {}))[opt.name] = convertJsonOption(opt, jsonOptions[id], basePath, errors);
        }
        else {
            errors.push(createUnknownOptionError(id, diagnostics));
        }
    }
    return defaultOptions;
}

function createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile: TsConfigSourceFile | undefined, node: Node | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments) {
    return sourceFile && node ?
        createDiagnosticForNodeInSourceFile(sourceFile, node, message, ...args) :
        createCompilerDiagnostic(message, ...args);
}

/** @internal */
export function convertJsonOption(
    opt: CommandLineOption,
    value: any,
    basePath: string,
    errors: Diagnostic[],
    propertyAssignment?: PropertyAssignment,
    valueExpression?: Expression,
    sourceFile?: TsConfigSourceFile,
): CompilerOptionsValue {
    if (opt.isCommandLineOnly) {
        errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, propertyAssignment?.name, Diagnostics.Option_0_can_only_be_specified_on_command_line, opt.name));
        return undefined;
    }
    if (isCompilerOptionsValue(opt, value)) {
        const optType = opt.type;
        if ((optType === "list") && isArray(value)) {
            return convertJsonOptionOfListType(opt, value, basePath, errors, propertyAssignment, valueExpression as ArrayLiteralExpression | undefined, sourceFile);
        }
        else if (optType === "listOrElement") {
            return isArray(value) ?
                convertJsonOptionOfListType(opt, value, basePath, errors, propertyAssignment, valueExpression as ArrayLiteralExpression | undefined, sourceFile) :
                convertJsonOption(opt.element, value, basePath, errors, propertyAssignment, valueExpression, sourceFile);
        }
        else if (!isString(opt.type)) {
            return convertJsonOptionOfCustomType(opt as CommandLineOptionOfCustomType, value as string, errors, valueExpression, sourceFile);
        }
        const validatedValue = validateJsonOptionValue(opt, value, errors, valueExpression, sourceFile);
        return isNullOrUndefined(validatedValue) ? validatedValue : normalizeNonListOptionValue(opt, basePath, validatedValue);
    }
    else {
        errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, Diagnostics.Compiler_option_0_requires_a_value_of_type_1, opt.name, getCompilerOptionValueTypeString(opt)));
    }
}

function normalizeNonListOptionValue(option: CommandLineOption, basePath: string, value: any): CompilerOptionsValue {
    if (option.isFilePath) {
        value = normalizeSlashes(value);
        value = !startsWithConfigDirTemplate(value) ? getNormalizedAbsolutePath(value, basePath) : value;
        if (value === "") {
            value = ".";
        }
    }
    return value;
}

function validateJsonOptionValue<T extends CompilerOptionsValue>(
    opt: CommandLineOption,
    value: T,
    errors: Diagnostic[],
    valueExpression?: Expression,
    sourceFile?: TsConfigSourceFile,
): T | undefined {
    if (isNullOrUndefined(value)) return undefined;
    const d = opt.extraValidation?.(value);
    if (!d) return value;
    errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, ...d));
    return undefined;
}

function convertJsonOptionOfCustomType(
    opt: CommandLineOptionOfCustomType,
    value: string,
    errors: Diagnostic[],
    valueExpression?: Expression,
    sourceFile?: TsConfigSourceFile,
) {
    if (isNullOrUndefined(value)) return undefined;
    const key = value.toLowerCase();
    const val = opt.type.get(key);
    if (val !== undefined) {
        return validateJsonOptionValue(opt, val, errors, valueExpression, sourceFile);
    }
    else {
        errors.push(createDiagnosticForInvalidCustomType(opt, (message, ...args) => createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, message, ...args)));
    }
}

function convertJsonOptionOfListType(
    option: CommandLineOptionOfListType,
    values: readonly any[],
    basePath: string,
    errors: Diagnostic[],
    propertyAssignment: PropertyAssignment | undefined,
    valueExpression: ArrayLiteralExpression | undefined,
    sourceFile: TsConfigSourceFile | undefined,
): any[] {
    return filter(map(values, (v, index) => convertJsonOption(option.element, v, basePath, errors, propertyAssignment, valueExpression?.elements[index], sourceFile)), v => option.listPreserveFalsyValues ? true : !!v);
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
 * Gets the file names from the provided config file specs that contain, files, include, exclude and
 * other properties needed to resolve the file names
 * @param configFileSpecs The config file specs extracted with file names to include, wildcards to include/exclude and other details
 * @param basePath The base path for any relative file specifications.
 * @param options Compiler options.
 * @param host The host used to resolve files and directories.
 * @param extraFileExtensions optionaly file extra file extension information from host
 *
 * @internal
 */
export function getFileNamesFromConfigSpecs(
    configFileSpecs: ConfigFileSpecs,
    basePath: string,
    options: CompilerOptions,
    host: ParseConfigHost,
    extraFileExtensions: readonly FileExtensionInfo[] = emptyArray,
): string[] {
    basePath = normalizePath(basePath);

    const keyMapper = createGetCanonicalFileName(host.useCaseSensitiveFileNames);

    // Literal file names (provided via the "files" array in tsconfig.json) are stored in a
    // file map with a possibly case insensitive key. We use this map later when when including
    // wildcard paths.
    const literalFileMap = new Map<string, string>();

    // Wildcard paths (provided via the "includes" array in tsconfig.json) are stored in a
    // file map with a possibly case insensitive key. We use this map to store paths matched
    // via wildcard, and to handle extension priority.
    const wildcardFileMap = new Map<string, string>();

    // Wildcard paths of json files (provided via the "includes" array in tsconfig.json) are stored in a
    // file map with a possibly case insensitive key. We use this map to store paths matched
    // via wildcard of *.json kind
    const wildCardJsonFileMap = new Map<string, string>();
    const { validatedFilesSpec, validatedIncludeSpecs, validatedExcludeSpecs } = configFileSpecs;

    // Rather than re-query this for each file and filespec, we query the supported extensions
    // once and store it on the expansion context.
    const supportedExtensions = getSupportedExtensions(options, extraFileExtensions);
    const supportedExtensionsWithJsonIfResolveJsonModule = getSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions);

    // Literal files are always included verbatim. An "include" or "exclude" specification cannot
    // remove a literal file.
    if (validatedFilesSpec) {
        for (const fileName of validatedFilesSpec) {
            const file = getNormalizedAbsolutePath(fileName, basePath);
            literalFileMap.set(keyMapper(file), file);
        }
    }

    let jsonOnlyIncludeRegexes: readonly RegExp[] | undefined;
    if (validatedIncludeSpecs && validatedIncludeSpecs.length > 0) {
        for (const file of host.readDirectory(basePath, flatten(supportedExtensionsWithJsonIfResolveJsonModule), validatedExcludeSpecs, validatedIncludeSpecs, /*depth*/ undefined)) {
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

    return literalFiles.concat(wildcardFiles, arrayFrom(wildCardJsonFileMap.values()));
}

/** @internal */
export function isExcludedFile(
    pathToCheck: string,
    spec: ConfigFileSpecs,
    basePath: string,
    useCaseSensitiveFileNames: boolean,
    currentDirectory: string,
): boolean {
    const { validatedFilesSpec, validatedIncludeSpecs, validatedExcludeSpecs } = spec;
    if (!length(validatedIncludeSpecs) || !length(validatedExcludeSpecs)) return false;

    basePath = normalizePath(basePath);

    const keyMapper = createGetCanonicalFileName(useCaseSensitiveFileNames);
    if (validatedFilesSpec) {
        for (const fileName of validatedFilesSpec) {
            if (keyMapper(getNormalizedAbsolutePath(fileName, basePath)) === pathToCheck) return false;
        }
    }

    return matchesExcludeWorker(pathToCheck, validatedExcludeSpecs, useCaseSensitiveFileNames, currentDirectory, basePath);
}

function invalidDotDotAfterRecursiveWildcard(s: string) {
    // We used to use the regex /(^|\/)\*\*\/(.*\/)?\.\.($|\/)/ to check for this case, but
    // in v8, that has polynomial performance because the recursive wildcard match - **/ -
    // can be matched in many arbitrary positions when multiple are present, resulting
    // in bad backtracking (and we don't care which is matched - just that some /.. segment
    // comes after some **/ segment).
    const wildcardIndex = startsWith(s, "**/") ? 0 : s.indexOf("/**/");
    if (wildcardIndex === -1) {
        return false;
    }
    const lastDotIndex = endsWith(s, "/..") ? s.length : s.lastIndexOf("/../");
    return lastDotIndex > wildcardIndex;
}

/** @internal */
export function matchesExclude(
    pathToCheck: string,
    excludeSpecs: readonly string[] | undefined,
    useCaseSensitiveFileNames: boolean,
    currentDirectory: string,
) {
    return matchesExcludeWorker(
        pathToCheck,
        filter(excludeSpecs, spec => !invalidDotDotAfterRecursiveWildcard(spec)),
        useCaseSensitiveFileNames,
        currentDirectory,
    );
}

function matchesExcludeWorker(
    pathToCheck: string,
    excludeSpecs: readonly string[] | undefined,
    useCaseSensitiveFileNames: boolean,
    currentDirectory: string,
    basePath?: string,
) {
    const excludePattern = getRegularExpressionForWildcard(excludeSpecs, combinePaths(normalizePath(currentDirectory), basePath), "exclude");
    const excludeRegex = excludePattern && getRegexFromPattern(excludePattern, useCaseSensitiveFileNames);
    if (!excludeRegex) return false;
    if (excludeRegex.test(pathToCheck)) return true;
    return !hasExtension(pathToCheck) && excludeRegex.test(ensureTrailingDirectorySeparator(pathToCheck));
}

function validateSpecs(specs: readonly string[], errors: Diagnostic[], disallowTrailingRecursion: boolean, jsonSourceFile: TsConfigSourceFile | undefined, specKey: string): readonly string[] {
    return specs.filter(spec => {
        if (!isString(spec)) return false;
        const diag = specToDiagnostic(spec, disallowTrailingRecursion);
        if (diag !== undefined) {
            errors.push(createDiagnostic(...diag));
        }
        return diag === undefined;
    });

    function createDiagnostic(message: DiagnosticMessage, spec: string): Diagnostic {
        const element = getTsConfigPropArrayElementValue(jsonSourceFile, specKey, spec);
        return createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(jsonSourceFile, element, message, spec);
    }
}

function specToDiagnostic(spec: CompilerOptionsValue, disallowTrailingRecursion?: boolean): [DiagnosticMessage, string] | undefined {
    Debug.assert(typeof spec === "string");
    if (disallowTrailingRecursion && invalidTrailingRecursionPattern.test(spec)) {
        return [Diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, spec];
    }
    else if (invalidDotDotAfterRecursiveWildcard(spec)) {
        return [Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, spec];
    }
}

/**
 * Gets directories in a set of include patterns that should be watched for changes.
 */
function getWildcardDirectories({ validatedIncludeSpecs: include, validatedExcludeSpecs: exclude }: ConfigFileSpecs, basePath: string, useCaseSensitiveFileNames: boolean): MapLike<WatchDirectoryFlags> {
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
    const rawExcludeRegex = getRegularExpressionForWildcard(exclude, basePath, "exclude");
    const excludeRegex = rawExcludeRegex && new RegExp(rawExcludeRegex, useCaseSensitiveFileNames ? "" : "i");
    const wildcardDirectories: MapLike<WatchDirectoryFlags> = {};
    const wildCardKeyToPath = new Map<CanonicalKey, string>();
    if (include !== undefined) {
        const recursiveKeys: CanonicalKey[] = [];
        for (const file of include) {
            const spec = normalizePath(combinePaths(basePath, file));
            if (excludeRegex && excludeRegex.test(spec)) {
                continue;
            }

            const match = getWildcardDirectoryFromSpec(spec, useCaseSensitiveFileNames);
            if (match) {
                const { key, path, flags } = match;
                const existingPath = wildCardKeyToPath.get(key);
                const existingFlags = existingPath !== undefined ? wildcardDirectories[existingPath] : undefined;
                if (existingFlags === undefined || existingFlags < flags) {
                    wildcardDirectories[existingPath !== undefined ? existingPath : path] = flags;
                    if (existingPath === undefined) wildCardKeyToPath.set(key, path);
                    if (flags === WatchDirectoryFlags.Recursive) {
                        recursiveKeys.push(key);
                    }
                }
            }
        }

        // Remove any subpaths under an existing recursively watched directory.
        for (const path in wildcardDirectories) {
            if (hasProperty(wildcardDirectories, path)) {
                for (const recursiveKey of recursiveKeys) {
                    const key = toCanonicalKey(path, useCaseSensitiveFileNames);
                    if (key !== recursiveKey && containsPath(recursiveKey, key, basePath, !useCaseSensitiveFileNames)) {
                        delete wildcardDirectories[path];
                    }
                }
            }
        }
    }

    return wildcardDirectories;
}

type CanonicalKey = string & { __canonicalKey: never; };
function toCanonicalKey(path: string, useCaseSensitiveFileNames: boolean): CanonicalKey {
    return (useCaseSensitiveFileNames ? path : toFileNameLowerCase(path)) as CanonicalKey;
}

function getWildcardDirectoryFromSpec(spec: string, useCaseSensitiveFileNames: boolean): { key: CanonicalKey; path: string; flags: WatchDirectoryFlags; } | undefined {
    const match = wildcardDirectoryPattern.exec(spec);
    if (match) {
        // We check this with a few `indexOf` calls because 3 `indexOf`/`lastIndexOf` calls is
        // less algorithmically complex (roughly O(3n) worst-case) than the regex we used to use,
        // \/[^/]*?[*?][^/]*\/ which was polynominal in v8, since arbitrary sequences of wildcard
        // characters could match any of the central patterns, resulting in bad backtracking.
        const questionWildcardIndex = spec.indexOf("?");
        const starWildcardIndex = spec.indexOf("*");
        const lastDirectorySeperatorIndex = spec.lastIndexOf(directorySeparator);
        return {
            key: toCanonicalKey(match[0], useCaseSensitiveFileNames),
            path: match[0],
            flags: (questionWildcardIndex !== -1 && questionWildcardIndex < lastDirectorySeperatorIndex)
                    || (starWildcardIndex !== -1 && starWildcardIndex < lastDirectorySeperatorIndex)
                ? WatchDirectoryFlags.Recursive : WatchDirectoryFlags.None,
        };
    }
    if (isImplicitGlob(spec.substring(spec.lastIndexOf(directorySeparator) + 1))) {
        const path = removeTrailingDirectorySeparator(spec);
        return {
            key: toCanonicalKey(path, useCaseSensitiveFileNames),
            path,
            flags: WatchDirectoryFlags.Recursive,
        };
    }
    return undefined;
}

/**
 * Determines whether a literal or wildcard file has already been included that has a higher
 * extension priority.
 *
 * @param file The path to the file.
 */
function hasFileWithHigherPriorityExtension(file: string, literalFiles: Map<string, string>, wildcardFiles: Map<string, string>, extensions: readonly string[][], keyMapper: (value: string) => string) {
    const extensionGroup = forEach(extensions, group => fileExtensionIsOneOf(file, group) ? group : undefined);
    if (!extensionGroup) {
        return false;
    }
    for (const ext of extensionGroup) {
        // d.ts files match with .ts extension and with case sensitive sorting the file order for same files with ts tsx and dts extension is
        // d.ts, .ts, .tsx in that order so we need to handle tsx and dts of same same name case here and in remove files with same extensions
        // So dont match .d.ts files with .ts extension
        if (fileExtensionIs(file, ext) && (ext !== Extension.Ts || !fileExtensionIs(file, Extension.Dts))) {
            return false;
        }
        const higherPriorityPath = keyMapper(changeExtension(file, ext));
        if (literalFiles.has(higherPriorityPath) || wildcardFiles.has(higherPriorityPath)) {
            if (ext === Extension.Dts && (fileExtensionIs(file, Extension.Js) || fileExtensionIs(file, Extension.Jsx))) {
                // LEGACY BEHAVIOR: An off-by-one bug somewhere in the extension priority system for wildcard module loading allowed declaration
                // files to be loaded alongside their js(x) counterparts. We regard this as generally undesirable, but retain the behavior to
                // prevent breakage.
                continue;
            }
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
 */
function removeWildcardFilesWithLowerPriorityExtension(file: string, wildcardFiles: Map<string, string>, extensions: readonly string[][], keyMapper: (value: string) => string) {
    const extensionGroup = forEach(extensions, group => fileExtensionIsOneOf(file, group) ? group : undefined);
    if (!extensionGroup) {
        return;
    }
    for (let i = extensionGroup.length - 1; i >= 0; i--) {
        const ext = extensionGroup[i];
        if (fileExtensionIs(file, ext)) {
            return;
        }
        const lowerPriorityPath = keyMapper(changeExtension(file, ext));
        wildcardFiles.delete(lowerPriorityPath);
    }
}

/**
 * Produces a cleaned version of compiler options with personally identifying info (aka, paths) removed.
 * Also converts enum values back to strings.
 *
 * @internal
 */
export function convertCompilerOptionsForTelemetry(opts: CompilerOptions): CompilerOptions {
    const out: CompilerOptions = {};
    for (const key in opts) {
        if (hasProperty(opts, key)) {
            const type = getOptionFromName(key);
            if (type !== undefined) { // Ignore unknown options
                out[key] = getOptionValueWithEmptyStrings(opts[key], type);
            }
        }
    }
    return out;
}

function getOptionValueWithEmptyStrings(value: any, option: CommandLineOption): {} | undefined {
    if (value === undefined) return value;
    switch (option.type) {
        case "object": // "paths". Can't get any useful information from the value since we blank out strings, so just return "".
            return "";
        case "string": // Could be any arbitrary string -- use empty string instead.
            return "";
        case "number": // Allow numbers, but be sure to check it's actually a number.
            return typeof value === "number" ? value : "";
        case "boolean":
            return typeof value === "boolean" ? value : "";
        case "listOrElement":
            if (!isArray(value)) return getOptionValueWithEmptyStrings(value, option.element);
            // fall through to list
        case "list":
            const elementType = option.element;
            return isArray(value) ? mapDefined(value, v => getOptionValueWithEmptyStrings(v, elementType)) : "";
        default:
            return forEachEntry(option.type, (optionEnumValue, optionStringValue) => {
                if (optionEnumValue === value) {
                    return optionStringValue;
                }
            });
    }
}

function getDefaultValueForOption(option: CommandLineOption): {} {
    switch (option.type) {
        case "number":
            return 1;
        case "boolean":
            return true;
        case "string":
            const defaultValue = option.defaultValueDescription;
            return option.isFilePath ? `./${defaultValue && typeof defaultValue === "string" ? defaultValue : ""}` : "";
        case "list":
            return [];
        case "listOrElement":
            return getDefaultValueForOption(option.element);
        case "object":
            return {};
        default:
            const value = firstOrUndefinedIterator(option.type.keys());
            if (value !== undefined) return value;
            return Debug.fail("Expected 'option.type' to have entries.");
    }
}
