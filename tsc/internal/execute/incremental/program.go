package incremental

import (
	"context"
	"fmt"
	"slices"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/outputpaths"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type SignatureUpdateKind byte

const (
	SignatureUpdateKindComputedDts SignatureUpdateKind = iota
	SignatureUpdateKindStoredAtEmit
	SignatureUpdateKindUsedVersion
)

type Program struct {
	snapshot *snapshot
	program  *compiler.Program
	host     Host

	// Testing data
	testingData *TestingData
}

var _ compiler.ProgramLike = (*Program)(nil)

func NewProgram(program *compiler.Program, oldProgram *Program, host Host, testing bool) *Program {
	incrementalProgram := &Program{
		snapshot: programToSnapshot(program, oldProgram, testing),
		program:  program,
		host:     host,
	}

	if testing {
		incrementalProgram.testingData = &TestingData{}
		incrementalProgram.testingData.SemanticDiagnosticsPerFile = &incrementalProgram.snapshot.semanticDiagnosticsPerFile
		if oldProgram != nil {
			incrementalProgram.testingData.OldProgramSemanticDiagnosticsPerFile = &oldProgram.snapshot.semanticDiagnosticsPerFile
		} else {
			incrementalProgram.testingData.OldProgramSemanticDiagnosticsPerFile = &collections.SyncMap[tspath.Path, *diagnosticsOrBuildInfoDiagnosticsWithFileName]{}
		}
		incrementalProgram.testingData.UpdatedSignatureKinds = make(map[tspath.Path]SignatureUpdateKind)
	}
	return incrementalProgram
}

type TestingData struct {
	SemanticDiagnosticsPerFile           *collections.SyncMap[tspath.Path, *diagnosticsOrBuildInfoDiagnosticsWithFileName]
	OldProgramSemanticDiagnosticsPerFile *collections.SyncMap[tspath.Path, *diagnosticsOrBuildInfoDiagnosticsWithFileName]
	UpdatedSignatureKinds                map[tspath.Path]SignatureUpdateKind
}

func (p *Program) GetTestingData() *TestingData {
	return p.testingData
}

func (p *Program) panicIfNoProgram(method string) {
	if p.program == nil {
		panic(method + ": should not be called without program")
	}
}

func (p *Program) GetProgram() *compiler.Program {
	p.panicIfNoProgram("GetProgram")
	return p.program
}

func (p *Program) HasChangedDtsFile() bool {
	return p.snapshot.hasChangedDtsFile
}

// Options implements compiler.AnyProgram interface.
func (p *Program) Options() *core.CompilerOptions {
	return p.snapshot.options
}

// GetSourceFiles implements compiler.AnyProgram interface.
func (p *Program) GetSourceFiles() []*ast.SourceFile {
	p.panicIfNoProgram("GetSourceFiles")
	return p.program.GetSourceFiles()
}

// GetConfigFileParsingDiagnostics implements compiler.AnyProgram interface.
func (p *Program) GetConfigFileParsingDiagnostics() []*ast.Diagnostic {
	p.panicIfNoProgram("GetConfigFileParsingDiagnostics")
	return p.program.GetConfigFileParsingDiagnostics()
}

// GetSyntacticDiagnostics implements compiler.AnyProgram interface.
func (p *Program) GetSyntacticDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
	p.panicIfNoProgram("GetSyntacticDiagnostics")
	return p.program.GetSyntacticDiagnostics(ctx, file)
}

// GetBindDiagnostics implements compiler.AnyProgram interface.
func (p *Program) GetBindDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
	p.panicIfNoProgram("GetBindDiagnostics")
	return p.program.GetBindDiagnostics(ctx, file)
}

// GetOptionsDiagnostics implements compiler.AnyProgram interface.
func (p *Program) GetOptionsDiagnostics(ctx context.Context) []*ast.Diagnostic {
	p.panicIfNoProgram("GetOptionsDiagnostics")
	return p.program.GetOptionsDiagnostics(ctx)
}

func (p *Program) GetProgramDiagnostics() []*ast.Diagnostic {
	p.panicIfNoProgram("GetProgramDiagnostics")
	return p.program.GetProgramDiagnostics()
}

func (p *Program) GetGlobalDiagnostics(ctx context.Context) []*ast.Diagnostic {
	p.panicIfNoProgram("GetGlobalDiagnostics")
	return p.program.GetGlobalDiagnostics(ctx)
}

// GetSemanticDiagnostics implements compiler.AnyProgram interface.
func (p *Program) GetSemanticDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
	p.panicIfNoProgram("GetSemanticDiagnostics")
	if p.snapshot.options.NoCheck.IsTrue() {
		return nil
	}

	// Ensure all the diagnsotics are cached
	p.collectSemanticDiagnosticsOfAffectedFiles(ctx, file)
	if ctx.Err() != nil {
		return nil
	}

	// Return result from cache
	if file != nil {
		return p.getSemanticDiagnosticsOfFile(file)
	}

	var diagnostics []*ast.Diagnostic
	for _, file := range p.program.GetSourceFiles() {
		diagnostics = append(diagnostics, p.getSemanticDiagnosticsOfFile(file)...)
	}
	return diagnostics
}

