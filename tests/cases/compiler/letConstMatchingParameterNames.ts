// @lib: es5
// @target: es5
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
