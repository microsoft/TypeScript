enum Test {
    A,
    B,
    C = Math.floor(Math.random() * 1000),
    D = 10,
    E // Error but shouldn't be
}
