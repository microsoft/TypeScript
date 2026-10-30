// @strict: true
// @noEmit: true

type MyExclude<T, U> = T & not U;
type MyExtract<T, U> = T & U;

type Recursive<Shape extends {
    [Key in keyof Shape]: MyExtract<Shape[MyExclude<keyof Shape, Key>], { value: string }>["value"];
}> = Shape;

type Value<Text extends string = string> = { value: Text };
declare function value<Text extends string>(text: Text): Value<Text>;
declare function uniqueValues<Shape extends {
    [Key in keyof Shape]: MyExtract<Shape[Key], Value>["value"] extends
        MyExtract<Shape[MyExclude<keyof Shape, Key>], Value>["value"] ? never : unknown;
}>(shape: Shape): void;

uniqueValues({ first: value("one"), second: value("two") });
uniqueValues({ first: value("one") });
uniqueValues({ first: value("same"), second: value("same") });