import { faker } from '@faker-js/faker';
import { getMember } from '../../../utils/api';
import { useEffect ,useState} from 'react'
import { useParams } from "react-router-dom";


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

    const [member, setMember] = useState(null)
    const routeParams = useParams();
    useEffect(() => {
        const fetch = async () => {
            const res = await getMember(routeParams.id)
            if(res.success) {
                setMember(res.data)
                console.log('test', res.data)
            }
        }
        fetch()
    }, [])
	return (
		<>
			<h1 className='text-center'>Thông tin thành viên</h1>
            {
                member && 
                 <div className='mt-5'>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Tên
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {member.name}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Email
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {member.email}
                    </div>
				</div>
                {/* <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Năm sinh
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {userMock.yearOfBirth}
                    </div>
				</div> */}
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Số điện thoại
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {member.phoneNumber}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Địa chỉ
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {member.address}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Chuyên môn
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {member.domains.join(", ")}
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Domain
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {member.domain}
                    </div>
				</div>
                {/* <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Bằng cấp cao nhất
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {member.highestDegree}
                    </div>
				</div> */}
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Professional Link
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {member.professionalLink && member.professionalLink.map(item =>
                            <a href={item} target='_blank'>{item}</a>
                        )}
                        
                    </div>
				</div>
                <div className='mb-5'>
					<div className='block mb-2 font-medium text-gray-900 dark:text-white'>
						Kinh nghiệm
					</div>
                    <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        {member.experience && member.experience.map(item =>
                            <p>{item}</p>
                        )}
                        
                    </div>
				</div>
            </div>
            }
           
		</>
	);
};

export default MemberDetail;
