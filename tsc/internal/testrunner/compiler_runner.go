package runner

import (
	"fmt"
	"math/rand/v2"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/testutil/tsbaseline"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

var (
	compilerBaselineRegex = regexp.MustCompile(`\.tsx?$`)
	requireStr            = "require("
	referencesRegex       = regexp.MustCompile(`reference\spath`)
)

// Posix-style path to sources under test
var srcFolder = "/.src"

type CompilerTestType int

const (
	TestTypeConformance CompilerTestType = iota
	TestTypeRegression
)

func (t *CompilerTestType) String() string {
	if *t == TestTypeRegression {
		return "compiler"
	}
	return "conformance"
}

type CompilerBaselineRunner struct {
	isSubmodule  bool
	testFiles    []string
	basePath     string
	testSuitName string
}

var _ Runner = (*CompilerBaselineRunner)(nil)

func NewCompilerBaselineRunner(testType CompilerTestType, isSubmodule bool) *CompilerBaselineRunner {
	testSuitName := testType.String()
	var basePath string
	if isSubmodule {
		basePath = "../_submodules/TypeScript/tests/cases/" + testSuitName
	} else {
		basePath = "tests/cases/" + testSuitName
	}
	return &CompilerBaselineRunner{
		basePath:     basePath,
		testSuitName: testSuitName,
		isSubmodule:  isSubmodule,
	}
}

func (r *CompilerBaselineRunner) EnumerateTestFiles() []string {
	if len(r.testFiles) > 0 {
		return r.testFiles
	}
	files, err := harnessutil.EnumerateFiles(r.basePath, compilerBaselineRegex, true /*recursive*/)
	if err != nil {
		panic("Could not read compiler test files: " + err.Error())
	}
	r.testFiles = files
	return files
}

func (r *CompilerBaselineRunner) RunTests(t *testing.T) {
	r.cleanUpLocal(t)
	files := r.EnumerateTestFiles()
	skippedTests := map[string]string{
		"mappedTypeRecursiveInference.ts":         "Skipped until we have type printer with truncation limit.",
		"jsFileCompilationWithoutJsExtensions.ts": "Skipped until we have proper allowJS support (and errors when not enabled.)",
		"fileReferencesWithNoExtensions.ts":       "Skipped until we support adding missing extensions in subtasks in fileloader.go",
		"typeOnlyMerge2.ts":                       "Needs investigation",
		"typeOnlyMerge3.ts":                       "Needs investigation",
		"filesEmittingIntoSameOutput.ts":          "Output order nondeterministic due to collision on filename during parallel emit.",
	}
	deprecatedTests := []string{
		// Test deprecated `importsNotUsedAsValue`
		"preserveUnusedImports.ts",
		"noCrashWithVerbatimModuleSyntaxAndImportsNotUsedAsValues.ts",
		"verbatimModuleSyntaxCompat.ts",
		"preserveValueImports_importsNotUsedAsValues.ts",
		"importsNotUsedAsValues_error.ts",
	}
	for _, filename := range files {
		if msg, ok := skippedTests[tspath.GetBaseFileName(filename)]; ok {
			t.Run(tspath.GetBaseFileName(filename), func(t *testing.T) { t.Skip(msg) })
			continue
		}
		if slices.Contains(deprecatedTests, tspath.GetBaseFileName(filename)) {
			continue
		}
		r.runTest(t, filename)
	}
}

var localBasePath = filepath.Join(repo.TestDataPath, "baselines", "local")

func (r *CompilerBaselineRunner) cleanUpLocal(t *testing.T) {
	localPath := filepath.Join(localBasePath, core.IfElse(r.isSubmodule, "diff", ""), r.testSuitName)
	err := os.RemoveAll(localPath)
	if err != nil {
		panic("Could not clean up local compiler tests: " + err.Error())
	}
}

// Set of compiler options for which we allow variations to be specified in the test file,
// for instance `// @strict: true, false`.
var compilerVaryBy map[string]struct{} = getCompilerVaryByMap()

func getCompilerVaryByMap() map[string]struct{} {
	varyByOptions := append(
		core.Map(core.Filter(tsoptions.OptionsDeclarations, func(option *tsoptions.CommandLineOption) bool {
			return !option.IsCommandLineOnly &&
				(option.Kind == tsoptions.CommandLineOptionTypeBoolean || option.Kind == tsoptions.CommandLineOptionTypeEnum) &&
				(option.AffectsProgramStructure ||
					option.AffectsEmit ||
					option.AffectsModuleResolution ||
					option.AffectsBindDiagnostics ||
					option.AffectsSemanticDiagnostics ||
					option.AffectsSourceFile ||
					option.AffectsDeclarationPath ||
					option.AffectsBuildInfo)
		}), func(option *tsoptions.CommandLineOption) string {
			return option.Name
		}),
		// explicit variations that do not match above conditions
		"noEmit",
		"isolatedModules")
	varyByMap := make(map[string]struct{})
	for _, option := range varyByOptions {
		varyByMap[strings.ToLower(option)] = struct{}{}
	}
	return varyByMap
}

func (r *CompilerBaselineRunner) runTest(t *testing.T, filename string) {
	test := getCompilerFileBasedTest(t, filename)
	basename := tspath.GetBaseFileName(filename)
	if len(test.configurations) > 0 {
		for _, config := range test.configurations {
			testName := basename
			if config.Name != "" {
				testName += " " + config.Name
			}
			t.Run(testName, func(t *testing.T) { r.runSingleConfigTest(t, testName, test, config) })
		}
	} else {
		t.Run(basename, func(t *testing.T) { r.runSingleConfigTest(t, basename, test, nil) })
	}
}

func (r *CompilerBaselineRunner) runSingleConfigTest(t *testing.T, testName string, test *compilerFileBasedTest, config *harnessutil.NamedTestConfiguration) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on compiling test "+test.filename)

	payload := makeUnitsFromTest(test.content, test.filename)
	compilerTest := newCompilerTest(t, testName, test.filename, &payload, config)

	compilerTest.verifyDiagnostics(t, r.testSuitName, r.isSubmodule)
	compilerTest.verifyJavaScriptOutput(t, r.testSuitName, r.isSubmodule)
	compilerTest.verifyTypesAndSymbols(t, r.testSuitName, r.isSubmodule)
	// !!! Verify all baselines

	compilerTest.verifyUnionOrdering(t)
}

