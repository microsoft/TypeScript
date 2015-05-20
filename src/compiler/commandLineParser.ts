/// <reference path="sys.ts"/>
/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>

module ts {
    /* @internal */
    export var optionDeclarations: CommandLineOption[] = [
        {
            name: "charset",
            type: "string",
        },
        {
            name: "declaration",
            shortName: "d",
            type: "boolean",
            description: Diagnostics.Generates_corresponding_d_ts_file,
        },
        {
            name: "diagnostics",
            type: "boolean",
        },
        {
            name: "emitBOM",
            type: "boolean"
        },
        {
            name: "help",
            shortName: "h",
            type: "boolean",
            description: Diagnostics.Print_this_message,
        },
        {
            name: "inlineSourceMap",
            type: "boolean",
        },
        {
            name: "inlineSources",
            type: "boolean",
        },
        {
            name: "listFiles",
            type: "boolean",
        },
        {
            name: "locale",
            type: "string",
        },
        {
            name: "mapRoot",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Specifies_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations,
            paramType: Diagnostics.LOCATION,
        },
        {
            name: "module",
            shortName: "m",
            type: {
                "commonjs": ModuleKind.CommonJS,
                "amd": ModuleKind.AMD,
                "system": ModuleKind.System,
                "umd": ModuleKind.UMD,
            },
            description: Diagnostics.Specify_module_code_generation_Colon_commonjs_amd_system_or_umd,
            paramType: Diagnostics.KIND,
            error: Diagnostics.Argument_for_module_option_must_be_commonjs_amd_system_or_umd
        },
        {
            name: "newLine",
            type: {
                "crlf": NewLineKind.CarriageReturnLineFeed,
                "lf": NewLineKind.LineFeed
            },
            description: Diagnostics.Specifies_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix,
            paramType: Diagnostics.NEWLINE,
            error: Diagnostics.Argument_for_newLine_option_must_be_CRLF_or_LF
        },
        {
            name: "noEmit",
            type: "boolean",
            description: Diagnostics.Do_not_emit_outputs,
        },
        {
            name: "noEmitHelpers",
            type: "boolean"
        },
        {
            name: "noEmitOnError",
            type: "boolean",
            description: Diagnostics.Do_not_emit_outputs_if_any_errors_were_reported,
        },
        {
            name: "noImplicitAny",
            type: "boolean",
            description: Diagnostics.Raise_error_on_expressions_and_declarations_with_an_implied_any_type,
        },
        {
            name: "noLib",
            type: "boolean",
        },
        {
            name: "noResolve",
            type: "boolean",
        },
        {
            name: "out",
            type: "string",
            description: Diagnostics.Concatenate_and_emit_output_to_single_file,
            paramType: Diagnostics.FILE,
        },
        {
            name: "outDir",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Redirect_output_structure_to_the_directory,
            paramType: Diagnostics.DIRECTORY,
        },
        {
            name: "preserveConstEnums",
            type: "boolean",
            description: Diagnostics.Do_not_erase_const_enum_declarations_in_generated_code
        },
        {
            name: "project",
            shortName: "p",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Compile_the_project_in_the_given_directory,
            paramType: Diagnostics.DIRECTORY
        },
        {
            name: "removeComments",
            type: "boolean",
            description: Diagnostics.Do_not_emit_comments_to_output,
        },
        {
            name: "rootDir",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Specifies_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir,
            paramType: Diagnostics.LOCATION,
        },
        {
            name: "separateCompilation",
            type: "boolean",
        },
        {
            name: "sourceMap",
            type: "boolean",
            description: Diagnostics.Generates_corresponding_map_file,
        },
        {
            name: "sourceRoot",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Specifies_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations,
            paramType: Diagnostics.LOCATION,
        },
        {
            name: "suppressImplicitAnyIndexErrors",
            type: "boolean",
            description: Diagnostics.Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures,
        },
        {
            name: "stripInternal",
            type: "boolean",
            description: Diagnostics.Do_not_emit_declarations_for_code_that_has_an_internal_annotation,
            experimental: true
        },
        {
            name: "target",
            shortName: "t",
            type: { "es3": ScriptTarget.ES3, "es5": ScriptTarget.ES5, "es6": ScriptTarget.ES6 },
            description: Diagnostics.Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES6_experimental,
            paramType: Diagnostics.VERSION,
            error: Diagnostics.Argument_for_target_option_must_be_ES3_ES5_or_ES6
        },
        {
            name: "version",
            shortName: "v",
            type: "boolean",
            description: Diagnostics.Print_the_compiler_s_version,
        },
        {
            name: "watch",
            shortName: "w",
            type: "boolean",
            description: Diagnostics.Watch_input_files,
        },
        {
            name: "emitDecoratorMetadata",
            type: "boolean",
            experimental: true
        }
    ];

