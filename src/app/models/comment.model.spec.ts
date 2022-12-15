import { Comment } from './comment.model';

describe('Comment', () => {
  it('should create an instance', () => {
    expect(new Comment('', '', '', '', new Date())).toBeTruthy();
  });
});
