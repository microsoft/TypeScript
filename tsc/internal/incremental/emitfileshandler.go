package incremental

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type emitUpdate struct {
	pendingKind FileEmitKind
	result      *compiler.EmitResult
}

type emitFilesHandler struct {
	ctx                   context.Context
	program               *Program
	isForDtsErrors        bool
	signatures            collections.SyncMap[tspath.Path, string]
	emitSignatures        collections.SyncMap[tspath.Path, *emitSignature]
	latestChangedDtsFiles collections.SyncSet[string]
	deletedPendingKinds   collections.Set[tspath.Path]
	emitUpdates           collections.SyncMap[tspath.Path, *emitUpdate]
}

// Determining what all is pending to be emitted based on previous options or previous file emit flags
func (h *emitFilesHandler) getPendingEmitKindForEmitOptions(emitKind FileEmitKind, options compiler.EmitOptions) FileEmitKind {
	pendingKind := getPendingEmitKind(emitKind, 0)
	if options.EmitOnly == compiler.EmitOnlyDts {
		pendingKind &= FileEmitKindAllDts
	}
	if h.isForDtsErrors {
		pendingKind &= FileEmitKindDtsErrors
	}
	return pendingKind
}

// Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
// The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
// in that order would be used to write the files
func (h *emitFilesHandler) emitAllAffectedFiles(options compiler.EmitOptions) *compiler.EmitResult {
	// Get all affected files
	collectAllAffectedFiles(h.ctx, h.program)
	if h.ctx.Err() != nil {
		return nil
	}

	// Emit all affected files
	var results []*compiler.EmitResult
	if len(h.program.snapshot.affectedFilesPendingEmit) != 0 {
		wg := core.NewWorkGroup(h.program.program.SingleThreaded())
		for path, emitKind := range h.program.snapshot.affectedFilesPendingEmit {
			affectedFile := h.program.program.GetSourceFileByPath(path)
			if affectedFile == nil || !h.program.program.SourceFileMayBeEmitted(affectedFile, false) {
				h.deletedPendingKinds.Add(path)
				continue
			}
			pendingKind := h.getPendingEmitKindForEmitOptions(emitKind, options)
			if pendingKind != 0 {
				wg.Queue(func() {
					// Determine if we can do partial emit
					var emitOnly compiler.EmitOnly
					if (pendingKind & FileEmitKindAllJs) != 0 {
						emitOnly = compiler.EmitOnlyJs
					}
					if (pendingKind & FileEmitKindAllDts) != 0 {
						if emitOnly == compiler.EmitOnlyJs {
							emitOnly = compiler.EmitAll
						} else {
							emitOnly = compiler.EmitOnlyDts
						}
					}
					var result *compiler.EmitResult
					if !h.isForDtsErrors {
						result = h.program.program.Emit(h.ctx, h.getEmitOptions(compiler.EmitOptions{
							TargetSourceFile: affectedFile,
							EmitOnly:         emitOnly,
							WriteFile:        options.WriteFile,
						}))
					} else {
						result = &compiler.EmitResult{
							EmitSkipped: true,
							Diagnostics: h.program.program.GetDeclarationDiagnostics(h.ctx, affectedFile),
						}
					}

					// Update the pendingEmit for the file
					h.emitUpdates.Store(path, &emitUpdate{pendingKind: getPendingEmitKind(emitKind, pendingKind), result: result})
				})
			}
		}
		wg.RunAndWait()
		if h.ctx.Err() != nil {
			return nil
		}
	}

	// Get updated errors that were not included in affected files emit
	for path, diagnostics := range h.program.snapshot.emitDiagnosticsPerFile {
		if _, ok := h.emitUpdates.Load(path); !ok {
			affectedFile := h.program.program.GetSourceFileByPath(path)
			if affectedFile == nil || !h.program.program.SourceFileMayBeEmitted(affectedFile, false) {
				h.deletedPendingKinds.Add(path)
				continue
			}
			pendingKind := h.program.snapshot.affectedFilesPendingEmit[path]
			h.emitUpdates.Store(path, &emitUpdate{pendingKind: pendingKind, result: &compiler.EmitResult{
				EmitSkipped: true,
				Diagnostics: diagnostics.getDiagnostics(h.program.program, affectedFile),
			}})
		}
	}

	results = h.updateSnapshot()

	// Combine results and update buildInfo
	if h.isForDtsErrors && options.TargetSourceFile != nil {
		// Result from cache
		diagnostics := h.program.snapshot.emitDiagnosticsPerFile[options.TargetSourceFile.Path()]
		return &compiler.EmitResult{
			EmitSkipped: true,
			Diagnostics: diagnostics.getDiagnostics(h.program.program, options.TargetSourceFile),
		}
	}

	result := compiler.CombineEmitResults(results)
	if !h.isForDtsErrors {
		buildInfoResult := h.program.emitBuildInfo(h.ctx, options)
		if buildInfoResult != nil {
			result.Diagnostics = append(result.Diagnostics, buildInfoResult.Diagnostics...)
			result.EmittedFiles = append(result.EmittedFiles, buildInfoResult.EmittedFiles...)
		}
	}

	return result
}