    export function parseCommandLine(commandLine: string[]): ParsedCommandLine {
        var options: CompilerOptions = {};
        var fileNames: string[] = [];
        var errors: Diagnostic[] = [];
        var shortOptionNames: Map<string> = {};
        var optionNameMap: Map<CommandLineOption> = {};

        forEach(optionDeclarations, option => {
            optionNameMap[option.name.toLowerCase()] = option;
            if (option.shortName) {
                shortOptionNames[option.shortName] = option.name;
            }
        });
        parseStrings(commandLine);
        return {
            options,
            fileNames,
            errors
        };

        function parseStrings(args: string[]) {
            var i = 0;
            while (i < args.length) {
                var s = args[i++];
                if (s.charCodeAt(0) === CharacterCodes.at) {
                    parseResponseFile(s.slice(1));
                }
                else if (s.charCodeAt(0) === CharacterCodes.minus) {
                    s = s.slice(s.charCodeAt(1) === CharacterCodes.minus ? 2 : 1).toLowerCase();

                    // Try to translate short option names to their full equivalents.
                    if (hasProperty(shortOptionNames, s)) {
                        s = shortOptionNames[s];
                    }

                    if (hasProperty(optionNameMap, s)) {
                        var opt = optionNameMap[s];

                        // Check to see if no argument was provided (e.g. "--locale" is the last command-line argument).
                        if (!args[i] && opt.type !== "boolean") {
                            errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_expects_an_argument, opt.name));
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
                            // If not a primitive, the possible types are specified in what is effectively a map of options.
                            default:
                                var map = <Map<number>>opt.type;
                                var key = (args[i++] || "").toLowerCase();
                                if (hasProperty(map, key)) {
                                    options[opt.name] = map[key];
                                }
                                else {
                                    errors.push(createCompilerDiagnostic(opt.error));
                                }
                        }
                    }
                    else {
                        errors.push(createCompilerDiagnostic(Diagnostics.Unknown_compiler_option_0, s));
                    }
                }
                else {
                    fileNames.push(s);
                }
            }
        }

        function parseResponseFile(fileName: string) {
            var text = sys.readFile(fileName);

            if (!text) {
                errors.push(createCompilerDiagnostic(Diagnostics.File_0_not_found, fileName));
                return;
            }

            var args: string[] = [];
            var pos = 0;
            while (true) {
                while (pos < text.length && text.charCodeAt(pos) <= CharacterCodes.space) pos++;
                if (pos >= text.length) break;
                var start = pos;
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

    /**
      * Read tsconfig.json file
      * @param fileName The path to the config file
      */
    export function readConfigFile(fileName: string): { config?: any; error?: Diagnostic }  {
        try {
            var text = sys.readFile(fileName);
        }
        catch (e) {
            return { error: createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, e.message) };
        }
        return parseConfigFileText(fileName, text);
    }

    /**
      * Parse the text of the tsconfig.json file
      * @param fileName The path to the config file
      * @param jsonText The text of the config file
      */
    export function parseConfigFileText(fileName: string, jsonText: string): { config?: any; error?: Diagnostic } {
        try {
            return { config: /\S/.test(jsonText) ? JSON.parse(jsonText) : {} };
        }
        catch (e) {
            return { error: createCompilerDiagnostic(Diagnostics.Failed_to_parse_file_0_Colon_1, fileName, e.message) };
        }
    }
    
    const enum ExpandResult {
        Ok,
        Error
    }

    /**
      * Parse the contents of a config file (tsconfig.json).
      * @param json The contents of the config file to parse
      * @param basePath A root directory to resolve relative path entries in the config
      *    file to. e.g. outDir 
      */
    export function parseConfigFile(json: any, host: ParseConfigHost, basePath: string): ParsedCommandLine {
        let errors: Diagnostic[] = [];
        let options = getCompilerOptions();
        
        return {
            options,
            fileNames: getFileNames(),
            errors
        };

        function getCompilerOptions(): CompilerOptions {
            var options: CompilerOptions = {};
            var optionNameMap: Map<CommandLineOption> = {};
            forEach(optionDeclarations, option => {
                optionNameMap[option.name] = option;
            });
            var jsonOptions = json["compilerOptions"];
            if (jsonOptions) {
                for (var id in jsonOptions) {
                    if (hasProperty(optionNameMap, id)) {
                        var opt = optionNameMap[id];
                        var optType = opt.type;
                        var value = jsonOptions[id];
                        var expectedType = typeof optType === "string" ? optType : "string";
                        if (typeof value === expectedType) {
                            if (typeof optType !== "string") {
                                var key = value.toLowerCase();
                                if (hasProperty(optType, key)) {
                                    value = optType[key];
                                }
                                else {
                                    errors.push(createCompilerDiagnostic(opt.error));
                                    value = 0;
                                }
                            }
                            if (opt.isFilePath) {
                                value = normalizePath(combinePaths(basePath, value));
                            }
                            options[opt.name] = value;
                        }
                        else {
                            errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, id, expectedType));
                        }
                    }
                    else {
                        errors.push(createCompilerDiagnostic(Diagnostics.Unknown_compiler_option_0, id));
                    }
                }
            }
            return options;
        }

        function getFileNames(): string[] {
            var exclude = json["exclude"] instanceof Array ? <string[]>json["exclude"] : undefined;
            if (hasProperty(json, "files")) {
                var fileNames = json["files"] instanceof Array ? <string[]>json["files"] : undefined; 
                return expandFiles(fileNames, exclude, /*literalFiles*/ false);
            }
            else {
                var fileNames: string[] = [];
                var sysFiles = host.readDirectory(basePath, ".ts");
                for (var i = 0; i < sysFiles.length; i++) {
                    var name = sysFiles[i];
                    if (!fileExtensionIs(name, ".d.ts") || !contains(sysFiles, name.substr(0, name.length - 5) + ".ts")) {
                        fileNames.push(name);
                    }
                }
                
                if (!exclude) {
                    return fileNames;
                }

                return expandFiles(fileNames, exclude, /*literalFiles*/ true);
            }
        }
        
        /**
          * Expands an array of file specifications.
          * @param fileSpecs The file specifications to expand.
          * @param excludeSpecs Any file specifications to exclude.
          * @param literalFiles A value indicating whether the fileSpecs array contains only literal file names and not wildcards.
          */
        function expandFiles(fileSpecs: string[], excludeSpecs: string[], literalFiles: boolean): string[] {
            let output: string[] = [];
            if (!fileSpecs) {
                return output;
            }

            let normalizedBasePath = normalizePath(basePath);
            let ignoreCase = !host.useCaseSensitiveFileNames;
            let isExpandingRecursiveDirectory = false;
            let fileSet: StringSet = {};
            
            // populate the file exclusion pattern
            let excludePattern = createExcludeRegularExpression(normalizedBasePath, excludeSpecs);
            
            // expand and include the provided files into the file set.
            for (let fileSpec of fileSpecs) {
                let normalizedFileSpec = normalizePath(fileSpec);
                if (literalFiles) {
                    normalizedFileSpec = combinePaths(basePath, normalizedFileSpec);
                    includeFile(normalizedFileSpec);
                }
                else {
                    normalizedFileSpec = removeTrailingDirectorySeparator(normalizedFileSpec);
                    expandDirectory(normalizedBasePath, normalizedFileSpec, 0);
                }
            }
            
            return output;
            
            /**
              * Expands a directory with wildcards.
              * @param basePath The directory to expand.
              * @param fileSpec The original file specification.
              * @param start The starting offset in the file specification.
              */
            function expandDirectory(basePath: string, fileSpec: string, start: number): ExpandResult {
                 // find the offset of the next wildcard in the file specification
                 let offset = indexOfWildcard(fileSpec, start);
                 if (offset < 0) {
                     // There were no more wildcards, so process the match if the file exists and was not excluded.
                     let path = combinePaths(basePath, fileSpec.substring(start));
                     includeFile(path);
                     return ExpandResult.Ok;
                 }
                 
                 // find the last directory separator before the wildcard to get the leading path.
                 let end = fileSpec.lastIndexOf(directorySeparator, offset);
                 if (end > start) {
                     // wildcard occurs in a later segment, include remaining path up to wildcard in prefix
                     basePath = combinePaths(basePath, fileSpec.substring(start, end));
                     start = end + 1;
                 }
                 
                 // Expand the wildcard portion of the path.
                 return expandWildcard(basePath, fileSpec, start);
            }

            /**
              * Expands a wildcard portion of a file specification.
              * @param basePath The prefix path.
              * @param fileSpec The file specification.
              * @param start The starting offset in the file specification.
              */
            function expandWildcard(basePath: string, fileSpec: string, start: number): ExpandResult {
                // find the offset of the next directory separator to extract the wildcard path segment. 
                let offset = fileSpec.indexOf(directorySeparator, start);
                let isEndOfLine = offset < 0;
                if (isRecursiveDirectoryWildcard(fileSpec, start)) {
                    // If the path contains only "**", then this is a recursive directory pattern.
                    if (isEndOfLine) {
                        // If there is no file specification following the recursive directory pattern
                        // we cannot match any files, so we will ignore this pattern.
                        return ExpandResult.Ok;
                    }

                    // expand the recursive directory pattern
                    return expandRecursiveDirectory(basePath, fileSpec, offset + 1);
                }
                
                // match the entries in the directory against the wildcard pattern.
                let entries = host.readDirectoryFlat(basePath);
                let pattern = createRegularExpressionFromWildcard(fileSpec, start, isEndOfLine ? fileSpec.length : offset);
                for (let entry of entries) {
                    // skip the entry if it does not match the pattern.
                    if (!pattern.test(entry)) {
                        continue;
                    }
                    
                    let path = combinePaths(basePath, entry);
                    if (isEndOfLine) {
                        // This wildcard has no further directory to process, so include the file.
                        includeFile(path);
                    }
                    else if (host.directoryExists(path)) {
                        // If this was a directory, process the directory.
                        if (expandDirectory(path, fileSpec, offset + 1) === ExpandResult.Error) {
                            return ExpandResult.Error;
                        }
                    }
                }
                
                return ExpandResult.Ok;
            }
            
            /**
              * Expands a `**` recursive directory wildcard.
              * @param basePath The directory to recursively expand.
              * @param fileSpec The original file specification.
              * @param start The starting offset in the file specification.
              */
            function expandRecursiveDirectory(basePath: string, fileSpec: string, start: number): ExpandResult {
                if (isExpandingRecursiveDirectory) {
                    errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, fileSpec))
                    return ExpandResult.Error;
                }
                
                // expand the non-recursive part of the file specification against the prefix path.
                isExpandingRecursiveDirectory = true;
                let result = expandDirectory(basePath, fileSpec, start);
                isExpandingRecursiveDirectory = false;
                
                if (result !== ExpandResult.Error) {
                    // Recursively expand each subdirectory.
                    let entries = host.readDirectoryFlat(basePath);
                    for (let entry of entries) {
                        let path = combinePaths(basePath, entry);
                        if (host.directoryExists(path)) {
                            if (expandRecursiveDirectory(path, fileSpec, start) === ExpandResult.Error) {
                                result = ExpandResult.Error;
                                break;
                            }
                        }
                    }
                }
                
                return result;
            }
            
            /**
              * Includes a file in a file set.
              * @param file The file to include.
              */
            function includeFile(file: string): void {
                let key = ignoreCase ? file.toLowerCase() : file;
                // ignore the file if we've already matched it.
                if (hasProperty(fileSet, key)) {
                    return;
                }
                
                // ignore the file if it matches an exclude pattern
                if (excludePattern && excludePattern.test(file)) {
                    return;
                }
                
                // ignore the file if it doesn't exist or is a directory
                if (!host.fileExists(file) || host.directoryExists(file)) {
                    return;
                }
                
                // ignore the file if it does not have a supported extension
                if (!options.allowNonTsExtensions && !hasSupportedFileExtension(file)) {
                    return;
                }
                
                fileSet[key] = true;
                output.push(file);
            }
            
            /**
              * Creates a regular expression from a glob-style wildcard.
              * @param fileSpec The file specification.
              * @param start The starting offset in the file specification.
              * @param end The end offset in the file specification.
              */
            function createRegularExpressionFromWildcard(fileSpec: string, start: number, end: number): RegExp {
                let pattern = createPatternFromWildcard(fileSpec, start, end);
                return new RegExp("^" + pattern + "$", ignoreCase ? "i" : "");
            }

            /**
              * Creates a pattern from a wildcard segment 
              * @param fileSpec The file specification.
              * @param start The starting offset in the file specification.
              * @param end The end offset in the file specification.
              */
            function createPatternFromWildcard(fileSpec: string, start: number, end: number): string {
                let pattern = "";
                let offset = indexOfWildcard(fileSpec, start);
                while (offset >= 0 && offset < end) {
                    if (offset > start) {
                        // Escape and append the non-wildcard portion to the regular expression
                        pattern += escapeRegularExpressionText(fileSpec, start, offset);
                    }
                    
                    let charCode = fileSpec.charCodeAt(offset);
                    if (charCode === CharacterCodes.asterisk) {
                        // Append a multi-character (zero or more characters) pattern to the regular expression 
                        pattern += ".*";
                    }
                    else if (charCode === CharacterCodes.question) {
                        // Append a single-character (one character) pattern to the regular expression
                        pattern += ".";
                    }
                    else if (charCode === CharacterCodes.openBracket) {
                        // Append a character range (one character) pattern to the regular expression
                        pattern += "[";
                        
                        // If the next character is an exclamation token, append a caret (^) to negate the 
                        // character range and advance the start of the range by one.
                        start = offset + 1; 
                        charCode = fileSpec.charCodeAt(start);
                        if (charCode === CharacterCodes.exclamation) {
                            pattern += "^";
                            start++;
                        }
                        
                        // Find the end of the character range. If it can't be found, fix up the range
                        // to the end of the wildcard
                        offset = fileSpec.indexOf(']', start);
                        if (offset < 0 || offset > end) {
                            offset = end;
                        }
                        
                        // Escape and append the character range
                        pattern += escapeRegularExpressionText(fileSpec, start, offset);
                        pattern += "]";
                    }
                    
                    start = offset + 1;
                    offset = indexOfWildcard(fileSpec, start);
                }
                
                // Escape and append any remaining non-wildcard portion.
                if (start < end) {
                    pattern += escapeRegularExpressionText(fileSpec, start, end);
                }
                
                return pattern;
            }
            
            /**
              * Creates a regular expression from a glob-style wildcard used to exclude a file.
              * @param basePath The prefix path 
              * @param excludeSpecs The file specifications to exclude.
              */
            function createExcludeRegularExpression(basePath: string, excludeSpecs: string[]): RegExp {
                // ignore an empty exclusion list
                if (!excludeSpecs || excludeSpecs.length === 0) {
                    return undefined;
                }
                
                basePath = escapeRegularExpressionText(basePath, 0, basePath.length);
                
                let pattern = "";
                for (let excludeSpec of excludeSpecs) {
                    // skip empty entries.
                    if (!excludeSpec) {
                        continue;
                    }
                    
                    let normalizedExcludeSpec = normalizePath(excludeSpec);
                    let excludePattern = createExcludePattern(normalizedExcludeSpec);
                    if (excludePattern) {
                        if (pattern) {
                            pattern += "|";
                        }
                        
                        pattern += "(" + combinePaths(basePath, excludePattern) + ")";
                    }
                }
                
                if (pattern) {
                    return new RegExp("^(" + pattern + ")$", ignoreCase ? "i" : "");
                }
                
                return undefined;
            }

            /**
              * Creates a pattern for the excludePattern regular expression used to exclude a file.
              * @param excludeSpec The file specification to exclude. 
              */
            function createExcludePattern(excludeSpec: string): string {
                let hasRecursiveDirectoryWildcard = false;
                let pattern = "";
                let start = 0;
                let end = excludeSpec.length;
                let offset = excludeSpec.indexOf(directorySeparator, start);
                while (offset >= 0 && offset < end) {
                    if (isRecursiveDirectoryWildcard(excludeSpec, start)) {
                        if (hasRecursiveDirectoryWildcard) {
                            errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, excludeSpec));
                            return undefined;
                        }
                        
                        hasRecursiveDirectoryWildcard = true;
                    }
                    
                    if (offset > start) {
                        pattern += createPatternFromWildcard(excludeSpec, start, offset);
                    }
                    
                    pattern += excludeSpec.charAt(offset);
                    start = offset + 1;
                    offset = excludeSpec.indexOf(directorySeparator, start);
                }
                
                if (start < end) {
                    pattern += createPatternFromWildcard(excludeSpec, start, end);
                }
                
                return pattern;
            }
            
            /**
              * Escape regular expression reserved tokens.
              * @param text The text to escape.
              */
            function escapeRegularExpressionText(text: string, start: number, end: number) {
                let offset = indexOfReservedCharacter(text, start);
                if (offset < 0) {
                    return text;
                }
                
                let escaped: string = "";
                while (offset >= 0 && offset < end) {
                    if (offset > start) {
                        escaped += text.substring(start, offset);
                    }
                    
                    escaped += "\\";
                    escaped += text.charAt(offset);
                    start = offset + 1;
                    offset = indexOfReservedCharacter(text, start);
                }
                
                if (start < end) {
                    escaped += text.substring(start, end);
                }
                
                return escaped;
            }
            
            /**
              * Determines whether the wildcard at the current offset is a recursive directory wildcard.
              * @param fileSpec The file specification.
              * @param offset The offset into the file specification. 
              */
            function isRecursiveDirectoryWildcard(fileSpec: string, offset: number) {
                if (offset + 2 <= fileSpec.length &&
                    fileSpec.charCodeAt(offset) === CharacterCodes.asterisk &&
                    fileSpec.charCodeAt(offset + 1) === CharacterCodes.asterisk &&
                    isDirectorySeparatorOrEndOfLine(fileSpec, offset + 2)) {
                    return true;
                } 
                
                return false;
            }
            
            /**
              * Determines whether the provided offset points to a directory separator or the end of the line. 
              * @param fileSpec The file specification.
              * @param offset The offset into the file specification. 
              */
            function isDirectorySeparatorOrEndOfLine(fileSpec: string, offset: number) {
                return offset === fileSpec.length || (offset < fileSpec.length && fileSpec.charCodeAt(offset) === CharacterCodes.slash);
            }
            
            /**
              * Gets the index of the next wildcard character in a file specification.
              * @param fileSpec The file specification.
              * @param start The offset at which to start the search.
              */
            function indexOfWildcard(fileSpec: string, start: number): number {
                const len = fileSpec.length;
                for (let i = start; i < len; ++i) {
                    let charCode = fileSpec.charCodeAt(i);
                    if (charCode === CharacterCodes.asterisk ||
                        charCode === CharacterCodes.question /*question*/ ||
                        charCode === CharacterCodes.openBracket) {
                        return i;
                    }
                }
                
                return -1;
            }
            
            /**
              * Gets the index of the next reserved character in a regular expression.
              * @param text The text to search.
              * @param start The offset at which to start the search. 
              */
            function indexOfReservedCharacter(text: string, start: number) {
                const len = text.length;
                for (let i = start; i < len; ++i) {
                    let charCode = text.charCodeAt(i);
                    switch (charCode) {
                        case CharacterCodes.question:
                        case CharacterCodes.asterisk:
                        case CharacterCodes.plus:
                        case CharacterCodes.dot:
                        case CharacterCodes.caret:
                        case CharacterCodes.$:
                        case CharacterCodes.openParen:
                        case CharacterCodes.closeParen:
                        case CharacterCodes.openBrace:
                        case CharacterCodes.closeBrace:
                        case CharacterCodes.openBracket:
                        case CharacterCodes.closeBracket:
                        case CharacterCodes.bar:
                            return i;
                    }
                }
                
                return -1;
            }
        }
    }
}
