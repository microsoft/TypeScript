namespace ts {
interface Statistic {
    name: string;
    value: number;
    type: StatisticType;
}

export enum StatisticType {
    time,
    count,
    memory,
}

function countLines(program: ts.Program): ts.Map<number> {
    const counts = getCountsMap();
    ts.forEach(program.getSourceFiles(), file => {
        const key = getCountKey(program, file);
        const lineCount = ts.getLineStarts(file).length;
        counts.set(key, counts.get(key)! + lineCount);
    });
    return counts;
}

function getCountsMap() {
    const counts = new ts.Map<string, number>();
    counts.set("Library", 0);
    counts.set("Definitions", 0);
    counts.set("TypeScript", 0);
    counts.set("JavaScript", 0);
    counts.set("JSON", 0);
    counts.set("Other", 0);
    return counts;
}

function getCountKey(program: ts.Program, file: ts.SourceFile) {
    if (program.isSourceFileDefaultLibrary(file)) {
        return "Library";
    }
    else if (file.isDeclarationFile) {
        return "Definitions";
    }

    const path = file.path;
    if (ts.fileExtensionIsOneOf(path, ts.supportedTSExtensionsFlat)) {
        return "TypeScript";
    }
    else if (ts.fileExtensionIsOneOf(path, ts.supportedJSExtensionsFlat)) {
        return "JavaScript";
    }
    else if (ts.fileExtensionIs(path, ts.Extension.Json)) {
        return "JSON";
    }
    else {
        return "Other";
    }
}

function updateReportDiagnostic(
    sys: ts.System,
    existing: ts.DiagnosticReporter,
    options: ts.CompilerOptions | ts.BuildOptions
): ts.DiagnosticReporter {
    return shouldBePretty(sys, options) ?
        ts.createDiagnosticReporter(sys, /*pretty*/ true) :
        existing;
}

function defaultIsPretty(sys: ts.System) {
    return !!sys.writeOutputIsTTY && sys.writeOutputIsTTY() && !sys.getEnvironmentVariable("NO_COLOR");
}

function shouldBePretty(sys: ts.System, options: ts.CompilerOptions | ts.BuildOptions) {
    if (!options || typeof options.pretty === "undefined") {
        return defaultIsPretty(sys);
    }
    return options.pretty;
}

function getOptionsForHelp(commandLine: ts.ParsedCommandLine) {
    // Sort our options by their names, (e.g. "--noImplicitAny" comes before "--watch")
    return !!commandLine.options.all ?
        ts.sort(ts.optionDeclarations, (a, b) => ts.compareStringsCaseInsensitive(a.name, b.name)) :
        ts.filter(ts.optionDeclarations.slice(), v => !!v.showInSimplifiedHelpView);
}

function printVersion(sys: ts.System) {
    sys.write(ts.getDiagnosticText(ts.Diagnostics.Version_0, ts.version) + sys.newLine);
}

function createColors(sys: ts.System) {
    const showColors = defaultIsPretty(sys);
    if (!showColors) {
        return {
            bold: (str: string) => str,
            blue: (str: string) => str,
            blueBackground: (str: string) => str,
            brightWhite: (str: string) => str
        };
    }

    function bold(str: string) {
        return `\x1b[1m${str}\x1b[22m`;
    }

    const isWindows = sys.getEnvironmentVariable("OS") && ts.stringContains(sys.getEnvironmentVariable("OS").toLowerCase(), "windows");
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
        blueBackground
    };
}

function getDisplayNameTextOfOption(option: ts.CommandLineOption) {
    return `--${option.name}${option.shortName ? `, -${option.shortName}` : ""}`;
}

