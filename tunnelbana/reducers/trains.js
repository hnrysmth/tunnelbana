import Immutable from "immutable";
import { createReducer } from "signalbox";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.CREATE_TRAIN](state, action) {
    return state.set(
      action.train.id,
      Immutable.fromJS({
        id: action.train.id,
        lineId: action.train.lineId,
        stationId: action.train.stationId
      })
    );
  },

  [actions.DEPARTURE](state, action) {
    return state.updateIn([action.journey.trainId], t => {
      return t.merge({
        journeyId: action.journey.id,
        stationId: undefined
      });
    });
  },

  [actions.ARRIVAL](state, action) {
    return state.updateIn([action.journey.trainId], t => {
      return t.merge({
        stationId: action.journey.destinationId,
        journeyId: undefined
      });
    });
  }
});

export const selectors = {
  all(state) {
    return state.toList();
  },

  byId(state, id) {
    return state.get(id);
  }
};
