import type { FC } from 'react'
import { Modal } from 'antd'

const TermAndConditions: FC<any> = (props) => {
  return (
    <>
      <Modal
        title='Terms and Conditions'
        visible={props.visible}
        onOk={props.toggleHandler}
        onCancel={props.toggleHandler}
        cancelButtonProps={{ style: { display: 'none' } }}
        width={1000}
      >
        <p>
          By registering with the National Fuel Pass (<b> “NFP”</b>) system You
          as the User agrees to the following Terms and Conditions;
        </p>
        <ol type='I'>
          <li>
            National Identity Card/Passport/Company registration/Business
            registration information is required to register with the NFP system
            and obtain a QR OR QR ID reference ( <b>“User”</b> ).
          </li>

          <li>
            A User can include only one vehicle in the NFP system to obtain a QR
            or QR ID reference using their National Identity Card/Passport/
            Company registration/Business registration.
          </li>

          <li>
            Upon receipt of a QR or ID reference the User must present the QR or
            QR ID reference to the fuel service station and be validated to be
            eligible to obtain their services. The use of the QR or QR ID
            reference is strictly limited to the vehicle number registered with
            the NFP system.
          </li>

          <li>
            The User is solely responsible for the safe keeping of the QR or QR
            ID reference.
          </li>

          <li>
            The User shall be solely liable for any illegal, fraudulent activity
            or misuse related the QR or QR ID reference.
          </li>

          <li>
            The QR and/or QR ID reference is the exclusive property of Ministry
            of Power and Energy of Sri Lanka ( <b>“Ministry”</b> ) and the User
            is granted a limited, non-exclusive, non-sub licensable,
            non-transferable license to utilize the related services provided by
            fuel service stations.
          </li>

          <li>
            The Ministry reserves the right to recall any QR or QR ID reference
            at its sole discretion without prior notice to the User.
          </li>

          <li>
            The User agrees and acknowledges that the QR or QR ID reference is
            only a fuel quota allocation method and does not at any time
            constitute as a valid legally binding financial instrument or method
            of payment.
          </li>

          <li>
            The Ministry may request/collect certain types of data; names,
            mobile number, National Identity Card/Passport/Company
            registration/Business registration number, address, vehicle number,
            chassis number, fuel type and vehicle type (collectively referred to
            as “Data”) from the User in connection with the User’s access or use
            of the NFP system. The Data that may be requested/collected include
            those identified in the NFP system herein. User Data may be stored
            in Ministry/government servers, systems or devices, in the servers,
            systems or devices of third party service providers or
            collaborators, or on User device, and may be used by the Ministry or
            third party service providers or collaborators to facilitate User
            access or use of the NFP system. The Ministry or its third party
            service providers or collaborators may collect system configuration
            information and/or traffic information (such as an IP address)
            and/or use information or statistical information to operate,
            maintain or improve the NFP system or the underlying service of the
            third party service provider or collaborator. For the avoidance of
            doubt, a reference to a third-party service provider or collaborator
            includes other third parties who provide a service or collaborate
            with the Ministry’s third-party service provider or collaborator.
          </li>

          <li>
            In availing the services of the NFP system, the Ministry may use,
            disclose and process the Data for any one or more of the following
            purposes:
            <ol type='a'>
              <li>
                to assist, process and facilitate your access or use of the NFP
                system;
              </li>

              <li>
                to administer, process and facilitate any transactions or
                activities by User, whether with the Ministry or any other
                public sector entity or third-party service provider or
                collaborator, and whether for the benefit of User;
              </li>

              <li>
                to carry out User instructions or respond to any queries,
                feedback or complaints provided by (or purported to be provided
                by) User, or otherwise for the purposes of responding to or
                dealing with User interactions with the Ministry;
              </li>

              <li>
                to monitor and track User usage of the services related to the
                NFP system and the NFP system, to authenticate, conduct
                research, Data analytics, surveys, market studies and similar
                activities, in order to assist the Ministry in understanding
                User interests, concerns and preferences and improving the NFP
                system and the related service (including any service of a third
                party service provider or collaborator). For the avoidance of
                doubt, the Ministry may also collect, use, disclose and process
                such information to create reports and produce statistics
                regarding User transactions with the fuel service stations and
                User usage of the NFP system and other services and products
                provided by the NFP system for record-keeping and reporting or
                publication purposes (whether internally or externally);
              </li>

              <li>
                for the purposes of storing or creating backups of User Data
                (whether for contingency or business continuity purposes or
                otherwise), whether within or outside Sri Lanka;
              </li>

              <li>
                to enable the Ministry to contact the User or communicate with
                the User on any matters relating to User access or use of the
                NFP system; including but not limited to the purposes set out
                above; via email, SMS, instant messaging, push notifications or
                such other forms of communication that the Ministry may
                introduce from time to time depending on the functionality of
                the NFP system and/or User device.
              </li>
            </ol>
          </li>

          <li>
            The Ministry may be required to disclose User Data by law, including
            any law governing the use/provision of any service of a third-party
            service provider or collaborator
          </li>

          <li>
            To safeguard User personal Data, all electronic storage and
            transmission of personal Data is secured with appropriate security
            technologies.
          </li>

          <li>
            A User may withdraw his/her consent to the use and disclosure of
            User Data by the Ministry with reasonable notice and subject to any
            prevailing legal or contractual restrictions; however, doing so may
            prevent the proper functioning of the NFP system and may also result
            in the cessation of the NFP system and/or related service to User.
          </li>

          <li>
            The Ministry shall NOT share User personal Data with entities which
            are not public sector entities, except where such sharing is
            necessary for such entities to assist the Ministry in providing the
            NFP system to the User or for fulfilling any of the purposes herein.
          </li>

          <li>
            Allocation of fuel quota is at the discretion of the Ministry of
            Power and Energy of Sri Lanka and shall be changed at the sole
            discretion of the Ministry from time to time.
          </li>

          <li>
            The allocation of fuel ( <b>“quota”</b> ) will be on a weekly basis;
            from Monday to Sunday; and any unused weekly quota shall not be
            carried forward to the successive week/s.
          </li>

          <li>
            The allocation of the QR or QR ID reference is a fuel quota
            allocation method only and does not at any time constitute as a
            guarantee of fuel availability. Fuel distribution shall be solely
            based on the availability of fuel stocks.
          </li>

          <li>
            The Ministry of Power and Energy reserves the rights to review,
            amend and update and the Terms and Conditions from time to time
            without notice to User.
          </li>

          <li>
            These terms and conditions shall be governed by and construed in
            accordance with laws of Sri Lanka.
          </li>

          <li>
            Any dispute arising out of or in connection with these terms and
            conditions, including any question regarding its existence,
            validity, or termination, shall be referred to and finally resolved
            in the Courts of the Democratic Socialist Republic of Sri Lanka and
            the User hereby submit to the exclusive jurisdiction of the Courts
            of the Democratic Socialist Republic of Sri Lanka.
          </li>
        </ol>
      </Modal>
    </>
  )
}

export default TermAndConditions
