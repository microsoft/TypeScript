function a () {
    let x: number;
    let y: any
    ({ x, ...y } = ({ } as any));
}
