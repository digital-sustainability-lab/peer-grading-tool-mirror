import { Component, Input, OnInit } from '@angular/core';
import { Campaign, Peer } from 'src/app/interfaces';
import { GradingComponent } from '../grading.component';

/**
 * this component displays each row of the form in the grading component
 */
@Component({
  selector: 'pgt-single-row',
  templateUrl: './single-row.component.html',
  styleUrls: ['./single-row.component.css', '../../app.component.css'],
})
export class SingleRowComponent implements OnInit {
  @Input() toPeer: Peer;
  @Input() peer: Peer;
  @Input() campaign: Campaign;
  @Input() gradingsFormGroup: any;

  constructor(private gradingComponent: GradingComponent) {}

  ngOnInit(): void {}

  /**
   * this function is called in the html to calculate the average of a row
   * @param toPeer
   * @returns
   */
  getPeersAverage(toPeer: Peer): number {
    if (this.peer) {
      const gradings = this.gradingComponent.generateGradings(toPeer);

      let sum = 0;
      let count = 0;
      for (let grading of gradings) {
        sum += grading.points * grading.criteria.weight;
        count += grading.criteria.weight;
      }
      return sum / count;
    }
    return 0;
  }
}
