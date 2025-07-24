package compiler

import (
	"context"
	"iter"
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
)

type CheckerPool interface {
	GetChecker(ctx context.Context) (*checker.Checker, func())
	GetCheckerForFile(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func())
	GetAllCheckers(ctx context.Context) ([]*checker.Checker, func())
	Files(checker *checker.Checker) iter.Seq[*ast.SourceFile]
}

type checkerPool struct {
	checkerCount int
	program      *Program

	createCheckersOnce sync.Once
	checkers           []*checker.Checker
	fileAssociations   map[*ast.SourceFile]*checker.Checker
}

var _ CheckerPool = (*checkerPool)(nil)

func newCheckerPool(checkerCount int, program *Program) *checkerPool {
	pool := &checkerPool{
		program:      program,
		checkerCount: checkerCount,
		checkers:     make([]*checker.Checker, checkerCount),
	}

	return pool
}

func (p *checkerPool) GetCheckerForFile(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	p.createCheckers()
	checker := p.fileAssociations[file]
	return checker, noop
}

func (p *checkerPool) GetChecker(ctx context.Context) (*checker.Checker, func()) {
	p.createCheckers()
	checker := p.checkers[0]
	return checker, noop
}

func (p *checkerPool) createCheckers() {
	p.createCheckersOnce.Do(func() {
		wg := core.NewWorkGroup(p.program.SingleThreaded())
		for i := range p.checkerCount {
			wg.Queue(func() {
				p.checkers[i] = checker.NewChecker(p.program)
			})
		}

		wg.RunAndWait()

		p.fileAssociations = make(map[*ast.SourceFile]*checker.Checker, len(p.program.files))
		for i, file := range p.program.files {
			p.fileAssociations[file] = p.checkers[i%p.checkerCount]
		}
	})
}

func (p *checkerPool) GetAllCheckers(ctx context.Context) ([]*checker.Checker, func()) {
	p.createCheckers()
	return p.checkers, noop
}

func (p *checkerPool) Files(checker *checker.Checker) iter.Seq[*ast.SourceFile] {
	checkerIndex := slices.Index(p.checkers, checker)
	return func(yield func(*ast.SourceFile) bool) {
		for i, file := range p.program.files {
			if i%p.checkerCount == checkerIndex {
				if !yield(file) {
					return
				}
			}
		}
	}
}

func noop() {}
