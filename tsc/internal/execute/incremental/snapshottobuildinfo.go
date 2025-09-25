package incremental

import (
	"fmt"
	"maps"
	"reflect"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func snapshotToBuildInfo(snapshot *snapshot, program *compiler.Program, buildInfoFileName string) *BuildInfo {
	buildInfo := &BuildInfo{
		Version: core.Version(),
	}
	to := &toBuildInfo{
		snapshot:           snapshot,
		program:            program,
		buildInfo:          buildInfo,
		buildInfoDirectory: tspath.GetDirectoryPath(buildInfoFileName),
		comparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory:          program.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: program.UseCaseSensitiveFileNames(),
		},
		fileNameToFileId:        make(map[string]BuildInfoFileId),
		fileNamesToFileIdListId: make(map[string]BuildInfoFileIdListId),
		roots:                   make(map[*ast.SourceFile]tspath.Path),
	}

	if snapshot.options.IsIncremental() {
		to.collectRootFiles()
		to.setFileInfoAndEmitSignatures()
		to.setRootOfIncrementalProgram()
		to.setCompilerOptions()
		to.setReferencedMap()
		to.setChangeFileSet()
		to.setSemanticDiagnostics()
		to.setEmitDiagnostics()
		to.setAffectedFilesPendingEmit()
		if snapshot.latestChangedDtsFile != "" {
			buildInfo.LatestChangedDtsFile = to.relativeToBuildInfo(snapshot.latestChangedDtsFile)
		}
	} else {
		to.setRootOfNonIncrementalProgram()
	}
	buildInfo.Errors = snapshot.hasErrors.IsTrue()
	buildInfo.SemanticErrors = snapshot.hasSemanticErrors
	buildInfo.CheckPending = snapshot.checkPending
	return buildInfo
}

type toBuildInfo struct {
	snapshot                *snapshot
	program                 *compiler.Program
	buildInfo               *BuildInfo
	buildInfoDirectory      string
	comparePathsOptions     tspath.ComparePathsOptions
	fileNameToFileId        map[string]BuildInfoFileId
	fileNamesToFileIdListId map[string]BuildInfoFileIdListId
	roots                   map[*ast.SourceFile]tspath.Path
}

func (t *toBuildInfo) relativeToBuildInfo(path string) string {
	return tspath.EnsurePathIsNonModuleName(tspath.GetRelativePathFromDirectory(t.buildInfoDirectory, path, t.comparePathsOptions))
}

func (t *toBuildInfo) toFileId(path tspath.Path) BuildInfoFileId {
	fileId := t.fileNameToFileId[string(path)]
	if fileId == 0 {
		if libFile := t.program.GetDefaultLibFile(path); libFile != nil && !libFile.Replaced {
			t.buildInfo.FileNames = append(t.buildInfo.FileNames, libFile.Name)
		} else {
			t.buildInfo.FileNames = append(t.buildInfo.FileNames, t.relativeToBuildInfo(string(path)))
		}
		fileId = BuildInfoFileId(len(t.buildInfo.FileNames))
		t.fileNameToFileId[string(path)] = fileId
	}
	return fileId
}

func (t *toBuildInfo) toFileIdListId(set *collections.Set[tspath.Path]) BuildInfoFileIdListId {
	fileIds := core.Map(slices.Collect(maps.Keys(set.Keys())), t.toFileId)
	slices.Sort(fileIds)
	key := strings.Join(core.Map(fileIds, func(id BuildInfoFileId) string {
		return fmt.Sprintf("%d", id)
	}), ",")

	fileIdListId := t.fileNamesToFileIdListId[key]
	if fileIdListId == 0 {
		t.buildInfo.FileIdsList = append(t.buildInfo.FileIdsList, fileIds)
		fileIdListId = BuildInfoFileIdListId(len(t.buildInfo.FileIdsList))
		t.fileNamesToFileIdListId[key] = fileIdListId
	}
	return fileIdListId
}

