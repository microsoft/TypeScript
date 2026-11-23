// @noEmit: true
// @strict: true
// @target: esnext
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Analyzing the flow of handlers checks whether the call to setHandler is an
// assertion, which needs the type of theClass, which needs the type of
// handlers. The same members are circular whichever is checked first (50200).

class GenericClass<T> {
    setHandler(handler: (date: T) => void) {
    }
}

const theClass: GenericClass<typeof handlers> = new GenericClass();
theClass.setHandler(() => {});

const handlers = {
    thisDoesnt: console.log,
};
