import { CountryDictionary, CountryCode } from '../../app/types/types';

export const countries: Record<CountryCode, CountryDictionary> = {
  ua: {
    name: 'Ukraine',
    language: 'УКРАЇНСЬКА',
    urlPart: '/ua/',
  },
  pl: {
    name: 'Poland',
    language: 'POLSKI',
    urlPart: '/pl/',
  },
  de: {
    name: 'Germany',
    language: 'DEUTSCH',
    urlPart: '/de/',
  },
};
