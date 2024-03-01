def inout(edges):
    graph = {} #in-out
    for a, b in edges:
        if a not in graph:
            graph[a] = [0, 0]
        if b not in graph:
            graph[b] = [0, 0]
        graph[a][1] += 1
        graph[b][0] += 1
    return graph

def solution(edges):
    graph = inout(edges)
    
    answer = [0, 0, 0, 0] #생성한 정점의 번호, 도넛 모양 그래프의 수, 막대 모양 그래프의 수, 8자 모양 그래프의 수
    for node in graph:
        inCnt, outCnt = graph[node]
        if inCnt == 0 and outCnt >=2:
            answer[0] = node
        if inCnt >= 1 and outCnt == 0:
            answer[2] += 1
        if inCnt >=2 and outCnt >= 2:
            answer[3] += 1
    answer[1] = graph[answer[0]][1] - (answer[2] + answer[3])
    return answer