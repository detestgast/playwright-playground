import { Gender } from './genders';

export type Person = {
  initials: string;
  firstName: string;
  prefix?: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
};