function generateOptionOutput(sys: ts.System, option: ts.CommandLineOption, rightAlignOfLeft: number, leftAlignOfRight: number) {
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
    const defaultValueDescription =
        typeof option.defaultValueDescription === "object"
            ? ts.getDiagnosticText(option.defaultValueDescription)
            : formatDefaultValue(
                  option.defaultValueDescription,
                  option.type === "list" ? option.element.type : option.type
              );
    const terminalWidth = sys.getWidthOfTerminal?.() ?? 0;

    // Note: child_process might return `terminalWidth` as undefined.
    if (terminalWidth >= 80) {
        let description = "";
        if (option.description) {
            description = ts.getDiagnosticText(option.description);
        }
        text.push(...getPrettyOutput(name, description, rightAlignOfLeft, leftAlignOfRight, terminalWidth, /*colorLeft*/ true), sys.newLine);
        if (showAdditionalInfoOutput(valueCandidates, option)) {
            if (valueCandidates) {
                text.push(...getPrettyOutput(valueCandidates.valueType, valueCandidates.possibleValues, rightAlignOfLeft, leftAlignOfRight, terminalWidth, /*colorLeft*/ false), sys.newLine);
            }
            if (defaultValueDescription) {
                text.push(...getPrettyOutput(ts.getDiagnosticText(ts.Diagnostics.default_Colon), defaultValueDescription, rightAlignOfLeft, leftAlignOfRight, terminalWidth, /*colorLeft*/ false), sys.newLine);
            }
        }
        text.push(sys.newLine);
    }
    else {
        text.push(colors.blue(name), sys.newLine);
        if (option.description) {
            const description = ts.getDiagnosticText(option.description);
            text.push(description);
        }
        text.push(sys.newLine);
        if (showAdditionalInfoOutput(valueCandidates, option)) {
            if (valueCandidates) {
                text.push(`${valueCandidates.valueType} ${valueCandidates.possibleValues}`);
            }
            if (defaultValueDescription) {
                if (valueCandidates) text.push(sys.newLine);
                const diagType = ts.getDiagnosticText(ts.Diagnostics.default_Colon);
                text.push(`${diagType} ${defaultValueDescription}`);
            }

            text.push(sys.newLine);
        }
        text.push(sys.newLine);
    }
    return text;

    function formatDefaultValue(
        defaultValue: ts.CommandLineOption["defaultValueDescription"],
        type: ts.CommandLineOption["type"]
    ) {
        return defaultValue !== undefined && typeof type === "object"
            // e.g. ScriptTarget.ES2015 -> "es6/es2015"
            ? ts.arrayFrom(type.entries())
                  .filter(([, value]) => value === defaultValue)
                  .map(([name]) => name)
                  .join("/")
            : String(defaultValue);
    }

    function showAdditionalInfoOutput(valueCandidates: ValueCandidate | undefined, option: ts.CommandLineOption): boolean {
        const ignoreValues = ["string"];
        const ignoredDescriptions = [undefined, "false", "n/a"];
        const defaultValueDescription = option.defaultValueDescription;
        if (option.category === ts.Diagnostics.Command_line_Options) return false;

        if (ts.contains(ignoreValues, valueCandidates?.possibleValues) && ts.contains(ignoredDescriptions, defaultValueDescription)) {
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
                curLeft = ts.padLeft(left, rightAlignOfLeft);
                curLeft = ts.padRight(curLeft, leftAlignOfRight);
                curLeft = colorLeft ? colors.blue(curLeft) : curLeft;
            }
            else {
                curLeft = ts.padLeft("", leftAlignOfRight);
            }

            const curRight = remainRight.substr(0, rightCharacterNumber);
            remainRight = remainRight.slice(rightCharacterNumber);
            res.push(`${curLeft}${curRight}`);
            isFirstLine = false;
        }
        return res;
    }

    function getValueCandidate(option: ts.CommandLineOption): ValueCandidate | undefined {
        // option.type might be "string" | "number" | "boolean" | "object" | "list" | ESMap<string, number | string>
        // string -- any of: string
        // number -- any of: number
        // boolean -- any of: boolean
        // object -- null
        // list -- one or more: , content depends on `option.element.type`, the same as others
        // ESMap<string, number | string> -- any of: key1, key2, ....
        if (option.type === "object") {
            return undefined;
        }

        return {
            valueType: getValueType(option),
            possibleValues: getPossibleValues(option)
        };

        function getValueType(option: ts.CommandLineOption) {
            switch (option.type) {
                case "string":
                case "number":
                case "boolean":
                    return ts.getDiagnosticText(ts.Diagnostics.type_Colon);
                case "list":
                    return ts.getDiagnosticText(ts.Diagnostics.one_or_more_Colon);
                default:
                    return ts.getDiagnosticText(ts.Diagnostics.one_of_Colon);
            }
        }

        function getPossibleValues(option: ts.CommandLineOption) {
            let possibleValues: string;
            switch (option.type) {
                case "string":
                case "number":
                case "boolean":
                    possibleValues = option.type;
                    break;
                case "list":
                    // TODO: check infinite loop
                    possibleValues = getPossibleValues(option.element);
                    break;
                case "object":
                    possibleValues = "";
                    break;
                default:
                    // ESMap<string, number | string>
                    // Group synonyms: es6/es2015
                    const inverted: { [value: string]: string[] } = {};
                    option.type.forEach((value, name) => {
                        (inverted[value] ||= []).push(name);
                    });
                    return ts.getEntries(inverted)
                        .map(([, synonyms]) => synonyms.join("/"))
                        .join(", ");
            }
            return possibleValues;
        }
    }
}

