import React from 'react'
import Square from '../Square/Square'

const style = {
    display: "grid",
    gridTemplate: "repeat(9, 1fr) / repeat(9, 1fr)",
};

interface Props {
    squares: string[];
    onClick: (index: number) => void;
}

export default function Board({ squares, onClick }: Props) {

    return (
        <div style={style}>
            {squares.map((value, i) => (
                <Square key={i} value={value} onClick={() => onClick(i)} />
            ))}
        </div>
    )
}
