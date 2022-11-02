import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { URL } from "../../const/url"
import { PropagateLoader } from "react-spinners";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from "react-router-dom";


const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [files, setFiles] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const { data, loading, error } = useFetch(`${URL}/hotels`);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    try {
      setUploading(true);
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dzjobnqsf/image/upload",
            data, {
            withCredentials: false,
          });
          const { url } = uploadRes.data;
          return url;
        })
      );

      setImage(list)
      const newRoom = {
        ...info,
        photos: list,
      };
      await axios.post(`${URL}/rooms/${hotelId}`, { ...newRoom, roomNumbers });
      setUploading(false);
      navigate('../../rooms')

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="left">

            {
              uploading ?
                <PropagateLoader
                  color="#36d7b7"
                  loading
                  size={15}
                /> :
                image ? image.map((url, i) =>
                  <LazyLoadImage
                    key={i}
                    className="img"
                    src={url}
                  />
                ) :
                  <LazyLoadImage
                    className="img"
                    src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                  />
            }
          </div>

          <div className="right">
            <form onSubmit={handleClick}>

              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>


              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    required={true}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}



              <div className="formInput">
                <label>Room Numbers</label>
                <textarea
                  required={true}
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>


              
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                </select>
              </div>


              <button type="submit">Send</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;