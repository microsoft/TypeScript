package checker

import (
	"iter"
	"maps"
	"math/bits"
	"slices"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/ast"

	"github.com/microsoft/TypeScript/tsc/internal/debug"
)

// Checker side effects and memoization
//
// Checking a file produces outputs other than types: diagnostics, reference
// marks used by unused-identifier checks, deferred nodes, and so on. Those
// outputs are produced while computing memoized results (the type of a symbol,
// the resolved symbol of an identifier, ...). If such a result is first computed
// for an API query rather than while checking, a later check reuses the cached
// result without recomputing it, so the outputs would historically either leak
// (reported for code that checking never visits) or be lost (never reported for
// code that checking does visit). Both make diagnostics depend on query history.
//
// To make checking independent of query history, a checker is either checking
// or answering queries. A query does not apply side effects. Instead it
// records them against the innermost memoized computation in progress, along
// with the memoized results that computation reused. When a check later
// reuses a memoized result, it replays the recorded effects of that result
// and everything it transitively reused, exactly as if it had computed the
// result itself. Effects produced outside any memoized computation belong
// solely to the query and are discarded. A check applies its own effects as
// they happen, except while results it computes may be discarded, when it
// records them as a query does (see recordFromCheck).

type memoField uint8

const (
	memoCell memoField = iota // A memo[T], keyed by its own address
	memoWriteType
	memoDeclaredType
	memoTypeNodeType
	memoBaseTypes
	memoStructuredMembers
	memoTypeParameterConstraint
	memoTypeParameterDefault
	memoEnumMemberValue
	memoBaseConstraint
	memoAccessorType
	memoContextualParameters
	memoContextChecked
	memoInitializerIsUndefined
	memoFlowExpressionType
	memoFlowLoopType
	memoJsxImplicitImportContainer
	memoModuleExports
	memoInstantiationExpressionType
	memoTypePredicate
	memoDeclaredMembers
	memoCouldContainTypeVariables
	memoGenericObjectFlags
	memoUnknownLikeUnion
	memoNeverIntersection
	memoDiscriminant
	memoResolvedMembers // followed by one field per MembersOrExportsResolutionKind
	memoSymbolExports   = memoResolvedMembers + memoField(MembersOrExportsResolutionKindResolvedExports)
	memoSymbolMembers   = memoResolvedMembers + memoField(MembersOrExportsResolutionKindResolvedMembers)
	memoFieldCount      = memoResolvedMembers + 2
)

// A reentry says what it means to re-enter a computation in progress, which
// can only observe whatever the computation has published so far.
type reentry uint8

const (
	// What re-entry observes is incomplete, so the results computed while
	// the outer computation is in progress are discarded when it finishes,
	// and computed again from its result. This is the default.
	reentryCircular reentry = iota
	// The computation detects re-entry with a type resolution of its own,
	// which decides the head of the cycle and what to discard.
	reentryResolution
	// Re-entry observes the partial result the computation has published so
	// far, or computes the result again if it publishes none. Results
	// derived from it may differ depending on which computation starts
	// first. Like re-entering a circular computation, it reads an incomplete
	// result; see markReadIncomplete.
	reentryPartial
)

// reenter accounts for re-entering the computation in progress at index i
// of resolutions, as r says.
func (c *Checker) reenter(i int, r reentry) {
	if r == reentryCircular {
		c.markCircular(i)
	}
	if r != reentryResolution {
		c.markReadIncomplete(i)
	}
}

// memoReentry says what re-entering means for each kind of computation.
var memoReentry = [memoFieldCount]reentry{
	// memoCompute keeps the result that a re-entrant computation cached,
	// and many cells publish an in-progress marker for re-entry to read.
	memoCell: reentryPartial,
	// Many kinds of types make members available before they are complete.
	memoStructuredMembers: reentryPartial,
	// Circular defaults are reported at the default first in program order.
	memoTypeParameterDefault: reentryResolution,
	// Contextual parameter typing resolves a cycle through the enclosing call.
	// Its type resolution ends once the parameters are assigned.
	memoContextualParameters: reentryResolution,
}

// memoKey identifies a memoized result: the address of the entity owning the
// cache slot (an *ast.Node, *ast.Symbol, *Type, or *Signature) shifted left by
// eight bits, plus the memoField of the slot. Packing into an integer keeps map
// operations on the fast path. Entities live as long as the program or the
// checker store, so an address cannot be reused while its keys exist.
type memoKey uint64

func (k memoKey) field() memoField {
	return memoField(k)
}

func memoKeyOf[T any](entity *T, field memoField) memoKey {
	// SAFETY: Only the address is kept, as an identity; it is never turned back
	// into a pointer.
	return memoKey(uint64(uintptr(unsafe.Pointer(entity)))<<8 | uint64(field))
}

type memoEffects struct {
	effects []func(c *Checker)
	deps    []*memoEffects
	parent  *memoEffects // Resolution d was most recently added to; avoids duplicate deps
	entry   *ast.Node    // Current node when the computation started, if entered
	rare    *memoEffectsRare
	entered bool // Whether this is the resolution of a computation, not just a set of deps
	// Whether the result was discarded at the end of a cycle, so that its
	// own effects are not replayed; see effectsToDrop.
	dropped bool
}

// memoEffectsRare holds the parts of memoEffects that few computations have,
// kept apart since the effects of every computation in a program can be
// retained at once.
type memoEffectsRare struct {
	cycles []memoCycleDep // The cycle heads memoCycle added to deps, from highest to lowest
	// Marks the computation recorded (see writesMarks), replayed even if its
	// effects are dropped: that the computation reached what it marks does
	// not depend on what it read.
	marks []func(c *Checker)
}

func (f *memoEffects) rareFields() *memoEffectsRare {
	if f.rare == nil {
		f.rare = &memoEffectsRare{}
	}
	return f.rare
}

func (f *memoEffects) addDep(d *memoEffects) {
	if f == d || d.parent == f {
		return
	}
	d.parent = f
	f.deps = append(f.deps, d)
}

// covers reports whether replaying f replays deps, checking only the direct
// dependencies of f, and only of a few, to stay cheap.
func (f *memoEffects) covers(deps []*memoEffects) bool {
	if len(deps) > 16 || len(f.deps) > 64 {
		return false
	}
	for _, d := range deps {
		if d != f && !slices.Contains(f.deps, d) {
			return false
		}
	}
	return true
}

// memoState is the memo state of one memoized result.
type memoState struct {
	pending *memoEffects         // Effects not yet replayed by a check
	errors  *[]*currentNodeError // Errors the computation reported at the current node, out of line since few have any; see setErrors
}

// memo is a cached result. Cached checker state must live in a memo so that
// every read accounts for the effects of the computation that produced it;
// see the package comment above. The value is only accessible through
// methods. The memo state of a result is kept in the store's memo state map,
// keyed by the address of the memo, so a memo costs nothing beyond its value.
type memo[T any] struct {
	memoHeader
	memoValue T
}

// memoHeader is the part of a memo independent of its type, which identifies
// it.
type memoHeader struct {
	_ memoNoCopy
}

// memoNoCopy makes go vet reject copies of a memo, which would bypass it.
type memoNoCopy struct{}

func (*memoNoCopy) Lock()   {}
func (*memoNoCopy) Unlock() {}

func (h *memoHeader) key() memoKey {
	return memoKeyOf(h, memoCell)
}

// cached returns the cached result, accounting for the effects of computing it.
func (m *memo[T]) cached(c *Checker) T {
	if c.observing() {
		c.observeCell(&m.memoHeader)
	}
	return m.memoValue
}

// set caches a result. When set outside the result's own computation (for
// example, the types of binding elements assigned while resolving the type of
// their declaration), the result depends on the computation setting it.
func (m *memo[T]) set(c *Checker, v T) {
	if c.logResults() {
		m.logDiscard(c)
	}
	m.memoValue = v
	if !c.checking {
		c.attachCell(&m.memoHeader)
	}
}

// setAfterMarker is set for a result replacing the marker its computation put
// in place when it began. A marker put in place before a cycle began was not
// logged, so discarding the result would restore it; a restored marker that
// stale reports as no longer in progress is cleared instead. Stale is given x
// rather than capturing it so that nothing is allocated unless the set is
// logged.
func setAfterMarker[T comparable, X any](c *Checker, m *memo[T], v T, x X, stale func(*Checker, X, T) bool) {
	n := len(c.discardLog)
	m.set(c, v)
	if len(c.discardLog) > n {
		restore := c.discardLog[n].restore
		c.discardLog[n].restore = func() {
			restore()
			if stale(c, x, m.memoValue) {
				var zero T
				m.memoValue = zero
			}
		}
	}
}

// setIfChanged is set for a result that every computation needing it sets
// again, such as the symbol a property access resolves to. Setting the value
// it already has comes from the same computation, whose effects are already
// retained, so it is only set when it changes.
func setIfChanged[T comparable](c *Checker, m *memo[T], v T) {
	if m.memoValue != v {
		m.set(c, v)
	}
}

