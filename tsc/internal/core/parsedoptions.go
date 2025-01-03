package core

type ParsedOptions struct {
	Options           *CompilerOptions
	FileNames         []string
	ProjectReferences []ProjectReference
}
