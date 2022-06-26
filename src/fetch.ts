export default class Fetch <T, U> {

  constructor(
    private readonly url: string,
    private readonly body: T
  ) {};

  public async post(): Promise <U> {
    const res = await fetch(this.url,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.body),
        mode: 'cors'
      }
    );

    const json = await res.json() as U;
    if (json) return json;
  }

  public static async check(): Promise <boolean> {
    const res = await fetch('https://static-void.herokuapp.com/check');
    const { boo } = await res.json() as {readonly boo: boolean};
    return boo;
  }
}