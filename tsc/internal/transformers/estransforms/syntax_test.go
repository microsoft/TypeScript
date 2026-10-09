package estransforms

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/parsetestutil"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
)

const localSyntaxFacts = ast.SubtreeContainsLogicalAssignments |
	ast.SubtreeContainsNullishCoalescing |
	ast.SubtreeContainsOptionalChaining |
	ast.SubtreeContainsMissingCatchClauseVariable |
	ast.SubtreeContainsExponentiationOperator

func TestSyntaxTransformTargets(t *testing.T) {
	t.Parallel()
	for _, target := range []struct {
		target    core.ScriptTarget
		preserved ast.SubtreeFacts
	}{
		{core.ScriptTargetES2015, 0},
		{core.ScriptTargetES2016, ast.SubtreeContainsExponentiationOperator},
		{core.ScriptTargetES2018, ast.SubtreeContainsExponentiationOperator},
		{core.ScriptTargetES2019, ast.SubtreeContainsExponentiationOperator | ast.SubtreeContainsMissingCatchClauseVariable},
		{core.ScriptTargetES2020, localSyntaxFacts &^ ast.SubtreeContainsLogicalAssignments},
		{core.ScriptTargetES2021, localSyntaxFacts},
		{core.ScriptTargetESNext, localSyntaxFacts},
	} {
		t.Run(target.target.String(), func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(`obj.x ??= obj?.y ?? 2 ** 3; try {} catch {}`, false)
			parsetestutil.CheckDiagnostics(t, file)
			tx := newSyntaxTransformer(&transformers.TransformOptions{
				Context:         printer.NewEmitContext(),
				CompilerOptions: &core.CompilerOptions{Target: target.target},
			})
			if tx != nil {
				file = tx.TransformSourceFile(file)
			}
			if actual := file.SubtreeFacts() & localSyntaxFacts; actual != target.preserved {
				t.Errorf("preserved syntax: got %v, want %v", actual, target.preserved)
			}
		})
	}
}

func TestSyntaxTransformsSingleTraversal(t *testing.T) {
	t.Parallel()
	file := parsetestutil.ParseTypeScript(`
		function f() {
			first().value ??= second()?.method(third() ?? fourth() ** 2);
			try { fifth().value **= sixth()?.value ?? 1; } catch {}
		}
	`, false)
	parsetestutil.CheckDiagnostics(t, file)
	tx := newSyntaxTransformer(&transformers.TransformOptions{
		Context:         printer.NewEmitContext(),
		CompilerOptions: &core.CompilerOptions{Target: core.ScriptTargetES2015},
	})
	visit := tx.Visitor().Visit
	visits := make(map[*ast.Node]int)
	tx.Visitor().Visit = func(node *ast.Node) *ast.Node {
		visits[node]++
		return visit(node)
	}
	transformed := tx.TransformSourceFile(file)
	for node, count := range visits {
		if count != 1 {
			t.Errorf("%v at %v visited %d times", node.Kind, node.Loc, count)
		}
	}
	var check func(*ast.Node) bool
	check = func(node *ast.Node) bool {
		switch node.Kind {
		case ast.KindSourceFile, ast.KindFunctionDeclaration, ast.KindBlock, ast.KindBinaryExpression, ast.KindCatchClause:
			if count := visits[node]; count != 1 {
				t.Errorf("%v at %v visited %d times", node.Kind, node.Loc, count)
			}
		}
		return node.ForEachChild(check)
	}
	check(file.AsNode())
	if remaining := transformed.SubtreeFacts() & localSyntaxFacts; remaining != 0 {
		t.Errorf("unlowered syntax: %v", remaining)
	}
}

func BenchmarkSyntaxTransforms(b *testing.B) {
	for _, source := range []struct {
		name string
		text string
	}{
		{"unchanged", `function f(value) { return value + 1; }`},
		{"mixed", `function f(value) {
			value.x ??= value.y?.() ?? 1;
			try { return value.x || (value.y &&= value.x); } catch {}
		}`},
	} {
		b.Run(source.name, func(b *testing.B) {
			file := parsetestutil.ParseTypeScript(strings.Repeat(source.text+"\n", 1000), false)
			file.SubtreeFacts()
			options := &core.CompilerOptions{Target: core.ScriptTargetES2018}
			b.ReportAllocs()
			b.ResetTimer()
			for b.Loop() {
				context, release := printer.GetEmitContext()
				transformer := GetESTransformer(&transformers.TransformOptions{
					Context:         context,
					CompilerOptions: options,
				})
				transformer.TransformSourceFile(file)
				release()
			}
		})
	}
}