func (p *Program) getSemanticDiagnosticsOfFile(file *ast.SourceFile) []*ast.Diagnostic {
	cachedDiagnostics, ok := p.snapshot.semanticDiagnosticsPerFile.Load(file.Path())
	if !ok {
		panic("After handling all the affected files, there shouldnt be more changes")
	}
	return slices.Concat(
		compiler.FilterNoEmitSemanticDiagnostics(cachedDiagnostics.getDiagnostics(p.program, file), p.snapshot.options),
		p.program.GetIncludeProcessorDiagnostics(file),
	)
}

// GetDeclarationDiagnostics implements compiler.AnyProgram interface.
func (p *Program) GetDeclarationDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic {
	p.panicIfNoProgram("GetDeclarationDiagnostics")
	result := emitFiles(ctx, p, compiler.EmitOptions{
		TargetSourceFile: file,
	}, true)
	if result != nil {
		return result.Diagnostics
	}
	return nil
}

// GetModeForUsageLocation implements compiler.AnyProgram interface.
func (p *Program) Emit(ctx context.Context, options compiler.EmitOptions) *compiler.EmitResult {
	p.panicIfNoProgram("Emit")

	var result *compiler.EmitResult
	if p.snapshot.options.NoEmit.IsTrue() {
		result = &compiler.EmitResult{EmitSkipped: true}
	} else {
		result = compiler.HandleNoEmitOnError(ctx, p, options.TargetSourceFile)
		if ctx.Err() != nil {
			return nil
		}
	}
	if result != nil {
		if options.TargetSourceFile != nil {
			return result
		}

		// Emit buildInfo and combine result
		buildInfoResult := p.emitBuildInfo(ctx, options)
		if buildInfoResult != nil {
			result.Diagnostics = append(result.Diagnostics, buildInfoResult.Diagnostics...)
			result.EmittedFiles = append(result.EmittedFiles, buildInfoResult.EmittedFiles...)
		}
		return result
	}
	return emitFiles(ctx, p, options, false)
}

// Handle affected files and cache the semantic diagnostics for all of them or the file asked for
func (p *Program) collectSemanticDiagnosticsOfAffectedFiles(ctx context.Context, file *ast.SourceFile) {
	if p.snapshot.canUseIncrementalState() {
		// Get all affected files
		collectAllAffectedFiles(ctx, p)
		if ctx.Err() != nil {
			return
		}

		if p.snapshot.semanticDiagnosticsPerFile.Size() == len(p.program.GetSourceFiles()) {
			// If we have all the files,
			return
		}
	}

	var affectedFiles []*ast.SourceFile
	if file != nil {
		_, ok := p.snapshot.semanticDiagnosticsPerFile.Load(file.Path())
		if ok {
			return
		}
		affectedFiles = []*ast.SourceFile{file}
	} else {
		for _, file := range p.program.GetSourceFiles() {
			if _, ok := p.snapshot.semanticDiagnosticsPerFile.Load(file.Path()); !ok {
				affectedFiles = append(affectedFiles, file)
			}
		}
	}

	// Get their diagnostics and cache them
	diagnosticsPerFile := p.program.GetSemanticDiagnosticsNoFilter(ctx, affectedFiles)
	// commit changes if no err
	if ctx.Err() != nil {
		return
	}

	// Commit changes to snapshot
	for file, diagnostics := range diagnosticsPerFile {
		p.snapshot.semanticDiagnosticsPerFile.Store(file.Path(), &diagnosticsOrBuildInfoDiagnosticsWithFileName{diagnostics: diagnostics})
	}
	if p.snapshot.semanticDiagnosticsPerFile.Size() == len(p.program.GetSourceFiles()) && p.snapshot.checkPending && !p.snapshot.options.NoCheck.IsTrue() {
		p.snapshot.checkPending = false
	}
	p.snapshot.buildInfoEmitPending.Store(true)
}

