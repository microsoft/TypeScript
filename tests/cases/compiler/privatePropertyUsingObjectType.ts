//@module: amd
export class FilterManager {
    private _filterProviders: { index: IFilterProvider; };
    private _filterProviders2: { [index: number]: IFilterProvider; };
    private _filterProviders3: { (index: number): IFilterProvider; };
    private _filterProviders4: (index: number) => IFilterProvider;
}
export interface IFilterProvider {
}
