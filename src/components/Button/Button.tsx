interface IButton{
    text: string;
    event: React.MouseEventHandler<HTMLButtonElement>;
}
export default function Button(props: IButton) {
    return <button type="button" onClick= {props.event}>{props.text}</button>
}