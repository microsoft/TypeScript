package core

type ParsedOptions struct {
	CompilerOptions *CompilerOptions
	WatchOptions    *WatchOptions

	FileNames         []string
	ProjectReferences []ProjectReference
}
