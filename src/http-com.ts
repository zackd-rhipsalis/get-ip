const post = async <T, U> (req_url: string, req_body: T): Promise <U> => {
  const res = await fetch(req_url , {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(req_body),
    mode: "cors"
  });

  const json = await res.json();
  return json;
}

const check = async (): Promise <boolean> => {
  const res = await fetch("https://static-void.herokuapp.com/check");
  const lock = await res.json();
  return lock.boo;
}

const lock = (): void => {
  fetch("https://static-void.herokuapp.com/lock", {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: "fucker"})
  });
}


export { post, check, lock };