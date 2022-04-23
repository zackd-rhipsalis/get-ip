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

export { get_pass, check, lock };