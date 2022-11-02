import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { URL } from "../../const/url"
import { PropagateLoader } from "react-spinners";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from "react-router-dom";


const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();


  // const { data, loading, error } = useFetch(`${URL}/rooms`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleSelect = (e) => {
  //   const value = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setRooms(value);
  //   console.log(rooms);
  // };



  const handleClick = async (e) => {
    e.preventDefault();
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
      const newHotel = {
        ...info,
        photos: list,
      };
      await axios.post(`${URL}/hotels`, newHotel);
      setUploading(false);
      navigate('../hotels')

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
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

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    required={true}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}


              <div className="formInput">
                <label>Description</label>
                <textarea
                  id='desc'
                  type='text'
                  required={true}
                  onChange={handleChange}
                  placeholder="Give hotel description"
                />
              </div>

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              {/* <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                    data.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))}
                </select>
              </div> */}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;