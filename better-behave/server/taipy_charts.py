# taipy_charts.py

from flask import Flask, send_file 
from taipy import Gui
import random

# cred = credentials.Certificate('shellhacks-7e288-firebase-adminsdk-vyxsp-edcfb6bb52.json')



# # Application Default credentials are automatically created.
# ref = firebase_admin.initialize_app(cred, {
#   'databaseURL': 'https://shellhacks.firebaseio.com'
# })
# print(firebase_admin.get_app())
# seshs_ref = db.reference()
# print(seshs_ref)
# seshs1 = seshs_ref.child('sessions')
# seshs =  seshs1.get()
data = {
  'x': list(range(10)),
  'y': [random.randint(0, 10) for _ in range(10)]
}
# dates = []
# scores = []

# for x, y in seshs.items():
#     dates.append(y.get('completedAt', ''))  # Get the 'date' field from the session
#     scores.append(y.get('score', '')) 
    
    
# print(dates)
# print(scores)
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