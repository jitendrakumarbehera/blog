import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogaddeditComponent } from './blogaddedit.component';

describe('BlogaddeditComponent', () => {
  let component: BlogaddeditComponent;
  let fixture: ComponentFixture<BlogaddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogaddeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
