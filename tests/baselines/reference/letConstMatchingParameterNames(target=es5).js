//// [tests/cases/compiler/letConstMatchingParameterNames.ts] ////

//// [letConstMatchingParameterNames.ts]
let parent = true;
const parent2 = true;
declare function use(a: any);

function a() {
    
    let parent = 1;
    const parent2 = 2;

    function b(parent: string, parent2: number) {
        use(parent);
        use(parent2);
    }
}


//// [letConstMatchingParameterNames.js]
var parent = true;
var parent2 = true;
function a() {
    var parent = 1;
    var parent2 = 2;
    function b(parent, parent2) {
        use(parent);
        use(parent2);
    }
}
