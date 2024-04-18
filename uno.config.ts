import { presetIcons, presetUno, presetWind } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";
import transformerDirectives from "@unocss/transformer-directives";

export default {
  presets: [
    presetRemToPx(),
    presetWind(),
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  transformers: [transformerDirectives()],
};
