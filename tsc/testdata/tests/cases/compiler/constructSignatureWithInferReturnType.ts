// @declaration: true

type ExtractReturn<T> = T extends { new(): infer R } ? R : never;
