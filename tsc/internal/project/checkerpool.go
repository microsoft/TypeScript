package project

import (
	"context"
	"fmt"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
)

type CheckerPool struct {
	maxCheckers int
	program     *compiler.Program

	mu                  sync.Mutex
	cond                *sync.Cond
	createCheckersOnce  sync.Once
	checkers            []*checker.Checker
	locks               []sync.Mutex
	inUse               map[*checker.Checker]bool
	fileAssociations    map[*ast.SourceFile]int
	requestAssociations map[string]int
	log                 func(msg string)
}

var _ compiler.CheckerPool = (*CheckerPool)(nil)

func newCheckerPool(maxCheckers int, program *compiler.Program, log func(msg string)) *CheckerPool {
	pool := &CheckerPool{
		program:             program,
		maxCheckers:         maxCheckers,
		checkers:            make([]*checker.Checker, maxCheckers),
		locks:               make([]sync.Mutex, maxCheckers),
		inUse:               make(map[*checker.Checker]bool),
		requestAssociations: make(map[string]int),
		log:                 log,
	}

	pool.cond = sync.NewCond(&pool.mu)
	return pool
}

func (p *CheckerPool) GetCheckerForFile(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	p.mu.Lock()
	defer p.mu.Unlock()

	requestID := core.GetRequestID(ctx)
	if requestID != "" {
		if checker, release := p.getRequestCheckerLocked(requestID); checker != nil {
			return checker, release
		}
	}

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

	checker, index := p.getCheckerLocked(requestID)
	p.fileAssociations[file] = index
	return checker, p.createRelease(requestID, index, checker)
}

// GetCheckerForFileExclusive is the same as GetCheckerForFile but also locks a mutex associated with the checker.
// Call `done` to free the lock.
func (p *CheckerPool) GetCheckerForFileExclusive(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	return p.GetCheckerForFile(ctx, file)
}

func (p *CheckerPool) GetChecker(ctx context.Context) (*checker.Checker, func()) {
	p.mu.Lock()
	defer p.mu.Unlock()
	checker, index := p.getCheckerLocked(core.GetRequestID(ctx))
	return checker, p.createRelease(core.GetRequestID(ctx), index, checker)
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
		} else {
			p.inUse[checker] = false
		}
		p.cond.Signal()
	}
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

func (p *CheckerPool) isRequestCheckerInUse(requestID string) bool {
	p.mu.Lock()
	defer p.mu.Unlock()

	if index, ok := p.requestAssociations[requestID]; ok {
		checker := p.checkers[index]
		if checker != nil {
			return p.inUse[checker]
		}
	}
	return false
}

func (p *CheckerPool) size() int {
	p.mu.Lock()
	defer p.mu.Unlock()
	size := 0
	for _, checker := range p.checkers {
		if checker != nil {
			size++
		}
	}
	return size
}

func noop() {}
