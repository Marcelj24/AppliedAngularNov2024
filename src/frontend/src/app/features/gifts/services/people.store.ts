import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { PeopleCreate, PeopleEntity } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { GiftDataService } from './gift-data.service';

export const PeopleStore = signalStore(
  withDevtools('people-store'),
  withEntities<PeopleEntity>(),
  withMethods((store) => {
    // injection context
    const service = inject(GiftDataService);
    return {
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            service
              .getPeople()
              .pipe(tap((d) => patchState(store, setEntities(d)))),
          ),
        ),
      ),
      addPerson: (request: PeopleCreate) => {
        const entity: PeopleEntity = {
          id: crypto.randomUUID(),
          ...request,
        };
        patchState(store, addEntity(entity));
      },
    };
  }),
  withComputed((store) => {
    return {
      totalPeople: computed(() => store.entities().length),
      hasPeople: computed(() => store.entities().length > 0),
      totalLocal: computed(
        () => store.entities().filter((p) => p.location === 'local').length,
      ),
      totalRemote: computed(
        () => store.entities().filter((p) => p.location === 'remote').length,
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
