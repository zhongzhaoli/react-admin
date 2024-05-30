import Loading from '@/components/Loading';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import LogoContainer from './components/Sidebar/logo';
import SidebarContainer from './components/Sidebar';
const { Header, Content, Sider } = Layout;

import './index.less';

function LayoutContainer() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className="layoutSidebarBox">
        <LogoContainer />
        <SidebarContainer />
      </Sider>
      <Layout>
        <Header className="layoutHeaderBox" />
        <Content>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutContainer;
