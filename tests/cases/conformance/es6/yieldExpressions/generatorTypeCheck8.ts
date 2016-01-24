//@target: ES6
interface BadGenerator extends Iterator<number>, Iterable<string> { }
function* g3(): BadGenerator { }