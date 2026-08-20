// @target: es2015
async function func() {
    if (true) {
        continue;
    }
    else {
        await 1;
    }
}