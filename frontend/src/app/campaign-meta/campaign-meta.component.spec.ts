import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignMetaComponent } from './campaign-meta.component';

describe('CampaignMetaComponent', () => {
  let component: CampaignMetaComponent;
  let fixture: ComponentFixture<CampaignMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignMetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
