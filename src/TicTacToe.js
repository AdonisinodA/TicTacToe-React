import React, { useState, useEffect } from 'react'

function TicTacToe() {


    const emptyBoard = Array(9).fill('');

    const [currentPlayer, setcurrentPlayer] = useState('O')

    const [board, setboard] = useState(emptyBoard);
    const [winner, setWinner] = useState(null);

    const handleCellClick = (index) => {
        if (winner) return null;
        if (board[index] !== '') return null;



        setboard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item))
        setcurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }






    const checkWinner = () => {
        const possivelWaysToWin = [
            [board[0], board[1], board[2]],
            [board[3], board[4], board[5]],
            [board[6], board[7], board[8]],
            [board[0], board[3], board[6]],
            [board[1], board[4], board[7]],
            [board[2], board[5], board[8]],
            [board[0], board[4], board[8]],
            [board[2], board[4], board[6]]
        ];

        possivelWaysToWin.forEach(cell => {
            if (cell.every(cell => cell === 'O')) setWinner('O');
            if (cell.every(cell => cell === 'X')) setWinner('X');
        });

        checkDraw();


    }

    const checkDraw = () => {
        if (board.every(item => item !== ''))
            setWinner('E');
    }




    useEffect(checkWinner, [board]);

    const resetGame = () => {
        setcurrentPlayer('O');
        setboard(emptyBoard);
        setWinner(null);
    }



    return (
        <main>
            <h1 className='title'>Jogo da Velha</h1>

            <div className={`board ${winner ? 'game-over' : ''}`}>
                {board.map((item, index) => (

                    <div onClick={() => handleCellClick(index)} className={`cell ${item}`} key={index}>
                        {item}
                    </div>

                ))}



            </div>
            {winner &&
                <footer>
                    {winner === 'E' ?
                        <h2 className='winner-message'>
                            <span className={winner}> Empatou !!!</span>

                            <button onClick={resetGame}>Reinciar Game !!!</button>

                        </h2>
                        :

                        <h2 className='winner-message'>
                            <span className={winner}> {winner}</span> Venceu!
                        
                            <button onClick={resetGame}>Reinciar Game !!!</button>
                        </h2>


                    }
                </footer>
            }


        </main>

    )
}
export default TicTacToe