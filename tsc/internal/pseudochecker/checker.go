// pseudochecker is a limited "checker" that returns pseudo-"types" of expressions - mostly those which trivially have type nodes
package pseudochecker

// TODO: Late binding/symbol merging?
// In strada, `expressionToTypeNode` used many `resolver` methods whose net effect was just
// calling `Checker.GetMergedSymbol` on a symbol when dealing with accessors. Right now those
// just use Node.Symbol, which will fail to pair up late-bound symbols. In theory, this is actually
// fine, since ID can't possibly know if `set [q1()](a){}` and `get [q2()](): T {}` are connected
// without performing real type checking, regardless, so it shouldn't matter. If anything, it might be
// OK to add a "dumb" late binder that can merge multiple `[a.b.c]: T` together, but not anything else.
// This is an area of active ~~feature-creep~~ development in ID output, prerequisite refactoring would include
// extracting the `mergeSymbol` core checker logic into a reusable component.

type PseudoChecker struct {
	strictNullChecks           bool
	exactOptionalPropertyTypes bool
}

func NewPseudoChecker(strictNullChecks bool, exactOptionalPropertyTypes bool) *PseudoChecker {
	return &PseudoChecker{strictNullChecks: strictNullChecks, exactOptionalPropertyTypes: exactOptionalPropertyTypes}
}
