// import type { FC } from 'react'
// import { Button } from 'antd'
// import TranslateMessage from '../components/translateManager/TranslateMessage'

// const RegisterUi: FC<any> = (props) => {
//   const loginNavigateHandler = () => {
//     props.history.push('/login')
//   }
//   const registerNavigateHandler = () => {
//     props.history.push('/register')
//   }
//   return (
//     <>
//       <div className='select-oprion-container'>
//         <h1>
//           <TranslateMessage translateKey={'app_name'} />
//         </h1>
//         <Button onClick={registerNavigateHandler}>
//           <TranslateMessage translateKey={'register'} />
//         </Button>
//         <Button onClick={loginNavigateHandler}>
//           <TranslateMessage translateKey={'login'} />
//         </Button>
//       </div>
//     </>
//   )
// }

// export default RegisterUi

import type { FC } from 'react'
import { Alert, Button, Table } from 'antd'
import TranslateMessage from '../components/translateManager/TranslateMessage'

import {
  ArrowRightOutlined,
  CheckOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'

const RegisterUi: FC<any> = (props) => {
  const loginNavigateHandler = () => {
    console.log(' loginNavigateHandler', props)
    props.history.push('/login')
  }
  const registerNavigateHandler = () => {
    props.history.push('/register')
  }
  const dataSource = [
    {
      key: '1',
      name: 'BIKE',
      age: '| MOTOR CYCLE',
    },
    {
      key: '2',
      name: '3WHEEL',
      age: '| MOTOR TRICYCLE / MOTOR TRICYCLE VAN',
    },
    {
      key: '3',
      name: 'QUADRICYCLE',
      age: '|  QUADRICYCLE',
    },
    {
      key: '4',
      name: 'CAR',
      age: '| MOTOR CAR',
    },
    {
      key: '5',
      name: 'VAN',
      age: '| DUAL PURPOSE VEHICLE',
    },
    {
      key: '6',
      name: 'BUS',
      age: '| MOTOR COACH / PRIVATE COACH / OMINI BUS',
    },
    {
      key: '7',
      name: 'LORRY',
      age: '| MOTOR LORRY / DUAL PURPOSE / LIGHT MOTOR LORRY / M/LORRY(PRIME MOVER) / AMBULANCE / HEARSE',
    },
    {
      key: '8',
      name: 'SPECIAL PURPOSE VEHICLE',
      age: '| LAND VEHICLE / SPECIAL PURPOSE VEHICLE',
    },

    {
      key: '9',
      name: 'LAND VEHICLE',
      age: '| HAND TRACTOR',
    },
  ]

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
    },
    {
      dataIndex: 'age',
      key: 'age',
    },
  ]

  return (
    <>
      <div className='select-oprion-container'>
        <h1>
          <TranslateMessage translateKey={'app_name'} />
        </h1>
        <Button onClick={registerNavigateHandler}>
          <TranslateMessage translateKey={'register'} />
        </Button>
        <Button onClick={loginNavigateHandler}>
          <TranslateMessage translateKey={'login'} />
        </Button>
      </div>

      <div className='instructions-div'>
        <h3>Things to note prior to Registration</h3>
        <ul>
          <li>
            <CheckOutlined className={'checkmark'} /> Enter the Chassis number
            precisely as per the Certificate of Registration of Motor Vehicles
            (Case Sensitive)
          </li>
          <li>
            <CheckOutlined className={'checkmark'} /> Vehicle registrations with
            “Sri –“ to only enter the vehicle number in columns{' '}
            <span className='number-ex'>
              Ex: 3 Sri -1234 <ArrowRightOutlined />{' '}
              <span className='number-span'>3</span>{' '}
              <span className='number-span'>1234</span>
            </span>
          </li>
          <li>
            <CheckOutlined className={'checkmark'} /> Vehicle category to be
            selected as per Certificate of Registration of Motor Vehicle.
            Applicable categories
            <div className='instruction-table'>
              <Table
                pagination={false}
                dataSource={dataSource}
                columns={columns}
              />
            </div>
          </li>
          <li>
            <CheckOutlined className={'checkmark'} /> Only one NIC/PP/BRN is
            allowed per vehicle and per mobile no
          </li>
          <li>
            <CheckOutlined className={'checkmark'} /> At registration
            NIC/Name/Address does not require to match Certificate of
            registration ownership details
          </li>
          <li>
            <CheckOutlined className={'checkmark'} /> Company and Government
            vehicles/bikes can be registered under BRN or NIC per vehicle only,
            Multiple vehicle registrations will be allowed shortly
          </li>
          <li>
            <CheckOutlined className={'checkmark'} /> Fuel Quota allocation will
            be based on vehicle category. Allocation will be announced by
            Ministry of Power & Energy
          </li>
          <li>
            <CheckOutlined className={'checkmark'} /> Call 1919 for any
            registration related assistance
          </li>
        </ul>
      </div>
    </>
  )
}

export default RegisterUi
