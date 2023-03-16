type PersonType = {
    age: string;
}

type Id<T> = {
    [P in keyof T]: T[P]
}

export type P = Id<PersonType>

function x() {
    return 1;
}