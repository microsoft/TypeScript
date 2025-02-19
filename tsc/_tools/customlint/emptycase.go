package customlint

import (
	"go/ast"
	"go/token"
	"slices"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var emptyCaseAnalyzer = &analysis.Analyzer{
	Name: "emptycase",
	Doc:  "finds empty switch/select cases",
	Run:  runEmptyCase,
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
}

func runEmptyCase(pass *analysis.Pass) (interface{}, error) {
	inspect := pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)

	nodeFilter := []ast.Node{
		(*ast.File)(nil),
		(*ast.SwitchStmt)(nil),
		(*ast.SelectStmt)(nil),
	}

	// The inspect package doesn't tell us up front which file is being used,
	// so keep track of it as part of the traversal. The file is the first node
	// so will be set before any other nodes are visited.
	var file *ast.File

	inspect.Preorder(nodeFilter, func(n ast.Node) {
		switch n := n.(type) {
		case *ast.File:
			file = n
		case *ast.SwitchStmt:
			checkCases(pass, file, n.Body)
		case *ast.SelectStmt:
			checkCases(pass, file, n.Body)
		}
	})

	return nil, nil
}

func checkCases(pass *analysis.Pass, file *ast.File, clause *ast.BlockStmt) {
	endOfBlock := clause.End()

	for i, stmt := range clause.List {
		nextCasePos := endOfBlock
		if next := i + 1; next < len(clause.List) {
			nextCasePos = clause.List[next].Pos()
		}
		checkCaseStatement(pass, file, stmt, nextCasePos)
	}
}

func checkCaseStatement(pass *analysis.Pass, file *ast.File, stmt ast.Stmt, nextCasePos token.Pos) {
	var body []ast.Stmt
	var colon token.Pos

	switch stmt := stmt.(type) {
	case *ast.CaseClause:
		body = stmt.Body
		colon = stmt.Colon
	case *ast.CommClause:
		body = stmt.Body
		colon = stmt.Colon
	default:
		return
	}

	if len(body) == 1 {
		// Also error on a case statement containing a single empty block.
		block, ok := body[0].(*ast.BlockStmt)
		if !ok || len(block.List) != 0 {
			return
		}
	} else if len(body) != 0 {
		return
	}

	afterColon := colon + 1
	if _, found := slices.BinarySearchFunc(file.Comments, posRange{afterColon, nextCasePos}, posRangeCmp); found {
		return
	}

	pass.Report(analysis.Diagnostic{
		Pos:     stmt.Pos(),
		End:     afterColon,
		Message: "this case block is empty and will do nothing",
	})
}

type posRange struct {
	start, end token.Pos
}

func posRangeCmp(c *ast.CommentGroup, target posRange) int {
	if c.End() < target.start {
		return -1
	}
	if c.Pos() >= target.end {
		return 1
	}
	return 0
}
