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
	"sync"
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

// Posix-style path to additional test libraries
var testLibFolder = "/.lib"

type TestFile struct {
	UnitName string
	Content  string
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
	symlinks map[string]string,
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

	return CompileFilesEx(t, inputFiles, otherFiles, &harnessOptions, &compilerOptions, currentDirectory, symlinks)
}

func CompileFilesEx(
	t *testing.T,
	inputFiles []*TestFile,
	otherFiles []*TestFile,
	harnessOptions *HarnessOptions,
	compilerOptions *core.CompilerOptions,
	currentDirectory string,
	symlinks map[string]string,
) *CompilationResult {
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

	// Files from testdata\lib that are requested by "@libFiles"
	if len(harnessOptions.LibFiles) > 0 {
		for _, libFile := range harnessOptions.LibFiles {
			if libFile == "lib.d.ts" && compilerOptions.NoLib != core.TSTrue {
				// We used to override lib with a custom lib.d.ts for some reason. Skip this unless it becomes necessary.
				continue
			}
			programFileNames = append(programFileNames, tspath.CombinePaths(testLibFolder, libFile))
			otherFiles = append(otherFiles, createLibFile(libFile))
		}
	}

	// !!!
	// ts.assign(options, ts.convertToOptionsWithAbsolutePaths(options, path => ts.getNormalizedAbsolutePath(path, currentDirectory)));
	if compilerOptions.OutDir != "" {
		compilerOptions.OutDir = tspath.GetNormalizedAbsolutePath(compilerOptions.OutDir, currentDirectory)
	}
	if compilerOptions.Project != "" {
		compilerOptions.Project = tspath.GetNormalizedAbsolutePath(compilerOptions.Project, currentDirectory)
	}
	if compilerOptions.RootDir != "" {
		compilerOptions.RootDir = tspath.GetNormalizedAbsolutePath(compilerOptions.RootDir, currentDirectory)
	}
	if compilerOptions.TsBuildInfoFile != "" {
		compilerOptions.TsBuildInfoFile = tspath.GetNormalizedAbsolutePath(compilerOptions.TsBuildInfoFile, currentDirectory)
	}
	if compilerOptions.BaseUrl != "" {
		compilerOptions.BaseUrl = tspath.GetNormalizedAbsolutePath(compilerOptions.BaseUrl, currentDirectory)
	}
	if compilerOptions.DeclarationDir != "" {
		compilerOptions.DeclarationDir = tspath.GetNormalizedAbsolutePath(compilerOptions.DeclarationDir, currentDirectory)
	}
	for i, rootDir := range compilerOptions.RootDirs {
		compilerOptions.RootDirs[i] = tspath.GetNormalizedAbsolutePath(rootDir, currentDirectory)
	}
	for i, typeRoot := range compilerOptions.TypeRoots {
		compilerOptions.TypeRoots[i] = tspath.GetNormalizedAbsolutePath(typeRoot, currentDirectory)
	}

	// Create fake FS for testing
	testfs := map[string]any{}
	for _, file := range inputFiles {
		fileName := tspath.GetNormalizedAbsolutePath(file.UnitName, currentDirectory)
		testfs[fileName] = &fstest.MapFile{
			Data: []byte(file.Content),
		}
	}
	for _, file := range otherFiles {
		fileName := tspath.GetNormalizedAbsolutePath(file.UnitName, currentDirectory)
		testfs[fileName] = &fstest.MapFile{
			Data: []byte(file.Content),
		}
	}
	for src, target := range symlinks {
		srcFileName := tspath.GetNormalizedAbsolutePath(src, currentDirectory)
		targetFileName := tspath.GetNormalizedAbsolutePath(target, currentDirectory)
		testfs[srcFileName] = vfstest.Symlink(targetFileName)
	}

	fs := vfstest.FromMap(testfs, harnessOptions.UseCaseSensitiveFileNames)
	fs = bundled.WrapFS(fs)
	fs = NewOutputRecorderFS(fs)

	host := createCompilerHost(fs, bundled.LibPath(), compilerOptions, currentDirectory)
	result := compileFilesWithHost(host, programFileNames, compilerOptions, harnessOptions)
	result.Symlinks = symlinks
	result.Repeat = func(testConfig TestConfiguration) *CompilationResult {
		newHarnessOptions := *harnessOptions
		newCompilerOptions := *compilerOptions
		setOptionsFromTestConfig(t, testConfig, &newCompilerOptions, &newHarnessOptions)
		return CompileFilesEx(t, inputFiles, otherFiles, &newHarnessOptions, &newCompilerOptions, currentDirectory, symlinks)
	}
	return result
}

