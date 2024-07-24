import {
    arrayFrom,
    BuilderProgram,
    BuildOptions,
    buildOpts,
    changeCompilerHostLikeToUseCache,
    CharacterCodes,
    combinePaths,
    CommandLineOption,
    compareStringsCaseInsensitive,
    CompilerOptions,
    contains,
    convertToOptionsWithAbsolutePaths,
    convertToTSConfig,
    createBuilderStatusReporter,
    createCompilerDiagnostic,
    createCompilerHostWorker,
    createDiagnosticReporter,
    createGetCanonicalFileName,
    createIncrementalCompilerHost,
    CreateProgram,
    createProgram,
    CreateProgramOptions,
    createSolutionBuilder,
    createSolutionBuilderHost,
    createSolutionBuilderWithWatch,
    createSolutionBuilderWithWatchHost,
    createWatchCompilerHostOfConfigFile,
    createWatchCompilerHostOfFilesAndCompilerOptions,
    createWatchProgram,
    createWatchStatusReporter as ts_createWatchStatusReporter,
    Debug,
    Diagnostic,
    DiagnosticMessage,
    DiagnosticReporter,
    Diagnostics,
    dumpTracingLegend,
    EmitAndSemanticDiagnosticsBuilderProgram,
    emitFilesAndReportErrorsAndGetExitStatus,
    ExitStatus,
    ExtendedConfigCacheEntry,
    Extension,
    fileExtensionIs,
    fileExtensionIsOneOf,
    filter,
    findConfigFile,
    forEach,
    formatMessage,
    generateTSConfig,
    getBuildOrderFromAnyBuildOrder,
    getCompilerOptionsDiffValue,
    getConfigFileParsingDiagnostics,
    getDiagnosticText,
    getErrorSummaryText,
    getLineStarts,
    getNormalizedAbsolutePath,
    isIncrementalCompilation,
    isWatchSet,
    JSDocParsingMode,
    normalizePath,
    optionDeclarations,
    optionsForBuild,
    optionsForWatch,
    parseBuildCommand,
    parseCommandLine,
    parseConfigFileWithSystem,
    ParsedCommandLine,
    performIncrementalCompilation as ts_performIncrementalCompilation,
    Program,
    reduceLeftIterator,
    ReportEmitErrorSummary,
    SolutionBuilder,
    SolutionBuilderHostBase,
    SourceFile,
    startsWith,
    startTracing,
    supportedJSExtensionsFlat,
    supportedTSExtensionsFlat,
    sys,
    System,
    toPath,
    toSorted,
    tracing,
    validateLocaleAndSetLanguage,
    version,
    WatchCompilerHost,
    WatchOfConfigFile,
    WatchOptions,
} from "./_namespaces/ts.js";
import * as performance from "./performance.js";

interface Statistic {
    name: string;
    value: number;
    type: StatisticType;
}

/** @internal */
export enum StatisticType {
    time,
    count,
    memory,
}

function countLines(program: Program): Map<string, number> {
    const counts = getCountsMap();
    forEach(program.getSourceFiles(), file => {
        const key = getCountKey(program, file);
        const lineCount = getLineStarts(file).length;
        counts.set(key, counts.get(key)! + lineCount);
    });
    return counts;
}

function getCountsMap() {
    const counts = new Map<string, number>();
    counts.set("Library", 0);
    counts.set("Definitions", 0);
    counts.set("TypeScript", 0);
    counts.set("JavaScript", 0);
    counts.set("JSON", 0);
    counts.set("Other", 0);
    return counts;
}

function getCountKey(program: Program, file: SourceFile) {
    if (program.isSourceFileDefaultLibrary(file)) {
        return "Library";
    }
    else if (file.isDeclarationFile) {
        return "Definitions";
    }

    const path = file.path;
    if (fileExtensionIsOneOf(path, supportedTSExtensionsFlat)) {
        return "TypeScript";
    }
    else if (fileExtensionIsOneOf(path, supportedJSExtensionsFlat)) {
        return "JavaScript";
    }
    else if (fileExtensionIs(path, Extension.Json)) {
        return "JSON";
    }
    else {
        return "Other";
    }
}

function updateReportDiagnostic(
    sys: System,
    existing: DiagnosticReporter,
    options: CompilerOptions | BuildOptions,
): DiagnosticReporter {
    return shouldBePretty(sys, options) ?
        createDiagnosticReporter(sys, /*pretty*/ true) :
        existing;
}

function defaultIsPretty(sys: System) {
    return !!sys.writeOutputIsTTY && sys.writeOutputIsTTY() && !sys.getEnvironmentVariable("NO_COLOR");
}

function shouldBePretty(sys: System, options: CompilerOptions | BuildOptions) {
    if (!options || typeof options.pretty === "undefined") {
        return defaultIsPretty(sys);
    }
    return options.pretty;
}

function getOptionsForHelp(commandLine: ParsedCommandLine) {
    // Sort our options by their names, (e.g. "--noImplicitAny" comes before "--watch")
    return !!commandLine.options.all ?
        toSorted(optionDeclarations, (a, b) => compareStringsCaseInsensitive(a.name, b.name)) :
        filter(optionDeclarations.slice(), v => !!v.showInSimplifiedHelpView);
}

function printVersion(sys: System) {
    sys.write(getDiagnosticText(Diagnostics.Version_0, version) + sys.newLine);
}

