interface ContainerProps {
    children: React.ReactNode; // children can be any valid React node
}
const Container: React.FC<ContainerProps> = ({children}) => {
    return (
        <div className="max-w-[90%]">
            {children}
        </div>
    );
};

export default Container;