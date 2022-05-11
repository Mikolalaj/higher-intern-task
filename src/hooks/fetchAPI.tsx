import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

type State = {
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    errorMessage: string,
    data: any
}

type Action =
    | { type: FetchActionType.INIT }
    | { type: FetchActionType.SUCCESS, payload: any }
    | { type: FetchActionType.FAILURE, payload: any };

enum FetchActionType {
    INIT = 'INIT',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE'
}

function dataFetchReducer(state: State, action: Action): State {
    switch (action.type) {
        case FetchActionType.INIT:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false
            };
        case FetchActionType.SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload
            };
        case FetchActionType.FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errorMessage: action.payload
            };
        default:
            throw new Error();
    }
};
  
function useAPI(initialUrl: string) : [State, Function] {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errorMessage: '',
        data: null
    });

    useEffect(() => {
        let didCancel = false;

        async function fetchData() {

            dispatch({ type: FetchActionType.INIT });

            try {
                const result = await axios.get(url)

                if (!didCancel) {
                    dispatch({ type: FetchActionType.SUCCESS, payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: FetchActionType.FAILURE, payload: error });
                    console.log(error)
                }
            }
        };

        fetchData()

        return () => {
            didCancel = true;
        };

    }, [url]);

    return [state, setUrl];
};

export default useAPI
