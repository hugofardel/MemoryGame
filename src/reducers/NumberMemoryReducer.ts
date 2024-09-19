import { Reducer } from "react";

type GamePhase = "started" | "finished" | "notstarted" | "visualizing";

interface ReducerState {
	sequence: null | string;
	answer: null | string;
	score: number;
	bestScore: number;
	status: GamePhase;
}

type ReducerAction =
	| { type: "START_GAME" }
	| { type: "NIVEAU_SUIVANT" }
	| { type: "CHANGE_STATUS"; payload: GamePhase }
	| { type: "END_GAME" };

const initialState: ReducerState = {
	sequence: null,
	answer: null,
	score: 0,
	bestScore: 0,
	status: "notstarted",
};

const numberMemoryReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
	switch (action.type) {
		case "START_GAME": {
			return {
				...initialState,
				sequence: Array.from({ length: 1 }, () => Math.floor(Math.random() * 10)).join(""),
				status: "visualizing",
			};
		}
		case "NIVEAU_SUIVANT": {
			return {
				...state,
				score: state.score + 1,
				status: "visualizing",
				sequence: Array.from({ length: state.score + 2 }, () => Math.floor(Math.random() * 10)).join(""),
			};
		}
		case "CHANGE_STATUS": {
			return { ...state, status: action.payload };
		}
		case "END_GAME": {
			return { ...state, status: "finished", bestScore: state.score > state.bestScore ? state.score : state.bestScore };
		}
		default: {
			return state;
		}
	}
};

export { initialState, numberMemoryReducer };
