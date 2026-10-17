package ast

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

// A FlowNode is a node of the control flow graph: an index into the flow
// nodes of a store. The binder adds a file's flow nodes while it is
// private, and checkers add synthetic ones to their own stores. The zero
// FlowNode is no flow node.
type FlowNode struct {
	s *nodeStore
	i uint32
}

type flowNodeData struct {
	node        nodeAnchor  // Associated AST node
	antecedent  flowRef     // Antecedent for all but FlowLabel
	antecedents flowListRef // Linked list of antecedents for FlowLabel
	flags       FlowFlags
}

// A flowRef is a field referring to a flow node. Zero is none. With
// flowReused clear, it is an index into the referring store's flow nodes;
// otherwise, the rest is an index into its reused flow nodes.
type flowRef uint32

const flowReused = 1 << 31

// A flowListRef is a field referring to a flow list in the same store, by
// index. Zero is none.
type flowListRef uint32

func (f FlowNode) IsNil() bool { return f.s == nil }

func (f FlowNode) data() *flowNodeData { return &f.s.flows[f.i] }

// Node returns the AST node associated with the flow node.
func (f FlowNode) Node() Node { return f.s.fromAnchor(f.data().node) }

func (f FlowNode) Flags() FlowFlags { return f.data().flags }

func (f FlowNode) SetFlags(v FlowFlags) { f.data().flags = v }

func (f FlowNode) Antecedent() FlowNode { return f.s.derefFlow(f.data().antecedent) }

// Antecedents returns the linked list of antecedents of a FlowLabel.
func (f FlowNode) Antecedents() FlowList { return f.s.flowList(f.data().antecedents) }

func (f FlowNode) SetAntecedent(v FlowNode) { f.s.setFlowRef(&f.data().antecedent, v) }

func (f FlowNode) SetAntecedents(v FlowList) { f.data().antecedents = f.s.flowListRef(v) }

func (s *nodeStore) derefFlow(r flowRef) FlowNode {
	if r&flowReused == 0 {
		if r == 0 {
			return FlowNode{}
		}
		return FlowNode{s, uint32(r)}
	}
	return s.reusedFlows[r&^flowReused]
}

// setFlowRef makes the field f of a record or flow node of s refer to v.
func (s *nodeStore) setFlowRef(f *flowRef, v FlowNode) {
	switch {
	case v.s == s:
		*f = flowRef(v.i)
	case v.s == nil:
		*f = 0
	case *f&flowReused != 0:
		s.reusedFlows[*f&^flowReused] = v
	default:
		if len(s.reusedFlows) >= flowReused {
			panic("node store reused flow node overflow")
		}
		*f = flowRef(len(s.reusedFlows)) | flowReused
		s.reusedFlows = append(s.reusedFlows, v)
	}
}

// derefFlow returns the flow node that the field f of n refers to.
func (n Node) derefFlow(f *flowRef) FlowNode {
	return n.store().derefFlow(*f)
}

// setFlowRef makes the field f of n refer to v.
func (n Node) setFlowRef(f *flowRef, v FlowNode) {
	n.store().setFlowRef(f, v)
}

// setFlowRef makes the field f of the record of owner refer to v.
func setFlowRef(f *flowRef, owner Node, v FlowNode) {
	owner.store().setFlowRef(f, v)
}

func newFlowNode(s *nodeStore, flags FlowFlags, node Node, antecedent FlowNode) FlowNode {
	if s.frozen {
		panic("node store is frozen")
	}
	if len(s.flows) == 0 {
		s.flows = make([]flowNodeData, 1, minStoreWords)
	}
	f := FlowNode{s, uint32(len(s.flows))}
	s.flows = append(s.flows, flowNodeData{flags: flags})
	if f.i >= flowReused {
		panic("node store flow node overflow")
	}
	f.data().node = s.anchor(node)
	f.SetAntecedent(antecedent)
	return f
}

// NewFlowNode allocates a flow node for file, which must not be shared
// with other writers while it is bound.
func NewFlowNode(file *SourceFile, flags FlowFlags, node Node, antecedent FlowNode) FlowNode {
	return newFlowNode(file.store(), flags, node, antecedent)
}

// NewFlowNode allocates a flow node for f's nodes.
func (f *NodeFactory) NewFlowNode(flags FlowFlags, node Node, antecedent FlowNode) FlowNode {
	return newFlowNode(f.nodeStore(), flags, node, antecedent)
}

// A FlowList is a linked list of flow nodes of one store. The zero
// FlowList is the empty list.
type FlowList struct {
	s *nodeStore
	i uint32
}

type flowListData struct {
	flow flowRef
	next flowListRef
}

func (l FlowList) IsNil() bool { return l.s == nil }

func (l FlowList) data() *flowListData { return &l.s.flowLists[l.i] }

func (l FlowList) Flow() FlowNode     { return l.s.derefFlow(l.data().flow) }
func (l FlowList) Next() FlowList     { return l.s.flowList(l.data().next) }
func (l FlowList) SetNext(v FlowList) { l.data().next = l.s.flowListRef(v) }

func (s *nodeStore) flowList(r flowListRef) FlowList {
	if r == 0 {
		return FlowList{}
	}
	return FlowList{s, uint32(r)}
}

func (s *nodeStore) flowListRef(l FlowList) flowListRef {
	if l.s == nil {
		return 0
	}
	if l.s != s {
		panic("flow list belongs to another store")
	}
	return flowListRef(l.i)
}

// NewFlowList allocates a flow list for file, which must not be shared
// with other writers while it is bound.
func NewFlowList(file *SourceFile, flow FlowNode, next FlowList) FlowList {
	s := file.store()
	if s.frozen {
		panic("node store is frozen")
	}
	if len(s.flowLists) == 0 {
		s.flowLists = make([]flowListData, 1, minStoreWords)
	}
	l := FlowList{s, uint32(len(s.flowLists))}
	s.flowLists = append(s.flowLists, flowListData{next: s.flowListRef(next)})
	s.setFlowRef(&l.data().flow, flow)
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
	setNodeRef(&data.switchStatement, i, switchStatement)
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

func (node FlowReduceLabelData) Target() FlowLabel { return node.derefFlow(&node.data().target) }
func (node FlowReduceLabelData) Antecedents() FlowList {
	return node.store().flowList(node.data().antecedents)
}

// NewFlowReduceLabelData allocates in the store of file, which must not be
// shared with other writers while it is bound.
func NewFlowReduceLabelData(file *SourceFile, target FlowLabel, antecedents FlowList) Node {
	s := file.store()
	data, i := newRecord[flowReduceLabelData](s, layoutFlowReduceLabelData)
	setFlowRef(&data.target, i, target)
	data.antecedents = s.flowListRef(antecedents)
	return newNode(s, kindFlowReduceLabelData, layoutFlowReduceLabelData, i, NodeFactoryHooks{})
}
