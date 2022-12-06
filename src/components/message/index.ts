//Message
import { h, render } from "vue";
import XtxMessage from "./message.vue";

type Params = {
  type: "success" | "error" | "warning";
  text: string;
  duration?: number;
};

// 准备专门用于存放显示隐藏弹框的div
const divContainer = document.createElement("div");
divContainer.setAttribute("class", "xtx-message-container");
document.body.appendChild(divContainer);

let timer: number = -1;
function Message({ type, text, duration = 2000 }: Params) {
  // 创建虚拟DOM
  const vNode = h(XtxMessage, { type, text });
  //   动态render
  render(vNode, divContainer);
  //   设置定时器，关闭message框
  clearTimeout(timer);
  timer = window.setTimeout(() => {
    // 删除虚拟DOM
    render(null, divContainer);
  }, duration);
}

Message.success = function (text: string, duration = 2000) {
  Message({
    type: "success",
    text,
    duration,
  });
};

Message.error = function (text: string, duration = 2000) {
  Message({
    type: "error",
    text,
    duration,
  });
};

Message.warning = function (text: string, duration = 2000) {
  Message({
    type: "warning",
    text,
    duration,
  });
};

export default Message;
