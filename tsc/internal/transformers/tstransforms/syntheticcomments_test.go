package tstransforms_test

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/emittestutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/parsetestutil"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
	"github.com/microsoft/TypeScript/tsc/internal/transformers/tstransforms"
	"gotest.tools/v3/assert"
)

// SetOriginal copies the synthetic comments of a declaration to every node a transform creates from
// it, so each transform must keep them on exactly one of the emitted nodes.
//
// For an enum or namespace, both comments belong on the `var` statement, as in TypeScript 6. The
// trailing one is currently missing there because EFNoTrailingComments on that statement also
// suppresses synthetic comments (#64453).
func TestSyntheticCommentsAreEmittedOnce(t *testing.T) {
	t.Parallel()
	data := []struct {
		title         string
		input         string
		newTx         func(opts *transformers.TransformOptions) *transformers.Transformer
		trailingCount int
	}{
		{title: "EnumDeclaration", input: "enum E { A }", newTx: tstransforms.NewRuntimeSyntaxTransformer, trailingCount: 0},
		{title: "ModuleDeclaration", input: "namespace N { export const x = 1; }", newTx: tstransforms.NewRuntimeSyntaxTransformer, trailingCount: 0},
		{title: "DecoratedClass", input: "declare function dec(c: any): any;\n@dec class C {}", newTx: tstransforms.NewLegacyDecoratorsTransformer, trailingCount: 1},
	}

	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(rec.input, false /*jsx*/)
			parsetestutil.CheckDiagnostics(t, file)
			compilerOptions := &core.CompilerOptions{ExperimentalDecorators: core.TSTrue, Target: core.ScriptTargetESNext}
			esnext := func(ast.HasFileName) core.ModuleKind { return core.ModuleKindESNext }
			c, _ := checker.NewChecker(&fakeProgram{
				singleThreaded:              true,
				compilerOptions:             compilerOptions,
				files:                       []*ast.SourceFile{file},
				getEmitModuleFormatOfFile:   esnext,
				getImpliedNodeFormatForEmit: esnext,
			}, nil)
			emitContext := printer.NewEmitContext()
			emitResolver := c.NewEmitResolver(emitContext)
			declaration := file.Statements.Nodes[len(file.Statements.Nodes)-1]
			emitContext.AddSyntheticLeadingComment(declaration, ast.KindMultiLineCommentTrivia, "leading", false /*hasTrailingNewLine*/)
			emitContext.AddSyntheticTrailingComment(declaration, ast.KindMultiLineCommentTrivia, "trailing", false /*hasTrailingNewLine*/)
			opts := &transformers.TransformOptions{CompilerOptions: compilerOptions, Context: emitContext, EmitResolver: emitResolver, Resolver: emitResolver}
			file = tstransforms.NewTypeEraserTransformer(opts).TransformSourceFile(file)
			file = rec.newTx(opts).TransformSourceFile(file)
			output := emittestutil.Emit(t, emitContext, file)
			assert.Equal(t, strings.Count(output, "/*leading*/"), 1, output)
			assert.Equal(t, strings.Count(output, "/*trailing*/"), rec.trailingCount, output)
		})
	}
}
