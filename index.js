
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

    const logBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
    };

    return{
        placeSign,
        getBoard,
        logBoard
    }
}

function Cell()
{
    let value = 0;

    const getValue = () => value

    const addToken = (player) =>
    {
        value = player
    }

    return {
    getValue,
    addToken
  };
}

function gameController(
    playerOne = "X",
    playerTwo = "O")
{
    const gameBoard = GameBoard()

    const players = 
    [
        {
            name: playerOne,
            sign: 1
        },
        {
            name: playerTwo,
            sign: -1
        }
    ]

    let activePlayer = players[0]
    
    const switchActivePlayer = () =>
    {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer

    const logNewRound = () =>
    {
        board.logBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (column, row) =>
    {
        board.placeSign(column, row, getActivePlayer().token);
        switchActivePlayer();
        logNewRound();
    }
    logNewRound();
    
    return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    };
}

function screenControler()
{
    turn = document.querySelector('.turn')
    board = document.querySelector('.board')

    
}


let game = GameBoard()
game.placeSign(1,1,'kurac')
