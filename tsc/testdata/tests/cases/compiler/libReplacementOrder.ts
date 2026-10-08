// @target: es2015
// @lib: es5,es2015,es2016,es2017,es2018,es2019,es2020,es2021,es2022,es2023,es2024,es2025,esnext,dom,scripthost
// @libReplacement: true
// @noEmit: true
// @noTypesAndSymbols: true
// @noImplicitReferences: true

// @Filename: /node_modules/@typescript/lib-es2015/index.d.ts
interface Pair2015_2016 { which(): "es2015" }
// @Filename: /node_modules/@typescript/lib-es2016/index.d.ts
interface Pair2015_2016 { which(): "es2016" }
interface Pair2016_2017 { which(): "es2016" }
// @Filename: /node_modules/@typescript/lib-es2017/index.d.ts
interface Pair2016_2017 { which(): "es2017" }
interface Pair2017_2018 { which(): "es2017" }
// @Filename: /node_modules/@typescript/lib-es2018/index.d.ts
interface Pair2017_2018 { which(): "es2018" }
interface Pair2018_2019 { which(): "es2018" }
// @Filename: /node_modules/@typescript/lib-es2019/index.d.ts
interface Pair2018_2019 { which(): "es2019" }
interface Pair2019_2020 { which(): "es2019" }
// @Filename: /node_modules/@typescript/lib-es2020/index.d.ts
interface Pair2019_2020 { which(): "es2020" }
interface Pair2020_2021 { which(): "es2020" }
// @Filename: /node_modules/@typescript/lib-es2021/index.d.ts
interface Pair2020_2021 { which(): "es2021" }
interface Pair2021_2022 { which(): "es2021" }
// @Filename: /node_modules/@typescript/lib-es2022/index.d.ts
interface Pair2021_2022 { which(): "es2022" }
interface Pair2022_2023 { which(): "es2022" }
// @Filename: /node_modules/@typescript/lib-es2023/index.d.ts
interface Pair2022_2023 { which(): "es2023" }
interface Pair2023_2024 { which(): "es2023" }
// @Filename: /node_modules/@typescript/lib-es2024/index.d.ts
interface Pair2023_2024 { which(): "es2024" }
interface Pair2024_2025 { which(): "es2024" }
// @Filename: /node_modules/@typescript/lib-es2025/index.d.ts
interface Pair2024_2025 { which(): "es2025" }
interface Pair2025_next { which(): "es2025" }
// @Filename: /node_modules/@typescript/lib-esnext/index.d.ts
interface Pair2025_next { which(): "esnext" }
interface PairNext_dom { which(): "esnext" }
// @Filename: /node_modules/@typescript/lib-dom/index.d.ts
interface PairNext_dom { which(): "dom" }
interface PairDom_host { which(): "dom" }
// @Filename: /node_modules/@typescript/lib-scripthost/index.d.ts
interface PairDom_host { which(): "scripthost" }

// @Filename: /src/index.ts
declare const p0: Pair2015_2016; const after0: "es2016" = p0.which();
declare const p1: Pair2016_2017; const after1: "es2017" = p1.which();
declare const p2: Pair2017_2018; const after2: "es2018" = p2.which();
declare const p3: Pair2018_2019; const after3: "es2019" = p3.which();
declare const p4: Pair2019_2020; const after4: "es2020" = p4.which();
declare const p5: Pair2020_2021; const after5: "es2021" = p5.which();
declare const p6: Pair2021_2022; const after6: "es2022" = p6.which();
declare const p7: Pair2022_2023; const after7: "es2023" = p7.which();
declare const p8: Pair2023_2024; const after8: "es2024" = p8.which();
declare const p9: Pair2024_2025; const after9: "es2025" = p9.which();
declare const p10: Pair2025_next; const after10: "esnext" = p10.which();
declare const p11: PairNext_dom; const after11: "dom" = p11.which();
declare const p12: PairDom_host; const after12: "scripthost" = p12.which();
