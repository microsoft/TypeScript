package incremental

import (
	"fmt"
	"iter"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type (
	BuildInfoFileId       int
	BuildInfoFileIdListId int
	// BuildInfoPath is a serialized build-info path. It may be relative to the
	// build-info file, absolute, or a symbolic default-library name.
	BuildInfoPath string
)

func (p BuildInfoPath) AsString() string {
	return string(p)
}

// buildInfoRoot is
// - for incremental program buildinfo
//   - start and end of FileId for consecutive fileIds to be included as root
//   - start - single fileId that is root
//
// - for non incremental program buildinfo
//   - string that is the root file name
type BuildInfoRoot struct {
	Start          BuildInfoFileId
	End            BuildInfoFileId
	NonIncremental BuildInfoPath // Root of a non incremental program
}

func (b *BuildInfoRoot) MarshalJSON() ([]byte, error) {
	if b.Start != 0 {
		if b.End != 0 {
			return json.Marshal([2]BuildInfoFileId{b.Start, b.End})
		} else {
			return json.Marshal(b.Start)
		}
	} else {
		return json.Marshal(b.NonIncremental)
	}
}

func (b *BuildInfoRoot) UnmarshalJSON(data []byte) error {
	var startAndEnd *[2]int
	if err := json.Unmarshal(data, &startAndEnd); err != nil {
		var start int
		if err := json.Unmarshal(data, &start); err != nil {
			var name BuildInfoPath
			if err := json.Unmarshal(data, &name); err != nil {
				return fmt.Errorf("invalid BuildInfoRoot: %s", data)
			}
			*b = BuildInfoRoot{
				NonIncremental: name,
			}
			return nil
		}
		*b = BuildInfoRoot{
			Start: BuildInfoFileId(start),
		}
		return nil
	}
	*b = BuildInfoRoot{
		Start: BuildInfoFileId(startAndEnd[0]),
		End:   BuildInfoFileId(startAndEnd[1]),
	}
	return nil
}

type buildInfoFileInfoNoSignature struct {
	Version            string              `json:"version,omitzero"`
	NoSignature        bool                `json:"noSignature,omitzero"`
	AffectsGlobalScope bool                `json:"affectsGlobalScope,omitzero"`
	ImpliedNodeFormat  core.ResolutionMode `json:"impliedNodeFormat,omitzero"`
}

//	 Signature is
//		 - undefined if FileInfo.version === FileInfo.signature
//		 - string actual signature
type buildInfoFileInfoWithSignature struct {
	Version            string              `json:"version,omitzero"`
	Signature          string              `json:"signature,omitzero"`
	AffectsGlobalScope bool                `json:"affectsGlobalScope,omitzero"`
	ImpliedNodeFormat  core.ResolutionMode `json:"impliedNodeFormat,omitzero"`
}

type BuildInfoFileInfo struct {
	signature   string
	noSignature *buildInfoFileInfoNoSignature
	fileInfo    *buildInfoFileInfoWithSignature
}

func newBuildInfoFileInfo(fileInfo *FileInfo) *BuildInfoFileInfo {
	if fileInfo.version == fileInfo.signature {
		if !fileInfo.affectsGlobalScope && fileInfo.impliedNodeFormat == core.ResolutionModeCommonJS {
			return &BuildInfoFileInfo{signature: fileInfo.signature}
		}
	} else if fileInfo.signature == "" {
		return &BuildInfoFileInfo{noSignature: &buildInfoFileInfoNoSignature{
			Version:            fileInfo.version,
			NoSignature:        true,
			AffectsGlobalScope: fileInfo.affectsGlobalScope,
			ImpliedNodeFormat:  fileInfo.impliedNodeFormat,
		}}
	}
	return &BuildInfoFileInfo{fileInfo: &buildInfoFileInfoWithSignature{
		Version:            fileInfo.version,
		Signature:          core.IfElse(fileInfo.signature == fileInfo.version, "", fileInfo.signature),
		AffectsGlobalScope: fileInfo.affectsGlobalScope,
		ImpliedNodeFormat:  fileInfo.impliedNodeFormat,
	}}
}

func (b *BuildInfoFileInfo) GetFileInfo() *FileInfo {
	if b == nil {
		return nil
	}
	if b.signature != "" {
		return &FileInfo{
			version:           b.signature,
			signature:         b.signature,
			impliedNodeFormat: core.ResolutionModeCommonJS,
		}
	}
	if b.noSignature != nil {
		return &FileInfo{
			version:            b.noSignature.Version,
			affectsGlobalScope: b.noSignature.AffectsGlobalScope,
			impliedNodeFormat:  b.noSignature.ImpliedNodeFormat,
		}
	}
	return &FileInfo{
		version:            b.fileInfo.Version,
		signature:          core.IfElse(b.fileInfo.Signature == "", b.fileInfo.Version, b.fileInfo.Signature),
		affectsGlobalScope: b.fileInfo.AffectsGlobalScope,
		impliedNodeFormat:  b.fileInfo.ImpliedNodeFormat,
	}
}

func (b *BuildInfoFileInfo) HasSignature() bool {
	return b.signature != ""
}

func (b *BuildInfoFileInfo) MarshalJSON() ([]byte, error) {
	if b.signature != "" {
		return json.Marshal(b.signature)
	}
	if b.noSignature != nil {
		return json.Marshal(b.noSignature)
	}
	return json.Marshal(b.fileInfo)
}

func (b *BuildInfoFileInfo) UnmarshalJSON(data []byte) error {
	var vSignature string
	if err := json.Unmarshal(data, &vSignature); err != nil {
		var noSignature buildInfoFileInfoNoSignature
		if err := json.Unmarshal(data, &noSignature); err != nil || !noSignature.NoSignature {
			var fileInfo buildInfoFileInfoWithSignature
			if err := json.Unmarshal(data, &fileInfo); err != nil {
				return fmt.Errorf("invalid BuildInfoFileInfo: %s", data)
			}
			*b = BuildInfoFileInfo{fileInfo: &fileInfo}
			return nil
		}
		*b = BuildInfoFileInfo{noSignature: &noSignature}
		return nil
	}
	*b = BuildInfoFileInfo{signature: vSignature}
	return nil
}

type BuildInfoReferenceMapEntry struct {
	FileId       BuildInfoFileId
	FileIdListId BuildInfoFileIdListId
}

func (b *BuildInfoReferenceMapEntry) MarshalJSON() ([]byte, error) {
	return json.Marshal([2]int{int(b.FileId), int(b.FileIdListId)})
}

func (b *BuildInfoReferenceMapEntry) UnmarshalJSON(data []byte) error {
	var v *[2]int
	if err := json.Unmarshal(data, &v); err != nil {
		return err
	}
	*b = BuildInfoReferenceMapEntry{
		FileId:       BuildInfoFileId(v[0]),
		FileIdListId: BuildInfoFileIdListId(v[1]),
	}
	return nil
}

type BuildInfoDiagnostic struct {
	// BuildInfoFileId if it is for a File thats other than its stored for
	File               BuildInfoFileId          `json:"file,omitzero"`
	NoFile             bool                     `json:"noFile,omitzero"`
	Pos                int                      `json:"pos,omitzero"`
	End                int                      `json:"end,omitzero"`
	Code               int32                    `json:"code,omitzero"`
	Category           diagnostics.Category     `json:"category,omitzero"`
	Source             string                   `json:"source,omitzero"`
	MessageText        string                   `json:"messageText,omitzero"`
	MessageKey         diagnostics.Key          `json:"messageKey,omitzero"`
	MessageArgs        []string                 `json:"messageArgs,omitzero"`
	MessageChain       []*BuildInfoDiagnostic   `json:"messageChain,omitzero"`
	RelatedInformation []*BuildInfoDiagnostic   `json:"relatedInformation,omitzero"`
	ReportsUnnecessary bool                     `json:"reportsUnnecessary,omitzero"`
	ReportsDeprecated  bool                     `json:"reportsDeprecated,omitzero"`
	SkippedOnNoEmit    bool                     `json:"skippedOnNoEmit,omitzero"`
	RepopulateInfo     *BuildInfoRepopulateInfo `json:"repopulateInfo,omitzero"`
}

type BuildInfoRepopulateInfo struct {
	Kind            ast.RepopulateDiagnosticKind `json:"kind"`
	ModuleReference string                       `json:"moduleReference,omitzero"`
	Mode            core.ResolutionMode          `json:"mode,omitzero"`
	PackageName     string                       `json:"packageName,omitzero"`
}

type BuildInfoDiagnosticsOfFile struct {
	FileId      BuildInfoFileId
	Diagnostics []*BuildInfoDiagnostic
}

func (b *BuildInfoDiagnosticsOfFile) MarshalJSON() ([]byte, error) {
	fileIdAndDiagnostics := make([]any, 0, 2)
	fileIdAndDiagnostics = append(fileIdAndDiagnostics, b.FileId)
	fileIdAndDiagnostics = append(fileIdAndDiagnostics, b.Diagnostics)
	return json.Marshal(fileIdAndDiagnostics)
}

func (b *BuildInfoDiagnosticsOfFile) UnmarshalJSON(data []byte) error {
	var fileIdAndDiagnostics []json.Value
	if err := json.Unmarshal(data, &fileIdAndDiagnostics); err != nil {
		return fmt.Errorf("invalid BuildInfoDiagnosticsOfFile: %s", data)
	}
	if len(fileIdAndDiagnostics) != 2 {
		return fmt.Errorf("invalid BuildInfoDiagnosticsOfFile: expected 2 elements, got %d", len(fileIdAndDiagnostics))
	}
	var fileId BuildInfoFileId
	if err := json.Unmarshal(fileIdAndDiagnostics[0], &fileId); err != nil {
		return fmt.Errorf("invalid fileId in BuildInfoDiagnosticsOfFile: %w", err)
	}

	var diagnostics []*BuildInfoDiagnostic
	if err := json.Unmarshal(fileIdAndDiagnostics[1], &diagnostics); err != nil {
		return fmt.Errorf("invalid diagnostics in BuildInfoDiagnosticsOfFile: %w", err)
	}
	*b = BuildInfoDiagnosticsOfFile{
		FileId:      fileId,
		Diagnostics: diagnostics,
	}
	return nil
}

type BuildInfoSemanticDiagnostic struct {
	FileId      BuildInfoFileId             // File is not in changedSet and still doesnt have cached diagnostics
	Diagnostics *BuildInfoDiagnosticsOfFile // Diagnostics for file
}

func (b *BuildInfoSemanticDiagnostic) MarshalJSON() ([]byte, error) {
	if b.FileId != 0 {
		return json.Marshal(b.FileId)
	}
	return json.Marshal(b.Diagnostics)
}

func (b *BuildInfoSemanticDiagnostic) UnmarshalJSON(data []byte) error {
	var fileId BuildInfoFileId
	if err := json.Unmarshal(data, &fileId); err != nil {
		var diagnostics BuildInfoDiagnosticsOfFile
		if err := json.Unmarshal(data, &diagnostics); err != nil {
			return fmt.Errorf("invalid BuildInfoSemanticDiagnostic: %s", data)
		}
		*b = BuildInfoSemanticDiagnostic{
			Diagnostics: &diagnostics,
		}
		return nil
	}
	*b = BuildInfoSemanticDiagnostic{
		FileId: fileId,
	}
	return nil
}

// fileId if pending emit is same as what compilerOptions suggest
// [fileId] if pending emit is only dts file emit
// [fileId, emitKind] if any other type emit is pending
type BuildInfoFilePendingEmit struct {
	FileId   BuildInfoFileId
	EmitKind FileEmitKind
}

func (b *BuildInfoFilePendingEmit) MarshalJSON() ([]byte, error) {
	if b.EmitKind == 0 {
		return json.Marshal(b.FileId)
	}
	if b.EmitKind == FileEmitKindDts {
		fileListIds := []BuildInfoFileId{b.FileId}
		return json.Marshal(fileListIds)
	}
	fileAndEmitKind := []int{int(b.FileId), int(b.EmitKind)}
	return json.Marshal(fileAndEmitKind)
}

func (b *BuildInfoFilePendingEmit) UnmarshalJSON(data []byte) error {
	var fileId BuildInfoFileId
	if err := json.Unmarshal(data, &fileId); err != nil {
		var intTuple []int
		if err := json.Unmarshal(data, &intTuple); err != nil || len(intTuple) == 0 {
			return fmt.Errorf("invalid BuildInfoFilePendingEmit: %s", data)
		}
		switch len(intTuple) {
		case 1:
			*b = BuildInfoFilePendingEmit{
				FileId:   BuildInfoFileId(intTuple[0]),
				EmitKind: FileEmitKindDts,
			}
			return nil
		case 2:
			*b = BuildInfoFilePendingEmit{
				FileId:   BuildInfoFileId(intTuple[0]),
				EmitKind: FileEmitKind(intTuple[1]),
			}
			return nil
		default:
			return fmt.Errorf("invalid BuildInfoFilePendingEmit: expected 1 or 2 integers, got %d", len(intTuple))
		}
	}
	*b = BuildInfoFilePendingEmit{
		FileId: fileId,
	}
	return nil
}

// [fileId, signature] if different from file's signature
// fileId if file wasnt emitted
type BuildInfoEmitSignature struct {
	FileId              BuildInfoFileId
	Signature           string // Signature if it is different from file's Signature
	DiffersOnlyInDtsMap bool   // true if signature is different only in dtsMap value
	DiffersInOptions    bool   // true if signature is different in options used to emit file
}

func (b *BuildInfoEmitSignature) noEmitSignature() bool {
	return b.Signature == "" && !b.DiffersOnlyInDtsMap && !b.DiffersInOptions
}

func (b *BuildInfoEmitSignature) toEmitSignature(path tspath.PathKey, emitSignatures *collections.SyncMap[tspath.PathKey, *emitSignature]) *emitSignature {
	var signature string
	var signatureWithDifferentOptions []string
	if b.DiffersOnlyInDtsMap {
		signatureWithDifferentOptions = make([]string, 0, 1)
		info, _ := emitSignatures.Load(path)
		signatureWithDifferentOptions = append(signatureWithDifferentOptions, info.signature)
	} else if b.DiffersInOptions {
		signatureWithDifferentOptions = make([]string, 0, 1)
		signatureWithDifferentOptions = append(signatureWithDifferentOptions, b.Signature)
	} else {
		signature = b.Signature
	}
	return &emitSignature{
		signature:                     signature,
		signatureWithDifferentOptions: signatureWithDifferentOptions,
	}
}

func (b *BuildInfoEmitSignature) MarshalJSON() ([]byte, error) {
	if b.noEmitSignature() {
		return json.Marshal(b.FileId)
	}
	fileIdAndSignature := make([]any, 2)
	fileIdAndSignature[0] = b.FileId
	var signature any
	if b.DiffersOnlyInDtsMap {
		signature = []string{}
	} else if b.DiffersInOptions {
		signature = []string{b.Signature}
	} else {
		signature = b.Signature
	}
	fileIdAndSignature[1] = signature
	return json.Marshal(fileIdAndSignature)
}

func (b *BuildInfoEmitSignature) UnmarshalJSON(data []byte) error {
	var fileId BuildInfoFileId
	if err := json.Unmarshal(data, &fileId); err != nil {
		var fileIdAndSignature []any
		if err := json.Unmarshal(data, &fileIdAndSignature); err != nil {
			return fmt.Errorf("invalid BuildInfoEmitSignature: %s", data)
		}
		if len(fileIdAndSignature) != 2 {
			return fmt.Errorf("invalid BuildInfoEmitSignature: expected 2 elements, got %d", len(fileIdAndSignature))
		}
		var fileId BuildInfoFileId
		if id, ok := fileIdAndSignature[0].(float64); !ok {
			return fmt.Errorf("invalid fileId in BuildInfoEmitSignature: expected float64, got %T", fileIdAndSignature[0])
		} else {
			fileId = BuildInfoFileId(id)
		}
		var signature string
		var differsOnlyInDtsMap, differsInOptions bool
		if signatureV, ok := fileIdAndSignature[1].(string); !ok {
			if signatureList, ok := fileIdAndSignature[1].([]any); !ok {
				return fmt.Errorf("invalid signature in BuildInfoEmitSignature: expected string or []string, got %T", fileIdAndSignature[1])
			} else {
				switch len(signatureList) {
				case 0:
					differsOnlyInDtsMap = true
				case 1:
					if sig, ok := signatureList[0].(string); !ok {
						return fmt.Errorf("invalid signature in BuildInfoEmitSignature: expected string, got %T", signatureList[0])
					} else {
						signature = sig
						differsInOptions = true
					}
				default:
					return fmt.Errorf("invalid signature in BuildInfoEmitSignature: expected string or []string with 0 or 1 element, got %d elements", len(signatureList))
				}
			}
		} else {
			signature = signatureV
		}
		*b = BuildInfoEmitSignature{
			FileId:              fileId,
			Signature:           signature,
			DiffersOnlyInDtsMap: differsOnlyInDtsMap,
			DiffersInOptions:    differsInOptions,
		}
		return nil

	}
	*b = BuildInfoEmitSignature{
		FileId: fileId,
	}
	return nil
}

type BuildInfoResolvedRoot struct {
	Resolved BuildInfoFileId
	Root     BuildInfoFileId
}

func (b *BuildInfoResolvedRoot) MarshalJSON() ([]byte, error) {
	return json.Marshal([2]BuildInfoFileId{b.Resolved, b.Root})
}

func (b *BuildInfoResolvedRoot) UnmarshalJSON(data []byte) error {
	var resolvedAndRoot [2]int
	if err := json.Unmarshal(data, &resolvedAndRoot); err != nil {
		return fmt.Errorf("invalid BuildInfoResolvedRoot: %s", data)
	}
	*b = BuildInfoResolvedRoot{
		Resolved: BuildInfoFileId(resolvedAndRoot[0]),
		Root:     BuildInfoFileId(resolvedAndRoot[1]),
	}
	return nil
}

type BuildInfo struct {
	Version string `json:"version,omitzero"`

	// Common between incremental and tsc -b buildinfo for non incremental programs
	Errors                  bool             `json:"errors,omitzero"`
	CheckPending            bool             `json:"checkPending,omitzero"`
	Root                    []*BuildInfoRoot `json:"root,omitzero"`
	PackageJsons            []BuildInfoPath  `json:"packageJsons,omitzero"`
	MissingPackageJsons     []BuildInfoPath  `json:"missingPackageJsons,omitzero"`
	ContentMapperIdentities []string         `json:"contentMapperIdentities,omitzero"`

	// IncrementalProgram info
	FileNames                  []BuildInfoPath                      `json:"fileNames,omitzero"`
	FileInfos                  []*BuildInfoFileInfo                 `json:"fileInfos,omitzero"`
	FileIdsList                [][]BuildInfoFileId                  `json:"fileIdsList,omitzero"`
	Options                    *collections.OrderedMap[string, any] `json:"options,omitzero"`
	ReferencedMap              []*BuildInfoReferenceMapEntry        `json:"referencedMap,omitzero"`
	SemanticDiagnosticsPerFile []*BuildInfoSemanticDiagnostic       `json:"semanticDiagnosticsPerFile,omitzero"`
	EmitDiagnosticsPerFile     []*BuildInfoDiagnosticsOfFile        `json:"emitDiagnosticsPerFile,omitzero"`
	ChangeFileSet              []BuildInfoFileId                    `json:"changeFileSet,omitzero"`
	AffectedFilesPendingEmit   []*BuildInfoFilePendingEmit          `json:"affectedFilesPendingEmit,omitzero"`
	LatestChangedDtsFile       BuildInfoPath                        `json:"latestChangedDtsFile,omitzero"` // Because this is only output file in the program, we dont need fileId to deduplicate name
	EmitSignatures             []*BuildInfoEmitSignature            `json:"emitSignatures,omitzero"`
	ResolvedRoot               []*BuildInfoResolvedRoot             `json:"resolvedRoot,omitzero"`

	// NonIncrementalProgram info
	SemanticErrors bool `json:"semanticErrors,omitzero"`
}

func (b *BuildInfo) IsValidVersion() bool {
	return b.Version == core.Version()
}

// ContentMapperIdentities returns the project's sorted mapper transform identities. A nil project means
// the compiler host has no configured content mappers.
func ContentMapperIdentities(project contentmapper.Project) ([]string, error) {
	if project == nil {
		return nil, nil
	}
	return project.Identities()
}

// ContentMapperIdentitiesMatch reports whether the content mapper identities recorded in this build info
// match the given current identities (as produced by ContentMapperIdentities).
func (b *BuildInfo) ContentMapperIdentitiesMatch(current []string) bool {
	return slices.Equal(b.ContentMapperIdentities, current)
}

func (b *BuildInfo) IsIncremental() bool {
	return b != nil && len(b.FileNames) != 0
}

func IsBuildInfoFileNameDefaultLibrary(fileName BuildInfoPath) bool {
	return !tspath.PathIsRelative(fileName.AsString()) && !tspath.PathIsAbsolute(fileName.AsString())
}

func ResolveBuildInfoFileName(fileName BuildInfoPath, buildInfoDirectory tspath.RootedDirectoryPath, defaultLibraryPath tspath.RootedDirectoryPath) tspath.RootedFilePath {
	if IsBuildInfoFileNameDefaultLibrary(fileName) {
		return defaultLibraryPath.ResolveFile(fileName.AsString())
	}
	return tspath.ToRootedFilePath(fileName.AsString(), buildInfoDirectory)
}

func (b *BuildInfo) fileName(fileId BuildInfoFileId) BuildInfoPath {
	if fileId < 1 || int(fileId) > len(b.FileNames) {
		return ""
	}
	return b.FileNames[fileId-1]
}

func (b *BuildInfo) fileInfo(fileId BuildInfoFileId) *BuildInfoFileInfo {
	if fileId < 1 || int(fileId) > len(b.FileInfos) {
		return nil
	}
	return b.FileInfos[fileId-1]
}

func (b *BuildInfo) GetCompilerOptions(buildInfoDirectory tspath.RootedDirectoryPath) *core.CompilerOptions {
	options := &core.CompilerOptions{}
	for option, value := range b.Options.Entries() {
		optionDeclaration := tsoptions.CommandLineCompilerOptionsMap.Get(option)
		if buildInfoDirectory == "" && optionDeclaration != nil {
			pathKind := optionDeclaration.PathKind
			if optionDeclaration.Kind == tsoptions.CommandLineOptionTypeList {
				if element := optionDeclaration.Elements(); element != nil {
					pathKind = element.PathKind
				}
			}
			if pathKind.IsRooted() {
				continue
			}
		}
		if buildInfoDirectory != "" {
			result, ok := tsoptions.ConvertOptionToAbsolutePath(option, value, tsoptions.CommandLineCompilerOptionsMap, buildInfoDirectory)
			if ok {
				tsoptions.ParseCompilerOptions(option, result, options)
				continue
			}
		}
		tsoptions.ParseCompilerOptions(option, value, options)

	}
	return options
}

func (b *BuildInfo) IsEmitPending(resolved *tsoptions.ParsedCommandLine, buildInfoDirectory tspath.RootedDirectoryPath) bool {
	// Some of the emit files like source map or dts etc are not yet done
	if !resolved.CompilerOptions().NoEmit.IsTrue() || resolved.CompilerOptions().GetEmitDeclarations() {
		pendingEmit := getPendingEmitKindWithOptions(resolved.CompilerOptions(), b.GetCompilerOptions(buildInfoDirectory))
		if resolved.CompilerOptions().NoEmit.IsTrue() {
			pendingEmit &= FileEmitKindDtsErrors
		}
		return pendingEmit != 0
	}
	return false
}

func (b *BuildInfo) GetPackageJsons(buildInfoDirectory tspath.RootedDirectoryPath) iter.Seq[tspath.RootedFilePath] {
	return getBuildInfoFileNames(b.PackageJsons, buildInfoDirectory)
}

func (b *BuildInfo) GetMissingPackageJsons(buildInfoDirectory tspath.RootedDirectoryPath) iter.Seq[tspath.RootedFilePath] {
	return getBuildInfoFileNames(b.MissingPackageJsons, buildInfoDirectory)
}

func getBuildInfoFileNames(paths []BuildInfoPath, buildInfoDirectory tspath.RootedDirectoryPath) iter.Seq[tspath.RootedFilePath] {
	return func(yield func(tspath.RootedFilePath) bool) {
		for _, path := range paths {
			if !yield(buildInfoDirectory.ResolveFile(path.AsString())) {
				return
			}
		}
	}
}

func (b *BuildInfo) GetBuildInfoRootInfoReader(buildInfoDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) *BuildInfoRootInfoReader {
	resolvedRootFileInfos := make(map[tspath.PathKey]*BuildInfoFileInfo, len(b.FileNames))
	resolvedRootFileNames := make(map[tspath.PathKey]tspath.RootedFilePath, len(b.FileNames))
	rootFileNames := make(map[tspath.PathKey]tspath.RootedFilePath, len(b.FileNames))
	// Roots of the File
	rootToResolved := collections.NewOrderedMapWithSizeHint[tspath.PathKey, tspath.PathKey](len(b.FileNames))
	resolvedToRoot := make(map[tspath.PathKey]tspath.PathKey, len(b.ResolvedRoot))
	toFileName := func(fileName BuildInfoPath) tspath.RootedFilePath {
		return tspath.ToRootedFilePath(fileName.AsString(), buildInfoDirectory)
	}

	// Create map from resolvedRoot to Root
	for _, resolved := range b.ResolvedRoot {
		resolvedRoot := b.fileName(resolved.Resolved)
		root := b.fileName(resolved.Root)
		if resolvedRoot != "" && root != "" {
			rootFileName := toFileName(root)
			rootPath := caseSensitivity.PathKey(rootFileName.AsPath())
			resolvedToRoot[caseSensitivity.PathKey(toFileName(resolvedRoot).AsPath())] = rootPath
			rootFileNames[rootPath] = rootFileName
		}
	}

	addRoot := func(resolvedRoot BuildInfoPath, fileInfo *BuildInfoFileInfo) {
		if resolvedRoot == "" {
			return
		}
		resolvedRootFileName := toFileName(resolvedRoot)
		resolvedRootPath := caseSensitivity.PathKey(resolvedRootFileName.AsPath())
		resolvedRootFileNames[resolvedRootPath] = resolvedRootFileName
		if rootPath, ok := resolvedToRoot[resolvedRootPath]; ok {
			rootToResolved.Set(rootPath, resolvedRootPath)
		} else {
			rootToResolved.Set(resolvedRootPath, resolvedRootPath)
			rootFileNames[resolvedRootPath] = resolvedRootFileName
		}
		if fileInfo != nil {
			resolvedRootFileInfos[resolvedRootPath] = fileInfo
		}
	}

	for _, root := range b.Root {
		if root.NonIncremental != "" {
			addRoot(root.NonIncremental, nil)
		} else if root.End == 0 {
			addRoot(b.fileName(root.Start), b.fileInfo(root.Start))
		} else {
			for i := root.Start; i <= root.End; i++ {
				addRoot(b.fileName(i), b.fileInfo(i))
			}
		}
	}

	return &BuildInfoRootInfoReader{
		resolvedRootFileInfos: resolvedRootFileInfos,
		resolvedRootFileNames: resolvedRootFileNames,
		rootFileNames:         rootFileNames,
		rootToResolved:        rootToResolved,
	}
}

type BuildInfoRootInfoReader struct {
	resolvedRootFileInfos map[tspath.PathKey]*BuildInfoFileInfo
	resolvedRootFileNames map[tspath.PathKey]tspath.RootedFilePath
	rootFileNames         map[tspath.PathKey]tspath.RootedFilePath
	rootToResolved        *collections.OrderedMap[tspath.PathKey, tspath.PathKey]
}

func (b *BuildInfoRootInfoReader) GetBuildInfoFileInfo(inputFilePath tspath.PathKey) (*BuildInfoFileInfo, tspath.RootedFilePath) {
	if info, ok := b.resolvedRootFileInfos[inputFilePath]; ok {
		return info, b.resolvedRootFileNames[inputFilePath]
	}
	if resolved, ok := b.rootToResolved.Get(inputFilePath); ok {
		return b.resolvedRootFileInfos[resolved], b.resolvedRootFileNames[resolved]
	}
	return nil, ""
}

func (b *BuildInfoRootInfoReader) Roots() iter.Seq[tspath.PathKey] {
	return b.rootToResolved.Keys()
}

func (b *BuildInfoRootInfoReader) RootFileName(path tspath.PathKey) tspath.RootedFilePath {
	fileName, ok := b.rootFileNames[path]
	if !ok {
		panic("root file name not found")
	}
	return fileName
}
