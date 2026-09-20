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


    const getBoard = () => board;

    const placeSign = (column, row, player) => 
    {
        if (board[row][column].getValue() !== 0)
            return false;

       board[row][column].addToken(player);
       return true;
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

    const getValue = () => value;

    const addToken = (player) =>
    {
        value = player;
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
    const gameBoard = GameBoard();

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
    ];

    let activePlayer = players[0];
    
    const switchActivePlayer = () =>
    {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const logNewRound = () =>
    {
        gameBoard.logBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (column, row) =>
    {
        let played =  gameBoard.placeSign(column, row, getActivePlayer().sign);
        if(!played)
        {
            return;
        }
        switchActivePlayer();
        logNewRound();
    }
    logNewRound();
    
    return {
    playRound,
    getActivePlayer,
    getBoard: gameBoard.getBoard,
    };
}

function screenControler()
{
    const game = gameController();
    let turnDiv = document.querySelector('.turn');
    let boardDiv = document.querySelector('.board');

    const updateScreen = () =>
    {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        turnDiv.textContent = `Current player: ${activePlayer.name}`;
        
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) =>
            {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                cellButton.dataset.cell = cell;
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                if(cell.getValue() === 1)
                {
                    cellButton.textContent = "X"
                    cellButton.classList.add("x")
                }
                else if(cell.getValue() === -1)
                {
                    cellButton.textContent = "O"
                    cellButton.classList.add("o")
                }
                else
                {
                    cellButton.textContent = ""
                }
                boardDiv.appendChild(cellButton);
            })
        });
    }

    function clickHandler(e)
    {
        const selectedRow = e.target.dataset.row
        const selectedColumn = e.target.dataset.column
        if(selectedRow === undefined || selectedColumn === undefined) return;

        game.playRound(Number(selectedColumn), Number(selectedRow));
        updateScreen();
    }
    boardDiv.addEventListener('click', clickHandler)
    updateScreen()
}

screenControler();


