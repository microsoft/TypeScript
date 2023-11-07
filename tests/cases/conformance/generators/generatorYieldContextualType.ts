// @target: esnext
// @strict: true
// @noEmit: true
declare function f1<T, R, S>(gen: () => Generator<R, T, S>): void;
f1<0, 0, 1>(function* () {
	const a = yield 0;
	return 0;
});

declare function f2<T, R, S>(gen: () => Generator<R, T, S> | AsyncGenerator<R, T, S>): void;
f2<0, 0, 1>(async function* () {
	const a = yield 0;
	return 0;
});

// repro from #41428
enum Directive {
  Back,
  Cancel,
  LoadMore,
  Noop,
}

namespace Directive {
  export function is<T>(value: Directive | T): value is Directive {
    return typeof value === "number" && Directive[value] != null;
  }
}

interface QuickPickItem {
  label: string;
  description?: string;
  detail?: string;
  picked?: boolean;
  alwaysShow?: boolean;
}

interface QuickInputStep {
  placeholder?: string;
  prompt?: string;
  title?: string;
}

interface QuickPickStep<T extends QuickPickItem = QuickPickItem> {
  placeholder?: string;
  title?: string;
}

type StepGenerator =
  | Generator<
      QuickPickStep | QuickInputStep,
      StepResult<void | undefined>,
      any | undefined
    >
  | AsyncGenerator<
      QuickPickStep | QuickInputStep,
      StepResult<void | undefined>,
      any | undefined
    >;

type StepItemType<T> = T extends QuickPickStep<infer U>
  ? U[]
  : T extends QuickInputStep
  ? string
  : never;
namespace StepResult {
  export const Break = Symbol("BreakStep");
}
type StepResult<T> = typeof StepResult.Break | T;
type StepResultGenerator<T> =
  | Generator<QuickPickStep | QuickInputStep, StepResult<T>, any | undefined>
  | AsyncGenerator<
      QuickPickStep | QuickInputStep,
      StepResult<T>,
      any | undefined
    >;
type StepSelection<T> = T extends QuickPickStep<infer U>
  ? U[] | Directive
  : T extends QuickInputStep
  ? string | Directive
  : never;
type PartialStepState<T = unknown> = Partial<T> & {
  counter: number;
  confirm?: boolean;
  startingStep?: number;
};
type StepState<T = Record<string, unknown>> = T & {
  counter: number;
  confirm?: boolean;
  startingStep?: number;
};

function canPickStepContinue<T extends QuickPickStep>(
  _step: T,
  _state: PartialStepState,
  _selection: StepItemType<T> | Directive
): _selection is StepItemType<T> {
  return false;
}

function createPickStep<T extends QuickPickItem>(
  step: QuickPickStep<T>
): QuickPickStep<T> {
  return step;
}

function* showStep<
  State extends PartialStepState & { repo: any },
  Context extends { repos: any[]; title: string; status: any }
>(state: State, _context: Context): StepResultGenerator<QuickPickItem> {
  const step: QuickPickStep<QuickPickItem> = createPickStep<QuickPickItem>({
    title: "",
    placeholder: "",
  });
  const selection: StepSelection<typeof step> = yield step;
  return canPickStepContinue(step, state, selection)
    ? selection[0]
    : StepResult.Break;
}
