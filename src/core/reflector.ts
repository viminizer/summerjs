import "reflect-metadata"
import type { ClassRef } from "./types/container.js";

export const Reflector = {

  get<TData = unknown>(key: string, target: ClassRef): TData {
    return Reflect.getMetadata(key, target) as TData;
  },

  set<TData = any>(key: string, value: TData, target: ClassRef) {
    Reflect.defineMetadata(key, value, target);
  }
}
