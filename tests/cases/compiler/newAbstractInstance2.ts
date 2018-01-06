// @Filename: /a.ts
export default abstract class {}

// @Filename: /b.ts
import A from "./a";
new A();
