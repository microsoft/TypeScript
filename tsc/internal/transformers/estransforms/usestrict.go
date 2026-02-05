package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/transformers"
)

func NewUseStrictTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &useStrictTransformer{
		compilerOptions:           opts.CompilerOptions,
		getEmitModuleFormatOfFile: opts.GetEmitModuleFormatOfFile,
	}
	return tx.NewTransformer(tx.visit, opts.Context)
}

type useStrictTransformer struct {
	transformers.Transformer
	compilerOptions           *core.CompilerOptions
	getEmitModuleFormatOfFile func(file ast.HasFileName) core.ModuleKind
}

func (tx *useStrictTransformer) visit(node *ast.Node) *ast.Node {
	if node.Kind != ast.KindSourceFile {
		return node
	}
	return tx.visitSourceFile(node.AsSourceFile())
}

func (tx *useStrictTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	if node.ScriptKind == core.ScriptKindJSON {
		return node.AsNode()
	}

	if tx.compilerOptions.GetEmitModuleKind() == core.ModuleKindPreserve {
		return node.AsNode()
	}

	isExternalModule := ast.IsExternalModule(node)
	format := tx.getEmitModuleFormatOfFile(node)

	if isExternalModule && format >= core.ModuleKindES2015 {
		return node.AsNode()
	}

	if isExternalModule ||
		tx.compilerOptions.AlwaysStrict.IsTrueOrUnknown() {
		statements := tx.Factory().EnsureUseStrict(node.Statements.Nodes)
		statementList := tx.Factory().NewNodeList(statements)
		statementList.Loc = node.Statements.Loc
		return tx.Factory().UpdateSourceFile(node, statementList, node.EndOfFileToken).AsSourceFile().AsNode()
	}

	return node.AsNode()
}