// setIdentity is set for a result that defines the identity of what it
// caches, such as a declared type, or that is part of an entity being
// created, such as the type of a synthetic property. It is never discarded at
// the end of a cycle: discarding an identity would let a second, distinct
// result exist, and an entity can outlive the cycle in caches that are kept
// while having no way to compute its parts again.
func (m *memo[T]) setIdentity(c *Checker, v T) {
	m.memoValue = v
	if !c.checking {
		c.attachCell(&m.memoHeader)
	}
}

// A memoReported is a memo whose result can have errors to replay; see
// setReported. Reading it accounts for them even when nothing else must be
// accounted for.
type memoReported[T comparable] struct {
	memo[T]
}

func (m *memoReported[T]) cached(c *Checker) T {
	if c.observing() || c.memoErrorStates != 0 {
		c.observeCell(&m.memoHeader)
	}
	return m.memoValue
}

// setReported is setIdentity for a result whose computation collected errors
// reported at the current node, as returned by endCurrentNodeErrors. Every
// node reusing the result reports them again, as it would had it computed the
// result itself. If computing the result elsewhere may not report them (see
// endCurrentNodeErrors), it is instead discarded with other results cached
// for the current node.
func (m *memoReported[T]) setReported(c *Checker, v T, r currentNodeErrors) {
	if r.cyclic {
		if c.logResults() {
			m.logDiscard(c)
		}
		r.list = nil
	}
	m.setIdentity(c, v)
	if r.list != nil || c.memoErrorStates != 0 && c.peekMemoState(m.key()) != nil {
		if r.list != nil {
			i := errorFilterIndex(m.key())
			c.errorFilter[i/64] |= 1 << (i % 64)
		}
		c.memoState(m.key()).setErrors(c, r.list)
	}
}

//go:noinline
func (m *memo[T]) logDiscard(c *Checker) {
	old := m.memoValue
	c.logMemoDiscard(&m.memoHeader, m.key(), func() {
		m.memoValue = old
	})
}

// inProgress returns the result of a computation in progress, which a
// computation re-entering it may have cached before it finishes.
func (m *memo[T]) inProgress(c *Checker) T {
	_, ok := c.resolving.get(m.key())
	debug.Assert(ok, "the computation of the result is not in progress")
	return m.cached(c)
}

// peek returns the cached result without accounting for effects. It is only
// for a result whose computation is in progress, where reading it does not
// observe it.
func (m *memo[T]) peek() T {
	return m.memoValue
}

// swap replaces the cached result without accounting for effects. It is
// only for speculative computations that restore the previous result after.
func (m *memo[T]) swap(v T) T {
	old := m.memoValue
	m.memoValue = v
	return old
}

// intern sets the result of a cell whose owner is being created. Nothing can
// observe the owner before its creator returns it, so the result needs no
// dependency of its own.
func (m *memo[T]) intern(v T) {
	m.memoValue = v
}

// begin starts the computation of the result; see beginMemo.
func (m *memo[T]) begin(c *Checker) {
	c.beginMemo(m.key())
}

// memoCompute returns the result cached in m, computing it in a computation
// of its own if there is none. A result cached while computing it, by a
// computation that re-entered it, is kept.
func (c *Checker) memoCompute[T comparable](m *memo[T], compute func() T) T {
	var zero T
	if v := m.cached(c); v != zero {
		return v
	}
	m.begin(c)
	v := compute()
	if cur := m.peek(); cur != zero {
		v = cur
	} else {
		m.set(c, v)
	}
	c.endMemo()
	return v
}

// internMap is a map of results each constructed from the inputs in its key
// alone, without consulting any cached result, so caching or reusing one has
// no effects to account for.
type internMap[K comparable, V any] struct {
	_       memoNoCopy
	entries map[K]V
}

func (m *internMap[K, V]) get(k K) (V, bool) {
	v, ok := m.entries[k]
	return v, ok
}

func (m *internMap[K, V]) has(k K) bool {
	_, ok := m.entries[k]
	return ok
}

func (m *internMap[K, V]) intern(k K, v V) {
	if m.entries == nil {
		m.entries = make(map[K]V)
	}
	m.entries[k] = v
}

func (m *internMap[K, V]) isEmpty() bool {
	return len(m.entries) == 0
}

func (m *internMap[K, V]) values() iter.Seq[V] {
	return maps.Values(m.entries)
}

// memoMap is a map of cached results, each accounted for like a memo. The
// entries are only accessible through methods. Memo state is kept per entry
// in a side map allocated on first use by a query.
//
// Most maps never need anything but their entries, and many are embedded in
// types, so everything else lives in a side table allocated on first use.
//
// An entry should be computed between enter and endMemo, so that reusing it
// replays the effects of computing that entry alone. An entry set outside its
// own computation depends on the whole enclosing computation instead.
type memoMap[K comparable, V any] struct {
	_           memoNoCopy
	memoEntries map[K]V
	side        *memoMapSide[K]
	// The number of writes to memoEntries, with which a caller can tell
	// that an entry it read is still current without reading it again.
	writes uint32
}

type memoMapSide[K comparable] struct {
	memoStates    map[K]*memoState
	resolvingKeys []K     // Keys of computations in progress without a memo state yet
	resolvingAt   []int32 // Index in Checker.resolutions of each
	// The occurrences of each key in resolvingKeys, kept while there are
	// many, so that looking one up does not scan them all.
	resolvingCount map[K]resolvingOccurrences
	// If set, keyBits returns well-mixed bits of a key, with which stateKeys
	// filters the keys that may have a memo state, since few do and looking
	// up one that does not costs as much as one that does.
	keyBits   func(K) uint64
	stateKeys stateKeyFilter
	hasErrors bool    // Whether an entry ever had reports; see setReported
	reentry   reentry // What re-entering an entry means; see memoReentry
}

func (m *memoMap[K, V]) sideTable() *memoMapSide[K] {
	if m.side == nil {
		m.side = &memoMapSide[K]{}
	}
	return m.side
}

// setReentry sets what re-entering an entry of the map means, which is
// reentryCircular by default.
func (m *memoMap[K, V]) setReentry(r reentry) {
	m.sideTable().reentry = r
}

// setKeyBits makes the map filter the keys that may have a memo state with
// keyBits; see memoMapSide.
func (m *memoMap[K, V]) setKeyBits(keyBits func(K) uint64) {
	m.sideTable().keyBits = keyBits
}

// states returns the memo states of the entries, or nil.
func (m *memoMap[K, V]) states() map[K]*memoState {
	if m.side == nil {
		return nil
	}
	return m.side.memoStates
}

// stateOf returns the memo state of the entry for k, or nil.
func (m *memoMap[K, V]) stateOf(k K) *memoState {
	s := m.side
	if s == nil || s.memoStates == nil {
		return nil
	}
	if s.keyBits != nil && !s.stateKeys.mayContain(s.keyBits(k)) {
		return nil
	}
	return s.memoStates[k]
}

// cached returns the cached result for k, accounting for the effects of
// computing it.
func (m *memoMap[K, V]) cached(c *Checker, k K) (V, bool) {
	if m.side != nil && (c.observing() || m.side.hasErrors) {
		m.observe(c, k)
	}
	v, ok := m.memoEntries[k]
	return v, ok
}

// observe is the out of line part of get, keeping get cheap enough to inline.
//
//go:noinline
func (m *memoMap[K, V]) observe(c *Checker, k K) {
	if m.side.memoStates == nil && len(m.side.resolvingKeys) == 0 {
		return
	}
	if c.checking && c.memoPendingCount == 0 && !m.side.hasErrors {
		// Only reports are replayed; see observeMemo.
		return
	}
	// A computation in progress may not have a memo state yet; see
	// resolutionState.
	if state := m.stateOf(k); c.observeState(state) || state == nil && !c.checking {
		c.memoCycle(m.resolvingIndex(c, k))
	}
}

// hasCached reports whether a result is cached for k; see get.
func (m *memoMap[K, V]) hasCached(c *Checker, k K) bool {
	_, ok := m.cached(c, k)
	return ok
}

// isEmpty reports whether no result is cached, without observing any.
func (m *memoMap[K, V]) isEmpty() bool {
	return len(m.memoEntries) == 0
}

// values iterates the cached results without observing them, for
// inspection outside of checking.
func (m *memoMap[K, V]) values() iter.Seq[V] {
	return maps.Values(m.memoEntries)
}

// set caches the result for k; see memo.set.
func (m *memoMap[K, V]) set(c *Checker, k K, v V) {
	if c.logResults() {
		m.logDiscard(c, k)
	}
	m.setIdentity(c, k, v)
}

//go:noinline
func (m *memoMap[K, V]) logDiscard(c *Checker, k K) {
	old, ok := m.memoEntries[k]
	c.logResultDiscard(c.memoTop != 0 && m.isOwnResolution(c, k), nil, func() {
		m.writes++
		if ok {
			m.memoEntries[k] = old
		} else {
			delete(m.memoEntries, k)
		}
	})
}

// setReported is setIdentity for an entry; see memo.setReported.
func (m *memoMap[K, V]) setReported(c *Checker, k K, v V, r currentNodeErrors) {
	if r.cyclic {
		if c.logResults() {
			m.logDiscard(c, k)
		}
		r.list = nil
	}
	m.setIdentity(c, k, v)
	if r.list != nil || c.memoErrorStates != 0 && m.stateOf(k) != nil {
		if r.list != nil {
			m.sideTable().hasErrors = true
		}
		m.state(k).setErrors(c, r.list)
	}
}

