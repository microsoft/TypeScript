// @lib: esnext

const test1: Promise<[one: number, two: string]> = (async () => {
    return [1, 'two'];
})();

const test2: Promise<[one: number, two: string]> = new Promise(
    (resolve) => resolve([1, 'two']),
);

const obj: { foo: [one: number, two: string] } = {
    foo: (() => [1, 'two'])()
};
