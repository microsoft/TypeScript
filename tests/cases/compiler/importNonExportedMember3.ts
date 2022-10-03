// @Filename: a.ts
export {}
interface Foo {}
interface Foo {}
namespace Foo {}

// @Filename: b.ts
import { Foo } from './a';
