// @strict: true
// @lib: esnext
// @noEmit: true

declare function arrayFrom<T, U>(iterator: Iterable<T>, map: (t: T) => U): U[];
declare function arrayFrom<T>(iterator: Iterable<T>): T[];

interface CommandLineOptionOfStringType {
  type: "string";
  defaultValueDescription?: string | undefined;
}

interface CommandLineOptionOfCustomType {
  type: Map<string, number | string>;
  defaultValueDescription: number | string | undefined;
  deprecatedKeys?: Set<string>;
}

type CommandLineOption =
  | CommandLineOptionOfStringType
  | CommandLineOptionOfCustomType;

function formatDefaultValue1(
  defaultValue: CommandLineOption["defaultValueDescription"],
  type: CommandLineOption["type"],
) {
  return defaultValue !== undefined && typeof type === "object"
    ? arrayFrom(type.entries())
        .filter(([, value]) => value === defaultValue)
        .map(([name]) => name)
        .join("/")
    : String(defaultValue);
}

function formatDefaultValue2(
  defaultValue: CommandLineOption["defaultValueDescription"],
  type: CommandLineOption["type"],
) {
  return defaultValue !== undefined && typeof type === "object"
    ? arrayFrom(type.entries())
        .filter(([, ...value]) => value[0] === defaultValue)
        .map(([name]) => name)
        .join("/")
    : String(defaultValue);
}

function formatDefaultValue3(
  defaultValue: CommandLineOption["defaultValueDescription"],
  type: CommandLineOption["type"],
) {
  return defaultValue !== undefined && typeof type === "object"
    ? arrayFrom(type.entries())
        .filter((arg) => {
            const [, value] = arg;
            return value === defaultValue;
        })
        .map(([name]) => name)
        .join("/")
    : String(defaultValue);
}

function formatDefaultValue4(
  defaultValue: CommandLineOption["defaultValueDescription"],
  type: CommandLineOption["type"],
) {
  return defaultValue !== undefined && typeof type === "object"
    ? arrayFrom(type.entries())
        .filter((arg) => {
            const [, ...value] = arg;
            return value[0] === defaultValue;
        })
        .map(([name]) => name)
        .join("/")
    : String(defaultValue);
}

declare function test1<T>(arg: T): {
  filter<S extends T>(cb: (arg: T) => arg is S): void;
  filter(cb: (arg: T) => boolean): void;
};

declare const obj1: { foo: string; bar: number; baz: boolean };
test1(obj1).filter(({ foo, bar }) => foo === "");
test1(obj1).filter(({ bar, ...rest }) => rest.foo === "");
test1(obj1).filter((arg) => {
    const { foo, bar } = arg;
    return foo === "";
});
test1(obj1).filter((arg) => {
    const { bar, ...rest } = arg;
    return rest.foo === "";
});
