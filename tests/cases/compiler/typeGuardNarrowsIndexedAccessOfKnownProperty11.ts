// @strict: true

enum E { A, B }

declare const m: { [K in E]: string | null };

if (m[E.A] !== null) {
    m[E.A].toString(); // string
}
