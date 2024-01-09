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


/// [Declarations] ////



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
export declare const getLocales: <T extends LocaleData>({ app, name, default: defaultLocalesConfig, config, }: GetLocalesOptions<T>) => ConvertLocaleConfig<T>;
export {};
//# sourceMappingURL=declarationEmitBindingPatternWithReservedWord.d.ts.map