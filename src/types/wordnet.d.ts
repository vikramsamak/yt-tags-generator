declare module "wordnet" {
  interface Definition {
    synonyms: string[];
    pos: string;
  }
  function lookup(
    word: string,
    callback: (err: Error | null, definitions: Definition[]) => void
  ): void;
  export = { lookup };
}
