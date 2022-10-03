function f(...x: number[]) {
    x.forEach((n, i) => void ('item ' + i + ' = ' + n));
}
function g(x: number[], y: string) { }

var n = g;
n = f;
n([4], 'foo');
