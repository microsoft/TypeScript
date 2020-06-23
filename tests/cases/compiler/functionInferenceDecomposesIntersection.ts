
declare namespace React {
    type WeakValidationMap<T> = {
        [K in keyof T]?: null extends T[K] ? string : string
    };

    interface FunctionComponent<P = {}> {
        propTypes?: WeakValidationMap<P>;
    }
}

type A<T1> = <T2>() => React.FunctionComponent<T1 & T2>;

function B<T>(_: A<T>) {}

interface C {
    r: string;
}

function myFunction<T2>(): React.FunctionComponent<C & T2> {
    return {};
}

// B<C>(myFunction) // No error
B(myFunction) // should be the same as above (T in B inferred as C)