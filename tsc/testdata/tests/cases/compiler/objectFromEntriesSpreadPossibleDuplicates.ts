// @target: es2020
// @strict: true

declare const icons: { iconName: "bicycle" | "book" }[];
export const mapping = {
    bicycle: 0,
    ...Object.fromEntries(icons.map(icon => [icon.iconName, 1])),
};
