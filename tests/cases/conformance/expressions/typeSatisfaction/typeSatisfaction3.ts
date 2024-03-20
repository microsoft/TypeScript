type T1 = {
    p: string;
}

class C1 {
    p: number;
} satisfies T1;

class C2 {
    p: string;
} satisfies T1;
