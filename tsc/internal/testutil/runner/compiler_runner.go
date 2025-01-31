package runner

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/testutil/tsbaseline"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var (
	compilerBaselineRegex = regexp.MustCompile(`\.tsx?$`)
	requireStr            = "require("
	referencesRegex       = regexp.MustCompile(`reference\spath`)
)

var (
	// Posix-style path to sources under test
	srcFolder = "/.src"
	// Posix-style path to the TypeScript compiler build outputs (including tsc.js, lib.d.ts, etc.)
	builtFolder = "/.ts"
	// Posix-style path to additional test libraries
	testLibFolder = "/.lib"
)

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
	testFiles    []string
	basePath     string
	testSuitName string
}

var _ Runner = (*CompilerBaselineRunner)(nil)

func NewCompilerBaselineRunner(testType CompilerTestType) *CompilerBaselineRunner {
	testSuitName := testType.String()
	basePath := "tests/cases/" + testSuitName
	return &CompilerBaselineRunner{
		basePath:     basePath,
		testSuitName: testSuitName,
	}
}

func (r *CompilerBaselineRunner) EnumerateTestFiles() []string {
	if len(r.testFiles) > 0 {
		return r.testFiles
	}
	files, err := harnessutil.EnumerateFiles(r.basePath, compilerBaselineRegex, true)
	if err != nil {
		panic("Could not read compiler test files: " + err.Error())
	}
	r.testFiles = files
	return files
}

func (r *CompilerBaselineRunner) RunTests(t *testing.T) {
	files := r.EnumerateTestFiles()
	for _, filename := range files {
		r.runTest(t, filename)
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
		varyByMap[option] = struct{}{}
	}
	return varyByMap
}

func (r *CompilerBaselineRunner) runTest(t *testing.T, filename string) {
	test := getCompilerFileBasedTest(t, filename)
	basename := tspath.GetBaseFileName(filename)
	if len(test.configurations) > 0 {
		for _, config := range test.configurations {
			t.Run(basename+" "+config.Name, func(t *testing.T) { r.runSingleConfigTest(t, test, config) })
		}
	} else {
		t.Run(basename, func(t *testing.T) { r.runSingleConfigTest(t, test, nil) })
	}
}

func (r *CompilerBaselineRunner) runSingleConfigTest(t *testing.T, test *compilerFileBasedTest, config *harnessutil.NamedTestConfiguration) {
	t.Parallel()
	payload := makeUnitsFromTest(test.content, test.filename)
	compilerTest := newCompilerTest(t, test.filename, &payload, config)

	compilerTest.verifyDiagnostics(t, r.testSuitName)
	compilerTest.verifyTypesAndSymbols(t, r.testSuitName)
	// !!! Verify all baselines
}

type compilerFileBasedTest struct {
	filename       string
	content        string
	configurations []*harnessutil.NamedTestConfiguration
}

func getCompilerFileBasedTest(t *testing.T, filename string) *compilerFileBasedTest {
	bytes, err := os.ReadFile(filename)
	if err != nil {
		panic("Could not read test file: " + err.Error())
	}
	content := string(bytes)
	settings := extractCompilerSettings(content)
	configurations := harnessutil.GetFileBasedTestConfigurations(t, settings, compilerVaryBy)
	return &compilerFileBasedTest{
		filename:       filename,
		content:        content,
		configurations: configurations,
	}
}

var localBasePath = filepath.Join(repo.TestDataPath, "baselines", "local")

func cleanUpLocalCompilerTests(testType CompilerTestType) {
	localPath := filepath.Join(localBasePath, testType.String())
	err := os.RemoveAll(localPath)
	if err != nil {
		panic("Could not clean up local compiler tests: " + err.Error())
	}
}

type compilerTest struct {
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
	currentDirectory := harnessConfig["currentDirectory"]
	if currentDirectory == "" {
		currentDirectory = srcFolder
	}

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
		baseUrl, ok := harnessConfig["baseUrl"]
		if ok && !tspath.IsRootedDiskPath(baseUrl) {
			harnessConfig["baseUrl"] = tspath.GetNormalizedAbsolutePath(baseUrl, currentDirectory)
		}

		lastUnit := units[len(units)-1]
		// We need to assemble the list of input files for the compiler and other related files on the 'filesystem' (ie in a multi-file test)
		// If the last file in a test uses require or a triple slash reference we'll assume all other files will be brought in via references,
		// otherwise, assume all files are just meant to be in the same compilation session without explicit references to one another.

		if testCaseContentWithConfig.configuration["noImplicitReferences"] != "" ||
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

func (c *compilerTest) verifyDiagnostics(t *testing.T, suiteName string) {
	files := core.Concatenate(c.tsConfigFiles, core.Concatenate(c.toBeCompiled, c.otherFiles))
	tsbaseline.DoErrorBaseline(t, c.configuredName, files, c.result.Diagnostics, c.result.Options.Pretty.IsTrue(), suiteName)
}

func (c *compilerTest) verifyTypesAndSymbols(t *testing.T, suiteName string) {
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

	header := tspath.GetRelativePathFromDirectory(repo.TestDataPath, c.filename, tspath.ComparePathsOptions{})
	tsbaseline.DoTypeAndSymbolBaseline(
		t,
		c.configuredName,
		header,
		program,
		allFiles,
		baseline.Options{Subfolder: suiteName},
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
