import { getSegmentOfDays } from '../src';

describe('timey-wimey', () => {
  it('gets a screens-ful of days: now', () => {
    const now = new Date();
    const result = getSegmentOfDays(now);

    expect(result).toBeTruthy();
  });

  it('gets a screens-ful of days: 2011-11-13T05:00:00.000Z', () => {
    const pivot = new Date('2011-11-13T05:00:00.000Z');
    const result = getSegmentOfDays(pivot);

    expect(result.start).toEqual(new Date('2011-10-30T05:00:00.000Z'));
    expect(result.end).toEqual(new Date('2011-12-04T05:59:59.999Z'));
    expect(result.dayCount).toEqual(35);

    expect(result.days.length).toEqual(35);
    expect(result.weeks.length).toEqual(5);

    expect(result.weeks[0][0]).toEqual(new Date('2011-10-30T05:00:00.000Z'));
    expect(result.weeks[4][6]).toEqual(new Date('2011-12-03T06:00:00.000Z'));
  });
});
