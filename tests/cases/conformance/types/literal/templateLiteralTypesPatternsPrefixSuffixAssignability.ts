const s1: `:${string}:` = ":"; // should error
const s2: `:${string}:` = "::"; // ok
const s3: `:${string}:${string}:` = "::"; // should error
const s4: `:${string}:${string}:` = ":::"; // ok