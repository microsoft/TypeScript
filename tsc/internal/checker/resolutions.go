package checker

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
)

// A resolution is a computation in progress: a memoized computation, a cached
// comparison, or a checked node. The innermost is the last in
// Checker.resolutions, above a root resolution for work outside any of them.
type resolution struct {
	// The resolution computes the memo identified by key, or the entry
	// source tracks at index, if either is given.
	key    memoKey
	source memoStateSource
	index  int32

	// A query records the effects of a memoized computation, for replay by
	// reuse of its result; see memo.go.
	memo     bool
	isQuery  bool
	prevMemo int32        // Checker.memoTop on entry
	result   *memoState   // Memo state of the result computed
	effects  *memoEffects // Allocated on first use
	entry    *ast.Node    // Current node when the computation started
	query    savedCurrentNode

	// A type resolution is a computation that re-entering detects as a cycle;
	// see beginTypeResolution. Its other fields are those of the resolution
	// below it, whose work it shares.
	isTypeResolution   bool
	prevTypeResolution int32 // Checker.typeResolutionTop on entry
	typeResolution     TypeResolution
}

// A memoStateSource tracks the entries of a memo map whose computations are
// in progress.
type memoStateSource interface {
	popState(i int)
}

func (c *Checker) initResolutions() {
	c.resolutions = []resolution{{}}
}

func (c *Checker) currentResolution() *resolution {
	return &c.resolutions[len(c.resolutions)-1]
}

// beginResolution starts a resolution for a computation of key, or of the
// entry source tracks at index, or for neither, such as for checking a node.
func (c *Checker) beginResolution(key memoKey, source memoStateSource, index int) {
	if key != 0 {
		c.beginResolving(key)
	}
	c.resolutions = append(c.resolutions, resolution{
		key:    key,
		source: source,
		index:  int32(index),
	})
}

// endResolution finishes the current resolution.
func (c *Checker) endResolution() {
	n := len(c.resolutions) - 1
	f := &c.resolutions[n]
	debug.Assert(!f.isTypeResolution, "resolution left on the stack")
	c.endResolving(f, n)
	if f.source != nil {
		f.source.popState(int(f.index))
	}
	c.resolutions[n] = resolution{}
	c.resolutions = c.resolutions[:n]
	if c.circularityStart > n {
		c.endCircularity()
	}
}

// resolvingIndex returns 1 + the index in resolutions of the outermost
// computation of key in progress, or 0.
func (c *Checker) resolvingIndex(key memoKey) int {
	if i, ok := c.resolving[key]; ok {
		return int(i) + 1
	}
	return 0
}

// beginResolving records that the resolution about to be pushed computes key,
// unless a computation of key is already in progress, in which case the new
// one re-enters it as the policy of its kind says; see memoReentry.
func (c *Checker) beginResolving(key memoKey) {
	if i, ok := c.resolving[key]; ok {
		if memoReentry[key.field()] == reentryCircular {
			c.markCircular(int(i))
		}
		return
	}
	if c.resolving == nil {
		c.resolving = make(map[memoKey]int32)
	}
	c.resolving[key] = int32(len(c.resolutions))
}

// endResolving records that the resolution at index n no longer computes its
// key.
func (c *Checker) endResolving(f *resolution, n int) {
	if f.key != 0 && c.resolving[f.key] == int32(n) {
		delete(c.resolving, f.key)
	}
}
