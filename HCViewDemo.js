import { application } from "./hcl/Application.js";
import { TAlign } from "./hcl/Controls.js";
import { hcl } from "./hcl/Kernel.js";
import { TPopupMenu } from "./hcl/StdCtrls.js";
import { THCFontStyle } from "./hcview/HCTextStyle.js";
import { THCView } from "./hcview/HCView.js";

// 设置左上角图标
// application.icon.src = "./image/hcview.png";
// 创建基础容器，客户区非客户区
let mainForm = application.mainForm;

//鼠标右键弹窗菜单
let viewPopup = new TPopupMenu();
let mniCut = viewPopup.addItem("剪切 Ctrl+X");
mniCut.onClick = () => {
    hcView.Cut();
}
let mniCopy = viewPopup.addItem("复制 Ctrl+C");
mniCopy.onClick = () => {
    hcView.Copy();
}
let mniPaste = viewPopup.addItem("粘贴 Ctrl+V");
mniPaste.onClick = () => {
    hcView.Paste();
}
//
let hcView = new THCView();
console.log('3-hcview', hcView)
// 画布对齐方式
hcView.align = TAlign.Client;
// 画布的菜单
hcView.popupMenu = viewPopup;
// 添加画布
mainForm.addControl(hcView);
//？
// hcView.setFocus();
// 全屏，占满屏幕
hcl.autoWidth = true;
// 运行
application.run();
