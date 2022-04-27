import * as fun from './asynchronous-funs';

interface Elements {
  btn: HTMLButtonElement;
  hoge: HTMLElement;
  Name: HTMLInputElement;
  original: HTMLInputElement;
  pass: HTMLInputElement;
  geo: HTMLInputElement;
  area: HTMLInputElement;
  userId: string;
};

export default async (elems: Elements): Promise <void> => {
  elems.btn.disabled = true;
  const err = await guard(elems) || null;
  if(err) {
    alert(err);
    elems.btn.disabled = false;
    elems.hoge.innerHTML = "";
    const check = await fun.get_pass();
    if(check !== Number(elems.pass.value) && check !== 400) {
      localStorage.setItem("num", String(Number(localStorage.getItem("num")) + 1));
      if(Number(localStorage.getItem("num")) >= 10) {
        localStorage.setItem("lock", "true");
        fun.lock();
      };
    };
    return;
  };
  const result = confirm(`以下の内容でURLを発行します。続行するには「はい」を押してください\n\n名前: ${elems.Name.value}\n元のURL: ${elems.original.value}\n位置情報: ${elems.geo.checked ? "ON" : "OFF"}`);
  if (!result) {
    elems.btn.disabled = false;
    return;
  };
  elems.hoge.innerHTML = "URLを発行しています...";
  const req_url ="https://static-void.herokuapp.com/generated?userId=" + elems.userId + "&geo=" + String(elems.geo.checked)
  const req_body = {name: elems.Name.value, url: elems.original.value};
  const url = await fun.generate(req_url, req_body);
  elems.area.innerHTML = url;
  alert("成功！");
  localStorage.setItem("num", "0");
  elems.btn.disabled = false; elems.hoge.innerHTML = ""; elems.Name.value = ""; elems.original.value = ""; elems.pass.value = "";
};

const guard = async (elems: Elements): Promise <string> => {
  const check = await fun.get_pass();
  const return_data = (
    (!elems.Name.value || !elems.original.value || !elems.pass.value) ? "未入力の項目があります"
    : (!elems.original.value.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i)) ?  "不正なURLです"
    : (localStorage.getItem("lock") === "true") ? "試行回数が上限に達したため、30分間再試行ができません"
    : (check === 400) ? "認証コードが発行されていません"
    : (check !== Number(elems.pass.value) && Number(localStorage.getItem("num")) >= 10) 
    ? "試行回数が上限に達しました。30分間は再試行ができません"
    : (check !== Number(elems.pass.value) && Number(localStorage.getItem("num")) <= 9)
    ? "無効な認証コードです" : ''
  );
  return return_data;
};