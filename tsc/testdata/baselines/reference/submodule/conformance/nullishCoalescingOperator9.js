//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator9.ts] ////

//// [nullishCoalescingOperator9.ts]
declare let f: null | ((x: string) => void);

let g = f || (abc => { void abc.toLowerCase() })
let gg = f ?? (abc => { void abc.toLowerCase() })


//// [nullishCoalescingOperator9.js]
let g = f || (abc => { void abc.toLowerCase(); });
let gg = f ?? (abc => { void abc.toLowerCase(); });
