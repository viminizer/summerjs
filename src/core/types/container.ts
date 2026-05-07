import type { InjectableParams } from "../../decorators/types/injectable.js";

export type Instance = any;
export type ClassRef<T = unknown> = new (...args: any[]) => T;
export type Token = string;
export type Provider = { ref: ClassRef, deps: ClassRef[], params: InjectableParams }
