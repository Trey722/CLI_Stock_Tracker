import yfinance as yf 



def getTicker(ticker_symbol : str) -> tuple:
    try:
        ticker = yf.Ticker(ticker_symbol)
        tickerinfo = ticker.info
        return (True, ticker, tickerinfo)
    except Exception as e:
        return (False, 303, e)
    

    
    

def get_stock_name(symbol : str) -> (bool, str):
    try:
        result = getTicker(symbol)
       
        if result[0] == False:
           return result
    
        stock_name = result[2]['longName']
        return (True, stock_name)
    
    except Exception as e:
        return (False, e)
    
    
def get_stock_price_using_hist(symbol : str) -> (bool, float):
    try:
        ticker = yf.Ticker(symbol)
        history = ticker.history(period="1d")  # Retrieve 1-day historical data
        
        if history.empty:
            return (False, 0.0)  # Return if no historical data is available
        
        stock_price = history['Close'].iloc[-1]  # Get the most recent closing price
        return (True, stock_price)
    
    except Exception as e:
        return (False, 0.0)
    
    
def get_open_stock_price(symbol) -> (bool, float):
    try:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period='1d')
        
        if not hist.empty:
            open_price = hist['Open'][0]  
            return (True, open_price)
        else:
            return (False, 0.0) 
        
    except Exception as e:
        print(f"Error fetching stock price: {e}")
        return (False, 0.0)
    


    
    
    
    

        
        
        

        


    
    
    
    


    