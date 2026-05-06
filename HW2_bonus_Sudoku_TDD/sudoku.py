def is_valid_number(num):
    return 1 <= num <= 9

def is_valid_row(row):
    return len(row) == 9 and len(set(row)) == 9

def is_valid_column(board, column_index):
    column = [row[column_index] for row in board]
    return len(column) == 9 and len(set(column)) == 9

def is_valid_block(board, start_row, start_col):
    numbers = []

    for row in range(start_row, start_row + 3):
        for col in range(start_col, start_col + 3):
            numbers.append(board[row][col])

    return len(numbers) == 9 and len(set(numbers)) == 9