export function DeepCopy(target: any) {
  return JSON.parse(JSON.stringify(target))
}
