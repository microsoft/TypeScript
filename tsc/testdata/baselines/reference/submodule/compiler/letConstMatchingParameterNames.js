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
let parent = true;
const parent2 = true;
function a() {
    let parent = 1;
    const parent2 = 2;
    function b(parent, parent2) {
        use(parent);
        use(parent2);
    }
}
