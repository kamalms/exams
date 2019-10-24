import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private router: Router) {}
  itemSelected(){
     this.router.navigate(['/list']);
  }
  
}
