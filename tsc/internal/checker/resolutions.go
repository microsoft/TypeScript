package checker

import (
	"math/bits"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
)

// A resolution is a computation in progress: a memoized computation, a cached
// comparison, or a checked node. The innermost is the last in
// Checker.resolutions, above a root resolution for work outside any of them.
type resolution struct {
	count *instantiationCount // Allocated on first use
	// The instantiation count is stored for the memo identified by key, or in
	// the memo state source creates for index, if either is given.
	key    memoKey
	source memoStateSource
	index  int32
	start  int32 // Length of the instantiation stack on entry
	// Length of the instantiation stack from which the depth limit counts:
	// start for a computation, or that of the enclosing resolution for a
	// node.
	depthStart int32
	serial     uint32 // Identifies the resolution among all entered

	// A query records the effects of a memoized computation, for replay by
	// reuse of its result; see memo.go.
	memo      bool
	isQuery   bool
	fromCheck bool         // The query began in a check; see beginQueryFromCheck
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
}

func (c *Checker) currentResolution() *resolution {
	return &c.resolutions[len(c.resolutions)-1]
}

// beginResolution starts a resolution with an empty instantiation count for a
// computation, which also starts the depth limit of instantiations (see
// "Instantiation limits" in memo.go).
func (c *Checker) beginResolution(key memoKey, source memoStateSource, index int) {
	if key != 0 && c.inResolution() {
		// Entering a computed result reads it.
		c.observeCost(c.storedCost(key))
	}
	if key != 0 {
		c.beginResolving(key)
	}
	base := int32(len(c.instantiationStack))
	c.appendResolution(key, source, index, base)
}

// beginNodeResolution starts a resolution for checking a node, which
// continues the depth limit of the enclosing resolution.
func (c *Checker) beginNodeResolution() {
	c.appendResolution(0, nil, 0, c.currentResolution().depthStart)
}

func (c *Checker) appendResolution(key memoKey, source memoStateSource, index int, depthBase int32) {
	c.resolutionSerials++
	c.resolutions = append(c.resolutions, resolution{
		key:        key,
		source:     source,
		index:      int32(index),
		start:      int32(len(c.instantiationStack)),
		depthStart: depthBase,
		serial:     c.resolutionSerials,
	})
}

// endResolution finishes the current resolution, returning its instantiation
// count, or nil if it did no instantiations.
func (c *Checker) endResolution() *instantiationCount {
	n := len(c.resolutions) - 1
	f := &c.resolutions[n]
	debug.Assert(!f.isTypeResolution, "resolution left on the stack")
	c.endResolving(f, n)
	count := f.count
	fromCheck := f.fromCheck
	if f.memo {
		clear(c.deferredAttach[f.attachStart:])
		c.deferredAttach = c.deferredAttach[:f.attachStart]
	}
	if count != nil || f.source != nil {
		c.finishResolution(f)
	}
	c.resolutions[n] = resolution{}
	c.resolutions = c.resolutions[:n]
	if c.circularityStart > n {
		c.endCircularity()
	}
	if count != nil {
		c.observeCost(count)
	}
	if fromCheck {
		c.endQueryFromCheck()
	}
	return count
}

// finishResolution stores the instantiation count of a resolution for the
// results it computed.
func (c *Checker) finishResolution(f *resolution) {
	if count := f.count; count != nil {
		var state *memoState
		if f.source != nil {
			state = f.source.stateAt(int(f.index))
		} else if f.key != 0 {
			state = c.memoState(f.key)
			c.markCost(f.key)
		}
		if state != nil {
			if state.count != nil {
				count.merge(state.count)
			}
			state.count = count
		}
	}
	if f.source != nil {
		f.source.popState(int(f.index))
	}
}

// savedCountOf returns the instantiation count stored in the memo state for
// k, so that discarding a result can discard the count stored for it since.
func savedCountOf[K comparable](states map[K]*memoState, k K) *instantiationCount {
	if s := states[k]; s != nil {
		return s.count
	}
	return nil
}

// restoreCount makes count the instantiation count stored in the memo state
// for k, if it has one.
func restoreCount[K comparable](states map[K]*memoState, k K, count *instantiationCount) {
	if s := states[k]; s != nil {
		s.count = count
	}
}

// forgetCost makes the current resolution store its instantiation count for
// no result, for a computation that did not cache its result.
func (c *Checker) forgetCost() {
	f := c.currentResolution()
	if f.source != nil {
		f.source.popState(int(f.index))
	}
	c.endResolving(f, len(c.resolutions)-1)
	f.key, f.source = 0, nil
}

// resolvingIndex returns 1 + the index in resolutions of the outermost
// computation of key in progress, or 0.
func (c *Checker) resolvingIndex(key memoKey) int {
	if i, ok := c.resolving[key]; ok && int(i) >= c.visibleStart {
		return int(i) + 1
	}
	return 0
}

