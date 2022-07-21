import { Radio } from 'antd'

const RadioGroup = Radio.Group

export const CustomRadioGroup = ({
  field,

  title,

  form: { touched, errors },

  ...props
}: any) => {
  return <RadioGroup {...field} {...props} />
}