// Creates a test file as specified by "@libFiles".
func createLibFile(libFile string) *TestFile {
	libPath := filepath.Join(repo.TypeScriptSubmodulePath, "tests", "lib")
	libFilePath := filepath.Join(libPath, libFile)
	content, err := os.ReadFile(libFilePath)
	if err != nil {
		panic(fmt.Sprintf("Failed to read lib file %s: %v", libFile, err))
	}
	return &TestFile{
		UnitName: tspath.CombinePaths(testLibFolder, libFile),
		Content:  string(content),
	}
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
		Kind: tsoptions.CommandLineOptionTypeBoolean,
	},
	{
		Name: "baselineFile",
		Kind: tsoptions.CommandLineOptionTypeString,
	},
	{
		Name: "includeBuiltFile",
		Kind: tsoptions.CommandLineOptionTypeString,
	},
	{
		Name: "fileName",
		Kind: tsoptions.CommandLineOptionTypeString,
	},
	{
		Name: "libFiles",
		Kind: tsoptions.CommandLineOptionTypeList,
	},
	{
		Name: "noErrorTruncation",
		Kind: tsoptions.CommandLineOptionTypeBoolean,
	},
	{
		Name: "suppressOutputPathCheck",
		Kind: tsoptions.CommandLineOptionTypeBoolean,
	},
	{
		Name: "noImplicitReferences",
		Kind: tsoptions.CommandLineOptionTypeBoolean,
	},
	{
		Name: "currentDirectory",
		Kind: tsoptions.CommandLineOptionTypeString,
	},
	{
		Name: "symlink",
		Kind: tsoptions.CommandLineOptionTypeString,
	},
	{
		Name: "link",
		Kind: tsoptions.CommandLineOptionTypeString,
	},
	{
		Name: "noTypesAndSymbols",
		Kind: tsoptions.CommandLineOptionTypeBoolean,
	},
	// Emitted js baseline will print full paths for every output file
	{
		Name: "fullEmitPaths",
		Kind: tsoptions.CommandLineOptionTypeBoolean,
	},
	{
		Name: "noCheck",
		Kind: tsoptions.CommandLineOptionTypeBoolean,
	},
	// used to enable error collection in `transpile` baselines
	{
		Name: "reportDiagnostics",
		Kind: tsoptions.CommandLineOptionTypeBoolean,
	},
	// Adds suggestion diagnostics to error baselines
	{
		Name: "captureSuggestions",
		Kind: tsoptions.CommandLineOptionTypeBoolean,
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

var deprecatedModuleResolution []string = []string{"node", "classic", "node10"}

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

type cachedCompilerHost struct {
	compiler.CompilerHost
	options *core.CompilerOptions
}

var sourceFileCache sync.Map

func (h *cachedCompilerHost) GetSourceFile(fileName string, path tspath.Path, languageVersion core.ScriptTarget) *ast.SourceFile {
	text, _ := h.FS().ReadFile(fileName)

	type sourceFileCacheKey struct {
		core.SourceFileAffectingCompilerOptions
		fileName        string
		path            tspath.Path
		languageVersion core.ScriptTarget
		text            string
	}

	key := sourceFileCacheKey{
		SourceFileAffectingCompilerOptions: h.options.SourceFileAffecting(),
		fileName:                           fileName,
		path:                               path,
		languageVersion:                    languageVersion,
		text:                               text,
	}

	if cached, ok := sourceFileCache.Load(key); ok {
		return cached.(*ast.SourceFile)
	}

	// !!! dedupe with compiler.compilerHost
	var sourceFile *ast.SourceFile
	if tspath.FileExtensionIs(fileName, tspath.ExtensionJson) {
		sourceFile = parser.ParseJSONText(fileName, path, text)
	} else {
		// !!! JSDocParsingMode
		sourceFile = parser.ParseSourceFile(fileName, path, text, languageVersion, scanner.JSDocParsingModeParseAll)
	}

	result, _ := sourceFileCache.LoadOrStore(key, sourceFile)
	return result.(*ast.SourceFile)
}

func createCompilerHost(fs vfs.FS, defaultLibraryPath string, options *core.CompilerOptions, currentDirectory string) compiler.CompilerHost {
	return &cachedCompilerHost{
		CompilerHost: compiler.NewCompilerHost(options, currentDirectory, fs, defaultLibraryPath),
		options:      options,
	}
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

	// !!! Need `getPreEmitDiagnostics` program for this
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
	diagnostics = append(diagnostics, program.GetSemanticDiagnostics(nil)...)
	diagnostics = append(diagnostics, program.GetGlobalDiagnostics()...)
	emitResult := program.Emit(compiler.EmitOptions{})

	return newCompilationResult(options, program, emitResult, diagnostics, harnessOptions)
}

type CompilationResult struct {
	Diagnostics      []*ast.Diagnostic
	Result           *compiler.EmitResult
	Program          *compiler.Program
	Options          *core.CompilerOptions
	HarnessOptions   *HarnessOptions
	Js               collections.OrderedMap[string, *TestFile]
	Dts              collections.OrderedMap[string, *TestFile]
	Maps             collections.OrderedMap[string, *TestFile]
	Symlinks         map[string]string
	Repeat           func(TestConfiguration) *CompilationResult
	outputs          []*TestFile
	inputs           []*TestFile
	inputsAndOutputs collections.OrderedMap[string, *CompilationOutput]
}

type CompilationOutput struct {
	Inputs []*TestFile
	Js     *TestFile
	Dts    *TestFile
	Map    *TestFile
}

func newCompilationResult(
	options *core.CompilerOptions,
	program *compiler.Program,
	result *compiler.EmitResult,
	diagnostics []*ast.Diagnostic,
	harnessOptions *HarnessOptions,
) *CompilationResult {
	if program != nil {
		options = program.Options()
	}

	c := &CompilationResult{
		Diagnostics:    diagnostics,
		Result:         result,
		Program:        program,
		Options:        options,
		HarnessOptions: harnessOptions,
	}

	fs := program.Host().FS().(*OutputRecorderFS)
	if fs != nil && program != nil {
		// Corsa, unlike Strada, can use multiple threads for emit. As a result, the order of outputs is non-deterministic.
		// To make the order deterministic, we sort the outputs by the order of the inputs.
		var js, dts, maps collections.OrderedMap[string, *TestFile]
		for _, document := range fs.Outputs() {
			if tspath.HasJSFileExtension(document.UnitName) ||
				tspath.HasJSONFileExtension(document.UnitName) {
				js.Set(document.UnitName, document)
			} else if tspath.IsDeclarationFileName(document.UnitName) {
				dts.Set(document.UnitName, document)
			} else if tspath.FileExtensionIs(document.UnitName, ".map") {
				maps.Set(document.UnitName, document)
			}
		}

		if options.OutFile != "" {
			/// !!! options.OutFile not yet supported
		} else {
			// using the order from the inputs, populate the outputs
			for _, sourceFile := range program.GetSourceFiles() {
				input := &TestFile{UnitName: sourceFile.FileName(), Content: sourceFile.Text}
				c.inputs = append(c.inputs, input)
				if !tspath.IsDeclarationFileName(sourceFile.FileName()) {
					extname := core.GetOutputExtension(sourceFile.FileName(), options.Jsx)
					outputs := &CompilationOutput{
						Inputs: []*TestFile{input},
						Js:     js.GetOrZero(c.getOutputPath(sourceFile.FileName(), extname)),
						Dts:    dts.GetOrZero(c.getOutputPath(sourceFile.FileName(), tspath.GetDeclarationEmitExtensionForPath(sourceFile.FileName()))),
						Map:    maps.GetOrZero(c.getOutputPath(sourceFile.FileName(), extname+".map")),
					}
					c.inputsAndOutputs.Set(sourceFile.FileName(), outputs)
					if outputs.Js != nil {
						c.inputsAndOutputs.Set(outputs.Js.UnitName, outputs)
						c.Js.Set(outputs.Js.UnitName, outputs.Js)
						js.Delete(outputs.Js.UnitName)
						c.outputs = append(c.outputs, outputs.Js)
					}
					if outputs.Dts != nil {
						c.inputsAndOutputs.Set(outputs.Dts.UnitName, outputs)
						c.Dts.Set(outputs.Dts.UnitName, outputs.Dts)
						dts.Delete(outputs.Dts.UnitName)
						c.outputs = append(c.outputs, outputs.Dts)
					}
					if outputs.Map != nil {
						c.inputsAndOutputs.Set(outputs.Map.UnitName, outputs)
						c.Maps.Set(outputs.Map.UnitName, outputs.Map)
						maps.Delete(outputs.Map.UnitName)
						c.outputs = append(c.outputs, outputs.Map)
					}
				}
			}
		}

		// add any unhandled outputs, ordered by unit name
		for _, document := range slices.SortedFunc(js.Values(), compareTestFiles) {
			c.Js.Set(document.UnitName, document)
		}
		for _, document := range slices.SortedFunc(dts.Values(), compareTestFiles) {
			c.Dts.Set(document.UnitName, document)
		}
		for _, document := range slices.SortedFunc(maps.Values(), compareTestFiles) {
			c.Maps.Set(document.UnitName, document)
		}
	}

	return c
}

func compareTestFiles(a *TestFile, b *TestFile) int {
	return strings.Compare(a.UnitName, b.UnitName)
}

func (c *CompilationResult) getOutputPath(path string, ext string) string {
	if c.Options.OutFile != "" {
		/// !!! options.OutFile not yet supported
	} else {
		path = tspath.ResolvePath(c.Program.Host().GetCurrentDirectory(), path)
		var outDir string
		if ext == ".d.ts" || ext == ".d.mts" || ext == ".d.cts" || (strings.HasSuffix(ext, ".ts") && strings.Contains(ext, ".d.")) {
			outDir = c.Options.DeclarationDir
			if outDir == "" {
				outDir = c.Options.OutDir
			}
		} else {
			outDir = c.Options.OutDir
		}
		if outDir != "" {
			common := c.Program.CommonSourceDirectory()
			if common != "" {
				path = tspath.GetRelativePathFromDirectory(common, path, tspath.ComparePathsOptions{
					UseCaseSensitiveFileNames: c.Program.Host().FS().UseCaseSensitiveFileNames(),
					CurrentDirectory:          c.Program.Host().GetCurrentDirectory(),
				})
				path = tspath.CombinePaths(tspath.ResolvePath(c.Program.Host().GetCurrentDirectory(), c.Options.OutDir), path)
			}
		}
	}
	return tspath.ChangeExtension(path, ext)
}

func (r *CompilationResult) FS() vfs.FS {
	return r.Program.Host().FS()
}

func (r *CompilationResult) GetNumberOfJSFiles(includeJson bool) int {
	if includeJson {
		return r.Js.Size()
	}
	count := 0
	for file := range r.Js.Values() {
		if !tspath.FileExtensionIs(file.UnitName, tspath.ExtensionJson) {
			count++
		}
	}
	return count
}

func (c *CompilationResult) Inputs() []*TestFile {
	return c.inputs
}

func (c *CompilationResult) Outputs() []*TestFile {
	return c.outputs
}

func (c *CompilationResult) GetInputsAndOutputsForFile(path string) *CompilationOutput {
	return c.inputsAndOutputs.GetOrZero(tspath.ResolvePath(c.Program.Host().GetCurrentDirectory(), path))
}

func (c *CompilationResult) GetInputsForFile(path string) []*TestFile {
	outputs := c.GetInputsAndOutputsForFile(path)
	if outputs != nil {
		return outputs.Inputs
	}
	return nil
}

func (c *CompilationResult) GetOutput(path string, kind string /*"js" | "dts" | "map"*/) *TestFile {
	outputs := c.GetInputsAndOutputsForFile(path)
	if outputs != nil {
		switch kind {
		case "js":
			return outputs.Js
		case "dts":
			return outputs.Dts
		case "map":
			return outputs.Map
		}
	}
	return nil
}

func createProgram(host compiler.CompilerHost, options *core.CompilerOptions, rootFiles []string) *compiler.Program {
	programOptions := compiler.ProgramOptions{
		RootFiles:      rootFiles,
		Host:           host,
		Options:        options,
		SingleThreaded: testutil.TestProgramIsSingleThreaded(),
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
		path := tspath.NormalizePath(filepath.Join(folder, entry.Name()))
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
			output.WriteString(",")
		}
		fmt.Fprintf(&output, "%s=%s", key, strings.ToLower(config[key]))
	}
	return output.String()
}

