import React, { useState, useEffect } from "react";
import axios from "axios";

interface ContextValue {
    track_list: [];
heading: string;
dispatch: ({type}:{type:string}) => void;
  }


//   const Context = React.createContext<((action: IAuthContext) => void) | null>(null);


export const Context = React.createContext<ContextValue>({} as ContextValue);

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'SEARCH_TRACKS':
//       return {
//         ...state,
//         track_list: action.payload,
//         heading: 'Search Results'
//       };
//     default:
//       return state;
//   }
// };

export function ContextController({ children }) {
    let intialState = {
        track_list: [],
        heading: ""
            // dispatch: action => this.setState(state => reducer(state, action))
    };

    const [state, setState] = useState(intialState);

    useEffect(() => {
        axios
            .get(
                `https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
          }
        }
            )
            .then(res => {
                console.log(res.data);
                setState({
                    track_list: res.data.message.body.track_list,
                    heading: "Top 10 Tracks"
                });
            })
            .catch(err => console.log(err));
    }, []);

    return ( <
        Context.Provider value = {
            [state, setState]
        } > { children } </Context.Provider>
    );
}