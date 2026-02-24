package encoder_test

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/microsoft/typescript-go/internal/api/encoder"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/repo"
	"gotest.tools/v3/assert"
)

func parseSourceFile(code string) *ast.SourceFile {
	return parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/test.ts",
		Path:     "/test.ts",
	}, code, core.ScriptKindTS)
}

func TestDecodeSourceFile_Basic(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("let x = 1;")
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)
	assert.Equal(t, decoded.AsNode().Kind, ast.KindSourceFile)
	assert.Equal(t, decoded.FileName(), "/test.ts")
	assert.Equal(t, decoded.Text(), "let x = 1;")
	assert.Assert(t, decoded.Statements != nil)
	assert.Assert(t, decoded.EndOfFileToken != nil)
}

func TestDecodeSourceFile_Statements(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("let a = 1;\nlet b = 2;\nlet c = 3;")
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)
	assert.Equal(t, len(decoded.Statements.Nodes), 3)
	for i, stmt := range decoded.Statements.Nodes {
		assert.Equal(t, stmt.Kind, ast.KindVariableStatement, "statement %d", i)
	}
}

func TestDecodeSourceFile_VariableDeclaration(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("let x = 1;")
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)

	varStmt := decoded.Statements.Nodes[0].AsVariableStatement()
	assert.Assert(t, varStmt.DeclarationList != nil)
	declList := varStmt.DeclarationList.AsVariableDeclarationList()
	assert.Assert(t, declList.Declarations != nil)
	assert.Equal(t, len(declList.Declarations.Nodes), 1)

	decl := declList.Declarations.Nodes[0].AsVariableDeclaration()
	assert.Equal(t, decl.Name().Kind, ast.KindIdentifier)
	assert.Equal(t, decl.Name().AsIdentifier().Text, "x")
	assert.Assert(t, decl.Initializer != nil)
	assert.Equal(t, decl.Initializer.Kind, ast.KindNumericLiteral)
	assert.Equal(t, decl.Initializer.AsNumericLiteral().Text, "1")
}

func TestDecodeSourceFile_FunctionDeclaration(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("function add(a: number, b: number): number { return a + b; }")
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)

	funcDecl := decoded.Statements.Nodes[0].AsFunctionDeclaration()
	assert.Assert(t, funcDecl.Name() != nil)
	assert.Equal(t, funcDecl.Name().AsIdentifier().Text, "add")
	assert.Assert(t, funcDecl.Parameters != nil)
	assert.Equal(t, len(funcDecl.Parameters.Nodes), 2)
	assert.Assert(t, funcDecl.Type != nil)
	assert.Assert(t, funcDecl.Body != nil)

	param0 := funcDecl.Parameters.Nodes[0].AsParameterDeclaration()
	assert.Equal(t, param0.Name().AsIdentifier().Text, "a")
	assert.Assert(t, param0.Type != nil)
}

func TestDecodeSourceFile_ImportDeclaration(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile(`import { bar } from "bar";`)
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)

	imp := decoded.Statements.Nodes[0].AsImportDeclaration()
	assert.Assert(t, imp.ImportClause != nil)
	assert.Assert(t, imp.ModuleSpecifier != nil)
	assert.Equal(t, imp.ModuleSpecifier.AsStringLiteral().Text, "bar")

	clause := imp.ImportClause.AsImportClause()
	assert.Assert(t, clause.NamedBindings != nil)
	namedImports := clause.NamedBindings.AsNamedImports()
	assert.Assert(t, namedImports.Elements != nil)
	assert.Equal(t, len(namedImports.Elements.Nodes), 1)
	spec := namedImports.Elements.Nodes[0].AsImportSpecifier()
	assert.Equal(t, spec.Name().AsIdentifier().Text, "bar")
}

func TestDecodeSourceFile_IfStatement(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("if (true) { } else { }")
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)

	ifStmt := decoded.Statements.Nodes[0].AsIfStatement()
	assert.Assert(t, ifStmt.Expression != nil)
	assert.Assert(t, ifStmt.ThenStatement != nil)
	assert.Assert(t, ifStmt.ElseStatement != nil)
	assert.Equal(t, ifStmt.ThenStatement.Kind, ast.KindBlock)
	assert.Equal(t, ifStmt.ElseStatement.Kind, ast.KindBlock)
}

func TestDecodeSourceFile_TemplateExpression(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("let x = `hello ${name} world`;")
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)

	varDecl := decoded.Statements.Nodes[0].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0].AsVariableDeclaration()
	tmplExpr := varDecl.Initializer.AsTemplateExpression()
	assert.Assert(t, tmplExpr.Head != nil)
	assert.Equal(t, tmplExpr.Head.AsTemplateHead().Text, "hello ")
	assert.Assert(t, tmplExpr.TemplateSpans != nil)
	assert.Equal(t, len(tmplExpr.TemplateSpans.Nodes), 1)

	span := tmplExpr.TemplateSpans.Nodes[0].AsTemplateSpan()
	assert.Assert(t, span.Expression != nil)
	assert.Equal(t, span.Expression.Kind, ast.KindIdentifier)
	assert.Assert(t, span.Literal != nil)
	assert.Equal(t, span.Literal.AsTemplateTail().Text, " world")
}

