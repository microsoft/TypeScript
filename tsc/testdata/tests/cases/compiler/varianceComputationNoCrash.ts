// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/2935

// @filename: helpers.ts
export type Whitespace = '\u{9}' | '\u{A}' | '\u{B}' | '\u{C}' | '\u{D}' | '\u{20}' | '\u{85}' | '\u{A0}' | '\u{1680}' | '\u{2000}' | '\u{2001}' | '\u{2002}' | '\u{2003}' | '\u{2004}' | '\u{2005}' | '\u{2006}' | '\u{2007}' | '\u{2008}' | '\u{2009}' | '\u{200A}' | '\u{2028}' | '\u{2029}' | '\u{202F}' | '\u{205F}' | '\u{3000}' | '\u{FEFF}';
export type WordSeparators = '-' | '_' | Whitespace;
export type Simplify<T> = {[KeyType in keyof T]: T[KeyType]} & {};
export type IsAny<T> = 0 extends 1 & T ? true : false;
export type IsNever<T> = [T] extends [never] ? true : false;
export type IfAny<T, TypeIfAny = true, TypeIfNotAny = false> = IsAny<T> extends true ? TypeIfAny : TypeIfNotAny;
export type IfNever<T, TypeIfNever = true, TypeIfNotNever = false> = IsNever<T> extends true ? TypeIfNever : TypeIfNotNever;
export type RequiredKeysOf<BaseType extends object> = Exclude<{[Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]> ? Key : never}[keyof BaseType], undefined>;
export type OptionalKeysOf<BaseType extends object> = Exclude<{[Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]> ? never : Key}[keyof BaseType], undefined>;
export type OmitIndexSignature<ObjectType> = {[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown> ? never : KeyType]: ObjectType[KeyType]};
export type PickIndexSignature<ObjectType> = {[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown> ? KeyType : never]: ObjectType[KeyType]};
type SimpleMerge<Destination, Source> = {[Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key]} & Source;
export type Merge<Destination, Source> = Simplify<SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>> & SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>>;
type TrimLeft<V extends string> = V extends `${Whitespace}${infer R}` ? TrimLeft<R> : V;
type TrimRight<V extends string> = V extends `${infer R}${Whitespace}` ? TrimRight<R> : V;
export type Trim<V extends string> = TrimLeft<TrimRight<V>>;
export type IsLowerCase<T extends string> = T extends Lowercase<T> ? true : false;
export type IsUpperCase<T extends string> = T extends Uppercase<T> ? true : false;
export type IsNumeric<T extends string> = T extends `${number}` ? Trim<T> extends T ? true : false : false;
export type ApplyDefaultOptions<
    Options extends object,
    Defaults extends Simplify<Omit<Required<Options>, RequiredKeysOf<Options>> & Partial<Record<RequiredKeysOf<Options>, never>>>,
    SpecifiedOptions extends Options,
> = IfAny<SpecifiedOptions, Defaults, IfNever<SpecifiedOptions, Defaults, Simplify<Merge<Defaults, {[Key in keyof SpecifiedOptions as Key extends OptionalKeysOf<Options> ? undefined extends SpecifiedOptions[Key] ? never : Key : Key]: SpecifiedOptions[Key]}> & Required<Options>>>>;

// @filename: camelcase.ts
import type { ApplyDefaultOptions, WordSeparators, IsLowerCase, IsUpperCase, IsNumeric } from "./helpers";

type SkipEmptyWord<Word extends string> = Word extends '' ? [] : [Word];
type RemoveLastCharacter<Sentence extends string, Character extends string> = Sentence extends `${infer LeftSide}${Character}` ? SkipEmptyWord<LeftSide> : never;
type WordsOptions = { splitOnNumbers?: boolean };
type DefaultWordsOptions = { splitOnNumbers: true };

type WordsImplementation<
    Sentence extends string,
    Options extends Required<WordsOptions>,
    LastCharacter extends string = '',
    CurrentWord extends string = '',
> = Sentence extends `${infer FirstCharacter}${infer RemainingCharacters}`
    ? FirstCharacter extends WordSeparators
        ? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options>]
        : LastCharacter extends ''
            ? WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>
            : [false, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
                ? Options['splitOnNumbers'] extends true
                    ? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>]
                    : WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
                : [true, false] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
                    ? Options['splitOnNumbers'] extends true
                        ? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>]
                        : WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
                    : [true, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
                        ? WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
                        : [true, true] extends [IsLowerCase<LastCharacter>, IsUpperCase<FirstCharacter>]
                            ? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>]
                            : [true, true] extends [IsUpperCase<LastCharacter>, IsLowerCase<FirstCharacter>]
                                ? [...RemoveLastCharacter<CurrentWord, LastCharacter>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${LastCharacter}${FirstCharacter}`>]
                                : WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
    : [...SkipEmptyWord<CurrentWord>];

type Words<Sentence extends string, Options extends WordsOptions = {}> =
    WordsImplementation<Sentence, ApplyDefaultOptions<WordsOptions, DefaultWordsOptions, Options>>;

type CamelCaseOptions = { preserveConsecutiveUppercase?: boolean };
type DefaultCamelCaseOptions = { preserveConsecutiveUppercase: true };

type CamelCaseFromArray<
    W extends string[],
    Options extends Required<CamelCaseOptions>,
    OutputString extends string = '',
> = W extends [infer FirstWord extends string, ...infer RemainingWords extends string[]]
    ? Options['preserveConsecutiveUppercase'] extends true
        ? `${Capitalize<FirstWord>}${CamelCaseFromArray<RemainingWords, Options>}`
        : `${Capitalize<Lowercase<FirstWord>>}${CamelCaseFromArray<RemainingWords, Options>}`
    : OutputString;

export type CamelCase<Type, Options extends CamelCaseOptions = {}> = Type extends string
    ? string extends Type
        ? Type
        : Uncapitalize<CamelCaseFromArray<
            Words<Type extends Uppercase<Type> ? Lowercase<Type> : Type>,
            ApplyDefaultOptions<CamelCaseOptions, DefaultCamelCaseOptions, Options>
        >>
    : Type;

// @filename: main.ts
import type { CamelCase } from "./camelcase";

// This would cause a stack overflow during variance computation
function boom<T>(x: CamelCase<T>, y: CamelCase<T, {}>) {
    x = y
    y = x
}
