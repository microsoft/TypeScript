package runner

import (
	"fmt"
	"maps"
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

var compilerVaryBy []string // !!! Add this when we have real compiler options parsing

func (r *CompilerBaselineRunner) runTest(t *testing.T, filename string) {
	test := getCompilerFileBasedTest(filename)
	basename := tspath.GetBaseFileName(filename)
	if len(test.configurations) > 0 {
		for _, config := range test.configurations {
			description := harnessutil.GetFileBasedTestConfigurationDescription(config)
			t.Run(basename+description, func(t *testing.T) { r.runSingleConfigTest(t, test, config) })
		}
	} else {
		t.Run(basename, func(t *testing.T) { r.runSingleConfigTest(t, test, nil) })
	}
}

func (r *CompilerBaselineRunner) runSingleConfigTest(t *testing.T, test *compilerFileBasedTest, config harnessutil.TestConfiguration) {
	t.Parallel()
	payload := makeUnitsFromTest(test.content, test.filename)
	compilerTest := newCompilerTest(test.filename, &payload, config)

	compilerTest.verifyDiagnostics(t, r.testSuitName)
	compilerTest.verifyTypesAndSymbols(t, r.testSuitName)
	// !!! Verify all baselines
}

type compilerFileBasedTest struct {
	filename       string
	content        string
	configurations []harnessutil.TestConfiguration
}

func getCompilerFileBasedTest(filename string) *compilerFileBasedTest {
	bytes, err := os.ReadFile(filename)
	if err != nil {
		panic("Could not read test file: " + err.Error())
	}
	content := string(bytes)
	settings := extractCompilerSettings(content)
	configurations := harnessutil.GetFileBasedTestConfigurations(settings, compilerVaryBy)
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
	result         *harnessutil.CompileFilesResult
	tsConfigFiles  []*harnessutil.TestFile
	toBeCompiled   []*harnessutil.TestFile // equivalent to the files that will be passed on the command line
	otherFiles     []*harnessutil.TestFile // equivalent to other files on the file system not directly passed to the compiler (ie things that are referenced by other files)
	hasNonDtsFiles bool
}

type testCaseContentWithConfig struct {
	testCaseContent
	configuration harnessutil.TestConfiguration
}

func newCompilerTest(filename string, testContent *testCaseContent, configuration harnessutil.TestConfiguration) *compilerTest {
	basename := tspath.GetBaseFileName(filename)
	configuredName := basename
	if configuration != nil {
		// Compute name with configuration description, e.g. `filename(target=esnext).ts`
		var configNameBuilder strings.Builder
		keys := slices.Sorted(maps.Keys(configuration))
		for i, key := range keys {
			if i > 0 {
				configNameBuilder.WriteRune(',')
			}
			fmt.Fprintf(&configNameBuilder, "%s=%s", strings.ToLower(key), strings.ToLower(configuration[key]))
		}
		configName := configNameBuilder.String()
		if len(configName) > 0 {
			extname := tspath.GetAnyExtensionFromPath(basename, nil, false)
			extensionlessBasename := basename[:len(basename)-len(extname)]
			configuredName = fmt.Sprintf("%s(%s)%s", extensionlessBasename, configName, extname)
		}
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
	var tsConfigOptions *core.CompilerOptions
	hasNonDtsFiles := core.Some(units, func(unit *testUnit) bool { return !tspath.FileExtensionIs(unit.name, tspath.ExtensionDts) })
	// var tsConfigFiles []*harnessutil.TestFile // !!!
	if testCaseContentWithConfig.tsConfig != nil {
		// !!!
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

	if tsConfigOptions != nil && tsConfigOptions.ConfigFilePath != "" {
		// tsConfigOptions.configFile!.fileName = tsConfigOptions.configFilePath; // !!!
	}

	result := harnessutil.CompileFiles(
		toBeCompiled,
		otherFiles,
		harnessConfig,
		tsConfigOptions,
		currentDirectory,
		testCaseContentWithConfig.symlinks,
	)

	return &compilerTest{
		filename:       filename,
		basename:       basename,
		configuredName: configuredName,
		// options: result.options, // !!!
		result: result,
		// tsConfigFiles: tsConfigFiles, // !!!
		toBeCompiled:   toBeCompiled,
		otherFiles:     otherFiles,
		hasNonDtsFiles: hasNonDtsFiles,
	}
}

func (c *compilerTest) verifyDiagnostics(t *testing.T, suiteName string) {
	// pretty := c.result.options.pretty
	pretty := false // !!! Add `pretty` to compiler options
	files := core.Concatenate(c.tsConfigFiles, core.Concatenate(c.toBeCompiled, c.otherFiles))
	tsbaseline.DoErrorBaseline(t, c.configuredName, files, c.result.Diagnostics, pretty, suiteName)
}

func (c *compilerTest) verifyTypesAndSymbols(t *testing.T, suiteName string) {
	// !!! Needs harness settings parsing
	// const noTypesAndSymbols = this.harnessSettings.noTypesAndSymbols &&
	// 	this.harnessSettings.noTypesAndSymbols.toLowerCase() === "true";
	// if (noTypesAndSymbols) {
	// 	return;
	// }
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
		UnitName:    tspath.GetNormalizedAbsolutePath(unit.name, currentDirectory),
		Content:     unit.content,
		FileOptions: unit.fileOptions,
	}
}
