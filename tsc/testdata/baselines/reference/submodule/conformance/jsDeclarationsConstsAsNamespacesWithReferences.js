//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsConstsAsNamespacesWithReferences.ts] ////

//// [index.js]
export const colors = {
    royalBlue: "#6400e4",
};

export const brandColors = {
    purple: colors.royalBlue,
};

//// [index.js]
export const colors = {
    royalBlue: "#6400e4",
};
export const brandColors = {
    purple: colors.royalBlue,
};


//// [index.d.ts]
export declare const colors: {
    royalBlue: string;
};
export declare const brandColors: {
    purple: string;
};
