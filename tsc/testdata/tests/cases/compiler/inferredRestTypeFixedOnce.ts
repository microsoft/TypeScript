// @target: es2015
function wrap<Args extends unknown[]>(_: (...args: Args) => void) {}
wrap(({ cancelable } = {}) => {});
