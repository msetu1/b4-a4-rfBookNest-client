import { Form, Input } from "antd";
import { Controller} from "react-hook-form";

type TInputProps={
    type:string;
    name:string;
    label?:string;
    placeholder?:string;
}
const BNInput = ({type,name,label,placeholder}:TInputProps) => {
    return (<div>
        <Controller 
        name={name} 
        render={({field})=>
        <Form.Item label={label}>
           <div className="w-full"> <Input {...field} type={type} id={name} placeholder={placeholder} size="large" /></div>
        </Form.Item>
    } />
        </div>);
};

export default BNInput;