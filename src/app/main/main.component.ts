import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FetchCodeService } from '../fetch-code.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
declare var bootstrap: any;
import html2canvas from 'html2canvas';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Add this line
})
export class MainComponent {
  responseData: any;
  loading: any = false;
  faLink = faLink;
  selectedQr: any;
  link: any;
  currentUrl: any;
  saved: { shortlink: string; originallink: string; date: string }[] = [];

  constructor(
    private fetchCodeService: FetchCodeService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {}

  isHttpsLink(url: string): boolean {
    const regex =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return regex.test(url);
  }

  ngOnInit(): void {
    this.currentUrl = window.location.origin;

    const savedLinks = localStorage.getItem('links');

    if (savedLinks) {
      this.saved = JSON.parse(savedLinks);
    }
  }

  fetchData() {
    if (!this.link) {
      this.toastr.error('Kindly Add Link !!');
    } else if (this.isHttpsLink(this.link) == false) {
      this.toastr.error('Please provide a proper link');
    } else {
      const payload = {
        redirect_url: this.link,
      };

      this.loading = true;

      this.fetchCodeService.fetchData(payload).subscribe(
        (response) => {
          this.responseData = response;
          this.loading = false;
          console.log(this.responseData);

          var myModal = new bootstrap.Modal(
            document.getElementById('exampleModal'),
            {
              keyboard: false,
            }
          );

          var data = {
            shortlink: this.responseData.data.id,
            originallink: this.link,
            date: new Date().toLocaleDateString().toString(),
          };

          this.saved = [...this.saved, data];

          var jsonData = JSON.stringify(this.saved);

          localStorage.setItem('links', jsonData);

          myModal.show();
          this.link = '';
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.loading = false;
        }
      );
    }
  }
  copyCode() {
    navigator.clipboard.writeText(
      this.currentUrl + '/re/' + this.responseData.data.id
    );
    this.toastr.info('Link Copied Successfully !!');
  }
  copy(link: any) {
    navigator.clipboard.writeText(this.currentUrl + '/re/' + link);
    this.toastr.info('Link Copied Successfully !!');
  }

  @ViewChild('divToDownload')
  divToDownload!: ElementRef;

  downloadQRCode() {
    const elementToCapture = this.divToDownload.nativeElement;

    html2canvas(elementToCapture).then((canvas) => {
      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png');

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'qr.png';

      // Append the anchor to the body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the temporary anchor
      document.body.removeChild(link);
    });
  }
  selectQr(link: any) {
    this.selectedQr = this.currentUrl + '/re/' + link;
  }
}
