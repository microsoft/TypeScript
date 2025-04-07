package tsbaseline

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func DoJSEmitBaseline(
	t *testing.T,
	baselinePath string,
	header string,
	options *core.CompilerOptions,
	result *harnessutil.CompilationResult,
	tsConfigFiles []*harnessutil.TestFile,
	toBeCompiled []*harnessutil.TestFile,
	otherFiles []*harnessutil.TestFile,
	harnessSettings *harnessutil.HarnessOptions,
	opts baseline.Options,
) {
	if options.GetAllowJS() {
		t.Skip("AllowJS is not supported")
		return
	}
	if options.OutFile != "" || options.Out != "" {
		t.Skip("OutFile/Out is not supported")
		return
	}

	if !options.NoEmit.IsTrue() && !options.EmitDeclarationOnly.IsTrue() && result.JS.Size() == 0 && len(result.Diagnostics) == 0 {
		panic("Expected at least one js file to be emitted or at least one error to be created.")
	}

	// check js output
	var tsCode strings.Builder
	tsSources := core.Concatenate(otherFiles, toBeCompiled)
	tsCode.WriteString("//// [")
	tsCode.WriteString(header)
	tsCode.WriteString("] ////\r\n\r\n")

	for i, file := range tsSources {
		tsCode.WriteString("//// [")
		tsCode.WriteString(tspath.GetBaseFileName(file.UnitName))
		tsCode.WriteString("]\r\n")
		tsCode.WriteString(file.Content)
		if i < len(tsSources)-1 {
			tsCode.WriteString("\r\n")
		}
	}

	var jsCode strings.Builder
	for file := range result.JS.Values() {
		if jsCode.Len() > 0 && !strings.HasSuffix(jsCode.String(), "\n") {
			jsCode.WriteString("\r\n")
		}
		if len(result.Diagnostics) == 0 && strings.HasSuffix(file.UnitName, tspath.ExtensionJson) {
			fileParseResult := parser.ParseSourceFile(
				file.UnitName,
				tspath.Path(file.UnitName),
				file.Content,
				options.GetEmitScriptTarget(),
				scanner.JSDocParsingModeParseAll)
			if len(fileParseResult.Diagnostics()) > 0 {
				jsCode.WriteString(getErrorBaseline(t, []*harnessutil.TestFile{file}, fileParseResult.Diagnostics(), false /*pretty*/))
				continue
			}
		}
		jsCode.WriteString(fileOutput(file, harnessSettings))
	}

	// !!! Enable the following once .d.ts emit is implemented
	////if result.Dts.Size() > 0 {
	////	jsCode += "\r\n\r\n"
	////	for declFile := range result.Dts.Values() {
	////		jsCode += fileOutput(declFile, harnessSettings)
	////	}
	////}
	////
	////declFileContext := prepareDeclarationCompilationContext(
	////	toBeCompiled,
	////	otherFiles,
	////	result,
	////	harnessSettings,
	////	options,
	////	"", /*currentDirectory*/
	////)
	////declFileCompilationResult := compileDeclarationFiles(t, declFileContext, result.Symlinks)
	////
	////if declFileCompilationResult != nil && len(declFileCompilationResult.declResult.Diagnostics) > 0 {
	////	jsCode += "\r\n\r\n//// [DtsFileErrors]\r\n"
	////	jsCode += "\r\n\r\n"
	////	jsCode += getErrorBaseline(
	////		t,
	////		slices.Concat(tsConfigFiles, declFileCompilationResult.declInputFiles, declFileCompilationResult.declOtherFiles),
	////		declFileCompilationResult.declResult.Diagnostics,
	////		false, /*pretty*/
	////	)
	////} else

	// !!! Enable the following once noCheck is more comprehensive
	////if !options.NoCheck.IsTrue() && !options.NoEmit.IsTrue() {
	////	testConfig := make(map[string]string)
	////	testConfig["noCheck"] = "true"
	////	withoutChecking := result.Repeat(testConfig)
	////	compareResultFileSets := func(a collections.OrderedMap[string, *harnessutil.TestFile], b collections.OrderedMap[string, *harnessutil.TestFile]) {
	////		for key, doc := range a.Entries() {
	////			original := b.GetOrZero(key)
	////			if original == nil {
	////				jsCode.WriteString("\r\n\r\n!!!! File ")
	////				jsCode.WriteString(removeTestPathPrefixes(doc.UnitName, false /*retainTrailingDirectorySeparator*/))
	////				jsCode.WriteString(" missing from original emit, but present in noCheck emit\r\n")
	////				jsCode.WriteString(fileOutput(doc, harnessSettings))
	////			} else if original.Content != doc.Content {
	////				jsCode.WriteString("\r\n\r\n!!!! File ")
	////				jsCode.WriteString(removeTestPathPrefixes(doc.UnitName, false /*retainTrailingDirectorySeparator*/))
	////				jsCode.WriteString(" differs from original emit in noCheck emit\r\n")
	////				var fileName string
	////				if harnessSettings.FullEmitPaths {
	////					fileName = removeTestPathPrefixes(doc.UnitName, false /*retainTrailingDirectorySeparator*/)
	////				} else {
	////					fileName = tspath.GetBaseFileName(doc.UnitName)
	////				}
	////				jsCode.WriteString("//// [")
	////				jsCode.WriteString(fileName)
	////				jsCode.WriteString("]\r\n")
	////				expected := original.Content
	////				actual := doc.Content
	////				err := diff.Text("Expected\tThe full check baseline", "Actual\twith noCheck set", expected, actual, &jsCode)
	////				if err != nil {
	////					t.Fatal(err)
	////				}
	////			}
	////		}
	////	}
	////	compareResultFileSets(withoutChecking.DTS, result.DTS)
	////	compareResultFileSets(withoutChecking.JS, result.JS)
	////}

	if tspath.FileExtensionIsOneOf(baselinePath, []string{tspath.ExtensionTs, tspath.ExtensionTsx}) {
		baselinePath = tspath.ChangeExtension(baselinePath, tspath.ExtensionJs)
	}

	var actual string
	if jsCode.Len() > 0 {
		actual = tsCode.String() + "\r\n\r\n" + jsCode.String()
	} else {
		actual = baseline.NoContent
	}

	baseline.Run(t, baselinePath, actual, opts)
}

