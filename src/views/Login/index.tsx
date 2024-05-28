import { PROJECT_NAME } from '../../constant/app';
import LoginBg from '@/assets/login_bg.png';
import { Form, Input, Checkbox, Button, notification } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch } from '@/store/hooks';
import { fetchLogin } from '@/store/modules/user';
import { LoginDto } from '@/api/login';
import { useCallback, useState } from 'react';
import { nowTimePeriod, timePeriodZh } from '@/utils/nowTimePeriod';

// css
import './index.less';

function LoginContainer(): JSX.Element {
  // Form 实例
  const [form] = Form.useForm();
  // Form 初始值
  const formValue: LoginDto = {
    user_name: 'zzl',
    user_passwd: 'zzl86223288',
  };

  // 记住我
  const [rememberMe, setRememberMe] = useState(false);
  // 记住密码按钮点击
  const onRemember = (e: CheckboxChangeEvent): void => {
    setRememberMe(e.target.checked);
  };

  // Dispatch
  const dispatch = useAppDispatch();

  // 登录按钮Loading
  const [loading, setLoading] = useState(false);
  // 登录API
  const logIn = useCallback(
    async (data: LoginDto) => {
      return await dispatch(fetchLogin(data)).unwrap();
    },
    [dispatch]
  );
  // 登录按钮点击
  const submit = async () => {
    setLoading(true);
    try {
      const values = await form.getFieldsValue();
      await logIn(values);
      notification.success({
        message: '登录成功',
        description: `${timePeriodZh[nowTimePeriod()]}，欢迎回来`,
      });
    } catch (error) {
      console.log('登录失败：', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer flex-center">
      <div className="loginBox">
        <div className="bgBox">
          <img src={LoginBg} alt="" />
        </div>
        <div className="rightBox flex-center flex-column">
          <div className="logo">
            <span>{PROJECT_NAME}</span>
          </div>
          <div className="formBox">
            <Form initialValues={formValue} form={form}>
              <Form.Item name="user_name">
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item noStyle name="user_passwd">
                <Input.Password autoComplete="off" placeholder="请输入密码" />
              </Form.Item>
              <Form.Item>
                <div className="checkBox">
                  <Checkbox defaultChecked={rememberMe} onChange={onRemember}>
                    <span className="remember">记住我</span>
                  </Checkbox>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  onClick={submit}
                  className="w-100"
                >
                  登 录
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="copyright">
            Copyright © 2022-2023 ALT tech All Right Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
