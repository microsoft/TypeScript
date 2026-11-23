// @strict: true
// @target: es2022
// @noEmit: true

const match = /(section)?/d.exec("");
if (match) {
    match.indices![1][0];
    match.indices![1][1];

    const indices = match.indices![1];
    if (indices) {
        indices[0];
        indices[1];
    }
}
