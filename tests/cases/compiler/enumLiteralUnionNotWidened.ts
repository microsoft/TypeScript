// repro from #22093
enum A { one = "one", two = "two" };
enum B { foo = "foo", bar = "bar" };

type C = A | B.foo;
type D = A | "foo";

class List<T>
{
	private readonly items: T[] = [];
}

function asList<T>(arg: T): List<T> { return new List(); }

// TypeScript incorrectly infers the return type of "asList(x)" to be "List<A | B>"
// The correct type is "List<A | B.foo>"
function fn1(x: C): List<C> { return asList(x); }

// If we use the literal "foo" instead of B.foo, the correct type is inferred
function fn2(x: D): List<D> { return asList(x); }