import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class PeopleComponent implements OnInit {
  people: any = [];

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.setPeople();
  }

  setPeople(): void {
    this.peopleService.getAllPeople().subscribe((res: any) => {
      this.people = res;
    });
  }
}
