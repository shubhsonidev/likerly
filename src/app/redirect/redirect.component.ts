import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent {
  id?: string;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Access route parameters and extract ID
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      if (!this.id) {
        this.router.navigate(['/main']);
      }

      this.http
        .get<any>(
          'https://script.google.com/macros/s/AKfycbzxNf1xyzPR6jzr4S2O79xVbvQfTU2OJNxKBzW96BKVCKW-U_IJ_8A8MT3TEc5wb0zgaw/exec?apifor=getoriginal&id=' +
            this.id
        )
        .subscribe((Response) => {
          console.log(Response);
          if (Response.data) {
            let url = Response.data.originalUrl;

            if (url == null) {
              this.router.navigate(['/NotFound']);
            } else {
              if (url.toLowerCase().includes('https')) {
                // Open the URL in a new tab
                window.open(url, '_self');
              } else {
                window.open('https://' + url, '_self');
              }
            }
          }
        });
    });
  }
}
