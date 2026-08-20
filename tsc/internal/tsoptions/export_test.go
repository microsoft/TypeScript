package tsoptions

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

func getTestParseCommandLineWorkerDiagnostics(decls []*CommandLineOption) *ParseCommandLineWorkerDiagnostics {
	if len(decls) == 0 {
		return CompilerOptionsDidYouMeanDiagnostics
	}
	return getParseCommandLineWorkerDiagnostics(decls)
}

func ParseCommandLineTestWorker(
	decls []*CommandLineOption,
	commandLine []string,
	fs vfs.FS,
	currentDirectory string,
) *TestCommandLineParser {
	parser := &commandLineParser{
		fs:                fs,
		currentDirectory:  currentDirectory,
		workerDiagnostics: CompilerOptionsDidYouMeanDiagnostics,
		fileNames:         []string{},
		options:           &collections.OrderedMap[string, any]{},
		errors:            []*ast.Diagnostic{},
	}
	if len(decls) != 0 {
		parser.workerDiagnostics = getTestParseCommandLineWorkerDiagnostics(decls)
	}

	parser.optionsMap = GetNameMapFromList(parser.OptionsDeclarations())
	parser.parseStrings(commandLine)
	return &TestCommandLineParser{
		Fs:                fs,
		WorkerDiagnostics: parser.workerDiagnostics,
		FileNames:         parser.fileNames,
		Options:           parser.options,
		Errors:            parser.errors,
	}
}

type TestCommandLineParser struct {
	Fs                vfs.FS
	WorkerDiagnostics *ParseCommandLineWorkerDiagnostics
	FileNames         []string
	Options           *collections.OrderedMap[string, any]
	Errors            []*ast.Diagnostic
}
