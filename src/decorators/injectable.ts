import type { InjectableParams } from "./types/injectable.js";

export function Injectable(params?: InjectableParams) {
  return function (target: any) {
    if (params) {
      if (params.scope) {
        Reflect.defineMetadata("scope", params.scope, target);
      } if (params.lazy) {
        Reflect.defineMetadata("lazy", true, target);
      }
    }
    Reflect.defineMetadata("injectable", true, target);
  }
}