func (h *emitFilesHandler) getEmitOptions(options compiler.EmitOptions) compiler.EmitOptions {
	if !h.program.snapshot.options.GetEmitDeclarations() {
		return options
	}
	return compiler.EmitOptions{
		TargetSourceFile: options.TargetSourceFile,
		EmitOnly:         options.EmitOnly,
		WriteFile: func(fileName string, text string, writeByteOrderMark bool, data *compiler.WriteFileData) error {
			if tspath.IsDeclarationFileName(fileName) {
				var emitSignature string
				info := h.program.snapshot.fileInfos[options.TargetSourceFile.Path()]
				if info.signature == info.version {
					signature := h.program.snapshot.computeSignatureWithDiagnostics(options.TargetSourceFile, text, data)
					// With d.ts diagnostics they are also part of the signature so emitSignature will be different from it since its just hash of d.ts
					if len(data.Diagnostics) == 0 {
						emitSignature = signature
					}
					if signature != info.version { // Update it
						h.signatures.Store(options.TargetSourceFile.Path(), signature)
					}
				}

				// Store d.ts emit hash so later can be compared to check if d.ts has changed.
				// Currently we do this only for composite projects since these are the only projects that can be referenced by other projects
				// and would need their d.ts change time in --build mode
				if h.skipDtsOutputOfComposite(options.TargetSourceFile, fileName, text, data, emitSignature) {
					return nil
				}
			}

			if options.WriteFile != nil {
				return options.WriteFile(fileName, text, writeByteOrderMark, data)
			}
			return h.program.program.Host().FS().WriteFile(fileName, text, writeByteOrderMark)
		},
	}
}

// Compare to existing computed signature and store it or handle the changes in d.ts map option from before
// returning undefined means that, we dont need to emit this d.ts file since its contents didnt change
func (h *emitFilesHandler) skipDtsOutputOfComposite(file *ast.SourceFile, outputFileName string, text string, data *compiler.WriteFileData, newSignature string) bool {
	if !h.program.snapshot.options.Composite.IsTrue() {
		return false
	}
	var oldSignature string
	oldSignatureFormat, ok := h.program.snapshot.emitSignatures[file.Path()]
	if ok {
		if oldSignatureFormat.signature != "" {
			oldSignature = oldSignatureFormat.signature
		} else {
			oldSignature = oldSignatureFormat.signatureWithDifferentOptions[0]
		}
	}
	if newSignature == "" {
		newSignature = h.program.snapshot.computeHash(getTextHandlingSourceMapForSignature(text, data))
	}
	// Dont write dts files if they didn't change
	if newSignature == oldSignature {
		// If the signature was encoded as string the dts map options match so nothing to do
		if oldSignatureFormat != nil && oldSignatureFormat.signature == oldSignature {
			data.SkippedDtsWrite = true
			return true
		} else {
			// Mark as differsOnlyInMap so that --build can reverse the timestamp so that
			// the downstream projects dont detect this as change in d.ts file
			data.DiffersOnlyInMap = true
		}
	} else {
		h.latestChangedDtsFiles.Add(outputFileName)
	}
	h.emitSignatures.Store(file.Path(), &emitSignature{signature: newSignature})
	return false
}

func (h *emitFilesHandler) updateSnapshot() []*compiler.EmitResult {
	h.signatures.Range(func(file tspath.Path, signature string) bool {
		info := h.program.snapshot.fileInfos[file]
		info.signature = signature
		if h.program.updatedSignatureKinds != nil {
			h.program.updatedSignatureKinds[file] = SignatureUpdateKindStoredAtEmit
		}
		h.program.snapshot.buildInfoEmitPending = true
		return true
	})
	h.emitSignatures.Range(func(file tspath.Path, signature *emitSignature) bool {
		if h.program.snapshot.emitSignatures == nil {
			h.program.snapshot.emitSignatures = make(map[tspath.Path]*emitSignature)
		}
		h.program.snapshot.emitSignatures[file] = signature
		h.program.snapshot.buildInfoEmitPending = true
		return true
	})
	latestChangedDtsFiles := h.latestChangedDtsFiles.ToSlice()
	slices.Sort(latestChangedDtsFiles)
	if latestChangedDtsFile := core.LastOrNil(latestChangedDtsFiles); latestChangedDtsFile != "" {
		h.program.snapshot.latestChangedDtsFile = latestChangedDtsFile
		h.program.snapshot.buildInfoEmitPending = true
	}
	for file := range h.deletedPendingKinds.Keys() {
		delete(h.program.snapshot.affectedFilesPendingEmit, file)
		h.program.snapshot.buildInfoEmitPending = true
	}
	var results []*compiler.EmitResult
	h.emitUpdates.Range(func(file tspath.Path, update *emitUpdate) bool {
		if update.pendingKind == 0 {
			delete(h.program.snapshot.affectedFilesPendingEmit, file)
		} else {
			h.program.snapshot.affectedFilesPendingEmit[file] = update.pendingKind
		}
		if update.result != nil {
			results = append(results, update.result)
			if len(update.result.Diagnostics) != 0 {
				if h.program.snapshot.emitDiagnosticsPerFile == nil {
					h.program.snapshot.emitDiagnosticsPerFile = make(map[tspath.Path]*diagnosticsOrBuildInfoDiagnosticsWithFileName)
				}
				h.program.snapshot.emitDiagnosticsPerFile[file] = &diagnosticsOrBuildInfoDiagnosticsWithFileName{diagnostics: update.result.Diagnostics}
			}
		}
		h.program.snapshot.buildInfoEmitPending = true
		return true
	})
	return results
}

func emitFiles(ctx context.Context, program *Program, options compiler.EmitOptions, isForDtsErrors bool) *compiler.EmitResult {
	emitHandler := &emitFilesHandler{ctx: ctx, program: program, isForDtsErrors: isForDtsErrors}

	if options.TargetSourceFile != nil {
		result := program.program.Emit(ctx, emitHandler.getEmitOptions(options))
		if ctx.Err() != nil {
			return nil
		}
		emitHandler.updateSnapshot()
		return result
	}

	// Emit only affected files if using builder for emit
	return emitHandler.emitAllAffectedFiles(options)
}
