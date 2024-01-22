import * as React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { BiImageAdd } from 'react-icons/bi';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { HiDotsVertical } from 'react-icons/hi';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/reducer';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


import { getListImages, uploadImage } from '../../../utils/api';

export default function ImageGallery() {
	const [page, setPage] = React.useState(1);
	const [totalPage, setTotalPage] = React.useState(1);
	const [imageList, setImageList] = React.useState([]);

	const [selectedImage, setSelectedImage] = React.useState<any>();
	const [openMenu, setOpenMenu] = React.useState<boolean>(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const [files, setFiles] = React.useState([]);
    const [uploadLoading, setUploadLoading] = React.useState(false)

	const imageHeight: number = 164;
	const [_, dispatch] = useStateValue();
	const handleImageUpload = (e: any) => {
		if (!e.target.files) {
			return;
		}
		let item = e.target.files[0];
        item["img"] = URL.createObjectURL(item)
		setFiles([item]);
	};

	const thumbs = files.map((file) => (
		<div className='thumb' key={file.name}>
			<div className='inner'>
				<img
					alt='preview'
					src={file.img}
					className='thumb-img'
					// Revoke data uri after image is loaded
					onLoad={() => {
						URL.revokeObjectURL(file.img);
					}}
				/>
			</div>
		</div>
	));

	const handleDeleteImage = (fileName: string) => {
		dispatch({
			type: actionType.SET_DIALOG,
			payload: {
				title: 'Xác nhận xóa',
				text: 'Bạn có chắc chắn muốn xóa ảnh này? Dữ liệu sẽ bị xóa vĩnh viễn và không thể khôi phục',
				type: 'warning',
				handleOkClick: () => {
					setImageList(imageList.filter((f) => f.title !== fileName));
				},
				open: true,
			},
		});
		setOpenMenu(false);
	};

	const handlePageChange = (_e: any, page: number) => {
		setPage(page);
	};

	const handleCopyLink = (item: any) => {
		navigator.clipboard.writeText(item.img);
		dispatch({
			type: actionType.SET_SNACKBAR,
			payload: {
				text: 'Sao chép thành công',
				type: 'info',
				open: true,
			},
		});
		setOpenMenu(false);
	};

    const handleOnUpload = async () => {
        setUploadLoading(true)
        const res = await uploadImage(files[0])
        if(res.success) {
            const item = {
                key: imageList.length,
                img: res.data.urls[0],
                title: res.data.urls[0],
            }
            imageList.push(item)
            setImageList(imageList)
        }
        setUploadLoading(false)
        setFiles([])
    }

	React.useEffect(() => {
		const fetch = async () => {
			const res = await getListImages({ page, limit: 10 });
			if (res.success) {
				setImageList(
					res.data.image_urls.map((item, index) => {
						return {
							key: index,
							img: item,
							title: item,
						};
					}),
				);
				setTotalPage(res.data.total_pages);
			}
		};
		fetch();
	}, [page]);

	return (
		<>
			<div className='mb-4'>
				<p className='text-xl font-semibold'>Thư viện ảnh</p>
				<aside className='thumbs-container'>{thumbs}</aside>
                {uploadLoading ? <>
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                      </Box>
                </> : <div
					className={`flex p-1 px-4`}
				>
					{files.length > 0 ? (
						<>
                        <Button onClick={handleOnUpload}>
                            Tải ảnh lên
                        </Button>
                        <Button onClick={() => setFiles([])}>Xóa ảnh</Button>
                        </>
					) : (
						<Button
							component='label'
							fullWidth
							disableRipple
                            className='hover:bg-neutral-200 rounded-md text-md hover:cursor-pointer'
							startIcon={
								<BiImageAdd
									style={{
										color: '#646cff',
										fontSize: '20px',
									}}
								/>
							}
							sx={{
								margin: 0,
								padding: 0,
								height: '100%',
								'&:hover': {
									backgroundColor: 'transparent',
								},
								textTransform: 'none',
							}}
						>
							<div className='text-md text-[#646cff] font-semibold'>
								Thêm ảnh
							</div>
							<input
								type='file'
								accept='image/*'
								hidden
								onChange={handleImageUpload}
							/>
						</Button>
					)}
				</div>}
				
			</div>
			<ImageList cols={4} rowHeight={imageHeight} variant='quilted'>
				{imageList.map((item) => (
					<ImageListItem
						key={item.key}
						id={item.title}
						// cols={ item.cols || 1 }
						// rows={ item.rows || 1 }
					>
						<img
							className='rounded-md overflow-hidden object-contain hover:object-scale-down'
							src={item.img}
							alt={item.title}
							loading='lazy'
						/>
						<div className='absolute top-0 bottom-0 left-0 right-0 height-[100%] width-[100%] opacity-0 rounded-md hover:cursor-pointer transition-all hover:opacity-60 hover:bg-neutral-500 '>
							<div
								className='absolute text-white text-xl right-1 top-1 rounded-full bg-black p-1'
								onClick={(e: React.MouseEvent<HTMLElement>) => {
									setOpenMenu(true);
									setAnchorEl(e.currentTarget);
									setSelectedImage(item);
								}}
							>
								<HiDotsVertical />
							</div>
						</div>
					</ImageListItem>
				))}
			</ImageList>
			{selectedImage && (
				<Menu
					id='demo-positioned-menu'
					aria-labelledby='demo-positioned-button'
					open={openMenu}
					anchorEl={anchorEl}
					onClose={() => {
						setOpenMenu(false);
					}}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
				>
					<MenuItem
						key={`copy-${selectedImage.key}`}
						sx={{
							fontSize: '14px',
						}}
						onClick={() => {
							handleCopyLink(selectedImage);
						}}
					>
						Sao chép đường dẫn
					</MenuItem>
					<MenuItem
						key={`delete-${selectedImage.key}`}
						sx={{
							fontSize: '14px',
						}}
						onClick={() => {
							console.log(selectedImage.title);
							handleDeleteImage(selectedImage.title);
						}}
					>
						Xóa
					</MenuItem>
				</Menu>
			)}
			<Stack
				spacing={2}
				sx={{
					marginTop: '16px',
					'.MuiPagination-root': {
						display: 'flex',
						justifyContent: 'right',
					},
					'.MuiPagination-ul': {
						width: 'auto',
					},
				}}
			>
				<Pagination
					count={totalPage}
					page={page}
					onChange={handlePageChange}
					// autoFocus={ false }
				></Pagination>
			</Stack>
		</>
	);
}
