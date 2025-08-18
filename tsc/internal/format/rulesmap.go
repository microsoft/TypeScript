package format

import (
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/debug"
)

func getRules(context *formattingContext, rules []*ruleImpl) []*ruleImpl {
	bucket := getRulesMap()[getRuleBucketIndex(context.currentTokenSpan.Kind, context.nextTokenSpan.Kind)]
	if len(bucket) > 0 {
		ruleActionMask := ruleActionNone
	outer:
		for _, rule := range bucket {
			acceptRuleActions := ^getRuleActionExclusion(ruleActionMask)
			if rule.Action()&acceptRuleActions != 0 {
				preds := rule.Context()
				for _, p := range preds {
					if !p(context) {
						continue outer
					}
				}
				rules = append(rules, rule)
				ruleActionMask |= rule.Action()
			}
		}
		return rules
	}
	return rules
}

func getRuleBucketIndex(row ast.Kind, column ast.Kind) int {
	debug.Assert(row <= ast.KindLastKeyword && column <= ast.KindLastKeyword, "Must compute formatting context from tokens")
	return (int(row) * mapRowLength) + int(column)
}

const (
	maskBitSize  = 5
	mask         = 0b11111 // MaskBitSize bits
	mapRowLength = int(ast.KindLastToken) + 1
)

/**
 * For a given rule action, gets a mask of other rule actions that
 * cannot be applied at the same position.
 */
func getRuleActionExclusion(ruleAction ruleAction) ruleAction {
	mask := ruleActionNone
	if ruleAction&ruleActionStopProcessingSpaceActions != 0 {
		mask |= ruleActionModifySpaceAction
	}
	if ruleAction&ruleActionStopProcessingTokenActions != 0 {
		mask |= ruleActionModifyTokenAction
	}
	if ruleAction&ruleActionModifySpaceAction != 0 {
		mask |= ruleActionModifySpaceAction
	}
	if ruleAction&ruleActionModifyTokenAction != 0 {
		mask |= ruleActionModifyTokenAction
	}
	return mask
}

var getRulesMap = sync.OnceValue(buildRulesMap)

func buildRulesMap() [][]*ruleImpl {
	rules := getAllRules()
	// Map from bucket index to array of rules
	m := make([][]*ruleImpl, mapRowLength*mapRowLength)
	// This array is used only during construction of the rulesbucket in the map
	rulesBucketConstructionStateList := make([]int, len(m))
	for _, rule := range rules {
		specificRule := rule.leftTokenRange.isSpecific && rule.rightTokenRange.isSpecific

		for _, left := range rule.leftTokenRange.tokens {
			for _, right := range rule.rightTokenRange.tokens {
				index := getRuleBucketIndex(left, right)
				m[index] = addRule(m[index], rule.rule, specificRule, rulesBucketConstructionStateList, index)
			}
		}
	}
	return m
}

type RulesPosition int

const (
	RulesPositionStopRulesSpecific      RulesPosition = 0
	RulesPositionStopRulesAny           RulesPosition = maskBitSize * 1
	RulesPositionContextRulesSpecific   RulesPosition = maskBitSize * 2
	RulesPositionContextRulesAny        RulesPosition = maskBitSize * 3
	RulesPositionNoContextRulesSpecific RulesPosition = maskBitSize * 4
	RulesPositionNoContextRulesAny      RulesPosition = maskBitSize * 5
)

// The Rules list contains all the inserted rules into a rulebucket in the following order:
//
//	1- Ignore rules with specific token combination
//	2- Ignore rules with any token combination
//	3- Context rules with specific token combination
//	4- Context rules with any token combination
//	5- Non-context rules with specific token combination
//	6- Non-context rules with any token combination
//
// The member rulesInsertionIndexBitmap is used to describe the number of rules
// in each sub-bucket (above) hence can be used to know the index of where to insert
// the next rule. It's a bitmap which contains 6 different sections each is given 5 bits.
//
// Example:
// In order to insert a rule to the end of sub-bucket (3), we get the index by adding
// the values in the bitmap segments 3rd, 2nd, and 1st.
func addRule(rules []*ruleImpl, rule *ruleImpl, specificTokens bool, constructionState []int, rulesBucketIndex int) []*ruleImpl {
	var position RulesPosition
	if rule.Action()&ruleActionStopAction != 0 {
		if specificTokens {
			position = RulesPositionStopRulesSpecific
		} else {
			position = RulesPositionStopRulesAny
		}
	} else if len(rule.Context()) != 0 {
		if specificTokens {
			position = RulesPositionContextRulesSpecific
		} else {
			position = RulesPositionContextRulesAny
		}
	} else {
		if specificTokens {
			position = RulesPositionNoContextRulesSpecific
		} else {
			position = RulesPositionNoContextRulesAny
		}
	}

	state := constructionState[rulesBucketIndex]

	rules = slices.Insert(rules, getRuleInsertionIndex(state, position), rule)
	constructionState[rulesBucketIndex] = increaseInsertionIndex(state, position)
	return rules
}

func getRuleInsertionIndex(indexBitmap int, maskPosition RulesPosition) int {
	index := 0
	for pos := 0; pos <= int(maskPosition); pos += maskBitSize {
		index += indexBitmap & mask
		indexBitmap >>= maskBitSize
	}
	return index
}

func increaseInsertionIndex(indexBitmap int, maskPosition RulesPosition) int {
	value := ((indexBitmap >> maskPosition) & mask) + 1
	debug.Assert((value&mask) == value, "Adding more rules into the sub-bucket than allowed. Maximum allowed is 32 rules.")
	return (indexBitmap & ^(mask << maskPosition)) | (value << maskPosition)
}
