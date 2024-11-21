import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PeopleEntity } from '../types';

export type ApiResult = {
  people: Array<{
    id: string;
    name: string;
    isLocal: boolean;
  }>;
};

@Injectable()
export class GiftDataService {
  #http = inject(HttpClient);

  getPeople(): Observable<PeopleEntity[]> {
    return this.#http.get<ApiResult>('/api/user/gifts').pipe(
      map((r) => r.people),
      map((people) => {
        return people.map((person) => {
          const transformed: PeopleEntity = {
            id: person.id,
            name: person.name,
            location: person.isLocal ? 'local' : 'remote',
          };
          return transformed;
        });
      }),
    );
  }
}
