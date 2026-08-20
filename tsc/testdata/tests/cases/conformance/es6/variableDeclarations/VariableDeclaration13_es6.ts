// @target:es6

// An ExpressionStatement cannot start with the two token sequence `let [` because
// that would make it ambiguous with a `let` LexicalDeclaration whose first LexicalBinding was an ArrayBindingPattern.
var let: any;
let[0] = 100;