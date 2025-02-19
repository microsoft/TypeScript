package tsoptions

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/vfs"
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
) *TestCommandLineParser {
	parser := &commandLineParser{
		fs:                fs,
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
