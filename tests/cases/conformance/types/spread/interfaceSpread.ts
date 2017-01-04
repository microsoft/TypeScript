interface Congealed<T, U> {
    ...T
    ...U
}

let sandwich: Congealed<{ jam: number }, { peanutButter: number }>;
sandwich.jam;
sandwich.peanutButter;