function createColors(sys: System) {
    const showColors = defaultIsPretty(sys);
    if (!showColors) {
        return {
            bold: (str: string) => str,
            blue: (str: string) => str,
            blueBackground: (str: string) => str,
            brightWhite: (str: string) => str,
        };
    }

    function bold(str: string) {
        return `\x1b[1m${str}\x1b[22m`;
    }

    const isWindows = sys.getEnvironmentVariable("OS") && sys.getEnvironmentVariable("OS").toLowerCase().includes("windows");
    const isWindowsTerminal = sys.getEnvironmentVariable("WT_SESSION");
    const isVSCode = sys.getEnvironmentVariable("TERM_PROGRAM") && sys.getEnvironmentVariable("TERM_PROGRAM") === "vscode";

    function blue(str: string) {
        // Effectively Powershell and Command prompt users use cyan instead
        // of blue because the default theme doesn't show blue with enough contrast.
        if (isWindows && !isWindowsTerminal && !isVSCode) {
            return brightWhite(str);
        }

        return `\x1b[94m${str}\x1b[39m`;
    }

    // There are ~3 types of terminal color support: 16 colors, 256 and 16m colors
    // If there is richer color support, e.g. 256+ we can use extended ANSI codes which are not just generic 'blue'
    // but a 'lighter blue' which is closer to the blue in the TS logo.
    const supportsRicherColors = sys.getEnvironmentVariable("COLORTERM") === "truecolor" || sys.getEnvironmentVariable("TERM") === "xterm-256color";
    function blueBackground(str: string) {
        if (supportsRicherColors) {
            return `\x1B[48;5;68m${str}\x1B[39;49m`;
        }
        else {
            return `\x1b[44m${str}\x1B[39;49m`;
        }
    }
    function brightWhite(str: string) {
        return `\x1b[97m${str}\x1b[39m`;
    }
    return {
        bold,
        blue,
        brightWhite,
        blueBackground,
    };
}

function getDisplayNameTextOfOption(option: CommandLineOption) {
    return `--${option.name}${option.shortName ? `, -${option.shortName}` : ""}`;
}

function generateOptionOutput(sys: System, option: CommandLineOption, rightAlignOfLeft: number, leftAlignOfRight: number) {
    interface ValueCandidate {
        // "one or more" or "any of"
        valueType: string;
        possibleValues: string;
    }

    const text: string[] = [];
    const colors = createColors(sys);

    // name and description
    const name = getDisplayNameTextOfOption(option);

    // value type and possible value
    const valueCandidates = getValueCandidate(option);
    const defaultValueDescription = typeof option.defaultValueDescription === "object"
        ? getDiagnosticText(option.defaultValueDescription)
        : formatDefaultValue(
            option.defaultValueDescription,
            option.type === "list" || option.type === "listOrElement" ? option.element.type : option.type,
        );
    const terminalWidth = sys.getWidthOfTerminal?.() ?? 0;

    // Note: child_process might return `terminalWidth` as undefined.
    if (terminalWidth >= 80) {
        let description = "";
        if (option.description) {
            description = getDiagnosticText(option.description);
        }
        text.push(...getPrettyOutput(name, description, rightAlignOfLeft, leftAlignOfRight, terminalWidth, /*colorLeft*/ true), sys.newLine);
        if (showAdditionalInfoOutput(valueCandidates, option)) {
            if (valueCandidates) {
                text.push(...getPrettyOutput(valueCandidates.valueType, valueCandidates.possibleValues, rightAlignOfLeft, leftAlignOfRight, terminalWidth, /*colorLeft*/ false), sys.newLine);
            }
            if (defaultValueDescription) {
                text.push(...getPrettyOutput(getDiagnosticText(Diagnostics.default_Colon), defaultValueDescription, rightAlignOfLeft, leftAlignOfRight, terminalWidth, /*colorLeft*/ false), sys.newLine);
            }
        }
        text.push(sys.newLine);
    }
    else {
        text.push(colors.blue(name), sys.newLine);
        if (option.description) {
            const description = getDiagnosticText(option.description);
            text.push(description);
        }
        text.push(sys.newLine);
        if (showAdditionalInfoOutput(valueCandidates, option)) {
            if (valueCandidates) {
                text.push(`${valueCandidates.valueType} ${valueCandidates.possibleValues}`);
            }
            if (defaultValueDescription) {
                if (valueCandidates) text.push(sys.newLine);
                const diagType = getDiagnosticText(Diagnostics.default_Colon);
                text.push(`${diagType} ${defaultValueDescription}`);
            }

            text.push(sys.newLine);
        }
        text.push(sys.newLine);
    }
    return text;

    function formatDefaultValue(
        defaultValue: CommandLineOption["defaultValueDescription"],
        type: CommandLineOption["type"],
    ) {
        return defaultValue !== undefined && typeof type === "object"
            // e.g. ScriptTarget.ES2015 -> "es6/es2015"
            ? arrayFrom(type.entries())
                .filter(([, value]) => value === defaultValue)
                .map(([name]) => name)
                .join("/")
            : String(defaultValue);
    }

    function showAdditionalInfoOutput(valueCandidates: ValueCandidate | undefined, option: CommandLineOption): boolean {
        const ignoreValues = ["string"];
        const ignoredDescriptions = [undefined, "false", "n/a"];
        const defaultValueDescription = option.defaultValueDescription;
        if (option.category === Diagnostics.Command_line_Options) return false;

        if (contains(ignoreValues, valueCandidates?.possibleValues) && contains(ignoredDescriptions, defaultValueDescription)) {
            return false;
        }
        return true;
    }

    function getPrettyOutput(left: string, right: string, rightAlignOfLeft: number, leftAlignOfRight: number, terminalWidth: number, colorLeft: boolean) {
        const res = [];
        let isFirstLine = true;
        let remainRight = right;
        const rightCharacterNumber = terminalWidth - leftAlignOfRight;
        while (remainRight.length > 0) {
            let curLeft = "";
            if (isFirstLine) {
                curLeft = left.padStart(rightAlignOfLeft);
                curLeft = curLeft.padEnd(leftAlignOfRight);
                curLeft = colorLeft ? colors.blue(curLeft) : curLeft;
            }
            else {
                curLeft = "".padStart(leftAlignOfRight);
            }

            const curRight = remainRight.substr(0, rightCharacterNumber);
            remainRight = remainRight.slice(rightCharacterNumber);
            res.push(`${curLeft}${curRight}`);
            isFirstLine = false;
        }
        return res;
    }

    function getValueCandidate(option: CommandLineOption): ValueCandidate | undefined {
        // option.type might be "string" | "number" | "boolean" | "object" | "list" | Map<string, number | string>
        // string -- any of: string
        // number -- any of: number
        // boolean -- any of: boolean
        // object -- null
        // list -- one or more: , content depends on `option.element.type`, the same as others
        // Map<string, number | string> -- any of: key1, key2, ....
        if (option.type === "object") {
            return undefined;
        }

        return {
            valueType: getValueType(option),
            possibleValues: getPossibleValues(option),
        };

        function getValueType(option: CommandLineOption) {
            Debug.assert(option.type !== "listOrElement");
            switch (option.type) {
                case "string":
                case "number":
                case "boolean":
                    return getDiagnosticText(Diagnostics.type_Colon);
                case "list":
                    return getDiagnosticText(Diagnostics.one_or_more_Colon);
                default:
                    return getDiagnosticText(Diagnostics.one_of_Colon);
            }
        }

        function getPossibleValues(option: CommandLineOption) {
            let possibleValues: string;
            switch (option.type) {
                case "string":
                case "number":
                case "boolean":
                    possibleValues = option.type;
                    break;
                case "list":
                case "listOrElement":
                    possibleValues = getPossibleValues(option.element);
                    break;
                case "object":
                    possibleValues = "";
                    break;
                default:
                    // Map<string, number | string>
                    // Group synonyms: es6/es2015
                    const inverted: { [value: string]: string[]; } = {};
                    option.type.forEach((value, name) => {
                        if (!option.deprecatedKeys?.has(name)) {
                            (inverted[value] ||= []).push(name);
                        }
                    });
                    return Object.entries(inverted)
                        .map(([, synonyms]) => synonyms.join("/"))
                        .join(", ");
            }
            return possibleValues;
        }
    }
}

