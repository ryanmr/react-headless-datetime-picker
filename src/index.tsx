import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInDays,
  addDays,
} from 'date-fns';
import _ from 'lodash';

export const useDatetimePicker = () => {};

export function getSegmentOfDays(pivot: Date): DisplaySegment {
  const firstMonthDay = startOfMonth(pivot);
  const lastMonthDay = endOfMonth(pivot);

  const firstSegmentDay = startOfWeek(firstMonthDay);
  const lastSegmentDay = endOfWeek(lastMonthDay);

  const diffDays = differenceInDays(lastSegmentDay, firstSegmentDay);
  const dayCount = diffDays + 1;

  const days = Array(dayCount)
    .fill(0)
    .map((_, i) => addDays(firstSegmentDay, i));

  const weeks = _.chunk(days, 7);

  return {
    start: firstSegmentDay,
    end: lastSegmentDay,
    dayCount,
    days,
    weeks,
  };
}

// types and things

export interface DisplaySegment {
  start: Date;
  end: Date;
  dayCount: number;
  days: Date[];
  weeks: Date[][];
}
