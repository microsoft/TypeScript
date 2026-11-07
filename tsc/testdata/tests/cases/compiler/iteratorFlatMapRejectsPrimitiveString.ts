// @lib: es2025
// @strict: true
// @noEmit: true

const numbers = Iterator.from([1]);
const fromArray: string[] = numbers.flatMap(() => ["ab"]).toArray();
const fromIterator: string[] = numbers.flatMap(() => Iterator.from("ab")).toArray();
const fromBoxedString: string[] = numbers.flatMap(() => new String("ab")).toArray();
numbers.flatMap(() => "ab").toArray();
