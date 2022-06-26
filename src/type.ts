type Args = readonly [
  HTMLButtonElement,
  HTMLElement, 
  HTMLInputElement,
  HTMLInputElement, 
  HTMLInputElement, 
  HTMLInputElement,
  HTMLInputElement, 
  string
]

type GenerateBody = {
 readonly name: string;
 readonly url: string; 
}

type GenerateResponse = {
  readonly access_url: string;
}

type ResponseOnly = {
  readonly text: 'ぴやっほゃ' | 'fucker';
}

type GetPassResponse = {
  readonly pass: number;
}

export type { Args, GenerateBody, GenerateResponse, ResponseOnly, GetPassResponse }