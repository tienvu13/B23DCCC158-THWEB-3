import component from "@/locales/en-US/component";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/guess',
		name: 'Guess Game',
		component: './B23DCCC158-TH1/Gues/Guesgame',
		icon: 'Game',
	},
	{
		path: '/',
		name: 'StudyTracker',
		icon: 'HomeOutlined',
		routes: [
			{
				path: './QuanLyMonHoc',
				name: 'QuanLyMonHoc',
				component: './B23DCCC158-TH1/StudyTracker/QuanLyMonHoc',
				icon: 'HomeOutlined',
			},
			{
				path: './QuanLyTienDo',
				name: 'QuanLyTienDo',
				component: './B23DCCC158-TH1/StudyTracker/QuanLyTienDo',
				icon: 'HomeOutlined',
			},
			{
				path: './ThietLapMucTieu',
				name: 'ThietLapMucTieu',
				component: './B23DCCC158-TH1/StudyTracker/ThietLapMucTieu',
				icon: 'HomeOutlined',
			},
		],

	},
	{
		path: '/OTT',
		name:'OanTuTy',
		component:'./B23DCCC158-TH2/Bai1/GameOTT',
		icon: 'GameConsole'
	},
	
	{
		path: '/spa',
		name: 'Spa',
		icon: 'StarOutlined',
		routes: [
		  // 1. Quản lý nhân viên & dịch vụ
		  {
			path: '/spa/management',
			name: 'Quản lý nhân viên, dịch vụ',
			icon: 'SettingOutlined',
			routes: [
			  {
				path: '/spa/management/staff',
				name: 'Quản lý nhân viên',
				component: './Spa/Management/Staff',
				icon: 'TeamOutlined',
			  },
			  {
				path: '/spa/management/services',
				name: 'Quản lý dịch vụ',
				component: './Spa/Management/Services',
				icon: 'ShoppingOutlined',
			  },
			],
		  },
	  
		  // 2. Quản lý lịch hẹn
		  {
			path: '/spa/appointments',
			name: 'Quản lý lịch hẹn',
			icon: 'CalendarOutlined',
			routes: [
			  {
				path: '/spa/appointments/schedule',
				name: 'Đặt lịch hẹn',
				component: './Spa/Appointments/Schedule',
				icon: 'ScheduleOutlined',
			  },
			],
		  },
	  
		  // 3. Đánh giá dịch vụ & nhân viên
		  {
			path: '/spa/reviews',
			name: 'Đánh giá',
			icon: 'CommentOutlined',
			routes: [
			  {
				path: '/spa/reviews/list',
				name: 'Danh sách đánh giá',
				component: './Spa/Reviews/List',
				icon: 'OrderedListOutlined',
			  },
			  {
				path: '/spa/reviews/top-employees',
				name: 'Nhân viên được đánh giá cao',
				component: './Spa/Reviews/TopEmployees',
				icon: 'UserOutlined',
			  },
			  {
				path: '/spa/reviews/responses',
				name: 'Phản hồi đánh giá',
				component: './Spa/Reviews/Responses',
				icon: 'MessageOutlined',
			  },
			],
		  },
	  
		  // 4. Thống kê & báo cáo
		  {
			path: '/spa/statistics',
			name: 'Thống kê & báo cáo',
			icon: 'BarChartOutlined',
			routes: [
			  {
				path: '/spa/statistics/reports',
				name: 'Thống kê báo cáo',
				component: './Spa/Statics/Reports',
				icon: 'FileTextOutlined',
			  },
			],
		  },
		],
	  },
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
