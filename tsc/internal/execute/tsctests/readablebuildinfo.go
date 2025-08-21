package tsctests

import (
	"fmt"
	"strings"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/execute/incremental"
	"github.com/microsoft/typescript-go/internal/jsonutil"
)

type readableBuildInfo struct {
	buildInfo *incremental.BuildInfo
	Version   string `json:"version,omitzero"`

	// Common between incremental and tsc -b buildinfo for non incremental programs
	Errors       bool                     `json:"errors,omitzero"`
	CheckPending bool                     `json:"checkPending,omitzero"`
	Root         []*readableBuildInfoRoot `json:"root,omitzero"`

	// IncrementalProgram info
	FileNames                  []string                                  `json:"fileNames,omitzero"`
	FileInfos                  []*readableBuildInfoFileInfo              `json:"fileInfos,omitzero"`
	FileIdsList                [][]string                                `json:"fileIdsList,omitzero"`
	Options                    *collections.OrderedMap[string, any]      `json:"options,omitzero"`
	ReferencedMap              *collections.OrderedMap[string, []string] `json:"referencedMap,omitzero"`
	SemanticDiagnosticsPerFile []*readableBuildInfoSemanticDiagnostic    `json:"semanticDiagnosticsPerFile,omitzero"`
	EmitDiagnosticsPerFile     []*readableBuildInfoDiagnosticsOfFile     `json:"emitDiagnosticsPerFile,omitzero"`
	ChangeFileSet              []string                                  `json:"changeFileSet,omitzero"` // List of changed files in the program, not the whole set of files
	AffectedFilesPendingEmit   []*readableBuildInfoFilePendingEmit       `json:"affectedFilesPendingEmit,omitzero"`
	LatestChangedDtsFile       string                                    `json:"latestChangedDtsFile,omitzero"` // Because this is only output file in the program, we dont need fileId to deduplicate name
	EmitSignatures             []*readableBuildInfoEmitSignature         `json:"emitSignatures,omitzero"`
	ResolvedRoot               []*readableBuildInfoResolvedRoot          `json:"resolvedRoot,omitzero"`
	Size                       int                                       `json:"size,omitzero"` // Size of the build info file

	// NonIncrementalProgram info
	SemanticErrors bool `json:"semanticErrors,omitzero"`
}

type readableBuildInfoRoot struct {
	Files    []string                   `json:"files,omitzero"`
	Original *incremental.BuildInfoRoot `json:"original,omitzero"`
}

type readableBuildInfoFileInfo struct {
	FileName           string                         `json:"fileName,omitzero"`
	Version            string                         `json:"version,omitzero"`
	Signature          string                         `json:"signature,omitzero"`
	AffectsGlobalScope bool                           `json:"affectsGlobalScope,omitzero"`
	ImpliedNodeFormat  string                         `json:"impliedNodeFormat,omitzero"`
	Original           *incremental.BuildInfoFileInfo `json:"original,omitzero"` // Original file path, if available
}

type readableBuildInfoDiagnostic struct {
	// incrementalBuildInfoFileId if it is for a File thats other than its stored for
	File               string                         `json:"file,omitzero"`
	NoFile             bool                           `json:"noFile,omitzero"`
	Pos                int                            `json:"pos,omitzero"`
	End                int                            `json:"end,omitzero"`
	Code               int32                          `json:"code,omitzero"`
	Category           diagnostics.Category           `json:"category,omitzero"`
	Message            string                         `json:"message,omitzero"`
	MessageChain       []*readableBuildInfoDiagnostic `json:"messageChain,omitzero"`
	RelatedInformation []*readableBuildInfoDiagnostic `json:"relatedInformation,omitzero"`
	ReportsUnnecessary bool                           `json:"reportsUnnecessary,omitzero"`
	ReportsDeprecated  bool                           `json:"reportsDeprecated,omitzero"`
	SkippedOnNoEmit    bool                           `json:"skippedOnNoEmit,omitzero"`
}

type readableBuildInfoDiagnosticsOfFile struct {
	file        string
	diagnostics []*readableBuildInfoDiagnostic
}

func (r *readableBuildInfoDiagnosticsOfFile) MarshalJSON() ([]byte, error) {
	fileIdAndDiagnostics := make([]any, 0, 2)
	fileIdAndDiagnostics = append(fileIdAndDiagnostics, r.file)
	fileIdAndDiagnostics = append(fileIdAndDiagnostics, r.diagnostics)
	return json.Marshal(fileIdAndDiagnostics)
}

