function minimalExample1() {
    type Disc =
        | { kind: "hddvd" }
        | { kind: "bluray" }

    function foo(x: Disc[]) {
    }

    foo([
        { kind: "bluray", },
        { kind: "hdpvd", }
    ]);

    const ds: Disc[] = [
        { kind: "bluray", },
        { kind: "hdpvd", }
    ];
}