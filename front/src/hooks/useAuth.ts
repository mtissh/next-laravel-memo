import useUserState from "../states/auth/atoms";
import {axiosApi} from "../libs/axios";

const useAuth = () => {
    const {user, setUser} = useUserState();

    const checkLoggedIn = async (): Promise<boolean> => { // return boolean
        // グローバルstateにユーザ情報アリ（front/api どちらでもログイン中の判定）
        if (user) {
            return true;
        }
        try {
            // グローバルstateがnull（frontが未ログインの判定）の時、APIリクエストでログインユーザを取得
            const res = await axiosApi.get('/api/user');

            // APIから返却されたres.data.dataがユーザ情報（API側はログイン中判定）なら次へ, そうでない場合はfalse返却
            if (!res.data.data) {
                return false;
            }
            // ↑の判定でAPI側ではログイン中なのがわかるので、グローバルstateを更新してtrueを返却
            setUser(res.data.data);
            return true;
        } catch {
            // ここに到達するのは何らかのシステムエラーなので、falseを返却
            return false;
        }
    };
    return {checkLoggedIn};
}

export default useAuth;