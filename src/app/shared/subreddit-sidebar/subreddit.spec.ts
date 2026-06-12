import { TestBed } from '@angular/core/testing';

import { Subreddit } from './subreddit';

describe('Subreddit', () => {
  let service: Subreddit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Subreddit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
