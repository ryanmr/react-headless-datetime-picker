import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInDays,
  addDays,
  isSameMonth,
  format,
} from 'date-fns';
import _ from 'lodash';

export const useDatetimePicker = () => {};

export function getDisplaySegment(pivot: Date): DisplaySegment {
  const firstMonthDay = startOfMonth(pivot);
  const lastMonthDay = endOfMonth(pivot);

  const firstSegmentDay = startOfWeek(firstMonthDay);
  const lastSegmentDay = endOfWeek(lastMonthDay);

  const diffDays = differenceInDays(lastSegmentDay, firstSegmentDay);
  const dayCount = diffDays + 1;

  const days = Array(dayCount)
    .fill(0)
    .map((_, i) => addDays(firstSegmentDay, i));

  const Days: Day[] = days.map(d => ({
    date: d,
    __name: format(d, 'PPPPpppp'),
    inMonth: isSameMonth(pivot, d),
  }));

  const weeks = _.chunk(Days, 7);

  const Weeks: Week[] = weeks.map(week => ({
    days: week,
    start: week[0],
    end: week[6],
    fullWeek: week.every(day => isSameMonth(pivot, day.date)),
  }));

  return {
    start: firstSegmentDay,
    end: lastSegmentDay,
    dayCount,
    days: Days,
    weeks: Weeks,
  };
}

// types and things

export interface DisplaySegment {
  start: Date;
  end: Date;
  dayCount: number;
  days: Day[];
  weeks: Week[];
}

export interface Day {
  date: Date;
  inMonth: boolean;
}

export interface Week {
  days: Day[];
  start: Day;
  end: Day;
  fullWeek: boolean;
}
