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