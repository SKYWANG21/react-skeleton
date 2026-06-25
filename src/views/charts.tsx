import { Input } from "@material-ui/core";
import React from "react";

import { cartesianProduct } from "@/utils";

const product = cartesianProduct<[number, string, string, number]>([1, 2, 3]);
console.log(product);

function decimal2DMS(deg: number) {
  const degrees = Math.floor(Math.abs(deg));
  const minutesFloat = (deg - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60);

  return `${degrees}° ${minutes}' ${seconds}″`;
}
function DMS2Decimal(
  degrees: number,
  minutes: number,
  seconds: number,
  direction: string
): number {
  let decimal = degrees + minutes / 60 + seconds / 3600;
  decimal = Math.round(decimal * 100000000) / 100000000;
  if (direction === "S" || direction === "W") {
    decimal = -decimal;
  }
  return decimal;
}

export default function Charts() {
  const [deg, setDeg] = useState("0");
  const [dms, setDms] = useState(["0", "0", "0", "N"]);
  function updateDMS(val, index) {
    const temp = [...dms];
    temp[index] = val;
    setDms([...temp]);
  }
  return (
    <>
      <h2>Charts Components</h2>
      <div>Decimal2DMS</div>
      <Input value={deg} onChange={(e) => setDeg(e.target.value)}></Input>
      <div>DMS：{decimal2DMS(Number(deg))}</div>
      <div>DMS2Decimal</div>
      <div>
        <Input
          value={dms[0]}
          onChange={(e) => updateDMS(e.target.value, 0)}
        ></Input>
        <Input
          value={dms[1]}
          onChange={(e) => updateDMS(e.target.value, 1)}
        ></Input>
        <Input
          value={dms[2]}
          onChange={(e) => updateDMS(e.target.value, 2)}
        ></Input>
        <Input
          value={dms[3]}
          onChange={(e) => updateDMS(e.target.value, 3)}
        ></Input>
      </div>
      <div>
        Decimal：
        {DMS2Decimal(Number(dms[0]), Number(dms[1]), Number(dms[2]), dms[3])}
      </div>
    </>
  );
}
