import * as fun from './asynchronous-funs';

interface Elements {
  btn: HTMLButtonElement;
  hoge: HTMLElement;
  Name: HTMLInputElement;
  original: HTMLInputElement;
  pass: HTMLInputElement;
  geo: HTMLInputElement;
  area: HTMLInputElement;
  userId: string | null;
};

export default async (elems: Elements): Promise <void> => {
  elems.btn.disabled = true;
  elems.hoge.innerHTML = "URLを発行しています...";
  const err = await guard(elems) || null;
  if(err) {
    alert(err);
    elems.btn.disabled = false;
    elems.hoge.innerHTML = ""; 
    if(await fun.get_pass() !== Number(elems.pass.value)) {
      localStorage.setItem("num", String(Number(localStorage.getItem("num")) + 1));
      if(Number(localStorage.getItem("num")) >= 10) {
        localStorage.setItem("lock", "true");
        fun.lock();
      };
    };
    return;
  };
  const req_url = (elems.geo.checked === true) ? "https://static-void.herokuapp.com/generated?userId=" + elems.userId + "&geo=true" : "https://static-void.herokuapp.com/generated?userId=" + elems.userId;
  const req_body = {name: elems.Name.value, url: elems.original.value};
  elems.area.innerHTML = await fun.generate(req_url, req_body);
  alert("成功！");
  localStorage.setItem("num", "0");
  elems.btn.disabled = false; elems.hoge.innerHTML = ""; elems.Name.value = ""; elems.original.value = ""; elems.pass.value = "";
};

async function guard (elems: Elements): Promise <string> {
  const return_data = (
    (!elems.Name.value || !elems.original.value || !elems.pass.value) ? "未入力の項目があります"
    : (!elems.original.value.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i)) ?  "不正なURLです"
    : (localStorage.getItem("lock") === "true") ? "試行回数が上限に達したため、30分間再試行ができません"
    : (await fun.get_pass() === 400) ? "認証コードが発行されていません"
    : (await fun.get_pass() !== Number(elems.pass.value) && Number(localStorage.getItem("num")) >= 10) 
    ? "試行回数が上限に達しました。30分間は再試行ができません"
    : (await fun.get_pass() !== Number(elems.pass.value) && Number(localStorage.getItem("num")) <= 9)
    ? "無効な認証コードです" : ''
  );
  return return_data;
};