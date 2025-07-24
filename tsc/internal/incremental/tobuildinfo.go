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
	to := &toBuildInfo{
		snapshot:           snapshot,
		program:            program,
		buildInfoDirectory: tspath.GetDirectoryPath(buildInfoFileName),
		comparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory:          program.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: program.UseCaseSensitiveFileNames(),
		},
		fileNameToFileId:        make(map[string]BuildInfoFileId),
		fileNamesToFileIdListId: make(map[string]BuildInfoFileIdListId),
	}
	to.buildInfo.Version = core.Version()
	if snapshot.options.IsIncremental() {
		to.setFileInfoAndEmitSignatures()
		to.setCompilerOptions()
		to.setReferencedMap()
		to.setChangeFileSet()
		to.setSemanticDiagnostics()
		to.setEmitDiagnostics()
		to.setAffectedFilesPendingEmit()
		if snapshot.latestChangedDtsFile != "" {
			to.buildInfo.LatestChangedDtsFile = to.relativeToBuildInfo(snapshot.latestChangedDtsFile)
		}
	}
	// else {
	//     const buildInfo: NonIncrementalBuildInfo = {
	//         root: arrayFrom(rootFileNames, r => relativeToBuildInfo(r)),
	//     };
	// }
	to.buildInfo.Errors = snapshot.hasErrors.IsTrue()
	to.buildInfo.CheckPending = snapshot.checkPending
	return &to.buildInfo
}

type toBuildInfo struct {
	snapshot                *snapshot
	program                 *compiler.Program
	buildInfo               BuildInfo
	buildInfoDirectory      string
	comparePathsOptions     tspath.ComparePathsOptions
	fileNameToFileId        map[string]BuildInfoFileId
	fileNamesToFileIdListId map[string]BuildInfoFileIdListId
}

func (t *toBuildInfo) relativeToBuildInfo(path string) string {
	return tspath.EnsurePathIsNonModuleName(tspath.GetRelativePathFromDirectory(t.buildInfoDirectory, path, t.comparePathsOptions))
}

func (t *toBuildInfo) toFileId(path tspath.Path) BuildInfoFileId {
	fileId := t.fileNameToFileId[string(path)]
	if fileId == 0 {
		t.buildInfo.FileNames = append(t.buildInfo.FileNames, t.relativeToBuildInfo(string(path)))
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
	if !option.IsFilePath {
		return v
	}
	if option.Kind == "list" {
		if arr, ok := v.([]string); ok {
			return core.Map(arr, t.relativeToBuildInfo)
		}
	} else if str, ok := v.(string); ok && str != "" {
		return t.relativeToBuildInfo(v.(string))
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

func (t *toBuildInfo) setFileInfoAndEmitSignatures() {
	t.buildInfo.FileInfos = core.Map(t.program.GetSourceFiles(), func(file *ast.SourceFile) *BuildInfoFileInfo {
		info := t.snapshot.fileInfos[file.Path()]
		fileId := t.toFileId(file.Path())
		//  tryAddRoot(key, fileId);
		if t.buildInfo.FileNames[fileId-1] != t.relativeToBuildInfo(string(file.Path())) {
			panic(fmt.Sprintf("File name at index %d does not match expected relative path: %s != %s", fileId-1, t.buildInfo.FileNames[fileId-1], t.relativeToBuildInfo(string(file.Path()))))
		}
		if t.snapshot.options.Composite.IsTrue() {
			if !ast.IsJsonSourceFile(file) && t.program.SourceFileMayBeEmitted(file, false) {
				emitSignature := t.snapshot.emitSignatures[file.Path()]
				if emitSignature == nil {
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
	keys := slices.Collect(maps.Keys(t.snapshot.referencedMap.Keys()))
	slices.Sort(keys)
	t.buildInfo.ReferencedMap = core.Map(keys, func(filePath tspath.Path) *BuildInfoReferenceMapEntry {
		references, _ := t.snapshot.referencedMap.GetValues(filePath)
		return &BuildInfoReferenceMapEntry{
			FileId:       t.toFileId(filePath),
			FileIdListId: t.toFileIdListId(references),
		}
	})
}

func (t *toBuildInfo) setChangeFileSet() {
	files := slices.Collect(maps.Keys(t.snapshot.changedFilesSet.Keys()))
	slices.Sort(files)
	t.buildInfo.ChangeFileSet = core.Map(files, t.toFileId)
}

func (t *toBuildInfo) setSemanticDiagnostics() {
	for _, file := range t.program.GetSourceFiles() {
		value, ok := t.snapshot.semanticDiagnosticsPerFile[file.Path()]
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
	files := slices.Collect(maps.Keys(t.snapshot.emitDiagnosticsPerFile))
	slices.Sort(files)
	t.buildInfo.EmitDiagnosticsPerFile = core.Map(files, func(filePath tspath.Path) *BuildInfoDiagnosticsOfFile {
		return t.toBuildInfoDiagnosticsOfFile(filePath, t.snapshot.emitDiagnosticsPerFile[filePath])
	})
}

func (t *toBuildInfo) setAffectedFilesPendingEmit() {
	if len(t.snapshot.affectedFilesPendingEmit) == 0 {
		return
	}
	files := slices.Collect(maps.Keys(t.snapshot.affectedFilesPendingEmit))
	slices.Sort(files)
	fullEmitKind := GetFileEmitKind(t.snapshot.options)
	for _, filePath := range files {
		file := t.program.GetSourceFileByPath(filePath)
		if file == nil || !t.program.SourceFileMayBeEmitted(file, false) {
			continue
		}
		pendingEmit := t.snapshot.affectedFilesPendingEmit[filePath]
		t.buildInfo.AffectedFilesPendingEmit = append(t.buildInfo.AffectedFilesPendingEmit, &BuildInfoFilePendingEmit{
			FileId:   t.toFileId(filePath),
			EmitKind: core.IfElse(pendingEmit == fullEmitKind, 0, pendingEmit),
		})
	}
}
