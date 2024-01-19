import * as React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { BiImageAdd } from "react-icons/bi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { HiDotsVertical } from "react-icons/hi";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";

let itemData = [
  {
    key: "1dshjfhsdjff1eeexcx",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff12",
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    key: "1dshjfhsdjff13",
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    key: "1dshjfhsdjff163",
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff31",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1sdass",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1sw3we",
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    key: "1dshjfhsdjff1s23",
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    key: "1dshjfhsdjff1s2",
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1as",
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    key: "1dshjfhsdjff177",
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    key: "1dshjfhsdjff178",
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1ssss",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1sxcsa",
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    key: "1dshjfhsdjff19999",
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    key: "1dshjfhsdjff10000",
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1112",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff11124",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff11111111",
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    key: "1dshjfhsdjff1hhh",
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    key: "1dshjfhsdjff1gfff",
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1fff555",
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    key: "1dshjfhsdjff1fff99999",
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    key: "1dshjfhsdjff1jhsdj",
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1ddd",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1dsfsd",
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    key: "1dshjfhsdjff1d",
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    key: "1dshjfhsdjff1ddy",
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1dww",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1dss",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1mkj",
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    key: "1dshjfhsdjff1mj",
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    key: "1dshjfhsdjff1nhjn",
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1ng",
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    key: "1dshjfhsdjff1htyh",
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    key: "1dshjfhsdjff1bnv",
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1cgfd",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff14356",
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    key: "1dshjfhsdjff1vdfv34",
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    key: "1dshjfhsdjff14545",
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1345tf",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1erter",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1345345",
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    key: "1dshjfhsdjff134543",
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    key: "1dshjfhsdjff1453345",
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1fgdfvdf",
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    key: "1dshjfhsdjff1vdf",
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    key: "1dshjfhsdjff134534rfc",
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff15443",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1ew5t34",
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    key: "1dshjfhsdjff145435t",
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    key: "1dshjfhsdjff1w4rt",
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1werfe",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1ewrfteew",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff145534",
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    key: "1dshjfhsdjff13454",
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    key: "1dshjfhsdjff1345545",
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    key: "1dshjfhsdjff1232222",
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    key: "1dshjfhsdjff1xzxzzx",
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    key: "1dshjfhsdjff1zxxzx",
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
];

export default function ImageGallery() {
  const [page, setPage] = React.useState(1);
  const numberOfImage = itemData.length;
  const numPerPage = 16;
  const [imageList, setImageList] = React.useState(
    itemData.slice((page - 1) * numPerPage, page * numPerPage)
  );
  const [selectedImage, setSelectedImage] = React.useState<any>();
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const imageHeight: number = 164;
  const [_, dispatch] = useStateValue();
  const handleImageUpload = (e: any) => {
    if (!e.target.files) {
      return;
    }
    let items = e.target.files;
    items = [...items].map((item: any) => ({
      ...item,
      img: URL.createObjectURL(item),
      title: item.name,
    }));
    console.log(items);
    setImageList(itemData.concat([...items]));
  };

  const handleDeleteImage = (fileName: string) => {
    dispatch({
      type: actionType.SET_DIALOG,
      payload: {
        title: "Xác nhận xóa",
        text: "Bạn có chắc chắn muốn xóa ảnh này? Dữ liệu sẽ bị xóa vĩnh viễn và không thể khôi phục",
        type: "warning",
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
  const getPageData = (page: number) => {
    setImageList(itemData.slice((page - 1) * numPerPage, page * numPerPage));
  };

  React.useEffect(() => {
    getPageData(page);
    console.log(page);
  }, [page]);

  const handleCopyLink = (item: any) => {
    navigator.clipboard.writeText(item.img);
    dispatch({
      type: actionType.SET_SNACKBAR,
      payload: {
        text: "Sao chép thành công",
        type: "info",
        open: true,
      },
    });
    setOpenMenu(false);
  };

  return (
    <>
      <div className=" mb-4 flex justify-between">
        <p className="text-xl font-semibold">Thư viện ảnh</p>
        <div
          className={`flex items-center justify-center p-1 px-4 hover:bg-neutral-200 rounded-md text-md hover:cursor-pointer`}
        >
          <Button
            component="label"
            fullWidth
            disableRipple
            startIcon={
              <BiImageAdd style={{ color: "#646cff", fontSize: "20px" }} />
            }
            sx={{
              margin: 0,
              padding: 0,
              height: "100%",
              "&:hover": {
                backgroundColor: "transparent",
              },
              textTransform: "none",
            }}
          >
            <div className="text-md text-[#646cff] font-semibold">Thêm ảnh</div>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageUpload}
            />
          </Button>
        </div>
      </div>
      <ImageList cols={4} rowHeight={imageHeight} variant="quilted">
        {imageList.map((item) => (
          <ImageListItem
            key={item.key}
            id={item.title}
            // cols={ item.cols || 1 }
            // rows={ item.rows || 1 }
          >
            <img
              className="rounded-md overflow-hidden object-contain hover:object-scale-down"
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 height-[100%] width-[100%] opacity-0 rounded-md hover:cursor-pointer transition-all hover:opacity-60 hover:bg-neutral-500 ">
              <div
                className="absolute text-white text-xl right-1 top-1 rounded-full bg-black p-1"
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
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={openMenu}
          anchorEl={anchorEl}
          onClose={() => {
            setOpenMenu(false);
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            key={`copy-${selectedImage.key}`}
            sx={{
              fontSize: "14px",
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
              fontSize: "14px",
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
          marginTop: "16px",
          ".MuiPagination-root": {
            display: "flex",
            justifyContent: "right",
          },
          ".MuiPagination-ul": {
            width: "auto",
          },
        }}
      >
        <Pagination
          count={Math.floor(numberOfImage / numPerPage)}
          page={page}
          onChange={handlePageChange}
          // autoFocus={ false }
        ></Pagination>
      </Stack>
    </>
  );
}
