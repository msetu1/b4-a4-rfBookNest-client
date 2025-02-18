interface CommonTitleProps {
    title: string; // title should be a string
}
const CommonTitle: React.FC<CommonTitleProps>  = ({title}) => {
    return (
        <div className='mb-12'>
            <h2 className="text-3xl font-bold  mb-2 max-w-[250px]">{title}</h2>
            <img src='https://i.ibb.co.com/ZRCHTwMK/Rectangle-68.png' alt="" />
        </div>
    );
};

export default CommonTitle;