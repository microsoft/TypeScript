package runner

import (
	"regexp"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tsoptions/tsoptionstest"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var lineDelimiter = regexp.MustCompile("\r?\n")

// This maps a compiler setting to its value as written in the test file. For example, if a test file contains:
//
//	// @target: esnext, es2015
//
// Then the map will map "target" to "esnext, es2015"
type rawCompilerSettings map[string]string

// All the necessary information to turn a multi file test into useful units for later compilation
type testUnit struct {
	content          string
	name             string
	originalFilePath string
}

type testCaseContent struct {
	testUnitData         []*testUnit
	tsConfig             *tsoptions.ParsedCommandLine
	tsConfigFileUnitData *testUnit
	symlinks             any // !!!
}

// Regex for parsing options in the format "@Alpha: Value of any sort"
var optionRegex = regexp.MustCompile(`(?m)^\/{2}\s*@(\w+)\s*:\s*([^\r\n]*)`) // multiple matches on multiple lines

// Given a test file containing // @FileName directives,
// return an array of named units of code to be added to an existing compiler instance.
func makeUnitsFromTest(code string, fileName string) testCaseContent {
	// List of all the subfiles we've parsed out
	var testUnits []*testUnit

	lines := lineDelimiter.Split(code, -1)

	// Stuff related to the subfile we're parsing
	var currentFileContent strings.Builder
	var currentFileName string
	currentDirectory := srcFolder
	// var symlinks any

	for _, line := range lines {
		// !!!
		// const possiblySymlinks = parseSymlinkFromTest(line, symlinks, vfs.srcFolder);
		// if (possiblySymlinks) {
		// 	symlinks = possiblySymlinks;
		// }
		// !!! should be else if
		if testMetaData := optionRegex.FindStringSubmatch(line); testMetaData != nil {
			// Comment line, check for global/file @options and record them
			metaDataName := strings.ToLower(testMetaData[1])
			metaDataValue := strings.TrimSpace(testMetaData[2])
			if metaDataName == "currentdirectory" {
				currentDirectory = metaDataValue
			}
			if metaDataName != "filename" {
				continue
			}

			// New metadata statement after having collected some code to go with the previous metadata
			if currentFileName != "" {
				// Store result file
				newTestFile := &testUnit{
					content:          currentFileContent.String(),
					name:             currentFileName,
					originalFilePath: fileName,
				}
				testUnits = append(testUnits, newTestFile)

				// Reset local data
				currentFileContent.Reset()
				currentFileName = metaDataValue
			} else {
				// First metadata marker in the file
				currentFileName = strings.TrimSpace(testMetaData[2])
				if currentFileContent.Len() != 0 && scanner.SkipTrivia(currentFileContent.String(), 0) != currentFileContent.Len() {
					panic("Non-comment test content appears before the first '// @Filename' directive")
				}
				currentFileContent.Reset()
			}
		} else {
			// Subfile content line
			// Append to the current subfile content, inserting a newline if needed
			if currentFileContent.Len() != 0 {
				// End-of-line
				currentFileContent.WriteRune('\n')
			}
			currentFileContent.WriteString(line)
		}
	}

	// normalize the fileName for the single file case
	if len(testUnits) == 0 && len(currentFileName) == 0 {
		currentFileName = tspath.GetBaseFileName(fileName)
	}

	// EOF, push whatever remains
	newTestFile2 := &testUnit{
		content:          currentFileContent.String(),
		name:             currentFileName,
		originalFilePath: fileName,
	}
	testUnits = append(testUnits, newTestFile2)

	// unit tests always list files explicitly
	allFiles := make(map[string]string)
	for _, data := range testUnits {
		allFiles[tspath.GetNormalizedAbsolutePath(data.name, currentDirectory)] = data.content
	}
	parseConfigHost := tsoptionstest.NewVFSParseConfigHost(allFiles, currentDirectory)

	// check if project has tsconfig.json in the list of files
	var tsConfig *tsoptions.ParsedCommandLine
	var tsConfigFileUnitData *testUnit
	for i, data := range testUnits {
		if harnessutil.GetConfigNameFromFileName(data.name) != "" {
			configFileName := tspath.GetNormalizedAbsolutePath(data.name, currentDirectory)
			path := tspath.ToPath(data.name, parseConfigHost.GetCurrentDirectory(), parseConfigHost.Vfs.UseCaseSensitiveFileNames())
			configJson := parser.ParseJSONText(configFileName, path, data.content)
			tsConfigSourceFile := &tsoptions.TsConfigSourceFile{
				SourceFile: configJson,
			}
			configDir := tspath.GetDirectoryPath(configFileName)
			tsConfig = tsoptions.ParseJsonSourceFileConfigFileContent(
				tsConfigSourceFile,
				parseConfigHost,
				configDir,
				nil, /*existingOptions*/
				configFileName,
				nil, /*resolutionStack*/
				nil, /*extraFileExtensions*/
				nil /*extendedConfigCache*/)
			tsConfigFileUnitData = data

			// delete tsconfig file entry from the list
			testUnits = slices.Delete(testUnits, i, i+1)
			break
		}
	}

	return testCaseContent{
		testUnitData:         testUnits,
		tsConfig:             tsConfig,
		tsConfigFileUnitData: tsConfigFileUnitData,
	}
}

func extractCompilerSettings(content string) rawCompilerSettings {
	opts := make(map[string]string)

	for _, match := range optionRegex.FindAllStringSubmatch(content, -1) {
		opts[strings.ToLower(match[1])] = strings.TrimSuffix(strings.TrimSpace(match[2]), ";")
	}

	return opts
}
