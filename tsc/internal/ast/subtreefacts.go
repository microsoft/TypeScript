package ast

import (
	"github.com/microsoft/typescript-go/internal/core"
)

type SubtreeFacts int32

const (
	// Facts
	// - Flags used to indicate that a node or subtree contains syntax relevant to a specific transform

	SubtreeContainsTypeScript SubtreeFacts = 1 << iota
	SubtreeContainsJsx
	SubtreeContainsESDecorators
	SubtreeContainsUsing
	SubtreeContainsClassStaticBlocks
	SubtreeContainsESClassFields
	SubtreeContainsLogicalAssignments
	SubtreeContainsNullishCoalescing
	SubtreeContainsOptionalChaining
	SubtreeContainsMissingCatchClauseVariable
	SubtreeContainsESObjectRestOrSpread // subtree has a `...` somewhere inside it, never cleared
	SubtreeContainsForAwaitOrAsyncGenerator
	SubtreeContainsAnyAwait
	SubtreeContainsExponentiationOperator

	// Markers
	// - Flags used to indicate that a node or subtree contains a particular kind of syntax.

	SubtreeContainsLexicalThis
	SubtreeContainsLexicalSuper
	SubtreeContainsRestOrSpread       // marker on any `...` - cleared on binding pattern exit
	SubtreeContainsObjectRestOrSpread // marker on any `{...x}` - cleared on most scope exits
	SubtreeContainsAwait
	SubtreeContainsDynamicImport
	SubtreeContainsClassFields
	SubtreeContainsDecorators
	SubtreeContainsIdentifier

	SubtreeFactsComputed              // NOTE: This should always be last
	SubtreeFactsNone     SubtreeFacts = 0

	// Aliases (unused, for documentation purposes only - correspond to combinations in transformers/estransforms/definitions.go)

	SubtreeContainsESNext = SubtreeContainsESDecorators | SubtreeContainsUsing
	SubtreeContainsES2022 = SubtreeContainsClassStaticBlocks | SubtreeContainsESClassFields
	SubtreeContainsES2021 = SubtreeContainsLogicalAssignments
	SubtreeContainsES2020 = SubtreeContainsNullishCoalescing | SubtreeContainsOptionalChaining
	SubtreeContainsES2019 = SubtreeContainsMissingCatchClauseVariable
	SubtreeContainsES2018 = SubtreeContainsESObjectRestOrSpread | SubtreeContainsForAwaitOrAsyncGenerator
	SubtreeContainsES2017 = SubtreeContainsAnyAwait
	SubtreeContainsES2016 = SubtreeContainsExponentiationOperator

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
	SubtreeExclusionsBindingPattern          = SubtreeExclusionsNode | SubtreeContainsRestOrSpread

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
	if facts&SubtreeContainsRestOrSpread != 0 {
		facts &= ^SubtreeContainsRestOrSpread
		facts |= SubtreeContainsObjectRestOrSpread | SubtreeContainsESObjectRestOrSpread
	}
	return facts
}

func propagateBindingElementSubtreeFacts(child *BindingElementNode) SubtreeFacts {
	return propagateSubtreeFacts(child) & ^SubtreeContainsRestOrSpread
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
