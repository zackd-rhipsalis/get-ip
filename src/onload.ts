import { check } from './fetch';

export default async (userId: string | null, body: HTMLElement): Promise <void> => {
  if(!(/iPhone|Android.+Mobile/).test(navigator.userAgent)) {
    body.innerHTML = '';
    const h1 = document.createElement('h1'), p = document.createElement('p');

    h1.id = 'pc'; p.id = 'pc'; h1.innerHTML = 'ERROR';
    p.innerHTML = '当サイトはPCからのアクセスを許可しておりません。';
  
    body.appendChild(h1).appendChild(p);
  } else if(!(/[0-9a-f]{32}/).test(userId)) {
    body.innerHTML = '';

    const h1 = document.createElement('h1'), p = document.createElement('p');

    h1.id = 'moh'; p.id = 'mop'; h1.innerHTML = 'ERROR';
    p.innerHTML = '当サイトはこのURLでアクセスすることを許可しておりません。';

    body.appendChild(h1).appendChild(p);
  } else if (localStorage.getItem('lock') === 'true') {
    const lock_status = await check();
  
    if (!lock_status) {
      localStorage.setItem('lock', 'false');
      localStorage.setItem('num', '6');
    }
  }
}