package checker

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
)

// A resolution is a computation in progress: a memoized computation, a cached
// comparison, or a checked node. The innermost is the last in
// Checker.resolutions, above a root resolution for work outside any of them.
type resolution struct {
	// The result computed is the memo identified by key, or the one whose
	// memo state source creates for index, if either is given.
	key    memoKey
	source memoStateSource
	index  int32
	// Length of the instantiation stack from which the depth limit counts:
	// that on entry for a computation, or that of the enclosing resolution
	// for a node.
	depthStart int32
	serial     uint32 // Identifies the resolution among all entered

	// A query records the effects of a memoized computation, for replay by
	// reuse of its result; see memo.go.
	memo      bool
	isQuery   bool
	resolving bool         // The resolution is the one in Checker.resolving for key
	fromCheck bool         // The query began in a check; see recordFromCheck
	prevMemo  int32        // Checker.memoTop on entry
	result    *memoState   // Memo state of the result computed
	effects   *memoEffects // Allocated on first use
	// Index in Checker.deferredAttach of the first result cached by the
	// computation before it had effects; see attachState.
	attachStart int32
	entry       *ast.Node // Current node when the computation started
	query       savedCurrentNode

	// A type resolution is a computation that re-entering detects as a cycle;
	// see beginTypeResolution. Its other fields are those of the resolution
	// below it, whose work it shares.
	isTypeResolution   bool
	prevTypeResolution int32 // Checker.typeResolutionTop on entry
	typeResolution     TypeResolution
}

// A memoStateSource creates the memo state of a computation in progress on
// demand, since few computations do work worth storing.
type memoStateSource interface {
	stateAt(i int) *memoState
	popState(i int)
}

func (c *Checker) initResolutions() {
	c.resolutions = []resolution{{}}
	c.syncObserving()
}

// pushResolution pushes a resolution with every field zero and returns it.
// Popping a resolution zeroes it, so space reused above the stack needs no
// zeroing, and the caller sets only the fields it needs in place rather than
// copying in a whole resolution.
func (c *Checker) pushResolution() *resolution {
	n := len(c.resolutions)
	if n == cap(c.resolutions) {
		c.resolutions = append(c.resolutions, resolution{})
	} else {
		c.resolutions = c.resolutions[:n+1]
	}
	return &c.resolutions[n]
}

func (c *Checker) currentResolution() *resolution {
	return &c.resolutions[len(c.resolutions)-1]
}

// beginResolution starts a resolution for a computation, which also starts the
// depth limit of instantiations (see "Instantiation limits" in memo.go).
func (c *Checker) beginResolution(source memoStateSource, index int) {
	c.appendResolution(0, source, index, int32(len(c.instantiationStack)))
}

// beginNodeResolution starts a resolution for checking a node, which
// continues the depth limit of the enclosing resolution and starts the count
// of instantiations again.
func (c *Checker) beginNodeResolution() {
	c.instantiationCount = 0
	c.appendResolution(0, nil, 0, c.currentResolution().depthStart)
}

func (c *Checker) appendResolution(key memoKey, source memoStateSource, index int, depthBase int32) {
	c.resolutionSerials++
	f := c.pushResolution()
	f.key = key
	f.source = source
	f.index = int32(index)
	f.depthStart = depthBase
	f.serial = c.resolutionSerials
}

// endResolution finishes the current resolution.
func (c *Checker) endResolution() {
	n := len(c.resolutions) - 1
	f := &c.resolutions[n]
	debug.Assert(!f.isTypeResolution, "resolution left on the stack")
	c.endResolving(f)
	fromCheck := f.fromCheck
	if f.memo {
		clear(c.deferredAttach[f.attachStart:])
		c.deferredAttach = c.deferredAttach[:f.attachStart]
	}
	if f.source != nil {
		f.source.popState(int(f.index))
	}
	c.resolutions[n] = resolution{}
	c.resolutions = c.resolutions[:n]
	if c.circularityStart > n {
		c.endCircularity()
	} else if len(c.innerCycles) != 0 {
		c.endInnerCycles(n)
	}
	if fromCheck {
		c.endQueryFromCheck()
	}
}

