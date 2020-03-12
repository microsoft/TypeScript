// @downlevelIteration: true
// https://github.com/microsoft/TypeScript/issues/30083

for (const i of [0, 1, 2, 3, 4]) {
    try {
        // Ensure catch binding for the following loop is reset per iteration:
        for (const j of [1, 2, 3]) {
            if (i === 2) {
                throw new Error('ERR');
            }
        }
        console.log(i);
    } catch (err) {
        console.log('E %s %s', i, err);
    }
}