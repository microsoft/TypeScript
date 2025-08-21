package incremental

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func programToSnapshot(program *compiler.Program, oldProgram *Program, hashWithText bool) *snapshot {
	if oldProgram != nil && oldProgram.program == program {
		return oldProgram.snapshot
	}

	to := &toProgramSnapshot{
		program:    program,
		oldProgram: oldProgram,
		snapshot: &snapshot{
			options:      program.Options(),
			hashWithText: hashWithText,
		},
	}

	to.reuseFromOldProgram()
	to.computeProgramFileChanges()
	to.handleFileDelete()
	to.handlePendingEmit()
	to.handlePendingCheck()
	return to.snapshot
}

type toProgramSnapshot struct {
	program           *compiler.Program
	oldProgram        *Program
	snapshot          *snapshot
	globalFileRemoved bool
}

func (t *toProgramSnapshot) reuseFromOldProgram() {
	if t.oldProgram != nil && t.snapshot.options.Composite.IsTrue() {
		t.snapshot.latestChangedDtsFile = t.oldProgram.snapshot.latestChangedDtsFile
	}
	if t.snapshot.options.NoCheck.IsTrue() {
		t.snapshot.checkPending = true
	}

	if t.oldProgram != nil {
		// Copy old snapshot's changed files set
		t.oldProgram.snapshot.changedFilesSet.Range(func(key tspath.Path) bool {
			t.snapshot.changedFilesSet.Add(key)
			return true
		})
		t.oldProgram.snapshot.affectedFilesPendingEmit.Range(func(key tspath.Path, emitKind FileEmitKind) bool {
			t.snapshot.affectedFilesPendingEmit.Store(key, emitKind)
			return true
		})
		t.snapshot.buildInfoEmitPending.Store(t.oldProgram.snapshot.buildInfoEmitPending.Load())
		t.snapshot.hasErrorsFromOldState = t.oldProgram.snapshot.hasErrors
		t.snapshot.hasSemanticErrorsFromOldState = t.oldProgram.snapshot.hasSemanticErrors
	} else {
		t.snapshot.buildInfoEmitPending.Store(t.snapshot.options.IsIncremental())
	}
}