func (r *readableBuildInfoDiagnosticsOfFile) UnmarshalJSON(data []byte) error {
	var fileIdAndDiagnostics []any
	if err := json.Unmarshal(data, &fileIdAndDiagnostics); err != nil {
		return fmt.Errorf("invalid readableBuildInfoDiagnosticsOfFile: %s", data)
	}
	if len(fileIdAndDiagnostics) != 2 {
		return fmt.Errorf("invalid readableBuildInfoDiagnosticsOfFile: expected 2 elements, got %d", len(fileIdAndDiagnostics))
	}
	file, ok := fileIdAndDiagnostics[0].(string)
	if !ok {
		return fmt.Errorf("invalid fileId in readableBuildInfoDiagnosticsOfFile: expected string, got %T", fileIdAndDiagnostics[0])
	}
	if diagnostics, ok := fileIdAndDiagnostics[1].([]*readableBuildInfoDiagnostic); !ok {
		return fmt.Errorf("invalid diagnostics in readableBuildInfoDiagnosticsOfFile: expected []*readableBuildInfoDiagnostic, got %T", fileIdAndDiagnostics[1])
	} else {
		*r = readableBuildInfoDiagnosticsOfFile{
			file:        file,
			diagnostics: diagnostics,
		}
		return nil
	}
}

type readableBuildInfoSemanticDiagnostic struct {
	file        string                              // File is not in changedSet and still doesnt have cached diagnostics
	diagnostics *readableBuildInfoDiagnosticsOfFile // Diagnostics for file
}

func (r *readableBuildInfoSemanticDiagnostic) MarshalJSON() ([]byte, error) {
	if r.file != "" {
		return json.Marshal(r.file)
	}
	return json.Marshal(r.diagnostics)
}

func (r *readableBuildInfoSemanticDiagnostic) UnmarshalJSON(data []byte) error {
	var file string
	if err := json.Unmarshal(data, &file); err != nil {
		var diagnostics readableBuildInfoDiagnosticsOfFile
		if err := json.Unmarshal(data, &diagnostics); err != nil {
			return fmt.Errorf("invalid readableBuildInfoSemanticDiagnostic: %s", data)
		}
		*r = readableBuildInfoSemanticDiagnostic{
			diagnostics: &diagnostics,
		}
		return nil
	}
	*r = readableBuildInfoSemanticDiagnostic{
		file: file,
	}
	return nil
}

type readableBuildInfoFilePendingEmit struct {
	file     string
	emitKind string
	original *incremental.BuildInfoFilePendingEmit
}

func (b *readableBuildInfoFilePendingEmit) MarshalJSON() ([]byte, error) {
	return json.Marshal([]any{b.file, b.emitKind, b.original})
}

func (b *readableBuildInfoFilePendingEmit) UnmarshalJSON(data []byte) error {
	var fileIdAndEmitKind []any
	if err := json.Unmarshal(data, &fileIdAndEmitKind); err != nil {
		return fmt.Errorf("invalid readableBuildInfoFilePendingEmit: %s", data)
	}
	if len(fileIdAndEmitKind) != 3 {
		return fmt.Errorf("invalid readableBuildInfoFilePendingEmit: expected 3 elements, got %d", len(fileIdAndEmitKind))
	}
	file, ok := fileIdAndEmitKind[0].(string)
	if !ok {
		return fmt.Errorf("invalid fileId in readableBuildInfoFilePendingEmit: expected string, got %T", fileIdAndEmitKind[0])
	}
	var emitKind string
	emitKind, ok = fileIdAndEmitKind[1].(string)
	if !ok {
		return fmt.Errorf("invalid emitKind in readableBuildInfoFilePendingEmit: expected string, got %T", fileIdAndEmitKind[1])
	}
	var original *incremental.BuildInfoFilePendingEmit
	original, ok = fileIdAndEmitKind[2].(*incremental.BuildInfoFilePendingEmit)
	if !ok {
		return fmt.Errorf("invalid original in readableBuildInfoFilePendingEmit: expected *incremental.BuildInfoFilePendingEmit, got %T", fileIdAndEmitKind[2])
	}
	*b = readableBuildInfoFilePendingEmit{
		file:     file,
		emitKind: emitKind,
		original: original,
	}
	return nil
}

type readableBuildInfoEmitSignature struct {
	File                string                              `json:"file,omitzero"`
	Signature           string                              `json:"signature,omitzero"`
	DiffersOnlyInDtsMap bool                                `json:"differsOnlyInDtsMap,omitzero"`
	DiffersInOptions    bool                                `json:"differsInOptions,omitzero"`
	Original            *incremental.BuildInfoEmitSignature `json:"original,omitzero"`
}

type readableBuildInfoResolvedRoot struct {
	Resolved string
	Root     string
}

func (b *readableBuildInfoResolvedRoot) MarshalJSON() ([]byte, error) {
	return json.Marshal([2]string{b.Resolved, b.Root})
}

