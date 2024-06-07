import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent {
  id?: string;
  currentUrl: any;
  total: any;
  userData: any;
  loader: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.origin;
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      if (!this.id) {
        this.router.navigate(['/main']);
      }
    });
    this.loader = true;

    this.http
      .get<any>(
        'https://script.google.com/macros/s/AKfycbyopRx0C0RRkdKVagX7YcaBT32L-2Ksp1xomG2YZC9rAlGkCG8bBKvewAoztX5wmtdO3Q/exec?apifor=track&code=' +
          this.id
      )
      .subscribe((Response) => {
        this.loader = false;
        console.log(Response);
        if (Response.data) {
          this.total = Response.data.total;
          this.userData = Response.data.users;
        }
      });
  }
  getFLagUrl(data: any) {
    return data.split('|')[2];
  }
}