// setIdentity is set for a result that defines the identity of what it
// caches; see memo.setIdentity.
func (m *memoMap[K, V]) setIdentity(c *Checker, k K, v V) {
	if m.memoEntries == nil {
		m.memoEntries = make(map[K]V)
	}
	m.memoEntries[k] = v
	m.writes++
	m.attach(c, k)
}

// attach is memoAttach for the entry for k.
func (m *memoMap[K, V]) attach(c *Checker, k K) {
	if c.memoTop == 0 || c.checking {
		return
	}
	if f := &c.resolutions[c.memoTop-1]; f.source == memoStateSource(m) && m.side.resolvingKeys[f.index] == k {
		return
	}
	c.attachState(m.state(k))
}

// intern caches a result constructed from the inputs in k alone, without
// consulting any cached result, so computing it has no effects to account for.
func (m *memoMap[K, V]) intern(k K, v V) {
	if m.memoEntries == nil {
		m.memoEntries = make(map[K]V)
	}
	m.memoEntries[k] = v
	m.writes++
}

// compute computes and caches the result for k in a computation of its own.
func (m *memoMap[K, V]) compute(c *Checker, k K, fn func() V) V {
	m.begin(c, k)
	v := fn()
	m.set(c, k, v)
	c.endMemo()
	return v
}

// begin starts the computation of the result for k; see beginMemo.
func (m *memoMap[K, V]) begin(c *Checker, k K) {
	side := m.sideTable()
	outer := 0
	if len(side.resolvingKeys) != 0 {
		outer = m.resolvingIndex(c, k)
	}
	if outer != 0 {
		c.reenter(outer-1, side.reentry)
	}
	side.resolvingKeys = append(side.resolvingKeys, k)
	side.resolvingAt = append(side.resolvingAt, int32(len(c.resolutions)))
	if side.resolvingCount != nil {
		side.countResolving(k, len(side.resolvingKeys)-1)
	} else if len(side.resolvingKeys) > resolvingCountMin {
		side.countAllResolving()
	}
	c.beginResolution(m, len(side.resolvingKeys)-1)
	if c.checking && c.memoPendingCount == 0 && c.memoTop|c.currentNodeResolution != 0 && !c.checkingRecords() {
		// beginCheckedMemo for the common case, without the calls. The memo
		// state of the result is looked up only if needed; see
		// resolutionState.
		n := len(c.resolutions) - 1
		f := &c.resolutions[n]
		f.memo = true
		f.prevMemo = int32(c.memoTop)
		f.entry = c.currentNode
		f.attachStart = int32(len(c.deferredAttach))
		c.memoTop = n + 1
		return
	}
	// Looked up after marking a cycle, which may give the entry a state.
	state := m.stateOf(k)
	if c.checking {
		if c.memoPendingCount != 0 && state != nil {
			c.replayPending(state)
		}
		c.beginCheckedMemo(state)
		return
	}
	c.beginState(state, outer)
}

// resolvingIndex returns 1 + the index in resolutions of the computation of
// the entry for k in progress, or 0.
func (m *memoMap[K, V]) resolvingIndex(c *Checker, k K) int {
	if m.side == nil {
		return 0
	}
	start := 0
	if m.side.resolvingCount != nil {
		o, ok := m.side.resolvingCount[k]
		if !ok {
			return 0
		}
		start = int(o.first)
		if o.count == 1 {
			if j := int(m.side.resolvingAt[start]); j >= c.visibleStart {
				return j + 1
			}
			return 0
		}
	}
	for i := start; i < len(m.side.resolvingKeys); i++ {
		if m.side.resolvingKeys[i] != k {
			continue
		}
		j := int(m.side.resolvingAt[i])
		debug.Assert(c.resolutions[j].source == memoStateSource(m) && int(c.resolutions[j].index) == i, "entry in progress without a resolution")
		if j >= c.visibleStart {
			return j + 1
		}
		// Hidden; see yieldCycle.
	}
	return 0
}

// isOwnResolution reports whether the current resolution computes the entry
// for k.
func (m *memoMap[K, V]) isOwnResolution(c *Checker, k K) bool {
	f := c.currentResolution()
	return f.source == memoStateSource(m) && m.side.resolvingKeys[f.index] == k
}

func (m *memoMap[K, V]) stateAt(i int) *memoState {
	return m.state(m.side.resolvingKeys[i])
}

func (m *memoMap[K, V]) peekStateAt(i int) *memoState {
	return m.stateOf(m.side.resolvingKeys[i])
}

func (m *memoMap[K, V]) popState(i int) {
	if counts := m.side.resolvingCount; counts != nil {
		if i < resolvingCountMin/4 {
			m.side.resolvingCount = nil
		} else {
			for _, k := range m.side.resolvingKeys[i:] {
				// Keys are popped last in first out, so the first
				// occurrence is popped last.
				if o := counts[k]; o.count == 1 {
					delete(counts, k)
				} else {
					o.count--
					counts[k] = o
				}
			}
		}
	}
	clear(m.side.resolvingKeys[i:])
	m.side.resolvingKeys = m.side.resolvingKeys[:i]
	m.side.resolvingAt = m.side.resolvingAt[:i]
}

// Number of computations of a memo map in progress above which they are
// counted by key; see resolvingCount.
const resolvingCountMin = 64

type resolvingOccurrences struct {
	first int32 // Index in resolvingKeys of the first
	count int32
}

func (side *memoMapSide[K]) countAllResolving() {
	side.resolvingCount = make(map[K]resolvingOccurrences, 2*len(side.resolvingKeys))
	for i, k := range side.resolvingKeys {
		side.countResolving(k, i)
	}
}

func (side *memoMapSide[K]) countResolving(k K, i int) {
	o, ok := side.resolvingCount[k]
	if !ok {
		o.first = int32(i)
	}
	o.count++
	side.resolvingCount[k] = o
}

func (m *memoMap[K, V]) state(k K) *memoState {
	state := m.stateOf(k)
	if state == nil {
		s := m.sideTable()
		if s.memoStates == nil {
			s.memoStates = make(map[K]*memoState)
		}
		state = &memoState{}
		s.memoStates[k] = state
		if s.keyBits != nil {
			s.stateKeys.add(s.keyBits(k), s.memoStates, s.keyBits)
		}
	}
	return state
}

// memoSet tracks computations that run at most once per key, such as checks
// whose only results are diagnostics. Each run is a computation of its own, so
// skipping a key that already ran accounts for the effects of that run.
type memoSet[K comparable] struct {
	m memoMap[K, struct{}]
}

// hasCached reports whether k hasCached run; see memoMap.get.
func (s *memoSet[K]) hasCached(c *Checker, k K) bool {
	return s.m.hasCached(c, k)
}

// once runs fn unless k has run already. k is marked before fn runs, so fn
// does not run again if it re-enters.
func (s *memoSet[K]) once(c *Checker, k K, fn func()) {
	if s.m.hasCached(c, k) {
		return
	}
	s.m.begin(c, k)
	s.m.set(c, k, struct{}{})
	fn()
	c.endMemo()
}

// memoActive reports whether reading a cached result must account for its
// effects: false in a check with nothing pending.
func (c *Checker) memoActive() bool {
	return !c.checking || c.memoPendingCount|c.memoErrorStates != 0
}

// observing reports whether reading a cached result that cannot have errors
// to replay must account for its effects: memoActive, except for results
// with errors, which only memoReported and memoMap cache. It is kept in a
// field for the many reads that check it.
func (c *Checker) observing() bool {
	return c.observingMemos
}

// syncObserving updates observingMemos after a change to what it depends
// on: the checking flag or the counts it reads. The counts are shared with other checkers using the same
// store, but those only run while this one is not checking, and it syncs on
// starting to check.
func (c *Checker) syncObserving() {
	c.observingMemos = !c.checking || c.memoPendingCount != 0
}

// readsWithoutMemo reports whether a memoized computation identified by key,
// whose result is cached, can read it without beginning the memo: when no
// memo is active, the memo records and replays nothing, and the computation
// only reads, unless it re-enters itself in progress, with the result
// published before it is complete.
func (c *Checker) readsWithoutMemo(key memoKey) bool {
	if c.observing() {
		return false
	}
	_, resolving := c.resolving.get(key)
	return !resolving
}

// beginMemo is called on entry to a memoized function whose result for this
// input is cached in the memo state identified by key. It accounts for
// effects recorded by a previous computation of that result, and starts a
// resolution for this computation, which in a query records its effects. It
// must be matched by endMemo.
func (c *Checker) beginMemo(key memoKey) {
	resolving := c.beginResolving(key)
	c.appendResolution(key, nil, 0, int32(len(c.instantiationStack)))
	n := len(c.resolutions) - 1
	f := &c.resolutions[n]
	f.resolving = resolving
	if c.checking && c.memoPendingCount == 0 && c.memoTop|c.currentNodeResolution != 0 && !c.checkingRecords() {
		// beginCheckedMemo for the common case, without the calls. The memo
		// state of the result is looked up only if needed; see
		// resolutionState.
		f.memo = true
		f.prevMemo = int32(c.memoTop)
		f.entry = c.currentNode
		f.attachStart = int32(len(c.deferredAttach))
		c.memoTop = n + 1
		return
	}
	state := c.peekMemoState(key)
	if c.checking {
		if c.memoPendingCount != 0 {
			c.replayPending(state)
		}
		c.beginCheckedMemo(state)
		return
	}
	outer := c.resolvingIndex(key)
	if outer == len(c.resolutions) {
		outer = 0
	}
	c.beginState(state, outer)
}

