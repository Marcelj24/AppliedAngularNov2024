import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { PeopleCreate, PeopleEntity } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';

export const PeopleStore = signalStore(
  withDevtools('people-store'),
  withEntities<PeopleEntity>(),
  withMethods((store) => {
    // injection context
    return {
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
);
