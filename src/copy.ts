export default function(area: HTMLInputElement): void {
  if(area.value === "") return;
  area.select();
  document.execCommand("copy");
  alert("コピーしました")
};