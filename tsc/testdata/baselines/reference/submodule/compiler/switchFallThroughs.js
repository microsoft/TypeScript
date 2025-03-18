//// [tests/cases/compiler/switchFallThroughs.ts] ////

//// [switchFallThroughs.ts]
function R1(index: number) {
    switch (index) {
        case 0:
        case 1:
        case 2:
            var a = 'a';
            return a;
        case 3:
        case 4: {
            return 'b';
        }
		case 5:
		default:
			return 'c';
    }
}


//// [switchFallThroughs.js]
function R1(index) {
    switch (index) {
        case 0:
        case 1:
        case 2:
            var a = 'a';
            return a;
        case 3:
        case 4: {
            return 'b';
        }
        case 5:
        default:
            return 'c';
    }
}
