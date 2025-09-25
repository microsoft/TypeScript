package incremental

import (
	"encoding/hex"
	"fmt"
	"strings"
	"sync"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/zeebo/xxh3"
)

type fileInfo struct {
	version            string
	signature          string
	affectsGlobalScope bool
	impliedNodeFormat  core.ResolutionMode
}

func (f *fileInfo) Version() string                        { return f.version }
func (f *fileInfo) Signature() string                      { return f.signature }
func (f *fileInfo) AffectsGlobalScope() bool               { return f.affectsGlobalScope }
func (f *fileInfo) ImpliedNodeFormat() core.ResolutionMode { return f.impliedNodeFormat }

func ComputeHash(text string, hashWithText bool) string {
	hashBytes := xxh3.Hash128([]byte(text)).Bytes()
	hash := hex.EncodeToString(hashBytes[:])
	if hashWithText {
		hash += "-" + text
	}
	return hash
}

type FileEmitKind uint32

const (
	FileEmitKindNone        FileEmitKind = 0
	FileEmitKindJs          FileEmitKind = 1 << 0 // emit js file
	FileEmitKindJsMap       FileEmitKind = 1 << 1 // emit js.map file
	FileEmitKindJsInlineMap FileEmitKind = 1 << 2 // emit inline source map in js file
	FileEmitKindDtsErrors   FileEmitKind = 1 << 3 // emit dts errors
	FileEmitKindDtsEmit     FileEmitKind = 1 << 4 // emit d.ts file
	FileEmitKindDtsMap      FileEmitKind = 1 << 5 // emit d.ts.map file

	FileEmitKindDts        = FileEmitKindDtsErrors | FileEmitKindDtsEmit
	FileEmitKindAllJs      = FileEmitKindJs | FileEmitKindJsMap | FileEmitKindJsInlineMap
	FileEmitKindAllDtsEmit = FileEmitKindDtsEmit | FileEmitKindDtsMap
	FileEmitKindAllDts     = FileEmitKindDts | FileEmitKindDtsMap
	FileEmitKindAll        = FileEmitKindAllJs | FileEmitKindAllDts
)

func GetFileEmitKind(options *core.CompilerOptions) FileEmitKind {
	result := FileEmitKindJs
	if options.SourceMap.IsTrue() {
		result |= FileEmitKindJsMap
	}
	if options.InlineSourceMap.IsTrue() {
		result |= FileEmitKindJsInlineMap
	}
	if options.GetEmitDeclarations() {
		result |= FileEmitKindDts
	}
	if options.DeclarationMap.IsTrue() {
		result |= FileEmitKindDtsMap
	}
	if options.EmitDeclarationOnly.IsTrue() {
		result &= FileEmitKindAllDts
	}
	return result
}

func getPendingEmitKindWithOptions(options *core.CompilerOptions, oldOptions *core.CompilerOptions) FileEmitKind {
	oldEmitKind := GetFileEmitKind(oldOptions)
	newEmitKind := GetFileEmitKind(options)
	return getPendingEmitKind(newEmitKind, oldEmitKind)
}

func getPendingEmitKind(emitKind FileEmitKind, oldEmitKind FileEmitKind) FileEmitKind {
	if oldEmitKind == emitKind {
		return FileEmitKindNone
	}
	if oldEmitKind == 0 || emitKind == 0 {
		return emitKind
	}
	diff := oldEmitKind ^ emitKind
	result := FileEmitKindNone
	// If there is diff in Js emit, pending emit is js emit flags
	if (diff & FileEmitKindAllJs) != 0 {
		result |= emitKind & FileEmitKindAllJs
	}
	// If dts errors pending, add dts errors flag
	if (diff & FileEmitKindDtsErrors) != 0 {
		result |= emitKind & FileEmitKindAllDts
	}
	// If there is diff in Dts emit, pending emit is dts emit flags
	if (diff & FileEmitKindAllDtsEmit) != 0 {
		result |= emitKind & FileEmitKindAllDtsEmit
	}
	return result
}

// Signature (Hash of d.ts emitted), is string if it was emitted using same d.ts.map option as what compilerOptions indicate,
// otherwise tuple of string
type emitSignature struct {
	signature                     string
	signatureWithDifferentOptions []string
}

