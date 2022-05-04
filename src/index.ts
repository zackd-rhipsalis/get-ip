"use strict";

import load from './onload';
import click from './onclick';
import copied from './copy';

const Name = <HTMLInputElement> document.getElementById("name"),
  original = <HTMLInputElement> document.getElementById("original"),
  pass = <HTMLInputElement> document.getElementById("code"),
  btn = <HTMLButtonElement> document.getElementById("btn"),
  area = <HTMLInputElement> document.getElementById("area"),
  geo  = <HTMLInputElement> document.getElementById("geo"),
  copy = <HTMLImageElement> document.getElementById("copy"),
  hoge = document.getElementById("hoge"),
  body = document.querySelector("body"),
  h1 = document.querySelector('h1'),
  url = new URL(location.href),
  params = url.searchParams,
  userId = params.get("userId") || null,
  elements = {btn, hoge, Name, original, pass, geo, area, userId}
;

window.addEventListener("load", () => load(userId, body));
btn.addEventListener("click", () => click(elements));
copy.addEventListener("click", () => copied(area));
h1.onclick = () => location.reload();