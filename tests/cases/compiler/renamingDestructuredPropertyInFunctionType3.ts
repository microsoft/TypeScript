// @target: es2015
const sym = Symbol();
type F14 = ({ [sym]: string }) => void; // Error
type G14 = new ({ [sym]: string }) => void; // Error

const f13 =  ({ [sym]: string }) => { };
function f14 ({ [sym]: string }) { };
