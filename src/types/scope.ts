const Scope = {
  SINGLETON: "SINGLETON",
  TRANSIENT: "TRANSIENT",
  REQUEST: "REQUEST",
} as const;

export type Scope = (typeof Scope)[keyof typeof Scope];