// beginState is beginMemo for the memo state of a result, in a query. outer
// is 1 + the index in resolutions of the computation of the same result in
// progress, if this one re-enters it, or 0.
func (c *Checker) beginState(state *memoState, outer int) {
	if state != nil && state.pending != nil {
		c.observePending(state.pending)
	}
	c.startEffects(state)
	// Re-entering a computation in progress: the inner result is derived
	// from whatever in-progress marker the outer computation left behind.
	c.memoCycle(outer)
}

// startEffects starts recording the effects of the current resolution, which
// computes the result in state.
func (c *Checker) startEffects(state *memoState) {
	n := len(c.resolutions) - 1
	f := &c.resolutions[n]
	f.memo = true
	f.prevMemo = int32(c.memoTop)
	f.result = state
	f.entry = c.currentNode
	f.attachStart = int32(len(c.deferredAttach))
	if c.memoTop == 0 && c.currentNodeResolution == 0 {
		// A query made outside of checking: errors located at the current
		// node are located wherever checking reuses the result, so results
		// they depend on are discarded once the query finishes (see
		// reportAtCurrentNode), and every reuse computes them again. The
		// node's resolution is entered above the computation's resolution.
		debug.Assert(c.queryRoot == 0, "nested query")
		c.queryRoot = n + 1
		c.querySave = c.enterCurrentNode(c.currentNode)
	}
	c.memoTop = n + 1
}

// stopEffects stops recording the effects of the current resolution,
// returning it if it recorded them.
func (c *Checker) stopEffects() *resolution {
	n := len(c.resolutions) - 1
	if c.queryRoot == n && c.currentNodeResolution == n+1 {
		n--
		c.exitCurrentNode(c.querySave)
		c.queryRoot = 0
	}
	f := &c.resolutions[n]
	if !f.memo {
		return nil
	}
	c.memoTop = int(f.prevMemo)
	return f
}

func (c *Checker) memoState(key memoKey) *memoState {
	state := c.memoStates[key]
	if state == nil {
		if c.memoStates == nil {
			c.memoStates = make(map[memoKey]*memoState)
		}
		state = &memoState{}
		c.memoStates[key] = state
		c.stateFilter.add(memoKeyBits(key), c.memoStates, memoKeyBits)
	}
	return state
}

// stateKeyFilter is a filter of the keys of a map of memo states, given by
// well-mixed bits of each key, sized to the number of states so that it stays
// in cache: few results have a memo state.
type stateKeyFilter struct {
	words []uint64
	shift uint8 // 64 - log2 of the number of bits
}

// Bits per state below which the filter grows, keeping false positives
// to a few percent.
const stateFilterBitsPerState = 16

func memoKeyBits(key memoKey) uint64 {
	return uint64(key) * 0x9E3779B97F4A7C15
}

func (f *stateKeyFilter) mayContain(h uint64) bool {
	if f.words == nil {
		return false
	}
	i := h >> f.shift
	return f.words[i/64]&(1<<(i%64)) != 0
}

// add adds the key with bits h, which states has just been given a state
// for.
func (f *stateKeyFilter) add[K comparable](h uint64, states map[K]*memoState, keyBits func(K) uint64) {
	if n := 64 * len(f.words); n < stateFilterBitsPerState*len(states) {
		n = max(2*n, 1<<15)
		f.words = make([]uint64, n/64)
		f.shift = uint8(65 - bits.Len(uint(n)))
		for k := range states {
			f.set(keyBits(k))
		}
		return
	}
	f.set(h)
}

func (f *stateKeyFilter) set(h uint64) {
	i := h >> f.shift
	f.words[i/64] |= 1 << (i % 64)
}

const errorFilterBits = 12

type errorKeyFilter [1 << errorFilterBits / 64]uint64

func errorFilterIndex(key memoKey) uint64 {
	return uint64(key) * 0x9E3779B97F4A7C15 >> (64 - errorFilterBits)
}

// peekMemoState returns the memo state of the result identified by key, or
// nil if it has none, consulting a filter first since most results have none.
func (c *Checker) peekMemoState(key memoKey) *memoState {
	if !c.stateFilter.mayContain(memoKeyBits(key)) {
		return nil
	}
	return c.memoStates[key]
}

// memoAttach makes the result identified by key depend on the innermost
// computation in progress, unless that computation is the result's own.
func (c *Checker) memoAttach(key memoKey) {
	if c.memoTop == 0 || c.checking {
		return
	}
	if f := &c.resolutions[c.memoTop-1]; f.source == nil && f.key == key {
		return
	}
	if c.resolutions[c.memoTop-1].effects == nil && !c.logEffects() {
		// See attachState; the memo state is created only if needed.
		c.deferredAttach = append(c.deferredAttach, deferredAttachment{key: key})
		return
	}
	c.attachState(c.memoState(key))
}

// A deferredAttachment is a result cached by a computation that had no
// effects yet; see attachState. A result of a memo cell is identified by its
// key, so that its memo state is created only if needed.
type deferredAttachment struct {
	state *memoState
	key   memoKey
}

// attachState is memoAttach for the memo state of a result.
func (c *Checker) attachState(state *memoState) {
	n := c.memoTop - 1
	if n < 0 {
		return
	}
	if c.peekResolutionState(&c.resolutions[n]) == state {
		// Writers skip their own computation before creating its state, so
		// a state created later is never the computation's own.
		return
	}
	if c.resolutions[n].effects == nil && !c.logEffects() {
		// Until the computation has effects, the result depends on nothing,
		// and most computations never have any; memoEffectsAt attaches the
		// result if it gets some.
		c.deferredAttach = append(c.deferredAttach, deferredAttachment{state: state})
		return
	}
	c.linkState(state, c.memoEffectsAt(n), c.logResults())
}

// linkState makes the result in state depend on the effects f of the
// computation that cached it, logging the change in the discard log if log.
func (c *Checker) linkState(state *memoState, f *memoEffects, log bool) {
	if log {
		c.logPendingDiscard(state)
	}
	switch {
	case state.pending == nil:
		// Replaying f is replaying a set of deps holding only f.
		state.pending = f
		c.memoPendingCount++
		c.syncObserving()
		if c.recordingFromCheck {
			c.flushBuf = append(c.flushBuf, state)
		}
	case state.pending == f:
		// Already depends on f.
	case state.pending.entered:
		// The effects of a computation are shared with whatever else
		// depends on it, so they cannot gain a dependency of the result.
		deps := &memoEffects{}
		deps.addDep(state.pending)
		deps.addDep(f)
		state.pending = deps
	default:
		state.pending.addDep(f)
	}
}

// observeCell and attachCell are observeMemo and memoAttach for a memo at
// address p. They are kept out of line so that memo reads and writes are
// cheap enough to inline.
//
//go:noinline
func (c *Checker) observeCell(h *memoHeader) {
	c.observeMemo(h.key())
}

//go:noinline
func (c *Checker) attachCell(h *memoHeader) {
	c.memoAttach(h.key())
}

// observeMemo accounts for reading a memoized result without computing it.
func (c *Checker) observeMemo(key memoKey) {
	if !c.memoActive() {
		return
	}
	if c.checking && c.memoPendingCount == 0 {
		// Only reports are replayed, which few results have, so a filter
		// small enough to stay in cache rules out most.
		if i := errorFilterIndex(key); c.errorFilter[i/64]&(1<<(i%64)) == 0 {
			return
		}
	}
	// A computation in progress may not have a memo state yet; see
	// resolutionState.
	if state := c.peekMemoState(key); c.observeState(state) || state == nil && !c.checking && c.resolving.count != 0 {
		c.memoCycle(c.resolvingIndex(key))
	}
}

// observeState is observeMemo for the memo state of a result, if it has one.
// It reports whether the result is read in a query, in which case reading a
// computation in progress is left to the caller; see memoCycle.
func (c *Checker) observeState(state *memoState) bool {
	if state == nil {
		return false
	}
	if state.errors != nil {
		c.replayCurrentNodeErrors(*state.errors)
	}
	if c.checking {
		c.replayPending(state)
		return false
	}
	if state.pending != nil {
		c.observePending(state.pending)
	}
	return true
}

// observePending adds the effects of a reused result to the enclosing
// computation. Those of a computation started at no node are located where
// it is reused, so if that is not where the enclosing computation started,
// the node is kept with them; replay would otherwise locate them wherever the
// enclosing computation is reused.
func (c *Checker) observePending(pending *memoEffects) {
	parent := c.currentMemoEffects()
	if parent == nil {
		return
	}
	if c.currentNode != nil && c.currentNode != parent.entry && (!pending.entered || pending.entry == nil) {
		pending = &memoEffects{deps: []*memoEffects{pending}, entry: c.currentNode, entered: true}
	}
	parent.addDep(pending)
}