function generateGroupOptionOutput(sys: ts.System, optionsList: readonly ts.CommandLineOption[]) {
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

function generateSectionOptionsOutput(sys: ts.System, sectionName: string, options: readonly ts.CommandLineOption[], subCategory: boolean, beforeOptionsDescription?: string, afterOptionsDescription?: string) {
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
    const categoryMap = new ts.Map<string, ts.CommandLineOption[]>();
    for (const option of options) {
        if (!option.category) {
            continue;
        }
        const curCategory = ts.getDiagnosticText(option.category);
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

function printEasyHelp(sys: ts.System, simpleOptions: readonly ts.CommandLineOption[]) {
    const colors = createColors(sys);
    let output: string[] = [...getHeader(sys,`${ts.getDiagnosticText(ts.Diagnostics.tsc_Colon_The_TypeScript_Compiler)} - ${ts.getDiagnosticText(ts.Diagnostics.Version_0, ts.version)}`)];
    output.push(colors.bold(ts.getDiagnosticText(ts.Diagnostics.COMMON_COMMANDS)) + sys.newLine + sys.newLine);

    example("tsc", ts.Diagnostics.Compiles_the_current_project_tsconfig_json_in_the_working_directory);
    example("tsc app.ts util.ts", ts.Diagnostics.Ignoring_tsconfig_json_compiles_the_specified_files_with_default_compiler_options);
    example("tsc -b", ts.Diagnostics.Build_a_composite_project_in_the_working_directory);
    example("tsc --init", ts.Diagnostics.Creates_a_tsconfig_json_with_the_recommended_settings_in_the_working_directory);
    example("tsc -p ./path/to/tsconfig.json", ts.Diagnostics.Compiles_the_TypeScript_project_located_at_the_specified_path);
    example("tsc --help --all", ts.Diagnostics.An_expanded_version_of_this_information_showing_all_possible_compiler_options);
    example(["tsc --noEmit", "tsc --target esnext"], ts.Diagnostics.Compiles_the_current_project_with_additional_settings);

    const cliCommands = simpleOptions.filter(opt => opt.isCommandLineOnly || opt.category === ts.Diagnostics.Command_line_Options);
    const configOpts = simpleOptions.filter(opt => !ts.contains(cliCommands, opt));

    output = [
        ...output,
        ...generateSectionOptionsOutput(sys, ts.getDiagnosticText(ts.Diagnostics.COMMAND_LINE_FLAGS), cliCommands, /*subCategory*/ false, /* beforeOptionsDescription */ undefined, /* afterOptionsDescription*/ undefined),
        ...generateSectionOptionsOutput(sys, ts.getDiagnosticText(ts.Diagnostics.COMMON_COMPILER_OPTIONS), configOpts, /*subCategory*/ false, /* beforeOptionsDescription */ undefined, ts.formatMessage(/*_dummy*/ undefined, ts.Diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0, "https://aka.ms/tsc"))
    ];

    for (const line of output) {
        sys.write(line);
    }

    function example(ex: string | string[], desc: ts.DiagnosticMessage) {
        const examples = typeof ex === "string" ? [ex] : ex;
        for (const example of examples) {
            output.push("  " + colors.blue(example) + sys.newLine);
        }
        output.push("  " + ts.getDiagnosticText(desc) + sys.newLine + sys.newLine);
    }
}

function printAllHelp(sys: ts.System, compilerOptions: readonly ts.CommandLineOption[], buildOptions: readonly ts.CommandLineOption[], watchOptions: readonly ts.CommandLineOption[]) {
    let output: string[] = [...getHeader(sys,`${ts.getDiagnosticText(ts.Diagnostics.tsc_Colon_The_TypeScript_Compiler)} - ${ts.getDiagnosticText(ts.Diagnostics.Version_0, ts.version)}`)];
    output = [...output, ...generateSectionOptionsOutput(sys, ts.getDiagnosticText(ts.Diagnostics.ALL_COMPILER_OPTIONS), compilerOptions, /*subCategory*/ true, /* beforeOptionsDescription */ undefined, ts.formatMessage(/*_dummy*/ undefined, ts.Diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0, "https://aka.ms/tsc"))];
    output = [...output, ...generateSectionOptionsOutput(sys, ts.getDiagnosticText(ts.Diagnostics.WATCH_OPTIONS), watchOptions, /*subCategory*/ false, ts.getDiagnosticText(ts.Diagnostics.Including_watch_w_will_start_watching_the_current_project_for_the_file_changes_Once_set_you_can_config_watch_mode_with_Colon))];
    output = [...output, ...generateSectionOptionsOutput(sys, ts.getDiagnosticText(ts.Diagnostics.BUILD_OPTIONS), buildOptions, /*subCategory*/ false, ts.formatMessage(/*_dummy*/ undefined, ts.Diagnostics.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0, "https://aka.ms/tsc-composite-builds"))];
    for (const line of output) {
        sys.write(line);
    }
}

function printBuildHelp(sys: ts.System, buildOptions: readonly ts.CommandLineOption[]) {
    let output: string[] = [...getHeader(sys,`${ts.getDiagnosticText(ts.Diagnostics.tsc_Colon_The_TypeScript_Compiler)} - ${ts.getDiagnosticText(ts.Diagnostics.Version_0, ts.version)}`)];
    output = [...output, ...generateSectionOptionsOutput(sys, ts.getDiagnosticText(ts.Diagnostics.BUILD_OPTIONS), buildOptions, /*subCategory*/ false, ts.formatMessage(/*_dummy*/ undefined, ts.Diagnostics.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0, "https://aka.ms/tsc-composite-builds"))];
    for (const line of output) {
        sys.write(line);
    }
}

function getHeader(sys: ts.System, message: string) {
    const colors = createColors(sys);
    const header: string[] = [];
    const terminalWidth = sys.getWidthOfTerminal?.() ?? 0;
    const tsIconLength = 5;

    const tsIconFirstLine = colors.blueBackground(ts.padLeft("", tsIconLength));
    const tsIconSecondLine = colors.blueBackground(colors.brightWhite(ts.padLeft("TS ", tsIconLength)));
    // If we have enough space, print TS icon.
    if (terminalWidth >= message.length + tsIconLength) {
        // right align of the icon is 120 at most.
        const rightAlign = terminalWidth > 120 ? 120 : terminalWidth;
        const leftAlign = rightAlign - tsIconLength;
        header.push(ts.padRight(message, leftAlign) + tsIconFirstLine + sys.newLine);
        header.push(ts.padLeft("", leftAlign) + tsIconSecondLine + sys.newLine);
    }
    else {
        header.push(message + sys.newLine);
        header.push(sys.newLine);
    }
    return header;
}

function printHelp(sys: ts.System, commandLine: ts.ParsedCommandLine) {
    if (!commandLine.options.all) {
        printEasyHelp(sys, getOptionsForHelp(commandLine));
    }
    else {
        printAllHelp(sys, getOptionsForHelp(commandLine), ts.optionsForBuild, ts.optionsForWatch);
    }
}

function executeCommandLineWorker(
    sys: ts.System,
    cb: ExecuteCommandLineCallbacks,
    commandLine: ts.ParsedCommandLine,
) {
    let reportDiagnostic = ts.createDiagnosticReporter(sys);
    if (commandLine.options.build) {
        reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.Option_build_must_be_the_first_command_line_argument));
        return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    // Configuration file name (if any)
    let configFileName: string | undefined;
    if (commandLine.options.locale) {
        ts.validateLocaleAndSetLanguage(commandLine.options.locale, sys, commandLine.errors);
    }

    // If there are any errors due to command line parsing and/or
    // setting up localization, report them and quit.
    if (commandLine.errors.length > 0) {
        commandLine.errors.forEach(reportDiagnostic);
        return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    if (commandLine.options.init) {
        writeConfigFile(sys, reportDiagnostic, commandLine.options, commandLine.fileNames);
        return sys.exit(ts.ExitStatus.Success);
    }

    if (commandLine.options.version) {
        printVersion(sys);
        return sys.exit(ts.ExitStatus.Success);
    }

    if (commandLine.options.help || commandLine.options.all) {
        printHelp(sys, commandLine);
        return sys.exit(ts.ExitStatus.Success);
    }

    if (commandLine.options.watch && commandLine.options.listFilesOnly) {
        reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.Options_0_and_1_cannot_be_combined, "watch", "listFilesOnly"));
        return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    if (commandLine.options.project) {
        if (commandLine.fileNames.length !== 0) {
            reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line));
            return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        const fileOrDirectory = ts.normalizePath(commandLine.options.project);
        if (!fileOrDirectory /* current directory "." */ || sys.directoryExists(fileOrDirectory)) {
            configFileName = ts.combinePaths(fileOrDirectory, "tsconfig.json");
            if (!sys.fileExists(configFileName)) {
                reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0, commandLine.options.project));
                return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
        }
        else {
            configFileName = fileOrDirectory;
            if (!sys.fileExists(configFileName)) {
                reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.The_specified_path_does_not_exist_Colon_0, commandLine.options.project));
                return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
        }
    }
    else if (commandLine.fileNames.length === 0) {
        const searchPath = ts.normalizePath(sys.getCurrentDirectory());
        configFileName = ts.findConfigFile(searchPath, fileName => sys.fileExists(fileName));
    }

    if (commandLine.fileNames.length === 0 && !configFileName) {
        if (commandLine.options.showConfig) {
            reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0, ts.normalizePath(sys.getCurrentDirectory())));
        }
        else {
            printVersion(sys);
            printHelp(sys, commandLine);
        }
        return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    const currentDirectory = sys.getCurrentDirectory();
    const commandLineOptions = ts.convertToOptionsWithAbsolutePaths(
        commandLine.options,
        fileName => ts.getNormalizedAbsolutePath(fileName, currentDirectory)
    );
    if (configFileName) {
        const extendedConfigCache = new ts.Map<string, ts.ExtendedConfigCacheEntry>();
        const configParseResult = ts.parseConfigFileWithSystem(configFileName, commandLineOptions, extendedConfigCache, commandLine.watchOptions, sys, reportDiagnostic)!; // TODO: GH#18217
        if (commandLineOptions.showConfig) {
            if (configParseResult.errors.length !== 0) {
                reportDiagnostic = updateReportDiagnostic(
                    sys,
                    reportDiagnostic,
                    configParseResult.options
                );
                configParseResult.errors.forEach(reportDiagnostic);
                return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
            // eslint-disable-next-line no-null/no-null
            sys.write(JSON.stringify(ts.convertToTSConfig(configParseResult, configFileName, sys), null, 4) + sys.newLine);
            return sys.exit(ts.ExitStatus.Success);
        }
        reportDiagnostic = updateReportDiagnostic(
            sys,
            reportDiagnostic,
            configParseResult.options
        );
        if (ts.isWatchSet(configParseResult.options)) {
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
        else if (ts.isIncrementalCompilation(configParseResult.options)) {
            performIncrementalCompilation(
                sys,
                cb,
                reportDiagnostic,
                configParseResult
            );
        }
        else {
            performCompilation(
                sys,
                cb,
                reportDiagnostic,
                configParseResult
            );
        }
    }
    else {
        if (commandLineOptions.showConfig) {
            // eslint-disable-next-line no-null/no-null
            sys.write(JSON.stringify(ts.convertToTSConfig(commandLine, ts.combinePaths(currentDirectory, "tsconfig.json"), sys), null, 4) + sys.newLine);
            return sys.exit(ts.ExitStatus.Success);
        }
        reportDiagnostic = updateReportDiagnostic(
            sys,
            reportDiagnostic,
            commandLineOptions
        );
        if (ts.isWatchSet(commandLineOptions)) {
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
        else if (ts.isIncrementalCompilation(commandLineOptions)) {
            performIncrementalCompilation(
                sys,
                cb,
                reportDiagnostic,
                { ...commandLine, options: commandLineOptions }
            );
        }
        else {
            performCompilation(
                sys,
                cb,
                reportDiagnostic,
                { ...commandLine, options: commandLineOptions }
            );
        }
    }
}

export function isBuild(commandLineArgs: readonly string[]) {
    if (commandLineArgs.length > 0 && commandLineArgs[0].charCodeAt(0) === ts.CharacterCodes.minus) {
        const firstOption = commandLineArgs[0].slice(commandLineArgs[0].charCodeAt(1) === ts.CharacterCodes.minus ? 2 : 1).toLowerCase();
        return firstOption === "build" || firstOption === "b";
    }
    return false;
}

export type ExecuteCommandLineCallbacks = (program: ts.Program | ts.BuilderProgram | ts.ParsedCommandLine) => void;
export function executeCommandLine(
    system: ts.System,
    cb: ExecuteCommandLineCallbacks,
    commandLineArgs: readonly string[],
) {
    if (isBuild(commandLineArgs)) {
        const { buildOptions, watchOptions, projects, errors } = ts.parseBuildCommand(commandLineArgs.slice(1));
        if (buildOptions.generateCpuProfile && system.enableCPUProfiler) {
            system.enableCPUProfiler(buildOptions.generateCpuProfile, () => performBuild(
                system,
                cb,
                buildOptions,
                watchOptions,
                projects,
                errors
            ));
        }
        else {
            return performBuild(
                system,
                cb,
                buildOptions,
                watchOptions,
                projects,
                errors
            );
        }
    }

    const commandLine = ts.parseCommandLine(commandLineArgs, path => system.readFile(path));
    if (commandLine.options.generateCpuProfile && system.enableCPUProfiler) {
        system.enableCPUProfiler(commandLine.options.generateCpuProfile, () => executeCommandLineWorker(
            system,
            cb,
            commandLine,
        ));
    }
    else {
        return executeCommandLineWorker(system, cb, commandLine);
    }
}

function reportWatchModeWithoutSysSupport(sys: ts.System, reportDiagnostic: ts.DiagnosticReporter) {
    if (!sys.watchFile || !sys.watchDirectory) {
        reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"));
        sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
        return true;
    }
    return false;
}

function performBuild(
    sys: ts.System,
    cb: ExecuteCommandLineCallbacks,
    buildOptions: ts.BuildOptions,
    watchOptions: ts.WatchOptions | undefined,
    projects: string[],
    errors: ts.Diagnostic[]
) {
    // Update to pretty if host supports it
    const reportDiagnostic = updateReportDiagnostic(
        sys,
        ts.createDiagnosticReporter(sys),
        buildOptions
    );

    if (buildOptions.locale) {
        ts.validateLocaleAndSetLanguage(buildOptions.locale, sys, errors);
    }

    if (errors.length > 0) {
        errors.forEach(reportDiagnostic);
        return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    if (buildOptions.help) {
        printVersion(sys);
        printBuildHelp(sys, ts.buildOpts);
        return sys.exit(ts.ExitStatus.Success);
    }

    if (projects.length === 0) {
        printVersion(sys);
        printBuildHelp(sys, ts.buildOpts);
        return sys.exit(ts.ExitStatus.Success);
    }

    if (!sys.getModifiedTime || !sys.setModifiedTime || (buildOptions.clean && !sys.deleteFile)) {
        reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.The_current_host_does_not_support_the_0_option, "--build"));
        return sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    if (buildOptions.watch) {
        if (reportWatchModeWithoutSysSupport(sys, reportDiagnostic)) return;
        const buildHost = ts.createSolutionBuilderWithWatchHost(
            sys,
            /*createProgram*/ undefined,
            reportDiagnostic,
            ts.createBuilderStatusReporter(sys, shouldBePretty(sys, buildOptions)),
            createWatchStatusReporter(sys, buildOptions)
        );
        const solutionPerformance = enableSolutionPerformance(sys, buildOptions);
        updateSolutionBuilderHost(sys, cb, buildHost, solutionPerformance);
        const onWatchStatusChange = buildHost.onWatchStatusChange;
        let reportBuildStatistics = false;
        buildHost.onWatchStatusChange = (d, newLine, options, errorCount) => {
            onWatchStatusChange?.(d, newLine, options, errorCount);
            if (reportBuildStatistics && (
                d.code === ts.Diagnostics.Found_0_errors_Watching_for_file_changes.code ||
                d.code === ts.Diagnostics.Found_1_error_Watching_for_file_changes.code
            )) {
                reportSolutionBuilderTimes(builder, solutionPerformance);
            }
        };
        const builder = ts.createSolutionBuilderWithWatch(buildHost, projects, buildOptions, watchOptions);
        builder.build();
        reportSolutionBuilderTimes(builder, solutionPerformance);
        reportBuildStatistics = true;
        return builder;
    }

    const buildHost = ts.createSolutionBuilderHost(
        sys,
        /*createProgram*/ undefined,
        reportDiagnostic,
        ts.createBuilderStatusReporter(sys, shouldBePretty(sys, buildOptions)),
        createReportErrorSummary(sys, buildOptions)
    );
    const solutionPerformance = enableSolutionPerformance(sys, buildOptions);
    updateSolutionBuilderHost(sys, cb, buildHost, solutionPerformance);
    const builder = ts.createSolutionBuilder(buildHost, projects, buildOptions);
    const exitStatus = buildOptions.clean ? builder.clean() : builder.build();
    reportSolutionBuilderTimes(builder, solutionPerformance);
    ts.dumpTracingLegend(); // Will no-op if there hasn't been any tracing
    return sys.exit(exitStatus);
}

function createReportErrorSummary(sys: ts.System, options: ts.CompilerOptions | ts.BuildOptions): ts.ReportEmitErrorSummary | undefined {
    return shouldBePretty(sys, options) ?
        (errorCount, filesInError) => sys.write(ts.getErrorSummaryText(errorCount, filesInError, sys.newLine, sys)) :
        undefined;
}

function performCompilation(
    sys: ts.System,
    cb: ExecuteCommandLineCallbacks,
    reportDiagnostic: ts.DiagnosticReporter,
    config: ts.ParsedCommandLine
) {
    const { fileNames, options, projectReferences } = config;
    const host = ts.createCompilerHostWorker(options, /*setParentPos*/ undefined, sys);
    const currentDirectory = host.getCurrentDirectory();
    const getCanonicalFileName = ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames());
    ts.changeCompilerHostLikeToUseCache(host, fileName => ts.toPath(fileName, currentDirectory, getCanonicalFileName));
    enableStatisticsAndTracing(sys, options, /*isBuildMode*/ false);

    const programOptions: ts.CreateProgramOptions = {
        rootNames: fileNames,
        options,
        projectReferences,
        host,
        configFileParsingDiagnostics: ts.getConfigFileParsingDiagnostics(config)
    };
    const program = ts.createProgram(programOptions);
    const exitStatus = ts.emitFilesAndReportErrorsAndGetExitStatus(
        program,
        reportDiagnostic,
        s => sys.write(s + sys.newLine),
        createReportErrorSummary(sys, options)
    );
    reportStatistics(sys, program, /*builder*/ undefined);
    cb(program);
    return sys.exit(exitStatus);
}

function performIncrementalCompilation(
    sys: ts.System,
    cb: ExecuteCommandLineCallbacks,
    reportDiagnostic: ts.DiagnosticReporter,
    config: ts.ParsedCommandLine
) {
    const { options, fileNames, projectReferences } = config;
    enableStatisticsAndTracing(sys, options, /*isBuildMode*/ false);
    const host = ts.createIncrementalCompilerHost(options, sys);
    const exitStatus = ts.performIncrementalCompilation({
        host,
        system: sys,
        rootNames: fileNames,
        options,
        configFileParsingDiagnostics: ts.getConfigFileParsingDiagnostics(config),
        projectReferences,
        reportDiagnostic,
        reportErrorSummary: createReportErrorSummary(sys, options),
        afterProgramEmitAndDiagnostics: builderProgram => {
            reportStatistics(sys, builderProgram.getProgram(), /*builder*/ undefined);
            cb(builderProgram);
        }
    });
    return sys.exit(exitStatus);
}

function updateSolutionBuilderHost(
    sys: ts.System,
    cb: ExecuteCommandLineCallbacks,
    buildHost: ts.SolutionBuilderHostBase<ts.EmitAndSemanticDiagnosticsBuilderProgram>,
    solutionPerformance: SolutionPerformance | undefined,
) {
    updateCreateProgram(sys, buildHost, /*isBuildMode*/ true);
    buildHost.afterProgramEmitAndDiagnostics = program => {
        reportStatistics(sys, program.getProgram(), solutionPerformance);
        cb(program);
    };
    buildHost.beforeEmitBundle = config => enableStatisticsAndTracing(sys, config.options, /*isBuildMode*/ true);
    buildHost.afterEmitBundle = config => {
        reportStatistics(sys, config, solutionPerformance);
        cb(config);
    };
}

function updateCreateProgram<T extends ts.BuilderProgram>(sys: ts.System, host: { createProgram: ts.CreateProgram<T>; }, isBuildMode: boolean) {
    const compileUsingBuilder = host.createProgram;
    host.createProgram = (rootNames, options, host, oldProgram, configFileParsingDiagnostics, projectReferences) => {
        ts.Debug.assert(rootNames !== undefined || (options === undefined && !!oldProgram));
        if (options !== undefined) {
            enableStatisticsAndTracing(sys, options, isBuildMode);
        }
        return compileUsingBuilder(rootNames, options, host, oldProgram, configFileParsingDiagnostics, projectReferences);
    };
}

function updateWatchCompilationHost(
    sys: ts.System,
    cb: ExecuteCommandLineCallbacks,
    watchCompilerHost: ts.WatchCompilerHost<ts.EmitAndSemanticDiagnosticsBuilderProgram>,
) {
    updateCreateProgram(sys, watchCompilerHost, /*isBuildMode*/ false);
    const emitFilesUsingBuilder = watchCompilerHost.afterProgramCreate!; // TODO: GH#18217
    watchCompilerHost.afterProgramCreate = builderProgram => {
        emitFilesUsingBuilder(builderProgram);
        reportStatistics(sys, builderProgram.getProgram(), /*builder*/ undefined);
        cb(builderProgram);
    };
}

function createWatchStatusReporter(sys: ts.System, options: ts.CompilerOptions | ts.BuildOptions) {
    return ts.createWatchStatusReporter(sys, shouldBePretty(sys, options));
}

function createWatchOfConfigFile(
    system: ts.System,
    cb: ExecuteCommandLineCallbacks,
    reportDiagnostic: ts.DiagnosticReporter,
    configParseResult: ts.ParsedCommandLine,
    optionsToExtend: ts.CompilerOptions,
    watchOptionsToExtend: ts.WatchOptions | undefined,
    extendedConfigCache: ts.Map<ts.ExtendedConfigCacheEntry>,
) {
    const watchCompilerHost = ts.createWatchCompilerHostOfConfigFile({
        configFileName: configParseResult.options.configFilePath!,
        optionsToExtend,
        watchOptionsToExtend,
        system,
        reportDiagnostic,
        reportWatchStatus: createWatchStatusReporter(system, configParseResult.options)
    });
    updateWatchCompilationHost(system, cb, watchCompilerHost);
    watchCompilerHost.configFileParsingResult = configParseResult;
    watchCompilerHost.extendedConfigCache = extendedConfigCache;
    return ts.createWatchProgram(watchCompilerHost);
}

function createWatchOfFilesAndCompilerOptions(
    system: ts.System,
    cb: ExecuteCommandLineCallbacks,
    reportDiagnostic: ts.DiagnosticReporter,
    rootFiles: string[],
    options: ts.CompilerOptions,
    watchOptions: ts.WatchOptions | undefined,
) {
    const watchCompilerHost = ts.createWatchCompilerHostOfFilesAndCompilerOptions({
        rootFiles,
        options,
        watchOptions,
        system,
        reportDiagnostic,
        reportWatchStatus: createWatchStatusReporter(system, options)
    });
    updateWatchCompilationHost(system, cb, watchCompilerHost);
    return ts.createWatchProgram(watchCompilerHost);
}

interface SolutionPerformance {
    addAggregateStatistic(s: Statistic): void;
    forEachAggregateStatistics(cb: (s: Statistic) => void): void;
    clear(): void;
}

function enableSolutionPerformance(system: ts.System, options: ts.BuildOptions) {
    if (system === ts.sys && options.extendedDiagnostics) {
        ts.performance.enable();
        return createSolutionPerfomrance();
    }
}

function createSolutionPerfomrance(): SolutionPerformance {
    let statistics: ts.ESMap<string, Statistic> | undefined;
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
            (statistics ??= new ts.Map()).set(s.name, s);
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
    builder: ts.SolutionBuilder<ts.EmitAndSemanticDiagnosticsBuilderProgram>,
    solutionPerformance: SolutionPerformance | undefined) {
    if (!solutionPerformance) return;

    if (!ts.performance.isEnabled()) {
        ts.sys.write(ts.Diagnostics.Performance_timings_for_diagnostics_or_extendedDiagnostics_are_not_available_in_this_session_A_native_implementation_of_the_Web_Performance_API_could_not_be_found.message + "\n");
        return;
    }

    const statistics: Statistic[] = [];
    statistics.push(
        { name: "Projects in scope", value: ts.getBuildOrderFromAnyBuildOrder(builder.getBuildOrder()).length, type: StatisticType.count },
    );
    reportSolutionBuilderCountStatistic("SolutionBuilder::Projects built");
    reportSolutionBuilderCountStatistic("SolutionBuilder::Timestamps only updates");
    reportSolutionBuilderCountStatistic("SolutionBuilder::Bundles updated");
    solutionPerformance.forEachAggregateStatistics(s => {
        s.name = `Aggregate ${s.name}`;
        statistics.push(s);
    });
    ts.performance.forEachMeasure((name, duration) => {
        if (isSolutionMarkOrMeasure(name)) statistics.push({ name: `${getNameFromSolutionBuilderMarkOrMeasure(name)} time`, value: duration, type: StatisticType.time });
    });
    ts.performance.disable();
    ts.performance.enable();
    solutionPerformance.clear();

    reportAllStatistics(ts.sys, statistics);

    function reportSolutionBuilderCountStatistic(name: string) {
        const value = ts.performance.getCount(name);
        if (value) {
            statistics.push({ name: getNameFromSolutionBuilderMarkOrMeasure(name), value, type: StatisticType.count });
        }
    }

    function getNameFromSolutionBuilderMarkOrMeasure(name: string) {
        return name.replace("SolutionBuilder::", "");
    }
}

function canReportDiagnostics(system: ts.System, compilerOptions: ts.CompilerOptions) {
    return system === ts.sys && (compilerOptions.diagnostics || compilerOptions.extendedDiagnostics);
}

function canTrace(system: ts.System, compilerOptions: ts.CompilerOptions) {
    return system === ts.sys && compilerOptions.generateTrace;
}

function enableStatisticsAndTracing(system: ts.System, compilerOptions: ts.CompilerOptions, isBuildMode: boolean) {
    if (canReportDiagnostics(system, compilerOptions)) {
        ts.performance.enable(system);
    }

    if (canTrace(system, compilerOptions)) {
        ts.startTracing(isBuildMode ? "build" : "project",
            compilerOptions.generateTrace!, compilerOptions.configFilePath);
    }
}

function isSolutionMarkOrMeasure(name: string) {
    return ts.startsWith(name, "SolutionBuilder::");
}

function isProgram(programOrConfig: ts.Program | ts.ParsedCommandLine): programOrConfig is ts.Program {
    return !(programOrConfig as ts.ParsedCommandLine).options;
}

function reportStatistics(sys: ts.System, programOrConfig: ts.Program | ts.ParsedCommandLine, solutionPerformance: SolutionPerformance | undefined) {
    const program = isProgram(programOrConfig) ? programOrConfig : undefined;
    const config = isProgram(programOrConfig) ? undefined : programOrConfig;
    const compilerOptions = program ? program.getCompilerOptions() : config!.options;

    if (canTrace(sys, compilerOptions)) {
        ts.tracing?.stopTracing();
    }

    let statistics: Statistic[];
    if (canReportDiagnostics(sys, compilerOptions)) {
        statistics = [];
        const memoryUsed = sys.getMemoryUsage ? sys.getMemoryUsage() : -1;
        if (program) {
            reportCountStatistic("Files", program.getSourceFiles().length);

            const lineCounts = countLines(program);
            if (compilerOptions.extendedDiagnostics) {
                for (const key of ts.arrayFrom(lineCounts.keys())) {
                    reportCountStatistic("Lines of " + key, lineCounts.get(key)!);
                }
            }
            else {
                reportCountStatistic("Lines", ts.reduceLeftIterator(lineCounts.values(), (sum, count) => sum + count, 0));
            }

            reportCountStatistic("Identifiers", program.getIdentifierCount());
            reportCountStatistic("Symbols", program.getSymbolCount());
            reportCountStatistic("Types", program.getTypeCount());
            reportCountStatistic("Instantiations", program.getInstantiationCount());
        }
        if (memoryUsed >= 0) {
            reportStatisticalValue({ name: "Memory used", value: memoryUsed, type: StatisticType.memory }, /*aggregate*/ true);
        }

        const isPerformanceEnabled = ts.performance.isEnabled();
        const programTime = isPerformanceEnabled ? ts.performance.getDuration("Program") : 0;
        const bindTime = isPerformanceEnabled ? ts.performance.getDuration("Bind") : 0;
        const checkTime = isPerformanceEnabled ? ts.performance.getDuration("Check") : 0;
        const emitTime = isPerformanceEnabled ? ts.performance.getDuration("Emit") : 0;
        if (compilerOptions.extendedDiagnostics) {
            if (program) {
                const caches = program.getRelationCacheSizes();
                reportCountStatistic("Assignability cache size", caches.assignable);
                reportCountStatistic("Identity cache size", caches.identity);
                reportCountStatistic("Subtype cache size", caches.subtype);
                reportCountStatistic("Strict subtype cache size", caches.strictSubtype);
            }
            if (isPerformanceEnabled) {
                ts.performance.forEachMeasure((name, duration) => {
                    if (!isSolutionMarkOrMeasure(name)) reportTimeStatistic(`${name} time`, duration, /*aggregate*/ true);
                });
            }
        }
        else if (isPerformanceEnabled) {
            // Individual component times.
            // Note: To match the behavior of previous versions of the compiler, the reported parse time includes
            // I/O read time and processing time for triple-slash references and module imports, and the reported
            // emit time includes I/O write time. We preserve this behavior so we can accurately compare times.
            reportTimeStatistic("I/O read", ts.performance.getDuration("I/O Read"), /*aggregate*/ true);
            reportTimeStatistic("I/O write", ts.performance.getDuration("I/O Write"), /*aggregate*/ true);
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
            sys.write(ts.Diagnostics.Performance_timings_for_diagnostics_or_extendedDiagnostics_are_not_available_in_this_session_A_native_implementation_of_the_Web_Performance_API_could_not_be_found.message + "\n");
        }
        else {
            if (solutionPerformance) {
                // Clear selected marks and measures
                ts.performance.forEachMeasure(name => {
                    if (!isSolutionMarkOrMeasure(name)) ts.performance.clearMeasures(name);
                });
                ts.performance.forEachMark(name => {
                    if (!isSolutionMarkOrMeasure(name)) ts.performance.clearMarks(name);
                });
            }
            else {
                ts.performance.disable();
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

function reportAllStatistics(sys: ts.System, statistics: Statistic[]) {
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
        sys.write(ts.padRight(s.name + ":", nameSize + 2) + ts.padLeft(statisticValue(s).toString(), valueSize) + sys.newLine);
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
            ts.Debug.assertNever(s.type);
    }
}

function writeConfigFile(
    sys: ts.System,
    reportDiagnostic: ts.DiagnosticReporter,
    options: ts.CompilerOptions,
    fileNames: string[]
) {
    const currentDirectory = sys.getCurrentDirectory();
    const file = ts.normalizePath(ts.combinePaths(currentDirectory, "tsconfig.json"));
    if (sys.fileExists(file)) {
        reportDiagnostic(ts.createCompilerDiagnostic(ts.Diagnostics.A_tsconfig_json_file_is_already_defined_at_Colon_0, file));
    }
    else {
        sys.writeFile(file, ts.generateTSConfig(options, fileNames, sys.newLine));
        const output: string[] = [sys.newLine, ...getHeader(sys,"Created a new tsconfig.json with:")];
        output.push(ts.getCompilerOptionsDiffValue(options, sys.newLine) + sys.newLine + sys.newLine);
        output.push(`You can learn more at https://aka.ms/tsconfig` + sys.newLine);
        for (const line of output) {
            sys.write(line);
        }
    }

    return;
}
}
