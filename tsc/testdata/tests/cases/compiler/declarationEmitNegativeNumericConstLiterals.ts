// @declaration: true

declare function id<const T>(value: T): T;

export const a = -1e500 as const;
export const b = -123456789012345678901234567890 as const;
export const c = ((-1e500)) as const;
export const d = { value: -1e500 } as const;
export const e = [-1e500] as const;
export const f = id(-1e500);
export const g = -1e500;
export const h = 1e500;
export const i = { [-1e500]: 1 } as const;
