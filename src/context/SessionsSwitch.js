import { SessionsProvider } from "./SessionsContext";
import { useUserAuth } from "./UserAuthProvider"

export default function SessionsSwitch( {children} ) {
    const { user } = useUserAuth();
    return <>
        { ( user
                ?   <SessionsProvider>
                        { children }
                    </SessionsProvider>
                :   <>{ children }</>
        ) }
    </>
}