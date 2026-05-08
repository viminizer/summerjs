import "reflect-metadata"
import type { ClassRef } from "./types/container.js";
import type { ReflectionKeys } from "../libs/constants.js";

export const Reflector = {

  get<TData = unknown>(key: ReflectionKeys, target: ClassRef): TData {
    return Reflect.getMetadata(key, target) as TData;
  },

  set<TData = any>(key: ReflectionKeys, value: TData, target: ClassRef) {
    Reflect.defineMetadata(key, value, target);
  }
}
