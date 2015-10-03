// @target: es5

function incrementIdx(max: number) {
    let idx = Math.floor(Math.random() * max);
    return idx;
}

var array1 = [1, 2, 3, 4, 5];

array1[incrementIdx(array1.length)] **= 3;

array1[incrementIdx(array1.length)] **= array1[incrementIdx(array1.length)] **= 2;

array1[incrementIdx(array1.length)] **= array1[incrementIdx(array1.length)] ** 2;