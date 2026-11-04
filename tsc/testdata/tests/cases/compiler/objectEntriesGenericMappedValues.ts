// @strict: true
// @target: es2017

function read<T extends { tabIndex: number }>(attributes: Partial<T>) {
    const [, value] = Object.entries(attributes)[0];
    Object.entries(value);
    const tabIndex: number = value;
}
