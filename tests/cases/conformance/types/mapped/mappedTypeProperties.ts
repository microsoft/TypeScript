// @declaration: true
export type PlaceType = 'openSky' | 'roofed' | 'garage'
type Before = {
    model: 'hour' | 'day';
    [placeType in PlaceType]: void;
}

type After = {
    [placeType in PlaceType]: void;
    model: 'hour' | 'day'
}

type AfterQuestion = {
    [placeType in PlaceType]?: void;
    model: 'hour' | 'day';
}
type AfterMethod = {
    [placeType in PlaceType]?: void;
    model(duration: number): 'hour' | 'day';
}

type AfterImplicit = {
    [placeType in PlaceType]
    model: 'hour' | 'day';
}
type AfterImplicitQ = {
    [placeType in PlaceType]?
    model: 'hour' | 'day'
}
type AfterImplicitQ = {
    [placeType in PlaceType]?
    model(): 'hour' | 'day'
}

