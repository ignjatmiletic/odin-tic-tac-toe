
function GameBoard()
{
    const rows = 3;
    const columns = 3;
    const board = []

    for(let i = 0; i < rows; i++)
    {
        board[i] = []
        for(let j = 0; j < columns; j++)
        {
            board[i].push(Cell())
        }
    }


    const getBoard = () => board


    const placeSign = (column, row, player) => 
    {
        if (board[row][column].getValue() !== 0)
            return;

       board[row][column].addToken(player);
    }
    return{
        placeSign,
        getBoard
    }
}

function Cell()
{
    let value = 0;

    const getValue = () => value

    return {
    getValue
  };
}


let game = GameBoard()
game.placeSign(1,1,'kurac')
