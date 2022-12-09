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


export const headerList = [
    {
        icon:  faBed,
        text: "Stays"
    },
    {
        icon:  faPlane,
        text: "Flights"
    },
    {
        icon:  faCar,
        text: "Car rentals"
    },
    {
        icon:  faTaxi,
        text: "Airport taxis"
    },
    {
        icon:  faCalendarDays,
        text: "Attractions"
    },
]