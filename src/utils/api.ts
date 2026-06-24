import { DURATION } from '../../src/consts/durations';
import { PAYMENT_FREQUENCY } from '../../src/consts/paymentFrequencies';

export const DURATION_TO_API: Record<string, string> = {
  [DURATION.UNTIL_AGE_65]: 'Until65',
  [DURATION.UNTIL_DEATH]: 'Lifelong',
};

export const PAYMENT_FREQUENCY_TO_API: Record<string, string> = {
  [PAYMENT_FREQUENCY.PER_MONTH]: 'Monthly',
  [PAYMENT_FREQUENCY.PER_QUARTER]: 'Quarterly',
  [PAYMENT_FREQUENCY.PER_HALF_YEAR]: 'Halfyearly',
  [PAYMENT_FREQUENCY.PER_YEAR]: 'Yearly',
};
