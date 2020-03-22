import { getDisplaySegment } from '../src';

describe('timey-wimey', () => {
  it('gets a screens-ful of days: now', () => {
    const now = new Date();
    const result = getDisplaySegment(now);

    expect(result).toBeTruthy();
  });

  it('gets a screens-ful of days: 2011-11-13T05:00:00.000Z', () => {
    const pivot = new Date('2011-11-13T05:00:00.000Z');
    const result = getDisplaySegment(pivot);

    console.log(result);

    expect(result.start).toEqual(new Date('2011-10-30T00:00:00.000Z'));
    expect(result.end).toEqual(new Date('2011-12-03T23:59:59.999Z'));
    expect(result.dayCount).toEqual(35);

    expect(result.days.length).toEqual(35);
    expect(result.weeks.length).toEqual(5);

    expect(result.weeks[0].start.date).toEqual(
      new Date('2011-10-30T00:00:00.000Z')
    );
    expect(result.weeks[4].end.date).toEqual(
      new Date('2011-12-03T00:00:00.000Z')
    );
  });
});
