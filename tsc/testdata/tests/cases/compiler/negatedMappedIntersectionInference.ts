// @strict: true
// @noEmit: true

type MyExclude<T, U> = T & not U;
type MyExtract<T, U> = T & U;

interface Config<Values> {
    initialValues: Values;
    validate?: (values: Values) => void;
    validateOnChange?: boolean;
}

declare function configure<Values = object, Extra = {}>(options:
    string extends "validate" | "initialValues" | keyof Extra
        ? Readonly<Config<Values> & Extra>
        : Pick<Readonly<Config<Values> & Extra>, "validate" | "initialValues" | MyExclude<keyof Extra, "validateOnChange">>
            & Partial<Pick<Readonly<Config<Values> & Extra>, "validateOnChange" | MyExtract<keyof Extra, "validateOnChange">>>
): Values;

const inferred = configure({
    initialValues: { count: 1 },
    validate: values => {
        const count: number = values.count;
    },
});
const count: number = inferred.count;