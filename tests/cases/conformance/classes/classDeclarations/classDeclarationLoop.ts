// @target: es2015
const arr = [];
for (let i = 0; i < 10; ++i) {
    class C {
        prop = i;
    }
    arr.push(C);
}
