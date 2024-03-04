import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { updateMember, getMember } from "../../../utils/api/index";

const SettingMember = () => {
    const [notification, setNotification] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await getMember(id);
                setNotification(response.data.noti);
            } catch (error) {
                console.error('fetchNotification -> error', error);
            }
        }
        fetchNotification();
    }
    , []);

    const handleSetting = async () => {
        setLoading(true);
        try {
            await updateMember(id, { noti: notification ? 0 : 1});
            toast.success('Notification settings updated successfully');
        } catch (error) {
            console.error('updateNotification -> error', error);
        } finally {
            setNotification(notification ? 0 : 1);
            setLoading(false);
        }
    }
    return (
        <div>
            <ToastContainer />
            <h1 className='text-center text-2xl font-bold mb-10'>Notification settings</h1>
            <div className="px-16 text-center">
                {notification ? (
                    <p>You are currently receiving notifications from avesq. If you choose to unsubscribe from notifications, you will not receive notifications when there are new news and events on avesq. </p>
                ) : (
                    <p>You are currently not receiving notifications from avesq. If you choose to receive notifications, you will be notified when there are new news and events on avesq.</p>
                )}
                <div className="mt-16 flex justify-center">
                    <button className={`${loading ? 'cursor-not-allowed' : ''}`} onClick={handleSetting}>{ loading ? 'Loading...' : notification ? 'Cancel receiving information' : 'Start receiving information'}</button>
                </div>
            </div>
        </div>
    );
}
export default SettingMember;