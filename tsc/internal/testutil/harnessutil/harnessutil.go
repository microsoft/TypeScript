package harnessutil

import (
	"fmt"
	"maps"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"strings"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

type TestFile struct {
	UnitName    string
	Content     string
	FileOptions map[string]string
}

type CompileFilesResult struct {
	Diagnostics []*ast.Diagnostic
	Program     *compiler.Program
	// !!!
}

// This maps a compiler setting to its string value, after splitting by commas,
// handling includions and exclusions, and deduplicating.
// For example, if a test file contains:
//
//	// @target: esnext, es2015
//
// Then the map will map "target" to "esnext", and another map will map "target" to "es2015".
type TestConfiguration = map[string]string

type harnessOptions struct {
	useCaseSensitiveFileNames bool
	includeBuiltFile          string
	baselineFile              string
	libFiles                  []string
	noTypesAndSymbols         bool
	captureSuggestions        bool
}

func CompileFiles(
	inputFiles []*TestFile,
	otherFiles []*TestFile,
	rawHarnessConfig TestConfiguration,
	compilerOptions *core.CompilerOptions,
	currentDirectory string,
	symlinks any,
) *CompileFilesResult {
	// originalCurrentDirectory := currentDirectory
	var options core.CompilerOptions
	if compilerOptions != nil {
		options = *compilerOptions
	}
	harnessOptions := getHarnessOptions(rawHarnessConfig)

	var typescriptVersion string

	// Parse settings
	if rawHarnessConfig != nil { // !!! Review after tsconfig parsing: why do we need this if we've already parsed ts config options in `NewCompilerTest`?
		setCompilerOptionsFromHarnessConfig(rawHarnessConfig, &options)
		typescriptVersion = rawHarnessConfig["typescriptVersion"]
	}

	useCaseSensitiveFileNames := true // !!! Get this from harness options; default to true
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

	fs := vfstest.FromMapFS(testfs, useCaseSensitiveFileNames)
	fs = bundled.WrapFS(fs)

	host := createCompilerHost(fs, &options, currentDirectory)
	result := compileFilesWithHost(host, programFileNames, &options, typescriptVersion, harnessOptions.captureSuggestions)

	return result
}

func getHarnessOptions(harnessConfig TestConfiguration) harnessOptions {
	// !!! Implement this once we have command line options
	// !!! Split and trim `libFiles` by comma here
	return harnessOptions{}
}

func setCompilerOptionsFromHarnessConfig(harnessConfig TestConfiguration, options *core.CompilerOptions) {
	for name, value := range harnessConfig {
		if value == "" {
			panic(fmt.Sprintf("Cannot have undefined value for compiler option '%s'", name))
		}
		if name == "typescriptversion" {
			continue
		}

		// !!! Implement this once we have command line options
		// const option = getCommandLineOption(name);
		// if (option) {
		// 	const errors: ts.Diagnostic[] = [];
		// 	options[option.name] = optionValue(option, value, errors);
		// 	if (errors.length > 0) {
		// 		throw new Error(`Unknown value '${value}' for compiler option '${name}'.`);
		// 	}
		// }
		// else {
		// 	throw new Error(`Unknown compiler option '${name}'.`);
		// }
		// !!! Validate that all options present in harness config are either compiler or harness options
	}
}

func createCompilerHost(fs vfs.FS, options *core.CompilerOptions, currentDirectory string) compiler.CompilerHost {
	return compiler.NewCompilerHost(options, currentDirectory, fs)
}

func compileFilesWithHost(
	host compiler.CompilerHost,
	rootFiles []string,
	options *core.CompilerOptions,
	typescriptVersion string,
	captureSuggestions bool,
) *CompileFilesResult {
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

	// establish defaults (aligns with old harness)
	if options.NewLine == core.NewLineKindNone {
		options.NewLine = core.NewLineKindCRLF
	}
	// !!!
	// if options.SkipDefaultLibCheck == core.TSUnknown {
	// 	options.SkipDefaultLibCheck = core.TSTrue
	// }
	if options.NoErrorTruncation == core.TSUnknown {
		options.NoErrorTruncation = core.TSTrue
	}

	// pre-emit/post-emit error comparison requires declaration emit twice, which can be slow. If it's unlikely to flag any error consistency issues
	// and if the test is running `skipLibCheck` - an indicator that we want the tets to run quickly - skip the before/after error comparison, too
	// skipErrorComparison := len(rootFiles) >= 100 || options.SkipLibCheck == core.TSTrue && options.Declaration == core.TSTrue
	// var preProgram *compiler.Program
	// if !skipErrorComparison {
	// !!! Need actual program for this
	// preProgram = ts.createProgram({ rootNames: rootFiles || [], options: { ...compilerOptions, configFile: compilerOptions.configFile, traceResolution: false }, host, typeScriptVersion })
	// }
	// let preErrors = preProgram && ts.getPreEmitDiagnostics(preProgram);
	// if (preProgram && captureSuggestions) {
	//     preErrors = ts.concatenate(preErrors, ts.flatMap(preProgram.getSourceFiles(), f => preProgram.getSuggestionDiagnostics(f)));
	// }

	// const program = ts.createProgram({ rootNames: rootFiles || [], options: compilerOptions, host, typeScriptVersion });
	// const emitResult = program.emit();
	// let postErrors = ts.getPreEmitDiagnostics(program);
	// if (captureSuggestions) {
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
	program := createProgram(host, options)
	var diagnostics []*ast.Diagnostic
	diagnostics = append(diagnostics, program.GetSyntacticDiagnostics(nil)...)
	diagnostics = append(diagnostics, program.GetBindDiagnostics(nil)...)
	diagnostics = append(diagnostics, program.GetSemanticDiagnostics(nil)...)
	diagnostics = append(diagnostics, program.GetGlobalDiagnostics()...)
	return &CompileFilesResult{
		Diagnostics: diagnostics,
		Program:     program,
	}
}

// !!! Temporary while we don't have the real `createProgram`
func createProgram(host compiler.CompilerHost, options *core.CompilerOptions) *compiler.Program {
	programOptions := compiler.ProgramOptions{
		RootPath:           "/", // Include all files while we don't have a way to specify root files
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

func GetFileBasedTestConfigurationDescription(config TestConfiguration) string {
	var output strings.Builder
	keys := slices.Sorted(maps.Keys(config))
	for i, key := range keys {
		if i > 0 {
			output.WriteString(", ")
		}
		fmt.Fprintf(&output, "@%s: %s", key, config[key])
	}
	return output.String()
}

func GetFileBasedTestConfigurations(settings map[string]string, option []string) []TestConfiguration {
	var optionEntries [][]string
	variationCount := 1
	for _, optionKey := range option {
		value, ok := settings[optionKey]
		if ok {
			entries := splitOptionValues(value, optionKey)
			if len(entries) > 0 {
				variationCount *= len(entries)
				if variationCount > 25 {
					panic("Provided test options exceeded the maximum number of variations: " + strings.Join(option, ", "))
				}
				optionEntries = append(optionEntries, []string{optionKey, value})
			}
		}
	}

	if len(optionEntries) == 0 {
		return nil
	}

	return computeFileBasedTestConfigurationVariations(variationCount, optionEntries)
}

func splitOptionValues(value string, option string) []string {
	if len(value) == 0 {
		return nil
	}

	star := false
	var includes []string
	var excludes []string
	for _, s := range strings.Split(value, ",") {
		s = strings.ToLower(strings.TrimSpace(s))
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

	// do nothing if the setting has no variations
	if len(includes) <= 1 && !star && len(excludes) == 0 {
		return nil
	}

	// !!! We should dedupe the variations by their normalized values instead of by name
	variations := make(map[string]struct{})

	// add (and deduplicate) all included entries
	for _, include := range includes {
		// value := getValueOfSetting(setting, include)
		variations[include] = struct{}{}
	}

	allValues := getAllValuesForOption(option)
	if star && len(allValues) > 0 {
		// add all entries
		for _, value := range allValues {
			variations[value] = struct{}{}
		}
	}

	// remove all excluded entries
	for _, exclude := range excludes {
		delete(variations, exclude)
	}

	if len(variations) == 0 {
		panic(fmt.Sprintf("Variations in test option '@%s' resulted in an empty set.", option))
	}
	return slices.Collect(maps.Keys(variations))
}

func getAllValuesForOption(option string) []string {
	// !!!
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
