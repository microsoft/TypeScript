package core

type ParsedOptions struct {
	CompilerOptions *CompilerOptions `json:"compilerOptions"`
	WatchOptions    *WatchOptions    `json:"watchOptions"`
	TypeAcquisition *TypeAcquisition `json:"typeAcquisition"`

	FileNames         []string            `json:"fileNames"`
	ProjectReferences []*ProjectReference `json:"projectReferences"`
}
