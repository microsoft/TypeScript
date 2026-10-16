package ast

import "unsafe"

// FlowFlags

type FlowFlags uint32

const (
	FlowFlagsUnreachable    FlowFlags = 1 << 0  // Unreachable code
	FlowFlagsStart          FlowFlags = 1 << 1  // Start of flow graph
	FlowFlagsBranchLabel    FlowFlags = 1 << 2  // Non-looping junction
	FlowFlagsLoopLabel      FlowFlags = 1 << 3  // Looping junction
	FlowFlagsAssignment     FlowFlags = 1 << 4  // Assignment
	FlowFlagsTrueCondition  FlowFlags = 1 << 5  // Condition known to be true
	FlowFlagsFalseCondition FlowFlags = 1 << 6  // Condition known to be false
	FlowFlagsSwitchClause   FlowFlags = 1 << 7  // Switch statement clause
	FlowFlagsArrayMutation  FlowFlags = 1 << 8  // Potential array mutation
	FlowFlagsCall           FlowFlags = 1 << 9  // Potential assertion call
	FlowFlagsReduceLabel    FlowFlags = 1 << 10 // Temporarily reduce antecedents of label
	FlowFlagsReferenced     FlowFlags = 1 << 11 // Referenced as antecedent once
	FlowFlagsShared         FlowFlags = 1 << 12 // Referenced as antecedent more than once
	FlowFlagsLabel                    = FlowFlagsBranchLabel | FlowFlagsLoopLabel
	FlowFlagsCondition                = FlowFlagsTrueCondition | FlowFlagsFalseCondition
)

// FlowNode

// A FlowNode is a record in a node store's chunks, like a node's, so it
// holds no Go pointers; it is created by NewFlowNode and only referred to
// by pointer. A pointer to a FlowNode keeps its store alive.
type FlowNode struct {
	node        nodeRef
	antecedent  flowRef // Antecedent for all but FlowLabel
	antecedents flowListRef
	Flags       FlowFlags
	self        uint16 // the record's offset in its chunk, in words
}

// A flowRef is the address of a FlowNode, or zero for none. Like a nodeRef,
// it is invisible to the garbage collector.
type flowRef uintptr

// A flowListRef is the address of a FlowList, or zero for none.
type flowListRef uintptr

func (r *flowRef) get() *FlowNode     { return (*FlowNode)(derefRecord(unsafe.Pointer(r))) }
func (r *flowListRef) get() *FlowList { return (*FlowList)(derefRecord(unsafe.Pointer(r))) }
func (s *nodeStore) refFlow(v *FlowNode) flowRef {
	if v == nil {
		return 0
	}
	return flowRef(s.refRecord(unsafe.Pointer(v), v.store()))
}

func (s *nodeStore) refFlowList(v *FlowList) flowListRef {
	if v == nil {
		return 0
	}
	return flowListRef(s.refRecord(unsafe.Pointer(v), v.store()))
}

func (f *FlowNode) store() *nodeStore { return storeAt(unsafe.Pointer(f), f.self) }

// Node returns the AST node associated with the flow node.
func (f *FlowNode) Node() Node { return Node{derefRecord(unsafe.Pointer(&f.node))} }

func (f *FlowNode) Antecedent() *FlowNode { return f.antecedent.get() }

// Antecedents returns the linked list of antecedents of a FlowLabel.
func (f *FlowNode) Antecedents() *FlowList { return f.antecedents.get() }

func (f *FlowNode) SetAntecedent(v *FlowNode) { f.antecedent = f.store().refFlow(v) }

func (f *FlowNode) SetAntecedents(v *FlowList) { f.antecedents = f.store().refFlowList(v) }

func newFlowNode(s *nodeStore, flags FlowFlags, node Node, antecedent *FlowNode) *FlowNode {
	p, self := s.alloc(unsafe.Sizeof(FlowNode{}))
	f := (*FlowNode)(p)
	f.self = self
	f.Flags = flags
	if node.p != nil {
		f.node = s.refAt(p, &f.node, node)
	}
	f.antecedent = s.refFlow(antecedent)
	return f
}

// NewFlowNode allocates a flow node in the store of file, which must not be
// shared with other writers while it is bound.
func NewFlowNode(file *SourceFile, flags FlowFlags, node Node, antecedent *FlowNode) *FlowNode {
	return newFlowNode(file.store(), flags, node, antecedent)
}

