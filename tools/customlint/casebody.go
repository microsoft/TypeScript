package customlint

import (
	"fmt"
	"go/ast"
	"go/token"
	"slices"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var caseBodyAnalyzer = &analysis.Analyzer{
	Name: "casebody",
	Doc:  "finds empty switch/select cases, redundant break statements, and code after breaks",
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&caseBodyPass{pass: pass}).run()
	},
}

type caseBodyPass struct {
	pass *analysis.Pass
	file *ast.File
}

func (e *caseBodyPass) run() (any, error) {
	in := e.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)

	for c := range in.Root().Preorder(
		(*ast.File)(nil),
		(*ast.SwitchStmt)(nil),
		(*ast.TypeSwitchStmt)(nil),
		(*ast.SelectStmt)(nil),
	) {
		switch n := c.Node().(type) {
		case *ast.File:
			e.file = n
		case *ast.SwitchStmt:
			e.checkCases(n.Body)
		case *ast.TypeSwitchStmt:
			e.checkCases(n.Body)
		case *ast.SelectStmt:
			e.checkCases(n.Body)
		}
	}

	return nil, nil
}

func (e *caseBodyPass) checkCases(clause *ast.BlockStmt) {
	endOfBlock := clause.End()

	for i, stmt := range clause.List {
		nextCasePos := endOfBlock
		if next := i + 1; next < len(clause.List) {
			nextCasePos = clause.List[next].Pos()
		}
		e.checkCaseStatement(stmt, nextCasePos)
	}
}

func (e *caseBodyPass) checkCaseStatement(stmt ast.Stmt, nextCasePos token.Pos) {
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
		panic(fmt.Sprintf("unhandled statement type %T", stmt))
	}

	reportedUnreachable := false
	for i, statement := range body {
		branch, ok := statement.(*ast.BranchStmt)
		if !ok || branch.Tok != token.BREAK {
			continue
		}
		if branch.Label == nil {
			e.pass.Report(analysis.Diagnostic{
				Pos:     branch.Pos(),
				End:     branch.End(),
				Message: "this top-level break statement is redundant",
			})
		}
		if !reportedUnreachable && i+1 < len(body) {
			e.pass.Report(analysis.Diagnostic{
				Pos:     body[i+1].Pos(),
				End:     body[i+1].End(),
				Message: "this statement is unreachable after a break",
			})
			reportedUnreachable = true
		}
	}

	if len(body) == 1 {
		// Also error on a case statement containing a single empty block.
		if block, ok := body[0].(*ast.BlockStmt); ok {
			if len(block.List) != 0 {
				return
			}
		} else {
			return
		}
	} else if len(body) != 0 {
		return
	}

	afterColon := colon + 1
	if _, found := slices.BinarySearchFunc(e.file.Comments, posRange{afterColon, nextCasePos}, posRangeCmp); found {
		return
	}

	e.pass.Report(analysis.Diagnostic{
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
