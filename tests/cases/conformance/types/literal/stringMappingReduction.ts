// @strict: true
// @noEmit: true

type T00 = "prop" | `p${Lowercase<string>}p`;  // `p${Lowercase<string>}p`
type T01 = "prop" | Lowercase<string>;  // Lowercase<string>
type T02 = "PROP" | Lowercase<string>;  // "PROP" | Lowercase<string>

type T10 = "prop" & `p${Lowercase<string>}p`;  // "prop"
type T11 = "prop" & Lowercase<string>;  // "prop"
type T12 = "PROP" & Lowercase<string>;  // never

type T20 = "prop" | Capitalize<string>;  // "prop" | Capitalize<string>
type T21 = "Prop" | Capitalize<string>;  // Capitalize<string>
type T22 = "PROP" | Capitalize<string>;  // Capitalize<string>

type T30 = "prop" & Capitalize<string>;  // never
type T31 = "Prop" & Capitalize<string>;  // "Prop"
type T32 = "PROP" & Capitalize<string>;  // "PROP"

// Repro from #57117

type EMap = { event: {} }
type Keys = keyof EMap
type EPlusFallback<C> = C extends Keys ? EMap[C] : "unrecognised event";
type VirtualEvent<T extends string> = { bivarianceHack(event: EPlusFallback<Lowercase<T>>): any; }['bivarianceHack'];
declare const _virtualOn: (eventQrl: VirtualEvent<Keys>) => void;
export const virtualOn = <T extends string>(eventQrl: VirtualEvent<T>) => {
    _virtualOn(eventQrl);
};
