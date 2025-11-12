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
	Count() int
	GetChecker(ctx context.Context) (*checker.Checker, func())
	GetCheckerForFile(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func())
	GetCheckerForFileExclusive(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func())
	ForEachCheckerParallel(ctx context.Context, cb func(idx int, c *checker.Checker))
	Files(checker *checker.Checker) iter.Seq[*ast.SourceFile]
}

type checkerPool struct {
	checkerCount int
	program      *Program

	createCheckersOnce sync.Once
	checkers           []*checker.Checker
	locks              []sync.Mutex
	fileAssociations   map[*ast.SourceFile]*checker.Checker
}

var _ CheckerPool = (*checkerPool)(nil)

func newCheckerPool(checkerCount int, program *Program) *checkerPool {
	pool := &checkerPool{
		program:      program,
		checkerCount: checkerCount,
		checkers:     make([]*checker.Checker, checkerCount),
		locks:        make([]sync.Mutex, checkerCount),
	}

	return pool
}

func (p *checkerPool) Count() int {
	return p.checkerCount
}

func (p *checkerPool) GetCheckerForFile(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	p.createCheckers()
	checker := p.fileAssociations[file]
	return checker, noop
}

func (p *checkerPool) GetCheckerForFileExclusive(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	c, done := p.GetCheckerForFile(ctx, file)
	idx := slices.Index(p.checkers, c)
	p.locks[idx].Lock()
	return c, sync.OnceFunc(func() {
		p.locks[idx].Unlock()
		done()
	})
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

// Runs `cb` for each checker in the pool concurrently, locking and unlocking checker mutexes as it goes,
// making it safe to call `ForEachCheckerParallel` from many threads simultaneously.
func (p *checkerPool) ForEachCheckerParallel(ctx context.Context, cb func(idx int, c *checker.Checker)) {
	p.createCheckers()
	wg := core.NewWorkGroup(p.program.SingleThreaded())
	for idx, checker := range p.checkers {
		wg.Queue(func() {
			p.locks[idx].Lock()
			defer p.locks[idx].Unlock()
			cb(idx, checker)
		})
	}
	wg.RunAndWait()
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
