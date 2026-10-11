package tstransforms_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/emittestutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/parsetestutil"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
	"github.com/microsoft/TypeScript/tsc/internal/transformers/estransforms"
	"github.com/microsoft/TypeScript/tsc/internal/transformers/tstransforms"
)

const decorateHelper = `var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
`

// Synthetic comments attached to a declaration are copied by SetOriginal to every node created from
// it, so each transform must keep them on exactly one of the emitted nodes.
//
// For an enum or namespace, both comments belong on the `var` statement, as in TypeScript 6. The
// trailing one is currently missing there because EFNoTrailingComments on that statement also
// suppresses synthetic comments (#64453).
func TestSyntheticCommentsAreEmittedOnce(t *testing.T) {
	t.Parallel()
	data := []struct {
		title  string
		input  string
		output string
		newTx  func(opts *transformers.TransformOptions) *transformers.Transformer
		// The node to attach the comments to; defaults to the last statement.
		declaration func(file *ast.SourceFile) *ast.Node
		// Defaults to ESNext.
		target core.ScriptTarget
	}{
		{
			title:  "EnumDeclaration",
			input:  "enum E { A }",
			output: "/*leading*/ var E;\n(function (E) {\n    E[E[\"A\"] = 0] = \"A\";\n})(E || (E = {}));",
			newTx:  tstransforms.NewRuntimeSyntaxTransformer,
		},
		{
			title:  "DecoratedClass",
			input:  "declare function dec(c: any): any;\n@dec class C {}",
			output: decorateHelper + "/*leading*/ let C = class C {\n}; /*trailing*/\nC = __decorate([\n    dec\n], C);",
			newTx:  tstransforms.NewLegacyDecoratorsTransformer,
		},
		{
			title:       "StaticPropertyDeclaration",
			input:       "class C { static x = 1; }",
			output:      "class C {\n    /*leading*/ static { this.x = 1; } /*trailing*/\n}",
			newTx:       estransforms.GetESTransformer,
			declaration: func(file *ast.SourceFile) *ast.Node { return file.Statements.Nodes[0].Members()[0] },
			target:      core.ScriptTargetES2022,
		},
		{
			title:  "ModuleDeclaration",
			input:  "namespace N { export const x = 1; }",
			output: "/*leading*/ var N;\n(function (N) {\n    N.x = 1;\n})(N || (N = {}));",
			newTx:  tstransforms.NewRuntimeSyntaxTransformer,
		},
	}

	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(rec.input, false /*jsx*/)
			parsetestutil.CheckDiagnostics(t, file)
			target := rec.target
			if target == core.ScriptTargetNone {
				target = core.ScriptTargetESNext
			}
			compilerOptions := &core.CompilerOptions{ExperimentalDecorators: core.TSTrue, Target: target, UseDefineForClassFields: core.TSFalse}
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
			if rec.declaration != nil {
				declaration = rec.declaration(file)
			}
			emitContext.AddSyntheticLeadingComment(declaration, ast.KindMultiLineCommentTrivia, "leading", false /*hasTrailingNewLine*/)
			emitContext.AddSyntheticTrailingComment(declaration, ast.KindMultiLineCommentTrivia, "trailing", false /*hasTrailingNewLine*/)
			opts := &transformers.TransformOptions{CompilerOptions: compilerOptions, Context: emitContext, EmitResolver: emitResolver, Resolver: emitResolver}
			file = tstransforms.NewTypeEraserTransformer(opts).TransformSourceFile(file)
			file = rec.newTx(opts).TransformSourceFile(file)
			emittestutil.CheckEmit(t, emitContext, file, rec.output)
		})
	}
}