type compilerFileBasedTest struct {
	filename       string
	content        string
	configurations []*harnessutil.NamedTestConfiguration
}

func getCompilerFileBasedTest(t *testing.T, filename string) *compilerFileBasedTest {
	content, ok := osvfs.FS().ReadFile(filename)
	if !ok {
		panic("Could not read test file: " + filename)
	}
	settings := extractCompilerSettings(content)
	configurations := harnessutil.GetFileBasedTestConfigurations(t, settings, compilerVaryBy)
	return &compilerFileBasedTest{
		filename:       filename,
		content:        content,
		configurations: configurations,
	}
}

type compilerTest struct {
	testName       string
	filename       string
	basename       string
	configuredName string // name with configuration description, e.g. `file`
	options        *core.CompilerOptions
	harnessOptions *harnessutil.HarnessOptions
	result         *harnessutil.CompilationResult
	tsConfigFiles  []*harnessutil.TestFile
	toBeCompiled   []*harnessutil.TestFile // equivalent to the files that will be passed on the command line
	otherFiles     []*harnessutil.TestFile // equivalent to other files on the file system not directly passed to the compiler (ie things that are referenced by other files)
	hasNonDtsFiles bool
}

type testCaseContentWithConfig struct {
	testCaseContent
	configuration harnessutil.TestConfiguration
}

