import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTile } from './post-tile';

describe('PostTile', () => {
  let component: PostTile;
  let fixture: ComponentFixture<PostTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostTile],
    }).compileComponents();

    fixture = TestBed.createComponent(PostTile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
