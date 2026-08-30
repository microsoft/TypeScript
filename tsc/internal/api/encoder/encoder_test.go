package encoder_test

import (
	"encoding/binary"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/encoder"
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/baseline"
	"gotest.tools/v3/assert"
)

func TestEncodeSourceFile(t *testing.T) {
	t.Parallel()
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/test.ts",
		Path:     "/test.ts",
	}, "import { bar } from \"bar\";\nexport function foo<T, U>(a: string, b: string): any {}\nfoo();", core.ScriptKindTS)
	t.Run("baseline", func(t *testing.T) {
		t.Parallel()
		buf, _, err := encoder.EncodeSourceFile(sourceFile)
		assert.NilError(t, err)

		str := formatEncodedSourceFile(buf)
		baseline.Run(t, "encodeSourceFile.txt", str, baseline.Options{
			Subfolder: "api",
		})
	})
}

func TestEncodeContentMapperSourceFileMetadata(t *testing.T) {
	t.Parallel()
	if encoder.ProtocolVersion != 8 {
		t.Fatalf("protocol version = %d, want 8", encoder.ProtocolVersion)
	}
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/component.vue",
		Path:     "/component.vue",
	}, "😀virtual", core.ScriptKindTS)
	sourceFile.SetContentMapperInfo(ast.ContentMapperSourceFileInfo{
		OriginalText:    "😀original",
		ContentMapper:   "mapper@1.0.0",
		VirtualFileName: "/component.vue.ts",
		DiagnosticDirectives: []ast.MappedDiagnosticDirective{{
			OriginalRange:     core.NewTextRange(4, 5),
			VirtualRange:      core.NewTextRange(4, 11),
			Policy:            ast.MappedDiagnosticDirectivePolicyExpect,
			UnusedCode:        2578,
			UnusedMessageText: "Unused framework directive.",
			Source:            "mapper",
		}},
	})

	buf, _, err := encoder.EncodeSourceFile(sourceFile)
	assert.NilError(t, err)
	nodesOffset := readUint32(buf, encoder.HeaderOffsetNodes)
	rootData := readUint32(buf, int(nodesOffset)+encoder.NodeSize+encoder.NodeOffsetData)
	extendedOffset := readUint32(buf, encoder.HeaderOffsetExtendedData) + (rootData & encoder.NodeDataStringIndexMask)
	if int(extendedOffset)+76 > len(buf) {
		t.Fatalf("invalid extended offset %d (nodes=%d rootData=%#x extendedData=%d len=%d)", extendedOffset, nodesOffset, rootData, readUint32(buf, encoder.HeaderOffsetExtendedData), len(buf))
	}
	contentMapperIndex := readUint32(buf, int(extendedOffset)+64)
	virtualFileNameIndex := readUint32(buf, int(extendedOffset)+68)
	diagnosticDirectivesOffset := readUint32(buf, int(extendedOffset)+72)
	assert.Equal(t, encodedString(buf, contentMapperIndex), "mapper@1.0.0")
	assert.Equal(t, encodedString(buf, virtualFileNameIndex), "/component.vue.ts")
	structuredDataOffset := readUint32(buf, encoder.HeaderOffsetStructuredData)
	directiveOffset := structuredDataOffset + diagnosticDirectivesOffset
	assert.DeepEqual(t, buf[directiveOffset:directiveOffset+10], []byte{
		0x91, // one directive
		0x96, // six-element tuple
		2, 1, // original range [2, 3) in UTF-16
		2, 7, // virtual range [2, 9) in UTF-16
		1,            // expect policy
		0xcd, 10, 18, // unused diagnostic code 2578
	})
}

func encodedString(buf []byte, index uint32) string {
	stringOffsets := readUint32(buf, encoder.HeaderOffsetStringOffsets)
	stringData := readUint32(buf, encoder.HeaderOffsetStringData)
	start := readUint32(buf, int(stringOffsets+index*4))
	end := readUint32(buf, int(stringOffsets+index*4+4))
	return string(buf[stringData+start : stringData+end])
}

func TestEncodeSourceFileWithUnicodeEscapes(t *testing.T) {
	t.Parallel()
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/test.ts",
		Path:     "/test.ts",
	}, `let a = "😃"; let b = "\ud83d\ude03"; let c = "\udc00\ud83d\ude03"; let d = "\ud83d\ud83d\ude03"`, core.ScriptKindTS)
	t.Run("baseline", func(t *testing.T) {
		t.Parallel()
		buf, _, err := encoder.EncodeSourceFile(sourceFile)
		assert.NilError(t, err)

		str := formatEncodedSourceFile(buf)
		baseline.Run(t, "encodeSourceFileWithUnicodeEscapes.txt", str, baseline.Options{
			Subfolder: "api",
		})
	})
}

