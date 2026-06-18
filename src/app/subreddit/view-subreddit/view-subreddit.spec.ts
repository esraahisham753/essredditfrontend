import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubreddit } from './view-subreddit';

describe('ViewSubreddit', () => {
  let component: ViewSubreddit;
  let fixture: ComponentFixture<ViewSubreddit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSubreddit],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSubreddit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
