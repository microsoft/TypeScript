package compiler

import (
	"github.com/microsoft/typescript-go/internal/ast"
)

// Return the antecedent that leads to the top of the control flow. This is always the last entry
// on the antecedents flow list (i.e. the antecedent that was added to the list first).
func topAntecedent(list *ast.FlowList) *ast.FlowNode {
	for list.Next != nil {
		list = list.Next
	}
	return list.Node
}

// Return true if the given flow node is preceded by a 'super(...)' call in every possible code path
// leading to the node.
func (c *Checker) isPostSuperFlowNode(flow *ast.FlowNode, noCacheCheck bool) bool {
	for {
		flags := flow.Flags
		if flags&ast.FlowFlagsShared != 0 {
			if !noCacheCheck {
				if postSuper, ok := c.flowNodePostSuper[flow]; ok {
					return postSuper
				}
				postSuper := c.isPostSuperFlowNode(flow, true /*noCacheCheck*/)
				c.flowNodePostSuper[flow] = postSuper
			}
			noCacheCheck = false
		}
		switch {
		case flags&(ast.FlowFlagsAssignment|ast.FlowFlagsCondition|ast.FlowFlagsArrayMutation|ast.FlowFlagsSwitchClause) != 0:
			flow = flow.Antecedent
		case flags&ast.FlowFlagsCall != 0:
			if flow.Node.(*ast.CallExpression).Expression.Kind == ast.KindSuperKeyword {
				return true
			}
			flow = flow.Antecedent
		case flags&ast.FlowFlagsBranchLabel != 0:
			for list := flow.Antecedents; list != nil; list = list.Next {
				if !c.isPostSuperFlowNode(list.Node, false /*noCacheCheck*/) {
					return false
				}
			}
			return true
		case flags&ast.FlowFlagsLoopLabel != 0:
			// A loop is post-super if the control flow path that leads to the top is post-super.
			flow = topAntecedent(flow.Antecedents)
		case flags&ast.FlowFlagsReduceLabel != 0:
			data := flow.Node.(*ast.FlowReduceLabelData)
			saveAntecedents := data.Target.Antecedents
			data.Target.Antecedents = data.Antecedents
			result := c.isPostSuperFlowNode(flow.Antecedent, false /*noCacheCheck*/)
			data.Target.Antecedents = saveAntecedents
			return result
		default:
			// Unreachable nodes are considered post-super to silence errors
			return flags&ast.FlowFlagsUnreachable != 0
		}
	}
}