func (t *toProgramSnapshot) computeProgramFileChanges() {
	canCopySemanticDiagnostics := t.oldProgram != nil &&
		!tsoptions.CompilerOptionsAffectSemanticDiagnostics(t.oldProgram.snapshot.options, t.program.Options())
	// We can only reuse emit signatures (i.e. .d.ts signatures) if the .d.ts file is unchanged,
	// which will eg be depedent on change in options like declarationDir and outDir options are unchanged.
	// We need to look in oldState.compilerOptions, rather than oldCompilerOptions (i.e.we need to disregard useOldState) because
	// oldCompilerOptions can be undefined if there was change in say module from None to some other option
	// which would make useOldState as false since we can now use reference maps that are needed to track what to emit, what to check etc
	// but that option change does not affect d.ts file name so emitSignatures should still be reused.
	canCopyEmitSignatures := t.snapshot.options.Composite.IsTrue() &&
		t.oldProgram != nil &&
		!tsoptions.CompilerOptionsAffectDeclarationPath(t.oldProgram.snapshot.options, t.program.Options())
	copyDeclarationFileDiagnostics := canCopySemanticDiagnostics &&
		t.snapshot.options.SkipLibCheck.IsTrue() == t.oldProgram.snapshot.options.SkipLibCheck.IsTrue()
	copyLibFileDiagnostics := copyDeclarationFileDiagnostics &&
		t.snapshot.options.SkipDefaultLibCheck.IsTrue() == t.oldProgram.snapshot.options.SkipDefaultLibCheck.IsTrue()

	files := t.program.GetSourceFiles()
	wg := core.NewWorkGroup(t.program.SingleThreaded())
	for _, file := range files {
		wg.Queue(func() {
			version := t.snapshot.computeHash(file.Text())
			impliedNodeFormat := t.program.GetSourceFileMetaData(file.Path()).ImpliedNodeFormat
			affectsGlobalScope := fileAffectsGlobalScope(file)
			var signature string
			newReferences := getReferencedFiles(t.program, file)
			if newReferences != nil {
				t.snapshot.referencedMap.storeReferences(file.Path(), newReferences)
			}
			if t.oldProgram != nil {
				if oldFileInfo, ok := t.oldProgram.snapshot.fileInfos.Load(file.Path()); ok {
					signature = oldFileInfo.signature
					if oldFileInfo.version != version || oldFileInfo.affectsGlobalScope != affectsGlobalScope || oldFileInfo.impliedNodeFormat != impliedNodeFormat {
						t.snapshot.addFileToChangeSet(file.Path())
					} else if oldReferences, _ := t.oldProgram.snapshot.referencedMap.getReferences(file.Path()); !newReferences.Equals(oldReferences) {
						// Referenced files changed
						t.snapshot.addFileToChangeSet(file.Path())
					} else if newReferences != nil {
						for refPath := range newReferences.Keys() {
							if t.program.GetSourceFileByPath(refPath) == nil {
								if _, ok := t.oldProgram.snapshot.fileInfos.Load(refPath); ok {
									// Referenced file was deleted in the new program
									t.snapshot.addFileToChangeSet(file.Path())
									break
								}
							}
						}
					}
				} else {
					t.snapshot.addFileToChangeSet(file.Path())
				}
				if !t.snapshot.changedFilesSet.Has(file.Path()) {
					if emitDiagnostics, ok := t.oldProgram.snapshot.emitDiagnosticsPerFile.Load(file.Path()); ok {
						t.snapshot.emitDiagnosticsPerFile.Store(file.Path(), emitDiagnostics)
					}
					if canCopySemanticDiagnostics {
						if (!file.IsDeclarationFile || copyDeclarationFileDiagnostics) &&
							(!t.program.IsSourceFileDefaultLibrary(file.Path()) || copyLibFileDiagnostics) {
							// Unchanged file copy diagnostics
							if diagnostics, ok := t.oldProgram.snapshot.semanticDiagnosticsPerFile.Load(file.Path()); ok {
								t.snapshot.semanticDiagnosticsPerFile.Store(file.Path(), diagnostics)
							}
						}
					}
				}
				if canCopyEmitSignatures {
					if oldEmitSignature, ok := t.oldProgram.snapshot.emitSignatures.Load(file.Path()); ok {
						t.snapshot.emitSignatures.Store(file.Path(), oldEmitSignature.getNewEmitSignature(t.oldProgram.snapshot.options, t.snapshot.options))
					}
				}
			} else {
				t.snapshot.addFileToAffectedFilesPendingEmit(file.Path(), GetFileEmitKind(t.snapshot.options))
				signature = version
			}
			t.snapshot.fileInfos.Store(file.Path(), &fileInfo{
				version:            version,
				signature:          signature,
				affectsGlobalScope: affectsGlobalScope,
				impliedNodeFormat:  impliedNodeFormat,
			})
		})
	}
	wg.RunAndWait()
}

func (t *toProgramSnapshot) handleFileDelete() {
	if t.oldProgram != nil {
		// If the global file is removed, add all files as changed
		t.oldProgram.snapshot.fileInfos.Range(func(filePath tspath.Path, oldInfo *fileInfo) bool {
			if _, ok := t.snapshot.fileInfos.Load(filePath); !ok {
				if oldInfo.affectsGlobalScope {
					for _, file := range t.snapshot.getAllFilesExcludingDefaultLibraryFile(t.program, nil) {
						t.snapshot.addFileToChangeSet(file.Path())
					}
					t.globalFileRemoved = true
				} else {
					t.snapshot.buildInfoEmitPending.Store(true)
				}
				return false
			}
			return true
		})
	}
}

func (t *toProgramSnapshot) handlePendingEmit() {
	if t.oldProgram != nil && !t.globalFileRemoved {
		// If options affect emit, then we need to do complete emit per compiler options
		// otherwise only the js or dts that needs to emitted because its different from previously emitted options
		var pendingEmitKind FileEmitKind
		if tsoptions.CompilerOptionsAffectEmit(t.oldProgram.snapshot.options, t.snapshot.options) {
			pendingEmitKind = GetFileEmitKind(t.snapshot.options)
		} else {
			pendingEmitKind = getPendingEmitKindWithOptions(t.snapshot.options, t.oldProgram.snapshot.options)
		}
		if pendingEmitKind != FileEmitKindNone {
			// Add all files to affectedFilesPendingEmit since emit changed
			for _, file := range t.program.GetSourceFiles() {
				// Add to affectedFilesPending emit only if not changed since any changed file will do full emit
				if !t.snapshot.changedFilesSet.Has(file.Path()) {
					t.snapshot.addFileToAffectedFilesPendingEmit(file.Path(), pendingEmitKind)
				}
			}
			t.snapshot.buildInfoEmitPending.Store(true)
		}
	}
}

