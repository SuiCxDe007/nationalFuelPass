import styled from 'styled-components'
import { Form } from 'formik'
import {
  Typography,
  Button,
  Input,
  Checkbox,
  Select,
  Image,
  Form as AntForm,
} from 'antd'
import { CommonThemeColors1 } from '../constants/Colors'
import { FontConfig } from '../constants/FontConfig'

const { Title, Paragraph } = Typography

export const FormContainer = styled(Form)`
  max-width: 576px;
  margin: auto;
  padding: 60px 100px;
  width: 100%;
  background-color: ${CommonThemeColors1.SECONDARY};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 8px 25px rgba(0, 0, 0, 0.04);
  border-radius: 15px;

  @media only screen and (max-width: 481px) {
    padding: 40px 25px !important;
    margin: 90px 20px;
  }
`

export const FormMainTitle = styled(Title)`
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: bold !important;
  font-size: 26px !important;
  line-height: 38px !important;
  text-align: center;
  color: black !important;
  padding-bottom: 10px;
  margin: 0 !important;
`

export interface FormSubTitleProps {
  alignitems?: string
}

export const FormSubTitle = styled(Paragraph)`
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #595959 !important;
  padding-bottom: ${(props: FormSubTitleProps) =>
    props?.alignitems === 'true' ? '30px' : '40px'};
  margin: 0 !important;
  font-weight: ${FontConfig.SemiBold};
`

export interface InputFieldAlignProps {
  alignItemMore?: boolean
}
export const InputFieldAlign = styled.div`
  padding-bottom: ${(props: InputFieldAlignProps) =>
    props?.alignItemMore === false ? '20px' : '30px'};
`

export const InputFieldsMain = styled.div`
  display: grid;
  grid-auto-flow: row;
`

// export const InputFieldDesign = styled(Input)`
//   background: #ffffff !important;
//   border-radius: 5px !important;
//   height: 44px !important;
//   font-family: 'Manrope';
//   font-weight: 500;
//   font-style: normal;
//   font-size: 14px;
//   border: 1px solid ${CommonThemeColors1.BORDER};
// `

export const InputFiledErrorDesign = styled.div`
  color: #ff4d4f;
`

export const InputPasswordFieldDesign = styled(Input.Password)`
  background: #ffffff !important;
  border-radius: 5px !important;
  height: 44px !important;
  font-family: 'Manrope';
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  border: 1px solid ${CommonThemeColors1.BORDER};
`

export const AuthSubControllContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  width: 100% !important;
`

export const CheckBoxStayLoggedIn = styled(Checkbox)`
  font-family: 'Manrope';
  font-style: 'normal';
  font-weight: 500;
  font-size: '14px';
  line-height: '20px';
`

export const ForgotPasswordLink = styled.a`
  text-decoration: none !important;
  border: none !important;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${CommonThemeColors1.LINK};
`

export const CustomButton = styled(Button)`
  justify-content: center;
  align-items: center;
  width: 100% !important;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  background: ${CommonThemeColors1.PRIMARY} !important;
  border-radius: 5px;
  color: ${CommonThemeColors1.PRIMARY_BUTTON_TEXT};
  height: 44px !important;
  border-color: ${CommonThemeColors1.PRIMARY};

  :hover {
    border-color: ${CommonThemeColors1.PRIMARY};
    color: ${CommonThemeColors1.PRIMARY_BUTTON_TEXT};
  }

  :focus {
    border-color: ${CommonThemeColors1.PRIMARY};
    color: ${CommonThemeColors1.PRIMARY_BUTTON_TEXT};
  }
`

export const UserInfoSignUp = styled.label`
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 12px !important;
  line-height: 16px;
  text-align: center !important;
  color: #667580;
  padding-left: 18px;

  @media only screen and (max-width: 481px) {
    padding: 40px 25px !important;
    margin: 90px 0;
  }
`

export const TermAndConditionDesign = styled.a`
  color: ${CommonThemeColors1.LINK};
`

export const AuthHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 40px;
  width: 100% !important;
  position: fixed;
`