function generateGroupOptionOutput(sys: System, optionsList: readonly CommandLineOption[]) {
    let maxLength = 0;
    for (const option of optionsList) {
        const curLength = getDisplayNameTextOfOption(option).length;
        maxLength = maxLength > curLength ? maxLength : curLength;
    }

    // left part should be right align, right part should be left align

    // assume 2 space between left margin and left part.
    const rightAlignOfLeftPart = maxLength + 2;
    // assume 2 space between left and right part
    const leftAlignOfRightPart = rightAlignOfLeftPart + 2;
    let lines: string[] = [];
    for (const option of optionsList) {
        const tmp = generateOptionOutput(sys, option, rightAlignOfLeftPart, leftAlignOfRightPart);
        lines = [...lines, ...tmp];
    }
    // make sure always a blank line in the end.
    if (lines[lines.length - 2] !== sys.newLine) {
        lines.push(sys.newLine);
    }
    return lines;
}

function generateSectionOptionsOutput(sys: System, sectionName: string, options: readonly CommandLineOption[], subCategory: boolean, beforeOptionsDescription?: string, afterOptionsDescription?: string) {
    let res: string[] = [];
    res.push(createColors(sys).bold(sectionName) + sys.newLine + sys.newLine);
    if (beforeOptionsDescription) {
        res.push(beforeOptionsDescription + sys.newLine + sys.newLine);
    }
    if (!subCategory) {
        res = [...res, ...generateGroupOptionOutput(sys, options)];
        if (afterOptionsDescription) {
            res.push(afterOptionsDescription + sys.newLine + sys.newLine);
        }
        return res;
    }
    const categoryMap = new Map<string, CommandLineOption[]>();
    for (const option of options) {
        if (!option.category) {
            continue;
        }
        const curCategory = getDiagnosticText(option.category);
        const optionsOfCurCategory = categoryMap.get(curCategory) ?? [];
        optionsOfCurCategory.push(option);
        categoryMap.set(curCategory, optionsOfCurCategory);
    }
    categoryMap.forEach((value, key) => {
        res.push(`### ${key}${sys.newLine}${sys.newLine}`);
        res = [...res, ...generateGroupOptionOutput(sys, value)];
    });
    if (afterOptionsDescription) {
        res.push(afterOptionsDescription + sys.newLine + sys.newLine);
    }
    return res;
}

function printEasyHelp(sys: System, simpleOptions: readonly CommandLineOption[]) {
    const colors = createColors(sys);
    let output: string[] = [...getHeader(sys, `${getDiagnosticText(Diagnostics.tsc_Colon_The_TypeScript_Compiler)} - ${getDiagnosticText(Diagnostics.Version_0, version)}`)];
    output.push(colors.bold(getDiagnosticText(Diagnostics.COMMON_COMMANDS)) + sys.newLine + sys.newLine);

    example("tsc", Diagnostics.Compiles_the_current_project_tsconfig_json_in_the_working_directory);
    example("tsc app.ts util.ts", Diagnostics.Ignoring_tsconfig_json_compiles_the_specified_files_with_default_compiler_options);
    example("tsc -b", Diagnostics.Build_a_composite_project_in_the_working_directory);
    example("tsc --init", Diagnostics.Creates_a_tsconfig_json_with_the_recommended_settings_in_the_working_directory);
    example("tsc -p ./path/to/tsconfig.json", Diagnostics.Compiles_the_TypeScript_project_located_at_the_specified_path);
    example("tsc --help --all", Diagnostics.An_expanded_version_of_this_information_showing_all_possible_compiler_options);
    example(["tsc --noEmit", "tsc --target esnext"], Diagnostics.Compiles_the_current_project_with_additional_settings);

    const cliCommands = simpleOptions.filter(opt => opt.isCommandLineOnly || opt.category === Diagnostics.Command_line_Options);
    const configOpts = simpleOptions.filter(opt => !contains(cliCommands, opt));

    output = [
        ...output,
        ...generateSectionOptionsOutput(sys, getDiagnosticText(Diagnostics.COMMAND_LINE_FLAGS), cliCommands, /*subCategory*/ false, /*beforeOptionsDescription*/ undefined, /*afterOptionsDescription*/ undefined),
        ...generateSectionOptionsOutput(sys, getDiagnosticText(Diagnostics.COMMON_COMPILER_OPTIONS), configOpts, /*subCategory*/ false, /*beforeOptionsDescription*/ undefined, formatMessage(Diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0, "https://aka.ms/tsc")),
    ];

    for (const line of output) {
        sys.write(line);
    }

    function example(ex: string | string[], desc: DiagnosticMessage) {
        const examples = typeof ex === "string" ? [ex] : ex;
        for (const example of examples) {
            output.push("  " + colors.blue(example) + sys.newLine);
        }
        output.push("  " + getDiagnosticText(desc) + sys.newLine + sys.newLine);
    }
}

