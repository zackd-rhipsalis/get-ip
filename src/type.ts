type Args = [
  HTMLButtonElement,
  HTMLElement, 
  HTMLInputElement,
  HTMLInputElement, 
  HTMLInputElement, 
  HTMLInputElement,
  HTMLInputElement, 
  string
];

type GenerateBody = {
 name: string;
 url: string; 
}

type GenerateResponse = {
  access_url: string;
}

type GetPassBody = {
  text: string;
}

type GetPassResponse = {
  pass: number;
}

export { Args, GenerateBody, GenerateResponse, GetPassBody, GetPassResponse };