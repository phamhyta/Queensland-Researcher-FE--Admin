import { uploadImage, createMember } from '../../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import { defaultURLImage } from '../../../utils/constant';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { useState } from 'react';
import { defaultPassWord } from '../../../utils/constant';

const MemberCreate = () => {
	const defaultData = {
		email: '',
		name: '',
		address: '',
		phoneNumber: '',
		professionalLink: '',
		image: defaultURLImage,
		organization: '',
		subPosition: '',
		bio: '',
		researchInterest: '',
		experience: '',
		position: '',
		password: defaultPassWord,
	}
	const [formData, setFormData] = useState(defaultData);
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// for (const key in formData)
			// if (formData[key] === '') {
			// 	toast.error('Please fill all the required fields!');
			// 	return;
			// }
		const regexEmail = /\S+@\S+\.\S+/;
		if (!regexEmail.test(formData.email)) {
			toast.error('Email is invalid!');
			return;
		}
		try {
			setLoading(true);
			console.log(formData);
			
			const res = await createMember(formData);
			if (res.success) {
				setLoading(false);
				toast.success('Create successfully!');
			} else {
				setLoading(false);
				toast.error(res.message);
			}
		} catch (error) {
			setLoading(false);
			toast.error(error.message);
		}
	};

	const handleChangeURL = async (e) => {
		const { files } = e.target;
		const file = files[0];
		try {
			setUploading(true);
			const res = await uploadImage(file);
			if (res.success) {
				setFormData((prevData) => ({ ...prevData, image: res.data.data[0].url }));
			} else {
				toast.error(res.message);
			}
			setUploading(false);
		} catch (error) {
			setUploading(false);
			toast.error(error.message);
		}
	}

	const handleChangeInput = (e, index) => {
		const { name, value } = e.target;
		const professionalLink = formData[name].split("\\n");
		professionalLink[index] = value;
		setFormData((prevData) => ({ ...prevData, [name]: professionalLink.join("\\n") }));
	}

	const handleChangeAddInput = (e, name) => {
		e.preventDefault();
		const professionalLink = formData[name].split("\\n");
		professionalLink.push('');
		setFormData((prevData) => ({ ...prevData, [name]: professionalLink.join("\\n") }));
	}

	const handleDeleteInput = (name, index) => {
		const professionalLink = formData[name].split("\\n");
		professionalLink.splice(index, 1);
		setFormData((prevData) => ({ ...prevData, [name]: professionalLink.join("\\n") }));
	}

	return (
		<>
			<ToastContainer />
			<h1 className='text-center'>Create member</h1>
			<div className='mx-auto max-w-screen-md p-7 md:p-0'>
				<div className='mt-10'>
					<form action=''>
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
									onChange={handleChange}
									id='email'
									required
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
									onChange={handleChange}
									id='name'
									required
									className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
								/>
							</div>
						</div>
						<div className='md:grid grid-cols-2 gap-x-6 mt-6'>
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
									onChange={handleChange}
									required
									className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
								/>
							</div>
						</div>
						<div className='mt-6'>
							<label
								htmlFor='subPosition'
								className='block text-sm font-medium leading-6 text-darkGray'
							>
								Job Title
								<span className='text-red-500 pl-1'>*</span>
							</label>
							<input
								type='text'
								name='subPosition'
								id='subPosition'
								value={formData.subPosition}
								onChange={handleChange}
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
								onChange={handleChange}
								required
								className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
							/>
						</div>
						<div className='flex mt-6'>
							<div className='w-1/2 items-center text-[#646cff] font-bold cursor-pointer'>
								<label
									htmlFor='defaultURLImage'
									className='block text-sm font-medium leading-6 text-darkGray'
								>
									Photo
									<span className='text-red-500 pl-1'>*</span>
								</label>
								<button className='flex justify-center items-center w-full h-full' type='button'>
									<label htmlFor='defaultURLImage' className='cursor-pointer flex'>
										<AddPhotoAlternateIcon className='w-6 h-6 mr-2' />
										<div className='text-md text-[#646cff] font-semibold'>
											{uploading ? 'Uploading image...' : 'Upload image'}
										</div>
									</label>
									<input id='defaultURLImage' name='defaultURLImage' type='file' accept='image/*' hidden onChange={handleChangeURL} />
								</button>
							</div>
							<div className='flex w-1/2 justify-center items-center'><img src={formData.image} alt="" className='h-48 w-48 object-cover rounded-full' /></div>
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
								onChange={handleChange}
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
								onChange={handleChange}
								required
								className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
							/>
						</div>
						<div className='mt-6 rounded-mdshadow-sm ring-2 ring-inset ring-gray-300 p-5'>
							<label
								htmlFor='position'
								className='block text-sm font-medium leading-6 text-darkGray mb-4'
							>
								Highest Degree or Academic Rank
								<span className='text-red-500 pl-1'>*</span>
							</label>
							<div className='choice_degree'>
								<label className='block mb-4'>
									<input
										type='radio'
										name='position'
										className='mr-2'
										value='PhD Candidate'
										checked={formData.position === 'PhD Candidate'}
										onChange={handleChange}
									/>
									PhD Candidate
								</label>
								<label className='block mb-4'>
									<input
										type='radio'
										name='academicRank'
										className='mr-2'
										value='Doctor'
                                        checked={formData.position === 'Doctor'}
										onChange={handleChange}
									/>
									Doctor
								</label>
								<label className='block mb-4'>
									<input
										type='radio'
										name='position'
										className='mr-2'
										value='Adjunct Associate Professor'
										checked={formData.position === 'Adjunct Associate Professor'}
										onChange={handleChange}
									/>
									Adjunct Associate Professor
								</label>
								<label className='block mb-4'>
									<input
										type='radio'
										name='position'
										className='mr-2'
										value='Associate Professor'
										checked={formData.position === 'Associate Professor'}
										onChange={handleChange}
									/>
									Associate Professor
								</label>
								<label className='block'>
									<input
										type='radio'
										name='position'
										className='mr-2'
										value='Professor'
										checked={formData.position === 'Professor'}
										onChange={handleChange}
									/>
									Professor
								</label>
							</div>
						</div>
						<div className='mt-6'>
							<label
								htmlFor='professionalLink'
								className='block text-sm font-medium leading-6 text-darkGray'
							>
								Your professional link (if any)
							</label>
							{formData.professionalLink.split("\\n").map((link, index) => (
								<div className='flex' key={index}>
									<input
										type='text'
										name='professionalLink'
										id='professionalLink'
										value={link}
										onChange={(e) => { handleChangeInput(e, index) }}
										className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6 mb-4'
									/>
									<div className='mb-4 flex justify-center items-center cursor-pointer'>
										<HighlightOffSharpIcon className=' text-red-500 ml-2' onClick={() => handleDeleteInput('professionalLink', index)} />
									</div>
								</div>
							))}
							<button className='bg-[#1B52BE] p-2 text-white rounded' onClick={(e) => { handleChangeAddInput(e, 'professionalLink') }}>Add professional link</button>
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
								onChange={handleChange}
								cols={30}
								rows={3}
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
							{formData.experience.split("\\n").map((link, index) => (
								<div className='flex' key={index}>
									<input
										type='text'
										name='experience'
										id='experience'
										value={link}
										onChange={(e) => { handleChangeInput(e, index) }}
										className='mb-4 block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
									/>
									<div className='mb-4 flex justify-center items-center cursor-pointer'>
										<HighlightOffSharpIcon className=' text-red-500 ml-2' onClick={() => handleDeleteInput('experience', index)} />
									</div>
								</div>
							))}
							<button className='bg-[#1B52BE] mt-2 p-2 text-white rounded' onClick={(e) => { handleChangeAddInput(e, 'experience') }}>Add experience</button>
						</div>
					</form>
					<div className='mt-6 justify-between flex mb-10'>
						<button
							style={{
								boxShadow:
									'0px 16px 40px 0px rgba(237, 169, 44, 0.25);',
							}}
							className={`text-sm font-semibold py-3 px-16 rounded-full bg-yellow-500 text-white hover:text-yellow-100 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
							onClick={(e) => handleSubmit(e)}
							type='button'
						>
							{loading ? 'LOADING...' : 'SUBMIT'}
						</button>
						<button
							className={`text-sm font-semibold py-3 px-16 bg-white rounded-full border border-[#1B52BE] text-[#1B52BE] hover:bg-[#1B52BE] hover:text-white ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
							onClick={() => setFormData(defaultData)}
						>
							CLEAR
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MemberCreate;
