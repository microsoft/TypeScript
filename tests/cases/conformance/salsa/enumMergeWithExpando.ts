// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: lovefield-ts.d.ts
// bug #27352, crashes from github.com/google/lovefield
declare namespace lf {
    export enum Order { ASC, DESC }
}

// @Filename: enums.js
lf.Order = {}
lf.Order.DESC = 0;
lf.Order.ASC = 1;
