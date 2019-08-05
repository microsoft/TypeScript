/*====== /lib/src/sub-project-2/index.d.ts ======*/
declare const variable: {
    key: import("../common/nominal").Nominal<string, "MyNominal">;
};
export declare function getVar(): keyof typeof variable;
export {};
