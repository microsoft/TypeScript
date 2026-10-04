//@target: ES6
interface WeirdIter extends IterableIterator<number> {
    hello: string;
}
function* g1(): WeirdIter { }