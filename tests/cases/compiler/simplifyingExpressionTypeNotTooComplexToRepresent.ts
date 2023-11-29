function computed<N extends keyof Longhands>(
    property: Longhands[N][1],
    specified: Longhands[N][0]
) {
    // error happens on this line
    property.compute(specified);
}

interface Property<T> {
    compute: (value: T) => T;
}

type Wrapper<T> = [T, Property<T>];

interface Longhands {
    "font-family": Wrapper<Family>;
    "font-size": Wrapper<Size>;
    "font-stretch": Wrapper<Stretch>;
    "font-variant-caps": Wrapper<Caps>;
    "font-variant-east-asian": Wrapper<EastAsian>;
    "font-variant-ligatures": Wrapper<Ligatures>;
    "font-variant-numeric": Wrapper<Numeric>;
    "font-variant-position": Wrapper<Position>;
    "font-weight": Wrapper<Weight>;
}

class Keyword<K extends string> {
    keyword: K;
    constructor(keyword: K) {
        this.keyword = keyword;
    }
}

type Family = Keyword<"serif">;
type Size = Keyword<"length">;
type Stretch =
    | Keyword<"percentage">
    | Keyword<"ultra-condensed">
    | Keyword<"extra-condensed">
    | Keyword<"condensed">
    | Keyword<"semi-condensed">
    | Keyword<"normal">
    | Keyword<"semi-expanded">
    | Keyword<"expanded">
    | Keyword<"extra-expanded">
    | Keyword<"ultra-expanded">;
type Caps = Keyword<"normal">;
type EastAsian =
    | Keyword<"normal">
    | Keyword<"jis78">
    | Keyword<"jis83">
    | Keyword<"jis90">
    | Keyword<"jis04">
    | Keyword<"simplified">
    | Keyword<"traditional">
    | Keyword<"proportional-width">
    | Keyword<"full-width">
    | Keyword<"ruby">;
type Ligatures =
    | Keyword<"none">
    | Keyword<"normal">
    | Keyword<"common-ligatures">
    | Keyword<"no-common-ligatures">
    | Keyword<"discretionary-ligatures">
    | Keyword<"no-discretionary-ligatures">
    | Keyword<"historical-ligatures">
    | Keyword<"no-historical-ligatures">
    | Keyword<"contextual">
    | Keyword<"no-contextual">;
type Numeric =
    | Keyword<"normal">
    | Keyword<"lining-nums">
    | Keyword<"oldstyle-nums">
    | Keyword<"proportional-nums">
    | Keyword<"tabular-nums">
    | Keyword<"diagonal-fractions">
    | Keyword<"stacked-fractions">
    | Keyword<"ordinal">
    | Keyword<"slashed-zero">;
type Position = Keyword<"normal"> | Keyword<"sub"> | Keyword<"super">;
type Weight =
    | Keyword<"number">
    | Keyword<"normal">
    | Keyword<"bold">
    | Keyword<"bolder">
    | Keyword<"lighter">;