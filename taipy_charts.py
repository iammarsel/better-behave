# taipy_charts.py

from flask import Flask, send_file 
from taipy import Gui
# Generate random data
import random

data = {
  'x': list(range(10)),
  'y': [random.randint(0, 10) for _ in range(10)]
}


app = Flask(__name__) 

# Generate chart
gui = Gui("<|{data}|chart|>").run()
gui.save('chart.png')

# API route to serve chart PNG
@app.route('/charts/<chart_name>')  
def serve_chart(chart_name):
    return send_file(f'{chart_name}.png')

if __name__ == '__main__':
   app.run()