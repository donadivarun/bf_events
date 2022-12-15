import { Event } from './event.model';

describe('Event', () => {
  it('should create an instance', () => {
    expect(new Event('', '', '', '', '', 0, new Date(), false)).toBeTruthy();
  });
});
