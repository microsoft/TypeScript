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

type FlowSwitchClauseData struct {
	NodeDefault
}

func NewFlowSwitchClauseData(switchStatement Node, clauseStart int, clauseEnd int) Node {
	factory := NewNodeFactory(NodeFactoryHooks{})
	return factory.NewFlowSwitchClauseData(switchStatement, clauseStart, clauseEnd)
}

func (f *NodeFactory) NewFlowSwitchClauseData(switchStatement Node, clauseStart int, clauseEnd int) Node {
	node := FlowSwitchClauseData{NodeDefault{f.newNode(kindFlowSwitchClauseData, arenaLayoutFlowSwitchClauseData)}}
	node.SetSwitchStatement(switchStatement)
	node.SetClauseStart(int32(clauseStart))
	node.SetClauseEnd(int32(clauseEnd))
	return node.AsNode()
}

func (node FlowSwitchClauseData) IsEmpty() bool {
	return node.ClauseStart() == node.ClauseEnd()
}

// FlowReduceLabelData (synthetic AST node for FlowFlagsReduceLabel)

type FlowReduceLabelData struct {
	NodeDefault
}

func NewFlowReduceLabelData(target *FlowLabel, antecedents *FlowList) Node {
	factory := NewNodeFactory(NodeFactoryHooks{})
	return factory.NewFlowReduceLabelData(target, antecedents)
}

func (f *NodeFactory) NewFlowReduceLabelData(target *FlowLabel, antecedents *FlowList) Node {
	node := FlowReduceLabelData{NodeDefault{f.newNode(kindFlowReduceLabelData, arenaLayoutFlowReduceLabelData)}}
	node.SetTarget(target)
	node.SetAntecedents(antecedents)
	return node.AsNode()
}
