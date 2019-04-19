import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleService]
    });
    service = TestBed.get(PeopleService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be initialized', () => {
    expect(service).toBeTruthy();
  });

  it('should get all people', () => {
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

    service.getAllPeople().subscribe(res => {
      expect(res.body.length).toBe(2);
    });

    const baseUrl = service.getApiBaseUrl();
    const req = httpMock.expectOne(`${baseUrl}/api/people`);
    expect(req.request.method).toEqual('GET');

    req.flush({body: dummyPeople});
  });

  it('should get api base url', () => {
    const url = service.getApiBaseUrl();
    expect(url).toBe('http://localhost:3000');
  });
});