function printAllHelp(sys: System, compilerOptions: readonly CommandLineOption[], buildOptions: readonly CommandLineOption[], watchOptions: readonly CommandLineOption[]) {
    let output: string[] = [...getHeader(sys, `${getDiagnosticText(Diagnostics.tsc_Colon_The_TypeScript_Compiler)} - ${getDiagnosticText(Diagnostics.Version_0, version)}`)];
    output = [...output, ...generateSectionOptionsOutput(sys, getDiagnosticText(Diagnostics.ALL_COMPILER_OPTIONS), compilerOptions, /*subCategory*/ true, /*beforeOptionsDescription*/ undefined, formatMessage(Diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0, "https://aka.ms/tsc"))];
    output = [...output, ...generateSectionOptionsOutput(sys, getDiagnosticText(Diagnostics.WATCH_OPTIONS), watchOptions, /*subCategory*/ false, getDiagnosticText(Diagnostics.Including_watch_w_will_start_watching_the_current_project_for_the_file_changes_Once_set_you_can_config_watch_mode_with_Colon))];
    output = [...output, ...generateSectionOptionsOutput(sys, getDiagnosticText(Diagnostics.BUILD_OPTIONS), buildOptions, /*subCategory*/ false, formatMessage(Diagnostics.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0, "https://aka.ms/tsc-composite-builds"))];
    for (const line of output) {
        sys.write(line);
    }
}

function printBuildHelp(sys: System, buildOptions: readonly CommandLineOption[]) {
    let output: string[] = [...getHeader(sys, `${getDiagnosticText(Diagnostics.tsc_Colon_The_TypeScript_Compiler)} - ${getDiagnosticText(Diagnostics.Version_0, version)}`)];
    output = [...output, ...generateSectionOptionsOutput(sys, getDiagnosticText(Diagnostics.BUILD_OPTIONS), buildOptions, /*subCategory*/ false, formatMessage(Diagnostics.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0, "https://aka.ms/tsc-composite-builds"))];
    for (const line of output) {
        sys.write(line);
    }
}

function getHeader(sys: System, message: string) {
    const colors = createColors(sys);
    const header: string[] = [];
    const terminalWidth = sys.getWidthOfTerminal?.() ?? 0;
    const tsIconLength = 5;

    const tsIconFirstLine = colors.blueBackground("".padStart(tsIconLength));
    const tsIconSecondLine = colors.blueBackground(colors.brightWhite("TS ".padStart(tsIconLength)));
    // If we have enough space, print TS icon.
    if (terminalWidth >= message.length + tsIconLength) {
        // right align of the icon is 120 at most.
        const rightAlign = terminalWidth > 120 ? 120 : terminalWidth;
        const leftAlign = rightAlign - tsIconLength;
        header.push(message.padEnd(leftAlign) + tsIconFirstLine + sys.newLine);
        header.push("".padStart(leftAlign) + tsIconSecondLine + sys.newLine);
    }
    else {
        header.push(message + sys.newLine);
        header.push(sys.newLine);
    }
    return header;
}

function printHelp(sys: System, commandLine: ParsedCommandLine) {
    if (!commandLine.options.all) {
        printEasyHelp(sys, getOptionsForHelp(commandLine));
    }
    else {
        printAllHelp(sys, getOptionsForHelp(commandLine), optionsForBuild, optionsForWatch);
    }
}

function executeCommandLineWorker(
    sys: System,
    cb: ExecuteCommandLineCallbacks,
    commandLine: ParsedCommandLine,
) {
    let reportDiagnostic = createDiagnosticReporter(sys);
    if (commandLine.options.build) {
        reportDiagnostic(createCompilerDiagnostic(Diagnostics.Option_build_must_be_the_first_command_line_argument));
        return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    // Configuration file name (if any)
    let configFileName: string | undefined;
    if (commandLine.options.locale) {
        validateLocaleAndSetLanguage(commandLine.options.locale, sys, commandLine.errors);
    }

    // If there are any errors due to command line parsing and/or
    // setting up localization, report them and quit.
    if (commandLine.errors.length > 0) {
        commandLine.errors.forEach(reportDiagnostic);
        return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    if (commandLine.options.init) {
        writeConfigFile(sys, reportDiagnostic, commandLine.options, commandLine.fileNames);
        return sys.exit(ExitStatus.Success);
    }

    if (commandLine.options.version) {
        printVersion(sys);
        return sys.exit(ExitStatus.Success);
    }

    if (commandLine.options.help || commandLine.options.all) {
        printHelp(sys, commandLine);
        return sys.exit(ExitStatus.Success);
    }

    if (commandLine.options.watch && commandLine.options.listFilesOnly) {
        reportDiagnostic(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "watch", "listFilesOnly"));
        return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    if (commandLine.options.project) {
        if (commandLine.fileNames.length !== 0) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line));
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        const fileOrDirectory = normalizePath(commandLine.options.project);
        if (!fileOrDirectory /* current directory "." */ || sys.directoryExists(fileOrDirectory)) {
            configFileName = combinePaths(fileOrDirectory, "tsconfig.json");
            if (!sys.fileExists(configFileName)) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0, commandLine.options.project));
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
        }
        else {
            configFileName = fileOrDirectory;
            if (!sys.fileExists(configFileName)) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_specified_path_does_not_exist_Colon_0, commandLine.options.project));
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
        }
    }
    else if (commandLine.fileNames.length === 0) {
        const searchPath = normalizePath(sys.getCurrentDirectory());
        configFileName = findConfigFile(searchPath, fileName => sys.fileExists(fileName));
    }

    if (commandLine.fileNames.length === 0 && !configFileName) {
        if (commandLine.options.showConfig) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0, normalizePath(sys.getCurrentDirectory())));
        }
        else {
            printVersion(sys);
            printHelp(sys, commandLine);
        }
        return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    const currentDirectory = sys.getCurrentDirectory();
    const commandLineOptions = convertToOptionsWithAbsolutePaths(
        commandLine.options,
        fileName => getNormalizedAbsolutePath(fileName, currentDirectory),
    );
    if (configFileName) {
        const extendedConfigCache = new Map<string, ExtendedConfigCacheEntry>();
        const configParseResult = parseConfigFileWithSystem(configFileName, commandLineOptions, extendedConfigCache, commandLine.watchOptions, sys, reportDiagnostic)!; // TODO: GH#18217
        if (commandLineOptions.showConfig) {
            if (configParseResult.errors.length !== 0) {
                reportDiagnostic = updateReportDiagnostic(
                    sys,
                    reportDiagnostic,
                    configParseResult.options,
                );
                configParseResult.errors.forEach(reportDiagnostic);
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
            // eslint-disable-next-line no-restricted-syntax
            sys.write(JSON.stringify(convertToTSConfig(configParseResult, configFileName, sys), null, 4) + sys.newLine);
            return sys.exit(ExitStatus.Success);
        }
        reportDiagnostic = updateReportDiagnostic(
            sys,
            reportDiagnostic,
            configParseResult.options,
        );
        if (isWatchSet(configParseResult.options)) {
            if (reportWatchModeWithoutSysSupport(sys, reportDiagnostic)) return;
            return createWatchOfConfigFile(
                sys,
                cb,
                reportDiagnostic,
                configParseResult,
                commandLineOptions,
                commandLine.watchOptions,
                extendedConfigCache,
            );
        }
        else if (isIncrementalCompilation(configParseResult.options)) {
            performIncrementalCompilation(
                sys,
                cb,
                reportDiagnostic,
                configParseResult,
            );
        }
        else {
            performCompilation(
                sys,
                cb,
                reportDiagnostic,
                configParseResult,
            );
        }
    }
    else {
        if (commandLineOptions.showConfig) {
            // eslint-disable-next-line no-restricted-syntax
            sys.write(JSON.stringify(convertToTSConfig(commandLine, combinePaths(currentDirectory, "tsconfig.json"), sys), null, 4) + sys.newLine);
            return sys.exit(ExitStatus.Success);
        }
        reportDiagnostic = updateReportDiagnostic(
            sys,
            reportDiagnostic,
            commandLineOptions,
        );
        if (isWatchSet(commandLineOptions)) {
            if (reportWatchModeWithoutSysSupport(sys, reportDiagnostic)) return;
            return createWatchOfFilesAndCompilerOptions(
                sys,
                cb,
                reportDiagnostic,
                commandLine.fileNames,
                commandLineOptions,
                commandLine.watchOptions,
            );
        }
        else if (isIncrementalCompilation(commandLineOptions)) {
            performIncrementalCompilation(
                sys,
                cb,
                reportDiagnostic,
                { ...commandLine, options: commandLineOptions },
            );
        }
        else {
            performCompilation(
                sys,
                cb,
                reportDiagnostic,
                { ...commandLine, options: commandLineOptions },
            );
        }
    }
}

