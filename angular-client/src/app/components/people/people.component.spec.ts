import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PeopleService } from 'src/app/services/people.service';
import { of } from 'rxjs';

describe('PeopleComponent', () => {
  const dummyPeople = [
    {
      _id: '5cb8867ddfe2450011f7ff30',
      personId: '100',
      isActive: true,
      age: 26,
      name: 'Jon Doe',
      gender: 'Male',
      company: 'Test Company',
      email: 'JonDoe@TestCompany.com',
      phone: '402-111-2222',
      address: '123 Street Lane'
    },
    {
      _id: '6ef6654dsej3348711f7se30',
      personId: '101',
      isActive: false,
      age: 23,
      name: 'Jane Doe',
      gender: 'Female',
      company: 'Test Company',
      email: 'JaneDoe@TestCompany.com',
      phone: '402-111-3333',
      address: '123 Street Lane'
    }
  ];
  let peopleService;
  let peopleServiceStub: Partial<PeopleService>;
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  peopleServiceStub = {
    getAllPeople: () => {
      return of(dummyPeople);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleComponent ],
      providers: [{provide: PeopleService, useValue: peopleServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    peopleService = TestBed.get(PeopleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set People', () => {
    spyOn(peopleService, 'getAllPeople').and.callThrough();
    component.setPeople();
    expect(peopleService.getAllPeople).toHaveBeenCalledTimes(1);
    expect(component.people).toEqual(dummyPeople);
  });
});