// Covert to Emit signature based on oldOptions and EmitSignature format
// If d.ts map options differ then swap the format, otherwise use as is
func (e *emitSignature) getNewEmitSignature(oldOptions *core.CompilerOptions, newOptions *core.CompilerOptions) *emitSignature {
	if oldOptions.DeclarationMap.IsTrue() == newOptions.DeclarationMap.IsTrue() {
		return e
	}
	if e.signatureWithDifferentOptions == nil {
		return &emitSignature{
			signatureWithDifferentOptions: []string{e.signature},
		}
	} else {
		return &emitSignature{
			signature: e.signatureWithDifferentOptions[0],
		}
	}
}

type buildInfoDiagnosticWithFileName struct {
	// filename if it is for a File thats other than its stored for
	file               tspath.Path
	noFile             bool
	pos                int
	end                int
	code               int32
	category           diagnostics.Category
	message            string
	messageChain       []*buildInfoDiagnosticWithFileName
	relatedInformation []*buildInfoDiagnosticWithFileName
	reportsUnnecessary bool
	reportsDeprecated  bool
	skippedOnNoEmit    bool
}

type diagnosticsOrBuildInfoDiagnosticsWithFileName struct {
	diagnostics          []*ast.Diagnostic
	buildInfoDiagnostics []*buildInfoDiagnosticWithFileName
}

func (b *buildInfoDiagnosticWithFileName) toDiagnostic(p *compiler.Program, file *ast.SourceFile) *ast.Diagnostic {
	var fileForDiagnostic *ast.SourceFile
	if b.file != "" {
		fileForDiagnostic = p.GetSourceFileByPath(b.file)
	} else if !b.noFile {
		fileForDiagnostic = file
	}
	var messageChain []*ast.Diagnostic
	for _, msg := range b.messageChain {
		messageChain = append(messageChain, msg.toDiagnostic(p, fileForDiagnostic))
	}
	var relatedInformation []*ast.Diagnostic
	for _, info := range b.relatedInformation {
		relatedInformation = append(relatedInformation, info.toDiagnostic(p, fileForDiagnostic))
	}
	return ast.NewDiagnosticWith(
		fileForDiagnostic,
		core.NewTextRange(b.pos, b.end),
		b.code,
		b.category,
		b.message,
		messageChain,
		relatedInformation,
		b.reportsUnnecessary,
		b.reportsDeprecated,
		b.skippedOnNoEmit,
	)
}

func (d *diagnosticsOrBuildInfoDiagnosticsWithFileName) getDiagnostics(p *compiler.Program, file *ast.SourceFile) []*ast.Diagnostic {
	if d.diagnostics != nil {
		return d.diagnostics
	}
	// Convert and cache the diagnostics
	d.diagnostics = core.Map(d.buildInfoDiagnostics, func(diag *buildInfoDiagnosticWithFileName) *ast.Diagnostic {
		return diag.toDiagnostic(p, file)
	})
	return d.diagnostics
}

type snapshot struct {
	// These are the fields that get serialized

	// Information of the file eg. its version, signature etc
	fileInfos collections.SyncMap[tspath.Path, *fileInfo]
	options   *core.CompilerOptions
	//  Contains the map of ReferencedSet=Referenced files of the file if module emit is enabled
	referencedMap referenceMap
	// Cache of semantic diagnostics for files with their Path being the key
	semanticDiagnosticsPerFile collections.SyncMap[tspath.Path, *diagnosticsOrBuildInfoDiagnosticsWithFileName]
	// Cache of dts emit diagnostics for files with their Path being the key
	emitDiagnosticsPerFile collections.SyncMap[tspath.Path, *diagnosticsOrBuildInfoDiagnosticsWithFileName]
	// The map has key by source file's path that has been changed
	changedFilesSet collections.SyncSet[tspath.Path]
	// Files pending to be emitted
	affectedFilesPendingEmit collections.SyncMap[tspath.Path, FileEmitKind]
	// Name of the file whose dts was the latest to change
	latestChangedDtsFile string
	// Hash of d.ts emitted for the file, use to track when emit of d.ts changes
	emitSignatures collections.SyncMap[tspath.Path, *emitSignature]
	// Recorded if program had errors that need to be reported even with --noCheck
	hasErrors core.Tristate
	// Recorded if program had semantic errors only for non incremental build
	hasSemanticErrors bool
	// If semantic diagnostic check is pending
	checkPending bool

	// Additional fields that are not serialized but needed to track state

	// true if build info emit is pending
	buildInfoEmitPending                    atomic.Bool
	hasErrorsFromOldState                   core.Tristate
	hasSemanticErrorsFromOldState           bool
	allFilesExcludingDefaultLibraryFileOnce sync.Once
	//  Cache of all files excluding default library file for the current program
	allFilesExcludingDefaultLibraryFile []*ast.SourceFile
	hasChangedDtsFile                   bool
	hasEmitDiagnostics                  bool

	// Used with testing to add text of hash for better comparison
	hashWithText bool
}

