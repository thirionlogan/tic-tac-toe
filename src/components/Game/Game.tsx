import React, { useState, useEffect } from 'react'
import Board from '../Board/Board'


const getRow = (i: number) => Math.floor(i / 9)

const getColumn = (i: number) => i % 9

const getSector = (i: number) => Math.floor(i / 3) % 3 + Math.floor(i / 27) + Math.floor(i / 27) + Math.floor(Math.floor(i / 9) / 3)

const getValidMoves = (rows: Map<number, number[]>, columns: Map<number, number[]>, sectors: Map<number, number[]>, row: number, column: number, sector: number): number[] => {
    let validMoves = []
    for (let i = 1; i <= 9; i++) {
        const conflicts = [...(rows.get(row) || []), ...(columns.get(column) || []), ...(sectors.get(sector) || [])]
        if (!conflicts.includes(i)) validMoves.push(i)
    }
    return validMoves
}

const initializeBoard = (): string[] => {
    let board = Array<string>(81).fill("")
    const rows = new Map<number, number[]>();
    const columns = new Map<number, number[]>();
    const sectors = new Map<number, number[]>();
    do {
        for (let index = 0; index < board.length; index++) {
            const row = getRow(index)
            const column = getColumn(index)
            const sector = getSector(index)
            const validMoves = getValidMoves(rows, columns, sectors, row, column, sector)
            const rand = Math.floor(Math.random() * validMoves.length)
            const solution = validMoves[rand];

            rows.set(row, [...(rows.get(row) || []), solution])
            columns.set(column, [...(columns.get(column) || []), solution])
            sectors.set(sector, [...(sectors.get(sector) || []), solution])
            board[index] = solution?.toString() || ''
        }
        if (board.includes('')) board.fill("")
    } while (board.includes(''));

    for (let index = 0; index < board.length - 20; index++) {
        board[index];
    }

    return board
}

export default function Game() {
    const [squares, setSquares] = useState<string[]>(initializeBoard())
    const [selectedNumber, setSelectedNumber] = useState(0)

    const setSquare = (index: number, value: string) => {
        const newSquares = [...squares];
        newSquares[index] = value;
        setSquares(newSquares)
        // deez nuts
    }


    const handleClick = (index: number) => {
        setSquare(index, selectedNumber.toString())
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!isNaN(+event.key)) setSelectedNumber(+event.key)
    }

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div>
            <p>Selected Number: {selectedNumber}</p>
            <Board squares={squares} onClick={handleClick} />
        </div>
    )
}