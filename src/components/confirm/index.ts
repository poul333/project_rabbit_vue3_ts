// 动态创建confirm弹框

import XtxConfirm from "./confirm.vue";
import { h, render } from "vue";

// 创建container，存放弹层元素
const divContainer = document.createElement("div");
divContainer.setAttribute("class", "xtx-confirm-container");
document.body.appendChild(divContainer);

type ParamsType = {
  text: string;
  title: string;
};

export default function Confirm({ text, title }: ParamsType) {
  return new Promise((resolve, reject) => {
    const confirmCallback = () => {
      resolve("确认");
      //   关闭弹窗
      render(null, divContainer);
    };
    const cancelCallback = () => {
      reject("失败");
      //   关闭弹窗
      render(null, divContainer);
    };

    // 创建虚拟dom
    const vNode = h(XtxConfirm, {
      text,
      title,
      confirmCallback,
      cancelCallback,
    });

    //   动态render到容器中
    render(vNode, divContainer);
  });
}