// beginResolving records that the resolution about to be pushed computes key,
// unless a computation of key is already in progress, in which case the new
// one re-enters it as the policy of its kind says; see memoReentry.
func (c *Checker) beginResolving(key memoKey) {
	if i, ok := c.resolving[key]; ok {
		if int(i) >= c.visibleStart {
			if memoReentry[key.field()] == reentryCircular {
				c.markCircular(int(i))
			}
			return
		}
		y := &c.cycleYields[len(c.cycleYields)-1]
		y.shadowed = append(y.shadowed, shadowedResolving{key, i})
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

// inResolution reports whether an instantiation of the current resolution is
// in progress, so that results it reads are part of its work.
func (c *Checker) inResolution() bool {
	return len(c.instantiationStack) > int(c.currentResolution().start)
}

// observeCost accounts for the work of a result read by the current
// resolution.
func (c *Checker) observeCost(count *instantiationCount) {
	if count == nil || !c.inResolution() {
		return
	}
	f := c.currentResolution()
	if count == f.count {
		return
	}
	if f.count == nil {
		f.count = newInstantiationCount()
	}
	f.count.merge(count)
}

func (c *Checker) addInstantiation(h uint64) {
	f := c.currentResolution()
	if f.count == nil {
		f.count = newInstantiationCount()
	}
	f.count.add(h)
}

// linkCost gives a memo set outside a computation of its own the
// instantiation count of the current resolution so far. Recomputing the memo
// from scratch repeats those instantiations, but not those the resolution goes
// on to do after setting it.
func (c *Checker) linkCost(key memoKey) {
	if len(c.resolutions) <= 1 {
		return
	}
	if key == c.currentResolution().key {
		return
	}
	if count := c.costSoFar(); count != nil {
		c.memoState(key).count = count
		c.markCost(key)
	}
}

// costSoFar returns a copy of the instantiation count of the current
// resolution so far, or nil if it did no instantiations.
func (c *Checker) costSoFar() *instantiationCount {
	f := c.currentResolution()
	if f.count != nil {
		count := *f.count
		return &count
	}
	return nil
}

func (c *Checker) storedCost(key memoKey) *instantiationCount {
	if !c.mayHaveCost(key) {
		return nil
	}
	state := c.peekMemoState(key)
	if state == nil {
		return nil
	}
	return state.count
}

// The work filter is a set of the memo keys whose memo states may store work,
// so that reading a result without effects to account for can skip looking up
// its memo state. Most reads within computations only account for work, and
// most results need none.

const costFilterBits = 22

func costFilterIndex(key memoKey) uint64 {
	return uint64(key) * 0x9E3779B97F4A7C15 >> (64 - costFilterBits)
}

func (c *Checker) markCost(key memoKey) {
	if c.costFilter == nil {
		c.costFilter = make([]uint64, 1<<costFilterBits/64)
	}
	i := costFilterIndex(key)
	c.costFilter[i/64] |= 1 << (i % 64)
}

func (c *Checker) mayHaveCost(key memoKey) bool {
	if c.costFilter == nil {
		return false
	}
	i := costFilterIndex(key)
	return c.costFilter[i/64]&(1<<(i%64)) != 0
}

// Instantiation counts
//
// The limit on the number of instantiations bounds the work needed to compute
// a result from scratch, which does not depend on what was cached before.
// Each memoized computation is a resolution with an instantiation count of
// the distinct instantiations its result needs: those it performs itself, and
// those of every result it reads while an instantiation of its own is in
// progress, whether that result is computed then or reused. Reused results
// contribute the instantiation count stored when they were computed. Counting
// distinct instantiations rather than summing the work of each result keeps
// results shared by many others from being counted many times over.
//
// The instantiation count is a HyperLogLog estimate of the number of distinct
// instantiations, identified by structural hashes (see typeHash), so that the
// estimate does not depend on the order in which types were created.

const (
	instantiationCountIndexBits = 6
	instantiationCountRegisters = 1 << instantiationCountIndexBits
	instantiationCountMaxRank   = 40
	// The estimate is 0.709 * registers^2 / sum(2^-register). The sum is kept
	// as an integer scaled by 2^instantiationCountMaxRank, so that it is
	// exact whatever the order of additions.
	instantiationCountThreshold = 709 * instantiationCountRegisters * instantiationCountRegisters * (1 << instantiationCountMaxRank) / (1000 * instantiationCountLimit)
)

type instantiationCount struct {
	registers [instantiationCountRegisters]uint8
	inverse   uint64 // Sum of 2^(instantiationCountMaxRank-register)
}

func newInstantiationCount() *instantiationCount {
	return &instantiationCount{inverse: instantiationCountRegisters << instantiationCountMaxRank}
}

func (s *instantiationCount) raise(i uint64, rank uint8) {
	if old := s.registers[i]; rank > old {
		s.inverse -= 1 << (instantiationCountMaxRank - old)
		s.inverse += 1 << (instantiationCountMaxRank - rank)
		s.registers[i] = rank
	}
}

func (s *instantiationCount) add(h uint64) {
	rank := uint8(bits.LeadingZeros64(h<<instantiationCountIndexBits|1<<(instantiationCountIndexBits-1)) + 1)
	s.raise(h>>(64-instantiationCountIndexBits), min(rank, instantiationCountMaxRank))
}

func (s *instantiationCount) merge(other *instantiationCount) {
	for i, rank := range other.registers {
		s.raise(uint64(i), rank)
	}
}

// exceedsLimit reports whether the estimate reaches instantiationCountLimit.
func (s *instantiationCount) exceedsLimit() bool {
	return s != nil && s.inverse <= instantiationCountThreshold
}
