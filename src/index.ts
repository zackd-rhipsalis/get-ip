"use strict";

import load from './onload';
import click from './onclick';
import copied from './copy';

const Name = document.getElementById('name') as HTMLInputElement,
  original = document.getElementById('original') as HTMLInputElement,
  pass = document.getElementById('code') as HTMLInputElement,
  btn = document.getElementById('btn') as HTMLButtonElement,
  area = document.getElementById('area') as HTMLInputElement,
  geo  = document.getElementById('geo') as HTMLInputElement,
  copy = document.getElementById('copy') as HTMLImageElement,
  hoge = document.getElementById('hoge'),
  body = document.querySelector('body'),
  url = new URL(location.href),
  params = url.searchParams,
  userId = params.get('userId') || null
;

window.addEventListener('load', () => load(userId, body));
btn.addEventListener('click', () => click(btn, hoge, Name, original, pass, geo, area, userId));
copy.addEventListener('click', () => copied(area));