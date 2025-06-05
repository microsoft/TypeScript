package core

//go:generate go tool golang.org/x/tools/cmd/stringer -type=ScriptKind -output=scriptkind_stringer_generated.go
//go:generate go tool mvdan.cc/gofumpt -lang=go1.24 -w scriptkind_stringer_generated.go

type ScriptKind int32

const (
	ScriptKindUnknown ScriptKind = iota
	ScriptKindJS
	ScriptKindJSX
	ScriptKindTS
	ScriptKindTSX
	ScriptKindExternal
	ScriptKindJSON
	/**
	 * Used on extensions that doesn't define the ScriptKind but the content defines it.
	 * Deferred extensions are going to be included in all project contexts.
	 */
	ScriptKindDeferred
)
