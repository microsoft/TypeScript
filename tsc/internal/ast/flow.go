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

// A FlowNode is a node of the control flow graph. Flow nodes are created by
// the binder and checker, and nodes refer to them through their store's
// side tables.
type FlowNode struct {
	node        Node      // Associated AST node
	antecedent  *FlowNode // Antecedent for all but FlowLabel
	antecedents *FlowList // Linked list of antecedents for FlowLabel
	Flags       FlowFlags
}

// A flowRef is a record field holding a *FlowNode, in its store's side
// table.
type flowRef = sideRef

// A flowListRef is a record field holding a *FlowList.
type flowListRef = sideRef

// Node returns the AST node associated with the flow node.
func (f *FlowNode) Node() Node { return f.node }

func (f *FlowNode) Antecedent() *FlowNode { return f.antecedent }

// Antecedents returns the linked list of antecedents of a FlowLabel.
func (f *FlowNode) Antecedents() *FlowList { return f.antecedents }

func (f *FlowNode) SetAntecedent(v *FlowNode) { f.antecedent = v }

func (f *FlowNode) SetAntecedents(v *FlowList) { f.antecedents = v }

// derefFlow returns the flow node that the field f of n refers to.
func (n Node) derefFlow(f *flowRef) *FlowNode {
	return n.s.flowNodes.get(*f)
}

// setFlowRef makes the field f of n refer to v.
func (n Node) setFlowRef(f *flowRef, v *FlowNode) {
	setFlowRef(f, n, v)
}

// setFlowRef makes the field f of the record of owner refer to v.
func setFlowRef(f *flowRef, owner Node, v *FlowNode) {
	owner.s.flowNodes.set(f, v, v == nil)
}

func newFlowNode(s *nodeStore, flags FlowFlags, node Node, antecedent *FlowNode) *FlowNode {
	if len(s.flowSlab) == cap(s.flowSlab) {
		s.flowSlab = make([]FlowNode, 0, 64)
	}
	s.flowSlab = s.flowSlab[:len(s.flowSlab)+1]
	f := &s.flowSlab[len(s.flowSlab)-1]
	f.Flags = flags
	f.node = node
	f.antecedent = antecedent
	return f
}

// NewFlowNode allocates a flow node for file, which must not be shared
// with other writers while it is bound.
func NewFlowNode(file *SourceFile, flags FlowFlags, node Node, antecedent *FlowNode) *FlowNode {
	return newFlowNode(file.store(), flags, node, antecedent)
}

// NewFlowNode allocates a flow node for f's nodes.
func (f *NodeFactory) NewFlowNode(flags FlowFlags, node Node, antecedent *FlowNode) *FlowNode {
	return newFlowNode(f.nodeStore(), flags, node, antecedent)
}

// A FlowList is a linked list of flow nodes.
type FlowList struct {
	flow *FlowNode
	next *FlowList
}

func (l *FlowList) Flow() *FlowNode     { return l.flow }
func (l *FlowList) Next() *FlowList     { return l.next }
func (l *FlowList) SetNext(v *FlowList) { l.next = v }

// NewFlowList allocates a flow list.
func NewFlowList(file *SourceFile, flow *FlowNode, next *FlowList) *FlowList {
	return &FlowList{flow: flow, next: next}
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

func (node FlowReduceLabelData) Target() *FlowLabel { return node.derefFlow(&node.data().target) }
func (node FlowReduceLabelData) Antecedents() *FlowList {
	return node.s.flowLists.get(node.data().antecedents)
}

// NewFlowReduceLabelData allocates in the store of file, which must not be
// shared with other writers while it is bound.
func NewFlowReduceLabelData(file *SourceFile, target *FlowLabel, antecedents *FlowList) Node {
	s := file.store()
	data, i := newRecord[flowReduceLabelData](s, layoutFlowReduceLabelData)
	setFlowRef(&data.target, i, target)
	s.flowLists.set(&data.antecedents, antecedents, antecedents == nil)
	return newNode(s, kindFlowReduceLabelData, layoutFlowReduceLabelData, i, NodeFactoryHooks{})
}
