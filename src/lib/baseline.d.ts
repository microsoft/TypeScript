/// <reference lib="es5" />

// ES2015
/// <reference lib="es2015.core" />
/// <reference lib="es2015.symbol" />
/// <reference lib="es2015.symbol.wellknown" />
/// <reference lib="es2015.iterable" />
/// <reference lib="es2015.collection" />
/// <reference lib="es2015.promise" />
/// <reference lib="es2015.proxy" />
/// <reference lib="es2015.reflect" />
/// <reference lib="es2015.generator" />

// ES2016
/// <reference lib="es2016.array.include" />

// ES2017
/// <reference lib="es2017.object" />
/// <reference lib="es2017.string" />
/// <reference lib="es2017.sharedmemory" />
/// <reference lib="es2017.intl" />
/// <reference lib="es2017.typedarrays" />

// ES2018
/// <reference lib="es2018.asyncgenerator" />
/// <reference lib="es2018.asynciterable" />
/// <reference lib="es2018.promise" />
/// <reference lib="es2018.regexp" />
/// <reference lib="es2018.intl" />

// ES2019
/// <reference lib="es2019.array" />
/// <reference lib="es2019.object" />
/// <reference lib="es2019.string" />
/// <reference lib="es2019.symbol" />
/// <reference lib="es2019.intl" />

// ES2020
/// <reference lib="es2020.bigint" />
/// <reference lib="es2020.promise" />
/// <reference lib="es2020.sharedmemory" />
/// <reference lib="es2020.string" />
/// <reference lib="es2020.symbol.wellknown" />
/// <reference lib="es2020.intl" />
/// <reference lib="es2020.number" />

// ES2021
/// <reference lib="es2021.promise" />
/// <reference lib="es2021.string" />
/// <reference lib="es2021.weakref" />
/// <reference lib="es2021.intl" />

// ES2022
/// <reference lib="es2022.array" />
/// <reference lib="es2022.error" />
/// <reference lib="es2022.object" />
/// <reference lib="es2022.string" />
/// <reference lib="es2022.regexp" />
/// <reference lib="es2022.intl" />

// TODO(need-discussion): Intentionally omitting ES2023 array-by-copy methods here.
// - findLast / findLastIndex (feature: array-findlast) are Baseline "high",
//   but they co-reside in `src/lib/es2023.array.d.ts` with array-by-copy
//   methods (toReversed/toSorted/toSpliced/with) which are Baseline "low".
//   Referencing the whole file would incorrectly allow low features.
// - Follow-up: consider splitting `es2023.array.d.ts` into separate fragments
//   (e.g. `es2023.array.findlast` and `es2023.array.by-copy`) so `baseline`
//   can safely include only the high part.
