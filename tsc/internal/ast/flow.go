package ast

import (
	"hash/maphash"
	"unsafe"
)

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
	Flags FlowFlags
	// For assignment nodes, describes the identifier the assignment may target
	// (see FlowAssignmentTargetHash). Fits in padding after Flags.
	AssignmentTarget uint32
	Node             *Node     // Associated AST node
	Antecedent       *FlowNode // Antecedent for all but FlowLabel
	Antecedents      *FlowList // Linked list of antecedents for FlowLabel
}

const (
	// The assignment must be checked against every reference.
	FlowAssignmentTargetUnknown uint32 = 0
	// The assignment cannot target an identifier reference.
	FlowAssignmentTargetNotIdentifier uint32 = 1
)

// FlowAssignmentTargetAccess marks an AssignmentTarget whose target is a property
// or element access chain rooted at the hashed identifier.
const FlowAssignmentTargetAccess uint32 = 1 << 31

var flowIdentifierHashSeed = maphash.MakeSeed()

// FlowIdentifierHash hashes an identifier name for comparison with
// FlowNode.AssignmentTarget. The result is never a reserved value and never
// has FlowAssignmentTargetAccess set.
func FlowIdentifierHash(name string) uint32 {
	h := uint32(maphash.String(flowIdentifierHashSeed, name))
	h &^= FlowAssignmentTargetAccess
	if h <= FlowAssignmentTargetNotIdentifier {
		h += 2
	}
	return h
}

// FlowAssignmentTargetHash summarizes which references an assignment flow node
// can affect, so that flow walks can skip assignments to unrelated names without
// visiting their syntax. An identifier or declaration target records the hash of
// its name. An access chain target records the hash of the identifier it is
// rooted at, with FlowAssignmentTargetAccess set. This mirrors the checker's
// matching of references against assignment targets, which only matches
// references rooted at the same identifier.
func FlowAssignmentTargetHash(target *Node) uint32 {
	access := uint32(0)
	for {
		switch target.Kind {
		case KindParenthesizedExpression, KindNonNullExpression:
			target = target.Expression()
			continue
		case KindPropertyAccessExpression, KindElementAccessExpression:
			access = FlowAssignmentTargetAccess
			target = target.Expression()
			continue
		case KindBinaryExpression:
			bin := target.AsBinaryExpression()
			switch {
			case IsAssignmentExpression(target, false):
				target = bin.Left
				continue
			case bin.OperatorToken.Kind == KindCommaToken:
				target = bin.Right
				continue
			}
			return FlowAssignmentTargetNotIdentifier
		case KindIdentifier:
			return FlowIdentifierHash(target.AsIdentifier().Text) | access
		case KindVariableDeclaration, KindBindingElement:
			if access != 0 {
				return FlowAssignmentTargetNotIdentifier
			}
			// A for-in variable also narrows the iterated expression.
			if IsVariableDeclaration(target) && target.Parent != nil && target.Parent.Parent != nil && IsForInStatement(target.Parent.Parent) {
				return FlowAssignmentTargetUnknown
			}
			if name := target.Name(); name != nil && IsIdentifier(name) {
				return FlowIdentifierHash(name.AsIdentifier().Text)
			}
			return FlowAssignmentTargetNotIdentifier
		}
		return FlowAssignmentTargetNotIdentifier
	}
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
	SwitchStatement *Node
	ClauseStart     int32 // Start index of case/default clause range
	ClauseEnd       int32 // End index of case/default clause range
}

var _ [0 - unsafe.Offsetof(FlowSwitchClauseData{}.Node)]byte

func NewFlowSwitchClauseData(switchStatement *Node, clauseStart int, clauseEnd int) *Node {
	node := &FlowSwitchClauseData{}
	node.SwitchStatement = switchStatement
	node.ClauseStart = int32(clauseStart)
	node.ClauseEnd = int32(clauseEnd)
	return newNode(kindFlowSwitchClauseData, node.AsNode(), NodeFactoryHooks{})
}

func (node *FlowSwitchClauseData) IsEmpty() bool {
	return node.ClauseStart == node.ClauseEnd
}

// FlowReduceLabelData (synthetic AST node for FlowFlagsReduceLabel)

type FlowReduceLabelData struct {
	NodeBase
	Target      *FlowLabel // Target label
	Antecedents *FlowList  // Temporary antecedent list
}

var _ [0 - unsafe.Offsetof(FlowReduceLabelData{}.Node)]byte

func NewFlowReduceLabelData(target *FlowLabel, antecedents *FlowList) *Node {
	node := &FlowReduceLabelData{}
	node.Target = target
	node.Antecedents = antecedents
	return newNode(kindFlowReduceLabelData, node.AsNode(), NodeFactoryHooks{})
}
