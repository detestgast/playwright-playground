import { DURATION } from '../../src/consts/durations';
import { INSURANCE_TYPE } from '../../src/consts/insurance_types';
import { InsuranceOptions } from '../../src/types/insuranceOptions';
import { Persona } from '../../src/types/persona';

export const adultMale = {
  firstName: 'Jan',
  lastName: 'Zwart',
  dateOfBirth: new Date('1976-11-16'),
  gender: 'male',
  insuranceOptions: {
    insuranceType: INSURANCE_TYPE.MONEY,
    insuredAmount: 15000,
    duration: DURATION.UNTIL_AGE_65,
  },
} satisfies Persona & InsuranceOptions;

export const adultFemale = {
  firstName: 'Anna',
  lastName: 'Jansen',
  dateOfBirth: new Date('1988-09-13'),
  gender: 'female',
  insuranceOptions: {
    insuranceType: INSURANCE_TYPE.SERVICE,
    additionalAmount: 2000,
    duration: DURATION.UNTIL_DEATH,
  },
} satisfies Persona & InsuranceOptions;
