// @strictNullChecks: true
// This should not be a circularity error. See
// https://github.com/microsoft/TypeScript/pull/57465#issuecomment-1960271216
export type Client = ReturnType<typeof getPrismaClient> extends new () => infer T ? T : never

export function getPrismaClient(options?: any) {
  class PrismaClient {
    self: Client;
    constructor(options?: any) {
      return (this.self = applyModelsAndClientExtensions(this));
    }
  }

  return PrismaClient
}

export function applyModelsAndClientExtensions(client: Client) {
  return client;
}
