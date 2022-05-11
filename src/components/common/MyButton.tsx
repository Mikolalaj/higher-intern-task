import './MyButton.css'

type MyButtonProps = {
    text: string;
    isDisabled: boolean;
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function MyButton({ text, isDisabled, handleClick }: MyButtonProps): JSX.Element {
    return (
        <div className={`button ${isDisabled && 'disabled'}`} onClick={handleClick} >
            {text}
        </div>
    )
}

export default MyButton;