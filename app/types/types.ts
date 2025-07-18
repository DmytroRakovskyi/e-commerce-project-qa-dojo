export type CountryCode = 'ua' | 'pl';

export type CountryDictionary = {
  code: string;
  name: string;
  language: string;
  languageCode: string;
};

export enum Category {
  Men = 'men',
  Women = 'women',
  Children = 'children',
}
