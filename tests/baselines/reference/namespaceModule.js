//// [namespaceModule.ts]
namespace z {}

z;

namespace x {
    export type z = string;
}

x;


//// [namespaceModule.js]
z;
x;
