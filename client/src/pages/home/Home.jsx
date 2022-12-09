import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import './Home.css'
import PropertyList from '../../components/propertyList/propertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'


const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />

      <div className="mt-[50px] flex flex-col items-center gap-[30px]">
        <Featured />
        <h1 className='container mx-auto max-w-5xl py-2 px-2 md:px-0 text-xl font-semibold'>Browse by property type</h1>
        <PropertyList />
        <h1 className='text-xl font-semibold'>Home guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home