// A currentNodeError is an error reported at the current node; see
// reportAtCurrentNode. Replaying it reports the same *currentNodeError, so
// that reports collected more than once can be told apart from distinct ones.
type currentNodeError struct {
	report func(c *Checker, node *ast.Node)
}

type currentNodeErrorsMark struct {
	errors int
	cyclic bool
}

// currentNodeErrors are the errors a computation reported at the current
// node.
type currentNodeErrors struct {
	list   []*currentNodeError
	cyclic bool // Whether the computation observed a cycle, so computing it elsewhere may not report them
}

// startCurrentNodeErrors starts collecting the errors a computation reports
// at the current node, to be passed to endCurrentNodeErrors when it finishes.
func (c *Checker) startCurrentNodeErrors() currentNodeErrorsMark {
	c.currentNodeErrorCollectors++
	mark := currentNodeErrorsMark{len(c.currentNodeErrors), c.currentNodeErrorsCyclic}
	c.currentNodeErrorsCyclic = false
	return mark
}

// endCurrentNodeErrors returns the errors reported at the current node since
// mark.
func (c *Checker) endCurrentNodeErrors(mark currentNodeErrorsMark) currentNodeErrors {
	var r currentNodeErrors
	for _, report := range c.currentNodeErrors[mark.errors:] {
		// Reusing a result more than once reports its errors each time.
		if !slices.Contains(r.list, report) {
			r.list = append(r.list, report)
		}
	}
	// Which errors a cycle reports depends on where it is entered, so they
	// are only reported where the result is computed.
	r.cyclic = r.list != nil && c.currentNodeErrorsCyclic
	c.currentNodeErrorsCyclic = c.currentNodeErrorsCyclic || mark.cyclic
	c.currentNodeErrorCollectors--
	if c.currentNodeErrorCollectors == 0 {
		clear(c.currentNodeErrors)
		c.currentNodeErrors = c.currentNodeErrors[:0]
		c.currentNodeErrorsCyclic = false
	}
	return r
}

func (s *memoState) setErrors(c *Checker, reports []*currentNodeError) {
	switch {
	case s.errors == nil && reports != nil:
		c.memoErrorStates++
		c.syncObserving()
	case s.errors != nil && reports == nil:
		c.memoErrorStates--
		c.syncObserving()
	}
	if reports == nil {
		s.errors = nil
	} else {
		s.errors = &reports
	}
}

// replayCurrentNodeErrors reports at the current node the errors that
// computing a reused result reported at the node it was computed for.
//
//go:noinline
func (c *Checker) replayCurrentNodeErrors(reports []*currentNodeError) {
	for _, r := range reports {
		c.reportNode(r)
	}
}

func (c *Checker) replayPending(state *memoState) {
	if state != nil && state.pending != nil {
		if c.holdingEffects() {
			c.logPendingDiscard(state)
		}
		f := state.pending
		state.pending = nil
		c.memoPendingCount--
		c.syncObserving()
		c.replayMemo(f)
	}
}

// endMemo finishes a computation started by beginMemo, retaining its effects
// for replay by later reuse of the result. The effects also become part of
// the enclosing computation, since it observed the result.
func (c *Checker) endMemo() {
	n := len(c.resolutions) - 1
	if f := &c.resolutions[n]; f.memo && f.effects == nil && !f.fromCheck {
		// stopEffects and endResolution for the common case, without the
		// calls.
		c.memoTop = int(f.prevMemo)
		if f.resolving {
			c.resolving.delete(f.key)
		}
		if int(f.attachStart) != len(c.deferredAttach) {
			clear(c.deferredAttach[f.attachStart:])
			c.deferredAttach = c.deferredAttach[:f.attachStart]
		}
		if f.source != nil {
			f.source.popState(int(f.index))
		}
		c.dropResolution(n)
		return
	}
	if f := c.stopEffects(); f != nil && f.effects != nil {
		c.retainEffects(c.resolutionState(f), f.effects)
	}
	c.endResolution()
}

// markReadIncomplete marks the computations in progress above the one at
// index i, which is re-entered, as reading its incomplete result: either the
// in-progress marker of a circular computation or the part of a partial
// result published so far. What they compute from here on may be derived
// from it; see logResultDiscard.
func (c *Checker) markReadIncomplete(i int) {
	for j := i + 1; j < len(c.resolutions); j++ {
		c.resolutions[j].readIncomplete = true
	}
}

// endMemoUncached is endMemo for a computation that did not cache its result.
// Nothing can reuse the result, so its effects belong only to the enclosing
// computation, and retaining them for the result would grow them each time it
// is computed again.
func (c *Checker) endMemoUncached() {
	defer c.endResolution()
	res := c.stopEffects()
	c.forgetResult()
	if res == nil || res.effects == nil {
		return
	}
	f := res.effects
	if parent := c.currentMemoEffects(); parent != nil {
		if len(f.effects) == 0 && (f.rare == nil || len(f.rare.marks) == 0) && f.entry == parent.entry {
			// Without effects of its own, and located like the enclosing
			// computation, the computation adds nothing but what it observed.
			for _, d := range f.deps {
				parent.addDep(d)
			}
		} else {
			parent.addDep(f)
		}
	} else if c.recordingFromCheck {
		c.retainEffects(c.resolutionState(res), f)
	}
}

// resolutionState returns the memo state of the result a memo resolution
// computes, creating it on first use, since most computations have no
// effects to retain.
func (c *Checker) resolutionState(f *resolution) *memoState {
	if f.result == nil {
		switch {
		case f.source != nil:
			f.result = f.source.stateAt(int(f.index))
		case f.key != 0:
			f.result = c.memoState(f.key)
		default:
			// The computation caches no result; see forgetResult.
			f.result = &memoState{}
		}
	}
	return f.result
}

// peekResolutionState is resolutionState without creating the memo state,
// returning nil if the result has none yet.
func (c *Checker) peekResolutionState(f *resolution) *memoState {
	if f.result == nil {
		switch {
		case f.source != nil:
			f.result = f.source.peekStateAt(int(f.index))
		case f.key != 0:
			f.result = c.peekMemoState(f.key)
		}
	}
	return f.result
}

// retainEffects retains the effects of a computation that just finished for
// replay by later reuse of its result, and adds them to the enclosing
// computation.
func (c *Checker) retainEffects(state *memoState, f *memoEffects) {
	if state.pending != nil && len(f.effects) == 0 && state.pending.covers(f.deps) {
		// Computing the result again, typically to return it from a cache
		// that the computation reads, observed only what computing it
		// before did. Retaining that again would grow the effects of the
		// result each time.
		if parent := c.currentMemoEffects(); parent != nil {
			parent.addDep(state.pending)
		}
		return
	}
	if state.pending == nil && len(f.effects) == 0 && f.rare == nil && len(f.deps) == 1 && f.deps[0].entered && f.deps[0].entry == f.entry {
		// The computation only observed one result computed at the same
		// node, whose effects replay the same way without it.
		f = f.deps[0]
	}
	if c.logEffects() {
		c.logPendingDiscard(state)
	}
	if state.pending != nil {
		f.addDep(state.pending)
	} else {
		c.memoPendingCount++
		c.syncObserving()
		if c.recordingFromCheck {
			c.flushBuf = append(c.flushBuf, state)
		}
	}
	state.pending = f
	if parent := c.currentMemoEffects(); parent != nil {
		parent.addDep(f)
	}
}

func (c *Checker) replayMemo(f *memoEffects) {
	c.replayEffects(f, nil, false)
}

// replayEffects replays the effects of f and its dependencies. Effects
// located at the current node that a computation started with (see
// reportAtCurrentNode) are located at the node the reuse happens at instead,
// as they would be had the computation happened there, unless the computation
// started at a different node than the computation replaying it, which then
// fixes its location. Replaying f empties it, so that revisiting it through
// other dependencies replays nothing.
func (c *Checker) replayEffects(f *memoEffects, outerEntry *ast.Node, outerEntered bool) {
	effects, deps := f.effects, f.deps
	var marks []func(c *Checker)
	if f.rare != nil {
		marks = f.rare.marks
	}
	f.effects, f.deps, f.rare = nil, nil, nil
	saveCurrentNode := c.currentNode
	if f.entered {
		// A computation that started at no node can be located anywhere,
		// like one started at the node it is reused at.
		if outerEntered && f.entry != outerEntry && f.entry != nil {
			c.currentNode = f.entry
		}
		outerEntry, outerEntered = f.entry, true
	}
	if !f.dropped {
		for _, e := range effects {
			e(c)
		}
	}
	for _, m := range marks {
		m(c)
	}
	for _, d := range deps {
		c.replayEffects(d, outerEntry, outerEntered)
	}
	c.currentNode = saveCurrentNode
}

// atMemoStartNode reports whether the current node is the one the innermost
// computation in progress started with.
func (c *Checker) atMemoStartNode() bool {
	n := c.memoTop - 1
	return n >= 0 && c.resolutions[n].entry == c.currentNode
}

func (c *Checker) currentMemoEffects() *memoEffects {
	if c.memoTop == 0 {
		return nil
	}
	return c.memoEffectsAt(c.memoTop - 1)
}

