"use strict";

import load from './onload';
import click from './onclick';
import copied from './copy';

const name = document.getElementById('name') as HTMLInputElement,
  original = document.getElementById('original') as HTMLInputElement,
  copy = document.getElementById('copy') as HTMLImageElement,
  pass = document.getElementById('code') as HTMLInputElement,
  area = document.getElementById('area') as HTMLInputElement,
  geo  = document.getElementById('geo') as HTMLInputElement,
  btn = document.getElementById('btn') as HTMLButtonElement,
  hoge = document.getElementById('hoge'),
  body = document.querySelector('body'),
  url = new URL(location.href),
  params = url.searchParams,
  userId = params.get('userId')
;

window.addEventListener('load', () => load(userId, body));
btn.addEventListener('click', () => click(btn, hoge, name, original, pass, geo, area, userId));
copy.addEventListener('click', () => copied(area));