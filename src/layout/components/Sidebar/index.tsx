import { useAppSelector } from '@/store/hooks';
import { Menu, type MenuProps } from 'antd';

import './index.less';
import { selectSyncRouter } from '@/store/modules/router';
import { SyncRouteProp } from '@/router/types';
import { useMemo } from 'react';
import MenuItem from 'antd/es/menu/MenuItem';
import RemixiconComponent from '@/components/Remixicon';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const menuHandle = (routes: SyncRouteProp[]): MenuItem[] => {
  const nodeList: MenuItem[] = [];
  routes.forEach((route) => {
    if (route.meta.hidden) return;
    const obj: MenuItem = {
      key: route.path,
      label: route.meta.title,
      icon: route.meta.icon ? (
        <span className="action">
          <RemixiconComponent name={route.meta.icon} />
        </span>
      ) : undefined,
      children: route.children ? menuHandle(route.children) : undefined,
    };
    nodeList.push(obj);
  });
  return nodeList;
};

function SidebarContainer() {
  const navigate = useNavigate();
  const routes = useAppSelector(selectSyncRouter);
  const menuItems = useMemo(() => menuHandle(routes), [routes]);
  const menuClick = ({ key }: { key: string }) => {
    console.log(key);
    navigate(key);
  };
  return (
    <div className="sidebarContainer">
      <Menu
        items={menuItems}
        mode="inline"
        theme="dark"
        onClick={menuClick}
      ></Menu>
    </div>
  );
}
export default SidebarContainer;
