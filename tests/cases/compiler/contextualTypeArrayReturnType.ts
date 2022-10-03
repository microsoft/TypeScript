interface IBookStyle {
    initialLeftPageTransforms?: (width: number) => NamedTransform[];
}

interface NamedTransform {
    [name: string]: Transform3D;
}

interface Transform3D {
    cachedCss: string;
}

var style: IBookStyle = {
    initialLeftPageTransforms: (width: number) => {
        return [
            {'ry': null }
        ];
    }
}
