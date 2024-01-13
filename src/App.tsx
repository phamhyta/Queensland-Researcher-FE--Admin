import { Routes, Route } from "react-router-dom";
import {
  AdminPage,
  LoginPage,
  NotFoundPage,
  Dashboard,
  CreateNews,
  NewsList,
  NewsDetail,
  MemberList,
  MemberDetail,
  MemberPendingList,
  ImageGallery,
} from "./pages";
import { Dialog, Snackbar } from "./commons";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminPage />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/news" element={<NewsList />} />
          <Route path="/admin/news/:id" element={<NewsDetail />} />
          <Route path="/admin/news/create-news" element={<CreateNews />} />
          <Route path="/admin/members" element={<MemberPendingList />} />
          <Route path="/admin/pending-members" element={<MemberList />} />
          <Route path="/admin/members/:id" element={<MemberDetail />} />
          <Route path="/admin/image-gallery" element={<ImageGallery />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Snackbar></Snackbar>
      <Dialog></Dialog>
    </>
  );
}

export default App;