// recordEffect records a side effect produced by a query against the
// innermost memoized computation, if any. Callers must only call this when
// !c.checking, and must not apply the effect themselves.
func (c *Checker) recordEffect(effect func(c *Checker)) {
	if f := c.currentMemoEffects(); f != nil {
		f.effects = append(f.effects, effect)
	}
}

// recordMark records mark, which writes a mark (see writesMarks), as an
// effect of the computation in progress that dropping its effects keeps.
func (c *Checker) recordMark(mark func(c *Checker)) {
	if f := c.currentMemoEffects(); f != nil {
		rare := f.rareFields()
		rare.marks = append(rare.marks, mark)
	}
}

// beginCheckedMemo is beginMemo for a computation started in a check. Its
// effects apply as they happen, and reading cached results accounts for
// nothing, as every effect only adds to what the store has collected, which
// is the same whichever check applies it first. Effects of results that a
// cycle or a discard mark may discard are the exception (see recordFromCheck),
// so a computation starting while one is in progress records them.
func (c *Checker) beginCheckedMemo(state *memoState) {
	c.startEffects(state)
	if c.checkingRecords() {
		c.recordFromCheck()
	}
}

// checkingRecords reports whether a check records the effects of what it
// computes rather than applying them, because a cycle or a discard mark in
// progress may discard it. A variance measurement that may be discarded
// does not make it record; see holdEffect.
func (c *Checker) checkingRecords() bool {
	return c.circularityStart != 0 || c.effectsMarkDepth != 0
}

// holdingEffects reports whether a check holds the effects it applies; see
// holdEffect.
func (c *Checker) holdingEffects() bool {
	return c.varianceCycleRoot != 0
}

// holdEffect holds an effect a check applies while a variance measurement in
// progress may still be discarded (see getRecursiveVariances), to apply it
// once nothing can discard it, unless what produced it is discarded first.
// Few measurements are discarded, so a check holds their effects rather
// than recording them with every result, which costs far more.
func (c *Checker) holdEffect(effect func(c *Checker)) {
	n := len(c.heldEffects)
	c.heldEffects = append(c.heldEffects, effect)
	c.logRestore(func() {
		clear(c.heldEffects[n:])
		c.heldEffects = c.heldEffects[:n]
	})
}

// applyHeldEffects applies the effects held by holdEffect above the floor
// (see trimDiscardLog), as the check that produced them would have.
func (c *Checker) applyHeldEffects() {
	effects := slices.Clone(c.heldEffects[c.heldEffectsFloor:])
	clear(c.heldEffects[c.heldEffectsFloor:])
	c.heldEffects = c.heldEffects[:c.heldEffectsFloor]
	saveChecking := c.checking
	c.checking = true
	c.syncObserving()
	for _, e := range effects {
		e(c)
	}
	c.checking = saveChecking
	c.syncObserving()
}

// recordFromCheck makes the outermost computation in progress in a check, if
// any, a query from here on, because a cycle or a discard mark begins, after which
// results and their effects may be discarded. Effects are then recorded with
// the results computed and with every result observing them, and are replayed
// when the outermost computation finishes (see endQueryFromCheck), so that
// those of discarded results apply only if a result that is kept observed
// them. The computations in progress applied their earlier effects already,
// which is right since they are kept: a cycle discards only what is computed
// after it is found, and a mark only what is computed after it is taken.
func (c *Checker) recordFromCheck() {
	if !c.checking || c.memoTop == 0 {
		return
	}
	debug.Assert(!c.recordingFromCheck, "recording from a check already recording")
	i := c.memoTop - 1
	for c.resolutions[i].prevMemo != 0 {
		i = int(c.resolutions[i].prevMemo) - 1
	}
	c.resolutions[i].fromCheck = true
	c.checking = false
	c.syncObserving()
	c.flushBuf = c.flushBuf[:0]
	c.recordingFromCheck = true
}

// endQueryFromCheck ends the query begun by recordFromCheck, replaying
// the effects of everything it computed in the check.
func (c *Checker) endQueryFromCheck() {
	if !c.recordingFromCheck {
		// The query already ended; see resumeChecking.
		return
	}
	states := c.flushBuf
	c.recordingFromCheck = false
	c.checking = true
	c.syncObserving()
	defer clear(states)
	c.replayFlushed(states)
}

func (c *Checker) replayFlushed(states []*memoState) {
	for _, state := range states {
		if state.pending != nil {
			if c.holdingEffects() {
				c.logPendingDiscard(state)
			}
			f := state.pending
			state.pending = nil
			c.memoPendingCount--
			c.syncObserving()
			c.replayEffects(f, c.currentNode, true)
		}
	}
}

// resumeChecking ends the query begun by recordFromCheck as soon as nothing
// computed since can be discarded: no cycle is in progress and no effects
// mark is held. Recording until the outermost computation finishes would be
// equivalent, but makes every read until then account for effects. What the
// query recorded applies now, as it would have in the check, including what
// the computations in progress recorded, which continue as in a check.
func (c *Checker) resumeChecking() {
	if c.checking || !c.recordingFromCheck || c.checkingRecords() || len(c.innerCycles) != 0 || len(c.discardLog) != 0 && !c.holdingEffects() {
		return
	}
	chain := c.resumeBuf[:0]
	for i := c.memoTop - 1; i >= 0; i = int(c.resolutions[i].prevMemo) - 1 {
		chain = append(chain, i)
	}
	saveCurrentNode := c.currentNode
	if len(chain) != 0 {
		root := &c.resolutions[chain[len(chain)-1]]
		root.fromCheck = false
		if root.entry != nil {
			// The effects apply as they would when the outermost computation
			// finishes, back at the node it started at.
			c.currentNode = root.entry
		}
	}
	states := c.flushBuf
	c.recordingFromCheck = false
	c.checking = true
	c.syncObserving()
	c.replayFlushed(states)
	clear(states)
	loc := c.currentNode
	for _, i := range slices.Backward(chain) {
		r := &c.resolutions[i]
		if f := r.effects; f != nil {
			r.effects = nil
			c.currentNode = loc
			c.replayEffects(f, loc, true)
		}
		if r.entry != nil {
			loc = r.entry
		}
	}
	c.currentNode = saveCurrentNode
	clear(chain)
	c.resumeBuf = chain[:0]
}

// withChecking runs fn in a check.
func (c *Checker) withChecking(fn func()) {
	// Checking starts only from top-level requests, so any resolution left at
	// this point was never exited and would absorb unrelated effects.
	debug.Assert(c.memoTop == 0, "memo resolution leaked")
	saveChecking := c.checking
	c.checking = true
	c.syncObserving()
	fn()
	c.checking = saveChecking
	c.syncObserving()
}

// memoCycle is called when a computation observes another computation that is
// still in progress, whose resolution is at index depth-1. Every computation
// started since then produced its result from the incomplete state of that
// computation, so reusing any of them must also replay the effects of the
// whole cycle (for example, its circularity error).
func (c *Checker) memoCycle(depth int) {
	if depth == 0 || !c.resolutions[depth-1].memo {
		// The outer computation does not record effects.
		return
	}
	var outer *memoEffects
	// A computation that depends on a cycle head depends on every computation
	// in progress above the head, as their effects become part of the head's.
	// So walk down from the top, stopping at a computation an earlier reentry
	// already made depend on outer or a head below it: the computations below
	// it were in progress then too, so they depend on that head as well.
	// Without this, every reentry of a cycle would walk, and grow, the whole
	// stack.
	head := depth - 1
	for i := len(c.resolutions) - 1; i >= depth; i-- {
		if !c.resolutions[i].memo {
			continue
		}
		if outer == nil {
			// Typically, the computation reads its own result, and no
			// computation in between depends on it.
			outer = c.memoEffectsAt(depth - 1)
		}
		f := c.memoEffectsAt(i)
		if f == outer || outer.parent == f {
			continue
		}
		if h := f.cycleHead(); h >= 0 && h <= head {
			break
		}
		if i < c.effectsMarkDepth-1 {
			// The resolution is in progress below the mark, so discarding to
			// the mark must also discard this dependency.
			c.logDepsDiscard(f)
		}
		rare := f.rareFields()
		rare.cycles = append(rare.cycles, memoCycleDep{dep: int32(len(f.deps)), head: int32(head)})
		f.deps = append(f.deps, outer)
		outer.parent = f
	}
}

// A memoCycleDep is a dependency memoCycle added on a cycle head.
type memoCycleDep struct {
	dep  int32 // Index in deps
	head int32 // Index of the head's resolution
}

// cycleHead returns the index of the resolution of the lowest cycle head that
// memoCycle made f depend on, or -1.
func (f *memoEffects) cycleHead() int {
	if f.rare == nil || len(f.rare.cycles) == 0 {
		return -1
	}
	return int(f.rare.cycles[len(f.rare.cycles)-1].head)
}

// logDepsDiscard logs the dependencies of a computation in progress below the
// innermost effects mark, which are about to grow, so discardSince can
// restore them.
//
//go:noinline
func (c *Checker) logDepsDiscard(f *memoEffects) {
	n := len(f.deps)
	c.discardLog = append(c.discardLog, discardEntry{effects: true, restore: func() {
		if len(f.deps) > n {
			f.truncateDeps(n)
		}
	}})
}

