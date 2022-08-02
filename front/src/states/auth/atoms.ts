import {atom, useRecoilState} from "recoil";

type UserState = {id: number} | null;

const userState = atom<UserState>({
    key: 'user',
    default: null,
});

const useUserState = () => {
    const [user, setUser] = useRecoilState<UserState>(userState);
    return { user, setUser }
};

export default useUserState;