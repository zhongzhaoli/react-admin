export interface BasicRouteProp {
  id: number;
  pid: number;
  path: string;
  name: string;
  meta: {
    title: string;
    icon: string | null;
    hidden: boolean;
    keepAlive: boolean;
    affix: boolean;
  };
}

export interface SyncRouteProp extends BasicRouteProp {
  component: string;
  children?: SyncRouteProp[];
}

export interface SyncDynamicRouteProp extends BasicRouteProp {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  children?: SyncDynamicRouteProp[];
}