func TestDecodeSourceFile_ExportModifier(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("export function foo() {}")
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)

	funcDecl := decoded.Statements.Nodes[0].AsFunctionDeclaration()
	assert.Assert(t, funcDecl.Modifiers() != nil)
	assert.Equal(t, len(funcDecl.Modifiers().Nodes), 1)
	assert.Equal(t, funcDecl.Modifiers().Nodes[0].Kind, ast.KindExportKeyword)
}

func TestDecodeSourceFile_Positions(t *testing.T) {
	t.Parallel()
	code := "let x = 1;"
	sf := parseSourceFile(code)
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)

	assert.Equal(t, decoded.AsNode().Pos(), 0)
	assert.Equal(t, decoded.AsNode().End(), len(code))
}

func TestDecodeSourceFile_ClassDeclaration(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("class Foo { bar(): void {} }")
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)

	classDecl := decoded.Statements.Nodes[0].AsClassDeclaration()
	assert.Assert(t, classDecl.Name() != nil)
	assert.Equal(t, classDecl.Name().AsIdentifier().Text, "Foo")
	assert.Assert(t, classDecl.Members != nil)
	assert.Equal(t, len(classDecl.Members.Nodes), 1)
	assert.Equal(t, classDecl.Members.Nodes[0].Kind, ast.KindMethodDeclaration)
}

func TestDecodeNodes_SubtreeRoundTrip(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("function greet(name: string) { return `Hello, ${name}!`; }")

	var funcNode *ast.Node
	visitor := &ast.NodeVisitor{}
	visitor.Visit = func(node *ast.Node) *ast.Node {
		if node.Kind == ast.KindFunctionDeclaration && funcNode == nil {
			funcNode = node
		}
		return node
	}
	visitor.VisitEachChild(sf.AsNode())
	assert.Assert(t, funcNode != nil)

	buf, err := encoder.EncodeNode(funcNode, sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeNodes(buf)
	assert.NilError(t, err)

	assert.Equal(t, decoded.Kind, ast.KindFunctionDeclaration)
	funcDecl := decoded.AsFunctionDeclaration()
	assert.Assert(t, funcDecl.Name() != nil)
	assert.Equal(t, funcDecl.Name().AsIdentifier().Text, "greet")
	assert.Assert(t, funcDecl.Parameters != nil)
	assert.Equal(t, len(funcDecl.Parameters.Nodes), 1)
	assert.Assert(t, funcDecl.Body != nil)
}

func TestDecodeSourceFile_BinaryExpression(t *testing.T) {
	t.Parallel()
	sf := parseSourceFile("let x = 1 + 2;")
	buf, err := encoder.EncodeSourceFile(sf)
	assert.NilError(t, err)

	decoded, err := encoder.DecodeSourceFile(buf)
	assert.NilError(t, err)

	decl := decoded.Statements.Nodes[0].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0].AsVariableDeclaration()
	binExpr := decl.Initializer.AsBinaryExpression()
	assert.Assert(t, binExpr.Left != nil)
	assert.Assert(t, binExpr.Right != nil)
	assert.Assert(t, binExpr.OperatorToken != nil)
	assert.Equal(t, binExpr.Left.Kind, ast.KindNumericLiteral)
	assert.Equal(t, binExpr.Right.Kind, ast.KindNumericLiteral)
}

func BenchmarkDecodeSourceFile(b *testing.B) {
	repo.SkipIfNoTypeScriptSubmodule(b)
	filePath := filepath.Join(repo.TypeScriptSubmodulePath(), "src/compiler/checker.ts")
	fileContent, err := os.ReadFile(filePath)
	assert.NilError(b, err)
	code := string(fileContent)
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/checker.ts",
		Path:     "/checker.ts",
	}, code, core.ScriptKindTS)

	buf, err := encoder.EncodeSourceFile(sourceFile)
	assert.NilError(b, err)

	b.Run("parse", func(b *testing.B) {
		for b.Loop() {
			parser.ParseSourceFile(ast.SourceFileParseOptions{
				FileName: "/checker.ts",
				Path:     "/checker.ts",
			}, code, core.ScriptKindTS)
		}
	})

	b.Run("decode", func(b *testing.B) {
		for b.Loop() {
			_, decodeErr := encoder.DecodeSourceFile(buf)
			assert.NilError(b, decodeErr)
		}
	})
}
