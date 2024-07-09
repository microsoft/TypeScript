//// [tests/cases/compiler/declarationEmitBindingPatternWithReservedWord.ts] ////

//// [declarationEmitBindingPatternWithReservedWord.ts]
type LocaleData = Record<string, never>
type ConvertLocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  T
>;
type LocaleConfig<T extends LocaleData = LocaleData> = Record<string, Partial<T>>;

export interface GetLocalesOptions<T extends LocaleData> {
    app: unknown;
    default: ConvertLocaleConfig<T>;
    config?: LocaleConfig<T> | undefined;
    name?: string;
}

export const getLocales = <T extends LocaleData>({
    app,
    name,
    default: defaultLocalesConfig,
    config: userLocalesConfig = {},
}: GetLocalesOptions<T>): ConvertLocaleConfig<T> => {
    return defaultLocalesConfig;
};


//// [declarationEmitBindingPatternWithReservedWord.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocales = void 0;
var getLocales = function (_a) {
    var app = _a.app, name = _a.name, defaultLocalesConfig = _a.default, _b = _a.config, userLocalesConfig = _b === void 0 ? {} : _b;
    return defaultLocalesConfig;
};
exports.getLocales = getLocales;


//// [declarationEmitBindingPatternWithReservedWord.d.ts]
type LocaleData = Record<string, never>;
type ConvertLocaleConfig<T extends LocaleData = LocaleData> = Record<string, T>;
type LocaleConfig<T extends LocaleData = LocaleData> = Record<string, Partial<T>>;
export interface GetLocalesOptions<T extends LocaleData> {
    app: unknown;
    default: ConvertLocaleConfig<T>;
    config?: LocaleConfig<T> | undefined;
    name?: string;
}
export declare const getLocales: <T extends LocaleData>({ app, name, default: defaultLocalesConfig, config: userLocalesConfig, }: GetLocalesOptions<T>) => ConvertLocaleConfig<T>;
export {};
