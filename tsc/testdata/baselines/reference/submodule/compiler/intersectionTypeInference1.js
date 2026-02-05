//// [tests/cases/compiler/intersectionTypeInference1.ts] ////

//// [intersectionTypeInference1.ts]
// Repro from #8801

function alert(s: string) {}

const parameterFn = (props:{store:string}) => alert(props.store)
const brokenFunction = <OwnProps>(f: (p: {dispatch: number} & OwnProps) => void) => (o: OwnProps) => o
export const Form3 = brokenFunction(parameterFn)({store: "hello"})


//// [intersectionTypeInference1.js]
// Repro from #8801
function alert(s) { }
const parameterFn = (props) => alert(props.store);
const brokenFunction = (f) => (o) => o;
export const Form3 = brokenFunction(parameterFn)({ store: "hello" });
