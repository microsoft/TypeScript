package checker

import (
	"slices"

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
	resolving bool // The resolution is the one in Checker.resolving for key
	fromCheck bool // The query began in a check; see recordFromCheck
	// The computation read the incomplete result of a computation in
	// progress, or was started by one that did; see effectsToDrop.
	readIncomplete bool
	// The computation reported an error located at the current node; see
	// effectsToDrop.
	reportsAtCurrentNode bool
	// The structured members the outermost resolution of key computes are
	// available before it completes; see resolveStructuredTypeMembersUncached.
	membersPublished bool
	prevMemo         int32 // Checker.memoTop on entry
	// Index in Checker.deferredAttach of the first result cached by the
	// computation before it had effects; see attachState.
	attachStart int32
	result      *memoState   // Memo state of the result computed
	effects     *memoEffects // Allocated on first use
	entry       *ast.Node    // Current node when the computation started
	// The symbol whose member table this memo computes, if any. Keeping it
	// directly lets canonical cycle entry compare declarations without
	// recovering a pointer from the packed memo key.
	memberSymbol *ast.Symbol

	// A type resolution is a computation that re-entering detects as a cycle;
	// see beginTypeResolution. Its other fields are those of the resolution
	// below it, whose work it shares.
	typeResolution     TypeResolution
	isTypeResolution   bool
	prevTypeResolution int32 // Checker.typeResolutionTop on entry
	prevObservedHead   int32 // Checker.observedHead on entry
}

// A memoStateSource creates the memo state of a computation in progress on
// demand, since few computations do work worth storing.
type memoStateSource interface {
	stateAt(i int) *memoState
	peekStateAt(i int) *memoState
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
	if n == 1 {
		// An outermost computation, such as a query, counts its own
		// instantiations; see "Instantiation limits" in memo.go.
		c.instantiationCount = 0
	}
	if n == cap(c.resolutions) {
		c.resolutions = append(c.resolutions, resolution{})
	} else {
		c.resolutions = c.resolutions[:n+1]
	}
	f := &c.resolutions[n]
	// What a computation started by one that read an incomplete result
	// computes may be derived from it too.
	f.readIncomplete = n != 0 && c.resolutions[n-1].readIncomplete
	return f
}

func (c *Checker) currentResolution() *resolution {
	return &c.resolutions[len(c.resolutions)-1]
}