// NewFlowNode allocates a flow node in f's store.
func (f *NodeFactory) NewFlowNode(flags FlowFlags, node Node, antecedent *FlowNode) *FlowNode {
	return newFlowNode(f.nodeStore(), flags, node, antecedent)
}

// A FlowList is a record in a node store's chunks, like a FlowNode.
type FlowList struct {
	flow flowRef
	next flowListRef
	self uint16
}

func (l *FlowList) store() *nodeStore   { return storeAt(unsafe.Pointer(l), l.self) }
func (l *FlowList) Flow() *FlowNode     { return l.flow.get() }
func (l *FlowList) Next() *FlowList     { return l.next.get() }
func (l *FlowList) SetNext(v *FlowList) { l.next = l.store().refFlowList(v) }

// NewFlowList allocates a flow list in the store of file, which must not be
// shared with other writers while it is bound.
func NewFlowList(file *SourceFile, flow *FlowNode, next *FlowList) *FlowList {
	s := file.store()
	p, self := s.alloc(unsafe.Sizeof(FlowList{}))
	l := (*FlowList)(p)
	l.self = self
	l.flow = s.refFlow(flow)
	l.next = s.refFlowList(next)
	return l
}

type FlowLabel = FlowNode

const (
	kindFlowSwitchClauseData Kind = KindCount + 1 + iota
	kindFlowReduceLabelData
)

// FlowSwitchClauseData (synthetic AST node for FlowFlagsSwitchClause)

type FlowSwitchClauseData struct{ Node }

type flowSwitchClauseData struct {
	nodeBaseData
	switchStatement nodeRef
	clauseStart     int32 // Start index of case/default clause range
	clauseEnd       int32 // End index of case/default clause range
}

func (node FlowSwitchClauseData) data() *flowSwitchClauseData {
	return (*flowSwitchClauseData)(node.rec())
}

func (node FlowSwitchClauseData) SwitchStatement() Node {
	return node.deref(&node.data().switchStatement)
}

func (node FlowSwitchClauseData) SetSwitchStatement(value Node) {
	node.setRef(&node.data().switchStatement, value)
}
func (node FlowSwitchClauseData) ClauseStart() int32         { return node.data().clauseStart }
func (node FlowSwitchClauseData) SetClauseStart(value int32) { node.data().clauseStart = value }
func (node FlowSwitchClauseData) ClauseEnd() int32           { return node.data().clauseEnd }
func (node FlowSwitchClauseData) SetClauseEnd(value int32)   { node.data().clauseEnd = value }

// NewFlowSwitchClauseData allocates in the store of switchStatement, whose
// file must not be shared with other writers while it is bound.
func NewFlowSwitchClauseData(switchStatement Node, clauseStart int, clauseEnd int) Node {
	s := switchStatement.store()
	data, i := newRecord[flowSwitchClauseData](s, layoutFlowSwitchClauseData)
	data.switchStatement = s.refAt(i, &data.switchStatement, switchStatement)
	data.clauseStart = int32(clauseStart)
	data.clauseEnd = int32(clauseEnd)
	return newNode(s, kindFlowSwitchClauseData, layoutFlowSwitchClauseData, i, NodeFactoryHooks{})
}

func (node FlowSwitchClauseData) IsEmpty() bool {
	return node.ClauseStart() == node.ClauseEnd()
}

// FlowReduceLabelData (synthetic AST node for FlowFlagsReduceLabel)

type FlowReduceLabelData struct{ Node }

type flowReduceLabelData struct {
	nodeBaseData
	target      flowRef     // Target label
	antecedents flowListRef // Temporary antecedent list
}

func (node FlowReduceLabelData) data() *flowReduceLabelData {
	return (*flowReduceLabelData)(node.rec())
}

func (node FlowReduceLabelData) Target() *FlowLabel     { return node.data().target.get() }
func (node FlowReduceLabelData) Antecedents() *FlowList { return node.data().antecedents.get() }

// NewFlowReduceLabelData allocates in the store of file, which must not be
// shared with other writers while it is bound.
func NewFlowReduceLabelData(file *SourceFile, target *FlowLabel, antecedents *FlowList) Node {
	s := file.store()
	data, i := newRecord[flowReduceLabelData](s, layoutFlowReduceLabelData)
	data.target = s.refFlow(target)
	data.antecedents = s.refFlowList(antecedents)
	return newNode(s, kindFlowReduceLabelData, layoutFlowReduceLabelData, i, NodeFactoryHooks{})
}
