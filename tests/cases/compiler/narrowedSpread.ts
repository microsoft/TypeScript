// @strict: true
function useX(obj: { x: number }) { }
function fn1(arg: { x?: number }) {
    arg.x && useX({ ...arg });
}

function useXYZ(obj: { w: number; x: number; y: number; z: number }) { }
function fn2(arg: { x?: number; y: number | null; z: string | number }) {
    if (arg.x && arg.y !== null) {
        if (typeof arg.z === "number") {
            useXYZ({ ...arg, w: 100 });
        }
    }
} 

type None = { type: "none" };
type Some<T> = { type: "some"; value: T };
type Option<T> = None | Some<T>;
function useSome<T>(obj: { opt: Some<T> }) { }

function fn3<T>(arg: { opt: Option<T> }) {
    if (arg.opt.type === "some") {
        useSome({ ...arg });
    }
}





