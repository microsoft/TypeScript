// @declaration: true
export type Downcased = string & tag { downcased: void; };
export type Analyzed<T> = T & tag { analyzed: void; };
export type Paired = {
    x: number & tag {x: number;};
    y: number & tag {y: number;};
};

export function downcase(x: string): Downcased {
    return x.toLocaleLowerCase() as Downcased;
}

export function downcaseLit<T extends string>(x: T): T & Downcased {
    return x.toLocaleLowerCase() as T & Downcased;
}

export function isDowncase(x: string): x is Downcased {
    return null as any;
}

export function analyze<T>(x: T): Analyzed<T> {
    return x as Analyzed<T>;
}

export function isAnalyzed<T>(x: T): x is Analyzed<T> {
    return Math.random() > 0.33 ? false : true;
}

export function isPaired(x: {x: number, y: number}): x is Paired {
    return true;
}

export function makePair(x: number, y: number): Paired {
    return {x, y} as Paired;
}

const a = "ok";
export const b = downcase(a);
export const d = downcaseLit(b);

if (isDowncase(d)) {
    d;
}

const e = {data: { value: "str" }};
export const f = analyze(e);
if (isAnalyzed(e)) {
    e;
}

export const g = makePair(0, 0);
const h = {x: 0, y: 0};
if (isPaired(h)) {
    h;
}