// forgetResult makes the current resolution compute no result, for a
// computation that did not cache its result.
func (c *Checker) forgetResult() {
	f := c.currentResolution()
	if f.source != nil {
		f.source.popState(int(f.index))
	}
	c.endResolving(f)
	f.key, f.source = 0, nil
}

// resolvingIndex returns 1 + the index in resolutions of the outermost
// computation of key in progress, or 0.
func (c *Checker) resolvingIndex(key memoKey) int {
	if i, ok := c.resolving.get(key); ok && int(i) >= c.visibleStart {
		return int(i) + 1
	}
	return 0
}

// resolvingTable maps the keys of computations in progress to the index in
// resolutions of the outermost one. It only holds keys on the resolution
// stack, so it stays small, and it is looked up far more often than it
// changes. It uses open addressing with linear probing, with zero marking an
// empty slot, as no memo key is zero.
type resolvingTable struct {
	slots []resolvingSlot
	count int
}

type resolvingSlot struct {
	key   memoKey
	index int32
}

func (t *resolvingTable) home(key memoKey) int {
	return int(uint64(key) * 0x9E3779B97F4A7C15 >> 32 & uint64(len(t.slots)-1))
}

func (t *resolvingTable) get(key memoKey) (int32, bool) {
	if t.count == 0 {
		return 0, false
	}
	mask := len(t.slots) - 1
	for i := t.home(key); ; i = (i + 1) & mask {
		switch t.slots[i].key {
		case key:
			return t.slots[i].index, true
		case 0:
			return 0, false
		}
	}
}

func (t *resolvingTable) set(key memoKey, index int32) {
	if 2*(t.count+1) > len(t.slots) {
		t.grow()
	}
	mask := len(t.slots) - 1
	for i := t.home(key); ; i = (i + 1) & mask {
		switch t.slots[i].key {
		case key:
			t.slots[i].index = index
			return
		case 0:
			t.slots[i] = resolvingSlot{key, index}
			t.count++
			return
		}
	}
}

func (t *resolvingTable) delete(key memoKey) {
	if t.count == 0 {
		return
	}
	mask := len(t.slots) - 1
	i := t.home(key)
	for t.slots[i].key != key {
		if t.slots[i].key == 0 {
			return
		}
		i = (i + 1) & mask
	}
	// Shift later entries of the probe sequence back into the hole, so that
	// lookups need no tombstones.
	for j := (i + 1) & mask; t.slots[j].key != 0; j = (j + 1) & mask {
		if h := t.home(t.slots[j].key); (j-h)&mask >= (j-i)&mask {
			t.slots[i] = t.slots[j]
			i = j
		}
	}
	t.slots[i] = resolvingSlot{}
	t.count--
}

func (t *resolvingTable) grow() {
	old := t.slots
	t.slots = make([]resolvingSlot, max(2*len(old), 64))
	t.count = 0
	for _, slot := range old {
		if slot.key != 0 {
			t.set(slot.key, slot.index)
		}
	}
}

// beginResolving records that the resolution about to be pushed computes key,
// unless a computation of key is already in progress, in which case the new
// one re-enters it as the policy of its kind says; see memoReentry. It reports
// whether the resolution is recorded.
func (c *Checker) beginResolving(key memoKey) bool {
	i, ok := c.resolving.get(key)
	if ok {
		if int(i) >= c.visibleStart {
			if memoReentry[key.field()] == reentryCircular {
				c.markCircular(int(i))
			}
			return false
		}
		y := &c.cycleYields[len(c.cycleYields)-1]
		y.shadowed = append(y.shadowed, shadowedResolving{key, i})
	}
	c.resolving.set(key, int32(len(c.resolutions)))
	return true
}

// endResolving records that the resolution no longer computes its key. A
// resolution that shadows another during a cycle yield ends before the yield
// restores the one it shadows, so it is still the one recorded.
func (c *Checker) endResolving(f *resolution) {
	if f.resolving {
		c.resolving.delete(f.key)
		f.resolving = false
	}
}