func GetFileBasedTestConfigurations(t *testing.T, settings map[string]string, varyByOptions map[string]struct{}) []*NamedTestConfiguration {
	var optionEntries [][]string // Each element slice has the option name as the first element, and the values as the rest
	variationCount := 1
	nonVaryingOptions := make(map[string]string)
	for option, value := range settings {
		if _, ok := varyByOptions[option]; ok {
			entries := splitOptionValues(t, value, option)
			if len(entries) > 1 {
				variationCount *= len(entries)
				if variationCount > 25 {
					t.Fatal("Provided test options exceeded the maximum number of variations")
				}
				optionEntries = append(optionEntries, append([]string{option}, entries...))
			} else if len(entries) == 1 {
				nonVaryingOptions[option] = entries[0]
			}
		} else {
			// Variation is not supported for the option
			nonVaryingOptions[option] = value
		}
	}

	var configurations []*NamedTestConfiguration
	if len(optionEntries) > 0 {
		// Merge varying and non-varying options
		varyingConfigurations := computeFileBasedTestConfigurationVariations(variationCount, optionEntries)
		for _, varyingConfig := range varyingConfigurations {
			description := getFileBasedTestConfigurationDescription(varyingConfig)
			maps.Copy(varyingConfig, nonVaryingOptions)
			configurations = append(configurations, &NamedTestConfiguration{description, varyingConfig})
		}
	} else if len(nonVaryingOptions) > 0 {
		// Only non-varying options
		configurations = append(configurations, &NamedTestConfiguration{"", nonVaryingOptions})
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
		if _, ok := variations[value]; !ok {
			variations[value] = include
		}
	}

	allValues := getAllValuesForOption(option)
	if star && len(allValues) > 0 {
		// add all entries
		for _, include := range allValues {
			value := getValueOfOptionString(t, option, include)
			if _, ok := variations[value]; !ok {
				variations[value] = include
			}
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
	// TODO(gabritto): remove this when we deprecate the tests containing those option values
	if optionDecl.Name == "moduleResolution" && slices.Contains(deprecatedModuleResolution, strings.ToLower(value)) {
		return value
	}
	return getOptionValue(t, optionDecl, value)
}

func getCommandLineOption(option string) *tsoptions.CommandLineOption {
	return core.Find(tsoptions.OptionsDeclarations, func(optionDecl *tsoptions.CommandLineOption) bool {
		return strings.EqualFold(optionDecl.Name, option)
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
