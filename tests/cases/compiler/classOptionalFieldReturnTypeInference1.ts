// @strict: true
// @target: esnext
// @lib: esnext,dom
// @noEmit: true

declare abstract class BasePrompt {
  choice<Choice extends string, Result extends any = Choice>(
    title: string,
    choices: readonly Choice[],
  ): Promise<Result>;
}

type MiddlewareNode = {
  name?: string;
};

declare class Codemods {
  registerMiddleware(
    stack: "server" | "router" | "named",
    middleware: MiddlewareNode[],
  ): Promise<void>;
}

declare class BaseCommand {
  prompt: BasePrompt;
  createCodemods(): Promise<Codemods>;
}

export default class MakeMiddleware extends BaseCommand {
  declare name: string;

  declare stack?: "server" | "named" | "router";


  async run() {
    const stackChoices = ["server", "router", "named"];

    if (!this.stack) {
      this.stack = await this.prompt.choice(
        "Under which stack you want to register the middleware?",
        stackChoices,
      );
    }

    if (!stackChoices.includes(this.stack)) {
      return;
    }

    const codemods = await this.createCodemods();

    await codemods.registerMiddleware(this.stack, [
      {
        name: this.name,
      },
    ]);
  }
}

declare function dom$<T extends HTMLElement>(description: string): T;

export abstract class PeekViewWidget {
  protected _titleElement?: HTMLDivElement;

  protected _fillHead(container: HTMLElement, noCloseAction?: boolean): void {
    this._titleElement = dom$(".peekview-title");
  }
}
