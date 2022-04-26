"use strict";

import * as fun from './asynchronous-funs';
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
  url = new URL(location.href),
  params = url.searchParams,
  userId = params.get("userId"),
  obj = {btn, hoge, Name, original, pass, geo, area, get_pass: fun.get_pass(), lock: fun.lock(), userId}
;

window.addEventListener("load", () => load(userId, body, fun.check()));
btn.addEventListener("click", () => click(obj));
copy.addEventListener("click", () => copied(area));