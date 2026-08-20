// @target: es2015
function a () {
    let x: number;
    let y: any
    ({ x, ...y } = ({ } as any));
}
