import type { FC } from 'react'
import QRCode from 'qrcode.react'

const QRCodeGenerator: FC<any> = (props) => {
  const itemID = props?.qrData?.itemNo
  // const itemType = ''
  // const fuelType = ''
  const qrID = props?.qrData?.qrCodeNo
  return (
    <div className='App'>
      <div
        id='qr-code'
        style={{
          textAlign: 'center',
          padding: 12,
        }}
      >
        <p>{`${itemID}`}</p>
        <QRCode
          id='qr-gen'
          value={`${itemID} | ${qrID}`}
          size={200}
          level={'L'}
          includeMargin={false}
        />
        <p>{`Code : ${qrID}`}</p>
        {/* <p>{`${itemID}`}</p> */}
      </div>
    </div>
  )
}

export default QRCodeGenerator
