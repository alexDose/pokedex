import { InfoType } from '../../types/Types';

export const getEffectEntriesEn = (value: InfoType[]) => {
  return value.filter((element) => element.language.name === 'en');
};
export const getName = (name: string) => {
  return name[0].toUpperCase() + name.slice(1, name.length - 1);
};
export const getId = (url: any) => {
  return url.split('/')[6];
};
