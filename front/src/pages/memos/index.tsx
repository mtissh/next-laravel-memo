import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useState} from "react";
import {axiosApi} from "../../libs/axios";
import {useEffect} from "react";
import {AxiosError, AxiosResponse} from "axios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";


type Memo = {
    title: string;
    body: string;
};

const Memo: NextPage = () => {
    const router = useRouter();
    const { checkLoggedIn } = useAuth();

    // state の定義
    const [memos, setMemos] = useState<Memo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 初回レンダリング時にAPIリクエスト
    useEffect(() => {
        const init = async () => {
            // ログイン判定。awaitを設定しているので、checkLoggedInの結果が返るまで次にはいかない。
            const res: boolean = await checkLoggedIn();
            if (!res) {
                router.push('/');
            }
            axiosApi
                .get('/api/memos')
                .then((response: AxiosResponse) => {
                    setMemos(response.data.data);
                })
                .catch((err: AxiosError) => console.log(err.response))
                .finally(() => setIsLoading(false));
        };
        init();
    },[]);  // useEffectの第2引数を[]にすると、初回レンダリング時にのみuseEffect内の処理が実行される

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='w-2/3 mx-auto mt-32'>
            <div className='w-1/2 mx-auto text-center'>
                <button
                    className='text-xl mb-12 py-3 px-10 bg-blue-500 text-white rounded-3xl drop-shadow-md hover:bg-blue-400'
                    onClick={() => router.push('/memos/post')}
                >
                    メモを追加する
                </button>
            </div>
            <div className='mt-3'>
                <div className='grid w-2/3 mx-auto gap-4 grid-cols-2'>
                    {memos.map((memo: Memo, index) => {
                        return (
                            <div className='bg-gray-100 shadow-lg mb-5 p-4' key={index}>
                                <p className='text-lg font-bold mb-1'>{memo.title}</p>
                                <p className=''>{memo.body}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Memo;
