package api

import (
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/binder"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func parseAndBind(t *testing.T, fileName string, text string) *ast.SourceFile {
	t.Helper()
	rootedFileName := tspath.ToRootedFilePath(fileName, "/")
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: rootedFileName,
		PathKey:  tspath.CaseSensitive.PathKey(rootedFileName.AsPath()),
	}, text, core.ScriptKindTS)
	binder.BindSourceFile(sourceFile)
	return sourceFile
}

func newTestSnapshotData() *snapshotData {
	return &snapshotData{
		handle:                  1,
		symbolRegistry:          make(map[SymbolID]*ast.Symbol),
		symbolCanonicalProjects: make(map[SymbolID]project.ID),
	}
}

func TestFileSymbolResponseSerializesDescriptorOnce(t *testing.T) {
	t.Parallel()
	sourceFile := parseAndBind(t, "/file.ts", `class C { property = 1 }`)

	response := newFileSymbolResponse(sourceFile.Statements.Nodes[0].Symbol())
	encoded, err := json.Marshal(response)
	assert.NilError(t, err)
	assert.Equal(t, strings.Count(string(encoded), `"contentHash"`), 1)
}

func TestFileOwnedSymbolsAreNotRegisteredInSnapshot(t *testing.T) {
	t.Parallel()
	sourceFile := parseAndBind(t, "/file.ts", `export class C { property = 1 }`)
	sd := newTestSnapshotData()

	response := sd.newSymbolResponse(sourceFile.Statements.Nodes[0].Symbol(), "/tsconfig.json")
	assert.Equal(t, response.Reference.Kind, SymbolOwnerKindFile)
	assert.Equal(t, len(sd.symbolRegistry), 0)
	assert.Equal(t, len(sd.symbolCanonicalProjects), 0)
}

func TestTransientSymbolWithFileDeclarationIsSnapshotOwned(t *testing.T) {
	t.Parallel()
	sourceFile := parseAndBind(t, "/file.ts", `export class C { property = 1 }`)
	class := sourceFile.Statements.Nodes[0]
	symbol := &ast.Symbol{
		Flags:        ast.SymbolFlagsClass | ast.SymbolFlagsTransient,
		Name:         "C",
		Declarations: []*ast.Node{class},
	}
	sd := newTestSnapshotData()

	response := sd.newSymbolResponse(symbol, "/tsconfig.json")
	assert.Equal(t, response.Reference.Kind, SymbolOwnerKindSnapshot)
	resolved, err := sd.resolveSymbolHandle(response.Reference.Id)
	assert.NilError(t, err)
	assert.Equal(t, resolved, symbol)
}

func TestSymbolReferencesIdentifyOwnerWithoutDescriptor(t *testing.T) {
	t.Parallel()
	sourceFile := parseAndBind(t, "/file.ts", `export class C { property = 1 }`)
	class := sourceFile.Statements.Nodes[0].Symbol()

	reference := newSymbolReference(class)
	assert.Equal(t, reference.Id, SymbolHandle(class))
	assert.Equal(t, reference.File, strconv.FormatUint(sourceFileNodeID(sourceFile), 10))
	encoded, err := json.Marshal(reference)
	assert.NilError(t, err)
	assert.Assert(t, !strings.Contains(string(encoded), "contentHash"))

	// A file-owned symbol's relationships are references into the same file.
	member := class.Members["property"]
	response := newFileSymbolResponse(member)
	assert.DeepEqual(t, response.Parent, reference)
}

func TestContentMappedSymbolsAreSnapshotOwned(t *testing.T) {
	t.Parallel()
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/component.vue.ts",
		PathKey:  "/component.vue.ts",
	}, `export class C { property = 1 }`, core.ScriptKindTS)
	sourceFile.SetContentMapperInfo(ast.ContentMapperSourceFileInfo{ContentMapper: "mapper"})
	binder.BindSourceFile(sourceFile)
	class := sourceFile.Statements.Nodes[0].Symbol()
	sd := newTestSnapshotData()

	response := sd.newSymbolResponse(class, "/tsconfig.json")
	assert.Equal(t, response.Reference.Kind, SymbolOwnerKindSnapshot)
	assert.Assert(t, response.Reference.File == nil)
	assert.Equal(t, response.Reference.Snapshot, SnapshotID(1))
	resolved, err := sd.resolveSymbolHandle(response.Reference.Id)
	assert.NilError(t, err)
	assert.Equal(t, resolved, class)

	reference := newSymbolReference(class.Members["property"])
	assert.Equal(t, reference.File, "")
}
