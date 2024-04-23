import { Component, Input } from '@angular/core';
import { Campaign, Peer, PeerComment } from 'src/app/interfaces';

@Component({
  selector: 'pgt-group-comments',
  templateUrl: './group-comments.component.html',
  styleUrl: './group-comments.component.css',
})
export class GroupCommentsComponent {
  @Input('comments') comments: PeerComment[];
  @Input('peers') peers: Peer[];

  filterCommentsByPeer(peer: Peer): PeerComment[] {
    return this.comments.filter(
      (comment: PeerComment) => comment.fromPeer.peerId == peer.peerId
    );
  }
}
