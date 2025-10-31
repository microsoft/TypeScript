package format

import "github.com/microsoft/typescript-go/internal/ast"

type ruleImpl struct {
	debugName string
	context   []contextPredicate
	action    ruleAction
	flags     ruleFlags
}

func (r ruleImpl) Action() ruleAction {
	return r.action
}

func (r ruleImpl) Context() []contextPredicate {
	return r.context
}

func (r ruleImpl) Flags() ruleFlags {
	return r.flags
}

func (r ruleImpl) String() string {
	return r.debugName
}

type tokenRange struct {
	tokens     []ast.Kind
	isSpecific bool
}

type ruleSpec struct {
	leftTokenRange  tokenRange
	rightTokenRange tokenRange
	rule            *ruleImpl
}

/**
 * A rule takes a two tokens (left/right) and a particular context
 * for which you're meant to look at them. You then declare what should the
 * whitespace annotation be between these tokens via the action param.
 *
 * @param debugName Name to print
 * @param left The left side of the comparison
 * @param right The right side of the comparison
 * @param context A set of filters to narrow down the space in which this formatter rule applies
 * @param action a declaration of the expected whitespace
 * @param flags whether the rule deletes a line or not, defaults to no-op
 */
func rule(debugName string, left any, right any, context []contextPredicate, action ruleAction, flags ...ruleFlags) ruleSpec {
	flag := ruleFlagsNone
	if len(flags) > 0 {
		flag = flags[0]
	}
	leftRange := toTokenRange(left)
	rightRange := toTokenRange(right)
	rule := &ruleImpl{
		debugName: debugName,
		context:   context,
		action:    action,
		flags:     flag,
	}
	return ruleSpec{
		leftTokenRange:  leftRange,
		rightTokenRange: rightRange,
		rule:            rule,
	}
}

func toTokenRange(e any) tokenRange {
	switch t := e.(type) {
	case ast.Kind:
		return tokenRange{isSpecific: true, tokens: []ast.Kind{t}}
	case []ast.Kind:
		return tokenRange{isSpecific: true, tokens: t}
	case tokenRange:
		return t
	}
	panic("Unknown argument type passed to toTokenRange - only ast.Kind, []ast.Kind, and tokenRange supported")
}

type contextPredicate = func(ctx *FormattingContext) bool

var anyContext = []contextPredicate{}

type ruleAction int

const (
	ruleActionNone                       ruleAction = 0
	ruleActionStopProcessingSpaceActions ruleAction = 1 << 0
	ruleActionStopProcessingTokenActions ruleAction = 1 << 1
	ruleActionInsertSpace                ruleAction = 1 << 2
	ruleActionInsertNewLine              ruleAction = 1 << 3
	ruleActionDeleteSpace                ruleAction = 1 << 4
	ruleActionDeleteToken                ruleAction = 1 << 5
	ruleActionInsertTrailingSemicolon    ruleAction = 1 << 6

	ruleActionStopAction        ruleAction = ruleActionStopProcessingSpaceActions | ruleActionStopProcessingTokenActions
	ruleActionModifySpaceAction ruleAction = ruleActionInsertSpace | ruleActionInsertNewLine | ruleActionDeleteSpace
	ruleActionModifyTokenAction ruleAction = ruleActionDeleteToken | ruleActionInsertTrailingSemicolon
)

type ruleFlags int

const (
	ruleFlagsNone ruleFlags = iota
	ruleFlagsCanDeleteNewLines
)
