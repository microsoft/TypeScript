//// [tests/cases/compiler/reachabilityCheckWithEmptyDefault.ts] ////

//// [reachabilityCheckWithEmptyDefault.ts]
declare function print(s: string): void;
function foo(x: any) {
	switch(x) {
		case 1: return;
		default:
	}
	print('1');
}

//// [reachabilityCheckWithEmptyDefault.js]
function foo(x) {
    switch (x) {
        case 1: return;
        default:
    }
    print('1');
}
