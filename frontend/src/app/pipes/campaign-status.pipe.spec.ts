import { CampaignStatusPipe } from './campaign-status.pipe';

describe('CampaignStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new CampaignStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