func (s *snapshot) addFileToChangeSet(filePath tspath.Path) {
	s.changedFilesSet.Add(filePath)
	s.buildInfoEmitPending.Store(true)
}

func (s *snapshot) addFileToAffectedFilesPendingEmit(filePath tspath.Path, emitKind FileEmitKind) {
	existingKind, _ := s.affectedFilesPendingEmit.Load(filePath)
	s.affectedFilesPendingEmit.Store(filePath, existingKind|emitKind)
	if emitKind&FileEmitKindDtsErrors != 0 {
		s.emitDiagnosticsPerFile.Delete(filePath)
	}
	s.buildInfoEmitPending.Store(true)
}

func (s *snapshot) getAllFilesExcludingDefaultLibraryFile(program *compiler.Program, firstSourceFile *ast.SourceFile) []*ast.SourceFile {
	s.allFilesExcludingDefaultLibraryFileOnce.Do(func() {
		files := program.GetSourceFiles()
		s.allFilesExcludingDefaultLibraryFile = make([]*ast.SourceFile, 0, len(files))
		addSourceFile := func(file *ast.SourceFile) {
			if !program.IsSourceFileDefaultLibrary(file.Path()) {
				s.allFilesExcludingDefaultLibraryFile = append(s.allFilesExcludingDefaultLibraryFile, file)
			}
		}
		if firstSourceFile != nil {
			addSourceFile(firstSourceFile)
		}
		for _, file := range files {
			if file != firstSourceFile {
				addSourceFile(file)
			}
		}
	})
	return s.allFilesExcludingDefaultLibraryFile
}

func getTextHandlingSourceMapForSignature(text string, data *compiler.WriteFileData) string {
	if data.SourceMapUrlPos != -1 {
		return text[:data.SourceMapUrlPos]
	}
	return text
}

func (s *snapshot) computeSignatureWithDiagnostics(file *ast.SourceFile, text string, data *compiler.WriteFileData) string {
	var builder strings.Builder
	builder.WriteString(getTextHandlingSourceMapForSignature(text, data))
	for _, diag := range data.Diagnostics {
		diagnosticToStringBuilder(diag, file, &builder)
	}
	return s.computeHash(builder.String())
}

func diagnosticToStringBuilder(diagnostic *ast.Diagnostic, file *ast.SourceFile, builder *strings.Builder) {
	if diagnostic == nil {
		return
	}
	builder.WriteString("\n")
	if diagnostic.File() != file {
		builder.WriteString(tspath.EnsurePathIsNonModuleName(tspath.GetRelativePathFromDirectory(
			tspath.GetDirectoryPath(string(file.Path())),
			string(diagnostic.File().Path()),
			tspath.ComparePathsOptions{},
		)))
	}
	if diagnostic.File() != nil {
		builder.WriteString(fmt.Sprintf("(%d,%d): ", diagnostic.Pos(), diagnostic.Len()))
	}
	builder.WriteString(diagnostic.Category().Name())
	builder.WriteString(fmt.Sprintf("%d: ", diagnostic.Code()))
	builder.WriteString(diagnostic.Message())
	for _, chain := range diagnostic.MessageChain() {
		diagnosticToStringBuilder(chain, file, builder)
	}
	for _, info := range diagnostic.RelatedInformation() {
		diagnosticToStringBuilder(info, file, builder)
	}
}

func (s *snapshot) computeHash(text string) string {
	return ComputeHash(text, s.hashWithText)
}

func (s *snapshot) canUseIncrementalState() bool {
	if !s.options.IsIncremental() && s.options.Build.IsTrue() {
		// If not incremental build (with tsc -b), we don't need to track state except diagnostics per file so we can use it
		return false
	}
	return true
}
