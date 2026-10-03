// Package transpile implements single-file JavaScript and declaration emit.
package transpile

import (
	"context"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// Options configures single-file transpilation.
type Options struct {
	// CompilerOptions are the base compiler options to use for the transpilation.
	// If nil, a default set of compiler options is used. Regardless of what is
	// provided, a number of options are unconditionally overridden; see
	// [TranspileModule] and [TranspileDeclaration].
	CompilerOptions *core.CompilerOptions

	// FileName is the name given to the synthesized input file. It only needs to
	// be provided if the source text relies on characteristics implied by the
	// file's extension or path, e.g. its extension controls whether the file is
	// parsed as a script or module, whether JSX syntax is allowed, etc.
	// Defaults to "module.ts", or "module.tsx" if CompilerOptions.Jsx is set.
	FileName string

	// ReportDiagnostics indicates whether syntactic and compiler option
	// diagnostics should be included in the result. Regardless of this setting,
	// diagnostics produced while emitting (including declaration emit errors
	// such as those produced by isolated declarations) are always included.
	ReportDiagnostics bool
}

// Output contains the emitted text and any requested diagnostics.
type Output struct {
	OutputText    string
	Diagnostics   []*ast.Diagnostic
	SourceMapText string
}

// inputDirectory is the synthetic current directory used to root the
// single input file created for transpilation.
var inputDirectory = tspath.RootedDirectoryPathFromNormalized("/")

// libDirectory is the synthetic directory that the barebones default library
// file is placed in for declaration transpilation. See [barebonesLibContent].
var libDirectory = tspath.RootedDirectoryPathFromNormalized("/lib")

// Declaration emit works without a `lib`, but some local inferences you'd
// expect to work won't without at least a minimal `lib` available, since the
// checker will type inferred declarations as `any` without these defined.
// Late bound symbol names, in particular, are impossible to define without
// `Symbol` at least partially defined.
// TODO: This should *probably* just load the full, real `lib` for the target.
const barebonesLibContent = `interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}
interface Array<T> { length: number; [n: number]: T; }
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}`

// TranspileModule transpiles a single file of source text to JavaScript
// using the specified options. If no compiler options are provided, a
// default set of compiler options is used. It returns nil if the context is
// canceled before emission completes.
//
// Extra compiler options that are unconditionally used by this function are:
//   - IsolatedModules = true (unless VerbatimModuleSyntax is set, which makes
//     this option redundant)
//   - NoCheck = true
//   - NoResolve = true
//   - NoLib = true
//   - Declaration = false
//   - DeclarationMap = false
//   - IsolatedDeclarations = false
func TranspileModule(ctx context.Context, input string, options Options) *Output {
	return transpileWorker(ctx, input, options, false /*declaration*/)
}

// TranspileDeclaration creates a declaration (.d.ts) file from a single file
// of source text using the specified options. If no compiler options are
// provided, a default set of compiler options is used.
//
// Note that, because only the single input file is available, the resulting
// declaration file may differ from the one a full program type-check and
// emit would produce.
//
// Extra compiler options that are unconditionally used by this function are:
//   - IsolatedModules = true (unless VerbatimModuleSyntax is set, which makes
//     this option redundant)
//   - NoCheck = true
//   - NoResolve = true
//   - NoLib = false
//   - Declaration = true
//   - EmitDeclarationOnly = true
//   - IsolatedDeclarations = true
func TranspileDeclaration(ctx context.Context, input string, options Options) *Output {
	return transpileWorker(ctx, input, options, true /*declaration*/)
}

func transpileWorker(ctx context.Context, input string, options Options, declaration bool) *Output {
	var opts *core.CompilerOptions
	if options.CompilerOptions != nil {
		opts = options.CompilerOptions.Clone()
	} else {
		opts = &core.CompilerOptions{}
	}

	setOptionsForTranspile(opts, declaration)

	// If jsx is specified, then treat the file as .tsx.
	fileName := options.FileName
	if fileName == "" {
		if opts.Jsx != core.JsxEmitNone {
			fileName = "module.tsx"
		} else {
			fileName = "module.ts"
		}
	}
	inputFileName := tspath.ToRootedFilePath(fileName, inputDirectory)

	files := map[tspath.RootedFilePath]string{
		inputFileName: input,
	}

	// Declaration emit needs a default lib to resolve global types (e.g.
	// `Array`, `Symbol`); plain transpilation sets NoLib so none is read.
	// The default lib name depends on the configured target.
	if declaration {
		libFileName := tsoptions.GetDefaultLibFileName(opts)
		files[libDirectory.ResolveFile(libFileName)] = barebonesLibContent
	}

	programFS := &transpileFS{files: files}
	host := compiler.NewCompilerHost(programFS, libDirectory, nil, nil, nil)

	program := compiler.NewProgram(compiler.ProgramOptions{
		Config:               tsoptions.NewParsedCommandLine(opts, []tspath.RootedFilePath{inputFileName}, nil, inputDirectory, programFS.CaseSensitivity()),
		Host:                 host,
		SkipModuleResolution: true,
	})

	var allDiagnostics []*ast.Diagnostic
	if options.ReportDiagnostics {
		sourceFile := program.GetSourceFile(inputFileName)
		allDiagnostics = append(allDiagnostics, program.GetSyntacticDiagnostics(ctx, sourceFile)...)
		allDiagnostics = append(allDiagnostics, program.GetConfigFileParsingDiagnostics()...)
		allDiagnostics = append(allDiagnostics, program.GetProgramDiagnostics()...)
	}

	emitOnly := compiler.EmitAll
	if declaration {
		emitOnly = compiler.EmitOnlyDts
	}

	var outputText, sourceMapText string
	var hasOutputText, hasSourceMapText bool
	result := program.Emit(ctx, compiler.EmitOptions{
		EmitOnly:  emitOnly,
		ForceEmit: declaration,
		WriteFile: func(fileName tspath.RootedFilePath, text string, data *compiler.WriteFileData) error {
			if fileName.ExtensionIs(".map") {
				debug.Assert(!hasSourceMapText, "Unexpected multiple source map outputs, file: "+fileName.AsString())
				sourceMapText = text
				hasSourceMapText = true
			} else {
				debug.Assert(!hasOutputText, "Unexpected multiple outputs, file: "+fileName.AsString())
				outputText = text
				hasOutputText = true
			}
			return nil
		},
	})
	if result == nil {
		return nil
	}

	// Diagnostics produced during emit (e.g. isolated declaration errors) are
	// always included, regardless of ReportDiagnostics.
	allDiagnostics = append(allDiagnostics, result.Diagnostics...)

	debug.Assert(hasOutputText, "Output generation failed")

	return &Output{
		OutputText:    outputText,
		Diagnostics:   allDiagnostics,
		SourceMapText: sourceMapText,
	}
}