export const DiabilityAppLogoDesign = styled(Image)`
  max-width: 105px;
  height: 46px;

  @media only screen and (max-width: 481px) {
    &.ant-image-img {
      width: auto !important;
      min-width: 0 !important;
      display: table !important;
    }
  }
`

// ----------------------

export const MainFormContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: calc(100vh - 100px);
  background-color: ${CommonThemeColors1.BACKGROUND};
`

export const MainContainer = styled.div`
  max-width: 576px;
  margin: auto;
  padding: 60px 100px;
  width: 100%;
  background-color: ${CommonThemeColors1.SECONDARY};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 8px 25px rgba(0, 0, 0, 0.04);
  border-radius: 15px;

  @media only screen and (max-width: 481px) {
    padding: 40px 25px !important;
    margin: 90px 20px;
  }
`

export const LogoContainer = styled.div`
  text-align: center;
  padding-bottom: 20px;
`

export const AppLogo = styled.img`
  max-width: 150px;
  height: auto;
`

export const QRCodeImg = styled.img`
  max-width: 350px;
  height: auto;
`

export const InputFieldDesign = styled(Input)`
  background: #ffffff !important;
  border-radius: 5px !important;
  height: 44px !important;
  font-family: 'Manrope';
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  border: 1px solid ${CommonThemeColors1.BORDER};
`

export const RquiredMark = styled.span`
  color: red;
  font-weight: bold;
`
export const FieldLabel = styled.label`
  font-weight: bold;
`

export const UserDropDown = styled(Select)`
  .ant-select-selector {
    width: 320px;
    height: 44px !important;

    background: ${CommonThemeColors1.SECONDARY};
    border: 1px solid ${CommonThemeColors1.BORDER_ASH};
    box-sizing: border-box;
    border-radius: 5px;
    margin-top: 10px;
  }
`
export const AuthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 135px;
  width: 100% !important;
  position: fixed;

  @media only screen and (max-width: 481px) {
    flex-direction: row;
    gap: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: unset !important;
  }
`

export const LanguageSelectDesign = styled(Select)`
  background-color:none !important;
  color:#667580;
  
   
  [class*="ant-select-arrow"]{
  margin-top:-11px !important;
  }

@media only screen and (max-width: 481px) {
  [class*="ant-select-arrow"]{
    margin-top:-5px !important;
  }
`

export const FieldValidationError = styled.div`
  color: #ff4d4f;
`

export const AuthButton = styled(Button)`
  position: relative !important;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  font-family: Manrope;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  background: ${CommonThemeColors1.PRIMARY} !important;
  border-radius: 7px;
  color: ${CommonThemeColors1.PRIMARY_BUTTON_TEXT} !important;
  height: 48px !important;
  border-color: ${CommonThemeColors1.PRIMARY};

  :hover {
    border-color: ${CommonThemeColors1.PRIMARY};
  }
`
export const Label = styled.div`
  // font-size: 12px;
  // position: absolute;
  // pointer-events: none;
  // left: 12px;
  // top: 12px;
  // transition: 0.2s ease all;
  // color: #5C6A73;
  // font-weight: 500;
  // font-size: 14px;

  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 12px;
  top: 11px;
  transition: 0.2s ease all;
  font-size: 14px;
  font-weight: 500;
`

export const FloatInput = styled.div`
  position: relative;
  margin-bottom: 16px;
`

export const LabelFloat = styled.div`
  // position: absolute;
  // pointer-events: none;
  // left: 12px;
  // transition: 0.2s ease all;
  // top: -2px;
  // font-size: 10px;
  // color: #5C6A73;
  // font-weight: 500;
  // font-size: 14px;

  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 12px;
  top: 11px;
  transition: 0.2s ease all;
  top: -8px;
  font-size: 12px !important;
  background: white;
  padding: 0 4px;
  margin-left: -4px;
  font-size: 14px;
  font-weight: 500;
`

export const ValidateField = styled(AntForm.Item)`
  // margin-bottom: 10px;
  div {
    margin-bottom: 0px;
  }
`
