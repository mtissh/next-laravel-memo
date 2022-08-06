import type { NextPage } from 'next';
import { RequiredMark } from '../components/RequiredMark';
import {useState} from "react";
import  { axiosApi } from "../libs/axios";
import {AxiosError, AxiosResponse} from "axios";
import {useRouter} from "next/router";
import useUserState from "../states/auth/atoms";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// POSTデータの型
type LoginForm = {
  email: string;
  password: string;
}

// バリデーションメッセージの型
type Validation = {
  email?: string;
  password?: string;
  loginFailed?: string;
};

const Home: NextPage = () => {

  // Page遷移に使う
  const router = useRouter();

  // ログインユーザ情報のグローバルstateをセット
  const {setUser} = useUserState();

  // POSTデータのstate

  const LoginSchema = yup.object().required().shape({
    email: yup.string().max(256, '256文字以内で入力してください。').required('必須項目です。').email('有効なメールアドレスを入力してください。'),
    password: yup.string().required('必須項目です。'),
  });

  const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur",
  });

  // バリデーションメッセージのstate
  const [validation, setValidation] = useState<Validation>({});

  // ログイン
  const login = (data: LoginForm) => {

    // バリデーションメッセージ初期化
    setValidation({});
    axiosApi
        .get('/sanctum/csrf-cookie')  // csrf保護の初期化
        .then((res: AxiosResponse) => {
          axiosApi  // ログイン処理
              .post('/api/login', data)
              .then((response:AxiosResponse) => {
                setUser(response.data.data);
                router.push('/memos');
              })
              .catch((err: AxiosError) => {
                if (err.response?.status === 422){
                  // APIから返却されたバリデーションメッセージを変数に格納（長いので）
                  // @ts-ignore
                  const errors = err.response?.data.errors;
                  // state更新用オブジェクト定義（keyがstring, valueもstring）
                  const validationMessages: { [index: string]: string } = {} as Validation;
                  /*
                  Object.keys(errors) で、↑ のオブジェクトのkeyで構成された配列を作成、
                  state更新用オブジェクトをローカルstate（validation）と同じ形に更新。
                  */
                  Object.keys(errors).map((key: string) => {
                    validationMessages[key] = errors[key][0];
                  });
                  setValidation(validationMessages);
                }
                if (err.response?.status === 500){
                  console.log('エラー');
                }
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
            type="email"
            {...register('email')}
          />
          {errors.email?.message && (<p className='py-3 text-red-500'>{errors.email.message}</p>)}
          {validation.email && (<p className='py-3 text-red-500'>{validation.email}</p>)}
        </div>
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>パスワード</p>
            <RequiredMark />
          </div>
          <input
            className='p-2 border rounded-md w-full outline-none'
            type='password'
            {...register('password')}
          />
          {errors.password?.message && (<p className='py-3 text-red-500'>{errors.password.message}</p>)}
          {validation.password && (<p className='py-3 text-red-500'>{validation.password}</p>)}
        </div>
        <div className='text-center mt-12'>
          {validation.loginFailed && (<p className='py-3 text-red-500'>{validation.loginFailed}</p>)}
          <button
              className='bg-gray-700 text-gray-50 py-3 sm:px-20 px-10 rounded-xl cursor-pointer drop-shadow-md hover:bg-gray-600'
              onClick={handleSubmit(login)}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};


export default Home;
