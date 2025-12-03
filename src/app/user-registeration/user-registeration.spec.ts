import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisteration } from './user-registeration';

describe('UserRegisteration', () => {
  let component: UserRegisteration;
  let fixture: ComponentFixture<UserRegisteration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRegisteration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegisteration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
