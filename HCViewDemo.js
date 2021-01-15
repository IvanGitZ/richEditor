import { application } from "./hcl/Application.js";
import { TAlign } from "./hcl/Controls.js";
import { hcl } from "./hcl/Kernel.js";
import { TPopupMenu, TToolBar } from "./hcl/StdCtrls.js";
import { THCFontStyle } from "./hcview/HCTextStyle.js";
import { TFileType, TDateTime, TStream } from "./hcl/System.js";
import { THCView } from "./hcview/HCView.js";

// 设置左上角图标
// application.icon.src = "./image/hcview.png";
// 创建基础容器，客户区非客户区
let mainForm = application.mainForm;

// 顶部菜单
let toolbar = new TToolBar();
toolbar.align = TAlign.Top;
toolbar.addButton("保存", false, "./image/save.png").onClick = function() {
    let vStream = new TStream();
    console.log('4-保存vStream', vStream)
    hcView.SaveToStream(vStream, false);
    let vByteData = new Uint8Array(vStream.buffer);
    console.log('4-保存vByteData', vByteData)
    let vBlob = new Blob([vByteData], {type:"application/octet-stream"});
    // let vBlob = new Blob(vStream.buffer, {type:"application/octet-stream"});
    console.log('4-保存vBlob', vBlob)
    let vDownloadUrl = window.URL.createObjectURL(vBlob);
    let vAnchor = document.createElement("a");
    vAnchor.href = vDownloadUrl;
    vAnchor.download = "HCView H5.hcf";
    console.log('4-保存a标签', vAnchor)
    vAnchor.click();
    window.URL.revokeObjectURL(vBlob);
}
toolbar.addButton("打印", false, "./image/print.png").onClick = function(event) {
    console.log('hcView', hcView.FDataBmpCanvas.h5context.getCanvasTemp)
    // console.log(canvas.toDataURL())
    // let dataURL = canvas.toDataURL("image/png");
    // console.log('dataURL', dataURL)
    // printJS(dataURL, 'image')
    // let newWindow= window.open();
    // newWindow.document.write('<img src="'+dataURL+'"/>');
    // setTimeout(() => {
    //     newWindow.print();
    // }, 500);
}
toolbar.addButton("", false, "./image/hcview.png").onClick = function(event) {
    alert('替换文本')
    const replaceStr1 = '我要替换掉$1$'
    const replaceStr2 = '我要替换掉$2$'
    console.log('替换文本', hcView.FDataBmpCanvas.h5context)
}
mainForm.addControl(toolbar);

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
//？注释掉目前没影响
// hcView.setFocus();
// 全屏，占满屏幕
hcl.autoWidth = true;
// 运行
application.run();
