import type { NextPage } from 'next';
import { RequiredMark } from '../../components/RequiredMark';
import {useEffect, useState} from "react";
import {axiosApi} from "../../libs/axios";
import {AxiosError, AxiosResponse} from "axios";
import {useRouter} from "next/router";
import useAuth from "../../hooks/useAuth";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

type MemoForm = {
  title: string;
  body: string;
}

type Validation = {
  title?: string;
  body?: string;
}

const Post: NextPage = () => {

  // validationのstate 定義

  const PostMemoSchema = yup.object().required().shape({
    title: yup.string().max(128, '128文字以内で入力してください。').required('必須項目です。'),
    body: yup.string().max(256, '256文字以内で入力してください。').required('必須項目です。'),
  });

  const {register, handleSubmit, formState: {errors}} = useForm<MemoForm>({
    resolver: yupResolver(PostMemoSchema),
    mode: "onBlur"
  });
  const { checkLoggedIn } = useAuth();
  const [validation, setValidation] = useState<Validation>({});
  const router = useRouter();
  const createMemo = (data: MemoForm) => {
    setValidation({});

    axiosApi
        .get('/sanctum/csrf-cookie')
        .then((res) => {
          axiosApi
              .post('/api/memos', data)
              .then((response: AxiosResponse) => {
                router.push('/memos');
              })
              .catch((err: AxiosError) => {
                // @ts-ignore
                if (err.response?.status === 422){
                  // @ts-ignore
                  const errors = err.response?.data.errors;
                  const validationMessages: { [index: string]: string } = {} as Validation;
                  Object.keys(errors).map((key: string) => {
                    validationMessages[key] = errors[key][0];
                  });
                  setValidation(validationMessages);
                }
                if (err.response?.status === 500) {
                  alert('エラーです');
                }
              });
        });
  };

  useEffect(() => {
    const init = async () => {
      // ログイン判定
      const res: boolean = await checkLoggedIn();
      if(!res) {
        router.push('/');
      }
    };
    init();
  }, []);

  return (
    <div className='w-2/3 mx-auto'>
      <div className='w-1/2 mx-auto mt-32 border-2 px-12 py-16 rounded-2xl'>
        <h3 className='mb-10 text-2xl text-center'>メモの登録</h3>
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>タイトル</p>
            <RequiredMark />
          </div>
          <input
            className='p-2 border rounded-md w-full outline-none'
            {...register('title')}
          />
          {errors.title?.message && (<p className='py-3 text-red-500'>{errors.title.message}</p>)}
          {validation.title && (<p className='py-3 text-red-500'>{validation.title}</p>)}
        </div>
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>メモの内容</p>
            <RequiredMark />
          </div>
          <textarea
            className='p-2 border rounded-md w-full outline-none'
            cols={30}
            rows={4}
            {...register('body')}
          />
            {errors.body?.message && (<p className='py-3 text-red-500'>{errors.body.message}</p>)}
            {validation.body && (<p className='py-3 text-red-500'>{validation.body}</p>)}
        </div>
        <div className='text-center'>
          <button
              className='bg-gray-700 text-gray-50 py-3 sm:px-20 px-10 mt-8 rounded-xl cursor-pointer drop-shadow-md hover:bg-gray-600'
              onClick={handleSubmit(createMemo)}
          >
            登録する
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
