// === Auto Imports === 
```ts
// @FileName: /main.ts
let x: MyT/*type*/;
let y = MyV;

``````ts
import type { MyType } from "./types";

let x: MyT;
let y = MyV;

```

// === Auto Imports === 
```ts
// @FileName: /main.ts
let x: MyT;
let y = MyV/*value*/;

``````ts
import { MyValue } from "./types";

let x: MyT;
let y = MyV;

```

