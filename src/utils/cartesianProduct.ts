/** 笛卡尔积 */
export function cartesianProduct<T extends any[]>(...arr: any[][]): T[] {
  return arr.reduce<T[]>(
    (total, currentVal) =>
      total.flatMap<T>((it) => currentVal.map<T>((el) => [...it, el] as T)),
    [[]] as T
  );
}
