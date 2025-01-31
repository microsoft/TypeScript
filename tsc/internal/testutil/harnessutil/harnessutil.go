package harnessutil

import (
	"fmt"
	"maps"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"strconv"
	"strings"
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

type TestFile struct {
	UnitName string
	Content  string
}

type CompilationResult struct {
	Diagnostics    []*ast.Diagnostic
	Program        *compiler.Program
	Options        *core.CompilerOptions
	HarnessOptions *HarnessOptions
	// !!! outputs
}

// This maps a compiler setting to its string value, after splitting by commas,
// handling inclusions and exclusions, and deduplicating.
// For example, if a test file contains:
//
//	// @target: esnext, es2015
//
// Then the map will map "target" to "esnext", and another map will map "target" to "es2015".
type TestConfiguration = map[string]string

type NamedTestConfiguration struct {
	Name   string
	Config TestConfiguration
}

type HarnessOptions struct {
	AllowNonTsExtensions      bool
	UseCaseSensitiveFileNames bool
	BaselineFile              string
	IncludeBuiltFile          string
	FileName                  string
	LibFiles                  []string
	NoErrorTruncation         bool
	SuppressOutputPathCheck   bool
	NoImplicitReferences      bool
	CurrentDirectory          string
	Symlink                   string
	Link                      string
	NoTypesAndSymbols         bool
	FullEmitPaths             bool
	NoCheck                   bool
	ReportDiagnostics         bool
	CaptureSuggestions        bool
	TypescriptVersion         string
}

func CompileFiles(
	t *testing.T,
	inputFiles []*TestFile,
	otherFiles []*TestFile,
	testConfig TestConfiguration,
	tsconfigOptions *core.CompilerOptions,
	currentDirectory string,
	symlinks any,
) *CompilationResult {
	var compilerOptions core.CompilerOptions
	if tsconfigOptions != nil {
		compilerOptions = *tsconfigOptions
	}
	// Set default options for tests
	if compilerOptions.NewLine == core.NewLineKindNone {
		compilerOptions.NewLine = core.NewLineKindCRLF
	}
	if compilerOptions.SkipDefaultLibCheck == core.TSUnknown {
		compilerOptions.SkipDefaultLibCheck = core.TSTrue
	}
	compilerOptions.NoErrorTruncation = core.TSTrue
	harnessOptions := HarnessOptions{UseCaseSensitiveFileNames: true, CurrentDirectory: currentDirectory}

	// Parse harness and compiler options from the test configuration
	if testConfig != nil {
		setOptionsFromTestConfig(t, testConfig, &compilerOptions, &harnessOptions)
	}

	var programFileNames []string
	for _, file := range inputFiles {
		fileName := tspath.GetNormalizedAbsolutePath(file.UnitName, currentDirectory)

		if !tspath.FileExtensionIs(fileName, tspath.ExtensionJson) {
			programFileNames = append(programFileNames, fileName)
		}
	}

	// !!! Note: lib files are not going to be in `built/local`.
	// In addition, not all files that used to be in `built/local` are going to exist.
	// Files from built\local that are requested by test "@includeBuiltFiles" to be in the context.
	// Treat them as library files, so include them in build, but not in baselines.
	// if harnessOptions.includeBuiltFile != "" {
	// 	programFileNames = append(programFileNames, tspath.CombinePaths(builtFolder, harnessOptions.includeBuiltFile))
	// }

	// !!! This won't work until we have the actual lib files
	// // Files from tests\lib that are requested by "@libFiles"
	// if len(harnessOptions.libFiles) > 0 {
	// 	for _, libFile := range harnessOptions.libFiles {
	// 		programFileNames = append(programFileNames, tspath.CombinePaths(testLibFolder, libFile))
	// 	}
	// }

	// !!!
	// docs := append(inputFiles, otherFiles...) // !!! Convert to `TextDocument`
	// const fs = vfs.createFromFileSystem(IO, !useCaseSensitiveFileNames, { documents: docs, cwd: currentDirectory });
	// if (symlinks) {
	// 	fs.apply(symlinks);
	// }

	// ts.assign(options, ts.convertToOptionsWithAbsolutePaths(options, path => ts.getNormalizedAbsolutePath(path, currentDirectory)));

	// !!! Port vfs usage closer to original

	// Create fake FS for testing
	// Note: the code below assumes a single root, since an FS in Go always has a single root.
	testfs := fstest.MapFS{}
	for _, file := range inputFiles {
		fileName := tspath.GetNormalizedAbsolutePath(file.UnitName, currentDirectory)
		rootLen := tspath.GetRootLength(fileName)
		fileName = fileName[rootLen:]
		testfs[fileName] = &fstest.MapFile{
			Data: []byte(file.Content),
		}
	}
	for _, file := range otherFiles {
		fileName := tspath.GetNormalizedAbsolutePath(file.UnitName, currentDirectory)
		rootLen := tspath.GetRootLength(fileName)
		fileName = fileName[rootLen:]
		testfs[fileName] = &fstest.MapFile{
			Data: []byte(file.Content),
		}
	}

	fs := vfstest.FromMapFS(testfs, harnessOptions.UseCaseSensitiveFileNames)
	fs = bundled.WrapFS(fs)

	host := createCompilerHost(fs, &compilerOptions, currentDirectory)
	result := compileFilesWithHost(host, programFileNames, &compilerOptions, &harnessOptions)

	return result
}

func setOptionsFromTestConfig(t *testing.T, testConfig TestConfiguration, compilerOptions *core.CompilerOptions, harnessOptions *HarnessOptions) {
	for name, value := range testConfig {
		if name == "typescriptversion" {
			continue
		}

		commandLineOption := getCommandLineOption(name)
		if commandLineOption != nil {
			parsedValue := getOptionValue(t, commandLineOption, value)
			errors := tsoptions.ParseCompilerOptions(commandLineOption.Name, parsedValue, compilerOptions)
			if len(errors) > 0 {
				t.Fatalf("Error parsing value '%s' for compiler option '%s'.", value, commandLineOption.Name)
			}
			continue
		}
		harnessOption := getHarnessOption(name)
		if harnessOption != nil {
			parsedValue := getOptionValue(t, harnessOption, value)
			parseHarnessOption(t, harnessOption.Name, parsedValue, harnessOptions)
			continue
		}

		t.Fatalf("Unknown compiler option '%s'.", name)
	}
}

var harnessCommandLineOptions = []*tsoptions.CommandLineOption{
	{
		Name: "allowNonTsExtensions",
		Kind: tsoptions.CommandLineOptionTypeBoolean,
	},
	{
		Name: "useCaseSensitiveFileNames",
		Kind: "boolean",
	},
	{
		Name: "baselineFile",
		Kind: "string",
	},
	{
		Name: "includeBuiltFile",
		Kind: "string",
	},
	{
		Name: "fileName",
		Kind: "string",
	},
	{
		Name: "libFiles",
		Kind: "string",
	},
	{
		Name: "noErrorTruncation",
		Kind: "boolean",
	},
	{
		Name: "suppressOutputPathCheck",
		Kind: "boolean",
	},
	{
		Name: "noImplicitReferences",
		Kind: "boolean",
	},
	{
		Name: "currentDirectory",
		Kind: "string",
	},
	{
		Name: "symlink",
		Kind: "string",
	},
	{
		Name: "link",
		Kind: "string",
	},
	{
		Name: "noKindsAndSymbols",
		Kind: "boolean",
	},
	// Emitted js baseline will print full paths for every output file
	{
		Name: "fullEmitPaths",
		Kind: "boolean",
	},
	{
		Name: "noCheck",
		Kind: "boolean",
	},
	// used to enable error collection in `transpile` baselines
	{
		Name: "reportDiagnostics",
		Kind: "boolean",
	},
	// Adds suggestion diagnostics to error baselines
	{
		Name: "captureSuggestions",
		Kind: "boolean",
	},
}

func getHarnessOption(name string) *tsoptions.CommandLineOption {
	return core.Find(harnessCommandLineOptions, func(option *tsoptions.CommandLineOption) bool {
		return strings.ToLower(option.Name) == strings.ToLower(name)
	})
}

func parseHarnessOption(t *testing.T, key string, value any, options *HarnessOptions) {
	switch key {
	case "allowNonTsExtensions":
		options.AllowNonTsExtensions = value.(bool)
	case "useCaseSensitiveFileNames":
		options.UseCaseSensitiveFileNames = value.(bool)
	case "baselineFile":
		options.BaselineFile = value.(string)
	case "includeBuiltFile":
		options.IncludeBuiltFile = value.(string)
	case "fileName":
		options.FileName = value.(string)
	case "libFiles":
		options.LibFiles = value.([]string)
	case "noErrorTruncation":
		options.NoErrorTruncation = value.(bool)
	case "suppressOutputPathCheck":
		options.SuppressOutputPathCheck = value.(bool)
	case "noImplicitReferences":
		options.NoImplicitReferences = value.(bool)
	case "currentDirectory":
		options.CurrentDirectory = value.(string)
	case "symlink":
		options.Symlink = value.(string)
	case "link":
		options.Link = value.(string)
	case "noTypesAndSymbols":
		options.NoTypesAndSymbols = value.(bool)
	case "fullEmitPaths":
		options.FullEmitPaths = value.(bool)
	case "noCheck":
		options.NoCheck = value.(bool)
	case "reportDiagnostics":
		options.ReportDiagnostics = value.(bool)
	case "captureSuggestions":
		options.CaptureSuggestions = value.(bool)
	case "typescriptVersion":
		options.TypescriptVersion = value.(string)
	default:
		t.Fatalf("Unknown harness option '%s'.", key)
	}
}

func getOptionValue(t *testing.T, option *tsoptions.CommandLineOption, value string) tsoptions.CompilerOptionsValue {
	switch option.Kind {
	case tsoptions.CommandLineOptionTypeString:
		return value
	case tsoptions.CommandLineOptionTypeNumber:
		numVal, err := strconv.Atoi(value)
		if err != nil {
			t.Fatalf("Value for option '%s' must be a number, got: %v", option.Name, value)
		}
		return numVal
	case tsoptions.CommandLineOptionTypeBoolean:
		switch strings.ToLower(value) {
		case "true":
			return true
		case "false":
			return false
		default:
			t.Fatalf("Value for option '%s' must be a boolean, got: %v", option.Name, value)
		}
	case tsoptions.CommandLineOptionTypeEnum:
		enumVal, ok := option.EnumMap().Get(strings.ToLower(value))
		if !ok {
			t.Fatalf("Value for option '%s' must be one of %s, got: %v", option.Name, strings.Join(slices.Collect(option.EnumMap().Keys()), ","), value)
		}
		return enumVal
	case tsoptions.CommandLineOptionTypeList, tsoptions.CommandLineOptionTypeListOrElement:
		listVal, errors := tsoptions.ParseListTypeOption(option, value)
		if len(errors) > 0 {
			t.Fatalf("Unknown value '%s' for compiler option '%s'", value, option.Name)
		}
		return listVal
	case tsoptions.CommandLineOptionTypeObject:
		t.Fatalf("Object type options like '%s' are not supported", option.Name)
	}
	return nil
}

func createCompilerHost(fs vfs.FS, options *core.CompilerOptions, currentDirectory string) compiler.CompilerHost {
	return compiler.NewCompilerHost(options, currentDirectory, fs)
}

func compileFilesWithHost(
	host compiler.CompilerHost,
	rootFiles []string,
	options *core.CompilerOptions,
	harnessOptions *HarnessOptions,
) *CompilationResult {
	// !!!
	// if (compilerOptions.project || !rootFiles || rootFiles.length === 0) {
	// 	const project = readProject(host.parseConfigHost, compilerOptions.project, compilerOptions);
	// 	if (project) {
	// 		if (project.errors && project.errors.length > 0) {
	// 			return new CompilationResult(host, compilerOptions, /*program*/ undefined, /*result*/ undefined, project.errors);
	// 		}
	// 		if (project.config) {
	// 			rootFiles = project.config.fileNames;
	// 			compilerOptions = project.config.options;
	// 		}
	// 	}
	// 	delete compilerOptions.project;
	// }

	// !!! Need actual `createProgram` and `getPreEmitDiagnostics` program for this
	// pre-emit/post-emit error comparison requires declaration emit twice, which can be slow. If it's unlikely to flag any error consistency issues
	// and if the test is running `skipLibCheck` - an indicator that we want the tets to run quickly - skip the before/after error comparison, too
	// skipErrorComparison := len(rootFiles) >= 100 || options.SkipLibCheck == core.TSTrue && options.Declaration == core.TSTrue
	// var preProgram *compiler.Program
	// if !skipErrorComparison {
	// preProgram = ts.createProgram({ rootNames: rootFiles || [], options: { ...compilerOptions, configFile: compilerOptions.configFile, traceResolution: false }, host, typeScriptVersion })
	// }
	// let preErrors = preProgram && ts.getPreEmitDiagnostics(preProgram);
	// if (preProgram && harnessOptions.captureSuggestions) {
	//     preErrors = ts.concatenate(preErrors, ts.flatMap(preProgram.getSourceFiles(), f => preProgram.getSuggestionDiagnostics(f)));
	// }

	// const program = ts.createProgram({ rootNames: rootFiles || [], options: compilerOptions, host, harnessOptions.typeScriptVersion });
	// const emitResult = program.emit();
	// let postErrors = ts.getPreEmitDiagnostics(program);
	// !!! Need `getSuggestionDiagnostics` for this
	// if (harnessOptions.captureSuggestions) {
	//     postErrors = ts.concatenate(postErrors, ts.flatMap(program.getSourceFiles(), f => program.getSuggestionDiagnostics(f)));
	// }
	// const longerErrors = ts.length(preErrors) > postErrors.length ? preErrors : postErrors;
	// const shorterErrors = longerErrors === preErrors ? postErrors : preErrors;
	// const errors = preErrors && (preErrors.length !== postErrors.length) ? [
	//     ...shorterErrors!,
	//     ts.addRelatedInfo(
	//         ts.createCompilerDiagnostic({
	//             category: ts.DiagnosticCategory.Error,
	//             code: -1,
	//             key: "-1",
	//             message: `Pre-emit (${preErrors.length}) and post-emit (${postErrors.length}) diagnostic counts do not match! This can indicate that a semantic _error_ was added by the emit resolver - such an error may not be reflected on the command line or in the editor, but may be captured in a baseline here!`,
	//         }),
	//         ts.createCompilerDiagnostic({
	//             category: ts.DiagnosticCategory.Error,
	//             code: -1,
	//             key: "-1",
	//             message: `The excess diagnostics are:`,
	//         }),
	//         ...ts.filter(longerErrors!, p => !ts.some(shorterErrors, p2 => ts.compareDiagnostics(p, p2) === ts.Comparison.EqualTo)),
	//     ),
	// ] : postErrors;
	program := createProgram(host, options, rootFiles)
	var diagnostics []*ast.Diagnostic
	diagnostics = append(diagnostics, program.GetSyntacticDiagnostics(nil)...)
	diagnostics = append(diagnostics, program.GetBindDiagnostics(nil)...)
	diagnostics = append(diagnostics, program.GetSemanticDiagnostics(nil)...)
	diagnostics = append(diagnostics, program.GetGlobalDiagnostics()...)

	return newCompilationResult(options, program, diagnostics, harnessOptions)
}

func newCompilationResult(
	options *core.CompilerOptions,
	program *compiler.Program,
	diagnostics []*ast.Diagnostic,
	harnessOptions *HarnessOptions,
) *CompilationResult {
	if program != nil {
		options = program.Options()
	}
	// !!! Collect compilation outputs (js, dts, source maps)
	return &CompilationResult{
		Diagnostics:    diagnostics,
		Program:        program,
		Options:        options,
		HarnessOptions: harnessOptions,
	}
}

// !!! Temporary while we don't have the real `createProgram`
func createProgram(host compiler.CompilerHost, options *core.CompilerOptions, rootFiles []string) *compiler.Program {
	programOptions := compiler.ProgramOptions{
		RootFiles:          rootFiles,
		Host:               host,
		Options:            options,
		DefaultLibraryPath: bundled.LibPath(),
	}
	program := compiler.NewProgram(programOptions)
	return program
}

func EnumerateFiles(folder string, testRegex *regexp.Regexp, recursive bool) ([]string, error) {
	files, err := listFiles(folder, testRegex, recursive)
	if err != nil {
		return nil, err
	}
	return core.Map(files, tspath.NormalizeSlashes), nil
}

func listFiles(path string, spec *regexp.Regexp, recursive bool) ([]string, error) {
	return listFilesWorker(spec, recursive, path)
}

func listFilesWorker(spec *regexp.Regexp, recursive bool, folder string) ([]string, error) {
	folder = tspath.GetNormalizedAbsolutePath(folder, repo.TestDataPath)
	entries, err := os.ReadDir(folder)
	if err != nil {
		return nil, err
	}
	var paths []string
	for _, entry := range entries {
		path := filepath.Join(folder, entry.Name())
		if !entry.IsDir() {
			if spec == nil || spec.MatchString(path) {
				paths = append(paths, path)
			}
		} else if recursive {
			subPaths, err := listFilesWorker(spec, recursive, path)
			if err != nil {
				return nil, err
			}
			paths = append(paths, subPaths...)
		}
	}
	return paths, nil
}

func getFileBasedTestConfigurationDescription(config TestConfiguration) string {
	var output strings.Builder
	keys := slices.Sorted(maps.Keys(config))
	for i, key := range keys {
		if i > 0 {
			output.WriteString(", ")
		}
		fmt.Fprintf(&output, "%s=%s", key, config[key])
	}
	return output.String()
}

func GetFileBasedTestConfigurations(t *testing.T, settings map[string]string, varyByOptions map[string]struct{}) []*NamedTestConfiguration {
	var optionEntries [][]string // Each element slice has the option name as the first element, and the values as the rest
	variationCount := 1
	nonVariyingOptions := make(map[string]string)
	for option, value := range settings {
		if _, ok := varyByOptions[option]; ok {
			entries := splitOptionValues(t, value, option)
			if len(entries) > 0 {
				variationCount *= len(entries)
				if variationCount > 25 {
					t.Fatal("Provided test options exceeded the maximum number of variations")
				}
				optionEntries = append(optionEntries, append([]string{option}, entries...))
			}
		} else {
			// Variation is not supported for the option
			nonVariyingOptions[option] = value
		}
	}

	var configurations []*NamedTestConfiguration
	if len(optionEntries) > 0 {
		// Merge varying and non-varying options
		varyingConfigurations := computeFileBasedTestConfigurationVariations(variationCount, optionEntries)
		for _, varyingConfig := range varyingConfigurations {
			description := getFileBasedTestConfigurationDescription(varyingConfig)
			for key, value := range nonVariyingOptions {
				varyingConfig[key] = value
			}
			configurations = append(configurations, &NamedTestConfiguration{description, varyingConfig})
		}
	} else if len(nonVariyingOptions) > 0 {
		// Only non-varying options
		configurations = append(configurations, &NamedTestConfiguration{"", nonVariyingOptions})
	}
	return configurations
}

// Splits a string value into an array of strings, each corresponding to a unique value for the given option.
// Also handles the `*` value, which includes all possible values for the option, and exclusions using `-` or `!`.
// ```
//
//	splitOptionValues("esnext, es2015, es6", "target") => ["esnext", "es2015"]
//	splitOptionValues("*", "strict") => ["true", "false"]
//	splitOptionValues("*, -true", "strict") => ["false"]
//
// ```
func splitOptionValues(t *testing.T, value string, option string) []string {
	if len(value) == 0 {
		return nil
	}

	star := false
	var includes []string
	var excludes []string
	for _, s := range strings.Split(value, ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 {
			continue
		}
		if s == "*" {
			star = true
		} else if strings.HasPrefix(s, "-") || strings.HasPrefix(s, "!") {
			excludes = append(excludes, s[1:])
		} else {
			includes = append(includes, s)
		}
	}

	if len(includes) == 0 && !star && len(excludes) == 0 {
		return nil
	}

	// Dedupe the variations by their normalized values
	variations := make(map[tsoptions.CompilerOptionsValue]string)

	// add (and deduplicate) all included entries
	for _, include := range includes {
		value := getValueOfOptionString(t, option, include)
		variations[value] = include
	}

	allValues := getAllValuesForOption(option)
	if star && len(allValues) > 0 {
		// add all entries
		for _, include := range allValues {
			value := getValueOfOptionString(t, option, include)
			variations[value] = include
		}
	}

	// remove all excluded entries
	for _, exclude := range excludes {
		value := getValueOfOptionString(t, option, exclude)
		delete(variations, value)
	}

	if len(variations) == 0 {
		panic(fmt.Sprintf("Variations in test option '@%s' resulted in an empty set.", option))
	}
	return slices.Collect(maps.Values(variations))
}

func getValueOfOptionString(t *testing.T, option string, value string) tsoptions.CompilerOptionsValue {
	optionDecl := getCommandLineOption(option)
	if optionDecl == nil {
		t.Fatalf("Unknown option '%s'", option)
	}
	return getOptionValue(t, optionDecl, value)
}

func getCommandLineOption(option string) *tsoptions.CommandLineOption {
	return core.Find(tsoptions.OptionsDeclarations, func(optionDecl *tsoptions.CommandLineOption) bool {
		return strings.ToLower(optionDecl.Name) == strings.ToLower(option)
	})
}

func getAllValuesForOption(option string) []string {
	optionDecl := getCommandLineOption(option)
	if optionDecl == nil {
		return nil
	}
	switch optionDecl.Kind {
	case tsoptions.CommandLineOptionTypeEnum:
		return slices.Collect(optionDecl.EnumMap().Keys())
	case tsoptions.CommandLineOptionTypeBoolean:
		return []string{"true", "false"}
	}
	return nil
}

func computeFileBasedTestConfigurationVariations(variationCount int, optionEntries [][]string) []TestConfiguration {
	configurations := make([]TestConfiguration, 0, variationCount)
	computeFileBasedTestConfigurationVariationsWorker(&configurations, optionEntries, 0, make(map[string]string))
	return configurations
}

func computeFileBasedTestConfigurationVariationsWorker(
	configurations *[]TestConfiguration,
	optionEntries [][]string,
	index int,
	variationState TestConfiguration,
) {
	if index >= len(optionEntries) {
		*configurations = append(*configurations, maps.Clone(variationState))
		return
	}

	optionKey := optionEntries[index][0]
	entries := optionEntries[index][1:]
	for _, entry := range entries {
		// set or overwrite the variation, then compute the next variation
		variationState[optionKey] = entry
		computeFileBasedTestConfigurationVariationsWorker(configurations, optionEntries, index+1, variationState)
	}
}

func GetConfigNameFromFileName(filename string) string {
	basenameLower := strings.ToLower(tspath.GetBaseFileName(filename))
	if basenameLower == "tsconfig.json" || basenameLower == "jsconfig.json" {
		return basenameLower
	}
	return ""
}
