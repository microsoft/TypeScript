package printer_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/emittestutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/parsetestutil"
)

// Parsed-source cases. The printer keeps the parentheses that were present in
// the source, so these mostly check for regressions.
func TestNewCalleeParsed(t *testing.T) {
	t.Parallel()
	data := []struct {
		title  string
		input  string
		output string
	}{
		{title: "OptionalCallHead", input: `new (C?.().D)();`, output: `new (C?.().D)();`},
		{title: "CallHead", input: `new (C().D)();`, output: `new (C().D)();`},
		{title: "OptionalMemberHead", input: `new (C?.D.E)();`, output: `new (C?.D.E)();`},
		{title: "PlainChainKeepsSourceParens", input: `new (C.D)();`, output: `new (C.D)();`},
		{title: "OptionalCallCallee", input: `new (C?.())();`, output: `new (C?.())();`},
	}
	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(rec.input, false)
			parsetestutil.CheckDiagnostics(t, file)
			emittestutil.CheckEmit(t, nil, file, rec.output)
		})
	}
}

// Synthetic-AST cases (as produced by transforms), from
// https://github.com/microsoft/TypeScript/issues/65148
func TestNewCalleeSynthetic(t *testing.T) {
	t.Parallel()
	var factory ast.NodeFactory

	newStatement := func(callee *ast.Expression) *ast.SourceFile {
		file := factory.NewSourceFile(ast.SourceFileParseOptions{FileName: "/file.ts", PathKey: "/file.ts"}, "",
			factory.NewNodeList([]*ast.Node{
				factory.NewExpressionStatement(factory.NewNewExpression(callee, nil, factory.NewNodeList([]*ast.Node{}))),
			}), factory.NewToken(ast.KindEndOfFile))
		parsetestutil.MarkSyntheticRecursive(file)
		return file.AsSourceFile()
	}

	optionalCall := func() *ast.Expression {
		return factory.NewCallExpression(
			factory.NewIdentifier("C"),
			factory.NewToken(ast.KindQuestionDotToken),
			nil,
			factory.NewNodeList([]*ast.Node{}),
			ast.NodeFlagsOptionalChain,
		)
	}

	t.Run("OptionalCallHeadUnflagged", func(t *testing.T) {
		t.Parallel()
		// Intended: `new (C?.().D)();`. Without flag propagation the head call is
		// parenthesized by ordinary precedence, so the whole chain must get outer
		// parens to remain valid (an optional chain in the callee of `new` is a
		// SyntaxError).
		memberChain := factory.NewPropertyAccessExpression(optionalCall(), nil, factory.NewIdentifier("D"), ast.NodeFlagsNone)
		emittestutil.CheckEmit(t, nil, newStatement(memberChain), "new ((C?.()).D)();")
	})

	t.Run("OptionalMemberHeadUnflagged", func(t *testing.T) {
		t.Parallel()
		// Same as above, but the chain starts at an optional property access.
		optProp := factory.NewPropertyAccessExpression(factory.NewIdentifier("C"), factory.NewToken(ast.KindQuestionDotToken), factory.NewIdentifier("D"), ast.NodeFlagsOptionalChain)
		memberChain := factory.NewPropertyAccessExpression(optProp, nil, factory.NewIdentifier("E"), ast.NodeFlagsNone)
		emittestutil.CheckEmit(t, nil, newStatement(memberChain), "new ((C?.D).E)();")
	})

	t.Run("OptionalCallHeadFlagged", func(t *testing.T) {
		t.Parallel()
		// With the flag set on the chain (as the parser does), precedence already
		// produces the minimal form.
		memberChain := factory.NewPropertyAccessExpression(optionalCall(), nil, factory.NewIdentifier("D"), ast.NodeFlagsOptionalChain)
		emittestutil.CheckEmit(t, nil, newStatement(memberChain), "new (C?.().D)();")
	})

	t.Run("CallHead", func(t *testing.T) {
		t.Parallel()
		// Intended: `new (C().D)()`, not `new C().D()` (which parses as `(new C()).D()`).
		call := factory.NewCallExpression(factory.NewIdentifier("C"), nil, nil, factory.NewNodeList([]*ast.Node{}), ast.NodeFlagsNone)
		memberChain := factory.NewPropertyAccessExpression(call, nil, factory.NewIdentifier("D"), ast.NodeFlagsNone)
		emittestutil.CheckEmit(t, nil, newStatement(memberChain), "new (C().D)();")
	})

	t.Run("CallHeadElementAccess", func(t *testing.T) {
		t.Parallel()
		call := factory.NewCallExpression(factory.NewIdentifier("C"), nil, nil, factory.NewNodeList([]*ast.Node{}), ast.NodeFlagsNone)
		memberChain := factory.NewElementAccessExpression(call, nil, factory.NewIdentifier("b"), ast.NodeFlagsNone)
		emittestutil.CheckEmit(t, nil, newStatement(memberChain), "new (C()[b])();")
	})

	t.Run("PlainChain", func(t *testing.T) {
		t.Parallel()
		memberChain := factory.NewPropertyAccessExpression(factory.NewIdentifier("C"), nil, factory.NewIdentifier("D"), ast.NodeFlagsNone)
		emittestutil.CheckEmit(t, nil, newStatement(memberChain), "new C.D();")
	})

	t.Run("DirectOptionalCall", func(t *testing.T) {
		t.Parallel()
		emittestutil.CheckEmit(t, nil, newStatement(optionalCall()), "new (C?.())();")
	})
}
