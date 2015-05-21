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
            let fileNames: string[];
            if (hasProperty(json, "files")) {
                fileNames = json["files"] instanceof Array ? <string[]>json["files"] : []; 
            }
            
            let includeSpecs = json["include"] instanceof Array ? <string[]>json["include"] : undefined;
            if (!fileNames && !includeSpecs) {
                includeSpecs = ["**/*.ts"]; 
            }
            
            let excludeSpecs = json["exclude"] instanceof Array ? <string[]>json["exclude"] : undefined;
            return expandFiles(basePath, fileNames, includeSpecs, excludeSpecs, options, host, errors);
        }
    }
        
    /**
      * Expands an array of file specifications.
      * @param basePath The base path for any relative file specifications.
      * @param fileNames The literal file names to include.
      * @param includeSpecs The file specifications to expand.
      * @param excludeSpecs The file specifications to exclude.
      * @param options Compiler options.
      * @param host The host used to resolve files and directories.
      * @param errors An array for diagnostic reporting.
      */
    export function expandFiles(basePath: string, fileNames: string[], includeSpecs: string[], excludeSpecs: string[], options: CompilerOptions, host: ParseConfigHost, errors?: Diagnostic[]): string[] {
        const wildcardCharacterPattern = /[\*\?\[]/g;
        const reservedCharacterPattern = /[^\w\-]/g;
        
        let output: string[] = [];
        basePath = normalizePath(basePath);
        basePath = removeTrailingDirectorySeparator(basePath);
        
        let ignoreCase = !host.useCaseSensitiveFileNames;
        let isExpandingRecursiveDirectory = false;
        let fileSet: Map<string> = {};
        let excludePattern: RegExp;
        
        // include every literal file
        if (fileNames) {
            for (let fileName of fileNames) {
                let path = getNormalizedAbsolutePath(fileName, basePath);
                includeFile(path, /*isLiteralFile*/ true);
            }
        }
        
        // expand and include the provided files into the file set.
        if (includeSpecs) {
            // populate the file exclusion pattern
            excludePattern = createExcludeRegularExpression(basePath, excludeSpecs);
            
            for (let includeSpec of includeSpecs) {
                includeSpec = normalizePath(includeSpec);
                includeSpec = removeTrailingDirectorySeparator(includeSpec);
                expandFileSpec(basePath, includeSpec, 0, includeSpec.length);
            }
        }
        
        return output;
        
        /**
          * Expands a directory with wildcards.
          * @param basePath The directory to expand.
          * @param fileSpec The original file specification.
          * @param start The starting offset in the file specification.
          * @param end The end offset in the file specification.
          */
        function expandFileSpec(basePath: string, fileSpec: string, start: number, end: number): ExpandResult {
            // Skip expansion if the base path matches an exclude pattern.
            if (isExcludedPath(basePath)) {
                return ExpandResult.Ok;
            }
            
            // Find the offset of the next wildcard in the file specification
            let offset = indexOfWildcard(fileSpec, start);
            if (offset < 0) {
                // There were no more wildcards, so include the file.
                let path = combinePaths(basePath, fileSpec.substring(start));
                includeFile(path, /*isLiteralFile*/ false);
                return ExpandResult.Ok;
            }
            
            // Find the last directory separator before the wildcard to get the leading path.
            offset = fileSpec.lastIndexOf(directorySeparator, offset);
            if (offset > start) {
                // The wildcard occurs in a later segment, include remaining path up to 
                // wildcard in prefix.
                basePath = combinePaths(basePath, fileSpec.substring(start, offset));
                
                // Skip this wildcard path if the base path now matches an exclude pattern.
                if (isExcludedPath(basePath)) {
                    return ExpandResult.Ok;
                }
                
                start = offset + 1;
            }
            
            // Find the offset of the next directory separator to extract the wildcard path segment. 
            offset = getEndOfPathSegment(fileSpec, start, end);
            
            // Check if the current offset is the beginning of a recursive directory pattern.
            if (isRecursiveDirectoryWildcard(fileSpec, start, offset)) {
                if (offset >= end) {
                    // If there is no file specification following the recursive directory pattern
                    // we cannot match any files, so we will ignore this pattern.
                    return ExpandResult.Ok;
                }

                // Expand the recursive directory pattern.
                return expandRecursiveDirectory(basePath, fileSpec, offset + 1, end);
            }
            
            // Match the entries in the directory against the wildcard pattern.
            let pattern = createRegularExpressionFromWildcard(fileSpec, start, offset);
            let entries = host.readDirectoryFlat(basePath);
            for (let entry of entries) {
                // Skip the entry if it does not match the pattern.
                if (!pattern.test(entry)) {
                    continue;
                }
                
                let path = combinePaths(basePath, entry);
                if (offset >= end) {
                    // If the entry is a declaration file and there is a source file with the
                    // same name in this directory, skip the file.
                    if (fileExtensionIs(entry, ".d.ts") && 
                        contains(entries, entry.substr(0, entry.length - 5) + ".ts")) {
                        continue;
                    }
                    
                    // This wildcard has no further directory to process, so include the file.
                    includeFile(path, /*isLiteralFile*/ false);
                }
                else if (host.directoryExists(path)) {
                    // If this was a directory, process the directory.
                    if (expandFileSpec(path, fileSpec, offset + 1, end) === ExpandResult.Error) {
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
          * @param end The end offset in the file specification.
          */
        function expandRecursiveDirectory(basePath: string, fileSpec: string, start: number, end: number): ExpandResult {
            if (isExpandingRecursiveDirectory) {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, fileSpec))
                }
                return ExpandResult.Error;
            }
            
            // expand the non-recursive part of the file specification against the prefix path.
            isExpandingRecursiveDirectory = true;
            let result = expandFileSpec(basePath, fileSpec, start, end);
            isExpandingRecursiveDirectory = false;
            
            if (result !== ExpandResult.Error) {
                // Recursively expand each subdirectory.
                let entries = host.readDirectoryFlat(basePath);
                for (let entry of entries) {
                    let path = combinePaths(basePath, entry);
                    if (host.directoryExists(path)) {
                        if (expandRecursiveDirectory(path, fileSpec, start, end) === ExpandResult.Error) {
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
          * @param isLiteralFile A value indicating whether the file to be added is 
          *                      a literal file, or the result of matching a file specification.
          */
        function includeFile(file: string, isLiteralFile: boolean): void {
            if (!isLiteralFile) {
                // Ignore the file if it should be excluded
                if (isExcludedPath(file)) {
                    return;
                }
                
                // Ignore the file if it doesn't exist.
                if (!host.fileExists(file)) {
                    return;
                }
                
                // Ignore the file if it does not have a supported extension.
                if (!options.allowNonTsExtensions && !hasSupportedFileExtension(file)) {
                    return;
                }
            }
            
            // Ignore the file if we've already included it.
            let key = ignoreCase ? file.toLowerCase() : file;
            if (hasProperty(fileSet, key)) {
                return;
            }
            
            fileSet[key] = file;
            output.push(file);
        }
        
        /**
          * Determines whether a path should be excluded. 
          */
        function isExcludedPath(path: string) {
            return excludePattern ? excludePattern.test(path) : false;
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
                    pattern += "[^/]*";
                }
                else if (charCode === CharacterCodes.question) {
                    // Append a single-character (one character) pattern to the regular expression
                    pattern += "[^/]";
                }
                else if (charCode === CharacterCodes.openBracket) {
                    // Append a character range (one character) pattern to the regular expression
                    pattern += "(?!/)[";
                    
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
            // Ignore an empty exclusion list
            if (!excludeSpecs || excludeSpecs.length === 0) {
                return undefined;
            }
            
            basePath = escapeRegularExpressionText(basePath, 0, basePath.length);
            
            let pattern = "";
            for (let excludeSpec of excludeSpecs) {
                let excludePattern = createExcludePattern(basePath, excludeSpec);
                if (excludePattern) {
                    if (pattern) {
                        pattern += "|";
                    }
                    
                    pattern += "(" + excludePattern + ")";
                }
            }
            
            if (pattern) {
                return new RegExp("^(" + pattern + ")($|/)", ignoreCase ? "i" : "");
            }
            
            return undefined;
        }

        /**
          * Creates a pattern for used to exclude a file.
          * @param excludeSpec The file specification to exclude. 
          */
        function createExcludePattern(basePath: string, excludeSpec: string): string {
            if (!excludeSpec) {
                return undefined;
            }
            
            excludeSpec = normalizePath(excludeSpec);
            excludeSpec = removeTrailingDirectorySeparator(excludeSpec);

            let pattern = isRootedDiskPath(excludeSpec) ? "" : basePath;
            let hasRecursiveDirectoryWildcard = false;
            let start = 0;
            let end = excludeSpec.length;
            let offset = getEndOfPathSegment(excludeSpec, start, end);
            while (start < offset) {
                if (isRecursiveDirectoryWildcard(excludeSpec, start, offset)) {
                    if (hasRecursiveDirectoryWildcard) {
                        if (errors) {
                            errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, excludeSpec));
                        }
                        return undefined;
                    }
                    
                    // As an optimization, if the recursive directory is the last
                    // wildcard, or is followed by only `*` or `*.ts`, don't add the 
                    // remaining pattern and exit the loop.
                    if (canElideRecursiveDirectorySegment(excludeSpec, offset, end)) {
                        break; 
                    } 
                    
                    hasRecursiveDirectoryWildcard = true;
                    pattern += "(/.+)?";;
                }
                else {
                    if (pattern) {
                        pattern += directorySeparator; 
                    }

                    pattern += createPatternFromWildcard(excludeSpec, start, offset);
                }
                
                start = offset + 1;
                offset = getEndOfPathSegment(excludeSpec, start, end);
            }
            
            return pattern;
        }
        
        function canElideRecursiveDirectorySegment(excludeSpec: string, offset: number, end: number) {
            if (offset === end || offset + 1 === end) {
                return true;
            }
            
            return canElideWildcardSegment(excludeSpec, offset + 1, end);
        }
        
        function canElideWildcardSegment(excludeSpec: string, start: number, end: number) {
            let charCode = excludeSpec.charCodeAt(start);
            if (charCode === CharacterCodes.asterisk) {
                if (start + 1 === end) {
                    return true;
                }
                
                if (start + 4 === end && 
                    !options.allowNonTsExtensions && 
                    fileExtensionIs(excludeSpec, ".ts")) {
                    return true;
                }
            }
            return false;
        }
        
        /**
          * Escape regular expression reserved tokens.
          * @param fileSpec The file specification.
          * @param start The starting offset in the file specification. 
          * @param end The ending offset in the file specification.
          */
        function escapeRegularExpressionText(text: string, start: number, end: number) {
            return text.substring(start, end).replace(reservedCharacterPattern, "\\$&");
        }
        
        /**
          * Determines whether the wildcard at the current offset is a recursive directory wildcard.  
          * @param fileSpec The file specification.  
          * @param start The starting offset in the file specification. 
          * @param end The ending offset in the file specification.
          */
        function isRecursiveDirectoryWildcard(fileSpec: string, start: number, end: number) {
            return end - start === 2 &&
                fileSpec.charCodeAt(start) === CharacterCodes.asterisk &&
                fileSpec.charCodeAt(start + 1) === CharacterCodes.asterisk;
        }  
        
        
        /**
          * Gets the index of the next wildcard character in a file specification.
          * @param fileSpec The file specification.
          * @param start The starting offset in the file specification.
          */
        function indexOfWildcard(fileSpec: string, start: number): number {
            wildcardCharacterPattern.lastIndex = start;
            wildcardCharacterPattern.test(fileSpec);
            return wildcardCharacterPattern.lastIndex - 1;
        }
        
        function getEndOfPathSegment(fileSpec: string, start: number, end: number): number {
            if (start >= end) {
                return end;
            }

            let offset = fileSpec.indexOf(directorySeparator, start);
            return offset < 0 || offset > end ? end : offset;
        }
    }
}
