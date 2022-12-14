import type { NextPage } from 'next';
import { RequiredMark } from '../components/RequiredMark';
import {ChangeEvent, useState} from "react";
import  { axiosApi } from "../lib/axios";
import {AxiosError, AxiosResponse} from "axios";
import {useRouter} from "next/router";

// POSTデータの型
type LoginForm = {
  email: string;
  password: string;
}

// バリデーションメッセージの型
type Validation = LoginForm & { loginFailed: string };

const Home: NextPage = () => {

  const router = useRouter();

  // POSTデータのstate
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  // バリデーションメッセージのstate
  const [validation, setValidation] = useState<Validation>({
    email: "",
    password: "",
    loginFailed: "",
  });

  // POSTデータの更新
  const updateLoginForm = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  };

  // ログイン
  const login = () => {
    axiosApi
        .get('/sanctum/csrf-cookie')  // csrf保護の初期化
        .then((res: AxiosResponse) => {
          axiosApi  // ログイン処理
              .post('/api/login', loginForm)
              .then((res:AxiosResponse) => {
                console.log(res.data);
                router.push('/memos');
              })
              .catch((err: AxiosError) => {
                console.log(err.response);
              });
        });
  };

  return (
    <div className='w-2/3 mx-auto py-24'>
      <div className='w-1/2 mx-auto border-2 px-12 py-16 rounded-2xl'>
        <h3 className='mb-10 text-2xl text-center'>ログイン</h3>
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>メールアドレス</p>
            <RequiredMark />
          </div>
          <input
            className='p-2 border rounded-md w-full outline-none'
            name='email'
            value={loginForm.email}
            onChange={updateLoginForm}
          />
          {/* <p className='py-3 text-red-500'>必須入力です。</p> */}
        </div>
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>パスワード</p>
            <RequiredMark />
          </div>
          <small className='mb-2 text-gray-500 block'>
            8文字以上の半角英数字で入力してください
          </small>
          <input
            className='p-2 border rounded-md w-full outline-none'
            name='password'
            type='password'
            value={loginForm.password}
            onChange={updateLoginForm}
          />
          {/* <p className='py-3 text-red-500'>
            8文字以上の半角英数字で入力してください。
          </p> */}
        </div>
        <div className='text-center mt-12'>
          {/* <p className='py-3 text-red-500'>
            IDまたはパスワードが間違っています。
          </p> */}
          <button
              className='bg-gray-700 text-gray-50 py-3 sm:px-20 px-10 rounded-xl cursor-pointer drop-shadow-md hover:bg-gray-600'
              onClick={login}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};


export default Home;
