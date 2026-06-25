/** 遍历所有string属性名 */
declare type ErgodicKeys<T = Object> = {
  [K in keyof T]: K & string;
}[keyof T];
