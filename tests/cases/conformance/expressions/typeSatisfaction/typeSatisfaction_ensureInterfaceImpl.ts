type Movable = {
    move(distance: number): void;
};

const car = {
    start() { },
    move(d) {
        // d should be number
    },
    stop() { }
} satisfies Movable & Record<string, unknown>;