/** @internal */
export function isBuild(commandLineArgs: readonly string[]) {
    if (commandLineArgs.length > 0 && commandLineArgs[0].charCodeAt(0) === CharacterCodes.minus) {
        const firstOption = commandLineArgs[0].slice(commandLineArgs[0].charCodeAt(1) === CharacterCodes.minus ? 2 : 1).toLowerCase();
        return firstOption === "build" || firstOption === "b";
    }
    return false;
}

/** @internal */
export type ExecuteCommandLineCallbacks = (program: Program | BuilderProgram | ParsedCommandLine) => void;
/** @internal */
export function executeCommandLine(
    system: System,
    cb: ExecuteCommandLineCallbacks,
    commandLineArgs: readonly string[],
): void | SolutionBuilder<EmitAndSemanticDiagnosticsBuilderProgram> | WatchOfConfigFile<EmitAndSemanticDiagnosticsBuilderProgram> {
    if (isBuild(commandLineArgs)) {
        const { buildOptions, watchOptions, projects, errors } = parseBuildCommand(commandLineArgs.slice(1));
        if (buildOptions.generateCpuProfile && system.enableCPUProfiler) {
            system.enableCPUProfiler(buildOptions.generateCpuProfile, () =>
                performBuild(
                    system,
                    cb,
                    buildOptions,
                    watchOptions,
                    projects,
                    errors,
                ));
        }
        else {
            return performBuild(
                system,
                cb,
                buildOptions,
                watchOptions,
                projects,
                errors,
            );
        }
    }

    const commandLine = parseCommandLine(commandLineArgs, path => system.readFile(path));
    if (commandLine.options.generateCpuProfile && system.enableCPUProfiler) {
        system.enableCPUProfiler(commandLine.options.generateCpuProfile, () =>
            executeCommandLineWorker(
                system,
                cb,
                commandLine,
            ));
    }
    else {
        return executeCommandLineWorker(system, cb, commandLine);
    }
}

function reportWatchModeWithoutSysSupport(sys: System, reportDiagnostic: DiagnosticReporter) {
    if (!sys.watchFile || !sys.watchDirectory) {
        reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"));
        sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        return true;
    }
    return false;
}

// This could be inlined everywhere, but this is convenient for debugging and patching.
const defaultJSDocParsingMode = JSDocParsingMode.ParseForTypeErrors;

