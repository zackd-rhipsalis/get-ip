import * as fun from './fetch';
import {Args, GenerateBody, GenerateResponse, GetPassBody, GetPassResponse } from './type';

export default async (...args: Args): Promise <void> => {
  const [btn, hoge, Name, original, pass, geo, area, userId] = args;
  btn.disabled = true;
  hoge.innerHTML = '確認中です...';

  const err = await guard(Name.value, original.value, Number(pass.value));

  if(err) {
    alert(err);
    btn.disabled = false;
    hoge.innerHTML = '';
    
    const url = 'https://static-void.herokuapp.com/pass', body = {text: 'ぴやっほゃ'};
    const check = (await fun.post<GetPassBody, GetPassResponse>(url, body)).pass;

    if(check !== Number(pass.value) && check !== 400) {
      localStorage.setItem('num', String(Number(localStorage.getItem('num')) + 1));
  
      if(Number(localStorage.getItem('num')) >= 10) {
        localStorage.setItem('lock', 'true');
        fun.lock();
      }
    }
    return;
  }

  const result = confirm(`以下の内容でURLを発行します。\n\n名前: ${Name.value}\n元のURL: ${original.value}\n位置情報: ${geo.checked ? 'ON' : 'OFF'}`);

  if (!result) {
    btn.disabled = false;
    hoge.innerHTML = '';
    return;
  }

  hoge.innerHTML = 'URLを発行しています...';

  const req_url = 'https://static-void.herokuapp.com/generated?userId=' + userId + '&geo=' + String(geo.checked);
  const req_body = {name: Name.value, url: original.value};
  const url = (await fun.post<GenerateBody, GenerateResponse>(req_url, req_body)).access_url;
  area.innerHTML = url;

  const url_check = url.match(/static/) ? '\n※短縮URLのリクエスト上限に達した為、発行したURLを短縮できませんでした' : '';

  alert('成功！' + url_check);
  localStorage.setItem('num', '0');
  btn.disabled = false; hoge.innerHTML = ''; Name.value = ''; 
  original.value = ''; pass.value = ''; geo.checked = false;
}

const guard = async (Name: string, original: string, pass: number): Promise <string> => {
  const illegal = (
    (!Name || !original || !pass) ? '未入力の必須項目があります'
    : (!(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i).test(original)) ? '不正なURLです'
    : (localStorage.getItem('lock') === 'true') ? '試行回数が上限に達したため、30分間再試行ができません'
    : ''
  );

  if(illegal) {
    return illegal;
  } else {
    const url = 'https://static-void.herokuapp.com/pass', body = {text: 'ぴやっほゃ'};
    const check = (await fun.post<GetPassBody, GetPassResponse>(url, body)).pass;
  
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