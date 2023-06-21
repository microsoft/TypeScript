
// @strict: true
// @target: es2015

export let x = Math.random() ? 0 : 1;

export let y = Math.random() ? x : "";

export const yConst = Math.random() ? x : "";

export let group = { x: Math.random()? ["A"]: ["B"] } as const

export let group2 = { 
    // Nested object has literals and is readonly 
    // justNested: { readonly x: "A" },
    justNested: {x: "A" },
    // conditional expression does not flow  const-ness
    // conditionalNoSpread: { x: string; }
    conditionalNoSpread: Math.random()? { x: "A" }: { x: "A"},

    // conditional expression WITH ... flows some const-ness
    // The property is readonly, but does not have literal type
    // noSpread: { readonly x: string; }
    conditionalSpread: { ...Math.random()? { x: "A" }: { x: "A"} },
} as const




const ParametricColumnAlias = {
    ExposureWeightBeforeCashSim: "ExposureWeightBeforeCashSim",
    ExposureWeight: "ExposureWeight"
} as const
export const targetTypeConfig = {
    targetBaselineColumn: Math.random()
        ? ParametricColumnAlias.ExposureWeightBeforeCashSim
        : ParametricColumnAlias.ExposureWeight,
} as const;



export const getMetricStatusFromResponse = (sessionResponse: boolean) =>
    sessionResponse
        ? 'SUCCESS'
        : 'FAILURE';