func (c *Checker) memoEffectsAt(i int) *memoEffects {
	f := c.resolutions[i].effects
	if f == nil {
		f = &memoEffects{entry: c.resolutions[i].entry, entered: true}
		c.resolutions[i].effects = f
		c.attachDeferred(i, f)
	}
	return f
}

// attachDeferred attaches the results the memo resolution at index i cached
// before it had effects f; see attachState. A result cached before an effects
// mark or a cycle is attached as if it had been attached then, so the discard
// log does not log it.
//
//go:noinline
func (c *Checker) attachDeferred(i int, f *memoEffects) {
	start := int(c.resolutions[i].attachStart)
	end := len(c.deferredAttach)
	for j := i + 1; j < len(c.resolutions); j++ {
		if c.resolutions[j].memo {
			end = int(c.resolutions[j].attachStart)
			break
		}
	}
	if start == end {
		return
	}
	for k := start; k < end; k++ {
		d := c.deferredAttach[k]
		c.deferredAttach[k] = deferredAttachment{}
		switch {
		case d.state != nil:
			c.linkState(d.state, f, false)
		case d.key != 0:
			c.linkState(c.memoState(d.key), f, false)
		}
	}
}

// Cycles
//
// A cached result must be the result of computing it from scratch, so that
// it does not depend on which computation happened to request it first. A
// computation that observes another computation still in progress (a
// circularity) sees a provisional state, so results cached from the moment
// the cycle is detected until the outermost computation of the cycle (its
// head) finishes may differ from computing them from scratch. Those results
// are discarded when the head finishes, and are recomputed when next
// requested. The computations that were in progress when the cycle was
// detected (its participants) are kept: each of them reaches the cycle when
// computed from scratch too, so each result is the fallback for a circularity
// whichever participant is computed first.
//
// Type comparisons are the exception: a comparison that reaches itself
// assumes it holds rather than being a circularity, since relations are
// coinductive. The Relater tracks those assumptions itself (see
// recursiveTypeRelatedTo), and caches only results that hold whatever they
// assumed. Each comparison is still a resolution, so circularities through
// other computations it needs are handled as above, discarding the relation
// results cached during them. A comparison that needs another relater, as in
// variance measurement, does not see the assumptions of the outer one, so it
// compares from scratch, as it would if run first.

// Discard log
//
// Some computations run provisionally, and may have to be discarded as if
// they had never run: those in a cycle (see above), and those a computation
// that retries from a mark runs before retrying (see markDiscard). While any
// of them is in progress, what they cache is logged in the discard log, from
// which each discards to the position where it started. The discard log is
// cleared once nothing in progress can discard.

type discardEntry struct {
	memo    *memoHeader  // The memo restored, or nil
	drop    *memoEffects // Effects to drop when discarded; see logResultDiscard
	restore func()
	effects bool // Restores the effects of a result rather than the result
}

// logResultDiscard appends a result restore entry to the discard log. If own,
// the innermost computation in progress computes the result, and if it read
// the incomplete result of a computation in progress (see markReadIncomplete)
// without reporting an error located at the current node, discarding the
// result also drops the computation's own effects: they may be derived from
// the incomplete result, so they would report errors that computing from
// complete results does not, while the results it reused are still replayed.
func (c *Checker) logResultDiscard(own bool, memo *memoHeader, restore func()) {
	var drop *memoEffects
	if own {
		if f := &c.resolutions[c.memoTop-1]; f.readIncomplete && !f.reportsAtCurrentNode {
			drop = f.effects
		}
	}
	c.discardLog = append(c.discardLog, discardEntry{memo: memo, drop: drop, restore: restore})
}

func (c *Checker) logMemoDiscard(memo *memoHeader, key memoKey, restore func()) {
	c.logResultDiscard(c.memoTop != 0 && c.resolutions[c.memoTop-1].source == nil && c.resolutions[c.memoTop-1].key == key, memo, restore)
}

// logResults reports whether caching a result must be logged in the discard
// log.
func (c *Checker) logResults() bool {
	return c.circularityStart != 0 || c.varianceCycleRoot != 0
}

// logEffects reports whether changing the effects of a result must be logged
// in the discard log.
func (c *Checker) logEffects() bool {
	return c.circularityStart != 0 || c.effectsMarkDepth != 0 || c.varianceCycleRoot != 0
}

// discardLogSince restores everything logged in the discard log since
// position start.
func (c *Checker) discardLogSince(start int) {
	start = min(start, len(c.discardLog))
	for i := range c.innerCycles {
		c.innerCycles[i].mark = min(c.innerCycles[i].mark, start)
	}
	for i := range c.varianceStack {
		c.varianceStack[i].discardLog = min(c.varianceStack[i].discardLog, start)
	}
	for i := len(c.discardLog) - 1; i >= start; i-- {
		if d := c.discardLog[i].drop; d != nil {
			d.dropped = true
		}
		c.discardLog[i].restore()
	}
	clear(c.discardLog[start:])
	c.discardLog = c.discardLog[:start]
}

// trimDiscardLog clears the discard log if nothing in progress can discard.
// While a variance measurement is measured again from the canonical entry of
// its circularity, the measurements in progress are hidden, but may still be
// discarded once it finishes, so the part of the log logged for them before
// it began is kept, with the effects a check held for them; see
// getVariancesWorker.
func (c *Checker) trimDiscardLog() {
	if !c.logEffects() && len(c.discardLog) > c.discardLogFloor {
		for i := range c.varianceStack {
			c.varianceStack[i].discardLog = min(c.varianceStack[i].discardLog, c.discardLogFloor)
		}
		clear(c.discardLog[c.discardLogFloor:])
		c.discardLog = c.discardLog[:c.discardLogFloor]
		if len(c.heldEffects) > c.heldEffectsFloor {
			c.applyHeldEffects()
		}
	}
}

// A flag memo is a cached result held outside a memo, so that it costs no
// space of its own: bits of a flags word shared with other results, or a
// field of storage allocated only when needed. It is accounted for like a
// memo under a key naming its entity and field. Readers finding it cached
// call observeFlagMemo; it is computed between beginMemo and endMemo for the
// key, and cached with setFlagMemoBits or setFlagMemoValue, or with
// setFlagMemo after logging how to discard it with logMemoDiscard.

// observeFlagMemo accounts for reading the flag memo identified by key.
func (c *Checker) observeFlagMemo(key memoKey) {
	if c.observing() {
		c.observeMemo(key)
	}
}

// setFlagMemo accounts for caching the result of the flag memo identified by
// key, as memo.set does.
func (c *Checker) setFlagMemo(key memoKey) {
	if !c.checking {
		c.memoAttach(key)
	}
}

// logRestore logs how to discard part of a result, or state derived from
// results, in the discard log; the caller checks logResults so that the
// closure is only allocated when needed.
//
//go:noinline
func (c *Checker) logRestore(restore func()) {
	c.discardLog = append(c.discardLog, discardEntry{restore: restore})
}

// objectFlagsKnown reports whether the flag memo of t whose result is cached
// once computed is set can be read without objectFlagsCell, which callers
// check first since objectFlagsCell is too large to inline.
func (c *Checker) objectFlagsKnown(t *Type, computed ObjectFlags) bool {
	return t.objectFlags&computed != 0 && !c.observingMemos
}

// objectFlagsCell returns the flags under value of t, a flag memo whose
// result is cached once the computed flag is set, computing them in a
// computation of their own if needed. With inProgress, the computed flag is
// set while computing, so that a computation re-entering it finds no flags.
func (c *Checker) objectFlagsCell(t *Type, field memoField, computed ObjectFlags, value ObjectFlags, inProgress bool, compute func() ObjectFlags) ObjectFlags {
	key := memoKeyOf(t, field)
	if t.objectFlags&computed != 0 {
		c.observeMemo(key)
		return t.objectFlags & value
	}
	c.beginMemo(key)
	if inProgress {
		setFlagMemoBits(c, key, &t.objectFlags, computed|value, computed)
	}
	result := compute() & value
	if inProgress || t.objectFlags&computed == 0 {
		setFlagMemoBits(c, key, &t.objectFlags, computed|value, computed|result)
	} else {
		result = t.objectFlags & value
	}
	c.endMemo()
	return result
}

// setFlagMemoBits caches the bits of *p under mask as the result of the flag
// memo identified by key.
func setFlagMemoBits[T ~uint32](c *Checker, key memoKey, p *T, mask T, bits T) {
	if c.logResults() {
		old := *p & mask
		c.logMemoDiscard(nil, key, func() { *p = *p&^mask | old })
	}
	*p = *p&^mask | bits&mask
	c.setFlagMemo(key)
}

// setFlagMemoValue caches v in *p as the result of the flag memo identified
// by key.
func (c *Checker) setFlagMemoValue[T any](key memoKey, p *T, v T) {
	if c.logResults() {
		old := *p
		c.logMemoDiscard(nil, key, func() { *p = old })
	}
	*p = v
	c.setFlagMemo(key)
}

