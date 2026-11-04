// @strict: true
// @target: es2015

function isNode(object: { type?: string }) {
    return !object.type !== undefined;
}
