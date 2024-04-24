import { Injectable } from '@nestjs/common';

import {
  Grading,
  Group,
  Peer,
  Criteria,
  Campaign,
  CampaignStatus,
} from '../interfaces';

/**
 * the calculations service contains the logic for pgt objects
 * much like the frontend campaign service
 */
@Injectable()
export class CalculationsService {
  peerEquals(peer1: Peer, peer2: Peer): boolean {
    return peer1.peerId == peer2.peerId;
  }

  getPeerToPeerGradings(group: Group, toPeer: Peer, fromPeer: Peer): Grading[] {
    return group.gradings.filter((grading: Grading) => {
      return (
        this.peerEquals(grading.toPeer, toPeer) &&
        this.peerEquals(grading.fromPeer, fromPeer)
      );
    });
  }

  getCampaignStatus(campaign: Campaign): CampaignStatus {
    if (!campaign.openingDate && !campaign.closingDate) {
      return `erstellt`;
    } else if (campaign.openingDate && !campaign.closingDate) {
      return `läuft`;
    } else {
      return `abgeschlossen`;
    }
  }

  getPeersThirdPartyAverageByCriteria(
    criteria: Criteria,
    group: Group,
    peer: Peer,
  ): number {
    let sum = 0;
    let count = 0;
    const filteredGradings = group.gradings.filter(
      (grading) =>
        grading.criteria.criteriaId == criteria.criteriaId &&
        grading.toPeer.peerId == peer.peerId &&
        grading.fromPeer.peerId != peer.peerId,
    );
    for (let grading of filteredGradings) {
      sum += grading.points;
      count++;
    }
    if (count == 0) {
      return 0;
    }
    return Math.round((sum / count) * 100) / 100;
  }

  getPeersThirdPartyAverage(group: Group, peer: Peer): number {
    let sum = 0;
    let count = 0;
    const filteredGradings = group.gradings.filter(
      (grading) =>
        grading.toPeer.peerId == peer.peerId &&
        grading.fromPeer.peerId != peer.peerId,
    );
    for (let grading of filteredGradings) {
      sum += grading.points * grading.criteria.weight;
      count += grading.criteria.weight;
    }
    if (count == 0) {
      return 0;
    }
    return Math.round((sum / count) * 100) / 100;
  }

  getPeerReviewDifference(group: Group, peer: Peer): number {
    return (
      Math.round(
        (this.getPeersThirdPartyAverage(group, peer) -
          this.getGroupAverage(group)) *
          100,
      ) / 100
    );
  }

  /**
   * gets the average of all gradings except the ones peers gave themselves
   * @param group
   * @returns
   */
  getGroupAverage(group: Group): number {
    let sum = 0;
    let count = 0;
    const filteredGradings = group.gradings.filter(
      (grading) => grading.toPeer.peerId != grading.fromPeer.peerId,
    );
    for (let grading of filteredGradings) {
      sum += grading.points * grading.criteria.weight;
      count += grading.criteria.weight;
    }
    if (count == 0) return 0;
    return Math.round((sum / count) * 100) / 100;
  }

  getGradingPointsByPeersAndCriteria(
    group: Group,
    fromPeer: Peer,
    toPeer: Peer,
    criteria: Criteria,
  ): number {
    const grading = group.gradings.find((grading) => {
      return (
        grading.fromPeer.peerId == fromPeer.peerId &&
        grading.toPeer.peerId == toPeer.peerId &&
        grading.criteria.criteriaId == criteria.criteriaId
      );
    });
    if (!grading) return 0;
    return grading.points;
  }

  getPeersSelfGradingPointsByCriteria(
    criteria: Criteria,
    group: Group,
    peer: Peer,
  ): number {
    return this.getGradingPointsByPeersAndCriteria(group, peer, peer, criteria);
  }

  getPeerToPeerAverage(group: Group, fromPeer: Peer, toPeer: Peer): number {
    const gradings = this.getPeerToPeerGradings(group, fromPeer, toPeer);
    if (gradings.length == 0) {
      return 0;
    } else {
      let sum = 0;
      let count = 0;
      for (let grading of gradings) {
        sum += grading.points * grading.criteria.weight;
        count += grading.criteria.weight;
      }
      return Math.round((sum / count) * 100) / 100;
    }
  }

  getPeersSelfAverage(group: Group, peer: Peer): number {
    return this.getPeerToPeerAverage(group, peer, peer);
  }
}
