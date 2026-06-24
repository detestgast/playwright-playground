import { DURATION } from '../../src/consts/durations';
import { INSURANCE_TYPE } from '../../src/consts/insuranceTypes';
import { PAYMENT_FREQUENCY } from '../../src/consts/paymentFrequencies';
import { InsuranceOptions } from '../../src/types/insuranceOptions';
import { Persona } from '../../src/types/persona';

export const adultMale = {
  firstName: 'Jan',
  lastName: 'Zwart',
  dateOfBirth: new Date('1976-11-16'),
  gender: 'male',
  insuranceOptions: {
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    insuranceType: INSURANCE_TYPE.MONEY,
    insuredAmount: 15000,
    duration: DURATION.UNTIL_AGE_65,
    paymentFrequency: PAYMENT_FREQUENCY.PER_MONTH,
  },
} satisfies Persona & InsuranceOptions;

export const adultFemale = {
  firstName: 'Anna',
  lastName: 'Jansen',
  dateOfBirth: new Date('1988-09-13'),
  gender: 'female',
  insuranceOptions: {
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    insuranceType: INSURANCE_TYPE.INKIND,
    additionalAmount: 2000,
    duration: DURATION.UNTIL_DEATH,
    paymentFrequency: PAYMENT_FREQUENCY.PER_YEAR,
  },
} satisfies Persona & InsuranceOptions;
