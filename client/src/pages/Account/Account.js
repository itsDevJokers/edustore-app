// Import React and useEffect
import React, { useEffect } from 'react'

// Import Custom Hooks useAddressData
import { useAddressData } from '../../app/Hooks/useAddressData'

// Import all needed components
import Dropdown from '../../components/Account/Dropdown'
import Address from '../../components/Account/Address/Address'
import Profile from '../../components/Account/Profile/Profile'
import OrderList from '../../components/Account/OrderList/OrderList'
import Navbar from '../../components/Navbar/Navbar'

const Account = () => {
  // State
  const [optionValue, setOptionValue] = React.useState('profile');
  const [showForm, setShowForm] = React.useState(false);

  // Use Address Data as props value to Component Address
  const { data, fetchAddress } = useAddressData();
  const addressData = data.data;

  // Each state changes and page account is mounted, address api will be fetched
  useEffect(() => {
    fetchAddress()
  }, [optionValue, showForm, fetchAddress])

  
  return (
    <div>
        <Navbar />
        <div className="container pl-[7.5rem] xs:pt-48 lg:pt-20">
          <p className='mb-4'>Account</p>
        </div>
        <div className="container pl-[7.5rem] my-4">
          {/* Value of dropdown will be captured into state OptionValue */}
          <Dropdown selectValue={setOptionValue}/>
        </div>
        <div className="container pl-[7.5rem] my-4">
          {/* Components will be mounted depends on option value */}
          { optionValue === 'profile' && <Profile />}
          { optionValue === 'pemesanan' && <OrderList optionValue={optionValue} />}
          { optionValue === 'alamat' && <Address addressData={addressData} setOption={setOptionValue} setShowForm={setShowForm} />}
        </div>
        
        
    </div>
  )
}

// export to app.js
export default Account