package incremental

import (
	"context"
	"time"

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
	latestChangedDtsFiles collections.SyncMap[tspath.Path, string]
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
	wg := core.NewWorkGroup(h.program.program.SingleThreaded())
	h.program.snapshot.affectedFilesPendingEmit.Range(func(path tspath.Path, emitKind FileEmitKind) bool {
		affectedFile := h.program.program.GetSourceFileByPath(path)
		if affectedFile == nil || !h.program.program.SourceFileMayBeEmitted(affectedFile, false) {
			h.deletedPendingKinds.Add(path)
			return true
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
		return true
	})
	wg.RunAndWait()
	if h.ctx.Err() != nil {
		return nil
	}

	// Get updated errors that were not included in affected files emit
	h.program.snapshot.emitDiagnosticsPerFile.Range(func(path tspath.Path, diagnostics *diagnosticsOrBuildInfoDiagnosticsWithFileName) bool {
		if _, ok := h.emitUpdates.Load(path); !ok {
			affectedFile := h.program.program.GetSourceFileByPath(path)
			if affectedFile == nil || !h.program.program.SourceFileMayBeEmitted(affectedFile, false) {
				h.deletedPendingKinds.Add(path)
				return true
			}
			pendingKind, _ := h.program.snapshot.affectedFilesPendingEmit.Load(path)
			h.emitUpdates.Store(path, &emitUpdate{pendingKind: pendingKind, result: &compiler.EmitResult{
				EmitSkipped: true,
				Diagnostics: diagnostics.getDiagnostics(h.program.program, affectedFile),
			}})
		}
		return true
	})

	results = h.updateSnapshot()

	// Combine results and update buildInfo
	if h.isForDtsErrors && options.TargetSourceFile != nil {
		// Result from cache
		diagnostics, _ := h.program.snapshot.emitDiagnosticsPerFile.Load(options.TargetSourceFile.Path())
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
			var differsOnlyInMap bool
			if tspath.IsDeclarationFileName(fileName) {
				var emitSignature string
				info, _ := h.program.snapshot.fileInfos.Load(options.TargetSourceFile.Path())
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
				if h.skipDtsOutputOfComposite(options.TargetSourceFile, fileName, text, data, emitSignature, &differsOnlyInMap) {
					return nil
				}
			}

			var aTime time.Time
			if differsOnlyInMap {
				aTime = h.program.host.GetMTime(fileName)
			}
			var err error
			if options.WriteFile != nil {
				err = options.WriteFile(fileName, text, writeByteOrderMark, data)
			} else {
				err = h.program.program.Host().FS().WriteFile(fileName, text, writeByteOrderMark)
			}
			if err != nil && differsOnlyInMap {
				// Revert the time to original one
				err = h.program.host.SetMTime(fileName, aTime)
			}
			return err
		},
	}
}

// Compare to existing computed signature and store it or handle the changes in d.ts map option from before
// returning undefined means that, we dont need to emit this d.ts file since its contents didnt change
func (h *emitFilesHandler) skipDtsOutputOfComposite(file *ast.SourceFile, outputFileName string, text string, data *compiler.WriteFileData, newSignature string, differsOnlyInMap *bool) bool {
	if !h.program.snapshot.options.Composite.IsTrue() {
		return false
	}
	var oldSignature string
	oldSignatureFormat, ok := h.program.snapshot.emitSignatures.Load(file.Path())
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
			// Mark as differsOnlyInMap so that we can reverse the timestamp with --build so that
			// the downstream projects dont detect this as change in d.ts file
			*differsOnlyInMap = h.program.Options().Build.IsTrue()
		}
	} else {
		h.latestChangedDtsFiles.Store(file.Path(), outputFileName)
	}
	h.emitSignatures.Store(file.Path(), &emitSignature{signature: newSignature})
	return false
}

func (h *emitFilesHandler) updateSnapshot() []*compiler.EmitResult {
	h.signatures.Range(func(file tspath.Path, signature string) bool {
		info, _ := h.program.snapshot.fileInfos.Load(file)
		info.signature = signature
		if h.program.testingData != nil {
			h.program.testingData.UpdatedSignatureKinds[file] = SignatureUpdateKindStoredAtEmit
		}
		h.program.snapshot.buildInfoEmitPending.Store(true)
		return true
	})
	h.emitSignatures.Range(func(file tspath.Path, signature *emitSignature) bool {
		h.program.snapshot.emitSignatures.Store(file, signature)
		h.program.snapshot.buildInfoEmitPending.Store(true)
		return true
	})
	for file := range h.deletedPendingKinds.Keys() {
		h.program.snapshot.affectedFilesPendingEmit.Delete(file)
		h.program.snapshot.buildInfoEmitPending.Store(true)
	}
	// Always use correct order when to collect the result
	var results []*compiler.EmitResult
	for _, file := range h.program.GetSourceFiles() {
		if latestChangedDtsFile, ok := h.latestChangedDtsFiles.Load(file.Path()); ok {
			h.program.snapshot.latestChangedDtsFile = latestChangedDtsFile
			h.program.snapshot.buildInfoEmitPending.Store(true)
		}
		if update, ok := h.emitUpdates.Load(file.Path()); ok {
			if update.pendingKind == 0 {
				h.program.snapshot.affectedFilesPendingEmit.Delete(file.Path())
			} else {
				h.program.snapshot.affectedFilesPendingEmit.Store(file.Path(), update.pendingKind)
			}
			if update.result != nil {
				results = append(results, update.result)
				if len(update.result.Diagnostics) != 0 {
					h.program.snapshot.emitDiagnosticsPerFile.Store(file.Path(), &diagnosticsOrBuildInfoDiagnosticsWithFileName{diagnostics: update.result.Diagnostics})
				}
			}
			h.program.snapshot.buildInfoEmitPending.Store(true)
		}
	}
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
