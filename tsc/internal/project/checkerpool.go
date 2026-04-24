package project

import (
	"context"
	"fmt"
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
)

type CheckerPool struct {
	maxCheckers int
	program     *compiler.Program

	mu                     sync.Mutex
	cond                   *sync.Cond
	createCheckersOnce     sync.Once
	checkers               []*checker.Checker
	inUse                  map[*checker.Checker]bool
	fileAssociations       map[*ast.SourceFile]int
	requestAssociations    map[string]int
	log                    func(msg string)
	globalDiagAccumulated  []*ast.Diagnostic
	globalDiagChanged      bool
	globalDiagCheckerCount []int // per-checker count of globals last seen
}

var _ compiler.CheckerPool = (*CheckerPool)(nil)

func newCheckerPool(maxCheckers int, program *compiler.Program, log func(msg string)) *CheckerPool {
	pool := &CheckerPool{
		program:                program,
		maxCheckers:            maxCheckers,
		checkers:               make([]*checker.Checker, maxCheckers),
		inUse:                  make(map[*checker.Checker]bool),
		requestAssociations:    make(map[string]int),
		log:                    log,
		globalDiagCheckerCount: make([]int, maxCheckers),
	}

	if pool.log == nil {
		pool.log = func(msg string) {}
	}
	pool.cond = sync.NewCond(&pool.mu)
	return pool
}

func (p *CheckerPool) GetChecker(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	p.mu.Lock()
	defer p.mu.Unlock()

	requestID := core.GetRequestID(ctx)
	if requestID != "" {
		if checker, release := p.getRequestCheckerLocked(requestID); checker != nil {
			return checker, release
		}
	}

	if file != nil {
		if p.fileAssociations == nil {
			p.fileAssociations = make(map[*ast.SourceFile]int)
		}

		if index, ok := p.fileAssociations[file]; ok {
			checker := p.checkers[index]
			if checker != nil {
				if inUse := p.inUse[checker]; !inUse {
					p.inUse[checker] = true
					if requestID != "" {
						p.requestAssociations[requestID] = index
					}
					return checker, p.createRelease(requestID, index, checker)
				}
			}
		}
	}

	checker, index := p.getCheckerLocked(requestID)
	if file != nil {
		if p.fileAssociations == nil {
			p.fileAssociations = make(map[*ast.SourceFile]int)
		}
		p.fileAssociations[file] = index
	}
	return checker, p.createRelease(requestID, index, checker)
}

func (p *CheckerPool) getCheckerLocked(requestID string) (*checker.Checker, int) {
	if checker, index := p.getImmediatelyAvailableChecker(); checker != nil {
		p.inUse[checker] = true
		if requestID != "" {
			p.requestAssociations[requestID] = index
		}
		return checker, index
	}

	if !p.isFullLocked() {
		checker, index := p.createCheckerLocked()
		p.inUse[checker] = true
		if requestID != "" {
			p.requestAssociations[requestID] = index
		}
		return checker, index
	}

	checker, index := p.waitForAvailableChecker()
	p.inUse[checker] = true
	if requestID != "" {
		p.requestAssociations[requestID] = index
	}
	return checker, index
}

func (p *CheckerPool) getRequestCheckerLocked(requestID string) (*checker.Checker, func()) {
	if index, ok := p.requestAssociations[requestID]; ok {
		checker := p.checkers[index]
		if checker != nil {
			if inUse := p.inUse[checker]; !inUse {
				p.inUse[checker] = true
				return checker, p.createRelease(requestID, index, checker)
			}
			// Checker is in use, but by the same request - assume it's the
			// same goroutine or is managing its own synchronization
			return checker, noop
		}
	}
	return nil, noop
}

func (p *CheckerPool) getImmediatelyAvailableChecker() (*checker.Checker, int) {
	for i, checker := range p.checkers {
		if checker == nil {
			continue
		}
		if inUse := p.inUse[checker]; !inUse {
			return checker, i
		}
	}

	return nil, -1
}

func (p *CheckerPool) waitForAvailableChecker() (*checker.Checker, int) {
	p.log("checkerpool: Waiting for an available checker")
	for {
		p.cond.Wait()
		checker, index := p.getImmediatelyAvailableChecker()
		if checker != nil {
			return checker, index
		}
	}
}

func (p *CheckerPool) createRelease(requestId string, index int, checker *checker.Checker) func() {
	return func() {
		p.mu.Lock()
		defer p.mu.Unlock()

		delete(p.requestAssociations, requestId)
		if checker.WasCanceled() {
			// Canceled checkers must be disposed
			p.log(fmt.Sprintf("checkerpool: Checker for request %s was canceled, disposing it", requestId))
			p.checkers[index] = nil
			delete(p.inUse, checker)
			p.globalDiagCheckerCount[index] = 0
		} else {
			p.mergeGlobalDiagnosticsFromCheckerLocked(index, checker)
			p.inUse[checker] = false
		}
		p.cond.Signal()
	}
}

// mergeGlobalDiagnosticsFromCheckerLocked checks if the given checker has produced new global
// diagnostics since the last time we looked, and if so merges them into the accumulated set.
// Must be called with p.mu held.
func (p *CheckerPool) mergeGlobalDiagnosticsFromCheckerLocked(index int, c *checker.Checker) {
	globals := c.GetGlobalDiagnostics()
	if len(globals) == p.globalDiagCheckerCount[index] {
		return
	}
	p.globalDiagCheckerCount[index] = len(globals)
	before := len(p.globalDiagAccumulated)
	p.globalDiagAccumulated = compiler.SortAndDeduplicateDiagnostics(append(p.globalDiagAccumulated, globals...))
	if len(p.globalDiagAccumulated) != before {
		p.globalDiagChanged = true
	}
}

// GetGlobalDiagnostics returns the accumulated global diagnostics collected from
// all checkers that have been used so far in this pool's lifetime.
func (p *CheckerPool) GetGlobalDiagnostics() []*ast.Diagnostic {
	p.mu.Lock()
	defer p.mu.Unlock()
	return slices.Clone(p.globalDiagAccumulated)
}

// TakeNewGlobalDiagnostics reports whether new global diagnostics have been
// accumulated since the last call, and resets the flag.
func (p *CheckerPool) TakeNewGlobalDiagnostics() bool {
	p.mu.Lock()
	defer p.mu.Unlock()
	changed := p.globalDiagChanged
	p.globalDiagChanged = false
	return changed
}

func (p *CheckerPool) isFullLocked() bool {
	for _, checker := range p.checkers {
		if checker == nil {
			return false
		}
	}
	return true
}

func (p *CheckerPool) createCheckerLocked() (*checker.Checker, int) {
	for i, existing := range p.checkers {
		if existing == nil {
			checker, _ := checker.NewChecker(p.program)
			p.checkers[i] = checker
			return checker, i
		}
	}
	panic("called createCheckerLocked when pool is full")
}

func noop() {}
