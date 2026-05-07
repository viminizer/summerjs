import { Reflector } from "../core/reflector.js";
import type { InjectableParams } from "./types/injectable.js";

export function Injectable(params?: InjectableParams) {
  return function (target: any) {
    if (params) {
      if (params.scope) {
        Reflector.set("scope", params.scope, target);
      } if (params.lazy) {
        Reflector.set("lazy", true, target);
      }
    }
    Reflector.set("injectable", true, target);
  }
}