func (p *Program) emitBuildInfo(ctx context.Context, options compiler.EmitOptions) *compiler.EmitResult {
	buildInfoFileName := outputpaths.GetBuildInfoFileName(p.snapshot.options, tspath.ComparePathsOptions{
		CurrentDirectory:          p.program.GetCurrentDirectory(),
		UseCaseSensitiveFileNames: p.program.UseCaseSensitiveFileNames(),
	})
	if buildInfoFileName == "" || p.program.IsEmitBlocked(buildInfoFileName) {
		return nil
	}
	if p.snapshot.hasErrors == core.TSUnknown {
		p.ensureHasErrorsForState(ctx, p.program)
		if p.snapshot.hasErrors != p.snapshot.hasErrorsFromOldState || p.snapshot.hasSemanticErrors != p.snapshot.hasSemanticErrorsFromOldState {
			p.snapshot.buildInfoEmitPending.Store(true)
		}
	}
	if !p.snapshot.buildInfoEmitPending.Load() {
		return nil
	}
	if ctx.Err() != nil {
		return nil
	}
	buildInfo := snapshotToBuildInfo(p.snapshot, p.program, buildInfoFileName)
	text, err := json.Marshal(buildInfo)
	if err != nil {
		panic(fmt.Sprintf("Failed to marshal build info: %v", err))
	}
	if options.WriteFile != nil {
		err = options.WriteFile(buildInfoFileName, string(text), false, &compiler.WriteFileData{
			BuildInfo: buildInfo,
		})
	} else {
		err = p.program.Host().FS().WriteFile(buildInfoFileName, string(text), false)
	}
	if err != nil {
		return &compiler.EmitResult{
			EmitSkipped: true,
			Diagnostics: []*ast.Diagnostic{
				ast.NewCompilerDiagnostic(diagnostics.Could_not_write_file_0_Colon_1, buildInfoFileName, err.Error()),
			},
		}
	}
	p.snapshot.buildInfoEmitPending.Store(false)
	return &compiler.EmitResult{
		EmitSkipped:  false,
		EmittedFiles: []string{buildInfoFileName},
	}
}

func (p *Program) ensureHasErrorsForState(ctx context.Context, program *compiler.Program) {
	var hasIncludeProcessingDiagnostics func() bool
	var hasEmitDiagnostics bool
	if p.snapshot.canUseIncrementalState() {
		if slices.ContainsFunc(program.GetSourceFiles(), func(file *ast.SourceFile) bool {
			if _, ok := p.snapshot.emitDiagnosticsPerFile.Load(file.Path()); ok {
				// emit diagnostics will be encoded in buildInfo;
				return true
			}
			if hasIncludeProcessingDiagnostics == nil && len(p.program.GetIncludeProcessorDiagnostics(file)) > 0 {
				hasIncludeProcessingDiagnostics = func() bool { return true }
			}
			return false
		}) {
			hasEmitDiagnostics = true
		}
		if hasIncludeProcessingDiagnostics == nil {
			hasIncludeProcessingDiagnostics = func() bool { return false }
		}
	} else {
		hasEmitDiagnostics = p.snapshot.hasEmitDiagnostics
		hasIncludeProcessingDiagnostics = func() bool {
			return slices.ContainsFunc(program.GetSourceFiles(), func(file *ast.SourceFile) bool {
				return len(p.program.GetIncludeProcessorDiagnostics(file)) > 0
			})
		}
	}

	if hasEmitDiagnostics {
		// Record this for only non incremental build info
		p.snapshot.hasErrors = core.IfElse(p.snapshot.options.IsIncremental(), core.TSFalse, core.TSTrue)
		// Dont need to encode semantic errors state since the emit diagnostics are encoded
		p.snapshot.hasSemanticErrors = false
		return
	}

	if hasIncludeProcessingDiagnostics() ||
		len(program.GetConfigFileParsingDiagnostics()) > 0 ||
		len(program.GetSyntacticDiagnostics(ctx, nil)) > 0 ||
		len(program.GetProgramDiagnostics()) > 0 ||
		len(program.GetOptionsDiagnostics(ctx)) > 0 ||
		len(program.GetGlobalDiagnostics(ctx)) > 0 {
		p.snapshot.hasErrors = core.TSTrue
		// Dont need to encode semantic errors state since the syntax and program diagnostics are encoded as present
		p.snapshot.hasSemanticErrors = false
		return
	}

	p.snapshot.hasErrors = core.TSFalse
	// Check semantic and emit diagnostics first as we dont need to ask program about it
	if slices.ContainsFunc(program.GetSourceFiles(), func(file *ast.SourceFile) bool {
		semanticDiagnostics, ok := p.snapshot.semanticDiagnosticsPerFile.Load(file.Path())
		if !ok {
			// Missing semantic diagnostics in cache will be encoded in incremental buildInfo
			return p.snapshot.options.IsIncremental()
		}
		if len(semanticDiagnostics.diagnostics) > 0 || len(semanticDiagnostics.buildInfoDiagnostics) > 0 {
			// cached semantic diagnostics will be encoded in buildInfo
			return true
		}
		return false
	}) {
		// Because semantic diagnostics are recorded in buildInfo, we dont need to encode hasErrors in incremental buildInfo
		// But encode as errors in non incremental buildInfo
		p.snapshot.hasSemanticErrors = !p.snapshot.options.IsIncremental()
	}
}
