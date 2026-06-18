import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVote } from './post-vote';

describe('PostVote', () => {
  let component: PostVote;
  let fixture: ComponentFixture<PostVote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostVote],
    }).compileComponents();

    fixture = TestBed.createComponent(PostVote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
