import * as echarts from "echarts";

export class BasicChart {
  constructor(public element: HTMLElement) {}
  chartInstance: echarts.EChartsType | null = null;
  init() {
    this.chartInstance = echarts.init(this.element);
    window.addEventListener("resize", () => {
      this.chartInstance?.resize();
    });
    return this;
  }
  setOption(option: echarts.EChartsOption) {
    this.chartInstance?.setOption(option);
  }
  clear() {
    this.chartInstance?.dispose();
  }
}

export class ChartOptionBuilder {
  constructor(opt: echarts.EChartsOption = {}) {
    this.injectOptions(opt, this.optionInstance);
  }
  optionInstance: echarts.EChartsOption = {};
  setTooltip(tooltip) {
    this.optionInstance.tooltip = tooltip;
    this.optionInstance.tooltip
      ? this.injectOptions(tooltip, this.optionInstance.tooltip)
      : (this.optionInstance.tooltip = tooltip);
    return this;
  }

  setLegend(legend) {
    this.optionInstance.legend
      ? this.injectOptions(legend, this.optionInstance.legend)
      : (this.optionInstance.legend = legend);
    return this;
  }

  setXAxis(xAxis) {
    this.optionInstance.xAxis = xAxis;
    return this;
  }

  setYAxis(yAxis) {
    this.optionInstance.yAxis = yAxis;
    return this;
  }

  setSeries(series) {
    (this.optionInstance.series as echarts.SeriesOption[])?.push(series);
    return this;
  }

  injectOptions(opt, target: any = this.optionInstance) {
    Object.keys(opt).forEach((it) => {
      const type = Object.prototype.toString.call(opt[it]);
      if (type === "[object Object]" && !!target[it]) {
        this.injectOptions(opt[it], target[it]);
      } else {
        target[it] = opt[it];
      }
    });
    return target;
  }

  build() {
    return this.optionInstance;
  }
}

export class BarLineChart extends BasicChart {
  option = new ChartOptionBuilder({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        crossStyle: {
          color: "#999",
        },
      },
      backgroundColor: "rgba(2, 8, 24, 0.9)", //设置背景图片 rgba格式
      borderColor: "transparent",
      textStyle: {
        color: "#b9d1f4",
      },
    },
    legend: {
      textStyle: {
        color: "#6984a4",
      },
    },
    xAxis: [
      {
        type: "category",
        data: [],
        axisLine: {
          show: true,
          lineStyle: {
            color: "#7798bc",
          },
        },
        axisLabel: {
          show: true,
          interval: 0,
          rotate: -45,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#7798bc",
          },
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#134376",
          },
        },
      },
    ],
    series: [],
  });
  setCategory(data: string[], unit: string | string[]) {
    this.option.optionInstance.xAxis![0].data = data;
    unit instanceof Array
      ? unit.forEach((it, index) => {
          this.option.optionInstance.yAxis![index].name = it;
        })
      : (this.option.optionInstance.yAxis![0].name = unit);
    return this;
  }
  setBarSeries(
    data: number[] | { name: string; value: number; [key: string]: any }[],
    name: string,
    yAxisIndex: number = 0,
    color?: string | string[]
  ) {
    this.option.setSeries({
      yAxisIndex,
      data: data,
      name,
      barMaxWidth: 30,
      barGap: "30%",
      barCategoryGap: "40%",
      color:
        color instanceof Array
          ? {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: color[0], // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: color[1], // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }
          : color,
    });
    return this;
  }
  setLineSeries(
    data: number[] | { name: string; value: number; [key: string]: any }[],
    name: string,
    color?: string
  ) {
    this.option.setSeries({
      data: data,
      name,
      type: "line",
      color,
    });
    return this;
  }
}

export class PieChart extends BasicChart {
  option = new ChartOptionBuilder({
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow",
        crossStyle: {
          color: "#999",
        },
      },
      backgroundColor: "rgba(2, 8, 24, 0.9)", //设置背景图片 rgba格式
      borderColor: "transparent",
      textStyle: {
        color: "#b9d1f4",
      },
    },
    legend: {
      right: "0",
      top: "center",
      orient: "vertical",
      textStyle: {
        color: "#fdfdfd",
      },
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: "50%",
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
      },
    ],
  });
  setSeries(data: number[], name: string) {
    this.option.optionInstance.series![0].data = data;
    this.option.optionInstance.series![0].name = name;
    return this;
  }
}
