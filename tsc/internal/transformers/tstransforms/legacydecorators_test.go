package tstransforms_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/testutil/emittestutil"
	"github.com/microsoft/typescript-go/internal/testutil/parsetestutil"
	"github.com/microsoft/typescript-go/internal/transformers"
	"github.com/microsoft/typescript-go/internal/transformers/tstransforms"
)

const decorateHelper = `var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};`

func TestLegacyDecorators_SyntheticComments(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		input    string
		leading  []printer.SynthesizedComment
		trailing []printer.SynthesizedComment
		expected string
	}{
		{
			name:  "leading comment on decorated class",
			input: "@decorate()\nclass Foo {}",
			leading: []printer.SynthesizedComment{
				{Kind: ast.KindMultiLineCommentTrivia, Text: "leading", Loc: core.NewTextRange(-1, -1)},
			},
			expected: decorateHelper + "\n/*leading*/ let Foo = class Foo {\n};\nFoo = __decorate([\n    decorate()\n], Foo);",
		},
		{
			name:  "trailing comment on decorated class",
			input: "@decorate()\nclass Foo {}",
			trailing: []printer.SynthesizedComment{
				{Kind: ast.KindSingleLineCommentTrivia, Text: " trailing", Loc: core.NewTextRange(-1, -1), HasTrailingNewLine: true},
			},
			expected: decorateHelper + "\nlet Foo = class Foo {\n}; // trailing\nFoo = __decorate([\n    decorate()\n], Foo);",
		},
		{
			name:  "leading and trailing comments",
			input: "@decorate()\nclass Foo {}",
			leading: []printer.SynthesizedComment{
				{Kind: ast.KindMultiLineCommentTrivia, Text: "leading", Loc: core.NewTextRange(-1, -1)},
			},
			trailing: []printer.SynthesizedComment{
				{Kind: ast.KindSingleLineCommentTrivia, Text: " trailing", Loc: core.NewTextRange(-1, -1), HasTrailingNewLine: true},
			},
			expected: decorateHelper + "\n/*leading*/ let Foo = class Foo {\n}; // trailing\nFoo = __decorate([\n    decorate()\n], Foo);",
		},
		{
			name:  "exported class comments",
			input: "@decorate()\nexport class Foo {}",
			leading: []printer.SynthesizedComment{
				{Kind: ast.KindMultiLineCommentTrivia, Text: "exported", Loc: core.NewTextRange(-1, -1)},
			},
			expected: decorateHelper + "\n/*exported*/ let Foo = class Foo {\n};\nFoo = __decorate([\n    decorate()\n], Foo);\nexport { Foo };",
		},
		{
			name:  "class with static property in script",
			input: "@decorate()\nclass Foo { static instance = new Foo(); }",
			leading: []printer.SynthesizedComment{
				{Kind: ast.KindMultiLineCommentTrivia, Text: "static-prop", Loc: core.NewTextRange(-1, -1)},
			},
			expected: decorateHelper + "\n/*static-prop*/ let Foo = class Foo {\n    static instance = new Foo();\n};\nFoo = __decorate([\n    decorate()\n], Foo);",
		},
		{
			name:  "class with self-reference alias in module",
			input: "@decorate()\nexport class Foo { static instance = new Foo(); }",
			leading: []printer.SynthesizedComment{
				{Kind: ast.KindMultiLineCommentTrivia, Text: "aliased", Loc: core.NewTextRange(-1, -1)},
			},
			expected: decorateHelper + "\nvar Foo_1;\n/*aliased*/ let Foo = class Foo {\n    static { Foo_1 = this; }\n    static instance = new Foo_1();\n};\nFoo = Foo_1 = __decorate([\n    decorate()\n], Foo);\nexport { Foo };",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(tc.input, false)
			parsetestutil.CheckDiagnostics(t, file)
			binder.BindSourceFile(file)

			emitContext := printer.NewEmitContext()
			classDecl := file.Statements.Nodes[0]
			if tc.leading != nil {
				emitContext.SetSyntheticLeadingComments(classDecl, tc.leading)
			}
			if tc.trailing != nil {
				emitContext.SetSyntheticTrailingComments(classDecl, tc.trailing)
			}

			compilerOptions := &core.CompilerOptions{
				ExperimentalDecorators: core.TSTrue,
				Target:                 core.ScriptTargetESNext,
			}
			opts := &transformers.TransformOptions{
				CompilerOptions: compilerOptions,
				Context:         emitContext,
				Resolver:        binder.NewReferenceResolver(compilerOptions, binder.ReferenceResolverHooks{}),
			}

			transformed := tstransforms.NewLegacyDecoratorsTransformer(opts).TransformSourceFile(file)
			emittestutil.CheckEmit(t, emitContext, transformed, tc.expected)
		})
	}
}
