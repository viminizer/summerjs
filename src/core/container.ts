import type { ClassRef, Instance, Provider, Token } from "./types/container.js";
import type { Scope } from "../types/scope.js";
import type { InjectableParams } from "../decorators/types/injectable.js";
import { Reflector } from "./reflector.js";


export class SummerContainer {

  private registry: Map<Token, Provider>
  private cache: Map<Token, Instance>

  constructor() {
    this.cache = new Map();
    this.registry = new Map();
  }

  printRegistry() {
    console.log("\nREGISRTY")
    console.log(this.registry.entries())
  }

  printCache() {
    console.log("\nCACHE")
    console.log(this.cache.entries())
  }

  register(ref: ClassRef): void {
    const isInjectable = Reflector.get<boolean>("injectable", ref)
    if (!isInjectable) {
      return;
    }
    const { deps, params } = this.extractParams(ref);
    this.registry.set(ref.name, { ref, deps, params })
    if (deps.length === 0) return;
    deps.map((d: ClassRef) => this.register(d))
  }

  resolve<T>(ref: ClassRef<T>): T | null {

    if (this.cache.has(ref.name)) {
      return this.cache.get(ref.name)
    }

    const provider = this.registry.get(ref.name);

    if (!provider) {
      return null;
    }

    const deps = provider.deps.map((d: ClassRef) => this.resolve(d))
    const instance = new provider.ref(...deps);
    this.cache.set(ref.name, instance);
    return instance as T;
  }

  private extractParams(ref: ClassRef): { deps: ClassRef[], params: InjectableParams } {
    const deps = Reflector.get<ClassRef[]>("design:paramtypes", ref) || [];
    const scope = Reflector.get<Scope>("scope", ref) || "SINGLETON";
    const lazy = Reflector.get<boolean>("lazy", ref) || false;
    return {
      deps, params: { scope, lazy }
    }
  }
}

