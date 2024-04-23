import { Component, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PGTService } from '../../services/pgt.service';
/**
 * this page is loaded only when a link to get a peer grading review is opened
 * the pdf is generated in the backend and immediately downloaded
 */
@Component({
  selector: 'pgt-pdf-review',
  templateUrl: './pdf-review.component.html',
  styleUrls: ['./pdf-review.component.css', '../../app.component.css'],
})
export class PdfReviewComponent implements OnInit {
  url: Signal<string> = signal(this.activatedRoute.snapshot.params['url']);

  constructor(
    private pgtService: PGTService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pgtService.getReviewPDF(this.url()).subscribe({
      next: (blob) => {
        if (blob) {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = $localize`Review.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
      },
      error: (err) => {
        this.router.navigate([`/error/${err.status}`]);
      },
    });
  }
}
