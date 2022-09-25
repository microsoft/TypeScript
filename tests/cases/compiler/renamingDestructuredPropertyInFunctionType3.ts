// @target: es2015
const sym = Symbol();
type O = Record<symbol, unknown>
type F14 = ({ [sym]: string }: O) => void; // Error
type G14 = new ({ [sym]: string }: O) => void; // Error

const f13 =  ({ [sym]: string }: O) => { };
function f14 ({ [sym]: string }: O) { };
