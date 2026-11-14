// @strict: true
// @target: esnext
// @noEmit: true
// @checkOrder: default,typesfirst

// Reduced from chart.js typings (PeerTube, Unleash). Chart, TooltipModel and
// ScriptableContext form a variance circularity. ScriptableContext<T> is in
// fact invariant: ScriptableContext<"bar" | "line"> is not assignable to
// ScriptableContext<"bar"> ('dataset.data' differs), so Chart<"bar"> is not
// assignable to Chart<ChartType> and the assignment below must be an error.
// Measuring variances from the circularity's entry, main recorded
// ScriptableContext/TooltipModel as bivariant (measured mid-cycle) and
// accepted it; main reports this error too when ScriptableContext's variance
// is measured first (e.g. after checking a ScriptableContext assignment).

declare class Element<T, O> { options: O }
type DeepPartial<T> = T extends Function ? T : T extends object ? _DeepPartialObject<T> : undefined
type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> }
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never
type AnyObject = Record<string, any>
interface ScriptableContext<TType extends ChartType> {
    dataset: UnionToIntersection<ChartDataset<TType>>
}
type Scriptable<T, TContext> = (ctx: TContext) => T
declare class Chart<TType extends ChartType = ChartType, TData = TType> {
    config: ChartConfigurationCustomTypesPerDataset<TType>
}
interface Plugin<TType extends ChartType> {
    id: string;
    beforeDraw(chart: Chart<TType>): void
}
interface CoreChartOptions<TType extends ChartType> {
    backgroundColor: Scriptable<number, ScriptableContext<TType>>
}
interface AnimationSpec<TType extends ChartType> {
    delay: Scriptable<number, ScriptableContext<TType>>
}
interface TooltipModel<TType extends ChartType> extends Element<AnyObject, TooltipOptions<TType>> {
    chart: Chart<TType>
}
interface TooltipDatasetCallbacks<TType extends ChartType, Model = TooltipModel<TType>> {
    (this: Model): void
}
interface TooltipOptions<TType extends ChartType> {
    animation: AnimationSpec<TType>
}
interface TooltipDatasetOptions<TType extends ChartType> {
    callbacks: TooltipDatasetCallbacks<TType>
}
interface PluginDatasetOptionsByType<TType extends ChartType> {
    tooltip: TooltipDatasetOptions<TType>
}
interface ChartTypeRegistry {
    bar: { defaultDataPoint: [] }
    line: { defaultDataPoint: null }
}
type ChartType = keyof ChartTypeRegistry
type DatasetChartOptions<TType extends ChartType> = { [key in TType]: {} }
type ChartOptions<TType extends ChartType> = Exclude<DeepPartial<CoreChartOptions<TType> & DatasetChartOptions<TType> & TType>, undefined>
interface ChartDatasetProperties<TType, TData> {
    data: TData
}
type ChartDataset<TType extends ChartType, TData = TType> =
    DeepPartial<ChartTypeRegistry[TType] & PluginDatasetOptionsByType<TType>> & ChartDatasetProperties<TType, TData>
type ChartDatasetCustomTypesPerDataset<TType extends ChartType> = DeepPartial<PluginDatasetOptionsByType<TType>>
interface ChartDataCustomTypesPerDataset<TType extends ChartType> {
    datasets: ChartDatasetCustomTypesPerDataset<TType>
}
export interface ChartConfigurationCustomTypesPerDataset<TType extends ChartType> {
    data: ChartDataCustomTypesPerDataset<TType>
    options: ChartOptions<TType>
}

const p: Plugin<"bar"> = { id: "x", beforeDraw: (chart: Chart) => {} };
