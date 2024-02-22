export default function createClone<T>(item: T[]): T[] {
  return JSON.parse(JSON.stringify(item));
}
