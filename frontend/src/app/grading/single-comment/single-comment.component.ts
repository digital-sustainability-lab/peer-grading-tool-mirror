import { Component, Input } from '@angular/core';
import { Peer, User } from 'src/app/interfaces';

@Component({
  selector: 'pgt-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css',
})
export class SingleCommentComponent {
  @Input() toUser: User;
  @Input() peer: Peer;
  @Input() commentFormGroup: any;
  @Input() isAdmin: boolean = false;
}
