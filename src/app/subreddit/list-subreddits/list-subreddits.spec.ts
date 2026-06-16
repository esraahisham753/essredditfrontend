import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubreddits } from './list-subreddits';

describe('ListSubreddits', () => {
  let component: ListSubreddits;
  let fixture: ComponentFixture<ListSubreddits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSubreddits],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSubreddits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
