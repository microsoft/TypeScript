// @noUnusedLocals:true

// @Filename: /a.ts
import * as _ from "./a";

for (const _ of []) { }

for (const _ in []) { }

namespace _ns {
    let _;
    for (const _ of []) { }

    for (const _ in []) { }
}
