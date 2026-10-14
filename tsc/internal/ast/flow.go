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

type FlowNode struct {
	Flags       FlowFlags
	Node        *Node     // Associated AST node
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
	NodeBase
	switchStatement *Node
	clauseStart     int32 // Start index of case/default clause range
	clauseEnd       int32 // End index of case/default clause range
}

func (node *FlowSwitchClauseData) SwitchStatement() *Node         { return node.switchStatement }
func (node *FlowSwitchClauseData) SetSwitchStatement(value *Node) { node.switchStatement = value }
func (node *FlowSwitchClauseData) ClauseStart() int32             { return node.clauseStart }
func (node *FlowSwitchClauseData) SetClauseStart(value int32)     { node.clauseStart = value }
func (node *FlowSwitchClauseData) ClauseEnd() int32               { return node.clauseEnd }
func (node *FlowSwitchClauseData) SetClauseEnd(value int32)       { node.clauseEnd = value }

var _ [0 - unsafe.Offsetof(FlowSwitchClauseData{}.Node)]byte

func NewFlowSwitchClauseData(switchStatement *Node, clauseStart int, clauseEnd int) *Node {
	node := &FlowSwitchClauseData{}
	node.SetSwitchStatement(switchStatement)
	node.SetClauseStart(int32(clauseStart))
	node.SetClauseEnd(int32(clauseEnd))
	return newNode(kindFlowSwitchClauseData, node.AsNode(), NodeFactoryHooks{})
}

func (node *FlowSwitchClauseData) IsEmpty() bool {
	return node.ClauseStart() == node.ClauseEnd()
}

// FlowReduceLabelData (synthetic AST node for FlowFlagsReduceLabel)

type FlowReduceLabelData struct {
	NodeBase
	target      *FlowLabel // Target label
	antecedents *FlowList  // Temporary antecedent list
}

func (node *FlowReduceLabelData) Target() *FlowLabel             { return node.target }
func (node *FlowReduceLabelData) SetTarget(value *FlowLabel)     { node.target = value }
func (node *FlowReduceLabelData) Antecedents() *FlowList         { return node.antecedents }
func (node *FlowReduceLabelData) SetAntecedents(value *FlowList) { node.antecedents = value }

var _ [0 - unsafe.Offsetof(FlowReduceLabelData{}.Node)]byte

func NewFlowReduceLabelData(target *FlowLabel, antecedents *FlowList) *Node {
	node := &FlowReduceLabelData{}
	node.SetTarget(target)
	node.SetAntecedents(antecedents)
	return newNode(kindFlowReduceLabelData, node.AsNode(), NodeFactoryHooks{})
}
