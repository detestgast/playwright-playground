import { INSURANCE_TYPE } from '../consts/insurance_types';
import { DURATION } from '../consts/durations';

type InsuranceType = (typeof INSURANCE_TYPE)[keyof typeof INSURANCE_TYPE];
type DurationType = (typeof DURATION)[keyof typeof DURATION];

export type InsuranceOptions = {
  insuranceOptions: {
    insuranceType: InsuranceType;
    insuredAmount?: number;
    additionalAmount?: number;
    duration: DurationType;
  };
};
