import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className="container mx-auto max-w-5xl py-2 px-2 md:px-0 ">
    <div className="flex flex-warp justify-between">
      <ul className="fList">
        <li className="fListItem">Countries</li>
        <li className="fListItem">Regions</li>
        <li className="fListItem">Cities</li>
        <li className="fListItem">Districts</li>
        <li className="fListItem">Airports</li>
        <li className="fListItem">Hotels</li>
      </ul>
      <ul className="fList">
        <li className="fListItem">Homes </li>
        <li className="fListItem">Apartments </li>
        <li className="fListItem">Resorts </li>
        <li className="fListItem">Villas</li>
        <li className="fListItem">Hostels</li>
        <li className="fListItem">Guest houses</li>
      </ul>
      <ul className="fList ">
        <li className="fListItem">Unique places to stay </li>
        <li className="fListItem">Reviews</li>
        <li className="fListItem">Unpacked: Travel articles </li>
        <li className="fListItem">Travel communities </li>
        <li className="fListItem">Seasonal and holiday deals </li>
      </ul>
      <ul className="fList hidden md:block">
        <li className="fListItem">Car rental </li>
        <li className="fListItem">Flight Finder</li>
        <li className="fListItem">Restaurant reservations </li>
        <li className="fListItem">Travel Agents </li>
      </ul>
      <ul className="fList hidden md:block">
        <li className="fListItem">Curtomer Service</li>
        <li className="fListItem">Partner Help</li>
        <li className="fListItem">Careers</li>
        <li className="fListItem">Sustainability</li>
        <li className="fListItem">Press center</li>
        <li className="fListItem">Safety Resource Center</li>
        <li className="fListItem">Investor relations</li>
        <li className="fListItem">Terms & conditions</li>
      </ul>
    </div>
    <div className="text-center">Copyright © 2022 Lamabooking.</div>
  </div>
  )
}

export default Footer