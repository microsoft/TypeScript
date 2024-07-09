// @declaration: true

const k = ({x: z = 'y'}) => { }

var a;
function f({} = a, [] = a, { p: {} = a} = a) {
}