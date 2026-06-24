import { DURATION } from '../../src/consts/durations';
import { INSURANCE_TYPE } from '../../src/consts/insuranceTypes';
import { PAYMENT_FREQUENCY } from '../../src/consts/paymentFrequencies';
import { AddressDetails } from '../../src/types/addressDetails';
import { ContactDetails } from '../../src/types/contactDetails';
import { InsuranceOptions } from '../../src/types/insuranceOptions';
import { Person } from '../../src/types/person';

export const adultMale = {
  firstName: 'Jan',
  initials: 'J.',
  lastName: 'Zwart',
  dateOfBirth: new Date('1976-11-16'),
  gender: 'male',
  addressDetails: {
    zipCode: '1234 AB',
    houseNumber: '56',
    addition: 'A',
  },
  contactDetails: {
    telephoneNumber: '0612345678',
    emailAddress: 'jan.zwart@example.com',
  },
  insuranceOptions: {
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    insuranceType: INSURANCE_TYPE.MONEY,
    insuredAmount: 15000,
    duration: DURATION.UNTIL_AGE_65,
    paymentFrequency: PAYMENT_FREQUENCY.PER_MONTH,
  },
} satisfies Person & InsuranceOptions & AddressDetails & ContactDetails;

export const adultFemale = {
  firstName: 'Anna',
  initials: 'A.',
  lastName: 'Jansen',
  dateOfBirth: new Date('1988-09-13'),
  gender: 'female',
  addressDetails: {
    zipCode: '5678 CD',
    houseNumber: '12',
    addition: 'B',
  },
  contactDetails: {
    telephoneNumber: '0612345679',
    emailAddress: 'anna.jansen@example.com',
  },
  insuranceOptions: {
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    insuranceType: INSURANCE_TYPE.INKIND,
    additionalAmount: 2000,
    duration: DURATION.UNTIL_DEATH,
    paymentFrequency: PAYMENT_FREQUENCY.PER_YEAR,
  },
} satisfies Person & InsuranceOptions & AddressDetails & ContactDetails;
