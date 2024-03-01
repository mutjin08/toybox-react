from itertools import combinations
def solution(friends, gifts):
    id = 0
    toId = {}
    for f in friends:
        toId[f] = id
        id += 1
    
    board = [[0 for _ in range(id)] for _ in range(id)]
    scores = [0 for _ in range(id)]
    for g in gifts:
        a, b = g.split()
        a, b = toId[a], toId[b]
        board[a][b] += 1
        scores[a] += 1
        scores[b] -=1
    
    answer = [0 for _ in range(id)]
    for a, b in combinations(range(id), 2):
        if board[a][b] > board[b][a]:
            answer[a] +=1
        elif board[a][b] < board[b][a]:
            answer[b] +=1
        else:
            if scores[a] > scores[b]:
                answer[a] += 1
            elif scores[a] < scores[b]:
                answer[b] += 1
            else:
                continue
    return max(answer)
            