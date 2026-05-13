import {
  BarChart2,
  Briefcase,
  ShieldAlert,
  Activity,
  Wrench,
  Settings,
  PieChart,
  List,
  User,
  Calculator,
  FileText,
  Droplet,
  Umbrella,
  AlertTriangle,
  Monitor,
  Map,
  Cpu,
  TrendingDown,
  Wind,
  Sun,
  Users,
  UserCog,
  Network,
  Sliders,
  Menu,
  LogIn,
  MousePointerClick,
  MessageSquare,
  Droplets
} from 'lucide-react';

export const adminMenu = [
  {
    title: '数据大屏（驾驶舱）',
    path: '/dashboard',
    icon: BarChart2,
  },
  {
    title: '业务管理',
    path: '/business',
    icon: Briefcase,
    children: [
      { title: '水库标的管理', path: '/business/reservoir', icon: Droplet },
      { title: '保险管理', path: '/business/insurance', icon: Umbrella },
    ],
  },
  {
    title: '风控预警',
    path: '/risk',
    icon: ShieldAlert,
    children: [
      { title: '预警管理', path: '/risk/warning', icon: AlertTriangle },
      {
        title: '理赔管理',
        path: '/risk/claims',
        icon: FileText,
        children: [
          { title: '理赔计算器', path: '/risk/claims/calculator', icon: Calculator },
          { title: '理赔记录', path: '/risk/claims/records', icon: FileText },
        ],
      },
    ],
  },
  {
    title: '数据监控',
    path: '/monitoring',
    icon: Activity,
    children: [
      { title: '实时数据监控', path: '/monitoring/realtime', icon: Monitor },
      { title: '县域灾害监控', path: '/monitoring/county', icon: Map },
    ],
  },
  {
    title: '运营支撑',
    path: '/ops',
    icon: Wrench,
    children: [
      { title: '设备管理', path: '/ops/devices', icon: Cpu },
      { title: '风险减量管理', path: '/ops/risk-reduction', icon: TrendingDown },
      { title: '预泄管理', path: '/ops/pre-discharge', icon: Droplets },
      { title: '干旱管理', path: '/ops/drought', icon: Sun },
    ],
  },
  {
    title: '系统管理',
    path: '/system',
    icon: Settings,
    children: [
      { title: '账号管理', path: '/system/account', icon: Users },
      { title: '角色管理', path: '/system/role', icon: UserCog },
      { title: '组织管理', path: '/system/org', icon: Network },
      { title: '基础配置', path: '/system/config', icon: Sliders },
      { title: '菜单管理', path: '/system/menu', icon: Menu },
      { title: '登录日志', path: '/system/log/login', icon: LogIn },
      { title: '操作日志', path: '/system/log/operation', icon: MousePointerClick },
      { title: '短信记录', path: '/system/log/sms', icon: MessageSquare },
    ],
  },
];

export const h5Menu = [
  { title: '数据统计', path: '/h5/stats', icon: PieChart },
  { title: '事件', path: '/h5/events', icon: List },
  { title: '我的', path: '/h5/profile', icon: User },
];
