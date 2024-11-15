package runner

import (
	"regexp"
	"strings"

	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var lineDelimiter = regexp.MustCompile("\r?\n")

// all the necessary information to set the right compiler settings
type compilerSettings map[string]string

// All the necessary information to turn a multi file test into useful units for later compilation
type testUnit struct {
	content          string
	name             string
	fileOptions      map[string]string
	originalFilePath string
}

type testCaseContent struct {
	settings             compilerSettings
	testUnitData         []*testUnit
	tsConfig             any // !!!
	tsConfigFileUnitData any // !!!
	symlinks             any // !!!
}

// Regex for parsing options in the format "@Alpha: Value of any sort"
var optionRegex = regexp.MustCompile(`(?m)^\/{2}\s*@(\w+)\s*:\s*([^\r\n]*)`) // multiple matches on multiple lines

// Given a test file containing // @FileName directives, return an array of named units of code to be added to an existing compiler instance
func makeUnitsFromTest(code string, fileName string, settings compilerSettings) testCaseContent {
	if settings == nil {
		settings = extractCompilerSettings(code)
	}
	// List of all the subfiles we've parsed out
	var testUnits []*testUnit

	lines := lineDelimiter.Split(code, -1)

	// Stuff related to the subfile we're parsing
	var currentFileContent strings.Builder
	var currentFileName string
	currentFileOptions := make(map[string]string)
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
			if metaDataName != "filename" {
				currentFileOptions[metaDataName] = metaDataValue
				continue
			}

			// New metadata statement after having collected some code to go with the previous metadata
			if currentFileName != "" {
				// Store result file
				newTestFile := &testUnit{
					content:          currentFileContent.String(),
					name:             currentFileName,
					fileOptions:      currentFileOptions,
					originalFilePath: fileName,
				}
				testUnits = append(testUnits, newTestFile)

				// Reset local data
				currentFileContent.Reset()
				currentFileOptions = make(map[string]string)
				currentFileName = metaDataValue
			} else {
				// First metadata marker in the file
				currentFileName = strings.TrimSpace(testMetaData[2])
				if currentFileContent.Len() != 0 && compiler.SkipTrivia(currentFileContent.String(), 0) != currentFileContent.Len() {
					panic("Non-comment test content appears before the first '// @Filename' directive")
				}
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
		fileOptions:      currentFileOptions,
		originalFilePath: fileName,
	}
	testUnits = append(testUnits, newTestFile2)

	// !!! Need tsconfig parsing for this part
	// unit tests always list files explicitly
	// const parseConfigHost: ts.ParseConfigHost = {
	// 	useCaseSensitiveFileNames: false,
	// 	readDirectory: (directory, extensions, excludes, includes, depth) => {
	// 		return ts.matchFiles(directory, extensions, excludes, includes, /*useCaseSensitiveFileNames*/ false, "", depth, dir => {
	// 			const files: string[] = [];
	// 			const directories = new Set<string>();
	// 			for (const unit of testUnitData) {
	// 				const fileName = ts.getNormalizedAbsolutePath(unit.name, vfs.srcFolder);
	// 				if (fileName.toLowerCase().startsWith(dir.toLowerCase())) {
	// 					let path = fileName.substring(dir.length);
	// 					if (path.startsWith("/")) {
	// 						path = path.substring(1);
	// 					}
	// 					if (path.includes("/")) {
	// 						const directoryName = path.substring(0, path.indexOf("/"));
	// 						directories.add(directoryName);
	// 					}
	// 					else {
	// 						files.push(path);
	// 					}
	// 				}
	// 			}
	// 			return { files, directories: ts.arrayFrom(directories) };
	// 		}, ts.identity);
	// 	},
	// 	fileExists: fileName => testUnitData.some(data => data.name.toLowerCase() === fileName.toLowerCase()),
	// 	readFile: name => ts.forEach(testUnitData, data => data.name.toLowerCase() === name.toLowerCase() ? data.content : undefined),
	// };
	//
	// // check if project has tsconfig.json in the list of files
	// let tsConfig: ts.ParsedCommandLine | undefined;
	// let tsConfigFileUnitData: TestUnitData | undefined;
	// for (let i = 0; i < testUnitData.length; i++) {
	// 	const data = testUnitData[i];
	// 	if (getConfigNameFromFileName(data.name)) {
	// 		const configJson = ts.parseJsonText(data.name, data.content);
	// 		assert.isTrue(configJson.endOfFileToken !== undefined);
	// 		const configFileName = ts.getNormalizedAbsolutePath(data.name, vfs.srcFolder);
	// 		const configDir = ts.getDirectoryPath(configFileName);
	// 		tsConfig = ts.parseJsonSourceFileConfigFileContent(configJson, parseConfigHost, configDir, /*existingOptions*/ undefined, configFileName);
	// 		tsConfigFileUnitData = data;

	// 		// delete entry from the list
	// 		ts.orderedRemoveItemAt(testUnitData, i);

	// 		break;
	// 	}
	// }

	return testCaseContent{
		settings:     settings,
		testUnitData: testUnits,
	}
}

func extractCompilerSettings(content string) compilerSettings {
	opts := make(map[string]string)

	for _, match := range optionRegex.FindAllStringSubmatch(content, -1) {
		opts[match[1]] = strings.TrimSpace(match[2])
	}

	return opts
}
