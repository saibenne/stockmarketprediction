import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import matplotlib.pyplot as plt
from pymongo import MongoClient

# Load the dataset from CSV
data = pd.read_csv('A.csv')

# Preprocessing and filling missing values
data['Date'] = pd.to_datetime(data['Date'])
data.set_index('Date', inplace=True)
data.sort_index(inplace=True)

# Forward fill missing values
data.fillna(method='ffill', inplace=True)

# Feature selection
features = ['Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume']
target = 'Close'
X = data[features]
y = data[target]

# Split the data into train and test sets
split_index = int(len(X) * 0.8)
X_train, X_test = X[:split_index], X[split_index:]
y_train, y_test = y[:split_index], y[split_index:]

# Create and train the Gradient Boosting model
gb_model = GradientBoostingRegressor()
gb_model.fit(X_train, y_train)

# Create and train the LSTM model
lstm_model = Sequential()
lstm_model.add(LSTM(units=50, input_shape=(1, len(features))))
lstm_model.add(Dense(units=1))
lstm_model.compile(optimizer='adam', loss='mse')
lstm_model.fit(np.expand_dims(X_train, axis=1), y_train, epochs=50, batch_size=16)

# Make predictions with the Gradient Boosting model
gb_pred = gb_model.predict(X_test)

# Make predictions with the LSTM model
lstm_pred = lstm_model.predict(np.expand_dims(X_test, axis=1)).flatten()

# Calculate the error metrics
gb_rmse = np.sqrt(mean_squared_error(y_test, gb_pred))
lstm_rmse = np.sqrt(mean_squared_error(y_test, lstm_pred))

# MongoDB Atlas connection details
username = 'saibenne'
password = '9573879821'
cluster_url = 'your_cluster_url'
database_name = 'EnsembleModels'
collection_name = 'EnsembleModelsCollection'

# Connect to MongoDB Atlas
client = MongoClient(f"mongodb+srv://saibenne:9573879821@cluster0.n6zx1x9.mongodb.net/?retryWrites=true&w=majority")

db = client[database_name]
collection = db[collection_name]

# Store the error metrics in MongoDB
error_metrics = {'GB_RMSE': gb_rmse, 'LSTM_RMSE': lstm_rmse}
collection.insert_one(error_metrics)

# Plot the actual and predicted values
plt.plot(data.index[split_index:], y_test.values, label='Actual')
plt.plot(data.index[split_index:], gb_pred, label='GB Predicted')
plt.plot(data.index[split_index:], lstm_pred, label='LSTM Predicted')
plt.xlabel('Date')
plt.ylabel('Close Price')
plt.title('Stock Market Prediction')
plt.legend()
plt.show()

# Store the graph image in MongoDB
graph_img = 'graph.png'
plt.savefig(graph_img)
with open(graph_img, 'rb') as f:
    img_data = f.read()
    graph_doc = {'image': img_data}
    collection.insert_one(graph_doc)

# Close the MongoDB connection
client.close()