func TestBuildNodeIndexTableMatchesEncode(t *testing.T) {
	t.Parallel()
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/test.ts",
		Path:     "/test.ts",
	}, "import { bar } from \"bar\";\nexport function foo<T, U>(a: string, b: string): any {}\nfoo();", core.ScriptKindTS)

	_, encodeTable, err := encoder.EncodeSourceFile(sourceFile)
	assert.NilError(t, err)

	buildTable := encoder.BuildNodeIndexTable(sourceFile)

	// Both tables should produce identical Nodes slices
	assert.Equal(t, len(buildTable.Nodes), len(encodeTable.Nodes), "Nodes slice length mismatch")

	// Every index should map to the same node
	for i := range encodeTable.Nodes {
		assert.Equal(t, buildTable.Nodes[i], encodeTable.Nodes[i], "node mismatch at index %d", i)
	}

	// GetIndex on both tables should agree for every non-nil node
	for i, node := range encodeTable.Nodes {
		if node == nil {
			continue
		}
		encIdx := encodeTable.GetIndex(node)
		buildIdx := buildTable.GetIndex(node)
		assert.Equal(t, encIdx, uint32(i), "encodeTable.GetIndex mismatch at index %d, node kind=%s", i, node.Kind.String())
		assert.Equal(t, buildIdx, encIdx, "buildTable.GetIndex mismatch for node kind=%s", node.Kind.String())
	}
}

func BenchmarkEncodeSourceFile(b *testing.B) {
	filePath := filepath.Join(repo.TestDataPath(), "fixtures/compiler/checker.ts")
	fileContent, err := os.ReadFile(filePath)
	assert.NilError(b, err)
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/checker.ts",
		Path:     "/checker.ts",
	}, string(fileContent), core.ScriptKindTS)

	for b.Loop() {
		_, _, err := encoder.EncodeSourceFile(sourceFile)
		assert.NilError(b, err)
	}
}

func BenchmarkBuildNodeIndexTable(b *testing.B) {
	filePath := filepath.Join(repo.TestDataPath(), "fixtures/compiler/checker.ts")
	fileContent, err := os.ReadFile(filePath)
	assert.NilError(b, err)
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/checker.ts",
		Path:     "/checker.ts",
	}, string(fileContent), core.ScriptKindTS)

	for b.Loop() {
		encoder.BuildNodeIndexTable(sourceFile)
	}
}

func readUint32(buf []byte, offset int) uint32 {
	return binary.LittleEndian.Uint32(buf[offset : offset+4])
}

func formatEncodedSourceFile(encoded []byte) string {
	var result strings.Builder
	var getIndent func(parentIndex uint32) string
	offsetNodes := readUint32(encoded, encoder.HeaderOffsetNodes)
	offsetStringOffsets := readUint32(encoded, encoder.HeaderOffsetStringOffsets)
	offsetStrings := readUint32(encoded, encoder.HeaderOffsetStringData)
	getIndent = func(parentIndex uint32) string {
		if parentIndex == 0 {
			return ""
		}
		return "  " + getIndent(readUint32(encoded, int(offsetNodes)+int(parentIndex)*encoder.NodeSize+encoder.NodeOffsetParent))
	}
	j := 1
	for i := int(offsetNodes) + encoder.NodeSize; i < len(encoded); i += encoder.NodeSize {
		kind := readUint32(encoded, i+encoder.NodeOffsetKind)
		pos := readUint32(encoded, i+encoder.NodeOffsetPos)
		end := readUint32(encoded, i+encoder.NodeOffsetEnd)
		parentIndex := readUint32(encoded, i+encoder.NodeOffsetParent)
		result.WriteString(getIndent(parentIndex))
		if kind == encoder.SyntaxKindNodeList {
			result.WriteString("NodeList")
		} else {
			result.WriteString(ast.Kind(kind).String())
		}
		data := readUint32(encoded, i+encoder.NodeOffsetData)
		dataType := data & encoder.NodeDataTypeMask
		if ast.Kind(kind) == ast.KindIdentifier || (dataType == encoder.NodeDataTypeString) {
			stringIndex := data & encoder.NodeDataStringIndexMask
			strStart := readUint32(encoded, int(offsetStringOffsets+stringIndex*4))
			strEnd := readUint32(encoded, int(offsetStringOffsets+stringIndex*4)+4)
			str := string(encoded[offsetStrings+strStart : offsetStrings+strEnd])
			result.WriteString(fmt.Sprintf(" \"%s\"", str))
		}
		fmt.Fprintf(&result, " [%d, %d), i=%d, next=%d", pos, end, j, encoded[i+encoder.NodeOffsetNext])
		result.WriteString("\n")
		j++
	}
	return result.String()
}