func fileOutput(file *harnessutil.TestFile, settings *harnessutil.HarnessOptions) string {
	var fileName string
	if settings.FullEmitPaths {
		fileName = removeTestPathPrefixes(file.UnitName, false /*retainTrailingDirectorySeparator*/)
	} else {
		fileName = tspath.GetBaseFileName(file.UnitName)
	}
	return "//// [" + fileName + "]\r\n" + removeTestPathPrefixes(file.Content, false /*retainTrailingDirectorySeparator*/)
}

type declarationCompilationContext struct {
	declInputFiles   []*harnessutil.TestFile
	declOtherFiles   []*harnessutil.TestFile
	harnessSettings  *harnessutil.HarnessOptions
	options          *core.CompilerOptions
	currentDirectory string
}

func prepareDeclarationCompilationContext(
	inputFiles []*harnessutil.TestFile,
	otherFiles []*harnessutil.TestFile,
	result *harnessutil.CompilationResult,
	harnessSettings *harnessutil.HarnessOptions,
	options *core.CompilerOptions,
	// Current directory is needed for rwcRunner to be able to use currentDirectory defined in json file
	currentDirectory string,
) *declarationCompilationContext {
	if options.Declaration.IsTrue() && len(result.Diagnostics) == 0 {
		if options.EmitDeclarationOnly.IsTrue() {
			if result.JS.Size() > 0 || (result.DTS.Size() == 0 && !options.NoEmit.IsTrue()) {
				panic("Only declaration files should be generated when emitDeclarationOnly:true")
			}
		} else if result.DTS.Size() != result.GetNumberOfJSFiles(false /*includeJson*/) {
			panic("There were no errors and declFiles generated did not match number of js files generated")
		}
	}

	var declInputFiles []*harnessutil.TestFile
	var declOtherFiles []*harnessutil.TestFile

	findUnit := func(fileName string, units []*harnessutil.TestFile) *harnessutil.TestFile {
		for _, unit := range units {
			if unit.UnitName == fileName {
				return unit
			}
		}
		return nil
	}

	findResultCodeFile := func(fileName string) *harnessutil.TestFile {
		sourceFile := result.Program.GetSourceFile(fileName)
		if sourceFile == nil {
			panic("Program has no source file with name '" + fileName + "'")
		}
		// Is this file going to be emitted separately
		var sourceFileName string

		////outFile := options.OutFile;
		////if len(outFile) == 0 {
		if len(options.OutDir) != 0 {
			sourceFilePath := tspath.GetNormalizedAbsolutePath(sourceFile.FileName(), result.Program.Host().GetCurrentDirectory())
			sourceFilePath = strings.Replace(sourceFilePath, result.Program.CommonSourceDirectory(), "", 1)
			sourceFileName = tspath.CombinePaths(options.OutDir, sourceFilePath)
		} else {
			sourceFileName = sourceFile.FileName()
		}
		////} else {
		////	// Goes to single --out file
		////	sourceFileName = outFile
		////}

		dTsFileName := tspath.RemoveFileExtension(sourceFileName) + tspath.GetDeclarationEmitExtensionForPath(sourceFileName)
		return result.DTS.GetOrZero(dTsFileName)
	}

	addDtsFile := func(file *harnessutil.TestFile, dtsFiles []*harnessutil.TestFile) []*harnessutil.TestFile {
		if tspath.IsDeclarationFileName(file.UnitName) || tspath.HasJSONFileExtension(file.UnitName) {
			dtsFiles = append(dtsFiles, file)
		} else if tspath.HasTSFileExtension(file.UnitName) || (tspath.HasJSFileExtension(file.UnitName) && options.GetAllowJS()) {
			declFile := findResultCodeFile(file.UnitName)
			if declFile != nil && findUnit(declFile.UnitName, declInputFiles) == nil && findUnit(declFile.UnitName, declOtherFiles) == nil {
				dtsFiles = append(dtsFiles, &harnessutil.TestFile{
					UnitName: declFile.UnitName,
					Content:  strings.TrimPrefix(declFile.Content, "\uFEFF"),
				})
			}
		}
		return dtsFiles
	}

	// if the .d.ts is non-empty, confirm it compiles correctly as well
	if options.Declaration.IsTrue() && len(result.Diagnostics) == 0 && result.DTS.Size() > 0 {
		for _, file := range inputFiles {
			declInputFiles = addDtsFile(file, declInputFiles)
		}
		for _, file := range otherFiles {
			declOtherFiles = addDtsFile(file, declOtherFiles)
		}
		return &declarationCompilationContext{
			declInputFiles,
			declOtherFiles,
			harnessSettings,
			options,
			core.IfElse(len(currentDirectory) > 0, currentDirectory, harnessSettings.CurrentDirectory),
		}
	}
	return nil
}

type declarationCompilationResult struct {
	declInputFiles []*harnessutil.TestFile
	declOtherFiles []*harnessutil.TestFile
	declResult     *harnessutil.CompilationResult
}

func compileDeclarationFiles(t *testing.T, context *declarationCompilationContext, symlinks map[string]string) *declarationCompilationResult {
	if context == nil {
		return nil
	}
	declFileCompilationResult := harnessutil.CompileFilesEx(t,
		context.declInputFiles,
		context.declOtherFiles,
		context.harnessSettings,
		context.options,
		context.currentDirectory,
		symlinks)
	return &declarationCompilationResult{
		context.declInputFiles,
		context.declOtherFiles,
		declFileCompilationResult,
	}
}
