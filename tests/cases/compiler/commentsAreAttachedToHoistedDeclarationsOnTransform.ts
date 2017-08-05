// @lib: es6
async function example() {
    // result.value will be promise
    const promise = Promise.resolve("foo");
    await promise;

    // result.value will be "foo"
    return "foo";
}

async function example2() {
    // test abc
    let abc;

    // test def
    let def,
        // ghi
        ghi;


    // result.value will be promise
    const promise = Promise.resolve("foo");
    await promise;

    // result.value will be "foo"
    return "foo";
}

async function example3() {
  // comment1
  let a = 1;
  // comment2
  let b;
}

async function example4() {
  /** comment1 */
  let a = 1;
  /** comment2 */
  let b;
}