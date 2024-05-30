import { Button } from 'antd';

import './index.less';

import Image from '@/assets/404.png';

function ErrorPage404() {
  const toHome = () => {};
  return (
    <div className="errorPage flex-center">
      <img className="img" src={Image} />
      <div className="code">404</div>
      <div className="desc">抱歉，您访问的页面不存在。</div>
      <Button type="primary" className="btn" onClick={toHome}>
        返回首页
      </Button>
    </div>
  );
}

export default ErrorPage404;
