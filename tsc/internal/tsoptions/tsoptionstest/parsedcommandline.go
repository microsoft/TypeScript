package tsoptionstest

import (
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func GetParsedCommandLine(t assert.TestingT, jsonText string, files map[string]string, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) *tsoptions.ParsedCommandLine {
	host := NewVFSParseConfigHost(files, currentDirectory, caseSensitivity)
	configFileName := currentDirectory.ResolveFile("tsconfig.json")
	tsconfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(configFileName, caseSensitivity.PathKey(tspath.RootedPath(configFileName)), jsonText)
	return tsoptions.ParseJsonSourceFileConfigFileContent(tsconfigSourceFile, host, currentDirectory, nil, nil, nil, nil)
}
