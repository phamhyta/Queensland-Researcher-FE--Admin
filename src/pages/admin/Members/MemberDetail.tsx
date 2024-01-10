import { faker } from '@faker-js/faker';

const userMock = {
    id: faker.string.uuid(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    name: faker.internet.userName(),
    yearOfBirth: faker.date.past().getFullYear(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    expertise: faker.person.jobTitle(),
    highestDegree: "PhD",
    professionalLink: faker.internet.url()
}

const MemberDetail = () => {
	return (
		<>
			<h1 className='text-center'>Thông tin thành viên</h1>
            <div className='mt-5'>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Tên
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {userMock.name}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Email
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {userMock.email}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Năm sinh
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {userMock.yearOfBirth}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Số điện thoại
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {userMock.phoneNumber}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Địa chỉ
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {userMock.address}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Chuyên môn
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {userMock.expertise}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Bằng cấp cao nhất
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {userMock.highestDegree}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Professional Link
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        <a href={userMock.professionalLink} target='_blank'>{userMock.professionalLink}</a>
                    </div>
				</div>
            </div>
		</>
	);
};

export default MemberDetail;
