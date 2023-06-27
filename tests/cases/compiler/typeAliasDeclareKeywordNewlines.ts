var declare: any, type: any;

// The following is invalid but should declare a type alias named 'T1':
declare type /*unexpected newline*/
T1 = null;
const t1: T1 = null;

let T: null;
// The following should use a variable named 'declare', use a variable named
// 'type', and assign to a variable named 'T'.
declare /*ASI*/
type /*ASI*/
T = null;

// The following should use a variable named 'declare' and declare a type alias
// named 'T2':
declare /*ASI*/
type T2 = null;
const t2: T2 = null;
