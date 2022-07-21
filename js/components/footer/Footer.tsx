import React from 'react'

import Icta from '../../assets/images/icta.png'
import Touch from '../../assets/images/ceypetco.png'
import IOC from '../../assets/images/ioc.png'

const Footer = () => {
  return (
    <>
      <div className='main-footer-container'>
        <div className='footer-content'>
          {/* <h4>Powered By</h4> */}
          <img src={Icta} alt='' />
          <img src={Touch} alt='' />
          <img src={IOC} alt='' />
        </div>
      </div>
    </>
  )
}

export default Footer
