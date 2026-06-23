import { INSURANCE_OPTIONS } from '../consts/insurance-options';

export type InsuranceOptionValue = (typeof INSURANCE_OPTIONS)[keyof typeof INSURANCE_OPTIONS];
export type InsuranceOptions = {
  insuranceOptions: {
    insuranceType: InsuranceOptionValue;
    insuredAmount?: number;
    additionalAmount?: number;
  };
};
