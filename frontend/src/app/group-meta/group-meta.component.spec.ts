import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMetaComponent } from './group-meta.component';

describe('GroupMetaComponent', () => {
  let component: GroupMetaComponent;
  let fixture: ComponentFixture<GroupMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