func (b *readableBuildInfoResolvedRoot) UnmarshalJSON(data []byte) error {
	var resolvedAndRoot [2]string
	if err := json.Unmarshal(data, &resolvedAndRoot); err != nil {
		return fmt.Errorf("invalid BuildInfoResolvedRoot: %s", data)
	}
	*b = readableBuildInfoResolvedRoot{
		Resolved: resolvedAndRoot[0],
		Root:     resolvedAndRoot[1],
	}
	return nil
}

func toReadableBuildInfo(buildInfo *incremental.BuildInfo, buildInfoText string) string {
	readable := readableBuildInfo{
		buildInfo:            buildInfo,
		Version:              buildInfo.Version,
		Errors:               buildInfo.Errors,
		CheckPending:         buildInfo.CheckPending,
		FileNames:            buildInfo.FileNames,
		Options:              buildInfo.Options,
		LatestChangedDtsFile: buildInfo.LatestChangedDtsFile,
		SemanticErrors:       buildInfo.SemanticErrors,
		Size:                 len(buildInfoText),
	}
	readable.setFileInfos()
	readable.setRoot()
	readable.setFileIdsList()
	readable.setReferencedMap()
	readable.setChangeFileSet()
	readable.setSemanticDiagnostics()
	readable.setEmitDiagnostics()
	readable.setAffectedFilesPendingEmit()
	readable.setEmitSignatures()
	readable.setResolvedRoot()
	contents, err := jsonutil.MarshalIndent(&readable, "", "  ")
	if err != nil {
		panic("readableBuildInfo: failed to marshal readable build info: " + err.Error())
	}
	return string(contents)
}

func (r *readableBuildInfo) toFilePath(fileId incremental.BuildInfoFileId) string {
	return r.buildInfo.FileNames[fileId-1]
}

func (r *readableBuildInfo) toFilePathSet(fileIdListId incremental.BuildInfoFileIdListId) []string {
	return r.FileIdsList[fileIdListId-1]
}

func (r *readableBuildInfo) toReadableBuildInfoDiagnostic(diagnostics []*incremental.BuildInfoDiagnostic) []*readableBuildInfoDiagnostic {
	return core.Map(diagnostics, func(d *incremental.BuildInfoDiagnostic) *readableBuildInfoDiagnostic {
		var file string
		if d.File != 0 {
			file = r.toFilePath(d.File)
		}
		return &readableBuildInfoDiagnostic{
			File:               file,
			NoFile:             d.NoFile,
			Pos:                d.Pos,
			End:                d.End,
			Code:               d.Code,
			Category:           d.Category,
			Message:            d.Message,
			MessageChain:       r.toReadableBuildInfoDiagnostic(d.MessageChain),
			RelatedInformation: r.toReadableBuildInfoDiagnostic(d.RelatedInformation),
			ReportsUnnecessary: d.ReportsUnnecessary,
			ReportsDeprecated:  d.ReportsDeprecated,
			SkippedOnNoEmit:    d.SkippedOnNoEmit,
		}
	})
}

func (r *readableBuildInfo) toReadableBuildInfoDiagnosticsOfFile(diagnostics *incremental.BuildInfoDiagnosticsOfFile) *readableBuildInfoDiagnosticsOfFile {
	return &readableBuildInfoDiagnosticsOfFile{
		file:        r.toFilePath(diagnostics.FileId),
		diagnostics: r.toReadableBuildInfoDiagnostic(diagnostics.Diagnostics),
	}
}

func (r *readableBuildInfo) setFileInfos() {
	r.FileInfos = core.MapIndex(r.buildInfo.FileInfos, func(original *incremental.BuildInfoFileInfo, index int) *readableBuildInfoFileInfo {
		fileInfo := original.GetFileInfo()
		// Dont set original for string encoding
		if original.HasSignature() {
			original = nil
		}
		return &readableBuildInfoFileInfo{
			FileName:           r.toFilePath(incremental.BuildInfoFileId(index + 1)),
			Version:            fileInfo.Version(),
			Signature:          fileInfo.Signature(),
			AffectsGlobalScope: fileInfo.AffectsGlobalScope(),
			ImpliedNodeFormat:  fileInfo.ImpliedNodeFormat().String(),
			Original:           original,
		}
	})
}

func (r *readableBuildInfo) setRoot() {
	r.Root = core.Map(r.buildInfo.Root, func(original *incremental.BuildInfoRoot) *readableBuildInfoRoot {
		var files []string
		if original.NonIncremental != "" {
			files = []string{original.NonIncremental}
		} else if original.End == 0 {
			files = []string{r.toFilePath(original.Start)}
		} else {
			files = make([]string, 0, original.End-original.Start+1)
			for i := original.Start; i <= original.End; i++ {
				files = append(files, r.toFilePath(i))
			}
		}
		return &readableBuildInfoRoot{
			Files:    files,
			Original: original,
		}
	})
}