func (t *toProgramSnapshot) handlePendingCheck() {
	if t.oldProgram != nil &&
		t.snapshot.semanticDiagnosticsPerFile.Size() != len(t.program.GetSourceFiles()) &&
		t.oldProgram.snapshot.checkPending != t.snapshot.checkPending {
		t.snapshot.buildInfoEmitPending.Store(true)
	}
}

func fileAffectsGlobalScope(file *ast.SourceFile) bool {
	// if file contains anything that augments to global scope we need to build them as if
	// they are global files as well as module
	if core.Some(file.ModuleAugmentations, func(augmentation *ast.ModuleName) bool {
		return ast.IsGlobalScopeAugmentation(augmentation.Parent)
	}) {
		return true
	}

	if ast.IsExternalOrCommonJSModule(file) || ast.IsJsonSourceFile(file) {
		return false
	}

	// For script files that contains only ambient external modules, although they are not actually external module files,
	// they can only be consumed via importing elements from them. Regular script files cannot consume them. Therefore,
	// there are no point to rebuild all script files if these special files have changed. However, if any statement
	// in the file is not ambient external module, we treat it as a regular script file.
	return file.Statements != nil &&
		file.Statements.Nodes != nil &&
		core.Some(file.Statements.Nodes, func(stmt *ast.Node) bool {
			return !ast.IsModuleWithStringLiteralName(stmt)
		})
}

func addReferencedFilesFromSymbol(file *ast.SourceFile, referencedFiles *collections.Set[tspath.Path], symbol *ast.Symbol) {
	if symbol == nil {
		return
	}
	for _, declaration := range symbol.Declarations {
		fileOfDecl := ast.GetSourceFileOfNode(declaration)
		if fileOfDecl == nil {
			continue
		}
		if file != fileOfDecl {
			referencedFiles.Add(fileOfDecl.Path())
		}
	}
}

// Get the module source file and all augmenting files from the import name node from file
func addReferencedFilesFromImportLiteral(file *ast.SourceFile, referencedFiles *collections.Set[tspath.Path], checker *checker.Checker, importName *ast.LiteralLikeNode) {
	symbol := checker.GetSymbolAtLocation(importName)
	addReferencedFilesFromSymbol(file, referencedFiles, symbol)
}

// Gets the path to reference file from file name, it could be resolvedPath if present otherwise path
func addReferencedFileFromFileName(program *compiler.Program, fileName string, referencedFiles *collections.Set[tspath.Path], sourceFileDirectory string) {
	if redirect := program.GetParseFileRedirect(fileName); redirect != "" {
		referencedFiles.Add(tspath.ToPath(redirect, program.GetCurrentDirectory(), program.UseCaseSensitiveFileNames()))
	} else {
		referencedFiles.Add(tspath.ToPath(fileName, sourceFileDirectory, program.UseCaseSensitiveFileNames()))
	}
}

// Gets the referenced files for a file from the program with values for the keys as referenced file's path to be true
func getReferencedFiles(program *compiler.Program, file *ast.SourceFile) *collections.Set[tspath.Path] {
	referencedFiles := collections.Set[tspath.Path]{}

	// We need to use a set here since the code can contain the same import twice,
	// but that will only be one dependency.
	// To avoid invernal conversion, the key of the referencedFiles map must be of type Path
	checker, done := program.GetTypeCheckerForFile(context.TODO(), file)
	defer done()
	for _, importName := range file.Imports() {
		addReferencedFilesFromImportLiteral(file, &referencedFiles, checker, importName)
	}

	sourceFileDirectory := tspath.GetDirectoryPath(file.FileName())
	// Handle triple slash references
	for _, referencedFile := range file.ReferencedFiles {
		addReferencedFileFromFileName(program, referencedFile.FileName, &referencedFiles, sourceFileDirectory)
	}

	// Handle type reference directives
	if typeRefsInFile, ok := program.GetResolvedTypeReferenceDirectives()[file.Path()]; ok {
		for _, typeRef := range typeRefsInFile {
			if typeRef.ResolvedFileName != "" {
				addReferencedFileFromFileName(program, typeRef.ResolvedFileName, &referencedFiles, sourceFileDirectory)
			}
		}
	}

	// Add module augmentation as references
	for _, moduleName := range file.ModuleAugmentations {
		if !ast.IsStringLiteral(moduleName) {
			continue
		}
		addReferencedFilesFromImportLiteral(file, &referencedFiles, checker, moduleName)
	}

	// From ambient modules
	for _, ambientModule := range checker.GetAmbientModules() {
		addReferencedFilesFromSymbol(file, &referencedFiles, ambientModule)
	}
	return core.IfElse(referencedFiles.Len() > 0, &referencedFiles, nil)
}
