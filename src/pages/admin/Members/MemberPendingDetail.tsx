import { getRegistration, acceptMember } from '../../../utils/api';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { defaultURLImage } from '../../../utils/constant';

const MemberPendingDetail = () => {
	const defaultData = {
		email: '',
		name: '',
		dateOfBirth: '',
		tier: '',
		status: 0,
		academicRank: '',
		address: '',
		phoneNumber: '',
		expertise: '',
		professionalLink: '',
		state: '',
		institute: '',
		experienceYears: 0,
		avatarURL: defaultURLImage,
		organization: '',
		jobTitle: '',
		bio: '',
		researchInterest: '',
		experience: '',
	}
	const [formData, setFormData] = useState(defaultData);
	const navigate = useNavigate();
	const routeParams = useParams();
	useEffect(() => {
		const fetch = async () => {
			const res = await getRegistration(routeParams.id)
			if (res.success) {
				setFormData(res.data)
			}
		}
		fetch()
	}, [routeParams.id])

	const handleAccept = async() => {
		try {
			const res = await acceptMember(routeParams.id);
			if (res.success) {
				toast.success('Accept success');
				navigate('/admin/pending-members')
			} else {
				toast.error('Accept failed');
			}
		} catch (error) {
			toast.error('Accept failed');
		}
	}
	return (
		<>
			<ToastContainer />
			<h1 className='text-center'>Member Information</h1>
			<div className='mx-auto max-w-screen-md p-7 md:p-0'>
				<div className='mt-10'>
					<div className='md:grid grid-cols-2 gap-x-6'>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium leading-6 text-darkGray'
							>
								Your Email
								<span className='text-red-500 pl-1'>*</span>
							</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								id='email'
								disabled
								className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
							/>
						</div>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium leading-6 text-darkGray'
							>
								Your Name
								<span className='text-red-500 pl-1'>*</span>
							</label>
							<input
								type='name'
								name='name'
								value={formData.name}
								disabled
								id='name'
								required
								className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
							/>
						</div>
					</div>
					<div className='md:grid grid-cols-2 gap-x-6 mt-6'>
						<div>
							<label
								htmlFor='dateOfBirth'
								className='block text-sm font-medium leading-6 text-darkGray'
							>
								Date of Birth
								<span className='text-red-500 pl-1'>*</span>
							</label>
							<input
								type='date'
								name='dateOfBirth'
								value={formData.dateOfBirth}
								disabled
								id='dateOfBirth'
								required
								className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
							/>
						</div>
						<div>
							<label
								htmlFor='phoneNumber'
								className='block text-sm font-medium leading-6 text-darkGray'
							>
								Phone number
								<span className='text-red-500 pl-1'>*</span>
							</label>
							<input
								type='phone'
								name='phoneNumber'
								id='phoneNumber'
								value={formData.phoneNumber}
								disabled
								required
								className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
							/>
						</div>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='experienceYears'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							Experience Years
							<span className='text-red-500 pl-1'>*</span>
						</label>
						<input
							type='number'
							min={0}
							name='experienceYears'
							id='experienceYears'
							value={formData.experienceYears}
							disabled
							required
							className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
						/>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='jobTitle'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							Job Title
							<span className='text-red-500 pl-1'>*</span>
						</label>
						<input
							type='text'
							name='jobTitle'
							id='jobTitle'
							value={formData.jobTitle}
							disabled
							required
							className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
						/>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='researchInterest'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							Research Interest
							<span className='text-red-500 pl-1'>*</span>
						</label>
						<input
							type='text'
							name='researchInterest'
							id='researchInterest'
							value={formData.researchInterest}
							disabled
							required
							className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
						/>
					</div>
					<div className='flex mt-6'>
						<div className='flex w-1/2 justify-center items-center'><img src={formData.avatarURL ? formData.avatarURL : defaultURLImage} alt="" className='h-48 w-48 object-cover rounded-full' /></div>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='address'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							Address
							<span className='text-red-500 pl-1'>*</span>
						</label>
						<input
							type='text'
							name='address'
							id='address'
							value={formData.address}
							disabled
							required
							className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
						/>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='state'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							State where I am residing now
						</label>
						<input
							type='text'
							name='state'
							value={formData.state}
							disabled
							id='state'
							className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
						/>
					</div>
					<div className='mt-6 rounded-mdshadow-sm ring-2 ring-inset ring-gray-300 p-5'>
						<label
							htmlFor='academicRank'
							className='block text-sm font-medium leading-6 text-darkGray mb-4'
						>
							Highest Degree or Academic Rank
							<span className='text-red-500 pl-1'>*</span>
						</label>
						<div className='choice_degree'>
							<label className='block mb-4'>
								<input
									type='radio'
									name='academicRank'
									className='mr-2'
									value='PhD Candidate'
									checked={formData.academicRank === 'PhD Candidate'}
								/>
								PhD Candidate
							</label>
							<label className='block mb-4'>
								<input
									type='radio'
									name='academicRank'
									className='mr-2'
									value='Doctor'
									checked={formData.academicRank === 'Doctor'}
								/>
								Doctor
							</label>
							<label className='block mb-4'>
								<input
									type='radio'
									name='academicRank'
									className='mr-2'
									value='Adjunct Associate Professor'
									checked={formData.academicRank === 'Adjunct Associate Professor'}
								/>
								Adjunct Associate Professor
							</label>
							<label className='block mb-4'>
								<input
									type='radio'
									name='academicRank'
									className='mr-2'
									value='Associate Professor'
									checked={formData.academicRank === 'Associate Professor'}
								/>
								Associate Professor
							</label>
							<label className='block'>
								<input
									type='radio'
									name='academicRank'
									className='mr-2'
									value='Professor'
									checked={formData.academicRank === 'Professor'}
								/>
								Professor
							</label>
						</div>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='institute'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							Institute that I have studied for the highest
							degree
							<span className='text-red-500 pl-1'>*</span>
						</label>
						<input
							type='text'
							name='institute'
							id='institute'
							value={formData.institute}
							disabled
							required
							className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
						/>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='expertise'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							My Expertise (e.g. Robotics, Biomedicines,
							Business ...)
							<span className='text-red-500 pl-1'>*</span>
						</label>
						<input
							type='text'
							name='expertise'
							id='expertise'
							value={formData.expertise}
							disabled
							required
							className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
						/>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='organization'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							Organization
							<span className='text-red-500 pl-1'>*</span>
						</label>
						<input
							type='text'
							name='organization'
							id='organization'
							value={formData.organization}
							disabled
							required
							className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
						/>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='professionalLink'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							Your professional link (if any)
						</label>
						{formData.professionalLink?.split("\\n").map((link, index) => (
							<div className='flex' key={index}>
								<input
									type='text'
									name='professionalLink'
									id='professionalLink'
									value={link}
									disabled
									className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6 mb-4'
								/>
							</div>
						))}
					</div>
					<div className='mt-6'>
						<label
							htmlFor='bio'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							Bio
						</label>
						<textarea
							name='bio'
							id='bio'
							value={formData.bio}
							disabled
							cols='30'
							rows='3'
							className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
						></textarea>
					</div>
					<div className='mt-6'>
						<label
							htmlFor='experience'
							className='block text-sm font-medium leading-6 text-darkGray'
						>
							Your experience
						</label>
						{formData.experience?.split("\\n").map((link, index) => (
							<div className='flex' key={index}>
								<input
									type='text'
									name='experience'
									id='experience'
									value={link}
									disabled
									className='mb-4 block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
								/>
							</div>
						))}
					</div>
					<div className='mt-6 rounded-md shadow-sm ring-2 ring-inset ring-gray-300 p-5'>
						<label
							htmlFor='tier'
							className='block text-sm font-medium leading-6 text-darkGray mb-4'
						>
							Which tier of membership you wish to join?
							Please refer to AVESQ website for legibility.
							<span className='text-red-500 pl-1'>*</span>
						</label>
						<div className='choice_degree'>
							<label className='block mb-4'>
								<input
									type='radio'
									name='tier'
									className='mr-2'
									value='phd'
									checked={formData.tier === 'phd'}
									disabled
								/>
								Professional Member
							</label>
							<label className='block mb-4'>
								<input
									type='radio'
									name='tier'
									className='mr-2'
									value='master'
									checked={formData.tier === 'master'}
									disabled
								/>
								Associate Member
							</label>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className='rounded py-2 px-4 cursor-pointer bg-blue-600 hover:bg-blue-400 w-min mx-auto mt-4' onClick={handleAccept}>Accept</div>
			</div>
		</>
	);
};

export default MemberPendingDetail;