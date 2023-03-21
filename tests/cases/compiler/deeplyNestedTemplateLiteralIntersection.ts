// @strict: true
// @noEmit: true
// @noTypesAndSymbols: true


type R = `${number}a` & {
    _thing: true;
};

type _S = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

type S = `${_S}${_S}`;


type T = R | S;
type X = `${T} ${T}`;

export type Props = Partial<{
    x: X;
}>;

const a1: Props = {};
const a2: Props = {};

const b = { ...a1, ...a2 };

export { b };