// beginResolution starts a resolution for a computation, which also starts the
// depth limit of instantiations (see "Instantiation limits" in memo.go).
func (c *Checker) beginResolution(source memoStateSource, index int) {
	c.appendResolution(0, source, index, int32(len(c.instantiationStack)))
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
	c.dropResolution(n)
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

// slot returns the slot holding key, or else the empty slot where it would
// be inserted, with room for the insertion.
func (t *resolvingTable) slot(key memoKey) *resolvingSlot {
	if 2*(t.count+1) > len(t.slots) {
		t.grow()
	}
	mask := len(t.slots) - 1
	for i := t.home(key); ; i = (i + 1) & mask {
		if k := t.slots[i].key; k == key || k == 0 {
			return &t.slots[i]
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
// one re-enters it as memoReentry says for its kind. It reports whether the
// resolution is recorded.
func (c *Checker) beginResolving(key memoKey) bool {
	slot := c.resolving.slot(key)
	if slot.key == 0 {
		*slot = resolvingSlot{key, int32(len(c.resolutions))}
		c.resolving.count++
		return true
	}
	i := slot.index
	if int(i) >= c.visibleStart {
		c.reenter(int(i), memoReentry[key.field()])
		return false
	}
	y := &c.cycleYields[len(c.cycleYields)-1]
	y.shadowed = append(y.shadowed, shadowedResolving{key, i})
	slot.index = int32(len(c.resolutions))
	return true
}

// resolvingAnyIndex returns the index in resolutions of the computation of
// key in progress, if any, whether or not it is visible. A computation hidden
// by a cycle yield is shadowed in Checker.resolving by one re-entering it,
// until the yield ends, even once that one has ended.
func (c *Checker) resolvingAnyIndex(key memoKey) (int, bool) {
	if i, ok := c.resolving.get(key); ok {
		return int(i), true
	}
	for _, y := range slices.Backward(c.cycleYields) {
		for _, sh := range y.shadowed {
			if sh.key == key {
				return int(sh.index), true
			}
		}
	}
	return 0, false
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

func (c *Checker) findResolutionCycleStartIndex(target TypeSystemEntity, propertyName TypeSystemPropertyName) int {
	for i := c.typeResolutionTop - 1; i >= c.resolutionStart; i = int(c.resolutions[i].prevTypeResolution) - 1 {
		resolution := &c.resolutions[i].typeResolution
		if c.typeResolutionHasProperty(resolution) {
			// The result was set before its computation finished, which
			// hides a cycle below it. Only then does the search depend on
			// the result.
			if c.memoActive() && c.findResolutionBelow(i, target, propertyName) {
				if resolution.memo != nil {
					c.observeCell(resolution.memo)
				}
			}
			return -1
		}
		if resolution.target == target && resolution.propertyName == propertyName {
			return i
		}
	}
	return -1
}

// findResolutionBelow reports whether a type resolution of target below the
// one at index i is in progress.
func (c *Checker) findResolutionBelow(i int, target TypeSystemEntity, propertyName TypeSystemPropertyName) bool {
	for i = int(c.resolutions[i].prevTypeResolution) - 1; i >= c.resolutionStart; i = int(c.resolutions[i].prevTypeResolution) - 1 {
		r := &c.resolutions[i].typeResolution
		if r.target == target && r.propertyName == propertyName {
			return true
		}
	}
	return false
}

// typeResolutionHasProperty reports whether a resolution on the stack already
// has a result. Its computation is in progress, so the result is read without
// observing it; see findResolutionCycleStartIndex.
func (c *Checker) typeResolutionHasProperty(r *TypeResolution) bool {
	switch r.propertyName {
	case TypeSystemPropertyNameType:
		return c.valueSymbolLinks.Get(r.target.(*ast.Symbol)).resolvedType.peek() != nil
	case TypeSystemPropertyNameDeclaredType:
		return c.typeAliasLinks.Get(r.target.(*ast.Symbol)).declaredType.peek() != nil
	case TypeSystemPropertyNameResolvedTypeArguments:
		return r.target.(*Type).AsTypeReference().resolvedTypeArguments.peek() != nil
	case TypeSystemPropertyNameResolvedBaseTypes:
		return r.target.(*Type).AsInterfaceType().baseTypesResolved
	case TypeSystemPropertyNameResolvedBaseConstructorType:
		return r.target.(*Type).AsInterfaceType().resolvedBaseConstructorType.peek() != nil
	case TypeSystemPropertyNameResolvedReturnType:
		return r.target.(*Signature).resolvedReturnType.peek() != nil
	case TypeSystemPropertyNameResolvedBaseConstraint:
		return r.target.(*Type).AsConstrainedType().resolvedBaseConstraint.peek() != nil
	case TypeSystemPropertyNameInitializerIsUndefined:
		return c.nodeLinks.Get(r.target.(*ast.Node)).flags&NodeCheckFlagsInitializerIsUndefinedComputed != 0
	case TypeSystemPropertyNameWriteType:
		extra := c.valueSymbolLinks.Get(r.target.(*ast.Symbol)).extra
		return extra != nil && extra.writeType.peek() != nil
	case TypeSystemPropertyNameAliasTarget:
		return c.aliasSymbolLinks.Get(r.target.(*ast.Symbol)).aliasTarget.peek() != nil
	case TypeSystemPropertyNameComputedPropertyName:
		return c.typeNodeLinks.Get(r.target.(*ast.Node)).resolvedType.peek() != nil
	case TypeSystemPropertyNameVariances:
		return c.varianceLinks.Get(r.target.(*ast.Symbol)).variances.peek() != nil
	default:
		// Marked as checked or resolved on entry, so it is only on the stack
		// while in progress.
		return false
	}
}
