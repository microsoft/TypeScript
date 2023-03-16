const p: string ="";
export function test<UF>(p: number, r: typeof p): UF extends infer TF ? TF: typeof p {
    return null!
}