import "./Reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from '../../const/url'

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`${URL}/hotels/room/${hotelId}`);
  const { date: dates } = useContext(SearchContext);



  // when user search a date and we put date range into a array
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);



  // Check if the room booked before on same date, then it will disabled HTML input fields
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };



  // Select the room which want to book
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };


  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${URL}/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) { }
  };


  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>

        {data.map((roomInfo) => (
          <div className="rItem" key={roomInfo._id}>
            <div className="rItemInfo">
              <div className="rTitle">{roomInfo.title}</div>
              <div className="rDesc">{roomInfo.desc}</div>
              <div className="rMax">
                Max people: <b>{roomInfo.maxPeople}</b>
              </div>
              <div className="rPrice">${roomInfo.price}</div>
            </div>
            <div className="rSelectRooms">
              {roomInfo.roomNumbers.map((roomNumber, i) => (
                <div className="room" key={i}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>


      </div>
    </div>
  )
}

export default Reserve