import { useUserAuth } from "./UserAuthProvider"
import { UserDataProvider } from "./UserDataProvider";

export default function UserDataSwitch( {children} ) {
    const { user } = useUserAuth();
    return <>
        { ( user
                ?   <UserDataProvider>
                        { children }
                    </UserDataProvider>
                :   <>{ children }</>
        ) }
    </>
}