func (t *toBuildInfo) toRelativeToBuildInfoCompilerOptionValue(option *tsoptions.CommandLineOption, v any) any {
	if option.Kind == "list" {
		if option.Elements().IsFilePath {
			if arr, ok := v.([]string); ok {
				return core.Map(arr, t.relativeToBuildInfo)
			}
		}
	} else if option.IsFilePath {
		if str, ok := v.(string); ok && str != "" {
			return t.relativeToBuildInfo(v.(string))
		}
	}
	return v
}

func (t *toBuildInfo) toBuildInfoDiagnosticsFromFileNameDiagnostics(diagnostics []*buildInfoDiagnosticWithFileName) []*BuildInfoDiagnostic {
	return core.Map(diagnostics, func(d *buildInfoDiagnosticWithFileName) *BuildInfoDiagnostic {
		var file BuildInfoFileId
		if d.file != "" {
			file = t.toFileId(d.file)
		}
		return &BuildInfoDiagnostic{
			File:               file,
			NoFile:             d.noFile,
			Pos:                d.pos,
			End:                d.end,
			Code:               d.code,
			Category:           d.category,
			Message:            d.message,
			MessageChain:       t.toBuildInfoDiagnosticsFromFileNameDiagnostics(d.messageChain),
			RelatedInformation: t.toBuildInfoDiagnosticsFromFileNameDiagnostics(d.relatedInformation),
			ReportsUnnecessary: d.reportsUnnecessary,
			ReportsDeprecated:  d.reportsDeprecated,
			SkippedOnNoEmit:    d.skippedOnNoEmit,
		}
	})
}

func (t *toBuildInfo) toBuildInfoDiagnosticsFromDiagnostics(filePath tspath.Path, diagnostics []*ast.Diagnostic) []*BuildInfoDiagnostic {
	return core.Map(diagnostics, func(d *ast.Diagnostic) *BuildInfoDiagnostic {
		var file BuildInfoFileId
		noFile := false
		if d.File() == nil {
			noFile = true
		} else if d.File().Path() != filePath {
			file = t.toFileId(d.File().Path())
		}
		return &BuildInfoDiagnostic{
			File:               file,
			NoFile:             noFile,
			Pos:                d.Loc().Pos(),
			End:                d.Loc().End(),
			Code:               d.Code(),
			Category:           d.Category(),
			Message:            d.Message(),
			MessageChain:       t.toBuildInfoDiagnosticsFromDiagnostics(filePath, d.MessageChain()),
			RelatedInformation: t.toBuildInfoDiagnosticsFromDiagnostics(filePath, d.RelatedInformation()),
			ReportsUnnecessary: d.ReportsUnnecessary(),
			ReportsDeprecated:  d.ReportsDeprecated(),
			SkippedOnNoEmit:    d.SkippedOnNoEmit(),
		}
	})
}

func (t *toBuildInfo) toBuildInfoDiagnosticsOfFile(filePath tspath.Path, diags *diagnosticsOrBuildInfoDiagnosticsWithFileName) *BuildInfoDiagnosticsOfFile {
	if len(diags.diagnostics) > 0 {
		return &BuildInfoDiagnosticsOfFile{
			FileId:      t.toFileId(filePath),
			Diagnostics: t.toBuildInfoDiagnosticsFromDiagnostics(filePath, diags.diagnostics),
		}
	}
	if len(diags.buildInfoDiagnostics) > 0 {
		return &BuildInfoDiagnosticsOfFile{
			FileId:      t.toFileId(filePath),
			Diagnostics: t.toBuildInfoDiagnosticsFromFileNameDiagnostics(diags.buildInfoDiagnostics),
		}
	}
	return nil
}

func (t *toBuildInfo) collectRootFiles() {
	for _, fileName := range t.program.CommandLine().FileNames() {
		var file *ast.SourceFile
		if redirect := t.program.GetParseFileRedirect(fileName); redirect != "" {
			file = t.program.GetSourceFile(redirect)
		} else {
			file = t.program.GetSourceFile(fileName)
		}
		if file != nil {
			t.roots[file] = tspath.ToPath(fileName, t.comparePathsOptions.CurrentDirectory, t.comparePathsOptions.UseCaseSensitiveFileNames)
		}
	}
}

