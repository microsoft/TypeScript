package checker

import (
	"iter"
	"maps"
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
// solely to the query and are discarded.

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
	memoTypeAlias
	memoEnumMemberValue
	memoBaseConstraint
	memoAccessorType
	memoRegularExpression
	memoContextualParameters
	memoContextChecked
	memoInitializerIsUndefined
	memoFlowExpressionType
	memoFlowLoopType
	memoJsxImplicitImportContainer
	memoModuleExports
	memoInstantiationExpressionType
	memoRelationOverflow
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
	// The computation publishes a partial result before it finishes, and
	// re-entry observes that partial result. Results derived from it may
	// differ depending on which computation starts first.
	reentryPartial
)

// memoReentry is the re-entry policy of each kind of computation.
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
	// into a pointer except by symbol, whose entity outlives the key.
	return memoKey(uint64(uintptr(unsafe.Pointer(entity)))<<8 | uint64(field))
}

type memoEffects struct {
	effects  []func(c *Checker)
	marks    []*ast.Symbol // Aliases marked referenced, also among effects; see withReferenceMarks
	deps     []*memoEffects
	parent   *memoEffects // Resolution d was most recently added to; avoids duplicate deps
	entry    *ast.Node    // Current node when the computation started, if entered
	entered  bool         // Whether this is the resolution of a computation, not just a set of deps
	replayed bool
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
	pending *memoEffects        // Effects not yet replayed by a check
	errors  []*currentNodeError // Errors the computation reported at the current node; see setReported
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

// get returns the cached result, accounting for the effects of computing it.
func (m *memo[T]) get(c *Checker) T {
	if c.memoActive() {
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
// stale reports as no longer in progress is cleared instead.
func (m *memo[T]) setAfterMarker(c *Checker, v T, stale func(T) bool) {
	n := len(c.discardLog)
	m.set(c, v)
	if len(c.discardLog) > n {
		restore := c.discardLog[n].restore
		c.discardLog[n].restore = func() {
			restore()
			if stale(m.memoValue) {
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

// setReported is setIdentity for a result whose computation collected errors
// reported at the current node, as returned by endCurrentNodeErrors. Every
// node reusing the result reports them again, as it would had it computed the
// result itself. If computing the result elsewhere may not report them (see
// endCurrentNodeErrors), it is instead discarded with other results cached
// for the current node.
func (m *memo[T]) setReported(c *Checker, v T, r currentNodeErrors) {
	if r.cyclic {
		if c.logResults() {
			m.logDiscard(c)
		}
		r.list = nil
	}
	m.setIdentity(c, v)
	if r.list != nil || c.memoErrorStates != 0 && c.memoStates[m.key()] != nil {
		c.memoState(m.key()).setErrors(c, r.list)
	}
}

//go:noinline
func (m *memo[T]) logDiscard(c *Checker) {
	old := m.memoValue
	c.discardLog = append(c.discardLog, discardEntry{&m.memoHeader, func() {
		m.memoValue = old
	}, false})
}

// peek returns the cached result without accounting for effects. It is only
// for a result whose computation is in progress, where reading it does not
// observe it.
func (m *memo[T]) peek() T {
	return m.memoValue
}

// exchange replaces the cached result without accounting for effects. It is
// only for speculative computations that restore the previous result after.
func (m *memo[T]) swap(v T) T {
	old := m.memoValue
	m.memoValue = v
	return old
}

// init sets the result of a cell whose owner is being created. Nothing can
// observe the owner before its creator returns it, so the result needs no
// dependency of its own.
func (m *memo[T]) intern(v T) {
	m.memoValue = v
}

// enter starts the computation of the result; see beginMemo.
func (m *memo[T]) begin(c *Checker) {
	c.beginMemo(m.key())
}

// memoCompute returns the result cached in m, computing it in a computation
// of its own if there is none. A result cached while computing it, by a
// computation that re-entered it, is kept.
func (c *Checker) memoCompute[T comparable](m *memo[T], compute func() T) T {
	var zero T
	if v := m.get(c); v != zero {
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

// memoMap is a map of cached results, each accounted for like a memo. The
// entries are only accessible through methods. Memo state is kept per entry
// in a side map allocated on first use by a query.
//
// An entry should be computed between enter and endMemo, so that reusing it
// replays the effects of computing that entry alone. An entry set outside its
// own computation depends on the whole enclosing computation instead.
type memoMap[K comparable, V any] struct {
	_             memoNoCopy
	memoEntries   map[K]V
	memoStates    map[K]*memoState
	resolvingKeys []K // Keys of computations in progress without a memo state yet
}

// get returns the cached result for k, accounting for the effects of
// computing it.
func (m *memoMap[K, V]) get(c *Checker, k K) (V, bool) {
	if m.memoStates != nil && c.memoActive() {
		m.observe(c, k)
	}
	v, ok := m.memoEntries[k]
	return v, ok
}

// peek returns the cached result for k without observing it, for results
// that are interned and never change.
func (m *memoMap[K, V]) peek(k K) (V, bool) {
	v, ok := m.memoEntries[k]
	return v, ok
}

// observe is the out of line part of get, keeping get cheap enough to inline.
//
//go:noinline
func (m *memoMap[K, V]) observe(c *Checker, k K) {
	if c.observeState(m.memoStates[k]) {
		c.memoCycle(m.resolvingIndex(c, k))
	}
}

// has reports whether a result is cached for k; see get.
func (m *memoMap[K, V]) has(c *Checker, k K) bool {
	_, ok := m.get(c, k)
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
	c.discardLog = append(c.discardLog, discardEntry{nil, func() {
		if ok {
			m.memoEntries[k] = old
		} else {
			delete(m.memoEntries, k)
		}
	}, false})
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
	if r.list != nil || c.memoErrorStates != 0 && m.memoStates[k] != nil {
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
	if c.memoTop != 0 {
		c.attachState(m.state(k))
	}
}

// intern caches a result constructed from the inputs in k alone, without
// consulting any cached result, so computing it has no effects to account for.
func (m *memoMap[K, V]) intern(k K, v V) {
	if m.memoEntries == nil {
		m.memoEntries = make(map[K]V)
	}
	m.memoEntries[k] = v
}

// compute computes and caches the result for k in a computation of its own.
func (m *memoMap[K, V]) compute(c *Checker, k K, fn func() V) V {
	m.begin(c, k)
	v := fn()
	m.set(c, k, v)
	c.endMemo()
	return v
}

// enter starts the computation of the result for k; see beginMemo.
func (m *memoMap[K, V]) begin(c *Checker, k K) {
	outer := m.resolvingIndex(c, k)
	if outer != 0 {
		// Re-entering an entry marks the cycle circular; see reentryCircular.
		c.markCircular(outer - 1)
	}
	m.resolvingKeys = append(m.resolvingKeys, k)
	c.beginResolution(0, m, len(m.resolvingKeys)-1)
	if c.checking {
		if c.memoPendingCount != 0 && m.memoStates != nil {
			c.replayPending(m.memoStates[k])
		}
		return
	}
	c.beginState(m.state(k), outer)
}

// resolvingIndex returns 1 + the index in resolutions of the computation of
// the entry for k in progress, or 0.
func (m *memoMap[K, V]) resolvingIndex(c *Checker, k K) int {
	i := slices.Index(m.resolvingKeys, k)
	if i < 0 {
		return 0
	}
	for j := len(c.resolutions) - 1; j >= 0; j-- {
		if f := &c.resolutions[j]; f.source == memoStateSource(m) && int(f.index) == i {
			return j + 1
		}
	}
	panic("entry in progress without a resolution")
}

func (m *memoMap[K, V]) popState(i int) {
	clear(m.resolvingKeys[i:])
	m.resolvingKeys = m.resolvingKeys[:i]
}

func (m *memoMap[K, V]) state(k K) *memoState {
	state := m.memoStates[k]
	if state == nil {
		if m.memoStates == nil {
			m.memoStates = make(map[K]*memoState)
		}
		state = &memoState{}
		m.memoStates[k] = state
	}
	return state
}

// memoSet tracks computations that run at most once per key, such as checks
// whose only results are diagnostics. Each run is a computation of its own, so
// skipping a key that already ran accounts for the effects of that run.
type memoSet[K comparable] struct {
	m memoMap[K, struct{}]
}

// has reports whether k has run; see memoMap.get.
func (s *memoSet[K]) has(c *Checker, k K) bool {
	return s.m.has(c, k)
}

// once runs fn unless k has run already. k is marked before fn runs, so fn
// does not run again if it re-enters.
func (s *memoSet[K]) once(c *Checker, k K, fn func()) {
	if s.m.has(c, k) {
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

// beginMemo is called on entry to a memoized function whose result for this
// input is cached in the memo state identified by key. It accounts for
// effects recorded by a previous computation of that result, and starts a
// resolution for this computation, which in a query records its effects. It
// must be matched by endMemo.
func (c *Checker) beginMemo(key memoKey) {
	c.beginResolution(key, nil, 0)
	if c.checking {
		if c.memoPendingCount != 0 {
			c.replayPending(c.memoStates[key])
		}
		return
	}
	outer := c.resolvingIndex(key)
	if outer == len(c.resolutions) {
		outer = 0
	}
	c.beginState(c.memoState(key), outer)
}

// beginState is beginMemo for the memo state of a result, in a query. outer
// is 1 + the index in resolutions of the computation of the same result in
// progress, if this one re-enters it, or 0.
func (c *Checker) beginState(state *memoState, outer int) {
	if state.pending != nil {
		if parent := c.currentMemoEffects(); parent != nil {
			parent.addDep(state.pending)
		}
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
	if c.memoTop == 0 && c.currentNodeResolution == 0 {
		// A query made outside of checking: errors located at the current
		// node are located wherever checking reuses the result, so results
		// they depend on are discarded once the query finishes (see
		// reportAtCurrentNode), and every reuse computes them again. The
		// node's resolution is entered above the computation's resolution.
		f.isQuery = true
		query := c.enterCurrentNode(c.currentNode)
		c.resolutions[n].query = query
	}
	c.memoTop = n + 1
}

// stopEffects stops recording the effects of the current resolution,
// returning it if it recorded them.
func (c *Checker) stopEffects() *resolution {
	n := len(c.resolutions) - 1
	if c.resolutions[n].isTypeResolution {
		n--
		debug.Assert(c.resolutions[n].isQuery, "resolution left on the stack")
		c.exitCurrentNode(c.resolutions[n].query)
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
	}
	return state
}

// memoAttach makes the result identified by key depend on the innermost
// computation in progress, unless that computation is the result's own.
func (c *Checker) memoAttach(key memoKey) {
	if c.memoTop == 0 {
		return
	}
	c.attachState(c.memoState(key))
}

// attachState is memoAttach for the memo state of a result.
func (c *Checker) attachState(state *memoState) {
	n := c.memoTop - 1
	if n < 0 {
		return
	}
	if c.resolutions[n].result == state {
		return
	}
	f := c.memoEffectsAt(n)
	if c.logResults() {
		c.logPendingDiscard(state)
	}
	if state.pending == nil {
		state.pending = &memoEffects{}
		c.memoPendingCount++
		if c.flushStates != nil {
			*c.flushStates = append(*c.flushStates, state)
		}
	}
	state.pending.addDep(f)
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
	if c.observeState(c.memoStates[key]) {
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
		c.replayCurrentNodeErrors(state.errors)
	}
	if c.checking {
		c.replayPending(state)
		return false
	}
	if state.pending != nil {
		if parent := c.currentMemoEffects(); parent != nil {
			parent.addDep(state.pending)
		}
	}
	return true
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
	case s.errors != nil && reports == nil:
		c.memoErrorStates--
	}
	s.errors = reports
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
		f := state.pending
		state.pending = nil
		c.memoPendingCount--
		c.replayMemo(f)
	}
}

// endMemo finishes a computation started by beginMemo, retaining its effects
// for replay by later reuse of the result. The effects also become part of
// the enclosing computation, since it observed the result.
func (c *Checker) endMemo() {
	if f := c.stopEffects(); f != nil && f.effects != nil {
		c.retainEffects(f.result, f.effects)
	}
	c.endResolution()
}

// endMemoUncached is endMemo for a computation that did not cache its result.
// Nothing can reuse the result, so its effects belong only to the enclosing
// computation, and retaining them for the result would grow them each time it
// is computed again.
func (c *Checker) endMemoUncached() {
	defer c.endResolution()
	res := c.stopEffects()
	if res == nil || res.effects == nil {
		return
	}
	state, f := res.result, res.effects
	if parent := c.currentMemoEffects(); parent != nil {
		if len(f.effects) == 0 && f.entry == parent.entry {
			// Without effects of its own, and located like the enclosing
			// computation, the computation adds nothing but what it observed.
			for _, d := range f.deps {
				parent.addDep(d)
			}
		} else {
			parent.addDep(f)
		}
	} else if c.flushStates != nil {
		// withoutChecking replays effects through the results computed.
		c.retainEffects(state, f)
	}
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
	if c.logEffects() {
		c.logPendingDiscard(state)
	}
	if state.pending != nil {
		f.addDep(state.pending)
	} else {
		c.memoPendingCount++
		if c.flushStates != nil {
			*c.flushStates = append(*c.flushStates, state)
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
// fixes its location.
func (c *Checker) replayEffects(f *memoEffects, outerEntry *ast.Node, outerEntered bool) {
	if f.replayed {
		return
	}
	f.replayed = true
	saveCurrentNode := c.currentNode
	if f.entered {
		// A computation that started at no node can be located anywhere,
		// like one started at the node it is reused at.
		if outerEntered && f.entry != outerEntry && f.entry != nil {
			c.currentNode = f.entry
		}
		outerEntry, outerEntered = f.entry, true
	}
	for _, e := range f.effects {
		e(c)
	}
	for _, d := range f.deps {
		c.replayEffects(d, outerEntry, outerEntered)
	}
	c.currentNode = saveCurrentNode
	f.effects = nil
	f.deps = nil
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

// recordReferenceMark records marking an alias referenced, an effect that
// emit applies itself (see withReferenceMarks).
func (c *Checker) recordReferenceMark(symbol *ast.Symbol) {
	if f := c.currentMemoEffects(); f != nil {
		f.effects = append(f.effects, func(c *Checker) { c.markAliasSymbolAsReferenced(symbol) })
		f.marks = append(f.marks, symbol)
	}
}

// withReferenceMarks runs fn as a query, then marks referenced the aliases
// that everything fn computed would mark, which emit relies on to elide
// imports. Unlike checking, it reports nothing, so diagnostics do not depend
// on whether a file was emitted before it was checked. Other effects stay
// pending for checking to replay.
func (c *Checker) withReferenceMarks(fn func()) {
	debug.Assert(!c.checking && c.memoTop == 0, "withReferenceMarks inside a computation")
	c.beginResolution(0, nil, 0)
	c.startEffects(&memoState{})
	fn()
	f := c.stopEffects().effects
	c.endResolution()
	if f == nil {
		return
	}
	var marks []*ast.Symbol
	visited := make(map[*memoEffects]struct{})
	var collect func(f *memoEffects)
	collect = func(f *memoEffects) {
		if _, ok := visited[f]; ok {
			return
		}
		visited[f] = struct{}{}
		marks = append(marks, f.marks...)
		for _, d := range f.deps {
			collect(d)
		}
	}
	collect(f)
	for _, symbol := range marks {
		c.withReferenceMarks(func() { c.referenceAliasSymbol(symbol) })
	}
}

// withoutChecking runs fn in a query from a check, then replays the effects
// of everything fn computed, as if fn had run in the check. Unlike effects
// applied directly, recorded effects can be discarded with the results they
// belong to.
func (c *Checker) withoutChecking(fn func()) {
	debug.Assert(c.checking && c.flushStates == nil, "withoutChecking outside a check")
	saveMemoTop := c.memoTop
	var states []*memoState
	c.checking = false
	c.memoTop = 0
	c.flushStates = &states
	fn()
	c.flushStates = nil
	c.checking = true
	c.memoTop = saveMemoTop
	// Replaying is in order of computation, so effects apply in the order
	// they would have in the check. They also happened at the current node,
	// so only the effects of computations started there are located at it.
	for _, state := range states {
		if state.pending != nil {
			f := state.pending
			state.pending = nil
			c.memoPendingCount--
			c.replayEffects(f, c.currentNode, true)
		}
	}
}

// withChecking runs fn in a check.
func (c *Checker) withChecking(fn func()) {
	// Checking starts only from top-level requests, so any resolution left at
	// this point was never exited and would absorb unrelated effects.
	debug.Assert(c.memoTop == 0, "memo resolution leaked")
	saveChecking := c.checking
	c.checking = true
	fn()
	c.checking = saveChecking
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
	outer := c.memoEffectsAt(depth - 1)
	for i := depth; i < len(c.resolutions); i++ {
		if !c.resolutions[i].memo {
			continue
		}
		f := c.memoEffectsAt(i)
		if i < c.effectsMarkDepth-1 && f != outer && outer.parent != f {
			// The resolution is in progress below the mark, so discarding to
			// the mark must also discard this dependency.
			c.logDepsDiscard(f)
		}
		f.addDep(outer)
	}
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
	}
	return f
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

// Discard log
//
// Some computations run provisionally, and may have to be discarded as if
// they had never run: those in a cycle (see above), and those a computation
// that retries from a mark runs before retrying (see markDiscard). While any
// of them is in progress, what they cache is logged in the discard log, from
// which each discards to the position where it started. The discard log is
// cleared once nothing in progress can discard.

type discardEntry struct {
	memo    *memoHeader // The memo restored, or nil
	restore func()
	effects bool // Restores the effects of a result rather than the result
}

// logResults reports whether caching a result must be logged in the discard
// log.
func (c *Checker) logResults() bool {
	return c.circularityStart != 0
}

// logEffects reports whether changing the effects of a result must be logged
// in the discard log.
func (c *Checker) logEffects() bool {
	return c.circularityStart != 0 || c.effectsMarkDepth != 0
}

// discardLogSince restores everything logged in the discard log since
// position start.
func (c *Checker) discardLogSince(start int) {
	start = min(start, len(c.discardLog))
	for i := len(c.discardLog) - 1; i >= start; i-- {
		c.discardLog[i].restore()
	}
	clear(c.discardLog[start:])
	c.discardLog = c.discardLog[:start]
}

// trimDiscardLog clears the discard log if nothing in progress can discard.
func (c *Checker) trimDiscardLog() {
	if !c.logEffects() && len(c.discardLog) != 0 {
		clear(c.discardLog)
		c.discardLog = c.discardLog[:0]
	}
}

// A flag memo is a cached result held outside a memo, so that it costs no
// space of its own: bits of a flags word shared with other results, or a
// field of storage allocated only when needed. It is accounted for like a
// memo under a key naming its entity and field. Readers finding it cached
// call observeFlagMemo; it is computed between beginMemo and endMemo for the
// key, and cached with setFlagMemoBits, or with setFlagMemo after logging how
// to discard it with logFlagMemoDiscard.

// observeFlagMemo accounts for reading the flag memo identified by key.
func (c *Checker) observeFlagMemo(key memoKey) {
	if c.memoActive() {
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

// logFlagMemoDiscard logs how to discard the result of a flag memo in the
// discard log; the caller checks logResults so that the closure is only
// allocated when needed.
//
//go:noinline
func (c *Checker) logFlagMemoDiscard(restore func()) {
	c.discardLog = append(c.discardLog, discardEntry{nil, restore, false})
}

// objectFlagsCell returns the flags under value of t, a flag memo whose
// result is cached once the computed flag is set, computing them in a
// computation of their own if needed. With inProgress, the computed flag is
// set while computing, so that a computation re-entering it finds no flags.
func (c *Checker) objectFlagsCell(t *Type, field memoField, computed ObjectFlags, value ObjectFlags, inProgress bool, compute func() ObjectFlags) ObjectFlags {
	key := memoKeyOf(t, field)
	if t.objectFlags&computed != 0 {
		c.observeFlagMemo(key)
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
		c.logFlagMemoDiscard(func() { *p = *p&^mask | old })
	}
	*p = *p&^mask | bits&mask
	c.setFlagMemo(key)
}

// endCircularity discards the results cached since the outermost cycle in
// progress was detected, except those of its participants.
func (c *Checker) endCircularity() {
	mark := min(c.circularityMark, len(c.discardLog))
	undo := c.discardLog[mark:]
	participants := c.cycleParticipants
	c.circularityStart = 0
	c.cycleParticipants = nil
	keep := make(map[*memoHeader]struct{}, len(participants))
	for i := range participants {
		if p := c.typeResolutionMemo(&participants[i]); p != nil {
			keep[p] = struct{}{}
		}
	}
	for _, u := range slices.Backward(undo) {
		if u.effects {
			// A result recomputed after the cycle also replays the effects
			// of the computation discarded here.
			continue
		}
		if _, ok := keep[u.memo]; ok && u.memo != nil {
			continue
		}
		u.restore()
	}
	clear(undo)
	c.discardLog = c.discardLog[:mark]
	c.trimDiscardLog()
}

// extendCircularity makes the resolution at index head-1 part of the cycle in
// progress, starting one if there is none.
func (c *Checker) extendCircularity(head int) {
	if c.circularityStart == 0 {
		c.circularityMark = len(c.discardLog)
		c.circularityStart = head
	} else if head < c.circularityStart {
		c.circularityStart = head
	}
}

// A discardMark is a position in the computation in progress to which it can
// discard, so that it can run again from the same state, as if what it
// computed since had never run. From markDiscard to releaseDiscardMark, the
// discard log logs all that may have to be discarded.
type discardMark struct {
	discardLog       int
	participants     int
	circularityStart int
	effectsMarkDepth int // Checker.effectsMarkDepth to restore on release

	// The effects recorded so far by the innermost computation in progress,
	// which must have a memo resolution.
	recording       *memoEffects
	effects         int
	deps            int
	resolutionIndex int
}

func (c *Checker) markDiscard() discardMark {
	n := c.memoTop - 1
	f := c.memoEffectsAt(n)
	m := discardMark{
		discardLog:       len(c.discardLog),
		participants:     len(c.cycleParticipants),
		circularityStart: c.circularityStart,
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
	c.discardLogSince(m.discardLog)
	c.cycleParticipants = c.cycleParticipants[:min(m.participants, len(c.cycleParticipants))]
	c.circularityStart = m.circularityStart
	debug.Assert(c.memoTop-1 == m.resolutionIndex && c.resolutions[m.resolutionIndex].effects == m.recording, "effects discarded outside their computation")
	f := m.recording
	clear(f.effects[m.effects:])
	f.effects = f.effects[:m.effects]
	f.truncateDeps(m.deps)
}

// releaseDiscardMark ends the period during which the computation in progress
// can discard to m.
func (c *Checker) releaseDiscardMark(m discardMark) {
	c.effectsMarkDepth = m.effectsMarkDepth
	c.trimDiscardLog()
}

func (f *memoEffects) truncateDeps(n int) {
	for _, d := range f.deps[n:] {
		if d.parent == f {
			d.parent = nil
		}
	}
	clear(f.deps[n:])
	f.deps = f.deps[:n]
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
		case old != nil && state.pending == nil:
			c.memoPendingCount++
		}
		state.pending = old
		if old != nil && len(old.deps) > n {
			old.truncateDeps(n)
		}
	}})
}

// typeResolutionMemo returns the address of the memo caching the result of
// a type resolution, or nil if it is not cached in a memo.
func (c *Checker) typeResolutionMemo(r *TypeResolution) *memoHeader {
	switch r.propertyName {
	case TypeSystemPropertyNameType:
		return &c.valueSymbolLinks.Get(r.target.(*ast.Symbol)).resolvedType.memoHeader
	case TypeSystemPropertyNameDeclaredType:
		return &c.typeAliasLinks.Get(r.target.(*ast.Symbol)).declaredType.memoHeader
	case TypeSystemPropertyNameResolvedTypeArguments:
		return &r.target.(*Type).AsTypeReference().resolvedTypeArguments.memoHeader
	case TypeSystemPropertyNameResolvedBaseTypes:
		return &r.target.(*Type).AsInterfaceType().resolvedBaseTypes.memoHeader
	case TypeSystemPropertyNameResolvedBaseConstructorType:
		return &r.target.(*Type).AsInterfaceType().resolvedBaseConstructorType.memoHeader
	case TypeSystemPropertyNameResolvedReturnType:
		return &r.target.(*Signature).resolvedReturnType.memoHeader
	case TypeSystemPropertyNameResolvedBaseConstraint:
		return &r.target.(*Type).AsConstrainedType().resolvedBaseConstraint.memoHeader
	case TypeSystemPropertyNameWriteType:
		if extra := c.valueSymbolLinks.Get(r.target.(*ast.Symbol)).extra; extra != nil {
			return &extra.writeType.memoHeader
		}
	case TypeSystemPropertyNameAliasTarget:
		return &c.aliasSymbolLinks.Get(r.target.(*ast.Symbol)).aliasTarget.memoHeader
	case TypeSystemPropertyNameComputedPropertyName:
		return &c.typeNodeLinks.Get(r.target.(*ast.Node)).resolvedType.memoHeader
	case TypeSystemPropertyNameVariances:
		return &c.varianceLinks.Get(r.target.(*ast.Symbol)).variances.memoHeader
	}
	return nil
}
