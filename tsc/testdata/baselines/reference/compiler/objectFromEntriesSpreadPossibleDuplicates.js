//// [tests/cases/compiler/objectFromEntriesSpreadPossibleDuplicates.ts] ////

//// [objectFromEntriesSpreadPossibleDuplicates.ts]
declare const icons: { iconName: "bicycle" | "book" }[];
export const mapping = {
    bicycle: 0,
    ...Object.fromEntries(icons.map(icon => [icon.iconName, 1])),
};


//// [objectFromEntriesSpreadPossibleDuplicates.js]
export const mapping = {
    bicycle: 0,
    ...Object.fromEntries(icons.map(icon => [icon.iconName, 1])),
};
