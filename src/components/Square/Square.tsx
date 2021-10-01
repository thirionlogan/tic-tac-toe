import React from 'react'
import './Square.css';

interface Props {
    value: string;
    onClick: Function;
}

export default function Square({ value, onClick }: Props) {
    return (
        <button className="square" onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}> {value}</button >
    )
}
