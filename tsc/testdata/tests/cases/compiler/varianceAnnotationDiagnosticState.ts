// @strict: true
// @declaration: true

interface Consumer<out T> {
    consume: (value: T) => void;
}

interface Producer<in U> {
    value: U;
}

interface Container<out V> {
    value: V;
}

declare let strings: Container<string>;
declare let numbers: Container<number>;
const assign = () => {
    strings = numbers;
};