func newCompilerTest(
	t *testing.T,
	testName string,
	filename string,
	testContent *testCaseContent,
	namedConfiguration *harnessutil.NamedTestConfiguration,
) *compilerTest {
	basename := tspath.GetBaseFileName(filename)
	configuredName := basename
	if namedConfiguration != nil && namedConfiguration.Name != "" {
		extname := tspath.GetAnyExtensionFromPath(basename, nil, false)
		extensionlessBasename := basename[:len(basename)-len(extname)]
		configuredName = fmt.Sprintf("%s(%s)%s", extensionlessBasename, namedConfiguration.Name, extname)
	}

	var configuration harnessutil.TestConfiguration
	if namedConfiguration != nil {
		configuration = namedConfiguration.Config
	}
	testCaseContentWithConfig := testCaseContentWithConfig{
		testCaseContent: *testContent,
		configuration:   configuration,
	}

	harnessConfig := testCaseContentWithConfig.configuration
	currentDirectory := tspath.GetNormalizedAbsolutePath(harnessConfig["currentdirectory"], srcFolder)

	units := testCaseContentWithConfig.testUnitData
	var toBeCompiled []*harnessutil.TestFile
	var otherFiles []*harnessutil.TestFile
	var tsConfigOptions core.CompilerOptions
	hasNonDtsFiles := core.Some(
		units,
		func(unit *testUnit) bool { return !tspath.FileExtensionIs(unit.name, tspath.ExtensionDts) })
	var tsConfigFiles []*harnessutil.TestFile
	if testCaseContentWithConfig.tsConfig != nil {
		tsConfigOptions = *testCaseContentWithConfig.tsConfig.ParsedConfig.CompilerOptions
		tsConfigFiles = []*harnessutil.TestFile{
			createHarnessTestFile(testCaseContentWithConfig.tsConfigFileUnitData, currentDirectory),
		}
		for _, unit := range units {
			if slices.Contains(
				testCaseContentWithConfig.tsConfig.ParsedConfig.FileNames,
				tspath.GetNormalizedAbsolutePath(unit.name, currentDirectory),
			) {
				toBeCompiled = append(toBeCompiled, createHarnessTestFile(unit, currentDirectory))
			} else {
				otherFiles = append(otherFiles, createHarnessTestFile(unit, currentDirectory))
			}
		}
	} else {
		baseUrl, ok := harnessConfig["baseurl"]
		if ok && !tspath.IsRootedDiskPath(baseUrl) {
			harnessConfig["baseurl"] = tspath.GetNormalizedAbsolutePath(baseUrl, currentDirectory)
		}

		lastUnit := units[len(units)-1]
		// We need to assemble the list of input files for the compiler and other related files on the 'filesystem' (ie in a multi-file test)
		// If the last file in a test uses require or a triple slash reference we'll assume all other files will be brought in via references,
		// otherwise, assume all files are just meant to be in the same compilation session without explicit references to one another.

		if testCaseContentWithConfig.configuration["noimplicitreferences"] != "" ||
			strings.Contains(lastUnit.content, requireStr) ||
			referencesRegex.MatchString(lastUnit.content) {
			toBeCompiled = append(toBeCompiled, createHarnessTestFile(lastUnit, currentDirectory))
			for _, unit := range units[:len(units)-1] {
				otherFiles = append(otherFiles, createHarnessTestFile(unit, currentDirectory))
			}
		} else {
			toBeCompiled = core.Map(units, func(unit *testUnit) *harnessutil.TestFile { return createHarnessTestFile(unit, currentDirectory) })
		}
	}

	result := harnessutil.CompileFiles(
		t,
		toBeCompiled,
		otherFiles,
		harnessConfig,
		&tsConfigOptions,
		currentDirectory,
		testCaseContentWithConfig.symlinks,
	)

	return &compilerTest{
		testName:       testName,
		filename:       filename,
		basename:       basename,
		configuredName: configuredName,
		options:        result.Options,
		harnessOptions: result.HarnessOptions,
		result:         result,
		tsConfigFiles:  tsConfigFiles,
		toBeCompiled:   toBeCompiled,
		otherFiles:     otherFiles,
		hasNonDtsFiles: hasNonDtsFiles,
	}
}

var concurrentSkippedErrorBaselines = core.NewSetFromItems(
	"circular1.ts",
	"circular3.ts",
	"recursiveExportAssignmentAndFindAliasedType1.ts",
	"recursiveExportAssignmentAndFindAliasedType2.ts",
	"recursiveExportAssignmentAndFindAliasedType3.ts",
	"superInStaticMembers1.ts target=es2015",
)

func (c *compilerTest) verifyDiagnostics(t *testing.T, suiteName string, isSubmodule bool) {
	t.Run("error", func(t *testing.T) {
		if !testutil.TestProgramIsSingleThreaded() && concurrentSkippedErrorBaselines.Has(c.testName) {
			t.Skip("Skipping error baseline in concurrent mode")
		}

		defer testutil.RecoverAndFail(t, "Panic on creating error baseline for test "+c.filename)
		files := core.Concatenate(c.tsConfigFiles, core.Concatenate(c.toBeCompiled, c.otherFiles))
		tsbaseline.DoErrorBaseline(t, c.configuredName, files, c.result.Diagnostics, c.result.Options.Pretty.IsTrue(), baseline.Options{
			Subfolder:           suiteName,
			IsSubmodule:         isSubmodule,
			IsSubmoduleAccepted: c.containsUnsupportedOptions(),
		})
	})
}

