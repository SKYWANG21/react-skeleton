import React from "react";

import { cartesianProduct } from "@/utils";

const product = cartesianProduct<[number, string, string, number]>([1, 2, 3]);
console.log(product);
export default function Charts() {
  return <div>Charts</div>;
}
