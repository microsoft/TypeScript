package checker

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

const SyntheticSignatureFileName tspath.RootedFilePath = "tsgo://synthetic/signatures.d.ts"

var syntheticSignatureSourceFile = sync.OnceValue(func() *ast.SourceFile {
	return parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: SyntheticSignatureFileName,
		PathKey:  tspath.CaseSensitive.PathKey(tspath.RootedPath(SyntheticSignatureFileName)),
	}, "type SyntheticSignature = () => any;", core.ScriptKindTS)
})

// GetSyntheticSignatureSourceFile provides an immutable, shared AST for synthetic
// call-signature declarations. It is not an input file of any program.
func GetSyntheticSignatureSourceFile() *ast.SourceFile {
	return syntheticSignatureSourceFile()
}