func (c *compilerTest) verifyJavaScriptOutput(t *testing.T, suiteName string, isSubmodule bool) {
	if !c.hasNonDtsFiles {
		return
	}

	t.Run("output", func(t *testing.T) {
		defer testutil.RecoverAndFail(t, "Panic on creating js output for test "+c.filename)
		headerComponents := tspath.GetPathComponentsRelativeTo(repo.TestDataPath, c.filename, tspath.ComparePathsOptions{})
		if isSubmodule {
			headerComponents = headerComponents[4:] // Strip "./../_submodules/TypeScript" prefix
		}
		header := tspath.GetPathFromPathComponents(headerComponents)
		tsbaseline.DoJsEmitBaseline(
			t,
			c.configuredName,
			header,
			c.options,
			c.result,
			c.tsConfigFiles,
			c.toBeCompiled,
			c.otherFiles,
			c.harnessOptions,
			baseline.Options{Subfolder: suiteName, IsSubmodule: isSubmodule},
		)
	})
}

func (c *compilerTest) verifyTypesAndSymbols(t *testing.T, suiteName string, isSubmodule bool) {
	noTypesAndSymbols := c.harnessOptions.NoTypesAndSymbols
	if noTypesAndSymbols {
		return
	}
	program := c.result.Program
	allFiles := core.Filter(
		core.Concatenate(c.toBeCompiled, c.otherFiles),
		func(f *harnessutil.TestFile) bool {
			return program.GetSourceFile(f.UnitName) != nil
		},
	)

	headerComponents := tspath.GetPathComponentsRelativeTo(repo.TestDataPath, c.filename, tspath.ComparePathsOptions{})
	if isSubmodule {
		headerComponents = headerComponents[4:] // Strip "./../_submodules/TypeScript" prefix
	}
	header := tspath.GetPathFromPathComponents(headerComponents)
	tsbaseline.DoTypeAndSymbolBaseline(
		t,
		c.configuredName,
		header,
		program,
		allFiles,
		baseline.Options{Subfolder: suiteName, IsSubmodule: isSubmodule},
		false,
		false,
		len(c.result.Diagnostics) > 0,
	)
}

func createHarnessTestFile(unit *testUnit, currentDirectory string) *harnessutil.TestFile {
	return &harnessutil.TestFile{
		UnitName: tspath.GetNormalizedAbsolutePath(unit.name, currentDirectory),
		Content:  unit.content,
	}
}

func (c *compilerTest) verifyUnionOrdering(t *testing.T) {
	t.Run("union ordering", func(t *testing.T) {
		for _, c := range c.result.Program.GetTypeCheckers() {
			for union := range c.UnionTypes() {
				types := union.Types()

				reversed := slices.Clone(types)
				slices.Reverse(reversed)
				slices.SortFunc(reversed, checker.CompareTypes)
				assert.Assert(t, slices.Equal(reversed, types), "compareTypes does not sort union types consistently")

				shuffled := slices.Clone(types)
				rng := rand.New(rand.NewPCG(1234, 5678))

				for range 10 {
					rng.Shuffle(len(shuffled), func(i, j int) { shuffled[i], shuffled[j] = shuffled[j], shuffled[i] })
					slices.SortFunc(shuffled, checker.CompareTypes)
					assert.Assert(t, slices.Equal(shuffled, types), "compareTypes does not sort union types consistently")
				}
			}
		}
	})
}

func (c *compilerTest) containsUnsupportedOptions() bool {
	if len(c.result.Program.UnsupportedExtensions()) != 0 {
		return true
	}
	switch c.options.GetEmitModuleKind() {
	case core.ModuleKindAMD, core.ModuleKindUMD, core.ModuleKindSystem:
		return true
	}
	if c.options.BaseUrl != "" {
		return true
	}
	if c.options.RootDirs != nil {
		return true
	}

	return false
}
