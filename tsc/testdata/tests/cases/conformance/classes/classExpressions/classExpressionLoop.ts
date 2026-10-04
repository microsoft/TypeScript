// @target: es2015
let arr = [];
for (let i = 0; i < 10; ++i) {
    arr.push(class C {
        prop = i;
    });
}
