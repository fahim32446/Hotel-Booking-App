import "./Header.css";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState, useContext } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { headerList } from "./data";

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className={type !== "list"? "bg-[#003580] mb-11": 'bg-[#003580] mb-11 pb-5'}>
      <div className="container mx-auto max-w-5xl py-2 px-2 md:px-0 relative">
        <div className="flex gap-5 mt-5">
          {headerList.map((item, index) => (
            <div key={index} className="active space-x-2 text-white">
              {<FontAwesomeIcon icon={item.icon} />}
              <span>Stays</span>
            </div>
          ))}
        </div>
        {type !== "list" && (
          <div>

     
        <div className=" space-y-5 my-[60px]">
          <h1 className="text-[2rem] text-white font-semibold">
            A lifetime of discounts? It's Genius.
          </h1>

          <p className="text-[1rem] text-white">
            Get rewarded for your travels – unlock instant savings of 10% or
            more with a free Lamabooking account
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-10 bg-white p-2 rounded-lg relative md:absolute z-10 md:bottom-[-25px] left-0 right-0 border-2 border-[#febb02]">


          {/* Select Destination */}
          <div className="mobile_input_field">
            <FontAwesomeIcon icon={faBed} className="text-gray-400" />
            <input
              type="text"
              value={destination}
              placeholder="Where are you going?"
              className="border-none"
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
            />
          </div>

          {/* Select Date */}
          <div onClick={() => setOpenDate(!openDate)} className="mobile_input_field">
            <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400" />
            <span
              
              className="text-gray-400"
            >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>

          {/* Select Person */}
          <div className="mobile_input_field">
            <FontAwesomeIcon icon={faPerson} className="text-gray-400" />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="text-gray-400"
            >
              {`${options.adult} adult · ${options.children} children · ${options.room} room`}
            </span>

            {openOptions && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.adult <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "d")}
                    >-</button>

                    <span className="optionCounterNumber">{options.adult}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "i")}
                    >+</button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.children <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.room <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

     
            <button className="bg-[#0071c2] text-white px-20 py-2 rounded-md font-semibold" onClick={handleSearch}>
              Search
            </button>
     
        </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Header;
