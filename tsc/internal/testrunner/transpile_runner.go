package testrunner

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/outputpaths"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/testutil/tsbaseline"
	"github.com/microsoft/typescript-go/internal/transpile"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
)

var transpileBaselineRegex = regexp.MustCompile(`\.[cm]?[tj]sx?$`)

var transpileVaryBy = map[string]struct{}{
	"declarationmap":  {},
	"sourcemap":       {},
	"inlinesourcemap": {},
}

type TranspileBaselineRunner struct {
	testFiles []string
	basePath  string
}

var _ Runner = (*TranspileBaselineRunner)(nil)

func NewTranspileBaselineRunner() *TranspileBaselineRunner {
	return &TranspileBaselineRunner{
		basePath: "../_submodules/TypeScript/tests/cases/transpile",
	}
}

func (r *TranspileBaselineRunner) EnumerateTestFiles() []string {
	if len(r.testFiles) > 0 {
		return r.testFiles
	}
	files, err := harnessutil.EnumerateFiles(r.basePath, transpileBaselineRegex, true)
	if err != nil {
		panic("Could not read transpile test files: " + err.Error())
	}
	r.testFiles = files
	return files
}

func (r *TranspileBaselineRunner) RunTests(t *testing.T) {
	for _, fileName := range r.EnumerateTestFiles() {
		r.runTest(t, fileName)
	}
}

func (r *TranspileBaselineRunner) runTest(t *testing.T, fileName string) {
	content, ok := osvfs.FS().ReadFile(fileName)
	if !ok {
		panic("Could not read transpile test file: " + fileName)
	}
	settings := extractCompilerSettings(content)
	configurations := harnessutil.GetFileBasedTestConfigurations(t, settings, transpileVaryBy)
	if len(configurations) == 0 {
		configurations = []*harnessutil.NamedTestConfiguration{{Config: settings}}
	}

	extension := tspath.GetAnyExtensionFromPath(fileName, nil, false)
	baseName := tspath.GetBaseFileName(fileName)
	justName := strings.TrimSuffix(baseName, extension)
	units := makeUnitsFromTest(content, baseName).testUnitData

	for _, configuration := range configurations {
		configuredName := justName
		if configuration.Name != "" {
			configuredName += "(" + formatTranspileConfigurationName(configuration.Name) + ")"
		}
		t.Run(configuredName, func(t *testing.T) {
			options := &core.CompilerOptions{}
			harnessOptions := &harnessutil.HarnessOptions{}
			harnessutil.SetOptionsFromTestConfig(t, configuration.Config, options, harnessOptions, srcFolder, false)

			if !options.EmitDeclarationOnly.IsTrue() {
				r.runKind(t, configuredName, extension, units, options, harnessOptions, false)
			}
			if options.Declaration.IsTrue() {
				r.runKind(t, configuredName, extension, units, options, harnessOptions, true)
			}
		})
	}
}

func formatTranspileConfigurationName(name string) string {
	name = strings.ReplaceAll(name, "declarationmap=", "declarationMap=")
	name = strings.ReplaceAll(name, "inlinesourcemap=", "inlineSourceMap=")
	return strings.ReplaceAll(name, "sourcemap=", "sourceMap=")
}

func (r *TranspileBaselineRunner) runKind(
	t *testing.T,
	configuredName string,
	extension string,
	units []*testUnit,
	options *core.CompilerOptions,
	harnessOptions *harnessutil.HarnessOptions,
	declaration bool,
) {
	var result strings.Builder
	for _, unit := range units {
		appendTranspileSection(&result, unit.name, unit.content)
	}

	for _, unit := range units {
		transpileOptions := transpile.Options{
			CompilerOptions:   options,
			FileName:          unit.name,
			ReportDiagnostics: harnessOptions.ReportDiagnostics,
		}
		var output *transpile.Output
		if declaration {
			output = transpile.TranspileDeclaration(t.Context(), unit.content, transpileOptions)
		} else {
			output = transpile.TranspileModule(t.Context(), unit.content, transpileOptions)
		}
		if output == nil {
			t.Fatal("transpilation was canceled")
		}

		outputExtension := outputpaths.GetOutputExtension(unit.name, options.Jsx)
		if declaration {
			outputExtension = tspath.GetDeclarationEmitExtensionForPath(unit.name)
		}
		outputFileName := tspath.ChangeExtension(unit.name, outputExtension)
		appendTranspileSection(&result, outputFileName, output.OutputText)
		if output.SourceMapText != "" {
			appendTranspileSection(&result, outputFileName+".map", output.SourceMapText)
		}
		if len(output.Diagnostics) > 0 {
			result.WriteString("\r\n\r\n//// [Diagnostics reported]\r\n")
			diagnosticFileName := unit.name
			if file := output.Diagnostics[0].File(); file != nil {
				diagnosticFileName = file.FileName()
			}
			errorBaseline := tsbaseline.GetErrorBaseline(
				t,
				[]*harnessutil.TestFile{{UnitName: diagnosticFileName, Content: unit.content}},
				diagnosticwriter.WrapASTDiagnostics(output.Diagnostics),
				diagnosticwriter.CompareASTDiagnostics,
				options.Pretty.IsTrue(),
			)
			result.WriteString(strings.ReplaceAll(errorBaseline, diagnosticFileName, unit.name))
			if !strings.HasSuffix(result.String(), "\n") {
				result.WriteString("\r\n")
			}
		}
	}

	baselineExtension := outputpaths.GetOutputExtension(configuredName+extension, options.Jsx)
	if declaration {
		baselineExtension = tspath.GetDeclarationEmitExtensionForPath(configuredName + extension)
	}
	baselineName := configuredName + baselineExtension
	baseline.Run(t, "transpile/"+baselineName, result.String(), baseline.Options{IsSubmodule: true})
}

func appendTranspileSection(result *strings.Builder, fileName string, content string) {
	fmt.Fprintf(result, "//// [%s] ////\r\n", fileName)
	result.WriteString(content)
	if !strings.HasSuffix(content, "\n") {
		result.WriteString("\r\n")
	}
}

func cleanTranspileBaselines() {
	for _, folder := range []string{"submodule", "submoduleAccepted", "submoduleTriaged"} {
		if err := os.RemoveAll(filepath.Join(localBasePath, folder, "transpile")); err != nil {
			panic("Could not clean up transpile baselines: " + err.Error())
		}
	}
}

func RunTranspileTests(t *testing.T) {
	repo.SkipIfNoTypeScriptSubmodule(t)
	cleanTranspileBaselines()
	NewTranspileBaselineRunner().RunTests(t)
}