function performBuild(
    sys: System,
    cb: ExecuteCommandLineCallbacks,
    buildOptions: BuildOptions,
    watchOptions: WatchOptions | undefined,
    projects: string[],
    errors: Diagnostic[],
) {
    // Update to pretty if host supports it
    const reportDiagnostic = updateReportDiagnostic(
        sys,
        createDiagnosticReporter(sys),
        buildOptions,
    );

    if (buildOptions.locale) {
        validateLocaleAndSetLanguage(buildOptions.locale, sys, errors);
    }

    if (errors.length > 0) {
        errors.forEach(reportDiagnostic);
        return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    if (buildOptions.help) {
        printVersion(sys);
        printBuildHelp(sys, buildOpts);
        return sys.exit(ExitStatus.Success);
    }

    if (projects.length === 0) {
        printVersion(sys);
        printBuildHelp(sys, buildOpts);
        return sys.exit(ExitStatus.Success);
    }

    if (!sys.getModifiedTime || !sys.setModifiedTime || (buildOptions.clean && !sys.deleteFile)) {
        reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--build"));
        return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    if (buildOptions.watch) {
        if (reportWatchModeWithoutSysSupport(sys, reportDiagnostic)) return;
        const buildHost = createSolutionBuilderWithWatchHost(
            sys,
            /*createProgram*/ undefined,
            reportDiagnostic,
            createBuilderStatusReporter(sys, shouldBePretty(sys, buildOptions)),
            createWatchStatusReporter(sys, buildOptions),
        );
        buildHost.jsDocParsingMode = defaultJSDocParsingMode;
        const solutionPerformance = enableSolutionPerformance(sys, buildOptions);
        updateSolutionBuilderHost(sys, cb, buildHost, solutionPerformance);
        const onWatchStatusChange = buildHost.onWatchStatusChange;
        let reportBuildStatistics = false;
        buildHost.onWatchStatusChange = (d, newLine, options, errorCount) => {
            onWatchStatusChange?.(d, newLine, options, errorCount);
            if (
                reportBuildStatistics && (
                    d.code === Diagnostics.Found_0_errors_Watching_for_file_changes.code ||
                    d.code === Diagnostics.Found_1_error_Watching_for_file_changes.code
                )
            ) {
                reportSolutionBuilderTimes(builder, solutionPerformance);
            }
        };
        const builder = createSolutionBuilderWithWatch(buildHost, projects, buildOptions, watchOptions);
        builder.build();
        reportSolutionBuilderTimes(builder, solutionPerformance);
        reportBuildStatistics = true;
        return builder;
    }

    const buildHost = createSolutionBuilderHost(
        sys,
        /*createProgram*/ undefined,
        reportDiagnostic,
        createBuilderStatusReporter(sys, shouldBePretty(sys, buildOptions)),
        createReportErrorSummary(sys, buildOptions),
    );
    buildHost.jsDocParsingMode = defaultJSDocParsingMode;
    const solutionPerformance = enableSolutionPerformance(sys, buildOptions);
    updateSolutionBuilderHost(sys, cb, buildHost, solutionPerformance);
    const builder = createSolutionBuilder(buildHost, projects, buildOptions);
    const exitStatus = buildOptions.clean ? builder.clean() : builder.build();
    reportSolutionBuilderTimes(builder, solutionPerformance);
    dumpTracingLegend(); // Will no-op if there hasn't been any tracing
    return sys.exit(exitStatus);
}

function createReportErrorSummary(sys: System, options: CompilerOptions | BuildOptions): ReportEmitErrorSummary | undefined {
    return shouldBePretty(sys, options) ?
        (errorCount, filesInError) => sys.write(getErrorSummaryText(errorCount, filesInError, sys.newLine, sys)) :
        undefined;
}

function performCompilation(
    sys: System,
    cb: ExecuteCommandLineCallbacks,
    reportDiagnostic: DiagnosticReporter,
    config: ParsedCommandLine,
) {
    const { fileNames, options, projectReferences } = config;
    const host = createCompilerHostWorker(options, /*setParentNodes*/ undefined, sys);
    host.jsDocParsingMode = defaultJSDocParsingMode;
    const currentDirectory = host.getCurrentDirectory();
    const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
    changeCompilerHostLikeToUseCache(host, fileName => toPath(fileName, currentDirectory, getCanonicalFileName));
    enableStatisticsAndTracing(sys, options, /*isBuildMode*/ false);

    const programOptions: CreateProgramOptions = {
        rootNames: fileNames,
        options,
        projectReferences,
        host,
        configFileParsingDiagnostics: getConfigFileParsingDiagnostics(config),
    };
    const program = createProgram(programOptions);
    const exitStatus = emitFilesAndReportErrorsAndGetExitStatus(
        program,
        reportDiagnostic,
        s => sys.write(s + sys.newLine),
        createReportErrorSummary(sys, options),
    );
    reportStatistics(sys, program, /*solutionPerformance*/ undefined);
    cb(program);
    return sys.exit(exitStatus);
}

function performIncrementalCompilation(
    sys: System,
    cb: ExecuteCommandLineCallbacks,
    reportDiagnostic: DiagnosticReporter,
    config: ParsedCommandLine,
) {
    const { options, fileNames, projectReferences } = config;
    enableStatisticsAndTracing(sys, options, /*isBuildMode*/ false);
    const host = createIncrementalCompilerHost(options, sys);
    host.jsDocParsingMode = defaultJSDocParsingMode;
    const exitStatus = ts_performIncrementalCompilation({
        host,
        system: sys,
        rootNames: fileNames,
        options,
        configFileParsingDiagnostics: getConfigFileParsingDiagnostics(config),
        projectReferences,
        reportDiagnostic,
        reportErrorSummary: createReportErrorSummary(sys, options),
        afterProgramEmitAndDiagnostics: builderProgram => {
            reportStatistics(sys, builderProgram.getProgram(), /*solutionPerformance*/ undefined);
            cb(builderProgram);
        },
    });
    return sys.exit(exitStatus);
}

function updateSolutionBuilderHost(
    sys: System,
    cb: ExecuteCommandLineCallbacks,
    buildHost: SolutionBuilderHostBase<EmitAndSemanticDiagnosticsBuilderProgram>,
    solutionPerformance: SolutionPerformance | undefined,
) {
    updateCreateProgram(sys, buildHost, /*isBuildMode*/ true);
    buildHost.afterProgramEmitAndDiagnostics = program => {
        reportStatistics(sys, program.getProgram(), solutionPerformance);
        cb(program);
    };
}

function updateCreateProgram<T extends BuilderProgram>(sys: System, host: { createProgram: CreateProgram<T>; }, isBuildMode: boolean) {
    const compileUsingBuilder = host.createProgram;
    host.createProgram = (rootNames, options, host, oldProgram, configFileParsingDiagnostics, projectReferences) => {
        Debug.assert(rootNames !== undefined || (options === undefined && !!oldProgram));
        if (options !== undefined) {
            enableStatisticsAndTracing(sys, options, isBuildMode);
        }
        return compileUsingBuilder(rootNames, options, host, oldProgram, configFileParsingDiagnostics, projectReferences);
    };
}

function updateWatchCompilationHost(
    sys: System,
    cb: ExecuteCommandLineCallbacks,
    watchCompilerHost: WatchCompilerHost<EmitAndSemanticDiagnosticsBuilderProgram>,
) {
    watchCompilerHost.jsDocParsingMode = defaultJSDocParsingMode;
    updateCreateProgram(sys, watchCompilerHost, /*isBuildMode*/ false);
    const emitFilesUsingBuilder = watchCompilerHost.afterProgramCreate!; // TODO: GH#18217
    watchCompilerHost.afterProgramCreate = builderProgram => {
        emitFilesUsingBuilder(builderProgram);
        reportStatistics(sys, builderProgram.getProgram(), /*solutionPerformance*/ undefined);
        cb(builderProgram);
    };
}

function createWatchStatusReporter(sys: System, options: CompilerOptions | BuildOptions) {
    return ts_createWatchStatusReporter(sys, shouldBePretty(sys, options));
}

function createWatchOfConfigFile(
    system: System,
    cb: ExecuteCommandLineCallbacks,
    reportDiagnostic: DiagnosticReporter,
    configParseResult: ParsedCommandLine,
    optionsToExtend: CompilerOptions,
    watchOptionsToExtend: WatchOptions | undefined,
    extendedConfigCache: Map<string, ExtendedConfigCacheEntry>,
) {
    const watchCompilerHost = createWatchCompilerHostOfConfigFile({
        configFileName: configParseResult.options.configFilePath!,
        optionsToExtend,
        watchOptionsToExtend,
        system,
        reportDiagnostic,
        reportWatchStatus: createWatchStatusReporter(system, configParseResult.options),
    });
    updateWatchCompilationHost(system, cb, watchCompilerHost);
    watchCompilerHost.configFileParsingResult = configParseResult;
    watchCompilerHost.extendedConfigCache = extendedConfigCache;
    return createWatchProgram(watchCompilerHost);
}

function createWatchOfFilesAndCompilerOptions(
    system: System,
    cb: ExecuteCommandLineCallbacks,
    reportDiagnostic: DiagnosticReporter,
    rootFiles: string[],
    options: CompilerOptions,
    watchOptions: WatchOptions | undefined,
) {
    const watchCompilerHost = createWatchCompilerHostOfFilesAndCompilerOptions({
        rootFiles,
        options,
        watchOptions,
        system,
        reportDiagnostic,
        reportWatchStatus: createWatchStatusReporter(system, options),
    });
    updateWatchCompilationHost(system, cb, watchCompilerHost);
    return createWatchProgram(watchCompilerHost);
}

interface SolutionPerformance {
    addAggregateStatistic(s: Statistic): void;
    forEachAggregateStatistics(cb: (s: Statistic) => void): void;
    clear(): void;
}

function enableSolutionPerformance(system: System, options: BuildOptions) {
    if (system === sys && options.extendedDiagnostics) {
        performance.enable();
        return createSolutionPerfomrance();
    }
}

function createSolutionPerfomrance(): SolutionPerformance {
    let statistics: Map<string, Statistic> | undefined;
    return {
        addAggregateStatistic,
        forEachAggregateStatistics: forEachAggreateStatistics,
        clear,
    };

    function addAggregateStatistic(s: Statistic) {
        const existing = statistics?.get(s.name);
        if (existing) {
            if (existing.type === StatisticType.memory) existing.value = Math.max(existing.value, s.value);
            else existing.value += s.value;
        }
        else {
            (statistics ??= new Map()).set(s.name, s);
        }
    }

    function forEachAggreateStatistics(cb: (s: Statistic) => void) {
        statistics?.forEach(cb);
    }

    function clear() {
        statistics = undefined;
    }
}

function reportSolutionBuilderTimes(
    builder: SolutionBuilder<EmitAndSemanticDiagnosticsBuilderProgram>,
    solutionPerformance: SolutionPerformance | undefined,
) {
    if (!solutionPerformance) return;

    if (!performance.isEnabled()) {
        sys.write(Diagnostics.Performance_timings_for_diagnostics_or_extendedDiagnostics_are_not_available_in_this_session_A_native_implementation_of_the_Web_Performance_API_could_not_be_found.message + "\n");
        return;
    }

    const statistics: Statistic[] = [];
    statistics.push(
        { name: "Projects in scope", value: getBuildOrderFromAnyBuildOrder(builder.getBuildOrder()).length, type: StatisticType.count },
    );
    reportSolutionBuilderCountStatistic("SolutionBuilder::Projects built");
    reportSolutionBuilderCountStatistic("SolutionBuilder::Timestamps only updates");
    reportSolutionBuilderCountStatistic("SolutionBuilder::Bundles updated");
    solutionPerformance.forEachAggregateStatistics(s => {
        s.name = `Aggregate ${s.name}`;
        statistics.push(s);
    });
    performance.forEachMeasure((name, duration) => {
        if (isSolutionMarkOrMeasure(name)) statistics.push({ name: `${getNameFromSolutionBuilderMarkOrMeasure(name)} time`, value: duration, type: StatisticType.time });
    });
    performance.disable();
    performance.enable();
    solutionPerformance.clear();

    reportAllStatistics(sys, statistics);

    function reportSolutionBuilderCountStatistic(name: string) {
        const value = performance.getCount(name);
        if (value) {
            statistics.push({ name: getNameFromSolutionBuilderMarkOrMeasure(name), value, type: StatisticType.count });
        }
    }

    function getNameFromSolutionBuilderMarkOrMeasure(name: string) {
        return name.replace("SolutionBuilder::", "");
    }
}

function canReportDiagnostics(system: System, compilerOptions: CompilerOptions) {
    return system === sys && (compilerOptions.diagnostics || compilerOptions.extendedDiagnostics);
}

function canTrace(system: System, compilerOptions: CompilerOptions) {
    return system === sys && compilerOptions.generateTrace;
}

function enableStatisticsAndTracing(system: System, compilerOptions: CompilerOptions, isBuildMode: boolean) {
    if (canReportDiagnostics(system, compilerOptions)) {
        performance.enable(system);
    }

    if (canTrace(system, compilerOptions)) {
        startTracing(isBuildMode ? "build" : "project", compilerOptions.generateTrace!, compilerOptions.configFilePath);
    }
}

function isSolutionMarkOrMeasure(name: string) {
    return startsWith(name, "SolutionBuilder::");
}

function reportStatistics(sys: System, program: Program, solutionPerformance: SolutionPerformance | undefined) {
    const compilerOptions = program.getCompilerOptions();

    if (canTrace(sys, compilerOptions)) {
        tracing?.stopTracing();
    }

    let statistics: Statistic[];
    if (canReportDiagnostics(sys, compilerOptions)) {
        statistics = [];
        const memoryUsed = sys.getMemoryUsage ? sys.getMemoryUsage() : -1;
        reportCountStatistic("Files", program.getSourceFiles().length);

        const lineCounts = countLines(program);
        if (compilerOptions.extendedDiagnostics) {
            for (const [key, value] of lineCounts.entries()) {
                reportCountStatistic("Lines of " + key, value);
            }
        }
        else {
            reportCountStatistic("Lines", reduceLeftIterator(lineCounts.values(), (sum, count) => sum + count, 0));
        }

        reportCountStatistic("Identifiers", program.getIdentifierCount());
        reportCountStatistic("Symbols", program.getSymbolCount());
        reportCountStatistic("Types", program.getTypeCount());
        reportCountStatistic("Instantiations", program.getInstantiationCount());
        if (memoryUsed >= 0) {
            reportStatisticalValue({ name: "Memory used", value: memoryUsed, type: StatisticType.memory }, /*aggregate*/ true);
        }

        const isPerformanceEnabled = performance.isEnabled();
        const programTime = isPerformanceEnabled ? performance.getDuration("Program") : 0;
        const bindTime = isPerformanceEnabled ? performance.getDuration("Bind") : 0;
        const checkTime = isPerformanceEnabled ? performance.getDuration("Check") : 0;
        const emitTime = isPerformanceEnabled ? performance.getDuration("Emit") : 0;
        if (compilerOptions.extendedDiagnostics) {
            const caches = program.getRelationCacheSizes();
            reportCountStatistic("Assignability cache size", caches.assignable);
            reportCountStatistic("Identity cache size", caches.identity);
            reportCountStatistic("Subtype cache size", caches.subtype);
            reportCountStatistic("Strict subtype cache size", caches.strictSubtype);
            if (isPerformanceEnabled) {
                performance.forEachMeasure((name, duration) => {
                    if (!isSolutionMarkOrMeasure(name)) reportTimeStatistic(`${name} time`, duration, /*aggregate*/ true);
                });
            }
        }
        else if (isPerformanceEnabled) {
            // Individual component times.
            // Note: To match the behavior of previous versions of the compiler, the reported parse time includes
            // I/O read time and processing time for triple-slash references and module imports, and the reported
            // emit time includes I/O write time. We preserve this behavior so we can accurately compare times.
            reportTimeStatistic("I/O read", performance.getDuration("I/O Read"), /*aggregate*/ true);
            reportTimeStatistic("I/O write", performance.getDuration("I/O Write"), /*aggregate*/ true);
            reportTimeStatistic("Parse time", programTime, /*aggregate*/ true);
            reportTimeStatistic("Bind time", bindTime, /*aggregate*/ true);
            reportTimeStatistic("Check time", checkTime, /*aggregate*/ true);
            reportTimeStatistic("Emit time", emitTime, /*aggregate*/ true);
        }
        if (isPerformanceEnabled) {
            reportTimeStatistic("Total time", programTime + bindTime + checkTime + emitTime, /*aggregate*/ false);
        }
        reportAllStatistics(sys, statistics);
        if (!isPerformanceEnabled) {
            sys.write(Diagnostics.Performance_timings_for_diagnostics_or_extendedDiagnostics_are_not_available_in_this_session_A_native_implementation_of_the_Web_Performance_API_could_not_be_found.message + "\n");
        }
        else {
            if (solutionPerformance) {
                // Clear selected marks and measures
                performance.forEachMeasure(name => {
                    if (!isSolutionMarkOrMeasure(name)) performance.clearMeasures(name);
                });
                performance.forEachMark(name => {
                    if (!isSolutionMarkOrMeasure(name)) performance.clearMarks(name);
                });
            }
            else {
                performance.disable();
            }
        }
    }

    function reportStatisticalValue(s: Statistic, aggregate: boolean) {
        statistics.push(s);
        if (aggregate) solutionPerformance?.addAggregateStatistic(s);
    }

    function reportCountStatistic(name: string, count: number) {
        reportStatisticalValue({ name, value: count, type: StatisticType.count }, /*aggregate*/ true);
    }

    function reportTimeStatistic(name: string, time: number, aggregate: boolean) {
        reportStatisticalValue({ name, value: time, type: StatisticType.time }, aggregate);
    }
}

function reportAllStatistics(sys: System, statistics: Statistic[]) {
    let nameSize = 0;
    let valueSize = 0;
    for (const s of statistics) {
        if (s.name.length > nameSize) {
            nameSize = s.name.length;
        }

        const value = statisticValue(s);
        if (value.length > valueSize) {
            valueSize = value.length;
        }
    }

    for (const s of statistics) {
        sys.write(`${s.name}:`.padEnd(nameSize + 2) + statisticValue(s).toString().padStart(valueSize) + sys.newLine);
    }
}

function statisticValue(s: Statistic) {
    switch (s.type) {
        case StatisticType.count:
            return "" + s.value;
        case StatisticType.time:
            return (s.value / 1000).toFixed(2) + "s";
        case StatisticType.memory:
            return Math.round(s.value / 1000) + "K";
        default:
            Debug.assertNever(s.type);
    }
}

function writeConfigFile(
    sys: System,
    reportDiagnostic: DiagnosticReporter,
    options: CompilerOptions,
    fileNames: string[],
) {
    const currentDirectory = sys.getCurrentDirectory();
    const file = normalizePath(combinePaths(currentDirectory, "tsconfig.json"));
    if (sys.fileExists(file)) {
        reportDiagnostic(createCompilerDiagnostic(Diagnostics.A_tsconfig_json_file_is_already_defined_at_Colon_0, file));
    }
    else {
        sys.writeFile(file, generateTSConfig(options, fileNames, sys.newLine));
        const output: string[] = [sys.newLine, ...getHeader(sys, "Created a new tsconfig.json with:")];
        output.push(getCompilerOptionsDiffValue(options, sys.newLine) + sys.newLine + sys.newLine);
        output.push(`You can learn more at https://aka.ms/tsconfig` + sys.newLine);
        for (const line of output) {
            sys.write(line);
        }
    }

    return;
}
