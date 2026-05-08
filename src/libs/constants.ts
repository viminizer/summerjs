export const ReflectionKeys = {
  INJECTABLE: "injectable"
  , PARAM_TYPES: "design:paramtypes"
  , SCOPE: "scope"
  , LAZY: 'lazy'

} as const;

export type ReflectionKeys = (typeof ReflectionKeys)[keyof typeof ReflectionKeys];
