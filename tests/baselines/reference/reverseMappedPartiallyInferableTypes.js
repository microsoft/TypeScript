//// [reverseMappedPartiallyInferableTypes.ts]
// Repro from #30505

export type Prop<T> = { (): T }
export type PropType<T> = Prop<T>;
export type PropDefaultValue<T> = T;


export type PropValidatorFunction<T> = (value: T) => boolean;
export type PropValidator<T> = PropOptions<T>;


export type PropOptions<T> = {
    type: PropType<T>;

    value?: PropDefaultValue<T>,
    required?: boolean;
    validator?: PropValidatorFunction<T>;
}

export type RecordPropsDefinition<T> = {
    [K in keyof T]: PropValidator<T[K]>
}
export type PropsDefinition<T> = RecordPropsDefinition<T>;


declare function extend<T>({ props }: { props: PropsDefinition<T> }):  PropsDefinition<T>;

interface MyType {
    valid: boolean;
}

const r = extend({
    props: {
        notResolved: {
            type: Object as PropType<MyType>,
            validator: x => {
                return x.valid;
            }
        },
        explicit: {
            type: Object as PropType<MyType>,
            validator: (x: MyType) => {
                return x.valid;
            }
        }
    }
})

r.explicit
r.notResolved
r.explicit.required
r.notResolved.required

// Modified repro from #30505

type Box<T> = {
    contents?: T;
    contains?(content: T): boolean;
};

type Mapped<T> = {
    [K in keyof T]: Box<T[K]>;
}

declare function id<T>(arg: Mapped<T>): Mapped<T>;

// All properties have inferable types

const obj1 = id({
    foo: {
        contents: ""
    }
});

// Some properties have inferable types

const obj2 = id({
    foo: {
        contents: "",
        contains(k) {
            return k.length > 0;
        }
    }
});

// No properties have inferable types

const obj3 = id({
    foo: {
        contains(k) {
            return k.length > 0;
        }
    }
});


//// [reverseMappedPartiallyInferableTypes.js]
"use strict";
// Repro from #30505
exports.__esModule = true;
var r = extend({
    props: {
        notResolved: {
            type: Object,
            validator: function (x) {
                return x.valid;
            }
        },
        explicit: {
            type: Object,
            validator: function (x) {
                return x.valid;
            }
        }
    }
});
r.explicit;
r.notResolved;
r.explicit.required;
r.notResolved.required;
// All properties have inferable types
var obj1 = id({
    foo: {
        contents: ""
    }
});
// Some properties have inferable types
var obj2 = id({
    foo: {
        contents: "",
        contains: function (k) {
            return k.length > 0;
        }
    }
});
// No properties have inferable types
var obj3 = id({
    foo: {
        contains: function (k) {
            return k.length > 0;
        }
    }
});
