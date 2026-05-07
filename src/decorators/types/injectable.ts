import type { Scope } from "../../types/scope.js";

export interface InjectableParams {
  scope?: Scope;
  lazy?: boolean
}
