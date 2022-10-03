//// [mappedTypeMultiInference.ts]
interface Style {
    flashy: any;
}

declare function mergeStyleSets<K extends string>(
    ...cssSets: { [P in K]?: Style }[]): { [P in K]: Style };

// Expected:
//   let x: {
//       a: Style;
//       b: Style;
//   }
let x = mergeStyleSets(
    {},
    {
        a: { flashy: true },
    },
    {
        b: { flashy: true },
    },
)

//// [mappedTypeMultiInference.js]
// Expected:
//   let x: {
//       a: Style;
//       b: Style;
//   }
var x = mergeStyleSets({}, {
    a: { flashy: true }
}, {
    b: { flashy: true }
});