func (t *toBuildInfo) setFileInfoAndEmitSignatures() {
	t.buildInfo.FileInfos = core.MapNonNil(t.program.GetSourceFiles(), func(file *ast.SourceFile) *BuildInfoFileInfo {
		info, _ := t.snapshot.fileInfos.Load(file.Path())
		fileId := t.toFileId(file.Path())
		//  tryAddRoot(key, fileId);
		if t.buildInfo.FileNames[fileId-1] != t.relativeToBuildInfo(string(file.Path())) {
			if libFile := t.program.GetDefaultLibFile(file.Path()); libFile == nil || libFile.Replaced || t.buildInfo.FileNames[fileId-1] != libFile.Name {
				panic(fmt.Sprintf("File name at index %d does not match expected relative path or libName: %s != %s", fileId-1, t.buildInfo.FileNames[fileId-1], t.relativeToBuildInfo(string(file.Path()))))
			}
		}
		if int(fileId) != len(t.buildInfo.FileNames) {
			// Duplicate - for now ignore
			return nil
		}

		if t.snapshot.options.Composite.IsTrue() {
			if !ast.IsJsonSourceFile(file) && t.program.SourceFileMayBeEmitted(file, false) {
				if emitSignature, loaded := t.snapshot.emitSignatures.Load(file.Path()); !loaded {
					t.buildInfo.EmitSignatures = append(t.buildInfo.EmitSignatures, &BuildInfoEmitSignature{
						FileId: fileId,
					})
				} else if emitSignature.signature != info.signature {
					incrementalEmitSignature := &BuildInfoEmitSignature{
						FileId: fileId,
					}
					if emitSignature.signature != "" {
						incrementalEmitSignature.Signature = emitSignature.signature
					} else if emitSignature.signatureWithDifferentOptions[0] == info.signature {
						incrementalEmitSignature.DiffersOnlyInDtsMap = true
					} else {
						incrementalEmitSignature.Signature = emitSignature.signatureWithDifferentOptions[0]
						incrementalEmitSignature.DiffersInOptions = true
					}
					t.buildInfo.EmitSignatures = append(t.buildInfo.EmitSignatures, incrementalEmitSignature)
				}
			}
		}
		return newBuildInfoFileInfo(info)
	})
	if t.buildInfo.FileInfos == nil {
		t.buildInfo.FileInfos = []*BuildInfoFileInfo{}
	}
}

func (t *toBuildInfo) setRootOfIncrementalProgram() {
	keys := slices.Collect(maps.Keys(t.roots))
	slices.SortFunc(keys, func(a, b *ast.SourceFile) int {
		return int(t.toFileId(a.Path())) - int(t.toFileId(b.Path()))
	})
	for _, file := range keys {
		root := t.toFileId(t.roots[file])
		resolved := t.toFileId(file.Path())
		if t.buildInfo.Root == nil {
			// First fileId as is
			t.buildInfo.Root = append(t.buildInfo.Root, &BuildInfoRoot{Start: resolved})
		} else {
			last := t.buildInfo.Root[len(t.buildInfo.Root)-1]
			if last.End == resolved-1 {
				// If its [..., last = [start, end = fileId - 1]], update last to [start, fileId]
				last.End = resolved
			} else if last.End == 0 && last.Start == resolved-1 {
				// If its [..., last = start = fileId - 1 ], update last to [start, fileId]
				last.End = resolved
			} else {
				t.buildInfo.Root = append(t.buildInfo.Root, &BuildInfoRoot{Start: resolved})
			}
		}
		if root != resolved {
			t.buildInfo.ResolvedRoot = append(t.buildInfo.ResolvedRoot, &BuildInfoResolvedRoot{
				Resolved: resolved,
				Root:     root,
			})
		}
	}
}

