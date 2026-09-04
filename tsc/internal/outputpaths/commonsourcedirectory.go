package outputpaths

import (
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func computeCommonSourceDirectoryOfFilenames(fileNames []tspath.RootedFilePath, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) tspath.RootedDirectoryPath {
	if len(fileNames) == 0 {
		// Can happen when all input files are .d.ts files.
		return currentDirectory
	}
	return caseSensitivity.CommonDirectoryOfFiles(fileNames)
}

func GetComputedCommonSourceDirectory(emittedFiles []tspath.RootedFilePath, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) tspath.RootedDirectoryPath {
	return computeCommonSourceDirectoryOfFilenames(emittedFiles, currentDirectory, caseSensitivity)
}

func GetCommonSourceDirectory(options *core.CompilerOptions, files func() []tspath.RootedFilePath, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity, checkSourceFilesBelongToPath func([]tspath.RootedFilePath, tspath.RootedDirectoryPath) bool) tspath.RootedDirectoryPath {
	var commonSourceDirectory tspath.RootedDirectoryPath
	if options.RootDir != "" {
		// If a rootDir is specified use it as the commonSourceDirectory
		commonSourceDirectory = options.RootDir
		if checkSourceFilesBelongToPath != nil {
			checkSourceFilesBelongToPath(files(), commonSourceDirectory)
		}
	} else if options.ConfigFilePath != "" {
		// If the rootDir is not specified, then the common source directory is the directory of the config file.
		commonSourceDirectory = options.ConfigFilePath.Directory()
		if checkSourceFilesBelongToPath != nil {
			checkSourceFilesBelongToPath(files(), commonSourceDirectory)
		}
	} else {
		commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(files(), currentDirectory, caseSensitivity)
	}

	return commonSourceDirectory
}
