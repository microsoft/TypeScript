// @target: es2015
// https://github.com/microsoft/TypeScript/issues/65513

let sum = 0;
for (const {...outer} of [{a: 1}]) {
    for (const {...inner} of [{b: 2}]) {
        sum += outer.a + inner.b;
    }
}
console.log(sum);

let sum2 = 0;
for (const {...outer} of [{a: 1}])
    for (const {...inner} of [{b: 2}])
        sum2 += outer.a + inner.b;
console.log(sum2);

let result = 0;
for (const {...outer} of [{a: 1}]) {
    function read({value, ...rest}: {value: number, factor: number}) {
        return value + rest.factor;
    }
    result = outer.a + read({value: 2, factor: 3});
}
console.log(result);
