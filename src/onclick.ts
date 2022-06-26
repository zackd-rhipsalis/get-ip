import Fetch from './fetch';
import type * as types from './type';

export default async (...args: types.Args): Promise <void> => {
  const [btn, hoge, name, original, pass, geo, area, userId] = args;
  btn.disabled = true;
  hoge.innerHTML = '確認中です...';

  const err = await guard(name.value, original.value, Number(pass.value));

  if(err) {
    alert(err);
    btn.disabled = false;
    hoge.innerHTML = '';

    const url = 'https://static-void.herokuapp.com/pass';
    const body = {text: 'ぴやっほゃ'} as const;

    const saucer = new Fetch<types.ResponseOnly, types.GetPassResponse>(url, body);
    const check = (await saucer.post()).pass;
  
    if(check !== Number(pass.value) && check !== 400) {
      localStorage.setItem('num', String(Number(localStorage.getItem('num')) + 1));

      if(Number(localStorage.getItem('num')) >= 10) {
        localStorage.setItem('lock', 'true');

        const url = 'https://static-void.herokuapp.com/lock';
        const body = {text: 'fucker'} as const;

        const lock = new Fetch <types.ResponseOnly, void>(url, body);
        lock.post();
      }
    }
    return;
  }

  const result = confirm(`以下の内容でURLを発行します。\n\n名前: ${name.value}\n元のURL: ${original.value}\n位置情報: ${geo.checked ? 'ON' : 'OFF'}`);

  if (!result) {
    btn.disabled = false;
    hoge.innerHTML = '';
    return;
  }

  hoge.innerHTML = 'URLを発行しています...';

  const req_url = `https://static-void.herokuapp.com/generated?userId=${userId}&geo=${geo.checked}`;
  const req_body = {name: name.value, url: original.value};

  const saucer = new Fetch<types.GenerateBody, types.GenerateResponse>(req_url, req_body);
  const url = (await saucer.post()).access_url;

  area.innerHTML = url;

  const url_check = url.match(/static/) ? '\n※短縮URLのリクエスト上限に達した為、発行したURLを短縮できませんでした' : '';
  alert('成功！' + url_check);
  localStorage.setItem('num', '0');
  btn.disabled = false; hoge.innerHTML = ''; name.value = ''; 
  original.value = ''; pass.value = ''; geo.checked = false;
}

const guard = async (name: string, original: string, pass: number): Promise <string> => {
  const illegal = (
    (!name || !original || !pass) ? '未入力の必須項目があります'
    : (!(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i).test(original)) ? '不正なURLです'
    : (localStorage.getItem('lock') === 'true') ? '試行回数が上限に達したため、30分間再試行ができません'
    : ''
  );

  if(illegal) return illegal;
  else {
    const url = 'https://static-void.herokuapp.com/pass';
    const body = {text: 'ぴやっほゃ'} as const;

    const saucer = new Fetch<types.ResponseOnly, types.GetPassResponse>(url, body);
    const check = (await saucer.post()).pass;

    const stupid = (
      (check === 400) ? '認証コードが発行されていません'
      : (check !== pass && Number(localStorage.getItem('num')) >= 10)
      ? '試行回数が上限に達しました。30分間は再試行ができません'
      : (check !== pass && Number(localStorage.getItem('num')) <= 9)
      ? '無効な認証コードです' : ''
    );

    return stupid;
  }
}