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
export namespace colors {
    const royalBlue: string;
}
export namespace brandColors {
    import purple = colors.royalBlue;
    export { purple };
}
