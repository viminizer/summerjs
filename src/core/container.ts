import "reflect-metadata"
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

    if (this.registry.has(ref.name)) { return; }

    const isInjectable = Reflector.get<boolean>("injectable", ref)
    if (!isInjectable) {
      return;
    }
    const { deps, params } = this.extractParams(ref);

    this.registry.set(ref.name, { ref, deps, params })

    if (deps.length === 0) return;
    console.log("---deps for [", ref.name, "] ", deps.map(d => d.name))
    deps.map((d: ClassRef) => this.register(d))
  }


  resolve<T>(ref: ClassRef<T>, resolving = new Set()): T | null {

    if (resolving.has(ref.name)) throw new Error(`Circular Dependency detected: ${Array.from(resolving).join("->")}`)

    if (this.cache.has(ref.name)) {
      return this.cache.get(ref.name)
    }
    resolving.add(ref.name)
    console.log("RESOLVING: ", ref.name, " ", resolving.entries())
    const provider = this.registry.get(ref.name);
    if (!provider) {
      return null;
    }
    const deps = provider.deps.map((d: ClassRef) => this.resolve(d, resolving))
    resolving.delete(ref.name)
    const instance = new provider.ref(...deps);
    if (provider.params.scope === "SINGLETON") {
      this.cache.set(ref.name, instance);
    }
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

