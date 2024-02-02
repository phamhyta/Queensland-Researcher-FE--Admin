import { Link, useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa6";
import { useAuth } from '../../utils/hook';
import { useEffect, useState } from "react";
import { getListRegistration } from "../../utils/api";

interface ISideBarSubItem {

	id: string; text: string; link: string,
	onRender?: (item: { id: string; text: string; link: string }) => JSX.Element

}
interface ISideBarItem {
	id?: string;
	icon: JSX.Element;
	text: string;
	link?: string;
	style?: string;
	subItems?: ISideBarSubItem[];
	onRender?: (item: ISideBarItem) => JSX.Element
}

const Sidebar = () => {
	const { currentUser} = useAuth();
	const sideBarItemList: ISideBarItem[] = [
		// {
		// 	id: "dashboard",
		// 	icon: (
		// 		<svg
		// 			className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
		// 			aria-hidden="true"
		// 			xmlns="http://www.w3.org/2000/svg"
		// 			fill="currentColor"
		// 			viewBox="0 0 22 21"
		// 		>
		// 			<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
		// 			<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
		// 		</svg>
		// 	),
		// 	text: "Dashboard",
		// 	link: "/admin/dashboard",
		// },
		{
			id: "news",
			icon: (
				<svg
					className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 16 20"
				>
					<path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
				</svg>
			),
			text: "News",
			subItems: [
				{
					id: "NewsList",
					link: "/admin/news",
					text: "List news",
				},
				{
					id: "CreateNews",
					link: "/admin/news/create-news",
					text: "Create new news",
				},
			],
		},
		{
			id: "events",
			icon: (
				<svg
					className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 17 20"
				>
					<path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
				</svg>
			),
			text: "Events",
			subItems: [
				{
					id: "EventList",
					link: "/admin/events",
					text: "List events",
				},
				{
					id: "CreateEvent",
					link: "/admin/events/create-events",
					text: "Create new events",
				},
			],
		},
		{
			id: "members",
			icon: (
				<svg
					className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 18"
				>
					<path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
				</svg>
			),
			text: "Members",
			subItems: [
				{
					id: "MemberList",
					link: "/admin/members",
					text: "List Members",
				},
				{
					id: "ConfirmMember",
					link: "/admin/pending-members",
					text: "Member approval",
				},
				{
					id: "CreateMember",
					link: "/admin/members/create-member",
					text: "Create Member",
				},
			],
		},
		{
			id: "image-gallery",
			text: "Photo Library",
			icon: <FaImage className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />,
			link: "/admin/image-gallery"
		},
		{
			id: "logout",
			icon: (
				<svg
					className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 18 16"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
					/>
				</svg>
			),
			text: "Logout",
			link: "#",
		},
	];

	const sideBarMember: ISideBarItem[] = [
		{
			id: "Member Infomation",
			icon: (
				<svg
					className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 18"
				>
					<path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
				</svg>
			),
			text: "Members",
			link: `/admin/members/${currentUser?.user_id}`,
		},
		{
			id: "logout",
			icon: (
				<svg
					className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 18 16"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
					/>
				</svg>
			),
			text: "Logout",
			link: "#",
		},
	];

	return (
		<>
			<aside
				id="sidebar-multi-level-sidebar"
				className="fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
					<a href="#" className="flex items-center ps-2.5 mb-5">
						<img
							src="https://vasea.org.au/wp-content/uploads/2023/07/z4514410384541_dfbb72ef99454483fbfb6f19314dce7f.jpg"
							className="h-6 me-3 sm:h-7"
							alt="VASEA Logo"
						/>
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							AVESQ Admin
						</span>
					</a>
					<ul className="space-y-2 font-medium">
						{
							currentUser?.role === 'admin' ? <>
								{sideBarItemList.map((item) => (
									<SidebarItem item={item} key={item.id}></SidebarItem>
								))}
							</> : <>
								{sideBarMember.map((item) => (
									<SidebarItem item={item} key={item.id}></SidebarItem>
								))}
							</>
						}
					</ul>
				</div>
			</aside>
		</>
	);
};

const SidebarItem = ({ item }: { item: ISideBarItem }) => {
	const { onLogout } = useAuth()
	const handleOnClick = (id) => {
		if (id == "logout")
			onLogout()
	};
	const [numOfPendingMembers, setNumOfPendingMembers] = useState(0);
	const navigate = useNavigate()
	const hasSubItems = item.subItems && item.subItems.length > 0
	const targetProps = hasSubItems ? {
		"aria-controls": item.id,
		"data-target": item.id,
		"data-collapse-toggle": item.id
	} : {}

	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await getListRegistration();
				if (res.success) {
					setNumOfPendingMembers(res.data.length);
				} else {
					console.log(res.msg);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetch();
	}, [item.id]);
	return <li>
		<button
			type="button"
			key={`sidebar-item-${item.id}`}
			onClick={() => handleOnClick(item.id)}
			className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
			{...targetProps}
		>
			{item.icon}
			<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"
				onClick={item.link ? () => {
					item.link && navigate(item.link)
				} : undefined}>
				{item.text}

			</span>

			{hasSubItems && (
				<svg
					className="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			)}
		</button>
		{hasSubItems && (
			<ul id={item.id} className="hidden py-2 space-y-2">
				{item.subItems?.map((subItem) => (
					<Link
						key={subItem.id}
						id={subItem.id}
						className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						to={subItem.link}
					>
						{subItem.text}
						{subItem.text === "Member approval" && <span className='inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300'>
							{numOfPendingMembers}
						</span>}
					</Link>
				))}
			</ul>
		)}
	</li>
}

export default Sidebar;
