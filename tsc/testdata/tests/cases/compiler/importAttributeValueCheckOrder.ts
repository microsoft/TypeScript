// @checkOrder: default, typesfirst
// @target: esnext

// The attribute value is invalid, which does not affect the module. Its
// missing module must be reported whether or not the type of x is queried
// before the import is checked.

import x from "x" with { a: 0 };
