interface RequestBody {
  name: string;
  url: string;
};

async function generate(req_url: string, req_body: RequestBody): Promise <string> {
  const res = await fetch(req_url , {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(req_body),
    mode: "cors"
  });
  const url = await res.json();
  return url.access_url;
};

async function get_pass(): Promise <number> {
  const res = await fetch("https://static-void.herokuapp.com/pass", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    mode: "cors",
    body: JSON.stringify({text: "ぴやっほゃ"})
  });
  const password = await res.json();
  return password.pass;
};

async function check(): Promise <boolean> {
  const res = await fetch("https://static-void.herokuapp.com/check");
  const lock = await res.json();
  return lock.boo;
};

function lock(): void {
  fetch("https://static-void.herokuapp.com/lock", {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: "fucker"})
  });
};


export { generate, get_pass, check, lock };