import React from "react";
import {ReturnedValue} from "use-sound/dist/types";
import useSound from "use-sound";

const LightSoundContext = React.createContext<ReturnedValue|null>(null);

export function LightSoundProvider({children}:{children: React.ReactNode}){
    const returnedValue = useSound("/lightswitch.mp3", {
        volume: 0.05,
        sprite: {
            on: [0, 300],
            off: [500, 300],
        },
    })
    return (
        <LightSoundContext.Provider children={children} value={returnedValue}/>
    )
}

export default LightSoundContext;