func (t *toBuildInfo) setCompilerOptions() {
	tsoptions.ForEachCompilerOptionValue(
		t.snapshot.options,
		func(option *tsoptions.CommandLineOption) bool {
			return option.AffectsBuildInfo
		},
		func(option *tsoptions.CommandLineOption, value reflect.Value, i int) bool {
			if value.IsZero() {
				return false
			}
			// Make it relative to buildInfo directory if file path
			if t.buildInfo.Options == nil {
				t.buildInfo.Options = &collections.OrderedMap[string, any]{}
			}
			t.buildInfo.Options.Set(option.Name, t.toRelativeToBuildInfoCompilerOptionValue(option, value.Interface()))
			return false
		},
	)
}

func (t *toBuildInfo) setReferencedMap() {
	keys := t.snapshot.referencedMap.getPathsWithReferences()
	slices.Sort(keys)
	t.buildInfo.ReferencedMap = core.Map(keys, func(filePath tspath.Path) *BuildInfoReferenceMapEntry {
		references, _ := t.snapshot.referencedMap.getReferences(filePath)
		return &BuildInfoReferenceMapEntry{
			FileId:       t.toFileId(filePath),
			FileIdListId: t.toFileIdListId(references),
		}
	})
}

func (t *toBuildInfo) setChangeFileSet() {
	files := slices.Collect(t.snapshot.changedFilesSet.Keys())
	slices.Sort(files)
	t.buildInfo.ChangeFileSet = core.Map(files, t.toFileId)
}

func (t *toBuildInfo) setSemanticDiagnostics() {
	for _, file := range t.program.GetSourceFiles() {
		value, ok := t.snapshot.semanticDiagnosticsPerFile.Load(file.Path())
		if !ok {
			if !t.snapshot.changedFilesSet.Has(file.Path()) {
				t.buildInfo.SemanticDiagnosticsPerFile = append(t.buildInfo.SemanticDiagnosticsPerFile, &BuildInfoSemanticDiagnostic{
					FileId: t.toFileId(file.Path()),
				})
			}
		} else {
			diagnostics := t.toBuildInfoDiagnosticsOfFile(file.Path(), value)
			if diagnostics != nil {
				t.buildInfo.SemanticDiagnosticsPerFile = append(t.buildInfo.SemanticDiagnosticsPerFile, &BuildInfoSemanticDiagnostic{
					Diagnostics: diagnostics,
				})
			}
		}
	}
}

func (t *toBuildInfo) setEmitDiagnostics() {
	files := slices.Collect(t.snapshot.emitDiagnosticsPerFile.Keys())
	slices.Sort(files)
	t.buildInfo.EmitDiagnosticsPerFile = core.Map(files, func(filePath tspath.Path) *BuildInfoDiagnosticsOfFile {
		value, _ := t.snapshot.emitDiagnosticsPerFile.Load(filePath)
		return t.toBuildInfoDiagnosticsOfFile(filePath, value)
	})
}

func (t *toBuildInfo) setAffectedFilesPendingEmit() {
	files := slices.Collect(t.snapshot.affectedFilesPendingEmit.Keys())
	slices.Sort(files)
	fullEmitKind := GetFileEmitKind(t.snapshot.options)
	for _, filePath := range files {
		file := t.program.GetSourceFileByPath(filePath)
		if file == nil || !t.program.SourceFileMayBeEmitted(file, false) {
			continue
		}
		pendingEmit, _ := t.snapshot.affectedFilesPendingEmit.Load(filePath)
		t.buildInfo.AffectedFilesPendingEmit = append(t.buildInfo.AffectedFilesPendingEmit, &BuildInfoFilePendingEmit{
			FileId:   t.toFileId(filePath),
			EmitKind: core.IfElse(pendingEmit == fullEmitKind, 0, pendingEmit),
		})
	}
}

func (t *toBuildInfo) setRootOfNonIncrementalProgram() {
	t.buildInfo.Root = core.Map(t.program.CommandLine().FileNames(), func(fileName string) *BuildInfoRoot {
		return &BuildInfoRoot{
			NonIncremental: t.relativeToBuildInfo(string(tspath.ToPath(fileName, t.comparePathsOptions.CurrentDirectory, t.comparePathsOptions.UseCaseSensitiveFileNames))),
		}
	})
}
