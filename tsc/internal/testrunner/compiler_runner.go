package testrunner

import (
	"fmt"
	"math/rand/v2"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
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

// These tests contain options that have been completely removed, so fail to parse.
var deprecatedTests = []string{
	"preserveUnusedImports.ts",
	"noCrashWithVerbatimModuleSyntaxAndImportsNotUsedAsValues.ts",
	"verbatimModuleSyntaxCompat.ts",
	"preserveValueImports_importsNotUsedAsValues.ts",
	"importsNotUsedAsValues_error.ts",
	"alwaysStrictNoImplicitUseStrict.ts",
	"nonPrimitiveIndexingWithForInSupressError.ts",
	"parameterInitializerBeforeDestructuringEmit.ts",
	"mappedTypeUnionConstraintInferences.ts",
	"lateBoundConstraintTypeChecksCorrectly.ts",
	"keyofDoesntContainSymbols.ts",
	"isolatedModulesOut.ts",
	"noStrictGenericChecks.ts",
	"noImplicitUseStrict_umd.ts",
	"noImplicitUseStrict_system.ts",
	"noImplicitUseStrict_es6.ts",
	"noImplicitUseStrict_commonjs.ts",
	"noImplicitUseStrict_amd.ts",
	"noImplicitAnyIndexingSuppressed.ts",
	"excessPropertyErrorsSuppressed.ts",
}

func (r *CompilerBaselineRunner) RunTests(t *testing.T) {
	r.cleanUpLocal(t)
	files := r.EnumerateTestFiles()

	for _, filename := range files {
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

	switch compilerTest.options.GetEmitModuleKind() {
	case core.ModuleKindAMD, core.ModuleKindUMD, core.ModuleKindSystem:
		t.Skipf("Skipping test %s with unsupported module kind %s", testName, compilerTest.options.GetEmitModuleKind())
	}

	compilerTest.verifyDiagnostics(t, r.testSuitName, r.isSubmodule)
	compilerTest.verifyJavaScriptOutput(t, r.testSuitName, r.isSubmodule)
	compilerTest.verifySourceMapOutput(t, r.testSuitName, r.isSubmodule)
	compilerTest.verifySourceMapRecord(t, r.testSuitName, r.isSubmodule)
	compilerTest.verifyTypesAndSymbols(t, r.testSuitName, r.isSubmodule)
	compilerTest.verifyModuleResolution(t, r.testSuitName, r.isSubmodule)
	// !!! Verify all baselines

	compilerTest.verifyUnionOrdering(t)
	compilerTest.verifyParentPointers(t)
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
	var tsConfig *tsoptions.ParsedCommandLine
	hasNonDtsFiles := core.Some(
		units,
		func(unit *testUnit) bool { return !tspath.FileExtensionIs(unit.name, tspath.ExtensionDts) })
	var tsConfigFiles []*harnessutil.TestFile
	if testCaseContentWithConfig.tsConfig != nil {
		tsConfig = testCaseContentWithConfig.tsConfig
		tsConfigFiles = []*harnessutil.TestFile{
			createHarnessTestFile(testCaseContentWithConfig.tsConfigFileUnitData, currentDirectory),
		}
		for _, unit := range units {
			if slices.Contains(
				tsConfig.ParsedConfig.FileNames,
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
		tsConfig,
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

var concurrentSkippedErrorBaselines = map[string]string{
	"circular1.ts": "Circular error reported in an extra position.",
	"circular3.ts": "Circular error reported in an extra position.",
	"recursiveExportAssignmentAndFindAliasedType1.ts": "Circular error reported in an extra position.",
	"recursiveExportAssignmentAndFindAliasedType2.ts": "Circular error reported in an extra position.",
	"recursiveExportAssignmentAndFindAliasedType3.ts": "Circular error reported in an extra position.",
	"typeOnlyMerge2.ts": "Type-only merging is not detected when files are checked on different checkers.",
	"typeOnlyMerge3.ts": "Type-only merging is not detected when files are checked on different checkers.",
}

func (c *compilerTest) verifyDiagnostics(t *testing.T, suiteName string, isSubmodule bool) {
	t.Run("error", func(t *testing.T) {
		if !testutil.TestProgramIsSingleThreaded() {
			if msg, ok := concurrentSkippedErrorBaselines[c.basename]; ok {
				t.Skipf("Skipping in concurrent mode: %s", msg)
			}
		}

		defer testutil.RecoverAndFail(t, "Panic on creating error baseline for test "+c.filename)
		files := core.Concatenate(c.tsConfigFiles, core.Concatenate(c.toBeCompiled, c.otherFiles))
		tsbaseline.DoErrorBaseline(t, c.configuredName, files, c.result.Diagnostics, c.result.Options.Pretty.IsTrue(), baseline.Options{
			Subfolder:           suiteName,
			IsSubmodule:         isSubmodule,
			IsSubmoduleAccepted: c.containsUnsupportedOptionsForDiagnostics(),
			DiffFixupOld: func(old string) string {
				var sb strings.Builder
				sb.Grow(len(old))

				for line := range strings.SplitSeq(old, "\n") {
					const (
						relativePrefixNew = "==== "
						relativePrefixOld = relativePrefixNew + "./"
					)
					if rest, ok := strings.CutPrefix(line, relativePrefixOld); ok {
						line = relativePrefixNew + rest
					}

					sb.WriteString(line)
					sb.WriteString("\n")
				}

				return sb.String()[:sb.Len()-1]
			},
		})
	})
}

var skippedEmitTests = map[string]string{
	"filesEmittingIntoSameOutput.ts":                  "Output order nondeterministic due to collision on filename during parallel emit.",
	"jsFileCompilationWithJsEmitPathSameAsInput.ts":   "Output order nondeterministic due to collision on filename during parallel emit.",
	"grammarErrors.ts":                                "Output order nondeterministic due to collision on filename during parallel emit.",
	"jsFileCompilationEmitBlockedCorrectly.ts":        "Output order nondeterministic due to collision on filename during parallel emit.",
	"jsDeclarationsReexportAliasesEsModuleInterop.ts": "cls.d.ts is missing statements when run concurrently.",
	"jsFileCompilationWithoutJsExtensions.ts":         "No files are emitted.",
	"typeOnlyMerge2.ts":                               "Nondeterministic contents when run concurrently.",
	"typeOnlyMerge3.ts":                               "Nondeterministic contents when run concurrently.",
}

func (c *compilerTest) verifyJavaScriptOutput(t *testing.T, suiteName string, isSubmodule bool) {
	if !c.hasNonDtsFiles {
		return
	}

	if c.options.OutFile != "" {
		// Just return, no t.Skip; this is unsupported so testing them is not helpful.
		return
	}

	t.Run("output", func(t *testing.T) {
		if msg, ok := skippedEmitTests[c.basename]; ok {
			t.Skip(msg)
		}

		defer testutil.RecoverAndFail(t, "Panic on creating js output for test "+c.filename)
		headerComponents := tspath.GetPathComponentsRelativeTo(repo.TestDataPath, c.filename, tspath.ComparePathsOptions{})
		if isSubmodule {
			headerComponents = headerComponents[4:] // Strip "./../_submodules/TypeScript" prefix
		}
		header := tspath.GetPathFromPathComponents(headerComponents)
		tsbaseline.DoJSEmitBaseline(
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

func (c *compilerTest) verifySourceMapOutput(t *testing.T, suiteName string, isSubmodule bool) {
	if c.options.OutFile != "" {
		// Just return, no t.Skip; this is unsupported so testing them is not helpful.
		return
	}

	t.Run("sourcemap", func(t *testing.T) {
		defer testutil.RecoverAndFail(t, "Panic on creating source map output for test "+c.filename)
		headerComponents := tspath.GetPathComponentsRelativeTo(repo.TestDataPath, c.filename, tspath.ComparePathsOptions{})
		if isSubmodule {
			headerComponents = headerComponents[4:] // Strip "./../_submodules/TypeScript" prefix
		}
		header := tspath.GetPathFromPathComponents(headerComponents)
		tsbaseline.DoSourcemapBaseline(
			t,
			c.configuredName,
			header,
			c.options,
			c.result,
			c.harnessOptions,
			baseline.Options{Subfolder: suiteName, IsSubmodule: isSubmodule},
		)
	})
}

func (c *compilerTest) verifySourceMapRecord(t *testing.T, suiteName string, isSubmodule bool) {
	if c.options.OutFile != "" {
		// Just return, no t.Skip; this is unsupported so testing them is not helpful.
		return
	}

	t.Run("sourcemap record", func(t *testing.T) {
		defer testutil.RecoverAndFail(t, "Panic on creating source map record for test "+c.filename)
		headerComponents := tspath.GetPathComponentsRelativeTo(repo.TestDataPath, c.filename, tspath.ComparePathsOptions{})
		if isSubmodule {
			headerComponents = headerComponents[4:] // Strip "./../_submodules/TypeScript" prefix
		}
		header := tspath.GetPathFromPathComponents(headerComponents)
		tsbaseline.DoSourcemapRecordBaseline(
			t,
			c.configuredName,
			header,
			c.options,
			c.result,
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

func (c *compilerTest) verifyModuleResolution(t *testing.T, suiteName string, isSubmodule bool) {
	if !c.options.TraceResolution.IsTrue() {
		return
	}

	t.Run("module resolution", func(t *testing.T) {
		defer testutil.RecoverAndFail(t, "Panic on creating module resolution baseline for test "+c.filename)
		tsbaseline.DoModuleResolutionBaseline(t, c.configuredName, c.result.Trace, baseline.Options{
			Subfolder:       suiteName,
			IsSubmodule:     isSubmodule,
			SkipDiffWithOld: true,
		})
	})
}

func createHarnessTestFile(unit *testUnit, currentDirectory string) *harnessutil.TestFile {
	return &harnessutil.TestFile{
		UnitName: tspath.GetNormalizedAbsolutePath(unit.name, currentDirectory),
		Content:  unit.content,
	}
}

func (c *compilerTest) verifyUnionOrdering(t *testing.T) {
	t.Run("union ordering", func(t *testing.T) {
		checkers, done := c.result.Program.GetTypeCheckers(t.Context())
		defer done()
		for _, c := range checkers {
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

func (c *compilerTest) verifyParentPointers(t *testing.T) {
	t.Run("source file parent pointers", func(t *testing.T) {
		var parent *ast.Node
		var verifier func(n *ast.Node) bool
		verifier = func(n *ast.Node) bool {
			if n == nil {
				return false
			}
			assert.Assert(t, n.Parent != nil, "parent node does not exist")
			elab := ""
			if !ast.NodeIsSynthesized(n) {
				elab += ast.GetSourceFileOfNode(n).Text()[n.Loc.Pos():n.Loc.End()]
			} else {
				elab += "!synthetic! no text available"
			}
			assert.Assert(t, n.Parent == parent, "parent node does not match traversed parent: "+n.Kind.String()+": "+elab)
			oldParent := parent
			parent = n
			n.ForEachChild(verifier)
			parent = oldParent
			return false
		}
		for _, f := range c.result.Program.GetSourceFiles() {
			if c.result.Program.IsSourceFileDefaultLibrary(f.Path()) {
				continue
			}
			parent = f.AsNode()
			f.AsNode().ForEachChild(verifier)
		}
	})
}

func (c *compilerTest) containsUnsupportedOptionsForDiagnostics() bool {
	if len(c.result.Program.UnsupportedExtensions()) != 0 {
		return true
	}
	if c.options.BaseUrl != "" {
		return true
	}
	if c.options.OutFile != "" {
		return true
	}

	return false
}
