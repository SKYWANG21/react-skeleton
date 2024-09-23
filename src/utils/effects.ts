declare type Timeout = ReturnType<typeof setTimeout>;

/** 数字自增 */
export function numberAutoIncrease(
  el: HTMLElement,
  binding: { value: number | string; duration: number }
) {
  const { value, duration } = binding;
  let timer: null | Timeout = null;
  // 最终要显示的数字
  let finalNum;
  // 动画间隔
  let rate = 30;
  // 总时长
  let time = duration || 2000;
  // 步长,数据增加间隔
  let step = finalNum / (time / rate);

  // 重复则不执行
  if (value.toString() === el.innerText) return;
  typeof value == "number"
    ? (finalNum = value)
    : // eslint-disable-next-line no-useless-escape
      (finalNum = parseFloat(value.replace(/[\,]/g, "")));

  if (!step) {
    if (timer) clearInterval(timer as Timeout);
    timer = null;
    el.innerText = "0";
    return;
  }
  // 初始值
  let count = 0;
  timer = setInterval(() => {
    count = count + step;
    el.innerText === count.toFixed(0)
      ? true
      : (el.innerText = count.toFixed(0));
    if (count > finalNum) {
      //  避免count大于finalNum最终数字显示不对
      count = finalNum;
      el.innerText = count + "";
      // 清空定时器
      clearInterval(timer as Timeout);
      timer = null;
    }
  }, rate);
}

export function infiniteScroll(cont: HTMLElement, duration: number = 30) {
  const contHeight = cont.clientHeight;
  let step = 0;
  let timer: null | Timeout = null;

  const start = () => {
    timer = setInterval(function () {
      step += 1;
      if (step > contHeight / 2) {
        step = 0;
        cont.style.transform = `translateY(-${0}px)`;
      } else {
        cont.style.transform = `translateY(-${step}px)`;
      }
    }, duration);
  };
  const stop = () => {
    clearInterval(timer as Timeout);
    timer = null;
  };
  return { start, stop };
}
