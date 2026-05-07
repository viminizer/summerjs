const Scope = {
  SINGLETON: "SINGLETON",
  TRANSIENT: "TRANSIENT",
} as const;

export type Scope = (typeof Scope)[keyof typeof Scope];
