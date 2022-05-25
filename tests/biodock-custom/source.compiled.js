const babel = 5;
const plugins = 5;
babel === plugins;
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function randomString() {
    return 'random';
}
async function funTimes() {
    await sleep(5000);
    await sleep(5000);
    await Promise.all([
        // first sleep
        sleep(5000),
        // second sleep
        sleep(5000),
    ]);
    await Promise.all([
        sleep(5000),
        sleep(5000)
    ]);
    /**
     await Promise.all([
       sleep(5000),
       sleep(5000),
     ])
     */
    const hello = 'world';
    let hi = 'world';
    const [firstStringA, , secondStringA] = await Promise.all([
        randomString(),
        sleep(5000),
        randomString(),
    ]);
    const [firstString, , secondString] = await Promise.all([
        randomString(),
        sleep(5000),
        randomString()
    ]);
    let [firstStringLet, , secondStringLet] = await Promise.all([
        randomString(),
        sleep(5000),
        randomString()
    ]);
    /**
     const [,myString] = await Promise.all([
       sleep(5000),
       randomString(),
     ])
     */
}
