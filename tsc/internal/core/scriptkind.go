package core

//go:generate npm run --silent cache -- --input $GOFILE --output scriptkind_stringer_generated.go --command go tool golang.org/x/tools/cmd/stringer -type=ScriptKind -output=scriptkind_stringer_generated.go --command dprint fmt scriptkind_stringer_generated.go

type ScriptKind int32

const (
	ScriptKindUnknown ScriptKind = 0
	ScriptKindJS      ScriptKind = 1
	ScriptKindJSX     ScriptKind = 2
	ScriptKindTS      ScriptKind = 3
	ScriptKindTSX     ScriptKind = 4

	// Value 5 is reserved (formerly ScriptKindExternal).

	ScriptKindJSON ScriptKind = 6

	// Value 7 is reserved (formerly ScriptKindDeferred).
)
