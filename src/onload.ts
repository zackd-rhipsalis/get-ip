export default async function(userId: string, body: HTMLElement, check: Promise<boolean>): Promise <void> {
  if(!userId || !userId.match(/[0-9a-f]{32}/)) {
    body.innerHTML = "";
    const h1 = document.createElement("h1"), p0 = document.createElement("p");
    h1.innerHTML = "ERROR";
    p0.innerHTML = "このサイトはLINE Botから送信されるURL以外からのアクセスを許可していません。";
    body.appendChild(h1).appendChild(p0);
  }else if (localStorage.getItem("lock") === "true") {
    if (!await check) {
      localStorage.setItem("lock", "false");
      localStorage.setItem("num", "6")
    };
  };
};