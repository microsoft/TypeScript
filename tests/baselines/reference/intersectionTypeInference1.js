//// [intersectionTypeInference1.ts]
// Repro from #8801

function alert(s: string) {}

const parameterFn = (props:{store:string}) => alert(props.store)
const brokenFunction = <OwnProps>(f: (p: {dispatch: number} & OwnProps) => void) => (o: OwnProps) => o
export const Form3 = brokenFunction(parameterFn)({store: "hello"})


//// [intersectionTypeInference1.js]
"use strict";
// Repro from #8801
exports.__esModule = true;
exports.Form3 = void 0;
function alert(s) { }
var parameterFn = function (props) { return alert(props.store); };
var brokenFunction = function (f) { return function (o) { return o; }; };
exports.Form3 = brokenFunction(parameterFn)({ store: "hello" });
