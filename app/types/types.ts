export type CountryCode = 'ua' | 'pl' | 'de';

export type CountryDictionary = {
  name: string;
  language: string;
  urlPart: string;
};

export enum Category {
  Men = 'men',
  Women = 'women',
  Children = 'children',
}
