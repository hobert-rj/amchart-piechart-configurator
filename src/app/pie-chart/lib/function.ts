export function DeepCopy<T>(target: T): T {
  return JSON.parse(JSON.stringify(target))
}
