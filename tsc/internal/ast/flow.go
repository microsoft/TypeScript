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

type FlowNode struct {
	Flags       FlowFlags
	Node        Node      // Associated AST node
	Antecedent  *FlowNode // Antecedent for all but FlowLabel
	Antecedents *FlowList // Linked list of antecedents for FlowLabel
}

type FlowList struct {
	Flow *FlowNode
	Next *FlowList
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
	target      *FlowLabel // Target label
	antecedents *FlowList  // Temporary antecedent list
}

func (node FlowReduceLabelData) data() *flowReduceLabelData {
	return (*flowReduceLabelData)(node.rec())
}

func (node FlowReduceLabelData) Target() *FlowLabel             { return node.data().target }
func (node FlowReduceLabelData) SetTarget(value *FlowLabel)     { node.data().target = value }
func (node FlowReduceLabelData) Antecedents() *FlowList         { return node.data().antecedents }
func (node FlowReduceLabelData) SetAntecedents(value *FlowList) { node.data().antecedents = value }

// NewFlowReduceLabelData allocates in the store of file, which must not be
// shared with other writers while it is bound.
func NewFlowReduceLabelData(file *SourceFile, target *FlowLabel, antecedents *FlowList) Node {
	s := file.store()
	data, i := newRecord[flowReduceLabelData](s, layoutFlowReduceLabelData)
	data.target = target
	data.antecedents = antecedents
	return newNode(s, kindFlowReduceLabelData, layoutFlowReduceLabelData, i, NodeFactoryHooks{})
}
