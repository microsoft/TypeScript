// @target: esnext
// @strict: true

const styles = { root: "outer" };

export function read(value = styles.root) {
    function styles() {}
    styles();
    return value;
}

export function readClosure(value = () => styles.root) {
    function styles() {}
    return value();
}

export function readDestructured({ value = styles.root } = {}) {
    function styles() {}
    return value;
}

export function readMissing(value = missing) {
    function missing() {}
    return value;
}

export function readParameter(styles = { root: "parameter" }, value = styles.root) {
    return value;
}

export const readNamed = function named(value = named) {
    return value;
};