// endCircularity discards the results cached since the outermost cycle in
// progress was detected, except those of its participants.
func (c *Checker) endCircularity() {
	mark := min(c.circularityMark, len(c.discardLog))
	c.circularityStart = 0
	c.circularityMark = 0
	c.innerCycles = c.innerCycles[:0]
	c.discardCycle(mark, false)
	c.cycleParticipants = nil
	c.trimDiscardLog()
	c.resumeChecking()
}

// discardCycle discards the results logged since mark, except those of the
// participants of the cycle in progress. If retain, the entries not undone
// stay in the log, as the outer cycle may still discard them.
func (c *Checker) discardCycle(mark int, retain bool) {
	undo := c.discardLog[mark:]
	participants := c.cycleParticipants
	keep := make(map[*memoHeader]struct{}, len(participants))
	for _, p := range participants {
		if p != nil {
			keep[p] = struct{}{}
		}
	}
	n := mark
	for i := len(undo) - 1; i >= 0; i-- {
		u := undo[i]
		if u.effects {
			// A result recomputed after the cycle also replays the effects
			// of the computation discarded here.
			continue
		}
		if _, ok := keep[u.memo]; ok && u.memo != nil {
			continue
		}
		if u.drop != nil {
			u.drop.dropped = true
		}
		u.restore()
		undo[i] = discardEntry{}
	}
	if retain {
		for _, u := range undo {
			if u.restore != nil {
				c.discardLog[n] = u
				n++
			}
		}
	}
	clear(c.discardLog[n:])
	c.discardLog = c.discardLog[:n]
}

// extendCircularity makes the resolution at index head-1 part of the cycle in
// progress, starting one if there is none. A cycle whose head is inside the
// one in progress is an inner cycle: what is computed from its head while it
// is incomplete is discarded when it finishes, as for the outermost, rather
// than read by the rest of the outer cycle.
func (c *Checker) extendCircularity(head int) {
	if c.typeResolutionTop != 0 {
		c.observedHead = minObservedHead(c.observedHead, int32(head))
	}
	c.recordFromCheck()
	switch {
	case c.circularityStart == 0:
		c.circularityMark = len(c.discardLog)
		c.circularityStart = head
	case head < c.circularityStart:
		c.addInnerCycle(c.circularityStart, c.circularityMark)
		c.circularityStart = head
	case head > c.circularityStart:
		c.addInnerCycle(head, len(c.discardLog))
	}
}

type innerCycle struct {
	head int // As Checker.circularityStart
	mark int // Length of the discard log when detected
}

func (c *Checker) addInnerCycle(head int, mark int) {
	for _, ic := range c.innerCycles {
		if ic.head == head {
			return
		}
	}
	c.innerCycles = append(c.innerCycles, innerCycle{head, mark})
}

// dropResolution removes the resolution at index n, the top of the stack, and
// ends the cycles it was the head of.
func (c *Checker) dropResolution(n int) {
	c.resolutions[n] = resolution{}
	c.resolutions = c.resolutions[:n]
	c.endCyclesAt(n)
}

// endCyclesAt ends the cycles whose head is the resolution at index n, which
// just finished.
func (c *Checker) endCyclesAt(n int) {
	if c.circularityStart > n {
		c.endCircularity()
	} else if len(c.innerCycles) != 0 {
		c.endInnerCycles(n)
	}
}

// endInnerCycles ends the inner cycles whose head is the resolution at index
// n, which just finished.
func (c *Checker) endInnerCycles(n int) {
	for i, ic := range slices.Backward(c.innerCycles) {
		if ic.head > n {
			c.innerCycles = slices.Delete(c.innerCycles, i, i+1)
			c.discardCycle(min(ic.mark, len(c.discardLog)), true)
		}
	}
}

// A discardMark is a position in the computation in progress to which it can
// discard, so that it can run again from the same state, as if what it
// computed since had never run. From markDiscard to releaseDiscardMark, the
// discard log logs all that may have to be discarded.
type discardMark struct {
	discardPoint
	effectsMarkDepth int // Checker.effectsMarkDepth to restore on release

	// The effects recorded so far by the innermost computation in progress,
	// which must have a memo resolution.
	recording       *memoEffects
	effects         int
	deps            int
	resolutionIndex int
}

func (c *Checker) markDiscard() discardMark {
	c.recordFromCheck()
	n := c.memoTop - 1
	f := c.memoEffectsAt(n)
	m := discardMark{
		discardPoint:     c.discardPoint(),
		effectsMarkDepth: c.effectsMarkDepth,
		recording:        f,
		effects:          len(f.effects),
		deps:             len(f.deps),
		resolutionIndex:  n,
	}
	c.effectsMarkDepth = n + 1
	return m
}

// discardSince discards the results cached since m, with the effects of
// computing them, restoring the cycle in progress then, and discards the
// effects recorded by the computation in progress.
func (c *Checker) discardSince(m discardMark) {
	c.discardTo(m.discardPoint)
	debug.Assert(c.memoTop-1 == m.resolutionIndex && c.resolutions[m.resolutionIndex].effects == m.recording, "effects discarded outside their computation")
	m.recording.truncate(m.effects, m.deps)
}

// A discardPoint is a position in the computation in progress to which what
// it caches since can be discarded.
type discardPoint struct {
	discardLog       int
	participants     int
	circularityStart int
}

func (c *Checker) discardPoint() discardPoint {
	return discardPoint{discardLog: len(c.discardLog), participants: len(c.cycleParticipants), circularityStart: c.circularityStart}
}

// discardTo discards the results cached since p, with the effects of
// computing them, restoring the cycle in progress then.
func (c *Checker) discardTo(p discardPoint) {
	c.discardLogSince(p.discardLog)
	c.cycleParticipants = c.cycleParticipants[:min(p.participants, len(c.cycleParticipants))]
	c.circularityStart = p.circularityStart
}

// truncate discards the effects recorded in f since it had the given numbers
// of effects and dependencies.
func (f *memoEffects) truncate(effects int, deps int) {
	clear(f.effects[effects:])
	f.effects = f.effects[:effects]
	f.truncateDeps(deps)
}

// releaseDiscardMark ends the period during which the computation in progress
// can discard to m.
func (c *Checker) releaseDiscardMark(m discardMark) {
	c.effectsMarkDepth = m.effectsMarkDepth
	c.trimDiscardLog()
	c.resumeChecking()
}

func (f *memoEffects) truncateDeps(n int) {
	for _, d := range f.deps[n:] {
		if d.parent == f {
			d.parent = nil
		}
	}
	clear(f.deps[n:])
	f.deps = f.deps[:n]
	if rare := f.rare; rare != nil {
		for len(rare.cycles) != 0 && int(rare.cycles[len(rare.cycles)-1].dep) >= n {
			rare.cycles = rare.cycles[:len(rare.cycles)-1]
		}
	}
}

// logPendingDiscard logs the effects of the result in the memo state, which
// are about to change, so discardSince can restore them.
//
//go:noinline
func (c *Checker) logPendingDiscard(state *memoState) {
	old := state.pending
	n := 0
	if old != nil {
		n = len(old.deps)
	}
	c.discardLog = append(c.discardLog, discardEntry{effects: true, restore: func() {
		switch {
		case old == nil && state.pending != nil:
			c.memoPendingCount--
			c.syncObserving()
		case old != nil && state.pending == nil:
			c.memoPendingCount++
			c.syncObserving()
		}
		state.pending = old
		// Only a set of deps (see linkState) gains deps through its state.
		if old != nil && !old.entered && len(old.deps) > n {
			old.truncateDeps(n)
		}
	}})
}

// Instantiation limits
//
// Instantiation stops with an error when nested too deeply or after too
// many instantiations, as the instantiation is then very likely infinite.
// For the result not to depend on what was cached before, each memoized
// computation (including each cached comparison of two types) measures
// depth from where it started, whether or not it reports errors, and a
// reused result adds no depth. Chains that start a new memoized computation
// at every level are only stopped by a much larger limit on the whole
// outermost instantiation, which is only reached by runaway instantiations,
// and which does depend on what was cached before.
//
// The limit on the number of instantiations is likewise only reached by
// runaway instantiations, and depends on what was cached before: it counts
// the instantiations performed since the start of the current statement or
// expression, or of the outermost computation in progress, and reused
// results add none. Making it independent would mean
// keeping, for every cached result, the work needed to compute it from
// scratch, which costs far more than the limit is worth.

const (
	instantiationDepthLimit      = 100
	instantiationTotalDepthLimit = 200
	instantiationCountLimit      = 5_000_000
)

func (c *Checker) instantiationDepthLimitReached() bool {
	depth := len(c.instantiationStack)
	return depth-int(c.currentResolution().depthStart) == instantiationDepthLimit || depth == instantiationTotalDepthLimit
}

// A Relation caches the results of comparisons.
type Relation struct {
	results memoMap[CacheHashKey, RelationComparisonResult]
}

func (r *Relation) size() int {
	return len(r.results.memoEntries)
}

func (r *Relation) cached(c *Checker, key CacheHashKey) RelationComparisonResult {
	result, _ := r.results.cached(c, key)
	return result
}

func (r *Relation) set(c *Checker, key CacheHashKey, result RelationComparisonResult) {
	r.results.set(c, key, result)
}

// begin starts the comparison computing the result for key.
func (r *Relation) begin(c *Checker, key CacheHashKey) {
	r.results.begin(c, key)
}
