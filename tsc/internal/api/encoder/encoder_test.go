package encoder_test

import (
	"encoding/binary"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/api/encoder"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"gotest.tools/v3/assert"
)

func TestEncodeSourceFile(t *testing.T) {
	t.Parallel()
	sourceFile := parser.ParseSourceFile("/test.ts", "/test.ts", "import { bar } from \"bar\";\nexport function foo<T, U>(a: string, b: string): any {}\nfoo();", core.ScriptTargetESNext, scanner.JSDocParsingModeParseAll)
	t.Run("baseline", func(t *testing.T) {
		t.Parallel()
		buf, err := encoder.EncodeSourceFile(sourceFile, "")
		assert.NilError(t, err)

		str := formatEncodedSourceFile(buf)
		baseline.Run(t, "encodeSourceFile.txt", str, baseline.Options{
			Subfolder: "api",
		})
	})
}

func BenchmarkEncodeSourceFile(b *testing.B) {
	repo.SkipIfNoTypeScriptSubmodule(b)
	filePath := filepath.Join(repo.TypeScriptSubmodulePath, "src/compiler/checker.ts")
	fileContent, err := os.ReadFile(filePath)
	assert.NilError(b, err)
	sourceFile := parser.ParseSourceFile(
		"/checker.ts",
		"/checker.ts",
		string(fileContent),
		core.ScriptTargetESNext,
		scanner.JSDocParsingModeParseAll,
	)

	for b.Loop() {
		_, err := encoder.EncodeSourceFile(sourceFile, "")
		assert.NilError(b, err)
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
		if ast.Kind(kind) == ast.KindIdentifier || ast.Kind(kind) == ast.KindStringLiteral {
			stringIndex := readUint32(encoded, i+encoder.NodeOffsetData) & encoder.NodeDataStringIndexMask
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
