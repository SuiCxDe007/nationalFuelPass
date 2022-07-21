import { Input, InputNumber } from 'antd'

export const CustomInput = ({
  field,

  title,

  form: { touched, errors },

  ...props
}: any) => {
  return <Input {...field} {...props} />
}

export const CustomNumberInput = ({
  field,

  title,

  form: { touched, errors },

  ...props
}: any) => {
  return <InputNumber {...field} {...props} />
}
