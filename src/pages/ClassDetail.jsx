import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router";
import { MainContext } from "../context/Provider";
import { BsFillCaretLeftFill } from "react-icons/bs";


const ClassDetail = () => {
  const [detail, setDetail] = useState();
  const [trainerImageUrl, setTrainerImageUrl] = useState();
  const [userIsMember, setUserIsMember] = useState(false);
  const { userId, token } = useContext(MainContext);

  const { id } = useParams();

  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

  const handleGetDetail = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/classes/${id}`);
      const { data: asset } = await axios.get(
        `/api/v1/assets/${data.trainer.assetId}`
      );
      setUserIsMember(data.users.find((item) => item.id == Number(userId)));
      setTrainerImageUrl(asset.url);
      setDetail(data);
    } catch (err) {}
  };

  useEffect(() => {
    handleGetDetail(id);
  }, []);

  const handleLeave = async () => {
    try {
      await axios.delete(`/api/v1/users/${userId}/classes/${detail.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserIsMember(false);
    } catch (err) {}
  };

  const handleSignUp = async () => {
    try {
      await axios.post(
        `/api/v1/users/${userId}/classes/${detail.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserIsMember(true);
    } catch (err) {}
  };

  return (
    <>
      {detail && (
        <div>
          <div className="relative">
          <button className="absolute flex ml-12" onClick={goBack}>
          <BsFillCaretLeftFill className=" text-pink text-sm mt-14"/>
          <p className="text-pink pl-2 text-sm mt-12">Back</p>
          </button>
            <img src={detail.asset.url} alt="" className="h-[500px]"/>
            <h2>{detail.className}</h2>
            
            {userId && (
              <button
                className="absolute right-0 bottom-10 bg-white w-32 h-14 rounded-l-lg"
                onClick={() => (userIsMember ? handleLeave() : handleSignUp())}
              >
               <p className="text-md">{userIsMember ? "Leave" : "SignUp"}</p> 
              </button>
            )}
          </div>
          <h2 className="text-md pl-6 pt-4">Schadule</h2>
          <div className="flex justify-between pb-6">
            <p className=" pl-6">{detail.classDay}</p>
            <p className="pr-6">{detail.classTime}</p>
          </div>
          <p className="pl-6">{detail.classDescription}</p>
          <h2 className="pl-6 pt-4 text-md">Trainer</h2>
          <div className="flex">
            <img src={trainerImageUrl} alt=""  className="h-[90px] w-[90px] rounded-lg ml-8"/>
            <p className="ml-4 mt-4 text-sm">{detail.trainer.trainerName}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassDetail;
