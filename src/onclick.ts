interface Static {
  btn: HTMLButtonElement;
  hoge: HTMLElement;
  Name: HTMLInputElement;
  original: HTMLInputElement;
  pass: HTMLInputElement;
  geo: HTMLInputElement;
  area: HTMLInputElement;
  get_pass: Promise <number>;
  lock: void;
  userId: string;
};

export default async function(elems: Static): Promise <void> {
  elems.btn.disabled = true;
  elems.hoge.innerHTML = "URLを発行しています...";
  if(!elems.Name.value || !elems.original.value || !elems.pass.value) {
    alert("未入力の項目があります");
    elems.hoge.innerHTML = ""; elems.btn.disabled = false;
    return;
  } else if (!elems.original.value.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i)) {
    alert("不正なURLです");
    elems.hoge.innerHTML = ""; elems.btn.disabled = false;
    return;
  } else if (localStorage.getItem("lock") === "true") {
    alert("試行回数が上限に達したため、30分間再試行ができません"); elems.btn.disabled = false; elems.hoge.innerHTML = "";
    return;
  } else if(await elems.get_pass === 400){
    alert("認証コードが発行されていません");
    elems.hoge.innerHTML = ""; elems.btn.disabled = false;
    return;
  } else if(await elems.get_pass !== Number(elems.pass.value)) {
    localStorage.setItem("num", String(Number(localStorage.getItem("num")) + 1));
    if(Number(localStorage.getItem("num")) >= 10) {
      localStorage.setItem("lock", "true");
      elems.lock;
      alert("試行回数が上限に達したため、30分間再試行ができません");
      elems.btn.disabled = false; elems.hoge.innerHTML = "";
    }else{
      alert("無効な認証コードです");
      elems.hoge.innerHTML = ""; elems.btn.disabled = false;
    };
    return;
  };
  const req_url = (elems.geo.checked === true) ? "https://static-void.herokuapp.com/generated?userId=" + elems.userId + "&geo=true" : "https://static-void.herokuapp.com/generated?userId=" + elems.userId;
  const req_body = {name: elems.Name.value, url: elems.original.value};
  const res = await fetch(req_url , {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(req_body),
    mode: "cors"
  });
  const url = await res.json();
  alert("成功！");
  localStorage.setItem("num", "0");
  elems.btn.disabled = false; elems.hoge.innerHTML = ""; elems.Name.value = ""; elems.original.value = ""; elems.pass.value = "";
  elems.area.innerHTML = url.access_url;
};