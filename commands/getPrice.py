import yfinance as yf

def getTicker(tickerSymbol):
    return yf.Ticker(tickerSymbol)

def getInfo(tickerSymbol):
    ticker = getTicker(tickerSymbol)
    return ticker.info


def getHistoricalData(tickerSymbol, date):
    ticker = getTicker(tickerSymbol)
    return ticker.history(period=date)

def getPrice(tickerSymbol):
    ticker = getTicker(tickerSymbol)
    histData = getHistoricalData(tickerSymbol, "1d")
    return histData["Close"].iloc[-1]

def getOptionsChain(tickerSymbol):
    ticker = getTicker(tickerSymbol)
    return ticker.options 

print(getOptionsChain("AAPL"))
