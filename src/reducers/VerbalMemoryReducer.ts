import { Reducer } from "react";

interface ReducerState {
	wordsSeen: string[];
	currentWord: string;
	score: number;
	status: "started" | "finished" | "notstarted";
}

type ReducerAction = { type: "START_GAME" } | { type: "GENERATE_WORD" } | { type: "END_GAME" };

const initialState: ReducerState = {
	wordsSeen: [],
	currentWord: "",
	score: 0,
	status: "notstarted",
};

const wordsPool = [
	"chat",
	"chien",
	"voiture",
	"maison",
	"ordinateur",
	"bicyclette",
	"arbre",
	"livre",
	"table",
	"chaise",
];

const verbalMemoryReducer: Reducer<ReducerState, ReducerAction> = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case "START_GAME": {
			return {
				...initialState,
				status: "started",
				currentWord: wordsPool[Math.floor(Math.random() * wordsPool.length)],
			};
		}
		case "GENERATE_WORD": {
			return {
				...state,
				score: state.score++,
				wordsSeen: [...state.wordsSeen, state.currentWord],
				currentWord: wordsPool[Math.floor(Math.random() * wordsPool.length)],
			};
		}

		case "END_GAME": {
			return { ...state, status: "finished" };
		}

		default: {
			return state;
		}
	}
};

export { initialState, verbalMemoryReducer };
