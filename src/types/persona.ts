import { Gender } from './genders';

export type Persona = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
};
