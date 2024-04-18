import { useState } from "react";

/** 定义属性类型并设默认值为null */
export function nullable<T>(param?): T | null {
  return param ? param : null;
}

/** boolean组合式函数
 * @param boolean 初始值
 */
export function useBoolean(boolean: boolean = false) {
  const [bool, setBool] = useState(boolean);
  const toggle = () => {
    setBool(!bool);
  };
  const setTrue = () => {
    setBool(true);
  };
  const setFalse = () => {
    setBool(false);
  };
  return { bool, toggle, setTrue, setFalse };
}

/** 快排 */
export function quickSort(arr: any[], key?: string) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left: any = [];
  let right: any = [];

  for (let i = 0; i < arr.length; i++) {
    if (key) {
      if (arr[i][key] > pivot[key]) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    } else {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  }
  return quickSort(left, key).concat([pivot], quickSort(right, key));
}
