// @strict: true

type PartialDeep<T> = T extends object ? { [K in keyof T]?: PartialDeep<T[K]> } : T;
type Theme<T extends object> = T & { style: { message: (text: string) => string } };
declare function makeTheme<T extends object>(...themes: PartialDeep<Theme<T>>[]): Theme<T>;
declare const theme: { style: { description: (text: string) => string } };
declare const customization: PartialDeep<Theme<typeof theme>>;
const merged = makeTheme(theme, customization);
merged.style.description("");
