import { DURATION } from '../consts/durations';
import { INSURANCE_TYPE } from '../consts/insuranceTypes';
import { PAYMENT_FREQUENCY } from '../consts/paymentFrequencies';

type DurationType = (typeof DURATION)[keyof typeof DURATION];
type InsuranceType = (typeof INSURANCE_TYPE)[keyof typeof INSURANCE_TYPE];
type PaymentFrequencyType = (typeof PAYMENT_FREQUENCY)[keyof typeof PAYMENT_FREQUENCY];

export type InsuranceOptions = {
  insuranceOptions: {
    insuranceType: InsuranceType;
    insuredAmount?: number;
    additionalAmount?: number;
    duration: DurationType;
    paymentFrequency: PaymentFrequencyType;
  };
};
