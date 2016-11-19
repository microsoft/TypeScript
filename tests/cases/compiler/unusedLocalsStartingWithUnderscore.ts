//@noUnusedLocals:true

for (const _ of []) { }

for (const _ in []) { }

namespace M {
    let _;
    for (const _ of []) { }

    for (const _ in []) { }
}
    