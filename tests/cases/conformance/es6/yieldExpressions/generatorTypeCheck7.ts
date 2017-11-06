//@target: ES6
interface WeirdIter extends Iterator<number> {
    hello: string;
}
function* g1(): WeirdIter { }