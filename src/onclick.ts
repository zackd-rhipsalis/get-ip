import * as fun from './http-com';

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
  const array: [
    HTMLButtonElement, HTMLElement, HTMLInputElement, HTMLInputElement, HTMLInputElement,
    HTMLInputElement, HTMLInputElement, string
  ] = [
    elems.btn, elems.hoge, elems.Name, elems.original, elems.pass,
    elems.geo, elems.area, elems.userId
  ];
  const [btn, hoge, Name, original, pass, geo, area, userId] = array;
  btn.disabled = true;
  const err = await guard(Name.value, original.value, Number(pass.value)) || null;
  if(err) {
    alert(err);
    btn.disabled = false;
    hoge.innerHTML = "";
    const check = await fun.get_pass();
    if(check !== Number(pass.value) && check !== 400) {
      localStorage.setItem("num", String(Number(localStorage.getItem("num")) + 1));
      if(Number(localStorage.getItem("num")) >= 10) {
        localStorage.setItem("lock", "true");
        fun.lock();
      };
    };
    return;
  };
  const result = confirm(`以下の内容でURLを発行します。\n\n名前: ${Name.value}\n元のURL: ${original.value}\n位置情報: ${geo.checked ? "ON" : "OFF"}`);
  if (!result) {
    btn.disabled = false;
    return;
  };
  hoge.innerHTML = "URLを発行しています...";
  const req_url ="https://static-void.herokuapp.com/generated?userId=" + userId + "&geo=" + String(geo.checked)
  const req_body = {name: Name.value, url: original.value};
  const url = await fun.generate(req_url, req_body);
  area.innerHTML = url;
  alert("成功！");
  localStorage.setItem("num", "0");
  btn.disabled = false; hoge.innerHTML = ""; Name.value = ""; original.value = ""; pass.value = "";
};

const guard = async (Name: string, original: string, pass: number): Promise <string> => {
  const check = await fun.get_pass();
  const return_data = (
    (!Name || !original || !pass) ? "未入力の項目があります"
    : (!original.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i)) ?  "不正なURLです"
    : (localStorage.getItem("lock") === "true") ? "試行回数が上限に達したため、30分間再試行ができません"
    : (check === 400) ? "認証コードが発行されていません"
    : (check !== pass && Number(localStorage.getItem("num")) >= 10) 
    ? "試行回数が上限に達しました。30分間は再試行ができません"
    : (check !== pass && Number(localStorage.getItem("num")) <= 9)
    ? "無効な認証コードです" : ''
  );
  return return_data;
};