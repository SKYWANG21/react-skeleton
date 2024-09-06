import React, { useEffect, useState } from "react";
import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";
import img from "@/assets/syberpunk.jpg";

function Output(props) {
  const { html } = props;
  function html2xml(html) {
    asBlob(html).then((data) => {
      saveAs(data, "file.docx");
    });
  }

  return (
    <>
      <button onClick={() => html2xml(html)}>导出为word</button>
    </>
  );
}

export default function () {
  const [html, setHtml] = useState("");
  useEffect(() => {
    setHtml(document.getElementById("html")?.innerHTML as string);
  });

  return (
    <>
      <Output html={html}></Output>
      <div id="html">
        <p>
          （1）具备边防执勤计划数据统计分析的能力，能够从边境地形地貌、交通条件、气候特点、执勤人员信息、武器装备配备、巡逻频次等维度进行统计分析；
        </p>
        <p>
          （2）具备边防执勤计划数据智能化处理能力，能够根据边防执勤计划的历史数据自动进行数据去重、异常值剔除、缺失值填补等；
        </p>
        <p>（3）支持描述性统计分析、相关性分析、时间序列分析等分析方法；</p>
        <p>
          （4）能够以富文本、图表、地图等形式展示分析结果，并能够生成DOC、PDF等电子文档，支持分析结果的导出、存储和备份；
        </p>
        <p>
          （5）具备执勤计划监控和优化能力，能够持续监控执勤计划的执行情况，并根据实际情况给出优化建议
        </p>
        <img src={img} alt="" />
        <table style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={{ border: "1px solid" }}>first</th>
              <th style={{ border: "1px solid" }}>second</th>
              <th style={{ border: "1px solid" }}>third</th>
              <th style={{ border: "1px solid" }}>forth</th>
            </tr>
            <tr>
              <td style={{ border: "1px solid" }}>1</td>
              <td style={{ border: "1px solid" }}>2</td>
              <td style={{ border: "1px solid" }}>3</td>
              <td style={{ border: "1px solid" }}>4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