func (r *readableBuildInfo) setFileIdsList() {
	r.FileIdsList = core.Map(r.buildInfo.FileIdsList, func(ids []incremental.BuildInfoFileId) []string {
		return core.Map(ids, r.toFilePath)
	})
}

func (r *readableBuildInfo) setReferencedMap() {
	if r.buildInfo.ReferencedMap != nil {
		r.ReferencedMap = &collections.OrderedMap[string, []string]{}
		for _, entry := range r.buildInfo.ReferencedMap {
			r.ReferencedMap.Set(r.toFilePath(entry.FileId), r.toFilePathSet(entry.FileIdListId))
		}
	}
}

func (r *readableBuildInfo) setChangeFileSet() {
	r.ChangeFileSet = core.Map(r.buildInfo.ChangeFileSet, r.toFilePath)
}

func (r *readableBuildInfo) setSemanticDiagnostics() {
	r.SemanticDiagnosticsPerFile = core.Map(r.buildInfo.SemanticDiagnosticsPerFile, func(diagnostics *incremental.BuildInfoSemanticDiagnostic) *readableBuildInfoSemanticDiagnostic {
		if diagnostics.FileId != 0 {
			return &readableBuildInfoSemanticDiagnostic{
				file: r.toFilePath(diagnostics.FileId),
			}
		}
		return &readableBuildInfoSemanticDiagnostic{
			diagnostics: r.toReadableBuildInfoDiagnosticsOfFile(diagnostics.Diagnostics),
		}
	})
}

func (r *readableBuildInfo) setEmitDiagnostics() {
	r.EmitDiagnosticsPerFile = core.Map(r.buildInfo.EmitDiagnosticsPerFile, r.toReadableBuildInfoDiagnosticsOfFile)
}

func (r *readableBuildInfo) setAffectedFilesPendingEmit() {
	if r.buildInfo.AffectedFilesPendingEmit == nil {
		return
	}
	fullEmitKind := incremental.GetFileEmitKind(r.buildInfo.GetCompilerOptions(""))
	r.AffectedFilesPendingEmit = core.Map(r.buildInfo.AffectedFilesPendingEmit, func(pendingEmit *incremental.BuildInfoFilePendingEmit) *readableBuildInfoFilePendingEmit {
		emitKind := core.IfElse(pendingEmit.EmitKind == 0, fullEmitKind, pendingEmit.EmitKind)
		return &readableBuildInfoFilePendingEmit{
			file:     r.toFilePath(pendingEmit.FileId),
			emitKind: toReadableFileEmitKind(emitKind),
			original: pendingEmit,
		}
	})
}

func toReadableFileEmitKind(fileEmitKind incremental.FileEmitKind) string {
	var builder strings.Builder
	addFlags := func(flags string) {
		if builder.Len() == 0 {
			builder.WriteString(flags)
		} else {
			builder.WriteString("|")
			builder.WriteString(flags)
		}
	}
	if fileEmitKind != 0 {
		if (fileEmitKind & incremental.FileEmitKindJs) != 0 {
			addFlags("Js")
		}
		if (fileEmitKind & incremental.FileEmitKindJsMap) != 0 {
			addFlags("JsMap")
		}
		if (fileEmitKind & incremental.FileEmitKindJsInlineMap) != 0 {
			addFlags("JsInlineMap")
		}
		if (fileEmitKind & incremental.FileEmitKindDts) == incremental.FileEmitKindDts {
			addFlags("Dts")
		} else {
			if (fileEmitKind & incremental.FileEmitKindDtsEmit) != 0 {
				addFlags("DtsEmit")
			}
			if (fileEmitKind & incremental.FileEmitKindDtsErrors) != 0 {
				addFlags("DtsErrors")
			}
		}
		if (fileEmitKind & incremental.FileEmitKindDtsMap) != 0 {
			addFlags("DtsMap")
		}
	}
	if builder.Len() != 0 {
		return builder.String()
	}
	return "None"
}

func (r *readableBuildInfo) setEmitSignatures() {
	r.EmitSignatures = core.Map(r.buildInfo.EmitSignatures, func(signature *incremental.BuildInfoEmitSignature) *readableBuildInfoEmitSignature {
		return &readableBuildInfoEmitSignature{
			File:                r.toFilePath(signature.FileId),
			Signature:           signature.Signature,
			DiffersOnlyInDtsMap: signature.DiffersOnlyInDtsMap,
			DiffersInOptions:    signature.DiffersInOptions,
			Original:            signature,
		}
	})
}

func (r *readableBuildInfo) setResolvedRoot() {
	r.ResolvedRoot = core.Map(r.buildInfo.ResolvedRoot, func(original *incremental.BuildInfoResolvedRoot) *readableBuildInfoResolvedRoot {
		return &readableBuildInfoResolvedRoot{
			Resolved: r.toFilePath(original.Resolved),
			Root:     r.toFilePath(original.Root),
		}
	})
}
