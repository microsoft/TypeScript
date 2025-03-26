package ast

import (
	"github.com/microsoft/typescript-go/internal/core"
)

type SubtreeFacts int32

const (
	// Facts
	// - Flags used to indicate that a node or subtree contains syntax specific to a particular ECMAScript variant.

	SubtreeContainsTypeScript SubtreeFacts = 1 << iota
	SubtreeContainsJsx
	SubtreeContainsESNext
	SubtreeContainsES2022
	SubtreeContainsES2021
	SubtreeContainsES2020
	SubtreeContainsES2019
	SubtreeContainsES2018
	SubtreeContainsES2017
	SubtreeContainsES2016

	// Markers
	// - Flags used to indicate that a node or subtree contains a particular kind of syntax.

	SubtreeContainsLexicalThis
	SubtreeContainsLexicalSuper
	SubtreeContainsRest
	SubtreeContainsObjectRestOrSpread
	SubtreeContainsAwait
	SubtreeContainsDynamicImport
	SubtreeContainsClassFields
	SubtreeContainsDecorators
	SubtreeContainsIdentifier

	SubtreeFactsComputed              // NOTE: This should always be last
	SubtreeFactsNone     SubtreeFacts = 0

	// Scope Exclusions
	// - Bitmasks that exclude flags from propagating out of a specific context
	//   into the subtree flags of their container.

	SubtreeExclusionsNode                    = SubtreeFactsComputed
	SubtreeExclusionsEraseable               = ^SubtreeContainsTypeScript
	SubtreeExclusionsOuterExpression         = SubtreeExclusionsNode
	SubtreeExclusionsPropertyAccess          = SubtreeExclusionsNode
	SubtreeExclusionsElementAccess           = SubtreeExclusionsNode
	SubtreeExclusionsArrowFunction           = SubtreeExclusionsNode | SubtreeContainsAwait | SubtreeContainsObjectRestOrSpread
	SubtreeExclusionsFunction                = SubtreeExclusionsNode | SubtreeContainsLexicalThis | SubtreeContainsLexicalSuper | SubtreeContainsAwait | SubtreeContainsObjectRestOrSpread
	SubtreeExclusionsConstructor             = SubtreeExclusionsNode | SubtreeContainsLexicalThis | SubtreeContainsLexicalSuper | SubtreeContainsAwait | SubtreeContainsObjectRestOrSpread
	SubtreeExclusionsMethod                  = SubtreeExclusionsNode | SubtreeContainsLexicalThis | SubtreeContainsLexicalSuper | SubtreeContainsAwait | SubtreeContainsObjectRestOrSpread
	SubtreeExclusionsAccessor                = SubtreeExclusionsNode | SubtreeContainsLexicalThis | SubtreeContainsLexicalSuper | SubtreeContainsAwait | SubtreeContainsObjectRestOrSpread
	SubtreeExclusionsProperty                = SubtreeExclusionsNode | SubtreeContainsLexicalThis | SubtreeContainsLexicalSuper
	SubtreeExclusionsClass                   = SubtreeExclusionsNode
	SubtreeExclusionsModule                  = SubtreeExclusionsNode | SubtreeContainsLexicalThis | SubtreeContainsLexicalSuper
	SubtreeExclusionsObjectLiteral           = SubtreeExclusionsNode | SubtreeContainsObjectRestOrSpread
	SubtreeExclusionsArrayLiteral            = SubtreeExclusionsNode
	SubtreeExclusionsCall                    = SubtreeExclusionsNode
	SubtreeExclusionsNew                     = SubtreeExclusionsNode
	SubtreeExclusionsVariableDeclarationList = SubtreeExclusionsNode | SubtreeContainsObjectRestOrSpread
	SubtreeExclusionsParameter               = SubtreeExclusionsNode
	SubtreeExclusionsCatchClause             = SubtreeExclusionsNode | SubtreeContainsObjectRestOrSpread
	SubtreeExclusionsBindingPattern          = SubtreeExclusionsNode | SubtreeContainsRest

	// Masks
	// - Additional bitmasks

	SubtreeContainsLexicalThisOrSuper = SubtreeContainsLexicalThis | SubtreeContainsLexicalSuper
)

func propagateEraseableSyntaxListSubtreeFacts(children *TypeArgumentList) SubtreeFacts {
	return core.IfElse(children != nil, SubtreeContainsTypeScript, SubtreeFactsNone)
}

func propagateEraseableSyntaxSubtreeFacts(child *TypeNode) SubtreeFacts {
	return core.IfElse(child != nil, SubtreeContainsTypeScript, SubtreeFactsNone)
}

func propagateObjectBindingElementSubtreeFacts(child *BindingElementNode) SubtreeFacts {
	facts := propagateSubtreeFacts(child)
	if facts&SubtreeContainsRest != 0 {
		facts &= ^SubtreeContainsRest
		facts |= SubtreeContainsObjectRestOrSpread
	}
	return facts
}

func propagateBindingElementSubtreeFacts(child *BindingElementNode) SubtreeFacts {
	return propagateSubtreeFacts(child) & ^SubtreeContainsRest
}

func propagateSubtreeFacts(child *Node) SubtreeFacts {
	if child == nil {
		return SubtreeFactsNone
	}
	return child.propagateSubtreeFacts()
}

func propagateNodeListSubtreeFacts(children *NodeList, propagate func(*Node) SubtreeFacts) SubtreeFacts {
	if children == nil {
		return SubtreeFactsNone
	}
	facts := SubtreeFactsNone
	for _, child := range children.Nodes {
		facts |= propagate(child)
	}
	return facts
}

func propagateModifierListSubtreeFacts(children *ModifierList) SubtreeFacts {
	if children == nil {
		return SubtreeFactsNone
	}
	return propagateNodeListSubtreeFacts(&children.NodeList, propagateSubtreeFacts)
}
